import React, { useState } from 'react';
import axios from 'axios';
import PaymentStatusModal from './PaymentStatusModal'; // Import the PaymentStatusModal component

function PlanDetailsPopup({ plan, onClose }) {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State for payment modal

  const handlePurchase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions', {
        planName: plan['planName'],
        planValue: plan['fmc'],
      });

      if (response.data.message === 'Transaction saved successfully') {
        setPaymentStatus('success');
        setTransactionId(response.data.transactionId);
        setIsPaymentModalOpen(true); // Open payment modal on success
      } else {
        setPaymentStatus('error');
        setIsPaymentModalOpen(true); // Open payment modal on error
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setPaymentStatus('error');
      setIsPaymentModalOpen(true); // Open payment modal on error
    }
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="plan-details-popup">
        <button className="close-button" onClick={onClose} >
          &#x2716; {/* Unicode for the cross symbol */}
        </button>
        <h3>{plan['planName']}</h3>
        <p>Fixed Monthly Charges: {plan['fmc']}</p>
        <p>Bandwidth: {plan['bandwidth']}</p>
        <p>FUP Speed: {plan['fupSpeed']}</p>
        <p>Voice Call: {plan['voiceCall']}</p>
        <p>Free OTT: {plan['freeOTT']}</p>
        <p>Security Deposit: {plan['securityDeposit']}</p>
        <div>
          <p>Advance Higher Payment Options and Duration of Service:</p>
          <ul>
            <li>{plan['advancePayment'].c1}</li>
            <li>{plan['advancePayment'].c2}</li>
            <li>{plan['advancePayment'].c3}</li>
            <li>{plan['advancePayment'].c4}</li>
          </ul>
        </div>
        <button className="purchase-button" onClick={handlePurchase}>
          Purchase Plan
        </button>
      </div>
      {isPaymentModalOpen && (
        <PaymentStatusModal
          status={paymentStatus}
          transactionId={transactionId}
          onClose={handleClosePaymentModal}
        />
      )}
      
    </div>
  );
}
export default PlanDetailsPopup;