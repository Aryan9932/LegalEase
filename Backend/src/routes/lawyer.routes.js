import express from "express";

import { addLawyer, getAllLawyers } from '../controllers/lawyer.controller.js';

const router = express.Router();

router.post("/addlawyer", addLawyer);           // POST /api/lawyers/addlawyer
router.get("/getlawyers", getAllLawyers);            // GET  /api/lawyers/getlawyers

export default router;
