export type AspectRatio = "16:9" | "9:16" | "2:3" | "21:9" | "1:1" | "4:5";

export type TargetEngine =
  | "Midjourney v6.1"
  | "Flux 1.1 Pro"
  | "Ideogram 2.0"
  | "Imagen 3"
  | "SDXL";

export type StudioEngineTab =
  | "darshan" // V1-V10 & V-Paratpar
  | "v26-carousel" // V26 Carousel Production Engine
  | "sovereign-v15-v21" // V15-V21 Sovereign Deck & Production Hierarchy
  | "universal" // V11 Sarva-Srishti
  | "vishwa-varta" // V12 Viral Engine
  | "samvaad" // V13 Community Architect
  | "dharma-sutra"; // V14 Global Narrative Architect

export interface V26CarouselSlide {
  slideNumber: number;
  role: "HOOK" | "CONTEXT" | "BUILD" | "REVELATION" | "EMOTION" | "SCALE / CONSEQUENCE" | "PAYOFF";
  objective: string;
  shotType: string;
  cameraLens: string;
  lightingDramaturgy: string;
  visualDescription: string;
  continuityLocks: string;
  variationDimensions: string[];
  masterImagePrompt: string;
  overlayTextSuggestion?: string;
}

export interface V26CarouselRequest {
  subject: string;
  concept: string;
  slideCount?: number;
  platform?: "Instagram" | "Threads" | "WhatsApp" | "All Platforms";
  aspectRatio?: AspectRatio;
  targetEngine?: TargetEngine;
  toneGenre?: string;
  customApiKey?: string;
}

export interface V26CarouselResult {
  conceptBrief: {
    title: string;
    coreDirective: string;
    targetPlatform: string;
    aspectRatio: string;
    totalSlides: number;
    visualBible: {
      characterDNA: string;
      costumeJewellery: string;
      worldArchitecture: string;
      colorPaletteDramaturgy: string;
      lightingContinuity: string;
    };
  };
  slides: V26CarouselSlide[];
  qualityGates: {
    gateName: string;
    target: string;
    score: number;
    status: "PASSED" | "EXCEEDED";
  }[];
  sequenceTest: {
    question: string;
    passed: boolean;
    notes: string;
  }[];
  copyPackage: {
    instagram: {
      hook: string;
      narrative: string;
      swipeCallout: string;
      cta: string;
      hashtags: string[];
      disclaimer: string;
      cleanBlock: string;
    };
    threads: {
      hook: string;
      context: string;
      discussionQuestion: string;
      cta: string;
      disclaimer: string;
      cleanBlock: string;
    };
    whatsapp: {
      greeting: string;
      devotionalMessage: string;
      shareCta: string;
      disclaimer: string;
      cleanBlock: string;
    };
  };
}

export type SovereignStyleLibrary =
  | "Standard Sovereign V17"
  | "HP V18 (Storm Warrior - Kinetic Wind & Lightning Rim)"
  | "HP V19 (Volumetric Rays - Sacred Light & Incense Haze)"
  | "HP V20 (Celestial Sky - Cosmic Indigo & Starfields)"
  | "VP21 (Temple Sanctum / ISV21 - Garbhagriha & 1800K Diya)"
  | "Q10 (Ultimate Divine Masterpiece - Non-Dual Siddha)";

export type SovereignVariationSlot =
  | "V01 (Frontal Symmetry & Regal Presence)"
  | "V05 (Monsoon / Varsha Dynamic & Rain Petals)"
  | "V10 (Cosmic Void & Celestial Firmament)"
  | "V15 (Golden Hour Mandapa & Sun Rays)"
  | "V20 (Aarti & Garbhagriha Fire Illumination)"
  | "V25 (Sacred Rim Backlight & Silhouette Tejas)"
  | "V30 (Macro Sacred Relic & Mudra Focus)";

export interface SovereignPromptSuite {
  // 1. VISUAL = EXPERIENCE ("What are the eyes experiencing?")
  visualExperience: {
    atmosphere: string;
    lightingChiaroscuro: string;
    vedicAartiEngine?: string; // Always housed under visual
    directorStyle: string;
    targetEngineFocus: string; // Midjourney --sref, ControlNet, UE5.4 atmosphere
  };

