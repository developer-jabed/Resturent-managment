import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animations/login.json"; // ✅ Make sure you have a Lottie JSON file
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row items-center gap-8"
      >
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome Back 👋
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 mt-2"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-white/70">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-yellow-300 underline cursor-pointer hover:text-yellow-200"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
