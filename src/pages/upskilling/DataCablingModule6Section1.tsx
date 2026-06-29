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
    id: 'datacabling-m6s1-three-families',
    question:
      'A specifier writes "the cabling system shall comply with TIA-568, ISO/IEC 11801 and BS EN 50173". Which statement is most accurate about what they are asking for?',
    options: [
      'Three completely different cabling specifications, each needing its own separate cable plant.',
      'Three regional expressions of one architecture sharing a topology, so one install satisfies all.',
      'TIA-568 governs copper, ISO/IEC 11801 governs fibre, and BS EN 50173 governs administration.',
      'They are mutually exclusive — you must pick one family and reject the other two entirely.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-568, ISO/IEC 11801 and BS EN 50173 are the three parallel families of generic-cabling standards. They evolved together, cross-reference each other, and use a shared six-zone topology and channel model. Differences are mostly terminology (Category vs Class, ER/TR vs CD/BD/FD) and small numerical tolerances. The UK is BS EN 50173 territory (BS 7671 §444.410 names BS EN 50174-1, 50174-2 and BS EN 50310 verbatim) but a project specifying compliance with TIA + ISO + EN is asking for a system whose Class EA / Cat 6A install certifies under any of them.',
  },
  {
    id: 'datacabling-m6s1-tia-568-parts',
    question:
      'ANSI/TIA-568 is a series. Which part covers BALANCED twisted-pair cable and components specifically (Cat 5e, 6, 6A, 8 transmission performance)?',
    options: [
      'TIA-568.0-E — generic premises cabling common requirements.',
      'TIA-568.1-E — commercial-building cabling integration design.',
      'TIA-568.2-E (2024) — Balanced Twisted-Pair Cabling and Components.',
      'TIA-568.3-E — optical-fibre cabling and components standard.',
    ],
    correctIndex: 2,
    explanation:
      'TIA-568.2-E (2024) is the balanced twisted-pair part. .0-E gives common requirements across the whole 568 family; .1-E covers commercial buildings (the integration document); .3-E covers optical fibre. The four parts are read together: .0-E + .1-E for the building-level design, .2-E for the copper components, .3-E for the fibre components.',
  },
  {
    id: 'datacabling-m6s1-uk-primary-standard',
    question:
      'Which standard does BS 7671:2018+A4:2026 §444.410 verbatim require to be applied for control, signalling and communication circuits inside buildings?',
    options: [
      'ANSI/TIA-568.0-E generic cabling and TIA-942-C data-centre infrastructure.',
      'The ISO/IEC 11801 international generic-cabling series and nothing else.',
      'BS EN 50174-1, BS EN 50174-2 (planning inside buildings) and BS EN 50310 (bonding).',
      'BS 6701 (telecoms equipment installation) only, with no EN series applied.',
    ],
    correctIndex: 2,
    explanation:
      '§444.410 names BS EN 50174-1, BS EN 50174-2 and BS EN 50310 as the three standards whose requirements and recommendations "shall be applied" for control / signalling / communication circuits inside buildings. The wording is "shall" — these are not optional in the UK from 15 April 2026. TIA-568 and ISO/IEC 11801 remain useful international references, but the UK regulatory pointer is to the EN series.',
  },
  {
    id: 'datacabling-m6s1-tia-606-vs-607',
    question:
      'A facilities manager asks "which TIA standard tells me how to label every link, port and outlet, and which one tells me how to bond and earth the comms infrastructure?". What is the answer?',
    options: [
      'Both labelling and earthing are covered together within the TIA-568 cabling series.',
      'TIA-606-D governs administration and labelling; TIA-607-E governs bonding and earthing.',
      'TIA-942-C governs labelling, while TIA-569-E governs bonding and earthing of comms.',
      'Neither — labelling and earthing are addressed only in BS EN 50310, not any TIA document.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-606-D (administration) and TIA-607-E (bonding & earthing) are two distinct documents. -606-D defines the identifier hierarchy and record-keeping discipline; -607-E defines the Telecommunications Bonding Backbone (TBB), Telecommunications Grounding Busbar (TGB), Telecommunications Main Grounding Busbar (TMGB) and Bonding Conductor for Telecommunications (BCT). The EN equivalents are BS EN 50174-1 §6 (administration) and BS EN 50310 (bonding). Both topics get full treatment in Sections 3 and 4 of this module.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which statement most accurately describes the relationship between TIA-568, ISO/IEC 11801 and BS EN 50173?',
    options: [
      'They are competing standards; only one of the three may ever be applied to a given job.',
      'TIA-568 governs Layer 1, ISO/IEC 11801 governs Layer 2 and BS EN 50173 governs Layer 3.',
      'BS EN 50173 is a direct British translation of the American TIA-568 document, clause for clause.',
      'Three parallel, aligned generic-cabling families sharing a topology; the UK pointer is the EN series.',
    ],
    correctAnswer: 3,
    explanation:
      'Three parallel families, broadly aligned. The UK is a BS EN 50173 jurisdiction in regulatory terms (§444.410 names the EN documents verbatim). On a multi-region project, specifying compliance with all three is normal — a Class EA / Cat 6A install built to BS EN 50174-2 will satisfy TIA-568.2-E and ISO/IEC 11801-2 simultaneously.',
  },
  {
    id: 2,
    question:
      'You are reading the ANSI/TIA-568 series and need the document that gives transmission performance limits for Cat 6A balanced cable. Which part?',
    options: [
      'ANSI/TIA-568.0-E — the generic cabling common-requirements umbrella part.',
      'ANSI/TIA-568.1-E — the commercial-building cabling integration part.',
      'ANSI/TIA-568.2-E (2024) — Balanced Twisted-Pair Cabling and Components.',
      'ANSI/TIA-568.3-E — the optical-fibre cabling and components part.',
    ],
    correctAnswer: 2,
    explanation:
      'TIA-568.2-E (2024) is the balanced TP part. It defines the channel and permanent-link transmission limits for Cat 5e, 6, 6A, and 8. .0-E is the common-requirements umbrella; .1-E is commercial buildings; .3-E is fibre.',
  },
  {
    id: 3,
    question:
      'Which CENELEC document is the European harmonised generic-cabling performance standard (Class D, E, EA, F, FA, I, II)?',
    options: [
      'BS EN 50173 — Generic cabling systems, the EN performance family mirroring ISO/IEC 11801.',
      'BS EN 50174-1 — Cabling installation: specification and quality assurance for the works.',
      'BS EN 50310 — Telecommunications bonding networks for buildings and other structures.',
      'BS EN 50346 — Cabling installation: testing of installed balanced and optical cabling.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 50173 is the EN performance family — the European mirror of ISO/IEC 11801. It defines the Classes the channel must measure to. BS EN 50174 is install practice; BS EN 50310 is bonding; BS EN 50346 is testing — all separate documents with separate scopes.',
  },
  {
    id: 4,
    question:
      'A UK installer is challenged on standards compliance. What is the verbatim BS 7671:2018+A4:2026 clause that names the EN cabling-installation standards as mandatory inside buildings?',
    options: [
      '§528.1 — proximity of wiring systems to other electrical and non-electrical services.',
      '§716.1 — scope of the new power-over-data (PoE) installation requirements.',
      '§444.410 — the "shall be applied" pointer to BS EN 50174-1, 50174-2 and 50310.',
      '§545.1.1 — ICT functional earthing and bonding network arrangements.',
    ],
    correctAnswer: 2,
    explanation:
      '§444.410 is the verbatim cite: "Within a building, the requirements and recommendations of the following standards shall be applied for control, signalling and communication circuits: (a) BS EN 50174-1; (b) BS EN 50174-2; (c) BS EN 50310." It lifts those EN documents from "good practice" to "shall be applied" status for any control / signalling / communication circuit inside a UK building. From 15 April 2026, ignoring them is non-compliance with BS 7671.',
  },
  {
    id: 5,
    question:
      'Which TIA document covers telecommunications PATHWAYS AND SPACES — the rooms, the trays, the conduits, the entrance facilities — including the 18-27 °C / 8-60 % RH environmental envelope for a TR?',
    options: [
      'ANSI/TIA-568.0-E — Generic Telecommunications Cabling for Customer Premises.',
      'ANSI/TIA-606-D — Administration Standard for Telecommunications Infrastructure.',
      'ANSI/TIA-942-C — Telecommunications Infrastructure Standard for Data Centres.',
      'ANSI/TIA-569-E with Addendum 1 — Telecommunications Pathways and Spaces.',
    ],
    correctAnswer: 3,
    explanation:
      'TIA-569-E + Addendum 1 (2022) is the spaces standard. It defines the TR (Telecommunications Room), ER (Equipment Room), EF (Entrance Facility), pathway types, and the 18-27 °C / 8-60 % RH envelope (the 2022 Addendum updated the older 18-24 °C / 40-55 % numbers). TIA-942-C is the data-centre standard, often confused with -569-E for floor loading and environmental questions.',
  },
  {
    id: 6,
    question:
      'You inherit a building cabled in 2010. Drawings reference "ISO/IEC 11801:2002". Which version is current today?',
    options: [
      'ISO/IEC 11801-1:2017+A1:2021 plus application parts; the 2002 single document was superseded.',
      'ISO/IEC 11801:2002 remains current — the multi-part series is only a future unpublished proposal.',
      'ISO/IEC 11801:2010 is the latest single-document edition and supersedes the 2002 version outright.',
      'ISO/IEC 11801 has been withdrawn entirely and replaced by the ANSI/TIA-568 series of standards.',
    ],
    correctAnswer: 0,
    explanation:
      'The 2002 edition was superseded by the multi-part series. ISO/IEC 11801-1:2017+A1:2021 is current for general requirements, and dedicated parts cover office, industrial, residential, data-centre and distributed-building applications. BS EN 50173 mirrors this multi-part structure.',
  },
  {
    id: 7,
    question:
      'TIA-568.0-E and BS EN 50173-1 both define a "permanent link" and a "channel". What is the difference?',
    options: [
      'There is no real difference — "permanent link" and "channel" are interchangeable terms.',
      'The permanent link is always optical fibre, while the channel is always copper twisted-pair.',
      'The permanent link is installed solid cabling ≤ 90 m; the channel adds cords to ≤ 100 m.',
      'The permanent link is a test-only construct and carries no maximum-length limit at all.',
    ],
    correctAnswer: 2,
    explanation:
      'Permanent link = installed cabling, ≤ 90 m, solid conductor, contractor-tested. Channel = end-to-end signal path including cords, ≤ 100 m, what the equipment sees. Both TIA-568.0-E and ISO/IEC 11801-1 / BS EN 50173-1 use this same model. The 90 m / 100 m / 10 m budget is identical across the three families.',
  },
  {
    id: 8,
    question:
      'Which TIA document covers ADMINISTRATION — the labelling identifiers, the records, the as-built documentation — for telecommunications infrastructure?',
    options: [
      'ANSI/TIA-607-E — Bonding and Grounding (Earthing) for Customer Premises.',
      'ANSI/TIA-606-D (2021) — Administration Standard for Telecommunications Infrastructure.',
      'ANSI/TIA-1152-A — Requirements for Field Test Instruments and Measurements.',
      'ANSI/TIA-942-C — Telecommunications Infrastructure Standard for Data Centers.',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-606-D (2021) is the administration standard. It defines the identifier hierarchy (TR identifier, link identifier, outlet identifier, panel/port format) and the records that must be maintained. The European equivalent is BS EN 50174-1 §6. Section 4 of this module covers both in detail.',
  },
  {
    id: 9,
    question:
      'A data-centre RFP requires "ANSI/TIA-942-C compliance, Rated-3". What is TIA-942 and what does "Rated-3" mean?',
    options: [
      'It is an Ethernet transmission standard; Rated-3 denotes a 3 Gbps link speed at the rack.',
      'It is a multimode fibre standard; Rated-3 denotes OM3-grade fibre throughout the facility.',
      'It is a cable fire-performance standard; Rated-3 denotes a particular reaction-to-fire class.',
      'It is the data-centre infrastructure standard; Rated 1-4 classes, Rated 3 concurrently maintainable.',
    ],
    correctAnswer: 3,
    explanation:
      'TIA-942-C is the data-centre standard. Rated 1 to Rated 4 (sometimes still called "Tier", though Uptime Institute uses Tier exclusively now and TIA uses "Rated"). Rated 3 = concurrently maintainable; Rated 4 = fault tolerant. The European equivalent family is BS EN 50600.',
  },
  {
    id: 10,
    question:
      'Which TIA document specifies the field-test instrument requirements (Levels III / IIIe / IV / V) used to certify a balanced twisted-pair channel against its Class?',
    options: [
      'ANSI/TIA-1152-A — Field Test Instruments and Measurements for Twisted-Pair Cabling.',
      'ANSI/TIA-568.2-E — Balanced Twisted-Pair Cabling and Components Standard.',
      'ANSI/TIA-606-D — Administration Standard for Telecommunications Infrastructure.',
      'BS EN 50174-2 — Cabling installation: planning and practices inside buildings.',
    ],
    correctAnswer: 0,
    explanation:
      'TIA-1152-A (2016) is the field-test instrument standard. Level V is the current top accuracy. The European equivalent is BS EN 50346. A "Class EA pass" certificate must come from an instrument that meets the relevant accuracy level — without that, the certification has no defensible basis.',
  },
];

const faqs = [
  {
    question:
      'If TIA, ISO and EN are broadly aligned, why do we have all three? Could one not be retired?',
    answer: (
      <>
        Each serves a regional regulatory body. ANSI/TIA is a US national standard; ISO/IEC is an
        international standard developed by ISO and IEC jointly; BS EN 50173 is the CENELEC European
        harmonised standard, transposed in the UK as a BS EN. Each gets cited by the relevant
        national legislation and procurement framework. They co-exist because each serves a
        different jurisdictional purpose, and they are kept aligned through liaison committees. BS
        7671:2018+A4:2026 §444.410 names the EN documents because BS 7671 is a UK standard; a
        Canadian or US wiring code would point to TIA. Same shape; different names; different legal
        pedigree.
      </>
    ),
  },
  {
    question: 'I keep seeing "TIA-568-D" in older drawings. Is that current?',
    answer: (
      <>
        No. The TIA-568 series is on Revision E. ANSI/TIA-568.0-E was published in 2020,
        ANSI/TIA-568.2-E (the balanced twisted-pair part) was published in 2024, and the other parts
        have been brought forward to Revision E. Drawings citing 568-D, 568-C or 568-B are obsolete
        reference material. They are not "wrong" for the era they were drawn — but a new spec or
        certification must reference the current Revision E parts.
      </>
    ),
  },
  {
    question: 'Where does BS 6701 fit alongside BS EN 50173, BS EN 50174 and BS 7671?',
    answer: (
      <>
        BS 6701:2016+A1:2017 covers UK customer-premises telecommunications wiring — the entry point
        from the carrier (Openreach / fibre delivery), the demarcation, and the in-building wiring
        discipline. It is upstream of BS EN 50173 (which assumes the customer-premises
        infrastructure exists and specifies how it must perform), parallel to BS EN 50174
        (installation practice), and electrically referenced by BS 7671 (which governs the LV / ELV
        power dimension and, from A4:2026, the PoE dimension). BS 6701 is not the cabling
        performance standard; it is the UK customer-premises wiring standard that names what is the
        carrier{`'`}s responsibility and what is the customer{`'`}s.
      </>
    ),
  },
  {
    question:
      'TIA-569-E says 18-27 °C / 8-60 % RH for a TR. Where does that come from and why did it change?',
    answer: (
      <>
        ANSI/TIA-569-E (2019) was updated by Addendum 1 in 2022, which aligned the TR environmental
        envelope to ASHRAE Class A1 — 18-27 °C, 8-60 % RH non-condensing. The earlier guidance of
        18-24 °C / 40-55 % RH dates from before the 2022 Addendum and is now out of date. Modern
        active equipment (switches, APs, PoE PSEs) tolerates the wider envelope, and the wider
        envelope reduces cooling cost. A spec that demands the older narrow band is over-specifying
        and pushing cost into the build. Always cite TIA-569-E + Addendum 1 (2022) for the current
        numbers.
      </>
    ),
  },
  {
    question: 'Does BS 7671 require BS EN 50173, or just BS EN 50174 and BS EN 50310?',
    answer: (
      <>
        §444.410 names BS EN 50174-1, BS EN 50174-2 and BS EN 50310 explicitly — those three are the{' '}
        {`"`}shall be applied{`"`} documents. BS EN 50173 is not named in §444.410, but it is the
        performance standard that defines the Classes the install must achieve, and it is the
        document referenced from §716.1 ({`"`}balanced, information technology cables and
        accessories primarily designed for data transmission, as specified in BS EN 50173-1{`"`})
        and §716.2(a) as a normative reference. So in practice — yes, BS EN 50173-1 is regulatorily
        relevant through §716, even though §444.410 stops short of naming it.
      </>
    ),
  },
  {
    question:
      'Why do TIA and EN use different terminology — Cat vs Class, ER/TR/WA vs CD/BD/FD/TO?',
    answer: (
      <>
        Historical accident plus committee preference. TIA evolved from a North-American
        commercial-buildings tradition with {`"`}Equipment Room{`"`}, {`"`}Telecommunications Room
        {`"`}, {`"`}Work Area{`"`} and {`"`}Cat 5/6/6A{`"`}. ISO/IEC and CENELEC came later,
        harmonising across many countries, and chose more neutral hierarchical terms — Campus
        Distributor, Building Distributor, Floor Distributor, Telecommunications Outlet. The
        {`"`}Class{`"`} language (D, E, EA, F, FA, I, II) is the EN/ISO performance terminology
        because Classes describe what the channel measures as, regardless of which Category of
        components were used. Real-world projects use both terminologies fluidly — Cat 6A and Class
        EA are the same target on a UK office fit-out.
      </>
    ),
  },
];

const DataCablingModule6Section1 = () => {
  const navigate = useNavigate();

  useSEO(
    'TIA/EIA 568 and ISO/IEC 11801 Overview | Data Cabling Module 6.1 | Elec-Mate',
    'The three parallel generic-cabling standards families — ANSI/TIA-568 (.0-E, .1-E, .2-E, .3-E), ISO/IEC 11801 (-1 through -6), and BS EN 50173 — plus TIA-569-E (pathways/spaces), TIA-606-D (administration), TIA-607-E (bonding), TIA-942-C (data centres), and ANSI/TIA-1152-A (test parameters). How they align, where BS 7671:2018+A4:2026 §444.410 fits, and why the UK is a BS EN 50173 / 50174 / 50310 jurisdiction from 15 April 2026.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 1"
            title="TIA/EIA 568 and ISO/IEC 11801 Overview"
            description="The three parallel generic-cabling standards families — ANSI/TIA-568 series, ISO/IEC 11801 series, and BS EN 50173 series — plus the supporting TIA documents (-569-E pathways, -606-D administration, -607-E bonding, -942-C data centres, -1152-A test parameters). How they align, where they diverge, and why BS 7671:2018+A4:2026 §444.410 makes the UK a BS EN 50173 / 50174 / 50310 jurisdiction from 15 April 2026."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three parallel generic-cabling families exist: ANSI/TIA-568 (North America), ISO/IEC 11801 (international), BS EN 50173 (Europe / UK harmonised). They share the same six-zone topology and the same channel model — differences are mostly terminology and small numerical tolerances.',
              'BS 7671:2018+A4:2026 §444.410 names BS EN 50174-1, BS EN 50174-2 and BS EN 50310 as the standards that "shall be applied" for control / signalling / communication circuits inside UK buildings — making the EN series regulatorily mandatory from 15 April 2026.',
              'TIA-568 is on Revision E (TIA-568.0-E generic, .1-E commercial, .2-E balanced TP, .3-E optical fibre). Older drawings citing 568-D, 568-C or 568-B are obsolete reference material. The supporting TIA family covers spaces (-569-E + Addendum 1, 2022), administration (-606-D), bonding (-607-E), data centres (-942-C) and test instruments (-1152-A).',
              'ISO/IEC 11801 is multi-part: -1 general, -2 offices, -3 industrial, -4 residential, -5 data centres, -6 distributed buildings. BS EN 50173 mirrors this part-for-part. The 90 m permanent link / 100 m channel rule is identical across all three families.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Name the three parallel generic-cabling families (ANSI/TIA-568, ISO/IEC 11801, BS EN 50173) and explain that they are aligned, not competing',
              'List the four current parts of the ANSI/TIA-568 Revision-E series (.0-E generic, .1-E commercial, .2-E balanced TP, .3-E optical fibre) and identify which part answers which question',
              'List the multi-part structure of ISO/IEC 11801 / BS EN 50173 (-1 through -6) and pick the right part for offices, industrial, residential, data centres and distributed buildings',
              'Quote BS 7671:2018+A4:2026 §444.410 verbatim and explain why it makes BS EN 50174-1, BS EN 50174-2 and BS EN 50310 mandatory inside UK buildings from 15 April 2026',
              'Identify the supporting TIA standards: ANSI/TIA-569-E + Addendum 1 (2022) for pathways and spaces (18-27 °C / 8-60 % RH for a TR); -606-D (2021) for administration; -607-E (2024) for bonding & earthing; -942-C (2024) for data centres; -1152-A (2016) for test instruments',
              'Distinguish "permanent link" (≤ 90 m, contractor-installed, solid conductor) from "channel" (≤ 100 m, includes cords, what the active equipment sees) — and confirm the model is identical across the three families',
              'Place BS 6701 (UK customer-premises telecoms wiring) in the landscape alongside the EN cabling-performance / installation / bonding documents',
              'Explain why TIA-568-D is obsolete reference material in 2026 and Revision E is current — and why TR environmental envelope is 18-27 °C / 8-60 % RH (TIA-569-E + Addendum 1, 2022), not the older 18-24 °C / 40-55 %',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The three parallel families</ContentEyebrow>

          <ConceptBlock
            title="ANSI/TIA, ISO/IEC and BS EN — three regional expressions of the same generic cabling architecture"
            plainEnglish={`Generic structured cabling has three parallel standards families. ANSI/TIA-568 is the North-American national standard. ISO/IEC 11801 is the international standard, jointly developed by ISO and IEC. BS EN 50173 is the European harmonised standard, developed by CENELEC and adopted in the UK as a BS EN. They all describe the same six-zone topology, the same channel/permanent-link model, the same Classes/Categories — at a granularity that any well-designed install commonly satisfies all three at once. The differences are regional terminology, jurisdictional pedigree, and small numerical tolerances at the margins.`}
            onSite="When a tender specifies 'compliance with TIA-568, ISO/IEC 11801 and BS EN 50173', they are not asking for three separate cable plants — they are asking for ONE cable plant that satisfies all three certifications. A UK Class EA / Cat 6A install built to BS EN 50174-2 will pass TIA-568.2-E and ISO/IEC 11801-2 testing without modification. The trick is to know which document answers which auditor's question."
          >
            <p>The three families and what each one is:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>ANSI/TIA-568 (North American national).</strong> Published by the
                Telecommunications Industry Association, currently on Revision E. A series of four
                parts: .0-E (generic premises), .1-E (commercial buildings), .2-E (balanced
                twisted-pair, 2024), .3-E (optical fibre). Supported by a wider TIA family —
                pathways/spaces (-569-E), administration (-606-D), bonding (-607-E), data centres
                (-942-C), test instruments (-1152-A).
              </li>
              <li>
                <strong>ISO/IEC 11801 (international).</strong> Joint ISO/IEC standard, multi-part:
                -1 general, -2 offices, -3 industrial, -4 single-tenant homes, -5 data centres, -6
                distributed building services. Defines Classes (D, E, EA, F, FA, I, II) for channel
                performance. The international reference for any project that crosses jurisdictions.
              </li>
              <li>
                <strong>BS EN 50173 (European / UK harmonised).</strong> CENELEC harmonised
                standard, transposed in the UK as BS EN. Mirrors ISO/IEC 11801 part-for-part: -1
                general, -2 offices, -3 industrial, -4 residential, -5 data centres, -6 distributed
                buildings. THIS is the document the UK regulatory layer (BS 7671 §716 and §444.410)
                reaches for.
              </li>
            </ul>
            <p>
              The UK status is unambiguous. BS 7671:2018+A4:2026 §444.410 verbatim names BS EN
              50174-1, BS EN 50174-2 and BS EN 50310 as the standards that {`"`}shall be applied
              {`"`} for control / signalling / communication circuits inside buildings — making
              those three EN documents regulatorily mandatory. §716.2(a) names BS EN 50173-1
              normatively. TIA-568 and ISO/IEC 11801 remain valid international references — and are
              usually called up in multi-region procurement — but the UK regulatory pointer is to
              the EN series.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.410 (Inside buildings — verbatim)"
            clause={
              <>
                Within a building, the requirements and recommendations of the following standards
                shall be applied for control, signalling and communication circuits: (a) BS EN
                50174-1: Information technology — Cabling installation: Installation specification
                and quality assurance; (b) BS EN 50174-2: Information technology — Cabling
                installation: Installation planning and practices inside buildings; (c) BS EN 50310:
                Telecommunications bonding networks for buildings and other structures.
              </>
            }
            meaning="This single clause is the reason the UK is a BS EN 50173 / 50174 / 50310 jurisdiction in regulatory terms. The wording is 'shall be applied' — these are not 'good-practice' references in BS 7671:2018+A4:2026; they are mandatory references for any control, signalling or communication circuit inside a UK building. From 15 April 2026, ignoring BS EN 50174-1, BS EN 50174-2 or BS EN 50310 is non-compliance with BS 7671 itself, not just with EN guidance."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The TIA family — Revision E and the supporting documents</ContentEyebrow>

          <ConceptBlock
            title="ANSI/TIA-568 Revision E — four parts that share a common spine"
            plainEnglish="The ANSI/TIA-568 series is on Revision E. There are four current parts — a generic / common-requirements umbrella, a commercial-buildings integration document, a balanced twisted-pair components part, and an optical-fibre components part. Older revisions (D, C, B) appear in legacy drawings but should not be quoted as the current spec."
            onSite="When you read a TIA-568 specification, you are reading FOUR documents stacked: the generic .0-E + the application-specific (.1-E commercial / .4 residential / TIA-942-C data centre) + the components part (.2-E copper or .3-E fibre). A 'Cat 6A install per TIA-568' is a Cat 6A install per TIA-568.0-E + TIA-568.1-E + TIA-568.2-E. Knowing which sub-document holds which requirement saves hours of arguing with a specifier."
          >
            <p>The four current TIA-568 parts:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>
                  ANSI/TIA-568.0-E (2020) — Generic Telecommunications Cabling for Customer
                  Premises.
                </strong>{' '}
                The umbrella. Common requirements applicable across commercial / data-centre /
                residential / industrial sub-standards. Defines the six-zone topology, the 90 m /
                100 m / 10 m channel model, and shared performance language.
              </li>
              <li>
                <strong>
                  ANSI/TIA-568.1-E — Commercial Building Telecommunications Cabling Standard.
                </strong>{' '}
                The commercial-buildings integration document. Pulls together .0-E + .2-E + .3-E for
                an office or commercial fit-out. Specifies outlet density, pathway capacity, room
                placement.
              </li>
              <li>
                <strong>
                  ANSI/TIA-568.2-E (2024) — Balanced Twisted-Pair Telecommunications Cabling and
                  Components Standard.
                </strong>{' '}
                The copper components part. Defines Cat 5e, 6, 6A and 8 transmission performance —
                channel and permanent-link insertion loss, NEXT, PSNEXT, ACR-F, return loss,
                propagation delay, delay skew. Replaces 568.2-D (2018).
              </li>
              <li>
                <strong>ANSI/TIA-568.3-E — Optical Fiber Cabling and Components Standard.</strong>{' '}
                The fibre components part. Defines OM1 through OM5 multimode and OS1a / OS2
                single-mode performance, connector types (LC, SC, ST, MTP/MPO), and the
                permanent-link / channel models for fibre.
              </li>
            </ul>
            <p>The wider TIA family — sibling documents that complete the picture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>ANSI/TIA-569-E (2019) + Addendum 1 (2022).</strong> Telecommunications
                Pathways and Spaces. Defines the TR (Telecommunications Room), ER (Equipment Room),
                EF (Entrance Facility), pathway types, environmental envelope. Addendum 1 (2022)
                updated TR conditions to <strong>18-27 °C / 8-60 % RH non-condensing</strong> — do
                not quote the older 18-24 °C / 40-55 % numbers.
              </li>
              <li>
                <strong>ANSI/TIA-606-D (2021).</strong> Administration Standard for
                Telecommunications Infrastructure. Labelling, identifiers, records — covered in full
                in Section 4 of this module.
              </li>
              <li>
                <strong>ANSI/TIA-607-E (2024).</strong> Generic Telecommunications Bonding and
                Grounding (Earthing) for Customer Premises. Defines the Telecommunications Bonding
                Backbone (TBB), Telecommunications Grounding Busbar (TGB), Telecommunications Main
                Grounding Busbar (TMGB), and Bonding Conductor for Telecommunications (BCT).
              </li>
              <li>
                <strong>ANSI/TIA-942-C (2024).</strong> Telecommunications Infrastructure Standard
                for Data Centers. Defines four redundancy classes — Rated 1 (basic), Rated 2
                (redundant components), Rated 3 (concurrently maintainable), Rated 4 (fault
                tolerant). Note: TIA uses {`"`}Rated{`"`}; the Uptime Institute uses {`"`}Tier
                {`"`}; they are related but not identical.
              </li>
              <li>
                <strong>ANSI/TIA-1152-A (2016).</strong> Requirements for Field Test Instruments and
                Measurements for Balanced Twisted-Pair Cabling. Defines instrument accuracy Levels
                III / IIIe / IV / V (V is the current top accuracy). A {`"`}Class EA pass
                {`"`} certificate must come from an instrument that meets the relevant level.
              </li>
              <li>
                <strong>ANSI/TIA TSB-184-A (2017).</strong> Guidelines for Supporting Power Delivery
                Over Balanced Twisted-Pair Cabling. Bundle thermal management, de-rating tables, DC
                resistance unbalance limits — directly relevant to PoE under BS 7671 §716.
              </li>
            </ul>
          </ConceptBlock>

          {/* Three parallel families — TIA / ISO / EN map */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The three parallel families — ANSI/TIA · ISO/IEC · BS EN cross-reference map
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="A three-column cross-reference map of the parallel generic-cabling standards families. The left column shows the ANSI/TIA series — TIA-568.0-E generic, TIA-568.1-E commercial, TIA-568.2-E balanced twisted-pair, TIA-568.3-E optical fibre, TIA-942-C data centres, TIA-606-D administration, TIA-607-E bonding. The centre column shows the ISO/IEC 11801 multi-part series — 11801-1 general, 11801-2 offices, 11801-5 data centres, plus ISO/IEC 14763-2 installation planning. The right column shows the BS EN 50173 multi-part series — 50173-1 general, 50173-2 offices, 50173-5 data centres, BS EN 50174-1 and -2 installation, BS EN 50310 bonding. Horizontal dashed connector lines join broadly equivalent documents across the three columns. A bottom panel notes that BS 7671 444.410 names the EN documents as mandatory for UK installs."
            >
              {/* Column header band */}
              <rect
                x="30"
                y="20"
                width="840"
                height="44"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              {/* Three column headers — clear of any rows */}
              <rect
                x="50"
                y="30"
                width="240"
                height="24"
                rx="5"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="170"
                y="47"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                ANSI/TIA · NORTH AMERICA
              </text>

              <rect
                x="330"
                y="30"
                width="240"
                height="24"
                rx="5"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="47"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                ISO/IEC · INTERNATIONAL
              </text>

              <rect
                x="610"
                y="30"
                width="240"
                height="24"
                rx="5"
                fill="rgba(234,179,8,0.20)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="730"
                y="47"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                BS EN · UK / EUROPE
              </text>

              {/* ============ ROW 1 ============ y centre = 100, box y = 80, h=44, connector zone 124-138 */}
              <rect
                x="50"
                y="80"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="100"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TIA-568.0-E (2020)
              </text>
              <text
                x="170"
                y="116"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Generic — common requirements
              </text>

              <rect
                x="330"
                y="80"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="450"
                y="100"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ISO/IEC 11801-1:2017+A1
              </text>
              <text
                x="450"
                y="116"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                General requirements
              </text>

              <rect
                x="610"
                y="80"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.12)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text
                x="730"
                y="100"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS EN 50173-1:2018+A1
              </text>
              <text
                x="730"
                y="116"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                General requirements
              </text>

              {/* Equivalence connectors row 1 — clear horizontal zone 124-138 (no labels) */}
              <line
                x1="290"
                y1="102"
                x2="330"
                y2="102"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="102"
                x2="610"
                y2="102"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ============ ROW 2 ============ y = 148 */}
              <rect
                x="50"
                y="148"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="168"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TIA-568.1-E
              </text>
              <text
                x="170"
                y="184"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Commercial buildings
              </text>

              <rect
                x="330"
                y="148"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="450"
                y="168"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ISO/IEC 11801-2
              </text>
              <text
                x="450"
                y="184"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                Office premises
              </text>

              <rect
                x="610"
                y="148"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.12)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text
                x="730"
                y="168"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS EN 50173-2
              </text>
              <text
                x="730"
                y="184"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                Office premises
              </text>

              <line
                x1="290"
                y1="170"
                x2="330"
                y2="170"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="170"
                x2="610"
                y2="170"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ============ ROW 3 ============ y = 216 */}
              <rect
                x="50"
                y="216"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="236"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TIA-568.2-E (2024)
              </text>
              <text
                x="170"
                y="252"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Balanced TP — Cat 5e/6/6A/8
              </text>

              <rect
                x="330"
                y="216"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="450"
                y="236"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                (within 11801-1)
              </text>
              <text
                x="450"
                y="252"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                Components in general part
              </text>

              <rect
                x="610"
                y="216"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.08)"
                stroke="#EAB308"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="730"
                y="236"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                (within 50173-1)
              </text>
              <text
                x="730"
                y="252"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                Components in general part
              </text>

              <line
                x1="290"
                y1="238"
                x2="330"
                y2="238"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="238"
                x2="610"
                y2="238"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ============ ROW 4 ============ y = 284 */}
              <rect
                x="50"
                y="284"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="304"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TIA-942-C (2024)
              </text>
              <text
                x="170"
                y="320"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Data centres · Rated 1-4
              </text>

              <rect
                x="330"
                y="284"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="450"
                y="304"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ISO/IEC 11801-5
              </text>
              <text
                x="450"
                y="320"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                Data centres
              </text>

              <rect
                x="610"
                y="284"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.12)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text
                x="730"
                y="304"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS EN 50173-5 + 50600
              </text>
              <text
                x="730"
                y="320"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                Data centres
              </text>

              <line
                x1="290"
                y1="306"
                x2="330"
                y2="306"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="306"
                x2="610"
                y2="306"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ============ ROW 5 ============ y = 352 — install practice */}
              <rect
                x="50"
                y="352"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="372"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                (in 568 series)
              </text>
              <text
                x="170"
                y="388"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Install practice scattered
              </text>

              <rect
                x="330"
                y="352"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="450"
                y="372"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                ISO/IEC 14763-2:2019
              </text>
              <text
                x="450"
                y="388"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                Planning &amp; installation
              </text>

              <rect
                x="610"
                y="352"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="730"
                y="372"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS EN 50174-1 / -2 / -3
              </text>
              <text
                x="730"
                y="388"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                Install practice (★ §444.410)
              </text>

              <line
                x1="290"
                y1="374"
                x2="330"
                y2="374"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="374"
                x2="610"
                y2="374"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ============ ROW 6 ============ y = 420 — administration */}
              <rect
                x="50"
                y="420"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="440"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TIA-606-D (2021)
              </text>
              <text
                x="170"
                y="456"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Administration · labelling
              </text>

              <rect
                x="330"
                y="420"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="450"
                y="440"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                (in 14763-2)
              </text>
              <text
                x="450"
                y="456"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                Administration clauses
              </text>

              <rect
                x="610"
                y="420"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.12)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text
                x="730"
                y="440"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS EN 50174-1 §6
              </text>
              <text
                x="730"
                y="456"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                Administration · labelling
              </text>

              <line
                x1="290"
                y1="442"
                x2="330"
                y2="442"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="442"
                x2="610"
                y2="442"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ============ ROW 7 ============ y = 488 — bonding */}
              <rect
                x="50"
                y="488"
                width="240"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="170"
                y="508"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TIA-607-E (2024)
              </text>
              <text
                x="170"
                y="524"
                textAnchor="middle"
                fill="#F3E8FF"
                fontSize="10"
                fontFamily="system-ui"
              >
                Bonding · TBB / TGB / TMGB
              </text>

              <rect
                x="330"
                y="488"
                width="240"
                height="44"
                rx="6"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
              <text
                x="450"
                y="508"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                (in 14763-2)
              </text>
              <text
                x="450"
                y="524"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                Bonding clauses
              </text>

              <rect
                x="610"
                y="488"
                width="240"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="730"
                y="508"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS EN 50310
              </text>
              <text
                x="730"
                y="524"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                ICT bonding (★ §444.410)
              </text>

              <line
                x1="290"
                y1="510"
                x2="330"
                y2="510"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <line
                x1="570"
                y1="510"
                x2="610"
                y2="510"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* ===== Legend panel ===== */}
              <rect
                x="30"
                y="560"
                width="840"
                height="140"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="50"
                y="584"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Legend column 1 */}
              <rect
                x="50"
                y="598"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="74" y="610" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                ANSI/TIA — North American national
              </text>

              <rect
                x="50"
                y="620"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="74" y="632" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                ISO/IEC — international (ISO + IEC joint)
              </text>

              <rect
                x="50"
                y="642"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text x="74" y="654" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                BS EN — UK / European harmonised (CENELEC)
              </text>

              {/* Legend column 2 */}
              <line
                x1="460"
                y1="605"
                x2="486"
                y2="605"
                stroke="#9CA3AF"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
              <text x="494" y="610" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Equivalence connector — broadly aligned
              </text>

              <rect
                x="460"
                y="620"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text x="494" y="632" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                ★ Mandatory inside UK buildings — BS 7671 §444.410
              </text>

              <text x="494" y="654" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Dashed boxes = topic covered within umbrella part
              </text>

              {/* Footer divider + caption */}
              <line
                x1="50"
                y1="672"
                x2="850"
                y2="672"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="690"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Same six-zone topology · same 90 m / 100 m channel · broadly equivalent
                Classes/Categories
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

          <ContentEyebrow>The ISO/IEC and EN families — the multi-part structure</ContentEyebrow>

          <ConceptBlock
            title="ISO/IEC 11801 and BS EN 50173 — six parts, one for each occupancy type"
            plainEnglish="ISO/IEC 11801 and BS EN 50173 are multi-part series. Part 1 gives general requirements; subsequent parts cover specific occupancies — offices, industrial, residential, data centres, distributed buildings. The split lets a designer pick the right Class targets, outlet densities and pathway capacities for the actual building type, rather than applying one set of figures everywhere."
            onSite="On a UK office fit-out, the live documents are BS EN 50173-1 (general) + BS EN 50173-2 (offices) — together. On a UK data centre, BS EN 50173-1 + BS EN 50173-5 (data centres). On industrial, -1 + -3. The ISO/IEC 11801 family is the international mirror. Both replaced the older single-document 11801:2002 — drawings citing that edition are out of date but harmless as historical reference."
          >
            <p>The current multi-part ISO/IEC 11801 / BS EN 50173 structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Part 1 — General requirements.</strong> ISO/IEC 11801-1:2017+A1:2021 / BS EN
                50173-1:2018+A1:2020. Defines the six-zone topology, the channel model (90 m
                permanent link + 10 m cords = 100 m channel), the Classes (D, E, EA, F, FA, I, II),
                the connector and cable types in scope. The umbrella that the other parts inherit
                from. NOTE: BS 7671 §716.2(a) names BS EN 50173-1 normatively.
              </li>
              <li>
                <strong>Part 2 — Office premises.</strong> Outlet density (typically 2 outlets per
                10 m² work area), pathway capacity, building distributor / floor distributor
                placement. The standard a typical UK office is designed against.
              </li>
              <li>
                <strong>Part 3 — Industrial premises.</strong> Tougher MICE classification
                (Mechanical, Ingress, Climatic, Electromagnetic — the environmental rating system
                for industrial cabling). Higher outlet protection, sealed connectors, ruggedised
                cable jackets.
              </li>
              <li>
                <strong>Part 4 — Single-tenant homes / residential.</strong> Outlet density and
                topology for residential / SOHO. UK residential work additionally falls under BS
                6701 for the carrier-side wiring.
              </li>
              <li>
                <strong>Part 5 — Data centres.</strong> Computer-room cabling, main / horizontal /
                equipment / zone distribution areas, the data-centre-specific topology. Sits
                alongside BS EN 50600 (general data-centre infrastructure) and the international
                ANSI/TIA-942-C reference.
              </li>
              <li>
                <strong>Part 6 — Distributed building services.</strong> Cabling for distributed
                building services — building automation, access control, IoT. Aligns with the
                {`"`}smart building{`"`} specs that increasingly drive PoE++ deployments.
              </li>
            </ul>
            <p>
              Two related ISO/IEC documents come up frequently and BS 7671 references them directly
              — <strong>ISO/IEC 14763-2:2019</strong> (planning and installation, referenced in
              §716.523.1.101 NOTE 2) and <strong>ISO/IEC TS 29125:2017</strong> (telecommunications
              cabling requirements for remote powering — i.e. PoE — also referenced in
              §716.523.1.101 NOTE 2). Together with BS EN 50174-2 they give the install-practice
              envelope for PoE bundles.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.2 (Normative references — verbatim, extract)"
            clause={
              <>
                The following documents are referred to in the text in such a way that some or all
                of their content constitutes requirements of this document. For dated references,
                only the edition cited applies. For undated references, the latest edition of the
                referenced document (including any amendments) applies. (a) BS EN 50173-1,
                Information technology — Generic cabling for customer premises — Part 1: General
                requirements. (b) BS EN 60512-99-001, Connectors for electronic equipment — Tests
                and measurements — Part 99-001: Test schedule for engaging and separating connectors
                under electrical load — Test 99a: Connectors used in twisted pair communication
                cabling with remote power. (c) BS EN 60512-9-3, Connectors for electronic equipment
                — Tests and measurements — Part 9-3: Endurance tests — Test 9c: Mechanical operation
                (engaging/separating) with electrical load.
              </>
            }
            meaning="§716.2(a) elevates BS EN 50173-1 from 'reference' to 'normative reference' inside BS 7671 itself. Combined with §444.410, this means every PoE / ELV DC over balanced cabling job in the UK from 15 April 2026 is regulated by BS 7671 against the BS EN 50173 / 50174 / 50310 standards. There is no daylight between BS 7671 and the EN cabling standards on this — ignoring one is ignoring the other."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <AmendmentBadge regs={['716', '444']} edition="A4:2026" />

          <SectionRule />

          <ContentEyebrow>Standards cross-reference</ContentEyebrow>

          <AppendixTable
            caption="TIA / ISO / EN cross-reference for the major generic-cabling questions"
            source="2026 — A4 alignment"
            headers={['Question', 'ANSI/TIA', 'ISO/IEC', 'BS EN']}
            rows={[
              [
                'Generic premises cabling — common requirements',
                'TIA-568.0-E (2020)',
                'ISO/IEC 11801-1:2017+A1:2021',
                'BS EN 50173-1:2018+A1:2020',
              ],
              ['Commercial buildings — offices', 'TIA-568.1-E', 'ISO/IEC 11801-2', 'BS EN 50173-2'],
              ['Industrial premises', '— (no direct equiv.)', 'ISO/IEC 11801-3', 'BS EN 50173-3'],
              [
                'Residential / single-tenant homes',
                'TIA-568.4',
                'ISO/IEC 11801-4',
                'BS EN 50173-4',
              ],
              [
                'Data centres',
                'TIA-942-C (2024)',
                'ISO/IEC 11801-5',
                'BS EN 50173-5 + BS EN 50600',
              ],
              [
                'Distributed building services',
                '— (TSBs only)',
                'ISO/IEC 11801-6',
                'BS EN 50173-6',
              ],
              [
                'Balanced twisted-pair components',
                'TIA-568.2-E (2024)',
                '(within 11801-1)',
                '(within 50173-1)',
              ],
              ['Optical fibre components', 'TIA-568.3-E', '(within 11801-1)', '(within 50173-1)'],
              [
                'Pathways and spaces (TR/ER/EF)',
                'TIA-569-E + Add.1 (2022)',
                '— (in 14763-2)',
                'BS EN 50174-2 §6',
              ],
              [
                'Administration / labelling',
                'TIA-606-D (2021)',
                '— (in 14763-2)',
                'BS EN 50174-1 §6',
              ],
              ['Bonding and earthing', 'TIA-607-E (2024)', '— (in 14763-2)', 'BS EN 50310'],
              [
                'Installation planning & practices',
                '— (in 568 series)',
                'ISO/IEC 14763-2:2019',
                'BS EN 50174-1 / -2 / -3',
              ],
              ['Field test instruments', 'TIA-1152-A (2016)', '— (in 14763-3)', 'BS EN 50346'],
              [
                'PoE remote powering install practice',
                'TIA TSB-184-A (2017)',
                'ISO/IEC TS 29125:2017',
                'CLC/TR 50174-99-1:2015',
              ],
              [
                'UK customer-premises telecoms wiring',
                '— (US-only equiv. NEC)',
                '—',
                'BS 6701:2016+A1:2017',
              ],
              [
                'LV/ELV electrical safety + PoE regulation',
                '— (US-only equiv. NEC)',
                '—',
                'BS 7671:2018+A4:2026',
              ],
            ]}
            notes="The UK regulatory layer (BS 7671:2018+A4:2026 §444.410, §716.2) names BS EN 50174-1, BS EN 50174-2, BS EN 50310 and BS EN 50173-1 specifically. TIA documents in the leftmost column remain valid international reference for multi-region projects but are not the UK regulatory pointer. The 90 m permanent link / 100 m channel rule is identical across all three families."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where the supporting standards fit</ContentEyebrow>

          <ConceptBlock
            title="TIA-569-E pathways and spaces — and why the TR envelope changed in 2022"
            plainEnglish={`ANSI/TIA-569-E (2019) defines the rooms and pathways that hold the cabling system — Telecommunications Room, Equipment Room, Entrance Facility, plus all the trays / conduits / risers between them. Addendum 1 was published in 2022 and updated the TR environmental envelope to align with ASHRAE Class A1: 18-27 °C and 8-60 % RH non-condensing. The older 18-24 °C / 40-55 % numbers from the pre-2022 edition are out of date.`}
            onSite="When a client says 'design us a comms room', TIA-569-E is the brief — minimum 3 m × 3.4 m floor area for a small TR, 18-27 °C continuous, 8-60 % RH non-condensing, redundant power feeds where availability requires, fire-stopped at every floor / wall penetration, cable entries above (overhead tray) or below (raised floor). The older narrow envelope is over-specifying — it pushes cooling cost into the build for no operational benefit."
          >
            <p>The TIA-569-E + Addendum 1 (2022) envelope at a glance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Temperature:</strong> 18-27 °C continuous (Class A1 ASHRAE-aligned). NOT
                18-24 °C — that figure is pre-2022.
              </li>
              <li>
                <strong>Relative humidity:</strong> 8-60 % RH non-condensing. NOT 40-55 % — also
                pre-2022.
              </li>
              <li>
                <strong>Floor loading:</strong> minimum 12 kPa (250 lbs/ft²) recommended; sized to
                equipment loading. Sourced from TIA-569-E (NOT TIA-942 — that is data-centre
                specific).
              </li>
              <li>
                <strong>Power:</strong> redundant feeds where availability requires; UPS for the
                actives.
              </li>
              <li>
                <strong>Cable entries:</strong> from above (overhead tray) or below (raised floor).
                Fire-stopped at every floor / wall penetration per Approved Document B.
              </li>
              <li>
                <strong>Sizing:</strong> minimum 3 m × 3.4 m (10 × 11 ft) for a small TR; scale with
                port count.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why the standards landscape feels layered — because it IS layered"
            plainEnglish="The reason a single cabling job ends up referencing five or six standards is that no single document tries to do everything. Performance, installation, bonding, administration, electrical safety and customer-premises wiring are each in scope of a different document. The contractor's competence is in knowing which document answers which question — and which one the auditor will reach for."
            onSite="An inspector arrives with a clipboard. 'Is the channel testing per the right Class?' — BS EN 50173 for the Class definition; BS EN 50346 (or TIA-1152-A) for the test parameters; BS EN 50174-1 for the QA. 'Is the bonding right?' — BS EN 50310 with BS 7671 §444 / §545. 'Is the labelling right?' — BS EN 50174-1 §6 or TIA-606-D. 'Is the electrical safety right?' — BS 7671 §716 / §545 / §444 / §528. Different question, different document. Knowing which to open is the job."
          >
            <p>The five-layer model for any UK structured cabling job from 15 April 2026:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Layer 1 — Performance.</strong> What Class does the channel measure to? BS
                EN 50173 series (with ISO/IEC 11801 / TIA-568 as international cross-reference).
              </li>
              <li>
                <strong>Layer 2 — Installation practice.</strong> How is it installed? BS EN 50174
                series (-1 specification &amp; QA, -2 inside buildings, -3 outside buildings).
                Mandatory under BS 7671 §444.410.
              </li>
              <li>
                <strong>Layer 3 — Bonding and earthing.</strong> How is it bonded for ICT? BS EN
                50310. Mandatory under BS 7671 §444.410 and coupled to BS 7671 §545 (functional
                earthing) and §444 (EMC / segregation).
              </li>
              <li>
                <strong>Layer 4 — Administration.</strong> How is it labelled and recorded? BS EN
                50174-1 §6 (or TIA-606-D as international equivalent).
              </li>
              <li>
                <strong>Layer 5 — UK electrical safety.</strong> How does it interact with BS 7671?
                §444 (EMC), §528 (proximity), §716 (PoE, NEW in A4:2026), §545 (ICT functional
                earthing, NEW in A4:2026), §521.10.202 (escape routes), §544.1.2 (main bonding),
                §411.7 (FELV).
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Quoting a withdrawn TIA revision (B, C, or D) as the current spec"
            whatHappens={
              <>
                A specifier copies a clause from a 2014 design package and lands on {`"`}compliant
                with ANSI/TIA-568-C{`"`}. Twelve years later, that revision has been superseded
                twice (D in 2018, E in 2020). The drawings circulate; the contractor procures to the
                old channel limits and the older bend-radius / bundle figures; testing is done to
                the older instrument-accuracy expectation. Months later, an audit catches the
                discrepancy and the install has to be re-evaluated against the current spec.
              </>
            }
            doInstead={
              <>
                Always cite the specific Revision-E part number (e.g. {`"`}ANSI/TIA-568.2-E (2024)
                {`"`}). Never cite {`"`}TIA-568{`"`} generically — that is ambiguous across decades.
                On the EN side, cite the dated edition (e.g. {`"`}BS EN 50173-1:2018+A1:2020
                {`"`}). On A4:2026 jobs, cite {`"`}BS 7671:2018+A4:2026, published 15 April 2026
                {`"`} — not just {`"`}BS 7671{`"`} or {`"`}the 18th Edition{`"`}, which lose the
                amendment context.
              </>
            }
          />

          <Scenario
            title="A multi-region client asks for 'TIA, ISO and EN compliance' on the same building"
            situation={
              <>
                A US-headquartered tenant is fitting out a London office and the procurement
                document specifies {`"`}compliance with ANSI/TIA-568, ISO/IEC 11801, and BS EN 50173
                {`"`}. The UK installer suspects this is over-specification but does not want to
                lose the bid by pushing back without grounds.
              </>
            }
            whatToDo={
              <>
                Map the three families in the response: ANSI/TIA-568.0-E + .1-E + .2-E for the
                North-American national reference; ISO/IEC 11801-1 + 11801-2 for the international
                reference; BS EN 50173-1 + 50173-2 for the UK regulatory pointer. Confirm that ONE
                Class EA / Cat 6A install built to BS EN 50174-2 will satisfy all three
                certifications without modification — same six-zone topology, same 90 m / 100 m
                channel, same Class targets at the relevant frequency. Add the wider TIA family
                where they apply: TIA-569-E + Addendum 1 (2022) for the TR (which is also BS EN
                50174-2 §6); TIA-606-D (2021) for administration (also BS EN 50174-1 §6); TIA-607-E
                (2024) for bonding (also BS EN 50310 — and BS 7671 §444.410 makes that EN document
                mandatory in any case).
              </>
            }
            whyItMatters={
              <>
                The procurement language sounds maximalist but in practice each family is a regional
                expression of the same architecture. Pushing back without context loses the bid;
                agreeing without analysis loses the margin. The right answer is {`"`}yes — here is
                one install that satisfies all three{`"`} with the cross-reference table to back it
                up. That is professional competence and it is the framing every Module 6
                conversation starts from.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Three parallel families: ANSI/TIA-568 (North America), ISO/IEC 11801 (international), BS EN 50173 (Europe / UK harmonised). Same six-zone topology, same channel model, broadly aligned Classes/Categories.',
              'BS 7671:2018+A4:2026 §444.410 (verbatim) names BS EN 50174-1, BS EN 50174-2 and BS EN 50310 as standards that "shall be applied" inside UK buildings — making them regulatorily mandatory from 15 April 2026.',
              'TIA-568 is on Revision E: .0-E generic (2020), .1-E commercial, .2-E balanced TP (2024), .3-E optical fibre. Older B/C/D revisions are obsolete reference material.',
              'ISO/IEC 11801 and BS EN 50173 are multi-part: -1 general, -2 offices, -3 industrial, -4 residential, -5 data centres, -6 distributed buildings. Pick parts -1 + the application-specific part for any given job.',
              'TR environmental envelope: 18-27 °C / 8-60 % RH non-condensing per TIA-569-E + Addendum 1 (2022) — NOT the older 18-24 °C / 40-55 % figures.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 6
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Class D, E, EA, F (and FA, I, II) Standards
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule6Section1;
