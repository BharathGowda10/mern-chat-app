import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("'Please fill all details");
    }
    if (password.length < 8) {
      toast.error("Password should be 8 digits minimum");
    }
    await login(formData);
  };
  return (
    <div className="backgroundImg h-screen w-screen flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full sm:max-w-md xs:max-w-64 p-4 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-3xl font-bold text-white dark:text-white">
            Login To Chat App
          </h5>
          <div>
            <label
              for="email"
              className="block mb-2 text-md font-bold text-white opacity-80 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-md font-medium text-white opacity-80 dark:text-white"
            >
              Your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className=" absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                for="remember"
                className="ms-2 text-sm font-medium text-white opacity-80 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-blue-300 hover:underline dark:text-blue-500"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoggingIn ? <Loader2 /> : "Login to your account"}
          </button>
          <div className="text-sm font-medium text-white opacity-80 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/signup"
              className="text-blue-300 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
