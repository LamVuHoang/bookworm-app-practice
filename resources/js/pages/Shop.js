import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomPagination from "../common/CustomPagination";
import Header from '../common/Header';
import Footer from '../common/Footer';
import IMAGES from '../../assets';
import CardItem from '../common/CardItem';
import '../../css/myStyle.css';
import ReactPaginate from 'react-paginate';

export default class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorList: [],
            categoryList: [],
            listItem: [],
            rating: [1, 2, 3, 4, 5],
            filterType: '',
            keyWord: '',
            keyId: ''
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

    filter = (type = '', id, page = 1) => {
        this.setState({ filterType: type })
        let URL;
        type == '' ?
            URL = `http://127.0.0.1:8000/api/shop/sort?page=${page}` :
            URL = `http://127.0.0.1:8000/api/shop/filter?conditions=${type},${id}&page=${page}`;
        axios
            .get(URL)
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

    handleClickPaginate = (index) => {
        // console.log(index)
        this.filter(this.state.filterType, this.state.keyId, index.selected + 1);
    }

    render() {
        return (
            <>
                <Header />
                <br />

                <Container>
                    <Row>
                        <Col>
                            <span className="h3 p-1">Books</span>
                            {this.state.filterType ? (
                                <span className="text-secondary">
                                    ( Filtered by
                                    <span className='text-capitalize p-1'>{this.state.filterType}</span>
                                    {this.state.filterType === 'rating' ? (
                                        <span className='text-capitalize'>
                                            {this.state.keyWord} Star
                                        </span>
                                    ) : (
                                        <span className='text-capitalize'>
                                            {this.state.keyWord}
                                        </span>
                                    )
                                    }
                                    )
                                </span>
                            ) : (<></>)
                            }
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
                            <div className="h6 font-weight-bold">
                                Filter By
                            </div>
                            <div>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <div className="h6 font-weight-bold">Category</div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                {this.state.categoryList.map(item => (
                                                    <ListGroup.Item onClick={() => {
                                                        this.setState({ keyWord: item.category_name })
                                                        this.setState({ keyId: item.category_name })
                                                        this.filter('category', item.id)
                                                    }}>
                                                        <Button className="filterButton">
                                                            {item.category_name}
                                                        </Button>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <div className="h6 font-weight-bold">Author</div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                {this.state.authorList.map(item => (
                                                    <ListGroup.Item onClick={() => {
                                                        this.setState({ keyWord: item.author_name })
                                                        this.setState({ keyId: item.author_name })
                                                        this.filter('author', item.id)
                                                    }}>
                                                        <Button className="filterButton">
                                                            {item.author_name}
                                                        </Button>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>
                                            <div className="h6">Rating Review</div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                {this.state.rating.map(item => (
                                                    <ListGroup.Item onClick={() => {
                                                        this.setState({ keyWord: item })
                                                        this.setState({ keyId: item })
                                                        this.filter('rating', item)
                                                    }}>
                                                        <Button className="filterButton">
                                                            {item} star
                                                        </Button>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </Col>
                        <Col sm={12} md={10}>
                            <Row>
                                <Col>
                                    Showing {this.state.listItem.from}-
                                    {this.state.listItem.from + this.state.listItem.per_page - 1} of
                                    <span className='p-1'>{this.state.listItem.total}</span> books
                                </Col>
                                <Col className="text-right d-flex justify-content-end">
                                    <Dropdown className="d-inline mx-2">
                                        <Dropdown.Toggle id="dropdown-autoclose-true">
                                            Sort by on sale
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Sort by popularity</Dropdown.Item>
                                            <Dropdown.Item href="#">Sort by price: low to high</Dropdown.Item>
                                            <Dropdown.Item href="#">Sort by price: high to low</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <Dropdown className="d-inline mx-2">
                                        <Dropdown.Toggle id="dropdown-autoclose-true">
                                            Show 20
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Show 5</Dropdown.Item>
                                            <Dropdown.Item href="#">Show 15</Dropdown.Item>
                                            <Dropdown.Item href="#">Show 25</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>

                            <br />

                            <Row>
                                {this.state.listItem.data && this.state.listItem.data.length > 0 &&
                                    this.state.listItem.data.map(item => (
                                        <Col xs={12} sm={6} md={3}>
                                            <CardItem data={item} />
                                        </Col>
                                    ))
                                }
                            </Row>

                            <br />

                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <ReactPaginate
                                        previousLabel={"<<"}
                                        nextLabel={">>"}
                                        breakLabel={'...'}
                                        pageCount={this.state.listItem.last_page}
                                        marginPagesDisplayed={3}
                                        pageRangeDisplayed={3}
                                        onPageChange={this.handleClickPaginate}
                                        containerClassName={'pagination'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-link'}
                                        nextClassName={'page-link'}
                                        nextLinkClassName={'page-link'}
                                        breakClassName={'page-link'}
                                        breakLinkClassName={'page-link'}
                                        activeClassName={'active'}

                                    />
                                    <br />
                                    {/* <CustomPagination /> */}
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