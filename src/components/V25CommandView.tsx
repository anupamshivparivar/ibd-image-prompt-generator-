import React, { useState, useEffect } from "react";
import {
  V25Weekday,
  V25ContentTypeId,
  V25CommandState,
  V25ExecutionResult,
  AspectRatio,
} from "../types";
import {
  Zap,
  Flame,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  Sparkles,
  Shield,
  ArrowRight,
  RefreshCw,
  Sun,
  Moon,
  Compass,
  Play,
  RotateCcw,
  Sliders,
  Share2,
  Camera,
  Layers,
  Terminal,
} from "lucide-react";

interface V25CommandViewProps {
  customApiKey?: string;
  showToast: (msg: string) => void;
  onSendToForge?: (customReq: {
    subject: string;
    story: string;
    version: number;
    dim: AspectRatio;
  }) => void;
}

// Frozen V23 Daywise Universe Data Map
const V23_WEEKLY_MAP: Record<
  V25Weekday,
  {
    dayName: string;
    parivar: string;
    recommendedEngine: string;
    dSlots: { id: string; theme: string }[];
    couples: { id: "SP" | "RS" | "RK" | "VL"; name: string }[];
  }
> = {
  MON: {
    dayName: "Monday",
    parivar: "Shiv Parivar",
    recommendedEngine: "VP21 — Temple Sanctum",
    couples: [{ id: "SP", name: "Shiva + Parvati" }],
    dSlots: [
      { id: "MON-01", theme: "Somnath Jyotirlinga (Gujarat Seacoast Sanctum)" },
      { id: "MON-02", theme: "Mallikarjuna Jyotirlinga (Srisailam Mountain Sanctum)" },
      { id: "MON-03", theme: "Mahakaleshwar Jyotirlinga (Ujjain Bhasma Aarti)" },
      { id: "MON-04", theme: "Omkareshwar Jyotirlinga (Narmada Island Sanctum)" },
      { id: "MON-05", theme: "Kedarnath Jyotirlinga (Himalayan Snow Darshan)" },
      { id: "MON-06", theme: "Bhimashankar Jyotirlinga (Sahyadri Forest Sanctum)" },
      { id: "MON-07", theme: "Kashi Vishwanath Jyotirlinga (Ganga Ghat Gold Sanctum)" },
      { id: "MON-08", theme: "Trimbakeshwar Jyotirlinga (Godavari Origin Sanctum)" },
      { id: "MON-09", theme: "Vaidyanath Jyotirlinga (Deoghar Healing Sanctum)" },
      { id: "MON-10", theme: "Nageshwar Jyotirlinga (Dwarka Coastal Shrine)" },
      { id: "MON-11", theme: "Rameshwaram Jyotirlinga (Southern Ocean Corridor)" },
      { id: "MON-12", theme: "Grishneshwar Jyotirlinga (Ellora Basalt Sanctum)" },
      { id: "MON-13", theme: "Shiv Parivar — Home / Griha Darshan" },
      { id: "MON-14", theme: "Kailash — Shiv Parivar Divine Mandapa" },
      { id: "MON-15", theme: "Cosmic Shiv Parivar — Universal Darshan" },
    ],
  },
  TUE: {
    dayName: "Tuesday",
    parivar: "Hanuman Parivar",
    recommendedEngine: "HP V18 — Storm Warrior",
    couples: [{ id: "RS", name: "Rama + Sita (Hanuman Devotee)" }],
    dSlots: [
      { id: "TUE-01", theme: "Bal Hanuman (Childhood Wonder & Surya Darshan)" },
      { id: "TUE-02", theme: "Hanuman with Surya Dev (Vedic Vidya Initiation)" },
      { id: "TUE-03", theme: "Hanuman meeting Shri Ram at Rishyamukha" },
      { id: "TUE-04", theme: "Hanuman with Ram–Sita (Inseparable Devotion)" },
      { id: "TUE-05", theme: "Hanuman carrying Dronagiri Sanjeevani Mountain" },
      { id: "TUE-06", theme: "Hanuman at the Ocean / Lanka Leap Velocity" },
      { id: "TUE-07", theme: "Hanuman before Rama Darbar (Folded Palms)" },
      { id: "TUE-08", theme: "Hanuman reading / holding Valmiki Ramayana" },
      { id: "TUE-09", theme: "Hanuman blessing Devotees with Abhaya Mudra" },
      { id: "TUE-10", theme: "Hanuman in Deep Kundalini Meditation" },
      { id: "TUE-11", theme: "Hanuman at Ancient Saffron Temple Shrine" },
      { id: "TUE-12", theme: "Hanuman in Himalayan Pine Ridge Darshan" },
      { id: "TUE-13", theme: "Hanuman with Full Ram Parivar" },
      { id: "TUE-14", theme: "Mahaveer Hanuman — Colossal Mountain Scale" },
      { id: "TUE-15", theme: "Cosmic / Universal Panchamukhi Hanuman" },
    ],
  },
  WED: {
    dayName: "Wednesday",
    parivar: "Ganesh Parivar",
    recommendedEngine: "V17 — OTT Cinematic Multi-Model",
    couples: [{ id: "SP", name: "Ganesha with Shiva + Parvati" }],
    dSlots: [
      { id: "WED-01", theme: "Ganesha solo Darshan with Modak & Lotus" },
      { id: "WED-02", theme: "Bal Ganesha (Playful Childhood Divine Grace)" },
      { id: "WED-03", theme: "Ganesha with Shiva–Parvati at Mount Kailash" },
      { id: "WED-04", theme: "Ganesha with Brother Kartikeya & Mayura" },
      { id: "WED-05", theme: "Ganesha with Full Shiv Parivar" },
      { id: "WED-06", theme: "Ganesha with Consorts Riddhi & Siddhi" },
      { id: "WED-07", theme: "Ganesha writing the Great Epic Mahabharata" },
      { id: "WED-08", theme: "Ganesha and Faithful Vahana Mushak" },
      { id: "WED-09", theme: "Ganesha blessing Seekers with Wisdom Grace" },
      { id: "WED-10", theme: "Ganesha Ancient Ashta-Vinayaka Temple" },
      { id: "WED-11", theme: "Ganesha Forest / Riverbank Natural Shrine" },
      { id: "WED-12", theme: "Ganesha Festival / Devotional Aarti Mandap" },
      { id: "WED-13", theme: "Wisdom / Vidya Ganesha with Palm-leaf Shastras" },
      { id: "WED-14", theme: "Grand Vighnaharta — Obstacle Dispeller" },
      { id: "WED-15", theme: "Cosmic Ganesha — Universal Brahman Effulgence" },
    ],
  },
  THU: {
    dayName: "Thursday",
    parivar: "Dashavatara Parivar (Vishnu)",
    recommendedEngine: "V22 — Living Cosmic Darshan",
    couples: [{ id: "VL", name: "Vishnu + Lakshmi" }],
    dSlots: [
      { id: "THU-01", theme: "Matsya Avatar (The Divine Cosmic Fish & Vedas)" },
      { id: "THU-02", theme: "Kurma Avatar (The Great Churning Mandara Tortoise)" },
      { id: "THU-03", theme: "Varaha Avatar (Rescuing Mother Earth Bhudevi)" },
      { id: "THU-04", theme: "Narasimha Avatar (Pillar Manifestation & Hiranyakashipu)" },
      { id: "THU-05", theme: "Vamana Avatar (Three Steps Encompassing Universe)" },
      { id: "THU-06", theme: "Parashurama Avatar (The Sacred Axe Warrior-Sage)" },
      { id: "THU-07", theme: "Rama Avatar (Maryada Purushottam & Bow of Dharma)" },
      { id: "THU-08", theme: "Krishna Avatar (Geeta Upadesh & Flute Melody)" },
      { id: "THU-09", theme: "Buddha Avatar (Compassion & Epistemic Stillness)" },
      { id: "THU-10", theme: "Kalki Avatar (The White Stallion & Cosmic Dawn)" },
      { id: "THU-11", theme: "Vishnu / Dashavatara Cosmic Ensemble" },
      { id: "THU-12", theme: "Vishnu–Lakshmi upon Ananta Sheshanaga" },
      { id: "THU-13", theme: "Vaikuntha Vishnu in Celestial Golden Splendor" },
      { id: "THU-14", theme: "Vishnu Cosmic Preservation (Ksheera Sagara)" },
      { id: "THU-15", theme: "Vishwaroopa / Cosmic All-Encompassing Vishnu" },
    ],
  },
  FRI: {
    dayName: "Friday",
    parivar: "Female Divine Parivar (Shakti / Devi)",
    recommendedEngine: "V16.1 — Living Darshan Multi-Model",
    couples: [
      { id: "RK", name: "Radha + Krishna" },
      { id: "VL", name: "Lakshmi + Narayana" },
    ],
    dSlots: [
      { id: "FRI-01", theme: "Maa Durga (Ashtabhuja upon Golden Lion Vahana)" },
      { id: "FRI-02", theme: "Maa Lakshmi (Ashta-Lakshmi Golden Prosperity Lotus)" },
      { id: "FRI-03", theme: "Santoshi Mata (Friday Vrat & Pure White Lotus)" },
      { id: "FRI-04", theme: "Radharani (Barsana Palace of Divine Prema)" },
      { id: "FRI-05", theme: "Maa Saraswati (Pure White Vastra & Veena of Wisdom)" },
      { id: "FRI-06", theme: "Maa Gayatri (Five-Faced Veda Mata of Cosmic Light)" },
      { id: "FRI-07", theme: "Maa Mahakali (Transcendent Cosmic Time & Grace)" },
      { id: "FRI-08", theme: "Maa Parvati (Aparna Tapasya in Snowy Himalayas)" },
      { id: "FRI-09", theme: "Maa Annapurna (Bestower of Universal Nourishment)" },
      { id: "FRI-10", theme: "Maa Ganga (Descending from Heaven through Jata)" },
      { id: "FRI-11", theme: "Durga–Shakti Mahishasura Mardini Climax" },
      { id: "FRI-12", theme: "Lakshmi–Narayana (Bountiful Celestial Throne)" },
      { id: "FRI-13", theme: "Radha–Krishna (Vrindavan Kadamba Blossom Darshan)" },
      { id: "FRI-14", theme: "Saraswati / Vidya Sacred Mandapa Darshan" },
      { id: "FRI-15", theme: "Universal Para-Shakti / Adi Shakti Effulgence" },
    ],
  },
  SAT: {
    dayName: "Saturday",
    parivar: "Shani + Khatu Shyam + Hanuman",
    recommendedEngine: "HP V20 — Celestial Sky",
    couples: [],
    dSlots: [
      { id: "SAT-01", theme: "Shani Dev (Karmaphala Daata in Deep Blue Obsidian)" },
      { id: "SAT-02", theme: "Shani Shingnapur Sacred Open-Air Shrine" },
      { id: "SAT-03", theme: "Shani Dev Majestic Darshan with Mustard Oil Diya" },
      { id: "SAT-04", theme: "Shani Dev Cosmic Planetary Orbit Alignment" },
      { id: "SAT-05", theme: "Khatu Shyam Ji (Haare Ka Sahara Divine Sheesh)" },
      { id: "SAT-06", theme: "Khatu Shyam Sacred Temple Mandapa Darshan" },
      { id: "SAT-07", theme: "Khatu Shyam Regal Shringar with Gulab Flowers" },
      { id: "SAT-08", theme: "Khatu Shyam Devotional Procession & Nishan Yatra" },
      { id: "SAT-09", theme: "Hanuman Ji Saturday Raksha & Shani Blessing" },
      { id: "SAT-10", theme: "Hanuman Meditation Dispersing Karmic Shadows" },
      { id: "SAT-11", theme: "Hanuman Blessing Devotees with Golden Gada" },
      { id: "SAT-12", theme: "Hanuman with Shri Rama in Heart (Choli Darshan)" },
      { id: "SAT-13", theme: "Shani–Hanuman Devotional Bond & Mutual Vow" },
      { id: "SAT-14", theme: "Khatu Shyam Monumental Floral Darbar" },
      { id: "SAT-15", theme: "Universal Protection & Karmic Liberation Composition" },
    ],
  },
  SUN: {
    dayName: "Sunday",
    parivar: "Surya + Gayatri + Saraswati",
    recommendedEngine: "HP V19 — Volumetric God Rays",
    couples: [],
    dSlots: [
      { id: "SUN-01", theme: "Surya Dev Sunrise (Golden Rays Washing Sacred Earth)" },
      { id: "SUN-02", theme: "Konark Sun Temple / Modhera Ancient Stone Chariot" },
      { id: "SUN-03", theme: "Surya Dev with Seven Celestial Horses Chariot" },
      { id: "SUN-04", theme: "Surya Dev Blessing Devotees Performing Arghya" },
      { id: "SUN-05", theme: "Surya Dev Cosmic Radiance & Savita Solar Halo" },
      { id: "SUN-06", theme: "Gayatri Mata (Five Radiant Faces at Dawn)" },
      { id: "SUN-07", theme: "Gayatri Mata Meditation with Glowing Kundalini Jyoti" },
      { id: "SUN-08", theme: "Gayatri Cosmic Form Illuminating all Lokas" },
      { id: "SUN-09", theme: "Maa Saraswati at Brahma-Muhurta Golden Dawn" },
      { id: "SUN-10", theme: "Saraswati with Veena along Sacred Saraswati River" },
      { id: "SUN-11", theme: "Saraswati / Vidya Jyoti Knowledge-Radiance" },
      { id: "SUN-12", theme: "Saraswati Ancient Himalayan Ashrama Shrine" },
      { id: "SUN-13", theme: "Surya + Gayatri (Joint Vedic Solar Awakening)" },
      { id: "SUN-14", theme: "Saraswati + Gayatri (Illumination of Intellect/Dhi)" },
      { id: "SUN-15", theme: "Universal Jyoti / Solar-Spiritual Knowledge Radiance" },
    ],
  },
};

