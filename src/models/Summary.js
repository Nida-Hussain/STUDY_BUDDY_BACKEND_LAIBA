import mongoose from 'mongoose';

const summarySchema = mongoose.Schema(
  {
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    mode: { type: String, enum: ['short', 'detailed'], default: 'detailed' },
  },
  { timestamps: true }
);

export default mongoose.model('Summary', summarySchema);