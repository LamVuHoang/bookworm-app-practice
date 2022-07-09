import { Container, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import Header from '../common/Header';
import Footer from '../common/Footer';
import React from "react";
import axios from "axios";
export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: [],
            product: []
        };
    }

    componentDidMount() {
        this.detailOfProduct()
    }

    detailOfProduct = () => {
        //Handle URL 
        let url = window.location.href.split("/");
        let id = url[url.length - 1];

        //Call Axios
        axios.get(`http://127.0.0.1:8000/api/product/${id}/rating`)
            .then(res => {
                this.setState({ product: res.data })
            })
            .catch(err => {
                console.log(err)
            });
    }

    render() {
        return (
            <>
                <Header />
                <br />

                <Container>
                    <Row>
                        <Col>
                            <span className="h3 text-capitalize">category name</span>
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
                            <Row>
                                <Col xs={4}>
                                    <div>
                                        Product Photo
                                    </div>
                                    <div>
                                        By Author
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <div className="h4 text-capitalize">
                                        book title
                                    </div>
                                    <div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis eget odio at hendrerit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras mollis felis sed odio ultrices porttitor. Nullam rutrum eleifend ante, vitae feugiat massa efficitur eget. Vivamus ornare velit et odio semper dictum. Nam sit amet condimentum lectus, in placerat ex. Vestibulum rutrum magna ipsum, imperdiet rhoncus quam pulvinar at. Praesent eu molestie metus, sed semper massa. Praesent lobortis quam diam, eget pulvinar tortor porttitor eu.</p>
                                        <p>Phasellus vehicula diam nulla, eget luctus diam auctor quis. Sed vehicula vitae tellus non suscipit. Nulla in viverra felis, eu aliquet arcu. Suspendisse malesuada nunc at lacus gravida aliquet eu ac ipsum. Maecenas a nulla et turpis vestibulum imperdiet. Maecenas vulputate iaculis nisl, eget efficitur augue vestibulum sed. Maecenas dapibus pretium mi, vitae sagittis metus scelerisque at. Proin eget feugiat neque.</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={4}>
                            <Card>
                                <Card.Header>
                                    <del className="text-secondary">original price</del>

                                    <span className="p-2 h5">price</span>
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <Card.Title>Quantity</Card.Title>
                                    <Card.Text>
                                        <InputGroup className="mb-3">
                                            <Button variant="outline-success">-</Button>
                                            <Form.Control className="text-center" value="8" />
                                            <Button variant="outline-success">+</Button>
                                        </InputGroup>
                                    </Card.Text>
                                    <Button variant="success">Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={8}>
                            <span className="h4 text-capitalize">customer review</span>
                            <span className="text-secondary">(Filtered by 5 star)</span>
                            <div className="h3">4.6 Star</div>
                            <div>
                                <Badge pill bg="danger  ">
                                    Primary
                                </Badge>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <Card>
                                <Card.Header>
                                    <span className="p-2 h5">Write a Review</span>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formTitleReview">
                                            <Form.Label>Add a title</Form.Label>
                                            <Form.Control type="text" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formContentReview">
                                            <Form.Label>Details please! Your review help other shoppers</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                style={{ height: '100px' }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formSelectReview">
                                            {/* <Form.Select size="sm">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select> */}
                                        </Form.Group>
                                        <div className="text-center">
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
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