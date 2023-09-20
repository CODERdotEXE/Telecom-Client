import React from 'react';
import axios from 'axios';

function PlansManagerModal({ plan, onDeletePlan, onClose }) {
    const deletePlan = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this plan?');
      
        if (confirmDelete) {
          // Delete the selected plan
          axios
            .delete(`http://localhost:5000/api/plans/${plan.planID}`)
            .then((response) => {
              console.log('Plan deleted successfully:', response.data);
              alert('Plan Deleted Successfully');
              // Close the modal
              onClose();
              // Refresh plans (you can fetch plans again)
              // For example, you can use a callback function passed from PlansManager
              onDeletePlan();
            })
            .catch((error) => {
              console.error('Error deleting plan:', error);
              alert('Failed to delete plan. Please try again.');
            });
        }
      };

  return (
    <div className="modal-overlay">
      <div className="admin-modal-2">
        <button className="close-button" onClick={onClose}>
          &#x2716; {/* Unicode for the cross symbol */}
        </button>
        <h2>Plan Details</h2>
        <p>Plan ID: {plan.planId}</p>
        <p>Plan Name: {plan.planName}</p>
        <p>FMC: {plan.fmc}</p>
        <p>BandWidth : {plan.bandwidth}</p>
        <p>FUP Speed : {plan.fupSpeed}</p>
        <p>Voice Call : {plan.voiceCall}</p>
        <p>Free OTT : {plan.freeOTT}</p>
        <p>Security Deposit : {plan.securityDeposit}</p>
        <h3>Advance Payment</h3>
        <p>C1 : {plan.advancePayment.c1}</p>
        <p>C2 : {plan.advancePayment.c2}</p>
        <p>C3 : {plan.advancePayment.c3}</p>
        <p>C4 : {plan.advancePayment.c4}</p>
        <button onClick={deletePlan} className='modal-button'>Delete Plan</button>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default PlansManagerModal;
