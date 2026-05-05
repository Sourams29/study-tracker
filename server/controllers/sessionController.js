import Session from "../models/Session.js";

// 🔥 START SESSION
export const startSession = async (req, res) => {
  try {
    const { userId } = req.body;

    const session = new Session({
      userId,
      startTime: new Date(),
    });

    await session.save();

    res.status(201).json(session);
  } catch (err) {
    console.error("Start Session Error:", err);
    res.status(500).json({ error: "Failed to start session" });
  }
};

// 🛑 END SESSION
export const endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.endTime = new Date();

    await session.save();

    res.json({ message: "Session ended" });
  } catch (err) {
    console.error("End Session Error:", err);
    res.status(500).json({ error: "Failed to end session" });
  }
};

// 📊 UPDATE ACTIVITY (SAVE ANALYTICS)
export const updateActivity = async (req, res) => {
  try {
    const { sessionId, focusScore, idleTime, tabSwitches, duration } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.focusScore = Number(focusScore);
    session.idleTime = idleTime;
    session.tabSwitches = tabSwitches;
    session.duration = duration;

    await session.save();

    res.json({ message: "Session updated successfully" });
  } catch (err) {
    console.error("Update Activity Error:", err);
    res.status(500).json({ error: "Failed to update session" });
  }
};

// 📚 GET ALL SESSIONS FOR USER
export const getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    const sessions = await Session.find({ userId }).sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    console.error("Get Sessions Error:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// 📈 GET ANALYTICS SUMMARY
export const getAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;

    const sessions = await Session.find({ userId });

    if (!sessions.length) {
      return res.json({ message: "No data available" });
    }

    let totalFocus = 0;
    let totalTime = 0;
    let totalIdle = 0;

    sessions.forEach((s) => {
      totalFocus += s.focusScore || 0;
      totalTime += s.duration || 0;
      totalIdle += s.idleTime || 0;
    });

    const avgFocus = (totalFocus / sessions.length).toFixed(2);

    res.json({
      totalSessions: sessions.length,
      avgFocusScore: avgFocus,
      totalStudyTime: totalTime,
      totalIdleTime: totalIdle,
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ error: "Failed to get analytics" });
  }
};