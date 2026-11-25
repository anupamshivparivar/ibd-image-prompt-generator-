import React, { useState } from "react";
import { UniversalCategory, AspectRatio } from "../types";
import { runWithSoloLock } from "../utils/soloRunLock";
import {
  Sparkles,
  Copy,
  Check,
  Leaf,
  Heart,
  Radio,
  Music,
  Tv,
  Car,
  Clock,
  Headphones,
  Smartphone,
  Flame,
  Award,
  Disc,
  Volume2,
} from "lucide-react";

interface UniversalStudioViewProps {
  customApiKey: string;
  onSetCustomApiKey: (key: string) => void;
  showToast: (msg: string) => void;
}

// 6-Step Emotional Story Arc (Childhood in Car -> Playlist Creation)
const PAPAS_MUSIC_STORY_ARC = [
  {
    step: 1,
    title: "1. 🚗 बचपन — “Papa, ये गाने बंद करो ना!”",
    hook: "“बचपन में Papa के गाने सबसे boring लगते थे…”",
    subject: "1980s Car Journey • The Bored Child in the Back Seat",
    story:
      "A nostalgic 1980s-1990s car journey through Indian countryside in an old Premier Padmini/Ambassador. An 8-year-old child sits in the back seat looking utterly bored, chin resting on hand, staring out the window at passing green fields. In front, Papa is driving peacefully with one hand on the steering wheel, smiling while adjusting the vintage analog car radio playing old golden melodies. Warm late afternoon sunlight streaming through dusty car windows, soft vintage film grain, warm sepia and Kodachrome colors.",
    tag: "Irritation",
  },
  {
    step: 2,
    title: "2. 🎶 Papa’s Playlist — हर सफर में वही पुराने गीत",
    hook: "“हर सफर में Papa की वही पुरानी playlist…”",
    subject: "Papa’s Highway Driving • Cassette Collection & Humming",
    story:
      "An intimate shot inside an Indian family car on an early morning highway. Papa's hand resting gently on the manual gear stick, a stack of vintage T-Series and HMV cassette tapes sitting on the brown leather dashboard. Papa hums along quietly with a serene smile as classic melodies of Kishore Kumar and Mohammed Rafi fill the warm air. In the rearview mirror, the child rolls his eyes in quiet impatience. Golden morning highway sun rays illuminating airborne dust motes.",
    tag: "Familiarity",
  },
  {
    step: 3,
    title: "3. 🎧 The Child Gets His Own Music — नई दुनिया",
    hook: "“फिर एक दिन मेरी अपनी playlist बन गई…”",
    subject: "Teenage Independence • Smartphone & Earphones",
    story:
      "A teenage boy seated in the passenger seat of the car with white earphones plugged in, looking down at his glowing smartphone screen with his own English/pop music playlist active, completely tuned out from the car stereo. In the background, Papa continues to drive patiently with the faint static sound of his old cassette in the car speaker. Visual contrast between the vintage textured car dashboard and modern glowing screen.",
    tag: "Independence",
  },
  {
    step: 4,
    title: "4. 📱 “अब Papa के गाने नहीं” — Visual Contrast",
    hook: "“अब गाड़ी में सिर्फ मेरी पसंद के गाने बजते थे…”",
    subject: "Modern Ride • Separation from Old Melodies",
    story:
      "A young adult man driving modern city streets with smartphone streaming connected to the modern car dashboard via Bluetooth. The old cassette player and radio are gone, replaced by sleek touchscreens. Papa is sitting quietly in the passenger seat looking outside the window, listening to the son's modern music in silence, a quiet gentle nostalgia in his eyes.",
    tag: "Transition",
  },
  {
    step: 5,
    title: "5. ❤️ The Realization — वो सिर्फ गाने नहीं थे",
    hook: "“गाना वही था… लेकिन अब समझ आया कि Papa उसे इतना क्यों पसंद करते थे।”",
    subject: "Sudden Memory Wave • Emotional Realization",
    story:
      "A young adult man in his late 20s sitting alone during evening traffic, suddenly freezing in deep emotional contemplation as an old Kishore Kumar song plays unexpectedly on the radio. A translucent, cinematic double-exposure memory softly appears around him: his father's gentle smile while driving years ago, old monsoon highways, tea stalls by the road, and summer vacations. His eyes glistening with profound realization and love.",
    tag: "Realization",
  },
  {
    step: 6,
    title: "6. 🎵 The Playlist 'Papa ❤️' — विरासत की वापसी",
    hook: "“जिस गाने से बचपन में भागता था… आज वही मेरी playlist में सबसे ऊपर है।”",
    subject: "The Smartphone Playlist 'Papa ❤️' • The Sacred Inheritance",
    story:
      "An emotional modern still-life and portrait composition. A young man smiling tenderly with moist eyes as he holds his phone, typing and saving a new Spotify/Apple music playlist titled 'Papa ❤️', adding classic vintage songs of Rafi, Mukesh, and Lata. Beside his phone on the antique teakwood desk sits Papa's vintage transistor radio and a rewound cassette tape with a pencil through its spool. Warm evening golden sun rays illuminating steaming chai in a clay kulhad.",
    tag: "Inheritance",
  },
];

