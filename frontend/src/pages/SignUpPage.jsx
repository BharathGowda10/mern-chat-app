import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, password, email } = formData;
    if (!fullName || !password || !email) {
      return toast.error(" Please fill all the details");
    }
    if (password.length < 8) {
      return toast.error("Password should be 8 digits minimun");
    }
    await signup(formData);
  };
  return (
    <div className="backgroundImg h-screen w-screen flex justify-center">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className=" relative z-10 sm:max-w-md xs:max-w-64 w-full mt-6 py-7">
        <form onSubmit={handleSubmit} className="mt-20">
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-md font-medium text-white opacity-80 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="name@flowbite.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-white opacity-80 dark:text-white"
            >
              Your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>
          <div className="mb-5">
            <label
              for="full-name"
              className="block mb-2 text-sm font-medium text-white opacity-80 dark:text-white"
            >
              Your FullName
            </label>
            <input
              type="text"
              id="full-name"
              value={formData.fullName}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="terms"
              className="ms-2 text-sm font-medium text-white opacity-80 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-300 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSigningUp}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isSigningUp ? <Loader2 /> : "Register new account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
