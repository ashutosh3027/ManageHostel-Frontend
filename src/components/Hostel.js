import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import HostelMatrix from './HostelMatrix';
import './../assets/css/hostel.css';
import { useRoom } from '../context/roomContext';
import { Spinner } from 'react-bootstrap';
export default function Hostel() {
    const {id:hostelId} = useParams();
    const { roomData, updateRoomData, isRoomDataLoading } = useRoom();
    
    useEffect(() => {
        updateRoomData(hostelId);
    }, [hostelId])

    return (
        <div className='hostel-container'>
            <h1>Hostel Rooms</h1>
            {isRoomDataLoading ? (<Spinner animation='border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>) : roomData.length !== 0 ? (<HostelMatrix seats={roomData} />) : (<p>No Room found!!</p>)}

        </div>
    )
}