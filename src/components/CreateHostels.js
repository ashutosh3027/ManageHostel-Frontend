import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ListComponent from './ListComponent';
import ListGroup from 'react-bootstrap/ListGroup';
import buildingServices from '../services/buildingServices';
const HostelForm = ({ onSubmit }) => {
    const [HostelName, setHostelName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(HostelName);
        setHostelName('');
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Col >
                <Row className='my-2'>
                    <Form.Control
                        type="text"
                        placeholder="Enter college name"
                        value={HostelName}
                        onChange={(e) => setHostelName(e.target.value)}
                    />
                </Row>
                <Row>
                    <Button type="submit" variant="primary">
                        Create Hostel
                    </Button>
                </Row>
            </Col>
        </Form>
    );
};
// #ccd0d5
const HostelDetail = ({ hostel, index }) => {
    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate(`/admin/hostel/${hostel.id}`);
    };
    return (
        <div className="col my-1 text-start">
            <Row className="align-items-center">
                <div className='col'>
                    <p className="m-0">{`${index + 1}. ${hostel.buildingName}`}</p>
                </div>
                <dic className='col'>
                    <Button variant="primary" size="sm" onClick={handleViewDetails}>
                        View Details
                    </Button>
                </dic>
            </Row>
        </div>
    );
};

const CreateHostels = ({ college, setCollege }) => {
    const [hostels, setHostels] = useState(college.hostels);
    useEffect(()=>{
        setHostels([...hostels, ...college.hostels]);
    },[college])

    const handleCreateHostel = async (hostelName) => {
        const newHostel = await buildingServices.createHostel(hostelName, college.name);
        setHostels([...hostels, newHostel]);
        setCollege({...college, hostels:[...college.hostels, newHostel]});
    };
    return (
        <div className='flex-column mt-5'>
            <Row>
                <h2>Create Hostels</h2>
            </Row>
            <Row>
                <HostelForm onSubmit={handleCreateHostel} />
            </Row>

            <ListComponent heading={'Hostels'} count={hostels.length}>
                <ListGroup className="list-group-flush" style={{ "min-width": "50vw" }}>
                    {hostels.map((hostel, idx) => (
                        <ListGroup.Item className="p-1 text-left">
                            <HostelDetail hostel={hostel} index={idx} key={idx} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </ListComponent>
        </div>
    );
}

export default CreateHostels;