import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import DogPortraits from './DogPortraits';

export default function DogPortraitsPage() {
  const photos = getGalleryImages('images/dog-pictures', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <DogPortraits photos={photos} />;
}
