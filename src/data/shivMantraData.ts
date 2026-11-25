// Sri Shiva Mahamantra & Sacred Stotras Suite
// Comprehensive Sanskrit, Transliteration, Padachheda, Hindi Bhavarth, English Spiritual Meaning,
// 9:16 Midjourney AI Prompts, 60s Shorts Scripts, Channel Branding & 10-Theme HD PNG Card Export Data.

export type ShivMantraCategoryId =
  | "ALL"
  | "OM_NAMAH_SHIVAY"
  | "RUDRASHTAKAM"
  | "PANCHAKSHARA"
  | "LINGASHTAKAM"
  | "SHIVA_TANDAVA";

export interface ShivCategoryInfo {
  id: ShivMantraCategoryId;
  nameHindi: string;
  nameEnglish: string;
  composer: string;
  scriptureSource: string;
  icon: string;
  significanceHindi: string;
  keyTheme: string;
  idealTime: string;
  malaCount: string;
}

export const SHIV_MANTRA_CATEGORIES: ShivCategoryInfo[] = [
  {
    id: "OM_NAMAH_SHIVAY",
    nameHindi: "ॐ नमः शिवाय (महामंत्र)",
    nameEnglish: "Om Namah Shivaya Mahamantra",
    composer: "वेदमूर्ति ऋषयः (यजुर्वेद श्रीरुद्रम्)",
    scriptureSource: "कृष्ण यजुर्वेद तैत्तिरीय संहिता / शिव पुराण",
    icon: "🕉️",
    significanceHindi:
      "समस्त ब्रह्माण्ड का बीज-मंत्र। पंचतत्वों (पृथ्वी, जल, अग्नि, वायु, आकाश) का शोधक एवं मोक्ष प्रदाता परम पावन षडाक्षर मंत्र।",
    keyTheme: "पंचतत्व शुद्धि • आत्म साक्षात्कार • निर्विकल्प समाधि",
    idealTime: "ब्रह्ममुहूर्त (प्रातः 4:00 - 6:00) एवं प्रदोष काल",
    malaCount: "108 मनके (रुद्राक्ष माला)",
  },
  {
    id: "RUDRASHTAKAM",
    nameHindi: "श्री रुद्राष्टकम्",
    nameEnglish: "Shri Rudrashtakam",
    composer: "गोस्वामी तुलसीदास जी महाराज",
    scriptureSource: "श्रीरामचरितमानस (उत्तरकाण्ड)",
    icon: "🔱",
    significanceHindi:
      "काकभुशुण्डि जी के गुरु द्वारा भगवान शिव की असीम कृपा प्राप्त करने हेतु गाया गया स्तुति-गान। यह अष्टक समस्त भयों, पापकर्मों व संतापों का शमन करता है।",
    keyTheme: "निर्गुण-सगुण समन्वय • भक्ति प्रपत्ति • भयमुक्ति",
    idealTime: "संध्या आरती एवं शिव पूजा",
    malaCount: "प्रतिदिन 1 से 3 पाठ",
  },
  {
    id: "PANCHAKSHARA",
    nameHindi: "शिव पञ्चाक्षर स्तोत्रम्",
    nameEnglish: "Shiva Panchakshara Stotram",
    composer: "जगद्गुरु आदि शंकराचार्य",
    scriptureSource: "आदि शंकर स्तोत्र रत्नावली",
    icon: "📜",
    significanceHindi:
      "ना-म-शि-वा-य इन पांच बीजाक्षरों की दिव्यता का साक्षात्कार कराने वाला पावन स्तोत्र। इसके पाठ से शिवलोक की प्राप्ति होती है।",
    keyTheme: "पंच-अक्षर महिमा • अद्वैत बोध • शिव सानिध्य",
    idealTime: "प्रातः काल पूजा एवं सोमवार विशेष",
    malaCount: "1 पाठ (ध्यान सहित)",
  },
  {
    id: "LINGASHTAKAM",
    nameHindi: "श्री लिङ्गाष्टकम्",
    nameEnglish: "Shri Lingashtakam",
    composer: "जगद्गुरु आदि शंकराचार्य",
    scriptureSource: "लिङ्ग पुराण / आदि शंकर स्तोत्र ग्रन्थावली",
    icon: "🪨",
    significanceHindi:
      "शिवलिंग के निराकार एवं साकार स्वरूप की 8 पावन श्लोकों में वंदना। जन्म-मरण के बंधन और अज्ञान के विनाशक अष्टकम।",
    keyTheme: "शिवलिंग अर्चन • पाप क्षय • मनोकामना सिद्धि",
    idealTime: "शिवलिंग जलाभिषेक / रुद्राभिषेक के समय",
    malaCount: "अभिषेक काल में अनवरत पाठ",
  },
  {
    id: "SHIVA_TANDAVA",
    nameHindi: "श्री शिव ताण्डव स्तोत्रम्",
    nameEnglish: "Shiva Tandava Stotram",
    composer: "दशानन लंकापति रावण",
    scriptureSource: "शिव रहस्य / रावण संहिता",
    icon: "🔥",
    significanceHindi:
      "भगवान नटराज के प्रलयंकारी एवं कल्याणकारी ताण्डव नृत्य का अद्वितीय काव्यमय स्तुति-गान। प्रचण्ड ऊर्जा, आत्मबल व वाक् सिद्धि प्रदाता।",
    keyTheme: "ताण्डव नाद • प्रचण्ड आत्मबल • अहंकार विसर्जन",
    idealTime: "प्रदोष काल (संध्या समय) एवं महाशिवरात्रि",
    malaCount: "1 या 11 पाठ (उच्च स्वर नाद)",
  },
];

export interface ShivWordMeaning {
  word: string;
  meaningHindi: string;
  meaningEnglish: string;
}

export interface ShivPrompt916Suite {
  master: string;
  textOverlay: string;
  cleanArt: string;
  videoPrompt: string;
}

export interface ShivShortsScript {
  hook: string;
  scene1Visual: string;
  scene1Voiceover: string;
  scene2Visual: string;
  scene2Voiceover: string;
  scene3Visual: string;
  scene3Voiceover: string;
  outroCallToAction: string;
  audioTrackRecommendation: string;
}

export interface ShivChannelBranding {
  watermarkText: string;
  handle: string;
  sealText: string;
  suggestedHashtags: string[];
}

export interface ShivMantraItem {
  id: string;
  category: ShivMantraCategoryId;
  titleHindi: string;
  titleEnglish: string;
  verseNumberOrLabel: string;
  meterOrChhanda: string;
  deityFocus: string;
  sacredTextSanskrit: string;
  transliteration: string;
  wordByWord: ShivWordMeaning[];
  bhawarthHindi: string;
  englishMeaning: string;
  spiritualGyan: string;
  practicalLifeApplication: string;
  recommendedChantCount: string;
  imagePrompt916: ShivPrompt916Suite;
  shortsScript60s: ShivShortsScript;
  channelBranding: ShivChannelBranding;
}

