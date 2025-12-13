import { GalleryTable } from './GalleryTable';
import { getGalleries } from './actions';
import { Gallery } from './types';

export default async function GalleryMaintPage() {
  let galleries: Gallery[] = [];
  let error = null;

  try {
    galleries = await getGalleries();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch galleries';
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  return <GalleryTable initialGalleries={galleries} />;
}