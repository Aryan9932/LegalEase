import express from 'express';
import { registerComplaint, getAllComplaints } from '../controllers/complaint.controller.js';

const router = express.Router();

router.post('/registercomplaint', registerComplaint);
router.get('/getcomplaint', getAllComplaints);

export default router;
