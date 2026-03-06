import { supabase } from "@/lib/supabase/client";
import Navbar from "@/components/Navbar";
import SongList from "@/components/SongList";
import ArtistActions from "@/components/ArtistActions";
import { notFound } from "next/navigation";
import { Mic2, AlertCircle } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch artist details from Supabase
  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('id', id)
    .single();

  if (artistError || !artist) {
    notFound();
  }

  // Fetch songs for this artist from Supabase
  const { data: songs, error: songsError } = await supabase
    .from('songs')
    .select('*')
    .eq('artist_id', id);

  // In a real app, you would check the user's subscription status from your DB/Supabase
  const { userId } = await auth();
  const isPremium = !!userId; // Placeholder logic: all logged-in users are premium for now

  // Transform artist and songs for the UI components
  const uiArtist = {
    ...artist,
    imageUrl: artist.image_url,
    songs: songs || []
  };

  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] pb-32 african-pattern">
      <Navbar />
      
      {/* Header */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img 
          src={uiArtist.imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop'} 
          alt={uiArtist.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0500] via-[#0a0500]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#d4a017] p-1.5 rounded-full shadow-[0_0_15px_rgba(212,160,23,0.3)]">
              <Mic2 className="h-4 w-4 text-black" />
            </div>
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#d4a017]">Verified Artist</span>
          </div>
          <h1 className="text-4xl md:text-8xl font-black mb-6 gradient-text uppercase tracking-tighter leading-none">{uiArtist.name}</h1>
          <p className="text-zinc-300 max-w-2xl text-base md:text-lg leading-relaxed line-clamp-4 md:line-clamp-none font-medium">
            {uiArtist.bio}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-8 relative">
        <div className="mb-12">
          <ArtistActions artist={uiArtist} />
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-[#d4a017] border-b border-[#d4a017]/20 pb-2">Popular Tracks</h2>
          {uiArtist.songs.length > 0 ? (
            <SongList songs={uiArtist.songs} isPremium={isPremium} />
          ) : (
            <div className="text-center py-12 bg-zinc-900/20 rounded-2xl border border-white/5">
              <p className="text-zinc-500">No tracks found for this artist yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
