import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!username.trim()) {
      formErrors.username = "Username is required";
    }
    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
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
        const response = await axios.post('http://localhost:8000/users/', {
          username,
          email,
          password
        });
        const loginResponse = await axios.post('http://localhost:8000/token', 
          `username=${username}&password=${password}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        const token = loginResponse.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', response.data.id.toString());
        setToken(token);
        setUser(response.data);
        navigate('/');
      } catch (error) {
        setErrors({ general: error.response?.data?.detail || "An error occurred during registration" });
      }
    }
  };
  

  return (
    <motion.div 
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 2, bounce: 0.4 }}
        className="min-h-screen flex bg-black">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 relative">
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-800 rounded-full flex items-center justify-center">
            <FaUserPlus className="text-white text-2xl" />
          </div>
          
          <div className="bg-black border-2 border-yellow-800 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-white mb-10">Create Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white text-sm font-semibold ml-2">Username</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-yellow-800 px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Choose a username"
                    required
                  />
                </div>
                {errors.username && <p className="text-white text-xs mt-1">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-semibold ml-2">Email</label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-yellow-800 px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && <p className="text-white text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-semibold ml-2">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b-2 border-yellow-800 px-4 py-2 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="Create a password"
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
                  <FaUserPlus className="mr-2" />
                  Create Account
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white">
                Already have an account? {' '}
                <Link 
                  to="/login" 
                  className="text-yellow-800 hover:text-white transition-colors duration-300 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center border-l border-yellow-800">
        <div className="p-12 relative">
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-yellow-800"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-yellow-800"></div>
          <h1 className="text-6xl font-bold text-white mb-4">Join Us</h1>
          <p className="text-yellow-800 text-xl">Start your experience today</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;