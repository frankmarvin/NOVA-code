export default function CommandPalette({ setShowCmd }) {
  return (
    <div style={{
      position: "absolute",
      top: "20%",
      left: "30%",
      width: "40%",
      background: "#222",
      padding: 20
    }}>
      <input
        placeholder="Command..."
        style={{ width: "100%" }}
        autoFocus
        onBlur={() => setShowCmd(false)}
      />
    </div>
  );
}
