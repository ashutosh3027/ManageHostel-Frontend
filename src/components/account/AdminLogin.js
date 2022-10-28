import React from "react";
import {Link} from "react-router-dom"
import "./../../assets/css/adminLogin.css";
export default function AdminLogin() {
  return (
    <div className="container">
      <div id="loginform">
        <FormHeader title="Admin Login" />
        <Form />
      </div>
    </div>
  );
}
const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Email"
      placeholder="Enter your email"
      type="text"
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
    />
    <FormButton title="Log in" />
    <div className="message">
      <div>
        <input type="checkbox" /> Remember ME
      </div>
      <div>
        <a href="/">Forgot your password</a>
      </div>
    </div>
  </div>
);

const FormButton = (props) => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);

