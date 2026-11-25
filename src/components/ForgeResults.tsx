import React, { useState } from "react";
import { ForgeResult, AspectRatio } from "../types";
import { VisualizerPreview } from "./VisualizerPreview";
import {
  Copy,
  Check,
  Bookmark,
  Download,
  Sparkles,
  Shield,
  Layers,
  Terminal,
  ChevronDown,
  ChevronUp,
  FileText,
  Zap,
  Code2,
  Filter,
  ExternalLink,
  Sliders,
} from "lucide-react";
import { BEST_OUTPUT_GENERATOR_LINKS } from "../data/cinemaSamplerData";

interface ForgeResultsProps {
  result: ForgeResult;
  subject: string;
  version: number;
  dim: AspectRatio;
  onSaveToSanctuary: () => void;
  isSaved: boolean;
}

type CopyFormat = "standard" | "midjourney" | "with_negative" | "clean";

export const ForgeResults: React.FC<ForgeResultsProps> = ({
  result,
  subject,
  version,
  dim,
  onSaveToSanctuary,
  isSaved,
}) => {
  const [activeFormat, setActiveFormat] = useState<CopyFormat>("standard");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showMetadata, setShowMetadata] = useState(true);

  // Helper to extract clean prompt without engine flags
  const getCleanPrompt = (rawPrompt: string) => {
    return rawPrompt
      .replace(/--ar\s+[^\s]+/gi, "")
      .replace(/--style\s+[^\s]+/gi, "")
      .replace(/--v\s+[^\s]+/gi, "")
      .replace(/--q\s+[^\s]+/gi, "")
      .replace(/--s\s+[^\s]+/gi, "")
      .replace(/photorealistic 8k.*$/i, "")
      .trim();
  };

  const getMidjourneyFormat = (rawPrompt: string) => {
    return rawPrompt.startsWith("/imagine") ? rawPrompt : `/imagine prompt: ${rawPrompt}`;
  };

  const getPromptWithNegative = (rawPrompt: string, neg: string) => {
    return `[PROMPT]:\n${rawPrompt}\n\n[NEGATIVE PROMPT]:\n${neg || "None specified"}`;
  };

  // Get active text based on format
  const getActiveText = () => {
    switch (activeFormat) {
      case "midjourney":
        return getMidjourneyFormat(result.prompt);
      case "with_negative":
        return getPromptWithNegative(result.prompt, result.negative);
      case "clean":
        return getCleanPrompt(result.prompt);
      case "standard":
      default:
        return result.prompt;
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCopyBundle = () => {
    const bundle = `=== IBD PROMPT FORGE ELITE | V${version} ===
PRODUCTION: IBD — An Indian Bhakti Dhara Production
SUBJECT: ${subject}
DIMENSIONS: ${dim}

[DIRECTOR'S ALCHEMICAL LOGIC]
${result.logic}

[MASTER PROMPT]
${result.prompt}

[NEGATIVE PROMPT]
${result.negative}

[PRODUCTION METADATA]
${JSON.stringify(result.metadata, null, 2)}
`;
    handleCopy(bundle, "bundle");
  };

  const handleDownloadTxt = () => {
    const content = `IBD PROMPT FORGE ELITE — MASTER KEY ART ASSET
------------------------------------------------------
Production: IBD — An Indian Bhakti Dhara Production
Subject: ${subject}
Evolution Level: V${version}
Aspect Ratio: ${dim}
Generated At: ${new Date().toISOString()}

1. DIRECTOR'S ALCHEMICAL LOGIC:
${result.logic}

2. THE MASTER PROMPT:
${result.prompt}

3. SACRED NEGATIVE PROMPT:
${result.negative}

4. PRODUCTION METADATA (JSON):
${JSON.stringify(result.metadata, null, 2)}
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `IBD_MasterPrompt_V${version}_${subject.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#14100a] rounded-2xl border border-[#382d1c] shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#6abf6a] animate-pulse" />
          <span className="font-cinzel text-sm font-bold text-[#f4cf6a]">
            Manifestation Complete
          </span>
          <span className="text-[10px] font-mono-code text-[#a39274] bg-[#0c0906] px-2 py-0.5 rounded border border-[#262016]">
            V{version} • {dim}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onSaveToSanctuary}
            disabled={isSaved}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              isSaved
                ? "bg-[#251f14] text-[#6abf6a] border border-[#382d1c] cursor-default"
                : "bg-[#1f1910] hover:bg-[#2e2417] text-[#e5e0d5] border border-[#382d1c]"
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
                <span>Saved in Sanctuary</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Save to Sanctuary</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleCopy(result.prompt, "quick_prompt")}
            className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#f4cf6a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {copiedKey === "quick_prompt" ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span>Copied Prompt!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>Copy Master Prompt</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyBundle}
            className="px-3 py-1.5 rounded-lg bg-[#1f1910] hover:bg-[#2e2417] text-[#e5e0d5] border border-[#382d1c] text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Copy entire prompt package to clipboard"
          >
            {copiedKey === "bundle" ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
                <span>Package Copied!</span>
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Copy Full Package</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="p-1.5 rounded-lg bg-[#1f1910] hover:bg-[#2e2417] text-[#d4af37] border border-[#382d1c] transition-colors"
            title="Download TXT file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visualizer Preview */}
      <VisualizerPreview
        subject={subject}
        version={version}
        dim={dim}
        metadata={result.metadata}
        logic={result.logic}
        prompt={result.prompt}
      />

      {/* DEDICATED PROMPT COPY OPTIONS HUB */}
      <div className="bg-[#100c07] border border-[#382d1c] p-4 sm:p-5 rounded-2xl flex flex-col gap-3 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262016] pb-3">
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs font-cinzel font-bold text-[#f4cf6a] uppercase tracking-wider">
              Quick Copy Prompts Options
            </span>
          </div>
          <span className="text-[11px] font-mono-code text-[#8c7a5c]">
            Click any format to copy instantly to clipboard
          </span>
        </div>

        {/* Multi-Format Copy Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {/* Option 1: Master Prompt */}
          <button
            type="button"
            onClick={() => handleCopy(result.prompt, "btn_master")}
            className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              copiedKey === "btn_master"
                ? "bg-[#251f12] border-[#ffd700] text-[#ffd700] ring-1 ring-[#ffd700]"
                : "bg-[#090704] hover:bg-[#16110a] border-[#2c2214] text-[#e5e0d5] hover:border-[#d4af37]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-sans flex items-center gap-1.5 text-[#f4cf6a]">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                Master Prompt
              </span>
              {copiedKey === "btn_master" ? (
                <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#a39274]" />
              )}
            </div>
            <span className="text-[10px] text-[#8c7a5c] font-mono-code">
              Standard full studio output
            </span>
          </button>

          {/* Option 2: Midjourney /imagine */}
          <button
            type="button"
            onClick={() =>
              handleCopy(getMidjourneyFormat(result.prompt), "btn_midjourney")
            }
            className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              copiedKey === "btn_midjourney"
                ? "bg-[#251f12] border-[#ffd700] text-[#ffd700] ring-1 ring-[#ffd700]"
                : "bg-[#090704] hover:bg-[#16110a] border-[#2c2214] text-[#e5e0d5] hover:border-[#d4af37]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-sans flex items-center gap-1.5 text-[#f4cf6a]">
                <Zap className="w-3.5 h-3.5 text-[#5865F2]" />
                Midjourney Format
              </span>
              {copiedKey === "btn_midjourney" ? (
                <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#a39274]" />
              )}
            </div>
            <span className="text-[10px] text-[#8c7a5c] font-mono-code">
              Prepends /imagine prompt:
            </span>
          </button>

          {/* Option 3: Prompt + Negative Combo */}
          <button
            type="button"
            onClick={() =>
              handleCopy(
                getPromptWithNegative(result.prompt, result.negative),
                "btn_combo"
              )
            }
            className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              copiedKey === "btn_combo"
                ? "bg-[#251f12] border-[#ffd700] text-[#ffd700] ring-1 ring-[#ffd700]"
                : "bg-[#090704] hover:bg-[#16110a] border-[#2c2214] text-[#e5e0d5] hover:border-[#d4af37]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-sans flex items-center gap-1.5 text-[#f4cf6a]">
                <Shield className="w-3.5 h-3.5 text-[#ff9933]" />
                Prompt + Negative
              </span>
              {copiedKey === "btn_combo" ? (
                <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#a39274]" />
              )}
            </div>
            <span className="text-[10px] text-[#8c7a5c] font-mono-code">
              Both positive &amp; negative
            </span>
          </button>

          {/* Option 4: Clean Text Only */}
          <button
            type="button"
            onClick={() =>
              handleCopy(getCleanPrompt(result.prompt), "btn_clean")
            }
            className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
              copiedKey === "btn_clean"
                ? "bg-[#251f12] border-[#ffd700] text-[#ffd700] ring-1 ring-[#ffd700]"
                : "bg-[#090704] hover:bg-[#16110a] border-[#2c2214] text-[#e5e0d5] hover:border-[#d4af37]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-sans flex items-center gap-1.5 text-[#f4cf6a]">
                <Filter className="w-3.5 h-3.5 text-[#6abf6a]" />
                Clean Text (No Flags)
              </span>
              {copiedKey === "btn_clean" ? (
                <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#a39274]" />
              )}
            </div>
            <span className="text-[10px] text-[#8c7a5c] font-mono-code">
              Strips --ar / parameters
            </span>
          </button>
        </div>

        {/* Best Output Generator Links Strip */}
        <div className="pt-3 border-t border-[#262016] flex flex-col gap-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[10px] font-mono-code font-bold uppercase text-emerald-300 flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" />
              <span>Copy &amp; Launch in Best Output Engine:</span>
            </span>
            {(result.metadata?.samplerProfile?.sampler || result.metadata?.cinematography?.sampler || result.metadata?.cinemaStyle) && (
              <span className="text-[10px] font-mono-code text-purple-300 bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <Sliders className="w-3 h-3" />
                {result.metadata?.cinemaStyle ? `${result.metadata.cinemaStyle} • ` : ""}
                {result.metadata?.samplerProfile?.sampler || result.metadata?.cinematography?.sampler}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {BEST_OUTPUT_GENERATOR_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopy(getActiveText(), `launch_${link.id}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16110a] hover:bg-[#241b10] border border-[#382d1c] hover:border-[#d4af37] text-[11px] font-semibold text-[#f4cf6a] transition"
                title={`${link.subtitle} — ${link.bestFor}`}
              >
                <span>{link.name}</span>
                <ExternalLink className="w-3 h-3 text-[#8c7a5c]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Card 1: Director's Alchemical Logic */}
      <div className="bg-[#0c0906] border border-[#262016] p-6 rounded-2xl flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#f4cf6a]" />
            Director&apos;s Alchemical Logic
          </span>
          <button
            type="button"
            onClick={() => handleCopy(result.logic, "logic")}
            className="text-[10px] font-mono-code text-[#a39274] hover:text-[#f4cf6a] px-2.5 py-1 rounded bg-[#18120a] border border-[#262016] flex items-center gap-1 transition-colors"
          >
            {copiedKey === "logic" ? (
              <>
                <Check className="w-3 h-3 text-[#6abf6a]" />
                <span>Copied Logic</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Logic</span>
              </>
            )}
          </button>
        </div>
        <div className="text-xs md:text-sm leading-relaxed text-[#c5baa8] whitespace-pre-wrap font-sans">
          {result.logic}
        </div>
      </div>

      {/* Card 2: The Master Prompt (Interactive Formats & One-Click Copy) */}
      <div className="bg-[#120d07] border-2 border-[#d4af37] p-6 rounded-2xl flex flex-col gap-4 shadow-xl shadow-[#d4af37]/10 relative overflow-hidden">
        {/* Header & Format Switchers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] font-bold text-[#f4cf6a] tracking-wider uppercase font-mono-code flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            The Master Prompt
          </span>

          {/* View / Copy Format Pills */}
          <div className="flex items-center gap-1 bg-[#090704] p-1 rounded-xl border border-[#2c2214] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveFormat("standard")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold transition-all ${
                activeFormat === "standard"
                  ? "bg-[#d4af37] text-black shadow-sm"
                  : "text-[#a39274] hover:text-white"
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setActiveFormat("midjourney")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold transition-all ${
                activeFormat === "midjourney"
                  ? "bg-[#d4af37] text-black shadow-sm"
                  : "text-[#a39274] hover:text-white"
              }`}
            >
              /imagine
            </button>
            <button
              type="button"
              onClick={() => setActiveFormat("with_negative")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold transition-all ${
                activeFormat === "with_negative"
                  ? "bg-[#d4af37] text-black shadow-sm"
                  : "text-[#a39274] hover:text-white"
              }`}
            >
              + Negative
            </button>
            <button
              type="button"
              onClick={() => setActiveFormat("clean")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold transition-all ${
                activeFormat === "clean"
                  ? "bg-[#d4af37] text-black shadow-sm"
                  : "text-[#a39274] hover:text-white"
              }`}
            >
              Clean
            </button>
          </div>
        </div>

        {/* Prompt Output Container - Click to copy */}
        <div
          onClick={() => handleCopy(getActiveText(), "main_box")}
          title="Click to copy prompt to clipboard"
          className="group relative cursor-pointer text-sm md:text-base leading-relaxed text-[#f4cf6a] font-medium font-sans bg-[#080503] hover:bg-[#0c0805] p-5 rounded-xl border border-[#382d1c] hover:border-[#d4af37] transition-all select-all selection:bg-[#d4af37]/40 shadow-inner"
        >
          <div className="whitespace-pre-wrap">{getActiveText()}</div>

          {/* Hover / Click Copy Badge */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="bg-[#1b150c] text-[#ffd700] border border-[#d4af37] px-2.5 py-1 rounded-lg text-[10px] font-mono-code font-bold flex items-center gap-1 shadow-lg">
              <Copy className="w-3 h-3" />
              Click to Copy
            </span>
          </div>
        </div>

        {/* Bottom Primary Copy Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-[#a39274] flex items-center gap-1.5 font-mono-code">
            <span className="text-[#ffd700]">★</span>
            <span>
              Engine: <strong className="text-white">{result.metadata?.targetEngine || "Midjourney v6.1"}</strong> ({dim})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCopy(getActiveText(), "main_btn")}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#f4cf6a] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              {copiedKey === "main_btn" || copiedKey === "main_box" ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>
                    Copy {activeFormat === "midjourney" ? "/imagine Prompt" : activeFormat === "with_negative" ? "Prompt & Negative" : activeFormat === "clean" ? "Clean Prompt" : "Master Prompt"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Anti-Hallucination Negative Prompt */}
      {result.negative && (
        <div className="bg-[#0c0906] border border-[#262016] p-5 rounded-2xl flex flex-col gap-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#ff8c00] tracking-wider uppercase font-mono-code flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#ff8c00]" />
              Sacred Negative Prompt (Anti-Distortion)
            </span>
            <button
              type="button"
              onClick={() => handleCopy(result.negative, "negative")}
              className="text-[10px] font-mono-code text-[#a39274] hover:text-[#f4cf6a] px-2.5 py-1 rounded bg-[#18120a] border border-[#262016] flex items-center gap-1 transition-colors"
            >
              {copiedKey === "negative" ? (
                <>
                  <Check className="w-3 h-3 text-[#6abf6a]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Negative Prompt</span>
                </>
              )}
            </button>
          </div>
          <div
            onClick={() => handleCopy(result.negative, "negative")}
            title="Click to copy negative prompt"
            className="text-xs text-[#a39274] font-mono-code bg-[#060403] hover:bg-[#0a0705] p-3 rounded-lg border border-[#1a140d] hover:border-[#ff9933]/50 cursor-pointer transition-all"
          >
            {result.negative}
          </div>
        </div>
      )}

      {/* Card 4: IBD Production Metadata & Palette */}
      <div className="bg-[#0c0906] border border-[#262016] rounded-2xl overflow-hidden shadow-md">
        <button
          type="button"
          onClick={() => setShowMetadata((p) => !p)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#14100b] transition-colors"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#6abf6a]" />
            <span className="text-[11px] font-bold text-[#6abf6a] tracking-wider uppercase font-mono-code">
              IBD Production Metadata &amp; Sacred Palette (JSON)
            </span>
          </div>
          {showMetadata ? (
            <ChevronUp className="w-4 h-4 text-[#8c7a5c]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8c7a5c]" />
          )}
        </button>

        {showMetadata && (
          <div className="px-6 pb-6 pt-2 border-t border-[#1f1910] flex flex-col gap-4">
            {/* Color Palette preview if available */}
            {result.metadata?.colorPalette && Array.isArray(result.metadata.colorPalette) && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono-code text-[#8c7a5c] uppercase font-bold">
                  Extracted Sacred Color Harmonization:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {result.metadata.colorPalette.map((col: any, idx: number) => {
                    const hex = typeof col === "string" ? col.match(/#[0-9a-fA-F]{6}/)?.[0] || "#d4af37" : col.hex;
                    const name = typeof col === "string" ? col : col.name;
                    return (
                      <div
                        key={idx}
                        className="bg-[#080604] p-2 rounded-lg border border-[#262016] flex items-center gap-2"
                      >
                        <div
                          className="w-5 h-5 rounded-md border border-white/20 shrink-0"
                          style={{ backgroundColor: hex }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] text-[#e5e0d5] font-semibold truncate">
                            {name}
                          </div>
                          <div className="text-[9px] text-[#8c7a5c] font-mono-code">
                            {hex}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* JSON Code block */}
            <div className="relative">
              <div className="absolute right-3 top-3">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(JSON.stringify(result.metadata, null, 2), "json")
                  }
                  className="text-[10px] font-mono-code text-[#6abf6a] bg-[#0c140c] hover:bg-[#142414] px-2.5 py-1 rounded border border-[#1f3a1f] flex items-center gap-1 transition-colors"
                >
                  {copiedKey === "json" ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied JSON</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono-code text-[#6abf6a] bg-[#050805] p-4 rounded-xl border border-[#172617] overflow-x-auto leading-relaxed">
                {JSON.stringify(result.metadata, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

