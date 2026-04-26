import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

export default function Term() {
  const ref = useRef();

  useEffect(() => {
    const socket = io("http://localhost:4000");
    const term = new Terminal();
    term.open(ref.current);

    term.onData(data => socket.emit("terminal:input", data));
    socket.on("terminal:data", data => term.write(data));
  }, []);

  return <div ref={ref} style={{ height: "40%" }} />;
}
