import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase/client';
import { ChevronRight, Mic2, AlertCircle } from 'lucide-react';

export default async function CategoriesPage() {
  // Fetch artists from Supabase
  const { data: artists, error } = await supabase
    .from('artists')
    .select('*')
    .order('name');

  if (error || !artists) {
    console.error('Error fetching artists:', error);
    return (
      <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] african-pattern">
        <Navbar />
        <main className="pt-32 pb-12 px-4 text-center">
          <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 p-8 rounded-2xl">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Database Connection Error</h2>
            <p className="text-zinc-400 text-sm mb-6">
              We couldn't reach the stage! Please make sure your database tables are set up in Supabase.
            </p>
            <Link href="/" className="bg-[#d4a017] text-black px-6 py-2 rounded-full font-bold">
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Group artists by category
  const categories = Array.from(new Set(artists.map(a => a.category)));

  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] african-pattern">
      <Navbar />
      
      <main className="pt-24 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4 text-center md:text-left">
          <div>
            <h1 className="text-4xl md:text-6xl font-black gradient-text uppercase tracking-tighter">Artists</h1>
            <p className="text-zinc-500 mt-2 text-lg">Discover the voices that inspire and uplift.</p>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-white/5">
            <Mic2 className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500">No artists found yet. We are currently updating our collection. Please check back soon!</p>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#d4a017] border-b border-[#d4a017]/20 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#d4a017] rounded-full shadow-[0_0_10px_rgba(212,160,23,0.5)]"></span>
                {category}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {artists.filter(a => a.category === category).map((artist) => (
                  <Link 
                    key={artist.id} 
                    href={`/artist/${artist.id}`}
                    className="group bg-zinc-900/40 p-4 rounded-xl hover:bg-zinc-800/60 transition-all border border-white/5 hover:border-[#d4a017]/30 shadow-xl"
                  >
                    <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-zinc-800 relative">
                      <img 
                        src={artist.image_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop'} 
                        alt={artist.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#8b4513]/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg truncate mb-1 text-[#f5e6d3]">{artist.name}</h3>
                    <p className="text-zinc-500 text-sm flex items-center gap-1">
                      <Mic2 className="h-3 w-3 text-[#d4a017]" />
                      Artist
                    </p>
                    <div className="mt-4 flex items-center text-[#d4a017] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-all">
                      View Profile <ChevronRight className="h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
