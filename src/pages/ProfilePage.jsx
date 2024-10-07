import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaCoins, FaEnvelope, FaSave } from 'react-icons/fa';

const ProfilePage = ({ user, setUser }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('http://localhost:8000/users/me/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser({ ...user, profile_picture: response.data.profile_picture });
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-zinc-950 via-neutral-800 to-slate-200"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white bg-opacity-80 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-black to-yellow-600 p-8">
            <h1 className="text-4xl font-bold text-white text-center">User Profile</h1>
          </div>
          {user ? (
            <div className="p-8 space-y-8">
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <img
                    src={previewUrl || (user.profile_picture ? `http://localhost:8000${user.profile_picture}` : 'https://via.placeholder.com/150')}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-black shadow-lg"
                  />
                  <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-yellow-800 text-white rounded-full p-2 cursor-pointer">
                    <FaCamera />
                  </label>
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
                <p className="text-gray-600 flex items-center">
                  <FaEnvelope className="mr-2" /> {user.email}
                </p>
                <div className="flex items-center bg-yellow-100 px-4 py-2 rounded-full">
                  <FaCoins className="text-yellow-500 mr-2" />
                  <span className="font-semibold text-gray-800">{user.coins} coins</span>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="file"
                  id="profile-picture"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                {file && (
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-yellow-700 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSave className="mr-2" /> Update Profile Picture
                  </motion.button>
                )}
              </form>
              <AnimatePresence>
                {updateSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md"
                  >
                    <p className="font-bold">Success!</p>
                    <p>Your profile picture has been updated.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-8">
              <p className="text-xl text-red-500">User not logged in</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;