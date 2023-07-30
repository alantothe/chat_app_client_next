"use client";

import React, { useState } from "react";
import SendIcon from "@/assets/svg/send";

function ChatBox(props) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div className="h-full bg-zinc-800 text-white flex flex-col">
      <header className="h-1/5 flex-shrink-0"></header>
      <div className="overflow-y-auto flex-grow">{/* Messages go here */}</div>
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
