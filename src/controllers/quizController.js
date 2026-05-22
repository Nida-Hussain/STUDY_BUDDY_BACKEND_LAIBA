import QuizAttempt from '../models/QuizAttempt.js';
import Note from '../models/Note.js';

export const generateQuizQuestions = async (req, res) => {
  const { noteId } = req.body;
  const note = await Note.findOne({ _id: noteId, user: req.user._id });
  if (!note) {
    res.status(404);
    throw new Error('Note not found');
  }
  const mockQuiz = {
    questions: [
      { text: "What is the capital of France?", type: "mcq", options: ["Berlin", "Madrid", "Paris", "Lisbon"], correctAnswer: "Paris" },
      { text: "JavaScript is a compiled language.", type: "truefalse", options: ["True", "False"], correctAnswer: "False" },
      { text: "Which HTML tag is used for an unordered list?", type: "mcq", options: ["<ul>", "<ol>", "<li>", "<list>"], correctAnswer: "<ul>" },
      { text: "React is maintained by Meta.", type: "truefalse", options: ["True", "False"], correctAnswer: "True" },
    ]
  };
  res.json(mockQuiz);
};

export const submitQuizAttempt = async (req, res) => {
  const { noteId, questions, userAnswers, timeTaken } = req.body;
  let score = 0;
  questions.forEach((q, idx) => {
    if (q.correctAnswer === userAnswers[idx]) score++;
  });
  const totalQuestions = questions.length;
  const attempt = await QuizAttempt.create({
    noteId,
    user: req.user._id,
    questions,
    userAnswers,
    score,
    totalQuestions,
    timeTaken,
  });
  res.status(201).json({ attempt, score, totalQuestions });
};

export const getQuizHistory = async (req, res) => {
  const attempts = await QuizAttempt.find({ user: req.user._id }).populate('noteId', 'title').sort('-createdAt');
  res.json(attempts);
};

export const deleteQuizAttempt = async (req, res) => {
  const attempt = await QuizAttempt.findById(req.params.id);
  if (!attempt || attempt.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Quiz attempt not found');
  }
  await attempt.deleteOne();
  res.json({ message: 'Quiz attempt deleted' });
};