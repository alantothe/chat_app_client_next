import React from "react";
import { fetchAllConversationByIdThunk } from "@/redux/features/conversations/conversationThunks";
import { useDispatch } from "react-redux";
import { seenBy } from "@/api/conversations/patchRequests";

function ConversationPreviewDetail({
  conversation,
  setChatOpen,
  entireUser,
  isLast,
}) {
  const dispatch = useDispatch();
  const { detailedMembers = [], detailedLastMessageFrom = [] } = conversation;
  let loggedInId = entireUser ? entireUser._id : null;
  console.log("Detailed Message From");
  console.log(detailedLastMessageFrom);
  const handleConversationClick = () => {
    const updatedSeenByForm = {
      _id: loggedInId,
      conversationId: conversation._id,
    };
    console.log(updatedSeenByForm);

    // set the chat as open
    setChatOpen(filteredDetailedMembers);

    // send the seenBy request

    seenBy(updatedSeenByForm);
    //refetch status

    dispatch(fetchAllConversationByIdThunk(loggedInId));
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
      className={`flex mx-6 my-4 pb-3 ${
        !isLast ? "border-b border-white border-opacity-20" : ""
      }`}
    >
      {/* Avatars Display */}
      {filteredDetailedMembers.map((member, index) => (
        <img
          key={index}
          src={member.avatar}
          alt="Avatar"
          className="object-cover w-12 h-12 rounded-full overflow-hidden mr-2"
        />
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
          {detailedLastMessageFrom[0].firstName}:{" "}
          {truncate(conversation.lastMessage, 23)}
        </p>
      </div>
    </div>
  );
}

export default ConversationPreviewDetail;
