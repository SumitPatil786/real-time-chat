import { useEffect, useState, useRef } from "react";
import { socket } from "../socket.js";
import MessageInput from "./MessageInput.jsx";
import OnlineUsersList from "./OnlineUsersList.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

export default function ChatRoom({ room, username }) {
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (!room || !username) return;

    console.log("✅ ChatRoom mounted for:", room.name);

    socket.on("chatHistory", setMessages);
    socket.on("chatMessage", (msg) => {
      console.log("💬", msg);
      setMessages((m) => [...m, msg]);
    });
    socket.on("onlineUsers", setOnline);
    socket.on("typing", ({ username: u, status }) => {
      setTypingUser(status ? u : null);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("chatMessage");
      socket.off("onlineUsers");
      socket.off("typing");
    };
  }, [room, username]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => socket.emit("chatMessage", text);
  const setTyping = (state) => socket.emit("typing", state);

  return (
    <section style={{ padding: "1rem" }}>
      <header style={{ marginBottom: "1rem" }}>
        <h2>{room.name}</h2>
        <OnlineUsersList users={online} />
      </header>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          background: "#fafafa",
          border: "1px solid #ddd",
          padding: "1rem",
          marginBottom: "0.75rem",
        }}
      >
        {messages.map((m, idx) => (
          <div key={m._id ?? idx} style={{ marginBottom: ".5rem" }}>
            <strong>{m.username}:</strong> {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <TypingIndicator user={typingUser} />

      <MessageInput onSend={sendMessage} onTyping={setTyping} />
    </section>
  );
}