import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import io from "socket.io-client";
import { useTerminalStore } from "../store/terminalStore";

const socket = io("http://localhost:3000");

export default function TerminalView() {
  const { activeId } = useTerminalStore();
  const ref = useRef(null);
  const termRef = useRef(null);

  useEffect(() => {
    if (!activeId) return;

    const term = new Terminal();
    term.open(ref.current);
    termRef.current = term;

    socket.emit("attach", activeId);

    socket.on("output", ({ id, data }) => {
      if (id === activeId) {
        term.write(data);
      }
    });

    term.onData((data) => {
      socket.emit("input", { id: activeId, input: data });
    });

    return () => term.dispose();
  }, [activeId]);

  return <div ref={ref} style={{ height: "300px" }} />;
}
