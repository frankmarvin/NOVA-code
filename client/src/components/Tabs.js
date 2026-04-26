export default function Tabs({ tabs, active, setActive }) {
  return (
    <div style={{ display: "flex", background: "#333" }}>
      {tabs.map(tab => (
        <div
          key={tab.path}
          onClick={() => setActive(tab.path)}
          style={{
            padding: 8,
            background: active === tab.path ? "#1e1e1e" : "#555"
          }}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}
