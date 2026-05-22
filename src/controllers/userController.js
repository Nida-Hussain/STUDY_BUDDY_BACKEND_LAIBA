// import User from '../models/User.js';
// import cloudinary from '../config/cloudinary.js';
// import Note from '../models/Note.js';
// import Summary from '../models/Summary.js';
// import QuizAttempt from '../models/QuizAttempt.js';
// import { Readable } from 'stream';

// export const updateProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) user.password = req.body.password;
//     const updatedUser = await user.save();
//     res.json({ name: updatedUser.name, email: updatedUser.email });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// };

// export const uploadAvatar = async (req, res) => {
//   if (!req.file) {
//     res.status(400);
//     throw new Error('No file uploaded');
//   }
//   const result = await new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: 'studybuddy_avatars' },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     const readableStream = new Readable();
//     readableStream.push(req.file.buffer);
//     readableStream.push(null);
//     readableStream.pipe(uploadStream);
//   });
//   const user = await User.findById(req.user._id);
//   user.avatar = result.secure_url;
//   await user.save();
//   res.json({ avatar: user.avatar });
// };

// export const getUserStats = async (req, res) => {
//   const totalUploads = await Note.countDocuments({ user: req.user._id });
//   const totalQuizzes = await QuizAttempt.countDocuments({ user: req.user._id });
//   const totalSummaries = await Summary.countDocuments({ user: req.user._id });
//   const progress = Math.min(100, (totalUploads + totalQuizzes + totalSummaries) * 2);
//   res.json({ totalUploads, totalQuizzes, totalSummaries, progress });
// };
import User from '../models/User.js';
import Note from '../models/Note.js';
import Summary from '../models/Summary.js';
import QuizAttempt from '../models/QuizAttempt.js';

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.rollNumber = req.body.rollNumber || user.rollNumber;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) user.password = req.body.password;
    const updatedUser = await user.save();
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      rollNumber: updatedUser.rollNumber,
      phoneNumber: updatedUser.phoneNumber,
      feeStatus: updatedUser.feeStatus,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export const updateFeeStatus = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.feeStatus = 'Paid';
    await user.save();
    res.json({ feeStatus: user.feeStatus, message: 'Fee submitted successfully (demo)' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export const uploadAvatar = async (req, res) => {
  // For hackathon – mock avatar upload
  res.json({ avatar: 'https://via.placeholder.com/100' });
};

export const getUserStats = async (req, res) => {
  const totalUploads = await Note.countDocuments({ user: req.user._id });
  const totalQuizzes = await QuizAttempt.countDocuments({ user: req.user._id });
  const totalSummaries = await Summary.countDocuments({ user: req.user._id });
  const progress = Math.min(100, (totalUploads + totalQuizzes + totalSummaries) * 5);
  res.json({ totalUploads, totalQuizzes, totalSummaries, progress });
};