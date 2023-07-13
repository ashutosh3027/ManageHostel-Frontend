import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assets/css/navbar.css";
import { useUser } from "./../context/userContext";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdminLogin } = useUser();
  const [activeLink, setActiveLink] = useState("Home");
  const handleClick = (e, link) => {
    if (e.target.id === "logout") {
      logout();
      if (click) setClick(!click);
      setActiveLink(link)
      return;
    }
    console.log(e, link)
    if(link!=="null")
    setActiveLink(link);

   
    if(!click&&link==="null") setClick(true)
    else if(click) setClick(!click);
  };

  const Close = () => setClick(false);

  if (window.innerWidth === 1000) {
    setClick(false);
  }

  return (
    <>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav
        className="customNavbar p-auto justify-content-around"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="nav-container">
          <div className="nav-icon nav-icon-btn" onClick={(e)=>{handleClick(e, 'null')}}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <Link to="/" className="nav-logo" onClick={()=>{
            setActiveLink("Home");
            if(click) setClick(!click)
          }}>
            &lt;ManageHostel/&gt;
          </Link>
          <ul
            className={
              click
                ? "nav-menu active  m-auto"
                : "nav-menu  m-auto"
            }
          >
            {!isLoggedIn && (
              <>
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/"
                    className={`${activeLink === "Home" ? "active" : ""} nav-links`}
                    onClick={(e) => {
                      handleClick(e, "Home")
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/about"
                    className={`${activeLink === "about" ? "active" : ""} nav-links`}
                    onClick={(e) => {
                      handleClick(e, "about")
                    }}
                  >
                    About Us
                  </Link>
                </li>
                <li className="custom-nav-item custom-nav-item-link section">
                  <Link
                    to="/contact"
                    className={`${activeLink ==="contact" ? "active" : ""} nav-links`}
                    onClick={(e) => {
                      handleClick(e, "contact")
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="custom-nav-item nav-item-btn">
                  <button
                    onClick={(e) => {
                      navigate("/login");
                      if (click) {
                        handleClick(e, "login");
                      }
                    }}
                    className="custom-btn btn-default btn-rounded"
                  >
                    Login
                  </button>
                </li>
                <li className="custom-nav-item nav-item-btn">
                  <button
                    onClick={(e) => {
                      navigate("/signup");
                      if (click) {
                        handleClick(e, "signup");
                      }
                    }}
                    className="custom-btn btn-primary btn-rounded"
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="custom-nav-item custom-nav-item-link active">
                  <Link
                    to="/"
                    className={`${activeLink === "Home" ? "active" : ""} nav-links`}
                    onClick={(e) => {
                      handleClick(e, "Home")
                    }}
                  >
                    Home
                  </Link>
                </li>
                {isAdminLogin ? (
                  <>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/admin/profile"
                        className={`${activeLink === "profile" ? "active" : ""} nav-links`}
                        onClick={(e) => {
                          handleClick(e, "profile")
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/admin/users"
                        className={`${activeLink === "users" ? "active" : ""} nav-links`}
                        onClick={(e) => {
                          handleClick(e, "users")
                        }}
                      >
                        Manage Users
                      </Link>
                    </li>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/admin/hostels"
                        className={`${activeLink === "hostels" ? "active" : ""} nav-links`}
                        onClick={(e) => {
                          handleClick(e, "hostels")
                        }}
                      >
                        Manage Hostels
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/profile"
                        className={`${activeLink === "profile" ? "active" : ""} nav-links`}
                        onClick={(e) => {
                          handleClick(e, "profile")
                        }}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/hostels"
                        className={`${activeLink === "hostels" ? "active" : ""} nav-links`}
                        onClick={(e) => {
                          handleClick(e, "hostels")
                        }}
                      >
                        Hostels
                      </Link>
                    </li>
                  </>
                )}
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/"
                    id="logout"
                    className={`${activeLink === "logout" ? "active" : ""} nav-links`}
                    onClick={(e) => {
                      handleClick(e, "Home")
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
