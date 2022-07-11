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
                <Navbar.Brand href={"/"}>
                    <Image src={IMAGES.bookCover} fluid />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink to={'/'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>Home</NavLink>
                        <NavLink to={'/shop'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            Shop
                        </NavLink>
                        <NavLink to={'/about'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            About
                        </NavLink>
                        <NavLink to={'/cart'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            Cart (0)
                        </NavLink>
                        {/* <NavLink to={'/signin'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            Sign In
                        </NavLink> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}