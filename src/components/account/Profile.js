import React, { useState } from "react";
import "./../../assets/css/profile.css";
import { useUser } from "./../../context/userContext";
import Spinner from "./../Spinner";
import PulseLoader from "react-spinners/PulseLoader";
import authServices from "../../services/authServices";
import roomServices from "../../services/roomServices";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const { userData: user, updateUserData } = useUser();
  const [isSending, setIsSending] = useState(false);
  const [isVacating, setIsVacating] = useState(false);
  var dateOfAllotment;
  if (!user) return <Spinner loading={!user} size={100} />;
  if (user) {
    dateOfAllotment = new Date(user.roomAllotedAt);
  }
  const resetPassword = () => {
    setIsSending(true);
    authServices.forgotPassword(user.email)
      .then((data) => {
        console.log(data);
        if (data.data.status === "success") {
          toast.success("Email has been sent successfully.");
          setIsSending(false);
        }
      })
      .catch((error) => {
        setIsSending(false);
      });
  };

  const vacantRoom = async (roomId) => {
    setIsVacating(true);
    await roomServices.vacantRoom(roomId)
      .then((data) => {
        console.log(data);
        // Handle success response
        setIsVacating(false);
      })
      .catch((error) => {
        console.log(error);
        // Handle error response
        setIsVacating(false);
      });
    updateUserData();
    
  };

  return (
    <div className="profile__section">
      <div className="profile__container">
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

          {/* Additional FormInput fields for Organisation, Semester, Section, Branch */}
          {/* <FormInput description="Organisation" type="text" isDisabled={true} value={user.organisation}/>
          <FormInput description="Semester" type="text" isDisabled={true} value={user.sem}/>
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
              <div className="profile__items">
                <label>Vacate Room</label>
                <button disable={isVacating} onClick={() => vacantRoom(user.room[0].id)}>
                  {isVacating ? (
                    <PulseLoader color={"#0a138b"} size={10} />
                  ) : (
                    "Vacate"
                  )}
                </button>
              </div>
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
