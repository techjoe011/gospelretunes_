-- Dummy Data for Zambian Gospel Artists and Songs

-- Artists
INSERT INTO public.artists (id, name, category, bio, image_url)
VALUES
('pompi', 'Pompi', 'Gospel', 'Lotta House Records flagship artist, known for his unique fusion of African rhythms and modern gospel.', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/artists/pompi.jpg'),
('mag44', 'Mag44', 'Gospel Hip Hop', 'Producer and artist extraordinaire, a pioneer in the Zambian gospel hip hop scene.', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/artists/mag44.jpg'),
('esther-chungu', 'Esther Chungu', 'Gospel', 'Award winning songstress with a powerful voice and soul-stirring worship songs.', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/artists/esther_chungu.jpg'),
('abel-chungu', 'Abel Chungu', 'Gospel', 'Renowned worship leader and singer-songwriter known for hits like "Ichitemwiko".', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/artists/abel_chungu.jpg'),
('ephraim', 'Ephraim', 'Gospel', 'The Son of Africa, a veteran in the Zambian gospel industry with many classic hits.', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/artists/ephraim.jpg')
ON CONFLICT (id) DO NOTHING;

-- Songs
INSERT INTO public.songs (id, artist_id, title, url, duration)
VALUES
('pompi-shaina', 'pompi', 'Shaina', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/pompi_shaina.mp3', '3:45'),
('pompi-giant-killer', 'pompi', 'Giant Killer', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/pompi_giant_killer.mp3', '4:12'),
('mag44-vickilele', 'mag44', 'Vickilele', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/mag44_vickilele.mp3', '3:50'),
('mag44-pwililika', 'mag44', 'Pwililika', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/mag44_pwililika.mp3', '4:05'),
('esther-sangana', 'esther-chungu', 'Sangana', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/esther_sangana.mp3', '4:20'),
('abel-ichitemwiko', 'abel-chungu', 'Ichitemwiko', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/abel_ichitemwiko.mp3', '5:10'),
('ephraim-lekani-aleke', 'ephraim', 'Lekani Aleke', 'https://jiqodcmrylmvdryvewdv.supabase.co/storage/v1/object/public/music/ephraim_lekani_aleke.mp3', '4:55')
ON CONFLICT (id) DO NOTHING;
