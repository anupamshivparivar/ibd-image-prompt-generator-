import { CINEMA_PLATFORM_PROFILES, SAMPLER_SPECS, POSTER_OVERLAY_DOCTRINE } from "../src/data/cinemaSamplerData";
import {
  resolveDeityAutoProfile,
  AUTO_SELECTION_DECISION_LOGIC,
} from "../src/data/deityAutoProfiles";

// Deterministic sacred prompt synthesizer for IBD Studio fallback
export function generateLocalIBDPrompt(params: {
  subject: string;
  story: string;
  dim: string;
  version: number;
  targetEngine: string;
  mood: string;
  lightingStyle: string;
  shastraDetails: string[];
  sampler?: string;
  cinemaStyle?: string;
}) {
  const {
    subject,
    story,
    dim,
    version,
    targetEngine,
    mood,
    lightingStyle,
    shastraDetails,
    sampler,
    cinemaStyle,
  } = params;

  const autoDecision = resolveDeityAutoProfile(subject, mood);

  const matchedCinema = cinemaStyle
    ? CINEMA_PLATFORM_PROFILES.find(
        (p) => p.id === cinemaStyle || p.name === cinemaStyle || p.shortName === cinemaStyle
      )
    : undefined;

  const matchedSampler = sampler
    ? SAMPLER_SPECS.find((s) => s.id === sampler || s.sampler === sampler)
    : undefined;

  const cinemaDirectives = matchedCinema
    ? ` Cinematography Look: ${matchedCinema.promptInject}.`
    : cinemaStyle
    ? ` Cinematography Look: ${cinemaStyle}.`
    : "";

  const samplerClause = matchedSampler
    ? ` [Sampler: ${matchedSampler.sampler} | Steps: ${matchedSampler.recommendedSteps} | CFG: ${matchedSampler.cfgScale} | Target: ${matchedSampler.useFor}]`
    : sampler
    ? ` [Sampler: ${sampler}]`
    : "";

  const vNum = Math.min(Math.max(Number(version) || 11, 1), 11);
  const versionMap: Record<number, string> = {
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
    11: "ANANTA-BIJA SINGULARITY (V-PARATPAR)",
  };
  const versionName = versionMap[vNum] || "ANANTA-BIJA SINGULARITY (V-PARATPAR)";

  const engineFlagsMap: Record<string, string> = {
    "Midjourney v6.1": `--ar ${dim} --style raw --v 6.1 --q 2 --s 750`,
    "Flux 1.1 Pro": `photorealistic 8k, aspect ratio ${dim}, ultra-crisp texture, sharp focus, hyper-detailed volumetric lighting, octane render`,
    "Ideogram 2.0": `cinematic typography key-art, aspect ratio ${dim}, 8k render, pure sacred geometry, shilpa shastra`,
    "Imagen 3": `photorealistic IMAX 70mm, 8k resolution, aspect ratio ${dim}, HDR, raytraced caustic light`,
    SDXL: `masterpiece, 8k resolution, best quality, ultra-detailed, photorealistic, intricate textures, aspect ratio ${dim}${
      matchedSampler ? `, sampler: ${matchedSampler.sampler}, steps: ${matchedSampler.recommendedSteps}, cfg: ${matchedSampler.cfgScale}` : ""
    }`,
  };

  const engineFlag = engineFlagsMap[targetEngine] || `--ar ${dim} --v 6.1`;

  const detailsText =
    Array.isArray(shastraDetails) && shastraDetails.length > 0
      ? shastraDetails.join(", ")
      : "Planck-length Detail, Sanskrit Yantra Geometry, Vibhuti & Rudraksha Textures, Sacred Gold & Stone Seal";

  let logic = "";
  let prompt = "";

  const cinemaLogicLine = matchedCinema
    ? `\n• CINEMA & PLATFORM GRADE (${matchedCinema.shortName}): ${matchedCinema.cameraAndOptics} — ${matchedCinema.lightingAndColor}.`
    : "";
  const samplerLogicLine = matchedSampler
    ? `\n• LINKED SAMPLER PROFILE (${matchedSampler.sampler}): Speed=${matchedSampler.speed}, Detail=${matchedSampler.detail}, Optimized for "${matchedSampler.useFor}" (${matchedSampler.recommendedSteps} steps, CFG ${matchedSampler.cfgScale}).`
    : "";

  if (vNum === 11) {
    logic = `• 01 | V-PARATPAR ANANTA-BIJA DOCTRINE: The Absolute Singularity of ${subject}. Merging non-dual aesthetics, compassionate Drishti gaze, and self-effulgent core light in the cosmic void.
• 02 | NON-DUAL REALISM: Transcends dimensional space—the sacred avatar balances the unmanifest infinite void with the radiant golden seed (Bija) of universal reality.
• 03 | COMPASSIONATE DRISHTI GAZE: Sacred divine eyes radiating direct spiritual awareness, connecting with the heart of the devotee.
• 04 | SWAYAM-JYOTI LIGHT PHYSICS: Light originates from within the transcendent spiritual core, illuminating sacred ornaments and sanctum stone.
• 05 | HIGH-FIDELITY SACRED CRAFT: Canonical Sri Yantra geometry, pure 24k gold caustics, and celestial violet-gold aura.${cinemaLogicLine}${samplerLogicLine}`;

    prompt = `SOURCE: An absolute transcendental sacred masterwork of ${subject}, ${story ? story.trim() : "in primordial contemplation"}. Manifesting at level V-PARATPAR (ANANTA-BIJA SINGULARITY). Deep cosmic void (#000000) contrasting with divine golden seed effulgence (#FFCC33) and amethyst crown aura (#2D005E). Compassionate Drishti gaze with eyes radiating serene spiritual awareness. Illumination powered by self-effulgent golden core and ${lightingStyle}. Surrounded by ${detailsText}, intricate sacred Yantra geometry.${cinemaDirectives} Cinematic 70mm anamorphic optics, 8K resolution, clean master artwork without text or watermarks. ${engineFlag}${targetEngine !== "SDXL" && samplerClause ? samplerClause : ""}`;
  } else if (vNum === 10) {
    logic = `• V10 Moksha-Siddhi Doctrine: Manifesting ${subject} across the Saguna → Nirguna continuum, where manifest physical form balances with formless Pure Consciousness.
• Sacred Light Harmony: Radiant celestial illumination paired with crown aura (amethyst-gold frequencies).
• Saptarishi 7-Point Celestial Rays: Seven-point divine illumination integrated into the temple sanctum atmosphere.
• Canonical Micro-Detail: Traditional surface fidelity across ornaments, silks, sacred Vibhuti, and Vedic iconography.
• Clean Production Plate: Engineered for deterministic studio compositing.${cinemaLogicLine}${samplerLogicLine}`;

    prompt = `A transcendent, supreme masterwork of ${subject}, ${story ? story.trim() : "in absolute samadhi"}. Visualized at level V10 (MOKSHA-SIDDHI) bridging Saguna manifest form and Nirguna formless absolute consciousness. Illumination powered by ${lightingStyle} and radiant crown aura. Surrounded by ${detailsText}, delicate sacred geometry, and subtle atmospheric incense. Sacred eyes radiating infinite Karuna and peace.${cinemaDirectives} 8K resolution, 70mm anamorphic optics, clean master artwork without text or watermarks. ${engineFlag}${targetEngine !== "SDXL" && samplerClause ? samplerClause : ""}`;
  } else if (vNum === 9) {
    logic = `• V9 Brahmanda-Srishti Physics: ${subject} visualized as the primeval source of cosmic order and sacred geometry.
• Multi-dimensional geometry: Galaxies, nebulae, and orbital planes emanating from the divine silhouette.
• Saptarishi Celestial Lighting: Seven harmonic rays converging on the Hiranyagarbha core.
• Color Harmonic Science: Kashmir kesar (#FF9933), cosmic lapis (#0D1B2A), molten gold (#D4AF37), and sacred vibhuti ash (#E5E0D5).
• Clean Plate Guarantee: Clean master artwork without visible watermarks, reserved for compositing seal.${cinemaLogicLine}${samplerLogicLine}`;

    prompt = `A monumental cosmic masterwork of ${subject}, ${story ? story.trim() : "manifesting divine cosmic order"}. Level V9 (Brahmanda-Srishti). Emitting ${lightingStyle}, with ${detailsText}. Hand-chiseled temple stonework textures, flowing banarasi silks with pure zari work, canonical Shilpa Shastra mudras,${cinemaDirectives} cinematic large format depth of field, clean artwork without text or watermark. ${engineFlag}${targetEngine !== "SDXL" && samplerClause ? samplerClause : ""}`;
  } else {
    logic = `• Optical & Composition Strategy: Framed with sacred golden ratio symmetry specifically tuned for ${targetEngine}, utilizing 70mm anamorphic depth of field with 50mm f/1.2 prime lens clarity.
• Sacred Lighting Formula: Incorporating ${lightingStyle} with secondary ambient Garbhagriha diya reflections, creating high-contrast chiaroscuro highlights across sacred ornaments and facial contours.
• Iconographical Authenticity: Rigorously aligned with Shilpa Shastra & Vedic Agamas for ${subject}, emphasizing canonical mudras, ayudhas, and divine proportions (Talamana).
• Color Harmonic Matrix: Anchored in molten gold (#D4AF37), Kashmir Kesar saffron (#FF9933), cosmic lapis lazuli (#0D1B2A), and sacred vibhuti ash (#E5E0D5).
• Transcendental Evolution (V${vNum} ${versionName}): Infused with traditional temple filigree, atmospheric dhoop smoke, and clean master framing.${cinemaLogicLine}${samplerLogicLine}`;

    prompt = `A transcendent, cinematic masterpiece representing ${subject}, ${story ? story.trim() : "in supreme celestial effulgence"}. Manifesting at level V${vNum} (${versionName}). Sacred aura with ${lightingStyle}, surrounded by ${detailsText}. Elaborate ancient Vedic temple architecture, intricate Hoysala and Chola sculptural filigree, pure molten 24k gold and ruby-encrusted ornaments, glowing Sanskrit yantra geometry rotating in celestial space-time. Ultra-tactile fabric drapery in vibrant banarasi silk, soft volumetric dhoop incense smoke ribbons illuminated by divine ray caustics, divine eyes radiating deep karuna and cosmic consciousness.${cinemaDirectives} Ultra-high fidelity, 8K resolution, cinematic lighting. Clean master artwork plate without visible text or watermarks. ${engineFlag}${targetEngine !== "SDXL" && samplerClause ? samplerClause : ""}`;
  }

  // Detect Deity / Couple Archetype for enhanced visual physics
  const isCouple =
    /radha.*krishna|krishna.*radha|shiva.*parvati|parvati.*shiva|sita.*ram|ram.*sita|lakshmi.*narayan|narayan.*lakshmi|ardhanarishvara|yugal|couple/i.test(
      `${subject} ${story}`
    );

  const baseNegative = `extra limbs, deformed hands, missing fingers, malformed eyes, western superhero tropes, cartoon style, anime illustration, 3d render plastic look, oversaturated flat colors, distorted anatomy, modern western clothing, futuristic neon cyberpunk clutter, blurry background, watermark text, low quality, pixelated artifacts, disfigured facial features, bad proportions`;

  const negative = isCouple
    ? `${baseNegative}, intimate embrace, sensual romantic hugging, kissing, inappropriate touching, erotic pose, messy entanglement, distorted facial expressions, awkward physical clenching`
    : baseNegative;

  let customizedPalette = [
    { name: "Ananta-Bija Gold", hex: "#FFCC33" },
    { name: "Sahasrara Divine Purple", hex: "#2D005E" },
    { name: "Primordial Void Black", hex: "#000000" },
    { name: "Swayam-Jyoti Gold", hex: "#D4AF37" },
    { name: "Kashmir Kesar Saffron", hex: "#FF9933" },
    { name: "Sacred Vibhuti Ash", hex: "#E5E0D5" },
  ];

  let sankalpaMantra =
    "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते | पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते";

  if (/shiv.*parivar|shiva.*parivar|kailash.*parivar/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Kailash Glacier Ice Blue", hex: "#A8DADC" },
      { name: "Gauri Sindoor Vermilion", hex: "#D90429" },
      { name: "Ganesha Sindoori Orange", hex: "#E85D04" },
      { name: "Kartikeya Vel Gold", hex: "#FFB703" },
      { name: "Nandi Sacred White", hex: "#F1FAEE" },
      { name: "Mayura Peacock Emerald", hex: "#0EAD69" },
    ];
    sankalpaMantra = "ॐ साम्बसदाशिवाय सपरिवाराय नमः | सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके";
  } else if (/radha.*krishna|krishna.*radha|yugal sarkar/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Shyamal Monsoon Blue", hex: "#1C3144" },
      { name: "Champaka Molten Gold", hex: "#FFD166" },
      { name: "Pitambara Yellow", hex: "#F4D06F" },
      { name: "Mayur Peacock Emerald", hex: "#0EAD69" },
      { name: "Yamuna Twilight Blue", hex: "#073B4C" },
      { name: "Gulabi Lotus Pink", hex: "#FF85A1" },
    ];
    sankalpaMantra = "ॐ श्रीराधाकृष्णाभ्यां नमः | तप्तकाञ्चनगौराङ्गी राधे वृन्दावनेश्वरी";
  } else if (/dwarka|dwarkadhish|gitopadesha|kurukshetra|gokul|kaliya|govardhan|mathura|janmabhoomi/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Shyamal Monsoon Blue", hex: "#1C3144" },
      { name: "Sudarshana Solar Gold", hex: "#FFB703" },
      { name: "Pitambara Yellow Silk", hex: "#F4D06F" },
      { name: "Panchajanya Pearl White", hex: "#EDF2F4" },
      { name: "Dwarka Ocean Azure", hex: "#023E8A" },
      { name: "Yamuna Midnight Lapis", hex: "#073B4C" },
    ];
    sankalpaMantra = "ॐ क्लीं कृष्णाय गोविन्दाय गोपीजनवल्लभाय स्वाहा | यदा यदा हि धर्मस्य ग्लानिर्भवति भारत";
  } else if (/chitrakoot|panchavati|rameshwaram|pushpak|vimana|janakpur|dhanush.*bhang|ayodhya/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Neelambuja Sky Blue", hex: "#2A6F97" },
      { name: "Janaki Swarna Gold", hex: "#FFB703" },
      { name: "Dandakaranya Saffron Kesar", hex: "#FB8500" },
      { name: "Mandakini Emerald Green", hex: "#2A9D8F" },
      { name: "Rameshwaram Ocean Blue", hex: "#0077B6" },
      { name: "Parijata Flower White", hex: "#FEFAE0" },
    ];
    sankalpaMantra = "ॐ श्रीसीतारामाभ्यां नमः | रामाय रामभद्राय रामचन्द्राय वेधसे";
  } else if (/shiva.*parvati|parvati.*shiva|gauri.*shankar|jhool|jhula/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Kailash Frost Blue", hex: "#A8DADC" },
      { name: "Sindoor Vermilion", hex: "#D90429" },
      { name: "Sacred Vibhuti Ash", hex: "#F1FAEE" },
      { name: "Temple Bronze Gold", hex: "#D4AF37" },
      { name: "Himalayan Twilight Deep Navy", hex: "#1D3557" },
      { name: "Rudraksha Ochre", hex: "#8D5B4C" },
    ];
    sankalpaMantra = "ॐ उमामहेश्वराभ्यां नमः | कर्पूरगौरं करुणावतारं संसारसारम्";
  } else if (/ardhanarishvara/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Shiva Cosmic Ash Blue", hex: "#457B9D" },
      { name: "Shakti Vermilion Red", hex: "#E63946" },
      { name: "Non-Dual Gold", hex: "#E9C46A" },
      { name: "Primordial Void", hex: "#1D3557" },
      { name: "Pure Camphor White", hex: "#F8F9FA" },
    ];
    sankalpaMantra = "ॐ अर्धनारीश्वराय नमः | चाम्पेयगौरार्धशरीरकायै कर्पूरगौरार्धशरीरकाय";
  } else if (/sita.*ram|ram.*sita/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Neelambuja Sky Blue", hex: "#2A6F97" },
      { name: "Janaki Swarna Gold", hex: "#FFB703" },
      { name: "Ayodhya Saffron Kesar", hex: "#FB8500" },
      { name: "Royal Sandstone Ochre", hex: "#D4A373" },
      { name: "Parijata Flower White", hex: "#FEFAE0" },
    ];
    sankalpaMantra = "ॐ श्रीसीतारामाभ्यां नमः | रामाय रामभद्राय रामचन्द्राय वेधसे";
  } else if (/lakshmi.*narayan|narayan.*lakshmi|vaikuntha/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Vaikuntha Celestial Lapis", hex: "#023E8A" },
      { name: "Mahalakshmi Pure Gold", hex: "#FFD700" },
      { name: "Padma Lotus Crimson", hex: "#D81159" },
      { name: "Ksheerasagara Milk White", hex: "#EDF2F4" },
      { name: "Kaustubha Gem Violet", hex: "#7209B7" },
    ];
    sankalpaMantra = "ॐ नमो भगवते वासुदेवाय | ॐ श्रीं ह्रीं क्लीं श्री सिद्ध लक्ष्म्यै नमः";
  } else if (/saraswati/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Sphatika Crystal White", hex: "#FFFFFF" },
      { name: "Vasant Basanti Yellow", hex: "#FFE66D" },
      { name: "Veena Rosewood Amber", hex: "#9C6644" },
      { name: "Hamsa Pearl Silver", hex: "#E0E1DD" },
      { name: "Akasha Ether Blue", hex: "#A9D6E5" },
    ];
    sankalpaMantra = "ॐ ऐं सरस्वत्यै नमः | या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता";
  } else if (/ganesha|ganpati/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Sindoor Orange Vermilion", hex: "#E85D04" },
      { name: "Modaka Honey Gold", hex: "#FAA307" },
      { name: "Durva Grass Green", hex: "#38B000" },
      { name: "Ashta-Vinayaka Red", hex: "#9D0208" },
      { name: "Ivory Tusk Cream", hex: "#FFF3B0" },
    ];
    sankalpaMantra = "ॐ गं गणपतये नमः | वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ";
  } else if (/durga|kali/i.test(`${subject} ${story}`)) {
    customizedPalette = [
      { name: "Rudra Crimson Red", hex: "#B7094C" },
      { name: "Obsidian Void Blue-Black", hex: "#001219" },
      { name: "Adyashakti Blazing Gold", hex: "#EE9B00" },
      { name: "Sudarshana Solar Ember", hex: "#CA6702" },
      { name: "Mahavidya Midnight Indigo", hex: "#0A1128" },
    ];
    sankalpaMantra = "ॐ सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके | शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते";
  }

  const metadata = {
    production: "IBD — An Indian Bhakti Dhara Production",
    evolutionLevel: `V${vNum} - ${versionName}`,
    subject: subject,
    targetEngine: targetEngine,
    aspectRatio: dim,
    ...(matchedCinema ? { cinemaStyle: matchedCinema.name } : cinemaStyle ? { cinemaStyle } : {}),
    ...(matchedSampler
      ? {
          samplerProfile: {
            sampler: matchedSampler.sampler,
            speed: matchedSampler.speed,
            detail: matchedSampler.detail,
            useFor: matchedSampler.useFor,
            steps: matchedSampler.recommendedSteps,
            cfgScale: matchedSampler.cfgScale,
          },
        }
      : sampler
      ? { samplerProfile: { sampler } }
      : {}),
    colorPalette: matchedCinema ? [...matchedCinema.palette, ...customizedPalette.slice(0, 2)] : customizedPalette,
    cinematography: {
      camera: matchedCinema ? matchedCinema.cameraAndOptics.split("•")[0].trim() : "Arri Alexa 65 IMAX Large Format 70mm",
      lens: matchedCinema ? (matchedCinema.cameraAndOptics.split("•")[1]?.trim() || "Panavision Primo Anamorphic 50mm T1.9") : "Panavision Primo Anamorphic 50mm T1.9",
      lighting: matchedCinema ? `${lightingStyle} + ${matchedCinema.lightingAndColor}` : lightingStyle,
      directorLook: matchedCinema ? matchedCinema.name : "IBD Sovereign Canonical",
      sampler: matchedSampler ? matchedSampler.sampler : sampler || "DPM++ 2M Karras (Default)",
      shutterAngle: "180 deg",
      renderPolish:
        vNum >= 10
          ? "128-bit Path-Traced Photoreal 8K + Non-Dual Singularity Entanglement"
          : "Octane Photoreal 8K + Raytraced Saptarishi Caustics",
    },
    sacredAttributes: [
      isCouple ? "Yugal Swaroop Dual-Harmonic Gaze & Interlocking Prabhamandala" : "Non-Dual Realism",
      "Atman-Sync Gaze",
      "Swayam-Jyoti Singularity Core",
      "Ancient Sanskrit Yantra Geometry",
      ...(Array.isArray(shastraDetails) ? shastraDetails : []),
    ],
    sanskritSankalpaMantra: sankalpaMantra,
    posterOverlayRules: POSTER_OVERLAY_DOCTRINE,
    autoSelectionDecisionLogic: AUTO_SELECTION_DECISION_LOGIC.rule,
    autoSelectionApplied: {
      ottLevel: `L${autoDecision.ottLevel}`,
      cameraAngle: autoDecision.cameraAngle,
      colorPalette: autoDecision.colorPalette,
      sampler: matchedSampler ? matchedSampler.sampler : sampler || autoDecision.sampler,
      networkLook: matchedCinema ? matchedCinema.shortName : autoDecision.cinemaStyle,
    },
    engineFlags: engineFlag,
  };

  return {
    logic,
    prompt,
    negative,
    metadata,
  };
}

