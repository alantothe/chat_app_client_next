"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUserThunk } from "../../redux/features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
import { resetError } from "@/redux/features/user/userSlice";
import { useDropzone } from "react-dropzone";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

const RegisterPage = () => {
  //button logic still needs work
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [showIncompleteFormError, setShowIncompleteFormError] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
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
  const isFormValid = () => {
    // checking for empty values in formData
    const formValues = Object.values(formData);
    return formValues.every((value) => value !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      setShowIncompleteFormError(true);
      return;
    }
    dispatch(registerUserThunk(formData));
  };
  //based of truthy or falsy from state
  useEffect(() => {
    if (loggedInUser) {
      window.location.href = "/dashboard";
    }
    if (error) {
      console.error("Error registering user:", error);
    }
  }, [loggedInUser, error]);

  useEffect(() => {
    if (error) {
      setShowServerError(true);
      const timer = setTimeout(() => {
        dispatch(resetError());
        setShowServerError(false);
        setShowIncompleteFormError(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <section className="bg-[#0C162D] opacity-95 p-4 rounded-lg w-96">
        <header className=" justify-start">
          <h3 className="font-mono text-sm text-white opacity-50 justify-start">
            Welcome to Chattothe!
          </h3>
          <h3 className="mb-4 font-mono text-sm text-white opacity-50 justify-start">
            Let's begin the adventure
          </h3>
        </header>
        <form className="flex flex-col item-center" onSubmit={handleSubmit}>
          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Enter your email*{" "}
          </label>
          <input
            className="text-white mb-5 font-mono text-sm  p-1 outline-none bg-inherit border-2 border-[#0E2E70] rounded-md "
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Enter your first name*{" "}
          </label>
          <input
            className="text-white mb-5 font-mono text-sm  p-1 outline-none bg-inherit border-2 border-[#0E2E70] rounded-md "
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          ></input>
          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Enter your last name*{" "}
          </label>
          <input
            className="text-white mb-5 font-mono text-sm  p-1 outline-none bg-inherit border-2 border-[#0E2E70] rounded-md "
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          ></input>
          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Create a password*{" "}
          </label>

          <input
            className="text-white mb-5 font-mono text-sm  p-1 outline-none bg-inherit border-2 border-[#0E2E70] rounded-md "
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          ></input>

          <label className="text-[#00CFC8] font-mono font-bold text-sm">
            Upload your avatar:
          </label>
          <div
            {...getRootProps()}
            className={`dropzone relative cursor-pointer mt-4 ${
              isDragActive ? "dropzoneActive" : ""
            } border-4 border-[#0E2E70] border-opacity-50 rounded-md bg-[#0C162D] p-4 text-center`}
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
              <p className="font-mono text-sm text-white opacity-50">
                Drop the files here ...
              </p>
            ) : (
              <p className="font-mono text-sm text-white opacity-50">
                Drag and drop some files here, or{" "}
                <span className=" underline">click</span> to select files
              </p>
            )}
            {formData.avatar !==
              "https://res.cloudinary.com/dzjr3skhe/image/upload/v1687213143/alan_photos/alan-photo-pixelicious_iknzvi.png" && (
              <div className="mt-2 text-center text-white font-bold"></div>
            )}
          </div>
          <Popover>
            <PopoverHandler>
              <button
                type="submit"
                className="border-2 border-white cursor-pointer hover:border-green-500 hover:text-green-500 mt-2 text-white opacity-50 rounded px-5 py-2 w-full font-bold"
                onClick={() => {
                  if (!isFormValid()) {
                    setShowIncompleteFormError(true);
                  }
                }}
              >
                Register
              </button>
            </PopoverHandler>
            {showServerError && <PopoverContent>{error}</PopoverContent>}
            {showIncompleteFormError && !showServerError && (
              <PopoverContent>
                {"Please fill out the form completely."}
              </PopoverContent>
            )}
          </Popover>
        </form>
        <footer>
          <h1 className="font-mono text-sm text-white opacity-50 text-center pt-5">
            Already have an account? <span> Sign in</span>
          </h1>
        </footer>
      </section>
    </div>
  );
};

export default RegisterPage;
