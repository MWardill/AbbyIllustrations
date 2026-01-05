'use server';

import { getGalleryImages as fetchImages, updateImage as dbUpdateImage, deleteImage as dbDeleteImage, uploadGalleryImages as dbUploadGalleryImages, type GalleryImage } from '@/db/queries/gallery-maint/galleries';

export async function getGalleryImages(galleryId: number) {
    return await fetchImages(galleryId);
}

export async function updateGalleryImage(id: number, data: Partial<GalleryImage>) {
    return await dbUpdateImage(id, data);
}

export async function deleteGalleryImage(id: number) {
    return await dbDeleteImage(id);
}

export async function uploadImages(id: number, formData: FormData) {
  const files = formData.getAll('files') as File[];
  
  if (files.length === 0) return;

  try {
    const uploads = files.map(file => ({
      metadata: {
        alt: file.name,
        about: '',
        author: 'Abigail Wright',
        primaryImage: false
      },
      file
    }));

    await dbUploadGalleryImages(id, uploads);
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}