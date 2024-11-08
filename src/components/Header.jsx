import React from 'react';
import { Link } from 'react-router-dom';
import { FaCoins, FaSignOutAlt, FaUser, FaChartLine, FaEnvelope, FaComments } from 'react-icons/fa';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors duration-300 mb-4 md:mb-0">
            <span className="bg-gradient-to-r from-white to-yellow-700 bg-clip-text text-transparent">
              ODD DI TF Predictor
            </span>
          </Link>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-2 md:space-x-4 items-center">
              {user ? (
                <>
                  <li className="my-1">
                    <Link to="/predict" className="flex text-yellow-700 font-bold items-center hover:text-white-800 hover:bg-yellow-700 hover:text-white transition-colors duration-300 bg-white px-3 py-2 rounded-full text-sm">
                      <FaChartLine className="mr-2" />
                      Predict
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link to="/profile" className="flex items-center text-yellow-700 font-bold hover:bg-yellow-700 hover:text-white  transition-colors duration-300 bg-white px-3 py-2 rounded-full text-sm">
                      <img 
                        src={user.profile_picture ? `http://localhost:8000${user.profile_picture}` : 'https://via.placeholder.com/32'} 
                        alt="Profile" 
                        className="w-6 h-6 rounded-full mr-2 border-2 border-white"
                      />
                      {user.username}
                    </Link>
                  </li>
                  <li className="my-1 flex items-center bg-yellow-700 px-3 py-2 rounded-full text-sm">
                    <FaCoins className="text-white mr-2" />
                    <span>{user.coins}</span>
                  </li>
                  <li className="my-1">
                    <Link to="/chat" className="flex items-center text-yellow-700 font-bold hover:bg-yellow-700 hover:text-white  transition-colors duration-300 bg-white px-3 py-2 rounded-full text-sm">
                      <FaComments className="mr-2" />
                      Chat
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link to="/contact" className="flex items-center text-yellow-700 font-bold hover:bg-yellow-700 hover:text-white  transition-colors duration-300 bg-white px-3 py-2 rounded-full text-sm">
                      <FaEnvelope className="mr-2" />
                      Contact
                    </Link>
                  </li>
                  <li className="my-1">
                    <button 
                      onClick={onLogout} 
                      className="flex items-center font-bold bg-red-900 px-3 py-2 rounded-full text-sm"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="my-1">
                    <Link to="/login" className="flex items-center text-yellow-700 font-bold hover:bg-yellow-700 hover:text-white  transition-colors duration-300 bg-white px-3 py-2 rounded-full text-sm">
                      <FaUser className="mr-2" />
                      Login
                    </Link>
                  </li>
                  <li className="my-1">
                    <Link to="/contact" className="flex items-center text-yellow-700 font-bold hover:bg-yellow-700 hover:text-white  transition-colors duration-300 bg-white px-3 py-2 rounded-full text-sm">
                      <FaEnvelope className="mr-2" />
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;