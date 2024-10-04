import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <div className="text-4xl mb-4 bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
