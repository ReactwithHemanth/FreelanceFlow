"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Key, Mail } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { currentUser, loading, error, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Auth state changed - currentUser:", currentUser);
  }, [currentUser]);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && !loading) {
      console.log("Redirecting to /projects");
      router.push("/components/projects");
    }
  }, [currentUser, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8 text-white text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="opacity-90 mt-2">Access your freelance dashboard</p>
        </div>

        <div className="p-8">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Keyphrase (Remember this for life)</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your secret keyphrase" required />
              </div>
              <p className="text-xs text-gray-500">This keyphrase will be your lifelong access code. Store it securely.</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-700">Remember this device</label>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md disabled:opacity-70">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* {showBiometric && (
            <div className="mt-6">
              <button onClick={() => login} disabled={loading} className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
                <Fingerprint className="w-5 h-5 mr-2" />
                Sign in with Biometrics
              </button>
            </div>
          )} */}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <button onClick={() => router.push("/components/register")} className="text-blue-600 hover:underline">
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
