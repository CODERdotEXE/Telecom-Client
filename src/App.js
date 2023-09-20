// App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './utils/AuthContext';
import HomePage from './pages/HomePage';
import ViewPlans from './pages/ViewPlans';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/NavBar';
import ComplaintRegister from './pages/RegisterComplaint';
import Profile from './pages/ProfilePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/AdminDashboard';


function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/login/home" element={<HomePage />} />
            <Route path="/view-plans" element={<ViewPlans />} />
            <Route path="/register-complaint" element={<ComplaintRegister />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {isAdminAuthenticated ? (
            <Route
              path="/admin"
              element={<AdminDashboard logoutAdmin={logoutAdmin} />}
            >
             {/* <Route path="manage-plans" element={<ManagePlansPage />} />
             use this place to add admin links */}
            </Route>
          ) : (
            <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
          )}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
