import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../State/Auth/Action';
import { useNavigate } from 'react-router-dom';

const SecondNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to home after logout
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate('/profile');
  };

  const handleWalletClick = () => {
    setDropdownOpen(false);
    navigate('/wallet');
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[85%]">
      <nav className="bg-white/5 backdrop-blur-md py-2.5 px-6 rounded-xl shadow-lg border border-white">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-green-400 text-lg font-bold">CryptoWave</div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-green-400 transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/portfolio')}
              className="text-white hover:text-green-400 transition"
            >
              Portfolio
            </button>
            <button
              onClick={() => navigate('/watchlist')}
              className="text-white hover:text-green-400 transition"
            >
              WatchList
            </button>
            <button
              onClick={() => navigate('/activity')}
              className="text-white hover:text-green-400 transition"
            >
              Activity
            </button>
          </div>

          {/* User Button */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-green-400 hover:bg-green-500 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold transition"
            >
              <User className="h-5 w-5" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2.5 w-40 bg-black rounded-md shadow-md border border-white ">
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left px-4 py-2 text-white hover:text-green-400 transition"
                >
                  Profile
                </button>
                <button
                  onClick={handleWalletClick}
                  className="block w-full text-left px-4 py-2 text-white hover:text-green-400 transition"
                >
                  Wallet
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:text-green-400 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SecondNavbar;
