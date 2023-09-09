import React from "react";
import UserProfile from "@/app/utils/components/UserProfile";

const SideUserBar = ({ loggedInUser }) => {
  console.log(loggedInUser.avatar);

  return (
    <div
      className="h-full text-white flex flex-col items-start justify-start pt-5"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      <UserProfile user={{ avatar: loggedInUser.avatar }} avatarSize="70px" />
      {/* Other components */}
    </div>
  );
};

export default SideUserBar;
