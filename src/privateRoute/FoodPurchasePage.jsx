/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import AuthContext from "../Provider/AuthContext";

const FoodPurchasePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [availableQty, setAvailableQty] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [isOwnItem, setIsOwnItem] = useState(false);

  useEffect(() => {
    fetch(`https://resturent-managment-server-side.vercel.app/Foods-collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFoodName(data.foodName || "");
        const cleanPrice =
          typeof data.price === "string"
            ? data.price.replace(/[^\d.]/g, "")
            : data.price;
        setPrice(cleanPrice || "");
        setAvailableQty(data.quantity || 0);
        setSellerEmail(data.sellerEmail || "");
        setIsOwnItem(data.sellerEmail === user.email);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load food data.");
      });
  }, [id, user.email]);

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (quantity > availableQty) {
      toast.error("You can't purchase more than the available quantity.");
      return;
    }

    const purchaseInfo = {
      foodName,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      buyerName: user.displayName,
      buyerEmail: user.email,
      buyingDate: Date.now(),
    };

    fetch("https://resturent-managment-server-side.vercel.app/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(purchaseInfo),
    });

    await fetch(`https://resturent-managment-server-side.vercel.app/Foods-collection/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ incrementCount: 1 }),
    });
  
    toast.success("Purchase successful!");
  };

  const isOutOfStock = availableQty === 0;

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

      {(isOwnItem || isOutOfStock) && (
        <div className="mb-4 text-red-600 font-medium text-center">
          {isOwnItem
            ? "You can't purchase your own added item."
            : "This item is currently out of stock."}
        </div>
      )}

      <form onSubmit={handlePurchase} className="space-y-4">
        <input
          type="text"
          value={foodName}
          readOnly
          className="w-full p-3 border rounded-xl"
        />
        <input
          type="number"
          value={price}
          readOnly
          className="w-full p-3 border rounded-xl"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val <= availableQty) {
              setQuantity(val);
            } else {
              toast.warn(`Max available quantity is ${availableQty}`);
            }
          }}
          required
          min={1}
          max={availableQty}
          disabled={isOutOfStock || isOwnItem}
          className="w-full p-3 border rounded-xl"
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full p-3 border rounded-xl bg-gray-100"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full p-3 border rounded-xl bg-gray-100"
        />

        <motion.button
          type="submit"
          disabled={isOutOfStock || isOwnItem}
          className={`w-full py-3 rounded-xl transition text-white ${
            isOutOfStock || isOwnItem
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          whileHover={{ scale: isOutOfStock || isOwnItem ? 1 : 1.05 }}
          whileTap={{ scale: isOutOfStock || isOwnItem ? 1 : 0.95 }}
        >
          Purchase
        </motion.button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default FoodPurchasePage;
