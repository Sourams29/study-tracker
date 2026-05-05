import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: String,
    startTime: Date,
    endTime: Date,

    focusScore: Number,
    idleTime: Number,
    tabSwitches: Number,
    duration: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Session", sessionSchema);