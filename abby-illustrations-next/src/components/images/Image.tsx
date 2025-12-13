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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div className="relative max-w-[90vw] max-h-[90vh]">
                <NextImage
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[90vh] object-contain rounded-box"
                    width={width || 800}
                    height={height || 600}
                />
                <button
                    className="absolute -top-4 -right-4 btn btn-circle btn-sm"
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
            {expandedModal}
        </>
    );
}
