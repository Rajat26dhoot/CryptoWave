import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPaymentDetails } from "../../State/Withdrawal/Action";

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
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111] text-white p-6 rounded-lg w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Bank Detail</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Holder Name */}
          <div>
            <label className="block text-gray-400">Account Holder Name</label>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              required
              className="w-full bg-black text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block text-gray-400">IFSC Code</label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              required
              maxLength={11}
              className="w-full bg-black text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-gray-400">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="w-full bg-black text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* Confirm Account Number */}
          <div>
            <label className="block text-gray-400">Confirm Account Number</label>
            <input
              type="text"
              value={confirmAccountNumber}
              onChange={(e) => setConfirmAccountNumber(e.target.value)}
              required
              className="w-full bg-black text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-gray-400">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
              className="w-full bg-black text-white p-2 rounded-lg border border-gray-700 focus:outline-none focus:border-green-400"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className={`w-full ${
                accountHolder && ifscCode && accountNumber && confirmAccountNumber && bankName
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-700 cursor-not-allowed"
              } text-white px-4 py-2 rounded-lg font-semibold transition duration-300`}
              disabled={
                !accountHolder ||
                !ifscCode ||
                !accountNumber ||
                !confirmAccountNumber ||
                !bankName
              }
            >
              Save Bank Detail
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
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
