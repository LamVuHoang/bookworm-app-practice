import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IMAGES from '../../assets';

export default function CardItem(props) {
    return (
        <div className='myItem'>
            <Card>
                <Link to={{
                    pathname: `/product/${props.data.book_id}`,
                }}>
                    <div className='myImage'>
                        <Card.Img variant="top" src={
                            IMAGES.hasOwnProperty(props.data.book_cover_photo) ?
                                IMAGES[props.data.book_cover_photo] :
                                IMAGES['default']
                        } fluid="true" />
                    </div>
                </Link>
                <Card.Body>
                    <Link to={{
                        pathname: `/product/${props.data.book_id}`,
                    }}>
                        <Card.Title>{props.data.book_title}</Card.Title>
                    </Link>
                    <Card.Text>
                        <span className='authorName'>{props.data.author_name}</span>
                        <br />
                        <span>{
                            props.data.discount_price == 0 ? (
                                <span className='h5 font-weight-bold'>${props.data.book_price} </span>
                            ) : (
                                <>
                                    <Row className='text-center'>
                                        <Col>
                                            <del className='p-1 text-secondary'> ${props.data.book_price}</del>
                                        </Col>
                                        <Col>
                                            <span className='h5 font-weight-bold'>${props.data.discount_price}</span>
                                        </Col>
                                    </Row>
                                </>
                            )
                        }</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div >
    );
}
