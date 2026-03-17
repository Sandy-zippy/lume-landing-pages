# LUME React Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, interactive LUME membership landing page using React + Tailwind + Framer Motion + shadcn components with embedded Instagram reels, correct brand identity, and a 5-step qualification quiz.

**Architecture:** Single-page React app (Vite) with component sections rendered in sequence. Framer Motion handles scroll-triggered animations and section transitions. Instagram reels embedded via iframe. Quiz state managed with React useState. Builds to static HTML/JS for GitHub Pages deployment.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS 4, Framer Motion, shadcn/ui, Lucide icons

**Brand Identity (from @lumeproject_offl):**
- Fonts: Cormorant (headings, serif) + Outfit (body, sans-serif)
- Colors: Black (#000), Charcoal (#1a1a1a), Cream (#f8f6f3), Gold (#C9A962), Red/Logo (#C41E3A), White (#fff)
- Aesthetic: Dark, editorial, intimate, anti-mass-market, generous whitespace

---

## File Structure

```
lume-react/
├── public/
│   └── assets/          # Copy from ../assets/ (images, logos)
├── src/
│   ├── main.tsx         # Entry point
│   ├── App.tsx          # Root component — section composition
│   ├── index.css        # Tailwind imports + global styles + fonts
│   ├── lib/
│   │   └── utils.ts     # cn() helper for Tailwind class merging
│   ├── components/
│   │   ├── Nav.tsx              # Fixed nav with scroll-based solid state
│   │   ├── Hero.tsx             # Full-viewport hero with gradient overlay
│   │   ├── StatsBar.tsx         # Dark stats strip (4 metrics)
│   │   ├── IdentityFilter.tsx   # "For you / Not for you" cards
│   │   ├── Experiences.tsx      # Event cards with reel play buttons
│   │   ├── ReelGallery.tsx      # Embedded Instagram reels (autoplay grid)
│   │   ├── People.tsx           # Archetype tags + Four Houses
│   │   ├── Process.tsx          # "How you get invited" (dark section)
│   │   ├── Quiz.tsx             # 5-step BusinessMint qualification quiz
│   │   ├── FAQ.tsx              # Expandable accordion
│   │   ├── FinalCTA.tsx         # Closing CTA section
│   │   ├── Footer.tsx           # Footer
│   │   └── ThankYouOverlay.tsx  # Post-submission overlay
│   ├── hooks/
│   │   └── useScrollReveal.ts   # IntersectionObserver hook for animations
│   └── data/
│       ├── events.ts            # All LUME events data
│       ├── quiz.ts              # Quiz questions and scoring logic
│       └── brand.ts             # Brand colors, fonts, social links
├── vite.config.ts       # Vite config (base path for GitHub Pages)
├── tailwind.config.ts   # Tailwind with LUME brand tokens (Tailwind v4 - may use CSS config)
├── tsconfig.json
├── components.json      # shadcn/ui config
└── package.json
```

---

## Chunk 1: Project Foundation

### Task 1: Configure Vite + Tailwind + Path Aliases

**Files:**
- Modify: `lume-react/vite.config.ts`
- Modify: `lume-react/tsconfig.json`
- Modify: `lume-react/src/index.css`
- Create: `lume-react/src/lib/utils.ts`

- [ ] **Step 1: Update vite.config.ts with Tailwind plugin + path aliases + GitHub Pages base**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/lume-landing-pages/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: Update tsconfig.json (or tsconfig.app.json) with path aliases**

Add to compilerOptions:
```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

- [ ] **Step 3: Set up index.css with Tailwind + Google Fonts + LUME brand tokens**

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

@theme {
  --color-lume-black: #000000;
  --color-lume-charcoal: #1a1a1a;
  --color-lume-cream: #f8f6f3;
  --color-lume-gold: #C9A962;
  --color-lume-red: #C41E3A;
  --color-lume-red-soft: #B80000;
  --color-lume-text: #2A2A2A;
  --color-lume-soft: #6B6B6B;
  --color-lume-muted: #9E9E9E;
  --color-lume-border: #E8E5E0;
  --color-lume-warm: #F7F5F2;
  --font-heading: 'Cormorant', serif;
  --font-body: 'Outfit', sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--color-lume-text);
  background: #fff;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-heading);
}

::selection {
  background: rgba(196, 30, 58, 0.08);
}
```

- [ ] **Step 4: Create utils.ts**

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 5: Copy image assets**

Run: `cp -r /Users/sandy/lume-landing-pages/assets /Users/sandy/lume-landing-pages/lume-react/public/assets`

- [ ] **Step 6: Verify dev server starts**

Run: `cd /Users/sandy/lume-landing-pages/lume-react && npm run dev`
Expected: Vite dev server starts, page loads at localhost:5173

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "chore: configure Vite + Tailwind + LUME brand tokens"
```

### Task 2: Create Data Files

**Files:**
- Create: `lume-react/src/data/brand.ts`
- Create: `lume-react/src/data/events.ts`
- Create: `lume-react/src/data/quiz.ts`

- [ ] **Step 1: Create brand.ts with all LUME constants**

```ts
export const brand = {
  name: 'LUME',
  tagline: 'By Invitation Only',
  instagram: 'https://www.instagram.com/lumeproject_offl',
  website: 'https://thelumeproject.com',
  legal: 'Lume Project Private Limited',
  city: 'Hyderabad',
  founder: 'Siddharth Penugonda',
  email: 'info.thelume@gmail.com',
  membership: { standard: 118000, premium: 236000 },
  cadence: '2 experiences per month',
  guestsPerEvent: '30-50',
  values: ['Realness', 'Initiative', 'Respect', 'Play', 'Accountability'],
  houses: [
    { name: 'House of Maurya', traits: 'Strategic, bold, visionary' },
    { name: 'House of Chola', traits: 'Creative, resilient, culture-led' },
    { name: 'House of Ahom', traits: 'Curious, community-driven, adaptive' },
    { name: 'House of Maratha', traits: 'Fearless, fast-moving, dynamic' },
  ],
  archetypes: ['Founders', 'Creative Directors', 'Cultural Leaders', 'Senior Professionals', 'Tastemakers'],
} as const
```

- [ ] **Step 2: Create events.ts with all known LUME events + reel URLs**

```ts
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
    tag: 'Sound · Stillness',
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
    tag: 'Art · Investment',
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
    tag: 'Music · Connection',
    theme: 'Entertainment',
    description: 'An open mic evening where every voice in the room was chosen. Voices shook a little. Smiles stayed a little longer. Between lyrics and laughter, people found their people. The kind of night you reference months later.',
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
  { url: 'https://www.instagram.com/reel/DV6NHbokTSN/', label: 'The Resonance Room', views: '' },
  { url: 'https://www.instagram.com/reel/DVX6sY8kYyr/', label: 'Chromatic Conversations', views: '' },
  { url: 'https://www.instagram.com/reel/DU5PZQ4kaqR/', label: 'Melody & Mingle', views: '' },
]

