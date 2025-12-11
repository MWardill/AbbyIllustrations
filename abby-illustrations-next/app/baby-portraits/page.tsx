import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import BabyPortraits from './BabyPortraits';

export default function BabyPortraitsPage() {
  const photos = getGalleryImages('images/baby-pictures', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <BabyPortraits photos={photos} />;
}
