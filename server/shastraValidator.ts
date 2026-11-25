/**
 * Canonical Shilpa Shastra & Agama Iconography Validator
 * Provides rule-based verification of sacred Indic deity iconography
 * replacing hardcoded gate results with genuine validation against scriptural canons.
 */

export interface CanonicalDeity {
  id: string;
  canonicalName: string;
  aliases: RegExp[];
  canonicalAyudhas: string[];
  canonicalVahanas: string[];
  canonicalMudras: string[];
  canonicalAdornments: string[];
  canonicalComplexion: string[];
  anachronismsAndConfusions: RegExp[];
}

export const CANONICAL_SHASTRA_TABLE: CanonicalDeity[] = [
  {
    id: "shiva",
    canonicalName: "Bhagwan Shiva (Mahadev)",
    aliases: [/shiva/i, /mahadev/i, /rudra/i, /shankar/i, /bholenath/i, /neelkanth/i, /nataraja/i],
    canonicalAyudhas: ["trishula", "trishul", "damru", "pinaka"],
    canonicalVahanas: ["nandi", "bull"],
    canonicalMudras: ["abhaya", "dhyana", "chin", "jnana"],
    canonicalAdornments: ["crescent moon", "chandra", "vasuki", "serpent", "snake", "rudraksha", "vibhuti", "tripundra", "ganga", "jata", "tiger skin"],
    canonicalComplexion: ["ash-blue", "neelkanth", "camphor", "karpura", "white", "ash"],
    anachronismsAndConfusions: [/western superhero/i, /plastic/i, /cartoon/i, /mace/i]
  },
  {
    id: "krishna",
    canonicalName: "Bhagwan Shri Krishna",
    aliases: [/krishna/i, /shyam/i, /govinda/i, /gopal/i, /kanha/i, /madhava/i, /vasudeva/i],
    canonicalAyudhas: ["bansuri", "flute", "murali", "sudarshana", "chakra"],
    canonicalVahanas: ["garuda", "surabhi", "cow"],
    canonicalMudras: ["tribhanga", "abhaya"],
    canonicalAdornments: ["peacock feather", "mayur pankh", "pitambara", "yellow silk", "vaijayanti", "kaustubha", "kundal"],
    canonicalComplexion: ["shyam", "cloud blue", "neelambuja", "dark blue", "dark complexion"],
    anachronismsAndConfusions: [/trishula/i, /bow and arrow/i, /trident/i]
  },
  {
    id: "hanuman",
    canonicalName: "Shri Hanuman",
    aliases: [/hanuman/i, /bajrangbali/i, /maruti/i, /sankatmochan/i, /anjaneya/i, /pawanputra/i],
    canonicalAyudhas: ["gada", "mace", "dronagiri", "mountain"],
    canonicalVahanas: ["none", "veerasana", "standing", "kneeling"],
    canonicalMudras: ["anjali", "folded hands", "veerasana", "abhaya"],
    canonicalAdornments: ["sindoor", "sindoori", "janeu", "sacred thread", "kundal", "ram tilak", "langot"],
    canonicalComplexion: ["golden", "swarna", "sindoori", "reddish-gold"],
    anachronismsAndConfusions: [/flute/i, /bansuri/i, /trishula/i]
  },
  {
    id: "ram",
    canonicalName: "Bhagwan Shri Ram",
    aliases: [/sita.*ram/i, /ram.*sita/i, /shri ram/i, /sri rama/i, /raghav/i, /maryada purushottam/i, /kodanda ram/i],
    canonicalAyudhas: ["kodanda", "bow", "arrow", "bana", "quiver", "tarkash"],
    canonicalVahanas: ["chariot", "ratha", "standing"],
    canonicalMudras: ["abhaya", "holding bow"],
    canonicalAdornments: ["vanamala", "royal crown", "kirita", "suryavanshi tilak", "chandan"],
    canonicalComplexion: ["neel-megh", "raincloud", "shyam", "blue", "wheatish radiant"],
    anachronismsAndConfusions: [/damru/i, /peacock feather/i]
  },
  {
    id: "durga",
    canonicalName: "Maa Durga / Parvati",
    aliases: [/durga/i, /parvati/i, /gauri/i, /shakti/i, /ambika/i, /bhavani/i, /jagadamba/i],
    canonicalAyudhas: ["trishula", "chakra", "shankha", "lotus", "khadga", "bow"],
    canonicalVahanas: ["simha", "lion", "tiger", "vyaghra"],
    canonicalMudras: ["abhaya", "varada"],
    canonicalAdornments: ["red saree", "crimson", "alta", "chandan tilak", "gold crown", "zari"],
    canonicalComplexion: ["golden", "gaura", "radiant", "champaka"],
    anachronismsAndConfusions: [/western armor/i, /bull/i]
  },
  {
    id: "ganesha",
    canonicalName: "Bhagwan Shri Ganesha",
    aliases: [/ganesh/i, /ganapati/i, /vinayaka/i, /lambodara/i, /ekadanta/i],
    canonicalAyudhas: ["ankusha", "pasha", "modaka", "laddoo", "broken tusk"],
    canonicalVahanas: ["mooshaka", "mouse"],
    canonicalMudras: ["abhaya", "varada"],
    canonicalAdornments: ["janeu", "trishul tilak", "pitambar", "yellow silk", "garland"],
    canonicalComplexion: ["vermilion", "sindoor", "red", "golden"],
    anachronismsAndConfusions: [/flute/i, /bow and arrow/i]
  },
  {
    id: "saraswati",
    canonicalName: "Maa Saraswati",
    aliases: [/saraswati/i, /sharada/i, /veena vadini/i, /vak devi/i],
    canonicalAyudhas: ["veena", "pustaka", "vedas", "scripture", "japamala", "rosary", "lotus"],
    canonicalVahanas: ["hamsa", "swan", "peacock", "mayur"],
    canonicalMudras: ["playing veena", "varada"],
    canonicalAdornments: ["shweta vastra", "white saree", "pearls", "crescent"],
    canonicalComplexion: ["shweta", "fair", "pure white", "moonlight"],
    anachronismsAndConfusions: [/weapons of war/i, /trident/i]
  }
];

