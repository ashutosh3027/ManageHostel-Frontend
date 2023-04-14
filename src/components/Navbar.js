import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assets/css/navbar.css";
import { useUser } from "./../context/userContext";
export default function Navbar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate()
  const { isLoggedIn, logout, isAdminLogin } = useUser();
  const handleClick = (e) => {
    if (e.target.id === "logout") {
      logout();
    }
    setClick(!click);
  };
  const Close = () => setClick(false);

  return (
    <>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <div className="nav-icon nav-icon-btn" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <Link to="/" className="nav-logo">
            &lt;ManageHostel/&gt;
          </Link>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {!isLoggedIn && (
              <>
                <li className="nav-item nav-item-link">
                  <Link
                    to="/"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item nav-item-link">
                  <Link
                    to="/about"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item nav-item-link section">
                  <Link
                    to="/contact"
                    activeclassname="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item nav-item-btn">
                  <button onClick={(e) => {
                    navigate('/login');
                    if (click) {
                      handleClick(e)
                    }
                  }}
                    className=" btn btn-default btn-rounded"
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item nav-item-btn">
                  <button onClick={(e) => {
                    navigate('/signup')
                    if (click) {
                      handleClick(e);
                    }

                  }}
                    className="btn btn-primary btn-rounded"
                  >
                    Sign up
                  </button>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item nav-item-link">
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
                    <li className="nav-item nav-item-link">
                      <Link
                        to="/roomStatus"
                        activeclassname="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        RoomStatus
                      </Link>
                    </li>
                    <li className="nav-item nav-item-link">
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
                    <li className="nav-item nav-item-link">
                      <Link
                        to="/profile"
                        activeclassname="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item nav-item-link">
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
                <li className="nav-item nav-item-link">
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


        </div>
      </nav>
    </>
  );
}
