import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Container, Col, Row, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import { Navigate } from 'react-router';

export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            user: {},
            token: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const email = event.target[0].value;
        const password = event.target[1].value;

        axios.post('http://127.0.0.1:8000/api/signin', {
            "email": email,
            "password": password
        }).then(res => {
            if (res.data.status_code === 200) {
                this.setState({ token: res.data });
                console.log(this.state.token)
            };
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <Header />
                <br />

                <Container>
                    <Row className="text-center">
                        <Col>
                            <h3>Sign In</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={2}></Col>
                        <Col xs={12} md={8}>
                            <Form onSubmit={this.handleSubmit}>
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
                                <div className='text-center'>
                                    <Button variant="primary" type='submit'>
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