'use server';
import { db, imageGalleries, imageGalleriesImages, imageMetadata } from '@/db';
import { count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import { getDuplicateErrorMessage } from '../helpers';
import { del } from '@vercel/blob';

export interface Gallery {
  id: number;
  gallery_title: string;
  gallery_description: string;
  image_count: number;
}

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
    //Delete the blob images - for now I think don't want to do this just in case
    // const galleryImages = await db
    //   .select({
    //     pathname: imageMetadata.pathname,
    //   })
    //   .from(imageGalleriesImages)
    //   .innerJoin(
    //     imageMetadata,
    //     sql`${imageGalleriesImages.imageId} = ${imageMetadata.id}`
    //   )
    //   .where(sql`${imageGalleriesImages.galleryId} = ${galleryId}`);

    // // Delete images from blob storage
    // for (const image of galleryImages) {
    //   try {
    //     await del(image.pathname);
    //   } catch (error) {
    //     console.warn(`Failed to delete blob for image ${image.pathname}:`, error);
    //     // Continue deleting other images even if one fails
    //   }
    // }

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