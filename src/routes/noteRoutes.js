import express from 'express';
import multer from 'multer';
import { uploadNote, getUserNotes, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.route('/').get(protect, getUserNotes).post(protect, upload.single('file'), uploadNote);
router.route('/:id').delete(protect, deleteNote);

export default router;