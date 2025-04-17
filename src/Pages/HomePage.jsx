import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/Foods-collection")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sorted.slice(0, 6));
        setLoading(false);
        console.log(data)
      })
      .catch((err) => {
        console.error("Error fetching foods:", err);
        setError("Failed to load top foods.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home | Food Delivery</title>
        <meta
          name="description"
          content="Delicious meals delivered fast. Discover top-rated meals and enjoy smooth ordering."
        />
      </Helmet>

      {/* Banner */}
      <section
        className="bg-cover bg-center h-[70vh] text-white flex items-center justify-center"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-xl text-center max-w-xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.h1
            className="text-4xl font-bold mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Delicious Meals Delivered Fast
          </motion.h1>
          <motion.p
            className="mb-6"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            Discover top-rated meals loved by foodies around the world. Fast
            delivery, amazing taste!
          </motion.p>
          <Link
            to="/foods"
            className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-semibold transition"
          >
            Explore All Foods
          </Link>
        </motion.div>
      </section>

      {/* Top Foods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-10">
            Top Selling Foods
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 col-span-3">
              Loading top foods...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 col-span-3">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topFoods.map((food) => (
                <motion.div
                  key={food.id}
                  className="bg-white rounded-xl shadow-md p-4 flex flex-col"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={food.foodImage}
                    alt={food.foodName || "Food Image"}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">
                    {food.foodName || "Untitled Dish"}
                  </h3>
                  <p className="text-gray-600 flex-1">
                    {(food.description || "No description available").slice(
                      0,
                      60
                    )}
                    ...
                  </p>
                  <p className="mt-2 font-bold">
                    Price: ${food.price ?? "N/A"}
                  </p>
                  <Link
                    to={`/foods/${food.id}`}
                    className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                  >
                    Details
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <Link
            to="/foods"
            className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
          >
            See All
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-2">
                “The food was fresh, delicious, and on time. Will order again!”
              </p>
              <h4 className="font-bold text-orange-500">– Sarah L.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-2">
                “Top-notch service and the burgers are to die for.”
              </p>
              <h4 className="font-bold text-orange-500">– Daniel K.</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-2">
                “Love the variety and ease of ordering. Highly recommended!”
              </p>
              <h4 className="font-bold text-orange-500">– Maria G.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4">
              <img
                src="/step1.png"
                alt="Browse Menu"
                className="h-24 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">1. Browse Menu</h4>
              <p className="text-gray-600">
                Explore our rich selection of tasty meals and combos.
              </p>
            </div>
            <div className="p-4">
              <img
                src="/step2.png"
                alt="Place Order"
                className="h-24 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">2. Place Order</h4>
              <p className="text-gray-600">
                Choose your favorites, place an order, and relax.
              </p>
            </div>
            <div className="p-4">
              <img
                src="/step3.png"
                alt="Enjoy Food"
                className="h-24 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">3. Enjoy Food</h4>
              <p className="text-gray-600">
                Receive hot, fresh meals right to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
