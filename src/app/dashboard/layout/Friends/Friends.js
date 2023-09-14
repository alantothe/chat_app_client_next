import React from "react";
import FriendDetail from "./components/FriendDetail";

function Friends({ entireUser, setChatOpen }) {
  const { detailedFriends = [] } = entireUser; // Default to empty array if undefined (edge case?)

  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      <header className="w-full h-24 flex items-center justify-center relative">
        <h1>Contacts({detailedFriends.length})</h1>
        <div className=""></div>
      </header>
      <div className="flex-grow p-5 flex flex-col overflow-hidden">
        <div className="flex-grow overflow-auto">
          <h2>Online - ()</h2>
          {detailedFriends &&
            detailedFriends.length > 0 &&
            detailedFriends.map((friend, index) => (
              <FriendDetail
                setChatOpen={setChatOpen}
                friend={friend}
                key={index}
              />
            ))}
        </div>
        <div className="flex-grow overflow-auto">
          <h2>Offline - ()</h2>
        </div>
      </div>
    </div>
  );
}

Friends.defaultProps = {
  entireUser: {},
};

export default Friends;
