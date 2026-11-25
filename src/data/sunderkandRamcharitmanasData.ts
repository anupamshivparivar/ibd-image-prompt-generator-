// Comprehensive Sacred Dataset for Shri Sundarkand & Shri Ramcharitmanas
// Authored by Goswami Tulsidas Ji — Curated for Indian Bhakti Dhara (IBD)

export type RamcharitmanasKaandId =
  | "ALL"
  | "SUNDARKAND"
  | "BAL_KAAND"
  | "AYODHYA_KAAND"
  | "ARANYA_KAAND"
  | "KISHKINDHA_KAAND"
  | "LANKA_KAAND"
  | "UTTAR_KAAND";

export interface RamcharitmanasKaandInfo {
  id: RamcharitmanasKaandId;
  number: number;
  nameSanskrit: string;
  nameHindi: string;
  nameEnglish: string;
  significanceHindi: string;
  keyTheme: string;
  icon: string;
}

export interface SunderkandItem {
  id: string;
  kaand: RamcharitmanasKaandId;
  section: "SUNDARKAND" | "BAL_KAAND" | "AYODHYA_KAAND" | "ARANYA_KAAND" | "KISHKINDHA_KAAND" | "LANKA_KAAND" | "UTTAR_KAAND";
  verseType: "श्लोक (Shloka)" | "चौपाई (Chaupai)" | "दोहा (Doha)" | "सोरठा (Soratha)" | "छन्द (Chhand)";
  verseNumberOrLabel: string;
  titleHindi: string;
  titleEnglish: string;
  sacredTextAwadhi: string; // The primary poetic text in Devanagari (Chaupai/Doha/Shloka)
  transliteration: string;
  wordByWord: { word: string; meaningHindi: string; meaningEnglish: string }[];
  bhawarthHindi: string; // Detailed devotional Hindi explanation
  englishMeaning: string; // Authentic spiritual English commentary
  spiritualGyan: string; // Devotional core realization (आध्यात्मिक मर्म)
  practicalLifeApplication: string; // Practical daily guidance (दैनिक जीवन में उपयोग)
  deityFocus: "श्री हनुमान जी" | "श्री राम-जानकी" | "श्री भरत जी" | "श्री लक्ष्मण जी" | "विभीषण जी" | "शबरी माता" | "गोस्वामी तुलसीदास";
  tags: string[];
  imagePrompt916: {
    master: string;
    textOverlay: string;
    cleanArt: string;
    videoPrompt: string;
  };
  shortsScript60s: {
    hook: string;
    scene1Visual: string;
    scene1Voiceover: string;
    scene2Visual: string;
    scene2Voiceover: string;
    scene3Visual: string;
    scene3Voiceover: string;
    outroCallToAction: string;
    audioTrackRecommendation: string;
    onScreenCaptions: string[];
  };
  channelBranding: {
    watermarkText: string;
    handle: string;
    sealText: string;
    suggestedHashtags: string[];
  };
}

export const RAMCHARITMANAS_KAANDS: RamcharitmanasKaandInfo[] = [
  {
    id: "SUNDARKAND",
    number: 5,
    nameSanskrit: "सुन्दरकाण्डम्",
    nameHindi: "श्री सुन्दरकाण्ड",
    nameEnglish: "Shri Sunderkand",
    significanceHindi: "हनुमान जी के पराक्रम, बुद्धि, सीता अन्वेषण, लंका दहन और विभीषण शरणागति का परम पावन काण्ड।",
    keyTheme: "हनुमान शौर्य, भक्ति, संकटमोचन व प्रभु कृपा",
    icon: "🚩",
  },
  {
    id: "BAL_KAAND",
    number: 1,
    nameSanskrit: "बालकाण्डम्",
    nameHindi: "बालकाण्ड",
    nameEnglish: "Bal Kaand",
    significanceHindi: "मंगलाचरण, शिव-पार्वती संवाद, श्री राम का प्राकट्योत्सव, बाल लीला और सीता स्वयंवर।",
    keyTheme: "प्रभु अवतार, गुरु महिमा व धनुर्भंग",
    icon: "🪷",
  },
  {
    id: "AYODHYA_KAAND",
    number: 2,
    nameSanskrit: "अयोध्याकाण्डम्",
    nameHindi: "अयोध्याकाण्ड",
    nameEnglish: "Ayodhya Kaand",
    significanceHindi: "श्री राम का वन गमन, केवट संवाद, दशरथ विलाप, भरत का पावन चरित्र और पादुका पूजन।",
    keyTheme: "त्याग, भ्रातृ-प्रेम, मर्यादा व भरत भक्ति",
    icon: "🏹",
  },
  {
    id: "ARANYA_KAAND",
    number: 3,
    nameSanskrit: "अरण्यकाण्डम्",
    nameHindi: "अरण्यकाण्ड",
    nameEnglish: "Aranya Kaand",
    significanceHindi: "पंचवटी वास, शूर्पणखा प्रसंग, खर-दूषण वध, मारीच प्रसंग, जटायु उद्धार और शबरी की नवधा भक्ति।",
    keyTheme: "नवधा भक्ति, शरणागति व जटायु मोक्ष",
    icon: "🌿",
  },
  {
    id: "KISHKINDHA_KAAND",
    number: 4,
    nameSanskrit: "किष्किन्धाकाण्डम्",
    nameHindi: "किष्किन्धाकाण्ड",
    nameEnglish: "Kishkindha Kaand",
    significanceHindi: "ऋष्यमूक पर्वत पर राम-हनुमान मिलन, सुग्रीव मित्रता, बालि उद्धार और वानर सेना द्वारा सीता शोधन।",
    keyTheme: "सच्ची मित्रता, शरणागति व हनुमान कर्तव्यनिष्ठा",
    icon: "⛰️",
  },
  {
    id: "LANKA_KAAND",
    number: 6,
    nameSanskrit: "युद्धकाण्डम् (लंकाकाण्डम्)",
    nameHindi: "लंकाकाण्ड (युद्धकाण्ड)",
    nameEnglish: "Lanka Kaand (Yuddha Kaand)",
    significanceHindi: "राम सेतु निर्माण, अंगद संवाद, लक्ष्मण-मेघनाद युद्ध, संजीवनी बूटी, कुंभकर्ण-रावण वध व धर्म रथ उपदेश।",
    keyTheme: "धर्म की अधर्म पर विजय व धर्म-रथ उपदेश",
    icon: "⚔️",
  },
  {
    id: "UTTAR_KAAND",
    number: 7,
    nameSanskrit: "उत्तरकाण्डम्",
    nameHindi: "उत्तरकाण्ड",
    nameEnglish: "Uttar Kaand",
    significanceHindi: "श्री राम का राज्याभिषेक, राम राज्य की दिव्य महिमा, गरुड़-काकभुशुण्डि संवाद और कलिकाल में राम नाम प्रभाव।",
    keyTheme: "रामराज्य, ज्ञान-भक्ति समन्वय व कलि तारण नाम",
    icon: "👑",
  },
];

