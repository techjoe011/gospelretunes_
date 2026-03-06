-- Dummy Data for Zambian Gospel Artists and Songs

-- Artists
INSERT INTO public.artists (id, name, category, bio, image_url)
VALUES
('pompi', 'Pompi', 'Gospel', 'Lotta House Records flagship artist, known for his unique fusion of African rhythms and modern gospel.', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop'),
('mag44', 'Mag44', 'Gospel Hip Hop', 'Producer and artist extraordinaire, a pioneer in the Zambian gospel hip hop scene.', 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop'),
('esther-chungu', 'Esther Chungu', 'Gospel', 'Award winning songstress with a powerful voice and soul-stirring worship songs.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop'),
('abel-chungu', 'Abel Chungu', 'Gospel', 'Renowned worship leader and singer-songwriter known for hits like "Ichitemwiko".', 'https://images.unsplash.com/photo-1514525253344-f81bcd3ce919?q=80&w=1000&auto=format&fit=crop'),
('ephraim', 'Ephraim', 'Gospel', 'The Son of Africa, a veteran in the Zambian gospel industry with many classic hits.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

-- Songs
INSERT INTO public.songs (id, artist_id, title, url, duration)
VALUES
('pompi-shaina', 'pompi', 'Shaina', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', '3:45'),
('pompi-giant-killer', 'pompi', 'Giant Killer', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', '4:12'),
('mag44-vickilele', 'mag44', 'Vickilele', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', '3:50'),
('mag44-pwililika', 'mag44', 'Pwililika', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', '4:05'),
('esther-sangana', 'esther-chungu', 'Sangana', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', '4:20'),
('abel-ichitemwiko', 'abel-chungu', 'Ichitemwiko', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', '5:10'),
('ephraim-lekani-aleke', 'ephraim', 'Lekani Aleke', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', '4:55')
ON CONFLICT (id) DO NOTHING;
