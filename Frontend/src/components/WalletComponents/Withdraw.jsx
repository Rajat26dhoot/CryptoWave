import { useState } from "react";
import { ArrowUpRight, Landmark, ShieldCheck, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { withdrawalRequest } from "../../State/Withdrawal/Action";
import { formatCurrency } from "../../utils/currency";

const Withdraw = ({ isOpen, onClose, availableBalance }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleWithdraw = () => {
    if (withdrawAmount && selectedBank) {
      dispatch(
        withdrawalRequest({
          amount: withdrawAmount,
          jwt: localStorage.getItem("jwt"),
        })
      );
      console.log(`Withdrawing ₹${withdrawAmount} to ${selectedBank}`);
      onClose();
    }
  };

  return (
    <div className="wallet-modal-backdrop">
      <div className="wallet-modal-card">
        <button
          onClick={onClose}
          className="wallet-modal-close"
          aria-label="Close withdrawal modal"
        >
          <X size={24} />
        </button>

        <div className="wallet-modal-header">
          <span className="wallet-modal-icon">
            <Landmark size={22} />
          </span>
          <div>
            <p>Bank payout</p>
            <h2>Request Withdrawal</h2>
          </div>
        </div>

        <div className="wallet-balance-strip">
          <span>Available balance</span>
          <strong>{formatCurrency(availableBalance)}</strong>
        </div>

        <div className="wallet-field">
          <label>Enter withdrawal amount</label>
          <input
            type="number"
            placeholder="₹0.00"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
        </div>

        <div className="wallet-field">
          <label>Transfer to</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Select Bank</option>
            <option value="Yes Bank">Yes Bank - ****1651</option>
            <option value="HDFC Bank">HDFC Bank - ****4321</option>
            <option value="ICICI Bank">ICICI Bank - ****9876</option>
          </select>
        </div>

        <div className="wallet-modal-note">
          <ShieldCheck size={17} />
          <span>Withdrawal requests are reviewed before settlement.</span>
        </div>

        <div className="wallet-modal-actions">
          <button
            className={`wallet-primary-button ${
              withdrawAmount && selectedBank ? "" : "wallet-button-disabled"
            }`}
            onClick={handleWithdraw}
            disabled={!withdrawAmount || !selectedBank}
          >
            <ArrowUpRight size={18} />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
