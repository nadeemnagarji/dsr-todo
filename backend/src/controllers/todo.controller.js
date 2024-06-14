import { todos } from "../models/todo.models.js";
import { asyncHandleer } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createTodo = asyncHandleer(async (req, res) => {
  const { title, description } = req.body;
  const id = req.user._id;

  const todo = await todos.create({ title, description, createdBy: id });

  if (!todo) {
    throw new ApiError(500, "unable to create a todo");
  }

  console.log(todo);
  return res
    .status(201)
    .json(new ApiResponse(201, todo, "todo created succesfully"));
});

export const UpdateTodo = asyncHandleer(async (req, res) => {
  const id = req.user._id;

  const todo = await todos.findOneAndUpdate(
    { createdBy: id },
    { title: req.body?.title, description: req.body?.description }
  );

  if (!todo) {
    throw new ApiError(500, "unable to update a todo");
  }

  console.log(todo);
  return res
    .status(201)
    .json(new ApiResponse(201, todo, "todo updated succesfully"));
});
