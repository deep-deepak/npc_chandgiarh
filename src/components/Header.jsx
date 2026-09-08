import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#categories' },
    { label: 'Registration', href: '#register' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Contact', href: '#contact' },
];

const Header = () => {
    return (
        <Navbar expand="lg" className="site-header" variant="dark" sticky="top">
            <Container className="container-xl">
                <Navbar.Brand href="#home" className="d-flex flex-column">
                    <span className="brand-logo">NP<span>C</span></span>
                    <span className="brand-sub">REGIONALS CHANDIGARH 2026</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" className="justify-content-end align-items-lg-center">
                    <Nav>
                        {NAV_LINKS.map((link) => (
                            <Nav.Link key={link.label} href={link.href}>
                                {link.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Button
                        as="a"
                        href="#register"
                        className="btn-brand mt-3 mt-lg-0 ms-lg-3"
                    >
                        Register Now
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
