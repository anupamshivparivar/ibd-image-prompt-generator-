import { AspectRatio, TargetEngine } from "../types";

export interface SamplerSpec {
  id: string;
  sampler: string;
  speed: "Instant" | "Very Fast" | "Fast" | "Medium" | "Slow" | "Very Slow";
  detail: "Low" | "Medium" | "High" | "Very High" | "Highest" | "Soft" | "Clean" | "Sharp" | "Smooth";
  useFor: string;
  recommendedSteps: string;
  cfgScale: string;
  comfyName: string;
  scheduler: string;
  speedRating: number; // 1-5 (5 = fastest)
  detailRating: number; // 1-5 (5 = highest)
  tier: "Production" | "Hero" | "Artistic" | "Draft";
}

export const SAMPLER_SPECS: SamplerSpec[] = [
  {
    id: "dpmpp-2m-karras",
    sampler: "DPM++ 2M Karras",
    speed: "Medium",
    detail: "High",
    useFor: "Default — all finals",
    recommendedSteps: "28–35",
    cfgScale: "6.5–7.5",
    comfyName: "dpmpp_2m",
    scheduler: "karras",
    speedRating: 3,
    detailRating: 4,
    tier: "Production",
  },
  {
    id: "dpmpp-sde-karras",
    sampler: "DPM++ SDE Karras",
    speed: "Slow",
    detail: "Very High",
    useFor: "Photorealistic stone / skin / fabric",
    recommendedSteps: "30–40",
    cfgScale: "6.0–7.5",
    comfyName: "dpmpp_sde",
    scheduler: "karras",
    speedRating: 2,
    detailRating: 5,
    tier: "Hero",
  },
  {
    id: "dpmpp-3m-sde-karras",
    sampler: "DPM++ 3M SDE Karras",
    speed: "Very Slow",
    detail: "Highest",
    useFor: "8K hero",
    recommendedSteps: "35–50",
    cfgScale: "5.5–7.0",
    comfyName: "dpmpp_3m_sde",
    scheduler: "karras",
    speedRating: 1,
    detailRating: 5,
    tier: "Hero",
  },
  {
    id: "euler-a",
    sampler: "Euler a",
    speed: "Fast",
    detail: "Soft",
    useFor: "Romantic / Divine Calm",
    recommendedSteps: "22–30",
    cfgScale: "6.5–8.0",
    comfyName: "euler_ancestral",
    scheduler: "normal",
    speedRating: 4,
    detailRating: 3,
    tier: "Artistic",
  },
  {
    id: "euler",
    sampler: "Euler",
    speed: "Medium",
    detail: "Clean",
    useFor: "Stable portraits",
    recommendedSteps: "25–32",
    cfgScale: "6.5–7.5",
    comfyName: "euler",
    scheduler: "normal",
    speedRating: 3,
    detailRating: 4,
    tier: "Production",
  },
  {
    id: "heun",
    sampler: "Heun",
    speed: "Very Slow",
    detail: "Very High",
    useFor: "Hero close-up",
    recommendedSteps: "30–42",
    cfgScale: "6.0–7.5",
    comfyName: "heun",
    scheduler: "karras",
    speedRating: 1,
    detailRating: 5,
    tier: "Hero",
  },
  {
    id: "unipc",
    sampler: "UniPC",
    speed: "Very Fast",
    detail: "Medium",
    useFor: "Quick tests",
    recommendedSteps: "12–18",
    cfgScale: "6.0–7.5",
    comfyName: "uni_pc",
    scheduler: "normal",
    speedRating: 5,
    detailRating: 3,
    tier: "Draft",
  },
  {
    id: "ddim",
    sampler: "DDIM",
    speed: "Fast",
    detail: "Sharp",
    useFor: "Quick previews",
    recommendedSteps: "18–25",
    cfgScale: "7.0–8.5",
    comfyName: "ddim",
    scheduler: "ddim_uniform",
    speedRating: 4,
    detailRating: 3,
    tier: "Draft",
  },
  {
    id: "lms-karras",
    sampler: "LMS Karras",
    speed: "Medium",
    detail: "Smooth",
    useFor: "Sky / sunset / Ganga",
    recommendedSteps: "25–35",
    cfgScale: "6.5–7.5",
    comfyName: "lms",
    scheduler: "karras",
    speedRating: 3,
    detailRating: 4,
    tier: "Artistic",
  },
  {
    id: "lcm-turbo",
    sampler: "LCM / Turbo",
    speed: "Instant",
    detail: "Low",
    useFor: "Drafts only",
    recommendedSteps: "4–8",
    cfgScale: "1.5–2.5",
    comfyName: "lcm",
    scheduler: "sgm_uniform",
    speedRating: 5,
    detailRating: 2,
    tier: "Draft",
  },
];

