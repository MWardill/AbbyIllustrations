'use client';

import { useRef, useActionState } from 'react';
import Modal from '@/src/components/ui/modal';
import { useFormStatus } from "react-dom";
import { createGalleryAction } from './actions';

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [, action] = useActionState(createGalleryAction, { ok: false });

    const { pending } = useFormStatus();
   
    return (
        <Modal
            isOpen={isOpen}
            title="Add Gallery"
            description="Create a new gallery to organize your images"
            onClose={onClose}
            footer={
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="gallery-form"
                        disabled={pending}
                        className="btn btn-primary"
                    >
                        {pending ? 'Adding...' : 'Add Gallery'}
                    </button>
                </div>
            }
        >
            <form id="gallery-form" ref={formRef} action={action} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Gallery Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="e.g., Fashion Illustrations"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Gallery Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Describe what this gallery contains..."
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </form>
        </Modal>
    );
}
