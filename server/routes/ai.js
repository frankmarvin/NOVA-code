import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt, context } = req.body;
  const result = await askAI(prompt, context);
  res.json({ result });
});

export default router;