// V11 — Universal Studio (Sarva-Srishti Engine) Local Synthesizer
export function generateLocalUniversalPrompt(params: {
  category: string;
  subject: string;
  story: string;
  dim: string;
  version: number;
}) {
  const { category, subject, story, dim, version } = params;
  const vNum = Math.min(Math.max(Number(version) || 11, 1), 11);

  let physicsDetail = "";
  let colorTheme: { name: string; hex: string }[] = [];

  if (category.includes("Health")) {
    physicsDetail =
      "Macro organic botanical physics, fresh morning dewdrops on medicinal herbs, authentic Ayurveda copper vessels, warm terracotta earth tones, diffuse natural sunlight, tactile raw texture.";
    colorTheme = [
      { name: "Tulsi Green", hex: "#2E7D32" },
      { name: "Haldi Golden Amber", hex: "#FFB300" },
      { name: "Ayurvedic Copper", hex: "#D87A56" },
      { name: "Terracotta Earth", hex: "#8D6E63" },
      { name: "Herbal Mint", hex: "#A5D6A7" },
    ];
  } else if (category.includes("Nostalgia") || /papa|radio|cassette|smaran/i.test(`${category} ${subject}`)) {
    physicsDetail =
      "Kodachrome 35mm film grain, 1980s-1990s vintage Indian heritage atmosphere, golden hour sun flare, soft vignette, classic Murphy/Philips transistor radio and cassette tape textures, nostalgic sepia and warm ochre undertones, tactile emotional memory resonance of classic Bharat.";
    colorTheme = [
      { name: "Vintage Ochre Gold", hex: "#C59B27" },
      { name: "Heritage Cassette Teak", hex: "#795548" },
      { name: "80s Radio Amber", hex: "#FFB300" },
      { name: "Monsoon Verandah Gray", hex: "#A1887F" },
      { name: "Old Postcard Cream", hex: "#EFEBE9" },
    ];
  } else if (category.includes("Emotions")) {
    physicsDetail =
      "Cinematic intimate portraiture, expressive emotional depth, high-contrast chiaroscuro, natural golden rim lighting, soft shallow depth of field, authentic emotional resonance of human experience.";
    colorTheme = [
      { name: "Deep Saffron", hex: "#E65100" },
      { name: "Warm Amber", hex: "#FFA000" },
      { name: "Intimate Shadow", hex: "#212121" },
      { name: "Golden Glow", hex: "#FFD54F" },
      { name: "Human Warmth", hex: "#D7CCC8" },
    ];
  } else {
    // Devotional
    physicsDetail =
      "Sacred Swayam-Jyoti self-effulgent divine tejas, microscopic Planck-length filigree, floating consecrated embers, ethereal dhoop ribbons, divine aura caustics.";
    colorTheme = [
      { name: "Ananta-Bija Gold", hex: "#FFCC33" },
      { name: "Sahasrara Divine Purple", hex: "#2D005E" },
      { name: "Kashmir Kesar", hex: "#FF9933" },
      { name: "Sacred Vibhuti", hex: "#E5E0D5" },
      { name: "Temple Diya Amber", hex: "#FFA726" },
    ];
  }

  const prompt = `A masterwork production asset representing ${subject || "Sacred Topic"}. Category: ${category}. Narrative: ${story || "Harmonious balance and timeless Indian wisdom"}. Executed with V${vNum} Sarva-Srishti composition: ${physicsDetail} Cinematic large format framing, 8K ultra-crisp tactile texture, balanced negative space reserved for typography compositing. Clean master artwork plate without visible text or watermarks. --ar ${dim} --v 6.1 --style raw --q 2`;

  const logic = `• V11 Sarva-Srishti Category Matrix: Tailored visual composition specifically calibrated for "${category}".
• Acoustic & Visual Texture: Engineered with ${physicsDetail.split(",")[0]}.
• Safe-Zone Composition: Balanced negative space reserved for deterministic studio card compositing.
• Multi-Topic Composition: Optimized for ${dim} aspect ratio with balanced focal points.`;

  const negative = `westernized tropes, cartoonish look, low resolution, bad lighting, watermark text overlays, text in frame, brand logo, signature, oversaturated neon, distorted hands, blurry textures, pixelated compression artifacts`;

  const metadata = {
    production: "IBD — An Indian Bhakti Dhara Production",
    evolutionLevel: `V${vNum} - Universal Sarva-Srishti`,
    subject,
    aspectRatio: dim,
    category,
    colorPalette: colorTheme,
    cinematography: {
      camera: "ARRI Alexa Mini LF",
      lens: "Zeiss Supreme Prime 35mm T1.5",
      lighting: category.includes("Health") ? "Diffuse Natural Daylight" : "Cinematic Warm Golden Hour",
      renderPolish: "8K Photoreal + Masterpiece Post-Production Grading",
    },
    engineFlags: `--ar ${dim} --v 6.1 --style raw`,
  };

  return { logic, prompt, negative, metadata };
}

