import { Container, Row, Col } from "react-bootstrap";
import CardItem from "./CardItem";
import MultipleItem from "./MultipleItem";

export default function TopBooks(props) {
    return (
        <Container>
            <MultipleItem column="4" row="2" />
        </Container>
    );
}