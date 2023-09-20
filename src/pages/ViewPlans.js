// client/src/pages/ViewPlans.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanDetailsPopup from '../components/PlanDetailsPopup';

function ViewPlans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/plans') // Update with your server URL
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching plans:', error);
      });
  }, []);

  const openPlanDetails = (plan) => {
    setSelectedPlan(plan);
  };

  const closePlanDetails = () => {
    setSelectedPlan(null);
  };

  const prevCard = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  const nextCard = () => {
    setCurrentIndex(currentIndex < plans.length - 1 ? currentIndex + 1 : plans.length - 1);
  };

  return (
    <div className="view-plans">
      <h2>Bharat Fibre FTTH Plans</h2>
      <div className="carousel1">
        <div className="carousel1-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <div className='planName'><h3>{plan['planName']}</h3></div>
              <p>Fixed Monthly Charges:₹ {plan['fmc']}</p>
              <p>Bandwidth: {plan['bandwidth']}</p>
              <p>FUP Speed: {plan['fupSpeed']}</p>
              <button className="view-details-btn" onClick={() => openPlanDetails(plan)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel1-nav">
        <button onClick={prevCard}>Previous</button>
        <button onClick={nextCard}>Next</button>
      </div>
      {selectedPlan && (
        <PlanDetailsPopup plan={selectedPlan} onClose={closePlanDetails} />
      )}
      {paymentStatus === 'success' && (
        <p className="confirmation-message">Purchase successful! Plan activated.</p>
      )}
      {paymentStatus === 'error' && (
        <p className="error-message">Purchase failed. Please try again.</p>
      )}
    </div>
  );
}

export default ViewPlans;
