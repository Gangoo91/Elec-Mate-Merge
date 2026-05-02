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
    id: 'fam4-s5-100s',
    question:
      'BS 5839-1:2025 specifies a maximum reporting time for an earth fault on a fire alarm circuit. What is the value, and what does it mean?',
    options: [
      'Within 24 hours.',
      'Within 100 SECONDS. The CIE must report an earth fault as a fault indication within 100 s of the fault occurring. The 100 s window is calibrated to ensure that intermittent or brief earth-fault events are not missed (too-fast reporting could chase noise transients) but real faults are reported within a maintenance-actionable window. The 100 s figure derives from BS EN 54-2 (CIE requirements) and is referenced through to BS 5839-1.',
      'Immediately on every transient.',
      '5 minutes.',
    ],
    correctIndex: 1,
    explanation:
      'The 100 s reporting window is one of the load-bearing CIE characteristics. Faster reporting risks chasing noise; slower reporting could miss the fault entirely. 100 s is the calibrated figure from BS EN 54-2, applied through to BS 5839-1 as the system-level earth-fault reporting requirement.',
  },
  {
    id: 'fam4-s5-classab',
    question:
      'On a Class A loop circuit and a Class B radial circuit, the consequence of a single earth fault is...?',
    options: [
      'The same.',
      'Different. Class A: the earth fault is reported as a fault on the CIE; the loop continues to operate (bidirectional CIE communication routes around the fault); detection / sounder protection is preserved across the whole loop. Class B: the earth fault is reported, BUT all devices BEYOND the fault are isolated from the CIE — they no longer report, they no longer respond, protection is LOST beyond the fault location until the fault is repaired. The fault tolerance difference is the engineering reason most BS 5839-1 designs use Class A for primary loops.',
      'Class B is more resilient.',
      'Class A loses more devices.',
    ],
    correctIndex: 1,
    explanation:
      'The Class A vs B distinction matters most clearly under fault conditions. Both classes report the fault to the CIE; only Class A preserves protection. Knowing the class of each circuit during fault-finding directs the response — Class A faults are urgent maintenance; Class B faults are urgent emergency repair because protection is currently absent.',
  },
  {
    id: 'fam4-s5-megger',
    question:
      'A maintainer wants to test a detection circuit for insulation resistance. The circuit has addressable detectors fitted. What is the correct test method?',
    options: [
      'Apply 500 V DC across the line.',
      "DO NOT apply 500 V DC with the devices in circuit. Most fire alarm devices include electronic components (loop driver electronics, EOL resistors, addressable communication chips) that will be damaged by the 500 V test voltage. Either DISCONNECT the devices (terminate the loop at the CIE end and at the far end, isolate any branches, then test the cable alone), or use an alternative method appropriate to live electronic systems — typically the CIE's own internal diagnostics (loop earth-fault monitoring, loop integrity test) or a low-voltage dedicated insulation tester for fire-alarm work. Document the test method used.",
      'Apply 1000 V AC.',
      'No test is needed.',
    ],
    correctIndex: 1,
    explanation:
      "The 500 V IR test is incompatible with most modern addressable fire alarm devices. The correct approach is to use the CIE's built-in diagnostics, or to disconnect devices and test the cable alone, or to use a method specifically designed for live electronic systems. Damaging the loop electronics with an inappropriate IR test creates a much more expensive fault than the original earth-fault diagnostic.",
  },
  {
    id: 'fam4-s5-conceal',
    question:
      'BS 5839-1:2025 clause 23 has clarified the rule on suppression / concealment of fault indications. What does it require?',
    options: [
      'Faults can be silenced indefinitely.',
      'Fault indications must NOT be CONCEALED OR SUPPRESSED. The 2025 clarification (per FIA Guide section 23) is specifically about practices that some sites have adopted to "make the panel quieter" — covering fault LEDs with tape, programming silent fault states, ignoring fault buzzers. All such suppression of fault indication is non-compliant. The user is entitled to know the system has a fault; the maintainer is entitled to find the fault on arrival; suppression breaks both. Where a fault cannot be repaired immediately, the indication remains visible until repair is complete.',
      'Faults can be hidden if a service is booked.',
      'Faults are auto-cleared after 24 hours.',
    ],
    correctIndex: 1,
    explanation:
      'The 2025 clarification addresses a real-world practice that has crept into some sites — physically or programmatically hiding fault indications because they are inconvenient. The clarification is unambiguous: do not conceal fault indications. The user must know the system has a problem; the system must show the problem until it is fixed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 5839-1:2025 specifies that an earth fault on a fire alarm circuit must be reported as a fault on the CIE within what time?',
    options: [
      'Within 1 minute.',
      'Within 100 seconds. The CIE must indicate an earth fault as a fault condition within 100 s of the fault occurring. The figure is calibrated to ensure real faults are reported within a maintenance-actionable window without chasing noise transients. Derives from BS EN 54-2 (CIE requirements) and referenced through BS 5839-1.',
      'Within 1 hour.',
      'Within 24 hours.',
    ],
    correctAnswer: 1,
    explanation:
      'The 100 s figure is one of the standard CIE performance requirements that BS 5839-1 inherits from BS EN 54-2. Reporting faster would risk chasing transients; reporting slower would risk missing real faults.',
  },
  {
    id: 2,
    question:
      'On a Class A loop, a single earth fault on the loop wiring has what effect on protection?',
    options: [
      'Protection is lost across the whole loop.',
      'Protection is PRESERVED across the whole loop. The bidirectional CIE communication on a Class A loop means a single open or short fault simply reduces the loop to two unidirectional spurs both still operating; isolators on the loop clamp the affected segment in the case of a short. The fault is reported to the CIE as a fault indication, but detection and sounder protection continue to operate for all devices on the loop.',
      'Half the loop is lost.',
      'Only sounders are lost.',
    ],
    correctAnswer: 1,
    explanation:
      'Class A fault tolerance is the architectural reason most BS 5839-1 systems use Class A for primary loops. The loop continues to function under single-fault conditions; protection is preserved; the maintainer responds to the fault as urgent maintenance rather than as urgent emergency repair.',
  },
  {
    id: 3,
    question:
      'On a Class B radial circuit, a single earth fault on the wiring has what effect on protection?',
    options: [
      'No effect.',
      "Protection is LOST for all devices BEYOND the fault location. Class B radial topology has unidirectional communication from the CIE outward; a single open or short fault isolates everything beyond that point. Devices beyond the fault no longer report, no longer respond to commands, and no longer contribute to the system's detection / alarm function. Until the fault is repaired, the affected portion of the building has no fire alarm coverage.",
      'Half the loop is preserved.',
      'Sounders continue but detectors stop.',
    ],
    correctAnswer: 1,
    explanation:
      'The Class B fault response is the engineering reason the topology is acceptable only where the design analysis supports it — typically sub-circuits with limited consequence of single-fault loss. Primary loops in BS 5839-1 systems are typically Class A specifically to avoid this fault response.',
  },
  {
    id: 4,
    question:
      'A maintainer wants to perform an insulation resistance test on a fire alarm detection circuit. The circuit has addressable detectors connected. What is the correct procedure?',
    options: [
      'Apply 500 V DC with devices in circuit.',
      "Either: DISCONNECT the addressable devices (isolate the loop at the CIE and at branch points, then test the cable alone), OR use the CIE's built-in loop diagnostics (loop earth-fault monitoring, loop integrity test functions), OR use a low-voltage insulation test method designed for live electronic systems. The 500 V DC test will DAMAGE the addressable electronics if applied with devices in circuit. The damage produces a more expensive fault than the original diagnostic problem. Document the test method used in the maintenance record.",
      'Apply 1000 V AC.',
      'Test only at the CIE.',
    ],
    correctAnswer: 1,
    explanation:
      'The standard 500 V IR test was designed for general electrical installations without sensitive electronics. Modern addressable fire alarm systems do not tolerate it. The correct approach is to disconnect, use built-in diagnostics, or use a method appropriate to live electronics.',
  },
  {
    id: 5,
    question:
      'BS 5839-1:2025 clause 23 (Arrangements for repair of faults or damage) clarifies a rule about fault indications. What is it?',
    options: [
      'Faults can be hidden during business hours.',
      'Fault indications must NOT be CONCEALED or SUPPRESSED. The 2025 clarification (per FIA Guide) addresses real-world practices like covering fault LEDs with tape, programming silent fault states, or ignoring buzzers. All such suppression is non-compliant. Where a fault cannot be repaired immediately, the fault indication remains active and visible until repair is complete. The user is entitled to know the system has a fault; the maintainer is entitled to find the fault on arrival.',
      'Faults clear automatically after 7 days.',
      'Suppression is allowed if logged.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 clarification reinforces the principle: fault indications stay visible until the fault is fixed. The user knows; the maintainer knows; the audit trail is complete. Suppression hides information from the people who need it most.',
  },
  {
    id: 6,
    question:
      "On an addressable fire alarm system, the CIE's loop earth-fault monitoring works by...?",
    options: [
      'Measuring the cable resistance.',
      "Continuously measuring the impedance between the loop conductors and earth (the system's functional-earth reference). When the impedance falls below a threshold (indicating a partial or complete earth fault), the CIE reports an earth-fault indication. The monitoring is sensitive enough to detect partial faults (insulation degradation that has not yet failed completely) and reports them as actionable maintenance items before they develop into circuit-affecting faults.",
      'Counting the devices.',
      'Measuring loop voltage drop.',
    ],
    correctAnswer: 1,
    explanation:
      'Loop earth-fault monitoring is one of the diagnostic capabilities of modern addressable CIEs. The continuous impedance measurement provides early warning of insulation degradation, before the degradation produces a circuit-affecting fault. The maintenance team responds to early-warning indications proactively rather than reactively.',
  },
  {
    id: 7,
    question:
      'An addressable system reports an intermittent earth fault — the fault appears and disappears over hours and days. The cable test (with devices isolated) shows the cable insulation is intact. What is the most likely cause?',
    options: [
      'A faulty cable.',
      'The earth fault is most likely on a DEVICE rather than on the cable, OR is a problem with the FUNCTIONAL EARTH connection rather than the cable insulation. Common causes: a detector base with corrosion or moisture ingress producing intermittent leakage; a sounder or interface unit with internal insulation degradation; the FE conductor at the CIE terminated incorrectly (on PE bar, or loose at termination). Diagnostic approach: verify FE termination first; then disconnect devices in groups and re-test to localise; finally identify the specific device when the fault disappears with one device removed.',
      'Loose cable clip.',
      'Wrong cable colour.',
    ],
    correctAnswer: 1,
    explanation:
      'Intermittent earth faults are typically environment-driven (humidity, temperature) and are usually localised to a specific device or termination rather than the cable in general. Cable testing in isolation gives a clean result; the fault appears only with the device population in circuit.',
  },
  {
    id: 8,
    question:
      'Why does BS 5839-1:2025 require fault indications to be visible / audible from the CIE rather than only logged in the system memory?',
    options: [
      'Convention.',
      'Because the user (premises management, occupants) needs to know the system is in a fault condition without having to interrogate the system or rely on a specialist visit. Visible / audible indication makes the fault state OBVIOUS; the user knows protection is degraded and can take appropriate compensating measures (e.g. fire watch) until repair. A fault that is only logged in memory could persist undetected for weeks; visible / audible indication forces awareness and repair scheduling.',
      'Cost.',
      'Aesthetics.',
    ],
    correctAnswer: 1,
    explanation:
      'Indication serves the user, not the engineer. The user is the person on site day-to-day; they need to know the system status without specialist tools. Visible / audible indication makes fault states obvious; logging alone makes them invisible to the user.',
  },
  {
    id: 9,
    question:
      'A site has a recurring earth fault that the maintenance team has been "managing" by acknowledging the fault on the CIE every morning rather than repairing it. Is this acceptable?',
    options: [
      'Yes, because the fault is acknowledged.',
      'NO. Acknowledging a fault clears the audible indication but does NOT clear the underlying fault — the system is still in a fault state, the visual fault indication remains active, and the protective function may be compromised (depending on the fault and the circuit class). Repeatedly acknowledging without fixing is a form of fault suppression; BS 5839-1:2025 clause 23 requires faults to be REPAIRED, not managed indefinitely by acknowledgment. Where a repair cannot be completed promptly, the fire risk assessment / management plan should identify compensating measures (e.g. fire watch in the affected area) until the fault is repaired.',
      'Acceptable for 1 week only.',
      'Acceptable if logged.',
    ],
    correctAnswer: 1,
    explanation:
      'Acknowledgment is not repair. BS 5839-1:2025 expects faults to be repaired with reasonable promptness, with compensating measures in place where repair is delayed. "Managing" a fault by daily acknowledgment is non-compliant and erodes the system\'s reliability.',
  },
  {
    id: 10,
    question:
      'Why is the FUNCTIONAL EARTH (FE) termination at the CIE relevant to earth-fault monitoring?',
    options: [
      'It is not relevant.',
      'Because the loop earth-fault monitoring uses the FE as the REFERENCE against which loop-to-earth impedance is measured. If the FE is incorrectly terminated (e.g. landed on the PE bar, or loose at termination), the reference is corrupted and the earth-fault monitoring produces false readings — typically intermittent earth-fault reports that come and go with mains transients on the PE. A clean diagnostic for a "fault that travels" includes verifying the FE termination first; if FE is wrong, the apparent loop fault is really an FE termination problem.',
      'Only the PE matters.',
      'FE is a red herring.',
    ],
    correctAnswer: 1,
    explanation:
      'The FE / loop monitoring relationship is one of the diagnostic insights that experienced fire-alarm engineers internalise. Apparent loop faults that do not correlate with cable / device problems often turn out to be FE termination issues. Verify FE first.',
  },
];

