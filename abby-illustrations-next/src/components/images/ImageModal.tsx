'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string;
    alt: string;
    width?: number;
    height?: number;
    about?: string | null;
    author?: string | null;
    expand?: boolean;
}

export default function ImageModal({
    isOpen,
    onClose,
    src,
    alt,
    width,
    height,
    about,
    author,
    expand
}: ImageModalProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={onClose}
                >
                    <motion.div 
                        className="relative max-w-full max-h-full flex flex-col md:flex-row items-start justify-center gap-4 p-4" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div 
                            layoutId={expand && !isMobile ? `image-${src}` : undefined}
                            className="relative overflow-hidden rounded-box shrink-0"
                        >
                            <NextImage
                                src={src}
                                alt={alt}
                                className="max-w-full max-h-[85vh] object-contain"
                                width={width || 1200}
                                height={height || 900}
                            />
                        </motion.div>
                        
                        {(about || author) && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 md:mt-0 text-white text-left max-w-prose p-0 flex flex-col justify-start md:min-h-[40vh]"
                            >
                                {about && (
                                    <>
                                        {about.split(/\n\s*\n/)
                                            .map(p => p.trim())
                                            .filter(Boolean)
                                            .map((p, i) => (
                                                <motion.p 
                                                    key={i} 
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                                    className={`text-lg font-medium ${i > 0 ? 'mt-3' : 'mb-1'}`}
                                                >
                                                    {p}
                                                </motion.p>
                                            ))}
                                    </>
                                )}
                                {author && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: 0.2 + (about ? about.split(/\n\s*\n/).filter(Boolean).length * 0.1 : 0) }}
                                        className="text-sm text-gray-300"
                                    >
                                        By {author}
                                    </motion.p>
                                )}
                            </motion.div>
                        )}

                        <button
                            className="absolute -top-4 -right-4 btn btn-circle btn-sm btn-ghost bg-black/50 text-white hover:bg-black/70 border-none"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
