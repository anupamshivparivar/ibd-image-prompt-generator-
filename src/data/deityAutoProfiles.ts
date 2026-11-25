import {
  AspectRatio,
  LightingStyle,
  MoodRasa,
  TargetEngine,
} from "../types";

export const AUTO_SELECTION_DECISION_LOGIC = {
  title: "Auto-Selection & Decision Logic",
  rule: "Auto-Selection Logic: Automatically evaluate the subject and mood of each request to pick the single best match across Sampler, Network Look, OTT Level (L18–L30), Camera Angle, and Color Palette. Always apply the highest-fidelity rendering parameters for that deity or couple without requiring manual selection.",
};

export interface DeityAutoProfile {
  id: string;
  deityName: string;
  shortLabel: string;
  keywords: string[];
  moodKeywords?: string[];
  version: number;
  ottLevel: number; // Always L18-L30
  cameraAngle: string;
  colorPalette: string[];
  dim: AspectRatio;
  targetEngine: TargetEngine;
  mood: MoodRasa;
  lightingStyle: LightingStyle;
  cinemaStyle: string;
  sampler: string;
  shastraDetails: string[];
  autoStory: string;
  matchReason: string;
}

export const DEITY_AUTO_PROFILES: DeityAutoProfile[] = [
  {
    id: "param-shiva-singularity",
    deityName: "Param-Shiva (Ananta-Bija Singularity)",
    shortLabel: "Param-Shiva",
    keywords: ["param-shiva", "paratpar", "ananta-bija", "nirguna", "singularity", "sadashiva"],
    moodKeywords: ["singularity", "non-dual", "moksha", "cosmic"],
    version: 11,
    ottLevel: 30,
    cameraAngle: "Monumental Low-Angle Wide IMAX 70mm (35mm Anamorphic)",
    colorPalette: ["Obsidian Void #000000", "Hiranya Seed Gold #FFCC33", "Amethyst Tejas #2D005E"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "V-Paratpar / Ananta-Bija (The Singularity)",
    lightingStyle: "Atman-Sync Swayam-Jyoti (Geometric Source)",
    cinemaStyle: "nolan-hoyte",
    sampler: "DPM++ 3M SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Vibhuti & Rudraksha Textures",
      "Sacred Gold & Stone Seal",
      "8K Octane Octahedral Polish",
    ],
    autoStory:
      "Param-Shiva as the Ananta-Bija Singularity where the unmanifest cosmic void collapses into the radiant golden seed of creation. Compassionate Atman-Sync Drishti Gaze and Swayam-Jyoti self-effulgent illumination radiating across Sri Yantra fractal geometry.",
    matchReason: "L30 Infinity + Nolan/Hoyte IMAX 70mm + DPM++ 3M SDE Karras (8K Hero)",
  },
  {
    id: "ardhanarishvara",
    deityName: "Bhagwan Ardhanarishvara (Shiva-Shakti)",
    shortLabel: "Ardhanarishvara",
    keywords: ["ardhanarishvara", "ardhanari", "shiva-shakti", "shiva shakti"],
    moodKeywords: ["non-dual", "balance", "symmetry"],
    version: 11,
    ottLevel: 29,
    cameraAngle: "Dead-Centre Symmetrical Medium Full Shot (65mm Panavision Sphero)",
    colorPalette: ["Vibhuti Ash Silver #CBD5E1", "Parvati Crimson Zari #B91C1C", "Sacred Gold #FFD700"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "V-Paratpar / Ananta-Bija (The Singularity)",
    lightingStyle: "Atman-Sync Swayam-Jyoti (Geometric Source)",
    cinemaStyle: "apple-tv-plus",
    sampler: "DPM++ 3M SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Vibhuti & Rudraksha Textures",
      "Chola Bronze Patina",
      "Shilpa Shastra Canon Talamana",
    ],
    autoStory:
      "Bhagwan Ardhanarishvara manifesting in exact 50/50 vertical non-dual synthesis: right half ash-smeared Mahadev with crescent moon, Vasuki, and Trishula; left half golden Maa Parvati in crimson zari silk holding a blooming pink lotus, radiating Swayam-Jyoti unity.",
    matchReason: "L29 + Apple TV+ Precision HDR + DPM++ 3M SDE Karras + Swayam-Jyoti Symmetry",
  },
  {
    id: "shiv-parivar-jhoola",
    deityName: "Shiv Parivar & Shiv Parvati (Kailash)",
    shortLabel: "Shiv Parivar",
    keywords: ["parivar", "jhulan", "jhula", "jhoola", "teej", "matru", "vatsalya", "parvati", "gauri"],
    moodKeywords: ["serene", "peaceful", "calm", "family", "shanta"],
    version: 6,
    ottLevel: 26,
    cameraAngle: "Balanced Three-Quarter Courtyard Wide (50mm Natural Perspective)",
    colorPalette: ["Himalayan Dawn Mist #E2E8F0", "Saffron Silk #F59E0B", "Pine Emerald #065F46"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Brahmamuhurta Dawn Gold",
    cinemaStyle: "disney-enchantment",
    sampler: "Euler a",
    shastraDetails: [
      "Vibhuti & Rudraksha Textures",
      "Shilpa Shastra Canon Talamana",
      "Volumetric Dhoop Incense Smoke",
      "Chola Bronze Patina",
    ],
    autoStory:
      "Bhagwan Shiva and Maa Parvati in serene Shravan grace on Mount Kailash amid Himalayan pine mist, fragrant Parijata and Bel-patra garlands, with Nandi bull resting peacefully and golden dawn light filtering through alpine clouds.",
    matchReason: "L26 + Disney Luminous Calm + Euler a (Divine Calm) + Brahmamuhurta Dawn",
  },
  {
    id: "shiva-mahadev",
    deityName: "Bhagwan Shiva Mahadev",
    shortLabel: "Shiva",
    keywords: ["shiva", "shiv", "mahadev", "mahakal", "tandava", "nataraja", "shankar", "bholenath", "kailash", "neelkanth", "rudra", "shambhu"],
    moodKeywords: ["fierce", "rudra", "storm", "tandava", "moody"],
    version: 10,
    ottLevel: 30,
    cameraAngle: "Dramatic Low-Angle Hero Portrait (Panavision Primo 70 Anamorphic f/1.8)",
    colorPalette: ["Kailash Storm Slate #1E293B", "Glacial Ash Snow #E2E8F0", "Rudra Ember Gold #F59E0B"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "Rudra / Tandava (Fierce Divine)",
    lightingStyle: "Saptarishi Celestial 7-Point Ray",
    cinemaStyle: "hbo-prestige",
    sampler: "DPM++ SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Vibhuti & Rudraksha Textures",
      "Sanskrit Yantra Geometry",
      "Shilpa Shastra Canon Talamana",
      "Volumetric Dhoop Incense Smoke",
    ],
    autoStory:
      "Fierce Rudra Mahadev Shiva atop snow-swept Mount Kailash amidst gathering storm clouds, glowing Trishul, Vibhuti ash and Rudraksha textures, crisp mountain snow, and dramatic moody chiaroscuro lighting.",
    matchReason: "L30 + HBO Prestige / BBC Earth + DPM++ SDE Karras (High Stone/Muscle Detail)",
  },
  {
    id: "krishna-gitopadesha",
    deityName: "Parthasarathi Krishna (Kurukshetra Gitopadesha)",
    shortLabel: "Gita Upadesh",
    keywords: ["gitopadesha", "kurukshetra", "parthasarathi", "gita", "geeta", "vishwarupa", "brahmanda"],
    moodKeywords: ["cosmic", "moksha", "war", "kurukshetra"],
    version: 10,
    ottLevel: 29,
    cameraAngle: "Sweeping 21:9 Anamorphic Two-Shot Chariot Profile (IMAX 65mm)",
    colorPalette: ["Kurukshetra Dust Gold #D97706", "Vishwarupa Indigo #1E1B4B", "War Bronze #78350F"],
    dim: "21:9",
    targetEngine: "Midjourney v6.1",
    mood: "Moksha / Non-Dual (Pure Consciousness)",
    lightingStyle: "Swayam-Jyoti (Non-Dual Self-Effulgence)",
    cinemaStyle: "nolan-hoyte",
    sampler: "DPM++ 3M SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Shilpa Shastra Canon Talamana",
      "8K Octane Octahedral Polish",
    ],
    autoStory:
      "Bhagwan Shri Krishna as Parthasarathi atop the golden chariot drawn by white steeds at Kurukshetra, turning to Arjuna in Chin-Mudra with cosmic Vishwarupa starfields subtly shimmering in golden light behind Him.",
    matchReason: "L29 + 21:9 IMAX Anamorphic + Nolan/Hoyte + DPM++ 3M SDE Karras",
  },
  {
    id: "radha-krishna",
    deityName: "Shri Radha Krishna (Vrindavan Prem)",
    shortLabel: "Radha Krishna",
    keywords: ["radha", "bansuri", "yugal", "sharad", "phoolon", "holi", "vrindavan", "kadamba"],
    moodKeywords: ["romantic", "prem", "soft", "bokeh", "petals", "dreamy"],
    version: 9,
    ottLevel: 28,
    cameraAngle: "Dreamy Eye-Level Medium Two-Shot with Soft Bokeh (85mm T1.5)",
    colorPalette: ["Vrindavan Pastel Rose #F472B6", "Kadamba Emerald #047857", "Flute Dawn Gold #FBBF24"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Brahmamuhurta Dawn Gold",
    cinemaStyle: "apple-tv-plus",
    sampler: "Euler a",
    shastraDetails: [
      "Shilpa Shastra Canon Talamana",
      "Sanskrit Yantra Geometry",
      "Volumetric Dhoop Incense Smoke",
      "Chola Bronze Patina",
    ],
    autoStory:
      "Romantic Prem and pure devotional grace of Shri Radha Krishna in blooming Vrindavan beneath Kadamba blossoms, surrounded by soft pastel bokeh, drifting lotus petals, golden Bansuri flute melody, and luminous Yamuna dawn tranquility.",
    matchReason: "L28 + Apple TV+ Pristine / Disney+ Fantasy + Euler a (Romantic / Prem Vrindavan)",
  },
  {
    id: "krishna-leela",
    deityName: "Bhagwan Shri Krishna",
    shortLabel: "Shri Krishna",
    keywords: ["krishna", "kanha", "govind", "gopal", "murlidhar", "dwarkadhish", "govardhan", "kaliya", "gokul", "mathura", "janmabhoomi", "bal krishna"],
    moodKeywords: ["celestial", "tejas", "enchanting", "festive"],
    version: 8,
    ottLevel: 28,
    cameraAngle: "Heroic Three-Quarter Eye-Level Portrait (Cooke 50mm Prime)",
    colorPalette: ["Shyamal Monsoon Blue #1D4ED8", "Pitambara Gold #FACC15", "Peacock Teal #0D9488"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "Vaikuntha / Celestial Tejas",
    lightingStyle: "Hiranyagarbha Solar Core",
    cinemaStyle: "rajamouli-bhansali",
    sampler: "DPM++ SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Shilpa Shastra Canon Talamana",
      "Sacred Gold & Stone Seal",
      "Chola Bronze Patina",
    ],
    autoStory:
      "Bhagwan Shri Krishna in radiant Shyamal monsoon-blue complexion adorned with peacock-feather Mukuta, Pitambara silk, Kaustubha gem, and golden Bansuri, bathed in luminous golden sunbeams and Vaikuntha celestial grace.",
    matchReason: "L28 + Rajamouli/SLB Indic Grandeur + DPM++ SDE Karras (Silk/Gold Detail)",
  },
  {
    id: "ram-sita-circuit",
    deityName: "Siya Ram (Maryada Purushottam Shri Ram & Maa Sita)",
    shortLabel: "Siya Ram",
    keywords: ["siya", "siya ram", "siyarama", "sarayu", "ram", "rama", "sita", "janaki", "ayodhya", "chitrakoot", "panchavati", "rameshwaram", "pushpak", "janakpur", "kodanda", "raghu"],
    moodKeywords: ["divine calm", "calm", "sarayu", "dawn", "quiet devotion", "shanta"],
    version: 8,
    ottLevel: 28,
    cameraAngle: "Serene Eye-Level Wide Riverfront Tableau (Cooke Anamorphic 40mm)",
    colorPalette: ["Sarayu Night Indigo #0F172A", "Golden Dawn Amber #F59E0B", "Ayodhya Saffron #EA580C"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Brahmamuhurta Dawn Gold",
    cinemaStyle: "netflix-prestige",
    sampler: "DPM++ 2M Karras",
    shastraDetails: [
      "Shilpa Shastra Canon Talamana",
      "Sacred Gold & Stone Seal",
      "Volumetric Dhoop Incense Smoke",
      "Chola Bronze Patina",
    ],
    autoStory:
      "Siya Ram in supreme Divine Calm along the tranquil Sarayu River Night as golden dawn breaks across Ayodhya ghats, illuminated by floating earthen diyas, quiet devotion, Kodanda bow, and serene Banarasi silk.",
    matchReason: "L28 + Netflix Premium / Nat Geo + DPM++ 2M Karras (Clean Balanced)",
  },
  {
    id: "veer-hanuman",
    deityName: "Veer Hanuman (Ram Setu Tejas)",
    shortLabel: "Hanuman",
    keywords: ["hanuman", "bajrang", "anjani", "sanjeevani", "maruti", "pawanputra", "sundarkand", "kesari", "ram setu"],
    moodKeywords: ["volumetric", "saffron", "heroic", "flying", "powerful"],
    version: 8,
    ottLevel: 30,
    cameraAngle: "Dynamic Low-Angle Aerial Flight Perspective (24mm IMAX Wide)",
    colorPalette: ["Sindoor Vermilion #DC2626", "Saffron Solar Gold #F97316", "Ocean Storm Teal #0F766E"],
    dim: "9:16",
    targetEngine: "Midjourney v6.1",
    mood: "Rudra / Tandava (Fierce Divine)",
    lightingStyle: "Hiranyagarbha Solar Core",
    cinemaStyle: "disney-enchantment",
    sampler: "DPM++ SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Shilpa Shastra Canon Talamana",
      "Sacred Gold & Stone Seal",
      "Volumetric Dhoop Incense Smoke",
    ],
    autoStory:
      "Veer Hanuman soaring dynamically across ocean clouds above sacred Ram Setu, bathed in radiant saffron-gold glow, dynamic volumetric godrays, Sindoor-vermilion power, golden Gada mace, and blazing heroic devotion.",
    matchReason: "L30 + Disney+ Epic Fantasy + DPM++ SDE Karras (Saffron-Gold Volumetric)",
  },
  {
    id: "maa-durga",
    deityName: "Maa Durga / Mata (Adyashakti)",
    shortLabel: "Durga / Mata",
    keywords: ["durga", "mata", "durga mata", "adyashakti", "mahishasura", "ambika", "bhavani", "sherawali", "navaratri", "chandika", "shakti"],
    moodKeywords: ["fierce", "royal", "rim light", "warrior"],
    version: 8,
    ottLevel: 29,
    cameraAngle: "Regal Heroic Low-Angle Throne & Lion Composition (Primo 70mm f/1.8)",
    colorPalette: ["Shakti Imperial Crimson #991B1B", "24K Temple Gold #D4AF37", "Dramatic Obsidian #09090B"],
    dim: "2:3",
    targetEngine: "Flux 1.1 Pro",
    mood: "Rudra / Tandava (Fierce Divine)",
    lightingStyle: "Hiranyagarbha Solar Core",
    cinemaStyle: "hbo-prestige",
    sampler: "DPM++ SDE Karras",
    shastraDetails: [
      "Shilpa Shastra Canon Talamana",
      "Planck-length Detail",
      "Sacred Gold & Stone Seal",
      "Volumetric Dhoop Incense Smoke",
    ],
    autoStory:
      "Fierce royal Maa Durga astride a roaring golden Asiatic lion, draped in rich crimson-red Banarasi silk and 24k temple gold, dramatic rim lighting sculpting her ten consecrated weapons and fearless gaze.",
    matchReason: "L29 + HBO Prestige + DPM++ SDE Karras (Fierce Royal Crimson & Gold)",
  },
  {
    id: "maa-kali",
    deityName: "Maa Kali (Mahavidya Adyashakti)",
    shortLabel: "Maa Kali",
    keywords: ["kali", "mahakali", "mahavidya", "tara", "dakshinakali", "tantra", "chamunda"],
    moodKeywords: ["mystical", "tantra", "cosmic", "void"],
    version: 8,
    ottLevel: 29,
    cameraAngle: "Monolithic Vertical Close-Medium Hero Shot (Alexa LF 50mm)",
    colorPalette: ["Abyssal Cosmic Void #020617", "Nebula Indigo #312E81", "Sacred Ember Red #DC2626"],
    dim: "2:3",
    targetEngine: "Flux 1.1 Pro",
    mood: "Mahavidya / Mystical Tantra",
    lightingStyle: "Cosmic Nebula Rim Glow",
    cinemaStyle: "villeneuve-fraser",
    sampler: "Heun",
    shastraDetails: [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Volumetric Dhoop Incense Smoke",
      "Shilpa Shastra Canon Talamana",
    ],
    autoStory:
      "Maa Kali standing in transcendental cosmic power against deep obsidian void space with starfields shimmering across her dark blue-black form, third eye blazing red-gold, offering Abhaya Mudra of fearless liberation.",
    matchReason: "L29 + Villeneuve/Fraser Monolith + Heun (Hero Close-Up Precision)",
  },
  {
    id: "lakshmi-narayana",
    deityName: "Bhagwan Vishnu & Maa Lakshmi (Vaikuntha)",
    shortLabel: "Vishnu & Lakshmi",
    keywords: ["lakshmi", "mahalakshmi", "narayana", "vishnu", "vaikuntha", "ksheerasagara", "padmanabha", "venkateshwara", "tirupati", "balaji"],
    moodKeywords: ["vaikuntha", "cosmic", "halo", "celestial", "deep blue"],
    version: 8,
    ottLevel: 30,
    cameraAngle: "Grand Symmetrical Cosmic Wide Vista (ARRI Alexa 65 65mm Sphero)",
    colorPalette: ["Vaikuntha Deep Blue #0F172A", "Cosmic Starlight #38BDF8", "Halo Sovereign Gold #FFD700"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: "Vaikuntha / Celestial Tejas",
    lightingStyle: "Swayam-Jyoti (Non-Dual Self-Effulgence)",
    cinemaStyle: "apple-tv-plus",
    sampler: "DPM++ 3M SDE Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Chola Bronze Patina",
      "8K Octane Octahedral Polish",
    ],
    autoStory:
      "Bhagwan Vishnu and Maa Lakshmi in supreme Vaikuntha majesty surrounded by cosmic stars, radiant glowing golden halos, deep celestial sapphire blue and 24k temple gold lotus splendor.",
    matchReason: "L30 Infinity + Apple TV+ Pristine + DPM++ 3M SDE Karras (8K Hero Vaikuntha)",
  },
  {
    id: "maa-saraswati",
    deityName: "Maa Saraswati (Devi of Vidya)",
    shortLabel: "Saraswati",
    keywords: ["saraswati", "veena", "vidya", "sharda", "hamsa", "vasant"],
    moodKeywords: ["pure", "white", "calm", "morning haze", "serene"],
    version: 7,
    ottLevel: 28,
    cameraAngle: "Tranquil Eye-Level Lotus Pond Portrait (65mm T1.5 Soft Morning Haze)",
    colorPalette: ["Pure Swan Ivory #FAF5EB", "Soft Morning Haze Gold #FDE68A", "Lotus Mist #E2E8F0"],
    dim: "16:9",
    targetEngine: "Flux 1.1 Pro",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Brahmamuhurta Dawn Gold",
    cinemaStyle: "apple-tv-plus",
    sampler: "Euler a",
    shastraDetails: [
      "Shilpa Shastra Canon Talamana",
      "Sanskrit Yantra Geometry",
      "Chola Bronze Patina",
    ],
    autoStory:
      "Maa Saraswati in pure white silk and gold accents seated calmly upon a spotless white lotus beside her graceful white Hamsa swan, playing the rosewood Veena amidst soft tranquil morning haze.",
    matchReason: "L28 + Apple TV+ Pristine + Euler a (Pure White & Gold Morning Haze)",
  },
  {
    id: "ganesha",
    deityName: "Bhagwan Siddhivinayak Ganesha",
    shortLabel: "Ganesha",
    keywords: ["ganesha", "ganesh", "ganpati", "vinayak", "siddhivinayak", "lambodara", "vignaharta", "modak", "utsav"],
    moodKeywords: ["festive", "utsav", "marigold", "orange"],
    version: 6,
    ottLevel: 28,
    cameraAngle: "Warm Eye-Level Courtyard Celebration Medium Shot (35mm Prime)",
    colorPalette: ["Utsav Marigold Orange #EA580C", "Temple Diya Gold #FBBF24", "Sandstone Heritage #78350F"],
    dim: "4:5",
    targetEngine: "Flux 1.1 Pro",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Deep Garbhagriha Oil Diya",
    cinemaStyle: "disney-enchantment",
    sampler: "DPM++ 2M Karras",
    shastraDetails: [
      "Shilpa Shastra Canon Talamana",
      "Sacred Gold & Stone Seal",
      "Volumetric Dhoop Incense Smoke",
      "Chola Bronze Patina",
    ],
    autoStory:
      "Bhagwan Siddhivinayak Ganesha in a festive Utsav stone temple courtyard decorated with vibrant orange and gold marigold garlands, glowing brass lamps, golden Modakas, and joyful warm radiance.",
    matchReason: "L28 + Disney+ Epic Fantasy + DPM++ 2M Karras (Festive Utsav Marigold)",
  },
  {
    id: "murugan",
    deityName: "Bhagwan Kartikeya (Murugan)",
    shortLabel: "Murugan / Kartikeya",
    keywords: ["murugan", "kartikeya", "skanda", "subramanya", "shanmukha", "vel"],
    moodKeywords: ["heroic", "tejas", "south indian"],
    version: 6,
    ottLevel: 27,
    cameraAngle: "Slightly Low-Angle Temple Mandapa Heroic Framing (50mm f/1.8)",
    colorPalette: ["Peacock Emerald #059669", "Sakti Vel Gold #FFD700", "Temple Copper #B45309"],
    dim: "2:3",
    targetEngine: "Midjourney v6.1",
    mood: "Vaikuntha / Celestial Tejas",
    lightingStyle: "Hiranyagarbha Solar Core",
    cinemaStyle: "rajamouli-bhansali",
    sampler: "DPM++ 2M Karras",
    shastraDetails: [
      "Shilpa Shastra Canon Talamana",
      "Chola Bronze Patina",
      "Sacred Gold & Stone Seal",
    ],
    autoStory:
      "Bhagwan Murugan standing atop misty South Indian temple hills holding the luminous golden Sakti Vel, accompanied by his vibrant emerald Mayura peacock amidst golden temple pillars and dawn incense.",
    matchReason: "L27 + Rajamouli/SLB Heroic + DPM++ 2M Karras",
  },
  {
    id: "ganga-teerth-aarti",
    deityName: "Maa Ganga & Sacred Teerth Sanctum",
    shortLabel: "Ganga / Teerth",
    keywords: ["ganga", "yamuna", "kashi", "varanasi", "haridwar", "rishikesh", "kedarnath", "badrinath", "aarti", "ghat", "teerth", "jyotirlinga", "somnath"],
    moodKeywords: ["aarti", "river", "twilight", "serenity"],
    version: 7,
    ottLevel: 28,
    cameraAngle: "Wide River-Level Reflections Editorial Shot (Leica 35mm f/1.4)",
    colorPalette: ["Kashi Twilight Indigo #1E293B", "Camphor Flame Gold #FBBF24", "Ganga River Teal #0F766E"],
    dim: "16:9",
    targetEngine: "Flux 1.1 Pro",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Deep Garbhagriha Oil Diya",
    cinemaStyle: "nat-geo",
    sampler: "LMS Karras",
    shastraDetails: [
      "Volumetric Dhoop Incense Smoke",
      "Sacred Gold & Stone Seal",
      "Planck-length Detail",
    ],
    autoStory:
      "Sacred Sandhya Aarti along ancient stone Ganga ghats as twilight golden and indigo hues reflect across shimmering river waters, floating earthen diyas, rising camphor flames, and timeless Himalayan serenity.",
    matchReason: "L28 + Nat Geo Editorial + LMS Karras (Smooth Sky, Sunset & Ganga Waters)",
  },
  {
    id: "sikh-gurudwara-heritage",
    deityName: "Sri Harmandir Sahib & Sacred Gurudwara Darshan",
    shortLabel: "Harmandir / Sikh",
    keywords: ["nanak", "guru", "gobind", "harmandir", "golden temple", "amritsar", "gurudwara", "waheguru"],
    moodKeywords: ["dawn", "stillness", "reflection", "sarovar"],
    version: 7,
    ottLevel: 28,
    cameraAngle: "Low-Waterline Symmetrical Mirror Reflection Shot (35mm Prime)",
    colorPalette: ["Harmandir 24K Gold #F59E0B", "Amrit Sarovar Sapphire #1E3A8A", "Brahma Dawn Pearl #FAF5EB"],
    dim: "16:9",
    targetEngine: "Flux 1.1 Pro",
    mood: "Bhakti / Shanta (Serene)",
    lightingStyle: "Brahmamuhurta Dawn Gold",
    cinemaStyle: "nat-geo",
    sampler: "LMS Karras",
    shastraDetails: [
      "Sacred Gold & Stone Seal",
      "Planck-length Detail",
      "8K Octane Octahedral Polish",
    ],
    autoStory:
      "Sacred Brahma Muhurta view of Sri Harmandir Sahib gleaming in pure 24k gold across the tranquil mirror-like Amrit Sarovar waters, bathed in serene dawn gold and peaceful spiritual stillness.",
    matchReason: "L28 + Nat Geo Reportage + LMS Karras (Smooth Sarovar Water & Dawn Sky)",
  },
];

export function resolveDeityAutoProfile(
  subjectText: string,
  moodText?: string
): DeityAutoProfile {
  const normalizedSubj = (subjectText || "").toLowerCase().trim();
  const normalizedMood = (moodText || "").toLowerCase().trim();
  const combined = `${normalizedSubj} ${normalizedMood}`.trim();

  if (!normalizedSubj && !normalizedMood) {
    return DEITY_AUTO_PROFILES[0];
  }

  // Evaluate both Subject and Mood keywords to pick the single best match
  let bestMatch: DeityAutoProfile | null = null;
  let bestScore = 0;

  for (const profile of DEITY_AUTO_PROFILES) {
    let score = 0;
    for (const kw of profile.keywords) {
      if (normalizedSubj.includes(kw)) {
        score = Math.max(score, kw.length * 2);
      } else if (combined.includes(kw)) {
        score = Math.max(score, kw.length);
      }
    }
    if (normalizedMood && profile.moodKeywords) {
      for (const mk of profile.moodKeywords) {
        if (normalizedMood.includes(mk)) {
          score += 3;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = profile;
    }
  }

  if (bestMatch) {
    // If explicit fierce/dramatic mood overrides calm default, escalate OTT level to L29-L30
    if (
      normalizedMood &&
      (normalizedMood.includes("rudra") ||
        normalizedMood.includes("fierce") ||
        normalizedMood.includes("tandava") ||
        normalizedMood.includes("singularity") ||
        normalizedMood.includes("god level") ||
        normalizedMood.includes("l30"))
    ) {
      return {
        ...bestMatch,
        ottLevel: Math.max(bestMatch.ottLevel, 30),
      };
    }
    return bestMatch;
  }

  // Evaluate mood alone for custom subjects to pick optimal Sampler, Look, L18-L30, Angle & Palette
  const isFierceMood = /rudra|fierce|tandava|storm|war/i.test(normalizedMood);
  const isRomanticCalm = /prem|romantic|calm|shanta|peace|dreamy/i.test(normalizedMood);

  return {
    id: "custom-sovereign-deity",
    deityName: subjectText || "Sacred Deity",
    shortLabel: (subjectText || "Sacred Deity").slice(0, 22),
    keywords: [],
    version: isFierceMood ? 10 : 8,
    ottLevel: isFierceMood ? 30 : 28,
    cameraAngle: isFierceMood
      ? "Dramatic Low-Angle IMAX 70mm Hero Framing (Primo 70mm f/1.8)"
      : "Serene Eye-Level Symmetrical Sanctum Portrait (ARRI Alexa 65)",
    colorPalette: isFierceMood
      ? ["Imperial Storm Obsidian #09090B", "Rudra Fire Gold #F59E0B", "Shakti Crimson #991B1B"]
      : isRomanticCalm
      ? ["Morning Lotus Ivory #FAF5EB", "Soft Dawn Gold #FBBF24", "Yamuna Sapphire #1E3A8A"]
      : ["Vaikuntha Sapphire #0F172A", "24K Temple Gold #FFD700", "Warm Diya Amber #D97706"],
    dim: "16:9",
    targetEngine: "Midjourney v6.1",
    mood: isFierceMood
      ? "Rudra / Tandava (Fierce Divine)"
      : isRomanticCalm
      ? "Bhakti / Shanta (Serene)"
      : "Vaikuntha / Celestial Tejas",
    lightingStyle: isFierceMood
      ? "Hiranyagarbha Solar Core"
      : "Swayam-Jyoti (Non-Dual Self-Effulgence)",
    cinemaStyle: isFierceMood ? "hbo-prestige" : "apple-tv-plus",
    sampler: isFierceMood
      ? "DPM++ SDE Karras"
      : isRomanticCalm
      ? "Euler a"
      : "DPM++ 2M Karras",
    shastraDetails: [
      "Planck-length Detail",
      "Sanskrit Yantra Geometry",
      "Sacred Gold & Stone Seal",
      "Shilpa Shastra Canon Talamana",
    ],
    autoStory: `${subjectText || "Sacred Deity"} manifested in supreme canonical Shilpa Shastra majesty inside an ancient consecrated temple sanctum, illuminated by warm Garbhagriha oil diyas and Swayam-Jyoti divine effulgence.`,
    matchReason: isFierceMood
      ? "L30 Auto-Selection (HBO Prestige + DPM++ SDE Karras)"
      : isRomanticCalm
      ? "L28 Auto-Selection (Apple TV+ Pristine + Euler a)"
      : "L28 Auto-Selection (Apple TV+ HDR + DPM++ 2M Karras)",
  };
}

export interface DeityCoupleMappingRow {
  id: string;
  deityOrCouple: string;
  profileId: string;
  recommendedSamplerLabel: string;
  primarySampler: string;
  altSampler?: string;
  networkStyleLabel: string;
  primaryCinemaId: string;
  altCinemaId?: string;
  moodAtmosphere: string;
}

export const DEITY_COUPLE_MAPPING_TABLE: DeityCoupleMappingRow[] = [
  {
    id: "map-radha-krishna",
    deityOrCouple: "Radha Krishna",
    profileId: "radha-krishna",
    recommendedSamplerLabel: "Euler a (Soft, dreamy) or DPM++ SDE",
    primarySampler: "Euler a",
    altSampler: "DPM++ SDE Karras",
    networkStyleLabel: "Apple TV+ Pristine or Disney+ Fantasy",
    primaryCinemaId: "apple-tv-plus",
    altCinemaId: "disney-enchantment",
    moodAtmosphere: "Romantic / Prem, Vrindavan, soft pastel bokeh, petals",
  },
  {
    id: "map-shiva",
    deityOrCouple: "Shiva",
    profileId: "shiva-mahadev",
    recommendedSamplerLabel: "DPM++ SDE Karras (High stone/muscle detail)",
    primarySampler: "DPM++ SDE Karras",
    networkStyleLabel: "HBO Prestige or BBC Earth",
    primaryCinemaId: "hbo-prestige",
    altCinemaId: "bbc-earth",
    moodAtmosphere: "Fierce / Rudra, Kailash snow, storm, Trishul, moody lighting",
  },
  {
    id: "map-siya-ram",
    deityOrCouple: "Siya Ram",
    profileId: "ram-sita-circuit",
    recommendedSamplerLabel: "DPM++ 2M Karras (Clean balanced)",
    primarySampler: "DPM++ 2M Karras",
    networkStyleLabel: "Netflix Premium or National Geographic",
    primaryCinemaId: "netflix-prestige",
    altCinemaId: "nat-geo",
    moodAtmosphere: "Divine Calm, Sarayu Night, golden dawn, quiet devotion",
  },
  {
    id: "map-hanuman",
    deityOrCouple: "Hanuman",
    profileId: "veer-hanuman",
    recommendedSamplerLabel: "DPM++ SDE Karras",
    primarySampler: "DPM++ SDE Karras",
    networkStyleLabel: "Disney+ Epic Fantasy",
    primaryCinemaId: "disney-enchantment",
    moodAtmosphere: "Saffron-gold glow, dynamic volumetric lighting, flying / Ram Setu",
  },
  {
    id: "map-ganesha",
    deityOrCouple: "Ganesha",
    profileId: "ganesha",
    recommendedSamplerLabel: "DPM++ 2M Karras",
    primarySampler: "DPM++ 2M Karras",
    networkStyleLabel: "Disney+ Epic Fantasy",
    primaryCinemaId: "disney-enchantment",
    moodAtmosphere: "Festive / Utsav, orange & gold, marigold, temple courtyard",
  },
  {
    id: "map-durga-mata",
    deityOrCouple: "Durga / Mata",
    profileId: "maa-durga",
    recommendedSamplerLabel: "DPM++ SDE Karras",
    primarySampler: "DPM++ SDE Karras",
    networkStyleLabel: "HBO Prestige",
    primaryCinemaId: "hbo-prestige",
    moodAtmosphere: "Fierce / Royal, rich red & gold, lion, dramatic rim light",
  },
  {
    id: "map-vishnu-lakshmi",
    deityOrCouple: "Vishnu & Lakshmi",
    profileId: "lakshmi-narayana",
    recommendedSamplerLabel: "DPM++ 3M SDE Karras (8K Hero)",
    primarySampler: "DPM++ 3M SDE Karras",
    networkStyleLabel: "Apple TV+ Pristine",
    primaryCinemaId: "apple-tv-plus",
    moodAtmosphere: "Vaikuntha, cosmic stars, glowing halo, deep blue & gold",
  },
  {
    id: "map-saraswati",
    deityOrCouple: "Saraswati",
    profileId: "maa-saraswati",
    recommendedSamplerLabel: "Euler a",
    primarySampler: "Euler a",
    networkStyleLabel: "Apple TV+ Pristine",
    primaryCinemaId: "apple-tv-plus",
    moodAtmosphere: "Pure white & gold, calm, swan, soft morning haze",
  },
];

