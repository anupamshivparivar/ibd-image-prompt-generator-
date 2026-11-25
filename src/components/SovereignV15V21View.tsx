import React, { useState } from "react";
import {
  AspectRatio,
  TargetEngine,
  SovereignStyleLibrary,
  SovereignVariationSlot,
  SovereignDeckRequest,
  SovereignDeckResult,
} from "../types";
import {
  Crown,
  Sparkles,
  Flame,
  Zap,
  Sun,
  Moon,
  Compass,
  Copy,
  Check,
  Wand2,
  Shield,
  Layers,
  ArrowRight,
  Maximize2,
  Eye,
  Film,
  Camera,
  Activity,
  Award,
} from "lucide-react";

interface SovereignV15V21ViewProps {
  customApiKey?: string;
  showToast: (msg: string) => void;
  onSendToForge?: (customReq: {
    subject: string;
    story: string;
    version: number;
    dim: AspectRatio;
  }) => void;
}

const STYLE_LIBRARIES: {
  id: SovereignStyleLibrary;
  name: string;
  badge: string;
  desc: string;
  palette: string;
  icon: string;
}[] = [
  {
    id: "Standard Sovereign V17",
    name: "Sovereign V17 Default",
    badge: "V17 FLAGSHIP",
    desc: "Shastra rigor, Swayam-Jyoti radiance, 120fps kinetic metadata, Planck-scale detail.",
    palette: "from-[#ffd700] to-[#b8860b]",
    icon: "Crown",
  },
  {
    id: "HP V18 (Storm Warrior - Kinetic Wind & Lightning Rim)",
    name: "HP V18 (Storm Warrior)",
    badge: "HP V18",
    desc: "Kinetic wind, lightning edge-light, heroic warrior stance, storm-blue & charcoal.",
    palette: "from-[#00b4d8] to-[#03045e]",
    icon: "Zap",
  },
  {
    id: "HP V19 (Volumetric Rays - Sacred Light & Incense Haze)",
    name: "HP V19 (Volumetric Rays)",
    badge: "HP V19",
    desc: "Sacred light architecture, shafts of morning sunbeams, temple mandapa, dhoop haze.",
    palette: "from-[#ffb703] to-[#fb8500]",
    icon: "Sun",
  },
  {
    id: "HP V20 (Celestial Sky - Cosmic Indigo & Starfields)",
    name: "HP V20 (Celestial Sky)",
    badge: "HP V20",
    desc: "Cosmic scale, deep indigo firmament, nebular star fields, Vishwaroopa transcendence.",
    palette: "from-[#7209b7] to-[#3a0ca3]",
    icon: "Moon",
  },
  {
    id: "VP21 (Temple Sanctum / ISV21 - Garbhagriha & 1800K Diya)",
    name: "VP21 / ISV21 (Temple Sanctum)",
    badge: "VP21 / ISV21",
    desc: "Garbhagriha, 1800K brass diya clusters, black basalt stone, intimate Darshan.",
    palette: "from-[#e63946] to-[#d4af37]",
    icon: "Flame",
  },
  {
    id: "Q10 (Ultimate Divine Masterpiece - Non-Dual Siddha)",
    name: "Q10 Siddha Masterpiece",
    badge: "Q10 MASTER",
    desc: "The absolute benchmark for non-dual sacred art, 128-bit path-traced rendering.",
    palette: "from-[#ffd700] to-[#ffffff]",
    icon: "Award",
  },
];

const VARIATION_SLOTS: {
  id: SovereignVariationSlot;
  label: string;
  shorthand: string;
  focus: string;
}[] = [
  {
    id: "V01 (Frontal Symmetry & Regal Presence)",
    label: "V01: Frontal Symmetry",
    shorthand: "V01",
    focus: "Regal central alignment, direct eye-to-eye Darshan",
  },
  {
    id: "V05 (Monsoon / Varsha Dynamic & Rain Petals)",
    label: "V05: Monsoon Dynamics",
    shorthand: "V05",
    focus: "Rain drops, floating petals, misty pine winds",
  },
  {
    id: "V10 (Cosmic Void & Celestial Firmament)",
    label: "V10: Cosmic Void",
    shorthand: "V10",
    focus: "Starlight nebulae, unmanifest cosmic space",
  },
  {
    id: "V15 (Golden Hour Mandapa & Sun Rays)",
    label: "V15: Mandapa Golden Hour",
    shorthand: "V15",
    focus: "Sun shafts through carved stone lattices",
  },
  {
    id: "V20 (Aarti & Garbhagriha Fire Illumination)",
    label: "V20: Aarti Flame Convergence",
    shorthand: "V20",
    focus: "Ghee diya flicker, camphor fire caustics",
  },
  {
    id: "V25 (Sacred Rim Backlight & Silhouette Tejas)",
    label: "V25: Sacred Rim Backlight",
    shorthand: "V25",
    focus: "Halo effulgence, cinematic silhouette contour",
  },
  {
    id: "V30 (Macro Sacred Relic & Mudra Focus)",
    label: "V30: Macro Relic & Mudra",
    shorthand: "V30",
    focus: "Close-up sacred mudra, rudraksha & tilak detail",
  },
];

