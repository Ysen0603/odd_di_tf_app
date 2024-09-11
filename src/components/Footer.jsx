import React from 'react';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/3 mb-6 md:mb-0"
          >
            <h3 className="text-2xl font-bold mb-2">ODD DI TF Predictor</h3>
            <p className="text-gray-400">Empowering mental health professionals with AI-driven insights.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-1/3 mb-6 md:mb-0"
          >
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-400">
              <li><a href="/about" className="hover:text-pink-500 transition duration-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-pink-500 transition duration-300">Contact</a></li>
              <li><a href="/privacy" className="hover:text-pink-500 transition duration-300">Privacy Policy</a></li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full md:w-1/3"
          >
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://twitter.com/oddditf" className="text-gray-400 hover:text-pink-500 transition duration-300"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com/company/oddditf" className="text-gray-400 hover:text-pink-500 transition duration-300"><i className="fab fa-linkedin"></i></a>
              <a href="https://github.com/oddditf" className="text-gray-400 hover:text-pink-500 transition duration-300"><i className="fab fa-github"></i></a>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          © 2023 ODD DI TF Predictor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
