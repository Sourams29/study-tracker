import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🧪 Test Route (VERY IMPORTANT for deployment check)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 📦 Routes
app.use("/api/session", sessionRoutes);
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 🔗 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // 🚀 Start server ONLY after DB connects
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error ❌:", err);
  });