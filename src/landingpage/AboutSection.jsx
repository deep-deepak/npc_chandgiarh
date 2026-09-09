import { Container, Row, Col } from 'react-bootstrap';

const STATS = [
    { number: '3', label: 'Days' },
    { number: '20+', label: 'Categories' },
    { number: '1000+', label: 'Athletes' },
    { number: '1', label: 'Legacy' },
];

const DAY_HIGHLIGHTS = [
    {
        title: '9th & 10th October — Tri-Rox by Tripat Singh',
        text: "A high-energy functional fitness competition combining running with demanding strength and conditioning challenges. Athletes will take on movements including sandbag lunges, trap-bar farmers walks, tire flips, box jumps, burpees and floor-to-overhead presses. Tri-Rox features Competitive Men's, Competitive Women's and Non-Competitive categories, making it accessible to both serious competitors and fitness enthusiasts.",
    },
    {
        title: '10th October — Indian Powerlifting League',
        text: 'A dedicated day of strength and power, featuring the Indian Powerlifting League, conducted by renowned powerlifting personality Bhupinder Dhawan.',
    },
    {
        title: '11th October — National Bodybuilding & Bikini Championship',
        text: 'The stage gets bigger with the National Bodybuilding & Bikini Championship, featuring national-level judges and a pathway associated with Sheru Classic. With the #RoadToSheruClassic, athletes get the opportunity to take their competitive journey toward the Sheru Classic stage in Delhi or Mumbai.',
    },
];

const AboutSection = () => {
    return (
        <section id="about" className="about-section">
            <Container className="container-xl">
                <Row className="align-items-center gy-5">
                    <Col lg={6} data-aos="fade-right">
                        <span className="eyebrow">About NPC Regionals</span>
                        <h2 className="section-title">Uniting Strength. Inspiring Champions.</h2>
                        <p>
                            NPC Regionals Chandigarh 2026 is bringing one of North India's biggest
                            celebrations of fitness, strength, bodybuilding and sports to Panchkula
                            from 9th to 11th October 2026.
                        </p>
                        <p>
                            Conceptualised, managed and executed by Sports13, the three-day event
                            brings together athletes, fitness enthusiasts, brands, influencers and
                            spectators for an experience that goes beyond competition. From
                            high-intensity functional fitness and powerlifting to bodybuilding and
                            physique sports, the event is designed to showcase strength,
                            performance and the evolving fitness culture of North India.
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
                                src="https://images.unsplash.com/photo-1434847868581-86e8a2b8e7a3?q=80&w=1200&auto=format&fit=crop"
                                alt="NPC Regionals Chandigarh 2026 athlete lineup"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-5 pt-4">
                    <Col lg={10} data-aos="fade-up">
                        <h3 className="detail-heading" style={{ fontSize: 24, marginTop: 0 }}>
                            Three Days. Three Experiences. One Fitness Destination.
                        </h3>

                        {DAY_HIGHLIGHTS.map((d) => (
                            <div key={d.title} className="mb-4">
                                <h4 className="detail-heading" style={{ fontSize: 16, marginBottom: 6 }}>
                                    {d.title}
                                </h4>
                                <p className="detail-p" style={{ marginBottom: 0 }}>{d.text}</p>
                            </div>
                        ))}

                        <h3 className="detail-heading" style={{ fontSize: 24 }}>More Than a Competition</h3>
                        <p className="detail-p">
                            NPC Regionals Chandigarh 2026 will also feature a vibrant fitness and
                            sports expo, giving brands and businesses the opportunity to showcase
                            their products and connect directly with the fitness community.
                        </p>
                        <p className="detail-p">
                            Visitors can experience influencer appearances, interactive fitness
                            challenges, fun games and activities, including the Clock Push-Up
                            Challenge, Dead Hang Challenge, Couple Fun Games and more.
                        </p>
                        <p className="detail-p">
                            And with ₹4.5 lakh in total cash prizes across the three main events,
                            there is plenty at stake for athletes stepping onto the competition
                            floor.
                        </p>

                        <h3 className="detail-heading" style={{ fontSize: 24 }}>Built for the Fitness Community</h3>
                        <p className="detail-p">
                            Whether you're an athlete chasing your next podium, a fitness
                            enthusiast looking for an unforgettable experience, a brand looking to
                            connect with an active audience, or simply someone who loves the world
                            of fitness and sport — NPC Regionals Chandigarh 2026 has something for
                            you.
                        </p>

                        <p className="detail-footer">
                            9–11 October 2026 | Panchkula
                            <br />
                            Compete. Connect. Experience the Fitness Movement.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutSection;
