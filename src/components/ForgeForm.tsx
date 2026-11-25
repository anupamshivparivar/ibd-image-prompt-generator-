import React from "react";
import {
  AspectRatio,
  TargetEngine,
  MoodRasa,
  LightingStyle,
  ForgeRequest,
} from "../types";
import { EvolutionSlider } from "./EvolutionSlider";
import {
  Sparkles,
  Flame,
  Wand2,
  Tv,
  Layers,
  Sun,
  Shield,
  HelpCircle,
  Shuffle,
  Film,
  Sliders,
  Link2,
} from "lucide-react";
import {
  CINEMA_PLATFORM_PROFILES,
  SAMPLER_SPECS,
} from "../data/cinemaSamplerData";
import {
  DEITY_AUTO_PROFILES,
  resolveDeityAutoProfile,
} from "../data/deityAutoProfiles";

interface ForgeFormProps {
  formData: ForgeRequest;
  onChange: (data: Partial<ForgeRequest>) => void;
  onSubmit: () => void;
  onAutoForge?: (autoReq: ForgeRequest) => void;
  isLoading: boolean;
  onSelectSubjectChip: (subj: string) => void;
}

const DEITY_CHIPS = [
  "Shiv Parvati Shravan Jhulan",
  "Shiv Parivar Kailash Anand",
  "Shiv Gauri Hariyali Teej",
  "Shiv Parivar Pradosh Aarti",
  "Shri Ram Sita Ayodhya Court",
  "Shri Ram Sita Chitrakoot Kutir",
  "Shri Ram Sita Rameshwaram Sthapana",
  "Shri Ram Sita Pushpaka Vimana",
  "Shri Ram Sita Janakpur Swayamvar",
  "Bal Krishna Yashoda Brahmanda",
  "Krishna Janmabhoomi Yamuna Crossing",
  "Krishna Kaliya Mardan Leela",
  "Giridhari Krishna Govardhan",
  "Bhagwan Dwarkadhish Darbar",
  "Parthasarathi Krishna Gitopadesha",
  "Radha Krishna (Bansuri Vadan)",
  "Radha Krishna (Jhulan Utsav)",
  "Radha Krishna (Phoolon Ki Holi)",
  "Radha Krishna (Govardhan Surabhi)",
  "Radha Krishna (Temple Darshan Throne)",
  "Radha Krishna (Sharad Purnima)",
  "Ardhanarishvara (Shiva-Shakti)",
  "Lakshmi Narayana (Vaikuntha)",
  "Param-Shiva (V-Paratpar)",
  "Mahadev Moksha-Siddhi (V10)",
  "Maa Durga Lion Rider",
  "Maa Saraswati Veena",
  "Veer Hanuman with Sanjeevani",
  "Maa Kali Adyashakti",
  "Maa Lakshmi Golden Lotus",
  "Siddhivinayak Ganesha",
  "Bhagwan Murugan with Vel",
];

const SHASTRA_OPTIONS = [
  "Planck-length Detail",
  "Sanskrit Yantra Geometry",
  "Vibhuti & Rudraksha Textures",
  "Sacred Gold & Stone Seal",
  "Volumetric Dhoop Incense Smoke",
  "8K Octane Octahedral Polish",
  "Chola Bronze Patina",
  "Shilpa Shastra Canon Talamana",
];

