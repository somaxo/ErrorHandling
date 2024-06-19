import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [regError, setRegError] = useState("");

  const onSubmit = async (data) => {
    try {
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
    }
  };

  const password = watch("password", "");

  const adjustGap = errors ? "-mt-3" : "mt-6";

  return (
    <div className="bg-gray-200">
      <Toaster position="top-center" />
      <section>
        <div className=" relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className=" bg-white w-full h-96 rounded-lg max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
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

              {/* <input
                value="https://jamstacker.studio/thankyou"
                type="hidden"
                name="_redirect"
              /> */}
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label
                    htmlFor="password"
                    className="block mb-3 text-sm font-medium text-gray-600 text-left pl-5 "
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
                    type="password"
                    placeholder="******"
                    className={`block w-11/12 m-auto px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm ${
                      errors.password ? "border-red-500" : "border-black"
                    } font-semibold mt-3 outline-0 `}
                  />
                  {errors.password && (
                    <p className=" text-red-500 text-start text-[10px] w-11/12 mx-5 mt-1 h-2 ">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-3 text-sm font-medium text-gray-600 text-left pl-5"
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
                    <p className="text-red-500 text-start text-[10px] w-11/12 mx-5 mt-1 h-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-11/12 m-auto px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black mt-3"
                  >
                    Submit your request
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
