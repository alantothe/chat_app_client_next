/* eslint-disable @next/next/no-img-element */
import React from "react";

const UserProfile = ({ user = {}, avatarSize = "50px" }) => {
  if (typeof user === "string") {
    user = { avatar: user };
  }

  const { firstName = "", lastName = "", avatar = "" } = user;

  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: "50%",
    objectFit: "cover",
  };

  if (!avatar) return null;

  return (
    <div className="flex items-center border-b pb-3 border-white border-opacity-20">
      <img src={avatar} alt={`${firstName} ${lastName}`} style={avatarStyle} />
      {(firstName || lastName) && (
        <h3 className="ml-4">{`${firstName} ${lastName}`}</h3>
      )}
    </div>
  );
};

export default UserProfile;
