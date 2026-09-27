/**
 * Ported from the English course, combining:
 *   level3/module1/section4/Sub1.tsx
 *   level2/module5/section3/Sub3.tsx
 *
 * The Welsh Level 3 qualification covers this material, so the teaching is
 * carried into this course rather than sending a learner out to read it in
 * another one. The text is unchanged; only the page shell was removed.
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';

const checks = [
  {
    id: 'l3-m1-s4-sub1-pictograms',
    question: 'How many CLP / GHS hazard pictograms exist?',
    options: [
      'Six — a single pictogram for each of the main hazard families (fire, toxicity, corrosion, explosion, environment, pressure).',
      'Nine — each a red-bordered diamond, supplemented by hazard statements (H-codes) and precautionary statements (P-codes).',
      "Twelve — one for each month of the substance's shelf life, indicating how its hazard changes over time.",
      'Three — danger, warning and caution, in descending order of severity of the hazard involved.',
    ],
    correctIndex: 1,
    explanation:
      "Nine pictograms in the GB CLP Regulation (UK's implementation post-Brexit; aligned with EU CLP): explosive, flammable, oxidising, gas under pressure, corrosive, acute toxicity, harmful / irritant, health hazard (chronic) and environmental. Knowing all nine and their headline meanings is L3-essential.",
  },
  {
    id: 'l3-m1-s4-sub1-sds',
    question: "What's an SDS and why is the L3 reading it, not just the label?",
    options: [
      'A Site Disposal Statement — a one-page note recording how a substance was disposed of after use.',
      'A Substance Delivery Schedule — a list of when hazardous chemicals will arrive and be unloaded on site.',
      'Safety Data Sheet — a 16-section supplier document giving the operational detail behind the label headlines.',
      'A Safe Distance Sign — the notice fixed near a stored chemical telling workers how far to stand back.',
    ],
    correctIndex: 2,
    explanation:
      'The SDS is the operational reference. Its 16 sections cover identification, hazard ID, composition, first aid, fire fighting, accidental release, handling and storage, exposure controls and PPE, physical and chemical properties, stability, toxicology, ecology, disposal, transport and regulation. The label gives headlines; the SDS gives the detail. The L3 supervisor reads it before substances come on site and ensures it is available to operatives.',
  },
  {
    id: 'l3-m1-s4-sub1-health',
    question: 'Which pictogram covers carcinogens, mutagens and reproductive toxins?',
    options: [
      'Health hazard pictogram — the silhouetted figure with a star burst on the chest, covering chronic health risks.',
      'Skull and crossbones pictogram — the symbol for any substance that can cause cancer or harm fertility.',
      'Exclamation mark pictogram — the symbol used for all long-term and chronic health hazards generally.',
      'Corrosion pictogram — the symbol covering substances that damage cells and tissue over time slowly.',
    ],
    correctIndex: 0,
    explanation:
      'Health hazard ≠ skull. The health-hazard pictogram (silhouetted figure with star burst) covers carcinogenicity, mutagenicity, reproductive toxicity, respiratory sensitisation, target organ toxicity and aspiration hazard. The skull means acute toxicity (short-term); the silhouetted figure means chronic / long-term. The distinction matters because the management strategy differs.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does GB CLP stand for?',
    options: [
      'Great Britain Construction Labour Plan — the framework for organising trades on a construction site.',
      'Great Britain Classification, Labelling and Packaging Regulation — the UK rules for hazardous chemicals.',
      'Great Britain Competent Labelling Procedure — the method for marking electrical circuits at a consumer unit.',
      'Great Britain Chemical Licensing Permit — the licence needed to store hazardous substances on site.',
    ],
    correctAnswer: 1,
    explanation:
      "GB CLP is the UK's post-Brexit implementation of the CLP rules (formerly EU CLP), aligned with the UN Globally Harmonised System (GHS). It defines how hazardous chemicals must be classified, labelled and packaged for supply.",
  },
  {
    id: 2,
    question: 'What does the "exploding bomb" pictogram indicate?',
    options: [
      'Gases stored under pressure that can burst their container if heated.',
      'Substances that intensify an existing fire by releasing oxygen as they burn.',
      'Explosives, self-reactive substances and organic peroxides — anything that can detonate.',
      'Substances that are acutely toxic and can kill through a single short exposure.',
    ],
    correctAnswer: 2,
    explanation:
      'The exploding-bomb pictogram covers explosive substances and articles, self-reactive substances, and organic peroxides — anything that can detonate or undergo violent self-reactive decomposition. Rare in electrical work, but check labels.',
  },
  {
    id: 3,
    question: 'What does the "flame" pictogram indicate?',
    options: [
      'Substances that are harmful to the aquatic environment and aquatic life.',
      'Substances that cause skin burns and are corrosive to metals.',
      'Substances that release oxygen and intensify an existing fire.',
      'Flammable substances — gases, aerosols, liquids and solids that catch fire readily.',
    ],
    correctAnswer: 3,
    explanation:
      'The flame pictogram covers flammable gases, aerosols, liquids and solids; pyrophoric substances (catch fire on contact with air); self-heating substances; and substances which emit flammable gases on contact with water. Common in solvents, cleaners and contact sprays.',
  },
  {
    id: 4,
    question: 'What does the "flame over circle" pictogram indicate?',
    options: [
      'Oxidisers — substances that release oxygen and can intensify fire. Includes oxidising gases, liquids, solids.',
      'Flammable substances that ignite easily when exposed to a spark or flame.',
      'Gases stored under pressure in a cylinder.',
      'Substances that cause long-term harm to health, such as carcinogens.',
    ],
    correctAnswer: 0,
    explanation: 'Oxidisers feed fire. Stored separately from flammables.',
  },
  {
    id: 5,
    question: 'What does the "skull and crossbones" pictogram indicate?',
    options: [
      'A substance that is corrosive to skin, eyes and metals.',
      'Acute toxicity — substances harmful by a single short-term exposure (oral, dermal or inhalation).',
      'A substance that causes long-term or chronic harm such as cancer.',
      'A substance that is mildly harmful or an irritant to skin and eyes.',
    ],
    correctAnswer: 1,
    explanation:
      'Acute toxicity means short-term harm from a single or short exposure (oral, dermal or inhalation), including acutely toxic gases, liquids and solids. It is distinguished from chronic / long-term toxicity, which needs a different management strategy.',
  },
  {
    id: 6,
    question: 'What does the "corrosion" pictogram indicate?',
    options: [
      'A substance that is acutely toxic by a single short exposure.',
      'A substance that is harmful to the aquatic environment.',
      'Corrosive substances — cause skin burns and eye damage, and are corrosive to metals.',
      'A substance that is flammable and ignites easily.',
    ],
    correctAnswer: 2,
    explanation:
      'The corrosion pictogram covers substances that cause skin burns and eye damage and are corrosive to metals, including strong acids and bases. Splash exposure or eye contact requires an immediate eye-wash / shower response, so an eye-wash kit and emergency shower matter for sites handling them.',
  },
  {
    id: 7,
    question: 'What does the "exclamation mark" pictogram indicate?',
    options: [
      'A substance that is acutely toxic and can cause death from a single exposure.',
      'A substance that causes long-term health effects such as cancer or organ damage.',
      'A substance that is corrosive and causes severe skin and eye burns.',
      'Harmful / irritant — lower-severity hazards such as irritation, sensitisation and narcotic effects.',
    ],
    correctAnswer: 3,
    explanation:
      'The exclamation-mark pictogram covers harmful / irritant substances: acute toxicity less severe than the skull category, skin / eye irritation, skin sensitisation, respiratory tract irritation and narcotic effects. These are lower severity than the more specific pictograms, but still require PPE and the hierarchy of control — not "minor" because of the pictogram.',
  },
  {
    id: 8,
    question: 'What does the "environment" pictogram (dead tree and fish) indicate?',
    options: [
      'Hazardous to the aquatic environment — substances that kill aquatic life or damage aquatic ecosystems.',
      'A substance that is harmful only to plants and trees, not to animals or aquatic life.',
      'A substance that releases greenhouse gases and contributes to climate change.',
      'A substance that is biodegradable and safe to dispose of through general drainage.',
    ],
    correctAnswer: 0,
    explanation:
      'The environment pictogram covers substances hazardous to the aquatic environment, acute or chronic — those that cause death of aquatic life or long-term damage to aquatic ecosystems. It triggers waste-handling and discharge controls; the disposal route is critical and these cannot go to general drainage (EPA s.34 duty of care + Environmental Permitting Regs).',
  },
];

const faqs = [
  {
    question: "Where do I find the SDS for substances in the firm's van?",
    answer:
      'Manufacturer / supplier provides — usually downloadable from supplier website. Firm should maintain a register of substances + current SDS. L3 supervisor verifies SDS available before substance is used.',
  },
  {
    question: 'Are old "orange square" symbols still valid?',
    answer:
      'No — the old EU CHIP scheme orange-square symbols were replaced by CLP red-diamond pictograms from 2015. Anything still using the old symbols is out of date; treat with caution and verify the SDS.',
  },
  {
    question: 'What’s the difference between "Danger" and "Warning" signal words?',
    answer:
      'Both appear on CLP labels. Danger = more severe hazard categories. Warning = less severe. Plus the same pictogram can carry either signal word depending on category.',
  },
  {
    question: 'Do I need an SDS for a small quantity?',
    answer:
      "Yes if it's a substance covered by CLP and used at work. The 16-section SDS is the standard regardless of quantity — it informs safe handling.",
  },
  {
    question: 'How does CLP interact with COSHH?',
    answer:
      'CLP labels and classifies substances as supplied. COSHH controls exposure to those substances at work. CLP pictogram on the container is the trigger for COSHH risk assessment of how the substance will be used.',
  },
  {
    question: 'What pictograms are most common on electrical-trade products?',
    answer:
      'Flame (solvents, contact sprays, lubricants), exclamation mark (cleaners, contact lubricant), corrosion (battery electrolyte), gas under pressure (aerosol cans, refrigerants), environment (some lubricants and cleaners).',
  },
  {
    question: "What is the GB CLP Regulation's relationship with EU CLP after Brexit?",
    answer:
      "GB CLP is the UK's retained version of the EU 1272/2008 CLP Regulation. Substantively very similar but with separate UK governance — HSE now publishes the GB Mandatory Classification and Labelling list (formerly CLP Annex VI). For substances supplied in Great Britain, GB CLP applies; for those supplied into Northern Ireland, EU CLP applies under the Windsor Framework. Most SDS now address both regimes in section 15.",
  },
  {
    question: 'When does a substance trigger formal COSHH assessment beyond just reading the SDS?',
    answer:
      'COSHH Reg 6 requires a "suitable and sufficient" assessment of risk to health for any work liable to expose employees to hazardous substances. The threshold is low — any classified hazardous substance used at work needs an assessment, but proportionality applies: a small bottle of contact cleaner used occasionally needs a simple assessment; a large-volume bonded-acid cleaning operation needs a much more detailed one with potentially monitoring and surveillance.',
  },
  {
    question: 'How are workplace exposure limits set and what does "TWA" mean?',
    answer:
      'WELs are set in EH40 (HSE annual publication). TWA = Time-Weighted Average; the average concentration over a stated period. Long-term TWA is the 8-hour reference period; short-term limit is the 15-minute reference period. Both must not be exceeded. Some substances also have a peak limit that cannot be exceeded for any duration.',
  },
  {
    question: "What happens with substances that don't have a WEL?",
    answer:
      'COSHH still applies. Reg 7 requires exposure to be adequately controlled; absence of a specific WEL doesn’t mean unlimited exposure. The duty is to control to a level "compatible with what is known of the substance" — manufacturer’s recommendations, scientific literature, occupational hygiene judgement.',
  },
  {
    question: 'How does waste segregation work for hazardous waste from electrical work?',
    answer:
      "Hazardous Waste Regulations 2005 + EPA s.34 duty of care. Identify the waste stream (oils, batteries, fluorescent tubes containing mercury, asbestos, paint, solvents). Separate at source — don't mix waste streams. Use licensed carrier with consignment notes. Permitted facility for treatment / disposal. Records retained for 3 years (consignor); 2 years (carrier and consignee). Penalties for breach include unlimited fines and custody.",
  },
];

/* ── Inline checks2 ────────────────────────────────────────────────── */

