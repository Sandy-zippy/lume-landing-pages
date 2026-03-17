export interface LumeEvent {
  name: string
  tag: string
  theme: string
  description: string
  venue?: string
  facilitator?: string
  guestCount: number
  vibeTags: string[]
  reelUrl?: string
  image: string
  imageHd?: string
}

export const events: LumeEvent[] = [
  {
    name: 'The Resonance Room',
    tag: 'Sound \u00B7 Stillness',
    theme: 'Wellness',
    description: 'A guided sound bath at Aaromale in Film Nagar. Singing bowls fill a candlelit room. Thirty people lie still, eyes closed, letting therapeutic vibrations move through them. No phones. No conversation. Just sound, stillness, and the rare permission to simply be present.',
    venue: 'Aaromale, Film Nagar',
    facilitator: 'Pallavi Marshall',
    guestCount: 30,
    vibeTags: ['Intimate', 'Restorative'],
    reelUrl: 'https://www.instagram.com/reel/DV6NHbokTSN/',
    image: '/assets/ig-resonance-room.jpg',
    imageHd: '/assets/ig-resonance-room-hd.jpg',
  },
  {
    name: 'Chromatic Conversations',
    tag: 'Art \u00B7 Investment',
    theme: 'Cultural',
    description: 'An evening exploring art as a serious asset class. Forty selected guests. Wine in hand. A gallery director with 13 years across India, Europe, and MENA leading the conversation. Where collectors began thinking long term. Not about decor. About positioning.',
    venue: 'Elements by Nirvania, Banjara Hills',
    facilitator: 'Sunaina Misra, Artiste Culture',
    guestCount: 40,
    vibeTags: ['Cultural', 'Intellectual'],
    reelUrl: 'https://www.instagram.com/reel/DVX6sY8kYyr/',
    image: '/assets/ig-cc3-art.jpg',
    imageHd: '/assets/ig-cc3-art-hd.jpg',
  },
  {
    name: 'Melody & Mingle',
    tag: 'Music \u00B7 Connection',
    theme: 'Entertainment',
    description: "An open mic evening where every voice in the room was chosen. Voices shook a little. Smiles stayed a little longer. Between lyrics and laughter, people found their people. The kind of night you reference months later.",
    guestCount: 40,
    vibeTags: ['Warm', 'Creative'],
    reelUrl: 'https://www.instagram.com/reel/DU5PZQ4kaqR/',
    image: '/assets/ig-melody-mingle.jpg',
    imageHd: '/assets/ig-melody-mingle-hd.jpg',
  },
]

export const reels = [
  { url: 'https://www.instagram.com/reel/DNlNdzeTiLc/', label: 'LUME Highlight', views: '38.6K' },
  { url: 'https://www.instagram.com/reel/DQ8gr5RkbYv/', label: 'Community', views: '25.7K' },
  { url: 'https://www.instagram.com/reel/DNs5HvzZg9z/', label: 'Experiences', views: '24.3K' },
  { url: 'https://www.instagram.com/reel/DV6NHbokTSN/', label: 'The Resonance Room' },
  { url: 'https://www.instagram.com/reel/DVX6sY8kYyr/', label: 'Chromatic Conversations' },
  { url: 'https://www.instagram.com/reel/DU5PZQ4kaqR/', label: 'Melody & Mingle' },
]

export const stats = [
  { value: '15+', label: 'Experiences hosted' },
  { value: '200+', label: 'Selected guests' },
  { value: '2', label: 'Evenings per month' },
  { value: '30-50', label: 'Guests per evening' },
]
