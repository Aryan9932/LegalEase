import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import lawyerRoutes from "./routes/lawyer.routes.js";
import agreementRoutes from "./routes/agreementRoute.js";
import complaintRoutes from "./routes/complaint.route.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // ✅ Only this is needed

// Test route
app.get("/", (req, res) => {
  res.send("Hello from AI Law Assistant 👨‍⚖️");
});

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/complaint", complaintRoutes);
app.use("/api/agreements", agreementRoutes);

export default app;
