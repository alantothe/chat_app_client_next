"use client";
import React, { useState, createElement, useEffect } from "react";
import SendIcon from "@/assets/svg/send";
import { UsersIcon } from "@heroicons/react/24/outline";
import { sendMessage } from "@/api/messages/postRequest";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesThunk } from "@/redux/features/messages/messageThunks";
import MessageDetail from "./components/MessageDetail";
function ChatBox({ chatOpen, entireUser }) {
  const dispatch = useDispatch();
  console.log("chatOpen:", chatOpen);

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
    console.log("Sending message with data:", formData);
    try {
      sendMessage(formData);
    } catch (error) {}
  };

  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      {chatOpen && chatOpen.length > 0 ? (
        <>
          <header className="h-24 relative flex-shrink-0">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-start ml-6">
              {/* Render Avatars */}
              {chatOpen.map((member, index) => (
                <div className="flex">
                  <img
                    key={index}
                    src={member.avatar}
                    alt="Avatar"
                    className="object-cover w-14 h-14 rounded-full overflow-hidden mr-2"
                  />
                </div>
              ))}

              {/* Render Full Names */}
              <h1 className="ml-3 mt-2 text-xl ">
                {chatOpen
                  .map((member) => `${member.firstName} ${member.lastName}`)
                  .join(", ")}
              </h1>
            </div>
            <div
              style={{ width: "95%" }}
              className="mx-auto absolute bottom-0 left-0 right-0 border-b border-white border-opacity-20"
            ></div>
          </header>

          <div className=" relative overflow-y-auto flex-grow flex-col items-center justify-start ml-8 ">
            {/* Start Of Convo Div */}
            <div className="absolute bottom-0 mb-3 ">
              <div className="flex items-center ">
                {/* Display avatars and names for the Start of the Convo. */}
                {chatOpen.map((member, index) => (
                  // group a list without node
                  <React.Fragment className="flex" key={index}>
                    <img
                      src={member.avatar}
                      alt="Avatar"
                      className="object-cover w-24 h-24 rounded-full overflow-hidden mr-2 mb-5"
                    />
                  </React.Fragment>
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
            className={`w-full rounded py-2 bg-zinc-900 h-full pl-3 pr-12 placeholder-zinc-700 text-white mb-5`}
            placeholder="Message ..."
          />
          <div className="absolute inset-y-0 right-6 flex items-center">
            <SendIcon
              onClick={handleSubmit}
              className={`h-5 w-5 ${
                formData.message ? "text-zinc-200" : "text-zinc-700"
              }`}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ChatBox;
