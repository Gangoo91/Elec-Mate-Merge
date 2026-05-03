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
    id: 'datacabling-m1s1-six-subsystems',
    question:
      'A surveyor hands you a single-line drawing labelled with six numbered zones. Which of the following is NOT one of the six subsystems defined by structured cabling standards?',
    options: [
      'Entrance facilities (where external services enter the building).',
      'Equipment room (the main distributor / housing for active core equipment).',
      'Power distribution panels feeding the comms-room socket outlets.',
      'Horizontal cabling (telecoms-room to work-area outlet).',
    ],
    correctIndex: 2,
    explanation:
      "Power distribution is NOT a structured-cabling subsystem — it sits under BS 7671 (the wiring regs). The six subsystems are: (1) Entrance Facilities, (2) Equipment Room, (3) Backbone Cabling, (4) Telecommunications Room (also called Floor Distributor / Telecommunications Enclosure), (5) Horizontal Cabling, (6) Work Area. ANSI/TIA-568.0-E and ISO/IEC 11801-1 use slightly different naming (FD/BD/CD vs. ER/TR), but the six-zone model is identical. The comms-room sockets that feed switches are LV power and live in the BS 7671 world — they're a dependency on the cabling system, not part of it.",
  },
  {
    id: 'datacabling-m1s1-channel-rule',
    question:
      'You are designing a horizontal run from a floor distributor to a work-area outlet 92 m away (cable route, not straight-line). Your patch lead at the FD is 3 m and your work-area cord is 4 m. Is this a compliant Class EA / Cat6A channel?',
    options: [
      'Yes — total channel length is under 105 m, which is the absolute maximum.',
      'No — the permanent link itself exceeds the 90 m maximum, so the channel is non-compliant before the cords are even counted.',
      'Yes — as long as the equipment cord at the switch end is 0 m, the total still fits.',
      'No — but only because the work-area cord exceeds 3 m.',
    ],
    correctIndex: 1,
    explanation:
      'The 90 m limit applies to the PERMANENT LINK (outlet-to-FD), not the channel. ANSI/TIA-568.0-E and ISO/IEC 11801-1 both fix this. 92 m is non-compliant before you have even plugged a cord in. The 100 m channel total (= 90 m permanent link + up to 10 m cords combined) is the upper limit, and the permanent link cannot be traded for cord length. If you have to break the rule, you cannot — you split the run with a consolidation point or a second telecoms enclosure on the floor.',
  },
  {
    id: 'datacabling-m1s1-standards-landscape',
    question:
      'A UK contractor is specifying a Cat6A office fit-out and the architect asks "which standard governs this work?". What is the most accurate UK answer?',
    options: [
      'TIA-568.0-E only — it is the global standard.',
      'ISO/IEC 11801 — every other document is just a translation.',
      'BS EN 50173-1 (the harmonised European cabling standard, applicable in the UK), with installation governed by BS EN 50174-1/-2/-3 and earthing/bonding by BS EN 50310 — alongside BS 6701 for telecoms wiring inside the premises and BS 7671:2018+A4:2026 for any LV / ELV power dependencies (notably PoE under §716).',
      'BS 7671 alone — it covers all electrical work including data.',
    ],
    correctIndex: 2,
    explanation:
      'In the UK the harmonised European cabling standards apply: BS EN 50173 (performance), BS EN 50174 (planning/installation), BS EN 50310 (bonding & earthing of ICT equipment). These are aligned with ISO/IEC 11801 internationally; ANSI/TIA-568 is the North American counterpart and a useful reference but not the governing UK standard. BS 6701 covers customer-premises telecoms wiring and remains in force. From 15 April 2026, BS 7671:2018+A4:2026 §716 (PoE / ELV DC over balanced cabling) and §545 (ICT functional earthing) bring data-cabling concerns formally inside the wiring regulations.',
  },
  {
    id: 'datacabling-m1s1-service-independence',
    question:
      'The whole pitch for structured cabling is "service-independence." What does that actually mean for an installer on day one of a 20-year cabling life?',
    options: [
      'You only need to install one cable type, regardless of services.',
      'The infrastructure is sized to a defined performance Class (e.g. Class EA / Cat6A) and pinned to a topology, so it can carry whatever Layer-2/Layer-1 services the building needs over its life — Ethernet today, PoE++ for lighting/CCTV/access tomorrow, fibre uplinks at refresh — without having to be torn out and re-pulled when a service changes.',
      'You can use any cable, anywhere, for anything.',
      'It eliminates the need for telecoms rooms.',
    ],
    correctIndex: 1,
    explanation:
      "Service-independence is a SPECIFICATION discipline. You design and certify the cabling to a Class (governs frequency response, NEXT, return loss, etc.) and a topology (channel model, distance limits, connector counts). What you plug into it is the active layer's problem. Done well, the structure outlives 3-4 generations of switches, IP phones, cameras, lighting controllers and PoE devices. Done badly, the building gets re-cabled every refresh.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What single design rule is the spine of every horizontal run in a structured cabling system?',
    options: [
      'Cables must always be terminated to T568B.',
      'The 100 m channel rule: a maximum 90 m permanent link (work-area outlet to floor distributor) plus a combined 10 m of patch / equipment / work-area cords, totalling no more than 100 m.',
      'Every run must have at least one consolidation point.',
      'Patch panels must be black.',
    ],
    correctAnswer: 1,
    explanation:
      'The 100 m channel rule is fixed by both ANSI/TIA-568.0-E and ISO/IEC 11801-1 (and therefore BS EN 50173-1). It bounds the worst-case insertion loss and propagation delay budget that the active equipment expects. Within the 100 m, the permanent link cannot exceed 90 m because the cords are noisier (stranded conductors, more flex-cycles) and need to be allowed for. A run that exceeds 90 m on the permanent link cannot be rescued by shortening cords.',
  },
  {
    id: 2,
    question:
      'Which subsystem is responsible for cabling between floors / between buildings on a campus, providing the trunk that the floor distributors hang off?',
    options: [
      'Entrance facilities.',
      'Backbone cabling — vertical (riser) within a building, and inter-building (campus / Building Distributor to Campus Distributor) between buildings on a site.',
      'Horizontal cabling.',
      'Equipment room cabling.',
    ],
    correctAnswer: 1,
    explanation:
      'Backbone cabling carries traffic between distributors. Inside a building it is "vertical" or "riser" backbone (TR-to-ER / FD-to-BD); between buildings it is "campus" backbone (BD-to-CD). It is typically optical fibre over distance and at higher counts; copper backbone is permitted at lower aggregations and shorter distances. Horizontal cabling carries the last leg from the floor distributor to the work-area outlet.',
  },
  {
    id: 3,
    question:
      'Which UK / European standard is the primary harmonised document for the performance of generic structured cabling installed in commercial premises?',
    options: [
      'BS 7671:2018+A4:2026.',
      'BS EN 50173 (Information technology — Generic cabling systems). Part 1 covers general requirements; further parts cover application-specific environments (offices, industrial, residential, distributed buildings, data centres).',
      'BS 5266-1:2025.',
      'BS 7430.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50173 is the harmonised European generic-cabling standard (the ISO/IEC 11801 family at the international level). BS 7671 is the UK wiring regulation — it covers electrical safety; from A4:2026 it adds §716 for PoE and §545 for ICT functional earthing, but the cabling performance requirements live in BS EN 50173 / 50174. BS 5266-1 is emergency lighting. BS 7430 is earthing — relevant context for the bonding network but not the cabling specification.',
  },
  {
    id: 4,
    question:
      'A new build will support voice over IP, CCTV (PoE), wireless access points (PoE++), building management sensors, and may host a small server room in 2 years. What does "service-independence" require you to do at design stage?',
    options: [
      'Pull a different cable type for each service.',
      'Specify a Class / Category that headrooms the most demanding service expected over the cabling life (typically Cat6A / Class EA today, or fibre to the floor for high-density APs), provide enough outlet density to handle PoE growth, design containment and pathways with capacity and bend radii compatible with the cable type, and document the design as service-independent so future services slot in without re-cabling.',
      'Avoid PoE — it complicates the design.',
      'Defer the decision until a tenant moves in.',
    ],
    correctAnswer: 1,
    explanation:
      'Service-independence is delivered at SPEC time — by choosing performance Class, outlet density, and pathway capacity that absorbs the foreseeable services. PoE++ (Type 4, up to 90 W PSE / 71.3 W PD per IEEE 802.3bt) materially affects the cable thermal model — more current, more heat in bundles. BS EN 50174-2 and TIA TSB-184-A address bundle de-rating. A service-independent design specifies the Class AND the install practices that protect performance under loaded PoE.',
  },
  {
    id: 5,
    question:
      'Which two NEW BS 7671 sections — introduced in Amendment 4 (2026) — bring data cabling concerns formally inside the wiring regulations?',
    options: [
      'Sections 411 and 421.',
      'Sections 545 (ICT functional earthing) and 716 (PoE and ELV DC distribution over balanced cabling). Both are entirely new in BS 7671:2018+A4:2026, published 15 April 2026, and apply to installations designed from that date.',
      'Sections 528 and 543.',
      'Sections 444 and 521.',
    ],
    correctAnswer: 1,
    explanation:
      '§545 and §716 are entirely new in A4:2026. §716 covers Power over Ethernet (Type 1-4 per IEEE 802.3bt) and ELV DC distribution over the balanced cabling itself — with a hard regulatory cap of 750 mA per conductor (§716.523.2.101). §545 covers functional earthing of ICT equipment (a different concern from protective earthing under §543/544) — including the new MFET (main functional earthing terminal) concept and minimum 2.5 / 4 mm² Cu CSAs. Existing §444 (EMC), §528 (proximity to other circuits) and §521.10.202 (cables in escape routes — NOT §521.10.1) remain in force in A4:2026 and remain directly relevant to data cabling, but §545 and §716 are the brand-new additions.',
  },
  {
    id: 6,
    question:
      'You are running 24 Cat6A cables in a single bundle to a high-density AP cluster, all carrying Type 4 PoE++ continuously. What is the relevant install-practice consideration?',
    options: [
      'Bundle size has no effect — PoE is too small to matter.',
      'Bundle de-rating: continuous PoE current produces heat, and bundles trap heat. TIA TSB-184-A and BS EN 50174-2 address bundle size and de-rating; large continuous-PoE bundles may need to be limited in count, separated, or upgraded to a larger conductor (23 AWG, e.g. limited-power-conductor / LP-rated cable) to keep conductor temperature within insulation rating.',
      'You should run the bundle inside an earth-bonded steel tray.',
      'Bundles must always be cable-tied every 100 mm.',
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671:2018+A4:2026 §716.523.2.101 sets a hard regulatory cap of 750 mA per conductor for ELV DC distribution over balanced cabling, and §716.526.101 imposes the same 750 mA per contact at the connecting hardware. In a tight bundle, heat compounds — every loaded conductor adds to the bundle temperature, which raises insertion loss and stresses the insulation. TIA TSB-184-A (2017) and PD CLC/TR 50174-99-1:2015 (referenced from §716.523.1.101 NOTE 2) give the bundle-management guidance. Practical responses: limit bundle size, separate bundles physically, use 23 AWG cable, choose LP-rated cables, verify the manufacturer's PoE de-rating tables — and never exceed 750 mA per conductor under §716.",
  },
  {
    id: 7,
    question:
      'Why is "documentation" listed as part of every structured-cabling design — not just as a nicety?',
    options: [
      'It looks professional in tender submissions.',
      'Documentation is the artefact that LETS the cabling deliver its 15-20 year service-independent life: labelling (TIA-606-D / BS EN 50174-1), as-built drawings, test results, and an administration record. Without documentation, the next contractor cannot find a circuit, a fault cannot be isolated to the right link, and re-cabling becomes the cheapest fix — destroying the whole long-life value proposition.',
      'It is required by the warranty manufacturer only.',
      'It is required only on government contracts.',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-606-D (2021) and BS EN 50174-1 specify a labelling and administration discipline. Every link, every patch panel port, every outlet, every termination is uniquely identified and recorded. The records survive personnel changes. When a tenant churns, when a switch is replaced, when a fault is reported — the records are how the system stays usable. A cabling system without records is a one-shot installation that cannot be safely modified.',
  },
  {
    id: 8,
    question:
      'A first-fix electrician asks you "why are we putting a comms room HERE? It is awkward — the cleaners use that cupboard." How do you justify the location?',
    options: [
      "It's where the architect drew it; we follow drawings.",
      'The location is set by the 90 m horizontal-link constraint: every work-area outlet on the floor must be reachable within 90 m of cable run from the floor distributor, and the floor distributor lives in the comms room / telecoms enclosure. Backbone risers, cooling, power, and access also constrain it — but the 90 m radius is the first-order driver. Move it and you cannot reach all the outlets.',
      'It minimises rent.',
      'It is the cheapest place to install conduit.',
    ],
    correctAnswer: 1,
    explanation:
      'Telecommunications-room placement is governed first by the 90 m permanent-link rule. From the FD/TR, every horizontal cable on that floor must reach its outlet in 90 m of cable RUN — not straight-line. On large floor plates, that often forces multiple TRs per floor, or a TR somewhere central rather than tucked in a corner. BS EN 50174-2 and TIA-569-E address the room itself (size, environmental envelope 18-27 °C / 8-60 % RH per TIA-569-E-1, structural loading, power redundancy, access). The comms room is awkward because it has to be — the 90 m driver is non-negotiable.',
  },
  {
    id: 9,
    question:
      "Which of these IS a legitimate reason a structured-cabling system might need to be partly re-pulled within its 'design life'?",
    options: [
      'Anything is a legitimate reason; cabling is consumable.',
      'A genuine performance-step change that the original Class cannot meet — e.g. a building specced to Cat5e in 2008 needing 10GBASE-T at 100 m, which Cat5e cannot deliver. The original spec did its job; the building requirement changed beyond what was foreseeable. The fix is selective re-pulling to Cat6A or fibre to the affected areas, not condemnation of the whole system.',
      'A new manager preferring a different colour of cable.',
      'A change in the patch-panel vendor.',
    ],
    correctAnswer: 1,
    explanation:
      "Service-independence has limits. A spec that was reasonable in 2008 (Cat5e for gigabit) cannot deliver 10GBASE-T at 100 m channel — the cable's frequency response is fundamentally insufficient. That is a legitimate re-cable trigger. Within a Class, however, almost any service in scope should run without re-pulling. The art of the design is choosing a Class with enough headroom that the foreseeable services are absorbed.",
  },
  {
    id: 10,
    question:
      'A client says "we don\'t need structured cabling — we\'ll just run cables to the printer when the printer arrives." What is the cleanest first response?',
    options: [
      'Agree; structured cabling is over-engineering for small buildings.',
      'Show them the cost curve. Ad-hoc point-to-point cabling has low first-fit cost and exponentially rising maintain / extend cost; structured cabling has higher first-fit cost and near-flat lifecycle cost. Even a 4-5 year occupation crosses the break-even on most office fit-outs. Service-independence then unlocks IP voice, PoE lighting and access control without re-cabling — value the ad-hoc approach cannot deliver at all.',
      'Refuse the job.',
      'Tell them BS 7671 mandates it.',
    ],
    correctAnswer: 1,
    explanation:
      'Structured cabling is a TCO conversation, not a compliance conversation. The lifecycle cost curve is the most persuasive frame — backed by the service-independence story (one infrastructure, many services). BS 7671 does not "mandate" structured cabling; it regulates the LV/ELV power dimensions of it (§444 EMC, §528 proximity, §716 PoE in A4:2026). The case is technical and commercial, not legal — and that is the cleanest pitch.',
  },
];

const faqs = [
  {
    question: 'Is "structured cabling" a marketing term, or is it actually defined somewhere?',
    answer: (
      <>
        It is a defined technical concept. ANSI/TIA-568.0-E (2020), ISO/IEC 11801-1 (2017+
        amendments) and BS EN 50173-1 all define generic cabling systems with the same six-zone
        topology and the same channel model. "Structured" means: standardised topology + performance
        Classes/Categories + administration/documentation. Every part is described in
        publicly-available standards. The opposite — point-to-point ad-hoc cabling — has no
        equivalent standard because it has no consistent shape to standardise.
      </>
    ),
  },
  {
    question: 'What is the difference between Class and Category?',
    answer: (
      <>
        Category (Cat5e / Cat6 / Cat6A / Cat7 / Cat7A / Cat8) describes the cable and components —
        the parts. Class (Class D / E / EA / F / FA / I / II) describes the channel performance when
        those parts are installed and tested as a system. ANSI/TIA-568 uses Category terminology;
        ISO/IEC 11801 and BS EN 50173 use Class terminology. They map closely: Cat6A ≈ Class EA,
        Cat7A ≈ Class FA, Cat8 ≈ Class I/II. A Cat6A installation badly built will fail Class EA
        testing — Class is what the building actually has, Category is what was bought.
      </>
    ),
  },
  {
    question: 'Does structured cabling include fibre or only copper?',
    answer: (
      <>
        Both. Fibre is the dominant choice for backbone (BD-to-FD risers, CD-to-BD inter-building)
        and increasingly for fibre-to-the-edge architectures where work-area outlets are fed
        directly by fibre. Multimode (OM3 / OM4 / OM5) and single-mode (OS1a / OS2) are the media
        classes used in BS EN 50173-1. ANSI/TIA-568.3-E covers the optical-fibre side; the same
        six-subsystem topology and the same Class/Category discipline apply, just with different
        distance and performance budgets.
      </>
    ),
  },
  {
    question: 'How does BS 7671 fit into a structured cabling job?',
    answer: (
      <>
        Historically BS 7671 governed only the LV/ELV power that energises the active equipment.
        From <strong>15 April 2026</strong>, BS 7671:2018+A4:2026 introduces two new sections that
        bring cabling itself inside the regs: <strong>§716</strong> (PoE and ELV DC over balanced
        cabling — recognising that the cabling is also a power-distribution circuit) and{' '}
        <strong>§545</strong> (functional earthing of ICT equipment). Existing sections that already
        applied — <strong>§444</strong> (EMC / segregation), <strong>§528</strong> (proximity to
        other circuits), <strong>§521.10.202</strong> (cables in escape routes) — were strengthened
        in A4:2026. UK installers from April 2026 have a layered duty: BS EN 50173 / 50174 for
        cabling performance and install practice, AND BS 7671 §716 / §545 / §444 / §528 for the
        electrical-safety dimensions of the same job.
      </>
    ),
  },
  {
    question:
      'Can I run a structured cabling system without specifying one of the named Categories?',
    answer: (
      <>
        Technically yes, but you lose the warranty, the certification process, and the predictable
        upgrade path. The Categories / Classes exist precisely because they let an installer certify
        a job to a defined performance, hand over signed test results, and let the client plan
        service deployment against a known channel budget. Specifying "good cable" without a Class
        is an open invitation to a dispute. Pick a Class, certify to it, document it.
      </>
    ),
  },
  {
    question: 'Why 100 m and not 95 m or 110 m?',
    answer: (
      <>
        The 100 m channel limit is a worst-case insertion-loss and propagation-delay budget that
        100BASE-TX (1995) and every faster Ethernet variant since has had to live within. The 90 m
        permanent link plus 10 m cord allowance gives the cabling enough margin that the active
        equipment can decode the signal at the far end of any compliant installation. It is a hard
        limit — exceeding it is not a "performance hit", it is a cliff: the active equipment may
        simply fail to link or may auto-negotiate down to a lower speed. Newer services (10GBASE-T,
        25GBASE-T) preserve the same 100 m channel within the appropriate Class — Cat6A and above.
      </>
    ),
  },
];

const DataCablingModule1Section1 = () => {
  const navigate = useNavigate();

  useSEO(
    'What is Structured Cabling? | Data Cabling Module 1.1 | Elec-Mate',
    'Structured cabling fundamentals — the six subsystems, the 100 m channel rule, the standards landscape (ANSI/TIA-568.0-E, ISO/IEC 11801, BS EN 50173, BS 6701), and the new BS 7671:2018+A4:2026 sections (§716 PoE, §545 ICT functional earthing) that bring cabling inside the UK wiring regulations from 15 April 2026.'
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
            eyebrow="Module 1 · Section 1"
            title="What is Structured Cabling?"
            description="The six-subsystem model, the 100 m channel rule, and the layered UK standards landscape — ANSI/TIA-568.0-E, ISO/IEC 11801, BS EN 50173, BS 6701, and the new BS 7671:2018+A4:2026 sections (§716 PoE, §545 ICT functional earthing) — that together govern data cabling work in commercial premises from 15 April 2026."
            tone="yellow"
          />

          <TLDR
            points={[
              'Structured cabling is a standardised, building-wide telecoms infrastructure organised around six subsystems (entrance facilities, equipment room, backbone, telecoms room, horizontal cabling, work area). Designed once, certified to a Class, it carries many services for a 15-20 year life.',
              'The governing standards are layered: ANSI/TIA-568.0-E (US), ISO/IEC 11801-1 (international) and BS EN 50173-1 (Europe / UK) for performance; BS EN 50174 series for installation practice; BS EN 50310 for ICT bonding; BS 6701 for UK customer-premises telecoms wiring.',
              'The 100 m channel rule is the single most important design constraint: 90 m permanent link (work-area outlet to floor distributor) plus a combined 10 m of patch / equipment / work-area cords, totalling ≤ 100 m. The 90 m is fixed — it cannot be traded for cord length.',
              'From 15 April 2026, BS 7671:2018+A4:2026 brings cabling formally inside the wiring regulations: new §716 (PoE / ELV DC over balanced cabling) and new §545 (ICT functional earthing), alongside strengthened §444 (EMC) and §528 (proximity / segregation).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define structured cabling and explain why it is "service-independent" — the central pitch and the central design discipline',
              'Identify the six subsystems by name (Entrance Facilities, Equipment Room, Backbone, Telecoms Room / Floor Distributor, Horizontal Cabling, Work Area) and describe the role of each',
              'State the 100 m channel rule (90 m permanent link + 10 m cord allowance) and explain why the permanent link is fixed and not tradeable',
              'Map the UK / European standards landscape — BS EN 50173 (performance), BS EN 50174 (installation), BS EN 50310 (bonding), BS 6701 (customer-premises wiring) — and place TIA-568 and ISO/IEC 11801 within it',
              'Explain how BS 7671:2018+A4:2026 §716 (PoE / ELV DC) and §545 (ICT functional earthing) — entirely new in Amendment 4 — bring cabling concerns formally inside the wiring regulations from 15 April 2026',
              'Distinguish Class from Category, and pick a Class / Category that delivers service-independence over a realistic occupation life',
              'Recognise the practical effect of bundle de-rating under continuous PoE++ load (TIA TSB-184-A, BS EN 50174-2)',
              'Justify the location of the telecommunications room / floor distributor against the 90 m horizontal-link constraint, and articulate the lifecycle-cost case for structured cabling against an ad-hoc point-to-point alternative',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What "structured" actually means</ContentEyebrow>

          <ConceptBlock
            title="A standardised, building-wide infrastructure — designed once, used by everything"
            plainEnglish={`"Structured" cabling is a building's data nervous system, designed and installed to a defined topology (the six-subsystem model) and a defined performance Class. The opposite is "ad-hoc" or "point-to-point" cabling — one cable run for one device, a new run for the next device, no plan, no documentation. Structured cabling is the discipline that lets one cabling job support voice, data, video, building automation, security and PoE-powered services for fifteen-plus years without re-pulling.`}
            onSite="When you walk into a comms room and you see neat patch panels with port labels matching outlet labels, cables dressed into looms, a labelling scheme that survived three contractors, and a paper folder of test results from 2018 — you are looking at structured cabling that has done its job. When you see a snake pit of unidentified cables disappearing into a hole in the wall, you are looking at the alternative."
          >
            <p>The word "structured" carries two distinct meanings, both of which matter:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Topological structure.</strong> A defined hierarchy of zones — entrance
                facilities at the building edge, equipment room at the core, backbone connecting
                core to floors, floor distributors at each level, horizontal cabling out to work
                areas. This shape is identical across ANSI/TIA-568, ISO/IEC 11801 and BS EN 50173.
                Every job in scope of these standards has the same six-zone model.
              </li>
              <li>
                <strong>Performance structure.</strong> Defined performance Classes (D, E, EA, F,
                FA, I, II in the EN/ISO world) or Categories (5e, 6, 6A, 7, 7A, 8 in the TIA world)
                that bound the channel's frequency response, return loss, near-end crosstalk,
                propagation delay and other electrical / optical parameters. A Class EA installation
                is testable, certifiable, and warrantable to a known specification — regardless of
                what active equipment plugs into it.
              </li>
            </ul>
            <p>
              The historical pivot was the late 1980s. Before the first TIA-568 (1991), cabling was
              vendor-specific: IBM's Type 1, DEC's ThinNet, AT&amp;T's PDS, Token Ring's STP,
              Ethernet's coax. Each manufacturer specified their own cable, their own connectors,
              their own topology. Buildings ended up with parallel, incompatible cabling
              infrastructures. TIA-568 (and shortly afterwards ISO/IEC 11801) collapsed that into
              one generic, application-independent topology: balanced twisted-pair copper + optical
              fibre, defined Classes/Categories, defined channel model. That is the "structured" we
              still mean today.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="ANSI/TIA-568.0-E · §1 (Scope, paraphrased)"
            clause={
              <>
                This standard specifies a generic telecommunications cabling system that supports a
                multi-product, multi-vendor environment, and gives planning and installation
                guidelines for buildings prior to knowing what telecommunications applications will
                be run on the cabling. The intent is service-independence over an extended installed
                life.
              </>
            }
            meaning="The whole point of generic structured cabling is that you don't have to know what services will run on it. You design to a Class, you install to a topology, you test and certify, and you hand over a system that absorbs whatever Layer-1/Layer-2 services the building needs over its life. The day you have to ask 'what application is this for?' before pulling a cable, you have left structured cabling and re-entered the bad old days."
          />

          <ContentEyebrow>The six subsystems</ContentEyebrow>

          <ConceptBlock
            title="One topology, six named zones — the same in every standard"
            plainEnglish="The structured cabling topology is a hierarchy of six interconnected zones. Each has a defined role, a defined boundary, and a defined cabling type. The naming differs slightly between TIA and ISO/EN, but the model is identical."
            onSite="In a survey, your job is to walk the building and locate where each zone IS, not where it should be. The entrance facility is wherever the BT / Openreach / fibre service enters. The equipment room is the main core. Telecoms rooms are at floor level (one or more per floor). Horizontal runs out to work-area outlets. Get those locations right and the cable design follows."
          >
            <p>The six subsystems, in topological order from outside the building to the desk:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>1. Entrance Facilities (EF).</strong> The point at which external services —
                incoming Openreach copper, BT fibre, leased lines, ISP delivery — physically enter
                the building. Houses the demarcation between the carrier's network and the
                customer-premises wiring (governed in the UK by BS 6701). Typically a small wall
                cabinet at the building boundary.
              </li>
              <li>
                <strong>2. Equipment Room (ER).</strong> The main distribution / core of the
                building's telecoms infrastructure. Houses the main cross-connect (MC, also called
                the "campus distributor" CD in BS EN 50173 terminology), the building distributor
                (BD), and the active core equipment (chassis switches, routers, PBX).
                Environmentally controlled, secured.
              </li>
              <li>
                <strong>3. Backbone Cabling.</strong> The trunk between the ER and the floor
                distributors (vertical / riser backbone), and between buildings on a campus (campus
                / inter-building backbone). Typically optical fibre at higher core counts and longer
                distances; copper backbone permitted at lower aggregations and shorter runs.
              </li>
              <li>
                <strong>4. Telecommunications Room (TR) / Floor Distributor (FD).</strong> The
                floor-level distribution point. Houses the patch panels for that floor's horizontal
                cabling and the floor's edge switches. Sized so every horizontal cable on the floor
                reaches its outlet within 90 m of cable run.
              </li>
              <li>
                <strong>5. Horizontal Cabling.</strong> The cabling between the TR/FD and the
                work-area outlets — the "last mile" inside the building. Maximum 90 m permanent
                link. Balanced twisted-pair copper (Cat6A / Class EA is the typical 2026 default) or
                fibre.
              </li>
              <li>
                <strong>6. Work Area (WA).</strong> The end-user space — the desk, the wall socket,
                the AP location, the camera mount. Includes the outlet itself and the short cord
                that connects the outlet to the user's device.
              </li>
            </ul>
            <p>
              ANSI/TIA-568 uses ER/TR/WA terminology. ISO/IEC 11801 and BS EN 50173 use CD/BD/FD/TO
              terminology (Campus / Building / Floor Distributor and Telecommunications Outlet). The
              model is the same; the labels differ.
            </p>
          </ConceptBlock>

          {/* Six subsystems diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The six subsystems — service entry to work area
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="Hierarchical diagram of the six structured-cabling subsystems. At the top, the Entrance Facility (zone 1) receives the external carrier service. It connects down to the Equipment Room (zone 2) which houses the building distributor and core active equipment. The Backbone subsystem (zone 3) — shown as cyan dashed lines — runs from the Equipment Room down to one or more Telecommunications Rooms / Floor Distributors (zone 4) per floor. Horizontal cabling (zone 5) — shown as yellow solid lines — fans out from each Floor Distributor to the Work Area outlets (zone 6). A legend at the bottom maps each zone to its colour."
            >
              {/* ===== Row 1: Entrance Facility ===== */}
              <rect
                x="330"
                y="20"
                width="240"
                height="60"
                rx="8"
                fill="rgba(168,85,247,0.12)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="46"
                textAnchor="middle"
                fill="#C4B5FD"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                1 · ENTRANCE FACILITY (EF)
              </text>
              <text
                x="450"
                y="65"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                External services arrive · BS 6701 demarcation
              </text>

              {/* Connector EF -> ER (purple solid) */}
              <line x1="450" y1="80" x2="450" y2="130" stroke="#A855F7" strokeWidth="1.6" />

              {/* ===== Row 2: Equipment Room ===== */}
              <rect
                x="310"
                y="130"
                width="280"
                height="68"
                rx="8"
                fill="rgba(234,179,8,0.12)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="450"
                y="156"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                2 · EQUIPMENT ROOM (ER / BD)
              </text>
              <text
                x="450"
                y="175"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Building distributor · core switches / routers
              </text>
              <text
                x="450"
                y="191"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Environmentally controlled · secured
              </text>

              {/* ===== Backbone connectors (zone 3 — cyan dashed) — clear vertical zone, NO label overlay ===== */}
              <line
                x1="450"
                y1="198"
                x2="150"
                y2="290"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeDasharray="5 3"
              />
              <line
                x1="450"
                y1="198"
                x2="450"
                y2="290"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeDasharray="5 3"
              />
              <line
                x1="450"
                y1="198"
                x2="750"
                y2="290"
                stroke="#22D3EE"
                strokeWidth="1.6"
                strokeDasharray="5 3"
              />

              {/* ===== Row 4: Floor Distributors ===== */}
              <rect
                x="60"
                y="290"
                width="180"
                height="60"
                rx="8"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="150"
                y="316"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                4 · TELECOMS ROOM (FD)
              </text>
              <text
                x="150"
                y="335"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Floor 1 distributor
              </text>

              <rect
                x="360"
                y="290"
                width="180"
                height="60"
                rx="8"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="316"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                4 · TELECOMS ROOM (FD)
              </text>
              <text
                x="450"
                y="335"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Floor 2 distributor
              </text>

              <rect
                x="660"
                y="290"
                width="180"
                height="60"
                rx="8"
                fill="rgba(34,211,238,0.12)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="750"
                y="316"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                4 · TELECOMS ROOM (FD)
              </text>
              <text
                x="750"
                y="335"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Floor 3 distributor
              </text>

              {/* ===== Horizontal connectors (zone 5 — yellow solid) — clear vertical zone, NO label overlay ===== */}
              {[80, 150, 220].map((x, i) => (
                <line
                  key={'l1-' + i}
                  x1="150"
                  y1="350"
                  x2={x}
                  y2="438"
                  stroke="#FCD34D"
                  strokeWidth="1.2"
                />
              ))}
              {[380, 450, 520].map((x, i) => (
                <line
                  key={'l2-' + i}
                  x1="450"
                  y1="350"
                  x2={x}
                  y2="438"
                  stroke="#FCD34D"
                  strokeWidth="1.2"
                />
              ))}
              {[680, 750, 820].map((x, i) => (
                <line
                  key={'l3-' + i}
                  x1="750"
                  y1="350"
                  x2={x}
                  y2="438"
                  stroke="#FCD34D"
                  strokeWidth="1.2"
                />
              ))}

              {/* ===== Row 6: Work Areas ===== */}
              {[80, 150, 220, 380, 450, 520, 680, 750, 820].map((x, i) => (
                <g key={'wa-' + i}>
                  <rect
                    x={x - 18}
                    y="438"
                    width="36"
                    height="28"
                    rx="5"
                    fill="rgba(250,204,21,0.18)"
                    stroke="#FACC15"
                    strokeWidth="1.4"
                  />
                  <text
                    x={x}
                    y="456"
                    textAnchor="middle"
                    fill="#FEF3C7"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="system-ui"
                  >
                    WA
                  </text>
                </g>
              ))}

              {/* ===== Legend (mapping zones to colours) — below the diagram, clear of all lines ===== */}
              <rect
                x="60"
                y="500"
                width="780"
                height="156"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              {/* Legend header */}
              <text
                x="80"
                y="524"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEGEND
              </text>

              {/* Two-column legend */}
              {/* Column 1 */}
              <rect
                x="80"
                y="538"
                width="14"
                height="14"
                rx="3"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="104" y="550" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                1 · Entrance facility — service entry, BS 6701
              </text>

              <rect
                x="80"
                y="560"
                width="14"
                height="14"
                rx="3"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.4"
              />
              <text x="104" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                2 · Equipment room — main distributor, core kit
              </text>

              <line
                x1="80"
                y1="588"
                x2="94"
                y2="588"
                stroke="#22D3EE"
                strokeWidth="1.8"
                strokeDasharray="5 3"
              />
              <text x="104" y="592" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                3 · Backbone — vertical / riser, typically fibre
              </text>

              {/* Column 2 */}
              <rect
                x="460"
                y="538"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="484" y="550" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                4 · Telecoms room (FD) — floor distributor
              </text>

              <line x1="460" y1="568" x2="474" y2="568" stroke="#FCD34D" strokeWidth="1.8" />
              <text x="484" y="572" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                5 · Horizontal cabling — ≤ 90 m permanent link
              </text>

              <rect
                x="460"
                y="582"
                width="14"
                height="14"
                rx="3"
                fill="rgba(250,204,21,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text x="484" y="592" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                6 · Work area — telecom outlet (TO) + cord
              </text>

              {/* Standards footer (separate from legend) */}
              <line
                x1="80"
                y1="610"
                x2="820"
                y2="610"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              <text
                x="450"
                y="628"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="system-ui"
              >
                ANSI/TIA-568.0-E · ISO/IEC 11801-1 · BS EN 50173-1
              </text>
              <text
                x="450"
                y="646"
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
                fontFamily="system-ui"
              >
                From 15 April 2026 — BS 7671:2018+A4:2026 §716 (PoE/ELV DC) · §545 (ICT functional
                earthing)
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The 100 m channel rule</ContentEyebrow>

          <ConceptBlock
            title="The single design constraint that governs every horizontal run"
            plainEnglish="Every horizontal cable run is bounded by a 100 m total channel limit. Inside that, the permanent link (the bit installed inside the wall — wall-outlet to floor-distributor patch panel) cannot exceed 90 m. The remaining 10 m is the combined allowance for the patch cord at the FD, the equipment cord at the switch, and the work-area cord at the desk. Plus margin. The 100 m budget is fixed by Ethernet's worst-case insertion-loss and propagation-delay budget — it is not a guideline."
            onSite="On site, the 90 m number is the FIRST measurement you take. Before you specify cable type, before you order patch panels, before you site the comms room — you walk every proposed cable route from the candidate FD location to every proposed outlet, and you measure the cable run (not the straight-line distance — the actual route the cable will follow, with bends, drops, ceiling voids and trunking detours). If any run exceeds 90 m, the FD location must move, or you split the floor with a second FD, or you concede a consolidation point. The number is non-negotiable."
          >
            <p>The breakdown of the 100 m channel:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Permanent link (90 m max).</strong> The semi-permanent installed cable from
                the work-area outlet (TO / TCO) to the patch panel at the floor distributor (FD).
                Solid-conductor cable. Tested as a permanent link with TIA-1152-A field test
                parameters and / or BS EN 50346 compliance. This is what the contractor certifies
                and warrants.
              </li>
              <li>
                <strong>Cords (combined 10 m max).</strong> Three cords add up to the cord
                allowance: (a) the patch cord at the FD (between the patch panel and the floor
                switch), (b) the equipment cord at the ER (where backbone terminates), and (c) the
                work-area cord (between the outlet and the user device). All cords are stranded
                conductor — more flexible, more flex-cycle tolerant, slightly higher attenuation per
                metre than solid.
              </li>
              <li>
                <strong>Total channel (100 m max).</strong> The complete signal path from active
                equipment port to user device. This is what the active equipment "sees". Every
                Ethernet variant from 100BASE-TX (1995) to 10GBASE-T (2006) and 25GBASE-T /
                40GBASE-T (2016) preserves this 100 m budget when run on the appropriate Class /
                Category — Cat6A and above for 10G+.
              </li>
            </ul>
            <p>
              The 90 m permanent link cannot be "borrowed" from the 10 m cord allowance. They are
              separate budgets — the cord allowance accounts for the higher attenuation per metre of
              stranded cable and for connector losses at the patch points. Some standards permit a
              small cord-length increase if the permanent link is shorter than 90 m, but the
              contractor's safe planning rule is: 90 m permanent link, 10 m cords, don't compromise.
            </p>
          </ConceptBlock>

          {/* Channel model diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The 100 m channel — permanent link + cords
            </h4>
            <svg
              viewBox="0 0 880 380"
              className="w-full h-auto"
              role="img"
              aria-label="The 100 metre Ethernet channel model, drawn left to right. Five elements appear in sequence: the user device, a five metre work-area cord, the telecommunications outlet on the wall, the permanent link of up to 90 metres, the floor-distributor patch panel, a five metre patch cord, and the switch. All cord lengths add to a maximum 10 metres combined; the permanent link is fixed at 90 metres maximum and cannot be traded for cord length; the total channel from active port to active port is fixed at 100 metres maximum. Three rule notes at the bottom restate the constraints."
            >
              {/* ===== Cord-length labels (ABOVE the rectangles, clear of all shapes) ===== */}
              <text
                x="160"
                y="56"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                5 m WA cord
              </text>
              <text
                x="730"
                y="56"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                5 m patch cord
              </text>

              {/* ===== Element row (y=80 to y=124) ===== */}

              {/* 1. User device (PC icon) */}
              <rect
                x="30"
                y="80"
                width="56"
                height="44"
                rx="6"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="58"
                y="106"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PC
              </text>

              {/* 2. WA cord */}
              <rect
                x="100"
                y="92"
                width="120"
                height="20"
                rx="4"
                fill="rgba(34,211,238,0.14)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />

              {/* 3. TO outlet (small square) */}
              <rect
                x="232"
                y="86"
                width="32"
                height="32"
                rx="4"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text
                x="248"
                y="106"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TO
              </text>

              {/* 4. Permanent link (the central bar) */}
              <rect
                x="278"
                y="80"
                width="346"
                height="44"
                rx="6"
                fill="rgba(234,179,8,0.14)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="451"
                y="100"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PERMANENT LINK · ≤ 90 m
              </text>
              <text
                x="451"
                y="116"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="10"
                fontFamily="system-ui"
              >
                solid conductor · contractor-certified
              </text>

              {/* 5. FD patch panel (small rect) */}
              <rect
                x="638"
                y="86"
                width="40"
                height="32"
                rx="4"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text
                x="658"
                y="106"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                FD
              </text>

              {/* 6. Patch cord */}
              <rect
                x="690"
                y="92"
                width="80"
                height="20"
                rx="4"
                fill="rgba(34,211,238,0.14)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />

              {/* 7. Switch */}
              <rect
                x="784"
                y="80"
                width="56"
                height="44"
                rx="6"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="812"
                y="106"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                SW
              </text>

              {/* ===== Element labels (BELOW the rectangles, clear of all shapes) ===== */}
              <text
                x="58"
                y="148"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                User device
              </text>
              <text
                x="248"
                y="148"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Outlet (TO)
              </text>
              <text
                x="658"
                y="148"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Patch panel
              </text>
              <text
                x="812"
                y="148"
                textAnchor="middle"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Switch
              </text>

              {/* ===== Channel bracket (clear, well below the elements) ===== */}
              <line x1="30" y1="180" x2="30" y2="190" stroke="#FACC15" strokeWidth="1.6" />
              <line x1="840" y1="180" x2="840" y2="190" stroke="#FACC15" strokeWidth="1.6" />
              <line x1="30" y1="190" x2="840" y2="190" stroke="#FACC15" strokeWidth="1.6" />
              <text
                x="435"
                y="212"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                CHANNEL · ≤ 100 m total (active port to active port)
              </text>

              {/* ===== Rule footer ===== */}
              <rect
                x="30"
                y="240"
                width="810"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />

              <text
                x="50"
                y="266"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 1
              </text>
              <text x="120" y="266" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Permanent link ≤ 90 m. Solid conductor. Cannot be traded for cord length.
              </text>

              <text
                x="50"
                y="296"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 2
              </text>
              <text x="120" y="296" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Cord allowance ≤ 10 m combined (WA cord + patch cord + equipment cord). Stranded
                conductor.
              </text>

              <text
                x="50"
                y="326"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                RULE 3
              </text>
              <text x="120" y="326" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                Total channel ≤ 100 m. Fixed by Ethernet's worst-case insertion-loss /
              </text>
              <text x="120" y="344" fill="#E5E7EB" fontSize="11" fontFamily="system-ui">
                delay budget — every variant from 100BASE-TX to 25GBASE-T preserves it.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="ANSI/TIA-568.0-E · §6.2 (Generic balanced cabling channel — paraphrased)"
            clause={
              <>
                The maximum length of the horizontal cabling permanent link shall be 90 m. The
                maximum length of the channel — comprising the permanent link plus all cords used to
                connect the channel to active equipment and end-user devices — shall be 100 m. The
                10 m allowance for cords is a combined budget across the patch cord at the
                cross-connect, the equipment cord, and the work-area cord.
              </>
            }
            meaning="The 90 m and 100 m numbers are not 'targets' or 'guidelines'. They are HARD limits. Active Ethernet equipment auto-negotiates against them; exceed them and you will see speed degradation, link instability, or no link at all. Plan every horizontal run inside 90 m of cable RUN — not straight-line — and leave the 10 m as cord allowance. If you cannot, the FD must move."
            cite="See also ISO/IEC 11801-1 · §6.4.4 and BS EN 50173-1 · §6.4.4 — same rule, EN/ISO Class terminology."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The standards landscape</ContentEyebrow>

          <ConceptBlock
            title="A layered map — performance, installation, bonding, telecoms wiring, electrical safety"
            plainEnglish="Structured cabling sits at the intersection of several standard families. None of them, alone, governs the whole job. The competent contractor knows which standard answers which question."
            onSite="When a client / inspector / approving authority asks 'which standard does this comply with?' — the answer is plural. Performance: BS EN 50173. Installation: BS EN 50174. Bonding: BS EN 50310. UK telecoms wiring: BS 6701. LV/ELV power dependencies: BS 7671. International / North American cross-reference: ISO/IEC 11801 / ANSI/TIA-568."
          >
            <p>The relevant standards, by question they answer:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>"Will this cabling carry the services I need?" — performance.</strong> BS EN
                50173-1 (general), -2 (offices), -3 (industrial), -4 (residential), -5 (data
                centres), -6 (distributed buildings) and the linked ISO/IEC 11801 family. Defines
                Classes (D, E, EA, F, FA, I, II) — what the channel must measure when tested.
              </li>
              <li>
                <strong>"How do I install it correctly?" — installation practice.</strong> BS EN
                50174-1 (specification &amp; quality assurance), -2 (planning &amp; practices inside
                buildings), -3 (planning &amp; practices outside buildings). Bend radii, separation
                from power, pulling tensions, supports, identification.
              </li>
              <li>
                <strong>"How do I earth and bond the comms infrastructure?" — bonding.</strong> BS
                EN 50310 — the bonding network for ICT installations. Telecommunications Bonding
                Backbone (TBB), Telecommunications Grounding Busbar (TGB), Telecommunications Main
                Grounding Busbar (TMGB). From A4:2026 this couples to BS 7671 §545 (functional
                earthing of ICT equipment).
              </li>
              <li>
                <strong>
                  "What governs telecoms wiring inside UK customer premises?" — UK telecoms.
                </strong>{' '}
                BS 6701:2016+A1:2017 — UK customer-premises telecommunications wiring. Covers
                installation, demarcation, cabling within the building.
              </li>
              <li>
                <strong>
                  "What about the power that energises the active equipment — and now the power the
                  cabling itself carries?" — wiring regulations.
                </strong>{' '}
                BS 7671:2018+A4:2026 — UK wiring regulations. Always relevant for the LV / ELV power
                dependencies. From 15 April 2026, §716 covers PoE / ELV DC over the cabling itself,
                and §545 covers ICT functional earthing.
              </li>
              <li>
                <strong>
                  "What is the North American / international equivalent?" — TIA / ISO.
                </strong>{' '}
                ANSI/TIA-568.0-E (generic), -1-E (commercial), -2-E (balanced twisted-pair), -3-E
                (optical fibre); ANSI/TIA-569-E + Addendum 1 (2022) for telecoms spaces; -606-D
                (2021) for administration; -607-E (2024) for bonding. ISO/IEC 11801 family for
                international.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Standards cross-reference for UK structured cabling jobs"
            source="2026 — A4 alignment"
            headers={['Question', 'UK / European standard', 'International / TIA equivalent']}
            rows={[
              [
                'Cabling performance (Class / Category)',
                'BS EN 50173-1',
                'ISO/IEC 11801-1 · ANSI/TIA-568.0-E + .2-E + .3-E',
              ],
              [
                'Installation practice (planning, pulling, separation)',
                'BS EN 50174-1 / -2 / -3',
                'ANSI/TIA-569-E + Addendum 1 (2022) — telecoms spaces',
              ],
              ['ICT bonding network', 'BS EN 50310', 'ANSI/TIA-607-E (2024)'],
              ['Administration / labelling', 'BS EN 50174-1 §6', 'ANSI/TIA-606-D (2021)'],
              ['UK customer-premises telecoms wiring', 'BS 6701:2016+A1:2017', '— (UK-specific)'],
              ['LV / ELV electrical safety + (new) PoE', 'BS 7671:2018+A4:2026', '— (UK-specific)'],
              ['Data-centre infrastructure', 'BS EN 50600 series', 'ANSI/TIA-942-C (2024)'],
              ['Field test parameters', 'BS EN 50346', 'ANSI/TIA-1152-A'],
            ]}
            notes="From 15 April 2026, BS 7671:2018+A4:2026 §716 (PoE / ELV DC) and §545 (ICT functional earthing) bring data-cabling concerns formally inside the UK wiring regulations. Existing §444 (EMC), §528 (proximity / segregation) and §521.10.202 (cables in escape routes) were strengthened in A4:2026."
          />

          <ConceptBlock
            title="What's new in BS 7671 A4:2026 for data cabling"
            plainEnglish="Amendment 4 to BS 7671 publishes on 15 April 2026 and adds two entirely new sections that, for the first time, bring data cabling concerns formally inside the wiring regulations. From the same date, several existing sections that already touched data-cabling work are strengthened."
            onSite="On UK jobs designed from 15 April 2026, the contractor's standards stack is materially wider than it was in 2025. BS EN 50173 / 50174 still answer the cabling-performance and install-practice questions. BS 7671:2018+A4:2026 now answers a layer of electrical-safety questions that previously sat in BS 6701 or in informal guidance — PoE thermal limits, ELV DC distribution, ICT functional earthing, EMC segregation, escape-route cable behaviour."
          >
            <p>The four most consequential A4:2026 changes for data cabling:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>§716 — Power over Ethernet and ELV DC distribution.</strong>{' '}
                <AmendmentBadge regs={['716']} edition="A4:2026" /> Entirely new in A4:2026.
                Recognises that the balanced cabling carries DC power (PoE Type 1 through Type 4 per
                IEEE 802.3bt) and that the cabling is therefore also a power-distribution circuit.
                Requirements address bundle thermal management, conductor temperature limits,
                LP-rated (limited-power) cable selection, ELV DC circuit protection, and
                disconnection / isolation provisions.
              </li>
              <li>
                <strong>§545 — ICT functional earthing.</strong>{' '}
                <AmendmentBadge regs={['545']} edition="A4:2026" /> Entirely new in A4:2026.
                Distinguishes functional earthing of ICT equipment (signal reference, EMC) from
                protective earthing under §543/544 (electrical safety). Couples to BS EN 50310 — the
                bonding network for ICT installations.
              </li>
              <li>
                <strong>§444 — Measures against electromagnetic disturbances.</strong> Carried
                forward from earlier editions — not new in A4:2026, but directly relevant here.
                §444.410 explicitly cites BS EN 50174-1, BS EN 50174-2 and BS EN 50310 as the
                standards to apply for control / signalling / communication circuits inside
                buildings. §444.6.1 references §528 for shared-containment segregation, and §444.6.2
                sets a 130 mm minimum separation between ICT cables and HID lamps. Annex A444 Tables
                A444.1 / A444.2 give the segregation distances against containment type and supply
                current.
              </li>
              <li>
                <strong>§528 — Proximity to other circuits.</strong> Also carried forward — §528.2
                confirms that circuits of the same voltage band may still need segregation, and
                §528.3.x covers proximity to non-electrical services (heat, condensation, lift
                wells). The combination of §444 + §528 is the practical framework for Band I (data /
                ELV) vs Band II (LV power) separation inside containment.
              </li>
            </ul>
            <p>
              <strong>What this section does NOT cover:</strong> the verbatim clause text of §716 /
              §545 / §444 / §528 — those are the subject of <strong>Module 6</strong> (Standards),
              where each clause is reproduced from the BS 7671 RAG and walked through line by line.
              This section places them in the landscape; Module 6 reads them aloud.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §716.1 (Scope — verbatim)"
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
            meaning="§716 formally recognises that balanced ICT cabling is now a TWO-FUNCTION asset: a data transmission medium AND an ELV DC power distribution circuit. From 15 April 2026, every PoE installation in the UK is regulated by BS 7671 — not just the active equipment, but the cabling itself. The 750 mA per-conductor hard cap (§716.523.2.101) and SELV/PELV mandate (§716.410.3.3) apply to every Cat5e / Cat6 / Cat6A / Cat7 / Cat7A / Cat8.x deployment."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Why service-independence is the whole point</ContentEyebrow>

          <ConceptBlock
            title="One infrastructure, many services, fifteen years"
            plainEnglish="The economic argument for structured cabling is service-independence: design the cabling once to a Class with sufficient headroom, and the same infrastructure carries voice, data, video, building automation, security, PoE lighting, PoE access points, and emerging services for fifteen-plus years — without re-pulling. The discipline that delivers this is specification, not heroic installation. Service-independence is decided at design stage."
            onSite="A first-fit Cat6A install in 2026 with sensible bundle sizes, generous outlet density, and proper containment will absorb 10G to the desk, PoE++ for lighting, PoE for cameras and APs, IP-based BMS sensors, voice over IP, and whatever digital signage / smart-building services emerge through the 2030s. A first-fit Cat5e install will not. The choice that determines the answer is made at spec stage, before the first cable is pulled."
          >
            <p>Three concrete examples of what service-independence buys:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The IP-voice migration.</strong> An office cabled to Class EA / Cat6A in
                2014 needed no re-pulling when the analogue PBX was replaced with IP voice in 2019.
                The same horizontal infrastructure carried the IP phones. A Class D / Cat5
                installation from 2002 needed re-pulling — it was specified for 100 Mbps Ethernet
                and could not deliver the per-port bandwidth a modern IP-voice deployment expects.
              </li>
              <li>
                <strong>The PoE-everything wave.</strong> Cat6A installations are absorbing Type 4
                PoE++ (90 W PSE) for LED lighting, access-control devices, smart-building sensors,
                ceiling cameras, and high-density APs without infrastructure change. The cabling
                specification absorbed the service. Cat5e installations are partially absorbing PoE
                Type 2 / Type 3, but Type 4 thermal limits and the new BS 7671 §716 rules push them
                out of comfortable scope.
              </li>
              <li>
                <strong>The fibre-to-the-edge upgrade.</strong> Where service density justified it
                (data centres, large lecture theatres, broadcast facilities), forward-looking
                specifications added single-mode fibre to work areas alongside copper. That
                horizontal-fibre presence absorbed 25/40/100G services without re-pulling. The cost
                was paid at first fit, when access was easiest.
              </li>
            </ul>
            <p>
              The opposing case — ad-hoc point-to-point cabling — looks cheaper at year zero. The
              cost shows up in years two through twenty: every service refresh requires new cables;
              every fault is a forensic exercise; every move/add/change is a new pull. The lifecycle
              TCO crosses break-even on most office fit-outs inside 4-5 years. Beyond that,
              structured cabling is purely cheaper.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Treating Cat6A as a 10GBASE-T guarantee, regardless of install practice"
            whatHappens={
              <>
                Contractor specifies "Cat6A" because the building wants 10GBASE-T. Bundles 48 cables
                tightly through cable basket, runs them parallel to LV power for long stretches,
                terminates with rough strip-and-twist on a Friday. Tests come back marginal Class EA
                pass on a third of links, fail on a few. The 10G service is unstable. Client blames
                the cable. The cable was fine — the install delivered a Class E (or worse) channel
                from Cat6A components.
              </>
            }
            doInstead={
              <>
                Specify Cat6A AND specify the install practice that delivers Class EA in the
                channel: maximum bundle sizes (per BS EN 50174-2 / TIA TSB-184-A), separation from
                LV power (BS 7671 §444 + §528), proper bend radii at terminations, factory or
                torque-controlled terminations, and end-of-job channel testing to TIA-1152-A / BS EN
                50346 with documented results. Class is what gets installed; Category is what gets
                bought.
              </>
            }
          />

          <Scenario
            title="The architect asks for 'a fibre backbone' — where do you actually start?"
            situation={
              <>
                A retrofit project. The architect's brief mentions a "fibre backbone" between the
                basement comms room and three upper floors, plus "Cat6A horizontal" on each floor.
                The QS has costed it as a single budget line. You have been engaged to design.
              </>
            }
            whatToDo={
              <>
                Translate "fibre backbone" into the structured-cabling six-zone model: Building
                Distributor in the basement ER, Floor Distributors on each upper floor, fibre
                between them. Pick a fibre type against the distance and service horizon — OM4
                multimode is the typical 10G/40G choice within a building under 150 m; OS2
                single-mode for longer reaches and higher per-fibre service rates. Pick a core count
                against current and future floor-switch uplink demand, plus growth spares. Specify
                the patch panels, the connector type (LC duplex is the modern default), and the
                pulling / splicing practice (BS EN 50174-2). Site each FD so every horizontal Cat6A
                run on the floor stays inside 90 m of cable run; if it doesn't, the FD moves or the
                floor takes a second FD. Then — and only then — price it.
              </>
            }
            whyItMatters={
              <>
                "A fibre backbone and Cat6A horizontal" is two budget lines, not one. The fibre
                backbone is sized against future service density (which the architect rarely knows).
                The horizontal is sized against the 90 m permanent-link rule, which directly drives
                FD location and therefore room layout. Get the design wrong at spec stage and you
                are re-pulling cable inside three years.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'Structured cabling = standardised topology (six subsystems) + standardised performance (Class / Category) + administration (BS EN 50174-1 / TIA-606-D). All three are required.',
              '90 m permanent link + 10 m cord allowance = 100 m channel. The 90 m is the first measurement on every site survey. Non-negotiable.',
              "From 15 April 2026: BS 7671:2018+A4:2026 §716 (PoE / ELV DC) and §545 (ICT functional earthing) are entirely new sections. They sit alongside BS EN 50173 / 50174 / 50310 — they don't replace them.",
              'Class is what you have; Category is what you bought. Class EA from Cat6A components requires correct install practice — not just the right cable.',
              'Service-independence is decided at design stage. Specify Class, outlet density, and pathway capacity for the foreseeable services — the cabling absorbs them for 15-20 years without re-pulling.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Module 1
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-1-section-2')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next section: Topologies
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule1Section1;