  // 2. IMAGE = EYE ("What is actually being seen?")
  imageEye: {
    subjectIdentity: string;
    facialFeaturesAndMudra: string;
    canonicalAttributes: string[];
    lensOpticsAndSSS: string;
    targetEngineFocus: string; // Midjourney v6.1 --style raw, Flux 1.1 Pro, SDXL
  };

  // 3. POSTER = MESSAGE ("What is being presented?")
  posterMessage: {
    headlineAndTypography: string;
    safeZoneMargins: string; // Top 120px / Bottom 280px
    brandingWatermark: string;
    targetEngineFocus: string; // 16:9 YouTube, 9:16 Vertical OTT, 4:5 Devotional Prints
  };

  // 4. MOTION = MOVEMENT ("How does it move?")
  motionMovement: {
    cameraPath: string; // Orbit / Dolly-in
    particlePhysics: string; // Smoke / Petals / Flames
    frameRateAndCoherence: string; // 60 FPS / No morphing
    targetEngineFocus: string; // Runway Gen-3, Luma Dream Machine, Sora, Kling AI
  };
}

export interface SovereignDeckRequest {
  subject: string;
  sankalpa: string;
  version: number;
  styleLibrary: SovereignStyleLibrary;
  slot: SovereignVariationSlot;
  dim: AspectRatio;
  targetEngine: TargetEngine;
  tithiSeason?: string;
  drishtiMapping?: boolean;
  swayamJyoti?: boolean;
  brandSafeZones?: boolean;
  customApiKey?: string;
}

export interface SovereignDeckResult {
  conceptLogic: string;
  masterScript: string;
  negativePrompt: string;
  kineticMetadata: string;
  engagementJson: {
    Version: string;
    Slot: string;
    Target_Frequency: string;
    Viral_Title_Hindi: string;
    SEO_Tags: string[];
    Branding_Style: string;
    CTR_Prediction: string;
    Safe_Zone_Top?: string;
    Safe_Zone_Bottom?: string;
    [key: string]: any;
  };
  sovereignPromptSuite?: SovereignPromptSuite;
  siddhaCheck: {
    iconography: boolean;
    lightingMotivated: boolean;
    brandingSafeZone: boolean;
    antiRepetitionSlot: boolean;
    status?: "CANONICAL_MATCH" | "PARTIAL_MATCH" | "UNVERIFIED" | "CONFUSION_DETECTED";
    details: string;
    canonicalAttributesFound?: string[];
    missingCoreAttributes?: string[];
    anachronismsDetected?: string[];
  };
}

export type MoodRasa =
  | "V-Paratpar / Ananta-Bija (The Singularity)"
  | "Moksha / Non-Dual (Pure Consciousness)"
  | "Brahmanda-Srishti / Universal Strings"
  | "Virat-Rupa / Cosmic"
  | "Bhakti / Shanta (Serene)"
  | "Rudra / Tandava (Fierce Divine)"
  | "Vaikuntha / Celestial Tejas"
  | "Tapasya / Yogic Dhyana"
  | "Mahavidya / Mystical Tantra";

export type LightingStyle =
  | "Atman-Sync Swayam-Jyoti (Geometric Source)"
  | "Saptarishi Celestial 7-Point Ray"
  | "Swayam-Jyoti (Non-Dual Self-Effulgence)"
  | "Sahasrara-Alpha Neural Tejas"
  | "Brahmamuhurta Dawn Gold"
  | "Deep Garbhagriha Oil Diya"
  | "Cosmic Nebula Rim Glow"
  | "Hiranyagarbha Solar Core";

// V11 Universal (Sarva-Srishti) types
export type UniversalCategory =
  | "Devotional (Divine/Mythology)"
  | "Health & Ayurveda (Herbs/Wellness)"
  | "Emotions & Life (Human Experience)"
  | "Nostalgia (Papa's Music — IBD Smaran)"
  | "Vintage Bharat (Heritage & History)";

