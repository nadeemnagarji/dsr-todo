import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

import cors from "cors";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import userRouter from "../src/routes/user.routes.js";
import todoRouter from "../src/routes/todo.routes.js";
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todos", todoRouter);
export default app;
