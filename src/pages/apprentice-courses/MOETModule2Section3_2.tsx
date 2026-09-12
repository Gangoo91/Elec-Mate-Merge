/**
 * MOET · Module 2 · Section 2.3 · Subsection 2 — Induction Motors
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
 *   · "Electrical. Principles of single phase and three-phase equipment,
 *     plant, and systems, the operation of motors and generators, and the
 *     use…"
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { MotorEffect, FlemingsLeftHandRule } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Induction Motors - MOET Module 2.3.2';
const DESCRIPTION =
  'Understand three-phase and single-phase induction motors: rotating magnetic fields, slip, torque-speed characteristics, motor types, nameplate data, fault diagnosis, and maintenance for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'slip-calculation',
    question:
      'A 4-pole induction motor operates on a 50Hz supply. The synchronous speed is 1,500 rev/min and the rotor runs at 1,440 rev/min. What is the slip?',
    options: ['2%', '10%', '6%', '4%'],
    correctIndex: 3,
    explanation:
      'Slip = (Ns - Nr) / Ns x 100 = (1500 - 1440) / 1500 x 100 = 60/1500 x 100 = 4%. Typical full-load slip for a standard induction motor is between 3% and 6%. At no-load, slip is very small (less than 1%).',
  },
  {
    id: 'squirrel-cage-advantage',
    question:
      'What is the PRIMARY advantage of a squirrel cage induction motor over a wound rotor motor?',
    options: [
      'Higher starting torque at lower starting current',
      'Robust construction, low maintenance, no brushes or slip rings',
      'Smooth speed control without the need for a variable speed drive',
      'The ability to run reliably from a single-phase supply',
    ],
    correctIndex: 1,
    explanation:
      'The squirrel cage rotor has no brushes, slip rings, or external rotor connections — it is essentially a set of aluminium or copper bars short-circuited by end rings. This makes it extremely robust, cheap to manufacture, and requires minimal maintenance. Over 90% of industrial motors are squirrel cage type.',
  },
  {
    id: 'bearing-failure-signs',
    question:
      'Which of the following is an early indication of bearing failure in an induction motor?',
    options: [
      'A gradual rise in the motor power factor towards unity',
      'Increased vibration levels and elevated bearing temperature',
      'A reduction in the starting current drawn at switch-on',
      'An increase in the synchronous speed of the rotating field',
    ],
    correctIndex: 1,
    explanation:
      'Bearing failure typically shows early signs of increased vibration (detectable with a vibration analyser) and elevated bearing temperature. As the fault develops, you may also hear grinding or rumbling noises. Regular vibration monitoring is one of the most effective predictive maintenance techniques for rotating machinery.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What creates the rotating magnetic field in a three-phase induction motor?',
    options: [
      'A DC excitation current fed to the rotor through slip rings',
      'Three-phase currents in the stator windings, displaced 120 degrees apart',
      'A permanent magnet rotor spun by the single supply phase',
      'A capacitor that shifts the supply current by 90 degrees',
    ],
    correctAnswer: 1,
    explanation:
      'Three balanced currents, each displaced by 120 electrical degrees, flowing in the stator windings create a rotating magnetic field. This field rotates at synchronous speed (determined by frequency and number of poles) and induces currents in the rotor, which produce torque.',
  },
  {
    id: 2,
    question: 'The synchronous speed of a 2-pole motor on a 50Hz supply is:',
    options: ['750 rev/min', '1,500 rev/min', '3,000 rev/min', '1,000 rev/min'],
    correctAnswer: 2,
    explanation:
      'Synchronous speed Ns = (120 x f) / p = (120 x 50) / 2 = 3,000 rev/min. A 2-pole motor has the highest synchronous speed. Adding more poles reduces the speed: 4-pole = 1,500, 6-pole = 1,000, 8-pole = 750 rev/min.',
  },
  {
    id: 3,
    question: 'Why can an induction motor rotor NEVER reach synchronous speed?',
    options: [
      'Because the rotor bars are not connected to the supply and carry no current',
      'Because friction and windage losses always limit the rotor to about 75% of synchronous speed',
      'Because the centrifugal switch opens and removes power before the rotor reaches full speed',
      'If the rotor reached synchronous speed, there would be no relative motion between rotor and stator field, so no EMF would be induced and no torque produced',
    ],
    correctAnswer: 3,
    explanation:
      "The induction motor operates on the principle of relative motion between the rotating stator field and the rotor. If the rotor reached synchronous speed, there would be no relative motion, no change of flux through the rotor bars, no induced EMF, no rotor current, and therefore no torque. The rotor must always 'slip' behind the field.",
  },
  {
    id: 4,
    question: 'On a motor nameplate, the designation IP55 refers to:',
    options: [
      'The degree of protection against solid objects (5) and water (5)',
      'The insulation class and the maximum permitted winding temperature',
      'The rated input power in kilowatts at full load on both shafts',
      'The starting current as a multiple of the full-load current',
    ],
    correctAnswer: 0,
    explanation:
      "IP (Ingress Protection) is defined by BS EN 60529. The first digit (5) means 'dust protected' and the second digit (5) means 'protected against water jets from any direction'. IP55 is a common rating for motors used in industrial and outdoor environments.",
  },
  {
    id: 5,
    question:
      'A single-phase capacitor-start motor uses a capacitor connected in series with the start winding to:',
    options: [
      'Limit the start-winding current to protect it from overheating at standstill',
      'Create a phase displacement between the start and run windings, simulating a two-phase supply to produce starting torque',
      'Correct the running power factor of the motor towards unity',
      'Store energy to keep the motor turning briefly during a supply interruption',
    ],
    correctAnswer: 1,
    explanation:
      'A single-phase supply alone cannot create a rotating magnetic field. The capacitor shifts the current in the start winding approximately 90 degrees ahead of the current in the run winding, creating a pseudo two-phase supply that produces a rotating field for starting. Once up to speed, a centrifugal switch disconnects the start winding.',
  },
  {
    id: 6,
    question: 'What is the typical full-load slip for a standard squirrel cage induction motor?',
    options: ['0% — it runs at synchronous speed', '15% to 20%', '3% to 6%', '50%'],
    correctAnswer: 2,
    explanation:
      'Typical full-load slip for a standard squirrel cage motor is 3% to 6%. High-efficiency motors tend to have lower slip (closer to 3%). High-slip motors (used for intermittent loads like cranes) may have slip up to 10-15%.',
  },
  {
    id: 7,
    question: 'A wound rotor induction motor differs from a squirrel cage motor because:',
    options: [
      'It requires a DC excitation supply to magnetise the rotor field',
      'It runs at exactly synchronous speed under all load conditions',
      'It uses a centrifugal switch to disconnect a start winding at speed',
      'It has windings on the rotor connected to external resistance via slip rings and brushes',
    ],
    correctAnswer: 3,
    explanation:
      'The wound rotor has three-phase windings connected to external resistors through slip rings and brushes. This allows control of starting current and torque by varying the external resistance. As the motor accelerates, resistance is progressively reduced. Wound rotor motors are used for high-inertia loads requiring controlled starting.',
  },
  {
    id: 8,
    question: 'Which motor insulation class has a maximum operating temperature of 155 degrees C?',
    options: [
      'Class F (155 degrees C)',
      'Class H (180 degrees C)',
      'Class A (105 degrees C)',
      'Class B (130 degrees C)',
    ],
    correctAnswer: 0,
    explanation:
      "Insulation classes define the maximum safe operating temperature: Class A = 105 degrees C, Class B = 130 degrees C, Class F = 155 degrees C, Class H = 180 degrees C. Most modern industrial motors use Class F insulation. Exceeding the temperature rating accelerates insulation degradation — the '10 degree rule' states that insulation life halves for every 10 degrees C above the rated temperature.",
  },
  {
    id: 9,
    question: "What causes 'single phasing' in a three-phase motor, and what are its effects?",
    options: [
      'A worn bearing causing the rotor to drag, drawing balanced extra current on all three phases',
      'A blown fuse or open conductor on one phase, causing the motor to run on two phases with increased current and overheating',
      'An over-tight drive belt loading the motor and reducing its running speed below normal',
      'A loose terminal on the earth conductor, causing the frame to become live during operation',
    ],
    correctAnswer: 1,
    explanation:
      'Single phasing occurs when one phase is lost (e.g., blown fuse, broken conductor, loose connection). The motor may continue to run but draws increased current on the remaining two phases, causing rapid overheating. A motor that is stationary will not start on single phase. This is why three-phase motors should be protected by overload relays on all three phases.',
  },
  {
    id: 10,
    question:
      'When performing an insulation resistance test on a motor, which tests should be carried out?',
    options: [
      'Line to neutral only, with the windings still connected to the supply',
      'A continuity test between the three winding terminals only',
      'Phase to earth, and phase to phase on all combinations',
      'A single test from one phase terminal to the motor shaft only',
    ],
    correctAnswer: 2,
    explanation:
      "A full motor IR test should include phase-to-earth (each phase to the motor frame) and phase-to-phase (between each pair of windings). This detects both earth faults and inter-winding insulation breakdown. Minimum acceptable value for a motor is typically 1 megohm per kV of rated voltage plus 1 megohm, though manufacturer's values should always be used.",
  },
  {
    id: 11,
    question:
      'What is the purpose of the centrifugal switch in a single-phase capacitor-start motor?',
    options: [
      'To protect the motor by tripping if the winding temperature becomes excessive',
      'To reverse the direction of rotation when the supply phases are swapped',
      'To switch the run capacitor into circuit once the motor is up to speed',
      'To disconnect the start winding and capacitor once the motor reaches approximately 75% speed',
    ],
    correctAnswer: 3,
    explanation:
      'The centrifugal switch is mounted on the motor shaft and opens at approximately 75% of full speed, disconnecting the start winding and its capacitor from the circuit. The motor then continues to run on the main winding alone. A faulty centrifugal switch is a common failure — if it fails to open, the start winding overheats; if it fails to close, the motor will not restart.',
  },
  {
    id: 12,
    question: 'Shaft misalignment between a motor and its driven load causes:',
    options: [
      'Increased vibration, premature bearing failure, coupling wear, and increased energy consumption',
      'An increase in the synchronous speed and a reduction in the motor slip',
      'A leading power factor and reduced reactive power drawn from the supply',
      'A higher insulation resistance reading and improved winding cooling',
    ],
    correctAnswer: 0,
    explanation:
      'Misalignment (angular, parallel, or axial) creates cyclic forces on the bearings and coupling, leading to excessive vibration, premature bearing and seal failure, coupling wear, and wasted energy. Laser alignment tools should be used during installation and after any maintenance that disturbs the alignment. Typical alignment tolerance is 0.05mm.',
  },
];

const faqs = [
  {
    question: 'How do I determine the direction of rotation of a three-phase motor?',
    answer:
      'The direction of rotation depends on the phase sequence of the supply connections to the motor terminals. Swapping any two of the three phase connections (e.g., swapping L1 and L2) will reverse the direction of rotation. Before connecting, check the required rotation direction from the driven equipment requirements. Use a phase rotation meter to confirm phase sequence before first start.',
  },
  {
    question: 'What causes a motor to trip on overload shortly after starting?',
    answer:
      'Common causes include: mechanical overload (seized bearing, jammed driven equipment, excessive belt tension), single phasing (one supply phase lost), low supply voltage (increases current draw), incorrect overload relay setting, and winding faults (inter-turn short circuits reducing impedance and increasing current). Systematically check each possibility before resetting and restarting.',
  },
  {
    question: 'Why is the starting current of an induction motor so high?',
    answer:
      'At standstill, the slip is 100% and the rotor impedance is at its lowest. The large relative speed between the stator field and the stationary rotor induces a large EMF in the rotor bars, driving a high current. The stator must supply this rotor current plus its own magnetising current, resulting in starting currents typically 6 to 8 times the full-load current. As the motor accelerates and slip decreases, the current falls.',
  },
  {
    question: 'How often should motor bearings be greased?',
    answer:
      'Bearing re-greasing intervals depend on the motor size, speed, bearing type, operating temperature, and environment. As a general guide: small motors (up to 30kW) every 6-12 months, medium motors (30-200kW) every 3-6 months, large motors or harsh environments every 1-3 months. Always use the correct grade and quantity of grease specified by the manufacturer. Over-greasing is as damaging as under-greasing — it causes overheating.',
  },
  {
    question: 'What is the difference between IE1, IE2, IE3, and IE4 efficiency classes?',
    answer:
      'IE (International Efficiency) classes define minimum motor efficiency levels per BS EN 60034-30-1. IE1 = Standard Efficiency, IE2 = High Efficiency, IE3 = Premium Efficiency, IE4 = Super Premium Efficiency. Since July 2023, EU regulations (EC 2019/1781) require that new motors from 0.75kW to 1,000kW must meet IE3 minimum, and motors from 75kW to 200kW must meet IE4 when operated with a VSD. Higher efficiency motors cost more but pay back through reduced energy consumption.',
  },
];

const MOETModule2Section3_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.3 · Subsection 2"
        title="Induction Motors"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            The workhorse of industry — rotating magnetic fields, slip, torque characteristics,
            motor types, fault diagnosis, and maintenance.
          </p>

          <TLDR
            points={[
              'Principle: rotating stator field induces current in rotor, producing torque.',
              'Slip: rotor always runs slower than the field — typically 3-6% at full load.',
              'Types: squirrel cage (90%+ of motors) and wound rotor.',
              'Faults: bearing failure, winding insulation breakdown, shaft misalignment.',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Most common motor:</strong> over 90% of industrial motors are induction
                type.
              </li>
              <li>
                <strong>Energy:</strong> electric motors consume approximately 45% of global
                electricity.
              </li>
              <li>
                <strong>ST1426 requirement:</strong> diagnose faults, perform maintenance,
                understand motor principles.
              </li>
              <li>
                <strong>Cost impact:</strong> motor failure causes expensive production downtime.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain how a rotating magnetic field is produced and how it creates torque in an induction motor',
              'Calculate synchronous speed and slip for motors with different pole numbers',
              'Compare squirrel cage and wound rotor induction motors and state their applications',
              'Describe single-phase motor types including capacitor-start, capacitor-run, and split phase',
              'Interpret motor nameplate data including power, voltage, current, IP rating, and insulation class',
              'Identify common motor faults and describe appropriate maintenance and testing procedures',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The rotating magnetic field</ContentEyebrow>

          <ConceptBlock title="The most widely used electric motor in industry">
            <p>
              The three-phase induction motor is the most widely used electric motor in industry.
              Its operation depends on a fundamental principle: when three balanced alternating
              currents, each displaced by 120 electrical degrees, flow through three sets of stator
              windings arranged symmetrically around the stator bore, they create a magnetic field
              that rotates at a constant speed. This rotating field is the driving force of the
              motor.
            </p>
            <p>
              The speed at which the magnetic field rotates is called the synchronous speed, and is
              determined by two factors: the supply frequency and the number of magnetic poles in
              the stator winding.
            </p>
          </ConceptBlock>

          <MotorEffect />

          <ConceptBlock title="Synchronous speed formula">
            <div className="rounded bg-black/30 p-3 text-sm text-white">
              <p className="font-mono">Ns = (120 x f) / p</p>
              <p className="mt-2 text-xs text-white">
                Where: Ns = synchronous speed (rev/min), f = supply frequency (Hz), p = number of
                poles
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Poles</th>
                    <th className="py-2 pr-4 font-medium text-white">Synchronous Speed (50Hz)</th>
                    <th className="py-2 font-medium text-white">Typical Full-Load Speed</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">2</td>
                    <td className="py-2 pr-4">3,000 rev/min</td>
                    <td className="py-2">2,880 - 2,950 rev/min</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">4</td>
                    <td className="py-2 pr-4">1,500 rev/min</td>
                    <td className="py-2">1,420 - 1,470 rev/min</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">6</td>
                    <td className="py-2 pr-4">1,000 rev/min</td>
                    <td className="py-2">940 - 970 rev/min</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">8</td>
                    <td className="py-2 pr-4">750 rev/min</td>
                    <td className="py-2">710 - 730 rev/min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Slip">
            <p>
              The rotor of an induction motor can never reach synchronous speed. If it did, there
              would be no relative motion between the rotor conductors and the rotating stator
              field, no change of flux linkage, no induced EMF, no rotor current, and no torque. The
              rotor must always "slip" behind the field.
            </p>
            <div className="rounded bg-black/30 p-3 text-sm text-white">
              <p className="font-mono">s = (Ns - Nr) / Ns x 100%</p>
              <p className="mt-2 text-xs text-white">
                Where: s = slip (%), Ns = synchronous speed, Nr = rotor speed
              </p>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>At no-load:</strong> slip is very small (less than 1%) — rotor nearly
                reaches synchronous speed
              </li>
              <li>
                <strong>At full load:</strong> typical slip is 3-6% for standard motors
              </li>
              <li>
                <strong>At standstill:</strong> slip = 100% (starting condition)
              </li>
              <li>
                <strong>As load increases:</strong> rotor slows down, slip increases, more torque is
                produced
              </li>
            </ul>
          </ConceptBlock>

          <FlemingsLeftHandRule />

          <ConceptBlock title="Torque-speed characteristic">
            <p>
              The torque-speed curve of an induction motor shows how torque varies with speed from
              standstill to synchronous speed. Key points on the curve include:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Starting torque:</strong> torque produced at standstill — typically 1.5 to
                2.5 times full-load torque for a squirrel cage motor
              </li>
              <li>
                <strong>Pull-up torque:</strong> minimum torque during acceleration — must exceed
                load torque at all speeds for successful starting
              </li>
              <li>
                <strong>Breakdown (pull-out) torque:</strong> maximum torque the motor can produce —
                typically 2 to 3 times full-load torque
              </li>
              <li>
                <strong>Full-load torque:</strong> the rated continuous torque at the nameplate
                speed
              </li>
              <li>
                <strong>Stall:</strong> if the load torque exceeds the breakdown torque, the motor
                stalls and draws locked-rotor current
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Motor types: squirrel cage, wound rotor and single-phase</ContentEyebrow>

          <ConceptBlock title="Suited to different applications">
            <p>
              Induction motors come in several variants, each suited to different applications. The
              maintenance technician must recognise each type and understand its specific
              characteristics, advantages, and maintenance requirements.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Squirrel cage induction motor">
            <p>
              The most common industrial motor — accounts for over 90% of all motors in service.
              Named for its rotor construction, which resembles a squirrel cage.
            </p>
            <div className="rounded-lg border-l-2 border-blue-500/50 bg-blue-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-blue-400/70">
                <li>
                  <strong>Rotor:</strong> cast aluminium or copper bars set in slots in the rotor
                  core, short-circuited at each end by conducting rings
                </li>
                <li>
                  <strong>No brushes or slip rings:</strong> no external rotor connections, no
                  wearing parts (except bearings)
                </li>
                <li>
                  <strong>Robust and reliable:</strong> simple construction, low maintenance, long
                  service life
                </li>
                <li>
                  <strong>Limitation:</strong> fixed speed (determined by supply frequency and pole
                  number) — speed control requires a VSD
                </li>
                <li>
                  <strong>High starting current:</strong> typically 6-8 times full-load current —
                  may require reduced-voltage starting methods
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Wound rotor induction motor">
            <p>
              Used for applications requiring high starting torque or controlled acceleration — such
              as cranes, hoists, large fans, and crushers.
            </p>
            <div className="rounded-lg border-l-2 border-purple-500/50 bg-purple-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-purple-400/70">
                <li>
                  <strong>Rotor:</strong> three-phase windings connected to external resistance
                  through slip rings and brushes
                </li>
                <li>
                  <strong>Speed control:</strong> varying the external rotor resistance changes the
                  torque-speed characteristic
                </li>
                <li>
                  <strong>Starting:</strong> full rotor resistance inserted at start (reduces
                  starting current, increases starting torque), then progressively removed as motor
                  accelerates
                </li>
                <li>
                  <strong>Maintenance:</strong> brushes and slip rings require regular inspection
                  and replacement — more maintenance than squirrel cage
                </li>
                <li>
                  <strong>Declining use:</strong> being replaced by squirrel cage motors with
                  variable speed drives in many applications
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Single-phase induction motors">
            <p>
              A single-phase supply cannot create a rotating magnetic field on its own — it produces
              a pulsating field. Special arrangements are needed to produce starting torque.
            </p>
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">Capacitor-Start Motor</p>
                <p className="text-xs text-white">
                  Has a start winding with a capacitor in series, creating a phase displacement that
                  simulates a two-phase supply. A centrifugal switch disconnects the start winding
                  at approximately 75% speed. Good starting torque — used for compressors, pumps,
                  and machine tools up to about 3kW.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">
                  Capacitor-Start, Capacitor-Run Motor
                </p>
                <p className="text-xs text-white">
                  Two capacitors: a large electrolytic capacitor for starting (switched out by
                  centrifugal switch) and a smaller oil-filled capacitor that remains in circuit
                  during running. Better running performance and power factor than capacitor-start
                  alone.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">Split-Phase Motor</p>
                <p className="text-xs text-white">
                  Uses a start winding with higher resistance (thinner wire) to create a small phase
                  displacement from the run winding. Lower starting torque than capacitor-start.
                  Used for light-duty applications such as fans and small pumps. Centrifugal switch
                  disconnects start winding.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-white">Shaded-Pole Motor</p>
                <p className="text-xs text-white">
                  Simplest single-phase motor — a copper ring (shading coil) on part of each pole
                  face delays the flux in that area, creating a weak rotating component. Very low
                  starting torque, low efficiency, small ratings only. Used for fans, small pumps,
                  and domestic appliances.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Motor nameplate data and selection</ContentEyebrow>

          <ConceptBlock title="Everything you need to know about the motor's design operating conditions">
            <p>
              Every motor carries a nameplate (rating plate) that provides essential information for
              installation, operation, and maintenance. Understanding nameplate data is a core
              competency for the maintenance technician — it tells you everything you need to know
              about the motor's design operating conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Key nameplate parameters">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Parameter</th>
                    <th className="py-2 font-medium text-white">Meaning</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Rated Power (kW)</td>
                    <td className="py-2">Mechanical output power at the shaft at full load</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Rated Voltage (V)</td>
                    <td className="py-2">
                      Supply voltage for rated performance (e.g., 400V, 690V)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Rated Current (A)</td>
                    <td className="py-2">Full-load current at rated voltage and power</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Rated Speed (rev/min)</td>
                    <td className="py-2">
                      Full-load speed — slightly less than synchronous speed due to slip
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Power Factor (cos phi)</td>
                    <td className="py-2">The ratio of real power to apparent power at full load</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Efficiency (%)</td>
                    <td className="py-2">
                      Ratio of mechanical output to electrical input (IE class)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Insulation Class</td>
                    <td className="py-2">
                      Maximum winding temperature (B=130, F=155, H=180 degrees C)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">IP Rating</td>
                    <td className="py-2">
                      Ingress protection (e.g., IP55 = dust protected, water jets)
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Duty Type (S1-S10)</td>
                    <td className="py-2">
                      S1 = continuous, S2 = short-time, S3 = intermittent periodic
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Connection (Delta/Star)</td>
                    <td className="py-2">
                      Winding configuration: delta for lower voltage, star for higher
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Motor selection considerations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Load torque profile:</strong> constant torque (conveyors), variable torque
                (fans, pumps), or high starting torque (crushers)
              </li>
              <li>
                <strong>Duty cycle:</strong> continuous (S1), intermittent (S3), or short-time (S2)
                — affects thermal rating
              </li>
              <li>
                <strong>Environment:</strong> temperature, altitude, humidity, dust, corrosive gases
                — determines enclosure (IP rating) and cooling method
              </li>
              <li>
                <strong>Starting method:</strong> DOL, star-delta, soft starter, or VSD — affects
                motor design and cable sizing
              </li>
              <li>
                <strong>Speed requirements:</strong> fixed speed or variable speed — VSD
                compatibility may require inverter-duty insulation
              </li>
              <li>
                <strong>Efficiency class:</strong> IE3 minimum for most applications (current
                regulations)
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Common faults and maintenance</ContentEyebrow>

          <ConceptBlock title="Enabling effective preventive and predictive maintenance">
            <p>
              Understanding common motor failure modes enables the maintenance technician to
              implement effective preventive and predictive maintenance strategies, reducing
              unplanned downtime and extending motor service life.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Bearing failure (40-50% of motor failures)">
            <div className="rounded-lg border-l-2 border-red-500/50 bg-red-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-red-400/70">
                <li>
                  <strong>Causes:</strong> inadequate or excessive lubrication, contamination,
                  misalignment, overloading, electrical discharge (VSD-induced shaft currents)
                </li>
                <li>
                  <strong>Symptoms:</strong> increased vibration, elevated temperature, noise
                  (grinding, rumbling), shaft play
                </li>
                <li>
                  <strong>Prevention:</strong> correct lubrication schedule, vibration monitoring,
                  laser alignment, shaft grounding (for VSD applications)
                </li>
                <li>
                  <strong>Testing:</strong> vibration analysis (time domain and frequency spectrum),
                  bearing temperature monitoring, acoustic emission
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Winding insulation failure (30-40% of motor failures)">
            <div className="rounded-lg border-l-2 border-amber-500/50 bg-amber-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-amber-400/70">
                <li>
                  <strong>Causes:</strong> thermal ageing (10 degree rule), moisture ingress,
                  voltage spikes (VSD dV/dt), contamination, mechanical damage
                </li>
                <li>
                  <strong>Symptoms:</strong> tripping on earth fault or overcurrent, reduced IR
                  readings, increased winding temperature, smell of burnt insulation
                </li>
                <li>
                  <strong>Prevention:</strong> correct operating temperature, clean environment,
                  surge protection for VSD-fed motors
                </li>
                <li>
                  <strong>Testing:</strong> insulation resistance (IR), polarisation index (PI),
                  surge comparison test, motor circuit analysis (MCA)
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Shaft misalignment">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Types:</strong> angular (shaft axes at an angle), parallel/offset (shaft
                axes parallel but displaced), axial (excessive end-play)
              </li>
              <li>
                <strong>Symptoms:</strong> vibration at 1x and 2x running speed, premature bearing
                and coupling failure, seal leaks, excessive energy consumption
              </li>
              <li>
                <strong>Prevention:</strong> laser alignment during installation and after any work
                that disturbs the motor position
              </li>
              <li>
                <strong>Tolerance:</strong> typically 0.05mm offset and 0.05mm/100mm angular for
                standard couplings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical supply problems">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single phasing:</strong> loss of one supply phase — motor runs hot on
                remaining phases, uneven magnetic pull
              </li>
              <li>
                <strong>Voltage unbalance:</strong> even a small voltage unbalance (2%) can cause
                significant current unbalance (12-15%) and overheating
              </li>
              <li>
                <strong>Undervoltage:</strong> motor draws more current to maintain torque,
                increasing copper losses and heat
              </li>
              <li>
                <strong>Overvoltage:</strong> increases iron losses and magnetising current, can
                damage insulation
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 maintenance competency">
            <p>
              The Level 3 apprenticeship standard (ST1426) requires you to diagnose motor faults
              using a systematic approach, carry out routine maintenance including lubrication,
              alignment checks, and electrical testing, interpret motor nameplate data, and select
              replacement motors to match the application requirements.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=59HBoIXzX_c"

            title="How Electric Motors Work — 3 Phase AC Induction Motors"

            channel="The Engineering Mindset"

            duration="15:33"

            topic="The rotating field, slip, and why an induction motor turns at all"

            caption="The rotating magnetic field is very hard to picture from a still diagram. This is the one to watch."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Ns = (120 x f) / p; slip s = (Ns - Nr) / Ns x 100% and can never reach zero while the motor produces torque.',
              'Typical full-load slip for a standard squirrel cage motor is 3% to 6%.',
              'Over 90% of industrial motors are squirrel cage type — robust, low-maintenance, no brushes or slip rings.',
              'Starting currents are typically 6 to 8 times the full-load current.',
              'Bearing failure accounts for 40-50% of motor failures; winding insulation failure for 30-40%.',
              'IP (Ingress Protection) is defined by BS EN 60529; insulation classes define maximum safe operating temperature.',
              'Single phasing causes the motor to run hot on the remaining two phases and can fail within minutes.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Induction Motors" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Transformers
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Synchronous Motors
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section3_2;
