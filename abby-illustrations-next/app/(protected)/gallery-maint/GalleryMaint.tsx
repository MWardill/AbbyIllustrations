'use client';
import { useState } from "react";
import { Gallery } from "./types";
import { GalleryTable } from "./GalleryTable";
import { GalleryModal } from "./GalleryModal";

export default function GalleryMaint({ initialGalleries }: { initialGalleries: Gallery[] }) {
    const [showModal, setShowModal] = useState(false);

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
                />
            </div>

            <GalleryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}