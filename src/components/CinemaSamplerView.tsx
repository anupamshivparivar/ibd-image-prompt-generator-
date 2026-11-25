import React, { useMemo, useState } from "react";
import {
  SAMPLER_SPECS,
  CINEMA_PLATFORM_PROFILES,
  BEST_OUTPUT_GENERATOR_LINKS,
  POSTER_OVERLAY_DOCTRINE,
  CinemaCategory,
  CinemaPlatformProfile,
  SamplerSpec,
} from "../data/cinemaSamplerData";
import {
  DEITY_AUTO_PROFILES,
  DEITY_COUPLE_MAPPING_TABLE,
  AUTO_SELECTION_DECISION_LOGIC,
  DeityAutoProfile,
  DeityCoupleMappingRow,
  resolveDeityAutoProfile,
} from "../data/deityAutoProfiles";
import { OttLevelL1L30Tool } from "./OttLevelL1L30Tool";
import { AspectRatio, ForgeRequest, TargetEngine } from "../types";
import {
  Film,
  Sliders,
  Link2,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Camera,
  Zap,
  Send,
  Search,
  Layers,
  Award,
  Gauge,
} from "lucide-react";

interface CinemaSamplerViewProps {
  onSendToForge: (req: Partial<ForgeRequest>) => void;
  onNotify: (msg: string) => void;
}

const SCENE_CHIPS = [
  {
    label: "Nolan / Hoyte • Cosmic Shiva",
    subject: "Mahadev Param-Shiva on Mount Kailash",
    story:
      "Monumental Himalayan peak silhouetted against swirling cosmic starlight and blinding golden solar eclipse corona, IMAX practical scale.",
    profileId: "nolan-hoyte",
  },
  {
    label: "BBC Earth • Sacred Ganga",
    subject: "Himalayan Bhagirathi Ganga Rapids at Dawn",
    story:
      "Crystal glacial turquoise currents rushing over carved river boulders in misty morning sunlight with Himalayan blue poppies.",
    profileId: "bbc-earth",
  },
  {
    label: "Apple TV+ • Ayodhya Sanctum",
    subject: "Maryada Purushottam Shri Ram in Golden Sanctum",
    story:
      "Pristine architectural granite mandapa bathed in clean sculpted golden shafts of dawn light, serene dignity and luminous micro-detail.",
    profileId: "apple-tv-plus",
  },
  {
    label: "Netflix • Veer Hanuman Key Art",
    subject: "Veer Hanuman Holding Luminous Sanjeevani",
    story:
      "Dramatic storm clouds parted by warm blazing saffron rim-light, high-contrast theatrical OTT poster composition.",
    profileId: "netflix-prestige",
  },
  {
    label: "Disney • Bal Krishna Wonder",
    subject: "Bal Krishna Playing Bansuri in Enchanted Vrindavan",
    story:
      "Sparkling golden pollen and glowing lotus petals drifting beneath an ancient blooming Kadamba grove with luminous godrays.",
    profileId: "disney-enchantment",
  },
  {
    label: "Nat Geo • Kashi Sandhya Aarti",
    subject: "Dashashwamedh Ghat Ganga Sandhya Aarti",
    story:
      "Authentic twilight reportage of rising camphor flames, floating earthen diyas reflecting on calm river ripples, timeless devotion.",
    profileId: "nat-geo",
  },
  {
    label: "Ideogram • 9:16 Bhakti Poster",
    subject: "Shrimad Bhagavad Gita Sacred Emblem",
    story:
      "Symmetrical editorial key-art layout with clean top and bottom negative space reserved for crisp Devanagari title typography.",
    profileId: "ideogram-poster",
  },
];

