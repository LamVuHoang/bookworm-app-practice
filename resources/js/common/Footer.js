import { 
    Container,
    Navbar,
    Image
} from 'react-bootstrap';
import IMAGES from '../../assets';


export default function Footer() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className="navbar-fixed-top">
            <Container fluid>
                <Navbar.Brand href="#home">
                    <Image src={IMAGES.bookCover} fluid />
                </Navbar.Brand>
                {/* <Nav className="me-auto">
                    <Nav.Link href="#features">Phone</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link href="#features">Address</Nav.Link>
                </Nav> */}
            </Container>
        </Navbar>
    );
}