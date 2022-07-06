import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import IMAGES from '../../assets';

export default function Home() {
    // On Sale Book
    const [onSaleBook, setOnSaleBook] = useState(0);
    useEffect(async () => {
        await axios
            .get('http://127.0.0.1:8000/api/home/get-top-discount/8')
            .then((response) => {
                setOnSaleBook(response.data);
            });
    }, []);

    // Recommended Book
    const [recommendedBook, setRecommendedBook] = useState(0);
    useEffect(async () => {
        await axios
            .get('http://127.0.0.1:8000/api/home/get-recommended/8')
            .then((response) => {
                setRecommendedBook(response.data);
            });
    }, []);

    // Popular Book
    const [popularBook, setPopularBook] = useState(0);
    useEffect(async () => {
        await axios
            .get('http://127.0.0.1:8000/api/home/get-popular/8')
            .then((response) => {
                setPopularBook(response.data);
            });
    }, []);

    return (
        <>
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
                                {onSaleBook && onSaleBook.length > 0 && onSaleBook.map(item => (
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src={
                                                IMAGES.hasOwnProperty(item.book.book_cover_photo) ?
                                                    IMAGES[item.book.book_cover_photo] :
                                                    IMAGES['default']
                                            } fluid />
                                            <Card.Body>
                                                <Card.Title>{item.book.book_title}</Card.Title>
                                                <Card.Text>
                                                    {item.book.author_id}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                            </Card.Body>
                                        </Card>
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
                        >Recommended</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-success">Popular</Button>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    {recommendedBook && recommendedBook.length > 0 && recommendedBook.map(item => (
                        <Col xs={3}>
                            <Card>
                                <Card.Img variant="top" src={
                                    IMAGES.hasOwnProperty(item.book_cover_photo) ?
                                        IMAGES[item.book_cover_photo] :
                                        IMAGES['default']
                                } fluid />
                                <Card.Body>
                                    <Card.Title>{item.book_title}</Card.Title>
                                    <Card.Text>
                                        {item.author_id}
                                    </Card.Text>
                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <br />
            <Footer />
        </>
    );
}