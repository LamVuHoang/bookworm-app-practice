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
                        <NavLink to={'/'}>Home</NavLink>
                        <NavLink to={'/shop'}>
                            Shop
                        </NavLink>
                        <NavLink to={'/about'}>About</NavLink>
                        <NavLink to={'/cart'}>Cart (0)</NavLink>
                        {/* <NavLink to={'/signin'}>Sign In</NavLink> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}