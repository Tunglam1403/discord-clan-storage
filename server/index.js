import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const viewsPath = path.join(process.cwd(), "server", "views");
app.use("/static", express.static(viewsPath));
app.get("/dashboard", (req, res) => res.sendFile(path.join(viewsPath, "dashboard.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(viewsPath, "dashboard.html")));

// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("🍃 MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ROUTES
import items from "./routes/items.js";
import requests from "./routes/requests.js";
import users from "./routes/users.js";

app.use("/items", items);
app.use("/requests", requests);
app.use("/users", users);

export default app;
