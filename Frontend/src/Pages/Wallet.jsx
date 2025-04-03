import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowDownCircle, ArrowUpCircle, Shuffle, Copy, CreditCard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getWalletTransaction, getUserWallet, depositMoney } from "../State/Wallet/Action";
import Addmoney from '../components/WalletComponents/Addmoney';
import Withdraw from "../components/WalletComponents/Withdraw";
import TransferWallet from "../components/WalletComponents/TransferWallet";

const WalletContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams(); // ✅ Get URL params

  const { userWallet } = useSelector(state => state.wallet);

  const [balance, setBalance] = useState(userWallet?.balance || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  useEffect(() => {
    handleFetchUserWallet();

    // ✅ Handle URL params for deposit confirmation
    const orderId = searchParams.get("order_id");
    const paymentId = searchParams.get("payment_id");

    if (orderId && paymentId) {
      const jwt = localStorage.getItem("jwt");
      dispatch(depositMoney({ jwt, orderId, paymentId, navigate }));
    }
  }, [dispatch, searchParams, navigate]);

  useEffect(() => {
    setBalance(userWallet?.balance || 0);
  }, [userWallet?.balance]);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  console.log("userWallet------", userWallet);

  const handleCopy = () => {
    if (userWallet?.id) {
      navigator.clipboard.writeText(userWallet.id.toString());
      alert("Wallet ID copied!");
    }
  };

  const handleOpenPaymentDetail = () => {
    navigate("/payment-detail");
  };

  const handleFetchWalletTransactions = () => {
    dispatch(getWalletTransaction(localStorage.getItem("jwt")));
  };

  const transactions = [
    { type: "WITHDRAWAL", date: "2024-06-02", amount: 89 },
    { type: "BUY tether", date: "2024-06-01", amount: 99 },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto p-6 mt-20">
        {/* Wallet Info */}
        <div className="border border-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/000/512/317/non_2x/vector-wallet-glyph-black-icon.jpg" 
                alt="Wallet Icon" 
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <h2 className="text-2xl font-semibold">Wallet</h2>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopy} className="text-gray-400 hover:text-green-400">
                    <Copy size={16} />
                  </button>
                  <span className="text-gray-500 text-sm">
                    {userWallet?.id || "Not available"}
                  </span>
                </div>
              </div>
            </div>
            <button 
              className="text-gray-400 text-3xl hover:text-green-400" 
              onClick={handleFetchUserWallet}
            >
              &#x21bb;
            </button>
          </div>

          {/* Wallet Balance */}
          <div className="text-3xl font-bold text-green-400 mb-10">
            ${balance.toFixed(2)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              className="flex items-center gap-2 border border-white hover:bg-green-600 text-white px-6 py-6 rounded-lg"
              onClick={() => setIsModalOpen(true)}
            >
              <ArrowDownCircle size={20} />
              Add Money
            </button>

            <button 
              className="flex items-center gap-2 border border-white hover:bg-green-600 text-white px-6 py-6 rounded-lg"
              onClick={() => setIsWithdrawOpen(true)}
            >
              <ArrowUpCircle size={20} />
              Withdraw
            </button>

            <button 
              className="flex items-center gap-2 border border-white hover:bg-green-600 text-white px-6 py-6 rounded-lg"
              onClick={() => setIsTransferOpen(true)}
            >
              <Shuffle size={20} />
              Transfer
            </button>

            <button 
              className="flex items-center gap-2 border border-white hover:bg-green-600 text-white px-6 py-6 rounded-lg"
              onClick={handleOpenPaymentDetail}
            >
              <CreditCard size={20} />
              Payment Detail
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-semibold pl-2">History</h3>
            <button 
              className="text-gray-400 text-3xl hover:text-green-400" 
              onClick={handleFetchWalletTransactions}
            >
              &#x21bb;
            </button>
          </div>
          <div className="space-y-2">
            {transactions.map((tx, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center border border-white bg-black 
                  hover:bg-[#212121] hover:scale-105 transition-transform duration-300 
                  p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium text-white">{tx.type}</p>
                  <span className="text-gray-500 text-sm">{tx.date}</span>
                </div>
                <span className="text-green-400">${tx.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Addmoney isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Withdraw isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} availableBalance={balance} />
      <TransferWallet isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
    </div>
  );
};

const Wallet = () => <WalletContent />;

export default Wallet;
