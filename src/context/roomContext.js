import React, { createContext, useContext, useState, useEffect } from "react";
import roomServices from "../services/roomServices";
import { useUser } from "./userContext";
import { toast } from "react-toastify";
const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const { isAdminLogin } = useUser();
  const [allRooms, setAllRooms] = useState([]);
  const [isRoomDataLoading, setIsRoomDataLoading] = useState(false);
  const [roomData, setRoomData] = useState([])
  const updateRoomData = (hostelId) => {
    (async () => {
      setIsRoomDataLoading(true);
      try {
        const roomList = await roomServices.getRoomByBuildingId(hostelId)
        setRoomData([...roomList]);
        setIsRoomDataLoading(false);

      } catch (error) {
        setIsRoomDataLoading(false);
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true,
        });
      }

    })()
  }
  useEffect(() => {
    const getRooms = async () => {
      try {
        const { data } = await roomServices.getAllRooms();
        const res = data.rooms;
        setAllRooms((prv) => ([...prv, ...res]));
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true,
        });
      }

    }
    if (isAdminLogin) {
      getRooms();
    }
  }, [isAdminLogin])
  return (
    <RoomContext.Provider value={{ allRooms, roomData, updateRoomData, isRoomDataLoading }}>
      {children}
    </RoomContext.Provider>
  );
};
const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error("useRoom must be used within RoomProvider");
  }
  return context;
};

export { RoomProvider, useRoom };

