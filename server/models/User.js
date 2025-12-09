import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  discordId: String,
  name: String,
  role: { type: String, default: "member" }
});

export default mongoose.model("User", userSchema);
