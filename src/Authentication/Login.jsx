import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animations/login.json";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../Firebase/Firebase.init";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to home...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        title: "Logged in with Google!",
        text: "Redirecting to home...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      Swal.fire({
        title: "Google Login Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 w-full rounded-lg bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300 pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 mt-2"
            >
              Log In
            </button>
          </form>

          {/* Google Login */}
          <div className="mt-4 text-center">
            <p className="text-white/70 mb-2">Or login with</p>
            <button
              onClick={handleGoogleLogin}
              className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Continue with Google
            </button>
          </div>

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
