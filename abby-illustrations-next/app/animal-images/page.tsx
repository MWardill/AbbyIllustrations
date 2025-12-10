import fs from 'fs';
import path from 'path';
import AnimalImages from '../../src/views/animal-images/AnimalImages';

function getGalleryImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', folder);
  const files = fs
    .readdirSync(dir)
    .filter((name) => ['.jpg', '.jpeg', '.png'].some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => `/${folder}/${name}`);
}

export default function AnimalImagesPage() {
  const photos = getGalleryImages('images/animal-illustrations');

  return <AnimalImages photos={photos} />;
}
