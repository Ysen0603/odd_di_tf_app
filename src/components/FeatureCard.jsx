import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
    whileHover={{ scale: 1.05, rotateY: 5 }}
    className="bg-stone-100  shadow-white shadow-md p-6 rounded-xl  "
  >
    <div className="mb-4 bg-white text-yellow-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{title}</h3>
    <p className="text-black font-semibold text-center">{description}</p>
  </motion.div>
  
  );
};

export default FeatureCard;