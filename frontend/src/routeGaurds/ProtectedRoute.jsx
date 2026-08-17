import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContent } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const {
    isLoggedIn,
    authLoading
  } = useContext(AuthContent);

  // Still checking the backend
  if (authLoading) {
    return <div>Checking authentication...</div>;
  }

  // Authentication check finished and user isn't logged in
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;