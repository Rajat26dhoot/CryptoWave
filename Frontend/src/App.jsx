import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './State/Auth/Action';
import {store} from './State/Store';
import Profile from './components/Profile/Profile';
import Wallet from './Pages/Wallet';
import PaymentDetail from './components/WalletComponents/PaymentDetail'
import Portfolio from './Pages/Portfolio'
import Activity from './Pages/Activity'
import Watchlist from './Pages/WatchList'
import SecondNavbar from './components/Navbar/SecondNavbar';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout';
import Trade from './Pages/Trade';

function App() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log("auth----", auth);

  useEffect(() => {
    dispatch(getUser(auth.jwt || localStorage.getItem('jwt')))
  },[auth.jwt,dispatch]);

  return (
    <>
      <Routes>
        {auth.user ? (
         <Route element={<Layout />}>
         <Route path="/" element={<Dashboard />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/wallet" element={<Wallet />} />
         <Route path="/payment-detail" element={<PaymentDetail />} />
         <Route path="/portfolio" element={<Portfolio />} />
         <Route path="/watchlist" element={<Watchlist />} />
         <Route path="/activity" element={<Activity />} />
         <Route path="/trade" element={<Trade />} />
       </Route>
          
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </>
  );
}

export default App;
