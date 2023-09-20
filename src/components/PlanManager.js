import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlansManagerModal from './PlansManagerModal.js'; // Import the modal component

function PlansManager() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Fetch plan data from the server
    axios.get('http://localhost:5000/api/plans')
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching plans:', error);
      });
  }, []);

  const openPlanModal = (plan) => {
    setSelectedPlan(plan);
  };

  const deletePlan = () => {
    // Delete the selected plan
    axios
      .delete(`http://localhost:5000/api/plans/${selectedPlan.planID}`) 
      .then((response) => {
        console.log('Plan deleted successfully:', response.data);
        alert('Plan Deleted Successfully');
        // Close the modal
        setSelectedPlan(null);
        // You can also refresh the plans data here if needed
      })
      .catch((error) => {
        console.error('Error deleting plan:', error);
        // Handle error as needed
      });
  };

  return (
    <div className="Plans-Manager">
      <h1>Plans Manager</h1>
      <div className="PlansManagerTable">
        <table className='scrollable-table'>
          <thead>
            <tr>
              <th className="sticky-header">Plan ID</th>
              <th className="sticky-header">Plan Name</th>
              <th className="sticky-header">FMC</th>
              <th className="sticky-header">Actions</th>
            </tr>
          </thead>
          <tbody>
          {plans.map((plan) => (
  <tr key={plan.planID}> {/* Use plan.planID as the key */}
    <td>{plan.planID}</td>
    <td>{plan.planName}</td>
    <td>{plan.fmc}</td>
    <td>
      <button onClick={() => openPlanModal(plan)}>OPEN</button>
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>
      {selectedPlan && (
        <PlansManagerModal
          plan={selectedPlan}
          onDeletePlan={deletePlan}
          onClose={() => setSelectedPlan(null)} // Close modal when needed
        />
      )}
    </div>
  );
}

export default PlansManager;
