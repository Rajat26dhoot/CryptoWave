import React from 'react';

const Navbar = ({ onOpen }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[85%]">
      <nav className="bg-white/5 backdrop-blur-md py-2.5 px-6 rounded-xl shadow-lg border border-gray-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-green-400 text-lg font-bold">CryptoWave</div>
          </div>

          <div className="flex space-x-6">
            <a href="/" className="text-gray-400 hover:text-green-400">Home</a>
            <a href="/about" className="text-gray-400 hover:text-green-400">About</a>
            <a href="/services" className="text-gray-400 hover:text-green-400">Services</a>
            <a href="/contact" className="text-gray-400 hover:text-green-400">Contact</a>
          </div>

          <button
            onClick={onOpen}
            className="bg-green-400 hover:bg-green-500 text-black px-8 py-0.5 rounded-md font-bold transition"
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
