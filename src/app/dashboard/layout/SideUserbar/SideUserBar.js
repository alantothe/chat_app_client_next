import { createElement, useState } from "react";
import UserProfile from "@/components/UserProfile";
import {
  ArrowSmallLeftIcon,
  UserCircleIcon,
  UserPlusIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import { SignOutDialog } from "./components/SignOutDialog";
import { AddFriendDialog } from "./components/AddFriendDialog";

const SideUserBar = ({ loggedInUser }) => {
  let [dialogOpen, setDialogOpen] = useState(false);
  let [addDialogOpen, setAddDialogOpen] = useState(false);
  let [inboxDialogOpen, setInboxDialogOpen] = useState(false);

  const toggleDialog = () => setDialogOpen((prev) => !prev);
  const toggleAddDialog = () => {
    setAddDialogOpen((prev) => {
      console.log("Toggling addDialogOpen from", prev, "to", !prev);
      return !prev;
    });
  };
  return (
    <div
      className="h-full text-white flex flex-col items-center justify-start pt-7"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      {loggedInUser ? (
        <UserProfile user={{ avatar: loggedInUser.avatar }} avatarSize="50px" />
      ) : null}
      <Tooltip
        content="Send Friend Request"
        placement="right"
        className="bg-zinc-700 mt-1"
      >
        {createElement(
          UserPlusIcon,

          {
            className: "h-14 w-14 pt-3  cursor-pointer",
            onClick: toggleAddDialog,
          }
        )}
      </Tooltip>
      <Tooltip
        content="Profile Page"
        placement="right"
        className="bg-zinc-700 mt-1"
      >
        {createElement(UserCircleIcon, { className: "h-14 w-14 pt-3" })}
      </Tooltip>
      <Tooltip content="Inbox" placement="right" className="bg-zinc-700 mt-1">
        {createElement(InboxArrowDownIcon, { className: "h-14 w-14 pt-3" })}
      </Tooltip>
      <Tooltip content="Log Off" placement="right" className="bg-zinc-700 mt-1">
        {createElement(ArrowSmallLeftIcon, {
          className: "h-14 w-14 pt-3 cursor-pointer",
          onClick: toggleDialog,
        })}
      </Tooltip>

      <SignOutDialog open={dialogOpen} toggleDialog={toggleDialog} />
      <AddFriendDialog open={addDialogOpen} toggleAddDialog={toggleAddDialog} />
    </div>
  );
};

export default SideUserBar;
