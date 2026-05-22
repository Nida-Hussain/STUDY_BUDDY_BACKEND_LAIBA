import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSummary = async (text, mode) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt =
    mode === 'short'
      ? `Summarize the following study material in 3-4 short bullet points:\n${text}`
      : `Summarize this study material in student-friendly language. Use headings, bullet points, and key takeaways:\n${text}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateQuiz = async (text) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Generate 5 multiple choice questions and 5 true/false questions from this content. 
  Format as JSON: { "questions": [ { "text": "question", "type": "mcq", "options": ["opt1","opt2","opt3","opt4"], "correctAnswer": "opt1" }, 
  { "text": "statement", "type": "truefalse", "options": ["True","False"], "correctAnswer": "True" } ] }
  Content: ${text}`;
  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const jsonMatch = raw.match(/\{.*\}/s);
  return JSON.parse(jsonMatch[0]);
};