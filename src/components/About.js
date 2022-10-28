import React from "react";
import aboutImg from "./../assets/images/aboutImg.jpg";
import "./../assets/css/about.css";
export default function About() {
  return (
    <div className="about__box">
      <h2>About Us</h2>
      <div className="about__container">
        <div className="about__container__text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            error cum veniam porro, dolorum nihil quisquam, dolore neque
            corporis nulla fuga iure quo! Culpa officia ea fugit in eaque qui
            perferendis doloremque debitis ab.
          </p>
        </div>
        <img src={aboutImg} alt="AboutImage" />
      </div>
    </div>
  );
}
