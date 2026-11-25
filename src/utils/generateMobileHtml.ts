import { TEMPLE_SANCTUARIES } from "../data/templeSanctuaryData";

export function generateMobileHtmlApp(): string {
  const dataJson = JSON.stringify(TEMPLE_SANCTUARIES);

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>IBD Temple Sanctuary Mobile Suite</title>
  <meta name="description" content="10-Step Sovereign Devotional Pilgrimage & AI Prompt Studio">
  <meta name="theme-color" content="#0c0a09">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            serif: ['Cinzel', 'serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif'],
          },
          colors: {
            amber: {
              400: '#fbbf24',
              500: '#f59e0b',
              600: '#d97706',
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    .font-serif {
      font-family: 'Cinzel', serif;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
</head>
<body class="bg-stone-950 text-stone-100 min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-stone-950 pb-28">

  <!-- Mobile Top Header Bar -->
  <header class="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-black text-sm shadow-md">
        🛕
      </div>
      <div>
        <h1 class="font-serif font-bold text-amber-100 text-sm tracking-wide leading-tight">IBD Temple Sanctuary</h1>
        <p class="text-[10px] text-amber-400/80 font-medium">10-Threshold Pilgrimage Studio</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="copyCurrentFullDeck()" class="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shadow-sm">
        <span>📋 Deck</span>
      </button>
    </div>
  </header>

  <!-- Filter & Search Bar -->
  <div class="px-4 pt-3 pb-1 space-y-2.5">
    <div class="relative">
      <input 
        id="searchInput" 
        type="text" 
        placeholder="Search Dham, Deity, or City..." 
        oninput="handleSearch(this.value)"
        class="w-full bg-stone-900/90 border border-stone-800 focus:border-amber-500/60 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 outline-none transition-all shadow-inner"
      />
    </div>

    <!-- Category Pills Carousel -->
    <div id="filterPills" class="flex gap-2 overflow-x-auto no-scrollbar py-1">
      <button onclick="setFilter('ALL')" data-filter="ALL" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-amber-500 text-stone-950">All Dhams</button>
      <button onclick="setFilter('IBD')" data-filter="IBD" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">🔱 IBD Deck</button>
      <button onclick="setFilter('ASP')" data-filter="ASP" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">🕉️ ASP Series (Shiva & Devi)</button>
      <button onclick="setFilter('RKM')" data-filter="RKM" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">🚩 RKM Series (Hanuman & Ram)</button>
      <button onclick="setFilter('SHIV')" data-filter="SHIV" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">Shiv Parivar</button>
      <button onclick="setFilter('RAM')" data-filter="RAM" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">Ram & Janakpur</button>
      <button onclick="setFilter('HANUMAN')" data-filter="HANUMAN" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">Hanuman Garhi</button>
      <button onclick="setFilter('KRISHNA')" data-filter="KRISHNA" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">Krishna & Khatu</button>
      <button onclick="setFilter('DEVI')" data-filter="DEVI" class="filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400">Shaktipeeths</button>
    </div>
  </div>

  <!-- Dham Selector Carousel -->
  <div class="px-4 py-2">
    <div id="templeCardsList" class="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
      <!-- Injected by JS -->
    </div>
  </div>

  <!-- Active Sanctuary Hero Header -->
  <main class="px-4 space-y-4 flex-1">
    <div class="bg-gradient-to-b from-stone-900/90 to-stone-950 border border-amber-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="flex items-center gap-1.5 mb-1">
            <span id="templeBadge" class="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">IBD</span>
            <span id="templeRegion" class="text-[11px] text-stone-400 truncate">Kashi & Somnath</span>
          </div>
          <h2 id="templeName" class="font-serif font-bold text-amber-100 text-base leading-snug">IBD Shiv Mahamandir</h2>
          <p id="templeHindi" class="text-xs text-stone-400 font-sans mt-0.5">श्री काशी विश्वनाथ महामंदिर</p>
        </div>
      </div>
      
      <p id="templeDeity" class="text-[11px] text-stone-300 mt-2 line-clamp-2">
        <strong class="text-amber-400">Deity:</strong> Param-Shiva Jyotirlinga
      </p>

      <!-- 10 Step Horizontal Slider -->
      <div class="mt-3.5 pt-3 border-t border-stone-800">
        <div class="flex items-center justify-between text-[11px] text-stone-400 mb-2">
          <span class="text-amber-400 font-bold uppercase tracking-wider">Pilgrimage Arc</span>
          <span id="stepIndicator">Step 1 of 10</span>
        </div>
        <div id="stepButtonsGrid" class="grid grid-cols-5 gap-1.5">
          <!-- 10 Buttons Injected by JS -->
        </div>
      </div>
    </div>

    <!-- Active Step Spotlight Card -->
    <div id="activeStepCard" class="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-4 space-y-3.5 shadow-lg">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-2.5">
          <div id="activeStepBadge" class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-xs shrink-0">
            01
          </div>
          <div>
            <span id="activeStepLocation" class="text-[10px] text-amber-400/90 font-semibold uppercase tracking-wider block">Gateway</span>
            <h3 id="activeStepTitle" class="font-serif font-bold text-amber-100 text-sm leading-tight">Grand Torana Mahadwar</h3>
            <p id="activeStepHindi" class="text-[11px] text-stone-400">भव्य सिंह द्वार एवं तोरण आगमन</p>
          </div>
        </div>
        <button onclick="copyCurrentStepPrompt()" class="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform shrink-0">
          <span id="copyStepBtnText">Copy Prompt</span>
        </button>
      </div>

      <!-- Sanskrit Shloka Box -->
      <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 space-y-1">
        <div class="text-[10px] font-bold text-amber-400 uppercase tracking-wider">🕉️ Sacred Shloka / Chant</div>
        <p id="activeStepShloka" class="font-serif text-amber-100 text-xs italic leading-relaxed">"ॐ नमः शिवाय शुभं शुभं कुरू कुरू शिवाय नमः ॐ"</p>
        <p id="activeStepRitual" class="text-[11px] text-stone-300 mt-1"><strong class="text-amber-400">Ritual:</strong> Outer threshold bow of humility.</p>
      </div>

      <!-- Devotee Inner Experience -->
      <div class="bg-stone-950/60 border border-stone-800 rounded-xl p-3 text-[11px] text-stone-300 space-y-1">
        <div class="text-[10px] font-bold text-stone-400 uppercase tracking-wider">👁️ Inner Devotee State</div>
        <p id="activeStepDevotee" class="leading-relaxed">The towering stone spire fills the horizon with supreme peace.</p>
        <div id="activeStepAtmosphere" class="text-[10px] text-amber-400/80 pt-1">🎵 Damru rhythm, wet clay and bilva leaves</div>
      </div>

      <!-- Midjourney / Flux Prompt Box -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-[10px] font-mono text-amber-400">
          <span>MIDJOURNEY / FLUX PROMPT (9:16)</span>
          <span class="text-stone-500">65mm • 8K</span>
        </div>
        <div id="activeStepPrompt" onclick="copyCurrentStepPrompt()" class="bg-stone-950 p-3 rounded-xl border border-stone-800 font-mono text-[11px] text-stone-200 leading-relaxed active:bg-stone-900 transition-colors select-all cursor-pointer">
          <!-- Prompt text injected by JS -->
        </div>
      </div>

      <!-- Optics & Lighting Pills -->
      <div class="grid grid-cols-1 gap-1.5 text-[10px]">
        <div class="bg-stone-950 p-2 rounded-lg border border-stone-800/80 flex items-center gap-1.5">
          <span class="text-amber-400 font-bold">📷 Optics:</span>
          <span id="activeStepOptics" class="text-stone-300 truncate">ARRI Alexa LF 65mm, 24mm Ultra-Wide</span>
        </div>
        <div class="bg-stone-950 p-2 rounded-lg border border-stone-800/80 flex items-center gap-1.5">
          <span class="text-amber-400 font-bold">🔥 Lighting:</span>
          <span id="activeStepLighting" class="text-stone-300 truncate">Twilight golden hour sunbeams</span>
        </div>
      </div>

      <!-- Step Navigation Buttons -->
      <div class="flex items-center justify-between pt-1">
        <button id="prevStepBtn" onclick="prevStep()" class="px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold active:scale-95 transition-all">
          ← Prev
        </button>
        <span id="stepCounterBottom" class="text-xs text-stone-500 font-medium">01 / 10</span>
        <button id="nextStepBtn" onclick="nextStep()" class="px-3.5 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold active:scale-95 transition-all">
          Next →
        </button>
      </div>
    </div>
  </main>

  <!-- Toast Notification Popup -->
  <div id="toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-stone-950 font-bold text-xs px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 opacity-0 pointer-events-none transform translate-y-3">
    Prompt Copied!
  </div>

  <script>
    const temples = ${dataJson};
    let currentFilter = "ALL";
    let currentTempleId = "shiv-mahamandir";
    let currentStepNum = 1;

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
      toast.classList.add('opacity-100', 'translate-y-0');
      if (navigator.vibrate) navigator.vibrate(40);
      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
        toast.classList.remove('opacity-100', 'translate-y-0');
      }, 2000);
    }

    function renderTempleCards() {
      const list = document.getElementById('templeCardsList');
      const filtered = temples.filter(t => {
        if (currentFilter === "ALL") return true;
        if (currentFilter === "IBD") return t.brandTag === "IBD";
        if (currentFilter === "ASP") return t.brandTag === "ASP" || t.id.includes("shiv") || t.id.includes("shaktipeeth");
        if (currentFilter === "RKM") return t.brandTag === "RKM" || t.id.includes("hanuman") || t.id.includes("ram");
        if (currentFilter === "SHIV") return t.id.includes("shiv");
        if (currentFilter === "RAM") return t.id.includes("ram") || t.id.includes("janakpur") || t.id.includes("chitrakoot");
        if (currentFilter === "HANUMAN") return t.id.includes("hanuman");
        if (currentFilter === "KRISHNA") return t.id.includes("shyam") || t.id.includes("nathdwara") || t.id.includes("prem") || t.id.includes("sanwariya");
        if (currentFilter === "DEVI") return t.id.includes("shaktipeeth") || t.id.includes("janakpur");
        return true;
      });

      list.innerHTML = filtered.map(t => {
        const isSel = t.id === currentTempleId;
        return \`
          <button onclick="selectTemple('\${t.id}')" class="shrink-0 w-36 text-left p-2.5 rounded-xl border transition-all \${isSel ? 'bg-amber-500/20 border-amber-500 shadow-md ring-1 ring-amber-400' : 'bg-stone-900/60 border-stone-800 text-stone-400'}">
            <div class="flex items-center justify-between text-[9px] mb-0.5">
              <span class="font-bold px-1 rounded \${isSel ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}">\${t.brandTag}</span>
              <span class="text-stone-500">10 Steps</span>
            </div>
            <div class="font-serif text-[11px] font-bold line-clamp-1 \${isSel ? 'text-amber-200' : 'text-stone-300'}">\${t.name}</div>
            <div class="text-[9px] text-stone-400 line-clamp-1">\${t.hindiName}</div>
          </button>
        \`;
      }).join('');
    }

    function selectTemple(id) {
      currentTempleId = id;
      currentStepNum = 1;
      renderTempleCards();
      renderActiveTempleAndStep();
    }

    function setFilter(f) {
      currentFilter = f;
      document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === f) {
          btn.className = "filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap bg-amber-500 text-stone-950";
        } else {
          btn.className = "filter-btn px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-stone-900 border border-stone-800 text-stone-400";
        }
      });
      renderTempleCards();
    }

    function handleSearch(val) {
      const q = val.toLowerCase().trim();
      if (!q) {
        setFilter("ALL");
        return;
      }
      const matched = temples.find(t => 
        t.name.toLowerCase().includes(q) || 
        t.hindiName.toLowerCase().includes(q) || 
        t.deity.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q)
      );
      if (matched) {
        selectTemple(matched.id);
      }
    }

    function renderActiveTempleAndStep() {
      const temple = temples.find(t => t.id === currentTempleId) || temples[0];
      const step = temple.steps.find(s => s.stepNumber === currentStepNum) || temple.steps[0];

      document.getElementById('templeBadge').innerText = temple.brandTag;
      document.getElementById('templeRegion').innerText = temple.region;
      document.getElementById('templeName').innerText = temple.name;
      document.getElementById('templeHindi').innerText = temple.hindiName;
      document.getElementById('templeDeity').innerHTML = \`<strong class="text-amber-400">Deity:</strong> \${temple.deity} • <strong class="text-amber-400">Style:</strong> \${temple.architecturalStyle}\`;
      document.getElementById('stepIndicator').innerText = \`Step \${step.stepNumber} of 10\`;

      // Render 10 step buttons
      const grid = document.getElementById('stepButtonsGrid');
      grid.innerHTML = temple.steps.map(s => {
        const isCur = s.stepNumber === currentStepNum;
        return \`
          <button onclick="goToStep(\${s.stepNumber})" class="py-1.5 rounded-lg text-center text-[10px] font-bold border transition-all \${isCur ? 'bg-amber-500 text-stone-950 border-amber-400 shadow' : 'bg-stone-950 border-stone-800 text-stone-400'}">
            0\${s.stepNumber}
          </button>
        \`;
      }).join('');

      // Update step details
      document.getElementById('activeStepBadge').innerText = step.stepNumber < 10 ? \`0\${step.stepNumber}\` : step.stepNumber;
      document.getElementById('activeStepLocation').innerText = step.locationArea;
      document.getElementById('activeStepTitle').innerText = step.stageName;
      document.getElementById('activeStepHindi').innerText = step.stageHindi;
      document.getElementById('activeStepShloka').innerText = \`"\${step.shlokaOrChant}"\`;
      document.getElementById('activeStepRitual').innerHTML = \`<strong class="text-amber-400">Ritual:</strong> \${step.ritualSignificance}\`;
      document.getElementById('activeStepDevotee').innerText = step.devoteeExperience;
      document.getElementById('activeStepAtmosphere').innerText = \`🎵 \${step.sensoryAtmosphere}\`;
      document.getElementById('activeStepPrompt').innerText = step.masterPrompt;
      document.getElementById('activeStepOptics').innerText = step.cameraLens;
      document.getElementById('activeStepLighting').innerText = step.lightingDramaturgy;
      document.getElementById('stepCounterBottom').innerText = \`0\${step.stepNumber} / 10\`;

      document.getElementById('prevStepBtn').disabled = currentStepNum === 1;
      document.getElementById('nextStepBtn').disabled = currentStepNum === 10;
    }

    function goToStep(n) {
      currentStepNum = n;
      renderActiveTempleAndStep();
    }

    function prevStep() {
      if (currentStepNum > 1) {
        currentStepNum--;
        renderActiveTempleAndStep();
      }
    }

    function nextStep() {
      if (currentStepNum < 10) {
        currentStepNum++;
        renderActiveTempleAndStep();
      }
    }

    function copyCurrentStepPrompt() {
      const temple = temples.find(t => t.id === currentTempleId) || temples[0];
      const step = temple.steps.find(s => s.stepNumber === currentStepNum) || temple.steps[0];
      navigator.clipboard.writeText(step.masterPrompt);
      showToast(\`Step \${step.stepNumber} Prompt Copied!\`);
    }

    function copyCurrentFullDeck() {
      const temple = temples.find(t => t.id === currentTempleId) || temples[0];
      const text = \`=== \${temple.name.toUpperCase()} (\${temple.hindiName}) ===\\n\` +
        \`Architecture: \${temple.architecturalStyle}\\n\` +
        \`Palette: \${temple.colorPalette}\\n\\n\` +
        temple.steps.map(s => \`[STEP \${s.stepNumber}/10: \${s.stageName} - \${s.stageHindi}]\\nLocation: \${s.locationArea}\\nRitual: \${s.ritualSignificance}\\nShloka: \${s.shlokaOrChant}\\nDevotee: \${s.devoteeExperience}\\n\\nPROMPT:\\n\${s.masterPrompt}\`).join('\\n\\n--------------------------------\\n\\n');
      
      navigator.clipboard.writeText(text);
      showToast(\`Full 10-Step \${temple.name} Deck Copied!\`);
    }

    // Initialize on load
    renderTempleCards();
    renderActiveTempleAndStep();
  </script>
</body>
</html>`;
}
