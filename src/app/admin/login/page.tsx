"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    // Check if already logged in as admin
    const isAdmin = localStorage.getItem("admin_session") === "true";
    if (isAdmin) {
      router.push("/admin");
      return;
    }

    // If a general user is logged in via Clerk, they should not be here
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple password for independent admin login as requested
    // Defaulting to "admin123" if no other info provided
    if (password === "admin123") {
      localStorage.setItem("admin_session", "true");
      router.push("/admin");
    } else {
      setError("Invalid admin password");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0500] text-[#f5e6d3] font-sans pt-24">
      <Navbar />
      
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-[#1a1510] border border-[#d4a017]/30 rounded-xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#d4a017]/10 rounded-full flex items-center justify-center mb-4 border border-[#d4a017]/20">
              <Lock className="w-8 h-8 text-[#d4a017]" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4a017] via-[#f5e6d3] to-[#d4a017]">
              Admin Login
            </h1>
            <p className="text-zinc-400 mt-2 text-center">
              Enter your independent admin password to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0500] border border-[#d4a017]/30 rounded-lg py-3 px-4 text-[#f5e6d3] focus:outline-none focus:border-[#d4a017] transition-colors"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3 flex items-center gap-3 text-red-200 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8b6508] to-[#d4a017] hover:from-[#d4a017] hover:to-[#f5e6d3] text-black font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
