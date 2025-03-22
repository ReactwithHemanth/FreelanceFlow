"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, Users, Bell, Settings, LogOut, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const router = useRouter();
  const projects = [
    { id: 1, title: "Website Redesign", client: "Acme Inc", status: "in-progress", deadline: "2025-04-15", amount: 2500 },
    { id: 2, title: "Logo Design", client: "TechStart", status: "pending", deadline: "2025-04-01", amount: 800 },
    { id: 3, title: "Marketing Campaign", client: "GrowBiz", status: "completed", deadline: "2025-03-15", amount: 3200 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">FreelanceFlow</h1>
        </div>
        <nav className="mt-6">
          <div className="flex items-center px-6 py-3 cursor-pointer text-gray-600 hover:bg-gray-50" onClick={() => router.push("/projects")}>
            <Briefcase className="w-5 h-5 mr-3" />
            <span>Projects</span>
          </div>
          <div className="flex items-center px-6 py-3 cursor-pointer text-gray-600 hover:bg-gray-50" onClick={() => router.push("/invoices")}>
            <DollarSign className="w-5 h-5 mr-3" />
            <span>Invoices</span>
          </div>
          <div className="flex items-center px-6 py-3 cursor-pointer text-gray-600 hover:bg-gray-50" onClick={() => router.push("/profile")}>
            <Users className="w-5 h-5 mr-3" />
            <span>Profile</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{project.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={project.status === "completed" ? "bg-green-100 text-green-800" : project.status === "in-progress" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}>{project.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.deadline}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${project.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
