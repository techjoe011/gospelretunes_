"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase/client";
import { Plus, Music, User, Trash2, Upload, CheckCircle, Lock, Link as LinkIcon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function AdminPage() {
  const router = useRouter();
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showSecretKeyInput, setShowSecretKeyInput] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [keyError, setKeyError] = useState("");

  const [activeTab, setActiveTab] = useState<"artists" | "songs">("artists");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [tableMissing, setTableMissing] = useState(false);

  // Artist Form State
  const [artistName, setArtistName] = useState("");
  const [artistCategory, setArtistCategory] = useState("");
  const [artistBio, setArtistBio] = useState("");
  const [artistImage, setArtistImage] = useState<File | null>(null);
  const [artistImageUrl, setArtistImageUrl] = useState("");

  // Song Form State
  const [songTitle, setSongTitle] = useState("");
  const [songArtistId, setSongArtistId] = useState("");
  const [songFile, setSongFile] = useState<File | null>(null);
  const [songUrl, setSongUrl] = useState("");
  const [songDuration, setSongDuration] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_session") === "true";
    setIsAdminAuthenticated(authStatus);
    
    // Only show warning if user is loaded and not an admin
    if (userLoaded && !authStatus) {
      setShowWarning(true);
    }
    
    if (authStatus) {
      fetchArtists();
    }
  }, [userLoaded, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    router.push("/admin/login");
  };

  if (!userLoaded || isAdminAuthenticated === null) {
    return (
      <main className="min-h-screen bg-[#0a0500] text-[#f5e6d3] flex items-center justify-center pt-24">
        <Navbar />
        <div className="w-8 h-8 border-4 border-[#d4a017] border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (showWarning && !isAdminAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0a0500] text-[#f5e6d3] font-sans pt-24">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="african-pattern absolute inset-0 opacity-10 pointer-events-none"></div>
          <div className="relative bg-[#1a1510] border-2 border-[#d4a017]/30 rounded-2xl p-12 shadow-[0_0_50px_rgba(212,160,23,0.1)]">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
              <Lock className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
            <h1 className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#d4a017] uppercase tracking-tighter">
              You're off-key! 🎶
            </h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Did you really think you could just walk onto the main stage? 
              This area is for <strong>Headliners</strong> only. You're still in the nosebleed section.
              Maybe try practicing your scales before trying to hack the mix.
            </p>
            <div className="space-y-6">
              <p className="text-sm text-zinc-500 italic">
                The rhythm is all wrong. Why don't you head back to the "Home" track?
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => router.push("/")}
                  className="bg-[#d4a017] hover:bg-[#f5e6d3] text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Back to the Intro
                </button>
                {!showSecretKeyInput ? (
                  <button 
                    onClick={() => setShowSecretKeyInput(true)}
                    className="bg-transparent border border-[#d4a017] text-[#d4a017] hover:bg-[#d4a017]/10 font-bold py-3 px-8 rounded-full transition-all"
                  >
                    I'm the Producer, let me in
                  </button>
                ) : (
                  <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                    <div className="relative">
                      <input 
                        type="password"
                        placeholder="Enter Secret Producer Key"
                        value={secretKey}
                        onChange={(e) => {
                          setSecretKey(e.target.value);
                          setKeyError("");
                        }}
                        className="w-full bg-[#110c08] border border-[#d4a017]/50 rounded-full py-3 px-6 text-[#f5e6d3] placeholder-zinc-600 focus:outline-none focus:border-[#d4a017] transition-all text-center"
                        autoFocus
                      />
                      {keyError && (
                        <p className="text-red-500 text-xs mt-2 font-medium">{keyError}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          if (secretKey.toUpperCase() === "GOSPEL2024") {
                            router.push("/admin/login");
                          } else {
                            setKeyError("Wrong key! You're still flat.");
                            setSecretKey("");
                          }
                        }}
                        className="flex-1 bg-[#d4a017] hover:bg-[#f5e6d3] text-black font-bold py-2 rounded-full transition-all"
                      >
                        Verify
                      </button>
                      <button 
                        onClick={() => {
                          setShowSecretKeyInput(false);
                          setSecretKey("");
                          setKeyError("");
                        }}
                        className="flex-1 bg-transparent border border-zinc-700 text-zinc-500 hover:text-zinc-300 font-bold py-2 rounded-full transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const fetchArtists = async () => {
    try {
      const { data, error } = await supabase.from("artists").select("*").order('created_at', { ascending: false });
      if (error) {
        if (error.code === 'PGRST116' || error.message.toLowerCase().includes('not find') || error.message.toLowerCase().includes('not found')) {
          setTableMissing(true);
        } else {
          throw error;
        }
      } else {
        setArtists(data || []);
        setTableMissing(false);
      }
    } catch (err: any) {
      console.error("Error fetching artists:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArtistUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let finalImageUrl = artistImageUrl;
      
      if (artistImage) {
        const fileExt = artistImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('artists')
          .upload(filePath, artistImage);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('artists').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      }

      const id = artistName.toLowerCase().replace(/\s+/g, '-');
      const { error } = await supabase.from("artists").insert({
        id,
        name: artistName,
        category: artistCategory,
        bio: artistBio,
        image_url: finalImageUrl
      });

      if (error) throw error;

      setMessage("Artist added successfully!");
      setArtistName("");
      setArtistCategory("");
      setArtistBio("");
      setArtistImage(null);
      setArtistImageUrl("");
      fetchArtists();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSongUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let finalSongUrl = songUrl;

      if (songFile) {
        const fileExt = songFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('music')
          .upload(filePath, songFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('music').getPublicUrl(filePath);
        finalSongUrl = data.publicUrl;
      }

      if (!finalSongUrl) throw new Error("Please provide a song file or a song URL.");

      const id = `s-${Math.random().toString(36).substr(2, 9)}`;
      const { error } = await supabase.from("songs").insert({
        id,
        artist_id: songArtistId,
        title: songTitle,
        url: finalSongUrl,
        duration: songDuration
      });

      if (error) throw error;

      setMessage("Song uploaded successfully!");
      setSongTitle("");
      setSongArtistId("");
      setSongFile(null);
      setSongUrl("");
      setSongDuration("");
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] pb-32 african-pattern">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 text-center md:text-left">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl md:text-6xl font-black gradient-text uppercase tracking-tighter">Producer Desk</h1>
            <p className="text-zinc-500 mt-2 text-lg italic">Mastering the spirit, one track at a time.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-xl border border-red-500/20 transition-all font-bold"
          >
            <LogOut className="h-5 w-5" />
            End Session
          </button>
        </div>

        {tableMissing && (
          <div className="mb-10 p-8 border border-red-500/50 rounded-3xl bg-red-500/5 backdrop-blur-sm text-center">
            <h2 className="text-2xl font-black mb-4 text-red-500 uppercase">Stage Not Set!</h2>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              The database tables for artists and songs have not been created in Supabase yet. Run the setup SQL to continue.
            </p>
            <button 
              onClick={() => fetchArtists()}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-500 px-8 py-3 rounded-full font-bold transition-all border border-red-500/30"
            >
              Retry Connection
            </button>
          </div>
        )}

        {message && (
          <div className={`mb-10 p-6 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ${message.includes('Error') ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-[#d4a017]/10 text-[#d4a017] border border-[#d4a017]/20'}`}>
            {message.includes('Error') ? <Trash2 className="h-6 w-6 shrink-0" /> : <CheckCircle className="h-6 w-6 shrink-0" />}
            <span className="font-bold">{message}</span>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab("artists")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'artists' ? 'bg-[#d4a017] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-[#f5e6d3]'}`}
          >
            <User className="h-4 w-4" /> Artists
          </button>
          <button 
            onClick={() => setActiveTab("songs")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'songs' ? 'bg-[#d4a017] text-black' : 'bg-zinc-900 text-zinc-400 hover:text-[#f5e6d3]'}`}
          >
            <Music className="h-4 w-4" /> Songs
          </button>
        </div>

        <div className="bg-zinc-900/40 border border-[#d4a017]/10 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl mb-12">
          {activeTab === "artists" ? (
            <form onSubmit={handleArtistUpload} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 border-b border-[#d4a017]/20 pb-4 mb-6">
                <Plus className="h-8 w-8 text-[#d4a017]" />
                <h2 className="text-3xl font-black text-[#d4a017] uppercase tracking-tighter">
                  New Artist Profile
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Artist Name</label>
                  <input 
                    type="text" 
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] outline-none transition-all font-bold text-lg"
                    placeholder="e.g. Tasha Cobbs"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Category</label>
                  <input 
                    type="text" 
                    value={artistCategory}
                    onChange={(e) => setArtistCategory(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] outline-none transition-all font-bold text-lg"
                    placeholder="e.g. Contemporary Gospel"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Artist Biography</label>
                <textarea 
                  value={artistBio}
                  onChange={(e) => setArtistBio(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 h-40 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] outline-none transition-all resize-none font-medium leading-relaxed"
                  placeholder="Share their spiritual journey..."
                />
              </div>
              
              <div className="space-y-4 pt-4">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Visual Branding (Artist Image)</label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#d4a017]/30 transition-all">
                    <label className="text-[10px] font-black text-[#d4a017] uppercase tracking-[0.3em]">Direct Upload</label>
                    <div className="relative h-28 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          setArtistImage(e.target.files?.[0] || null);
                          if (e.target.files?.[0]) setArtistImageUrl("");
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <Upload className="h-8 w-8 text-zinc-600 mb-2 group-hover:text-[#d4a017] transition-colors" />
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest px-4 text-center">
                        {artistImage ? artistImage.name : "Select Image File"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#d4a017]/30 transition-all">
                    <label className="text-[10px] font-black text-[#d4a017] uppercase tracking-[0.3em]">External URL</label>
                    <div className="h-28 flex items-center gap-4 bg-black/40 border border-white/10 rounded-2xl px-6">
                      <LinkIcon className="h-6 w-6 text-zinc-600 group-hover:text-[#d4a017] transition-colors shrink-0" />
                      <input 
                        type="url" 
                        value={artistImageUrl}
                        onChange={(e) => {
                          setArtistImageUrl(e.target.value);
                          if (e.target.value) setArtistImage(null);
                        }}
                        className="w-full bg-transparent outline-none text-sm font-bold text-[#f5e6d3] placeholder:text-zinc-700"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#d4a017] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#d4a017]/30 disabled:opacity-50 uppercase tracking-[0.2em] text-lg flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div> : <><User className="h-6 w-6" /> Deploy Profile</>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSongUpload} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 border-b border-[#d4a017]/20 pb-4 mb-6">
                <Music className="h-8 w-8 text-[#d4a017]" />
                <h2 className="text-3xl font-black text-[#d4a017] uppercase tracking-tighter">
                  New Audio Track
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Song Title</label>
                  <input 
                    type="text" 
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] outline-none transition-all font-bold text-lg"
                    placeholder="e.g. Break Every Chain"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Select Artist</label>
                  <div className="relative">
                    <select 
                      value={songArtistId}
                      onChange={(e) => setSongArtistId(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] outline-none transition-all font-bold text-lg appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Choose an artist...</option>
                      {artists.map(artist => (
                        <option key={artist.id} value={artist.id}>{artist.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#d4a017]">
                      <Plus className="h-5 w-5 rotate-45" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Audio Source (MP3 File)</label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#d4a017]/30 transition-all">
                    <label className="text-[10px] font-black text-[#d4a017] uppercase tracking-[0.3em]">Direct Upload</label>
                    <div className="relative h-28 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer group">
                      <input 
                        type="file" 
                        accept="audio/mpeg"
                        onChange={(e) => {
                          setSongFile(e.target.files?.[0] || null);
                          if (e.target.files?.[0]) setSongUrl("");
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <Upload className="h-8 w-8 text-zinc-600 mb-2 group-hover:text-[#d4a017] transition-colors" />
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest px-4 text-center truncate w-full">
                        {songFile ? songFile.name : "Select MP3 File"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#d4a017]/30 transition-all">
                    <label className="text-[10px] font-black text-[#d4a017] uppercase tracking-[0.3em]">External URL</label>
                    <div className="h-28 flex items-center gap-4 bg-black/40 border border-white/10 rounded-2xl px-6">
                      <LinkIcon className="h-6 w-6 text-zinc-600 group-hover:text-[#d4a017] transition-colors shrink-0" />
                      <input 
                        type="url" 
                        value={songUrl}
                        onChange={(e) => {
                          setSongUrl(e.target.value);
                          if (e.target.value) setSongFile(null);
                        }}
                        className="w-full bg-transparent outline-none text-sm font-bold text-[#f5e6d3] placeholder:text-zinc-700"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">Duration</label>
                <input 
                  type="text" 
                  value={songDuration}
                  onChange={(e) => setSongDuration(e.target.value)}
                  className="w-full md:w-1/3 bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] outline-none transition-all font-bold text-lg"
                  placeholder="e.g. 5:12"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#d4a017] text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-[#d4a017]/30 disabled:opacity-50 uppercase tracking-[0.2em] text-lg flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div> : <><Music className="h-6 w-6" /> Deploy Track</>}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
