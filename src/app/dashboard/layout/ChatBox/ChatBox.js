"use client";
import React, { useState, createElement } from "react";
import SendIcon from "@/assets/svg/send";
import { UsersIcon } from "@heroicons/react/24/outline";
import { sendMessage } from "@/api/messages/postRequest";

function ChatBox({ chatOpen, entireUser }) {
  const [formData, setFormData] = useState({
    senderId: entireUser ? entireUser._id : "",
    recipientId: chatOpen ? chatOpen._id : "",
    message: "",
    img: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formData);

  const handleSubmit = async () => {
    try {
      sendMessage(formData);
    } catch (error) {}
  };
  return (
    <div
      className="h-full text-white flex flex-col"
      style={{ backgroundColor: "rgb(20, 20, 20)" }}
    >
      {chatOpen ? (
        <>
          <header className="h-24 relative flex-shrink-0">
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-start ml-6">
              <img
                src={chatOpen.avatar}
                alt="Avatar"
                className="object-cover  w-14 h-14 rounded-full overflow-hidden"
              />
              <h1 className="ml-3 mt-2 text-xl ">{chatOpen.firstName}</h1>
              <h1 className="ml-1 mt-2 text-xl">{chatOpen.lastName}</h1>
            </div>
            <div
              style={{ width: "95%" }}
              className="mx-auto absolute bottom-0 left-0 right-0 border-b border-white border-opacity-20"
            ></div>
          </header>

          <div className=" relative overflow-y-auto flex-grow flex-col items-center justify-start ml-8 ">
            {/* Start Of Convo Div */}
            <div className="absolute bottom-0 mb-12 ">
              <div className="flex-col items-center ">
                <img
                  src={chatOpen.avatar}
                  alt="Avatar"
                  className="object-cover  w-24 h-24 rounded-full overflow-hidden"
                />
                <div className="flex">
                  <h1 className="text-xl ">{chatOpen.firstName}</h1>
                  <h1 className="text-xl">{chatOpen.lastName}</h1>
                </div>
              </div>
              <div>
                <h1 className="mt-2 text-xl">
                  This is the start of your conversation with{" "}
                  {chatOpen.firstName} {chatOpen.lastName}
                  {}{" "}
                </h1>
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
            name="message" // Add the name attribute to identify the field
            value={formData.message} // Use formData's message property for the value
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
