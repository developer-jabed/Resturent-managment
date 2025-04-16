/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import AuthContext from "../Provider/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/purchase?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load orders.");
        });
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/purchase/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Order deleted successfully!");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
      } else {
        toast.error("Failed to delete the order.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting the order.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h2
        className="text-4xl font-bold text-center mb-10 text-indigo-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Orders
      </motion.h2>

      {orders.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No orders found.
        </motion.p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              className="bg-white shadow-lg p-5 rounded-2xl border hover:shadow-xl transition-shadow relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex gap-4 items-center mb-4">
                {order.foodImage && (
                  <img
                    src={order.foodImage}
                    alt={order.foodName}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                )}
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {order.foodName}
                  </h3>
                  <p className="text-gray-600">💲 Price: ${order.price}</p>
                  <p className="text-gray-600">📦 Quantity: {order.quantity}</p>
                  <p className="text-gray-600">
                    👤 Food Owner: {order.buyerName}
                  </p>
                  <p className="text-sm text-gray-400">
                    🕒 {moment(order.buyingDate).format("MMMM Do YYYY, h:mm A")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(order._id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                title="Delete"
              >
                🗑️
              </button>
            </motion.div>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MyOrders;
