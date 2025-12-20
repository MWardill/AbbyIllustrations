import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import ChristmasAnimals from './ChristmasAnimals';

export default function ChristmasAnimalsPage() {
  const photos = getGalleryImages('images/christmas-animals', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <ChristmasAnimals photos={photos} />;
}