const checks2 = [
  {
    id: 'mod5-s3-sub3-pretask',
    question:
      "You're about to start chasing brick on a domestic refurb. Your second-year hands you a tin of masonry sealant and a tube of two-pack epoxy. Neither has been on site before today and you haven't seen the SDS for either. What's the right order of events?",
    options: [
      "Stop, locate the SDS for both products (manufacturer website, the firm's COSHH register, or in the product packaging), read at least Section 2 (hazards), Section 4 (first aid) and Section 8 (exposure controls / PPE). Confirm you have the right PPE for both products. Only then start. COSHH 2002 Reg 6 requires the assessment to happen BEFORE exposure, not after.",
      'Treat every fire alarm as real until proven otherwise. Stop work, leave tools where they are, ensure the customer evacuates with you, walk the planned escape route to the muster point, and await account-for. Re-entry only when the fire-marshal / building manager declares the all-clear. Tools and van keys can be retrieved later; the alarm response cannot be re-done.',
      "Start the work — both products are common building materials you've handled before, so a fresh assessment isn't needed. If you have any reaction during use, stop and look up the SDS at that point; reading every data sheet before you start is good practice but not a legal requirement under COSHH for products already on site.",
      'Roughly £400-800/year for the basic stack: PL £5-10m (£200-500), Tools-in-Transit (£100-300), van insurance (commercial separately, typically £600-1,200/year for a small van). Add EL if you have an apprentice (£200-600). Add PI if you do any design work (£200-500). Total annual insurance bill for a sole trader with apprentice and design work: roughly £1,500-2,500.',
    ],
    correctIndex: 0,
    explanation:
      "COSHH 2002 Reg 6 requires a 'suitable and sufficient' assessment of risks from any hazardous substance BEFORE the work starts. The SDS is the manufacturer's authoritative information for the assessment. Reading sections 2, 4 and 8 takes a couple of minutes and is the absolute minimum before handling. 'I've used similar before' isn't an assessment — different products have different concentrations, different solvents and different first-aid responses.",
  },
  {
    id: 'mod5-s3-sub3-spill',
    question:
      "You've spilled brick acid on the back of your hand during chasing. The bottle is the strong masonry-cleaning grade. Your colleague asks 'what does the SDS say?'. Which section do you go to FIRST?",
    options: [
      'No — Reg 701.415.2 allows supplementary bonding to be omitted when all three conditions are met (ADS compliance, all final circuits in the location have 30 mA RCD additional protection, main bonding on extraneous-conductive-parts is in place per Reg 411.3.1.2). Modern fully-RCD-protected new-builds typically meet all three.',
      'Check the light curtain alignment, clean the lenses, inspect for environmental contaminants (dust, coolant mist), verify the safety relay status, check wiring connections, review the maintenance history for recurring issues, and ensure the safety distance calculation is still valid',
      'Section 4 — First aid measures. The SDS section 4 will tell you the immediate first aid response (typically: irrigate copiously with running water for at least 15 minutes, remove contaminated clothing, seek medical advice if irritation persists or if the skin is broken). The other sections matter but the response time on a corrosive spill is measured in seconds — Section 4 is the one you need first.',
      'Local Authority — Environmental Health Officers from the local council. The Health and Safety (Enforcing Authority) Regulations 1998 split enforcement based on the main activity of the premises. Retail (shops, offices, hotels, restaurants, leisure) goes to the Local Authority. Higher-risk premises (factories, construction sites, hospitals, schools, mines) go to the HSE.',
    ],
    correctIndex: 2,
    explanation:
      "The 16 sections of an SDS are in a fixed sequence under the CLP Regulation. Section 4 (First aid) is at the front for a reason — when there's an exposure incident it's the section you need first. By year three you should know the section numbers off the top of your head: Section 2 hazards, Section 4 first aid, Section 8 PPE, Section 13 disposal. The structure means any SDS in the world has the same information in the same place.",
  },
  {
    id: 'mod5-s3-sub3-where',
    question:
      'You arrive at a job and need the SDS for the contact cleaner already on the van. Where are the THREE most reliable places to find it?',
    options: [
      'Around 1.2 Nm for the circuit terminals, around 3.5 Nm for the incomers (verify against the specific data sheet — values vary by product line and update cycle). Hager publishes the torques inside the CU lid, in the data sheet, and in the Hager Pro app. Wylex and Schneider have similar values for equivalent products.',
      '£5 million per claim. The Act requires every UK employer (with limited specific exceptions) to hold an EL policy for at least £5m. Most policies offer £10m or more by default. The certificate must be displayed at the workplace where employees can see it. Failure to hold cover = fine up to £2,500 per day; failure to display = £1,000 fine.',
      "Without delay — telephone notification expected before the F2508 follows. F2508 within 10 days. The 'specified injury' list (Schedule 1) includes fractures (excl fingers/thumbs/toes), amputations, sight loss, crush injuries, serious burns, scalpings, head-injury unconsciousness, enclosed-space injuries.",
      "Manufacturer's website (search the product name), the firm's COSHH register (paper folder or app such as Sypol / Alcumus), and the packaging insert that came with the product. Many manufacturers also publish QR codes on the can that link directly to the latest SDS.",
    ],
    correctIndex: 3,
    explanation:
      "The SDS is a controlled document maintained by the manufacturer and updated when classifications change. The authoritative copies are the manufacturer's website (always the latest version), the firm's COSHH register where current SDSs are filed for the substances in use, and the packaging insert at the time of purchase. Trade WhatsApp screenshots are not authoritative and may be out of date.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions2 = [
  {
    id: 1,
    question: 'What does COSHH stand for and what does the regulation cover?',
    options: [
      'The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.',
      'Control Of Substances Hazardous to Health — the 2002 regulations cover the assessment, prevention or control of exposure to hazardous substances at work. Includes chemicals, fumes, dusts, mists, vapours, biological agents and gases. Asbestos and lead have their own separate regulations.',
      'Check the VSD fault log for diagnostic codes, assess the motor insulation resistance and phase balance, inspect the mechanical load, review recent changes or maintenance, and apply root cause analysis before implementing a permanent fix',
      'Capability to handle the 10/350 microsecond impulse waveform — partial direct-lightning current. Required at the installation origin where the building has an external lightning protection system (LPS) per BS EN 62305-3 or where direct-strike risk to the supply exists. Higher Iimp rating, higher Up than Type 2 / 3.',
    ],
    correctAnswer: 1,
    explanation:
      'COSHH 2002 (the Control of Substances Hazardous to Health Regulations 2002) is the headline UK statutory framework for chemical and biological agent exposure at work. It covers identification, assessment, prevention or control, monitoring and health surveillance. Substances with their own dedicated regimes (asbestos, lead, ionising radiation) are excluded from COSHH and covered separately.',
  },
  {
    id: 2,
    question: 'What is an SDS and what statutory framework requires it?',
    options: [
      "Section 8 — Exposure controls / personal protection. This section gives the workplace exposure limits (where applicable), the engineering controls (ventilation, containment) and the recommended PPE (gloves to a specific EN standard, eye protection, respiratory protection, body protection). It's the section you read before the work starts to confirm you have the right kit.",
      'An ASHP extracts heat from the ambient air using an external evaporator coil, while a GSHP extracts heat from the ground via buried pipe loops (horizontal trenches or vertical boreholes) — ASHPs are cheaper to install but have lower COP in cold weather',
      "Safety Data Sheet — a 16-section document required for all hazardous substances by the CLP Regulation (EU 1272/2008, retained as UK law after Brexit). The SDS is the manufacturer's authoritative source of hazard, handling, exposure and first-aid information for the product. Required by COSHH 2002 Reg 12 to be available to anyone handling the substance.",
      "Battery platforms are not interchangeable — Milwaukee M18 batteries don't fit Makita LXT tools and vice versa. If the firm runs Milwaukee, that's the platform whose chargers and spare packs are on every van and in every site box. A loose Makita drill is an outlier — one tool with no spare batteries when you need them, and no compatible charger nearby. Either ask for the matching Milwaukee tool, or accept you're working with one battery on the clock.",
    ],
    correctAnswer: 2,
    explanation:
      'The SDS format is fixed by the CLP Regulation. The 16 sections cover identification, hazards, composition, first aid, firefighting, accidental release, handling and storage, exposure controls and PPE, physical and chemical properties, stability, toxicology, ecology, disposal, transport, regulatory information and other information. The format means every SDS in the world follows the same structure.',
  },
  {
    id: 3,
    question:
      "Which SDS section gives you the manufacturer's recommended PPE for handling the substance?",
    options: [
      'Lower electricity bills (offset import + earn SEG on export), reduced carbon footprint, partial grid-independence (with battery), a hedge against rising electricity prices, often a positive impact on house value, and government incentive schemes that vary by year. Real benefits — but not “free electricity”.',
      "It requires effective planning, organisation, control, monitoring and review of the preventive measures. Reg 3 is 'do the assessment'; Reg 5 is 'run the management system that turns the assessment into actual on-site protection'. The 5+ employees recording threshold also applies.",
      'Accountability structures are important because EI development involves changing habitual patterns, which is difficult without external support. An effective structure might include: a development partner (colleague or mentor who checks2 in regularly), a reflective journal (tracking specific incidents and responses), regular self-assessments, and scheduled review points to evaluate progress against goals',
      "Section 8 — Exposure controls / personal protection. This section gives the workplace exposure limits (where applicable), the engineering controls (ventilation, containment) and the recommended PPE (gloves to a specific EN standard, eye protection, respiratory protection, body protection). It's the section you read before the work starts to confirm you have the right kit.",
    ],
    correctAnswer: 3,
    explanation:
      'Section 8 is the practical PPE and exposure-control section. For an electrician handling cable lubricant, contact cleaner, masonry sealant or brick acid, this is the section that tells you which gloves (often nitrile to EN 374), which eye protection (often safety goggles to EN 166), and which respiratory protection (often FFP3 for dust, organic-vapour cartridge for solvent) is needed.',
  },
  {
    id: 4,
    question:
      'Which SDS section gives the immediate first-aid response if a substance is spilled on skin or splashed in eyes?',
    options: [
      "Section 4 — First aid measures. Subsections cover inhalation, skin contact, eye contact and ingestion, with the specific response for each. For corrosive substances (e.g. brick acid) this typically reads 'irrigate with copious running water for at least 15 minutes, remove contaminated clothing, seek medical advice if persistent'.",
      'The apprenticeship contract (a formal indenture under the Apprenticeships, Skills, Children and Learning Act 2009), the wages, the off-the-job training declaration (a minimum 20% of paid working hours under the Apprenticeship Standard), the provision of suitable work and supervision, and HASAWA s.2 duties to provide a safe place of work and adequate training.',
      'A formal written authorisation that defines the work to be done, the hazards, the controls, the personnel authorised, the time period, and the sign-off conditions. Used for high-hazard activity (live working, hot work, confined space, work on safety-critical systems). Issued by the issuing authority; signed-on by the operative; signed-off when complete.',
      'They must not tamper with, remove, or bypass the meter without authority from the energy supplier — the meter is the property of the metering company, and interference is a criminal offence under the Theft Act 1968 and Electricity Act 1989',
    ],
    correctAnswer: 0,
    explanation:
      "Section 4 is at the front of the SDS for a reason — when there's an exposure incident, response time matters and you need the information fast. By year three an apprentice should know off the top of their head: Section 2 hazards, Section 4 first aid, Section 8 PPE, Section 13 disposal. Knowing the section numbers means you can navigate any SDS in seconds.",
  },
  {
    id: 5,
    question:
      "Which of the following are common electrical-trade chemicals you'd expect to need an SDS for?",
    options: [
      'Free smartphone app from Lighthouse Construction Industry Charity providing wellbeing resources, helpline access, financial planning tools, mental health self-help content, and signposting to support services. Designed for construction workers; quick access to crisis helpline if needed. Available on App Store and Google Play.',
      "Cable lubricant (for pulling into containment), contact cleaner / electronic cleaner (typically isopropyl-based), masonry sealant (for chase repairs), two-pack epoxy resin (for fixings and panel repairs), brick acid (for cleaning chased surfaces), dust suppressant. All have hazard ratings and all need an SDS in the firm's COSHH register.",
      'Two NICEIC streams. Domestic Installer (DI) is the entry tier — covers Part P self-certification for dwellings only. Approved Contractor (AC) is the higher tier — covers wider scope including commercial and industrial work, generally with stricter assessment criteria. Many sole traders start with DI and upgrade to AC as the business grows or as they take on more commercial work.',
      'Rotational — typically 2 weeks on platform / 2 weeks off, or 14/14 patterns. Offshore platform work involves helicopter transit (HUET training required), confined-space and working-at-height, harsh weather, extended periods away from home. Day rates typically £400-700+ on rotation but the family/relationship demands are significant. Common in North Sea (oil and gas) and offshore wind (East Coast UK, Scotland).',
    ],
    correctAnswer: 1,
    explanation:
      "The electrical trade uses a smaller chemical inventory than plumbing or decorating, but the products that are used are often higher-hazard — solvents, acids and reactive resins. Cable lubricant looks innocuous but the SDS will still flag handling and disposal information. The firm's COSHH register should have an SDS for every chemical regularly carried on the van.",
  },
  {
    id: 6,
    question: "Where can you find the SDS for a substance you're about to handle?",
    options: [
      'Ongoing safety communication mechanism — short, on-site, topic-specific. Required under MHSWR Reg 13 (information). Attendance logged as evidence. Topics often respond to recent near-misses, regulation changes, equipment updates, or seasonal risks.',
      'Stop work IMMEDIATELY. Treat the circuit as potentially live until you re-prove it dead with the voltage indicator (and verify the indicator is working). Re-secure the lockout properly before continuing.',
      "Manufacturer's website (always the latest version), the firm's COSHH register (in paper or app form — common apps include Sypol and Alcumus), and the product packaging at the point of purchase. Many manufacturers print QR codes on the can that link directly to the latest SDS.",
      'Conclusion: identifying what they could have done differently (e.g., always use a cable detector); Action Plan: specific steps to prevent recurrence (e.g., purchase a CAT scanner, add pre-drill check to personal checklist)',
    ],
    correctAnswer: 2,
    explanation:
      "The SDS is a controlled document maintained by the manufacturer and updated when classifications change. Authoritative copies live with the manufacturer, in the firm's COSHH register (which the H&S officer keeps current), and on the original packaging. Don't rely on screenshots in a WhatsApp group — they may be from an older version of the substance with different exposure limits.",
  },
  {
    id: 7,
    question: 'What does CLP stand for in the context of SDS classifications?',
    options: [
      'For minor additions or alterations to an existing circuit (e.g. adding a single socket on an existing ring) that do NOT require a new circuit. New circuits, CU replacements and major alterations require an EIC + Schedule of Inspections + STR.',
      'A defined subset — most non-trivial work in special locations (bathroom Zone 0/1, swimming pool, sauna, etc.); installation of a new circuit; replacement of a consumer unit. Like-for-like accessory replacement, repairs, additions to an existing circuit OUTSIDE special locations are NOT notifiable.',
      'A single conductor only (line or neutral) — clamping around both line and neutral together would give a reading of approximately zero because the currents flow in opposite directions and their magnetic fields cancel',
      "Classification, Labelling and Packaging — the EU Regulation (1272/2008) that sets the format of the SDS, the GHS pictograms (skull, exclamation, flame, corrosion, etc.) and the H-statements (e.g. H314 'causes severe skin burns'). Retained as UK law after Brexit. It's the standard the SDS is written to.",
    ],
    correctAnswer: 3,
    explanation:
      'CLP (EU 1272/2008) is the regulation that standardises hazard communication across the EU and the UK. It introduced the GHS pictograms (the diamond-shaped symbols on chemical containers — skull for acute toxicity, flame for flammable, corrosion for corrosive, etc.) and the H-statements / P-statements that describe specific hazards and precautions. The SDS format is fixed by CLP.',
  },
  {
    id: 8,
    question:
      'If you see an SDS with a Section 11 indicating respiratory sensitisation, what does that mean for the operative?',
    options: [
      "It's a flag that the substance can cause an allergic respiratory response in some operatives — repeated exposure can sensitise even without a single high-dose event. Means tighter respiratory PPE control (FFP3 minimum, often a respirator), good extract ventilation, and health surveillance under COSHH 2002 Reg 11 if the exposure is regular. Two-pack epoxy isocyanates are the textbook example in the trade.",
      "The Electrical Contractors' Association — the trade association for electrical contractors in England, Wales and Northern Ireland. Founded 1901. ECA membership is a quality mark for the contractor; ECA also lobbies on behalf of the industry, runs technical events, publishes guidance and runs the JIB jointly with the trade union (Unite).",
      "Three reasons. (1) Speed of selection — colour-coded ferrules let you grab the right size at a glance from a sorted ferrule kit. (2) Inspection — supervisor or QA can check at a glance that the ferrule colour matches the conductor CSA on every termination. (3) Standardisation — DIN 46228-4 is recognised across Europe, so any supplier's ferrules match any other's. The colour code IS the inspection mechanism.",
      'Part P does NOT apply (Part P is dwellings-only). EAWR applies to the workplace electrical safety. The work needs an EIC or MEIWC for BS 7671 compliance and the contractor discharges EAWR duties through competent design and installation. No CPS upload required because Part P does not apply, but the contractor may still notify Building Control if other Building Regulations Parts are triggered (e.g. Part B fire safety, Part L energy efficiency).',
    ],
    correctAnswer: 0,
    explanation:
      'Respiratory sensitisation is a serious occupational health hazard — once an operative is sensitised, even tiny future exposures can trigger an asthmatic-style response. Two-pack isocyanate-based products (some epoxy resins, some adhesives) are a known sensitiser. COSHH 2002 Reg 11 requires health surveillance where exposure is regular. Section 11 of the SDS is where this kind of toxicological detail is recorded.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs2 = [
  {
    question: 'Do I really need to read the SDS for cable lubricant — it looks like soap?',
    answer:
      'Yes. Cable lubricant looks innocuous but the SDS will still tell you about skin sensitisation potential, eye irritation, environmental disposal restrictions, and recommended PPE. Many lubricants contain glycols or surfactants that can cause skin issues with prolonged contact. A two-minute read at the start of the project (not before every use) covers it. The COSHH 2002 Reg 6 assessment duty applies to every hazardous substance, not just the obviously dangerous ones.',
  },
  {
    question: "What's the difference between a hazard and a risk in COSHH terms?",
    answer:
      "A hazard is the intrinsic ability of the substance to cause harm — brick acid is corrosive whether or not anyone handles it. A risk is the likelihood that the hazard will actually cause harm in the way you're using it — a sealed bottle of brick acid in a rack is a low risk; an open bottle being decanted without gloves is a high risk. The COSHH assessment evaluates the risk in the actual use context, not just the hazard of the substance.",
  },
  {
    question: "Where does the firm's COSHH register actually live?",
    answer:
      "Different firms handle it differently. Smaller firms often have a paper folder in the office and another in each van with SDSs for everything regularly carried. Bigger firms typically use an app (Sypol, Alcumus, Trade Point COSHH and similar) where SDSs are stored digitally and accessed by phone on site. Either way, you should know where it is on day one. If you can't find it, ask the H&S officer or your supervisor.",
  },
  {
    question: "What if I'm about to use a substance that isn't in the COSHH register?",
    answer:
      "Stop and get the SDS before you start. The substance won't be in the register because nobody has done the assessment yet — and COSHH 2002 Reg 6 requires the assessment to happen BEFORE exposure. Get the SDS from the manufacturer's website, read sections 2, 4 and 8 at minimum, confirm you have the PPE, and add it to the register so the next operative isn't in the same position. Most firms will encourage this kind of contribution from apprentices.",
  },
  {
    question: 'How do I know if a substance needs health surveillance under COSHH Reg 11?',
    answer:
      "The SDS will flag any sensitisation, carcinogenicity or chronic-toxicity hazards in Sections 2 and 11. If your work involves regular exposure to a substance with those flags — typical in the trade for isocyanate-containing two-pack products, for crystalline silica from masonry chasing, for some solvents — your firm should have health surveillance arranged (typically lung function testing, skin checks2, regular medical review). If you're regularly handling something with a Section 11 sensitisation flag and there's no health surveillance, raise it with the H&S officer.",
  },
  {
    question: "What's the link between the SDS and the RAMS?",
    answer:
      "The RAMS for a job that involves hazardous substances should reference the relevant SDSs in its appendices, and the controls in the RAMS should be informed by Section 8 of the SDS. The two documents work together — the RAMS is the site-specific safe system of work, the SDS is the manufacturer's authoritative information about each substance used. A RAMS that doesn't reference any SDS for a job involving solvents or acids is a flag the assessment isn't 'suitable and sufficient' under either COSHH Reg 6 or MHSWR Reg 3.",
  },
];

export default function Lesson303_11_1() {
  return (
    <div className="space-y-8">

      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        {
          "Remember from L2 — pictograms warn you of hazard. At L3 you read the SDS too, and you ensure it's available before substances come on site."
        }
      </p>

      <TLDR
        points={[
          'Nine GB CLP pictograms — explosive, flammable, oxidising, gas under pressure, corrosive, acute toxicity (skull), health hazard (chronic), harmful (exclamation), environmental.',
          'Pictograms = headlines. Safety Data Sheet (16 sections) = operational detail. L3 reads both.',
          "CLP triggers COSHH risk assessment. Label tells you it's a hazardous substance; COSHH tells you how to use it safely.",
          'H-codes describe the hazard (H225 highly flammable; H319 serious eye irritation); P-codes describe the response (P280 wear gloves; P305 if in eyes rinse).',
          "Workplace Exposure Limits (HSE EH40) set TWA 8-hour and 15-minute short-term limits; absent WEL doesn't mean unlimited exposure.",
          'Hazardous waste from electrical work — Hazardous Waste Regulations 2005, EPA s.34 duty of care, consignment notes, licensed carrier, permitted facility.',
        ]}
      />
      <LearningOutcomes
        outcomes={[
          'Identify all nine GB CLP hazard pictograms and the categories each represents.',
          'Distinguish acute toxicity (skull) from chronic / long-term hazards (silhouetted figure).',
          'Read a Safety Data Sheet (16 sections) and identify operationally-relevant content.',
          'Recognise the relationship between CLP labelling and COSHH risk assessment.',
          'Identify common pictograms on electrical-trade substances.',
          'Apply L3 supervisor verification — SDS available before substance on site.',
          'Read CLP hazard statements (H-codes) and precautionary statements (P-codes).',
          'Apply Workplace Exposure Limits from HSE EH40 to assess adequacy of control.',
          'Recognise health-surveillance triggers under COSHH Reg 11 in electrical-trade work.',
          'Apply storage segregation rules for incompatible substance classes.',
          'Identify the COSHH hierarchy of control (eliminate → substitute → engineer → administer → PPE).',
          'Apply the pre-2000 building asbestos protocol — register, survey, disturbance avoidance, escalation.',
          'Draft and maintain a substance register sufficient for HSE inspection.',
          'Apply the unknown-substance protocol for unlabelled materials found on site.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The nine pictograms</ContentEyebrow>
      <ConceptBlock
        title="Red-bordered diamonds, white background, black symbol"
        plainEnglish="GB CLP pictograms are standardised across the world via the UN Globally Harmonised System (GHS). The same nine appear on chemical labels worldwide. UK's GB CLP Regulation is the post-Brexit implementation aligned with EU CLP."
        onSite="Recognise all nine on sight. The pictogram is the headline; supplementary text (signal word, hazard statement, precautionary statement) provides detail."
      >
        <p>The nine pictograms:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Exploding bomb (GHS01)</strong> — explosives, self-reactives, organic
            peroxides.
          </li>
          <li>
            <strong>Flame (GHS02)</strong> — flammable gases, aerosols, liquids, solids;
            pyrophoric; self-heating.
          </li>
          <li>
            <strong>Flame over circle (GHS03)</strong> — oxidisers.
          </li>
          <li>
            <strong>Gas cylinder (GHS04)</strong> — gases under pressure (compressed, liquefied,
            refrigerated, dissolved).
          </li>
          <li>
            <strong>Corrosion (GHS05)</strong> — corrosive to metals, skin burn, eye damage.
          </li>
          <li>
            <strong>Skull and crossbones (GHS06)</strong> — acute toxicity (short-term high
            severity).
          </li>
          <li>
            <strong>Exclamation mark (GHS07)</strong> — acute toxicity lower severity, irritation,
            sensitisation.
          </li>
          <li>
            <strong>Health hazard (GHS08)</strong> — carcinogens, mutagens, reproductive toxins,
            target organ toxicity, respiratory sensitisers, aspiration.
          </li>
          <li>
            <strong>Environment (GHS09)</strong> — hazardous to the aquatic environment.
          </li>
          <li>
            Signal words — &quot;Danger&quot; for more severe categories; &quot;Warning&quot; for
            less severe.
          </li>
          <li>
            The same pictogram can carry either signal word depending on the assigned category.
          </li>
          <li>A label can carry multiple pictograms — combination of hazards.</li>
          <li>Pictogram size minimum specified in CLP — must be readable.</li>
          <li>
            Old EU CHIP orange-square symbols obsolete from 2015; encountered material with those
            should be treated cautiously.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="GB CLP Regulation — UK SI 2008/2852 as amended (UK retention of EU 1272/2008)"
        clause={
          <>
            Requires hazardous substances and mixtures to be classified into hazard classes;
            labelled with the appropriate pictogram, signal word ("Danger" or "Warning"), hazard
            statements (H-codes) and precautionary statements (P-codes); packaged safely. SDS to
            be supplied for substances classified as hazardous.
          </>
        }
        meaning={
          <>
            The labelling regulation. The pictogram is the visual headline; the SDS is the
            document. Both required for any substance classified as hazardous. CLP applies to
            manufacturers, importers, distributors and users.
          </>
        }
        cite="Source: GB Classification, Labelling and Packaging Regulation — UK retained EU 1272/2008 as amended; HSE guidance INDG350."
      />

      <InlineCheck {...checks[0]} />

      <SectionRule />
      <ContentEyebrow>The Safety Data Sheet (SDS)</ContentEyebrow>
      <ConceptBlock
        title="16-section operational document"
        plainEnglish="The Safety Data Sheet is the manufacturer / supplier's operational document accompanying the substance. 16 standardised sections cover everything from identification through first aid through disposal. The label is the headline; the SDS is the substance."
        onSite="L3 supervisor verifies SDS is available for any substance before it's used. Operatives should know where to find SDS quickly — in case of spillage, fire, exposure or first-aid event."
      >
        <p>SDS section structure:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>1. Identification</strong> — product name, supplier, recommended use.
          </li>
          <li>
            <strong>2. Hazard identification</strong> — classification, label elements,
            pictograms.
          </li>
          <li>
            <strong>3. Composition / ingredients</strong> — substances, concentrations.
          </li>
          <li>
            <strong>4. First-aid measures</strong> — routes of exposure, symptoms, treatment.
          </li>
          <li>
            <strong>5. Fire-fighting measures</strong> — suitable extinguisher, hazardous
            combustion products.
          </li>
          <li>
            <strong>6. Accidental release measures</strong> — containment, cleanup, environmental
            precautions.
          </li>
          <li>
            <strong>7. Handling and storage</strong> — safe handling, incompatibilities, storage
            conditions.
          </li>
          <li>
            <strong>8. Exposure controls / PPE</strong> — workplace exposure limits, engineering
            controls, recommended PPE.
          </li>
          <li>
            <strong>9. Physical and chemical properties</strong>.
          </li>
          <li>
            <strong>10. Stability and reactivity</strong>.
          </li>
          <li>
            <strong>11. Toxicological information</strong>.
          </li>
          <li>
            <strong>12. Ecological information</strong>.
          </li>
          <li>
            <strong>13. Disposal considerations</strong> — waste handling, container disposal.
          </li>
          <li>
            <strong>14. Transport information</strong> — UN number, transport class.
          </li>
          <li>
            <strong>15. Regulatory information</strong>.
          </li>
          <li>
            <strong>16. Other information</strong>.
          </li>
          <li>SDS version date — older than 2 years should be replaced with current version.</li>
          <li>Supplier signature / emergency contact details.</li>
          <li>UK English version required for substances supplied in Great Britain.</li>
          <li>
            Digital library acceptable; must be accessible at point of use not just at office.
          </li>
          <li>
            SDS used as the source document for COSHH risk assessment and substance register
            entries.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck {...checks[1]} />
      <InlineCheck {...checks[2]} />

      <SectionRule />
      <ContentEyebrow>Common substances on electrical sites</ContentEyebrow>
      <ConceptBlock
        title="What you'll meet and which pictograms"
        plainEnglish="Most electrical-trade substances carry one or more pictograms. Knowing which pictograms appear on the products you regularly handle lets you make quick risk-management decisions on site."
        onSite="The L3 supervisor maintains a substance register for the firm — what we use, what the pictograms are, what the SDS says, what controls apply. Reviewed periodically."
      >
        <p>Common products and headline pictograms:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Contact cleaner / electrical solvent</strong> — flame, exclamation, sometimes
            health hazard.
          </li>
          <li>
            <strong>Lubricants and silicone sprays</strong> — flame (propellant), exclamation.
          </li>
          <li>
            <strong>Copper grease</strong> — exclamation, sometimes health hazard.
          </li>
          <li>
            <strong>Battery electrolyte (lead-acid)</strong> — corrosion, environment, possibly
            health hazard (lead).
          </li>
          <li>
            <strong>Lithium battery cells</strong> — flame, gas under pressure (some),
            environment.
          </li>
          <li>
            <strong>Refrigerants (F-Gas)</strong> — gas under pressure, environment, sometimes
            flame (HFO).
          </li>
          <li>
            <strong>Solder and flux</strong> — health hazard (some lead-content), exclamation.
          </li>
          <li>
            <strong>Mastic and adhesives</strong> — flame, exclamation, sometimes health hazard.
          </li>
          <li>
            <strong>Insulating oils (transformer)</strong> — environment, sometimes health hazard.
          </li>
          <li>
            <strong>Pump-out liquid (cleaning)</strong> — corrosion, environment.
          </li>
          <li>
            <strong>Aerosol propellants</strong> — flame; gas under pressure; can rupture if
            heated.
          </li>
          <li>
            <strong>Cable lubricants</strong> — exclamation; sometimes flame; environment for
            some.
          </li>
          <li>
            <strong>Plumber&apos;s flux paste</strong> — exclamation; corrosion in higher-acid
            formulations.
          </li>
          <li>
            <strong>Penetrating oil (rust-release)</strong> — flame; exclamation; aspiration
            hazard (H304).
          </li>
          <li>
            <strong>Anti-seize compounds</strong> — exclamation; health hazard for some metallic
            powder formulations.
          </li>
          <li>
            <strong>Spray paints / markers</strong> — flame; exclamation; environment for some.
          </li>
          <li>
            <strong>Insulation foam / FR sealant</strong> — flame propellant; isocyanate
            sensitiser (health hazard); ventilation required.
          </li>
          <li>
            <strong>Isopropyl alcohol cleaning wipes</strong> — flame.
          </li>
          <li>
            <strong>Heatshrink adhesive lined</strong> — exclamation; thermal hazard during
            installation.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Hazard statements, COSHH and operational management</ContentEyebrow>
      <ConceptBlock
        title="Hazard statements (H-codes) and precautionary statements (P-codes)"
        plainEnglish="CLP labels carry standardised hazard statements (H-codes) describing the hazard, and precautionary statements (P-codes) describing the response. The codes are the same internationally — H319 is ’causes serious eye irritation’ in any country. Knowing how to read them lets the L3 supervisor extract the operational meaning quickly."
        onSite="The H-codes give the ’what’; the P-codes give the ’how to handle’. Together with the pictogram they tell you what the substance does and what to do about it. Read them before sustained handling."
      >
        <p>Common H/P codes on electrical-trade products:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>H225</strong> — highly flammable liquid and vapour.
          </li>
          <li>
            <strong>H304</strong> — may be fatal if swallowed and enters airways (aspiration
            hazard).
          </li>
          <li>
            <strong>H315</strong> — causes skin irritation.
          </li>
          <li>
            <strong>H319</strong> — causes serious eye irritation.
          </li>
          <li>
            <strong>H335</strong> — may cause respiratory irritation.
          </li>
          <li>
            <strong>H351</strong> — suspected of causing cancer.
          </li>
          <li>
            <strong>H373</strong> — may cause damage to organs through prolonged exposure.
          </li>
          <li>
            <strong>H410</strong> — very toxic to aquatic life with long lasting effects.
          </li>
          <li>
            <strong>P210</strong> — keep away from heat / sparks / open flames.
          </li>
          <li>
            <strong>P280</strong> — wear protective gloves / clothing / eye protection.
          </li>
          <li>
            <strong>P305+P351+P338</strong> — IF IN EYES rinse cautiously with water for several
            minutes.
          </li>
          <li>
            <strong>P501</strong> — dispose of contents / container in accordance with local
            regulations.
          </li>
          <li>
            <strong>H222</strong> — extremely flammable aerosol.
          </li>
          <li>
            <strong>H229</strong> — pressurised container; may burst if heated.
          </li>
          <li>
            <strong>H332</strong> — harmful if inhaled.
          </li>
          <li>
            <strong>H334</strong> — may cause allergy or asthma symptoms or breathing difficulties
            if inhaled (respiratory sensitiser).
          </li>
          <li>
            <strong>H340 / H341</strong> — may cause / suspected of causing genetic defects
            (mutagenic).
          </li>
          <li>
            <strong>H350 / H351</strong> — may cause / suspected of causing cancer.
          </li>
          <li>
            <strong>H360 / H361</strong> — may damage / suspected of damaging fertility or the
            unborn child (reprotoxic).
          </li>
          <li>
            <strong>H370 / H371</strong> — causes / may cause damage to organs.
          </li>
          <li>
            <strong>P102</strong> — keep out of reach of children.
          </li>
          <li>
            <strong>P260</strong> — do not breathe dust / fume / gas / mist / vapours / spray.
          </li>
          <li>
            <strong>P301+P310</strong> — IF SWALLOWED immediately call poison centre / doctor.
          </li>
          <li>
            <strong>P370+P378</strong> — in case of fire use dry sand / dry chemical /
            alcohol-resistant foam.
          </li>
          <li>
            <strong>P403+P233</strong> — store in a well-ventilated place. Keep container tightly
            closed.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Workplace Exposure Limits (WELs)"
        plainEnglish="HSE EH40 lists Workplace Exposure Limits — concentrations of airborne substances above which exposure must not occur. Long-term (8-hour TWA) and short-term (15-minute) limits. The SDS section 8 references the relevant WEL where applicable."
        onSite="The L3 supervisor doesn’t monitor air concentrations personally on every job, but knowing WELs exist informs the conversation about ventilation, extraction and PPE. For high-volume / high-frequency exposure, occupational hygiene monitoring may be required."
      >
        <p>Common substances with WELs relevant to electricians:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Respirable crystalline silica</strong> — 0.1 mg/m³ 8-hour TWA.
          </li>
          <li>
            <strong>Lead (inorganic)</strong> — 0.15 mg/m³ 8-hour TWA + Control of Lead at Work
            Regs.
          </li>
          <li>
            <strong>Solvent vapours (white spirit, IPA)</strong> — varies; commonly 100-500 ppm.
          </li>
          <li>
            <strong>Solder fume (rosin-based)</strong> — 0.05 mg/m³ 8-hour TWA (very low; LEV
            typically required).
          </li>
          <li>
            <strong>Wood dust (hard wood)</strong> — 3 mg/m³ 8-hour TWA.
          </li>
          <li>
            <strong>Refrigerant gases</strong> — varies by gas; F-Gas Regs additional controls.
          </li>
          <li>
            <strong>Isocyanates</strong> — 0.02 mg/m³ 8-hour TWA (respiratory sensitiser; LEV
            essential).
          </li>
          <li>
            <strong>Welding fume</strong> — group control limit; HSE issued safety alert 2019 —
            all welding fume now treated as carcinogen.
          </li>
          <li>
            <strong>Diesel engine exhaust emissions</strong> — IARC Group 1 carcinogen; control to
            ALARP.
          </li>
          <li>
            <strong>Hand-arm vibration</strong> — exposure action value 2.5 m/s² A(8); limit value
            5 m/s² A(8) — Control of Vibration at Work Regs.
          </li>
          <li>
            <strong>Noise</strong> — first action 80 dB(A); second action 85 dB(A); limit 87 dB(A)
            — Control of Noise at Work Regs.
          </li>
          <li>
            <strong>Carbon monoxide</strong> — 20 ppm 8-hour TWA; 100 ppm 15-min STEL.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="COSHH risk assessment — operationalising CLP information"
        plainEnglish="COSHH Reg 6 requires assessment of substance hazards and adequate control. CLP labels and SDS provide the input; the COSHH assessment provides the operational output — what controls apply on this job, by whom, with what monitoring."
        onSite="The L3 supervisor often contributes to COSHH assessments for the firm or contributes the on-site verification. The assessment isn’t a generic document; it’s specific to the substances, the tasks and the persons exposed."
      >
        <p>COSHH assessment elements:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Substance identified</strong> — name, supplier, CLP classification.
          </li>
          <li>
            <strong>How used</strong> — task, frequency, duration, quantity.
          </li>
          <li>
            <strong>Who exposed</strong> — operatives, others (public, customers).
          </li>
          <li>
            <strong>Route of exposure</strong> — inhalation, absorption, ingestion, injection.
          </li>
          <li>
            <strong>WEL / health risk level</strong> — from SDS section 8 + EH40.
          </li>
          <li>
            <strong>Control hierarchy applied</strong> — eliminate / substitute / engineer /
            administer / PPE.
          </li>
          <li>
            <strong>Emergency response</strong> — first aid, spill, fire, eye exposure.
          </li>
          <li>
            <strong>Health surveillance</strong> — required where exposure significant (Reg 11).
          </li>
          <li>
            <strong>Records retained</strong> — for the period required by COSHH (40 years for
            some).
          </li>
          <li>
            <strong>Review triggers</strong> — substance change, process change, new operative,
            incident, periodic cycle.
          </li>
          <li>
            <strong>Significant findings recorded</strong> — where 5+ employees; under Reg 6(3).
          </li>
          <li>
            <strong>Operatives informed</strong> — assessment outcomes communicated to those
            affected (Reg 12).
          </li>
          <li>
            <strong>Effectiveness monitored</strong> — controls actually achieving the intended
            exposure level; LEV examined Reg 9.
          </li>
          <li>
            <strong>Special groups</strong> — young persons, expectant mothers, those with
            specific health conditions; bespoke considerations.
          </li>
          <li>
            <strong>Mixed exposure</strong> — multiple substances; effects may be additive or
            interactive; consider combinations.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Storage, transport and waste disposal"
        plainEnglish="CLP-classified substances trigger storage requirements (segregation by hazard, ventilation, secondary containment), transport requirements (ADR for road, segregation, documentation), and waste requirements (Hazardous Waste Regs 2005, EPA s.34 duty of care, consignment notes for hazardous, environment permits)."
        onSite="The L3 supervisor manages the operational side: van storage segregation, end-of-day return to compliant storage, used-substance disposal route. Mixing waste streams and routine van storage of incompatible products are common slippages."
      >
        <p>Storage / transport / waste essentials:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Segregation</strong> — flammables away from oxidisers; corrosives separated.
          </li>
          <li>
            <strong>Ventilation</strong> — particularly for solvents and refrigerants.
          </li>
          <li>
            <strong>Secondary containment</strong> — drip trays for liquids, sealed boxes for
            aerosols.
          </li>
          <li>
            <strong>Van storage</strong> — typically a metal box for flammables, separate from
            passenger area.
          </li>
          <li>
            <strong>Quantity limits</strong> — ADR limits when exceeded require driver training.
          </li>
          <li>
            <strong>Hazardous waste</strong> — EPA s.34 duty of care; consignment notes; licensed
            carrier; permitted facility.
          </li>
          <li>
            <strong>Empty containers</strong> — can still be hazardous (residue, vapour); dispose
            appropriately.
          </li>
          <li>
            <strong>Lithium battery waste</strong> — Battery Regulations 2009; specialist disposal
            route; never landfill or general waste.
          </li>
          <li>
            <strong>Refrigerant waste (F-Gas)</strong> — F-Gas Regulations; only certified
            technicians can recover; refrigerant recovered into approved cylinders.
          </li>
          <li>
            <strong>Fluorescent tube waste</strong> — mercury content; WEEE + Hazardous Waste;
            special tube containers.
          </li>
          <li>
            <strong>Asbestos waste</strong> — red double-bag; permitted facility; consignment
            note; never mixed with other waste.
          </li>
          <li>
            <strong>Lead waste</strong> — old solder, lead sheath cable; specialist scrap dealer;
            consignment note for hazardous fraction.
          </li>
          <li>
            <strong>Cable scrap with insulation</strong> — sorted by material; copper / aluminium
            recycled; PVC may need specialist disposal.
          </li>
          <li>
            <strong>Container labelling</strong> — waste containers labelled with contents,
            hazard, generator; chain of custody maintained.
          </li>
          <li>
            <strong>Mixed waste</strong> — once mixed, the highest-hazard categorisation applies;
            segregate at source.
          </li>
          <li>
            <strong>Pre-acceptance notice</strong> — some waste facilities require advance
            notification of waste type and quantity.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Health surveillance — when COSHH demands monitoring"
        plainEnglish="COSHH Reg 11 requires health surveillance where exposure to a hazardous substance presents an identified disease risk that monitoring can detect. Examples: lung function for silica / wood dust; skin checks for dermatitis-causing substances; biological monitoring for lead. Records retained 40 years (Reg 11(7))."
        onSite="The L3 supervisor doesn’t arrange surveillance personally, but recognises when a job triggers it. Long-term silica chasing, repeated dermatitis-causing solvent contact, lead-paint disturbance — all warrant escalation to the firm’s H&S manager for surveillance setup."
      >
        <p>Common surveillance triggers in electrical trade:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Silica exposure</strong> — periodic lung function tests; HSE recommend.
          </li>
          <li>
            <strong>Solder fume</strong> — respiratory health checks for high-frequency exposure.
          </li>
          <li>
            <strong>Lead</strong> — biological monitoring under Control of Lead at Work Regs.
          </li>
          <li>
            <strong>Asbestos</strong> — under CAR 2012 for licensed / NNLW workers.
          </li>
          <li>
            <strong>Vibration</strong> — hand-arm vibration syndrome screening (Control of
            Vibration Regs).
          </li>
          <li>
            <strong>Noise</strong> — audiometric testing where exposure exceeds upper action level
            (85dB).
          </li>
          <li>
            <strong>Skin sensitisers</strong> — periodic skin checks where contact occurs.
          </li>
          <li>
            <strong>Isocyanates</strong> — respiratory health surveillance for any exposed
            operative.
          </li>
          <li>
            <strong>Welding fume</strong> — respiratory function monitoring for frequent welders.
          </li>
          <li>
            <strong>Diesel engine exhaust</strong> — health surveillance considered for
            high-exposure operatives.
          </li>
          <li>
            <strong>Night-shift work</strong> — under Working Time Regs 1998; statutory health
            assessment.
          </li>
          <li>
            <strong>Driving for work</strong> — eyesight checks; occupational health where driving
            is significant.
          </li>
          <li>
            <strong>Records retained</strong> — 40 years minimum for COSHH; longer for some
            substances; survives employee leaving firm.
          </li>
          <li>
            <strong>Pre-employment baseline</strong> — taken on joining for benchmark against
            later surveillance.
          </li>
          <li>
            <strong>Findings communicated</strong> — to operative (always) and to employer
            (anonymised aggregate or with consent for individual).
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="COSHH 2002 — Reg 6 (Assessment of risk to health)"
        clause={
          <>
            "An employer shall not carry out work which is liable to expose any employees to any
            substance hazardous to health unless he has — (a) made a suitable and sufficient
            assessment of the risk created by that work to the health of those employees and of
            the steps that need to be taken to meet the requirements of these Regulations; and (b)
            implemented the steps referred to in sub-paragraph (a)."
          </>
        }
        meaning={
          <>
            COSHH Reg 6 — the substance-specific risk assessment duty. CLP label provides the
            hazard input; Reg 6 assessment is the operational output. Without the assessment, the
            work cannot lawfully proceed.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 6."
      />

      <RegsCallout
        source="COSHH 2002 — Reg 7(1) (Prevention or control of exposure)"
        clause={
          <>
            "Every employer shall ensure that the exposure of his employees to substances
            hazardous to health is either prevented or, where this is not reasonably practicable,
            adequately controlled."
          </>
        }
        meaning={
          <>
            COSHH Reg 7 — the substantive control duty. Prevention preferred; control where
            prevention not reasonably practicable. Reg 7(7) sets out the hierarchy of control
            explicitly: substitution, process design, engineering, work systems, PPE last. The
            hierarchy is a legal requirement, not best practice.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7."
      />

      <RegsCallout
        source="COSHH 2002 — Reg 9(1) (Maintenance, examination and test of control measures)"
        clause={
          <>
            &quot;Every employer who provides any control measure to meet the requirements of
            regulation 7 shall ensure that — (a) in the case of plant and equipment, including
            engineering controls and personal protective equipment, it is maintained in an
            efficient state, in efficient working order, in good repair and in a clean
            condition.&quot;
          </>
        }
        meaning={
          <>
            Reg 9 — the maintenance duty for control measures. LEV systems must be thoroughly
            examined and tested at least every 14 months (HSE HSG258); PPE must be maintained,
            cleaned and replaced. Controls only work when maintained — the L3 supervisor verifies
            the LEV is functioning before allowing the work that relies on it, and verifies
            operatives&apos; RPE has been face-fit tested and is within its inspection cycle.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 9."
      />

      <RegsCallout
        source="Hazardous Waste Regulations 2005 — Reg 23 (Consignment notes)"
        clause={
          <>
            &quot;Where hazardous waste is to be removed from any premises in England, the
            consignor shall ensure that there is delivered, before the waste is removed or at the
            time of its removal, a consignment note for the consignment.&quot;
          </>
        }
        meaning={
          <>
            The consignment-note duty. Hazardous waste leaving the firm&apos;s control must be
            accompanied by a properly-completed consignment note identifying the waste, the
            consignor, the carrier and the consignee. Records retained 3 years by the consignor.
            Operatives generating hazardous waste from electrical work (used solvent, fluorescent
            tubes, batteries, asbestos, oil) feed into this regime; the firm&apos;s waste manager
            handles the paperwork but the L3 supervisor identifies the waste correctly at source.
          </>
        }
        cite="Source: Hazardous Waste (England and Wales) Regulations 2005 (SI 2005/894), Reg 23 (separate equivalent regulations apply in Scotland and Wales)."
      />

      <SectionRule />
      <CommonMistake
        title="Treating an unmarked container as 'safe'"
        whatHappens={
          <>
            Operative uses an unmarked container of liquid the previous tradesperson left behind;
            turns out to be a strong acid; skin burn and respiratory irritation. SDS not consulted
            because container had no label. COSHH Reg 12 breach (information &amp; instruction);
            CLP Reg breach (use of mis-labelled product); HASAWA s.7 personal duty failure.
          </>
        }
        doInstead={
          <>
            Unmarked = unknown = don&apos;t use. Either identify via SDS / supplier OR dispose as
            unknown hazardous waste. Never assume.
          </>
        }
      />

      <CommonMistake
        title="Reading the pictograms but not the SDS"
        whatHappens={
          <>
            Operative recognises the flame pictogram on a contact cleaner; takes appropriate fire
            precautions; doesn&apos;t read SDS section 8 (PPE) which specifies nitrile gloves AND
            respiratory protection for prolonged use. Repeated bare-hand exposure leads to
            occupational dermatitis. COSHH breach; reportable under RIDDOR Schedule 3.
          </>
        }
        doInstead={
          <>
            SDS section 8 (PPE) and section 4 (first aid) are the operationally-critical sections.
            Read them before sustained use of any hazardous substance.
          </>
        }
      />

      <Scenario
        title="L3 supervisor reviewing substances brought to a new project"
        situation={
          <>
            Your firm is starting a 6-week commercial fit-out. The team will bring contact
            cleaners, silicone sprays, mastics, copper grease, FR sealant, isopropyl alcohol
            cleaning wipes, lithium drill batteries, and a small bottle of solder flux. You're the
            L3 supervisor. The customer’s site manager asks for your COSHH register before work
            starts.
          </>
        }
        whatToDo={
          <>
            Compile the substance register. List each product. For each: get current SDS from
            supplier (download or printout); note CLP pictograms (most will have flame,
            exclamation, some health hazard); identify exposure controls and PPE per SDS section
            8; identify storage requirements per section 7; identify spillage / fire response per
            sections 5-6; identify disposal route per section 13. Aggregate into a COSHH risk
            assessment for the firm&apos;s use of these substances on this project — what hazards,
            who&apos;s exposed, what controls. Brief the team on the most-relevant items (FR
            sealant ventilation, lithium battery storage). Provide the COSHH register and SDS
            folder to the customer&apos;s site manager. Update as substances change. Maintain on
            site for the project duration. Inspector check during the project would expect to see
            the register and the SDS available.
          </>
        }
        whyItMatters={
          <>
            The COSHH register is the L3 supervisor&apos;s administrative responsibility on most
            projects. The customer&apos;s site manager is asking for it because their CDM
            principal-contractor duty includes coordinating COSHH across multiple trades.
            Providing it competently signals the firm runs its safety system properly; not having
            it signals the opposite. The 30 minutes of register-compilation up-front saves much
            greater pain after an incident.
          </>
        }
      />

      <SectionRule />
      <ContentEyebrow>Lithium battery thermal runaway — the L3 working hazard</ContentEyebrow>

      <ConceptBlock
        title="Why lithium-ion batteries get their own risk profile"
        plainEnglish="Lithium-ion batteries — in tools, in vehicles, in PV / ESS installations — are a relatively new hazard class in the trade. Damaged, overheated, overcharged or punctured cells can enter thermal runaway: a self-sustaining exothermic reaction that releases flammable electrolyte vapour, heats neighbouring cells, propagates through the pack, and can result in a deep-seated fire that water alone cannot extinguish. Once thermal runaway is in progress, evacuation and dousing-with-water-only-from-distance is generally the response — the fire will burn until the energy is exhausted. Prevention is the only effective control."
        onSite="The L3 supervisor reflex on lithium kit: store correctly (cool, dry, in fire-rated container for charging), handle carefully (no impact, no puncture), inspect routinely (any swelling, discolouration, smell, heat = remove from service immediately), charge under supervision (not overnight, not unattended, not in escape routes), dispose properly (Battery Regs 2009, never landfill, take to permitted recycling). New BS / IEC standards (BS EN IEC 63056, BS 8643) cover ESS installations; the L3 supervisor on any ESS work follows the system manufacturer’s requirements and the standards strictly."
      >
        <p>Lithium battery safe-handling essentials:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Storage</strong> — cool, dry, separate from flammables; fire-rated charging
            cabinets for higher-energy packs.
          </li>
          <li>
            <strong>Inspection</strong> — visual check before each use; swelling / discolouration
            / heat / smell = remove from service.
          </li>
          <li>
            <strong>Charging</strong> — manufacturer&apos;s charger only; supervised; not in
            escape routes; not on combustible surfaces.
          </li>
          <li>
            <strong>Mechanical protection</strong> — no impacts, no puncture, no stacking heavy
            loads on packs.
          </li>
          <li>
            <strong>Temperature</strong> — operate within manufacturer&apos;s range; damaged at
            extremes (high or low).
          </li>
          <li>
            <strong>Disposal</strong> — Battery Regs 2009 + Hazardous Waste Regs 2005; never
            landfill; permitted recycler with consignment note for hazardous fraction.
          </li>
          <li>
            <strong>Damaged-pack response</strong> — quarantine in metal container away from
            combustibles; report to manufacturer / supplier for return.
          </li>
          <li>
            <strong>Fire response</strong> — evacuate; raise alarm; if trained and equipped, use
            class-F or specialist Li-ion extinguisher; water sprays from distance can help cool
            surrounding materials; do not attempt to smother an established Li-ion fire.
          </li>
          <li>
            <strong>Vehicle transport</strong> — ADR Special Provision 188 for small-quantity tool
            batteries; quantity limits apply; damaged batteries under Special Provision 376
            require specialist packaging.
          </li>
          <li>
            <strong>End-of-life identification</strong> — batteries that have reached rated cycle
            count or showing performance decline removed from service proactively rather than at
            failure.
          </li>
          <li>
            <strong>Domestic / commercial ESS installation</strong> — BS EN IEC 63056; BS 8643;
            manufacturer&apos;s installation manual; location restrictions (no habitable rooms in
            some standards; minimum separation distances).
          </li>
          <li>
            <strong>Fire ventilation in ESS</strong> — venting design for off-gas products of
            thermal runaway; specific to system manufacturer&apos;s requirements.
          </li>
          <li>
            <strong>Emergency response plan for ESS</strong> — agreed with local fire service for
            larger installations; isolation procedure for emergency services to apply.
          </li>
          <li>
            <strong>Off-gassing precursor</strong> — many lithium fires produce visible vapour and
            detectable smell before thermal runaway becomes visible flame; if observed evacuate
            immediately.
          </li>
          <li>
            <strong>Re-ignition risk</strong> — Li-ion fires can re-ignite hours or days later
            after apparent extinguishment; long-term monitoring required.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Hierarchy of control applied to substance hazards</ContentEyebrow>

      <ConceptBlock
        title="COSHH Reg 7(7) — the statutory hierarchy applied to chemical hazards"
        plainEnglish="COSHH Reg 7(7) sets out the hierarchy of control specifically for substance exposure in priority order. Substitution by a less hazardous substance or method; control of exposure at source (LEV, enclosure, process change); reduction of the number of employees exposed and the duration of exposure; suitable workplace conditions including hygiene; control of exposure to a specified level via collective measures; and personal protective equipment as the last resort. The hierarchy is the LEGAL approach to substance control, not a guideline. An RAMS that goes straight to PPE without addressing the higher levels is COSHH-non-compliant."
        onSite="Practical L3 application. Substitution: water-based contact cleaner instead of solvent where the application permits; cordless instead of corded tools in environments where flammable atmosphere risk exists; lead-free solder instead of leaded for general electronics work. Engineering at source: LEV for solder fume bench; on-tool dust extraction for chasing; sealed solvent containers with dispensing nozzles. Reduce exposure: limit batch size of solvent use; rotate operatives on heavy-exposure tasks; schedule high-emission work for end-of-day with overnight ventilation. Hygiene: separate eating area; hand-washing before food; change of clothing after dirty work. PPE: face-fit-tested FFP3 for dust; nitrile gloves for solvent contact; eye protection for splash risk."
      >
        <p>COSHH hierarchy of control with examples at each level:</p>
        <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Elimination</strong> — avoid the substance entirely; redesign the task so the
            substance is not needed.
          </li>
          <li>
            <strong>Substitution</strong> — replace with a less hazardous substance (water-based
            for solvent; lower-GWP refrigerant for high-GWP).
          </li>
          <li>
            <strong>Control at source</strong> — engineering measures that capture or contain the
            substance before it reaches the operative (LEV, on-tool extraction, enclosed process,
            dust suppression).
          </li>
          <li>
            <strong>Reduce exposure</strong> — limit numbers exposed; limit duration; rotate
            operatives; schedule for low-occupancy periods.
          </li>
          <li>
            <strong>Hygiene and welfare</strong> — washing facilities, separate eating area, no
            eating / drinking / smoking in work zone, change of clothing.
          </li>
          <li>
            <strong>Administrative controls</strong> — training, supervision, briefing, signage,
            restricted access.
          </li>
          <li>
            <strong>Personal Protective Equipment</strong> — RPE for inhalation, gloves for
            absorption, eye protection for splash, coveralls for skin contact.
          </li>
          <li>
            <strong>Maintenance of controls</strong> — engineering controls require periodic
            examination and test (LEV: COSHH Reg 9 + HSE HSG258 thorough examination and test at
            least every 14 months).
          </li>
          <li>
            <strong>Health surveillance</strong> — where exposure is residual and substance
            presents detectable health risk (COSHH Reg 11).
          </li>
          <li>
            <strong>Documentation</strong> — assessment, control selection rationale, monitoring
            results, surveillance records.
          </li>
        </ol>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Refrigerants and F-Gas — the L3 supervisor&apos;s coordination role
      </ContentEyebrow>

      <ConceptBlock
        title="Why refrigerant work needs a specific compliance pathway and what the L3 supervisor must know"
        plainEnglish="Refrigerants (HFCs, HFOs, ammonia, CO2) are F-Gas-regulated under the GB F-Gas Regulation (UK retained EU 517/2014). The high-GWP HFCs in particular face phase-down targets — the trade is shifting toward low-GWP HFOs and natural refrigerants. Electrical work in or near refrigeration equipment — HVAC plant rooms, heat pumps, refrigerated stores, EV battery cooling systems — can intersect with refrigerant containment. The L3 supervisor doesn’t need to be a refrigeration technician but should know that breaking into a refrigerant-containing system requires F-Gas certification (Reg (EU) 517/2014 / GB F-Gas), that refrigerant cannot be vented to atmosphere (offence under the Regulations), and that recovered refrigerant must be consigned to certified handlers for reclaim or destruction. Heat-pump installations (now a major growth area) brought refrigerant exposure to general electrical operatives in new ways; the L3 supervisor coordinates between the electrical work and the refrigerant work."
        onSite="On any installation involving refrigeration equipment, the L3 supervisor verifies that the operatives doing refrigerant-related work hold the appropriate F-Gas qualification (Cat I-IV per the regulations). If breaking into pipework is required, the F-Gas operative takes the lead; electrical operatives stay clear of refrigerant exposure. Heat pump installations increasingly bundle electrical and refrigerant work in one contract — the firm needs both competences or partners with a sub-contractor who holds the refrigerant side. Pump-down, recovery, leak-test and recharge are F-Gas-regulated activities with documentation requirements."
      >
        <p>F-Gas key points for the L3 supervisor:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>F-Gas certification required</strong> for installation, service, maintenance,
            repair, decommissioning of stationary refrigeration / AC / heat pumps containing
            fluorinated greenhouse gases.
          </li>
          <li>
            <strong>Categories I-IV</strong> — based on scope of work; firm certification separate
            from personnel certification.
          </li>
          <li>
            <strong>Leak-checking</strong> — mandatory at intervals depending on charge size;
            documented.
          </li>
          <li>
            <strong>Recovery only into approved cylinders</strong> — never vent; tracking via
            consignment.
          </li>
          <li>
            <strong>Labelling</strong> — equipment containing fluorinated gases labelled with type
            and quantity.
          </li>
          <li>
            <strong>Records retained</strong> — 5 years minimum for service, leak-test, recovery
            records.
          </li>
          <li>
            <strong>GWP awareness</strong> — Global Warming Potential of refrigerant; phase-down
            driving migration to low-GWP refrigerants.
          </li>
          <li>
            <strong>Flammable refrigerants</strong> — HFOs (R32, R454B), hydrocarbons (R290
            propane); fire considerations during work; appropriate detection / ventilation.
          </li>
          <li>
            <strong>Toxic refrigerants</strong> — ammonia (R717), CO2 (R744 — asphyxiant at high
            concentration); specific PPE and ventilation.
          </li>
          <li>
            <strong>Electrical-side competence sufficient for the electrical scope</strong>—
            heat-pump electrical install can be done by competent electrician with F-Gas operative
            handling refrigerant interface.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>
        Asbestos — the L3 working-environment hazard pre-2000 buildings retain
      </ContentEyebrow>

      <ConceptBlock
        title="Why every electrical task in a pre-2000 building starts with an asbestos check"
        plainEnglish="The Control of Asbestos Regulations 2012 (CAR 2012) impose a duty to manage asbestos in non-domestic premises. The duty-holder for the premises (owner, occupier, person in control) is required to find out if asbestos-containing materials (ACMs) are present, assess their condition, manage the risk and make information available to anyone whose work could disturb them. For an electrical contractor that means: before drilling, chasing, lifting floorboards or removing ceiling tiles in any building built or refurbished before 2000, the L3 supervisor MUST consult the asbestos register and the refurbishment / demolition survey. Without the register and survey, the work cannot proceed in disturbance scope. Common ACM locations in buildings: AIB (asbestos insulation board) in soffits, ceilings, partition walls, fire-stopping, panels behind heaters and boilers; sprayed coatings; lagging on pipes and boilers; cement products (corrugated sheets, gutters, downpipes); textured coatings (Artex); floor tiles and bitumen adhesives; gaskets and rope seals around boilers. Asbestos kills around 5,000 people per year in the UK — more than road traffic accidents. Electricians, plumbers, joiners and other trades feature prominently in occupational mortality statistics."
        onSite="The L3 supervisor reflex on any pre-2000 building: ask the customer / dutyholder for the asbestos register before quoting let alone working. No register = do not proceed in disturbance scope until a refurbishment / demolition survey is commissioned. Any unidentified material that could be ACM is treated as ACM until tested. The HSE has prosecuted firms repeatedly for disturbing asbestos without checking; ignorance is not a defence under CAR 2012. Where the register identifies ACMs the L3 supervisor plans the work to avoid disturbance, uses minimum-disturbance techniques (low-speed drilling, water suppression, cordless tools), and where any disturbance is unavoidable refers to a licensed asbestos contractor for the licensed work (or to a Non-Notifiable Non-Licensed Work / Notifiable Non-Licensed Work regime for less hazardous categories)."
      >
        <p>Pre-work asbestos protocol for the L3 supervisor:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Building age check</strong> — pre-2000 build = ACM possible until ruled out;
            pre-1985 = ACMs likely.
          </li>
          <li>
            <strong>Asbestos register</strong> — request from dutyholder; review before pricing or
            scheduling work.
          </li>
          <li>
            <strong>Refurbishment / demolition survey</strong> — required where work will disturb
            fabric; commissioned by dutyholder if not already in place.
          </li>
          <li>
            <strong>Disturbance scope check</strong> — identify whether the proposed work will
            disturb ACMs or surfaces concealing them.
          </li>
          <li>
            <strong>Avoid disturbance where reasonably practicable</strong> — alter cable route,
            surface-mount instead of chase, lift different ceiling tile.
          </li>
          <li>
            <strong>NNLW / Notifiable NLW / Licensed work categorisation</strong> — depending on
            type and condition of ACM; licensed work goes to licensed contractor only.
          </li>
          <li>
            <strong>Training</strong> — Asbestos Awareness (Cat A) required for all operatives in
            trade roles; NNLW or Notifiable NLW training for those doing the specific work; CAR
            2012 Reg 10.
          </li>
          <li>
            <strong>PPE for any limited disturbance work</strong> — disposable coveralls (Type 5),
            FFP3 respirator (face-fit tested), gloves, boots; decontamination arrangements.
          </li>
          <li>
            <strong>Stop work if suspect material discovered</strong> — do not continue; evacuate
            area; report to dutyholder; arrange sampling; HSE notification if exposure may have
            occurred.
          </li>
          <li>
            <strong>Health surveillance</strong> — CAR 2012 Reg 22 for licensed and notifiable
            work; biological monitoring records retained 40 years.
          </li>
          <li>
            <strong>Disposal</strong> — asbestos waste under Hazardous Waste Regs; consignment
            note; permitted facility; double-bagged in red asbestos bags.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />
      <ContentEyebrow>Substance register and on-site COSHH compliance</ContentEyebrow>

      <ConceptBlock
        title="Drafting a substance register that survives an HSE inspection"
        plainEnglish="A substance register lists every hazardous substance the firm holds and uses, with the current SDS, the CLP classification, the COSHH risk assessment, the storage location, the disposal route and the date of last review. It is the operational expression of COSHH Reg 6 (assessment) plus Reg 12 (information). The L3 supervisor maintaining the register at project level demonstrates the firm has thought about its substances rather than simply accumulated them. The register is one of the documents an HSE inspector commonly asks for during a site visit."
        onSite="Build the register from the bottom up — every substance on site goes on. Common omissions: aerosols (which are CLP-classified as flammable and pressurised), small adhesive tubes, sealant cartridges, marker pens with solvent bases, white spirit, brake cleaner if vehicle work also done. Each entry needs the SDS to hand — usually a folder on site or a digital library accessible from each van. Register reviewed at project start and updated when substances change."
      >
        <p>Substance register fields:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Product name and supplier</strong> — exact name as on the SDS.
          </li>
          <li>
            <strong>SDS version and date</strong> — current SDS attached or linked.
          </li>
          <li>
            <strong>CLP classification</strong> — pictograms, signal word, hazard statements.
          </li>
          <li>
            <strong>Quantity held</strong> — typical stock on site / per van.
          </li>
          <li>
            <strong>Use case</strong> — what task the substance is used for.
          </li>
          <li>
            <strong>Frequency and duration</strong> — how often and for how long operatives are
            exposed.
          </li>
          <li>
            <strong>Routes of exposure</strong> — inhalation, absorption, ingestion, injection.
          </li>
          <li>
            <strong>Control measures</strong> — engineering, administrative, PPE.
          </li>
          <li>
            <strong>Workplace Exposure Limit</strong> — from EH40 where applicable; referenced to
            SDS section 8.
          </li>
          <li>
            <strong>Storage</strong> — location, segregation, secondary containment, quantity
            limit.
          </li>
          <li>
            <strong>Transport</strong> — ADR considerations; any vehicle-load limits.
          </li>
          <li>
            <strong>Spillage and emergency</strong> — response procedure from SDS sections 5-6.
          </li>
          <li>
            <strong>First aid</strong> — from SDS section 4.
          </li>
          <li>
            <strong>Disposal route</strong> — waste category, carrier, facility.
          </li>
          <li>
            <strong>Health surveillance trigger</strong> — yes / no per COSHH Reg 11.
          </li>
          <li>
            <strong>Review date</strong> — annual minimum; sooner on substance change.
          </li>
          <li>
            <strong>Owner</strong> — who in the firm holds the register; who signs the
            assessments.
          </li>
        </ul>
      </ConceptBlock>

      <Scenario
        title="A substance discovered without a label — the L3 response"
        situation={
          <>
            You are on a domestic install. A previous trades-person left a small unmarked plastic
            bottle in the cupboard under the sink. The contents look like clear liquid. The
            customer doesn&apos;t know what it is. Your L2 mate asks &quot;can we just throw it
            down the drain?&quot;.
          </>
        }
        whatToDo={
          <>
            No, you cannot. Without identification, the substance could be anything — strong acid
            (battery electrolyte), solvent (paint thinner), pesticide, biocide, prescription
            medication. The drain disposal is potentially an Environment Agency offence under the
            Environmental Protection Act 1990 Part II / the Hazardous Waste Regulations 2005 / the
            Environmental Permitting Regulations 2016. The substance is also potentially a hazard
            to the operative who handles it. Step 1: do not handle without nitrile gloves and eye
            protection. Step 2: do not transfer to another container. Step 3: photograph in situ;
            note location, container size and condition. Step 4: ask the customer whether they
            recall who left it or what it might be; if so consult that information. Step 5: if
            unidentified, treat as unknown hazardous waste; place in a sealed secondary container;
            label &quot;UNKNOWN — DO NOT OPEN&quot; with date and contact. Step 6: notify the
            firm; arrange collection by a licensed hazardous-waste carrier; the waste will be
            analysed and consigned to a permitted facility. Step 7: document for the firm&apos;s
            records — substance found, action taken, customer advised. Step 8: brief the customer
            not to handle unidentified substances they find in future and to contact the firm or
            local authority hazardous-waste service.
          </>
        }
        whyItMatters={
          <>
            The throw-it-down-the-drain reflex is one of the highest-consequence shortcuts in the
            trade because it can trigger an Environment Agency prosecution that runs alongside the
            HSE health-and-safety side. Pouring strong acid into a domestic drain can damage
            pipework, treatment plants and watercourses; the offence carries unlimited fines.
            Untraced chemical disposal is one of the patterns the Environment Agency actively
            prosecutes. The unknown-substance protocol — do not handle, do not transfer, do not
            dispose informally — protects both the operative and the firm. The L2 mate asking the
            question is doing the right thing; the L3 supervisor providing the right answer is the
            system working as intended.
          </>
        }
      />

      <SectionRule />
      <FAQ items={faqs} />
      <SectionRule />
      <KeyTakeaways
        points={[
          'Remember from L2 — pictograms warn of hazard. At L3 you read the SDS too.',
          'Nine GB CLP pictograms: explosive, flame, oxidiser, gas under pressure, corrosion, acute toxicity (skull), health hazard, harmful (exclamation), environment.',
          'Skull = acute toxicity (short-term). Silhouetted figure (health hazard) = chronic / long-term. Different management.',
          'SDS = 16-section document. Sections 4 (first aid), 5 (fire), 6 (spillage), 7 (handling/storage), 8 (PPE), 13 (disposal) are operationally critical.',
          "GB CLP triggers COSHH — label tells you it's hazardous; COSHH tells you how to use it safely.",
          'L3 supervisor maintains substance register and SDS folder. Updates as substances change. Available on site.',
          "Unmarked container = unknown = don't use. Dispose as unknown hazardous waste if necessary.",
          'Common electrical substances: contact cleaner (flame + exclamation), lithium batteries (flame + environment), refrigerants (gas + environment), battery electrolyte (corrosion + environment).',
          'H-codes (hazard) and P-codes (precautionary) standardised internationally — read them on the label.',
          "Workplace Exposure Limits (EH40) — TWA 8-hour and 15-minute short-term; absent WEL doesn't mean unlimited.",
          'Health surveillance triggers (Reg 11) — silica, solder fume, lead, asbestos, vibration, noise, sensitisers.',
          'Hazardous waste disposal — Hazardous Waste Regs 2005, EPA s.34, consignment notes, licensed carrier, permitted facility.',
          'Pre-2000 building protocol — asbestos register and survey BEFORE drill / chase / lift; CAR 2012 duty.',
          'Unknown-substance protocol — do not handle without PPE; do not transfer or dispose informally; treat as hazardous waste until identified.',
        ]}
      />
      <Quiz title="CLP pictograms — knowledge check" questions={quizQuestions} />

      <SectionRule />


      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        COSHH 2002, the Safety Data Sheet 16-section format, and the chemicals an electrician
        actually meets. Pre-task review of the SDS is the point — not after-spill review.
      </p>

      <TLDR
        points={[
          'COSHH 2002 is the UK statutory framework for hazardous substances at work. Reg 6 requires assessment BEFORE exposure; Reg 7 requires control; Reg 11 requires health surveillance where exposure is regular.',
          "Safety Data Sheet (SDS) is the manufacturer's 16-section document required by the CLP Regulation (EU 1272/2008, retained UK law). Sections 2 (hazards), 4 (first aid) and 8 (PPE) are the apprentice's first-read priorities.",
          "Common electrical-trade chemicals — cable lubricant, contact cleaner, masonry sealant, two-pack epoxy, brick acid, dust suppressant — all need an SDS in the firm's COSHH register. Read it BEFORE the spill, not after.",
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Supplementary content — extends the outcome on purpose of workplace information. Not directly mapped to a single 210 AC. COSHH awareness is an operative-level skill; full COSHH assessment is a supervisor / employer competency.',
          'Define COSHH and identify the 2002 regulations as the UK statutory framework for hazardous substance exposure at work.',
          "Identify the SDS (Safety Data Sheet) as the manufacturer's authoritative source of hazard, handling and first-aid information, required under the CLP Regulation (EU 1272/2008, retained UK law).",
          "Recall the 16-section structure of the SDS and identify Sections 2 (hazards), 4 (first aid) and 8 (exposure controls / PPE) as the apprentice's first-read priorities.",
          'Identify common electrical-trade chemicals (cable lubricant, contact cleaner, masonry sealant, two-pack epoxy, brick acid, dust suppressant) and the typical hazards each carries.',
          "Identify the locations where the SDS for a substance can be reliably found — manufacturer website, firm's COSHH register (paper or app), product packaging.",
          'Apply the rule of pre-task SDS review — read the SDS BEFORE handling, not after exposure.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>The COSHH 2002 framework</ContentEyebrow>

      <ConceptBlock
        title="Identify, assess, control, monitor — the four-step framework"
        plainEnglish="COSHH 2002 sets out a four-step framework for managing hazardous substances at work. Identify what's being used and what its hazards are. Assess the risk in the actual use context. Control the exposure (eliminate, substitute, engineer, PPE). Monitor (workplace exposure measurement and health surveillance where the risk warrants it). Apply this to every chemical that goes into the van."
        onSite="The framework is the employer's duty but the practical reality lives at the operative level. Your job as an apprentice is to read the SDSs for the substances you actually handle, follow the controls in the RAMS, wear the PPE specified in Section 8 of the SDS, and report any health symptoms (skin reactions, breathing issues) so the surveillance loop works."
      >
        <p>The four steps in practice on a typical electrical job:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Identify</strong> — list every chemical brought to site (cable lubricant,
            contact cleaner, masonry sealant, brick acid). Pull the SDS for each.
          </li>
          <li>
            <strong>Assess</strong> — for each substance, evaluate the risk in the actual use
            (volume, frequency, ventilation, persons exposed). Document in the COSHH assessment.
          </li>
          <li>
            <strong>Control</strong> — apply the hierarchy: eliminate (don't use it), substitute
            (less hazardous alternative), engineer (extract ventilation, enclosure), PPE (gloves,
            goggles, respiratory protection).
          </li>
          <li>
            <strong>Monitor</strong> — workplace exposure measurement where required (e.g. silica
            from chasing), health surveillance where required (e.g. respiratory sensitisers).
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 6 (Assessment)"
        clause={
          <>
            &quot;An employer shall not carry out work which is liable to expose any employees to
            any substance hazardous to health unless he has — (a) made a suitable and sufficient
            assessment of the risk created by that work to the health of those employees and of
            the steps that need to be taken to meet the requirements of these Regulations; and (b)
            implemented the steps referred to in sub-paragraph (a).&quot;
          </>
        }
        meaning={
          <>
            Reg 6 puts the assessment duty on the employer BEFORE any exposure. The assessment has
            to be &apos;suitable and sufficient&apos; — the same test as MHSWR Reg 3. In practice
            this means a documented COSHH assessment for every substance used, drawing on the
            manufacturer&apos;s SDS for the technical detail. Reading the SDS is how you check
            that the assessment in front of you actually reflects what the substance is.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 6 — verbatim from legislation.gov.uk."
      />

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 7 (Prevention or control of exposure)"
        clause={
          <>
            &quot;Every employer shall ensure that the exposure of his employees to substances
            hazardous to health is either prevented or, where this is not reasonably practicable,
            adequately controlled.&quot; The hierarchy of control runs: elimination, substitution,
            engineering controls, administrative controls, personal protective equipment.
          </>
        }
        meaning={
          <>
            Reg 7 is the control duty — once you&apos;ve assessed the risk, you have to prevent
            exposure if you can, and control it if you can&apos;t. The hierarchy puts PPE last
            because PPE only protects the wearer (not bystanders), can fail in use, and depends on
            the operative wearing it correctly. On site this means the controls in the RAMS should
            follow the hierarchy — extract ventilation before respiratory PPE, enclosed mixing
            before open mixing, less-hazardous substitute before riskier original.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 7 — paraphrased from legislation.gov.uk."
      />

      <RegsCallout
        source="Control of Substances Hazardous to Health Regulations 2002 — Reg 11 (Health surveillance)"
        clause={
          <>
            Reg 11 requires health surveillance for employees exposed to specific scheduled
            substances (Schedule 6) and for any work where there is &quot;a reasonable likelihood
            that an identifiable disease or adverse health effect will occur under the particular
            conditions of work and there are valid techniques for detecting indications of the
            disease or effect&quot;.
          </>
        }
        meaning={
          <>
            Reg 11 means that for substances with sensitisation, carcinogenic or chronic toxicity
            hazards (flagged in SDS Sections 2 and 11), the employer has to arrange medical
            surveillance — typically lung function tests, skin examinations, regular review by an
            occupational health professional. Two-pack isocyanate products and respirable
            crystalline silica from masonry chasing are the textbook trade examples. If
            you&apos;re regularly exposed and there&apos;s no surveillance, raise it with the
            H&amp;S officer.
          </>
        }
        cite="Source: Control of Substances Hazardous to Health Regulations 2002 (SI 2002/2677), Reg 11 — paraphrased from legislation.gov.uk."
      />

      <InlineCheck
        id={checks2[0].id}
        question={checks2[0].question}
        options={checks2[0].options}
        correctIndex={checks2[0].correctIndex}
        explanation={checks2[0].explanation}
      />

      <ConceptBlock
        title="GHS pictograms — the diamond symbols on every container"
        plainEnglish="The diamond-shaped red-and-white symbols on hazardous-substance containers are the GHS pictograms (Globally Harmonised System) introduced under CLP. Each pictogram represents a class of hazard — skull for acute toxicity, exclamation mark for irritation or sensitisation, flame for flammability, corrosion for skin or metal damage, exploding bomb for explosion, gas cylinder for compressed gas, environmental for aquatic toxicity, health hazard for chronic effects."
        onSite="Recognising the pictograms in seconds — without having to read the label — is one of the basic chemical-safety skills. By year one you should know all eight by sight. They appear on the container, in Section 2 of the SDS, and increasingly in COSHH register apps. The Signal Word ('Danger' = high-severity, 'Warning' = lower-severity) sits alongside them."
      >
        <p>The eight GHS pictograms you&apos;ll meet in the trade:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Skull and crossbones</strong> &mdash; acute toxicity. Severe poisoning from
            short-term exposure. Rare in electrical-trade chemicals but possible in some
            industrial settings.
          </li>
          <li>
            <strong>Exclamation mark</strong> &mdash; irritant, sensitiser, narcotic. Common on
            cleaning products, lubricants, sealants.
          </li>
          <li>
            <strong>Flame</strong> &mdash; flammable. Contact cleaners, IPA, some adhesives.
          </li>
          <li>
            <strong>Corrosion</strong> &mdash; skin or metal damage. Brick acid, some cleaning
            chemicals, two-pack hardeners.
          </li>
          <li>
            <strong>Exploding bomb</strong> &mdash; explosive. Rare in trade settings.
          </li>
          <li>
            <strong>Gas cylinder</strong> &mdash; compressed or refrigerated gas. Aerosols,
            refrigerant gases.
          </li>
          <li>
            <strong>Environment</strong> &mdash; aquatic toxicity. Some lubricants, solvents,
            heavy-metal-containing products.
          </li>
          <li>
            <strong>Health hazard</strong> &mdash; chronic toxicity, carcinogenicity, respiratory
            sensitisation. Two-pack epoxies, some solvents, silica dust.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The 16-section SDS format</ContentEyebrow>

      <ConceptBlock
        title="Standardised structure under the CLP Regulation"
        plainEnglish="Every Safety Data Sheet for a hazardous substance follows the same 16-section structure, set by the CLP Regulation (EU 1272/2008, retained as UK law). Same sections, same order, same content categories, every product, every manufacturer. Once you know the structure you can navigate any SDS in seconds."
        onSite="The fixed structure is one of the most useful things about the SDS. Skip the marketing on the front, go straight to the section you need. Section 4 for first aid. Section 8 for PPE. Section 13 for disposal. By year three the section numbers should be muscle memory."
      >
        <div className="space-y-3">
          <p className="text-[14px] leading-relaxed">
            The 16 sections — table for desktop, card list for mobile.
          </p>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full text-[13px]">
              <thead className="bg-white/[0.04] text-white/80 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium w-12">§</th>
                  <th className="px-3 py-2 font-medium">Section</th>
                  <th className="px-3 py-2 font-medium">Use it for</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {[
                  ['1', 'Identification', 'Product name, supplier, emergency contact'],
                  ['2', 'Hazards identification', 'GHS pictograms, signal words, H-statements'],
                  ['3', 'Composition / ingredients', 'CAS numbers, hazardous components'],
                  ['4', 'First aid measures', 'Skin, eye, inhalation, ingestion response'],
                  ['5', 'Firefighting measures', 'Suitable / unsuitable extinguishers'],
                  ['6', 'Accidental release', 'Spill containment and clean-up'],
                  ['7', 'Handling and storage', 'Compatibility, ventilation, temperature'],
                  ['8', 'Exposure controls / PPE', 'WELs, gloves, eye, RPE, body protection'],
                  ['9', 'Physical / chemical', 'Appearance, flash point, pH, density'],
                  ['10', 'Stability and reactivity', 'Incompatible materials, decomposition'],
                  ['11', 'Toxicological info', 'Acute / chronic effects, sensitisation'],
                  ['12', 'Ecological info', 'Aquatic toxicity, persistence'],
                  ['13', 'Disposal considerations', 'Waste codes, treatment routes'],
                  ['14', 'Transport info', 'UN number, ADR class, packing group'],
                  ['15', 'Regulatory info', 'CLP, REACH, other applicable regulations'],
                  ['16', 'Other information', 'Revision history, abbreviations, references'],
                ].map(([num, name, use]) => (
                  <tr key={num} className="border-t border-white/[0.06]">
                    <td className="px-3 py-2 font-mono text-elec-yellow/80">{num}</td>
                    <td className="px-3 py-2 font-medium">{name}</td>
                    <td className="px-3 py-2 text-white/70">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden space-y-2">
            {[
              ['1', 'Identification', 'Product name, supplier, emergency contact'],
              ['2', 'Hazards identification', 'GHS pictograms, signal words, H-statements'],
              ['3', 'Composition / ingredients', 'CAS numbers, hazardous components'],
              ['4', 'First aid measures', 'Skin, eye, inhalation, ingestion response'],
              ['5', 'Firefighting measures', 'Suitable / unsuitable extinguishers'],
              ['6', 'Accidental release', 'Spill containment and clean-up'],
              ['7', 'Handling and storage', 'Compatibility, ventilation, temperature'],
              ['8', 'Exposure controls / PPE', 'WELs, gloves, eye, RPE, body protection'],
              ['9', 'Physical / chemical', 'Appearance, flash point, pH, density'],
              ['10', 'Stability and reactivity', 'Incompatible materials, decomposition'],
              ['11', 'Toxicological info', 'Acute / chronic effects, sensitisation'],
              ['12', 'Ecological info', 'Aquatic toxicity, persistence'],
              ['13', 'Disposal considerations', 'Waste codes, treatment routes'],
              ['14', 'Transport info', 'UN number, ADR class, packing group'],
              ['15', 'Regulatory info', 'CLP, REACH, other applicable regulations'],
              ['16', 'Other information', 'Revision history, abbreviations, references'],
            ].map(([num, name, use]) => (
              <div
                key={num}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-elec-yellow/80 text-[12px]">§{num}</span>
                  <span className="text-[13px] font-semibold text-white">{name}</span>
                </div>
                <div className="mt-1 text-[12px] text-white/65">{use}</div>
              </div>
            ))}
          </div>
        </div>
      </ConceptBlock>

      <ConceptBlock
        title="The four sections an apprentice should know cold"
        plainEnglish="You don't need to memorise all 16 sections. Four are enough — Section 2 (what hazards), Section 4 (first aid), Section 8 (PPE), Section 13 (disposal). Those four cover the apprentice's day-to-day needs. Knowing them off the top of your head means you can navigate any SDS in seconds when something goes wrong."
        onSite="By the end of year one you should be able to open an SDS for any chemical on the van and find the first-aid response (Section 4) in under ten seconds. The other twelve sections matter to the COSHH assessor and the H&S officer; they're rarely the apprentice's first read."
      >
        <p>The four to commit to memory:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Section 2 — Hazards</strong>: GHS pictograms, signal word (&quot;Danger&quot;
            / &quot;Warning&quot;), H-statements (e.g. H314 &quot;causes severe skin burns and eye
            damage&quot;). What the substance can do to you.
          </li>
          <li>
            <strong>Section 4 — First aid</strong>: skin, eye, inhalation, ingestion responses.
            The seconds-matter section when something goes wrong.
          </li>
          <li>
            <strong>Section 8 — PPE</strong>: which gloves (often nitrile to EN 374), which eye
            protection (often EN 166), which respiratory protection (FFP3 / cartridge), workplace
            exposure limits.
          </li>
          <li>
            <strong>Section 13 — Disposal</strong>: how to dispose of the substance and
            contaminated PPE / containers. Waste codes for licensed disposal.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id={checks2[1].id}
        question={checks2[1].question}
        options={checks2[1].options}
        correctIndex={checks2[1].correctIndex}
        explanation={checks2[1].explanation}
      />

      <ConceptBlock
        title="Workplace Exposure Limits (WELs) and what they mean for you"
        plainEnglish="A WEL is the maximum concentration of a hazardous airborne substance that an operative may be exposed to over a defined period (typically 8-hour time-weighted average for long-term exposure, 15-minute STEL for short-term exposure peaks). HSE publishes EH40 — the official list of workplace exposure limits in Great Britain. Not every substance has a WEL; those that do are listed in EH40 and referenced in Section 8 of the SDS."
        onSite="The relevance to an electrician is mostly around respirable crystalline silica (chasing brick), solvents (contact cleaners, IPA), and isocyanates (two-pack epoxies). The SDS Section 8 will tell you whether the substance has a WEL and what it is. The control measures in the RAMS should keep exposure below the limit — typically through extract ventilation, dust suppression, or respiratory PPE."
      >
        <p>Two WEL types you&apos;ll meet:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>8-hour TWA (Time-Weighted Average)</strong> &mdash; the long-term limit.
            Averaged over a normal working day. The value most often used in dust and vapour
            assessment.
          </li>
          <li>
            <strong>15-minute STEL (Short-Term Exposure Limit)</strong> &mdash; the short-term
            peak limit. Stops a brief high-exposure event from being averaged away to nothing.
          </li>
          <li>
            <strong>Substances without a WEL</strong> &mdash; not necessarily safe. COSHH 2002
            still requires exposure to be &quot;adequately controlled&quot; regardless of whether
            a numerical limit applies.
          </li>
          <li>
            <strong>EH40</strong> &mdash; the HSE&apos;s authoritative list. Updated periodically.
            The reference your H&amp;S officer uses.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Common electrical-trade chemicals</ContentEyebrow>

      <ConceptBlock
        title="The chemicals you'll actually meet — and what their SDSs typically say"
        plainEnglish="The electrical trade uses a smaller chemical inventory than plumbing or decorating, but several common products carry significant hazards. Knowing the typical hazard profile of each means you can read the SDS quickly and confirm the assessment is right for the substance."
        onSite="None of the products below should be on the van without an SDS in the COSHH register. If you arrive at a job and a chemical is being used without one, that's the moment to stop and raise it. COSHH 2002 Reg 6 requires the assessment BEFORE exposure, and the SDS is the source for the assessment."
      >
        <ul className="space-y-2 list-disc pl-5 marker:text-elec-yellow/70 text-[14px] leading-relaxed">
          <li>
            <strong>Cable lubricant</strong> — typically water-based or wax-based surfactants.
            Skin sensitisation potential. Section 8 typically nitrile gloves; Section 13 typically
            licensed disposal of contaminated rags.
          </li>
          <li>
            <strong>Contact cleaner / electronic cleaner</strong> — typically isopropyl alcohol
            (IPA) or proprietary solvent blends. Flammable, eye and respiratory irritant. Section
            8 typically gloves, eye protection, ventilation. Section 7 typically &quot;keep away
            from ignition sources&quot;.
          </li>
          <li>
            <strong>Masonry sealant</strong> — silane / siloxane base or solvent-based. Skin and
            eye irritant. Section 8 typically nitrile gloves and respiratory protection in
            confined spaces.
          </li>
          <li>
            <strong>Two-pack epoxy resin</strong> — for fixings, panel repairs, conduit seals.
            Often contains isocyanate or amine hardeners — Section 11 typically flags respiratory
            sensitisation. Section 8 PPE is significant; Reg 11 health surveillance often
            required.
          </li>
          <li>
            <strong>Brick acid (hydrochloric acid)</strong> — for cleaning chased surfaces.
            Strongly corrosive. Section 4 first aid is critical (irrigate with water for 15+
            minutes). Section 8 demands chemical-resistant gloves, goggles, and ventilation.
          </li>
          <li>
            <strong>Dust suppressant</strong> — water-based polymer or surfactant solutions.
            Generally low-hazard but Section 13 may flag licensed disposal. Used for chasing and
            concrete drilling to control respirable crystalline silica.
          </li>
          <li>
            <strong>Solder flux</strong> — used in low-voltage and panel work. Older rosin-based
            fluxes are respiratory sensitisers (Section 11 flag). Modern no-clean fluxes are
            typically less hazardous but still need an SDS.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where to find the SDS</ContentEyebrow>

      <ConceptBlock
        title="Three reliable sources — manufacturer site, firm's COSHH register, packaging"
        plainEnglish="The SDS is a controlled document maintained by the manufacturer and updated when classifications change. The three reliable sources are the manufacturer's website (always the latest version), the firm's COSHH register where current SDSs are filed, and the original packaging at the time of purchase. Trade WhatsApp screenshots are not authoritative."
        onSite="Many manufacturers print QR codes on the can that link directly to the latest SDS. That's the fastest way to get an authoritative copy on site. The firm's COSHH register (paper folder or app) should contain SDSs for everything regularly carried; if a substance is on site that isn't in the register, that's the moment to raise it before handling."
      >
        <p>The three sources, ranked:</p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>Manufacturer's website</strong> — always the latest version, indexed by
            product name. Most manufacturers maintain a downloads section; many print QR codes on
            the packaging that link directly to the SDS PDF.
          </li>
          <li>
            <strong>Firm's COSHH register</strong> — paper folder or app (Sypol, Alcumus, Trade
            Point COSHH and similar). The H&amp;S officer keeps it current. Contains the SDSs for
            everything regularly used by the firm.
          </li>
          <li>
            <strong>Original packaging insert</strong> — the SDS at the time of purchase, printed
            in the packaging. May be out of date if the substance has been reclassified — check
            against the manufacturer&apos;s site if you&apos;re unsure.
          </li>
        </ol>
      </ConceptBlock>

      <InlineCheck
        id={checks2[2].id}
        question={checks2[2].question}
        options={checks2[2].options}
        correctIndex={checks2[2].correctIndex}
        explanation={checks2[2].explanation}
      />

      <ConceptBlock
        title="The link between SDS, RAMS and COSHH register — three documents, one chain"
        plainEnglish="The COSHH register is the firm's master list of hazardous substances in use, with an SDS attached for each. The SDS is the manufacturer's authoritative information for any one substance. The RAMS is the site-specific working method that incorporates the SDS-derived controls. The three documents work together — register identifies what's used, SDS gives the technical detail, RAMS turns it into specific instructions for specific work."
        onSite="A RAMS for a job involving brick acid that doesn't reference the SDS for that brick acid is incomplete. A COSHH register that doesn't have an SDS for a substance the firm regularly carries is incomplete. A site without either the register or the relevant SDSs is in breach of COSHH 2002 Reg 6 — the assessment basis isn't there. The three documents are mutually reinforcing; missing any one weakens the whole chain."
      >
        <p>How the three documents relate in practice:</p>
        <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
          <li>
            <strong>COSHH register</strong> &mdash; firm-wide list of substances in use, kept
            current by the H&amp;S officer. SDS attached for each entry.
          </li>
          <li>
            <strong>SDS</strong> &mdash; manufacturer&apos;s 16-section document for the
            substance. The technical authority.
          </li>
          <li>
            <strong>COSHH assessment</strong> &mdash; firm&apos;s assessment of the risk in the
            specific use context, drawing on the SDS for hazard data and on site conditions for
            exposure data.
          </li>
          <li>
            <strong>RAMS</strong> &mdash; site-specific safe system of work, with the
            COSHH-derived controls baked into the method statement.
          </li>
          <li>
            <strong>Sign-on and toolbox talk</strong> &mdash; daily mechanism for keeping the
            controls active in the actual work.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Reading the SDS only after the spill"
        whatHappens={
          <>
            Apprentice is decanting brick acid from a 5L bottle into a smaller container for use
            in cleaning down a chased wall. No goggles, nitrile gloves only (not the heavier
            chemical-resistant grade specified in Section 8 of the SDS). Acid splashes onto the
            back of the hand, eats through the glove, contacts skin. The apprentice has to look up
            the SDS in the moment — eyes-watering, hand stinging — to find the first-aid response.
            By the time they get to running water the exposure has been three minutes and the skin
            is already showing chemical burn.
          </>
        }
        doInstead={
          <>
            Read Sections 2, 4 and 8 of the SDS BEFORE handling. The pre-task review takes two
            minutes. For brick acid the SDS will tell you Section 8 demands chemical-resistant
            gloves (often EN 374 to a specific permeation rating), goggles, and good ventilation.
            Section 4 will tell you the first-aid response is irrigation with running water for at
            least 15 minutes. Knowing this BEFORE the spill means you have the right kit on, and
            if a spill happens anyway you&apos;re at the tap within seconds rather than scrolling
            for an SDS.
          </>
        }
      />

      <Scenario
        title="Brick acid spill on hand during chase work"
        situation={
          <>
            You&apos;re chasing brick on a small commercial unit. The site bricklayer has been
            cleaning down chased surfaces with brick acid (a strong hydrochloric acid solution)
            and asks you to spread some lime mortar back into a chase. Reaching for the trowel you
            knock the open acid bottle and a splash lands on the back of your right hand. The
            bottle&apos;s SDS is in the COSHH register on the site tablet.
          </>
        }
        whatToDo={
          <>
            Don&apos;t scroll for the SDS first &mdash; you should already know what Section 4
            says from the pre-task review. Get to running water immediately and irrigate the
            affected skin for at least 15 minutes (the standard SDS Section 4 response for
            corrosive substances). While you&apos;re irrigating, your colleague pulls the SDS up
            on the tablet to confirm the response and to check Section 4 for any specific advice
            (some acids need bicarbonate neutralisation after irrigation, others don&apos;t).
            Remove any contaminated clothing. Once the irrigation period is complete, assess the
            skin &mdash; if it&apos;s reddened but intact and pain has subsided, monitor; if
            there&apos;s blistering, broken skin or persistent pain, seek medical advice as
            Section 4 will instruct. Report the incident to the supervisor; complete an accident
            report; review the COSHH assessment to confirm whether the controls were adequate or
            need tightening (e.g. heavier glove specification, different decanting procedure).
          </>
        }
        whyItMatters={
          <>
            The point of the SDS is that you&apos;ve already read it before the spill. Section 4
            is at the front of every SDS specifically because exposure incidents are
            time-sensitive &mdash; the first 60 seconds of irrigation matter more than the next 10
            minutes. Apprentices who treat the SDS as &quot;reference material to consult after
            something goes wrong&quot; have it backwards. Pre-task review is the entire point.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs2} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'COSHH 2002 is the UK statutory framework for hazardous substances at work — Reg 6 (assess BEFORE exposure), Reg 7 (control via the hierarchy), Reg 11 (health surveillance where exposure is regular).',
          "The SDS (Safety Data Sheet) is the manufacturer's authoritative information for COSHH assessment. The 16-section format is fixed by the CLP Regulation (EU 1272/2008, retained as UK law).",
          'The four SDS sections to know cold: Section 2 (hazards), Section 4 (first aid), Section 8 (PPE), Section 13 (disposal). By year three these should be muscle memory.',
          "Common electrical-trade chemicals — cable lubricant, contact cleaner, masonry sealant, two-pack epoxy, brick acid, dust suppressant, solder flux — all need an SDS in the firm's COSHH register.",
          "Three reliable sources for the SDS: manufacturer's website (always the latest version), firm's COSHH register (paper or app such as Sypol / Alcumus), original packaging insert. WhatsApp screenshots are not authoritative.",
          'Pre-task review is the entire point. Read Sections 2, 4 and 8 BEFORE handling, not after the spill. Section 4 is at the front of the SDS specifically because exposure incidents are time-sensitive.',
          "GHS pictograms (skull, exclamation, flame, corrosion) and H-statements (e.g. H314 'causes severe skin burns') are the standardised hazard communication under CLP. They appear on the container and in Section 2 of the SDS.",
          'If a chemical is on site without an SDS in the COSHH register, stop and get one before handling. COSHH Reg 6 requires the assessment to happen BEFORE exposure — adding a substance to use without an SDS is a Reg 6 breach.',
        ]}
      />

      <Quiz title="COSHH and SDS — knowledge check" questions={quizQuestions2} />

      {/* ── Prev / next nav ─────────────────────────────────── */}
    </div>
  );
}
