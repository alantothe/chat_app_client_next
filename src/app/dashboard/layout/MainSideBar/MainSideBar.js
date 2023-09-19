import React, { useState, useEffect } from "react";
import ConversationPreviewDetail from "./components/ConversationPreviewDetail";
import GroupConversationDetail from "./components/GroupConversationDetail";
import { Badge, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { seenBy } from "@/api/conversations/patchRequests";
import { fetchAllConversationById } from "@/api/conversations/getRequests";
import { fetchGroupConversationById } from "@/api/conversations/getRequests";
function MainSideBar({ entireUser, conversations, setChatOpen, group }) {
  const [activeConversationSeen, setActiveConversationSeen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeMode, setActiveMode] = useState("direct");
  const _id = useSelector((state) => state.user.loggedInUser?._id);

  const unreadGroup = useSelector(
    (state) => state.groupConversation.groupConversations
  );
  const unread = useSelector((state) => state.conversation.conversation);

  const conversationId = useSelector(
    (state) =>
      state.activeConversation?.allMessages?.messages[0]?.conversationId || ""
  );

  const unreadCount = unread
    ? unread.filter((conversation) => {
        return (
          conversation._id !== conversationId &&
          !conversation.lastSeenBy.includes(_id)
        );
      }).length
    : 0;

  const unreadGroupCount = unreadGroup
    ? unreadGroup.filter((conversation) => {
        return (
          conversation._id !== conversationId &&
          !conversation.lastSeenBy.includes(_id)
        );
      }).length
    : 0;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div
      className="h-full text-white flex-col items-center justify-center"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      <header className="flex justify-center h-24 relative">
        <input
          className="bg-zinc-800 placeholder-zinc-600 h-12 w-11/12 mt-7 mb-2 rounded"
          placeholder="    Search for Conversation ..."
        ></input>
        <div className="absolute bottom-0 left-0 right-0 w-11/12 mx-auto border-b border-white border-opacity-20"></div>
      </header>

      <div className="mt-3  flex justify-between mx-5 ">
        <Badge content={unreadCount} invisible={unreadCount === 0} withBorder>
          <Button
            className="button-class"
            onClick={() => {
              console.log("Direct Messages button clicked!");
              setActiveMode("direct");
            }}
          >
            Direct Messages
          </Button>
        </Badge>

        <Badge
          content={unreadGroupCount}
          invisible={unreadGroupCount === 0}
          withBorder
        >
          <Button
            className="button-class"
            onClick={() => {
              console.log("Group Message button clicked!");
              setActiveMode("group");
            }}
          >
            Group Message
          </Button>
        </Badge>
      </div>

      {activeMode === "direct" && conversations
        ? conversations.map((convo, index) => (
            <ConversationPreviewDetail
              entireUser={entireUser}
              setChatOpen={setChatOpen}
              conversation={convo}
              key={index}
            />
          ))
        : null}
      {activeMode === "group" && group
        ? group.map((convo, index) => (
            <GroupConversationDetail
              entireUser={entireUser}
              setChatOpen={setChatOpen}
              conversation={convo}
              key={index}
            />
          ))
        : null}
    </div>
  );
}

export default MainSideBar;
