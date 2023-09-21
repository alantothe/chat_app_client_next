import {
  Avatar,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

export function UserSelector({ users, onUserSelect, isOpen, toggleOpen }) {
  const [selectedName, setSelectedName] = useState("");

  const handleSelect = (user) => {
    setSelectedName(`${user.firstName} ${user.lastName}`);
    if (onUserSelect) onUserSelect(user); // pass the entire user object
    toggleOpen(false); // Close the dialog upon selection
  };

  return (
    <div className="relative flex w-full max-w-[24rem] z-[100000]">
      <Button onClick={() => toggleOpen(!isOpen)}>{"Select a user"}</Button>

      <Dialog open={isOpen} handler={toggleOpen}>
        <DialogHeader>Select a user</DialogHeader>
        <DialogBody divider className="max-h-[20rem] overflow-y-auto">
          {users.map((user) => (
            <ListItem key={user._id} onClick={() => handleSelect(user)}>
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={`${user.firstName} ${user.lastName}`}
                  src={user.avatar}
                />
              </ListItemPrefix>
              <Typography variant="h6" color="blue-gray">
                {user.firstName} {user.lastName}
              </Typography>
            </ListItem>
          ))}
        </DialogBody>
      </Dialog>
    </div>
  );
}
