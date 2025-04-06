"use client";

import React from "react";
import { Sidebar } from "../sidebar/sideBarNavigator";
import ProtectedRoute from "./ProtectedRoute";

const FreelancerDashboard = ({ children }) => {
  return (
    <div className="flex dark:bg-gray-800">
      <ProtectedRoute>
        <Sidebar />
        <div className="flex-1 ml-64 bg-gray-100 min-h-screen">{children}</div>
      </ProtectedRoute>
    </div>
  );
};

export default FreelancerDashboard;
