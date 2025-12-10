import fs from 'fs';
import path from 'path';
import DogPortraits from '../../src/views/dog-portraits/DogPortraits';

function getGalleryImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', folder);
  const files = fs
    .readdirSync(dir)
    .filter((name) => ['.jpg', '.jpeg', '.png'].some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => `/${folder}/${name}`);
}

export default function DogPortraitsPage() {
  const photos = getGalleryImages('images/dog-pictures');

  return <DogPortraits photos={photos} />;
}
