import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);

// uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API test
app.get("/api", (req, res) => {
  res.send("API is running");
});

// ================= FRONTEND (VITE) =================
const clientPath = path.resolve(__dirname, "../frontend/dist");

app.use(express.static(clientPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ================= DB =================
connectDB();

// ================= START =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
