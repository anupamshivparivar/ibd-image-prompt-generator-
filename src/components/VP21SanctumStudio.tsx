import React, { useState } from "react";
import { AspectRatio, TargetEngine } from "../types";
import {
  Flame,
  Camera,
  Shield,
  Sparkles,
  Copy,
  Check,
  Zap,
  Sliders,
  Layers,
  Eye,
  Film,
  Sun,
  Crown,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

interface VP21SanctumStudioProps {
  customApiKey?: string;
  showToast: (msg: string) => void;
  onSendToForge?: (customReq: {
    subject: string;
    story: string;
    version: number;
    dim: AspectRatio;
  }) => void;
}

const CANONICAL_SUBJECTS = [
  { id: "RK", code: "RK", name: "Radha–Krishna", description: "Vrindavan Sanctum with Kadamba floral shringar, bansuri, divine Drishti" },
  { id: "RS", code: "RS", name: "Rama–Sita", description: "Ayodhya Garbhagriha, Maryada Purushottam bow, golden crown, lotus offerings" },
  { id: "VL", code: "VL", name: "Vishnu–Lakshmi", description: "Vaikuntha Sheshanaga sanctum, golden Kaustubha jewel, Shankha-Chakra" },
  { id: "SP", code: "SP", name: "Shiva–Parvati", description: "Kailash/Kashi basalt lingam & parivar darshan, crescent moon, bilva leaves" },
  { id: "HP", code: "HP", name: "Hanuman Parivar", description: "Saffron sanctum, folded palms in eternal bhakti, golden gada, sindoor shringar" },
  { id: "SHIV", code: "SHIV", name: "Mahadev Solo", description: "Deep Garbhagriha Jyotirlinga, 1800K brass diya rim-light, tripundra vibhuti" },
  { id: "DURGA", code: "DURGA", name: "Maa Durga", description: "Simhavahini Ashtabhuja sanctum, crimson banarasi silk, golden ayudhas" },
  { id: "GANESH", code: "GANESH", name: "Vighnaharta Ganesha", description: "Ashta-Vinayaka sanctum, modak offerings, marigold garlands, sacred Mushak" },
];

const SANCTUM_MOMENTS = [
  {
    id: "silent-pre-aarti",
    title: "1. Silent Pre-Aarti Darshan",
    description: "Quiet temple chamber before bells ring; flickering ghee lamps illuminating dewy stone carvings.",
  },
  {
    id: "diya-illumination",
    title: "2. Deity Illuminated by Practical Diya Light",
    description: "1800K hand-beaten brass multi-tier deepams casting warm specular highlights on 24k gold ornaments.",
  },
  {
    id: "threshold-arrival",
    title: "3. Temple Threshold Arrival",
    description: "Looking through the ancient carved basalt Garbhagriha doorway as sacred camphor fragrance billows.",
  },
  {
    id: "post-prayer-stillness",
    title: "4. Quiet Post-Prayer Stillness",
    description: "The absolute silence following the Maha-Aarti, embers glowing gently in the sanctum darkness.",
  },
  {
    id: "devotee-perspective",
    title: "5. Devotee-Height Sanctum Perspective",
    description: "Eye-level human angle looking up in profound reverence and surrender at the consecrated murti.",
  },
  {
    id: "ritual-preparation",
    title: "6. Sacred Ritual Preparation",
    description: "Priest hands gently placing fresh chandan sandalwood paste, bilva patra, and dewy mogra strings.",
  },
  {
    id: "couple-darshan",
    title: "7. Couple / Family Darshan in Sanctum",
    description: "Dignified divine presence seated or standing side-by-side upon carved marble lotus throne.",
  },
];

const CAMERA_LENSES = [
  { id: "85mm", label: "85mm Portrait (f/1.4)", desc: "Intimate Darshan, deep bokeh, focal lock on Drishti eyes" },
  { id: "50mm", label: "50mm Natural (f/1.8)", desc: "Balanced human eye perspective, subject + sanctum harmony" },
  { id: "35mm", label: "35mm Architectural (f/2.8)", desc: "Garbhagriha depth, carved monolithic basalt pillars, temple floor" },
];

export const VP21SanctumStudio: React.FC<VP21SanctumStudioProps> = ({
  customApiKey,
  showToast,
  onSendToForge,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(CANONICAL_SUBJECTS[0]);
  const [selectedMoment, setSelectedMoment] = useState(SANCTUM_MOMENTS[1]);
  const [selectedLens, setSelectedLens] = useState(CAMERA_LENSES[0]);
  const [selectedVASlot, setSelectedVASlot] = useState("VA09");
  const [selectedBrand, setSelectedBrand] = useState<"IBD" | "ASP" | "RKM">("IBD");
  const [selectedRatio, setSelectedRatio] = useState<AspectRatio>("9:16");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Command string preview
  const commandString = `${selectedSubject.code} + VP21 + ${selectedVASlot} + ${selectedBrand} + ${selectedRatio} + Q10`;

  // Master Prompt Generator
  const generateMasterPrompt = () => {
    return `Cinematic master VP21 Temple Sanctum Darshan of ${selectedSubject.name}, ${selectedMoment.title}: ${selectedMoment.description}. Inside an authentic ancient Indian black basalt Garbhagriha, 100% motivated physical light from hand-beaten multi-tiered brass ghee diyas (1800K color temperature), subtle photographic Swayam-Jyoti integrated seamlessly into the consecrated murti without artificial halos. Consecrated ${selectedSubject.name} adorned in authentic hand-loomed Banarasi silks, 24k temple gold jewellery with uncut emeralds, fresh botanical dewy lotus and fragrant jasmine garlands. Sacred Drishti eye-contact directly engaging the viewer with transcendent peace and Atman-reflection. Captured on ARRI Alexa LF with ${selectedLens.label}, natural optical highlight roll-off, Planck-scale porous basalt stone textures, authentic brass patina, floating consecrated dhoop incense haze catching warm amber godrays, clean cinematic master artwork without visible text, watermark or UI elements. --ar ${selectedRatio} --style raw --v 6.1 --q 2 --c 0`;
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const currentPrompt = generateMasterPrompt();

  return (
    <div className="flex flex-col gap-8">
      {/* VP21 Sovereign Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c0806] via-[#290e0b] to-[#120403] border border-[#ff4d4d]/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff3b30]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white px-3 py-0.5 rounded-full text-[11px] font-black tracking-widest uppercase font-mono-code shadow-md">
                VP21 TEMPLE SANCTUM
              </span>
              <span className="bg-[#2a0d0d] text-[#ff9999] border border-[#521b1b] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                STANDALONE WORKING SPECIFICATION
              </span>
              <span className="bg-[#1c0806] text-[#ffd700] border border-[#ffd700]/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                Q10 ULTIMATE MASTERPIECE
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-[#fff0f0] tracking-wide">
              Garbhagriha Realism • 1800K Diya Physics • Atman Drishti Gaze
            </h2>
            <p className="text-xs md:text-sm text-[#e6b8b8] max-w-3xl mt-1.5 leading-relaxed">
              VP21 establishes the master visual grammar of authentic Indian temple sanctums. 100% motivated practical ghee diya lighting, black basalt stone porosity, sacred Drishti focal anchor, and independent VA01–VA30 non-repetitive shot variation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                copyToClipboard(
                  commandString,
                  "cmd-header",
                  "Official VP21 Command"
                )
              }
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#2b0c0c] hover:bg-[#3d1212] border border-[#ff4d4d]/50 text-xs font-bold text-[#ffb3b3] transition-all cursor-pointer"
            >
              {copiedKey === "cmd-header" ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-[#ff4d4d]" />
              )}
              <span>Copy Working Command</span>
            </button>
          </div>
        </div>

        {/* Working Command Syntax Bar */}
        <div className="mt-6 pt-5 border-t border-[#3d1414] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#ff8080]">
            <span className="font-bold uppercase tracking-wider text-[#ffd700]">Official Command:</span>
            <span className="bg-[#0e0303] px-3 py-1.5 rounded-lg border border-[#ff4d4d]/40 text-[#ffccd8] font-bold">
              {commandString}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-[#b38080] font-bold uppercase">Quick Canonical Presets:</span>
            {[
              { label: "RK VP21 (Radha Krishna)", sub: CANONICAL_SUBJECTS[0], va: "VA09", brand: "IBD" as const },
              { label: "RS VP21 (Rama Sita)", sub: CANONICAL_SUBJECTS[1], va: "VA14", brand: "ASP" as const },
              { label: "VL VP21 (Vishnu Lakshmi)", sub: CANONICAL_SUBJECTS[2], va: "VA22", brand: "IBD" as const },
              { label: "SP VP21 (Shiv Parvati)", sub: CANONICAL_SUBJECTS[3], va: "VA05", brand: "ASP" as const },
              { label: "HP VP21 (Hanuman)", sub: CANONICAL_SUBJECTS[4], va: "VA18", brand: "RKM" as const },
            ].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedSubject(preset.sub);
                  setSelectedVASlot(preset.va);
                  setSelectedBrand(preset.brand);
                  showToast(`Loaded ${preset.label}`);
                }}
                className="px-2.5 py-1 rounded-md bg-[#240808] hover:bg-[#380e0e] border border-[#ff4d4d]/30 text-[10px] font-mono-code text-[#ffccd8] transition-colors cursor-pointer"
              >
                {preset.sub.code} + {preset.va}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Parameters (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 1. Canonical Subject */}
          <div className="bg-[#120404] border border-[#2d0f0f] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <span className="text-xs font-bold text-[#ff9999] uppercase tracking-wider flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-[#ff4d4d]" />
              1. Canonical Deity / Couple Selection
            </span>

            <div className="grid grid-cols-2 gap-2">
              {CANONICAL_SUBJECTS.map((sub) => {
                const isSelected = selectedSubject.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#ff416c]/30 to-[#380e0e] border-[#ff4d4d] text-white shadow-md font-bold"
                        : "bg-[#1a0707] border-[#2d0f0f] text-[#c78f8f] hover:text-white hover:bg-[#240a0a]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{sub.name}</span>
                      <span className="text-[9px] font-mono-code bg-[#0a0202] text-[#ff8080] px-1.5 py-0.5 rounded">
                        {sub.code}
                      </span>
                    </div>
                    <div className="text-[9px] text-[#9e6b6b] truncate mt-0.5">
                      {sub.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sanctum Narrative Moment */}
          <div className="bg-[#120404] border border-[#2d0f0f] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <span className="text-xs font-bold text-[#ff9999] uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#ff4d4d]" />
              2. Sacred Temple Sanctum Story Moment
            </span>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {SANCTUM_MOMENTS.map((moment) => {
                const isSelected = selectedMoment.id === moment.id;
                return (
                  <button
                    key={moment.id}
                    type="button"
                    onClick={() => setSelectedMoment(moment)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#ff416c]/30 to-[#380e0e] border-[#ff4d4d] text-white shadow-md font-bold"
                        : "bg-[#1a0707] border-[#2d0f0f] text-[#c78f8f] hover:text-white hover:bg-[#240a0a]"
                    }`}
                  >
                    <div className="text-xs text-[#ffccd8]">{moment.title}</div>
                    <div className="text-[10px] text-[#9e6b6b] mt-0.5">
                      {moment.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Cinematography Lens & Variation */}
          <div className="bg-[#120404] border border-[#2d0f0f] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <span className="text-xs font-bold text-[#ff9999] uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#ff4d4d]" />
              3. Cinema Optics & Variation Layer
            </span>

            <div className="flex flex-col gap-2">
              {CAMERA_LENSES.map((lens) => (
                <button
                  key={lens.id}
                  type="button"
                  onClick={() => setSelectedLens(lens)}
                  className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                    selectedLens.id === lens.id
                      ? "bg-[#290d0d] border-[#ff4d4d] text-white font-bold"
                      : "bg-[#1a0707] border-[#2d0f0f] text-[#c78f8f] hover:bg-[#240a0a]"
                  }`}
                >
                  <div className="text-xs text-[#ffccd8]">{lens.label}</div>
                  <div className="text-[10px] text-[#9e6b6b]">{lens.desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="text-[10px] text-[#b38080] font-bold block mb-1">
                  VA Variation Slot (VA01–VA30)
                </label>
                <select
                  value={selectedVASlot}
                  onChange={(e) => setSelectedVASlot(e.target.value)}
                  className="w-full bg-[#1a0707] border border-[#2d0f0f] rounded-xl p-2 text-xs text-[#ffccd8]"
                >
                  {Array.from({ length: 30 }, (_, i) => {
                    const num = String(i + 1).padStart(2, "0");
                    return (
                      <option key={`VA${num}`} value={`VA${num}`}>
                        VA{num} (Non-Repetitive)
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#b38080] font-bold block mb-1">
                  Platform Aspect Ratio
                </label>
                <select
                  value={selectedRatio}
                  onChange={(e) => setSelectedRatio(e.target.value as AspectRatio)}
                  className="w-full bg-[#1a0707] border border-[#2d0f0f] rounded-xl p-2 text-xs text-[#ffccd8]"
                >
                  <option value="9:16">9:16 (YTS / Reels Native)</option>
                  <option value="4:5">4:5 (Instagram Feed)</option>
                  <option value="16:9">16:9 (Cinematic Landscape)</option>
                  <option value="1:1">1:1 (Square Master)</option>
                  <option value="2:3">2:3 (Portrait Classic)</option>
                </select>
              </div>
            </div>

            {/* Branding Identity */}
            <div className="mt-1">
              <label className="text-[10px] text-[#b38080] font-bold block mb-1">
                Bottom Safe-Zone Channel Branding
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "IBD", label: "IBD (Indian Bhakti Dhara)" },
                  { id: "ASP", label: "ASP (Anupam Shiv Parivar)" },
                  { id: "RKM", label: "RKM (Ramdoot Ki Mahima)" },
                ].map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setSelectedBrand(brand.id as "IBD" | "ASP" | "RKM")}
                    className={`py-2 px-1 rounded-xl text-center font-mono-code text-xs font-bold border transition-all cursor-pointer ${
                      selectedBrand === brand.id
                        ? "bg-[#ff416c] border-[#ff4d4d] text-white shadow-md"
                        : "bg-[#1a0707] border-[#2d0f0f] text-[#b38080]"
                    }`}
                  >
                    {brand.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Master Output & Siddha Quality Gate (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Master Prompt Display Card */}
          <div className="bg-[#120404] border border-[#ff4d4d]/40 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#2d0f0f]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff4d4d] animate-pulse" />
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-[#fff0f0]">
                    VP21 TEMPLE SANCTUM MASTER DECK
                  </h3>
                  <div className="text-[10px] font-mono-code text-[#ff8080]">
                    {commandString}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      currentPrompt,
                      "master-vp21",
                      "VP21 Master Prompt"
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ff416c] hover:bg-[#ff577d] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  {copiedKey === "master-vp21" ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Master Prompt</span>
                </button>

                {onSendToForge && (
                  <button
                    type="button"
                    onClick={() => {
                      onSendToForge({
                        subject: `${selectedSubject.name} - VP21 Temple Sanctum`,
                        story: currentPrompt,
                        version: 21,
                        dim: selectedRatio,
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#240808] hover:bg-[#380e0e] border border-[#ff4d4d]/40 text-xs font-bold text-[#ffccd8] transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Send to Forge</span>
                  </button>
                )}
              </div>
            </div>

            {/* Core Physics & Atmosphere Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2d0f0f]">
                <span className="text-[10px] text-[#b38080] block">Light Physics:</span>
                <strong className="text-[#ffd700] text-[11px]">1800K Diya Practicals</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2d0f0f]">
                <span className="text-[10px] text-[#b38080] block">Material World:</span>
                <strong className="text-[#ffccd8] text-[11px]">Black Basalt & 24k Gold</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2d0f0f]">
                <span className="text-[10px] text-[#b38080] block">Focal Anchor:</span>
                <strong className="text-[#ff8080] text-[11px]">Atman Drishti Gaze</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#1c0808] border border-[#2d0f0f]">
                <span className="text-[10px] text-[#b38080] block">Quality Grade:</span>
                <strong className="text-[#ffd700] text-[11px]">Q10 Siddha Master</strong>
              </div>
            </div>

            {/* Master Image Prompt Block */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#ffd700] flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-[#ffd700]" />
                  Photorealistic Midjourney / Flux Master Prompt
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      currentPrompt,
                      "prompt-copy",
                      "Prompt Block"
                    )
                  }
                  className="text-[10px] text-[#ff8080] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === "prompt-copy" ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>Copy</span>
                </button>
              </div>
              <div className="p-4 rounded-xl bg-[#080202] border border-[#ff4d4d]/30 text-xs font-mono-code text-[#ffe6a3] leading-relaxed select-all">
                {currentPrompt}
              </div>
            </div>

            {/* 16-Point Q10 Siddha Quality Gate Audit */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#2d0f0f]">
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#ff8080] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#ff4d4d]" />
                16-Point Q10 Siddha Quality Gate Verification (Fail = Rebuild)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { rule: "1. Canonical identity preserved", pass: "100% Shilpa Shastra mudras & attire" },
                  { rule: "2. Temple Sanctum language unmistakable", pass: "Garbhagriha monolithic stone pillars" },
                  { rule: "3. Garbhagriha/temple depth believable", pass: "Foreground, midground, background depth" },
                  { rule: "4. Camera and lens appropriate", pass: selectedLens.label },
                  { rule: "5. Diya/light source physically motivated", pass: "1800K multi-tier brass deepams" },
                  { rule: "6. Face and eyes readable", pass: "Protected from dark shadows" },
                  { rule: "7. Hands/mudras/attributes correct", pass: "Canonical ayudhas & vahana" },
                  { rule: "8. Materials physically believable", pass: "Basalt stone, aged wood, silk weave" },
                  { rule: "9. Atmosphere has a source", pass: "Dhoop incense smoke & dust motes" },
                  { rule: "10. Primary subject dominates", pass: "Sanctum geometry frames the deity" },
                  { rule: "11. Text is top-safe", pass: "Protected from platform UI" },
                  { rule: "12. Brand is bottom-centre & subtle", pass: `${selectedBrand} — ESTD 07/25` },
                  { rule: "13. Selected VA slot is non-repeated", pass: `${selectedVASlot} (3+ dimension variance)` },
                  { rule: "14. Platform ratio is native", pass: selectedRatio },
                  { rule: "15. No obvious AI plastic artifacts", pass: "Planck-scale skin microtextures" },
                  { rule: "16. Final frame = OTT cinematic Darshan", pass: "ARRI Alexa LF 65mm format" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg bg-[#0d0303] border border-[#210909]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[#fff0f0] font-medium text-[11px]">
                        {item.rule}
                      </div>
                      <div className="text-[10px] text-[#b38080]">{item.pass}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kinetic Motion-Ready Profile */}
            <div className="p-4 rounded-xl bg-[#0d0303] border border-[#ff4d4d]/25 flex flex-col gap-2">
              <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#ffd700] flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#ffd700]" />
                Kinetic 120fps Motion-Ready Directives (Sora / Kling / Luma)
              </span>
              <div className="text-xs text-[#e6b8b8] leading-relaxed">
                Slow cinematic push-in toward the Garbhagriha sanctum (0.2m/s velocity). Subtle flickering ghee diya flame caustics casting shimmering reflections on polished granite. Natural upward drift of sacred dhoop incense smoke. Slow focus transition locking into the deity&apos;s compassionate Drishti gaze. Zero rapid zooms or disorienting camera spins.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
