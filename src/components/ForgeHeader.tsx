import React, { useState, useEffect } from "react";
import { Sparkles, Bookmark, Settings, Compass, Flame, Image as ImageIcon, Globe, MessageSquare, TrendingUp, Leaf, Landmark, Crown, Zap, Film, ShieldCheck, ShieldAlert, Lock, Github, Sliders } from "lucide-react";
import { soloRunLock, RunningModuleState } from "../utils/soloRunLock";
import { PWAInstallButton } from "./PWAInstallButton";

export type StudioTabType = "forge" | "l1-l30-master" | "cinema-sampler" | "krishna-suvichar" | "bhagavad-gita" | "sunderkand-ramcharitmanas" | "shiv-mantra" | "daily-shorts" | "temple-sanctuary" | "v25-command" | "vp21-sanctum" | "v26-carousel" | "sovereign-v15-v21" | "teerth-10x" | "universal" | "vishwa-varta" | "samvaad" | "dharma-sutra";

interface ForgeHeaderProps {
  activeTab: StudioTabType;
  onSelectTab: (tab: StudioTabType) => void;
  onOpenPresets: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenShowcase?: () => void;
  onOpenGitHubPublish?: () => void;
  onToggleParatparMode?: () => void;
  isParatparMode?: boolean;
  savedCount: number;
  isSoloRunLock?: boolean;
  onToggleSoloRunLock?: () => void;
}

