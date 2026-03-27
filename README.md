# Tracker Made Easy — by Vysakh
### Retail KPI Tracker & Shift Manager with Cloud Database

---

## What's Inside

| File | Purpose |
|------|---------|
| `index.html` | Complete app (HTML + CSS + JS) |
| `manifest.json` | PWA config |
| `sw.js` | Service worker (offline support) |
| `icon-192.png` | App icon small |
| `icon-512.png` | App icon large |
| `netlify.toml` | Netlify build config |
| `package.json` | Dependencies (Netlify Blobs) |
| `netlify/functions/sync.js` | Cloud sync serverless function |

---

## Deploy to Netlify with Database (Step by Step)

### STEP 1 — Push to GitHub (no terminal needed)

1. Go to **github.com** → click **+** → **New repository**
2. Name: `tracker-made-easy` → Public → Create
3. Click **"Add file"** → **"Upload files"**
4. Drag ALL files and the `netlify/` folder
5. Commit

**Important**: Make sure the folder structure is:
```
tracker-made-easy/
├── index.html
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
├── netlify.toml
├── package.json
└── netlify/
    └── functions/
        └── sync.js
```

### STEP 2 — Connect to Netlify

1. Go to **app.netlify.com** → Sign up / Log in (use GitHub account)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select your `tracker-made-easy` repo
4. Build settings will auto-detect from `netlify.toml`:
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
5. Click **"Deploy site"**
6. Wait 1-2 minutes — your site is live!

### STEP 3 — Netlify Blobs (Database) is Automatic!

**Netlify Blobs is built-in** — no extra setup needed. When Netlify deploys your site:

- The `sync.js` function automatically has access to Netlify Blobs
- Your data is stored in Netlify's cloud infrastructure
- It persists forever (not tied to browser localStorage)
- Daily backups are created automatically

### STEP 4 — How Sync Works

The app uses a **hybrid storage** approach:

1. **localStorage** — instant, works offline, always available
2. **Netlify Blobs** — cloud backup, syncs when online

When you:
- **Save sales** → saves to localStorage AND syncs to cloud
- **Finish shift** → saves locally AND syncs to cloud
- **Open app** → loads from localStorage first, then fetches cloud data
- **Tap "Sync Now"** in Settings → manual cloud push

The green/amber/grey dot next to the brand badge shows sync status:
- 🟢 Green = synced to cloud
- 🟡 Amber = syncing...
- ⚫ Grey = local only (offline)

### STEP 5 — Install as PWA

- **iPhone**: Safari → Share ↑ → Add to Home Screen
- **Android**: Chrome → Install App

---

## Custom Domain (Optional)

1. In Netlify dashboard → Site settings → Domain management
2. Add your custom domain
3. Netlify handles SSL automatically

---

## Features

- Shift management (start/finish/timer/staff/proof photos)
- 8 sales entry fields with App Store-style modals
- Live KPI calculations (ATV in AED, IPC, Conversion%, No7%, AURA%)
- DSSR Cash tracking with KD conversion
- TAKE KEY / GIVE KEY full-screen prompts
- Closing checklist (7 items + custom tasks with delete)
- Weekly calendar widget from rota
- Shift history with share
- Cloud sync via Netlify Blobs
- Offline-first PWA

---

Made by Vysakh 💊
