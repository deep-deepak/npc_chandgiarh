import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

// Paste your Google Apps Script Web App URL here (see google-apps-script.gs for setup steps).
const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzRTpcu6tK3GsB08KcVgy-evoBHJM9WEQ58iiIACjt1RNzTAKaNImCIrheb36YX2jhAyA/exec';

const CATEGORY_OPTIONS = [
    'Bodybuilding (NPC)',
    'Powerlifting (IPL)',
    'Tri-Rox',
];

const INITIAL_STATE = {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    city: '',
    category: '',
    division: '',
    emergencyContact: '',
    message: '',
    agree: false,
};

const RegistrationForm = () => {
    const [form, setForm] = useState(INITIAL_STATE);
    const [validated, setValidated] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const el = e.currentTarget;

        if (!el.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        setSubmitError(false);

        if (GOOGLE_SHEET_ENDPOINT) {
            setSubmitting(true);
            try {
                const res = await fetch(GOOGLE_SHEET_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(form),
                });
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                const data = await res.json();
                if (data.result !== 'success') throw new Error('Unexpected response from sheet');
            } catch (err) {
                setSubmitting(false);
                setSubmitError(true);
                return;
            }
            setSubmitting(false);
        }

        setSubmitted(true);
        setForm(INITIAL_STATE);
        setValidated(false);
    };

    return (
        <section id="register" className="register-section">
            <Container className="container-xl">
                <div className="text-center">
                    <span className="eyebrow">Reserve Your Spot</span>
                    <h2 className="section-title">Athlete Registration</h2>
                    <p className="register-subtitle">
                        Fill in your details below to register for NPC Regional Chandigarh 2025.
                    </p>
                </div>

                <Row className="justify-content-center mt-4">
                    <Col lg={8}>
                        {submitted && (
                            <Alert
                                variant="success"
                                onClose={() => setSubmitted(false)}
                                dismissible
                            >
                                Thanks! Your registration details were captured. Our team will reach out shortly to confirm.
                            </Alert>
                        )}

                        {submitError && (
                            <Alert
                                variant="danger"
                                onClose={() => setSubmitError(false)}
                                dismissible
                            >
                                Something went wrong while submitting. Please check your connection and try again.
                            </Alert>
                        )}

                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            className="register-form-card"
                        >
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your full name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid email address.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            placeholder="+91 98765 43210"
                                            pattern="[0-9+\s\-]{7,15}"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid phone number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Emergency Contact Number <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="emergencyContact"
                                            placeholder="Alternate contact number"
                                            pattern="[0-9+\s\-]{7,15}"
                                            value={form.emergencyContact}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter an emergency contact number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                                        <Form.Select
                                            name="gender"
                                            value={form.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select your gender.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={form.dob}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your date of birth.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            placeholder="Your city"
                                            value={form.city}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your city.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Event Category <span className="text-danger">*</span></Form.Label>
                                        <Form.Select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {CATEGORY_OPTIONS.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select an event category.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Weight Category / Division</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="division"
                                            placeholder="e.g. Men's Physique - 75kg"
                                            value={form.division}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Additional Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    rows={4}
                                    placeholder="Anything else we should know?"
                                    value={form.message}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Check
                                    type="checkbox"
                                    id="agree-terms"
                                    name="agree"
                                    checked={form.agree}
                                    onChange={handleChange}
                                    required
                                    label="I agree to the event rules & guidelines and confirm the information above is accurate."
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                />
                            </Form.Group>

                            <Button type="submit" className="btn-brand w-100 w-md-auto" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Registration'
                                )}
                            </Button>

                            {!GOOGLE_SHEET_ENDPOINT && (
                                <p className="register-note">
                                    This form is for demonstration purposes and does not currently submit anywhere &mdash; set GOOGLE_SHEET_ENDPOINT in this file to connect it to your Google Sheet (see google-apps-script.gs).
                                </p>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default RegistrationForm;
