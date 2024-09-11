import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header({ user }) {
  return (
    <motion.header
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg"
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          <span className="text-pink-500">ODD</span>
          <span className="text-purple-500">DI</span>
          <span className="text-blue-500">TF</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/profile" className="text-white hover:text-pink-500 transition duration-300">
                Profile
              </Link>
            </motion.div>
          )}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/predict" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
              Try It Now
            </Link>
          </motion.div>
          {user ? (
            <span className="text-white">Welcome, {user.username}</span>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/login" className="text-white hover:text-pink-500 transition duration-300">
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;