export const CinemaSamplerView: React.FC<CinemaSamplerViewProps> = ({
  onSendToForge,
  onNotify,
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>("nolan-hoyte");
  const [selectedSamplerId, setSelectedSamplerId] = useState<string>("dpmpp-3m-sde-karras");
  const [autoLinkSampler, setAutoLinkSampler] = useState<boolean>(true);
  const [autoDeityMode, setAutoDeityMode] = useState<boolean>(true);
  const [includeOverlayDoctrine, setIncludeOverlayDoctrine] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | CinemaCategory>("ALL");
  const [samplerFilter, setSamplerFilter] = useState<string>("");
  const [samplerTier, setSamplerTier] = useState<"ALL" | SamplerSpec["tier"]>("ALL");

  const [subject, setSubject] = useState<string>("Mahadev Param-Shiva on Mount Kailash");
  const [story, setStory] = useState<string>(
    "Monumental Himalayan summit illuminated by practical golden firelight and cosmic starfield, serene Drishti gaze, timeless sacred gravitas."
  );
  const [dimOverride, setDimOverride] = useState<AspectRatio | null>(null);
  const [engineOverride, setEngineOverride] = useState<TargetEngine | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeProfile: CinemaPlatformProfile = useMemo(
    () =>
      CINEMA_PLATFORM_PROFILES.find((p) => p.id === selectedProfileId) ||
      CINEMA_PLATFORM_PROFILES[0],
    [selectedProfileId]
  );

  const activeSampler: SamplerSpec = useMemo(
    () =>
      SAMPLER_SPECS.find((s) => s.id === selectedSamplerId) ||
      SAMPLER_SPECS[0],
    [selectedSamplerId]
  );

  const effectiveDim: AspectRatio = dimOverride || activeProfile.linkedBestOutput.aspectRatio;
  const effectiveEngine: TargetEngine = engineOverride || activeProfile.linkedBestOutput.targetEngine;

  const handleSelectProfile = (profile: CinemaPlatformProfile) => {
    setSelectedProfileId(profile.id);
    setDimOverride(null);
    setEngineOverride(null);
    if (autoLinkSampler) {
      const matched = SAMPLER_SPECS.find(
        (s) => s.sampler === profile.linkedBestOutput.sampler
      );
      if (matched) {
        setSelectedSamplerId(matched.id);
      }
    }
    onNotify(
      `Linked ${profile.shortName} ➔ ${profile.linkedBestOutput.sampler} (${profile.linkedBestOutput.targetEngine})`
    );
  };

  const handleSelectSampler = (spec: SamplerSpec) => {
    setSelectedSamplerId(spec.id);
    onNotify(`Sampler selected: ${spec.sampler} (${spec.useFor})`);
  };

  const handleApplySceneChip = (chip: (typeof SCENE_CHIPS)[number]) => {
    setSubject(chip.subject);
    setStory(chip.story);
    const prof = CINEMA_PLATFORM_PROFILES.find((p) => p.id === chip.profileId);
    if (prof) {
      handleSelectProfile(prof);
    }
  };

  const applyDeityAutoMatch = (deityOrProfile: string | DeityAutoProfile, replaceStory = true) => {
    const profile =
      typeof deityOrProfile === "string"
        ? resolveDeityAutoProfile(deityOrProfile)
        : deityOrProfile;

    setSubject(profile.deityName);
    if (replaceStory) {
      setStory(profile.autoStory);
    }
    setSelectedProfileId(profile.cinemaStyle);
    const matchedSam = SAMPLER_SPECS.find((s) => s.sampler === profile.sampler);
    if (matchedSam) {
      setSelectedSamplerId(matchedSam.id);
    }
    setDimOverride(profile.dim);
    setEngineOverride(profile.targetEngine);
    onNotify(`✨ Auto Mode (${profile.shortLabel}): ${profile.matchReason}`);
  };

  const applyMappingRow = (
    row: DeityCoupleMappingRow,
    samplerOverride?: string,
    cinemaIdOverride?: string
  ) => {
    const profile =
      DEITY_AUTO_PROFILES.find((p) => p.id === row.profileId) ||
      resolveDeityAutoProfile(row.deityOrCouple);
    const chosenSampler = samplerOverride || row.primarySampler;
    const chosenCinemaId = cinemaIdOverride || row.primaryCinemaId;
    const cinemaObj = CINEMA_PLATFORM_PROFILES.find((c) => c.id === chosenCinemaId);

    setSubject(profile.deityName);
    setStory(`${profile.autoStory} [Atmosphere: ${row.moodAtmosphere}]`);
    setSelectedProfileId(chosenCinemaId);
    const matchedSam = SAMPLER_SPECS.find((s) => s.sampler === chosenSampler);
    if (matchedSam) {
      setSelectedSamplerId(matchedSam.id);
    }
    setDimOverride(profile.dim);
    setEngineOverride(cinemaObj?.linkedBestOutput.targetEngine || profile.targetEngine);
    onNotify(
      `Applied ${row.deityOrCouple} ➔ ${cinemaObj?.shortName || chosenCinemaId} + ${chosenSampler}`
    );
  };

  const handleSubjectInput = (val: string) => {
    setSubject(val);
    if (autoDeityMode && val.trim().length >= 3) {
      const auto = resolveDeityAutoProfile(val, story);
      if (auto.id !== "custom-sovereign-deity") {
        setSelectedProfileId(auto.cinemaStyle);
        const matchedSam = SAMPLER_SPECS.find((s) => s.sampler === auto.sampler);
        if (matchedSam) setSelectedSamplerId(matchedSam.id);
        setDimOverride(auto.dim);
        setEngineOverride(auto.targetEngine);
      }
    }
  };

  const builtMasterPrompt = useMemo(() => {
    const engineFlags =
      effectiveEngine === "Midjourney v6.1"
        ? `--ar ${effectiveDim} --style raw --v 6.1 --q 2 --s 750`
        : effectiveEngine === "SDXL"
        ? `aspect ratio ${effectiveDim}, sampler: ${activeSampler.sampler}, steps: ${activeSampler.recommendedSteps}, cfg: ${activeSampler.cfgScale}`
        : `aspect ratio ${effectiveDim}, 8K photoreal master`;

    const overlayClause = includeOverlayDoctrine
      ? ` ${POSTER_OVERLAY_DOCTRINE.combinedInstruction}`
      : " Clean master artwork without text or watermarks.";

    return `${subject.trim()}, ${story.trim()}. ${activeProfile.promptInject}. Camera & Optics: ${activeProfile.cameraAndOptics}. Lighting & Color: ${activeProfile.lightingAndColor}. Optimized for ${activeSampler.sampler} (${activeSampler.useFor}, ${activeSampler.recommendedSteps} steps, CFG ${activeSampler.cfgScale}).${overlayClause} ${engineFlags}`;
  }, [subject, story, activeProfile, activeSampler, effectiveDim, effectiveEngine, includeOverlayDoctrine]);

  const samplerWorkflowBlock = useMemo(() => {
    return JSON.stringify(
      {
        cinemaGrade: activeProfile.name,
        targetEngine: effectiveEngine,
        aspectRatio: effectiveDim,
        sampler: activeSampler.sampler,
        comfyui_sampler_name: activeSampler.comfyName,
        comfyui_scheduler: activeSampler.scheduler,
        steps: activeProfile.linkedBestOutput.steps,
        cfg_scale: activeProfile.linkedBestOutput.cfg,
        recommendedStepsRange: activeSampler.recommendedSteps,
        recommendedCfgRange: activeSampler.cfgScale,
        useFor: activeSampler.useFor,
        ...(includeOverlayDoctrine
          ? {
              posterOverlayRules: {
                subtitleRule: POSTER_OVERLAY_DOCTRINE.subtitleRule,
                textLegibilityScrim: POSTER_OVERLAY_DOCTRINE.textLegibilityScrim,
                safeMargins: POSTER_OVERLAY_DOCTRINE.safeMargins,
              },
            }
          : {}),
      },
      null,
      2
    );
  }, [activeProfile, activeSampler, effectiveEngine, effectiveDim, includeOverlayDoctrine]);

  const handleCopy = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendPipelineToForge = () => {
    onSendToForge({
      subject,
      story: `${story} [Cinema Look: ${activeProfile.name} — ${activeProfile.cameraAndOptics}]`,
      dim: effectiveDim,
      targetEngine: effectiveEngine,
      sampler: activeSampler.sampler,
      cinemaStyle: activeProfile.id,
    });
    onNotify(
      `Sent ${activeProfile.shortName} + ${activeSampler.sampler} to V10/V11 Forge!`
    );
  };

  const filteredProfiles = useMemo(() => {
    if (categoryFilter === "ALL") return CINEMA_PLATFORM_PROFILES;
    return CINEMA_PLATFORM_PROFILES.filter((p) => p.category === categoryFilter);
  }, [categoryFilter]);

  const filteredSamplers = useMemo(() => {
    return SAMPLER_SPECS.filter((s) => {
      const matchesTier = samplerTier === "ALL" || s.tier === samplerTier;
      const q = samplerFilter.trim().toLowerCase();
      const matchesQuery =
        !q ||
        s.sampler.toLowerCase().includes(q) ||
        s.useFor.toLowerCase().includes(q) ||
        s.speed.toLowerCase().includes(q) ||
        s.detail.toLowerCase().includes(q);
      return matchesTier && matchesQuery;
    });
  }, [samplerFilter, samplerTier]);

  const speedBadgeStyle = (speed: SamplerSpec["speed"]) => {
    switch (speed) {
      case "Instant":
      case "Very Fast":
        return "bg-emerald-950/70 text-emerald-300 border-emerald-500/40";
      case "Fast":
        return "bg-sky-950/70 text-sky-300 border-sky-500/40";
      case "Medium":
        return "bg-amber-950/70 text-amber-300 border-amber-500/40";
      case "Slow":
        return "bg-orange-950/70 text-orange-300 border-orange-500/40";
      case "Very Slow":
        return "bg-rose-950/70 text-rose-300 border-rose-500/40";
    }
  };

  const detailBadgeStyle = (detail: SamplerSpec["detail"]) => {
    switch (detail) {
      case "Highest":
      case "Very High":
        return "bg-purple-950/70 text-purple-200 border-purple-400/50";
      case "High":
      case "Clean":
      case "Smooth":
        return "bg-amber-950/70 text-amber-200 border-amber-400/40";
      case "Sharp":
      case "Soft":
      case "Medium":
        return "bg-cyan-950/70 text-cyan-200 border-cyan-500/40";
      case "Low":
        return "bg-stone-900 text-stone-400 border-stone-700";
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      {/* Studio Banner */}
      <div className="rounded-2xl border border-[#382d1c] bg-gradient-to-br from-[#140f08] via-[#0d0a06] to-[#120d18] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              <Film className="w-3 h-3" />
              <span>Cinema Lookbook &amp; Diffusion Sampler Matrix</span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f4cf6a]">
              OTT Platforms, Auteur Directors &amp; Best-Output Sampler Linker
            </h2>
            <p className="text-xs text-[#a39274] max-w-2xl leading-relaxed">
              Pair <strong className="text-[#e5e0d5]">Apple TV+</strong>,{" "}
              <strong className="text-[#e5e0d5]">Netflix</strong>,{" "}
              <strong className="text-[#e5e0d5]">BBC Earth</strong>,{" "}
              <strong className="text-[#e5e0d5]">Disney</strong>,{" "}
              <strong className="text-[#e5e0d5]">Ideogram</strong>,{" "}
              <strong className="text-[#e5e0d5]">Nat Geo</strong>, and{" "}
              <strong className="text-[#e5e0d5]">Nolan / Hoyte</strong> with the exact diffusion sampler
              (DPM++ 2M/SDE/3M Karras, Euler, Heun, LMS, UniPC, DDIM, LCM) for maximum output quality.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setAutoLinkSampler((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                autoLinkSampler
                  ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-300"
                  : "bg-[#18130c] border-[#382d1c] text-[#a39274]"
              }`}
              title="Automatically link the best sampler, engine, and aspect ratio when selecting any Cinema/Director style"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Auto-Link Best Sampler: {autoLinkSampler ? "ON" : "OFF"}</span>
            </button>

            <button
              type="button"
              onClick={handleSendPipelineToForge}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#f4cf6a] text-black text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Linked Setup to Forge</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: LIVE LINKED OUTPUT PIPELINE */}
      <section className="rounded-2xl border border-[#d4af37]/50 bg-[#0b0805] p-5 sm:p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262016] pb-3">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-[#ffd700]" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#f4cf6a] uppercase tracking-wider">
              Active Best-Output Link Chain
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            {activeProfile.shortName} ➔ {activeSampler.sampler} ➔ {effectiveEngine} ({effectiveDim})
          </span>
        </div>

        {/* 4-Step Pipeline Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-xl border border-[#382d1c] bg-[#120e09] p-3.5 space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#8c7a5c] flex items-center gap-1">
              <Film className="w-3 h-3 text-amber-400" />
              <span>1. Cinema / Platform</span>
            </div>
            <div className="text-sm font-bold text-white truncate">{activeProfile.name}</div>
            <div className="text-[11px] text-amber-300/90 truncate">{activeProfile.badge}</div>
          </div>

          <div className="rounded-xl border border-[#382d1c] bg-[#120e09] p-3.5 space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#8c7a5c] flex items-center gap-1">
              <Sliders className="w-3 h-3 text-purple-400" />
              <span>2. Linked Sampler</span>
            </div>
            <div className="text-sm font-bold text-purple-200 truncate">{activeSampler.sampler}</div>
            <div className="text-[11px] text-[#a39274] truncate">
              {activeSampler.speed} • {activeSampler.detail} • {activeSampler.useFor}
            </div>
          </div>

          <div className="rounded-xl border border-[#382d1c] bg-[#120e09] p-3.5 space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#8c7a5c] flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>3. Target AI Engine</span>
            </div>
            <select
              value={effectiveEngine}
              onChange={(e) => setEngineOverride(e.target.value as TargetEngine)}
              className="w-full bg-[#070503] border border-[#2c2214] rounded-lg px-2 py-1 text-xs font-bold text-cyan-200 outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="Midjourney v6.1">Midjourney v6.1</option>
              <option value="Flux 1.1 Pro">Flux 1.1 Pro</option>
              <option value="Ideogram 2.0">Ideogram 2.0</option>
              <option value="Imagen 3">Imagen 3</option>
              <option value="SDXL">SDXL</option>
            </select>
            <div className="text-[10px] text-[#8c7a5c] truncate">
              Recommended: {activeProfile.linkedBestOutput.targetEngine}
            </div>
          </div>

          <div className="rounded-xl border border-[#382d1c] bg-[#120e09] p-3.5 space-y-1">
            <div className="text-[10px] font-mono uppercase text-[#8c7a5c] flex items-center gap-1">
              <Gauge className="w-3 h-3 text-emerald-400" />
              <span>4. Ratio, Steps &amp; CFG</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(["16:9", "21:9", "9:16", "2:3", "4:5"] as AspectRatio[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDimOverride(r)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border cursor-pointer ${
                    effectiveDim === r
                      ? "bg-[#d4af37] text-black border-[#ffd700]"
                      : "bg-[#090704] text-[#a39274] border-[#262016]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-emerald-300/90 font-mono">
              Steps: {activeSampler.recommendedSteps} | CFG: {activeSampler.cfgScale}
            </div>
          </div>
        </div>

        {/* Rationale Banner */}
        <div className="rounded-xl bg-[#141009] border border-[#2b2116] px-4 py-2.5 text-xs text-[#c7b9a5] flex items-start gap-2">
          <Award className="w-4 h-4 text-[#ffd700] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#f4cf6a]">Best Output Rationale: </span>
            {activeProfile.linkedBestOutput.rationale}
          </div>
        </div>

        {/* Deity Auto Mode & Scene Quick Chips */}
        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase text-emerald-300">
                  ✨ Auto Mode — Generate As Per Deity:
                </span>
                <button
                  type="button"
                  onClick={() => setAutoDeityMode((prev) => !prev)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border cursor-pointer ${
                    autoDeityMode
                      ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-200"
                      : "bg-stone-900 border-stone-700 text-stone-400"
                  }`}
                >
                  {autoDeityMode ? "Auto-Match: ON" : "Auto-Match: OFF"}
                </button>
              </div>
              <button
                type="button"
                onClick={() => applyDeityAutoMatch(subject, true)}
                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] uppercase tracking-wider cursor-pointer transition"
              >
                ⚡ Auto-Tune Current Deity
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DEITY_AUTO_PROFILES.map((dp) => (
                <button
                  key={dp.id}
                  type="button"
                  onClick={() => applyDeityAutoMatch(dp, true)}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#120e09] hover:bg-emerald-950/60 border border-[#2b2116] hover:border-emerald-400/50 text-[#e5e0d5] hover:text-emerald-200 transition cursor-pointer"
                  title={dp.matchReason}
                >
                  ✨ {dp.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {SCENE_CHIPS.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => handleApplySceneChip(chip)}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#16110a] hover:bg-[#241b10] border border-[#382d1c] text-[#d4af37] hover:text-[#ffd700] transition cursor-pointer"
              >
                ⚡ {chip.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={subject}
              onChange={(e) => handleSubjectInput(e.target.value)}
              placeholder="Subject / Deity / Scene (auto-matches cinema & sampler)..."
              className="w-full bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
            <input
              type="text"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Scene narrative & mood..."
              className="w-full bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Generated Linked Prompt & Sampler JSON */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border border-[#382d1c] bg-[#070503] p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono font-bold uppercase text-[#f4cf6a] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                <span>Linked Cinema + Sampler Master Prompt</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(builtMasterPrompt, "linked_prompt", "Linked Master Prompt")}
                className="px-3 py-1 rounded-lg bg-[#d4af37] hover:bg-[#f4cf6a] text-black font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition"
              >
                {copiedKey === "linked_prompt" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs leading-relaxed text-[#e5e0d5] select-all">
              {builtMasterPrompt}
            </p>
          </div>

          <div className="rounded-xl border border-[#262016] bg-[#070503] p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-mono font-bold uppercase text-emerald-400">
                Sampler / ComfyUI Config
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(samplerWorkflowBlock, "sampler_json", "Sampler Config JSON")
                }
                className="px-2.5 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-200 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition"
              >
                {copiedKey === "sampler_json" ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copy JSON</span>
              </button>
            </div>
            <pre className="text-[10px] font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
              {samplerWorkflowBlock}
            </pre>
          </div>
        </div>

        {/* OTT Poster & Overlay Rules (3 Refined Additions) */}
        <div className="rounded-xl border border-amber-500/30 bg-[#0b0805] p-3.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#ffd700]" />
              <span className="text-[11px] font-mono font-bold uppercase text-[#f4cf6a]">
                OTT Poster &amp; Overlay Rules (3 Refined Additions)
              </span>
              <button
                type="button"
                onClick={() => setIncludeOverlayDoctrine((prev) => !prev)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border cursor-pointer transition ${
                  includeOverlayDoctrine
                    ? "bg-amber-500/20 border-amber-400/50 text-amber-200"
                    : "bg-stone-900 border-stone-700 text-stone-400"
                }`}
              >
                {includeOverlayDoctrine ? "Include in Prompt: ON" : "Include in Prompt: OFF"}
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  `1. Sub-title / Sub-hook Rule:\n   - ${POSTER_OVERLAY_DOCTRINE.subtitleRule}\n2. Text Legibility Scrim:\n   - ${POSTER_OVERLAY_DOCTRINE.textLegibilityScrim}\n3. Pill & Badge Margins:\n   - ${POSTER_OVERLAY_DOCTRINE.safeMargins}\n\nAuto-Selection & Decision Logic:\n- ${AUTO_SELECTION_DECISION_LOGIC.rule}`,
                  "memory_rules",
                  "OTT Poster & Auto-Selection Memory Rules"
                )
              }
              className="px-2.5 py-1 rounded-lg bg-[#1a140c] hover:bg-[#261d11] border border-[#d4af37]/50 text-[#f4cf6a] font-bold text-[10px] flex items-center gap-1 cursor-pointer transition"
            >
              {copiedKey === "memory_rules" ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied Rules!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Memory Rules</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
            <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 text-[#d6cbb8]">
              <span className="block font-mono text-[10px] font-bold text-amber-300 mb-0.5">
                1. Sub-title / Sub-hook Rule
              </span>
              {POSTER_OVERLAY_DOCTRINE.subtitleRule}
            </div>
            <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 text-[#d6cbb8]">
              <span className="block font-mono text-[10px] font-bold text-amber-300 mb-0.5">
                2. Text Legibility Scrim
              </span>
              {POSTER_OVERLAY_DOCTRINE.textLegibilityScrim}
            </div>
            <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 text-[#d6cbb8]">
              <span className="block font-mono text-[10px] font-bold text-amber-300 mb-0.5">
                3. Pill &amp; Badge Margins (5%)
              </span>
              {POSTER_OVERLAY_DOCTRINE.safeMargins}
            </div>
            <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 text-[#d6cbb8]">
              <span className="block font-mono text-[10px] font-bold text-emerald-300 mb-0.5">
                4. Auto-Selection &amp; Decision Logic
              </span>
              {AUTO_SELECTION_DECISION_LOGIC.rule}
            </div>
          </div>
        </div>

        {/* External Best Output Generator Links */}
        <div className="pt-2 border-t border-[#262016] space-y-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Links for Best Output (Copy Prompt Above &amp; Launch Engine)</span>
            </span>
            <a
              href={activeProfile.externalOutputLink.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                handleCopy(
                  builtMasterPrompt,
                  "recommended_launch",
                  `Prompt for ${activeProfile.externalOutputLink.label}`
                )
              }
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-bold inline-flex items-center gap-1.5 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Recommended: {activeProfile.externalOutputLink.label}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {BEST_OUTPUT_GENERATOR_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  handleCopy(builtMasterPrompt, link.id, `Prompt for ${link.name}`)
                }
                className="group rounded-xl border border-[#262016] hover:border-[#d4af37] bg-[#120e09] hover:bg-[#1a140c] p-3 flex flex-col justify-between gap-1.5 transition-all"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-[#f4cf6a] group-hover:text-[#ffd700] truncate">
                    {link.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#8c7a5c] group-hover:text-[#ffd700] shrink-0" />
                </div>
                <div className="text-[10px] text-[#c7b9a5] line-clamp-1">{link.subtitle}</div>
                <div className="text-[9px] font-mono text-emerald-300/80 truncate">
                  {link.recommendedSampler}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1B: DEITIES & COUPLES MAPPING TABLE */}
      <section className="rounded-2xl border border-amber-500/30 bg-[#0b0805] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-[#f4cf6a] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ffd700]" />
              <span>Deities &amp; Couples Mapping Table (Sampler &amp; Network Look)</span>
            </h3>
            <p className="text-xs text-[#8c7a5c]">
              Click any deity or couple row—or pick a primary/alternate network or sampler badge—to auto-configure the Active Pipeline.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const mdTable = [
                "| Deity / Couple | Recommended Sampler | Network Look / Style | Mood & Atmosphere |",
                "| :--- | :--- | :--- | :--- |",
                ...DEITY_COUPLE_MAPPING_TABLE.map(
                  (r) =>
                    `| ${r.deityOrCouple} | ${r.recommendedSamplerLabel} | ${r.networkStyleLabel} | ${r.moodAtmosphere} |`
                ),
              ].join("\n");
              handleCopy(mdTable, "deity_mapping_table", "Deities & Couples Mapping Table");
            }}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#1a140c] hover:bg-[#261d11] border border-[#d4af37]/50 text-[#f4cf6a] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
          >
            {copiedKey === "deity_mapping_table" ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied Table!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Mapping Table</span>
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#262016]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#14100a] border-b border-[#262016] text-[11px] font-mono uppercase text-[#d4af37]">
                <th className="py-3 px-4">Deity / Couple</th>
                <th className="py-3 px-3">Recommended Sampler</th>
                <th className="py-3 px-3">Network Look / Style</th>
                <th className="py-3 px-4">Mood &amp; Atmosphere</th>
                <th className="py-3 px-4 text-right">Apply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1910]">
              {DEITY_COUPLE_MAPPING_TABLE.map((row) => {
                const matchedProfile = DEITY_AUTO_PROFILES.find((p) => p.id === row.profileId);
                const isRowActive =
                  matchedProfile &&
                  subject.toLowerCase().includes(matchedProfile.shortLabel.toLowerCase());
                return (
                  <tr
                    key={row.id}
                    onClick={() => applyMappingRow(row)}
                    className={`cursor-pointer transition-colors ${
                      isRowActive
                        ? "bg-amber-950/35 hover:bg-amber-950/45"
                        : "bg-[#090704] hover:bg-[#14100b]"
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-[#f4cf6a] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isRowActive ? "bg-[#ffd700] shadow-[0_0_8px_#ffd700]" : "bg-[#382d1c]"
                          }`}
                        />
                        <span>{row.deityOrCouple}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-purple-200 font-semibold">
                        {row.recommendedSamplerLabel}
                      </div>
                      {row.altSampler && (
                        <div className="flex items-center gap-1 mt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              applyMappingRow(row, row.primarySampler, selectedProfileId);
                            }}
                            className="px-1.5 py-0.5 rounded bg-purple-500/20 hover:bg-purple-500/35 border border-purple-400/40 text-[10px] font-mono text-purple-200 cursor-pointer"
                          >
                            {row.primarySampler}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              applyMappingRow(row, row.altSampler, selectedProfileId);
                            }}
                            className="px-1.5 py-0.5 rounded bg-[#14100a] hover:bg-purple-500/25 border border-[#382d1c] text-[10px] font-mono text-[#c7b9a5] hover:text-purple-200 cursor-pointer"
                          >
                            {row.altSampler}
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-cyan-200 font-semibold">{row.networkStyleLabel}</div>
                      {row.altCinemaId && (
                        <div className="flex items-center gap-1 mt-1">
                          {[row.primaryCinemaId, row.altCinemaId].map((cid) => {
                            const prof = CINEMA_PLATFORM_PROFILES.find((c) => c.id === cid);
                            if (!prof) return null;
                            const activeNet = isRowActive && activeProfile.id === cid;
                            return (
                              <button
                                key={cid}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  applyMappingRow(row, row.primarySampler, cid);
                                }}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-mono border cursor-pointer transition ${
                                  activeNet
                                    ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold"
                                    : "bg-[#14100a] border-[#382d1c] text-[#c7b9a5] hover:border-cyan-400/50 hover:text-cyan-200"
                                }`}
                              >
                                {prof.shortName}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#e5e0d5]">{row.moodAtmosphere}</td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          applyMappingRow(row);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                          isRowActive
                            ? "bg-[#d4af37] text-black border-[#ffd700]"
                            : "bg-[#1a140c] text-[#f4cf6a] border-[#382d1c] hover:border-[#d4af37]"
                        }`}
                      >
                        {isRowActive ? "Active ✓" : "Use Preset"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: CINEMA, OTT PLATFORMS & AUTEUR DIRECTORS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-[#f4cf6a] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#ffd700]" />
              <span>Apple TV+, Netflix, HBO Prestige, BBC Earth, Disney, Ideogram, Nat Geo &amp; Nolan / Hoyte</span>
            </h3>
            <p className="text-xs text-[#8c7a5c]">
              Click any studio, broadcast network, or cinematographer to auto-link its optics, color grade, and optimal sampler.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(
              [
                "ALL",
                "OTT & Broadcast",
                "Directors & Cinematographers",
                "AI & Poster Engines",
              ] as const
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-[#d4af37] text-black border-[#ffd700]"
                    : "bg-[#120e09] text-[#a39274] border-[#262016] hover:border-[#382d1c]"
                }`}
              >
                {cat === "ALL" ? "All Sections" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProfiles.map((profile) => {
            const isSelected = profile.id === activeProfile.id;
            return (
              <div
                key={profile.id}
                onClick={() => handleSelectProfile(profile)}
                className={`cursor-pointer rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-all ${
                  isSelected
                    ? "border-[#ffd700] bg-gradient-to-b from-[#1d160b] to-[#0e0b07] shadow-xl shadow-[#d4af37]/15 ring-1 ring-[#ffd700]/60"
                    : "border-[#262016] bg-[#0c0906] hover:border-[#4d3d25] hover:bg-[#120e09]"
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90">
                        {profile.category}
                      </span>
                      <h4 className="font-cinzel text-sm font-bold text-white leading-snug">
                        {profile.name}
                      </h4>
                    </div>
                    <span className="shrink-0 rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                      {profile.badge}
                    </span>
                  </div>

                  <p className="text-xs text-[#c7b9a5] leading-relaxed">
                    {profile.tagline}
                  </p>

                  <div className="rounded-lg bg-[#070503] border border-[#1f1910] p-2.5 space-y-1 text-[11px]">
                    <div className="text-[#a39274]">
                      <strong className="text-[#f4cf6a]">Optics:</strong> {profile.cameraAndOptics}
                    </div>
                    <div className="text-[#a39274]">
                      <strong className="text-[#f4cf6a]">Grade:</strong> {profile.lightingAndColor}
                    </div>
                  </div>

                  {/* Color Palette Strip */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {profile.palette.map((swatch) => (
                      <div
                        key={swatch.name}
                        className="flex-1 h-2.5 rounded-sm border border-white/10"
                        style={{ backgroundColor: swatch.hex }}
                        title={`${swatch.name} (${swatch.hex})`}
                      />
                    ))}
                  </div>
                </div>

                {/* Linked Best Output Footer */}
                <div className="pt-2.5 border-t border-[#262016] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono uppercase text-[#8c7a5c]">
                      Best Linked Output
                    </div>
                    <div className="text-[11px] font-bold text-purple-300 truncate">
                      {profile.linkedBestOutput.sampler} • {profile.linkedBestOutput.targetEngine}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectProfile(profile);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      isSelected
                        ? "bg-[#d4af37] text-black"
                        : "bg-[#1a140c] text-[#f4cf6a] border border-[#382d1c] hover:border-[#d4af37]"
                    }`}
                  >
                    {isSelected ? "Linked ✓" : "Link Output"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: 10-SAMPLER MATRIX TABLE */}
      <section className="rounded-2xl border border-[#262016] bg-[#0b0805] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-[#f4cf6a] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-400" />
              <span>Diffusion Sampler Speed, Detail &amp; Use-Case Matrix</span>
            </h3>
            <p className="text-xs text-[#8c7a5c]">
              Click any sampler row to bind it into the Active Best-Output Pipeline or copy its exact parameters.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8c7a5c] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={samplerFilter}
                onChange={(e) => setSamplerFilter(e.target.value)}
                placeholder="Filter (e.g. Ganga, 8K, stone)..."
                className="bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white outline-none w-52"
              />
            </div>

            {(["ALL", "Production", "Hero", "Artistic", "Draft"] as const).map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setSamplerTier(tier)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                  samplerTier === tier
                    ? "bg-purple-600 text-white border-purple-400"
                    : "bg-[#120e09] text-[#a39274] border-[#262016]"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#262016]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#14100a] border-b border-[#262016] text-[11px] font-mono uppercase text-[#d4af37]">
                <th className="py-3 px-4">Sampler</th>
                <th className="py-3 px-3">Speed</th>
                <th className="py-3 px-3">Detail</th>
                <th className="py-3 px-4">Use for</th>
                <th className="py-3 px-3">Steps / CFG</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1910]">
              {filteredSamplers.map((spec) => {
                const isSelected = spec.id === activeSampler.id;
                return (
                  <tr
                    key={spec.id}
                    onClick={() => handleSelectSampler(spec)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-purple-950/35 hover:bg-purple-950/45"
                        : "bg-[#090704] hover:bg-[#14100b]"
                    }`}
                  >
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? "bg-purple-400 shadow-[0_0_8px_#c084fc]" : "bg-[#382d1c]"
                          }`}
                        />
                        <span>{spec.sampler}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${speedBadgeStyle(
                          spec.speed
                        )}`}
                      >
                        {spec.speed}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${detailBadgeStyle(
                          spec.detail
                        )}`}
                      >
                        {spec.detail}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#e5e0d5] font-medium">
                      {spec.useFor}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-[#a39274] whitespace-nowrap">
                      {spec.recommendedSteps} • CFG {spec.cfgScale}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(
                              `Sampler: ${spec.sampler} | Steps: ${spec.recommendedSteps} | CFG: ${spec.cfgScale} | ComfyUI: ${spec.comfyName} (${spec.scheduler})`,
                              `copy_${spec.id}`,
                              spec.sampler
                            );
                          }}
                          className="px-2 py-1 rounded bg-[#18130c] hover:bg-[#251e13] border border-[#382d1c] text-[10px] text-[#a39274] hover:text-white cursor-pointer"
                          title="Copy Sampler Parameters"
                        >
                          {copiedKey === `copy_${spec.id}` ? "Copied" : "Copy"}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSampler(spec);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer ${
                            isSelected
                              ? "bg-purple-500 text-white"
                              : "bg-[#d4af37]/20 text-[#f4cf6a] border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-black"
                          }`}
                        >
                          {isSelected ? "Active" : "Use"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: L1-L30 OTT MASTER PROMPT TOOL & ALL 30 LEVEL SECTIONS */}
      <OttLevelL1L30Tool
        initialSubject={subject}
        onSendToForge={onSendToForge}
        onNotify={onNotify}
      />
    </div>
  );
};
