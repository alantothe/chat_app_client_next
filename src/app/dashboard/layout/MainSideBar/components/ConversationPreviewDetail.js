import React from "react";

function ConversationPreviewDetail({ conversation }) {
  const { detailedLastMessageFrom } = conversation;
  console.log("From Conversation Preview ");
  console.log(detailedLastMessageFrom[0].firstName);

  return (
    <div className="flex mx-6 my-4">
      <img
        src={detailedLastMessageFrom[0].avatar}
        alt="Avatar"
        className="object-cover  w-16 h-16 rounded-full overflow-hidden"
      />
      <div className="flex-col ml-3 mt-1">
        <div className="flex">
          <h1 className="text-xl">{detailedLastMessageFrom[0].firstName}</h1>
          <h1 className="ml-2 text-xl">
            {detailedLastMessageFrom[0].lastName}
          </h1>
        </div>
        <p className=" text-zinc-700"> {conversation.lastMessage}</p>
      </div>
    </div>
  );
}

export default ConversationPreviewDetail;
{
  /* <img
src={friend.avatar}
alt="Avatar"
className="object-cover  w-12 h-12 rounded-full overflow-hidden"
/>
<h1 className="ml-3 mt-2">{friend.firstName}</h1>
<h1 className="ml-1 mt-2">{friend.lastName}</h1> */
}
