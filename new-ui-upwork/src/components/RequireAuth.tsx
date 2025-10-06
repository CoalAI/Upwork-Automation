import React from "react";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // No token → redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Token exists → render the protected component
  return children;
};

export default RequireAuth;
