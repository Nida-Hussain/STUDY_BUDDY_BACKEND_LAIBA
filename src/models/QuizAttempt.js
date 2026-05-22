import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: String,
  type: { type: String, enum: ['mcq', 'truefalse'], default: 'mcq' },
  options: [String],
  correctAnswer: String,
});

const quizAttemptSchema = mongoose.Schema(
  {
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [questionSchema],
    userAnswers: [String],
    score: { type: Number, default: 0 },
    totalQuestions: { type: Number, required: true },
    timeTaken: { type: Number, default: 0 }, // seconds
  },
  { timestamps: true }
);

export default mongoose.model('QuizAttempt', quizAttemptSchema);