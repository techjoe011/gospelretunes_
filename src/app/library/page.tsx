"use client";

import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Song } from '@/lib/data';
import SongList from '@/components/SongList';

export default function LibraryPage() {
  const { user, isLoaded } = useUser();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableMissing, setTableMissing] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchLibrarySongs();
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [isLoaded, user]);

  const fetchLibrarySongs = async () => {
    try {
      const { data, error } = await supabase
        .from('user_library')
        .select(`
          song_id,
          songs:song_id (
            id,
            title,
            url,
            duration,
            artist_id,
            artists:artist_id (
              name
            )
          )
        `)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Full Supabase error fetching library songs:', error);
        
        // 42P01 is "relation does not exist" - the table is actually missing
        // 42501 is "insufficient_privilege" - RLS is blocking access
        if (error.code === '42P01' || error.message.toLowerCase().includes('not find') || error.message.toLowerCase().includes('not found')) {
          console.warn('Library table not yet created in Supabase. Please run the setup SQL.');
          setTableMissing(true);
        } else if (error.code === '42501') {
          console.error('Access Denied: Row Level Security is blocking the request.');
          alert(`Access Denied: Row Level Security is blocking the request. Please run the GRANT ALL commands and check RLS policies in your Supabase dashboard.\n\nError: ${error.message}`);
        } else {
          // For other errors, we don't necessarily want to show the "Setup Required" screen
          // but we still want to log it
          console.error('Error fetching library songs:', error.message);
          alert(`Supabase Error (${error.code}): ${error.message}`);
        }
        setLoading(false);
        return;
      }

      if (data) {
        // Flatten the nested data and ensure we only have valid songs
        const librarySongs = data
          .map(item => item.songs)
          .filter(song => song !== null) as any[];
        
        setSongs(librarySongs);
        setTableMissing(false);
      }
    } catch (err) {
      console.error('Unexpected error fetching library songs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] african-pattern">
      <Navbar />
      <main className="pt-24 md:pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-12 text-center md:text-left">
          <div className="w-32 h-32 bg-[#d4a017] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#d4a017]/20 overflow-hidden shrink-0">
            <img src="/logo.png" alt="Library Logo" className="h-24 w-24 object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-black gradient-text uppercase tracking-tighter">Your Library</h1>
            <p className="text-zinc-500 mt-2 text-lg">Your favorite tracks, all in one place.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4a017]"></div>
          </div>
        ) : tableMissing ? (
          <div className="mt-12 p-12 border border-[#d4a017]/50 rounded-3xl bg-zinc-900/40 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#d4a017]">Database Setup Required</h2>
            <p className="text-zinc-300 mb-6 max-w-lg mx-auto">
              The library feature requires a table to be created in your Supabase project. 
              Please run the SQL commands in the <code className="bg-black/50 px-2 py-1 rounded text-[#d4a017]">supabase_setup.sql</code> file in your Supabase dashboard.
            </p>
            <button 
              onClick={() => fetchLibrarySongs()}
              className="bg-[#d4a017] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Retry Connection
            </button>
          </div>
        ) : songs.length > 0 ? (
          <div className="bg-zinc-900/30 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
            <SongList songs={songs} isPremium={true} />
          </div>
        ) : (
          <div className="mt-12 p-20 border border-dashed border-[#d4a017]/20 rounded-3xl text-center bg-zinc-900/20">
            <p className="text-zinc-500 text-lg">Your library is currently empty.</p>
            <p className="text-zinc-600 mt-2">Start adding music to see them here!</p>
          </div>
        )}
      </main>
    </div>
  );
}
