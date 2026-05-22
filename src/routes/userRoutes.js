import express from 'express';
import multer from 'multer';
import { updateProfile, uploadAvatar, getUserStats, updateFeeStatus } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.put('/update-profile', protect, updateProfile);
router.put('/upload-avatar', protect, upload.single('avatar'), uploadAvatar);
router.get('/stats', protect, getUserStats);
router.post('/pay-fee', protect, updateFeeStatus);   // new route

export default router;