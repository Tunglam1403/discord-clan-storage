import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  quantity: Number,
  status: { type: String, default: "pending" },
  createdAt: Date
});

export default mongoose.model("Request", requestSchema);
