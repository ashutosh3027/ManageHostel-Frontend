import React, {useState} from 'react'
import { Container, Form, Card, Col, Row } from "react-bootstrap";
export default function Hostels() {
    const dummyData = [
        {
            id: 1,
            hostelName: 'Hostel A',
            collegeName: 'College X',
            imageUrl: 'https://example.com/image1.jpg',
        },
        {
            id: 2,
            hostelName: 'Hostel B',
            collegeName: 'College Y',
            imageUrl: 'https://example.com/image2.jpg',
        },
        {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: 'https://example.com/image3.jpg',
        },
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const filteredData = dummyData.filter(
        (data) =>
            data.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Container>
            <Form className="mb-3">
                <Form.Group controlId="searchForm">
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Form.Group>
            </Form>

            <Row>
                {filteredData.map((data) => (
                    <Col key={data.id} sm={6} md={4} lg={3}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src={data.imageUrl} />
                            <Card.Body>
                                <Card.Title>{data.hostelName}</Card.Title>
                                <Card.Text>{data.collegeName}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
