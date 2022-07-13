import React from 'react';
import {
    Container, Row, Col,
    Button,
    Modal, Form
} from 'react-bootstrap';
import {
    Header, Footer, SignIn,
    CardItem,
    GetData,
} from '../../common';
import '../../../css/commonStyle.css';
import '../../../css/homePageStyle.css';
import { Link } from 'react-router-dom';
import CustomCarousel from './CustomCarousel';

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
        GetData(
            this,
            'http://127.0.0.1:8000/api/home/get-top-discount/8',
            'onSale'
        )
    }

    getRecommemdedBook = () => {
        GetData(
            this,
            'http://127.0.0.1:8000/api/home/get-recommended/8',
            'recommendedBook'
        )
    }

    getPopularBook = () => {
        GetData(
            this,
            'http://127.0.0.1:8000/api/home/get-popular/8',
            'popularBook'
        )
    }
    render() {
        return (
            <>
                <Header />
                <br />

                {/* <Modal show={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Close
                        </Button>
                        <Button variant="primary">
                            Sign In
                        </Button>
                    </Modal.Footer>
                </Modal> */}

                <Container>
                    <Row>
                        <Col className='h3'>On Sale</Col>
                        <Col className='text-right d-flex justify-content-end'>
                            <Link to={'/shop'} className='text-right myLink'>View All</Link>
                        </Col>
                    </Row>

                    {/* || == CAROUSEL == || */}
                    <Container>
                        <CustomCarousel data={this.state.onSale} />
                    </Container>
                    {/* || == END OF CAROUSEL == || */}

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
