import { Gallery } from './types';
import { Trash2, Edit } from 'lucide-react';

interface GalleryTableProps {
  galleries: Gallery[];
  onEdit?: (galleryId: number) => void | Promise<void>;
  onDelete?: (galleryId: number, galleryDesc: string) => void | Promise<void>;
}

const GalleryActions = ({ 
  gallery, 
  onEdit, 
  onDelete 
}: { 
  gallery: Gallery; 
  onEdit: (id: number) => void; 
  onDelete: (id: number, title: string) => void; 
}) => (
  <>
    <button
      onClick={() => onEdit(gallery.id)}
      className="btn btn-ghost btn-sm"
      title="Edit gallery images"
    >
      <Edit className="h-4 w-4 text-blue-600" />
    </button>
    <button
      onClick={() => onDelete(gallery.id, gallery.gallery_title)}
      className="btn btn-ghost btn-sm"
      title="Delete gallery"
    >
      <Trash2 className="h-4 w-4 text-red-600" />
    </button>
  </>
);

export function GalleryTable({ galleries, onEdit, onDelete }: GalleryTableProps) {
  const handleEdit = (galleryId: number) => {
    onEdit?.(galleryId);
  };

  const handleDelete = async (galleryId: number, galleryDesc: string) => {
    await onDelete?.(galleryId, galleryDesc);
  };
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
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
                    <GalleryActions gallery={gallery} onEdit={handleEdit} onDelete={handleDelete} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {galleries.map((gallery) => (
          <div key={gallery.id} className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-4">
              <div className="flex justify-between items-start">
                <h3 className="card-title text-lg">{gallery.gallery_title}</h3>
                <div className="badge badge-ghost">{gallery.image_count} images</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{gallery.gallery_description}</p>
              <div className="card-actions justify-end mt-4 border-t border-gray-100 pt-4">
                <GalleryActions gallery={gallery} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {galleries.length === 0 && (
        <div className="text-center text-gray-500 mt-8">No galleries found</div>
      )}
    </>
  );
}
