
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ImageCarousel from '../components/Carousel';
// import AddPlanForm from '../components/AddPlanForm';
// import { useAuth } from '../utils/AuthContext';
// import PlansEdit from '../components/PlanManager';
// import FeedbackEdit from '../components/FeedbackManager';

// function AdminDashboard({ logoutAdmin }) {
//   const [sessionStartTime, setSessionStartTime] = useState(null);
//   const [counter, setCounter] = useState('00:00');
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchSessionStartTime = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/sessionStartTime');
//         setSessionStartTime(new Date(response.data.sessionStartTime));
//       } catch (error) {
//         console.error('Error fetching session start time:', error);
//       }
//     };

//     fetchSessionStartTime();
//   }, []);

//   useEffect(() => {
//     // Function to update the counter
//     const updateCounter = () => {
//       if (sessionStartTime) {
//         const currentTime = new Date();
//         const elapsedTimeInMinutes = Math.floor((currentTime - sessionStartTime) / 60000);

//         // Calculate hours and minutes
//         const hours = String(Math.floor(elapsedTimeInMinutes / 60)).padStart(2, '0');
//         const minutes = String(elapsedTimeInMinutes % 60).padStart(2, '0');

//         setCounter(`${hours}:${minutes}`);
//       }
//     };

//     // Update the counter every minute
//     const interval = setInterval(updateCounter, 60000);

//     // Cleanup the interval when the component unmounts
//     return () => {
//       clearInterval(interval);
//     };
//   }, [sessionStartTime]);

//   const handleLogout = async () => {
//     try {
//       // Clear the session start time when the user logs out
//       setSessionStartTime(null);

//       // Make a POST request to log out the admin
//       const response = await axios.post('http://localhost:5000/api/admin/logout', {
//         username: 'admin',
//       });

//       if (response.data.success) {
//         // If logout is successful, call the logoutAdmin function passed from the parent component
//         logoutAdmin();
//       } else {
//         alert('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="admin-heading">
//         <h1>Hello {user.name}</h1>
//           <p>Session Start Time: {sessionStartTime ? sessionStartTime.toLocaleTimeString() : 'Not Started'}</p>
//           <p>Session Duration: {counter}</p>
//         <button className="logout-btn" onClick={handleLogout}>Logout</button>
//       </div>
//       <ImageCarousel />
//       <div className="dashboard-structure">
//         <div className="AddPlanForm"><AddPlanForm /></div>
//         <div className="PlansEdit"><PlansEdit /></div>
//         <div className="FeedbackEdit"><FeedbackEdit /></div>
//       </div>
//       {/* Add other admin dashboard components and functionalities */}
//     </div>
//   );
// }

// export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ImageCarousel from '../components/Carousel';
// import AddPlanForm from '../components/AddPlanForm';
// import { useAuth } from '../utils/AuthContext';
// import PlansEdit from '../components/PlanManager';
// import FeedbackEdit from '../components/FeedbackManager';

// function AdminDashboard({ logoutAdmin }) {
//   const [sessionStartTime, setSessionStartTime] = useState(null);
//   const [counter, setCounter] = useState('00:00');
//   const [userLocation, setUserLocation] = useState(null); // State to store user's location
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchSessionStartTime = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/sessionStartTime');
//         setSessionStartTime(new Date(response.data.sessionStartTime));
//       } catch (error) {
//         console.error('Error fetching session start time:', error);
//       }
//     };

//     fetchSessionStartTime();
//   }, []);

//   useEffect(() => {
//     // Function to update the counter
//     const updateCounter = () => {
//       if (sessionStartTime) {
//         const currentTime = new Date();
//         const elapsedTimeInMinutes = Math.floor((currentTime - sessionStartTime) / 60000);

//         // Calculate hours and minutes
//         const hours = String(Math.floor(elapsedTimeInMinutes / 60)).padStart(2, '0');
//         const minutes = String(elapsedTimeInMinutes % 60).padStart(2, '0');

//         setCounter(`${hours}:${minutes}`);
//       }
//     };

//     // Update the counter every minute
//     const interval = setInterval(updateCounter, 60000);

//     // Cleanup the interval when the component unmounts
//     return () => {
//       clearInterval(interval);
//     };
//   }, [sessionStartTime]);

//   useEffect(() => {
//     // Fetch the user's location using Geolocation API
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
        
//         (position) => {
//           // Extract latitude and longitude from the position
//           const { latitude, longitude } = position.coords;