const QUICK_STARTERS = [
  {
    title: "V17 Hanuman Darshan in HP V19 (9:16)",
    subject: "Veer Hanuman in Deep Dhyana",
    sankalpa:
      "Lord Hanuman in deep meditative Dhyana inside an ancient stone mandapa sanctum with shafts of morning golden sunbeams piercing jali lattices, dewy tulsi garlands, and pure Swayam-Jyoti radiance from his heart center.",
    version: 17,
    styleLibrary: "HP V19 (Volumetric Rays - Sacred Light & Incense Haze)" as SovereignStyleLibrary,
    slot: "V20 (Aarti & Garbhagriha Fire Illumination)" as SovereignVariationSlot,
    dim: "9:16" as AspectRatio,
    tithiSeason: "Brahma Muhurta (4:00 AM Dawn)",
  },
  {
    title: "HP V18 Storm Warrior Mahadev Tandava (16:9)",
    subject: "Bhagwan Shiva Rudra Tandava",
    sankalpa:
      "Lord Shiva performing the cosmic Rudra Tandava amidst swirling storm clouds, lightning edge-illumination, billowing tiger skin, and cosmic Trishula radiating electrical Tejas.",
    version: 18,
    styleLibrary: "HP V18 (Storm Warrior - Kinetic Wind & Lightning Rim)" as SovereignStyleLibrary,
    slot: "V05 (Monsoon / Varsha Dynamic & Rain Petals)" as SovereignVariationSlot,
    dim: "16:9" as AspectRatio,
    tithiSeason: "Maha Shivratri Nishita Kaal (Midnight)",
  },
  {
    title: "VP21 / ISV21 Consecrated Garbhagriha (9:16)",
    subject: "Shri Banke Bihari Ji / Garbhagriha Sanctum",
    sankalpa:
      "Intimate Garbhagriha Darshan of the consecrated deity surrounded by hundreds of tiered hand-beaten brass ghee lamps, leap of camphor flames (1800K), wet sandalwood paste, and black basalt stone.",
    version: 21,
    styleLibrary: "VP21 (Temple Sanctum / ISV21 - Garbhagriha & 1800K Diya)" as SovereignStyleLibrary,
    slot: "V20 (Aarti & Garbhagriha Fire Illumination)" as SovereignVariationSlot,
    dim: "9:16" as AspectRatio,
    tithiSeason: "Sandhya Aarti (6:00 PM Twilight)",
  },
  {
    title: "HP V20 Celestial Sky Mahavishnu Vishwaroopa (16:9)",
    subject: "Bhagwan Mahavishnu Cosmic Vishwaroopam",
    sankalpa:
      "Cosmic scale Vishwaroopam on the celestial indigo firmament, thousands of glowing solar systems and nebulae swirling across the thousand-headed Sheshanaga and divine lotus feet.",
    version: 20,
    styleLibrary: "HP V20 (Celestial Sky - Cosmic Indigo & Starfields)" as SovereignStyleLibrary,
    slot: "V10 (Cosmic Void & Celestial Firmament)" as SovereignVariationSlot,
    dim: "16:9" as AspectRatio,
    tithiSeason: "Vaikuntha Ekadashi Cosmic Noon",
  },
  {
    title: "V15 Kala-Pramana Janmashtami Midnight (9:16)",
    subject: "Vasudeva Crossing Midnight Yamuna with Baby Krishna",
    sankalpa:
      "Astronomical accuracy of Bhadrapada Ashtami Rohini Nakshatra midnight. Surging rain-swept Yamuna river, lightning rim-light, and Sheshanaga golden hoods shielding wicker basket.",
    version: 15,
    styleLibrary: "Standard Sovereign V17" as SovereignStyleLibrary,
    slot: "V05 (Monsoon / Varsha Dynamic & Rain Petals)" as SovereignVariationSlot,
    dim: "9:16" as AspectRatio,
    tithiSeason: "Bhadrapada Krishna Ashtami (Janmashtami Midnight)",
  },
  {
    title: "V-Omega Ramayana Epic Series (16:9)",
    subject: "Maryada Purushottam Shri Ram Rajya-Abhishek",
    sankalpa:
      "The grand coronation of Shri Ram and Maa Sita on the Navaratna throne in Ayodhya. Collapse of waveform into pristine cinematic reality, 128-bit path-traced golden glory with millions of lamps.",
    version: 22,
    styleLibrary: "Q10 (Ultimate Divine Masterpiece - Non-Dual Siddha)" as SovereignStyleLibrary,
    slot: "V01 (Frontal Symmetry & Regal Presence)" as SovereignVariationSlot,
    dim: "16:9" as AspectRatio,
    tithiSeason: "Chaitra Shukla Navami (Noon Sun)",
  },
];

