import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AuthContext from "../Provider/AuthContext";

const FoodPurchasePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/Foods-collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFoodName(data.foodName || "");
        const cleanPrice =
          typeof data.price === "string"
            ? data.price.replace(/[^\d.]/g, "")
            : data.price;
        setPrice(cleanPrice || "");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load food data.");
      });
  }, [id]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    const purchaseInfo = {
      foodName,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      buyerName: user.displayName,
      buyerEmail: user.email,
      buyingDate: Date.now(),
    };
    // const purchase-Count = {

    // }

    const res = await fetch("http://localhost:5000/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchaseInfo),
    });

    if (res.ok) {
      toast.success("Purchase successful!");
      setQuantity("");

      await fetch(`http://localhost:5000/Foods-collection/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ incrementCount: 1 }),
      });
    } else {
      toast.error("Failed to complete purchase.");
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        Food Purchase
      </motion.h2>

      <form onSubmit={handlePurchase} className="space-y-4">
        {[foodName, price, quantity, user.displayName, user.email].map(
          (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {i === 0 && (
                <input
                  type="text"
                  placeholder="Food Name"
                  value={foodName}
                  readOnly
                  className="w-full p-3 border rounded-xl"
                />
              )}
              {i === 1 && (
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  readOnly
                  className="w-full p-3 border rounded-xl"
                />
              )}
              {i === 2 && (
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full p-3 border rounded-xl"
                />
              )}
              {i === 3 && (
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full p-3 border rounded-xl bg-gray-100"
                />
              )}

              {i === 4 && (
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-3 border rounded-xl bg-gray-100"
                />
              )}
            </motion.div>
          )
        )}

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Purchase
        </motion.button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default FoodPurchasePage;
