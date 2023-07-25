import React, { createContext, useContext, useState, useEffect } from "react";
import authServices from "../services/authServices";
import { toast } from "react-toastify";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authData, setAuthData] = useState({ token: "" });
  const [userData, setUserData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      authServices.getCurrentUser().then((res) => {
        const { user } = res;
        setUserData((prevUser) => ({ ...prevUser, ...user }));
        if (user && user.role === "admin") {
          setIsAdminLogin(true);
        }
        setIsDataLoading(false);
      }).catch((error) => {
        setIsLoggedIn(false);
        console.log(error)
        if (error.response.data){
          setAuthData({ token: " " });
          localStorage.removeItem('jwt')
        }
        setIsDataLoading(false);
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message||'Server Error';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true,
        });
      })
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);

      setAuthData({ token });
    }
    else {
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
    setAuthData({ token: "" });
    setIsLoggedIn(false);
    authServices.logout();
    toast.success("Logout Success!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
      draggable: true
    });
  };
  const updateUserData = () => {
    (async () => {
      try {
        const { user } = await authServices.getCurrentUser();
        setUserData((prevUser) => ({ ...prevUser, ...user }));

      } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true,
        });
      }
    })();
  }

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, authData, userData, setUserState: (data) => setUserInfo(data), setUserData, logout, isDataLoading, isAdminLogin, updateUserData }}
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
