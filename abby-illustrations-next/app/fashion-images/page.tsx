import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import FashionImages from './FashionImages';

export default function FashionImagesPage() {
  const photos = getGalleryImages('images/fashion-illustrations', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <FashionImages photos={photos} />;
}
