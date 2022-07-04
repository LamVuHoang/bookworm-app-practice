import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Footer() {
    return (
        <Container className="bg-danger text-white" fluid>
            <Row>
                <Col>
                    BookWorm Photo
                </Col>
                <Col>
                    BOOKWORM 
                    <br />
                    Address 
                    <br />
                    Phone
                </Col>
            </Row>
        </Container>
    );
}