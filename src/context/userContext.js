import React, { createContext, useContext, useState, useEffect } from "react";
import authServices from "../services/authServices";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authData, setAuthData] = useState({ token: "" });
  const [userData, setUserData] = useState(null);
  const [isDataLoading, setIsDataLoading]=useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      authServices.getCurrentUser().then((res) => {
        const { user } = res;
        setUserData((prevUser) => ({ ...prevUser, ...user }));
        if(user&&user.role==="admin"){
          setIsAdminLogin(true);
        }
        setIsDataLoading(false);
      }).catch((err)=>{
        console.log(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setAuthData({token:" "});
        setIsDataLoading(false);
      })    
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
      
      setAuthData({ token });
    }
    else{
      setIsDataLoading(false);
    }
  }, []);

  const setUserInfo = (data) => {
    const { user, token } = data;
    setIsLoggedIn(true);
    setUserData(user);
    setAuthData({ token });
    localStorage.setItem("jwt", token);
  };
  const logout = () => {
    setIsAdminLogin(false);
    setUserData(null);
    setAuthData({token:""});
    setIsLoggedIn(false);
    authServices.logout();
  };
  const updateUserData = ()=>{
    try {
      (async () =>{
        const { user } =await authServices.getCurrentUser();
        setUserData((prevUser) => ({ ...prevUser, ...user }));
      })();
    } catch (error) {
      
    }
  }

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, authData, userData, setUserState:(data)=>setUserInfo(data), setUserData,logout,isDataLoading,isAdminLogin,updateUserData}}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
