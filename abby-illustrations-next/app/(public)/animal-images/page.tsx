import { GalleryFileType, getGalleryImages } from '@/src/lib/fileUtils';
import AnimalImages from './AnimalImages';

export default function AnimalImagesPage() {
  const photos = getGalleryImages('images/animal-illustrations', [
    GalleryFileType.JPG,
    GalleryFileType.JPEG,
    GalleryFileType.PNG,
  ]);

  return <AnimalImages photos={photos} />;
}