export const stats = [
  { value: '15+', label: 'Experiences hosted' },
  { value: '200+', label: 'Selected guests' },
  { value: '2', label: 'Evenings per month' },
  { value: '30-50', label: 'Guests per evening' },
]
```

- [ ] **Step 3: Create quiz.ts with questions + scoring logic**

```ts
export interface QuizQuestion {
  id: string
  number: string
  text: string
  options: string[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'profile',
    number: '01',
    text: 'What best describes you?',
    options: ['Founder / Business Owner', 'Senior Executive / CXO', 'Creative Professional', 'Consultant / Advisor', 'Artist / Cultural Practitioner', 'Other'],
  },
  {
    id: 'evening',
    number: '02',
    text: 'What kind of evenings do you gravitate toward?',
    options: ['Cultural and artistic', 'Intellectual and conversational', 'Social and high-energy', 'Wellness and introspective'],
  },
  {
    id: 'discovery',
    number: '03',
    text: 'How do you typically discover new experiences?',
    options: ['Curated invitations and personal recommendations', 'Social media and content', 'Friends and professional circles', 'I seek them out myself'],
  },
  {
    id: 'values',
    number: '04',
    text: 'When it comes to experiences, what matters most?',
    options: ['The quality of people in the room', 'Exclusivity and curation', 'Learning something new', 'The atmosphere and setting'],
  },
  {
    id: 'commitment',
    number: '05',
    text: 'LUME is an annual commitment to curated experiences. How does that sit with you?',
    options: ['I regularly invest in premium experiences', "I'm open to it if the fit is right", "I'd like to attend as a guest first", "I'm just exploring for now"],
  },
]

