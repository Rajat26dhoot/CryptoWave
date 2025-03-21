import { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { withdrawalRequest } from "../../State/Withdrawal/Action";

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
      console.log(`Withdrawing $${withdrawAmount} to ${selectedBank}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111] text-white p-6 rounded-xl shadow-lg w-[500px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-6 text-center">
          Request Withdrawal
        </h2>

        {/* Available Balance */}
        <div className="bg-[#222] text-green-400 p-3 rounded-lg mb-4 flex justify-between">
          <span>Available balance</span>
          <span>${availableBalance}</span>
        </div>

        {/* Withdrawal Amount */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">
            Enter withdrawal amount
          </label>
          <input
            type="number"
            placeholder="$0.00"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Transfer to */}
        <div>
          <label className="block text-gray-400 mb-2">Transfer to</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-lg focus:outline-none focus:border-green-400"
          >
            <option value="">Select Bank</option>
            <option value="Yes Bank">Yes Bank - ****1651</option>
            <option value="HDFC Bank">HDFC Bank - ****4321</option>
            <option value="ICICI Bank">ICICI Bank - ****9876</option>
          </select>
        </div>

        {/* Withdraw Button */}
        <div className="mt-8">
          <button
            className={`w-full ${
              withdrawAmount && selectedBank
                ? "bg-green-500 hover:bg-green-600 border border-black"
                : "bg-gray-800 border border-gray-700 cursor-not-allowed"
            } text-white py-3 rounded-lg font-semibold transition duration-300`}
            onClick={handleWithdraw}
            disabled={!withdrawAmount || !selectedBank}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
