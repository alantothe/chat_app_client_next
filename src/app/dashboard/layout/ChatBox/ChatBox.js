"use client";
import React, { useState, createElement } from "react";
import SendIcon from "@/assets/svg/send";
import { UsersIcon } from "@heroicons/react/24/outline";

function ChatBox({ chatOpen }) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  console.log(chatOpen);

  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      {chatOpen ? (
        <>
          <header className="h-24 relative flex-shrink-0">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <img
                src={chatOpen.avatar}
                alt="Avatar"
                className="object-cover  w-12 h-12 rounded-full overflow-hidden"
              />
              <h1 className="ml-3 mt-2">{chatOpen.firstName}</h1>
              <h1 className="ml-1 mt-2">{chatOpen.lastName}</h1>
            </div>
            <div
              style={{ width: "95%" }}
              className="mx-auto absolute bottom-0 left-0 right-0 border-b border-white border-opacity-20"
            ></div>
          </header>

          <div className="overflow-y-auto flex-grow flex items-center justify-center">
            {createElement(UsersIcon, {
              className: "h-28 w-28 text-zinc-200 opacity-10",
            })}
          </div>
        </>
      ) : (
        <>
          <header className="h-24 relative flex-shrink-0">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <h1>Welcome! Start a Conversation By Selecting a Friend</h1>
            </div>
            <div
              style={{ width: "95%" }}
              className="mx-auto absolute bottom-0 left-0 right-0 border-b border-white border-opacity-20"
            ></div>
          </header>

          <div className="overflow-y-auto flex-grow flex items-center justify-center">
            {createElement(UsersIcon, {
              className: "h-28 w-28 text-zinc-200 opacity-10",
            })}
          </div>
        </>
      )}

      {/* Chat Input Below */}
      <footer className="flex w-full px-5 justify-center flex-shrink-0 mb-5">
        <div className="relative w-full px-3 h-12">
          <input
            value={message}
            onChange={handleChange}
            className={`w-full rounded py-2 bg-zinc-900 h-full pl-3 pr-12 placeholder-zinc-700 text-white mb-5`}
            placeholder="Message ..."
          />
          <div className="absolute inset-y-0 right-6 flex items-center">
            <SendIcon
              className={`h-5 w-5 ${
                message ? "text-zinc-200" : "text-zinc-700"
              }`}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ChatBox;
