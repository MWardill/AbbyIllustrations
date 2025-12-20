import { Gallery } from './types';
import { Trash2, Edit } from 'lucide-react';

interface GalleryTableProps {
  galleries: Gallery[];
  onEdit?: (galleryId: number) => void | Promise<void>;
  onDelete?: (galleryId: number, galleryDesc: string) => void | Promise<void>;
}

export function GalleryTable({ galleries, onEdit, onDelete }: GalleryTableProps) {
  const handleEdit = (galleryId: number) => {
    onEdit?.(galleryId);
  };

  const handleDelete = async (galleryId: number, galleryDesc: string) => {
    await onDelete?.(galleryId, galleryDesc);
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
                <td>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(gallery.id)}
                      className="btn btn-ghost btn-sm"
                      title="Edit gallery images"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(gallery.id, gallery.gallery_title)}
                      className="btn btn-ghost btn-sm"
                      title="Delete gallery"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
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
