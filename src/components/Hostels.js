import React, { useEffect, useState } from 'react'
import { Form, Card, Col, Button } from "react-bootstrap";
import './../assets/css/hostels.css';
import hostelImg from './../assets/images/hostel.jpeg'
export default function Hostels() {
    const dummyData = [
        {
            id: 1,
            hostelName: 'Hostel A',
            collegeName: 'College X',
            imageUrl: hostelImg,
        },
        {
            id: 2,
            hostelName: 'Hostel B',
            collegeName: 'College Y',
            imageUrl: hostelImg,
        },
        {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: hostelImg,
        },
        {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: hostelImg,
        }, {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: hostelImg,
        }, {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: hostelImg,
        }, {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: hostelImg,
        }, {
            id: 3,
            hostelName: 'Hostel C',
            collegeName: 'College Z',
            imageUrl: hostelImg,
        },
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        const filteredData = dummyData.filter(
            (data) =>
                data.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredData);
    };
    useEffect(() => {
        const filteredData = dummyData.filter(
            (data) =>
                data.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(filteredData)
        setSearchResults(filteredData);
    }, [searchTerm])

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='custom-box-hostels flex-column'>
            <Form className="custom-search-bar">
                <div className='row'>
                    <Col xs={9}>
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col xs={3}>
                        <Button variant="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Col>
                </div>
            </Form>

            <div className='custom-hostel-list'>
                {searchResults.length === 0 ? <p className='text-center'>No result found!!</p> : searchResults.map((data) => (
                    <Col key={data.id} sm={6} md={4} lg={3}>
                        <Card className="mb-3 custom-cards">
                            <Card.Img variant="top" src={data.imageUrl} />
                            <Card.Body>
                                <Card.Title className='card_details'><i className="fa-solid fa-building"></i><span>{data.hostelName}</span></Card.Title>
                                <Card.Text className='card_details'><i className="fa-solid fa-building-columns"></i><span>{data.collegeName}</span></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </div>
        </div>
    )
}
