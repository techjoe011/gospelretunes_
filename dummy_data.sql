-- Updated Dummy Data from Zambianplay.com

-- Artists
INSERT INTO public.artists (id, name, category, bio, image_url)
VALUES
('pompi', 'Pompi', 'Gospel', 'Acclaimed Zambian gospel artist known for his powerful wave of worship and fusion of African rhythms.', 'https://cdn.zambianplay.com/wp-content/uploads/2025/08/Pompi-Ft.-Voh-Greater.jpg'),
('eazi-ra', 'Eazi Ra', 'Gospel', 'Rising Zambian gospel artist bringing fresh sounds and messages of mercy.', 'https://cdn.zambianplay.com/wp-content/uploads/2026/02/Eazi-Ra-Show-Me-Mercy.jpg'),
('blessed-son', 'Blessed Son', 'Gospel', 'Rising gospel star emphasizing trust in God and valuing parents through his music.', 'https://cdn.zambianplay.com/wp-content/uploads/2026/02/Blessed-Son-Muchetekele.jpg'),
('minister-susan', 'Minister Susan', 'Worship', 'Talented Zambian Gospel singer and worship leader providing encouragement through uplifting songs.', 'https://cdn.zambianplay.com/wp-content/uploads/2025/09/Minister-Susan-Pantawi.jpg'),
('talent-mulenga', 'Talent Mulenga', 'Gospel', 'Emerging gospel artist and radio personality dedicated to sharing songs for the maker of all.', 'https://cdn.zambianplay.com/wp-content/uploads/2025/07/Talent-Mulenga-Kalubula-Wesonde.jpg')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    bio = EXCLUDED.bio,
    image_url = EXCLUDED.image_url;

-- Songs
INSERT INTO public.songs (id, artist_id, title, url, duration)
VALUES
('pompi-greater', 'pompi', 'Greater (ft. Voh)', 'https://zambianplay.com/wp-content/uploads/2025/08/Pompi-Ft.-Voh-Greater.mp3', '4:25'),
('eazi-ra-show-me-mercy', 'eazi-ra', 'Show Me Mercy', 'https://zambianplay.com/wp-content/uploads/2026/02/Eazi-Ra-Show-Me-Mercy.mp3', '3:58'),
('blessed-son-muchetekele', 'blessed-son', 'Muchetekele', 'https://zambianplay.com/wp-content/uploads/2026/02/Blessed-Son-Muchetekele.mp3', '4:15'),
('minister-susan-pantawi', 'minister-susan', 'Pantawi', 'https://zambianplay.com/wp-content/uploads/2025/09/Minister-Susan-Pantawi.mp3', '5:10'),
('talent-mulenga-kalubula-wesonde', 'talent-mulenga', 'Kalubula Wesonde', 'https://zambianplay.com/wp-content/uploads/2025/07/Talent-Mulenga-Kalubula-Wesonde.mp3', '4:40')
ON CONFLICT (id) DO UPDATE SET
    artist_id = EXCLUDED.artist_id,
    title = EXCLUDED.title,
    url = EXCLUDED.url,
    duration = EXCLUDED.duration;
