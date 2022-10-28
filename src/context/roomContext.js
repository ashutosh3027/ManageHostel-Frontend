import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../axiosConfigure/axiosConfigure";
import authServices from "../services/authServices";
import roomServices from "../services/roomServices";
import { useUser } from "./userContext";
const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const {isAdminLogin} = useUser();
  const [allRooms, setAllRooms]=useState([]);
  useEffect(()=>{
    const getRooms = async()=>{
       const {data} = await roomServices.getAllRooms();
       const res = data.rooms;
       setAllRooms((prv)=>([...prv, ...res])) ;
    }
    if(isAdminLogin){
        getRooms();
    }
  }, [isAdminLogin])
  return (
    <RoomContext.Provider value={{allRooms}}>
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
  
