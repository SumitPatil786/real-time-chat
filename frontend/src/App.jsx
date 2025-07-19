import { useEffect, useState } from "react";
import { socket } from "./socket.js";
import { api } from "./api.js";
import RoomList from "./components/RoomList.jsx";
import ChatRoom from "./components/ChatRoom.jsx";

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    api.get("/rooms").then((res) => setRooms(res.data)).catch(console.error);
  }, []);

  const joinRoom = (room) => {
    let u = username;
    if (!u) {
      u = prompt("Enter a username:");
      if (!u) return;
      setUsername(u);
    }

    console.log("👉 Joining room:", room.name);
    socket.connect();
    socket.emit("joinRoom", { username: u, roomId: room._id });
    setCurrentRoom(room);
  };

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      <aside className="sidebar" style={{ width: "220px", background: "#f0f0f0", padding: "1rem" }}>
        <h2>Rooms</h2>
        <RoomList rooms={rooms} onSelect={joinRoom} />
      </aside>

      <main className="chat-area" style={{ flex: 1, padding: "1rem" }}>
        {currentRoom && username ? (
          <ChatRoom room={currentRoom} username={username} />
        ) : (
          <p>Select a room to start chatting…</p>
        )}
      </main>
    </div>
  );
}