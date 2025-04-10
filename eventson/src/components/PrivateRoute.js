import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // 🌀 While checking localStorage
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/loginpage" />;
  }

  return children;
};

export default PrivateRoute;
