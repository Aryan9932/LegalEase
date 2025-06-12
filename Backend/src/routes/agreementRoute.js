import express from 'express';
import { generateAgreement } from '../controllers/agreementController.js';

const router = express.Router();
router.post('/generate', generateAgreement);
export default router;
