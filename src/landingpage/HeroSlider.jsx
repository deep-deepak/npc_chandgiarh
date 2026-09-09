import { useEffect, useState } from 'react';

export const HERO_SLIDES = [
    {
        src: 'homebanner.png',
        alt: 'NPC Regionals Chandigarh 2026 - powerlifting stage',
        label: 'Powerlifting',
        description: 'Squat, bench, deadlift — pure strength on the platform.',
    },
   
    {
        src: 'powerlifting-lineup1.png',
        alt: 'NPC Regionals Chandigarh 2026 - bodybuilding lineup',
        label: 'Bodybuilding',
        description: 'Physique, symmetry and stage presence at their peak.',
    },
    {
        src: 'eebcaf91-89ac-433d-b2e4-f325b2e0fb04.jpg',
        alt: 'NPC Regionals Chandigarh 2026 - Tri-Rox challenge',
        label: 'Tri-Rox',
        description: 'Running, strength and endurance combined into one ultimate challenge.',
    },
];

const SLIDE_INTERVAL_MS = 4000;

const HeroSlider = ({ onActiveChange }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        onActiveChange?.(activeIndex);
    }, [activeIndex, onActiveChange]);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-slider">
            {HERO_SLIDES.map((slide, i) => (
                <img
                    key={slide.src}
                    src={`${import.meta.env.BASE_URL}${encodeURIComponent(slide.src)}`}
                    alt={slide.alt}
                    className={`hero-slide${i === activeIndex ? ' active' : ''}`}
                />
            ))}
            <div className="hero-slider-dots">
                {HERO_SLIDES.map((slide, i) => (
                    <button
                        key={slide.src}
                        type="button"
                        aria-label={`Show slide ${i + 1}`}
                        className={`hero-slider-dot${i === activeIndex ? ' active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
