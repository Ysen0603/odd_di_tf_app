import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCoins } from 'react-icons/fa';

const PricingPlan = ({ name, coins, price, features, isPopular, onPurchase }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className={`bg-white rounded-2xl p-8 shadow-xl ${
        isPopular ? 'border-4 border-blue-500' : 'border border-gray-200'
      }`}
    >
      
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{name}</h3>
      <p className="text-5xl font-bold mb-6 text-blue-600 flex items-center justify-center">
        <FaCoins className="mr-2 text-yellow-500" /> {coins}
      </p>
      <p className="text-xl text-gray-600 mb-8">${price}</p>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <FaCheck className="w-5 h-5 mr-3 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={onPurchase}
      >
        Purchase
      </motion.button>
    </motion.div>
  );
};

export default PricingPlan;