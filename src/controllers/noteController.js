import Note from '../models/Note.js';

export const uploadNote = async (req, res) => {
  const { title, category, tags } = req.body;
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }
  const mockFileUrl = `https://mock-files.com/${Date.now()}-${req.file.originalname}`;
  const note = await Note.create({
    title,
    fileUrl: mockFileUrl,
    fileType: req.file.mimetype,
    cloudinaryPublicId: 'mock_' + Date.now(),
    category,
    tags: tags ? JSON.parse(tags) : [],
    user: req.user._id,
  });
  res.status(201).json(note);
};

export const getUserNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort('-createdAt');
  res.json(notes);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }
  await note.deleteOne();
  res.json({ message: 'Note removed' });
};