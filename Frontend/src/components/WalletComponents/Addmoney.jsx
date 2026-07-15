import { useState } from "react";
import { CreditCard, ShieldCheck, Sparkles, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { paymentHandler } from "../../State/Wallet/Action";

const Addmoney = ({ isOpen, onClose }) => {
  const [selectedMethod] = useState("STRIPE");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    dispatch(paymentHandler(selectedMethod, amount, localStorage.getItem("jwt")));

    onClose(); // Close the modal after confirming
  };

  if (!isOpen){ 
    return null
  };

  return (
    <div className="wallet-modal-backdrop">
      <div className="wallet-modal-card wallet-topup-modal">
        <button
          onClick={onClose}
          className="wallet-modal-close"
          aria-label="Close top up modal"
        >
          <X size={24} />
        </button>

        <div className="wallet-modal-header">
          <span className="wallet-modal-icon">
            <Sparkles size={22} />
          </span>
          <div>
            <p>Instant funding</p>
            <h2>Top Up Your Wallet</h2>
          </div>
        </div>

        <div className="wallet-field">
          <label>Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₹0.00"
            required
          />
        </div>

        <div className="wallet-field">
          <label>Payment method</label>
          <div className="payment-method-grid">
            <label className="payment-method-card border-green-400">
              <input
                type="radio"
                name="payment"
                value="STRIPE"
                checked
                readOnly
              />
              <span className="payment-radio" />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpBKsIpqsjAhIpjAol7UtlXu-0ndmBZy9ckQ&s"
                alt="Stripe"
              />
              <small>Global checkout</small>
            </label>
          </div>
        </div>

        <div className="wallet-modal-note">
          <ShieldCheck size={17} />
          <span>Encrypted payment handoff with secure provider verification.</span>
        </div>

        <div className="wallet-modal-actions">
          <button
            className={`wallet-primary-button ${
              selectedMethod
                ? ""
                : "wallet-button-disabled"
            }`}
            onClick={handleConfirm}
            disabled={!selectedMethod || !amount}
          >
            <CreditCard size={18} />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addmoney;
