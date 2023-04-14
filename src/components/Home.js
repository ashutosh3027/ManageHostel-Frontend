import React from "react";
import "./../assets/css/home.css";
import homeImg from './../assets/images/home_page.svg';
export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="home__text">
          <h1 className="bold-light-text">
            Welcome to <br />
            <span className="primary-color">ManageHostel</span>
          </h1>
          <p className="light-text">
            Easily manage hostel rooms with <br /> few click.
          </p>
        </div>
        <div className="imgBox">
          <img src={homeImg} alt="" />
        </div>
      </div>
    </>
  );
}
