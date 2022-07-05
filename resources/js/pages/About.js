import { Container, Col, Row } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
    return (
        <>
            <Header />
            <br />

            <Container>
                <Row>
                    <Col>
                        <span className="h3">About Us</span>
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
                    <Col xs={12} md={2}>

                    </Col>
                    <Col xs={12} md={8}>
                        <div className="h3">
                            Welcome to Bookworm
                        </div>
                        <div>
                            <p className="text-justify">
                                "Bookworm is an independent New York bookstore and language school with locations in
                                Manhattan and Brooklyn. We specialize in travel books and language classes."
                            </p>
                            <Row>
                                <Col>
                                    <div className="h5 text-capitalize">our story</div>
                                    <div>
                                        <p className="text-justify">
                                            The name Bookworm was taken from the original name for New York International Airport,
                                            which was renamed JFK in December 1963.
                                        </p>
                                        <p className="text-justify">
                                            Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue
                                            South, at the corner of Perry Street.
                                        </p>
                                        <p className="text-justify">
                                            From March 2008 through May 2016, the store was located in the Flatiron District.
                                        </p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="h5 text-capitalize">our vision</div>
                                    <div>
                                        <p className="text-justify">
                                            One of the last travel bookstores in the country, our Manhattan store carries a range of
                                            guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.
                                        </p>
                                        <p className="text-justify">
                                            We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook,
                                            and our well-read, well-travelled staff is happy to make reading recommendations for any
                                            traveller, book lover, or gift giver.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={12} md={2}>

                    </Col>
                </Row>
            </Container>

            <br />
            <Footer />
        </>
    );
}