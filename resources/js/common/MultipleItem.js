import { Row, Col } from "react-bootstrap";
import CardItem from "./CardItem";


const cardOneRow = (column) => {
    let elements = [];
    for (let col = 0; col < column; col++) {
        elements.push(
            <Col sm={12} md={3}>
                <CardItem />
            </Col>
        );
    }

    return elements;
};

const numberOfRow = (row, column) => {
    let result = [];
    for (let i = 0; i < row; i++) {
        result.push(
            <Row>
                {cardOneRow(column)}
            </Row>
        );
    }

    return result;
};

export default function MultipleItem(props) {
    return (
        <>
            {numberOfRow(props.row, props.column)}
        </>
    );
}