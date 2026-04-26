import express from "express";
import { createTerminalInstance, killTerminalInstance, listTerminals } from "../services/terminalManager.js";

const router = express.Router();

/**
 * Create a new terminal session
 */
router.post("/create", (req, res) => {
  const { cwd } = req.body;
  const term = createTerminalInstance(cwd);

  res.json({
    id: term.id,
    cwd: term.cwd
  });
});

/**
 * List all active terminals
 */
router.get("/list", (req, res) => {
  res.json(listTerminals());
});

/**
 * Kill a terminal
 */
router.post("/kill", (req, res) => {
  const { id } = req.body;
  killTerminalInstance(id);

  res.json({ success: true });
});

export default router;
