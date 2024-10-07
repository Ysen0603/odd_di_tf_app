import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCoins } from 'react-icons/fa';

const PricingPlan = ({ name, coins, price, features, isPopular, onPurchase }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -10 }}
      className={`bg-stone-100 rounded-md p-8 shadow-white shadow-md  ${
        isPopular ? 'border-2 border-yellow-700' : 'border border-black'
      }`}
    >
      {isPopular && (
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold absolute top-0 right-0 transform translate-x-2 -translate-y-2">
          Popular
        </span>
      )}
      <h3 className="text-2xl mb-4 text-black font-semibold">{name}</h3>
      <p className="text-5xl mb-6 text-black font-semibold flex items-center justify-center">
        <FaCoins className="mr-2 text-yellow-700" /> {coins}
      </p>
      <p className="text-xl text-black font-semibold mb-8">${price}</p>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-black font-semibold">
            <FaCheck className="w-5 h-5 mr-3 text-purple-800" />
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-black text-white font-bold py-3 px-4 rounded-full transition duration-300 hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-cyan-900 focus:ring-opacity-50"
        onClick={onPurchase}
      >
        Purchase
      </motion.button>
    </motion.div>
  );
};

export default PricingPlan;