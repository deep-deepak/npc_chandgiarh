import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactBar = () => {
    return (
        <section id="contact" className="contact-bar">
            <div className="contact-bar-inner">
                <div className="contact-item">
                    <span className="icon phone"><FaPhoneAlt /></span>
                    <div>
                        +91 98765 43210
                        <br />
                        +91 98765 43211
                    </div>
                </div>
                <div className="contact-item">
                    <span className="icon"><FaEnvelope /></span>
                    <div>info@npcregionalchandigarh.com</div>
                </div>
                <div className="contact-item">
                    <span className="icon"><FaMapMarkerAlt /></span>
                    <div>
                        Indradhanush Auditorium
                        <br />
                        Panchkula, Chandigarh
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactBar;
