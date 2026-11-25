import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Film,
  Smartphone,
  Download,
  Calendar,
  Search,
  Dice5,
  Volume2,
  Share2,
  ChevronRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Code
} from "lucide-react";
import {
  DAILY_SHORTS_TEMPLATES,
  DEITY_CATEGORIES,
  DeityShortsTemplate
} from "../data/dailyShortsData";
import { generateDailyShortsHtmlApp } from "../utils/generateDailyShortsHtml";

interface DailyShortsStudioViewProps {
  onNotify?: (message: string) => void;
}

export const DailyShortsStudioView: React.FC<DailyShortsStudioViewProps> = ({ onNotify }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeTemplateId, setActiveTemplateId] = useState<string>(DAILY_SHORTS_TEMPLATES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"timeline" | "shloka" | "audio" | "export">("timeline");
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [copiedHtmlCode, setCopiedHtmlCode] = useState<boolean>(false);

  // Filter templates
  const filteredTemplates = DAILY_SHORTS_TEMPLATES.filter((item) => {
    let matchesCategory = true;
    if (selectedCategory === "ALL" || selectedCategory === "IBD") {
      matchesCategory = true;
    } else if (selectedCategory === "ASP") {
      matchesCategory = item.category === "SHIV" || item.category === "DEVI" || item.category === "BHAIRAVA";
    } else if (selectedCategory === "RKM") {
      matchesCategory = item.category === "HANUMAN" || item.category === "RAM";
    } else {
      matchesCategory = item.category === selectedCategory;
    }

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.deityName.toLowerCase().includes(q) ||
      item.hindiName.toLowerCase().includes(q) ||
      item.hookLine.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const activeTemplate: DeityShortsTemplate =
    DAILY_SHORTS_TEMPLATES.find((t) => t.id === activeTemplateId) ||
    filteredTemplates[0] ||
    DAILY_SHORTS_TEMPLATES[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
    if (onNotify) {
      onNotify(`${label} copied to clipboard!`);
    }
  };

  const handleRandomPick = () => {
    const pool = filteredTemplates.length > 0 ? filteredTemplates : DAILY_SHORTS_TEMPLATES;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setActiveTemplateId(random.id);
    if (onNotify) {
      onNotify(`Loaded Daily Shorts: "${random.title}"`);
    }
  };

  const downloadStandaloneHtml = () => {
    const html = generateDailyShortsHtmlApp();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ibd-daily-shorts-all-deities.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onNotify) {
      onNotify("Standalone Daily Shorts HTML App downloaded! Open it on phone or PC.");
    }
  };

  const copyFullProductionDeck = () => {
    const fullKit = `=== IBD DAILY SHORTS PRODUCTION KIT (9:16) ===
DEITY: ${activeTemplate.deityName} (${activeTemplate.hindiName})
TITLE: ${activeTemplate.title}
DURATION: ${activeTemplate.duration} | DAY OF WEEK: ${activeTemplate.dayOfWeek}

--- 3-SECOND VIRAL HOOK ---
Hindi: ${activeTemplate.hookLineHindi}
English: ${activeTemplate.hookLine}

--- SACRED VEDIC SHLOKA ---
${activeTemplate.sanskritShloka.text}
(${activeTemplate.sanskritShloka.englishTransliteration})
Meaning (Hindi): ${activeTemplate.sanskritShloka.meaningHindi}
Meaning (English): ${activeTemplate.sanskritShloka.meaningEnglish}

--- 4-STEP 9:16 PRODUCTION TIMELINE ---
${activeTemplate.scriptBreakdown
  .map(
    (s, i) => `[${s.timestamp}] ${s.section.toUpperCase()}
VO Hindi: ${s.voiceoverHindi}
VO English: ${s.voiceoverEnglish}
Camera: ${s.videoCameraMovement}
9:16 AI Visual Prompt: ${s.aiPrompt9x16}`
  )
  .join("\n\n")}

--- MASTER 9:16 IMAGE PROMPT (MIDJOURNEY / FLUX) ---
${activeTemplate.masterImagePrompt9x16}

--- MASTER VIDEO PROMPT (RUNWAY GEN-3 / LUMA / KLING) ---
${activeTemplate.masterVideoPromptGen3}

--- BGM & AUDIO BLUEPRINT ---
${activeTemplate.bgmRecommendation}
FX Cues: ${activeTemplate.soundFxCues.join(", ")}

--- VIRAL YOUTUBE / INSTAGRAM HASHTAGS & SEO TITLE ---
${activeTemplate.captionAndHashtags}
`;
    handleCopy(fullKit, "Full Shorts Production Kit");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-orange-950/70 via-stone-900/90 to-amber-950/70 border border-orange-500/30 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 text-stone-950 font-black text-[11px] uppercase tracking-wider shadow-sm">
                IBD 9:16 VIRAL SHORTS & REELS ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-900 border border-orange-500/40 text-orange-300 font-mono text-[11px]">
                ALL DEITIES (SHIV • HANUMAN • RAM • KRISHNA • DEVI)
              </span>
            </div>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-orange-100">
              IBD Daily Devotional Shorts Studio
            </h2>
            <p className="text-xs md:text-sm text-stone-300 max-w-3xl leading-relaxed">
              Complete production kits for daily YouTube Shorts, Instagram Reels & TikToks.
              Includes 3-second viral hooks, Hindi/English voiceover scripts, 9:16 AI image & video prompts, Sanskrit shlokas, sound design & trending hashtags.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={downloadStandaloneHtml}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              title="Download standalone single-file HTML version to use 100% offline on any phone"
            >
              <Smartphone className="w-4 h-4" />
              <span>Download HTML App (.html)</span>
              <Download className="w-3.5 h-3.5 opacity-80" />
            </button>

            <button
              onClick={() => setShowDownloadModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
            >
              <Code className="w-4 h-4 text-orange-400" />
              <span>Source Code</span>
            </button>

            <button
              onClick={copyFullProductionDeck}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
            >
              {copiedItem === "Full Shorts Production Kit" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>
                {copiedItem === "Full Shorts Production Kit"
                  ? "Full Kit Copied!"
                  : "Copy 1-Click Shorts Kit"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Category First-Glance Button Center */}
      <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="font-bold text-orange-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>1-CLICK DEITY / DAY SELECTION</span>
          </span>
          <span className="text-[11px] font-mono text-stone-400">
            {filteredTemplates.length} Templates Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1.5">
          {DEITY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border truncate ${
                  isSelected
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 border-yellow-300 shadow-md shadow-orange-500/30 scale-[1.02] ring-1 ring-yellow-300"
                    : "bg-stone-900/90 hover:bg-stone-800 border-stone-800 text-stone-300"
                }`}
              >
                <span className="shrink-0">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Selector Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Deity, Story, Shloka, Mystery, Day of Week..."
            className="w-full bg-stone-900/90 border border-stone-800 focus:border-orange-500/60 rounded-xl pl-9 pr-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 outline-none transition-all"
          />
        </div>

        <div className="md:col-span-4 flex items-center gap-2">
          <button
            onClick={handleRandomPick}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-orange-300 text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Dice5 className="w-4 h-4 text-orange-400" />
            <span>Random Daily Idea</span>
          </button>
        </div>
      </div>

      {/* Template Carousel List */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {filteredTemplates.map((template) => {
          const isSelected = template.id === activeTemplate.id;
          return (
            <button
              key={template.id}
              onClick={() => setActiveTemplateId(template.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all shrink-0 w-64 md:w-72 cursor-pointer ${
                isSelected
                  ? "bg-stone-900 border-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]"
                  : "bg-stone-950/80 hover:bg-stone-900/80 border-stone-800 text-stone-400"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 text-[10px] font-bold">
                  {template.dayOfWeek}
                </span>
                <span className="text-[10px] font-mono text-stone-400">{template.duration}</span>
              </div>
              <h4 className={`font-cinzel text-xs font-bold line-clamp-1 ${isSelected ? "text-orange-100" : "text-stone-300"}`}>
                {template.title}
              </h4>
              <p className="text-[11px] text-stone-400 mt-1 line-clamp-1 font-sans">
                {template.hindiName}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Deity Main Workshop Card */}
      <div className="bg-stone-900/90 border border-orange-500/30 rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl">
        {/* Header Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold">
                {activeTemplate.dayOfWeek.toUpperCase()} • {activeTemplate.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Duration: {activeTemplate.duration}
              </span>
            </div>
            <h3 className="font-cinzel text-lg md:text-xl font-bold text-orange-100">
              {activeTemplate.title}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {activeTemplate.deityName} — {activeTemplate.hindiName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeTemplate.masterImagePrompt9x16, "9:16 Master Image Prompt")}
              className="px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-orange-500/40 text-orange-300 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              {copiedItem === "9:16 Master Image Prompt" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>9:16 Image Prompt</span>
            </button>

            <button
              onClick={() => handleCopy(activeTemplate.masterVideoPromptGen3, "Gen-3 Video Prompt")}
              className="px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              {copiedItem === "Gen-3 Video Prompt" ? <Check className="w-3.5 h-3.5" /> : <Film className="w-3.5 h-3.5" />}
              <span>Gen-3 Video Prompt</span>
            </button>
          </div>
        </div>

        {/* 3-Second Viral Hook Box */}
        <div className="bg-gradient-to-r from-orange-950/50 to-stone-950 border border-orange-500/30 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>3-Second Viral Hook (Audience Retention Magnet)</span>
            </span>
            <button
              onClick={() => handleCopy(`${activeTemplate.hookLineHindi}\n${activeTemplate.hookLine}`, "Viral Hook")}
              className="text-xs text-orange-400 hover:text-white font-bold underline cursor-pointer"
            >
              {copiedItem === "Viral Hook" ? "Copied!" : "Copy Hook"}
            </button>
          </div>
          <p className="text-sm md:text-base font-semibold text-orange-100">
            "{activeTemplate.hookLine}"
          </p>
          <p className="text-xs md:text-sm text-stone-300 font-medium">
            "{activeTemplate.hookLineHindi}"
          </p>
        </div>

        {/* Studio Sub-Tabs */}
        <div className="flex border-b border-stone-800 gap-4">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "timeline"
                ? "text-orange-400 border-b-2 border-orange-500"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Film className="w-4 h-4" />
            <span>4-Part Script & Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab("shloka")}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "shloka"
                ? "text-orange-400 border-b-2 border-orange-500"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <span>🕉️</span>
            <span>Vedic Shloka & Meaning</span>
          </button>

          <button
            onClick={() => setActiveTab("audio")}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "audio"
                ? "text-orange-400 border-b-2 border-orange-500"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>BGM & Sound Design</span>
          </button>

          <button
            onClick={() => setActiveTab("export")}
            className={`pb-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === "export"
                ? "text-orange-400 border-b-2 border-orange-500"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Captions & SEO Tags</span>
          </button>
        </div>

        {/* Tab 1: Timeline Breakdown */}
        {activeTab === "timeline" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTemplate.scriptBreakdown.map((step, idx) => (
              <div
                key={idx}
                className="bg-stone-950/80 border border-stone-800 hover:border-orange-500/40 rounded-xl p-4 space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 font-mono font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-orange-200">{step.section}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                    {step.timestamp}
                  </span>
                </div>

                {/* Voiceover Text */}
                <div className="bg-stone-900/90 p-3 rounded-lg border border-stone-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    <span>🎙️ Voiceover (Hindi / English)</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `${step.voiceoverHindi}\n${step.voiceoverEnglish}`,
                          `Voiceover Step ${idx + 1}`
                        )
                      }
                      className="text-orange-400 hover:text-white"
                    >
                      Copy VO
                    </button>
                  </div>
                  <p className="text-xs font-medium text-amber-100">"{step.voiceoverHindi}"</p>
                  <p className="text-[11px] text-stone-400 italic">"{step.voiceoverEnglish}"</p>
                </div>

                {/* Visual AI Prompt */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span>9:16 MIDJOURNEY / FLUX PROMPT</span>
                    <button
                      onClick={() => handleCopy(step.aiPrompt9x16, `AI Prompt Step ${idx + 1}`)}
                      className="text-orange-400 hover:text-white font-bold"
                    >
                      Copy Prompt
                    </button>
                  </div>
                  <p className="bg-stone-900/60 p-2.5 rounded-lg font-mono text-[11px] text-stone-300 leading-relaxed border border-stone-800/90 select-all">
                    {step.aiPrompt9x16}
                  </p>
                </div>

                {/* Camera Rig Direction */}
                <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
                  <span className="text-orange-400 font-bold">🎥 Camera:</span>
                  <span className="truncate">{step.videoCameraMovement}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Shloka */}
        {activeTab === "shloka" && (
          <div className="space-y-4">
            <div className="bg-stone-950 p-4 rounded-xl border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  🕉️ Sacred Sanskrit Shloka / Mantra
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `${activeTemplate.sanskritShloka.text}\n${activeTemplate.sanskritShloka.englishTransliteration}\nMeaning: ${activeTemplate.sanskritShloka.meaningHindi}`,
                      "Shloka & Meaning"
                    )
                  }
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold"
                >
                  Copy Shloka
                </button>
              </div>

              <p className="font-cinzel text-sm md:text-base font-bold text-amber-100 leading-relaxed">
                "{activeTemplate.sanskritShloka.text}"
              </p>
              <p className="font-mono text-xs text-stone-400">
                {activeTemplate.sanskritShloka.englishTransliteration}
              </p>
              <div className="border-t border-stone-800 pt-2 text-xs text-stone-300 space-y-1">
                <div>
                  <strong className="text-orange-400">Hindi Meaning:</strong>{" "}
                  {activeTemplate.sanskritShloka.meaningHindi}
                </div>
                <div>
                  <strong className="text-amber-400">English Meaning:</strong>{" "}
                  {activeTemplate.sanskritShloka.meaningEnglish}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Audio & Sound */}
        {activeTab === "audio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                <span>BGM Track Direction</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeTemplate.bgmRecommendation}
              </p>
            </div>

            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Sound FX (SFX) Cues
              </div>
              <div className="space-y-1.5">
                {activeTemplate.soundFxCues.map((cue, i) => (
                  <div
                    key={i}
                    className="text-xs text-stone-300 bg-stone-900 p-2 rounded border border-stone-800 font-mono"
                  >
                    {cue}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Export Captions */}
        {activeTab === "export" && (
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                🏷️ YouTube Shorts & Instagram Reels Caption + Hashtags
              </span>
              <button
                onClick={() => handleCopy(activeTemplate.captionAndHashtags, "Hashtags & Caption")}
                className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-stone-950 text-xs font-bold"
              >
                Copy Captions & Tags
              </button>
            </div>
            <textarea
              readOnly
              rows={5}
              value={activeTemplate.captionAndHashtags}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 font-mono outline-none resize-none leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* Standalone HTML Source Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-orange-500/30 rounded-2xl max-w-2xl w-full p-5 md:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-400" />
                <div>
                  <h3 className="font-cinzel font-bold text-orange-100 text-base">
                    📱 Standalone Daily Shorts HTML App (100% Offline)
                  </h3>
                  <p className="text-xs text-stone-400">
                    Single-file web app with all deities, 9:16 prompts & 1-click copy tools.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-stone-400 hover:text-stone-100 p-1.5 rounded-lg bg-stone-800 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                <div className="text-orange-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>How to use on your phone:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-stone-300 text-[11px]">
                  <li>
                    Click <strong>Download .html</strong> below or copy the code.
                  </li>
                  <li>
                    Save <code className="text-orange-400 bg-stone-900 px-1 py-0.5 rounded">ibd-daily-shorts-all-deities.html</code> onto your Android / iPhone files.
                  </li>
                  <li>
                    Open it directly in <strong>Safari or Chrome</strong> — no internet connection required!
                  </li>
                </ol>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={downloadStandaloneHtml}
                  className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .html File Now</span>
                </button>
                <button
                  onClick={() => {
                    const html = generateDailyShortsHtmlApp();
                    navigator.clipboard.writeText(html);
                    setCopiedHtmlCode(true);
                    setTimeout(() => setCopiedHtmlCode(false), 2500);
                  }}
                  className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-orange-200 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                >
                  {copiedHtmlCode ? <Check className="w-4 h-4 text-green-400" /> : <Code className="w-4 h-4" />}
                  <span>{copiedHtmlCode ? "HTML Code Copied!" : "Copy Full HTML Source"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
