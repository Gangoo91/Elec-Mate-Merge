import { ArrowLeft, ChevronLeft, ChevronRight, Search } from 'lucide-react';
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
    id: 'fam6-s3-noconceal',
    question:
      'BS 5839-1:2025 introduces clause 23. What does it say about fault indications, and what is the practical implication for an engineer dealing with a recurrent fault that cannot be cleared today?',
    options: [
      'Fault indications must not be concealed; the fault stays visible until repaired, with logging, briefing and an interim measure if appropriate.',
      'A fault buzzer may be permanently silenced once the responsible person has been told, provided the visual LED indication is left active on the CIE.',
      'A fault that cannot be repaired the same day may be cleared from the panel and re-entered in the logbook as a planned remedial action.',
      'An unrepairable fault may be masked at the panel for up to 28 days while a replacement part is sourced, then re-instated for the next service.',
    ],
    correctIndex: 0,
    explanation:
      'Clause 23 is one of the most directly enforceable clauses in BS 5839-1:2025. It addresses a specific historical bad practice: silencing or hiding fault indications because they were "annoying staff" or "ugly". The clause makes clear: a fault you cannot fix must remain visible. Logging, briefing the responsible person, and interim measures are how the risk is managed — not by hiding the warning.',
  },
  {
    id: 'fam6-s3-method',
    question: 'A panel shows a fault. What is the correct first diagnostic step?',
    options: [
      'Substitute the loop driver card, as the panel hardware is the most common origin of an unexpected fault indication.',
      'Open and inspect each detector head on the affected zone in turn until the offending device is found.',
      "Read the panel's event log and LCD message — the CIE holds the most information about the device, fault type and history.",
      'Isolate the supply to the affected zone and leave it isolated until the next scheduled service visit.',
    ],
    correctIndex: 2,
    explanation:
      'The diagnostic sequence starts at the panel because the panel has the most information. Read the LCD, read the event log, identify the device or zone, identify the fault type, then go to the device. Going to the device first — without reading the panel — is the most common time-waster in fault finding.',
  },
  {
    id: 'fam6-s3-loop',
    question:
      'An addressable loop reports communication errors on devices addresses 17 to 24 (eight contiguous addresses). The most likely cause.',
    options: [
      'Eight devices reaching end of life at the same time, since detectors installed together tend to fail together.',
      'Intermittent electromagnetic interference affecting only that block of addresses on the loop.',
      'A single point fault on the loop between devices 16 and 17 — a corroded terminal, damaged conductor or poor termination.',
      'A corrupted configuration file in the CIE that has dropped eight addresses from the device list.',
    ],
    correctIndex: 2,
    explanation:
      'Contiguous device losses on an addressable loop almost always indicate a single break in the loop wiring. Loops are wired as a ring (out and back); a break in the out-leg loses everything beyond it, and the panel reports those devices as "missing". Repair at the panel-side end: check device 16 outgoing terminals and cable, then device 17 incoming terminals. Loops should be wired with isolators so a single break loses no devices — the fact that eight are lost suggests no isolators, isolators in wrong locations, or both legs of the ring broken at different points.',
  },
  {
    id: 'fam6-s3-tools',
    question:
      'Which of the following best describes appropriate tools for fire-alarm fault finding?',
    options: [
      'Multifunction tester, addressable loop tester, CIE service software, test smoke / heat, sounder / VAD ammeter, and the as-installed documentation.',
      'A multifunction tester alone, since continuity, insulation and voltage measurements will reveal every category of fire-alarm fault.',
      'A multifunction tester plus the panel service software only; functional test sources and loop testers are unnecessary on modern systems.',
      'Visual inspection alone, on the basis that most fire-alarm faults are mechanical and can be identified by eye at the device.',
    ],
    correctIndex: 0,
    explanation:
      'The tool kit varies with system type. The principle is "device-aware testing" — apply the right test for the right device, per the manufacturer\'s instructions. IR testing at 500 V is fine on dead cables before devices are connected but can damage some addressable detectors and electronics if applied to a live loop. Always read the manufacturer instructions before applying any high-voltage test.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 5839-1:2025 clause 23 (NEW) addresses what specific bad practice in fault management?',
    options: [
      'Concealment or suppression of fault indications where an effective repair cannot be completed.',
      'The maximum permitted interval between routine servicing visits and the competencies the servicing organisation must hold to carry them out.',
      'The frequency at which detector heads should be cleaned and the contamination thresholds that trigger a planned clean-or-replace decision.',
      'The labelling and replacement-dating requirements for standby batteries so their end-of-life can be tracked across the maintenance regime.',
    ],
    correctAnswer: 0,
    explanation:
      'Clause 23 prohibits concealment of fault indications. A historic bad practice — silencing the buzzer or covering the LED to keep staff happy — is now explicitly non-compliant. The fault remains visible, the responsible person is briefed, and interim risk measures are put in place if appropriate.',
  },
  {
    id: 2,
    question: 'The first action when a panel is showing a fault.',
    options: [
      'Isolate the mains supply to the panel and run the system on standby batteries while you investigate.',
      'Walk to the most recently installed device on the suspect zone and substitute it with a known-good spare.',
      "Read the CIE's LCD message and event log, which hold the device, fault type, time of onset and repeat history.",
      'Silence the internal buzzer, reset the panel, and wait to see whether the fault re-appears within the hour.',
    ],
    correctAnswer: 2,
    explanation:
      'Diagnostic discipline: panel first, device second. The panel has the most information about what it has detected — device address, loop, fault type, time of first onset, repeat history. The event log frames the rest of the diagnostic process. Going to the device before reading the panel is the most common cause of wasted time in fault finding.',
  },
  {
    id: 3,
    question: 'Which of the following is an OPEN-CIRCUIT fault on a conventional zone?',
    options: [
      'The two zone conductors touching at a water-damaged back-box, dropping the measured resistance below the panel threshold.',
      'A detector base whose internal terminal block has bridged, presenting a near-zero resistance across the zone.',
      'A loop device responding to polling with the wrong address, corrupting the panel reading for the zone.',
      'A break in the zone conductor that leaves the end-of-line resistor disconnected, so the panel measures resistance higher than the EOL value.',
    ],
    correctAnswer: 3,
    explanation:
      "Open-circuit = circuit resistance higher than the panel expects. Common cause: physical conductor break or loose terminal. The panel's zone-monitoring circuitry compares the measured resistance to the EOL value; significantly higher = open, significantly lower = short.",
  },
  {
    id: 4,
    question: 'Which of the following is a SHORT-CIRCUIT fault on a conventional zone?',
    options: [
      "A reduction of circuit resistance below the panel's threshold from conductors touching, water ingress, a stuck MCP or a shorted device.",
      'A break in the zone conductor that disconnects the end-of-line resistor, so the panel measures a resistance far higher than expected.',
      'Two addressable devices programmed to the same address, producing inconsistent responses to the panel poll.',
      'A standby battery that has dropped below its low-voltage threshold, leaving the panel running on mains only.',
    ],
    correctAnswer: 0,
    explanation:
      'Short-circuit = resistance lower than expected, caused by a conductor-to-conductor contact (damaged cable), water ingress at a back-box, a faulty MCP stuck in the alarm position, or a detector whose terminal block has shorted internally. Some short-circuit values trigger an alarm (because they look like an MCP being operated); others trigger only a fault.',
  },
  {
    id: 5,
    question:
      'On an addressable loop, devices 17-24 (eight contiguous addresses) report missing. Most likely cause and first action.',
    options: [
      'Eight separate device failures that have coincidentally occurred together; replace each of the eight detectors in turn until the loop clears.',
      'A burst of electromagnetic interference along that section of the loop; re-route the cabling away from the nearby power circuit and retest.',
      'A single break in the loop wiring between device 16 and 17; read the loop diagnostics, then check device 16 outgoing and device 17 incoming.',
      'A failure of the loop driver card in the CIE; replace the card and re-commission the entire loop from the panel.',
    ],
    correctAnswer: 2,
    explanation:
      'Contiguous loss on an addressable loop = loop break, located at the panel-side end of the missing range. Read the panel loop diagnostics first (some CIEs report "loop is open at device 16 outgoing"), then walk the loop: check device 16 outgoing terminals and cable, then device 17 incoming. Repair the connection or cable and the panel re-discovers devices 17-24 within a discovery cycle. The fact that eight devices are lost is also a design red flag — isolators should limit the loss to between two adjacent devices.',
  },
  {
    id: 6,
    question: 'A device-address conflict on an addressable loop manifests as.',
    options: [
      'A continuous alarm output on every sounder until the duplicate device is physically removed from the loop.',
      'A complete loss of communication with all devices beyond the duplicated address, mimicking a loop break.',
      'A spurious fire signal from the duplicated address that latches the panel into the alarm condition.',
      'Two devices reporting the same address, so the panel sees inconsistent responses and reports an address-conflict fault.',
    ],
    correctAnswer: 3,
    explanation:
      'Address conflict = two devices think they are the same address. The panel sees inconsistent responses to address polling and reports an address-conflict fault, naming the address and (depending on the CIE) the affected loop. Cause: an installer programmed two devices to the same address, or replaced a device without re-programming. Repair: identify the duplicate via service software and re-address one device. It is benign in fire-safety terms (no immediate impact on detection) but is a configuration error to resolve promptly — not a hardware fault.',
  },
  {
    id: 7,
    question:
      'A site has had three false alarms in 12 months on detector 14 (smoke detector in a corridor). Diagnostic approach.',
    options: [
      'Investigate the pattern first — read the contamination level, examine environmental factors and cause-and-effect, and consider a technology change.',
      'Replace the detector head immediately with an identical optical type, as a three-fault history confirms the original device is defective.',
      'Permanently disable detector 14 at the panel and record it as a known nuisance device in the logbook.',
      'Raise the sensitivity threshold across the whole panel so transient low-level smoke no longer triggers the alarm.',
    ],
    correctAnswer: 0,
    explanation:
      'False alarm investigation: read the contamination level (high contamination is a common cause — plan clean / replace), examine environmental factors (kitchen steam, refurbishment dust, vibration), review cause-and-effect (a real low-level smoke event from another zone?), and consider the detector technology — if the corridor sees cooking smoke or shower steam regularly, a multi-sensor heat / smoke detector is more tolerant of nuisance aerosols. Replacement without investigation often just moves the problem to the new device.',
  },
  {
    id: 8,
    question:
      'Which IR-test approach is appropriate on a live addressable loop with detectors connected?',
    options: [
      'Apply a 500 V dc insulation test across the whole loop, as this is the standard test voltage for fixed wiring under BS 7671.',
      'Apply a 1000 V dc insulation test to be certain of finding any high-resistance leakage path on the loop.',
      "Follow the manufacturer's instructions — many detectors are damaged by 500 V, so use continuity on the installed loop or disconnect devices first.",
      'No insulation test is meaningful on a fire-alarm loop, so rely solely on the panel reporting the circuit as healthy.',
    ],
    correctAnswer: 2,
    explanation:
      'IR testing on installed fire-alarm cabling is risky for connected electronics. The manufacturer instructions are load-bearing. Where 500 V IR is needed, disconnect the devices first; on the installed system, low-voltage continuity is usually the safe diagnostic.',
  },
  {
    id: 9,
    question: 'A panel reports "earth fault" on the loop. Significance and approach.',
    options: [
      'A cosmetic indication that can be cleared by resetting the panel; it has no bearing on the integrity of the loop.',
      'Almost always an internal fault within the CIE itself rather than the field wiring, so the panel should be replaced first.',
      'A normal condition on long loops caused by capacitive coupling, requiring no investigation unless an alarm also occurs.',
      'A loop conductor is leaking to earth — a damaged cable, a water-filled back-box, or a device whose internal isolation has failed; repair urgently.',
    ],
    correctAnswer: 3,
    explanation:
      'Earth fault is a leak between a loop conductor and earth — typically a damaged cable in containment, a back-box filled with water and grounding through the box, or a device whose internal isolation has failed. The system keeps operating (loops are usually floating with respect to earth) but the leak is the first stage of a developing fault: with a second leak elsewhere the loop shorts to itself via earth and a much more serious fault is likely. Locate the leak with insulation testing on the dead loop or a clamp-meter approach on the live loop, then trace and rectify. Single leak = warning; second leak compounds.',
  },
  {
    id: 10,
    question:
      'A recurrent fault has been reported by the user three times in two months on the same detector. The service organisation cannot reproduce it on site. Per BS 5839-1:2025 clause 23, the engineer must.',
    options: [
      'Not conceal the fault indication: keep it visible, continue investigating, and brief the responsible person on the open status.',
      'Suppress the fault indication on the CIE so the panel reads healthy, on the basis that the fault cannot be reproduced on site.',
      'Permanently disable the suspect detector and remove it from the cause-and-effect, since an unreproducible fault is judged to be a false report.',
      'Replace the CIE on the assumption that an intermittent, unreproducible fault must originate inside the panel electronics.',
    ],
    correctAnswer: 0,
    explanation:
      'Clause 23 — no concealment. A fault that cannot be reproduced is still a fault. Continue investigating: review the event log for time-of-day patterns, consider environmental factors (HVAC cycle, sunlight on the detector, occupant activity), install monitoring instrumentation if available, consult the manufacturer. The indication stays visible until rectified and interim measures may be put in place; the service organisation does not modify firmware or output behaviour to suppress it. Hiding the indication would be a clause 23 breach and likely a regulatory breach under RRO 2005.',
  },
];

