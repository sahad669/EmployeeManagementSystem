import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const EmployeeProtectedRouter = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "employee") {
    return <Navigate to="/admin" />;
  }
  return children;
};

export default EmployeeProtectedRouter