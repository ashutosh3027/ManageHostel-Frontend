import { UserProvider } from "./context/userContext";
import { RoomProvider } from "./context/roomContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <RoomProvider>
      <App />
    </RoomProvider>
  </UserProvider>
);
