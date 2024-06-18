import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import Todos, { todoProps } from "../components/Todos";
import { TodoEdit } from "../components/TodoEdit";
import withAuthRedirect from "../components/AuthCheck";

function DashBoard() {
  const [todos, setTodos] = useState([]);
  // const { userData } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  const getTodos = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(typeof accessToken);

    const res = await axios.get(`http://localhost:3000/api/v1/todos/allTodos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data.data);

    setTodos(res.data.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Wrapper>
      <div className="w-[98%] flex flex-col items-center justify-center gap-5 ">
        <h1 className=" text-3xl font-bold"> Todos</h1>
        <TodoEdit
          refreshTodos={getTodos}
          name="Create Todo"
          defaultValue={{ title: "", description: "" }}
        />

        <div className="w-full flex gap-4 justify-center items-center mt-10">
          {todos && todos.length > 0 ? (
            todos.map((todo: todoProps) => {
              return (
                <Todos
                  key={todo._id}
                  todo={{ ...todo }}
                  refreshTodos={getTodos}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center gap-4 font-medium">
              No todos Found
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const ProtectedDashBoard = withAuthRedirect(DashBoard);
export default ProtectedDashBoard;
