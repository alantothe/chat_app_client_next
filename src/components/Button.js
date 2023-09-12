"use client";

import React from "react";

const Button = (props) => {
  return (
    <button className=" bg-zinc-800 rounded  text-xs  w-36 h-10 ">
      {props.text}
    </button>
  );
};

export default Button;
