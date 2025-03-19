import { useState } from "react";
import { X } from "lucide-react";
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
          Transfer To Other Wallet
        </h2>

        {/* Enter Amount */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Enter Amount</label>
          <input
            type="number"
            placeholder="$0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-lg focus:outline-none focus:border-green-400"
          />
        </div>

        {/* Enter Wallet ID */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Enter Wallet ID</label>
          <input
            type="text"
            placeholder="Transfer to which ID"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-lg focus:outline-none focus:border-green-400"
          />
        </div>

       
        {/* Send Button */}
        <div>
          <button
            className={`w-full ${
              amount && walletId
                ? "bg-green-500 hover:bg-green-600 border border-black"
                : "bg-gray-800 border border-gray-700 cursor-not-allowed"
            } text-white py-3 rounded-lg font-semibold transition duration-300`}
            onClick={handleTransfer}
            disabled={!amount || !walletId}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferWallet;
