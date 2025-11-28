interface TimelineNodeProps {
    isActive: boolean;
    position: 'start' | 'end';
    year?: string;
    children: React.ReactNode;
    isFirst?: boolean;
    isLast?: boolean;
}

export default function TimelineNode({ isActive, position, year, children, isFirst = false, isLast = false }: TimelineNodeProps) {
    const positionClass = position === 'start' ? 'timeline-start md:text-end' : 'timeline-end md:text-start';

    return (
        <li>
            {!isFirst && (
                <hr className={`transition-colors duration-300 ${isActive ? 'bg-primary' : ''}`} />
            )}
            <div className="timeline-middle z-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-primary' : ''}`}
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className={`${positionClass} mb-10 p-0`}>
                <time className="font-mono italic">{year}</time>
                {children}
            </div>
            {!isLast && (
                <hr className={`transition-colors duration-300 ${isActive ? 'bg-primary' : ''}`} />
            )}
        </li>
    );
}
