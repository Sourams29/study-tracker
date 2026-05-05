import express from "express";
import {
  startSession,
  endSession,
  updateActivity,
  getUserSessions,
  getAnalytics,
} from "../controllers/sessionController.js"; // ✅ use import + .js

import { generateFeedback } from "../services/aiService.js";

const router = express.Router();

// 🔥 SESSION ROUTES
router.post("/start", startSession);
router.post("/end", endSession);
router.post("/update", updateActivity);

// 📊 EXTRA ROUTES
router.get("/user/:userId", getUserSessions);
router.get("/analytics/:userId", getAnalytics);

// 🤖 AI FEEDBACK
router.post("/feedback", async (req, res) => {
  try {
    const feedback = await generateFeedback(req.body);
    res.json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

export default router;