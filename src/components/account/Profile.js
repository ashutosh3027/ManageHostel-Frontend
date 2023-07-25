import React, { useState } from "react";
import "./../../assets/css/profile.css";
import { useUser } from "./../../context/userContext";
import Spinner from "./../Spinner";
import PulseLoader from "react-spinners/PulseLoader";
import authServices from "../../services/authServices";
import roomServices from "../../services/roomServices";
import { toast } from "react-toastify";
import userServices from '../../services/userServices'
export default function Profile() {
  const { userData: user, updateUserData } = useUser();
  const [isSending, setIsSending] = useState(false);
  const [isVacating, setIsVacating] = useState(false);
  const [isEditingCollege, setIsEditingCollege] = useState(false);
  const [editedCollege, setEditedCollege] = useState("");
  var dateOfAllotment;

  if (!user) return <Spinner loading={!user} size={100} />;
  if (user) {
    dateOfAllotment = new Date(user.roomAllotedAt);
  }
  console.log(user)

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
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true,
        });
      });
  };

  const vacantRoom = async (roomId) => {
    setIsVacating(true);
    try {
      await roomServices.vacantRoom(roomId);
      setIsVacating(false);
      updateUserData();
      toast.success("Room Vacated Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        draggable: true
      });
    } catch (error) {
      setIsVacating(false);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        draggable: true,
      });
    }
  };
  const handleEditCollege = () => {
    setIsEditingCollege(true);
    setEditedCollege(user.college);
  };

  const handleSaveCollege = () => {
    setIsEditingCollege(false);
    (async () => {
      try {

        const data = await userServices.updateCollege(editedCollege.trim());
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          draggable: true
        });

      } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          draggable: true,
        });
      }

    })()
    const updatedUser = { ...user, college: editedCollege };

    // updateUserData();
    // // Update college name in the database using an API call
    // authServices.updateCollegeName(user.id, editedCollege)
    //   .then((data) => {
    //     toast.success("College Name Updated Successfully.");
    //   })
    //   .catch((error) => {
    //     toast.error("Failed to update college name.");
    //   });
  };


  return (
    <div className="profile__section">
      <div className="profile__container">
        <div className="profile__photo"></div>
        <div className="userData">
          <FormInput description="Name" type="text" isDisabled={true} value={user.name} />
          <FormInput description="Email" type="text" isDisabled={true} value={user.email} />

          {/* Additional FormInput fields for Organisation, Semester, Section, Branch */}
          {/* <FormInput description="Organisation" type="text" isDisabled={true} value={user.organisation}/>
          <FormInput description="Semester" type="text" isDisabled={true} value={user.sem}/>
          <FormInput description="Section" type="text" isDisabled={true} value={user.sec}/>
          <FormInput description="Branch" type="text" isDisabled={true} value={user.branch}/> */}

          <div className="profile__items">
            <label>Password</label>
            <button disabled={isSending} onClick={resetPassword}>
              {isSending ? <PulseLoader color={"#0a138b"} size={10} /> : "Reset password by email"}
            </button>
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
              <FormInput
                description="Room Type"
                type="text"
                isDisabled={true}
                value={user.room[0].roomType}
              />
              <FormInput
                description="Building Name"
                type="text"
                isDisabled={true}
                value={user.buildingId.buildingName}
              />
              <div className="profile__items">
                <label>Vacate Room</label>
                <button disabled={isVacating} onClick={() => vacantRoom(user.room[0].id)}>
                  {isVacating ? <PulseLoader color={"#0a138b"} size={10} /> : "Vacate"}
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
          <FormInput
            description="College Name"
            type="text"
            isDisabled={!isEditingCollege}
            value={isEditingCollege ? editedCollege : user.collegeName || ""}
            placeholder="Enter College Name"
            onChange={(event) => setEditedCollege(event.target.value)}
          />
          <div className="profile__items cllgBtn">
            {isEditingCollege ? (
              <>
                <button onClick={handleSaveCollege}>Save</button>
                <button onClick={() => setIsEditingCollege(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditCollege} className="">Edit College Name</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const FormInput = (props) => {
  return (
    <div className="profile__items">
      <label>{props.description}</label>
      {props.isDisabled ? (
        <input
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={props.value}
          disabled={props.isDisabled}
        />
      ) : (
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          disabled={props.isDisabled}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};
