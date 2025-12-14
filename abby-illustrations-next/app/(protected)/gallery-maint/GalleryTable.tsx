import { Gallery } from './types';
import { Trash2 } from 'lucide-react';

interface GalleryTableProps {
  galleries: Gallery[];
  onDelete?: (galleryId: number) => void | Promise<void>;
}

export function GalleryTable({ galleries, onDelete }: GalleryTableProps) {
  const handleDelete = async (galleryId: number) => {
    await onDelete?.(galleryId);
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>              
              <th>Title</th>
              <th>Description</th>
              <th className="text-right">Image Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery) => (
              <tr key={gallery.id}>                
                <td className="font-semibold">{gallery.gallery_title}</td>
                <td>{gallery.gallery_description}</td>
                <td className="text-right">{gallery.image_count}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(gallery.id)}
                    className="btn btn-ghost btn-sm"
                    title="Delete gallery"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {galleries.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No galleries found</div>
      )}
    </>
  );
}
