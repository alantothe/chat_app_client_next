"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUserThunk } from "../../redux/features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const error = useSelector((state) => state.user.error);
  const [disableButton, setDisableButton] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
  });

 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      // Upload to Cloudinary
      const uploadData = new FormData();
      uploadData.append("file", acceptedFiles[0]);
      uploadData.append("upload_preset", "fzfav2ym");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dzjr3skhe/image/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );
        const data = await response.json();

        // Update formData.avatar with the secure_url from Cloudinary
        setFormData((prevState) => ({
          ...prevState,
          avatar: data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    },
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
      router.push("/dashboard");
    }
    if (error) {
      console.error("Error registering user:", error);

      setDisableButton(false);
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
          <label className="text-white font-bold mt-4">
            Upload your avatar:
          </label>
          <div
            {...getRootProps()}
            className={`dropzone relative mt-4 ${
              isDragActive ? "dropzoneActive" : ""
            } border-2 border-purple-500 rounded-md bg-purple-200 p-4 text-center`}
          >
            <input {...getInputProps()} />
            {formData.avatar ? (
              <div className="mx-auto w-36 h-36 rounded-full overflow-hidden">
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
            {formData.avatar !==
              "https://res.cloudinary.com/dzjr3skhe/image/upload/v1687213143/alan_photos/alan-photo-pixelicious_iknzvi.png" && (
              <div className="mt-2 text-center text-white font-bold">
                Use this Avatar?
              </div>
            )}
          </div>
          <button
            type="submit"
            // disabled={disableButton}
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
