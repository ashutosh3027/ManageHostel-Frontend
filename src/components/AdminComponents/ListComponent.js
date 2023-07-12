import React from 'react'
import { Card, Row, Col } from 'react-bootstrap';
export default function ListComponent({ heading, children, count }) {
    return (
        <Card>
            <Card.Header >
                <Row>
                    <Col xs={8} className="text-start">
                        {heading}
                    </Col>
                    <Col xs={4} className="text-end">
                        {count}
                    </Col>
                </Row>
            </Card.Header>

            {children}

        </Card>
    )
}