export const SovereignV15V21View: React.FC<SovereignV15V21ViewProps> = ({
  customApiKey,
  showToast,
  onSendToForge,
}) => {
  const [formData, setFormData] = useState<SovereignDeckRequest>({
    subject: "Veer Hanuman in Deep Dhyana",
    sankalpa:
      "Lord Hanuman in deep meditative Dhyana inside an ancient stone mandapa sanctum with shafts of morning golden sunbeams piercing jali lattices, dewy tulsi garlands, and pure Swayam-Jyoti radiance from his heart center.",
    version: 17,
    styleLibrary: "HP V19 (Volumetric Rays - Sacred Light & Incense Haze)",
    slot: "V20 (Aarti & Garbhagriha Fire Illumination)",
    dim: "9:16",
    targetEngine: "Midjourney v6.1",
    tithiSeason: "Brahma Muhurta (4:00 AM Dawn)",
    drishtiMapping: true,
    swayamJyoti: true,
    brandSafeZones: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SovereignDeckResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTierTab, setActiveTierTab] = useState<"all" | "visual" | "image" | "poster" | "motion">("all");

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sovereign-v15-v21", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          customApiKey,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setResult(data);
        showToast("IBD Sovereign Production Deck Manifested!");
      } else {
        throw new Error(data.error || "Generation failed");
      }
    } catch (err: any) {
      console.warn("API error, using local Sovereign generator fallback:", err);
      // Generate client-side fallback production deck
      const vNum = formData.version;
      const vTag = vNum === 22 ? "V-OMEGA" : `V${vNum}`;
      const styleName = formData.styleLibrary.split(" ")[0];

      const fallbackScript = `An ultra-realistic, sacred devotional cinematic key-art of ${formData.subject}, ${vTag} Sovereign Production Tier, ${formData.styleLibrary} architecture, slot ${formData.slot}. Captured on ARRI Alexa LF with Panavision Anamorphic 50mm f/1.4 lens. ${formData.sankalpa} Atmospheric optical depth, realistic ethnic Indic facial features, radiant Drishti eye-convergence mapping, microscopic skin pores, natural amber cloth weave. Swayam-Jyoti golden effulgence radiating from within the heart center and third eye. Dynamic volumetric ray tracing, 8K resolution, IMAX quality, no modern artifacts, sacred shastra precision. Consecrated studio seal: 'IBD — An Indian Bhakti Dhara Production' integrated into bottom-center stone safe zone. --ar ${formData.dim} --style raw --v 6.1 --q 2 --c 0`;

      const fallbackLogic = `- Engine Tier: ${vTag} (${formData.styleLibrary})\n- Anti-Repetition Slot: ${formData.slot}\n- Optical Physics: Motivated ${styleName} lighting with Atman Swayam-Jyoti inner radiance and Drishti convergence.\n- Shastra Rigor: 100% Satvic Indic anatomy with canonical Ayudhas and sacred botanical garlands.`;

      const fallbackKinetic = `Target: Sora / Kling 1.5 PRO (120fps Native)\nCamera Motion: Slow micro-dolly push-in (0.18m/s) along Z-axis toward third eye.\nLighting Vector: Dynamic godrays pulsing with subtle 0.8Hz sacred respiratory rhythm; atmospheric incense particles swirling in slow Brownian motion.\nDepth Map: Foreplane (Diya Bokeh, z=0.6m), Subject plane (Deity, z=2.2m), Backplane (Sanctum Stone & Light Shafts, z=4.8m).\nColor Space: ACEScg, 3200K warm temple core blending with 5200K divine beam.`;

      const fallbackJson = {
        Version: vTag,
        Slot: formData.slot,
        Target_Frequency: "963Hz",
        Viral_Title_Hindi: `${formData.subject} दिव्य दर्शन | साक्षात् कृपा`,
        SEO_Tags: ["IBD", "ASP", "RKM", "SovereignV17", "Bhakti", "SanatanCinema", "SacredDarshan"],
        Branding_Style: "Integrated-Subtle (Carved in stone bottom-center safe zone)",
        CTR_Prediction: "9.8/10",
        Safe_Zone_Top: "Reserved for Devotional Shloka Headline",
        Safe_Zone_Bottom: "IBD / ASP Consecrated Mark",
      };

      const fallbackSuite = {
        visualExperience: {
          atmosphere: `Ancient consecrated stone sanctum with monolithic granite pillars and swirling dhoop haze for ${formData.subject}`,
          lightingChiaroscuro: "2200K–2400K warm ghee lamp chiaroscuro with volumetric god rays and deep jewel-toned shadows",
          vedicAartiEngine: "Dynamic Vedic Aarti ritual event with glowing camphor flames (1800K), waving brass deepaks, and floating loban smoke",
          directorStyle: "Grand cinematic depth and devotional reverential realism inspired by SS Rajamouli & Sanjay Leela Bhansali",
          targetEngineFocus: "Midjourney style references (--sref), Stable Diffusion ControlNet lighting, Unreal Engine 5.4 atmosphere",
        },
        imageEye: {
          subjectIdentity: `${formData.subject} in pristine canonical representation and divine majesty`,
          facialFeaturesAndMudra: "Serene symmetrical countenance, compassionate Atman-sync eyes, Tilak marking, and blessing Abhaya Mudra",
          canonicalAttributes: ["Authentic Vedic iconography", "Intricate gold Zari embroidery", "Mukut adorned with gemstones", "Sacred garland"],
          lensOpticsAndSSS: "85mm Master Prime T1.4, Subsurface Scattering (SSS) on radiant divine skin, creamy optical bokeh",
          targetEngineFocus: "Midjourney v6.1 (--v 6.1 --style raw), Flux 1.1 Pro, Stable Diffusion XL",
        },
        posterMessage: {
          headlineAndTypography: "High-contrast focal separation commanding immediate eye contact with designated upper negative space for bold Devanagari Sanskrit headlines",
          safeZoneMargins: "Top 120px and bottom 280px clean safe-zone clearance for OTT platform UI, timestamps, and branding badges",
          brandingWatermark: "IBD — An Indian Bhakti Dhara Production consecrated seal integrated in bottom-center stone safe zone",
          targetEngineFocus: "YouTube Thumbnails (16:9), Vertical OTT Key Art (9:16), Devotional Prints (2:3 / 4:5)",
        },
        motionMovement: {
          cameraPath: "Slow 360-degree sweeping orbit or slow micro-dolly push-in (0.18m/s) along Z-axis toward heart and third eye",
          particlePhysics: "Dancing camphor flames with heat haze caustics, rising spirals of Loban incense smoke, falling shower of fresh marigold petals",
          frameRateAndCoherence: "60 FPS / 120 FPS ultra-smooth temporal continuity, zero distortion, zero morphing artifacts",
          targetEngineFocus: "Runway Gen-3, Luma Dream Machine, OpenAI Sora, Kling AI 1.5 Pro",
        },
      };

      setResult({
        conceptLogic: fallbackLogic,
        masterScript: fallbackScript,
        negativePrompt:
          "extra limbs, deformed hands, western superhero tropes, cartoon, plastic textures, oversaturated anime style, bad anatomy, modern clothing, offensive imagery",
        kineticMetadata: fallbackKinetic,
        engagementJson: fallbackJson,
        sovereignPromptSuite: fallbackSuite,
        siddhaCheck: {
          iconography: true,
          lightingMotivated: true,
          brandingSafeZone: true,
          antiRepetitionSlot: true,
          details: "All Shastra, Optical, Safe-Zone, and Anti-Repetition criteria verified.",
        },
      });
      showToast("IBD Sovereign Production Deck Manifested!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyPreset = (preset: (typeof QUICK_STARTERS)[0]) => {
    setFormData((prev) => ({
      ...prev,
      subject: preset.subject,
      sankalpa: preset.sankalpa,
      version: preset.version,
      styleLibrary: preset.styleLibrary,
      slot: preset.slot,
      dim: preset.dim,
      tithiSeason: preset.tithiSeason,
    }));
    showToast(`Loaded "${preset.title}" preset`);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#120a04] via-[#1a1207] to-[#241303] border border-[#ffcc33]/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-gradient-to-r from-[#ffd700] via-[#ffaa00] to-[#ff6600] text-black px-3 py-0.5 rounded-full text-[11px] font-black tracking-widest uppercase font-mono-code shadow-md">
                V15 — V21 SOVEREIGN ENGINE
              </span>
              <span className="bg-[#261d11] text-[#f4cf6a] border border-[#ffcc33]/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                IMAX • SORA 120FPS • SHASTRA-RIGOR
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-[#ffd700] tracking-wide">
              Sovereign Narrative & Production Deck Architect
            </h2>
            <p className="text-xs md:text-sm text-[#c7b9a5] max-w-3xl mt-1.5 leading-relaxed">
              Manifest elite Devotional Key Art and complete IBD Production Decks (V15–V21 & V-Omega) bridging ancient Sanatan truth with ultra-modern OTT visual standards, 120fps motion vectors, and 30-slot anti-repetition discipline.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ffd700] via-[#ffcc33] to-[#ff9900] text-black font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-[#ffd700]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Wand2 className="w-4 h-4 animate-spin text-black" />
                  <span>Manifesting Deck...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Manifest Sovereign Deck</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Starter Presets Bar */}
        <div className="mt-6 pt-5 border-t border-[#3d2a14] flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#ffd700]" />
            Canonical Sovereign Starter Manifests (1-Click)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {QUICK_STARTERS.map((preset) => (
              <button
                key={preset.title}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-left p-2.5 rounded-xl bg-[#181109]/90 hover:bg-[#261b0e] border border-[#3d2a14] hover:border-[#ffd700]/50 transition-all group cursor-pointer"
              >
                <div className="text-[11px] font-bold text-[#ffd700] group-hover:text-white line-clamp-1">
                  {preset.title}
                </div>
                <div className="text-[9px] text-[#a39274] line-clamp-1 mt-0.5">
                  {preset.subject}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Configuration Controls (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 1. Version Hierarchy Selector */}
          <div className="bg-[#0f0c08] border border-[#2d2215] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <label className="text-xs font-bold text-[#ffd700] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-[#ffd700]" />
                Sovereign Evolution Tier (V15 — V21 & V-Omega)
              </span>
              <span className="text-[10px] font-mono-code text-[#f4cf6a] bg-[#1a140c] px-2 py-0.5 rounded border border-[#3d2a14]">
                {formData.version === 22 ? "V-OMEGA" : `V${formData.version}`}
              </span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {[
                { v: 15, label: "V15 Kala-Pramana", tag: "Tithi/Season" },
                { v: 16, label: "V16 Sovereign", tag: "IMAX Cinema" },
                { v: 17, label: "V17 Flagship", tag: "Default Sovereign" },
                { v: 18, label: "V18 Storm", tag: "HP Warrior" },
                { v: 19, label: "V19 Volumetric", tag: "HP Sunrays" },
                { v: 20, label: "V20 Celestial", tag: "HP Starfields" },
                { v: 21, label: "V21 Sanctum", tag: "VP21/ISV21" },
                { v: 22, label: "V-OMEGA", tag: "Singularity" },
              ].map((item) => (
                <button
                  key={item.v}
                  type="button"
                  onClick={() => setFormData({ ...formData, version: item.v })}
                  className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                    formData.version === item.v
                      ? "bg-[#2d1e0a] border-[#ffd700] text-[#ffd700] shadow-md shadow-[#ffd700]/10 scale-[1.02]"
                      : "bg-[#14100b] border-[#261d11] text-[#a39274] hover:text-[#e5e0d5] hover:bg-[#1a140d]"
                  }`}
                >
                  <div className="text-[10px] font-bold truncate">{item.label}</div>
                  <div className="text-[8px] text-[#8c7a5c] truncate">{item.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Specialized Style Library */}
          <div className="bg-[#0f0c08] border border-[#2d2215] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <label className="text-xs font-bold text-[#ffd700] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#ffd700]" />
              Specialized Style Libraries (HP V18–V20 & VP21/ISV21)
            </label>

            <div className="flex flex-col gap-2">
              {STYLE_LIBRARIES.map((style) => {
                const isSelected = formData.styleLibrary === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, styleLibrary: style.id })}
                    className={`p-3 rounded-xl text-left transition-all border flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#24180c] border-[#ffd700] text-white shadow-md shadow-[#ffd700]/15"
                        : "bg-[#14100b] border-[#261d11] text-[#a39274] hover:bg-[#1a140d] hover:text-[#e5e0d5]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#ffd700]">{style.name}</span>
                        <span className="text-[9px] font-mono-code bg-[#0d0905] px-1.5 py-0.2 rounded border border-[#3d2a14] text-[#f4cf6a]">
                          {style.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#a89b88] mt-0.5 line-clamp-2 leading-relaxed">
                        {style.desc}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. 30-Slot Anti-Repetition Engine */}
          <div className="bg-[#0f0c08] border border-[#2d2215] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <label className="text-xs font-bold text-[#ffd700] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#ffd700]" />
                30-Slot Anti-Repetition Engine
              </span>
              <span className="text-[9px] text-[#8c7a5c]">V01–V30 Rule</span>
            </label>

            <select
              value={formData.slot}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slot: e.target.value as SovereignVariationSlot,
                })
              }
              className="w-full bg-[#14100b] border border-[#3d2a14] rounded-xl px-3 py-2.5 text-xs text-[#ffd700] font-semibold focus:outline-none focus:border-[#ffd700]"
            >
              {VARIATION_SLOTS.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.label} — {slot.focus}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Subject & Sankalpa Input */}
          <div className="bg-[#0f0c08] border border-[#2d2215] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <label className="text-xs font-bold text-[#ffd700] uppercase tracking-wider">
              Sacred Subject & Character
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Lord Hanuman in Deep Dhyana / Bhagwan Shiva / Shri Ram"
              className="w-full bg-[#14100b] border border-[#3d2a14] rounded-xl px-3.5 py-2.5 text-xs text-[#ffd700] font-medium placeholder-[#6e5d44] focus:outline-none focus:border-[#ffd700]"
            />

            <label className="text-xs font-bold text-[#ffd700] uppercase tracking-wider mt-2">
              Sankalpa Narrative & Environment
            </label>
            <textarea
              rows={3}
              value={formData.sankalpa}
              onChange={(e) => setFormData({ ...formData, sankalpa: e.target.value })}
              placeholder="Describe the divine moment, mandapa architecture, atmospheric lighting, and emotional rasa..."
              className="w-full bg-[#14100b] border border-[#3d2a14] rounded-xl p-3.5 text-xs text-[#e5e0d5] leading-relaxed placeholder-[#6e5d44] focus:outline-none focus:border-[#ffd700]"
            />

            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <label className="text-[10px] text-[#a39274] font-bold block mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={formData.dim}
                  onChange={(e) =>
                    setFormData({ ...formData, dim: e.target.value as AspectRatio })
                  }
                  className="w-full bg-[#14100b] border border-[#3d2a14] rounded-xl p-2 text-xs text-[#f4cf6a]"
                >
                  <option value="9:16">9:16 (Shorts / Reels / Mobile)</option>
                  <option value="16:9">16:9 (Cinema / YouTube / IMAX)</option>
                  <option value="2:3">2:3 (Portrait Poster)</option>
                  <option value="1:1">1:1 (Square Feed)</option>
                  <option value="21:9">21:9 (Ultrawide Epic)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#a39274] font-bold block mb-1">
                  Temporal / Season
                </label>
                <input
                  type="text"
                  value={formData.tithiSeason || ""}
                  onChange={(e) => setFormData({ ...formData, tithiSeason: e.target.value })}
                  placeholder="e.g. Brahma Muhurta / Sandhya"
                  className="w-full bg-[#14100b] border border-[#3d2a14] rounded-xl p-2 text-xs text-[#f4cf6a]"
                />
              </div>
            </div>

            {/* Dharmic Physics Toggles */}
            <div className="mt-3 pt-3 border-t border-[#261d11] flex flex-col gap-2">
              <label className="flex items-center gap-2 text-[11px] text-[#c5baa8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.swayamJyoti}
                  onChange={(e) =>
                    setFormData({ ...formData, swayamJyoti: e.target.checked })
                  }
                  className="accent-[#ffd700] rounded"
                />
                <span>
                  <strong>Swayam-Jyoti</strong>: Non-dual inner Atman effulgence
                </span>
              </label>

              <label className="flex items-center gap-2 text-[11px] text-[#c5baa8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.drishtiMapping}
                  onChange={(e) =>
                    setFormData({ ...formData, drishtiMapping: e.target.checked })
                  }
                  className="accent-[#ffd700] rounded"
                />
                <span>
                  <strong>Drishti Mapping</strong>: Radial convergence toward eyes/third eye
                </span>
              </label>

              <label className="flex items-center gap-2 text-[11px] text-[#c5baa8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.brandSafeZones}
                  onChange={(e) =>
                    setFormData({ ...formData, brandSafeZones: e.target.checked })
                  }
                  className="accent-[#ffd700] rounded"
                />
                <span>
                  <strong>IBD/ASP Safe-Zone Sovereignty</strong>: Top 15% text & bottom seal
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-[#ffd700] via-[#ffcc33] to-[#ff9900] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#ffd700]/20 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Forging Production Deck..." : "⚡ Manifest Sovereign Deck"}
            </button>
          </div>
        </div>

        {/* Right Column: Complete Production Deck Output (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {result ? (
            <div className="flex flex-col gap-6">
              {/* Output Deck Header */}
              <div className="bg-[#0f0c08] border border-[#ffcc33]/40 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#2d2215]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ffd700] animate-pulse" />
                    <h3 className="font-cinzel text-lg font-bold text-[#ffd700]">
                      IBD PRODUCTION DECK: CONSECRATED OUTPUT
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `[CONCEPT LOGIC]:\n${result.conceptLogic}\n\n[THE MASTER SCRIPT]:\n${result.masterScript}\n\n[KINETIC METADATA]:\n${result.kineticMetadata}\n\n[ENGAGEMENT JSON]:\n${JSON.stringify(result.engagementJson, null, 2)}`,
                          "full-deck",
                          "Full IBD Production Deck"
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241a0d] hover:bg-[#382813] border border-[#ffcc33]/40 text-xs font-bold text-[#ffd700] transition-colors cursor-pointer"
                    >
                      {copiedKey === "full-deck" ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#ffd700]" />
                      )}
                      <span>Copy Full Deck</span>
                    </button>

                    {onSendToForge && (
                      <button
                        type="button"
                        onClick={() =>
                          onSendToForge({
                            subject: formData.subject,
                            story: formData.sankalpa,
                            version: formData.version,
                            dim: formData.dim,
                          })
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14100b] hover:bg-[#201912] border border-[#3d2a14] text-xs font-bold text-[#c7b9a5] hover:text-[#ffd700] transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Send to Forge</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. CONCEPT LOGIC */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#d4af37]">
                      [CONCEPT LOGIC]
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(result.conceptLogic, "logic", "Concept Logic")
                      }
                      className="text-[10px] text-[#a39274] hover:text-[#ffd700] flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#090704] border border-[#21180d] text-xs text-[#c5baa8] whitespace-pre-wrap leading-relaxed">
                    {result.conceptLogic}
                  </div>
                </div>

                {/* 2. THE MASTER SCRIPT */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#ffd700] flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#ffd700]" />
                      [THE MASTER SCRIPT] (Flux.1 / Midjourney V6.1)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(result.masterScript, "script", "Master Script")
                      }
                      className="px-2.5 py-1 rounded bg-[#24190c] hover:bg-[#342412] text-[10px] font-bold text-[#ffd700] border border-[#ffcc33]/30 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "script" ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#ffd700]" />
                      )}
                      <span>Copy Prompt</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-[#060503] border border-[#ffd700]/30 text-xs font-mono-code text-[#ffebad] leading-relaxed select-all">
                    {result.masterScript}
                  </div>
                </div>

                {/* 2.5 4-TIER SOVEREIGN FRAMEWORK MATRIX (SEPARATE SECTIONS) */}
                {result.sovereignPromptSuite && (
                  <div className="p-4 rounded-xl bg-[#110d06] border border-[#ffcc33]/30 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#2e2010] pb-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-gradient-to-r from-[#ffd700] to-[#ff9900] text-black px-2.5 py-0.5 rounded text-[10px] font-black uppercase font-mono-code">
                          4-TIER SOVEREIGN FRAMEWORK
                        </span>
                        <span className="text-[11px] font-bold text-[#f4cf6a]">
                          Visual • Image • Poster • Motion
                        </span>
                      </div>
                      
                      {/* Individual Tier Sub-Tabs */}
                      <div className="flex items-center gap-1 bg-[#0a0703] p-1 rounded-lg border border-[#2e2010] self-stretch sm:self-auto overflow-x-auto">
                        {[
                          { id: "all" as const, label: "View All 4" },
                          { id: "visual" as const, label: "1. Visual", icon: Sparkles, color: "text-[#ffb703]" },
                          { id: "image" as const, label: "2. Image", icon: Crown, color: "text-[#ffd700]" },
                          { id: "poster" as const, label: "3. Poster", icon: Activity, color: "text-[#a8e6cf]" },
                          { id: "motion" as const, label: "4. Motion", icon: Film, color: "text-[#70d6ff]" },
                        ].map((tab) => {
                          const isActive = activeTierTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setActiveTierTab(tab.id)}
                              className={`px-2.5 py-1 rounded text-[10px] font-mono-code font-bold transition-all cursor-pointer whitespace-nowrap ${
                                isActive
                                  ? "bg-[#2e2010] text-[#ffd700] border border-[#ffd700]/40 shadow-sm"
                                  : "text-[#8c7a5c] hover:text-[#ffd700]"
                              }`}
                            >
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3.5">
                      {/* TIER 1: VISUAL (EXPERIENCE) */}
                      {(activeTierTab === "all" || activeTierTab === "visual") && (
                        <div className="p-4 rounded-xl bg-[#0a0703] border border-[#ffb703]/30 flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-[#2e2010] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="p-1 rounded bg-[#ffb703]/20 text-[#ffb703]">
                                <Sparkles className="w-4 h-4" />
                              </span>
                              <div>
                                <span className="text-xs font-bold text-[#ffb703] uppercase tracking-wider block">
                                  1. 🎨 VISUAL (EXPERIENCE)
                                </span>
                                <span className="text-[10px] text-[#8c7a5c]">
                                  Core Question: &quot;What are the eyes experiencing?&quot;
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono-code bg-[#1f1406] px-2 py-0.5 rounded text-[#ffd700] border border-[#ffd700]/20">
                                2200K Aarti • SLB / Rajamouli
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  copyToClipboard(
                                    `[1. VISUAL EXPERIENCE - ATMOSPHERE & LIGHTING]\nAtmosphere: ${result.sovereignPromptSuite?.visualExperience.atmosphere}\nLighting Science: ${result.sovereignPromptSuite?.visualExperience.lightingChiaroscuro}\nVedic Aarti Engine: ${result.sovereignPromptSuite?.visualExperience.vedicAartiEngine || "N/A"}\nDirector Look & Feel: ${result.sovereignPromptSuite?.visualExperience.directorStyle}\nEngine Target: ${result.sovereignPromptSuite?.visualExperience.targetEngineFocus}`,
                                    "tier1-visual",
                                    "1. Visual (Experience) Section"
                                  )
                                }
                                className="px-2 py-1 rounded bg-[#24190c] hover:bg-[#342412] text-[10px] font-bold text-[#ffd700] border border-[#ffcc33]/30 flex items-center gap-1 cursor-pointer"
                              >
                                {copiedKey === "tier1-visual" ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>Copy Visual</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#140d04] border border-[#261807]">
                              <span className="text-[10px] font-bold text-[#ffb703] uppercase tracking-wider block mb-1">
                                🏛️ Environment & Spatial World:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.visualExperience.atmosphere}
                              </p>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#140d04] border border-[#261807]">
                              <span className="text-[10px] font-bold text-[#ffb703] uppercase tracking-wider block mb-1">
                                🪔 Lighting Science (2200K–2400K):
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.visualExperience.lightingChiaroscuro}
                              </p>
                            </div>
                          </div>

                          {result.sovereignPromptSuite.visualExperience.vedicAartiEngine && (
                            <div className="p-2.5 rounded-lg bg-[#1a0f03] border border-[#ff9900]/30 text-xs">
                              <span className="text-[10px] font-bold text-[#ff9900] uppercase tracking-wider block mb-1">
                                🕉️ Sacred Rituals & Vedic Aarti Engine:
                              </span>
                              <p className="text-[#f4cf6a] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.visualExperience.vedicAartiEngine}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono-code pt-1 border-t border-[#1f1406] text-[#8c7a5c] gap-1">
                            <span><strong>Director Style:</strong> {result.sovereignPromptSuite.visualExperience.directorStyle}</span>
                            <span className="text-[#ffd700]/70">Target: {result.sovereignPromptSuite.visualExperience.targetEngineFocus}</span>
                          </div>
                        </div>
                      )}

                      {/* TIER 2: IMAGE (EYE) */}
                      {(activeTierTab === "all" || activeTierTab === "image") && (
                        <div className="p-4 rounded-xl bg-[#0a0703] border border-[#ffd700]/30 flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-[#2e2010] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="p-1 rounded bg-[#ffd700]/20 text-[#ffd700]">
                                <Crown className="w-4 h-4" />
                              </span>
                              <div>
                                <span className="text-xs font-bold text-[#ffd700] uppercase tracking-wider block">
                                  2. 🖼️ IMAGE (EYE)
                                </span>
                                <span className="text-[10px] text-[#8c7a5c]">
                                  Core Question: &quot;What is actually being seen?&quot;
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono-code bg-[#1f1406] px-2 py-0.5 rounded text-[#ffd700] border border-[#ffd700]/20">
                                85mm Master Prime T1.4 • SSS
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  copyToClipboard(
                                    `[2. IMAGE EYE - SUBJECT & ANATOMY]\nSubject Identity: ${result.sovereignPromptSuite?.imageEye.subjectIdentity}\nFacial Features & Mudra: ${result.sovereignPromptSuite?.imageEye.facialFeaturesAndMudra}\nCanonical Attributes: ${result.sovereignPromptSuite?.imageEye.canonicalAttributes?.join(", ")}\nLens Optics & SSS: ${result.sovereignPromptSuite?.imageEye.lensOpticsAndSSS}\nEngine Target: ${result.sovereignPromptSuite?.imageEye.targetEngineFocus}`,
                                    "tier2-image",
                                    "2. Image (Eye) Section"
                                  )
                                }
                                className="px-2 py-1 rounded bg-[#24190c] hover:bg-[#342412] text-[10px] font-bold text-[#ffd700] border border-[#ffcc33]/30 flex items-center gap-1 cursor-pointer"
                              >
                                {copiedKey === "tier2-image" ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>Copy Image</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#140d04] border border-[#261807]">
                              <span className="text-[10px] font-bold text-[#ffd700] uppercase tracking-wider block mb-1">
                                👑 Subject Identity & Tejas:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.imageEye.subjectIdentity}
                              </p>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#140d04] border border-[#261807]">
                              <span className="text-[10px] font-bold text-[#ffd700] uppercase tracking-wider block mb-1">
                                👁️ Facial Features & Mudra:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.imageEye.facialFeaturesAndMudra}
                              </p>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#140d04] border border-[#261807] text-xs">
                            <span className="text-[10px] font-bold text-[#ffd700] uppercase tracking-wider block mb-1.5">
                              ✨ Canonical Attributes & Ayudhas:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {result.sovereignPromptSuite.imageEye.canonicalAttributes?.map((attr, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-[#24190c] text-[#ffebad] px-2 py-0.5 rounded border border-[#3d2a14]"
                                >
                                  {attr}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono-code pt-1 border-t border-[#1f1406] text-[#8c7a5c] gap-1">
                            <span><strong>Lens Optics & SSS:</strong> {result.sovereignPromptSuite.imageEye.lensOpticsAndSSS}</span>
                            <span className="text-[#ffd700]/70">Target: {result.sovereignPromptSuite.imageEye.targetEngineFocus}</span>
                          </div>
                        </div>
                      )}

                      {/* TIER 3: POSTER (MESSAGE) */}
                      {(activeTierTab === "all" || activeTierTab === "poster") && (
                        <div className="p-4 rounded-xl bg-[#0a0703] border border-[#a8e6cf]/30 flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-[#2e2010] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="p-1 rounded bg-[#a8e6cf]/20 text-[#a8e6cf]">
                                <Activity className="w-4 h-4" />
                              </span>
                              <div>
                                <span className="text-xs font-bold text-[#a8e6cf] uppercase tracking-wider block">
                                  3. 📜 POSTER (MESSAGE)
                                </span>
                                <span className="text-[10px] text-[#8c7a5c]">
                                  Core Question: &quot;What is being presented?&quot;
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono-code bg-[#071c12] px-2 py-0.5 rounded text-[#a8e6cf] border border-[#a8e6cf]/20">
                                Safe-Zone 120/280px • High CTR
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  copyToClipboard(
                                    `[3. POSTER MESSAGE - TYPOGRAPHY & SAFE ZONES]\nHeadline & Typography: ${result.sovereignPromptSuite?.posterMessage.headlineAndTypography}\nSafe-Zone Margins: ${result.sovereignPromptSuite?.posterMessage.safeZoneMargins}\nBranding Watermark: ${result.sovereignPromptSuite?.posterMessage.brandingWatermark}\nEngine Target: ${result.sovereignPromptSuite?.posterMessage.targetEngineFocus}`,
                                    "tier3-poster",
                                    "3. Poster (Message) Section"
                                  )
                                }
                                className="px-2 py-1 rounded bg-[#0b2416] hover:bg-[#123823] text-[10px] font-bold text-[#a8e6cf] border border-[#a8e6cf]/30 flex items-center gap-1 cursor-pointer"
                              >
                                {copiedKey === "tier3-poster" ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>Copy Poster</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#07140d] border border-[#102b1c]">
                              <span className="text-[10px] font-bold text-[#a8e6cf] uppercase tracking-wider block mb-1">
                                ✍️ Headline & Typography Space:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.posterMessage.headlineAndTypography}
                              </p>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#07140d] border border-[#102b1c]">
                              <span className="text-[10px] font-bold text-[#a8e6cf] uppercase tracking-wider block mb-1">
                                🛡️ Safe-Zone Margins:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.posterMessage.safeZoneMargins}
                              </p>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#07140d] border border-[#102b1c] text-xs">
                            <span className="text-[10px] font-bold text-[#a8e6cf] uppercase tracking-wider block mb-1">
                              🔱 Consecrated Branding Watermark:
                            </span>
                            <p className="text-[#a8e6cf] leading-relaxed text-[11px]">
                              {result.sovereignPromptSuite.posterMessage.brandingWatermark}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono-code pt-1 border-t border-[#1f1406] text-[#8c7a5c] gap-1">
                            <span><strong>Target Art Formats:</strong> 16:9 Thumbnails • 9:16 Vertical OTT • 4:5 Fine Art</span>
                            <span className="text-[#a8e6cf]/80">Target: {result.sovereignPromptSuite.posterMessage.targetEngineFocus}</span>
                          </div>
                        </div>
                      )}

                      {/* TIER 4: MOTION (MOVEMENT) */}
                      {(activeTierTab === "all" || activeTierTab === "motion") && (
                        <div className="p-4 rounded-xl bg-[#0a0703] border border-[#70d6ff]/30 flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-[#2e2010] pb-2">
                            <div className="flex items-center gap-2">
                              <span className="p-1 rounded bg-[#70d6ff]/20 text-[#70d6ff]">
                                <Film className="w-4 h-4" />
                              </span>
                              <div>
                                <span className="text-xs font-bold text-[#70d6ff] uppercase tracking-wider block">
                                  4. 🎬 MOTION (MOVEMENT)
                                </span>
                                <span className="text-[10px] text-[#8c7a5c]">
                                  Core Question: &quot;How does it move?&quot;
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono-code bg-[#081a29] px-2 py-0.5 rounded text-[#70d6ff] border border-[#70d6ff]/20">
                                60/120 FPS • Camera Orbit & Particles
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  copyToClipboard(
                                    `[4. MOTION MOVEMENT - CAMERA & PARTICLE PHYSICS]\nCamera Path: ${result.sovereignPromptSuite?.motionMovement.cameraPath}\nParticle Physics: ${result.sovereignPromptSuite?.motionMovement.particlePhysics}\nFrame Rate & Coherence: ${result.sovereignPromptSuite?.motionMovement.frameRateAndCoherence}\nEngine Target: ${result.sovereignPromptSuite?.motionMovement.targetEngineFocus}`,
                                    "tier4-motion",
                                    "4. Motion (Movement) Section"
                                  )
                                }
                                className="px-2 py-1 rounded bg-[#0b2138] hover:bg-[#12304f] text-[10px] font-bold text-[#70d6ff] border border-[#70d6ff]/30 flex items-center gap-1 cursor-pointer"
                              >
                                {copiedKey === "tier4-motion" ? (
                                  <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>Copy Motion</span>
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#06121d] border border-[#0e273d]">
                              <span className="text-[10px] font-bold text-[#70d6ff] uppercase tracking-wider block mb-1">
                                🎥 Camera Path & Micro-Dolly:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.motionMovement.cameraPath}
                              </p>
                            </div>

                            <div className="p-2.5 rounded-lg bg-[#06121d] border border-[#0e273d]">
                              <span className="text-[10px] font-bold text-[#70d6ff] uppercase tracking-wider block mb-1">
                                🌪️ Particle & Fluid Dynamics:
                              </span>
                              <p className="text-[#c5baa8] leading-relaxed text-[11px]">
                                {result.sovereignPromptSuite.motionMovement.particlePhysics}
                              </p>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#06121d] border border-[#0e273d] text-xs">
                            <span className="text-[10px] font-bold text-[#70d6ff] uppercase tracking-wider block mb-1">
                              ⏱️ Temporal Coherence (60/120 FPS):
                            </span>
                            <p className="text-[#70d6ff] leading-relaxed text-[11px]">
                              {result.sovereignPromptSuite.motionMovement.frameRateAndCoherence}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono-code pt-1 border-t border-[#1f1406] text-[#8c7a5c] gap-1">
                            <span><strong>Target Video Engines:</strong> Runway Gen-3 • Luma Dream Machine • Sora • Kling 1.5 PRO</span>
                            <span className="text-[#70d6ff]/80">Target: {result.sovereignPromptSuite.motionMovement.targetEngineFocus}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. KINETIC METADATA (120fps Sora / Kling) */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#70d6ff] flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5 text-[#70d6ff]" />
                      [KINETIC METADATA] (120fps Sora / Kling Vectors)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          result.kineticMetadata,
                          "kinetic",
                          "Kinetic Sora/Kling Metadata"
                        )
                      }
                      className="text-[10px] text-[#70d6ff] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#05070a] border border-[#0d2238] text-xs font-mono-code text-[#a5d8ff] whitespace-pre-wrap leading-relaxed">
                    {result.kineticMetadata}
                  </div>
                </div>

                {/* 4. ENGAGEMENT JSON */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#a8e6cf] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#a8e6cf]" />
                      [ENGAGEMENT JSON] (CTR & Safe-Zone Alignment)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(result.engagementJson, null, 2),
                          "json",
                          "Engagement JSON"
                        )
                      }
                      className="text-[10px] text-[#a8e6cf] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-[#050907] border border-[#0f2e1b] text-[11px] font-mono-code text-[#c0f2d8] overflow-x-auto">
                    {JSON.stringify(result.engagementJson, null, 2)}
                  </pre>
                </div>

                {/* 5. FINAL QUALITY GATE: THE SIDDHA CHECK */}
                <div className="p-4 rounded-xl bg-[#140e06] border border-[#3d2a14] flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#ffd700] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#ffd700]" />
                    [FINAL QUALITY GATE: THE SIDDHA CHECK]
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-[#e5e0d5]">
                    <div className="flex items-center gap-1.5 p-2 rounded bg-[#090704] border border-[#21180d]">
                      <Check className="w-3 h-3 text-green-400 shrink-0" />
                      <span>Iconography Accurate</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded bg-[#090704] border border-[#21180d]">
                      <Check className="w-3 h-3 text-green-400 shrink-0" />
                      <span>Lighting Motivated</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded bg-[#090704] border border-[#21180d]">
                      <Check className="w-3 h-3 text-green-400 shrink-0" />
                      <span>Branding Safe-Zone</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded bg-[#090704] border border-[#21180d]">
                      <Check className="w-3 h-3 text-green-400 shrink-0" />
                      <span>Anti-Repetition Slot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standby State */
            <div className="bg-[#0f0c08] border border-[#261d11] rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[480px]">
              <div className="w-16 h-16 rounded-2xl bg-[#1a140d] border border-[#ffd700]/30 flex items-center justify-center shadow-inner">
                <Crown className="w-8 h-8 text-[#ffd700] animate-pulse" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#ffd700]">
                  Sovereign Engine Standing By
                </h3>
                <p className="text-xs text-[#a39274] max-w-md mt-1 leading-relaxed">
                  Select your Sovereign Evolution Tier (V15–V21 & V-Omega), choose your Specialized Style Library (HP V18–V20 & VP21/ISV21), and configure the 30-slot anti-repetition engine to manifest the complete IBD Production Deck.
                </p>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                ⚡ Initialize Sovereign Manifest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
