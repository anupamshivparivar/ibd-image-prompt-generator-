import React, { useState, useMemo } from "react";
import {
  TeerthDestination,
  TeerthVisualPrompt,
  AspectRatio,
  ForgeRequest,
} from "../types";
import {
  ALL_TEERTH_DESTINATIONS,
  GURUDWARAS_LIST,
  TEMPLES_LIST,
} from "../data/teerthData";
import {
  Sparkles,
  Copy,
  Check,
  Compass,
  MapPin,
  Flame,
  Search,
  Filter,
  Download,
  Send,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Camera,
  Layers,
  Crown,
  Share2,
} from "lucide-react";

interface TeerthMatrix10xViewProps {
  onSendToForge?: (request: Partial<ForgeRequest>) => void;
  showToast: (msg: string) => void;
}

export const TeerthMatrix10xView: React.FC<TeerthMatrix10xViewProps> = ({
  onSendToForge,
  showToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "gurudwara" | "temple"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    ALL_TEERTH_DESTINATIONS[0].id
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [aspectRatioOverride, setAspectRatioOverride] = useState<
    Record<number, AspectRatio>
  >({});
  const [activeFilterTag, setActiveFilterTag] = useState<string>("all");

  // Selected Destination Object
  const selectedDestination = useMemo(() => {
    return (
      ALL_TEERTH_DESTINATIONS.find((d) => d.id === selectedDestinationId) ||
      ALL_TEERTH_DESTINATIONS[0]
    );
  }, [selectedDestinationId]);

  // Filtered Destinations
  const filteredDestinations = useMemo(() => {
    let list = ALL_TEERTH_DESTINATIONS;
    if (selectedCategory === "gurudwara") {
      list = GURUDWARAS_LIST;
    } else if (selectedCategory === "temple") {
      list = TEMPLES_LIST;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.sanctumTitle.toLowerCase().includes(q) ||
          (d.gurmukhiHindiName && d.gurmukhiHindiName.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  // Handle single prompt copy
  const handleCopyPrompt = (promptItem: TeerthVisualPrompt, idx: number) => {
    const selectedAr = aspectRatioOverride[idx] || promptItem.aspectRatio;
    let finalPrompt = promptItem.prompt;

    // Adjust prompt's --ar parameter if overridden
    if (selectedAr !== promptItem.aspectRatio) {
      finalPrompt = finalPrompt.replace(
        /--ar \d+:\d+/g,
        `--ar ${selectedAr}`
      );
    }

    navigator.clipboard.writeText(finalPrompt);
    setCopiedIndex(idx);
    showToast(`Visual #${idx} prompt copied to clipboard!`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Handle copy all 10 prompts
  const handleCopyAll = () => {
    if (!selectedDestination) return;

    const fullBatchText = selectedDestination.visuals
      .map((v, i) => {
        const selectedAr = aspectRatioOverride[v.index] || v.aspectRatio;
        let adjustedPrompt = v.prompt;
        if (selectedAr !== v.aspectRatio) {
          adjustedPrompt = adjustedPrompt.replace(
            /--ar \d+:\d+/g,
            `--ar ${selectedAr}`
          );
        }
        return `// [VISUAL ${v.index}/10] ${v.title} (${v.timeOfDay} | ${v.cameraAngle})\n${adjustedPrompt}\n`;
      })
      .join("\n----------------------------------------\n\n");

    const headerText = `/* ==========================================================================\n   IBD 10x SACRED VISUAL SUITE: ${selectedDestination.name}\n   Category: ${selectedDestination.category} | Location: ${selectedDestination.location}\n   Sanctum: ${selectedDestination.sanctumTitle}\n   Mantra: ${selectedDestination.sacredChant}\n   ========================================================================== */\n\n${fullBatchText}`;

    navigator.clipboard.writeText(headerText);
    setCopiedAll(true);
    showToast(`All 10 ${selectedDestination.name} prompts copied!`);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  // Handle Export to JSON
  const handleExportJSON = () => {
    if (!selectedDestination) return;
    const jsonStr = JSON.stringify(selectedDestination, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedDestination.id}-10x-prompts.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded 10x Prompts JSON package!");
  };

  // Handle Send to Forge
  const handleSendPromptToForge = (v: TeerthVisualPrompt) => {
    if (!onSendToForge || !selectedDestination) return;
    onSendToForge({
      subject: `${selectedDestination.name} — ${v.title}`,
      story: v.prompt,
      dim: aspectRatioOverride[v.index] || v.aspectRatio,
      version: 11,
      targetEngine: "Midjourney v6.1",
      mood: "Rasa-Alaukika (Divine Wonder & Bliss)",
      lightingStyle: "Atman-Sync Swayam-Jyoti (Geometric Source)",
    });
    showToast(`Sent Visual #${v.index} to Darshan Forge!`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b140b] via-[#241a0e] to-[#120d07] border border-[#d4af37]/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#ffd700]">
                1-CLICK 10x VISUAL SUITE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code bg-[#ff9933]/20 border border-[#ff9933]/40 text-[#ffaa33]">
                PUNJABI GURUDWARA & TEERTH MATRIX
              </span>
            </div>
            <h2 className="font-cinzel text-2xl md:text-4xl font-bold text-[#f4cf6a] tracking-tight">
              Teerth & Gurudwara 10-Visual Suites
            </h2>
            <p className="text-xs md:text-sm text-[#d4af37]/80 max-w-3xl leading-relaxed">
              Select any sacred Gurudwara or famous Mahamandir to instantly unlock 10 distinct,
              canonically verified, cinematic visual prompts with varying angles, lighting conditions,
              aspect ratios, and production metadata.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-[#0f0b07]/80 border border-[#3d2e18] p-3.5 rounded-xl shrink-0">
            <div className="text-center px-2">
              <div className="text-xl font-cinzel font-bold text-[#ffd700]">
                {ALL_TEERTH_DESTINATIONS.length}
              </div>
              <div className="text-[10px] text-[#a89984] uppercase tracking-wider">
                Sanctuaries
              </div>
            </div>
            <div className="h-8 w-[1px] bg-[#3d2e18]" />
            <div className="text-center px-2">
              <div className="text-xl font-cinzel font-bold text-[#ff9933]">
                {ALL_TEERTH_DESTINATIONS.length * 10}
              </div>
              <div className="text-[10px] text-[#a89984] uppercase tracking-wider">
                Prompts Ready
              </div>
            </div>
            <div className="h-8 w-[1px] bg-[#3d2e18]" />
            <div className="text-center px-2">
              <div className="text-xl font-cinzel font-bold text-[#f8f9fa]">
                10x
              </div>
              <div className="text-[10px] text-[#a89984] uppercase tracking-wider">
                Variations/Spot
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#120d08] p-1.5 rounded-xl border border-[#2b2014] overflow-x-auto scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-[#d4af37] text-black shadow-md shadow-[#d4af37]/20"
                : "text-[#c7b9a5] hover:text-[#ffd700] hover:bg-[#1f170f]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>All Destinations ({ALL_TEERTH_DESTINATIONS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("gurudwara")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === "gurudwara"
                ? "bg-[#ff9933] text-black shadow-md shadow-[#ff9933]/20"
                : "text-[#c7b9a5] hover:text-[#ffaa33] hover:bg-[#1f170f]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>☬ Sacred Gurudwaras ({GURUDWARAS_LIST.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("temple")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === "temple"
                ? "bg-[#e07a5f] text-black shadow-md shadow-[#e07a5f]/20"
                : "text-[#c7b9a5] hover:text-[#e07a5f] hover:bg-[#1f170f]"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>🛕 Famous Hindu Teerth ({TEMPLES_LIST.length})</span>
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[260px] md:w-80">
          <Search className="w-4 h-4 text-[#8c7a64] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Gurudwara or Temple..."
            className="w-full pl-10 pr-4 py-2 bg-[#120d08] border border-[#2b2014] rounded-xl text-xs text-[#e5e0d5] placeholder-[#6b5c49] focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c7a64] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Carousel / Grid of Destinations */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[#a89984]">
          <span>Select Sacred Destination (Click to instantly load 10 visuals):</span>
          <span>Showing {filteredDestinations.length} Sanctuaries</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
          {filteredDestinations.map((dest) => {
            const isSelected = dest.id === selectedDestinationId;
            const isGurudwara = dest.type === "gurudwara";

            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => {
                  setSelectedDestinationId(dest.id);
                  showToast(`Loaded 10 visuals for ${dest.name}!`);
                }}
                className={`relative p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
                  isSelected
                    ? isGurudwara
                      ? "bg-[#2b1d0e] border-[#ff9933] shadow-lg shadow-[#ff9933]/15 scale-[1.02]"
                      : "bg-[#25170d] border-[#d4af37] shadow-lg shadow-[#d4af37]/15 scale-[1.02]"
                    : "bg-[#110d08] hover:bg-[#1a140d] border-[#261d13] hover:border-[#423321]"
                }`}
              >
                {/* Badge Tag */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isGurudwara
                        ? "bg-[#ff9933]/20 text-[#ffaa33]"
                        : "bg-[#d4af37]/20 text-[#ffd700]"
                    }`}
                  >
                    {isGurudwara ? "☬ Gurudwara" : "🛕 Mandir"}
                  </span>
                  <span className="text-[9px] text-[#8c7a64] font-mono-code font-bold">
                    10x
                  </span>
                </div>

                {/* Name & Location */}
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-[#f4cf6a] line-clamp-2 leading-tight group-hover:text-white transition-colors">
                    {dest.name}
                  </h4>
                  <p className="text-[10px] text-[#a89984] line-clamp-1 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 shrink-0 text-[#8c7a64]" />
                    <span>{dest.location.split(",")[0]}</span>
                  </p>
                </div>

                {/* Color dots bar */}
                <div className="flex items-center gap-1 mt-2">
                  {dest.palette.slice(0, 4).map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className="w-2 h-2 rounded-full border border-black/40"
                      style={{ backgroundColor: p.hex }}
                      title={p.name}
                    />
                  ))}
                </div>

                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-md">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Destination Detail Banner & Actions */}
      <div className="bg-[#140e08] border border-[#332415] rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  selectedDestination.type === "gurudwara"
                    ? "bg-[#ff9933]/20 text-[#ffaa33] border border-[#ff9933]/40"
                    : "bg-[#d4af37]/20 text-[#ffd700] border border-[#d4af37]/40"
                }`}
              >
                {selectedDestination.badge}
              </span>
              <span className="text-[11px] text-[#a89984] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#d4af37]" />
                {selectedDestination.location}
              </span>
            </div>

            <div>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-[#f4cf6a]">
                {selectedDestination.name}
              </h3>
              {selectedDestination.gurmukhiHindiName && (
                <p className="text-sm font-semibold text-[#ffaa33] mt-0.5">
                  {selectedDestination.gurmukhiHindiName}
                </p>
              )}
            </div>

            <p className="text-xs md:text-sm text-[#d4af37]/80 max-w-4xl leading-relaxed">
              {selectedDestination.description}
            </p>

            {/* Sacred Chant / Shloka */}
            <div className="p-3 rounded-xl bg-[#0a0704] border border-[#2b1d0e] flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a89984] block mb-0.5">
                  Sacred Consecrated Chant / Mantra:
                </span>
                <span className="text-xs font-semibold text-[#ffcc33] italic">
                  "{selectedDestination.sacredChant}"
                </span>
              </div>
            </div>

            {/* Color Palette Chips */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8c7a64] mr-1">
                Sacred Palette:
              </span>
              {selectedDestination.palette.map((pal, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0704] border border-[#261b0f] text-[10px] text-[#e5e0d5]"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/50"
                    style={{ backgroundColor: pal.hex }}
                  />
                  <span>{pal.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row lg:flex-col items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyAll}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f4cf6a] text-black font-bold text-xs shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>All 10 Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy All 10 Prompts</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1f170f] hover:bg-[#2b2015] border border-[#3d2e1c] text-[#ffd700] font-semibold text-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON Suite</span>
            </button>
          </div>
        </div>

        {/* 10 Visual Cards Grid */}
        <div className="space-y-4 pt-4 border-t border-[#261a0e]">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-cinzel text-lg font-bold text-[#f4cf6a] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>10 Distinct Visual Prompts & Angles</span>
            </h4>
            <span className="text-[11px] text-[#a89984]">
              Midjourney v6.1 & Octane 8K Optimized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDestination.visuals.map((v) => {
              const currentAr = aspectRatioOverride[v.index] || v.aspectRatio;
              const isCopied = copiedIndex === v.index;

              // Live updated prompt text with overridden AR
              let livePrompt = v.prompt;
              if (currentAr !== v.aspectRatio) {
                livePrompt = livePrompt.replace(
                  /--ar \d+:\d+/g,
                  `--ar ${currentAr}`
                );
              }

              return (
                <div
                  key={v.index}
                  className="bg-[#0b0805] border border-[#241a0f] hover:border-[#423019] rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all hover:shadow-lg group"
                >
                  {/* Top Bar of Visual Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#ffd700] text-xs font-bold flex items-center justify-center shrink-0">
                        {v.index}
                      </span>
                      <h5 className="font-cinzel text-xs font-bold text-[#f4cf6a] group-hover:text-white transition-colors">
                        {v.title}
                      </h5>
                    </div>

                    {/* Aspect Ratio Selector */}
                    <div className="flex items-center gap-1 shrink-0">
                      {(["16:9", "9:16", "2:3", "1:1", "21:9"] as AspectRatio[]).map(
                        (ar) => (
                          <button
                            key={ar}
                            type="button"
                            onClick={() =>
                              setAspectRatioOverride((prev) => ({
                                ...prev,
                                [v.index]: ar,
                              }))
                            }
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold transition-colors cursor-pointer ${
                              currentAr === ar
                                ? "bg-[#d4af37] text-black"
                                : "bg-[#140e08] text-[#8c7a64] hover:text-[#ffd700]"
                            }`}
                          >
                            {ar}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Metadata Chips: Time & Camera */}
                  <div className="flex items-center gap-2 flex-wrap text-[10px]">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#161009] border border-[#2b1f13] text-[#ffaa33]">
                      <Sun className="w-2.5 h-2.5" />
                      <span>{v.timeOfDay}</span>
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#161009] border border-[#2b1f13] text-[#90e0ef]">
                      <Camera className="w-2.5 h-2.5" />
                      <span>{v.cameraAngle}</span>
                    </span>
                  </div>

                  {/* Prompt Text Box */}
                  <div className="relative bg-[#060402] border border-[#1c130b] rounded-lg p-3 text-[11px] text-[#e0d6c5] font-mono-code leading-relaxed max-h-36 overflow-y-auto scrollbar-thin select-all">
                    {livePrompt}
                  </div>

                  {/* Bottom Actions Bar */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#1a1208]">
                    <div className="flex items-center gap-1 flex-wrap">
                      {v.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] text-[#8c7a64] bg-[#120d08] px-1.5 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {onSendToForge && (
                        <button
                          type="button"
                          onClick={() => handleSendPromptToForge(v)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1a130b] hover:bg-[#2b1f12] border border-[#382816] text-[10px] text-[#d4af37] font-semibold transition-colors cursor-pointer"
                          title="Open in V10 Darshan Forge Studio"
                        >
                          <Send className="w-3 h-3" />
                          <span>Forge</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleCopyPrompt(v, v.index)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          isCopied
                            ? "bg-[#2a9d8f] text-white"
                            : "bg-[#d4af37] hover:bg-[#f4cf6a] text-black shadow-sm"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
