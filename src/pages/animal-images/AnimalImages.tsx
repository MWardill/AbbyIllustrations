import { ImageGallery } from '../../components/gallery';

const animalPhotoModules = import.meta.glob('../../assets/animal-illustrations/*.{jpg,jpeg,png}', { eager: true, import: 'default' });
const animalPhotos = Object.values(animalPhotoModules) as string[];

export default function AnimalImages() {
  return (
    <ImageGallery title="Animal Illustrations" photos={animalPhotos}>
      <p>A collection of animal illustrations.</p>
    </ImageGallery>
  )
}