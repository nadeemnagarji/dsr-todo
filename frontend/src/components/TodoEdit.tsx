import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import axios from "axios";
interface todoProps {
  title: string;
  description: string;
}
interface TodoEditProps {
  refreshTodos: () => void;
  name: string;
  defaultValue: {
    title?: string;
    description?: string;
  };
}

export function TodoEdit({ refreshTodos, name, defaultValue }: TodoEditProps) {
  const [todo, setTodo] = useState<todoProps>({ title: "", description: "" });
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    console.log(todo);
  };

  const handleSubmit = async () => {
    if (todo.title.trim() === "") {
      toast.error("please enter email");
      return;
    }
    if (todo.description.trim() === "") {
      toast.error("please enter password");
      return;
    }
    console.log(todo);

    const accessToken = localStorage.getItem("accessToken");
    try {
      setLoader(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/todos/create",
        {
          ...todo,
        },
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
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">{name}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="w-full flex flex-col bg-slate-300 gap-2 px-2 py-2 rounded-sm">
          <Input
            onChange={handleChange}
            type="text"
            name="title"
            defaultValue={defaultValue.title}
            placeholder="Title"
          />
          <Input
            onChange={handleChange}
            type="text"
            name="description"
            defaultValue={defaultValue.description}
            placeholder="Description"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={loader}>
            Add Todo
          </AlertDialogAction>
          {loader && <p>Creating todo...</p>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
