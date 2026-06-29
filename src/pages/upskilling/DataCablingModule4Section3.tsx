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
    id: 'datacabling-m4s3-compartmentation',
    question:
      "You are pulling Cat6A horizontal cabling through a 60-minute fire-rated wall between two office floors. The wall is part of the building's passive fire compartmentation. What is the contractor's duty?",
    options: [
      'Pull the cables; the wall remains rated by virtue of its construction.',
      'Restore the fire-rating of the wall after penetration using CE / UKCA-marked passive fire-stopping products tested as a system to BS EN 1366-3 (penetration seals) for the same duration as the wall (here, 60 minutes), document the install with photographic and product evidence, and pass the documentation to the duty-holder under the Regulatory Reform (Fire Safety) Order 2005. Approved Document B Vol 2 governs the design / inspection regime in England.',
      'Notify the building control officer and leave the work for them.',
      "Use any commercially-available foam — fire-rating is the manufacturer's problem.",
    ],
    correctIndex: 1,
    explanation:
      "Penetrating a fire-rated wall destroys the rating at the penetration. Restoring it requires a tested penetration sealing system — CE / UKCA-marked, evidenced by classification reports to BS EN 1366-3 / BS EN 13501-2, installed strictly per the manufacturer's tested detail (cable count, cable type, hole size, sealant depth all matter). Passive fire products are not interchangeable. The contractor's legal duty under the Regulatory Reform (Fire Safety) Order 2005 (RRO 2005) is to maintain compartmentation; documentation passes to the responsible person / duty-holder. Approved Document B Vol 2 sets the design and inspection framework. BS 7671 §521.10.202 wraps the wider context.",
  },
  {
    id: 'datacabling-m4s3-product-types',
    question:
      'A specifier asks "what passive fire-stopping products do I need to know about for a typical commercial cabling job?" Which list correctly groups the common product types and what each does?',
    options: [
      'Just expanding foam — the same product seals everything.',
      '(a) Intumescent collars / wraps — fitted around plastic-clad cable bundles where the plastic will burn away, the collar swelling under heat to seal the resulting hole; (b) intumescent pillows / bags — re-enterable seals for cable trays through walls, easy to add cables; (c) intumescent sealants and putties — seal small annular gaps around cables in core-drilled holes; (d) fire-rated mortar / batt systems — for larger openings with multiple penetrations; (e) coated mineral wool — backing material with a fire-rated coating for irregular penetrations.',
      'Plaster only.',
      'Standard polyurethane foam works for any penetration.',
    ],
    correctIndex: 1,
    explanation:
      "Passive fire-stopping for cable penetrations is a family of CE / UKCA-marked products tested as systems to BS EN 1366-3. Intumescent collars / wraps swell under heat to fill the void left when plastic cable jackets burn. Intumescent pillows / bags are the re-enterable choice for cable tray penetrations — easy to add or remove cables. Intumescent sealants / putties seal small gaps. Fire-rated mortar / batt systems handle larger openings. Coated mineral wool fills irregular shapes. The choice of product is dictated by the manufacturer's tested detail for that exact penetration type — substituting products is NOT permitted.",
  },
  {
    id: 'datacabling-m4s3-rro-duty',
    question:
      "Who carries the legal duty for maintaining fire compartmentation in a UK commercial building, and what is the contractor's position?",
    options: [
      'Only building control — the contractor has no duty.',
      'The Regulatory Reform (Fire Safety) Order 2005 (RRO 2005) places the legal duty on the "responsible person" — typically the building owner / occupier / employer for the workplace. The contractor who creates a penetration is contractually and professionally responsible for restoring the compartmentation correctly, and for handing over evidence (photos, product datasheets, classification reports, installation records) so the responsible person can discharge their RRO 2005 duty. CDM 2015 also places duties on the principal contractor / designer.',
      'The lead architect only.',
      'The Health and Safety Executive only.',
    ],
    correctIndex: 1,
    explanation:
      'RRO 2005 places the legal fire-safety duty on the "responsible person" — the building owner / occupier / employer in a workplace. Failure to maintain compartmentation is a criminal offence under RRO 2005. The cabling contractor is not directly the responsible person, but creates the penetration and so carries the contractual / professional duty to restore the rating correctly and document the work. The handover documentation lets the responsible person evidence their compliance. CDM 2015 layers additional duties on principal contractors and designers. Approved Document B Vol 2 (commercial) sets the design framework.',
  },
  {
    id: 'datacabling-m4s3-bs7671-context',
    question:
      'Which BS 7671 regulation provides the wider electrical-safety context for fire-stopping at cable penetrations, and how does it interact with the dedicated fire-stopping standards?',
    options: [
      '§411.3.1 — protective earthing.',
      '§521.10.202 — wiring systems shall not be liable to premature collapse in fire — sets the cable-support context. §527 (sealing of wiring system penetrations, paraphrased — see printed BS 7671) requires that where a wiring system passes through an element of building construction, the openings around the wiring system shall be sealed according to the degree of fire resistance prescribed for the element of building concerned. The detailed fire-stopping product / system requirements come from BS EN 1366-3, BS 9999, Approved Document B Vol 2 — BS 7671 sets the general duty.',
      '§444 only.',
      '§543 only.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 frames the duty in two places: §521.10.202 sets the support / fire-collapse rule (Module 4 Section 1), and §527 (sealing of wiring system penetrations) requires that openings around wiring through fire-rated building elements be sealed to the same fire resistance as the element. §527 sets the general regulatory duty; the detailed product / system requirements come from BS EN 1366-3 (penetration seal test), BS EN 13501-2 (classification), BS 9999 (fire safety in design / management), Approved Document B Vol 2 (England commercial). The contractor reads §527 as the BS 7671 hook, then satisfies it with CE / UKCA-marked products installed per their manufacturer detail.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A fire-rated compartment wall has a 60-minute rating. After cable penetration, what fire rating must the restored seal achieve?',
    options: [
      'The same 60-minute rating as the wall element penetrated, evidenced by a classification report.',
      '30 minutes minimum, as a relaxed baseline for any small cable penetration.',
      '120 minutes, always doubled relative to the wall rating for cable seals.',
      'No fire rating is required at the seal, provided the cables are non-combustible.',
    ],
    correctAnswer: 0,
    explanation:
      'A penetration through a 60-minute fire-rated wall must be sealed to the same 60-minute rating — the seal is part of the compartment, not separate from it. The rating is evidenced by a classification report to BS EN 13501-2 (based on testing to BS EN 1366-3 — penetration seals). The tested system has to match the actual install — cable type, cable count, hole size, seal depth all matter and substituting changes the rating.',
  },
  {
    id: 2,
    question:
      'Which UK statutory instrument places the LEGAL duty on the "responsible person" to maintain fire compartmentation in a workplace, and which UK design / inspection framework backs it?',
    options: [
      'The Building Regulations 2010, backed by BS 7430 (earthing) as the inspection framework.',
      'The Health and Safety at Work etc. Act 1974 alone, under its general duty of care.',
      'The Regulatory Reform (Fire Safety) Order 2005, backed by Approved Document B Vol 2 in England.',
      'The Electromagnetic Compatibility Regulations 2016, backed by BS EN 50174 cabling guidance.',
    ],
    correctAnswer: 2,
    explanation:
      "RRO 2005 is the UK statutory instrument that places the fire-safety duty on the responsible person. Approved Document B Vol 2 is the England commercial design framework (parallel documents in Wales / Scotland / NI). BS 9999 (fire safety in design / management) provides further professional guidance. The cabling contractor creates the penetration and carries the contractual / professional duty to restore the rating; the responsible person carries the legal duty under RRO 2005 — and depends on the contractor's handover documentation to evidence compliance.",
  },
  {
    id: 3,
    question:
      'Which CE / UKCA-marked product is typically used to seal a small annular gap around 4 Cat6A cables passing through a core-drilled hole in a 60-minute compartment wall?',
    options: [
      "General-purpose polyurethane expanding foam from a builder's merchant.",
      'Standard sand-and-cement mortar packed around the cable bundle.',
      'Plasterboard offcuts wedged into the annular gap and skimmed flush.',
      'A CE / UKCA-marked intumescent acrylic, silicone or putty sealant at the tested depth.',
    ],
    correctAnswer: 3,
    explanation:
      "Intumescent sealants / putties are the standard product for small annular gaps around cables. Application depth is set by the manufacturer's tested detail — typically 25-50 mm. The product is CE / UKCA-marked with a classification report. Polyurethane foam is NOT a fire-stopping product (unless specifically intumescent / fire-rated and tested as a system). Substituting products or changing the install detail invalidates the rating.",
  },
  {
    id: 4,
    question:
      'What is the practical difference between intumescent pillows / bags and intumescent collars at cable penetrations?',
    options: [
      'Pillows / bags are re-enterable for tray penetrations; collars seal the void as a plastic jacket burns away.',
      'There is no practical difference between them — the two products are fully interchangeable on any job.',
      'Pillows are rated only for power circuits, while collars are rated solely for data circuits.',
      'Collars have been deprecated under BS EN 1366-3, so only intumescent pillows are now permitted.',
    ],
    correctAnswer: 0,
    explanation:
      'Pillows / bags are re-enterable seals for tray / basket penetrations — they pack into the void and expand under heat. Useful where cables will be added / removed during the building life. Collars / wraps are clamped around plastic-jacketed cables to address the void created when the jacket burns away; the collar contains intumescent material that swells inward to seal the hole. Both are CE / UKCA-marked and both have classification reports under BS EN 1366-3 / BS EN 13501-2.',
  },
  {
    id: 5,
    question:
      'Why is "documentation" listed as a contractor\'s duty for fire-stopping work, alongside the physical installation?',
    options: [
      'It is a nicety only; the physical install is the one thing that actually matters in practice.',
      'It is required only for government, defence and other public-sector building contracts.',
      'It is the evidence the responsible person needs to prove compartmentation was maintained.',
      'It is purely a manufacturer warranty matter, kept on file but not a fire-compliance one.',
    ],
    correctAnswer: 2,
    explanation:
      'Fire-stopping documentation is a critical compliance artefact. Photos before, during and after the seal install. Product datasheets and classification reports. Installation records. Cable IDs linked to the penetration. Without this, the responsible person cannot evidence that compartmentation has been correctly maintained — and they carry the criminal liability under RRO 2005, not the contractor. A fire-risk assessor finding undocumented penetrations on a 2030 inspection treats them as failed by default.',
  },
  {
    id: 6,
    question:
      'The standard reference for the test method for fire-stopping penetration seals (which a CE / UKCA classification report draws on) is:',
    options: [
      'BS 7671 Section 527, which sets the penetration-seal test method directly.',
      'BS EN 50173, the generic cabling system performance and link-budget standard.',
      'BS EN 50310, the bonding and earthing standard for ICT installations.',
      'BS EN 1366-3 — fire resistance tests for service installations: penetration seals.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 1366-3 is the European fire-resistance test method for penetration seals. BS EN 13501-2 is the classification standard that translates the test result into a usable rating (e.g. EI60 = integrity AND insulation, 60 minutes). A tested SYSTEM (specific seal product, specific cable type, specific hole size, specific install detail) gets a classification report. Substituting any element invalidates the rating. The cable contractor reads the classification report to confirm the install detail matches.',
  },
  {
    id: 7,
    question:
      "BS 7671 §521.10.202 (cable support against premature collapse in fire) and §527 (sealing of wiring system penetrations through fire-rated building elements) — what is the contractor's combined duty under both?",
    options: [
      'Both apply: §521.10.202 supports the cable against collapse, §527 seals the opening around it.',
      'Only one applies on a given penetration, and the designer is free to select which of the two.',
      '§521.10.202 only — the seal around the cable falls entirely outside the scope of BS 7671.',
      '§527 only — cable support against fire collapse is governed entirely by manufacturer instructions.',
    ],
    correctAnswer: 0,
    explanation:
      'Both regulations apply on every penetration of a fire-rated element. §521.10.202 governs the SUPPORT system (steel containment / clips so the cable does not fall into an escape route during fire). §527 governs the SEAL around the penetration (so the fire compartment is restored). On every penetration: steel containment + tested fire seal + documentation. Module 4 Section 1 covers the support side; this section covers the seal side.',
  },
  {
    id: 8,
    question:
      'A retrofit cabling job adds 12 Cat6A cables to an existing tested-system penetration that was originally certified for 8 cables only. What is the correct response?',
    options: [
      'Add the cables as planned, since the intumescent seal will expand to accommodate the extra four.',
      'Run a bead of general-purpose silicone around the four new cables to close the resulting gap.',
      'Stop: the new count is outside the tested envelope, so re-seal with a system rated for it.',
      'Pack loose, uncoated mineral wool around the four new cables to fill the void left around them.',
    ],
    correctAnswer: 2,
    explanation:
      "A tested fire-stopping system is certified for a specific cable count and configuration. Adding cables outside the tested envelope invalidates the rating — and therefore breaches compartmentation. The responsible person's RRO 2005 compliance is broken. The fix: re-enter the seal with re-enterable products (pillows / bags) rated for the new count, or replace the seal with a new tested system, or use a separate penetration. Always document the change with new photos and a fresh classification reference. NEVER add cables without re-evaluating the seal.",
  },
  {
    id: 9,
    question:
      'A cable run passes through a service riser shared with a hot-water pipe and a metallic gas pipe. Which BS 7671 regulations apply alongside §527?',
    options: [
      'None — shared service risers are specifically exempt from the BS 7671 proximity rules.',
      'Only §411 (protective measures against electric shock) applies to cabling within a riser.',
      'Only §444 (measures against electromagnetic disturbances) applies to cabling within a riser.',
      '§528.3 (proximity to non-electrical services) applies, alongside §527 for any penetrations.',
    ],
    correctAnswer: 3,
    explanation:
      '§528.3.1 verbatim: "A wiring system shall not be installed in the vicinity of services which produce heat, smoke or fumes likely to be detrimental to the wiring, unless it is protected from harmful effects by shielding arranged so as not to affect the dissipation of heat from the wiring." §528.3.2 covers condensation. §528.3.3 / .3.4 cover proximity. All apply to data cabling in a shared service riser, alongside §527 for any compartment penetrations on the route.',
  },
  {
    id: 10,
    question:
      'A cable run passes through a building lift shaft. What is the position under BS 7671?',
    options: [
      'Prohibited under §528.3.5 unless the cable forms part of the lift installation itself.',
      'Permitted, because a lift shaft counts as a vertical riser for general cabling purposes.',
      'Permitted, provided the cabling is mechanically protected throughout in steel conduit.',
      'Permitted only in the section of the well above the highest position of the lift car.',
    ],
    correctAnswer: 0,
    explanation:
      '§528.3.5 is one of the cleanest cites in BS 7671. Lift / hoist wells are reserved for the lift installation itself (BS EN 81 series). General data cabling — even building services data — is prohibited. The rationale is fire-spread risk, lift mechanism interference, and access for fire-fighting. Always route data cabling via a separate vertical riser. No exceptions.',
  },
];

const faqs = [
  {
    question:
      'Are off-the-shelf "fire-stop foam" products from a builder\'s merchant acceptable for cable penetrations through fire-rated walls?',
    answer: (
      <>
        Only if the specific product is CE / UKCA-marked AND has a classification report under BS EN
        13501-2 (based on testing to BS EN 1366-3) for the specific penetration configuration you
        are sealing — cable type, cable count, hole size, application depth. Generic polyurethane
        expanding foam (the kind used for window installation) is NOT a fire-stopping product and
        must NOT be used for penetration seals. Specialist intumescent foams DO exist and are CE /
        UKCA-marked when sold as fire-stopping. Read the classification report; if you cannot, do
        not use the product.
      </>
    ),
  },
  {
    question: 'Who actually inspects fire-stopping work on a UK commercial cabling job?',
    answer: (
      <>
        Multiple parties depending on the project: building control (during construction, for
        Building Regulations Approved Document B compliance); the principal contractor / CDM 2015
        designer (during construction, for the project quality plan); the responsible person and
        their fire risk assessor (during operation, for RRO 2005 compliance); the building insurer
        (at policy renewal). On larger projects, a specialist passive fire-stopping inspector (e.g.
        accredited under FIRAS, IFC, ASFP) is increasingly required by tier-1 contractors. The
        cabling contractor&apos;s job is to provide the evidence that lets all those parties verify
        compliance.
      </>
    ),
  },
  {
    question: 'What documentation should I leave on site for fire-stopping work?',
    answer: (
      <>
        At minimum: (1) a register of every penetration created during the work, with location /
        wall rating / cable IDs / seal product / install date / installer; (2) photographs of every
        penetration BEFORE the seal, with the seal product visible during install, AFTER the seal is
        complete (showing label / product mark); (3) the manufacturer&apos;s product datasheet and
        classification report (BS EN 13501-2) for each product used; (4) the manufacturer&apos;s
        installation instructions, with any deviations noted and approved. This pack passes to the
        responsible person under RRO 2005 — they cannot evidence compliance without it.
      </>
    ),
  },
  {
    question: 'Can I use the same fire-stopping product for every penetration on a job?',
    answer: (
      <>
        Sometimes — but only if the manufacturer&apos;s tested-system classification report covers
        every penetration configuration on the job. In practice most jobs use a small palette of
        products: an intumescent sealant for small annular gaps; intumescent pillows / bags for tray
        penetrations; intumescent collars for plastic-jacketed cable bundles; a fire-rated mortar /
        batt system for larger openings. The choice for each penetration is dictated by the
        manufacturer&apos;s tested detail for that exact configuration. Substituting across detail
        families is NOT permitted — it invalidates the classification.
      </>
    ),
  },
  {
    question:
      'Where does BS 7671 §527 sit in the fire-stopping hierarchy — is it the primary cite?',
    answer: (
      <>
        BS 7671 §527 (sealing of wiring system penetrations) is the GENERAL regulatory duty — it
        requires that openings around wiring through fire-rated building elements be sealed to the
        same fire resistance as the element penetrated. The detailed product / system requirements
        come from BS EN 1366-3 (test method), BS EN 13501-2 (classification), BS 9999 (fire safety
        in design / management), Approved Document B Vol 2 (England commercial). On a real job: §527
        is the BS 7671 hook the inspector will reference; BS EN 1366-3 / 13501-2 is what the product
        evidence is written against; Approved Document B is the design framework. §521.10.202 covers
        the parallel cable-support duty.
      </>
    ),
  },
  {
    question:
      'Can a domestic electrician carry out fire-stopping work, or is specialist accreditation needed?',
    answer: (
      <>
        UK statute does not currently mandate specialist accreditation for fire-stopping work — but
        the trend is sharply toward third-party certification. FIRAS, IFC and ASFP run accreditation
        schemes. Tier-1 contractors increasingly require accredited installers for hazardous
        occupancies, high-rise residential (post-Grenfell), healthcare and education. For commercial
        cabling work, an electrician without specialist accreditation CAN install penetration seals,
        provided they: (1) follow the manufacturer&apos;s tested detail exactly; (2) use only CE /
        UKCA-marked products with classification reports; (3) document the install thoroughly. But
        on any project of meaningful scale, expect the principal contractor or insurer to require
        accredited installers for the compartment-critical penetrations.
      </>
    ),
  },
];

const DataCablingModule4Section3 = () => {
  const navigate = useNavigate();

  useSEO(
    'Fire-Stopping and Penetration Sealing | Data Cabling Module 4.3 | Elec-Mate',
    "Fire-stopping and penetration sealing for data cabling — fire-rated compartment integrity, intumescent collars / pillows / putty, CE / UKCA-marked passive fire products, documentation per Approved Document B Vol 2; the contractor's duty under BS 7671 §527 / §521.10.202; legal duty under the Regulatory Reform (Fire Safety) Order 2005."
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3"
            title="Fire-Stopping and Penetration Sealing"
            description={`Fire-rated compartment integrity at cable penetrations — intumescent collars, pillows, putty and sealants; CE / UKCA-marked passive fire products tested to BS EN 1366-3 and classified under BS EN 13501-2; documentation per Approved Document B Vol 2; the contractor's duty under BS 7671 §527 / §521.10.202; legal duty of the responsible person under the Regulatory Reform (Fire Safety) Order 2005.`}
            tone="yellow"
          />

          <TLDR
            points={[
              "A penetration through a fire-rated wall or floor destroys the rating at the penetration. The contractor's duty is to RESTORE the rating using a CE / UKCA-marked passive fire-stopping product, tested as a system to BS EN 1366-3, classified to BS EN 13501-2, installed strictly per the manufacturer's tested detail.",
              "The product palette: intumescent collars / wraps (around plastic-jacketed cables), intumescent pillows / bags (re-enterable for tray penetrations), intumescent sealants and putties (small annular gaps), fire-rated mortar / batt systems (large openings), coated mineral wool (irregular shapes). Choice is dictated by the manufacturer's tested detail.",
              'BS 7671 §527 is the wiring-regs hook for penetration sealing; §521.10.202 is the parallel cable-support rule. The detailed product / system requirements come from BS EN 1366-3, BS EN 13501-2, BS 9999, and Approved Document B Vol 2 (England commercial design framework).',
              'The legal duty under the Regulatory Reform (Fire Safety) Order 2005 (RRO 2005) sits with the "responsible person" — typically the building owner / occupier / employer. The cabling contractor carries the contractual / professional duty to restore the rating correctly AND document the work so the responsible person can evidence RRO 2005 compliance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the principle of passive fire compartmentation and why a cable penetration destroys the rating at the penetration unless restored with a tested system',
              'Identify the common families of passive fire-stopping product (intumescent collars, pillows, sealants / putties, fire-rated mortar / batt, coated mineral wool) and pick the right family for each penetration type',
              "Apply BS EN 1366-3 (test method) and BS EN 13501-2 (classification) to evaluate a manufacturer's evidence pack — confirming the tested system matches the actual install detail",
              'Cite BS 7671 §527 (sealing of wiring system penetrations) as the wiring-regs hook, and place it alongside §521.10.202 (cable support against premature collapse in fire)',
              "State the contractor's duty under CDM 2015 and the responsible person's legal duty under the Regulatory Reform (Fire Safety) Order 2005",
              'Apply Approved Document B Vol 2 as the England commercial design framework, with awareness of parallel documents in Wales / Scotland / NI',
              'Document fire-stopping installation comprehensively — product datasheets, classification reports, photos before / during / after, penetration register linked to cable IDs',
              'Manage retrofit changes to existing tested-system penetrations without invalidating the original classification',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Compartmentation — what fire-stopping protects</ContentEyebrow>

          <ConceptBlock
            title="Why a cable penetration destroys the rating, and why restoration matters"
            plainEnglish="UK commercial buildings are designed as series of fire compartments — walls and floors with defined fire-resistance ratings (typically 30, 60, 90 or 120 minutes) that contain a fire long enough for occupants to escape and for fire-fighters to operate safely. The rating is a property of the WHOLE compartment, including every penetration. Drill a hole through a 60-minute wall and you have created a 0-minute path through it — until you restore the rating with a tested fire-stopping system."
            onSite={`Walk any commercial cabling job and you will find dozens or hundreds of compartment penetrations. Every wall the cabling crosses, every floor it passes through. Each one is a piece of the building's fire compartmentation that the contractor temporarily destroyed and is responsible for restoring. The work is not optional — it is a contract / regulatory / criminal-liability matter under RRO 2005.`}
          >
            <p>The compartmentation logic, step by step:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The compartment.</strong> A fire-rated wall or floor with a defined rating —
                typically 30 / 60 / 90 / 120 minutes for commercial work. The rating is the time the
                wall/floor must resist fire from one side without spread to the other. Set by
                Approved Document B Vol 2 in England (parallel docs in Wales / Scotland / NI).
              </li>
              <li>
                <strong>The penetration.</strong> The hole the contractor drills / cores to pass
                cables through. Mechanically destroys the wall locally; thermally creates a path for
                fire spread; smoke-wise creates a path for smoke spread.
              </li>
              <li>
                <strong>The restoration.</strong> A tested fire-stopping system installed in the
                penetration — tested as a SYSTEM to BS EN 1366-3, classified under BS EN 13501-2,
                installed strictly per the manufacturer&apos;s tested detail. The restored seal
                carries the SAME rating as the wall (60 minutes, 90 minutes, etc.) — or more, but
                never less.
              </li>
              <li>
                <strong>The evidence.</strong> Documentation that proves the restoration was done
                correctly: product datasheet, classification report, photos before / during / after,
                penetration register linked to cable IDs. Without evidence, the responsible person
                cannot evidence RRO 2005 compliance.
              </li>
            </ul>
            <p>
              The duty hierarchy: the responsible person (RRO 2005) needs evidence to comply; the
              contractor produces the evidence by restoring correctly and documenting the work;
              building control / FRA / insurers / specialist inspectors verify the evidence. Without
              evidence, every step of the chain is exposed.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §521.10.202 (Wiring system support against premature collapse in fire — verbatim, the wider context)"
            clause={
              <>
                Wiring systems shall be supported such that they will not be liable to premature
                collapse in the event of a fire.
                <br />
                NOTE 5: The intent of this regulation is to prevent the general collapse of wiring
                systems as a result of exposure to the effects of fire such that they would hinder
                the safe evacuation, rescue or access to firefighters. It is not the intent of this
                regulation to provide support to maintain circuit integrity for life safety and/or
                firefighting applications under fire conditions. These requirements are addressed in
                Chapter 56 and in Codes of Practice BS 5266, BS 5839 and BS 8519.
              </>
            }
            meaning="§521.10.202 sets the cable-support duty (cables must not collapse into escape routes during fire). §527 (paraphrased — see printed BS 7671) sets the parallel duty: where a wiring system passes through an element of building construction, the openings around the wiring system shall be sealed according to the degree of fire resistance prescribed for the element of building concerned. Together they cover the two compartmentation duties at a cable penetration: the cable stays up, AND the seal restores the rating. Both are required."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026 — §527 not reproduced verbatim here; refer to printed BS 7671:2018+A4:2026 Section 527"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The product palette</ContentEyebrow>

          <ConceptBlock
            title="Intumescent collars, pillows, putty, mortar — choosing by penetration type"
            plainEnglish="Passive fire-stopping for cable penetrations is a small family of CE / UKCA-marked products, each tested as a system to BS EN 1366-3 with a classification report under BS EN 13501-2. The right product is dictated by the penetration type — there is no universal product, and substituting between products invalidates the rating."
            onSite={`On any cabling job, you will use 3-4 of these products as a palette. Walk the proposed penetrations and tag each with the product family. Small annular gap around 4 cables in a core-drilled hole? Sealant. Cable tray penetration with future moves expected? Pillows. Plastic-jacketed riser cable through a floor? Collar. Large opening with multiple cable types? Mortar / batt with appropriate inserts. The palette is the design choice; the install is then disciplined to the manufacturer's tested detail for each product.`}
          >
            <p>The five common product families, and what each is for:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Intumescent collars / wraps.</strong> Clamped around plastic-jacketed cable
                bundles where they pass through fire-rated walls / floors. The plastic jacket burns
                away under fire heat, leaving a void; the intumescent material in the collar swells
                inwards under heat, sealing the void. Typical use: PVC / LSZH cable bundles in floor
                risers, single thick plastic-clad cables.
              </li>
              <li>
                <strong>Intumescent pillows / bags.</strong> Packed into the void around cable tray
                / basket penetrations. Re-enterable — easy to remove and replace when cables are
                added or changed during the building life. Activated by heat to seal the void.
                Typical use: tray penetrations through compartment walls, riser openings with
                multiple cable types.
              </li>
              <li>
                <strong>Intumescent sealants and putties.</strong> Acrylic, silicone or putty
                materials that fill small annular gaps around individual cables in core-drilled
                holes. Application depth (typically 25-50 mm) is set by the manufacturer&apos;s
                tested detail. Typical use: 1-6 cable penetrations in a small bore.
              </li>
              <li>
                <strong>Fire-rated mortar / batt systems.</strong> Cement-board or mineral-wool batt
                panels with a fire-rated coating, used to seal larger openings (riser shafts, large
                openings with multiple penetrations). Often combined with cable inserts / collars /
                sealant within the batt to handle the cable bundles.
              </li>
              <li>
                <strong>Coated mineral wool.</strong> Compressed mineral wool with an applied
                fire-rated coating, used as a backing / filler for irregular penetrations or in
                combination with other products. Always tested as a system — coating product +
                thickness + density + compression all matter.
              </li>
            </ul>
            <p>
              All five families share the same compliance discipline: CE / UKCA mark, classification
              report under BS EN 13501-2, manufacturer&apos;s tested detail followed exactly, and
              documented installation. Substitution between products is NOT permitted — each
              product&apos;s rating is for its tested system only.
            </p>
          </ConceptBlock>

          <AppendixTable
            caption="Passive fire-stopping product families — selection by penetration type"
            source="2026 — BS EN 1366-3 / BS EN 13501-2 alignment"
            headers={['Product family', 'Typical use', 'Re-enterable?', 'Standard reference']}
            rows={[
              [
                'Intumescent collars / wraps',
                'Around plastic-jacketed cable bundles in walls / floors',
                'No (without disturbing seal)',
                'BS EN 1366-3 + BS EN 13501-2',
              ],
              [
                'Intumescent pillows / bags',
                'Cable tray / basket penetrations, riser openings',
                'Yes — designed for moves and adds',
                'BS EN 1366-3 + BS EN 13501-2',
              ],
              [
                'Intumescent sealants / putties',
                'Small annular gaps around 1-6 cables in core-drilled holes',
                'Limited — partial re-entry possible',
                'BS EN 1366-3 + BS EN 13501-2',
              ],
              [
                'Fire-rated mortar / batt',
                'Large openings, multiple penetrations, riser shafts',
                'No (replace section)',
                'BS EN 1366-3 + BS EN 13501-2',
              ],
              [
                'Coated mineral wool',
                'Irregular penetrations, backing for other products',
                'No',
                'BS EN 1366-3 + BS EN 13501-2',
              ],
            ]}
            notes={`All products require CE / UKCA mark and a classification report. The tested system is product-specific — substituting across families invalidates the rating. Always install per the manufacturer's tested detail — cable count, hole size, application depth all matter.`}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The legal duty — RRO 2005 and the contractor</ContentEyebrow>

          <ConceptBlock
            title="Who carries the duty, and what the contractor has to do about it"
            plainEnglish={`UK fire-safety law in workplaces is the Regulatory Reform (Fire Safety) Order 2005 (RRO 2005). The legal duty sits on the "responsible person" — typically the building owner / occupier / employer. Failure to maintain compartmentation is a criminal offence under RRO 2005, with prosecutions and unlimited fines on conviction. The cabling contractor is not directly the responsible person — but the contractor creates the penetration and so carries the contractual / professional duty to restore the rating correctly AND document the work.`}
            onSite={`The handover discipline is: (1) install the seal correctly per the manufacturer's tested detail; (2) document the installation comprehensively (photos, datasheets, classification reports, register); (3) hand the documentation to the principal contractor / building owner / facilities team. Without the documentation, the responsible person cannot discharge their RRO 2005 duty — and they have no recourse against the contractor unless the contract requires the documentation pack.`}
          >
            <p>The duty hierarchy on a UK commercial fire-stopping job:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The responsible person (RRO 2005).</strong> The building owner / occupier /
                employer. Carries the criminal liability for failure to maintain compartmentation.
                Needs evidence at every fire risk assessment renewal / building inspection /
                insurance review.
              </li>
              <li>
                <strong>The principal contractor (CDM 2015).</strong> Carries CDM duties for the
                project — including ensuring fire-stopping is correctly designed, installed and
                documented. Often delegates the documentation pack-up to specialist fire-stopping
                inspectors on larger jobs.
              </li>
              <li>
                <strong>The cabling contractor.</strong> Creates the penetrations. Restores each
                penetration with a tested system installed per the manufacturer&apos;s detail.
                Documents the work. Hands documentation to principal contractor / building owner.
                Carries professional / contractual liability if the work is wrongly executed.
              </li>
              <li>
                <strong>Building control and the FRA.</strong> Verify compliance during construction
                (building control, Approved Document B) and during occupation (FRA, RRO 2005). Both
                rely on the contractor&apos;s documentation.
              </li>
              <li>
                <strong>The insurer.</strong> May require specialist accreditation (FIRAS / IFC /
                ASFP) for the installer on certain occupancies (high-rise residential, healthcare,
                education). Renewal premiums increasingly tied to documented compartmentation
                integrity.
              </li>
            </ul>
            <p>
              The cleanest contractor workflow: agree the product palette in advance with the
              specifier; pre-walk every penetration; install using only CE / UKCA-marked products
              with classification reports; photograph every penetration before / during / after;
              build a register linked to cable IDs; hand over the pack at practical completion. The
              pack is the asset.
            </p>
          </ConceptBlock>

          {/* Compartmentation diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Fire-rated wall cross-section — cable penetration with restored seal
            </h4>
            <svg
              viewBox="0 0 900 540"
              className="w-full h-auto"
              role="img"
              aria-label="Cross-section diagram through a 60-minute fire-rated compartment wall. The wall body is shown horizontally across the centre, with Room A on the left and Room B on the right. Cables pass through the wall body where a tested fire-stopping seal restores the rating. Labels appear in dedicated rows above the wall (rating, seal product reference) and below the wall (cable identity, install detail). The wall body itself contains no labels — only the seal material is shown inside it. A footer below summarises the contractor's three duties: design, install, document."
            >
              {/* Header */}
              <text
                x="450"
                y="28"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                CROSS-SECTION · 60 min FIRE-RATED COMPARTMENT WALL
              </text>

              {/* Top label row: rating */}
              <text
                x="450"
                y="60"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                EI 60 — integrity + insulation, 60 minutes (BS EN 13501-2)
              </text>

              {/* Room labels (above wall, on each side) */}
              <text
                x="160"
                y="92"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ROOM A
              </text>
              <text
                x="160"
                y="110"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                cold side
              </text>
              <text
                x="740"
                y="92"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ROOM B
              </text>
              <text
                x="740"
                y="110"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                opposite compartment
              </text>

              {/* ===== Wall body row: y = 130 to 330 (200 px tall) ===== */}

              {/* Room A floor / ceiling representation (the room space) */}
              <rect
                x="40"
                y="130"
                width="240"
                height="200"
                rx="3"
                fill="rgba(34,211,238,0.04)"
                stroke="rgba(34,211,238,0.20)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              {/* Room B */}
              <rect
                x="620"
                y="130"
                width="240"
                height="200"
                rx="3"
                fill="rgba(34,211,238,0.04)"
                stroke="rgba(34,211,238,0.20)"
                strokeWidth="1"
                strokeDasharray="2 4"
              />

              {/* Wall body — solid masonry block centred. NO TEXT INSIDE. */}
              <rect
                x="280"
                y="130"
                width="340"
                height="200"
                rx="2"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="2"
              />
              {/* Concrete hatching */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <line
                  key={'wh-' + i}
                  x1="280"
                  y1={150 + i * 22}
                  x2="620"
                  y2={150 + i * 22}
                  stroke="#A855F7"
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                />
              ))}

              {/* Cables passing through (entering wall, traversing seal area, exiting) */}
              {/* Cable 1 */}
              <line
                x1="40"
                y1="216"
                x2="860"
                y2="216"
                stroke="#FACC15"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Cable 2 */}
              <line
                x1="40"
                y1="232"
                x2="860"
                y2="232"
                stroke="#FACC15"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Cable 3 */}
              <line
                x1="40"
                y1="248"
                x2="860"
                y2="248"
                stroke="#FACC15"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Sealed penetration zone within the wall — intumescent material (orange/yellow) */}
              <rect
                x="290"
                y="200"
                width="320"
                height="64"
                rx="3"
                fill="rgba(252,165,21,0.32)"
                stroke="#FB923C"
                strokeWidth="1.8"
              />
              {/* Pillows pattern inside seal — small horizontal lines to suggest packed pillows */}
              {[208, 220, 240, 252].map((y) => (
                <line
                  key={'sp-' + y}
                  x1="298"
                  y1={y}
                  x2="602"
                  y2={y}
                  stroke="#FB923C"
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                />
              ))}

              {/* Bottom label row (cable identity + seal detail) */}
              <text
                x="160"
                y="358"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                3 × Cat6A horizontal cables
              </text>
              <text
                x="160"
                y="374"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                labelled per BS EN 50174-1 §6
              </text>

              <text
                x="450"
                y="358"
                textAnchor="middle"
                fill="#FB923C"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                INTUMESCENT PILLOWS / BAGS
              </text>
              <text
                x="450"
                y="374"
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="10"
                fontFamily="system-ui"
              >
                tested system to BS EN 1366-3
              </text>
              <text
                x="450"
                y="390"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                re-enterable · CE / UKCA-marked
              </text>

              <text
                x="740"
                y="358"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                classification: EI 60
              </text>
              <text
                x="740"
                y="374"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="9.5"
                fontFamily="system-ui"
              >
                matches the wall rating
              </text>

              {/* ===== Footer panel — three duties ===== */}
              <rect
                x="40"
                y="416"
                width="820"
                height="108"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="440"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                CONTRACTOR DUTY — THREE PARTS
              </text>
              <text x="60" y="462" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                DESIGN — pick CE / UKCA-marked product whose tested system matches the penetration
                configuration.
              </text>
              <text x="60" y="482" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                INSTALL — follow manufacturer&apos;s tested detail exactly: cable count, hole size,
                application depth.
              </text>
              <text x="60" y="502" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                DOCUMENT — photos before / during / after, datasheet, classification report →
                handover pack.
              </text>
              <text x="60" y="518" fill="#9CA3AF" fontSize="9.5" fontFamily="system-ui">
                BS 7671 §527 (sealing of penetrations) · §521.10.202 (cable support) · RRO 2005
                (responsible person)
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Filling a cable penetration with off-the-shelf polyurethane expanding foam"
            whatHappens={
              <>
                Quick retrofit job. Installer drills through a 60-minute compartment wall to pass 6
                Cat6A cables, then fills the gap around the cables with builder&apos;s-merchant
                polyurethane expanding foam from a yellow can. Foam looks neat. The installer
                considers the work complete. A subsequent fire risk assessment fails the penetration
                on inspection — generic PU foam is NOT a fire-stopping product. The compartmentation
                is breached. Responsible person carries RRO 2005 liability for the failure;
                contractor carries professional and contractual liability.
              </>
            }
            doInstead={
              <>
                Use only CE / UKCA-marked passive fire-stopping products with a classification
                report (BS EN 13501-2 based on BS EN 1366-3 testing) for the SPECIFIC penetration
                configuration — cable type, cable count, hole size. For 6 Cat6A cables in a
                core-drilled hole through a 60-minute wall, an intumescent sealant or putty at the
                manufacturer&apos;s tested depth is the typical answer. Document the install with
                the product datasheet, the classification report, and photos before / during /
                after. Hand the pack to the principal contractor or building owner. Specialist
                intumescent foams DO exist and ARE acceptable when CE / UKCA-marked with a
                classification report — read the report; the absence of a classification reference
                means the product is not fire-stopping.
              </>
            }
          />

          <Scenario
            title="A retrofit adds 8 Cat6A cables to a riser penetration originally certified for 12 cables — what is your duty?"
            situation={
              <>
                A retrofit project on a 2018 office building. A vertical riser between Floor 3 and
                Floor 4 has an existing tested-system penetration certified for 12 Cat5e cables. The
                new project needs to pull 8 additional Cat6A cables through the same opening. The
                opening looks like it has plenty of physical room.
              </>
            }
            whatToDo={
              <>
                Pause and check the existing classification report. The original test was for 12
                Cat5e cables; adding 8 Cat6A changes both the cable count AND the cable type,
                outside the tested envelope. The original classification is invalidated. Three
                options: (1) re-enter the existing seal with a re-enterable system (intumescent
                pillows / bags) rated for 20 cables of the new mixed type, installing per the new
                manufacturer&apos;s tested detail; (2) replace the entire seal with a new tested
                system rated for the new cable count and type; (3) route the 8 new cables through a
                separate, separately-sealed penetration on the same riser. Whichever option,
                document the change with new photos, new datasheet, new classification reference.
                Update the building&apos;s penetration register. Hand the new pack to the
                responsible person.
              </>
            }
            whyItMatters={
              <>
                A tested fire-stopping system is certified for an exact configuration. Adding cables
                outside the tested envelope invalidates the rating — and breaches compartmentation.
                The responsible person&apos;s RRO 2005 compliance is broken at that point, even
                though the original install was correct. The contractor who makes the change carries
                the contractual / professional liability for the breach. Always re-evaluate the seal
                whenever the configuration changes — cable count, cable type, hole size all matter.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              "A penetration through a fire-rated wall / floor destroys the rating at the penetration. Restoring it requires a CE / UKCA-marked tested system installed per the manufacturer's detail. Same rating as the wall (60 min, 90 min, etc.) — never less.",
              'Five common product families: intumescent collars (around plastic-jacketed cables), pillows / bags (re-enterable, tray penetrations), sealants / putties (small annular gaps), fire-rated mortar / batt (large openings), coated mineral wool (irregular shapes / backing).',
              'BS 7671 §527 sets the wiring-regs hook (sealing of penetrations to the same fire resistance as the element). §521.10.202 sets the parallel cable-support duty. Detailed product evidence: BS EN 1366-3 (test method), BS EN 13501-2 (classification), Approved Document B Vol 2 (England commercial design).',
              'The legal duty under the Regulatory Reform (Fire Safety) Order 2005 sits with the responsible person (building owner / occupier / employer). The contractor carries the contractual / professional duty to restore correctly AND document the work.',
              'Documentation is the deliverable: photos before / during / after every penetration, product datasheet, classification report, penetration register linked to cable IDs. No documentation = no defensible compliance.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Cable Separation and Bend Radius
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: ID Labelling Standards and Colour Codes
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule4Section3;
