import { getGalleryImages as fetchImages } from '@/db/queries/gallery-maint/galleries';

export async function getGalleryImages(galleryId: number) {
    return await fetchImages(galleryId);
}