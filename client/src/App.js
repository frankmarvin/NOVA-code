import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

import Explorer from "./components/Explorer";
import Tabs from "./components/Tabs";
import CommandPalette from "./components/CommandPalette";

// 🔥 NEW TERMINAL SYSTEM
import TerminalTabs from "./components/TerminalTabs";
import TerminalView from "./components/TerminalView";

export default function App() {
  const [files, setFiles] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);
  const [showCmd, setShowCmd] = useState(false);

  // 📁 Load files
  useEffect(() => {
    axios.get("http://localhost:3000/api/files/tree")
      .then(res => setFiles(res.data));
  }, []);

  // ⌨️ Command Palette Shortcut (Ctrl + P)
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setShowCmd(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // 📂 Open file
  const openFile = async (file) => {
    const res = await axios.get("http://localhost:3000/api/files/read", {
      params: { path: file.path }
    });

    const newTab = { ...file, content: res.data };

    setTabs(prev => {
      if (prev.find(t => t.path === file.path)) return prev;
      return [...prev, newTab];
    });

    setActive(file.path);
  };

  // ✏️ Update code
  const updateCode = (val) => {
    setTabs(prev =>
      prev.map(t =>
        t.path === active ? { ...t, content: val } : t
      )
    );
  };

  // 💾 Save file
  const saveFile = async () => {
    const tab = tabs.find(t => t.path === active);
    if (!tab) return;

    await axios.post("http://localhost:3000/api/files/write", {
      path: tab.path,
      content: tab.content
    });

    alert("Saved!");
  };

  const activeTab = tabs.find(t => t.path === active);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#1e1e1e",
      color: "#fff"
    }}>

      {/* HEADER */}
      <div style={{
        height: 40,
        background: "#111",
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        borderBottom: "1px solid #333"
      }}>
        🚀 NOVA Code
      </div>

      {/* MAIN AREA */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* SIDEBAR */}
        <Explorer files={files} openFile={openFile} />

        {/* EDITOR + TERMINAL */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}>

          {/* FILE TABS */}
          <Tabs tabs={tabs} active={active} setActive={setActive} />

          {/* EDITOR */}
          <div style={{ flex: 1 }}>
            {activeTab && (
              <Editor
                theme="vs-dark"
                value={activeTab.content}
                onChange={updateCode}
                height="100%"
              />
            )}
          </div>

          {/* SAVE BUTTON */}
          <div style={{
            background: "#111",
            padding: "5px",
            borderTop: "1px solid #333"
          }}>
            <button onClick={saveFile}>💾 Save</button>
          </div>

          {/* 🔥 TERMINAL SYSTEM */}
          <div style={{
            height: "300px",
            borderTop: "1px solid #333",
            display: "flex",
            flexDirection: "column"
          }}>
            <TerminalTabs />
            <TerminalView />
          </div>

        </div>
      </div>

      {/* COMMAND PALETTE */}
      {showCmd && (
        <CommandPalette setShowCmd={setShowCmd} />
      )}
    </div>
  );
}
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







