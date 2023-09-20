import React, { useState } from 'react';
import axios from 'axios';

function TrackComplain() {
  const [applicationNumber, setApplicationNumber] = useState('');
  const [status, setStatus] = useState(''); // Status received from the server

  const handleApplicationNumberChange = (event) => {
    setApplicationNumber(event.target.value);
  };

  const trackComplaint = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/complaints/${applicationNumber}`); // Replace with your API endpoint
      setStatus(response.data.status); // Update status based on the server response
    } catch (error) {
      console.error('Error tracking complaint:', error);
    }
  };

  const handleCancel = () => {
    // Reset the input field and status when the cancel button is clicked
    setApplicationNumber('');
    setStatus('');
  };

  return (
    <div className="track-complain">
      <h2>Track Your Complaint</h2>
      <input
        type="text"
        placeholder="Enter Application Number"
        value={applicationNumber}
        onChange={handleApplicationNumberChange}
      />
      <button className='btn' onClick={trackComplaint}>Track</button>
      <button  className='cancel-button' onClick={handleCancel}>Clear</button> {/* Add the Cancel button */}
      
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className={`node ${status === 'Registered' ? 'active' : ''}`}>Registered</div>
        <div className={`node ${status === 'In-progress' ? 'active' : ''}`}>In-progress</div>
        <div className={`node ${status === 'Resolved' ? 'active' : ''}`}>Resolved</div>
        <div className={`node ${status === 'Closed' ? 'active' : ''}`}>Closed</div>
      </div>

      {/* Display the current status
      <p>Your Complaint Status:  {status}</p> */}
    </div>
  );
}

export default TrackComplain;
