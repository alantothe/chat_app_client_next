import React from "react";
import UserProfile from "@/components/UserProfile";

function Friends() {
  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      <header className="w-full h-24 flex items-center justify-center relative">
        <h1>Contacts</h1>
        <div className=""></div>
      </header>
      <div className="flex-grow p-5 flex flex-col overflow-hidden">
        <div className="flex-grow overflow-auto">
          <h2>Online - (8)</h2>
        </div>
        <div className="flex-grow overflow-auto">
          <h2>Offline - (12)</h2>
        </div>
      </div>
    </div>
  );
}

export default Friends;
