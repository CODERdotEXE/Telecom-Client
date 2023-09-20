// // client/src/pages/AdminLogin.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function AdminLogin({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         // Admin login successful
//         onLogin();
//       } else {
//         alert('Invalid username or password');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default AdminLogin;

import React, { useState } from 'react';
import axios from 'axios';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Admin login successful
        onLogin();
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container">
      <div className="login-register-container">
        <p className="login-register-heading">Admin Login</p>
        
          <div className="form-field-wrapper">
            <label className="formlabel">Username</label>
            <input
              className="input-field"
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="form-field-wrapper">
            <label className="formlabel">Password</label>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="form-field-wrapper">
          <button className="btn" onClick={handleLogin}>Login</button>
          </div>
        
      </div>
    </div>
  );
}

export default AdminLogin;