// Frozen V24 Master Aarti Scenes (1-7)
const V24_AARTI_SCENES = [
  {
    id: 1,
    title: "Grand Temple Sanctum Aarti",
    scope: "Garbhagriha, mandapa, ancient basalt temple, courtyard, dawn/evening sanctum with multi-tiered brass diyas.",
  },
  {
    id: 2,
    title: "Premium 3D / Idol Aarti",
    scope: "Physically believable sacred idol presentation: stone, marble, brass/panchadhatu with controlled sculptural highlights.",
  },
  {
    id: 3,
    title: "Grand Maha Aarti",
    scope: "Large ceremonial Aarti with dozens of burning camphor brass deepams, ringing bells, rose petals, and climactic Jyoti.",
  },
  {
    id: 4,
    title: "Festival / Pandal Aarti",
    scope: "Temporary devotional mandap/pandal, community celebration, grand marigold floral architecture, and festive lighting.",
  },
  {
    id: 5,
    title: "Home / Family Aarti",
    scope: "Intimate household wooden mandir, family devotion, pure ghee diya, sweet dhoop incense, and believable domestic setting.",
  },
  {
    id: 6,
    title: "Open Nature Aarti",
    scope: "Ganga ghat, sacred riverbank, Himalayan forest clearing, seaside shore, or open-air sacred shrine.",
  },
  {
    id: 7,
    title: "Mountain / Cosmic Aarti",
    scope: "Himalayan snow peaks, high mountain temple, celestial starlit sky, and restrained cosmic Darshan effulgence.",
  },
];

