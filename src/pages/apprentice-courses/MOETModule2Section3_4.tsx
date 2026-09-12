/**
 * MOET · Module 2 · Section 2.3 · Subsection 4 — DC Motors and Their Control
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { DCMotorSchematic } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE = 'DC Motors and Their Control - MOET Module 2.3.4';
const DESCRIPTION =
  'Understand DC motor types, speed control methods, armature voltage control, field weakening, regenerative braking, DC drives, commutator maintenance, and brush wear for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'dc-series-motor',
    question: 'Why must a DC series motor NEVER be run without a mechanical load connected?',
    options: [
      'The field winding overheats because it carries the full armature current at no load',
      'The commutator sparks heavily because there is no back-EMF at no load',
      'Without load, the speed rises uncontrollably to a dangerous level (runaway) because the weak field at light load allows the speed to increase, which further weakens the field',
      'The motor draws excessive starting current that the supply cannot sustain',
    ],
    correctIndex: 2,
    explanation:
      "In a series motor, the field current equals the armature current. At no load, the armature current is very small, the field is very weak, and the motor must spin faster to generate sufficient back-EMF. This positive feedback loop causes the speed to increase without limit — the motor 'runs away' and can self-destruct. Series motors must always be directly coupled to their load.",
  },
  {
    id: 'speed-control-armature',
    question:
      'What is the effect of reducing the armature voltage of a DC motor while keeping the field voltage constant?',
    options: [
      'The speed decreases — armature voltage control gives speeds below base speed',
      'The speed increases above base speed as the armature current falls',
      'The speed stays constant because the field flux is unchanged',
      'The motor stops, as armature voltage has no effect on speed',
    ],
    correctIndex: 0,
    explanation:
      'Speed is approximately proportional to armature voltage divided by field flux: N is proportional to Va / phi. Reducing Va while keeping phi constant reduces the speed. This method gives a constant-torque speed range from zero to base speed, making it ideal for applications requiring good low-speed torque.',
  },
  {
    id: 'commutator-maintenance',
    question:
      'When inspecting a DC motor commutator, what does a dark brown, polished appearance indicate?',
    options: [
      'Overheating of the commutator from excessive brush pressure',
      'Abrasive contamination that has worn the copper surface',
      "A healthy 'patina' — good commutation with correct brush grade and pressure",
      'Burnt segments caused by shorted armature coils',
    ],
    correctIndex: 2,
    explanation:
      'A dark brown, evenly polished surface (called the patina or glaze) indicates healthy commutation. The patina is a thin copper oxide film that reduces brush wear and improves contact. A bright, scratched copper surface indicates abrasive contamination, wrong brush grade, or recent machining that has not yet developed a patina.',
  },
  {
    id: 'regenerative-braking',
    question: 'What is regenerative braking in a DC motor system?',
    options: [
      'The armature is shorted across a resistor to dissipate energy as heat',
      'A mechanical brake is applied to the motor shaft to slow it down',
      'The field winding is de-energised to allow the motor to coast to a stop',
      'The motor acts as a generator, converting kinetic energy to electrical energy and feeding it back to the supply',
    ],
    correctIndex: 3,
    explanation:
      'During regenerative braking, the motor is driven by the mechanical load faster than its normal speed (or the armature voltage is reduced below the back-EMF). The motor becomes a generator, converting the kinetic energy of the rotating load into electrical energy, which is fed back to the supply through the drive. This provides controlled deceleration and recovers energy.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a DC motor, the torque is produced by the interaction between:',
    options: [
      'The supply frequency and the number of armature poles',
      'The field flux and the armature current-carrying conductors in the field',
      'The back-EMF and the commutator segment voltage',
      'The brush spring pressure and the commutator surface speed',
    ],
    correctAnswer: 1,
    explanation:
      "DC motor torque is produced by the force on current-carrying conductors (armature winding) placed in a magnetic field (from the field poles). The force follows Fleming's left-hand rule: F = B x I x L (force = flux density x current x conductor length). Torque is proportional to the product of field flux and armature current.",
  },
  {
    id: 2,
    question: 'A DC shunt motor has its field winding connected:',
    options: [
      'In series with the armature, carrying the full armature current',
      'Across two of the three supply phases',
      'In parallel with the armature, across the full supply voltage',
      'Between the armature and the commutator brushes',
    ],
    correctAnswer: 2,
    explanation:
      'In a shunt motor, the field winding is connected in parallel (shunt) with the armature, across the full supply voltage. This means the field current is independent of the armature current (load), providing approximately constant flux and therefore approximately constant speed across the load range — good speed regulation.',
  },
  {
    id: 3,
    question: "What is the 'back-EMF' in a DC motor?",
    options: [
      'The voltage dropped across the brushes and commutator contact resistance',
      'The voltage induced in the field winding by the changing armature current',
      'The reverse voltage applied to the armature during dynamic braking',
      'The voltage generated by the rotating armature, which opposes the supply voltage',
    ],
    correctAnswer: 3,
    explanation:
      'When the armature rotates in the magnetic field, it generates an EMF (just like a generator) that opposes the applied supply voltage — this is the back-EMF (Eb). The armature current is determined by: Ia = (V - Eb) / Ra. At running speed, the back-EMF is close to the supply voltage, so the armature current (and therefore copper losses) are relatively small.',
  },
  {
    id: 4,
    question: 'A DC compound motor combines:',
    options: [
      'Series and shunt field windings to provide characteristics between a pure series and pure shunt motor',
      'Two armature windings to double the available starting torque',
      'A permanent magnet field and a wound armature for constant speed',
      'A series field and a capacitor to give a phase-shifted starting current',
    ],
    correctAnswer: 0,
    explanation:
      'A compound motor has both a series field winding (carrying armature current) and a shunt field winding (across the supply voltage). The series winding adds flux under load, increasing torque, while the shunt winding provides base flux for good speed regulation. The result is moderate speed regulation with better starting torque than a pure shunt motor.',
  },
  {
    id: 5,
    question: 'Field weakening in a DC shunt motor involves:',
    options: [
      'Reducing the armature voltage to lower the flux, causing the motor to slow down below base speed',
      'Increasing the resistance in the field circuit to reduce field current and flux, causing the motor to speed up above base speed',
      'Adding resistance in series with the armature to reduce the field flux and limit the running current',
      'Reversing the field connections to weaken the residual magnetism and reduce starting torque',
    ],
    correctAnswer: 1,
    explanation:
      "Since speed is proportional to V/phi, reducing the field flux (phi) by increasing the field circuit resistance causes the speed to increase above base speed. This provides a constant-power speed range above base speed. However, the maximum torque decreases as the field is weakened. Field weakening should not exceed the manufacturer's limits to avoid commutation problems.",
  },
  {
    id: 6,
    question: 'The function of the commutator in a DC motor is to:',
    options: [
      'Smooth the back-EMF generated by the armature so the supply current remains constant',
      'Carry the field current to the field poles and set up the main magnetic flux',
      'Act as a mechanical rectifier, reversing the current direction in each armature coil as it passes the brush position, ensuring continuous unidirectional torque',
      'Store rotational energy as a flywheel to maintain torque between commutation pulses',
    ],
    correctAnswer: 2,
    explanation:
      'The commutator is a segmented copper cylinder connected to the armature coils. As the armature rotates, the brushes make contact with successive commutator segments, reversing the current direction in each coil at exactly the right moment to ensure all conductors contribute torque in the same rotational direction.',
  },
  {
    id: 7,
    question:
      'What are the two main methods of speed control for DC motors below and above base speed?',
    options: [
      'Changing the number of poles, and reversing the connections',
      'Varying the supply frequency and adjusting the commutator',
      'Changing the brush position and adding external resistance',
      'Armature voltage control (below base speed) and field weakening (above base speed)',
    ],
    correctAnswer: 3,
    explanation:
      'Below base speed: armature voltage control varies Va from zero to rated voltage, giving constant-torque operation. Above base speed: field weakening reduces the field flux, giving constant-power operation at higher speeds but reduced torque. Together, these provide a wide speed range with excellent control characteristics.',
  },
  {
    id: 8,
    question: 'A thyristor DC drive converts:',
    options: [
      'AC mains supply to controlled DC voltage for the motor armature',
      'DC battery supply to fixed-frequency AC for the motor windings',
      'Low-voltage DC to high-voltage DC for the field circuit',
      'Single-phase AC to three-phase AC for the armature supply',
    ],
    correctAnswer: 0,
    explanation:
      'A thyristor (SCR) DC drive uses phase-controlled thyristors to convert the AC mains supply to a variable DC voltage. By adjusting the thyristor firing angle, the mean DC output voltage is varied, controlling the motor speed. Four-quadrant drives can provide both motoring and regenerative braking in both directions of rotation.',
  },
  {
    id: 9,
    question: 'What causes sparking at the brushes of a DC motor?',
    options: [
      'Excessive back-EMF — the armature voltage exceeds the supply voltage at full load',
      'Poor commutation — causes include worn brushes, incorrect brush grade, commutator surface defects, overloading, or brush spring tension problems',
      'Too high a field current — over-excitation of the field saturates the commutator copper',
      'A supply frequency mismatch — the brushes spark when the AC frequency is above 50 Hz',
    ],
    correctAnswer: 1,
    explanation:
      'Sparking at the brushes indicates poor commutation — the current is not transferring smoothly from one commutator segment to the next. Common causes include: worn or chipped brushes, incorrect brush grade, high or low mica between segments, rough or eccentric commutator surface, incorrect brush position, overloading, and weak brush spring pressure.',
  },
  {
    id: 10,
    question: 'Why is an armature resistance starter used for starting large DC motors?',
    options: [
      'To increase the starting torque by boosting the field flux during the run-up period',
      'To smooth the back-EMF so that the armature current rises steadily as the motor accelerates',
      'To limit the starting current — at standstill there is no back-EMF, so without a starter resistor the armature current would be V/Ra, which is extremely high',
      'To provide dynamic braking automatically by absorbing energy each time the motor starts',
    ],
    correctAnswer: 2,
    explanation:
      'At standstill, back-EMF = 0, so Ia = V / Ra. Since Ra is very small (often less than 1 ohm), the starting current without a resistor would be enormous — potentially 10-20 times rated current. The starter resistor limits this to a safe value (typically 1.5-2 times rated current). As the motor accelerates and back-EMF builds up, the resistance is progressively removed.',
  },
  {
    id: 11,
    question: 'Dynamic braking of a DC motor involves:',
    options: [
      'Reversing the armature supply while running so the motor develops torque in the opposite direction',
      'Feeding the generated energy back to the supply through a four-quadrant regenerative drive',
      'Applying a spring-loaded mechanical disc brake directly to the motor output shaft',
      'Disconnecting the armature from the supply and connecting it across a braking resistor — the motor acts as a generator, dissipating kinetic energy as heat in the resistor',
    ],
    correctAnswer: 3,
    explanation:
      'In dynamic braking, the armature is disconnected from the supply and connected to a braking resistor. The motor, still spinning and with the field energised, acts as a generator, producing current through the resistor. The kinetic energy of the rotating load is converted to heat in the resistor, bringing the motor to a controlled stop. Unlike regenerative braking, the energy is wasted as heat.',
  },
  {
    id: 12,
    question: 'When undercutting a commutator, you are:',
    options: [
      'Cutting the mica insulation between commutator segments to below the copper surface to prevent the mica from protruding as the copper wears',
      'Machining the worn brushes to a shorter length so they bed in more quickly against the commutator',
      'Reducing the diameter of the commutator on a lathe to remove flat spots and eccentricity',
      'Filing a chamfer on the leading edge of each commutator segment to reduce brush bounce',
    ],
    correctAnswer: 0,
    explanation:
      'The mica insulation between commutator segments is harder than the copper. As the copper wears, the mica eventually protrudes above the copper surface, causing the brushes to bounce and spark. Undercutting removes the mica to a depth of about 1-1.5mm below the copper surface, ensuring smooth brush contact. This is a routine maintenance task for DC machines.',
  },
];

const faqs = [
  {
    question: 'Are DC motors still used in modern industry?',
    answer:
      'Yes, although their dominance has declined significantly with the widespread adoption of AC variable speed drives. DC motors are still found in: existing installations (many large DC drives remain in service in steel mills, paper mills, and mining), traction applications (some rail systems), battery-powered vehicles and equipment, small servo drives, and applications requiring very precise speed and torque control at low speeds. New installations increasingly use AC motors with VFDs, but the maintenance technician will encounter many DC machines in service.',
  },
  {
    question: 'How often should DC motor brushes be inspected?',
    answer:
      'Brush inspection intervals depend on the duty cycle, environment, and motor size. As a general guide: high-duty applications (continuous running, reversing, high load) every 1-3 months; moderate duty every 3-6 months; light duty every 6-12 months. Check for: brush length (replace when worn to minimum length mark), correct brush grade, freedom of movement in brush holders, spring pressure (use a spring balance), commutator condition, and evidence of sparking or brush dust buildup.',
  },
  {
    question: 'What is the difference between a 2-quadrant and 4-quadrant DC drive?',
    answer:
      'A 2-quadrant drive provides motoring and braking in one direction of rotation (e.g., forward motoring + forward regenerative braking). A 4-quadrant drive provides motoring and regenerative braking in both directions — forward motoring, forward braking, reverse motoring, and reverse braking. A 4-quadrant drive uses two thyristor bridges (one for each direction) and can seamlessly transition between all four operating modes. Used for reversing drives, hoists, and winding applications.',
  },
  {
    question: 'Why do DC motors need interpoles (commutating poles)?',
    answer:
      'Interpoles are small poles placed between the main field poles, carrying armature current. They generate a local magnetic field at the commutation zone (where the brushes contact the commutator) that helps neutralise the EMF induced in the coil undergoing commutation. Without interpoles, this EMF would cause sparking at the brushes. Interpoles are essential for good commutation, especially at higher loads and speeds.',
  },
  {
    question: 'Can you reverse the direction of a DC motor?',
    answer:
      'Yes. Reverse either the armature connections OR the field connections — but not both (reversing both would maintain the same direction). In practice, it is more common to reverse the armature connections because the armature circuit has lower inductance and responds faster. Modern DC drives reverse the armature voltage electronically using a 4-quadrant thyristor bridge. Reversing a series motor requires reversing the armature connections only, as the field is in series with the armature.',
  },
];

const MOETModule2Section3_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.3 · Subsection 4"
        title="DC Motors and Their Control"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Series, shunt, and compound wound motors — speed control, braking, DC drives, and
            commutator maintenance.
          </p>

          <TLDR
            points={[
              'Types: series (high starting torque), shunt (constant speed), compound (compromise).',
              'Speed control: armature voltage (below base speed), field weakening (above).',
              'Braking: regenerative, dynamic, plugging — each with distinct characteristics.',
              'Maintenance: brushes, commutator, bearings — more than AC motors.',
            ]}
          />

          <ConceptBlock title="Why this matters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Still in service:</strong> many DC drives remain in heavy industry (steel,
                paper, mining).
              </li>
              <li>
                <strong>Maintenance-heavy:</strong> brushes and commutators need regular skilled
                attention.
              </li>
              <li>
                <strong>ST1426:</strong> understand DC motor principles, maintenance, and speed
                control.
              </li>
              <li>
                <strong>Safety:</strong> series motors can run away; stored energy in field
                windings.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Describe the construction and operating principles of series, shunt, and compound wound DC motors',
              'Explain speed control by armature voltage variation and field weakening',
              'Describe regenerative, dynamic, and plugging braking methods',
              'Explain the function of thyristor and chopper DC drives',
              'Carry out commutator inspection and maintenance including undercutting and brush replacement',
              'Identify common DC motor faults and their causes',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>DC motor types and characteristics</ContentEyebrow>

          <ConceptBlock title="Torque from field and armature current">
            <p>
              A DC motor produces torque through the interaction of a magnetic field (from the field
              winding or permanent magnets) and current-carrying conductors in the armature. The way
              the field winding is connected relative to the armature determines the motor's
              speed-torque characteristics, and therefore its suitability for different
              applications.
            </p>
          </ConceptBlock>

          <DCMotorSchematic />

          <ConceptBlock title="Fundamental DC motor equation">
            <div className="rounded bg-black/30 p-3 text-sm text-white">
              <p className="mb-1 font-mono">V = Eb + Ia x Ra</p>
              <p className="mb-1 font-mono">Eb = k x phi x N (back-EMF)</p>
              <p className="mb-1 font-mono">T = k x phi x Ia (torque)</p>
              <p className="mt-2 text-xs text-white">
                Where: V = supply voltage, Eb = back-EMF, Ia = armature current, Ra = armature
                resistance, phi = field flux, N = speed, k = machine constant
              </p>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Series wound motor">
            <p>
              The field winding is connected in series with the armature — field current equals
              armature current. This gives unique characteristics.
            </p>
            <div className="rounded-lg border-l-2 border-red-500/50 bg-red-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-red-400/70">
                <li>
                  <strong>Very high starting torque</strong> — because field flux is strong at high
                  starting current
                </li>
                <li>
                  <strong>Speed varies inversely with load</strong> — heavy load = slow, light load
                  = fast
                </li>
                <li>
                  <strong>DANGER — will run away at no load!</strong> At light load, armature
                  current is small, field is weak, speed rises uncontrollably
                </li>
                <li>
                  <strong>Must always be mechanically coupled to its load</strong> — never use belt
                  drive (belt could slip/break)
                </li>
                <li>
                  <strong>Applications:</strong> traction (trains, trams), cranes, hoists, winches —
                  where high starting torque and variable speed are needed
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <CommonMistake
            title="Running a series motor with no mechanical load"
            whatHappens={
              <>
                At light load, the armature current is small, the field is very weak, and the motor
                must spin faster to generate sufficient back-EMF. This positive feedback loop causes
                the speed to increase without limit — the motor "runs away" and can self-destruct.
              </>
            }
            doInstead={
              <>
                Series motors must always be mechanically coupled to their load — never use a belt
                drive, which could slip or break and leave the motor unloaded while still energised.
              </>
            }
          />

          <ConceptBlock title="Shunt wound motor">
            <p>
              The field winding is connected in parallel (shunt) with the armature, across the full
              supply voltage. Field current is independent of load.
            </p>
            <div className="rounded-lg border-l-2 border-blue-500/50 bg-blue-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-blue-400/70">
                <li>
                  <strong>Approximately constant speed</strong> — good speed regulation across load
                  range
                </li>
                <li>
                  <strong>Moderate starting torque</strong> — lower than series motor
                </li>
                <li>
                  <strong>Speed easily controlled</strong> — by armature voltage or field current
                  adjustment
                </li>
                <li>
                  <strong>Safe at no-load</strong> — field flux remains constant, speed stays near
                  rated
                </li>
                <li>
                  <strong>Applications:</strong> machine tools, conveyors, fans, pumps — where
                  constant speed is required
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Compound wound motor">
            <p>
              Has both series and shunt field windings, combining characteristics of both types.
            </p>
            <div className="rounded-lg border-l-2 border-green-500/50 bg-green-500/10 p-4">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-green-400/70">
                <li>
                  <strong>Cumulative compound:</strong> series and shunt fields aid each other —
                  better starting torque than shunt, better speed regulation than series
                </li>
                <li>
                  <strong>Differential compound:</strong> series field opposes shunt field — very
                  constant speed but unstable at high loads (rarely used)
                </li>
                <li>
                  <strong>No-load safety:</strong> shunt winding prevents runaway at no-load
                </li>
                <li>
                  <strong>Applications:</strong> presses, shears, rolling mills, elevators — where
                  good starting torque and reasonable speed regulation are both needed
                </li>
              </ul>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Speed control methods</ContentEyebrow>

          <ConceptBlock title="Ease and precision of control">
            <p>
              One of the great advantages of DC motors — and the main reason they dominated
              variable-speed drives for decades — is the ease and precision with which their speed
              can be controlled. The two primary methods provide a wide speed range with excellent
              control characteristics.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Armature voltage control (below base speed)">
            <p>
              The armature voltage is varied from zero to rated voltage while the field current is
              held constant at its rated value. This provides constant-torque operation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-blue-400/70">
              <li>
                <strong>Speed range:</strong> zero to base speed (rated speed)
              </li>
              <li>
                <strong>Torque:</strong> full rated torque available at all speeds (constant torque)
              </li>
              <li>
                <strong>Power:</strong> power increases linearly with speed (P = T x omega)
              </li>
              <li>
                <strong>Method:</strong> thyristor converter or chopper varies the armature voltage
              </li>
              <li>
                <strong>Smooth control:</strong> stepless speed adjustment from standstill to full
                speed
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Field weakening (above base speed)">
            <p>
              The armature voltage is held at its rated value and the field current is reduced below
              its rated value. This provides constant-power operation.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-purple-400/70">
              <li>
                <strong>Speed range:</strong> base speed to typically 2-3 times base speed
              </li>
              <li>
                <strong>Torque:</strong> decreases inversely with speed (constant power)
              </li>
              <li>
                <strong>Power:</strong> approximately constant across the speed range
              </li>
              <li>
                <strong>Limit:</strong> maximum speed limited by commutation capability and
                mechanical strength
              </li>
              <li>
                <strong>Caution:</strong> excessive field weakening causes poor commutation and
                sparking
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Combined speed range">
            <p>
              Using armature voltage control from zero to base speed, then field weakening from base
              speed upwards, a DC drive can achieve speed ranges of 100:1 or greater. Below base
              speed: constant torque capability. Above base speed: constant power capability. This
              wide, controllable speed range is why DC drives were historically preferred for
              demanding applications.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>DC drives and braking methods</ContentEyebrow>

          <ConceptBlock title="Power electronic converters for precise control">
            <p>
              Modern DC drives use power electronic converters to provide precise, efficient speed
              control. The maintenance technician must understand the drive types and their braking
              capabilities.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Drive types">
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-blue-400">
                  Thyristor (SCR) Converter Drive
                </p>
                <p className="text-xs text-white">
                  Uses phase-controlled thyristors to convert three-phase AC to variable DC voltage.
                  The firing angle controls the output voltage. Single converter = 2-quadrant
                  (forward motoring + forward regenerative braking). Dual converter = 4-quadrant
                  (both directions, full regeneration). Still widely used for large DC drives (100kW
                  to several MW).
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-blue-400">Chopper (PWM) Drive</p>
                <p className="text-xs text-white">
                  Uses transistors (IGBTs or MOSFETs) to rapidly switch a fixed DC supply on and
                  off, controlling the mean voltage to the motor. Used in battery-powered vehicles,
                  small drives, and traction applications. Faster response than thyristor drives,
                  less supply harmonic distortion.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Braking methods">
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-green-400">Regenerative Braking</p>
                <p className="text-xs text-white">
                  The motor acts as a generator, feeding energy back to the supply. The armature
                  voltage (or back-EMF) exceeds the supply voltage, reversing the current flow.
                  Efficient — energy is recovered. Requires a regenerative (4-quadrant) drive or a
                  supply that can accept returned energy. Used for cranes, hoists, and electric
                  traction.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-amber-400">
                  Dynamic (Rheostatic) Braking
                </p>
                <p className="text-xs text-white">
                  The armature is disconnected from the supply and connected across a braking
                  resistor. The motor generates current through the resistor, converting kinetic
                  energy to heat. Energy is wasted but the method is simple and effective. Braking
                  torque decreases as the motor slows — cannot hold at zero speed. Field must remain
                  energised during braking.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-red-400">
                  Plugging (Counter-Current Braking)
                </p>
                <p className="text-xs text-white">
                  The armature supply is reversed while the motor is still running, applying torque
                  in the opposite direction. Very high braking torque but extremely high armature
                  current (supply voltage + back-EMF across the armature resistance). A
                  current-limiting resistor is essential. Energy from both the supply and the
                  kinetic energy is dissipated as heat. Motor must be disconnected at zero speed to
                  prevent reverse running.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Commutator and brush maintenance</ContentEyebrow>

          <ConceptBlock title="The components that distinguish DC machine maintenance">
            <p>
              The commutator and brushes are the components that distinguish DC machine maintenance
              from AC machine maintenance. They are the primary wearing parts and require regular
              skilled attention. Poor commutator condition leads to sparking, brush wear, motor
              damage, and ultimately machine failure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Commutator inspection">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Condition</th>
                    <th className="py-2 font-medium text-white">Interpretation</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-green-400">Dark brown, even polish</td>
                    <td className="py-2">Healthy patina — good commutation</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-amber-400">Bright copper, scratched</td>
                    <td className="py-2">
                      Abrasive contamination, wrong brush grade, or recently machined
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-red-400">Blackened or burnt segments</td>
                    <td className="py-2">
                      Severe sparking — possibly shorted coils, high mica, or overloading
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-red-400">Copper drag (smearing)</td>
                    <td className="py-2">
                      Copper from segments smeared across mica — will cause inter-segment short
                      circuits
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-amber-400">High mica</td>
                    <td className="py-2">
                      Mica protruding above copper surface — needs undercutting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Commutator maintenance tasks">
            <div className="space-y-3">
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-blue-400">Undercutting</p>
                <p className="text-xs text-white">
                  Removing mica insulation to 1-1.5mm below the copper surface using a purpose-made
                  undercutting tool or small circular saw. Must produce a clean, square-bottomed
                  slot with no burrs or copper drag. Deburr segment edges after undercutting.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-blue-400">Skimming (Turning)</p>
                <p className="text-xs text-white">
                  Machining the commutator surface in a lathe to restore a true cylindrical surface
                  when it becomes oval, eccentric, or has flat spots. Minimum diameter must not be
                  exceeded. Follow with undercutting and deburring. Run with old brushes initially
                  to re-establish patina.
                </p>
              </div>
              <div className="rounded bg-black/30 p-3">
                <p className="mb-1 text-sm font-medium text-blue-400">Cleaning</p>
                <p className="text-xs text-white">
                  Remove carbon dust and brush debris with a vacuum cleaner (not compressed air,
                  which drives dust into insulation). Clean commutator surface with a lint-free
                  cloth dampened with approved solvent. Never use emery cloth — use only fine glass
                  paper if abrasive cleaning is needed, and only while the motor is running slowly.
                </p>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Brush maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Brush grade:</strong> must match the manufacturer's specification — wrong
                grade causes excessive wear, sparking, or commutator damage
              </li>
              <li>
                <strong>Brush length:</strong> replace when worn to the minimum length mark
                (typically 50% of original length)
              </li>
              <li>
                <strong>Free movement:</strong> brushes must slide freely in their holders without
                rocking or sticking
              </li>
              <li>
                <strong>Spring pressure:</strong> check with a spring balance — typically 150-250
                g/cm squared of brush face area. Too light = sparking. Too heavy = rapid wear.
              </li>
              <li>
                <strong>Bedding in:</strong> new brushes must be bedded to the commutator curvature
                using fine glass paper wrapped around the commutator
              </li>
              <li>
                <strong>Pigtail connections:</strong> check for fraying, loose connections, or
                broken strands
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="ST1426 maintenance competency">
            <p>
              The Level 3 apprenticeship standard requires you to carry out inspection and
              maintenance of DC machines, including commutator assessment, brush replacement,
              insulation testing, and fault diagnosis. You should be able to identify the causes of
              poor commutation and take appropriate corrective action.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=GQatiB-JHdI"

            title="How Does a DC Motor Work?"

            channel="The Engineering Mindset"

            duration="15:32"

            topic="Commutation, brushes and torque in a DC machine"

            caption="Shows the commutator reversing the current every half turn, which is the part the schematic above cannot animate."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'V = Eb + Ia x Ra; Eb = k x phi x N (back-EMF); T = k x phi x Ia (torque).',
              'A series motor must never be run with no mechanical load — the field weakens, speed rises uncontrollably, and the motor can self-destruct.',
              'Speed is approximately proportional to armature voltage divided by field flux: N is proportional to Va / phi.',
              'Below base speed: armature voltage control (constant torque). Above base speed: field weakening (constant power).',
              'A dark brown, evenly polished commutator surface (the patina) indicates healthy commutation.',
              'Sparking at the brushes indicates poor commutation — worn brushes, wrong grade, surface defects, overloading, or weak spring pressure.',
              'Interpoles generate a local field at the commutation zone that neutralises the EMF in the coil undergoing commutation, preventing sparking.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — DC Motors" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Synchronous Motors
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section3-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Motor Starting Methods
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section3_4;
