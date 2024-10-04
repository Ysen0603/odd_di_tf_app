import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import Login from './components/Login';
import ProfilePage from './pages/ProfilePage';
import Register from './components/Register';
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';



function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const updateUser = useCallback((newUserData) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...newUserData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }, []);

  const refreshToken = useCallback(() => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      handleLogout();
      return Promise.reject('No token to refresh');
    }
    return axios.post('http://localhost:8000/refresh-token', {}, {
      headers: {
        'Authorization': `Bearer ${currentToken}`
      }
    })
    .then(response => {
      const newToken = response.data.access_token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      return newToken;
    })
    .catch(error => {
      console.error('Failed to refresh token:', error);
      handleLogout();
      return Promise.reject(error);
    });
  }, [handleLogout]);

  const fetchUserInfo = useCallback((token) => {
    if (!token) {
      handleLogout();
      return Promise.reject('No token available');
    }
    return axios.get('http://localhost:8000/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userProfilePicture', response.data.profile_picture);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        return refreshToken().then(newToken => fetchUserInfo(newToken));
      } else {
        console.error('Failed to fetch user info:', error);
        handleLogout();
      }
    });
  }, [refreshToken, handleLogout]);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (token) {
      fetchUserInfo(token);
    }
  }, [token, fetchUserInfo]);

  return (
    <Router>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white"
        >
            <Header user={user} onLogout={handleLogout} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/login" element={!token ? <Login setToken={setToken} setUser={updateUser} /> : <Navigate to="/" />} />
                    <Route path="/register" element={!token ? <Register setToken={setToken} setUser={updateUser} /> : <Navigate to="/" />} />
                    <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/predict" element={token ? <PredictPage updateUser={updateUser} /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={token ? <ProfilePage user={user} setUser={updateUser} /> : <Navigate to="/login" />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/chat" element={token ? <ChatPage /> : <Navigate to="/login" />} />
                </Routes>
            </main>
            <Footer />
        </motion.div>
    </Router>
  );
}

export default App;
