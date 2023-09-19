import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
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
      const members = [formData.senderId, ...formData.recipientIds];
      dispatch(fetchGroupConversationByIdThunk(formData.senderId));
      dispatch(getMessagesThunk({ members }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <>
      <Dialog open={open} handler={toggleGroupDialog}>
        <DialogHeader className="flex items-center justify-between">
          New message to @
        </DialogHeader>
        <DialogBody divider>
          <div className="grid gap-6">
            <UserSelector
              users={userFriends}
              onUserSelect={handleUserSelect}
              isOpen={dropdownOpen}
              toggleOpen={setDropdownOpen}
            />
            <Textarea
              label="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-2 border rounded gap-2"
              >
                {user.firstName}
                <button onClick={() => handleRemoveUser(user)}>X</button>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={toggleGroupDialog}>
            Close
          </Button>
          {selectedUsers.length > 1 && (
            <Button
              onClick={handleSendMessage}
              variant="gradient"
              color="green"
            >
              Start Conversation
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
