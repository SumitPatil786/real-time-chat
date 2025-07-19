export default function OnlineUsersList({ users }) {
  if (!Array.isArray(users)) {
    console.warn("❌ Invalid users list passed to OnlineUsersList:", users);
    return <p>No users online</p>;
  }

  return (
    <div style={{ marginTop: ".5rem", fontSize: "0.9rem", color: "#444" }}>
      <strong>Online:</strong> {users.length > 0 ? users.join(", ") : "—"}
    </div>
  );
}
