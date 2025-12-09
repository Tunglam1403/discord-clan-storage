import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Lấy toàn bộ request
router.get("/", async (req, res) => {
  const list = await Request.find().populate("user").populate("item");
  res.json(list);
});

// Tạo yêu cầu xin đồ
router.post("/", async (req, res) => {
  const { user, item, quantity, status } = req.body;
  const reqData = await Request.create({
    user,
    item,
    quantity,
    status: status || "pending",
    createdAt: new Date()
  });
  res.json(reqData);
});

// Cập nhật (duyệt / từ chối)
router.put("/:id", async (req, res) => {
  const updated = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Xóa
router.delete("/:id", async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.json({ message: "Request deleted" });
});

export default router;
