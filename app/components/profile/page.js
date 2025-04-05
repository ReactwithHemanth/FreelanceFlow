"use client";

import React, { useState } from "react";
import FreelancerDashboard from "../FreelancerDashboard";
import { User, Mail, Phone, Globe, Edit, Save, X, Briefcase, DollarSign, Plus } from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    website: "alexjohnson.design",
    bio: "Freelance UI/UX designer with 5+ years of experience creating beautiful digital experiences for clients worldwide.",
    skills: ["UI Design", "UX Research", "Figma", "Prototyping", "User Testing"],
    hourlyRate: 85,
    experience: "5 years",
  });

  const [formData, setFormData] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 overflow-y-auto ml-6">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-b-xl shadow-xl">
        <div className="flex justify-between items-center px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Profile</h1>
            <p className="text-indigo-100 mt-1">{isEditing ? "Edit your profile details" : "View and manage your professional profile"}</p>
          </div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center px-5 py-2.5 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg font-medium">
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex space-x-3">
              <button onClick={handleCancel} className="flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium">
                <X className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button onClick={handleSave} className="flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg font-medium">
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">{profile.name.charAt(0)}</div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>

                {isEditing ? <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="text-xl font-bold text-center mb-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> : <h2 className="text-xl font-bold text-center mb-2">{profile.name}</h2>}

                <div className="flex items-center text-gray-500 mb-6">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>Freelance Designer</span>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> : <span className="text-gray-700">{profile.email}</span>}
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> : <span className="text-gray-700">{profile.phone}</span>}
                  </div>

                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    ) : (
                      <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profile.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Professional Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hourly Rate</span>
                  {isEditing ? (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                      <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ) : (
                    <span className="font-medium">${profile.hourlyRate}/hr</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Experience</span>
                  {isEditing ? <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> : <span className="font-medium">{profile.experience}</span>}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed Projects</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Client Satisfaction</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">About</h3>
                {isEditing && (
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>
              {isEditing ? <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> : <p className="text-gray-700">{profile.bio}</p>}
            </div>

            {/* Skills Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Skills & Expertise</h3>
                {isEditing && (
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="relative">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...formData.skills];
                          newSkills[index] = e.target.value;
                          setFormData({ ...formData, skills: newSkills });
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => {
                          const newSkills = formData.skills.filter((_, i) => i !== index);
                          setFormData({ ...formData, skills: newSkills });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setFormData({ ...formData, skills: [...formData.skills, ""] });
                    }}
                    className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full hover:bg-gray-50"
                  >
                    + Add Skill
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Portfolio</h3>
                <button className="text-blue-600 hover:text-blue-800">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Project {item}</span>
                  </div>
                ))}
                <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
              </div>
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
      <ProfilePage />
    </FreelancerDashboard>
  );
}
