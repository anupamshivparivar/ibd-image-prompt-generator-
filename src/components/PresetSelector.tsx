import React, { useState, useMemo } from "react";
import { DIVINE_PRESETS } from "../data/presets";
import { DivinePreset } from "../types";
import {
  X,
  Sparkles,
  Flame,
  Sun,
  Shield,
  Mountain,
  Crown,
  Eye,
  Heart,
  Copy,
  Check,
  Search,
  Users,
} from "lucide-react";

interface PresetSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: DivinePreset) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case "Flame":
      return <Flame className="w-5 h-5 text-[#f4cf6a]" />;
    case "Sun":
      return <Sun className="w-5 h-5 text-[#ffd700]" />;
    case "Shield":
      return <Shield className="w-5 h-5 text-[#e6ad25]" />;
    case "Mountain":
      return <Mountain className="w-5 h-5 text-[#d4af37]" />;
    case "Crown":
      return <Crown className="w-5 h-5 text-[#f4cf6a]" />;
    case "Eye":
      return <Eye className="w-5 h-5 text-[#ff8c00]" />;
    case "Heart":
      return <Heart className="w-5 h-5 text-[#ff6b6b]" />;
    default:
      return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
  }
};

const CATEGORIES = [
  "All",
  "Nostalgia & Smaran (Papa's Music)",
  "Shiv Parivar & Jhoola",
  "Ram Sita Circuit",
  "Krishna Circuit",
  "Yugal Swaroop (Couples)",
  "Shiva & Shakti",
  "Devi Swaroop",
  "Bhakti & Gana",
  "Cosmic Singularity",
];

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPresets = useMemo(() => {
    return DIVINE_PRESETS.filter((preset) => {
      const matchesCategory =
        selectedCategory === "All" || preset.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        preset.title.toLowerCase().includes(q) ||
        preset.deity.toLowerCase().includes(q) ||
        preset.story.toLowerCase().includes(q) ||
        (preset.category && preset.category.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const handleCopyStory = (preset: DivinePreset, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${preset.deity} - ${preset.story}`);
    setCopiedId(preset.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#110e0a] border border-[#382d1c] rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#262016] flex items-center justify-between bg-[#17130d]">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-[#f4cf6a] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              Sacred Canon Presets & Yugal Swaroop
            </h2>
            <p className="text-xs text-[#a39274]">
              Select an authentic Vedic deity or divine couple archetype for instant key-art synthesis
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#a39274] hover:text-[#f4cf6a] hover:bg-[#251e16] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls: Search & Category Chips */}
        <div className="px-6 pt-4 pb-3 border-b border-[#262016] bg-[#0c0906] flex flex-col gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c7a5c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by deity (e.g. Radha Krishna, Shiva Parvati, Sita Ram, Saraswati)..."
              className="w-full bg-[#17120a] border border-[#2a2215] focus:border-[#d4af37] text-white pl-10 pr-4 py-2 rounded-xl text-xs outline-none transition-all placeholder:text-[#5a4c38] focus:ring-1 focus:ring-[#d4af37]/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c7a5c] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/20"
                    : "bg-[#17120a] text-[#a39274] hover:text-[#f4cf6a] hover:bg-[#221a0f] border border-[#262016]"
                }`}
              >
                {cat === "Yugal Swaroop (Couples)" && <Users className="w-3 h-3" />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Presets Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {filteredPresets.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-[#8c7a5c] flex flex-col items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-[#d4af37]/40" />
              <p className="text-sm">No divine presets match your filter</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-[#d4af37] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredPresets.map((preset) => (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className="group cursor-pointer bg-[#0a0805] hover:bg-[#19140d] border border-[#262016] hover:border-[#d4af37] p-4 rounded-xl transition-all duration-200 flex flex-col justify-between gap-3 shadow-md hover:shadow-[#d4af37]/10"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a140d] border border-[#382d1c] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getIcon(preset.iconName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-cinzel font-bold text-sm text-[#f4cf6a] group-hover:text-[#ffd700] truncate">
                        {preset.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-[#1f180f] text-[#d4af37] border border-[#382d1c]">
                          V{preset.version}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopyStory(preset, e)}
                          className="p-1 rounded bg-[#17120a] hover:bg-[#281f12] text-[#a39274] hover:text-[#f4cf6a] border border-[#382d1c] transition-colors"
                          title="Copy deity narrative"
                        >
                          {copiedId === preset.id ? (
                            <Check className="w-3 h-3 text-[#6abf6a]" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-[#8c7a5c] font-medium truncate">
                        {preset.deity}
                      </span>
                      {preset.category === "Yugal Swaroop (Couples)" && (
                        <span className="text-[9px] font-mono-code px-1.5 py-0.2 rounded bg-[#ff6b6b]/10 text-[#ff8c8c] border border-[#ff6b6b]/30 shrink-0">
                          Yugal Swaroop
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#c5baa8] line-clamp-2 mt-1.5 leading-relaxed">
                      {preset.story}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1a140d] flex items-center justify-between text-[10px] font-mono-code text-[#8c7a5c]">
                  <span className="text-[#d4af37] font-semibold">
                    {preset.dim} • {preset.targetEngine}
                  </span>
                  <span className="group-hover:text-[#f4cf6a] transition-colors flex items-center gap-1">
                    Load Sankalpa &rarr;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
