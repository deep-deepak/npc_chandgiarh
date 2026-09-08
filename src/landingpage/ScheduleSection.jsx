import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DayDetailModal from './DayDetailModal';
import CardImageSlider from './CardImageSlider';

const DAYS = [
    {
        day: 'Day 1',
        date: '9 OCT',
        title: 'Tri-Rox Challenge',
        images: ['eebcaf91-89ac-433d-b2e4-f325b2e0fb04.jpg', '0a1bc46e-be05-42df-841f-8441289d8b64.jpg'],
        items: ['Sandbag Lunges', 'Powerlifting', 'Type Flip', 'Open for All Athletes'],
    },
    {
        day: 'Day 2',
        date: '10 OCT',
        title: 'Indian Powerlifting League + Tri-Rox',
        images: ['homebanner.png'],
        items: ['Squat', 'Bench Press', 'Deadlift', 'All Weight Categories'],
    },
    {
        day: 'Day 3',
        date: '11 OCT',
        title: 'National Bodybuilding & Bikini Championship',
        images: ['Bikini championship.png', 'homebanner2.png'],
        items: ["Men's Physique", 'Classic Physique', "Women's Figure", 'Bodybuilding & Bikini'],
    },
];

const ScheduleSection = () => {
    const [activeDay, setActiveDay] = useState(null);

    return (
        <section id="schedule" className="schedule-section">
            <Container className="container-xl">
                <span className="eyebrow">What to Expect</span>
                <h2 className="section-title">Three Days. Endless Energy.</h2>

                <Row className="gy-4 mt-4">
                    {DAYS.map((d, i) => (
                        <Col md={4} key={d.day} data-aos="fade-up" data-aos-delay={i * 100}>
                            <div className="day-card">
                                <div className="day-card-header">
                                    <span>{d.day}</span>
                                    <span className="date-pill">{d.date}</span>
                                </div>
                                <div className="day-card-image">
                                    <CardImageSlider images={d.images} alt={d.title} />
                                </div>
                                <div className="day-card-body">
                                    <h4>{d.title}</h4>
                                    <ul>
                                        {d.items.map((it) => (
                                            <li key={it}>{it}</li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        className="day-card-link"
                                        onClick={() => setActiveDay(d)}
                                    >
                                        View Full Details →
                                    </button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <a href="#register" className="btn-brand mt-5">Register Now</a>
            </Container>

            <DayDetailModal day={activeDay} onClose={() => setActiveDay(null)} />
        </section>
    );
};

export default ScheduleSection;
