import axios from "axios";
import { useState, useEffect } from "react";

function StudySession() {
  const [sessionId, setSessionId] = useState(null);
  const [status, setStatus] = useState("Idle");

  const [seconds, setSeconds] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [aiFeedback, setAiFeedback] = useState("");

  // ✅ HARD-CODED BACKEND (stable for now)
  const API = "https://study-tracker-api-t603.onrender.com";

  // 🔥 START SESSION
  const startSession = async () => {
    console.log("START CLICKED");

    try {
      const res = await axios.post(`${API}/api/session/start`, {
        userId: "69f9880916bceaf2a5261e3d"
      });

      console.log("START RESPONSE:", res.data);

      setSessionId(res.data._id);
      setStatus("Session Running ✅");

      setSeconds(0);
      setIdleTime(0);
      setTabSwitches(0);
      setAiFeedback("");

    } catch (err) {
      console.error("START ERROR:", err);
      setStatus("Error starting session ❌");
    }
  };

  // 🧠 FOCUS SCORE
  const focusScore =
    seconds > 0
      ? Math.max(
          0,
          Math.min(100, ((seconds - idleTime) / seconds) * 100)
        ).toFixed(2)
      : 0;

  // 🔥 END SESSION
  const endSession = async () => {
    console.log("END CLICKED");

    if (!sessionId) {
      setStatus("Start session first ⚠️");
      return;
    }

    try {
      await axios.post(`${API}/api/session/end`, {
        sessionId
      });

      setStatus("Session Ended 🛑");

      const res = await axios.post(`${API}/api/session/feedback`, {
        focusScore,
        idleTime,
        tabSwitches,
        seconds
      });

      console.log("FEEDBACK:", res.data);

      setAiFeedback(res.data.feedback);

    } catch (err) {
      console.error("END ERROR:", err);
      setStatus("Error ending session ❌");
    }
  };

  // ⏱️ TIMER
  useEffect(() => {
    let interval;

    if (status === "Session Running ✅") {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status]);

  // 💤 IDLE DETECTION
  useEffect(() => {
    if (status !== "Session Running ✅") return;

    let lastActivity = Date.now();

    const updateActivity = () => {
      lastActivity = Date.now();
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 5000) {
        setIdleTime((prev) => prev + 5);
      }
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      clearInterval(interval);
    };
  }, [status]);

  // 🚨 TAB SWITCH
  useEffect(() => {
    if (status !== "Session Running ✅") return;

    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitches((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [status]);

  // 💡 INSIGHT
  let insight = "";

  if (focusScore > 80) {
    insight = "Excellent focus 🔥";
  } else if (focusScore > 50) {
    insight = "Average focus 👍";
  } else {
    insight = "You are getting distracted ⚠️";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        Study Tracker
      </h2>

      {/* TEST BUTTON (for debugging) */}
      <button
        onClick={() => alert("Button Working ✅")}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Test Button
      </button>

      {/* MAIN BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={startSession}
          className="bg-green-500 px-5 py-2 rounded-lg hover:bg-green-600"
        >
          ▶ Start
        </button>

        <button
          onClick={endSession}
          className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600"
        >
          ⏹ End
        </button>
      </div>

      {/* STATS */}
      <div className="space-y-2 text-lg">
        <p>Status: {status}</p>
        <p>Time: {seconds}s</p>
        <p>Idle Time: {idleTime}s</p>
        <p>Tab Switches: {tabSwitches}</p>
        <p>Focus Score: {focusScore}%</p>
        <p>Insight: {insight}</p>

        {/* AI Feedback */}
        {aiFeedback && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-400">
              AI Feedback
            </h3>
            <p>{aiFeedback}</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default StudySession;
