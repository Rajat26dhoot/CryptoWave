import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import HomeMiddle from '../components/HomeMiddle/Homemiddle';
import Login from './Login';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="bg-black min-h-screen">
      <Navbar onOpen={() => setShowLogin(true)} />
      <HomeMiddle />
      <Footer />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default Home;
