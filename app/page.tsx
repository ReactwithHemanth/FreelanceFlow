"use client";

import React from "react";
import { Bell, Settings } from "lucide-react";
import { Sidebar } from "./sidebar/sideBarNavigator";

const FreelancerDashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Sidebar />

      <div className="flex-1 ml-94 p-6 min-h-screen">
        {/* Header with gradient background */}
        <header className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg shadow-lg">
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
              <p className="text-indigo-100">Your freelance journey at a glance</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-white hover:text-indigo-200 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white hover:text-indigo-200 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">U</div>
            </div>
          </div>
        </header>

        {/* Main content area with subtle card styling */}
        <main className="mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-white/90">{children}</div>
        </main>

        {/* Optional welcome message */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Boost Your Productivity</h3>
            <p className="text-blue-100 mb-4">You have 3 ongoing projects. Keep up the great work!</p>
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">View Projects</button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Earnings this month</p>
                <p className="text-xl font-bold">$2,450</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Client satisfaction</p>
                <p className="text-xl font-bold">98%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
