import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { UserSelector } from "./UserSelector";
import { sendMessage } from "@/api/messages/postRequest";

export function GroupMessageDialog({ open, toggleGroupDialog, entireUser }) {
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
    // Extract the _id values from selectedUsers
    const userIds = selectedUsers.map((user) => user._id);
    setFormData((prevData) => ({
      ...prevData,
      recipientIds: userIds,
    }));
  }, [selectedUsers]);
  console.log(formData);

  const handleUserSelect = (userId, userFullName) => {
    // check if the user is already selected
    if (!selectedUsers.some((user) => user._id === userId)) {
      setSelectedUsers((prevUsers) => {
        const updatedUsers = [
          ...prevUsers,
          { _id: userId, fullName: userFullName },
        ];
        console.log(updatedUsers);
        return updatedUsers;
      });
    }
  };
  const handleRemoveUser = (userIdToRemove) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== userIdToRemove)
    );
  };

  const handleSendMessage = () => {
    sendMessage(formData);
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
                {user.fullName}
                <button onClick={() => handleRemoveUser(user._id)}>X</button>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={toggleGroupDialog}>
            Close
          </Button>
          {selectedUsers.length > 2 && (
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
