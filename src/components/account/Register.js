import React, { Children } from "react";
import authServices from "../../services/authServices";
import "./../../assets/css/signup.css";
import { useUser } from "../../context/userContext";
import { Link, Navigate, useLocation } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
export default function Register() {
  const [signUpIsLoading, setSignUpIsLoading] = React.useState(false);
  const [signUpFormData, updateSignUpFormData] = React.useState({});
  const { setUserState, userData, isLoggedIn} = useUser();
  const [redirectToReferrer, setRedirectToReferrer]=React.useState(0);

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (typeof value === String) {
      value.trim();
    }
    updateSignUpFormData({ ...signUpFormData, [name]: value });
  };
  const signUp = async (formData) => {
    try {
      setSignUpIsLoading(true);
      const {name,email,password,passwordConfirm,semester,section,branch} = formData;
      const data = await authServices.signup(name, email, section, semester, branch, password, passwordConfirm);
      console.log(data)
      setUserState(data);
      setRedirectToReferrer((prv)=>(prv+1));
      setSignUpIsLoading(false);
    } catch (error) {
      setSignUpIsLoading(false);
    }
  };
  if (redirectToReferrer) {
    return (<Navigate to="/" />);
  }
  if(isLoggedIn){
    return (<Navigate to="/" />);
  }
  return (
    <div className="signup-container">
      <div id="signupform">
        <FormHeader title="Register" />
        <Form
          signUp={() => {
            signUp(signUpFormData);
          }}
          signUpIsLoading={signUpIsLoading}
          handleChanges={handleChanges}
          propsFormData={{signUpFormData, updateSignUpFormData}}
        />
      </div>
    </div>
  );
}
const FormHeader = (props) => <h2 id="headerTitle-signup">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Name"
      placeholder="Name"
      name="name"
      type="text"
      handleChanges={props.handleChanges}
    />
    <FormInput
      description="Email"
      placeholder="Enter your email"
      name="email"
      type="text"
      handleChanges={props.handleChanges}

    />
    <FormInput
      description="Password"
      placeholder="Password"
      type="password"
      name="password"
      handleChanges={props.handleChanges}
    />
    <FormInput
      description="Password Confirm"
      placeholder="Password Confirm"
      type="password"
      name="passwordConfirm"
      handleChanges={props.handleChanges}
    />
    <FormButton handleSignUp={props.signUp} title="Register" isLoading={props.signUpIsLoading}/>
  </div>
);

const FormButton = (props) => (
  <div id="button" className="row">
    <button onClick={props.handleSignUp} disabled={props.isLoading}>{props.isLoading? <PulseLoader color={"#f5b921"} size={10} loading={props.isLoading} />:(props.title)}</button>
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

const itemList = (props, handleText) => {
  const list = props.map((item) => (
    <div onClick={handleText} className="dropdown__item" key={item.toString()}>
      {item}
    </div>
  ));

  return <div className="dropdown__items"> {list} </div>;
};
const FormDropdown = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [haveText, setHaveText] = React.useState("");
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleText = (ev) => {
    setHaveText(ev.currentTarget.textContent);
    props.propsFormData.updateSignUpFormData({ ...props.propsFormData.signUpFormData, [props.name]: ev.currentTarget.textContent});
  };
  return (
    <div className="row">
      <label>{props.description}</label>
      <div
        className={isOpen ? "dropdown active" : "dropdown"}
        onClick={handleClick}
      >
        <div className="dropdown__text">
          {!haveText ? `Select ${props.description}` : haveText}
        </div>
        {itemList(props.options, handleText)}
      </div>
    </div>
  );
};