export const SUNDERKAND_RAMCHARITMANAS_DATA: SunderkandItem[] = [
  // 1. SUNDARKAND - Mangalacharan Shloka 1
  {
    id: "sk_mangal_shloka_1",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "श्लोक (Shloka)",
    verseNumberOrLabel: "सुन्दरकाण्ड मंगलाचरण • श्लोक १",
    titleHindi: "शान्तं शाश्वतमप्रमेयमनघं — निर्गुण-सगुण ब्रह्म वंदना",
    titleEnglish: "Peaceful, Eternal & Ineffable — Salutation to Lord Rama",
    sacredTextAwadhi: `शान्तं शाश्वतमप्रमेयमनघं निर्वाणशान्तिप्रदं
ब्रह्माशम्भुफणीन्द्रसेव्यमनिशं वेदान्तवेद्यं विभुम्।
योगाधीश्वरमाश्रितामरगणं भवाम्बुधिप्लवदं
वन्देऽहं करुणाकरं रघुवरं भूपालचूडामणिम्॥`,
    transliteration:
      "Shantam shashvatam-aprameyam-anagham nirvana-shanti-pradam / Brahma-shambhu-phanindra-sevyam-anisham vedanta-vedyam vibhum...",
    wordByWord: [
      { word: "शान्तम्", meaningHindi: "शांत स्वरूप", meaningEnglish: "Embodiment of absolute peace" },
      { word: "शाश्वतम्", meaningHindi: "सनातन, नित्य", meaningEnglish: "Eternal and imperishable" },
      { word: "अप्रमेयम्", meaningHindi: "प्रमाणों से परे", meaningEnglish: "Beyond mental comprehension" },
      { word: "अनघम्", meaningHindi: "पापरहित, परम पावन", meaningEnglish: "Sinless and purest" },
      { word: "निर्वाणशान्तिप्रदम्", meaningHindi: "मोक्ष व परम शांति देने वाले", meaningEnglish: "Bestower of liberation and peace" },
      { word: "रघुवरम्", meaningHindi: "रघुकुल शिरोमणि श्री राम", meaningEnglish: "Lord Rama, the jewel of Raghu dynasty" },
    ],
    bhawarthHindi:
      "जो शांत, सनातन, अप्रमेय (बुद्धि-प्रमाणों से परे), निष्पाप, मोक्ष रूपी परम शांति के दाता, ब्रह्मा, शिवजी और शेषनाग द्वारा निरंतर सेवित, वेदान्त द्वारा जानने योग्य, सर्वव्यापक, योगियों के स्वामी, शरणागत भक्तों को संसार-सागर पार कराने वाले नौका रूप और दया के सागर हैं—उन रघुकुल शिरोमणि भूपालचूड़ामणि श्री रामचन्द्र जी की मैं वंदना करता हूँ।",
    englishMeaning:
      "I bow to Lord Rama, the jewel among kings and supreme scion of Raghu's line, who is eternally tranquil, timeless, immaculate, bestower of ultimate liberation, ceaselessly adored by Brahma, Shiva, and Shesha, reachable through the wisdom of Vedanta, and the supreme ferry across the ocean of worldly existence.",
    spiritualGyan:
      "सुन्दरकाण्ड का प्रारम्भ ब्रह्म के निर्गुण एवं सगुण दोनों स्वरूपों के समन्वयात्मक ध्यान से होता है। जब हृदय में श्री राम के शांत व शाश्वत रूप का वास होता है, तभी संकटमोचन मार्ग प्रशस्त होता है।",
    practicalLifeApplication:
      "अशांत और कठिन परिस्थितियों में मन को शांत करने के लिए इस श्लोक का स्मरण करें। यह याद दिलाता है कि आत्मिक शांति किसी बाहरी वस्तु में नहीं, बल्कि परमात्मा के स्मरण में है।",
    deityFocus: "श्री राम-जानकी",
    tags: ["मंगलाचरण", "शान्ति", "ब्रह्म", "सुन्दरकाण्ड", "स्तोत्र"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical sacred artwork. Lord Rama standing in Brahmamuhurta meditation, glowing golden aura, divine bow Kodanda, cosmic mandala of Brahma and Shiva bowing in celestial reverence, ultra-detailed 8K Octane render, Sanskrit calligraphy glowing softly --ar 9:16 --v 6.1",
      textOverlay:
        "Devotional 9:16 portrait of Shri Ram with glowing golden halo. Center layout optimized for Devanagari typography: 'शान्तं शाश्वतमप्रमेयमनघं'. Deep royal obsidian and saffron background, photorealistic hyper-detail --ar 9:16",
      cleanArt:
        "Sacred Indian spiritual painting of Maryada Purushottam Rama standing on sacred lotus pedestal, cosmic blue skin, shimmering gold Pitambara, divine sunrise lighting, Ayodhya skyline backdrop --ar 9:16",
      videoPrompt:
        "Slow camera zoom in on Lord Rama's radiant face and glowing golden bow, celestial lotus petals floating downwards, holy light rays pulsating with cosmic Vedic chants, 4K 60fps spiritual cinema",
    },
    shortsScript60s: {
      hook: "क्या आप जानते हैं कि सुन्दरकाण्ड का पाठ शुरू करते ही जीवन के सभी संकट क्यों नष्ट हो जाते हैं?",
      scene1Visual: "9:16 vertical animation of Lord Rama's tranquil glowing form amidst cosmic stardust.",
      scene1Voiceover: "सुन्दरकाण्ड का पहला ही श्लोक है: 'शान्तं शाश्वतमप्रमेयमनघं...' जो मन की हर व्यग्रता को एक क्षण में शांत कर देता है।",
      scene2Visual: "Divine golden text revealing the meaning of eternal peace and supreme refuge.",
      scene2Voiceover: "जब जीवन में रास्ता न दिखे, तब रघुकुल शिरोमणि श्री राम का यह मंगलाचरण आपकी चेतना को निर्भय बना देता है।",
      scene3Visual: "Lord Hanuman bowing with folded hands before Lord Rama's lotus feet.",
      scene3Voiceover: "सुन्दरकाण्ड का एक श्लोक नित्य जपें, और अपने घर में सुख, शांति और सुरक्षा का अनुभव करें।",
      outroCallToAction: "जय श्री राम! सुन्दरकाण्ड के सम्पूर्ण मर्म हेतु Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Flute & Tanpura in Raag Yaman with deep Om reverberation",
      onScreenCaptions: ["शान्तं शाश्वतमप्रमेयमनघं", "सुन्दरकाण्ड मंगलाचरण", "संकट मोचन श्री राम"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — SUNDARKAND SACRED ARCHIVE",
      suggestedHashtags: ["#Sunderkand", "#ShriRam", "#IndianBhaktiDhara", "#BhaktiShorts", "#AyodhyaDham"],
    },
  },

  // 2. SUNDARKAND - Mangalacharan Shloka 3: Atulita Bala Dhaamam
  {
    id: "sk_atulita_bal_dhamam",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "श्लोक (Shloka)",
    verseNumberOrLabel: "सुन्दरकाण्ड मंगलाचरण • श्लोक ३",
    titleHindi: "अतुलितबलधामं हेमशैलाभदेहं — श्री हनुमान ध्यान श्लोक",
    titleEnglish: "Abode of Incomparable Strength — Hanuman Dhyana",
    sacredTextAwadhi: `अतुलितबलधामं हेमशैलाभदेहं
दनुजवनकृशानुं ज्ञानिनामग्रगण्यम्।
सकलगुणनिधानं वानराणामधीशं
रघुपतिप्रियभक्तं वातजातं नमामि॥`,
    transliteration:
      "Atulita-bala-dhamam hema-shailabha-deham / Danuja-vana-krishanum jnaninam-agraganyam / Sakala-guna-nidhanam vanaranam-adheesham / Raghupati-priya-bhaktam vata-jaatam namami...",
    wordByWord: [
      { word: "अतुलितबलधामम्", meaningHindi: "अतुलनीय बल के धाम (भण्डार)", meaningEnglish: "Abode of immeasurable strength" },
      { word: "हेमशैलाभदेहम्", meaningHindi: "स्वर्ण पर्वत (सुमेरु) सदृश कांतियुक्त शरीर", meaningEnglish: "Body shining like golden mountain Meru" },
      { word: "दनुजवनकृशानुम्", meaningHindi: "राक्षस रूपी वन को भस्म करने वाली अग्नि", meaningEnglish: "Consuming fire to demon forest" },
      { word: "ज्ञानिनामग्रगण्यम्", meaningHindi: "ज्ञानियों में सर्वश्रेष्ठ व अग्रणी", meaningEnglish: "Foremost among the wise" },
      { word: "सकलगुणनिधानम्", meaningHindi: "समस्त सद्गुणों के सागर", meaningEnglish: "Treasure-house of all virtues" },
      { word: "रघुपतिप्रियभक्तम्", meaningHindi: "श्री राम के परम प्रिय अनन्य भक्त", meaningEnglish: "Beloved devotee of Lord Rama" },
      { word: "वातजातम्", meaningHindi: "पवनपुत्र हनुमान जी", meaningEnglish: "Son of the Wind-God (Hanuman)" },
    ],
    bhawarthHindi:
      "अतुलनीय बल के धाम, स्वर्ण पर्वत (सुमेरु) के समान कांतियुक्त विशाल शरीर वाले, राक्षस रूपी वन को भस्म करने के लिए प्रज्वलित अग्नि स्वरूप, समस्त ज्ञानियों में अग्रगण्य, संपूर्ण सद्गुणों के निधान, वानरों के स्वामी और श्री रघुनाथ जी के परम प्रिय अनन्य भक्त पवनपुत्र श्री हनुमान जी को मैं शीश झुकाकर प्रणाम करता हूँ।",
    englishMeaning:
      "I bow to Lord Hanuman, the wind-born son and dearest devotee of Shri Rama, who is the inexhaustible abode of matchless strength, whose body gleams like a golden mountain, who is a consuming wildfire unto the forest of demons, foremost among the wise, and the ocean of every noble virtue.",
    spiritualGyan:
      "हनुमान जी के पास अतुलित बल होने पर भी उनका अहंकार शून्य है। वे अपने बल का उपयोग केवल 'राम काज' और धर्म की रक्षा में करते हैं। यही शक्ति और भक्ति का सर्वोत्तम सामंजस्य है।",
    practicalLifeApplication:
      "जब भी भय, दुर्बलता या निराशा घेरे, तब इस श्लोक का ग्यारह बार उच्चारण करें। यह आत्मबल, बुद्धि और आंतरिक साहस का असीम संचार करता है।",
    deityFocus: "श्री हनुमान जी",
    tags: ["हनुमान_ध्यान", "अतुलितबलधामं", "शक्ति", "सुन्दरकाण्ड", "संकटमोचन"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical masterpiece. Majestic Lord Hanuman standing in cosmic form atop Mount Mahendra, muscular golden radiant skin glowing like Mount Meru, fiery eyes of supreme devotion, saffron dhoti with golden borders, wielding Gada in one hand, mudra in other, lightning and storm clouds, 8K ultra-detailed photorealistic render --ar 9:16 --v 6.1",
      textOverlay:
        "Sacred vertical card of Panchamukhi / Veer Hanuman with golden glowing aura and floating Sanskrit shloka 'अतुलितबलधामं हेमशैलाभदेहं'. Glowing embers, saffron and volcanic obsidian background --ar 9:16",
      cleanArt:
        "Divine oil painting style of Mahaveer Hanuman looking toward Lanka with absolute resolve, golden morning sunlight reflecting on his chest showing Sita-Ram, dramatic rim lighting --ar 9:16",
      videoPrompt:
        "Dynamic camera upward tilt revealing the colossal, golden-mountain-like physique of Hanumanji, his saffron cape fluttering in cosmic wind, eyes shining with pure Rama bhakti, 4K spiritual cinematic",
    },
    shortsScript60s: {
      hook: "अगर जीवन में कभी खुद को कमजोर महसूस करो, तो बस यह एक मंत्र याद रखना!",
      scene1Visual: "Glorious 9:16 depiction of Hanumanji glowing like a golden mountain.",
      scene1Voiceover: "'अतुलितबलधामं हेमशैलाभदेहं...' जिनका बल असीम है और शरीर सुमेरु पर्वत जैसा चमकता है!",
      scene2Visual: "Hanumanji burning away fear, negative energies and doubts with divine saffron fire.",
      scene2Voiceover: "वे ज्ञानियों में सबसे आगे हैं और सभी गुणों के सागर हैं। श्री राम के परम प्रिय भक्त संकटमोचन हनुमान!",
      scene3Visual: "Hanumanji placing his blessing hand over the viewer's heart.",
      scene3Voiceover: "कमेंट में 'जय बजरंगबली' लिखें और अपने सभी संकटों से मुक्ति का आशीर्वाद पाएं।",
      outroCallToAction: "हनुमान कृपा हेतु Indian Bhakti Dhara को अभी Subscribe व Like करें।",
      audioTrackRecommendation: "Thunderous Shankha Naad followed by powerful Hanuman Chalisa Dhun",
      onScreenCaptions: ["अतुलितबलधामं हेमशैलाभदेहं", "संकटमोचन महाबली हनुमान", "जय बजरंगबली"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — VEER HANUMAN SANCTUM",
      suggestedHashtags: ["#HanumanJi", "#Sunderkand", "#Bajrangbali", "#IndianBhaktiDhara", "#Mahaveer"],
    },
  },

  // 3. SUNDARKAND - Ocean Leap & No Rest until Rama's Work
  {
    id: "sk_ram_kaju_bina_vishram",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "चौपाई (Chaupai)",
    verseNumberOrLabel: "सुन्दरकाण्ड • चौपाई (दोहा १ के बाद)",
    titleHindi: "राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम — निष्काम कर्तव्यनिष्ठा",
    titleEnglish: "No Rest Until Lord Rama's Sacred Task is Accomplished",
    sacredTextAwadhi: `हनूमान तेहि परसा कर पुनि कीन्ह प्रनाम।
राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम॥
जात पवनसुत देवन्ह देखा। जानैं कहुँ बल बुद्धि बिसेषा॥
सुरसा नाम अहिन कै माता। पठइन्हि आइ कही तेहिं बाता॥`,
    transliteration:
      "Hanumana tehi parasa kara puni keenha pranama / Rama kaaju keenhe binu mohi kahan bishrama / Jaata pavan-suta devanha dekha / Jaanain kahun bala buddhi bisesha...",
    wordByWord: [
      { word: "तेहि परसा", meaningHindi: "मैनाक पर्वत को हाथ से स्पर्श किया", meaningEnglish: "Touched Mount Mainaka with his hand" },
      { word: "पुनि कीन्ह प्रनाम", meaningHindi: "फिर उसे सादर प्रणाम किया", meaningEnglish: "And bowed with deep reverence" },
      { word: "राम काजु कीन्हें बिनु", meaningHindi: "श्री राम का कार्य संपन्न किए बिना", meaningEnglish: "Without accomplishing Lord Rama's task" },
      { word: "मोहि कहाँ बिश्राम", meaningHindi: "मुझे विश्राम कहाँ मिल सकता है", meaningEnglish: "Where is there any rest for me" },
      { word: "बल बुद्धि बिसेषा", meaningHindi: "अतुलनीय बल और विशेष बुद्धि", meaningEnglish: "Extraordinary strength and discernment" },
    ],
    bhawarthHindi:
      "जब समुद्र से उठकर मैनाक पर्वत ने हनुमान जी से विश्राम करने का आग्रह किया, तब हनुमान जी ने उसे हाथ से केवल आदरपूर्वक स्पर्श किया और प्रणाम करके कहा: 'श्री राम जी का कार्य पूरा किए बिना मुझे विश्राम कहाँ मिल सकता है!' इसके बाद देवताओं ने पवनपुत्र के बल और बुद्धि की परीक्षा के लिए सुरसा को भेजा।",
    englishMeaning:
      "When Mount Mainaka offered a resting place during the colossal ocean leap, Hanuman gently touched the peak with respect, bowed reverently, and declared: 'Without completing Lord Rama's mission, how can I take any rest?' Thus he demonstrated supreme dedication that bypasses all worldly comforts.",
    spiritualGyan:
      "मैनाक पर्वत सांसारिक सुख-सुविधाओं और विश्राम का प्रतीक है। जीवन के महान लक्ष्य की प्राप्ति में सुख और आलस्य सबसे बड़े अवरोधक होते हैं। हनुमान जी सिखाते हैं कि लक्ष्य तक पहुँचने से पहले रुकना नहीं है।",
    practicalLifeApplication:
      "अपने लक्ष्य और कर्तव्यों के प्रति 100% एकाग्र रहें। रास्ते में आने वाले प्रलोभनों और विश्राम की चाहत को मर्यादापूर्वक अस्वीकार कर अपने कर्तव्य पथ पर आगे बढ़ें।",
    deityFocus: "श्री हनुमान जी",
    tags: ["राम_काज", "कर्तव्य", "एकाग्रता", "सुन्दरकाण्ड", "मैनाक"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical action illustration. Lord Hanuman flying majestically across the roaring stormy ocean under moonlight, touching golden Mount Mainaka rising from water with one finger in gentle respect, golden light streaming from his heart, 8K hyper-detailed digital art --ar 9:16 --v 6.1",
      textOverlay:
        "Hanuman soaring above ocean waves in 9:16 vertical framing. Golden Devanagari calligraphy: 'राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम'. Midnight blue and radiant amber lightning backdrop --ar 9:16",
      cleanArt:
        "Sacred Indian graphic art of Veer Hanuman leaping over turbulent oceanic waves, wind blowing through his saffron garments, divine determination in his luminous eyes --ar 9:16",
      videoPrompt:
        "High-speed cinematic camera tracking alongside Hanuman as he streaks across the midnight sky, roaring ocean waves crashing below, leaving a trail of sparkling golden stardust, 4K 60fps",
    },
    shortsScript60s: {
      hook: "सफलता का सबसे बड़ा गुप्त नियम क्या है? हनुमान जी का यह एक वाक्य याद रखना!",
      scene1Visual: "Hanuman flying over the ocean, rejecting the comfort of Mount Mainaka.",
      scene1Voiceover: "जब मैनाक पर्वत ने हनुमान जी से कहा कि थोड़ा आराम कर लो, तो महावीर ने क्या उत्तर दिया?",
      scene2Visual: "Golden letters shining: 'राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम॥'",
      scene2Voiceover: "'श्री राम का काम किए बिना मुझे विश्राम कहाँ!' वे एक पल भी नहीं रुके और आगे बढ़ गए।",
      scene3Visual: "A victorious Hanuman reaching Lanka through sheer discipline and willpower.",
      scene3Voiceover: "अगर जीवन में बड़ा मुकाम पाना है, तो लक्ष्य पूरा होने तक आलस्य और बहानेबाजी को अलविदा कह दो!",
      outroCallToAction: "ऐसी ही प्रेरणादायक सीख के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Fast-paced energetic Indian war drum and Sitar fusion",
      onScreenCaptions: ["राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम", "सफलता का गुप्त नियम", "हनुमान कर्तव्यनिष्ठा"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — KARMA YOGA ARCHIVE",
      suggestedHashtags: ["#Motivation", "#Sunderkand", "#HanumanQuotes", "#IndianBhaktiDhara", "#SuccessFormula"],
    },
  },

  // 4. SUNDARKAND - Lanka Entry: Prabishe Nagar Keeje Sab Kaaja
  {
    id: "sk_prabisi_nagar_keeje",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "दोहा (Doha)",
    verseNumberOrLabel: "सुन्दरकाण्ड • दोहा ५",
    titleHindi: "प्रबिसि नगर कीजे सब काजा — लंकिनी पराभव व विजय महामंत्र",
    titleEnglish: "Enter the City with Lord Rama in Your Heart — The Ultimate Shield",
    sacredTextAwadhi: `प्रबिसि नगर कीजे सब काजा। हृदयं राखि कोसलपुर राजा॥
गरल सुधारिपु करहिं मिताई। गोपद सिंधु अनल सितलाई॥
गरुड़ सुमेरु रेनू सम ताही। राम कृपा करि चितवा जाही॥
अति लघु रूप धरेउ हनुमाना। पैठा नगर सुमिरि भगवाना॥`,
    transliteration:
      "Prabisi nagara keeje saba kaaja / Hridayam raakhi kosalapura raaja / Garala sudha ripu karahin mitaai / Gopada sindhu anala sitalaai...",
    wordByWord: [
      { word: "प्रबिसि नगर", meaningHindi: "नगर में प्रवेश करके", meaningEnglish: "Enter the city or workspace" },
      { word: "कीजे सब काजा", meaningHindi: "अपने समस्त कार्यों को सिद्ध करो", meaningEnglish: "Accomplish all your works" },
      { word: "हृदयं राखि", meaningHindi: "हृदय में धारण करके", meaningEnglish: "Keeping enshrined in your heart" },
      { word: "कोसलपुर राजा", meaningHindi: "अयोध्यापति श्री राम को", meaningEnglish: "Lord Rama, King of Kosala" },
      { word: "गरल सुधा", meaningHindi: "विष भी अमृत बन जाता है", meaningEnglish: "Poison turns into nectar" },
      { word: "रिपु करहिं मिताई", meaningHindi: "शत्रु भी मित्र बन जाते हैं", meaningEnglish: "Enemies become friends" },
      { word: "गोपद सिंधु", meaningHindi: "विशाल समुद्र गाय के खुर बराबर हो जाता है", meaningEnglish: "The vast ocean becomes small as a cow's hoofprint" },
      { word: "अनल सितलाई", meaningHindi: "अग्नि शीतल बन जाती है", meaningEnglish: "Fire becomes cooling soothing breeze" },
    ],
    bhawarthHindi:
      "अयोध्या नरेश श्री रामचन्द्र जी को अपने हृदय में धारण करके नगर में प्रवेश करो और अपने समस्त कार्य सिद्ध करो। जिसके ऊपर श्री राम जी की कृपा दृष्टि हो जाती है, उसके लिए विष अमृत हो जाता है, शत्रु मित्र बन जाते हैं, अथाह समुद्र गाय के खुर के समान छोटा हो जाता है और अग्नि भी शीतल हो जाती है! यह सुनकर हनुमान जी ने अत्यंत सूक्ष्म रूप धरा और प्रभु का स्मरण करते हुए लंका में प्रवेश किया।",
    englishMeaning:
      "Enter the fortress and accomplish every deed, keeping the King of Ayodhya enshrined within your heart. For one upon whom Lord Rama casts His compassionate grace, poison transforms into nectar, foes turn into loving friends, the vast ocean shrinks to the size of a heifer's hoofprint, and blazing fire turns cool and comforting.",
    spiritualGyan:
      "यह सुन्दरकाण्ड का सबसे फलदायी रक्षा-मंत्र और कार्य-सिद्धि मंत्र है। किसी भी नए उद्यम, साक्षात्कार, यात्रा या संकट के समय जब हम प्रभु को हृदय में रखकर कदम बढ़ाते हैं, तो सारी प्रतिकूलताएं अनुकूलता में बदल जाती हैं।",
    practicalLifeApplication:
      "घर से निकलते समय, नए काम की शुरुआत में या किसी कठिन परीक्षा/मीटिंग से पूर्व इस दोहे का तीन बार पाठ करें। यह आत्मविश्वास और ईश्वरीय सुरक्षा का अचूक कवच है।",
    deityFocus: "श्री हनुमान जी",
    tags: ["कार्य_सिद्धि", "सुरक्षा_मंत्र", "प्रबिसि_नगर", "सुन्दरकाण्ड", "राम_कृपा"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical composition. Miniature Lord Hanuman as a glowing golden spark entering the colossal golden gates of ancient Lanka at night, majestic architecture, Lord Rama's radiant face appearing faintly in the starry heavens blessing him, 8K hyper-detailed rendering --ar 9:16 --v 6.1",
      textOverlay:
        "Divine 9:16 vertical card with glowing golden Devanagari text: 'प्रबिसि नगर कीजे सब काजा। हृदयं राखि कोसलपुर राजा॥'. Royal obsidian and temple saffron aura with protective yantra rings --ar 9:16",
      cleanArt:
        "Sacred Indian temple style painting of Lanka gateway guarded by golden statues, Hanuman in subtle mosquito-sized golden glow passing effortlessly, spiritual illumination --ar 9:16",
      videoPrompt:
        "Slow atmospheric panning over the towering dark fortress of Lanka, revealing a soft golden orb of Hanumanji floating inside safely, sacred Sanskrit chanting echo in the background, 4K 60fps",
    },
    shortsScript60s: {
      hook: "घर से निकलते समय अगर सिर्फ यह एक चौपाई पढ़ लो, तो दुनिया की कोई ताकत आपको हरा नहीं सकती!",
      scene1Visual: "Golden gates opening with divine sunlight piercing through darkness.",
      scene1Voiceover: "गोस्वामी तुलसीदास जी लिखते हैं: 'प्रबिसि नगर कीजे सब काजा। हृदयं राखि कोसलपुर राजा॥'",
      scene2Visual: "Water turns into nectar, fire becomes cool lotus petals under Rama's grace.",
      scene2Voiceover: "जिसके दिल में श्री राम हैं, उसके लिए जहर भी अमृत बन जाता है और दुश्मन भी दोस्त बन जाते हैं।",
      scene3Visual: "Hanumanji standing tall and victorious in the heart of Lanka.",
      scene3Voiceover: "कल सुबह घर से निकलने से पहले इसे 3 बार बोलें और चमत्कार खुद देखें!",
      outroCallToAction: "दैनिक भक्ति एवं मंगलमय जीवन के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Sacred Temple Bells & Veena melody in Raag Bhairav",
      onScreenCaptions: ["प्रबिसि नगर कीजे सब काजा", "कार्य-सिद्धि महामंत्र", "श्री राम रक्षा कवच"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — KARYA SIDDHI ARCHIVE",
      suggestedHashtags: ["#Sunderkand", "#HanumanChaupai", "#KaryaSiddhi", "#IndianBhaktiDhara", "#DailyMantra"],
    },
  },

  // 5. SUNDARKAND - Meeting Vibhishana: Harigun Gaan & Satsang
  {
    id: "sk_vibhishan_milap",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "चौपाई (Chaupai)",
    verseNumberOrLabel: "सुन्दरकाण्ड • चौपाई (दोहा ६ के बाद)",
    titleHindi: "रामायुध अंकित गृह सोभा — विभीषण मिलन व संत समागम",
    titleEnglish: "Meeting Vibhishana — Divine Temple in the Heart of Lanka",
    sacredTextAwadhi: `रामायुध अंकित गृह सोभा बरनि न जाइ।
नव तुलसिका बृंद तहँ देखि हरषि कपिराइ॥
लंका निसिचर निकर निवासा। इहाँ कहाँ सज्जन कर बासा॥
मन महुँ तरक करैं कपि लागा। तेही समय बिभीषनु जागा॥
राम राम तेहिं सुमिरन कीन्हा। हृदयँ हरष कपि सज्जन चीन्हा॥`,
    transliteration:
      "Ramaayudha ankita griha sobha barani na jaai / Nava tulasika brunda tahan dekhi harashi kapiraai / Lanka nisichara nikara nivaasa / Ihan kahan sajjana kara baasa...",
    wordByWord: [
      { word: "रामायुध अंकित", meaningHindi: "श्री राम के धनुष-बाण के चिन्हों से अंकित", meaningEnglish: "Inscribed with Lord Rama's bow and arrow emblems" },
      { word: "नव तुलसिका बृंद", meaningHindi: "नवीन तुलसी के पवित्र पौधे", meaningEnglish: "Cluster of fresh sacred Tulsi plants" },
      { word: "हरषि कपिराइ", meaningHindi: "हनुमान जी अत्यंत हर्षित हुए", meaningEnglish: "Hanuman rejoiced with profound delight" },
      { word: "राम राम सुमिरन कीन्हा", meaningHindi: "उठते ही 'राम-राम' का स्मरण किया", meaningEnglish: "Awakened chanting 'Rama, Rama'" },
      { word: "सज्जन चीन्हा", meaningHindi: "पहचान लिया कि यह कोई हरि-भक्त है", meaningEnglish: "Recognized that here lives a true devotee of God" },
    ],
    bhawarthHindi:
      "उस महल पर श्री राम जी के धनुष-बाण के पवित्र चिन्ह अंकित थे, जिसकी शोभा अवर्णनीय थी। वहाँ तुलसी के सुंदर नए पौधों को देखकर कपिराज हनुमान जी अत्यंत हर्षित हुए। हनुमान जी सोचने लगे कि इस राक्षसों की लंका में सज्जन कहाँ से आ गया? उसी समय विभीषण जी की आँख खुली और उन्होंने उठते ही 'राम-राम' का पावन स्मरण किया। यह सुनकर हनुमान जी ने जान लिया कि यह कोई परम भक्त है।",
    englishMeaning:
      "Hanuman saw a radiant mansion marked with the sacred insignia of Rama's bow and arrow, surrounded by lush, sacred Tulsi plants. Pondering how a noble saint could reside amidst demons, he suddenly heard Vibhishana wake with the holy utterance of 'Rama, Rama!' Overjoyed, Hanuman instantly recognized a fellow devotee of the Supreme Lord.",
    spiritualGyan:
      "सच्चा भक्त किसी भी प्रतिकूल वातावरण (लंका रूपी संसार) में रहकर भी अपनी पवित्रता और निष्ठा बनाए रख सकता है। जैसे कीचड़ में कमल खिलता है, वैसे ही कुसंग के बीच भी 'राम नाम' का आश्रय लेने वाला जीव सुरक्षित रहता है।",
    practicalLifeApplication:
      "प्रातःकाल जागते ही सबसे पहले परमात्मा के पावन नाम का स्मरण करें। यह पूरे दिन के विचारों को सकारात्मक और आत्मिक ऊर्जा से परिपूर्ण रखता है।",
    deityFocus: "विभीषण जी",
    tags: ["विभीषण", "तुलसी_महिमा", "राम_नाम", "सुन्दरकाण्ड", "सत्संग"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical sacred scene. Vibhishana's serene white marble palace in Lanka illuminated by moonlight, Tulsi plants glowing with celestial green aura, golden bow-and-arrow engravings on walls, Hanuman disguised as a Brahmin smiling with joy, 8K ultra-realistic digital art --ar 9:16 --v 6.1",
      textOverlay:
        "Devotional vertical card capturing the divine dawn in Lanka. Glowing Devanagari text: 'राम राम तेहिं सुमिरन कीन्हा। हृदयँ हरष कपि सज्जन चीन्हा॥'. Emerald and chandan gold background --ar 9:16",
      cleanArt:
        "Traditional Indian temple artwork of Vibhishana folding hands in prayer before a Rama altar inside Lanka, peaceful morning light streaming through ornate jharokhas --ar 9:16",
      videoPrompt:
        "Smooth tracking shot revealing the sacred Tulsi grove within dark Lanka, soft whisper of 'Ram Ram' echoing gently, camera tilting up to Hanuman's joyful smile, 4K spiritual cinematic",
    },
    shortsScript60s: {
      hook: "क्या आप जानते हैं कि राक्षसों की लंका में तुलसी का पौधा और राम नाम किसने बसाया था?",
      scene1Visual: "Dark menacing Lanka palace with one serene house glowing with Tulsi leaves.",
      scene1Voiceover: "हनुमान जी जब लंका में घूम रहे थे, तो उन्हें एक ऐसा महल दिखा जिस पर श्री राम के धनुष-बाण बने थे!",
      scene2Visual: "Vibhishana waking up and folding his hands, saying 'Ram Ram'.",
      scene2Voiceover: "वहाँ तुलसी का पौधा था और सुबह उठते ही विभीषण जी ने कहा: 'राम राम!'",
      scene3Visual: "Hanuman and Vibhishana embracing in tears of spiritual joy.",
      scene3Voiceover: "तुलसीदास जी कहते हैं कि माहौल कैसा भी हो, जो प्रभु का नाम लेता है, वह हर संकट में सुरक्षित रहता है।",
      outroCallToAction: "राम नाम की शक्ति जानने के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Soft Santur and Morning Sitar rhapsody",
      onScreenCaptions: ["लंका में राम भक्त", "विभीषण की राम भक्ति", "तुलसी महिमा"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — SATSANG & BHAKTI ARCHIVE",
      suggestedHashtags: ["#Vibhishan", "#Sunderkand", "#RamCharitmanas", "#IndianBhaktiDhara", "#TulsiJi"],
    },
  },

  // 6. SUNDARKAND - Lanka Dahan: The Fiery Roar of Rudra
  {
    id: "sk_lanka_dahan",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "चौपाई (Chaupai)",
    verseNumberOrLabel: "सुन्दरकाण्ड • चौपाई (दोहा २५ के बाद)",
    titleHindi: "हरि प्रेरित तेहि अवसर चले मारुत उनचास — लंका दहन",
    titleEnglish: "The 49 Cosmic Winds of Marut — The Burning of Golden Lanka",
    sacredTextAwadhi: `हरि प्रेरित तेहि अवसर चले मारुत उनचास।
अट्टहास करि गर्जा कपि बढ़ि लाग अकास॥
देह बिसाल परम हरुआआई। मंदिर तें मंदिर चढ़ि धाई॥
जरइ नगर भा लोग बिहाला। झपट लपट बहु कोटि कराला॥
तात मातु हा सुनिय पुकारा। एहि अवसर को हमहि उबारा॥`,
    transliteration:
      "Hari prerita tehi avasara chale maaruta unachaas / Attahaasa kari garja kapi badhi laaga akaas / Deha bisaala parama haruaai / Mandira ten mandira charhi dhaai...",
    wordByWord: [
      { word: "हरि प्रेरित", meaningHindi: "श्री हरि की प्रेरणा से", meaningEnglish: "Inspired by the Supreme Lord" },
      { word: "मारुत उनचास", meaningHindi: "उनचासों पवन देवता प्रचंड वेग से बहने लगे", meaningEnglish: "All 49 winds blew with fierce cosmic velocity" },
      { word: "अट्टहास करि गर्जा", meaningHindi: "महावीर ने प्रचंड अट्टहास कर गर्जना की", meaningEnglish: "Hanuman let out a thunderous cosmic roar" },
      { word: "बढ़ि लाग अकास", meaningHindi: "आकाश तक विशाल रूप धारण कर लिया", meaningEnglish: "Expanded his form to touch the sky" },
      { word: "देह बिसाल परम हरुआआई", meaningHindi: "शरीर विशाल था परंतु अत्यंत हल्का व फुर्तीला", meaningEnglish: "Colossal in size yet extremely agile and light" },
      { word: "जरइ नगर भा लोग बिहाला", meaningHindi: "पूरी स्वर्ण लंका जलने लगी और राक्षस व्याकुल हो गए", meaningEnglish: "The golden city burned and the demons were bewildered" },
    ],
    bhawarthHindi:
      "भगवान की प्रेरणा से उसी समय उनचासों पवन प्रचंड वेग से चलने लगे। हनुमान जी ने भीषण अट्टहास करके आकाश तक अपना आकार बढ़ा लिया। उनका शरीर यद्यपि अत्यंत विशाल था, पर वे अत्यंत फुर्तीले होकर एक महल से दूसरे महल पर कूदने लगे। सोने की लंका धू-धू कर जलने लगी, भीषण लपटें उठने लगीं और अहंकारी राक्षस हाहाकार करने लगे।",
    englishMeaning:
      "By the divine will of Lord Hari, the forty-nine cosmic winds began to roar furiously. Hanuman laughed with thunderous resonance and expanded his celestial stature to the skies. With extraordinary agility despite his massive form, he leaped from palace to palace, reducing the ego-filled golden metropolis of Lanka into blazing ashes.",
    spiritualGyan:
      "लंका दहन केवल एक नगर का जलना नहीं है, बल्कि यह काम, क्रोध, मद और अहंकार रूपी दुर्गुणों का ज्ञान एवं भक्ति की अग्नि द्वारा भस्म होना है। केवल विभीषण का घर सुरक्षित रहा क्योंकि वहाँ 'राम नाम' था।",
    practicalLifeApplication:
      "अहंकार और बुरी आदतों को अपने भीतर से जलाकर भस्म कर दें। जो व्यक्ति परमात्मा के प्रति समर्पित रहता है, वह जीवन के किसी भी भीषण संकट में विभीषण के भवन की तरह सुरक्षित रहता है।",
    deityFocus: "श्री हनुमान जी",
    tags: ["लंका_दहन", "रुद्र_तेज", "अहंकार_नाश", "सुन्दरकाण्ड", "वीर_हनुमान"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical epic scene. Colossal Lord Hanuman standing atop the highest golden dome of burning Lanka, holding his blazing tail as a torch of cosmic justice, glowing ruby flames and golden embers filling the night sky, dramatic cinematic lighting, 8K Octane render --ar 9:16 --v 6.1",
      textOverlay:
        "Dynamic 9:16 vertical card with blazing ruby red and molten gold typography: 'हरि प्रेरित तेहि अवसर चले मारुत उनचास'. Fiery embers, glowing yantra border --ar 9:16",
      cleanArt:
        "Sacred Indian graphic art of Veer Hanuman in gigantic form leaping between golden palaces, fire illuminating the night sky, supreme divine warrior expression --ar 9:16",
      videoPrompt:
        "Dramatic slow camera circle around Hanumanji standing on a golden spire with tail blazing, fire lighting his muscular golden body, wind howling, 4K 60fps epic cinematic",
    },
    shortsScript60s: {
      hook: "सोने की लंका में सब कुछ जल गया, लेकिन विभीषण का घर क्यों नहीं जला?",
      scene1Visual: "Golden palaces of Lanka engulfed in roaring divine flames.",
      scene1Voiceover: "जब रावण ने हनुमान जी की पूंछ में आग लगाई, तो 49 पवन देवता प्रचंड वेग से चलने लगे!",
      scene2Visual: "Hanuman leaping across palaces, turning Lanka into ashes with his flaming tail.",
      scene2Voiceover: "हनुमान जी ने पूरी लंका को भस्म कर दिया, पर विभीषण के घर की एक ईंट भी नहीं जली!",
      scene3Visual: "Vibhishana's house glowing safe with Rama's holy name on the door.",
      scene3Voiceover: "क्योंकि जहाँ राम का नाम होता है, वहाँ काल की अग्नि भी शीतल हो जाती है!",
      outroCallToAction: "ऐसी ही रहस्यमयी कथाओं के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "High-intensity Rudra Tandav drums and blazing brass horns",
      onScreenCaptions: ["लंका दहन का रहस्य", "अहंकार का विनाश", "राम नाम का सुरक्षा कवच"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — RUDRA TEJ ARCHIVE",
      suggestedHashtags: ["#LankaDahan", "#Sunderkand", "#VeerHanuman", "#IndianBhaktiDhara", "#BhaktiReels"],
    },
  },

  // 7. SUNDARKAND - Samudra Vinay: Bhaya Binu Hoi Na Preeti
  {
    id: "sk_samudra_vinay",
    kaand: "SUNDARKAND",
    section: "SUNDARKAND",
    verseType: "दोहा (Doha)",
    verseNumberOrLabel: "सुन्दरकाण्ड • दोहा ५८ (समापन)",
    titleHindi: "भय बिनु होइ न प्रीति — मर्यादा और सामर्थ्य का संतुलन",
    titleEnglish: "Without Justified Strength There is No Righteous Balance",
    sacredTextAwadhi: `बिनय न मानत जलधि जड़ गए तीन दिन बीति।
बोले राम सकोप तब भय बिनु होइ न प्रीति॥
लछिमन बान सरासन आनू। सोषौं बारिधि बिसिख कृसानू॥
सठ सन बिनय कुटिल सन प्रीती। सहज कृपन सन सुंदर नीती॥`,
    transliteration:
      "Binaya na maanata jaladhi jada gaye teena dina beeti / Bole Rama sakopa taba bhaya binu hoi na preeti / Lachhimana baana saraasana aanoo / Soshon baaridhi bisikha krisanoo...",
    wordByWord: [
      { word: "बिनय न मानत", meaningHindi: "प्रार्थना और विनय नहीं स्वीकार करता", meaningEnglish: "Does not pay heed to polite requests" },
      { word: "जलधि जड़", meaningHindi: "यह जड़ स्वभाव वाला समुद्र", meaningEnglish: "This obstinate, inert ocean" },
      { word: "तीन दिन बीति", meaningHindi: "प्रार्थना करते हुए तीन दिन बीत गए", meaningEnglish: "Three days have elapsed in patient waiting" },
      { word: "भय बिनु होइ न प्रीति", meaningHindi: "बिना सामर्थ्य व भय के दुष्टों से प्रीति/मर्यादा नहीं होती", meaningEnglish: "Without firmness and rightful power, true respect is not established" },
      { word: "सोषौं बारिधि", meaningHindi: "मैं इस समुद्र को सुखा दूंगा", meaningEnglish: "I shall dry up this ocean with my fiery arrow" },
    ],
    bhawarthHindi:
      "तीन दिन बीत गए, किंतु जड़ समुद्र ने श्री राम की प्रार्थना पर कोई ध्यान नहीं दिया। तब श्री राम जी ने क्रोधयुक्त होकर कहा: 'बिना भय के प्रीति और मर्यादा स्थापित नहीं होती! हे लक्ष्मण! धनुष और बाण लाओ, मैं अपनी अग्निबाण से इस समुद्र को सुखा दूंगा।' दुष्ट से विनय, कुटिल से प्रेम और कंजूस से सुंदर नीति की बात करना व्यर्थ है।",
    englishMeaning:
      "Three full days elapsed while the Lord patiently petitioned the ocean, yet the inert sea remained heedless. Then Lord Rama proclaimed: 'Without demonstrated power and rightful awe, true discipline is never awakened. Lakshmana, fetch my divine bow and fire-arrow; I shall dry up this ocean in an instant!'",
    spiritualGyan:
      "मर्यादा पुरुषोत्तम श्री राम धैर्य और क्षमा के सागर हैं, परंतु जब धैर्य को कमजोरी समझ लिया जाए, तब धर्म और न्याय की स्थापना के लिए सामर्थ्य का प्रदर्शन अनिवार्य हो जाता है।",
    practicalLifeApplication:
      "जीवन में पहले सदैव विनम्रता, संवाद और धैर्य अपनाएं। किंतु यदि सामने वाला विनम्रता का दुरुपयोग करे, तो अपनी शक्ति और सिद्धांतों पर दृढ़ रहकर निर्णय लें।",
    deityFocus: "श्री राम-जानकी",
    tags: ["सामर्थ्य", "मर्यादा", "भय_बिनु_होइ_न_प्रीति", "सुन्दरकाण्ड", "धनुर्धारी_राम"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical high-contrast scene. Lord Rama standing majestically on the ocean shore at twilight, stringing his celestial golden bow Kodanda with fiery divine arrow Brahmastra, turbulent ocean waves parting in terror, crimson sky with lightning, 8K ultra-detailed photorealistic render --ar 9:16 --v 6.1",
      textOverlay:
        "Dramatic 9:16 vertical card with glowing golden Sanskrit calligraphy: 'बोले राम सकोप तब भय बिनु होइ न प्रीति॥'. Ocean spray and golden lightning border --ar 9:16",
      cleanArt:
        "Sacred Indian epic painting of Shri Ram in supreme warrior form on the sea coast of Rameswaram, Lakshmana standing beside with quivers, glowing divine aura --ar 9:16",
      videoPrompt:
        "Dramatic lightning strike illuminating Lord Rama pulling the bowstring back, sea creatures and waves trembling in awe, glowing golden eyes of Maryada Purushottam, 4K 60fps",
    },
    shortsScript60s: {
      hook: "भगवान राम ने तीन दिन तक समुद्र से हाथ जोड़े, फिर ऐसा क्या हुआ कि धनुष उठाना पड़ा?",
      scene1Visual: "Lord Rama sitting in deep meditation on the seashore, ocean roaring indifferent.",
      scene1Voiceover: "श्री राम तीन दिन तक समुद्र से रास्ता मांगते रहे, लेकिन जड़ समुद्र ने कोई उत्तर नहीं दिया।",
      scene2Visual: "Rama standing up in divine fury, stringing his flaming celestial bow.",
      scene2Voiceover: "तब प्रभु ने कहा: 'भय बिनु होइ न प्रीति!' हे लक्ष्मण, धनुष लाओ, मैं इसे सुखा दूंगा!",
      scene3Visual: "Ocean God emerging with folded hands and gems to surrender.",
      scene3Voiceover: "धैर्य रखिए, पर अपनी शक्ति और स्वाभिमान को कभी मत भूलिए!",
      outroCallToAction: "धर्म और मर्यादा के गूढ़ मर्म हेतु Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Thunderous oceanic sound with epic orchestral brass crescendo",
      onScreenCaptions: ["भय बिनु होइ न प्रीति", "श्री राम का विराट रूप", "धैर्य और सामर्थ्य"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — MARYADA PURUSHOTTAM ARCHIVE",
      suggestedHashtags: ["#ShriRam", "#Sunderkand", "#RamCharitmanas", "#IndianBhaktiDhara", "#SpiritualQuotes"],
    },
  },

  // 8. BAL KAAND - Mangalacharan: Varnaanaam Artha Sanghaanaam
  {
    id: "bk_mangal_shloka_1",
    kaand: "BAL_KAAND",
    section: "BAL_KAAND",
    verseType: "श्लोक (Shloka)",
    verseNumberOrLabel: "बालकाण्ड मंगलाचरण • श्लोक १",
    titleHindi: "वर्णानामर्थसंघानां रसानां छन्दसामपि — वाणी व बुद्धि वंदना",
    titleEnglish: "Source of Words, Meanings, Sentiments & Meters — Saraswati & Ganesha",
    sacredTextAwadhi: `वर्णानामर्थसंघानां रसानां छन्दसामपि।
मङ्गलानां च कर्त्तारौ वन्दे वाणीविनायकौ॥
भवानीशङ्करौ वन्दे श्रद्धाविश्वासरूपिणौ।
याभ्यां विना न पश्यन्ति सिद्धाः स्वान्तःस्थमीश्वरम्॥`,
    transliteration:
      "Varnaanaam-artha-sanghaanaam rasaanaam chhandasaam-api / Mangalaanaam cha karttarau vande vaanee-vinaayakau / Bhavaanee-shankarau vande shraddha-vishvaasa-roopinau...",
    wordByWord: [
      { word: "वर्णानाम्", meaningHindi: "अक्षरों के", meaningEnglish: "Of sacred alphabets and letters" },
      { word: "अर्थसंघानाम्", meaningHindi: "अर्थ समूहों के", meaningEnglish: "Of word meanings and expressions" },
      { word: "रसानाम्", meaningHindi: "काव्य रसों के", meaningEnglish: "Of aesthetic spiritual emotions (Rasa)" },
      { word: "छन्दसामपि", meaningHindi: "छन्दों के भी", meaningEnglish: "And of sacred poetic meters" },
      { word: "मङ्गलानां कर्त्तारौ", meaningHindi: "कल्याण करने वाले", meaningEnglish: "The creators of auspiciousness" },
      { word: "वाणीविनायकौ", meaningHindi: "माँ सरस्वती और भगवान श्री गणेश", meaningEnglish: "Goddess Saraswati and Lord Ganesha" },
      { word: "श्रद्धाविश्वासरूपिणौ", meaningHindi: "श्रद्धा (पार्वती) और विश्वास (शिव)", meaningEnglish: "Faith (Parvati) and Trust (Shiva)" },
    ],
    bhawarthHindi:
      "अक्षरों, अर्थ-समूहों, रसों, छन्दों और समस्त मंगलों को करने वाली माँ सरस्वती और विघ्नहर्ता भगवान श्री गणेश जी की मैं वंदना करता हूँ। श्रद्धा रूपी माँ पार्वती और विश्वास रूपी भगवान शिवशंकर की मैं वंदना करता हूँ, जिनके बिना सिद्ध जन भी अपने अन्तःकरण में स्थित ईश्वर को नहीं देख पाते।",
    englishMeaning:
      "I bow to Goddess Saraswati and Lord Ganesha, the primordial originators of letters, meanings, poetic rasas, sacred meters, and all auspicious blessings. I bow to Mother Parvati and Lord Shiva, the living embodiments of reverent Faith and unshakeable Trust, without whom even enlightened sages cannot behold the Indwelling Lord within their hearts.",
    spiritualGyan:
      "रामचरितमानस का महा-प्रवेश द्वार श्रद्धा और विश्वास है। माँ पार्वती 'श्रद्धा' हैं और भगवान शिव 'विश्वास' हैं। जब तक साधक के भीतर ये दोनों संयुक्त नहीं होते, तब तक आत्म-साक्षात्कार असंभव है।",
    practicalLifeApplication:
      "किसी भी ग्रंथ, अध्ययन, लेखन या नए शुभ कार्य का प्रारम्भ करने से पूर्व इस श्लोक का पाठ करें। यह वाणी में मधुरता, बुद्धि में स्पष्टता और अंतर्मन में श्रद्धा जागृत करता है।",
    deityFocus: "गोस्वामी तुलसीदास",
    tags: ["बालकाण्ड", "मंगलाचरण", "गणेश_सरस्वती", "शिव_पार्वती", "श्रद्धा_विश्वास"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical sacred illustration. Goddess Saraswati playing celestial Veena on white lotus and Lord Ganesha writing on golden palm leaf, with Shiva and Parvati in meditative cosmic glow in the backdrop, 8K ultra-detailed digital painting --ar 9:16 --v 6.1",
      textOverlay:
        "Sacred 9:16 vertical card with glowing golden Devanagari calligraphy: 'वर्णानामर्थसंघानां रसानां छन्दसामपि। मङ्गलानां च कर्त्तारौ वन्दे वाणीविनायकौ॥'. Pure sandalwood and temple gold aura --ar 9:16",
      cleanArt:
        "Traditional classical Indian masterpiece of Goswami Tulsidas sitting beneath banyan tree writing Ramcharitmanas with peacock feather pen, divine vision in the clouds --ar 9:16",
      videoPrompt:
        "Slow motion reveal of sacred Sanskrit shloka illuminated by glowing diyas, golden ink flowing from peacock feather on ancient birch parchment, 4K 60fps spiritual cinema",
    },
    shortsScript60s: {
      hook: "श्री रामचरितमानस का पहला श्लोक पढ़ते ही मन में क्या अलौकिक परिवर्तन होता है?",
      scene1Visual: "Goddess Saraswati and Lord Ganesha in divine golden luminescence.",
      scene1Voiceover: "तुलसीदास जी ने मानस का प्रारम्भ माँ सरस्वती और गणेश जी की वंदना से किया है।",
      scene2Visual: "Shiva and Parvati depicted as eternal Faith and Trust in the human heart.",
      scene2Voiceover: "उन्होंने लिखा: 'भवानीशङ्करौ वन्दे श्रद्धाविश्वासरूपिणौ'—क्योंकि बिना श्रद्धा और विश्वास के ईश्वर को नहीं पाया जा सकता।",
      scene3Visual: "Holy Ramcharitmanas scripture radiating divine light into the seeker's home.",
      scene3Voiceover: "जब भी कोई नया शुभ काम शुरू करें, यह श्लोक जरूर पढ़ें। बुद्धि और सफलता दोनों मिलेंगी!",
      outroCallToAction: "रामचरितमानस के अमृत ज्ञान के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Sacred Sarod & Flute in Raag Darbari",
      onScreenCaptions: ["रामचरितमानस मंगलाचरण", "श्रद्धा और विश्वास", "वाणी-विनायक वंदना"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — BAL KAAND SACRED ARCHIVE",
      suggestedHashtags: ["#BalKaand", "#RamCharitmanas", "#TulsidasJi", "#IndianBhaktiDhara", "#GaneshSaraswati"],
    },
  },

  // 9. BAL KAAND - Ram Janmotsav: Bhaye Pragat Kripala
  {
    id: "bk_bhaye_pragat_kripala",
    kaand: "BAL_KAAND",
    section: "BAL_KAAND",
    verseType: "छन्द (Chhand)",
    verseNumberOrLabel: "बालकाण्ड • छन्द (दोहा १९१ के बाद)",
    titleHindi: "भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी — श्री राम प्राकट्योत्सव",
    titleEnglish: "The Manifestation of the Lord of Compassion — Shri Ram Janmotsav",
    sacredTextAwadhi: `भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी।
हरषित महतारी मुनि मन हारी अद्भुत रूप बिचारी॥
लोचन अभिरामा तनु घनस्यामा निज आयुध भुज चारी।
भूषन बनमाला नयन बिसाला सोभासिंधु खरारी॥`,
    transliteration:
      "Bhaye pragata kripaala deenadayaala kausalya hitakaaree / Harashita mahataaree muni mana haaree adbhuta roopa bichaaree / Lochana abhiraama tanu ghanasyaama nija aayudha bhuja chaaree...",
    wordByWord: [
      { word: "भए प्रगट कृपाला", meaningHindi: "कृपालु प्रभु प्रकट हुए", meaningEnglish: "The merciful Lord manifested" },
      { word: "दीनदयाला", meaningHindi: "दीनों पर दया करने वाले", meaningEnglish: "Compassionate to the humble" },
      { word: "कौसल्या हितकारी", meaningHindi: "माता कौशल्या का परम कल्याण करने वाले", meaningEnglish: "Benefactor of Mother Kaushalya" },
      { word: "मुनि मन हारी", meaningHindi: "मुनियों के मनों को मोहने वाले", meaningEnglish: "Charming the minds of great sages" },
      { word: "तनु घनस्यामा", meaningHindi: "मेघ के समान श्याम वर्ण शरीर", meaningEnglish: "Complexion dark and radiant like rainclouds" },
      { word: "सोभासिंधु खरारी", meaningHindi: "सौंदर्य के सागर और खर राक्षस के संहारक", meaningEnglish: "Ocean of beauty and destroyer of evil" },
    ],
    bhawarthHindi:
      "दीनों पर दया करने वाले, कृपालु और माता कौशल्या का परम हित करने वाले भगवान श्री राम प्रकट हुए। मुनियों के मन को मोहने वाले प्रभु के उस अद्भुत चतुर्भुज रूप को देखकर माता कौशल्या हर्ष से भर गईं। नेत्रों को आनंद देने वाले, मेघ के समान श्याम वर्ण, चारों भुजाओं में अपने आयुध धारण किए हुए, विशाल नेत्रों वाले और शोभा के सागर प्रभु को देखकर माता नतमस्तक हो गईं।",
    englishMeaning:
      "The all-compassionate Lord, benefactor of Mother Kaushalya and savior of the meek, manifested in His transcendental splendour. Mother Kaushalya was filled with supreme ecstasy contemplating His wondrous divine form, with captivating lotus eyes, cloud-dark radiance, four arms bearing celestial emblems, and an ocean of infinite beauty.",
    spiritualGyan:
      "भगवान जब अवतार लेते हैं, तो वे भक्तों के प्रेम और आर्त पुकार के वशीभूत होकर प्रकट होते हैं। राम नवमी के पावन अवसर पर इस स्तुति का गान घर के समस्त अमंगल को दूर कर सुख-सौभाग्य की वर्षा करता है।",
    practicalLifeApplication:
      "घर में संतान के जन्म दिवस, नव वर्ष या राम नवमी पर इस छन्द का सस्वर पाठ करें। यह पारिवारिक वातावरण में आनंद, पवित्रता और दैवीय कृपा का संचार करता है।",
    deityFocus: "श्री राम-जानकी",
    tags: ["राम_जन्मोत्सव", "भए_प्रगट_कृपाला", "राम_नवमी", "बालकाण्ड", "आनंद"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical festive masterpiece. Divine newborn Lord Rama in the golden cradle of Ayodhya palace, divine blue effulgence, Mother Kaushalya looking with tears of bliss, celestial devatas showering golden parijata flowers from heavens, 8K ultra-detailed render --ar 9:16 --v 6.1",
      textOverlay:
        "Festive 9:16 vertical card with glowing saffron typography: 'भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी'. Marigold flower garlands and palace gold border --ar 9:16",
      cleanArt:
        "Classical Ayodhya royal palace painting of baby Shri Rama glowing with celestial light, oil lamps, festive flags, joyous atmosphere --ar 9:16",
      videoPrompt:
        "Golden light particles bursting into a celestial shower of flowers over baby Rama's cradle, joyous Ayodhya temple bells ringing, 4K spiritual cinematic",
    },
    shortsScript60s: {
      hook: "जब भगवान राम का जन्म हुआ, तो पूरी सृष्टि में क्या चमत्कार हुआ था?",
      scene1Visual: "Divine celestial blue light descending into the royal chambers of Ayodhya.",
      scene1Voiceover: "गोस्वामी तुलसीदास जी गाते हैं: 'भए प्रगट कृपाला दीनदयाला कौसल्या हितकारी!'",
      scene2Visual: "Mother Kaushalya in tears of divine ecstasy looking at the cosmic child.",
      scene2Voiceover: "सूर्यदेव एक महीने तक अयोध्या में ही रुके रहे, रात हुई ही नहीं! देवता स्वर्ग से पुष्प बरसाने लगे।",
      scene3Visual: "Lord Rama smiling with his lotus eyes, blessing every devotee in the world.",
      scene3Voiceover: "कमेंट में 'जय श्री राम' लिखें और प्रभु के पावन जन्मोत्सव का दिव्य आशीर्वाद प्राप्त करें!",
      outroCallToAction: "राम नाम के आनंद के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Upbeat Temple Shehnai and Joyous Dholak rhythm",
      onScreenCaptions: ["भए प्रगट कृपाला", "श्री राम जन्मोत्सव", "अयोध्या आनंद उत्सव"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — RAM JANMOTSAV ARCHIVE",
      suggestedHashtags: ["#RamNavami", "#BhayePragatKripala", "#Ayodhya", "#IndianBhaktiDhara", "#ShriRamJanmabhoomi"],
    },
  },

  // 10. AYODHYA KAAND - Siya Ram May Sab Jag Jaani
  {
    id: "ak_siya_ram_may_sab_jag",
    kaand: "AYODHYA_KAAND",
    section: "AYODHYA_KAAND",
    verseType: "चौपाई (Chaupai)",
    verseNumberOrLabel: "बालकाण्ड / अयोध्याकाण्ड • चौपाई",
    titleHindi: "सिय राम मय सब जग जानी — समदर्शी अद्वैत प्रेम दृष्टि",
    titleEnglish: "Seeing the Whole Cosmos Pervaded by Sita and Rama — Universal Non-Duality",
    sacredTextAwadhi: `सिय राम मय सब जग जानी। करहुँ प्रनाम जोरि जुग पानी॥
जानि कृपाकर किंकर मोहू। सब मिलि करहु छाड़ि छल छोहू॥
निज बुधि बल भरोस मोहि नाहीं। तातें बिनय करउँ सब पाहीं॥
करन चहउँ रघुपति गुन गाहा। लघु मति मोरि चरित अवगाहा॥`,
    transliteration:
      "Siya Rama maya saba jaga jaanee / Karahun pranaama jori juga paanee / Jaani kripaakara kinkara mohoo / Saba mili karahu chhaadi chhala chhohoo...",
    wordByWord: [
      { word: "सिय राम मय", meaningHindi: "सीता जी और श्री राम जी से ओतप्रोत", meaningEnglish: "Pervaded by Sita and Rama" },
      { word: "सब जग जानी", meaningHindi: "समस्त संसार को जानकर", meaningEnglish: "Knowing the entire universe to be" },
      { word: "जोरि जुग पानी", meaningHindi: "दोनों हाथ जोड़कर", meaningEnglish: "With both hands joined in reverence" },
      { word: "करहुँ प्रनाम", meaningHindi: "मैं सबको प्रणाम करता हूँ", meaningEnglish: "I offer my humble salutations" },
      { word: "छाड़ि छल छोहू", meaningHindi: "छल और क्रोध को छोड़कर कृपा करें", meaningEnglish: "Shedding all deceit and showering grace" },
    ],
    bhawarthHindi:
      "संपूर्ण जगत को श्री सीता जी और श्री राम जी के स्वरूप से ओत-प्रोत (सीता-राम-मय) जानकर मैं दोनों हाथ जोड़कर सबको प्रणाम करता हूँ। मुझे अपने बुद्धि और बल का कोई घमंड या भरोसा नहीं है, इसीलिए मैं सबको अपना मानकर विनम्रतापूर्वक वंदना करता हूँ ताकि प्रभु के पावन चरित्र का गान कर सकूँ।",
    englishMeaning:
      "Recognizing the entire universe as intimately permeated by Sita and Rama, I bow to all beings with folded hands in pure humility. Relying not upon my own intellect or strength, I seek the grace of all creation to sing the boundless glories of the Lord.",
    spiritualGyan:
      "यह भारतीय अद्वैत दर्शन और भक्ति का सर्वोच्च शिखर है। जब हम हर प्राणी, हर कण में परमात्मा का ही रूप देखने लगते हैं, तो हमारे भीतर से ईर्ष्या, द्वेष और घृणा सदा के लिए समाप्त हो जाते हैं।",
    practicalLifeApplication:
      "किसी भी व्यक्ति से मिलते समय या मन में किसी के प्रति कड़वाहट आने पर इस चौपाई का स्मरण करें। यह क्रोध को शांत कर हृदय को क्षमा और प्रेम से भर देता है।",
    deityFocus: "श्री राम-जानकी",
    tags: ["सिय_राम_मय", "अद्वैत_भक्ति", "विनम्रता", "समदृष्टि", "प्रेम"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical sacred art. Divine transparent glowing silhouettes of Sita and Rama encompassing the entire cosmos, sacred trees, rivers, mountains, and celestial stars shimmering in their divine light, 8K ultra-detailed masterpiece --ar 9:16 --v 6.1",
      textOverlay:
        "Devotional 9:16 vertical card with golden Devanagari calligraphy: 'सिय राम मय सब जग जानी। करहुँ प्रनाम जोरि जुग पानी॥'. Saffron and cosmic stardust aura --ar 9:16",
      cleanArt:
        "Traditional Indian miniature painting of an enlightened devotee bowing with folded hands to nature, rivers, animals, and temples, with Sita-Ram shining within all forms --ar 9:16",
      videoPrompt:
        "Slow transformation of a blooming lotus and mountain sunrise into the luminous smiling faces of Sita and Rama, glowing with unconditional love, 4K spiritual cinema",
    },
    shortsScript60s: {
      hook: "अगर इस एक चौपाई को दिल में उतार लिया, तो जीवन में कभी किसी से नफरत नहीं होगी!",
      scene1Visual: "A glowing vision of Lord Rama and Mother Sita breathing life into every tree, river and star.",
      scene1Voiceover: "तुलसीदास जी कहते हैं: 'सिय राम मय सब जग जानी। करहुँ प्रनाम जोरि जुग पानी॥'",
      scene2Visual: "Every person, bird and animal reflecting the divine light of Sita-Ram.",
      scene2Voiceover: "इस पूरे ब्रह्मांड में जो कुछ भी है, वह सीता और राम का ही रूप है। फिर किससे बैर और किससे नफरत?",
      scene3Visual: "Peaceful devotee smiling with folded hands in universal harmony.",
      scene3Voiceover: "सबको सम्मान दीजिए और अपने जीवन को असीम शांति से भर लीजिए। जय सियाराम!",
      outroCallToAction: "शांति और प्रेम के मार्ग पर चलने के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Mellow Bansuri with Tibetan bowl and Tanpura harmonics",
      onScreenCaptions: ["सिय राम मय सब जग जानी", "अद्वैत प्रेम दृष्टि", "जय सियाराम"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — UNIVERSAL ONENESS ARCHIVE",
      suggestedHashtags: ["#SiyaRam", "#RamCharitmanas", "#UniversalLove", "#IndianBhaktiDhara", "#SanatanDharma"],
    },
  },

  // 11. ARANYA KAAND - Shabari Navadha Bhakti
  {
    id: "ak_navadha_bhakti_shabari",
    kaand: "ARANYA_KAAND",
    section: "ARANYA_KAAND",
    verseType: "चौपाई (Chaupai)",
    verseNumberOrLabel: "अरण्यकाण्ड • चौपाई (दोहा ३४ के बाद)",
    titleHindi: "नवधा भगति कहउँ तोहि पाहीं — माता शबरी को प्रभु का उपदेश",
    titleEnglish: "The Ninefold Path of Devotion — Lord Rama's Discourse to Mother Shabari",
    sacredTextAwadhi: `नवधा भगति कहउँ तोहि पाहीं। सावधान सुनु धरु मन माहीं॥
प्रथम भगति संतन्ह कर संगा। दूसरि रति मम कथा प्रसंगा॥
गुर पद पंकज सेवा तीसरि भगति अमान।
चौथी भगति मम गुन गन करइ कपट तजि गान॥
मंत्र जाप मम दृढ़ बिस्वासा। पंचम भजन सो बेद प्रकासा॥`,
    transliteration:
      "Navadha bhagati kahun tohi paaheen / Saavadhaana sunu dharu mana maaheen / Prathama bhagati santanha kara sangaa / Doosari rati mama kathaa prasangaa...",
    wordByWord: [
      { word: "नवधा भगति", meaningHindi: "नौ प्रकार की पावन भक्ति", meaningEnglish: "The nine divine limbs of devotion" },
      { word: "प्रथम भगति", meaningHindi: "पहली भक्ति", meaningEnglish: "The first step of devotion" },
      { word: "संतन्ह कर संगा", meaningHindi: "सत्संग व संतों का संग", meaningEnglish: "Association with enlightened holy souls" },
      { word: "दूसरि रति", meaningHindi: "दूसरी भक्ति में प्रेम", meaningEnglish: "Second is profound love for Lord's stories" },
      { word: "गुर पद पंकज सेवा", meaningHindi: "तीसरी भक्ति: गुरु के चरण कमलों की निष्कपट सेवा", meaningEnglish: "Third is humble, selfless service at Guru's feet" },
      { word: "मंत्र जाप", meaningHindi: "पाँचवीं भक्ति: दृढ़ विश्वास के साथ राम नाम मंत्र जाप", meaningEnglish: "Fifth is steadfast chanting of the sacred mantra" },
    ],
    bhawarthHindi:
      "श्री राम जी माता शबरी से कहते हैं: हे भामिनि! मैं तुमसे नौ प्रकार की भक्ति कहता हूँ, ध्यानपूर्वक सुनो। पहली भक्ति संतों का संग (सत्संग) है। दूसरी भक्ति मेरे कथा-प्रसंगों में प्रेम होना है। तीसरी भक्ति अभिमान रहित होकर गुरु के चरण कमलों की सेवा करना है। चौथी भक्ति कपट छोड़कर मेरे गुणों का गान करना है और पाँचवीं भक्ति वेदों में प्रसिद्ध मेरे पावन मंत्र का दृढ़ विश्वास से जाप करना है।",
    englishMeaning:
      "Lord Rama revealed to Mother Shabari the ninefold ladder of devotion: 'First is the association of holy souls (Satsang). Second is delight in hearing my divine pastimes. Third is selfless service to the spiritual master. Fourth is singing my praises free from deceit. Fifth is steadfast japa of my holy name with unwavering faith.'",
    spiritualGyan:
      "भगवान किसी जाति, कुल, धन या पांडित्य को नहीं देखते; वे केवल निष्कपट प्रेम के भूखे हैं। शबरी के जूठे बेर खाकर प्रभु ने सिद्ध किया कि भक्ति का एकमात्र मापदंड हृदय की शुद्धता है।",
    practicalLifeApplication:
      "दैनिक जीवन में संतों की वाणी सुनें, गुरुजनों का आदर करें और नियमित रूप से नाम-जाप करें। यही नवधा भक्ति का सरल व्यावहारिक रूप है।",
    deityFocus: "शबरी माता",
    tags: ["नवधा_भक्ति", "शबरी", "सत्संग", "अरण्यकाण्ड", "राम_कृपा"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical sacred scene. Lord Rama and Lakshmana sitting lovingly in Mother Shabari's humble hermitage, aged Shabari offering wild berries with tears of devotion, divine golden light pouring through forest trees, 8K hyper-detailed photorealistic render --ar 9:16 --v 6.1",
      textOverlay:
        "Devotional 9:16 vertical card with glowing amber typography: 'प्रथम भगति संतन्ह कर संगा। दूसरि रति मम कथा प्रसंगा॥'. Forest emerald and golden glow --ar 9:16",
      cleanArt:
        "Sacred Indian painting of Lord Rama tasting berries from Shabari's bowl with immense tenderness, Lakshmana looking in awe, serene Dandakaranya forest backdrop --ar 9:16",
      videoPrompt:
        "Gentle camera push in on Lord Rama's compassionate smile as he accepts Shabari's humble offering, glowing tear falling from Shabari's eye, 4K 60fps spiritual cinema",
    },
    shortsScript60s: {
      hook: "भगवान को पाने का सबसे आसान तरीका क्या है? शबरी को दिया गया श्री राम का यह उपदेश सुनिए!",
      scene1Visual: "Lord Rama sitting on the grass floor of Shabari's hut eating sweet berries.",
      scene1Voiceover: "श्री राम ने शबरी माता को 'नवधा भक्ति' यानी ईश्वर को पाने के 9 सबसे सरल रास्ते बताए।",
      scene2Visual: "Visualizing Satsang, loving Guru seva, and chanting Rama's sacred name.",
      scene2Voiceover: "पहला: अच्छे लोगों का संग। दूसरा: प्रभु की कथा से प्रेम। और तीसरा: गुरु की निष्कपट सेवा।",
      scene3Visual: "Lord Rama blessing Shabari with liberation in divine golden light.",
      scene3Voiceover: "प्रभु धन या कुल नहीं, केवल आपका सच्चा प्रेम और निर्मल हृदय देखते हैं!",
      outroCallToAction: "नवधा भक्ति का विस्तार जानने के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Soulful Sitar and Acoustic Guitar devotional harmony",
      onScreenCaptions: ["नवधा भक्ति का रहस्य", "शबरी के बेर", "सच्चे प्रेम की शक्ति"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — NAVADHA BHAKTI ARCHIVE",
      suggestedHashtags: ["#NavadhaBhakti", "#ShabariMata", "#RamCharitmanas", "#IndianBhaktiDhara", "#Devotion"],
    },
  },

  // 12. UTTAR KAAND - Ram Rajya Varnan
  {
    id: "uk_ram_rajya_varnan",
    kaand: "UTTAR_KAAND",
    section: "UTTAR_KAAND",
    verseType: "चौपाई (Chaupai)",
    verseNumberOrLabel: "उत्तरकाण्ड • चौपाई (दोहा २० के बाद)",
    titleHindi: "दैहिक दैविक भौतिक तापा। राम राज नहिं काहुहि ब्यापा॥ — राम राज्य की महिमा",
    titleEnglish: "The Ideal Sovereign Realm — Complete Freedom from All Sorrows",
    sacredTextAwadhi: `दैहिक दैविक भौतिक तापा। राम राज नहिं काहुहि ब्यापा॥
सब नर करहिं परस्पर प्रीती। चलहिं स्वधर्म निरत श्रुति नीती॥
चारिउ चरन धर्म जग माहीं। पूरि रहा सपनेहुँ अघ नाहीं॥
राम भगति रत नर अरु नारी। सकल सुमंगल अधिकारी॥
अल्पमृत्यु नहिं कवनिउ पीरा। सब सुंदर सब बिरुज सरीरा॥`,
    transliteration:
      "Daihika daivika bhautika taapaa / Rama raaja nahin kaahuhi byaapaa / Saba nara karahin paraspara preetee / Chalahin svadharma nirata shruti neetee...",
    wordByWord: [
      { word: "दैहिक तापा", meaningHindi: "शारीरिक रोग व कष्ट", meaningEnglish: "Physical ailments and bodily afflictions" },
      { word: "दैविक तापा", meaningHindi: "दैवीय या प्राकृतिक आपदाएं", meaningEnglish: "Celestial or natural calamities" },
      { word: "भौतिक तापा", meaningHindi: "संसार और समाज द्वारा दिए गए दुःख", meaningEnglish: "Material hardships caused by worldly strife" },
      { word: "राम राज नहिं काहुहि ब्यापा", meaningHindi: "राम राज्य में किसी को भी कोई दुःख नहीं सताता", meaningEnglish: "In Rama's rule, none suffered any sorrow" },
      { word: "परस्पर प्रीती", meaningHindi: "सब लोग आपस में प्रेम करते हैं", meaningEnglish: "All citizens loved one another harmoniously" },
      { word: "सब बिरुज सरीरा", meaningHindi: "सभी लोग रोगमुक्त और सुंदर शरीर वाले थे", meaningEnglish: "Everyone possessed healthy, disease-free bodies" },
    ],
    bhawarthHindi:
      "श्री राम जी के राज्य में दैहिक (शारीरिक रोग), दैविक (प्राकृतिक आपदाएं) और भौतिक (पारस्परिक कष्ट)—ये तीनों प्रकार के दुःख किसी को भी नहीं सताते थे। सभी मनुष्य आपस में निष्कपट प्रेम करते थे और वेदों द्वारा बताई गई मर्यादा व अपने धर्म का पालन करते थे। धर्म अपने चारों चरणों पर पूर्ण रूप से स्थित था, किसी को स्वप्न में भी पाप का भान नहीं होता था और सभी प्राणी निरोगी, दीर्घायु व आनंद से परिपूर्ण थे।",
    englishMeaning:
      "In the righteous realm of Lord Rama (Ram Rajya), none suffered from the three types of miseries: physical illness, cosmic disasters, or worldly conflicts. All citizens cherished mutual love, walked steadfastly on the noble path of virtue, and lived disease-free, vibrant, and prosperous lives filled with all auspicious blessings.",
    spiritualGyan:
      "राम राज्य केवल एक ऐतिहासिक शासन नहीं, बल्कि मनुष्य के भीतर की वह अवस्था है जहाँ मन, बुद्धि और अहंकार पर 'राम तत्व' (सत्य, धर्म और करुणा) का शासन होता है। जब हृदय में राम राज्य आता है, तो सारे मानसिक विकार मिट जाते हैं।",
    practicalLifeApplication:
      "अपने घर और परिवार में राम राज्य स्थापित करने के लिए परस्पर प्रेम, क्षमा और कर्तव्यनिष्ठा को अपनाएं। किसी से ईर्ष्या न करें और सदैव धर्म के मार्ग पर चलें।",
    deityFocus: "श्री राम-जानकी",
    tags: ["राम_राज्य", "उत्तरकाण्ड", "आरोग्य", "सुख_शांति", "मर्यादा"],
    imagePrompt916: {
      master:
        "Cinematic 9:16 vertical glorious coronation vision. Lord Rama and Mother Sita seated on the golden throne of Ayodhya (Ram Darbar), surrounded by Lakshmana, Bharata, Shatrughna, Hanuman with folded hands, Vashistha pouring holy Saryu water, peaceful prosperous kingdom visible in sunrise background, 8K ultra-detailed photorealistic render --ar 9:16 --v 6.1",
      textOverlay:
        "Majestic 9:16 vertical card with royal golden typography: 'दैहिक दैविक भौतिक तापा। राम राज नहिं काहुहि ब्यापा॥'. Imperial Ayodhya gold and jewel border --ar 9:16",
      cleanArt:
        "Traditional classical Indian painting of the coronation of Shri Rama, golden umbrellas, white chhatra, celestial beings showering flowers, serene prosperity --ar 9:16",
      videoPrompt:
        "Slow majestic zoom out from Lord Rama's radiant face on the golden throne of Ayodhya, revealing the grandeur of Ram Darbar surrounded by holy sages and happy citizens, 4K spiritual cinematic",
    },
    shortsScript60s: {
      hook: "क्या आप जानते हैं कि कैसा था असली 'राम राज्य' जिसमें कोई भी इंसान कभी बीमार नहीं पड़ता था?",
      scene1Visual: "Golden, flourishing Ayodhya with pristine rivers, lush gardens and happy citizens.",
      scene1Voiceover: "गोस्वामी तुलसीदास जी ने लिखा है: 'दैहिक दैविक भौतिक तापा। राम राज नहिं काहुहि ब्यापा॥'",
      scene2Visual: "All people living in mutual love, zero crimes, nature showering abundance.",
      scene2Voiceover: "राम राज्य में न कोई बीमारी थी, न कोई अकाल मृत्यु! सब लोग आपस में प्रेम से रहते थे।",
      scene3Visual: "Lord Rama and Sita on the throne radiating blessing light to the entire world.",
      scene3Voiceover: "जब हमारे दिल में राम बसते हैं, तो हमारा घर भी राम राज्य बन जाता है। जय सियाराम!",
      outroCallToAction: "राम राज्य के दिव्य दर्शन के लिए Indian Bhakti Dhara को Subscribe करें।",
      audioTrackRecommendation: "Grand Royal Shenai and Shankha fanfare in Raag Bilawal",
      onScreenCaptions: ["राम राज्य की महिमा", "दैहिक दैविक भौतिक तापा", "स्वर्ण युग की स्थापना"],
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "IBD — RAM RAJYA SACRED ARCHIVE",
      suggestedHashtags: ["#RamRajya", "#UttarKaand", "#ShriRamDarbar", "#IndianBhaktiDhara", "#AyodhyaDham"],
    },
  },
];
