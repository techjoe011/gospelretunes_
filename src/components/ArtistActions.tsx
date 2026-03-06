"use client";

import { useAudioStore } from "@/lib/store";
import { Artist } from "@/lib/data";
import { Play, Pause } from "lucide-react";
import { useState } from "react";

interface ArtistActionsProps {
  artist: Artist;
}

export default function ArtistActions({ artist }: ArtistActionsProps) {
  const { currentSong, isPlaying, setCurrentSong, setIsPlaying } = useAudioStore();
  const [isFollowing, setIsFollowing] = useState(false);

  const isArtistPlaying = artist.songs.some(song => song.id === currentSong?.id) && isPlaying;

  const handlePlayArtist = () => {
    if (isArtistPlaying) {
      setIsPlaying(false);
    } else if (artist.songs.length > 0) {
      // If one of the artist's songs is current but paused, resume it
      const currentArtistSong = artist.songs.find(song => song.id === currentSong?.id);
      if (currentArtistSong) {
        setIsPlaying(true);
      } else {
        // Otherwise play the first song
        setCurrentSong(artist.songs[0]);
      }
    }
  };

  return (
    <div className="flex items-center gap-6 mb-8">
      <button 
        onClick={handlePlayArtist}
        className="h-14 w-14 bg-[#d4a017] rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-[#d4a017]/20"
      >
        {isArtistPlaying ? (
          <Pause className="h-6 w-6 text-black fill-current" />
        ) : (
          <Play className="h-6 w-6 text-black fill-current ml-1" />
        )}
      </button>
      <button 
        onClick={() => setIsFollowing(!isFollowing)}
        className={`px-6 py-2 border rounded-full font-bold transition-all ${
          isFollowing 
            ? 'bg-[#d4a017] text-black border-[#d4a017]' 
            : 'border-zinc-700 text-[#f5e6d3] hover:border-[#d4a017] hover:text-[#d4a017]'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}
