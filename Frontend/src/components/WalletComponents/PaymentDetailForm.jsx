import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPaymentDetails } from "../../State/Withdrawal/Action";
import { Landmark, Save, X } from "lucide-react";

const PaymentDetailForm = ({ onClose, onSave }) => {
  const [accountHolder, setAccountHolder] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const dispatch = useDispatch();

  
  



  const handleSubmit = (e) => {
    e.preventDefault();

    if (accountNumber !== confirmAccountNumber) {
      alert("Account numbers do not match");
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      alert("Invalid IFSC Code");
      return;
    }

    const requestData = {
      accountHolderName: accountHolder.trim(),
      ifsc: ifscCode.trim(),
      accountNumber: accountNumber.trim(),
      bankName: bankName.trim(),
    };


    dispatch(
      addPaymentDetails({
        jwt: localStorage.getItem("jwt"),
        data: requestData,
      })
    );
    
    onSave(requestData);

    console.log("Form submitted:", requestData);

    // Reset form only on successful submission
    setAccountHolder("");
    setIfscCode("");
    setAccountNumber("");
    setConfirmAccountNumber("");
    setBankName("");
  };

  return (
    <div className="wallet-modal-backdrop">
      <div className="wallet-modal-card wallet-bank-modal">
        <button
          type="button"
          onClick={onClose}
          className="wallet-modal-close"
          aria-label="Close bank detail modal"
        >
          <X size={24} />
        </button>

        <div className="wallet-modal-header">
          <span className="wallet-modal-icon">
            <Landmark size={22} />
          </span>
          <div>
            <p>Payout rail</p>
            <h2>Add Bank Detail</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="wallet-form-grid">
          <div className="wallet-field">
            <label>Account Holder Name</label>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              required
            />
          </div>

          <div className="wallet-field">
            <label>IFSC Code</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              required
              maxLength={11}
            />
          </div>

          <div className="wallet-field">
            <label>Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="wallet-field">
            <label>Confirm Account Number</label>
            <input
              type="text"
              value={confirmAccountNumber}
              onChange={(e) => setConfirmAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="wallet-field">
            <label>Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>

          <div className="wallet-modal-actions two-up">
            <button
              type="submit"
              className={`wallet-primary-button ${
                accountHolder && ifscCode && accountNumber && confirmAccountNumber && bankName
                  ? ""
                  : "wallet-button-disabled"
              }`}
              disabled={
                !accountHolder ||
                !ifscCode ||
                !accountNumber ||
                !confirmAccountNumber ||
                !bankName
              }
            >
              <Save size={18} />
              Save Bank Detail
            </button>
            <button
              type="button"
              onClick={onClose}
              className="wallet-secondary-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetailForm;
