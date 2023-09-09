import { io } from "socket.io-client";

const socket = io("http://localhost:4000/api/");

socket.on("connect", () => {
  console.log("connected to the server with id:", socket.id);
});

export default socket;
