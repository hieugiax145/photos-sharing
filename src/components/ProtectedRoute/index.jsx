import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
  const token = cookies.get("TOKEN");
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
