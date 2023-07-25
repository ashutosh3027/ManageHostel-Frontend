import React, { useState } from 'react';
import { Pagination, Modal, Button } from 'react-bootstrap';
import roomServices from '../services/roomServices';
import './../assets/css/hostelMatrix.css';
import PulseLoader from "react-spinners/PulseLoader";
import { useUser } from '../context/userContext';
import { useRoom } from '../context/roomContext';
import { toast } from 'react-toastify';
const rowsPerPage = 10; // Number of rows per page
const colsPerPage = 10; // Number of columns per page

const HostelMatrix = ({ seats }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [isBooking, setIsBooking] = useState(false);
  const { userData: user, updateUserData } = useUser();
  const { updateRoomData } = useRoom();
  const totalSeats = seats.length;
  const totalRows = Math.ceil(totalSeats / colsPerPage);
  const totalPageCount = Math.ceil(totalRows / rowsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const bookRoom = async (roomNumber, buildingId) => {
    const userId = String(user.id);
    setIsBooking(true);
    try {
      await roomServices.bookRoom(roomNumber, buildingId, userId);
      toast.success("Room booked successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        draggable: true
      });
      // Fetch the updated room data after booking
      updateRoomData(buildingId.id)
      updateUserData()
      setShowModal(false);
      setIsBooking(false);
      // Update user data and perform other actions
    } catch (error) {
      const errorMessage =  error.response?.data?.message || error.response?.data?.error || 'Server Error';
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        draggable: true,
      });
      setIsBooking(false);
    }
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
              {`${seat.roomNumber}-${seat.roomType[0]}`}
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

  const handleBookingConfirm = (roomNumber, buildingId) => {
    bookRoom(roomNumber, buildingId);

  };

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
              <p>{`Room Type: ${selectedRoom.roomType}`}</p>
              {selectedRoom.allocatedTo && (
                <p>Booked by: {selectedRoom.allocatedTo.name}</p>
              )}
              <p>Building Name: {selectedRoom.buildingId.buildingName}</p>
            </>
          )}
          {!selectedRoom.isAllocated && <p>Do you want to book this room?</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {!selectedRoom.isAllocated && (
            <Button
              variant="primary"
              disabled={isBooking}
              onClick={() => handleBookingConfirm(selectedRoom.roomNumber, selectedRoom.buildingId)}
            >
              {isBooking ? <PulseLoader color={"#0a138b"} size={10} /> : ("Book Room")}
            </Button>
          )}
        </Modal.Footer>
      </Modal>}

    </div>
  );
};

export default HostelMatrix;
