import { ImageGallery } from '../../components/gallery';

interface PetPortraitsProps {
  photos: string[];
}

export default function PetPortraits({ photos }: PetPortraitsProps) {
  return (
    <ImageGallery title="Pet Portraits" photos={photos}>
      <p>A collection of pet portrait illustrations featuring cats, dogs, and other beloved companions.</p>
    </ImageGallery>
  );
}
