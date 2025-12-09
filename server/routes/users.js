import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET danh sách user
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Tạo user
router.post("/", async (req, res) => {
  const { discordId, name, role } = req.body;
  const user = await User.create({ discordId, name, role });
  res.json(user);
});

// Cập nhật user
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Xóa user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

export default router;
