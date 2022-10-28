import React, { useEffect, useState } from "react";
import requestServices from "../services/requestServices";
import "./../assets/css/requestStatus.css";
export default function RequestStatus() {
  const [REQUESTS, setRequests] = useState([]);
  const getRequest = async () => {
    const { data } = await requestServices.getRequests(true);
    setRequests(data.requests);
  };
  useEffect(() => {
    getRequest();
  }, []);

  let displayedRequests = REQUESTS;

  function searchHandler(event) {
    let searcjQery = event.target.value.toLowerCase();
      displayedRequests = REQUESTS.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searcjQery) !== -1;
      });
  }

  let requests = displayedRequests;
  console.log(requests);

  const handleAccept = async (id) => {
    const data = await requestServices.updateRequest(id, true);
    getRequest();
    console.log(data);
  };

  const handleReject = async (id) => {
    const data = await requestServices.updateRequest(id, false);
    getRequest();
    console.log(data);
  };

  return (
    <div className="holder">
      <input type="text" className="search" onChange={searchHandler} />
      <ul className="requestUl">
        {requests.map((el) => {
          console.log(el);
          return (
            <li
              className="requestLi"
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="image">
                <i
                  className="fas fa-user-circle"
                  style={{ fontSize: "36px" }}
                ></i>
              </div>
              <div className="info1">
                <div className="name">
                  <p>{el.user.name}</p>
                </div>
                <div className="room-number">
                  <p>{el.room.roomNumber}</p>
                </div>
                <div className="date">
                  <p>{`${el.requestedAt.slice(8, 10)}/${el.requestedAt.slice(
                    5,
                    7
                  )}/${el.requestedAt.slice(0, 4)}`}</p>
                </div>
              </div>
              <div className="button">
                <div className="accept">
                  <button
                    className={`btn ${el.id}`}
                    onClick={() => {
                      handleAccept(el.id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
              <div className="button">
                <div className="reject">
                  <button className="btn" onClick={() => handleReject(el.id)}>
                    Reject
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// const Request = (props) => {
//   return (
//     <>
//       <li className="requestLi">
//         <i className="fas fa-user-circle" style={{ fontSize: "36px" }}></i>
//         <div>
//           <div className="date"></div>
//           <div>
//             <p>{props.requestedAt}</p>
//             <p>{props.name}</p>
//           </div>
//         </div>
//       </li>
//     </>
//   );
// };
