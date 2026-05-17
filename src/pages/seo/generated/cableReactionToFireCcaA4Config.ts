import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition, published 15 April 2026),
// BS EN 50575 (Cables — Reaction to Fire), the Construction Products Regulation
// (EU) 305/2011 (retained UK law), and Regulatory Reform (Fire Safety) Order 2005.

const published = '2026-05-17';
const modified = '2026-05-17';

export const cableReactionToFireCcaA4Config: GeneratedGuideConfig = {
  pagePath: '/guides/cable-reaction-to-fire-cca-a4-2026',
  title:
    'Cable Reaction-to-Fire Classification (Cca) — BS 7671:2018+A4:2026 & CPR Guide | Elec-Mate',
  description:
    'Complete UK guide to Euroclass cable reaction-to-fire classification (Aca, B1ca, B2ca, Cca, Dca, Eca, Fca) under BS EN 50575, the Construction Products Regulation, and BS 7671:2018+A4:2026. Where each class is required, smoke/droplet/acidity subclasses, LSZH vs Cca, high-rise duties under the Building Safety Act 2022, and EICR coding for non-CPR cable.',
  datePublished: published,
  dateModified: modified,
  readingTime: 19,
  badge: 'Cable Selection & CPR',
  badgeIcon: 'Cable',
  breadcrumbLabel: 'Cable Reaction-to-Fire (Cca)',
  heroPrefix: 'Cable Reaction-to-Fire',
  heroHighlight: 'Classification (Cca)',
  heroSuffix: '— BS 7671:2018+A4:2026 & the CPR',
  heroSubtitle:
    'Under the Construction Products Regulation, every fixed-installation power, control and communication cable supplied for permanent installation in a UK building must carry a Euroclass reaction-to-fire classification — Aca, B1ca, B2ca, Cca, Dca, Eca or Fca — together with its Declaration of Performance. BS 7671:2018+A4:2026 picks up that obligation in Chapter 42 and Chapter 52 and tells the designer which class is acceptable where. This guide walks through the Euroclass system, the s/d/a subclasses, selection rules for escape routes, basements and high-rise residential blocks, and how the rules interact with the Building Safety Act 2022, BS 7211 LSF, BS EN 50525 and the post-Brexit CE / UKCA landscape.',
  keyTakeaways: [
    'Cables for fixed installations in UK construction works fall under BS EN 50575 and must be classified A1ca, A2ca, B1ca, B2ca, Cca, Dca, Eca or Fca for reaction to fire, plus subclasses for smoke (s1/s2/s3), flaming droplets (d0/d1/d2) and acidity (a1/a2/a3).',
    'Cca-s1b,d1,a1 is the high-performance specification used in escape routes of high-rise residential buildings and other safety-critical locations — low heat release, limited smoke, no flaming droplets, low acidity.',
    'BS 7671:2018+A4:2026 Regulation 422.2 retains the requirement that cables on escape routes are non-flame-propagating, supports installation in safety services, and reinforces the duty in Chapter 52 to select cables suited to the reaction-to-fire risks of the location.',
    'In England, high-rise residential buildings over 11 m are subject to the Building Safety Act 2022 and Approved Document B — cabling in protected escape routes must demonstrably meet at least Cca-s1b,d1,a1 (or higher) as part of the fire strategy.',
    'LSZH (Low Smoke Zero Halogen) is a chemistry description, not a CPR classification. A cable can be LSZH but still only achieve Eca under BS EN 50575. Always read the Declaration of Performance, not the marketing label.',
    'BS 7211 LSF cable and BS EN 50525 Eca cable are not equivalent to Cca — they sit at the lower end of the Euroclass spectrum and are not acceptable on protected escape routes in higher-risk buildings.',
    'Every fixed-installation cable placed on the UK market must be CE or UKCA marked and accompanied by a Declaration of Performance (DoP) under the Construction Products Regulation, retained as UK law after Brexit.',
    'Existing installations with pre-CPR or sub-Cca cable are not automatically C2 on an EICR — the EICR codes should reflect the actual fire risk in the actual location, not the date the cable was manufactured.',
  ],
  sections: [
    {
      id: 'why-this-matters',
      heading: 'Why Reaction-to-Fire Classification Matters',
      tocLabel: 'Why it matters',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Cables are one of the most common combustible loads in any modern building. In a fire, the sheath and insulation contribute to flame spread, generate smoke and hot gases, release flaming droplets that ignite secondary fires, and produce acid gases that attack life-safety electronics and the people trying to escape. The Grenfell Tower Inquiry and a series of European apartment-block fires have repeatedly forced the question: how flammable is the cable, and how much smoke does it make?',
        },
        {
          type: 'paragraph',
          text:
            'For decades the UK answer was "non-flame-propagating to BS 4066-3" or the broadly equivalent IEC 60332. From 2017 that was replaced by a harmonised classification under the Construction Products Regulation, set out in BS EN 50575. Every power, control or communication cable for permanent installation now carries a single Euroclass letter from Aca down to Fca, plus subclass codes for smoke, droplets and acidity. BS 7671:2018+A4:2026 references this classification through Chapter 42 (Protection Against Thermal Effects) and Chapter 52 (Selection and Erection of Wiring Systems).',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'CPR applies to fixed installation cables, not flex',
          text:
            'BS EN 50575 covers cables intended for permanent installation in construction works — power, control and communication cabling forming part of the building. Flexible cords (BS EN 50525 H05V / H07V flex, appliance leads, extension leads) sit outside CPR. If the cable will be screwed, clipped, conduited or buried into the fabric, it is in scope.',
        },
      ],
    },
    {
      id: 'legal-framework',
      heading: 'The Legal and Standards Framework',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Cable reaction-to-fire is not just a BS 7671 question — it sits inside a stack of overlapping legislation, retained EU law and product standards. Understanding which layer says what is the difference between a defensible specification and a costly retrofit.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Construction Products Regulation (EU) 305/2011 — retained as UK law after Brexit. Places obligations on manufacturers placing cable on the UK market: classify, declare the performance, mark the product, retain the technical file.',
            'BS EN 50575 — the harmonised product standard for power, control and communication cables in construction works subject to reaction-to-fire requirements. Defines the test, the classification and the Declaration of Performance content.',
            'BS 7671:2018+A4:2026 — the UK Wiring Regulations. Chapter 42 and Chapter 52 require the designer to select cable suitable for the fire risk of the location, with particular attention to escape routes and safety services.',
            'Regulatory Reform (Fire Safety) Order 2005 — the Responsible Person duty for non-domestic premises and the common parts of HRBs. Cable choice supports the wider fire strategy and risk assessment.',
            'Building Safety Act 2022 + Fire Safety (England) Regulations 2022 — for higher-risk buildings (18 m+ or 7 storeys+) the Building Safety Regulator regime applies. For 11 m+ residential blocks, evacuation and information duties intensify, and protected escape routes must demonstrably resist fire propagation.',
            'Approved Document B (Vol 1 dwellings, Vol 2 other) — practical guidance on meeting Building Regulations fire safety requirements, referencing reaction-to-fire classifications for materials in escape routes.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'BS 7671 does not name a single mandatory Euroclass',
          text:
            'BS 7671 does not say "every cable must be Cca". It requires cables to be selected so that they do not unduly propagate fire and so that they are suitable for the fire risks of the location — Regulations 422 and 527. The Euroclass system, together with Approved Document B and the building\'s fire strategy, is how the designer demonstrates that this duty has been met. See our [BS 7671:2018+A4:2026 summary](/guides/bs-7671-a4-2026-summary) for the full chapter map.',
        },
      ],
    },
    {
      id: 'euroclass-system',
      heading: 'The Euroclass Reaction-to-Fire System Explained',
      tocLabel: 'Euroclass classes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The Euroclass system rates cable reaction to fire on a sliding scale from Aca (non-combustible) at the top down to Fca (no performance determined) at the bottom. Classification is determined by laboratory testing under BS EN 50399 (the Single Burning Item or SBI test, derived from EN 13823) for the higher classes and EN ISO 1716 or EN 60332-1-2 for the others. Each class reflects measured fire performance — heat release, flame spread, total heat output and burning duration.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Aca — non-combustible (gross calorific value test EN ISO 1716). Almost never seen in cable form because the sheath material has to be effectively non-combustible. Reserved for the most safety-critical applications.',
            'B1ca — extremely limited contribution to fire, very low heat release, no flame spread beyond the burner area. Used in tunnels, underground systems and very high-risk premises.',
            'B2ca — very limited contribution to fire. Stricter than Cca on heat release and flame spread. Used in escape routes of high-occupancy public buildings and increasingly specified for high-rise residential common parts.',
            'Cca — limited contribution to fire. The widely specified "fire-safe" class for protected escape routes, basements, high-rise residential common parts and assembly buildings.',
            'Dca — acceptable contribution to fire. Suitable for ordinary commercial and domestic applications outside escape routes. Most general-purpose CPR-compliant power cable sold in the UK is at least Dca.',
            'Eca — limited flame propagation (the BS EN 60332-1-2 single vertical wire test passed). The basic CPR floor — broadly equivalent to the legacy "non-flame-propagating" UK requirement.',
            'Fca — no performance determined or below Eca. Effectively means "no fire performance claim made" — would not normally be acceptable for fixed installations in occupied buildings.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'How the SBI test (BS EN 50399 / EN 13823) works',
          text:
            'A sample bundle of cable is mounted vertically against a corner wall. A propane burner delivers a defined heat flux at the base. Instruments measure heat release rate, total heat release, flame spread, smoke production and the presence of flaming droplets over 20 minutes. The data reduces to peak HRR, THR1200s, FIGRA, TSP1200s and SMOGRA — and these values dictate whether the cable scores Aca, B1ca, B2ca, Cca or Dca.',
        },
      ],
    },
    {
      id: 'subclasses',
      heading: 'Smoke (s), Droplets (d) and Acidity (a) Subclasses',
      tocLabel: 'Subclasses (s, d, a)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A primary Euroclass on its own is incomplete. For B1ca, B2ca, Cca and Dca, the classification must be followed by additional codes describing smoke production, flaming droplets and the acidity of combustion gases. The full classification reads like "Cca-s1b,d1,a1" — the most commonly specified high-performance code in UK escape routes.',
        },
        {
          type: 'list',
          items: [
            'Smoke production (s): s1 = limited total smoke and rate, s1a = additionally limited transmittance ≥80%, s1b = transmittance 60–80%, s2 = limited, s3 = no performance declared.',
            'Flaming droplets (d): d0 = no flaming droplets within 1200s, d1 = no flaming droplets persisting more than 10 seconds within 1200s, d2 = no performance declared.',
            'Acidity of combustion gases (a): a1 = conductivity ≤2.5 µS/mm and pH ≥4.3, a2 = conductivity ≤10 µS/mm and pH ≥4.3, a3 = no performance declared.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'In escape routes, the difference between Cca-s3,d2,a3 (the bare primary class with no subclass declarations) and Cca-s1b,d1,a1 (limited smoke, no persistent droplets, low acidity) is enormous. The first may satisfy a manufacturer\'s minimum legal obligation but be unsuitable for occupied escape routes. The second is the industry-recognised high-performance UK specification.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'The headline UK spec for protected escape routes',
          text:
            'Cca-s1b,d1,a1 is the de-facto specification for fixed-wiring cable on protected escape routes in high-rise residential blocks, hospitals, schools, hotels and assembly buildings. It limits heat release, restricts smoke transmittance, prohibits persistent flaming droplets, and keeps acid gas conductivity low.',
        },
      ],
    },
    {
      id: 'where-each-class',
      heading: 'Where Each Class Is Required',
      tocLabel: 'Where each class applies',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Class selection is led by the building\'s fire strategy, Approved Document B and BS 7671 Chapter 42, not by a flat "always use Cca" rule. The typical mapping below is what most UK fire engineers and designers use as a starting point — always confirm with the project fire strategy.',
        },
        {
          type: 'list',
          items: [
            'Domestic dwelling (single-family house, two storeys) — Dca for general lighting and power; Eca acceptable outside escape routes; Cca-s1b,d1,a1 may be specified in the protected escape route of a loft conversion or 3-storey domestic.',
            'Low-rise flats and HMOs (under 11 m) — Cca-s1b,d1,a1 in common escape routes, Dca within individual dwellings.',
            'High-rise residential (over 11 m, and certainly over 18 m) — Cca-s1b,d1,a1 minimum in escape routes, B2ca or B1ca often specified in firefighting lobbies, stairwells and risers. Building Safety Act 2022 duties apply.',
            'Schools, hospitals, hotels — Cca-s1b,d1,a1 minimum in escape routes and protected corridors; B2ca / B1ca for critical-care and theatre suites in hospitals.',
            'Assembly buildings (cinemas, theatres, places of worship, sports halls) — Cca-s1b,d1,a1 in escape routes; higher specified in dense front-of-house areas.',
            'Underground stations, tunnels, transport infrastructure — B1ca or higher in line with project-specific fire engineering.',
            'Commercial offices — Cca-s1b,d1,a1 in escape routes; Dca acceptable for general containment and floor-void wiring.',
            'Basements and risers — Cca-s1b,d1,a1 commonly specified given limited escape options and smoke-channelling geometry.',
            'Industrial and warehouse — generally Dca or Eca for general power; Cca where escape distance is increased by storage layout.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Building Safety Act 2022 — over 11 m residential',
          text:
            'For any residential building over 11 m in England, the Fire Safety (England) Regulations 2022 and the wider Building Safety Act regime impose enhanced duties on the Responsible Person and the Accountable Person. Cable choice in escape routes, lift lobbies, riser cupboards and dry/wet riser shafts is part of the fire strategy and must be supported by Declarations of Performance. For HRBs over 18 m, the Building Safety Regulator regime applies in full.',
        },
        {
          type: 'paragraph',
          text:
            'BS 7671 also imposes parallel requirements for safety services — fire alarm circuits per [BS 5839](/guides/bs5839-fire-alarm-standard) and emergency lighting per [BS 5266](/guides/bs5266-emergency-lighting-standard). Those circuits typically use enhanced fire-resistant cable (BS EN 50200 / BS 8434) in addition to the reaction-to-fire requirements set out here. Fire resistance (does the circuit keep working in a fire?) and reaction to fire (how does the cable contribute to fire?) are complementary duties, not interchangeable.',
        },
      ],
    },
    {
      id: 'a4-2026-updates',
      heading: 'BS 7671:2018+A4:2026 — What Changed for Cable Selection',
      tocLabel: 'A4:2026 changes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A4:2026, published 15 April 2026 and effective 27 September 2026, did not rewrite the reaction-to-fire framework — that remains in BS EN 50575 and the CPR. What A4:2026 did do was reinforce the cable selection duty within Chapters 42 and 52 and align the regulations with the post-Grenfell, post-Building Safety Act landscape.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Regulation 422.2 (Conditions of evacuation in an emergency) — the obligation to select cabling on escape routes that does not unduly propagate fire and limits smoke is retained and reinforced. A4:2026 cross-references the Euroclass system explicitly in the Notes.',
            'Regulation 527 (Selection and erection to minimise the spread of fire) — the requirement to use cables compliant with BS EN 50575 and to declare the Euroclass classification carries through. A4:2026 clarifies that the Declaration of Performance is part of the project documentation.',
            'Chapter 56 (Safety services) — circuits for fire detection and alarm, emergency lighting and other safety services must maintain operation for the required duration; this is fire resistance, not reaction to fire, but A4:2026 reminds the designer that the cable must satisfy both duties.',
            'Schedule of Inspections — A4:2026 introduces refreshed inspection columns; the inspector is expected to verify that cabling selected for escape routes is consistent with the project fire strategy and the declared Euroclass.',
            'Selection and erection in higher-risk residential — A4:2026 brings the regulations into alignment with the practical fire strategy expected for buildings over 11 m, with a clearer signal that Cca-s1b,d1,a1 is the floor for protected routes.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Where to read the regulations',
          text:
            'Read BS 7671:2018+A4:2026 Part 4 Chapter 42, Part 5 Chapter 52 and Chapter 56 in full. The Euroclass references are in the Notes to those chapters. For a section-by-section walk-through of every A4:2026 change, see our [BS 7671:2018+A4:2026 summary](/guides/bs-7671-a4-2026-summary).',
        },
      ],
    },
    {
      id: 'lszh-vs-cca',
      heading: 'LSZH vs Cca — the Most Common Confusion on Site',
      tocLabel: 'LSZH vs Cca',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Walk onto any commercial fit-out and someone will tell you "we\'re using LSZH so we\'re fine for Cca". They are not the same thing. LSZH (Low Smoke Zero Halogen) describes the cable\'s chemistry — sheath and insulation formulated to produce limited smoke and to contain no halogens (so combustion will not generate hydrogen chloride or other acid gases). It is a material property, not a tested performance.',
        },
        {
          type: 'paragraph',
          text:
            'Cca is a tested classification under BS EN 50575 — the cable as a finished construction has been subjected to the SBI test and achieved measured limits on heat release, flame spread and total heat output. A cable can be LSZH chemistry but only achieve Dca or Eca on the SBI test; conversely a cable can achieve Cca without being LSZH if its overall burn behaviour meets the limits. The two are correlated but not identical.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Always read the Declaration of Performance',
          text:
            'Do not specify by marketing label ("LSZH", "fire-safe", "low smoke"). Specify by Euroclass classification ("Cca-s1b,d1,a1") and verify by reading the manufacturer\'s Declaration of Performance for the actual product code. The DoP is a legal document under the CPR — the marketing leaflet is not.',
        },
      ],
    },
    {
      id: 'bs7211-vs-bs50525',
      heading: 'BS 7211 LSF Cable vs BS EN 50525 Eca — the Legacy UK Cables',
      tocLabel: 'BS 7211 vs BS EN 50525',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For decades the UK domestic and small-commercial market relied on BS 6004 (general PVC twin-and-earth, now superseded by BS EN 50525) and BS 7211 (low-smoke fume thermosetting cable). These are still made, but under the CPR they now must additionally carry a Euroclass — and that classification typically sits at the lower end of the spectrum.',
        },
        {
          type: 'list',
          items: [
            'BS EN 50525 series (formerly BS 6004) — harmonised European standard for low-voltage cables up to 450/750V. Twin-and-earth and singles in PVC insulation. Typical CPR rating: Eca. Acceptable for general domestic and small commercial work outside escape routes.',
            'BS 7211 — low-smoke fume thermosetting insulated cable, designed for limited smoke and corrosive gas emission. Typical CPR rating: Dca or higher depending on construction. Common in commercial fit-outs and public-sector work.',
            'BS 6724 / BS 5467 SWA (steel wire armoured) — typically Dca, sometimes Cca depending on construction and sheath material. Always check the DoP.',
            'BS EN 50200 / BS 8434 fire-resistant — for fire alarm and emergency lighting circuits. Fire resistance and reaction-to-fire are separate properties; check both.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Eca is not Cca',
          text:
            'BS EN 50525 Eca cable passes only the single vertical wire flame-propagation test (BS EN 60332-1-2). It has not been SBI-tested for heat release or smoke. It is not interchangeable with Cca for protected escape routes in higher-risk buildings. If the fire strategy demands Cca-s1b,d1,a1, ordinary twin-and-earth will not satisfy it.',
        },
        {
          type: 'paragraph',
          text:
            'For specialised cable applications in life-safety circuits, see also our [MICC (Pyro) cable guide](/guides/micc-cable-guide) — mineral-insulated copper-clad cable remains the canonical fire-resistant solution for the most critical circuits, and modern MICC achieves the top end of the Euroclass spectrum.',
        },
      ],
    },
    {
      id: 'ce-ukca-dop',
      heading: 'CE Marking, UKCA Marking and the Declaration of Performance',
      tocLabel: 'CE / UKCA / DoP',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Every fixed-installation cable placed on the UK market must carry a conformity marking and be accompanied by a Declaration of Performance (DoP) — the manufacturer\'s legally binding declaration of the cable\'s Euroclass, the tests undergone, the notified body that supervised the testing, and the product\'s identification details.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'CE marking — historically recognised across the EU and in the UK. Post-Brexit, CE marking is still accepted in Great Britain on construction products under indefinitely extended transitional arrangements (re-confirmed by government as of 2026).',
            'UKCA marking — the UK\'s own conformity mark, accepted in Great Britain. In Northern Ireland the CE / UKNI arrangements apply under the Windsor Framework.',
            'Declaration of Performance (DoP) — a written declaration in a defined format including: product type, intended use, AVCP system, notified body, declared performance against each essential characteristic (reaction to fire being the key one for cable), and the manufacturer\'s signature.',
            'Product marking on the cable — the cable, the drum label and the documentation must show the manufacturer, product designation, standard, Euroclass classification, conformity mark and notified body number.',
            'Retention — the responsible person under CDM 2015 / Building Regulations should retain DoPs for installed cable as part of the building\'s health and safety file, especially in HRBs under the Building Safety Act 2022.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Practical advice on the wholesale counter',
          text:
            'Ask for the DoP at the point of ordering, not after delivery. Reputable wholesalers will supply DoPs digitally on request. Save the DoP with the project records — it is part of the evidence chain and may be needed at handover, by the Building Safety Regulator, or by an insurer after an incident.',
        },
      ],
    },
    {
      id: 'eicr-coding',
      heading: 'EICR Coding for Pre-CPR or Sub-Cca Cable',
      tocLabel: 'EICR coding',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A common question on EICR work in older buildings is how to code cable that pre-dates the CPR or sits below the class now expected for the location. The right answer is rarely "code everything C2" — apply the standard EICR coding framework to the actual risk in the actual location.',
        },
        {
          type: 'list',
          items: [
            'Existing pre-CPR cable in a domestic dwelling — generally no code if the cable is fit for purpose, properly terminated and adequately protected. The CPR is not retrospective.',
            'Existing PVC twin-and-earth in the protected escape route of a high-rise residential block — likely C3 (Improvement recommended) at minimum, possibly C2 (Potentially dangerous) depending on the fire strategy and any deviation from the current expected standard. Refer to the building\'s fire risk assessment and Responsible Person.',
            'Existing PVC cable in the riser of an HRB carrying common-parts circuits — typically C2 if it directly contradicts the fire strategy expected under the Building Safety Act 2022.',
            'Existing fire-resistant cable that has lost its sheath, been damaged by impact or installed without proper support — likely C2 regardless of the original specification, because the protection is compromised.',
            'New work below the required class — not an EICR question but a non-conformity to BS 7671. The work should be reported under the BS 7671 non-conformity route, not just an EICR code.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not invent codes',
          text:
            'EICR codes (C1 Danger present, C2 Potentially dangerous, C3 Improvement recommended, FI Further investigation) are defined by the inspection guidance. Code based on the actual condition and risk, not on the calendar date of installation. If the existing cable performed safely for 30 years and is in a low-risk location, a C2 may be excessive. If it is in an HRB escape route, a C2 or C3 is supportable.',
        },
      ],
    },
    {
      id: 'how-to-source',
      heading: 'How to Source and Verify CPR-Marked Cable',
      tocLabel: 'Sourcing CPR cable',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Buying Cca cable in the UK is straightforward but requires discipline. Wholesalers stock multiple brands and grades; the same headline "twin and earth" or "SWA" descriptor can map to several Euroclass results depending on manufacturer and construction. The cable on the shelf is rarely labelled with a giant "Cca-s1b,d1,a1" sticker — it is labelled with a part number that maps to a DoP.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Specify the Euroclass on the order — "1.5mm² twin and earth, BS EN 50525 / BS 6004 equivalent, Cca-s1b,d1,a1" — not just "1.5mm² T&E".',
            'Ask the wholesaler for the DoP at the point of order. Most major UK manufacturers publish DoPs on their websites under the product code.',
            'Verify on delivery — check the drum label and the cable surface marking match the DoP. The Euroclass code should be printed or stamped on the sheath at the standard interval (typically every metre).',
            'Photograph the drum label and the cable marking before installation. Store the photographs and the DoP in the project records.',
            'Retain the DoP in the building\'s O&M manual / golden thread (for HRBs) so that the inspector, the Responsible Person and any future contractor can trace the installed cable back to its declared performance.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Cable colour codes still apply',
          text:
            'The Euroclass system has not changed the conductor colour code. Twin-and-earth and singles still use the harmonised UK colours — brown / blue for single-phase, brown / black / grey for three-phase, green-and-yellow for protective conductors. See our [cable colour codes guide](/guides/cable-colour-codes) and the broader [UK wiring colours guide](/guides/wiring-colours-uk) for the full reference.',
        },
      ],
    },
  ],
  howToHeading: 'How to Specify the Right Cca Class for Your Project',
  howToDescription:
    'A practical six-step workflow from "what does the fire strategy demand?" to "DoP filed in the project records" — under BS 7671:2018+A4:2026 and the CPR.',
  howToSteps: [
    {
      name: 'Read the project fire strategy first',
      text:
        'Obtain the project\'s fire strategy document (or fire risk assessment for an existing building) and identify which spaces are protected escape routes, which are firefighting shafts, lobbies or risers, and which are ordinary occupied spaces. The fire strategy — not the contractor — sets the required Euroclass.',
    },
    {
      name: 'Map each circuit to the location it runs through',
      text:
        'For every cable run, identify the highest-risk location it passes through. A cable feeding a flat that runs up the riser and along the protected corridor must be specified for the riser/corridor, not for the flat. The worst-case location wins.',
    },
    {
      name: 'Select the Euroclass and subclasses',
      text:
        'Apply the typical UK mapping — Cca-s1b,d1,a1 for protected escape routes, B2ca or B1ca for high-risk lobbies and risers, Dca for general areas, Eca for domestic outside escape routes. Confirm with the fire engineer where any boundary is unclear.',
    },
    {
      name: 'Specify by Euroclass on the BoQ and the order',
      text:
        'Write the Euroclass code on the bill of quantities, the schedule of works, and every cable order. Do not rely on marketing terms like "LSZH" or "fire-safe" — they are not equivalent to a Euroclass.',
    },
    {
      name: 'Verify the DoP and the cable marking on delivery',
      text:
        'On delivery, check the drum label, the cable surface marking and the Declaration of Performance. Photograph the labels. Retain the DoP in the project records. Reject any drum that does not match the specified Euroclass.',
    },
    {
      name: 'File the evidence in the golden thread',
      text:
        'For higher-risk buildings under the Building Safety Act 2022, place the DoPs and the cable evidence into the building\'s golden thread of information. For other buildings, retain in the O&M manual and the health and safety file under CDM 2015.',
    },
  ],
  faqs: [
    {
      question: 'What Cca class do I need for a domestic rewire?',
      answer:
        'For a single-family dwelling under three storeys, Dca for general lighting and power is widely accepted, with Eca acceptable on cables outside the protected escape route. For a three-storey dwelling, HMO or any property with a clearly defined escape route, Cca-s1b,d1,a1 is increasingly specified for cables in the protected escape route. Always read the project fire strategy or fire risk assessment if one exists.',
    },
    {
      question: 'When is Cca-s1b,d1,a1 specifically required?',
      answer:
        'Cca-s1b,d1,a1 is the typical UK specification for fixed-wiring cable on protected escape routes in high-rise residential blocks (over 11 m), schools, hospitals, hotels, assembly buildings and commercial offices. It is also commonly specified in basements and risers. The exact requirement is set by the project fire strategy and Approved Document B, not by BS 7671 alone.',
    },
    {
      question: 'Can I retrofit Cca cable into an existing building?',
      answer:
        'Yes, and this is increasingly being done as part of fire risk assessment remediation in HRBs. Replacing pre-CPR cabling in protected escape routes with Cca-s1b,d1,a1 is a recognised remediation under the Building Safety Act regime. Targeted replacement of cables in the riser, protected stair and common corridor is usually sufficient — a wholesale rewire is rarely needed. The work itself remains subject to BS 7671:2018+A4:2026 and Part P.',
    },
    {
      question: 'How should I code non-CPR cable in an escape route on an EICR?',
      answer:
        'There is no automatic code. Apply the standard EICR framework — code on actual risk in the actual location. Pre-CPR PVC twin-and-earth in the protected escape route of an HRB over 11 m is typically C2 or C3 depending on the building\'s fire strategy and the Responsible Person\'s fire risk assessment. The same cable in a single-family house is generally no code. Always document the reasoning in the observations.',
    },
    {
      question: 'How do I source CPR-marked cable in the UK?',
      answer:
        'All major UK wholesalers (Edmundson, CEF, Rexel, Yesss, Newey & Eyre, City Electrical Factors) stock CPR-classified cable from the main manufacturers (Prysmian, Doncaster Cables, Eland, Tratos, Batt Cables). Specify the Euroclass on the order, request the DoP at the point of ordering, and verify the cable surface marking and drum label on delivery. The Euroclass code is printed on the sheath at regular intervals.',
    },
    {
      question: 'Is CE marking still acceptable in the UK after Brexit?',
      answer:
        'Yes. As of 2026, the UK government has indefinitely extended the recognition of CE marking on construction products placed on the Great Britain market, including cable under the retained Construction Products Regulation. UKCA marking is also acceptable. In Northern Ireland the CE marking and UKNI marking arrangements apply under the Windsor Framework. Either marking, together with a current Declaration of Performance, is acceptable evidence.',
    },
    {
      question: 'Is LSZH cable the same as Cca?',
      answer:
        'No. LSZH (Low Smoke Zero Halogen) describes the chemistry of the sheath and insulation — limited smoke production and no halogen content. Cca is a tested Euroclass under BS EN 50575 — measured heat release, flame spread and total heat output. A cable can be LSZH chemistry and only achieve Dca or Eca on the SBI test; conversely a cable can achieve Cca without being LSZH. Specify by Euroclass and verify by the Declaration of Performance, not by the marketing label.',
    },
    {
      question: 'Does BS 7671:2018+A4:2026 say "every cable must be Cca"?',
      answer:
        'No. BS 7671 does not name a single mandatory Euroclass for all installations. Regulation 422.2 requires cables on escape routes to be non-flame-propagating and selected to limit fire propagation. Regulation 527 requires the selection and erection of cables to minimise the spread of fire. The Euroclass system, the project fire strategy and Approved Document B together determine which class is required where. Cca-s1b,d1,a1 is the de-facto industry standard for protected escape routes in higher-risk premises, but BS 7671 itself stops short of mandating a single class for all locations.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/bs-7671-a4-2026-summary',
      title: 'BS 7671:2018+A4:2026 Summary',
      description: 'Full chapter-by-chapter walk-through of the A4:2026 amendment — AFDD, TN-C-S (PNB), new schedule columns and the cable selection updates that touch reaction-to-fire.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/cable-colour-codes',
      title: 'Cable Colour Codes (UK)',
      description: 'The UK harmonised conductor colour code — brown / blue for single-phase, brown / black / grey for three-phase, green-and-yellow for protective conductors.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/bs5266-emergency-lighting-standard',
      title: 'BS 5266 Emergency Lighting',
      description: 'Emergency lighting circuits — fire resistance and reaction to fire are complementary duties on safety-services cables.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/bs5839-fire-alarm-standard',
      title: 'BS 5839 Fire Alarm Standard',
      description: 'Fire detection and alarm circuits under BS 5839 — fire-resistant cabling per BS EN 50200 / BS 8434 alongside the reaction-to-fire duty.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/micc-cable-guide',
      title: 'MICC (Pyro) Cable Guide',
      description: 'Mineral-insulated copper-clad cable — the canonical fire-resistant solution for the most critical life-safety circuits.',
      icon: 'Cable',
      category: 'Guide',
    },
    {
      href: '/guides/wiring-colours-uk',
      title: 'UK Wiring Colours Reference',
      description: 'The complete UK wiring colours reference for single-phase, three-phase and protective conductors under BS 7671:2018+A4:2026.',
      icon: 'Cable',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Specify cable like a fire engineer, not a wholesaler',
  ctaSubheading:
    'The Elec-Mate platform brings Cca selection, DoP verification and project fire-strategy alignment into a single workflow alongside the EIC, EICR and Minor Works tools — built on BS 7671:2018+A4:2026 and the Construction Products Regulation. 7-day free trial, cancel anytime.',
};