//           // Use a reverse geocoding service to get the user's location based on latitude and longitude
//           axios
//             .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
//             .then((response) => {
//               setUserLocation(response.data.display_name);
//             })
//             .catch((error) => {
//               console.error('Error fetching user location:', error);
//             });
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       // Clear the session start time when the user logs out
//       setSessionStartTime(null);

//       // Make a POST request to log out the admin
//       const response = await axios.post('http://localhost:5000/api/admin/logout', {
//         username: 'admin',
//       });

//       if (response.data.success) {
//         // If logout is successful, call the logoutAdmin function passed from the parent component
//         logoutAdmin();
//       } else {
//         alert('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <div>
//       <div className="admin-heading">
//         <h1>Hello {user.name}</h1>
//         <div className="session-info">
//           <p>Session Start Time:</p>
//           <p>{sessionStartTime ? sessionStartTime.toLocaleTimeString() : 'Not Started'}</p>
//           <p>Session Duration:</p>
//           <p>{counter}</p>
//           <p>User Location:</p>
//           <p>{userLocation || 'Fetching location...'}</p>
//         </div>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//       <ImageCarousel />
//       <div className="dashboard-structure">
//         <div className="AddPlanForm">
//           <AddPlanForm />
//         </div>
//         <div className="PlansEdit">
//           <PlansEdit />
//         </div>
//         <div className="FeedbackEdit">
//           <FeedbackEdit />
//         </div>
//       </div>
//       {/* Add other admin dashboard components and functionalities */}
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCarousel from '../components/Carousel';
import AddPlanForm from '../components/AddPlanForm';
import { useAuth } from '../utils/AuthContext';
import PlansEdit from '../components/PlanManager';
import ComplaintEdit from '../components/ComplaintManager';

function AdminDashboard({ logoutAdmin }) {
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [counter, setCounter] = useState('00:00');
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const { user } = useAuth();

  useEffect(() => {
    const fetchSessionStartTime = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/sessionStartTime');
        setSessionStartTime(new Date(response.data.sessionStartTime));
      } catch (error) {
        console.error('Error fetching session start time:', error);
      }
    };

    fetchSessionStartTime();
  }, []);

  useEffect(() => {
    // Function to update the counter
    const updateCounter = () => {
      if (sessionStartTime) {
        const currentTime = new Date();
        const elapsedTimeInMinutes = Math.floor((currentTime - sessionStartTime) / 60000);

        // Calculate hours and minutes
        const hours = String(Math.floor(elapsedTimeInMinutes / 60)).padStart(2, '0');
        const minutes = String(elapsedTimeInMinutes % 60).padStart(2, '0');

        setCounter(`${hours}:${minutes}`);
      }
    };

    // Update the counter every minute
    const interval = setInterval(updateCounter, 60000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [sessionStartTime]);

  useEffect(() => {
    // Fetch the user's location using Geolocation API
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position
          const { latitude, longitude } = position.coords;

          // Use a reverse geocoding service to get the user's location based on latitude and longitude
          axios
            .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
              params: {
                format: 'json',
                addressdetails: 1,
              },
              // Set maximumAge and enableHighAccuracy options for improved accuracy
              maximumAge: 600000, // 10 minutes
              enableHighAccuracy: true,
            })
            .then((response) => {
              const addressDetails = response.data.address;
              const location = [
                addressDetails.city || '',
                addressDetails.state || '',
                addressDetails.country || '',
              ].join(', ');

              setUserLocation(location);
            })
            .catch((error) => {
              console.error('Error fetching user location:', error);
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
        {
          // Set maximumAge and enableHighAccuracy options for improved accuracy
          maximumAge: 600000, // 10 minutes
          enableHighAccuracy: true,
        }
      );
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear the session start time when the user logs out
      setSessionStartTime(null);

      // Make a POST request to log out the admin
      const response = await axios.post('http://localhost:5000/api/admin/logout', {
        username: 'admin',
      });

      if (response.data.success) {
        // If logout is successful, call the logoutAdmin function passed from the parent component
        logoutAdmin();
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <div className="admin-heading">
        <h1>Hello {user.name}</h1>

          <p>Session Start Time: {sessionStartTime ? sessionStartTime.toLocaleTimeString() : 'Not Started'}</p>
          <p>Session Duration: {counter}</p>
          <p>Location: {userLocation || 'Fetching location...'}</p>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ImageCarousel />
      <div className="dashboard-structure">
        <div className="AddPlanForm">
          <AddPlanForm />
        </div>
        <div className="PlansEdit">
          <PlansEdit />
        </div>
        <div className="ComplaintEdit">
          <ComplaintEdit />
        </div>
      </div>
      {/* Add other admin dashboard components and functionalities */}
    </div>
  );
}

export default AdminDashboard;
