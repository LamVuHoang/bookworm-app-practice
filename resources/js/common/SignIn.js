import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    closeModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }


    render() {
        return (
            <>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
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
                        <Button variant="secondary" onClick={this.closeModal}>
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