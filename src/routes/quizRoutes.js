import express from 'express';
import { generateQuizQuestions, submitQuizAttempt, getQuizHistory, deleteQuizAttempt } from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateQuizQuestions);
router.post('/submit', protect, submitQuizAttempt);
router.get('/history', protect, getQuizHistory);
router.delete('/:id', protect, deleteQuizAttempt);

export default router;