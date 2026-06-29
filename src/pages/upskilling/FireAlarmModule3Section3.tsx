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
    id: 'fam3-s3-matrix',
    question: 'What does a cause-and-effect matrix specify?',
    options: [
      'The cable routes and terminations for each circuit on the system.',
      'The detector types selected for each area of the protected premises.',
      'For each input event (cause), the outputs the system produces in response (effect).',
      'The total number of detection zones the CIE is configured for.',
    ],
    correctIndex: 2,
    explanation:
      "The cause-and-effect matrix is the system's programmed behaviour expressed as a table. Causes are along one axis (each detector zone, each call point, each interface input); effects are along the other (each sounder circuit, each output, each interface to plant / door release / lift). At each cell, the matrix records what the cause triggers and at what stage. It is the core programming document.",
  },
  {
    id: 'fam3-s3-mandatory',
    question:
      'BS 5839-1:2025 documentation/handover clause introduces a new requirement about cause-and-effect. What is it?',
    options: [
      'The matrix must be produced in colour for the handover documentation.',
      'A cause-and-effect matrix or text description is now mandatory at handover.',
      'The matrix must be encrypted before it is handed to the purchaser.',
      'The matrix remains optional and may be omitted from the handover pack.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 documentation clause closes a long-standing gap: pre-2025, cause-and-effect was often verbal or implicit. From 2025, the system handover documentation MUST include a cause-and-effect matrix or text description. The complexity is proportional to the system: simple one-stage simultaneous evacuation = one sentence; phased evacuation in a high-rise = a detailed matrix.',
  },
  {
    id: 'fam3-s3-coincidence',
    question: 'What is two-detector coincidence (or two-stage coincidence) used for?',
    options: [
      'To save power by limiting how often the panel polls the loop devices.',
      'To cut false alarms by requiring two detectors to operate before full alarm.',
      'To detect fires faster by lowering the sensitivity threshold of each detector.',
      'To replace heat detectors with smoke detectors in false-alarm-prone areas.',
    ],
    correctIndex: 1,
    explanation:
      "Coincidence schemes filter spurious single-detector activations. They are not a replacement for proper detector selection but are a powerful tool where a single false trigger has a high cost (e.g. shutdown of a critical process). Coincidence increases the time-to-alarm slightly — that trade-off must be assessed against the false-alarm cost. The 2025 standard's emphasis on multi-sensor detectors (Annex D) addresses similar goals.",
  },
  {
    id: 'fam3-s3-daynight',
    question: 'What is the purpose of day / night sensitivity settings?',
    options: [
      'To save power by reducing detector activity outside occupied hours.',
      'Different sensitivity thresholds by time of day to match occupancy patterns.',
      'A cosmetic dimming of the panel display during night-time hours.',
      'A mode used only during periodic testing of the installation.',
    ],
    correctIndex: 1,
    explanation:
      "Day / night settings are part of the cause-and-effect logic — the same physical event triggers different system responses depending on time of day. They must be carefully designed (and reviewed annually) so that night-mode does not inadvertently degrade detection in occupied zones. Per the 2025 maintenance clause, the CIE's real-time clock should be checked and adjusted at every service visit, particularly important where day / night settings are in use.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the purpose of a cause-and-effect matrix in fire alarm design?',
    options: [
      'A wiring diagram showing the cable routes and terminations on the system.',
      'A bill of materials listing every detector and device on the system.',
      'For every input (cause), the outputs the system produces (the effect).',
      'A test schedule listing each of the commissioning checks to be carried out.',
    ],
    correctAnswer: 2,
    explanation:
      "The cause-and-effect matrix is hardware-independent. It expresses the design intent in functional terms. The CIE is then programmed to implement the matrix; tests verify the implementation matches. Without a written matrix, the system's behaviour exists only in the CIE configuration — a fragile and undocumented state.",
  },
  {
    id: 2,
    question:
      'In a one-stage (simultaneous) evacuation, what happens when any detector or call point operates?',
    options: [
      'All evacuation sounders and VADs across the building operate together at once.',
      'A silent warning is sent only to the building manager for investigation.',
      'Only the sounders in the operated zone activate, leaving other zones silent.',
      'No sounders activate at all until a second device confirms the alarm.',
    ],
    correctAnswer: 0,
    explanation:
      'One-stage simultaneous is the simplest cause-and-effect: any cause = full evacuation. The matrix is essentially "all causes → all effects". Larger buildings often use phased or two-stage strategies because simultaneous evacuation of (say) a high-rise is impractical and creates congestion in stairways. The choice of staging is driven by the building\'s fire safety strategy.',
  },
  {
    id: 3,
    question: 'What is two-stage (alert / evacuate) alarm philosophy?',
    options: [
      'It requires two detectors to operate in coincidence before any signal.',
      'It uses two separate CIE displays running in parallel for redundancy.',
      'It requires two independent power supplies to be present at the panel.',
      'A staged response: stage 1 alerts staff to investigate, stage 2 evacuates.',
    ],
    correctAnswer: 3,
    explanation:
      'Two-stage alarm separates the "something is happening" signal from the "everyone evacuate" signal. It buys time for staff investigation in environments where mass evacuation is operationally costly (hospitals, hotels). The matrix specifies the alert / evacuate progression, the time-outs, the manual escalation paths.',
  },
  {
    id: 4,
    question:
      'In a phased evacuation strategy in a multi-storey building, what typically happens first when fire is detected?',
    options: [
      'The whole building evacuates simultaneously the moment fire is detected.',
      'The fire floor and the one above evacuate first, then others in timed sequence.',
      'Only the basement is evacuated first, before any of the upper floors.',
      'No floors evacuate at all until the fire and rescue service arrives.',
    ],
    correctAnswer: 1,
    explanation:
      "Phased evacuation is a sophisticated staging in which the cause (fire on floor N) triggers a sequence of effects on different floors with time gaps. The strategy is set by the building's fire engineering and codified in the cause-and-effect matrix. The CIE implements the timing logic. Test programmes verify the sequence is followed.",
  },
  {
    id: 5,
    question: 'What is "investigation delay" in a cause-and-effect strategy?',
    options: [
      'A fault condition that delays the system from starting up correctly.',
      'A network communication delay between devices on the addressable loop.',
      'A programmed delay between detection and evacuation, letting staff investigate.',
      'A power-up sequence delay applied after a mains supply failure.',
    ],
    correctAnswer: 2,
    explanation:
      'Investigation delay is a false-alarm management tool. It must not be used in environments where staff cannot promptly investigate (e.g. an unoccupied building at night). Misapplied investigation delay materially delays evacuation in a real fire and is a design error. Day / night settings are how this is typically managed: investigation delay during occupied hours; immediate alarm during unoccupied hours.',
  },
  {
    id: 6,
    question:
      'A multi-sensor detector with selectable response characteristics (smoke, heat, CO, combination) is installed. Where is the selection recorded per BS 5839-1:2025 clause 20.11?',
    options: [
      'In the design and the O&M manual (Annex D format), as system documentation.',
      'Only on a printed label physically fixed to the body of the detector.',
      'Only within the CIE display configuration held on the control panel.',
      'Only in the cable schedule drawn up for the addressable loop.',
    ],
    correctAnswer: 0,
    explanation:
      'The 2025 standard emphasises this strongly because multi-sensor detectors with selectable modes are increasingly common. The mode the detector operates in is design intent, not detector hardware. It must be recorded in the design (so the commissioning engineer programs it correctly) and in the O&M manual (so the maintenance organisation knows what to verify). Annex D — formerly Annex E — provides the recording format.',
  },
  {
    id: 7,
    question: 'What does a coincidence-of-two-detectors logic require?',
    options: [
      'A single detector operating triggers the full alarm immediately.',
      'Two separate CIEs must both register the event before any alarm.',
      'Two independent power supplies must both be present to alarm.',
      'Two separate detectors must operate; the first warns, the second escalates.',
    ],
    correctAnswer: 3,
    explanation:
      'Coincidence schemes require careful design: the two coincidence detectors must be physically positioned so a real fire would activate both within a reasonable time window, and the time window must be set appropriately. Too tight = real fires miss the coincidence; too loose = the false-alarm filtering benefit erodes. The cause-and-effect matrix records the coincidence logic and timings.',
  },
  {
    id: 8,
    question: 'How are day / night settings typically used in cause-and-effect design?',
    options: [
      'To switch the building lighting on and off automatically by time of day.',
      'Different logic by time: investigation delay by day, immediate alarm by night.',
      'To save energy by powering detectors down completely overnight.',
      'To adjust the colour temperature of the panel indicator LEDs by time.',
    ],
    correctAnswer: 1,
    explanation:
      "Day / night settings encode the temporal context of the response into the system. They are a powerful false-alarm management tool but they must be designed correctly — the day / night transitions must reflect actual occupancy, not arbitrary clock times. The matrix records the schedule; the CIE's clock executes it.",
  },
  {
    id: 9,
    question:
      'Why is the cause-and-effect matrix maintained as documentation, not just programmed into the CIE?',
    options: [
      'It is kept purely by long-standing convention and tradition in the trade.',
      'It is retained only as a convenience for the original installer of the system.',
      'The CIE config can be lost on replacement; the document survives and is required at handover.',
      'It is kept solely for staff training and familiarisation purposes.',
    ],
    correctAnswer: 2,
    explanation:
      "Documentation is the persistent record. CIE configurations are vendor-specific binary data that may not transfer across firmware upgrades or CIE replacements. The cause-and-effect matrix, written as a table or text, is the architecture-independent specification. It guides the next CIE's programming when the original is replaced, which is a 10-15 year horizon many systems will face.",
  },
  {
    id: 10,
    question:
      'A cause-and-effect matrix shows: "Smoke detector zone 3 operates → Sounder circuit S1 (zone 3 sounders) operate immediately; Sounder circuit S2 (whole building) operates after 60 seconds delay". What evacuation philosophy is this?',
    options: [
      'A staged philosophy: zone 3 evacuates at once, the building after a 60 s delay.',
      'A one-stage simultaneous evacuation of the whole building on detection.',
      'A configuration that produces no alarm output to the sounders at all.',
      'A network handshake between loop devices, unrelated to evacuation.',
    ],
    correctAnswer: 0,
    explanation:
      'This is one of many possible staging strategies. The matrix encodes the precise timing and sequencing. Different fire safety strategies generate different matrices; there is no one-size-fits-all. The matrix is the bridge between the fire engineering and the system programming.',
  },
];