export interface UniversalStudioRequest {
  category: UniversalCategory;
  subject: string;
  story: string;
  dim: AspectRatio;
  version: number;
  customApiKey?: string;
}

// V12 Vishwa-Varta types
export type VishwaVartaCategory =
  | "Breaking News (Urgent/Trending)"
  | "Kya Aap Jante Hain (Facts/Discovery)"
  | "Aaj Ka Sawal (Quiz/Interaction)"
  | "Suvichar (Wisdom/Quotes)"
  | "Festival Alert (Cultural/Celebration)"
  | "Devotional (Divine/Mythology)";

export interface VishwaVartaRequest {
  category: VishwaVartaCategory;
  story: string;
  dim: AspectRatio;
  version: number;
  customApiKey?: string;
}

// V13 Samvaad types
export type SamvaadCategory =
  | "Community Miracle (Viewer Story)"
  | "Daily Darshan (Time-Sync Art)"
  | "Shastra Q&A (Visual Knowledge)"
  | "Live Stream Overlay (Branded)"
  | "Breaking News (Trending)"
  | "Health/Ayurveda Tip";

export type ChronoLightingTime =
  | "Brahma Muhurta (Soft Gold/Pink 4AM)"
  | "Abhijit Muhurta (Sharp/Overhead 12PM)"
  | "Sandhya (Warm Amber/Purple 6PM)"
  | "Nishita Kaal (Midnight Blue/Moonlight)";

export type SamvaadMood =
  | "Peaceful & Meditative"
  | "Powerful & High-Energy"
  | "Nostalgic & Emotional"
  | "Curious & Intellectual";

export interface SamvaadRequest {
  category: SamvaadCategory;
  timeOfDay: ChronoLightingTime;
  dim: AspectRatio;
  mood: SamvaadMood;
  story: string;
  customApiKey?: string;
}

// V14 Dharma-Sutra types
export type DharmaStrategy =
  | "Heartland (Traditional/Regional Focus)"
  | "Diaspora (Modern/Minimalist Focus)"
  | "Series Continuity (Episodic Style)"
  | "Educational (Infographic/Gyan)";

export type TargetScriptLanguage =
  | "Hindi/Sanskrit (Devanagari)"
  | "English (Latin)"
  | "Tamil/Telugu/Kannada (Dravidian)"
  | "Bengali/Gujarati (Regional)";

