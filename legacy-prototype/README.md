# 💍 Royal Interactive Wedding Invitation | Deepak & Shilpi

An interactive, royal digital wedding web invite inspired by the viral reel from **Chalchitra Labs**, custom-crafted for the wedding of **Deepak Jain & Shilpi Garg** on **11th & 12th December 2026**.

---

## ✨ Features Included

1. **Tap-to-Break Royal Monogram Wax Seal:**
   - 3D crimson wax seal stamped with **"D & S"** monogram.
   - Synthesizes realistic wax cracking sound & royal harmonic chimes via the Web Audio API on click.

2. **3D Palace Gate Opening:**
   - Realistic 3D perspective double doors swinging open outward with gold filigree and jaali motifs.

3. **Phoolon Ki Baarish (Falling Rose Petals Shower):**
   - High-performance HTML5 Canvas particle physics.
   - Fluttering petals in royal red, velvet pink, and gold marigold with realistic 3D tumbling and air drift.

4. **Background Wedding Music:**
   - Shehnai & flute melody that automatically triggers smoothly on opening, with a floating vinyl disc toggle in the corner to play/pause anytime.

5. **Personalized WhatsApp Guest Links (`?guest=...`):**
   - Open with any guest parameter (e.g., `?guest=Aggarwal+Family`), and the invitation displays:
     > *"Cordially Invited: Aggarwal Family"*
   - Includes a built-in WhatsApp generator tool right inside the invitation!

6. **Live Auspicious Muhurat Countdown:**
   - Real-time countdown clock ticking down to the wedding on 12th December 2026.

7. **Complete 2-Day Event Itinerary:**
   - **Day 1 (11th Dec):** Haldi Ceremony, Mehendi Rasam, Sangeet & Cocktail Night.
   - **Day 2 (12th Dec):** Baraat, Varmala & Sacred Pheras, Grand Reception & Dinner.
   - Every single event includes **1-Tap Google Maps Navigation** and **Add to Google / Apple Calendar** buttons.

8. **Interactive Community Additions:**
   - **Sangeet DJ Wishlist:** Guests can submit the Bollywood/Punjabi songs they want to dance to!
   - **Blessings & Wishes Wall:** Guests leave warm congratulatory notes and blessings that appear live.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click [`index.html`](file:///C:/Users/jainj/.gemini/antigravity/scratch/deepak-shilpi-wedding/index.html) to open it in Chrome, Edge, or Safari!

### Option 2: Local HTTP Server (Recommended)
Open your terminal in this directory and run:
```bash
npx serve .
```
Then visit: `http://localhost:3000`

---

## 💌 How to Test Personalized WhatsApp Invites

Try opening with query parameters in your browser:
- `http://localhost:3000/?guest=Sharma+Ji+Parivaar`
- `http://localhost:3000/?guest=Rohit+Bhaiya+%26+Bhabhi`

---

## 🌐 How to Host for Free for WhatsApp Sharing

You can deploy this site in under 60 seconds with 0 cost:
1. **GitHub Pages:** Create a repository and push these 3 files (`index.html`, `style.css`, `script.js`). Enable GitHub Pages in settings.
2. **Vercel / Netlify:** Drag and drop the folder `deepak-shilpi-wedding` to [Netlify Drop](https://app.netlify.com/drop) or import into [Vercel](https://vercel.com).
3. Connect a custom domain (e.g., `deepakwedsshilpi.com`) if desired!
