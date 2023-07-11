import React, { createContext, useContext, useState, useEffect } from "react";
import roomServices from "../services/roomServices";
import { useUser } from "./userContext";
const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const { isAdminLogin } = useUser();
  const [allRooms, setAllRooms] = useState([]);
  const [isRoomDataLoading, setIsRoomDataLoading] = useState(false);
  const [roomData, setRoomData] = useState([])
  const updateRoomData = (hostelId) => {
    (async () => {
      setIsRoomDataLoading(true);
      const roomList = await roomServices.getRoomByBuildingId(hostelId)
      console.log(roomList)
      setRoomData([...roomList]);
      setIsRoomDataLoading(false);
    })()
  }
  useEffect(() => {
    const getRooms = async () => {
      const { data } = await roomServices.getAllRooms();
      const res = data.rooms;
      setAllRooms((prv) => ([...prv, ...res]));
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

