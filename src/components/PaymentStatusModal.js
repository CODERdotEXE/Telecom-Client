// client/src/components/PaymentStatusModal.js

import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

function PaymentStatusModal({ status, transactionId, onClose }) {
  const transactionIdRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyTransactionId = () => {
    if (transactionIdRef.current) {
      transactionIdRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Show "copied" popup for 2 seconds
    }
  };

  return (
    <div className="modal-overlay">
      <div className="payment-status-modal">
        <button className="close-button" onClick={onClose}>
          &#x2716; {/* Unicode for the cross symbol */}
        </button>
        {status === 'success' && (
          <div>
            <p className="confirmation-message">
              Purchase successful!!
              <br />
              Transaction ID: {transactionId}
            </p>
            <button className="copy-button" onClick={copyTransactionId}>
              <FontAwesomeIcon icon={faCopy} /> Transaction ID
            </button>
            {copied && <p className="copied-popup">Copied!</p>}
            <textarea
              ref={transactionIdRef}
              value={transactionId}
              readOnly
              style={{ position: 'absolute', top: '-9999px' }}
            />
          </div>
        )}
        {status === 'error' && (
          <p className="error-message">Purchase failed. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default PaymentStatusModal;
