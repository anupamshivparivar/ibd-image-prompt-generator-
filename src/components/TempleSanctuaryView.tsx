import React, { useState } from "react";
import {
  Landmark,
  Sparkles,
  Copy,
  Check,
  Compass,
  Flame,
  Camera,
  Layers,
  ChevronRight,
  Eye,
  BookOpen,
  Volume2,
  Share2,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Music,
  CheckCircle2,
  Film,
  Smartphone,
  Download,
  Code
} from "lucide-react";
import { TEMPLE_SANCTUARIES, TempleSanctuary, TemplePilgrimageStep } from "../data/templeSanctuaryData";
import { generateMobileHtmlApp } from "../utils/generateMobileHtml";

interface TempleSanctuaryViewProps {
  onNotify?: (message: string) => void;
}

export const TempleSanctuaryView: React.FC<TempleSanctuaryViewProps> = ({ onNotify }) => {
  const [selectedTempleId, setSelectedTempleId] = useState<string>("shiv-mahamandir");
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [copiedDeck, setCopiedDeck] = useState<boolean>(false);
  const [copiedMobileHtml, setCopiedMobileHtml] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [generationMode, setGenerationMode] = useState<"image" | "video">("image");
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);

  const currentTemple = TEMPLE_SANCTUARIES.find((t) => t.id === selectedTempleId) || TEMPLE_SANCTUARIES[0];
  const activeStep = currentTemple.steps.find((s) => s.stepNumber === activeStepNumber) || currentTemple.steps[0];

  const handleCopy = (text: string, stepNum?: number) => {
    navigator.clipboard.writeText(text);
    if (stepNum !== undefined) {
      setCopiedStep(stepNum);
      setTimeout(() => setCopiedStep(null), 2000);
    } else {
      setCopiedDeck(true);
      setTimeout(() => setCopiedDeck(false), 2000);
    }
    if (onNotify) {
      onNotify("Copied to clipboard!");
    }
  };

  const downloadMobileHtmlFile = () => {
    const html = generateMobileHtmlApp();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ibd-temple-sanctuary-mobile.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotify) {
      onNotify("Mobile HTML app downloaded! Open it in Chrome / Safari on any phone.");
    }
  };

  const copyMobileHtmlCode = () => {
    const html = generateMobileHtmlApp();
    navigator.clipboard.writeText(html);
    setCopiedMobileHtml(true);
    setTimeout(() => setCopiedMobileHtml(false), 2500);
    if (onNotify) {
      onNotify("Full Mobile HTML Code copied to clipboard!");
    }
  };

  const copyFullDeck = () => {
    const fullText = `=== ${currentTemple.name.toUpperCase()} (${currentTemple.hindiName}) ===
SOVEREIGN 10-STEP PILGRIMAGE DIRECTIVE (ENTRY TO EXIT)
Architectural Style: ${currentTemple.architecturalStyle}
Color Palette: ${currentTemple.colorPalette}
Brand Tag: ${currentTemple.brandTag}
Signature: ${currentTemple.signatureFeature}

${currentTemple.steps
  .map(
    (step) => `[STEP ${step.stepNumber}/10: ${step.stageName.toUpperCase()} - ${step.stageHindi}]
Location: ${step.locationArea}
Ritual Significance: ${step.ritualSignificance}
Camera/Optics: ${step.cameraLens}
Lighting Physics: ${step.lightingDramaturgy}
Atmosphere: ${step.sensoryAtmosphere}
Chant/Shloka: ${step.shlokaOrChant}
Devotee State: ${step.devoteeExperience}

MASTER MIDJOURNEY / FLUX PROMPT:
${step.masterPrompt}
`
  )
  .join("\n------------------------------------------------------------\n\n")}`;

    handleCopy(fullText);
  };

  const filteredTemples = TEMPLE_SANCTUARIES.filter((temple) => {
    if (selectedFilter === "ALL") return true;
    if (selectedFilter === "IBD") return temple.brandTag === "IBD";
    if (selectedFilter === "ASP") return temple.brandTag === "ASP" || temple.id.includes("shiv") || temple.id.includes("shaktipeeth");
    if (selectedFilter === "RKM") return temple.brandTag === "RKM" || temple.id.includes("hanuman") || temple.id.includes("ram");
    if (selectedFilter === "SHIV") return temple.id.includes("shiv");
    if (selectedFilter === "RAM") return temple.id.includes("ram") || temple.id.includes("janakpur") || temple.id.includes("chitrakoot");
    if (selectedFilter === "HANUMAN") return temple.id.includes("hanuman");
    if (selectedFilter === "KRISHNA") return temple.id.includes("shyam") || temple.id.includes("nathdwara") || temple.id.includes("prem") || temple.id.includes("sanwariya");
    if (selectedFilter === "DEVI") return temple.id.includes("shaktipeeth") || temple.id.includes("janakpur");
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in text-stone-100">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900/90 to-amber-950/80 border border-amber-500/30 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Landmark className="w-3.5 h-3.5 text-amber-400" />
              <span>IBD Sovereign All-Deity Pilgrimage Sanctuary Suite (Shiv • Hanuman • Ram • Krishna • Devi)</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-100 tracking-tight">
              10-Threshold Temple Journey Engine
            </h1>
            <p className="text-stone-300 text-sm md:text-base max-w-3xl leading-relaxed">
              Complete experiential pilgrimage sequence from outer <span className="text-amber-300 font-medium">Mahadwar Arrival</span>, <span className="text-amber-300 font-medium">Shoe Surrender</span>, <span className="text-amber-300 font-medium">Kund Purification</span>, <span className="text-amber-300 font-medium">Sanctum Darshan</span>, <span className="text-amber-300 font-medium">Maha Aarti</span>, to <span className="text-amber-300 font-medium">Sunset Visarjan</span> across India's supreme consecrated Dhams.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadMobileHtmlFile}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              title="Download standalone HTML file that works 100% offline on any phone or browser"
            >
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Download Mobile App (.html)</span>
              <Download className="w-3.5 h-3.5 opacity-70" />
            </button>

            <button
              onClick={() => setShowMobileModal(true)}
              className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <Code className="w-4 h-4 text-amber-400" />
              <span>Mobile Code</span>
            </button>

            <button
              onClick={copyFullDeck}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
            >
              {copiedDeck ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4 text-stone-950" />}
              <span>{copiedDeck ? "Full 10-Step Deck Copied!" : "Copy 10-Step Journey"}</span>
            </button>
          </div>
        </div>

        {/* First-Glance Filter Button Center */}
        <div className="mt-6 bg-stone-950/80 p-3 rounded-2xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] font-mono">
              ⚡ 1-CLICK DHAM CATEGORY ISOLATION
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              {filteredTemples.length} Temples Loaded
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
            {[
              { id: "ALL", label: "🌟 All Holy Dhams" },
              { id: "IBD", label: "🔱 IBD Sanctuary Deck" },
              { id: "ASP", label: "🕉️ ASP Shiva & Shakti" },
              { id: "RKM", label: "🚩 RKM Hanuman & Ram" },
              { id: "SHIV", label: "🔱 Mahadev / Shiv" },
              { id: "RAM", label: "🏹 Ram & Janakpur" },
              { id: "HANUMAN", label: "🚩 Hanuman Garhi" },
              { id: "KRISHNA", label: "🦚 Krishna & Khatu" },
              { id: "DEVI", label: "🌺 Shaktipeeths" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border truncate text-center ${
                  selectedFilter === f.id
                    ? "bg-amber-500 text-stone-950 font-bold border-amber-300 shadow-md shadow-amber-500/30 scale-[1.02] ring-1 ring-amber-300"
                    : "bg-stone-900/60 hover:bg-stone-800 text-stone-300 border-stone-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Temple Selection Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {filteredTemples.map((temple) => {
          const isSelected = temple.id === selectedTempleId;
          return (
            <button
              key={temple.id}
              onClick={() => {
                setSelectedTempleId(temple.id);
                setActiveStepNumber(1);
                setExpandedStep(1);
              }}
              className={`flex flex-col p-3 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400"
                  : "bg-stone-900/40 hover:bg-stone-900/80 border-stone-800/80 text-stone-400 hover:text-stone-200"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? "bg-amber-500 text-stone-950" : "bg-stone-800 text-stone-400"}`}>
                  {temple.brandTag}
                </span>
                <span className="text-[10px] text-stone-500">10 Steps</span>
              </div>
              <div className={`font-serif text-xs font-semibold line-clamp-1 ${isSelected ? "text-amber-200" : "text-stone-300"}`}>
                {temple.name}
              </div>
              <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5 font-sans">
                {temple.hindiName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Temple Overview Card */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentTemple.code}
              </span>
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {currentTemple.region}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-100 mt-1">
              {currentTemple.name} <span className="text-stone-400 text-base font-normal">({currentTemple.hindiName})</span>
            </h2>
            <p className="text-xs md:text-sm text-stone-300 mt-1">
              <span className="text-amber-400 font-medium">Deity:</span> {currentTemple.deity} • <span className="text-amber-400 font-medium">Architecture:</span> {currentTemple.architecturalStyle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs bg-stone-950/80 px-3 py-2 rounded-lg border border-stone-800">
              <span className="text-stone-400 block text-[10px] uppercase">Palette</span>
              <span className="text-stone-200 font-medium">{currentTemple.colorPalette}</span>
            </div>
            <button
              onClick={() => handleCopy(currentTemple.signatureFeature)}
              className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-2 rounded-lg transition-colors border border-stone-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Specs</span>
            </button>
          </div>
        </div>

        {/* 10-Step Timeline Selector Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span className="font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              10-Threshold Devotional Pilgrimage Arc
            </span>
            <span>Step {activeStepNumber} of 10</span>
          </div>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5">
            {currentTemple.steps.map((step) => {
              const isCurrent = step.stepNumber === activeStepNumber;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => {
                    setActiveStepNumber(step.stepNumber);
                    setExpandedStep(step.stepNumber);
                  }}
                  className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    isCurrent
                      ? "bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/25 scale-105"
                      : "bg-stone-950/60 hover:bg-stone-800 border-stone-800 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <span className={`text-[10px] ${isCurrent ? "text-stone-950 font-black" : "text-amber-400 font-bold"}`}>
                    0{step.stepNumber}
                  </span>
                  <span className="text-[10px] line-clamp-1 mt-0.5 leading-tight">
                    {step.stageName.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Step Spotlight Hero View */}
      <div className="bg-gradient-to-b from-stone-900/90 to-stone-950 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Step Header */}
        <div className="bg-stone-900/90 border-b border-stone-800 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-lg shrink-0">
              {activeStep.stepNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Threshold Stage {activeStep.stepNumber} of 10
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-xs text-stone-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {activeStep.locationArea}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-100 mt-0.5">
                {activeStep.stageName} <span className="text-stone-400 text-base font-normal">({activeStep.stageHindi})</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activeStep.masterPrompt, activeStep.stepNumber)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              {copiedStep === activeStep.stepNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedStep === activeStep.stepNumber ? "Copied Prompt!" : "Copy Step Prompt"}</span>
            </button>
          </div>
        </div>

        {/* Step Deep Dive Details */}
        <div className="p-5 md:p-6 space-y-6">
          {/* Shloka & Experience Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Music className="w-3.5 h-3.5" />
                <span>Sacred Vedic Shloka / Chant</span>
              </div>
              <p className="font-serif text-amber-100 text-sm md:text-base font-medium italic">
                "{activeStep.shlokaOrChant}"
              </p>
              <p className="text-xs text-stone-300">
                <span className="text-amber-400/90 font-medium">Ritual:</span> {activeStep.ritualSignificance}
              </p>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 rounded-xl p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300 uppercase tracking-wider">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Inner Devotee Experience</span>
              </div>
              <p className="text-xs md:text-sm text-stone-200 leading-relaxed">
                {activeStep.devoteeExperience}
              </p>
              <div className="text-xs text-stone-400 flex items-center gap-1 pt-1">
                <Volume2 className="w-3 h-3 text-amber-400" />
                <span className="line-clamp-1">{activeStep.sensoryAtmosphere}</span>
              </div>
            </div>
          </div>

          {/* Master Midjourney / Flux Prompt Card */}
          <div className="bg-stone-950 border border-amber-500/20 rounded-xl p-4 md:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono">
                  Master Generation Prompt (Midjourney v6.1 / Flux 1.1 Pro)
                </span>
              </div>
              <span className="text-[10px] text-stone-500 font-mono">ARRI Alexa LF 65mm • 9:16</span>
            </div>

            <div className="bg-stone-900/90 rounded-lg p-3.5 text-stone-200 text-xs md:text-sm font-mono leading-relaxed border border-stone-800 select-all">
              {activeStep.masterPrompt}
            </div>

            {/* Technical Specs Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2 bg-stone-900/40 p-2 rounded border border-stone-800/80">
                <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-stone-400">Optics:</span>
                <span className="text-stone-200 font-medium truncate">{activeStep.cameraLens}</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/40 p-2 rounded border border-stone-800/80">
                <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-stone-400">Lighting:</span>
                <span className="text-stone-200 font-medium truncate">{activeStep.lightingDramaturgy}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={activeStepNumber === 1}
              onClick={() => {
                setActiveStepNumber((prev) => Math.max(1, prev - 1));
                setExpandedStep((prev) => (prev ? Math.max(1, prev - 1) : 1));
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                activeStepNumber === 1
                  ? "opacity-40 cursor-not-allowed border-stone-800 text-stone-600"
                  : "bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700"
              }`}
            >
              ← Previous Step
            </button>

            <span className="text-xs text-stone-400 font-medium">
              Threshold {activeStepNumber} / 10
            </span>

            <button
              disabled={activeStepNumber === 10}
              onClick={() => {
                setActiveStepNumber((prev) => Math.min(10, prev + 1));
                setExpandedStep((prev) => (prev ? Math.min(10, prev + 1) : 10));
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeStepNumber === 10
                  ? "opacity-40 cursor-not-allowed border-stone-800 text-stone-600"
                  : "bg-amber-500 hover:bg-amber-400 text-stone-950 border-amber-400 shadow-md"
              }`}
            >
              Next Step ({activeStepNumber < 10 ? currentTemple.steps[activeStepNumber].stageName.split(" ")[0] : "End"}) →
            </button>
          </div>
        </div>
      </div>

      {/* Accordion View of All 10 Steps */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-serif font-bold text-amber-200">
              Complete 10-Threshold Pilgrimage Manifest ({currentTemple.name})
            </h3>
          </div>
          <button
            onClick={copyFullDeck}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All 10 Prompts</span>
          </button>
        </div>

        <div className="space-y-2">
          {currentTemple.steps.map((step) => {
            const isExpanded = expandedStep === step.stepNumber;
            return (
              <div
                key={step.stepNumber}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isExpanded
                    ? "bg-stone-900/90 border-amber-500/40 shadow-lg"
                    : "bg-stone-950/40 hover:bg-stone-950/80 border-stone-800/60"
                }`}
              >
                <div
                  onClick={() => {
                    setExpandedStep(isExpanded ? null : step.stepNumber);
                    setActiveStepNumber(step.stepNumber);
                  }}
                  className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center">
                      0{step.stepNumber}
                    </span>
                    <div>
                      <div className="text-xs md:text-sm font-semibold text-stone-200 flex items-center gap-2">
                        <span>{step.stageName}</span>
                        <span className="text-stone-400 text-xs font-normal">({step.stageHindi})</span>
                      </div>
                      <div className="text-[11px] text-stone-400 line-clamp-1">
                        {step.locationArea} • {step.ritualSignificance}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(step.masterPrompt, step.stepNumber);
                      }}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 transition-colors"
                      title="Copy Step Prompt"
                    >
                      {copiedStep === step.stepNumber ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-stone-800/80 space-y-3 text-xs">
                    <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 font-mono text-stone-300 select-all leading-relaxed">
                      {step.masterPrompt}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                      <span><strong className="text-amber-400">Shloka:</strong> {step.shlokaOrChant}</span>
                      <span><strong className="text-amber-400">Atmosphere:</strong> {step.sensoryAtmosphere}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Standalone Mobile HTML Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full p-5 md:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-serif font-bold text-amber-100 text-base">
                    📱 Standalone Mobile HTML App (100% Offline)
                  </h3>
                  <p className="text-xs text-stone-400">
                    Self-contained single file with all 10 holy Dhams, 100 threshold prompts & touch UI.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMobileModal(false)}
                className="text-stone-400 hover:text-stone-100 p-1.5 rounded-lg bg-stone-800 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>How to use on your Phone:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-stone-300 text-[11px]">
                  <li>Click <strong>Download .html</strong> below or copy the code.</li>
                  <li>Transfer or save the file <code className="text-amber-400 bg-stone-900 px-1 py-0.5 rounded">ibd-temple-sanctuary-mobile.html</code> on your Android or iPhone files.</li>
                  <li>Tap the file to open directly in <strong>Chrome, Safari, or Brave</strong> — no server or internet needed!</li>
                  <li>You can add it to your home screen as a Web App (PWA).</li>
                </ol>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={downloadMobileHtmlFile}
                  className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .html File Now</span>
                </button>
                <button
                  onClick={copyMobileHtmlCode}
                  className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-amber-200 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {copiedMobileHtml ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedMobileHtml ? "HTML Code Copied!" : "Copy Full HTML Source"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
