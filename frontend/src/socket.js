import { io } from "socket.io-client";

export const BASE_URL = import.meta.env.VITE_API || "http://localhost:5000";
export const socket = io(BASE_URL, {
autoConnect: false,
});
