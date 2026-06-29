import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam3-s6-set',
    question:
      'What is the typical documentation set for a BS 5839-1:2025-compliant fire alarm system at handover?',
    options: [
      'A wiring diagram and a copy of the maintenance contract only.',
      'The commissioning certificate and the logbook, with no design drawings.',
      'The full set: design package, cause-and-effect matrix, commissioning certificate, acceptance certificate (Annex G), O&M manual, and logbook (Annex H).',
      'The zone plan and acceptance certificate only, handed to the installer.',
    ],
    correctIndex: 2,
    explanation:
      "The BS 5839-1:2025 documentation set is comprehensive. Each component has a specific role: design package = what was designed; commissioning certificate = what was tested at install; acceptance certificate = what was handed over; cause-and-effect matrix = what the system does; O&M manual = how to maintain it; logbook = the running record over the system's life. The 2025 standard added the cause-and-effect requirement; it tightened the variations recording (now ALL variations in the logbook); and it renamed annexes.",
  },
  {
    id: 'fam3-s6-cert',
    question:
      'What does BS 5839-1:2025 clarify about the certificate produced after extending or modifying a system?',
    options: [
      'No certificate is needed for an extension, only for a full re-design.',
      'The certificate is issued only by the CIE manufacturer after a firmware change.',
      'The certificate is now an "extension or modification certificate", covering both activities; firmware updates of a CIE are explicitly modifications.',
      'A verbal sign-off replaces the old written modification certificate.',
    ],
    correctIndex: 2,
    explanation:
      "Three changes in 2025. First, terminology: extension or modification certificate, capturing both activities explicitly. Second, firmware updates of the CIE are modifications — closing a loophole where remote firmware changes were not formally tracked. Third, the certificate distinguishes the activity, making the maintenance record richer. All extensions and modifications produce certificates; the system's documentary history is complete.",
  },
  {
    id: 'fam3-s6-variations',
    question: 'How does BS 5839-1:2025 change the recording of variations from BS 5839-1:2017?',
    options: [
      'No change — only "major" variations are recorded, as in 2017.',
      'Variations no longer need to be recorded if the responsible person agrees them.',
      'ALL agreed variations are now recorded in the logbook (Annex H), and some departures are now unacceptable variations that cannot be agreed at all.',
      'Variations may now be agreed verbally without any logbook entry.',
    ],
    correctIndex: 2,
    explanation:
      'Two distinct 2025 changes. (1) ALL variations recorded — closing the major / minor ambiguity. (2) Some variations now unacceptable — they cannot be variations even with recording. Together these mean the variations record is comprehensive (everything documented) AND constrained (some departures simply not allowed). The 2017 "major only" rule is gone.',
  },
  {
    id: 'fam3-s6-logbook',
    question: 'In BS 5839-1:2025, the system logbook is in which annex?',
    options: [
      'Annex F, unchanged from the 2017 numbering.',
      'Annex G, alongside the acceptance certificate template.',
      'Annex H, renumbered from Annex F (2017) and updated for the 2025 requirements.',
      'Annex D, alongside the detector configuration recording.',
    ],
    correctIndex: 2,
    explanation:
      'Annex renumbering is a small administrative change but a real practical one. Existing service organisations that referred to "Annex F" (2017) now need to refer to "Annex H" (2025). The logbook itself is broadly the same in purpose but the content has been updated for the 2025 requirements (all variations recorded, periodic firmware-update entries, all extensions and modifications certificated).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is NOT typically part of the BS 5839-1:2025 design documentation set?',
    options: [
      'Zone plan.',
      'Block diagram.',
      'Cause-and-effect matrix.',
      "The fire and rescue service's response time database.",
    ],
    correctAnswer: 3,
    explanation:
      "FRS response time data is not part of the fire alarm system's design documentation set. The design documentation covers what the SYSTEM is and how it operates. External response data (FRS attendance times) may be considered in the fire risk assessment / fire engineering for the building, but is not a fire alarm system documentation item. Zone plan, block diagram, and cause-and-effect matrix are all required.",
  },
  {
    id: 2,
    question: 'What is the role of a fire alarm system block diagram?',
    options: [
      'A high-level architectural map of the system: CIE(s), loops, repeater panels, networks, and significant interfaces, read at a glance.',
      'A detailed cabling drawing showing every terminal, cable route, and device address on the loop.',
      'A tabular device schedule listing every detector, sounder, and call point by location and address.',
      'A plain-language user manual describing how staff operate, silence, and reset the panel.',
    ],
    correctAnswer: 0,
    explanation:
      "The block diagram is the system overview. It does not show every cable terminal or every device address; it shows architectural elements and how they connect. Combined with the zone plan (location resolution) and the schematic (electrical detail), it forms the documentation 'understanding stack' — overview, location, detail. Each level serves a different audience and purpose.",
  },
  {
    id: 3,
    question:
      'What is the difference between an acceptance certificate and a commissioning certificate?',
    options: [
      'They are two names for the same single document issued at the end of the project.',
      'The commissioning certificate is issued by the installer and the acceptance certificate by the panel manufacturer.',
      'The commissioning certificate certifies the system meets the design and standard; the acceptance certificate (Annex G) records the responsible person accepting custody.',
      'They differ only in which annex they appear in — Annex F versus Annex H of the standard.',
    ],
    correctAnswer: 2,
    explanation:
      'The commissioning certificate is technical: the system meets the standard. The acceptance certificate is contractual / responsible: the responsible person takes ownership of the system and the duties it brings. Both certificates are filed in the documentation set; both are dated; both refer to the system as built at the date of acceptance.',
  },
  {
    id: 4,
    question: 'Where is the system logbook in BS 5839-1:2025?',
    options: [
      'Annex F, unchanged from the BS 5839-1:2017 numbering.',
      'Annex G, the same annex that holds the acceptance certificate template.',
      'It is not held in an annex; the logbook format is left to the responsible person.',
      'Annex H, renumbered from Annex F (2017) and updated for the 2025 requirements.',
    ],
    correctAnswer: 3,
    explanation:
      "Annex H is the 2025 numbering. The logbook is the running record of the system's operational life: every fire alarm event, every fault, every disablement (with reason and duration), every test, every service visit, every modification or extension, every variation. Maintained by the responsible person at the system; reviewed at every service visit by the service organisation.",
  },
  {
    id: 5,
    question: 'What does the operating and maintenance manual typically include?',
    options: [
      'Operating instructions, system description, detector configuration, maintenance schedule, spares, contacts, and copies of all certificates.',
      'Only the day-to-day operating instructions for silencing and resetting the panel.',
      'Only the as-installed wiring diagram for the addressable detection loop.',
      'Only a schedule of the cable lengths and types used on the installation.',
    ],
    correctAnswer: 0,
    explanation:
      "The O&M manual is the responsible person's reference. It is the document they consult when there is an event, a planned change, a service visit. Comprehensive content makes it useful; partial content makes it a paperwork artefact rather than a working tool. The 2025 standard's expectation that detector configuration is recorded per Annex D Figure D.1 is one of many components.",
  },
  {
    id: 6,
    question:
      'Per BS 5839-1:2025 clause 47, what activities produce a certificate (extension or modification certificate)?',
    options: [
      'Only major changes that alter the system category or evacuation strategy.',
      'Only the routine six-monthly service visits, which each generate a certificate.',
      'Any extension (adding new coverage) and any modification (changing existing coverage), including CIE firmware updates.',
      'Only physical hardware changes; software and firmware updates are exempt from certification.',
    ],
    correctAnswer: 2,
    explanation:
      "The 2025 standard widens and clarifies the certificate-producing activities. Extension is now explicit (the 2017 wording covered only modification). Firmware updates are now explicit modifications (closing a loophole). Each certificate produces a snapshot of the change. Over years, the certificate trail provides the system's evolution history.",
  },
  {
    id: 7,
    question: 'The BS 5839-1:2025 acceptance certificate is in which annex?',
    options: [
      'Annex E, alongside the detector selection and configuration recording.',
      'Annex H, the same annex that holds the system logbook.',
      'Annex K, a new annex introduced for acceptance documentation in 2025.',
      'Annex G, formalising the responsible person accepting the system into custody.',
    ],
    correctAnswer: 3,
    explanation:
      "Annex G is the acceptance certificate. Annex H is the logbook. Annex D is the detector selection / configuration recording (formerly Annex E in 2017). The 2025 standard's annex layout is: design templates and the detector recording in earlier annexes; the operational records (acceptance, logbook) in the later annexes.",
  },
  {
    id: 8,
    question:
      'A premises has fire alarm documentation that is incomplete: no cause-and-effect matrix and no commissioning certificate exists. The system was installed before BS 5839-1:2025 came into effect. What should happen?',
    options: [
      'Commission a documentation completion exercise: produce a current cause-and-effect matrix and an as-found record, and document changes going forward.',
      'Nothing — the system pre-dates BS 5839-1:2025, so the documentation gap can be left as it is.',
      'The whole system must be replaced with a new installation to meet the 2025 documentation standard.',
      'The premises must be issued an enforcement fine before any further service work can continue.',
    ],
    correctAnswer: 0,
    explanation:
      'Existing systems are not retrospectively brought up to current standard automatically — that is a deliberate design feature of BS 5839-1:2025 (extensions vs full re-compliance). But the documentation gap is a different matter: it is operationally important regardless of when the system was installed. Closing the gap is good practice and supports the next service / modification cycle.',
  },
  {
    id: 9,
    question:
      'How are fault, alarm, and disablement events recorded in the system logbook (Annex H)?',
    options: [
      'They are not logged in the logbook; the panel event memory is the only record kept.',
      'Only confirmed genuine fire events are logged; faults and disablements are handled separately.',
      'Each event is recorded with date, time, location, event type, action taken, and the responsible person; disablements add the reason and the date/time lifted.',
      'They are recorded verbally to the service organisation at the next six-monthly visit.',
    ],
    correctAnswer: 2,
    explanation:
      "The logbook is a chronological record. Each event is one line (or one entry); fields are minimal but consistent; the resulting log is the system's history. Patterns in the logbook (recurring false alarms in a zone, frequent disablements of an interface, repeated faults on a particular cable) feed back into design review and maintenance planning. Per the 2025 standard, all variations also go in the logbook.",
  },
  {
    id: 10,
    question:
      "The cause-and-effect matrix in the documentation set serves what specific purpose during the system's operational life?",
    options: [
      'It serves only as a training aid for new staff learning to operate the panel.',
      'It is a one-off design drawing with no role once the system is commissioned.',
      'It is a marketing document supplied to the client to summarise the installed system.',
      'It is the persistent specification of what the system does, against which the CIE is verified, tested, and modified.',
    ],
    correctAnswer: 3,
    explanation:
      'The cause-and-effect matrix is the specification document. The CIE is the implementation. Treating these as the same thing — the configuration in the CIE IS the spec — makes the system fragile to CIE replacements, firmware updates, and configuration drift. The 2025 standard’s mandate that the matrix exists as a document protects against this fragility.',
  },
];

