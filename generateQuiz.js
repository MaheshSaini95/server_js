// generateQuiz.js
import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateQuiz = async () => {
  const prompt = `
Generate 20 multiple-choice general knowledge questions focused on India. Format the result as a JSON array:
[
  {
    "question": "Question text?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Correct option"
  },
  ...
]`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const message = res.choices[0]?.message?.content?.trim();

    // Try parsing JSON from the response
    const jsonStart = message.indexOf("[");
    const jsonEnd = message.lastIndexOf("]");
    const jsonString = message.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Quiz generation failed:", err);
    return [];
  }
};
