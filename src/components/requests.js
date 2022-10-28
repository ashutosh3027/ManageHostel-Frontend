import React, { useEffect } from "react";
import "./../assets/css/requests.css";
import authServices from "./../services/authServices";
import Spinner from "../components/Spinner";
import requestServices from "../services/requestServices";
import { useUser } from "../context/userContext";
import roomServices from "./../services/roomServices";
import toast, { Toaster } from "react-hot-toast";

export default function requests() {
  const [roomData, setRoomData] = React.useState(null);
  const [activeRequests, setActiveRequests] = React.useState([]);
  const [inactiveRequests, setInActiveRequests] = React.useState([]);
  const { userData: user, isLoggedIn, setUserData } = useUser();
  const [isRequested, setIsRequested] = React.useState(false);
  useEffect(() => {
    const getRoom = async () => {
      const res = await authServices.getAllRooms();
      const rooms = res.data.rooms;
      setRoomData(rooms);
    };
    getRoom();
    // console.log(user);
  }, []);
  // used to check whether student has requested or not
  useEffect(() => {
    if(user){
        const tempActiveRequests = user.requests.filter((el)=>el.requestType===true)
        setActiveRequests(tempActiveRequests);
        const tempInActiveRequests = user.requests.filter((el)=>el.requestType===false);
        setInActiveRequests(tempInActiveRequests);
    }
    if (user&&roomData) {
      if (activeRequests.length>0) {
        setIsRequested(true);
      }
    }
  }, [user, roomData]);
  useEffect(() => {
    if (isRequested) {
      const getRoomById = async () => {
        const room = await roomServices.getRoomById(user.requests[0].room);
        document.querySelectorAll(".btn").forEach((el) => {
          el.disabled = true;
          el.classList.add("disabled");
          el.classList.remove("btnEffects");
        });
        document.querySelector(`.btn-${room.roomNumber}`).innerHTML =
          "Requested🟢";
        document.querySelector(`.btn-${room.roomNumber}`).disabled = false;
        document
          .querySelector(`.btn-${room.roomNumber}`)
          .classList.remove("disabled");
        document
          .querySelector(`.btn-${room.roomNumber}`)
          .classList.add("active");
      };
      getRoomById();
    }
  }, [isRequested]);

  // for fatching data when user apply
  const fatchData = async (roomNumber) => {
    const data = await requestServices.makeReqest(roomNumber);
    const { user: newUser } = await authServices.getCurrentUser();
    setUserData((prevUser) => ({ ...prevUser, ...newUser }));
    document.querySelector(`.btn-${roomNumber}`).innerHTML = "Requested🟢";
    setIsRequested(true);
  };
  const makeRequest = (roomNumber)=>{
    if(user.isRoomAlloted){
      toast.error('Room is already alloted!!');
      return;
    }
    toast.promise(fatchData(roomNumber), {
    loading: "Sending request...",
    success: <b>Request sent!</b>,
    error: <b>Something went wrong</b>,
  });}
 

  return (
    <div className="Requestscontainer">
      <table>
        <thead>
          <tr>
            <th className="requestRow requestHead">Room Number</th>
            <th className="requestRow requestHead">No of Active requests</th>
            <th className="requestRow requestHead">Apply</th>
          </tr>
        </thead>
        <tbody>
          {(user&&roomData) ? (
            roomData.map(({ roomNumber, requests}) => (
              <tr key={roomNumber}>
                <td className="requestRow">
                  <h2>{roomNumber}</h2>
                </td>
                <td className="requestRow">
                  <h2>{requests.length>0 ?requests.length : 0}</h2>
                </td>
                <td className="applyRow">
                  {
                    <div>
                      <button
                        className={`btn btnEffects btn-${roomNumber}`}
                        onClick={() => {
                          makeRequest(roomNumber);
                        }}
                      >
                        Apply
                      </button>
                      <Toaster position="top-right" />
                    </div>
                  }
                </td>
              </tr>
            ))
          ) : (
            <Spinner size={100} />
          )}
        </tbody>
      </table>
    </div>
  );
}
