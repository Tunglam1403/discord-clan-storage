import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  icon: String
});

export default mongoose.model("Item", itemSchema);
