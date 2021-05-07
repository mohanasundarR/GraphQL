import { Schema, model } from "mongoose";
const users = new Schema(
  {
    userName: { type: String, required: true },
    mailId: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, required: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    role: { type: String },
  },
  {
    collection: "users",
  }
);

export default model("users", users);
