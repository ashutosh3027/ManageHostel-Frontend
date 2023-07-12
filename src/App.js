import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUser } from "./context/userContext";
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Login from "./components/account/Login";
import Register from "./components/account/Register";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import "./App.css";
import Hostels from "./components/Hostels";
import Hostel from "./components/Hostel";
import Spinner from "./components/Spinner";
import ForgetPassword from "./components/account/ForgetPassword";
import NotFoundComponent from "./components/NotFoundComponent";
import CreateColleges from "./components/AdminComponents/CreateColleges";
import CollegeDashboard from "./components/AdminComponents/CollegeDashboard";
import AdminHostel from "./components/AdminComponents/AdminHostel";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import AdminHostels from "./components/AdminComponents/AdminHostels";
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
                path="/hostels/:id"
                element={
                  <ProtectedRoute>
                    <Hostel />{" "}
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/admin/college" element={
                <AdminProtectedRoute>
                  <CreateColleges></CreateColleges>
                </AdminProtectedRoute>} />
              <Route path="admin/college/:id" element=
                {
                  <AdminProtectedRoute> <CollegeDashboard /></AdminProtectedRoute>
                } />
              <Route path="/admin/hostel/:id" element={
                <AdminProtectedRoute>
                  <AdminHostel />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/profile" element={
                <AdminProtectedRoute>
                  <Profile />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/hostels" element={
                <AdminProtectedRoute>
                  <AdminHostels />
                </AdminProtectedRoute>
              } />
              <Route path="*" element={<NotFoundComponent />} />
            </Routes>
          </Suspense>
        </Router>
      )
      }
    </div >
  );
}

export default App;
