import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

import Explorer from "./components/Explorer";
import Tabs from "./components/Tabs";
import Terminal from "./components/Terminal";
import CommandPalette from "./components/CommandPalette";

export default function App() {
  const [files, setFiles] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);
  const [showCmd, setShowCmd] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/files")
      .then(res => setFiles(res.data));
  }, []);

  const openFile = async (file) => {
    const res = await axios.get("http://localhost:4000/file", {
      params: { path: file.path }
    });

    const newTab = { ...file, content: res.data };

    setTabs(prev => {
      if (prev.find(t => t.path === file.path)) return prev;
      return [...prev, newTab];
    });

    setActive(file.path);
  };

  const updateCode = (val) => {
    setTabs(tabs.map(t =>
      t.path === active ? { ...t, content: val } : t
    ));
  };

  const saveFile = async () => {
    const tab = tabs.find(t => t.path === active);
    await axios.post("http://localhost:4000/save", tab);
    alert("Saved!");
  };

  return (
    <div style={{ height: "100vh", background: "#1e1e1e", color: "#fff" }}>
      
      {/* HEADER */}
      <div style={{
        height: 40,
        background: "#111",
        display: "flex",
        alignItems: "center",
        padding: "0 10px"
      }}>
        🚀 NOVA Code
      </div>

      <div style={{ display: "flex", height: "calc(100% - 40px)" }}>
        <Explorer files={files} openFile={openFile} />

        <div style={{ flex: 1 }}>
          <Tabs tabs={tabs} active={active} setActive={setActive} />

          {active && (
            <Editor
              theme="vs-dark"
              value={tabs.find(t => t.path === active)?.content}
              onChange={updateCode}
              height="60%"
            />
          )}

          <button onClick={saveFile}>Save</button>

          <Terminal />
        </div>
      </div>

      {showCmd && <CommandPalette setShowCmd={setShowCmd} />}
    </div>
  );
}
