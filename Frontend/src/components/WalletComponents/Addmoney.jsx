import { useEffect, useState } from "react";
import { CreditCard, ShieldCheck, Sparkles, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate,useSearchParams } from "react-router-dom";
import { depositMoney, paymentHandler } from "../../State/Wallet/Action";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Addmoney = ({ isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  useEffect(() => {
    if (orderId && paymentId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId,
          navigate: () => navigate("/wallet"), 
        })
      );

      window.history.replaceState(null, "", `${window.location.origin}/wallet`);
    }
  }, [orderId, paymentId, dispatch, navigate]);

  const handleConfirm = () => {
    if (!amount || !selectedMethod) {
      alert("Please enter amount and select payment method");
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
            placeholder="$0.00"
            required
          />
        </div>

        <div className="wallet-field">
          <label>Select payment method</label>
          <div className="payment-method-grid">
            <label
              className={`payment-method-card ${
                selectedMethod === "RAZORPAY" ? "border-green-400" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="RAZORPAY"
                checked={selectedMethod === "RAZORPAY"}
                onChange={() => setSelectedMethod("RAZORPAY")}
              />
              <span className="payment-radio" />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThhv3MVGD_XJaEbcBgOkEIJdBQJBBVkReAjA&s"
                alt="Razorpay"
              />
              <small>UPI and cards</small>
            </label>

            <label
              className={`payment-method-card ${
                selectedMethod === "STRIPE" ? "border-green-400" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="STRIPE"
                checked={selectedMethod === "STRIPE"}
                onChange={() => setSelectedMethod("STRIPE")}
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
