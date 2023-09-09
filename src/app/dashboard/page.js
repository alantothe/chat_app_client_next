"use client";

import React from "react";
import SideUserBar from "./layout/SideUserbar/SideUserBar";
import MainSideBar from "./layout/MainSideBar/MainSideBar";
import ChatBox from "./layout/ChatBox/ChatBox";
import Friends from "./layout/Friends/Friends.js";
import { useSelector } from "react-redux";
import socket from "../../api/socket.js";

const Dashboard = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  socket.emit("event_test", { data: "hello server" });
  return (
    <div className="flex flex-row w-screen h-screen m-0">
      <div style={{ flexBasis: "4.166667%" }}>
        <SideUserBar loggedInUser={loggedInUser} />
      </div>

      <div
        className="border-r border-opacity-25 border-white"
        style={{ flexBasis: "20.833333%", borderRightWidth: "1px" }}
      >
        <MainSideBar />
      </div>

      <div
        className="border-l border-r border-opacity-25 border-white"
        style={{
          flexBasis: "58.333333%",
          borderLeftWidth: "0px",
          borderRightWidth: "1px",
        }}
      >
        <ChatBox />
      </div>

      <div
        className="border-l border-opacity-25 border-white"
        style={{ flexBasis: "16.666667%", borderLeftWidth: "0px" }}
      >
        <Friends />
      </div>
    </div>
  );
};

export default Dashboard;
