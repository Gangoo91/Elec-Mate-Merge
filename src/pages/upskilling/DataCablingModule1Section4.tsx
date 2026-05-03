import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m1s4-100m-channel-preserved',
    question:
      'A junior tells you "10G needs Cat6A, 25G needs Cat8 — they are different cables for different speeds". What is the more accurate way to think about Ethernet evolution and the 100 m channel?',
    options: [
      'Each speed has its own cable; the channel rule changes too.',
      'Every Ethernet variant from 100BASE-TX (1995) to 10GBASE-T (2006) and 25GBASE-T (2016) is engineered to preserve the 100 m channel within the appropriate Class — so the design discipline is to specify a CLASS with enough headroom for the foreseeable services and let new speeds slot in. Cat8 (Class I/II) is the special case: 25/40 GbE at 30 m channel only, used in data-centre top-of-rack.',
      'Class is irrelevant — only Category matters.',
      'The 100 m channel rule was abolished in 2016.',
    ],
    correctIndex: 1,
    explanation:
      'The 100 m channel is preserved across the Ethernet variants that the building cabling industry cares about. The way Ethernet evolution works is that each new speed is engineered to fit the existing channel budget at the appropriate Class — Class D for 100/1000BASE-T, Class E for 1000BASE-T and 10G to 55 m, Class EA for 10G to 100 m, Class FA for 10G with headroom, and Class I/II (Cat8) only for 25/40 GbE at 30 m channel for data-centre TOR. Future-proofing a generic-cabling install means picking the Class with enough headroom for the services the building will see — not picking a different cable for each speed.',
  },
  {
    id: 'datacabling-m1s4-class-headroom',
    question:
      'A 2026 fit-out specifies Class EA / Cat6A horizontal. Without re-pulling, what range of services should the cabling absorb over its 15-20 year life?',
    options: [
      'Only 1 GbE.',
      'All four-pair Ethernet variants up to 10GBASE-T at the full 100 m channel, plus IEEE 802.3bt PoE Type 1-4 (up to 90 W PSE / 71.3 W PD, within the 750 mA per-conductor BS 7671 §716.523.2.101 hard cap), plus 2.5GBASE-T and 5GBASE-T, plus IP voice / video / IoT / building-automation / digital-signage services running over Ethernet. 25GBASE-T at 100 m is OUT of scope for Class EA — it needs Class FA / Cat6A-with-headroom or Cat8 at shorter reach.',
      'Only IP voice and CCTV.',
      'Only services available in 2026 — anything later requires re-pulling.',
    ],
    correctIndex: 1,
    explanation:
      'Class EA / Cat6A is the 2026 default precisely because it absorbs the foreseeable services for 15-20 years: 10GBASE-T at full 100 m, 2.5G/5G/10G-BASE-T (NBASE-T variants designed for legacy Cat5e/6 reuse), Type 4 PoE++, all 1000BASE-T variants, IP voice / video / IoT. 25GBASE-T at 100 m is the next step up and requires Class FA or Cat8 at shorter reach — that is the boundary at which a 2026 install would consider an upgrade or a fibre-to-the-edge architecture.',
  },
  {
    id: 'datacabling-m1s4-cat8-not-the-answer',
    question:
      'A property developer wants the building "future-proofed for 100 GbE" and asks if they should specify Cat8 horizontal everywhere. What is the correct technical answer?',
    options: [
      'Yes — Cat8 is the future-proof choice.',
      'No — Cat8 (Class I/II) is engineered for 25/40 GbE at a 30 m channel and is intended for data-centre top-of-rack short links, not building-wide horizontal cabling. For 100 GbE in a horizontal channel, the appropriate medium is OPTICAL FIBRE (OM4 / OM5 multi-mode for shorter runs, OS2 single-mode for longer) — fibre-to-the-edge. The future-proof building strategy is Cat6A copper to most outlets PLUS fibre to high-density areas (APs, server-rack uplinks, broadcast / lab spaces).',
      'Yes — but only with Cat8.1.',
      'Yes — Cat8 supports 100 GbE at 100 m.',
    ],
    correctIndex: 1,
    explanation:
      'Cat8 (Class I per ANSI/TIA-568.2-E and Class II per ISO/IEC 11801-1) is a SHORT-CHANNEL data-centre cable: 25 / 40 GbE at 30 m channel maximum. It is not the future-proof horizontal medium. 100 GbE horizontal demands fibre — OM4 / OM5 / OS2 — which is what every modern future-proofing strategy specifies for high-density and high-speed areas, alongside Cat6A copper to general outlets. Cat8 is a useful tool in the right context (data-centre TOR), but specifying it building-wide is a category error.',
  },
  {
    id: 'datacabling-m1s4-poe-growth',
    question:
      'A future-proofing plan should account for how PoE will grow on the cabling. What are the relevant numbers and clauses for sizing the PASSIVE infrastructure for PoE growth from 15 April 2026?',
    options: [
      'There is no relevant cap.',
      'IEEE 802.3bt Type 4 caps PSE at 90 W and PD at 71.3 W (across all four pairs). BS 7671 §716.523.2.101 imposes a HARD regulatory cap of 750 mA per conductor; §716.526.101 imposes 750 mA per contact at the connecting hardware; §716.521.101 requires Cat 5/6/6A/7/7A/8.1/8.2 cable. Bundle thermal management is governed by TIA TSB-184-A and BS EN 50174-2 (cited in §716.523.1.101 NOTE 2). Future-proofing for PoE means: Cat6A or better, generous bundle separation, basket fill < 50 %, and design current within 750 mA per conductor.',
      'PoE grows beyond 100 W in future amendments.',
      'BS 7671 caps PoE at 60 W per port.',
    ],
    correctIndex: 1,
    explanation:
      "Future-proofing for PoE growth is bounded by IEEE 802.3bt's Type 4 (90 W PSE / 71.3 W PD) — there is no 100 W class — AND by BS 7671 §716.523.2.101's 750 mA per-conductor hard cap. The cabling-thermal envelope is the operative constraint as bundles grow: TIA TSB-184-A and BS EN 50174-2 (referenced via §716.523.1.101 NOTE 2 to PD CLC/TR 50174-99-1 and BS ISO/IEC 14763-2) give the bundle-management guidance. Specifying Cat6A, generous basket fill, and bundle counts that respect the de-rating tables is the future-proofing discipline.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the central design discipline of 'future-proofing' a structured cabling install?",
    options: [
      'Buying the most expensive cable available.',
      'Specifying a CLASS with enough headroom that the foreseeable services over the 15-20 year cabling life slot in without re-pulling — and provisioning pathway capacity, outlet density and bonding for those services. Future-proofing is a SPECIFICATION discipline, not a procurement-of-newest discipline.',
      'Installing fibre to every outlet.',
      'Avoiding PoE because it complicates planning.',
    ],
    correctAnswer: 1,
    explanation:
      'Future-proofing is decided at SPEC time. Pick a Class with headroom. Provision pathway capacity for ~50 % growth. Specify generous outlet density at first fit (cheap then, expensive later). Specify bonding and labelling that survive active-equipment refreshes. The cabling absorbs the services it was specified to absorb — and almost no service has ever been retro-specced to a non-future-proofed cabling installation.',
  },
  {
    id: 2,
    question:
      'Which Ethernet variant introduced 1 Gbps on twisted-pair cabling using all four pairs simultaneously, becoming the long-running default for office networks?',
    options: [
      '10BASE-T (1990).',
      '1000BASE-T (IEEE 802.3ab, 1999) — uses all four pairs of Cat5e (Class D) for full-duplex 1 Gbps at 100 m channel, with 5-level PAM-5 signalling. The first widely-deployed gigabit Ethernet on copper, and the variant against which "gigabit to the desk" became a default expectation.',
      '100BASE-FX (1995).',
      '40GBASE-T (2016).',
    ],
    correctAnswer: 1,
    explanation:
      '1000BASE-T (1999) was the breakthrough. It used all four pairs simultaneously with PAM-5 signalling to deliver 1 Gbps full-duplex across a 100 m channel of Cat5e (Class D) cabling. It became the default office Ethernet speed for ~15 years and is still ubiquitous today. The 100 m channel rule was preserved (and has been ever since), which is why a 1999 Cat5e office build that was honestly Class D delivered gigabit without a re-pull when 1000BASE-T arrived.',
  },
  {
    id: 3,
    question:
      'Which Ethernet variant requires Class EA / Cat6A cabling to deliver its full 100 m channel reach?',
    options: [
      '10BASE-T.',
      '10GBASE-T (IEEE 802.3an, 2006) — 10 Gbps full-duplex over four pairs with DSQ128 signalling at 400 MHz fundamental, channel reach 100 m on Class EA / Cat6A and only 55 m on Class E / Cat6 due to alien crosstalk. This is the variant that drove Cat6A adoption as the post-2010 commercial default.',
      '100BASE-TX.',
      '1000BASE-T.',
    ],
    correctAnswer: 1,
    explanation:
      "10GBASE-T (2006) is the variant that defines the 2010-2025 cabling-spec landscape. It needs Class EA / Cat6A to reach the full 100 m channel — Class E / Cat6 reaches only 55 m due to alien crosstalk between adjacent cables (which is why Cat6A's separators / shielding matter). This is why Cat6A became the default new-install Class from ~2014 onwards: it future-proofed the building for 10G-to-the-desk without speculative fibre cost.",
  },
  {
    id: 4,
    question:
      'How are 2.5GBASE-T and 5GBASE-T (the "NBASE-T" / IEEE 802.3bz variants, 2016) intended to be used?',
    options: [
      'They are obsolete.',
      'They are intermediate speeds (2.5 Gbps and 5 Gbps) engineered specifically to run on EXISTING Cat5e / Cat6 installations at the full 100 m channel — preserving the 100 m rule while delivering more than gigabit on cabling that cannot quite manage 10G. The motivating use case was Wi-Fi 5 / Wi-Fi 6 access points outpacing 1 GbE uplinks in older buildings.',
      'They require Cat8.',
      'They only work over fibre.',
    ],
    correctAnswer: 1,
    explanation:
      "2.5G and 5G-BASE-T (IEEE 802.3bz, 2016) are deliberately engineered to use existing Cat5e / Cat6 cabling at full 100 m. They are an admission that gigabit was no longer enough for high-density Wi-Fi APs but that re-cabling every existing office building to Cat6A was uneconomic. They preserve the 100 m channel rule by reducing the symbol rate compared to 10GBASE-T. They are an excellent example of the cabling industry's discipline of preserving the channel budget across speed transitions.",
  },
  {
    id: 5,
    question:
      'What does Cat8 (Class I per ANSI/TIA-568.2-E, Class II per ISO/IEC 11801-1) actually deliver, and where is it used?',
    options: [
      '100 GbE at 100 m channel — the future-proof copper.',
      'Cat8 supports 25 GBASE-T and 40 GBASE-T at a 30 m CHANNEL (not 100 m), with 2 connector terminations maximum. It is engineered for data-centre top-of-rack copper from a top-of-rack switch to servers in the same or adjacent rack. It is NOT a building-wide horizontal cable — that role belongs to Cat6A or fibre.',
      'It is identical to Cat6A.',
      'It is only used for fibre.',
    ],
    correctAnswer: 1,
    explanation:
      'Cat8 is the data-centre TOR copper. ANSI/TIA-568.2-E specifies Cat8 with a 30 m channel and only 2 connector terminations. It is intended for short server-to-switch links inside a rack or between adjacent racks. Specifying Cat8 building-wide is a category error — the building-wide horizontal cable is Cat6A, with fibre to high-density areas. For 100 GbE in a building-wide context, the answer is multi-mode (OM4/OM5) or single-mode (OS2) fibre, not Cat8.',
  },
  {
    id: 6,
    question: 'What does "Class headroom" mean in cabling specification?',
    options: [
      'The space above the cable basket.',
      "The margin between the cabling install's certified Class performance and the worst-case Class required by the foreseeable services. A Cat6A install honestly certified to Class EA delivers exactly 10G at 100 m; a Cat6A install certified to Class EA WITH MARGIN (passing Class FA on the same channel) gives headroom for 25G at shorter reach or for tighter PoE thermal regimes.",
      'The TR ceiling height.',
      'The patch-panel rack space.',
    ],
    correctAnswer: 1,
    explanation:
      'Class headroom is the certified-margin concept. Cat6A is engineered to MEET Class EA at 100 m. Premium Cat6A (sometimes marketed as "10G-plus" or "Class FA-ready") will pass Class FA on the same channel, giving headroom — meaning that as services tighten (more PoE current, tighter bundle, ageing connectors) the channel still passes Class EA comfortably. Specifying for headroom is a deliberate, defensible future-proofing choice.',
  },
  {
    id: 7,
    question:
      'A future-proof building strategy in 2026 typically combines which TWO physical media in the same install?',
    options: [
      'Cat5e copper everywhere, no fibre.',
      'Cat6A balanced copper to most general outlets (delivering 10GBASE-T to 100 m, NBASE-T variants, Type 4 PoE) PLUS optical fibre (typically OM4 / OM5 multi-mode and / or OS2 single-mode) to high-density areas — backbone, AP locations, server-rack uplinks, broadcast / lab spaces — for 25/40/100 GbE service density.',
      'Cat8 copper to every desk plus coax for cameras.',
      'Wi-Fi only — no cabling.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2026 future-proof default is Cat6A general copper + fibre to density. Cat6A delivers 10G to the desk and Type 4 PoE within the 750 mA per-conductor cap. Fibre to APs / server uplinks / high-density labs delivers 25/40/100 GbE service density without copper-channel constraints. The hybrid approach absorbs services from voice over IP (small) up to high-density Wi-Fi 7 / fibre-to-the-edge (very large) without re-pulling.',
  },
  {
    id: 8,
    question:
      'BS 7671:2018+A4:2026 §716.521.101 lists the cable categories permitted for ELV DC distribution over balanced cabling. Which set of categories is correct?',
    options: [
      'Cat5 only.',
      'Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 (or other cables as defined in BS EN 50173-1 by reference to BS EN 50288 series).',
      'Cat6A and Cat8 only.',
      'Any cable provided it has a screen.',
    ],
    correctAnswer: 1,
    explanation:
      '§716.521.101 (verbatim from the A4:2026 RAG): "Information and communication technology (ICT) cables used for the distribution of DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category 7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by reference to the specifications given in BS EN 50288 series." Cat5 is included — but for any practical 2026 future-proof install Cat6A is the floor, not Cat5.',
  },
  {
    id: 9,
    question:
      'A specifier wants to plan for "100 GbE at 100 m" in a building horizontal channel. Which medium and which standard answer that brief?',
    options: [
      'Cat8.1 copper.',
      'Multi-mode optical fibre (OM4 typically reaches 100 m for 100GBASE-SR4 with parallel optics, OM5 stretches further with SWDM4). For longer reach or more conservative futures, OS2 single-mode reaches well beyond building-wide distances. Reach numbers are governed by IEEE 802.3 (the relevant Ethernet variant) and BS EN 50173-1 / ISO/IEC 11801-1.',
      'Coaxial cable.',
      'There is no medium that can do that.',
    ],
    correctAnswer: 1,
    explanation:
      '100 GbE at 100 m horizontal is a fibre brief. OM4 / OM5 multi-mode fibre is the typical building-internal choice, OS2 single-mode for longer reaches and higher per-fibre service rates. The Ethernet variants (100GBASE-SR4 with 4-pair MPO, 100GBASE-DR / FR for longer reach) are governed by IEEE 802.3, and the cabling distances are set by BS EN 50173-1 / ISO/IEC 11801-1. Cat8 cannot reach 100 m at 100 GbE — that is not what it is engineered for.',
  },
  {
    id: 10,
    question:
      'Which TWO disciplines, applied at first fit, deliver the most future-proofing for the lowest extra cost?',
    options: [
      'More expensive cable everywhere; vendor-locked patch panels.',
      'Specifying GENEROUS OUTLET DENSITY (extra outlets at first fit cost very little — they cost 5-10× more to add later) AND PATHWAY CAPACITY headroom (basket fill below ~50 %, ducts sized for ~50 % growth). Both deliver foreseeable-service absorption at small marginal cost on day one and avoid brutal retrofit costs later.',
      'Pre-installing all switches at first fit.',
      'Skipping documentation to save effort.',
    ],
    correctAnswer: 1,
    explanation:
      'Outlet density and pathway capacity are the two cheap-now / expensive-later levers. An extra Cat6A outlet at first fit costs perhaps £40-£80 including labour and termination; the same outlet retro-fitted into an occupied building costs £200-£400 or more. Pathway capacity (cable basket fill ratios per BS EN 50174-2 / TIA-569-E) is the same logic at the containment scale — a 50 % fill at first fit absorbs growth, a 90 % fill at first fit forces re-tray work in two years. Both choices are made at first fit and both deliver the foreseeable-service absorption that "future-proofing" actually means.',
  },
];

