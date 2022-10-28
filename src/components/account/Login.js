import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./../../assets/css/login.css";
import "./../../assets/css/adminLogin.css"
import authServices from "../../services/authServices";
import { useUser } from "../../context/userContext";
import PulseLoader from "react-spinners/PulseLoader";
import ForgetPassword from "./ForgetPassword";
export default function Login() {
  const [formData, updateFormData] = useState({});
  const { setUserState, userData, isLoggedIn} = useUser();
  const [isLoading, setIsLoading]= useState(false); 
  const {state}=useLocation();
  const [redirectToReferrer, setRedirectToReferrer]=useState(0);
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (typeof value === String) {
      value.trim();
    }
    updateFormData({ ...formData, [name]: value });
  };
  const handleLogin = async () => {
    try{
      setIsLoading(true);
      const { email, password } = formData;
      const res = await authServices.login(email, password);
      const { data } = res;
      setUserState(data);
      setRedirectToReferrer((prv)=>(prv+1));
      setIsLoading(false);
    }
    catch (error) {
      setIsLoading(false);
    }
  
  };
  if (redirectToReferrer) {
    return (<Navigate to="/" />);
  }
  if(isLoggedIn){
    return (<Navigate to="/" />);
  }
  return (
    <div className="container">
      <div id="loginform">
        <FormHeader title="Login" />
        <Form handleLogin={handleLogin} handleChanges={handleChanges} isLoading={isLoading} setIsLoading={setIsLoading} />
        <OtherMethods />
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
      name="email"
      handleChanges={props.handleChanges}
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
      name="password"
      handleChanges={props.handleChanges}
    />
    <FormButton title="Log in" handleLogin={props.handleLogin} isLoading={props.isLoading} setIsLoading={props.setIsLoading}/>
    <div className="message">
      <div>
        <input type="checkbox" name="checked" onChange={props.handleChanges} />{" "}
        Remember ME
      </div>
      <div>
        <a href="/forgetPassword">Forgot your password</a>
      </div>
    </div>
  </div>
);

const FormButton = (props) => (
  <div id="button" className="row">
    <button onClick={props.handleLogin} disabled={props.isLoading}>{props.isLoading? <PulseLoader color={"#f5b921"} size={10} loading={props.isLoading} />:(props.title)}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.handleChanges}
    />
  </div>
);

const OtherMethods = (props) => (
  <div id="signup">
    <label>
      New to ManageHostel? <Link to="/signup"> Register </Link>{" "}
    </label>
  </div>
);
