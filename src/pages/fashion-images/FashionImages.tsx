import { ImageGallery } from '../../components/gallery';

const fashionPhotoModules = import.meta.glob('../../assets/fashion-illustrations/*.{jpg,jpeg,png}', { eager: true, import: 'default' });
const fashionPhotos = Object.values(fashionPhotoModules) as string[];

export default function FashionImages() {
  return (
    <ImageGallery title="Fashion Illustrations" photos={fashionPhotos}>
      <p>A collection of fashion illustrations featuring various designers and styles.</p>
    </ImageGallery>
  )
}