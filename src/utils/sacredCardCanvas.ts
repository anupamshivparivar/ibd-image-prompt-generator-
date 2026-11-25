import JSZip from "jszip";
import shivaMeditationImg from "../assets/images/shiva_divine_meditation_1787316288285.jpg";
import shivaTrishulImg from "../assets/images/shiva_trishul_cosmic_1787316360334.jpg";
import krishnaFluteImg from "../assets/images/krishna_divine_flute_1787316309215.jpg";
import hanumanBhaktiImg from "../assets/images/hanuman_divine_bhakti_1787316324945.jpg";
import ramKodandaImg from "../assets/images/ram_divine_kodanda_1787316341991.jpg";

// Sacred Card Canvas Rendering Engine for 9:16 and 4:5 PNG Downloads
// Supports high-resolution 1080x1920 (9:16) and 1080x1350 (4:5) formats with 10 background variations & Divine Deity Art

export type SacredAspectRatio = "9:16" | "4:5";

export type DeityArtStyle =
  | "auto"
  | "shiva_meditation"
  | "shiva_trishul"
  | "krishna_flute"
  | "hanuman_bhakti"
  | "ram_kodanda"
  | "none";

export interface DeityArtPreset {
  id: DeityArtStyle;
  name: string;
  hindiName: string;
  deity: string;
  icon: string;
  src: string;
}

export const DEITY_ARTWORK_PRESETS: Record<string, DeityArtPreset> = {
  shiva_meditation: {
    id: "shiva_meditation",
    name: "Lord Shiva Meditation",
    hindiName: "भगवान शिव ध्यान मुद्रा (कैलाश)",
    deity: "Lord Shiva",
    icon: "🔱",
    src: shivaMeditationImg,
  },
  shiva_trishul: {
    id: "shiva_trishul",
    name: "Sacred Trishul & Damru",
    hindiName: "त्रिशूल एवं डमरू दिव्य रूप",
    deity: "Lord Shiva",
    icon: "🕉️",
    src: shivaTrishulImg,
  },
  krishna_flute: {
    id: "krishna_flute",
    name: "Lord Krishna Flute",
    hindiName: "श्री कृष्ण मुरली मनोहर",
    deity: "Lord Krishna",
    icon: "🦚",
    src: krishnaFluteImg,
  },
  hanuman_bhakti: {
    id: "hanuman_bhakti",
    name: "Lord Hanuman Gada",
    hindiName: "श्री हनुमान जी वीर भक्ति मुद्रा",
    deity: "Lord Hanuman",
    icon: "🚩",
    src: hanumanBhaktiImg,
  },
  ram_kodanda: {
    id: "ram_kodanda",
    name: "Lord Ram Kodanda Bow",
    hindiName: "श्री राम कोदण्ड धनुषधारी",
    deity: "Lord Ram",
    icon: "🏹",
    src: ramKodandaImg,
  },
};

// Global in-memory image cache for instantaneous synchronous canvas drawing
const imageElementCache = new Map<string, HTMLImageElement>();

export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(new Image());
      return;
    }
    const cached = imageElementCache.get(src);
    if (cached && cached.complete && cached.naturalWidth > 0) {
      resolve(cached);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageElementCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => {
      console.warn("Failed to load deity image:", src);
      resolve(img);
    };
    img.src = src;
  });
}

// Preload all default deity images
if (typeof window !== "undefined") {
  Object.values(DEITY_ARTWORK_PRESETS).forEach((preset) => {
    preloadImage(preset.src);
  });
}

