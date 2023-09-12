import React from "react";
import FriendDetail from "./components/FriendDetail";

function Friends({ entireUser }) {
  console.log("From Friends Components");
  console.log(entireUser);

  const arrayOfFriends = entireUser.detailedFriends;

  console.log(arrayOfFriends);

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
          {arrayOfFriends.map((friend, index) => (
            <FriendDetail friend={friend} key={index} />
          ))}
        </div>
        <div className="flex-grow overflow-auto">
          <h2>Offline - (12)</h2>
        </div>
      </div>
    </div>
  );
}

export default Friends;
