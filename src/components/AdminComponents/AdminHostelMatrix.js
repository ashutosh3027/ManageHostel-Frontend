import React, { useState, useEffect } from 'react';
import { Pagination, Modal, Button } from 'react-bootstrap';
import roomServices from '../../services/roomServices';
import './../../assets/css/hostelMatrix.css';
import { useUser } from '../../context/userContext';
import toast, { Toaster } from 'react-hot-toast';
import { useRoom } from '../../context/roomContext';
import PulseLoader from "react-spinners/PulseLoader";
const rowsPerPage = 10; // Number of rows per page
const colsPerPage = 10; // Number of columns per page

const HostelMatrix = ({ seats }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(undefined);
    const [isUnallocating, setIsUnallocating] = useState(false);
    const [isdeleteingRoom, setIsdeleteingRoom] = useState(false);
    const { updateRoomData } = useRoom();
    const totalSeats = seats.length;
    const totalRows = Math.ceil(totalSeats / colsPerPage);
    const totalPageCount = Math.ceil(totalRows / rowsPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const vacantRoom = async (roomId, building) => {
        setIsUnallocating(true);
        await roomServices.vacantRoom(roomId)
            .then((data) => {
                console.log(data);
                updateRoomData(building.id)
                // Handle success response
                setIsUnallocating(false);
            })
            .catch((error) => {
                console.log(error);
                // Handle error response
                setIsUnallocating(false);
            });
    };

    const handleCellClick = (seat) => {
        setSelectedRoom(seat);
        setShowModal(true);
    };

    const getPageSeats = () => {
        const startIndex = (currentPage - 1) * rowsPerPage * colsPerPage;
        const endIndex = startIndex + rowsPerPage * colsPerPage;
        return seats.slice(startIndex, endIndex);
    };

    const generateMatrix = () => {
        const pageSeats = getPageSeats();
        const matrix = [];

        for (let i = 0; i < rowsPerPage; i++) {
            const row = [];
            for (let j = 0; j < colsPerPage; j++) {
                const index = i * colsPerPage + j;
                const seat = pageSeats[index];

                if (seat) {
                    row.push(
                        <div
                            key={seat.roomNumber}
                            className={seat.isAllocated ? 'col matrix-cell seat' : 'col matrix-cell seat empty-seat'}
                            onClick={() => handleCellClick(seat)}
                        >
                            {seat.roomNumber}
                        </div>
                    );
                } else {
                    row.push(<div key={`empty-${i}-${j}`} className="col matrix-cell" />);
                }
            }
            matrix.push(<div key={`row-${i}`} className="row matrix-row">{row}</div>);
        }
        return matrix;
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const deleteRoom = async (roomNumber, building) => {
        setIsdeleteingRoom(true);
        try {
            await roomServices.deleteRoom(roomNumber, building.id);
            updateRoomData(building.id)
            setIsdeleteingRoom(false)

        } catch (error) {
            console.log(error)
            setIsdeleteingRoom(false)
        }
    }

    return (
        <div className='matrixContainer'>
            <div className="matrix">{generateMatrix()}</div>

            <Pagination>
                {Array.from({ length: totalPageCount }).map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {selectedRoom && <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRoom && (
                        <>
                            <p>Room Number: {selectedRoom.roomNumber}</p>
                            {selectedRoom.allocatedTo && (
                                <p>Booked by: {selectedRoom.allocatedTo.name}</p>
                            )}
                            <p>Building Name: {selectedRoom.buildingId.buildingName}</p>
                        </>
                    )}
                    {!selectedRoom.isAllocated && <p>Do you want to remove this room?</p>}
                    {selectedRoom.isAllocated && <p>Do you want to vacant this room?</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    {selectedRoom.isAllocated ? (
                        <Button
                            variant="primary"
                            disabled={isUnallocating}
                            onClick={() => vacantRoom(selectedRoom.id, selectedRoom.buildingId)}
                        >
                            {isUnallocating ? <PulseLoader size={10} loading={isUnallocating} /> :
                                ("Vacant Room")}
                        </Button>
                    ) : <Button
                        variant="primary"
                        disabled={isdeleteingRoom}
                        onClick={() => deleteRoom(selectedRoom.roomNumber, selectedRoom.buildingId)}
                    >
                        {isdeleteingRoom ? <PulseLoader size={10} loading={isdeleteingRoom} /> : ("Delete Room")}
                    </Button>}
                </Modal.Footer>
            </Modal>}

        </div>
    );
};

export default HostelMatrix;
