"use client";

import React, { useEffect, useState } from "react";
import { Bell, Settings, Plus, Badge, DotIcon, Search, Briefcase, Eye, Edit } from "lucide-react";
import FreelancerDashboard from "../FreelancerDashboard";
import { testProjects } from "../../sample/data";

const ProjectsPage = () => {
  const [projects, setProject] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res?.json();
      setProject(testProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex-1 ml-6 overflow-y-auto">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-b-xl shadow-xl">
        <div className="flex justify-between items-center px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Your Projects</h2>
            <p className="text-indigo-100 mt-1">{projects.length} active projects</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white hover:text-indigo-200 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:text-indigo-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </button>

          <div className="relative">
            <input type="text" placeholder="Search projects..." className="pl-10 pr-4 py-2 w-64 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200/80">
              <thead className="bg-gray-50/70">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deadline</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {projects?.map((project) => (
                  <tr key={project?.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-4">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{project?.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{project?.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold mr-3">{project?.client.charAt(0)}</div>
                        <div className="text-sm text-gray-700">{project?.client}</div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${project?.status === "completed" ? "bg-green-100 text-green-800" : project?.status === "in-progress" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}
                      `}
                      >
                        {project?.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{project.deadline}</div>
                      <div
                        className={`text-xs mt-1 
                        ${new Date(project?.deadline) < new Date() ? "text-red-500" : "text-gray-500"}
                      `}
                      >
                        {new Date(project?.deadline) < new Date() ? "Overdue" : "Due soon"}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-semibold text-gray-700">${project.amount.toLocaleString()}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600">{projects?.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Completed</h3>
            <p className="text-3xl font-bold text-green-600">{projects?.filter((p) => p.status === "completed").length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">${projects?.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Page() {
  return (
    <FreelancerDashboard>
      <ProjectsPage />
    </FreelancerDashboard>
  );
}
