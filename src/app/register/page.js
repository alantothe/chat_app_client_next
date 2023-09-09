"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUserThunk } from "../redux/features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const error = useSelector((state) => state.user.error);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar:
      "https://res.cloudinary.com/dzjr3skhe/image/upload/v1687213143/alan_photos/alan-photo-pixelicious_iknzvi.png",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUserThunk(formData));
  };
  //based of truthy or falsy from state
  useEffect(() => {
    if (loggedInUser) {
      console.log(loggedInUser);
    }
    if (error) {
      console.error("Error registering user:", error);
    }
  }, [loggedInUser, error]);

  return (
    <div className="bg-purple-700 min-h-screen flex items-center justify-center">
      <section className="bg-gray-800 p-10 rounded-lg w-96">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-10 text-white">Register Page</h1>
          <h3 className="text-white mb-5">Welcome to Alan_Chat</h3>
        </header>
        <form className="flex flex-col item-center" onSubmit={handleSubmit}>
          <input
            className="text-black mb-5"
            placeholder="Enter First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          ></input>
          <input
            className="text-black mb-5"
            placeholder="Enter Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          ></input>
          <input
            className="text-black mb-5"
            placeholder="Enter Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>

          <input
            className="text-black mb-5"
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>
          <input
            className="text-black mb-5"
            placeholder="Confirm Password"
            type="password"
          ></input>
          <button
            type="submit"
            className="bg-purple-700 text-white rounded px-5 py-2 mb-6 w-full text-bold"
          >
            Register
          </button>
        </form>
        <footer className="text-center">
          <h3
            className="text-white mb-5  cursor-pointer font-bold"
            onClick={() => router.push("/login")}
          >
            Login?
          </h3>
        </footer>
      </section>
    </div>
  );
};

export default RegisterPage;
