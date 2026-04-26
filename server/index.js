const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const pty = require("node-pty");
const simpleGit = require("simple-git");

const app = express();
app.use(cors());
app.use(express.json());

const ROOT = path.join(__dirname, "workspace");
const git = simpleGit();

const readDir = (dir) => {
  return fs.readdirSync(dir).map((file) => {
    const full = path.join(dir, file);
    const isDir = fs.statSync(full).isDirectory();
    return {
      name: file,
      path: full,
      type: isDir ? "folder" : "file",
      children: isDir ? readDir(full) : []
    };
  });
};

app.get("/files", (req, res) => res.json(readDir(ROOT)));

app.get("/file", (req, res) => {
  res.send(fs.readFileSync(req.query.path, "utf-8"));
});

app.post("/save", (req, res) => {
  fs.writeFileSync(req.body.path, req.body.content);
  res.send("Saved");
});

// Git
app.get("/git/status", async (req, res) => {
  res.json(await git.status());
});

app.post("/git/commit", async (req, res) => {
  await git.add(".");
  await git.commit(req.body.message);
  res.send("Committed");
});

// Server + WebSocket
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  const shell = process.platform === "win32" ? "powershell.exe" : "bash";

  const term = pty.spawn(shell, [], {
    name: "xterm-color",
    cwd: process.cwd(),
    env: process.env
  });

  term.onData((data) => socket.emit("terminal:data", data));

  socket.on("terminal:input", (data) => term.write(data));

  socket.on("disconnect", () => term.kill());
});

server.listen(4000, () => console.log("NOVA Code server running on 4000"));
