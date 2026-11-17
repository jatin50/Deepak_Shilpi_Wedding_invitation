# Deepak & Shilpi · Luxury Mobile-First Digital Wedding Invitation

A handcrafted, mobile-first digital wedding invitation website custom-built for **Deepak Jain & Shilpi Garg** for their wedding on **12 December 2026**. Designed specifically for smartphone screens (optimized for 390px viewport width first, scaling up to a centered ~520px luxury stationery column on tablets and desktops with a soft blush wash background).

---

## ✨ Design & Craftsmanship Highlights

- **Luxury Indian Architectural Motifs**: Elegant Mughal arches, 1px hairlines, and double-border stationery cards (1px outer border + 1px inner border inset by 9px).
- **No Black Anywhere**: Pure pastel harmony using dusty mauve ink (`#8a5560`), blush ivory (`#fbf1ed`), soft paper (`#fff9f6`), muted rose (`#d9a0a8`), and sage leaves (`#a9bfa8`).
- **Intro Gate Experience**: Full-screen dense overlapping pink rose field with a handcrafted satin ribbon bow seal in the center, breathing slowly and scaling up on tap to unlock the invitation and begin soothing background music.
- **Falling Rose Petals**: High-performance custom `<canvas>` particle physics system (14–16 realistic leaf-shaped petals with sinusoidal wobble and 3D tumbling, pausing when the browser tab is inactive to preserve battery).
- **Personalized Guest Greetings**: Automatic support for WhatsApp guest parameters (e.g., `?to=Rahul+Garg` displays *"Dear Rahul Garg,"* in the blessing section).
- **Dynamic Calendar & Live Countdown**: Computed calendar matrix for December 2026 with a hand-drawn SVG ink circle animating around the 12th; countdown boxes with Framer Motion vertical slide flips targeting `2026-12-12T19:00:00+05:30`.
- **Scroll-Scrubbed Event Crossfades**: GSAP ScrollTrigger timeline that blurs and sharpens itinerary cards as guests scroll.
- **Stationery RSVP & Calendar Export**: One-tap WhatsApp RSVP with pre-filled greeting, automatic dynamic `.ics` calendar file download for Google & Apple Calendars, Web Share API with clipboard fallback toast, and direct `tel:` family links.
- **Sub-150KB Optimized Assets & SVG Fallbacks**: All watercolor illustrations are compressed to lightweight WebP files, with inline handcrafted SVG outlines as fallbacks.

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css         # Design tokens, CSS variables, stationery double-border, dark mode
│   ├── layout.tsx          # Google fonts (Pinyon Script & Cormorant Garamond), OG meta tags
│   └── page.tsx            # Main page composition with Suspense & mobile column layout
├── components/
│   ├── IntroGate.tsx       # Fullscreen rose wall & interactive satin bow seal
│   ├── Hero.tsx            # D&S monogram, clip-path mask name reveal, archway & scroll cue
│   ├── PetalCanvas.tsx     # Custom 60fps canvas particle physics for falling petals
│   ├── Blessing.tsx        # Top scalloped swaying garland border & guest personalization
│   ├── SaveTheDate.tsx     # Square stationery calendar & live AnimatePresence countdown
│   ├── Celebrations.tsx    # Haldi, Sangeet, Wedding with GSAP scroll crossfade & icons
│   ├── Venue.tsx           # Watercolor haveli illustration, address, and Google Maps pill
│   ├── QuoteBand.tsx       # Parallax upward lace drifting band with typography
│   ├── RSVP.tsx            # Double-border box, WhatsApp reply, .ics generator, share toast
│   ├── Footer.tsx          # "Deepak & Shilpi", rose-line divider, gratitude note
│   ├── AudioPlayer.tsx     # Floating 40px circle toggle with mute memory & autoplay handler
│   └── LenisProvider.tsx   # Lenis smooth scrolling with prefers-reduced-motion check
├── config/
│   └── invite.ts           # 🌟 SINGLE TYPED SOURCE OF TRUTH for all wedding data
├── hooks/
│   ├── useCountdown.ts     # Real-time ticking countdown with days/hours/mins/secs
│   ├── useInView.ts        # Intersection Observer wrapper for viewport triggers
│   └── useReducedMotion.ts # Media query listener for prefers-reduced-motion
├── lib/
│   ├── ics.ts              # RFC-compliant iCalendar (.ics) generation & trigger download
│   └── date.ts             # Dynamic monthly calendar weekday offset calculator
├── public/
│   ├── audio/              # instrumental.mp3 & instrumental.wav (Indian flute & tanpura melody)
│   ├── img/                # arch.webp, venue.webp, lace.webp, events/ (haldi, sangeet, wedding)
│   └── og.jpg              # 1200x630 Open Graph preview banner for WhatsApp & iMessage
├── tailwind.config.ts      # Tailwind configuration mapping all CSS token variables
└── package.json
```

---

## 🛠️ How to Customize Wedding Data

All wedding content lives exclusively inside **[`config/invite.ts`](file:///C:/Users/jainj/.gemini/antigravity/scratch/deepak-shilpi-wedding/config/invite.ts)**:

```typescript
export const weddingConfig: WeddingConfig = {
  couple: {
    groom: 'Deepak Jain',
    bride: 'Shilpi Garg',
    groomShort: 'Deepak',
    brideShort: 'Shilpi',
    monogram: 'D&S',
    groomLineage: 'S/O Smt. Bhumi Jain & Sh. Manik Chand Jain',
    brideLineage: 'D/O Smt. Yashoda Garg & Sh. Ashok Garg',
  },
  blessings: {
    elders: 'Under The Blessings of Late Smt. Tara Bai Jain & Late Sh. Shyam Lal Jain',
    invitationNote: 'we cordially invite you to the wedding ceremony of our Son',
  },
  weddingStart: '2026-12-12T21:00:00+05:30',
  events: [
    // 1. Haldi & Mehndi (Casa Royal Banquet, Mayapuri)
    // 2. Bhaat (Residence)
    // 3. Gudh Chadi (Residence)
    // 4. Departure of Barat (GoalChakkar, Beri Wala Bagh, Hari Nagar)
    // 5. Dinner & Wedding Ceremony (Elegance By Kawatra Tent, Hari Nagar)
  ],
  venue: {
    name: 'Elegance By Kawatra Tent',
    address: 'Hari Enclave, Hari Nagar, New Delhi - 110064',
  },
  rsvp: {
    familyMembers: ['P.D Jain', 'Manik Chand Jain', 'Abhishek Jain', 'And all Jain family'],
    note: 'We can’t wait to celebrate with you ❤️',
  },
};
```

---

## 💌 Guest Personalization Links

To send personalized invitations over WhatsApp or SMS, append `?to=Name` or `?guest=Name` to your website URL:

- `https://your-domain.com/?to=Rahul+Garg`
- `https://your-domain.com/?to=Sharma+Family`
- `https://your-domain.com/?to=Aakash+&+Pooja`

