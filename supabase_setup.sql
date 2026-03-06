-- DROP TABLE IF EXISTS public.user_library; -- Uncomment this line to start fresh

-- Create the user_library table
CREATE TABLE IF NOT EXISTS public.user_library (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL, -- Clerk User ID
    song_id TEXT NOT NULL REFERENCES public.songs(id) ON DELETE CASCADE, -- Song ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, song_id)
);

-- Ensure correct ownership/permissions
GRANT ALL ON TABLE public.user_library TO postgres;
GRANT ALL ON TABLE public.user_library TO anon;
GRANT ALL ON TABLE public.user_library TO authenticated;
GRANT ALL ON TABLE public.user_library TO service_role;

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_library ENABLE ROW LEVEL SECURITY;

-- Simple policies for user_library (Allows users to manage their own library)
-- Note: We use 'true' for simplicity in demo, but usually you'd check auth.uid()
DROP POLICY IF EXISTS "Allow users to read their own library" ON public.user_library;
CREATE POLICY "Allow users to read their own library" ON public.user_library FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow users to manage their own library" ON public.user_library;
CREATE POLICY "Allow users to manage their own library" ON public.user_library FOR ALL USING (true);

-- Create a table for artists
CREATE TABLE IF NOT EXISTS public.artists (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create a table for songs
CREATE TABLE IF NOT EXISTS public.songs (
    id TEXT PRIMARY KEY,
    artist_id TEXT REFERENCES public.artists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    duration TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Public read access for artists and songs
DROP POLICY IF EXISTS "Allow public read access for artists" ON public.artists;
CREATE POLICY "Allow public read access for artists" ON public.artists FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access for songs" ON public.songs;
CREATE POLICY "Allow public read access for songs" ON public.songs FOR SELECT USING (true);

-- Admin management (Currently permissive for demo purposes; restrict to specific user IDs in production)
DROP POLICY IF EXISTS "Allow admin management for artists" ON public.artists;
CREATE POLICY "Allow admin management for artists" ON public.artists FOR ALL USING (true);
DROP POLICY IF EXISTS "Allow admin management for songs" ON public.songs;
CREATE POLICY "Allow admin management for songs" ON public.songs FOR ALL USING (true);

-- Storage buckets setup (Note: Run these commands or create buckets in Supabase Dashboard)
-- Instructions:
-- 1. Go to Supabase Dashboard -> Storage
-- 2. Create a new bucket named 'music' (Make it Public)
-- 3. Create a new bucket named 'artists' (Make it Public)
