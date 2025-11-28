import { ImageGallery } from '../../components/gallery';

const petPhotoModules = import.meta.glob('../../assets/pet-portraits/*.{jpg,jpeg,png}', { eager: true, import: 'default' });
const petPhotos = Object.values(petPhotoModules) as string[];

export default function PetPortraits() {
  return (
    <ImageGallery title="Pet Portraits" photos={petPhotos}>
      <p>A collection of pet portrait illustrations featuring cats, dogs, and other beloved companions.</p>
    </ImageGallery>
  )
}
