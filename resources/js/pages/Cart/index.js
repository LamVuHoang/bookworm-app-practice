import React from "react";
import {
    Container, Col, Row,
    Card,
    Button,
    Table,
    Form, InputGroup
} from "react-bootstrap";
import {
    Header, Footer, SignIn,
    CardItem,
    GetData,
} from '../../common';

export default class Cart extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <>
                <Header />
                <br />

                <Container>
                    <Row>
                        <Col>
                            <span className="h5">Your card: 3 items</span>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col>
                            <hr className="border border-secondary" />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col sm={12} md={8}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th colSpan={2}>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>image</td>
                                        <td>
                                            Book Title
                                            <div className="text-secondary">Author name</div>
                                        </td>
                                        <td>Price</td>
                                        <td>
                                            <InputGroup>
                                                <Button variant="outline-success">-</Button>
                                                <Form.Control className="text-center" value="8" />
                                                <Button variant="outline-success">+</Button>
                                            </InputGroup>
                                        </td>
                                        <td>Sum</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col sm={12} md={4}>
                            <Card>
                                <Card.Header>
                                    <span className="p-2 h6 text-capitalize">cart totals</span>
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <Card.Title>Quantity</Card.Title>
                                    <Card.Text>
                                        $99
                                    </Card.Text>
                                    <Button variant="success">Place order</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <br />
                <Footer />
            </>
        );
    }
}