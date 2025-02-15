import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-left">
            <img src={logo}  className="logo-img" />
                <h2 className="site-name">CryptoWave</h2>
                <p>Buy & Sell Crypto </p>
                <p>About Us </p>
                <p>Market </p>
                <p>More</p>
            </div>

           { /*<div className="navbar-center">
                 <p><Link to="/buy-sell">Buy & Sell Crypto</Link></p>
                <p><Link to="/about">About Us</Link></p>
                <p><Link to="/market">Market</Link></p> 
               
            </div>*/}

            <div className="navbar-right">
            <button className="search">
                <svg
                    viewBox="0 0 19.9 19.7"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="title desc"
                    className="svg-icon search-icon"  /* Use className instead of class */
                >
                    <title id="title">Search</title>
                    <desc id="desc">Search Icon</desc>
                    <circle cx="8" cy="8" r="7" stroke="#0057ee" strokeWidth="2" fill="none" />
                    <line x1="12" y1="12" x2="18" y2="18" stroke="#0057ee" strokeWidth="2" />
                </svg>
                </button>

                <button className="btn">Sign up</button>
                <button className="btn">Login</button>
            </div>
        </div>
    );
}

export default Navbar;

