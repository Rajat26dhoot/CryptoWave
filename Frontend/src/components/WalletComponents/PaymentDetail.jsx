import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "../../State/Withdrawal/Action";
import PaymentDetailForm from "./PaymentDetailForm";
import { CreditCard, Landmark, Plus, ShieldCheck } from "lucide-react";

const DetailRow = ({ label, value }) => (
  <div className="bank-detail-row">
    <span>{label}</span>
    <strong>{value || "--"}</strong>
  </div>
);

const PaymentDetail = () => {
  const { PaymentDetails: paymentDetails } = useSelector(
    (store) => store.withdrawal
  );
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSavePayment = () => {
    handleCloseModal();
  };

  const hasPaymentDetails =
    paymentDetails && Object.keys(paymentDetails).length > 0;

  return (
    <div className="wallet-shell min-h-screen text-white">
      <main className="wallet-container wallet-payment-container">
        <section className="wallet-hero">
          <div>
            <p className="wallet-kicker">Payout Settings</p>
            <h1>Bank Details</h1>
            <span>Manage the account used for withdrawals and settlements.</span>
          </div>
        </section>

        {hasPaymentDetails ? (
          <section className="bank-detail-card">
            <div className="bank-detail-card-top">
              <span className="wallet-modal-icon">
                <Landmark size={24} />
              </span>
              <div>
                <p className="wallet-kicker">Verified rail</p>
                <h2>Saved Payment Details</h2>
              </div>
            </div>

            <div className="bank-detail-grid">
              <DetailRow
                label="Account Holder"
                value={paymentDetails.accountHolderName}
              />
              <DetailRow label="IFSC Code" value={paymentDetails.ifsc} />
              <DetailRow
                label="Account Number"
                value={paymentDetails.accountNumber}
              />
              <DetailRow label="Bank Name" value={paymentDetails.bankName} />
            </div>

            <div className="wallet-modal-note bank-note">
              <ShieldCheck size={17} />
              <span>Bank information is used only for authenticated withdrawals.</span>
            </div>
          </section>
        ) : (
          <section className="bank-empty-card">
            <span className="wallet-modal-icon">
              <CreditCard size={24} />
            </span>
            <h2>No payout account added</h2>
            <p>Add a bank account to enable withdrawal requests from your wallet.</p>
            <button onClick={handleOpenModal} className="wallet-primary-button">
              <Plus size={18} />
              Add Payment Detail
            </button>
          </section>
        )}
      </main>

      {showModal && (
        <PaymentDetailForm
          onClose={handleCloseModal}
          onSave={handleSavePayment}
        />
      )}
    </div>
  );
};

export default PaymentDetail;
