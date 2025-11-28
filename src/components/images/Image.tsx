import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    eager?: boolean;
    srcSet?: string;
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
    srcSet,
    sizes,
    onClick,
    expand = false,
}: ImageProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = () => {
        if (expand && !isMobile) {
            setIsExpanded(true);
        }
        onClick?.();
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const canExpand = expand && !isMobile;

    const expandedModal = isExpanded ? createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div className="relative max-w-[90vw] max-h-[90vh]">
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[90vh] object-contain rounded-box"
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
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`${className} ${canExpand ? 'cursor-pointer' : ''}`}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={eager ? "high" : "auto"}
                srcSet={srcSet}
                sizes={sizes}
                onClick={handleClick}
            />
            {expandedModal}
        </>
    );
}
