import Card from 'react-bootstrap/Card';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IMAGES from '../../assets';

export default function CardItem(props) {
    return (
        <div className='myItem'>
            <Card>
                <Link to={{
                    pathname: `/product/${props.data.book_id}`,
                    // state: { id: props.data.id }
                }}>
                    <Card.Img variant="top" src={
                        IMAGES.hasOwnProperty(props.data.book_cover_photo) ?
                            IMAGES[props.data.book_cover_photo] :
                            IMAGES['default']
                    } fluid="true" />
                </Link>
                <Card.Body>
                    <Card.Title>{props.data.book_title}</Card.Title>
                    <Card.Text>
                        {props.data.author_name}
                        <br />
                        <span>{
                            props.data.discount_price == 0 ? (
                                <span className='h5 font-weight-bold'>${props.data.book_price} </span>
                            ) : (
                                <>
                                    <del className='p-1 text-secondary'> ${props.data.book_price}</del>
                                    <span className='h5 font-weight-bold'>${props.data.discount_price}
                                    </span>
                                </>
                            )
                        }</span>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </div>
    );
}
