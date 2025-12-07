import { ImageGallery } from '../../components/gallery';

interface DogPortraitsProps {
  photos: string[];
}

export default function DogPortraits({ photos }: DogPortraitsProps) {
  return (
    <ImageGallery title="Dog Portraits" photos={photos}>
      <p>A collection of dog portrait illustrations.</p>
    </ImageGallery>
  );
}