"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUserThunk } from "../../redux/features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const error = useSelector((state) => state.user.error);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUserThunk(formData));
  };

  useEffect(() => {
    if (loggedInUser) {
      window.location.href = "/dashboard";
    }
    if (error) {
      console.error("Error registering user:", error);
    }
  }, [loggedInUser, error]);
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <section className="bg-[#0C162D] opacity-95 p-4 rounded-lg w-96">
        <header className=" justify-start">
          <h1 className="font-mono text-sm text-white opacity-50 justify-start">
            Login Page
          </h1>
          <h3 className="mb-4 font-mono text-sm text-white opacity-50 justify-start">
            Welcome Back to Chattothe!
          </h3>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col item-center">
          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Enter your email*{" "}
          </label>
          <input
            className="text-white mb-5 font-mono text-sm  p-1 outline-none bg-inherit border-2 border-[#0E2E70] rounded-md"
            placeholder="Enter E-Mail"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>

          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Enter your password*{" "}
          </label>
          <input
            className="text-white mb-5 font-mono text-sm  p-1 outline-none bg-inherit border-2 border-[#0E2E70] rounded-md"
            placeholder="Enter Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>

          <button
            type="submit"
            className="border-2 border-white cursor-pointer hover:border-green-500 hover:text-green-500 mt-2 text-white opacity-50 rounded px-5 py-2 w-full font-bold"
          >
            Login
          </button>
        </form>
        <footer className="text-center">
          <h3
            className="text-white mb-5 text-purple-700 cursor-pointer font-bold"
            onClick={() => router.push("/register")}
          >
            Register?
          </h3>
        </footer>
      </section>
    </div>
  );
};

export default LoginPage;
