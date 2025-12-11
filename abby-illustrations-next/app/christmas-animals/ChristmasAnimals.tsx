import { ImageGallery } from '@/src/components/gallery';

interface ChristmasAnimalsProps {
  photos: string[];
}

export default function ChristmasAnimals({ photos }: ChristmasAnimalsProps) {
  return (
    <ImageGallery title="Christmas Animals" photos={photos}>
      <p>Festive animal illustrations that I put together to produce a series of Christmas cards in my Etsy store</p>
    </ImageGallery>
  );
}
