import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

// Paste your Google Apps Script Web App URL here (see google-apps-script.gs for setup steps).
const GOOGLE_SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxs2FMIR2VoHV3z9s-Bhc2_Qk0GmctWIMjyQ96X8_ioTN2PRMja-1x1YVUpr70dLOM4bg/exec';

const CATEGORY_OPTIONS = [
    'Bodybuilding (NPC)',
    'Powerlifting (IPL)',
    'Tri-Rox',
];

// Registration fee tiers (INR) per category, matching the pricing on the schedule page.
const CATEGORY_TIERS = {
    'Bodybuilding (NPC)': [
        { value: 'single', label: 'Single Entry — ₹3,500', price: 3500 },
        { value: 'double', label: 'Double Entry — ₹6,000', price: 6000 },
        { value: 'triple', label: 'Triple Entry — ₹8,500', price: 8500 },
    ],
    'Powerlifting (IPL)': [
        { value: 'single', label: 'Single — ₹1,500', price: 1500 },
        { value: 'double', label: 'Double — ₹2,000', price: 2000 },
        { value: 'triple', label: 'Triple — ₹2,500', price: 2500 },
    ],
    'Tri-Rox': [
        { value: 'competitive', label: 'Competitive (Men & Women) — ₹2,000', price: 2000 },
        { value: 'non-competitive', label: 'Non-Competitive — ₹1,500', price: 1500 },
    ],
};

const TANNING_FEE = 2000; // Optional add-on, Bodybuilding (NPC) only

const getTierPrice = (category, entryType) => {
    const tier = CATEGORY_TIERS[category]?.find((t) => t.value === entryType);
    return tier ? tier.price : 0;
};

const getTotalAmount = (form) => {
    const base = getTierPrice(form.category, form.entryType);
    const tanning = form.category === 'Bodybuilding (NPC)' && form.tanning ? TANNING_FEE : 0;
    return base + tanning;
};

const INITIAL_STATE = {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    city: '',
    category: '',
    entryType: '',
    tanning: false,
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
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const nextValue = type === 'checkbox' ? checked : value;
        setForm((prev) => {
            if (name === 'category') {
                return { ...prev, category: nextValue, entryType: '', tanning: false };
            }
            return { ...prev, [name]: nextValue };
        });
    };

    const postToSheet = async (payload) => {
        const res = await fetch(GOOGLE_SHEET_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
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
        setErrorMessage('');

        if (!GOOGLE_SHEET_ENDPOINT) {
            // No backend configured — demo mode, skip payment entirely.
            setSubmitted(true);
            setForm(INITIAL_STATE);
            setValidated(false);
            return;
        }

        const amount = getTotalAmount(form);
        setSubmitting(true);

        try {
            const orderData = await postToSheet({ action: 'create_order', amount, category: form.category });
            if (orderData.result !== 'success') {
                throw new Error(orderData.message || 'Could not start payment.');
            }

            if (typeof window.Razorpay === 'undefined') {
                throw new Error('Payment gateway failed to load. Please refresh and try again.');
            }

            const rzp = new window.Razorpay({
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.orderId,
                name: 'NPC Regionals Chandigarh 2026',
                description: `Registration - ${form.category}${form.tanning ? ' + Tanning' : ''}`,
                prefill: {
                    name: form.fullName,
                    email: form.email,
                    contact: form.phone,
                },
                theme: { color: '#e5222a' },
                handler: async (response) => {
                    setSubmitting(true);
                    try {
                        const saveData = await postToSheet({
                            action: 'verify_and_save',
                            ...form,
                            amount,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        if (saveData.result !== 'success') {
                            throw new Error(saveData.message || 'Payment verification failed.');
                        }
                        setSubmitted(true);
                        setForm(INITIAL_STATE);
                        setValidated(false);
                    } catch (err) {
                        setErrorMessage(err.message);
                        setSubmitError(true);
                    } finally {
                        setSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: () => setSubmitting(false),
                },
            });

            rzp.on('payment.failed', (response) => {
                setErrorMessage(response.error?.description || 'Payment failed. Please try again.');
                setSubmitError(true);
                setSubmitting(false);
            });

            setSubmitting(false);
            rzp.open();
        } catch (err) {
            setErrorMessage(err.message);
            setSubmitError(true);
            setSubmitting(false);
        }
    };

    return (
        <section id="register" className="register-section">
            <Container className="container-xl">
                <div className="text-center">
                    <span className="eyebrow">Reserve Your Spot</span>
                    <h2 className="section-title">Athlete Registration</h2>
                    <p className="register-subtitle">
                        Fill in your details below to register for NPC Regionals Chandigarh 2026.
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
                                Thanks! Your registration and payment were captured. Our team will reach out shortly to confirm.
                            </Alert>
                        )}

                        {submitError && (
                            <Alert
                                variant="danger"
                                onClose={() => setSubmitError(false)}
                                dismissible
                            >
                                {errorMessage || 'Something went wrong while submitting. Please check your connection and try again.'}
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
                                        <Form.Label>Entry Type <span className="text-danger">*</span></Form.Label>
                                        <Form.Select
                                            name="entryType"
                                            value={form.entryType}
                                            onChange={handleChange}
                                            required
                                            disabled={!form.category}
                                        >
                                            <option value="">
                                                {form.category ? 'Select entry type' : 'Select a category first'}
                                            </option>
                                            {(CATEGORY_TIERS[form.category] || []).map((tier) => (
                                                <option key={tier.value} value={tier.value}>{tier.label}</option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select an entry type.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
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
                                {form.category === 'Bodybuilding (NPC)' && (
                                    <Col md={6} className="d-flex align-items-center">
                                        <Form.Check
                                            type="checkbox"
                                            id="tanning-addon"
                                            name="tanning"
                                            checked={form.tanning}
                                            onChange={handleChange}
                                            label={`Add Tanning Facility (+₹${TANNING_FEE})`}
                                        />
                                    </Col>
                                )}
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
                                        Processing...
                                    </>
                                ) : form.entryType && GOOGLE_SHEET_ENDPOINT ? (
                                    `Pay ₹${getTotalAmount(form)} & Register`
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
