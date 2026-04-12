'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
    src: string;
    alt: string | undefined;
    className?: string;
}

export default function MovieImage({ src, alt, className }: Props) {
    return (
        <LazyLoadImage
            alt={alt}
            src={src}
            effect="blur"
            className={className}
            wrapperClassName={className}
        />
    );
}
