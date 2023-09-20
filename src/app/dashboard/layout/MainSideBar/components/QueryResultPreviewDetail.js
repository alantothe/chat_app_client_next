import React from "react";

function QueryResultPreviewDetail({ queryResults, setChatOpen, entireUser }) {
  const { detailedMembers } = queryResults;
  let loggedInId = entireUser ? entireUser._id : null;

  const filteredDetailedMembers = detailedMembers.filter(
    (member) => member._id !== loggedInId
  );

  const groupAvatar =
    "https://res.cloudinary.com/dzjr3skhe/image/upload/v1695169933/user-group-296_dpyuzx.svg";

  // truncate the string
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + " ...";
  };

  return (
    <div>
      {/* Avatars Display */}
      {filteredDetailedMembers.map((member, index) => (
        <div className="flex">
          <img
            key={index}
            src={member.avatar}
            alt="Avatar"
            className="object-cover w-16 h-16 rounded-full overflow-hidden mr-2"
          />
        </div>
      ))}

      <div className="flex-col ml-3 mt-1">
        <div className="flex">
          <h1 className="text-xl">
            {filteredDetailedMembers
              .map((member) => member.firstName)
              .join(", ")}
          </h1>
          <h1 className="ml-2 text-xl">
            {filteredDetailedMembers
              .map((member) => member.lastName)
              .join(", ")}
          </h1>
        </div>
        <p className=" text-sm text-zinc-700">
          {truncate(queryResults.lastMessage, 23)}
        </p>
      </div>
    </div>
  );
}
export default QueryResultPreviewDetail;
