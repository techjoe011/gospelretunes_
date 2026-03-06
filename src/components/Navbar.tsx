"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Menu, X, Home, Mic2, Library, Crown, Settings } from "lucide-react";

export default function Navbar() {
  const { isSignedIn, isLoaded, user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check local storage for independent admin session
    const adminSession = localStorage.getItem("admin_session") === "true";
    setIsAdmin(adminSession);
  }, []);

  const navLinks = [
    { href: "/categories", label: "Artists", icon: Mic2 },
    { href: "/premium", label: "Premium", icon: Crown },
  ];

  if (isLoaded && isSignedIn) {
    navLinks.splice(1, 0, { href: "/library", label: "Library", icon: Library });
  }

  if (isAdmin) {
    navLinks.push({ href: "/admin", label: "Admin", icon: Settings });
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0500]/90 backdrop-blur-md border-b border-[#d4a017]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/logo.png" alt="GospelRetunes Logo" className="h-16 w-16 md:h-24 md:w-24 object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-sm font-medium text-zinc-400 hover:text-[#d4a017] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4">
              {isLoaded && !isSignedIn && !isAdmin && (
                <>
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium text-[#f5e6d3] hover:text-[#d4a017] transition-colors">
                      Log in
                    </button>
                  </SignInButton>
                  <SignInButton mode="modal">
                    <button className="bg-[#d4a017] text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-[#b8860b] transition-colors">
                      Sign up
                    </button>
                  </SignInButton>
                </>
              )}
              {isLoaded && isSignedIn && (
                <UserButton appearance={{ elements: { userButtonAvatarBox: "border border-[#d4a017]" } }} />
              )}
              {isAdmin && !isSignedIn && (
                <Link href="/admin" className="bg-[#d4a017] text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-[#b8860b] transition-colors">
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-[#d4a017]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0a0500] border-b border-[#d4a017]/20 py-6 px-4 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="flex items-center gap-4 text-lg font-bold text-[#f5e6d3] hover:text-[#d4a017]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <link.icon className="h-6 w-6" />
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
            {isLoaded && !isSignedIn && !isAdmin && (
              <>
                <SignInButton mode="modal">
                  <button className="w-full text-center py-3 text-lg font-bold text-[#f5e6d3] border border-white/10 rounded-xl">
                    Log in
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="w-full text-center py-3 text-lg font-bold bg-[#d4a017] text-black rounded-xl">
                    Sign up
                  </button>
                </SignInButton>
              </>
            )}
            {isLoaded && isSignedIn && (
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <span className="text-[#f5e6d3] font-medium">Account Settings</span>
                <UserButton appearance={{ elements: { userButtonAvatarBox: "h-10 w-10 border border-[#d4a017]" } }} />
              </div>
            )}
            {isAdmin && !isSignedIn && (
              <Link 
                href="/admin" 
                className="w-full text-center py-3 text-lg font-bold bg-[#d4a017] text-black rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
