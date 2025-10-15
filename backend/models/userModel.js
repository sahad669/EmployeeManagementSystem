import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  imageurl:{type:String},
  public_id:{type:String},
  role: {
    type: String,
    required: true,
    enum: ["admin", "employee"],
    default: "employee",
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
