import { createElement } from "react";
import UserProfile from "@/app/utils/components/UserProfile";
import {
  ArrowSmallLeftIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const SideUserBar = ({ loggedInUser }) => {
  return (
    <div
      className="h-full text-white flex flex-col items-center justify-start pt-7"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      {loggedInUser ? (
        <UserProfile user={{ avatar: loggedInUser.avatar }} avatarSize="50px" />
      ) : null}
      {createElement(UserPlusIcon, { className: "h-14 w-14 pt-3" })}

      {createElement(UserCircleIcon, { className: "h-14 w-14 pt-3" })}
      {createElement(ArrowSmallLeftIcon, { className: "h-14 w-14 pt-3" })}
    </div>
  );
};

export default SideUserBar;
