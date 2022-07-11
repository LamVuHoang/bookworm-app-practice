import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Container, Col, Row, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

export default class SignIn extends React.Component {
    render() {
        return (
            <>
                <Header />
                <br />

                <Container>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={2}></Col>
                        <Col xs={12} md={8}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Check me out" />
                                </Form.Group>
                                <div className='text-center'>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                        <Col xs={12} md={2}></Col>
                    </Row>
                </Container>

                <br />
                <Footer />
            </>
        );
    }
}