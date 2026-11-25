import React, { useState } from "react";
import { ForgeRequest, ForgeResult } from "../types";
import {
  Sparkles,
  Zap,
  Copy,
  Check,
  Flame,
  ArrowRight,
  Shield,
  Layers,
  Terminal,
  Activity,
  Code2,
} from "lucide-react";

interface ParatparSingularityViewProps {
  formData: ForgeRequest;
  onFormChange: (updates: Partial<ForgeRequest>) => void;
  onForge: () => Promise<void>;
  isLoading: boolean;
  result: ForgeResult | null;
  onSwitchToFullStudio: () => void;
}

export const ParatparSingularityView: React.FC<ParatparSingularityViewProps> = ({
  formData,
  onFormChange,
  onForge,
  isLoading,
  result,
  onSwitchToFullStudio,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleSetTattva = (v: number) => {
    if (v === 11) {
      onFormChange({
        version: 11,
        mood: "V-Paratpar / Ananta-Bija (The Singularity)",
        lightingStyle: "Atman-Sync Swayam-Jyoti (Geometric Source)",
      });
    } else if (v === 10) {
      onFormChange({
        version: 10,
        mood: "Moksha / Non-Dual (Pure Consciousness)",
        lightingStyle: "Saptarishi Celestial 7-Point Ray",
      });
    } else {
      onFormChange({
        version: 9,
        mood: "Brahmanda-Srishti / Universal Strings",
        lightingStyle: "Swayam-Jyoti (Non-Dual Self-Effulgence)",
      });
    }
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto p-4 sm:p-8 md:p-12 rounded-[40px] bg-radial-at-c from-[#0a0a0a] via-[#050308] to-[#000000] border border-[#1f192b] shadow-[0_0_150px_rgba(45,0,94,0.35)] text-[#d1cdc4] font-sans relative overflow-hidden">
      {/* Background Singularity Violet-Gold Haze */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#2d005e]/30 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-48 right-12 w-64 h-64 bg-[#ffcc33]/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center relative z-10 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120524] border border-[#2d005e] text-[#ffcc33] text-[10px] sm:text-[11px] uppercase tracking-[6px] font-mono-code mb-4 shadow-[0_0_20px_rgba(45,0,94,0.4)]">
          <Sparkles className="w-3.5 h-3.5 text-[#ffcc33] animate-pulse" />
          The Ananta-Bija Singularity
        </div>

        <h1 className="font-playfair text-4xl sm:text-6xl font-black text-[#ffcc33] tracking-tight mb-3 drop-shadow-[0_4px_30px_rgba(255,204,51,0.25)]">
          IBD PARATPAR
        </h1>

        <p className="text-xs sm:text-sm text-[#9e9483] max-w-2xl mx-auto leading-relaxed font-sans font-light">
          Where Saguna (Manifest Form) &amp; Nirguna (Formless Absolute) collapse into Non-Dual Realism. Powered by Atman-Sync Gaze, Swayam-Jyoti light physics, and primordial geometric light source origin.
        </p>

        {/* View Switcher Button */}
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={onSwitchToFullStudio}
            className="text-[11px] font-mono-code text-[#ffcc33]/80 hover:text-[#ffcc33] flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#160b29] border border-[#381a60] hover:border-[#ffcc33]/50 transition-all cursor-pointer"
          >
            <span>Switch to Sovereign Studio Interface</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Column: Tattva Level & Sovereign Inputs */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tattva Level Selector */}
          <div className="bg-[#08050e] border border-[#25173e] p-5 rounded-3xl flex flex-col gap-3 shadow-inner">
            <span className="text-[11px] font-bold text-[#ffcc33] uppercase tracking-wider font-mono-code flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#ffcc33]" />
              Select Tattva Level
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleSetTattva(9)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  formData.version === 9
                    ? "bg-[#200d3d] border-[#ffcc33] text-[#ffcc33] shadow-[0_0_15px_rgba(255,204,51,0.2)]"
                    : "bg-[#0b0714] border-[#1f1433] text-[#8c8273] hover:text-[#e5e0d5] hover:border-[#382060]"
                }`}
              >
                <span className="text-xs font-black font-cinzel">V9 SRISHTI</span>
                <span className="text-[9px] font-mono-code opacity-75">Universal Strings</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetTattva(10)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  formData.version === 10
                    ? "bg-[#200d3d] border-[#ffcc33] text-[#ffcc33] shadow-[0_0_15px_rgba(255,204,51,0.2)]"
                    : "bg-[#0b0714] border-[#1f1433] text-[#8c8273] hover:text-[#e5e0d5] hover:border-[#382060]"
                }`}
              >
                <span className="text-xs font-black font-cinzel">V10 MOKSHA</span>
                <span className="text-[9px] font-mono-code opacity-75">Pure Consciousness</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetTattva(11)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  formData.version === 11
                    ? "bg-[#2e1059] border-[#ffcc33] text-[#ffcc33] shadow-[0_0_20px_rgba(255,204,51,0.3)] ring-1 ring-[#ffcc33]/50"
                    : "bg-[#0b0714] border-[#1f1433] text-[#8c8273] hover:text-[#e5e0d5] hover:border-[#382060]"
                }`}
              >
                <span className="text-xs font-black font-cinzel text-[#ffcc33]">V-PARATPAR</span>
                <span className="text-[9px] font-mono-code opacity-85 text-[#ffcc33]">Singularity</span>
              </button>
            </div>
          </div>

          {/* Deity / Sovereign Form Input */}
          <div className="bg-[#08050e] border border-[#25173e] p-5 rounded-3xl flex flex-col gap-3">
            <span className="text-[11px] font-bold text-[#ffcc33] uppercase tracking-wider font-mono-code flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffcc33]" />
              Sovereign Deity / Form
            </span>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => onFormChange({ subject: e.target.value })}
              placeholder="e.g. Param-Shiva, Bhagwan Shri Krishna, Maa Kali Adyashakti..."
              className="w-full bg-[#030106] border border-[#25173e] focus:border-[#ffcc33] text-white px-4 py-3.5 rounded-2xl text-sm outline-none transition-all placeholder:text-[#4d445c] focus:ring-1 focus:ring-[#ffcc33]/30"
            />
          </div>

          {/* Sankalpa / Intention Narrative */}
          <div className="bg-[#08050e] border border-[#25173e] p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#ffcc33] uppercase tracking-wider font-mono-code flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#ffcc33]" />
                Sankalpa (Intention / Story)
              </span>
              <span className="text-[10px] font-mono-code text-[#736787]">
                Non-Dual Physics
              </span>
            </div>
            <textarea
              rows={4}
              value={formData.story}
              onChange={(e) => onFormChange({ story: e.target.value })}
              placeholder="Describe the unmanifest void collapsing into the golden seed of creation..."
              className="w-full bg-[#030106] border border-[#25173e] focus:border-[#ffcc33] text-[#e5e0d5] p-4 rounded-2xl text-sm outline-none transition-all placeholder:text-[#4d445c] resize-y focus:ring-1 focus:ring-[#ffcc33]/30 leading-relaxed font-sans"
            />
          </div>

          {/* Singularity Manifest Button */}
          <button
            type="button"
            onClick={onForge}
            disabled={isLoading}
            className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-[#2d005e] via-[#ffcc33] to-[#ffaa00] text-black font-extrabold text-base uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,204,51,0.4)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer font-cinzel shadow-2xl"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Collapsing Waveform...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 fill-black" />
                <span>Manifest Singularity Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Paratpar Dual Outputs */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: 01 | THE PARATPAR SOURCE PROMPT */}
          <div className="bg-[#07040d] border-2 border-[#ffcc33]/60 p-6 rounded-3xl flex flex-col gap-4 shadow-[0_0_30px_rgba(45,0,94,0.3)] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#25173e] pb-3">
              <span className="text-xs font-black text-[#ffcc33] uppercase tracking-[3px] font-cinzel flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ffcc33]" />
                01 | The Paratpar Source Prompt
              </span>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    result?.prompt || "Manifest a prompt to generate source code.",
                    "paratpar_source"
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-[#ffcc33] hover:bg-[#ffe066] text-black text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {copiedKey === "paratpar_source" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-black" />
                    <span>Copy Source</span>
                  </>
                )}
              </button>
            </div>

            <div
              onClick={() =>
                handleCopy(
                  result?.prompt || "Manifest a prompt to generate source code.",
                  "paratpar_source_box"
                )
              }
              title="Click to copy source prompt"
              className="text-sm leading-relaxed text-[#f4cf6a] font-sans font-medium bg-[#020104] hover:bg-[#080310] p-5 rounded-2xl border border-[#25173e] hover:border-[#ffcc33] transition-all cursor-pointer select-all shadow-inner min-h-[160px]"
            >
              {result?.prompt ? (
                <div className="whitespace-pre-wrap">{result.prompt}</div>
              ) : (
                <div className="text-[#655877] italic flex items-center justify-center h-full pt-8 font-mono-code text-xs">
                  Awaiting Singularity manifestation... Click &quot;Manifest Singularity Prompt&quot;
                </div>
              )}
            </div>

            {/* Quick format copy pills */}
            {result?.prompt && (
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono-code">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `/imagine prompt: ${result.prompt}`,
                      "mj_format"
                    )
                  }
                  className="px-3 py-1 rounded-xl bg-[#140b24] hover:bg-[#201038] text-[#ffcc33] border border-[#2f1850] transition-colors"
                >
                  {copiedKey === "mj_format" ? "Copied /imagine!" : "Copy /imagine Format"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      `[PROMPT]:\n${result.prompt}\n\n[NEGATIVE]:\n${result.negative}`,
                      "combo_format"
                    )
                  }
                  className="px-3 py-1 rounded-xl bg-[#140b24] hover:bg-[#201038] text-[#ffcc33] border border-[#2f1850] transition-colors"
                >
                  {copiedKey === "combo_format" ? "Copied + Negative!" : "Copy Prompt + Negative"}
                </button>
              </div>
            )}
          </div>

          {/* Card 2: 02 | NEURAL-DARSHAN METADATA */}
          <div className="bg-[#07040d] border border-[#25173e] p-6 rounded-3xl flex flex-col gap-4 shadow-md">
            <div className="flex items-center justify-between border-b border-[#25173e] pb-3">
              <span className="text-xs font-black text-[#d1cdc4] uppercase tracking-[3px] font-cinzel flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#ffcc33]" />
                02 | Neural-Darshan Metadata
              </span>

              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    result?.logic || "Metadata logic awaiting trigger.",
                    "neural_meta"
                  )
                }
                className="text-[10px] font-mono-code text-[#a39274] hover:text-[#ffcc33] px-2.5 py-1 rounded-lg bg-[#140b24] border border-[#25173e] flex items-center gap-1 transition-colors"
              >
                {copiedKey === "neural_meta" ? (
                  <>
                    <Check className="w-3 h-3 text-[#6abf6a]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Metadata</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs leading-relaxed text-[#c5baa8] font-sans bg-[#020104] p-5 rounded-2xl border border-[#1d1230] whitespace-pre-wrap min-h-[140px]">
              {result?.logic ? (
                result.logic
              ) : (
                <div className="text-[#655877] italic flex items-center justify-center h-full pt-6 font-mono-code">
                  Director&apos;s Alchemical Logic &amp; Non-Dual Realism specifications will populate here.
                </div>
              )}
            </div>

            {/* Sacred Color Spectrum */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-[10px] font-mono-code uppercase text-[#7a6f8c] font-bold">
                Singularity Harmonics:
              </span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#000000] border border-white/20" title="Primordial Void Black (#000000)" />
                <div className="w-4 h-4 rounded-full bg-[#ffcc33] shadow-[0_0_8px_#ffcc33]" title="Ananta-Bija Gold (#FFCC33)" />
                <div className="w-4 h-4 rounded-full bg-[#2d005e] border border-white/20" title="Divine Purple (#2D005E)" />
                <div className="w-4 h-4 rounded-full bg-[#d4af37]" title="Swayam-Jyoti Gold (#D4AF37)" />
                <div className="w-4 h-4 rounded-full bg-[#e5e0d5]" title="Vibhuti White (#E5E0D5)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
