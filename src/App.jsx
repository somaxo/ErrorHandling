import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaRegEyeSlash } from "react-icons/fa";
import "./App.css";
import "./Components/Loader.jsx";
import Loader from "./Components/Loader.jsx";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [regError, setRegError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://form-handling.onrender.com/api/v1/auth/register",
        data
      );
      console.log(res);
      if (res.status == 201) {
        toast.success("Password Updated");
        reset();
      }
    } catch (error) {
      console.log(error);
      setRegError(error.response.data.message);
      setLoading(false);
    }
  };

  const password = watch("password", "");

  const adjustGap = errors ? "-mt-3" : "mt-6";

  const toggleEye = () => {
    setShow(!show);
  };

  const toggleShow = show ? "text" : "password";

  return (
    <div className="bg-gray-200 h-full">
      <section>
        <div className=" relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className=" bg-white w-full h-[580px] rounded-lg max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black mt-5 mb-2">
                  Reset password
                </h2>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={`${adjustGap}`}>
              {regError && (
                <p className={`text-red-500 font-semibold`}>{regError}</p>
              )}

              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label
                    htmlFor="firstname"
                    className="block -mb-2 text-sm font-medium text-gray-600 text-left pl-5 "
                  >
                    First name
                  </label>
                  <input
                    {...register("firstname", {
                      required: "firstname is required",
                      pattern: {
                        message: "Please fill in firstname",
                      },
                    })}
                    id="firstname"
                    type="text"
                    placeholder="John"
                    className={`block w-11/12 m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.firstname ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />
                  {errors.firstname && (
                    <p className=" text-red-500 text-start text-[12px] w-11/12 mx-5 mt-1 h-2 ">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="last name"
                    className="block -mb-2 text-sm font-medium text-gray-600 text-left pl-5 "
                  >
                    Lastname
                  </label>
                  <input
                    {...register("lastname", {
                      required: "lastname is required",
                      pattern: {
                        message: "Please fill in lastname",
                      },
                    })}
                    id="lastname"
                    type="text"
                    placeholder="Doe"
                    className={`block w-11/12 m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.lastname ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />
                  {errors.lastname && (
                    <p className=" text-red-500 text-start text-[12px] w-11/12 mx-5 mt-1 h-2 ">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
                <div className="col-span-full relative">
                  <label
                    htmlFor="password"
                    className="block -mb-2 text-sm font-medium text-gray-600 text-left pl-5 "
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
                      },
                    })}
                    id="password"
                    type={`${toggleShow}`}
                    placeholder="******"
                    className={`block w-11/12 m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />

                    onClick={toggleEye}
                    className="absolute right-10 top-10 "
                  />

                  {errors.password && (
                    <p className=" text-red-500 text-start text-[12px] w-11/12 mx-5 mt-1 h-2 ">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-gray-600 text-left pl-5"
                  >
                    Confirm password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: " Confirm your password",

                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    id="confirmPassword"
                    type="password"
                    placeholder="******"
                    className="block w-11/12 m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-start text-[12px] w-11/12 mx-5 mt-1 h-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-11/12 m-auto px-6 py-2.5 text-center text-black duration-200 bg-blue-300 border-2 border-blue-300 rounded-full nline-flex hover:bg-transparent hover:border-blue-300 hover:text-black focus:outline-none focus-visible:outline-blue-300 text-sm focus-visible:ring-black mt-3"
                  >
                    {loading ? <Loader /> : "Submit your request"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