const faqs = [
  {
    question:
      'How can the 100 m channel rule survive every Ethernet speed jump from 100 Mbps to 25 Gbps?',
    answer: (
      <>
        Because each new speed is engineered into the existing channel budget of the appropriate
        Class. Ethernet's design discipline since 100BASE-TX (1995) has been to preserve the 100 m
        channel — it is the SINGLE constraint the cabling industry holds Ethernet to. Each new speed
        pushes more bits through the same channel by using more pairs (1000BASE-T moved from 2-pair
        to 4-pair), more sophisticated signalling (PAM-5 → DSQ128 → PAM-16), or higher Class cable
        (Class D → Class E → Class EA → Class FA → Class I/II). The constant is the 100 m. The
        variable is the Class — and the future-proofing job is to specify a Class with enough
        headroom for the speeds the building will see over its life.
      </>
    ),
  },
  {
    question: 'Why is Cat6A the 2026 default rather than Cat6 or Cat7 / Cat7A?',
    answer: (
      <>
        Cat6A delivers 10GBASE-T at the full 100 m channel — which Cat6 cannot (Cat6 / Class E
        reaches only 55 m for 10G due to alien crosstalk). Cat7 and Cat7A use non-standard
        connectors (TERA, GG45) that the broader networking industry never adopted, so they remain
        niche; their performance is good but the connector ecosystem makes them awkward. Cat6A uses
        standard RJ45 connectors with shielded variants (S/FTP) for tighter alien crosstalk
        performance. The combination of standard connectors + 10G to 100 m + good Type 4 PoE thermal
        performance makes Cat6A the practical default. From 15 April 2026, BS 7671 §716.521.101
        explicitly permits Cat 5/6/6A/7/7A/8.1/8.2 — but Cat6A is the sweet spot for new commercial
        installs.
      </>
    ),
  },
  {
    question: 'When does it become cheaper to specify fibre to the work area instead of Cat6A?',
    answer: (
      <>
        Roughly when the per-outlet service density crosses around 10 GbE sustained (not just peak),
        or when the area concerned has unusual constraints — high RFI / EMI, very long runs that
        still want a single Class regardless of distance, or industries (broadcast, finance,
        healthcare imaging) where 25/40 GbE per workpoint is plausible within the cabling life.
        Multi-mode (OM4 / OM5) is the typical horizontal-fibre choice; fibre-to-the-edge passive
        splitter architectures push the active equipment back to the BD and run optical splitters in
        the FD area. The case is technical and economic — and almost every modern future-proofing
        strategy includes SOME fibre to the highest-density zones (AP cluster ceilings, dense lab
        spaces) alongside Cat6A general copper. The hybrid is more common than pure copper or pure
        fibre.
      </>
    ),
  },
  {
    question: 'Does future-proofing need to cover services that do not exist yet?',
    answer: (
      <>
        It needs to make REASONABLE provision for services that could PLAUSIBLY emerge in the
        cabling life, not unbounded speculation. A Class EA / Cat6A install can be honestly
        described as future-proofed for: 10GBASE-T, 2.5/5 GBASE-T (NBASE-T), Type 4 PoE, IP-based
        building services, IoT growth, and Wi-Fi generations 5 / 6 / 6E / 7. It cannot be described
        as future-proofed for "every speed Ethernet will ever invent" — at some future point,
        fibre-to-the-edge or new media will overtake any copper Class. The contractor's
        responsibility is to specify defensibly against foreseeable services and to document the
        spec, so a future contractor inherits a system whose performance envelope is known.
      </>
    ),
  },
  {
    question: "What's the right way to spec 'future PoE growth' in a 2026 design?",
    answer: (
      <>
        Three numbers and one document discipline. (1) <strong>Cable category</strong>: Cat6A
        minimum, per BS 7671 §716.521.101 (Cat 5/6/6A/7/7A/8.1/8.2 are permitted; Cat6A is the
        sensible floor for new builds). (2) <strong>Per-conductor design current</strong>: limit to
        750 mA per conductor (§716.523.2.101 — hard cap). For a Type 4 PoE port on 4-pair Ethernet
        that draws ~600 mA per pair worst case, you are well under. (3){' '}
        <strong>Bundle thermal management</strong>: keep bundle counts within TIA TSB-184-A and BS
        EN 50174-2 (referenced by §716.523.1.101 NOTE 2 to PD CLC/TR 50174-99-1 and BS ISO/IEC
        14763-2) — typically &lt; 24 cables per bundle for sustained Type 4 PoE, with physical
        separation between bundles and basket fill kept below ~50 %. The document discipline: record
        the design current, the bundle topology, and the thermal assumption in the as-built. The
        next contractor inherits the assumption explicitly.
      </>
    ),
  },
  {
    question:
      "If I am specifying for 'service-independence' as well as future-proofing, are they the same thing?",
    answer: (
      <>
        Closely related but distinct. <strong>Service-independence</strong> is the discipline of
        specifying the cabling so that it does not need to know what services run on it — it
        delivers a Class, the active layer chooses what to do with that Class.{' '}
        <strong>Future-proofing</strong> is the deliberate over-specification of that Class (and the
        outlet density, pathway capacity and bonding) to absorb services that do not exist yet but
        plausibly will. Service-independence makes the cabling indifferent to the services it
        currently carries. Future-proofing makes it indifferent to the services it will be asked to
        carry in 5, 10 and 15 years. Both are properties of the SPEC, not the cable.
      </>
    ),
  },
];