// 30 Topic Bank Items for Papa's Music
const PAPAS_MUSIC_TOPICS = [
  "Papa का पहला Radio",
  "सुबह Radio पर बजते पुराने गीत",
  "Papa की पसंद के गाने",
  "आकाशवाणी की सुबह",
  "Sunday की Radio वाली सुबह",
  "Papa का Transistor",
  "Radio पर क्रिकेट + बीच-बीच में गाने",
  "Cassette Player घर में आने का दिन",
  "Papa की favourite cassette",
  "एक cassette, बार-बार वही गाना",
  "Pencil से cassette rewind करना",
  "Cassette की ribbon निकल जाना",
  "Tape recorder की आवाज़",
  "Radio का antenna सही direction में करना",
  "गाना साफ सुनने के लिए radio घुमाना",
  "Lata Mangeshkar की आवाज़ और Papa की शाम",
  "Kishore Kumar के गाने और Papa",
  "Mohammed Rafi के गीत",
  "Mukesh के दर्द भरे गीत",
  "Papa के साथ पुराने गीत सुनना",
  "शाम को verandah में Radio",
  "चाय + Radio + Papa",
  "बारिश की शाम और पुराने गीत",
  "गाँव के आँगन में बजता Radio",
  "शादी में बजते पुराने गाने",
  "दूर से आती cassette की आवाज़",
  "पड़ोसी के घर से आती फिल्मी धुन",
  "एक घर में music system, पूरा मोहल्ला सुनता था",
  "Papa की अलमारी में रखी cassettes",
  "वो cassette जिसे Papa कभी फेंकते नहीं थे",
];

