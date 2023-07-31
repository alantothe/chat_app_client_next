import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store.js";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./redux/features/counter/counterSlice";

export default function Home() {
  return (
    <div>
      <h1> Testing Out Redux</h1>
    </div>
  );
}
