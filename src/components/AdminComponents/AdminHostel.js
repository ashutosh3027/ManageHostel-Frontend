import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminHostelMatrix from './AdminHostelMatrix';
import './../../assets/css/hostel.css';
import { useRoom } from '../../context/roomContext';
import { Spinner, Form, Button, Modal, Card } from 'react-bootstrap';
import roomServices from '../../services/roomServices';
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';
export default function AdminHostel() {
    const { id:hostelId } = useParams();
    const { roomData, updateRoomData, isRoomDataLoading } = useRoom();
    const [roomNumber, setRoomNumber] = useState(0);
    const [roomType, setRoomType] = useState('Single');
    const [showModal, setShowModal] = useState(false);
    const [isRoomCreating, setIsRoomCreating] = useState(false);
    const [hostelDetails, setHostelDetails] = useState({
        name: '',
        vacantRooms: 0,
        occupiedRooms: 0,
        totalRooms: 0,
    });

    useEffect(() => {
        updateRoomData(hostelId);
    }, [hostelId]);

    const handleCreateRoom = async () => {
        // Make an API call here to create rooms
        // Pass numberOfRooms and roomType as parameters to the API
        setIsRoomCreating(true)
        try {
            await roomServices.createNewRoom(roomNumber, hostelId, roomType);
            // Update the roomData state with the new data
            updateRoomData(hostelId);
            setShowModal(false);
            setIsRoomCreating(false);
            toast.success("Room Created Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                draggable: true
            });

        } catch (error) {
            setIsRoomCreating(false);
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
    useEffect(() => {
        // Calculate hostel details based on roomData
        const totalRooms = roomData.length;
        const vacantRooms = roomData.filter((room) => !room.isAllocated).length;
        const occupiedRooms = totalRooms - vacantRooms;

        setHostelDetails({
            name: 'Your Hostel Name', // Replace with your hostel name
            vacantRooms,
            occupiedRooms,
            totalRooms,
        });
    }, [roomData]);

    return (
        <div className='container-fluid'>
            <h1 className='text-center'>Hostel Rooms</h1>
            <div className='row'>
                <div className='col-md-content '>
                    <Card className='h-100'>
                        <Card.Body>
                            <Card.Title><strong>Hostel Name:</strong> {hostelDetails.name}</Card.Title>
                            <Card.Text>
                                <strong>Vacant Rooms:</strong> {hostelDetails.vacantRooms}
                            </Card.Text>
                            <Card.Text>
                                <strong>Occupied Rooms:</strong> {hostelDetails.occupiedRooms}
                            </Card.Text>
                            <Card.Text>
                                <strong>Total Rooms:</strong> {hostelDetails.totalRooms}
                            </Card.Text>
                            <Button variant='primary' onClick={() => setShowModal(true)}>
                                Create Room
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>


            {isRoomDataLoading ? (
                <Spinner animation='border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            ) : roomData.length !== 0 ? (
                <AdminHostelMatrix seats={roomData} />
            ) : (
                <p>No Room found!!</p>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Room Number:</Form.Label>
                        <Form.Control
                            type='number'
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(parseInt(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Room Type:</Form.Label>
                        <Form.Control
                            as='select'
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value='Single'>Single</option>
                            <option value='Double'>Double</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant='primary' disabled={isRoomCreating} onClick={handleCreateRoom}>
                        {isRoomCreating ? <PulseLoader size={10} loading={isRoomCreating} /> : ("Create")}

                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
