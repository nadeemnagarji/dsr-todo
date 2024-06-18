import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function Navbar() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  const handleLogout = async () => {
    console.log(accessToken);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      console.log(res.data.statusCode);

      if (res.data.statusCode === 200) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-[95%] mt-4 items-center justify-start flex justify-between  bg-gray-300 py-2 rounded-md px-4 ">
      <p className="text-3xl font-bold text-gray-700">Todo App</p>
      {accessToken && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-400 rounded-md text-lg font-medium"
        >
          logout
        </button>
      )}
    </div>
  );
}
