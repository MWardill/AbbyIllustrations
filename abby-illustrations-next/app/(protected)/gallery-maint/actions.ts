'use server';
import { getGalleries as fetchGalleries, deleteGallery as delGallery, getGalleryImages as fetchImages } from '@/db/queries/gallery-maint/galleries';
//import { getBlobFiles as fetchBlob } from '@/src/lib/blobUtils';

export async function getGalleries() {
    return await fetchGalleries();
}
export async function deleteGallery(id: number) {
    return await delGallery(id);
}

//Not sure if realistically I should ever be calling this
// export async function getBlobFiles(folder: string) {  
//     return await fetchBlob(folder);  
// }