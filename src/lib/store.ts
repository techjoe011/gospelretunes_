import { create } from 'zustand';
import { Song } from './data';

interface AudioState {
  currentSong: Song | null;
  isPlaying: boolean;
  setCurrentSong: (song: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentSong: null,
  isPlaying: false,
  setCurrentSong: (song) => set({ currentSong: song, isPlaying: true }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));
