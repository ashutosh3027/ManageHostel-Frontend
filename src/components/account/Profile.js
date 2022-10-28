import React, { useEffect, useState } from "react";
import "./../../assets/css/profile.css";
import { useUser } from "./../../context/userContext";
import Spinner from "./../Spinner";
import PulseLoader from "react-spinners/PulseLoader";
import authServices from "../../services/authServices";
import toast, { Toaster } from "react-hot-toast";
export default function Profile() {
  const { userData: user, isLoggedIn } = useUser();
  const [isSending, setIsSending] = useState(false);
  var dateOfAllotment;
  if (!user) return <Spinner loading={!user} size={100} />;
  if (user) {
    dateOfAllotment = new Date(user.roomAllotedAt);
  }
  const resetPassword = () => {
    setIsSending(true);
    authServices.forgotPassword(user.email).then((data)=>{
      console.log(data);
       if(data.data.status==="success"){
         toast.success('Email has been sent successfully.')
         setIsSending(false);
       }
    }).catch((error) => {
      setIsSending(false);
    });
  };
  return (
    <div className="profile__section">
      <div className="profile__container">
        <div className="profile__Header">
          <h1>Profile </h1>
          <p>Your personal information</p>
        </div>
        <div className="profile__photo"></div>
        <div className="userData">
          <FormInput
            description="Name"
            type="text"
            isDisabled={true}
            value={user.name}
          />
          <FormInput
            description="Email"
            type="text"
            isDisabled={true}
            value={user.email}
          />
          {/* <FormInput description="Semester" type="text" isDisabled={true} value={user.sem}/>
          <FormInput description="Section" type="text" isDisabled={true} value={user.sec}/>
          <FormInput description="Branch" type="text" isDisabled={true} value={user.branch}/> */}

          <div className="profile__items">
            <label>Password</label>
            <button disable={isSending} onClick={resetPassword}>
              {isSending ? (
                <PulseLoader color={"#0a138b"} size={10} />
              ) : (
                "Reset password by email"
              )}
            </button>
            <Toaster position="top-right" />
          </div>
          {user.isRoomAlloted ? (
            <>
              <FormInput
                description="Room"
                type="text"
                isDisabled={true}
                value={user.RoomNumber}
              />
              <FormInput
                description="AllotedAt"
                type="text"
                isDisabled={true}
                value={`${dateOfAllotment.getDate()}/${dateOfAllotment.getMonth()}/${dateOfAllotment.getFullYear()}`}
              />
            </>
          ) : (
            <FormInput
              description="Room"
              type="text"
              isDisabled={true}
              value={"Not Alloted yet!"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const FormInput = (props) => {
  return (
    <div className="profile__items">
      <label>{props.description}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.value}
        disabled={props.isDisabled}
      />
    </div>
  );
};