The blessing card automatically greets them:
> *"Dear Rahul Garg,"*

If no parameter is passed, the invitation smoothly omits the line while preserving spacing.

---

## 🎨 Replacing Images & Audio

1. **Floral Archway**: Replace `public/img/arch.webp` (Recommended: ~720px width, WebP under 120KB).
2. **Event Icons**:
   - `public/img/events/haldi.webp` (~400x400px)
   - `public/img/events/sangeet.webp` (~400x400px)
   - `public/img/events/wedding.webp` (~400x400px)
3. **Venue Photo / Painting**: Replace `public/img/venue.webp` (~720px width).
4. **WhatsApp Link Preview**: Replace `public/og.jpg` (1200x630px).
5. **Background Instrumental Music**: Replace `public/audio/instrumental.mp3` with any preferred shehnai, flute, or harp audio track.

*Note: If any image file is missing or removed, the components automatically render handcrafted SVG vector art fallbacks.*

---

## 🚀 Running Locally & Deploying to Vercel

### Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000 in your browser
```

### Build Production Bundle
```bash
npm run build
```

### Deploy to Vercel
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: luxury digital wedding invitation for Deepak & Shilpi"
   git branch -M main
   git remote add origin https://github.com/<your-username>/deepak-shilpi-wedding.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository. Vercel automatically detects Next.js 14.
4. Click **"Deploy"**. Your live wedding invitation is ready in ~60 seconds!

---

## 📋 Checklist of Placeholders to Fill Before Sharing

- [ ] **RSVP WhatsApp Number**: In [`config/invite.ts`](file:///C:/Users/jainj/.gemini/antigravity/scratch/deepak-shilpi-wedding/config/invite.ts), change `rsvp.whatsappNumber` to the phone number that will receive RSVPs (include country code without `+`, e.g. `919811122233`).
- [ ] **Family Contact Phone Numbers**: In [`config/invite.ts`](file:///C:/Users/jainj/.gemini/antigravity/scratch/deepak-shilpi-wedding/config/invite.ts), update `rsvp.contacts` with the actual phone numbers for the groom and bride families.
- [ ] **Final RSVP Date**: Confirm `rsvp.by` date (currently set to 25 November 2026).
- [ ] **Venue Name & Google Maps Link**: If the real venue is different from Rosewood Haveli Udaipur, update `venue.name`, `venue.address`, and `venue.mapUrl`.
- [ ] **Ceremony Timings**: Confirm Muhurat / Pheras time (`weddingStart` ISO string) so the live countdown ticks down to the exact second.
- [ ] **Production URL**: In [`config/invite.ts`](file:///C:/Users/jainj/.gemini/antigravity/scratch/deepak-shilpi-wedding/config/invite.ts), update `meta.url` to your live Vercel domain so Open Graph WhatsApp link previews display properly.
