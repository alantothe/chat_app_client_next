"use client";
import { createElement, useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile";
import {
  ArrowSmallLeftIcon,
  UserCircleIcon,
  UserPlusIcon,
  InboxArrowDownIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Tooltip, Badge, IconButton } from "@material-tailwind/react";
import { SignOutDialog } from "./components/SignOutDialog";
import { AddFriendDialog } from "./components/AddFriend/AddFriendDialog";
import { Inbox } from "./components/Inbox/Inbox";
import { GroupMessageDialog } from "./components/GroupMessage.js/GroupMessageDialog";
const SideUserBar = ({ entireUser, setChatOpen }) => {
  let [dialogOpen, setDialogOpen] = useState(false);
  let [addDialogOpen, setAddDialogOpen] = useState(false);
  let [inboxDialogOpen, setInboxDialogOpen] = useState(false);
  let [groupDialogOpen, setGroupDialogOpen] = useState(false);
  //for group dialog
  let [dropdownOpen, setDropdownOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(null);
  const { friendRequestsReceived = [] } = entireUser || {};

  const toggleDialog = () => setDialogOpen((prev) => !prev);
  const toggleAddDialog = () => {
    setAddDialogOpen((prev) => {
      console.log("Toggling addDialogOpen from", prev, "to", !prev);
      return !prev;
    });
  };
  const toggleGroupDialog = () => {
    setGroupDialogOpen((prev) => {
      console.log("Toggling groupDialogOpen from", prev, "to", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    setBadgeCount(friendRequestsReceived.length);
  }, [friendRequestsReceived]);

  const toggleInboxDialog = () => setInboxDialogOpen((prev) => !prev);

  return (
    <div
      className="h-full text-white flex flex-col items-center justify-start pt-7 overflow-hidden"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      {entireUser ? (
        <UserProfile user={{ avatar: entireUser.avatar }} avatarSize="50px" />
      ) : null}

      {/* Icons Container */}
      <div className="flex flex-col items-center overflow-hidden flex-grow">
        <Tooltip
          content="Send Friend Request"
          placement="right"
          className="bg-zinc-700 mt-1"
        >
          {createElement(UserPlusIcon, {
            className: "h-14 w-14 pt-3 cursor-pointer",
            onClick: toggleAddDialog,
          })}
        </Tooltip>

        <Tooltip
          content="Create Group Chat"
          placement="right"
          className="bg-zinc-700 mt-1"
        >
          {createElement(ChatBubbleLeftRightIcon, {
            className: "h-14 w-14 pt-3 cursor-pointer",
            onClick: toggleGroupDialog,
          })}
        </Tooltip>

        <Tooltip
          content="Profile Page"
          placement="right"
          className="bg-zinc-700 mt-1"
        >
          {createElement(UserCircleIcon, { className: "h-14 w-14 pt-3" })}
        </Tooltip>

        {badgeCount > 0 ? (
          <div className="relative inline-block overflow-visible">
            <Badge content={badgeCount} className="bg-zinc-200 mt-3 h-2 w-2">
              <Tooltip
                content="Inbox"
                placement="right"
                className="bg-zinc-700 mt-1"
              >
                {createElement(InboxArrowDownIcon, {
                  className: "h-14 w-14 pt-3",
                  onClick: toggleInboxDialog,
                })}
              </Tooltip>
            </Badge>
          </div>
        ) : (
          <div className="relative inline-block overflow-visible">
            <Tooltip
              content="Inbox"
              placement="right"
              className="bg-zinc-700 mt-1"
            >
              {createElement(InboxArrowDownIcon, {
                className: "h-14 w-14 pt-3",
                onClick: toggleInboxDialog,
              })}
            </Tooltip>
          </div>
        )}

        <Tooltip
          content="Log Off"
          placement="right"
          className="bg-zinc-700 mt-1"
        >
          {createElement(ArrowSmallLeftIcon, {
            className: "h-14 w-14 pt-3 cursor-pointer",
            onClick: toggleDialog,
          })}
        </Tooltip>
      </div>
      {/* End of Icons Container */}

      <SignOutDialog open={dialogOpen} toggleDialog={toggleDialog} />

      {entireUser ? (
        <AddFriendDialog
          entireUser={entireUser}
          open={addDialogOpen}
          toggleAddDialog={toggleAddDialog}
        />
      ) : null}

      {entireUser ? (
        <GroupMessageDialog
          setChatOpen={setChatOpen}
          entireUser={entireUser}
          open={groupDialogOpen}
          toggleGroupDialog={toggleGroupDialog}
        />
      ) : null}

      <Inbox open={inboxDialogOpen} toggleInboxDialog={toggleInboxDialog} />
    </div>
  );
};
export default SideUserBar;
