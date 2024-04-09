import React from "react";
import "../assets/css/contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out:</p>
      <ul>
        <li>Email: <a href="mailto:ashutoshverma5555@gmail.com">ashutoshverma5555@gmail.com</a></li>
        <li>Phone: <a href="tel:7470496216">7470496216</a></li>
      </ul>
      <div className="github-links">
        <p>Project GitHub:</p>
        <ul>
          <li><a href="https://github.com/ashutosh3027/ManageHostel-Frontend">Front-end</a></li>
          <li><a href="https://github.com/ashutosh3027/ManageHostel-Backend">Back-end</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
