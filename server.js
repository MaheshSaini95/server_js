// server.js
import express from "express";
import cors from "cors";
import { generateQuiz } from "./generateQuiz.js";

const app = express();
app.use(cors());

let cachedQuiz = [];
let lastGenerated = null;

app.get("/api/todays-quiz", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  if (lastGenerated !== today) {
    console.log("Generating new quiz for today...");
    cachedQuiz = await generateQuiz();
    lastGenerated = today;
  }

  res.json(cachedQuiz);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Quiz API running on port ${PORT}`));
