/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/Foods-collection/${id}`
        );
        const data = await response.json();
        setFood(data);
        setLoading(false);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch food details.", "error");
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      foodName: form.foodName.value,
      foodImage: form.image.value,
      category: form.category.value,
      quantity: form.quantity.value,
      price: form.price.value,
      origin: form.origin.value,
      description: form.description.value,
    };

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/Foods-collection/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFood),
      });

      const data = await res.json();
      if (data.modifiedCount > 0) {
        setFood(updatedFood); // Immediately update the UI with new values
        Swal.fire("Updated!", "Food item has been updated.", "success");
        navigate("/my-foods");
      } else {
        Swal.fire("Error", "Failed to update food item.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl text-center font-bold text-orange-600 mb-6">
        Update Food Item
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-500 animate-pulse">
          Loading...
        </p>
      ) : (
        <form onSubmit={handleUpdateFood} className="space-y-6">
          <input
            type="text"
            name="foodName"
            defaultValue={food.foodName}
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Food Name"
          />
          <input
            type="text"
            name="image"
            defaultValue={food.foodImage}
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Food Image URL"
          />
          <input
            type="text"
            name="category"
            defaultValue={food.category}
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Food Category"
          />
          <input
            type="number"
            name="quantity"
            defaultValue={food.quantity}
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Quantity"
          />
          <input
            type="number"
            name="price"
            defaultValue={food.price}
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Price ($)"
          />
          <input
            type="text"
            name="origin"
            defaultValue={food.origin}
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Food Origin"
          />
          <textarea
            name="description"
            rows="4"
            className="w-full p-3 border border-orange-300 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-orange-500"
            placeholder="Short Description"
            defaultValue={food.description}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-lime-500 text-white font-bold py-3 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Food Item"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateFood;
