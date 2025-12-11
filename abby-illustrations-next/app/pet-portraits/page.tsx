import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import PetPortraits from './PetPortraits';

export default function PetPortraitsPage() {
  const photos = getGalleryImages('images/pet-portraits', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <PetPortraits photos={photos} />;
}
