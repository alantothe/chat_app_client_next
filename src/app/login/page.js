"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUserThunk } from "../redux/features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
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
    router.push("/dashboard");
  };
  return (
    <div className="bg-purple-700 min-h-screen flex items-center justify-center">
      <section className="bg-gray-800 p-10 rounded-lg w-96">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-10 text-white">Login Page</h1>
          <h3 className="text-white mb-5">Welcome Back to Alan_Chat</h3>
        </header>
        <form onClick={handleSubmit} className="flex flex-col item-center">
          <input
            className="text-black mb-5"
            placeholder="Enter E-Mail"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>

          <input
            className="text-black mb-5"
            placeholder="Enter Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <button
            type="submit"
            className="bg-purple-700 text-white rounded px-5 py-2 mb-6 w-full"
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
