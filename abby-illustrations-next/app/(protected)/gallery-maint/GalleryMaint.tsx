'use client';
import { useState } from "react";
import { Gallery } from "./types";
import { GalleryTable } from "./GalleryTable";
import { GalleryModal } from "./GalleryModal";
import { ConfirmCancelModal } from '@/src/components/ui';
import { useRouter } from "next/navigation";
import { deleteGallery } from './actions';
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function GalleryMaint({ initialGalleries }: { initialGalleries: Gallery[] }) {
    const [showModal, setShowModal] = useState(false);    
    const [showDeleteConfirm, setShowDeleteConfirm] = useState({show: false, description: ""});
    const [deleteGalleryId, setDeleteGalleryId] = useState<number | null>(null);
    const router = useRouter();
        
    const handleDeleteGallery = async (galleryId: number, galleryDesc: string) => {
        setDeleteGalleryId(galleryId);
        setShowDeleteConfirm({show: true, description: galleryDesc});
    };

    const confirmDelete = async () => {
        if (deleteGalleryId !== null) {
            await deleteGallery(deleteGalleryId);
            console.log('gallery deleted', deleteGalleryId);
            toast.success("Gallery deleted successfully");
            router.refresh();
        }
        setShowDeleteConfirm({show: false, description: ""});
        setDeleteGalleryId(null);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm({show: false, description: ""});
        setDeleteGalleryId(null);
    };

    return (
        <>
            <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0 sticky top-0 bg-base-100 z-10 py-2">
                    <h1 className="text-3xl font-bold">Gallery Management</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <Plus className="h-4 w-4" /> Add Gallery
                    </button>
                </div>

                <GalleryTable
                    galleries={initialGalleries}
                    onEdit={(id) => { router.push(`/image-maint/${id}`); }}
                    onDelete={handleDeleteGallery}
                />
            </div>

            <GalleryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={async () => {    
                    toast.success("Gallery created successfully");                
                    router.refresh();
                }}
            />
   
            <ConfirmCancelModal
                isOpen={showDeleteConfirm.show}
                title="Delete Gallery"
                description={
                    <>
                        Are you sure you want to delete the gallery <strong>{showDeleteConfirm.description}</strong>?
                    </>
                }
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