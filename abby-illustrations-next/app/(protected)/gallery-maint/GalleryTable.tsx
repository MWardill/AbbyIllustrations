import { Gallery } from './types';

interface GalleryTableProps {
  galleries: Gallery[];
}

export function GalleryTable({ galleries }: GalleryTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image Count</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery) => (
              <tr key={gallery.id}>
                <td>{gallery.id}</td>
                <td className="font-semibold">{gallery.gallery_title}</td>
                <td>{gallery.gallery_description}</td>
                <td className="text-center">{gallery.image_count}</td>
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
