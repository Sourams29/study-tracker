import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/api/session/user/69f9880916bceaf2a5261e3d"
      );
      setSessions(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  if (!sessions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        No data yet 📭
      </div>
    );
  }

  // 📊 CALCULATIONS
  const totalSessions = sessions.length;

  const totalTime = sessions.reduce(
    (acc, s) => acc + (s.duration || 0),
    0
  );

  const totalMinutes = Math.floor(totalTime / 60);

  const avgFocus =
    sessions.reduce((acc, s) => acc + (Number(s.focusScore) || 0), 0) /
    totalSessions;

  const bestSession = sessions.reduce((max, s) =>
    s.focusScore > max.focusScore ? s : max
  );

  const worstSession = sessions.reduce((min, s) =>
    s.focusScore < min.focusScore ? s : min
  );

  const avgIdle =
    sessions.reduce((acc, s) => acc + (s.idleTime || 0), 0) /
    totalSessions;

  // 📈 CHART DATA
  const focusData = {
    labels: sessions.map((_, i) => `Session ${i + 1}`),
    datasets: [
      {
        label: "Focus Score",
        data: sessions.map((s) => s.focusScore),
        borderColor: "#22d3ee",
        backgroundColor: "#22d3ee",
      },
    ],
  };

  const durationData = {
    labels: sessions.map((_, i) => `Session ${i + 1}`),
    datasets: [
      {
        label: "Duration",
        data: sessions.map((s) => s.duration),
        backgroundColor: "#a78bfa",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-cyan-400">
        Study Dashboard
      </h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">
          <p className="text-gray-400 text-sm">Total Sessions</p>
          <h2 className="text-2xl font-bold">{totalSessions}</h2>
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">
          <p className="text-gray-400 text-sm">Avg Focus</p>
          <h2 className="text-2xl font-bold">
            {avgFocus.toFixed(2)}%
          </h2>
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">
          <p className="text-gray-400 text-sm">Study Time</p>
          <h2 className="text-2xl font-bold">{totalMinutes} min</h2>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          Insights
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900 p-4 rounded-xl">
            <p className="text-green-400 font-semibold">Best Session</p>
            <p>Focus: {bestSession.focusScore}%</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl">
            <p className="text-red-400 font-semibold">Worst Session</p>
            <p>Focus: {worstSession.focusScore}%</p>
          </div>
        </div>

        <p className="mt-4 text-gray-400">
          Avg Idle Time: {avgIdle.toFixed(2)} sec
        </p>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-5 rounded-2xl">
          <h3 className="mb-4 text-cyan-400">Focus Trend</h3>
          <Line data={focusData} />
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl">
          <h3 className="mb-4 text-purple-400">Study Duration</h3>
          <Bar data={durationData} />
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-slate-800 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          Session History
        </h2>

        {sessions.map((s, i) => (
          <div
            key={i}
            className="border border-slate-700 p-4 rounded-xl mb-3 hover:bg-slate-700 transition"
          >
            <p className="font-semibold">Session {i + 1}</p>
            <p>Duration: {Math.round(s.duration)} sec</p>
            <p>Focus: {s.focusScore}%</p>
            <p>Idle: {s.idleTime}s</p>
            <p>Tabs: {s.tabSwitches}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;