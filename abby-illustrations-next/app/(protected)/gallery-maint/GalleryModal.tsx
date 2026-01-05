'use client';
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from '@/src/components/ui';
import { GalleryInput, gallerySchema } from './validation';
import { getErrorMessage, handleError } from '@/src/lib/errorUtils';
import { Gallery } from "./types";


interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void | Promise<void>;
    gallery?: Gallery | null;
}

export function GalleryModal({ isOpen, onClose, onSuccess, gallery }: GalleryModalProps) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
    } = useForm<GalleryInput>({
        resolver: zodResolver(gallerySchema),
        mode: "onSubmit",
    });

    useEffect(() => {
        if (isOpen) {
            if (gallery) {
                reset({
                    title: gallery.gallery_title,
                    menuTitle: gallery.menu_title || "",
                    description: gallery.gallery_description,
                    imagePosition: gallery.image_position || "",
                });
            } else {
                reset({
                    title: "",
                    menuTitle: "",
                    description: "",
                    imagePosition: "",
                });
            }
        }
    }, [isOpen, gallery, reset]);

    const onSubmit = async (data: GalleryInput) => {
        setSubmitting(true);
        setServerError(null);

        try {            
            const method = gallery ? "PUT" : "POST";
            const body = gallery ? { ...data, id: gallery.id } : data;

            const res = await fetch("/api/protected/galleries", {
                method: method,
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const payload = await res.json();

                // If server returned fieldErrors, map them into RHF
                if (payload?.fieldErrors?.title?.[0]) {
                    setError("title", { type: "server", message: payload.fieldErrors.title[0] });
                }
                if (payload?.fieldErrors?.menuTitle?.[0]) {
                    setError("menuTitle", { type: "server", message: payload.fieldErrors.menuTitle[0] });
                }
                if (payload?.fieldErrors?.description?.[0]) {
                    setError("description", { type: "server", message: payload.fieldErrors.description[0] });
                }

                const msg = payload?.message ?? (gallery ? "Failed to update gallery." : "Failed to create gallery.");
                setServerError(msg);
                handleError(msg);
                return;
            }

            reset();
            await onSuccess?.();
            onClose();
        } catch (error) {
            const err = getErrorMessage(error);
            setServerError(err);
            handleError(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            title={gallery ? "Edit Gallery" : "Add Gallery"}
            description={gallery ? "Update gallery details" : "Create a new gallery to organize your images"}
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
                        disabled={submitting}
                        className="btn btn-primary"
                    >
                        {submitting ? (gallery ? 'Updating...' : 'Adding...') : (gallery ? 'Update Gallery' : 'Add Gallery')}
                    </button>
                </div>
            }
        >
            <form id="gallery-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {serverError ? (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {serverError}
                    </div>
                ) : null}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Gallery Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="e.g., Fashion Illustrations"
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("title")}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="menuTitle" className="block text-sm font-medium text-gray-700">
                        Menu Title
                    </label>
                    <input
                        id="menuTitle"
                        type="text"
                        required
                        placeholder="e.g., Fashion"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("menuTitle")}
                    />
                    {errors.menuTitle && <p className="mt-1 text-sm text-red-600">{errors.menuTitle.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Gallery Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        placeholder="Describe what this gallery contains..."
                        required
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="imagePosition" className="block text-sm font-medium text-gray-700">
                        Image Position
                    </label>
                    <select
                        id="imagePosition"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        {...register("imagePosition")}
                    >
                        <option value="">Select position...</option>
                        <option value="top">Top</option>
                        <option value="center">Center</option>
                        <option value="bottom">Bottom</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                    {errors.imagePosition && <p className="mt-1 text-sm text-red-600">{errors.imagePosition.message}</p>}
                </div>
            </form>
        </Modal>
    );
}