export function getLeadTags(commitment: string): string[] {
  const base = ['lume-eligibility', 'fb-lead', 'mar-2026']
  if (commitment === 'I regularly invest in premium experiences') return [...base, 'high-intent', 'premium-ready']
  if (commitment === "I'm open to it if the fit is right") return [...base, 'warm-lead']
  return [...base, 'nurture']
}
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add LUME brand, events, and quiz data files"
```

---

## Chunk 2: Core Components (Hero → StatsBar → Identity → Experiences)

### Task 3: Nav Component

**Files:**
- Create: `lume-react/src/components/Nav.tsx`

- [ ] **Step 1: Build Nav with scroll-triggered solid background**

Dual-logo system (white on transparent, dark on solid). "Check Eligibility" CTA. Uses useState + useEffect for scroll detection. Smooth transition on scroll > 60px.

- [ ] **Step 2: Commit**

### Task 4: Hero Component

**Files:**
- Create: `lume-react/src/components/Hero.tsx`

- [ ] **Step 1: Build full-viewport hero with Framer Motion entrance animation**

- Background: `ig-melody-mingle-hd.jpg` with dark gradient overlay (stronger than V11 — `rgba(0,0,0,.85)` at bottom fading to black, not warm)
- Headline: Cormorant serif, white text with gold italic accent on "interesting"
- Copy: "Where Hyderabad's most *interesting* people spend their evenings"
- Sub: "Two curated experiences a month. 30 to 50 selected guests. Founders, creatives, and cultural leaders only."
- CTA: "Check Your Eligibility" → scrolls to #quiz
- Framer Motion: `motion.div` with fadeIn + slight translateY on load (0.8s ease)
- Background image fallback color: `#1a0000`

- [ ] **Step 2: Commit**

### Task 5: StatsBar Component

**Files:**
- Create: `lume-react/src/components/StatsBar.tsx`

- [ ] **Step 1: Build dark stats bar with 4 metrics**

