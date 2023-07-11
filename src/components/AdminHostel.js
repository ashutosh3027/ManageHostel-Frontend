import React, {
    useEffect,
    useState
} from 'react';
import { useParams } from 'react-router-dom';
import HostelMatrix from './HostelMatrix';
import './../assets/css/hostel.css';
import { useRoom } from '../context/roomContext';
export default function AdminHostel() {
    const [hostelId, setHostelId] = useState(useParams().id);
    const {roomData, updateRoomData} = useRoom();
    useEffect(()=>{
        updateRoomData(hostelId);

    }, [hostelId])
    return (
        <div className='hostel-container'>
            <h1>Hostel Rooms</h1>
            
            {roomData.length!==0?<HostelMatrix seats={roomData} />: <p>No Room found!!</p>}
        </div>
    )
}