import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CardItem() {
    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Book Title</Card.Title>
                <Card.Text>
                    Author Name
                </Card.Text>
                <Row>
                    <Col>
                        Original Price
                    </Col>
                    <Col>Price</Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
