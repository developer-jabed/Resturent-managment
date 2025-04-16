import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import AuthContext from "../Provider/AuthContext";
import { toast, ToastContainer } from "react-toastify";
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
    const confirm = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/purchase/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Order deleted!");
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        toast.error("Failed to delete order.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting order.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md p-5 rounded-xl border relative"
            >
              <div className="flex gap-4 items-center mb-4">
                {order.foodImage && (
                  <img
                    src={order.foodImage}
                    alt={order.foodName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{order.foodName}</h3>
                  <p className="text-gray-600">Price: ${order.price}</p>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Food Owner: {order.buyerName}</p>
                  <p className="text-gray-500 text-sm">
                    Ordered:{" "}
                    {moment(order.buyingDate).format("MMMM Do YYYY, h:mm A")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(order._id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MyOrders;
