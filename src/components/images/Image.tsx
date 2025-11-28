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
}: ImageProps) {
    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={eager ? "high" : "auto"}
            srcSet={srcSet}
            sizes={sizes}
            onClick={onClick}
        />
    );
}
