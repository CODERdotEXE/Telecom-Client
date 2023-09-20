import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';

function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    customerID: '',
    mobileNo: '',
    aadharNo: '',
    addressLine1: '',
    addressLine2: '',
    pin: '',
    district: '',
    city: '',
  });
  const [isProfileAvailable, setIsProfileAvailable] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/profile/${user.email}`);
      if (response.data.profile) {
        setProfileData(response.data.profile);
        setIsProfileAvailable(true);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/profile', { profileData });
      if (response.data.profile) {
        setProfileData(response.data.profile);
        setIsProfileAvailable(true);
        setIsEditMode(false); // Exit edit mode after updating
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="profile-page">
      <h2>Welcome {user.name} to BSNL</h2>
      <p>This is the profile section, and you are requested to update all the required fields before proceeding.</p>

      {isProfileAvailable && !isEditMode ? (
        <>
          <div className="profile-details">
            <p>Name: {profileData.name}</p>
            <p>Email: {profileData.email}</p>
            <p>Customer ID: {profileData.customerID}</p>
            <p>Mobile No.: {profileData.mobileNo}</p>
            <p>Aadhar No.: {profileData.aadharNo}</p>
            <p>Address Line 1: {profileData.addressLine1}</p>
            <p>Address Line 2: {profileData.addressLine2}</p>
            <p>PIN: {profileData.pin}</p>
            <p>District: {profileData.district}</p>
            <p>City: {profileData.city}</p>
          </div>
          <button className='btn' onClick={toggleEditMode}>Edit Profile</button>
        </>
      ) : (
        <form className="profile-form">
          <div className="form-field">
            <label htmlFor="name">Name <span className="required">*</span>:</label>
            <input type="text" id="name" name="name" value={profileData.name} disabled />
          </div>
          <div className="form-field">
            <label htmlFor="name">Email <span className="required">*</span>:</label>
            <input type="text" id="email" name="email" value={profileData.email} disabled />
          </div>
          <div className="form-field">
  <label htmlFor="customerID">Customer ID <span className="required">*</span>:</label>
  <input
    type="text"
    id="customerID"
    name="customerID"
    value={profileData.customerID}
    disabled
  />
</div>
<div className="form-field">
  <label htmlFor="mobileNo">Mobile No. <span className="required">*</span>:</label>
  <input
    type="text"
    id="mobileNo"
    name="mobileNo"
    value={profileData.mobileNo}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
    required={!isProfileAvailable}
  />
</div>

<div className="form-field">
  <label htmlFor="aadharNo">Aadhar No. <span className="required">*</span>:</label>
  <input
    type="text"
    id="aadharNo"
    name="aadharNo"
    value={profileData.aadharNo}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
    required={!isProfileAvailable}
  />
</div>

<div className="form-field">
  <label htmlFor="addressLine1">Address Line 1 <span className="required">*</span>:</label>
  <input
    type="text"
    id="addressLine1"
    name="addressLine1"
    value={profileData.addressLine1}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
    required={!isProfileAvailable}
  />
</div>

<div className="form-field">
  <label htmlFor="addressLine2">Address Line 2 <span className="required">*</span>:</label>
  <input
    type="text"
    id="addressLine2"
    name="addressLine2"
    value={profileData.addressLine2}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
    required={!isProfileAvailable}
  />
</div>

<div className="form-field">
  <label htmlFor="pin">PIN <span className="required">*</span>:</label>
  <input
    type="text"
    id="pin"
    name="pin"
    value={profileData.pin}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
    required={!isProfileAvailable}
  />
</div>
<div className="form-field">
  <label htmlFor="district">District:</label>
  <input
    type="text"
    id="district"
    name="district"
    value={profileData.district}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
  />
</div>

<div className="form-field">
  <label htmlFor="city">City:</label>
  <input
    type="text"
    id="city"
    name="city"
    value={profileData.city}
    onChange={handleInputChange}
    disabled={isProfileAvailable}
  />
</div>
<div className="form-actions">
            {isEditMode ? (
              <>
                <button type="button"className='btn' onClick={handleUpdateProfile}>Update Profile</button>
                <button type="button" className='btn' onClick={toggleEditMode}>Cancel</button>
              </>
            ) : (
              <button type="button" className='btn' onClick={toggleEditMode}>Edit Profile</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;


