import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Play, Mic2, Radio, Headphones, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] selection:bg-[#d4a017]/30 african-pattern">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4a017]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-[#8b4513]/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 gradient-text">
            Stream Your Spirit. <br /> Anytime, Anywhere.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the finest gospel music from across Africa and beyond. Connect with your favorite artists and discover new voices that inspire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/categories" className="w-full sm:w-auto bg-[#d4a017] hover:bg-[#b8860b] text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-[#d4a017]/20">
              <Play className="fill-current h-5 w-5" />
              Start Listening
            </Link>
            <Link href="#features" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-[#f5e6d3] px-8 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm border border-white/10">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Top Banner Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="w-full h-auto bg-zinc-900/40 border border-[#d4a017]/20 rounded-2xl flex items-center justify-center group cursor-pointer overflow-hidden relative shadow-2xl shadow-[#d4a017]/10">
          <img 
            src="/mtnad.jpeg" 
            alt="MTN Advertisement" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#d4a017]/80 uppercase tracking-widest font-bold border border-[#d4a017]/20">
            Advertisement
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0a0500]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-[#d4a017]/50 transition-colors group">
              <div className="w-16 h-16 bg-[#d4a017]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mic2 className="h-8 w-8 text-[#d4a017]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#f5e6d3]">Discover Artists</h3>
              <p className="text-zinc-400">Explore categorized lists of gospel artists and their inspiring journeys.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-[#d4a017]/50 transition-colors group">
              <div className="w-16 h-16 bg-[#d4a017]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Radio className="h-8 w-8 text-[#d4a017]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#f5e6d3]">Live Streaming</h3>
              <p className="text-zinc-400">High-quality audio streaming for an immersive worship experience.</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-[#d4a017]/50 transition-colors group">
              <div className="w-16 h-16 bg-[#d4a017]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="h-8 w-8 text-[#d4a017]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#f5e6d3]">Your Library</h3>
              <p className="text-zinc-400">Save your favorite tracks and create personalized playlists for any mood.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Reach Out Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 african-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#8b4513]/20 border border-[#d4a017]/20 rounded-3xl p-8 md:p-16 text-center backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Are you an artist?</h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              We&apos;re always looking for new voices to inspire our community. If you want your music featured on GospelRetunes, we&apos;d love to hear from you.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-[#d4a017] text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-[#d4a017]/20"
            >
              <Mail className="h-5 w-5" />
              Reach Out to Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#d4a017]/20 bg-[#0a0500]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="GospelRetunes Logo" className="h-24 w-24 md:h-32 md:w-32 object-contain" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-zinc-500">
            <Link href="/privacy" className="hover:text-[#d4a017] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#d4a017] transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#d4a017] transition-colors">Contact Us</Link>
          </div>
          <p className="text-sm text-zinc-600">© 2026 GospelRetunes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
