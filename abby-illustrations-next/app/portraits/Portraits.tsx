import { ImageGallery } from '@/src/components/gallery';

interface PortraitsProps {
  photos: string[];
}

export default function Portraits({ photos }: PortraitsProps) {
  return (
    <ImageGallery title="Portraits" photos={photos}>
      <p>A collection of portrait illustrations.</p>
    </ImageGallery>
  );
}
