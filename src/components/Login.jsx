import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-zinc-950 via-neutral-800 to-slate-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Username"
              required
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Password"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <FaSignInAlt className="mr-2" /> Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
