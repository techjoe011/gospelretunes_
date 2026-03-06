"use client";

import { useAudioStore } from "@/lib/store";
import { Song } from "@/lib/data";
import { Play, Pause, Music, Download, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";

interface SongListProps {
  songs: Song[];
  isPremium?: boolean;
}

export default function SongList({ songs, isPremium = false }: SongListProps) {
  const { currentSong, isPlaying, setCurrentSong, setIsPlaying } = useAudioStore();
  const { user } = useUser();
  const [libraryIds, setLibraryIds] = useState<string[]>([]);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchLibrary();
    }
  }, [user]);

  const fetchLibrary = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('user_library')
        .select('song_id')
        .eq('user_id', user.id);
      
      if (error) {
        if (error.code === 'PGRST116' || error.message.toLowerCase().includes('not find') || error.message.toLowerCase().includes('not found')) {
          console.warn('Library table not yet created in Supabase. Please run the setup SQL.');
        } else {
          console.error('Error fetching library:', error.message);
        }
        return;
      }
      
      if (data) {
        setLibraryIds(data.map(item => item.song_id));
      }
    } catch (err) {
      console.error('Unexpected error fetching library:', err);
    }
  };

  const toggleLibrary = async (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    if (!user) {
      alert("Please log in to add songs to your library.");
      return;
    }

    if (isToggling === songId) return;

    try {
      setIsToggling(songId);
      if (libraryIds.includes(songId)) {
        // Optimistic update
        setLibraryIds(prev => prev.filter(id => id !== songId));
        
        const { error } = await supabase
          .from('user_library')
          .delete()
          .eq('user_id', user.id)
          .eq('song_id', songId);
        
        if (error) {
          console.error('Error removing from library:', error.message);
          // Rollback
          setLibraryIds(prev => [...prev, songId]);
          alert("Failed to remove song from library. " + error.message);
        }
      } else {
        // Optimistic update
        setLibraryIds(prev => [...prev, songId]);
        
        const { error } = await supabase
          .from('user_library')
          .upsert({ user_id: user.id, song_id: songId }, { onConflict: 'user_id,song_id' });
        
        if (error) {
          console.error('Error adding to library:', error.message);
          // Rollback
          setLibraryIds(prev => prev.filter(id => id !== songId));
          
          if (error.code === 'PGRST116' || error.message.toLowerCase().includes('not find') || error.message.toLowerCase().includes('not found')) {
            alert("Database table 'user_library' not found. Please run the setup SQL in your Supabase dashboard.");
          } else {
            alert("Failed to add song to library. " + error.message);
          }
        }
      }
    } catch (err) {
      console.error('Unexpected error toggling library:', err);
    } finally {
      setIsToggling(null);
    }
  };

  const handlePlay = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
    }
  };

  const handleDownload = async (e: React.MouseEvent, song: Song) => {
    e.stopPropagation();
    
    try {
      // Try fetch-based download for better filename control and avoiding new tab (requires CORS)
      const response = await fetch(song.url, { mode: 'cors' });
      if (!response.ok) throw new Error('Network response was not ok');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', `${song.title}.mp3`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn('CORS or Network issue, falling back to direct link download:', err);
      // Fallback: direct click on a link without target='_blank' to avoid opening new tab if possible
      const link = document.createElement('a');
      link.href = song.url;
      link.setAttribute('download', `${song.title}.mp3`);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-1">
      {/* Table Header - hidden on mobile */}
      <div className="hidden md:grid grid-cols-[16px_1fr_100px_80px] gap-4 px-4 py-2 text-zinc-500 text-sm font-medium border-b border-[#d4a017]/10 mb-2">
        <span>#</span>
        <span>Title</span>
        <span className="text-right">Duration</span>
        <span></span>
      </div>
      {songs.map((song, index) => {
        const isSelected = currentSong?.id === song.id;
        const activePlaying = isSelected && isPlaying;
        const isInLibrary = libraryIds.includes(song.id);

        return (
          <div 
            key={song.id}
            onClick={() => handlePlay(song)}
            className={`grid grid-cols-[auto_1fr_auto] md:grid-cols-[16px_1fr_100px_80px] gap-3 md:gap-4 px-3 md:px-4 py-3 rounded-md cursor-pointer transition-colors group ${
              isSelected ? 'bg-[#d4a017]/10' : 'hover:bg-white/5'
            }`}
          >
            <div className="flex items-center justify-center w-4 md:w-auto">
              {activePlaying ? (
                <div className="flex items-end gap-[2px] h-3">
                  <div className="w-[2px] bg-[#d4a017] animate-music-bar-1" />
                  <div className="w-[2px] bg-[#d4a017] animate-music-bar-2" />
                  <div className="w-[2px] bg-[#d4a017] animate-music-bar-3" />
                </div>
              ) : isSelected ? (
                <Play className="h-4 w-4 text-[#d4a017] fill-current" />
              ) : (
                <span className="text-zinc-500 md:group-hover:hidden">{index + 1}</span>
              )}
              <Play className={`h-4 w-4 text-white fill-current hidden md:group-hover:block ${isSelected ? 'text-[#d4a017]' : ''}`} />
            </div>
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 bg-zinc-800 rounded flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <Music className={`h-5 w-5 ${isSelected ? 'text-[#d4a017]' : 'text-zinc-500'}`} />
                <div className="absolute inset-0 bg-[#8b4513]/10" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-medium truncate ${isSelected ? 'text-[#d4a017]' : 'text-[#f5e6d3]'}`}>
                  {song.title}
                </span>
                <span className="text-xs text-zinc-500 md:hidden">{song.duration}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-end text-zinc-500 text-sm">
              {song.duration}
            </div>

            <div className="flex items-center justify-end md:justify-center gap-1">
              {user && (
                <button 
                  onClick={(e) => toggleLibrary(e, song.id)}
                  disabled={isToggling === song.id}
                  className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isInLibrary ? 'text-[#d4a017]' : 'text-zinc-500 hover:text-white'} ${isToggling === song.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={isInLibrary ? "Remove from Library" : "Add to Library"}
                >
                  <Heart className={`h-4 w-4 ${isInLibrary ? 'fill-current' : ''} ${isToggling === song.id ? 'animate-pulse' : ''}`} />
                </button>
              )}
              {isPremium && (
                <button 
                  onClick={(e) => handleDownload(e, song)}
                  className="p-2 hover:bg-white/10 rounded-full text-zinc-500 hover:text-[#d4a017] transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
