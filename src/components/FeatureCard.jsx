import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="bg-gradient-to-br from-blue-100 to-purple-200 p-6 rounded-xl shadow-lg"
    >
      <div className="text-4xl mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-purple-600">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