const DataCablingModule1Section4 = () => {
  const navigate = useNavigate();

  useSEO(
    'Network Speed and Future-Proofing | Data Cabling Module 1.4 | Elec-Mate',
    'The evolution of Ethernet from 10BASE-T to 25GBASE-T, the preservation of the 100 m channel rule, and the specification discipline of future-proofing — picking a Class with enough headroom (Cat6A / Class EA as the 2026 default), generous outlet density, pathway capacity, and BS 7671:2018+A4:2026 §716 PoE growth path — to absorb 15-20 years of services without re-pulling.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 4"
            title="Network Speed and Future-Proofing"
            description="Ethernet evolution from 10BASE-T (1990) to 25GBASE-T (2016), the 100 m channel rule preserved across every variant, and the specification discipline of future-proofing — picking a Class with enough headroom for foreseeable services, generous outlet density, pathway capacity, and a BS 7671:2018+A4:2026 §716 PoE growth path that the cabling can absorb without re-pulling."
            tone="yellow"
          />

          <TLDR
            points={[
              'Ethernet has evolved from 10BASE-T (1990) through 1000BASE-T (1999), 10GBASE-T (2006), 2.5/5GBASE-T (NBASE-T, 2016) and 25GBASE-T (2016) — and every variant has preserved the same 100 m channel rule. The constant is the 100 m; the variable is the Class.',
              'Future-proofing is a SPECIFICATION discipline, not a procurement-of-newest discipline. Pick a Class (Cat6A / Class EA is the 2026 default) with enough headroom for foreseeable services; provision pathway capacity for ~50 % growth; specify generous outlet density at first fit when it is cheap.',
              "PoE grows along the 802.3bt path (Type 1 → Type 4, capped at 90 W PSE / 71.3 W PD) and is bounded by BS 7671 §716.523.2.101's 750 mA per-conductor hard cap. Future-proof PoE = Cat6A or better, generous bundles, controlled de-rating per TIA TSB-184-A / BS EN 50174-2.",
              'The 2026 future-proof default is HYBRID: Cat6A copper to most general outlets PLUS optical fibre (OM4 / OM5 / OS2) to high-density / high-speed areas. Cat8 is data-centre TOR only — not a building-wide horizontal cable.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Trace the evolution of Ethernet from 10BASE-T (1990) through to 25GBASE-T (2016) and recognise that every variant preserves the 100 m channel rule',
              'Map Ethernet variants to their required cable Class (Class D, E, EA, FA, I/II) and explain why Cat6A / Class EA is the 2026 commercial default',
              'Explain the role of NBASE-T (2.5G / 5G BASE-T) as an intermediate-speed family engineered to use existing Cat5e / Cat6 cabling at full 100 m',
              'Distinguish Cat8 (Class I / II) as a data-centre top-of-rack cable (30 m channel, 25/40 GbE) from building-wide horizontal media (Cat6A, fibre)',
              'Articulate the "Class headroom" concept — certified-margin between cabling performance and worst-case service requirement — as the operative future-proofing lever',
              'Apply BS 7671:2018+A4:2026 §716.521.101 (permitted PoE cable categories), §716.523.2.101 (750 mA per-conductor cap), §716.526.101 (750 mA per-contact connecting hardware) and §716.523.1.101 (design current and bundle thermal references) to the future-proofing brief',
              'Justify the hybrid Cat6A + fibre future-proof default and recognise when fibre-to-the-edge is appropriate',
              'Specify outlet density and pathway capacity for ~50 % growth at first fit, recognising that retrofitted outlets and basket sections cost 5-10× more later',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>The Ethernet evolution timeline</ContentEyebrow>

          <ConceptBlock
            title="Every speed jump preserves the 100 m channel — only the Class moves"
            plainEnglish={`Ethernet on twisted pair has a 35-year evolution from 10BASE-T (1990) to 25GBASE-T (2016) and beyond. The remarkable engineering discipline is that every variant has preserved the same 100 m channel rule. As speeds increased, the cabling industry responded by raising the cable Class (more pairs in use, more sophisticated signalling, tighter alien-crosstalk control) — but the 100 m budget has held. That is what makes future-proofing tractable as a discipline: the building-shape decision (90 m permanent link, 100 m channel, six-zone topology) is fixed; the Class decision is the lever you pull to absorb future speeds.`}
            onSite={`When a vendor says a new Ethernet variant is coming, the first question is "does it preserve the 100 m channel?". For every variant since 100BASE-TX (1995) the answer has been yes, on the appropriate Class. The exception is Cat8 / Class I/II at 30 m — and that is explicitly a data-centre TOR cable, not a building horizontal one. So when designing horizontal cabling, your 90 m / 100 m geometry is permanent; only the Class evolves.`}
          >
            <p>The Ethernet variants that matter for building cabling, in chronological order:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>10BASE-T (IEEE 802.3i, 1990).</strong> 10 Mbps over 2 pairs of Cat3 / Class
                C cabling, 100 m channel. The variant that started the structured-cabling era —
                cheap UTP replaced expensive coax bus and made the physical-star generic topology
                economically attractive.
              </li>
              <li>
                <strong>100BASE-TX (IEEE 802.3u, 1995).</strong> 100 Mbps over 2 pairs of Cat5 /
                Class D, 100 m channel. The "fast Ethernet" of the 1990s — and the variant that
                fixed the 100 m channel rule that every subsequent twisted-pair Ethernet has
                preserved.
              </li>
              <li>
                <strong>1000BASE-T (IEEE 802.3ab, 1999).</strong> 1 Gbps over 4 pairs of Cat5e /
                Class D, 100 m channel, PAM-5 signalling. The breakthrough that made gigabit
                economic — and the variant against which "gigabit to the desk" became the default
                expectation. A 1999 Cat5e office build that was honestly Class D delivered gigabit
                without re-pulling.
              </li>
              <li>
                <strong>10GBASE-T (IEEE 802.3an, 2006).</strong> 10 Gbps over 4 pairs, full duplex,
                DSQ128 signalling at 400 MHz fundamental. Reach is 100 m on Class EA / Cat6A and
                only 55 m on Class E / Cat6 due to alien crosstalk. The variant that drove Cat6A
                adoption as the post-2010 default — 10G to the desk on a single Cat6A install with
                100 m headroom.
              </li>
              <li>
                <strong>2.5GBASE-T / 5GBASE-T (IEEE 802.3bz, 2016) — "NBASE-T".</strong>{' '}
                Intermediate speeds engineered specifically to run on existing Cat5e / Cat6
                installations at full 100 m. Use case: Wi-Fi 5 / 6 APs needing more than gigabit
                uplinks, in buildings where re-cabling Cat5e to Cat6A was uneconomic. A masterful
                example of preserving the channel budget across a speed transition.
              </li>
              <li>
                <strong>25GBASE-T / 40GBASE-T (IEEE 802.3bq, 2016).</strong> 25 / 40 Gbps over 4
                pairs of Cat8 / Class I or II — 30 m CHANNEL only, 2 connector terminations. This is
                data-centre TOR copper, not building-horizontal. For 25 GbE in a building-wide
                context, fibre is the answer.
              </li>
            </ul>
            <p>
              For higher speeds — 50 / 100 / 200 / 400 GbE — the medium of choice in commercial
              buildings is fibre. Multi-mode (OM4 / OM5) covers most building-internal distances;
              single-mode (OS2) covers everything beyond. The engineering discipline is the same —
              IEEE 802.3 has variants engineered to specific reach budgets on specific media — but
              the medium is no longer twisted pair.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Ethernet evolution — speed, signalling, cabling Class, channel reach"
            source="IEEE 802.3 family · BS EN 50173-1 / ISO/IEC 11801-1"
            headers={['Variant', 'Speed', 'Year', 'Cable Class / Cat', 'Channel reach']}
            rows={[
              ['10BASE-T (802.3i)', '10 Mbps', '1990', 'Class C / Cat3', '100 m'],
              ['100BASE-TX (802.3u)', '100 Mbps', '1995', 'Class D / Cat5', '100 m'],
              ['1000BASE-T (802.3ab)', '1 Gbps', '1999', 'Class D / Cat5e', '100 m'],
              [
                '10GBASE-T (802.3an)',
                '10 Gbps',
                '2006',
                'Class EA / Cat6A (Class E / Cat6 → 55 m)',
                '100 m',
              ],
              ['2.5GBASE-T (802.3bz)', '2.5 Gbps', '2016', 'Class D / Cat5e', '100 m'],
              ['5GBASE-T (802.3bz)', '5 Gbps', '2016', 'Class E / Cat6', '100 m'],
              [
                '25GBASE-T (802.3bq)',
                '25 Gbps',
                '2016',
                'Class I / Cat8.1',
                '30 m channel, 2 connectors',
              ],
              [
                '40GBASE-T (802.3bq)',
                '40 Gbps',
                '2016',
                'Class I or II / Cat8',
                '30 m channel, 2 connectors',
              ],
              ['100GBASE-SR4', '100 Gbps', '2015', 'OM4 multi-mode parallel optics', '100 m'],
              [
                '100GBASE-DR / FR / LR',
                '100 Gbps',
                '2018',
                'OS2 single-mode',
                '500 m / 2 km / 10 km',
              ],
            ]}
            notes="Every twisted-pair Ethernet variant from 100BASE-TX onward preserves the 100 m channel. Cat8 / Class I / II is a deliberate exception (30 m channel, data-centre TOR). Beyond 25 GbE in a building-horizontal context, the medium is fibre — OM4 / OM5 multi-mode for shorter runs, OS2 single-mode for longer."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.521.101 (Cable category — verbatim)"
            clause={
              <>
                Information and communication technology (ICT) cables used for the distribution of
                DC power shall comply with Category 5, Category 6, Category 6A, Category 7, Category
                7A, Category 8.1 or Category 8.2 or other cables as defined in BS EN 50173-1 by
                reference to the specifications given in BS EN 50288 series.
              </>
            }
            meaning="From 15 April 2026, BS 7671 explicitly enumerates the cable categories permitted to carry ELV DC power. Cat5 is included (it can be); Cat6A is the sensible 2026 floor for any new install. The list reflects the IEEE 802.3 evolution path — every variant of Ethernet that delivers more than gigabit at 100 m runs on Cat6A or above, and §716 recognises that the same cable will routinely carry PoE."
            cite={
              <>
                Verified verbatim from <code>bs7671_regulations.full_text</code> · A4:2026 edition.{' '}
                <AmendmentBadge regs={['716.521.101']} edition="A4:2026" />
              </>
            }
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class headroom — the operative future-proofing lever</ContentEyebrow>

          <ConceptBlock
            title="Specify a certified margin between cabling performance and worst-case service requirement"
            plainEnglish={`The lever you pull to deliver future-proofing is CLASS HEADROOM. A Cat6A install honestly certified to Class EA delivers exactly 10G at 100 m. A Cat6A install certified to Class EA WITH MARGIN (passing Class FA on the same channel) gives you headroom — meaning the channel still passes Class EA comfortably even as services tighten (more PoE current, tighter bundle, ageing connectors, accumulated minor mechanical stresses). Specifying for headroom is a deliberate choice with a known cost (modest cable / connector premium) and a known benefit (defensible service-independence over the cabling life).`}
            onSite={`On a tender, specify the Class with margin: "Class EA, with all channels also passing Class FA on the same test." Or "Cat6A with measured insertion-loss margin of at least 3 dB across the 1-500 MHz band against Class EA limits at the 95th percentile of links." Whatever you specify, certify it AT HANDOVER and document the result. The certificate is the ARTEFACT that proves the headroom exists; it is not an opinion or a vendor claim.`}
          >
            <p>The three decisions inside the Class-headroom choice:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Choice of Class against foreseeable services.</strong> 2026 default for
                commercial offices: Class EA / Cat6A — absorbs 10GBASE-T at 100 m, NBASE-T, Type 4
                PoE, IP-everything. For dense / specialist spaces (broadcast, finance, healthcare
                imaging, lab): Class FA / Cat6A-with-headroom or fibre to the work area. For
                data-centre TOR only: Class I / II / Cat8.
              </li>
              <li>
                <strong>Choice of cable construction within the Class.</strong> Cat6A comes in UTP,
                F/UTP and S/FTP variants. For PoE-heavy installs (sustained Type 4), screened
                variants control alien crosstalk and offer better thermal performance in tight
                bundles. For general office at moderate PoE, UTP variants are acceptable. The choice
                affects the certificate — a screened cable correctly bonded under §444.5.3.1 will
                out-perform an unscreened equivalent, especially in high-PoE bundles.
              </li>
              <li>
                <strong>Choice of certification regime.</strong> TIA-1152-A levels (Level III, IIIe,
                IV, V) define field-tester accuracy. Specify the highest level the project can
                justify; Level V is the current top accuracy and is appropriate for
                premium-Class-headroom installs. BS EN 50346 is the corresponding EN standard.
                Whichever you pick, the certificate is the deliverable, and it is the
                future-proofing artefact.
              </li>
            </ul>
            <p>
              Class headroom is defensible at handover because it is measured, not promised. A
              future contractor reading the certificates can see exactly how much margin was
              installed and can predict — quantitatively — how much further the cabling can be
              pushed before re-pull becomes necessary. That is what future-proofing actually looks
              like in spec terms.
            </p>
          </ConceptBlock>

          {/* Speed-vs-class diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Ethernet speed vs cable Class — the 100 m channel preserved across variants
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="A speed staircase. Five rows stack vertically, each row representing one Ethernet variant. From bottom to top: 10BASE-T on Class C, 100BASE-TX on Class D, 1000BASE-T on Class D, 10GBASE-T on Class EA, 25GBASE-T on Class I. Each row consists of a dedicated label row above, a horizontal reach bar in the middle, and a dedicated caption row below. The 10BASE-T, 100BASE-TX, 1000BASE-T and 10GBASE-T bars all reach the full 100 metre line; the 25GBASE-T bar reaches only 30 metres (the data-centre top-of-rack channel). All bar-end reach values are rendered in the row's label row, never on top of a bar. A bordered footer panel at the bottom states the BS 7671 A4:2026 future-proofing note."
            >
              {/* ===== Reach axis (top, y 24-78) ===== */}
              <text
                x="80"
                y="40"
                fill="#9CA3AF"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                CHANNEL REACH (m)
              </text>
              <text
                x="820"
                y="40"
                fill="#9CA3AF"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
                textAnchor="end"
              >
                100 m max
              </text>
              <line
                x1="80"
                y1="54"
                x2="820"
                y2="54"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              {[0, 30, 50, 75, 100].map((m) => {
                const x = 80 + (m * 740) / 100;
                return (
                  <g key={'rt-' + m}>
                    <line
                      x1={x}
                      y1="48"
                      x2={x}
                      y2="60"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y="74"
                      fill="#CBD5E1"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="600"
                      fontFamily="system-ui"
                    >
                      {m}
                    </text>
                  </g>
                );
              })}

              {/* ===== Variant rows — each row 100 px tall: label (24) + bar (36) + caption (40) ===== */}
              {/* Row layout: top y at 100, 200, 300, 400, 500 — bar y0 = top + 28, bar height 36 */}
              {[
                {
                  top: 100,
                  name: '25GBASE-T',
                  spec: 'IEEE 802.3bq · Class I / Cat 8.1',
                  barLen: 30,
                  color: '#F472B6',
                  fill: 'rgba(244,114,182,0.20)',
                  caption: 'Data-centre top-of-rack only · 30 m channel · 2 connectors max',
                },
                {
                  top: 200,
                  name: '10GBASE-T',
                  spec: 'IEEE 802.3an · Class EA / Cat 6A',
                  barLen: 100,
                  color: '#EAB308',
                  fill: 'rgba(234,179,8,0.22)',
                  caption: '2026 default · 10 Gbps to 100 m on Cat 6A · Cat 6 reaches only ≈ 55 m',
                },
                {
                  top: 300,
                  name: '1000BASE-T',
                  spec: 'IEEE 802.3ab · Class D / Cat 5e',
                  barLen: 100,
                  color: '#22D3EE',
                  fill: 'rgba(34,211,238,0.20)',
                  caption:
                    'Long-running default since 1999 · uses all four pairs · PAM-5 line code',
                },
                {
                  top: 400,
                  name: '100BASE-TX',
                  spec: 'IEEE 802.3u · Class D / Cat 5',
                  barLen: 100,
                  color: '#A78BFA',
                  fill: 'rgba(167,139,250,0.20)',
                  caption:
                    'Fast Ethernet 1995 · fixed the 100 m channel rule that every variant since has preserved',
                },
                {
                  top: 500,
                  name: '10BASE-T',
                  spec: 'IEEE 802.3i · Class C / Cat 3',
                  barLen: 100,
                  color: '#94A3B8',
                  fill: 'rgba(148,163,184,0.20)',
                  caption:
                    'Started the structured-cabling era 1990 · superseded but channel-budget-compatible',
                },
              ].map((row, i) => {
                const w = (row.barLen * 740) / 100;
                const barY = row.top + 28;
                return (
                  <g key={'row-' + i}>
                    {/* Label row ABOVE the bar (y top to top+24) — variant name + reach value, NO overlap with bar */}
                    <text
                      x="80"
                      y={row.top + 14}
                      fill={row.color}
                      fontSize="11.5"
                      fontWeight="700"
                      fontFamily="system-ui"
                    >
                      {row.name}
                    </text>
                    <text
                      x="200"
                      y={row.top + 14}
                      fill="#E5E7EB"
                      fontSize="10.5"
                      fontFamily="system-ui"
                    >
                      · {row.spec}
                    </text>
                    <text
                      x="820"
                      y={row.top + 14}
                      fill={row.color}
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="system-ui"
                      textAnchor="end"
                    >
                      reach {row.barLen} m
                    </text>

                    {/* Bar (y barY to barY+36) */}
                    <rect
                      x="80"
                      y={barY}
                      width={w}
                      height="36"
                      rx="7"
                      fill={row.fill}
                      stroke={row.color}
                      strokeWidth="1.6"
                    />
                    {/* Tick at end of bar — drops down only into caption row, no text on bar */}
                    <line
                      x1={80 + w}
                      y1={barY + 36}
                      x2={80 + w}
                      y2={barY + 44}
                      stroke={row.color}
                      strokeWidth="1.4"
                    />

                    {/* Caption row BELOW the bar (y barY+48 to barY+72) — clear of bar */}
                    <text x="80" y={barY + 60} fill="#CBD5E1" fontSize="10" fontFamily="system-ui">
                      {row.caption}
                    </text>
                  </g>
                );
              })}

              {/* ===== Footer panel (y 620-700) ===== */}
              <rect
                x="60"
                y="620"
                width="800"
                height="80"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="80"
                y="644"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                FUTURE-PROOFING — BS 7671:2018+A4:2026 §716
              </text>
              <text x="80" y="664" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                §716.521.101 permits Cat 5 / 6 / 6A / 7 / 7A / 8.1 / 8.2 for ELV DC (PoE)
                distribution.
              </text>
              <text x="80" y="682" fill="#CBD5E1" fontSize="10.5" fontFamily="system-ui">
                Sensible 2026 floor: Cat 6A · Class EA · supports 10GBASE-T to 100 m and absorbs 4-5
                active refresh cycles.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cat8 vs fibre — picking the right medium for high speed</ContentEyebrow>

          <ConceptBlock
            title="Cat8 is data-centre TOR; fibre is building-wide high speed; Cat6A is the general-outlet default"
            plainEnglish={`There is a recurring temptation to "future-proof" by spending up on Cat8 building-wide. It is the wrong move. Cat8 (Class I / II) is engineered for 25 / 40 GbE at a 30 m channel with only 2 connector terminations — it is a data-centre top-of-rack copper, not a building-horizontal cable. For 25 GbE / 40 GbE / 100 GbE in a building-wide context, the answer is OPTICAL FIBRE: OM4 / OM5 multi-mode for shorter runs, OS2 single-mode for longer. The 2026 future-proof default is hybrid: Cat6A copper to most outlets PLUS fibre to high-density / high-speed areas. That hybrid absorbs every Ethernet service from voice over IP up to 100 GbE per fibre without re-pulling.`}
            onSite={`When a vendor or specifier proposes "Cat8 everywhere", three checks: (1) Is this a data centre? If yes, Cat8 is appropriate at TOR. (2) Are channel reaches under 30 m? If no, Cat8 cannot deliver. (3) Is 25 GbE actually needed at every outlet? Almost certainly not — the general-outlet need rarely exceeds 10 GbE in the cabling life. The defensible 2026 spec is Cat6A general copper + targeted fibre to AP clusters / server-rack uplinks / high-density zones. That hybrid is significantly cheaper than Cat8-everywhere AND delivers more headroom where it actually matters.`}
          >
            <p>The three media of the 2026 future-proof hybrid:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Cat6A balanced copper to general outlets.</strong> Class EA at 100 m
                channel. Delivers 10GBASE-T, NBASE-T (2.5 / 5G), 1000BASE-T, 100BASE-TX, all
                IP-based services, and Type 4 PoE within the 750 mA per-conductor cap. Standard RJ45
                connectors. Industry-standard patch panels. The default building-wide horizontal
                medium.
              </li>
              <li>
                <strong>Multi-mode fibre (OM4 / OM5) to high-density areas.</strong> Aqua jacket
                (OM4) or lime-green jacket (OM5). Used as risers (BD-FD), data-centre uplinks,
                AP-cluster feeds, broadcast / lab feeds. Reach: OM4 typically delivers 100GBASE-SR4
                to 100 m, OM5 stretches further with SWDM4. LC duplex connectors are the modern
                default; MPO/MTP for 40 / 100 GbE parallel optics.
              </li>
              <li>
                <strong>Single-mode fibre (OS2) to longer / higher-speed reaches.</strong> Yellow
                jacket. Used as inter-building campus backbone (CD-BD), longer riser runs in tall
                buildings, and any service that needs to be vendor-agnostic on transceiver
                generation. Reach: typically 10 km with appropriate optics; far longer with
                amplification. The conservative future-proof choice for any backbone.
              </li>
            </ul>
            <p>
              Cat8 has a place — short data-centre TOR copper from a top-of-rack switch to servers
              in the same or adjacent rack. Use it there. Do not specify it building-wide. The
              hybrid Cat6A + fibre approach is the defensible 2026 future-proof default.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>PoE growth — the §716 future-proofing brief</ContentEyebrow>

          <ConceptBlock
            title="Cabling thermal headroom is the real PoE future-proofing lever — bounded by the 750 mA hard cap"
            plainEnglish={`PoE growth from 15 April 2026 follows the IEEE 802.3bt path (Type 1 → 2 → 3 → 4, capped at 90 W PSE / 71.3 W PD) AND is bounded by BS 7671 §716.523.2.101's 750 mA per-conductor hard regulatory cap. The future-proofing question for PoE is therefore not "what wattage might come?" — there is no 100 W class; the standards have stopped at Type 4 — but "can the cabling thermally absorb sustained Type 4 PoE in growing bundle sizes?". The lever is cable category (Cat6A or better, screened where bundles are tight), bundle management (TIA TSB-184-A / BS EN 50174-2), basket fill (< 50 % at first fit), and physical separation between bundles.`}
            onSite={`On a future-proof PoE design, the practical disciplines are: (1) Cat6A minimum, screened (S/FTP) preferred for high-PoE-density buildings. (2) Bundles ≤ 24 cables at sustained Type 4; if more, separate physically. (3) Basket fill ≤ 50 % at first fit, ≤ 70 % even after growth. (4) Bonding under §444.5.3.1 — basket / screens / sheaths into the equipotential bonding network. (5) Connecting hardware rated 750 mA per contact under §716.526.101. (6) Design-current calculation in the as-built — record the worst-case PoE load assumption per bundle so future contractors inherit it. (7) The 750 mA hard cap applies regardless — design current per conductor is the gate.`}
          >
            <p>The practical PoE-future-proofing checklist:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Cable category (§716.521.101).</strong> Cat 5 / 6 / 6A / 7 / 7A / 8.1 / 8.2
                are permitted; Cat6A is the sensible 2026 floor. For high-PoE-density installs (100+
                APs, large CCTV / access-control deployments), screened (S/FTP) Cat6A controls alien
                crosstalk under PoE thermal stress.
              </li>
              <li>
                <strong>Conductor design current (§716.523.2.101).</strong> Hard cap 750 mA per
                conductor. Type 4 PoE worst case is around 600 mA per pair (4-pair PoE) — well under
                the cap, but cumulative bundle effects matter.
              </li>
              <li>
                <strong>Connecting hardware (§716.526.101).</strong> 750 mA per contact, per BS
                ISO/IEC 11801-1. Specify patch panels and outlets to that rating.
              </li>
              <li>
                <strong>Bundle thermal management (§716.523.1.101 NOTE 2).</strong> NOTE 2 cites PD
                CLC/TR 50174-99-1 and BS ISO/IEC 14763-2 / ISO/IEC TS 29125 for bundle-management
                guidance. ANSI/TIA TSB-184-A is the matching TIA reference. Core practical rule:
                limit bundle size, separate bundles physically, use 23 AWG cable (LP-rated where
                appropriate).
              </li>
              <li>
                <strong>Bonding (§444.5.3.1).</strong> Cable basket, screens, sheaths bonded into
                the equipotential bonding network. Mesh size ≤ 2 m × 2 m for areas with susceptible
                ICT equipment (§444.1.3).
              </li>
              <li>
                <strong>Functional earthing (§545.1.2).</strong> Functional earthing conductors
                minimum 2.5 mm² Cu (with mechanical protection) or 4 mm² Cu (without). MFET per
                §545.2 if multiple functional bonding conductors exist.
              </li>
              <li>
                <strong>SELV / PELV (§716.410.3.3).</strong> The protective measure SELV or PELV
                shall be applied. Source per §716.414.1.1 — PSE conforming to BS EN IEC 62368-1 + BS
                EN 60950-22 + ISO/IEC/IEEE 8802-3 interoperability requirements.
              </li>
            </ul>
            <p>
              Future-proofing for PoE is not speculative — there is no "100 W PoE" or "500 W PoE"
              coming; the standards are stable at Type 4. The future-proofing brief is to absorb
              GROWTH IN BUNDLE COUNT — more APs, more cameras, more lighting drivers, more access
              readers, more IoT — at sustained Type 4 currents. The cabling-thermal envelope is the
              operative variable. Cat6A + screened + good bundle discipline + under 50 % basket fill
              = a future-proof PoE infrastructure.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.523.2.101 (Conductor design current — verbatim)"
            clause={
              <>The load current (design current) in any conductor shall not exceed 750 mA.</>
            }
            meaning="The 750 mA per-conductor cap is the ceiling on PoE growth in the cabling. It is independent of PSE class number; it applies to the cabling as a power-distribution circuit; and it is unchangeable by the active-equipment vendor. Future-proof PoE cabling has design current per conductor comfortably under 750 mA — including the worst-case bundle and ageing assumptions."
            cite={
              <>
                Verified verbatim from <code>bs7671_regulations.full_text</code> · A4:2026 edition.{' '}
                <AmendmentBadge regs={['716.523.2.101']} edition="A4:2026" />
              </>
            }
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title='Specifying "Cat8 everywhere" or "100 W PoE" because they sound future-proof'
            whatHappens={
              <>
                A specifier writes "Cat8 horizontal cabling building-wide for future-proofing
                against 25 / 40 GbE" and "100 W PoE-ready" into a 2026 tender. Both are wrong: Cat8
                is a 30 m data-centre TOR cable (it cannot reach 100 m), and there is no 100 W PoE
                class (Type 4 is 90 W PSE / 71.3 W PD, with the BS 7671 §716.523.2.101 hard cap at
                750 mA per conductor). The contractor either bids the wrong product, bids it at
                unjustified premium, or wastes design effort proving the spec is impossible — and
                the building ends up with a non-future-proof install anyway.
              </>
            }
            doInstead={
              <>
                Specify Cat6A / Class EA general copper + fibre (OM4 / OM5 / OS2) to high-density
                areas as the 2026 hybrid future-proof default. Specify PoE compliance to IEEE
                802.3bt Type 4 (90 W PSE / 71.3 W PD) and to BS 7671:2018+A4:2026 §716 — design
                current ≤ 750 mA per conductor (§716.523.2.101), connecting hardware ≥ 750 mA per
                contact (§716.526.101), Cat 5/6/6A/7/7A/8.1/8.2 permitted (§716.521.101). Reference
                BS EN 50174-2 / TIA TSB-184-A for bundle thermal management. Quote the clauses
                verbatim where it helps the tender — A4:2026 publishing on 15 April 2026 makes the
                references unambiguous.
              </>
            }
          />

          <Scenario
            title="A 12-storey 2026 office wants 'future-proof to 2046' — what do you actually specify?"
            situation={
              <>
                The brief: a 12-storey new-build commercial office, target occupation 2027, target
                full design-life to 2046. Mixed tenants, high-density Wi-Fi expected throughout,
                sustained PoE for lighting and access control, future tenant requirements unknown.
                The client wants a single cabling spec that absorbs the whole building life.
              </>
            }
            whatToDo={
              <>
                Specify a HYBRID future-proof default. (1) Horizontal: Cat6A S/FTP (screened) to
                every general work-area outlet and ceiling AP location, certified Class EA with
                margin (record the test results), bonded under §444.5.3.1, design-current analysis
                showing worst-case &lt; 750 mA per conductor at projected Type 4 PoE bundle counts.
                (2) Outlet density: at least two outlets per workpoint plus ceiling-mounted outlets
                at AP positions on a 50 m² grid. (3) Pathway: basket fill ≤ 50 % at first fit, with
                secondary basket runs in each riser shaft for growth; ducts to AP locations sized
                for 2× current cable count. (4) Backbone: two diversely-routed 12-core OM4 risers
                per floor (FD-BD), two 12-core OS2 risers per floor for long-life flexibility,
                single-mode counts to allow dense WDM if needed. (5) Inter-building (if applicable):
                OS2 to the CD with appropriate redundancy. (6) Documentation: BS EN 50174-1 /
                TIA-606-D administration record, certificates per channel, design-current per bundle
                recorded in the as-built so future contractors inherit the assumption explicitly.
              </>
            }
            whyItMatters={
              <>
                "Future-proof to 2046" is a 20-year promise. The cabling will absorb 2-3
                Wi-Fi-generation refreshes (Wi-Fi 6 → 6E → 7 → ?), 3-4 active-switch refreshes,
                multiple PoE-density step-changes (more APs, more lighting, more sensors), and
                whatever Layer-2 / Layer-3 architecture changes happen in the 2030s and early 2040s.
                The hybrid Cat6A + fibre default with generous outlet density, generous pathway
                capacity, and documented Class headroom is what delivers that promise. Specifying
                "Cat8 everywhere" instead would deliver less headroom AND less reach AND higher cost
                — a net loss on every dimension.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Every twisted-pair Ethernet variant from 100BASE-TX (1995) onward preserves the 100 m channel rule. Only the cable Class moves up — that is the lever the cabling industry pulls.',
              'Cat6A / Class EA is the 2026 commercial default — absorbs 10GBASE-T at 100 m, NBASE-T (2.5G/5G), Type 4 PoE within the 750 mA per-conductor cap, and IP-everything services for 15-20 years.',
              'Cat8 (Class I / II) is data-centre top-of-rack copper at 30 m channel only — NOT a building-wide horizontal cable. For high-speed building-wide, the medium is fibre (OM4 / OM5 / OS2).',
              'Future-proofing is a SPECIFICATION discipline: pick a Class with headroom, provision pathway capacity for ~50 % growth, specify generous outlet density at first fit. Outlet retro-fit costs 5-10× more than first-fit.',
              'BS 7671:2018+A4:2026 §716 caps PoE in the cabling: §716.521.101 (Cat 5+ permitted), §716.523.2.101 (750 mA per-conductor hard cap), §716.526.101 (750 mA per contact at connecting hardware). Future-proof PoE = Cat6A or better + good bundle discipline + bonding under §444.5.3.1.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Passive vs active hardware
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next module: Copper cabling standards
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule1Section4;
