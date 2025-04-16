/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AuthContext from "../Provider/AuthContext";
import Swal from "sweetalert2"; // Import SweetAlert2

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newFood = {
      foodName: form.foodName.value,
      foodImage: form.image.value,
      category: form.category.value,
      quantity: form.quantity.value,
      price: form.price.value,
      origin: form.origin.value,
      description: form.description.value,
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("http://localhost:5000/Foods-collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFood),
      });

      const data = await res.json();
      if (data.insertedId) {
        // Show SweetAlert on successful addition
        Swal.fire({
          icon: "success",
          title: "Food Item Added!",
          text: "The food item has been added successfully.",
          confirmButtonText: "OK",
        });

        // Reset form after successful submission
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to add food item.",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mt-24 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-orange-50 via-yellow-100 to-pink-100 border border-orange-200"
    >
      <motion.h2
        className="text-4xl font-bold text-center text-orange-500 mb-10"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        🍜 Add a Food Item
      </motion.h2>

      <form onSubmit={handleAddFood} className="space-y-6 text-orange-600">
        <FloatingInput name="foodName" label="Food Name" />
        <FloatingInput name="image" label="Food Image URL" />
        <FloatingInput name="category" label="Food Category" />

        <div className="grid grid-cols-2 gap-4">
          <FloatingInput name="quantity" label="Quantity" type="number" />
          <FloatingInput name="price" label="Price ($)" type="number" />
        </div>

        <FloatingInput name="origin" label="Food Origin (Country)" />

        <div>
          <label className="block text-sm font-semibold mb-1">
            Short Description
          </label>
          <motion.textarea
            name="description"
            rows="4"
            required
            whileFocus={{ scale: 1.01 }}
            className="w-full p-3 border border-orange-300 rounded-md resize-none focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Describe ingredients, making procedure, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Added By</label>
          <input
            type="text"
            value={user.displayName}
            disabled
            className="w-full input input-bordered border border-orange-200 bg-orange-50 text-orange-800"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Added By</label>
          <input
            type="text"
            value={user.email}
            disabled
            className="w-full input input-bordered border border-orange-200 bg-orange-50 text-orange-800"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-300"
        >
          {loading ? "Adding..." : "✨ Add Item"}
        </motion.button>
      </form>
    </motion.div>
  );
};

const FloatingInput = ({ name, label, type = "text" }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      id={name}
      required
      className="peer w-full px-3 pt-5 pb-2 text-sm border border-orange-300 rounded-md text-orange-800 bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <label
      htmlFor={name}
      className="absolute left-3 top-2 text-sm text-orange-400 transition-all 
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-orange-500 
        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-orange-300"
    >
      {label}
    </label>
  </div>
);

export default AddFood;
