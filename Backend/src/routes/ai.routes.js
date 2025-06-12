import express from "express";
import { getLawResponse } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/ask", getLawResponse);

export default router;
