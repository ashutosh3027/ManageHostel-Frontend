import React from "react";
import authServices from "../../services/authServices";
import "./../../assets/css/signup.css";
import signupImg from './../../assets/images/signup.gif'
import { useUser } from "../../context/userContext";
import { Link, Navigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
export default function Register() {
  const [signUpIsLoading, setSignUpIsLoading] = React.useState(false);
  const [signUpFormData, updateSignUpFormData] = React.useState({});
  const { setUserState, isLoggedIn } = useUser();
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(0);

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
      const { name, email, password, passwordConfirm, semester, section, branch } = formData;
      const data = await authServices.signup(name, email, section, semester, branch, password, passwordConfirm);
      console.log(data)
      setUserState(data);
      setRedirectToReferrer((prv) => (prv + 1));
      setSignUpIsLoading(false);
      toast.success("Registration Success!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        draggable: true
      });
    } catch (error) {
      setSignUpIsLoading(false);
      console.log(error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`${error.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true
        });
      }
      else if(error.response && error.response.data && error.response.data.error){
        toast.error(`${error.response.data.error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true
        });
      }
      else if (error.response && !error.response.data) {
        toast.error(`Server Error`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true
        });
      }
      else {
        toast.error(`${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true
        });
      }
    }
  };
  if (redirectToReferrer) {
    return (<Navigate to="/" />);
  }
  if (isLoggedIn) {
    return (<Navigate to="/" />);
  }
  return (
    <div className="container d-flex justify-content-around align-items-center">
      <img src={signupImg} alt="img"></img>
      <div id="form">
        <FormHeader title="Register" />
        <Form
          signUp={() => {
            signUp(signUpFormData);
          }}
          signUpIsLoading={signUpIsLoading}
          handleChanges={handleChanges}
          propsFormData={{ signUpFormData, updateSignUpFormData }}
        />
        <OtherMethods />
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
    <FormButton handleSignUp={props.signUp} title="Register" isLoading={props.signUpIsLoading} />
  </div>
);

const FormButton = (props) => (
  <div id="button" className="coustom-row">
    <button onClick={props.handleSignUp} disabled={props.isLoading}>{props.isLoading ? <PulseLoader color={"#f5b921"} size={10} loading={props.isLoading} /> : (props.title)}</button>
  </div>
);

const FormInput = (props) => (
  <div className="coustom-row">
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
  <div class="text">
    <label>
      Already have an account? <Link to="/login"> Login  </Link>{" "}
    </label>
  </div>
);