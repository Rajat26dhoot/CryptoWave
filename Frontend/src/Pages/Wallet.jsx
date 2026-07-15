import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Copy,
  CreditCard,
  Landmark,
  RefreshCw,
  ShieldCheck,
  Shuffle,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWalletTransaction,
  getUserWallet,
  depositMoney,
} from "../State/Wallet/Action";
import Addmoney from "../components/WalletComponents/Addmoney";
import Withdraw from "../components/WalletComponents/Withdraw";
import TransferWallet from "../components/WalletComponents/TransferWallet";
import { formatCurrency } from "../utils/currency";

const WalletContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const processedPaymentRef = useRef(null);

  const { userWallet, transaction, loading } = useSelector((state) => state.wallet);

  const [balance, setBalance] = useState(userWallet?.balance || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const handleFetchUserWallet = useCallback(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleFetchWalletTransactions = useCallback(() => {
    dispatch(getWalletTransaction(localStorage.getItem("jwt")));
  }, [dispatch]);

  useEffect(() => {
    handleFetchUserWallet();
    handleFetchWalletTransactions();

    const orderId = searchParams.get("order_id");
    const paymentId = searchParams.get("payment_id");
    const paymentKey = orderId && paymentId ? `${orderId}:${paymentId}` : null;

    if (paymentKey && processedPaymentRef.current !== paymentKey) {
      processedPaymentRef.current = paymentKey;
      const jwt = localStorage.getItem("jwt");
      dispatch(depositMoney({ jwt, orderId, paymentId, navigate }));
    }
  }, [dispatch, handleFetchUserWallet, handleFetchWalletTransactions, searchParams, navigate]);

  useEffect(() => {
    setBalance(userWallet?.balance || 0);
  }, [userWallet?.balance]);

  const handleCopy = () => {
    if (userWallet?.id) {
      navigator.clipboard.writeText(userWallet.id.toString());
      alert("Wallet ID copied!");
    }
  };

  const handleOpenPaymentDetail = () => {
    navigate("/payment-detail");
  };

  const transactions = Array.isArray(transaction) ? transaction : [];

  const formatTransactionType = (type = "") =>
    type
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formatTransactionDate = (date) => {
    if (!date) return "Today";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTransactionAmount = (amount = 0) => {
    const numericAmount = Number(amount) || 0;
    const sign = numericAmount > 0 ? "+" : numericAmount < 0 ? "-" : "";

    return `${sign}${formatCurrency(Math.abs(numericAmount))}`;
  };

  const walletActions = [
    {
      label: "Add Money",
      detail: "Instant top-up",
      icon: ArrowDownCircle,
      onClick: () => setIsModalOpen(true),
    },
    {
      label: "Withdraw",
      detail: "Send to bank",
      icon: ArrowUpCircle,
      onClick: () => setIsWithdrawOpen(true),
    },
    {
      label: "Transfer",
      detail: "Wallet to wallet",
      icon: Shuffle,
      onClick: () => setIsTransferOpen(true),
    },
    {
      label: "Payment Detail",
      detail: "Manage banks",
      icon: CreditCard,
      onClick: handleOpenPaymentDetail,
    },
  ];

  return (
    <div className="wallet-shell min-h-screen text-white">
      <main className="wallet-container">
        <section className="wallet-hero">
          <div>
            <p className="wallet-kicker">CryptoWave Wallet</p>
            <h1>Capital Hub</h1>
            <span>Move funds, review settlement history, and manage payout rails.</span>
          </div>
          <div className="wallet-live-badge">
            <span className="status-pulse" />
            Secure session
          </div>
        </section>

        <section className="wallet-grid">
          <div className="wallet-card-premium">
            <div className="wallet-card-top">
              <div className="wallet-icon-mark">
                <WalletCards size={26} />
              </div>
              <button
                className="wallet-icon-button"
                onClick={handleFetchUserWallet}
                aria-label="Refresh wallet"
                title="Refresh wallet"
              >
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="wallet-balance-block">
              <span>Total balance</span>
              <strong>{formatCurrency(balance)}</strong>
              <div className="wallet-id-chip">
                <button onClick={handleCopy} aria-label="Copy wallet ID" title="Copy wallet ID">
                  <Copy size={15} />
                </button>
                <span>ID {userWallet?.id || "Not available"}</span>
              </div>
            </div>

            <div className="wallet-card-footer">
              <div>
                <span>INR wallet</span>
                <strong>Primary</strong>
              </div>
              <div>
                <span>Risk level</span>
                <strong>Protected</strong>
              </div>
            </div>
          </div>

          <div className="wallet-side-stack">
            <div className="wallet-mini-panel">
              <ShieldCheck size={21} />
              <div>
                <strong>Bank-grade controls</strong>
                <span>Protected transfers with authenticated withdrawal requests.</span>
              </div>
            </div>
            <div className="wallet-mini-panel">
              <Sparkles size={21} />
              <div>
                <strong>Fast settlement</strong>
                <span>Use cards, Razorpay, Stripe, and saved payout details.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wallet-actions-grid">
          {walletActions.map(({ label, detail, icon: Icon, onClick }) => (
            <button key={label} className="wallet-action-tile" onClick={onClick}>
              <span className="wallet-action-icon">
                <Icon size={22} />
              </span>
              <span>
                <strong>{label}</strong>
                <small>{detail}</small>
              </span>
            </button>
          ))}
        </section>

        <section className="wallet-history-section">
          <div className="wallet-section-header">
            <div>
              <p className="wallet-kicker">Activity</p>
              <h2>Transaction History</h2>
            </div>
            <button
              className="wallet-icon-button"
              onClick={handleFetchWalletTransactions}
              aria-label="Refresh history"
              title="Refresh history"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="wallet-history-list">
            {loading && transactions.length === 0 ? (
              <div className="wallet-history-empty">Loading wallet transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="wallet-history-empty">No wallet transactions yet.</div>
            ) : (
              transactions.map((tx) => (
                <article className="wallet-history-item" key={tx.id}>
                  <div className="wallet-history-left">
                    <div className="wallet-history-icon">
                      <Landmark size={18} />
                    </div>
                    <div>
                      <strong>{formatTransactionType(tx.type)}</strong>
                      <span>
                        {formatTransactionDate(tx.date)} - {tx.purpose || "Wallet activity"}
                      </span>
                    </div>
                  </div>
                  <strong
                    className={`wallet-history-amount ${
                      Number(tx.amount) < 0 ? "wallet-history-amount-negative" : ""
                    }`}
                  >
                    {formatTransactionAmount(tx.amount)}
                  </strong>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      <Addmoney isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Withdraw
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalance={balance}
      />
      <TransferWallet
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />
    </div>
  );
};

const Wallet = () => <WalletContent />;

export default Wallet;
