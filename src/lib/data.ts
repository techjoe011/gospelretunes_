export interface Song {
  id: string;
  title: string;
  url: string;
  duration: string;
}

export interface Artist {
  id: string;
  name: string;
  category: string;
  bio: string;
  imageUrl: string;
  songs: Song[];
}

export const ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'Tasha Cobbs Leonard',
    category: 'Contemporary Gospel',
    bio: 'Tasha Cobbs Leonard is an American gospel musician and songwriter. She is known for her powerful vocals and hits like "Break Every Chain".',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop',
    songs: [
      { id: 's1', title: 'Break Every Chain', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '5:12' },
      { id: 's2', title: 'You Know My Name', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '4:45' },
    ]
  },
  {
    id: '2',
    name: 'Kirk Franklin',
    category: 'Urban Contemporary Gospel',
    bio: 'Kirk Franklin is an American choir director, gospel musician, singer, songwriter, and author. He is best known for leading urban contemporary gospel choirs.',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
    songs: [
      { id: 's3', title: 'I Smile', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '4:58' },
      { id: 's4', title: 'Love Theory', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '3:27' },
    ]
  },
  {
    id: '3',
    name: 'Nathaniel Bassey',
    category: 'Worship',
    bio: 'Nathaniel Bassey is a Nigerian singer, pastor, trumpeter and gospel songwriter known for his songs "Imela", "Onise Iyanu" and "Olowogbogboro".',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
    songs: [
      { id: 's5', title: 'Imela', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '6:10' },
      { id: 's6', title: 'See What The Lord Has Done', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '5:30' },
    ]
  }
];

export const CATEGORIES = Array.from(new Set(ARTISTS.map(a => a.category)));
