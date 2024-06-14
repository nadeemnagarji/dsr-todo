import express, { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { UpdateTodo, createTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createTodo);
router.route("/update").patch(verifyJwt, UpdateTodo);

export default router;
