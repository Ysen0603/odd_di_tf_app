import React from 'react';
import { motion } from 'framer-motion';

const PricingPlan = ({ name, price, features, isPopular }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className={`bg-gradient-to-br from-blue-100 to-purple-200 rounded-xl p-6 shadow-lg ${
        isPopular ? 'border-2 border-blue-400' : ''
      }`}
    >
      {isPopular && (
        <div className="text-blue-600 font-semibold mb-2">Most Popular</div>
      )}
      <h3 className="text-2xl font-bold text-purple-600 mb-2">{name}</h3>
      <p className="text-4xl font-bold text-gray-800 mb-4">
        ${price}
        <span className="text-gray-600 text-base">/month</span>
      </p>
      <ul className="text-gray-700 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center">
            <span className="text-blue-500 mr-2">✓</span> {feature}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Choose Plan
      </motion.button>
    </motion.div>
  );
};

export default PricingPlan;
