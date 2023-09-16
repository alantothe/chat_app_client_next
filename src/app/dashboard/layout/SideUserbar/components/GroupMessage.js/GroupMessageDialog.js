import React, { useState } from "react";
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

export function GroupMessageDialog({ open, toggleGroupDialog, entireUser }) {
  const userFriends = useSelector(
    (state) => state.user.entireUser.detailedFriends
  );
  const [selectedUserId, setSelectedUserId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
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
            <Textarea label="Message" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={toggleGroupDialog}>
            Close
          </Button>
          <Button variant="gradient" color="green" onClick={toggleGroupDialog}>
            Send Message
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
