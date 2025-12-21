'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import NextImage from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    eager?: boolean;
    sizes?: string;
    onClick?: () => void;
    expand?: boolean;
    author?: string | null;
    about?: string | null;
}

export default function Image({
    src,
    alt,
    className = "",
    width,
    height,
    eager = false,
    sizes,
    onClick,
    expand = false,
    author,
    about,
}: ImageProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        if (expand) {
            setIsExpanded(true);
        }
        onClick?.();
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const canExpand = expand;

    const expandedModal = isExpanded ? createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleClose}
        >
            <div className="relative max-w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <div className="relative overflow-hidden rounded-box">
                    <NextImage
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-[85vh] object-contain"
                        width={width || 1200}
                        height={height || 900}
                    />
                </div>
                
                {(about || author) && (
                    <div className="mt-4 text-white text-center max-w-prose bg-black/40 p-4 rounded-lg backdrop-blur-md border border-white/10">
                        {about && <p className="text-lg font-medium mb-1">{about}</p>}
                        {author && <p className="text-sm text-gray-300">By {author}</p>}
                    </div>
                )}

                <button
                    className="absolute -top-4 -right-4 btn btn-circle btn-sm btn-ghost bg-black/50 text-white hover:bg-black/70 border-none"
                    onClick={handleClose}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        </div>,
        document.body
    ) : null;

    return (
        <>
            <div className="relative w-full h-full">
                <NextImage
                    src={src}
                    alt={alt}
                    width={width || 800}
                    height={height || 600}
                    className={`${className} ${canExpand ? 'cursor-pointer' : ''}`}
                    priority={eager}
                    sizes={sizes}
                    onClick={handleClick}
                />
                {author && (
                    <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs p-2 backdrop-blur-sm rounded-tr-lg pointer-events-none">
                        <span className="opacity-75 text-[10px] uppercase tracking-wider mr-1">By</span>
                        <span className="font-medium">{author}</span>
                    </div>
                )}
            </div>
            {expandedModal}
        </>
    );
}
