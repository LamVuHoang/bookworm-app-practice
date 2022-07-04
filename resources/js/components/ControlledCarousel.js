import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MultipleItem from './MultipleItem';

const multipleCarouselItem = (number) => {
    let item = [];
    for (let i = 0; i < number; i++) {
        item.push(
            <Carousel.Item>
                <MultipleItem row="1" column="4" />
            </Carousel.Item>
        );
    }

    return item;
}

export default function ControlledCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
            {multipleCarouselItem(3)}
        </Carousel>
    );
}