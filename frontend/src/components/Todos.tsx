import { TodoEdit } from "./TodoSecondEdit";
import { Button } from "./ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export type todoProps = {
  _id: string;
  title: string;
  description: string;
};

interface TodosProps {
  todo: todoProps;
  refreshTodos: () => void;
}

const Todos: React.FC<TodosProps> = ({ todo, refreshTodos }) => {
  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/todos/delete/${todo._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken} `,
          },
        }
      );
      console.log(res);

      if (res.data.data) {
        refreshTodos();
        navigate("/dashboard");
        setLoader(false);
      }
    } catch (error) {
      console.log(error.response);

      toast.error(error.response.data.message);
    }
  };

  return (
    <div className=" w-[200px] flex flex-col gap-2 bg-purple-300 rounded-md py-4 px-2 gap-2">
      <h1 className=" text-center text-xl font-medium">
        {todo.title.toUpperCase()}
      </h1>
      <p className=" mt-4">{todo.description}</p>

      <div className="w-full flex items-center justify-between mt-4">
        <TodoEdit
          name="Edit"
          defaultValue={{
            title: todo.title,
            description: todo.description,
            id: todo._id,
          }}
          refreshTodos={refreshTodos}
        />
        <Button onClick={handleDelete} variant={"destructive"}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Todos;
