import { config as conf } from "dotenv";

conf();

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export const _config = Object.freeze(config);
