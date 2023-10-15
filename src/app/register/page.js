"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUserThunk } from "../../redux/features/user/userThunks";
import { useSelector, useDispatch } from "react-redux";
import { resetError } from "@/redux/features/user/userSlice";
import { useDropzone } from "react-dropzone";
import ParticlesBackground from "../../../ParticlesBackground/ParticlesBackground";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Spinner,
} from "@material-tailwind/react";

const RegisterPage = () => {
  //button logic still needs work
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [popoverMessage, setPopoverMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
  });
  // Dropzone configuration for avatar uploads
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      setIsUploading(true); // Set the uploading state to true when the upload starts

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

        setFormData((prevState) => ({
          ...prevState,
          avatar: data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading the image:", error);
      } finally {
        setIsUploading(false); // Set the uploading state to false once the upload is done
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
  // Function to validate if the form is filled out
  const isFormValid = () => {
    // checking for empty values in formData
    const formValues = Object.values(formData);
    return formValues.every((value) => value !== "");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      setPopoverMessage("Please fill out the form completely.");
      return;
    }
    // Clear any existing messages before dispatch
    setPopoverMessage("");
    dispatch(registerUserThunk(formData));
  };

  useEffect(() => {
    if (loggedInUser) {
      setPopoverMessage(""); // Clear any messages
      router.push("/dashboard");
    }
  }, [loggedInUser]);
  // Handle errors: display in a popover and reset after a delay
  useEffect(() => {
    if (error) {
      setPopoverMessage(error);
      const timer = setTimeout(() => {
        dispatch(resetError());
        setPopoverMessage("");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div>
      <ParticlesBackground />
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
              {isUploading ? (
                <Spinner />
              ) : formData.avatar ? (
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
                  <span className="underline">click</span> to select files
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
                >
                  Register
                </button>
              </PopoverHandler>
              {popoverMessage && (
                <PopoverContent>{popoverMessage}</PopoverContent>
              )}
            </Popover>
          </form>
          <footer>
            <h1 className="font-mono text-sm text-white opacity-50 text-center pt-5">
              Already have an account?{" "}
              <span
                className="text-white opacity-100 hover:underline cursor-pointer"
                onClick={() => {
                  setPopoverMessage("");
                  router.push("/login");
                }}
              >
                Sign in
              </span>
            </h1>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
