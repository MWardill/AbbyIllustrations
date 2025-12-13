'use client';

import { useState } from 'react';
import Modal from '@/src/components/ui/modal';
import { Gallery } from './types';

interface GalleryTableProps {
  initialGalleries: Gallery[];
}

export function GalleryTable({ initialGalleries }: GalleryTableProps) {
  const [galleries] = useState<Gallery[]>(initialGalleries);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add Gallery
        </button>
      </div>
      
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

      {/* Gallery Form Modal */}
      <Modal
        isOpen={showModal}
        title="Add Gallery"
        description="Create a new gallery to organize your images"
        onClose={() => setShowModal(false)}
      >
        {/* Gallery form will go here */}
        <div className="text-gray-500">
          Gallery form coming soon...
        </div>
      </Modal>
    </div>
  );
}