const SAMPLE_SANKALPAS = [
  "Bhagwan Shiva and Maa Parvati gracefully seated on an ornate floral swing (Hindola) suspended from a Deodar pine branch overlooking snow-capped Mount Kailash during a misty Shravan monsoon breeze, with Bel-patra garlands and peaceful Nandi.",
  "Complete Shiv Parivar on Mount Kailash: Lord Shiva and Maa Parvati with Bal Ganesha holding glowing Modakas, young Kartikeya with golden Vel, and all their divine vahanas (Nandi, Lion, Mouse, Peacock, Serpent) resting in miraculous cosmic harmony.",
  "Maa Gauri lovingly feeding golden Modaks to Bal Ganesha while young Kartikeya pets his peacock and Mahadev looks on with serene loving grace on Mount Kailash.",
  "Grand royal Rajya-Abhishek coronation of Maryada Purushottam Shri Ram alongside Maa Sita upon the carved Navaratna golden throne in Ayodhya with Kodanda bow and royal Chhatra.",
  "Shri Ram, Maa Sita, and Lakshmana in peaceful forest hermitage at Chitrakoot on the sacred banks of River Mandakini, surrounded by spotted deer and sages in serene morning sun.",
  "Shri Ram and Maa Sita consecrating the sacred sand Shiva Linga on the shores of Rameshwaram before constructing the Rama Setu, with ocean wave caustics and Lord Shiva's celestial blessings in the sky.",
  "Shri Ram, Maa Sita, Lakshmana, and Hanuman returning to Ayodhya aboard the celestial golden Pushpaka Vimana flying over the illuminated Sarayu river glowing with millions of Diwali lamps.",
  "Shri Ram stringing the Shiva Pinaka bow in King Janaka's golden royal court in Janakpur as Maa Sita holds the fragrant Varamala garland.",
  "Vasudeva carrying baby Krishna in a wicker basket across the surging midnight Yamuna river during Janmashtami storm, shielded by thousand-headed Sheshanaga's golden hoods.",
  "Maa Yashoda in Gokul courtyard gazing into toddler Bal Krishna's mouth to witness the entire infinite cosmic universe (Brahmanda Darshan) with spinning galaxies and planetary orbits.",
  "Youthful Krishna performing the divine Kaliya Mardan dance on the hundred venomous hoods of serpent Kaliya in the swirling waters of River Yamuna.",
  "Giridhari Krishna lifting the colossal Mount Govardhan on His little finger to shelter all Brajwasis and sacred cows from Indra's storm.",
  "Bhagwan Dwarkadhish reigning in supreme sovereign splendor upon the golden Simhasana in His coastal palace in Dwarka, overlooking turquoise ocean waves.",
  "Parthasarathi Krishna delivering the supreme Bhagavad Gita to Arjuna between the two armies in the golden chariot at Kurukshetra with subtle holographic Vishwarupa light.",
  "Shri Radha Krishna in serene Bansuri Vadan under a blooming Kadamba tree on the peaceful banks of River Yamuna. Shri Krishna in Tribhanga posture playing golden flute; Shri Radha beside Him in royal Banarasi silk holding a pink lotus in reverent Dhyana with white calves listening peacefully. Pure spiritual devotion, no intimate embrace.",
  "Shri Radha and Shri Krishna seated with royal dignity on an ornate flower-garlanded golden swing (Jhulan Utsav) during a gentle Vrindavan monsoon breeze, with rain mist, golden sunbeams, and singing sakhis in the background.",
  "Phoolon Ki Holi celebration in Vrindavan with Shri Radha and Shri Krishna playfully tossing showers of fresh fragrant lotus and marigold petals under bright golden sunbeams in a temple courtyard.",
  "Param-Shiva in the absolute unmanifest void (Ananta-Bija Singularity). Non-Dual Realism where the deity is simultaneously the primordial darkness (#000000) and the blinding golden seed of creation (#FFCC33) with Atman-Sync Gaze and Swayam-Jyoti light physics.",
  "Maa Durga riding a roaring Asiatic lion, wielding ten glowing consecrated weapons against cosmic darkness, adorned in pure crimson Banarasi silk and South Indian temple gold jewelry.",
  "Veer Hanuman in colossal form holding the luminous Sanjeevani mountain peak, soaring across starfields with lightning caustics reflecting off his Sindoor-colored shoulders.",
];


