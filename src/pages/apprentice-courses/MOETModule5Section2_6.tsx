/**
 * MOET · Module 5 · Section 2 · Subsection 6 — Troubleshooting PLC Systems
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course did not enumerate a
 * Module 5 KSB list, so the statements below are reused verbatim from the
 * Module 1/3/4 lists it did supply, matched by topic.
 *   Knowledge  · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *              · "Documentation requirements: documentation control,
 *                 auditable records."
 *   Skills     · "Electrical. Use electrical diagnostic equipment and apply
 *                 fault finding and rectification techniques."
 *              · "Record information."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. This is the
 * last subsection of Section 5.2, so the "next" action returns to the
 * section overview, matching the original page's own navigation.
 *
 * No GS38, thermography ΔT, test-interval or C&G-qualification claims appear
 * on this page.
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
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Troubleshooting PLC Systems - MOET Module 5 Section 2.6';
const DESCRIPTION =
  'Comprehensive guide to PLC troubleshooting for electrical maintenance technicians. Systematic fault-finding, diagnostic tools, hardware and communication faults, preventive maintenance and documentation. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'plc-systematic',
    question: 'What is the first step in systematic PLC troubleshooting?',
    options: [
      'Replace the CPU module to rule out a hardware failure',
      'Gather information: observe symptoms, check fault LEDs, read the diagnostic buffer',
      'Download a fresh copy of the programme to the controller',
      'Force the suspected output on to confirm the field device works',
    ],
    correctIndex: 1,
    explanation:
      'Always start by gathering information. Check status LEDs on the PLC and I/O modules, read the diagnostic buffer for error codes, observe the machine behaviour, and ask the operator what happened and when. This narrows down the fault area before any physical intervention.',
  },
  {
    id: 'plc-comm-fault',
    question: 'A PLC communication fault is typically indicated by:',
    options: [
      'The COMM LED going off or flashing an error pattern, with loss of HMI and SCADA connectivity',
      'The RUN LED illuminating steady green with all outputs energised',
      'The backup battery LED indicating a low charge condition',
      'A single output channel failing while the rest operate normally',
    ],
    correctIndex: 0,
    explanation:
      'Communication faults are indicated by COMM/NET LED errors and loss of connectivity to HMIs, SCADA, or remote I/O stations. Check cable connections, network switches, IP address settings, and communication parameters.',
  },
  {
    id: 'plc-battery',
    question: 'A low battery warning on a PLC typically means:',
    options: [
      'The mains power supply to the PLC has fallen below specification',
      'The output modules are drawing more current than their rating allows',
      'The backup battery that maintains RAM contents during power loss needs replacing promptly',
      'The CPU is overheating and has reduced its clock speed to compensate',
    ],
    correctIndex: 2,
    explanation:
      'Many PLCs use a lithium battery to maintain RAM data (retentive timers, counters, data registers, and sometimes the programme) during power loss. When the battery is low, this data may be lost on the next power cycle. Replace the battery promptly — some PLCs allow hot-swap if done within a few seconds.',
  },
  {
    id: 'plc-output-led',
    question:
      'A PLC output LED is ON but the field device connected to that output is not operating. The fault is most likely:',
    options: [
      'In the field wiring, the output fuse, or the field device itself — downstream of the PLC output',
      'In the input module reading the wrong signal from the field sensor',
      'In the programme logic failing to energise the output coil',
      'In the communication link between the CPU and the HMI display',
    ],
    correctIndex: 0,
    explanation:
      'If the output LED is ON, the PLC is driving the output correctly. The fault is downstream: check the output module fuse (if fitted), the wiring between the PLC and the field device, terminal connections, and the field device itself (contactor coil, solenoid valve, indicator lamp).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The PLC diagnostic buffer contains:',
    options: [
      'The live values of every input and output channel',
      'A chronological log of faults, errors and system events with timestamps',
      'The full ladder logic programme currently being executed',
      'The IP address and network settings of connected devices',
    ],
    correctAnswer: 1,
    explanation:
      'The diagnostic buffer records timestamped fault events, error codes, and system changes. Reading it reveals what happened and when — this is essential for diagnosing intermittent faults and understanding the sequence of events leading to a failure.',
  },
  {
    id: 2,
    question: 'A PLC scan time that has suddenly increased may indicate:',
    options: [
      'A low backup battery affecting the retentive data registers',
      'A blown output fuse on one of the digital output modules',
      'A programme fault causing excessive processing, a communication timeout, or added programme complexity',
      'A loose terminal connection on an input channel',
    ],
    correctAnswer: 2,
    explanation:
      'Scan time increases when the PLC has more to process — often due to programme errors (infinite loops, excessive data manipulation), communication timeouts waiting for unresponsive devices, or newly added programme sections. Excessive scan time can cause missed fast inputs and, in extreme cases, a watchdog timeout fault.',
  },
  {
    id: 3,
    question: 'To check if a PLC is executing its programme logic correctly, the primary tool is:',
    options: [
      'A multimeter reading the supply voltage at the power module',
      'An insulation resistance tester on the field wiring',
      'The diagnostic buffer fault history from the previous shift',
      'Online monitoring in the PLC programming software to view programme execution in real time',
    ],
    correctAnswer: 3,
    explanation:
      'Online monitoring shows the live state of the programme — which contacts are active, which coils are energised, timer/counter values, and data register contents. This is the primary tool for logic-level fault diagnosis, revealing exactly where the programme logic departs from expected behaviour.',
  },
  {
    id: 4,
    question: 'A watchdog timer in a PLC:',
    options: [
      'Monitors the scan cycle duration and triggers a fault if it exceeds a configured limit',
      'Counts the number of times each output has been switched on',
      'Maintains the real-time clock used for diagnostic timestamps',
      'Delays programme start-up until all I/O modules have initialised',
    ],
    correctAnswer: 0,
    explanation:
      'The watchdog timer monitors each scan cycle. If the scan takes longer than the configured watchdog limit (indicating a programme fault, infinite loop, or CPU issue), the PLC enters a fault state and typically de-energises all outputs for safety. The watchdog timeout value is set in the hardware configuration.',
  },
  {
    id: 5,
    question: 'When replacing a PLC CPU module, the critical steps include:',
    options: [
      'Forcing all outputs off, then swapping the module while the rack is powered',
      'Backing up the programme, noting the hardware configuration, replacing the module, restoring the programme, and verifying operation',
      'Replacing the module and relying on the new CPU to upload the programme from the HMI',
      'Clearing the diagnostic buffer first, then fitting the new module without isolation',
    ],
    correctAnswer: 1,
    explanation:
      'Before replacement: back up the current programme (if possible — the existing CPU may still allow upload). After replacement: restore the programme, verify the hardware configuration matches, check the diagnostic buffer for new errors, and test all I/O systematically before returning the machine to service.',
  },
  {
    id: 6,
    question: 'Electromagnetic interference (EMI) can cause PLC faults such as:',
    options: [
      'Mechanical wear on output relay contacts',
      'Output fuse failures due to overcurrent',
      'Spurious input signals, communication errors, and data corruption',
      'Low battery warnings on the CPU module',
    ],
    correctAnswer: 2,
    explanation:
      'EMI from variable frequency drives, welding equipment, and high-voltage switchgear can induce false signals on input wiring, corrupt serial communications, and cause intermittent data errors. Shielded cables, proper earthing, physical separation from power cables, and correctly installed EMC filters are the primary defences.',
  },
  {
    id: 7,
    question: 'A PLC in STOP mode:',
    options: [
      'Continues to execute the programme but ignores all input changes',
      'Loses the stored programme from memory until it is downloaded again',
      'Holds all outputs in their last energised state indefinitely',
      'Has halted programme execution — outputs are typically de-energised or held in a configured safe state',
    ],
    correctAnswer: 3,
    explanation:
      'In STOP mode, the PLC halts programme execution. Outputs go to their configured default state (usually all OFF, but this is configurable). The PLC still communicates with the programming software, allowing programme upload, download, and hardware diagnostics.',
  },
  {
    id: 8,
    question: 'Preventive maintenance for a PLC system should include:',
    options: [
      'Checking terminal connections, cleaning ventilation filters, monitoring temperature, verifying backups and testing the battery',
      'Forcing each output in turn to confirm the field devices respond',
      'Downloading a fresh copy of the programme at every visit',
      'Leaving all forces active so the system can be tested quickly later',
    ],
    correctAnswer: 0,
    explanation:
      'PLCs are highly reliable but benefit from periodic preventive maintenance: check terminal connections for tightness (especially on I/O modules), clean enclosure ventilation filters, monitor operating temperature against specifications, verify programme backups are current, and check the backup battery status.',
  },
  {
    id: 9,
    question: 'A bus fault on a PLC rack indicates:',
    options: [
      'A problem with the transport bus serving the factory',
      'A communication failure between modules on the PLC backplane bus',
      'An input signal exceeding the maximum voltage rating',
      'A syntax error in the programme that prevents compilation',
    ],
    correctAnswer: 1,
    explanation:
      'A bus fault indicates the internal communication between the CPU and I/O modules on the backplane has failed. Common causes include a faulty module, a module not fully seated in its slot, a damaged backplane connector, or an incompatible module type. Reseat modules firmly and check for physical damage.',
  },
  {
    id: 10,
    question:
      'When a PLC programme is running but an output is not activating as expected, the logical diagnostic sequence is:',
    options: [
      'Check the field device first, then the wiring, then the programme logic, then the output LED',
      'Replace the output module first, then check the wiring and field device',
      'Check the programme logic online first, then check the output LED, then check field wiring and the field device',
      'Check the input signal first, then the CPU, then the communication network',
    ],
    correctAnswer: 2,
    explanation:
      'Start with the programme: is the output coil energised in the logic? If yes, check the module output LED. If the LED is ON, check downstream: output fuse, wiring, connections, field device. This inside-out approach systematically eliminates each possible fault location without wasting time.',
  },
  {
    id: 11,
    question: 'Intermittent PLC faults are best diagnosed by:',
    options: [
      'Immediately replacing the CPU and I/O modules one at a time',
      'Downloading a new copy of the programme to clear any corruption',
      'Leaving the fault until it becomes permanent and easier to find',
      'Using the diagnostic buffer timestamps, data logging, trend recording, and systematic environmental checks',
    ],
    correctAnswer: 3,
    explanation:
      'Intermittent faults require systematic investigation: review diagnostic buffer timestamps for patterns, set up data logging or trending to capture the fault condition, check for thermal issues (does the fault occur when equipment is hot?), look for EMI correlations (does it happen when specific equipment operates?), and perform wiggle tests on connections with appropriate caution.',
  },
  {
    id: 12,
    question: 'Under ST1426, PLC troubleshooting competency includes:',
    options: [
      'Systematic fault diagnosis, correct use of diagnostic tools, safe isolation, documentation and contribution to continuous improvement',
      'Writing the original control programme from the machine specification',
      'Designing the electrical panel layout and selecting the I/O modules',
      'Commissioning the network infrastructure and configuring the SCADA server',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires a comprehensive approach: systematic diagnosis following a structured methodology, correct use of programming software and test equipment, safe working practices including isolation and permits, accurate documentation of findings and corrective actions, and contribution to continuous improvement of maintenance processes.',
  },
];

const faqs = [
  {
    question: 'What are the most common PLC faults encountered in maintenance?',
    answer:
      'The most common faults are in the field, not the PLC itself: loose terminal connections, broken wires, failed field devices (sensors, contactors, solenoid valves), and power supply issues. Communication cable faults (damaged Ethernet cables, loose connectors) are also frequent. Environmental problems (excessive heat, moisture ingress, dust accumulation) cause gradual degradation. Actual PLC hardware failure (CPU module, I/O module) is relatively rare compared to field wiring issues.',
  },
  {
    question: 'How do I diagnose an intermittent PLC fault that cannot be reproduced on demand?',
    answer:
      "Use the diagnostic buffer to check for timestamps and patterns of fault events. Set up a data log or trend to capture process variables when the fault occurs. Check for loose connections by carefully inspecting terminals (a 'wiggle test' with appropriate caution and risk assessment). Investigate thermal issues — does the fault correlate with ambient temperature or equipment warm-up? Check for EMI sources — does the fault occur when specific equipment (VFDs, welders) is operating? Systematic elimination is key.",
  },
  {
    question: 'Should I keep spare PLC modules on site?',
    answer:
      'Yes, for critical plant. Recommended spares include: CPU module (with current programme backup stored alongside it), power supply module, and at least one of each I/O module type used in the installation. Label spares clearly, ensure they are configured to match the installed modules (firmware version, hardware revision), and store the current programme backup with the spare CPU. Having the right spare on the shelf dramatically reduces mean time to repair.',
  },
  {
    question: 'What causes a PLC to go into fault mode and how do I recover?',
    answer:
      'Common causes include: watchdog timeout (scan time exceeded the limit), hardware fault (module failure, backplane error), configuration mismatch (module type does not match the hardware configuration), memory error (programme corruption, data overflow), and in some PLCs, runtime errors such as division by zero or array out-of-bounds. Recovery: read the diagnostic buffer for the specific fault code, address the root cause, clear the fault, and transition from STOP to RUN. Some faults require a power cycle after correction.',
  },
  {
    question: 'How important is documentation when completing a PLC fault repair?',
    answer:
      'Documentation is essential and is a requirement under ST1426. Record: the fault symptoms as reported, the diagnostic steps you followed, the root cause identified, the corrective action taken, any parts replaced, the date and time, and your name. This information feeds into the maintenance history, supports future fault diagnosis of similar issues, identifies recurring problems that need engineering attention, and provides evidence of competent maintenance practice.',
  },
];

const MOETModule5Section2_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.2 · Subsection 6"
        title="Troubleshooting PLC Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Diagnostic tools, systematic fault-finding and PLC system maintenance techniques — how
            to find the real fault instead of guessing at hardware.
          </p>

          <TLDR
            points={[
              'Systematic: Observe, gather info, analyse, test, fix, verify.',
              'LEDs: RUN, STOP, FAULT, COMM — first diagnostic indicator.',
              'Diagnostic buffer: Timestamped fault history log.',
              'Online monitoring: Real-time programme state verification.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply a systematic six-step fault-finding methodology to PLC systems',
              'Read and interpret PLC status LEDs and diagnostic buffer error codes',
              'Use online monitoring for programme-level fault diagnosis',
              'Identify common hardware, software and communication fault types',
              'Perform preventive maintenance on PLC installations and enclosures',
              'Document faults and corrective actions accurately per ST1426 requirements',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Field faults:</strong> Wiring and device issues are the most common cause.
              </li>
              <li>
                <strong>Spares:</strong> Keep critical CPU, PSU and I/O modules on site.
              </li>
              <li>
                <strong>PM:</strong> Connections, cooling, battery status, backup verification.
              </li>
              <li>
                <strong>ST1426:</strong> Systematic diagnosis and documentation competency.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Systematic troubleshooting approach</ContentEyebrow>

          <ConceptBlock title="A structured process beats guessing every time">
            <p>
              Effective PLC troubleshooting follows a systematic process that avoids the common trap
              of rushing to replace hardware without proper diagnosis. A structured approach
              identifies the root cause efficiently, reduces mean time to repair, and avoids the
              costly mistake of replacing good components. The six-step methodology applies to every
              PLC fault, from a simple blown output fuse to a complex intermittent communication
              error.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The six-step diagnostic process">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Observe:</strong> Note the symptoms. Check all status LEDs on the PLC,
                I/O modules, power supply, and communication modules. Talk to the machine operator —
                what happened, when did it start, has anything changed recently?
              </li>
              <li>
                <strong>2. Gather information:</strong> Read the diagnostic buffer for timestamped
                error codes. Check HMI alarm history. Review recent maintenance records. Note any
                recent programme changes, hardware replacements, or production changes.
              </li>
              <li>
                <strong>3. Analyse:</strong> Categorise the fault — is it hardware (module failure,
                wiring), software (programme logic, data), communication (network, fieldbus), or
                environmental (heat, EMI, moisture)? Narrow down to the specific subsystem.
              </li>
              <li>
                <strong>4. Test:</strong> Use online monitoring to check programme logic. Use a
                multimeter to verify voltages, continuity, and insulation. Use substitution testing
                (swap with a known-good spare) where appropriate.
              </li>
              <li>
                <strong>5. Fix:</strong> Address the root cause — replace the faulty component,
                repair the wiring, correct the programme, or resolve the environmental issue. Do not
                just treat the symptom.
              </li>
              <li>
                <strong>6. Verify and document:</strong> Test the repair thoroughly. Clear any fault
                codes. Monitor for recurrence. Document the fault, diagnosis, and corrective action
                in the maintenance log.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> Resist the temptation to skip straight to step 5
              (fix). The most experienced maintenance technicians spend the majority of their time
              on steps 1-3 (observation and analysis). Thorough diagnosis before intervention saves
              time, avoids replacing good components, and identifies root causes that prevent
              recurrence.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Hardware and communication faults</ContentEyebrow>

          <ConceptBlock title="Two categories, each with distinctive symptoms">
            <p>
              Hardware faults encompass power supply failure, I/O module damage, backplane bus
              errors, and battery depletion. Communication faults affect the links between the PLC
              and HMIs, SCADA systems, remote I/O racks, and other networked devices. Both
              categories have distinctive symptoms that help narrow down the fault location quickly.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Hardware fault indicators">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Power supply failure — no LEDs lit, check mains supply and fuses.</li>
              <li>I/O module failure — module fault LED, specific channel not responding.</li>
              <li>Backplane bus fault — CPU fault LED, modules not communicating.</li>
              <li>Low battery warning — BAT LED, risk of data loss on power cycle.</li>
              <li>
                Overheating — erratic behaviour, check enclosure ventilation and ambient
                temperature.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Communication fault indicators">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Damaged or loose Ethernet or serial cables — COMM LED error pattern.</li>
              <li>Incorrect IP address or subnet configuration — cannot connect online.</li>
              <li>Network switch failure — multiple devices lose connectivity simultaneously.</li>
              <li>EMI on communication cables — intermittent data errors and timeouts.</li>
              <li>Protocol mismatch — device added with wrong communication settings.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Status LED interpretation">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">LED</th>
                    <th className="py-2 pr-4 font-medium text-white">Colour</th>
                    <th className="py-2 font-medium text-white">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">RUN</td>
                    <td className="py-2 pr-4">Green (solid)</td>
                    <td className="py-2">Programme executing normally</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">STOP</td>
                    <td className="py-2 pr-4">Amber/Yellow</td>
                    <td className="py-2">Programme halted — outputs in default state</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">FAULT/ERROR</td>
                    <td className="py-2 pr-4">Red</td>
                    <td className="py-2">Hardware or software error — read diagnostic buffer</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">COMM</td>
                    <td className="py-2 pr-4">Green (flashing)</td>
                    <td className="py-2">Network communication active</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">BAT</td>
                    <td className="py-2 pr-4">Red/Amber</td>
                    <td className="py-2">Backup battery low — replace promptly</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">FORCE</td>
                    <td className="py-2 pr-4">Amber</td>
                    <td className="py-2">I/O forces active — investigate immediately</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Programme-level diagnosis</ContentEyebrow>

          <ConceptBlock title="When the hardware checks out, look at the logic">
            <p>
              When hardware is confirmed working correctly (LEDs normal, modules responding,
              communications active), the fault may lie in the programme logic. Online monitoring
              reveals exactly where the logic fails to produce the expected output, allowing you to
              pinpoint whether the issue is a programme error, incorrect data, or a field device not
              providing the expected input signal.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Programme diagnosis techniques">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Online logic view:</strong> Trace power flow through ladder rungs — find the
                blocking contact that prevents the output from energising.
              </li>
              <li>
                <strong>Watch tables:</strong> Monitor specific timer/counter values, analogue
                readings, and data registers in a focused list.
              </li>
              <li>
                <strong>Cross-reference:</strong> Find every location where a specific address is
                used — trace the logic chain across programme sections.
              </li>
              <li>
                <strong>Force I/O:</strong> Temporarily override an input or output for diagnostic
                testing — use with extreme caution and risk assessment.
              </li>
              <li>
                <strong>Scan time monitoring:</strong> Check for abnormal increases that could
                indicate programme faults or communication bottlenecks.
              </li>
              <li>
                <strong>Programme comparison:</strong> Compare the running programme against the
                backup to detect unauthorised or undocumented changes.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Forcing an I/O point and forgetting it"
            whatHappens={
              <>
                Forcing an I/O point bypasses ALL programme logic including safety interlocks. A
                forced output will remain in its forced state regardless of what the programme logic
                dictates. A forgotten force has been the root cause of fatal industrial accidents.
              </>
            }
            doInstead={
              <>
                Use forces only as a last resort for diagnostic purposes, with a proper risk
                assessment, with the machine in a safe state, and ALWAYS remove forces immediately
                after diagnosis. Check the force table before disconnecting from every PLC session.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Preventive maintenance</ContentEyebrow>

          <ConceptBlock title="Solid-state, but not immune to its environment">
            <p>
              PLCs are highly reliable solid-state devices, but they operate in industrial
              environments that subject them to heat, dust, vibration, and electrical noise. A
              structured preventive maintenance programme extends PLC system life, reduces
              unexpected failures, and ensures that backup and recovery systems are ready when
              needed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="PLC preventive maintenance checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Terminal connections:</strong> Check tightness on all I/O terminals, power
                supply terminals, and communication connectors (annually or per site schedule).
              </li>
              <li>
                <strong>Enclosure cooling:</strong> Clean ventilation filters, verify fan operation,
                check enclosure door seals for damage.
              </li>
              <li>
                <strong>Temperature:</strong> Verify the enclosure internal temperature is within
                the PLC operating specification (typically 0-55 degrees C).
              </li>
              <li>
                <strong>Battery:</strong> Check battery status LED and replace when indicated — note
                the battery type and keep spares.
              </li>
              <li>
                <strong>Programme backup:</strong> Verify the stored backup matches the running
                programme by performing an online comparison.
              </li>
              <li>
                <strong>Diagnostic log:</strong> Review the diagnostic buffer for recurring warnings
                that may indicate developing faults.
              </li>
              <li>
                <strong>Force table:</strong> Check that no forces are inadvertently left active
                from previous maintenance sessions.
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> During planned shutdowns, take the opportunity to
              perform a thorough PLC system check including uploading the programme for comparison
              with the backup, checking all module seating, verifying power supply output voltages,
              and inspecting cables for damage. These checks take minimal time but can prevent
              costly unplanned breakdowns.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Documentation and continuous improvement</ContentEyebrow>

          <ConceptBlock title="A requirement under ST1426, not just good practice">
            <p>
              Thorough documentation of every PLC fault and repair is not just good practice — it is
              a requirement under ST1426 and a cornerstone of effective maintenance management. Good
              documentation transforms individual fault experiences into organisational knowledge,
              reducing future diagnosis times and identifying systemic issues that need engineering
              attention.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What to document">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault description:</strong> What were the symptoms? What was the machine
                doing (or not doing)?
              </li>
              <li>
                <strong>Diagnostic steps:</strong> What did you check? What tools did you use? What
                did each check reveal?
              </li>
              <li>
                <strong>Root cause:</strong> What was the actual cause of the fault? (Not just the
                symptom.)
              </li>
              <li>
                <strong>Corrective action:</strong> What did you do to fix it? Any parts replaced
                (include part numbers)?
              </li>
              <li>
                <strong>Verification:</strong> How did you confirm the repair was successful?
              </li>
              <li>
                <strong>Recommendations:</strong> Any follow-up actions needed? Design improvements?
                Spare parts to order?
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Continuous improvement">
            <p>Maintenance data analysis reveals patterns that drive improvement:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Repeat failures:</strong> If the same fault recurs, the root cause has not
                been properly addressed — escalate for engineering review.
              </li>
              <li>
                <strong>Common failure modes:</strong> Identify I/O modules, sensors, or devices
                that fail frequently and investigate design improvements.
              </li>
              <li>
                <strong>Environmental factors:</strong> Correlate faults with temperature, humidity,
                or specific production activities.
              </li>
              <li>
                <strong>PM effectiveness:</strong> Review whether preventive maintenance tasks are
                catching issues before they cause breakdowns.
              </li>
            </ul>
            <p className="italic">
              Under ST1426, maintenance technicians are expected to demonstrate systematic fault
              diagnosis, correct use of diagnostic tools, safe working practices, accurate
              documentation of findings and actions, and contribution to continuous improvement of
              maintenance processes. These competencies are assessed both in the workplace and
              through the end-point assessment.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A conveyor that stops once a shift and restarts on its own"

            situation={
              <>
                <p>
                  A packing line conveyor trips out roughly once a shift. The operator presses reset
                  and it runs again, sometimes for hours. No fault is latched on the HMI and the PLC
                  is not in STOP.
                </p>

                <p>
                  It has been looked at twice. Both times nothing was found, because by the time
                  anyone arrived it was running.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Stop trying to catch it live and make the PLC catch it for you. If the program has
                  a first-out or fault-capture routine, read it. If it does not, the diagnostic
                  buffer and the I/O status word still hold the state at the last stop.
                </p>

                <p>
                  Look for an input that drops for one scan. A safety gate switch with a worn
                  actuator, a proximity sensor on the edge of its range, or a loose field terminal
                  will open for a few milliseconds — long enough for the PLC to see it, too short
                  for anyone to observe.
                </p>

                <p>
                  Check whether the stop correlates with anything physical: the line running full, a
                  specific product changeover, a nearby VFD starting. Intermittent faults nearly
                  always correlate with something, and the correlation is the diagnosis.
                </p>

                <p>
                  If the input is confirmed as dropping, do not simply extend a debounce timer in
                  software. That hides the fault and leaves a safety circuit responding late.
                </p>
              </>
            }

            whyItMatters={
              <p>
                An intermittent fault that resets itself is the one most likely to be closed as "no
                fault found", and the one most likely to come back. The PLC sees every scan and you
                do not — using its own diagnostics instead of standing at the machine is the
                difference between a two-week recurring callout and a bearing-loose-terminal found
                in twenty minutes. Recording what you found, including the scan-level evidence, is
                also what stops the next technician starting from nothing.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Follow the six steps in order: observe, gather information, analyse, test, fix, verify and document — most experienced technicians spend most of their time on the first three.',
              'Status LEDs (RUN, STOP, FAULT/ERROR, COMM, BAT, FORCE) are the first diagnostic indicator; the diagnostic buffer is the timestamped history that shows what happened and when.',
              'If a hardware fault is ruled out (LEDs normal, modules responding, comms active), the fault is most likely in the programme logic — online monitoring is the primary tool for finding it.',
              'A forced I/O point bypasses all programme logic, including safety interlocks, and stays forced regardless of the logic — use forces only as a last resort, with a risk assessment, and always check the force table before disconnecting.',
              'An output LED that is ON but whose field device is not operating points downstream of the PLC — the output fuse, wiring, connections or the field device itself.',
              'A rising scan time can signal a programme fault, a communication timeout or added complexity, and in extreme cases trips the watchdog timer into a fault state.',
              'Preventive maintenance covers terminal tightness, enclosure cooling, temperature, battery status, backup verification, the diagnostic log and the force table.',
              'Documentation must cover fault description, diagnostic steps, root cause, corrective action, verification and recommendations — this is an ST1426 requirement, not optional paperwork.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  PLC Programming Software
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Back to overview <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Section 5.2 overview
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section2_6;
