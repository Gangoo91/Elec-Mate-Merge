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
    id: 'datacabling-m6s4-tia-606-purpose',
    question:
      'A facilities manager challenges a contractor: "why do we need TIA-606-D labelling on every link, port and outlet — what does it actually buy us?". What is the strongest answer?',
    options: [
      'It looks more professional and helps with manufacturer warranty registration only.',
      'TIA-606-D administration is what LETS the cabling deliver its 15-20 year service-independent life. Without a defined identifier hierarchy, as-built drawings, test records and a maintained administration register, the next contractor cannot find a circuit, faults cannot be isolated to the right link, every move/add/change becomes a treasure hunt, and re-cabling becomes the cheapest fix — destroying the long-life value proposition. Documentation is the artefact that makes the system maintainable.',
      'It is required only on government contracts.',
      'It satisfies the manufacturer warranty but has no operational value.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-606-D and BS EN 50174-1 §6 specify the labelling and administration discipline that makes a cabling system maintainable across decades. The discipline is operational, not cosmetic. A cabling system without records is a one-shot installation that cannot be safely modified — the moment the original installer is unavailable, every change becomes destructive. The economics are stark: documentation costs ~1-2 % of install cost; lack of documentation costs 100 % of install cost when the system is replaced prematurely.',
  },
  {
    id: 'datacabling-m6s4-identifier-hierarchy',
    question:
      'A patch panel port label reads "B1-FL3-TR2-PP1-P14". What is this and what does it tell you?',
    options: [
      'A serial number for warranty purposes only.',
      'A TIA-606-D / BS EN 50174-1 §6 hierarchical identifier: Building 1, Floor 3, Telecommunications Room 2, Patch Panel 1, Port 14. The label uniquely locates this port in the entire building inventory and lets the corresponding outlet at the work-area end carry the same identifier so the link is traceable end-to-end.',
      'A random reference set by the manufacturer.',
      'A cable colour code.',
    ],
    correctIndex: 1,
    explanation:
      'The hierarchical identifier (Building → Floor → TR → Panel → Port) is the spine of TIA-606-D administration. Both ends of every link carry the same identifier so the connection is traceable. The format may vary (some installs use "/", "_" or "." as separators), but the hierarchy is constant. Without it, finding which patch panel port serves which desk outlet on day 365 is a continuity-tester exercise repeated for every move/add/change.',
  },
  {
    id: 'datacabling-m6s4-handover-pack',
    question:
      'At project sign-off, what should the contractor hand over as the "as-built" pack for a structured cabling install?',
    options: [
      'A copy of the original design drawings only.',
      'As-built drawings (showing actual run routes / outlet positions, marked-up against design); 100 % link test results in PDF / native test-tool format with the test instrument identified and calibration date; the labelling and identifier register; manufacturer warranty registration evidence; a copy of the BS EN 50174-1 §6 / TIA-606-D administration record; and any change-control log from variations during install. All cross-referenced and indexed.',
      'A USB stick with PDF drawings.',
      'A verbal walk-through of the comms room.',
    ],
    correctIndex: 1,
    explanation:
      'The handover pack is the deliverable that converts "an installed cable plant" into "a maintainable system". As-built drawings reflect what was actually installed (not what was designed); test results document the Class achieved; identifiers tie back to BS EN 50174-1 §6 / TIA-606-D records; warranty evidence preserves the manufacturer commitment; the change log captures variations. Without this pack, the client owns infrastructure they cannot modify safely. With it, they own a 15-20 year service-independent asset.',
  },
  {
    id: 'datacabling-m6s4-bs7671-cert',
    question:
      'BS 7671:2018+A4:2026 Part 6 governs certification (Electrical Installation Certificate, Minor Works, EICR). On a structured cabling install with a PoE deployment under §716, how does the BS 7671 certification interact with the cabling administration?',
    options: [
      'BS 7671 certification covers everything — no separate cabling records needed.',
      'They are parallel, complementary records. BS 7671 Part 6 certification covers the LV / ELV electrical safety dimensions of the install (the §716 PoE circuits, the §545 functional earthing, the §444 EMC measures, the §544.1.2 main bonding, and any §521.10.202 escape-route considerations). The cabling administration (TIA-606-D / BS EN 50174-1 §6) covers the physical infrastructure — Classes achieved, link inventory, as-built drawings, manufacturer warranty. The two packs reference each other but do not replace each other.',
      'BS 7671 certification is irrelevant on a cabling job.',
      'BS 7671 replaces TIA-606-D from A4:2026.',
    ],
    correctIndex: 1,
    explanation:
      'BS 7671 Part 6 certification (EIC for new installs, Minor Works for additions, EICR for periodic inspection) addresses electrical safety. Cabling administration (TIA-606-D / BS EN 50174-1 §6) addresses physical infrastructure and performance. From 15 April 2026, with §716 (PoE) and §545 (ICT functional earthing) in play, a structured-cabling install will commonly produce BOTH packs — an EIC for the §716 / §545 / §444 elements, and a cabling handover pack for the Class certification, identifiers and as-builts. They are complementary, not substitutable.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which two standards specify the administration / labelling / records discipline for structured cabling — one TIA, one EN?',
    options: [
      'TIA-568.0-E (TIA) and BS EN 50173-1 (EN).',
      'ANSI/TIA-606-D (2021) (TIA — Administration Standard for Telecommunications Infrastructure) and BS EN 50174-1 §6 (EN — Specification & QA, administration section).',
      'TIA-942-C (TIA) and BS EN 50310 (EN).',
      'TIA-1152-A (TIA) and BS EN 50346 (EN).',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-606-D (administration) and BS EN 50174-1 §6 (administration section) are the two standards. They are broadly aligned — both define a hierarchical identifier scheme (TR / link / outlet identifier formats), records to be maintained, and as-built documentation requirements. BS 7671 §444.410(a) makes BS EN 50174-1 mandatory in UK buildings, so on a UK install the EN is the regulatory pointer.',
  },
  {
    id: 2,
    question:
      'You read a cable label "B1-FL3-TR2-PP1-P14". What identifier hierarchy does this reflect?',
    options: [
      'A part number.',
      'Hierarchical TIA-606-D / BS EN 50174-1 §6 identifier: Building → Floor → TR → Patch Panel → Port. Both ends of the link should carry the same identifier so the connection is end-to-end traceable.',
      'A test result code.',
      'A manufacturer batch number.',
    ],
    correctAnswer: 1,
    explanation:
      'Hierarchical Building / Floor / TR / Panel / Port. The hierarchy is what makes the identifier unique across the building inventory; both ends of the link carry the same identifier; the corresponding outlet has the matching label. Specific separators ("/", "_", "-", ".") vary by install but the hierarchy is constant.',
  },
  {
    id: 3,
    question: 'What does the as-built drawing in a cabling handover pack reflect?',
    options: [
      'The original design intent only.',
      'What was ACTUALLY installed — including any deviations from the original design (re-routed runs, relocated outlets, added consolidation points, modified TR layout). Marked up against the original design drawings, with variations noted, dated and authorised.',
      'A future expansion plan.',
      'A site safety plan.',
    ],
    correctAnswer: 1,
    explanation:
      'As-built means what was installed, not what was designed. Variations during install — and there are always some — must be captured: re-routed runs (perhaps to dodge a discovered service), relocated outlets, added consolidation points, modified TR layouts. Without as-builts, the next contractor is reading fiction; faults cannot be traced; future changes risk damaging unknown installed infrastructure.',
  },
  {
    id: 4,
    question:
      'Which BS EN 50174-1 sub-clause is the EN equivalent to TIA-606-D administration discipline?',
    options: [
      'BS EN 50174-1 §3 — terminology.',
      'BS EN 50174-1 §6 — Administration / records / labelling.',
      'BS EN 50174-1 §10 — testing.',
      'BS EN 50174-1 §1 — scope.',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 50174-1 §6 is the administration section — identifier hierarchy, records, change control, labelling discipline. It is the EN equivalent of TIA-606-D. Because §444.410(a) makes BS EN 50174-1 mandatory in UK buildings, a UK contractor must demonstrate compliance with the EN administration discipline; TIA-606-D remains valid international cross-reference.',
  },
  {
    id: 5,
    question:
      'Verbatim from BS 7671:2018+A4:2026 §544.1.2, where shall the main protective bonding connection to extraneous-conductive-parts be made?',
    options: [
      'Anywhere convenient.',
      '"as near as practicable to the point of entry of that part into the premises... within 600 mm of the meter outlet union or at the point of entry to the building if the meter is external".',
      'At the consumer unit only.',
      'On the building roof.',
    ],
    correctAnswer: 1,
    explanation:
      '§544.1.2 verbatim: as near as practicable to the point of entry; within 600 mm of the meter outlet union; before any branch pipework. This is the "where to bond" headline number for a UK install — and it is one of the connection points that must be documented in the handover pack alongside cabling administration. The 600 mm rule shows up on the EIC and on the as-built drawings.',
  },
  {
    id: 6,
    question:
      'Which of the following IS a legitimate component of the handover pack for a structured cabling install?',
    options: [
      'The original design drawings only.',
      'As-built drawings + 100 % link test results (in PDF and native test-tool format, with instrument ID and calibration date) + identifier register + manufacturer warranty evidence + change-control log + indexed cross-reference.',
      'A verbal walk-through.',
      'A photo of the comms room.',
    ],
    correctAnswer: 1,
    explanation:
      'The handover pack is the deliverable that turns "installed cable plant" into "maintainable system". Six items: as-builts, test results, identifier register, warranty evidence, change log, index. Anything less is not a complete handover — and operational consequences arrive within 12-24 months when changes start.',
  },
  {
    id: 7,
    question: 'Why is manufacturer warranty registration part of the handover pack?',
    options: [
      'It is decorative.',
      'Most manufacturer warranties on structured cabling components require registration within a specified period (typically 30-90 days post-install) and require evidence of approved installer + Class certification. Without registration evidence in the handover pack, the warranty (often 20-25 years) may not be enforceable when the client needs it five years later.',
      'It substitutes for testing.',
      'It is required only on fibre installs.',
    ],
    correctAnswer: 1,
    explanation:
      'Manufacturer warranties — typically 20-25 years on the cabling system — require registration and evidence of approved-installer status. The handover pack carries the proof. Without it, the warranty is theoretical: when a fault appears in year 7, the client is asked for the registration evidence and cannot produce it, so the warranty claim fails. Warranty registration is part of the handover, not optional.',
  },
  {
    id: 8,
    question:
      'How does BS 7671:2018+A4:2026 Part 6 certification (Electrical Installation Certificate, Minor Works, EICR) interact with cabling administration on a §716 PoE install?',
    options: [
      'They are the same document.',
      'They are PARALLEL, COMPLEMENTARY records. BS 7671 Part 6 certification covers the electrical-safety dimensions (§716 PoE, §545 functional earthing, §444 EMC, §544.1.2 main bonding, §521.10.202 escape-route considerations). Cabling administration (TIA-606-D / BS EN 50174-1 §6) covers the physical infrastructure (Classes, link inventory, as-builts, warranty). The two packs reference each other but do not replace each other.',
      'BS 7671 certification replaces cabling administration from A4:2026.',
      'Cabling administration replaces BS 7671 certification.',
    ],
    correctAnswer: 1,
    explanation:
      'Two parallel record streams. BS 7671 Part 6 covers electrical safety. Cabling administration covers performance and physical infrastructure. From 15 April 2026, with §716 and §545 in scope, both packs are produced on a typical structured-cabling install with PoE — the EIC documents the regulatory compliance; the cabling pack documents the Class certification and physical record.',
  },
  {
    id: 9,
    question:
      'A change is made to a cabling system in year 3 (a new outlet is added in an office). What records must be updated and where?',
    options: [
      'No records need updating.',
      'The identifier register (new outlet identifier, new patch panel port identifier, link traceability), the as-built drawings (new outlet location, new horizontal run route), the test results (the new link tested to its Class), the warranty register (if the change involves new components from the warranty programme), and the change-control log (date, description, authorised by, tested by). The same TIA-606-D / BS EN 50174-1 §6 discipline applies to a year-3 change as to the original install.',
      'A verbal note to the facilities manager.',
      'Only the test results.',
    ],
    correctAnswer: 1,
    explanation:
      "Change control is part of the lifecycle administration. A new outlet means: identifier register updated, as-builts updated, link tested and added to test record, warranty maintained, change logged. Skip any one and the system{`'`}s administration drifts from the install — and within a few cycles the records are unreliable. The handover pack only stays useful if it is maintained.",
  },
  {
    id: 10,
    question:
      'You inherit a 2015-vintage office cabling install with no records — no identifier register, no as-builts, no test results, no warranty registration. What is the right immediate action?',
    options: [
      'Continue working — records are optional.',
      'Treat the cabling as unverified. Commission a full re-survey: continuity / link mapping every link to recover the identifier hierarchy; produce as-built drawings from physical inspection; channel-test every link to its Class; document what is found; contact the manufacturer about retrospective warranty status (often unrecoverable). This is expensive but it converts an unmaintainable system into a maintainable one — and it is far cheaper than re-cabling.',
      'Re-cable the entire building immediately.',
      'Replace all components blindly.',
    ],
    correctAnswer: 1,
    explanation:
      'No records = unverified system. The recovery path is a re-survey + retrospective administration build: link mapping recovers the identifier hierarchy; physical inspection produces as-builts; channel testing documents the Class; manufacturer engagement attempts warranty recovery. Expensive (typically 5-15 % of original install cost) but converts a one-shot system into a maintainable one. Re-cabling is the alternative — and it is more expensive than recovery in almost every case.',
  },
];

const faqs = [
  {
    question: 'Why does TIA-606-D care so much about identifier hierarchy?',
    answer: (
      <>
        Because the identifier IS the lookup key for everything else. Every fault report, every
        move/add/change, every test result, every warranty claim references the link by its
        identifier. Without a defined hierarchy, the identifier becomes ambiguous — {`"`}port 14 on
        the patch panel{`"`} could be panel 1 in TR1 or panel 1 in TR2 across the building. With the
        hierarchy (Building / Floor / TR / Panel / Port), every identifier is unique and
        unambiguous. The discipline costs about 1-2 % of install cost; the operational value
        compounds across the system{`'`}s 15-20 year life.
      </>
    ),
  },
  {
    question:
      'Why do manufacturer warranties require registration with evidence of approved installer status?',
    answer: (
      <>
        Manufacturer warranties on structured cabling typically run 20-25 years and cover both
        components and channel performance. They are economically viable for the manufacturer ONLY
        because they are conditional: components must be installed by an approved installer per the
        manufacturer{`'`}s training, the channel must be Class-certified, and the registration must
        be filed within a defined window. Without registration evidence, the manufacturer has no
        record of who installed the system or whether it tested compliant — and the warranty cannot
        be honoured. The handover pack is the evidence. No pack, no warranty.
      </>
    ),
  },
  {
    question: 'Does BS 7671 require the cabling handover pack itself, or just the EIC?',
    answer: (
      <>
        BS 7671 Part 6 governs the EIC, Minor Works certificate and EICR — those are regulatorily
        mandatory on any UK electrical installation. They cover the §716 / §545 / §444 / §544.1.2 /
        §521.10.202 dimensions. The cabling handover pack (TIA-606-D / BS EN 50174-1 §6) is
        regulatorily mandatory under BS 7671 §444.410(a) — which makes BS EN 50174-1 a {`"`}shall be
        applied{`"`} document — but specifically it is §6 of BS EN 50174-1 (the administration
        section) that defines the handover discipline. So technically: the EIC is required by BS
        7671 Part 6; the cabling pack is required by BS EN 50174-1 §6, which is itself required by
        BS 7671 §444.410(a). Two paths to the same answer: both are mandatory.
      </>
    ),
  },
  {
    question: 'What goes in a "change-control log" for ongoing cabling work?',
    answer: (
      <>
        Every non-trivial change to the installed cabling. Date of change. Description (new outlet
        added; existing link replaced; patch panel relocated; new TR commissioned). Who authorised
        it (client representative, facilities manager). Who carried it out (named contractor, named
        technician, approved-installer status). What testing was performed (channel test result,
        identifier register update, as-built mark-up). What records were updated (identifier
        register, drawings, test pack, warranty file). The log is the running journal that keeps the
        handover pack honest — without it, the pack drifts from reality across years 3, 5, 7 of
        operation, and the value of the original administration is lost.
      </>
    ),
  },
  {
    question: 'Is documentation actually required by BS 7671, or just by the cabling standards?',
    answer: (
      <>
        Both, separately. BS 7671 Part 6 requires certification documentation (EIC, Minor Works,
        EICR) for the electrical-safety dimensions of any UK installation. BS 7671 §444.410(a) makes
        BS EN 50174-1 mandatory inside UK buildings — and BS EN 50174-1 §6 contains the
        administration / labelling / records discipline. So documentation is required by BS 7671
        through TWO separate routes: directly (Part 6 certification) and indirectly (§444.410 + BS
        EN 50174-1 §6). On a §716 PoE install, the contractor produces both packs — an EIC (or
        several certificates if there are multiple sub-installations) AND the cabling handover pack
        with as-builts / test results / identifier register / warranty registration. Skipping either
        is non-compliance.
      </>
    ),
  },
  {
    question: 'How long do the records need to be retained?',
    answer: (
      <>
        BS EN 50174-1 §6 expects records to be maintained for the lifetime of the installation —
        typically 15-20 years for structured cabling, 25 years for the manufacturer warranty period
        if applicable. BS 7671 Part 6 certificates similarly need to be retained for the life of the
        installation and presented at the next periodic inspection. Practical retention discipline:
        digital copies in the client{`'`}s facilities-management system, backed up; physical copies
        at the comms-room handover binder; manufacturer warranty copies retained both at client and
        at approved-installer end. The cost of retention is zero compared to the cost of recovery if
        the records are lost.
      </>
    ),
  },
];

const DataCablingModule6Section4 = () => {
  const navigate = useNavigate();

  useSEO(
    'Record-Keeping and Documentation | Data Cabling Module 6.4 | Elec-Mate',
    'TIA-606-D administration and BS EN 50174-1 §6 — the labelling identifier hierarchy, as-built drawings, test results, manufacturer warranty registration, the handover pack, ongoing change control. How BS 7671 Part 6 certification interacts with cabling administration. Verbatim BS 7671:2018+A4:2026 §544.1.2 (main bonding connection point) as an example of "documentation that must follow connections".'
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
            eyebrow="Module 6 · Section 4"
            title="Record-Keeping and Documentation"
            description="The discipline that makes a structured cabling system maintainable across its 15-20 year service-independent life. ANSI/TIA-606-D (2021) administration and BS EN 50174-1 §6 — the identifier hierarchy, as-built drawings, test results, manufacturer warranty registration, the handover pack and ongoing change control. How BS 7671:2018+A4:2026 Part 6 certification interacts with cabling administration on a §716 PoE / §545 functional earthing install — verbatim §544.1.2 as an example of documentation that must follow connections."
            tone="yellow"
          />

          <TLDR
            points={[
              'TIA-606-D (2021) and BS EN 50174-1 §6 specify the administration / labelling / records discipline. Both define a hierarchical identifier scheme (Building → Floor → TR → Panel → Port), require maintained as-built drawings, link test records, and an administration register. BS 7671 §444.410(a) makes BS EN 50174-1 mandatory in UK buildings.',
              'The identifier hierarchy is the spine: every link, every port, every outlet carries a unique hierarchical identifier visible at both ends. Without it, finding which patch panel port serves which desk on day 365 is a continuity-tester exercise repeated for every move/add/change.',
              'The handover pack converts "installed cable plant" into "maintainable system": as-built drawings + 100 % link test results + identifier register + manufacturer warranty registration evidence + change-control log + indexed cross-reference. Six items, all required.',
              'BS 7671 Part 6 certification (EIC / Minor Works / EICR) and the cabling administration pack are PARALLEL, complementary records. From 15 April 2026, with §716 PoE and §545 ICT functional earthing in play, both packs are produced on a typical structured-cabling install. They reference each other but do not replace each other.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State why TIA-606-D / BS EN 50174-1 §6 administration is the discipline that delivers the cabling system's 15-20 year service-independent life — and what happens without it",
              'Describe the hierarchical identifier scheme (Building → Floor → TR → Panel → Port) and read a typical label correctly',
              'List the six components of the handover pack: as-built drawings, link test results, identifier register, manufacturer warranty evidence, change-control log, indexed cross-reference',
              'Explain how BS 7671 Part 6 certification (EIC / Minor Works / EICR) interacts with cabling administration on a §716 / §545 install — parallel, complementary, both mandatory',
              'Quote BS 7671:2018+A4:2026 §544.1.2 verbatim and explain why "documentation must follow connections" — the main bonding connection point is required to be made within 600 mm of the meter outlet union, and that location must be recorded',
              'Describe ongoing change control: every non-trivial change to the installed cabling is logged with date, authoriser, contractor, testing performed and records updated',
              'Explain why manufacturer warranties (typically 20-25 years) require registration with evidence of approved-installer status and Class certification — and why the handover pack carries the evidence',
              'Recover an undocumented inherited cabling system through retrospective survey, as-built drawing, channel testing and (where possible) warranty re-registration',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Why documentation is the discipline, not the paperwork</ContentEyebrow>

          <ConceptBlock
            title="The administration record is what LETS the cabling system deliver its 15-20 year life"
            plainEnglish={`A structured cabling system is sold on the promise of service-independence — one infrastructure carrying many services across 15-20 years without re-cabling. That promise is only deliverable if the system is MAINTAINABLE. Maintainability requires records: every link uniquely identified, every change traceable, every fault locatable, every test result recoverable. Without records, the system is a one-shot install — the moment the original installer is unavailable, every change becomes destructive, every fault is a forensic exercise, and re-cabling becomes the cheapest fix.`}
            onSite="The economic stakes are stark. Documentation costs ~1-2 % of the install cost. Lack of documentation costs 100 % of the install cost when the system is replaced prematurely 8-10 years in because nobody can safely modify it. Every move/add/change in an undocumented building takes 3-5× longer than in a documented one. Across a 20-year operational life, the lifecycle saving from sound administration is measurable in tens of thousands of pounds on even a small office fit-out."
          >
            <p>The two governing standards for cabling administration:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>ANSI/TIA-606-D (2021).</strong> Administration Standard for
                Telecommunications Infrastructure. Defines the identifier hierarchy, the labelling
                rules, the records to be maintained, the change-management discipline.
              </li>
              <li>
                <strong>BS EN 50174-1 §6.</strong> The administration section of the EN
                install-practice standard. Broadly aligned with TIA-606-D; named verbatim in BS 7671
                §444.410(a) as a {`"`}shall be applied{`"`} document inside UK buildings.
              </li>
            </ul>
            <p>
              The two are aligned but not identical. TIA-606-D is the standalone administration
              standard at the international level; BS EN 50174-1 §6 is the administration sub-clause
              of the EN install-practice standard. On a UK install, BS EN 50174-1 §6 is the
              regulatorily mandatory pointer (via BS 7671 §444.410(a)); TIA-606-D remains valid
              international cross-reference and is what the inspector at a global tenant{`'`}s UK
              office will commonly ask for by name.
            </p>
            <p>
              Both standards prescribe the same five core artefacts: an identifier scheme, a
              labelling discipline, an administration register, as-built drawings, and a
              change-control mechanism. Sections below take each in turn.
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
            meaning="§444.410(a) names BS EN 50174-1 verbatim — and §6 of that document is the administration discipline. So BS 7671 reaches into the cabling administration via this single clause: the identifier hierarchy, the labelling rules, the as-built drawings, the records, the change control are all regulatorily mandatory on a UK install from 15 April 2026 because BS EN 50174-1 §6 is mandatory through §444.410(a). Skipping documentation is not just bad practice — it is non-compliance with BS 7671."
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

          <ContentEyebrow>The identifier hierarchy</ContentEyebrow>

          <ConceptBlock
            title="Building → Floor → TR → Panel → Port — the spine of every administration record"
            plainEnglish="The identifier hierarchy is the lookup key for everything else in the administration record. Each level of the hierarchy is uniquely identified, and each link, port and outlet carries a hierarchical identifier that locates it precisely in the building inventory. Both ends of every link carry the SAME identifier, so the connection is end-to-end traceable from a single label."
            onSite="A typical patch panel port label reads something like 'B1-FL3-TR2-PP1-P14'. That decodes as: Building 1, Floor 3, Telecommunications Room 2, Patch Panel 1, Port 14. The matching outlet at the work-area end carries the same identifier. The administration register lists this identifier with: cable type and Class, link test results, the WA outlet location (room number, position on plan), the active-equipment port the patch cord lands on, the date installed and tested, and any subsequent changes."
          >
            <p>The standard hierarchical levels (TIA-606-D and BS EN 50174-1 §6 aligned):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Building.</strong> The building number / code on a multi-building campus.
                Single-building sites omit this level.
              </li>
              <li>
                <strong>Floor.</strong> The floor / level identifier. Ground (G), basement (B), or
                numbered (1, 2, 3 ...).
              </li>
              <li>
                <strong>Telecommunications Room (TR).</strong> The TR / Floor Distributor on that
                floor. Numbered if there are multiple TRs per floor.
              </li>
              <li>
                <strong>Patch panel.</strong> The patch panel within the TR rack, numbered top to
                bottom or by U-position.
              </li>
              <li>
                <strong>Port.</strong> The port on that patch panel, numbered left to right (1-24,
                1-48 etc.).
              </li>
            </ul>
            <p>
              Separators vary — some installs use {`"`}-{`"`}, some {`"`}_{`"`}, some {`"`}/{`"`},
              some {`"`}.{`"`} — but the hierarchy is constant. The corresponding outlet at the
              work-area end carries the same identifier (often with an additional WA-position
              suffix). The administration register binds them together with all the link metadata.
            </p>
          </ConceptBlock>

          {/* Documentation hierarchy tree diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The labelling identifier hierarchy — TIA-606-D / BS EN 50174-1 §6
            </h4>
            <svg
              viewBox="0 0 900 720"
              className="w-full h-auto"
              role="img"
              aria-label="A six-level tree diagram of the structured-cabling labelling identifier hierarchy. The root level is the site, with example identifier S1. Below it the next level is the building (B1), then floor (FL3), then telecommunications room (TR2), then patch panel (PP1), and finally at the bottom the port (P14). Vertical connector lines join each level to the next in a clear central column. To the right of each level, an example value column shows the identifier component used at that level. A bottom legend explains the identifier-format conventions per TIA-606-D and BS EN 50174-1 §6, and a footer shows the complete composed identifier S1-B1-FL3-TR2-PP1-P14."
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
                LABELLING IDENTIFIER HIERARCHY · TIA-606-D · BS EN 50174-1 §6
              </text>

              {/* ===== Column header band — "LEVEL" / "EXAMPLE" / "MEANING" ===== y top = 56 */}
              <rect
                x="60"
                y="56"
                width="780"
                height="30"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="160"
                y="76"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                LEVEL
              </text>
              <text
                x="450"
                y="76"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                EXAMPLE TOKEN
              </text>
              <text
                x="740"
                y="76"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                MEANING
              </text>

              {/* ============= Row 1 — SITE (root) ============= y centre = 116, box 96-136 */}
              <rect
                x="60"
                y="96"
                width="200"
                height="40"
                rx="6"
                fill="rgba(239,68,68,0.18)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="121"
                textAnchor="middle"
                fill="#FCA5A5"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                1 · SITE (root)
              </text>

              <rect
                x="350"
                y="96"
                width="200"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="121"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                S1
              </text>

              <rect
                x="640"
                y="96"
                width="200"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <text
                x="740"
                y="121"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Campus / address
              </text>

              {/* Connector zone 136-184 (clear, no labels) */}
              <line x1="160" y1="136" x2="160" y2="184" stroke="#9CA3AF" strokeWidth="1.6" />

              {/* ============= Row 2 — BUILDING ============= y centre = 204, box 184-224 */}
              <rect
                x="60"
                y="184"
                width="200"
                height="40"
                rx="6"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="209"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                2 · BUILDING
              </text>

              <rect
                x="350"
                y="184"
                width="200"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="209"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                B1
              </text>

              <rect
                x="640"
                y="184"
                width="200"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <text
                x="740"
                y="209"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                One of N buildings on site
              </text>

              <line x1="160" y1="224" x2="160" y2="272" stroke="#9CA3AF" strokeWidth="1.6" />

              {/* ============= Row 3 — FLOOR ============= y centre = 292, box 272-312 */}
              <rect
                x="60"
                y="272"
                width="200"
                height="40"
                rx="6"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="297"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                3 · FLOOR
              </text>

              <rect
                x="350"
                y="272"
                width="200"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="297"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                FL3
              </text>

              <rect
                x="640"
                y="272"
                width="200"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <text
                x="740"
                y="297"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Floor 3 in that building
              </text>

              <line x1="160" y1="312" x2="160" y2="360" stroke="#9CA3AF" strokeWidth="1.6" />

              {/* ============= Row 4 — TELECOMS ROOM (TR) ============= y = 380, box 360-400 */}
              <rect
                x="60"
                y="360"
                width="200"
                height="40"
                rx="6"
                fill="rgba(34,197,94,0.18)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="385"
                textAnchor="middle"
                fill="#BBF7D0"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                4 · TELECOMS ROOM
              </text>

              <rect
                x="350"
                y="360"
                width="200"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="385"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                TR2
              </text>

              <rect
                x="640"
                y="360"
                width="200"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <text
                x="740"
                y="385"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Floor distributor (FD)
              </text>

              <line x1="160" y1="400" x2="160" y2="448" stroke="#9CA3AF" strokeWidth="1.6" />

              {/* ============= Row 5 — PATCH PANEL ============= y = 468, box 448-488 */}
              <rect
                x="60"
                y="448"
                width="200"
                height="40"
                rx="6"
                fill="rgba(252,211,77,0.20)"
                stroke="#FACC15"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="473"
                textAnchor="middle"
                fill="#FEF3C7"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                5 · PATCH PANEL
              </text>

              <rect
                x="350"
                y="448"
                width="200"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="473"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                PP1
              </text>

              <rect
                x="640"
                y="448"
                width="200"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <text
                x="740"
                y="473"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Panel within that TR
              </text>

              <line x1="160" y1="488" x2="160" y2="536" stroke="#9CA3AF" strokeWidth="1.6" />

              {/* ============= Row 6 — PORT (leaf) ============= y = 556, box 536-576 */}
              <rect
                x="60"
                y="536"
                width="200"
                height="40"
                rx="6"
                fill="rgba(168,85,247,0.18)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="160"
                y="561"
                textAnchor="middle"
                fill="#E9D5FF"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
              >
                6 · PORT (leaf)
              </text>

              <rect
                x="350"
                y="536"
                width="200"
                height="40"
                rx="6"
                fill="rgba(234,179,8,0.18)"
                stroke="#EAB308"
                strokeWidth="1.6"
              />
              <text
                x="450"
                y="561"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                P14
              </text>

              <rect
                x="640"
                y="536"
                width="200"
                height="40"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <text
                x="740"
                y="561"
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize="10.5"
                fontFamily="system-ui"
              >
                Port 14 on that panel
              </text>

              {/* ===== Composed identifier banner ===== y = 600 */}
              <rect
                x="60"
                y="596"
                width="780"
                height="40"
                rx="8"
                fill="rgba(234,179,8,0.16)"
                stroke="#EAB308"
                strokeWidth="1.8"
              />
              <text
                x="80"
                y="621"
                fill="#FDE68A"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                COMPOSED IDENTIFIER
              </text>
              <text
                x="450"
                y="621"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui"
              >
                S1-B1-FL3-TR2-PP1-P14
              </text>

              {/* ===== Legend panel ===== */}
              <rect
                x="60"
                y="648"
                width="780"
                height="60"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="80"
                y="668"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                FORMAT CONVENTIONS
              </text>
              <text x="80" y="685" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Separator may vary (- · _ · / · .) but the hierarchy is constant · same identifier
                carried at both ends · register binds metadata to the token
              </text>
              <text x="80" y="700" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                Single-site jobs commonly omit the S-token · single-building jobs commonly omit the
                B-token — the remaining hierarchy is unchanged
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

          <ContentEyebrow>The handover pack</ContentEyebrow>

          <ConceptBlock
            title="Six components — the deliverable that converts cable plant into maintainable system"
            plainEnglish="At project sign-off, the contractor hands over a documentation pack that converts 'an installed cable plant' into 'a maintainable system'. Six components, all required. Without any one of them, the pack is incomplete and the operational consequences arrive within 12-24 months when the first changes start happening."
            onSite="On commissioning day, the client receives the handover pack — typically as a PDF bundle plus the native test-tool format files (Fluke FLW, Viavi MTS etc.) plus a physical comms-room binder. The contractor walks the client through the index. The client signs the handover. The clock starts on warranty registration. The change-control log opens its first entry — the install itself."
          >
            <p>The six components of a complete handover pack:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>1. As-built drawings.</strong> The actual installed configuration — run
                routes, outlet positions, TR layout, pathway / containment, fire-stops at
                penetrations. Marked up against the original design drawings, with variations noted,
                dated and authorised. Not the design intent — what was actually built.
              </li>
              <li>
                <strong>2. Link test results — 100 % of links.</strong> Channel and / or
                permanent-link test for every installed link, certifying the Class. PDF reports plus
                native test-tool format. Test instrument identified (make, model, serial) with
                calibration date. TIA-1152-A Level (III/IIIe/IV/V) for copper or BS EN 50346
                equivalent; OTDR / power-meter-and-light-source results for fibre.
              </li>
              <li>
                <strong>3. Identifier register.</strong> The full inventory of links, ports and
                outlets keyed by identifier (B1-FL3-TR2-PP1-P14 format). Each row carries cable
                type, Class, location, install date, test result, and any §716 / §545 metadata. The
                lookup key for everything else.
              </li>
              <li>
                <strong>4. Manufacturer warranty registration evidence.</strong> Proof of
                registration with the cabling system manufacturer (typically 20-25 year warranty),
                evidence of approved-installer status, and the test pack used to satisfy the
                Class-certification requirement of the warranty.
              </li>
              <li>
                <strong>5. Change-control log.</strong> The running journal of changes from install
                onwards. The original install opens the log; every variation during construction is
                recorded; from sign-off, every move/add/change in operational life is added.
              </li>
              <li>
                <strong>6. Indexed cross-reference.</strong> The map that ties everything together —
                index of as-built drawings by sheet, index of test results by link identifier, index
                of warranty documents by component family, index of change-log entries by date. The
                pack is only useful if it is navigable.
              </li>
            </ul>
            <p>
              The pack typically has a parallel set of BS 7671 Part 6 certificates — EIC for the
              installation, Minor Works for any subsequent additions, EICR for periodic inspection.
              On a §716 PoE / §545 functional-earthing install from 15 April 2026, both packs are
              produced. The cabling pack and the BS 7671 pack reference each other at common points
              (main bonding location, MFET, §716 PoE circuits).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §544.1.2 (Main bonding connection point — verbatim)"
            clause={
              <>
                The main protective bonding connection to any extraneous-conductive-part such as
                gas, water or other metallic pipework or service shall be made as near as
                practicable to the point of entry of that part into the premises. Where there is a
                meter, isolation point or union, the connection shall be made to the consumer{`'`}s
                hard metal pipework and before any branch pipework. Where practicable the connection
                shall be made within 600 mm of the meter outlet union or at the point of entry to
                the building if the meter is external.
              </>
            }
            meaning="§544.1.2 is reproduced here as the canonical example of 'documentation that must follow connections'. The regulation specifies WHERE the main bonding connection has to be (within 600 mm of the meter outlet union or at the point of entry); the handover pack must record WHERE it actually was made. The EIC carries this as the protective bonding declaration; the as-built drawings show the physical location; the cabling administration register cross-references it where the bonding network ties into the ICT bonding mesh under §444.1.3 / §545. The 600 mm rule is a connection requirement; the documentation requirement is implicit — without recording the actual location, the next contractor cannot verify or extend the bonding."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.410 (repeated for emphasis — verbatim)"
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
            meaning="§444.410(a) is repeated here because BS EN 50174-1 §6 is the administration section that defines the handover pack discipline. The clause makes that discipline regulatorily mandatory inside UK buildings from 15 April 2026 — the handover pack is not optional, not best-practice, not a tender extra. It is the BS 7671 §444.410-mandated artefact that lets the system stay maintainable. Without it, the install is non-compliant with BS 7671 itself."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <AmendmentBadge regs={['444', '544', '545', '716']} edition="A4:2026" />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            BS 7671 Part 6 certification — and how it sits alongside cabling administration
          </ContentEyebrow>

          <ConceptBlock
            title="Two parallel record streams — the EIC and the cabling pack — both mandatory, both reference each other"
            plainEnglish="On a UK structured cabling install with a PoE deployment, the contractor produces TWO parallel record streams: a BS 7671 Part 6 certification pack (EIC for the installation, Minor Works for subsequent additions, EICR for periodic inspection) covering the electrical-safety dimensions, AND a cabling administration pack (per TIA-606-D / BS EN 50174-1 §6) covering the physical infrastructure and Class certification. The two reference each other at common points but do not replace each other."
            onSite="The EIC documents the §716 PoE circuits, the §545 functional earthing, the §444 EMC measures, the §544.1.2 main bonding location, the §521.10.202 escape-route considerations. The cabling pack documents the Class certification, the link inventory, the as-builts, the test instrument and method, the manufacturer warranty registration. On commissioning day, both packs are signed over. On periodic inspection (typically every 5 years for the EICR), the BS 7671 pack is the regulatory pointer; the cabling pack is the engineering pointer."
          >
            <p>What goes in each pack — at a glance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS 7671 Part 6 certification pack.</strong> EIC (Electrical Installation
                Certificate) for the installation. Minor Works certificates for additions /
                alterations. Schedule of Inspections. Schedule of Test Results (insulation
                resistance, continuity, earth fault loop impedance, RCD operation). The EICR at
                periodic inspection. Where §716 / §545 / §444 are in play, the certificates carry
                the relevant declarations (PoE circuit design current, MFET location, EMC
                segregation distances). Retained for the life of the installation.
              </li>
              <li>
                <strong>Cabling administration pack (TIA-606-D / BS EN 50174-1 §6).</strong>{' '}
                As-built drawings, link test results, identifier register, manufacturer warranty
                registration, change-control log, indexed cross-reference. Retained for 15-25 years
                (system life and warranty period).
              </li>
            </ul>
            <p>Cross-reference points where the two packs touch each other:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Main bonding location.</strong> §544.1.2 location declared on the EIC;
                physical location shown on as-built; bonding mesh detail referenced from the cabling
                pack.
              </li>
              <li>
                <strong>MFET.</strong> §545.2 main functional earthing terminal — declared on the
                EIC, location on as-built, connections detailed in the cabling pack.
              </li>
              <li>
                <strong>§716 PoE circuits.</strong> Active equipment identified on the EIC, link
                identifiers cross-referenced to the cabling identifier register, design current per
                §716.523.2.101 (≤ 750 mA / conductor) declared.
              </li>
              <li>
                <strong>EMC segregation.</strong> §444.6.2 (130 mm to HID lamps) and Annex A444
                Tables A444.1 / A444.2 segregation distances declared on the EIC and shown on
                as-builts.
              </li>
              <li>
                <strong>Inter-building runs.</strong> §444.4.9 metal-free fibre preference shown on
                as-builts; declaration on the EIC; fibre Class certification in the cabling pack.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="Records on a UK structured cabling install — what goes where"
            source="BS 7671:2018+A4:2026 + BS EN 50174-1 §6 + TIA-606-D"
            headers={['Artefact', 'Pack location', 'Standard / regulation hook']}
            rows={[
              ['EIC (Electrical Installation Certificate)', 'BS 7671 pack', 'BS 7671 Part 6'],
              ['Minor Works certificate', 'BS 7671 pack', 'BS 7671 Part 6'],
              ['EICR (periodic inspection)', 'BS 7671 pack', 'BS 7671 Part 6'],
              ['Schedule of Inspections', 'BS 7671 pack', 'BS 7671 Part 6'],
              ['Schedule of Test Results (electrical)', 'BS 7671 pack', 'BS 7671 Part 6'],
              [
                '§544.1.2 main bonding location declaration',
                'BS 7671 pack',
                '§544.1.2 verbatim · 600 mm rule',
              ],
              [
                '§545 MFET location and CSAs',
                'BS 7671 pack',
                '§545.1.1 + §545.1.2 (NEW IN A4:2026)',
              ],
              [
                '§716 PoE circuit design current (≤ 750 mA / cond)',
                'BS 7671 pack',
                '§716.523.2.101 verbatim (NEW IN A4:2026)',
              ],
              ['As-built drawings', 'Cabling pack', 'BS EN 50174-1 §6 / TIA-606-D'],
              [
                'Link test results (Class certification)',
                'Cabling pack',
                'BS EN 50346 / TIA-1152-A',
              ],
              ['Identifier register', 'Cabling pack', 'BS EN 50174-1 §6 / TIA-606-D'],
              [
                'Manufacturer warranty registration',
                'Cabling pack',
                'manufacturer-specific (typ. 20-25 yr)',
              ],
              ['Change-control log', 'Cabling pack', 'BS EN 50174-1 §6 / TIA-606-D'],
              [
                'Indexed cross-reference',
                'Cabling pack',
                'best-practice / professional discipline',
              ],
              [
                'Bonding mesh design (§444.1.3 — 2 m × 2 m max)',
                'Cabling pack with cross-ref to EIC',
                '§444.1.3 verbatim · BS EN 50310',
              ],
              [
                'Inter-building fibre as-built (§444.4.9 metal-free)',
                'Cabling pack with cross-ref to EIC',
                '§444.4.9 verbatim',
              ],
              [
                'EMC segregation distances on tray (§444.6.2 / Annex A444)',
                'Cabling pack with cross-ref to EIC',
                '§444.6.2 + Annex A444 Tables A444.1 / A444.2',
              ],
            ]}
            notes="The two packs are parallel deliverables. From 15 April 2026, BS 7671 §444.410(a) makes BS EN 50174-1 (and therefore §6 administration discipline) mandatory in UK buildings. The BS 7671 Part 6 pack is mandatory under BS 7671 directly. Both packs are required on any UK install; both are retained for the life of the installation; both are referenced in subsequent change control."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Ongoing change control</ContentEyebrow>

          <ConceptBlock
            title="Every non-trivial change is logged — date, authoriser, contractor, testing, records"
            plainEnglish="The handover pack only stays useful if it is maintained. Every non-trivial change to the installed cabling — a new outlet, a relocated outlet, an added consolidation point, a replaced patch panel, a new TR commissioned — must be captured in the change-control log AND propagated into the identifier register, as-built drawings and (where the change involves new components) the warranty register. Skip any one and the pack drifts from reality."
            onSite="By year 5 of operation, an undocumented building has accumulated dozens of changes — new desks added, layouts shifted, outlets relocated, patches re-routed. None of these are individually catastrophic, but together they make the cabling untraceable: the as-builts no longer match the physical install, the identifiers no longer correspond to actual ports, the test pack covers links that no longer exist. The cost of recovery is proportional to the number of un-logged changes."
          >
            <p>What goes in a change-control log entry:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Date.</strong> The day the change was completed.
              </li>
              <li>
                <strong>Description.</strong> Plain-English description of what changed. {`"`}Outlet
                B1-FL3-TR2-PP1-P14 added in office 3.42, horizontal run from TR2.{`"`}
              </li>
              <li>
                <strong>Authorised by.</strong> Named client representative, facilities manager, or
                project manager.
              </li>
              <li>
                <strong>Carried out by.</strong> Named contractor, named technician,
                approved-installer status (for warranty preservation).
              </li>
              <li>
                <strong>Testing performed.</strong> Channel / permanent-link test result for the new
                or modified link. Instrument used. Calibration date. Class achieved.
              </li>
              <li>
                <strong>Records updated.</strong> Identifier register (entry added / modified),
                as-built drawing (sheet number, revision), warranty register (if components new), BS
                7671 Part 6 records (Minor Works certificate if relevant — e.g. new §716 PoE circuit
                added).
              </li>
            </ul>
            <p>
              For changes that involve §716 (a new PoE circuit added) or §545 (a new functional
              earthing connection), a BS 7671 Minor Works certificate is also produced. The cabling
              change-log entry cross-references the Minor Works certificate. The two packs grow
              together across the operational life of the system.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the handover pack as a one-time deliverable instead of a living document"
            whatHappens={
              <>
                Contractor produces a comprehensive handover pack at sign-off. Client signs. Pack is
                filed. Three years later, the building has accumulated 47 changes — new desks added,
                outlets relocated, patches re-routed, two TRs commissioned. None of the changes are
                in the pack. The original pack is now historical fiction. A fault appears in year 4;
                the technician reaches for the pack; the pack does not describe the actual cabling.
                Every move/add/change becomes a continuity-tester exercise. By year 7 the system is
                effectively undocumented and the cheapest fix is a re-cable.
              </>
            }
            doInstead={
              <>
                Treat the handover pack as the FIRST entry in a living administration record. Every
                non-trivial change generates a change-log entry, an updated identifier register, an
                as-built mark-up, a test record for the new / modified link, and a BS 7671 Minor
                Works certificate where §716 or §545 is touched. The discipline costs ~10-30 minutes
                per change — trivial compared to the operational value. Build the discipline into
                the facilities-management workflow: no patch-panel change happens without a
                change-log entry. By year 7 the records are still trustworthy and the system is
                still maintainable.
              </>
            }
          />

          <Scenario
            title="You inherit a 2015 office cabling install with no records — what do you do?"
            situation={
              <>
                A facilities manager inherits an 8-year-old office building cabled to {`"`}Cat 6A
                throughout{`"`} with no handover pack, no identifier register, no as-built drawings,
                no test results. The original contractor is no longer trading. The new tenant wants
                10GBASE-T to every desk and a planned PoE++ lighting upgrade.
              </>
            }
            whatToDo={
              <>
                Treat the cabling as unverified. Commission a full re-survey: continuity / link
                mapping every link to recover the identifier hierarchy from physical inspection;
                produce as-built drawings from a measured survey; channel-test every link to its
                Class (Class EA at 500 MHz expected for Cat 6A); document what is found in a
                retrospective administration register; contact the manufacturer about retrospective
                warranty status (often unrecoverable but worth asking — sometimes possible with
                evidence of approved-installer original install). Produce a handover pack from the
                recovered records and treat that as the new baseline. From that point forward, run
                change control as if the system had been documented from day one. For the planned
                PoE upgrade, the cabling pack now provides the basis for §716 design current
                declarations on the new EIC.
              </>
            }
            whyItMatters={
              <>
                Recovery typically costs 5-15 % of original install cost. Re-cabling costs 100 %.
                The arithmetic is straightforward — recover the records and run the rest of the
                system{`'`}s life from a documented baseline. The PoE++ upgrade is the forcing
                function: §716 §716.523.2.101 (750 mA / conductor) requires the contractor to know
                the design current per link, which requires the link identifier hierarchy, which
                requires the survey. The records get rebuilt as a by-product of doing the upgrade
                properly.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              'TIA-606-D (2021) and BS EN 50174-1 §6 are the two governing standards for cabling administration. BS 7671 §444.410(a) makes BS EN 50174-1 mandatory in UK buildings — and §6 of that document is the administration section.',
              'The identifier hierarchy (Building → Floor → TR → Panel → Port) is the spine. Every link, every port, every outlet carries the same hierarchical identifier at both ends. The administration register is keyed on it.',
              'The handover pack has six components: as-built drawings, link test results (100 %), identifier register, manufacturer warranty registration, change-control log, indexed cross-reference. All required.',
              'BS 7671 Part 6 certification (EIC / Minor Works / EICR) and the cabling administration pack are PARALLEL, complementary records — both mandatory from 15 April 2026 on any §716 PoE / §545 functional earthing install. They reference each other at common points (main bonding location, MFET, PoE design current, EMC segregation).',
              'Documentation is a discipline, not paperwork. Cost ~1-2 % of install cost; saves 100 % when otherwise the system would be re-cabled prematurely. Maintain it across the operational life via change control — every non-trivial change logged, register updated, as-builts marked up, test record added.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-6-section-3')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: Building and Campus Standards
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-mock-exam')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next: Data Cabling Mock Exam
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule6Section4;
