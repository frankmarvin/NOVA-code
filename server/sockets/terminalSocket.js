import { Server } from "socket.io";
import { getTerminal } from "../services/terminalManager.js";

export function initTerminal(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {

    socket.on("attach", (terminalId) => {
      const termObj = getTerminal(terminalId);
      if (!termObj) return;

      const term = termObj.process;

      term.onData((data) => {
        socket.emit("output", data);
      });

      socket.on("input", (input) => {
        term.write(input);
      });
    });

  });
}
