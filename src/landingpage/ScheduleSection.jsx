import { Container, Row, Col } from 'react-bootstrap';

const DAYS = [
    {
        day: 'Day 1',
        date: '9 OCT',
        title: 'Tri-Rox Challenge',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
        items: ['Sandbag Lunges', 'Powerlifting', 'Type Flip', 'Open for All Athletes'],
    },
    {
        day: 'Day 2',
        date: '10 OCT',
        title: 'Indian Powerlifting League',
        image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=800&auto=format&fit=crop',
        items: ['Squat', 'Bench Press', 'Deadlift', 'All Weight Categories'],
    },
    {
        day: 'Day 3',
        date: '11 OCT',
        title: 'NPC Bodybuilding Show',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
        items: ["Men's Physique", 'Classic Physique', "Women's Figure", 'Bodybuilding & Bikini'],
    },
];

const ScheduleSection = () => {
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
                                    <img src={d.image} alt={d.title} />
                                </div>
                                <div className="day-card-body">
                                    <h4>{d.title}</h4>
                                    <ul>
                                        {d.items.map((it) => (
                                            <li key={it}>{it}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                <a href="#register" className="btn-brand mt-5">Register Now</a>
            </Container>
        </section>
    );
};

export default ScheduleSection;
