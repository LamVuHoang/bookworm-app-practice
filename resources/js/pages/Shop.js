import { Container, Col, Row } from "react-bootstrap";
import MultipleItem from "../components/MultipleItem";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomPagination from "../components/CustomPagination";
import Accordion from 'react-bootstrap/Accordion';

export default function Shop() {
    return (
        <>
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
                        {/* <div className="border border-secondary p-2">
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div> */}
                        <div className="border border-secondary p-2">
                            <div className="h5">Category</div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </div>

                        <br />

                        <div className="border border-secondary p-2">
                            <div className="h5">Author</div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </div>

                        <br />

                        <div className="border border-secondary p-2">
                            <div className="h5">Rating Review</div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
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
                            <MultipleItem column="4" row="3" />
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
        </>
    );
}