Black background (#000), 4-column grid. Cormorant for numbers, Outfit for labels. Uses `stats` from data/events.ts. Framer Motion: number count-up animation on scroll into view.

- [ ] **Step 2: Commit**

### Task 6: IdentityFilter Component

**Files:**
- Create: `lume-react/src/components/IdentityFilter.tsx`

- [ ] **Step 1: Build "For you / Not for you" card pair with reveal animation**

Two cards in a grid. "For you" card: white bg, red border accent. "Not for you" card: cream bg, muted text. Framer Motion: staggered reveal (left card first, then right). Section title: "Before you scroll *further.*"

- [ ] **Step 2: Commit**

### Task 7: Experiences Component

**Files:**
- Create: `lume-react/src/components/Experiences.tsx`

- [ ] **Step 1: Build editorial experience cards with Instagram reel play overlays**

Alternating layout (image left/right). Each card shows: thumbnail image, play button overlay linking to reel, event tag, name (Cormorant), description, venue, vibe tags. Framer Motion: slide-in from left/right alternating. Hover: image scale 1.03 + play button fade-in.

- [ ] **Step 2: Commit**

---

## Chunk 3: Interactive Sections (ReelGallery → People → Process → Quiz)

### Task 8: ReelGallery Component

**Files:**
- Create: `lume-react/src/components/ReelGallery.tsx`

- [ ] **Step 1: Build embedded Instagram reel gallery**

Grid of 3 reels (the high-view-count ones: 38.6K, 25.7K, 24.3K). Each reel embedded via Instagram embed iframe: `https://www.instagram.com/reel/{ID}/embed/`. 9:16 aspect ratio cards. Section title: "Real rooms. *Real people.*". Below grid: "Watch more on @lumeproject_offl" link.

Note: Instagram embeds require the embed script: `<script async src="//www.instagram.com/embed.js"></script>`

- [ ] **Step 2: Commit**

### Task 9: People + Four Houses Component

**Files:**
- Create: `lume-react/src/components/People.tsx`

- [ ] **Step 1: Build people section with archetype tags + Four Houses reveal**

Top: archetype pill tags (Founders, Creative Directors, etc.) with hover effect. Below: "The Four Houses" subsection with 4 cards. Each house card: name, dynasty reference, traits. Glass-effect cards (backdrop-filter blur, subtle border). Framer Motion: staggered card entrance.

- [ ] **Step 2: Commit**

### Task 10: Process Component (Dark Section)

**Files:**
- Create: `lume-react/src/components/Process.tsx`

- [ ] **Step 1: Build dark "How you get invited" section**

Black background. 3-step horizontal layout. Each step: large number (Cormorant, very faint white), heading, description. Glass-effect card borders. Title: "How you get *invited.*" with gold accent.

- [ ] **Step 2: Commit**

### Task 11: Quiz Component

**Files:**
- Create: `lume-react/src/components/Quiz.tsx`

- [ ] **Step 1: Build 5-step quiz with Framer Motion AnimatePresence transitions**

- Progress bar (red fill, animated width)
- Each step: question number, question text, option buttons
- Back button on steps 2-5
- "Other" text field on step 1
- AnimatePresence for slide transitions between steps (exit left, enter right)
- Step 5 is the spending capacity filter
- After step 5: 2.2s loading animation ("Reviewing your profile...")
- Then: "You've been shortlisted" + contact form (name, WhatsApp, email)
- Submit: POST to GHL webhook + FB Pixel Lead event + localStorage fallback
- UTM capture from URL params
- Duplicate submission prevention
- Uses `quizQuestions` and `getLeadTags` from data/quiz.ts

- [ ] **Step 2: Commit**

---

## Chunk 4: FAQ → Footer → Assembly → Deploy

### Task 12: FAQ Component

**Files:**
- Create: `lume-react/src/components/FAQ.tsx`

- [ ] **Step 1: Build expandable FAQ accordion**

5 questions. Click to expand/collapse with smooth height animation. Plus icon rotates to X on open. Questions:
1. What exactly is LUME?
2. How is this different from networking events?
3. How do you select members?
4. What does membership include?
5. Can I attend one experience before committing?

- [ ] **Step 2: Commit**

### Task 13: FinalCTA + Footer + ThankYouOverlay

**Files:**
- Create: `lume-react/src/components/FinalCTA.tsx`
- Create: `lume-react/src/components/Footer.tsx`
- Create: `lume-react/src/components/ThankYouOverlay.tsx`

- [ ] **Step 1: Build closing CTA section**

Cream background. "The next experience is being *designed.*" + "Check Your Eligibility" button.

- [ ] **Step 2: Build footer**

LUME logo, Instagram link, legal line.

- [ ] **Step 3: Build thank-you overlay**

Fixed overlay with blur backdrop. Shows first name. "We'll be in touch within 48 hours." + Follow Instagram CTA.

- [ ] **Step 4: Commit**

### Task 14: Assemble App.tsx

**Files:**
- Modify: `lume-react/src/App.tsx`

- [ ] **Step 1: Compose all sections in App.tsx**

```tsx
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import IdentityFilter from '@/components/IdentityFilter'
import Experiences from '@/components/Experiences'
import ReelGallery from '@/components/ReelGallery'
import People from '@/components/People'
import Process from '@/components/Process'
import Quiz from '@/components/Quiz'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <IdentityFilter />
      {/* Mid CTA */}
      <Experiences />
      <ReelGallery />
      <People />
      <Process />
      <Quiz />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Clean up main.tsx (remove StrictMode double-render if needed)**

- [ ] **Step 3: Commit**

### Task 15: Build + Deploy

**Files:**
- Modify: `lume-react/vite.config.ts` (ensure base path)

- [ ] **Step 1: Test build**

Run: `cd /Users/sandy/lume-landing-pages/lume-react && npm run build`
Expected: `dist/` folder created with index.html + assets

- [ ] **Step 2: Test locally**

Run: `npm run preview`
Open in Chrome. Verify all sections render, quiz works, reels load.

- [ ] **Step 3: Deploy to GitHub Pages**

Copy `dist/` contents to repo root or set up GitHub Actions. Or deploy to Netlify for simpler SPA routing.

- [ ] **Step 4: Commit + push**

```bash
git add -A && git commit -m "feat: complete LUME React landing page with quiz funnel"
git push origin main
```

---

## Key Design Decisions

1. **Cormorant + Outfit** (not Bodoni Moda + Poppins) — matches LUME's actual social media brand
2. **Dark aesthetic** — black backgrounds for stats/process sections, cream for softer sections
3. **Gold (#C9A962) accents** — on italic emphasis words in headings
4. **Instagram embeds** — native iframe embeds, not just thumbnails
5. **Framer Motion everywhere** — scroll reveals, step transitions, count-up animations, staggered cards
6. **Quiz preserved** — BusinessMint qualification model stays, integrated as one section of full page
7. **Four Houses** — unique LUME feature showcased in People section
8. **15+ events stat** — from CC3 trust bar, used in StatsBar
