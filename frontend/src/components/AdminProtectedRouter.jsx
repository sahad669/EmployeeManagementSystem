import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRouter = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/employee" />;
  }

  return children;
};

export default AdminProtectedRouter























