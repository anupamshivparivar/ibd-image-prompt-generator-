import React, { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Tv,
  Smartphone,
  Flame,
  Crown,
  Heart,
  Volume2,
  Share2,
  ShieldCheck,
  Award,
  Layers,
  BookOpen,
  Feather,
  Sun,
  Eye,
  CheckCircle2,
  Download,
  Layout,
  Palette,
} from "lucide-react";
import {
  KRISHNA_SUVICHAR_DATA,
  KRISHNA_CATEGORIES,
  KrishnaSuvicharItem,
} from "../data/krishnaSuvicharData";
import { runWithSoloLock } from "../utils/soloRunLock";
import { SacredCardPngDownloader } from "./SacredCardPngDownloader";
import { SacredCardData } from "../utils/sacredCardCanvas";

interface KrishnaSuvicharViewProps {
  customApiKey?: string;
  onNotify?: (msg: string) => void;
  onSendToForge?: (customReq: any) => void;
}

export const KrishnaSuvicharView: React.FC<KrishnaSuvicharViewProps> = ({
  customApiKey,
  onNotify,
  onSendToForge,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Non-repetitive shuffle queue state
  const [seenHistory, setSeenHistory] = useState<string[]>([]);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"visual" | "pngcard" | "script" | "branding" | "json">("visual");
  const [promptStyle, setPromptStyle] = useState<"master" | "suvicharOverlay" | "cleanArt" | "videoPrompt">("master");

  // Filter dataset based on selected category & search
  const filteredList = useMemo(() => {
    return KRISHNA_SUVICHAR_DATA.filter((item) => {
      const matchCat =
        selectedCategory === "ALL" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.titleHindi.toLowerCase().includes(q) ||
        item.suvicharHindi.toLowerCase().includes(q) ||
        (item.shlokaSanskrit && item.shlokaSanskrit.toLowerCase().includes(q)) ||
        item.englishMeaning.toLowerCase().includes(q) ||
        item.lifeLessonHindi.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Initialize/refresh non-repetitive shuffle array whenever filtered list changes
  useEffect(() => {
    if (filteredList.length > 0) {
      const indices = filteredList.map((_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledOrder(indices);
      setCurrentIndex(0);
    }
  }, [filteredList.length, selectedCategory]);

  const currentItem: KrishnaSuvicharItem =
    filteredList[currentIndex] || KRISHNA_SUVICHAR_DATA[0];

  const sacredCardData: SacredCardData = useMemo(() => {
    return {
      type: "krishna_suvichar",
      title: `श्री कृष्ण वाणी • ${currentItem.titleHindi}`,
      categoryOrChapter: `KRISHNA SUVICHAR • ${currentItem.category}`,
      shlokaSanskrit: currentItem.shlokaSanskrit,
      hindiText: currentItem.suvicharHindi,
      englishText: currentItem.englishMeaning,
      watermarkText: currentItem.channelBranding.watermarkText,
      handle: currentItem.channelBranding.handle,
      sealText: currentItem.channelBranding.sealText,
      iconType: "feather",
    };
  }, [currentItem]);

  // All suvichar slides for 1 to 10 batch export
  const allSuvicharSlidesData: SacredCardData[] = useMemo(() => {
    return filteredList.map((item) => ({
      type: "krishna_suvichar",
      title: `श्री कृष्ण वाणी • ${item.titleHindi}`,
      categoryOrChapter: `KRISHNA SUVICHAR • ${item.category}`,
      shlokaSanskrit: item.shlokaSanskrit,
      hindiText: item.suvicharHindi,
      englishText: item.englishMeaning,
      watermarkText: item.channelBranding.watermarkText,
      handle: item.channelBranding.handle,
      sealText: item.channelBranding.sealText,
      iconType: "feather",
    }));
  }, [filteredList]);

  // Track seen items for non-repetitive cycle guarantee
  useEffect(() => {
    if (currentItem && !seenHistory.includes(currentItem.id)) {
      setSeenHistory((prev) => [...prev, currentItem.id]);
    }
  }, [currentItem?.id]);

  const handleNextNonRepetitive = () => {
    if (filteredList.length <= 1) return;
    
    // Find next index from shuffled order that hasn't been seen yet, or wrap around
    const nextIdx = (currentIndex + 1) % filteredList.length;
    setCurrentIndex(nextIdx);
    if (onNotify) {
      onNotify(`Loaded Suvichar #${nextIdx + 1} • ${filteredList[nextIdx].titleHindi}`);
    }
  };

  const handlePrev = () => {
    if (filteredList.length <= 1) return;
    const prevIdx = (currentIndex - 1 + filteredList.length) % filteredList.length;
    setCurrentIndex(prevIdx);
  };

  const handleShuffleFresh = () => {
    if (filteredList.length <= 1) return;
    // Pick random index different from current
    let randomIdx = Math.floor(Math.random() * filteredList.length);
    if (randomIdx === currentIndex) {
      randomIdx = (currentIndex + 1) % filteredList.length;
    }
    setCurrentIndex(randomIdx);
    if (onNotify) {
      onNotify(`✨ Shuffled Fresh: ${filteredList[randomIdx].titleHindi}`);
    }
  };

  const copyToClipboard = (text: string, typeKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(typeKey);
    setTimeout(() => setCopiedType(null), 2500);
    if (onNotify) {
      onNotify(`Copied ${typeKey} to clipboard!`);
    }
  };

  // Dynamic prompt generation based on active prompt style
  const activePromptText = useMemo(() => {
    if (promptStyle === "master") {
      return currentItem.imagePrompt916;
    }
    if (promptStyle === "suvicharOverlay") {
      return `Vertical 9:16 sacred Devanagari typography quote card in radiant gold calligraphy on a dark translucent crystal glass plaque. Title: "${currentItem.titleHindi}". Main Krishna Suvichar Quote: "${currentItem.suvicharHindi}". Sanskrit Shloka Verse: "${currentItem.shlokaSanskrit || ''}". English translation: "${currentItem.englishMeaning}". Spiritual glowing aura, falling golden lotus petals, divine peacock feather motif at top, sacred Vedic borders. 8k vector typography, ultra-high resolution rendering. --ar 9:16 --v 6.1`;
    }
    if (promptStyle === "cleanArt") {
      return `Vertical 9:16 cinematic sacred fine-art portrait of Lord Krishna. Theme: ${currentItem.visualTheme}. Mood: ${currentItem.mood}. Lighting: ${currentItem.lighting}. Intricate yellow pitambara silk drapery, divine peacock feather softly glowing in crown, transcendental calm expression. 8k photorealistic digital painting, volumetric rays, cinematic depth of field, clean composition with central negative space. --ar 9:16 --no text, no watermark, no letters, no words --v 6.1`;
    }
    if (promptStyle === "videoPrompt") {
      return `Cinematic 9:16 vertical video shot. Camera slowly pushes in on Lord Krishna in ${currentItem.visualTheme}. Floating glowing golden dust motes, radiant peacock feather subtly shimmering in ${currentItem.lighting}. On-screen animated subtitle text dynamically reveals in radiant gold Devanagari calligraphy: "${currentItem.suvicharHindi}". Devotional sacred tone, 60fps, 4k ultra-detailed.`;
    }
    return currentItem.imagePrompt916;
  }, [currentItem, promptStyle]);

  const fullShortsScript = `🎬 IBD SHORTS SCRIPT (9:16 VERTICAL REEL)
==============================================
CHANNEL: ${currentItem.channelBranding.channelName} (${currentItem.channelBranding.handle})
SEAL: ${currentItem.channelBranding.sealText}
THEME: ${currentItem.category} — ${currentItem.titleHindi}
AUDIO: ${currentItem.channelBranding.audioTrackRecommendation}

[00:00 - 00:03] 🎯 HOOK (TRANSIT TO DIVINE DARSHAN):
Visual: Vertical 9:16 8K Cinematic Shot of Lord Krishna with glowing Mor Pankh.
On-Screen Text: "⚡ ${currentItem.titleHindi}"
Voiceover: "क्या आप जानते हैं कि जब मन अशांत हो, तो श्री कृष्ण क्या कहते हैं?"

[00:03 - 00:15] 📜 SHASTRA VANI & SUVICHAR:
Visual: Slow camera zoom into Krishna's compassionate eyes & Abhaya Mudra.
On-Screen Shloka: ${currentItem.shlokaSanskrit || ""}
Voiceover / Subtitles: "${currentItem.suvicharHindi}"

[00:15 - 00:25] 💡 PRACTICAL LIFE LESSON:
Visual: Warm golden sunbeams breaking through forest canopy or Kurukshetra chariot.
Voiceover: "${currentItem.lifeLessonHindi} — ${currentItem.practicalAction}"

[00:25 - 00:30] 🕉️ CALL TO DEVOTION & SEAL:
On-Screen Overlay: "${currentItem.channelBranding.bottomTagline}"
Watermark: "${currentItem.channelBranding.watermarkText}"
Studio Consecrated Mark: "${currentItem.channelBranding.sealText}"
Voiceover: "कमेंट में 'जय श्री कृष्णा' लिखें और इस विचार को अपने प्रियजनों से शेयर करें।"
`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Studio Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#120a21] via-[#1a0e30] to-[#0d0718] border border-amber-400/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0d0718] rounded-[14px] flex items-center justify-center text-amber-300">
              <Feather className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-300">
                Krishna Suvichar Studio
              </h2>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono">
                9:16 SHORTS
              </span>
              <span className="bg-purple-900/60 border border-purple-500/40 text-purple-200 text-[10px] font-mono px-2 py-0.5 rounded-full">
                Non-Repetitive Bank
              </span>
            </div>
            <p className="text-xs text-[#c9b89d] mt-0.5">
              Geeta Updesh, Divine Life Lessons & Consecrated 9:16 Channel Branding
            </p>
          </div>
        </div>

        {/* Channel Branding Badge */}
        <div className="flex items-center gap-2 z-10">
          <div className="px-3.5 py-2 rounded-2xl bg-[#1d1233] border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>IBD CONSECRATED SEAL</span>
          </div>
        </div>
      </div>

      {/* TOP CONTROLS: 1-CLICK CATEGORY SELECTORS */}
      <div className="bg-[#0b0812] p-4 rounded-2xl border border-[#261a3d] space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Select Suvichar Category:</span>
          </span>
          <span className="text-[10px] font-mono text-purple-300">
            {filteredList.length} Suvichar Available • Progress: {seenHistory.length}/{KRISHNA_SUVICHAR_DATA.length} Viewed
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {KRISHNA_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 border-yellow-300 shadow-md shadow-amber-500/20 scale-[1.02]"
                    : "bg-[#160d26] hover:bg-[#23153d] border-[#311f52] text-[#d6c9e8]"
                }`}
              >
                {cat === "ALL" ? "🌟 ALL SUVICHAR" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* WORKSTATION GRID: PREVIEW (9:16) + SUVICHAR CARD + 1-CLICK GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 9:16 LIVE MOBILE SHORTS / REEL PREVIEW */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-1.5 self-start">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>9:16 Live Shorts / Reels Frame</span>
          </div>

          {/* Realistic Mobile Frame */}
          <div className="w-full max-w-[320px] aspect-[9/16] rounded-3xl bg-gradient-to-b from-[#180e2e] via-[#120824] to-[#090412] border-2 border-amber-400/50 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Background Gold/Purple Glow */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />

            {/* Top Channel Watermark & Header */}
            <div className="z-10 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-300 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30">
                <span className="truncate">{currentItem.channelBranding.watermarkText}</span>
                <span className="text-[9px] text-amber-400/80">{currentItem.channelBranding.handle}</span>
              </div>
              <div className="text-center pt-1">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-amber-400/90 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/20">
                  {currentItem.category}
                </span>
              </div>
            </div>

            {/* Center: Krishna Shloka & Suvichar Typography */}
            <div className="z-10 text-center space-y-2.5 my-auto px-1">
              <div className="w-10 h-10 mx-auto rounded-full bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/20">
                <Feather className="w-5 h-5 text-amber-300" />
              </div>
              <h4 className="font-cinzel text-base font-bold text-amber-300 leading-tight">
                {currentItem.titleHindi}
              </h4>
              
              {currentItem.shlokaSanskrit && (
                <div className="text-[11px] font-serif text-amber-200/90 italic bg-black/40 p-2 rounded-xl border border-amber-500/20 leading-relaxed">
                  “{currentItem.shlokaSanskrit}”
                </div>
              )}

              <div className="text-xs font-medium text-stone-100 leading-relaxed bg-gradient-to-b from-black/60 to-black/80 p-2.5 rounded-xl border border-amber-400/40 shadow-inner">
                {currentItem.suvicharHindi}
              </div>

              <div className="text-[10px] text-amber-300/90 font-mono italic">
                “{currentItem.englishMeaning}”
              </div>
            </div>

            {/* Bottom Channel Consecrated Seal & Audio Line */}
            <div className="z-10 space-y-1.5">
              <div className="bg-black/60 backdrop-blur-md p-2 rounded-xl border border-amber-400/30 text-center space-y-1">
                <div className="text-[10px] font-bold text-amber-300 font-mono">
                  {currentItem.channelBranding.bottomTagline}
                </div>
                <div className="text-[8px] font-mono text-stone-400 truncate">
                  🎵 {currentItem.channelBranding.audioTrackRecommendation}
                </div>
                <div className="text-[8px] font-mono font-black text-amber-400 uppercase tracking-widest border-t border-amber-500/20 pt-0.5">
                  {currentItem.channelBranding.sealText}
                </div>
              </div>
            </div>
          </div>

          {/* 1-Click Carousel / Navigation Buttons */}
          <div className="flex items-center gap-2 mt-4 w-full max-w-[320px]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredList.length <= 1}
              className="flex-1 py-2.5 rounded-xl bg-[#160d26] hover:bg-[#251540] border border-[#311f52] text-xs font-bold text-[#d6c9e8] flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={handleShuffleFresh}
              className="px-3 py-2.5 rounded-xl bg-[#2b1747] hover:bg-[#3b2061] border border-amber-400/40 text-xs font-bold text-amber-300 flex items-center justify-center gap-1 cursor-pointer transition-all"
              title="Shuffle Fresh Non-Repetitive Suvichar"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextNonRepetitive}
              disabled={filteredList.length <= 1}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-xs font-black text-stone-950 flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md shadow-amber-500/20"
            >
              <span>Next Suvichar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Direct PNG Card Download Action Banner */}
          <div className="w-full max-w-[320px] mt-3 p-3 rounded-2xl bg-[#170e28] border border-amber-400/40 space-y-2 text-center">
            <div className="text-[11px] font-mono font-bold text-amber-300 flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Card PNG Export</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("pngcard")}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:brightness-110 text-stone-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 transition-all"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Download 9:16 / 4:5 PNG (8 Themes)</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SUVICHAR DETAILS, 9:16 PROMPT & EXPORTS */}
        <div className="lg:col-span-7 space-y-5">
          {/* Action Tabs: Visual 9:16 Prompt / PNG Card / Full Shorts Script / Channel Branding / JSON */}
          <div className="flex items-center justify-between border-b border-[#2b1f42] pb-2 flex-wrap gap-2">
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: "visual", label: "🎨 9:16 Image Prompt" },
                { id: "pngcard", label: "📥 PNG Download (9:16 & 4:5)" },
                { id: "script", label: "🎬 Shorts Script" },
                { id: "branding", label: "🏷️ Channel Branding" },
                { id: "json", label: "📋 Metadata JSON" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20 font-black"
                      : "bg-[#140b24] hover:bg-[#201238] text-[#c9b8db]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-[11px] font-mono text-amber-400 font-bold">
              #{currentIndex + 1} of {filteredList.length}
            </div>
          </div>

          {/* Active Card Content */}
          {activeTab === "visual" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Dedicated Embedded Suvichar Calligraphy & Text Overlay Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1b1030] via-[#241342] to-[#140b24] border border-amber-400/50 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wide">
                    <Feather className="w-4 h-4 text-amber-400" />
                    <span>📜 Embedded Sacred Suvichar & Typography Details</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `"${currentItem.suvicharHindi}"\n\n— श्री कृष्ण वाणी (${currentItem.titleHindi})`,
                          "suvicharOnly"
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#2f1952] hover:bg-[#3f226e] border border-amber-400/40 text-[11px] font-mono text-amber-300 flex items-center gap-1 cursor-pointer transition-all"
                    >
                      {copiedType === "suvicharOnly" ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy Suvichar Text</span>
                    </button>
                    {currentItem.shlokaSanskrit && (
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            `📿 श्लोक: ${currentItem.shlokaSanskrit}\n📜 भावार्थ: ${currentItem.shlokaMeaningHindi || currentItem.englishMeaning}`,
                            "shlokaOnly"
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-[#2f1952] hover:bg-[#3f226e] border border-amber-400/40 text-[11px] font-mono text-amber-300 flex items-center gap-1 cursor-pointer transition-all"
                      >
                        {copiedType === "shlokaOnly" ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>Copy Shloka</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-amber-500/20 space-y-1.5">
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <span>🕉️ {currentItem.titleHindi}</span>
                    <span className="text-[10px] text-stone-400 font-mono">({currentItem.category})</span>
                  </div>
                  <div className="text-sm font-medium text-stone-100 leading-relaxed font-sans">
                    “{currentItem.suvicharHindi}”
                  </div>
                  {currentItem.shlokaSanskrit && (
                    <div className="text-xs font-serif text-amber-200/90 italic pt-0.5 border-t border-amber-500/10">
                      संस्कृत श्लोक: “{currentItem.shlokaSanskrit}”
                    </div>
                  )}
                  <div className="text-[11px] text-[#b8a9cc] font-sans">
                    🇬🇧 <span className="italic">{currentItem.englishMeaning}</span>
                  </div>
                </div>
              </div>

              {/* 9:16 Prompt Style Switcher */}
              <div className="flex items-center gap-1.5 bg-[#0e071c] p-1.5 rounded-xl border border-[#271743] flex-wrap">
                <span className="text-[10px] font-mono font-bold text-[#9d8bb3] uppercase px-2">Prompt Style:</span>
                {[
                  { id: "master", label: "🌟 Master (with Suvichar & Shloka)" },
                  { id: "suvicharOverlay", label: "✍️ Typography Calligraphy Banner" },
                  { id: "cleanArt", label: "🖼️ Clean Art (No Text)" },
                  { id: "videoPrompt", label: "🎬 AI Video Motion Prompt" },
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setPromptStyle(style.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      promptStyle === style.id
                        ? "bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-400/20"
                        : "bg-[#180e2e] hover:bg-[#261548] text-[#c9b8db]"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>

              {/* 9:16 Master Prompt Card */}
              <div className="p-5 rounded-2xl bg-[#0d0718] border border-amber-400/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>
                      {promptStyle === "master" && "Vertical 9:16 Midjourney / Studio Master Prompt (with Suvichar)"}
                      {promptStyle === "suvicharOverlay" && "9:16 Devanagari Gold Typography Calligraphy Prompt"}
                      {promptStyle === "cleanArt" && "9:16 Clean Sacred Artwork Prompt (Background Layer)"}
                      {promptStyle === "videoPrompt" && "9:16 Video Generation & Motion Dynamic Prompt"}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    {promptStyle !== "videoPrompt" && (
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            `/imagine prompt: ${activePromptText}`,
                            "imagine"
                          )
                        }
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#251540] hover:bg-[#341d59] border border-amber-400/40 text-amber-300 text-xs font-mono rounded-lg cursor-pointer transition-all"
                      >
                        {copiedType === "imagine" ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>/imagine format</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(activePromptText, "prompt")
                      }
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-yellow-300 text-stone-950 text-xs font-black rounded-lg cursor-pointer transition-all shadow-md shadow-amber-400/20"
                    >
                      {copiedType === "prompt" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Active Prompt</span>
                    </button>
                    {onSendToForge && (
                      <button
                        type="button"
                        onClick={() =>
                          onSendToForge({
                            topic: `Krishna Suvichar 9:16: ${currentItem.titleHindi}`,
                            prompt: activePromptText,
                            suvichar: currentItem.suvicharHindi,
                            shloka: currentItem.shlokaSanskrit,
                            aspectRatio: "9:16",
                          })
                        }
                        className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-stone-950 text-xs font-black rounded-lg cursor-pointer transition-all shadow-md shadow-orange-500/20"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Send to Forge</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/70 border border-[#2b1f42] text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans font-medium whitespace-pre-wrap select-all">
                  {activePromptText}
                </div>

                {/* Shastra & Visual Metadata Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[10px] font-mono">
                  <div className="p-2 rounded-lg bg-[#180e2e] border border-[#2c1a4f] text-[#c9b8db]">
                    <span className="text-amber-400 font-bold block">VISUAL THEME</span>
                    <span className="truncate block">{currentItem.visualTheme}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#180e2e] border border-[#2c1a4f] text-[#c9b8db]">
                    <span className="text-amber-400 font-bold block">LIGHTING</span>
                    <span className="truncate block">{currentItem.lighting}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#180e2e] border border-[#2c1a4f] text-[#c9b8db] col-span-2 sm:col-span-1">
                    <span className="text-amber-400 font-bold block">ASPECT RATIO</span>
                    <span className="truncate block font-bold text-amber-300">9:16 (Shorts/Reel)</span>
                  </div>
                </div>
              </div>

              {/* Suvichar & Life Lesson Deep Dive Card */}
              <div className="p-5 rounded-2xl bg-[#090510] border border-[#23153d] space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Suvichar & Practical Life Wisdom</span>
                </h4>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-stone-100">
                    {currentItem.suvicharHindi}
                  </div>
                  <div className="text-xs text-[#a99bb8] leading-relaxed">
                    💡 <strong className="text-amber-300">जीवन संदेश:</strong> {currentItem.lifeLessonHindi}
                  </div>
                  <div className="text-xs text-[#a99bb8] leading-relaxed">
                    ⚡ <strong className="text-amber-300">दैनिक अभ्यास (Action):</strong> {currentItem.practicalAction}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `🕉️ ${currentItem.titleHindi}\n\n${currentItem.suvicharHindi}\n\n💡 जीवन संदेश: ${currentItem.lifeLessonHindi}\n\n— ${currentItem.channelBranding.channelName} (${currentItem.channelBranding.handle})`,
                        "text"
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1136] hover:bg-[#2c194f] border border-amber-400/30 text-amber-300 text-xs font-mono cursor-pointer transition-all"
                  >
                    {copiedType === "text" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Text for WhatsApp / Social Post</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `#KrishnaSuvichar #${currentItem.category.replace(/[^a-zA-Z]/g, "")} #BhagavadGita #JaiShriKrishna #IndianBhaktiDhara #Shorts #DailyWisdom`,
                        "hashtags"
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1136] hover:bg-[#2c194f] border border-amber-400/30 text-amber-300 text-xs font-mono cursor-pointer transition-all"
                  >
                    {copiedType === "hashtags" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Shorts Hashtags</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PNG CARD GENERATOR & DOWNLOADER (9:16 & 4:5) */}
          {activeTab === "pngcard" && (
            <div className="animate-in fade-in duration-200">
              <SacredCardPngDownloader
                cardData={sacredCardData}
                allSlidesData={allSuvicharSlidesData}
                defaultAspectRatio="9:16"
                defaultThemeId="kurukshetra_gold"
                onNotify={onNotify}
                fileNamePrefix="Krishna_Suvichar"
                activeSlideIndex={currentIndex}
                onSelectSlideIndex={(idx) => setCurrentIndex(idx)}
              />
            </div>
          )}

          {activeTab === "script" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0d0718] border border-amber-400/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>Complete 30-Second YouTube Shorts / Reel Script</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(fullShortsScript, "script")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-yellow-300 text-stone-950 text-xs font-black rounded-lg cursor-pointer transition-all shadow-md shadow-amber-400/20"
                  >
                    {copiedType === "script" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Full Script</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-black/70 border border-[#2b1f42] text-xs text-amber-200/90 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto scrollbar-thin">
                  {fullShortsScript}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0d0718] border border-amber-400/40 shadow-xl space-y-4">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Channel Branding & Watermark Suite</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-[#160d26] border border-[#2c1a4f] space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Channel Name & Handle
                    </span>
                    <div className="text-stone-200 font-bold">
                      {currentItem.channelBranding.channelName}
                    </div>
                    <div className="text-amber-300/80 text-[11px]">
                      {currentItem.channelBranding.handle}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#160d26] border border-[#2c1a4f] space-y-1">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Top Watermark
                    </span>
                    <div className="text-stone-200 font-bold">
                      {currentItem.channelBranding.watermarkText}
                    </div>
                    <div className="text-[10px] text-stone-400">Position: Top Center / Corner</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#160d26] border border-[#2c1a4f] space-y-1 sm:col-span-2">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Official Consecrated Studio Seal
                    </span>
                    <div className="text-amber-300 font-bold">
                      “{currentItem.channelBranding.sealText}”
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Standardized IBD Production Hallmark
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#160d26] border border-[#2c1a4f] space-y-1 sm:col-span-2">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">
                      Recommended Audio Track
                    </span>
                    <div className="text-stone-200">
                      🎵 {currentItem.channelBranding.audioTrackRecommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "json" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0d0718] border border-amber-400/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Suvichar Production Metadata (JSON)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(currentItem, null, 2),
                        "json"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-[#0d1f0d] hover:bg-[#152e15] text-xs text-[#6abf6a] rounded-lg border border-[#1f4a1f] cursor-pointer"
                  >
                    {copiedType === "json" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>Copy JSON</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-black/80 border border-[#1b2b1b] text-xs text-emerald-300/90 font-mono overflow-x-auto max-h-96 scrollbar-thin">
                  {JSON.stringify(currentItem, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
