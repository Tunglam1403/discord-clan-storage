import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// GET tất cả item
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// POST tạo item mới
router.post("/", async (req, res) => {
  const { name, icon } = req.body;
  const item = await Item.create({ name, icon });
  res.json(item);
});

// UPDATE item
router.put("/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// DELETE item
router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

export default router;