export interface BackgroundVariation {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  colors: {
    bgStart: string;
    bgMid: string;
    bgEnd: string;
    accent: string;
    accentGold: string;
    border: string;
    glow: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
  icon: string;
}

export const BACKGROUND_VARIATIONS: BackgroundVariation[] = [
  {
    id: "kailash_neelkanth_cyan",
    name: "Kailash Neelkanth Ice Azure",
    hindiName: "कैलाश नीलकंठ दिव्य प्रभा",
    description: "Sacred Mount Kailash glacial ice, cosmic Ganga flow & Mahadev third-eye cyan aura",
    icon: "🔱",
    colors: {
      bgStart: "#061f2d",
      bgMid: "#03121c",
      bgEnd: "#01070d",
      accent: "#06b6d4",
      accentGold: "#38bdf8",
      border: "rgba(56, 189, 248, 0.75)",
      glow: "rgba(6, 182, 212, 0.38)",
      cardBg: "rgba(3, 16, 26, 0.86)",
      textPrimary: "#ecfeff",
      textSecondary: "#cffafe",
    },
  },
  {
    id: "bhasma_vibhuti_obsidian",
    name: "Maha-Smashan Bhasma Obsidian",
    hindiName: "महाश्मशान भस्म विभूति",
    description: "Sacred Vibhuti ash grey, Rudraksha amber glow & Nataraja cosmic fire flames",
    icon: "🕉️",
    colors: {
      bgStart: "#1c1917",
      bgMid: "#0c0a09",
      bgEnd: "#000000",
      accent: "#fb923c",
      accentGold: "#fde047",
      border: "rgba(253, 224, 71, 0.7)",
      glow: "rgba(251, 146, 60, 0.35)",
      cardBg: "rgba(12, 10, 9, 0.88)",
      textPrimary: "#f5f5f4",
      textSecondary: "#e7e5e4",
    },
  },
  {
    id: "ayodhya_saryu_gold",
    name: "Ayodhya Saryu Dawn",
    hindiName: "अयोध्या सरयू स्वर्णिम प्रभात",
    description: "Sacred Saryu morning sunrise, holy temple spires & solar gold radiance",
    icon: "🏹",
    colors: {
      bgStart: "#381c06",
      bgMid: "#220e02",
      bgEnd: "#0c0400",
      accent: "#f59e0b",
      accentGold: "#fbbf24",
      border: "rgba(251, 191, 36, 0.75)",
      glow: "rgba(245, 158, 11, 0.35)",
      cardBg: "rgba(18, 8, 2, 0.82)",
      textPrimary: "#fef3c7",
      textSecondary: "#fde68a",
    },
  },
  {
    id: "sundarkand_kesariya",
    name: "Sundarkand Kesariya Dhwaj",
    hindiName: "सुन्दरकाण्ड केसरी ध्वज",
    description: "Sacred saffron marigold dawn, Bajrangbali radiant aura & Vedic diya",
    icon: "🚩",
    colors: {
      bgStart: "#3d1300",
      bgMid: "#250900",
      bgEnd: "#0f0300",
      accent: "#ea580c",
      accentGold: "#f59e0b",
      border: "rgba(245, 158, 11, 0.75)",
      glow: "rgba(234, 88, 12, 0.38)",
      cardBg: "rgba(24, 8, 2, 0.84)",
      textPrimary: "#ffedd5",
      textSecondary: "#fed7aa",
    },
  },
  {
    id: "lanka_dahan_ruby",
    name: "Lanka Dahan Crimson Blaze",
    hindiName: "लंका दहन रुद्र तेज",
    description: "Fiery ruby flames, golden embers & invincible Rudra avatar splendour",
    icon: "🔥",
    colors: {
      bgStart: "#380808",
      bgMid: "#220404",
      bgEnd: "#0d0101",
      accent: "#ef4444",
      accentGold: "#facc15",
      border: "rgba(250, 204, 21, 0.7)",
      glow: "rgba(239, 68, 68, 0.38)",
      cardBg: "rgba(22, 4, 4, 0.85)",
      textPrimary: "#fee2e2",
      textSecondary: "#fecaca",
    },
  },
  {
    id: "ram_darbar_obsidian",
    name: "Ram Darbar Obsidian Gold",
    hindiName: "श्री राम दरबार राजसी स्वर्ण",
    description: "Imperial black obsidian marble, 24K gold filigree & royal Maryada Purushottam glory",
    icon: "👑",
    colors: {
      bgStart: "#1a1506",
      bgMid: "#0d0a02",
      bgEnd: "#040301",
      accent: "#d4af37",
      accentGold: "#ffd700",
      border: "rgba(255, 215, 0, 0.8)",
      glow: "rgba(212, 175, 55, 0.35)",
      cardBg: "rgba(14, 11, 3, 0.86)",
      textPrimary: "#fffbeb",
      textSecondary: "#fef08a",
    },
  },
  {
    id: "kurukshetra_gold",
    name: "Kurukshetra Golden Dawn",
    hindiName: "कुरुक्षेत्र स्वर्ण प्रभात",
    description: "Brahmamuhurta solar flares, chariot gold rays & Gita Upanishad radiance",
    icon: "🌅",
    colors: {
      bgStart: "#2a1505",
      bgMid: "#190b02",
      bgEnd: "#080300",
      accent: "#f59e0b",
      accentGold: "#fbbf24",
      border: "rgba(251, 191, 36, 0.65)",
      glow: "rgba(245, 158, 11, 0.28)",
      cardBg: "rgba(10, 5, 2, 0.78)",
      textPrimary: "#fef3c7",
      textSecondary: "#fde68a",
    },
  },
  {
    id: "vrindavan_twilight",
    name: "Vrindavan Yamuna Twilight",
    hindiName: "वृन्दावन यमुना गोधूलि",
    description: "Moonlit midnight indigo, peacock iridescence & starry calm",
    icon: "🌙",
    colors: {
      bgStart: "#150d30",
      bgMid: "#0c0720",
      bgEnd: "#04020a",
      accent: "#a855f7",
      accentGold: "#facc15",
      border: "rgba(250, 204, 21, 0.6)",
      glow: "rgba(168, 85, 247, 0.3)",
      cardBg: "rgba(12, 6, 28, 0.8)",
      textPrimary: "#f3e8ff",
      textSecondary: "#e9d5ff",
    },
  },
  {
    id: "sanjeevani_emerald",
    name: "Sanjeevani Dronagiri Emerald",
    hindiName: "संजीवनी द्रोणागिरि मरकत",
    description: "Himalayan medicinal herbs glow, sacred forest mist & lifegiving emerald jade",
    icon: "🌿",
    colors: {
      bgStart: "#072418",
      bgMid: "#03140d",
      bgEnd: "#010704",
      accent: "#10b981",
      accentGold: "#facc15",
      border: "rgba(250, 204, 21, 0.68)",
      glow: "rgba(16, 185, 129, 0.32)",
      cardBg: "rgba(3, 18, 11, 0.84)",
      textPrimary: "#ecfdf5",
      textSecondary: "#a7f3d0",
    },
  },
  {
    id: "cosmic_kaalchakra",
    name: "Cosmic Kaal-Chakra",
    hindiName: "विश्वरूप काल-चक्र",
    description: "Infinite stardust nebulae, Sudarshana Mandala & cosmic mystery",
    icon: "🌌",
    colors: {
      bgStart: "#091b36",
      bgMid: "#060e22",
      bgEnd: "#02040d",
      accent: "#38bdf8",
      accentGold: "#fde047",
      border: "rgba(56, 189, 248, 0.6)",
      glow: "rgba(14, 165, 233, 0.32)",
      cardBg: "rgba(4, 10, 26, 0.82)",
      textPrimary: "#f0f9ff",
      textSecondary: "#bae6fd",
    },
  },
  {
    id: "kishkindha_terracotta",
    name: "Kishkindha Surya Kund",
    hindiName: "किष्किन्धा सूर्य कुण्ड",
    description: "Rishyamukha mountain sandstone, sacred bronze & ancient sun warmth",
    icon: "⛰️",
    colors: {
      bgStart: "#301a0d",
      bgMid: "#1c0d06",
      bgEnd: "#0a0402",
      accent: "#d97706",
      accentGold: "#fbbf24",
      border: "rgba(251, 191, 36, 0.68)",
      glow: "rgba(217, 119, 6, 0.32)",
      cardBg: "rgba(18, 8, 4, 0.82)",
      textPrimary: "#fff7ed",
      textSecondary: "#fed7aa",
    },
  },
  {
    id: "panchavati_sandalwood",
    name: "Panchavati Tapovan Sandalwood",
    hindiName: "पंचवटी तपोवन चन्दन",
    description: "Aged palm leaf bronze, divine chandan paste & Vedic manuscript aura",
    icon: "📜",
    colors: {
      bgStart: "#28170c",
      bgMid: "#180d06",
      bgEnd: "#0a0502",
      accent: "#b45309",
      accentGold: "#f59e0b",
      border: "rgba(245, 158, 11, 0.65)",
      glow: "rgba(180, 83, 9, 0.3)",
      cardBg: "rgba(18, 9, 4, 0.82)",
      textPrimary: "#fff7ed",
      textSecondary: "#fed7aa",
    },
  },
];

export interface SacredCardData {
  type: "shiv_mantra" | "sunderkand" | "ramcharitmanas" | "krishna_suvichar" | "bhagavad_gita";
  title: string;
  categoryOrChapter: string;
  shlokaSanskrit?: string;
  hindiText: string;
  englishText?: string;
  watermarkText?: string;
  handle?: string;
  sealText?: string;
  iconType?: "bow" | "hanuman" | "ram" | "feather" | "om" | "gita" | "lotus" | "trishul" | "damru" | "shiva" | "lingam" | "nataraja";
  deityArtStyle?: DeityArtStyle;
  showDeityFocalFrame?: boolean;
  deityBackdropOpacity?: number;
  showShloka?: boolean;
  showHindi?: boolean;
  showEnglish?: boolean;
  showBranding?: boolean;
  fontSizeScale?: "compact" | "normal" | "large";
}

export interface RenderCardOptions {
  aspectRatio: SacredAspectRatio;
  themeId: string;
  deityArtStyle?: DeityArtStyle;
  showDeityFocalFrame?: boolean;
  deityBackdropOpacity?: number;
  customScale?: number;
  onRedraw?: () => void;
}

export function resolveDeityArt(
  data: SacredCardData,
  selectedStyle?: DeityArtStyle
): DeityArtPreset | null {
  const style = selectedStyle || data.deityArtStyle || "auto";
  if (style === "none") return null;

  if (style !== "auto" && DEITY_ARTWORK_PRESETS[style]) {
    return DEITY_ARTWORK_PRESETS[style];
  }

  // Auto-detect based on card data
  if (data.type === "shiv_mantra") {
    if (data.iconType === "trishul" || data.iconType === "damru" || data.iconType === "nataraja") {
      return DEITY_ARTWORK_PRESETS.shiva_trishul;
    }
    return DEITY_ARTWORK_PRESETS.shiva_meditation;
  }
  if (data.type === "krishna_suvichar" || data.type === "bhagavad_gita") {
    return DEITY_ARTWORK_PRESETS.krishna_flute;
  }
  if (data.type === "sunderkand" || data.iconType === "hanuman") {
    return DEITY_ARTWORK_PRESETS.hanuman_bhakti;
  }
  if (data.type === "ramcharitmanas" || data.iconType === "bow" || data.iconType === "ram") {
    return DEITY_ARTWORK_PRESETS.ram_kodanda;
  }

  return DEITY_ARTWORK_PRESETS.shiva_meditation;
}

// Utility: Multi-line text wrapping helper on HTML Canvas
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === "") {
      lines.push("");
      continue;
    }
    const words = paragraph.split(" ");
    let currentLine = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lines.push(currentLine);
        currentLine = words[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }
  return lines;
}

