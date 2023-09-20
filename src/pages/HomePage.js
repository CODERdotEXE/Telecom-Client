// client/src/pages/HomePage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/Carousel';
import DownloadBar from '../components/DownloadBar'; // Import the DownloadBar component
import axios from 'axios'; // Import Axios for making API requests
import TrackComplain from '../components/TrackComplain';
function HomePage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      // Send feedback and rating to the server and MongoDB
      const response = await axios.post('http://localhost:5000/api/feedback', {
  rating,
  feedback,
});


      if (response.data.message === 'Feedback saved successfully') {
        alert('Thank you for your feedback!');
        setRating(0);
        setFeedback('');
      } else {
        alert('Failed to save feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback. Please try again.');
    }
  };

  return (
    <div className="home">
      <h1>Welcome to Telecom App</h1>
      <ImageCarousel />
      <DownloadBar />
      <div className='homeContainer'>
      <div className="testimonial-section">
  <h2>Give Us Your Feedback</h2>
  <p>Please provide your valuable feedback</p>
  <div className="rating">
  <span>Rating:</span>
  <div className="star-container">
    {[1, 2, 3, 4, 5].map((index) => (
      <label key={index} className="star">
        <input
          type="radio"
          name="rating"
          value={index}
          onChange={handleRatingChange}
        />
        <span className={`star-icon ${index <= rating ? "filled" : ""}`}>
          ★
        </span>
      </label>
    ))}
  </div>
</div>
  <textarea
    rows="4"
    cols="50"
    placeholder="Enter your feedback here"
    value={feedback}
    onChange={handleFeedbackChange}
  />
  <button className="btn" onClick={handleSubmitFeedback}>Submit Feedback</button>
</div>
      <div className="navigation">
        <Link to="/">Home</Link>
        <Link to="/view-plans">View Plans</Link>
        <Link to="/register-complaint">Register Complaint</Link>
        {/* Add more navigation links as needed */}
      </div>
      <div className='Track-complain'>
<TrackComplain />
      </div>
    </div>
  </div>
  );
}

export default HomePage;
