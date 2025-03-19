import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "../../State/Withdrawal/Action";
import PaymentDetailForm from "./PaymentDetailForm";

const PaymentDetail = () => {
  const { PaymentDetails: paymentDetails } = useSelector((store) => store.withdrawal);


  console.log("hii", paymentDetails); // ✅ Fixed


  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSavePayment = (details) => {
    // Optionally, dispatch an action to update the Redux store if needed
    handleCloseModal();
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="max-w-2xl mx-auto p-6 mt-20">
        {/* Show Payment Details Card only if data exists */}
        {paymentDetails && Object.keys(paymentDetails).length > 0 ? (
          <div className="p-6 rounded-xl shadow-lg border border-green-400 mb-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4">
              Saved Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Account Holder:</span>
                <span className="font-medium">
                  {paymentDetails.accountHolderName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">IFSC Code:</span>
                <span className="font-medium">{paymentDetails.ifsc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Number:</span>
                <span className="font-medium">
                  {paymentDetails.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bank Name:</span>
                <span className="font-medium">{paymentDetails.bankName}</span>
              </div>
            </div>
          </div>
        ) : (
          // Show Add Payment Detail button only if no payment details exist
          <button
            onClick={handleOpenModal}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-shadow shadow-md hover:shadow-lg"
          >
            Add Payment Detail
          </button>
        )}
      </div>

      {/* Payment Detail Form Modal */}
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
