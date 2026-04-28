// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
// import resumeRoutes from "./routes/resumeRoutes.js";

// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;

// // CORS FIX
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

// app.use(express.json());

// // Routes
// app.use("/api/auth", userRoutes);
// app.use("/api/resume", resumeRoutes);

// // Static uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // DB
// connectDB();

// // Server start
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "*", // production-safe for now
    credentials: true,
  }),
);

app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API test route
app.get("/api", (req, res) => {
  res.send("API is running");
});

// ================= SERVE FRONTEND (VITE) =================
// IMPORTANT: backend folder → frontend is outside it
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// SPA fallback (React Router fix)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// ================= DB =================
connectDB();

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
