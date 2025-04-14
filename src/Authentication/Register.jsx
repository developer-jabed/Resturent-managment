import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase/Firebase.init"; // Ensure Firebase is initialized correctly
import AuthContext from "../Provider/AuthContext"; // Assuming you have this context set up for user management
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import animationData from "../assets/animations/login.json"; // Path to your Lottie animation file

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext); // context function to store user if needed

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must include at least one uppercase letter.");
      return false;
    }
    if (!hasLowercase) {
      toast.error("Password must include at least one lowercase letter.");
      return false;
    }
    if (!isValidLength) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate password
    if (!validatePassword(form.password)) return;

    try {
      // Register the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // Update profile if a photo URL is provided
      if (form.photoURL) {
        await updateProfile(userCredential.user, {
          displayName: form.name,
          photoURL: form.photoURL,
        });
      } else {
        await updateProfile(userCredential.user, {
          displayName: form.name,
        });
      }

  
      createUser(userCredential.user);

      
      navigate("/");

      // Display a success toast
      toast.success("Account created successfully!");
    } catch (error) {
      // Handle errors (e.g., if the email is already in use)
      toast.error(error.message);
    }
  };

  // Lottie animation options

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-full md:w-1/2">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Register
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL (optional)"
              value={form.photoURL}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-indigo-500 underline hover:text-indigo-700"
            >
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