export interface DharmaSutraRequest {
  strategy: DharmaStrategy;
  language: TargetScriptLanguage;
  dim: AspectRatio;
  series: string;
  story: string;
  customApiKey?: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface ProductionMetadata {
  production: string;
  evolutionLevel: string;
  subject?: string;
  targetEngine?: string;
  aspectRatio: string;
  colorPalette?: ColorSwatch[];
  cinematography?: {
    camera?: string;
    lens?: string;
    lighting?: string;
    shutterAngle?: string;
    renderPolish?: string;
  };
  sacredAttributes?: string[];
  sanskritSankalpaMantra?: string;
  engineFlags?: string;
  // Vishwa-Varta extensions
  viralHeadlines?: string[];
  hashtags?: string[];
  seoTags?: string[];
  // Samvaad extensions
  pinnedCommentIdea?: string;
  heartWinningReply?: string;
  communityEngagementStrategy?: string;
  // Dharma-Sutra extensions
  languageSafeZones?: string;
  culturalHooks?: string;
  scriptTypographyOptimization?: string;
  seriesContinuityCode?: string;
  posterOverlayRules?: {
    subtitleRule: string;
    textLegibilityScrim: string;
    safeMargins: string;
    combinedInstruction?: string;
  };
  [key: string]: any;
}

export interface ForgeRequest {
  subject: string;
  story: string;
  dim: AspectRatio;
  version: number;
  targetEngine: TargetEngine;
  mood: MoodRasa;
  lightingStyle: LightingStyle;
  shastraDetails: string[];
  sampler?: string;
  cinemaStyle?: string;
  autoDeityMode?: boolean;
  customApiKey?: string;
}

export interface ForgeResult {
  success: boolean;
  logic: string;
  prompt: string;
  negative: string;
  metadata: ProductionMetadata;
  raw?: string;
  error?: string;
}

export interface SavedPromptItem {
  id: string;
  timestamp: number;
  subject: string;
  story: string;
  version: number;
  dim: AspectRatio;
  targetEngine: TargetEngine;
  mood: MoodRasa;
  lightingStyle: LightingStyle;
  shastraDetails: string[];
  sampler?: string;
  cinemaStyle?: string;
  logic: string;
  prompt: string;
  negative: string;
  metadata: ProductionMetadata;
  studioTab?: StudioEngineTab;
  isFavorite?: boolean;
}

export interface TeerthVisualPrompt {
  index: number;
  title: string;
  timeOfDay: string;
  cameraAngle: string;
  prompt: string;
  aspectRatio: AspectRatio;
  midjourneyParams: string;
  tags: string[];
}

export interface TeerthDestination {
  id: string;
  name: string;
  gurmukhiHindiName?: string;
  type: "gurudwara" | "temple";
  category: "Punjabi & Sikh Heritage" | "Famous Hindu Teerth & Mahamandir";
  location: string;
  sanctumTitle: string;
  description: string;
  sacredChant: string;
  palette: { name: string; hex: string }[];
  iconName: string;
  badge: string;
  visuals: TeerthVisualPrompt[];
}

export interface Teerth10xCustomRequest {
  destinationName: string;
  type: "gurudwara" | "temple";
  customNotes?: string;
  dim: AspectRatio;
  customApiKey?: string;
}

export type V25Weekday = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type V25ContentTypeId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface V25CommandState {
  weekday?: V25Weekday;
  v23Parivar?: string;
  contentType?: V25ContentTypeId | string;
  contentTypeLabel?: string;
  v24Scene?: number; // 1-7
  v24SceneTitle?: string;
  recommendedEngine?: string;
  confirmedEngine?: string;
  coupleId?: "SP" | "RS" | "RK" | "VL";
  dSlotId?: string; // e.g. MON-05, TUE-08
  dSlotTheme?: string;
  platformGroup?: 1 | 2;
  platformGroupLabel?: string;
  platformName?: string;
  brandIdentity: "IBD" | "ASP" | "RKM";
  vaVariationSlot?: string; // VA01-VA30
  userApproved: boolean;
  step: "WEEKDAY" | "CONTENT_TYPE" | "SCENE_OR_THEME" | "CONFIRMATION" | "GENERATED";
}

export interface V25ExecutionResult {
  commandEcho: string;
  weekday: string;
  parivar: string;
  dSlot: string;
  dSlotTheme: string;
  contentType: string;
  v24AartiScene?: {
    id: number;
    title: string;
    scope: string;
  };
  productionEngine: string;
  vaSlot: string;
  aspectRatio: AspectRatio;
  platformTarget: string;
  branding: {
    brand: "IBD" | "ASP" | "RKM";
    estd: "ESTD 07/2025" | "ESTD 07/25";
    placement: "BOTTOM SAFE ZONE";
    cta: string;
    ctaPlacement: "RIGHT CORNER";
  };
  colorDramaturgy: {
    deityKey: string;
    paletteDescription: string;
    motivatedLight: string;
  };
  siddhaChecklist: {
    rule: string;
    passed: boolean;
    verificationNotes: string;
  }[];
  cleanMasterPrompt: string;
  headlineSafeZoneText?: string;
  platformCopy: {
    caption: string;
    hashtags: string[];
    disclaimer: string;
  };
}

export interface DivinePreset {
  id: string;
  title: string;
  deity: string;
  subtitle: string;
  category?: string;
  version: number;
  dim: AspectRatio;
  targetEngine: TargetEngine;
  mood: MoodRasa;
  lightingStyle: LightingStyle;
  shastraDetails: string[];
  story: string;
  iconName: string;
  sampleImageUrl?: string;
}


