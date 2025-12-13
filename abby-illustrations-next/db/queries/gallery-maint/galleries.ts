'use server';
import { db, imageGalleries, imageGalleriesImages } from '@/db';
import { count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

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