export const ForgeForm: React.FC<ForgeFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onAutoForge,
  isLoading,
  onSelectSubjectChip,
}) => {
  const matchedDeityProfile = React.useMemo(
    () => resolveDeityAutoProfile(formData.subject, formData.mood),
    [formData.subject, formData.mood]
  );

  const isAutoMode = formData.autoDeityMode ?? true;

  const buildAutoRequestForSubject = (
    subjectText: string,
    useAutoStory: boolean
  ): ForgeRequest => {
    const profile = resolveDeityAutoProfile(subjectText, formData.mood);
    return {
      ...formData,
      subject: subjectText,
      version: profile.version,
      dim: profile.dim,
      targetEngine: profile.targetEngine,
      mood: profile.mood,
      lightingStyle: profile.lightingStyle,
      cinemaStyle: profile.cinemaStyle,
      sampler: profile.sampler,
      shastraDetails: [...profile.shastraDetails],
      story: useAutoStory ? profile.autoStory : formData.story,
      autoDeityMode: true,
    };
  };

  const handleSubjectChange = (newSubj: string) => {
    if (isAutoMode) {
      const profile = resolveDeityAutoProfile(newSubj, formData.mood);
      onChange({
        subject: newSubj,
        version: profile.version,
        dim: profile.dim,
        targetEngine: profile.targetEngine,
        mood: profile.mood,
        lightingStyle: profile.lightingStyle,
        cinemaStyle: profile.cinemaStyle,
        sampler: profile.sampler,
        shastraDetails: [...profile.shastraDetails],
      });
    } else {
      onChange({ subject: newSubj });
    }
  };

  const handleOneClickAutoDeityGenerate = (deitySubject?: string) => {
    const targetSubj = (deitySubject || formData.subject || "Mahadev Shiva").trim();
    const shouldReplaceStory =
      Boolean(deitySubject) || !formData.story.trim() || isAutoMode;
    const autoReq = buildAutoRequestForSubject(targetSubj, shouldReplaceStory);
    if (onAutoForge) {
      onAutoForge(autoReq);
    } else {
      onChange(autoReq);
      onSubmit();
    }
  };

  const toggleShastraDetail = (detail: string) => {
    const exists = formData.shastraDetails.includes(detail);
    if (exists) {
      onChange({
        shastraDetails: formData.shastraDetails.filter((d) => d !== detail),
      });
    } else {
      onChange({
        shastraDetails: [...formData.shastraDetails, detail],
      });
    }
  };

  const handleRandomizeSankalpa = () => {
    const randomStory =
      SAMPLE_SANKALPAS[Math.floor(Math.random() * SAMPLE_SANKALPAS.length)];
    onChange({ story: randomStory });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim() && !formData.story.trim()) {
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Subject & Quick Chips */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#f4cf6a]" />
            Divine Subject / Deity
          </label>
          <div className="flex items-center gap-2">
            <button
              id="toggle-auto-deity-mode"
              type="button"
              onClick={() => onChange({ autoDeityMode: !isAutoMode })}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                isAutoMode
                  ? "bg-emerald-950/80 border-emerald-400/60 text-emerald-300 shadow-sm"
                  : "bg-[#14100b] border-[#382d1c] text-[#8c7a5c]"
              }`}
              title="Automatically tunes Version, Cinema Grade, Sampler, Lighting, Mood & Shastra details as per Deity"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAutoMode ? "bg-emerald-400 animate-pulse" : "bg-[#574936]"
                }`}
              />
              <span>Auto Mode (Per Deity): {isAutoMode ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            placeholder="Type any Deity (e.g. Mahadev, Krishna, Ram, Hanuman, Durga, Kali, Ganesha, Ganga)..."
            className="flex-1 bg-[#050403] border border-[#262016] focus:border-[#d4af37] text-white px-4 py-3.5 rounded-xl text-sm outline-none transition-all placeholder:text-[#4d4233] focus:ring-1 focus:ring-[#d4af37]/30"
            required
          />
          <button
            id="btn-auto-generate-deity"
            type="button"
            disabled={isLoading}
            onClick={() => handleOneClickAutoDeityGenerate()}
            className="shrink-0 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 transition cursor-pointer"
            title="Auto-configure all parameters for this Deity and Generate immediately"
          >
            <Wand2 className="w-4 h-4" />
            <span>Auto-Generate</span>
          </button>
        </div>

        {/* Live Deity Auto-Mode Blueprint Card */}
        {isAutoMode && (
          <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-[#0d0a06] to-amber-950/25 p-3 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Auto-Matched
                </span>
                <span className="text-xs font-bold text-[#f4cf6a]">
                  {matchedDeityProfile.deityName}
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-200/90">
                {matchedDeityProfile.matchReason}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-[#14100b] border border-[#2b2116] text-amber-300">
                V{matchedDeityProfile.version} · L{matchedDeityProfile.ottLevel}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#14100b] border border-[#2b2116] text-cyan-300">
                {matchedDeityProfile.dim} • {matchedDeityProfile.targetEngine}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#14100b] border border-[#2b2116] text-sky-300">
                Look:{" "}
                {CINEMA_PLATFORM_PROFILES.find((p) => p.id === matchedDeityProfile.cinemaStyle)
                  ?.shortName || matchedDeityProfile.cinemaStyle}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#14100b] border border-[#2b2116] text-purple-300">
                Sampler: {matchedDeityProfile.sampler}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#14100b] border border-[#2b2116] text-emerald-300">
                {matchedDeityProfile.mood.split("(")[0].trim()}
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#a39274]">
              Angle: <span className="text-[#e5e0d5]">{matchedDeityProfile.cameraAngle}</span> · Palette:{" "}
              <span className="text-[#f4cf6a]">{matchedDeityProfile.colorPalette.join(" · ")}</span>
            </div>

            {/* 1-Click Auto-Generate by Deity */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-emerald-500/15">
              <span className="text-[10px] font-mono text-[#8c7a5c] mr-1">
                1-Click Auto-Generate:
              </span>
              {[
                "radha-krishna",
                "shiva-mahadev",
                "ram-sita-circuit",
                "veer-hanuman",
                "ganesha",
                "maa-durga",
                "lakshmi-narayana",
                "maa-saraswati",
                "param-shiva-singularity",
                "maa-kali",
              ]
                .map((id) => DEITY_AUTO_PROFILES.find((p) => p.id === id))
                .filter((dp): dp is NonNullable<typeof dp> => Boolean(dp))
                .map((dp) => (
                  <button
                    key={dp.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleOneClickAutoDeityGenerate(dp.deityName)}
                    className="text-[10px] font-mono px-2 py-1 rounded-lg bg-[#14100b] hover:bg-emerald-950/60 border border-[#2b2116] hover:border-emerald-400/50 text-[#e5e0d5] hover:text-emerald-200 transition cursor-pointer disabled:opacity-50"
                    title={`Auto-configure & generate: ${dp.matchReason}`}
                  >
                    ⚡ {dp.shortLabel}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Quick Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {DEITY_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onSelectSubjectChip(chip)}
              className="text-[10px] font-mono-code px-2.5 py-1 rounded-full bg-[#120e09] hover:bg-[#1f180f] text-[#a39274] hover:text-[#f4cf6a] border border-[#262016] hover:border-[#382d1c] transition-colors cursor-pointer"
            >
              + {chip}
            </button>
          ))}
        </div>
      </div>

      {/* First-Glance Button Controls: Dimensions & Target Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dimensions Button Selector */}
        <div className="flex flex-col gap-2 bg-[#090705] p-3 rounded-2xl border border-[#262016]">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-[#f4cf6a]" />
              Canvas Aspect Ratio
            </label>
            <span className="text-[10px] font-mono text-[#8c7853]">1-Click</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: "16:9", label: "16:9 YouTube" },
              { id: "9:16", label: "9:16 Shorts" },
              { id: "2:3", label: "2:3 Poster" },
              { id: "21:9", label: "21:9 Cinema" },
              { id: "1:1", label: "1:1 Mandala" },
              { id: "4:5", label: "4:5 Portrait" },
            ].map((dimItem) => {
              const isSelected = formData.dim === dimItem.id;
              return (
                <button
                  key={dimItem.id}
                  type="button"
                  onClick={() => onChange({ dim: dimItem.id as AspectRatio })}
                  className={`px-2 py-2 rounded-xl text-[11px] font-bold transition-all border cursor-pointer truncate ${
                    isSelected
                      ? "bg-[#d4af37] text-black border-[#ffd700] shadow-md shadow-[#d4af37]/30 scale-[1.02] ring-1 ring-[#ffd700]"
                      : "bg-[#14100b] hover:bg-[#1f1912] border-[#2b2116] text-[#c7b9a5]"
                  }`}
                >
                  {dimItem.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Engine Button Selector */}
        <div className="flex flex-col gap-2 bg-[#090705] p-3 rounded-2xl border border-[#262016]">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#f4cf6a]" />
              Target AI Engine
            </label>
            <span className="text-[10px] font-mono text-[#8c7853]">Direct Output</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
            {[
              { id: "Midjourney v6.1", label: "Midjourney 6.1" },
              { id: "Flux 1.1 Pro", label: "Flux 1.1 Pro" },
              { id: "Ideogram 2.0", label: "Ideogram 2.0" },
              { id: "Imagen 3", label: "Imagen 3" },
              { id: "SDXL", label: "SDXL Photoreal" },
            ].map((engineItem) => {
              const isSelected = formData.targetEngine === engineItem.id;
              return (
                <button
                  key={engineItem.id}
                  type="button"
                  onClick={() => onChange({ targetEngine: engineItem.id as TargetEngine })}
                  className={`px-2 py-2 rounded-xl text-[11px] font-bold transition-all border cursor-pointer truncate ${
                    isSelected
                      ? "bg-amber-500 text-stone-950 border-amber-300 shadow-md shadow-amber-500/30 scale-[1.02] ring-1 ring-amber-300"
                      : "bg-[#14100b] hover:bg-[#1f1912] border-[#2b2116] text-[#c7b9a5]"
                  }`}
                >
                  {engineItem.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cinema / OTT / Director Grade & Diffusion Sampler Linker */}
      <div className="bg-[#090705] p-3.5 sm:p-4 rounded-2xl border border-[#262016] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-[#f4cf6a]" />
            Cinema / Platform Grade &amp; Sampler Link (Best Output)
          </label>
          <span className="text-[10px] font-mono text-emerald-300/90 flex items-center gap-1">
            <Link2 className="w-3 h-3" />
            Auto-links optimal Sampler &amp; Engine
          </span>
        </div>

        {/* Quick 1-Click Cinema / OTT / Director Chips */}
        <div className="flex flex-wrap gap-1.5">
          {CINEMA_PLATFORM_PROFILES.map((prof) => {
            const isSelected = formData.cinemaStyle === prof.id;
            return (
              <button
                key={prof.id}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onChange({ cinemaStyle: undefined });
                  } else {
                    onChange({
                      cinemaStyle: prof.id,
                      sampler: prof.linkedBestOutput.sampler,
                      targetEngine: prof.linkedBestOutput.targetEngine,
                      dim: prof.linkedBestOutput.aspectRatio,
                    });
                  }
                }}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-amber-300 shadow-md shadow-amber-500/25"
                    : "bg-[#14100b] hover:bg-[#1f1912] border-[#2b2116] text-[#c7b9a5]"
                }`}
                title={`${prof.name} ➔ Best Sampler: ${prof.linkedBestOutput.sampler} (${prof.linkedBestOutput.targetEngine})`}
              >
                <span>{prof.shortName}</span>
                <span
                  className={`text-[9px] font-mono ${
                    isSelected ? "text-black/75" : "text-[#8c7853]"
                  }`}
                >
                  • {prof.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sampler Selector Dropdown + Quick Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#a39274] uppercase font-mono-code flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-purple-400" />
              Diffusion Sampler (Speed / Detail / Use)
            </label>
            <select
              value={formData.sampler || "DPM++ 2M Karras"}
              onChange={(e) => onChange({ sampler: e.target.value })}
              className="w-full bg-[#050403] border border-[#262016] focus:border-purple-400 text-[#e5e0d5] px-3 py-2.5 rounded-xl text-xs outline-none transition-all cursor-pointer"
            >
              {SAMPLER_SPECS.map((s) => (
                <option key={s.id} value={s.sampler}>
                  {s.sampler} — {s.speed} | {s.detail} ({s.useFor})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col justify-center bg-[#050403] border border-[#1f1910] rounded-xl px-3.5 py-2 text-[11px]">
            {(() => {
              const activeSam =
                SAMPLER_SPECS.find((s) => s.sampler === (formData.sampler || "DPM++ 2M Karras")) ||
                SAMPLER_SPECS[0];
              const activeCin = CINEMA_PLATFORM_PROFILES.find(
                (p) => p.id === formData.cinemaStyle
              );
              return (
                <div className="space-y-0.5">
                  <div className="text-[#f4cf6a] font-bold flex items-center justify-between gap-2">
                    <span className="truncate">
                      {activeCin ? `${activeCin.shortName} + ${activeSam.sampler}` : activeSam.sampler}
                    </span>
                    <span className="text-[10px] font-mono text-purple-300 shrink-0">
                      {activeSam.recommendedSteps} steps
                    </span>
                  </div>
                  <div className="text-[10px] text-[#8c7a5c] truncate">
                    Use for: <span className="text-[#e5e0d5]">{activeSam.useFor}</span> • CFG{" "}
                    {activeSam.cfgScale}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Evolution Level Slider (V1 - V8) */}
      <EvolutionSlider
        version={formData.version}
        onChange={(v) => onChange({ version: v })}
      />

      {/* Grid: Mood / Rasa & Sacred Lighting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mood */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#f4cf6a]" />
            Mood & Sacred Rasa
          </label>
          <select
            value={formData.mood}
            onChange={(e) => onChange({ mood: e.target.value as MoodRasa })}
            className="w-full bg-[#050403] border border-[#262016] focus:border-[#d4af37] text-[#e5e0d5] px-4 py-3 rounded-xl text-xs outline-none transition-all cursor-pointer"
          >
            <option value="V-Paratpar / Ananta-Bija (The Singularity)">
              V-Paratpar / Ananta-Bija (The Singularity • V11)
            </option>
            <option value="Moksha / Non-Dual (Pure Consciousness)">
              Moksha / Non-Dual (Pure Consciousness • V10)
            </option>
            <option value="Brahmanda-Srishti / Universal Strings">
              Brahmanda-Srishti / Universal Strings (V9 Origin)
            </option>
            <option value="Virat-Rupa / Cosmic">
              Virat-Rupa / Cosmic (Universal Multiverse)
            </option>
            <option value="Bhakti / Shanta (Serene)">
              Bhakti / Shanta (Peaceful Devotion)
            </option>
            <option value="Rudra / Tandava (Fierce Divine)">
              Rudra / Tandava (Fierce Power)
            </option>
            <option value="Vaikuntha / Celestial Tejas">
              Vaikuntha / Celestial Tejas (Divine Grace)
            </option>
            <option value="Tapasya / Yogic Dhyana">
              Tapasya / Yogic Dhyana (Deep Meditative)
            </option>
            <option value="Mahavidya / Mystical Tantra">
              Mahavidya / Mystical Tantra (Sacred Occult)
            </option>
          </select>
        </div>

        {/* Sacred Lighting */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-[#f4cf6a]" />
            Sacred Lighting Formula
          </label>
          <select
            value={formData.lightingStyle}
            onChange={(e) =>
              onChange({ lightingStyle: e.target.value as LightingStyle })
            }
            className="w-full bg-[#050403] border border-[#262016] focus:border-[#d4af37] text-[#e5e0d5] px-4 py-3 rounded-xl text-xs outline-none transition-all cursor-pointer"
          >
            <option value="Atman-Sync Swayam-Jyoti (Geometric Source)">
              Atman-Sync Swayam-Jyoti (Geometric Light Source • V11)
            </option>
            <option value="Saptarishi Celestial 7-Point Ray">
              Saptarishi Celestial 7-Point Ray (V10 Non-Dual Beams)
            </option>
            <option value="Swayam-Jyoti (Non-Dual Self-Effulgence)">
              Swayam-Jyoti (Non-Dual Self-Effulgent Core)
            </option>
            <option value="Sahasrara-Alpha Neural Tejas">
              Sahasrara-Alpha Neural Tejas (Crown Violet-Gold)
            </option>
            <option value="Brahmamuhurta Dawn Gold">
              Brahmamuhurta Dawn Gold (Sacred 4 AM Amber)
            </option>
            <option value="Deep Garbhagriha Oil Diya">
              Deep Garbhagriha Oil Diya (Inner Sanctum Warmth)
            </option>
            <option value="Cosmic Nebula Rim Glow">
              Cosmic Nebula Rim Glow (Deep Void Starlight)
            </option>
            <option value="Hiranyagarbha Solar Core">
              Hiranyagarbha Solar Core (Golden Egg Radiance)
            </option>
          </select>
        </div>
      </div>

      {/* Shastra Details Multi-Select */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-[#f4cf6a]" />
          Vedic Details & Micro-Attributes
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SHASTRA_OPTIONS.map((opt) => {
            const isSelected = formData.shastraDetails.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggleShastraDetail(opt)}
                className={`text-[11px] text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? "bg-[#241a0d] border-[#d4af37] text-[#f4cf6a] font-semibold shadow-sm"
                    : "bg-[#080604] border-[#262016] text-[#8c7a5c] hover:border-[#382d1c] hover:text-[#c5baa8]"
                }`}
              >
                <span className="truncate">{opt}</span>
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isSelected ? "bg-[#d4af37] shadow-[0_0_8px_#d4af37]" : "bg-[#262016]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Sankalpa (Scene Narrative) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-[#d4af37] tracking-wider uppercase font-mono-code flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-[#f4cf6a]" />
            Sankalpa (Scene Narrative)
          </label>
          <button
            type="button"
            onClick={handleRandomizeSankalpa}
            className="text-[10px] text-[#d4af37] hover:text-[#f4cf6a] font-mono-code flex items-center gap-1 hover:underline"
          >
            <Shuffle className="w-3 h-3" />
            Inspire Muse
          </button>
        </div>
        <textarea
          rows={3}
          value={formData.story}
          onChange={(e) => onChange({ story: e.target.value })}
          placeholder="Describe the transcendental soul and visual energy of the scene for IBD..."
          className="w-full bg-[#050403] border border-[#262016] focus:border-[#d4af37] text-white p-4 rounded-xl text-sm outline-none transition-all placeholder:text-[#4d4233] leading-relaxed resize-y focus:ring-1 focus:ring-[#d4af37]/30 font-sans"
        />
      </div>

      {/* Forge Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4.5 px-6 rounded-xl bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#f4cf6a] text-black font-extrabold text-base md:text-lg uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer font-cinzel shadow-lg"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <span>IBD Studio Engine: Manifesting...</span>
          </>
        ) : (
          <>
            <Flame className="w-5 h-5 fill-black" />
            <span>Forge IBD Elite Asset (V{formData.version})</span>
          </>
        )}
      </button>
    </form>
  );
};
