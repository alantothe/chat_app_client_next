import {
  Avatar,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useState } from "react";

export function UserSelector({ users, onUserSelect, isOpen, toggleOpen }) {
  const [selectedName, setSelectedName] = useState("");

  const handleSelect = (_id, firstName, lastName) => {
    const fullName = `${firstName} ${lastName}`;
    setSelectedName(fullName);
    if (onUserSelect) onUserSelect(_id, fullName); // pass _id and full name
    toggleOpen(false); // Close the dialog upon selection
  };

  return (
    <div className="relative flex w-full max-w-[24rem] z-[100000]">
      <div
        className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3 cursor-pointer"
        onClick={() => toggleOpen(!isOpen)}
      >
        {selectedName || "Select a user"}
      </div>

      <Dialog open={isOpen} handler={toggleOpen}>
        <DialogHeader>Select a user</DialogHeader>
        <DialogBody divider className="max-h-[20rem] overflow-y-auto">
          {users.map(({ _id, firstName, lastName, avatar }) => (
            <ListItem
              key={_id}
              onClick={() => handleSelect(_id, firstName, lastName)}
            >
              <ListItemPrefix>
                <Avatar
                  variant="circular"
                  alt={`${firstName} ${lastName}`}
                  src={avatar}
                />
              </ListItemPrefix>
              <Typography variant="h6" color="blue-gray">
                {firstName} {lastName}
              </Typography>
            </ListItem>
          ))}
        </DialogBody>
      </Dialog>
    </div>
  );
}
