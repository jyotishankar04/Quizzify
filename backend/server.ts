import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { _config } from "./src/config/env.config";
import globalErrorHandler from "./src/middlewares/global-error-handler";
import clientRouter from "./src/modules/client/index";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = _config.PORT;

app.get("/", (req, res): any => {
  return res.status(200).json({ status: "Welcome to Quiz Forge" });
});
app.get("/health-check", (req, res): any => {
  return res.status(200).json({ status: "UP" });
});

app.use("/api/v1", clientRouter);

app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
