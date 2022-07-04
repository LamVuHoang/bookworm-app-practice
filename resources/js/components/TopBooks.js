import { Container, Row, Col } from "react-bootstrap";
import CardItem from "./CardItem";

export default function TopBooks() {
    return (
        <Container>
            <Row>
                <Col>
                    <CardItem />
                </Col>
                <Col>
                    <CardItem />
                </Col>
                <Col>
                    <CardItem />
                </Col>
                <Col>
                    <CardItem />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CardItem />
                </Col>
                <Col>
                    <CardItem />
                </Col>
                <Col>
                    <CardItem />
                </Col>
                <Col>
                    <CardItem />
                </Col>
            </Row>
        </Container>
    );
}