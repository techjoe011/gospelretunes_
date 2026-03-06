"use client";

import { useAudioStore } from "@/lib/store";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const { currentSong, isPlaying, setIsPlaying } = useAudioStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong?.url, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      setProgress(0);
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentSong?.id]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0500]/95 backdrop-blur-lg border-t border-[#d4a017]/20 px-4 py-3 z-[60] safe-bottom african-pattern">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-3 w-auto md:w-[30%] min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#d4a017] rounded-md flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#d4a017]/10">
            <Play className="text-black h-5 w-5 md:h-6 md:w-6" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs md:text-sm font-bold text-[#f5e6d3] truncate">{currentSong.title}</h4>
            <p className="text-[10px] md:text-xs text-zinc-500 truncate uppercase tracking-wider">Now Playing</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[200px] md:max-w-md">
          <div className="flex items-center gap-4 md:gap-6">
            <button className="hidden sm:block text-zinc-500 hover:text-[#d4a017] transition-colors">
              <SkipBack className="h-5 w-5 fill-current" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-[#d4a017] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg shadow-[#d4a017]/20 flex-shrink-0"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5 md:ml-1" />}
            </button>
            <button className="hidden sm:block text-zinc-500 hover:text-[#d4a017] transition-colors">
              <SkipForward className="h-5 w-5 fill-current" />
            </button>
          </div>
          <div className="hidden sm:block w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-[#d4a017] h-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Volume - hidden on mobile */}
        <div className="hidden md:flex items-center gap-3 w-[30%] justify-end">
          <Volume2 className="h-5 w-5 text-zinc-500" />
          <div className="w-24 bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className="bg-[#d4a017]/60 h-full w-[70%]" />
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
