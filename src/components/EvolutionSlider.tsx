import React from "react";
import { EVOLUTION_LEVEL_INFO } from "../data/presets";
import { Sparkles, Flame, Shield, Compass, Sun, Moon } from "lucide-react";

interface EvolutionSliderProps {
  version: number;
  onChange: (version: number) => void;
}

const TIER_GROUPS = [
  { label: "Studio (V1-V3)", range: [1, 2, 3], color: "#a39274" },
  { label: "Shastra (V4-V6)", range: [4, 5, 6], color: "#d4af37" },
  { label: "Darshan (V7-V10)", range: [7, 8, 9, 10], color: "#ffd700" },
  { label: "Universal (V11-V14)", range: [11, 12, 13, 14], color: "#a8e6cf" },
  { label: "Sovereign Deck (V15-V17)", range: [15, 16, 17], color: "#ffd700" },
  { label: "HP/VP Matrix (V18-V21)", range: [18, 19, 20, 21], color: "#f15bb5" },
  { label: "Singularity (V-Omega)", range: [22], color: "#ffcc33" },
];

export const EvolutionSlider: React.FC<EvolutionSliderProps> = ({
  version,
  onChange,
}) => {
  const currentInfo =
    EVOLUTION_LEVEL_INFO[version] || EVOLUTION_LEVEL_INFO[17] || EVOLUTION_LEVEL_INFO[10];

  const getLabel = (v: number) => {
    if (v === 22) return "V-Ω";
    if (v === 18) return "V18 ⚡";
    if (v === 19) return "V19 ☀️";
    if (v === 20) return "V20 🌌";
    if (v === 21) return "V21 🛕";
    return `V${v}`;
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#f4cf6a]" />
          Sovereign Evolution Level (V1 Studio — V21 Garbhagriha — V-Omega)
        </label>
        <span
          className="text-xs font-bold font-mono-code px-2.5 py-0.5 rounded border border-[#4a3b1a] bg-[#14100b] shadow-sm transition-all"
          style={{ color: currentInfo.color, borderColor: `${currentInfo.color}50` }}
        >
          {currentInfo.badge}: {currentInfo.name}
        </span>
      </div>

      <div className="bg-[#0a0806] p-4 rounded-xl border border-[#262016] flex flex-col gap-3 shadow-inner">
        {/* Tier Quick Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {TIER_GROUPS.map((group) => {
            const isGroupActive = group.range.includes(version);
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => onChange(group.range[0])}
                className={`text-[10px] px-2 py-1 rounded-md font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isGroupActive
                    ? "bg-[#261d11] text-[#f4cf6a] border border-[#ffcc33]/40 shadow-sm"
                    : "bg-[#120e0a] text-[#8c7a5c] hover:text-[#e5e0d5] border border-[#1f1910]"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Range Slider */}
        <div className="relative flex items-center">
          <input
            type="range"
            min="1"
            max="22"
            step="1"
            value={version}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2.5 bg-[#1f1910] rounded-lg appearance-none cursor-pointer accent-[#ffcc33] transition-all"
            style={{
              background: `linear-gradient(to right, #8c6d1f 0%, #ffcc33 ${
                ((version - 1) / 21) * 100
              }%, #1a140d ${((version - 1) / 21) * 100}%, #1a140d 100%)`,
            }}
          />
        </div>

        {/* Step Buttons (1 to 22) */}
        <div className="grid grid-cols-11 sm:grid-cols-22 gap-1 text-[9px] font-mono-code text-[#8c7a5c] font-semibold">
          {Array.from({ length: 22 }, (_, i) => i + 1).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onChange(v)}
              title={EVOLUTION_LEVEL_INFO[v]?.name || `V${v}`}
              className={`transition-all py-1 rounded text-center cursor-pointer ${
                version === v
                  ? "text-[#ffcc33] font-extrabold bg-[#2d1e0a] border border-[#ffcc33]/60 shadow-sm scale-105"
                  : "hover:text-[#f4cf6a] hover:bg-[#18120c]"
              }`}
            >
              {getLabel(v)}
            </button>
          ))}
        </div>

        {/* Description & Craft Focus */}
        <div className="mt-1 pt-2.5 border-t border-[#1f1910] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="text-[#c5baa8] leading-relaxed">
            <span
              className="font-bold"
              style={{ color: currentInfo.color }}
            >
              {currentInfo.name}:{" "}
            </span>
            {currentInfo.desc}
          </div>
          <div className="text-[10px] text-[#ffcc33] shrink-0 font-mono-code bg-[#14100b] px-2.5 py-1 rounded border border-[#2b2214]">
            ⚡ {currentInfo.craftFocus}
          </div>
        </div>
      </div>
    </div>
  );
};


