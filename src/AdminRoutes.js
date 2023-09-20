// AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagePlansPage from './pages/ManagePlans'; // Import the ManagePlansPage component

function AdminRoutes() {
  return (
    <Routes>
      {/* Other admin routes */}
      <Route path="manage-plans" element={<ManagePlansPage />} />
      {/* Add other admin routes as needed */}
    </Routes>
  );
}

export default AdminRoutes;
