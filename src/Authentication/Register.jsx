import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase/Firebase.init";
import AuthContext from "../Provider/AuthContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/animations/register.json";
import Swal from "sweetalert2"; // Import SweetAlert2

const Register = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

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

    if (!validatePassword(form.password)) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
        form.photoURL,
        form.displayName
      );
      const users = {
        email: form.email,
        password: form.password,
        photoURL: form.photoURL,
        displayName: form.displayName,
      }

      createUser(userCredential.user); 
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
      }); 

      
      Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "Go to Home",
      }).then(() => {
        navigate("/"); 
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          <h2 className="text-2xl font-bold text-center text-indigo-100 mb-6">
            Register😋😋
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.displayName}
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
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
