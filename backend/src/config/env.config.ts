import { config as conf } from "dotenv";

conf();

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  REACT_APP_URL: process.env.REACT_APP_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export const _config = Object.freeze(config);
