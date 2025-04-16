// eslint-disable-next-line no-unused-vars
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import food1 from "../assets/images/image1.jpg";
import food2 from "../assets/images/image2.jpg";
import food3 from "../assets/images/image3.jpg";
import food4 from "../assets/images/image4.jpg";
import food5 from "../assets/images/image5.jpg";
import food6 from "../assets/images/image6.jpg";
import food7 from "../assets/images/image7.jpg";
import food8 from "../assets/images/image8.jpg";
import food9 from "../assets/images/image9.jpg";
import food10 from "../assets/images/image10.jpg";

const images = [
  { src: food1, foodImage: food1, foodName: "Burger Delight" },
  { src: food2, foodImage: food2, foodName: "Sushi Supreme" },
  { src: food3, foodImage: food3, foodName: "Pasta Perfection" },
  { src: food4, foodImage: food4, foodName: "Pizza Bliss" },
  { src: food5, foodImage: food5, foodName: "Salad Fresh" },
  { src: food6, foodImage: food6, foodName: "Taco Fiesta" },
  { src: food7, foodImage: food7, foodName: "Grilled Chicken" },
  { src: food8, foodImage: food8, foodName: "Noodle Nirvana" },
  { src: food9, foodImage: food9, foodName: "Biryani Bash" },
  { src: food10, foodImage: food10, foodName: "Steak Sensation" },
];

const Gallery = () => {
  const [index, setIndex] = useState(-1);

  return (
    <div className="mt-20 px-4 max-w-6xl mx-auto text-center">
      {/* Page Title */}
      <motion.h1
        className="text-5xl font-extrabold text-center text-orange-600 bg-gradient-to-r from-orange-100 via-white to-orange-100 py-6 mb-10 rounded-xl shadow-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Delicious Gallery
      </motion.h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setIndex(i)}
          >
            <img
              src={image.foodImage}
              alt={image.foodName}
              className="w-full h-52 object-cover rounded-xl mb-2"
            />
            <p className="font-medium text-lg">{image.foodName}</p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((img) => ({ src: img.src }))}
      />
    </div>
  );
};

export default Gallery;
