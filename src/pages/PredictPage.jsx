import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function PredictPage() {
  const [text, setText] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/predict', { text });
      setPredictions(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-100"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-extrabold mb-8 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            ODD DI TF Predictor
          </span>
        </motion.h1>
        
        <motion.form
          onSubmit={handleSubmit}
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            className="w-full px-4 py-3 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
          ></textarea>
          <motion.button
            type="submit"
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || text.trim() === ''}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Analyzing...' : 'Analyze Text'}
          </motion.button>
        </motion.form>
        
        {predictions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {['ODD', 'DI', 'TF'].map((category) => (
              <motion.div
                key={category}
                className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-xl font-semibold text-purple-600 mb-3">{category}</h2>
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
      </div>
    </motion.div>
  );
}

export default PredictPage;
