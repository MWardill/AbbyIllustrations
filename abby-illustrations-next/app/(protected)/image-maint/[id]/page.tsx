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
    <div className="p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-6 items-center">
      <h1 className="text-2xl font-bold sticky top-0 bg-base-100 z-10 py-2 md:col-start-1 md:row-start-1">
        Edit images for gallery
      </h1>
      <div className="flex flex-wrap items-center gap-4 md:col-start-2 md:row-start-1 md:justify-self-end">
        <Link href={`/image-maint/${id}/add-image`} className="btn btn-primary btn-sm gap-4" title="Add new image to gallery">
          <Plus className="h-4 w-4" />
          Add Image
        </Link>
        <BackButton text= "Return to Gallery Maintenance"  />
      </div>
      
      <div className="md:col-span-2">
        <GalleryImageMaint images={images} />
      </div>
    </div>
  );
}