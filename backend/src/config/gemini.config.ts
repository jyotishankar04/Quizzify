import { GoogleGenerativeAI } from "@google/generative-ai";
import { _config } from "./env.config";

const genAI = new GoogleGenerativeAI(_config.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
  systemInstruction:
    "You are a quiz ai. Your name is Quizer. You generate quizzes based on the user's input.",
});

export { model };
