import express from "express";
import dotenv from "dotenv";
import { spawn } from "child_process";
import path from "path";

dotenv.config();
const app = express();

// Khởi chạy API server
import "./server/server.js";

// Tự động chạy bot Discord
const bot = spawn("node", ["./bot/bot.js"], { stdio: "inherit" });

// Render yêu cầu port — phải có
const PORT = process.env.PORT || 10000;
app.get("/", (req, res) => res.send("Clan Storage Server Running"));
app.listen(PORT, () => console.log("🌐 Web server started on port " + PORT));
