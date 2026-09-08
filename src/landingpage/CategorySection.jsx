import { Container, Row, Col } from 'react-bootstrap';
import { GiMuscleUp, GiWeightLiftingUp } from 'react-icons/gi';
import { FaRunning } from 'react-icons/fa';

const CATEGORIES = [
    {
        icon: <GiMuscleUp />,
        title: 'Bodybuilding',
        org: 'NPC',
        desc: "Men's & Women's Bodybuilding Categories",
        image: 'Bikini championship.png',
    },
    {
        icon: <GiWeightLiftingUp />,
        title: 'Powerlifting',
        org: 'IPL',
        desc: 'Indian Powerlifting League Categories',
        image: 'homebanner.png',
    },
    {
        icon: <FaRunning />,
        title: 'Tri-Rox',
        org: 'By Tripat Singh',
        desc: 'Sandbag Lunges, Powerlifting, Type Flip',
        image: '0a1bc46e-be05-42df-841f-8441289d8b64.jpg',
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
                                <div className="category-card-image">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${encodeURIComponent(cat.image)}`}
                                        alt={`${cat.title} - NPC Regionals Chandigarh 2026`}
                                    />
                                </div>
                                <div className="category-card-body">
                                    <div className="category-icon">{cat.icon}</div>
                                    <h4>{cat.title}</h4>
                                    <div className="cat-org">{cat.org}</div>
                                    <p>{cat.desc}</p>
                                    <a href="#register" className="btn-brand">Register Now</a>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default CategorySection;
