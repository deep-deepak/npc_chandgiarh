import { Container, Row, Col } from 'react-bootstrap';

const STATS = [
    { number: '3', label: 'Days' },
    { number: '20+', label: 'Categories' },
    { number: '500+', label: 'Athletes' },
    { number: '1', label: 'Legacy' },
];

const AboutSection = () => {
    return (
        <section id="about" className="about-section">
            <Container className="container-xl">
                <Row className="align-items-center gy-5">
                    <Col lg={6} data-aos="fade-right">
                        <span className="eyebrow">About NPC Regional</span>
                        <h2 className="section-title">Uniting Strength. Inspiring Champions.</h2>
                        <p>
                            NPC Regional Chandigarh is a premier platform for athletes,
                            bodybuilders, powerlifters and fitness enthusiasts to showcase
                            their strength, discipline and dedication.
                        </p>
                        <p>
                            Join us for three power-packed days of competitions, learning,
                            and networking.
                        </p>

                        <div className="stats-row">
                            {STATS.map((s) => (
                                <div className="stat-item" key={s.label}>
                                    <div className="stat-number">{s.number}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col lg={6} data-aos="fade-left">
                        <div className="about-image-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
                                alt="NPC Regional Chandigarh athlete lineup"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutSection;
