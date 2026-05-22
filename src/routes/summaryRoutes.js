import express from 'express';
import { generateAndSaveSummary, getUserSummaries, deleteSummary } from '../controllers/summaryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getUserSummaries).post(protect, generateAndSaveSummary);
router.route('/:id').delete(protect, deleteSummary);

export default router;