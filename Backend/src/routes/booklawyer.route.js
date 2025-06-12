import express from 'express';
import { bookLawyer } from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/book', bookLawyer);

export default router;
