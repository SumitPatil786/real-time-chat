export default function RoomList({ rooms, onSelect }) {
if (!rooms || rooms.length === 0) {
    return <p>No rooms available.</p>;
}

return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
    {rooms.map((room) => (
        <li key={room._id} style={{ marginBottom: "0.5rem" }}>
        <button
            onClick={() => onSelect(room)}
            style={{
            width: "100%",
            padding: "0.75rem",
            background: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            textAlign: "left",
            transition: "all 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#ffffff")}
        >
            {room.name}
        </button>
        </li>
    ))}
    </ul>
);
}
