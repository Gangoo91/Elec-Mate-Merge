/**
 * MOET · Module 5 · Section 3 · Subsection 2 — Guarding and Interlocking Devices
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. This page is safety-focused (guarding and interlocking), so the
 * statements below are taken verbatim from the brief's Module 1 health-and-
 * safety list rather than the electrical-theory lists used elsewhere in
 * Module 5.
 *   Knowledge  · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Identify environmental and health and safety  hazards and
 *                 risks and apply control measures."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * Accuracy note: BS EN ISO 14119, BS EN ISO 14120, BS EN ISO 13855, ISO 12100,
 * the Machinery Directive 2006/42/EC and PUWER 1998 citations are standard,
 * uncontested machinery-safety references and are kept exactly as written.
 * No GS38, thermography, test-interval or C&G-qualification claims appear on
 * this page.
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

const TITLE = 'Guarding and Interlocking Devices - MOET Module 5 Section 3.2';
const DESCRIPTION =
  'Machine guarding principles, interlocking methods, trapped-key systems and safety distance calculation for maintenance technicians. BS EN ISO 14119, BS EN ISO 14120, BS EN ISO 13855 compliance. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'interlock-purpose',
    question: 'What is the primary purpose of an interlocking guard?',
    options: [
      'Speed up production by allowing the machine to run with the guard open',
      'Prevent access to hazards while the machine is running',
      'Provide overcurrent protection for the machine control circuit',
      'Improve operator visibility of the moving parts during operation',
    ],
    correctIndex: 1,
    explanation:
      'Interlocking guards ensure the machine cannot operate when the guard is open, preventing personnel access to dangerous parts during operation. When the guard is opened, the interlock signals the control system to stop the machine.',
  },
  {
    id: 'iso14119',
    question: 'Which standard covers interlocking devices associated with guards?',
    options: ['BS EN ISO 14119', 'BS EN 60204-1', 'BS 7671', 'IEC 61131-3'],
    correctIndex: 0,
    explanation:
      'BS EN ISO 14119 specifies principles for the design and selection of interlocking devices associated with guards. It covers device types, coding levels, fault resistance and defeat prevention.',
  },
  {
    id: 'trapped-key',
    question: 'What does a trapped-key interlock system ensure?',
    options: [
      'The operator has the correct training certificate',
      'The key cannot be removed until the machine is safe',
      'The machine runs at reduced speed',
      'Power is supplied from two independent sources',
    ],
    correctIndex: 1,
    explanation:
      'Trapped-key systems physically prevent key removal until the machine has reached a safe state (e.g., isolated and stopped). This enforces a strict sequence of operations that cannot be bypassed without breaking the lock.',
  },
  {
    id: 'guard-locking',
    question: 'What is guard locking used for?',
    options: [
      'Holding the guard open automatically when the machine is switched off',
      'Allowing only trained operators to unlock the guard with a personal code',
      'Preventing the guard from being opened until hazardous conditions have ceased',
      'Locking the machine isolator in the OFF position during maintenance',
    ],
    correctIndex: 2,
    explanation:
      'Guard locking keeps the guard closed and locked until run-down hazards (e.g., rotating parts slowing to a stop, hot surfaces cooling) have ceased. It prevents premature access to residual hazards.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to the hierarchy of safeguarding measures, what is the first priority?',
    options: [
      'Providing operators with suitable personal protective equipment',
      'Elimination of the hazard by design',
      'Fitting warning signs and labels around the danger zone',
      'Installing an interlocking guard on the moving parts',
    ],
    correctAnswer: 1,
    explanation:
      'The hierarchy prioritises elimination of the hazard by inherently safe design before applying guarding, interlocking, or PPE. Only when elimination is not reasonably practicable should safeguarding measures be applied.',
  },
  {
    id: 2,
    question: 'Which type of guard physically prevents access to the danger zone at all times?',
    options: ['Adjustable guard', 'Interlocking guard', 'Fixed guard', 'Self-adjusting guard'],
    correctAnswer: 2,
    explanation:
      'A fixed guard is permanently attached and requires tools for removal, providing a continuous barrier. It cannot be opened for normal operation and is the simplest and most reliable guard type.',
  },
  {
    id: 3,
    question:
      'What additional feature does a guard with guard locking provide beyond a standard interlocking guard?',
    options: [
      'It stops the machine faster when the guard is opened during operation',
      'It uses a coded actuator instead of a plain tongue to resist tampering',
      'It allows the guard to be opened without stopping the machine at all',
      'Keeps the guard locked closed until the hazard has ceased',
    ],
    correctAnswer: 3,
    explanation:
      'Guard locking physically prevents the guard from being opened until hazardous conditions such as rotating parts have stopped. A standard interlock only stops the machine when opened — it does not prevent opening.',
  },
  {
    id: 4,
    question: 'In a tongue-operated interlock, what happens when the guard is opened?',
    options: [
      'The tongue withdraws from the switch head, breaking the safety circuit',
      'The tongue locks more firmly into the switch head, holding the guard shut',
      'The switch energises the machine motor to begin the run-down sequence',
      'The safety contacts close, allowing the machine to continue running',
    ],
    correctAnswer: 0,
    explanation:
      'When the guard opens, the coded tongue withdraws from the switch head, causing the safety contacts to open. This break in the safety circuit signals the control system to stop the machine.',
  },
  {
    id: 5,
    question: 'What is the purpose of using coded actuators in safety interlock switches?',
    options: [
      'To increase the switching current the contacts can carry',
      'To prevent defeat of the interlock using substitution',
      'To speed up the response time of the safety circuit',
      'To allow the same actuator to operate several different switches',
    ],
    correctAnswer: 1,
    explanation:
      'Coded or unique actuators prevent operators from defeating the interlock by inserting an alternative object (such as a screwdriver or spare tongue). Higher coding levels provide greater resistance to defeat.',
  },
  {
    id: 6,
    question: 'Which of these is a non-contact interlocking technology?',
    options: [
      'Tongue-operated switch',
      'Trapped-key system',
      'RFID-coded safety sensor',
      'Bolt-lock interlock',
    ],
    correctAnswer: 2,
    explanation:
      'RFID-coded safety sensors use radio-frequency identification for non-contact detection of guard position. They offer high tolerance to misalignment, vibration and contamination.',
  },
  {
    id: 7,
    question: 'What does BS EN ISO 14120 cover?',
    options: [
      'The calculation of minimum safety distances for safeguarding devices',
      'The design and selection of interlocking devices associated with guards',
      'The performance levels required for safety-related control systems',
      'General requirements for the design and construction of guards',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN ISO 14120 specifies general requirements for the design, construction, and selection of guards — covering material selection, fixing methods, reach distances and gap dimensions.',
  },
  {
    id: 8,
    question:
      'In a trapped-key interlock system with multiple locks, what determines the sequence of operations?',
    options: [
      'The physical key transfer sequence between locks',
      'A programmable timer in the machine control system',
      'The order in which the operator presses the control buttons',
      'The priority level assigned to each lock in the PLC software',
    ],
    correctAnswer: 0,
    explanation:
      'The physical arrangement of keys and locks enforces a strict mechanical sequence that cannot be bypassed. Each key released from one lock is required to open the next lock in the sequence.',
  },
  {
    id: 9,
    question:
      'What must be considered when selecting the approach speed for calculating safety distance?',
    options: [
      'The rated supply voltage of the machine control circuit',
      'Hand/body approach speed per BS EN ISO 13855',
      'The maximum running speed of the machine motor',
      'The colour coding of the guard and its actuator',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN ISO 13855 defines standard approach speeds (2000 mm/s for hand approach, 1600 mm/s for body approach) used to calculate minimum safety distances between the guard and the hazard.',
  },
  {
    id: 10,
    question: 'Why should safety interlock wiring be run separately from power wiring?',
    options: [
      'To reduce the total length of cable needed for the installation',
      'To allow the safety circuit to share a neutral with the power circuit',
      'To prevent electromagnetic interference causing false safe states',
      'To make the safety wiring carry the full motor load current',
    ],
    correctAnswer: 2,
    explanation:
      'Separating safety wiring from power circuits prevents electromagnetic interference from causing undetected faults in the safety system that could mask a dangerous condition.',
  },
  {
    id: 11,
    question: 'What is a muting function in a safety guarding system?',
    options: [
      'Reducing the audible alarm volume during normal machine operation',
      'Locking the guard closed until all rotating parts have stopped',
      'Disabling the emergency stop button during a planned maintenance task',
      'Temporarily suspending the safety function under specific conditions to allow material passage',
    ],
    correctAnswer: 3,
    explanation:
      'Muting temporarily suspends the safety function (e.g., a light curtain) to allow workpieces to pass through while maintaining personnel protection. Muting requires specific conditions to be met and is automatically reversed.',
  },
  {
    id: 12,
    question:
      'Under PUWER 1998, who is responsible for ensuring that guards and interlocks are maintained in an efficient state?',
    options: [
      'The employer who provides the work equipment',
      'The original machine manufacturer for the whole of the machine life',
      'The individual operator who uses the machine each day',
      'The Health and Safety Executive inspector for the area',
    ],
    correctAnswer: 0,
    explanation:
      'PUWER 1998 Regulation 5 places the duty on the employer to ensure that work equipment is maintained in an efficient state, in efficient working order and in good repair. This includes guards and safety interlocks.',
  },
];

const faqs = [
  {
    question: 'How often should interlocking devices be inspected?',
    answer:
      'BS EN ISO 14119 recommends regular inspection intervals determined by risk assessment. Typically, visual checks are performed daily or per shift, functional tests weekly or monthly, and full inspections annually. High-risk applications may require more frequent checks. All inspections must be documented.',
  },
  {
    question: 'Can I use a standard limit switch as a safety interlock?',
    answer:
      'No. Standard limit switches are not designed for safety applications. Safety interlock switches are built to positive-opening (direct-opening) principles per IEC 60947-5-1 Annex K, ensuring contacts open even if welded, and are rated for safety applications with appropriate coding levels.',
  },
  {
    question: 'What is the difference between a Type 2 and Type 4 interlock?',
    answer:
      'Type 2 interlocks use non-coded actuators (e.g., a standard tongue) that could potentially be defeated by substitution. Type 4 interlocks use coded or unique actuators (e.g., RFID) that are very difficult to defeat, providing a higher level of protection against tampering.',
  },
  {
    question: 'How do I calculate the minimum safety distance for a guard?',
    answer:
      'Use the formula from BS EN ISO 13855: S = (K x T) + C, where S is the minimum distance in mm, K is the approach speed (2000 mm/s for hands, 1600 mm/s for body), T is the overall stopping/response time in seconds, and C is an additional distance based on reach-through capability.',
  },
  {
    question: 'What are run-down hazards and why do they matter?',
    answer:
      'Run-down hazards occur when machine parts continue to move after power is removed (e.g., flywheels, spindles, centrifuges). Guard locking is required to keep guards locked until these parts have stopped, preventing exposure to residual kinetic energy that could cause serious injury.',
  },
];

const MOETModule5Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.3 · Subsection 2"
        title="Guarding and Interlocking Devices"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Machine guarding principles, interlocking methods and safety distance calculation — how
            a machine is stopped from hurting the person opening it up.
          </p>

          <TLDR
            points={[
              'Hierarchy: Eliminate by design, then guard, then interlock, then PPE.',
              'Guard types: Fixed, interlocking, guard-locking, adjustable, self-adjusting.',
              'Interlock technologies: Tongue, RFID, magnetic, hinge-operated, trapped-key.',
              'Safety distance: S = (K x T) + C per BS EN ISO 13855.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the hierarchy of safeguarding measures and where guarding fits within it',
              'Identify guard types: fixed, movable, interlocking, adjustable and self-adjusting',
              'Describe interlocking device types including tongue, RFID-coded and magnetic',
              'Explain guard locking principles and their application for run-down hazards',
              'Understand trapped-key interlock systems and sequential access control',
              'Calculate safety distances using BS EN ISO 13855 for guard positioning',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inspection:</strong> Daily visual checks, weekly/monthly functional tests.
              </li>
              <li>
                <strong>Defeat prevention:</strong> Coded actuators, tamper-resistant fixings.
              </li>
              <li>
                <strong>Guard locking:</strong> Run-down hazards require locked guards until safe.
              </li>
              <li>
                <strong>ST1426:</strong> Test, verify and maintain guarding systems.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Hierarchy of safeguarding measures</ContentEyebrow>

          <ConceptBlock title="Eliminate first; guard only what cannot be eliminated">
            <p>
              The Machinery Directive 2006/42/EC and BS EN ISO 12100 establish a hierarchy for risk
              reduction on machinery. The first priority is always inherently safe design —
              eliminating hazards through the design process itself. Where hazards cannot be
              eliminated, safeguarding measures are applied in a strict order of preference.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Risk reduction hierarchy (ISO 12100)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1 — Inherently safe design:</strong> Eliminate hazards by design (e.g.
                reduce forces, speeds, energies; use inherently safe materials and substances).
              </li>
              <li>
                <strong>Step 2 — Safeguarding measures:</strong> Fixed guards (simplest, most
                reliable), interlocking guards (allow necessary access), protective devices (light
                curtains, safety mats, two-hand controls).
              </li>
              <li>
                <strong>Step 3 — Information for use:</strong> Warning signs, labels, markings,
                operating instructions and training. This is the last resort — information alone
                does not reduce risk.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Types of guards (BS EN ISO 14120)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fixed guards:</strong> Permanently attached using fasteners requiring tools
                for removal. Provide continuous protection but do not allow access for routine
                operations.
              </li>
              <li>
                <strong>Movable (interlocking) guards:</strong> Can be opened without tools. Must be
                fitted with interlocking devices that stop the machine when the guard is opened.
              </li>
              <li>
                <strong>Adjustable guards:</strong> Allow the opening to be adjusted to suit
                different workpiece sizes while maintaining protection (common on drilling machines
                and saws).
              </li>
              <li>
                <strong>Self-adjusting guards:</strong> Automatically adjust to the workpiece
                dimensions as it is fed into the machine (common on woodworking machines).
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> Guards must be designed so they cannot be easily defeated,
              remain in place during normal use, and do not create additional hazards such as sharp
              edges, trapping points or restricted visibility that could cause an operator to remove
              them.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Interlocking device types</ContentEyebrow>

          <ConceptBlock title="Linking guard position to the control system">
            <p>
              An interlocking device is a mechanical, electrical or electronic device that links the
              position of a guard to the control system of the machine. When the guard is opened,
              the interlock signals the control system to stop the machine or prevent it from
              starting. BS EN ISO 14119 classifies interlocking devices and specifies requirements
              for their design and selection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Tongue-operated switches">
            <p>
              A shaped metal tongue (actuator) inserts into the switch head when the guard is
              closed. Opening the guard withdraws the tongue, causing the safety contacts to open.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Available with coded tongues to prevent defeat.</li>
              <li>Robust and widely used on hinged/sliding guards.</li>
              <li>Positive-opening contacts per IEC 60947-5-1.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="RFID-coded safety sensors">
            <p>
              Non-contact guard monitoring using radio-frequency identification. Each
              sensor-actuator pair has a unique RFID code.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Substitution virtually impossible.</li>
              <li>High tolerance to misalignment and vibration.</li>
              <li>Sealed construction for harsh environments.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Magnetic safety switches">
            <p>
              Use magnetically coded actuators detected by Reed contacts or Hall-effect sensors.
              Non-contact operation with sealed construction suitable for washdown environments.
              Available in various coding levels from simple to high-coded for tamper resistance.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Hinge-operated switches">
            <p>
              Integrate directly into the guard hinge, monitoring door position without requiring a
              separate actuator. Compact installation, but limited to hinged guards. The switch body
              forms part of the hinge mechanism, making tampering difficult.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Interlocks defeated by tampering"
            whatHappens={
              <>
                Defeat includes using alternative objects, removing actuators, or modifying the
                switch — practices BS EN ISO 14119 requires interlocking devices to be resistant to.
              </>
            }
            doInstead={
              <>
                Higher coding levels (Type 3 and Type 4) provide greater resistance. During
                maintenance inspections, always check for signs of tampering — taped switches,
                missing actuators, modified wiring or bypassed contacts.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Guard locking and run-down hazards</ContentEyebrow>

          <ConceptBlock title="When stopping the machine is not enough">
            <p>
              Standard interlocking stops the machine when the guard is opened, but some machines
              have run-down hazards — parts that continue to move after power is removed. Examples
              include flywheels, large rotating masses, centrifuges, spindles with high inertia, and
              heated elements that take time to cool. In these cases, guard locking (interlocking
              with guard locking) is required.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Guard locking principles">
            <p>
              Guard locks use a solenoid-operated bolt that engages with the guard door. The bolt is
              released only when a safe condition is confirmed — typically by monitoring machine
              speed or a timed delay sufficient for moving parts to stop.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Spring-to-lock:</strong> The bolt is held locked by a spring and released by
                energising the solenoid. Fail-safe — the guard remains locked on power loss.
              </li>
              <li>
                <strong>Solenoid-to-lock:</strong> The bolt is engaged by energising the solenoid.
                The guard can be opened if power is lost — used where trapped personnel must be able
                to escape.
              </li>
              <li>
                <strong>Holding force:</strong> Must be sufficient to prevent the guard being forced
                open. Typical values range from 1000 N to 2600 N.
              </li>
              <li>
                <strong>Escape release:</strong> An auxiliary mechanical release inside the guarded
                area allows trapped personnel to escape.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BS EN ISO 14119 Clause 7 requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Guard locking devices must incorporate fault detection for the locking element.
              </li>
              <li>
                The mechanical strength of the locking bolt must be rated for the application.
              </li>
              <li>Resistance to defeat must match the overall interlock coding level.</li>
              <li>
                Auxiliary release mechanisms must be provided where personnel could become trapped.
              </li>
              <li>
                The unlock condition must be clearly defined and monitored (speed zero, time
                elapsed, temperature within limits).
              </li>
            </ul>
            <p>
              <strong>Maintenance tip:</strong> When testing guard-locking interlocks, verify that
              the guard cannot be opened during the run-down period and that the unlock occurs
              reliably when the safe condition is reached. Check the bolt mechanism for wear, ensure
              the solenoid operates correctly, and verify the escape release functions from inside
              the enclosure.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Trapped-key interlock systems</ContentEyebrow>

          <ConceptBlock title="A purely mechanical way to enforce a safe sequence">
            <p>
              Trapped-key interlocks provide a purely mechanical means of enforcing a safe sequence
              of operations. The system consists of a series of locks, each trapping or releasing a
              key. The key released from one lock is required to operate the next, creating a chain
              of actions that must be performed in the correct order.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Typical trapped-key sequence">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Turn the key in the machine isolator to the OFF position —
                this traps one key and releases a transfer key.
              </li>
              <li>
                <strong>Step 2:</strong> Use the transfer key to release the guard lock — the guard
                can now be opened.
              </li>
              <li>
                <strong>Step 3:</strong> The guard lock traps the transfer key — the machine cannot
                be restarted until the guard is closed and relocked.
              </li>
              <li>
                <strong>Step 4:</strong> Close and relock the guard — the transfer key is released.
              </li>
              <li>
                <strong>Step 5:</strong> Return the transfer key to the isolator lock — the isolator
                can now be turned ON.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Applications and manufacturers">
            <p>
              Trapped-key systems are inherently tamper-resistant and do not rely on electrical
              circuits, making them suitable for:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>High-voltage switchgear access control.</li>
              <li>Robotic cell entry procedures.</li>
              <li>Conveyor systems with multiple access points.</li>
              <li>Multi-zone isolation on complex machinery.</li>
              <li>Any application requiring strict procedural enforcement.</li>
            </ul>
            <p>
              Major manufacturers include <strong>Castell</strong>, <strong>Kirk</strong> and{' '}
              <strong>Fortress</strong>, each offering proprietary key profiles to prevent
              cross-system defeat. Trapped-key systems can be combined with electrical interlocks
              for additional safety layers.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Safety distance calculation</ContentEyebrow>

          <ConceptBlock title="The machine must be stopped before a hand can reach it">
            <p>
              When positioning guards and safety devices, the minimum distance from the hazard zone
              must be calculated to ensure the machine has stopped before an operator can reach the
              danger point. BS EN ISO 13855 provides the formula and the standard approach speeds
              used in the calculation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Safety distance formula">
            <p>
              <strong>S = (K x T) + C</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>S</strong> = Minimum safety distance in mm.
              </li>
              <li>
                <strong>K</strong> = Approach speed in mm/s (2000 mm/s for hand approach, 1600 mm/s
                for body approach).
              </li>
              <li>
                <strong>T</strong> = Overall stopping/response time in seconds (safety device +
                control system + machine).
              </li>
              <li>
                <strong>C</strong> = Additional distance accounting for reach-through capability.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Worked example">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Parameter</th>
                    <th className="py-2 font-medium text-white">Value</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Light curtain response time</td>
                    <td className="py-2">20 ms</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Safety relay response time</td>
                    <td className="py-2">15 ms</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Machine stopping time</td>
                    <td className="py-2">200 ms</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Total T</td>
                    <td className="py-2">0.235 s</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">K (body approach)</td>
                    <td className="py-2">1600 mm/s</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">C (14 mm resolution)</td>
                    <td className="py-2">850 mm</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">S = (1600 x 0.235) + 850</td>
                    <td className="py-2 font-medium">1226 mm minimum</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[13px]">
              If this distance cannot be achieved, the machine stopping time must be reduced or a
              different safeguarding approach used.
            </p>
            <p className="italic">
              All component response times must be measured and documented — they cannot be assumed.
              The machine stopping time is the most variable element and must be measured under
              worst-case conditions (maximum speed, maximum load, worn brakes).
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'The hierarchy is: eliminate by design, then safeguard (fixed guards first, then interlocking guards, then protective devices), then information/training as a last resort.',
              'Fixed guards are the simplest and most reliable, requiring tools to remove; interlocking guards must stop the machine the instant they are opened.',
              'Coded actuators (tongue, RFID, magnetic) resist substitution — higher coding levels (Type 3/4) give greater tamper resistance; check for taped switches or missing actuators on inspection.',
              'Guard locking is required wherever run-down hazards exist (flywheels, spindles, centrifuges) — spring-to-lock stays locked on power loss, solenoid-to-lock releases on power loss for escape.',
              'A trapped-key sequence enforces a strict mechanical order — each key released from one lock is needed to open the next — with no reliance on electrical circuits.',
              'Safety distance: S = (K x T) + C — K is 2000 mm/s hand or 1600 mm/s body approach speed, T is the total measured stopping/response time, C accounts for reach-through.',
              'Every component response time feeding the safety-distance calculation must be measured under worst-case conditions, never assumed from a datasheet figure alone.',
              'PUWER 1998 Regulation 5 places the duty on the employer to keep guards and interlocks maintained in an efficient state — inspection and documentation are not optional.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Emergency Stop Circuits
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section3-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Safety Relays and Controllers
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section3_2;
