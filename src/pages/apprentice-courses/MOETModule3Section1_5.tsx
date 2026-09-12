/**
 * MOET · Module 3 · Section 3.1 · Subsection 5 — Isolation and Switching Devices
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Electricity at Work regulations. IET wiring regulations."
 *   · "Electrical. Electrical plant, equipment, and systems maintenance
 *     requirements: removing and replacing parts, inspecting, testing,
 *     setting up, adjusting, cleaning, and functional testing."
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
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import { ContactorSymbol } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Isolation and Switching Devices - MOET Module 3 Section 1.5';
const DESCRIPTION =
  "Functional switching, isolation, emergency switching, fireman's switch, isolator types, interlocking and safe isolation procedures for maintenance technicians.";

const quickCheckQuestions = [
  {
    id: 'contactor-isolation',
    question: 'Why are contactors NOT suitable as isolating devices?',
    options: [
      'They are too expensive for the application',
      'They do not break the neutral conductor',
      'They cannot handle high fault currents',
      'Their contacts may weld or the coil may be re-energised unexpectedly',
    ],
    correctIndex: 3,
    explanation:
      'Contactors are not suitable for isolation because their contacts may weld closed under fault conditions, or the coil may be re-energised by control circuits, causing the contactor to close unexpectedly while work is in progress.',
  },
  {
    id: 'firemans-switch',
    question: "Where must a fireman's switch be located?",
    options: [
      'At the main entrance to the building or as close as practicable',
      'Adjacent to the fire alarm control panel inside the building',
      'Within the main LV switchroom next to the incoming supply',
      'At roof level beside the sign or luminaire it controls',
    ],
    correctIndex: 0,
    explanation:
      "A fireman's switch must be located at the main entrance to the building, or as close as practicable, so that firefighters can access it easily before entering the premises. It must be coloured red with the OFF position at the top.",
  },
  {
    id: 'isolator-feature',
    question: 'What additional feature must an isolator have beyond simply opening the contacts?',
    options: [
      'A current-limiting fuse fitted in series with the moving contacts',
      'An auxiliary contact wired back to the fire alarm panel',
      'A locking facility and a visible gap or positive contact-position indication',
      'A residual current device built into the same enclosure',
    ],
    correctIndex: 2,
    explanation:
      'An isolating device must be capable of being locked in the open position and must provide either a visible gap or a positive indication that the contacts are fully open. This ensures the device cannot be accidentally closed during work.',
  },
  {
    id: 'prove-dead-retest',
    question:
      'Why must the voltage indicator be tested on a known live source BOTH before and after proving dead?',
    options: [
      'To allow the instrument batteries to settle before the dead test is recorded',
      'To discharge any stored energy in the indicator before applying it to the circuit',
      'To satisfy the calibration interval required for the instrument each working day',
      'To confirm the instrument was working before and after, eliminating false dead readings',
    ],
    correctIndex: 3,
    explanation:
      'Testing before and after eliminates the possibility that a faulty instrument gave a false dead reading. If the tester worked before proving dead but not after, it may have failed during the test, meaning the circuit could still be live.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What section of BS 7671 covers isolation and switching requirements?',
    options: ['Section 411', 'Section 537', 'Section 514', 'Section 612'],
    correctAnswer: 1,
    explanation:
      'Section 537 of BS 7671 covers the requirements for isolation, switching, control and monitoring of electrical installations.',
  },
  {
    id: 2,
    question: 'What is the key difference between functional switching and isolation?',
    options: [
      'Functional switching breaks only the neutral; isolation breaks only the line conductor',
      'Functional switching is rated for fault current; isolation is rated for load current only',
      'Functional switching controls normal operation; isolation disconnects for safety during work',
      'Functional switching needs a visible gap; isolation only needs a positive indication',
    ],
    correctAnswer: 2,
    explanation:
      'Functional switching is normal on/off control during everyday use. Isolation disconnects equipment from all sources of energy to make it safe for work, requiring a visible gap and locking facility.',
  },
  {
    id: 3,
    question: "What colour and position must a fireman's switch have?",
    options: [
      'Yellow, OFF position at the bottom',
      'Blue, any position',
      'Green, OFF position at the top',
      'Red, OFF position at the top',
    ],
    correctAnswer: 3,
    explanation:
      "A fireman's switch must be coloured red with the OFF position at the top. It must be clearly labelled 'FIREMAN'S SWITCH' and located at the main entrance to the building.",
  },
  {
    id: 4,
    question: 'Which of the following devices is NOT suitable for isolation?',
    options: [
      'Contactor',
      'Switch-disconnector',
      'MCCB with locking facility',
      'Fuse-switch with fuses removed',
    ],
    correctAnswer: 0,
    explanation:
      'Contactors are not suitable for isolation because their contacts may have welded under fault conditions, or the coil may be re-energised by control circuits, causing unexpected closure during work.',
  },
  {
    id: 5,
    question: 'In the safe isolation procedure, what must you do immediately AFTER proving dead?',
    options: [
      'Remove the lock-off device so the circuit can be re-energised for testing',
      'Re-test the voltage indicator on a known live source',
      'Record the insulation resistance value on the schedule of test results',
      'Apply temporary earths to the conductors at the point of work',
    ],
    correctAnswer: 1,
    explanation:
      'After proving dead, you must re-test the voltage indicator on a known live source to confirm it is still working. This eliminates the risk of a false dead reading from a faulty instrument.',
  },
  {
    id: 6,
    question: 'What HSE guidance note covers voltage indicator requirements for proving dead?',
    options: ['GS6', 'GS50', 'GS38', 'PM29'],
    correctAnswer: 2,
    explanation:
      'HSE Guidance Note GS38 covers the selection and use of test probes, leads, lamps, voltage-indicating devices and measuring instruments for use by electricians.',
  },
  {
    id: 7,
    question:
      'What type of interlocking uses a series of locks and keys to enforce switching sequences?',
    options: [
      'Electrical interlocking',
      'Mechanical interlocking',
      'Time-delay interlocking',
      'Trapped key interlocking',
    ],
    correctAnswer: 3,
    explanation:
      'Trapped key interlocking uses a series of locks and keys where each key is physically trapped until the correct preceding operation is completed, enforcing a safe switching sequence.',
  },
  {
    id: 8,
    question: 'What must be attached to an isolator after locking off?',
    options: [
      'A caution notice showing the name, date and contact details of the person working',
      'A copy of the relevant circuit schedule from the distribution board',
      'A test certificate confirming the device is suitable for isolation duty',
      'A warning label stating the prospective fault current at that point',
    ],
    correctAnswer: 0,
    explanation:
      'A caution notice (danger tag) must be attached to the locked-off isolator showing the name of the person who locked off, the date, and their contact details.',
  },
  {
    id: 9,
    question: "Which installations require a fireman's switch?",
    options: [
      'All final circuits supplying socket outlets in a commercial premises',
      'Exterior signs above 2.8 m at over 230 V, HV discharge lighting and PV installations',
      'Any circuit protected by a 30 mA RCD in a domestic dwelling',
      'Distribution boards supplied by more than one source of energy',
    ],
    correctAnswer: 1,
    explanation:
      "Fireman's switches are required for exterior electrical installations above 2.8 m at over 230 V, high-voltage discharge lighting (neon signs), and photovoltaic installations.",
  },
  {
    id: 10,
    question:
      'In a generator changeover system, what prevents both incomers closing simultaneously?',
    options: ['Time delay relay', 'Current transformer', 'Electrical interlocking', 'Key switch'],
    correctAnswer: 2,
    explanation:
      'Electrical interlocking uses auxiliary contacts and control circuits to ensure the mains and generator incomers cannot be closed simultaneously, preventing uncontrolled paralleling.',
  },
  {
    id: 11,
    question: 'Why is a multimeter not suitable for proving dead?',
    options: [
      'Its test leads are not long enough to reach the conductors safely',
      'It can only measure AC voltage and not DC voltage on a circuit',
      'It must be recalibrated before each individual measurement is taken',
      'A blown fuse or flat battery could give a false zero (dead) reading',
    ],
    correctAnswer: 3,
    explanation:
      'A multimeter with a blown fuse or flat battery may display zero voltage on a live circuit, giving a dangerously false dead reading. Approved voltage indicators have fail-safe designs that prevent this.',
  },
  {
    id: 12,
    question: 'What is mechanical maintenance switching used for?',
    options: [
      'Switching off the supply to allow mechanical work on non-electrical parts of equipment',
      'Disconnecting a circuit from every source of energy before electrical work begins',
      'Rapidly removing the supply in the event of danger from the driven equipment',
      'Controlling the normal everyday on/off operation of a motor or machine',
    ],
    correctAnswer: 0,
    explanation:
      'Mechanical maintenance switching (Regulation 537.3) allows the electrical supply to be switched off for mechanical work on electrically driven equipment, such as changing belts or cleaning impellers.',
  },
];

const faqs = [
  {
    question: 'Can an MCB be used as an isolator?',
    answer:
      "An MCB can be used for isolation if it can be locked in the open position (using a lockout device) and is rated for isolation duty. Many modern MCBs are designed to be suitable for isolation, but you should check the manufacturer's data sheet for confirmation. The device must provide either a visible gap or positive indication that the contacts are open.",
  },
  {
    question: 'What colour is an emergency stop button?',
    answer:
      'Emergency stop buttons must be red (mushroom-head push-button) on a yellow background. This colour combination is internationally recognised for emergency switching and is specified in BS EN 60204-1. The button must be operable by a single action (one hand operation) and must not require complex operations to activate.',
  },
  {
    question: 'Why can I not use a multimeter to prove dead?',
    answer:
      'A multimeter has a blown fuse or flat battery risk that could give a false dead reading (zero voltage display even though the circuit is live). Approved voltage indicators complying with GS38 have fused test leads, finger guards on the probes, current-limited circuits and clear go/no-go indication specifically designed for proving dead safely.',
  },
  {
    question: 'What is a trapped key interlock?',
    answer:
      'A trapped key system uses mechanical locks and keys to enforce a specific switching sequence. A key is physically trapped in one lock until the correct preceding action has been completed, releasing the key for the next step. These systems are widely used in HV/LV substations to ensure safe switching sequences are followed without relying on human memory.',
  },
  {
    question: 'Do I need to prove dead on every circuit before working?',
    answer:
      'Yes. You must prove dead at the point of work on every occasion, even if you isolated the circuit yourself moments earlier. There may be back-feeds from other sources, stored energy in capacitors, or parallel supplies that you are not aware of. The prove dead procedure is your final confirmation that the circuit is genuinely safe to work on.',
  },
];

const MOETModule3Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3.1 · Subsection 5"
        title="Isolation and Switching Devices"
        backTo="/study-centre/apprentice/m-o-e-t-module3-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Functional switching, isolation, emergency switching, fireman&apos;s switch and
            interlocking.
          </p>

          <TLDR
            points={[
              'Four categories: Functional, isolation, emergency, mechanical maintenance.',
              'Section 537: BS 7671 switching and isolation requirements.',
              'Safe isolation: Test-isolate-prove dead-re-test (GS38).',
              'Interlocking: Mechanical, electrical and trapped key systems.',
              'Isolators: Rotary, switch-disconnector, fuse-switch types.',
              'Emergency stops: Red on yellow, single-action operation.',
              "Fireman's switch: Red, OFF at top, main entrance.",
              'ST1426: Safe working practices and isolation KSBs.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish between functional switching, isolation and emergency switching',
              'Explain BS 7671 Section 537 requirements for isolation and switching',
              'Describe isolator types and their applications in maintenance',
              "Outline fireman's switch and emergency stop device requirements",
              'Explain interlocking methods in electrical systems',
              'Carry out safe isolation procedures using the test-isolate-test method',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Categories of switching</ContentEyebrow>

          <ConceptBlock title="Four categories, four different jobs">
            <p>
              BS 7671 Section 537 defines four categories of switching, each serving a distinct
              purpose within an electrical installation. Understanding these categories is essential
              for selecting the correct devices and following proper procedures during maintenance
              work.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Functional switching (Regulation 537.5)">
            <p>
              Normal on/off control of electrical equipment or circuits during everyday use.
              Functional switches do not need to provide isolation — they simply control whether
              equipment operates. Examples include light switches, motor control push-buttons,
              heating thermostats and socket outlet switches.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Do not need to break all live conductors</li>
              <li>Do not need a visible gap or locking facility</li>
              <li>Rated for the normal load current of the controlled circuit</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Isolation (Regulation 537.2)">
            <p>
              Disconnection of an installation, circuit or item of equipment from every source of
              electrical energy to make it safe for work. This is the most critical switching
              category for maintenance technicians.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Must break all live conductors (including neutral where it may become live)</li>
              <li>Must provide a visible gap or positive indication contacts are open</li>
              <li>Must be capable of being locked in the open (off) position</li>
              <li>Must be clearly labelled to identify the circuit or equipment</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emergency switching (Regulation 537.4)">
            <p>
              Rapid disconnection of the supply in the event of danger. Emergency switches must be
              immediately accessible, clearly identifiable (red on yellow background), and operable
              by a single action.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Emergency stop buttons (mushroom-head) on machinery</li>
              <li>Fire alarm trip switches on main distribution boards</li>
              <li>Must disconnect all live conductors</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Mechanical maintenance switching (Regulation 537.3)">
            <p>
              Switching off the supply to non-electrical parts of equipment for mechanical
              maintenance. Distinct from isolation (which is for electrical work). Used when
              mechanical work is needed on electrically driven equipment, such as changing belts on
              a motor-driven fan or cleaning pump impellers.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Suitable devices for isolation">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Switch-disconnectors:</strong> Purpose-designed for isolation with visible
                break
              </li>
              <li>
                <strong>Fuse-switches:</strong> With fuse links removed for additional safety
              </li>
              <li>
                <strong>MCBs:</strong> Only if they can be locked off and are rated for isolation
                duty
              </li>
              <li>
                <strong>MCCBs and ACBs:</strong> With locking facilities
              </li>
              <li>
                <strong>Plug-and-socket:</strong> Where the socket is fixed and cannot be
                re-inserted during work
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Using a contactor or solid-state relay for isolation"
            whatHappens={
              <>
                Contactors are NOT suitable for isolation because their contacts may weld closed
                under fault conditions, or the coil may be re-energised by control circuits, causing
                the contactor to close unexpectedly while work is in progress. Similarly,
                semiconductor switching devices (solid-state relays) cannot provide isolation
                because they do not provide a physical break in the circuit.
              </>
            }
            doInstead={
              <>
                Use a device from the suitable list instead — a switch-disconnector, a fuse-switch
                with the fuse links removed, a lockable MCB, MCCB or ACB rated for isolation duty,
                or a plug-and-socket arrangement where the socket is fixed and cannot be re-inserted
                during work.
              </>
            }
          />

          <div className="flex flex-wrap items-start gap-6">
            <ContactorSymbol />
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Fireman&apos;s switch and emergency devices</ContentEyebrow>

          <ConceptBlock title="Fireman's switch (Regulation 537.6)">
            <p>
              Regulation 537.6 requires a fireman&apos;s switch for certain installations to allow
              firefighters to disconnect the supply before entering a building or area. The
              installations requiring a fireman&apos;s switch include exterior electrical
              installations at a height exceeding 2.8 metres operating above 230 V, high-voltage
              discharge lighting (neon signs), and photovoltaic (PV) installations.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Colour:</strong> Red
              </li>
              <li>
                <strong>Location:</strong> At the main entrance to the building or as close as
                practicable
              </li>
              <li>
                <strong>Labelling:</strong> Clearly marked &quot;FIREMAN&apos;S SWITCH&quot;
              </li>
              <li>
                <strong>Operation:</strong> OFF position at the top; operable by hand without key or
                tool
              </li>
              <li>
                <strong>Function:</strong> Must disconnect all live conductors of the installation
                it controls
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emergency stop devices">
            <p>
              Emergency stop buttons are required on all motor-driven machinery where there is a
              risk of danger from the driven equipment. They must comply with BS EN 60204-1 and have
              specific characteristics:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Red mushroom-head push-button on a yellow background</li>
              <li>Single-action operation (one hand, one movement)</li>
              <li>Latching — must remain in the stop position until manually reset</li>
              <li>Direct opening contacts (positive break) for reliability</li>
              <li>Located within easy reach of the operator and any other person at risk</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PV installations carry a residual DC hazard">
            <p>
              Solar panels remain live in daylight even when the inverter is disconnected from the
              grid. The fireman&apos;s switch for a PV installation isolates the AC side, but the DC
              side from the panels to the inverter remains energised during daylight hours.
              Firefighters must be made aware of this residual hazard through clear labelling.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Isolator types and selection</ContentEyebrow>

          <ConceptBlock title="Choosing the right isolating device">
            <p>
              Several types of device can fulfil the isolation function. The choice depends on the
              current rating, the application, the required IP rating for the environment and the
              specific features needed for the installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Rotary isolators">
            <p>
              Commonly used for motor circuits and local equipment isolation. A rotary handle is
              turned to the OFF position and can be padlocked in place. Available in IP65 enclosures
              for outdoor or harsh industrial environments. Typically rated from 16 A to 125 A. Many
              incorporate auxiliary contacts for remote indication of the switch position.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Switch-disconnectors">
            <p>
              Combine load switching with isolation in a single device. Commonly used as the main
              incomer to distribution boards, providing a visible break and padlocking facility.
              Available in three-pole and four-pole (including switched neutral) configurations.
              Rated from 63 A to several thousand amperes for main switchboard applications.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Fuse-switches and fused isolators">
            <p>
              Combine the isolation function with fuse protection. When the switch is opened, the
              fuse links are physically withdrawn from the busbar connections, providing a clear
              visible break. Common in older industrial installations. The fuse links provide
              short-circuit protection while the switch mechanism handles load switching and
              isolation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Isolator types compared">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-white">Isolator type</th>
                    <th className="border border-white/10 px-3 py-2 text-white">Typical rating</th>
                    <th className="border border-white/10 px-3 py-2 text-white">
                      Common application
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Rotary isolator</td>
                    <td className="border border-white/10 px-3 py-2">16 A - 125 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Local motor and equipment isolation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Switch-disconnector</td>
                    <td className="border border-white/10 px-3 py-2">63 A - 3200 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      DB main incomer, sub-main isolation
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Fuse-switch</td>
                    <td className="border border-white/10 px-3 py-2">32 A - 800 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Industrial switchboards (legacy)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">MCB with lockout</td>
                    <td className="border border-white/10 px-3 py-2">6 A - 125 A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Final circuit isolation in DBs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Interlocking systems</ContentEyebrow>

          <ConceptBlock title="Linking one device's state to another">
            <p>
              Interlocking is a safety mechanism that prevents hazardous operations by linking the
              operation of one device to the state of another. In electrical systems, interlocking
              prevents access to live equipment, enforces safe switching sequences and prevents
              parallel operation of incompatible supplies.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Mechanical interlocking">
            <p>Uses physical linkages to prevent certain operations. Common examples include:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Door interlocks on switchgear preventing door opening while energised</li>
              <li>Defeatable interlocks overridable with a special tool for authorised testing</li>
              <li>
                Mechanical linkages between two contactors preventing both closing simultaneously
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical interlocking">
            <p>
              Uses auxiliary contacts and control circuits to prevent unsafe operations. In a
              generator changeover system, the mains incomer and generator incomer are electrically
              interlocked so that both cannot be closed simultaneously, which would parallel the
              generator with the mains supply. Auxiliary contacts from each contactor are wired into
              the control circuit of the other, creating a cross-lock arrangement.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Trapped key interlocking">
            <p>
              Uses a series of locks and keys to enforce a specific sequence of operations. A key is
              trapped in one lock until the correct preceding operation has been completed. Widely
              used in HV/LV transformer substations to ensure that the HV supply is isolated and
              earthed before the LV switchroom door can be opened, and that the LV main switch is
              open before the transformer can be accessed. The physical key transfer makes the
              sequence impossible to bypass without deliberate defeat.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Safe isolation procedure for maintenance</ContentEyebrow>

          <ConceptBlock title="The single most critical procedure in electrical maintenance">
            <p>
              Safe isolation is the single most critical procedure in electrical maintenance.
              Failure to follow the correct procedure is the primary cause of electrical accidents.
              The procedure is based on HSE Guidance Note GS38 and ensures that the circuit is
              genuinely dead before work commences.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The five-step safe isolation procedure">
            <ol className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify:</strong> Identify the circuit or equipment using circuit
                schedules, drawings or tracing. Confirm identification with the client or site
                representative.
              </li>
              <li>
                <strong>Test the voltage indicator:</strong> Test your approved voltage indicator on
                a known live source (proving unit or known live circuit) to confirm it is working
                correctly.
              </li>
              <li>
                <strong>Isolate:</strong> Open the isolating device and verify it is in the open
                position. Lock off with a personal padlock and attach a caution notice with your
                name, date and contact details.
              </li>
              <li>
                <strong>Prove dead:</strong> Test between all live conductors and between all live
                conductors and earth at the point of work using the proved voltage indicator.
              </li>
              <li>
                <strong>Re-test the voltage indicator:</strong> Test the voltage indicator again on
                the known live source to confirm it is still functioning correctly after proving
                dead.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Skipping the re-test after proving dead"
            whatHappens={
              <>
                If the voltage indicator worked before proving dead but fails the re-test, it may
                have developed a fault during the dead test, meaning the circuit could still be
                live.
              </>
            }
            doInstead={
              <>
                The re-test after proving dead eliminates the possibility that a faulty instrument
                gave a false dead reading. In this case, you must obtain a new instrument, prove it
                on a known live source, and repeat the dead test.
              </>
            }
          />

          <CommonMistake
            title="Treating a multimeter as a substitute for an approved voltage indicator"
            whatHappens={
              <>
                Multimeters in the voltage range are NOT suitable because a blown fuse or flat
                battery could give a dangerous false dead reading.
              </>
            }
            doInstead={
              <>
                Only approved voltage indicators complying with GS38 should be used for proving
                dead. These have fused test leads with a maximum of 20 mm exposed metal tip, finger
                guards on the probes, current-limited circuits, and clear go/no-go indication.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <Scenario
            title="An isolator that looks off and is not"

            situation={
              <>
                <p>
                  A rotary isolator on a machine is padlocked in the OFF position. You prove dead at
                  the machine terminals and get nothing. Satisfied, you begin work — and a colleague
                  gets a shock from a control circuit inside the same enclosure.
                </p>

                <p>
                  The isolator switched the three phases. The control transformer was fed from
                  upstream of it.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Identify every supply into the enclosure before isolating, not just the obvious
                  one. Control supplies, interlock feeds, PLC I/O from another panel, UPS-backed
                  circuits and anything fed from a neighbouring machine are all routes in.
                </p>

                <p>
                  Read the drawing specifically to find what the isolator does and does not switch.
                  An isolator is a device with a defined scope; "the isolator is off" is not the
                  same as "the enclosure is dead".
                </p>

                <p>
                  Prove dead at every point you intend to work on, not at one convenient set of
                  terminals. A single proving test tells you about that point only.
                </p>

                <p>
                  Where an enclosure genuinely has more than one supply, it should be labelled to
                  say so — and if it is not, that is a defect to raise regardless of how this
                  particular job ends.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Almost every serious shock during maintenance involves a supply nobody knew was
                there. Proving dead is not a formality you perform once at the start; it is a test
                of the specific conductors you are about to touch. An isolator that switches the
                power circuit and leaves the control transformer live is a completely normal
                arrangement, which is exactly what makes it dangerous.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Four categories of switching: functional (Reg 537.5), isolation (Reg 537.2), mechanical maintenance (Reg 537.3), emergency (Reg 537.4).',
              'Isolation must break all live conductors, provide a visible gap or positive contact-position indication, and be capable of being locked off.',
              'Contactors and solid-state relays are NOT suitable for isolation — contacts may weld, or the device provides no physical break.',
              "Fireman's switch: red, OFF at top, main entrance, disconnects all live conductors — required for tall exterior installations, HV discharge lighting and PV.",
              'Emergency stop devices: red mushroom-head on yellow, single-action, latching, to BS EN 60204-1.',
              'Interlocking: mechanical (physical linkage), electrical (auxiliary contacts and control circuits), trapped key (locks and keys enforcing sequence).',
              'Safe isolation: identify — test the voltage indicator — isolate and lock off — prove dead — re-test the voltage indicator. Based on HSE GS38.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Busbars and Cabling Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module3-section1-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Protection Coordination
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule3Section1_5;