// V12 — Vishwa-Varta (Universal Viral Engine) Local Synthesizer
export function generateLocalVishwaVartaPrompt(params: {
  category: string;
  story: string;
  dim: string;
  version: number;
}) {
  const { category, story, dim, version } = params;
  const vNum = Math.min(Math.max(Number(version) || 12, 1), 12);

  let visualDirective = "";
  let headlines: string[] = [];
  let hashtags: string[] = [];

  if (category.includes("Breaking")) {
    visualDirective =
      "High-impact newsroom studio lighting, cinematic hyper-realistic urgency, dramatic edge rim lighting, deep obsidian contrast, volumetric focal beam.";
    headlines = [
      "🔥 बड़ी खबर: जानिए क्या है पूरा सच और इसका प्रभाव!",
      "⚡ सबसे बड़ा खुलासा: इतिहास के पन्नों से निकलकर आया सच!",
      "🚨 ब्रेकिंग अपडेट: आज की सबसे महत्वपूर्ण और चौंकाने वाली जानकारी!",
    ];
    hashtags = ["#BreakingNewsHindi", "#IBDVishwaVarta", "#TrendingNews", "#BharatUpdate", "#ViralFacts"];
  } else if (category.includes("Kya Aap Jante")) {
    visualDirective =
      "Macro-photography discovery aesthetic, National Geographic / Discovery style, shallow depth of field, golden bokeh particles, intriguing microscopic clarity.";
    headlines = [
      "🤔 क्या आप जानते हैं? इसके पीछे का यह रहस्यमयी वैज्ञानिक रहस्य!",
      "✨ 99% लोग नहीं जानते: हमारे प्राचीन भारत की यह अद्भुत खोज!",
      "🌿 हैरान कर देगा यह रहस्य: जानिए हमारे वेदों और विज्ञान का अनोखा मेल!",
    ];
    hashtags = ["#KyaAapJanteHain", "#AmazingFactsHindi", "#SanatanScience", "#IBDFacts", "#IndianHeritage"];
  } else if (category.includes("Aaj Ka Sawal")) {
    visualDirective =
      "Symmetrical studio composition with 40% clean empty negative space on upper half reserved for high-legibility bold typography and quiz question overlays.";
    headlines = [
      "🧠 आज का सवाल: क्या आप दे पाएंगे इस कठिन प्रश्न का सही उत्तर?",
      "🎯 धर्म और ज्ञान क्विज: 10 में से 9 लोग हो जाते हैं इसमें फेल!",
      "✨ आपकी परीक्षा: कमेंट में बताइए इसका सही जवाब!",
    ];
    hashtags = ["#AajKaSawal", "#DharmaQuiz", "#SanatanGyan", "#IBDQuiz", "#IndianWisdom"];
  } else if (category.includes("Suvichar")) {
    visualDirective =
      "Serene golden hour dawn lighting, uplifting spiritual atmosphere, peaceful Himalayas/Ghats background, soft atmospheric haze, warm inspirational amber.";
    headlines = [
      "🌸 आज का सुविचार: यह एक विचार बदल सकता है आपकी पूरी ज़िंदगी!",
      "☀️ अनमोल वचन: जब जीवन में निराशा हो, तो याद रखें यह अमर सत्य!",
      "🪔 प्रातः कालीन प्रेरणा: अपने दिन की शुरुआत करें इस पावन सीख के साथ!",
    ];
    hashtags = ["#AajKaSuvichar", "#DailyWisdom", "#InspirationalQuotesHindi", "#IBDSuvichar", "#SpiritualQuotes"];
  } else {
    // Devotional / Festival
    visualDirective =
      "Festive celestial effulgence, radiant traditional diyas, marigold flower garlands, sacred temple architecture, divine glowing tejas, celebratory sacred ambiance.";
    headlines = [
      "🪔 पावन दर्शन व विशेष उत्सव: आज के इस शुभ दिन पर पाएं प्रभु का आशीर्वाद!",
      "🙏 महा-दर्शन: जीवन के सभी कष्टों को दूर करने वाला दिव्य स्वरूप!",
      "✨ पावन पर्व की मंगलकामनाएं: जानिए इस पर्व का आध्यात्मिक महत्व!",
    ];
    hashtags = ["#DarshanDaily", "#BhaktiDhara", "#SanatanDharma", "#IBDProduction", "#FestiveBlessings"];
  }

  const prompt = `A viral, high-engagement visual production asset. Format: ${category}. Core Information: ${story || "Trending Indian insight and compelling discovery"}. Visual Architecture: ${visualDirective} Professional broadcast fidelity, hyper-detailed textures, 8K clarity, master lighting. Clean plate with dedicated safe space for overlay graphics. --ar ${dim} --v 6.1 --style raw`;

  const logic = `• V12 Vishwa-Varta Viral Logic: Calibrated for maximum thumbnail click-through-rate (CTR) and visual retention on ${dim}.
• Style Execution: ${visualDirective}
• Overlay Architecture: Engineered for clean platform graphics and text compositing without in-frame watermark clutter.
• Hook Architecture: Generates 3 viral high-converting Hindi headlines, curated hashtags, and YouTube/Instagram SEO tags.`;

  const negative = `blurry low-res, chaotic messy composition, ugly faces, bad typography bleeding into image, text overlays, watermark, logo, signature, distorted objects, low contrast, washed out colors`;

  const metadata = {
    production: "IBD — An Indian Bhakti Dhara Production",
    evolutionLevel: `V${vNum} - Vishwa-Varta Viral Engine`,
    category,
    aspectRatio: dim,
    viralHeadlines: headlines,
    hashtags,
    seoTags: ["IBD Production", "Indian Bhakti Dhara", category.replace(/[^a-zA-Z0-9]/g, ""), "ViralHindiContent", "TrendingBharat"],
    cinematography: {
      camera: "RED V-Raptor 8K VV",
      lens: "Cooke Anamorphic /i Full Frame Plus",
      lighting: visualDirective.split(",")[0] || "Studio Lighting",
      renderPolish: "8K Broadcast HDR Color Master",
    },
    engineFlags: `--ar ${dim} --v 6.1 --style raw`,
  };

  return { logic, prompt, negative, metadata };
}

