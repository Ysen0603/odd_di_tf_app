import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser,FaSignInAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!username.trim()) {
      formErrors.username = "Username is required";
    }
    if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/token', 
          `username=${username}&password=${password}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        setToken(token);
        await fetchUserInfo(token);
        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ general: "Invalid username or password" });
      }
    }
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = {
        ...response.data,
        profile_picture: response.data.profile_picture || 'https://via.placeholder.com/32'
      };
      setUser(userData);
      localStorage.setItem('userId', userData.id.toString()); // Assurez-vous que l'ID de l'utilisateur est stocké
      localStorage.setItem('userProfilePicture', userData.profile_picture); // Stocker l'image de profil
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };
  

  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", duration: 2, bounce: 0.4 }}
       className="min-h-screen flex bg-black">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center border-r border-yellow-800">
        <div className="p-12 relative">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-yellow-800"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-yellow-800"></div>
          <h1 className="text-6xl font-bold text-white mb-4">Welcome</h1>
          <p className="text-yellow-800 text-xl">Enter your journey into our world</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 relative">
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-800 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-2xl" />
          </div>
          
          <div className="bg-black border-2 border-yellow-800 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Sign In</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold ml-2">Username</label>
                <div className="relative group">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-yellow-800 px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                </div>
                {errors.username && <p className="text-white text-xs mt-1">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-semibold ml-2">Password</label>
                <div className="relative group">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-yellow-800 px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {errors.password && <p className="text-white text-xs mt-1">{errors.password}</p>}
              </div>

              {errors.general && (
                <div className="bg-black border border-yellow-800 p-3 rounded-lg">
                  <p className="text-white text-sm text-center">{errors.general}</p>
                </div>
              )}

              <button
                type="submit"
                className="group relative w-full py-3 mt-8 overflow-hidden rounded-lg bg-yellow-800 text-white font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <FaSignInAlt className="mr-2" />
                  Sign In
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white">
                New here? {' '}
                <Link 
                  to="/register" 
                  className="text-yellow-800 hover:text-white transition-colors duration-300 font-semibold"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;