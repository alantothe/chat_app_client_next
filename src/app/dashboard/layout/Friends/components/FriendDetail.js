import React from "react";

function FriendDetail({ friend }) {
  return (
    <div className="flex my-3">
      <img
        src={friend.avatar}
        alt="Avatar"
        className="w-full h-full object-cover  w-12 h-12 rounded-full overflow-hidden"
      />
      <h1 className="ml-3 mt-2">{friend.firstName}</h1>
      <h1 className="ml-1 mt-2">{friend.lastName}</h1>
    </div>
  );
}

export default FriendDetail;
