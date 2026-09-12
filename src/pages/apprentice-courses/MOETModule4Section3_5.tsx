/**
 * MOET · Module 4 · Section 3 · Subsection 5 — Control Circuit Faults
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Common electrical plant, equipment, and systems
 *                 failure modes."
 *              · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *              · "Electrical. Problem solving and critical reasoning
 *                 techniques."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Control Circuit Faults - MOET Module 4 Section 3.5';
const DESCRIPTION =
  'Diagnosing faults in control circuits and automation systems including relay logic, PLC I/O, contactor circuits, timer faults, interlock failures and sensor diagnostics for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'contactor-buzz',
    question:
      'A contactor is buzzing loudly and the main contacts are chattering. The most likely cause is:',
    options: [
      'Low control voltage at the contactor coil, or a damaged shading ring on the coil pole face',
      'The motor overload relay set too high for the connected load',
      'A short circuit between two phases on the load side of the contactor',
      'An open-circuit auxiliary contact preventing the coil from energising',
    ],
    correctIndex: 0,
    explanation:
      'A buzzing, chattering contactor indicates the magnetic force is insufficient to hold the armature fully closed. This is typically caused by low control voltage (supply dip, high-resistance connection in the control circuit) or a damaged shading ring — a copper band on the pole face that prevents the armature releasing at each zero-crossing of the AC waveform. Both conditions cause rapid make-break cycling that damages the main contacts.',
  },
  {
    id: 'plc-input-fault',
    question:
      'A PLC input LED is illuminated on the I/O module, but the programme shows the input as OFF. This suggests:',
    options: [
      'The field sensor has failed and is no longer sending a signal to the input terminal',
      'The wiring between the sensor and the input terminal has gone open circuit',
      'A fault between the I/O module hardware and the PLC processor — possibly a faulty I/O module, backplane connection or configuration error',
      'The 24 V DC field supply to the sensor has been lost completely',
    ],
    correctIndex: 2,
    explanation:
      'If the hardware LED on the I/O module shows the input is active but the PLC programme does not reflect this, the fault lies between the I/O hardware and the processor. This could be a faulty I/O module, a loose backplane connection, a configuration error (wrong I/O address mapped), or in rare cases, a processor fault. The field device and wiring are working correctly because the LED is illuminated.',
  },
  {
    id: 'timer-fault',
    question:
      'A process sequence stalls at a stage that should advance after a timed delay. The timer output does not energise after the set time. What should you check FIRST?',
    options: [
      'Immediately replace the timer with a new unit, since timers are the usual cause of a stalled sequence',
      'Bypass the timed step so the sequence can advance and keep the process running',
      'Increase the timer preset value, as the delay set is probably too short for the stage to complete',
      'Verify the timer is receiving its enable/trigger signal, check the time setting, and confirm the timer type (on-delay, off-delay, pulse) is correct for the application',
    ],
    correctIndex: 3,
    explanation:
      'Before replacing any component, verify that it is receiving the correct input signals. A timer that does not start may simply not be receiving its enable signal due to an upstream fault. Also confirm the time base setting (seconds vs minutes — a common error) and that the timer type matches the application requirement. Replacing a timer without diagnosis wastes time and may not resolve the issue.',
  },
  {
    id: 'interlock-diagnosis',
    question:
      'In a motor starter circuit with multiple series-connected interlock contacts, the most efficient way to locate a single open interlock is:',
    options: [
      'Bypass each interlock in turn with a temporary link until the motor starts',
      'Replace every interlock contact in the chain one at a time until the fault clears',
      'Use the half-split technique — measure voltage at the midpoint of the interlock chain to identify which half contains the open contact',
      'Measure the insulation resistance of the whole control circuit to find the open contact',
    ],
    correctIndex: 2,
    explanation:
      'The half-split technique is the most efficient method for locating a single open contact in a series chain. Measure voltage at the midpoint: if supply voltage is present, the open contact is downstream; if no voltage, it is upstream. Continue halving until the specific open contact is identified. Never bypass interlocks — they are safety devices and bypassing them creates a serious hazard.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In a conventional motor starter control circuit, the auxiliary contact (hold-on contact) across the start button serves to:',
    options: [
      'Provide overload protection by opening the coil circuit when the motor draws excess current',
      'Maintain the contactor coil circuit after the start button is released, creating a latching function',
      'Reduce the starting current by inserting resistance into the motor circuit on start-up',
      'Switch the motor between star and delta connections during the starting sequence',
    ],
    correctAnswer: 1,
    explanation:
      'The auxiliary (hold-on or seal-in) contact is wired in parallel with the start button. When the start button is pressed, the contactor energises and the auxiliary contact closes. When the start button is released, current continues to flow through the auxiliary contact, keeping the contactor energised. This latching arrangement is fundamental to motor starter control circuits.',
  },
  {
    id: 2,
    question:
      'A stop button in a motor control circuit is wired as a normally closed (NC) contact in series with the coil circuit. This means:',
    options: [
      'The motor can only be stopped by isolating the main supply, not by the stop button itself',
      'Pressing the stop button energises the coil, so a broken wire would leave the motor running',
      'Pressing the stop button opens the circuit, de-energising the coil; a broken wire to the stop button also stops the motor (fail-safe)',
      'The stop button must be held in continuously for the motor to remain stopped',
    ],
    correctAnswer: 2,
    explanation:
      'Using a normally closed stop button in series creates a fail-safe arrangement. If the wire to the stop button breaks, the circuit opens and the motor stops — the same as pressing the stop button. This is a fundamental safety design principle in control circuits: loss of the control signal results in a safe state (motor stopped).',
  },
  {
    id: 3,
    question:
      'A relay coil measures 0 ohms (short circuit) when tested with a multimeter. This indicates:',
    options: [
      'The coil is perfectly healthy, as a good coil should read zero resistance',
      'The coil winding is open circuit and the relay will not energise',
      'The relay contacts have welded together on the load side',
      'The coil winding has a short circuit between turns — the relay must be replaced',
    ],
    correctAnswer: 3,
    explanation:
      'A healthy relay coil should have a measurable resistance (typically tens to thousands of ohms depending on the coil type and voltage rating). A reading of 0 ohms indicates a short circuit within the coil winding, meaning the turns are shorted together. The relay must be replaced. Note: also check for an open circuit (infinite resistance), which indicates a broken coil winding.',
  },
  {
    id: 4,
    question: 'Welded contactor contacts (contacts stuck together) are typically caused by:',
    options: [
      'Excessive inrush current, frequent switching under load, or chattering due to low coil voltage',
      'An open-circuit coil that prevents the contactor from ever closing',
      'Operating the contactor well below its rated current for long periods',
      'A correctly sized overload relay tripping the circuit on overcurrent',
    ],
    correctAnswer: 0,
    explanation:
      'Welded contacts occur when excessive current flows through the contacts during making or breaking, generating enough heat to fuse the contact surfaces together. Common causes include high motor inrush current (especially DOL starting of large motors), frequent on/off cycling under load, and chattering (which causes repeated arcing). Welded contacts are a serious fault — the motor cannot be stopped by the control circuit.',
  },
  {
    id: 5,
    question: 'When diagnosing a PLC-controlled system, the FIRST step should be:',
    options: [
      'Replace the PLC processor module, as it is the most likely component to fail',
      'Check the PLC diagnostic display for fault indicators and review the I/O status to identify unexpected states',
      'Rewrite and reload the PLC programme to clear any software corruption',
      'Disconnect every field device and test each one individually on the bench',
    ],
    correctAnswer: 1,
    explanation:
      'The PLC diagnostic display provides immediate, invaluable information. Fault LEDs indicate hardware problems. The I/O status display shows the real-time state of every input and output, allowing you to quickly identify which signal is in an unexpected state. This narrows the investigation to a specific field device or output without any physical testing.',
  },
  {
    id: 6,
    question:
      "A proximity sensor used as an interlock in a control circuit shows 'sensor active' (LED on) when no target is present. This indicates:",
    options: [
      'The sensor is working correctly and the interlock condition is satisfied',
      'The PLC input module has failed and is forcing the input high',
      'The sensor is faulty, misadjusted, or detecting a metallic object that should not be in range',
      'The 24 V supply to the sensor has been lost, switching the LED on',
    ],
    correctAnswer: 2,
    explanation:
      "A proximity sensor showing active with no target present suggests the sensor is faulty (internal failure), misadjusted (sensitivity set too high), or detecting an unintended metallic object within its sensing range. Check the sensor's mounting position, sensing distance setting, and the surrounding area for metallic objects before replacing the sensor.",
  },
  {
    id: 7,
    question:
      'In a star-delta starter, the motor fails to transition from star to delta. The motor runs in star but trips on overload. The fault could be:',
    options: [
      'The motor windings are connected incorrectly',
      'The changeover timer or the delta contactor coil circuit has a fault',
      'The star contactor has welded contacts preventing delta closure',
      'Both the timer/delta circuit fault and welded star contacts are possible causes',
    ],
    correctAnswer: 3,
    explanation:
      'Both conditions could cause this symptom. If the delta contactor fails to energise (due to a timer fault, coil fault, or wiring issue), the motor remains in star. If the star contactor contacts have welded (stuck closed), the delta contactor may be mechanically interlocked from closing. In either case, the motor runs in star at reduced voltage, drawing excessive current, and the overload eventually trips.',
  },
  {
    id: 8,
    question:
      'A 24 V DC control circuit relay coil is rated at 24 V DC but the measured voltage at the coil is only 18 V. The relay does not reliably pull in. The cause is likely:',
    options: [
      'Voltage drop across the control circuit due to high-resistance connections, long cable runs or undersized conductors',
      'A short circuit between turns of the relay coil winding',
      'The relay contacts have welded closed on the load side',
      'The 24 V supply is set too high and is saturating the coil',
    ],
    correctAnswer: 0,
    explanation:
      'A 6 V drop (25%) across the control circuit indicates excessive resistance in the wiring. This could be caused by high-resistance connections (loose terminals, corroded contacts), excessively long cable runs with undersized conductors, or multiple series-connected contacts each adding resistance. Most relay coils require at least 80% of rated voltage to reliably pull in — 18 V on a 24 V coil (75%) is marginal to insufficient.',
  },
  {
    id: 9,
    question: 'An emergency stop circuit using safety relays must be designed so that:',
    options: [
      'A broken wire in the circuit leaves the machine running so production is not interrupted',
      'A fault in the emergency stop circuit (broken wire, relay failure) results in the system stopping — fail-safe design',
      'The emergency stop button must be held pressed continuously to keep the machine stopped',
      'The circuit can be reset remotely without anyone checking the cause of the stop',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency stop circuits must be designed on the fail-safe principle: any fault in the circuit (broken wire, relay coil failure, contact welding) must result in the system achieving a safe state (stopped). Safety relays provide monitored contacts, cross-monitoring and force-guided operation to detect faults. This is a requirement of BS EN ISO 13849 (safety of machinery control systems).',
  },
  {
    id: 10,
    question:
      'When testing a control circuit with the power on, you measure 230 V across a contact that should be closed. This indicates:',
    options: [
      'The contact is closed and healthy, carrying the full load current normally',
      'The control supply transformer has failed and lost its output voltage',
      'The contact is open — voltage is present across it because no current is flowing through the load beyond it',
      'The connected coil downstream has gone short circuit',
    ],
    correctAnswer: 2,
    explanation:
      'In a series circuit, a closed (conducting) contact has virtually zero voltage across it. If you measure full supply voltage across a contact, it means the contact is open-circuit (or extremely high resistance). The voltage appears across the open contact because it is the break in the circuit, with supply voltage on one side and the load circuit (at neutral potential) on the other. This is a fundamental diagnostic principle.',
  },
  {
    id: 11,
    question:
      'A safety light curtain protecting a machine access point trips the safety relay, but no obstruction is visible. You should:',
    options: [
      'Bypass the light curtain with a temporary link so the machine can keep running',
      'Replace the safety relay immediately, as it is the most likely faulty component',
      'Increase the machine speed to clear any object that may be passing through quickly',
      'Check for contamination on the lenses, misalignment, loose mounting, vibration, or environmental interference',
    ],
    correctAnswer: 3,
    explanation:
      'False trips on safety light curtains are commonly caused by contaminated lenses (dust, oil, condensation), misalignment of sender and receiver units, loose mounting brackets that vibrate, or environmental factors (direct sunlight, steam, welding flash). Clean the lenses, check the alignment indicator LEDs, and verify the mounting is secure before considering replacement. Never bypass a safety device.',
  },
  {
    id: 12,
    question:
      'A motor control centre (MCC) has multiple starters sharing a common control supply transformer. If this transformer fails:',
    options: [
      'All motors fed from that control supply lose their control circuits — all contactors drop out simultaneously',
      'Only the largest motor on the MCC will stop, while the smaller motors continue to run',
      'The motors continue running because the power circuit is unaffected by the control supply',
      'The motors run at reduced speed until the control transformer is replaced',
    ],
    correctAnswer: 0,
    explanation:
      'A common control supply transformer failure removes the control voltage from all starters it feeds. All contactor coils lose their supply, all contactors drop out, and all motors stop simultaneously. This is a single point of failure that should be considered in the design. Critical systems may use dual redundant control transformers or individual control transformers per starter.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a relay and a contactor?',
    answer:
      'Functionally they are similar — both are electromagnetically operated switches. The main differences are size and application. Relays are typically smaller, used for control circuit switching (low current), and have multiple changeover contacts. Contactors are larger, designed for switching power circuits (motor loads), and have higher current-rated main contacts plus auxiliary contacts for the control circuit. In practice, the diagnostic approach is the same: check the coil circuit, check the contacts.',
  },
  {
    question:
      'How do I trace a fault in a PLC programme without access to the programming software?',
    answer:
      "Many faults in PLC-controlled systems are in the field wiring and devices, not the programme. Use the PLC's built-in diagnostics: check the I/O LEDs on the modules to see which inputs and outputs are active. Compare what you see with what the system should be doing. If an input that should be ON is OFF, the fault is in the field device or wiring to it. If an output that should be ON is OFF but the programme appears to be calling for it, the I/O module or output device may be faulty.",
  },
  {
    question: 'Why do control circuit faults sometimes seem to come and go?',
    answer:
      'Intermittent control circuit faults are commonly caused by poor connections — loose terminals, corroded contacts, cracked solder joints or damaged cable insulation that makes intermittent contact. Temperature changes cause thermal expansion and contraction that can make a marginal connection break and remake. Vibration has the same effect. These are some of the most frustrating faults to diagnose because they may not be present when you arrive to investigate.',
  },
  {
    question:
      'Should I use voltage testing or continuity testing when diagnosing control circuits?',
    answer:
      'Both have their place. Voltage testing with the circuit energised shows you where power is present and where it is lost — ideal for following the signal flow through a live control circuit. Continuity testing on a de-energised circuit confirms that contacts, coils and wiring are intact. Voltage testing is generally more informative because it shows the circuit operating under load conditions, but it requires Regulation 14 compliance for live working.',
  },
  {
    question: 'What is force-guided contact operation in safety relays?',
    answer:
      'Force-guided (also called positive-guided or mechanically linked) contacts are designed so that the normally open (NO) and normally closed (NC) contacts cannot both be in the closed position simultaneously. If a NO contact welds closed, the NC contacts are mechanically prevented from closing. This allows the safety monitoring circuit to detect a contact welding fault. It is a mandatory requirement for safety relay contacts used in emergency stop and safety interlock circuits under BS EN ISO 13849.',
  },
  {
    question: 'How does control circuit fault finding relate to ST1426?',
    answer:
      'ST1426 requires maintenance technicians to diagnose faults in control systems including relay logic, PLCs and associated field devices. The End Point Assessment may include scenarios involving control circuit faults. You should be able to read and interpret control circuit diagrams, use systematic diagnostic techniques to locate faults, and demonstrate understanding of safety circuit principles.',
  },
];

const MOETModule4Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.3 · Subsection 5"
        title="Control Circuit Faults"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Diagnosing faults in control circuits, relay logic, PLCs and automation systems
          </p>

          <TLDR
            points={[
              'Relay logic: coil faults, contact welding, voltage drop, wiring faults.',
              'PLC systems: I/O diagnostics, field device failures, communication faults.',
              'Safety circuits: fail-safe design, force-guided contacts, monitored interlocks.',
              'Voltage test: full voltage across a contact = contact is open.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Diagnose common relay and contactor control circuit faults',
              'Use PLC diagnostics to identify field device and I/O module faults',
              'Apply voltage measurement techniques to trace faults in live control circuits',
              'Understand fail-safe design principles in emergency stop and safety circuits',
              'Identify timer, sensor and interlock faults in automated systems',
              'Read and interpret control circuit schematic diagrams for fault finding',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <p>
              Control circuits are the brain of any automated electrical system. They determine when
              motors start and stop, in what sequence, and under what conditions. When a control
              circuit fault occurs, the symptoms can range from a complete failure to start through
              to erratic, intermittent or unsafe operation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Circuit diagrams:</strong> essential for tracing control circuit signal
                flow.
              </li>
              <li>
                <strong>Fail-safe:</strong> NC stop buttons, safety relays — loss of signal = safe
                state.
              </li>
              <li>
                <strong>Never bypass:</strong> interlocks and safety devices must not be bypassed.
              </li>
              <li>
                <strong>ST1426:</strong> control system diagnosis assessed at EPA.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Relay and contactor control circuit faults</ContentEyebrow>

          <ConceptBlock title="Relay and contactor control circuit faults">
            <p>
              Diagnosing control circuit faults requires a solid understanding of how control
              circuits work and the ability to read circuit diagrams — skills that are explicitly
              required by the ST1426 standard.
            </p>
            <p>
              The fundamental components of relay-based control circuits are contactors, relays,
              pushbuttons, selector switches, limit switches, timers, overload relays and pilot
              lights. Each can fail in predictable ways, and understanding these failure modes
              allows you to diagnose faults efficiently using the systematic techniques covered in
              Section 4.3.2.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common control circuit component failures">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Component</th>
                    <th className="py-2 pr-4 font-medium text-white">Failure mode</th>
                    <th className="py-2 font-medium text-white">Symptom</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Contactor coil</td>
                    <td className="py-2 pr-4">Open circuit (burnt out) or short circuit</td>
                    <td className="py-2">Contactor does not pull in; or trips the control fuse</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Contactor contacts</td>
                    <td className="py-2 pr-4">Welded closed, pitted, or high resistance</td>
                    <td className="py-2">Motor cannot stop; intermittent operation; overheating</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Auxiliary contact</td>
                    <td className="py-2 pr-4">Worn, high resistance, or open circuit</td>
                    <td className="py-2">
                      Loss of hold-on (motor stops when start button released)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Overload relay</td>
                    <td className="py-2 pr-4">Tripped, contact failure, incorrect setting</td>
                    <td className="py-2">Motor will not start; nuisance tripping; no protection</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Pushbutton</td>
                    <td className="py-2 pr-4">Worn mechanism, contact failure, wiring fault</td>
                    <td className="py-2">No response when pressed; intermittent operation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Voltage testing in live control circuits">
            <p>
              One of the most powerful diagnostic techniques for control circuits is voltage
              measurement across individual components in the live circuit. The principle is simple
              but frequently misunderstood:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>A closed (healthy) contact:</strong> has virtually zero volts across it —
                current flows freely through it.
              </li>
              <li>
                <strong>An open (faulty) contact:</strong> has the full supply voltage across it —
                it is the break in the circuit.
              </li>
              <li>
                <strong>A healthy coil:</strong> has the supply voltage across it when energised
                (the voltage is being used to drive current through the coil).
              </li>
              <li>
                <strong>An open-circuit coil:</strong> may show supply voltage across it, but no
                current flows and the relay does not operate.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> when measuring across contacts in a control circuit, full
              voltage across a contact means it is open. Zero volts across a contact means it is
              closed. This is counter-intuitive to beginners but is a fundamental diagnostic
              principle that you must understand and apply confidently.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>PLC and automation system faults</ContentEyebrow>

          <ConceptBlock title="PLC and automation system faults">
            <p>
              Programmable Logic Controllers (PLCs) have largely replaced relay-based control in
              modern industrial systems. While PLCs are inherently more reliable than relay logic
              (no moving parts in the controller itself), the field devices connected to them —
              sensors, switches, actuators, solenoid valves — are still subject to failure. In
              practice, the vast majority of faults in PLC-controlled systems are in the field
              wiring and devices, not in the PLC itself.
            </p>
            <p>
              The great advantage of PLC systems for fault finding is their built-in diagnostics.
              Most PLCs provide real-time I/O status indication via LEDs on the I/O modules,
              diagnostic registers accessible through the programming terminal, and fault logs that
              record events with timestamps. Learning to use these diagnostic features is one of the
              most valuable skills a modern maintenance technician can develop.
            </p>
          </ConceptBlock>

          <ConceptBlock title="PLC fault diagnosis approach">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Check the PLC status:</strong> is the PLC in RUN mode? Check the
                RUN/STOP/ERROR LEDs. A PLC in STOP or ERROR mode will not execute the programme.
              </li>
              <li>
                <strong>Check the I/O LEDs:</strong> compare the physical LED states on the I/O
                modules with the expected states. An input that should be ON but is OFF points to a
                field device or wiring fault.
              </li>
              <li>
                <strong>Check the power supply:</strong> verify the PLC power supply voltage and the
                field device power supply voltage (often 24 V DC). A drooping power supply can cause
                erratic I/O behaviour.
              </li>
              <li>
                <strong>Check communication:</strong> if the PLC communicates with HMIs, other PLCs,
                or remote I/O, check communication status LEDs and network connections.
              </li>
              <li>
                <strong>Isolate the fault domain:</strong> is the fault in the input
                (sensor/switch), the PLC processing, or the output (actuator/contactor)? The I/O LED
                status tells you immediately.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common field device faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Proximity sensors:</strong> misalignment, contamination (metal swarf, oil),
                cable damage, sensing distance drift.
              </li>
              <li>
                <strong>Photoelectric sensors:</strong> dirty lenses, misalignment, ambient light
                interference, reflector damage.
              </li>
              <li>
                <strong>Limit switches:</strong> mechanical wear, actuator damage, contact failure,
                misadjustment.
              </li>
              <li>
                <strong>Solenoid valves:</strong> coil failure, mechanical jamming, contamination,
                air supply loss.
              </li>
              <li>
                <strong>Pressure/temperature sensors:</strong> drift, calibration loss, sensing
                element failure, wiring faults.
              </li>
            </ul>
            <p>
              <strong>Practical tip:</strong> when a PLC output is commanded ON by the programme but
              the physical output LED is OFF, the output module or its fuse may have failed. When
              the output LED is ON but the connected device does not operate, the fault is in the
              output wiring or the device itself. This simple distinction immediately halves your
              diagnostic search area.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Timer, counter and sequential control faults</ContentEyebrow>

          <ConceptBlock title="Timer, counter and sequential control faults">
            <p>
              Timers and counters are fundamental to automated process control. They control
              sequence timing, delay periods, cycle counts and watchdog functions. When they
              malfunction, the entire process sequence can stall, run too fast, run too slow, or
              behave unpredictably. Diagnosing timer and counter faults requires understanding the
              different types (on-delay, off-delay, pulse, retentive) and how they are triggered and
              reset.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Timer fault diagnosis">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Timer does not start:</strong> check the enable/trigger signal is present.
                Check the timer has power. Check the timer type is correct (on-delay needs a rising
                edge; off-delay needs a falling edge).
              </li>
              <li>
                <strong>Timer runs but wrong duration:</strong> check the time base setting (seconds
                vs minutes vs hours — a common error). Check the preset value. Check for a noisy or
                bouncing trigger signal that may be resetting the timer.
              </li>
              <li>
                <strong>Timer output does not activate:</strong> check the output contacts for
                failure. In PLC timers, check the addressing of the timer done bit.
              </li>
              <li>
                <strong>Timer runs continuously:</strong> check the reset signal. A timer that never
                receives its reset will continue running or remain latched.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Sequential control faults">
            <p>
              Sequential control faults — where a process stalls at a particular step — are
              diagnosed by identifying what condition is required to advance to the next step and
              then verifying that condition. In a PLC system, this means examining the transition
              conditions for the current step. In a relay-based sequencer, it means tracing the
              interlock chain for the next stage. Function testing, as described in Section 4.3.2,
              is the ideal diagnostic method for sequential faults.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Common sequencing error"
            whatHappens={
              <>
                A frequent cause of sequential control faults is sensor misadjustment after
                maintenance. If a limit switch that confirms a cylinder has fully extended is
                knocked out of position, the control system never receives the &quot;extended&quot;
                confirmation and the sequence stalls waiting for it.
              </>
            }
            doInstead={
              <>
                Always check sensor positions and adjustments after any mechanical maintenance work
                on automated equipment.
              </>
            }
          />

          <ConceptBlock title="Diagnostic focus">
            <p>
              <strong>Key point:</strong> when a sequence stalls, identify the current step and the
              condition required to advance. Then verify that condition. This focused approach is
              far more efficient than testing random components.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Safety circuit faults and interlock diagnostics</ContentEyebrow>

          <ConceptBlock title="Safety circuit faults and interlock diagnostics">
            <p>
              Safety circuits — including emergency stop circuits, guard interlocks, safety light
              curtains and safety PLCs — are the most critical control circuits in any installation.
              They are designed to achieve a safe state (typically stopping the machine) whenever a
              hazardous condition is detected or an operator intervention is required. Faults in
              safety circuits must be treated with the highest priority and diagnosed with
              particular care.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safety circuit design principles">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fail-safe:</strong> any fault in the safety circuit must result in the
                system achieving a safe state. NC contacts in series, de-energise to trip.
              </li>
              <li>
                <strong>Redundancy:</strong> dual-channel safety circuits (Category 3 and 4 of BS EN
                ISO 13849) use two independent paths that cross-monitor each other.
              </li>
              <li>
                <strong>Force-guided contacts:</strong> safety relays use mechanically linked
                contacts that prevent simultaneous closure of NO and NC contacts.
              </li>
              <li>
                <strong>Monitoring:</strong> safety controllers continuously monitor for
                discrepancies between redundant channels — a discrepancy triggers a fault state.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Never bypass safety circuits"
            whatHappens={
              <>
                Under no circumstances should safety interlocks, emergency stops or guard switches
                be bypassed, defeated or jumpered out — even temporarily for diagnostic purposes.
                This is a criminal offence under the Health and Safety at Work Act 1974 and the
                Provision and Use of Work Equipment Regulations 1998 (PUWER).
              </>
            }
            doInstead={
              <>
                If a safety device needs to be defeated for testing, a formal safety procedure must
                be followed with specific risk controls in place.
              </>
            }
          />

          <ConceptBlock title="Diagnosing safety circuit faults">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety relay diagnostics:</strong> most safety relays have LED indicators
                showing the status of each input channel and the output contacts. Use these to
                identify which channel has the fault.
              </li>
              <li>
                <strong>Emergency stop chain:</strong> use the half-split technique to locate an
                open e-stop in a series chain. Check each e-stop for correct latching and NC contact
                operation.
              </li>
              <li>
                <strong>Guard switches:</strong> check mechanical operation, wiring, and that the
                actuator correctly engages the switch when the guard is closed.
              </li>
              <li>
                <strong>Safety light curtains:</strong> check alignment LEDs, clean lenses, verify
                mounting security, and check for environmental interference.
              </li>
            </ul>
            <p>
              <strong>ST1426 link:</strong> safety circuit understanding is a mandatory competence
              for maintenance technicians. You must be able to demonstrate knowledge of safety
              circuit principles, identify safety devices and their functions, and carry out fault
              diagnosis on safety circuits while maintaining the integrity of the safety function
              throughout.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Control circuit diagnostic workflow</ContentEyebrow>

          <ConceptBlock title="Control circuit diagnostic workflow">
            <p>
              Applying the six-point technique to control circuit faults, here is a practical
              workflow that covers the key diagnostic steps for any control circuit problem.
            </p>
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Understand the circuit.</strong> Obtain and study the circuit
                diagram before starting. Understand the normal sequence of operation, the function
                of each component, and the expected signal flow. If no diagram is available, sketch
                one as you investigate.
              </li>
              <li>
                <strong>Step 2 — Identify the symptom.</strong> Define exactly what is wrong:
                &quot;The motor does not start when the start button is pressed&quot; is much more
                useful than &quot;it doesn&apos;t work&quot;. Check all relevant indicators — pilot
                lights, PLC LEDs, alarm displays, trip indicators.
              </li>
              <li>
                <strong>Step 3 — Check the control supply.</strong> Verify that the control voltage
                is present and at the correct level. A missing or low control supply will cause all
                control functions to fail. Check the control transformer, control fuses and any
                control circuit isolators.
              </li>
              <li>
                <strong>Step 4 — Trace the signal.</strong> Using the circuit diagram, trace the
                signal flow from the supply through each device in the control circuit. Use voltage
                measurement to identify where the signal is lost. The point where you have supply
                voltage on one side but not the other is where the fault lies.
              </li>
              <li>
                <strong>Step 5 — Verify and repair.</strong> Once the faulty component is
                identified, confirm the diagnosis with a specific test (e.g., continuity test on the
                contact, resistance test on the coil). Carry out the repair, addressing the root
                cause. Test the complete circuit function before returning to service.
              </li>
            </ol>
            <p className="italic">
              <strong>Note:</strong> control circuit faults are among the most satisfying to
              diagnose because they respond well to logical, systematic analysis. The circuit
              diagram is your map, the multimeter is your compass, and the six-point technique is
              your navigation method. With practice, you will develop the ability to diagnose most
              control circuit faults quickly and confidently.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Voltage across a closed contact = 0 V (healthy).',
              'Voltage across an open contact = supply voltage (fault).',
              'Voltage across an energised coil = supply voltage (healthy).',
              'No voltage anywhere = control supply fault.',
              'Always use GS38-compliant test equipment.',
              'BS EN ISO 13849 — safety of machinery control systems.',
              'BS EN 62061 — functional safety of control systems.',
              'BS EN 60204-1 — safety of machinery electrical equipment.',
              'PUWER 1998 — work equipment safety regulations.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Motor and Drive Faults
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section3-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Intermittent Faults and Environmental Factors
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section3_5;