// 10 High-Emotion Story Hooks
const HIGH_EMOTION_STORIES = [
  {
    title: "Papa के जाने के बाद उनका Radio…",
    story:
      "Papa's vintage Murphy radio sitting quietly on the wooden shelf in the morning verandah, covered in a soft layer of dust. The morning sunbeams illuminate the brass tuning dial. A son's hand reaches out gently to turn the knob, bringing back the crackling sound of Vividh Bharati, tears welling in his eyes. Studio seal: 'IBD — An Indian Bhakti Dhara Production'.",
  },
  {
    title: "आज भी उस cassette में Papa की आवाज़ सुनाई देती है…",
    story:
      "A vintage brown magnetic cassette tape labeled with Papa's handwriting in blue ink. An old tape recorder gently spinning the reels in a quiet study. The son listening with deep reverence as a faint recorded laughter of his father blends into an old Rafi melody. 35mm film grain, warm nostalgic tones.",
  },
  {
    title: "गाना वही था… बस सुनने वाला बदल गया।",
    story:
      "A split-frame aesthetic of a father in the 1980s tuning an analog radio while drinking morning tea, and 30 years later his grown son listening to the exact same Lata Mangeshkar melody on his smartphone with moist eyes. Warm nostalgic amber and sepia grading.",
  },
  {
    title: "Papa के साथ सुना हुआ पहला गीत",
    story:
      "A young boy standing beside his father on an open balcony at twilight, watching the rain falling on lush green leaves while a transistor radio plays 'Aane Wala Pal'. Father's warm hand gently resting on the boy's shoulder. Pure nostalgic warmth and Kodachrome colors.",
  },
  {
    title: "जिस Radio को हम पुराना समझते थे…",
    story:
      "A beautifully polished vintage Philips radio placed beside modern gadgets like laptops and headphones on a modern oak desk. The radio is illuminated by a warm 2700K desk lamp, holding pride of place as an ancestral treasure.",
  },
  {
    title: "Papa का music collection, हमारी विरासत",
    story:
      "An open wooden almirah filled with neatly stacked cassette cases of classic 70s-90s Hindi cinema, each hand-labeled with care. A daughter gently holding one of the cases, marveling at her father's musical heritage and passion.",
  },
  {
    title: "उस cassette में सिर्फ गाने नहीं थे…",
    story:
      "A macro close-up of an old cassette with a yellowed paper insert showing handwritten song titles and dates from 1988. Beside it, a pencil used to manually rewind the tape ribbon, resting on an old diary filled with memories.",
  },
  {
    title: "Papa गाना सुनते थे, हम उनकी खुशी देखते थे।",
    story:
      "Papa sitting in an old cane armchair in the courtyard on a breezy Sunday morning, eyes closed in pure joy, gently tapping his fingers on his knee to a classical Kishore Kumar tune from the transistor. Children watching him affectionately from the doorway.",
  },
  {
    title: "आज Spotify है… लेकिन Papa का Radio नहीं।",
    story:
      "A modern smartphone resting next to an antique transistor radio on a rainy window sill. The contrast between infinite digital playlists and the irreplaceable emotional soul of turning an analog dial with Papa.",
  },
  {
    title: "कुछ गाने सुनाई नहीं देते… महसूस होते हैं।",
    story:
      "An evocative cinematic portrait of a person driving through mist-covered hills as a vintage melody echoes in the car. Golden sunlight breaking through clouds, capturing the pure transcendental feeling of a father's enduring presence through music.",
  },
];

