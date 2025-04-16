import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Foods-collection")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      });
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = foods.filter((food) =>
      food.foodName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFoods(filtered);
  };

  return (
    <div className="mt-20 px-4">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-10 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-lg shadow-2xl"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide drop-shadow-lg">
          All Foods
        </h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-10 text-center"
      >
        <input
          type="text"
          placeholder="Search food by name..."
          value={searchText}
          onChange={handleSearch}
          className="border border-gray-300 rounded-full px-5 py-3 w-full max-w-md text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </motion.div>

      {/* Food Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12"
      >
        {filteredFoods.map((food) => (
          <motion.div
            key={food._id}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{
              scale: 1.03,
              transition: { ease: "easeInOut", duration: 0.5 },
            }}
            className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200 via-white to-pink-100 
              hover:from-purple-200 hover:to-yellow-100 transition-all duration-500 ease-in 
              p-4 rounded-2xl shadow-lg hover:shadow-[0_10px_30px_rgba(236,72,153,0.6)] overflow-hidden"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {food.foodName}
              </h2>
              <p className="text-gray-600">Category: {food.category}</p>
              <p className="text-gray-600">Price: {food.price}</p>
              <p className="text-gray-500 text-sm">
                Purchased: {food.purchaseCount} times
              </p>

              <Link to={`/food/${food._id}`}>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    background: [
                      "linear-gradient(45deg, #ff0080, #7928ca)",
                      "linear-gradient(45deg, #7928ca, #ff0080)",
                    ],
                    transition: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 1.5,
                    },
                  }}
                  className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-md"
                >
                  Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Foods;
