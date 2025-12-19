'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { GalleryImage } from '@/db/queries/gallery-maint/galleries';
import Image from '@/src/components/images/Image';
import { blobUrl } from '@/src/lib/blobUtils';
import styles from './GalleryImageGrid.module.css';
import { galleryImageSchema, type GalleryImageFormData } from './validation';
import { Input } from '@/src/components/form/Input';

interface GalleryImageFormProps {
    image: GalleryImage;
    shouldSlideOut: boolean;
    onSave: (formData: Partial<GalleryImage>) => Promise<void>;
    onCancel: () => void;
}

export function GalleryImageForm({ image, shouldSlideOut, onSave, onCancel }: GalleryImageFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<GalleryImageFormData>({
        resolver: zodResolver(galleryImageSchema),
        defaultValues: {
            alt: image.alt,
            about: image.about,
            author: image.author,
            createdDate: image.createdDate ? String(image.createdDate) : '',
            primaryImage: image.primaryImage || false,
        }
    });

    useEffect(() => {
        reset({
            alt: image.alt,
            about: image.about,
            author: image.author,
            createdDate: image.createdDate ? String(image.createdDate) : '',
            primaryImage: image.primaryImage || false,
        });
    }, [image, reset]);

    const onSubmit = async (data: GalleryImageFormData) => {
        await onSave({ ...image, ...data });
    };

    return (
        <div className={`sticky top-4 flex justify-center items-start w-full lg:w-auto ${shouldSlideOut ? styles.previewCardRemove : styles.previewCardChange}`}>
            <div className="card bg-base-100 shadow-md lg:h-[75vh]">
                <figure className="relative w-full lg:h-3/4 flex justify-center items-start">
                    <Image
                        src={blobUrl(image.pathname)}
                        alt={image.alt}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        expand={true}
                    />
                </figure>
                <div className="card-body p-2 text-xs space-y-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
                        <Input
                            label="Alt Text"
                            type="text"
                            error={errors.alt}
                            {...register('alt')}
                        />

                        <div className="form-control w-full">
                            <label className="label py-1">
                                <span className="label-text text-xs font-medium">About</span>
                            </label>
                            <textarea
                                className={`textarea textarea-bordered textarea-sm w-full text-xs ${errors.about ? 'textarea-error' : ''}`}
                                {...register('about')}
                                rows={3}
                            />
                            {errors.about && <span className="text-error text-[10px] mt-1">{errors.about.message}</span>}
                        </div>

                        <Input
                            label="Author"
                            type="text"
                            error={errors.author}
                            {...register('author')}
                        />

                        <Input
                            label="Created Date"
                            type="date"
                            error={errors.createdDate}
                            {...register('createdDate')}
                        />

                        <div className="form-control w-full">
                            <label className="label cursor-pointer py-1 justify-start gap-2">
                                <span className="label-text text-xs font-medium">Primary Image</span>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    {...register('primaryImage')}
                                />
                            </label>
                        </div>

                        <div className="mt-2">
                            <p className="text-gray-500 text-xs">Updated: {new Date(image.updatedAt).toLocaleDateString()}</p>
                        </div>

                        <div className="flex gap-2 mt-2 w-full">
                            <button type="submit" className="btn btn-primary btn-sm flex-1">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline btn-sm flex-1 lg:hidden"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
