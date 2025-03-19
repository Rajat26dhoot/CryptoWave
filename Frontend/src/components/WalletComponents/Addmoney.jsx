import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

  const orderId = query.get("order_id");
  const paymentId = query.get("payment_id");

  useEffect(() => {
    if (orderId && paymentId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId,
          navigate: () => navigate("/wallet"), // Navigate to /wallet after success
        })
      );

      // ✅ Clean up URL to avoid duplication issue
      window.history.replaceState(null, "", "/wallet");
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111] text-white p-6 rounded-xl shadow-lg w-[500px] h-[400px] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-6 text-center">
          Top Up Your Wallet
        </h2>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Enter Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-lg focus:outline-none focus:border-green-400"
            required
          />
        </div>

        {/* Payment Options */}
        <div>
          <label className="block text-gray-400 mb-2">
            Select payment method
          </label>
          <div className="flex gap-4">
            {/* Razorpay */}
            <label
              className={`flex items-center justify-center gap-2 border border-gray-700 rounded-lg p-3 cursor-pointer w-full hover:bg-[#222] ${
                selectedMethod === "RAZORPAY" ? "border-green-400" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="RAZORPAY"
                checked={selectedMethod === "RAZORPAY"}
                onChange={() => setSelectedMethod("RAZORPAY")}
                className="hidden"
              />
              <div
                className={`w-4 h-4 border-2 rounded-full ${
                  selectedMethod === "RAZORPAY"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-500"
                }`}
              ></div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThhv3MVGD_XJaEbcBgOkEIJdBQJBBVkReAjA&s"
                alt="Razorpay"
                className="h-10 w-30 object-contain rounded"
              />
            </label>

            {/* Stripe */}
            <label
              className={`flex items-center justify-center gap-2 border border-gray-700 rounded-lg p-3 cursor-pointer w-full hover:bg-[#222] ${
                selectedMethod === "STRIPE" ? "border-green-400" : ""
              }`}
            >
              <input
                type="radio"
                name="payment"
                value="STRIPE"
                checked={selectedMethod === "STRIPE"}
                onChange={() => setSelectedMethod("STRIPE")}
                className="hidden"
              />
              <div
                className={`w-4 h-4 border-2 rounded-full ${
                  selectedMethod === "STRIPE"
                    ? "bg-green-400 border-green-400"
                    : "border-gray-500"
                }`}
              ></div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpBKsIpqsjAhIpjAol7UtlXu-0ndmBZy9ckQ&s"
                alt="Stripe"
                className="h-10 w-30 object-contain rounded"
              />
            </label>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-8">
          <button
            className={`w-full ${
              selectedMethod
                ? "bg-green-500 border border-black hover:bg-green-600"
                : "border border-white"
            } text-white py-3 rounded-lg font-semibold transition duration-300`}
            onClick={handleConfirm}
            disabled={!selectedMethod || !amount}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addmoney;
