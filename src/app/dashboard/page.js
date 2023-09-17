"use client";

import { useEffect, useState } from "react";
import SideUserBar from "./layout/SideUserbar/SideUserBar";
import MainSideBar from "./layout/MainSideBar/MainSideBar";
import ChatBox from "./layout/ChatBox/ChatBox";
import Friends from "./layout/Friends/Friends.js";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../api/socket.js";
import { getUserByIdThunk } from "../../redux/features/user/userThunks";
import { fetchAllConversationByIdThunk } from "@/redux/features/conversations/conversationThunks";
import { getMessagesThunk } from "@/redux/features/messages/messageThunks";
import { fetchGroupConversationByIdThunk } from "@/redux/features/groupConversations/groupConversationThunks";
const Dashboard = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const entireUser = useSelector((state) => state.user.entireUser);
  const conversations = useSelector((state) => state.conversation.conversation);
  const group = useSelector(
    (state) => state.groupConversation.groupConversations
  );
  const [lastUpdatedConversation, setLastUpdatedConversation] = useState(null);

  const [chatOpen, setChatOpen] = useState(null);
  const [messageForm, setMessageForm] = useState({
    members: [],
  });

  useEffect(() => {
    if (chatOpen) {
      let membersArray = [chatOpen._id, loggedInUser._id];

      // use the newly created array for dispatch
      if (Array.isArray(membersArray) && membersArray.length > 1) {
        dispatch(getMessagesThunk({ members: membersArray }));
      }

      // update the state
      setMessageForm({ members: membersArray });
    }
  }, [chatOpen, lastUpdatedConversation]);

  useEffect(() => {
    if (loggedInUser?._id && !entireUser && !conversations) {
      console.log(group);
      dispatch(getUserByIdThunk(loggedInUser._id));
      dispatch(fetchAllConversationByIdThunk(loggedInUser._id));
      dispatch(fetchGroupConversationByIdThunk(loggedInUser._id));

      socket.emit("hello from client", { data: loggedInUser._id });
    }
  }, [loggedInUser, entireUser, conversations]);

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
    const handleNewMessage = (data) => {
      console.log(data.data.members);
      if (
        Array.isArray(data.data.members) &&
        data.data.members.includes(loggedInUser._id)
      ) {
        console.log("Logged-in user is in the members array");
        dispatch(fetchAllConversationByIdThunk(loggedInUser._id));

        // Update the lastUpdatedConversation state
        dispatch(getMessagesThunk({ members: data.data.members }));
        setLastUpdatedConversation(data.data._id);
        console.log(data.data._id);
      }
    };

    socket.on("friend request accepted", handleAccept);

    socket.on("friend request sent", handleFriendRequest);

    socket.on("message sent", handleNewMessage);

    // remove the listener when the component unmounts
    return () => {
      socket.off("friend request sent", handleFriendRequest);
      socket.off("friend request accepted", handleAccept);
      socket.off("message sent", handleNewMessage);
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
        <MainSideBar
          setChatOpen={setChatOpen}
          conversations={conversations}
          entireUser={entireUser}
          group={group}
        />
      </div>

      <div
        className="border-l border-r border-opacity-25 border-white"
        style={{
          flexBasis: "58.333333%",
          borderLeftWidth: "0px",
          borderRightWidth: "1px",
        }}
      >
        <ChatBox chatOpen={chatOpen} entireUser={entireUser} />
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
