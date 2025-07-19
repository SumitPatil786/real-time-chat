import { useState } from "react";

export default function MessageInput({ onSend, onTyping }) {
const [text, setText] = useState("");

const handleChange = (e) => {
    setText(e.target.value);
    onTyping(true);
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
    onTyping(false);
};

return (
    <form onSubmit={handleSubmit} className="msg-input">
    <input
        type="text"
        placeholder="Type your message…"
        value={text}
        onChange={handleChange}
        onBlur={() => onTyping(false)}
    />
    <button type="submit">Send</button>
    </form>
);
}
