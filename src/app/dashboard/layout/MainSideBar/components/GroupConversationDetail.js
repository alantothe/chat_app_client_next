import React, { use } from "react";
import { seenBy } from "@/api/conversations/patchRequests";
import { fetchGroupConversationByIdThunk } from "@/redux/features/groupConversations/groupConversationThunks";
import { fetchAllConversationByIdThunk } from "@/redux/features/conversations/conversationThunks";
import { useDispatch } from "react-redux";
function GroupConversationDetail({
  conversation,
  setChatOpen,
  entireUser,
  isLast,
}) {
  const dispatch = useDispatch();
  const { detailedMembers = [], detailedLastMessageFrom = [] } = conversation;
  let loggedInId = entireUser ? entireUser._id : null;

  const getCombinedFirstNames = (members, maxLength) => {
    const names = members.map((member) => member.firstName).join(", ");
    return truncate(names, maxLength);
  };

  const handleConversationClick = () => {
    const updatedSeenByForm = {
      _id: loggedInId,
      conversationId: conversation._id,
    };

    // send the seenBy request
    seenBy(updatedSeenByForm);

    // set the chat as open
    setChatOpen(filteredDetailedMembers);

    dispatch(fetchGroupConversationByIdThunk(loggedInId));
  };
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
    <div
      onClick={() => {
        handleConversationClick();
      }}
      className={`flex mx-6 my-4 pb-3 ${
        !isLast ? "border-b border-white border-opacity-20" : ""
      }`}
    >
      <img
        src={groupAvatar}
        alt="Avatar"
        className="object-cover  w-12 h-12 rounded-full overflow-hidden"
      />
      <div className="flex-col ml-3 mt-1">
        <h1 className="text-xl">
          {getCombinedFirstNames(filteredDetailedMembers, 19)}
        </h1>
        <p className=" text-sm text-zinc-700">
          {" "}
          {detailedLastMessageFrom[0].firstName}:{" "}
          {truncate(conversation.lastMessage, 23)}
        </p>
      </div>
    </div>
  );
}

export default GroupConversationDetail;
