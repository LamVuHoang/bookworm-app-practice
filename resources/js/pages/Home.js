import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ControlledCarousel from '../components/ControlledCarousel';
import Button from 'react-bootstrap/Button';
import TopBooks from '../components/TopBooks';

export default function Home() {
    return (
        <>
            <Container>
                <Row>
                    <Col className='h3'>On Sale</Col>
                    <Col className='text-right d-flex justify-content-end'>
                        <Button variant="outline-success" className="text-right">View All</Button>
                    </Col>
                </Row>
                <ControlledCarousel />
            </Container>

            <br />

            <Container>
                <Row className='text-center'>
                    <Col className='h3'>Featured Books</Col>
                </Row>
                <Row>
                    <Col className='text-right d-flex justify-content-end'>
                        <Button variant="outline-success">Recommended</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-success">Popular</Button>
                    </Col>
                </Row>
            </Container>

            <TopBooks />
        </>
    );
}