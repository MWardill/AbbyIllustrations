import { Image } from '../../components/images';

const babyPhotoModules = import.meta.glob('../../assets/baby-pictures/*.jpg', { eager: true, import: 'default' });
const babyPhotos = Object.values(babyPhotoModules) as string[];

export default function BabyPortraits() {
  return (
    <div className="flex pt-10">
      <div className="w-1/5 pr-4">
        <h1 className="text-3xl font-bold">Baby Portraits</h1>
        <p>Three portraits, commissioned by a lovely lady in Holland, of her three children whilst at the same age. </p>
        <p className="mt-2">This work took place over a few years and it was a project I was very proud of and honoured to produce for this family.</p>
        <p className="mt-2">I love the idea of the three portraits in their home.</p>
      </div>
      <div className="w-px bg-gray-300 mx-4"></div>
      <div className="w-2/3">
        <div className="grid grid-cols-3 gap-4">
          {babyPhotos.map((photo, index) => (
            <div key={index} className="rounded-box overflow-hidden">
              <Image src={photo} alt={`Baby portrait ${index + 1}`} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}