export type CinemaCategory =
  | "OTT & Broadcast"
  | "Directors & Cinematographers"
  | "AI & Poster Engines";

export interface CinemaPlatformProfile {
  id: string;
  name: string;
  shortName: string;
  category: CinemaCategory;
  badge: string;
  tagline: string;
  cameraAndOptics: string;
  lightingAndColor: string;
  promptInject: string;
  palette: { name: string; hex: string }[];
  linkedBestOutput: {
    sampler: string;
    steps: number;
    cfg: number;
    targetEngine: TargetEngine;
    aspectRatio: AspectRatio;
    rationale: string;
  };
  externalOutputLink: {
    label: string;
    url: string;
    tip: string;
  };
}

export const CINEMA_PLATFORM_PROFILES: CinemaPlatformProfile[] = [
  {
    id: "apple-tv-plus",
    name: "Apple TV+ Prestige 4K HDR",
    shortName: "Apple TV+",
    category: "OTT & Broadcast",
    badge: "4K Dolby Vision",
    tagline: "Ultra-clean large-format naturalism, razor-sharp optics & pristine dynamic range",
    cameraAndOptics: "ARRI Alexa 65 / Sony VENICE 2 • Panavision Sphero 65mm T1.5, zero chromatic aberration",
    lightingAndColor: "Clean architectural daylight, soft sculpted key light, balanced Dolby Vision HDR highlights, obsidian-slate shadow floor",
    promptInject:
      "Apple TV+ prestige original series cinematography, ARRI Alexa 65 4K Dolby Vision HDR aesthetic, razor-sharp 65mm large format optics, pristine micro-contrast, immaculate highlight retention, restrained luxury color grading",
    palette: [
      { name: "Obsidian Slate", hex: "#0F172A" },
      { name: "Titanium Silver", hex: "#CBD5E1" },
      { name: "Champagne Amber", hex: "#E2B04A" },
      { name: "Deep Sapphire", hex: "#1E3A8A" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ 3M SDE Karras",
      steps: 40,
      cfg: 6.0,
      targetEngine: "Flux 1.1 Pro",
      aspectRatio: "21:9",
      rationale: "DPM++ 3M SDE Karras delivers highest 8K hero fidelity with Apple TV+ clean tonal roll-off.",
    },
    externalOutputLink: {
      label: "Open Flux 1.1 Pro",
      url: "https://blackforestlabs.ai/",
      tip: "Best for ultra-clean Apple TV+ HDR naturalism & sharp skin/architecture.",
    },
  },
  {
    id: "netflix-prestige",
    name: "Netflix Original Cinema & Key Art",
    shortName: "Netflix",
    category: "OTT & Broadcast",
    badge: "OTT Blockbuster",
    tagline: "High-contrast theatrical drama, rich warm shadows & streaming poster impact",
    cameraAndOptics: "RED V-Raptor 8K VV • Cooke Anamorphic /i Full Frame Plus 40mm, oval bokeh",
    lightingAndColor: "Dramatic chiaroscuro key, rich crimson-amber tungsten highlights, deep theatrical shadow separation",
    promptInject:
      "Netflix Original prestige cinema look, RED V-Raptor 8K VV with Cooke Anamorphic lenses, dramatic chiaroscuro rim lighting, rich jewel-toned shadows, high-CTR streaming key art composition, theatrical Dolby Atmos atmosphere",
    palette: [
      { name: "Netflix Crimson", hex: "#E50914" },
      { name: "Velvet Obsidian", hex: "#141414" },
      { name: "Tungsten Gold", hex: "#F59E0B" },
      { name: "Royal Indigo", hex: "#312E81" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ 2M Karras",
      steps: 32,
      cfg: 7.0,
      targetEngine: "Midjourney v6.1",
      aspectRatio: "16:9",
      rationale: "DPM++ 2M Karras balances crisp poster drama with reliable theatrical framing.",
    },
    externalOutputLink: {
      label: "Open Midjourney",
      url: "https://www.midjourney.com/imagine",
      tip: "Ideal for bold Netflix theatrical key art and dramatic anamorphic lighting.",
    },
  },
  {
    id: "hbo-prestige",
    name: "HBO Prestige Cinema & Mythic Drama",
    shortName: "HBO Prestige",
    category: "OTT & Broadcast",
    badge: "Gritty Royal HDR",
    tagline: "Fierce mythic gravitas, stormy moody chiaroscuro & tactile weathered stone/metal",
    cameraAndOptics: "ARRI Alexa 35 / Panavision Primo 70 Anamorphic • Deep atmospheric contrast and tactile lens texture",
    lightingAndColor: "Dramatic rim lighting, stormy slate shadows, rich crimson & molten royal gold highlights, moody haze",
    promptInject:
      "HBO Prestige flagship drama cinematography, ARRI Alexa 35 with Panavision Primo 70 Anamorphic optics, fierce royal chiaroscuro lighting, dramatic rim light, moody storm atmosphere, hyper-tactile stone, bronze, fur and woven silk textures",
    palette: [
      { name: "HBO Obsidian", hex: "#09090B" },
      { name: "Imperial Crimson", hex: "#991B1B" },
      { name: "Weathered Gold", hex: "#D4AF37" },
      { name: "Storm Slate", hex: "#334155" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ SDE Karras",
      steps: 36,
      cfg: 6.5,
      targetEngine: "Midjourney v6.1",
      aspectRatio: "16:9",
      rationale: "DPM++ SDE Karras maximizes high stone, skin, lion fur, and metallic armor micro-detail.",
    },
    externalOutputLink: {
      label: "Open Midjourney",
      url: "https://www.midjourney.com/imagine",
      tip: "Best for fierce Rudra Shiva & royal Maa Durga HBO Prestige key art.",
    },
  },
  {
    id: "bbc-earth",
    name: "BBC Earth Natural History 8K",
    shortName: "BBC Earth",
    category: "OTT & Broadcast",
    badge: "8K Macro & Aerial",
    tagline: "David Attenborough wildlife, Himalayan peaks, sacred rivers & botanical micro-detail",
    cameraAndOptics: "RED V-Raptor XL & Phantom Flex4K • Canon Cine-Servo 50-1000mm telephoto & Laowa 24mm Probe Macro",
    lightingAndColor: "Authentic natural daylight, misty Himalayan dawn haze, crystal glacial water caustics, true-to-life organic textures",
    promptInject:
      "BBC Earth natural history documentary cinematography, 8K ultra-detailed telephoto and macro optics, authentic Himalayan atmospheric haze, crystalline river water caustics, raw tactile rock, moss, fur and water droplets, zero artificial studio look",
    palette: [
      { name: "Glacial Teal", hex: "#0D9488" },
      { name: "Himalayan Mist", hex: "#E2E8F0" },
      { name: "Forest Moss", hex: "#166534" },
      { name: "Dawn Earth Gold", hex: "#CA8A04" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ SDE Karras",
      steps: 36,
      cfg: 6.5,
      targetEngine: "Imagen 3",
      aspectRatio: "16:9",
      rationale: "DPM++ SDE Karras excels at photorealistic stone, water, foliage, skin, and natural micro-textures.",
    },
    externalOutputLink: {
      label: "Open Google ImageFX (Imagen 3)",
      url: "https://labs.google/fx/tools/image-fx",
      tip: "Best for BBC Earth photorealistic Himalayan nature, sacred rivers & wildlife.",
    },
  },
  {
    id: "disney-enchantment",
    name: "Disney Mythic Wonder & Live-Action",
    shortName: "Disney",
    category: "OTT & Broadcast",
    badge: "Luminous Magic",
    tagline: "Enchanting volumetric godrays, luminous color saturation & heartwarming mythic wonder",
    cameraAndOptics: "ARRI Alexa LF • Panavision Vintage Ultra Speed, dreamy halation and starlight bloom",
    lightingAndColor: "Luminous golden hour godrays, sparkling bioluminescent particle motes, vibrant royal jewel tones",
    promptInject:
      "Disney live-action mythic masterpiece aesthetic, enchanted volumetric godrays, luminous fairytale color harmony, shimmering golden stardust particles, expressive heartwarming wonder, rich storybook grandeur with photoreal textures",
    palette: [
      { name: "Castle Royal Blue", hex: "#2563EB" },
      { name: "Pixie Stardust", hex: "#FDE047" },
      { name: "Lotus Rose", hex: "#EC4899" },
      { name: "Emerald Enchantment", hex: "#10B981" },
    ],
    linkedBestOutput: {
      sampler: "Euler a",
      steps: 28,
      cfg: 7.0,
      targetEngine: "Midjourney v6.1",
      aspectRatio: "16:9",
      rationale: "Euler a produces soft, dreamy, romantic/divine calm illumination ideal for Disney magic.",
    },
    externalOutputLink: {
      label: "Open Midjourney",
      url: "https://www.midjourney.com/imagine",
      tip: "Delivers magical Disney lighting, glowing petals, and Bal-Leela enchantment.",
    },
  },
  {
    id: "nat-geo",
    name: "National Geographic Editorial",
    shortName: "Nat Geo",
    category: "OTT & Broadcast",
    badge: "Reportage 35mm",
    tagline: "Authentic pilgrimage, Ganga ghats, sacred rituals & timeless cultural reportage",
    cameraAndOptics: "Leica SL3 / ARRI Alexa 35 • Summilux-M 35mm f/1.4 ASPH, documentary depth",
    lightingAndColor: "Unstaged golden hour sunlight, swirling temple dhoop smoke, rich natural skin & fabric authenticity",
    promptInject:
      "National Geographic award-winning editorial photography, Leica 35mm f/1.4 documentary realism, authentic Indian sacred pilgrimage atmosphere, golden-hour Ganga ghat sunbeams, raw human emotion, candid ethnographic texture, true-to-life color",
    palette: [
      { name: "NatGeo Border Gold", hex: "#FFCC00" },
      { name: "Ganga Ochre", hex: "#B45309" },
      { name: "Marigold Saffron", hex: "#EA580C" },
      { name: "Basalt Stone", hex: "#292524" },
    ],
    linkedBestOutput: {
      sampler: "LMS Karras",
      steps: 32,
      cfg: 6.5,
      targetEngine: "Flux 1.1 Pro",
      aspectRatio: "4:5",
      rationale: "LMS Karras renders silky smooth sky gradients, sunsets, and river Ganga reflections.",
    },
    externalOutputLink: {
      label: "Open Flux 1.1 Pro",
      url: "https://blackforestlabs.ai/",
      tip: "Best for authentic Nat Geo documentary faces, ghats, and golden-hour Ganga scenes.",
    },
  },
  {
    id: "nolan-hoyte",
    name: "Christopher Nolan & Hoyte van Hoytema",
    shortName: "Nolan / Hoyte",
    category: "Directors & Cinematographers",
    badge: "IMAX 70mm Film",
    tagline: "Monumental 15/65mm IMAX celluloid scale, practical cosmic gravitas & tactile grain",
    cameraAndOptics: "IMAX MSM 9802 15/65mm Film Camera • Hasselblad 50mm & Panavision System 65, Kodak Vision3 500T 5219",
    lightingAndColor: "Practical motivated light sources, stark obsidian shadows, blinding solar gold, cool steel cyan contrast, organic photochemical film grain",
    promptInject:
      "Directed by Christopher Nolan, cinematography by Hoyte van Hoytema, shot on IMAX 70mm 15-perf 65mm Kodak Vision3 film stock, Hasselblad System 65 prime lens, monumental practical architectural scale, stark chiaroscuro contrast, deep obsidian shadows against blazing solar gold and cosmic steel blue, authentic photochemical halation and fine 65mm film grain",
    palette: [
      { name: "Celluloid Obsidian", hex: "#09090B" },
      { name: "Oppenheimer Fire Gold", hex: "#F97316" },
      { name: "Interstellar Steel", hex: "#38BDF8" },
      { name: "Dunkirk Sand", hex: "#D6D3D1" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ 3M SDE Karras",
      steps: 45,
      cfg: 5.8,
      targetEngine: "Midjourney v6.1",
      aspectRatio: "21:9",
      rationale: "DPM++ 3M SDE Karras unlocks 8K hero resolution and micro-grain depth for IMAX 70mm scale.",
    },
    externalOutputLink: {
      label: "Open Midjourney",
      url: "https://www.midjourney.com/imagine",
      tip: "Use --ar 21:9 --style raw for monumental Nolan / Hoyte IMAX 70mm framing.",
    },
  },
  {
    id: "villeneuve-fraser",
    name: "Denis Villeneuve & Greig Fraser",
    shortName: "Villeneuve / Fraser",
    category: "Directors & Cinematographers",
    badge: "Monolithic Epic",
    tagline: "Colossal temple minimalism, atmospheric dust shafts & meditative visual silence",
    cameraAndOptics: "ARRI Alexa LF • Panavision Ultra Vista Anamorphic, soft atmospheric diffusion",
    lightingAndColor: "Monochromatic desert gold, brutalist stone scale, heavy volumetric mist & silhouette majesty",
    promptInject:
      "Directed by Denis Villeneuve, cinematography by Greig Fraser, ARRI Alexa LF Ultra Vista Anamorphic, colossal brutalist sacred temple scale, atmospheric dust and golden incense haze, meditative silhouettes, monumental negative space",
    palette: [
      { name: "Arrakis Ochre", hex: "#C2843E" },
      { name: "Monolith Charcoal", hex: "#1C1917" },
      { name: "Amber Spice Glow", hex: "#F59E0B" },
      { name: "Pale Sandstone", hex: "#E7E5E4" },
    ],
    linkedBestOutput: {
      sampler: "Heun",
      steps: 38,
      cfg: 6.0,
      targetEngine: "Flux 1.1 Pro",
      aspectRatio: "21:9",
      rationale: "Heun delivers ultra-high precision on monumental close-ups and subtle atmospheric gradients.",
    },
    externalOutputLink: {
      label: "Open Flux 1.1 Pro",
      url: "https://blackforestlabs.ai/",
      tip: "Ideal for vast Villeneuve-style temple geometry and atmospheric depth.",
    },
  },
  {
    id: "rajamouli-bhansali",
    name: "Rajamouli & Sanjay Leela Bhansali",
    shortName: "Rajamouli / SLB",
    category: "Directors & Cinematographers",
    badge: "Indic Grandeur",
    tagline: "Opulent Bharatiya temple spectacle, 1800K brass diyas, swirling silks & mythic heroism",
    cameraAndOptics: "ARRI Alexa LF • Zeiss Supreme Prime Radiance, golden flare & sweeping crane depth",
    lightingAndColor: "1800K warm ghee diya flames, crimson-vermilion & 24k gold zari richness, dramatic storm & fire backlights",
    promptInject:
      "Epic Indian cinema grandeur inspired by SS Rajamouli and Sanjay Leela Bhansali, opulent handcrafted Zari silk costumes, thousands of glowing 1800K brass oil diyas, sweeping sacred temple courtyard scale, heroic divine posture, deep crimson and molten 24k gold color dramaturgy",
    palette: [
      { name: "Sindoor Vermilion", hex: "#DC2626" },
      { name: "24K Temple Gold", hex: "#D4AF37" },
      { name: "Peacock Royal", hex: "#0F766E" },
      { name: "Sanctum Amber", hex: "#B45309" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ SDE Karras",
      steps: 36,
      cfg: 7.0,
      targetEngine: "Midjourney v6.1",
      aspectRatio: "16:9",
      rationale: "DPM++ SDE Karras captures photorealistic carved stone, Zari fabric weave, and divine skin.",
    },
    externalOutputLink: {
      label: "Open Midjourney",
      url: "https://www.midjourney.com/imagine",
      tip: "Unmatched for opulent temple sets, silk zari embroidery, and heroic mythic energy.",
    },
  },
  {
    id: "roger-deakins",
    name: "Roger Deakins Precision Naturalism",
    shortName: "Roger Deakins",
    category: "Directors & Cinematographers",
    badge: "Master Light",
    tagline: "Single-source motivated silhouette poetry, pure symmetry & soulful calm",
    cameraAndOptics: "ARRI Alexa Mini LF • Cooke S4/i 32mm & 50mm spherical primes, clean geometry",
    lightingAndColor: "Single motivated window/diya/horizon light source, clean painterly silhouettes, timeless restraint",
    promptInject:
      "Cinematography by Roger Deakins, ARRI Alexa Mini LF with Cooke S4 spherical prime lens, single-source motivated chiaroscuro lighting, razor-clean geometric framing, soulful stillness, poetic silhouette separation",
    palette: [
      { name: "Blade Runner Amber", hex: "#D97706" },
      { name: "Skyfall Midnight", hex: "#0C4A6E" },
      { name: "Warm Filament", hex: "#FDE68A" },
      { name: "Shadow Charcoal", hex: "#18181B" },
    ],
    linkedBestOutput: {
      sampler: "Euler",
      steps: 30,
      cfg: 6.5,
      targetEngine: "Flux 1.1 Pro",
      aspectRatio: "16:9",
      rationale: "Euler renders clean, stable portraits and disciplined single-source lighting geometry.",
    },
    externalOutputLink: {
      label: "Open Flux 1.1 Pro",
      url: "https://blackforestlabs.ai/",
      tip: "Best for clean Deakins light shafts and meditative portrait symmetry.",
    },
  },
  {
    id: "ideogram-poster",
    name: "Ideogram 2.0 / 3.0 Poster Engine",
    shortName: "Ideogram",
    category: "AI & Poster Engines",
    badge: "Typography & Design",
    tagline: "Precision graphic key art, clean headline negative space & crisp Devanagari/English seals",
    cameraAndOptics: "Ideogram Design v2/v3 Vector-Photoreal Hybrid • Balanced editorial poster grid",
    lightingAndColor: "High-contrast studio key art separation, dedicated upper/lower title safe zones",
    promptInject:
      "Ideogram 2.0/3.0 master poster key-art composition, balanced editorial typography safe zones at top and bottom, crisp sacred emblem geometry, clean studio graphic contrast, ultra-sharp focal separation",
    palette: [
      { name: "Editorial Gold", hex: "#FBBF24" },
      { name: "Poster Matte Black", hex: "#09090B" },
      { name: "Sacred Ivory", hex: "#FAF5EB" },
      { name: "Vermilion Accent", hex: "#EF4444" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ 2M Karras",
      steps: 30,
      cfg: 7.5,
      targetEngine: "Ideogram 2.0",
      aspectRatio: "9:16",
      rationale: "Ideogram 2.0 + DPM++ 2M Karras guarantees crisp poster layout and zero-clutter title zones.",
    },
    externalOutputLink: {
      label: "Open Ideogram",
      url: "https://ideogram.ai/",
      tip: "Paste directly into Ideogram for 9:16 Reels covers, YouTube thumbnails & Devanagari posters.",
    },
  },
  {
    id: "flux-sdxl-photoreal",
    name: "Flux 1.1 Pro / SDXL Local Master",
    shortName: "Flux / SDXL",
    category: "AI & Poster Engines",
    badge: "Local & Cloud 8K",
    tagline: "Direct ComfyUI / Automatic1111 / Flux Pro sampler-accurate photorealism",
    cameraAndOptics: "Medium Format Digital 100MP • 80mm f/1.9, subsurface scattering & 16-bit texture maps",
    lightingAndColor: "Physically based rendering (PBR) caustics, natural skin pores, woven silk & carved basalt fidelity",
    promptInject:
      "Flux 1.1 Pro / SDXL 8K photorealistic masterwork, medium format 100MP sensor clarity, true subsurface scattering (SSS), intricate carved basalt stone, handwoven silk thread weave, physically accurate raytraced caustics",
    palette: [
      { name: "Emerald Core", hex: "#10B981" },
      { name: "Carbon Dark", hex: "#111827" },
      { name: "Molten Brass", hex: "#D97706" },
      { name: "Luminous Pearl", hex: "#F3F4F6" },
    ],
    linkedBestOutput: {
      sampler: "DPM++ SDE Karras",
      steps: 35,
      cfg: 6.0,
      targetEngine: "SDXL",
      aspectRatio: "2:3",
      rationale: "DPM++ SDE Karras is purpose-built for SDXL/Flux photoreal stone, skin, and fabric textures.",
    },
    externalOutputLink: {
      label: "Open Civitai / SDXL Hub",
      url: "https://civitai.com/",
      tip: "Copy the exact Sampler, Steps & CFG block directly into ComfyUI, Forge WebUI, or A1111.",
    },
  },
];

export interface BestOutputGeneratorLink {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  recommendedSampler: string;
  bestFor: string;
}

export const BEST_OUTPUT_GENERATOR_LINKS: BestOutputGeneratorLink[] = [
  {
    id: "link-midjourney",
    name: "Midjourney v6.1",
    subtitle: "Cinematic Key Art & Mythic Scale",
    url: "https://www.midjourney.com/imagine",
    recommendedSampler: "DPM++ 3M SDE Karras / --style raw",
    bestFor: "Nolan/Hoyte, Netflix, Disney, Rajamouli/SLB",
  },
  {
    id: "link-ideogram",
    name: "Ideogram 2.0 / 3.0",
    subtitle: "Posters, Thumbnails & Devanagari Safe-Zones",
    url: "https://ideogram.ai/",
    recommendedSampler: "DPM++ 2M Karras",
    bestFor: "Ideogram Posters, YouTube Covers, 9:16 Shorts",
  },
  {
    id: "link-flux",
    name: "Flux 1.1 Pro (BFL)",
    subtitle: "Photoreal Anatomy, Portraits & Naturalism",
    url: "https://blackforestlabs.ai/",
    recommendedSampler: "Euler / DPM++ SDE Karras / LMS Karras",
    bestFor: "Apple TV+, Nat Geo, Deakins, Villeneuve",
  },
  {
    id: "link-imagen3",
    name: "Google ImageFX (Imagen 3)",
    subtitle: "BBC Earth Nature, Ganga & Temple Architecture",
    url: "https://labs.google/fx/tools/image-fx",
    recommendedSampler: "DPM++ SDE Karras",
    bestFor: "BBC Earth, Himalayan Ecology, Sacred Rivers",
  },
  {
    id: "link-sdxl",
    name: "Civitai / SDXL (ComfyUI / A1111)",
    subtitle: "Exact Sampler Control (Karras / SDE / Heun)",
    url: "https://civitai.com/",
    recommendedSampler: "All 10 Samplers (2M / 3M SDE / Heun / LMS)",
    bestFor: "Custom 8K Hero Renders & Local Workflows",
  },
];

export const POSTER_OVERLAY_DOCTRINE = {
  subtitleRule:
    "Subtitle: Placed directly under main title in smaller font, gold/white contrast.",
  textLegibilityScrim:
    "Typography background: Soft dark gradient scrim behind text overlays to guarantee title readability.",
  safeMargins:
    "Safe margins: Ensure Watch Now pill button (bottom-left) and 4K badges (bottom-right) remain 5% inside screen edges.",
  combinedInstruction:
    "Poster Overlay Rules: (1) Subtitle placed directly under main title in smaller font with gold/white contrast; (2) Soft dark gradient scrim behind text overlays to guarantee title readability; (3) Watch Now pill button (bottom-left) and 4K badges (bottom-right) remain 5% inside screen edges.",
};

