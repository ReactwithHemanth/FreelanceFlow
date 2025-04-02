"use client";

import React from "react";
import FreelancerDashboard from "../FreelancerDashboard";
const ProfilePage = () => {
  return (
    <div className="p-6 m-5">
      <h1 className="text-2xl font-bold text-blue-600">Profile</h1>
      <p className="text-gray-700 mt-2">View and edit your profile details.</p>
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
