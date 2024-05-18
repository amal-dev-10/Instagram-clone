import { io } from "socket.io-client";

// Replace 'http://localhost:3000' with your server URL
const SOCKET_URL = "http://localhost:8080";

// Create a socket instance
const socket = io(SOCKET_URL, {
    auth: {
        token: localStorage.getItem("token")
    },
    transports: ["websocket"]
});

export default socket;