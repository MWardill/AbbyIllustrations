'use server';
import { getGalleries as fetchGalleries, deleteGallery as delGallery } from '@/db/queries/gallery-maint/galleries';

export async function getGalleries() {
    return await fetchGalleries();
}
export async function deleteGallery(id: number) {
    return await delGallery(id);
}
