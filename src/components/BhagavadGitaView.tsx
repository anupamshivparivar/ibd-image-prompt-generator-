import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import {
  GITA_CHAPTERS,
  GITA_MASTER_SHLOKAS,
  GitaChapter,
  GitaShlokaItem,
} from "../data/bhagavadGitaData";
import { runWithSoloLock } from "../utils/soloRunLock";
import { SacredCardPngDownloader } from "./SacredCardPngDownloader";
import { SacredCardData } from "../utils/sacredCardCanvas";

interface BhagavadGitaViewProps {
  customApiKey?: string;
  onNotify?: (msg: string) => void;
  onSendToForge?: (customReq: any) => void;
}

export const BhagavadGitaView: React.FC<BhagavadGitaViewProps> = ({
  customApiKey,
  onNotify,
  onSendToForge,
}) => {
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [currentShlokaIndex, setCurrentShlokaIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"shloka" | "wordbyword" | "pngcard" | "visual916" | "script" | "chapterinfo">("shloka");

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    GITA_MASTER_SHLOKAS.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)];
  }, []);

  // Filtered shlokas list
  const filteredShlokas = useMemo(() => {
    return GITA_MASTER_SHLOKAS.filter((item) => {
      const matchChapter =
        selectedChapterNumber === "ALL" || item.chapter === selectedChapterNumber;
      const matchTag = selectedTag === "ALL" || item.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        item.shlokaSanskrit.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.anuvadHindi.toLowerCase().includes(q) ||
        item.englishTranslation.toLowerCase().includes(q) ||
        item.chapterNameHindi.toLowerCase().includes(q) ||
        item.chapterNameEnglish.toLowerCase().includes(q) ||
        `bg ${item.chapter}.${item.verse}`.includes(q) ||
        `${item.chapter}.${item.verse}`.includes(q);

      return matchChapter && matchTag && matchSearch;
    });
  }, [selectedChapterNumber, selectedTag, searchQuery]);

  const currentShloka: GitaShlokaItem =
    filteredShlokas[currentShlokaIndex] || GITA_MASTER_SHLOKAS[0];

  const currentChapterInfo: GitaChapter | undefined = useMemo(() => {
    return GITA_CHAPTERS.find((c) => c.number === currentShloka.chapter);
  }, [currentShloka.chapter]);

  const sacredCardData: SacredCardData = useMemo(() => {
    return {
      type: "bhagavad_gita",
      title: `श्रीमद्भगवद्गीता • अध्याय ${currentShloka.chapter}, श्लोक ${currentShloka.verse}`,
      categoryOrChapter: `BG CHAPTER ${currentShloka.chapter} • ${currentShloka.chapterNameHindi.toUpperCase()}`,
      shlokaSanskrit: currentShloka.shlokaSanskrit,
      hindiText: currentShloka.anuvadHindi,
      englishText: currentShloka.englishTranslation,
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — SHRIMAD BHAGAVAD GITA SHASTRA",
      iconType: "gita",
    };
  }, [currentShloka]);

  // All filtered shlokas as slide objects for 1 to 10 batch export
  const allGitaSlidesData: SacredCardData[] = useMemo(() => {
    return filteredShlokas.map((item) => ({
      type: "bhagavad_gita",
      title: `श्रीमद्भगवद्गीता • अध्याय ${item.chapter}, श्लोक ${item.verse}`,
      categoryOrChapter: `BG CHAPTER ${item.chapter} • ${item.chapterNameHindi.toUpperCase()}`,
      shlokaSanskrit: item.shlokaSanskrit,
      hindiText: item.anuvadHindi,
      englishText: item.englishTranslation,
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — SHRIMAD BHAGAVAD GITA SHASTRA",
      iconType: "gita",
    }));
  }, [filteredShlokas]);

  const handleNext = () => {
    if (filteredShlokas.length <= 1) return;
    const nextIdx = (currentShlokaIndex + 1) % filteredShlokas.length;
    setCurrentShlokaIndex(nextIdx);
    if (onNotify) {
      onNotify(`Loaded Shloka BG ${filteredShlokas[nextIdx].chapter}.${filteredShlokas[nextIdx].verse}`);
    }
  };

  const handlePrev = () => {
    if (filteredShlokas.length <= 1) return;
    const prevIdx = (currentShlokaIndex - 1 + filteredShlokas.length) % filteredShlokas.length;
    setCurrentShlokaIndex(prevIdx);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
    if (onNotify) {
      onNotify(`Copied ${key} to clipboard!`);
    }
  };

  const fullShortsScript = `🎬 SHRIMAD BHAGAVAD GITA — 9:16 SHORTS SCRIPT
===================================================
CHANNEL: Indian Bhakti Dhara (@IndianBhaktiDhara)
CHAPTER: ${currentShloka.chapter} (${currentShloka.chapterNameHindi} / ${currentShloka.chapterNameEnglish})
VERSE: ${currentShloka.chapter}.${currentShloka.verse}
SEAL: IBD — Shrimad Bhagavad Gita Shastra

[00:00 - 00:05] 🕉️ DIVINE HOOK & SHLOKA CHANT:
Visual: 9:16 Hyper-detailed cinematic darshan of Lord Krishna and Arjuna on Kurukshetra Chariot.
On-Screen Text: "श्रीमद्भगवद्गीता • अध्याय ${currentShloka.chapter}, श्लोक ${currentShloka.verse}"
Audio: Sacred Shankha reverberation + Deep Sanskrit Shloka Chanting:
"${currentShloka.shlokaSanskrit.replace(/\n/g, " ")}"

[00:05 - 00:18] 📜 SARAL HINDI ARTHA (सरल हिन्दी अर्थ):
Visual: Slow camera tracking shot with volumetric golden dawn light beams.
Voiceover: "${currentShloka.anuvadHindi}"

[00:18 - 00:26] 💡 PRACTICAL LIFE APPLICATION (दैनिक जीवन में उपयोग):
Visual: Luminous inner Atman or focused warrior bow visual.
Voiceover: "${currentShloka.practicalLifeApplication}"

[00:26 - 00:30] 🔱 SACRED OUTRO & BRANDING:
On-Screen Overlay: "INDIAN BHAKTI DHARA • IBD Shastra Seal"
Voiceover: "कमेंट में 'हरे कृष्णा' लिखें और इस दिव्य श्लोक को शेयर करें।"
`;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#140b05] via-[#201006] to-[#120703] border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#120703] rounded-[14px] flex items-center justify-center text-amber-300 font-bold">
              <BookOpen className="w-6 h-6 animate-pulse text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-amber-300">
                Shrimad Bhagavad Gita Shloka Studio
              </h2>
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full font-mono">
                18 CHAPTERS • SANSKRIT / HINDI / ENGLISH
              </span>
            </div>
            <p className="text-xs text-[#c9b89d] mt-0.5">
              Authentic Shloka Chanting, Word-by-Word Sanskrit Breakdown, Saral Anuvad & 9:16 Shorts Generator
            </p>
          </div>
        </div>

        {/* Shastra Certification Seal */}
        <div className="flex items-center gap-2 z-10">
          <div className="px-3.5 py-2 rounded-2xl bg-[#1d0e06] border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>IBD GITA SHASTRA CONSECRATED</span>
          </div>
        </div>
      </div>

      {/* 18-CHAPTER SELECTOR BAR */}
      <div className="bg-[#0f0804] p-4 rounded-2xl border border-[#2b180a] space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Explore by Gita Chapter (अध्याय):</span>
          </span>
          <span className="text-[10px] font-mono text-amber-300/80">
            18 Adhyayas • 700 Total Shlokas
          </span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              setSelectedChapterNumber("ALL");
              setCurrentShlokaIndex(0);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              selectedChapterNumber === "ALL"
                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 border-yellow-300 shadow-md font-black"
                : "bg-[#180d06] hover:bg-[#25140a] border-[#361d0d] text-[#d6c9be]"
            }`}
          >
            🌟 ALL CHAPTERS
          </button>

          {GITA_CHAPTERS.map((ch) => {
            const isSelected = selectedChapterNumber === ch.number;
            return (
              <button
                key={ch.number}
                type="button"
                onClick={() => {
                  setSelectedChapterNumber(ch.number);
                  setCurrentShlokaIndex(0);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 border-yellow-300 shadow-md font-black scale-[1.02]"
                    : "bg-[#180d06] hover:bg-[#25140a] border-[#361d0d] text-[#d6c9be]"
                }`}
                title={`${ch.nameSanskrit} (${ch.nameEnglish}) - ${ch.verseCount} Shlokas`}
              >
                Ch {ch.number}: {ch.nameHindi}
              </button>
            );
          })}
        </div>

        {/* Tag Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-[#261508]">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shloka text, chapter, verse..."
              className="w-full bg-[#160c05] border border-[#331c0c] rounded-xl pl-8 pr-3 py-1.5 text-xs text-amber-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full scrollbar-thin">
            <span className="text-[10px] font-mono text-stone-400 shrink-0">Tags:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSelectedTag(tag);
                  setCurrentShlokaIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-amber-500 text-stone-950"
                    : "bg-[#1f1008] text-stone-300 hover:bg-[#2a170c]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN WORKSTATION: LEFT 9:16 LIVE FRAME + RIGHT SHASTRA SUITE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 9:16 LIVE SHORTS & REELS FRAME */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono mb-2.5 flex items-center gap-1.5 self-start">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>9:16 Bhagavad Gita Shorts View</span>
          </div>

          {/* 9:16 Mobile Device Simulation */}
          <div className="w-full max-w-[320px] aspect-[9/16] rounded-3xl bg-gradient-to-b from-[#1c0e05] via-[#120803] to-[#080402] border-2 border-amber-400/50 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Lighting Rays */}
            <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />

            {/* Top Channel Header */}
            <div className="z-10 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-400/30">
                <span>INDIAN BHAKTI DHARA</span>
                <span className="text-[9px] text-amber-400/90">@IndianBhaktiDhara</span>
              </div>
              <div className="text-center pt-0.5">
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded-md border border-amber-500/30">
                  BG CHAPTER {currentShloka.chapter} • VERSE {currentShloka.verse}
                </span>
              </div>
            </div>

            {/* Center: Sacred Shloka & Hindi Meaning */}
            <div className="z-10 text-center space-y-2.5 my-auto px-1">
              <div className="w-9 h-9 mx-auto rounded-full bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-md shadow-amber-500/20">
                <BookOpen className="w-4 h-4 text-amber-300" />
              </div>

              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                {currentShloka.chapterNameHindi}
              </div>

              {/* Sanskrit Devanagari Shloka in Holy Box */}
              <div className="text-xs sm:text-[13px] font-serif font-bold text-amber-200 leading-relaxed bg-gradient-to-b from-black/70 to-black/90 p-3 rounded-2xl border border-amber-400/50 shadow-inner whitespace-pre-wrap">
                {currentShloka.shlokaSanskrit}
              </div>

              {/* Hindi Meaning */}
              <div className="text-[11px] font-medium text-stone-200 leading-relaxed bg-black/50 p-2 rounded-xl border border-amber-500/20">
                {currentShloka.anuvadHindi}
              </div>
            </div>

            {/* Bottom Consecrated Seal */}
            <div className="z-10 space-y-1">
              <div className="bg-black/70 backdrop-blur-md p-2 rounded-xl border border-amber-400/30 text-center space-y-0.5">
                <div className="text-[9px] font-bold text-amber-300 font-mono">
                  ॐ नमो भगवते वासुदेवाय • श्रीमद्भगवद्गीता
                </div>
                <div className="text-[8px] font-mono font-black text-amber-400 uppercase tracking-widest border-t border-amber-500/20 pt-0.5">
                  IBD — Shrimad Bhagavad Gita Shastra
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 mt-4 w-full max-w-[320px]">
            <button
              type="button"
              onClick={handlePrev}
              disabled={filteredShlokas.length <= 1}
              className="flex-1 py-2.5 rounded-xl bg-[#180d06] hover:bg-[#26150a] border border-[#361d0d] text-xs font-bold text-[#d6c9be] flex items-center justify-center gap-1 cursor-pointer transition-all disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Shloka</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={filteredShlokas.length <= 1}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-xs font-black text-stone-950 flex items-center justify-center gap-1 cursor-pointer transition-all shadow-md shadow-amber-500/20"
            >
              <span>Next Shloka</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Direct PNG Card Download Action Banner */}
          <div className="w-full max-w-[320px] mt-3 p-3 rounded-2xl bg-[#1c0f06] border border-amber-400/40 space-y-2 text-center">
            <div className="text-[11px] font-mono font-bold text-amber-300 flex items-center justify-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Shloka PNG Card</span>
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

        {/* RIGHT COLUMN: SHLOKA DETAIL TABS, WORD-BY-WORD & EXPORTS */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-[#2b180a] pb-2 flex-wrap gap-2">
            <div className="flex gap-1.5 flex-wrap">
              {[
                { id: "shloka", label: "📜 Shloka & Anuvad" },
                { id: "pngcard", label: "📥 PNG Download (9:16 & 4:5)" },
                { id: "wordbyword", label: "🔍 Word-by-Word" },
                { id: "visual916", label: "🎨 9:16 Image Prompt" },
                { id: "script", label: "🎬 Shorts Script" },
                { id: "chapterinfo", label: "📖 Chapter Details" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-amber-400 text-stone-950 shadow-md shadow-amber-400/20 font-black"
                      : "bg-[#140b05] hover:bg-[#201006] text-[#c9b8a8]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="text-[11px] font-mono text-amber-400 font-bold">
              BG {currentShloka.chapter}.{currentShloka.verse} ({currentShlokaIndex + 1}/{filteredShlokas.length})
            </div>
          </div>

          {/* TAB 1: FULL SHLOKA & ANUVAD */}
          {activeTab === "shloka" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Sanskrit & Transliteration Card */}
              <div className="p-5 rounded-2xl bg-[#0f0804] border border-amber-400/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                      श्रीमद्भगवद्गीता • अध्याय {currentShloka.chapter}, श्लोक {currentShloka.verse}
                    </span>
                    <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                      {currentShloka.chapterNameSanskrit}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `🕉️ श्रीमद्भगवद्गीता ${currentShloka.chapter}.${currentShloka.verse}\n\n${currentShloka.shlokaSanskrit}\n\nसरल हिन्दी अनुवाद:\n${currentShloka.anuvadHindi}\n\nEnglish Translation:\n${currentShloka.englishTranslation}\n\n— Indian Bhakti Dhara (@IndianBhaktiDhara)`,
                        "shloka-full"
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-yellow-300 text-stone-950 text-xs font-black rounded-lg cursor-pointer transition-all shadow-md shadow-amber-400/20"
                  >
                    {copiedKey === "shloka-full" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Full Shloka</span>
                  </button>
                </div>

                {/* Sanskrit Shloka Box */}
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 text-amber-200 text-sm md:text-base font-serif font-bold whitespace-pre-wrap leading-relaxed">
                  {currentShloka.shlokaSanskrit}
                </div>

                {/* Roman Transliteration (IAST) */}
                <div className="p-3 rounded-xl bg-[#170e06] border border-[#2b180a] text-xs font-mono text-stone-300 italic whitespace-pre-wrap leading-relaxed">
                  {currentShloka.transliteration}
                </div>
              </div>

              {/* Hindi Anuvad & Commentary Card */}
              <div className="p-5 rounded-2xl bg-[#0d0703] border border-[#261508] space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  सरल हिन्दी अनुवाद (Pure Hindi Translation)
                </h4>
                <div className="text-sm font-semibold text-stone-100 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-[#2b180a]">
                  {currentShloka.anuvadHindi}
                </div>

                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider pt-2">
                  English Translation & Purport
                </h4>
                <div className="text-xs md:text-sm text-stone-300 leading-relaxed italic bg-black/40 p-3.5 rounded-xl border border-[#2b180a]">
                  “{currentShloka.englishTranslation}”
                </div>

                <div className="pt-2 text-xs text-[#b8a99a] leading-relaxed">
                  💡 <strong className="text-amber-300">शास्त्रीय तात्पर्य:</strong> {currentShloka.commentaryHindi}
                </div>

                <div className="text-xs text-[#b8a99a] leading-relaxed">
                  ⚡ <strong className="text-amber-300">दैनिक जीवन में उपयोग:</strong> {currentShloka.practicalLifeApplication}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PNG CARD GENERATOR & DOWNLOADER (9:16 & 4:5) */}
          {activeTab === "pngcard" && (
            <div className="animate-in fade-in duration-200">
              <SacredCardPngDownloader
                cardData={sacredCardData}
                allSlidesData={allGitaSlidesData}
                defaultAspectRatio="9:16"
                defaultThemeId="kurukshetra_gold"
                onNotify={onNotify}
                fileNamePrefix={`Bhagavad_Gita_BG_${currentShloka.chapter}.${currentShloka.verse}`}
                activeSlideIndex={currentShlokaIndex}
                onSelectSlideIndex={(idx) => setCurrentShlokaIndex(idx)}
              />
            </div>
          )}

          {/* TAB 2: WORD-BY-WORD (PADACHEDA) */}
          {activeTab === "wordbyword" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0f0804] border border-amber-400/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    पदच्छेद एवं शब्दार्थ (Word-by-Word Breakdown)
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {currentShloka.wordByWord.length} Sanskrit Words Analyzed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentShloka.wordByWord.map((wbw, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#170e06] border border-[#2e190b] space-y-1"
                    >
                      <div className="text-sm font-serif font-bold text-amber-300">
                        {wbw.word}
                      </div>
                      <div className="text-xs text-stone-200 font-medium">
                        🇮🇳 {wbw.meaningHindi}
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono italic">
                        🇬🇧 {wbw.meaningEnglish}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 9:16 IMAGE PROMPT */}
          {activeTab === "visual916" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0f0804] border border-amber-400/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Vertical 9:16 Midjourney / AI Studio Prompt</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `/imagine prompt: ${currentShloka.imagePrompt916}`,
                          "imagine-gita"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#261408] hover:bg-[#381e0d] border border-amber-400/40 text-amber-300 text-xs font-mono rounded-lg cursor-pointer transition-all"
                    >
                      {copiedKey === "imagine-gita" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>/imagine format</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(currentShloka.imagePrompt916, "prompt-gita")
                      }
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-yellow-300 text-stone-950 text-xs font-black rounded-lg cursor-pointer transition-all shadow-md shadow-amber-400/20"
                    >
                      {copiedKey === "prompt-gita" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Prompt</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-[#2b180a] text-xs md:text-sm text-amber-200/90 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                  {currentShloka.imagePrompt916}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                  <div className="p-2 rounded-lg bg-[#180d06] border border-[#2e190b] text-[#d6c9be]">
                    <span className="text-amber-400 font-bold block">SHASTRA THEME</span>
                    <span className="truncate block">{currentShloka.visualTheme}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#180d06] border border-[#2e190b] text-[#d6c9be]">
                    <span className="text-amber-400 font-bold block">ASPECT RATIO</span>
                    <span className="truncate block font-bold text-amber-300">9:16 (Shorts / Reels)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHORTS SCRIPT */}
          {activeTab === "script" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0f0804] border border-amber-400/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>Complete 30-Second YouTube Shorts / Reel Script</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(fullShortsScript, "script-gita")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-yellow-300 text-stone-950 text-xs font-black rounded-lg cursor-pointer transition-all shadow-md shadow-amber-400/20"
                  >
                    {copiedKey === "script-gita" ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>Copy Script</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-black/70 border border-[#2b180a] text-xs text-amber-200/90 font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto scrollbar-thin">
                  {fullShortsScript}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: CHAPTER INFO */}
          {activeTab === "chapterinfo" && currentChapterInfo && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-[#0f0804] border border-amber-400/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                      CHAPTER {currentChapterInfo.number} OF 18
                    </span>
                    <h3 className="font-cinzel text-lg font-bold text-amber-300">
                      {currentChapterInfo.nameSanskrit} ({currentChapterInfo.nameHindi})
                    </h3>
                    <div className="text-xs text-stone-400 font-mono">
                      English: {currentChapterInfo.nameEnglish} • {currentChapterInfo.verseCount} Total Shlokas
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#170e06] border border-[#2b180a] space-y-2">
                  <div className="text-xs text-amber-300 font-bold font-mono uppercase">
                    अध्याय सारांश (Chapter Summary in Hindi):
                  </div>
                  <div className="text-xs text-stone-200 leading-relaxed">
                    {currentChapterInfo.summaryHindi}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#170e06] border border-[#2b180a] space-y-2">
                  <div className="text-xs text-amber-300 font-bold font-mono uppercase">
                    English Summary & Theme:
                  </div>
                  <div className="text-xs text-stone-300 leading-relaxed italic">
                    {currentChapterInfo.summaryEnglish}
                  </div>
                  <div className="text-xs font-mono text-amber-400">
                    Key Theme: <strong>{currentChapterInfo.theme}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
