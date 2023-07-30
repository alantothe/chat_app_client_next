import React from "react";
import UserProfile from "@/app/utils/components/UserProfile";

const SideUserBar = () => {
  const userData = {
    _id: "64c478b59a39221f1533c17c",
    firstName: "Alan",
    lastName: "Malpartida",
    email: "alanmalpartida@gmail.com",
    password: "$2a$10$ZRf5qGSEj9Cwn5FmrRrrueEEwOcLMRIsfwyxe9ROXFyAPCtIkTCu6",
    avatar:
      "https://res.cloudinary.com/dzjr3skhe/image/upload/v1687213143/alan_photos/alan-photo-pixelicious_iknzvi.png",
    friendRequest: [],
    isOnline: false,
    friends: [
      "64c478c39a39221f1533c17f",
      "64c536deb3f84298c205637e",
      "64c536deb3f84298c205637e",
    ],
    conversations: ["64c479979a39221f1533c18d"],
    __v: 0,
  };
  return (
    <div
      className="h-full text-white flex flex-col items-start justify-start pt-5"
      style={{ backgroundColor: "rgb(18, 18, 22)" }}
    >
      <UserProfile user={{ avatar: userData.avatar }} avatarSize="70px" />
      {/* Other components */}
    </div>
  );
};

export default SideUserBar;