export const ForgeHeader: React.FC<ForgeHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenPresets,
  onOpenHistory,
  onOpenSettings,
  onOpenShowcase,
  onOpenGitHubPublish,
  onToggleParatparMode,
  isParatparMode,
  savedCount,
  isSoloRunLock = true,
  onToggleSoloRunLock,
}) => {
  const [runningModule, setRunningModule] = useState<RunningModuleState | null>(null);

  useEffect(() => {
    const unsubscribe = soloRunLock.subscribe((state) => {
      setRunningModule(state);
    });
    return unsubscribe;
  }, []);
  return (
    <header className="border-b border-[#262016] pb-5 mb-6 flex flex-col gap-4">
      {/* Top Branding Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#8c6d1f] p-[1px] shadow-lg shadow-[#d4af37]/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0d0a07] rounded-[10px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#ffd700]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-tight text-[#f4cf6a]">
                IBD Universal Studio Suite
              </h1>
              <span className="bg-gradient-to-r from-[#2d005e] via-[#ffd700] to-[#ffaa00] text-black px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider font-mono shadow-sm">
                V1 — V21
              </span>
            </div>
            <p className="text-[10px] font-semibold text-[#d4af37]/90 tracking-[0.2em] uppercase">
              AN INDIAN BHAKTI DHARA PRODUCTION
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Solo-Run Token Protection Toggle Button */}
          {onToggleSoloRunLock && (
            <button
              type="button"
              onClick={onToggleSoloRunLock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer border ${
                isSoloRunLock
                  ? "bg-emerald-950/90 border-emerald-500/60 text-emerald-300 hover:bg-emerald-900/90"
                  : "bg-amber-950/90 border-amber-500/60 text-amber-300 hover:bg-amber-900/90"
              }`}
              title="Solo-Run Execution Lock ensures maximum token preservation by strictly preventing background multi-generation"
            >
              {isSoloRunLock ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{isSoloRunLock ? "Solo-Run Lock: ON" : "Multi-Run: ON"}</span>
            </button>
          )}

          {activeTab === "forge" && onToggleParatparMode && (
            <button
              type="button"
              onClick={onToggleParatparMode}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer ${
                isParatparMode
                  ? "bg-[#2d005e] border border-[#ffcc33] text-[#ffcc33]"
                  : "bg-gradient-to-r from-[#1a0533] to-[#2d005e] hover:from-[#2d005e] hover:to-[#45098a] border border-[#ffcc33]/40 text-[#ffcc33]"
              }`}
              title="Toggle IBD PARATPAR Singularity Mode"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffcc33] animate-pulse" />
              <span>{isParatparMode ? "Standard Studio" : "IBD PARATPAR"}</span>
            </button>
          )}

          {onOpenShowcase && (
            <button
              type="button"
              onClick={onOpenShowcase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241c10] hover:bg-[#342816] border border-[#523f20] text-xs font-bold text-[#ffd700] transition-colors shadow-sm cursor-pointer"
              title="Inspect generated V10 Mahadev Moksha-Siddhi Key Art"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Shiv Art</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18140f] hover:bg-[#251e16] border border-[#382d1c] text-xs font-medium text-[#e5e0d5] transition-colors cursor-pointer"
            title="Browse canonical presets"
          >
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Presets</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18140f] hover:bg-[#251e16] border border-[#382d1c] text-xs font-medium text-[#e5e0d5] transition-colors cursor-pointer"
            title="View forged prompts history"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Sanctuary</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-[#d4af37] text-black rounded-full text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-[#18140f] hover:bg-[#251e16] border border-[#382d1c] text-[#a39274] hover:text-[#f4cf6a] transition-colors cursor-pointer"
            title="API Key & Engine Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* In-App PWA Install Trigger (Android / iOS / PC) */}
          <PWAInstallButton variant="header" />

          {/* GitHub Publish Modal Trigger */}
          {onOpenGitHubPublish && (
            <button
              id="header-github-publish-btn"
              type="button"
              onClick={onOpenGitHubPublish}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 text-xs font-semibold text-stone-200 hover:text-white transition shadow-sm cursor-pointer"
              title="Publish repository to GitHub or view git instructions"
            >
              <Github className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">GitHub</span>
            </button>
          )}
        </div>
      </div>

      {/* First-Glance Standalone Button Control Center */}
      <div className="bg-[#100d08] border border-[#2b2116] p-3 md:p-4 rounded-2xl shadow-xl space-y-2.5">
        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
          <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-mono">
            ⚡ SELECT ACTIVE WORKABLE MODULE (1-CLICK ISOLATION):
          </span>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            {runningModule ? (
              <span className="bg-amber-500/20 border border-amber-400/60 text-amber-300 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>SOLO-RUN ACTIVE: {runningModule.moduleName}</span>
              </span>
            ) : (
              <span className="text-[#8c7853] font-medium hidden sm:inline">
                Active: <strong className="text-[#ffd700] uppercase font-mono">{activeTab}</strong>
              </span>
            )}
          </div>
        </div>

        {/* 1-Click Workable Top-Level Grid Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <button
            type="button"
            onClick={() => onSelectTab("forge")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "forge"
                ? "bg-[#d4af37] text-black border-[#ffd700] shadow-lg shadow-[#d4af37]/30 scale-[1.02] ring-2 ring-[#ffd700]/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#2b2116] text-[#c7b9a5]"
            }`}
          >
            <Flame className="w-4 h-4 shrink-0" />
            <span className="truncate">V10/V11 Forge</span>
          </button>

          <button
            id="tab-l1-l30-master"
            type="button"
            onClick={() => onSelectTab("l1-l30-master")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border whitespace-nowrap ${
              activeTab === "l1-l30-master"
                ? "bg-[#ffd700] text-black border-yellow-300 shadow-lg shadow-[#ffd700]/30 scale-[1.02] ring-2 ring-yellow-400/50"
                : "bg-[#191208] hover:bg-[#261c0d] border-[#4d3917] text-[#f4cf6a]"
            }`}
          >
            <Crown className="w-4 h-4 shrink-0" />
            <span className="truncate">L1–L30 Master</span>
          </button>

          <button
            id="tab-cinema-sampler"
            type="button"
            onClick={() => onSelectTab("cinema-sampler")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "cinema-sampler"
                ? "bg-gradient-to-r from-purple-500 via-amber-400 to-yellow-400 text-stone-950 border-amber-300 shadow-lg shadow-purple-500/30 scale-[1.02] ring-2 ring-amber-400/50"
                : "bg-[#140e1f] hover:bg-[#1f1530] border-[#43286b] text-[#e2d4ff]"
            }`}
          >
            <Sliders className="w-4 h-4 shrink-0" />
            <span className="truncate">Cinema &amp; Samplers</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("krishna-suvichar")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "krishna-suvichar"
                ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-stone-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02] ring-2 ring-amber-400/50"
                : "bg-[#180e2e] hover:bg-[#261545] border-[#442378] text-[#e0d0fa]"
            }`}
          >
            <span className="text-sm">🪶</span>
            <span className="truncate">Krishna Suvichar</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("bhagavad-gita")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "bhagavad-gita"
                ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 border-amber-300 shadow-lg shadow-orange-500/30 scale-[1.02] ring-2 ring-amber-400/50"
                : "bg-[#1c0d05] hover:bg-[#2c1508] border-[#4d240d] text-[#fcd7ba]"
            }`}
          >
            <span className="text-sm">🕉️</span>
            <span className="truncate">Bhagavad Gita</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("sunderkand-ramcharitmanas")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "sunderkand-ramcharitmanas"
                ? "bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 text-stone-950 border-orange-300 shadow-lg shadow-orange-500/30 scale-[1.02] ring-2 ring-orange-400/50 font-black"
                : "bg-[#210c03] hover:bg-[#331405] border-[#592207] text-[#ffd2a6]"
            }`}
          >
            <span className="text-sm">🚩</span>
            <span className="truncate">Sundarkand / मानस</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("shiv-mantra")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "shiv-mantra"
                ? "bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-stone-950 border-cyan-300 shadow-lg shadow-cyan-500/30 scale-[1.02] ring-2 ring-cyan-400/50 font-black"
                : "bg-[#071926] hover:bg-[#0c2436] border-[#0c3e5e] text-[#a5e3ff]"
            }`}
          >
            <span className="text-sm">🔱</span>
            <span className="truncate">Shiv Mantras</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("daily-shorts")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "daily-shorts"
                ? "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-stone-950 border-yellow-400 shadow-lg shadow-orange-500/30 scale-[1.02] ring-2 ring-orange-400/50"
                : "bg-[#1f1207] hover:bg-[#2e1a0b] border-[#593010] text-[#ffaa5e]"
            }`}
          >
            <Film className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">🎬 Daily Shorts</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("temple-sanctuary")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "temple-sanctuary"
                ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02] ring-2 ring-amber-400/50"
                : "bg-[#181109] hover:bg-[#241a0e] border-[#4d3211] text-[#f4cf6a]"
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">🛕 10-Step Sanctuary</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("v25-command")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "v25-command"
                ? "bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#0044ff] text-white border-blue-300 shadow-lg shadow-[#0072ff]/30 scale-[1.02] ring-2 ring-blue-400/50"
                : "bg-[#0b1016] hover:bg-[#121c26] border-[#163352] text-[#80c8ff]"
            }`}
          >
            <Zap className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">⚡ V25 Command</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("vp21-sanctum")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "vp21-sanctum"
                ? "bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#c70039] text-white border-red-300 shadow-lg shadow-[#ff416c]/30 scale-[1.02] ring-2 ring-red-400/50"
                : "bg-[#160a0a] hover:bg-[#261010] border-[#521c1c] text-[#ff8080]"
            }`}
          >
            <Flame className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">🛕 VP21 Sanctum</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("v26-carousel")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "v26-carousel"
                ? "bg-gradient-to-r from-[#e1306c] via-[#fd1d1d] to-[#f56040] text-white border-rose-300 shadow-lg shadow-[#e1306c]/30 scale-[1.02] ring-2 ring-pink-400/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#521c2c] text-[#ff80a0]"
            }`}
          >
            <ImageIcon className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">📱 V26 Carousel</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("sovereign-v15-v21")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "sovereign-v15-v21"
                ? "bg-gradient-to-r from-[#ffd700] via-[#ffcc33] to-[#ffaa00] text-black border-yellow-300 shadow-lg shadow-[#ffd700]/25 scale-[1.02] ring-2 ring-yellow-400/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#4d3617] text-[#ffd700]"
            }`}
          >
            <Crown className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">👑 V15–V21 Deck</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("teerth-10x")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "teerth-10x"
                ? "bg-gradient-to-r from-[#ff9933] via-[#ffd700] to-[#e07a5f] text-black border-amber-300 shadow-lg shadow-[#ff9933]/25 scale-[1.02] ring-2 ring-orange-400/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#3d2a17] text-[#ffd700]"
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0 text-inherit" />
            <span className="truncate">☬/🛕 Teerth 10x</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("universal")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "universal"
                ? "bg-[#d4af37] text-black border-[#ffd700] shadow-lg shadow-[#d4af37]/20 scale-[1.02] ring-2 ring-[#ffd700]/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#2b2116] text-[#c7b9a5]"
            }`}
          >
            <Leaf className="w-4 h-4 shrink-0" />
            <span className="truncate">V11 Universal</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("vishwa-varta")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "vishwa-varta"
                ? "bg-[#ffcc33] text-black border-yellow-400 shadow-lg shadow-[#ffcc33]/20 scale-[1.02] ring-2 ring-yellow-400/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#2b2116] text-[#c7b9a5]"
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span className="truncate">V12 Vishwa-Varta</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("samvaad")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "samvaad"
                ? "bg-gradient-to-r from-[#ff9933] to-[#d4af37] text-black border-amber-300 shadow-lg shadow-[#ff9933]/20 scale-[1.02] ring-2 ring-amber-400/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#2b2116] text-[#c7b9a5]"
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="truncate">V13 Samvaad</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab("dharma-sutra")}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              activeTab === "dharma-sutra"
                ? "bg-white text-black border-gray-200 shadow-lg shadow-white/20 scale-[1.02] ring-2 ring-white/50"
                : "bg-[#14100b] hover:bg-[#201912] border-[#2b2116] text-[#c7b9a5]"
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="truncate">V14 Dharma-Sutra</span>
          </button>
        </div>
      </div>
    </header>
  );
};

