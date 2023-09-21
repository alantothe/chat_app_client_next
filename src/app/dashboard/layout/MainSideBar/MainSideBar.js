import socket from "@/api/socket";
import { useSelector } from "react-redux";
import { Badge, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import GroupConversationDetail from "./components/GroupConversationDetail";
import QueryResultPreviewDetail from "./components/QueryResultPreviewDetail";
import ConversationPreviewDetail from "./components/ConversationPreviewDetail";
function MainSideBar({
  entireUser,
  conversations,
  setChatOpen,
  group,
  queryResults,
}) {
  const [activeConversationSeen, setActiveConversationSeen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      handleSearch(value);
    } else {
      // Emit an event to the server to clear the search results
      socket.emit("clearSearch");

      // clear local search results
    }
  };

  const handleSearch = (searchTerm) => {
    socket.emit("search", searchTerm);
  };

  useEffect(() => {
    if (queryResults.length === 0) {
      setActiveMode("direct");
    } else {
      setActiveMode("query");
    }
    console.log(queryResults);
  }, [queryResults]);

  function renderConversations(conversations) {
    return conversations.map((convo, index) => (
      <ConversationPreviewDetail
        entireUser={entireUser}
        setChatOpen={setChatOpen}
        conversation={convo}
        isLast={index === conversations.length - 1}
        key={index}
      />
    ));
  }

  function renderGroupConversations(group) {
    return group.map((convo, index) => (
      <GroupConversationDetail
        entireUser={entireUser}
        setChatOpen={setChatOpen}
        conversation={convo}
        isLast={index === group.length - 1}
        key={index}
      />
    ));
  }

  return (
    <div
      className="h-full text-white flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "rgb(18, 18, 22)", width: "350px" }}
    >
      <header className="flex justify-center h-24 relative">
        <input
          className="bg-zinc-800 placeholder-zinc-600 h-12 w-11/12 mt-7 mb-2 rounded outline-none pl-4"
          placeholder="Search for Conversation ..."
          value={searchTerm}
          onChange={handleChange}
        ></input>
        <div className="absolute bottom-0 left-0 right-0 w-11/12 mx-auto border-b border-white border-opacity-20"></div>
      </header>

      {activeMode === "query" ? (
        queryResults.map((convo, index) => (
          <QueryResultPreviewDetail
            entireUser={entireUser}
            setChatOpen={setChatOpen}
            queryResults={convo}
            key={index}
          />
        ))
      ) : (
        <div className="pt-2">
          <div className="mt-3  flex justify-between mx-5 mb-7">
            <Badge
              content={unreadCount}
              invisible={unreadCount === 0}
              withBorder
            >
              <button
                onClick={() => {
                  console.log("Direct Messages button clicked!");
                  setActiveMode("direct");
                }}
                class="bg-zinc-800 text-white font-thin py-4 px-5  text-sm rounded shadow"
              >
                Direct Messages
              </button>
            </Badge>

            <Badge
              content={unreadGroupCount}
              invisible={unreadGroupCount === 0}
              withBorder
            >
              <button
                onClick={() => {
                  console.log("Group Message button clicked!");
                  setActiveMode("group");
                }}
                class="bg-zinc-800 text-white font-thin py-4 px-5  text-sm rounded shadow"
              >
                Group Message
              </button>
            </Badge>
          </div>

          {activeMode === "direct" && conversations
            ? renderConversations(conversations)
            : null}
          {activeMode === "group" && group
            ? renderGroupConversations(group)
            : null}
        </div>
      )}
    </div>
  );
}

export default MainSideBar;