export const UniversalStudioView: React.FC<UniversalStudioViewProps> = ({
  customApiKey,
  onSetCustomApiKey,
  showToast,
}) => {
  const [category, setCategory] = useState<UniversalCategory>(
    "Nostalgia (Papa's Music — IBD Smaran)"
  );
  const [subject, setSubject] = useState(
    "Papa's Music • 80s/90s Car Journey & The 'Papa ❤️' Playlist"
  );
  const [story, setStory] = useState(
    "A nostalgic 1980s-1990s car journey through Indian countryside in an old Premier Padmini. An 8-year-old child sits in the back seat looking utterly bored, staring out the window at passing trees while Papa drives peacefully, humming to classic Kishore Kumar & Rafi melodies on the car radio. Years later, the grown child creates a phone playlist titled 'Papa ❤️', realizing those boring songs were actually sacred memories with his father."
  );
  const [vLevel, setVLevel] = useState(11);
  const [dim, setDim] = useState<AspectRatio>("16:9");
  const [activeBeat, setActiveBeat] = useState<number | null>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [scriptResult, setScriptResult] = useState<string | null>(null);
  const [jsonResult, setJsonResult] = useState<any | null>(null);
  const [logicResult, setLogicResult] = useState<string | null>(null);
  const [negativeResult, setNegativeResult] = useState<string | null>(null);

  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedImagine, setCopiedImagine] = useState(false);

  const handleSelectStoryArcBeat = (beat: (typeof PAPAS_MUSIC_STORY_ARC)[0]) => {
    setActiveBeat(beat.step);
    setCategory("Nostalgia (Papa's Music — IBD Smaran)");
    setSubject(beat.subject);
    setStory(`${beat.story} Hook: ${beat.hook}`);
    showToast(`Loaded Story Beat ${beat.step}: ${beat.tag}`);
  };

  const handleSelectTopicItem = (topic: string) => {
    setCategory("Nostalgia (Papa's Music — IBD Smaran)");
    setSubject(`Papa's Music: ${topic}`);
    setStory(
      `An authentic, emotionally resonant 80s-90s vintage Indian nostalgia scene centered on "${topic}". Featuring authentic Murphy/Philips transistor radios, rewound cassettes with pencils, steaming verandah tea, and warm Kodachrome 35mm film grain.`
    );
    showToast(`Loaded Topic: ${topic}`);
  };

  const handleSelectHighEmotionStory = (item: (typeof HIGH_EMOTION_STORIES)[0]) => {
    setCategory("Nostalgia (Papa's Music — IBD Smaran)");
    setSubject(`High-Emotion Smaran: ${item.title}`);
    setStory(item.story);
    showToast(`Loaded Story: ${item.title}`);
  };

  const handleManifest = async () => {
    await runWithSoloLock(
      "universal",
      "V11 Universal / Smaran Studio",
      async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch("/api/universal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              category,
              subject,
              story,
              dim,
              version: vLevel,
              customApiKey: customApiKey.trim() || undefined,
            }),
          });

          const data = await response.json();
          if (!response.ok || !data.success) {
            throw new Error(data.error || "Manifestation Error");
          }

          setScriptResult(data.prompt);
          setJsonResult(data.metadata);
          setLogicResult(data.logic);
          setNegativeResult(data.negative);
          showToast("V11 Universal Asset Manifested!");
        } catch (err: any) {
          console.error(err);
          setError(err.message || "Failed to manifest Universal asset.");
        } finally {
          setIsLoading(false);
        }
      },
      (blockedMsg) => {
        setError(blockedMsg);
        showToast(blockedMsg);
      }
    );
  };

  const copyToClipboard = (text: string, type: "script" | "json" | "imagine") => {
    navigator.clipboard.writeText(text);
    if (type === "script") {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else if (type === "json") {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } else {
      setCopiedImagine(true);
      setTimeout(() => setCopiedImagine(false), 2000);
    }
    showToast("Copied to clipboard!");
  };

  const isPapaMusic =
    category === "Nostalgia (Papa's Music — IBD Smaran)" ||
    category === "Nostalgia (Vintage Bharat/Heritage)";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Studio Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-[#1a140b] via-[#2a1d0d] to-[#140f08] border border-[#d4af37]/40 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-[#ffd700] shadow-md shadow-amber-500/20">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel text-xl font-bold text-[#ffd700]">
                IBD Universal Studio
              </h2>
              <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                V11
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#d4af37] tracking-[0.2em] uppercase">
              SARVA-SRISHTI & IBD SMARAN (PAPA’S MUSIC NOSTALGIA)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#1f190e] border border-[#d4af37]/40 text-[#f4cf6a] px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>PAPA’S MUSIC 🎵 ACTIVE</span>
          </span>
        </div>
      </div>

      {/* TOP-LEVEL 1-CLICK CATEGORY SELECTOR BUTTONS */}
      <div className="bg-[#0b0907] p-4 rounded-2xl border border-[#262016] space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>1-Click Universal Category</span>
          </label>
          <span className="text-[10px] font-mono text-stone-400">First-Glance Controls</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[
            {
              id: "Nostalgia (Papa's Music — IBD Smaran)",
              label: "🎵 Nostalgia: Papa’s Music",
              desc: "80s/90s Cassettes & Car Radios",
              activeClass:
                "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 border-amber-300 shadow-md shadow-amber-500/30 font-bold",
            },
            {
              id: "Devotional (Divine/Mythology)",
              label: "🕉️ Devotional (Darshan)",
              desc: "Sacred Tejas & Shilpa Shastra",
              activeClass: "bg-amber-500 text-stone-950 border-amber-300 font-bold",
            },
            {
              id: "Health & Ayurveda (Herbs/Wellness)",
              label: "🌿 Health & Ayurveda",
              desc: "Herbal Vitality & Botanical Wisdom",
              activeClass: "bg-emerald-500 text-stone-950 border-emerald-300 font-bold",
            },
            {
              id: "Emotions & Life (Human Experience)",
              label: "❤️ Emotions & Life",
              desc: "Intimate Portraits & Human Bhava",
              activeClass: "bg-rose-500 text-stone-950 border-rose-300 font-bold",
            },
            {
              id: "Vintage Bharat (Heritage & History)",
              label: "🏛️ Vintage Bharat",
              desc: "Monuments, Culture & Classic History",
              activeClass: "bg-amber-700 text-amber-100 border-amber-400 font-bold",
            },
          ].map((catItem) => {
            const isSelected = category === catItem.id;
            return (
              <button
                key={catItem.id}
                type="button"
                onClick={() => setCategory(catItem.id as UniversalCategory)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? `${catItem.activeClass} scale-[1.02] ring-1 ring-amber-300`
                    : "bg-[#14100b] hover:bg-[#1f1912] border-[#2b2116] text-[#c7b9a5]"
                }`}
              >
                <div className="text-xs font-bold leading-tight">{catItem.label}</div>
                <div className="text-[10px] opacity-80 mt-0.5 truncate">{catItem.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DEDICATED PAPA'S MUSIC (IBD SMARAN) INTERACTIVE WORKSTATION */}
      {isPapaMusic && (
        <div className="space-y-6 bg-gradient-to-b from-[#181108] via-[#120e09] to-[#0a0805] p-6 rounded-3xl border border-[#d4af37]/40 shadow-2xl animate-in fade-in duration-400">
          {/* Papa's Music Header & Hero Hook */}
          <div className="space-y-3 border-b border-[#2b2114] pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📻</span>
                <div>
                  <h3 className="font-cinzel text-lg md:text-xl font-black text-[#ffd700] tracking-wide">
                    PAPA’S MUSIC 🎵 | आवाज़ें जो घर की याद बन गईं
                  </h3>
                  <p className="text-xs text-[#d4af37] font-medium">
                    जिसे कभी boring कहा था, वही आज सबसे प्यारी याद है।
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs rounded-full font-mono">
                80s–90s Nostalgia Bank
              </span>
            </div>

            {/* Hero Quote Card */}
            <div className="p-4 rounded-2xl bg-[#090704] border border-amber-500/30 relative overflow-hidden">
              <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Strongest IBD SMARAN Hook & Hero Line</span>
              </div>
              <div className="text-sm md:text-base font-semibold text-[#f5ebd7] italic leading-relaxed">
                “बचपन में Papa का music boring लगता था… बड़े होकर समझ आया — वो music नहीं, Papa के साथ बिताया हुआ वक्त था।”
              </div>
              <div className="text-[11px] text-[#b8a994] mt-1.5 font-mono">
                🎬 “आज गाने लाखों हैं… लेकिन Papa के Radio वाला एक गाना आज भी दिल में बजता है।”
              </div>
            </div>
          </div>

          {/* 6-STEP EMOTIONAL STORY ARC BUTTONS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#ffd700] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-400" />
                <span>6-Beat Smaran Story Arc (Click to Load Prompt)</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">Complete Narrative Journey</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PAPAS_MUSIC_STORY_ARC.map((beat) => {
                const isActive = activeBeat === beat.step;
                return (
                  <button
                    key={beat.step}
                    type="button"
                    onClick={() => handleSelectStoryArcBeat(beat)}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 border-yellow-300 shadow-lg shadow-amber-500/20 scale-[1.02] ring-1 ring-yellow-300"
                        : "bg-[#14100b] hover:bg-[#1f1912] border-[#2b2116] text-[#e0d6c5]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-black/30">
                          Beat 0{beat.step} • {beat.tag}
                        </span>
                        {isActive && <Check className="w-3.5 h-3.5 shrink-0 text-black" />}
                      </div>
                      <div className="text-xs font-bold leading-tight">{beat.title}</div>
                      <div
                        className={`text-[11px] mt-1.5 line-clamp-2 italic ${
                          isActive ? "text-stone-900" : "text-amber-300/80"
                        }`}
                      >
                        {beat.hook}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono mt-2 pt-2 border-t border-black/10 opacity-75 truncate">
                      {beat.subject}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 30+ TOPIC BANK BUTTON GRID */}
          <div className="space-y-3 bg-[#080604] p-4.5 rounded-2xl border border-[#261e14]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#ffd700] uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Disc className="w-4 h-4 text-amber-400" />
                <span>Papa’s Music 30-Topic Bank (1-Click Selection)</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">30 Nostalgia Prompts</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-1 scrollbar-thin">
              {PAPAS_MUSIC_TOPICS.map((topic, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectTopicItem(topic)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#14100b] hover:bg-amber-500 hover:text-stone-950 hover:font-bold border border-[#2b2116] text-[#d6c7b2] transition-all cursor-pointer truncate max-w-full"
                >
                  📻 {topic}
                </button>
              ))}
            </div>
          </div>

          {/* 10 HIGH-EMOTION STORIES BANK */}
          <div className="space-y-3 bg-[#080604] p-4.5 rounded-2xl border border-[#261e14]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>❤️ 10 High-Emotion Smaran Stories</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">Deep Sentimental Hooks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {HIGH_EMOTION_STORIES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectHighEmotionStory(item)}
                  className="p-2.5 rounded-xl text-left bg-[#14100b] hover:bg-stone-800 border border-[#2b2116] hover:border-amber-500/40 text-[#d6c7b2] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="text-xs font-medium group-hover:text-amber-300">
                    “{item.title}”
                  </span>
                  <span className="text-[10px] font-mono text-amber-500 opacity-0 group-hover:opacity-100 shrink-0 ml-2">
                    Load →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INPUTS FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#0b0907] p-6 rounded-2xl border border-[#262016]">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold text-[#d4af37] uppercase tracking-wider mb-2 font-mono">
            Master API Access (Google AI Studio Key - Optional)
          </label>
          <input
            type="password"
            value={customApiKey}
            onChange={(e) => onSetCustomApiKey(e.target.value)}
            placeholder="Connect to V11 Intelligence (Optional if server key configured)..."
            className="w-full bg-[#000] border border-[#2c2417] focus:border-[#d4af37] text-white px-4 py-3 rounded-xl text-sm outline-none transition-all font-mono"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#d4af37] uppercase tracking-wider mb-2 font-mono">
            Post / Story Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Papa's Music, 80s Car Journey, Radio Nostalgia..."
            className="w-full bg-[#000] border border-[#2c2417] focus:border-[#d4af37] text-white px-4 py-3 rounded-xl text-sm outline-none"
          />
        </div>

        {/* 1-Click Aspect Ratio Buttons */}
        <div>
          <label className="block text-[11px] font-bold text-[#d4af37] uppercase tracking-wider mb-2 font-mono flex items-center gap-1">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>1-Click Format / Aspect Ratio</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: "16:9", label: "16:9 Cinema" },
              { id: "9:16", label: "9:16 Shorts" },
              { id: "1:1", label: "1:1 Square" },
              { id: "4:5", label: "4:5 Portrait" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDim(d.id as AspectRatio)}
                className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer truncate ${
                  dim === d.id
                    ? "bg-amber-500 text-stone-950 border-amber-300 shadow-md shadow-amber-500/20"
                    : "bg-[#14100b] hover:bg-[#1f1912] border-[#2b2116] text-[#c7b9a5]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Intelligence Slider */}
        <div className="md:col-span-2 bg-[#060503] p-4 rounded-xl border border-[#262016]">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-mono">
              V11 Sarva-Srishti Intelligence Slider (V1 - V11)
            </label>
            <span className="text-xs font-mono font-bold text-[#ffd700] px-2.5 py-0.5 bg-[#1f190e] rounded-lg border border-[#3b2e1b]">
              V{vLevel} Master
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={11}
            value={vLevel}
            onChange={(e) => setVLevel(Number(e.target.value))}
            className="w-full h-2 bg-[#1f190e] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
          />
          <div className="flex justify-between text-[10px] text-[#8c7a60] mt-1 font-mono">
            <span>V1 Basic</span>
            <span>V6 Neural Film</span>
            <span>V11 Sarva-Srishti Masterwork</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-bold text-[#d4af37] uppercase tracking-wider mb-2 font-mono">
            The Message / Narrative (Content Intent)
          </label>
          <textarea
            rows={4}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Describe the nostalgic memory, emotion, or story..."
            className="w-full bg-[#000] border border-[#2c2417] focus:border-[#d4af37] text-white p-4 rounded-xl text-sm outline-none leading-relaxed"
          />
        </div>

        {error && (
          <div className="md:col-span-2 p-4 rounded-xl bg-[#260808] border border-[#ff4444] text-[#ff8888] text-xs">
            {error}
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={handleManifest}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-base uppercase rounded-xl cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Synthesizing V11 Smaran Master Asset...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Manifest V11 Papa’s Music / Universal Asset</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {scriptResult && (
        <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-400">
          {/* Action Hub */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#262016]">
            <h3 className="font-cinzel text-lg font-bold text-[#ffd700] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>V11 Manifestation Outputs</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(`/imagine prompt: ${scriptResult}`, "imagine")
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20180d] hover:bg-[#2d2213] border border-[#d4af37]/40 text-xs font-mono text-[#ffd700] cursor-pointer"
              >
                {copiedImagine ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>/imagine format</span>
              </button>
            </div>
          </div>

          {/* Master Script Card */}
          <div className="p-6 rounded-2xl bg-[#090806] border border-[#2c2417] relative group shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#d4af37] uppercase tracking-wider font-bold border-l-3 border-[#d4af37] pl-3">
                The V11 Smaran / Universal Master Script
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(scriptResult, "script")}
                className="flex items-center gap-1 px-3 py-1 bg-[#1a140b] hover:bg-[#2b2011] text-xs text-[#ffd700] rounded-lg border border-[#3b2d18] cursor-pointer"
              >
                {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedScript ? "Copied" : "Copy Script"}</span>
              </button>
            </div>
            <div className="text-sm md:text-base leading-relaxed text-[#ffd700] font-medium whitespace-pre-wrap selection:bg-[#d4af37]/30">
              {scriptResult}
            </div>
          </div>

          {/* Director Logic if available */}
          {logicResult && (
            <div className="p-5 rounded-xl bg-[#070604] border border-[#211a11] text-xs text-[#b8a994] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#d4af37] block font-bold mb-2">
                Universal Physics & Smaran Composition
              </span>
              <div className="whitespace-pre-line leading-relaxed font-mono">
                {logicResult}
              </div>
            </div>
          )}

          {/* Metadata JSON Block */}
          {jsonResult && (
            <div className="p-6 rounded-2xl bg-[#040404] border border-[#262016] relative shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#6abf6a] uppercase tracking-wider font-bold">
                  IBD Production Metadata (JSON)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(JSON.stringify(jsonResult, null, 2), "json")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-[#0d1f0d] hover:bg-[#152e15] text-xs text-[#6abf6a] rounded-lg border border-[#1f4a1f] cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedJson ? "Copied JSON" : "Copy JSON"}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-[#6abf6a] overflow-x-auto p-4 rounded-xl bg-black/60 border border-[#1b2b1b]">
                {JSON.stringify(jsonResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
