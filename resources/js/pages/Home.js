import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CardItem from '../common/CardItem';
import IMAGES from '../../assets';
import '../../css/myStyle.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onSale: [],
            recommendedBook: [],
            popularBook: [],
            isRecommendedBook: true
        };
    }

    componentDidMount() {
        this.getOnSaleBook();
        this.getRecommemdedBook();
        this.getPopularBook();
    }


    getOnSaleBook = () => {
        axios
            .get('http://127.0.0.1:8000/api/home/get-top-discount/8')
            .then(response => {
                this.setState({ onSale: response.data })
            })
            .catch(error => {
                console.log(error)
            });
    }

    getRecommemdedBook = () => {
        axios
            .get('http://127.0.0.1:8000/api/home/get-recommended/8')
            .then(response => {
                this.setState({ recommendedBook: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    getPopularBook = () => {
        axios
            .get('http://127.0.0.1:8000/api/home/get-popular/8')
            .then(response => {
                this.setState({ popularBook: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <>
                {/* {console.log(this.state.onSale)} */}
                <Header />
                <br />

                <Container>
                    <Row>
                        <Col className='h3'>On Sale</Col>
                        <Col className='text-right d-flex justify-content-end'>
                            <Button variant="outline-success" className="text-right">View All</Button>
                        </Col>
                    </Row>
                    <Container>
                        <Carousel>
                            <Carousel.Item>
                                <Row>
                                    {this.state.onSale.map(item => (
                                        <Col xs={12} sm={6} md={3}>
                                            <CardItem data={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                    </Container>
                </Container>

                <br />

                <Container>
                    <Row className='text-center'>
                        <Col className='h3'>Featured Books</Col>
                    </Row>
                    <Row>
                        <Col className='text-right d-flex justify-content-end'>
                            <Button variant="outline-success"
                                onClick={() => {
                                    this.setState({ isRecommendedBook: true })
                                }}>Recommended</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success"
                                onClick={() => {
                                    this.setState({ isRecommendedBook: false })
                                }}>Popular</Button>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        {(this.state.isRecommendedBook == true ? this.state.recommendedBook
                            : this.state.popularBook).map(item => (
                                <Col xs={3}>
                                    <CardItem data={item} />
                                </Col>
                            ))}
                    </Row>
                </Container>

                <br />
                <Footer />
            </>
        );
    }
}
