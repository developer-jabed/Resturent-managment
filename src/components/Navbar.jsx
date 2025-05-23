import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../Provider/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setProfileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkClasses =
    "relative hover:text-green-500 transition duration-300 transform hover:scale-105 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-green-500 after:transition-all after:duration-300";

  const loginButtonClasses =
    "px-4 py-1 border border-orange-500 text-orange-500 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 hover:border-green-500";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="text-xl text-orange-400 font-bold">🍔 FoodiesHub</div>

        <nav className="hidden md:flex items-center font-bold text-[#ffb508] gap-6">
          <Link
            to="/"
            className={`${linkClasses} ${
              isActive("/") ? "text-green-600 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/foods"
            className={`${linkClasses} ${
              isActive("/foods") ? "text-green-600 font-semibold" : ""
            }`}
          >
            All Foods
          </Link>
          <Link
            to="/gallery"
            className={`${linkClasses} ${
              isActive("/gallery") ? "text-green-600 font-semibold" : ""
            }`}
          >
            Gallery
          </Link>

          {user ? (
            <div className="relative profile-dropdown">
              <img
                src={user.photoURL}
                alt={user.displayName || "User Profile"}
                className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
              />
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border border-gray-200 z-50"
                  >
                    <Link
                      to="/my-foods"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Foods
                    </Link>
                    <Link
                      to="/add-food"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Add Food
                    </Link>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logOut();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth/login" className={loginButtonClasses}>
              Login
            </Link>
          )}
          <motion.button
            onClick={toggleTheme}
            initial={false}
            animate={{
              backgroundColor: theme === "dark" ? "#4B5563" : "#F3F4F6",
            }}
            className="w-14 h-8 flex items-center px-1 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer transition-colors"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center ${
                theme === "dark"
                  ? "ml-auto bg-white text-black"
                  : "mr-auto bg-gray-800 text-white"
              }`}
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m8.485-8.485h-1M4.515 12.515h-1M16.95 7.05l-.707-.707M7.757 16.243l-.707-.707M16.95 16.95l-.707.707M7.757 7.757l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3c.132 0 .263.005.393.014a9.001 9.001 0 100 17.972A9 9 0 0112 3z"
                  />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </nav>

        <button
          className="md:hidden text-orange-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="fixed top-0 left-0 w-3/4 min-h-screen overflow-y-auto bg-white shadow-lg p-6 z-40 md:hidden"
          >
            <div className="flex flex-col gap-6 text-lg text-orange-500">
              <Link
                to="/"
                className={`hover:text-green-500 ${
                  isActive("/") ? "text-green-600 font-semibold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/foods"
                className={`hover:text-green-500 ${
                  isActive("/foods") ? "text-green-600 font-semibold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                All Foods
              </Link>
              <Link
                to="/gallery"
                className={`hover:text-green-500 ${
                  isActive("/gallery") ? "text-green-600 font-semibold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>

              {user ? (
                <>
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User Profile"}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <Link
                    to="/my-foods"
                    className="text-left hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    My Foods
                  </Link>
                  <Link
                    to="/add-food"
                    className="text-left hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/my-orders"
                    className="text-left hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                      setIsOpen(false);
                    }}
                    className="px-4 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className={loginButtonClasses}
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
              <motion.button
                onClick={toggleTheme}
                initial={false}
                animate={{
                  backgroundColor: theme === "dark" ? "#4B5563" : "#F3F4F6",
                }}
                className="w-14 h-8 flex items-center px-1 rounded-full border border-gray-300 dark:border-gray-600 cursor-pointer transition-colors"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center ${
                    theme === "dark"
                      ? "ml-auto bg-white text-black"
                      : "mr-auto bg-gray-800 text-white"
                  }`}
                >
                  {theme === "dark" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m8.485-8.485h-1M4.515 12.515h-1M16.95 7.05l-.707-.707M7.757 16.243l-.707-.707M16.95 16.95l-.707.707M7.757 7.757l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3c.132 0 .263.005.393.014a9.001 9.001 0 100 17.972A9 9 0 0112 3z"
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
