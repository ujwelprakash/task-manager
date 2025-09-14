import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ================== MIDDLEWARE ==================
// Allow cross-origin requests (React frontend -> Node backend)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-manager-6e72s5q1k-ujwelprakashs-projects.vercel.app", // old frontend (optional)
      "https://task-manager-rho-ecru.vercel.app", // ✅ new working frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Parse incoming JSON requests
app.use(express.json());

// Parse URL-encoded data (for forms, optional but good practice)
app.use(express.urlencoded({ extended: true }));

// ================== ROUTES ==================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ================== ERROR HANDLER (optional) ==================
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ================== SERVER START ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
