# 🎧 Indahouse

**Book remote DJs for your private parties and dinners.**

A live DJ mixes from their studio — you stream it through your speakers.

---

## 🚀 Deploy to Vercel in 3 steps

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial Indahouse deploy"
gh repo create indahouse --public --push --source=.
```

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **Add New → Project**
3. Import your `indahouse` GitHub repo
4. Vercel auto-detects Create React App — click **Deploy**
5. Done! You get a live URL like `indahouse.vercel.app`

### Step 3 — Cast to Chromecast
1. Open your Vercel URL in **Chrome**
2. Click ⋮ menu → **Cast** → **Cast tab**
3. Select your Chromecast device
4. The DJ streams to your TV 🎉

---

## 💻 Run locally
```bash
npm install
npm start
```
Opens at `http://localhost:3000`

---

## 🏗 Build for production
```bash
npm run build
```

---

## Features
- 🎧 Browse & book remote DJs (filter by genre, budget, event type)
- 📅 Book private sessions by date, time & duration (hourly rate)
- 🔴 Live session screen — fullscreen DJ view with animated canvas
- 🎵 Real deep house music synthesized via Web Audio API
- 🎛 Interactive mixer — EQ knobs, crossfader, VU meter
- 💿 Animated spinning turntable synced to BPM
- 🎤 Song requests sent to DJ in real time
- ⭐ Reviews & ratings system
- 📱 Optional host camera (Picture-in-Picture)
- 🔊 Stream to any speaker via Bluetooth, AUX, or Chromecast

---

## Tech Stack
- React 18
- Web Audio API (deep house synth engine)
- Canvas API (DJ animation)
- No backend required — add Supabase for real auth & database

## Adding a real backend (optional)
1. Sign up at [supabase.com](https://supabase.com)
2. Create tables: `users`, `djs`, `bookings`, `reviews`
3. Replace the seed data in `App.jsx` with Supabase queries
4. Add Supabase Auth for real login
