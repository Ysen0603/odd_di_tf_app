import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaCoins, FaPaperPlane } from 'react-icons/fa';

function PredictPage({ updateUser }) {
  const [text, setText] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coins, setCoins] = useState(3);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const response = await axiosInstance.get('/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCoins(response.data.coins);
        updateUser({ coins: response.data.coins });
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };
    fetchCoins();
  }, [updateUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/predict', { text });
      setPredictions(response.data);
      setCoins(response.data.remaining_coins);
      updateUser({ coins: response.data.remaining_coins });
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.detail || "An error occurred");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          ODD DI TF Predictor
        </motion.h1>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-lg">
            <FaCoins className="text-yellow-500 mr-2" />
            <span className="text-lg font-semibold text-gray-800">Coins: {coins}</span>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mb-8 bg-white rounded-xl shadow-2xl p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <textarea
            className="w-full px-4 py-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
          ></textarea>
          <motion.button
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading || text.trim() === '' || coins <= 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <FaRobot className="animate-spin mr-2" />
            ) : (
              <FaPaperPlane className="mr-2" />
            )}
            {isLoading ? 'Analyzing...' : 'Predict'}
          </motion.button>
        </motion.form>
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence>
          {predictions && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              {['ODD', 'DI', 'TF'].map((category) => (
                <motion.div
                  key={category}
                  className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <h2 className="text-2xl font-bold text-indigo-600 mb-4">{category}</h2>
                  <ul className="space-y-2">
                    {predictions[category].map((pred, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{pred.class}</span>
                        <span className="text-sm px-2 py-1 bg-blue-500 text-white rounded-full">
                          {(pred.probability * 100).toFixed(2)}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default PredictPage;