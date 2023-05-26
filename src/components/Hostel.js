import React, {
    useState
} from 'react';
import { useParams } from 'react-router-dom';
import HostelMatrix from './HostelMatrix';
import './../assets/css/hostel.css';
export default function Hostel() {
    const seatsData = [
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
        { seatNumber: 'A1' },
        { seatNumber: 'A2' },
        { seatNumber: 'A3' },
        { seatNumber: 'A4' },
        { seatNumber: 'A5' },
        { seatNumber: 'A6' },
        { seatNumber: 'A7' },
        { seatNumber: 'A8' },
        { seatNumber: 'A9' },
        { seatNumber: 'A10' },
        { seatNumber: 'A11' },
        { seatNumber: 'A12' },
        { seatNumber: 'A13' },
        { seatNumber: 'A14' },
        { seatNumber: 'A15' },
        { seatNumber: 'A16' },
        { seatNumber: 'A17' },
        { seatNumber: 'A18' },
        { seatNumber: 'A19' },
        { seatNumber: 'A20' },
        { seatNumber: 'A22' },
        { seatNumber: 'A21' },
        { seatNumber: 'A23' },
        { seatNumber: 'A24' },
    ];
    return (
        <div className='hostel-container'>
            <h1>Hostel Rooms</h1>
            <HostelMatrix seats={seatsData} />
        </div>
    )
}