import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);