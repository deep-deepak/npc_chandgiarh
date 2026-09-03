import { Container, Row, Col } from 'react-bootstrap';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';
import { FaRunning } from 'react-icons/fa';

const CATEGORIES = [
    {
        icon: <GiMuscleUp />,
        title: 'Bodybuilding',
        org: 'NPC',
        desc: "Men's & Women's Bodybuilding Categories",
    },
    {
        icon: <GiWeightLiftingUp />,
        title: 'Powerlifting',
        org: 'IPL',
        desc: 'Indian Powerlifting League Categories',
    },
    {
        icon: <FaRunning />,
        title: 'Tri-Rox',
        org: 'By Tispor Singh',
        desc: 'Sandbag Lunges, Powerlifting, Type Flip',
    },
];

const CategorySection = () => {
    return (
        <section id="categories" className="category-section">
            <Container className="container-xl">
                <span className="eyebrow">Be a Part of the Biggest Fitness Event</span>
                <h2 className="section-title">Choose Your Category &amp; Register</h2>

                <Row className="gy-4 mt-4">
                    {CATEGORIES.map((cat, i) => (
                        <Col md={4} key={cat.title} data-aos="fade-up" data-aos-delay={i * 100}>
                            <div className="category-card">
                                <div className="category-icon">{cat.icon}</div>
                                <h4>{cat.title}</h4>
                                <div className="cat-org">{cat.org}</div>
                                <p>{cat.desc}</p>
                                <a href="#register" className="btn-brand">Register Now</a>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default CategorySection;
