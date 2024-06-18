import { useState, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import axios from "axios";
import Wrapper from "../components/Wrapper.tsx";
import { Button } from "../components/ui/button.tsx";
import toast from "react-hot-toast";

interface UserProps {
  email: string;
  username: string;
  password: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (user.email.trim() === "") {
      toast.error("please enter email");
      return;
    }
    if (user.password.trim() === "") {
      toast.error("please enter password");
      return;
    }
    try {
      e.preventDefault();
      setLoader(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          ...user,
        }
      );
      console.log(res);

      if (res.data.data.accessToken) {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Wrapper>
      <div className="  max-sm:w-2/3 w-1/2  lg:w-1/4  py-10 px-5 rounded-md gap-10  bg-slate-300 flex  flex-col justify-center items-center">
        <h1 className=" text-3xl font-semibold mt-5 ">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className=" max-w-1/2 w-full   flex flex-col gap-2 justify-center items-center "
        >
          <Input
            placeholder="Email "
            name="email"
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="username "
            name="username"
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <Button className="bg-green-500 w-full rounded py-1 " type="submit">
            Sign Up
          </Button>
          <p>{loader && <p>registering User in ....</p>}</p>
          <NavLink to={"/login"}>click here to login</NavLink>
        </form>
      </div>
    </Wrapper>
  );
}
