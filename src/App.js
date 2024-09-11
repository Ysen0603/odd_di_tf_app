import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import Login from './components/Login';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white"
      >
        <Header user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={!token ? <Login setToken={setToken} setUser={setUser} /> : <Navigate to="/" />} />
            <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/predict" element={token ? <PredictPage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={token ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </motion.div>
    </Router>
  );
}

export default App;
