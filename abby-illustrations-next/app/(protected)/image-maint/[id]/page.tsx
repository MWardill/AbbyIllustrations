import { getGalleryImages } from '../actions';
import { GalleryImageMaint } from './GalleryImageMaint';
import { BackButton } from './BackButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id: idString } = await params;
  const id = Number(idString);

  const images = await getGalleryImages(id);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Edit images for gallery
        </h1>
        <BackButton />
      </div>
      
      <GalleryImageMaint images={images} />
    </div>
  );
}