// V13 — Samvaad Studio (The Community Architect) Local Synthesizer
export function generateLocalSamvaadPrompt(params: {
  category: string;
  timeOfDay: string;
  dim: string;
  mood: string;
  story: string;
}) {
  const { category, timeOfDay, dim, mood, story } = params;

  let timeLightingPhysics = "";
  if (timeOfDay.includes("Brahma")) {
    timeLightingPhysics =
      "Brahma Muhurta (4:00 AM) ethereal dawn physics: soft rose-gold and celestial pink horizon glow, cool indigo mist dissolving into first warm golden light rays, quiet contemplative aura.";
  } else if (timeOfDay.includes("Abhijit")) {
    timeLightingPhysics =
      "Abhijit Muhurta (12:00 PM noon) solar physics: sharp zenith direct sunlight, brilliant golden-white clarity, razor-sharp shadow definition, majestic high-energy divine illumination.";
  } else if (timeOfDay.includes("Sandhya")) {
    timeLightingPhysics =
      "Sandhya Kaal (6:00 PM twilight) twilight physics: deep fiery orange, crimson saffron, and mystical purple evening sky, warm oil diya reflections, tranquil transition into sacred night.";
  } else {
    // Nishita Kaal
    timeLightingPhysics =
      "Nishita Kaal (Midnight) celestial physics: deep midnight lapis lazuli and obsidian space, silver moonlight caustics, twinkling constellations, glowing spiritual bioluminescence.";
  }

  const prompt = `A deeply engaging community production asset. Focus: ${category}. Chrono-Lighting Physics: ${timeLightingPhysics} Target Mood: ${mood}. Narrative / Bhakt Anubhav: ${story || "Divine grace and community connection"}. Photorealistic masterpiece, emotional warmth, 8K resolution, IMAX depth. Clean plate with dedicated safe zones for title and channel compositing. --ar ${dim} --v 6.1 --style raw`;

  const logic = `• V13 Samvaad-Siddhi Architecture: Inspires authentic devotion and community engagement.
• Chrono-Lighting Engine: Implements authentic astronomical time-of-day light simulation: ${timeLightingPhysics.split(":")[0]}.
• Mood Resonance: Calibrated for "${mood}" to maximize community interaction and heart-winning replies.
• Safe-Zone Composition: Clean master plate formatted for deterministic channel compositing.`;

  const negative = `western tropes, watermark, text in frame, logo, signature, brand watermark, cold mechanical rendering, cartoonish artifacts, bad proportions, unnatural lighting, oversaturated flat graphics`;

  const metadata = {
    production: "IBD — An Indian Bhakti Dhara Production",
    evolutionLevel: "V13 - Samvaad Community Architect",
    category,
    timeOfDay,
    mood,
    aspectRatio: dim,
    pinnedCommentIdea: `📌 "जय श्री राम! 🙏 आज के इस पावन दर्शन/अनुभव ने आपके मन को कितना छुआ? कमेंट में 'हर हर महादेव' या अपना अनुभव लिखकर अपनी उपस्थिति दर्ज कराएं! ❤️ (IBD Production Team)"`,
    heartWinningReply: `🙏 "प्रिय भक्त/दर्शक, आपका यह सुंदर भाव हमारे पूरे IBD परिवार के हृदय को छू गया। भगवान का आशीर्वाद सदा आप और आपके परिवार पर बना रहे! 🪔✨"`,
    communityEngagementStrategy: "Pin the top emotional question at hour 0, reply with heart to the first 25 devotee comments to trigger YouTube/Instagram algorithmic engagement surge.",
    cinematography: {
      camera: "ARRI Alexa 35",
      lens: "Angenieux Optimo Ultra 12X",
      lighting: timeLightingPhysics.split(":")[0],
      renderPolish: "8K Photoreal Master with Sacred Warm Grading",
    },
    engineFlags: `--ar ${dim} --v 6.1 --style raw`,
  };

  return { logic, prompt, negative, metadata };
}

