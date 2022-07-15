import React from 'react';
import { NavLink } from "react-router-dom";
import {
    Container,
    Nav, Navbar,
    Image,
    Button, Form, Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faShop,
    faCartShopping,
    faArrowRightToBracket,
    faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import IMAGES from '../../assets';

export default class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    handleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="lg" className="myNavbar">
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
                                <Nav.Link className='myNavLink' onClick={this.handleModal}>
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                    <span>Sign In</span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Modal show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal}>
                            Close
                        </Button>
                        <Button variant="primary">
                            Sign In
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }
}