import { Container } from 'react-bootstrap';
import { FaFlag, FaMoneyBillWave, FaUserTie, FaUsers, FaCamera } from 'react-icons/fa';

const WHY_ITEMS = [
    { icon: <FaFlag />, label: 'National Level Exposure' },
    { icon: <FaMoneyBillWave />, label: '₹4.5 Lakh Cash Prizes' },
    { icon: <FaUserTie />, label: 'Judged by Experts' },
    { icon: <FaUsers />, label: 'Network with Top Athletes' },
    { icon: <FaCamera />, label: 'Media & Brand Visibility' },
];

const WhyParticipate = () => {
    return (
        <section className="why-section">
            <Container className="container-xl">
                <span className="eyebrow">Why Participate?</span>
                <h2 className="section-title">More Than Just a Competition</h2>

                <div className="why-grid">
                    {WHY_ITEMS.map((item) => (
                        <div className="why-item" key={item.label}>
                            <div className="why-icon">{item.icon}</div>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="center-btn">
                    <a href="#register" className="btn-brand">Register Now</a>
                </div>
            </Container>
        </section>
    );
};

export default WhyParticipate;