export const SHIV_MANTRA_DATA: ShivMantraItem[] = [
  // ==========================================
  // SECTION 1: OM NAMAH SHIVAY (महामंत्र)
  // ==========================================
  {
    id: "om_namah_shivaya_mahamantra",
    category: "OM_NAMAH_SHIVAY",
    titleHindi: "ॐ नमः शिवाय (षडाक्षर महामंत्र व ध्यान)",
    titleEnglish: "Om Namah Shivaya — The Supreme Cosmic Mantra",
    verseNumberOrLabel: "महामंत्र • यजुर्वेद संहिता",
    meterOrChhanda: "षडाक्षर बीज / मन्त्र गायत्री",
    deityFocus: "भगवान सदाशिव / ओंकारेश्वर",
    sacredTextSanskrit: `ॐ नमः शिवाय ।

ध्यायेन्नित्यं महेशं रजतगिरिनिभं चारुचंद्रावतंसं
रत्नाकल्पोज्ज्वलाङ्गं परशुमृगवराभीतिहस्तं प्रसन्नम् ।
पद्मासीनं समन्तात् स्तुतममरगणैर्व्याघ्रकृत्तिं वसानं
विश्वाद्यं विश्वबीजं निखिलभयहरं पञ्चवक्त्रं त्रिनेत्रम् ॥`,
    transliteration:
      "Oṁ Namaḥ Śivāya |\nDhyāyen-nityaṁ maheśaṁ rajata-giri-nibhaṁ cāru-candrāvataṁsaṁ\nratnākalpojjvalāṅgaṁ paraśu-mṛga-varābhīti-hastaṁ prasannam |\npadmāsīnaṁ samantāt stutam-amara-gaṇair-vyāghra-kṛttiṁ vasānaṁ\nviśvādyaṁ viśva-bījaṁ nikhila-bhaya-haraṁ pañca-vaktraṁ trinetram ||",
    wordByWord: [
      { word: "ॐ (Om)", meaningHindi: "परब्रह्म ओंकार, अनाहत नाद", meaningEnglish: "Primordial cosmic sound vibration" },
      { word: "नमः (Namah)", meaningHindi: "अहंकार का समर्पण, नमन", meaningEnglish: "Surrender of ego, bow down" },
      { word: "शिवाय (Shivaya)", meaningHindi: "परम कल्याणकारी शिव के प्रति", meaningEnglish: "Unto the all-auspicious Shiva" },
      { word: "रजतगिरिनिभं (Rajatagirinibham)", meaningHindi: "चांदी के पर्वत (कैलाश) सदृश श्वेत कान्ति वाले", meaningEnglish: "Shining like a silvery mountain (Kailash)" },
      { word: "चारुचंद्रावतंसं (Charu-chandravatamsam)", meaningHindi: "सुन्दर चन्द्रमा को मुकुट रूप में धारण करने वाले", meaningEnglish: "Adorned with the crescent moon on crest" },
      { word: "रत्नाकल्पोज्ज्वलाङ्गं (Ratnakalpojjvalangam)", meaningHindi: "दिव्य रत्नों के आभूषणों से जगमगाते", meaningEnglish: "Limbs radiant with celestial gems" },
      { word: "परशुमृगवराभीतिहस्तं (Parashu-mriga-varabhiti-hastam)", meaningHindi: "हाथों में परशु, मृग, वर और अभय मुद्रा धारण किए", meaningEnglish: "Holding axe, deer, boon & fearlessness mudra" },
      { word: "पञ्चवक्त्रं त्रिनेत्रम् (Pancha-vaktram Trinetram)", meaningHindi: "पंचमुखी एवं त्रिनेत्रधारी महेश्वर", meaningEnglish: "Five-faced, three-eyed supreme Lord" },
    ],
    bhawarthHindi:
      "‘ॐ नमः शिवाय’ समस्त सृष्टि का मूल मंत्र है। 'ॐ' नाद ब्रह्म है और 'नमः शिवाय' का अर्थ है—'मैं परम कल्याणस्वरूप, सर्वव्यापी शिव को नमन व आत्मसमर्पण करता हूँ।' ध्यान श्लोक में कहा गया है: कैलाश पर्वत के समान धवल कांति वाले, मस्तक पर मनोहर बाल-चन्द्र धारण करने वाले, चारों हाथों में परशु, मृगमुद्रा, वरद और अभय मुद्रा धारण करने वाले, पद्मासन में विराजमान, देवताओं द्वारा स्तुत, व्याघ्रचर्मधारी, विश्व के आदि-कारण, निखिल भयों को हरने वाले पंचमुख त्रिनेत्रधारी भगवान शिव का नित्य ध्यान करें।",
    englishMeaning:
      "'Om Namah Shivaya' is the primordial five-element Vedic mantra signifying total surrender of individual ego to the supreme auspicious reality. The Dhyana Shloka invokes Lord Shiva shining like a mountain of silver, crowned with the crescent moon, seated in lotus posture in meditative stillness, adorned with deer skin, holding the battleaxe and mudras of blessing and fearlessness, the five-faced, three-eyed Lord who dissolves all worldly fear.",
    spiritualGyan:
      "‘ॐ नमः शिवाय’ में पांच अक्षर (न-म-शि-वा-य) पंचभूतों का प्रतिनिधित्व करते हैं: न = पृथ्वी, म = जल, शि = अग्नि, वा = वायु, य = आकाश। जब आप ॐ नमः शिवाय का जप करते हैं, तो आपके शरीर व चेतना के समस्त पंचतत्व शुद्ध होकर शिव-चेतना में विलीन हो जाते हैं।",
    practicalLifeApplication:
      "दैनिक तनाव, अनियंत्रित विचारों और क्रोध को शांत करने हेतु प्रतिदिन रुद्राक्ष माला पर 108 बार ॐ नमः शिवाय का शांत बैठकर जप करें। यह मन को तुरंत अल्फा तरंगों और गहरी शांति में ले जाता है।",
    recommendedChantCount: "108 मनके (नित्य प्रातः एवं संध्या)",
    imagePrompt916: {
      master:
        "Cinematic vertical 9:16 portrait of Lord Shiva seated in deep Samadhi atop snow-capped Mount Kailash, crescent moon in matted Jata glowing with celestial moonlight, sacred blue Neelkanth throat radiating soft cyan light, Holy River Ganga descending in shimmering water jets, glowing Rudraksha mala and sacred white Vibhuti tripundra on forehead, third eye closed in serene bliss, divine golden light rays from behind, photorealistic 8K Octane render, spiritual masterpiece --ar 9:16 --v 6.1 --stylize 350",
      textOverlay:
        "Sacred vertical 9:16 card of Mahadev in meditation on Kailash, dark obsidian and azure background, centered open layout for golden Sanskrit Devanagari 'ॐ नमः शिवाय', glowing aura, ornate Trishul with Damru beside him, ultra high resolution typography aesthetic --ar 9:16 --v 6.1",
      cleanArt:
        "Hyper-detailed oil painting of Lord Shiva in meditation, silver mountain Kailash behind, peaceful serene smile, tiger skin asana, cosmic starlight sky, realistic textures of skin, sacred ash Vibhuti, cyan throat glow, classical Indian temple art style --ar 9:16 --v 6.1",
      videoPrompt:
        "Vertical 9:16 slow camera push towards Lord Shiva's face in Dhyana Mudra on Mount Kailash, glowing Ganga stream flowing down hair locks, snowflakes drifting slowly in glowing sunbeams, cinematic 60fps spiritual aura --ar 9:16",
    },
    shortsScript60s: {
      hook: "क्या आप जानते हैं 'ॐ नमः शिवाय' केवल एक मंत्र नहीं, बल्कि पूरे ब्रह्मांड का पंचतत्व पासवर्ड है?",
      scene1Visual:
        "Cosmic visuals of 5 elements (Earth, Water, Fire, Air, Space) transforming into glowing Sanskrit letters Na-Ma-Shi-Va-Ya.",
      scene1Voiceover:
        "यजुर्वेद का यह षडाक्षर महामंत्र आपके भीतर के पांचों तत्वों—पृथ्वी, जल, अग्नि, वायु और आकाश को एक क्षण में शुद्ध कर देता है।",
      scene2Visual:
        "Lord Shiva on Mount Kailash in deep stillness, sound vibration ripples expanding across the universe.",
      scene2Voiceover:
        "'न' से पृथ्वी तत्व, 'म' से जल, 'शि' से अग्नि, 'वा' से प्राण वायु, और 'य' से शून्य आकाश। जब आप जप करते हैं, तो आपकी चेतना परम शिव से जुड़ जाती है।",
      scene3Visual:
        "A devotee holding a Rudraksha mala with golden beads counting 108 chants in Brahmamuhurta golden light.",
      scene3Voiceover:
        "प्रतिदिन प्रातः 108 बार रुद्राक्ष माला पर ॐ नमः शिवाय का जप करने से मानसिक तनाव, भय और नकारात्मक ऊर्जा जड़ से समाप्त हो जाती है।",
      outroCallToAction:
        "कमेंट में 'हर हर महादेव' लिखकर आज ही इस पावन जप का संकल्प लें। पेज को फॉलो करना न भूलें!",
      audioTrackRecommendation: "Sacred Om Namah Shivaya Deep Drone Chanting with Bansuri & Tanpura",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • SHIV MAHIMA",
      handle: "@IndianBhaktiDhara",
      sealText: "ॐ नमः शिवाय • श्री शिव शरणम्",
      suggestedHashtags: [
        "#OmNamahShivaya",
        "#HarHarMahadev",
        "#LordShiva",
        "#MahaMantra",
        "#ShivShambhu",
        "#IndianBhaktiDhara",
        "#ShivJiShorts",
      ],
    },
  },

  // ==========================================
  // SECTION 2: SHRI RUDRASHTAKAM (8 Verses + Phalashruti)
  // ==========================================
  {
    id: "rudrashtakam_verse_1",
    category: "RUDRASHTAKAM",
    titleHindi: "श्री रुद्राष्टकम् (श्लोक १ — नमामीशमीशान)",
    titleEnglish: "Shri Rudrashtakam — Verse 1 (Namamisham-Ishaana)",
    verseNumberOrLabel: "श्लोक १ • श्रीरामचरितमानस उत्तरकाण्ड",
    meterOrChhanda: "भुजङ्गप्रयात छन्द",
    deityFocus: "भगवान ईशान / सर्वव्यापी ब्रह्म",
    sacredTextSanskrit: `नमामीशमीशान निर्वाणरूपं ।
विभुं व्यापकं ब्रह्मवेदस्वरूपम् ॥
निजं निर्गुणं निर्विकल्पं निरीहं ।
चिदाकाशमाकाशवासं भजेऽहम् ॥१॥`,
    transliteration:
      "Namāmīśam-īśāna nirvāṇa-rūpaṁ |\nvibhuṁ vyāpakaṁ brahma-veda-svarūpam ||\nnijaṁ nirguṇaṁ nirvikalpaṁ nirīhaṁ |\ncid-ākāśam-ākāśa-vāsaṁ bhaje'ham ||1||",
    wordByWord: [
      { word: "नमामि (Namami)", meaningHindi: "मैं नमन करता हूँ", meaningEnglish: "I bow down" },
      { word: "ईशम् (Isham)", meaningHindi: "ईश्वर, समस्त स्वामियों के स्वामी को", meaningEnglish: "To the Supreme Ruler" },
      { word: "ईशान (Ishana)", meaningHindi: "ईशान दिशा के अधिपति, सर्वशक्तिमान", meaningEnglish: "The Lord of the universe (Ishana)" },
      { word: "निर्वाणरूपं (Nirvana-rupam)", meaningHindi: "मुक्ति और मोक्ष के साक्षात् स्वरूप", meaningEnglish: "Embodiment of supreme liberation (Nirvana)" },
      { word: "विभुं (Vibhum)", meaningHindi: "सर्वसमर्थ, नित्य प्रभु", meaningEnglish: "All-pervading omnipotent master" },
      { word: "व्यापकं (Vyapakam)", meaningHindi: "सर्वत्र व्याप्त रहने वाले", meaningEnglish: "Omnipresent throughout creation" },
      { word: "ब्रह्मवेदस्वरूपम् (Brahma-veda-svarupam)", meaningHindi: "परब्रह्म एवं वेदों के मूल स्वरूप", meaningEnglish: "Embodiment of Brahman and the Vedas" },
      { word: "निर्गुणं निर्विकल्पं (Nirgunam Nirvikalpam)", meaningHindi: "गुणों से परे, विकल्प-रहित, विकार-शून्य", meaningEnglish: "Beyond attributes, devoid of changes" },
      { word: "चिदाकाशम् (Chidakasham)", meaningHindi: "ज्ञान-स्वरूप चैतन्य आकाश", meaningEnglish: "The sky of pure divine consciousness" },
    ],
    bhawarthHindi:
      "हे ईशान दिशा के अधिपति, मुक्ति स्वरूप, सर्वसमर्थ, सर्वव्यापी, ब्रह्म और वेद स्वरूप, परमेश्वर शिव! मैं आपको नमन करता हूँ। जो अपने निज स्वरूप में स्थित, निर्गुण, निर्विकल्प (विकारों से रहित), निष्काम, चैतन्य रूपी आकाश और आकाश को ही वस्त्र रूप में धारण करने वाले (दिगंबर) हैं, ऐसे भगवान शिव का मैं भजन करता हूँ।",
    englishMeaning:
      "I bow to the Supreme Lord Ishana, the very embodiment of liberation (Nirvana), all-pervading, omnipotent, the essence of the Vedas and supreme Brahman. I worship Him who abides in His own eternal self, beyond attributes, free from change or desire, who is the ether of pure consciousness and whose garments are the cosmic sky.",
    spiritualGyan:
      "रुद्राष्टकम का आरंभ ही भगवान शिव के निर्गुण-निराकार और सगुण-साकार दोनों स्वरूपों के वंदन से होता है। शिव केवल एक रूप नहीं, अपितु सम्पूर्ण चेतन आकाश (चिदाकाश) हैं।",
    practicalLifeApplication:
      "जब भी मन में भय, असुरक्षा या भविष्य की चिंता हो, इस प्रथम श्लोक का उच्चारण करें। यह आत्म-विश्वास जगाता है कि सर्वव्यापी प्रभु हर क्षण आपके साथ हैं।",
    recommendedChantCount: "प्रतिदिन 3 पाठ",
    imagePrompt916: {
      master:
        "Majestic vertical 9:16 depiction of Lord Shiva as Ishana Nirvana Rupam, cosmic blue form dissolving into starry ether and nebula, holding radiant golden Trishul, serene enlightened face, golden halo, sacred river Ganga flowing, intricate Sanskrit Devanagari floating in glowing dust, cinematic lighting, Unreal Engine 5 render --ar 9:16 --v 6.1",
      textOverlay:
        "Sacred 9:16 poster of Lord Shiva with translucent cosmic blue aura, dark starry sky background, space at center for Sanskrit verse 'नमामीशमीशान निर्वाणरूपं', elegant golden borders --ar 9:16 --v 6.1",
      cleanArt:
        "Classic temple art painting of Lord Shiva in Chidakash form, blue skin, benevolent eyes, crescent moon, glowing third eye, tranquil meditation atop clouds, ancient Vedic manuscript aesthetic --ar 9:16 --v 6.1",
      videoPrompt:
        "Camera ascending from deep mountain mist up to Lord Shiva's divine face surrounded by glowing golden cosmic rings and Sanskrit mantras, 9:16 vertical 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "गोस्वामी तुलसीदास जी द्वारा रचित रुद्राष्टकम् का यह पहला श्लोक आपके जीवन के सारे भय मिटा सकता है!",
      scene1Visual:
        "Shri Ramcharitmanas sacred holy book opening with golden glowing letters of Namamisham Ishana.",
      scene1Voiceover:
        "श्रीरामचरितमानस के उत्तरकाण्ड में जब गुरुदेव ने शिवजी की स्तुति की, तो यह दिव्य 'रुद्राष्टकम्' प्रकट हुआ।",
      scene2Visual:
        "Lord Shiva in cosmic form surrounded by stars, galaxy nebulae, and serene moonlight.",
      scene2Voiceover:
        "'नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्मवेदस्वरूपम्'—हे प्रभु, आप मोक्षदाता, सर्वव्यापी और वेदों के मूल हैं!",
      scene3Visual:
        "Temple sanctum with glowing Shivling being bathed in milk and Bilva leaves under oil lamps.",
      scene3Voiceover:
        "इस श्लोक का नित्य पाठ करने वाले साधक को अकाल मृत्यु और किसी भी प्रकार के संताप का भय नहीं रहता।",
      outroCallToAction:
        "प्रतिदिन रुद्राष्टकम् सुनने और पढ़ने के लिए अभी इस चैनल को सब्सक्राइब/फॉलो करें। हर हर महादेव!",
      audioTrackRecommendation: "Powerful Traditional Rudrashtakam Stotram with Damru & Temple Bells",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • RUDRASHTAKAM",
      handle: "@IndianBhaktiDhara",
      sealText: "श्री रुद्राष्टकम् • श्लोक १",
      suggestedHashtags: [
        "#Rudrashtakam",
        "#NamamishamIshana",
        "#Ramcharitmanas",
        "#ShivStuti",
        "#TulsidasJi",
        "#HarHarMahadev",
      ],
    },
  },

  {
    id: "rudrashtakam_verse_2",
    category: "RUDRASHTAKAM",
    titleHindi: "श्री रुद्राष्टकम् (श्लोक २ — निराकारमोंकारमूलं)",
    titleEnglish: "Shri Rudrashtakam — Verse 2 (Nirakaram-Onkara-Moolam)",
    verseNumberOrLabel: "श्लोक २ • श्रीरामचरितमानस उत्तरकाण्ड",
    meterOrChhanda: "भुजङ्गप्रयात छन्द",
    deityFocus: "भगवान गिरीश / तुरीय चैतन्य",
    sacredTextSanskrit: `निराकारमोंकारमूलं तुरीयं ।
गिरा ग्यान गोतीतमीशं गिरीशम् ॥
करालं महाकाल कालं कृपालं ।
गुणागार संसारपारं नतोऽहम् ॥२॥`,
    transliteration:
      "Nirākāram-oṁkāra-mūlaṁ turīyaṁ |\ngirā gyāna gotītam-īśaṁ girīśam ||\nkarālaṁ mahākāla kālaṁ kṛpālaṁ |\nguṇāgāra saṁsāra-pāraṁ nato'ham ||2||",
    wordByWord: [
      { word: "निराकारम् (Nirakaram)", meaningHindi: "आकार रहित, निराकार", meaningEnglish: "Formless, without physical boundaries" },
      { word: "ओंकारमूलं (Onkara-moolam)", meaningHindi: "ओंकार 'ॐ' के मूल उद्गम", meaningEnglish: "Root origin of primordial Om" },
      { word: "तुरीयं (Turiyam)", meaningHindi: "जाग्रत, स्वप्न, सुषुप्ति से परे तुरीय अवस्था", meaningEnglish: "The fourth transcendental state of consciousness" },
      { word: "गिरा ग्यान गोतीतम् (Gira Gyan Gotitam)", meaningHindi: "वाणी, बुद्धि और इन्द्रियों की पहुंच से परे", meaningEnglish: "Beyond speech, intellect and senses" },
      { word: "गिरीशम् (Girisham)", meaningHindi: "कैलाशपति, पर्वतों के स्वामी", meaningEnglish: "Lord of the sacred Himalayas" },
      { word: "करालं (Karalam)", meaningHindi: "दुष्टों के लिए अति भयानक", meaningEnglish: "Fierce to evil, formidable" },
      { word: "महाकाल कालं (Mahakala Kalam)", meaningHindi: "काल (समय/मृत्यु) के भी महाकाल", meaningEnglish: "The master of time and death (Mahakaal)" },
      { word: "कृपालं (Kripalam)", meaningHindi: "भक्तों पर परम कृपालु", meaningEnglish: "Boundlessly compassionate to devotees" },
    ],
    bhawarthHindi:
      "जो निराकार हैं, ओंकार के मूल हैं, तीनों अवस्थाओं (जाग्रत, स्वप्न, सुषुप्ति) से परे तुरीय स्वरूप हैं; जो वाणी, ज्ञान और इंद्रियों से परे हैं; जो कैलाशपति गिरीश हैं; जो दुष्टों के लिए विकराल और कालों के भी काल 'महाकाल' हैं, किंतु अपने भक्तों के लिए परम कृपालु हैं, समस्त सद्गुणों के धाम और संसार-सागर से पार उतारने वाले हैं—उन भगवान शिव को मैं बारंबार नमन करता हूँ।",
    englishMeaning:
      "I bow to Lord Shiva who is formless, the root source of Om, the fourth transcendent state (Turiya), beyond the realm of speech, intellect, and the senses. He is Girisha (Lord of the mountains), formidable to the wicked, the master of death and time (Mahakala), yet all-compassionate, the repository of all virtues, and the liberator from the ocean of worldly existence.",
    spiritualGyan:
      "भगवान शिव महाकाल हैं—वे समय के प्रभाव से परे हैं। जो उनकी शरण में जाता है, उसे मृत्यु, काल या अनहोनी का तनिक भी भय नहीं रहता क्योंकि वे कृपालु बनकर सदैव रक्षा करते हैं।",
    practicalLifeApplication:
      "जीवन में जब कठिन संकट या रोग का भय सताए, तब 'करालं महाकाल कालं कृपालं' का स्मरण करें; इससे मन में असीम साहस और धैर्य का संचार होता है।",
    recommendedChantCount: "प्रतिदिन 3 या 11 पाठ",
    imagePrompt916: {
      master:
        "Spectacular vertical 9:16 portrait of Mahakaal Shiva in dramatic fiery and indigo contrast, third eye ablaze with divine golden flame, Trident Trishul held firmly with Damru vibrating cosmic waves, snake Vasuki coiled around neck, ash-smeared muscular blue body, storm clouds and mountain peaks behind, 8K ultra realistic render --ar 9:16 --v 6.1",
      textOverlay:
        "Atmospheric vertical 9:16 card of Mahakaal with glowing Trishul and cosmic smoke, deep charcoal and saffron aura, centered layout for Sanskrit verse 'निराकारमोंकारमूलं तुरीयं', gold filigree --ar 9:16 --v 6.1",
      cleanArt:
        "High-contrast spiritual painting of Lord Shiva as Mahakaal, dark background with golden divine rays, calm compassionate expression amid fierce cosmic energy, sacred vibhuti tilak, detailed hyper-realism --ar 9:16 --v 6.1",
      videoPrompt:
        "Dynamic vertical camera revolving around Mahakaal Shiva's glowing Trident with sparks flying in slow motion, thunder crackling across Himalayan mountain peaks, 60fps cinematic --ar 9:16",
    },
    shortsScript60s: {
      hook: "क्या आप जानते हैं काल और मृत्यु भी किनके नाम से कांपते हैं? सुनिए रुद्राष्टकम् का यह शक्तिशाली श्लोक!",
      scene1Visual:
        "Time wheel (Kaalchakra) spinning and dissolving into Lord Shiva's feet.",
      scene1Voiceover:
        "'करालं महाकाल कालं कृपालं गुणागार संसारपारं नतोऽहम्'—भगवान शिव कालों के भी काल 'महाकाल' हैं।",
      scene2Visual:
        "Lord Shiva standing atop Kailash, Trishul glowing in midnight darkness with protective golden shield.",
      scene2Voiceover:
        "जो वाणी और बुद्धि की सीमाओं से परे हैं, वही अपने भक्तों पर सबसे पहले कृपा बरसाते हैं और भवसागर से पार उतारते हैं।",
      scene3Visual:
        "Devotee with eyes closed experiencing immense inner peace and golden aura.",
      scene3Voiceover:
        "जब भी मन में संकट या असफलता का भय हो, इस श्लोक का 3 बार स्मरण करें। हर हर महादेव!",
      outroCallToAction:
        "अगर आपको महादेव पर अटूट विश्वास है, तो अभी 'जय महाकाल' कमेंट करें और शेयर करें!",
      audioTrackRecommendation: "High-Energy Rudrashtakam Stotram with Heavy Dhol, Shankha & Damru",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • RUDRASHTAKAM",
      handle: "@IndianBhaktiDhara",
      sealText: "श्री रुद्राष्टकम् • श्लोक २",
      suggestedHashtags: [
        "#Mahakaal",
        "#Rudrashtakam",
        "#ShivStotram",
        "#HarHarMahadev",
        "#ShivShakti",
        "#IndianBhaktiDhara",
      ],
    },
  },

  {
    id: "rudrashtakam_verse_4",
    category: "RUDRASHTAKAM",
    titleHindi: "श्री रुद्राष्टकम् (श्लोक ४ — चलत्कुण्डलं भ्रू सुनेत्रं)",
    titleEnglish: "Shri Rudrashtakam — Verse 4 (Chalatkundalam Bhroo Sunetram)",
    verseNumberOrLabel: "श्लोक ४ • श्रीरामचरितमानस उत्तरकाण्ड",
    meterOrChhanda: "भुजङ्गप्रयात छन्द",
    deityFocus: "भगवान नीलकण्ठ / दयाल पशुपति",
    sacredTextSanskrit: `चलत्कुण्डलं भ्रू सुनेत्रं विशालं ।
प्रसन्नाननं नीलकण्ठं दयालम् ॥
मृगाधीशचर्माम्बरं मुण्डमालं ।
प्रियं शङ्करं सर्वनाथं भजामि ॥४॥`,
    transliteration:
      "Calat-kuṇḍalaṁ bhrū sunetraṁ viśālaṁ |\nprasannānanaṁ nīlakaṇṭhaṁ dayālam ||\nmṛgādhīśa-carmāmbaraṁ muṇḍa-mālaṁ |\npriyaṁ śaṅkaraṁ sarva-nāthaṁ bhajāmi ||4||",
    wordByWord: [
      { word: "चलत्कुण्डलं (Chalat-kundalam)", meaningHindi: "कानों में हिलते हुए दिव्य कुण्डल", meaningEnglish: "Earrings shimmering and moving gently" },
      { word: "भ्रू सुनेत्रं विशालं (Bhroo Sunetram Vishalam)", meaningHindi: "सुंदर भृकुटि और विशाल नयन", meaningEnglish: "Beautiful eyebrows and large radiant eyes" },
      { word: "प्रसन्नाननं (Prasannānanam)", meaningHindi: "सदा प्रसन्न रहने वाला मुखमण्डल", meaningEnglish: "Face adorned with a benign joyous smile" },
      { word: "नीलकण्ठं (Neelakantham)", meaningHindi: "हलाहल विष धारण करने वाले नीले कंठ वाले", meaningEnglish: "The blue-throated Lord who swallowed poison" },
      { word: "दयालम् (Dayālam)", meaningHindi: "अत्यंत दयालु, कृपानिधि", meaningEnglish: "Infinitely compassionate" },
      { word: "मृगाधीशचर्माम्बरं (Mrigadhisha-charmambaram)", meaningHindi: "सिंह/व्याघ्र चर्म का वस्त्र पहने हुए", meaningEnglish: "Wearing tiger skin as sacred garment" },
      { word: "शङ्करं (Shankaram)", meaningHindi: "सबका कल्याण करने वाले शिव", meaningEnglish: "The cause of all prosperity and auspiciousness" },
      { word: "सर्वनाथं भजामि (Sarva-natham Bhajami)", meaningHindi: "समस्त लोकों के स्वामी का मैं भजन करता हूँ", meaningEnglish: "I worship the Lord of all beings" },
    ],
    bhawarthHindi:
      "जिनके कानों में मनोहर कुण्डल हिल रहे हैं, जिनकी भृकुटि और विशाल नेत्र अत्यंत सुंदर हैं, जिनका मुखमण्डल सदा प्रसन्नता से खिला रहता है, जो नीलकण्ठ और परम दयालु हैं, जो व्याघ्रचर्म का वस्त्र और मुण्डों की माला धारण किए हुए हैं, उन सबके प्रिय, सबका कल्याण करने वाले, सर्वेश्वर भगवान शंकर का मैं भजन करता हूँ।",
    englishMeaning:
      "I worship the beloved Shankara, the Lord of all creation, adorned with shimmering ear pendants, handsome eyebrows, and large compassionate eyes. His face is ever-smiling and serene; He is Neelakantha (the blue-throated one), boundlessly merciful, clothed in tiger skin, garlanded with heads, the source of all auspiciousness.",
    spiritualGyan:
      "भगवान शिव का नीलकण्ठ स्वरूप हमें सिखाता है कि संसार के कटु वचनों और विष समान नकारात्मकता को कंठ में धारण कर शांत रहें, दूसरों पर क्रोध न उगलें।",
    practicalLifeApplication:
      "जब भी जीवन में आलोचना या अपमान का सामना करना पड़े, भगवान नीलकण्ठ की सौम्यता और मुस्कान का ध्यान करें। यह मानसिक सहनशक्ति और गरिमा प्रदान करता है।",
    recommendedChantCount: "प्रतिदिन 3 पाठ",
    imagePrompt916: {
      master:
        "Breathtaking 9:16 vertical close-up of Lord Shiva smiling peacefully, shimmering golden earrings, glowing crescent moon in Jata hair locks, subtle radiant cyan glow on neck, sacred white Vibhuti on forehead with third eye, warm golden morning diya light reflecting on benevolent eyes, 8K ultra cinematic portrait --ar 9:16 --v 6.1",
      textOverlay:
        "Elegant 9:16 vertical card with portrait of smiling Neelkanth Shiva, deep warm amber tones, Sanskrit text space for 'चलत्कुण्डलं भ्रू सुनेत्रं विशालं', gold borders --ar 9:16 --v 6.1",
      cleanArt:
        "Serene digital painting of Lord Shiva with beautiful kind eyes, wearing sacred Rudraksha and tiger skin, soft divine radiance, Himalayan background, pristine realism --ar 9:16 --v 6.1",
      videoPrompt:
        "Soft camera pan across Lord Shiva's smiling face with shimmering ear pendants, soft golden sparkles floating gently in warm breeze, 9:16 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "भगवान शिव का सबसे सुंदर और दयालु स्वरूप कैसा दिखता है? सुनिए रुद्राष्टकम् का यह भावपूर्ण श्लोक!",
      scene1Visual:
        "Ultra-detailed close up of Lord Shiva's smiling, compassionate face with glowing crescent moon and earrings.",
      scene1Voiceover:
        "'चलत्कुण्डलं भ्रू सुनेत्रं विशालं प्रसन्नाननं नीलकण्ठं दयालम्'—शिवजी के कानों में कुण्डल, विशाल नयन और मुख पर सदा वात्सल्यमयी मुस्कान है।",
      scene2Visual:
        "Lord Shiva holding the Halahala poison in throat, turning it into divine cyan radiance.",
      scene2Voiceover:
        "संसार का विष पीकर भी जो सदा कल्याणकारी 'शंकर' बने रहते हैं, वे हमारे हर दुख को हर लेते हैं।",
      scene3Visual:
        "Devotees offering water and flowers to Mahadev with folded hands in pure devotion.",
      scene3Voiceover:
        "ऐसे दयालु भोलेनाथ की कृपा पाने के लिए प्रतिदिन रुद्राष्टकम् का पाठ करें।",
      outroCallToAction:
        "कमेंट में 'ॐ नमः शिवाय' लिखें और इस पावन वीडियो को सभी शिवभक्तों के साथ साझा करें!",
      audioTrackRecommendation: "Melodious Sitar & Flute Accompanied Rudrashtakam Recitation",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • RUDRASHTAKAM",
      handle: "@IndianBhaktiDhara",
      sealText: "श्री रुद्राष्टकम् • श्लोक ४",
      suggestedHashtags: [
        "#Neelkanth",
        "#Rudrashtakam",
        "#Bholenath",
        "#ShivBhakti",
        "#HarHarMahadev",
        "#IndianBhaktiDhara",
      ],
    },
  },

  {
    id: "rudrashtakam_verse_8",
    category: "RUDRASHTAKAM",
    titleHindi: "श्री रुद्राष्टकम् (श्लोक ८ — न जानामि योगं जपं)",
    titleEnglish: "Shri Rudrashtakam — Verse 8 (Na Janami Yogam)",
    verseNumberOrLabel: "श्लोक ८ • श्रीरामचरितमानस उत्तरकाण्ड",
    meterOrChhanda: "भुजङ्गप्रयात छन्द",
    deityFocus: "भगवान शम्भु / आर्तत्राण परायण",
    sacredTextSanskrit: `न जानामि योगं जपं नैव पूजां ।
नतोऽहं सदा सर्वदा शम्भु तुभ्यम् ॥
जराजन्मदुःखौघ तातप्यमानं ।
प्रभो पाहि आपन्नमामीश शम्भो ॥८॥`,
    transliteration:
      "Na jānāmi yogaṁ japaṁ naiva pūjāṁ |\nnato'haṁ sadā sarvadā śambhu tubhyam ||\njarā-janma-duḥkhaugha tātapyamānaṁ |\nprabho pāhi āpan-namāmīśa śambho ||8||",
    wordByWord: [
      { word: "न जानामि (Na Janami)", meaningHindi: "मैं नहीं जानता", meaningEnglish: "I do not know" },
      { word: "योगं जपं (Yogam Japam)", meaningHindi: "न तो योग, न ही जप विधि", meaningEnglish: "Neither Yoga nor the discipline of Japa" },
      { word: "नैव पूजां (Naiva Pujam)", meaningHindi: "और न ही पूजन की गूढ़ विधियां", meaningEnglish: "Nor the rituals of formal worship" },
      { word: "नतोऽहं सदा (Nato'ham Sada)", meaningHindi: "मैं सदा आपको नमन करता हूँ", meaningEnglish: "I simply bow down eternally to You" },
      { word: "शम्भु तुभ्यम् (Shambhu Tubhyam)", meaningHindi: "हे सुखदाता शम्भु, आपके प्रति", meaningEnglish: "Unto You, O Shambhu (giver of joy)" },
      { word: "जराजन्मदुःखौघ (Jara-janma-dukhaugha)", meaningHindi: "वृद्धावस्था, जन्म और दुखों के समूह से", meaningEnglish: "From the agony of birth, old age & worldly griefs" },
      { word: "तातप्यमानं (Tātapyamānam)", meaningHindi: "तपे हुए, जलते हुए मुझ दीन को", meaningEnglish: "Tormented and suffering" },
      { word: "प्रभो पाहि (Prabho Pahi)", meaningHindi: "हे प्रभु! मेरी रक्षा कीजिए", meaningEnglish: "O Lord, protect and save me!" },
    ],
    bhawarthHindi:
      "हे शम्भो! मैं न तो योग जानता हूँ, न जप और न ही पूजा की विधियां जानता हूँ। मैं तो केवल सदा-सर्वदा आपको साष्टांग नमन करता हूँ। हे प्रभो! हे ईशान! हे शम्भो! जन्म, वृद्धावस्था और दुखों के समूह से संतप्त व संकटों में घिरे हुए मुझ दीन-हीन की रक्षा कीजिए, मेरी रक्षा कीजिए!",
    englishMeaning:
      "O Shambhu! I know neither Yoga, nor silent Japa, nor the elaborate rituals of worship. I simply bow down before You at all times and with all my heart. Tormented by the afflictions of birth, old age, disease, and worldly sorrows, I take refuge in You. O Lord! O Ishana! O Shambhu! Protect me from all perils!",
    spiritualGyan:
      "यह श्लोक शरणागति (पूर्ण आत्म-समर्पण) का सर्वोच्च शिखर है। जब भक्त अपनी असमर्थता स्वीकार कर निष्कपट भाव से महादेव को पुकारता है, तो भोलेनाथ बिना किसी अनुष्ठान के तुरंत दौड़े चले आते हैं।",
    practicalLifeApplication:
      "जब पूजा-पाठ का समय न हो या मन अत्यंत विचलित हो, केवल दोनों हाथ जोड़कर इस श्लोक का पाठ करें। यह अहंकार को शून्य कर असीम भगवद्-कृपा को आकर्षित करता है।",
    recommendedChantCount: "प्रतिदिन संकट निवारण हेतु 11 बार",
    imagePrompt916: {
      master:
        "Poignant vertical 9:16 artwork of a humble devotee with folded hands standing in glowing river waters before Lord Shiva who reaches down with benevolent golden light from Mount Kailash, divine aura, misty dawn ambiance, rain of celestial Parijata flowers, ultra emotional masterpiece --ar 9:16 --v 6.1",
      textOverlay:
        "Vertical 9:16 card of divine golden Shivalingam in sanctum surrounded by soft candlelight and mist, open dark space for Sanskrit verse 'न जानामि योगं जपं नैव पूजां', sacred aesthetic --ar 9:16 --v 6.1",
      cleanArt:
        "Spiritual oil painting of Lord Shiva giving Abhaya Mudra to a praying seeker on mountain ledge, golden sunrise rays breaking through clouds, profound bhakti mood --ar 9:16 --v 6.1",
      videoPrompt:
        "Slow motion shot of Bilva leaf falling onto glowing Shiva Lingam as golden blessing light descends from heaven, 9:16 vertical 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "अगर आपको कोई पूजा-पाठ या मंत्र नहीं आता, तो भोलेनाथ को प्रसन्न करने के लिए यह एक श्लोक ही काफी है!",
      scene1Visual:
        "Devotee with tearful joyful eyes bowing before a glowing stone Shiva Lingam in a serene ancient temple.",
      scene1Voiceover:
        "तुलसीदास जी कहते हैं: 'न जानामि योगं जपं नैव पूजां नतोऽहं सदा सर्वदा शम्भु तुभ्यम्।'—हे भोलेनाथ, मुझे कोई कठिन विधि नहीं आती, मैं बस आपको नमन करता हूँ!",
      scene2Visual:
        "Lord Shiva smiling gently and bestowing golden light of protection and fearlessness.",
      scene2Voiceover:
        "महादेव किसी आडंबर के भूखे नहीं हैं; वे केवल आपके शुद्ध भाव और एक लोटा जल से ही रीझ जाते हैं।",
      scene3Visual:
        "Himalayan mountain peaks glowing in early morning sun with Om Namah Shivaya sound frequency.",
      scene3Voiceover:
        "जब भी असहाय महसूस हो, यह श्लोक बोलकर सब कुछ भोलेनाथ पर छोड़ दें। वे आपकी रक्षा अवश्य करेंगे।",
      outroCallToAction:
        "सच्चे मन से 'जय भोलेनाथ' लिखें और इस सरल शरणागति मंत्र को जीवन का आधार बनाएं!",
      audioTrackRecommendation: "Soft Emotional Santoor & Flute Devotional Shiva Theme",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • RUDRASHTAKAM",
      handle: "@IndianBhaktiDhara",
      sealText: "श्री रुद्राष्टकम् • श्लोक ८",
      suggestedHashtags: [
        "#Rudrashtakam",
        "#Sharanagati",
        "#BholeBaba",
        "#ShivStuti",
        "#HarHarMahadev",
        "#IndianBhaktiDhara",
      ],
    },
  },

  // ==========================================
  // SECTION 3: SHIVA PANCHAKSHARA STOTRAM
  // ==========================================
  {
    id: "panchakshara_verse_1_na",
    category: "PANCHAKSHARA",
    titleHindi: "शिव पञ्चाक्षर स्तोत्रम् (अक्षर 'न' — नागेन्द्रहाराय)",
    titleEnglish: "Shiva Panchakshara Stotram — Letter 'NA' (Nagendrahāraya)",
    verseNumberOrLabel: "श्लोक १ • अक्षर 'न' कार",
    meterOrChhanda: "अनुष्टुप् / पञ्चाक्षर छन्द",
    deityFocus: "भगवान महेश्वर / नागभूषण",
    sacredTextSanskrit: `नागेन्द्रहाराय त्रिलोचनाय
भस्माङ्गरागाय महेश्वराय ।
नित्याय शुद्धाय दिगम्बराय
तस्मै 'न'काराय नमः शिवाय ॥१॥`,
    transliteration:
      "Nāgendrahārāya trilocanāya\nbhasmāṅgarāgāya maheśvarāya |\nnityāya śuddhāya digambarāya\ntasmai 'na'kārāya namaḥ śivāya ||1||",
    wordByWord: [
      { word: "नागेन्द्रहाराय (Nagendra-haraya)", meaningHindi: "सर्पराज वासुकि को हार रूप में धारण करने वाले", meaningEnglish: "Adorned with the king of serpents as garland" },
      { word: "त्रिलोचनाय (Trilochanaya)", meaningHindi: "तीन नेत्रों (सूर्य, चंद्र, अग्नि) वाले", meaningEnglish: "Having three eyes (Sun, Moon, Fire)" },
      { word: "भस्माङ्गरागाय (Bhasmanga-ragaya)", meaningHindi: "सारे अंगों पर पवित्र भस्म का लेप लगाने वाले", meaningEnglish: "Whose body is smeared with sacred holy ash" },
      { word: "महेश्वराय (Maheshvaraya)", meaningHindi: "परम महेश्वर, देवताओं के देव", meaningEnglish: "The great supreme Lord" },
      { word: "नित्याय (Nityaya)", meaningHindi: "नित्य, शाश्वत, अविनाशी", meaningEnglish: "Eternal and imperishable" },
      { word: "शुद्धाय (Shuddhaya)", meaningHindi: "परम पावन और निष्कलंक", meaningEnglish: "Ever pure and untainted" },
      { word: "दिगम्बराय (Digambaraya)", meaningHindi: "दिशायें ही जिनके वस्त्र हैं (दिगंबर)", meaningEnglish: "Clothed in the four directions (cosmic vastness)" },
      { word: "तस्मै 'न'काराय (Tasmai Nakāraya)", meaningHindi: "उन 'न' अक्षर स्वरूप शिव को", meaningEnglish: "To that Lord embodied in the sacred letter 'NA'" },
    ],
    bhawarthHindi:
      "जिनके गले में नागराज वासुकि का दिव्य हार है, जो त्रिनेत्रधारी हैं, जिनके सम्पूर्ण अंगों पर पवित्र भस्म का लेप सुशोभित है, जो महेश्वर, नित्य, परम शुद्ध एवं दिगम्बर (दिशारूपी वस्त्र धारण करने वाले) हैं—पंचाक्षर मंत्र के प्रथम अक्षर ‘न’ स्वरूप उन भगवान शिव को मेरा सादर प्रणाम है।",
    englishMeaning:
      "Salutations to the auspicious Shiva, who is embodied in the sacred syllable 'NA'. He wears the king of serpents as His garland, possesses three cosmic eyes, has His limbs smeared with holy ash, is the supreme Lord Maheshvara, eternal, ever-pure, and clothed in the cosmic directions (Digambara).",
    spiritualGyan:
      "‘न’ अक्षर पृथ्वी तत्व का द्योतक है। यह श्लोक सिखाता है कि भस्म (नश्वरता का प्रतीक) और नाग (काल और कुण्डलिनी का प्रतीक) को धारण करने वाले शिव ही समस्त भौतिक जगत के आधार हैं।",
    practicalLifeApplication:
      "प्रातः काल स्नान के उपरांत इस श्लोक का उच्चारण करते हुए मस्तक पर त्रिपुण्ड्र भस्म या चन्दन लगाएं। यह दिन भर सकारात्मक ऊर्जा और एकाग्रता बनाए रखता है।",
    recommendedChantCount: "प्रतिदिन 1 पाठ (पञ्चाक्षर सम्पूर्ण)",
    imagePrompt916: {
      master:
        "Mythological vertical 9:16 painting of Lord Shiva with sacred king cobra Vasuki coiled gracefully around His neck, pure white Vibhuti ash smeared on muscular chest and arms, glowing third eye on forehead, serene majestic aura, Kailash mountains in background, high contrast gold and indigo lighting, 8K render --ar 9:16 --v 6.1",
      textOverlay:
        "Vertical 9:16 devotional card featuring glowing golden letter 'न' above Lord Shiva's trident, obsidian slate background with sacred ash textures, layout for Sanskrit verse 'नागेन्द्रहाराय त्रिलोचनाय' --ar 9:16 --v 6.1",
      cleanArt:
        "Traditional South Indian and Himalayan fusion art of Lord Shiva adorned with serpents and ash, tranquil facial expression, crescent moon crown, rich gold pigments, master oil art --ar 9:16 --v 6.1",
      videoPrompt:
        "Vertical 9:16 slow zoom into sacred Vibhuti ash swirling in air as the golden letter 'NA' forms in divine light, 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "शिव पंचाक्षर स्तोत्र का पहला अक्षर 'न' आपके जीवन में क्या चमत्कार कर सकता है?",
      scene1Visual:
        "Sacred Sanskrit syllable 'न' (NA) radiating golden light and transforming into Lord Shiva with serpent garland.",
      scene1Voiceover:
        "आदि शंकराचार्य रचित यह दिव्य स्तोत्र 'ॐ नमः शिवाय' के 5 अक्षरों का साक्षात दर्शन कराता है।",
      scene2Visual:
        "Lord Shiva with glowing third eye, sacred white holy ash on body, and crescent moon.",
      scene2Voiceover:
        "'नागेन्द्रहाराय त्रिलोचनाय भस्माङ्गरागाय महेश्वराय'—नागराज को हार बनाकर धारण करने वाले और भस्म रमैया शिव ही 'न' स्वरूप हैं।",
      scene3Visual:
        "Devotee feeling grounded, calm, and deeply centered during early morning meditation.",
      scene3Voiceover:
        "'न' अक्षर पृथ्वी तत्व को शुद्ध कर जीवन में स्थिरता, स्वास्थ्य और धैर्य प्रदान करता है।",
      outroCallToAction:
        "पंचाक्षर स्तोत्र के पूरे 5 अक्षरों को जानने के लिए चैनल को फॉलो करें। हर हर महादेव!",
      audioTrackRecommendation: "Sacred Chanting of Shiva Panchakshara Stotram with Temple Bells & Tanpura",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • PANCHAKSHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "शिव पञ्चाक्षर • अक्षर 'न'",
      suggestedHashtags: [
        "#PanchaksharaStotram",
        "#AdiShankaracharya",
        "#OmNamahShivay",
        "#ShivBhakti",
        "#HarHarMahadev",
        "#IndianBhaktiDhara",
      ],
    },
  },

  {
    id: "panchakshara_verse_2_ma",
    category: "PANCHAKSHARA",
    titleHindi: "शिव पञ्चाक्षर स्तोत्रम् (अक्षर 'म' — मन्दाकिनीसलिल)",
    titleEnglish: "Shiva Panchakshara Stotram — Letter 'MA' (Mandakini-Salila)",
    verseNumberOrLabel: "श्लोक २ • अक्षर 'म' कार",
    meterOrChhanda: "अनुष्टुप् / पञ्चाक्षर छन्द",
    deityFocus: "भगवान नन्दीश्वरनाथ / मन्दाकिनी प्रिय",
    sacredTextSanskrit: `मन्दाकिनीसलिलचन्दनचर्चिताय
नन्दीश्वरप्रमथनाथमहेश्वराय ।
मन्दारमुख्यबहुपुष्पसुपूजिताय
तस्मै 'म'काराय नमः शिवाय ॥२॥`,
    transliteration:
      "Mandākinī-salila-candana-carcitāya\nnandīśvara-pramatha-nātha-maheśvarāya |\nmandāra-mukhya-bahu-puṣpa-supūjitāya\ntasmai 'ma'kārāya namaḥ śivāya ||2||",
    wordByWord: [
      { word: "मन्दाकिनीसलिल (Mandakini-salila)", meaningHindi: "आकाशगंगा (मन्दाकिनी) के पावन जल से", meaningEnglish: "With the sacred waters of heavenly river Mandakini" },
      { word: "चन्दनचर्चिताय (Chandana-charcitaya)", meaningHindi: "सुगंधित चन्दन से लेपित", meaningEnglish: "Smeared with fragrant sandalwood paste" },
      { word: "नन्दीश्वरप्रमथनाथ (Nandishvara-pramatha-natha)", meaningHindi: "नंदी एवं प्रमथगणों के स्वामी", meaningEnglish: "Master of Nandi and the Pramatha ganas" },
      { word: "मन्दारमुख्य (Mandara-mukhya)", meaningHindi: "मन्दार आदि श्रेष्ठ पुष्पों से", meaningEnglish: "With foremost celestial Mandara blossoms" },
      { word: "बहुपुष्पसुपूजिताय (Bahu-pushpa-supujitaya)", meaningHindi: "अनेक दिव्य पुष्पों द्वारा विधिवत पूजित", meaningEnglish: "Worshipped with a multitude of holy flowers" },
      { word: "तस्मै 'म'काराय (Tasmai Makāraya)", meaningHindi: "उन 'म' अक्षर स्वरूप शिव को", meaningEnglish: "Unto that Lord embodied in the syllable 'MA'" },
    ],
    bhawarthHindi:
      "जो आकाशगंगा मन्दाकिनी के पवित्र जल और चन्दन से पूजित व चर्चित हैं, जो नंदीश्वर तथा समस्त प्रमथगणों के स्वामी और महेश्वर हैं, तथा जिनकी मन्दार आदि अनेक दिव्य पुष्पों से पूजा की जाती है—पंचाक्षर मंत्र के द्वितीय अक्षर ‘म’ स्वरूप उन भगवान शिव को मेरा नमन है।",
    englishMeaning:
      "Salutations to the auspicious Shiva, embodied in the holy syllable 'MA', who is anointed with the sacred waters of Mandakini (celestial Ganga) and fragrant sandalwood paste, who is the master of Nandi and all Pramatha ganas, and who is lovingly worshipped with divine Mandara flowers.",
    spiritualGyan:
      "‘म’ अक्षर जल तत्व (आपः) का प्रतीक है। जिस प्रकार मन्दाकिनी का जल और चन्दन शीतलता प्रदान करते हैं, उसी प्रकार 'म' कार का ध्यान मन की समस्त जलन, ईर्ष्या और उत्तेजना को शांत कर अमृत रस से भर देता है।",
    practicalLifeApplication:
      "शिवलिंग पर जल या दूध की धारा अर्पित करते समय इस श्लोक का स्मरण करें। यह चित्त को अपार शांति और शीतलता प्रदान करता है।",
    recommendedChantCount: "प्रतिदिन 1 पाठ",
    imagePrompt916: {
      master:
        "Divine vertical 9:16 illustration of heavenly Mandakini river cascading gracefully onto Lord Shiva's matted hair, white Mandara flowers and Bilva leaves floating in crystal water, sandalwood paste tripundra on forehead, loyal bull Nandi resting devotedly by His side, radiant dawn atmosphere, 8K masterpiece --ar 9:16 --v 6.1",
      textOverlay:
        "Aesthetic 9:16 vertical card showing glowing Sanskrit letter 'म' floating in shimmering crystal water droplets, dark emerald and azure background, space for verse 'मन्दाकिनीसलिलचन्दनचर्चिताय' --ar 9:16 --v 6.1",
      cleanArt:
        "Sacred Indian painting of Mahadev being worshipped with Ganga water and celestial flowers, Nandi in foreground, soft morning mist, serene devotional art --ar 9:16 --v 6.1",
      videoPrompt:
        "Water stream of Ganga shimmering in morning sun as it touches Shiva Lingam covered in white flowers and Chandan, 9:16 60fps cinematic --ar 9:16",
    },
    shortsScript60s: {
      hook: "शिवलिंग पर जल चढ़ाते समय यह एक श्लोक बोलने से 100 गुना अधिक फल मिलता है!",
      scene1Visual:
        "Ganga water pouring smoothly from a brass Kalash onto a sacred black granite Shiva Lingam covered in Chandan.",
      scene1Voiceover:
        "'मन्दाकिनीसलिलचन्दनचर्चिताय नन्दीश्वरप्रमथनाथमहेश्वराय'—शिव पंचाक्षर का दूसरा अक्षर है 'म'।",
      scene2Visual:
        "Nandi bull with folded eyes in meditation beside Lord Shiva under celestial Mandara flower shower.",
      scene2Voiceover:
        "यह जल तत्व का प्रतीक है। जब आप जल चढ़ाते हुए इसका पाठ करते हैं, तो मन की सारी अशांति और क्रोध शीतलता में बदल जाते हैं।",
      scene3Visual:
        "A serene smiling face experiencing deep emotional healing and calm.",
      scene3Voiceover:
        "सोमवार को शिवलिंग पर जल अर्पण करते समय इस श्लोक का स्मरण अवश्य करें।",
      outroCallToAction:
        "कमेंट में 'हर हर महादेव' लिखकर अपनी भक्ति व्यक्त करें और वीडियो को सेव कर लें!",
      audioTrackRecommendation: "Rhythmic Sanskrit Chanting with Temple Bells & Sound of Flowing Water",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • PANCHAKSHARA",
      handle: "@IndianBhaktiDhara",
      sealText: "शिव पञ्चाक्षर • अक्षर 'म'",
      suggestedHashtags: [
        "#Panchakshara",
        "#JalAbhishek",
        "#Mandakini",
        "#NandiMaharaj",
        "#ShivStotram",
        "#HarHarMahadev",
      ],
    },
  },

  // ==========================================
  // SECTION 4: SRI LINGASHTAKAM
  // ==========================================
  {
    id: "lingashtakam_verse_1",
    category: "LINGASHTAKAM",
    titleHindi: "श्री लिङ्गाष्टकम् (श्लोक १ — ब्रह्ममुरारिसुरार्चित)",
    titleEnglish: "Shri Lingashtakam — Verse 1 (Brahma-Murari-Surarchita)",
    verseNumberOrLabel: "श्लोक १ • आदि शंकराचार्य विरचित",
    meterOrChhanda: "अनुष्टुप् छन्द",
    deityFocus: "सदाशिव लिङ्गम्",
    sacredTextSanskrit: `ब्रह्ममुरारिसुरार्चितलिङ्गं
निर्मलभासितशोभितलिङ्गम् ।
जन्मजदुःखविनाशकलिङ्गं
तत् प्रणमामि सदाशिवलिङ्गम् ॥१॥`,
    transliteration:
      "Brahma-murāri-surārcita-liṅgaṁ\nnirmala-bhāsita-śobhita-liṅgam |\njanmaja-duḥkha-vināśaka-liṅgaṁ\ntat praṇamāmi sadāśiva-liṅgam ||1||",
    wordByWord: [
      { word: "ब्रह्ममुरारिसुरार्चित (Brahma-murari-surarchita)", meaningHindi: "ब्रह्मा, विष्णु (मुरारि) एवं समस्त देवगणों द्वारा पूजित", meaningEnglish: "Worshipped by Brahma, Vishnu (Murari) and all gods" },
      { word: "निर्मलभासित (Nirmala-bhasita)", meaningHindi: "अत्यंत निर्मल, शुद्ध और ज्योतिर्मय", meaningEnglish: "Ever-pure, radiant and glowing" },
      { word: "शोभितलिङ्गम् (Shobhita-lingam)", meaningHindi: "दिव्य शोभा से युक्त शिवलिंग", meaningEnglish: "Exquisitely adorned Shiva Lingam" },
      { word: "जन्मजदुःखविनाशक (Janmaja-duhkha-vinashaka)", meaningHindi: "जन्म-जन्मांतर के समस्त दुखों का विनाश करने वाला", meaningEnglish: "Destroyer of the sorrows born of worldly rebirth" },
      { word: "तत् प्रणमामि (Tat Pranamami)", meaningHindi: "उस पावन लिंग को मैं प्रणाम करता हूँ", meaningEnglish: "Unto that I bow down with utmost reverence" },
      { word: "सदाशिवलिङ्गम् (Sadashiva-lingam)", meaningHindi: "परम कल्याणमय सदाशिव लिंग को", meaningEnglish: "The eternal, auspicious Sadashiva Lingam" },
    ],
    bhawarthHindi:
      "जो शिवलिंग ब्रह्मा, विष्णु और समस्त देवगणों द्वारा पूजित है, जो परम निर्मल, दिव्य कांति से सुशोभित और प्रकाशित है, तथा जो जन्म-मरण के चक्र से उत्पन्न समस्त दुखों का नाश करने वाला है—उस परम पावन सदाशिव लिंग को मैं कोटि-कोटि प्रणाम करता हूँ।",
    englishMeaning:
      "I bow before the eternal Sadashiva Lingam, which is reverently worshipped by Lord Brahma, Lord Vishnu (Murari), and all the celestial deities. It is pure, radiant with supreme luminescence, exquisitely adorned, and the ultimate destroyer of all miseries born of cycle of births.",
    spiritualGyan:
      "शिवलिंग निराकार ब्रह्म का साकार प्रतीक है। 'लिङ्ग' का अर्थ है 'लय' और 'गम'—जिसमें सम्पूर्ण ब्रह्मांड लीन होता है और जिससे पुनः प्रकट होता है। यह लिंगाष्टकम मोक्ष का मार्ग प्रशस्त करता है।",
    practicalLifeApplication:
      "घर के पूजा स्थान या मन्दिर में शिवलिंग पर एक लोटा जल या बेलपत्र अर्पित करते समय इस श्लोक का गान करें। यह परिवार में सुख-शांति और बाधा निवारण में अत्यंत फलदायी है।",
    recommendedChantCount: "प्रतिदिन 1 या 8 पाठ (अभिषेक के समय)",
    imagePrompt916: {
      master:
        "Majestic vertical 9:16 scene of a magnificent glowing black marble Shiva Lingam adorned with fresh green Bilva leaves and golden water droplets, soft rays of celestial light descending from above, Lord Brahma and Lord Vishnu standing in subtle golden aura offering flowers, ancient stone temple sanctum, 8K ultra realism --ar 9:16 --v 6.1",
      textOverlay:
        "Sanctified 9:16 vertical card with centered glowing Shiva Lingam bathed in milk and flowers, dark bronze and golden temple backdrop, designated area for Sanskrit verse 'ब्रह्ममुरारिसुरार्चितलिङ्गं' --ar 9:16 --v 6.1",
      cleanArt:
        "Sacred Indian classical temple painting of Sadashiva Lingam, illuminated by brass oil lamps (Diyas), divine sandalwood paste tripundra, flower garlands, hyper detailed devotional artwork --ar 9:16 --v 6.1",
      videoPrompt:
        "Vertical 9:16 camera orbiting slowly around a radiant Shiva Lingam while Bilva leaves fall in slow motion through beams of golden sunlight, 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "ब्रह्मा और विष्णु जी भी जिस पावन शिवलिंग की पूजा करते हैं, उसका रहस्य क्या है?",
      scene1Visual:
        "Cosmic column of infinite light (Jyotirlinga) appearing before Lord Brahma and Lord Vishnu who bow in awe.",
      scene1Voiceover:
        "आदि शंकराचार्य कहते हैं: 'ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम्'—यह लिंग समस्त देवों द्वारा पूजित है।",
      scene2Visual:
        "A devotee offering a single tripartite Bilva leaf on the Shiva Lingam with deep bhakti.",
      scene2Voiceover:
        "यह केवल एक मूर्ति नहीं, बल्कि जन्म-जन्मांतर के संचित पापों और दुखों को नष्ट करने वाला साक्षात् ब्रह्मांडीय केंद्र है।",
      scene3Visual:
        "Devotee's home filled with light, prosperity, and peace as bells chime in temple.",
      scene3Voiceover:
        "प्रतिदिन एक बार 'लिङ्गाष्टकम्' का पाठ करने से घर में सुख, शांति और सकारात्मक ऊर्जा का वास होता है।",
      outroCallToAction:
        "कमेंट में 'हर हर महादेव' लिखें और इस पावन स्तोत्र को अपने परिवार के साथ अवश्य साझा करें!",
      audioTrackRecommendation: "Authentic Chanting of Lingashtakam with Temple Ghanta & Shankha Naad",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • LINGASHTAKAM",
      handle: "@IndianBhaktiDhara",
      sealText: "श्री लिङ्गाष्टकम् • श्लोक १",
      suggestedHashtags: [
        "#Lingashtakam",
        "#ShivaLingam",
        "#AdiShankaracharya",
        "#ShivPooja",
        "#HarHarMahadev",
        "#IndianBhaktiDhara",
      ],
    },
  },

  {
    id: "lingashtakam_verse_2",
    category: "LINGASHTAKAM",
    titleHindi: "श्री लिङ्गाष्टकम् (श्लोक २ — देवमुनिप्रवरार्चित)",
    titleEnglish: "Shri Lingashtakam — Verse 2 (Devamuni-Pravararchita)",
    verseNumberOrLabel: "श्लोक २ • आदि शंकराचार्य विरचित",
    meterOrChhanda: "अनुष्टुप् छन्द",
    deityFocus: "कामदह / करुणाकर सदाशिव",
    sacredTextSanskrit: `देवमुनिप्रवरार्चितलिङ्गं
कामदहं करुणाकरलिङ्गम् ।
रावणदर्पविनाशनलिङ्गं
तत् प्रणमामि सदाशिवलिङ्गम् ॥२॥`,
    transliteration:
      "Deva-muni-pravarārcita-liṅgaṁ\nkāma-dahaṁ karuṇākara-liṅgam |\nrāvaṇa-darpa-vināśana-liṅgaṁ\ntat praṇamāmi sadāśiva-liṅgam ||2||",
    wordByWord: [
      { word: "देवमुनिप्रवरार्चित (Devamuni-pravararchita)", meaningHindi: "श्रेष्ठ देवताओं और महान ऋषियों द्वारा पूजित", meaningEnglish: "Worshipped by foremost gods and great sages" },
      { word: "कामदहं (Kama-daham)", meaningHindi: "कामदेव (वासना/काम) को भस्म करने वाला", meaningEnglish: "The consumer of Kamadeva (desire/lust)" },
      { word: "करुणाकरलिङ्गम् (Karunakara-lingam)", meaningHindi: "अपार करुणा और दया का सागर", meaningEnglish: "The boundless ocean of compassion" },
      { word: "रावणदर्पविनाशन (Ravana-darpa-vinashana)", meaningHindi: "दशानन रावण के अहंकार का मर्दन करने वाला", meaningEnglish: "Destroyer of the pride and arrogance of Ravana" },
      { word: "तत् प्रणमामि (Tat Pranamami)", meaningHindi: "उस लिंग को मैं नमन करता हूँ", meaningEnglish: "To that I bow down" },
      { word: "सदाशिवलिङ्गम् (Sadashiva-lingam)", meaningHindi: "परम पावन सदाशिव लिंग को", meaningEnglish: "Unto the holy Sadashiva Lingam" },
    ],
    bhawarthHindi:
      "जो श्रेष्ठ देवताओं और तपस्वी मुनियों द्वारा पूजित है, जिसने कामदेव को अपने तीसरे नेत्र की ज्वाला से भस्म कर दिया, जो करुणा और दया की खान है, तथा जिसने कैलाश उठाने वाले अहंकारी रावण के दर्प (घमंड) को चूर-चूर कर दिया—उस सदाशिव लिंग को मैं प्रणाम करता हूँ।",
    englishMeaning:
      "I bow before the auspicious Sadashiva Lingam, adored by the greatest gods and sages. It burnt Kamadeva (the god of desire) to ashes with ascetic power, radiates infinite compassion, and crushed the supreme ego and arrogance of Ravana beneath Mount Kailash.",
    spiritualGyan:
      "भगवान शिव काम (वासना) और दर्प (अहंकार) दोनों का संहार करते हैं, किंतु साथ ही वे 'करुणाकर' हैं—रावण द्वारा स्तुति करने पर उन्होंने उसे चंद्रहास खड्ग भी प्रदान किया।",
    practicalLifeApplication:
      "जब भी मन में काम-वासना के विचार या अहंकार का उदय हो, इस श्लोक का स्मरण करें। यह आत्म-नियंत्रण और अंतःकरण की शुद्धि करता है।",
    recommendedChantCount: "प्रतिदिन 1 पाठ",
    imagePrompt916: {
      master:
        "Epic vertical 9:16 scene of Lord Shiva's divine foot gently touching Mount Kailash, crushing arrogance while glowing with golden grace, the sacred Shiva Lingam in the foreground glowing with celestial blue flame, 8K hyper detailed render --ar 9:16 --v 6.1",
      textOverlay:
        "Vertical 9:16 sacred card with glowing third-eye flame aura behind a stone Shiva Lingam, gold text space for 'कामदहं करुणाकरलिङ्गम्', obsidian temple backdrop --ar 9:16 --v 6.1",
      cleanArt:
        "Devotional art of Shiva Lingam being worshipped by ancient Vedic Rishis in Himalayan forest ashram, soft morning sun, fragrant incense smoke drifting, spiritual realism --ar 9:16 --v 6.1",
      videoPrompt:
        "Gentle camera rising from incense smoke curling around a Shiva Lingam adorned with Bilva leaves, 9:16 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "जब रावण ने कैलाश पर्वत उठाने का घमंड किया, तब महादेव ने क्या किया?",
      scene1Visual:
        "Ravana trying to lift Mount Kailash with 20 arms in fierce pride.",
      scene1Voiceover:
        "'रावणदर्पविनाशनलिङ्गं तत् प्रणमामि सदाशिवलिङ्गम्'—महादेव ने केवल अपने पैर के अंगूठे के स्पर्श से रावण का अहंकार चूर कर दिया।",
      scene2Visual:
        "Lord Shiva smiling benevolently as Ravana composes the Shiva Tandava Stotram in total surrender.",
      scene2Voiceover:
        "वे कामदेव को भस्म करने वाले भी हैं और शरणागत पर असीम करुणा बरसाने वाले दयानिधि भी हैं।",
      scene3Visual:
        "Shivling glowing in blue and gold aura, providing peace to all seekers.",
      scene3Voiceover:
        "अपने जीवन से अहंकार मिटाने और आत्मबल पाने के लिए रोज लिङ्गाष्टकम् का पाठ करें।",
      outroCallToAction:
        "कमेंट में 'ॐ नमः शिवाय' लिखें और इस ज्ञानवर्धक वीडियो को शेयर करें!",
      audioTrackRecommendation: "Deep Powerful Sanskrit Vedic Recitation with Dumroo & Shankh",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • LINGASHTAKAM",
      handle: "@IndianBhaktiDhara",
      sealText: "श्री लिङ्गाष्टकम् • श्लोक २",
      suggestedHashtags: [
        "#Lingashtakam",
        "#RavanaDarpa",
        "#KailashPati",
        "#ShivStuti",
        "#HarHarMahadev",
        "#IndianBhaktiDhara",
      ],
    },
  },

  // ==========================================
  // SECTION 5: SHIVA TANDAVA STOTRAM
  // ==========================================
  {
    id: "shiva_tandava_verse_1",
    category: "SHIVA_TANDAVA",
    titleHindi: "श्री शिव ताण्डव स्तोत्रम् (श्लोक १ — जटाटवीगलज्जल)",
    titleEnglish: "Shiva Tandava Stotram — Verse 1 (Jatātavī-Galajjala)",
    verseNumberOrLabel: "श्लोक १ • रावण कृत ताण्डव स्तोत्र",
    meterOrChhanda: "पञ्चचामर छन्द",
    deityFocus: "भगवान नटराज / ताण्डव मूर्ति",
    sacredTextSanskrit: `जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥१॥`,
    transliteration:
      "Jaṭāṭavī-galaj-jala-pravāha-pāvita-sthale\ngale'valambya lambitāṁ bhujaṅga-tuṅga-mālikām |\nḍamad-ḍamad-ḍamad-ḍaman-ninādavad-ḍamarvayaṁ\ncakāra caṇḍa-tāṇḍavaṁ tanotu naḥ śivaḥ śivam ||1||",
    wordByWord: [
      { word: "जटाटवी (Jatātavī)", meaningHindi: "जटारूपी सघन वन (जंगल)", meaningEnglish: "The dense forest of matted locks" },
      { word: "गलज्जलप्रवाह (Galaj-jala-pravāha)", meaningHindi: "बहती हुई पावन गंगा की जलधारा से", meaningEnglish: "Cascading streams of holy water (Ganga)" },
      { word: "पावितस्थले (Pāvita-sthale)", meaningHindi: "पवित्र किए गए गले के स्थान पर", meaningEnglish: "Purified neck and shoulders region" },
      { word: "भुजङ्गतुङ्गमालिकाम् (Bhujaṅga-tuṅga-mālikām)", meaningHindi: "विशाल नागराज की लटकती हुई माला", meaningEnglish: "The great lofty garland of coiled serpents" },
      { word: "डमड्डमड्डमड्डमत् (Damad-damad-damad-damat)", meaningHindi: "डम-डम की प्रचण्ड ध्वनि करता हुआ", meaningEnglish: "With the resonant rhythmic sound Damad-Damad" },
      { word: "चण्डताण्डवं चकार (Chanda-tandavam Chakara)", meaningHindi: "जिन्होंने प्रचण्ड ताण्डव नृत्य किया", meaningEnglish: "Who performed the fierce cosmic Tandava dance" },
      { word: "तनोतु नः शिवः शिवम् (Tanotu Nah Shivah Shivam)", meaningHindi: "वे भगवान शिव हमारा परम कल्याण विस्तार करें", meaningEnglish: "May that auspicious Shiva expand our ultimate bliss!" },
    ],
    bhawarthHindi:
      "जिनके जटारूपी सघन वन से निकलती हुई गंगाजी के जल-प्रवाह से जिनका कंठ-प्रदेश परम पवित्र हो रहा है, जिनके गले में विशाल सर्पों की लम्बी माला लटक रही है, तथा जो डमरू के 'डमड्-डमड्-डमड्' नाद के साथ प्रचण्ड ताण्डव नृत्य कर रहे हैं—वे भगवान शिव हम सब पर परम कल्याण और शुभता का विस्तार करें।",
    englishMeaning:
      "With His neck consecrated by the flow of water cascading from the dense forest of His matted locks, wearing a lofty garland of great serpents, Lord Shiva performs His fierce cosmic Tandava dance to the resonant beats of His Damaru (damad-damad-damad). May that auspicious Lord bestow upon us eternal bliss and auspiciousness!",
    spiritualGyan:
      "शिव ताण्डव स्तोत्र का पञ्चचामर छन्द ब्रह्मांडीय स्पंदन (Cosmic Resonance) उत्पन्न करता है। यह श्लोक अकर्मण्यता, अवसाद और आलस्य को नष्ट कर प्रचंड सकारात्मक ऊर्जा का संचार करता है।",
    practicalLifeApplication:
      "व्यायाम, योग या मानसिक रूप से थकान के समय इस स्तोत्र का उच्च स्वर में पाठ या श्रवण करें। यह रक्तचाप को संतुलित कर स्फूर्ति और निर्भयता लाता है।",
    recommendedChantCount: "प्रदोष काल में 1 या 11 पाठ",
    imagePrompt916: {
      master:
        "Epic vertical 9:16 cinematic spectacle of Lord Nataraja Shiva performing cosmic Tandava dance, ring of cosmic fire Prabhamandala surrounding Him, matted Jata hair locks flying wildly with celestial river Ganga erupting in shimmering diamond water spray, Damru vibrating with visible sound shockwaves, fiery embers and stardust galaxies swirling, ultra dynamic 8K Unreal Engine 5 render --ar 9:16 --v 6.1 --stylize 400",
      textOverlay:
        "Vertical 9:16 fiery cosmic card of Nataraja in Tandava pose with blazing fire ring, dark charcoal and glowing orange ember backdrop, center layout for Sanskrit 'जटाटवीगलज्जलप्रवाहपावितस्थले', gold borders --ar 9:16 --v 6.1",
      cleanArt:
        "Masterpiece oil painting of Lord Shiva dancing Tandava on mountain summit under lightning and starlight, sacred serpents coiled, intense focused third-eye gaze, muscular athletic dynamism, high aesthetic devotional art --ar 9:16 --v 6.1",
      videoPrompt:
        "Vertical 9:16 dynamic camera circling Lord Shiva performing the cosmic Tandava, Damru beating with sonic waves vibrating through dark space and glowing stardust, 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "रावण द्वारा रचित शिव ताण्डव स्तोत्र का पहला श्लोक सुनते ही रोंगटे क्यों खड़े हो जाते हैं?",
      scene1Visual:
        "Lord Nataraja surrounded by a cosmic ring of fire, hair locks flying wildly as Ganga bursts forth with immense power.",
      scene1Voiceover:
        "'जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्'—यह पञ्चचामर छन्द ब्रह्मांड की सबसे शक्तिशाली ध्वनि तरंग है।",
      scene2Visual:
        "Lord Shiva beating the Damru producing visible golden sound shockwaves that shatter darkness.",
      scene2Voiceover:
        "डमरू के 'डमड्-डमड्' नाद के साथ जब महादेव ताण्डव करते हैं, तो समस्त नकारात्मक ऊर्जा और आलस्य भस्म हो जाते हैं।",
      scene3Visual:
        "Devotee feeling an immense surge of inner strength, focus, and divine power.",
      scene3Voiceover:
        "प्रदोष काल में इसका श्रवण या पाठ करने से वाक्-सिद्धि और असीम आत्मबल प्राप्त होता है।",
      outroCallToAction:
        "कमेंट में 'हर हर महादेव' की गूंज लगाएं और इस शक्तिशाली स्तोत्र को अपने प्रियजनों से शेयर करें!",
      audioTrackRecommendation: "High-BPM Traditional Shiva Tandava Stotram with Intense Damru & Pakhawaj",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • SHIVA TANDAVA",
      handle: "@IndianBhaktiDhara",
      sealText: "शिव ताण्डव स्तोत्रम् • श्लोक १",
      suggestedHashtags: [
        "#ShivaTandava",
        "#Nataraja",
        "#RavanaStotram",
        "#TandavStotram",
        "#HarHarMahadev",
        "#IndianBhaktiDhara",
      ],
    },
  },

  {
    id: "shiva_tandava_verse_2",
    category: "SHIVA_TANDAVA",
    titleHindi: "श्री शिव ताण्डव स्तोत्रम् (श्लोक २ — जटाकटाहसम्भ्रम)",
    titleEnglish: "Shiva Tandava Stotram — Verse 2 (Jatā-Katāha-Sambhrama)",
    verseNumberOrLabel: "श्लोक २ • रावण कृत ताण्डव स्तोत्र",
    meterOrChhanda: "पञ्चचामर छन्द",
    deityFocus: "भगवान चन्द्रमौलि / गङ्गाधर",
    sacredTextSanskrit: `जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-
विलोलवीचिवल्लरीविराजमानमूर्धनि ।
धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके
किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥२॥`,
    transliteration:
      "Jaṭā-kaṭāha-sambhrama-bhraman-nilimpa-nirjharī-\nvilola-vīci-vallarī-virājamāna-mūrdhani |\ndhagad-dhagad-dhagaj-jvalal-lalāṭa-paṭṭa-pāvake\nkiśora-candra-śekhare ratiḥ pratikṣaṇaṁ mama ||2||",
    wordByWord: [
      { word: "जटाकटाह (Jatā-katāha)", meaningHindi: "जटाओं के कड़ाह (घुंघराले भंवर) में", meaningEnglish: "In the cauldron of matted tangled locks" },
      { word: "निलिम्पनिर्झरी (Nilimpa-nirjharī)", meaningHindi: "देवताओं की पावन नदी (आकाशगंगा/सुरसरि)", meaningEnglish: "The river of the gods (celestial Ganga)" },
      { word: "विलोलवीचि (Vilola-vīci)", meaningHindi: "चंचल और उछलती हुई तरंगों की लताएं", meaningEnglish: "Playful swirling waves and ripples" },
      { word: "विराजमानमूर्धनि (Virājamāna-mūrdhani)", meaningHindi: "मस्तक पर शोभायमान", meaningEnglish: "Shining upon His glorious head" },
      { word: "धगद्धगद्धगत् (Dhagad-dhagad-dhagat)", meaningHindi: "धक्-धक् करके प्रचंड प्रज्वलित होती हुई", meaningEnglish: "Blazing fiercely with glowing fire" },
      { word: "ललाटपट्टपावके (Lalāta-patta-pāvake)", meaningHindi: "मस्तक के तीसरे नेत्र की अग्नि ज्वाला में", meaningEnglish: "The fire on the altar of His forehead (Third Eye)" },
      { word: "किशोरचन्द्रशेखरे (Kishora-candra-śekhare)", meaningHindi: "मस्तक पर बाल-चन्द्र धारण करने वाले शिव में", meaningEnglish: "In Lord Shiva who wears the young crescent moon" },
      { word: "रतिः प्रतिक्षणं मम (Ratih Pratikshanam Mama)", meaningHindi: "मेरा अनन्य प्रेम प्रति क्षण बना रहे", meaningEnglish: "May my deep love and devotion remain every moment!" },
    ],
    bhawarthHindi:
      "जिनके जटारूपी कड़ाह में चक्कर खाती हुई आकाशगंगा की चंचल लहरें मस्तक पर सुशोभित हो रही हैं, जिनके ललाट के तीसरे नेत्र में 'धगद्-धगद्' करती हुई प्रचंड अग्नि ज्वाला प्रज्वलित है, और जिनके मस्तक पर बाल-चन्द्रमा मुकुट की भांति शोभा पा रहे हैं—उन देवाधिदेव महादेव में मेरा प्रेम प्रतिक्षण बढ़ता रहे!",
    englishMeaning:
      "May my deep devotion increase at every moment for Lord Shiva, upon whose head the celestial Ganga swirls in playful waves amidst His dense locks, upon whose forehead the third eye blazes with fierce fire ('dhagad-dhagad-dhagat'), and who is crowned with the gentle young crescent moon!",
    spiritualGyan:
      "यह श्लोक अग्नि (तीसरा नेत्र) और जल (गंगाजी) के अद्भुत संतुलन को दर्शाता है। जहां अग्नि समस्त बुराइयों का दहन करती है, वहीं गंगा और चन्द्रमा परम शांति और शीतलता का संचार करते हैं।",
    practicalLifeApplication:
      "जब भी मन में आंतरिक द्वंद्व या उथल-पुथल हो, भगवान शिव के इस अग्नि-जल संतुलन का ध्यान करें। यह तीव्र एकाग्रता और शांत मनःस्थिति प्रदान करता है।",
    recommendedChantCount: "प्रतिदिन 1 पाठ",
    imagePrompt916: {
      master:
        "Mesmerizing vertical 9:16 close-up of Lord Shiva's forehead, third eye opening slightly radiating golden solar flames, crescent moon glowing like pearl on dark blue hair, holy Ganga river droplets glowing with bioluminescent starlight, high octane photorealism, award-winning cinematic lighting --ar 9:16 --v 6.1",
      textOverlay:
        "Vertical 9:16 sacred card showing cosmic third eye fire and swirling Ganga water, deep sapphire and fiery amber contrast, designated gold frame for 'धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके' --ar 9:16 --v 6.1",
      cleanArt:
        "Stunning devotional oil painting of Lord Chandrashekhara, glowing crescent moon, raging third eye fire, tranquil sublime facial expression, master spiritual artist style --ar 9:16 --v 6.1",
      videoPrompt:
        "Vertical 9:16 cinematic camera zoom into the radiant crescent moon on Lord Shiva's hair locks as water and stardust swirl in cosmic harmony, 60fps --ar 9:16",
    },
    shortsScript60s: {
      hook: "अग्नि और जल—ये दोनों परस्पर विरोधी शक्तियां भगवान शिव के मस्तक पर एक साथ कैसे रहती हैं?",
      scene1Visual:
        "Forehead of Lord Shiva showing blazing third eye fire alongside gentle cool Ganga water and crescent moon.",
      scene1Voiceover:
        "'धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम'—एक तरफ प्रलयंकारी अग्नि, दूसरी तरफ शीतलता की देवी गंगा!",
      scene2Visual:
        "Cosmic balance forming a protective yin-yang like mandala of blue ice and golden fire.",
      scene2Voiceover:
        "रावण कहता है—जो विनाशक अग्नि और सृजनकारी जल दोनों को अपने मस्तक पर धारण कर संतुलित रखते हैं, वे ही महादेव हैं।",
      scene3Visual:
        "A peaceful meditator achieving balance of passion and calm in daily life.",
      scene3Voiceover:
        "जब जीवन में क्रोध और भ्रम बढ़े, तो शिवजी के इस स्वरूप का ध्यान करें।",
      outroCallToAction:
        "कमेंट में 'हर हर महादेव' लिखें और इस अलौकिक रहस्य को अपने मित्रों तक पहुंचाएं!",
      audioTrackRecommendation: "Powerful Fusion Shiva Tandava Stotram with Classical Mridangam & Electric Sitar",
    },
    channelBranding: {
      watermarkText: "INDIAN BHAKTI DHARA • SHIVA TANDAVA",
      handle: "@IndianBhaktiDhara",
      sealText: "शिव ताण्डव स्तोत्रम् • श्लोक २",
      suggestedHashtags: [
        "#ShivaTandava",
        "#ThirdEye",
        "#Chandrashekhar",
        "#HarHarMahadev",
        "#ShivBhakti",
        "#IndianBhaktiDhara",
      ],
    },
  },
];
