import { createTerminal } from "./terminalService.js";
import { v4 as uuidv4 } from "uuid";

const terminals = {};

export function createTerminalInstance(cwd) {
  const process = createTerminal(cwd);
  const id = uuidv4();

  terminals[id] = {
    id,
    process,
    cwd
  };

  return terminals[id];
}

export function getTerminal(id) {
  return terminals[id];
}

export function listTerminals() {
  return Object.values(terminals).map(t => ({
    id: t.id,
    cwd: t.cwd
  }));
}

export function killTerminal(id) {
  if (terminals[id]) {
    terminals[id].process.kill();
    delete terminals[id];
  }
}
