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
  SHIV_MANTRA_CATEGORIES,
  SHIV_MANTRA_DATA,
  ShivMantraCategoryId,
  ShivMantraItem,
} from "../data/shivMantraData";
import { SacredCardPngDownloader } from "./SacredCardPngDownloader";
import {
  SacredCardData,
  BACKGROUND_VARIATIONS,
  SacredAspectRatio,
} from "../utils/sacredCardCanvas";

interface ShivMantraViewProps {
  customApiKey?: string;
  onNotify?: (msg: string) => void;
  onSendToForge?: (customReq: any) => void;
}

export const ShivMantraView: React.FC<ShivMantraViewProps> = ({
  customApiKey,
  onNotify,
  onSendToForge,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ShivMantraCategoryId>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "mantra" | "wordbyword" | "pngcard" | "visual916" | "script" | "branding" | "categoryinfo"
  >("mantra");
  const [promptStyle, setPromptStyle] = useState<"master" | "textOverlay" | "cleanArt" | "videoPrompt">("master");

  // 9:16 Mockup Customization States
  const [previewThemeId, setPreviewThemeId] = useState<string>("kailash_neelkanth_cyan");
  const [previewAspectRatio, setPreviewAspectRatio] = useState<SacredAspectRatio>("9:16");
  const [previewDisplayMode, setPreviewDisplayMode] = useState<"all" | "shloka_hindi" | "shloka_only" | "hindi_english">("all");
  const [previewFontSize, setPreviewFontSize] = useState<"compact" | "normal" | "large">("normal");

  // Filtered list
  const filteredList = useMemo(() => {
    return SHIV_MANTRA_DATA.filter((item) => {
      const matchCat = selectedCategory === "ALL" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.titleHindi.toLowerCase().includes(q) ||
        item.titleEnglish.toLowerCase().includes(q) ||
        item.sacredTextSanskrit.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.bhawarthHindi.toLowerCase().includes(q) ||
        item.englishMeaning.toLowerCase().includes(q) ||
        item.verseNumberOrLabel.toLowerCase().includes(q) ||
        item.deityFocus.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Keep index within bounds
  useEffect(() => {
    if (currentIndex >= filteredList.length) {
      setCurrentIndex(0);
    }
  }, [filteredList.length, currentIndex]);

  const currentItem: ShivMantraItem =
    filteredList[currentIndex] || SHIV_MANTRA_DATA[0];

  const currentCategoryInfo = useMemo(() => {
    return SHIV_MANTRA_CATEGORIES.find((c) => c.id === currentItem.category);
  }, [currentItem.category]);

  const activePreviewTheme = useMemo(() => {
    return (
      BACKGROUND_VARIATIONS.find((t) => t.id === previewThemeId) ||
      BACKGROUND_VARIATIONS[0]
    );
  }, [previewThemeId]);

  // Prepare card data for canvas PNG downloader
  const sacredCardData: SacredCardData = useMemo(() => {
    let iconType: any = "trishul";
    if (currentItem.category === "OM_NAMAH_SHIVAY") iconType = "om";
    else if (currentItem.category === "LINGASHTAKAM") iconType = "lingam";
    else if (currentItem.category === "SHIVA_TANDAVA") iconType = "nataraja";
    else if (currentItem.category === "RUDRASHTAKAM") iconType = "trishul";
    else if (currentItem.category === "PANCHAKSHARA") iconType = "shiva";

    return {
      type: "shiv_mantra",
      title: currentItem.titleHindi,
      categoryOrChapter: `${currentCategoryInfo?.nameHindi || "श्री शिव स्तोत्रम्"} • ${currentItem.verseNumberOrLabel}`,
      shlokaSanskrit: currentItem.sacredTextSanskrit,
      hindiText: currentItem.bhawarthHindi,
      englishText: currentItem.englishMeaning,
      watermarkText: currentItem.channelBranding.watermarkText,
      handle: currentItem.channelBranding.handle,
      sealText: currentItem.channelBranding.sealText,
      iconType: iconType,
      showShloka: previewDisplayMode === "all" || previewDisplayMode === "shloka_hindi" || previewDisplayMode === "shloka_only",
      showHindi: previewDisplayMode === "all" || previewDisplayMode === "shloka_hindi" || previewDisplayMode === "hindi_english",
      showEnglish: previewDisplayMode === "all" || previewDisplayMode === "hindi_english",
      showBranding: true,
      fontSizeScale: previewFontSize,
    };
  }, [currentItem, currentCategoryInfo, previewDisplayMode, previewFontSize]);

  // Prepare all slides data for batch 1 to 10 download
  const allCategorySlidesData: SacredCardData[] = useMemo(() => {
    return filteredList.map((item) => {
      let iconType: any = "trishul";
      if (item.category === "OM_NAMAH_SHIVAY") iconType = "om";
      else if (item.category === "LINGASHTAKAM") iconType = "lingam";
      else if (item.category === "SHIVA_TANDAVA") iconType = "nataraja";
      else if (item.category === "RUDRASHTAKAM") iconType = "trishul";
      else if (item.category === "PANCHAKSHARA") iconType = "shiva";

      const catInfo = SHIV_MANTRA_CATEGORIES.find((c) => c.id === item.category);

      return {
        type: "shiv_mantra",
        title: item.titleHindi,
        categoryOrChapter: `${catInfo?.nameHindi || "श्री शिव स्तोत्रम्"} • ${item.verseNumberOrLabel}`,
        shlokaSanskrit: item.sacredTextSanskrit,
        hindiText: item.bhawarthHindi,
        englishText: item.englishMeaning,
        watermarkText: item.channelBranding.watermarkText,
        handle: item.channelBranding.handle,
        sealText: item.channelBranding.sealText,
        iconType: iconType,
        showShloka: previewDisplayMode === "all" || previewDisplayMode === "shloka_hindi" || previewDisplayMode === "shloka_only",
        showHindi: previewDisplayMode === "all" || previewDisplayMode === "shloka_hindi" || previewDisplayMode === "hindi_english",
        showEnglish: previewDisplayMode === "all" || previewDisplayMode === "hindi_english",
        showBranding: true,
        fontSizeScale: previewFontSize,
      };
    });
  }, [filteredList, previewDisplayMode, previewFontSize]);

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
      subject: `${currentItem.titleHindi} — Sri Shiva Mahamantra & Stotras`,
      story: promptText,
      dim: "9:16",
      version: 11,
      targetEngine: "Midjourney v6.1",
      mood: "V-Paratpar / Supreme Cosmic Shiva Mahashakti",
      lightingStyle: "Mount Kailash Ice-Cyan, Golden Diya & Sacred Vibhuti Glow",
      shastraDetails: [
        "Vedic Sanskrit Shastra Precision",
        "Trishul & Damru Cosmic Vibration",
        "Crescent Moon & Ganga Flowing Locks",
        "Sacred Bhasma Tripundra & Rudraksha Beads",
        "8K Octane Photorealism",
      ],
    });
    if (onNotify) {
      onNotify("Sent Shiva Mantra Prompt to V10/V11 Forge Studio!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-[#071926] via-[#0b2438] to-[#040f17] border border-[#06b6d4]/40 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#06b6d4]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#38bdf8]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 text-stone-950 text-xs font-black uppercase tracking-wider rounded-full shadow-md">
                🔱 SRI SHIVA MAHAMANTRA & STOTRA SUITE
              </span>
              <span className="px-2.5 py-0.5 bg-black/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono rounded-full font-bold">
                ॐ नमः शिवाय • रुद्राष्टकम् • पञ्चाक्षर • लिङ्गाष्टकम् • ताण्डव
              </span>
              <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-[10px] font-mono rounded-full font-semibold">
                10 BG Themes • 9:16 / 4:5 PNG Card Suite
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-amber-100 font-cinzel tracking-tight">
              श्री शिव मंत्र एवं पावन स्तोत्र महा-संस्थान
            </h2>
            <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
              देवाधिदेव महादेव के 5 परम पावन मंत्र एवं स्तोत्र: ॐ नमः शिवाय महामंत्र, गोस्वामी तुलसीदास विरचित श्री रुद्राष्टकम्, आदि शंकराचार्य विरचित शिव पञ्चाक्षर स्तोत्रम्, श्री लिङ्गाष्टकम्, तथा दशानन रावण रचित श्री शिव ताण्डव स्तोत्रम् — पूर्ण पदच्छेद, भावार्थ, 9:16 AI प्रॉम्ट्स, 60s शॉर्ट्स स्क्रिप्ट्स तथा 10 दिव्य थीम्स में HD PNG कार्ड डाउनलोड।
            </p>
          </div>

          {/* Quick Stats / Action */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("pngcard")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-stone-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/30 transition-all cursor-pointer border border-cyan-300 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>10-Theme PNG Card</span>
            </button>

            <button
              type="button"
              onClick={handleRandom}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-black/60 hover:bg-stone-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
              title="Pick random sacred Shiv Shloka"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">यादृच्छिक (Random)</span>
            </button>
          </div>
        </div>

        {/* 5 Shiv Categories Selector Pills */}
        <div className="mt-5 pt-4 border-t border-cyan-500/20 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedCategory === "ALL"
                ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 border-cyan-300 shadow-md scale-105 font-black"
                : "bg-black/40 hover:bg-black/60 border-stone-800 text-stone-300"
            }`}
          >
            🌟 समस्त शिव स्तोत्र (All)
          </button>
          {SHIV_MANTRA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 border-cyan-300 shadow-md scale-105 font-black"
                  : "bg-black/40 hover:bg-black/60 border-stone-800 text-stone-300"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameHindi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#09151e] border border-[#132d3e] p-3.5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="खोजें: महाकाल, ताण्डव, नमामीशमीशान, लिंग, नागेन्द्र..."
            className="w-full bg-[#0d202d] border border-[#1a3c53] rounded-xl pl-9 pr-3 py-1.5 text-xs text-cyan-100 placeholder-stone-500 focus:outline-none focus:border-cyan-500 font-sans"
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

        {/* Current Active Category Pill Indicator */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider shrink-0 mr-1">
            स्तोत्र वर्ग:
          </span>
          <span className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs font-bold rounded-lg whitespace-nowrap">
            {currentCategoryInfo?.nameHindi}
          </span>
          <span className="text-[11px] font-mono text-stone-400 hidden sm:inline">
            ({currentItem.meterOrChhanda})
          </span>
        </div>

        {/* Navigation & Count */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-cyan-300 font-bold">
            {filteredList.length > 0 ? currentIndex + 1 : 0} / {filteredList.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredList.length <= 1}
              className="p-1.5 rounded-lg bg-[#0d202d] hover:bg-[#153144] border border-[#1a3c53] text-cyan-300 disabled:opacity-40 cursor-pointer"
              title="Previous Shloka"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={filteredList.length <= 1}
              className="p-1.5 rounded-lg bg-[#0d202d] hover:bg-[#153144] border border-[#1a3c53] text-cyan-300 disabled:opacity-40 cursor-pointer"
              title="Next Shloka"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredList.length === 0 ? (
        <div className="bg-[#09151e] border border-[#132d3e] rounded-2xl p-12 text-center text-stone-400 space-y-3">
          <p className="text-lg font-bold text-cyan-200">कोई श्लोक या मंत्र नहीं मिला</p>
          <p className="text-xs text-stone-500">कृपया खोज शब्द बदलें या स्तोत्र वर्ग फिल्टर रीसेट करें।</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            सभी फ़िल्टर साफ़ करें
          </button>
        </div>
      ) : (
        /* Main Workspace: Left 9:16 Card Mock + Right Comprehensive Tabs */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 9:16 Interactive Sacred Card Mock (5 Cols on large screens) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-4 shadow-2xl space-y-3.5">
              {/* Mockup Header & Controls */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{previewAspectRatio === "9:16" ? "9:16 LIVE MOBILE MOCKUP" : "4:5 FEED PORTRAIT MOCKUP"}</span>
                </span>
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono rounded-full font-bold">
                  {currentItem.deityFocus}
                </span>
              </div>

              {/* Ratio & Display Controls Toolbar */}
              <div className="space-y-2 bg-[#05111a] p-2.5 rounded-2xl border border-cyan-900/40">
                {/* Ratio & Font Size Row */}
                <div className="flex items-center justify-between gap-1.5 flex-wrap">
                  {/* Aspect Ratio Switcher */}
                  <div className="flex items-center gap-1 bg-[#091b28] p-1 rounded-xl border border-cyan-500/30">
                    <button
                      type="button"
                      onClick={() => setPreviewAspectRatio("9:16")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-all cursor-pointer ${
                        previewAspectRatio === "9:16"
                          ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-stone-950 font-black shadow-sm"
                          : "text-stone-300 hover:text-white"
                      }`}
                    >
                      9:16 Shorts
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewAspectRatio("4:5")}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-all cursor-pointer ${
                        previewAspectRatio === "4:5"
                          ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-stone-950 font-black shadow-sm"
                          : "text-stone-300 hover:text-white"
                      }`}
                    >
                      4:5 Feed
                    </button>
                  </div>

                  {/* Font Size Scaling */}
                  <div className="flex items-center gap-1 bg-[#091b28] p-1 rounded-xl border border-cyan-500/30">
                    {(["compact", "normal", "large"] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setPreviewFontSize(sz)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold capitalize transition-all cursor-pointer ${
                          previewFontSize === sz
                            ? "bg-cyan-500 text-stone-950 font-black"
                            : "text-stone-400 hover:text-cyan-200"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Display Mode Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setPreviewDisplayMode("all")}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer border ${
                      previewDisplayMode === "all"
                        ? "bg-cyan-500/20 text-cyan-200 border-cyan-400 font-bold"
                        : "bg-black/40 text-stone-400 border-transparent hover:text-stone-300"
                    }`}
                  >
                    🌟 All (Shloka+Hindi+Eng)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDisplayMode("shloka_hindi")}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer border ${
                      previewDisplayMode === "shloka_hindi"
                        ? "bg-cyan-500/20 text-cyan-200 border-cyan-400 font-bold"
                        : "bg-black/40 text-stone-400 border-transparent hover:text-stone-300"
                    }`}
                  >
                    📜 Shloka + Hindi
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDisplayMode("shloka_only")}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer border ${
                      previewDisplayMode === "shloka_only"
                        ? "bg-cyan-500/20 text-cyan-200 border-cyan-400 font-bold"
                        : "bg-black/40 text-stone-400 border-transparent hover:text-stone-300"
                    }`}
                  >
                    🔱 Shloka Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDisplayMode("hindi_english")}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer border ${
                      previewDisplayMode === "hindi_english"
                        ? "bg-cyan-500/20 text-cyan-200 border-cyan-400 font-bold"
                        : "bg-black/40 text-stone-400 border-transparent hover:text-stone-300"
                    }`}
                  >
                    💬 Hindi + English
                  </button>
                </div>

                {/* Theme Selector Pills Row */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-thin">
                  {BACKGROUND_VARIATIONS.map((theme) => {
                    const isSelected = previewThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setPreviewThemeId(theme.id)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1 ${
                          isSelected
                            ? "bg-cyan-400 text-stone-950 font-black border-cyan-200 shadow-sm"
                            : "bg-black/60 text-stone-300 border-[#1a384e] hover:border-cyan-500/50"
                        }`}
                      >
                        <span>{theme.icon}</span>
                        <span>{theme.hindiName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 9:16 / 4:5 Sacred Dynamic Theme Mobile Frame */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col justify-between text-center select-none group transition-all duration-300 border-2 ${
                  previewAspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-[4/5]"
                }`}
                style={{
                  background: `linear-gradient(180deg, ${activePreviewTheme.colors.bgStart} 0%, ${activePreviewTheme.colors.bgMid} 50%, ${activePreviewTheme.colors.bgEnd} 100%)`,
                  borderColor: activePreviewTheme.colors.border,
                }}
              >
                {/* Background Aura */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 20%, ${activePreviewTheme.colors.glow} 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute inset-1.5 rounded-xl pointer-events-none border"
                  style={{ borderColor: activePreviewTheme.colors.border, opacity: 0.35 }}
                />

                {/* Corner Flourishes */}
                <div
                  className="absolute top-2 left-2 text-xs font-serif pointer-events-none"
                  style={{ color: activePreviewTheme.colors.accentGold }}
                >
                  ❖
                </div>
                <div
                  className="absolute top-2 right-2 text-xs font-serif pointer-events-none"
                  style={{ color: activePreviewTheme.colors.accentGold }}
                >
                  ❖
                </div>
                <div
                  className="absolute bottom-2 left-2 text-xs font-serif pointer-events-none"
                  style={{ color: activePreviewTheme.colors.accentGold }}
                >
                  ❖
                </div>
                <div
                  className="absolute bottom-2 right-2 text-xs font-serif pointer-events-none"
                  style={{ color: activePreviewTheme.colors.accentGold }}
                >
                  ❖
                </div>

                {/* Top Watermark & Category Badge */}
                <div className="space-y-1 pt-0.5 relative z-10 shrink-0">
                  <p
                    className="text-[10px] font-mono font-bold tracking-[0.22em] uppercase"
                    style={{ color: activePreviewTheme.colors.accentGold }}
                  >
                    {currentItem.channelBranding.watermarkText}
                  </p>
                  <div
                    className="inline-block px-2.5 py-0.5 rounded-full border bg-black/60 backdrop-blur-xs"
                    style={{ borderColor: activePreviewTheme.colors.border }}
                  >
                    <p
                      className="text-[9px] font-bold tracking-wider"
                      style={{ color: activePreviewTheme.colors.textSecondary }}
                    >
                      {currentCategoryInfo?.nameHindi.toUpperCase()} • {currentItem.verseNumberOrLabel}
                    </p>
                  </div>
                </div>

                {/* Center Sacred Icon & Content with Smooth Scroll Container */}
                <div className="my-auto py-2 space-y-2.5 relative z-10 overflow-y-auto max-h-[75%] scrollbar-thin px-1 text-center">
                  {/* Central Sacred Icon */}
                  <div
                    className="w-10 h-10 mx-auto rounded-full p-[1px] shadow-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${activePreviewTheme.colors.accentGold}, ${activePreviewTheme.colors.accent})`,
                      boxShadow: `0 0 15px ${activePreviewTheme.colors.glow}`,
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-base"
                      style={{ backgroundColor: activePreviewTheme.colors.cardBg }}
                    >
                      {currentItem.category === "OM_NAMAH_SHIVAY"
                        ? "🕉️"
                        : currentItem.category === "SHIVA_TANDAVA"
                        ? "🔥"
                        : currentItem.category === "LINGASHTAKAM"
                        ? "🪨"
                        : "🔱"}
                    </div>
                  </div>

                  <h3
                    className="text-xs md:text-[13px] font-bold font-cinzel line-clamp-1 px-1 tracking-tight"
                    style={{ color: activePreviewTheme.colors.accentGold }}
                  >
                    {currentItem.titleHindi}
                  </h3>

                  {/* Sacred Text Glass Plaque */}
                  {(previewDisplayMode === "all" ||
                    previewDisplayMode === "shloka_hindi" ||
                    previewDisplayMode === "shloka_only") && (
                    <div
                      className="border rounded-xl p-2.5 backdrop-blur-md shadow-inner text-center"
                      style={{
                        backgroundColor: activePreviewTheme.colors.cardBg,
                        borderColor: activePreviewTheme.colors.border,
                      }}
                    >
                      <div
                        className="text-[9px] font-bold mb-1 tracking-wider uppercase"
                        style={{ color: activePreviewTheme.colors.accent }}
                      >
                        ॥ श्री शिव स्तोत्रम् ॥
                      </div>
                      <p
                        className={`font-bold font-serif leading-relaxed whitespace-pre-line ${
                          previewFontSize === "large"
                            ? "text-[13px] md:text-[15px]"
                            : previewFontSize === "compact"
                            ? "text-[11px] md:text-xs"
                            : "text-xs md:text-[13px]"
                        }`}
                        style={{ color: activePreviewTheme.colors.textPrimary }}
                      >
                        {currentItem.sacredTextSanskrit}
                      </p>
                    </div>
                  )}

                  {/* Short Bhawarth Gist */}
                  {(previewDisplayMode === "all" ||
                    previewDisplayMode === "shloka_hindi" ||
                    previewDisplayMode === "hindi_english") && (
                    <div
                      className="rounded-xl p-2 bg-black/60 border text-center"
                      style={{ borderColor: "rgba(251, 191, 36, 0.25)" }}
                    >
                      <div
                        className="text-[8px] font-mono font-bold uppercase mb-0.5"
                        style={{ color: activePreviewTheme.colors.accentGold }}
                      >
                        🔱 सरल भावार्थ
                      </div>
                      <p
                        className={`text-stone-200 leading-snug font-sans ${
                          previewFontSize === "large"
                            ? "text-[12px]"
                            : previewFontSize === "compact"
                            ? "text-[10px]"
                            : "text-[11px]"
                        }`}
                      >
                        {currentItem.bhawarthHindi}
                      </p>
                    </div>
                  )}

                  {/* English Translation */}
                  {(previewDisplayMode === "all" || previewDisplayMode === "hindi_english") && (
                    <div
                      className="rounded-xl p-2 bg-black/40 border text-center"
                      style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
                    >
                      <p
                        className={`italic leading-snug ${
                          previewFontSize === "large"
                            ? "text-[11px]"
                            : previewFontSize === "compact"
                            ? "text-[9px]"
                            : "text-[10px]"
                        }`}
                        style={{ color: activePreviewTheme.colors.textSecondary }}
                      >
                        "{currentItem.englishMeaning}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Branding & Seal */}
                <div
                  className="space-y-0.5 pb-0.5 relative z-10 border-t pt-1.5 shrink-0"
                  style={{ borderColor: "rgba(251, 191, 36, 0.2)" }}
                >
                  <p
                    className="text-[9px] font-mono font-semibold"
                    style={{ color: activePreviewTheme.colors.accentGold }}
                  >
                    ॐ नमः शिवाय • हर हर महादेव
                  </p>
                  <p
                    className="text-[8px] font-mono"
                    style={{ color: activePreviewTheme.colors.textSecondary }}
                  >
                    {currentItem.channelBranding.handle} • {currentItem.channelBranding.sealText}
                  </p>
                </div>
              </div>

              {/* Quick Actions Under Mockup */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("pngcard")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-stone-950 text-xs font-black rounded-xl shadow-md cursor-pointer transition-transform hover:scale-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download 10-Theme PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(currentItem.sacredTextSanskrit, "Sanskrit Text")}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0c2230] hover:bg-[#143246] border border-[#1a3c53] text-cyan-200 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {copiedKey === "Sanskrit Text" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedKey === "Sanskrit Text" ? "Copied!" : "Copy Shloka"}</span>
                </button>
              </div>
            </div>

            {/* Category Significance Mini-Card */}
            {currentCategoryInfo && (
              <div className="bg-[#09151e] border border-[#132d3e] rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>{currentCategoryInfo.nameHindi}</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentCategoryInfo.significanceHindi}
                </p>
                <div className="text-[10px] font-mono text-cyan-400 font-semibold bg-black/40 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                  रचयिता: {currentCategoryInfo.composer} • स्रोत: {currentCategoryInfo.scriptureSource}
                </div>
                <div className="text-[10px] font-mono text-amber-300 bg-black/30 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  जप समय: {currentCategoryInfo.idealTime} • माला: {currentCategoryInfo.malaCount}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Tabbed Content Engine (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tab Navigation Buttons */}
            <div className="bg-[#09151e] border border-[#132d3e] p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-md">
              <button
                type="button"
                onClick={() => setActiveTab("mantra")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "mantra"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 shadow-md font-black"
                    : "bg-[#0c2230] hover:bg-[#143246] text-stone-300"
                }`}
              >
                <Feather className="w-3.5 h-3.5" />
                <span>पावन मंत्र व भावार्थ</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pngcard")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === "pngcard"
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 text-stone-950 shadow-md font-black ring-2 ring-cyan-300"
                    : "bg-[#0c2230] hover:bg-[#143246] text-cyan-300"
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
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 shadow-md font-black"
                    : "bg-[#0c2230] hover:bg-[#143246] text-stone-300"
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
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 shadow-md font-black"
                    : "bg-[#0c2230] hover:bg-[#143246] text-stone-300"
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
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 shadow-md font-black"
                    : "bg-[#0c2230] hover:bg-[#143246] text-stone-300"
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
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 shadow-md font-black"
                    : "bg-[#0c2230] hover:bg-[#143246] text-stone-300"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>ब्रांडिंग व टैग्स</span>
              </button>
            </div>

            {/* TAB 1: MANTRA & BHAWARTH */}
            {activeTab === "mantra" && (
              <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-5 md:p-6 shadow-2xl space-y-6">
                {/* Header Info */}
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#132d3e]">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      {currentCategoryInfo?.nameHindi} • {currentItem.verseNumberOrLabel}
                    </span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-cyan-100 font-cinzel">
                      {currentItem.titleHindi}
                    </h2>
                    <p className="text-xs text-stone-400 italic">{currentItem.titleEnglish}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `${currentItem.titleHindi}\n\n${currentItem.sacredTextSanskrit}\n\nभावार्थ:\n${currentItem.bhawarthHindi}\n\nEnglish Translation:\n${currentItem.englishMeaning}`,
                        "Complete Shiv Shloka"
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2230] hover:bg-[#143246] border border-[#1a3c53] text-cyan-300 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    {copiedKey === "Complete Shiv Shloka" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedKey === "Complete Shiv Shloka" ? "Copied!" : "Copy Full Verse"}</span>
                  </button>
                </div>

                {/* Primary Sacred Verse in Large Devanagari */}
                <div className="bg-gradient-to-r from-[#071f2e] via-[#051520] to-[#071f2e] border-2 border-cyan-500/40 rounded-2xl p-6 shadow-xl relative text-center">
                  <div className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase mb-2">
                    ॥ मूल पावन संस्कृत पाठ • {currentItem.meterOrChhanda} ॥
                  </div>
                  <p className="text-lg md:text-2xl font-bold text-cyan-50 font-serif leading-relaxed whitespace-pre-line">
                    {currentItem.sacredTextSanskrit}
                  </p>
                  <p className="text-xs font-mono text-cyan-300/80 italic mt-3">
                    {currentItem.transliteration}
                  </p>
                </div>

                {/* Hindi Bhawarth */}
                <div className="space-y-2 bg-[#0c202d] border border-[#132d3e] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>हिन्दी भावार्थ एवं व्याख्या</span>
                  </div>
                  <p className="text-sm md:text-base text-cyan-50 leading-relaxed font-sans">
                    {currentItem.bhawarthHindi}
                  </p>
                </div>

                {/* English Spiritual Meaning */}
                <div className="space-y-2 bg-[#0c202d] border border-[#132d3e] rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-sky-400" />
                    <span>Spiritual English Translation & Cosmic Meaning</span>
                  </div>
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-serif">
                    {currentItem.englishMeaning}
                  </p>
                </div>

                {/* Spiritual Gyan & Practical Life Application */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#092233] to-[#05131e] border border-cyan-500/30 rounded-2xl p-4 space-y-2">
                    <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>आध्यात्मिक मर्म (Spiritual Wisdom)</span>
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {currentItem.spiritualGyan}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#0c283d] to-[#061724] border border-sky-500/30 rounded-2xl p-4 space-y-2">
                    <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>दैनिक जीवन में उपयोग (Daily Sadhana)</span>
                    </span>
                    <p className="text-xs text-stone-200 leading-relaxed">
                      {currentItem.practicalLifeApplication}
                    </p>
                    <div className="text-[10px] font-mono text-cyan-400 font-semibold pt-1 border-t border-cyan-500/20">
                      ⚡ अनुशंसित जप: {currentItem.recommendedChantCount}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: 10-THEME PNG CARD DOWNLOADER */}
            {activeTab === "pngcard" && (
              <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#132d3e] flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      STUDIO-GRADE SHIV EXPORT SUITE
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-cyan-100 font-cinzel">
                      10-Theme HD PNG Card Generator
                    </h3>
                    <p className="text-xs text-stone-400">
                      Export in 9:16 (1080x1920 Status/Reels) or 4:5 (1080x1350 Feed/Post) with Kailash Ice Azure, Bhasma Obsidian & Sacred Gold Themes.
                    </p>
                  </div>
                </div>

                <SacredCardPngDownloader
                  cardData={sacredCardData}
                  allSlidesData={allCategorySlidesData}
                  defaultAspectRatio={previewAspectRatio}
                  defaultThemeId={previewThemeId}
                  onNotify={onNotify}
                  fileNamePrefix={`ShivMantra_${currentItem.category}_${currentItem.id}`}
                  activeSlideIndex={currentIndex}
                  onSelectSlideIndex={(idx) => setCurrentIndex(idx)}
                />
              </div>
            )}

            {/* TAB 3: WORD BY WORD (PADACHHEDA) */}
            {activeTab === "wordbyword" && (
              <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#132d3e]">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      PADACHHEDA & SANSKRIT SHABDARTH
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-cyan-100 font-cinzel">
                      पदच्छेद एवं शब्दार्थ विश्लेषण
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
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2230] hover:bg-[#143246] border border-[#1a3c53] text-cyan-300 text-xs font-bold rounded-xl cursor-pointer"
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
                      className="bg-[#0c2230] border border-[#132d3e] rounded-xl p-3.5 flex flex-col justify-between space-y-1 hover:border-cyan-500/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold text-cyan-300 font-serif">{w.word}</span>
                        <span className="text-[10px] font-mono text-stone-500">#{idx + 1}</span>
                      </div>
                      <p className="text-xs text-cyan-100 font-semibold">{w.meaningHindi}</p>
                      <p className="text-[11px] text-stone-400 italic">{w.meaningEnglish}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: 9:16 MIDJOURNEY AI PROMPT SUITE */}
            {activeTab === "visual916" && (
              <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-5 md:p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#132d3e] flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      MIDJOURNEY V6.1 & SDXL SHIV SUITE
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-cyan-100 font-cinzel">
                      9:16 Vertical Sacred Key-Art Prompts
                    </h3>
                  </div>

                  {onSendToForge && (
                    <button
                      type="button"
                      onClick={() => handleSendPromptToForge(currentItem.imagePrompt916[promptStyle])}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 text-xs font-black rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
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
                      { id: "master", label: "Master 9:16 Art", icon: "🔱" },
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
                          ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-stone-950 border-cyan-300 shadow-md font-black"
                          : "bg-[#0c2230] hover:bg-[#143246] border-[#132d3e] text-stone-300"
                      }`}
                    >
                      <span>{style.icon}</span>
                      <span>{style.label}</span>
                    </button>
                  ))}
                </div>

                {/* Active Prompt Box */}
                <div className="bg-[#0c2230] border-2 border-cyan-500/40 rounded-2xl p-4 relative space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      SELECTED PROMPT: {promptStyle.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(currentItem.imagePrompt916[promptStyle], "Prompt Text")
                      }
                      className="flex items-center gap-1 px-2.5 py-1 bg-black/60 hover:bg-black border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-lg cursor-pointer"
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
              <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-5 md:p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#132d3e] flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      YOUTUBE SHORTS & REEL SCRIPT
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-cyan-100 font-cinzel">
                      60-Second Viral Script & Voiceover Guide
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const fullScript = `🎬 HOOK:\n${currentItem.shortsScript60s.hook}\n\n📍 SCENE 1:\n[Visual]: ${currentItem.shortsScript60s.scene1Visual}\n[Voiceover]: ${currentItem.shortsScript60s.scene1Voiceover}\n\n📍 SCENE 2:\n[Visual]: ${currentItem.shortsScript60s.scene2Visual}\n[Voiceover]: ${currentItem.shortsScript60s.scene2Voiceover}\n\n📍 SCENE 3:\n[Visual]: ${currentItem.shortsScript60s.scene3Visual}\n[Voiceover]: ${currentItem.shortsScript60s.scene3Voiceover}\n\n📢 OUTRO:\n${currentItem.shortsScript60s.outroCallToAction}\n\n🎵 AUDIO:\n${currentItem.shortsScript60s.audioTrackRecommendation}`;
                      copyToClipboard(fullScript, "Shorts Script");
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c2230] hover:bg-[#143246] border border-[#1a3c53] text-cyan-300 text-xs font-bold rounded-xl cursor-pointer"
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
                <div className="bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/40 rounded-2xl p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    ⚡ 00:00 - 00:05 VIRAL HOOK
                  </span>
                  <p className="text-sm font-bold text-cyan-100">
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
                    <div key={sc.sceneNum} className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          SCENE {sc.sceneNum} ({sc.time})
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">
                        <strong className="text-cyan-300">Visual Prompt:</strong> {sc.vis}
                      </p>
                      <p className="text-xs text-stone-200 bg-black/50 p-2.5 rounded-xl border border-stone-800">
                        <strong className="text-cyan-400">🎙️ Voiceover:</strong> {sc.vo}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Outro Call to Action & Audio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-cyan-400">
                      📢 00:55 - 01:00 OUTRO CTA
                    </span>
                    <p className="text-xs text-stone-200">
                      {currentItem.shortsScript60s.outroCallToAction}
                    </p>
                  </div>
                  <div className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-sky-400">
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
              <div className="bg-[#09151e] border border-[#132d3e] rounded-3xl p-5 md:p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#132d3e]">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      INDIAN BHAKTI DHARA METADATA
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-cyan-100 font-cinzel">
                      चैनल ब्रांडिंग, सील व हैशटैग्स
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono text-stone-400">Watermark Header:</span>
                    <p className="text-sm font-bold text-cyan-300">
                      {currentItem.channelBranding.watermarkText}
                    </p>
                  </div>
                  <div className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono text-stone-400">Channel Handle:</span>
                    <p className="text-sm font-bold text-cyan-300 font-mono">
                      {currentItem.channelBranding.handle}
                    </p>
                  </div>
                  <div className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-1">
                    <span className="text-[11px] font-mono text-stone-400">Archival Seal:</span>
                    <p className="text-sm font-bold text-cyan-300 font-mono">
                      {currentItem.channelBranding.sealText}
                    </p>
                  </div>
                </div>

                {/* Hashtags Suite */}
                <div className="bg-[#0c2230] border border-[#132d3e] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
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
                      className="px-2.5 py-1 bg-black/60 hover:bg-black border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-lg cursor-pointer"
                    >
                      {copiedKey === "Hashtags" ? "Copied!" : "Copy Hashtags"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentItem.channelBranding.suggestedHashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-black/50 border border-cyan-500/30 text-cyan-200 text-xs font-mono rounded-lg"
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
