import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assets/css/navbar.css";
import { useUser } from "./../context/userContext";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, isAdminLogin } = useUser();

  const handleClick = (e) => {
    if (e.target.id === "logout") {
      logout();
      if (click) setClick(!click);
      return;
    }
    setClick(!click);
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
          <div className="nav-icon nav-icon-btn" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
          <Link to="/" className="nav-logo">
            &lt;ManageHostel/&gt;
          </Link>
          <ul
            className={
              click
                ? "nav-menu active align-items-center justify-content-around m-auto"
                : "nav-menu align-items-center justify-content-around m-auto"
            }
          >
            {!isLoggedIn && (
              <>
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/about"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    About Us
                  </Link>
                </li>
                <li className="custom-nav-item custom-nav-item-link section">
                  <Link
                    to="/contact"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="custom-nav-item nav-item-btn">
                  <button
                    onClick={(e) => {
                      navigate("/login");
                      if (click) {
                        handleClick(e);
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
                        handleClick(e);
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
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    Home
                  </Link>
                </li>
                {isAdminLogin ? (
                  <>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/admin/profile"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                       Profile
                      </Link>
                    </li>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/admin/users"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        Manage Users
                      </Link>
                    </li>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/admin/hostels"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
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
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li className="custom-nav-item custom-nav-item-link">
                      <Link
                        to="/hostels"
                        activeClassName="active"
                        className="nav-links"
                        onClick={click ? handleClick : null}
                      >
                        Hostels
                      </Link>
                    </li>
                  </>
                )}
                <li className="custom-nav-item custom-nav-item-link">
                  <Link
                    to="/"
                    activeClassName="active"
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
