import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import PricingPlan from '../components/PricingPlan';
import axiosInstance from '../axiosConfig';
import aiBackground from '../assets/ai-background.jpg';
import FeatureCard from '../components/FeatureCard';
import { FaRocket } from 'react-icons/fa';

function HomePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [purchasedCoins, setPurchasedCoins] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handlePurchase = async (coins) => {
    try {
      const response = await axiosInstance.post('/purchase-coins', { coins: coins });
      if (response.data.success) {
        setPurchasedCoins(coins);
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error purchasing coins:', error);
      alert(error.response?.data?.detail || 'An error occurred while purchasing coins.');
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-gray-200"
    >
      <motion.section 
        variants={itemVariants} 
        className="text-center mb-16 relative overflow-hidden rounded-3xl"
        style={{ height: '500px' }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{
            backgroundImage: `url(${aiBackground})`,
            opacity: 0.7
          }}
        ></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 bg-black bg-opacity-50">
          <h1 className="text-6xl font-extrabold mb-8 text-white">
            ODD DI TF Predictor
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-200">
            Predict behavioral disorders with precision using our advanced AI.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/predict" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:bg-blue-700 flex items-center">
              <FaRocket className="mr-2" /> Start Predicting
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🧠", title: "Advanced AI", description: "Cutting-edge behavioral analysis" },
            { icon: "🔒", title: "Security", description: "Military-grade data protection" },
            { icon: "📊", title: "Analytics", description: "Detailed reports and insights" }
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <PricingPlan
            name="Starter"
            coins={10}
            price={9.99}
            features={["10 predictions", "Basic analytics", "Email support"]}
            onPurchase={() => handlePurchase(10)}
          />
          <PricingPlan
            name="Pro"
            coins={50}
            price={39.99}
            features={["50 predictions", "Advanced analytics", "Priority support"]}
            onPurchase={() => handlePurchase(50)}
            isPopular={true}
          />
          <PricingPlan
            name="Enterprise"
            coins={200}
            price={149.99}
            features={["200 predictions", "Custom analytics", "Dedicated support"]}
            onPurchase={() => handlePurchase(200)}
          />
        </div>
      </motion.section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',
            textAlign: 'center',
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Achat réussi !</h2>
        <p className="mb-4">Vous avez acheté avec succès {purchasedCoins} coins.</p>
        <button
          onClick={() => setModalIsOpen(false)}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Fermer
        </button>
      </Modal>
    </motion.div>
  );
}

export default HomePage;