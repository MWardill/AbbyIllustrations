'use client';
import { useState } from "react";
import { Gallery } from "./types";
import { GalleryTable } from "./GalleryTable";
import { GalleryModal } from "./GalleryModal";
import { ConfirmCancelModal } from '@/src/components/ui';
import { useRouter } from "next/navigation";
import { deleteGallery } from './actions';

export default function GalleryMaint({ initialGalleries }: { initialGalleries: Gallery[] }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteGalleryId, setDeleteGalleryId] = useState<number | null>(null);
    const router = useRouter();

    const handleDeleteGallery = async (galleryId: number) => {
        setDeleteGalleryId(galleryId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (deleteGalleryId !== null) {
            await deleteGallery(deleteGalleryId);
            console.log('gallery deleted', deleteGalleryId);
            router.refresh();
        }
        setShowDeleteConfirm(false);
        setDeleteGalleryId(null);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeleteGalleryId(null);
    };

    return (
        <>
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

                <GalleryTable
                    galleries={initialGalleries}
                    onDelete={handleDeleteGallery}
                />
            </div>

            <GalleryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={async () => {                    
                    router.refresh();
                }}
            />

            <ConfirmCancelModal
                isOpen={showDeleteConfirm}
                title="Delete Gallery"
                description="Are you sure you want to delete this gallery?"
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
                isDangerous={true}
            >
                <p>This action cannot be undone.</p>
            </ConfirmCancelModal>
        </>
    );
}