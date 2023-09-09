"use client";

import React, { useState } from "react";
import Button from "@/app/utils/components/Button.js";

function MainSideBar(props) {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const conversation = "Conversation";

  return (
    <div
      className="h-full text-white flex-col items-center justify-center"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      <header className="flex justify-center h-24 relative">
        <input
          className="bg-zinc-800 placeholder-zinc-600 h-12 w-11/12 mt-7 mb-2 rounded"
          placeholder="    Serach for Conversation ..."
        ></input>
        <div className="absolute bottom-0 left-0 right-0 w-11/12 mx-auto border-b border-white border-opacity-20"></div>
      </header>

      <div className="mt-3  flex justify-between mx-5 ">
        <Button text={"Direct Messages"} />
        <Button text={"Group Message"} />
      </div>
    </div>
  );
}

export default MainSideBar;
