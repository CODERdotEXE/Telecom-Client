import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComplaintEditModal({ complaint, onClose, onUpdateStatus }) {
  const [newStatus, setNewStatus] = useState(complaint.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true); // Open the modal when the component mounts
  }, [complaint]);

  const updateStatus = () => {
    // Update the status for the selected complaint
    axios
      .put(`http://localhost:5000/api/complaints/${complaint.applicationNumber}`, { status: newStatus })
      .then((response) => {
        console.log('Status updated successfully:', response.data);
        alert('Status Updated Successfully');
        // Close the modal
        setIsModalOpen(false);
        // Trigger the onClose callback if provided
        onClose && onClose();
        // Trigger the onUpdateStatus callback with the updated complaint
        onUpdateStatus({ ...complaint, status: newStatus });
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Handle error as needed
      });
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
    // Trigger the onClose callback if provided
    onClose && onClose();
  };

  return isModalOpen ? (
    <div className="modal-overlay">
      <div className="admin-modal">
        <button className="close-button" onClick={closeModal}>
          &#x2716; {/* Unicode for the cross symbol */}
        </button>
        <h2>Complaint Details</h2>
        <p>Complaint ID: {complaint.applicationNumber}</p>
        <p>Complaint Type: {complaint.complaintType}</p>
        <p>Status: {complaint.status}</p>
        <p>Complaint Description: {complaint.complaintDescription}</p>
        <p>Image: {complaint.imagePath}</p>
        <label>
          New Status:
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="Registered">Registered</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
        <button onClick={updateStatus}>Update Status</button>
      </div>
    </div>
  ) : null;
}

export default ComplaintEditModal;
