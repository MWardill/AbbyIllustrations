import { ImageGallery } from '@/src/components/gallery';

interface FashionImagesProps {
  photos: string[];
}

export default function FashionImages({ photos }: FashionImagesProps) {
  return (
    <ImageGallery title="Fashion Illustrations" photos={photos}>
      <p>A collection of fashion illustrations featuring various designers and styles.</p>
    </ImageGallery>
  );
}
