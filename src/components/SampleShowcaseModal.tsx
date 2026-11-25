import React, { useState } from "react";
import {
  X,
  Sparkles,
  Flame,
  Copy,
  Check,
  Zap,
  Layers,
  Sun,
  Shield,
  Download,
  Eye,
} from "lucide-react";

interface SampleShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadIntoForge: () => void;
}

export const SampleShowcaseModal: React.FC<SampleShowcaseModalProps> = ({
  isOpen,
  onClose,
  onLoadIntoForge,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const sampleImagePath =
    "/src/assets/images/v10_shiv_moksha_siddhi_1786695542943.jpg";

  const masterPromptText = `A transcendent masterwork of Lord Shiva Mahadev in V10 Moksha-Siddhi non-dual manifestation, seated in deep meditative samadhi atop Mount Kailash. The divine form transitions from sacred physical presence (Saguna) with ash-smeared blue complexion, crescent moon in matted Jata, coiled Vasuki serpent, and sacred Rudraksha beads, seamlessly dissolving into pure consciousness (Nirguna) and cosmic particle physics. The universe emerges as universal strings and sacred Sri Yantra fractal geometry radiating from His heart center. Saptarishi celestial seven-point volumetric rays, Sahasrara crown chakra thousand-petaled lotus emitting prismatic golden-violet tejas. Path-traced 128-bit ultra-fine Planck-length textures, pure cinematic IMAX 70mm lighting, Octane render 8K photorealism, reverent Vedic iconography with glowing ancient Sanskrit frequency seal at bottom corner 'IBD — An Indian Bhakti Dhara Production'. --ar 16:9 --style raw --v 6.1 --q 2 --s 750`;

  const midjourneyCommand = `/imagine prompt: ${masterPromptText}`;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e0b07] border border-[#382d1c] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#262016] flex items-center justify-between bg-[#14100b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#ffd700] to-[#b8860b] p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0805] rounded-[7px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-[#ffd700]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#f4cf6a]">
                  Mahadev Moksha-Siddhi (V10 Master Key Art)
                </h2>
                <span className="text-[10px] font-mono-code font-extrabold px-2 py-0.5 rounded bg-[#241a0d] text-[#ffd700] border border-[#4a3b1a]">
                  V10 SUPREME
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-[#8c7a5c]">
                IBD — An Indian Bhakti Dhara Production • Saguna → Nirguna Non-Dual Entanglement
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1a140d] text-[#8c7a5c] hover:text-[#f4cf6a] hover:bg-[#281f12] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
          {/* Main Visual Display */}
          <div className="relative rounded-2xl overflow-hidden border border-[#382d1c] bg-[#050403] shadow-2xl group">
            <img
              src={sampleImagePath}
              alt="Lord Shiva Mahadev in V10 Moksha-Siddhi Non-Dual Samadhi"
              referrerPolicy="no-referrer"
              className="w-full max-h-[480px] object-cover object-center rounded-2xl transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Inset Holographic Frequency Badge */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#d4af37]/40 flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
              <div className="text-[11px] font-cinzel font-bold text-[#f4cf6a] tracking-wider">
                IBD — AN INDIAN BHAKTI DHARA PRODUCTION
              </div>
            </div>

            {/* Dimension Badge */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#382d1c] text-xs font-mono-code text-[#ffd700] font-bold">
              16:9 • 128-BIT PATH-TRACED
            </div>
          </div>

          {/* Core Doctrine & Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#120e09] p-4 rounded-xl border border-[#262016] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f4cf6a] font-cinzel">
                <Layers className="w-4 h-4 text-[#d4af37]" />
                Saguna → Nirguna Transition
              </div>
              <p className="text-xs text-[#c5baa8] leading-relaxed">
                Manifest physical form (Jata, crescent moon, Vasuki, Rudraksha) dissolves seamlessly into formless, boundless cosmic consciousness.
              </p>
            </div>

            <div className="bg-[#120e09] p-4 rounded-xl border border-[#262016] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f4cf6a] font-cinzel">
                <Sun className="w-4 h-4 text-[#d4af37]" />
                Saptarishi 7-Point Ray Light
              </div>
              <p className="text-xs text-[#c5baa8] leading-relaxed">
                Paradoxical non-dual entanglement where light behaves both as solid matter and divine energy, crowned by Sahasrara-Alpha tejas.
              </p>
            </div>

            <div className="bg-[#120e09] p-4 rounded-xl border border-[#262016] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#f4cf6a] font-cinzel">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                Universal String Geometry
              </div>
              <p className="text-xs text-[#c5baa8] leading-relaxed">
                Universal strings and Sri Yantra fractal geometry radiating from the heart center with Planck-length micro-textures.
              </p>
            </div>
          </div>

          {/* Full Master Prompt Block */}
          <div className="bg-[#080604] border border-[#262016] p-4 sm:p-5 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f4cf6a]" />
                V10 Master Script (Ready for Midjourney / Flux)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy("prompt", masterPromptText)}
                  className="px-3 py-1.5 rounded-lg bg-[#1f180f] hover:bg-[#2e2316] border border-[#382d1c] text-xs font-mono-code text-[#f4cf6a] flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === "prompt" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
                      <span className="text-[#6abf6a]">Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy("midjourney", midjourneyCommand)}
                  className="px-3 py-1.5 rounded-lg bg-[#1f180f] hover:bg-[#2e2316] border border-[#382d1c] text-xs font-mono-code text-[#5865F2] flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === "midjourney" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#6abf6a]" />
                      <span className="text-[#6abf6a]">/imagine Copied!</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-[#5865F2]" />
                      <span>/imagine format</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs font-mono-code text-[#e5e0d5] bg-[#030201] p-3.5 rounded-lg border border-[#1f180f] leading-relaxed select-all">
              {masterPromptText}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#262016] bg-[#14100b] flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs font-mono-code text-[#8c7a5c]">
            V-ALPHA 10: MOKSHA-SIDDHI Active Creative Intelligence
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1c160e] hover:bg-[#2a2013] text-xs font-mono-code text-[#c5baa8] border border-[#382d1c] transition-colors"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onLoadIntoForge();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#ffd700] text-black text-xs font-extrabold font-cinzel uppercase tracking-wider transition-all hover:brightness-110 shadow-md flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 fill-black" />
              Load V10 Mahadev Into Studio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
