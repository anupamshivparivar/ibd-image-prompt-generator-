import React, { useMemo, useState } from "react";
import {
  OTT_LEVELS_L1_L30,
  UNIQUE_VARIATION_SCENES,
  DIMENSION_DEPTH_DIRECTIVES,
  DimensionDepthMode,
  OttAspectRatio,
  LevelTierGroup,
  getLoraTagForSubject,
} from "../data/ottLevelsL1L30";
import {
  POSTER_OVERLAY_DOCTRINE,
  CINEMA_PLATFORM_PROFILES,
} from "../data/cinemaSamplerData";
import {
  resolveDeityAutoProfile,
  AUTO_SELECTION_DECISION_LOGIC,
} from "../data/deityAutoProfiles";
import { AspectRatio, ForgeRequest } from "../types";
import {
  Sliders,
  Layers,
  Copy,
  Check,
  Shuffle,
  Download,
  Send,
  ShieldAlert,
  Crown,
  Sparkles,
  Camera,
} from "lucide-react";

interface OttLevelL1L30ToolProps {
  initialSubject?: string;
  onSendToForge?: (req: Partial<ForgeRequest>) => void;
  onNotify: (msg: string) => void;
}

const ANCHOR_LEVELS = [1, 7, 10, 13, 15, 18, 19, 28, 30];

const TIER_FILTERS: ("ALL" | LevelTierGroup)[] = [
  "ALL",
  "L1-L6 Foundation",
  "L7-L12 OTT & Broadcast",
  "L13-L18 Cinema & Hyper-Real",
  "L19-L30 Divine & God Level",
];

