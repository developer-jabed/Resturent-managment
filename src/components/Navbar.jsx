import React, { useState, useEffect, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import { Link, useLocation } from "react-router-dom";
import AuthContext from "../Provider/AuthContext";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useContext(AuthContext); // Using context to get the user and logOut function
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* Logo */}
        <div className="text-xl text-orange-400 font-bold">🍔 FoodiesHub</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center font-bold text-[#ffb508] gap-6">
          <Link to="/ho" className={linkClasses}>
            Home
          </Link>
          <Link to="/foods" className={linkClasses}>
            All Foods
          </Link>
          <Link to="/gallery" className={linkClasses}>
            Gallery
          </Link>

          {user ? (
            <>
              <img
                src={user.photoURL}
                alt={user.displayName || "User Profile"}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={logOut}
                className="px-4 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className={loginButtonClasses}>
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
       
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-6 z-40 md:hidden"
          >
            <div className="flex flex-col gap-6 text-lg">
              <a
                href="#home"
                className="hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#foods"
                className="hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                All Foods
              </a>
              <a
                href="#gallery"
                className="hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                Gallery 
              </a>
              
              {user ? (
                <>
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User Profile"}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <button
                    onClick={logOut}
                    className="px-4 py-1 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth/login" className={loginButtonClasses}>
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
