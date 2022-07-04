import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CartItem from './CardItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// function CarouselItem() {
//     return (
//         <Carousel.Item>
//             <Row>
//                 <Col>
//                     <CartItem />
//                 </Col>
//                 <Col>
//                     <CartItem />
//                 </Col>
//                 <Col>
//                     <CartItem />
//                 </Col>
//             </Row>
//         </Carousel.Item>
//     );
// }

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
            <Carousel.Item>
                <Row>
                    <Col>
                        <CartItem />
                    </Col>
                    <Col>
                        <CartItem />
                    </Col>
                    <Col>
                        <CartItem />
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item>
                <Row>
                    <Col>
                        <CartItem />
                    </Col>
                    <Col>
                        <CartItem />
                    </Col>
                    <Col>
                        <CartItem />
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item>
                <Row>
                    <Col>
                        <CartItem />
                    </Col>
                    <Col>
                        <CartItem />
                    </Col>
                    <Col>
                        <CartItem />
                    </Col>
                </Row>
            </Carousel.Item>
        </Carousel>
    );
}