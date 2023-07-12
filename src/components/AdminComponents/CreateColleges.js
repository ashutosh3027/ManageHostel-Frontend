import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import ListComponent from './ListComponent';
import ListGroup from 'react-bootstrap/ListGroup';
import collegeServices from '../../services/collegeServices';
const CollegeForm = ({ onSubmit }) => {
    const [collegeName, setCollegeName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(collegeName);
        setCollegeName('');
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Col >
                <Row className='my-2'>
                    <Form.Control
                        type="text"
                        placeholder="Enter college name"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                    />
                </Row>
                <Row>
                    <Button type="submit" variant="primary">
                        Create College
                    </Button>
                </Row>
            </Col>
        </Form>
    );
};
// #ccd0d5
const CollegeDetail = ({ college, onAddBuilding, index }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/admin/college/${college.id}`);
    };
    return (
        <div className="col my-1 text-start">
            <Row className="align-items-center">
                <div className='col'>
                    <p className="m-0">{`${index + 1}. ${college.collegeName}`}</p>
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

const CreateCollegesPage = () => {
    const [colleges, setColleges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const data = await collegeServices.getAllColleges();
            setColleges([...data]);
            setIsLoading(false);
        })()
    }, [])
    const handleCreateCollege = async (collegeName) => {
        const newCollege = await collegeServices.createCollege(collegeName);
        setColleges([...colleges, newCollege]);
    };

    return (
        <div className='flex-column mt-5'>
            <Row>
                <h2>Create Colleges</h2>
            </Row>

            {isLoading ? <Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner> :
                <>
                    <Row>
                        <CollegeForm onSubmit={handleCreateCollege} />
                    </Row>
                    <ListComponent heading={'Colleges'} count={colleges.length}>
                        <ListGroup className="list-group-flush" style={{ "minWidth": "50vw" }}>
                            {colleges.map((college, idx) => (
                                <ListGroup.Item key={idx} className="p-1 text-left"  >
                                    <CollegeDetail key={idx} college={college} index={idx} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                    </ListComponent>
                </>
            }
        </div>
    );
};

export default CreateCollegesPage;
