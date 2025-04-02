"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Briefcase, DollarSign, Users } from "lucide-react";
import { RiSidebarUnfoldFill } from "react-icons/ri";
import { Sidebar } from "../sidebar/sideBarNavigator";

const FreelancerDashboard = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">{children}</div>
    </div>
  );
};

export default FreelancerDashboard;