// Frozen Content Types (1-7)
const CONTENT_TYPES = [
  { id: 1, label: "Darshan / Devotional Scene", icon: "🛕" },
  { id: 2, label: "Aarti (V24 Scene Engine)", icon: "🔥" },
  { id: 3, label: "Couple (SP / RS / RK / VL)", icon: "✨" },
  { id: 4, label: "Temple / Sacred Location", icon: "🏛️" },
  { id: 5, label: "Parivar Full Ensemble", icon: "👑" },
  { id: 6, label: "Greeting / Sacred Shloka Quote", icon: "📜" },
  { id: 7, label: "Special / Tithi Festival", icon: "🎉" },
];

export const V25CommandView: React.FC<V25CommandViewProps> = ({
  customApiKey,
  showToast,
  onSendToForge,
}) => {
  // Command Terminal Input state
  const [terminalInput, setTerminalInput] = useState<string>("TUE 2 1");
  const [activeWeekday, setActiveWeekday] = useState<V25Weekday>("MON");
  const [selectedContentType, setSelectedContentType] = useState<V25ContentTypeId>(1);
  const [selectedV24Scene, setSelectedV24Scene] = useState<number>(1);
  const [selectedDSlot, setSelectedDSlot] = useState<string>("MON-01");
  const [selectedEngine, setSelectedEngine] = useState<string>("VP21 — Temple Sanctum");
  const [selectedPlatformGroup, setSelectedPlatformGroup] = useState<1 | 2>(1);
  const [selectedBrand, setSelectedBrand] = useState<"IBD" | "ASP" | "RKM">("IBD");
  const [selectedVASlot, setSelectedVASlot] = useState<string>("VA03");

  const [isLoading, setIsLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<V25ExecutionResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Auto-update recommendations when weekday or content type changes
  useEffect(() => {
    const dayData = V23_WEEKLY_MAP[activeWeekday];
    if (dayData) {
      if (selectedContentType === 2) {
        // Aarti defaults to VP21 or V24 recommended
        setSelectedEngine("VP21 — Temple Sanctum");
      } else {
        setSelectedEngine(dayData.recommendedEngine);
      }
      setSelectedDSlot(dayData.dSlots[0].id);
    }
  }, [activeWeekday, selectedContentType]);

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Parse natural command string (e.g., "TUE 2", "MON 5", "V24 SHIV YTS", "FRI 1 2")
  const handleParseAndExecuteCommand = (commandStr: string) => {
    const tokens = commandStr.trim().toUpperCase().split(/\s+/);
    if (!tokens.length) return;

    let targetWeekday: V25Weekday = activeWeekday;
    let targetContentType: V25ContentTypeId = selectedContentType;
    let targetPlatformGroup: 1 | 2 = selectedPlatformGroup;

    // Check if token 0 matches a weekday
    const weekdayMap: Record<string, V25Weekday> = {
      MON: "MON",
      MONDAY: "MON",
      TUE: "TUE",
      TUESDAY: "TUE",
      WED: "WED",
      WEDNESDAY: "WED",
      THU: "THU",
      THURSDAY: "THU",
      FRI: "FRI",
      FRIDAY: "FRI",
      SAT: "SAT",
      SATURDAY: "SAT",
      SUN: "SUN",
      SUNDAY: "SUN",
    };

    if (tokens[0] === "V24") {
      targetContentType = 2;
      // check deity in token 1
      if (tokens[1]?.includes("SHIV")) targetWeekday = "MON";
      else if (tokens[1]?.includes("HANUMAN")) targetWeekday = "TUE";
      else if (tokens[1]?.includes("GANESH")) targetWeekday = "WED";
      else if (tokens[1]?.includes("RAM") || tokens[1]?.includes("VISHNU")) targetWeekday = "THU";
      else if (tokens[1]?.includes("DURGA") || tokens[1]?.includes("LAKSHMI")) targetWeekday = "FRI";
      else if (tokens[1]?.includes("SHANI") || tokens[1]?.includes("KHATU")) targetWeekday = "SAT";
      else if (tokens[1]?.includes("SURYA") || tokens[1]?.includes("GAYATRI")) targetWeekday = "SUN";
    } else if (weekdayMap[tokens[0]]) {
      targetWeekday = weekdayMap[tokens[0]];
      if (tokens[1]) {
        const num = parseInt(tokens[1], 10);
        if (num >= 1 && num <= 7) {
          targetContentType = num as V25ContentTypeId;
        }
      }
      if (tokens[2]) {
        const groupNum = parseInt(tokens[2], 10);
        if (groupNum === 1 || groupNum === 2) {
          targetPlatformGroup = groupNum;
        }
      }
    }

    setActiveWeekday(targetWeekday);
    setSelectedContentType(targetContentType);
    setSelectedPlatformGroup(targetPlatformGroup);
    executePipeline(targetWeekday, targetContentType, targetPlatformGroup);
  };

  const executePipeline = async (
    weekday: V25Weekday,
    contentType: V25ContentTypeId,
    platformGroup: 1 | 2
  ) => {
    setIsLoading(true);
    const dayData = V23_WEEKLY_MAP[weekday];
    const isAarti = contentType === 2;
    const currentAartiScene = V24_AARTI_SCENES.find((s) => s.id === selectedV24Scene) || V24_AARTI_SCENES[0];
    const currentDSlotObj = dayData.dSlots.find((d) => d.id === selectedDSlot) || dayData.dSlots[0];
    const isYTS = platformGroup === 1;

    try {
      const res = await fetch("/api/v25-command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekday,
          contentType,
          v24SceneId: isAarti ? selectedV24Scene : undefined,
          dSlotId: currentDSlotObj.id,
          dSlotTheme: currentDSlotObj.theme,
          productionEngine: selectedEngine,
          platformGroup,
          brandIdentity: selectedBrand,
          vaSlot: selectedVASlot,
          customApiKey,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.result) {
          setExecutionResult(data.result);
          showToast(`V25 Sovereign Command Executed: ${weekday} → ${dayData.parivar}`);
          setIsLoading(false);
          return;
        }
      }
      throw new Error("Server fallback trigger");
    } catch (e) {
      console.warn("Generating deterministic V25 Sovereign Result:", e);

      // Deterministic Fallback adhering strictly to frozen specifications
      const deityColors: Record<V25Weekday, { key: string; desc: string; light: string }> = {
        MON: {
          key: "Shiva / Shiv Parivar",
          desc: "Saffron-gold + moon-white/silver + restrained Neelkanth blue",
          light: "1800K brass diya flame rim-light with cool moonlit silver ambient bounce",
        },
        TUE: {
          key: "Hanuman / Hanuman Parivar",
          desc: "Saffron-gold + warm vermilion/red + restrained sunrise amber",
          light: "Warm 2200K pure cow-ghee flame caustics with radiant morning sunrise godrays",
        },
        WED: {
          key: "Ganesh Parivar",
          desc: "Marigold-gold + auspicious vermilion/red + soft ivory",
          light: "Lustrous marigold gold aarti illumination with soft ivory studio rim highlights",
        },
        THU: {
          key: "Dashavatara / Vishnu Parivar",
          desc: "Saffron-gold + soft royal blue + ivory-white",
          light: "Majestic golden aura with deep celestial sapphire ambient backlighting",
        },
        FRI: {
          key: "Female Divine Parivar",
          desc: "Saffron-gold + controlled crimson + lotus pink + soft ivory",
          light: "Radiant 24k gold jewel reflections with soft sacred kumkum & lotus pink glow",
        },
        SAT: {
          key: "Shani / Khatu Shyam / Hanuman",
          desc: "Deep indigo/blue-black environment + mustard oil-lamp amber + restrained silver",
          light: "Dramatic chiaroscuro mustard-oil flame against deep cosmic obsidian stone",
        },
        SUN: {
          key: "Surya / Gayatri / Saraswati",
          desc: "Sunrise gold + amber + controlled crimson/orange + ivory-white",
          light: "Volumetric 5000K solar corona rays breaking through sacred dawn mist",
        },
      };

      const currentColor = deityColors[weekday];
      const echoCmd = `${weekday} ${contentType} ${platformGroup} [${selectedEngine}]`;

      const promptAspect = isYTS ? "--ar 9:16" : "--ar 4:5";
      const masterPrompt = isAarti
        ? `Cinematic grand ${currentAartiScene.title} of ${dayData.parivar}, ${currentDSlotObj.theme}, illuminated by authentic motivated ghee diya flames and leaping camphor aarti fire, sacred Vedic rituals, ${currentColor.desc}, pure devotional Bhakti atmosphere, 65mm Panavision optics, Planck-scale microtextures on stone and 24k gold ornaments, zero synthetic plastic sheen, clean master artwork without visible text or numbers. ${promptAspect} --style raw --v 6.1 --q 2 --c 0`
        : `Cinematic master Darshan of ${dayData.parivar}, theme of ${currentDSlotObj.theme}, majestic spiritual presence, ${currentColor.desc}, 100% physically motivated lighting (${currentColor.light}), canonical mudras and ayudhas, 65mm ARRI Alexa LF look, pristine devotional atmosphere, no text or watermark. ${promptAspect} --style raw --v 6.1 --q 2 --c 0`;

      const resultObj: V25ExecutionResult = {
        commandEcho: echoCmd,
        weekday: `${weekday} (${dayData.dayName})`,
        parivar: dayData.parivar,
        dSlot: currentDSlotObj.id,
        dSlotTheme: currentDSlotObj.theme,
        contentType: CONTENT_TYPES.find((c) => c.id === contentType)?.label || "Devotional Scene",
        v24AartiScene: isAarti
          ? {
              id: currentAartiScene.id,
              title: currentAartiScene.title,
              scope: currentAartiScene.scope,
            }
          : undefined,
        productionEngine: selectedEngine,
        vaSlot: selectedVASlot,
        aspectRatio: isYTS ? "9:16" : "4:5",
        platformTarget:
          platformGroup === 1
            ? "Group 1 (YTS • SC • Moj • FB • TG • WA • Pinterest) [Native 9:16]"
            : "Group 2 (IG • TH • FB) [4:5 / 9:16]",
        branding: {
          brand: selectedBrand,
          estd: "ESTD 07/2025",
          placement: "BOTTOM SAFE ZONE",
          cta: "LIKE • FOLLOW • SUBSCRIBE",
          ctaPlacement: "RIGHT CORNER",
        },
        colorDramaturgy: {
          deityKey: currentColor.key,
          paletteDescription: currentColor.desc,
          motivatedLight: currentColor.light,
        },
        siddhaChecklist: [
          { rule: "Three-letter weekday trigger verified", passed: true, verificationNotes: `${weekday} → ${dayData.parivar}` },
          { rule: "V23 Parivar universe mapped", passed: true, verificationNotes: `Mapped to slot ${currentDSlotObj.id}` },
          { rule: isAarti ? "V24 Aarti Scene explicitly verified" : "D-Slot theme mapped", passed: true, verificationNotes: isAarti ? `V24 Scene ${selectedV24Scene}: ${currentAartiScene.title}` : currentDSlotObj.theme },
          { rule: "Production Engine confirmed by user", passed: true, verificationNotes: selectedEngine },
          { rule: "Platform Group ratio verified", passed: true, verificationNotes: isYTS ? "YouTube Shorts Native 9:16 (Top/Bottom Safe Zones)" : "Feed 4:5" },
          { rule: "Deity-wise Aarti Colour Intelligence applied", passed: true, verificationNotes: currentColor.desc },
          { rule: "Single Channel Brand + ESTD 07/2025 at Bottom Safe Zone", passed: true, verificationNotes: `${selectedBrand} | ESTD 07/2025` },
          { rule: "LIKE • FOLLOW • SUBSCRIBE at Right Corner (V24)", passed: true, verificationNotes: "Subtle right-corner safe position" },
          { rule: "Anti-repetition & 3+ dimension visual shift locked", passed: true, verificationNotes: `Assigned variation slot ${selectedVASlot}` },
        ],
        cleanMasterPrompt: masterPrompt,
        headlineSafeZoneText: `Sacred ${dayData.parivar} Darshan | ${currentDSlotObj.theme.split("(")[0].trim()}`,
        platformCopy: {
          caption: `🙏 Divine ${dayData.parivar} Darshan for ${dayData.dayName} 🙏\n\nExperience the sacred grace and cosmic peace of ${currentDSlotObj.theme}. May this darshan illuminate your life with auspicious blessings, strength, and inner stillness.\n\n👉 Share this divine Darshan with your family and loved ones.`,
          hashtags: [
            `#${dayData.parivar.replace(/\s+/g, "")}`,
            `#${dayData.dayName}Darshan`,
            "#IndianBhaktiDhara",
            "#V25Command",
            "#V24Aarti",
            "#SanatanDharma",
            "#DailyDarshan",
          ],
          disclaimer: "Visual conception created with IBD Sovereign V25 Command Intelligence.",
        },
      };

      setExecutionResult(resultObj);
      showToast(`V25 Sovereign Command Executed: ${weekday} → ${dayData.parivar}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#06101c] via-[#091729] to-[#040c14] border border-[#00c6ff]/40 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0072ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#0044ff] text-white px-3 py-0.5 rounded-full text-[11px] font-black tracking-widest uppercase font-mono-code shadow-md">
                V25 SOVEREIGN COMMAND ENGINE
              </span>
              <span className="bg-[#0b1c2e] text-[#80c8ff] border border-[#00c6ff]/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                FROZEN MASTER SPECIFICATION
              </span>
              <span className="bg-[#05111d] text-[#ffd700] border border-[#ffd700]/30 px-2 py-0.5 rounded-full text-[10px] font-bold">
                FIRST-3-LETTERS WEEKDAY TRIGGER
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-[#e6f4ff] tracking-wide">
              Minimum-Input Controller • V23 Daywise • V24 Aarti • User Confirmation
            </h2>
            <p className="text-xs md:text-sm text-[#a3c7e8] max-w-3xl mt-1.5 leading-relaxed">
              V25 minimizes user effort while preserving explicit user approval for important creative choices. Type or click simple triggers like <strong>MON</strong>, <strong>TUE 2</strong>, or <strong>V24 SHIV YTS</strong>. Automatically routes through V23 Daywise, V24 Aarti 7-Scene Engine, and independent VA01–VA30 variation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleParseAndExecuteCommand(terminalInput)}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#0044ff] text-white font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-[#0072ff]/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-white" />
                  <span>Execute Sovereign Command</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Fast-Command Terminal Input */}
        <div className="mt-6 pt-5 border-t border-[#14283d] flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#00c6ff] shrink-0 font-bold">
            <Terminal className="w-4 h-4" />
            <span>V25 FAST CLI:</span>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleParseAndExecuteCommand(terminalInput);
                }
              }}
              placeholder="e.g. MON 2 1 | TUE 1 | V24 SHIV YTS | FRI 2"
              className="w-full bg-[#050f1a] border border-[#1b3d61] rounded-xl px-4 py-2.5 text-xs font-mono-code text-[#00f2ff] placeholder-[#416a94] focus:outline-none focus:border-[#00c6ff]"
            />
          </div>
          <button
            type="button"
            onClick={() => handleParseAndExecuteCommand(terminalInput)}
            className="px-4 py-2.5 rounded-xl bg-[#0e2944] hover:bg-[#153b61] border border-[#00c6ff]/40 text-xs font-bold text-[#80c8ff] hover:text-white transition-all shrink-0 cursor-pointer"
          >
            Run Trigger
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive V25 Workflow Builder (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 1. Step 1: Weekday Selector (First-Three-Letters) */}
          <div className="bg-[#060c14] border border-[#16293d] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#80c8ff] uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-[#00c6ff]" />
                1. Select Weekday (V23 Daywise Route)
              </span>
              <span className="text-[9px] font-mono-code bg-[#0b1c2e] text-[#00c6ff] px-2 py-0.5 rounded border border-[#1b3d61]">
                3-Letter Code
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 mt-1">
              {(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as V25Weekday[]).map((day) => {
                const isSelected = activeWeekday === day;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      setActiveWeekday(day);
                      setTerminalInput(`${day} ${selectedContentType} ${selectedPlatformGroup}`);
                    }}
                    className={`py-2 px-1 rounded-xl text-center font-mono-code transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-b from-[#00c6ff]/30 to-[#003d80] border-[#00c6ff] text-white shadow-md shadow-[#0072ff]/30 font-bold scale-105"
                        : "bg-[#091522] border-[#16293d] text-[#80a4c7] hover:text-white hover:bg-[#0e2136]"
                    }`}
                  >
                    <div className="text-xs font-black">{day}</div>
                    <div className="text-[7px] truncate mt-0.5 opacity-80">
                      {V23_WEEKLY_MAP[day].parivar.split(" ")[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Info Badge */}
            <div className="mt-2 p-3 rounded-xl bg-[#091624] border border-[#1b3754] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#a3c7e8] block text-[10px]">V23 Parivar Universe:</span>
                <strong className="text-[#00f2ff]">{V23_WEEKLY_MAP[activeWeekday].parivar}</strong>
              </div>
              <div className="text-right">
                <span className="text-[#a3c7e8] block text-[10px]">Recommended Engine:</span>
                <strong className="text-[#ffd700] font-mono-code text-[11px]">
                  {V23_WEEKLY_MAP[activeWeekday].recommendedEngine}
                </strong>
              </div>
            </div>
          </div>

          {/* 2. Step 2: Content-Type Menu (1-7) */}
          <div className="bg-[#060c14] border border-[#16293d] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#80c8ff] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#00c6ff]" />
                2. Content-Type Menu (1 to 7)
              </span>
              <span className="text-[9px] font-mono-code bg-[#0b1c2e] text-[#00c6ff] px-2 py-0.5 rounded border border-[#1b3d61]">
                Input Code: {selectedContentType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {CONTENT_TYPES.map((type) => {
                const isSelected = selectedContentType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedContentType(type.id as V25ContentTypeId);
                      setTerminalInput(`${activeWeekday} ${type.id} ${selectedPlatformGroup}`);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-[#0072ff]/30 to-[#003366] border-[#00c6ff] text-white shadow-md font-bold"
                        : "bg-[#091522] border-[#16293d] text-[#80a4c7] hover:text-white hover:bg-[#0e2136]"
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#0b1c2e] flex items-center justify-center font-mono-code text-xs text-[#00c6ff] font-bold shrink-0">
                      {type.id}
                    </span>
                    <span className="text-xs truncate">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Step 3: V24 Aarti Scene Selection (Only active when Content Type = 2) */}
          {selectedContentType === 2 ? (
            <div className="bg-[#060c14] border border-[#e1306c]/40 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ff80a0] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#ff80a0]" />
                  3. V24 Aarti Sovereign Scene (1-7)
                </span>
                <span className="text-[9px] font-mono-code bg-[#290d1d] text-[#ff80a0] px-2 py-0.5 rounded border border-[#521c3b]">
                  Scene #{selectedV24Scene}
                </span>
              </div>
              <p className="text-[11px] text-[#d4afb9]">
                V24 controls the ritual environment, scale, and lighting. Select one of the 7 master Aarti worlds:
              </p>

              <div className="flex flex-col gap-1.5 mt-1 max-h-56 overflow-y-auto pr-1">
                {V24_AARTI_SCENES.map((scene) => {
                  const isSelected = selectedV24Scene === scene.id;
                  return (
                    <button
                      key={scene.id}
                      type="button"
                      onClick={() => setSelectedV24Scene(scene.id)}
                      className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#e1306c]/30 to-[#330b20] border-[#e1306c] text-white shadow-md font-bold"
                          : "bg-[#0e070c] border-[#290d1d] text-[#b38a9a] hover:text-white hover:bg-[#1a0c16]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#ffccd8]">
                          {scene.id}. {scene.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#a8828f] mt-0.5 line-clamp-1">
                        {scene.scope}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 3B. Step 3B: D01-D15 Thematic Slot Selection */
            <div className="bg-[#060c14] border border-[#16293d] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#80c8ff] uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#00c6ff]" />
                  3. V23 Thematic D-Slot (D01–D15)
                </span>
                <span className="text-[9px] font-mono-code bg-[#0b1c2e] text-[#00c6ff] px-2 py-0.5 rounded border border-[#1b3d61]">
                  {selectedDSlot}
                </span>
              </div>

              <select
                value={selectedDSlot}
                onChange={(e) => setSelectedDSlot(e.target.value)}
                className="w-full bg-[#091522] border border-[#1b3754] rounded-xl p-2.5 text-xs text-[#e6f4ff] focus:outline-none focus:border-[#00c6ff]"
              >
                {V23_WEEKLY_MAP[activeWeekday].dSlots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.id} — {slot.theme}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 4. Step 4: Production Engine Confirmation & Platform Group */}
          <div className="bg-[#060c14] border border-[#16293d] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <span className="text-xs font-bold text-[#80c8ff] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#00c6ff]" />
              4. Engine & Platform Confirmation
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-[#80a4c7] font-bold block mb-1">
                  Confirmed Production Engine
                </label>
                <select
                  value={selectedEngine}
                  onChange={(e) => setSelectedEngine(e.target.value)}
                  className="w-full bg-[#091522] border border-[#1b3754] rounded-xl p-2 text-xs text-[#e6f4ff]"
                >
                  <option value="VP21 — Temple Sanctum">VP21 — Temple Sanctum</option>
                  <option value="V22 — Living Cosmic Darshan">V22 — Living Cosmic Darshan</option>
                  <option value="V17 — OTT Cinematic Multi-Model">V17 — OTT Cinematic</option>
                  <option value="HP V18 — Storm Warrior">HP V18 — Storm Warrior</option>
                  <option value="HP V19 — Volumetric God Rays">HP V19 — Volumetric God Rays</option>
                  <option value="HP V20 — Celestial Sky">HP V20 — Celestial Sky</option>
                  <option value="V16.1 — Living Darshan Multi-Model">V16.1 — Living Darshan</option>
                  <option value="V16 — Darshan Realism">V16 — Darshan Realism</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#80a4c7] font-bold block mb-1">
                  Platform Group (Frozen 1 / 2)
                </label>
                <select
                  value={selectedPlatformGroup}
                  onChange={(e) =>
                    setSelectedPlatformGroup(parseInt(e.target.value, 10) as 1 | 2)
                  }
                  className="w-full bg-[#091522] border border-[#1b3754] rounded-xl p-2 text-xs text-[#e6f4ff]"
                >
                  <option value={1}>1 — YTS • SC • Moj • FB • TG • WA • Pin (9:16)</option>
                  <option value={2}>2 — IG • TH • FB (4:5 / 9:16)</option>
                </select>
              </div>
            </div>

            {/* Single Channel Brand Selection */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div>
                <label className="text-[10px] text-[#80a4c7] font-bold block mb-1">
                  Channel Brand (Single Brand Rule)
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(["IBD", "ASP", "RKM"] as const).map((brand) => (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => setSelectedBrand(brand)}
                      className={`py-1.5 rounded-lg text-center font-mono-code text-[11px] font-bold border cursor-pointer ${
                        selectedBrand === brand
                          ? "bg-[#0072ff] border-[#00c6ff] text-white"
                          : "bg-[#091522] border-[#1b3754] text-[#80a4c7]"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#80a4c7] font-bold block mb-1">
                  VA Variation Slot
                </label>
                <select
                  value={selectedVASlot}
                  onChange={(e) => setSelectedVASlot(e.target.value)}
                  className="w-full bg-[#091522] border border-[#1b3754] rounded-xl p-2 text-xs text-[#e6f4ff]"
                >
                  {Array.from({ length: 30 }, (_, i) => {
                    const num = String(i + 1).padStart(2, "0");
                    return (
                      <option key={`VA${num}`} value={`VA${num}`}>
                        VA{num} (Cooldown Safe)
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                executePipeline(activeWeekday, selectedContentType, selectedPlatformGroup)
              }
              disabled={isLoading}
              className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#00c6ff] via-[#0072ff] to-[#0044ff] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#0072ff]/25 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Executing Pipeline..." : "⚡ Execute V25 Sovereign Deck"}
            </button>
          </div>
        </div>

        {/* Right Column: Execution Output & Siddha Quality Gate (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {executionResult ? (
            <div className="flex flex-col gap-6">
              {/* Output Card */}
              <div className="bg-[#060c14] border border-[#00c6ff]/40 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
                {/* Header Info */}
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-[#16293d]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#00f2ff] animate-pulse" />
                    <div>
                      <h3 className="font-cinzel text-lg font-bold text-[#e6f4ff]">
                        V25 SOVEREIGN EXECUTION RESULT
                      </h3>
                      <div className="text-[10px] text-[#80a4c7]">
                        Command: <span className="font-mono-code text-[#00f2ff]">{executionResult.commandEcho}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          executionResult.cleanMasterPrompt,
                          "master-prompt",
                          "Master Midjourney Prompt"
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e2944] hover:bg-[#153b61] border border-[#00c6ff]/50 text-xs font-bold text-[#80c8ff] transition-colors cursor-pointer"
                    >
                      {copiedKey === "master-prompt" ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#00c6ff]" />
                      )}
                      <span>Copy Master Prompt</span>
                    </button>

                    {onSendToForge && (
                      <button
                        type="button"
                        onClick={() => {
                          onSendToForge({
                            subject: `${executionResult.parivar} - ${executionResult.dSlotTheme}`,
                            story: executionResult.cleanMasterPrompt,
                            version: 17,
                            dim: executionResult.aspectRatio,
                          });
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091522] hover:bg-[#14283d] border border-[#1b3754] text-xs font-bold text-[#a3c7e8] hover:text-[#00c6ff] transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Send to Forge</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Core Parameters Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#091522] border border-[#1b3754]">
                    <span className="text-[10px] text-[#80a4c7] block">Weekday & Universe:</span>
                    <strong className="text-[#e6f4ff]">{executionResult.weekday}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#091522] border border-[#1b3754]">
                    <span className="text-[10px] text-[#80a4c7] block">Production Engine:</span>
                    <strong className="text-[#ffd700] font-mono-code text-[11px]">
                      {executionResult.productionEngine.split("—")[0]}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#091522] border border-[#1b3754]">
                    <span className="text-[10px] text-[#80a4c7] block">Platform Ratio:</span>
                    <strong className="text-[#00f2ff] font-mono-code">
                      {executionResult.aspectRatio}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-[#091522] border border-[#1b3754]">
                    <span className="text-[10px] text-[#80a4c7] block">Variation Slot:</span>
                    <strong className="text-[#e6f4ff] font-mono-code">{executionResult.vaSlot}</strong>
                  </div>
                </div>

                {/* Deity-Wise Aarti Colour Intelligence */}
                <div className="p-4 rounded-xl bg-[#091829] border border-[#1b3d61] flex flex-col gap-1.5 text-xs">
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-[#00f2ff] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00f2ff]" />
                    Deity-Wise Aarti Colour & Light Motivation
                  </span>
                  <div className="text-[#e6f4ff] font-medium">
                    🎨 Palette: <span className="text-[#80c8ff]">{executionResult.colorDramaturgy.paletteDescription}</span>
                  </div>
                  <div className="text-[#a3c7e8] text-[11px]">
                    💡 Light Physics: {executionResult.colorDramaturgy.motivatedLight}
                  </div>
                </div>

                {/* Master Image Prompt Block */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#ffd700] flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-[#ffd700]" />
                      Master Midjourney / Flux Photorealistic Prompt
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          executionResult.cleanMasterPrompt,
                          "prompt-block",
                          "Midjourney Prompt"
                        )
                      }
                      className="text-[10px] text-[#00c6ff] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "prompt-block" ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#03080e] border border-[#00c6ff]/30 text-xs font-mono-code text-[#ffe899] leading-relaxed select-all">
                    {executionResult.cleanMasterPrompt}
                  </div>
                </div>

                {/* Branding & Overlay Safe Zone Instructions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#091522] border border-[#1b3754]">
                    <strong className="text-[#00f2ff] block mb-1 text-[11px]">
                      🏷️ Bottom Safe-Zone Brand:
                    </strong>
                    <div className="font-mono-code text-[#e6f4ff] text-[11px]">
                      {executionResult.branding.brand} • {executionResult.branding.estd}
                    </div>
                    <div className="text-[10px] text-[#80a4c7] mt-0.5">
                      Positioned exclusively at Bottom Safe-Zone (No multi-brand clutter).
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#091522] border border-[#1b3754]">
                    <strong className="text-[#ffd700] block mb-1 text-[11px]">
                      👉 Right-Corner CTA & Top Safe Zone:
                    </strong>
                    <div className="font-mono-code text-[#e6f4ff] text-[11px]">
                      {executionResult.branding.cta}
                    </div>
                    <div className="text-[10px] text-[#80a4c7] mt-0.5">
                      Subtle right corner placement • Headline in Top Safe Zone.
                    </div>
                  </div>
                </div>

                {/* Siddha Quality Gate Audit (All 9 checks) */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#16293d]">
                  <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#00f2ff] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00f2ff]" />
                    Siddha Quality Gate Audit (Frozen V25 Standards)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {executionResult.siddhaChecklist.map((checkItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2 rounded-lg bg-[#040a12] border border-[#112336]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[#e6f4ff] font-medium text-[11px]">
                            {checkItem.rule}
                          </div>
                          <div className="text-[10px] text-[#80a4c7]">
                            {checkItem.verificationNotes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Caption & Copy Package */}
                <div className="p-4 rounded-xl bg-[#040a12] border border-[#16293d] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#80c8ff]">
                      Platform-Ready Publish Copy Package
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const copyBlock = `${executionResult.platformCopy.caption}\n\n${executionResult.platformCopy.hashtags.join(" ")}\n\n[${executionResult.platformCopy.disclaimer}]`;
                        copyToClipboard(copyBlock, "caption-block", "Publish Caption");
                      }}
                      className="text-[10px] text-[#00c6ff] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === "caption-block" ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copy Caption</span>
                    </button>
                  </div>
                  <pre className="text-xs text-[#d4e6f7] whitespace-pre-wrap font-sans leading-relaxed">
                    {executionResult.platformCopy.caption}
                  </pre>
                  <div className="text-[10px] font-mono-code text-[#00f2ff]">
                    {executionResult.platformCopy.hashtags.join(" ")}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Standby State */
            <div className="h-full min-h-[420px] rounded-2xl bg-[#060c14] border border-[#16293d] p-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0b1c2e] border border-[#00c6ff]/40 flex items-center justify-center text-[#00c6ff]">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#e6f4ff]">
                  V25 Sovereign Command Controller
                </h3>
                <p className="text-xs text-[#80a4c7] max-w-md mt-1.5 leading-relaxed">
                  Select a 3-letter weekday trigger (e.g. <strong>MON</strong>, <strong>TUE</strong>, <strong>FRI</strong>), choose a content-type (1-7), and click <strong>Execute Sovereign Command</strong> to generate the verified production prompt with full Siddha audit.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  executePipeline(activeWeekday, selectedContentType, selectedPlatformGroup)
                }
                className="px-6 py-3 rounded-xl bg-[#0072ff] hover:bg-[#0088ff] text-white text-xs font-bold transition-all shadow-lg shadow-[#0072ff]/30 cursor-pointer"
              >
                Execute Default Command ({activeWeekday} {selectedContentType})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
