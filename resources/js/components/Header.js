import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark" className="navbar-fixed-top">
            <Container fluid>
                <Navbar.Brand href="#home">BookWorm</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Home</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Shop
                        </Nav.Link>
                        <Nav.Link>About</Nav.Link>
                        <Nav.Link>Cart (0)</Nav.Link>
                        <Nav.Link>Sign In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}