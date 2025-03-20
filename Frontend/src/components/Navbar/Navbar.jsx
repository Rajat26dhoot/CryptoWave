import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%]">
      <nav className="bg-white/5 backdrop-blur-md py-2.5 px-6 rounded-xl shadow-lg border border-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-green-400 text-lg font-bold">CryptoWave</div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-white hover:text-green-400">Home</a>
            <a href="/about" className="text-white hover:text-green-400">About</a>
            <a href="/services" className="text-white hover:text-green-400">Services</a>
            <a href="/contact" className="text-white hover:text-green-400">Contact</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Links */}
          {isOpen && (
            <div className="absolute top-14 left-0 w-full bg-black p-4 border border-white  rounded-lg md:hidden">
              <a href="/" className="block text-white hover:text-green-400 py-2">Home</a>
              <a href="/about" className="block text-white hover:text-green-400 py-2">About</a>
              <a href="/services" className="block text-white hover:text-green-400 py-2">Services</a>
              <a href="/contact" className="block text-white hover:text-green-400 py-2">Contact</a>
              <button
                onClick={onOpen}
                className="w-full bg-green-400 hover:bg-green-500 text-black font-bold py-2 rounded-md mt-2 transition"
              >
                Login
              </button>
            </div>
          )}

          {/* Desktop Login Button */}
          <button
            onClick={onOpen}
            className="hidden md:block bg-green-400 hover:bg-green-500 text-black px-8 py-0.5 rounded-md font-bold transition"
          >
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
