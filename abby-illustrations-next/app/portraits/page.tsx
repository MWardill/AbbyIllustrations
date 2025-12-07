import fs from 'fs';
import path from 'path';
import Portraits from '../../src/views/portraits/Portraits';

function getGalleryImages(folder: string) {
  const dir = path.join(process.cwd(), 'public', folder);
  const files = fs
    .readdirSync(dir)
    .filter((name) => ['.jpg', '.jpeg', '.png'].some((ext) => name.toLowerCase().endsWith(ext)));

  return files.map((name) => `/${folder}/${name}`);
}

export default function PortraitsPage() {
  const photos = getGalleryImages('images/portraits');

  return <Portraits photos={photos} />;
}
