import { ImageGallery } from '../../components/gallery';

const babyPhotoModules = import.meta.glob('../../assets/baby-pictures/*.jpg', { eager: true, import: 'default' });
const babyPhotos = Object.values(babyPhotoModules) as string[];

export default function BabyPortraits() {
  return (
    <ImageGallery title="Baby Portraits" photos={babyPhotos} objectPosition="right">
      <p>Three portraits, commissioned by a lovely lady in Holland, of her three children whilst at the same age.</p>
      <p className="mt-2">This work took place over a few years and it was a project I was very proud of and honoured to produce for this family.</p>
      <p className="mt-2">I love the idea of the three portraits in their home.</p>
    </ImageGallery>
  )
}