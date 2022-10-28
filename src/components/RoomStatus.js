import React from "react";
import "./../assets/css/roomstatus.css";
import rightArrow from "./../assets/images/rightArrow.svg";
import { useRoom } from "./../context/roomContext";
import { useNavigate } from "react-router-dom";

export default function RoomStatus() {

  const navigate = useNavigate();
  const { allRooms } = useRoom();
  return (
    <div className="wrapper">
      {allRooms.map((el) => {
        return (
          <Card
            roomNumber={el.roomNumber}
            vacant={!el.isAllocated}
            activeRequests={el.requests.length}
            id={el.id}
          />
        );
      })}
    </div>
  );
}

function Card(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/roomStatus/${props.id}`);
    console.log(props);
  };
  return (
    <div className="card">
      <div className="card__img">{props.roomNumber}</div>
      <div className="card__body">
        <p className="card__content">
          Vacant:{" "}
          <span class="card__innerText">{props.vacant ? "Yes" : "No"}</span>
        </p>
        {props.vacant ? (
          <p className="card__content">
            Request: <span class="card__innerText">{props.activeRequests}</span>
          </p>
        ) : null}
        <button className={`card__btn ${props.id}`} onClick={handleClick}>
          {" "}
          <i class="fa fa-chevron-right"></i> More detail
        </button>
      </div>
    </div>
  );
}
