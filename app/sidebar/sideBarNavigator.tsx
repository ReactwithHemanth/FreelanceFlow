"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Briefcase, DollarSign, LogOut, MessageSquare, Moon, Sun, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export const Sidebar = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const handleNavigation = (path: string) => {
    setActiveItem(path);
    router.push(path);
  };

  const navItems = [
    { path: "/components/projects", icon: <Briefcase className="w-5 h-5" />, label: "Projects" },
    { path: "/components/invoices", icon: <DollarSign className="w-5 h-5" />, label: "Invoices" },
    { path: "/components/profile", icon: <Users className="w-5 h-5" />, label: "Profile" },
    { path: "/components/analytics", icon: <Activity className="w-5 h-5" />, label: "Analytics" },
    { path: "/components/messages", icon: <MessageSquare className="w-5 h-5" />, label: "Messages" },
  ];

  return (
    <div className="w-72 bg-gray-900 h-screen fixed border-r border-gray-800 backdrop-blur-lg bg-opacity-90">
      {/* Logo with futuristic accent */}
      <div className="p-6 flex items-center">
        <div className="relative">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">FreelanceFlow</h1>
          <div className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </div>

      {/* Navigation with hover effects */}
      <nav className="mt-8 px-4 space-y-1">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={`relative flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-300
              ${activeItem === item.path ? "bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"}
            `}
          >
            {/* Animated indicator */}
            {activeItem === item.path && <div className="absolute left-0 w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full"></div>}
            <div className="flex items-center">
              <div className={`p-1.5 mr-3 rounded-md ${activeItem === item.path ? "bg-blue-500/20" : "bg-gray-800"}`}>
                {React.cloneElement(item.icon, {
                  className: `${item.icon.props.className} ${activeItem === item.path ? "text-blue-400" : "text-gray-500"}`,
                })}
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            {activeItem === item.path && <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
          </div>
        ))}
      </nav>

      {/* Futuristic divider */}
      <div className="px-6 my-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </div>

      {/* User profile with glass effect */}
      <div className="px-4 mt-auto mb-6">
        <div className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">U</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Your Profile</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme toggle (placeholder) */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800/50 p-2 rounded-full flex justify-center">
          <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="px-4 mb-6">
        <div className="bg-gray-800/50 p-2 rounded-full flex justify-center">
          <button onClick={logout} className="p-2 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
