"use client";

import React, { useState } from "react";
import FreelancerDashboard from "../FreelancerDashboard";
import { Search, Plus, Download, Filter, ChevronDown, MoreVertical } from "lucide-react";

const InvoicesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilter, setshowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Test data
  const invoices = [
    {
      id: "INV-2023-001",
      client: "Acme Corp",
      amount: 2450,
      date: "2023-11-15",
      dueDate: "2023-12-15",
      status: "paid",
      project: "Website Redesign",
    },
    {
      id: "INV-2023-002",
      client: "Globex Inc",
      amount: 3200,
      date: "2023-11-20",
      dueDate: "2023-12-20",
      status: "sent",
      project: "Mobile App Development",
    },
    {
      id: "INV-2023-003",
      client: "Sunrise Studios",
      amount: 1800,
      date: "2023-12-01",
      dueDate: "2024-01-01",
      status: "overdue",
      project: "Brand Identity",
    },
    {
      id: "INV-2023-004",
      client: "TechStart",
      amount: 4200,
      date: "2023-12-05",
      dueDate: "2024-01-05",
      status: "draft",
      project: "E-commerce Platform",
    },
    {
      id: "INV-2023-005",
      client: "Digital Nexus",
      amount: 1350,
      date: "2023-12-10",
      dueDate: "2024-01-10",
      status: "paid",
      project: "SEO Optimization",
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || invoice.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const statusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "paid":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Paid</span>;
      case "sent":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Sent</span>;
      case "overdue":
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Overdue</span>;
      case "draft":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Draft</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="flex-1 ml-6 overflow-y-auto">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-b-xl shadow-xl">
        <div className="flex justify-between items-center px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Invoice Management</h1>
            <p className="text-indigo-100 mt-1">
              {invoices.length} total invoices • ${invoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()} total revenue
            </p>
          </div>
          <button className="flex items-center px-5 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg font-medium">
            <Plus className="w-5 h-5 mr-2" />
            New Invoice
          </button>
        </div>
      </header>

      <main className="p-6">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input type="text" placeholder="Search invoices..." className="pl-10 pr-4 py-2 w-full bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <button onClick={() => setshowFilter(!showFilter)} className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium">Filter</span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-600" />
              </button>
              {showFilter ? (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  {["all", "draft", "sent", "paid", "overdue"].map((filter) => (
                    <button key={filter} className={`block w-full text-left px-4 py-2 text-sm capitalize ${activeFilter === filter ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`} onClick={() => setActiveFilter(filter)}>
                      {filter}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90">
          <table className="min-w-full divide-y divide-gray-200/80">
            <thead className="bg-gray-50/70">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{invoice.project}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${invoice.status === "overdue" ? "text-red-500 font-medium" : "text-gray-500"}`}>{new Date(invoice.dueDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{statusBadge(invoice.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Invoices</h3>
            <p className="text-3xl font-bold text-blue-600">{invoices.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Paid</h3>
            <p className="text-3xl font-bold text-green-600">{invoices.filter((i) => i.status === "paid").length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{invoices.filter((i) => i.status === "sent").length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Overdue</h3>
            <p className="text-3xl font-bold text-red-600">{invoices.filter((i) => i.status === "overdue").length}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Page() {
  return (
    <FreelancerDashboard>
      <InvoicesPage />
    </FreelancerDashboard>
  );
}
