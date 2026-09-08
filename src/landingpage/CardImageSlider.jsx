import { useEffect, useState } from 'react';

const SLIDE_INTERVAL_MS = 3500;

const CardImageSlider = ({ images, alt }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (images.length < 2) return undefined;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="card-slider">
            {images.map((src, i) => (
                <img
                    key={src}
                    src={`${import.meta.env.BASE_URL}${encodeURIComponent(src)}`}
                    alt={alt}
                    className={`card-slide${i === activeIndex ? ' active' : ''}`}
                />
            ))}
            {images.length > 1 && (
                <div className="card-slider-dots">
                    {images.map((src, i) => (
                        <span key={src} className={`card-slider-dot${i === activeIndex ? ' active' : ''}`} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardImageSlider;
