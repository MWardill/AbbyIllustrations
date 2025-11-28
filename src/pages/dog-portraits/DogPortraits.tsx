import { ImageGallery } from '../../components/gallery';

const dogPhotoModules = import.meta.glob('../../assets/dog-pictures/*.{jpg,jpeg,png}', { eager: true, import: 'default' });
const dogPhotos = Object.values(dogPhotoModules) as string[];

export default function DogPortraits() {
  return (
    <ImageGallery title="Dog Portraits" photos={dogPhotos}>
      <p>A collection of dog portrait illustrations.</p>
    </ImageGallery>
  )
}