import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Accordion } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomPagination from "../components/CustomPagination";
import Header from '../components/Header';
import Footer from '../components/Footer';
import IMAGES from '../../assets';
import '../../css/myStyle.css';

export default class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            categoryList: [],
            listItem: [],
            rating: [1, 2, 3, 4, 5]
        };

        this.filter = this.filter.bind(this);
    }

    componentDidMount() {
        this.getAuthorList();
        this.getCategoryList();
        this.getOnSaleAsc();
    }

    getAuthorList = () => {
        axios
            .get('http://127.0.0.1:8000/api/shop/get-author-list')
            .then(response => {
                this.setState({ authorList: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    getCategoryList = () => {
        axios
            .get('http://127.0.0.1:8000/api/shop/get-category-list')
            .then(response => {
                this.setState({ categoryList: response.data })
            })
            .catch(error => {
                console.log(error)
            });
    }

    filter = (type, id) => {
        axios
            .get(`http://127.0.0.1:8000/api/shop/filter?conditions=${type},${id}`)
            .then(response => {
                this.setState({ listItem: response.data })
            })
            .catch(err => {
                console.log(err)
            });
    }

    getOnSaleAsc = () => {
        axios
            .get('http://127.0.0.1:8000/api/shop/sort')
            .then(response => {
                this.setState({ listItem: response.data })
            })
            .catch(error => {
                console.log(error)
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
                            <span className="h3">Books</span>
                            <span className="text-secondary">
                                ( Filtered by Category #1 )
                            </span>
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
                        <Col sm={12} md={2}>
                            <div className="h6">
                                Filter By
                            </div>
                            <div className="border border-secondary p-2">
                                <div className="h6">Category</div>
                                <ListGroup variant="flush">
                                    {this.state.categoryList.map(item => (
                                        <ListGroup.Item onClick={() => {
                                            this.filter('category', item.id)
                                        }}>
                                            {/* <Link > */}
                                            {item.category_name}
                                            {/* </Link> */}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>

                            <br />

                            <div className="border border-secondary p-2">
                                <div className="h6">Author</div>
                                <ListGroup variant="flush">
                                    {this.state.authorList.map(item => (
                                        <ListGroup.Item onClick={() => {
                                            this.filter('author', item.id)
                                        }}>
                                            {/* <Link to={item.id}> */}
                                                {item.author_name}
                                            {/* </Link> */}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>

                            <br />

                            <div className="border border-secondary p-2">
                                <div className="h6">Rating Review</div>
                                <ListGroup variant="flush">
                                    {this.state.rating.map(item => (
                                        <ListGroup.Item onClick={() => {
                                            this.filter('rating', item)
                                        }}>
                                            {/* <Link to={item}> */}
                                                {item} star
                                            {/* </Link> */}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>
                        <Col sm={12} md={10}>
                            <Row>
                                <Col>
                                    Showing 1-12 of 126 books
                                </Col>
                                <Col className="text-right d-flex justify-content-end">
                                    <Dropdown className="d-inline mx-2">
                                        <Dropdown.Toggle id="dropdown-autoclose-true">
                                            Default Dropdown
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown className="d-inline mx-2">
                                        <Dropdown.Toggle id="dropdown-autoclose-true">
                                            Default Dropdown
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                {this.state.listItem && this.state.listItem.length > 0 &&
                                    this.state.listItem.map(item => (
                                        <Col xs={3}>
                                            <Card>
                                                <Card.Img variant="top" src={
                                                    IMAGES.hasOwnProperty(item.book_cover_photo) ?
                                                        IMAGES[item.book_cover_photo] :
                                                        IMAGES['default']
                                                } fluid="true" />
                                                <Card.Body>
                                                    <Card.Title>{item.book_title}</Card.Title>
                                                    <Card.Text>
                                                        {item.author_id}
                                                    </Card.Text>
                                                    <Button variant="primary">Go somewhere</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))

                                }
                            </Row>

                            <br />

                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <CustomPagination />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <br />
                <Footer />
            </>
        );
    }
}