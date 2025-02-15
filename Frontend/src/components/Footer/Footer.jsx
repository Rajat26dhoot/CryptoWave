import React from 'react';
import { Facebook, Twitter,  Instagram, Youtube} from 'lucide-react';
import './Footer.css';

function Footer(){
  return (
    <footer>
      {/* Community */}
      <div>
        <h3 className='Community'>Community</h3>
        <ul>
          <li><Facebook /> Facebook</li>
          <li><Twitter /> X (Twitter)</li>
          <li><Instagram /> Instagram</li>
          <li><Youtube /> YouTube</li>
        </ul>
      </div>

      {/* Products */}
      <div className='Products'>
        <h3>Products</h3>
        <ul>
          <li>Exchange</li>
          <li>Buy Crypto</li>
          <li>Pay</li>
          <li>Academy</li>
          <li>Live</li>
          <li>Tax</li>
          <li>Gift Card</li>
          <li>Launchpool</li>
          <li>Auto-Invest</li>
          <li>ETH Staking</li>
          <li>NFT</li>
          <li>BABT</li>
          <li>Research</li>
          <li>Charity</li>
        </ul>
      </div>

      {/* Business */}
      <div className='Business'>
        <h3>Business</h3>
        <ul>
          <li>P2P Merchant Application</li>
          <li>P2Pro Merchant Application</li>
          <li>Listing Application</li>
          <li>Institutional & VIP Services</li>
          <li>Labs</li>
          <li>Binance Connect</li>
        </ul>
      </div>

      {/* Learn */}
      <div className='Learn'>
        <h3>Learn</h3>
        <ul>
          <li>Learn & Earn</li>
          <li>Browse Crypto Prices</li>
          <li>Bitcoin Price</li>
          <li>Ethereum Price</li>
          <li>Browse Crypto Price Predictions</li>
          <li>Bitcoin Price Prediction</li>
          <li>Ethereum Price Prediction</li>
          <li>Ethereum Upgrade (Pectra)</li>
          <li>Buy Bitcoin</li>
          <li>Buy BNB</li>
          <li>Buy XRP</li>
          <li>Buy Dogecoin</li>
        </ul>
      </div>

      {/* Service */}
      <div className='Service'>
        <h3>Service</h3>
        <ul>
          <li>Affiliate</li>
          <li>Referral</li>
          <li>BNB</li>
          <li>OTC Trading</li>
          <li>Historical Market Data</li>
          <li>Trading Insight</li>
          <li>Proof of Reserves</li>
        </ul>
      </div>

      {/* Support */}
      <div className='Support'>
        <h3>Support</h3>
        <ul>
          <li>24/7 Chat Support</li>
          <li>Support Center</li>
          <li>Product Feedback & Suggestions</li>
          <li>Fees</li>
          <li>APIs</li>
          <li>Binance Verify</li>
          <li>Trading Rules</li>
          <li>Binance Airdrop Portal</li>
          <li>Law Enforcement Requests</li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CryptoWave. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;