export interface ShastraVerificationResult {
  verified: boolean;
  status: "CANONICAL_MATCH" | "PARTIAL_MATCH" | "UNVERIFIED" | "CONFUSION_DETECTED";
  deityIdentified: string | null;
  canonicalAttributesFound: string[];
  missingCoreAttributes: string[];
  anachronismsDetected: string[];
  details: string;
}

export function verifyShastraIconography(subject: string, promptText: string): ShastraVerificationResult {
  const combinedText = `${subject} ${promptText}`.toLowerCase();
  
  // Find matching canonical deity
  const matchedDeity = CANONICAL_SHASTRA_TABLE.find(d => 
    d.aliases.some(re => re.test(subject))
  );

  if (!matchedDeity) {
    return {
      verified: false,
      status: "UNVERIFIED",
      deityIdentified: null,
      canonicalAttributesFound: [],
      missingCoreAttributes: [],
      anachronismsDetected: [],
      details: "Subject not in canonical Shilpa Shastra reference table. Marked for manual devotional review.",
    };
  }

  // Check for anachronisms or confusions
  const anachronisms: string[] = [];
  matchedDeity.anachronismsAndConfusions.forEach(re => {
    if (re.test(combinedText)) {
      anachronisms.push(re.source);
    }
  });

  if (anachronisms.length > 0) {
    return {
      verified: false,
      status: "CONFUSION_DETECTED",
      deityIdentified: matchedDeity.canonicalName,
      canonicalAttributesFound: [],
      missingCoreAttributes: [],
      anachronismsDetected: anachronisms,
      details: `Flagged iconographic confusion for ${matchedDeity.canonicalName}: detected non-canonical elements (${anachronisms.join(", ")}).`,
    };
  }

  // Check canonical attributes found
  const foundAttributes: string[] = [];
  const allCanonical = [
    ...matchedDeity.canonicalAyudhas,
    ...matchedDeity.canonicalVahanas,
    ...matchedDeity.canonicalMudras,
    ...matchedDeity.canonicalAdornments,
    ...matchedDeity.canonicalComplexion
  ];

  for (const attr of allCanonical) {
    if (combinedText.includes(attr.toLowerCase())) {
      foundAttributes.push(attr);
    }
  }

  // De-duplicate found attributes
  const uniqueFound = Array.from(new Set(foundAttributes));

  if (uniqueFound.length >= 2) {
    return {
      verified: true,
      status: "CANONICAL_MATCH",
      deityIdentified: matchedDeity.canonicalName,
      canonicalAttributesFound: uniqueFound,
      missingCoreAttributes: [],
      anachronismsDetected: [],
      details: `Canonical ${matchedDeity.canonicalName} Shastra verified (${uniqueFound.slice(0, 4).join(", ")}).`,
    };
  } else {
    return {
      verified: false,
      status: "PARTIAL_MATCH",
      deityIdentified: matchedDeity.canonicalName,
      canonicalAttributesFound: uniqueFound,
      missingCoreAttributes: matchedDeity.canonicalAyudhas.slice(0, 2),
      anachronismsDetected: [],
      details: `Partially verified for ${matchedDeity.canonicalName}. Detected: ${uniqueFound.join(", ") || "None"}. Requires verification of primary Ayudhas.`,
    };
  }
}
