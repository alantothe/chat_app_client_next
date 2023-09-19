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
import { fetchGroupConversationByIdThunk } from "@/redux/features/groupConversations/groupConversationThunks";
import { getMessagesThunk } from "@/redux/features/messages/messageThunks";
import { seenBy } from "@/api/conversations/patchRequests";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [queryResults, setQueryResults] = useState([]);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const entireUser = useSelector((state) => state.user.entireUser);
  const conversations = useSelector((state) => state.conversation.conversation);
  const group = useSelector(
    (state) => state.groupConversation.groupConversations
  );
  const [lastUpdatedConversation, setLastUpdatedConversation] = useState(null);

  const [chatOpen, setChatOpen] = useState([]);

  const [messageForm, setMessageForm] = useState({
    members: [],
  });
  const conversationId = useSelector(
    (state) =>
      state.activeConversation?.allMessages?.messages[0]?.conversationId || ""
  );

  useEffect(() => {
    console.log(`conversationId updated to: ${conversationId}`);
    console.log(`ChatOpen updated to:`);
    console.log(chatOpen);
  }, [conversationId, chatOpen]);

  useEffect(() => {
    if (chatOpen && chatOpen.length > 0 && loggedInUser && loggedInUser._id) {
      // grab _id(s) from each user object in chatOpen
      let idsFromChatOpen = chatOpen.map((user) => user._id);

      //spread
      let membersArray = [...idsFromChatOpen, loggedInUser._id];
      if (Array.isArray(membersArray) && membersArray.length > 1) {
        dispatch(getMessagesThunk({ members: membersArray }));
      }

      setMessageForm({ members: membersArray });
    }
  }, [chatOpen, loggedInUser, lastUpdatedConversation]);

  useEffect(() => {
    if (loggedInUser?._id && !entireUser && !conversations) {
      console.log(group);
      dispatch(getUserByIdThunk(loggedInUser._id));
      dispatch(fetchAllConversationByIdThunk(loggedInUser._id));
      dispatch(fetchGroupConversationByIdThunk(loggedInUser._id));

      socket.emit("set-user", { data: loggedInUser._id });
    }
  }, [loggedInUser, entireUser, conversations]);
  //sockets
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
      console.log("Received a new message emit...");

      // check if logged-in user is a member of this conversation
      if (data.data.members.includes(loggedInUser._id)) {
        console.log("Logged-in user is in the members array");
        seenBy({ _id: loggedInUser._id, conversationId: data.data._id });

        // determine if the incoming message is from a direct chat or group chat
        if (data.data.members.length === 2) {
          // direct chat
          dispatch(fetchAllConversationByIdThunk(loggedInUser._id));
        } else if (data.data.members.length > 2) {
          // group chat
          dispatch(fetchGroupConversationByIdThunk(loggedInUser._id));
        }

        // if the chat is currently active for the logged-in user
        if (isActiveChatOpen(data.data._id)) {
          console.log(
            "Active chat is open. Updating seen status and fetching messages."
          );
          console.log({ _id: loggedInUser._id, conversationId: data.data._id });

          // fetch the latest messages if the chat is open
          dispatch(getMessagesThunk({ members: data.data.members }));
          // update the seen status for the receiver
          seenBy({ _id: loggedInUser._id, conversationId: data.data._id });
        }
        // if chat isn't active, then notify (e.g., via badge or similar)
        else {
          console.log("Chat isn't active. Notify the user.");
        }
      } else {
        console.log("Logged-in user is NOT in the members array.");
      }
    };
    const handleQueryResults = (conversations) => {
      setQueryResults(conversations);
    };

    const isActiveChatOpen = (incomingConversationId) => {
      // if the current chat open is the same as the incoming message's conversation
      return conversationId === incomingConversationId;
    };

    socket.on("friend request accepted", handleAccept);

    socket.on("friend request sent", handleFriendRequest);

    socket.on("message sent", handleNewMessage);

    socket.on("searchResults", handleQueryResults);

    // remove the listener when the component unmounts
    return () => {
      socket.off("friend request sent", handleFriendRequest);
      socket.off("friend request accepted", handleAccept);
      socket.off("message sent", handleNewMessage);
    };
  }, [loggedInUser, conversationId, , dispatch]);

  return (
    <div className="flex flex-row w-screen h-screen m-0">
      <div style={{ flexBasis: "4.166667%" }}>
        <SideUserBar setChatOpen={setChatOpen} entireUser={entireUser} />
      </div>

      <div
        className="border-r border-opacity-25 border-white"
        style={{ flexBasis: "20.833333%", borderRightWidth: "1px" }}
      >
        <MainSideBar
          queryResults={queryResults}
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
