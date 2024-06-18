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
  const { todoId } = req.params;

  const todo = await todos.findOneAndUpdate(
    { _id: todoId },
    { title: req.body?.title, description: req.body?.description }
  );
  console.log(todo);
  if (!todo) {
    throw new ApiError(500, "unable to update a todo");
  }
  const updatedTodo = await todos.find({ todoId });
  //console.log(todo);
  return res
    .status(201)
    .json(new ApiResponse(201, updatedTodo, "todo updated succesfully"));
});

export const allTodos = asyncHandleer(async (req, res) => {
  const id = req.user._id;
  const allTodos = await todos.find({ createdBy: id });

  if (!allTodos) {
    throw new ApiError(500, "unable to find all todos for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allTodos, "fetched todos successfully"));
});

export const deleteTodo = asyncHandleer(async (req, res) => {
  const { todoId } = req.params;
  console.log(todoId, "this is todoId");
  const todo = await todos.findOneAndDelete({ _id: todoId });
  console.log(todo);
  if (!todo) {
    throw new ApiError(500, "unable to delete a todo");
  }
  const updatedTodo = await todos.find({ todoId });
  //console.log(todo);
  return res
    .status(201)
    .json(new ApiResponse(201, updatedTodo, "todo deleted succesfully"));
});