const FireAlarmModule6Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Fault finding techniques | Fire Alarm Module 6.3 | Elec-Mate',
    description:
      'BS 5839-1:2025 fault finding — clause 23 prohibition on concealing fault indications, the panel-first diagnostic discipline, common faults (open / short / earth / comms / address conflict), test tools and device-aware testing, and the urgency framing for repair.',
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
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 3"
            title="Fault finding techniques"
            description="Fault finding starts with a discipline rule (read the panel first), is governed by a regulatory rule (BS 5839-1:2025 clause 23 — no concealment of fault indications), and runs on a small set of common-fault categories with predictable causes. The competent engineer reads, narrows, isolates, repairs, and tests — and at every stage keeps the fault visible to the responsible person until repaired."
            tone="yellow"
          />

          <TLDR
            points={[
              'NEW BS 5839-1:2025 clause 23 — fault indications must NOT be concealed or suppressed where the service organisation cannot complete an effective repair. The fault remains visible until repaired.',
              'Diagnostic discipline: panel first, device second. The CIE event log and LCD message hold the most information; reading them first narrows the search by orders of magnitude.',
              'Common faults: open-circuit (broken conductor / loose terminal), short-circuit (water ingress / damaged cable / stuck MCP), earth fault (loop conductor leaking to earth), comms fault (loop break or addressable poll failure), device-address conflict (two devices same address).',
              'Tool kit: multifunction tester (continuity / IR / voltage), addressable loop tester, CIE service software, test smoke / heat, sounder / VAD test ammeter, as-installed documentation, cause-and-effect matrix.',
              "IR testing must be device-aware. 500 V dc IR on a live addressable loop can damage detectors. Follow the manufacturer's instructions; disconnect devices for IR on cabling, or use low-voltage continuity only on the installed loop.",
              'Repair urgency framing: whole-system failure = hours; zone failure = 24 hours; single device = next service if non-urgent, sooner if high-risk. Interim measures proportionate.',
              'Address conflicts and configuration faults are not hardware failures but indicate process gaps. Resolve and document.',
              'The asset register and service report are the audit trail for every fault investigation, repair, and ongoing-monitoring entry.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply BS 5839-1:2025 clause 23 — keep fault indications visible until repaired; do not suppress, conceal, or modify the panel's output behaviour to hide a fault",
              'Apply the panel-first diagnostic discipline: read the LCD, read the event log, identify the affected device or zone, identify the fault type, then act',
              'Recognise and diagnose the common fault categories: open-circuit, short-circuit, earth fault, communications fault, device-address conflict',
              'Use a fault-finding decision tree to move efficiently from symptom to root cause',
              "Apply device-aware testing: choose continuity, IR, voltage, or specialist testing per the manufacturer's instructions",
              'Apply the repair urgency framing: whole-system / zone / single-device with proportionate interim measures',
              'Investigate recurrent faults beyond simple device replacement, considering environmental factors and detector technology suitability',
              'Document every fault: investigation steps, root cause, repair action, post-repair test, ongoing-monitoring entry in the asset register',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The clause 23 rule — do not conceal</ContentEyebrow>

          <ConceptBlock
            title="What clause 23 actually says, and what it prohibits"
            plainEnglish="BS 5839-1:2025 introduces clause 23 (Arrangements for repair of faults or damage). The clause addresses a specific historical bad practice: when a fault could not be repaired immediately, organisations would silence the buzzer, tape over the LED, modify firmware to ignore the input, or otherwise hide the fault indication so staff stopped complaining. The clause makes plain that this is not acceptable. Where the service organisation cannot complete an effective repair, fault indications should not be concealed (e.g. by suppressing the fault indication). The fault remains visible. The risk is managed by logging, briefing, and interim measures — not by hiding the warning."
            onSite="When the buzzer is annoying staff, the answer is to fix the fault, not to silence the buzzer. If the fault cannot be fixed today, the buzzer remains until it is. Brief premises management; agree the interim measure; record everything."
          >
            <p>The practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Buzzer suppression by firmware mod.</strong> Some panel firmware allows a
                "permanent silence" option for fault buzzers. Activating that option to keep staff
                happy with an unresolved fault is a clause 23 breach. The buzzer can be silenced for
                short periods (transient acknowledgement) but not concealed permanently.
              </li>
              <li>
                <strong>Physical concealment.</strong> Tape over a fault LED, paper over the LCD, a
                panel that is "always like that" — all clause 23 breaches. The fault must remain
                visible to the next person who looks at the panel.
              </li>
              <li>
                <strong>Configuration suppression.</strong> Reconfiguring the CIE so a particular
                fault input is ignored, or de-programming the detector that keeps reporting, is a
                clause 23 breach if the underlying fault is not actually repaired. The detector must
                remain in service or be formally removed (which is a clause 7 modification — Section
                6.5).
              </li>
              <li>
                <strong>The legitimate response.</strong> Log the fault. Brief the responsible
                person. Investigate. If repair cannot complete today, agree an interim measure
                (proportionate to the affected area). Schedule the repair. The fault stays visible
                until repaired. The conformity statement at the next service visit records the fault
                as open if it remains unresolved.
              </li>
            </ul>
            <p>
              The clause is enforceable. An AHJ or insurer reviewing the documentation can compare
              the panel state, the logbook entries, and the service reports — concealment of a
              long-standing fault is visible from the audit trail and can support enforcement action
              under RRO 2005.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 23 (Arrangements for repair of faults or damage)"
            clause={
              <>
                Where the user has reported a fault on the system to the service organization and
                the service organization cannot complete an effective repair, fault indications
                should not be concealed (e.g. by suppressing the fault indication).
              </>
            }
            meaning="Concise but load-bearing. The fault indication stays visible. The risk is managed by logging, briefing, and interim measures. Concealment by buzzer suppression, tape over LEDs, firmware modification, or configuration de-programming is non-compliant. The clause is one of the most directly enforceable additions in BS 5839-1:2025."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The diagnostic sequence — read the panel first</ContentEyebrow>

          <ConceptBlock
            title="Why panel-first wins every time"
            plainEnglish="The CIE has more information about what it has detected than any other source. Modern addressable systems will name the device, give its loop and address, give the fault type (open, short, earth, no-response), record the time of first onset, list any other contemporaneous events, and offer the fault history of the device over recent weeks. Conventional systems will at least identify the affected zone and the fault type. None of this information is available at the device. Going to the device first — without reading the panel — is the most common time-waster in fault finding."
          >
            <p>The panel-first diagnostic sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Read the LCD.</strong> The current fault message names the most recent
                fault. Note device, loop, address, fault type.
              </li>
              <li>
                <strong>Read the event log.</strong> Scroll through the panel\'s event memory.
                Identify when the fault first appeared. Identify any contemporaneous events (real
                alarm activations, other faults, panel resets, configuration changes). Identify
                whether the fault has happened before — recurrence pattern is diagnostic.
              </li>
              <li>
                <strong>Cross-reference the asset register.</strong> Identify the device by
                location, technology type, install date, last service date, last contamination
                level. Has it been flagged before? Is it near end of life?
              </li>
              <li>
                <strong>Cross-reference the cause-and-effect matrix.</strong> Is the device
                programmed to do something specific? Could the fault arise from a configuration that
                does not match the as-installed reality?
              </li>
              <li>
                <strong>Plan the visit to the device.</strong> Now go to the device with a
                hypothesis. The visit confirms or refutes the hypothesis quickly because you know
                what you are looking for.
              </li>
              <li>
                <strong>Test, repair, retest.</strong> Apply the device-aware test. Repair the
                fault. Retest at the panel and at the device. Confirm clear.
              </li>
              <li>
                <strong>Update the asset register and service report.</strong> Record the
                investigation, the root cause, the repair action, the post-repair test outcome. The
                next engineer reading this entry can pick up where you left off.
              </li>
            </ol>
            <p>
              Engineers who do not follow this sequence end up replacing devices speculatively,
              wasting site time, and often leaving the underlying cause untreated. The panel telling
              you "device 47 reports open-circuit at 14:32, third occurrence this week, previously
              cleared by reset" is the diagnostic shortcut.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          {/* Diagram — fault-finding decision tree */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">Fault-finding decision tree</h4>
            <svg
              viewBox="0 0 880 580"
              className="w-full h-auto"
              role="img"
              aria-label="Decision tree for fault finding. Start at panel display reading. Branches by fault category — open circuit, short circuit, earth fault, comms fault, address conflict — with diagnostic actions for each leading to typical root causes."
            >
              {/* Root */}
              <rect
                x="340"
                y="20"
                width="200"
                height="48"
                rx="10"
                fill="rgba(251,191,36,0.18)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="440"
                y="42"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                START
              </text>
              <text x="440" y="58" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Read panel LCD + event log
              </text>
              <line x1="440" y1="68" x2="440" y2="92" stroke="#FBBF24" strokeWidth="1.6" />

              {/* Decision diamond */}
              <polygon
                points="440,92 600,140 440,188 280,140"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.8"
              />
              <text
                x="440"
                y="135"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                What does the panel say?
              </text>
              <text x="440" y="150" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                device · zone · fault type
              </text>

              {/* Five branches */}
              {[
                {
                  x: 60,
                  label: 'Open\ncircuit',
                  cause: 'broken conductor\nloose terminal\nmissing EOL',
                  c: '#EF4444',
                },
                {
                  x: 220,
                  label: 'Short\ncircuit',
                  cause: 'water ingress\ndamaged cable\nstuck MCP',
                  c: '#F97316',
                },
                {
                  x: 380,
                  label: 'Earth\nfault',
                  cause: 'leak to earth\ncable damage\nwater in box',
                  c: '#FBBF24',
                },
                {
                  x: 540,
                  label: 'Comms\nfault',
                  cause: 'loop break\nisolator open\npoll failure',
                  c: '#22D3EE',
                },
                {
                  x: 700,
                  label: 'Address\nconflict',
                  cause: 'duplicate address\nconfig error\npost-replace',
                  c: '#A855F7',
                },
              ].map((b) => (
                <g key={b.label}>
                  <line x1="440" y1="188" x2={b.x + 70} y2="220" stroke={b.c} strokeWidth="1.4" />
                  <rect
                    x={b.x}
                    y="220"
                    width="140"
                    height="56"
                    rx="8"
                    fill={`${b.c}1A`}
                    stroke={b.c}
                    strokeWidth="1.6"
                  />
                  {b.label.split('\n').map((l, i) => (
                    <text
                      key={i}
                      x={b.x + 70}
                      y={240 + i * 14}
                      textAnchor="middle"
                      fill={b.c}
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {l}
                    </text>
                  ))}

                  <line
                    x1={b.x + 70}
                    y1="276"
                    x2={b.x + 70}
                    y2="300"
                    stroke={b.c}
                    strokeWidth="1.4"
                    strokeDasharray="3,2"
                  />
                  <rect
                    x={b.x}
                    y="300"
                    width="140"
                    height="64"
                    rx="8"
                    fill="rgba(255,255,255,0.04)"
                    stroke={b.c}
                    strokeWidth="1"
                  />
                  <text
                    x={b.x + 70}
                    y="316"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.75)"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    Likely cause
                  </text>
                  {b.cause.split('\n').map((l, i) => (
                    <text
                      key={i}
                      x={b.x + 70}
                      y={332 + i * 11}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.65)"
                      fontSize="9"
                    >
                      {l}
                    </text>
                  ))}
                </g>
              ))}

              {/* Outcomes row */}
              <rect
                x="40"
                y="400"
                width="800"
                height="68"
                rx="10"
                fill="rgba(34,211,238,0.06)"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="4,2"
              />
              <text
                x="440"
                y="422"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Repair · Retest · Document
              </text>
              <text x="60" y="440" fill="rgba(255,255,255,0.7)" fontSize="9">
                1. Apply device-aware test (continuity / IR / voltage / loop tester)
              </text>
              <text x="60" y="452" fill="rgba(255,255,255,0.7)" fontSize="9">
                2. Repair root cause — not just the symptom
              </text>
              <text x="60" y="464" fill="rgba(255,255,255,0.7)" fontSize="9">
                3. Retest at panel + at device · confirm clear
              </text>
              <text x="460" y="440" fill="rgba(255,255,255,0.7)" fontSize="9">
                4. Update asset register: investigation + cause + repair + retest
              </text>
              <text x="460" y="452" fill="rgba(255,255,255,0.7)" fontSize="9">
                5. Update logbook + service report
              </text>
              <text x="460" y="464" fill="rgba(255,255,255,0.7)" fontSize="9">
                6. Brief the responsible person · agree any monitoring
              </text>

              {/* Clause 23 banner */}
              <rect
                x="40"
                y="488"
                width="800"
                height="50"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="510"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Clause 23 — fault indications must NOT be concealed
              </text>
              <text x="440" y="526" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                If repair cannot complete: log, brief, interim measure, fault remains visible until
                repaired
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The five common fault categories</ContentEyebrow>

          <ConceptBlock
            title="Open-circuit fault"
            plainEnglish="The panel\'s zone-monitoring or loop-monitoring circuitry measures the impedance of the cabling. The end-of-line (EOL) device on a conventional zone, or the response of devices on an addressable loop, presents a known impedance. Open-circuit means the measured impedance is significantly higher than expected — the circuit has electrically disconnected somewhere. The CIE reports an open-circuit fault on the affected zone or loop segment."
          >
            <p>Common causes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Broken conductor.</strong> Cable damaged by rodent, by drilling through a
                wall, by mechanical stress at a containment edge.
              </li>
              <li>
                <strong>Loose terminal.</strong> Vibration, thermal cycling, original installation
                quality. Common at devices where the same terminal has been disturbed multiple times
                during service visits.
              </li>
              <li>
                <strong>Missing EOL.</strong> Removed during a previous fault investigation and not
                refitted, or knocked loose at a back-box.
              </li>
              <li>
                <strong>Failed device internal connection.</strong> Less common; usually shows as a
                localised fault on the device rather than the whole zone going open.
              </li>
            </ul>
            <p>
              Diagnostic: continuity test on the dead zone with the EOL disconnected (expect
              continuity through the cabling); reconnect EOL and confirm the panel reads the correct
              impedance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Short-circuit fault"
            plainEnglish="The panel\'s zone- or loop-monitoring circuitry measures impedance lower than expected. The two conductors of the loop have come into contact somewhere, or a device has failed in a way that shorts the conductors. Some short-circuit values trigger an alarm condition (because a short across an MCP\'s contacts looks like an MCP being operated)."
          >
            <p>Common causes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Water ingress.</strong> Back-box filled with water from a leak; the two
                conductors short through the water. Very common in basements, plant rooms, and
                external installations.
              </li>
              <li>
                <strong>Damaged cable.</strong> Crushed by a contractor\'s drill, cut by a sharp
                edge, abraded against a containment.
              </li>
              <li>
                <strong>Stuck MCP.</strong> Mechanical fault — the MCP\'s contacts have stuck in the
                alarm position. Often shows as a permanent alarm rather than a short fault,
                depending on the MCP\'s resistance values.
              </li>
              <li>
                <strong>Failed device terminal block.</strong> Internal short within a detector or
                MCP base.
              </li>
            </ul>
            <p>
              Diagnostic: walk the zone; visual inspection at back-boxes; replace suspect MCP /
              device with a known-good substitute; if water ingress, dry the back-box, repair the
              source of leak, retest after drying. Retest the zone for normal impedance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Earth fault"
            plainEnglish="A loop conductor is leaking to earth somewhere. The panel detects this through its earth-fault monitoring (most CIEs have an isolated power supply with earth-leak detection). The system continues to function — loops are usually floating with respect to earth — but the leak is the first stage of a developing fault. With a second leak, the loop will short to itself via earth and a much more serious fault will occur."
          >
            <p>Common causes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable damage in earthed containment.</strong> The cable insulation is
                pierced and the conductor leaks to the metal containment.
              </li>
              <li>
                <strong>Water in a back-box near earthed metalwork.</strong> The water provides a
                conductive path between the loop conductor and the earthed structure.
              </li>
              <li>
                <strong>Failed device internal isolation.</strong> A device whose internal circuitry
                has degraded such that one terminal leaks to the earthed casing.
              </li>
            </ul>
            <p>
              Diagnostic: insulation testing on the dead loop (manufacturer-permitting), or
              clamp-meter testing on the live loop to identify the leg / location with the leak.
              Walk the loop, identify the earth contact point, repair. Retest IR after repair to
              confirm leak is cleared.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Communications fault on an addressable loop"
            plainEnglish="The panel polls each device on the loop and expects a response. A communications fault means one or more devices are not responding — either because the loop is broken between the panel and them, because the device has failed, or because there is a comms-protocol issue (electrical noise, address conflict). The pattern of which devices are missing tells you the cause."
          >
            <p>Common causes by pattern:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Contiguous loss (devices N to M missing).</strong> A loop break at the
                panel-side end of the missing range. With isolators correctly placed and working, a
                single break should lose only the device immediately past the break — eight
                contiguous devices missing means the isolators did not contain the break.
              </li>
              <li>
                <strong>Single device missing intermittently.</strong> Loose terminal at the device,
                marginal cable connection, electrical noise on the loop near that device, or a
                failing device.
              </li>
              <li>
                <strong>All devices missing.</strong> Loop driver failure at the panel, complete
                loop break with no isolator return path, or panel power failure.
              </li>
              <li>
                <strong>Random pattern of missing devices.</strong> Loop electrical noise (induced
                from nearby cabling), poor cable quality, or panel firmware issue.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Device-address conflict"
            plainEnglish="On addressable systems, every device has a unique address programmed into it. When two devices are programmed to the same address, the panel sees inconsistent responses — sometimes one device replies, sometimes the other — and reports an address conflict. Cause: an installer programmed a duplicate, or replaced a device without re-programming, or moved a device without updating the address. Repair: identify the duplicates with the service software, re-address one device."
          >
            <p>Diagnostic notes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Most modern CIEs report the duplicated address by number — go to that address in the
                service software, identify both devices reporting it, choose which to keep at that
                address and re-address the other to a free address from the asset register.
              </li>
              <li>
                The fault is benign in terms of fire safety (no immediate impact on detection) but
                indicates a configuration error. Update the asset register so the new address is
                recorded.
              </li>
              <li>
                Address conflicts are most common after device replacements where the engineer
                forgot to re-program the new device, or after refurbishments where multiple devices
                are added without an asset-register address-allocation discipline.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Tools and device-aware testing</ContentEyebrow>

          <ConceptBlock
            title="The right test for the right device"
            plainEnglish="Fire-alarm fault finding uses electrical tests — continuity, insulation resistance, voltage — but with an important constraint: the manufacturer\'s instructions must be followed. Many addressable detectors and electronics are damaged by 500 V dc IR test voltage. Some require disconnection before any high-voltage test. Some forbid IR testing on the installed system entirely. Reading the manual before applying the test is non-optional."
          >
            <p>The core tool kit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Multifunction tester</strong> — continuity (low-voltage, safe for installed
                loops), IR (use with caution, manufacturer-permitting only on installed fire-alarm
                cabling), voltage (DC voltage at the panel, at battery terminals, at device input).
              </li>
              <li>
                <strong>Addressable loop tester</strong> — programs and queries the loop
                independently of the CIE. Useful for diagnosing whether a device is faulty (does not
                respond to the tester either) or the CIE is misconfigured (device responds to the
                tester but not the CIE).
              </li>
              <li>
                <strong>CIE-specific service software</strong> — manufacturer-provided tools for
                reading event logs, contamination levels, configuration, and for re-addressing
                devices. Requires authentication credentials per clause 43.4.
              </li>
              <li>
                <strong>Test smoke and heat sources</strong> — for functional testing of detectors
                per the manufacturer procedure. Test smoke is canned aerosol calibrated to trigger
                optical / ionisation detectors; heat sources are calibrated heat guns or cradles for
                heat detectors.
              </li>
              <li>
                <strong>Sounder / VAD test ammeter</strong> — measures the inrush and steady-state
                current on a sounder circuit, useful for diagnosing capacity issues or end-of-life
                devices.
              </li>
              <li>
                <strong>Documentation</strong> — the as-installed drawings, the cause-and-effect
                matrix, the asset register, the manufacturer manuals. Without these, every
                diagnostic step is guesswork.
              </li>
            </ul>
            <p>
              "Device-aware testing" is the principle: choose the right tool, read the right
              instructions, apply the test that the manufacturer says is safe and effective for this
              device on this system. A blanket "always do an IR" approach risks destroying
              electronics. A "I just use a multimeter" approach misses faults that need the
              specialist tools.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Repair urgency framing</ContentEyebrow>

          <ConceptBlock
            title="How quickly to fix what"
            plainEnglish="Not every fault demands the same urgency. The competent engineer (and the contracted servicing organisation) should communicate to the responsible person what the priority is. The framework: whole-system / zone / single-device, with the response time scaled to the affected area."
          >
            <p>The urgency framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Whole-system failure</strong> — panel down, no alarm function, no
                signalling. Response: immediate. Continuous fire watch in occupancy. FRS notified if
                high-risk premises (sleeping accommodation, care). Repair within hours. Contractual
                SLA should provide for this.
              </li>
              <li>
                <strong>Zone failure</strong> — one zone has lost detection or alarm function.
                Response: same-day if practicable; 24-hour at outside. Roving alarm in the affected
                zone. Adjacent zones still detecting. Repair within twenty-four hours.
              </li>
              <li>
                <strong>Single device failure (high-risk area)</strong> — a detector or sounder in a
                kitchen, sleeping accommodation, or other high-risk area has failed. Response: 24-48
                hours. Cover the immediate area (e.g. local supplemental warning in a sleeping
                zone).
              </li>
              <li>
                <strong>Single device failure (general area)</strong> — a detector or MCP in a
                general area. Response: at the next service visit if non-urgent, sooner if the
                pattern suggests a developing issue. Disable the failed device; the rest of the
                system continues.
              </li>
              <li>
                <strong>Cosmetic / non-safety-critical fault</strong> — display backlight failed,
                housing damaged but not affecting function. Response: planned at the next convenient
                visit, no interim measure required, but logged and tracked.
              </li>
            </ul>
            <p>
              The framework is a starting point; the specific risk assessment for the premises may
              shift the urgency up or down. A care-home single-device failure in a sleeping corridor
              is more urgent than the same failure in an office storeroom. The responsible person
              owns the decision on interim measures; the service organisation advises and documents.
            </p>
          </ConceptBlock>

          <Scenario
            title="The unrepairable intermittent fault"
            situation="A school CIE has reported a comms fault on detector 92 (third-floor classroom, addressable optical smoke detector) on twelve occasions over six weeks. The fault clears on reset within 30 seconds each time. The panel event log shows the fault always appears between 14:15 and 15:45 on weekdays. The engineer has visited three times, found no fault on inspection, replaced the detector once, replaced the loop driver card once, and the pattern continues. Premises management is asking the engineer to silence the buzzer because it is disrupting afternoon classes."
            whatToDo="Do not silence the buzzer — clause 23. Investigate the time-of-day pattern. Walk the loop on a weekday at 14:15 with a clamp-meter and noise-detection equipment. The likely cause is electromagnetic interference from a specific source that activates during school afternoon hours — possibly a science-block experiment, a contractor working on a different system, an HVAC component that energises only during certain occupancy patterns, or a fluorescent fitting near the detector with a failing ballast. Find the source. The fault is environmental, not the detector. Also brief premises management formally — the fault remains visible until rectified, the buzzer cannot be silenced, but the fault is being actively investigated. Provide a written progress update at the next service visit. The investigation may also justify temporary local supplementary detection (or a temporary fire watch in the affected zone during the affected hours) until root cause is found."
            whyItMatters="Recurrent intermittent faults are the hardest class of fault to investigate and the most tempting to silence. Clause 23 explicitly forbids the silence-by-suppression shortcut. Time-of-day patterns are the engineer\'s best friend — they point to environmental causes that on-site inspection at 10am would never reveal."
          />

          <CommonMistake
            title="Replacing devices speculatively without reading the panel"
            whatHappens="An engineer arrives at a site with a reported fault, walks straight to the affected zone, replaces the first suspect detector, leaves. The fault returns three days later. Repeat. After four visits and three replaced detectors, the engineer finally reads the panel event log and sees the fault is at a specific time of day on a specific loop segment — pointing at a different cause entirely (induced noise from nearby cabling). The four replaced detectors were never the issue."
            doInstead="Always start at the panel. Read the LCD; read the event log; identify when the fault first appeared; identify the pattern. The CIE has the diagnostic data; using it is what distinguishes a competent engineer from a parts-replacing one. Speculative replacement burns time, parts cost, and credibility."
          />

          <CommonMistake
            title="Applying 500 V IR to a live addressable loop"
            whatHappens="An engineer wants to verify cabling integrity and applies a 500 V dc IR test from an MFT to a live addressable loop with detectors connected. Several detectors are damaged by the test voltage and require replacement. The original fault — a simple loose terminal — is now compounded by detector failures and a much larger repair bill."
            doInstead="Read the manufacturer instructions for the detector type. Many modern addressable detectors require disconnection before IR test. On the installed live loop, use low-voltage continuity tests for cabling integrity, or use the loop tester / panel diagnostics for loop quality. Apply 500 V IR only where the manufacturer permits it — typically on dead cabling before devices are connected."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-1:2025 clause 23 — fault indications must NOT be concealed or suppressed. The fault remains visible until repaired.',
              'Diagnostic discipline: panel first, device second. Read the LCD, read the event log, narrow the search.',
              'Five common faults: open-circuit, short-circuit, earth fault, communications fault, device-address conflict. Each has a predictable cause set.',
              'Contiguous loss on an addressable loop = single break. Repair at the panel-side end of the missing range. Isolator placement is also a design issue if many devices are lost.',
              'Earth fault is a developing fault — single leak is a warning, second leak compounds. Investigate and repair urgently.',
              'Device-aware testing: choose the right test, read the manufacturer instructions, do not apply 500 V IR blindly to a live loop.',
              'Repair urgency framework: whole-system = hours, zone = 24 hours, single device = next service if non-urgent, sooner if high-risk.',
              'Recurrent intermittent faults investigated by time-of-day pattern often reveal environmental causes (EMI, HVAC cycle, occupancy patterns).',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How does clause 23 differ from disablement under clause 22?',
                answer:
                  'Clause 22 covers planned, time-bounded, recorded disablement during servicing or repair — premises management informed, interim measures, logbook entry. Clause 23 covers concealment — silently suppressing a fault indication so the fault appears not to exist. The two are different. Disablement is allowed when controlled and recorded; concealment is not allowed at all. A fault that cannot be repaired today is logged and remains visible (clause 23); a device that is disabled during testing is removed from service for a defined window with informed consent (clause 22).',
              },
              {
                question:
                  'A user has reported a fault but the engineer cannot reproduce it on site. What is the correct disposition?',
                answer:
                  'Investigate further: review the panel event log for time-of-day patterns; install monitoring instrumentation if available; review environmental factors; consult the manufacturer. Brief the responsible person on the open status. The fault remains visible on the panel (clause 23) — even though the engineer cannot reproduce it, the user\'s report and the panel\'s prior indications are the evidence the fault is real. Continue to investigate at subsequent visits. Do not "close" the fault until root cause is identified and repaired.',
              },
              {
                question: 'What does an "addressable loop tester" do that the panel cannot?',
                answer:
                  'It polls the loop independently of the CIE. Useful when the question is "is the device responding to the loop protocol, or is the CIE misconfigured to ignore it?" — the loop tester answers that. It also can program / re-address devices, useful in commissioning and after device replacement. The CIE has all the diagnostic data the system has seen; the loop tester is a parallel tool for cases where the CIE-vs-device boundary needs investigating.',
              },
              {
                question:
                  'Why does "contiguous loss of devices" indicate a single fault, not many?',
                answer:
                  'Addressable loops are wired as a ring out from the panel and back. A break at any point on the out-leg loses everything beyond the break (until the loop returns via the back-leg). The break causes a contiguous range of devices to disappear. Two simultaneous device failures in two adjacent locations would be improbable; the simpler explanation is one break in the wiring. Isolators (devices that detect short / open and cut the affected segment) limit the loss to between two adjacent isolators — well-designed loops with isolators every five to ten devices should never lose eight devices to a single break.',
              },
              {
                question: 'How do I find an earth fault on a healthy-looking loop?',
                answer:
                  'Two approaches. Insulation testing on the dead loop (with manufacturer permission to disconnect detectors first) — identifies which leg of the loop has the leak. Clamp-meter testing on the live loop — measure leakage current at points along the loop to localise. The leak is usually at a specific point: a back-box with water, a cable rubbed against earthed containment, a detector with internal failure. Walk the leg systematically; the leak is at one location, not distributed.',
              },
              {
                question:
                  'A device reports faulty repeatedly but a replacement device shows the same behaviour. What now?',
                answer:
                  'The fault is not in the device — it is in the cabling, the address programming, the cause-and-effect, or the environment. Read the panel event log for context. Use the loop tester to query the address directly. Walk the cabling. Check the cause-and-effect matrix to ensure the device is programmed correctly. Investigate environmental factors (heat, vibration, EMI, water). Replacement-twice-with-same-symptom is a hint to stop replacing and start investigating.',
              },
              {
                question: 'Is IR testing on installed fire-alarm cabling allowed?',
                answer:
                  'Per the manufacturer instructions. Some detector types tolerate 500 V dc IR on the installed loop; many do not. Some addressable systems explicitly forbid IR testing with detectors connected. The safe default is: continuity tests on the installed loop for fault diagnosis; IR testing only on dead cabling with detectors disconnected. Read the manual; document which test you applied and why.',
              },
              {
                question:
                  'How is the fault repair recorded so the next engineer benefits from the work?',
                answer:
                  'Asset register entry against the affected device: investigation steps, root cause identified, repair action, post-repair test outcome, date, engineer name, time spent. Service report includes the fault chronology and resolution. Logbook entry signed off. Where the fault was difficult or recurrent, a knowledge-base entry is valuable — the next engineer reading the asset register sees "previously cleared by replacing terminal block, root cause was vibration from adjacent fan unit" and saves themselves the same investigation.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Fault finding techniques — Module 6.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-6/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.4 Record keeping and logbooks
              </div>
            </button>
          </div>

          <div className="hidden">
            <Search />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule6Section3;
