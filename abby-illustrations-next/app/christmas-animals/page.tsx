import fs from 'fs';
import path from 'path';
import ChristmasAnimals from '../../src/views/christmas-animals/ChristmasAnimals';

function getGalleryImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', folder);
  const files = fs
    .readdirSync(dir)
    .filter((name) => ['.jpg', '.jpeg', '.png'].some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => `/${folder}/${name}`);
}

export default function ChristmasAnimalsPage() {
  const photos = getGalleryImages('images/christmas-animals');

  return <ChristmasAnimals photos={photos} />;
}
