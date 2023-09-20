import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './ComplaintEditModal';

function ComplaintManager() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    // Fetch complaints data from the server
    axios
      .get('http://localhost:5000/api/complaints')
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
      });
  }, []);

  const openComplaintModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  // Callback function to update the status of a complaint
  const updateComplaintStatus = (updatedComplaint) => {
    const updatedComplaints = complaints.map((complaint) => {
      if (complaint.applicationNumber === updatedComplaint.applicationNumber) {
        return updatedComplaint;
      }
      return complaint;
    });

    setComplaints(updatedComplaints);
  };

  return (
    <div className="Complaint-Edit">
      <h1>Complaint Manager</h1>
      <div className='ComplaintEditTable'>
        <table className='scrollable-table'>
          <thead>
            <tr>
              <th className="sticky-header">Complaint ID</th>
              <th className="sticky-header">Complaint Type</th>
              <th className="sticky-header">Status</th>
              <th className="sticky-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.applicationNumber}>
                <td>{complaint.applicationNumber}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.status}</td>
                <td>
                  <button onClick={() => openComplaintModal(complaint)}>OPEN</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedComplaint && (
        <Modal
          complaint={selectedComplaint}
          onUpdateStatus={updateComplaintStatus}
        />
      )}
    </div>
  );
      }  
export default ComplaintManager;
