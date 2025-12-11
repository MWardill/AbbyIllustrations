import { ImageGallery } from '@/src/components/gallery';

interface BabyPortraitsProps {
  photos: string[];
}

export default function BabyPortraits({ photos }: BabyPortraitsProps) {
  return (
    <ImageGallery title="Baby Portraits" photos={photos} objectPosition="right">
      <p>Three portraits, commissioned by a lovely lady in Holland, of her three children whilst at the same age.</p>
      <p className="mt-2">This work took place over a few years and it was a project I was very proud of and honoured to produce for this family.</p>
      <p className="mt-2">I love the idea of the three portraits in their home.</p>
    </ImageGallery>
  );
}
