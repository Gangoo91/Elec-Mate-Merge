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
    id: 'datacabling-m6s3-50173-parts',
    question:
      'A specifier writes "comply with BS EN 50173 and BS EN 50174". Which combination of parts must a UK office fit-out actually satisfy?',
    options: [
      'BS EN 50173-1 + -2 (performance) and BS EN 50174-1 + -2 (installation), plus BS EN 50310 (ICT bonding).',
      'BS EN 50173-1 alone — the application parts are advisory only on a UK office fit-out.',
      'BS EN 50174-3 alone — the outside-buildings part is the general installation standard.',
      'BS EN 50173-5 (data centres) plus BS EN 50174-3 — the office-grade parts do not apply.',
    ],
    correctIndex: 0,
    explanation:
      'BS EN 50173-1 is the umbrella performance standard and BS EN 50173-2 is the office-specific application part — both apply to a UK office. BS EN 50174-1 (QA, documentation) and BS EN 50174-2 (planning, pulling, separation, supports) apply on every install inside a building. BS EN 50310 (ICT bonding) is implicit because BS 7671 §444.410 makes it mandatory. -174-3 (outside buildings) only applies if the cabling crosses property boundaries or is buried externally. -173-5 (data centres) only applies to actual data-centre work.',
  },
  {
    id: 'datacabling-m6s3-2m-mesh',
    question:
      'BS 7671:2018+A4:2026 §444.1.3 sets a maximum mesh size for the common meshed bonding star network used for protection of high-density communicating equipment. What is the maximum mesh size verbatim from the regulation?',
    options: [
      '1 m × 1 m maximum mesh size in EMI-susceptible areas.',
      '3 m × 3 m maximum, scaled to the size of the comms room.',
      '2 m × 2 m maximum where susceptible equipment is installed.',
      '5 m × 5 m maximum, matching the typical comms-room footprint.',
    ],
    correctIndex: 2,
    explanation:
      '§444.1.3 verbatim — "should not exceed 2 m × 2 m in areas where equipment susceptible to electromagnetic environmental interferences is installed". This is the meshed equipotential bonding network for ICT-dense installations: PABX, centralised data processing, comms rooms with susceptible equipment. Above the 2 m × 2 m mesh size, common-mode currents have too much loop area to remain bounded.',
  },
  {
    id: 'datacabling-m6s3-separate-buildings',
    question:
      'A campus has three separate buildings, each with its own equipotential bonding system. What does BS 7671:2018+A4:2026 §444.4.9 say about signal and data transmission between them?',
    options: [
      'Armoured copper data cable is preferred — the armour screens out earth-potential differences.',
      'A single bonding conductor must link all buildings before any data cable is pulled.',
      'Either copper or fibre is acceptable, provided each building is independently earthed.',
      'Metal-free optical fibre (or other non-conducting systems) is preferred for the data transmission.',
    ],
    correctIndex: 3,
    explanation:
      '§444.4.9 verbatim states that metal-free optical fibre or other non-conducting systems are preferred for inter-building data transmission when buildings have separate equipotential bonding. The reason: copper between buildings creates a low-impedance path between two earthing systems that may be at different potentials, allowing earth-fault currents (or lightning-induced surges) to flow through the data cable. Metal-free fibre — no conducting elements at all — gives complete galvanic isolation. Microwave / RF transformer isolation is an alternative for short reaches.',
  },
  {
    id: 'datacabling-m6s3-545-funcearth',
    question:
      'BS 7671:2018+A4:2026 §545 (NEW IN A4:2026) introduces functional earthing of ICT equipment. Per §545.1.2, what is the minimum cross-sectional area of a functional earthing or functional bonding conductor in COPPER, with mechanical protection?',
    options: [
      '1.5 mm² copper with mechanical protection; 2.5 mm² without.',
      '2.5 mm² copper with mechanical protection; 4 mm² copper without.',
      '6 mm² copper with mechanical protection; 10 mm² without.',
      '10 mm² copper with mechanical protection; 16 mm² without.',
    ],
    correctIndex: 1,
    explanation:
      '§545.1.2 verbatim — 2.5 mm² Cu (with mechanical protection) or 4 mm² Cu (without). 16 mm² Al is permitted but BS EN 50310 (the bonding standard called up by §444.410) requires copper. §545 is entirely new in A4:2026 — before this Amendment, ICT functional earthing was either ad-hoc or covered only by BS EN 50310. From 15 April 2026 it is regulated by BS 7671 itself.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which BS EN 50173 part is the office-premises application document?',
    options: [
      'BS EN 50173-1 — general requirements.',
      'BS EN 50173-2 — office premises.',
      'BS EN 50173-3 — industrial premises.',
      'BS EN 50173-5 — data centres.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50173-2 covers offices. The series is: -1 general (umbrella), -2 offices, -3 industrial, -4 residential / single-tenant homes, -5 data centres, -6 distributed building services. A UK office fit-out applies BS EN 50173-1 + BS EN 50173-2 together.',
  },
  {
    id: 2,
    question:
      'Which BS EN 50174 part covers INSTALLATION PLANNING AND PRACTICES INSIDE BUILDINGS — bend radii, supports, separation from power, pulling tensions?',
    options: [
      'BS EN 50174-2 — installation planning and practices inside buildings.',
      'BS EN 50174-1 — specification & QA.',
      'BS EN 50174-3 — installation planning and practices outside buildings.',
      'BS EN 50310 — telecommunications bonding networks.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 50174-2 is the inside-buildings install practice. -1 covers specification, QA, documentation discipline. -3 covers outside-buildings (buried, aerial, between buildings). All three are in the same series and BS 7671 §444.410 names -1 and -2 by paragraph as mandatory inside UK buildings.',
  },
  {
    id: 3,
    question:
      'What is the BS 7671:2018+A4:2026 §444.1.3 verbatim mesh-size limit for the common meshed bonding star network in ICT-dense installations?',
    options: ['1 m × 1 m.', '3 m × 3 m.', '2 m × 2 m.', '5 m × 5 m.'],
    correctAnswer: 2,
    explanation:
      '§444.1.3 verbatim sets the mesh size at 2 m × 2 m maximum in areas where equipment susceptible to electromagnetic environmental interferences is installed. This is the bonding network for high-density communicating equipment — the kind found in modern comms rooms and data centres. The mesh limits common-mode loop area between bonded items.',
  },
  {
    id: 4,
    question:
      'BS 7671:2018+A4:2026 §444.4.9 prefers what type of cable for data transmission between separate buildings with their own equipotential bonding systems?',
    options: [
      'Screened twisted-pair copper.',
      'Armoured copper backbone cable.',
      'Coaxial cable with a bonded screen.',
      'Metal-free optical fibre cables (or other non-conducting systems).',
    ],
    correctAnswer: 3,
    explanation:
      '§444.4.9 verbatim: metal-free optical fibre cables or other non-conducting systems are preferred. The rationale is galvanic isolation — copper between two separately bonded buildings creates a path for earth-potential differences and lightning-induced surges to flow through the data cable. Metal-free fibre eliminates the path entirely.',
  },
  {
    id: 5,
    question:
      'What is the minimum copper CSA for a functional earthing or functional bonding conductor under BS 7671:2018+A4:2026 §545.1.2 if mechanical protection IS provided?',
    options: [
      '1.5 mm² Cu.',
      '2.5 mm² Cu (with mechanical protection); 4 mm² Cu (without).',
      '6 mm² Cu.',
      '16 mm² Cu.',
    ],
    correctAnswer: 1,
    explanation:
      '§545.1.2(a) verbatim: 2.5 mm² Cu with mechanical protection, 4 mm² Cu without. (Aluminium 16 mm² in both cases is permitted but BS EN 50310 requires copper, so aluminium is rare.) §545 is entirely new in A4:2026 — it formalises the long-standing BS EN 50310 practice of separate functional earthing for ICT into the UK wiring regulations.',
  },
  {
    id: 6,
    question:
      'Which BS EN standard governs ICT BONDING — the Telecommunications Bonding Backbone, the bonding ring, the connection of communicating equipment to the equipotential network — and is named verbatim in BS 7671 §444.410(c)?',
    options: [
      'BS EN 50173-1.',
      'BS EN 50174-2.',
      'BS EN 50310 — Telecommunications bonding networks for buildings and other structures.',
      'BS EN 50346.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 50310 is the ICT-bonding EN. §444.410(c) verbatim names it as one of the three standards that "shall be applied" for control / signalling / communication circuits. From 15 April 2026 it is regulatorily mandatory in any UK building hosting ICT cabling. It interlocks with BS 7671 §545 (functional earthing — new in A4:2026) and §444.1.x (bonding network types).',
  },
  {
    id: 7,
    question:
      'BS 7671:2018+A4:2026 §716.1 (the scope clause for PoE) verbatim refers to which standard for the cabling on which the PoE / ELV DC is distributed?',
    options: [
      'BS EN 50346 — testing of installed cabling.',
      'BS 6701 — customer-premises telecoms wiring.',
      'BS 7430 — code of practice for protective earthing.',
      'BS EN 50173-1 — generic cabling for customer premises, general requirements.',
    ],
    correctAnswer: 3,
    explanation:
      '§716.1 scopes PoE / ELV DC to "balanced, information technology cables and accessories primarily designed for data transmission, as specified in BS EN 50173-1". The scope of §716 is wired into BS EN 50173-1 — the generic cabling standard. §716.2(a) lists BS EN 50173-1 as a normative reference.',
  },
  {
    id: 8,
    question:
      'A campus job runs cabling between three buildings. Which BS EN 50174 part covers PLANNING AND PRACTICES OUTSIDE BUILDINGS — buried, aerial, between buildings?',
    options: [
      'BS EN 50174-3 — Installation planning and practices outside buildings.',
      'BS EN 50174-1 — specification & QA.',
      'BS EN 50174-2 — installation planning and practices inside buildings.',
      'BS EN 50346 — testing of installed cabling.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 50174-3 covers outside-buildings work: buried cables, aerial spans, building-to-building runs, environmental protection, lightning protection of external runs. §444.410 names -1 and -2 verbatim but not -3 — the outside-buildings standard is implicit on any campus job that crosses property or building boundaries.',
  },
  {
    id: 9,
    question:
      'A specifier asks "what UK standard covers customer-premises telecommunications wiring — the bit between the carrier demarcation and the rest of the building?". What is the answer?',
    options: [
      'BS EN 50173-1 — generic cabling for customer premises.',
      'BS EN 50174-3 — installation outside buildings.',
      'BS 6701:2016+A1:2017 — telecommunications equipment and cabling, installation and maintenance.',
      'BS 7671 §716 — PoE / ELV DC over balanced cabling.',
    ],
    correctAnswer: 2,
    explanation:
      'BS 6701 is the UK customer-premises telecoms standard. It governs the in-building wiring discipline from the carrier demarcation onwards, the demarcation itself, and operating / maintenance practice. It is parallel to BS EN 50173 (which assumes the customer-premises infrastructure exists and specifies how it must perform).',
  },
  {
    id: 10,
    question:
      'BS 7671:2018+A4:2026 §444.6.2 sets a minimum separation between ICT cables and certain lamps. Which lamps and what distance, verbatim?',
    options: [
      '50 mm from any LED luminaire, with no requirement for other lamp types.',
      '300 mm from every luminaire, regardless of lamp technology.',
      '100 mm from fluorescent tubes only; discharge lamps are unrestricted.',
      '130 mm from discharge, neon and mercury vapour (or other HID) lamps; CFLs count as discharge sources.',
    ],
    correctAnswer: 3,
    explanation:
      '§444.6.2 sets a 130 mm minimum separation. The lamps in scope are discharge / neon / mercury vapour / other HID — and CFLs are explicitly to be considered as gas discharge sources. The clause also requires data wiring racks and electrical equipment to always be separated. The 130 mm figure is one of the rare specific distances in §444.',
  },
];

const faqs = [
  {
    question:
      'How does BS EN 50173 relate to BS EN 50174 — they are both about cabling, are they not?',
    answer: (
      <>
        BS EN 50173 is the PERFORMANCE standard — what Class the channel must measure to. It defines
        the topology, the Classes (D, E, EA, F, FA, I, II), the connector and cable types in scope,
        and the channel / permanent-link models. BS EN 50174 is the INSTALLATION practice standard —
        how to plan, pull, support, separate and document the cabling, in three parts: -1
        specification &amp; QA, -2 inside buildings, -3 outside buildings. The two are read
        together: -50173 says what; -50174 says how. BS 7671 §444.410 names BS EN 50174-1, -2 and BS
        EN 50310 verbatim — those are mandatory inside UK buildings from 15 April 2026.
      </>
    ),
  },
  {
    question: 'Why does §444.1 list four different bonding network topologies?',
    answer: (
      <>
        Because different buildings need different bonding architectures. §444.1.1 — protective
        conductors in a star network, suitable for small dwellings and small commercial buildings
        with no significant interconnected communicating equipment. §444.1.2 — multiple meshed
        bonding star network, for small installations with several small groups of communicating
        equipment. §444.1.3 — common meshed bonding star network, for high-density communicating
        installations (PABX, centralised data processing) with the 2 m × 2 m mesh limit. §444.1.4 —
        bonding ring conductor, for whole-floor or whole-building distribution. The choice scales
        with ICT density. A modern comms-rich office typically lands on -1.3 (common meshed) or -1.4
        (ring). BS EN 50310 gives the design detail.
      </>
    ),
  },
  {
    question: 'How does §545 (new in A4:2026) interact with §544 (existing protective bonding)?',
    answer: (
      <>
        §544 is PROTECTIVE bonding — the safety-of-life equipotential connections that prevent
        dangerous touch voltages between extraneous-conductive-parts. §545 is FUNCTIONAL earthing —
        the signal-reference and EMC-mitigation connections that ICT equipment needs to operate
        cleanly. Same idea (a copper conductor going to earth), different function. §545.1.5
        verbatim covers the case where one conductor serves both: {`"`}Where a combined protective
        and functional bonding conductor is used, it shall fulfil all requirements for a protective
        bonding conductor.{`"`} In other words, the safety-of-life requirements always win — a
        combined conductor must meet §544 first and §545 second.
      </>
    ),
  },
  {
    question: 'A data centre is being designed. Which standards apply?',
    answer: (
      <>
        Data centres pull in additional standards beyond the office baseline. For cabling
        performance: BS EN 50173-5 (data centres) on top of BS EN 50173-1 (general). For physical
        infrastructure: BS EN 50600 series (general data-centre infrastructure) or ANSI/TIA-942-C
        (international reference, with Rated 1-4 redundancy classes). For install practice: BS EN
        50174-1 + -2 still apply, plus the data-centre-specific provisions in ISO/IEC 11801-5. For
        bonding: BS EN 50310 with the 2 m × 2 m mesh size from §444.1.3. For PoE / ELV DC: BS 7671
        §716 applies as it does to any other building. The data-centre-specific topology (Main /
        Horizontal / Equipment / Zone Distribution Areas) replaces the generic six-zone model but
        the channel rules and Class targets are the same.
      </>
    ),
  },
  {
    question: 'Why is a 2 m × 2 m mesh size set in §444.1.3? What if my comms room is 4 m × 4 m?',
    answer: (
      <>
        The 2 m × 2 m limit bounds the inductive loop area between any two bonded items. Above that
        size, common-mode currents (lightning-induced surges, switching transients, power-fault
        currents flowing in screens) develop voltage differences across the loop that interfere with
        susceptible equipment. A 4 m × 4 m room with a single peripheral bond would have a 4 m × 4 m
        loop. The fix is to add internal mesh conductors so the room is divided into 2 m × 2 m
        squares — copper strips at 2 m intervals connecting the peripheral bond to itself, all
        bonded to the equipotential bonding network. BS EN 50310 gives the design detail; §444.1.3
        sets the limit.
      </>
    ),
  },
  {
    question:
      'Does §716 PoE apply on a campus where buildings are connected by fibre and copper Ethernet runs only inside each building?',
    answer: (
      <>
        Yes — anywhere copper Ethernet carries PoE. §716 applies to the distribution of ELV DC power
        using balanced ICT cables (§716.1 verbatim); the campus topology is irrelevant. Each
        building independently needs to comply with §716 on its in-building copper. The
        inter-building fibre is outside §716{`'`}s scope (no PoE on fibre) but inside §444.4.9{`'`}s
        preference (metal-free fibre between buildings with separate bonding). On a campus job you
        would expect: §444.4.9-compliant metal-free fibre between buildings, §716-compliant Cat 6A
        inside each building, §444.410-mandated BS EN 50174-1, -2 and BS EN 50310 across the whole
        installation.
      </>
    ),
  },
];

const DataCablingModule6Section3 = () => {
  const navigate = useNavigate();

  useSEO(
    'Building and Campus Standards | Data Cabling Module 6.3 | Elec-Mate',
    'BS EN 50173 series (-1 general, -2 offices, -3 industrial, -4 residential, -5 data centres, -6 distributed buildings) and BS EN 50174 series (-1 specification & QA, -2 inside buildings, -3 outside buildings). BS EN 50310 ICT bonding. BS EN 50346 testing. BS 6701 customer-premises wiring. Verbatim BS 7671:2018+A4:2026 §444.1.3 (2 m × 2 m mesh), §444.4.9 (metal-free fibre between buildings), §545 (ICT functional earthing — new in A4:2026), §716.1 (PoE scope).'
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
            eyebrow="Module 6 · Section 3"
            title="Building and Campus Standards"
            description="The standards stack for any UK building or campus structured-cabling job. BS EN 50173 series (-1 general, -2 offices, -3 industrial, -4 residential, -5 data centres, -6 distributed buildings). BS EN 50174 series (-1 specification & QA, -2 inside buildings, -3 outside buildings). BS EN 50310 ICT bonding. BS EN 50346 testing. BS 6701 customer-premises wiring. And — sat alongside — BS 7671:2018+A4:2026 §716, §545 (NEW in A4:2026), §444 and §528, with verbatim clauses for the 2 m × 2 m bonding mesh, the metal-free-fibre preference between buildings, and the new ICT functional-earthing rules."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 50173 series (performance) and BS EN 50174 series (install practice) apply together — pick BS EN 50173-1 + the application-specific part (-2 office / -3 industrial / -4 residential / -5 data centre / -6 distributed buildings), plus BS EN 50174-1 + -2 inside buildings or -1 + -3 outside buildings.',
              'BS 7671:2018+A4:2026 §444.410 verbatim: BS EN 50174-1, BS EN 50174-2 and BS EN 50310 "shall be applied" inside UK buildings. From 15 April 2026 these EN documents are regulatorily mandatory.',
              'BS 7671:2018+A4:2026 §444.1.3 verbatim: maximum mesh size 2 m × 2 m for the common meshed bonding star network in ICT-dense installations. §444.4.9 verbatim: metal-free optical fibre is preferred between separate buildings with separate equipotential bonding systems.',
              'BS 7671:2018+A4:2026 §545 (NEW IN A4:2026) introduces ICT functional earthing: 2.5 mm² Cu min with mechanical protection, 4 mm² Cu without (§545.1.2 verbatim). The new MFET (Main Functional Earthing Terminal) is connected once to the MET (§545.1.1).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the BS EN 50173 multi-part structure (-1 through -6) and pick the right parts for offices, industrial, residential, data centres and distributed buildings',
              'List the BS EN 50174 series (-1 spec & QA, -2 inside buildings, -3 outside buildings) and identify which part applies to a given job',
              'Quote BS 7671:2018+A4:2026 §444.410 verbatim and explain why BS EN 50174-1, BS EN 50174-2 and BS EN 50310 are mandatory inside UK buildings from 15 April 2026',
              'Quote BS 7671:2018+A4:2026 §444.1.3 verbatim and explain the 2 m × 2 m mesh limit for the common meshed bonding star network in ICT-dense installations',
              'Quote BS 7671:2018+A4:2026 §444.4.9 verbatim and explain why metal-free optical fibre is preferred between separate buildings with separate equipotential bonding',
              'Quote BS 7671:2018+A4:2026 §545.1.1 / §545.1.2 verbatim and apply the new ICT functional-earthing rules — 2.5 mm² Cu / 4 mm² Cu CSA limits, the MFET concept, the connection-to-MET rule',
              'Quote BS 7671:2018+A4:2026 §716.1 verbatim and explain how it scopes PoE / ELV DC over balanced cabling against BS EN 50173-1',
              'Place BS 6701 (UK customer-premises telecoms wiring) and BS EN 50346 (testing of installed cabling) in the standards stack alongside the EN performance / install / bonding documents',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The BS EN 50173 series — performance, by occupancy</ContentEyebrow>

          <ConceptBlock
            title="BS EN 50173 multi-part — pick Part 1 plus the application-specific part for the building type"
            plainEnglish={`BS EN 50173 is the European harmonised generic-cabling performance standard, multi-part. Part 1 is the umbrella — Classes, channel model, connector and cable types in scope. Parts 2 to 6 are application-specific: -2 office, -3 industrial, -4 residential, -5 data centres, -6 distributed building services. A typical UK office fit-out applies BS EN 50173-1 + BS EN 50173-2 together; a data centre applies BS EN 50173-1 + BS EN 50173-5. The umbrella always applies; the application part scopes outlet density, pathway capacity and topology to the building type.`}
            onSite="The instinct on a survey is to quote 'compliant with BS EN 50173' generically. The professional answer specifies the parts: 'BS EN 50173-1 + 50173-2' for an office, 'BS EN 50173-1 + 50173-3' for industrial. The application part determines outlet density (typically 2 outlets per 10 m² in an office), pathway capacity (sized for the foreseeable cable count plus growth), and topology (six-zone for office; main / horizontal / equipment / zone distribution areas for data centre)."
          >
            <p>The current BS EN 50173 multi-part structure:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS EN 50173-1:2018+A1:2020 — General requirements.</strong> The umbrella.
                Defines the six-zone topology, the channel / permanent-link model, the Classes (D /
                E / EA / F / FA / I / II), the connector and cable types. Named verbatim in BS
                7671:2018+A4:2026 §716.2(a) as a normative reference.
              </li>
              <li>
                <strong>BS EN 50173-2 — Office premises.</strong> Outlet density, pathway capacity,
                building distributor / floor distributor placement. The standard a UK office is
                designed against. Apply with -1.
              </li>
              <li>
                <strong>BS EN 50173-3 — Industrial premises.</strong> MICE classification
                (Mechanical, Ingress, Climatic, Electromagnetic), ruggedised cable jackets, sealed
                connectors, higher outlet protection.
              </li>
              <li>
                <strong>BS EN 50173-4 — Residential / single-tenant homes.</strong> Outlet density
                and topology for residential / SOHO. UK residential additionally falls under BS 6701
                for the carrier-side wiring.
              </li>
              <li>
                <strong>BS EN 50173-5 — Data centres.</strong> Main / horizontal / equipment / zone
                distribution areas; data-centre-specific topology. Sits alongside BS EN 50600
                (general data-centre infrastructure).
              </li>
              <li>
                <strong>BS EN 50173-6 — Distributed building services.</strong> Cabling for
                distributed building services — building automation, access control, IoT. Aligns
                with the {`"`}smart building{`"`} specs that drive PoE++ deployments.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.1 (Scope of PoE — verbatim)"
            clause={
              <>
                The particular requirements of this section apply to the distribution of ELV DC
                power using balanced, information technology cables and accessories primarily
                designed for data transmission, as specified in BS EN 50173-1 using power feeding
                sourcing equipment in accordance with BS EN IEC 62368-3. Requirements are included
                for the design, erection, and verification of telecommunications infrastructure for
                the purpose of both telecommunications and distribution of ELV DC power feeding. In
                addition, requirements are included for use of existing telecommunications
                infrastructure for distribution of ELV DC power. The power delivery systems include,
                but are not restricted to, the Power over Ethernet systems specified by ISO/IEC/IEEE
                DIS 8802-3 (2024). This section does not apply to the use of cables and accessories
                for private branch exchange (PBX).
              </>
            }
            meaning="§716.1 wires the entire PoE / ELV DC scope of BS 7671:2018+A4:2026 directly into BS EN 50173-1. Every Cat 5 / 6 / 6A / 7 / 7A / 8.1 / 8.2 cable carrying PoE in the UK from 15 April 2026 is regulated against the EN 50173-1 cabling architecture. PBX wiring is excluded — that remains the domain of BS 6701. PoE-by-Ethernet is in scope; remote-power-over-fibre (Power over Fibre) is not, because §716 explicitly limits itself to balanced cabling."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <AmendmentBadge regs={['716']} edition="A4:2026" />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The BS EN 50174 series — install practice</ContentEyebrow>

          <ConceptBlock
            title="BS EN 50174-1 / -2 / -3 — the installation discipline that delivers the Class"
            plainEnglish="BS EN 50173 specifies what the channel must measure to. BS EN 50174 specifies how to install it so it actually does. The series is in three parts: -1 specification &amp; QA (the documentation, the records, the labelling), -2 inside buildings (bend radii, supports, separation from power, pulling tensions, bundle sizes), -3 outside buildings (buried, aerial, between buildings)."
            onSite="On any UK install inside a building, BS EN 50174-1 + BS EN 50174-2 are MANDATORY under BS 7671 §444.410. -3 applies if any part of the install is outside the building — buried in the ground between two structures, aerial across a courtyard, or in a service trench between blocks on a campus. The QA documentation discipline in -1 §6 is what produces the labelling and records covered in Section 4 of this module."
          >
            <p>The BS EN 50174 series:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>
                  BS EN 50174-1:2018+A2:2024 — Cabling installation: Specification and quality
                  assurance.
                </strong>{' '}
                The QA discipline. §6 covers administration: identifier hierarchy, records, as-built
                drawings, change control. Named verbatim in BS 7671 §444.410(a) as mandatory inside
                UK buildings.
              </li>
              <li>
                <strong>
                  BS EN 50174-2:2018+A2:2024 — Installation planning and practices inside buildings.
                </strong>{' '}
                The how-to-install standard. Bend radii (typically 4× cable diameter for unshielded
                TP, 8× for shielded), pulling tensions (typically 110 N for Cat 6A — exceed and you
                stretch the geometry that delivers NEXT performance), supports (TIA-569-E minimum
                spacings; metallic per §521.10.202), separation from power (Annex A444 Tables A444.1
                / A444.2). Named verbatim in BS 7671 §444.410(b) as mandatory.
              </li>
              <li>
                <strong>
                  BS EN 50174-3:2013+A2:2022 — Installation planning and practices outside
                  buildings.
                </strong>{' '}
                Buried cables, aerial spans, building-to-building runs, external lightning and surge
                protection of ICT cabling. NOT named in §444.410 directly — but implicit on any
                campus or external job through §444 itself and BS EN 50310{`'`}s bonding
                requirements.
              </li>
            </ul>
            <p>
              BS EN 50346 sits alongside as the testing standard — Information technology — Cabling
              installation — Testing of installed cabling. It is the EN equivalent of
              ANSI/TIA-1152-A. Test instrument accuracy, parameter coverage, link / channel modes —
              all defined here.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.410 (Inside buildings — verbatim, repeated)"
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
            meaning="The same §444.410 cite repeats here because Section 3 is where it really lives — these are the building-and-campus standards. From 15 April 2026, ANY UK building hosting control, signalling or communication circuits is regulated by BS 7671 against BS EN 50174-1 + BS EN 50174-2 + BS EN 50310. Failing to apply them is failing BS 7671. Note: §444.410 does NOT name BS EN 50173 or BS EN 50346 — but those are picked up by §716.2(a) (50173-1) and by the testing requirement in -50174 itself."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <SectionRule />

          <ContentEyebrow>
            BS EN 50310 and the bonding network — verbatim from §444.1.3
          </ContentEyebrow>

          <ConceptBlock
            title="BS EN 50310 ICT bonding — and the 2 m × 2 m mesh limit from §444.1.3"
            plainEnglish="BS EN 50310 is the ICT-bonding standard called up by BS 7671 §444.410(c). It describes the Telecommunications Bonding Backbone (TBB), the bonding ring conductor, the connection of communicating equipment to the equipotential network, and the mesh-size requirements that bound common-mode interference loops. BS 7671 §444.1.x mirrors BS EN 50310 at the regulation level — and the key number is 2 m × 2 m maximum mesh size in any area where ICT equipment is susceptible to electromagnetic interference."
            onSite="In a comms room, a data centre, or any high-density ICT space, the bond network is not a single peripheral conductor — it is a mesh. Copper strips (typically 25 mm × 3 mm flat or 8 mm round per §444.5.3) running across the floor and walls at intervals, connected at every crossing, all bonded back to the main earthing terminal. The mesh density must be 2 m × 2 m maximum per §444.1.3. BS EN 50310 gives the design detail; §444 sets the limit."
          >
            <p>The four bonding network topologies in §444.1:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>§444.1.1 — Star network.</strong> Small dwellings, small commercial
                buildings; equipment not interconnected by signal cables. Single-tier topology.
              </li>
              <li>
                <strong>§444.1.2 — Multiple meshed bonding star network.</strong> Small
                installations with several small groups of communicating equipment. A star at the
                building level with mesh networks at each group.
              </li>
              <li>
                <strong>§444.1.3 — Common meshed bonding star network.</strong> ICT-dense
                installations: PABX, centralised data processing, modern comms-rich offices. Mesh
                size limit 2 m × 2 m maximum where susceptible equipment is installed. BS EN 50310
                referenced for design detail.
              </li>
              <li>
                <strong>§444.1.4 — Bonding ring conductor.</strong> Whole-floor or whole-building
                distribution. Copper ring (preferably bare or insulated copper, accessible
                everywhere) on a cable tray, conduit, or surface mount.
              </li>
            </ul>
            <p>
              The choice scales with ICT density. A single-residence build lands on §444.1.1 (star).
              A 50-person office lands on §444.1.3 or §444.1.4. A data centre lands on §444.1.3 with
              the full BS EN 50310 detail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.1.3 (Common meshed bonding star network — verbatim)"
            clause={
              <>
                This type of network is applicable to installations with a high density of
                communicating equipment corresponding to critical applications; see Figure A444.3.
                It is suitable for protection of private automatic branch exchange equipment (PABX)
                and centralized data processing systems. A meshed equipotential bonding network is
                enhanced by the existing metallic structure of the building. It is supplemented by
                conductors forming the square mesh. Mesh size should be adapted to the dimensions of
                the installation to be protected and should be in accordance with the
                recommendations of BS EN 50310. Where concerns exist, the mesh size should be
                adapted to the dimensions of the installation to be protected, but should not exceed
                2 m × 2 m in areas where equipment susceptible to electromagnetic environmental
                interferences is installed.
              </>
            }
            meaning="The 2 m × 2 m number is the headline. Above that mesh size, common-mode loop areas between bonded items become large enough that switching transients, power-fault currents flowing in screens, and lightning-induced surges develop interfering voltages across the loop. The clause routes the design detail to BS EN 50310 — that is the document that says HOW to lay the mesh out. §444.1.3 sets the limit; BS EN 50310 implements it."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.4.9 (Separate buildings — verbatim)"
            clause={
              <>
                Where different buildings have separate equipotential bonding systems, metal-free
                optical fibre cables or other non-conducting systems are preferred for signal and
                data transmission, for example, microwave signal transformer for isolation in
                accordance with BS EN 61558-2-1, 2-4, 2-6, 2-15 and either BS EN 60950-1 or BS EN
                IEC 62368-1.
              </>
            }
            meaning="Between separately bonded buildings, copper data cabling is NOT preferred. The reason: copper between two earthing systems creates a low-impedance path for any potential difference between them — earth-fault currents (from a fault in one building flowing through the data cable to the other) and lightning-induced surges (one building struck, the surge reaches the other through the cable). Metal-free fibre — no conducting elements at all — eliminates the path. RF / microwave isolation transformers are an alternative for short reaches. On every campus job, this clause forces the inter-building backbone to be metal-free fibre."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>§545 — ICT functional earthing (NEW IN A4:2026)</ContentEyebrow>

          <ConceptBlock
            title="§545 brings ICT functional earthing into BS 7671 for the first time"
            plainEnglish="Until A4:2026, ICT functional earthing — the signal-reference and EMC connections that ICT equipment needs to operate cleanly — was governed by BS EN 50310 and informal industry practice. From 15 April 2026, BS 7671 §545 incorporates the rules into UK regulation directly. It defines minimum cross-sectional areas, identification colours, the new MFET (Main Functional Earthing Terminal) concept, equipotential bonding ring conductors for ICT, and the rules for combined protective + functional bonding conductors."
            onSite="On a UK install from April 2026, you may be asked 'is the functional earthing compliant'? Before A4:2026 there was nothing in BS 7671 to compare against — only BS EN 50310 and the manufacturer's guidance. From A4:2026 the answer is §545. 2.5 mm² Cu (with mechanical protection) or 4 mm² Cu (without) is the minimum CSA. The MFET, if present, connects to the MET only once. Identification per Table 51. And §545.1.5 explicitly says: where a conductor is doing both protective and functional duty, protective duty wins."
          >
            <p>The five §545 sub-clauses and what each one does:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§545.1.1 — General.</strong> Defines the conditions under which functional
                bonding conductors are required: insulated for the highest expected voltage,
                installed separately from the protective conductor, connected to the MET only once.
                If multiple functional bonding conductors are present, an MFET (Main Functional
                Earthing Terminal) is installed for ease of connection.
              </li>
              <li>
                <strong>§545.1.2 — Minimum CSA.</strong> 2.5 mm² Cu (or 16 mm² Al) with mechanical
                protection; 4 mm² Cu (or 16 mm² Al) without. NOTE: BS EN 50310 requires copper. See
                verbatim regs callout below.
              </li>
              <li>
                <strong>§545.1.3 — Identification.</strong> Functional earthing and bonding
                conductors are identified by colour or alphanumeric designation per Table 51.
              </li>
              <li>
                <strong>§545.1.4 — Continuity.</strong> Electrical continuity rules of §543.3
                (except .3.5) apply. If part of equipment can be removed, the functional bonding for
                the remaining equipment must NOT be disconnected.
              </li>
              <li>
                <strong>§545.1.5 — Combined protective and functional bonding conductors.</strong>
                Where one conductor does both jobs, it must fulfil all requirements for a protective
                bonding conductor. Safety-of-life always wins.
              </li>
            </ul>
            <p>
              §545.2 and §545.3 round out the section: §545.2 defines what connects to the MFET
              (functional earthing conductors and functional bonding conductors); §545.3 covers
              equipotential bonding ring conductors — the optional ring-form MET / MFET that lets
              ICT equipment connect to the bonding system by the shortest practicable route.
              Cross-sectional area minima for the ring: 50 mm² hot-dip galvanised steel strip, or 16
              mm² Cu, or equivalent in other material.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §545.1.2 (Minimum cross-sectional area — verbatim)"
            clause={
              <>
                Except where BS EN 50310 applies, the following minimum cross-sectional area shall
                be applied for functional earthing conductors and functional bonding conductors: (a)
                2.5 mm² copper or 16 mm² aluminium, if protection against mechanical damage is
                provided. (b) 4 mm² copper or 16 mm² aluminium, if protection against mechanical
                damage is not provided. NOTE 1: BS EN 50310 requires copper conductors.
              </>
            }
            meaning="2.5 mm² Cu / 4 mm² Cu — these are the numbers to memorise for §545. The clause defers to BS EN 50310 where it applies, and BS EN 50310 requires copper, so the aluminium option is rarely seen in practice. Mechanical protection means the conductor is enclosed in conduit, trunking, or otherwise protected from damage — without that protection, you size up to 4 mm² Cu to allow for accidental damage. These figures are SMALLER than typical protective bonding conductors (Section 544) — functional earthing carries signal-reference current, not fault current, so the thermal sizing is different."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §545.1.1 (Functional bonding conductors — verbatim, extract)"
            clause={
              <>
                Where the functional equipotential bonding system is not locally connected to the
                protective equipotential bonding system in accordance with Section 444, the
                functional bonding conductors shall be: (a) insulated for the highest voltage
                expected between the functional bonding system and Earth and/or between the
                functional bonding system and simultaneously accessible exposed-conductive-parts;
                (b) installed separately from the protective conductor; (c) connected to the main
                earthing terminal (MET) only once. If there are multiple functional bonding
                conductors present in the electrical installation, a separate main functional
                earthing terminal (MFET) shall be installed for ease of connection for these
                conductors. The MFET shall be connected to the MET only once.
              </>
            }
            meaning="Three rules: insulated for the maximum expected voltage, kept separate from the protective conductor route, connected to the MET only once. The 'only once' is critical — multiple connections to the MET would create circulating currents through the bonding network, defeating the EMC purpose. The MFET concept is new in A4:2026 — it gives functional bonding its own terminal point so it does not get tangled with the protective bonding star at the MET. Practical consequence: in any modern comms-rich UK install from April 2026, expect a MFET separate from the MET, with a single connection between them."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <AmendmentBadge regs={['545']} edition="A4:2026" />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          {/* UK standards stack diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The UK standards stack — what governs every layer of a structured cabling job
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="A layered stack diagram of the UK standards landscape for structured cabling. From bottom to top: Layer 1 BS 7671:2018+A4:2026, the UK wiring regulations, marked as the foundation. Layer 2 BS 6701:2016+A1:2017, customer-premises telecoms wiring and demarcation. Layer 3 BS EN 50310, the ICT bonding network, marked mandatory under §444.410. Layer 4 BS EN 50174 series, parts 1, 2 and 3, install practice, marked mandatory under §444.410. Layer 5 BS EN 50173 series, generic cabling performance, the Class definitions. Layer 6 at the top is the international cross-reference: ANSI/TIA-568 series and ISO/IEC 11801 series, valid international references not the UK regulatory pointer. A bottom legend explains the colour coding and the meaning of the mandatory marker."
            >
              {/* ===== Title band ===== */}
              <text
                x="450"
                y="32"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                UK STANDARDS STACK · BS 7671:2018+A4:2026 · 15 APRIL 2026
              </text>

              {/* ===== LAYER 6 (top) — International cross-reference ===== y top = 60 */}
              <rect
                x="60"
                y="60"
                width="780"
                height="68"
                rx="8"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.6"
                strokeDasharray="6 3"
              />
              <text
                x="80"
                y="86"
                fill="#E9D5FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAYER 6 · International cross-reference
              </text>
              <text x="80" y="106" fill="#F3E8FF" fontSize="11" fontFamily="system-ui">
                ANSI/TIA-568 series · ISO/IEC 11801 series
              </text>
              <text
                x="80"
                y="122"
                fill="#CBD5E1"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Valid international reference · NOT the UK regulatory pointer
              </text>

              {/* Layer-to-layer connector zone — clear vertical band y=128-140 (no labels here) */}
              <line
                x1="450"
                y1="128"
                x2="450"
                y2="140"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.4"
              />

              {/* ===== LAYER 5 — Performance ===== y top = 140 */}
              <rect
                x="60"
                y="140"
                width="780"
                height="68"
                rx="8"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="80"
                y="166"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAYER 5 · Performance — what Class does the channel measure to?
              </text>
              <text x="80" y="186" fill="#CFFAFE" fontSize="11" fontFamily="system-ui">
                BS EN 50173-1 (general) · BS EN 50173-2 (offices) · -3 industrial · -5 data centres
              </text>
              <text
                x="80"
                y="202"
                fill="#CBD5E1"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Cited normatively from BS 7671 §716.2(a)
              </text>

              <line
                x1="450"
                y1="208"
                x2="450"
                y2="220"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.4"
              />

              {/* ===== LAYER 4 — Install practice — MANDATORY ===== y top = 220 */}
              <rect
                x="60"
                y="220"
                width="780"
                height="68"
                rx="8"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <text
                x="80"
                y="246"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAYER 4 · Install practice — how is it installed? ★ MANDATORY
              </text>
              <text x="80" y="266" fill="#FEF3C7" fontSize="11" fontFamily="system-ui">
                BS EN 50174-1 (specification &amp; QA) · BS EN 50174-2 (inside) · -3 (outside)
              </text>
              <text
                x="80"
                y="282"
                fill="#FEF3C7"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                BS 7671 §444.410(a) and (b) — “shall be applied”
              </text>

              <line
                x1="450"
                y1="288"
                x2="450"
                y2="300"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.4"
              />

              {/* ===== LAYER 3 — Bonding — MANDATORY ===== y top = 300 */}
              <rect
                x="60"
                y="300"
                width="780"
                height="68"
                rx="8"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <text
                x="80"
                y="326"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAYER 3 · ICT bonding network ★ MANDATORY
              </text>
              <text x="80" y="346" fill="#FEF3C7" fontSize="11" fontFamily="system-ui">
                BS EN 50310 — bonding mesh, MFET, 2 m × 2 m max cell
              </text>
              <text
                x="80"
                y="362"
                fill="#FEF3C7"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                BS 7671 §444.410(c) — “shall be applied” · coupled to §545 functional earthing
              </text>

              <line
                x1="450"
                y1="368"
                x2="450"
                y2="380"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.4"
              />

              {/* ===== LAYER 2 — UK telecoms wiring ===== y top = 380 */}
              <rect
                x="60"
                y="380"
                width="780"
                height="68"
                rx="8"
                fill="rgba(34,197,94,0.12)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="80"
                y="406"
                fill="#BBF7D0"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAYER 2 · UK customer-premises telecoms wiring
              </text>
              <text x="80" y="426" fill="#DCFCE7" fontSize="11" fontFamily="system-ui">
                BS 6701:2016+A1:2017 — entrance facility, demarcation, in-building telecoms
              </text>
              <text
                x="80"
                y="442"
                fill="#DCFCE7"
                fontSize="10"
                fontStyle="italic"
                fontFamily="system-ui"
              >
                Upstream of BS EN 50173 · governs the carrier-customer handover
              </text>

              <line
                x1="450"
                y1="448"
                x2="450"
                y2="460"
                stroke="rgba(255,255,255,0.20)"
                strokeWidth="1.4"
              />

              {/* ===== LAYER 1 — BS 7671 (foundation) ===== y top = 460 */}
              <rect
                x="60"
                y="460"
                width="780"
                height="84"
                rx="8"
                fill="rgba(239,68,68,0.14)"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <text
                x="80"
                y="486"
                fill="#FCA5A5"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                LAYER 1 · UK wiring regulations — the foundation
              </text>
              <text
                x="80"
                y="506"
                fill="#FECACA"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                BS 7671:2018+A4:2026 (published 15 April 2026)
              </text>
              <text x="80" y="524" fill="#FECACA" fontSize="10" fontFamily="system-ui">
                §444 EMC · §528 proximity · §521.10.202 escape routes · §544.1.2 main bonding
              </text>
              <text
                x="80"
                y="540"
                fill="#FDE68A"
                fontSize="10"
                fontWeight="700"
                fontFamily="system-ui"
              >
                §545 functional earthing (NEW · A4) · §716 PoE / ELV DC (NEW · A4)
              </text>

              {/* ===== Legend panel ===== */}
              <rect
                x="60"
                y="572"
                width="780"
                height="132"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="80"
                y="596"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Legend col 1 */}
              <rect
                x="80"
                y="610"
                width="14"
                height="14"
                rx="3"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text x="104" y="622" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                UK wiring regulations — BS 7671 foundation
              </text>

              <rect
                x="80"
                y="632"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,197,94,0.20)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text x="104" y="644" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                UK telecoms wiring — BS 6701
              </text>

              <rect
                x="80"
                y="654"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.30)"
                stroke="#EAB308"
                strokeWidth="2"
              />
              <text x="104" y="666" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                ★ Mandatory under BS 7671 §444.410
              </text>

              {/* Legend col 2 */}
              <rect
                x="480"
                y="610"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text x="504" y="622" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                EN performance — Class definitions
              </text>

              <rect
                x="480"
                y="632"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.14)"
                stroke="#A855F7"
                strokeWidth="1.6"
                strokeDasharray="6 3"
              />
              <text x="504" y="644" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                International reference — TIA · ISO (not UK regulatory)
              </text>

              <text x="504" y="666" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Layers stack from electrical-safety foundation up to international ref
              </text>

              {/* Footer caption */}
              <line
                x1="80"
                y1="680"
                x2="820"
                y2="680"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="696"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                From 15 April 2026 — BS EN 50174-1 / -2 + BS EN 50310 are regulatorily mandatory
                inside UK buildings
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>BS 6701 and the standards stack on a UK job</ContentEyebrow>

          <ConceptBlock
            title="BS 6701 — UK customer-premises telecommunications wiring"
            plainEnglish="BS 6701:2016+A1:2017 covers UK customer-premises telecommunications wiring — the entry from the carrier (Openreach / fibre delivery), the demarcation, and the in-building wiring discipline. It is upstream of BS EN 50173 (which assumes the customer-premises infrastructure exists and specifies how it must perform), parallel to BS EN 50174 (installation practice), and electrically referenced by BS 7671 (which governs the LV/ELV power dimension and, from A4:2026, the PoE dimension)."
            onSite="On every UK fit-out, BS 6701 is the standard that governs the entrance facility and the carrier-customer demarcation. It is what the Openreach engineer hands over to. After demarcation, BS EN 50173 / 50174 / 50310 take over for the structured cabling. BS 6701 is not the cabling performance standard; it is the UK customer-premises wiring standard that names what is the carrier's responsibility and what is the customer's. A typical office fit-out applies BS 6701 + BS EN 50173-1 + BS EN 50173-2 + BS EN 50174-1 + BS EN 50174-2 + BS EN 50310 + BS 7671:2018+A4:2026."
          >
            <p>The complete UK standards stack for a typical commercial fit-out:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 6701:2016+A1:2017.</strong> Customer-premises telecoms wiring + entrance
                facility + demarcation.
              </li>
              <li>
                <strong>BS EN 50173-1 + -2.</strong> Generic cabling performance + office-specific
                application.
              </li>
              <li>
                <strong>BS EN 50174-1 + -2.</strong> Specification &amp; QA + planning &amp;
                practices inside buildings. MANDATORY under BS 7671 §444.410.
              </li>
              <li>
                <strong>BS EN 50310.</strong> ICT bonding network. MANDATORY under BS 7671 §444.410.
              </li>
              <li>
                <strong>BS EN 50346.</strong> Testing of installed cabling.
              </li>
              <li>
                <strong>BS 7671:2018+A4:2026.</strong> UK wiring regulations. §444 (EMC), §528
                (proximity), §521.10.202 (escape routes), §544.1.2 (main bonding), §545 (NEW — ICT
                functional earthing), §716 (NEW — PoE / ELV DC).
              </li>
              <li>
                <strong>Approved Document B.</strong> Building Regulations — fire safety,
                fire-stopping at penetrations, compartmentation.
              </li>
              <li>
                <strong>CDM 2015.</strong> Construction Design and Management Regulations — duties
                on principal contractor, designer, client.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Building / campus standards by what they answer"
            source="UK regulatory layer · 2026"
            headers={['Question', 'Standard', 'BS 7671 hook']}
            rows={[
              [
                'Cabling performance — what Class?',
                'BS EN 50173 series (with ISO/IEC 11801 and TIA-568 as cross-reference)',
                '§716.2(a) names BS EN 50173-1 normatively',
              ],
              [
                'Installation practice — inside buildings',
                'BS EN 50174-1 + 50174-2',
                '§444.410(a) and (b) — mandatory',
              ],
              [
                'Installation practice — outside buildings',
                'BS EN 50174-3',
                'implicit through §444 + BS EN 50310',
              ],
              [
                'ICT bonding network',
                'BS EN 50310',
                '§444.410(c) — mandatory · §444.1.3 sets 2 m × 2 m mesh limit',
              ],
              [
                'Testing of installed cabling',
                'BS EN 50346 (or ANSI/TIA-1152-A)',
                '— (referenced through BS EN 50174 QA)',
              ],
              [
                'Customer-premises telecoms wiring (UK)',
                'BS 6701:2016+A1:2017',
                '— (parallel to BS 7671, not a hook)',
              ],
              ['ICT functional earthing', '— (new in BS 7671)', '§545 entire — NEW IN A4:2026'],
              [
                'PoE / ELV DC over balanced cabling',
                '— (new in BS 7671)',
                '§716 entire — NEW IN A4:2026',
              ],
              [
                'Bonding network types and topologies',
                'BS EN 50310',
                '§444.1.1-4 (star / multi-mesh / common-mesh / ring)',
              ],
              [
                'Inter-building data — separate bonding systems',
                '— (electrical-safety rule)',
                '§444.4.9 — metal-free fibre preferred',
              ],
              [
                'Main bonding connection point',
                '— (electrical-safety rule)',
                '§544.1.2 — within 600 mm of meter outlet union',
              ],
              [
                'EMC segregation distances',
                '— (electrical-safety rule)',
                '§444.6.1, §444.6.2 (130 mm to HID lamps), Annex A444',
              ],
              [
                'Building Regulations fire safety',
                'Approved Document B (Vol 2 commercial)',
                'parallel — fire-stopping interacts with §521.10.202',
              ],
            ]}
            notes="From 15 April 2026, every row in the BS 7671 hook column with §444.410 / §716 / §545 / §444 / §528 / §544 reference is regulatorily mandatory. Rows with parallel / cross-reference text are best-practice or implicit. The 2 m × 2 m mesh size (§444.1.3), the metal-free fibre preference between buildings (§444.4.9), the 130 mm separation from HID lamps (§444.6.2), and the new §545 / §716 sections are the headline numbers for any UK building / campus structured-cabling job from April 2026."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Running copper Ethernet between separately bonded buildings — without considering §444.4.9"
            whatHappens={
              <>
                Two buildings on a campus, each with its own MET, are linked by 50 m of buried Cat
                6A in armoured duct {`"`}because copper is cheaper than fibre{`"`}. The buildings
                work fine in normal conditions. A nearby lightning strike induces a surge between
                the two earth potentials. The surge propagates along the copper, blowing the switch
                ports at both ends. Investigation shows the install violated BS 7671 §444.4.9 —
                metal-free optical fibre was the preferred medium and was disregarded.
              </>
            }
            doInstead={
              <>
                Specify metal-free optical fibre between separately bonded buildings on every campus
                design — multimode (OM4 to ~150 m, OM5 SWDM compatible) for shorter spans or
                single-mode (OS2) for longer reaches. The all-dielectric construction (no armour, no
                metallic strength member) gives complete galvanic isolation. Run the fibre in
                non-metallic duct or direct-buried per BS EN 50174-3. If physical damage protection
                is needed, use rodent-resistant non-metallic armour. Inter-building copper Ethernet
                is a §444.4.9 non-conformance and a lightning disaster waiting to happen.
              </>
            }
          />

          <Scenario
            title="A 4-storey office hosts a small comms room — what is the bonding network?"
            situation={
              <>
                A 4-storey office, ground-floor comms room of approximately 4 m × 5 m, contains two
                racks of comms equipment plus a small PABX. The MEP designer asks you to specify the
                bonding network for the comms room — and how it ties into the building MET.
              </>
            }
            whatToDo={
              <>
                §444.1.3 applies — common meshed bonding star network, mesh size 2 m × 2 m maximum.
                Specify a peripheral copper bonding conductor (25 mm × 3 mm flat or 8 mm round per
                §444.5.3) on all four walls, internal copper strips at 2 m intervals dividing the 4
                × 5 m floor into 2 m × 2 m cells, all bonded at every crossing. Each rack bonded by
                a short conductor (2.5 mm² Cu min — BS 7671 §544 for protective + §545 for
                functional duty) to the nearest mesh intersection. Run an MFET (new under §545.2)
                for the functional bonding conductors; connect the MFET once to the building MET
                (§545.1.1 verbatim). Apply BS EN 50310 detailing throughout. Identify functional
                earthing per Table 51 (§545.1.3).
              </>
            }
            whyItMatters={
              <>
                The 2 m × 2 m mesh limit is the headline §444.1.3 number that auditors will check on
                a high-density ICT room. Without the internal mesh, the peripheral bond alone gives
                a 4 m × 5 m loop area — well above the limit — and common-mode currents will develop
                interfering voltages. The new §545 MFET concept gives functional bonding its own
                terminal, separate from the protective MET, with a single connection between them.
                From 15 April 2026 this is regulatory, not advisory.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'BS EN 50173 is multi-part performance: -1 general, -2 office, -3 industrial, -4 residential, -5 data centre, -6 distributed buildings. BS EN 50174 is multi-part install practice: -1 spec & QA, -2 inside buildings, -3 outside. BS EN 50310 is ICT bonding. All three named verbatim in BS 7671 §444.410.',
              'BS 7671:2018+A4:2026 §444.1.3 verbatim: 2 m × 2 m maximum mesh size for the common meshed bonding star network in ICT-dense installations.',
              'BS 7671:2018+A4:2026 §444.4.9 verbatim: metal-free optical fibre is preferred between separate buildings with separate equipotential bonding systems.',
              'BS 7671:2018+A4:2026 §545 (NEW IN A4:2026): ICT functional earthing — 2.5 mm² Cu / 4 mm² Cu min CSAs, MFET concept, single connection to MET. §545.1.5 — combined protective + functional must satisfy protective requirements.',
              'The full UK stack for an office fit-out: BS 6701 + BS EN 50173-1 + -2 + BS EN 50174-1 + -2 + BS EN 50310 + BS EN 50346 + BS 7671:2018+A4:2026 (with §444 / §528 / §545 / §716 / §521.10.202 / §544.1.2). Approved Document B for fire-stopping. CDM 2015 for construction duties.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Class D, E, EA, F Standards
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Record-Keeping and Documentation
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule6Section3;
