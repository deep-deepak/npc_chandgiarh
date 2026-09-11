import { Modal } from 'react-bootstrap';
import { DAY_DETAILS } from './scheduleDetails';

const renderBlock = (block, i) => {
    switch (block.type) {
        case 'p':
            return (
                <p key={i} className={`detail-p${block.lead ? ' detail-lead' : ''}${block.bold ? ' detail-bold' : ''}`}>
                    {block.text}
                </p>
            );
        case 'h':
            return <h5 key={i} className="detail-heading">{block.text}</h5>;
        case 'list':
            return (
                <ul key={i} className="detail-list">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
            );
        case 'flow':
            return (
                <ul key={i} className="detail-flow-list">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
            );
        case 'price':
            return (
                <div key={i} className="detail-price-grid">
                    {block.items.map((p) => (
                        <div className="detail-price-item" key={p.label}>
                            <span>{p.label}</span>
                            <strong>{p.price}</strong>
                        </div>
                    ))}
                </div>
            );
        case 'note':
            return <p key={i} className="detail-note">{block.text}</p>;
        case 'contact':
            return <p key={i} className="detail-contact">{block.text}</p>;
        case 'footer':
            return <p key={i} className="detail-footer">{block.text}</p>;
        default:
            return null;
    }
};

const DISTRICT_LINK = 'https://link.district.in/DSTRKT/9odjit7e';

const DayDetailModal = ({ day, onClose }) => {
    if (!day) return null;
    const blocks = DAY_DETAILS[day.day] || [];
    const isDay3 = day.day === 'Day 3';

    return (
        <Modal show={!!day} onHide={onClose} centered size="lg" scrollable className="day-detail-modal">
            <Modal.Header closeButton>
                <div>
                    <span className="detail-modal-eyebrow">{day.day} · {day.date}</span>
                    <Modal.Title>{day.title}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body>
                {blocks.map(renderBlock)}
                {isDay3 ? (
                    <a href="#register" className="btn-brand mt-3" onClick={onClose}>Register Now</a>
                ) : (
                    <a href={DISTRICT_LINK} target="_blank" rel="noopener noreferrer" className="btn-brand mt-3">Register Now</a>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default DayDetailModal;
