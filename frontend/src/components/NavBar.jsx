import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const NavBar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const handleLogOut = () => {
    logout();
  };
  return (
    <header data-theme={theme}>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Chat App
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/setting">
              <button
                type="button"
                className="text-white xs:hidden sm:block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                <span className="flex items-center">
                  <Settings className="size-5 mr-1" />
                  Settings
                </span>
              </button>
            </Link>
            {authUser ? (
              <>
                <Link to="/profile">
                  <button
                    type="button"
                    className="text-white xs:hidden sm:block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    <span className="flex items-center">
                      <User className="size-5 mr-1" />
                      Profile
                    </span>
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="flex items-center gap-2 w-24 text-white xs:hidden sm:block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  <span className="flex items-center">
                    <LogOut className="size-5 mr-1" />
                    Logout
                  </span>
                </button>
              </>
            ) : null}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
