import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import IMAGES from '../../assets';

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className="navbar-fixed-top">
            <Container fluid>
                <Navbar.Brand href="#home">
                    <Image src={IMAGES.bookCover} fluid />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link><NavLink to={'/'}>Home</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/shop'}>
                            Shop
                        </NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/about'}>About</NavLink></Nav.Link>
                        <Nav.Link><NavLink to={'/cart'}>Cart (0)</NavLink></Nav.Link>
                        {/* <NavLink to={'/signin'}>Sign In</NavLink> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}