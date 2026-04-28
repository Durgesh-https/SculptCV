// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";

// import path from "path";
// import { fileURLToPath } from "url";
// import resumeRoutes from "./routes/resumeRoutes.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT;

// app.use(cors());

// app.use(express.json());

// app.use('/api/auth', userRoutes);
// app.use('/api/resume', resumeRoutes);

// app.use(
//   '/uploads',
//   express.static(path.join(__dirname, 'uploads'), {
//     setHeaders: (res, _path) => {
//       res.set("Access-Control-Allow-Origin", "http://localhost:5173")
//     }
//   })
// )

// app.get("/", (req, res) => {
//   res.send("This is from server side.");
// });

// connectDB();
// app.listen(PORT, () => {
//   console.log(`Server is running on port:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS FIX
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Server is running");
});

// DB
connectDB();

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
