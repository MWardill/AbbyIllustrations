import { ImageGallery } from '../../components/gallery';

const christmasPhotoModules = import.meta.glob('../../assets/christmas-animals/*.{jpg,jpeg,png}', { eager: true, import: 'default' });
const christmasPhotos = Object.values(christmasPhotoModules) as string[];

export default function ChristmasAnimals() {
  return (
    <ImageGallery title="Christmas Animals" photos={christmasPhotos}>
      <p>Festive animal illustrations that I put together to produce a series of Christmas cards in my Etsy store</p>
    </ImageGallery>
  )
}