// Draw ornate corner ornaments
function drawCornerFlourish(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  quadrant: 1 | 2 | 3 | 4
) {
  ctx.save();
  ctx.translate(x, y);
  const rot =
    quadrant === 1 ? 0 : quadrant === 2 ? Math.PI / 2 : quadrant === 3 ? Math.PI : -Math.PI / 2;
  ctx.rotate(rot);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5;

  // Outer corner L
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(0, 0);
  ctx.lineTo(size, 0);
  ctx.stroke();

  // Inner corner arc
  ctx.beginPath();
  ctx.arc(size * 0.4, size * 0.4, size * 0.25, Math.PI, (Math.PI * 3) / 2);
  ctx.stroke();

  // Golden accent dot
  ctx.beginPath();
  ctx.arc(size * 0.35, size * 0.35, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Master Canvas Rendering Engine
export function renderSacredCard(
  canvas: HTMLCanvasElement,
  data: SacredCardData,
  options: RenderCardOptions
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const is916 = options.aspectRatio === "9:16";
  const targetW = 1080;
  const targetH = is916 ? 1920 : 1350;

  // Set real canvas resolution for pixel-perfect 1080p rendering
  canvas.width = targetW;
  canvas.height = targetH;

  const theme =
    BACKGROUND_VARIATIONS.find((t) => t.id === options.themeId) ||
    BACKGROUND_VARIATIONS[0];

  const {
    showShloka = true,
    showHindi = true,
    showEnglish = true,
    showBranding = true,
    fontSizeScale = "normal",
  } = data;

  const fontMultiplier =
    fontSizeScale === "large" ? 1.15 : fontSizeScale === "compact" ? 0.9 : 1.0;

  const resolvedDeity = resolveDeityArt(data, options.deityArtStyle);
  let deityImg: HTMLImageElement | null = null;
  if (resolvedDeity) {
    deityImg = imageElementCache.get(resolvedDeity.src) || null;
    if (!deityImg || !deityImg.complete || deityImg.naturalWidth === 0) {
      preloadImage(resolvedDeity.src).then(() => {
        if (options.onRedraw) {
          options.onRedraw();
        } else {
          // Re-render once image finishes loading
          renderSacredCard(canvas, data, options);
        }
      });
    }
  }

  // 1. CLEAR & BACKGROUND BASE GRADIENTS
  ctx.clearRect(0, 0, targetW, targetH);

  // Background linear gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, targetH);
  bgGrad.addColorStop(0, theme.colors.bgStart);
  bgGrad.addColorStop(0.5, theme.colors.bgMid);
  bgGrad.addColorStop(1, theme.colors.bgEnd);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, targetW, targetH);

  // 1B. FULL-POSTER ATMOSPHERIC DEITY ARTWORK BACKDROP
  if (deityImg && deityImg.complete && deityImg.naturalWidth > 0) {
    ctx.save();
    const backdropOpacity = data.deityBackdropOpacity ?? options.deityBackdropOpacity ?? (is916 ? 0.32 : 0.24);
    ctx.globalAlpha = backdropOpacity;

    // Center cover scale
    const scale = Math.max(targetW / deityImg.naturalWidth, targetH / deityImg.naturalHeight);
    const drawW = deityImg.naturalWidth * scale;
    const drawH = deityImg.naturalHeight * scale;
    const drawX = (targetW - drawW) / 2;
    const drawY = (targetH - drawH) / 2;

    ctx.drawImage(deityImg, drawX, drawY, drawW, drawH);

    // Dark gradient overlay to ensure text readability
    const darkOverlay = ctx.createLinearGradient(0, 0, 0, targetH);
    darkOverlay.addColorStop(0, "rgba(0, 0, 0, 0.55)");
    darkOverlay.addColorStop(0.35, "rgba(0, 0, 0, 0.4)");
    darkOverlay.addColorStop(0.7, "rgba(0, 0, 0, 0.25)");
    darkOverlay.addColorStop(1, "rgba(0, 0, 0, 0.85)");
    ctx.fillStyle = darkOverlay;
    ctx.fillRect(0, 0, targetW, targetH);

    ctx.restore();
  }

  // 2. RADIAL CELESTIAL GLOWS (Top Center & Mid Center)
  const topGlow = ctx.createRadialGradient(
    targetW / 2,
    targetH * 0.22,
    10,
    targetW / 2,
    targetH * 0.22,
    targetW * 0.7
  );
  topGlow.addColorStop(0, theme.colors.glow);
  topGlow.addColorStop(0.5, "rgba(0,0,0,0.05)");
  topGlow.addColorStop(1, "transparent");
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, targetW, targetH);

  // Bottom subtle glow
  const botGlow = ctx.createRadialGradient(
    targetW / 2,
    targetH * 0.85,
    20,
    targetW / 2,
    targetH * 0.85,
    targetW * 0.6
  );
  botGlow.addColorStop(0, theme.colors.glow);
  botGlow.addColorStop(1, "transparent");
  ctx.fillStyle = botGlow;
  ctx.fillRect(0, 0, targetW, targetH);

  // 3. BACKGROUND SACRED GEOMETRY (Yantra Mandala Rings)
  ctx.save();
  ctx.translate(targetW / 2, targetH * 0.38);
  ctx.strokeStyle = "rgba(251, 191, 36, 0.08)";
  ctx.lineWidth = 1.5;

  // Concentric mandala rings
  for (let r = 80; r <= 380; r += 75) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 12-point sacred starburst rays
  ctx.strokeStyle = "rgba(251, 191, 36, 0.05)";
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * 360, Math.sin(angle) * 360);
    ctx.stroke();
  }
  ctx.restore();

  // 4. DUAL SACRED GOLD BORDERS & CORNER ORNAMENTS
  const margin = 42;
  const innerMargin = 52;
  const cornerSize = 40;

  // Outer Gold Border
  ctx.strokeStyle = theme.colors.border;
  ctx.lineWidth = 3;
  ctx.strokeRect(margin, margin, targetW - margin * 2, targetH - margin * 2);

  // Inner Subtle Border
  ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    innerMargin,
    innerMargin,
    targetW - innerMargin * 2,
    targetH - innerMargin * 2
  );

  // Four Corner Flourishes
  drawCornerFlourish(ctx, margin, margin, cornerSize, theme.colors.accentGold, 1);
  drawCornerFlourish(ctx, targetW - margin, margin, cornerSize, theme.colors.accentGold, 2);
  drawCornerFlourish(
    ctx,
    targetW - margin,
    targetH - margin,
    cornerSize,
    theme.colors.accentGold,
    3
  );
  drawCornerFlourish(ctx, margin, targetH - margin, cornerSize, theme.colors.accentGold, 4);

  // 5. TOP HEADER: WATERMARK & CATEGORY BADGE
  let currentY = margin + 45;

  if (showBranding) {
    // Watermark Top Bar
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillStyle = theme.colors.accentGold;
    ctx.fillText(data.watermarkText || "INDIAN BHAKTI DHARA", targetW / 2, currentY);

    if (data.handle) {
      currentY += 28;
      ctx.font = '500 16px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(253, 230, 138, 0.75)";
      ctx.fillText(data.handle, targetW / 2, currentY);
    }
  }

  currentY += 38;

  // Category / Chapter Pill Badge
  if (data.categoryOrChapter) {
    const badgeText = data.categoryOrChapter.toUpperCase();
    ctx.font = 'bold 16px "JetBrains Mono", sans-serif';
    const badgeMetrics = ctx.measureText(badgeText);
    const badgeW = badgeMetrics.width + 36;
    const badgeH = 34;

    ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
    ctx.strokeStyle = theme.colors.border;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(targetW / 2 - badgeW / 2, currentY - badgeH / 2, badgeW, badgeH, 17);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.colors.accentGold;
    ctx.fillText(badgeText, targetW / 2, currentY);
    currentY += 45;
  }

  // 6. SACRED ICON & TITLE
  // Central Icon / Emblem
  const iconY = currentY + 20;
  ctx.save();
  ctx.beginPath();
  ctx.arc(targetW / 2, iconY, 34, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(251, 191, 36, 0.15)";
  ctx.fill();
  ctx.strokeStyle = theme.colors.accentGold;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Divine Symbol: ॐ, Bow, Hanuman Dhwaj, Lotus, Peacock Feather, Gita, Trishul, Damru, Lingam
  ctx.font = 'bold 36px "Noto Serif Devanagari", "Cinzel", serif';
  ctx.fillStyle = theme.colors.accentGold;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let symbol = "ॐ";
  if (data.iconType === "feather") symbol = "🦚";
  else if (data.iconType === "gita") symbol = "📖";
  else if (data.iconType === "bow" || data.iconType === "ram") symbol = "🏹";
  else if (data.iconType === "hanuman") symbol = "🚩";
  else if (data.iconType === "lotus") symbol = "🪷";
  else if (data.iconType === "trishul" || data.iconType === "shiva") symbol = "🔱";
  else if (data.iconType === "damru") symbol = "🥁";
  else if (data.iconType === "lingam") symbol = "🕉️";
  else if (data.iconType === "nataraja") symbol = "🔥";
  ctx.fillText(symbol, targetW / 2, iconY);
  ctx.restore();

  currentY = iconY + 54;

  // Title
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${Math.round(30 * fontMultiplier)}px "Noto Serif Devanagari", "Cinzel", serif`;
  ctx.fillStyle = theme.colors.accentGold;
  ctx.shadowColor = "rgba(251, 191, 36, 0.5)";
  ctx.shadowBlur = 12;
  ctx.fillText(data.title, targetW / 2, currentY);
  ctx.shadowBlur = 0;

  currentY += is916 ? 48 : 36;

  const contentMaxWidth = targetW - margin * 2 - 80;

  // 7. SANSKRIT SHLOKA (TRANSLUCENT GLASS PLAQUE)
  if (showShloka && data.shlokaSanskrit) {
    ctx.font = `bold ${Math.round(26 * fontMultiplier)}px "Noto Serif Devanagari", serif`;
    const shlokaLines = wrapText(ctx, data.shlokaSanskrit, contentMaxWidth - 40);
    const shlokaLineHeight = Math.round(38 * fontMultiplier);
    const plaqueH = shlokaLines.length * shlokaLineHeight + 40;

    // Draw Glass Plaque
    ctx.fillStyle = theme.colors.cardBg;
    ctx.strokeStyle = theme.colors.border;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(margin + 40, currentY, contentMaxWidth, plaqueH, 20);
    ctx.fill();
    ctx.stroke();

    // Dynamic header inside plaque based on data type
    ctx.font = 'bold 15px "Noto Serif Devanagari", serif';
    ctx.fillStyle = theme.colors.accent;
    let shlokaHeader = "॥ पावन संस्कृत श्लोक ॥";
    if (data.type === "shiv_mantra") {
      shlokaHeader = "॥ ॐ नमः शिवाय • श्री शिव स्तोत्रम् ॥";
    } else if (data.type === "sunderkand") {
      shlokaHeader = "॥ श्री सुन्दरकाण्ड पावन दोहा/चौपाई ॥";
    } else if (data.type === "ramcharitmanas") {
      shlokaHeader = "॥ श्रीरामचरितमानस पावन श्लोक ॥";
    } else if (data.type === "bhagavad_gita") {
      shlokaHeader = "॥ श्रीमद्भगवद्गीता पावन श्लोक ॥";
    } else if (data.type === "krishna_suvichar") {
      shlokaHeader = "॥ श्री कृष्ण पावन श्लोक ॥";
    }
    ctx.fillText(shlokaHeader, targetW / 2, currentY + 20);

    // Render Shloka Lines
    ctx.font = `bold ${Math.round(25 * fontMultiplier)}px "Noto Serif Devanagari", serif`;
    ctx.fillStyle = theme.colors.textPrimary;

    let shlokaY = currentY + 46;
    for (const line of shlokaLines) {
      ctx.fillText(line, targetW / 2, shlokaY);
      shlokaY += shlokaLineHeight;
    }

    currentY += plaqueH + (is916 ? 36 : 24);
  }

  // 8. MAIN HINDI SUVICHAR / ANUVAD (HIGH-CONTRAST CARD)
  if (showHindi && data.hindiText) {
    ctx.font = `600 ${Math.round((is916 ? 28 : 25) * fontMultiplier)}px "Noto Serif Devanagari", sans-serif`;
    const hindiLines = wrapText(ctx, data.hindiText, contentMaxWidth - 40);
    const hindiLineHeight = Math.round((is916 ? 44 : 38) * fontMultiplier);
    const hindiCardH = hindiLines.length * hindiLineHeight + (is916 ? 48 : 36);

    // Dark luminous backdrop
    ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
    ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(margin + 40, currentY, contentMaxWidth, hindiCardH, 20);
    ctx.fill();
    ctx.stroke();

    // Hindi Quote Header Badge
    ctx.font = 'bold 14px "JetBrains Mono", sans-serif';
    ctx.fillStyle = theme.colors.accentGold;
    let hindiBadge = "📜 सरल हिन्दी भावार्थ";
    if (data.type === "shiv_mantra") {
      hindiBadge = "🔱 पावन शिव भावार्थ एवं महिमा";
    } else if (data.type === "krishna_suvichar") {
      hindiBadge = "✨ दिव्य कृष्ण विचार";
    } else if (data.type === "sunderkand" || data.type === "ramcharitmanas") {
      hindiBadge = "📜 श्रीराम कृपा सरल भावार्थ";
    }
    ctx.fillText(hindiBadge, targetW / 2, currentY + 22);

    // Hindi text lines
    ctx.font = `600 ${Math.round((is916 ? 27 : 24) * fontMultiplier)}px "Noto Serif Devanagari", sans-serif`;
    ctx.fillStyle = "#ffffff";

    let textY = currentY + (is916 ? 54 : 46);
    for (const line of hindiLines) {
      ctx.fillText(line, targetW / 2, textY);
      textY += hindiLineHeight;
    }

    currentY += hindiCardH + (is916 ? 32 : 20);
  }

  // 9. ENGLISH TRANSLATION
  if (showEnglish && data.englishText) {
    ctx.font = `italic ${Math.round((is916 ? 20 : 18) * fontMultiplier)}px "Playfair Display", serif`;
    const engLines = wrapText(ctx, data.englishText, contentMaxWidth - 40);
    const engLineHeight = Math.round((is916 ? 30 : 26) * fontMultiplier);
    const engCardH = engLines.length * engLineHeight + 28;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.strokeStyle = "rgba(251, 191, 36, 0.25)";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.roundRect(margin + 40, currentY, contentMaxWidth, engCardH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = `italic ${Math.round((is916 ? 19 : 17) * fontMultiplier)}px "Playfair Display", serif`;
    ctx.fillStyle = theme.colors.textSecondary;

    let engY = currentY + 22;
    for (const line of engLines) {
      ctx.fillText(line, targetW / 2, engY);
      engY += engLineHeight;
    }

    currentY += engCardH + (is916 ? 30 : 18);
  }

  // 9B. SACRED DEITY FOCAL PORTAL / ARTWORK SHOWCASE (Fills remaining lower blank space)
  const sealY = targetH - margin - 50;
  const spaceBelowContent = (sealY - 32) - currentY;
  const showFocal = data.showDeityFocalFrame ?? options.showDeityFocalFrame ?? true;

  if (resolvedDeity && showFocal && spaceBelowContent >= 180) {
    const frameTop = currentY + (is916 ? 16 : 10);
    const frameH = spaceBelowContent - (is916 ? 26 : 16);
    const frameW = contentMaxWidth;
    const frameX = margin + 40;
    const frameRadius = 20;

    // Glowing aura behind portal
    const auraGrad = ctx.createRadialGradient(
      targetW / 2,
      frameTop + frameH / 2,
      20,
      targetW / 2,
      frameTop + frameH / 2,
      frameW * 0.7
    );
    auraGrad.addColorStop(0, theme.colors.glow);
    auraGrad.addColorStop(0.6, "rgba(0,0,0,0.1)");
    auraGrad.addColorStop(1, "transparent");
    ctx.fillStyle = auraGrad;
    ctx.fillRect(frameX - 20, frameTop - 20, frameW + 40, frameH + 40);

    ctx.save();
    // Clip rounded rectangle
    ctx.beginPath();
    ctx.roundRect(frameX, frameTop, frameW, frameH, frameRadius);
    ctx.clip();

    // Dark canvas backing
    ctx.fillStyle = "rgba(4, 8, 18, 0.92)";
    ctx.fillRect(frameX, frameTop, frameW, frameH);

    if (deityImg && deityImg.complete && deityImg.naturalWidth > 0) {
      // Draw deity portrait image with optimal cover and focus
      const scale = Math.max(frameW / deityImg.naturalWidth, frameH / deityImg.naturalHeight);
      const drawW = deityImg.naturalWidth * scale;
      const drawH = deityImg.naturalHeight * scale;
      const drawX = frameX + (frameW - drawW) / 2;
      const drawY = frameTop + (frameH - drawH) / 2;

      ctx.globalAlpha = 0.96;
      ctx.drawImage(deityImg, drawX, drawY, drawW, drawH);

      // Vignette / Soft Edge Gradients inside the frame
      const frameVignette = ctx.createLinearGradient(0, frameTop, 0, frameTop + frameH);
      frameVignette.addColorStop(0, "rgba(0, 0, 0, 0.65)");
      frameVignette.addColorStop(0.18, "rgba(0, 0, 0, 0.0)");
      frameVignette.addColorStop(0.80, "rgba(0, 0, 0, 0.0)");
      frameVignette.addColorStop(1, "rgba(0, 0, 0, 0.8)");
      ctx.fillStyle = frameVignette;
      ctx.fillRect(frameX, frameTop, frameW, frameH);
    } else {
      // Fallback sacred glowing yantra vector while loading
      ctx.fillStyle = "rgba(10, 15, 30, 0.95)";
      ctx.fillRect(frameX, frameTop, frameW, frameH);

      ctx.strokeStyle = theme.colors.accentGold;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(targetW / 2, frameTop + frameH / 2, 70, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = 'bold 54px "Noto Serif Devanagari", serif';
      ctx.fillStyle = theme.colors.accentGold;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(resolvedDeity.icon || "🔱", targetW / 2, frameTop + frameH / 2);
    }

    ctx.restore();

    // Dual Ornate Gold Frame Borders
    ctx.strokeStyle = theme.colors.border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(frameX, frameTop, frameW, frameH, frameRadius);
    ctx.stroke();

    // Inner hairline gold accent
    ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(frameX + 6, frameTop + 6, frameW - 12, frameH - 12, frameRadius - 4);
    ctx.stroke();

    // Corner Ornaments on focal frame
    drawCornerFlourish(ctx, frameX + 8, frameTop + 8, 24, theme.colors.accentGold, 1);
    drawCornerFlourish(ctx, frameX + frameW - 8, frameTop + 8, 24, theme.colors.accentGold, 2);
    drawCornerFlourish(ctx, frameX + frameW - 8, frameTop + frameH - 8, 24, theme.colors.accentGold, 3);
    drawCornerFlourish(ctx, frameX + 8, frameTop + frameH - 8, 24, theme.colors.accentGold, 4);

    // Divine Header Pill on the Portal
    let portalLabel = "✨ दिव्य दर्शनम् • श्री महाकाल ✨";
    if (data.type === "shiv_mantra") {
      portalLabel = "✨ दिव्य दर्शनम् • ॐ नमः शिवाय हर हर महादेव ✨";
    } else if (data.type === "krishna_suvichar" || data.type === "bhagavad_gita") {
      portalLabel = "✨ दिव्य दर्शनम् • ॐ नमो भगवते वासुदेवाय ✨";
    } else if (data.type === "sunderkand") {
      portalLabel = "✨ दिव्य दर्शनम् • संकटमोचन महावीर हनुमान ✨";
    } else if (data.type === "ramcharitmanas") {
      portalLabel = "✨ दिव्य दर्शनम् • मर्यादा पुरुषोत्तम श्री राम ✨";
    }

    const pillMetrics = ctx.measureText(portalLabel);
    const pillW = Math.min(frameW - 40, pillMetrics.width + 44);
    const pillH = 32;

    ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
    ctx.strokeStyle = theme.colors.accentGold;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(targetW / 2 - pillW / 2, frameTop + 14, pillW, pillH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 14px "Noto Serif Devanagari", "JetBrains Mono", sans-serif';
    ctx.fillStyle = theme.colors.accentGold;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(portalLabel, targetW / 2, frameTop + 14 + pillH / 2);
  }

  // 10. BOTTOM CONSECRATED SEAL & AUDIO / BRANDING FOOTER
  if (showBranding) {
    const sealY = targetH - margin - 50;

    // Plaque box for bottom seal
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.strokeStyle = theme.colors.border;
    ctx.lineWidth = 1.5;

    const sealBoxW = contentMaxWidth;
    const sealBoxH = 65;
    ctx.beginPath();
    ctx.roundRect(targetW / 2 - sealBoxW / 2, sealY - 32, sealBoxW, sealBoxH, 16);
    ctx.fill();
    ctx.stroke();

    // Top line of seal with deity-specific invocation
    ctx.font = 'bold 15px "JetBrains Mono", sans-serif';
    ctx.fillStyle = theme.colors.accentGold;
    let consecratedTop = "ॐ नमो भगवते वासुदेवाय • CONSECRATED IBD SHASTRA";
    if (data.type === "shiv_mantra") {
      consecratedTop = "ॐ नमः शिवाय • हर हर महादेव • CONSECRATED IBD SHASTRA";
    } else if (data.type === "sunderkand" || data.type === "ramcharitmanas") {
      consecratedTop = "सियावर रामचंद्र की जय • पवनसुत हनुमान की जय";
    } else if (data.type === "krishna_suvichar" || data.type === "bhagavad_gita") {
      consecratedTop = "ॐ नमो भगवते वासुदेवाय • जय श्री कृष्ण";
    }
    ctx.fillText(consecratedTop, targetW / 2, sealY - 10);

    // Bottom official seal
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillStyle = "rgba(253, 230, 138, 0.85)";
    ctx.fillText(
      data.sealText || "IBD — AN INDIAN BHAKTI DHARA PRODUCTION",
      targetW / 2,
      sealY + 14
    );
  }
}

// Utility to download the canvas as a high-res PNG file
export function downloadCanvasPng(
  canvas: HTMLCanvasElement,
  filename: string = "Sacred_Card.png"
) {
  try {
    const imageUri = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = filename;
    link.href = imageUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error("Failed to download canvas PNG:", err);
    return false;
  }
}

// Utility to copy canvas PNG directly to system clipboard
export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ]);
            resolve(true);
          } else {
            resolve(false);
          }
        } catch (clipErr) {
          console.warn("Clipboard write failed, fallbacking:", clipErr);
          resolve(false);
        }
      }, "image/png");
    } catch {
      resolve(false);
    }
  });
}

// Render a SacredCardData object to an offscreen canvas and return a PNG Blob
export async function renderCardToBlob(
  cardData: SacredCardData,
  options: {
    aspectRatio?: SacredAspectRatio;
    themeId?: string;
    deityArtStyle?: DeityArtStyle;
    showDeityFocalFrame?: boolean;
    deityBackdropOpacity?: number;
  } = {}
): Promise<Blob | null> {
  const resolved = resolveDeityArt(cardData, options.deityArtStyle);
  if (resolved) {
    await preloadImage(resolved.src);
  }

  return new Promise((resolve) => {
    try {
      const offscreenCanvas = document.createElement("canvas");
      renderSacredCard(offscreenCanvas, cardData, {
        aspectRatio: options.aspectRatio || "9:16",
        themeId: options.themeId || "kailash_neelkanth_cyan",
        deityArtStyle: options.deityArtStyle,
        showDeityFocalFrame: options.showDeityFocalFrame,
        deityBackdropOpacity: options.deityBackdropOpacity,
      });

      offscreenCanvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png", 1.0);
    } catch (err) {
      console.error("renderCardToBlob failed:", err);
      resolve(null);
    }
  });
}

// Render a SacredCardData object to an offscreen canvas and return base64 data URL
export async function renderCardToDataUrl(
  cardData: SacredCardData,
  options: {
    aspectRatio?: SacredAspectRatio;
    themeId?: string;
    deityArtStyle?: DeityArtStyle;
    showDeityFocalFrame?: boolean;
    deityBackdropOpacity?: number;
  } = {}
): Promise<string | null> {
  try {
    const resolved = resolveDeityArt(cardData, options.deityArtStyle);
    if (resolved) {
      await preloadImage(resolved.src);
    }
    const offscreenCanvas = document.createElement("canvas");
    renderSacredCard(offscreenCanvas, cardData, {
      aspectRatio: options.aspectRatio || "9:16",
      themeId: options.themeId || "kailash_neelkanth_cyan",
      deityArtStyle: options.deityArtStyle,
      showDeityFocalFrame: options.showDeityFocalFrame,
      deityBackdropOpacity: options.deityBackdropOpacity,
    });
    return offscreenCanvas.toDataURL("image/png", 1.0);
  } catch (err) {
    console.error("renderCardToDataUrl failed:", err);
    return null;
  }
}

// Utility to download a single Blob as file
export function downloadSingleBlob(blob: Blob, filename: string): boolean {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (err) {
    console.error("downloadSingleBlob failed:", err);
    return false;
  }
}

// Utility to package multiple PNG Blobs into a clean ZIP archive and trigger download
export async function downloadZipArchive(
  files: { name: string; blob: Blob }[],
  zipFilename: string = "Sacred_Deck_10_Slides.zip",
  onProgress?: (percent: number) => void
): Promise<boolean> {
  try {
    const zip = new JSZip();
    
    // Add each file to the root of the ZIP
    for (const file of files) {
      zip.file(file.name, file.blob);
    }

    const zipBlob = await zip.generateAsync(
      {
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 },
      },
      (metadata) => {
        if (onProgress) {
          onProgress(Math.round(metadata.percent));
        }
      }
    );

    return downloadSingleBlob(zipBlob, zipFilename);
  } catch (err) {
    console.error("downloadZipArchive failed:", err);
    return false;
  }
}