// V14 — Dharma-Sutra (Global Narrative Architect) Local Synthesizer
export function generateLocalDharmaSutraPrompt(params: {
  strategy: string;
  language: string;
  dim: string;
  series: string;
  story: string;
}) {
  const { strategy, language, dim, series, story } = params;

  let visualDnaStrategy = "";
  if (strategy.includes("Diaspora")) {
    visualDnaStrategy =
      "High-end minimalist international cinematography, Rembrandt directional key lighting, subtle abstract Vedic geometry, deep shadows, sophisticated restrained color palette (obsidian, champagne gold, muted sandalwood).";
  } else if (strategy.includes("Heartland")) {
    visualDnaStrategy =
      "Vibrant high-saturation traditional Bharat aesthetic, rich celebratory color harmony (kumkum crimson, haldi yellow, peacock teal, marigold orange), grand scale temple architecture and ornate filigree.";
  } else if (strategy.includes("Series")) {
    visualDnaStrategy =
      `Episodic continuity for "${series || 'Katha-Vahini Series'}": consistent character sculpt, unified atmospheric color grading, repeatable cinematic leitmotif, signature lighting style.`;
  } else {
    // Educational / Gyan
    visualDnaStrategy =
      "Clean modern infographic layout, golden-ratio section dividing lines, 45% clear structured negative space for script callouts and educational diagrams, crisp macro focus.";
  }

  const prompt = `A global flagship masterwork production asset. Strategy: ${strategy}. Script Layout Optimization: Formatted with generous negative space tailored for ${language} script typography. Visual DNA: ${visualDnaStrategy} Narrative Thread: ${story || "Timeless Vedic narrative connecting ancient roots with universal human consciousness"}. Series Continuity: ${series || "Flagship Global Series"}. 8K resolution, 70mm anamorphic lens, raytraced photorealism. Clean master plate without text or watermarks. --ar ${dim} --v 6.1 --style raw`;

  const logic = `• V14 Dharma-Sutra Global Doctrine: Balances traditional scriptural authenticity with international cinematic prestige.
• Cultural Strategy Formula: ${strategy} — ${visualDnaStrategy.split(",")[0]}.
• Typography & Negative Space: Specifically engineered safe zones for ${language} script layout and subtitles.
• Series Visual DNA: Locks aesthetic continuity for ${series || 'Global Franchise'}.`;

  const negative = `western comic book style, cheap fantasy tropes, watermark, text overlays, logo, signature, bad anatomy, deformed hands, illegible clutter, misaligned text safe-zones, cartoon rendering, low quality`;

  const metadata = {
    production: "IBD — An Indian Bhakti Dhara Production",
    evolutionLevel: "V14 - Dharma-Sutra Global Architect",
    strategy,
    language,
    series: series || "IBD Global Series",
    aspectRatio: dim,
    languageSafeZones: `Reserved upper 35% and bottom 20% safe zone specifically weighted for ${language} script vertical diacritics (Matras/Ascenders) without obscuring key visual subjects.`,
    culturalHooks: `Tuned for ${strategy.includes("Diaspora") ? "Global Indian diaspora and international spiritual seekers looking for modern philosophical depth" : "Heartland audience valuing traditional emotional reverence and scriptural devotion"}.`,
    seriesContinuityCode: `IBD-DNA-${(series || 'GLOBAL').replace(/\s+/g, '-').toUpperCase()}-V14`,
    cinematography: {
      camera: "ARRI Alexa 65 Large Format IMAX 70mm",
      lens: "Leitz Prime Anamorphic 40mm T1.8",
      lighting: strategy.includes("Diaspora") ? "Rembrandt Chiaroscuro" : "Epic Golden Hour Temple Radiance",
      renderPolish: "128-bit Path-Traced Photoreal 8K + Global Production Mastering",
    },
    engineFlags: `--ar ${dim} --v 6.1 --style raw`,
  };

  return { logic, prompt, negative, metadata };
}


