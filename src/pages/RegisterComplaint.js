import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function RegisterComplaint() {
  const [complaintType, setComplaintType] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleComplaintTypeChange = (event) => {
    setComplaintType(event.target.value);
  };

  const handleComplaintDescriptionChange = (event) => {
    setComplaintDescription(event.target.value);
  };

  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const cancelImageUpload = () => {
    setImageFile(null);
    setPreviewImage(null);
  };

 
const handleSubmit = async () => {
    if (!complaintType || !complaintDescription) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('complaintType', complaintType);
      formData.append('complaintDescription', complaintDescription);
      formData.append('imageFile', imageFile);

      const response = await axios.post('http://localhost:5000/api/complaints', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
    if (response.data.message === 'Complaint registered successfully') {
        setSuccessMessage(`Complaint registered successfully.Application Number: ${response.data.applicationNumber}`);
        setComplaintType('');
        setComplaintDescription('');
        setImageFile(null);
        setPreviewImage(null);
      }
    } catch (error) {
      console.error('Error registering complaint:', error);
      setErrorMessage('Error registering complaint. Please try again.');
    }
  };

  return (
    <div className="register-complaint">
      <h2>Register a Complaint</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="complaint-form">
        <label htmlFor="complaintType">Complaint Type:<span className="required">*</span></label>
        <select id="complaintType" value={complaintType} onChange={handleComplaintTypeChange}>
          <option value="">Select complaint type</option>
          <option value="Plan Issue">Plan Issue</option>
          <option value="Technical Issue">Technical Issue</option>
          <option value="Service Issue">Service Issue</option>
        </select>
        <label htmlFor="complaintDescription">Complaint Description:<span className="required">*</span></label>
        <textarea
          id="complaintDescription"
          value={complaintDescription}
          onChange={handleComplaintDescriptionChange}
        />
        <label htmlFor="imageFile" className="upload-button">
  <FontAwesomeIcon icon={faUpload} className="upload-icon" />
  Upload Image (optional)
</label>
{imageFile && (
  <div className="image-preview">
    <img src={previewImage} alt="Preview" />
    <button className="cancelButton" onClick={cancelImageUpload}>
      Cancel
    </button>
  </div>
)}
{!imageFile && (
  <input
    type="file"
    id="imageFile"
    className="input-file"
    onChange={handleImageFileChange}
  />
)}
        <button onClick={handleSubmit} className='fixed-button'>Register Complaint</button>
      </div>
    </div>
  );
}

export default RegisterComplaint;
