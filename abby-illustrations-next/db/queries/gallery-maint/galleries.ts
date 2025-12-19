'use server';
import { db, imageGalleries, imageGalleriesImages, imageMetadata } from '@/db';
import { count, InferSelectModel, eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { getDuplicateErrorMessage } from '../helpers';
import { del } from '@vercel/blob';
import { blobUrl } from '@/src/lib/blobUtils';
import { put } from '@vercel/blob';
import 'server-only';

export interface Gallery {
  id: number;
  gallery_title: string;
  gallery_description: string;
  image_count: number;
}

export type GalleryImage = InferSelectModel<typeof imageMetadata>;

export async function getGalleries(): Promise<Gallery[]> {
  try {
    const result = await db
      .select({
        id: imageGalleries.id,
        gallery_title: imageGalleries.galleryTitle,
        gallery_description: imageGalleries.galleryDescription,
        image_count: count(imageGalleriesImages.imageId),
      })
      .from(imageGalleries)
      .leftJoin(
        imageGalleriesImages,
        sql`${imageGalleries.id} = ${imageGalleriesImages.galleryId}`
      )
      .groupBy(imageGalleries.id)
      .orderBy(imageGalleries.galleryTitle);

    return result;
  } catch (error) {
    console.error('Failed to fetch galleries:', error);
    throw new Error('Failed to fetch galleries');
  }
}

export async function getGalleryImages(galleryId: number): Promise<GalleryImage[]> {
  try {
    const result = await db
      .select()
      .from(imageMetadata)
      .innerJoin(
        imageGalleriesImages,
        sql`${imageMetadata.id} = ${imageGalleriesImages.imageId}`
      )
      .where(sql`${imageGalleriesImages.galleryId} = ${galleryId}`)
      .orderBy(imageMetadata.pathname);

    return result.map(row => row.image_metadata);
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    throw new Error('Failed to fetch gallery images');
  }
}

export async function createGallery(title: string, description: string): Promise<Gallery> {
  try {
    const result = await db
      .insert(imageGalleries)
      .values({
        galleryTitle: title,
        galleryDescription: description,
      })
      .returning({
        id: imageGalleries.id,
        gallery_title: imageGalleries.galleryTitle,
        gallery_description: imageGalleries.galleryDescription,
      });

    if (!result || result.length === 0) {
      throw new Error('Failed to create gallery');
    }

    return {
      ...result[0],
      image_count: 0,
    };
  } catch (error) {
    const customMessage = getDuplicateErrorMessage(error);
    if (customMessage) {
      throw new Error(customMessage);
    }
    console.error('Failed to create gallery:', error);
    throw new Error('Failed to create gallery');
  }
}

export async function deleteGallery(galleryId: number): Promise<void> {
  try {
    // Get all images associated with this gallery
    const galleryImages = await db
      .select({
        id: imageMetadata.id,
        pathname: imageMetadata.pathname,
      })
      .from(imageGalleriesImages)
      .innerJoin(
        imageMetadata,
        sql`${imageGalleriesImages.imageId} = ${imageMetadata.id}`
      )
      .where(sql`${imageGalleriesImages.galleryId} = ${galleryId}`);

    // Delete images from blob storage and imageMetadata if they don't belong to other galleries
    for (const image of galleryImages) {

      const otherGalleryCount = await db
        .select({ count: count() })
        .from(imageGalleriesImages)
        .where(
          sql`${imageGalleriesImages.imageId} = ${image.id} AND ${imageGalleriesImages.galleryId} != ${galleryId}`
        );

      // If image is not used by other galleries, delete it
      //For now this shouold never happen as I don't want to make a FE for it but would be good to support it in future maybe
      if (otherGalleryCount[0].count === 0) {
        try {
          await del(blobUrl(image.pathname));
        } catch (error) {
          console.error(`Failed to delete blob for image ${image.pathname}:`, error);
          throw error;
        }

        // Delete from imageMetadata
        await db
          .delete(imageMetadata)
          .where(sql`${imageMetadata.id} = ${image.id}`);
      }
    }

    // Delete all image associations for this gallery
    await db
      .delete(imageGalleriesImages)
      .where(sql`${imageGalleriesImages.galleryId} = ${galleryId}`);

    // Delete the gallery itself
    await db
      .delete(imageGalleries)
      .where(sql`${imageGalleries.id} = ${galleryId}`);
  } catch (error) {
    console.error('Failed to delete gallery:', error);
    throw new Error('Failed to delete gallery');
  }
}

export async function updateImage(id: number, data: Partial<GalleryImage>) {
  try {
    await db.update(imageMetadata)
      .set({
        alt: data.alt,
        about: data.about,
        author: data.author,
        createdDate: data.createdDate,
        primaryImage: data.primaryImage,
        updatedAt: new Date(),
      })
      .where(sql`${imageMetadata.id} = ${id}`);
  } catch (error) {
    console.error('Failed to update image:', error);
    throw new Error('Failed to update image');
  }
}

export async function uploadGalleryImages(
  galleryId: number,
  uploads: { metadata: Partial<GalleryImage>; file: File }[]
) {
  try {
    // Get gallery title to use as path
    const [gallery] = await db
      .select({ title: imageGalleries.galleryTitle })
      .from(imageGalleries)
      .where(sql`${imageGalleries.id} = ${galleryId}`);

    if (!gallery) {
      throw new Error(`Gallery with id ${galleryId} not found`);
    }

    const galleryPath = gallery.title;
    const results = [];

    for (const { metadata, file } of uploads) {
      // 1. Upload file to blob storage
      const pathname = `${galleryPath}/${file.name}`;
      await put(pathname, file, {
        access: 'public',
        addRandomSuffix: false // Keep original filename
      });

      // 2. Create image metadata record
      const [newImage] = await db
        .insert(imageMetadata)
        .values({
          pathname: pathname,
          alt: metadata.alt || file.name,
          about: metadata.about || '',
          author: metadata.author || 'Abigail Wright',
          createdDate: metadata.createdDate || new Date().toISOString(),
          primaryImage: metadata.primaryImage || false,
        })
        .returning();

      // 3. Link image to gallery
      await db.insert(imageGalleriesImages).values({
        galleryId: galleryId,
        imageId: newImage.id,
      });

      results.push(newImage);
    }

    return results;
  } catch (error) {
    console.error('Failed to upload gallery images:', error);
    throw new Error('Failed to upload gallery images');
  }
}

export async function deleteImage(id: number): Promise<void> {
  try {
    // 1. Get image metadata
    const [image] = await db
      .select()
      .from(imageMetadata)
      .where(eq(imageMetadata.id, id));

    if (!image) {
      throw new Error(`Image with id ${id} not found`);
    }

    // 2. Delete from blob storage
    await del(blobUrl(image.pathname));

    // 3. Delete from join table
    await db
      .delete(imageGalleriesImages)
      .where(eq(imageGalleriesImages.imageId, id));

    // 4. Delete from metadata table
    await db
      .delete(imageMetadata)
      .where(eq(imageMetadata.id, id));

  } catch (error) {
    console.error('Failed to delete image:', error);
    throw new Error('Failed to delete image');
  }
}

export async function test () {
  return 'test';
}