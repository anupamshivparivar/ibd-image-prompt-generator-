import React, { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Tv,
  Smartphone,
  Award,
  Bookmark,
  Share2,
  Feather,
  Layers,
  Volume2,
  Compass,
  Flame,
  CheckCircle2,
  RotateCcw,
  Download,
  Layout,
  Palette,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  RAMCHARITMANAS_KAANDS,
  SUNDERKAND_RAMCHARITMANAS_DATA,
  RamcharitmanasKaandId,
  SunderkandItem,
} from "../data/sunderkandRamcharitmanasData";
import { runWithSoloLock } from "../utils/soloRunLock";
import { SacredCardPngDownloader } from "./SacredCardPngDownloader";
import { SacredCardData } from "../utils/sacredCardCanvas";

interface SunderkandRamcharitmanasViewProps {
  customApiKey?: string;
  onNotify?: (msg: string) => void;
  onSendToForge?: (customReq: any) => void;
}

export const SunderkandRamcharitmanasView: React.FC<SunderkandRamcharitmanasViewProps> = ({
  customApiKey,
  onNotify,
  onSendToForge,
}) => {
  const [selectedKaand, setSelectedKaand] = useState<RamcharitmanasKaandId>("SUNDARKAND");
  const [selectedDeity, setSelectedDeity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "chaupai" | "wordbyword" | "pngcard" | "visual916" | "script" | "branding" | "kaandinfo"
  >("chaupai");
  const [promptStyle, setPromptStyle] = useState<"master" | "textOverlay" | "cleanArt" | "videoPrompt">("master");

  // Collect all unique deities
  const allDeities = useMemo(() => {
    const set = new Set<string>();
    SUNDERKAND_RAMCHARITMANAS_DATA.forEach((item) => set.add(item.deityFocus));
    return ["ALL", ...Array.from(set)];
  }, []);

  // Filtered list
  const filteredList = useMemo(() => {
    return SUNDERKAND_RAMCHARITMANAS_DATA.filter((item) => {
      const matchKaand = selectedKaand === "ALL" || item.kaand === selectedKaand;
      const matchDeity = selectedDeity === "ALL" || item.deityFocus === selectedDeity;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.titleHindi.toLowerCase().includes(q) ||
        item.titleEnglish.toLowerCase().includes(q) ||
        item.sacredTextAwadhi.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.bhawarthHindi.toLowerCase().includes(q) ||
        item.englishMeaning.toLowerCase().includes(q) ||
        item.verseNumberOrLabel.toLowerCase().includes(q);

      return matchKaand && matchDeity && matchSearch;
    });
  }, [selectedKaand, selectedDeity, searchQuery]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= filteredList.length) {
      setCurrentIndex(0);
    }
  }, [filteredList.length, currentIndex]);

  const currentItem: SunderkandItem =
    filteredList[currentIndex] || SUNDERKAND_RAMCHARITMANAS_DATA[0];

  const currentKaandInfo = useMemo(() => {
    return RAMCHARITMANAS_KAANDS.find((k) => k.id === currentItem.kaand);
  }, [currentItem.kaand]);

  // Prepare card data for canvas PNG downloader
  const sacredCardData: SacredCardData = useMemo(() => {
    const isHanuman = currentItem.deityFocus === "श्री हनुमान जी";
    return {
      type: currentItem.kaand === "SUNDARKAND" ? "sunderkand" : "ramcharitmanas",
      title: currentItem.titleHindi,
      categoryOrChapter: `${currentKaandInfo?.nameHindi || "श्री रामचरितमानस"} • ${currentItem.verseNumberOrLabel}`,
      shlokaSanskrit: currentItem.sacredTextAwadhi,
      hindiText: currentItem.bhawarthHindi,
      englishText: currentItem.englishMeaning,
      watermarkText: currentItem.channelBranding.watermarkText,
      handle: currentItem.channelBranding.handle,
      sealText: currentItem.channelBranding.sealText,
      iconType: isHanuman ? "hanuman" : "bow",
      showShloka: true,
      showHindi: true,
      showEnglish: true,
      showBranding: true,
      fontSizeScale: "normal",
    };
  }, [currentItem, currentKaandInfo]);

  // All Sunderkand slides for 1 to 10 batch export
  const allSunderkandSlidesData: SacredCardData[] = useMemo(() => {
    return filteredList.map((item) => {
      const isHanuman = item.deityFocus === "श्री हनुमान जी";
      const kaandInfo = RAMCHARITMANAS_KAANDS.find((k) => k.id === item.kaand);
      return {
        type: item.kaand === "SUNDARKAND" ? "sunderkand" : "ramcharitmanas",
        title: item.titleHindi,
        categoryOrChapter: `${kaandInfo?.nameHindi || "श्री रामचरितमानस"} • ${item.verseNumberOrLabel}`,
        shlokaSanskrit: item.sacredTextAwadhi,
        hindiText: item.bhawarthHindi,
        englishText: item.englishMeaning,
        watermarkText: item.channelBranding.watermarkText,
        handle: item.channelBranding.handle,
        sealText: item.channelBranding.sealText,
        iconType: isHanuman ? "hanuman" : "bow",
        showShloka: true,
        showHindi: true,
        showEnglish: true,
        showBranding: true,
        fontSizeScale: "normal",
      };
    });
  }, [filteredList]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (onNotify) onNotify(`Copied ${key} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
  };

  const handleRandom = () => {
    if (filteredList.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * filteredList.length);
    while (nextIdx === currentIndex && filteredList.length > 1) {
      nextIdx = Math.floor(Math.random() * filteredList.length);
    }
    setCurrentIndex(nextIdx);
  };

  const handleSendPromptToForge = (promptText: string) => {
    if (!onSendToForge) return;
    onSendToForge({
      subject: `${currentItem.titleHindi} — Sundarkand & Ramcharitmanas`,
      story: promptText,
      dim: "9:16",
      version: 11,
      targetEngine: "Midjourney v6.1",
      mood: "V-Paratpar / Divine Bhakti Realism",
      lightingStyle: "Brahmamuhurta Saffron & Golden Diya Radiance",
      shastraDetails: [
        "Awadhi Ramcharitmanas Shastra Accuracy",
        "Sanskrit Devanagari Gold Filigree",
        "Saffron Silk & Sacred Tilak Textures",
        "Kodanda Bow & Bajrang Gada Physics",
        "8K Octane Octahedral Polish",
      ],
    });
    if (onNotify) {
      onNotify("Sent Sundarkand Prompt to V10/V11 Forge Studio!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-[#240c02] via-[#381403] to-[#1a0701] border border-[#ff6600]/40 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ff9933]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#d4af37]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 text-xs font-black uppercase tracking-wider rounded-full shadow-md">
                🚩 SRI SUNDARKAND & RAMCHARITMANAS
              </span>
              <span className="px-2.5 py-0.5 bg-black/60 border border-orange-500/40 text-orange-300 text-[11px] font-mono rounded-full font-bold">
                7 काण्ड • पावन रामायण चौपाई
              </span>
              <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-[10px] font-mono rounded-full font-semibold">
                10 BG Variations • 9:16 / 4:5 PNG Card Export
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-100 font-cinzel tracking-tight">
              श्री सुन्दरकाण्ड एवं श्री रामचरितमानस महा-संस्थान
            </h2>
            <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
              गोस्वामी तुलसीदास जी विरचित सम्पूर्ण रामचरितमानस एवं सुन्दरकाण्ड की पावन चौपाइयां, दोहे, छन्द,
              भावार्थ, पदच्छेद, 9:16 Midjourney AI की-आर्ट प्रॉम्ट्स, 60-सेकंड यूट्यूब शॉर्ट्स स्क्रिप्ट्स तथा 10
              दिव्य बैकग्राउंड थीम्स में एचडी पीएनजी कार्ड डाउनलोड।
            </p>
          </div>

          {/* Quick Stats / Action */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("pngcard")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-stone-950 font-black text-xs rounded-xl shadow-lg shadow-orange-500/30 transition-all cursor-pointer border border-amber-300 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>10-Theme PNG Card</span>
            </button>

            <button
              type="button"
              onClick={handleRandom}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-black/60 hover:bg-stone-900 border border-orange-500/40 text-orange-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
              title="Pick random sacred Chaupai"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">यादृच्छिक (Random)</span>
            </button>
          </div>
        </div>

        {/* 7 Kaands Selector Pills */}
        <div className="mt-5 pt-4 border-t border-orange-500/20 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedKaand("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedKaand === "ALL"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 border-amber-300 shadow-md scale-105"
                : "bg-black/40 hover:bg-black/60 border-stone-800 text-stone-300"
            }`}
          >
            🌟 सम्पूर्ण मानस (All Kaands)
          </button>
          {RAMCHARITMANAS_KAANDS.map((kaand) => (
            <button
              key={kaand.id}
              type="button"
              onClick={() => setSelectedKaand(kaand.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedKaand === kaand.id
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 border-amber-300 shadow-md scale-105"
                  : "bg-black/40 hover:bg-black/60 border-stone-800 text-stone-300"
              }`}
            >
              <span>{kaand.icon}</span>
              <span>{kaand.nameHindi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#120a06] border border-[#381c0c] p-3.5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-orange-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="खोजें: हनुमान, शान्तं, लंका दहन, शबरी..."
            className="w-full bg-[#1c0e08] border border-[#4a2410] rounded-xl pl-9 pr-3 py-1.5 text-xs text-amber-100 placeholder-stone-500 focus:outline-none focus:border-orange-500 font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Deity Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider shrink-0 mr-1">
            देवता:
          </span>
          {allDeities.map((deity) => (
            <button
              key={deity}
              type="button"
              onClick={() => setSelectedDeity(deity)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedDeity === deity
                  ? "bg-orange-600 text-white border-orange-400 font-bold"
                  : "bg-black/40 hover:bg-stone-900 border-stone-800 text-stone-400"
              }`}
            >
              {deity}
            </button>
          ))}
        </div>

        {/* Navigation & Count */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-orange-300 font-bold">
            {filteredList.length > 0 ? currentIndex + 1 : 0} / {filteredList.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredList.length <= 1}
              className="p-1.5 rounded-lg bg-[#1c0e08] hover:bg-[#2e170c] border border-[#4a2410] text-amber-300 disabled:opacity-40 cursor-pointer"
              title="Previous Chaupai"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={filteredList.length <= 1}
              className="p-1.5 rounded-lg bg-[#1c0e08] hover:bg-[#2e170c] border border-[#4a2410] text-amber-300 disabled:opacity-40 cursor-pointer"
              title="Next Chaupai"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="bg-[#120a06] border border-[#381c0c] rounded-2xl p-12 text-center text-stone-400 space-y-3">
          <p className="text-lg font-bold text-amber-200">कोई चौपाई या श्लोक नहीं मिला</p>
          <p className="text-xs text-stone-500">कृपया खोज शब्द बदलें या काण्ड फिल्टर रीसेट करें।</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedKaand("ALL");
              setSelectedDeity("ALL");
            }}
            className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            सभी फ़िल्टर साफ़ करें
          </button>
        </div>
      ) : (
        /* Main Workspace: Left 9:16 Card Mock + Right Comprehensive Tabs */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 9:16 Interactive Sacred Card Mock (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-4 shadow-2xl space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                  <span>9:16 LIVE MOBILE MOCKUP</span>
                </span>
                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 border border-orange-400/40 text-[10px] font-mono rounded-full font-bold">
                  {currentItem.verseType}
                </span>
              </div>

              {/* 9:16 Sacred Mobile Frame */}
              <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#2a0e02] via-[#160601] to-[#0a0200] border-2 border-amber-500/50 shadow-2xl p-5 flex flex-col justify-between text-center select-none group">
                {/* Background Aura */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 border border-amber-400/20 rounded-2xl m-1 pointer-events-none" />

                {/* Corner Flourishes */}
                <div className="absolute top-2 left-2 text-amber-400/60 text-xs font-serif">❖</div>
                <div className="absolute top-2 right-2 text-amber-400/60 text-xs font-serif">❖</div>
                <div className="absolute bottom-2 left-2 text-amber-400/60 text-xs font-serif">❖</div>
                <div className="absolute bottom-2 right-2 text-amber-400/60 text-xs font-serif">❖</div>

                {/* Top Watermark & Kaand Badge */}
                <div className="space-y-1.5 pt-1 relative z-10">
                  <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-300 uppercase">
                    {currentItem.channelBranding.watermarkText}
                  </p>
                  <div className="inline-block px-3 py-0.5 bg-black/60 border border-amber-500/40 rounded-full">
                    <p className="text-[9px] font-bold text-amber-200 tracking-wider">
                      {currentKaandInfo?.nameHindi.toUpperCase()} • {currentItem.verseNumberOrLabel}
                    </p>
                  </div>
                </div>

                {/* Center Sacred Icon & Awadhi Verse */}
                <div className="my-auto space-y-3.5 relative z-10 py-2">
                  <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 p-[1px] shadow-lg shadow-orange-500/30 flex items-center justify-center">
                    <div className="w-full h-full bg-[#120702] rounded-full flex items-center justify-center text-lg">
                      {currentItem.deityFocus === "श्री हनुमान जी" ? "🚩" : "🏹"}
                    </div>
                  </div>

                  <h3 className="text-xs md:text-sm font-bold text-amber-200 font-cinzel line-clamp-2 px-1">
                    {currentItem.titleHindi}
                  </h3>

                  {/* Sacred Text Glass Plaque */}
                  <div className="bg-black/70 border border-amber-500/30 rounded-xl p-3 backdrop-blur-sm shadow-inner">
                    <p className="text-xs md:text-[13px] font-bold text-amber-100 font-serif leading-relaxed whitespace-pre-line">
                      {currentItem.sacredTextAwadhi}
                    </p>
                  </div>

                  {/* Short Bhawarth Gist */}
                  <p className="text-[11px] text-stone-300 leading-snug line-clamp-3 italic px-1">
                    "{currentItem.bhawarthHindi}"
                  </p>
                </div>

                {/* Bottom Branding & Seal */}
                <div className="space-y-1 pb-1 relative z-10 border-t border-amber-500/20 pt-2">
                  <p className="text-[10px] font-mono text-amber-400 font-semibold">
                    {currentItem.channelBranding.handle}
                  </p>
                  <p className="text-[8px] font-mono text-stone-500">
                    {currentItem.channelBranding.sealText}
                  </p>
                </div>
              </div>

              {/* Quick Actions Under Mockup */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("pngcard")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 text-xs font-black rounded-xl shadow-md cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentItem.sacredTextAwadhi, "Awadhi Text")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1e1008] hover:bg-[#2e170c] border border-[#4a2410] text-amber-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {copiedKey === "Awadhi Text" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === "Awadhi Text" ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>
            </div>

            {/* Kaand Significance Mini-Card */}
            {currentKaandInfo && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <BookOpen className="w-4 h-4 text-orange-400" />
                  <span>{currentKaandInfo.nameHindi} ({currentKaandInfo.nameEnglish})</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentKaandInfo.significanceHindi}
                </p>
                <div className="text-[10px] font-mono text-orange-400 font-semibold bg-black/40 px-2.5 py-1 rounded-lg border border-orange-500/20">
                  मर्म: {currentKaandInfo.keyTheme}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Tabbed Content Engine (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Tab Navigation Buttons */}
            <div className="bg-[#120a06] border border-[#381c0c] p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-md">
              <button
                type="button"
                onClick={() => setActiveTab("chaupai")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "chaupai"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md font-black"
                    : "bg-[#1a0e08] hover:bg-[#28150c] text-stone-300"
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                <span>चौपाई व भावार्थ</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pngcard")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "pngcard"
                    ? "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-stone-950 shadow-md font-black ring-2 ring-amber-300"
                    : "bg-[#1a0e08] hover:bg-[#28150c] text-amber-300"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>📥 10-Theme PNG Card</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("wordbyword")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "wordbyword"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md font-black"
                    : "bg-[#1a0e08] hover:bg-[#28150c] text-stone-300"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>शब्दार्थ व पदच्छेद</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("visual916")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "visual916"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md font-black"
                    : "bg-[#1a0e08] hover:bg-[#28150c] text-stone-300"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🎨 9:16 AI Prompts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("script")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "script"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md font-black"
                    : "bg-[#1a0e08] hover:bg-[#28150c] text-stone-300"
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>🎬 60s Shorts Script</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("branding")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "branding"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md font-black"
                    : "bg-[#1a0e08] hover:bg-[#28150c] text-stone-300"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>ब्रांडिंग व टैग्स</span>
              </button>
            </div>

            {/* TAB 1: CHAUPAI & BHAWARTH */}
            {activeTab === "chaupai" && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-5 md:p-6 shadow-2xl space-y-6">
                {/* Header Info */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#2e170c]">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-widest">
                      {currentKaandInfo?.nameHindi} • {currentItem.verseNumberOrLabel}
                    </span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-amber-200 font-cinzel">
                      {currentItem.titleHindi}
                    </h2>
                    <p className="text-xs text-stone-400 italic">{currentItem.titleEnglish}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `${currentItem.titleHindi}\n\n${currentItem.sacredTextAwadhi}\n\nभावार्थ:\n${currentItem.bhawarthHindi}\n\nEnglish Translation:\n${currentItem.englishMeaning}`,
                        "Complete Chaupai Data"
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c0e08] hover:bg-[#2d170c] border border-[#4a2410] text-amber-300 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {copiedKey === "Complete Chaupai Data" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "Complete Chaupai Data" ? "Copied!" : "Copy Full Verse"}</span>
                  </button>
                </div>

                {/* Primary Sacred Verse in Large Devanagari */}
                <div className="bg-gradient-to-r from-[#240e02] via-[#1a0801] to-[#240e02] border-2 border-amber-500/40 rounded-2xl p-6 shadow-xl relative text-center">
                  <div className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase mb-2">
                    ॥ मूल पावन पाठ ॥
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-amber-100 font-serif leading-relaxed whitespace-pre-line">
                    {currentItem.sacredTextAwadhi}
                  </p>
                  <p className="text-xs font-mono text-amber-400/80 italic mt-3">
                    {currentItem.transliteration}
                  </p>
                </div>

                {/* Hindi Bhawarth */}
                <div className="space-y-2 bg-[#180e08] border border-[#381c0c] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                    <span>हिन्दी भावार्थ एवं व्याख्या</span>
                  </div>
                  <p className="text-sm md:text-base text-amber-50 leading-relaxed font-sans">
                    {currentItem.bhawarthHindi}
                  </p>
                </div>

                {/* English Spiritual Meaning */}
                <div className="space-y-2 bg-[#180e08] border border-[#381c0c] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Spiritual English Translation & Commentary</span>
                  </div>
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-serif">
                    {currentItem.englishMeaning}
                  </p>
                </div>

                {/* Spiritual Gyan & Practical Life Application */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#241104] to-[#140802] border border-amber-500/30 rounded-2xl p-4 space-y-2">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>आध्यात्मिक मर्म (Spiritual Wisdom)</span>
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {currentItem.spiritualGyan}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#1a1405] to-[#100c02] border border-yellow-500/30 rounded-2xl p-4 space-y-2">
                    <span className="text-[11px] font-bold text-yellow-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                      <span>दैनिक जीवन में उपयोग (Daily Application)</span>
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {currentItem.practicalLifeApplication}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 10-THEME PNG CARD DOWNLOADER */}
            {activeTab === "pngcard" && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2e170c] flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      STUDIO-GRADE EXPORT SUITE
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-amber-200 font-cinzel">
                      10-Theme HD PNG Card Generator
                    </h3>
                    <p className="text-xs text-stone-400">
                      Export in 9:16 (1080x1920 Status/Reels) or 4:5 (1080x1350 Feed/Post) with 10 Sacred Backgrounds.
                    </p>
                  </div>
                </div>

                <SacredCardPngDownloader
                  cardData={sacredCardData}
                  allSlidesData={allSunderkandSlidesData}
                  defaultAspectRatio="9:16"
                  defaultThemeId="ayodhya_saryu_gold"
                  onNotify={onNotify}
                  fileNamePrefix={`Sundarkand_${currentItem.id}`}
                  activeSlideIndex={currentIndex}
                  onSelectSlideIndex={(idx) => setCurrentIndex(idx)}
                />
              </div>
            )}

            {/* TAB 3: WORD BY WORD (PADACHHEDA) */}
            {activeTab === "wordbyword" && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2e170c]">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                      PADACHHEDA & SHABDARTH
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-amber-200 font-cinzel">
                      शब्दार्थ एवं व्याकरण विश्लेषण
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        currentItem.wordByWord
                          .map((w) => `${w.word}: ${w.meaningHindi} (${w.meaningEnglish})`)
                          .join("\n"),
                        "Word-by-Word Meanings"
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c0e08] hover:bg-[#2d170c] border border-[#4a2410] text-amber-300 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {copiedKey === "Word-by-Word Meanings" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "Word-by-Word Meanings" ? "Copied!" : "Copy Words"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentItem.wordByWord.map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1a0e08] border border-[#381c0c] rounded-xl p-3.5 flex flex-col justify-between space-y-1 hover:border-orange-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-amber-300 font-serif">{w.word}</span>
                        <span className="text-[10px] font-mono text-stone-500">#{idx + 1}</span>
                      </div>
                      <p className="text-xs text-amber-100 font-semibold">{w.meaningHindi}</p>
                      <p className="text-[11px] text-stone-400 italic">{w.meaningEnglish}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: 9:16 MIDJOURNEY AI PROMPT SUITE */}
            {activeTab === "visual916" && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-5 md:p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#2e170c] flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                      MIDJOURNEY V6.1 & SDXL ENGINE
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-amber-200 font-cinzel">
                      9:16 Vertical Sacred Key-Art Prompts
                    </h3>
                  </div>

                  {onSendToForge && (
                    <button
                      type="button"
                      onClick={() => handleSendPromptToForge(currentItem.imagePrompt916[promptStyle])}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 text-xs font-black rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                      <span>Send to V10/V11 Forge</span>
                    </button>
                  )}
                </div>

                {/* Prompt Style Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { id: "master", label: "Master 9:16 Art", icon: "👑" },
                      { id: "textOverlay", label: "Text Overlay Card", icon: "📜" },
                      { id: "cleanArt", label: "Clean Sacred Painting", icon: "🎨" },
                      { id: "videoPrompt", label: "60fps Video Motion", icon: "🎥" },
                    ] as const
                  ).map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setPromptStyle(style.id)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        promptStyle === style.id
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 border-amber-300 shadow-md font-black"
                          : "bg-[#180e08] hover:bg-[#25150c] border-[#381c0c] text-stone-300"
                      }`}
                    >
                      <span>{style.icon}</span>
                      <span>{style.label}</span>
                    </button>
                  ))}
                </div>

                {/* Active Prompt Box */}
                <div className="bg-[#180e08] border-2 border-amber-500/40 rounded-2xl p-4 relative space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                      SELECTED PROMPT: {promptStyle.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(currentItem.imagePrompt916[promptStyle], "Prompt Text")
                      }
                      className="flex items-center gap-1 px-2.5 py-1 bg-black/60 hover:bg-black border border-amber-500/40 text-amber-300 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      {copiedKey === "Prompt Text" ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedKey === "Prompt Text" ? "Copied!" : "Copy Prompt"}</span>
                    </button>
                  </div>

                  <p className="text-xs font-mono text-stone-200 leading-relaxed bg-black/70 p-3.5 rounded-xl border border-stone-800 break-words select-all">
                    {currentItem.imagePrompt916[promptStyle]}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: 60-SEC YOUTUBE SHORTS SCRIPT */}
            {activeTab === "script" && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-5 md:p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#2e170c] flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                      YOUTUBE SHORTS & INSTAGRAM REEL SCRIPT
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-amber-200 font-cinzel">
                      60-Second Viral Script & Voiceover Guide
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const fullScript = `🎬 HOOK:\n${currentItem.shortsScript60s.hook}\n\n📍 SCENE 1:\n[Visual]: ${currentItem.shortsScript60s.scene1Visual}\n[Voiceover]: ${currentItem.shortsScript60s.scene1Voiceover}\n\n📍 SCENE 2:\n[Visual]: ${currentItem.shortsScript60s.scene2Visual}\n[Voiceover]: ${currentItem.shortsScript60s.scene2Voiceover}\n\n📍 SCENE 3:\n[Visual]: ${currentItem.shortsScript60s.scene3Visual}\n[Voiceover]: ${currentItem.shortsScript60s.scene3Voiceover}\n\n📢 OUTRO:\n${currentItem.shortsScript60s.outroCallToAction}\n\n🎵 AUDIO:\n${currentItem.shortsScript60s.audioTrackRecommendation}`;
                      copyToClipboard(fullScript, "Shorts Script");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c0e08] hover:bg-[#2d170c] border border-[#4a2410] text-amber-300 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {copiedKey === "Shorts Script" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "Shorts Script" ? "Copied!" : "Copy Full Script"}</span>
                  </button>
                </div>

                {/* Viral Hook */}
                <div className="bg-gradient-to-r from-red-950/60 to-orange-950/60 border border-red-500/40 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-red-300 uppercase tracking-widest">
                    ⚡ 00:00 - 00:05 VIRAL HOOK
                  </span>
                  <p className="text-sm font-bold text-amber-100">
                    "{currentItem.shortsScript60s.hook}"
                  </p>
                </div>

                {/* 3 Main Narrative Scenes */}
                <div className="space-y-3">
                  {[
                    {
                      sceneNum: "1",
                      time: "00:05 - 00:20",
                      vis: currentItem.shortsScript60s.scene1Visual,
                      vo: currentItem.shortsScript60s.scene1Voiceover,
                    },
                    {
                      sceneNum: "2",
                      time: "00:20 - 00:40",
                      vis: currentItem.shortsScript60s.scene2Visual,
                      vo: currentItem.shortsScript60s.scene2Voiceover,
                    },
                    {
                      sceneNum: "3",
                      time: "00:40 - 00:55",
                      vis: currentItem.shortsScript60s.scene3Visual,
                      vo: currentItem.shortsScript60s.scene3Voiceover,
                    },
                  ].map((sc) => (
                    <div key={sc.sceneNum} className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-orange-400">
                          SCENE {sc.sceneNum} ({sc.time})
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">
                        <strong className="text-amber-300">Visual Prompt:</strong> {sc.vis}
                      </p>
                      <p className="text-xs text-stone-200 bg-black/50 p-2.5 rounded-xl border border-stone-800">
                        <strong className="text-orange-400">🎙️ Voiceover:</strong> {sc.vo}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Outro Call to Action & Audio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-amber-400">
                      📢 00:55 - 01:00 OUTRO CTA
                    </span>
                    <p className="text-xs text-stone-200">
                      {currentItem.shortsScript60s.outroCallToAction}
                    </p>
                  </div>
                  <div className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-orange-400">
                      🎵 RECOMMENDED AUDIO
                    </span>
                    <p className="text-xs text-stone-300">
                      {currentItem.shortsScript60s.audioTrackRecommendation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: CHANNEL BRANDING & SOCIAL MEDIA TAGS */}
            {activeTab === "branding" && (
              <div className="bg-[#120a06] border border-[#381c0c] rounded-3xl p-5 md:p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#2e170c]">
                  <div>
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                      INDIAN BHAKTI DHARA METADATA
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-amber-200 font-cinzel">
                      चैनल ब्रांडिंग, सील व हैशटैग्स
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono text-stone-400">Watermark Header:</span>
                    <p className="text-sm font-bold text-amber-300">
                      {currentItem.channelBranding.watermarkText}
                    </p>
                  </div>
                  <div className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono text-stone-400">Channel Handle:</span>
                    <p className="text-sm font-bold text-amber-300 font-mono">
                      {currentItem.channelBranding.handle}
                    </p>
                  </div>
                  <div className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono text-stone-400">Archival Seal:</span>
                    <p className="text-sm font-bold text-amber-300 font-mono">
                      {currentItem.channelBranding.sealText}
                    </p>
                  </div>
                </div>

                {/* Hashtags Suite */}
                <div className="bg-[#180e08] border border-[#381c0c] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Suggested Social Media Hashtags
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          currentItem.channelBranding.suggestedHashtags.join(" "),
                          "Hashtags"
                        )
                      }
                      className="px-2.5 py-1 bg-black/60 hover:bg-black border border-amber-500/40 text-amber-300 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      {copiedKey === "Hashtags" ? "Copied!" : "Copy Hashtags"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentItem.channelBranding.suggestedHashtags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-black/50 border border-orange-500/30 text-orange-300 rounded-full text-xs font-mono font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
