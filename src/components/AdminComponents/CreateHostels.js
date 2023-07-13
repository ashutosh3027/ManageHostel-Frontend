import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ListComponent from './ListComponent';
import ListGroup from 'react-bootstrap/ListGroup';
import buildingServices from '../../services/buildingServices';
import { toast } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
const HostelForm = ({ onSubmit,isHostelCreating }) => {
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
                    <Button type="submit" disabled={isHostelCreating} variant="primary">
                        {isHostelCreating? <PulseLoader color={"#0a138b"} size={10} />:("Create Hostel")}
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
                <div className='col'>
                    <Button variant="primary" size="sm" onClick={handleViewDetails}>
                        View Details
                    </Button>
                </div>
            </Row>
        </div>
    );
};

const CreateHostels = ({ college, setCollege }) => {
    const [isHostelCreating, setIsHostelCreating] = useState(false);
    const handleCreateHostel = async (hostelName) => {
        setIsHostelCreating(true);
        try {
            const newHostel = await buildingServices.createHostel(hostelName, college.name);
            setCollege({ ...college, hostels: [...college.hostels, newHostel] });
            setIsHostelCreating(false);
            toast.success("Hostel Created Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                draggable: true
            });

        } catch (error) {
            setIsHostelCreating(false);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`${error.response.data.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    draggable: true
                });
            }
            else if (error.response && error.response.data && error.response.data.error) {
                toast.error(`${error.response.data.error}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    draggable: true
                });
            }
            else if (error.response && !error.response.data) {
                toast.error(`Server Error`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    draggable: true
                });
            }
            else {
                toast.error(`${error.message}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    draggable: true
                });
            }
        }

    };
    return (
        <div className='flex-column mt-5'>
            <Row>
                <h2>Create Hostels</h2>
            </Row>
            <Row>
                <HostelForm onSubmit={handleCreateHostel} isHostelCreating={isHostelCreating}/>
            </Row>

            <ListComponent heading={'Hostels'} count={college.hostels.length}>
                <ListGroup className="list-group-flush" style={{ "minWidth": "50vw" }}>
                    {college.hostels.map((hostel, idx) => (
                        <ListGroup.Item className="p-1 text-left" key={idx}>
                            <HostelDetail hostel={hostel} index={idx} key={idx} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </ListComponent>
        </div>
    );
}

export default CreateHostels;