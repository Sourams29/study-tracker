import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white animate-fadeIn">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">StudyTracker</h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-300 hover:text-white transition"
        >
          Dashboard
        </button>
      </div>

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-12 items-center px-12 py-20">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Track Your Focus <br />
            <span className="text-cyan-400">Study Smarter 🚀</span>
          </h1>

          <p className="text-gray-400 mb-6 text-lg">
            Monitor sessions, detect distractions, and improve productivity.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/study")}
              className="bg-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-600 transition transform hover:scale-105 shadow-[0_0_10px_#22d3ee]"
            >
              Start Studying
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-gray-500 px-6 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="study"
            className="w-[90%] max-h-[300px] object-cover rounded-2xl shadow-lg hover:scale-105 transition"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-12 pb-16">

        {[
          {
            title: "🎯 Focus Tracking",
            desc: "Measure focus score based on activity",
            color: "text-cyan-400",
          },
          {
            title: "🔔 Smart Alerts",
            desc: "Detect distractions in real time",
            color: "text-purple-400",
          },
          {
            title: "📊 Analytics",
            desc: "Visualize your performance",
            color: "text-pink-400",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:shadow-[0_0_15px_#22d3ee] transition transform hover:-translate-y-2"
          >
            <h3 className={`${f.color} text-lg font-semibold mb-2`}>
              {f.title}
            </h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* PREVIEW */}
      <div className="px-12 pb-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          App Preview
        </h2>

        <div className="grid md:grid-cols-2 gap-6 justify-items-center">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="dashboard"
            className="w-[90%] max-h-[250px] object-cover rounded-xl shadow-md hover:scale-105 transition"
          />

          <img
            src="https://images.unsplash.com/photo-1506784365847-bbad939e9335"
            alt="study"
            className="w-[90%] max-h-[250px] object-cover rounded-xl shadow-md hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;