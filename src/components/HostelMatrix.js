import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import './../assets/css/hostelMatrix.css'
const rowsPerPage = 10; // Number of rows per page
const colsPerPage = 10; // Number of columns per page

const HostelMatrix = ({ seats }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalSeats = seats.length;
  const totalRows = Math.ceil(totalSeats / colsPerPage);
  const totalPageCount = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <div key={seat.seatNumber} className="col matrix-cell seat">
              {seat.seatNumber}
            </div>
          );
        } else {
          row.push(<div key={`empty-${i}-${j}`} className="col matrix-cell empty-seat" />);
        }
      }
      matrix.push(<div key={`row-${i}`} className="row matrix-row">{row}</div>);
    }

    return matrix;
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
    </div>
  );
};

export default HostelMatrix;