const FireAlarmModule3Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Design documentation | Fire Alarm Module 3.6 | Elec-Mate',
    description:
      'BS 5839-1:2025 design documentation: zone plan, block diagram, schematic, riser, cause-and-effect matrix (mandatory in 2025), acceptance certificate (Annex G), extension or modification certificate (clause 47, firmware updates included), variations recording (ALL in logbook), logbook (Annex H — renumbered from Annex F).',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6"
            title="Design documentation"
            description="The BS 5839-1:2025 documentation set: zone plan, block diagram, schematic, riser, cause-and-effect matrix (NEW mandatory at handover), acceptance certificate (Annex G), extension or modification certificate (clause 47, firmware = modification), all-variations-in-logbook rule, and the logbook (Annex H — renumbered from Annex F in 2017)."
            tone="yellow"
          />

          <TLDR
            points={[
              'The full BS 5839-1:2025 documentation set: design package, cause-and-effect matrix, commissioning certificate, acceptance certificate (Annex G), O&M manual, logbook (Annex H).',
              'Zone plan: at the CIE per clause 22.2.5. NEW: absence in multi-zone sleeping premises is an UNACCEPTABLE variation.',
              'Block diagram: high-level system architecture — CIEs, loops, panels, networks, interfaces.',
              'Schematic: detailed electrical drawings — cable runs, terminations, device addresses.',
              'Riser diagram: cable runs through the building vertically.',
              'Cause-and-effect matrix: NEW mandatory at handover in BS 5839-1:2025. Even a one-line text description is acceptable for simple systems.',
              'Acceptance certificate (Annex G): responsible person formally accepts the system. Issued after commissioning.',
              'Extension OR modification certificate (clause 47, was just "modification" in 2017): covers all extensions AND all modifications. Firmware updates of the CIE = modification (NEW explicit).',
              'Variations: ALL agreed variations now recorded in the logbook (was: "major" only in 2017, undefined). Some variations now UNACCEPTABLE entirely (zone plan absence, ARC absence in supported housing / care homes).',
              'Logbook = Annex H (was Annex F in 2017). Content updated to reflect 2025 requirements.',
              "O&M manual: the responsible person's reference. Operating instructions, system description, configuration (including Annex D Figure D.1 for multi-sensor detectors), maintenance schedule, certificates.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Produce a complete BS 5839-1:2025 documentation set: design package, cause-and-effect matrix, certificates, O&M manual, logbook',
              'Apply the NEW mandatory cause-and-effect documentation rule at handover',
              'Distinguish commissioning certificate (technical compliance) from acceptance certificate (Annex G — responsible person acceptance)',
              'Apply BS 5839-1:2025 clause 47: extensions AND modifications produce certificates; firmware updates count as modifications',
              'Record ALL agreed variations in the logbook (Annex H — renumbered from Annex F in 2017); recognise the 2025 unacceptable-variation list',
              "Maintain the logbook over the system's operational life: events, faults, disablements, tests, services, modifications, variations",
              'Produce a comprehensive O&M manual including detector / device configuration per Annex D Figure D.1',
              'Manage documentation gaps in older systems: identify missing items; commission documentation completion exercises where appropriate',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The complete documentation set</ContentEyebrow>

          <ConceptBlock
            title="What the BS 5839-1:2025 system documentation includes"
            plainEnglish="A complete documentation set is not optional. It is what makes the system operable, maintainable, and accountable over its life. Each document plays a specific role; together they tell the story of what the system is, what it does, what was tested, who accepted it, and what has happened to it since. The 2025 standard tightened several documentation requirements — most notably the mandatory cause-and-effect matrix at handover and the all-variations-in-logbook rule."
            onSite="When you arrive at a site for service, the documentation set tells you what to expect. No documentation = no service can be done correctly. The first hour of any first service visit is reading the documentation, not testing the system."
          >
            <p>The 2025 documentation set includes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Design package</strong> — zone plan, block diagram, schematic drawings,
                riser diagram, cable schedule, interface schedule, device schedule, design
                rationale.
              </li>
              <li>
                <strong>Cause-and-effect matrix</strong> — NEW mandatory at handover from 2025.
                Tabular or text form per the system complexity.
              </li>
              <li>
                <strong>Commissioning certificate</strong> — the commissioning organisation's
                technical certification that the system meets the design and BS 5839-1:2025.
              </li>
              <li>
                <strong>Acceptance certificate</strong> — Annex G; the responsible person's formal
                acceptance of the system.
              </li>
              <li>
                <strong>Operating and maintenance manual</strong> — operating instructions, system
                description, configuration data (Annex D Figure D.1 for multi-sensor detectors),
                maintenance schedule, spare parts, vendor contacts, copies of all certificates.
              </li>
              <li>
                <strong>System logbook</strong> — Annex H (was Annex F in 2017); the running record
                of events, faults, disablements, tests, services, modifications, variations.
              </li>
              <li>
                <strong>Extension or modification certificates</strong> — clause 47; one per
                extension or modification (including firmware updates).
              </li>
              <li>
                <strong>Fire risk assessment</strong> — the building\&apos;s fire risk assessment
                referencing the alarm system. Not part of BS 5839-1 documentation strictly but
                referenced by it.
              </li>
            </ul>
            <p>
              The set is delivered to the responsible person at handover; retained at the premises
              (typically at or near the CIE for the operational documents); reviewed at every
              service visit; updated on every modification.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 38 (Documentation/handover)"
            clause={
              <>
                A new item that appears within the documentation clause of BS 5839-1:2025 is the
                recommendation that a cause-and-effect matrix or text description of how the cause
                and effect operates is included with the documentation to be provided to the
                purchaser or user of the system. The commissioning technician should inform the user
                that it is important to keep the documentation provided up to date and available to
                interested parties.
              </>
            }
            meaning="Two specific 2025 changes. First, the cause-and-effect matrix is now MANDATORY at handover documentation — closing the long-standing gap where this was often verbal or implicit. Second, an explicit obligation on the commissioning technician to inform the user about documentation maintenance — the user is responsible for keeping it current and accessible. Documentation is not a one-time deliverable; it is a living record."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — documentation set hierarchy */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5839-1:2025 documentation set — hierarchy and relationships
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="A hierarchical diagram showing the BS 5839-1:2025 fire alarm documentation set: design package at the top, cause-and-effect matrix and commissioning certificate as commissioning outputs, acceptance certificate (Annex G), operating and maintenance manual, and the logbook (Annex H) as the running record."
            >
              <text
                x="440"
                y="28"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                BS 5839-1:2025 documentation set
              </text>

              {/* Top — Design package */}
              <rect
                x="200"
                y="50"
                width="480"
                height="60"
                rx="10"
                fill="rgba(34,211,238,0.1)"
                stroke="#22D3EE"
                strokeWidth="1.8"
              />
              <text
                x="440"
                y="72"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="12"
                fontWeight="bold"
              >
                DESIGN PACKAGE
              </text>
              <text x="440" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Zone plan · Block diagram · Schematic · Riser · Cable schedule · Interface schedule
              </text>
              <text x="440" y="104" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                The design intent — what was specified
              </text>

              {/* Down arrow */}
              <line
                x1="440"
                y1="110"
                x2="440"
                y2="138"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <polygon points="440,140 432,132 448,132" fill="rgba(255,255,255,0.4)" />

              {/* Middle — Commissioning outputs */}
              <rect
                x="100"
                y="148"
                width="320"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.1)"
                stroke="#FBBF24"
                strokeWidth="1.8"
              />
              <text
                x="260"
                y="170"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                CAUSE-AND-EFFECT MATRIX
              </text>
              <text x="260" y="188" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                NEW mandatory at handover (2025)
              </text>
              <text x="260" y="204" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Inputs (causes) → Outputs (effects)
              </text>
              <text x="260" y="218" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Even one-line description acceptable for simple
              </text>

              <rect
                x="460"
                y="148"
                width="320"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.1)"
                stroke="#A855F7"
                strokeWidth="1.8"
              />
              <text
                x="620"
                y="170"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                COMMISSIONING CERTIFICATE
              </text>
              <text x="620" y="188" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Technical certification of system
              </text>
              <text x="620" y="204" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Issued by commissioning organisation
              </text>
              <text x="620" y="218" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Verifies installation against design
              </text>

              {/* Down arrow */}
              <line
                x1="440"
                y1="228"
                x2="440"
                y2="256"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <polygon points="440,258 432,250 448,250" fill="rgba(255,255,255,0.4)" />

              {/* Acceptance */}
              <rect
                x="220"
                y="266"
                width="440"
                height="60"
                rx="10"
                fill="rgba(34,197,94,0.1)"
                stroke="#22C55E"
                strokeWidth="1.8"
              />
              <text
                x="440"
                y="288"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="12"
                fontWeight="bold"
              >
                ACCEPTANCE CERTIFICATE — Annex G
              </text>
              <text x="440" y="306" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Responsible person formally accepts the system
              </text>
              <text x="440" y="320" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Custody and responsibility transferred at acceptance
              </text>

              {/* Down arrow */}
              <line
                x1="440"
                y1="326"
                x2="440"
                y2="354"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
                strokeDasharray="4,3"
              />
              <polygon points="440,356 432,348 448,348" fill="rgba(255,255,255,0.4)" />

              {/* O&M manual + Logbook side by side */}
              <rect
                x="100"
                y="364"
                width="320"
                height="80"
                rx="10"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.7)"
                strokeWidth="1.6"
              />
              <text
                x="260"
                y="386"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                OPERATING &amp; MAINTENANCE MANUAL
              </text>
              <text x="260" y="404" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                System description · O&amp;M procedures
              </text>
              <text x="260" y="418" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Detector config (Annex D Figure D.1)
              </text>
              <text x="260" y="432" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Spares · contacts · all certificates
              </text>

              <rect
                x="460"
                y="364"
                width="320"
                height="80"
                rx="10"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.7)"
                strokeWidth="1.6"
              />
              <text
                x="620"
                y="386"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                LOGBOOK — Annex H
              </text>
              <text x="620" y="404" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                (renumbered from Annex F in 2017)
              </text>
              <text x="620" y="418" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Events · faults · disablements · ALL variations
              </text>
              <text x="620" y="432" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Updated at every event and service visit
              </text>

              {/* Bottom — modifications */}
              <rect
                x="40"
                y="476"
                width="800"
                height="44"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="440"
                y="496"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Extension OR modification certificate (clause 47) — one per change · firmware
                updates = modifications (NEW 2025)
              </text>
              <text x="440" y="512" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                ALL agreed variations recorded in the logbook (Annex H) · 2025 unacceptable
                variations cannot be agreed at all
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Drawings — zone plan, block diagram, schematic, riser</ContentEyebrow>

          <ConceptBlock
            title="The four core drawings — overview to detail"
            plainEnglish="A complete fire alarm design produces drawings at four levels: zone plan (location resolution at the building level), block diagram (system architecture), schematic (electrical detail), riser (cable runs through the building). Each drawing serves a different audience and a different purpose. Together they constitute the design package."
          >
            <p>The drawing hierarchy:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Zone plan</strong> — building floor plan showing zones, displayed at the CIE
                per clause 22.2.5. The user-facing location reference. Absence in multi-zone
                sleeping premises is now an unacceptable variation (NEW 2025). Updated on extensions
                / modifications.
              </li>
              <li>
                <strong>Block diagram</strong> — system architecture: CIE(s), loops, repeater
                panels, network connections, key interfaces, sounder zones. High-level structural
                view, no electrical detail. Used by service organisations and fire-fighters to
                understand the system at a glance.
              </li>
              <li>
                <strong>Schematic</strong> — electrical detail: cable runs, terminations, device
                addresses, end-of-line devices, connections to interfaces. Used by installation and
                service engineers for fault diagnosis and modification planning.
              </li>
              <li>
                <strong>Riser diagram</strong> — vertical cable runs through the building (typically
                per stairway / riser shaft). Shows cable routes, fire-stops, supports, penetrations
                through compartment lines. Used by installation engineers and for fire risk
                assessment of penetrations.
              </li>
            </ul>
            <p>
              Each drawing is dated, revision-controlled, and updated on every modification. The
              latest set is filed in the O&M manual and referenced in the logbook entry for the
              modification. Old revisions are archived for historical reference.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            The certificates — commissioning, acceptance, modification
          </ContentEyebrow>

          <ConceptBlock
            title="Three certificate types — three roles"
            plainEnglish="BS 5839-1 distinguishes three certificate types, each filling a specific role in the system\'s lifecycle. Confusing them produces gaps in the documentation; understanding their distinct purposes makes the documentation set work."
          >
            <p>The three certificates:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Commissioning certificate</strong> — issued by the commissioning
                organisation after commissioning is complete. Certifies that the system as installed
                and configured meets the design and BS 5839-1:2025. The technical statement of
                compliance.
              </li>
              <li>
                <strong>Acceptance certificate (Annex G)</strong> — issued by the responsible person
                on accepting the system. Formalises the transfer of custody and responsibility from
                the install / commissioning team to the responsible person. Typically issued shortly
                after the commissioning certificate.
              </li>
              <li>
                <strong>Extension or modification certificate (clause 47)</strong> — issued after
                any extension or modification of the system. Documents what was changed, by whom,
                when. Filed alongside the original commissioning / acceptance certificates so the
                evolution of the system is traceable.
              </li>
            </ul>
            <p>
              Each certificate is dated; each refers to the system as built at that date; each is
              filed in the O&M manual; the logbook references each. Certificate trails over decades
              show the system\&apos;s evolution: original install, progressive extensions, CIE
              replacement, firmware updates, configuration reconfigurations.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 47 (Section 7 — Extensions and modifications)"
            clause={
              <>
                The certificate that should be issued after any extension or modification has been
                completed has been updated from a modification certificate to an extension or
                modification certificate. It has now been clarified that updating the firmware of a
                CIE is a modification and as such will require a certificate to be produced. Where a
                system has been modified and existing equipment is no longer in use, to avoid
                confusion, the redundant devices should either be removed (where practicable) or
                clearly identified as no longer in use.
              </>
            }
            meaning="Three explicit clarifications. (1) Certificate name updated to capture both extensions and modifications. (2) Firmware updates of the CIE are explicitly modifications — closing a previously ambiguous loophole where remote firmware changes were not formally certificated. (3) Redundant devices left in place after modifications must be removed or clearly identified to prevent confusion (a 'ghost' device on the system map that is not actually in use is a recipe for incorrect maintenance and incorrect fault diagnosis)."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Variations — all in the logbook now</ContentEyebrow>

          <ConceptBlock
            title="The 2025 variations rule"
            plainEnglish="BS 5839-1 has always permitted variations from the standard\'s recommendations — code-of-practice clauses say 'should' rather than 'shall', and departures are conceptually allowed. The 2025 standard makes two important changes to how variations are managed. First: ALL agreed variations are now recorded in the system logbook. The 2017 standard required only 'major' variations to be recorded but never defined 'major' — leading to inconsistent practice. Second: SOME departures are now UNACCEPTABLE — they cannot be variations even with recording. The list (per clause 6) is short but specific."
          >
            <p>The 2025 variations framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Acceptable variations</strong> — agreed by the relevant parties (designer,
                installer, commissioning organisation, responsible person, possibly the fire risk
                assessor or insurer); recorded in the logbook with the rationale; not contradicting
                the unacceptable-variation list. The variation is then a documented departure that
                all subsequent service / modification reflects.
              </li>
              <li>
                <strong>Unacceptable variations (NEW 2025, clause 6)</strong> — two specific
                departures: absence of zone plan in multi-zone sleeping premises; absence of ARC
                transmission in supported housing (Grade A BS 5839-6:2019) or residential care
                homes. These cannot be variations; a system with one of these departures is
                non-conforming, not 'compliant by variation'.
              </li>
              <li>
                <strong>Logbook recording</strong> — every agreed variation, regardless of size,
                with: what the variation is, why it was agreed (technical justification), who agreed
                it (the parties), the date. The logbook entry stands as the variation record for the
                system\&apos;s life.
              </li>
              <li>
                <strong>Review at modification</strong> — when the system is extended or modified,
                the existing variations are reviewed: do they still apply? are they still valid?
                does the modification require new variations to be agreed? The new modification
                certificate references any variations that apply to the modification.
              </li>
            </ul>
            <p>
              The 2025 framework gives variations a clear documentary footprint over the
              system\&apos;s life. It also raises the bar: the unacceptable list closes specific
              loopholes that were exploited to defeat life-safety functions. Designers who
              previously argued for these variations on cost grounds no longer have that option.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 6 (Variations) and Clause 48 (Logbook)"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations are likely to be so detrimental to the
                safety of life that they should not be regarded as acceptable variations: absence of
                a zone plan in premises with more than one zone on any storey; absence of a facility
                for transmission of fire alarm signals to an ARC in supported housing requiring
                Grade A BS 5839-6:2019 or in a residential care home. All agreed variations should
                now be recorded within the system logbook (Annex H).
              </>
            }
            meaning="Two principles in one clause. (1) Some specific departures are now non-negotiable — they cannot be variations. The fire and rescue service / occupants depend on these functions in identifiable scenarios. (2) ALL other agreed variations go in the logbook. The 2017 'major only' rule is gone. The result: a system with no listed unacceptable departures, with every agreed variation transparent in the logbook record."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The logbook — Annex H, the system\'s running record</ContentEyebrow>

          <ConceptBlock
            title="What goes in the logbook"
            plainEnglish="The system logbook is the running operational record. Every event the system experiences — fire alarms, faults, disablements, isolations, tests, services, modifications, variations — is recorded chronologically. Maintained by the responsible person at the premises (typically at or near the CIE); reviewed at every service visit by the service organisation; consulted in fire risk assessment reviews. The logbook is the system\'s history made visible."
          >
            <p>Standard logbook content (per Annex H):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire alarm events</strong> — date, time, zone / device, action taken
                (investigated, reset), whether genuine or false (and category of false alarm if
                applicable per the BS 5839-1:2025 false-alarm clauses).
              </li>
              <li>
                <strong>Fault events</strong> — date, time, zone / device, fault type, action taken,
                repair date.
              </li>
              <li>
                <strong>Disablements / isolations</strong> — date, time, zone / device, reason,
                authoriser, expected duration, lifted date / time.
              </li>
              <li>
                <strong>System tests</strong> — weekly user test, monthly battery / load test (per
                BS 5839-1 schedules), other periodic tests.
              </li>
              <li>
                <strong>Service visits</strong> — 6-monthly service per clause 43.2; date, service
                organisation, work performed, certificate reference.
              </li>
              <li>
                <strong>Extensions and modifications</strong> — date, certificate reference, brief
                description.
              </li>
              <li>
                <strong>ALL agreed variations</strong> — NEW 2025 requirement. What, why, who, when.
              </li>
              <li>
                <strong>Firmware updates</strong> — recorded as modifications with certificate
                reference.
              </li>
              <li>
                <strong>Battery replacements</strong> — date, panel, replacement battery details.
              </li>
            </ul>
            <p>
              The logbook should be paper-and-ink (or a hybrid with electronic entry where the
              vendor system supports it, but always with a paper copy retained at the premises for
              fire-and-rescue access during incidents). It is durable, dated, and bound / filed so
              entries cannot be casually removed. Annex H provides a suitable template.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 48 / Annex H (Logbook)"
            clause={
              <>
                A logbook should be provided and maintained at the premises in which the
                fire-detection and fire alarm system is installed. The logbook should be located at,
                or close to, the CIE. The logbook should be used to record information including
                details of every fire alarm signal, every fault signal, every test of the system and
                the action taken, every service or maintenance visit, every disablement and the
                reason, every extension or modification of the system, and every agreed variation
                from the recommendations of this part of BS 5839. The logbook (Annex H) has been
                updated to reflect the information that is within clause 48.
              </>
            }
            meaning="Two specific 2025 elements. First, the annex renumbering — Annex H replaces Annex F. Second, the content updates per clause 48 — particularly the all-variations rule and the firmware-update modification rule. The logbook is the operational document; it should be at the CIE, accessible to fire-fighters and the responsible person, current to the day."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <Scenario
            title="Acceptance of a new fire alarm system in a multi-zone hotel"
            situation="A new build boutique hotel — 3 storeys, 8 detection zones, addressable system, voice alarm, EVC at refuge points, lift recall, BMS integration, ARC transmission. Commissioning by a major contractor is complete. The responsible person (the hotel general manager) is being asked to accept the system."
            whatToDo="Walk through the documentation set with the commissioning engineer before accepting. (1) Design package complete: zone plan posted at the CIE per clause 22.2.5; block diagram shows the addressable loop, voice alarm, EVC, lift, BMS interfaces; schematic and riser drawings provided; cable schedule and interface schedule itemised. (2) Cause-and-effect matrix produced (NEW mandatory): tabular form showing each zone\'s causes and the staged sounder / VA / lift recall / BMS effects. (3) Commissioning certificate issued by the commissioning organisation, certifying the system as commissioned. (4) Annex D Figure D.1 detector configuration recording for the multi-sensor detectors in the kitchen, gym, and bar areas (configured in coincidence-of-two day mode, single-detector immediate night mode). (5) Operating and maintenance manual delivered: operating instructions for hotel staff (how to read the CIE, how to silence sounders for testing, how to log a disablement), system description (block diagram, zone plan, cause-and-effect summary), maintenance schedule (6-monthly service per BS 5839-1:2025 clause 43.2), spares list, vendor contact, copies of all certificates. (6) Logbook (Annex H) provided and located at the CIE; first entries (commissioning event, acceptance event) entered. (7) Acceptance certificate (Annex G) prepared; the responsible person reads, asks any final questions, and signs. (8) NO unacceptable variations: zone plan present, ARC transmission present (the hotel has 24/7 staff but as a sleeping premises with potentially vulnerable guests, the design includes ARC transmission). (9) Any agreed variations entered in the logbook with rationale (e.g. 'door holders not fitted on bedroom doors per agreement with fire risk assessor — bedrooms are individual compartments, evacuation strategy does not require corridor doors held open'). The acceptance is then complete; the responsible person has the documentation set to manage the system over its life."
            whyItMatters="A complete BS 5839-1:2025-compliant acceptance package gives the responsible person everything they need to operate, maintain, and modify the system over its life. An incomplete package leaves them dependent on the commissioning organisation\'s memory, the vendor\'s records, or future reverse-engineering. The 2025 standard\'s expanded documentation requirements (mandatory cause-and-effect, all-variations recording, renamed certificates) deliberately raise the bar. Acceptance is the moment to confirm the bar is met."
          />

          <SectionRule />

          <ContentEyebrow>O&amp;M manual — the responsible person\'s reference</ContentEyebrow>

          <ConceptBlock
            title="A working tool, not a paperwork artefact"
            plainEnglish="The operating and maintenance manual is the responsible person\'s primary reference. It tells them how to read the CIE, what to do in routine events (false alarm, planned disablement, service visit), how the system is structured, and how to engage the service organisation when needed. A good O&amp;M manual is a working document the responsible person opens regularly; a poor one is a binder that sits unread on a shelf."
          >
            <p>O&amp;M manual content:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Operating instructions</strong> — for the responsible person and staff: how
                to read the CIE display; how to acknowledge / silence / reset events; how to handle
                different event types (genuine fire, false alarm, fault, service-mode); escalation
                procedures.
              </li>
              <li>
                <strong>System description</strong> — block diagram, zone plan, cause-and-effect
                summary in plain language; system category (L1, L2, L3, L4, P1, P2, M); design
                rationale.
              </li>
              <li>
                <strong>Configuration data</strong> — for multi-sensor detectors, the Annex D Figure
                D.1 record (address, location, mode, sensitivity, schedule); for addressable
                systems, the device list with text descriptors; for any programmable element (day /
                night schedules, coincidence settings), the configuration is documented.
              </li>
              <li>
                <strong>Maintenance schedule</strong> — what tests / inspections are done at what
                intervals (weekly user test, monthly tests, 6-monthly service per clause 43.2,
                12-monthly extended service); who is responsible for each.
              </li>
              <li>
                <strong>Spare parts list</strong> — replacement components recommended to be stocked
                locally for rapid repair (sometimes provided by the service organisation rather than
                the responsible person; documentation either way).
              </li>
              <li>
                <strong>Vendor and service organisation contact details</strong> — who to call for:
                hardware failures, system events outside normal scope, modifications.
              </li>
              <li>
                <strong>Copies of all certificates</strong> — design, commissioning, acceptance,
                modifications. Originals filed elsewhere (often the responsible person\&apos;s fire
                safety file); copies in the O&amp;M for ready reference.
              </li>
            </ul>
            <p>
              The O&amp;M manual is delivered at acceptance, updated on every modification, and
              reviewed periodically (at least at every service visit) by the responsible person and
              the service organisation. It is the document they jointly maintain; gaps are
              identified and closed.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating documentation as the install team\'s problem"
            whatHappens="A new fire alarm install is complete; the install team are eager to wrap up and move to the next project. The documentation handover is rushed — drawings on a USB stick handed over with limited explanation, certificates printed but the responsible person does not fully understand them, the O&amp;M manual is a generic template with the building\'s specifics not filled in. The responsible person accepts because they trust the install team. Six months later, a service visit arrives; the service organisation asks for documentation; the responsible person produces the USB stick. The drawings are out of date (the install team made undocumented changes near completion); the cause-and-effect matrix is missing; the logbook is empty. The service is harder to do correctly."
            doInstead="Documentation handover is part of acceptance, not separate from it. The responsible person walks through every document with the commissioning engineer; questions are asked; gaps are identified; the package is updated before signing the acceptance certificate. The 2025 standard\'s explicit obligation on the commissioning technician to inform the user about documentation maintenance is directly relevant. Some commissioning organisations now offer documentation training as part of acceptance; make use of it."
          />

          <CommonMistake
            title="Letting the logbook drift out of date"
            whatHappens="A premises fire alarm logbook is well-maintained for the first year — every event recorded, every service entered. By year three the entries thin: fire-tests are recorded but routine faults are not; some disablements are not recorded; the recent firmware update certificate is filed in the office but not entered in the logbook. By year five the logbook is essentially abandoned; the receptionist records the weekly user test and that is all. A subsequent fire risk assessment review finds no record of multiple events that have occurred and nothing about the variations that have been agreed over the years."
            doInstead="The logbook is updated at every event, in real time. The responsible person\'s standing instructions to staff include logbook entry as part of any system action. The service organisation reviews the logbook at every service visit and prompts entries for events the responsible person\'s staff have missed. Periodic audits (annually) of the logbook against the system\'s history catch and correct any drift. The 2025 all-variations-in-logbook rule makes the logbook even more important than before — it is the single source of truth for the system\'s departures from standard."
          />

          <CommonMistake
            title="Not updating drawings after modifications"
            whatHappens="A fire alarm system has had three extensions over five years: a new wing, a new mezzanine, and an upgrade of the kitchen detector configuration. Each was certificated (extension or modification certificate). But the drawings — block diagram, schematic, riser, zone plan — were never updated to reflect the changes. The new wing is on the system but not on any drawing. Three years later, a fault occurs in the new wing; the service engineer cannot diagnose because the drawings show only the original system. The fault is misdiagnosed; a wrong device is replaced; the actual issue persists."
            doInstead="Drawings are updated as part of every modification. The certificate references the updated drawing revision. The old drawing is archived for historical reference; the new drawing supersedes. The vendor or design organisation typically holds the master drawings (revision-controlled); they issue updates as needed. The responsible person\'s O&amp;M manual is updated to refer to the latest revision. The service organisation accesses the latest drawings during service visits."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-1:2025 documentation set: design package + cause-and-effect matrix + commissioning certificate + acceptance certificate (Annex G) + O&M manual + logbook (Annex H).',
              'Cause-and-effect matrix is NEW MANDATORY at handover from 2025. Even a one-line description for simple systems.',
              'Zone plan at the CIE per clause 22.2.5. Absence in multi-zone sleeping premises = unacceptable variation.',
              'Acceptance certificate (Annex G): responsible person formally accepts the system. Custody transfers.',
              'Extension OR modification certificate (clause 47): both extensions AND modifications. Firmware updates = modifications (NEW 2025).',
              'Variations: ALL agreed variations now in the logbook. Two specific UNACCEPTABLE variations cannot be agreed at all.',
              'Logbook: Annex H (was Annex F in 2017). Located at or near the CIE. Fire alarm events, faults, disablements, tests, services, modifications, variations.',
              'O&M manual: working tool for the responsible person. Operating instructions, system description, configuration, schedule, contacts, certificates.',
              'Drawings: zone plan + block diagram + schematic + riser. Updated on every modification; revision controlled.',
              'Documentation gaps in older systems: identify; commission completion exercises; close gaps progressively at modifications.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Does an existing pre-2025 system need to retrofit a cause-and-effect matrix to comply?',
                answer:
                  "Strictly, BS 5839-1:2025 requires the matrix at handover documentation — for new handovers from 2025 onward. Existing systems are not retrospectively required to retrofit a matrix to be compliant. However, retrofitting is good practice: the matrix is a living document that supports service, modification, and fire risk assessment. Many service organisations now produce a matrix on first service visit to a previously undocumented system, with the responsible person's agreement.",
              },
              {
                question: 'How is the logbook stored — paper or digital?',
                answer:
                  'Traditionally paper, located at or near the CIE, durable bound book. Increasingly hybrid: paper logbook at the CIE for fire-fighter access during incidents; digital records held by the service organisation and / or in the CIE itself for trend analysis. The 2025 standard does not prescribe medium but does require the information be recorded; the location requirement (at or near the CIE) practically requires a physical artefact for fire-and-rescue access.',
              },
              {
                question: 'What is the difference between Annex F (2017) and Annex H (2025)?',
                answer:
                  'Annex F in BS 5839-1:2017 was the logbook annex. In BS 5839-1:2025 the logbook annex has been renumbered to Annex H, with content updates reflecting the 2025 requirements: all variations recorded (was: major only), firmware updates as modifications, expanded event categories. The annex layout in 2025 differs from 2017; existing service organisations need to update their reference to the new annex letter.',
              },
              {
                question: 'Does the responsible person need to update drawings themselves?',
                answer:
                  'No — drawing updates are typically performed by the design organisation or service organisation as part of any modification. The responsible person ensures the modification certificate references the updated drawing and that the latest drawing is filed in the O&M manual. The drawings are revision-controlled by the design / service organisation; the responsible person holds the working copies.',
              },
              {
                question: 'What does an "acceptance certificate" look like?',
                answer:
                  "Annex G of BS 5839-1:2025 provides the template. It is a single-page document with sections for: system description (zone count, system category, CIE type), commissioning organisation reference, design package reference (drawings, cause-and-effect matrix), date of commissioning, date of acceptance, responsible person's signature, commissioning engineer's signature, any conditions / variations relevant to acceptance. The completed certificate is filed in the O&M manual and copied in the responsible person's fire safety file.",
              },
              {
                question: 'Are firmware updates really modifications requiring a certificate?',
                answer:
                  'Yes — explicitly per BS 5839-1:2025 clause 47. The 2017 standard was ambiguous; remote firmware updates were sometimes performed without certification. The 2025 standard closes this: firmware updates are modifications. The certificate documents the firmware version updated, the date, the engineer, and any verification done after the update. The cause-and-effect matrix and detector configurations are verified to confirm they still operate correctly after the firmware change.',
              },
              {
                question: 'How are unacceptable variations handled if a designer presents one?',
                answer:
                  'The design is non-compliant. The unacceptable-variations list (clause 6) — absence of zone plan in multi-zone sleeping premises, absence of ARC transmission in supported housing or care homes — cannot be agreed as variations. The designer must revise the design to incorporate the omitted feature. The responsible person, the fire risk assessor, and the local fire and rescue service all have grounds to refuse acceptance of a system with one of these departures. The 2025 standard makes this explicit; the 2017 standard did not.',
              },
              {
                question: 'Is the documentation set stored on-site or off-site?',
                answer:
                  'Both. The operational documents (logbook, O&M manual, certificates) are stored on-site, typically at or near the CIE for fire-fighter / responsible person access. Master drawings, design rationale, vendor records are often held by the design / service organisation off-site (with revision-controlled copies on-site). Backup copies (USB / cloud) are increasingly common but should not replace the physical on-site documents — the standard’s expectation is that the documents are present at the premises during fire conditions.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Design documentation — Module 3.6" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 4</div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule3Section6;
