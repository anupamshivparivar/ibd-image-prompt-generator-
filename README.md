# 🕉️ IBD Universal Studio Suite | V1–V26

[![IBD Studio CI](https://github.com/anupamskm/ibd-universal-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/anupamskm/ibd-universal-studio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![PWA: Installable](https://img.shields.io/badge/PWA-Installable-emerald.svg)](https://web.dev/progressive-web-apps/)
[![TypeScript: 5.8](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite: 6.2](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)

> **The Sovereign Indian Bhakti Dhara (IBD) Production Intelligence Suite**
> An enterprise-grade, offline-first Progressive Web Application (PWA) and AI studio for sacred Indian key-art, scriptural corpus analytics, 9:16 vertical shorts, and devotional master prompting.

---

## 🌟 Key Highlights

- 📱 **Progressive Web App (PWA) 100% Compliant**: Full standalone install support on **Android (WebAPK/Chrome/Edge)**, **iOS (Safari Add to Home Screen)**, and **Desktop (PC/Mac)** with service worker precaching and offline access.
- 📜 **54 Sacred Texts Corpus**: Verified 0 Devanagari/Latin corruptions across Valmiki Ramayana, Tulsidas Ramcharitmanas, Sundarkand, Shrimad Bhagavad Gita (18 Chapters), and Shiva Mahamantra Suite.
- 🔱 **Sri Shiva Mahamantra & Stotras Suite**: Om Namah Shivay, Rudrashtakam, Panchakshara, Lingashtakam, and Shiva Tandava with 10-Theme HD PNG Visual Cards and dynamic theme selectors.
- 🏹 **Sundarkand & Ramcharitmanas 7-Kaand Studio**: Verses, translations, word-by-word meaning, and cinematic 9:16 visual prompts.
- 🦚 **Krishna Suvichar 9:16 Shorts Studio**: Daily Gita wisdom & Krishna suvichar formatted for YouTube Shorts and Instagram Reels with branding safe zones.
- 🏛️ **Temple Sanctum Production Engines**: V25 Sovereign Command Engine, V24 Aarti Engine, V23 Daywise Rotation, V22 Living Cosmic Darshan, V26 Carousel Engine, and V15–V21 Sovereign Deck.
- 🛡️ **Full-Stack Security & Schema Validation**: Express backend with Zod schema validation and lazy Gemini API SDK initialization (`@google/genai`).

---

## 📲 PWA Installation (Android & iOS)

### 🤖 Android (Chrome, Samsung Internet, Edge, Brave)
1. Open the app in your browser.
2. Tap the **"Install App"** button in the header, or tap browser menu **⋮** (three dots).
3. Select **"Install app"** or **"Add to Home screen"**.
4. Confirm **"Install"**. The app will appear in your app drawer and home screen as a standalone application.

### 🍏 iOS (iPhone & iPad Safari)
1. Open the application in **Apple Safari**.
2. Tap the **Share** button (box with an upward arrow) in the Safari bottom toolbar.
3. Scroll down the action sheet and tap **"Add to Home Screen"** (`+` icon).
4. Tap **"Add"** in the top-right corner.
5. Launch **IBD Studio** from your home screen with zero browser bars in full standalone mode.

### 💻 Desktop (Mac, Windows, Linux)
- In Chrome or Edge, click the **Install icon** in the browser address bar, or click **"Install App"** in the top navigation.

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v20+ or v22+
- npm v10+

### 1. Clone & Install
```bash
git clone https://github.com/anupamskm/ibd-universal-studio.git
cd ibd-universal-studio
npm install
```

### 2. Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```
Add your Gemini API Key in `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 3. Development Server
Start the development server with live Vite middleware:
```bash
npm run dev
```
The app will be accessible at: `http://localhost:3000`

### 4. Corpus Verification & Linting
Verify that all 54 sacred corpus files have zero text corruptions:
```bash
npm run check:corpus
npm run lint
```

### 5. Production Build
Compile both frontend client and backend Express server:
```bash
npm run build
npm start
```

---

## 📤 Publishing to GitHub

### Method A: Export via Google AI Studio (Easiest)
1. In the Google AI Studio top-right menu, open **Project Settings / Export**.
2. Click **"Export to GitHub"**.
3. Choose your target repository or let AI Studio create a new repository in your GitHub account.

### Method B: Manual Git Push via Terminal
If you cloned or downloaded the project code:
```bash
# 1. Initialize git (if not already initialized)
git init
git add .
git commit -m "feat: Initial release of IBD Universal Studio Suite with PWA"

# 2. Add your GitHub repository remote
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

# 3. Rename branch to main and push
git branch -M main
git push -u origin main
```

---

## 📂 Project Architecture

```
ibd-universal-studio/
├── public/                     # PWA Icons (192, 512, maskable, SVG, apple-touch)
│   ├── icon.svg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── pwa-maskable-512x512.png
│   └── apple-touch-icon.png
├── server/                     # Backend Validation & Shastra Iconography
│   ├── validation.ts           # Zod schema validation middleware
│   └── shastraValidator.ts    # Scriptural iconography checks
├── src/
│   ├── components/             # UI Views, Studios, PWA Install & Offline indicators
│   │   ├── PWAInstallButton.tsx
│   │   ├── PWAInstallModal.tsx
│   │   ├── OfflineIndicator.tsx
│   │   ├── GitHubPublishModal.tsx
│   │   ├── ShivMahamantraView.tsx
│   │   ├── SunderkandView.tsx
│   │   ├── BhagavadGitaView.tsx
│   │   └── ...
│   ├── data/                   # 54 Verified Sacred Texts & Suvichar Corpus
│   ├── hooks/                  # usePWAInstall, useOnlineStatus
│   ├── App.tsx                 # Main Application Container & Studio Navigation
│   └── main.tsx                # Entry Point
├── server.ts                   # Express Backend + Vite Dev Middleware + API Routes
├── vite.config.ts              # Vite + Tailwind + VitePWA Configuration
└── package.json                # Dependencies, Scripts, and Build Targets
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Made with devotion for Indian Bhakti Dhara (IBD).*
