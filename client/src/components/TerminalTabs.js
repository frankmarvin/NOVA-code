import { useTerminalStore } from "../store/terminalStore";

export default function TerminalTabs() {
  const { terminals, activeId, setActive, removeTerminal } = useTerminalStore();

  return (
    <div style={{ display: "flex", background: "#111" }}>
      {terminals.map(t => (
        <div
          key={t.id}
          onClick={() => setActive(t.id)}
          style={{
            padding: "5px 10px",
            cursor: "pointer",
            background: activeId === t.id ? "#333" : "#222",
            color: "#fff"
          }}
        >
          {t.id.slice(0, 5)}
          <span onClick={() => removeTerminal(t.id)}> ❌</span>
        </div>
      ))}

      <button onClick={createTerminal}>＋</button>
    </div>
  );
}

async function createTerminal() {
  const res = await fetch("http://localhost:3000/api/terminal/create", {
    method: "POST"
  });
  const term = await res.json();

  const { addTerminal } = useTerminalStore.getState();
  addTerminal(term);
}
