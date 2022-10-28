import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../assets/css/navbar.css";
import { useUser } from "./../context/userContext";
export default function Navbar() {
  const [click, setClick] = useState(false);
  const { isLoggedIn, logout, userData,isAdminLogin} = useUser();
  const handleClick = (e) => {
    if (e.target.id === "logout") {
      logout();
    }
    if (click) setClick(!click);
  };
  const Close = () => setClick(false);

  return (
    <>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            ManageHostel
            <i className="fa fa-code"></i>
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/Login"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/contact"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Contact Us
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    to="/"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>
                {isAdminLogin ? (
                  <>
                  <li className="nav-item">
                    <Link
                      to="/roomStatus"
                      activeclassname="active"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      RoomStatus
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/requestStatus"
                      activeclassname="active"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      RequestStatus
                    </Link>
                  </li>
                </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/profile"
                        activeclassname="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/bookHostel"
                        activeclassname="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        Book Hostel
                      </Link>
                    </li>
                  </>
                )}
              
                {/* <li className="nav-item">
                  <Link
                    to="/myRoom"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    My Room Details
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/requests"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Request Status
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    to="/"
                    activeclassname="active"
                    className="nav-links"
                    id="logout"
                    onClick={handleClick}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}