const FireAlarmModule3Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Cause and effect programming | Fire Alarm Module 3.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 cause-and-effect: input/output relationship matrices, mandatory at handover from 2025, one-stage / two-stage / phased evacuation philosophies, coincidence schemes, day/night settings, multi-sensor detector configuration recording.',
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
            eyebrow="Module 3 · Section 3"
            title="Cause and effect programming"
            description="BS 5839-1:2025: cause-and-effect matrices now mandatory at handover, one-stage and two-stage and phased evacuation philosophies, coincidence (two-detector) schemes, day / night sensitivity settings, and how multi-sensor detector configuration is recorded per Annex D."
            tone="yellow"
          />

          <TLDR
            points={[
              'Cause-and-effect matrix = the logical specification of system behaviour. For each input (cause), what outputs operate (effects), at what stage, with what timings.',
              'NEW in BS 5839-1:2025: cause-and-effect matrix or text description is MANDATORY at handover documentation. Pre-2025, this was often verbal or implicit.',
              'One-stage (simultaneous) evacuation: any cause = all sounders. Simplest matrix. Used in small premises and single-compartment buildings.',
              'Two-stage (alert / evacuate): stage 1 = alert signal to staff for investigation; stage 2 = full evacuation. Used in hospitals, hotels with managed response.',
              'Phased evacuation: fire floor + floor above evacuate first; remaining floors evacuate in sequence. Used in tall buildings to manage stairway congestion.',
              'Coincidence (two-detector) schemes: two detectors must operate before full alarm. Reduces false alarms in high-risk environments (kitchens, dust). Trade-off: slight delay to alarm.',
              'Day / night settings: different cause-and-effect at different times. Investigation delay during occupied hours; immediate alarm overnight. Real-time clock controls; checked at every service.',
              'Multi-sensor detector mode (smoke, heat, CO, combination) recorded by the designer per BS 5839-1:2025 clause 20.11; available to commissioning; in O&M manual; format per Annex D Figure D.1.',
              'The matrix is hardware-independent and survives CIE replacements, firmware updates, and modifications. The CIE configuration alone is not the documentation.',
              'Verification: commissioning tests confirm each matrix entry is correctly implemented in the CIE programming. Documented in the commissioning certificate.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Produce a cause-and-effect matrix that captures every input event and its outputs, at the staging and timing required by the fire engineering',
              'Apply the new BS 5839-1:2025 documentation/handover requirement: the cause-and-effect matrix or text description is mandatory in handover documentation',
              'Distinguish one-stage simultaneous, two-stage alert / evacuate, and phased evacuation philosophies and choose appropriately for the building',
              'Design coincidence (two-detector) schemes to reduce false alarms while preserving real-fire response; understand the trade-off',
              'Configure day / night sensitivity settings consistent with occupancy patterns; verify the CIE real-time clock at every service',
              'Record multi-sensor detector configuration per BS 5839-1:2025 clause 20.11 / Annex D Figure D.1 in the design package and O&M manual',
              'Verify CIE programming against the matrix at commissioning; record the verification on the commissioning certificate',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What a cause-and-effect matrix is</ContentEyebrow>

          <ConceptBlock
            title="Inputs, outputs, and the table that connects them"
            plainEnglish="A cause-and-effect matrix is a table. Down the left side: every input the system can receive — each detector zone, each call point, each interface input (sprinkler flow switch, manual input, network signal). Across the top: every output the system can produce — each sounder circuit, each visual alarm device circuit, each interface output (door release, lift recall, plant shutdown, ventilation control), each network signal out. At each intersection, an entry says what happens: blank = no action; immediate = output activates as soon as the cause is detected; delayed = output activates after a defined time; staged = output activates at a defined stage. The matrix is the system's behavioural specification."
            onSite="When you arrive at a site to commission a system, the cause-and-effect matrix is the most important document in the package. Read it before you turn anything on. Every test you do is verifying one row of the matrix."
          >
            <p>What goes on each axis:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Causes (inputs)</strong> — every detector zone or device address; every call
                point; every interface input from external systems (sprinkler flow switch, gas
                detection, BMS signal, manual input, network signal from a peer panel).
              </li>
              <li>
                <strong>Effects (outputs)</strong> — every sounder circuit; every voice alarm
                output; every visual alarm device (VAD) circuit; every interface output (relay or
                volt-free contact) to plant, doors, lifts, ventilation, BMS, ARC transmission.
              </li>
              <li>
                <strong>Cell entries</strong> — the action and any time / stage qualifier.
                &quot;Immediate&quot;, &quot;delayed 60 s&quot;, &quot;stage 1&quot;, &quot;stage
                2&quot;, &quot;coincidence required&quot;, &quot;disabled at night&quot;.
              </li>
            </ul>
            <p>
              For complex systems (high-rise phased evacuation), the matrix can be a substantial
              document — many input rows, many output columns, careful staging. For simple systems
              (small office, simultaneous evacuation), the matrix can be a sentence: &quot;any cause
              activates all effects immediately&quot;. Both are valid; both are documentation; both
              are now mandatory under BS 5839-1:2025.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Documentation/handover clause"
            clause={
              <>
                A new item that appears within the documentation clause of BS 5839-1:2025 is the
                recommendation that a cause-and-effect matrix or text description of how the cause
                and effect operates is included with the documentation to be provided to the
                purchaser or user of the system. This could be as simple as &quot;this system
                operates as a simultaneous evacuation&quot; or a cause-and-effect matrix document
                might be required for more complex strategies. The standard does not dictate the
                manner of the cause-and-effect matrix only that it needs to be produced.
              </>
            }
            meaning="Three specific changes. (1) Matrix is now mandatory in handover documentation — pre-2025 this was often verbal or in commissioning notes only. (2) Format is flexible: text description for simple systems, full matrix for complex. (3) The standard requires it be PRODUCED — the deliverable is on the system commissioner, included in the handover pack, retained by the responsible person."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — example cause and effect matrix */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Example cause-and-effect matrix — three-storey hotel with phased evacuation
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="A cause-and-effect matrix tabulating fire alarm causes (detector zones and call points) against effects (sounders, lift recall, plant shutdown, door release, ARC transmission) showing immediate, delayed, and staged responses."
            >
              <text
                x="440"
                y="26"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                Cause-and-effect matrix — phased evacuation
              </text>

              {/* Header row */}
              <rect
                x="40"
                y="50"
                width="180"
                height="40"
                rx="4"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x="130"
                y="74"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                CAUSE ↓ / EFFECT →
              </text>

              {/* Effect column headers */}
              <rect
                x="220"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1"
              />
              <text
                x="265"
                y="68"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                Sounders
              </text>
              <text x="265" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                fire floor
              </text>

              <rect
                x="310"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1"
              />
              <text
                x="355"
                y="68"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                Sounders
              </text>
              <text x="355" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                floor above
              </text>

              <rect
                x="400"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(34,211,238,0.15)"
                stroke="#22D3EE"
                strokeWidth="1"
              />
              <text
                x="445"
                y="68"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                Sounders
              </text>
              <text x="445" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                whole bldg
              </text>

              <rect
                x="490"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(168,85,247,0.15)"
                stroke="#A855F7"
                strokeWidth="1"
              />
              <text
                x="535"
                y="68"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9"
                fontWeight="bold"
              >
                Lift recall
              </text>
              <text x="535" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                EN 81-73
              </text>

              <rect
                x="580"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1"
              />
              <text
                x="625"
                y="68"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                Plant
              </text>
              <text x="625" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                HVAC shut
              </text>

              <rect
                x="670"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(34,197,94,0.15)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="715"
                y="68"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                Doors
              </text>
              <text x="715" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                holders rel
              </text>

              <rect
                x="760"
                y="50"
                width="90"
                height="40"
                rx="4"
                fill="rgba(239,68,68,0.15)"
                stroke="#EF4444"
                strokeWidth="1"
              />
              <text
                x="805"
                y="68"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                ARC tx
              </text>
              <text x="805" y="80" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8">
                fire signal
              </text>

              {/* Cause rows */}
              {/* Row 1 — Smoke detector Z1 (ground) */}
              <rect
                x="40"
                y="100"
                width="180"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="50" y="120" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Smoke detector Z1 (ground)
              </text>

              <rect
                x="220"
                y="100"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="265"
                y="121"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="310"
                y="100"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="355"
                y="121"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="400"
                y="100"
                width="90"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="445" y="121" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                +60 s
              </text>

              <rect
                x="490"
                y="100"
                width="90"
                height="34"
                fill="rgba(168,85,247,0.08)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1"
              />
              <text
                x="535"
                y="121"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                RECALL
              </text>

              <rect
                x="580"
                y="100"
                width="90"
                height="34"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="625"
                y="121"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SHUT
              </text>

              <rect
                x="670"
                y="100"
                width="90"
                height="34"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
              />
              <text
                x="715"
                y="121"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RELEASE
              </text>

              <rect
                x="760"
                y="100"
                width="90"
                height="34"
                fill="rgba(239,68,68,0.08)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
              />
              <text
                x="805"
                y="121"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                FIRE
              </text>

              {/* Row 2 — Smoke detector Z2 (first) */}
              <rect
                x="40"
                y="134"
                width="180"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="50" y="154" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Smoke detector Z2 (first)
              </text>

              <rect
                x="220"
                y="134"
                width="90"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="265" y="155" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Z1 only
              </text>

              <rect
                x="310"
                y="134"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="355"
                y="155"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="400"
                y="134"
                width="90"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="445" y="155" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                +60 s
              </text>

              <rect
                x="490"
                y="134"
                width="90"
                height="34"
                fill="rgba(168,85,247,0.08)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1"
              />
              <text
                x="535"
                y="155"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                RECALL
              </text>

              <rect
                x="580"
                y="134"
                width="90"
                height="34"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="625"
                y="155"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SHUT
              </text>

              <rect
                x="670"
                y="134"
                width="90"
                height="34"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
              />
              <text
                x="715"
                y="155"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RELEASE
              </text>

              <rect
                x="760"
                y="134"
                width="90"
                height="34"
                fill="rgba(239,68,68,0.08)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
              />
              <text
                x="805"
                y="155"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                FIRE
              </text>

              {/* Row 3 — Manual call point any */}
              <rect
                x="40"
                y="168"
                width="180"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="50" y="188" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Manual call point (any)
              </text>

              <rect
                x="220"
                y="168"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="265"
                y="189"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="310"
                y="168"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="355"
                y="189"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="400"
                y="168"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="445"
                y="189"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="490"
                y="168"
                width="90"
                height="34"
                fill="rgba(168,85,247,0.08)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1"
              />
              <text
                x="535"
                y="189"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                RECALL
              </text>

              <rect
                x="580"
                y="168"
                width="90"
                height="34"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="625"
                y="189"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SHUT
              </text>

              <rect
                x="670"
                y="168"
                width="90"
                height="34"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
              />
              <text
                x="715"
                y="189"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RELEASE
              </text>

              <rect
                x="760"
                y="168"
                width="90"
                height="34"
                fill="rgba(239,68,68,0.08)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
              />
              <text
                x="805"
                y="189"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                FIRE
              </text>

              {/* Row 4 — Sprinkler flow switch */}
              <rect
                x="40"
                y="202"
                width="180"
                height="34"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="50" y="222" fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="bold">
                Sprinkler flow switch
              </text>

              <rect
                x="220"
                y="202"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="265"
                y="223"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="310"
                y="202"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="355"
                y="223"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="400"
                y="202"
                width="90"
                height="34"
                fill="rgba(34,211,238,0.08)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1"
              />
              <text
                x="445"
                y="223"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="10"
                fontWeight="bold"
              >
                IMMED
              </text>

              <rect
                x="490"
                y="202"
                width="90"
                height="34"
                fill="rgba(168,85,247,0.08)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1"
              />
              <text
                x="535"
                y="223"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                RECALL
              </text>

              <rect
                x="580"
                y="202"
                width="90"
                height="34"
                fill="rgba(251,191,36,0.08)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1"
              />
              <text
                x="625"
                y="223"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SHUT
              </text>

              <rect
                x="670"
                y="202"
                width="90"
                height="34"
                fill="rgba(34,197,94,0.08)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1"
              />
              <text
                x="715"
                y="223"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                RELEASE
              </text>

              <rect
                x="760"
                y="202"
                width="90"
                height="34"
                fill="rgba(239,68,68,0.08)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1"
              />
              <text
                x="805"
                y="223"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                FIRE
              </text>

              {/* Legend */}
              <rect
                x="40"
                y="260"
                width="820"
                height="180"
                rx="8"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text x="60" y="282" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Reading the matrix:
              </text>
              <text x="60" y="304" fill="rgba(255,255,255,0.7)" fontSize="10">
                Each row = one input (cause). Each column = one output (effect). Each cell = the
                action.
              </text>
              <text x="60" y="324" fill="rgba(255,255,255,0.7)" fontSize="10">
                IMMED = output activates as soon as the cause is detected. +60 s = output activates
                60 seconds after the cause.
              </text>
              <text x="60" y="344" fill="rgba(255,255,255,0.7)" fontSize="10">
                Z1 only = sounders only on the originating zone (phased — zone above also activates,
                whole building delayed).
              </text>
              <text x="60" y="364" fill="rgba(255,255,255,0.7)" fontSize="10">
                Manual call point = always full immediate evacuation (whole building) regardless of
                zone — overrides phased delay.
              </text>
              <text x="60" y="386" fill="#FBBF24" fontSize="10" fontWeight="bold">
                NEW in BS 5839-1:2025 (clause 38.1b): the matrix is MANDATORY in handover
                documentation — even a one-line text description.
              </text>
              <text x="60" y="408" fill="rgba(255,255,255,0.6)" fontSize="9">
                Multi-sensor detector mode (smoke / heat / CO / combination) recorded per Annex D
                Figure D.1 alongside the matrix. The CIE programming verifies against the matrix at
                commissioning.
              </text>
              <text x="60" y="426" fill="rgba(255,255,255,0.6)" fontSize="9">
                Day / night logic: separate matrix or annotated columns for night-mode behaviour.
                CIE clock checked at every service per BS 5839-1:2025 maintenance clause.
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Evacuation philosophies — one-stage, two-stage, phased</ContentEyebrow>

          <ConceptBlock
            title="One-stage simultaneous evacuation"
            plainEnglish="The simplest staging philosophy. Any cause triggers all evacuation effects immediately. The whole building evacuates at once. The matrix has effectively one row: 'all causes'. The matrix has effectively one column: 'all effects'. Single time delay (immediate). Used in small premises, single-compartment buildings, and any building where simultaneous evacuation is the design intent."
          >
            <p>Suitable for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Small offices</strong> — total population that can clear the building in a
                few minutes via a small number of exits.
              </li>
              <li>
                <strong>Retail premises</strong> — public access; occupants are unfamiliar with the
                building; rapid simultaneous evacuation is the safest response.
              </li>
              <li>
                <strong>Single-compartment buildings</strong> — no sub-divisions to evacuate
                differently; all areas are equivalent in the response model.
              </li>
              <li>
                <strong>Buildings with one or two storeys</strong> and occupant numbers not
                producing stairway congestion at simultaneous evacuation.
              </li>
            </ul>
            <p>
              Unsuitable for tall buildings (stairway congestion), hospitals (mass evacuation
              impractical), and any premises with managed-response staffing where staged response is
              the design intent.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Two-stage alert / evacuate"
            plainEnglish="A staged response with two states. Stage 1: an alert signal — distinguishably different from the full alarm — sent to staff and trained occupants, prompting investigation. Stage 2: full evacuation — the standard fire alarm sound across all areas. Stage 2 may be triggered automatically (after a time-out, e.g. 60 seconds, or by a second detector activating) or manually (a staff member confirming a real fire and pressing an evacuate button). Used in hospitals, hotels with dispersed staff, large premises with managed response."
          >
            <p>The alert signal is typically:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A different audible pattern (intermittent, modulated, voice-message-only) audible
                only to staff areas.
              </li>
              <li>
                A signal to staff pagers, public-address messages directed to staff, or visual
                indicators on a staff board.
              </li>
              <li>
                A signal to a security / reception desk that displays the cause and prompts
                investigation.
              </li>
            </ul>
            <p>
              The escalation to stage 2 (full evacuation) is critical: too long a delay = a real
              fire develops while staff investigate; too short = the false-alarm-management benefit
              is lost. The matrix records the time-out and the manual escalation paths. Day / night
              settings often disable two-stage during unoccupied hours, reverting to immediate
              evacuation.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Phased evacuation"
            plainEnglish="A sophisticated staging used in tall buildings. Fire is detected on floor N. The system evacuates floor N and floor N+1 (the floor immediately above) FIRST, because they are at most immediate risk. Then, after a defined time interval (typically 1-3 minutes per stage), additional floors evacuate in a programmed sequence — typically floors above N+1 next, then floors below N, and so on. The strategy manages stairway congestion: too many people in the stair at once creates a bottleneck and slows everyone down."
          >
            <p>The phased strategy parameters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Initial evacuation</strong> — fire floor + floor above. Always. The most
                exposed populations evacuate without delay.
              </li>
              <li>
                <strong>Subsequent evacuation</strong> — sequenced upward then downward (or per the
                building\&apos;s fire engineering). Time intervals typically 1-3 minutes between
                stages.
              </li>
              <li>
                <strong>Manual call point override</strong> — a manual call point typically triggers
                immediate full-building evacuation (overrides the phased sequence). This is because
                a manual call point is a confirmed fire signal from a person who has seen the fire.
              </li>
              <li>
                <strong>Voice alarm integration</strong> — phased evacuation is typically paired
                with a voice alarm system (BS 5839-8) that gives clear evacuation messages per floor
                and per stage.
              </li>
            </ul>
            <p>
              The matrix for a phased system is substantial. Each floor row is an input; each floor
              sounder zone is an output column; each cell records the time at which that floor
              sounds in response to a fire on each other floor. Building-specific; designed
              alongside the fire engineering of the building.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 22 (Cause and effect) and BS 9999 (general fire engineering)"
            clause={
              <>
                The cause-and-effect matrix should reflect the fire safety strategy of the building
                as established by the fire risk assessment and any fire engineering analysis. Where
                staged evacuation is provided (whether two-stage alert/evacuate, phased, or other),
                the staging shall be clearly recorded in the matrix and programmed at the CIE
                accordingly. Manual call points shall, in general, trigger immediate full evacuation
                regardless of any staging applied to detector inputs.
              </>
            }
            meaning="Three principles. (1) The matrix follows the fire engineering — not the other way round. The architect / fire engineer decides the strategy; the matrix encodes it. (2) Staging is documented, not implicit. The CIE's programming reflects the documented staging. (3) Manual call points override staging — a person seeing a fire is the highest-confidence fire signal and warrants immediate full-evacuation response."
          />

          <SectionRule />

          <ContentEyebrow>Coincidence schemes and false-alarm management</ContentEyebrow>

          <ConceptBlock
            title="Two-detector coincidence — when one is not enough"
            plainEnglish="In environments with persistent false-alarm risk — kitchens (steam, smoke from cooking), warehouses (dust, vehicle exhaust), plant rooms (occasional smoke / steam from plant) — a single detector activation may not be reliable evidence of a fire. The two-detector coincidence scheme requires TWO detectors in the same defined area to operate before the system goes to full alarm. The first activation raises a 'first-stage' or 'warning' state at the CIE; only the second activation triggers the matrix's full effects."
          >
            <p>Design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Coincidence area</strong> — the defined area in which two detectors must
                operate. Typically the same room or zone. The two detectors must be physically
                positioned so a real fire would activate both within a reasonable time window (a
                fire too localised to reach both is a real risk).
              </li>
              <li>
                <strong>Time window</strong> — the maximum interval between the first and second
                activation that still constitutes coincidence. Too short = real fires miss the
                window; too long = false-alarm filtering benefit erodes. Typical 60-180 seconds.
              </li>
              <li>
                <strong>First-stage action</strong> — what the first activation does. Often: alert
                staff at the CIE (via a flashing indicator or local audible signal), without
                triggering full alarm. May trigger interface outputs that are reversible (e.g. damp
                down a process) without triggering evacuation.
              </li>
              <li>
                <strong>Day / night context</strong> — coincidence is typically used in occupied
                hours when staff can investigate the first-stage signal. At night with no staff
                present, single-detector immediate alarm is often the right choice.
              </li>
            </ul>
            <p>
              Coincidence is a tool, not a default. It must be designed correctly. Deploying it
              everywhere increases time-to-alarm for genuine fires; deploying it nowhere accepts
              false-alarm cost in the spaces that warrant it. The design package documents where
              coincidence is used and why.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <ConceptBlock
            title="Day / night settings — context-aware sensitivity"
            plainEnglish="Many fire alarm systems support different cause-and-effect logic at different times of day. During occupied hours: investigation delays, coincidence schemes, multi-sensor detector modes that filter cooking-related false positives. During unoccupied hours: immediate single-detector alarm response, no investigation delay. The CIE's real-time clock controls the switch-over. Schedules can be daily (e.g. 08:00 day mode, 22:00 night mode) or accommodate weekends and special calendar dates."
          >
            <p>Practical examples:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Hotel kitchen</strong> — day mode: coincidence-of-two with 90 s window
                (cooking activity expected). Night mode: single-detector immediate (kitchen closed,
                any smoke is a real fire).
              </li>
              <li>
                <strong>Hospital ward</strong> — day mode: investigation delay 60 s before staff
                pager + ward sounder. Night mode: immediate ward sounder + ARC transmission (staff
                presence is reduced).
              </li>
              <li>
                <strong>School</strong> — day mode: routine class-change tones permitted on the same
                sounders (BS 5839-1:2025 clause 15.1.12 allows this with up to 10 second duration).
                Night mode: any cause = full alarm.
              </li>
            </ul>
            <p>
              Day / night settings are powerful but must be designed correctly. A misconfigured
              schedule can leave critical hours without proper detection / response. The 2025
              standard\&apos;s emphasis on clock verification at every service visit reflects the
              importance: a real-time clock that has drifted by an hour effectively shifts every
              transition by an hour, possibly putting investigation-delay periods into unstaffed
              times.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 43.2 (12-month service) — clock verification"
            clause={
              <>
                At every service visit, any time clock of the CIE should be checked and adjusted as
                necessary. This is particularly important where systems include day/night settings.
              </>
            }
            meaning="Routine clock verification is now explicitly tied to day / night settings. The clock is the executor of the matrix's temporal logic. A drifted clock corrupts every time-dependent rule. The 6-monthly service includes a check, and adjusts as necessary — particularly around BST transitions, leap days, and system reboots that may have lost time."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Multi-sensor detectors — recording the configuration</ContentEyebrow>

          <ConceptBlock
            title="Detection mode is design intent, not detector hardware"
            plainEnglish="Modern multi-sensor detectors can be configured to operate in different modes: smoke-only, heat-only, smoke-AND-heat, smoke-OR-heat, smoke + CO, and various combinations with different sensitivity profiles. The mode the detector operates in IS PART OF THE DESIGN — the designer specifies it based on the room's use, false-alarm risk, and detection objective. The commissioning engineer programs the CIE to set each detector to its specified mode."
          >
            <p>BS 5839-1:2025 clause 20.11 requires:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Designer records the selection</strong> — the design package identifies, for
                each detector or each detector type / area, the operating mode and any configuration
                parameters.
              </li>
              <li>
                <strong>Information available to the commissioning technician</strong> — the
                commissioning engineer reads the design and programs accordingly. The programming is
                then verified against the design.
              </li>
              <li>
                <strong>Recorded in the operating and maintenance manual</strong> — the O&M manual
                carries the configuration so the maintenance organisation knows what each detector
                should do.
              </li>
              <li>
                <strong>Annex D Figure D.1</strong> provides a suitable means of recording the
                information — a tabulated format covering detector address / location / mode /
                sensitivity / coincidence / other parameters.
              </li>
            </ul>
            <p>
              The 2025 standard formerly placed Annex E for this; it is now Annex D (renumbered).
              The format is suggested, not mandated — the requirement is that the information IS
              recorded. Without a record, future service visits cannot verify the detector mode
              against the design intent.
            </p>
          </ConceptBlock>

          <Scenario
            title="Hospital surgical theatre — configuring detection"
            situation="A new operating theatre suite in a hospital. The theatre has high-flow laminar airflow ventilation, surgical lights producing significant heat, occasional anaesthetic gas spillage, and 24/7 staffing during operating hours. The fire engineer specifies smoke detection in the theatre with reduced false-alarm risk. The fire alarm designer must specify the detection mode and the cause-and-effect matrix."
            whatToDo="Specify multi-sensor detectors (smoke + heat), configured in coincidence-of-two mode during operating hours. The smoke sensor monitors for smoke; the heat sensor adds confirmation. Both must operate before alarm escalates. The matrix: theatre detector first activation = first-stage alert at theatre control desk + nurses station, no full alarm, no plant shutdown (avoid disrupting surgery). Second activation in same coincidence area = full alarm, theatre HVAC isolated to prevent smoke spread, surgery team evacuates per the building's emergency procedure. Document in the design package per BS 5839-1:2025 clause 20.11 / Annex D Figure D.1: detector address, location, mode (smoke + heat coincidence), sensitivity, day-mode timer (90 s coincidence window during operating hours), night-mode behaviour (single-detector immediate alarm when theatre is closed). Include in the cause-and-effect matrix in the handover documentation. The commissioning engineer verifies the programming matches; the test certificate records the verification."
            whyItMatters="Theatres are a textbook case where detection mode and matrix design must reflect the operational reality. A single-sensor smoke detector with immediate alarm response would generate frequent false alarms from anaesthetic spillage or transient smoke, disrupting surgery and undermining trust in the alarm. The multi-sensor + coincidence + day-mode design preserves response to genuine fires while filtering false positives. Without recording in the O&M manual, a future service visit might revert the detector to its default factory mode — silently undoing the design."
          />

          <CommonMistake
            title="Treating the cause-and-effect matrix as a commissioning artefact rather than design intent"
            whatHappens="A system is designed with simple wiring drawings and a verbal brief: 'standard fire alarm, simultaneous evacuation across the building.' The commissioning engineer programs the CIE based on this brief. No matrix is produced. Three years later, the building changes use; some areas now require staged response. The replacement designer asks for the matrix and is told there is no matrix. The engineer must reverse-engineer the system behaviour from the CIE configuration, which is fragmented, vendor-specific, and partially undocumented."
            doInstead="Produce the matrix at design stage, not at commissioning. The matrix is design intent expressed in tabular form; the CIE programming follows from it. BS 5839-1:2025 requires the matrix or text description to be in the handover documentation — even for the simplest one-stage system. A one-line text description ('this system operates as a simultaneous evacuation: any cause activates all sounders immediately') is acceptable. Producing nothing is not."
          />

          <CommonMistake
            title="Day / night settings without ongoing review"
            whatHappens="A retail premises has day / night settings: investigation delay 60 s during opening hours (08:00 - 22:00); immediate alarm overnight. The retailer changes opening hours to 24/7 (extended trading) but does not update the CIE schedule. The CIE continues to apply night-mode (immediate alarm) only between 22:00 and 08:00. During the new 22:00 - 08:00 trading period, occupants are present but the system applies the day-mode investigation delay — a delay that was designed assuming no public was on site. A real fire produces 60 s evacuation delay with hundreds of customers in the building."
            doInstead="Day / night settings are part of the cause-and-effect matrix and must be reviewed when business operations change. Annual fire risk assessment review should include the cause-and-effect matrix and verify the day / night schedule still matches occupancy. Any change to opening hours, staffing, or building use should trigger a matrix review and CIE re-programming. The 2025 standard's clock-verification clause is one part of the picture; matrix review against current operations is another."
          />

          <CommonMistake
            title="Multi-sensor detector mode reverted at maintenance"
            whatHappens="A multi-sensor detector configured for 'smoke + heat coincidence' mode in a kitchen needs replacement after a fault. The maintenance engineer fits a new detector but does not check the configuration; the new detector defaults to 'smoke-only immediate' mode. The kitchen now has standard single-sensor immediate-alarm response — and the cooking activity that the original mode was designed to filter starts triggering false alarms. The premises management complains; the source of the regression is not obvious."
            doInstead="The detector configuration is recorded in the O&M manual per BS 5839-1:2025 clause 20.11. Before replacing any detector, check the O&M manual for its configuration. Set the new detector to the same configuration. Verify against the matrix. Update the O&M manual entry with the date and engineer. The Annex D Figure D.1 format makes this routine: each row is one detector, programmed mode is one column. Follow the format and the regression is impossible."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              "Cause-and-effect matrix = the system's behavioural specification. Inputs (causes), outputs (effects), and what each cell does at what stage.",
              'BS 5839-1:2025 NEW: the matrix or text description is MANDATORY in handover documentation. Even a one-line description for simple systems.',
              'One-stage simultaneous: any cause = all effects immediately. Simplest matrix.',
              'Two-stage alert / evacuate: stage 1 alert to staff, stage 2 full evacuation. Used in hospitals, hotels, managed-response premises.',
              'Phased evacuation: fire floor + floor above first; subsequent floors in sequence. Used in tall buildings.',
              'Coincidence-of-two: two detectors must operate before full alarm. Reduces false alarms in high-risk environments.',
              'Day / night settings: different matrix logic at different times. CIE clock executes; check at every service.',
              'Multi-sensor detector mode recorded per BS 5839-1:2025 clause 20.11 / Annex D Figure D.1. In the O&M manual.',
              'Manual call points typically override staging — immediate full evacuation regardless of staged delays applied to detector inputs.',
              'Verify CIE programming against the matrix at commissioning. Any change to the matrix requires a modification certificate per BS 5839-1:2025 clause 47.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Is a cause-and-effect matrix required for a small simple fire alarm system?',
                answer:
                  'Yes — per BS 5839-1:2025 documentation/handover clause, a matrix or text description is required in the handover documentation regardless of system size. For a small simple system the description can be one sentence: "This system operates as a simultaneous evacuation: any cause activates all sounders immediately, and triggers ARC transmission and door release." That qualifies.',
              },
              {
                question:
                  "How is a cause-and-effect matrix stored and maintained over the system's life?",
                answer:
                  'In the O&M manual / handover documentation. The responsible person retains the documentation; the servicing organisation references it at every service. When the system is modified (extension, reconfiguration, firmware update), the matrix is updated and the new version is filed. Per BS 5839-1:2025 clause 47, modifications produce a modification certificate; the certificate references the updated matrix.',
              },
              {
                question:
                  'In a phased evacuation system, what happens if a manual call point is operated on a non-fire floor?',
                answer:
                  'Typically: the manual call point overrides the phased sequence and triggers immediate full-building evacuation. The reasoning: a manual call point activation is a confirmed fire signal from a person who has seen the fire. The phased sequence is a tool to manage stairway congestion when the fire location is identified by detection; a person-confirmed fire signal warrants immediate full response. The matrix records this override explicitly.',
              },
              {
                question:
                  'How long should a two-stage alert period be before automatic escalation to full alarm?',
                answer:
                  'Building-specific, typically 60-180 seconds, set by the fire engineering and recorded in the matrix. Long enough to give staff time to investigate; short enough that a real fire is not allowed to develop unchecked. The setting must be supported by the staffing model — a 180 s investigation delay is meaningful only if staff can reach the indication within 180 s of the alert. In premises with sparse staff, shorter time-outs are appropriate.',
              },
              {
                question: 'Can coincidence-of-two be used everywhere to reduce false alarms?',
                answer:
                  'No. Coincidence increases time-to-alarm slightly (the second detector must operate). In low-false-alarm-risk areas, this delay is unnecessary cost. Coincidence is targeted at specific high-risk areas — kitchens, warehouses with dust, plant rooms — where single-detector false alarms are common. The design package documents where coincidence is used and why; the matrix records the coincidence logic explicitly.',
              },
              {
                question: "What if the CIE's real-time clock fails or drifts significantly?",
                answer:
                  "Day / night transitions occur at the wrong time. The 2025 maintenance clause requires the clock be checked and adjusted at every service visit, particularly important where day / night settings are in use. A clock that has drifted by an hour effectively shifts every transition by an hour. After a power outage that exhausts the CIE's battery-backed clock, the clock may need full re-setting on power restoration. Modern CIEs may sync to network time (NTP) where the network is available; this is a preference but not all CIEs support it.",
              },
              {
                question: 'How is a cause-and-effect matrix verified during commissioning?',
                answer:
                  'Each row of the matrix is tested. Each cause is simulated (typically by activating the detector in test mode or pressing a call point); each expected effect is observed; the matrix entry is marked verified. Cells that say "no action" are also tested — the absence of action confirms the cell is correctly programmed. The commissioning certificate records the verification. Failure of any cell requires reprogramming and re-test.',
              },
              {
                question:
                  "A change is made to the cause-and-effect matrix during the system's life. What documentation is required?",
                answer:
                  'Per BS 5839-1:2025 clause 47 (Section 7 Extensions and modifications), any modification — including a cause-and-effect change — produces a modification certificate. The certificate documents what was changed, why, who made the change, the date, and references the updated matrix. The updated matrix is filed in the O&M manual; the previous version is archived. Firmware updates of the CIE that may have implications for the matrix are also modifications and require certificates.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Cause and effect programming — Module 3.3" questions={quizQuestions} />

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
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-3/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Interface design
              </div>
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

export default FireAlarmModule3Section3;
