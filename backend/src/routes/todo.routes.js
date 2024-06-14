import express, { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  UpdateTodo,
  createTodo,
  allTodos,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.route("/create").post(verifyJwt, createTodo);
router.route("/update/:todoId").patch(verifyJwt, UpdateTodo);
router.route("/allTodos").get(verifyJwt, allTodos);
router.route("/delete/:todoId").delete(verifyJwt, deleteTodo);

export default router;
