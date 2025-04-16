import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/Foods-collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        console.log(data);
      });
  }, [id]);

  if (!food) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={food.foodImage}
        alt={food.foodName}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-gray-800"
          animate={{
            textShadow: [
              "0px 0px 0px #000",
              "0px 0px 8px #8b5cf6",
              "0px 0px 0px #000",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {food.foodName}
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Category: {food.category}
        </motion.p>

        <motion.p
          className="text-gray-600 text-lg"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Price: ${food.price}
        </motion.p>

        <p className="text-gray-500 text-md">
          Description: {food.description || "No description provided."}
        </p>

        <motion.p
          className="text-indigo-700 font-semibold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2 }}
        >
          Purchased: {food.purchaseCount ?? 0} times
        </motion.p>

        <motion.button
          onClick={() => navigate(`/purchase/${food._id}`)}
          whileHover={{
            scale: 1.1,
            backgroundColor: "#7C3AED",
            transition: { duration: 0.3 },
          }}
          animate={{
            boxShadow: [
              "0 0 0px #7C3AED",
              "0 0 12px #7C3AED",
              "0 0 0px #7C3AED",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-4 px-6 py-3 rounded-full bg-purple-600 text-white font-bold shadow-md"
        >
          Purchase
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SingleFood;
