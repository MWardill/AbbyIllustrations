import FashionImages from './FashionImages';
import { db, imageMetadata } from '@/db';
import { blobUrl } from '@/src/lib/blobUtils';
import { handleError } from '@/src/lib/errorUtils';

export const revalidate = 300;


async function getFashionIllustrationPhotos() {
  try {

    const rows = await db
    .select({
      pathname: imageMetadata.pathname,
      alt: imageMetadata.alt,
      about: imageMetadata.about,
      created_date: imageMetadata.createdDate,
    })
    .from(imageMetadata)

    return rows.map((row) =>(blobUrl(row.pathname)));
   
  } catch (error) {
    handleError('Failed to load fashion illustration blobs');
    console.error('Failed to load fashion illustration blobs', error);
    return [];
  }
}

export default async function FashionImagesPage() {
  const photos = await getFashionIllustrationPhotos();

  return <FashionImages photos={photos} />;
}
