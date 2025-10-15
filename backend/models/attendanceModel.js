import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true }
})

const attendanceModel = mongoose.model("attendance",attendanceSchema)
export default attendanceModel