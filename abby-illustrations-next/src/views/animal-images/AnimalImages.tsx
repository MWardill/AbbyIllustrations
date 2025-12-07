import { ImageGallery } from '../../components/gallery';

interface AnimalImagesProps {
  photos: string[];
}

export default function AnimalImages({ photos }: AnimalImagesProps) {
  return (
    <ImageGallery title="Animal Illustrations" photos={photos}>
      <p>A collection of animal illustrations.</p>
    </ImageGallery>
  );
}