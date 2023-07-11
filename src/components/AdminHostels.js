import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Card, Col, Button } from "react-bootstrap";
import './../assets/css/hostels.css';
import BuildingServices from '../services/buildingServices';
import hostelImg from './../assets/images/hostel.jpeg'
export default function AdminHostels() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [collegeList, setCollegeList] = useState([]);
    const navigate = useNavigate();
    const handleSearch = () => {
        const filteredData = collegeList.filter(
            (data) =>
                data.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredData);
    };
    const handleManageColleges = ()=>{
        navigate("/admin/college");
    }
    useEffect(() => {
        const filteredData = collegeList.filter(
            (data) =>
                data.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                data.collegeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(filteredData)
        setSearchResults(filteredData);
    }, [searchTerm, collegeList])
    useEffect(() => {
        (async () => {
            const tempData = await BuildingServices.getAllHostels();
            const tempCollegeList = [];
            tempData.map((data, index) => {
                tempCollegeList.push({
                    id: index,
                    collegeName: data.college.collegeName,
                    hostelName: data.buildingName,
                    collegeId: data.collegeId,
                    imageUrl: hostelImg,
                    hostelId: data.id
                })

            })
            console.log(tempCollegeList)
            setCollegeList(tempCollegeList)

        })()
    }, [])

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className=' col custom-box-hostels flex-column'>
            <Form className=" row custom-search-bar">
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
            
                <Button className="row flex-start" onClick={handleManageColleges}>
                    Manage Colleges
                </Button>
            
            <div className='row custom-hostel-list'>
                {searchResults.length === 0 ? <p className='text-center'>No result found!!</p> : searchResults.map((data) => (
                    <Col key={data.id} sm={6} md={4} lg={3}>
                        <Link
                            to={`/hostels/${data.hostelId}`}
                            className="normal-text"
                        >
                            <Card className="mb-3 custom-cards">
                                <Card.Img variant="top" src={data.imageUrl} />
                                <Card.Body>
                                    <Card.Title className='card_details'><i className="fa-solid fa-building"></i><span>{data.hostelName}</span></Card.Title>
                                    <Link
                                        to={`/collegs/${data.collegeId}`}
                                        className="normal-text"
                                    >
                                        <Card.Text className='card_details'><i className="fa-solid fa-building-columns"></i><span>{data.collegeName}</span></Card.Text>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </div>
        </div>
    )
}