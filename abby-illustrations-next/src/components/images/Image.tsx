'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ImageModal = dynamic(() => import('./ImageModal'), { ssr: false });

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

    return (
        <>
            <div className="relative w-full h-full">
                <motion.div 
                    layoutId={expand ? `image-${src}` : undefined}
                    className="w-full h-full"
                    onClick={handleClick}
                >
                    <NextImage
                        src={src}
                        alt={alt}
                        width={width || 800}
                        height={height || 600}
                        className={`${className} ${canExpand ? 'cursor-pointer' : ''}`}
                        priority={eager}
                        sizes={sizes}
                    />
                </motion.div>
                {author && (
                    <div className="absolute bottom-0 left-0 bg-black/50 text-white text-xs p-2 backdrop-blur-sm rounded-tr-lg pointer-events-none">
                        <span className="opacity-75 text-[10px] uppercase tracking-wider mr-1">By</span>
                        <span className="font-medium">{author}</span>
                    </div>
                )}
            </div>
            <ImageModal 
                isOpen={isExpanded}
                onClose={handleClose}
                src={src}
                alt={alt}
                width={width}
                height={height}
                about={about}
                author={author}
                expand={expand}
            />
        </>
    );
}
