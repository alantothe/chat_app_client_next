import { io } from "socket.io-client";

const socket = io("https://chat-app-alan-63317e4a9117.herokuapp.com/", {
  reconnectionAttempts: 5,
});

socket.on("connect", () => {
  console.log("connected to the server with id:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Error connecting to server:", err.message);
});
export default socket;
