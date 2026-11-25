import { DAILY_SHORTS_TEMPLATES, DEITY_CATEGORIES } from "../data/dailyShortsData";

export function generateDailyShortsHtmlApp(): string {
  const jsonTemplates = JSON.stringify(DAILY_SHORTS_TEMPLATES);
  const jsonCategories = JSON.stringify(DEITY_CATEGORIES);

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>IBD Daily Shorts Studio — All Deities (9:16)</title>
  <meta name="description" content="Sovereign Daily Devotional YouTube Shorts & Insta Reels Studio for All Hindu Deities. Ready-made 9:16 Prompts, Scripts & Sound Cues.">
  <meta name="theme-color" content="#0c0a09">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cinzel', 'serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            saffron: { 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
            gold: { 400: '#facc15', 500: '#eab308', 600: '#ca8a04' },
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
    .font-serif { font-family: 'Cinzel', serif; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes pulseGlow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
    .animate-glow { animation: pulseGlow 2.5s infinite; }
  </style>
</head>
<body class="bg-stone-950 text-stone-100 min-h-screen flex flex-col antialiased selection:bg-orange-500 selection:text-stone-950 pb-24">

  <!-- Top Sticky Navigation Bar -->
  <header class="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-orange-500/20 px-4 py-3 flex items-center justify-between shadow-lg">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-stone-950 font-black text-base shadow-md shadow-orange-500/20">
        🎬
      </div>
      <div>
        <div class="flex items-center gap-1.5">
          <h1 class="font-serif font-bold text-orange-100 text-sm tracking-wide leading-tight">IBD Daily Shorts Studio</h1>
          <span class="bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">ALL DEITIES</span>
        </div>
        <p class="text-[10px] text-amber-400/90 font-medium">Shiv • Hanuman • Ram • Krishna • Devi & All Sanatan Dharma</p>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <button onclick="copyCurrentFullProductionKit()" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer">
        <span>📋 Copy Full Kit</span>
      </button>
    </div>
  </header>

  <!-- Deity Category Carousel -->
  <div class="px-4 pt-3 pb-1">
    <div class="flex items-center justify-between text-xs text-stone-400 mb-1.5">
      <span class="text-orange-400 font-bold uppercase tracking-wider text-[10px]">Select Deity / Day of Week</span>
      <span id="activeDeityCount" class="text-[10px] text-stone-500">8 templates</span>
    </div>
    <div id="categoryPills" class="flex gap-2 overflow-x-auto no-scrollbar py-1"></div>
  </div>

  <!-- Search & Filter Bar -->
  <div class="px-4 py-1.5 flex gap-2">
    <div class="relative flex-1">
      <input 
        id="shortsSearch" 
        type="text" 
        placeholder="Search Deity, Story, Shloka, Mystery..." 
        oninput="filterShorts(this.value)"
        class="w-full bg-stone-900/90 border border-stone-800 focus:border-orange-500/60 rounded-xl px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 outline-none transition-all"
      />
    </div>
    <button onclick="pickRandomShorts()" class="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-orange-300 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform" title="Pick Random Daily Shorts Idea">
      <span>🎲 Random</span>
    </button>
  </div>

  <!-- Main Content Layout -->
  <main class="px-4 py-3 space-y-4 max-w-5xl mx-auto w-full flex-1">
    
    <!-- Active Deity Header Card -->
    <div class="bg-gradient-to-b from-stone-900/95 to-stone-950 border border-orange-500/30 rounded-2xl p-4 md:p-5 shadow-xl relative overflow-hidden">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span id="deityBadge" class="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-bold">MONDAY • SHIV</span>
            <span id="shortsDuration" class="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[10px] font-mono font-semibold">45 Seconds</span>
          </div>
          <h2 id="shortsTitle" class="font-serif font-bold text-orange-100 text-base md:text-lg leading-tight">The 400-Year Snow Secret of Kedarnath Mahadev</h2>
          <p id="shortsHindiTitle" class="text-xs text-stone-400 mt-0.5">भगवान शिव — केदारनाथ रहस्य</p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button onclick="copyMasterPrompt()" class="px-3 py-2 rounded-xl bg-stone-900 border border-orange-500/30 hover:border-orange-500/60 text-orange-300 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform">
            <span>🖼️ 9:16 AI Image Prompt</span>
          </button>
          <button onclick="copyMasterVideoPrompt()" class="px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform">
            <span>🎬 Gen-3 Video Prompt</span>
          </button>
        </div>
      </div>

      <!-- Hook & Viral Angle Banner -->
      <div class="mt-3.5 bg-orange-950/40 border border-orange-500/30 rounded-xl p-3 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1">
            🔥 3-Second Viral Hook Line
          </span>
          <button onclick="copyHookLine()" class="text-[10px] text-orange-300 hover:text-white font-bold underline">Copy Hook</button>
        </div>
        <p id="hookLineEnglish" class="text-xs md:text-sm font-semibold text-orange-100">"Did you know Kedarnath temple stayed buried under snow for 400 years with ZERO damage?"</p>
        <p id="hookLineHindi" class="text-xs text-stone-300 font-medium">"क्या आप जानते हैं कि केदारनाथ मंदिर 400 साल तक बर्फ के नीचे दबा रहा और बाल भी बांका नहीं हुआ?"</p>
      </div>
    </div>

    <!-- 4-Step Production Timeline Grid (Hook, Build-up, Climax, CTA) -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-serif font-bold text-orange-200 text-sm flex items-center gap-2">
          <span>⏱️ 4-Part 9:16 Shorts Timeline Breakdown</span>
        </h3>
        <span class="text-[11px] text-stone-400 font-mono">Tap any step to copy prompt & voiceover</span>
      </div>

      <div id="timelineStepsList" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
    </div>

    <!-- Sacred Shloka & Pronunciation Studio -->
    <div class="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 space-y-2.5 shadow-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-base">🕉️</span>
          <div>
            <h4 class="font-serif font-bold text-amber-100 text-xs md:text-sm">Sacred Vedic Shloka / Chant (Included in Shorts)</h4>
            <p class="text-[10px] text-stone-400">Add to subtitle captions or vocal intro</p>
          </div>
        </div>
        <button onclick="copyShloka()" class="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all">
          <span>Copy Shloka</span>
        </button>
      </div>

      <div class="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-1.5">
        <p id="shlokaSanskrit" class="font-serif text-amber-200 text-xs md:text-sm font-bold leading-relaxed">"ॐ नमः शिवाय शुभं शुभं कुरू कुरू शिवाय नमः ॐ"</p>
        <p id="shlokaEnglish" class="font-mono text-[11px] text-stone-400">Om Namah Shivaya Shubham Shubham Kuru Kuru Shivaya Namah Om</p>
        <div class="border-t border-stone-800/80 pt-1.5 mt-1 text-[11px] text-stone-300">
          <strong class="text-orange-400">Meaning:</strong> <span id="shlokaMeaning">हे परम कल्याणकारी भगवान शिव, हमारे जीवन में सर्वदा शुभ और शांति प्रदान करें।</span>
        </div>
      </div>
    </div>

    <!-- Sound Design, BGM & Viral SEO Blueprint -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- BGM & Sound Cues -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-2 shadow-lg">
        <div class="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
          <span>🎵 BGM & Sound FX Directives</span>
        </div>
        <p id="bgmText" class="text-xs text-stone-300 leading-relaxed bg-stone-950 p-3 rounded-xl border border-stone-800">
          Deep Himalayan singing bowls + slow resonant Damru heartbeat transitioning into intense Shiv Tandav drop (115 BPM).
        </p>
        <div class="space-y-1 pt-1">
          <div class="text-[10px] text-stone-400 font-bold uppercase tracking-wider">FX Cues:</div>
          <div id="soundFxList" class="flex flex-wrap gap-1.5"></div>
        </div>
      </div>

      <!-- Viral Caption & Hashtags -->
      <div class="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-2 shadow-lg">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <span>🏷️ Viral Title, Captions & Tags</span>
          </span>
          <button onclick="copyHashtags()" class="text-[10px] text-amber-300 hover:text-white font-bold underline">Copy Tags</button>
        </div>
        <div id="captionAndHashtagsText" class="bg-stone-950 p-3 rounded-xl border border-stone-800 font-mono text-[11px] text-stone-300 leading-relaxed h-28 overflow-y-auto whitespace-pre-wrap select-all cursor-pointer" onclick="copyHashtags()"></div>
      </div>
    </div>
  </main>

  <!-- Floating Toast Notification -->
  <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-full shadow-2xl transition-all duration-300 opacity-0 pointer-events-none transform translate-y-3 flex items-center gap-2">
    <span>✨ Copied to clipboard!</span>
  </div>

  <script>
    const TEMPLATES = ${jsonTemplates};
    const CATEGORIES = ${jsonCategories};

    let currentDeityCategory = "ALL";
    let activeShortsIndex = 0;
    let filteredTemplates = [...TEMPLATES];

    function init() {
      renderCategories();
      applyFilter();
    }

    function renderCategories() {
      const container = document.getElementById("categoryPills");
      container.innerHTML = CATEGORIES.map(cat => {
        const isActive = cat.id === currentDeityCategory;
        return \`
          <button 
            onclick="selectCategory('\${cat.id}')"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 \${
              isActive 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md font-bold' 
                : 'bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300'
            }"
          >
            <span>\${cat.icon}</span>
            <span>\${cat.label}</span>
          </button>
        \`;
      }).join('');
    }

    function selectCategory(catId) {
      currentDeityCategory = catId;
      renderCategories();
      applyFilter();
    }

    function filterShorts(searchTerm) {
      applyFilter(searchTerm);
    }

    function applyFilter(search = "") {
      const query = (search || document.getElementById("shortsSearch").value || "").toLowerCase();
      filteredTemplates = TEMPLATES.filter(item => {
        let matchesCategory = true;
        if (currentDeityCategory === "ALL" || currentDeityCategory === "IBD") {
          matchesCategory = true;
        } else if (currentDeityCategory === "ASP") {
          matchesCategory = item.category === "SHIV" || item.category === "DEVI" || item.category === "BHAIRAVA";
        } else if (currentDeityCategory === "RKM") {
          matchesCategory = item.category === "HANUMAN" || item.category === "RAM";
        } else {
          matchesCategory = item.category === currentDeityCategory;
        }

        const matchesSearch = !query || 
          item.title.toLowerCase().includes(query) ||
          item.deityName.toLowerCase().includes(query) ||
          item.hindiName.toLowerCase().includes(query) ||
          item.hookLine.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });

      if (filteredTemplates.length === 0) {
        filteredTemplates = TEMPLATES;
      }
      activeShortsIndex = 0;
      document.getElementById("activeDeityCount").innerText = \`\${filteredTemplates.length} shorts ready\`;
      renderActiveShorts();
    }

    function pickRandomShorts() {
      activeShortsIndex = Math.floor(Math.random() * filteredTemplates.length);
      renderActiveShorts();
      showToast("🎲 Loaded Random Daily Shorts Template!");
    }

    function renderActiveShorts() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];

      document.getElementById("deityBadge").innerText = \`\${shorts.dayOfWeek.toUpperCase()} • \${shorts.category}\`;
      document.getElementById("shortsDuration").innerText = shorts.duration;
      document.getElementById("shortsTitle").innerText = shorts.title;
      document.getElementById("shortsHindiTitle").innerText = shorts.hindiName;

      document.getElementById("hookLineEnglish").innerText = \`"\${shorts.hookLine}"\`;
      document.getElementById("hookLineHindi").innerText = \`"\${shorts.hookLineHindi}"\`;

      // Render timeline steps
      const stepsContainer = document.getElementById("timelineStepsList");
      stepsContainer.innerHTML = shorts.scriptBreakdown.map((step, idx) => {
        return \`
          <div class="bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-orange-500/40 rounded-xl p-3.5 space-y-2.5 transition-all shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 font-mono font-bold text-xs flex items-center justify-center">0\${idx+1}</span>
                <span class="text-xs font-bold text-orange-200">\${step.section}</span>
              </div>
              <span class="text-[10px] font-mono text-amber-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">\${step.timestamp}</span>
            </div>

            <!-- Voiceover Box -->
            <div class="bg-stone-950/80 p-2.5 rounded-lg border border-stone-800 space-y-1">
              <div class="text-[9px] font-bold text-stone-400 uppercase tracking-wider">🎙️ Voiceover (Hindi & English)</div>
              <p class="text-xs font-medium text-amber-100">"\${step.voiceoverHindi}"</p>
              <p class="text-[11px] text-stone-400 italic">"\${step.voiceoverEnglish}"</p>
            </div>

            <!-- AI Visual Prompt -->
            <div class="space-y-1">
              <div class="flex items-center justify-between text-[9px] font-mono text-stone-400">
                <span>9:16 MIDJOURNEY / FLUX PROMPT</span>
                <button onclick="copyText('\${escapeHtml(step.aiPrompt9x16)}')" class="text-orange-400 hover:text-white font-bold">Copy</button>
              </div>
              <p class="bg-stone-950 p-2 rounded-lg font-mono text-[10px] text-stone-300 leading-relaxed border border-stone-800 select-all">\${step.aiPrompt9x16}</p>
            </div>

            <!-- Camera Direction -->
            <div class="text-[10px] text-stone-400 flex items-center gap-1.5">
              <span class="text-orange-400 font-bold">🎥 Camera:</span>
              <span class="truncate">\${step.videoCameraMovement}</span>
            </div>
          </div>
        \`;
      }).join('');

      // Shloka
      document.getElementById("shlokaSanskrit").innerText = \`"\${shorts.sanskritShloka.text}"\`;
      document.getElementById("shlokaEnglish").innerText = shorts.sanskritShloka.englishTransliteration;
      document.getElementById("shlokaMeaning").innerText = shorts.sanskritShloka.meaningHindi;

      // Audio & BGM
      document.getElementById("bgmText").innerText = shorts.bgmRecommendation;
      document.getElementById("soundFxList").innerHTML = shorts.soundFxCues.map(fx => \`
        <span class="px-2 py-1 rounded bg-stone-950 border border-stone-800 text-[10px] text-stone-300 font-mono">\${fx}</span>
      \`).join('');

      // Hashtags
      document.getElementById("captionAndHashtagsText").innerText = shorts.captionAndHashtags;
    }

    function escapeHtml(str) {
      return str.replace(/'/g, "\\\\'").replace(/"/g, '&quot;');
    }

    function copyText(text) {
      navigator.clipboard.writeText(text);
      if (navigator.vibrate) navigator.vibrate(20);
      showToast("✨ Copied to clipboard!");
    }

    function copyMasterPrompt() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];
      copyText(shorts.masterImagePrompt9x16);
    }

    function copyMasterVideoPrompt() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];
      copyText(shorts.masterVideoPromptGen3);
    }

    function copyHookLine() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];
      copyText(\`\${shorts.hookLineHindi}\\n\${shorts.hookLine}\`);
    }

    function copyShloka() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];
      copyText(\`\${shorts.sanskritShloka.text}\\n\${shorts.sanskritShloka.englishTransliteration}\\nMeaning: \${shorts.sanskritShloka.meaningHindi}\`);
    }

    function copyHashtags() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];
      copyText(shorts.captionAndHashtags);
    }

    function copyCurrentFullProductionKit() {
      const shorts = filteredTemplates[activeShortsIndex] || TEMPLATES[0];
      const fullKit = \`=== IBD DAILY SHORTS PRODUCTION KIT (9:16) ===
DEITY: \${shorts.deityName} (\${shorts.hindiName})
TITLE: \${shorts.title}
DURATION: \${shorts.duration} | DAY: \${shorts.dayOfWeek}

--- 3-SECOND VIRAL HOOK ---
Hindi: \${shorts.hookLineHindi}
English: \${shorts.hookLine}

--- SACRED SHLOKA ---
\${shorts.sanskritShloka.text}
(\${shorts.sanskritShloka.englishTransliteration})
Meaning: \${shorts.sanskritShloka.meaningHindi}

--- 4-STEP TIMELINE & SCRIPT ---
\${shorts.scriptBreakdown.map((s, i) => \`[\${s.timestamp}] \${s.section.toUpperCase()}
VO Hindi: \${s.voiceoverHindi}
VO English: \${s.voiceoverEnglish}
Camera: \${s.videoCameraMovement}
9:16 AI Prompt: \${s.aiPrompt9x16}\`).join('\\n\\n')}

--- MASTER 9:16 IMAGE PROMPT ---
\${shorts.masterImagePrompt9x16}

--- MASTER VIDEO PROMPT (RUNWAY / LUMA / KLING) ---
\${shorts.masterVideoPromptGen3}

--- BGM & AUDIO BLUEPRINT ---
\${shorts.bgmRecommendation}
FX Cues: \${shorts.soundFxCues.join(', ')}

--- VIRAL TITLE & HASHTAGS ---
\${shorts.captionAndHashtags}
\`;
      copyText(fullKit);
    }

    function showToast(msg) {
      const toast = document.getElementById("toast");
      toast.innerText = msg;
      toast.classList.remove("opacity-0", "translate-y-3");
      toast.classList.add("opacity-100", "translate-y-0");
      setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "translate-y-3");
      }, 2500);
    }

    document.addEventListener("DOMContentLoaded", init);
  </script>
</body>
</html>`;
}