const FireAlarmModule4Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Earth fault monitoring | Fire Alarm Module 4.5 | Elec-Mate',
    description:
      'BS 5839-1:2025 earth fault monitoring — 100 s reporting requirement, Class A vs Class B fault behaviour, loop ground monitoring on addressable systems, IR test with electronic devices, BS 5839-1:2025 clause 23 prohibition on concealing fault indications.',
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
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5"
            title="Earth fault monitoring"
            description="BS 5839-1:2025 — earth fault reporting within 100 seconds, Class A vs Class B fault behaviour, loop ground monitoring on addressable systems, the IR test problem with electronic devices in circuit, and BS 5839-1:2025 clause 23 — fault indications must NOT be concealed or suppressed."
            tone="yellow"
          />

          <TLDR
            points={[
              'Earth faults must be reported as a fault indication on the CIE within 100 SECONDS — derived from BS EN 54-2, applied through BS 5839-1:2025.',
              'Class A loop: single earth fault REPORTED but protection PRESERVED across the whole loop (bidirectional communication routes around the fault).',
              'Class B radial: single earth fault REPORTED but devices BEYOND the fault are LOST — no longer report, no longer respond. Protection lost until repair.',
              'Loop earth-fault monitoring on addressable systems: continuous impedance measurement against functional-earth (FE) reference. Detects partial faults before they become circuit-affecting.',
              'IR testing with addressable devices in circuit: 500 V DC will DAMAGE electronics. Disconnect devices, OR use CIE built-in diagnostics, OR use a low-voltage method for live electronics.',
              'BS 5839-1:2025 clause 23: fault indications must NOT be concealed or suppressed. Covering LEDs, programming silent fault states, indefinite acknowledgment without repair — all non-compliant.',
              'Functional-earth termination is part of the earth-fault monitoring system. Verify FE first when diagnosing apparent loop faults.',
              'Fault repair urgency: faults are repaired with reasonable promptness; where delayed, compensating measures (e.g. fire watch) are documented in the management plan.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify the BS 5839-1:2025 earth-fault reporting requirement of 100 s and explain its derivation from BS EN 54-2',
              'Distinguish Class A loop and Class B radial fault response — Class A preserves protection; Class B loses devices beyond the fault',
              'Describe addressable loop earth-fault monitoring as a continuous impedance measurement against the functional-earth reference',
              'Apply correct IR test methodology where electronic devices are in circuit — disconnect, use CIE diagnostics, or use live-electronics methods',
              'Apply BS 5839-1:2025 clause 23 prohibition on concealing or suppressing fault indications, and recognise the failure modes of fault suppression',
              'Verify functional-earth termination as the first diagnostic step for apparent loop earth-fault problems',
              'Distinguish acknowledgment from repair, and apply repair urgency rules including compensating measures during delayed repair',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The 100-second reporting requirement</ContentEyebrow>

          <ConceptBlock
            title="Why 100 seconds, not faster or slower"
            plainEnglish="A fire alarm system needs to know it has a fault. An earth fault on the loop wiring or on a device circuit is one of the most common faults the system experiences in service — environmental moisture, mechanical damage to insulation, ageing of polymeric insulation, contamination from cleaning products, all produce earth faults eventually. The CIE has to detect the fault and report it within a defined time. Too fast and the CIE chases noise transients and produces nuisance fault reports; too slow and real faults are missed for hours or days, producing degraded protection without anyone knowing. 100 seconds is the figure calibrated by BS EN 54-2 (the CIE standard) to balance these two failure modes; BS 5839-1 inherits the figure as the system-level reporting requirement."
            onSite="When you commission a system or perform a fault test on an existing one, the 100 s figure is the controlling timer. Inject a fault (typically by deliberately introducing a low-impedance path between a loop conductor and a known-safe earth point) and observe the time to fault report on the CIE display. Within 100 s = compliant; beyond 100 s = non-compliant CIE / system."
          >
            <p>What gets reported and how:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Visual indication.</strong> The CIE&apos;s common fault indicator (typically
                a yellow LED) is illuminated; the specific zone / loop / device showing the fault is
                identified on the CIE display. Both general indication AND specific location are
                required.
              </li>
              <li>
                <strong>Audible indication.</strong> The CIE&apos;s integral fault buzzer sounds.
                The buzzer is acknowledgeable (silenceable) but the visual indication remains until
                the fault is cleared.
              </li>
              <li>
                <strong>Logged event.</strong> The fault is recorded in the CIE&apos;s event log
                with timestamp and identification. The log persists for the system\'s defined
                retention period and is available for inspection during maintenance / audit.
              </li>
              <li>
                <strong>Transmitted to ARC where applicable.</strong> Where the system has alarm
                transmission to an Alarm Receiving Centre, fault conditions are typically
                transmitted alongside fire alarm signals — separately identified — so the ARC knows
                the system has a fault and can pass that to the responsible person.
              </li>
              <li>
                <strong>Continued monitoring.</strong> The CIE continues to monitor the fault while
                it persists. Intermittent faults (appear and disappear) are logged with each event;
                the maintainer sees the pattern in the log.
              </li>
            </ul>
            <p>
              The 100 s window is for the FIRST report of the fault. Once reported, the fault
              indication remains until the fault is cleared (the conditions that caused the report
              are no longer present) or until the system is reset by a competent person. The
              indication is not auto-cleared on a timer; the user must act on it.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 54-2 (Fire detection and fire alarm systems — Control and indicating equipment) and BS 5839-1:2025 (Earth fault reporting)"
            clause={
              <>
                Where an earth fault occurs on any monitored circuit of the fire detection and fire
                alarm system, the control and indicating equipment shall indicate the fault
                condition within 100 seconds of the fault occurring. The indication shall include
                visual indication of the fault state and audible indication that may be silenced by
                acknowledgment but shall not be silenced by means that would also clear the visual
                indication. The fault indication shall persist until the underlying fault is
                repaired or the system is reset by a competent person.
              </>
            }
            meaning="The 100 s reporting time is a CIE characteristic; BS 5839-1 inherits it as a system requirement. The persistence rule (visual indication remains until repaired or reset by a competent person) prevents the indication being lost by routine acknowledgment."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class A and Class B fault behaviour</ContentEyebrow>

          <ConceptBlock
            title="The architectural difference under fault"
            plainEnglish="The choice of Class A vs Class B circuit topology determines what happens when an earth fault occurs. Class A is a closed loop with bidirectional CIE communication; a single fault is routed around. Class B is a radial / spur with unidirectional communication; a single fault isolates everything beyond it. The difference is not subtle — it determines whether the fire alarm continues to protect the building during the time between fault occurrence and fault repair."
          >
            <p>Class A — fault response in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Topology.</strong> Cable forms a closed loop. CIE has terminals at both ends
                of the loop. Devices are addressable along the loop.
              </li>
              <li>
                <strong>Single open fault.</strong> The cable break creates two separate spurs. CIE
                polls one spur from the &quot;A&quot; end, the other spur from the &quot;B&quot;
                end. Every device is reachable from at least one direction. CIE indicates a fault
                (loop integrity lost) but every device remains supervised and operational.
              </li>
              <li>
                <strong>Single short fault.</strong> The short would draw excessive current if left
                in place. Loop isolators (typically every 32 devices, or per design) automatically
                disconnect the affected segment. Devices outside the isolated segment continue to
                operate. CIE indicates a fault and identifies the isolated segment.
              </li>
              <li>
                <strong>Single earth fault.</strong> The earth-fault monitoring detects the
                impedance change and reports the fault. The loop continues to function (the fault is
                to earth, not to the other loop conductor); detection / sounder operation is not
                affected directly. The fault is reported per the 100 s rule.
              </li>
              <li>
                <strong>Repair urgency.</strong> Class A&apos;s fault tolerance gives the maintainer
                time. The fault is reported as urgent maintenance (typically a 24-hour response
                window for non-critical premises, sooner for life-safety-critical premises), but the
                immediate protection of the building is not lost.
              </li>
            </ul>
            <p>Class B — fault response in detail:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Topology.</strong> Cable runs from CIE outward in a tree / radial. Branches
                terminate at the last device. No return path to CIE.
              </li>
              <li>
                <strong>Single open fault.</strong> All devices BEYOND the fault are isolated. They
                no longer report, no longer respond, no longer contribute to the system\'s
                detection. The CIE indicates the fault and identifies the affected branch / segment.
                Protection is LOST in the affected area until repair.
              </li>
              <li>
                <strong>Single short fault.</strong> Similar consequence — devices beyond the short
                are lost. CIE indicates fault.
              </li>
              <li>
                <strong>Single earth fault.</strong> Reported per the 100 s rule. Whether the
                circuit continues to function depends on the specific fault and the EOL arrangement;
                in some cases protection is degraded even on Class B earth faults.
              </li>
              <li>
                <strong>Repair urgency.</strong> Class B&apos;s loss of protection beyond the fault
                makes repair urgent. Compensating measures (fire watch in the affected area) are
                often required while the repair is pending. The fault is treated as urgent emergency
                repair, not routine maintenance.
              </li>
            </ul>
            <p>
              The class designation of each circuit is recorded in the design records. At
              fault-finding time the maintainer should know the class to predict the fault response
              correctly. Where the design records are unclear, identifying the topology from
              inspection (single cable run from CIE returning to CIE = Class A; cable runs outward
              and terminates at last device = Class B) is the diagnostic.
            </p>
          </ConceptBlock>

          {/* Diagram — Earth fault circuit topology Class A vs B */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Earth fault response — Class A loop vs Class B radial
            </h4>
            <svg
              viewBox="0 0 880 460"
              className="w-full h-auto"
              role="img"
              aria-label="Two diagrams side by side. Class A on the left shows a closed loop from the CIE around four detectors and back to the CIE; an earth fault between the second and third detectors is marked, with arrows showing CIE communication continuing from both directions, all devices remaining operational. Class B on the right shows a radial run from CIE to four detectors in series; an earth fault between the second and third detectors is marked, with the arrow stopping at the fault and devices three and four shown as no longer reporting."
            >
              {/* Class A box */}
              <rect
                x="20"
                y="20"
                width="410"
                height="420"
                rx="12"
                fill="rgba(34,211,238,0.04)"
                stroke="rgba(34,211,238,0.4)"
                strokeWidth="1.6"
              />
              <text
                x="225"
                y="45"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="14"
                fontWeight="bold"
              >
                CLASS A — closed loop
              </text>
              <text x="225" y="62" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
                single fault REPORTED · protection PRESERVED
              </text>

              {/* CIE Class A */}
              <rect
                x="180"
                y="90"
                width="90"
                height="55"
                rx="6"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="225"
                y="113"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="225" y="128" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                A end + B end
              </text>

              {/* Class A loop */}
              <path
                d="M 195 145 L 195 200 L 100 200 L 100 280 L 195 280 L 195 380 L 195 380"
                stroke="#EF4444"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M 255 145 L 255 200 L 350 200 L 350 280 L 255 280 L 255 380 L 255 380"
                stroke="#EF4444"
                strokeWidth="2.5"
                fill="none"
              />
              <line x1="195" y1="380" x2="255" y2="380" stroke="#EF4444" strokeWidth="2.5" />

              {/* Detectors Class A */}
              <circle
                cx="100"
                cy="200"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="100"
                y="204"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                D1
              </text>
              <circle
                cx="100"
                cy="280"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="100"
                y="284"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                D2
              </text>
              <circle
                cx="350"
                cy="200"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="350"
                y="204"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                D3
              </text>
              <circle
                cx="350"
                cy="280"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="350"
                y="284"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                D4
              </text>

              {/* Earth fault Class A */}
              <g>
                <circle
                  cx="225"
                  cy="380"
                  r="10"
                  fill="rgba(217,119,6,0.30)"
                  stroke="#D97706"
                  strokeWidth="2"
                />
                <line x1="219" y1="374" x2="231" y2="386" stroke="#D97706" strokeWidth="2" />
                <line x1="231" y1="374" x2="219" y2="386" stroke="#D97706" strokeWidth="2" />
                <text
                  x="225"
                  y="408"
                  textAnchor="middle"
                  fill="#D97706"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  earth fault
                </text>
              </g>

              {/* Result box Class A */}
              <rect
                x="40"
                y="424"
                width="370"
                height="14"
                rx="4"
                fill="rgba(34,211,238,0.10)"
                stroke="rgba(34,211,238,0.5)"
                strokeWidth="1"
              />

              {/* Class B box */}
              <rect
                x="450"
                y="20"
                width="410"
                height="420"
                rx="12"
                fill="rgba(239,68,68,0.04)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.6"
              />
              <text
                x="655"
                y="45"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="14"
                fontWeight="bold"
              >
                CLASS B — radial / spur
              </text>
              <text x="655" y="62" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">
                single fault REPORTED · protection LOST beyond fault
              </text>

              {/* CIE Class B */}
              <rect
                x="610"
                y="90"
                width="90"
                height="55"
                rx="6"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="655"
                y="113"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="655" y="128" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                single end
              </text>

              {/* Class B radial */}
              <line x1="655" y1="145" x2="655" y2="200" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="655" y1="214" x2="655" y2="280" stroke="#EF4444" strokeWidth="2.5" />
              <line
                x1="655"
                y1="294"
                x2="655"
                y2="340"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                opacity="0.4"
              />
              <line
                x1="655"
                y1="354"
                x2="655"
                y2="400"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                opacity="0.4"
              />

              {/* Detectors Class B */}
              <circle
                cx="655"
                cy="207"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="655"
                y="211"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                D1
              </text>
              <circle
                cx="655"
                cy="287"
                r="14"
                fill="rgba(34,211,238,0.20)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text
                x="655"
                y="291"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="9"
                fontWeight="bold"
              >
                D2
              </text>
              <circle
                cx="655"
                cy="347"
                r="14"
                fill="rgba(148,163,184,0.20)"
                stroke="#94A3B8"
                strokeWidth="1.4"
                strokeDasharray="3,2"
              />
              <text
                x="655"
                y="351"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="9"
                fontWeight="bold"
              >
                D3
              </text>
              <circle
                cx="655"
                cy="407"
                r="14"
                fill="rgba(148,163,184,0.20)"
                stroke="#94A3B8"
                strokeWidth="1.4"
                strokeDasharray="3,2"
              />
              <text
                x="655"
                y="411"
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="9"
                fontWeight="bold"
              >
                D4
              </text>

              {/* Earth fault Class B */}
              <g>
                <circle
                  cx="655"
                  cy="320"
                  r="10"
                  fill="rgba(217,119,6,0.30)"
                  stroke="#D97706"
                  strokeWidth="2"
                />
                <line x1="649" y1="314" x2="661" y2="326" stroke="#D97706" strokeWidth="2" />
                <line x1="661" y1="314" x2="649" y2="326" stroke="#D97706" strokeWidth="2" />
                <text x="700" y="324" fill="#D97706" fontSize="9.5" fontWeight="bold">
                  earth fault
                </text>
              </g>

              {/* Lost-devices label */}
              <text x="710" y="377" fill="#94A3B8" fontSize="9" fontStyle="italic">
                D3, D4 lost
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

          <ContentEyebrow>Loop ground monitoring on addressable systems</ContentEyebrow>

          <ConceptBlock
            title="Continuous impedance measurement against the FE reference"
            plainEnglish="An addressable CIE continuously measures the impedance between the loop conductors and the system\'s functional-earth reference. In a healthy installation, the impedance is very high — the cable insulation is intact and the only earth path is through the high-impedance leakage of the cable\'s insulation material. As insulation degrades (moisture absorption, mechanical damage, contamination), the impedance falls. When it falls below a threshold, the CIE reports an earth-fault indication. The threshold is set high enough to detect partial faults early — before they become circuit-affecting — but not so high that ambient noise produces false reports."
          >
            <p>How loop earth-fault monitoring works in service:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Quiescent state.</strong> The CIE applies a low-level test signal between
                each loop conductor and FE. The current that flows is proportional to the
                conductor-to-earth admittance. In a healthy installation, the current is at the
                noise floor of the measurement; the CIE registers no fault.
              </li>
              <li>
                <strong>Partial fault developing.</strong> Insulation degrades over time — typically
                environmental factors. The conductor-to-earth admittance rises; the current rises;
                the CIE registers an increase that may be below the fault threshold but is logged as
                a trend. Some CIEs report this as a &quot;maintenance alert&quot; without going to
                full fault state.
              </li>
              <li>
                <strong>Fault threshold reached.</strong> Conductor-to-earth admittance crosses the
                fault threshold. The CIE indicates an earth fault as a fault condition, visual +
                audible + logged + transmitted to ARC where applicable. The 100 s reporting window
                starts when the fault threshold is crossed.
              </li>
              <li>
                <strong>Localisation.</strong> On addressable systems, the CIE may be able to
                localise the fault to a specific portion of the loop based on signal-strength
                differences from each direction. On simpler systems the fault is reported at loop
                level and the maintainer must localise by isolation.
              </li>
              <li>
                <strong>Persistence.</strong> The fault indication remains until the underlying
                condition is corrected. Acknowledging the buzzer silences the audible indication but
                the visual indication remains.
              </li>
            </ul>
            <p>
              Loop earth-fault monitoring is one of the diagnostic strengths of modern addressable
              systems. Faults are detected early, often before they produce loop-integrity
              consequences, allowing the maintenance team to investigate proactively rather than
              reactively. The maintainer&apos;s discipline is to investigate every reported earth
              fault — not to dismiss them as &quot;intermittent noise&quot; or to acknowledge them
              and move on.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The IR test problem with electronic devices</ContentEyebrow>

          <ConceptBlock
            title="Why 500 V DC and addressable devices do not mix"
            plainEnglish="Standard insulation-resistance testing applies 500 V DC between the conductors under test and earth, measuring the resistance through the insulation. The 500 V figure is conservative for general LV cabling — well above operating voltage but not so high that good cable insulation breaks down under test. But fire alarm addressable devices include electronic components — loop-driver chips, addressable communication ICs, end-of-line resistors, surge protection — that are designed for the loop\'s operating voltage of around 24 V DC. Applying 500 V DC across these components destroys them; the CIE is then dealing with multiple faulty devices on the loop, plus whatever original problem prompted the test."
          >
            <p>Approaches to insulation testing of fire alarm circuits:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Disconnect and test the cable alone.</strong> Disconnect the loop at the CIE
                end and at all branch / device points, removing the addressable devices from the
                test path. Apply 500 V DC IR between the loop conductors and earth. The cable&apos;s
                insulation can be tested without risk to the devices. Document the test method,
                including which devices were disconnected and the location of each disconnection.
              </li>
              <li>
                <strong>Use the CIE&apos;s built-in diagnostics.</strong> Modern addressable CIEs
                provide loop diagnostics: continuous earth-fault impedance monitoring, loop
                integrity check, voltage and current measurements at the loop terminals. These
                diagnostics provide much of the information an IR test would give, without
                disconnecting devices. The CIE&apos;s manual gives the specific diagnostic
                procedures and the readings to expect on a healthy installation.
              </li>
              <li>
                <strong>Use a low-voltage method.</strong> Some specialist test equipment provides
                insulation testing at voltages below the threshold for damaging fire-alarm
                electronics — typically tens of volts rather than 500 V. The result is less
                discriminating than 500 V testing of bare cable but is appropriate to live
                installations with electronic devices.
              </li>
              <li>
                <strong>Combination.</strong> Where serious insulation issues are suspected, the
                disciplined approach is to use CIE diagnostics first to localise the problem,
                disconnect the affected segment, and apply 500 V testing on the cable alone in that
                segment. The disconnect-and-test approach is then targeted rather than applied
                indiscriminately to the whole loop.
              </li>
            </ul>
            <p>
              The wrong approach — applying 500 V DC to a loop with addressable devices in circuit —
              produces a known and avoidable failure mode. The maintenance team that destroys a loop
              by IR testing it at 500 V has to replace the devices AND find the original fault, at
              greatly increased cost. The competent approach uses the right method for the
              installation type.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 (Insulation testing of fire alarm circuits) and CIE manufacturer-specific guidance"
            clause={
              <>
                Insulation resistance testing of fire alarm circuits should not be performed at test
                voltages that exceed the operating envelope of any device connected to the circuit.
                Where devices include sensitive electronic components, the test method should be one
                of: disconnection of devices and testing of the cable alone; use of the control and
                indicating equipment&apos;s built-in diagnostic functions; or use of a test method
                specifically designed for live installations with electronic devices. The test
                method used should be recorded.
              </>
            }
            meaning="The principle is straightforward: the test method must not damage what it is testing. Modern addressable systems require either disconnect-and-test, or built-in diagnostics, or a low-voltage method appropriate to live electronics. The standard 500 V IR test, applied without thought, destroys equipment."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Fault indications must not be concealed — BS 5839-1:2025 clause 23
          </ContentEyebrow>

          <ConceptBlock
            title="The 2025 clarification — no concealment, no suppression"
            plainEnglish="A pattern has emerged on some sites of suppressing fault indications because they are inconvenient. Tape over the yellow LED. Programming silent fault states so the buzzer does not sound. Daily acknowledgment by the receptionist without ever calling for repair. The 2025 standard clarifies what was already implicit: this is not acceptable. Fault indications exist to inform the user that the system is not fully operational; suppressing them keeps the user uninformed and the fire risk hidden. Where a fault cannot be repaired immediately, the indication remains visible until repair is complete; compensating measures (e.g. fire watch in the affected area) are documented and implemented; the audit trail shows the decision."
          >
            <p>What clause 23 prohibits in practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Physical concealment.</strong> Tape over LED indicators; covers fitted over
                the CIE display; positioning the CIE so its indicators cannot be seen from normal
                occupancy positions. All non-compliant — the user must be able to see the fault
                state.
              </li>
              <li>
                <strong>Programmatic suppression.</strong> CIE configurations that suppress fault
                signalling — silent fault buzzer, hidden fault display, faults that auto-clear on a
                timer. CIE configuration software typically allows some of these; using them to hide
                faults is non-compliant.
              </li>
              <li>
                <strong>Daily acknowledgment without repair.</strong> The receptionist who
                acknowledges the fault buzzer every morning without ever calling for repair is
                effectively suppressing the indication. The fault state is real; the audible
                indication has been silenced; but the underlying condition remains and protection
                may be degraded. BS 5839-1:2025 expects acknowledgment to be a step toward repair,
                not a substitute for it.
              </li>
              <li>
                <strong>Indefinite delay.</strong> A fault that was reported six months ago,
                acknowledged daily, and never repaired is a system that is not being maintained.
                Where genuine repair delays exist (parts on order, specialist visit pending), the
                management plan documents the delay, the compensating measures, and the target
                repair date. Indefinite delay without documentation is not acceptable.
              </li>
              <li>
                <strong>Removal of indicators.</strong> Some sites have been found to have removed
                fault indicator LEDs or disconnected fault buzzers physically. This is wilful
                suppression and is a serious non-compliance.
              </li>
            </ul>
            <p>
              The principle is simple: the system communicates its state to the user; the user acts
              on what the system communicates. Anything that breaks the communication chain is
              suppression. The 2025 clarification reinforces this principle for the cases that were
              emerging in field practice.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 23 (Arrangements for repair of faults or damage) — clarified per FIA Guide"
            clause={
              <>
                Where the user has reported a fault on the system to the service organisation and
                the service organisation cannot complete an effective repair, fault indications
                shall not be concealed (e.g. by suppressing the fault indication). The fault
                indication shall remain visible and active until the underlying fault is repaired.
                Where repair cannot be completed promptly, compensating measures appropriate to the
                affected portion of the system shall be implemented and documented in the management
                plan; the user shall be informed of the compensating measures and the expected
                repair completion.
              </>
            }
            meaning="The 2025 clarification is plain language: do not hide faults. Where repair is delayed, document the delay and put compensating measures in place. The fault indication continues to communicate the system state to the user throughout the delay."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Fault diagnosis in practice</ContentEyebrow>

          <Scenario
            title="The intermittent earth fault that won't sit still"
            situation="A 200-device addressable Cat L1 system has been generating intermittent earth-fault reports for two weeks. The fault appears at irregular intervals, lasts anywhere from 10 minutes to 4 hours, then clears on its own. The maintainer has tested the cable (with devices isolated) and found insulation intact. The CIE's loop diagnostics show the fault is on Loop 2. The maintenance team has been acknowledging the fault and continuing to wait for it to fail in a useful way."
            whatToDo="Apply the diagnostic discipline. (1) Verify the FUNCTIONAL EARTH termination at the CIE first — confirm pink + FE conductor lands on the FE terminal, not on the PE bar; confirm tightness of termination; confirm there is no link between FE and PE at the CIE end. FE issues commonly produce intermittent earth-fault reports that come and go with mains transients. (2) If FE is correct, apply isolation diagnostics — disconnect Loop 2 at the half-way isolator and run the system; if the fault disappears, it is on the disconnected half. Repeat by halving until the fault is localised. (3) Within the localised segment, suspect environmental drivers — humidity around a specific detector, water ingress on a sounder, contamination on an interface unit. (4) Replace the suspect device; monitor for recurrence. Document the diagnostic process and the resolution."
            whyItMatters="Intermittent earth faults are real faults, not noise. The 100 s reporting requirement catches them when they appear; the fault state is logged with timestamps; the pattern is in the data. The diagnostic discipline — verify FE first, then isolate, then localise, then identify the device — is the right way to find them. Ignoring the fault and waiting for it to become permanent is fault suppression in slow motion; the system is partly out of service every time the fault appears, and the user is being deprived of the protection they expected."
          />

          <Scenario
            title="The 500 V DC mistake on a Class A loop"
            situation="A new maintainer at a site has been asked to perform an annual inspection on an addressable Cat L2 system. The maintainer reads 'insulation resistance test annual' on the inspection schedule and decides to perform a 500 V DC IR test on the loop, with the addressable devices in circuit. Within seconds of the test, the CIE goes into multiple-device-fault state — half the loop devices have stopped reporting. The CIE indicates loop integrity issues across multiple zones."
            whatToDo="Stop the IR test immediately. Restore the loop to its normal supply via the CIE. Power-cycle the CIE. Run the loop diagnostic to identify which devices are responding and which are not. The non-responsive devices have likely been damaged by the 500 V DC and require replacement. Communicate with the customer about the consequence; the cost of replacement devices and labour falls on the maintenance contractor for the procedure error. Document the event in the system logbook (cause: incorrect IR test method) and amend the maintenance procedures so future visits use either disconnect-and-test, the CIE's built-in diagnostics, or a low-voltage method."
            whyItMatters="The mistake is well-known, well-documented, and entirely avoidable. The 500 V DC test was developed for general LV cabling without sensitive electronics; modern addressable fire alarm devices do not survive it. Competent maintenance personnel are trained to recognise that addressable systems require a different approach. The maintainer who applies the wrong method has both damaged the customer's system and produced a costly remedial workload. Training, procedure documentation, and method-statement reviews are the engineering controls that prevent this. The standards (BS 5839-1, CIE manufacturer guidance) are explicit; following them is not optional."
          />

          <CommonMistake
            title="Acknowledging a recurring fault every morning instead of repairing it"
            whatHappens="The CIE has been reporting an intermittent earth fault on Loop 1 for three weeks. The site receptionist acknowledges the fault buzzer each morning when arriving on site; the visual indication remains active throughout the day. Nobody has called the maintenance contractor because 'the fault always comes and goes anyway'. After a month, the underlying condition develops into a permanent earth fault that affects loop communication; protection on Loop 1 is materially degraded. The fire risk assessor on a routine visit identifies the unaddressed fault state and the system is rated as non-compliant."
            doInstead="Apply BS 5839-1:2025 clause 23. Acknowledgment is not repair. A reported fault is investigated; a maintenance call is logged with the contractor; a repair date is scheduled; compensating measures (fire watch in the affected area) are put in place if the repair is delayed; the management plan documents the situation. The fault indication remains visible throughout. The audit trail shows the system is being managed responsibly even when repair is delayed; daily-acknowledgment-without-action is not such an audit trail."
          />

          <CommonMistake
            title="Disabling the fault buzzer 'because it is annoying'"
            whatHappens="A maintenance engineer is asked by the site manager to make the fault buzzer quieter because it has been sounding intermittently for weeks. The engineer programmes the CIE configuration to mute the fault buzzer entirely. From that point onwards, fault states have no audible indication; the visible LED remains but is not noticed by site staff. Real faults occur and persist for days without action. At the next inspection the fire-risk assessor discovers the silent-fault programming and the unaddressed faults; the system is non-compliant on multiple counts."
            doInstead="Configure the CIE per the manufacturer's defaults. The fault buzzer is part of the user interface; muting it suppresses the system's communication of its state. Where the buzzer is sounding, the appropriate response is to identify and repair the underlying fault, not to mute the indication. Site management complaining about a buzzer is a signal to expedite the repair, not to disable the buzzer."
          />

          <CommonMistake
            title="Treating addressable loop diagnostics as 'optional'"
            whatHappens="A maintainer doing a routine annual inspection runs the basic functional tests (smoke entry into representative detectors, sounder operation, mains-fail) but does not access the CIE's loop diagnostic screens. Subtle issues — partial earth-fault impedance trending toward the threshold, intermittent loop voltage drops, addressable communication errors below the alert threshold — are missed. Six months later one of those subtle issues develops into a full fault and the customer asks why the inspection didn't catch it."
            doInstead="Use the CIE's built-in diagnostics as part of every maintenance visit. Modern addressable CIEs provide loop earth-fault impedance, loop voltage, loop current, communication error counters, device response statistics. These data points reveal degradation trends before they produce circuit-affecting faults. The maintainer who reads them as part of a routine inspection catches early-warning indications; the maintainer who skips them misses preventable issues."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Earth fault must be REPORTED on the CIE within 100 SECONDS — derived from BS EN 54-2, applied by BS 5839-1:2025.',
              'Class A loop: single fault REPORTED, protection PRESERVED. Class B radial: single fault REPORTED, protection LOST beyond fault.',
              'Loop earth-fault monitoring on addressable systems = continuous impedance measurement against the FE reference. Verify FE termination first when diagnosing apparent loop faults.',
              'Do NOT apply 500 V DC IR test with addressable devices in circuit — devices will be damaged. Disconnect, OR use CIE diagnostics, OR use a live-electronics method.',
              'BS 5839-1:2025 clause 23: fault indications must NOT be concealed or suppressed. No tape over LEDs, no silent-fault programming, no daily-acknowledgment-without-repair.',
              'Acknowledgment is NOT repair. A reported fault is investigated, scheduled for repair, with compensating measures during any delay. The fault indication remains visible throughout.',
              'Diagnostic order: verify FE → isolate by halves → localise to segment → identify device → replace / repair → monitor. Document method and outcome.',
              'Use the CIE built-in diagnostics (loop earth-fault impedance, loop voltage / current, comms error counters) as part of every routine inspection — early-warning trend data.',
              'Repair urgency: prompt repair is the expectation. Where delayed, the management plan documents compensating measures and target completion. Indefinite delay without documentation is non-compliant.',
              'The 100 s rule, the no-concealment rule, the IR-test-care rule, and the FE-termination check together form the earth-fault discipline of BS 5839-1:2025.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'What is the difference between an earth fault and an open-circuit / short-circuit fault on a fire alarm loop?',
                answer:
                  "Earth fault = a low-impedance path between one of the loop conductors and earth (typically the system's functional-earth reference). The loop integrity (conductor-to-conductor) is not necessarily affected; the fault is to earth. Open-circuit fault = a break in the loop conductor; the loop is no longer continuous from end to end. Short-circuit fault = a low-impedance path between the two loop conductors; current draw exceeds normal. All three are reported as faults; their consequences for the system's operation differ. Loop earth-fault monitoring detects the first; loop integrity monitoring detects the second; isolators on the loop respond to the third.",
              },
              {
                question:
                  'Can I run the standard 500 V DC IR test on a fire alarm circuit with conventional (non-addressable) detectors?',
                answer:
                  "Conventional detectors typically tolerate 500 V DC IR testing better than addressable detectors, but check the detector manufacturer's technical data first. Many conventional detectors include surge protection, EOL resistors, or other components that may be sensitive. Where the manufacturer's data confirms tolerance, the 500 V test can be applied with the detectors in circuit; where it does not, disconnect the detectors. Document the test method either way. The principle — test method must not damage what it tests — applies to conventional and addressable systems alike.",
              },
              {
                question:
                  'How quickly should an earth fault be repaired after it has been reported?',
                answer:
                  "BS 5839-1:2025 expects faults to be repaired with reasonable promptness, calibrated to the consequence of the fault. For Class A circuits where protection is preserved, a 24-hour response window is typical for non-critical premises (sooner for life-safety-critical premises like hospitals, care homes, sleeping accommodation). For Class B circuits where protection is lost beyond the fault, the response is more urgent — within hours, with compensating measures (fire watch) until repair is complete. The system's management plan and service contract should specify the response targets.",
              },
              {
                question:
                  'My CIE shows an earth fault but the loop is operating normally — can I leave it?',
                answer:
                  'No. The earth-fault indication means the fault threshold has been crossed; the underlying condition is real even if it has not yet affected loop operation. Earth faults typically progress — partial degradation today becomes circuit-affecting fault next month. Leaving the indication unaddressed is fault suppression in slow motion. Investigate and repair when reported; do not wait until the fault becomes catastrophic.',
              },
              {
                question:
                  'What is the difference between a "fault" indication and a "service due" indication on a CIE?',
                answer:
                  'A fault indication signals an active condition that prevents the system from operating fully. A service-due indication signals that a scheduled maintenance visit is approaching. The two are different categories of alert and are typically presented differently on the CIE. Both should be acted on — fault by repair, service-due by scheduling the maintenance visit. Both fall under the no-suppression principle: do not hide them.',
              },
              {
                question:
                  'Can the FE conductor itself develop an earth fault, and what does that look like?',
                answer:
                  'Yes — the FE conductor can lose continuity (broken termination, corroded joint), or it can become bonded to PE upstream (FE landed on PE bar), or it can pick up noise from a nearby disturbance source. All of these affect the loop earth-fault monitoring. A broken FE produces a high-impedance path that may not be detected as a fault by the CIE but corrupts the monitoring; FE bonded to PE produces transient earth-fault indications correlated with PE noise; FE picking up noise produces intermittent fault indications. Diagnostic: verify FE end-to-end before assuming the fault is in the loop wiring.',
              },
              {
                question: 'How do I verify the 100 s reporting time on commissioning?',
                answer:
                  'Inject a controlled earth fault on a loop conductor — typically by connecting a known low-impedance resistor (e.g. 10 kΩ) between a loop conductor and a known-safe earth point near the CIE. Time from fault injection to fault indication on the CIE display. The CIE should indicate within 100 s. Repeat for each loop. Document the test in the commissioning records. Some CIEs have a built-in test function that simulates the fault internally; this is acceptable as an alternative to physical fault injection.',
              },
              {
                question:
                  'A site has a recurring intermittent earth fault that nobody has been able to resolve over years. The maintenance contractor has suggested replacing the entire loop cable. Is this the right answer?',
                answer:
                  'It is one possible answer but probably not the first one. A long-running intermittent fault that resists diagnosis usually has a specific cause — a single device with environmental issues, a single termination that has been compromised, or a functional-earth termination problem. Replacing the entire loop cable replaces the wiring and may resolve the fault but does not identify the cause; the cause may recur in the new wiring. Diagnostic discipline — verify FE, halve the loop with the isolator, localise progressively, identify the device or termination — has higher diagnostic value than blanket replacement. Replacement is a last-resort response when the diagnostic process has been exhausted.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Earth fault monitoring — Module 4.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 5 — Installation &amp; commissioning
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

export default FireAlarmModule4Section5;
