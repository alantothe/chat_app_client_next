import React from "react";
import { seenBy } from "@/api/conversations/patchRequests";
function GroupConversationDetail({ conversation, setChatOpen, entireUser }) {
  const { detailedMembers = [] } = conversation;
  let loggedInId = entireUser ? entireUser._id : null;

  const handleConversationClick = () => {
    const updatedSeenByForm = {
      _id: loggedInId,
      conversationId: conversation._id,
    };

    // send the seenBy request
    seenBy(updatedSeenByForm);

    // set the chat as open
    setChatOpen(filteredDetailedMembers);
  };
  const filteredDetailedMembers = detailedMembers.filter(
    (member) => member._id !== loggedInId
  );

  // truncate the string
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + " ...";
  };

  return (
    <div
      onClick={() => {
        handleConversationClick();
      }}
      className="flex mx-6 my-4"
    >
      <img
        src={filteredDetailedMembers[0].avatar}
        alt="Avatar"
        className="object-cover  w-16 h-16 rounded-full overflow-hidden"
      />
      <div className="flex-col ml-3 mt-1">
        <div className="flex">
          <h1 className="text-xl">{filteredDetailedMembers[0].firstName}</h1>
          <h1 className="ml-2 text-xl">
            {filteredDetailedMembers[0].lastName}
          </h1>
        </div>
        <p className=" text-sm text-zinc-700">
          {" "}
          {truncate(conversation.lastMessage, 23)}
        </p>
      </div>
    </div>
  );
}

export default GroupConversationDetail;
