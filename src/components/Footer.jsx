import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-black text-white shadow-lg py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/3 mb-6 md:mb-0"
          >
            <h3 className="text-2xl font-bold mb-2">ODD DI TF Predictor</h3>
            <p className="text-white">Empowering mental health professionals with AI-driven insights.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-1/3 mb-6 md:mb-0"
          >
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-white">
              <li><a href="/about" className="hover:text-white transition duration-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition duration-300">Contact</a></li>
              <li><a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a></li>
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
              <a href="https://twitter.com/oddditf" className="text-white hover:text-white transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com/company/oddditf" className="text-white hover:text-white transition duration-300">
                <FaLinkedin size={24} />
              </a>
              <a href="https://github.com/oddditf" className="text-white hover:text-white transition duration-300">
                <FaGithub size={24} />
              </a>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-yellow-800 mt-8 pt-8 text-sm text-center text-white">
          <p>© 2023 ODD DI TF Predictor. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" /> by the ODD DI TF team
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;