import {
    Container,
    Nav, Navbar,
    Image
} from 'react-bootstrap';
import {
    faHouse,
    faShop,
    faCartShopping,
    faArrowRightToBracket,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import IMAGES from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className="myNavbar">
            <Container fluid className='d-flex'>
                <Navbar.Brand href={"/"}>
                    <Image src={IMAGES.bookCover} fluid />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink to={'/'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Home</span>
                        </NavLink>
                        <NavLink to={'/shop'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            <FontAwesomeIcon icon={faShop} />
                            <span>Shop</span>
                        </NavLink>
                        <NavLink to={'/about'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <span>About</span>
                        </NavLink>
                        <NavLink to={'/cart'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span>Cart (0)</span>
                        </NavLink>
                        <NavLink to={'/signin'} className={
                            ({ isActive }) => (isActive ? 'myNavLinkIsActive' : 'myNavLink')
                        }>
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            <span>Sign In</span>
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}