function buildStandaloneHtmlDocument(): string {
  const levelsJson = JSON.stringify(OTT_LEVELS_L1_L30);
  const scenesJson = JSON.stringify(UNIQUE_VARIATION_SCENES);
  const depthJson = JSON.stringify(DIMENSION_DEPTH_DIRECTIVES);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IBD L1-L30 OTT Master Prompt Tool</title>
<style>
  :root { color-scheme: dark; }
  body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #070503; color: #f5efe6; padding: 20px; }
  .wrap { max-width: 1120px; margin: 0 auto; }
  .card { background: #0f0b07; border: 1px solid #2b2116; border-radius: 14px; padding: 18px; margin-bottom: 16px; }
  h1, h2 { margin: 0 0 8px; color: #f4cf6a; }
  .row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
  .btn { background: #18120b; color: #e5dfd5; border: 1px solid #382d1c; border-radius: 8px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: 600; }
  .btn.active { background: #d4af37; color: #090704; border-color: #ffd700; }
  input[type="text"] { background: #070503; color: #fff; border: 1px solid #382d1c; border-radius: 8px; padding: 9px 12px; font-size: 13px; flex: 1; min-width: 220px; }
  input[type="range"] { width: 100%; accent-color: #d4af37; }
  pre { background: #050403; border: 1px solid #2b2116; border-radius: 10px; padding: 14px; white-space: pre-wrap; font-family: ui-monospace, monospace; font-size: 12px; line-height: 1.55; color: #e9decb; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { text-align: left; padding: 9px 10px; border-bottom: 1px solid #1f1910; }
  th { color: #d4af37; font-family: ui-monospace, monospace; text-transform: uppercase; font-size: 11px; }
  tr.sel { background: #261c0f; }
  tr:hover { background: #171109; cursor: pointer; }
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <h1>IBD L1-L30 OTT Master Prompt Tool</h1>
    <p style="margin:0;color:#b8ab96;font-size:13px;">Single-file standalone edition · Branding Lock: Top-Left IBD Logo, Top-Centre Gold Title, Bottom-Centre An Indian Bhakti Dhara Production · Always Unique Variation</p>
  </div>
  <div class="card">
    <div class="row" style="margin-bottom:12px;">
      <input id="subj" type="text" value="Shri Ram and Hanuman" placeholder="Deity or Couple..." />
      <input id="titleTxt" type="text" value="SHRI RAM DARSHAN" placeholder="Top-Centre Gold Title..." />
      <button class="btn" onclick="nextVariation()">Unique Variation</button>
      <button class="btn active" onclick="copyOut()">Copy Single Code Block</button>
    </div>
    <div style="margin-bottom:12px;">
      <div class="row" style="justify-content:space-between;margin-bottom:4px;">
        <strong id="lvlLabel" style="color:#ffd700;">L30 — Infinity / God Level / OTT Ultra</strong>
        <span id="minWarn" style="font-size:12px;color:#34d399;">Above L18 Minimum Standard</span>
      </div>
      <input id="lvlRange" type="range" min="1" max="30" value="30" oninput="setLevel(Number(this.value))" />
    </div>
    <div class="row" style="justify-content:space-between;">
      <div class="row" id="depthBtns"></div>
      <div class="row" id="arBtns"></div>
    </div>
  </div>
  <div class="card">
    <h2>Master Prompt Code Block</h2>
    <pre id="codeOut"></pre>
  </div>
  <div class="card">
    <h2>Levels L1-L30 Reference & Quick Select</h2>
    <table>
      <thead><tr><th>Level</th><th>Name / Standard</th><th>Sampler &amp; Steps</th><th>LoRA</th><th>Detail &amp; VFX Summary</th></tr></thead>
      <tbody id="tblBody"></tbody>
    </table>
  </div>
</div>
<script>
const LEVELS = ${levelsJson};
const SCENES = ${scenesJson};
const DEPTHS = ${depthJson};
let state = { level: 30, depth: "4D", ar: "16:9", varIdx: 0 };
function setLevel(v){ state.level = v; render(); }
function setDepth(d){ state.depth = d; render(); }
function setAr(a){ state.ar = a; render(); }
function nextVariation(){ state.varIdx = (state.varIdx + 1) % SCENES.length; render(); }
function buildPrompt(){
  const spec = LEVELS.find(x => x.level === state.level) || LEVELS[29];
  const subj = document.getElementById("subj").value.trim() || "Sacred Deity";
  const ttl = document.getElementById("titleTxt").value.trim() || subj.toUpperCase();
  const scene = SCENES[state.varIdx % SCENES.length];
  const cleanSubj = subj.replace(/[^a-zA-Z0-9]+/g,"").slice(0,18) || "Divine";
  const loraTag = cleanSubj + "_" + spec.code;
  const resMap = { "16:9":"1920x1080 / 3840x2160 (16:9)", "9:16":"1080x1920 Vertical IMAX (9:16)", "4:5":"1080x1350 Portrait (4:5)", "1:1":"1440x1440 Square (1:1)" };
  return [
    "=== IBD OTT MASTER PROMPT (" + spec.code + ": " + spec.name + ") ===",
    "",
    "[POSITIVE PROMPT]",
    subj + ", unique non-repeating composition (" + scene + "). " + spec.positiveDirectives + ". " + DEPTHS[state.depth] + ". Aspect ratio " + state.ar + ". Title legibility soft dark gradient scrim behind text overlays. Subtle subtitle directly under main title in smaller gold/white contrast.",
    "",
    "[NEGATIVE PROMPT]",
    spec.negativeAddons + ", repeated pose, ghisa-pita stock layout, lower-third clutter, text over YouTube progress bar, watermark distortion, extra fingers, asymmetrical eyes",
    "",
    "[CGI BEST PARAMETERS]",
    "Level: " + spec.code + " (" + spec.name + ") | Depth: " + state.depth + " | Aspect Ratio: " + resMap[state.ar],
    "LoRA: " + loraTag + " (Weight: " + spec.loraWeight + ")",
    "Sampler: " + spec.sampler + " | Steps: " + spec.steps + " | CFG Scale: " + spec.cfg + " | Face Detailer: " + spec.faceDetailer,
    "Camera: " + spec.camera + " | Shutter: " + spec.shutter + " | Aperture: " + spec.aperture,
    "VFX Matrix: Nebula=" + spec.vfxProfile.nebula + ", God-Ray=" + spec.vfxProfile.godRay + ", Moog=" + spec.vfxProfile.moog + ", Gold Dust=" + spec.vfxProfile.goldDust + ", Mist=" + spec.vfxProfile.mist + ", Water Reflection=" + spec.vfxProfile.waterReflection + ", Volumetric=" + spec.vfxProfile.volumetric,
    "",
    "[BRANDING & LOGO LOCK]",
    "- IBD Logo: Top-Left corner",
    "- Title: '" + ttl + "' at Top-Centre in artistic gold font (avoids YouTube lower-third / progress bar)",
    "- Bottom-Centre: Small subtle white branding — An Indian Bhakti Dhara Production",
    "- Safe Margins: Watch Now pill (bottom-left) and 4K badges (bottom-right) 5% inside screen edges",
    "- Variation Rule: ALWAYS UNIQUE VARIATION — NEVER GHISA-PITA"
  ].join("\\n");
}
function render(){
  const spec = LEVELS.find(x => x.level === state.level) || LEVELS[29];
  document.getElementById("lvlRange").value = String(state.level);
  document.getElementById("lvlLabel").textContent = spec.code + " — " + spec.name;
  const warn = document.getElementById("minWarn");
  if(state.level < 18){ warn.textContent = "Below L18 Minimum Standard (Recommended >= L18)"; warn.style.color = "#fbbf24"; }
  else { warn.textContent = state.level === 30 ? "L30 Infinity / God Level Active" : "Meets L18+ IBD Production Standard"; warn.style.color = "#34d399"; }
  document.getElementById("depthBtns").innerHTML = ["2D","3D","4D"].map(d => '<button class="btn '+(state.depth===d?'active':'')+'" onclick="setDepth(\\''+d+'\\')">'+d+'</button>').join("");
  document.getElementById("arBtns").innerHTML = ["16:9","9:16","4:5","1:1"].map(a => '<button class="btn '+(state.ar===a?'active':'')+'" onclick="setAr(\\''+a+'\\')">'+a+'</button>').join("");
  document.getElementById("codeOut").textContent = buildPrompt();
  document.getElementById("tblBody").innerHTML = LEVELS.map(l => '<tr class="'+(l.level===state.level?'sel':'')+'" onclick="setLevel('+l.level+')"><td><strong>'+l.code+'</strong></td><td>'+l.name+'</td><td>'+l.sampler+' · '+l.steps+'</td><td>'+l.loraWeight+'</td><td>'+l.summary+'</td></tr>').join("");
}
function copyOut(){ navigator.clipboard.writeText(document.getElementById("codeOut").textContent); }
document.getElementById("subj").addEventListener("input", render);
document.getElementById("titleTxt").addEventListener("input", render);
render();
</script>
</body>
</html>`;
}

export const OttLevelL1L30Tool: React.FC<OttLevelL1L30ToolProps> = ({
  initialSubject = "Veer Hanuman & Maryada Purushottam Shri Ram",
  onSendToForge,
  onNotify,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(30);
  const [autoSelectLogic, setAutoSelectLogic] = useState<boolean>(true);
  const [depthMode, setDepthMode] = useState<DimensionDepthMode>("4D");
  const [aspectRatio, setAspectRatio] = useState<OttAspectRatio>("16:9");
  const [subject, setSubject] = useState<string>(initialSubject);
  const [moodInput, setMoodInput] = useState<string>("Heroic Volumetric / Divine Tejas");
  const [goldTitle, setGoldTitle] = useState<string>("SHRI RAM BHAKTI");
  const [subtitleHook, setSubtitleHook] = useState<string>(
    "An Eternal Devotional Masterpiece"
  );
  const [variationIndex, setVariationIndex] = useState<number>(0);
  const [tierFilter, setTierFilter] = useState<"ALL" | LevelTierGroup>("ALL");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const autoMatchedProfile = useMemo(
    () => resolveDeityAutoProfile(subject, moodInput),
    [subject, moodInput]
  );

  const autoMatchedCinema = useMemo(
    () =>
      CINEMA_PLATFORM_PROFILES.find((p) => p.id === autoMatchedProfile.cinemaStyle) ||
      CINEMA_PLATFORM_PROFILES[0],
    [autoMatchedProfile.cinemaStyle]
  );

  const handleSubjectOrMoodChange = (nextSubj: string, nextMood: string) => {
    setSubject(nextSubj);
    setMoodInput(nextMood);
    if (autoSelectLogic) {
      const resolved = resolveDeityAutoProfile(nextSubj, nextMood);
      setSelectedLevel(Math.max(18, Math.min(30, resolved.ottLevel)));
      if (resolved.dim === "16:9" || resolved.dim === "9:16" || resolved.dim === "4:5" || resolved.dim === "1:1") {
        setAspectRatio(resolved.dim);
      }
    }
  };

  const handleApplyAutoSelection = () => {
    const resolved = resolveDeityAutoProfile(subject, moodInput);
    const clampedLevel = Math.max(18, Math.min(30, resolved.ottLevel));
    setSelectedLevel(clampedLevel);
    if (resolved.dim === "16:9" || resolved.dim === "9:16" || resolved.dim === "4:5" || resolved.dim === "1:1") {
      setAspectRatio(resolved.dim);
    }
    const cin = CINEMA_PLATFORM_PROFILES.find((p) => p.id === resolved.cinemaStyle);
    onNotify(
      `Auto-Selected L${clampedLevel} · ${resolved.sampler} · ${cin?.shortName || resolved.cinemaStyle}`
    );
  };

  const activeSpec = useMemo(
    () =>
      OTT_LEVELS_L1_L30.find((l) => l.level === selectedLevel) ||
      OTT_LEVELS_L1_L30[OTT_LEVELS_L1_L30.length - 1],
    [selectedLevel]
  );

  const effectiveSampler = autoSelectLogic
    ? autoMatchedProfile.sampler
    : activeSpec.sampler;

  const filteredLevels = useMemo(() => {
    if (tierFilter === "ALL") return OTT_LEVELS_L1_L30;
    return OTT_LEVELS_L1_L30.filter((l) => l.tierGroup === tierFilter);
  }, [tierFilter]);

  const activeScene =
    UNIQUE_VARIATION_SCENES[variationIndex % UNIQUE_VARIATION_SCENES.length];

  const loraTag = useMemo(
    () => getLoraTagForSubject(subject, activeSpec.code),
    [subject, activeSpec.code]
  );

  const singleMasterCodeBlock = useMemo(() => {
    const resolutionText =
      aspectRatio === "16:9"
        ? "16:9 Widescreen 4K / 8K (YouTube / OTT Flagship)"
        : aspectRatio === "9:16"
        ? "9:16 Vertical IMAX (Shorts / Reels)"
        : aspectRatio === "4:5"
        ? "4:5 Portrait Poster (Instagram / Sanctuary Print)"
        : "1:1 Square Sacred Emblem";

    const directorsNote =
      activeSpec.level >= 22
        ? "Christopher Nolan, Hoyte van Hoytema, Roger Deakins"
        : activeSpec.level >= 13
        ? "Christopher Nolan, Hoyte van Hoytema"
        : "IBD Sacred Studio Direction";

    return [
      `IBD MASTER PROMPT BLOCK — ${activeSpec.code}: ${activeSpec.name} (${depthMode} | ${aspectRatio})`,
      ``,
      `[POSITIVE PROMPT]`,
      `${subject.trim()}, ${activeScene}. Mood & Atmosphere: ${moodInput.trim() || autoMatchedProfile.mood}. Network Look: ${autoMatchedCinema.promptInject}. Camera Angle: ${autoMatchedProfile.cameraAngle}. Color Palette: ${autoMatchedProfile.colorPalette.join(", ")}. ${activeSpec.positiveDirectives}. ${DIMENSION_DEPTH_DIRECTIVES[depthMode]}. ${POSTER_OVERLAY_DOCTRINE.textLegibilityScrim} ${POSTER_OVERLAY_DOCTRINE.subtitleRule}`,
      ``,
      `[NEGATIVE PROMPT]`,
      `${activeSpec.negativeAddons}, ghisa-pita repeated composition, identical background pose, lower-third progress bar occlusion, distorted anatomy, asymmetrical eyes, watermark clutter`,
      ``,
      `[CGI BEST PARAMETERS]`,
      `Level: ${activeSpec.code} (${activeSpec.name}) | Tier: ${activeSpec.tierGroup} | Network Look: ${autoMatchedCinema.name}`,
      `Auto-Selection Match: ${autoMatchedProfile.deityName} (${autoMatchedProfile.cameraAngle})`,
      `Color Palette: ${autoMatchedProfile.colorPalette.join(" | ")}`,
      `LoRA: ${loraTag} | LoRA Weight: ${activeSpec.loraWeight} | Face Detailer: ${activeSpec.faceDetailer}`,
      `Sampler: ${effectiveSampler} | Steps: ${activeSpec.steps} | CFG: ${activeSpec.cfg} | Resolution: ${resolutionText}`,
      `Camera: ${activeSpec.camera} | Shutter: ${activeSpec.shutter} | Aperture: ${activeSpec.aperture}`,
      `Directors / DOP Reference: ${directorsNote}`,
      `VFX Stack: Nebula=${activeSpec.vfxProfile.nebula} | God-Ray=${activeSpec.vfxProfile.godRay} | Moog=${activeSpec.vfxProfile.moog} | Gold Dust=${activeSpec.vfxProfile.goldDust} | Mist=${activeSpec.vfxProfile.mist} | Water Reflection=${activeSpec.vfxProfile.waterReflection} | Volumetric=${activeSpec.vfxProfile.volumetric}`,
      ``,
      `[BRANDING & LOGO LOCK]`,
      `- IBD Logo: Placed cleanly at Top-Left`,
      `- Title Lock: "${goldTitle.trim() || subject.toUpperCase()}" at Top-Centre in artistic gold font (keeps clear of YouTube lower-third & progress bar)`,
      `- Subtitle: "${subtitleHook.trim()}" directly under main title in smaller font with gold/white contrast`,
      `- Bottom-Centre Branding: Small subtle white text — "An Indian Bhakti Dhara Production"`,
      `- Safe Margins: Watch Now pill button (bottom-left) and 4K badges (bottom-right) 5% inside screen edges`,
      `- Variation Mandate: ALWAYS UNIQUE VARIATION — NEVER GHISA-PITA (Seed Frame #${variationIndex + 1})`,
    ].join("\n");
  }, [
    activeSpec,
    depthMode,
    aspectRatio,
    subject,
    moodInput,
    goldTitle,
    subtitleHook,
    activeScene,
    loraTag,
    variationIndex,
    effectiveSampler,
    autoMatchedProfile,
    autoMatchedCinema,
  ]);

  const handleCopyBlock = () => {
    navigator.clipboard.writeText(singleMasterCodeBlock);
    setCopiedKey("master_block");
    onNotify(`Copied ${activeSpec.code} (${activeSpec.name}) single code block`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadStandaloneHtml = () => {
    const html = buildStandaloneHtmlDocument();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ibd-l1-l30-master-prompt-tool.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onNotify("Downloaded standalone 1-file L1-L30 Master Prompt Tool (.html)");
  };

  const handleNextVariation = () => {
    setVariationIndex((prev) => (prev + 1) % UNIQUE_VARIATION_SCENES.length);
    onNotify("Rotated unique composition seed (Never Ghisa-Pita)");
  };

  const handleSendLevelToForge = () => {
    if (!onSendToForge) return;
    onSendToForge({
      subject,
      story: `${activeScene}. [${activeSpec.code}: ${activeSpec.name} · ${depthMode} · ${activeSpec.camera} · Shutter ${activeSpec.shutter} · ${activeSpec.aperture} · LoRA ${loraTag} @ ${activeSpec.loraWeight}]`,
      dim: aspectRatio as AspectRatio,
      sampler: activeSpec.sampler,
      version: activeSpec.level >= 19 ? 11 : 10,
    });
    onNotify(`Loaded ${activeSpec.code} (${activeSpec.name}) into V10/V11 Forge`);
  };

  return (
    <div className="space-y-6">
      {/* Control Deck: L1-L30 Slider, 2D/3D/4D Depth, Aspect Ratio & Branding Inputs */}
      <section className="rounded-2xl border border-[#382d1c] bg-[#0b0805] p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#262016] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
              <Crown className="w-4 h-4 text-[#ffd700]" />
              <span>IBD OTT Master Prompt Tool · Levels L1–L30</span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#f4cf6a]">
              L1–L30 Progression, Depth &amp; Branding Lock
            </h2>
            <p className="text-xs text-[#a39274]">
              Top-left IBD logo · Top-centre artistic gold title · Bottom-centre An Indian Bhakti Dhara Production · Always unique variation
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setAutoSelectLogic((prev) => !prev)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border whitespace-nowrap shrink-0 cursor-pointer transition ${
                autoSelectLogic
                  ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-200"
                  : "bg-[#16110a] border-[#382d1c] text-[#a39274]"
              }`}
            >
              Auto-Selection Logic: {autoSelectLogic ? "ON" : "OFF"}
            </button>

            <button
              type="button"
              onClick={handleApplyAutoSelection}
              className="px-3 py-2 rounded-lg bg-[#16110a] hover:bg-[#221a10] border border-[#382d1c] text-xs font-semibold text-emerald-200 whitespace-nowrap shrink-0 cursor-pointer transition"
              title="Re-evaluate subject + mood and lock optimal Sampler, Look, L18-L30, Camera Angle & Palette"
            >
              Auto-Select Optimal
            </button>

            <button
              type="button"
              onClick={handleDownloadStandaloneHtml}
              className="px-3.5 py-2 rounded-lg bg-[#16110a] hover:bg-[#221a10] border border-[#382d1c] text-xs font-semibold text-[#f4cf6a] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition"
              title="Save complete L1-L30 tool as a single offline HTML file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Single File (.html)</span>
            </button>

            {onSendToForge && (
              <button
                type="button"
                onClick={handleSendLevelToForge}
                className="px-4 py-2 rounded-lg bg-[#d4af37] hover:bg-[#f4cf6a] text-black font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send {activeSpec.code} to Forge</span>
              </button>
            )}
          </div>
        </div>

        {/* Inputs Row: Subject, Mood Cue, Top-Centre Gold Title, Subtitle Hook, Unique Variation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-[#c7b9a5]">
              Deity / Couple Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => handleSubjectOrMoodChange(e.target.value, moodInput)}
              placeholder="e.g. Veer Hanuman & Shri Ram"
              className="w-full bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-[#c7b9a5]">
              Mood &amp; Atmosphere
            </label>
            <input
              type="text"
              value={moodInput}
              onChange={(e) => handleSubjectOrMoodChange(subject, e.target.value)}
              placeholder="e.g. Fierce Rudra / Romantic Prem"
              className="w-full bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-[#c7b9a5]">
              Top-Centre Gold Title
            </label>
            <input
              type="text"
              value={goldTitle}
              onChange={(e) => setGoldTitle(e.target.value)}
              placeholder="e.g. SHRI RAM BHAKTI"
              className="w-full bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-[#c7b9a5]">
              Subtitle (Gold/White Under Title)
            </label>
            <input
              type="text"
              value={subtitleHook}
              onChange={(e) => setSubtitleHook(e.target.value)}
              placeholder="Subtitle hook..."
              className="w-full bg-[#060403] border border-[#262016] focus:border-[#d4af37] rounded-lg px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div className="space-y-1 flex flex-col justify-end">
            <button
              type="button"
              onClick={handleNextVariation}
              className="w-full px-3.5 py-2 rounded-lg bg-[#16110a] hover:bg-[#241b10] border border-[#382d1c] text-xs font-semibold text-[#f4cf6a] inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer transition"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Unique Variation (#{variationIndex + 1})</span>
            </button>
          </div>
        </div>

        {/* Auto-Selection & Decision Logic Summary + Copy Rule */}
        <div className="rounded-xl border border-[#262016] bg-[#070503] p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-mono text-[11px] font-bold text-emerald-300">
              {AUTO_SELECTION_DECISION_LOGIC.title} · Active Match: {autoMatchedProfile.shortLabel}
            </div>
            <div className="text-[#c7b9a5] leading-relaxed">
              Look: <strong className="text-white">{autoMatchedCinema.shortName}</strong> · Level:{" "}
              <strong className="text-[#ffd700]">{activeSpec.code}</strong> · Sampler:{" "}
              <strong className="text-purple-200">{effectiveSampler}</strong> · Angle:{" "}
              <strong className="text-cyan-200">{autoMatchedProfile.cameraAngle}</strong>
            </div>
            <div className="text-[11px] font-mono text-[#8c7a5c]">
              Palette: {autoMatchedProfile.colorPalette.join(" · ")}
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(AUTO_SELECTION_DECISION_LOGIC.rule);
              setCopiedKey("auto_logic_rule");
              onNotify("Copied Auto-Selection & Decision Logic rule");
              setTimeout(() => setCopiedKey(null), 2000);
            }}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#16110a] hover:bg-[#221a10] border border-[#382d1c] text-[#f4cf6a] font-semibold text-[11px] inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition"
          >
            {copiedKey === "auto_logic_rule" ? (
              <>
                <Check className="w-3 h-3" />
                <span>Copied Rule</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Memory Rule</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive L1-L30 Slider + Anchor Steps */}
        <div className="rounded-xl border border-[#262016] bg-[#070503] p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <Sliders className="w-4 h-4 text-[#ffd700] shrink-0" />
              <span className="font-mono text-sm font-bold text-[#ffd700] tabular-nums">
                {activeSpec.code}
              </span>
              <span className="text-sm font-semibold text-white">{activeSpec.name}</span>
              <span className="text-xs text-[#8c7a5c]">· {activeSpec.tierGroup}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              {selectedLevel < 18 ? (
                <span className="text-amber-300 inline-flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Below L18 Minimum Standard</span>
                </span>
              ) : (
                <span className="text-emerald-300">
                  {selectedLevel === 30
                    ? "L30 Infinity / God Level Max"
                    : selectedLevel === 18
                    ? "L18 Minimum Release Standard"
                    : "Meets L18+ Release Standard"}
                </span>
              )}
            </div>
          </div>

          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            aria-label="OTT Level L1 to L30"
            className="w-full accent-[#d4af37] cursor-pointer h-2"
          />

          {/* Anchor Level Jump Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {ANCHOR_LEVELS.map((lvl) => {
              const spec = OTT_LEVELS_L1_L30.find((l) => l.level === lvl);
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono tabular-nums border transition whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-[#d4af37] text-black border-[#ffd700] font-bold"
                      : "bg-[#120e09] hover:bg-[#1c160e] text-[#c7b9a5] border-[#2b2116]"
                  }`}
                  title={spec ? `${spec.code}: ${spec.name}` : `L${lvl}`}
                >
                  L{lvl}
                  {lvl === 18 ? " Min" : lvl === 30 ? " God Max" : ""}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#c7b9a5]">{activeSpec.summary}</p>
        </div>

        {/* Depth (2D / 3D / 4D) + Aspect Ratio (16:9 / 9:16 / 4:5 / 1:1) Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="block text-[11px] font-mono text-[#d4af37]">
              Depth Layering Mode (2D / 3D / 4D)
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["2D", "3D", "4D"] as DimensionDepthMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDepthMode(mode)}
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-bold border transition whitespace-nowrap cursor-pointer ${
                    depthMode === mode
                      ? "bg-[#d4af37] text-black border-[#ffd700]"
                      : "bg-[#120e09] hover:bg-[#1d160e] text-[#c7b9a5] border-[#2b2116]"
                  }`}
                >
                  {mode} {mode === "4D" ? "Kinetic" : mode === "3D" ? "Depth" : "Layer"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="block text-[11px] font-mono text-[#d4af37]">
              Aspect Ratio Picker (16:9 / 9:16 / 4:5 / 1:1)
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  { id: "16:9", label: "16:9 YT" },
                  { id: "9:16", label: "9:16 Reels" },
                  { id: "4:5", label: "4:5 Print" },
                  { id: "1:1", label: "1:1 Square" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAspectRatio(item.id)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-mono font-bold border transition whitespace-nowrap cursor-pointer ${
                    aspectRatio === item.id
                      ? "bg-[#d4af37] text-black border-[#ffd700]"
                      : "bg-[#120e09] hover:bg-[#1d160e] text-[#c7b9a5] border-[#2b2116]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Level Technical Parameter Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs font-mono border-t border-[#262016] pt-4">
          <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5">
            <span className="block text-[10px] text-[#8c7a5c]">Sampler</span>
            <span className="text-white font-semibold truncate block">{activeSpec.sampler}</span>
          </div>
          <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 tabular-nums">
            <span className="block text-[10px] text-[#8c7a5c]">Steps / CFG</span>
            <span className="text-[#f4cf6a] font-semibold">
              {activeSpec.steps} · {activeSpec.cfg}
            </span>
          </div>
          <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 tabular-nums">
            <span className="block text-[10px] text-[#8c7a5c]">LoRA Weight</span>
            <span className="text-emerald-300 font-semibold">{activeSpec.loraWeight}</span>
          </div>
          <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5 tabular-nums">
            <span className="block text-[10px] text-[#8c7a5c]">Shutter / f-Stop</span>
            <span className="text-cyan-200 font-semibold">
              {activeSpec.shutter} · {activeSpec.aperture.split(" ")[0]}
            </span>
          </div>
          <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5">
            <span className="block text-[10px] text-[#8c7a5c]">Face Detailer</span>
            <span className="text-amber-200 font-semibold">{activeSpec.faceDetailer}</span>
          </div>
          <div className="rounded-lg bg-[#070503] border border-[#262016] p-2.5">
            <span className="block text-[10px] text-[#8c7a5c]">God-Ray / Nebula</span>
            <span className="text-purple-200 font-semibold truncate block">
              {activeSpec.vfxProfile.godRay} · {activeSpec.vfxProfile.nebula}
            </span>
          </div>
        </div>

        {/* Single Master Code Block Output */}
        <div className="rounded-xl border border-[#382d1c] bg-[#060403] p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-mono text-[#f4cf6a]">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              <span>Single Code Block ({activeSpec.code} Positive + Negative + CGI + Branding Lock)</span>
            </div>
            <button
              type="button"
              onClick={handleCopyBlock}
              className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#f4cf6a] text-black font-bold text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition"
            >
              {copiedKey === "master_block" ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Block</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code Block</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs font-mono text-[#ebe1cf] whitespace-pre-wrap leading-relaxed overflow-x-auto select-all">
            {singleMasterCodeBlock}
          </pre>
        </div>
      </section>

      {/* Block Containing All Sections: Level 1 to Level 30 */}
      <section className="rounded-2xl border border-[#262016] bg-[#0b0805] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-[#f4cf6a] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#ffd700]" />
              <span>All Sections: Level 1 to Level 30 (L1–L30 Complete Progression)</span>
            </h3>
            <p className="text-xs text-[#8c7a5c]">
              Click any level from L1 to L30 to load its steps, LoRA weight, camera rig, and VFX profile into the prompt generator above.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {TIER_FILTERS.map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setTierFilter(tier)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition whitespace-nowrap shrink-0 cursor-pointer ${
                  tierFilter === tier
                    ? "bg-[#d4af37] text-black border-[#ffd700]"
                    : "bg-[#120e09] text-[#a39274] border-[#262016] hover:border-[#382d1c]"
                }`}
              >
                {tier === "ALL" ? "All 30 Levels" : tier}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#262016]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#14100a] border-b border-[#262016] text-[11px] font-mono text-[#d4af37]">
                <th className="py-3 px-4 whitespace-nowrap">Level</th>
                <th className="py-3 px-3">Name &amp; Standard</th>
                <th className="py-3 px-3 whitespace-nowrap">Sampler · Steps · CFG</th>
                <th className="py-3 px-3 whitespace-nowrap">LoRA · Face</th>
                <th className="py-3 px-4">Camera &amp; VFX Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1910]">
              {filteredLevels.map((lvl) => {
                const isActive = lvl.level === selectedLevel;
                return (
                  <tr
                    key={lvl.code}
                    onClick={() => setSelectedLevel(lvl.level)}
                    className={`cursor-pointer transition-colors ${
                      isActive
                        ? "bg-amber-950/40 hover:bg-amber-950/50"
                        : "bg-[#090704] hover:bg-[#14100b]"
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold tabular-nums whitespace-nowrap">
                      <span className={isActive ? "text-[#ffd700]" : "text-[#d4af37]"}>
                        {lvl.code}
                      </span>
                      {lvl.isMinimumStandard && (
                        <span className="block text-[10px] font-normal text-amber-300">
                          Min Std
                        </span>
                      )}
                      {lvl.level === 30 && (
                        <span className="block text-[10px] font-normal text-emerald-300">
                          God Max
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{lvl.name}</div>
                      <div className="text-[11px] text-[#a39274]">{lvl.summary}</div>
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums whitespace-nowrap text-[#e5e0d5]">
                      <div>{lvl.sampler}</div>
                      <div className="text-[11px] text-[#8c7a5c]">
                        Steps {lvl.steps} · CFG {lvl.cfg}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums whitespace-nowrap">
                      <div className="text-emerald-300">Weight {lvl.loraWeight}</div>
                      <div className="text-[11px] text-[#c7b9a5]">{lvl.faceDetailer}</div>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-[#c7b9a5]">
                      <div className="text-[#f4cf6a] flex items-center gap-1">
                        <Camera className="w-3 h-3 shrink-0 text-[#8c7a5c]" />
                        <span>
                          {lvl.camera} · {lvl.shutter} · {lvl.aperture}
                        </span>
                      </div>
                      <div className="text-[#8c7a5c] mt-0.5">
                        Nebula: {lvl.vfxProfile.nebula} · God-Ray: {lvl.vfxProfile.godRay} · Moog:{" "}
                        {lvl.vfxProfile.moog} · Dust: {lvl.vfxProfile.goldDust} · Mist:{" "}
                        {lvl.vfxProfile.mist} · Reflection: {lvl.vfxProfile.waterReflection}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
