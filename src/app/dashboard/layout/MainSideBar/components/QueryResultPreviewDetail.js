import React from "react";
import { seenBy } from "@/api/conversations/patchRequests";
import { fetchGroupConversationByIdThunk } from "@/redux/features/groupConversations/groupConversationThunks";
import { fetchAllConversationByIdThunk } from "@/redux/features/conversations/conversationThunks";
import { useDispatch } from "react-redux";

function QueryResultPreviewDetail({ queryResults, setChatOpen, entireUser }) {
  const dispatch = useDispatch();
  const { detailedMembers } = queryResults;
  let loggedInId = entireUser ? entireUser._id : null;

  const handleConversationClick = () => {
    const updatedSeenByForm = {
      _id: loggedInId,
      conversationId: queryResults._id,
    };

    // send the seenBy request
    seenBy(updatedSeenByForm);

    // set the chat as open
    setChatOpen(filteredDetailedMembers);

    dispatch(fetchGroupConversationByIdThunk(loggedInId));
    dispatch(fetchAllConversationByIdThunk(loggedInId));
  };

  const filteredDetailedMembers = detailedMembers.filter(
    (member) => member._id !== loggedInId
  );

  const groupAvatar =
    "https://res.cloudinary.com/dzjr3skhe/image/upload/v1695169933/user-group-296_dpyuzx.svg";

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
      {/* Group Avatar Display if more than one member */}
      {filteredDetailedMembers.length > 1 ? (
        <img
          src={groupAvatar}
          alt="Group Avatar"
          className="object-cover w-16 h-16 rounded-full overflow-hidden mr-2"
        />
      ) : (
        // Individual Avatars Display
        filteredDetailedMembers.map((member, index) => (
          <div key={index} className="flex">
            <img
              src={member.avatar}
              alt="Avatar"
              className="object-cover w-16 h-16 rounded-full overflow-hidden mr-2"
            />
          </div>
        ))
      )}

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
