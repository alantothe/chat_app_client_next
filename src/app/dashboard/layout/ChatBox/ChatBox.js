"use client";
import { useState, createElement, useEffect, useRef } from "react";
import SendIcon from "@/assets/svg/send";
import { sendMessage } from "@/api/messages/postRequest";
import { getMessagesThunk } from "@/redux/features/messages/messageThunks";
import { fetchAllConversationByIdThunk } from "@/redux/features/conversations/conversationThunks";
import { fetchGroupConversationByIdThunk } from "@/redux/features/groupConversations/groupConversationThunks";
import { useDispatch, useSelector } from "react-redux";
import {
  UsersIcon,
  PhoneArrowUpRightIcon,
  UserIcon,
  PhoneIcon,
  PlusCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import MessageDetail from "./components/MessageDetail";
import { InDevelopment } from "./components/InDevelopment";

function ChatBox({ chatOpen, entireUser }) {
  const dispatch = useDispatch();
  const endOfMessagesRef = useRef(null);
  let [dialogOpen, setDialogOpen] = useState(false);
  const toggleDialog = () => setDialogOpen((prev) => !prev);

  const allMessages = useSelector(
    (state) => state.activeConversation?.allMessages?.messages || []
  );

  const messageGroups = groupConsecutiveMessages(allMessages);
  const [formData, setFormData] = useState({
    senderId: "",
    recipientIds: [],
    message: "",
    img: "",
  });

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView();
  }, [messageGroups]);

  useEffect(() => {
    let senderId = entireUser ? entireUser._id : null;
    let recipientIds = chatOpen ? chatOpen.map((member) => member._id) : [];

    setFormData((prevState) => ({
      ...prevState,
      senderId: senderId,
      recipientIds: recipientIds,
    }));
  }, [entireUser, chatOpen]);

  function groupConsecutiveMessages(messages) {
    const grouped = [];
    let currentGroup = null;

    messages.forEach((message) => {
      if (currentGroup && currentGroup.senderId === message.senderId) {
        currentGroup.messages.push(message);
      } else {
        if (currentGroup) {
          grouped.push(currentGroup);
        }
        currentGroup = {
          senderId: message.senderId,
          messages: [message],
        };
      }
    });

    if (currentGroup) {
      grouped.push(currentGroup);
    }

    return grouped;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.message.trim() || !chatOpen.length) {
      // if message is just a space or empty, don't send or if no chat is open
      return;
    }
    try {
      await sendMessage(formData);
      console.log(formData);

      // combine sender and recipients into a single array
      const members = [formData.senderId, ...formData.recipientIds];
      console.log(members);
      // fetch the latest messages for the conversation
      dispatch(getMessagesThunk({ members }));
      dispatch(fetchAllConversationByIdThunk(formData.senderId));
      dispatch(fetchGroupConversationByIdThunk(formData.senderId));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey && chatOpen) {
      event.preventDefault(); // prevent a new line being added to the input
      handleSubmit();
    }
  };

  // truncate the string
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + " ...";
  };

  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      {chatOpen && chatOpen.length > 0 ? (
        <>
          <header className="h-24 relative flex-shrink-0">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-start mx-6">
              {/* Render Avatars */}
              {chatOpen.map((member, index) => (
                <div className="flex">
                  <img
                    key={index}
                    src={member.avatar}
                    alt="Avatar"
                    className="object-cover w-12 h-12 rounded-full overflow-hidden mr-2"
                  />
                </div>
              ))}

              {/* Render Full Names */}
              <h1 className="ml-3 mt-2 text-xl ">
                {truncate(
                  chatOpen
                    .map((member) => `${member.firstName} ${member.lastName}`)
                    .join(", "),
                  35
                )}
              </h1>
              {/* Render Icons */}

              <div className="overflow-y-auto flex-grow flex items-center justify-end">
                <div className="mx-2">
                  {createElement(UserIcon, {
                    className: "h-7 w-7 text-white flex-shrink-0",
                    onClick: toggleDialog,
                  })}
                </div>
                <div className="mx-3">
                  {createElement(PhoneIcon, {
                    className: "h-7 w-7 text-white flex-shrink-0",
                    onClick: toggleDialog,
                  })}
                </div>
              </div>
            </div>
            <div
              style={{ width: "95%" }}
              className="mx-auto absolute bottom-0 left-0 right-0 border-b border-white border-opacity-20"
            ></div>
          </header>

          <div className="flex-grow overflow-y-auto flex flex-col-reverse items-center ml-8 scrollbar scrollbar-thumb-grey-900 scrollbar-track-zinc-900">
            {/* Start Of Convo Div */}
            <div className="mb-3 w-full ">
              <div className="flex items-center ">
                {/* Display avatars and names for the Start of the Convo. */}
                {chatOpen.map((member, index) => (
                  <div className="flex" key={index}>
                    <img
                      src={member.avatar}
                      alt="Avatar"
                      className="object-cover w-24 h-24 rounded-full overflow-hidden mr-2 mb-5"
                    />
                  </div>
                ))}
              </div>
              <div>
                <h1 className="mt-2 text-xl">
                  This is the start of your conversation with{" "}
                  {chatOpen
                    .map((member) => `${member.firstName} ${member.lastName}`)
                    .join(", ")}
                </h1>

                <div className="mt-10">
                  {messageGroups.map((group, groupIndex) => (
                    <MessageDetail
                      messages={group.messages}
                      key={groupIndex}
                      showAvatar={true}
                      ref={endOfMessagesRef}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <header className="h-24 relative flex-shrink-0">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
              <h1>Welcome! Start a Conversation By Selecting a Friend</h1>
            </div>
            <div
              style={{ width: "95%" }}
              className="mx-auto absolute bottom-0 left-0 right-0 border-b border-white border-opacity-20"
            ></div>
          </header>

          <div className="overflow-y-auto flex-grow flex items-center justify-center">
            {createElement(UsersIcon, {
              className: "h-28 w-28 text-zinc-200 opacity-10",
            })}
          </div>
        </>
      )}

      {/* Chat Input Below */}
      <footer className="flex w-full px-5 justify-center flex-shrink-0 mb-5">
        <div className="relative w-full px-3 h-12">
          <input
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded py-2 bg-zinc-900 h-full  pr-12 placeholder-zinc-700 text-white mb-5 pl-12 outline-none`}
            placeholder="Message ..."
            onKeyDown={handleKeyPress}
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-6 flex items-center">
            <SendIcon
              onClick={handleSubmit}
              className={`h-5 w-5 ${
                formData.message ? "text-white" : "text-zinc-700"
              }`}
            />
          </div>
          <div className="absolute inset-y-0 left-6 flex items-center">
            {createElement(PlusCircleIcon, {
              className: "h-7 w-7 text-zinc-700 flex-shrink-0 cursor-pointer",
              onClick: toggleDialog,
            })}
          </div>
        </div>
      </footer>

      <InDevelopment open={dialogOpen} toggleDialog={toggleDialog} />
    </div>
  );
}

export default ChatBox;
