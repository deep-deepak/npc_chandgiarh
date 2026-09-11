import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import HeroSlider, { HERO_SLIDES } from './HeroSlider';

const HeroSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const current = HERO_SLIDES[activeSlide];

    return (
        <section id="home" data-aos="fade-in" className="hero-section">
            <Container className="container-xl">
                <Row className="align-items-center gy-5">
                    <Col lg={6}>
                        <h1 className="hero-title">
                            NPC Regionals
                            <span className="accent">Chandigarh 2026</span>
                        </h1>
                        <p className="hero-tagline">Build Your Body. Build Your Legacy.</p>
                        <p className="hero-description" key={activeSlide}>
                            <span className="hero-discipline">{current.label}</span> — {current.description}
                        </p>

                        <div className="d-flex flex-wrap mb-4">
                            <span className="hero-badge">
                                <FaCalendarAlt /> 9 - 11 October 2025
                            </span>
                            <span className="hero-badge">
                                <FaMapMarkerAlt /> Indradhanush Auditorium, Panchkula, Chandigarh
                            </span>
                        </div>

                        <div className="d-flex flex-wrap gap-3">
                            <a href="https://link.district.in/DSTRKT/9odjit7e" target="_blank" rel="noopener noreferrer" className="btn-brand">Register Now</a>
                            <a href="#schedule" className="btn-outline-light-custom">Event Details</a>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="hero-image-wrap" data-aos="fade-left">
                            <HeroSlider onActiveChange={setActiveSlide} />
                            <div className="prize-tag">
                                <span className="amount">₹4.5 Lakh</span>
                                <span className="label">CASH PRIZES</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;
