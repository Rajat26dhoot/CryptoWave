import { useState } from "react";
import { Send, ShieldCheck, Shuffle, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { transferMoney } from "../../State/Wallet/Action";

const TransferWallet = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState("");
  const [purpose, setPurpose] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleTransfer = () => {
    if (amount && walletId) {
      const requestData = {
        amount: parseFloat(amount),
        purpose,
      };

      dispatch(
        transferMoney({
          jwt: localStorage.getItem("jwt"),
          walletId,
          requestData, 
        })
      );
      

      console.log(`Transferring $${amount} to wallet ID: ${walletId}`);
      console.log(`Purpose: ${purpose}`);
      onClose();
    }
  };

  return (
    <div className="wallet-modal-backdrop">
      <div className="wallet-modal-card">
        <button
          onClick={onClose}
          className="wallet-modal-close"
          aria-label="Close transfer modal"
        >
          <X size={24} />
        </button>

        <div className="wallet-modal-header">
          <span className="wallet-modal-icon">
            <Shuffle size={22} />
          </span>
          <div>
            <p>Peer transfer</p>
            <h2>Transfer To Other Wallet</h2>
          </div>
        </div>

        <div className="wallet-field">
          <label>Enter Amount</label>
          <input
            type="number"
            placeholder="$0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="wallet-field">
          <label>Enter Wallet ID</label>
          <input
            type="text"
            placeholder="Transfer to which ID"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
          />
        </div>

       
        <div className="wallet-modal-note">
          <ShieldCheck size={17} />
          <span>Wallet IDs are validated before the transfer is sent.</span>
        </div>

        <div className="wallet-modal-actions">
          <button
            className={`wallet-primary-button ${
              amount && walletId ? "" : "wallet-button-disabled"
            }`}
            onClick={handleTransfer}
            disabled={!amount || !walletId}
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferWallet;
