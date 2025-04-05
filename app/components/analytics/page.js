"use client";

import React from "react";
import FreelancerDashboard from "../FreelancerDashboard";
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { DollarSign, Briefcase, Clock, TrendingUp, Calendar, Download, Filter } from "lucide-react";

const AnalyticsPage = () => {
  // Sample data for charts
  const earningsData = [
    { name: "Jan", earnings: 3200 },
    { name: "Feb", earnings: 4200 },
    { name: "Mar", earnings: 3800 },
    { name: "Apr", earnings: 5100 },
    { name: "May", earnings: 4900 },
    { name: "Jun", earnings: 6200 },
    { name: "Jul", earnings: 5800 },
  ];

  const projectsData = [
    { name: "Completed", value: 12 },
    { name: "In Progress", value: 5 },
    { name: "Upcoming", value: 3 },
  ];

  const clientsData = [
    { name: "New", clients: 4 },
    { name: "Returning", clients: 8 },
    { name: "Corporate", clients: 3 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Key metrics data
  const metrics = [
    {
      title: "Total Earnings",
      value: "$32,450",
      change: "+12%",
      isPositive: true,
      icon: <DollarSign className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: <Briefcase className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Avg. Project Time",
      value: "18 days",
      change: "-3 days",
      isPositive: true,
      icon: <Clock className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Client Satisfaction",
      value: "96%",
      change: "+4%",
      isPositive: true,
      icon: <TrendingUp className="w-5 h-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto ml-6">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-b-xl shadow-xl">
        <div className="flex justify-between items-center px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-indigo-100 mt-1">Track your freelance performance and growth</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
              <Calendar className="w-5 h-5 mr-2" />
              Last 6 Months
            </button>
            <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/90 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">{metric.icon}</div>
              </div>
              <p className={`text-sm mt-3 ${metric.isPositive ? "text-green-600" : "text-red-600"}`}>
                <span>{metric.change}</span> from last period
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Earnings Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/90 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Monthly Earnings</h2>
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Projects Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/90 p-6">
            <h2 className="text-lg font-semibold mb-6">Projects Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={projectsData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {projectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clients Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/90 p-6">
            <h2 className="text-lg font-semibold mb-6">Client Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clientsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clients" radius={[4, 4, 0, 0]}>
                    {clientsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/90 p-6">
            <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                {
                  action: "Completed project",
                  client: "Acme Corp",
                  amount: "$3,200",
                  time: "2 hours ago",
                },
                {
                  action: "Received payment",
                  client: "Globex Inc",
                  amount: "$2,450",
                  time: "1 day ago",
                },
                {
                  action: "New project started",
                  client: "Sunrise Studios",
                  amount: "$1,800",
                  time: "3 days ago",
                },
                {
                  action: "Invoice sent",
                  client: "TechStart",
                  amount: "$4,200",
                  time: "5 days ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.client} • {activity.amount}
                    </p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Page() {
  return (
    <FreelancerDashboard>
      <AnalyticsPage />
    </FreelancerDashboard>
  );
}
