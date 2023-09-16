import React, { useState } from "react";
import ConversationPreviewDetail from "./components/ConversationPreviewDetail";

function MainSideBar({ entireUser, conversations, setChatOpen }) {
  const [message, setMessage] = useState("");
  const [activeMode, setActiveMode] = useState("direct");

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
        <button
          className="button-class"
          onClick={() => {
            console.log("Direct Messages button clicked!");
            setActiveMode("direct");
          }}
        >
          Direct Messages
        </button>
        <button
          className="button-class"
          onClick={() => {
            console.log("Group Message button clicked!");
            setActiveMode("group");
          }}
        >
          Group Message
        </button>
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
      {activeMode === "group" && <div>Group convos here</div>}
    </div>
  );
}

export default MainSideBar;
