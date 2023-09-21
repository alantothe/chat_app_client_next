import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { UserSelector } from "./UserSelector";
import { sendMessage } from "@/api/messages/postRequest";
import { fetchGroupConversationByIdThunk } from "@/redux/features/groupConversations/groupConversationThunks";
import { getMessagesThunk } from "@/redux/features/messages/messageThunks";

export function GroupMessageDialog({
  open,
  toggleGroupDialog,
  entireUser,
  setChatOpen,
}) {
  useEffect(() => {
    if (!open) {
      // Reset the state when the dialog closes
      setSelectedUsers([]);
      setFormData((prevData) => ({
        ...prevData,
        recipientIds: [],
        message: "",
      }));
    }
  }, [open]);
  const dispatch = useDispatch();
  const userFriends = useSelector(
    (state) => state.user.entireUser.detailedFriends
  );

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formData, setFormData] = useState({
    senderId: entireUser._id,
    recipientIds: [],
    message: "",
    img: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const userIds = selectedUsers.map((user) => user._id);
    setFormData((prevData) => ({
      ...prevData,
      recipientIds: userIds,
    }));
  }, [selectedUsers]);
  //lift
  const handleUserSelect = (user) => {
    // check if the user is already selected based on their ID
    if (!selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
      setSelectedUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userToRemove._id)
    );
  };

  const handleSendMessage = async () => {
    try {
      // send the message to the backend
      await sendMessage(formData);
      // const members = [formData.senderId, ...formData.recipientIds];
      // dispatch(getMessagesThunk({ members }));
      toggleGroupDialog();
      dispatch(fetchGroupConversationByIdThunk(formData.senderId));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <>
      <Dialog open={open} handler={toggleGroupDialog}>
        <DialogHeader className="bg-zinc-800 px-5 py-3 flex justify-between">
          <Typography variant="h5" color="white">
            New message to
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 cursor-pointer text-red-500"
            onClick={toggleGroupDialog}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </DialogHeader>
        <DialogBody divider className=" bg-zinc-800">
          <div className="grid gap-6">
            <UserSelector
              users={userFriends}
              onUserSelect={handleUserSelect}
              isOpen={dropdownOpen}
              toggleOpen={setDropdownOpen}
            />
            <Textarea
              className=" text-white font-bold"
              placeholder="Two Users & Message needed to start conversation..."
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-3">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="flex text-white  items-center p-2 border rounded gap-2"
              >
                {user.firstName}
                <button onClick={() => handleRemoveUser(user)}>X</button>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className=" h-20 bg-zinc-800 space-x-2 px-5 py-3 flex justify-center">
          {selectedUsers.length > 1 && formData.message.trim().length > 0 && (
            <Button onClick={handleSendMessage} color="black">
              Start Conversation
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
