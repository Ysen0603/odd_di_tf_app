import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import PricingPlan from '../components/PricingPlan';

function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-100"
    >
      <motion.section variants={itemVariants} className="text-center mb-16">
        <h1 className="text-6xl font-extrabold mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            ODD DI TF Predictor
          </span>
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-700">
          Harness the power of AI to predict Oppositional Defiant Disorder, Disruptive Impulse-Control, and Thought Function with unparalleled accuracy.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/predict" className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:from-blue-500 hover:to-purple-600">
            Start Predicting Now
          </Link>
        </motion.div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">Our Cutting-Edge Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🧠"
            title="Neural Network Analysis"
            description="Our advanced AI uses state-of-the-art neural networks to analyze complex behavioral patterns."
          />
          <FeatureCard
            icon="📊"
            title="Real-time Data Processing"
            description="Process and analyze large datasets in real-time for immediate insights and predictions."
          />
          <FeatureCard
            icon="🔒"
            title="Secure Encryption"
            description="Your data is protected with military-grade encryption, ensuring complete privacy and security."
          />
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {['Input Data', 'AI Analysis', 'Get Results'].map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">
                {index + 1}
              </div>
              <p className="text-lg font-semibold text-gray-700">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingPlan
            name="Basic"
            price={49}
            features={[
              "100 predictions/month",
              "Basic analytics",
              "Email support"
            ]}
          />
          <PricingPlan
            name="Pro"
            price={99}
            features={[
              "Unlimited predictions",
              "Advanced analytics",
              "Priority support",
              "API access"
            ]}
            isPopular={true}
          />
          <PricingPlan
            name="Enterprise"
            price={249}
            features={[
              "Custom integration",
              "Dedicated account manager",
              "On-premise deployment option",
              "24/7 phone support"
            ]}
          />
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="text-center">
        <h2 className="text-4xl font-bold mb-8 text-purple-600">Ready to revolutionize your predictions?</h2>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/predict" className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:from-blue-500 hover:to-purple-600">
            Get Started Now
          </Link>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}

export default HomePage;
