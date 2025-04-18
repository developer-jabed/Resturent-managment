/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Provider/AuthContext";
import Swal from "sweetalert2"; // Import SweetAlert2

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch("https://resturent-managment-server-side.vercel.app/Foods-collection");
      const data = await response.json();
      const userFoods = data.filter(
        (food) => food.email === user.email
      );
      setFoods(userFoods);
      console.log(userFoods)
      setLoading(false);
    };

    fetchFoods();
  }, [user.email]);

  // Handle Delete Food (optional)
  const handleDeleteFood = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this food item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://resturent-managment-server-side.vercel.app/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.deletedCount === 1) {
          Swal.fire("Deleted!", "Your food item has been deleted.", "success");
          setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
        } else {
          Swal.fire("Error", "Failed to delete food item.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="my-16">
      <h2 className="text-4xl text-center font-bold text-orange-500 mb-8">
        My Food Items
      </h2>
      {loading ? (
        <p className="text-center text-orange-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {foods.length === 0 ? (
            <p className="text-center text-orange-600">
              You haven't added any food items yet!
            </p>
          ) : (
            foods.map((food) => (
              <div
                key={food._id}
                className="max-w-xs mx-auto bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-orange-600">
                  {food.foodName}
                </h3>
                <p className="text-sm text-gray-600">
                  Category: {food.category}
                </p>
                <p className="text-sm text-gray-600">Price: ${food.price}</p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/update-food/${food._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteFood(food._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
