import fs from 'fs';
import path from 'path';
import PetPortraits from '../../src/views/pet-portraits/PetPortraits';

function getGalleryImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', folder);
  const files = fs
    .readdirSync(dir)
    .filter((name) => ['.jpg', '.jpeg', '.png'].some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => `/${folder}/${name}`);
}

export default function PetPortraitsPage() {
  const photos = getGalleryImages('images/pet-portraits');

  return <PetPortraits photos={photos} />;
}
