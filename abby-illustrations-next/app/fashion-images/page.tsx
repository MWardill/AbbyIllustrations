import fs from 'fs';
import path from 'path';
import FashionImages from '../../src/views/fashion-images/FashionImages';

function getGalleryImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', folder);
  const files = fs
    .readdirSync(dir)
    .filter((name) => ['.jpg', '.jpeg', '.png'].some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => `/${folder}/${name}`);
}

export default function FashionImagesPage() {
  const photos = getGalleryImages('images/fashion-illustrations');

  return <FashionImages photos={photos} />;
}
