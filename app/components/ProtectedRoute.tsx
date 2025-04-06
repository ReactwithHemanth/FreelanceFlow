"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  console.log("🚀 ~ ProtectedRoute ~ currentUser:", currentUser);
  const router = useRouter();
  const pathname = usePathname();
  console.log("🚀 ~ ProtectedRoute ~ pathname:", pathname);

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push(`/components/auth?redirect=${pathname}`);
    }
  }, [currentUser, loading, pathname]);

  if (loading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
