"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return <div className="flex-col items-center justify-center"></div>;
}

export default Home;
