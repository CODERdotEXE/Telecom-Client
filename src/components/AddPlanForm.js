// AddPlanForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddPlanForm() {
  const [planDetails, setPlanDetails] = useState({
    planName: '',
    fmc: 0,
    bandwidth: '',
    fupSpeed: '',
    voiceCall: '',
    freeOTT: '',
    securityDeposit: '',
    advancePayment: {
      c1: '',
      c2: '',
      c3: '',
      c4: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanDetails({
      ...planDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/plans', planDetails);
      console.log('Plan added successfully:', response.data);
      alert("Your Plan has been created Successfully");
      // Clear form or perform other actions as needed
    } catch (error) {
      console.error('Error adding plan:', error);
      alert( "Something went wrong while creating your new plan" );
      // Handle errors or display an error message
    }
  };

  return (
    <div className="add-plan-form">
      <h2>Add New Plan</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Plan Name:
          <input
            type="text"
            name="planName"
            value={planDetails.planName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>

        
        <label className="form-label">
          Fixed Monthly Charges (FMC):
          <input
            type="number"
            name="fmc"
            value={planDetails.fmc}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
 
        <label className="form-label">
          Bandwidth (Download Speed):
          <input
            type="text"
            name="bandwidth"
            value={planDetails.bandwidth}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>

<label className="form-label">
  FUP Speed:
  <input
    type="text"
    name="fupSpeed"
    value={planDetails.fupSpeed}
    onChange={handleChange}
    className="form-input"
    required
  />
</label>

<label className="form-label">
  Voice Call:
  <input
    type="text"
    name="voiceCall"
    value={planDetails.voiceCall}
    onChange={handleChange}
    className="form-input"
    required
  />
</label>

<label className="form-label">
  Free OTT:
  <input
    type="text"
    name="freeOTT"
    value={planDetails.freeOTT}
    onChange={handleChange}
    className="form-input"
    required
  />
</label>

<label className="form-label">
  Security Deposit:
  <input
    type="text"
    name="securityDeposit"
    value={planDetails.securityDeposit}
    onChange={handleChange}
    className="form-input"
    required
  />
</label>
<p className="form-label">Advance Higher Payment Option and Duration of Service</p>
<label className="form-label">
  c1:
  <input
    type="text"
    name="advancePayment.c1"
    value={planDetails.advancePayment.c1}
    onChange={handleChange}
    className="form-input"


  />
</label>

<label className="form-label">
  c2:
  <input
    type="text"
    name="advancePayment.c2"
    value={planDetails.advancePayment.c2}
    onChange={handleChange}
    className="form-input"


  />
</label>

<label className="form-label">
  c3:
  <input
    type="text"
    name="advancePayment.c3"
    value={planDetails.advancePayment.c3}
    onChange={handleChange}
    className="form-input"


  />
</label>

<label className="form-label">
  c4:
  <input
    type="text"
    name="advancePayment.c4"
    value={planDetails.advancePayment.c4}
    onChange={handleChange}
    className="form-input"
  

  />
</label> 
        <button className='btn' type="submit">Add Plan</button>
      </form>
    </div>
  );
}

export default AddPlanForm;
