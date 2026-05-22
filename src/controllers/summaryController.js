import Summary from '../models/Summary.js';
import Note from '../models/Note.js';

export const generateAndSaveSummary = async (req, res) => {
  const { noteId, mode } = req.body;
  const note = await Note.findOne({ _id: noteId, user: req.user._id });
  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }
  const mockSummary = `📝 ${mode.toUpperCase()} SUMMARY of "${note.title}":\n\nThis is a placeholder summary. Replace with real AI (Gemini/OpenAI) for production.\n\nKey points:\n- Uploaded file: ${note.fileUrl}\n- Category: ${note.category}\n- Use real API key to get actual summaries.`;
  const summary = await Summary.create({
    noteId: note._id,
    user: req.user._id,
    content: mockSummary,
    mode,
  });
  res.status(201).json(summary);
};

export const getUserSummaries = async (req, res) => {
  const summaries = await Summary.find({ user: req.user._id }).populate('noteId', 'title').sort('-createdAt');
  res.json(summaries);
};

export const deleteSummary = async (req, res) => {
  const summary = await Summary.findById(req.params.id);
  if (!summary || summary.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Summary not found');
  }
  await summary.deleteOne();
  res.json({ message: 'Summary deleted' });
};