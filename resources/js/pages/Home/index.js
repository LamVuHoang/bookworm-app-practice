import React from 'react';
import {
    Container, Row, Col,
    Button,
} from 'react-bootstrap';
import {
    Header, Footer,
    CardItem,
    GetData,
} from '../../common';
import '../../../css/commonStyle.css';
import '../../../css/homePageStyle.css';
import { Link } from 'react-router-dom';
import CustomCarousel from './CustomCarousel';

export default class Home extends React.Component {
    constructor() {
        super();
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
                            <Button className={
                                this.state.isRecommendedBook === true ?
                                    'myLinkActive' : 'myLink'
                            }
                                onClick={() => {
                                    this.setState({ isRecommendedBook: true })
                                }}>Recommended</Button>
                        </Col>
                        <Col>
                            <Button className={
                                this.state.isRecommendedBook === false ?
                                    'myLinkActive' : 'myLink'
                            }
                                onClick={() => {
                                    this.setState({ isRecommendedBook: false })
                                }}>Popular</Button>
                        </Col>
                    </Row>
                </Container>

                <br />

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
