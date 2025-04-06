"use client";

import { useState } from "react";
import { Plus, X, ArrowRight, Check, Sparkles } from "lucide-react";
import { addProject } from "../../services/projectService";

export const NewProjectDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [project, setProject] = useState({
    title: "",
    client: "",
    deadline: "",
    amount: 0,
    status: "not-started",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      await addProject(project);
      setIsOpen(false);
      // Optional: refresh projects list or show success notification
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button onClick={() => setIsOpen(true)} className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg group">
        <Plus className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" />
        New Project
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <h2 className="text-xl font-bold">
                {step === 1 && "Project Basics"}
                {step === 2 && "Client Details"}
                {step === 3 && "Final Touches"}
              </h2>
              <button onClick={() => setIsOpen(false)} className="absolute right-6 top-6 p-1 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-center py-4 border-b">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>{step > i ? <Check className="w-4 h-4" /> : i}</div>
                  {i < 3 && <div className={`w-12 h-1 ${step > i ? "bg-blue-500" : "bg-gray-200"}`}></div>}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="relative">
                    <input type="text" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} className="w-full px-4 py-3 text-lg font-medium border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none" placeholder="Project name..." autoFocus />
                    {project.title && <Sparkles className="absolute right-3 top-3.5 w-5 h-5 text-yellow-400 animate-pulse" />}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">Tip: Make it descriptive like "E-commerce Website Redesign"</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center p-3 border rounded-lg hover:border-blue-400 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3">{project.client.charAt(0) || "?"}</div>
                    <input type="text" value={project.client} onChange={(e) => setProject({ ...project, client: e.target.value })} className="flex-1 focus:outline-none" placeholder="Client name" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Deadline</label>
                      <input type="date" value={project.deadline} onChange={(e) => setProject({ ...project, deadline: e.target.value })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                        <input type="number" value={project.amount} onChange={(e) => setProject({ ...project, amount: Number(e.target.value) })} className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Describe the project in one sentence</p>
                    <textarea value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} className="w-full mt-2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={3} placeholder="We'll be redesigning the homepage and creating 5 new product pages..." />
                  </div>

                  <div className="flex space-x-2 overflow-x-auto py-2">
                    {["UI Design", "Development", "Consulting", "Marketing", "Content"].map((tag) => (
                      <button key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between p-6 border-t">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md" disabled={!project.title && step === 1}>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all shadow-md">
                  Create Project <Sparkles className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
