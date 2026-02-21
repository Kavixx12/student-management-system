import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // 1. Check if the token exists in Local Storage
  // (We saved this token when the user logged in successfully)
  const token = localStorage.getItem('token'); // Make sure this matches your storeToken logic

  // 2. If there is NO token, kick them back to the Login page
  if (!token) {
    console.warn("Access Denied! Redirecting to Login...");
    return <Navigate to="/login" replace />;
  }

  // 3. If there IS a token, let them enter the requested page (Dashboard)
  return children;
};

export default ProtectedRoute;