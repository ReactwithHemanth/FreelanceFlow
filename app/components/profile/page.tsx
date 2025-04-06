"use client";

import React, { useEffect, useState } from "react";
import FreelancerDashboard from "../FreelancerDashboard";
import { User, Mail, Phone, Globe, Edit, Save, X, Briefcase, DollarSign, ChevronDown } from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/app/services/userService";
import { useAuth } from "@/app/context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  console.log("🚀 ~ ProfilePage ~ currentUser:", currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    bio: "",
    skills: [] as string[],
    hourlyRate: 0,
    experience: "",
  });
  const [loading, setLoading] = useState(true);
  console.log("Loading profile");

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser?.uid) {
        console.log("🚀 ~ fetchProfile ~ currentUser?.uid:", currentUser?.uid);
        try {
          const userProfile = await getUserProfile(currentUser.uid);
          console.log("🚀 ~ fetchProfile ~ userProfile:", userProfile);
          if (userProfile) {
            setProfile({
              name: userProfile?.name || "",
              email: userProfile?.email || currentUser.email || "",
              phone: userProfile?.phone || "",
              website: userProfile?.website || "",
              bio: userProfile?.bio || "",
              skills: userProfile?.skills || [],
              hourlyRate: userProfile?.hourlyRate || 0,
              experience: userProfile?.experience || "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser?.uid) return;

    try {
      await updateUserProfile(currentUser.uid, profile);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...profile.skills];
    newSkills[index] = value;
    setProfile({ ...profile, skills: newSkills });
  };

  const addNewSkill = () => {
    setProfile({ ...profile, skills: [...profile.skills, ""] });
  };

  const removeSkill = (index: number) => {
    const newSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: newSkills });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
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
              <button onClick={() => setIsEditing(false)} className="flex items-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium">
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
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">{profile.name.charAt(0) || "?"}</div>
                </div>

                {isEditing ? <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="text-xl font-bold text-center mb-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" placeholder="Your Name" /> : <h2 className="text-xl font-bold text-center mb-2">{profile.name || "Your Name"}</h2>}

                <div className="w-full space-y-4 mt-6">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? <input type="email" name="email" value={profile.email} onChange={handleInputChange} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" /> : <span className="text-gray-700">{profile.email || "your@email.com"}</span>}
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? <input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 (___) ___-____" /> : <span className="text-gray-700">{profile.phone || "Not provided"}</span>}
                  </div>

                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input type="text" name="website" value={profile.website} onChange={handleInputChange} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="yourwebsite.com" />
                    ) : (
                      <a href={profile.website ? `https://${profile.website}` : "#"} target="_blank" rel="noopener noreferrer" className={`${profile.website ? "text-blue-600 hover:underline" : "text-gray-400"}`}>
                        {profile.website || "No website"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <h3 className="font-semibold text-lg mb-4">About</h3>
              {isEditing ? <textarea name="bio" value={profile.bio} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tell clients about yourself and your experience..." /> : <p className="text-gray-700">{profile.bio || "No bio added yet. Tell clients about yourself and your experience."}</p>}
            </div>

            {/* Skills Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <h3 className="font-semibold text-lg mb-4">Skills & Expertise</h3>
              {isEditing ? (
                <div className="space-y-3">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Skill name" />
                      <button onClick={() => removeSkill(index)} className="ml-2 p-1 text-red-500 hover:text-red-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addNewSkill} className="mt-2 px-3 py-1 text-blue-600 hover:text-blue-800 flex items-center">
                    <Plus className="w-4 h-4 mr-1" /> Add Skill
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.length > 0 ? (
                    profile.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet</p>
                  )}
                </div>
              )}
            </div>

            {/* Professional Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-white/90 p-6">
              <h3 className="font-semibold text-lg mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Hourly Rate</label>
                  {isEditing ? (
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <input type="number" name="hourlyRate" value={profile.hourlyRate} onChange={handleInputChange} className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0" />
                    </div>
                  ) : (
                    <p className="font-medium">${profile.hourlyRate ? profile.hourlyRate.toLocaleString() : "0"}/hr</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Experience</label>
                  {isEditing ? (
                    <div className="relative">
                      <select name="experience" value={profile.experience} onChange={handleInputChange} className="w-full pl-3 pr-8 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select</option>
                        <option value="Less than 1 year">Less than 1 year</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                    </div>
                  ) : (
                    <p className="font-medium">{profile.experience || "Not specified"}</p>
                  )}
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
