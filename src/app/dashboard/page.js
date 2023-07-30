import React from "react";
import SideUserBar from "./layout/SideUserBar";
import MainSideBar from "./layout/MainSideBar";
import ChatBox from "./layout/ChatBox";
import Friends from "./layout/Friends";

const Dashboard = () => {
  return (
    <div className="flex flex-row w-screen h-screen m-0">
      <div className="w-1/12">
        <SideUserBar />
      </div>

      <div className="w-1/5">
        <MainSideBar />
      </div>

      <div className="w-8/12">
        <ChatBox />
      </div>

      <div className="w-1/5">
        <Friends />
      </div>
    </div>
  );
};

export default Dashboard;
