import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import Portraits from './Portraits';

export default function PortraitsPage() {
  const photos = getGalleryImages('images/portraits', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <Portraits photos={photos} />;
}
