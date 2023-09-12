import React from "react";

function FriendRequestDetail({ request }) {
  console.log("from the request detail");
  const { requesterId } = request;

  return (
    <div className="flex my-3">
      <img
        src={requesterId.avatar}
        alt="Avatar"
        className="object-cover  w-12 h-12 rounded-full overflow-hidden"
      />
      <h1 className="ml-3 mt-2">{requesterId.firstName}</h1>
      <h1 className="ml-1 mt-2">{requesterId.lastName}</h1>
    </div>
  );
}

export default FriendRequestDetail;
