import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CardItem from '../common/CardItem';
import IMAGES from '../../assets';
import '../../css/myStyle.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onSale: [],
            recommendedBook: [],
            popularBook: [],
            isRecommendedBook: true,
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
                <Header />
                <br />

                <Container>
                    <Row>
                        <Col className='h3'>On Sale</Col>
                        <Col className='text-right d-flex justify-content-end'>
                            <Link to={'/shop'} className='text-right myLink'>View All</Link>
                        </Col>
                    </Row>
                    <Container>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            {this.state.onSale.map(item => (
                                <SwiperSlide >
                                    <CardItem data={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Container>
                </Container>

                <br />

                <Container>
                    <Row className='text-center'>
                        <Col className='h3'>Featured Books</Col>
                    </Row>
                    <Row>
                        <Col className='text-right d-flex justify-content-end'>
                            <Button className='myLink'
                                onClick={() => {
                                    this.setState({ isRecommendedBook: true })
                                }}>Recommended</Button>
                        </Col>
                        <Col>
                            <Button className='myLink'
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
                                <Col xs={12} sm={6} md={3}>
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
