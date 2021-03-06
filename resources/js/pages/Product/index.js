import {
    Container, Col, Row,
    Button,
    Card,
    Form, InputGroup,
    Image
} from "react-bootstrap";
import {
    Header, Footer, SignIn,
    CardItem,
    GetData,
} from '../../common';
import React from "react";
import IMAGES from "../../../assets";

export default class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            id: [],
            product: [],
            authorName: ''
        };
    }

    componentDidMount() {
        this.detailOfProduct()
    }

    detailOfProduct = () => {
        //Handle URL 
        let url = window.location.href.split("/");
        let id = url[url.length - 1];
        //Get Data
        GetData(
            this,
            `http://127.0.0.1:8000/api/product/${id}`,
            'product'
        )
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
                                        <Image variant="top" src={
                                            IMAGES.hasOwnProperty(this.state.product.book_cover_photo) ?
                                                IMAGES[this.state.product.book_cover_photo] :
                                                IMAGES['default']
                                        } fluid="true" />
                                    </div>
                                    <div>
                                        By <span className="h6"> {this.state.product.author_name}</span>
                                    </div>
                                </Col>
                                <Col xs={8}>
                                    <div className="h4 text-capitalize">
                                        {this.state.product.book_title}
                                    </div>
                                    <div className="text-justify">
                                        <p>{this.state.product.book_summary}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={12} md={4}>
                            <Card>
                                <Card.Header>
                                    {this.state.product.discount_price == 0 ? (
                                        <span className='h5'>${this.state.product.book_price} </span>
                                    ) : (
                                        <>
                                            <del className="text-secondary">${this.state.product.book_price}</del>
                                            <span className="p-2 h5 font-weight-bold">
                                                ${this.state.product.discount_price}
                                            </span>
                                        </>
                                    )}
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

                    <br />

                    <Row>
                        <Col sm={12} md={8}>
                            {this.state.product.star_scoring !== null ? (
                                <>
                                    <span className="h4 text-capitalize pr-2">customer review </span>
                                    <span className="text-secondary">(Filtered by 5 star)</span>
                                    <div className="h6">{this.state.product.star_scoring} Star</div>
                                </>
                            ) : (
                                <>
                                    <span className="h4 text-capitalize">customer review</span>
                                    <div className="h6">There is No Review</div>
                                </>
                            )}
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
                                            <Form.Select size="sm">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
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