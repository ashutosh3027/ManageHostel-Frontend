import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUser } from "./context/userContext";
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import "./App.css";
import BookHostel from "./components/requests.js";
import Hostels from "./components/Hostels";
import Spinner from "./components/Spinner";
import RoomStatus from "./components/RoomStatus";
import RequestStatus from "./components/RequestStatus";
import RoomDetail from "./components/RoomDetail";
import ForgetPassword from "./components/account/ForgetPassword";
const Home = lazy(() => import("./components/Home"));
const Profile = lazy(() => import("./components/account/Profile.js"));
function App() {
  const { isDataLoading } = useUser();

  return (
    <div className="App">
      {isDataLoading ? (
        <Spinner size={100} />
      ) : (
        <Router>
          <Suspense fallback={<Spinner />}>
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/signup" element={<Register />}></Route>
              <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/hostels"
                element={
                  <ProtectedRoute>
                    <Hostels />{" "}
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/roomStatus"
                element={
                  <ProtectedRoute>
                    <RoomStatus />{" "}
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/requestStatus"
                element={
                  <ProtectedRoute>
                    <RequestStatus />{" "}
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/roomStatus/:id"
                element={
                  <ProtectedRoute>
                    <RoomDetail />{" "}
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </Suspense>
        </Router>
      )}
    </div>
  );
}

export default App;
