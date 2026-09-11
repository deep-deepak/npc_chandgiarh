import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const QUICK_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#schedule' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Contact', href: '#contact' },
];

const EVENT_LINKS = [
    { label: 'Tri-Rox Challenge', href: '#schedule' },
    { label: 'Indian Powerlifting League', href: '#schedule' },
    { label: 'NPC Bodybuilding Show', href: '#schedule' },
    { label: 'Registration', href: '#register' },
    { label: 'Rules & Guidelines', href: '#' },
];

const Footer = () => {
    return (
        <footer className="site-footer">
            <Container className="container-xl">
                <Row className="gy-4">
                    <Col lg={4} md={6}>
                        <div className="d-flex align-items-center mb-2">
                            <img src={`${import.meta.env.BASE_URL}sports13nnlogo.webp`} alt="Sports-XIII" className="brand-partner-logo" />
                            <span className="brand-divider">/</span>
                            <div className="brand-logo">NP<span>C</span></div>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                            Building stronger athletes and a stronger community.
                        </p>
                        <div className="footer-socials">
                            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="YouTube"><FaYoutube /></a>
                        </div>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6>Quick Links</h6>
                        <ul>
                            {QUICK_LINKS.map((l) => (
                                <li key={l.label}><a href={l.href}>{l.label}</a></li>
                            ))}
                        </ul>
                    </Col>
                    <Col lg={3} md={6}>
                        <h6>Events</h6>
                        <ul>
                            {EVENT_LINKS.map((l) => (
                                <li key={l.label}><a href={l.href}>{l.label}</a></li>
                            ))}
                        </ul>
                    </Col>
                    <Col lg={3} md={6}>
                        <h6>Register Now</h6>
                        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                            Don't miss your chance to be part of this historic event.
                        </p>
                        <a href="https://link.district.in/DSTRKT/9odjit7e" target="_blank" rel="noopener noreferrer" className="btn-brand">Register Now</a>
                    </Col>
                </Row>

                <div className="footer-legal">
                    <a href={`${import.meta.env.BASE_URL}privacy-policy.html`}>Privacy Policy</a>
                    <a href={`${import.meta.env.BASE_URL}refund-policy.html`}>Refund &amp; Cancellation Policy</a>
                    <a href={`${import.meta.env.BASE_URL}terms-and-conditions.html`}>Terms &amp; Conditions</a>
                </div>

                <div className="footer-bottom">
                    <span>© 2025 NPC Regionals Chandigarh 2026. All Rights Reserved.</span>
                    <span>Designed with <span className="heart">♥</span> for Fitness Community</span>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
