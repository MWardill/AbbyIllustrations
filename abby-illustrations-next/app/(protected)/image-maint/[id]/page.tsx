import { getGalleryImages } from '../actions';
import { GalleryImageMaint } from './GalleryImageMaint';
import { BackButton } from '@/src/components/ui/BackButton';
import Link from 'next/link';
import { Plus } from 'lucide-react';

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
        <div className="flex items-center gap-4">
          <Link href={`/image-maint/${id}/add-image`} className="btn btn-primary btn-sm gap-4" title="Add new image to gallery">
            <Plus className="h-4 w-4" />
            Add Image
          </Link>
          <BackButton text= "Return to Gallery Maintenance"  />
        </div>
      </div>
      
      <GalleryImageMaint images={images} />
    </div>
  );
}