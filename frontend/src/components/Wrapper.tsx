import Navbar from "../components/Navbar";

export default function Wrapper({ children }) {
  return (
    <div className=" w-full items-center h-screen flex flex-col  bg-white">
      <Navbar />
      <div className="w-full mt-4 bg-white flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}
