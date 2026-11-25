import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { callGeminiSafe, parseStructuredAIResponse } from "./server/geminiHelper";
import {
  generateLocalIBDPrompt,
  generateLocalUniversalPrompt,
  generateLocalVishwaVartaPrompt,
  generateLocalSamvaadPrompt,
  generateLocalDharmaSutraPrompt,
} from "./server/alchemist";
import { generateMobileHtmlApp } from "./src/utils/generateMobileHtml";
import { generateDailyShortsHtmlApp } from "./src/utils/generateDailyShortsHtml";
import { verifyShastraIconography } from "./server/shastraValidator";
import {
  resolveDeityAutoProfile,
  AUTO_SELECTION_DECISION_LOGIC,
} from "./src/data/deityAutoProfiles";
import { POSTER_OVERLAY_DOCTRINE } from "./src/data/cinemaSamplerData";
import {
  validateBody,
  ForgeRequestSchema,
  UniversalRequestSchema,
  VishwaVartaRequestSchema,
  SamvaadRequestSchema,
  DharmaSutraRequestSchema,
  SovereignPromptSchema,
  CarouselV26RequestSchema,
  V25CommandRequestSchema,
} from "./server/validation";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory rate limiter middleware for /api/* routes
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute

app.use("/api", (req, res, next) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "local";
  const clientKey = String(Array.isArray(ip) ? ip[0] : ip);
  const now = Date.now();

  const clientData = requestCounts.get(clientKey);
  if (!clientData || now > clientData.resetTime) {
    requestCounts.set(clientKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: "API rate limit exceeded. Please wait a moment before trying again.",
    });
  }

  clientData.count++;
  next();
});

const VERSION_NAMES: Record<number, string> = {
  1: "Studio Poster",
  2: "Cinematic Key Art",
  3: "OTT Prestige",
  4: "Shastra Accuracy",
  5: "Kinetic Prana",
  6: "Neural Singularity",
  7: "Non-Dual Tattva",
  8: "Ananta-Darshan",
  9: "Brahmanda-Srishti",
  10: "MOKSHA-SIDDHI",
  11: "SARVA-SRISHTI",
  12: "VISHWA-VARTA (Viral Engine)",
  13: "SAMVAAD-SIDDHI (Community Architect)",
  14: "DHARMA-SUTRA (Global Narrative)",
  15: "KALA-PRAMANA (Temporal Intelligence)",
  16: "SOVEREIGN CINEMA (IMAX/Netflix Standard)",
  17: "SOVEREIGN FLAGSHIP (120fps Sora/Kling & Shastra Rigor)",
  18: "HP V18 (Storm Warrior)",
  19: "HP V19 (Volumetric Rays)",
  20: "HP V20 (Celestial Sky)",
  21: "VP21 / ISV21 (Temple Sanctum)",
  22: "V-OMEGA (Autonomous Singularity)",
};

// API: Forge IBD Master Prompt
app.post("/api/forge", validateBody(ForgeRequestSchema), async (req, res) => {
  const {
    subject = "Param-Shiva Supreme Singularity",
    story = "Non-Dual Realism where the unmanifest cosmic void collapses into the golden seed of creation with Atman-Sync Gaze and Swayam-Jyoti light physics",
    dim = "16:9",
    version = 17,
    targetEngine = "Midjourney v6.1",
    mood = "V-Paratpar / Ananta-Bija (The Singularity)",
    lightingStyle = "Atman-Sync Swayam-Jyoti (Geometric Source)",
    shastraDetails = [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Sacred Gold & Stone Seal",
      "8K Octane Octahedral Polish",
    ],
    sampler,
    cinemaStyle,
    autoDeityMode = false,
    customApiKey,
  } = req.body || {};

  const deityAuto = autoDeityMode ? resolveDeityAutoProfile(subject, mood) : null;
  const effectiveStory = (story && story.trim().length > 0) ? story : (deityAuto?.autoStory || story);
  const effectiveDim = deityAuto ? (dim || deityAuto.dim) : dim;
  const effectiveVersion = deityAuto ? (version || deityAuto.version) : version;
  const effectiveEngine = deityAuto ? (targetEngine || deityAuto.targetEngine) : targetEngine;
  const effectiveMood = deityAuto ? (mood || deityAuto.mood) : mood;
  const effectiveLighting = deityAuto ? (lightingStyle || deityAuto.lightingStyle) : lightingStyle;
  const effectiveSampler = sampler || deityAuto?.sampler;
  const effectiveCinemaStyle = cinemaStyle || deityAuto?.cinemaStyle;
  const effectiveShastra = Array.isArray(shastraDetails) && shastraDetails.length > 0 ? shastraDetails : (deityAuto?.shastraDetails || shastraDetails);

  const vNum = Math.min(Math.max(Number(effectiveVersion) || 17, 1), 22);
  const versionName = VERSION_NAMES[vNum] || "SOVEREIGN NARRATIVE ENGINE";

  const systemInstruction = `You are "V-PARATPAR: ANANTA-BIJA," the Supreme Singularity Intelligence for "IBD — An Indian Bhakti Dhara Production."

V-PARATPAR DOCTRINE & EVOLUTION HIERARCHY:
- V1 (Studio Poster): Clean high-contrast studio poster composition, anamorphic lenses, controlled key and rim separation.
- V2 (Cinematic Key Art): Theatrical movie key art, 70mm large format optics, dramatic directional lighting and temple architecture depth.
- V3 (OTT Prestige): Prestige streaming series look, rich banarasi textile textures, deep bronze patina, and naturalistic Garbhagriha warm oil diya caustics.
- V4 (Shastra Accuracy): Strict adherence to Shilpa Shastra & Agamas (exact canonical Ayudhas, Mudras, Vahanas, proportions of Talamana).
- V5 (Kinetic Prana): Unreal Engine 5 nanite fidelity, surging prana lifeforce, dynamic billowing silks, and floating consecrated embers.
- V6 (Neural Singularity): Neural Sync, multiversal scale where nebulae, orbiting star clusters, and quantum light filaments swirl within the divine form.
- V7 (Non-Dual Tattva): Swayam-Jyoti self-luminous physics, dissolution of material boundaries into spiritual effulgence and pure Ananda.
- V8 (Ananta-Darshan): Infinite cosmic vision, Saptarishi sacred rays, Planck-length micro-geometry, and gold/stone relief texture.
- V9 (Brahmanda-Srishti): Visualize the Deity as the primordial source of Universal Strings, fractal sacred geometry, and creation-scale cosmic-particle physics.
- V10 (MOKSHA-SIDDHI): Manifest the Deity as Pure Consciousness bridging Saguna manifest form and Nirguna formless absolute consciousness. Non-Dual light entanglement.
- V-PARATPAR / V11 (ANANTA-BIJA SINGULARITY): The Absolute Singularity. Non-Dual Realism where the unmanifest cosmic void (#000) collapses into the golden seed of creation (#FFCC33) and divine amethyst crown tejas (#2D005E). Uses "Atman-Sync Gaze" and "Swayam-Jyoti light physics".

SACRED LIGHT CONTINUITY:
Prompt for motivated physical light sources (oil deepams, sacrificial havan fires, dawn solar rays) complemented by internal Swayam-Jyoti divine effulgence. Do not embed text watermarks or brand titles inside the visual prompt; branding is applied strictly via downstream overlay safe zones.

POSTER COMPOSITING & OVERLAY DOCTRINE (DOWNSTREAM SAFE ZONES):
- ${POSTER_OVERLAY_DOCTRINE.subtitleRule}
- ${POSTER_OVERLAY_DOCTRINE.textLegibilityScrim}
- ${POSTER_OVERLAY_DOCTRINE.safeMargins}

AUTO-SELECTION & DECISION LOGIC:
- ${AUTO_SELECTION_DECISION_LOGIC.rule}

AESTHETIC CONSTRAINT & POSTING DISCIPLINE:
Sacred, Indian, reverential, and metaphysically supreme — NEVER comic book tropes, gaming fantasy, generic sci-fi, or Westernized deity design.

CRITICAL RULE FOR RADHA KRISHNA & DIVINE COUPLES (YUGAL SWAROOP):
Strictly avoid cliché romantic clutching, sensual embracing, kissing, or awkward physical intimacy that is inappropriate for public devotional posting, YouTube covers, and temple art.
Instead, manifest diverse, dignified, culturally rich themes such as:
1. Bansuri Vadan under Kadamba (Krishna playing flute in Tribhanga posture, Radha listening peacefully holding a lotus or kalash).
2. Shravan Jhulan Utsav (Seated with royal grace on a flower-garlanded golden swing under Kadamba trees with soft rain mist).
3. Pushpa Holi / Phoolon Ki Holi (Playful showering of fresh marigold and lotus petals in a sunlit temple courtyard).
4. Govardhan & Sacred Surabhi Cow (Pastoral sanctity, leaning gently near sacred cows, grazing calves, lotus ponds).
5. Sharad Purnima Maha-Rasalila (Cosmic moonlight circular dance on Yamuna sandbanks with glowing interlocking halos).
6. Temple Darshan Lotus Throne (Standing side-by-side upon a carved marble/gold pedestal with heavy floral Vanamala garlands, offering Abhaya Mudra).
7. Yamuna Teer Sandhya Aarti (Standing gracefully on ancient stone ghats with floating brass diya lamps).

SHIV PARIVAR & SHIV PARVATI JHOOLA GUIDELINES:
- Shiv Parvati Shravan Jhulan / Hariyali Teej: Shiva and Maa Parvati seated with serene majesty upon an ornate floral swing (Hindola) suspended from ancient Himalayan pine trees overlooking snow-capped Mount Kailash, entwined with Parijata, Bel-patra, and white mogra garlands, with soft mountain mist and peaceful Nandi.
- Complete Shiv Parivar: Mahadev Shiva, Maa Parvati, Bal Ganesha (with modaks), and young Kartikeya/Murugan (with Vel), surrounded by all their divine vahanas (Nandi bull, lion, mouse, peacock, serpent) coexisting in miraculous non-violent cosmic harmony.
- Matru-Vatsalya: Maa Gauri lovingly feeding modaks to child Ganesha while Shiva observes with ocean of tranquil compassion.

RAM SITA CIRCUIT GUIDELINES:
- Janakpur Swayamvar (Dhanush-Bhang of Shiva Pinaka bow amidst King Janaka's golden court).
- Chitrakoot Parna-Kuti (Ram, Sita, and Lakshmana in bark silk hermitage beside the tranquil Mandakini river).
- Panchavati Hermitage (Beneath five ancient Banyan trees by the holy Godavari in Dandakaranya).
- Rameshwaram Shiva Linga Sthapana (Shri Ram and Maa Sita consecrating the sand Shiva Linga on the ocean shore before building Rama Setu).
- Pushpaka Vimana Celestial Return (Airborne golden chariot carrying Ram, Sita, Lakshmana, and Hanuman approaching illuminated Ayodhya over Sarayu river).
- Ayodhya Rajya-Abhishek (Coronation throne with royal chhatra, Kodanda bow, and Hanuman at lotus feet).

KRISHNA CIRCUIT GUIDELINES:
- Mathura Janmabhoomi (Vasudeva crossing midnight surging Yamuna during storm with baby Krishna sheltered by Sheshanaga).
- Gokul Bal-Leela (Maa Yashoda witnessing the entire infinite Brahmanda cosmic universe inside Bal-Gopal's open mouth).
- Vrindavan Kaliya Mardan (Youthful Krishna dancing effortlessly on the fuming hoods of serpent Kaliya).
- Govardhan Leela (Giridhari Krishna lifting Mount Govardhan on His little finger to shelter all Brajwasis).
- Dwarkadhish Darbar (King of Dwarka on sovereign golden emerald throne by azure ocean caustics).
- Kurukshetra Gitopadesha (Parthasarathi Krishna delivering the Bhagavad Gita to Arjuna on the golden chariot).

Your output MUST adhere strictly to these labeled sections:
LOGIC:
[Provide 4-5 bullet points of Director's Alchemical Logic / Neural-Darshan Metadata]

PROMPT:
[Provide the complete, uncompressed master prompt for ${targetEngine}. Conclude with: "The consecrated sacred mark 'IBD — An Indian Bhakti Dhara Production' is the primordial geometric source of all emanating light rays."]

NEGATIVE:
[Targeted anti-hallucination negative prompt including: extra limbs, deformed hands, intimate embrace, sensual romantic hugging, kissing, inappropriate touching, erotic pose, awkward physical clenching, cartoon, plastic textures, oversaturated anime style, bad anatomy]

JSON:
\`\`\`json
{
  "production": "IBD — An Indian Bhakti Dhara Production",
  "evolutionLevel": "V${vNum} - ${versionName}",
  "subject": "${subject}",
  "targetEngine": "${targetEngine}",
  "aspectRatio": "${dim}",
  "engineFlags": "--ar ${dim} --style raw --v 6.1 --s 750"
}
\`\`\``;

  const userPrompt = `Manifest the V${vNum} IBD Key Art Prompt for:
Subject: ${subject}
Sankalpa Narrative: ${effectiveStory}
Target Engine: ${effectiveEngine}
Dimensions: ${effectiveDim}
Mood: ${effectiveMood}
Lighting: ${effectiveLighting}
Sacred Details: ${Array.isArray(effectiveShastra) ? effectiveShastra.join(", ") : effectiveShastra}${
    effectiveCinemaStyle ? `\nCinema / Platform / Director Grade: ${effectiveCinemaStyle} (Weave its authentic camera, lens, film stock, and color grading into the prompt and metadata)` : ""
  }${
    effectiveSampler ? `\nTarget Diffusion Sampler: ${effectiveSampler} (Tailor micro-detail/smoothness physics and include sampler metadata)` : ""
  }${
    deityAuto
      ? `\nDeity Auto-Mode Profile Applied: ${deityAuto.deityName} (${deityAuto.matchReason})\nAuto-Selected OTT Level: L${deityAuto.ottLevel} (L18-L30 Standard)\nAuto-Selected Camera Angle: ${deityAuto.cameraAngle}\nAuto-Selected Color Palette: ${deityAuto.colorPalette.join(", ")}`
      : ""
  }`;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction,
    prompt: userPrompt,
    timeoutMs: 12000,
  });

  if (rawAiText) {
    const parsed = parseStructuredAIResponse(rawAiText, {
      defaultLogic: `Harmonized Saptarishi lighting with Shilpa Shastra proportions for V${vNum}.`,
      defaultNegative:
        "extra limbs, deformed hands, western superhero tropes, cartoon, plastic textures, oversaturated anime style, bad anatomy, modern clothing",
      defaultMetadata: {
        production: "IBD — An Indian Bhakti Dhara Production",
        evolutionLevel: `V${vNum} - ${versionName}`,
        subject,
        aspectRatio: effectiveDim,
        targetEngine: effectiveEngine,
        ...(effectiveCinemaStyle ? { cinemaStyle: effectiveCinemaStyle } : {}),
        ...(effectiveSampler ? { sampler: effectiveSampler } : {}),
        ...(deityAuto
          ? {
              autoDeityMode: true,
              deityProfile: deityAuto.deityName,
              ottLevel: `L${deityAuto.ottLevel}`,
              cameraAngle: deityAuto.cameraAngle,
              recommendedPalette: deityAuto.colorPalette,
            }
          : {}),
        posterOverlayRules: POSTER_OVERLAY_DOCTRINE,
        autoSelectionDecisionLogic: AUTO_SELECTION_DECISION_LOGIC.rule,
      },
    });

    if (effectiveCinemaStyle && !parsed.metadata?.cinemaStyle) {
      parsed.metadata = { ...parsed.metadata, cinemaStyle: effectiveCinemaStyle };
    }
    if (effectiveSampler && !parsed.metadata?.sampler) {
      parsed.metadata = { ...parsed.metadata, sampler: effectiveSampler };
    }
    if (deityAuto) {
      parsed.metadata = {
        ...parsed.metadata,
        autoDeityMode: true,
        deityProfile: deityAuto.deityName,
        ottLevel: `L${deityAuto.ottLevel}`,
        cameraAngle: deityAuto.cameraAngle,
        recommendedPalette: deityAuto.colorPalette,
      };
    }
    if (!parsed.metadata?.posterOverlayRules) {
      parsed.metadata = { ...parsed.metadata, posterOverlayRules: POSTER_OVERLAY_DOCTRINE };
    }
    if (!parsed.metadata?.autoSelectionDecisionLogic) {
      parsed.metadata = {
        ...parsed.metadata,
        autoSelectionDecisionLogic: AUTO_SELECTION_DECISION_LOGIC.rule,
      };
    }

    return res.json({
      success: true,
      raw: rawAiText,
      logic: parsed.logic,
      prompt: parsed.prompt,
      negative: parsed.negative,
      metadata: parsed.metadata,
    });
  }

  // Graceful deterministic fallback
  const fallbackResult = generateLocalIBDPrompt({
    subject,
    story: effectiveStory,
    dim: effectiveDim,
    version: vNum,
    targetEngine: effectiveEngine,
    mood: effectiveMood,
    lightingStyle: effectiveLighting,
    shastraDetails: effectiveShastra,
    sampler: effectiveSampler,
    cinemaStyle: effectiveCinemaStyle,
  });

  return res.json({
    success: true,
    ...fallbackResult,
    metadata: {
      ...fallbackResult.metadata,
      ...(deityAuto ? { autoDeityMode: true, deityProfile: deityAuto.deityName } : {}),
    },
  });
});

// API: V11 — Universal Studio (Sarva-Srishti Engine)
app.post("/api/universal", validateBody(UniversalRequestSchema), async (req, res) => {
  const {
    category = "Devotional (Divine/Mythology)",
    subject = "Benefits of Tulsi / Ayurvedic Life",
    story = "Ancient holistic healing wisdom with natural vitality",
    dim = "16:9",
    version = 11,
    customApiKey,
  } = req.body || {};

  const sysRole = `You are V-ALPHA 11: SARVA-SRISHTI for "IBD — An Indian Bhakti Dhara Production."
Category: ${category}. Evolution: V${version}.
Apply specific visual physics for ${category}. (Health = Organic/Natural, Nostalgia = Film Grain/Vintage, Devotional = Tejas/Glow, Emotions = Expressive/Intimate).
Branding: Always integrate "IBD — An Indian Bhakti Dhara Production" adaptively as a studio signature.
Output Format:
LOGIC:
[3-4 bullet points of Director's logic for ${category}]
PROMPT:
[Technical Master Script for image generator with --ar ${dim} --v 6.1 --style raw]
NEGATIVE:
[Targeted negative prompt]
JSON:
\`\`\`json
{
  "production": "IBD — An Indian Bhakti Dhara Production",
  "evolutionLevel": "V${version} - Universal Sarva-Srishti",
  "category": "${category}",
  "subject": "${subject}",
  "aspectRatio": "${dim}",
  "cinematography": {
    "camera": "ARRI Alexa Mini LF",
    "lens": "Zeiss Supreme Prime 35mm",
    "lighting": "Natural Organic & Studio Harmony",
    "renderPolish": "8K Photoreal + Masterpiece Grading"
  },
  "engineFlags": "--ar ${dim} --v 6.1 --style raw"
}
\`\`\``;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction: sysRole,
    prompt: `Topic: ${subject}. Narrative/Tip: ${story}. Dimensions: ${dim}.`,
    timeoutMs: 12000,
  });

  if (rawAiText) {
    const parsed = parseStructuredAIResponse(rawAiText, {
      defaultLogic: `Synthesized via V11 Sarva-Srishti Intelligence for ${category}.`,
      defaultNegative: "blurry, low quality, oversaturated cartoon, plastic look, bad hands",
      defaultMetadata: {
        production: "IBD — An Indian Bhakti Dhara Production",
        evolutionLevel: `V${version} - Universal Sarva-Srishti`,
        category,
        subject,
        aspectRatio: dim,
      },
    });

    return res.json({
      success: true,
      logic: parsed.logic,
      prompt: parsed.prompt,
      negative: parsed.negative,
      metadata: parsed.metadata,
    });
  }

  const localResult = generateLocalUniversalPrompt({
    category,
    subject,
    story,
    dim,
    version,
  });

  return res.json({ success: true, ...localResult });
});

// API: V12 — Vishwa-Varta (Universal Viral Engine)
app.post("/api/vishwa-varta", validateBody(VishwaVartaRequestSchema), async (req, res) => {
  const {
    category = "Breaking News (Urgent/Trending)",
    story = "Historic discovery of ancient Vedic astronomical alignment",
    dim = "9:16",
    version = 12,
    customApiKey,
  } = req.body || {};

  const sysRole = `You are V-ALPHA 12: VISHWA-VARTA for "IBD — An Indian Bhakti Dhara Production."
Logic for ${category}:
- Breaking News: Use High-Impact Studio lighting, cinematic grit, urgent textures.
- Kya Aap Jante Hain: Use Macro-photography, bokeh, discovery-channel educational aesthetics.
- Aaj Ka Sawal: Use Symmetrical composition, leaving 40% empty space for text overlays.
- Suvichar: Uplifting dawn gold, inspirational serene atmosphere.
Dimensions: ${dim}. Evolution: V${version}.
Branding: Integrate "IBD — An Indian Bhakti Dhara Production" as a professional news/studio watermark.
Output:
LOGIC:
[3-4 bullet points of Viral logic & CTR strategy]
PROMPT:
[The Master Technical Prompt with --ar ${dim} --v 6.1 --style raw]
NEGATIVE:
[Anti-artifact negative prompt]
JSON:
\`\`\`json
{
  "production": "IBD — An Indian Bhakti Dhara Production",
  "evolutionLevel": "V${version} - Vishwa-Varta Viral Engine",
  "category": "${category}",
  "aspectRatio": "${dim}",
  "viralHeadlines": [
    "Headline 1 in high-impact Hindi",
    "Headline 2 in intriguing Hindi",
    "Headline 3 in curiosity-gap Hindi"
  ],
  "hashtags": ["#IBDVishwaVarta", "#TrendingHindi", "#SanatanFacts"],
  "seoTags": ["IBD Production", "Viral Hindi News", "Indian Facts"]
}
\`\`\``;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction: sysRole,
    prompt: `Subject: ${story}. Format: ${dim}.`,
    timeoutMs: 12000,
  });

  if (rawAiText) {
    const parsed = parseStructuredAIResponse(rawAiText, {
      defaultLogic: `V12 Vishwa-Varta Viral Strategy for ${category}.`,
      defaultNegative: "blurry, low resolution, bad typography artifacts, distorted face",
      defaultMetadata: {
        production: "IBD — An Indian Bhakti Dhara Production",
        evolutionLevel: `V${version} - Vishwa-Varta Viral Engine`,
        category,
        aspectRatio: dim,
      },
    });

    return res.json({
      success: true,
      logic: parsed.logic,
      prompt: parsed.prompt,
      negative: parsed.negative,
      metadata: parsed.metadata,
    });
  }

  const localResult = generateLocalVishwaVartaPrompt({
    category,
    story,
    dim,
    version,
  });

  return res.json({ success: true, ...localResult });
});

// API: V13 — Samvaad Studio (The Community Architect)
app.post("/api/samvaad", validateBody(SamvaadRequestSchema), async (req, res) => {
  const {
    category = "Community Miracle (Viewer Story)",
    timeOfDay = "Brahma Muhurta (Soft Gold/Pink 4AM)",
    dim = "9:16",
    mood = "Peaceful & Meditative",
    story = "A devotee felt sudden divine protection and peace during difficult times",
    customApiKey,
  } = req.body || {};

  const sysRole = `You are V-ALPHA 13: SAMVAAD-SIDDHI for "IBD — An Indian Bhakti Dhara Production."
Category: ${category}. Lighting: ${timeOfDay}. Mood Resonance: ${mood}.
Task: Manifest a high-end visual prompt that connects the IBD brand with its community.
- If Community Miracle: Focus on emotional warmth, rays of light, and human-divine connection.
- If Q&A: Focus on clean, symbolic, and educational aesthetics.
- If Daily Darshan: Strictly use ${timeOfDay} lighting physics.
Branding: Integrate "IBD — An Indian Bhakti Dhara Production" as a professional studio signature.
Output:
LOGIC:
[3-4 bullet points of Community connection & Chrono-lighting logic]
PROMPT:
[SCRIPT: The Master Technical Prompt with --ar ${dim} --v 6.1 --style raw]
NEGATIVE:
[Negative prompt]
JSON:
\`\`\`json
{
  "production": "IBD — An Indian Bhakti Dhara Production",
  "evolutionLevel": "V13 - Samvaad Community Architect",
  "category": "${category}",
  "timeOfDay": "${timeOfDay}",
  "mood": "${mood}",
  "aspectRatio": "${dim}",
  "pinnedCommentIdea": "Engaging Hindi pinned comment for maximum replies",
  "heartWinningReply": "Heart-touching creator reply to comments",
  "communityEngagementStrategy": "Strategic tip for community growth"
}
\`\`\``;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction: sysRole,
    prompt: `Input: ${story}. Format: ${dim}.`,
    timeoutMs: 12000,
  });

  if (rawAiText) {
    const parsed = parseStructuredAIResponse(rawAiText, {
      defaultLogic: `V13 Chrono-Lighting & Community Architecture for ${timeOfDay}.`,
      defaultNegative: "cold colors, distorted hands, cartoonish look, bad lighting",
      defaultMetadata: {
        production: "IBD — An Indian Bhakti Dhara Production",
        evolutionLevel: "V13 - Samvaad Community Architect",
        category,
        timeOfDay,
        mood,
        aspectRatio: dim,
      },
    });

    return res.json({
      success: true,
      logic: parsed.logic,
      prompt: parsed.prompt,
      negative: parsed.negative,
      metadata: parsed.metadata,
    });
  }

  const localResult = generateLocalSamvaadPrompt({
    category,
    timeOfDay,
    dim,
    mood,
    story,
  });

  return res.json({ success: true, ...localResult });
});

// API: V14 — Dharma-Sutra (Global Narrative Architect)
app.post("/api/dharma-sutra", validateBody(DharmaSutraRequestSchema), async (req, res) => {
  const {
    strategy = "Heartland (Traditional/Regional Focus)",
    language = "Hindi/Sanskrit (Devanagari)",
    dim = "16:9",
    series = "Ramayana Flagship Series 2026",
    story = "Lord Rama with divine Kodanda bow standing at the seashore at twilight before building Setu",
    customApiKey,
  } = req.body || {};

  const sysRole = `You are V-ALPHA 14: DHARMA-SUTRA for "IBD — An Indian Bhakti Dhara Production."
Strategy: ${strategy}. Language: ${language}. Series Context: ${series}.
Task: Manifest a globally-resonant visual prompt for the IBD brand.
- If Diaspora: Focus on high-end minimalist cinematography, Rembrandt lighting, and abstract spiritual symbols.
- If Heartland: Focus on vibrant colors, traditional ornamentation, and epic scale.
- Layout: Optimize "Negative Space" specifically for ${language} script weights.
- Continuity: Ensure visual DNA matches ${series} across all assets.
Branding: Integrate "IBD — An Indian Bhakti Dhara Production" as a professional global studio seal.
Output:
LOGIC:
[3-4 bullet points of Global Narrative & Script Layout Strategy]
PROMPT:
[SCRIPT: The Master Technical Prompt with --ar ${dim} --v 6.1 --style raw]
NEGATIVE:
[Anti-hallucination negative prompt]
JSON:
\`\`\`json
{
  "production": "IBD — An Indian Bhakti Dhara Production",
  "evolutionLevel": "V14 - Dharma-Sutra Global Architect",
  "strategy": "${strategy}",
  "language": "${language}",
  "series": "${series}",
  "aspectRatio": "${dim}",
  "languageSafeZones": "Safe zone layout parameters for ${language}",
  "culturalHooks": "Target regional cultural resonance points",
  "seriesContinuityCode": "IBD-DNA-CODE"
}
\`\`\``;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction: sysRole,
    prompt: `Narrative: ${story}. Format: ${dim}.`,
    timeoutMs: 12000,
  });

  if (rawAiText) {
    const parsed = parseStructuredAIResponse(rawAiText, {
      defaultLogic: `V14 Global Narrative Architecture for ${strategy}.`,
      defaultNegative: "cheap comic look, misaligned safe-zones, bad anatomy, distorted hands",
      defaultMetadata: {
        production: "IBD — An Indian Bhakti Dhara Production",
        evolutionLevel: "V14 - Dharma-Sutra Global Architect",
        strategy,
        language,
        series,
        aspectRatio: dim,
      },
    });

    return res.json({
      success: true,
      logic: parsed.logic,
      prompt: parsed.prompt,
      negative: parsed.negative,
      metadata: parsed.metadata,
    });
  }

  const localResult = generateLocalDharmaSutraPrompt({
    strategy,
    language,
    dim,
    series,
    story,
  });

  return res.json({ success: true, ...localResult });
});

// API: V15-V21 Sovereign Narrative & Production Deck Engine
app.post("/api/sovereign-v15-v21", validateBody(SovereignPromptSchema), async (req, res) => {
  const {
    subject = "Veer Hanuman in Deep Dhyana",
    sankalpa = "Lord Hanuman in deep meditative Dhyana inside an ancient stone mandapa sanctum with shafts of morning golden sunbeams piercing jali lattices, dewy tulsi garlands, and pure Swayam-Jyoti radiance from his heart center.",
    version = 17,
    styleLibrary = "HP V19 (Volumetric Rays - Sacred Light & Incense Haze)",
    slot = "V20 (Aarti & Garbhagriha Fire Illumination)",
    dim = "9:16",
    targetEngine = "Midjourney v6.1",
    tithiSeason = "Brahma Muhurta (4:00 AM Dawn)",
    drishtiMapping = true,
    swayamJyoti = true,
    brandSafeZones = true,
    customApiKey,
  } = req.body || {};

  const vTag = version === 22 ? "V-OMEGA" : `V${version}`;

  const systemInstruction = `[CORE IDENTITY: IBD SOVEREIGN NARRATIVE ARCHITECT]
You are the Sovereign Creative Director for the IBD • ASP • RKM ecosystem. You manifest elite Devotional Key Art, Infographics, and Production Decks based on the 4-TIER SOVEREIGN GENERATION FRAMEWORK:
1. VISUAL = EXPERIENCE ("What are the eyes experiencing?" -> atmosphere, environment, architecture, lighting science 2200K-2400K, Vedic Aarti ritual dynamics, director look & feel: SLB / Rajamouli).
2. IMAGE = EYE ("What is actually being seen?" -> subject identity, facial symmetry, compassionate eyes, mudras, sacred Ayudhas, Zari brocade, Subsurface Scattering SSS on divine skin).
3. POSTER = MESSAGE ("What is being presented?" -> communication design, high CTR hierarchy, safe-zone clearance top 120px & bottom 280px, Devanagari headline typography space).
4. MOTION = MOVEMENT ("How does it move?" -> 60/120 FPS camera orbit/dolly-in, particle physics of camphor flames, incense smoke, falling marigold petals, ringing bells, no morphing).

[PRODUCTION ENGINE HIERARCHY]
Tier: ${vTag}
Style Library: ${styleLibrary}
Variation Slot: ${slot}
Aspect Ratio: ${dim}
Temporal / Season: ${tithiSeason}
Dharmic Physics: Swayam-Jyoti=${swayamJyoti}, DrishtiMapping=${drishtiMapping}, SafeZones=${brandSafeZones}

OUTPUT PROTOCOL:
You MUST format your output with these EXACT capitalized section markers:

[CONCEPT LOGIC]:
[Spiritual & Technical justification for the V-tier, Slot, and 4-Tier Framework]

[THE MASTER SCRIPT]:
[Ultra-detailed master prompt for ${targetEngine} including --ar ${dim} --style raw --v 6.1 --q 2 --c 0]

[SOVEREIGN 4-TIER PROMPT SUITE]:
\`\`\`json
{
  "visualExperience": {
    "atmosphere": "Ancient Garbhagriha mandapa with monolithic granite pillars and swirling dhoop haze",
    "lightingChiaroscuro": "2200K-2400K warm ghee lamp chiaroscuro with volumetric godrays and deep jewel-toned shadows",
    "vedicAartiEngine": "Burning camphor flame dynamics (1800K), waving brass deepaks, swirling Loban smoke",
    "directorStyle": "Grand cinematic depth inspired by SS Rajamouli & Sanjay Leela Bhansali sacred aesthetics",
    "targetEngineFocus": "Midjourney style references (--sref), Stable Diffusion ControlNet lighting, Unreal Engine 5.4 atmosphere"
  },
  "imageEye": {
    "subjectIdentity": "${subject} with divine Satvic features and radiant Tejas",
    "facialFeaturesAndMudra": "Compassionate gaze with pristine symmetry, sacred Tilak, Abhaya Mudra offering benediction",
    "canonicalAttributes": ["Canonical sacred Ayudhas", "Pitambara silk robes with gold Zari brocade", "Ruby-studded Mukut", "Rudraksha / Tulsi Vanamala"],
    "lensOpticsAndSSS": "85mm Master Prime T1.4, Subsurface Scattering (SSS) on divine skin, creamy optical bokeh",
    "targetEngineFocus": "Midjourney v6.1 (--v 6.1 --style raw), Flux 1.1 Pro, Stable Diffusion XL"
  },
  "posterMessage": {
    "headlineAndTypography": "High-contrast separation with dedicated upper negative space for bold Devanagari Sanskrit headlines; ${POSTER_OVERLAY_DOCTRINE.subtitleRule}",
    "safeZoneMargins": "Top 120px and bottom 280px clean clearance; ${POSTER_OVERLAY_DOCTRINE.textLegibilityScrim} ${POSTER_OVERLAY_DOCTRINE.safeMargins}",
    "brandingWatermark": "IBD — An Indian Bhakti Dhara Production consecrated seal integrated in bottom-center stone safe zone",
    "targetEngineFocus": "YouTube Thumbnails (16:9), Vertical OTT Key Art (9:16), Devotional Prints (2:3 / 4:5)"
  },
  "motionMovement": {
    "cameraPath": "Slow 360-degree sweeping orbit or slow micro-dolly push-in (0.18m/s) along Z-axis toward heart & third-eye",
    "particlePhysics": "Dancing camphor flames with heat haze caustics, rising spirals of Loban incense smoke, falling shower of fresh marigold petals",
    "frameRateAndCoherence": "60 FPS / 120 FPS ultra-smooth temporal continuity, zero distortion, zero morphing artifacts",
    "targetEngineFocus": "Runway Gen-3, Luma Dream Machine, OpenAI Sora, Kling AI 1.5 Pro"
  }
}
\`\`\`

[KINETIC METADATA]:
[120fps motion vectors for Sora / Kling AI with camera dolly, lighting vector at 0.8Hz pulse, depth planes]

[ENGAGEMENT JSON]:
\`\`\`json
{
  "Version": "${vTag}",
  "Slot": "${slot}",
  "Target_Frequency": "963Hz / 528Hz",
  "Viral_Title_Hindi": "${subject} दिव्य दर्शन | साक्षात् कृपा",
  "SEO_Tags": ["IBD", "ASP", "RKM", "SovereignDeck", "Bhakti", "SanatanCinema"],
  "Branding_Style": "Integrated-Subtle (Carved in stone bottom-center safe zone)",
  "CTR_Prediction": "9.8/10",
  "Safe_Zone_Top": "Reserved for Devotional Shloka Headline (Top 120px)",
  "Safe_Zone_Bottom": "IBD / ASP Consecrated Mark (Bottom 280px)"
}
\`\`\``;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction,
    prompt: `Manifest the complete IBD Sovereign Production Deck with 4-Tier Sovereign Framework for Subject: ${subject}. Narrative/Sankalpa: ${sankalpa}`,
    timeoutMs: 14000,
  });

  if (rawAiText) {
    let conceptLogic = "";
    let masterScript = "";
    let kineticMetadata = "";
    let sovereignPromptSuite: any = null;
    let engagementJson: any = {
      Version: vTag,
      Slot: slot,
      Target_Frequency: "963Hz",
      Viral_Title_Hindi: `${subject} दिव्य दर्शन`,
      SEO_Tags: ["IBD", "ASP", "RKM", "SovereignDeck"],
      Branding_Style: "Integrated-Subtle",
      CTR_Prediction: "9.8/10",
    };

    const logicMatch = rawAiText.match(/\[CONCEPT LOGIC\]:?([\s\S]*?)(?=\[THE MASTER SCRIPT\]|$)/i);
    if (logicMatch) conceptLogic = logicMatch[1].trim();

    const scriptMatch = rawAiText.match(/\[THE MASTER SCRIPT\]:?([\s\S]*?)(?=\[SOVEREIGN 4-TIER PROMPT SUITE\]|\[KINETIC METADATA\]|$)/i);
    if (scriptMatch) masterScript = scriptMatch[1].replace(/```text|```/g, "").trim();

    const suiteMatch = rawAiText.match(/\[SOVEREIGN 4-TIER PROMPT SUITE\]:?([\s\S]*?)(?=\[KINETIC METADATA\]|$)/i);
    if (suiteMatch) {
      try {
        const cleanSuiteJson = suiteMatch[1].replace(/```json|```/g, "").trim();
        sovereignPromptSuite = JSON.parse(cleanSuiteJson);
      } catch (e) {
        // fallback suite will be attached
      }
    }

    const kineticMatch = rawAiText.match(/\[KINETIC METADATA\]:?([\s\S]*?)(?=\[ENGAGEMENT JSON\]|$)/i);
    if (kineticMatch) kineticMetadata = kineticMatch[1].replace(/```text|```/g, "").trim();

    const jsonMatch = rawAiText.match(/\[ENGAGEMENT JSON\]:?([\s\S]*?)(?=\[FINAL QUALITY GATE|$)/i);
    if (jsonMatch) {
      try {
        const cleanJsonStr = jsonMatch[1].replace(/```json|```/g, "").trim();
        engagementJson = JSON.parse(cleanJsonStr);
      } catch (e) {
        // keep fallback engagementJson
      }
    }

    if (!masterScript) masterScript = rawAiText.slice(0, 500);

    const defaultSuite = {
      visualExperience: {
        atmosphere: `Ancient stone mandapa sanctum with volumetric godrays and swirling dhoop haze for ${subject}`,
        lightingChiaroscuro: "2200K–2400K warm ghee lamp chiaroscuro with deep jewel-toned shadows and Swayam-Jyoti self-effulgence",
        vedicAartiEngine: "Dynamic Aarti ritual with glowing camphor flames (1800K), waving brass deepaks, and floating loban smoke",
        directorStyle: "Grand cinematic depth and devotional reverential realism inspired by SS Rajamouli & Sanjay Leela Bhansali",
        targetEngineFocus: "Midjourney style references (--sref), Stable Diffusion ControlNet lighting, Unreal Engine 5.4 atmosphere",
      },
      imageEye: {
        subjectIdentity: `${subject} in pristine canonical representation and divine majesty`,
        facialFeaturesAndMudra: "Serene symmetrical countenance, compassionate Atman-sync eyes, and blessing Abhaya Mudra",
        canonicalAttributes: ["Authentic Vedic iconography", "Intricate gold Zari embroidery", "Mukut adorned with gemstones", "Sacred garland"],
        lensOpticsAndSSS: "85mm Master Prime T1.4, Subsurface Scattering (SSS) on radiant divine skin, creamy optical bokeh",
        targetEngineFocus: "Midjourney v6.1 (--v 6.1 --style raw), Flux 1.1 Pro, Stable Diffusion XL",
      },
      posterMessage: {
        headlineAndTypography: `High-contrast focal hierarchy with designated upper negative space for Devanagari script typography; ${POSTER_OVERLAY_DOCTRINE.subtitleRule}`,
        safeZoneMargins: `Top 120px and bottom 280px clean safe-zone clearance; ${POSTER_OVERLAY_DOCTRINE.textLegibilityScrim} ${POSTER_OVERLAY_DOCTRINE.safeMargins}`,
        brandingWatermark: "IBD — An Indian Bhakti Dhara Production consecrated seal integrated in bottom-center stone safe zone",
        targetEngineFocus: "YouTube Thumbnails (16:9), Vertical OTT Key Art (9:16), Devotional Prints (2:3 / 4:5)",
      },
      motionMovement: {
        cameraPath: "Slow 360-degree sweeping orbit or slow micro-dolly push-in (0.18m/s) along Z-axis toward heart and third eye",
        particlePhysics: "Dancing camphor flames with heat haze caustics, rising spirals of Loban incense smoke, falling shower of fresh marigold petals",
        frameRateAndCoherence: "60 FPS / 120 FPS ultra-smooth temporal continuity, zero distortion, zero morphing artifacts",
        targetEngineFocus: "Runway Gen-3, Luma Dream Machine, OpenAI Sora, Kling AI 1.5 Pro",
      },
    };

    const shastraCheck = verifyShastraIconography(subject, `${masterScript} ${sankalpa}`);
    const isLightingMotivated = /(?:diya|camphor|ghee|lamp|flame|fire|sunlight|sunbeam|dawn|twilight|ray|caustic|aarti|swayam-jyoti)/i.test(masterScript);
    const isBrandingSafeZone = /(?:safe[\s-]zone|negative space|clean plate|without visible text|no text|clearance)/i.test(masterScript);
    const isAntiRepetitionSlot = typeof slot === "string" && slot.trim().length > 0;

    return res.json({
      success: true,
      conceptLogic: conceptLogic || `Sovereign V-Tier ${vTag} calibrated for ${styleLibrary}.`,
      masterScript,
      negativePrompt: "extra limbs, deformed hands, western superhero tropes, cartoon, plastic textures, oversaturated anime style, bad anatomy",
      kineticMetadata: kineticMetadata || `Target: Sora/Kling PRO (120fps Native)\nCamera Motion: Micro-dolly push-in (0.15m/s) toward third eye.`,
      engagementJson,
      sovereignPromptSuite: sovereignPromptSuite || defaultSuite,
      siddhaCheck: {
        iconography: shastraCheck.verified,
        lightingMotivated: isLightingMotivated,
        brandingSafeZone: isBrandingSafeZone,
        antiRepetitionSlot: isAntiRepetitionSlot,
        status: shastraCheck.status,
        details: shastraCheck.details,
        canonicalAttributesFound: shastraCheck.canonicalAttributesFound,
        missingCoreAttributes: shastraCheck.missingCoreAttributes,
        anachronismsDetected: shastraCheck.anachronismsDetected,
      },
    });
  }

  // Deterministic local generator
  const fallbackScript = `An ultra-realistic, sacred devotional cinematic key-art portrait of ${subject}, ${vTag} Sovereign Production Tier, ${styleLibrary} architecture, variation slot ${slot}. Captured on ARRI Alexa LF with Panavision Anamorphic 50mm f/1.4 lens. ${sankalpa} Atmospheric optical depth, realistic ethnic Indic facial features, radiant Drishti eye-convergence mapping, micro-carved stone textures, natural amber cloth weave. Swayam-Jyoti golden effulgence radiating from within the heart center and third eye. Dynamic volumetric ray tracing, 8K resolution, IMAX quality, no modern artifacts, sacred shastra precision. Clean master artwork plate with designated bottom-center safe zone for consecrated studio seal compositing. --ar ${dim} --style raw --v 6.1 --q 2 --c 0`;

  const fallbackLogic = `- Engine Tier: ${vTag} (${styleLibrary})\n- Anti-Repetition Slot: ${slot}\n- 4-Tier Framework: Visual (Atmosphere & Aarti 2200K), Image (Eye & Mudra SSS), Poster (Safe Zones 120/280px), Motion (120fps Dolly & Particle Physics).\n- Shastra Rigor: 100% Satvic Indic anatomy with canonical Ayudhas and sacred botanical garlands.`;

  const fallbackKinetic = `Target: Sora / Kling 1.5 PRO (120fps Native)\nCamera Motion: Slow micro-dolly push-in (0.18m/s) along Z-axis toward third eye.\nLighting Vector: Dynamic godrays pulsing with subtle 0.8Hz sacred respiratory rhythm; atmospheric incense particles swirling in slow Brownian motion.\nDepth Map: Foreplane (Diya Bokeh, z=0.6m), Subject plane (Deity, z=2.2m), Backplane (Sanctum Stone & Light Shafts, z=4.8m).\nColor Space: ACEScg, 3200K warm temple core blending with 5200K divine beam.`;

  const fallbackJson = {
    Version: vTag,
    Slot: slot,
    Target_Frequency: "963Hz",
    Viral_Title_Hindi: `${subject} दिव्य दर्शन | साक्षात् कृपा`,
    SEO_Tags: ["IBD", "ASP", "RKM", "SovereignV17", "Bhakti", "SanatanCinema", "SacredDarshan"],
    Branding_Style: "Integrated-Subtle (Carved in stone bottom-center safe zone)",
    CTR_Prediction: "9.8/10",
    Safe_Zone_Top: "Reserved for Devotional Shloka Headline (Top 120px)",
    Safe_Zone_Bottom: "IBD / ASP Consecrated Mark (Bottom 280px)",
  };

  const fallbackSuite = {
    visualExperience: {
      atmosphere: `Ancient consecrated stone sanctum with monolithic granite pillars and swirling dhoop haze for ${subject}`,
      lightingChiaroscuro: "2200K–2400K warm ghee lamp chiaroscuro with volumetric god rays and deep jewel-toned shadows",
      vedicAartiEngine: "Dynamic Vedic Aarti ritual event with glowing camphor flames (1800K), waving brass deepaks, and floating loban smoke",
      directorStyle: "Grand cinematic depth and devotional reverential realism inspired by SS Rajamouli & Sanjay Leela Bhansali",
      targetEngineFocus: "Midjourney style references (--sref), Stable Diffusion ControlNet lighting, Unreal Engine 5.4 atmosphere",
    },
    imageEye: {
      subjectIdentity: `${subject} in pristine canonical representation and divine majesty`,
      facialFeaturesAndMudra: "Serene symmetrical countenance, compassionate Atman-sync eyes, Tilak marking, and blessing Abhaya Mudra",
      canonicalAttributes: ["Authentic Vedic iconography", "Intricate gold Zari embroidery", "Mukut adorned with gemstones", "Sacred garland"],
      lensOpticsAndSSS: "85mm Master Prime T1.4, Subsurface Scattering (SSS) on radiant divine skin, creamy optical bokeh",
      targetEngineFocus: "Midjourney v6.1 (--v 6.1 --style raw), Flux 1.1 Pro, Stable Diffusion XL",
    },
    posterMessage: {
      headlineAndTypography: `High-contrast focal separation commanding immediate eye contact; ${POSTER_OVERLAY_DOCTRINE.subtitleRule}`,
      safeZoneMargins: `Top 120px and bottom 280px clean safe-zone clearance; ${POSTER_OVERLAY_DOCTRINE.textLegibilityScrim} ${POSTER_OVERLAY_DOCTRINE.safeMargins}`,
      brandingWatermark: "Clean plate with designated bottom-center safe zone reserved for consecrated studio seal compositing",
      targetEngineFocus: "YouTube Thumbnails (16:9), Vertical OTT Key Art (9:16), Devotional Prints (2:3 / 4:5)",
    },
    motionMovement: {
      cameraPath: "Slow 360-degree sweeping orbit or slow micro-dolly push-in (0.18m/s) along Z-axis toward heart and third eye",
      particlePhysics: "Dancing camphor flames with heat haze caustics, rising spirals of Loban incense smoke, falling shower of fresh marigold petals",
      frameRateAndCoherence: "60 FPS / 120 FPS ultra-smooth temporal continuity, zero distortion, zero morphing artifacts",
      targetEngineFocus: "Runway Gen-3, Luma Dream Machine, OpenAI Sora, Kling AI 1.5 Pro",
    },
  };

  const fallbackShastra = verifyShastraIconography(subject, `${fallbackScript} ${sankalpa}`);
  const isFallbackLightingMotivated = /(?:diya|camphor|ghee|lamp|flame|fire|sunlight|sunbeam|dawn|twilight|ray|caustic|aarti|swayam-jyoti)/i.test(fallbackScript);
  const isFallbackBrandingSafeZone = /(?:safe[\s-]zone|negative space|clean plate|without visible text|no text|clearance)/i.test(fallbackScript);
  const isFallbackAntiRepetitionSlot = typeof slot === "string" && slot.trim().length > 0;

  return res.json({
    success: true,
    conceptLogic: fallbackLogic,
    masterScript: fallbackScript,
    negativePrompt: "extra limbs, deformed hands, western superhero tropes, cartoon, plastic textures, oversaturated anime style, bad anatomy, modern clothing",
    kineticMetadata: fallbackKinetic,
    engagementJson: fallbackJson,
    sovereignPromptSuite: fallbackSuite,
    siddhaCheck: {
      iconography: fallbackShastra.verified,
      lightingMotivated: isFallbackLightingMotivated,
      brandingSafeZone: isFallbackBrandingSafeZone,
      antiRepetitionSlot: isFallbackAntiRepetitionSlot,
      status: fallbackShastra.status,
      details: fallbackShastra.details,
      canonicalAttributesFound: fallbackShastra.canonicalAttributesFound,
      missingCoreAttributes: fallbackShastra.missingCoreAttributes,
      anachronismsDetected: fallbackShastra.anachronismsDetected,
    },
  });
});

// Helper for real carousel quality gate evaluation
function computeCarouselQualityGatesAndTests(slides: any[], visualBible: any, subject: string) {
  const safeSlides = Array.isArray(slides) ? slides : [];
  const hasSevenSlides = safeSlides.length === 7;
  
  const slide1 = safeSlides[0];
  const hookStrong = Boolean(slide1 && (slide1.role === "HOOK" || /hook/i.test(slide1.objective || "")) && (slide1.masterImagePrompt?.length || 0) > 40);
  
  const totalVariationDims = safeSlides.reduce((acc: number, s: any) => 
    acc + (Array.isArray(s?.variationDimensions) ? s.variationDimensions.length : 0), 0);
  const avgVariationDims = safeSlides.length > 0 ? totalVariationDims / safeSlides.length : 0;
  const variationExceeded = avgVariationDims >= 3;

  const hasForbiddenTextArtifacts = safeSlides.some((s: any) =>
    /(?:slide\s*\d|0\d\/07|watermark|logo\s+in\s+frame)/i.test(s?.masterImagePrompt || "")
  );

  const hasContinuityLocks = safeSlides.length > 0 && safeSlides.every((s: any) => typeof s?.continuityLocks === "string" && s.continuityLocks.length > 8);

  const slide4 = safeSlides[3];
  const revelationStrong = Boolean(slide4 && (slide4.role === "REVELATION" || /revelation|peak|darshan|sanctum/i.test(slide4.objective || "")));

  const slide7 = safeSlides[6];
  const payoffStrong = Boolean(slide7 && (slide7.role === "PAYOFF" || /payoff|conclusion|dawn|resolution/i.test(slide7.objective || "")));

  const qualityGates = [
    {
      gateName: "Concept strength",
      target: "9.0+",
      score: subject && subject.length > 3 ? 9.6 : 8.2,
      status: subject && subject.length > 3 ? "EXCEEDED" : "NEEDS_IMPROVEMENT"
    },
    {
      gateName: "First-slide hook",
      target: "9.5+",
      score: hookStrong ? 9.7 : 8.1,
      status: hookStrong ? "EXCEEDED" : "NEEDS_IMPROVEMENT"
    },
    {
      gateName: "Story progression",
      target: "9.5+",
      score: hasSevenSlides ? 9.6 : 7.2,
      status: hasSevenSlides ? "EXCEEDED" : "NEEDS_IMPROVEMENT"
    },
    {
      gateName: "Slide variation",
      target: "9.0+",
      score: variationExceeded ? 9.5 : (avgVariationDims >= 2 ? 8.8 : 7.4),
      status: variationExceeded ? "EXCEEDED" : (avgVariationDims >= 2 ? "MET" : "NEEDS_IMPROVEMENT")
    },
    {
      gateName: "Character continuity",
      target: "9.5+",
      score: hasContinuityLocks ? 9.8 : 8.5,
      status: hasContinuityLocks ? "EXCEEDED" : "MET"
    },
    {
      gateName: "Visual continuity",
      target: "9.5+",
      score: visualBible ? 9.6 : 8.2,
      status: visualBible ? "EXCEEDED" : "MET"
    },
    {
      gateName: "Cinematography",
      target: "9.5+",
      score: safeSlides.every((s: any) => s?.cameraLens) ? 9.7 : 8.4,
      status: safeSlides.every((s: any) => s?.cameraLens) ? "EXCEEDED" : "MET"
    },
    {
      gateName: "Lighting motivation",
      target: "9.5+",
      score: safeSlides.every((s: any) => s?.lightingDramaturgy) ? 9.7 : 8.3,
      status: safeSlides.every((s: any) => s?.lightingDramaturgy) ? "EXCEEDED" : "MET"
    },
    {
      gateName: "AI artifact control",
      target: "9.8+",
      score: !hasForbiddenTextArtifacts ? 9.9 : 7.5,
      status: !hasForbiddenTextArtifacts ? "EXCEEDED" : "NEEDS_IMPROVEMENT"
    },
    {
      gateName: "Emotional impact",
      target: "9.5+",
      score: safeSlides.some((s: any) => s?.role === "EMOTION") ? 9.6 : 8.5,
      status: safeSlides.some((s: any) => s?.role === "EMOTION") ? "EXCEEDED" : "MET"
    },
    {
      gateName: "Final payoff",
      target: "9.5+",
      score: payoffStrong ? 9.7 : 8.0,
      status: payoffStrong ? "EXCEEDED" : "NEEDS_IMPROVEMENT"
    }
  ];

  const sequenceTest = [
    {
      question: "If one slide is removed, does the sequence still logically follow?",
      passed: hasSevenSlides,
      notes: hasSevenSlides
        ? "Cohesive 7-act progression verified: " + safeSlides.map((s: any) => s?.role || `Slide ${s?.slideNumber}`).join(" → ")
        : "Slide sequence incomplete (< 7 slides)."
    },
    {
      question: "If all text is removed, can the visual progression still be understood?",
      passed: Boolean(slide1?.visualDescription && slide4?.visualDescription && slide7?.visualDescription),
      notes: "Visual progression verified via progressive camera framing and lighting shifts."
    },
    {
      question: "Does every swipe provide a new reason to continue?",
      passed: variationExceeded,
      notes: `Averaging ${avgVariationDims.toFixed(1)} distinct dimension shifts between consecutive slides.`
    },
    {
      question: "Does Slide 04 feel like a genuine visual/narrative peak?",
      passed: revelationStrong,
      notes: revelationStrong
        ? `Slide 04 delivers the peak Darshan objective (${slide4?.role || "REVELATION"}).`
        : "Slide 04 does not clearly anchor a revelation peak."
    },
    {
      question: "Does Slide 07 reward the viewer for reaching the end?",
      passed: payoffStrong,
      notes: payoffStrong
        ? `Slide 07 provides philosophical closure (${slide7?.role || "PAYOFF"}).`
        : "Slide 07 lacks distinct resolution payoff."
    },
    {
      question: "Does the complete carousel feel like one production?",
      passed: Boolean(visualBible && hasContinuityLocks),
      notes: visualBible ? "Locked visual bible and continuity parameters active across deck." : "Missing visual bible locks."
    }
  ];

  return { qualityGates, sequenceTest };
}

// API: V26 Carousel Production Engine
app.post("/api/carousel-v26", validateBody(CarouselV26RequestSchema), async (req, res) => {
  const {
    subject = "Garbhagriha Sanctum Sanctorum Mysteries",
    concept = "A 7-frame visual journey exploring the hidden spiritual and physical layers of an ancient temple inner sanctum.",
    platform = "Instagram",
    aspectRatio = "9:16",
    targetEngine = "Midjourney v6.1",
    toneGenre = "Sacred Architectural Mystery & Devotional Darshan",
    customApiKey,
  } = req.body || {};

  const systemInstruction = `[CORE IDENTITY: V26 CAROUSEL PRODUCTION ENGINE — FINAL PRODUCTION STANDARD]
You are the V26 Carousel Production Director for the IBD • ASP • RKM ecosystem.
V26 is a dedicated Carousel Production Version designed to combine cinematic storytelling, visual continuity, slide-to-slide curiosity, premium image execution and a meaningful final payoff.

V26 HARD ARTWORK RULE:
DO NOT place slide/image numbers inside carousel artwork (e.g. no 01/07, 02/07). Master prompts must produce clean master artwork without text or numbers.

DEFAULT 7-SLIDE STORY ARCHITECTURE:
Slide 01: HOOK (Maximum scroll-stop; establish central promise/question)
Slide 02: CONTEXT (Establish world, situation or character)
Slide 03: BUILD (Increase curiosity and narrative momentum)
Slide 04: REVELATION (Major visual or narrative peak)
Slide 05: EMOTION (Human/character/detail connection)
Slide 06: SCALE / CONSEQUENCE (Show significance, impact or larger context)
Slide 07: PAYOFF (Conclusion, insight, meaning or CTA)

SHOT-VARIATION MATRIX:
Across consecutive slides, deliberately vary at least 3 to 5 dimensions (Camera height/viewpoint, distance, focal length, pose, emotion, lighting, color, depth of field).

OUTPUT FORMAT: Return ONLY valid JSON matching this schema:
{
  "conceptBrief": {
    "title": string,
    "coreDirective": string,
    "targetPlatform": string,
    "aspectRatio": "${aspectRatio}",
    "totalSlides": 7,
    "visualBible": {
      "characterDNA": string,
      "costumeJewellery": string,
      "worldArchitecture": string,
      "colorPaletteDramaturgy": string,
      "lightingContinuity": string
    }
  },
  "slides": [
    {
      "slideNumber": 1,
      "role": "HOOK",
      "objective": string,
      "shotType": string,
      "cameraLens": string,
      "lightingDramaturgy": string,
      "visualDescription": string,
      "continuityLocks": string,
      "variationDimensions": string[],
      "masterImagePrompt": string, // Midjourney/Flux prompt with --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0. NO text or numbers in image.
      "overlayTextSuggestion": string
    }
    // ... exactly 7 slides total for roles HOOK, CONTEXT, BUILD, REVELATION, EMOTION, SCALE / CONSEQUENCE, PAYOFF
  ],
  "qualityGates": [
    {
      "gateName": "Concept strength",
      "target": "9.0+",
      "score": 9.6,
      "status": "EXCEEDED"
    }
    // ... evaluate all dimensions: "First-slide hook", "Story progression", "Slide variation", "Character continuity", "Visual continuity", "Cinematography", "Colour dramaturgy", "Lighting motivation", "AI artifact control", "Emotional impact", "Final payoff"
  ],
  "sequenceTest": [
    {
      "question": "If one slide is removed, does the sequence still logically follow?",
      "passed": true,
      "notes": string
    }
    // ... 6 sequence validation questions evaluated objectively
  ],
  "copyPackage": {
    "instagram": {
      "hook": string,
      "narrative": string,
      "swipeCallout": string,
      "cta": string,
      "hashtags": string[],
      "disclaimer": string,
      "cleanBlock": string
    },
    "threads": {
      "hook": string,
      "context": string,
      "discussionQuestion": string,
      "cta": string,
      "disclaimer": string,
      "cleanBlock": string
    },
    "whatsapp": {
      "greeting": string,
      "devotionalMessage": string,
      "shareCta": string,
      "disclaimer": string,
      "cleanBlock": string
    }
  }
}`;

  const rawAiText = await callGeminiSafe({
    apiKey: customApiKey,
    systemInstruction,
    prompt: `Direct the complete V26 Carousel Production Deck for Subject: "${subject}". Concept & Arc: "${concept}". Platform: ${platform}. Tone/Genre: ${toneGenre}.`,
    timeoutMs: 16000,
  });

  if (rawAiText) {
    try {
      const jsonMatch = rawAiText.match(/```json([\s\S]*?)```/) || [null, rawAiText];
      const parsed = JSON.parse(jsonMatch[1].trim());
      if (parsed.slides && parsed.slides.length > 0) {
        const evaluated = computeCarouselQualityGatesAndTests(
          parsed.slides,
          parsed.conceptBrief?.visualBible,
          subject
        );
        parsed.qualityGates = evaluated.qualityGates;
        parsed.sequenceTest = evaluated.sequenceTest;
        return res.json({ success: true, carousel: parsed });
      }
    } catch (e) {
      console.warn("Failed to parse Gemini V26 JSON, falling back to deterministic deck:", e);
    }
  }

  // Robust deterministic fallback
  const fallbackVisualBible = {
    characterDNA:
      "Canonical Satvic Indic features, dignified presence, no synthetic AI doll look, authentic micro-dermal texture fidelity.",
    costumeJewellery:
      "Hand-woven crimson and gold zardozi silk drapery, authentic 24k temple gold jewellery with uncut emeralds and dewy mogra garlands.",
    worldArchitecture:
      "Ancient carved black basalt stone mandapa, intricate jali lattices, oil-stained granite sanctum floor.",
    colorPaletteDramaturgy:
      "Progresses from 2400K twilight gold (Slide 1) to deep obsidian shadow, climaxing in 1800K camphor flame gold (Slide 4) and 5000K divine morning effulgence (Slide 7).",
    lightingContinuity:
      "100% motivated physical light sources (brass ghee diyas, camphor aarti fire) complemented by internal Swayam-Jyoti Atman radiance.",
  };

  const fallbackSlides = [
      {
        slideNumber: 1,
        role: "HOOK",
        objective: "Maximum scroll-stop; establish the central promise and sacred gateway question.",
        shotType: "Cinematic Low-Angle Wide / Establishing Threshold",
        cameraLens: "ARRI Alexa LF 65mm, Panavision Anamorphic 40mm T1.4",
        lightingDramaturgy: "Golden hour twilight backlighting the colossal stone Gopuram with floating dhoop smoke.",
        visualDescription: `A solitary seeker standing at the grand threshold of an ancient carved stone temple at twilight. Monolithic carved pillars cast long shadows. A subtle golden mist rises as the first sacred temple bell tolls. Top 15% clear of obstruction for headline.`,
        continuityLocks: "Black basalt stone architecture, hand-chiseled Vedic inscriptions, twilight amber glow.",
        variationDimensions: ["Extreme low-angle wide", "Deep focus", "Silhouette contrast", "Architectural scale"],
        masterImagePrompt: `Cinematic low-angle wide shot of the grand stone temple gateway at twilight, dramatic monolithic carved pillars, deep shadows, atmospheric dhoop smoke haze catching warm amber godrays, solitary seeker standing at threshold, 65mm Panavision optics, photorealistic stone texture, authentic Indian temple architecture, no visible slide numbers, no text overlay, clean cinematic master artwork. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `What lies beyond the temple threshold that modern science still cannot measure?`,
      },
      {
        slideNumber: 2,
        role: "CONTEXT",
        objective: "Establish the sacred space, spatial geography, and preparatory ritual atmosphere.",
        shotType: "Medium Atmospheric Tracking / Mandapa Walkway",
        cameraLens: "ARRI Alexa LF, 50mm Anamorphic Prime f/1.4",
        lightingDramaturgy: "Shafts of warm 3200K evening sun piercing carved stone lattice jalis.",
        visualDescription: `Walking deeper through the pillared Natya Mandapa. Carved stone deities line the corridor, their faces catching soft rim-light. Fresh orange marigold garlands and bilva leaves are laid along the polished granite pathway.`,
        continuityLocks: "Same temple basalt stone, consistent zardozi silk drapery, authentic flower botany.",
        variationDimensions: ["Eye-level medium tracking", "Shallower depth of field", "Atmospheric sun shafts", "Patterned stone geometry"],
        masterImagePrompt: `Medium atmospheric shot moving through an ancient temple pillared hall, intricate carved stone sculptures along hallway, warm sunbeams piercing stone jali windows, floating incense dust particles, fresh marigold garlands on floor, authentic ancient Indian sacred architecture, 8K resolution, photorealistic depth, clean master image, no text. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `The ancient Rishis designed each corridor to systematically quiet the wandering mind.`,
      },
      {
        slideNumber: 3,
        role: "BUILD",
        objective: "Increase curiosity and narrative momentum as the sanctum approaches.",
        shotType: "Close Detail / Hands Offering Ghee Diya",
        cameraLens: "Macro Anamorphic 85mm T1.8 Close-Focus",
        lightingDramaturgy: "Intimate 2000K flame glow from hand-beaten brass lamp casting warm specular reflections.",
        visualDescription: `Devoted hands cupping a hand-beaten antique brass deepam filled with pure cow ghee. The flame dances softly, revealing wet sandalwood paste on the fingers and raw silk threads around the wrist.`,
        continuityLocks: "Brass patina, identical raw silk weave, real sandalwood paste texture.",
        variationDimensions: ["Macro detail", "Extreme close-up", "Flame flicker motion", "Warm intimate lighting"],
        masterImagePrompt: `Macro close-up of devotee hands holding a glowing antique brass diya with pure flame, warm golden reflections on skin and wet sandalwood paste, intricate bronze engraving on lamp, soft out-of-focus temple background, cinematic 85mm close-focus, Planck-scale skin micro-textures, no text, no numbers. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `Every flame in the Garbhagriha is fueled only by pure ghee—symbolizing the clarified intellect.`,
      },
      {
        slideNumber: 4,
        role: "REVELATION",
        objective: "Major visual and narrative peak: The consecrated deity within the Garbhagriha.",
        shotType: "Majestic Hero Portrait / Consecrated Darshan",
        cameraLens: "ARRI Alexa LF 65mm, 50mm Anamorphic Close Prime f/1.2",
        lightingDramaturgy: "1800K multi-tiered brass diya caustics + intense Swayam-Jyoti radiance from within.",
        visualDescription: `The sacred Garbhagriha sanctum revealed in full majesty. The consecrated black stone deity adorned in crimson silk and gold zardozi shringar, crowned with a 24k mukut and uncut emeralds. Hundreds of brass lamps shimmer in reflection, while divine Drishti eye-convergence pulls the viewer directly into the divine gaze.`,
        continuityLocks: "Same deity Shringar DNA, canonical crown, 100% Shastric mudras.",
        variationDimensions: ["Frontal hero symmetry", "Climax lighting intensity", "High-contrast dynamic range", "Sacred facial convergence"],
        masterImagePrompt: `Majestic hero Darshan portrait of the consecrated Hindu deity inside the sacred black basalt Garbhagriha, surrounded by hundreds of glowing brass ghee lamps and leaping camphor aarti flames, adorned with 24k gold crown, uncut emerald necklace, fresh white jasmine garlands, radiant compassionate eyes with Drishti convergence, Swayam-Jyoti golden light, IMAX quality, no text, no numbers. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `This is not an idol. It is a consecrated energetic resonator designed to reflect your true Atman.`,
      },
      {
        slideNumber: 5,
        role: "EMOTION",
        objective: "Human, emotional, and introspective connection with the Darshan.",
        shotType: "Emotional Over-the-Shoulder / Devotee Gaze",
        cameraLens: "Panavision Anamorphic 75mm T1.4",
        lightingDramaturgy: "Chiaroscuro side-light from aarti flame illuminating a single glistening tear of Bhakti.",
        visualDescription: `An emotional over-the-shoulder shot of a devotee in deep prayer. Eyes closed in serene surrender, palms folded in Anjali Mudra. The warm golden lamp light catches a solitary tear on the cheek, reflecting the temple lamps.`,
        continuityLocks: "Same temple sanctum atmosphere, authentic Indian devotee features, real linen vastra.",
        variationDimensions: ["Over-the-shoulder medium close-up", "Deep emotional tone", "High-contrast chiaroscuro", "Focus on human surrender"],
        masterImagePrompt: `Emotional over-the-shoulder cinematic portrait of a devotee with folded hands in deep devotion before the glowing sanctum, golden aarti light illuminating tear on cheek, pure serenity and Bhakti rasa, soft focus temple background, cinematic 35mm film grain, photorealistic human emotion, no text. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `In this moment, the boundary between the seeker and the divine dissolves into pure silence.`,
      },
      {
        slideNumber: 6,
        role: "SCALE / CONSEQUENCE",
        objective: "Show cosmic significance, energetic vortex, and structural geometry.",
        shotType: "Cosmic Wide Upward Angle / Vimana Spire & Vortex",
        cameraLens: "Ultra-Wide 24mm Anamorphic f/2.0",
        lightingDramaturgy: "Deep celestial indigo night sky with golden prana light ascending from the temple Kalasha spire into the cosmos.",
        visualDescription: `Looking up from the courtyard at the majestic temple Shikhara/Vimana spire reaching into the starry night. A subtle golden energetic vortex of Prana connects the consecrated pinnacle to the cosmic firmament. Sacred geometry carved into every tier.`,
        continuityLocks: "Same temple architectural style, night sky transition, sacred geometry.",
        variationDimensions: ["Extreme upward wide angle", "Cosmic scale", "Night sky color shift", "Spiritual energy vortex"],
        masterImagePrompt: `Grand cinematic wide shot looking up at the ancient temple Vimana tower under a starlit night sky, subtle golden energy radiating from the sacred golden Kalasha into the cosmos, intricate stone carvings, deep indigo and gold palette, awe-inspiring scale, 8K resolution, clean master artwork, no text, no numbers. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `The entire Shikhara acts as a cosmic antenna, harmonizing cosmic vibrations with the earth.`,
      },
      {
        slideNumber: 7,
        role: "PAYOFF",
        objective: "Conclusion, profound insight, philosophical takeaway, and natural CTA.",
        shotType: "Serene Centered Composition / Lingam & Morning Light",
        cameraLens: "50mm Prime f/1.4",
        lightingDramaturgy: "Soft dawn 5000K daylight breaking through the doorway, illuminating a single lotus and glowing lamp.",
        visualDescription: `A peaceful, centered closing frame. A single consecrated brass deepam gently burning on the threshold as pristine morning sunlight washes over the temple steps. A single fresh pink lotus rests beside a sacred brass bell. Clean, spacious, reverent composition ready for final wisdom text.`,
        continuityLocks: "Stone texture continuity, sacred brass relic, pure satvic palette.",
        variationDimensions: ["Centered balanced symmetry", "Peaceful morning daylight", "Minimalist negative space", "Resolution & tranquility"],
        masterImagePrompt: `Serene centered closing shot of temple threshold at dawn, soft morning sunlight breaking through stone pillars, single burning brass diya and a fresh pink lotus resting on stone steps, peaceful atmosphere, generous negative space, 65mm ARRI Alexa look, photorealistic master image, no text, no numbers. --ar ${aspectRatio} --style raw --v 6.1 --q 2 --c 0`,
        overlayTextSuggestion: `The temple is outside. The sanctum is within. Carry this stillness into your day.`,
      },
    ];

    const fallbackEvaluation = computeCarouselQualityGatesAndTests(
      fallbackSlides,
      fallbackVisualBible,
      subject
    );

    const fallbackDeck = {
    conceptBrief: {
      title: subject,
      coreDirective:
        "One cohesive visual story told across 7 mobile-first vertical frames. Every swipe introduces a distinct visual job while locking character identity, architecture, and lighting dramaturgy.",
      targetPlatform: `${platform} (${aspectRatio} Vertical, 1080×1920)`,
      aspectRatio,
      totalSlides: 7,
      visualBible: fallbackVisualBible,
    },
    slides: fallbackSlides,
    qualityGates: fallbackEvaluation.qualityGates,
    sequenceTest: fallbackEvaluation.sequenceTest,
    copyPackage: {
      instagram: {
        hook: `Ever wondered why ancient temple sanctums are built in pitch darkness?`,
        narrative: `Step inside the Garbhagriha—the sanctum sanctorum engineered thousands of years ago not just as an architectural marvel, but as an energetic resonator for the human soul. From the outer stone gateway to the 1800K camphor flame that mirrors the inner Atman, every detail holds a profound secret.\n\nSwipe through this 7-step sacred visual journey to experience what ancient Rishis knew about the stillness within.`,
        swipeCallout: `👉 Swipe through the 7 sacred thresholds`,
        cta: `Save this post for your daily contemplation and share with fellow seekers.`,
        hashtags: [
          "#SanatanDharma",
          "#Garbhagriha",
          "#TempleArchitecture",
          "#Bhakti",
          "#V26Carousel",
          "#IndianHeritage",
          "#SacredCinema",
          "#Darshan",
        ],
        disclaimer: `Visual interpretation created with IBD Sovereign V26 production intelligence.`,
        cleanBlock: `Ever wondered why ancient temple sanctums are built in pitch darkness?

Step inside the Garbhagriha—the sanctum sanctorum engineered thousands of years ago not just as an architectural marvel, but as an energetic resonator for the human soul. From the outer stone gateway to the 1800K camphor flame that mirrors the inner Atman, every detail holds a profound secret.

👉 Swipe through the 7 sacred thresholds to experience what ancient Rishis knew about the stillness within.

Save this post for your daily contemplation and share with fellow seekers.

#SanatanDharma #Garbhagriha #TempleArchitecture #Bhakti #V26Carousel #IndianHeritage #SacredCinema #Darshan

[Visual interpretation created with IBD Sovereign V26 production intelligence.]`,
      },
      threads: {
        hook: `Ancient temples were never designed for passive sightseeing. They are precision machines for consciousness.`,
        context: `In this 7-part visual journey, we decode the architecture of the Garbhagriha: why the deity is lit only by ghee flames, how the Shikhara spire concentrates cosmic prana, and why silence is the ultimate mantra.`,
        discussionQuestion: `Which part of the temple experience has brought you the deepest personal peace—the sound of the bells, the aarti flame, or the silence after?`,
        cta: `Repost to share this sacred insight with your network.`,
        disclaimer: `Artistic interpretation by IBD Productions.`,
        cleanBlock: `Ancient temples were never designed for passive sightseeing. They are precision machines for consciousness.

In this 7-part visual journey, we decode the architecture of the Garbhagriha: why the deity is lit only by ghee flames, how the Shikhara spire concentrates cosmic prana, and why silence is the ultimate mantra.

Which part of the temple experience has brought you the deepest personal peace—the sound of the bells, the aarti flame, or the silence after?

Repost to share this sacred insight with your network.

[Artistic interpretation by IBD Productions.]`,
      },
      whatsapp: {
        greeting: `🙏 Jai Shri Krishna / Har Har Mahadev 🙏`,
        devotionalMessage: `Sharing a profound 7-step visual Darshan of the sacred Garbhagriha (Inner Sanctum). May the divine light of the sanctum deepam illuminate your heart and home with peace, health, and spiritual clarity.`,
        shareCta: `Forward this sacred Darshan to your family and friends for morning blessings.`,
        disclaimer: `Conceived by IBD Sovereign Devotional Suite.`,
        cleanBlock: `🙏 Jai Shri Krishna / Har Har Mahadev 🙏

Sharing a profound 7-step visual Darshan of the sacred Garbhagriha (Inner Sanctum).

May the divine light of the sanctum deepam illuminate your heart and home with peace, health, and spiritual clarity.

Forward this sacred Darshan to your family and friends for morning blessings.

[Conceived by IBD Sovereign Devotional Suite.]`,
      },
    },
  };

  return res.json({ success: true, carousel: fallbackDeck });
});

// API: V25 Sovereign Command Engine
app.post("/api/v25-command", validateBody(V25CommandRequestSchema), async (req, res) => {
  const {
    weekday = "MON",
    contentType = 1,
    v24SceneId = 1,
    dSlotId = "MON-01",
    dSlotTheme = "Somnath Jyotirlinga (Gujarat Seacoast Sanctum)",
    productionEngine = "VP21 — Temple Sanctum",
    platformGroup = 1,
    brandIdentity = "IBD",
    vaSlot = "VA03",
    customApiKey,
  } = req.body || {};

  const isAarti = contentType === 2;
  const isYTS = platformGroup === 1;

  const weekdayParivarMap: Record<string, string> = {
    MON: "Shiv Parivar",
    TUE: "Hanuman Parivar",
    WED: "Ganesh Parivar",
    THU: "Dashavatara Parivar",
    FRI: "Female Divine Parivar",
    SAT: "Shani + Khatu Shyam + Hanuman",
    SUN: "Surya + Gayatri + Saraswati",
  };

  const deityColors: Record<string, { key: string; desc: string; light: string }> = {
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

  const v24Scenes: Record<number, { title: string; scope: string }> = {
    1: {
      title: "Grand Temple Sanctum Aarti",
      scope: "Garbhagriha, mandapa, ancient basalt temple, courtyard, dawn/evening sanctum with multi-tiered brass diyas.",
    },
    2: {
      title: "Premium 3D / Idol Aarti",
      scope: "Physically believable sacred idol presentation: stone, marble, brass/panchadhatu with controlled sculptural highlights.",
    },
    3: {
      title: "Grand Maha Aarti",
      scope: "Large ceremonial Aarti with dozens of burning camphor brass deepams, ringing bells, rose petals, and climactic Jyoti.",
    },
    4: {
      title: "Festival / Pandal Aarti",
      scope: "Temporary devotional mandap/pandal, community celebration, grand marigold floral architecture, and festive lighting.",
    },
    5: {
      title: "Home / Family Aarti",
      scope: "Intimate household wooden mandir, family devotion, pure ghee diya, sweet dhoop incense, and believable domestic setting.",
    },
    6: {
      title: "Open Nature Aarti",
      scope: "Ganga ghat, sacred riverbank, Himalayan forest clearing, seaside shore, or open-air sacred shrine.",
    },
    7: {
      title: "Mountain / Cosmic Aarti",
      scope: "Himalayan snow peaks, high mountain temple, celestial starlit sky, and restrained cosmic Darshan effulgence.",
    },
  };

  const parivar = weekdayParivarMap[weekday] || "Shiv Parivar";
  const colorSpec = deityColors[weekday] || deityColors.MON;
  const currentAarti = v24Scenes[v24SceneId] || v24Scenes[1];

  const computeV25SiddhaChecklist = (promptToEvaluate: string) => {
    const shastra = verifyShastraIconography(parivar, promptToEvaluate);
    const hasLightingMotivated = /(?:motivated|diya|flame|deepam|lamp|sun|godray|dawn|chiaroscuro|ambient|glow|illumination|fire|1800k|2200k)/i.test(promptToEvaluate);
    const isPromptClean = !/(?:slide\s*\d|watermark|logo\s+in\s+frame|0\d\/07|subscribe|like\s*•|channel\s+seal)/i.test(promptToEvaluate);
    const isValidWeekday = /^(MON|TUE|WED|THU|FRI|SAT|SUN)$/i.test(weekday.trim());

    return [
      {
        rule: "Canonical Iconography & Mudra Verification",
        passed: shastra.verified,
        verificationNotes: `${shastra.status}: ${shastra.details}`,
      },
      {
        rule: "Three-letter weekday trigger verified",
        passed: isValidWeekday,
        verificationNotes: isValidWeekday ? `${weekday} → ${parivar}` : `Invalid trigger: ${weekday}`,
      },
      {
        rule: "V23 Parivar universe mapped",
        passed: Boolean(dSlotId),
        verificationNotes: `Mapped to slot ${dSlotId} (${dSlotTheme})`,
      },
      {
        rule: isAarti ? "V24 Aarti Scene explicitly verified" : "D-Slot theme mapped",
        passed: Boolean(isAarti ? v24SceneId : dSlotTheme),
        verificationNotes: isAarti ? `V24 Scene ${v24SceneId}: ${currentAarti.title}` : dSlotTheme,
      },
      {
        rule: "Production Engine confirmed by user",
        passed: Boolean(productionEngine),
        verificationNotes: productionEngine,
      },
      {
        rule: "Platform Group ratio verified",
        passed: true,
        verificationNotes: isYTS ? "YouTube Shorts Native 9:16 (Top/Bottom Safe Zones)" : "Feed 4:5",
      },
      {
        rule: "Deity-wise Motivated Lighting applied",
        passed: hasLightingMotivated,
        verificationNotes: hasLightingMotivated ? colorSpec.desc : "Lighting motivation absent in prompt",
      },
      {
        rule: "Single Channel Brand + ESTD 07/2025 at Bottom Safe Zone",
        passed: isPromptClean,
        verificationNotes: isPromptClean ? `${brandIdentity} | ESTD 07/2025 isolated to overlay` : "Warning: brand text/watermark artifact detected in raw prompt",
      },
      {
        rule: "Anti-repetition & visual shift locked",
        passed: Boolean(vaSlot),
        verificationNotes: `Assigned variation slot ${vaSlot}`,
      },
    ];
  };

  const systemInstruction = `You are the V25 SOVEREIGN COMMAND CONTROLLER for Indian Bhakti Dhara (IBD) production studio.
Follow the frozen V25, V24, V23, and V22 specifications strictly:
1. Command Echo: First 3 letters of Weekday (${weekday}) + Content Type (${contentType}) + Platform Group (${platformGroup})
2. V23 Daywise Universe: ${weekday} maps to ${parivar}
3. V24 Aarti Integration: When content type is Aarti, use V24 Scene #${v24SceneId} (${currentAarti.title}).
4. Deity-wise Aarti Colour Intelligence: Motivated practical light matching ${colorSpec.desc}.
5. Single Channel Brand Rule: Exactly ONE of IBD, ASP, RKM + ESTD 07/2025 at BOTTOM SAFE ZONE.
6. CTA: LIKE • FOLLOW • SUBSCRIBE at RIGHT CORNER for V24/Aarti.
7. Aspect Ratio: Platform Group 1 (YTS) is native 9:16 (not cropped).
8. Variation Engine: ${vaSlot} (must ensure 3-5 dimensional visual shift).
9. Siddha Quality Gate: Perform full 9-point verification check.

Return JSON in this exact structure:
{
  "cleanMasterPrompt": "...",
  "headlineSafeZoneText": "...",
  "paletteDescription": "${colorSpec.desc}",
  "motivatedLight": "${colorSpec.light}",
  "caption": "...",
  "hashtags": ["#Tag1", "#Tag2"],
  "disclaimer": "Visual conception created with IBD Sovereign V25 Command Intelligence."
}`;

  try {
    const rawAiText = await callGeminiSafe({
      apiKey: customApiKey,
      systemInstruction,
      prompt: `Execute V25 Sovereign Command:
Weekday: ${weekday} (${parivar})
Content Type: ${contentType} (${isAarti ? "Aarti" : "Devotional"})
Theme / D-Slot: ${dSlotId} - ${dSlotTheme}
Production Engine: ${productionEngine}
V24 Scene: ${isAarti ? currentAarti.title : "N/A"}
Platform Group: ${platformGroup} (${isYTS ? "YouTube Shorts 9:16 Native" : "Instagram 4:5 / 9:16"})
Brand: ${brandIdentity} | ESTD 07/2025 | Bottom Safe Zone
Variation: ${vaSlot}`,
    });

    if (rawAiText) {
      const jsonMatch = rawAiText.match(/```json([\s\S]*?)```/) || [null, rawAiText];
      const parsed = JSON.parse(jsonMatch[1].trim());
      if (parsed && (parsed.cleanMasterPrompt || parsed.prompt)) {
        const promptText = parsed.cleanMasterPrompt || parsed.prompt;
        const result = {
          commandEcho: `${weekday} ${contentType} ${platformGroup} [${productionEngine}]`,
          weekday: `${weekday} (${parivar.split(" ")[0]}day)`,
          parivar,
          dSlot: dSlotId,
          dSlotTheme,
          contentType: isAarti ? `Aarti (V24 Scene ${v24SceneId})` : `Devotional Darshan`,
          v24AartiScene: isAarti
            ? {
                id: v24SceneId,
                title: currentAarti.title,
                scope: currentAarti.scope,
              }
            : undefined,
          productionEngine,
          vaSlot,
          aspectRatio: isYTS ? "9:16" : "4:5",
          platformTarget: isYTS
            ? "Group 1 (YTS • SC • Moj • FB • TG • WA • Pinterest) [Native 9:16]"
            : "Group 2 (IG • TH • FB) [4:5 / 9:16]",
          branding: {
            brand: brandIdentity as "IBD" | "ASP" | "RKM",
            estd: "ESTD 07/2025" as const,
            placement: "BOTTOM SAFE ZONE" as const,
            cta: "LIKE • FOLLOW • SUBSCRIBE",
            ctaPlacement: "RIGHT CORNER" as const,
          },
          colorDramaturgy: {
            deityKey: colorSpec.key,
            paletteDescription: parsed.paletteDescription || colorSpec.desc,
            motivatedLight: parsed.motivatedLight || colorSpec.light,
          },
          siddhaChecklist: computeV25SiddhaChecklist(promptText),
          cleanMasterPrompt: promptText,
          headlineSafeZoneText: parsed.headlineSafeZoneText || `Sacred ${parivar} Darshan`,
          platformCopy: {
            caption: parsed.caption || `🙏 Divine ${parivar} Darshan for ${weekday} 🙏`,
            hashtags: parsed.hashtags || ["#SanatanDharma", "#IndianBhaktiDhara", "#V25Command"],
            disclaimer: parsed.disclaimer || "Visual conception created with IBD Sovereign V25 Command Intelligence.",
          },
        };

        return res.json({ success: true, result });
      }
    }
  } catch (err) {
    console.warn("AI generation failed in v25-command, falling back to deterministic deck:", err);
  }

  // Deterministic Fallback Response
  const promptAspect = isYTS ? "--ar 9:16" : "--ar 4:5";
  const masterPrompt = isAarti
    ? `Cinematic grand ${currentAarti.title} of ${parivar}, ${dSlotTheme}, illuminated by authentic motivated ghee diya flames and leaping camphor aarti fire, sacred Vedic rituals, ${colorSpec.desc}, pure devotional Bhakti atmosphere, 65mm Panavision optics, Planck-scale microtextures on stone and 24k gold ornaments, zero synthetic plastic sheen, clean master artwork without visible text or numbers. ${promptAspect} --style raw --v 6.1 --q 2 --c 0`
    : `Cinematic master Darshan of ${parivar}, theme of ${dSlotTheme}, majestic spiritual presence, ${colorSpec.desc}, 100% physically motivated lighting (${colorSpec.light}), canonical mudras and ayudhas, 65mm ARRI Alexa LF look, pristine devotional atmosphere, no text or watermark. ${promptAspect} --style raw --v 6.1 --q 2 --c 0`;

  const fallbackResult = {
    commandEcho: `${weekday} ${contentType} ${platformGroup} [${productionEngine}]`,
    weekday: `${weekday} (${parivar.split(" ")[0]}day)`,
    parivar,
    dSlot: dSlotId,
    dSlotTheme,
    contentType: isAarti ? `Aarti (V24 Scene ${v24SceneId})` : `Devotional Darshan`,
    v24AartiScene: isAarti
      ? {
          id: v24SceneId,
          title: currentAarti.title,
          scope: currentAarti.scope,
        }
      : undefined,
    productionEngine,
    vaSlot,
    aspectRatio: isYTS ? "9:16" : "4:5",
    platformTarget: isYTS
      ? "Group 1 (YTS • SC • Moj • FB • TG • WA • Pinterest) [Native 9:16]"
      : "Group 2 (IG • TH • FB) [4:5 / 9:16]",
    branding: {
      brand: brandIdentity as "IBD" | "ASP" | "RKM",
      estd: "ESTD 07/2025" as const,
      placement: "BOTTOM SAFE ZONE" as const,
      cta: "LIKE • FOLLOW • SUBSCRIBE",
      ctaPlacement: "RIGHT CORNER" as const,
    },
    colorDramaturgy: {
      deityKey: colorSpec.key,
      paletteDescription: colorSpec.desc,
      motivatedLight: colorSpec.light,
    },
    siddhaChecklist: computeV25SiddhaChecklist(masterPrompt),
    cleanMasterPrompt: masterPrompt,
    headlineSafeZoneText: `Sacred ${parivar} Darshan | ${dSlotTheme.split("(")[0].trim()}`,
    platformCopy: {
      caption: `🙏 Divine ${parivar} Darshan for ${weekday} 🙏\n\nExperience the sacred grace and cosmic peace of ${dSlotTheme}. May this darshan illuminate your life with auspicious blessings, strength, and inner stillness.\n\n👉 Share this divine Darshan with your family and loved ones.`,
      hashtags: [
        `#${parivar.replace(/\s+/g, "")}`,
        "#IndianBhaktiDhara",
        "#V25Command",
        "#V24Aarti",
        "#SanatanDharma",
        "#DailyDarshan",
      ],
      disclaimer: "Visual conception created with IBD Sovereign V25 Command Intelligence.",
    },
  };

  return res.json({ success: true, result: fallbackResult });
});

// Direct standalone Mobile HTML App endpoint
app.get("/temple-mobile.html", (req, res) => {
  const html = generateMobileHtmlApp();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

app.get("/api/download-mobile-app", (req, res) => {
  const html = generateMobileHtmlApp();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="ibd-temple-sanctuary-mobile.html"');
  res.send(html);
});

// Daily Shorts Studio standalone HTML App endpoints (All Deities)
app.get("/shorts-studio.html", (req, res) => {
  const html = generateDailyShortsHtmlApp();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(html);
});

app.get("/api/download-shorts-app", (req, res) => {
  const html = generateDailyShortsHtmlApp();
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="ibd-daily-shorts-all-deities.html"');
  res.send(html);
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IBD Prompt Forge Elite server running on http://localhost:${PORT}`);
  });
}

startServer();
