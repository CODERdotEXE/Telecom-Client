// client/src/components/NavBar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function NavBar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  return (
    <div className="nav-bar">
      <div className="logo">
        <Link to="/">Telecom App</Link>
      </div>
      <ul className="nav-links">
        {user ? (
          <>
            <li>
              <Link to="/login/home" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/view-plans" className="nav-link">
                View Plans
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
            <li onClick={logoutUser} className="nav-link">
              Logout
            </li>
          </>
        ) : (
          <li className="nav-link" to="/login">
            Login
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
