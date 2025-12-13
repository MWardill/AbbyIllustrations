import { list } from '@vercel/blob';
import FashionImages from './FashionImages';

export const revalidate = 300;

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function getFashionIllustrationPhotos() {
  try {
    
    let cursor;
    const blobs = [];

    do {
      const { blobs: tempBlobs } = await list({ prefix: 'fashion-illustrations/', cursor });
      blobs.push(...tempBlobs);
      cursor = cursor;
    } while (cursor);

    return blobs
      .filter(({ pathname }) =>
        ALLOWED_EXTENSIONS.some((extension) => pathname.toLowerCase().endsWith(extension)),
      )
      .map(({ url }) => (url));
  } catch (error) {
    console.error('Failed to load fashion illustration blobs', error);
    return [];
  }
}

export default async function FashionImagesPage() {
  const photos = await getFashionIllustrationPhotos();

  return <FashionImages photos={photos} />;
}
