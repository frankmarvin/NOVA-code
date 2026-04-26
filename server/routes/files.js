import express from "express";
import { getFileTree, readFile, writeFile } from "../services/fileService.js";

const router = express.Router();

router.get("/tree", (req, res) => {
  res.json(getFileTree("./workspace"));
});

router.get("/read", (req, res) => {
  res.send(readFile(req.query.path));
});

router.post("/write", (req, res) => {
  const { path, content } = req.body;
  writeFile(path, content);
  res.send("Saved");
});

export default router;
