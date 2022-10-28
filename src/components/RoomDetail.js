// import React from 'react'
// import roomImg from './../assets/images/roomDetail.jpg';
// export default function RoomDetail() {
//   return (
//     <div>
//       <div class="roomContainer">
//         <img src={roomImg} className="" alt="" />
//       </div>
//       <h2>Requests List</h2>

//       {/* <div className="holder">
//         <input type="text" className="search" onChange={searchHandler} />
//         <ul className="requestUl">
//           {requests.map((el) => {
//             console.log(el);
//             return (
//               <li
//                 className="requestLi"
//                 style={{
//                   display: "flex",
//                   gap: "1rem",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <div className="image">
//                   <i
//                     className="fas fa-user-circle"
//                     style={{ fontSize: "36px" }}
//                   ></i>
//                 </div>
//                 <div className="info1">
//                   <div className="name">
//                     <p>{el.user.name}</p>
//                   </div>
//                   <div className="room-number">
//                     <p>{el.room.roomNumber}</p>
//                   </div>
//                   <div className="date">
//                     <p>{`${el.requestedAt.slice(8, 10)}/${el.requestedAt.slice(
//                       5,
//                       7
//                     )}/${el.requestedAt.slice(0, 4)}`}</p>
//                   </div>
//                 </div>
//                 <div className="button">
//                   <div className="accept">
//                     <button className="btn" onClick={handleAccept}>
//                       Accept
//                     </button>
//                   </div>
//                 </div>
//                 <div className="button">
//                   <div className="reject">
//                     <button className="btn" onClick={handleReject}>
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div> */}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import roomServices from "./../services/roomServices";
import requestServices from "./../services/requestServices";
import "./../assets/css/requestStatus.css";
import {useParams} from "react-router-dom";
export default function RoomDetail() {
  const [REQUESTS, setRequests] = useState([]);
  const {id}= useParams();
  console.log(id);
  useEffect(() => {
    const getRequest = async () => {
      const { data } = await roomServices.getRoomById(id);
      console.log(data)
      setRequests(data.requests);
    };
    getRequest();
  }, []);
  
  let displayedRequests = REQUESTS;
  
  function searchHandler(event) {
    let searcjQery = event.target.value.toLowerCase(),
      displayedRequests = REQUESTS.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searcjQery) !== -1;
      });
  }
  
  let requests = displayedRequests;
  console.log(requests);
  
  const handleAccept = async (id, requestStatus) => {
     const data= await requestServices.updateRequest(id, true);
     console.log(data);
  }
  
  const handleReject = () => {
    
  }
  
  return (
    <div className="holder">
      <input type="text" className="search" onChange={searchHandler} />
      <ul className="requestUl">
        {requests.map((el) => {
            console.log(el);
          return (
            <li className="requestLi" style={{ display: "flex", gap: "1rem" , alignItems: "center" , justifyContent: "center"}}>
                <div className="image">
                  <i className="fas fa-user-circle" style={{ fontSize: "36px" }}></i>
                </div>
                <div className="info1">
                    <div className="name">
                        <p>{el.user.name}</p>
                    </div>
                    <div className="room-number">
                        <p>{el.room.roomNumber}</p>
                    </div>
                    <div className="date">
                        <p>{`${el.requestedAt.slice(8 , 10)}/${el.requestedAt.slice(5 , 7)}/${el.requestedAt.slice(0 , 4)}`}</p>
                     
                    </div>
                </div>
                <div className="button">
                  <div className="accept">
                    <button className={`btn ${el.id}`} onClick={()=>{handleAccept(el.id, el.requestStatus)}}>
                      Accept
                    </button>
                  </div>
                </div>
                <div className="button">
                  <div className="reject">
                    <button className="btn" onClick={handleReject}>
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

const Request = (props) => {
  return (
    <>
      <li className="requestLi">
        <i className="fas fa-user-circle" style={{ fontSize: "36px" }}></i>
        <div>
           <div className="date">
           </div>
           <div >
                <p>{props.requestedAt}</p>
               <p>{props.name}</p>
           </div>
        </div>
      </li>
    </>
  );
};