"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./redux/features/counter/counterSlice";

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex-col items-center justify-center">
      <h1> Testing Out Redux</h1>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Add 1 </button>
      <br />
      <button onClick={() => dispatch(decrement())}>Subtract 1 </button>
    </div>
  );
}

export default Home;
