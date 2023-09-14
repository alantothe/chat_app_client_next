"use client";

import { useEffect, useState } from "react";
import SideUserBar from "./layout/SideUserbar/SideUserBar";
import MainSideBar from "./layout/MainSideBar/MainSideBar";
import ChatBox from "./layout/ChatBox/ChatBox";
import Friends from "./layout/Friends/Friends.js";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../api/socket.js";
import { getUserByIdThunk } from "../../redux/features/user/userThunks";

const Dashboard = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const entireUser = useSelector((state) => state.user.entireUser);
  const [chatOpen, setChatOpen] = useState(null);
  useEffect(() => {
    if (loggedInUser?._id && !entireUser) {
      dispatch(getUserByIdThunk(loggedInUser._id));
      socket.emit("hello from client", { data: loggedInUser._id });
    }
  }, [loggedInUser, entireUser]);

  useEffect(() => {
    const handleFriendRequest = (data) => {
      if (data.data === loggedInUser._id) {
        console.log("lets refresh!");
        dispatch(getUserByIdThunk(loggedInUser._id));
      }
    };
    const handleAccept = (data) => {
      if (data.data === loggedInUser._id) {
        console.log("lets refresh!");
        dispatch(getUserByIdThunk(loggedInUser._id));
      }
    };

    socket.on("friend request accepted", handleAccept);

    socket.on("friend request sent", handleFriendRequest);

    // remove the listener when the component unmounts
    return () => {
      socket.off("friend request sent", handleFriendRequest);
      socket.off("friend request accepted", handleAccept);
    };
  }, [loggedInUser, dispatch]);

  return (
    <div className="flex flex-row w-screen h-screen m-0">
      <div style={{ flexBasis: "4.166667%" }}>
        <SideUserBar entireUser={entireUser} />
      </div>

      <div
        className="border-r border-opacity-25 border-white"
        style={{ flexBasis: "20.833333%", borderRightWidth: "1px" }}
      >
        <MainSideBar entireUser={entireUser} />
      </div>

      <div
        className="border-l border-r border-opacity-25 border-white"
        style={{
          flexBasis: "58.333333%",
          borderLeftWidth: "0px",
          borderRightWidth: "1px",
        }}
      >
        <ChatBox chatOpen={chatOpen} />
      </div>

      <div
        className="border-l border-opacity-25 border-white"
        style={{ flexBasis: "16.666667%", borderLeftWidth: "0px" }}
      >
        <Friends setChatOpen={setChatOpen} entireUser={entireUser} />
      </div>
    </div>
  );
};

export default Dashboard;
