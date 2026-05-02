/**
 * Module 3 · Section 5 · Subsection 6 — DC Machines: Types, Control, Applications
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Series, shunt and compound DC motors, DC generators, control methods.
 *   Increasingly niche on new BSE installations but still alive in legacy lift gear,
 *   battery-powered equipment, and rectified DC bus on VSDs.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'DC Machines (Types, Control, Applications) - HNC Module 3 Section 5.6';
const DESCRIPTION =
  'Master DC motor and generator types, speed-torque characteristics, control methods, and building services applications including lifts, older HVAC systems, and battery-powered equipment.';

const quickCheckQuestions = [
  {
    id: 'dc-series-motor',
    question: 'What type of DC motor provides the highest starting torque?',
    options: ['Shunt motor', 'Series motor', 'Compound motor', 'Separately excited motor'],
    correctIndex: 1,
    explanation:
      'Series DC motors provide the highest starting torque because armature current flows through both the armature and field windings, creating a strong magnetic field at startup when current is highest.',
  },
  {
    id: 'dc-speed-control',
    question: 'Which method provides the widest range of speed control for DC motors?',
    options: [
      'Field weakening only',
      'Armature resistance control',
      'PWM armature voltage control',
      'Changing pole pairs',
    ],
    correctIndex: 2,
    explanation:
      'PWM (Pulse Width Modulation) armature voltage control provides smooth, efficient speed control over the widest range, from zero to full speed, and is the basis of modern DC drives.',
  },
  {
    id: 'armature-reaction',
    question: 'What is the main effect of armature reaction in DC machines?',
    options: [
      'Increased efficiency',
      'Distortion of the main field flux',
      'Improved commutation',
      'Reduced starting torque',
    ],
    correctIndex: 1,
    explanation:
      'Armature reaction distorts the main field flux distribution, shifting the magnetic neutral axis. This causes sparking at the brushes if not compensated by interpoles or brush shift.',
  },
  {
    id: 'bldc-advantage',
    question:
      'What is the main advantage of brushless DC (BLDC) motors over conventional DC motors?',
    options: [
      'Higher starting torque',
      'Simpler control electronics',
      'No brush wear and lower maintenance',
      'Lower initial cost',
    ],
    correctIndex: 2,
    explanation:
      'BLDC motors eliminate brushes and commutators, removing the main wear components. This significantly reduces maintenance requirements and extends motor life, making them ideal for applications requiring high reliability.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In a DC series motor, how are the field and armature windings connected?',
    options: [
      'In parallel with each other',
      'In series with each other',
      'Field winding connected to a separate supply',
      'Through a transformer',
    ],
    correctAnswer: 1,
    explanation:
      'In a series motor, the field winding carries the full armature current, connected in series. This creates high torque at low speeds as the field strength increases with load current.',
  },
  {
    id: 2,
    question: 'Why must a DC series motor never be operated without a mechanical load?',
    options: [
      'It will not start',
      'The brushes will wear out',
      'It may overspeed and be damaged (runaway)',
      'The field will demagnetise',
    ],
    correctAnswer: 2,
    explanation:
      'Series motors can run away to dangerous speeds at no load because speed is inversely proportional to field flux, which decreases as current drops. Belt-driven loads must never be used as belt slip can cause runaway.',
  },
  {
    id: 3,
    question: 'What is the purpose of interpoles (commutating poles) in DC machines?',
    options: [
      'To increase motor efficiency',
      'To provide regenerative braking',
      'To improve commutation and reduce brush sparking',
      'To increase starting torque',
    ],
    correctAnswer: 2,
    explanation:
      'Interpoles are small poles between main poles that produce a flux opposing armature reaction. They improve commutation by ensuring the EMF in coils undergoing commutation is in the correct direction, reducing sparking.',
  },
  {
    id: 4,
    question:
      'A DC shunt motor runs at 1500 rpm at full load. If the field current is reduced by 20%, the approximate new speed will be:',
    options: ['1200 rpm', '1500 rpm', '1875 rpm', '1800 rpm'],
    correctAnswer: 2,
    explanation:
      'In a shunt motor, speed is inversely proportional to field flux. If field is reduced to 80% (0.8), speed increases by factor of 1/0.8 = 1.25. New speed = 1500 x 1.25 = 1875 rpm (field weakening).',
  },
  {
    id: 5,
    question:
      'What type of DC generator excitation uses a portion of the output to energise the field?',
    options: [
      'Separately excited',
      'Permanent magnet',
      'Self-excited (shunt/series/compound)',
      'Synchronous',
    ],
    correctAnswer: 2,
    explanation:
      'Self-excited generators (shunt, series, or compound wound) use part of the generated output to supply their own field windings, whereas separately excited generators require an external DC supply for the field.',
  },
  {
    id: 6,
    question: 'During regenerative braking of a DC motor, the machine operates as a:',
    options: [
      'Motor absorbing power',
      'Generator returning power to the supply',
      'Transformer',
      'Resistive load',
    ],
    correctAnswer: 1,
    explanation:
      "During regenerative braking, the motor's inertia keeps it spinning faster than the equivalent supply-driven speed, so it generates EMF greater than the supply voltage and feeds current back to the supply as a generator.",
  },
  {
    id: 7,
    question: 'Which DC motor type is most commonly used in modern lift/elevator applications?',
    options: [
      'Series wound DC motor',
      'Shunt wound DC motor',
      'Gearless permanent magnet synchronous motor (PMSM)',
      'Compound DC motor',
    ],
    correctAnswer: 2,
    explanation:
      'Modern lifts predominantly use gearless permanent magnet synchronous motors (PMSM) with variable frequency drives. Traditional DC motors were common historically but are now mainly found in older installations.',
  },
  {
    id: 8,
    question: 'What is the back-EMF in a DC motor?',
    options: [
      'The voltage drop across brush resistance',
      'The voltage induced in the armature opposing the supply voltage',
      'The voltage across the field winding',
      'The starting voltage required',
    ],
    correctAnswer: 1,
    explanation:
      'Back-EMF (counter-EMF) is the voltage generated in the rotating armature that opposes the applied voltage. It limits armature current and is proportional to speed: E = V - IaRa. At startup, back-EMF is zero so starting current is very high.',
  },
  {
    id: 9,
    question:
      'In a BLDC motor, what provides the commutation function that brushes perform in conventional DC motors?',
    options: [
      'A mechanical commutator',
      'Electronic switching via Hall sensors or sensorless control',
      'Slip rings',
      'A gearbox',
    ],
    correctAnswer: 1,
    explanation:
      'BLDC motors use electronic commutation where transistors switch stator windings based on rotor position feedback from Hall effect sensors or back-EMF detection (sensorless), eliminating mechanical brushes.',
  },
  {
    id: 10,
    question: 'A compound DC motor combines which characteristics?',
    options: [
      'AC and DC operation',
      'High starting torque of series and good speed regulation of shunt',
      'Synchronous and induction motor features',
      'Single-phase and three-phase operation',
    ],
    correctAnswer: 1,
    explanation:
      'Compound motors have both series and shunt field windings, combining high starting torque (series characteristic) with reasonable speed regulation under varying load (shunt characteristic). Used in cranes, hoists, and presses.',
  },
];

const faqs = [
  {
    question: 'Why are DC motors still used when AC motors are more common?',
    answer:
      'DC motors offer inherently simple speed control (varying armature voltage), high starting torque (series types), and precise speed regulation. They remain in use for lifts, cranes, traction (older trains), battery-powered vehicles, and applications requiring fine speed control. However, modern variable frequency drives have made AC motors competitive in most applications.',
  },
  {
    question: 'What causes brush wear and how is it minimised?',
    answer:
      'Brush wear results from mechanical friction against the commutator and electrical erosion from sparking during commutation. Wear is minimised by: proper brush grade selection (carbon/graphite composition), correct spring tension, good commutation (interpoles), proper brush alignment, and keeping the commutator clean and concentric.',
  },
  {
    question: 'How does a four-quadrant DC drive work?',
    answer:
      'A four-quadrant drive can operate in all four combinations of rotation direction and torque direction: forward motoring, forward braking (regenerative), reverse motoring, and reverse braking. This is achieved using a fully controlled thyristor or IGBT converter that can reverse both voltage polarity and current direction.',
  },
  {
    question: 'What is the difference between dynamic and regenerative braking?',
    answer:
      'Dynamic braking dissipates kinetic energy as heat in resistors connected across the armature when the motor acts as a generator. Regenerative braking returns this energy to the supply, which is more efficient but requires a supply that can accept power (or a battery in DC systems). Lifts commonly use regenerative braking when descending with heavy loads.',
  },
  {
    question: 'Why do BLDC motors require electronic controllers?',
    answer:
      'BLDC motors have permanent magnet rotors and wound stators (opposite to brushed DC). Without brushes and a commutator to mechanically switch current to the appropriate windings, an electronic controller must sense rotor position and sequentially energise the stator phases to maintain rotation - a process called electronic commutation.',
  },
  {
    question: 'What building services applications still use DC motors?',
    answer:
      'DC motors are found in: older lift installations (Ward-Leonard systems), some legacy HVAC damper actuators, battery-powered emergency systems, UPS-powered critical equipment, golf carts and industrial trucks, and older cranes/hoists. New installations typically use AC motors with VFDs or BLDC motors.',
  },
];

const HNCModule3Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 5 · Subsection 6"
            title="DC machines (types, control, applications)"
            description="Understanding DC motor and generator principles, control methods, and their role in building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You meet DC machines mostly in legacy contexts &mdash; pre-1990 lift gear (Ward-Leonard sets), battery-driven golf-cart-style maintenance vehicles, and small permanent-magnet DC servos.',
              'You distinguish series (high starting torque, runs away on no load), shunt (constant speed) and compound (compromise) wound-field DC motors.',
              'You assess legacy DC lift gear for replacement with PMSM + VSD &mdash; almost always more efficient, easier to service, and brings the building under modern lift code (BS EN 81-50/-20).',
              'You recognise the DC link bus inside every modern AC VSD &mdash; understand DC fault-current behaviour and DC-rated isolation requirements (BS EN 60947-3).',
            ]}
          />

          <RegsCallout
            source="BS EN 81-20 — Safety rules for the construction and installation of lifts (electric lifts)"
            clause="Where a lift is being modernised, the new electrical installation shall comply with the relevant requirements of BS EN 81-20 and BS EN 81-50 for the components, including drive system, traction machine, controller and final circuits, including BS 7671 for the supply and protection arrangements."
            meaning={
              <>
                Almost every legacy DC lift you encounter as a BSE engineer is a
                modernisation candidate &mdash; the cost of replacement parts for old
                Ward-Leonard sets, brush gear and rotary commutators usually exceeds the
                whole-lift PMSM + VSD upgrade price. Doing so brings the lift under
                BS EN 81-20/-50 and gains 40&ndash;60 % energy improvement.
              </>
            }
            cite="Source: BS EN 81-20 / BS EN 81-50 (lift safety, modernisation); BS 7671:2018+A4:2026 Section 717 (supply for lifts); BS EN 60947-3 (DC isolators); BS EN 60204-32 (machinery DC supply)"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Series motors:</strong> High starting torque, speed varies with load</li>
              <li><strong>Shunt motors:</strong> Constant speed, good regulation</li>
              <li><strong>Compound motors:</strong> Combine series and shunt characteristics</li>
              <li><strong>BLDC:</strong> Electronic commutation, maintenance-free</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Lifts:</strong> Historically DC, now PMSM with VFD</li>
              <li><strong>Legacy HVAC:</strong> Older damper actuators and fans</li>
              <li><strong>Battery systems:</strong> UPS, emergency equipment</li>
              <li><strong>BLDC fans:</strong> EC motors in modern ventilation</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="DC Motor Construction and Operation">
            <p>
              DC machines are rotating electrical machines that can operate as either motors
              (converting electrical energy to mechanical) or generators (converting mechanical
              energy to electrical). Their construction comprises stationary field poles and a
              rotating armature with a commutator.
            </p>

              <p className="text-sm font-medium text-white">Key Components</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Stator (field system):</strong> Provides the main magnetic field via
                  electromagnets or permanent magnets
                </li>
                <li>
                  <strong>Rotor (armature):</strong> Carries the armature windings that produce
                  torque when carrying current
                </li>
                <li>
                  <strong>Commutator:</strong> Segmented copper cylinder that reverses current
                  direction in armature coils
                </li>
                <li>
                  <strong>Brushes:</strong> Carbon blocks that conduct current to/from the rotating
                  commutator
                </li>
                <li>
                  <strong>Interpoles:</strong> Small poles between main poles to improve commutation
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Fundamental Motor Equations
              </p>

                
                  <p><strong>
                    E = V - I<sub>a</sub>R<sub>a</sub>
                  </strong></p>
                  <p>Back-EMF relationship</p>

                
                  <p><strong>
                    E = k<sub>e</sub> x phi x n
                  </strong></p>
                  <p>
                    EMF proportional to flux and speed
                  </p>

                
                  <p><strong>
                    T = k<sub>t</sub> x phi x I<sub>a</sub>
                  </strong></p>
                  <p>
                    Torque proportional to flux and current
                  </p>

                
                  <p><strong>
                    n = (V - I<sub>a</sub>R<sub>a</sub>) / (k<sub>e</sub> x phi)
                  </strong></p>
                  <p>Speed equation</p>

              

            <p>
              <strong>Remember:</strong> At startup, back-EMF is zero so armature current is limited
              only by winding resistance. Starters or electronic control are essential to limit
              inrush current.
            </p>
          </ConceptBlock>

          <ConceptBlock title="DC Motor Types - Series, Shunt, and Compound">
            <p>
              DC motors are classified by how the field winding is connected relative to the
              armature. This configuration determines the motor's speed-torque characteristics and
              suitability for different applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                DC Motor Types Comparison
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Series</strong> — Field in series with armature — Very high starting torque, speed varies inversely with load, can runaway at no load — Traction, cranes, hoists, starter motors</li>
              <li><strong>Shunt</strong> — Field in parallel with armature — Nearly constant speed, good regulation, moderate starting torque — Machine tools, pumps, fans, conveyors</li>
              <li><strong>Compound (cumulative)</strong> — Both series and shunt fields — High starting torque with better speed regulation than series — Lifts, presses, rolling mills</li>
              <li><strong>Separately excited</strong> — Field from separate DC supply — Excellent speed control, linear characteristics — Precision drives, Ward-Leonard systems</li>
              <li><strong>Permanent magnet</strong> — PM field (no field winding) — Similar to shunt, compact, efficient at small sizes — Small fans, automotive, battery tools</li>
            </ul>

              <p className="text-sm font-medium text-red-400 mb-1">Series Motor Safety Warning</p>
              <p>
                Never operate a series motor without mechanical load directly coupled. If load is
                removed (e.g., belt breaks), the motor will accelerate to destructive speeds. Series
                motors must have direct coupling, not belt drives, and load-sensing protection.
              </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Speed-Torque Characteristics">
            <p>
              The speed-torque curve defines how a motor's speed changes with mechanical load.
              Understanding these characteristics is essential for matching motors to applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Characteristic Curves</p>

                
                  <p className="font-medium text-elec-yellow mb-2">Series Motor</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Hyperbolic speed-torque curve</li>
                    <li>Speed drops significantly with load</li>
                    <li>Very high torque at low speed</li>
                    <li>
                      Torque proportional to I<sup>2</sup>
                    </li>
                  </ul>

                
                  <p className="font-medium text-elec-yellow mb-2">Shunt Motor</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Nearly flat speed-torque curve</li>
                    <li>Speed drops 5-10% from no load to full load</li>
                    <li>Constant field flux</li>
                    <li>
                      Torque proportional to I<sub>a</sub>
                    </li>
                  </ul>

                
                  <p className="font-medium text-elec-yellow mb-2">Compound Motor</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Curve between series and shunt</li>
                    <li>Good starting torque</li>
                    <li>Better speed regulation than series</li>
                    <li>No runaway risk at no load</li>
                  </ul>

              

              <p className="text-sm font-medium text-white">Speed Regulation</p>

                <p>
                  Speed regulation = (N<sub>no-load</sub> - N<sub>full-load</sub>) / N
                  <sub>full-load</sub> x 100%
                </p>
                <p>Typical values:</p>
                <p>Series motor: 20-50% (poor)</p>
                <p>Shunt motor: 5-10% (good)</p>
                <p>Compound motor: 10-25% (moderate)</p>

            

            <p>
              <strong>Application matching:</strong> Lifts require high starting torque
              (compound/series) while machine tools need constant speed (shunt). Modern drives can
              modify characteristics electronically.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Armature Reaction and Commutation">
            <p>
              Armature reaction is the effect of the magnetic field produced by armature current on
              the main field flux. Understanding this phenomenon is critical for proper machine
              operation and maintenance.
            </p>

              <p className="text-sm font-medium text-white">Armature Reaction Effects</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Field distortion:</strong> Main flux is distorted, strengthened at one
                  pole tip and weakened at the other
                </li>
                <li>
                  <strong>MNA shift:</strong> Magnetic neutral axis shifts in the direction of
                  rotation (motor) or opposite (generator)
                </li>
                <li>
                  <strong>Reduced flux:</strong> Cross-magnetising effect can reduce effective main
                  flux (flux weakening)
                </li>
                <li>
                  <strong>Commutation problems:</strong> If brushes remain on geometric neutral,
                  sparking occurs
                </li>
              </ul>

              
                <p className="font-medium text-elec-yellow mb-2">Commutation Process</p>
                <p>
                  As each armature coil passes under the brushes, current must reverse. Good
                  commutation requires this reversal to be complete before the coil leaves the brush
                  contact.
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Under-commutation: current reversal incomplete, trailing sparks</li>
                  <li>Over-commutation: current reverses too fast, leading sparks</li>
                  <li>Ideal: sparkless, linear current reversal</li>
                </ul>

              
                <p className="font-medium text-elec-yellow mb-2">Improving Commutation</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Interpoles (commutating poles):</strong> Small poles between main poles
                    produce flux that opposes armature MMF in the commutation zone
                  </li>
                  <li>
                    <strong>Compensating windings:</strong> Windings in main pole faces cancel
                    armature reaction
                  </li>
                  <li>
                    <strong>Brush shift:</strong> Older method - move brushes to new neutral axis
                    (varies with load)
                  </li>
                  <li>
                    <strong>High-resistance brushes:</strong> Reduce circulating current in
                    commutating coils
                  </li>
                </ul>

            

            <p>
              <strong>Maintenance note:</strong> Brush sparking indicates commutation problems.
              Check brush pressure, commutator condition, interpole gaps, and ensure brushes are on
              the correct neutral axis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Speed Control Methods">
            <p>
              DC motors offer excellent speed control capabilities. The fundamental speed equation n
              = (V - I<sub>a</sub>R<sub>a</sub>) / (k x phi) shows three methods: armature voltage,
              armature resistance, and field flux control.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Speed Control Methods Comparison
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Armature voltage (PWM)</strong> — Vary V<sub>a</sub> from 0 to rated — 0 to base speed — High (90%+)</li>
              <li><strong>Field weakening</strong> — Reduce field current (increase If rheostat) — Base speed to 2-3x base — High</li>
              <li><strong>Armature resistance</strong> — Add resistance in armature circuit — 0 to base speed — Low (I<sup>2</sup>R losses)</li>
              <li><strong>Ward-Leonard</strong> — Motor-generator set with field control — Full range, reversible — Moderate (3 machines)</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Modern DC Drives (PWM Converters)
              </p>
              <p>
                Modern DC drives use thyristor or IGBT converters to provide smooth, efficient speed
                control.
              </p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Single-quadrant drive</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Forward motoring only</li>
                    <li>Simple half-controlled converter</li>
                    <li>Fans, pumps, conveyors</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Four-quadrant drive</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Both directions, motoring and braking</li>
                    <li>Fully controlled dual converter</li>
                    <li>Lifts, cranes, winders</li>
                  </ul>

              

            <p>
              <strong>Base speed concept:</strong> Armature voltage control gives constant torque
              below base speed. Field weakening above base speed gives constant power (torque
              reduces as speed increases).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="DC Generators and Excitation">
            <p>
              DC generators produce direct current from mechanical input. While largely superseded
              by AC generation with rectification, understanding DC generator principles is
              essential for maintenance of existing systems and for understanding motor operation in
              regenerative mode.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                DC Generator Excitation Types
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Separately excited</strong> — External DC source — Drops slightly with load — Ward-Leonard systems</li>
              <li><strong>Self-excited shunt</strong> — From own output (parallel) — Relatively constant — General purpose DC supply</li>
              <li><strong>Self-excited series</strong> — From own output (series) — Rises with load — Arc welding, boosters</li>
              <li><strong>Compound (level)</strong> — Both series and shunt — Flat (series compensates drop) — Automotive (historically)</li>
            </ul>

              <p className="text-sm font-medium text-white">
                Build-up of Self-Excited Generators
              </p>
              <p>
                Self-excited generators rely on residual magnetism in the poles to begin voltage
                generation. Conditions for successful build-up:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Residual magnetism:</strong> Must exist in poles (if lost, flash field
                  from external DC)
                </li>
                <li>
                  <strong>Correct field polarity:</strong> Field current must strengthen residual
                  flux, not oppose it
                </li>
                <li>
                  <strong>Field resistance:</strong> Must be below critical value where OCC and
                  field line intersect
                </li>
                <li>
                  <strong>Sufficient speed:</strong> Prime mover must drive above minimum required
                  speed
                </li>
              </ul>

            <p>
              <strong>Maintenance tip:</strong> If a self-excited generator fails to build up
              voltage, check for loss of residual magnetism. A brief application of DC to the field
              (flashing) can restore it.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Brushless DC Motors (BLDC)">
            <p>
              BLDC motors are essentially "inside-out" DC motors with permanent magnets on the rotor
              and windings on the stator. Electronic commutation replaces mechanical brushes and
              commutator, offering significant advantages in reliability and efficiency.
            </p>

              
                <p className="text-sm font-medium text-elec-yellow/80">BLDC Construction</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Rotor:</strong> Permanent magnets (NdFeB or ferrite)
                  </li>
                  <li>
                    <strong>Stator:</strong> Three-phase windings (typically)
                  </li>
                  <li>
                    <strong>Position sensing:</strong> Hall effect sensors or back-EMF
                  </li>
                  <li>
                    <strong>Controller:</strong> Inverter switches stator phases
                  </li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Advantages over Brushed DC
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>No brush wear - minimal maintenance</li>
                  <li>No commutator arcing - longer life</li>
                  <li>Better heat dissipation (heat in stator)</li>
                  <li>Higher power density and efficiency</li>
                  <li>Suitable for cleanroom/hazardous areas</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">Electronic Commutation</p>
              <p>
                The controller must know rotor position to energise the correct stator phases. Two
                methods:
              </p>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Sensored (Hall sensors)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Three Hall sensors 120 degrees apart</li>
                    <li>Provide position signal at all speeds</li>
                    <li>Works from zero speed</li>
                    <li>Higher cost, sensor can fail</li>
                  </ul>

                
                  <p className="text-sm font-medium text-elec-yellow/80">Sensorless (back-EMF)</p>
                  <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                    <li>Detects back-EMF zero crossings</li>
                    <li>No position sensors needed</li>
                    <li>Cannot work at zero/low speed</li>
                    <li>Lower cost, more reliable</li>
                  </ul>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                BLDC in Building Services
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>EC fans:</strong> Electronically commutated fans for HVAC - high
                  efficiency, variable speed
                </li>
                <li>
                  <strong>Pumps:</strong> Circulator pumps with integrated BLDC motors
                </li>
                <li>
                  <strong>Refrigeration:</strong> Compressor motors in inverter-driven systems
                </li>
                <li>
                  <strong>Automation:</strong> Actuators and positioning systems
                </li>
              </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Regenerative Braking">
            <p>
              Regenerative braking recovers kinetic energy by operating the motor as a generator,
              returning electrical energy to the supply or storing it in batteries. This is a key
              energy-saving feature in lifts, cranes, and electric vehicles.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Types of Electric Braking
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Regenerative</strong> — Back-EMF exceeds supply, motor becomes generator — Returned to supply/battery — Lifts, EVs, trains</li>
              <li><strong>Dynamic (rheostatic)</strong> — Armature connected to resistors, motor generates — Dissipated as heat — Cranes, older lifts</li>
              <li><strong>Plugging (counter-current)</strong> — Supply polarity reversed while running — High dissipation in motor — Emergency stops (rare)</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Regeneration in Lifts</p>
              <p>
                Lift systems regenerate energy in two scenarios:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Descending with heavy load:</strong> Gravitational potential energy
                  converted to electrical
                </li>
                <li>
                  <strong>Ascending with light load:</strong> Counterweight descends, providing
                  regeneration
                </li>
              </ul>
              <p className="text-sm text-white mt-2">
                Energy can be fed back to the building supply, stored in batteries/supercapacitors,
                or dissipated in braking resistors if regeneration is not possible.
              </p>

              <p className="text-sm font-medium text-white">Four-Quadrant Operation</p>

                <p>Quadrant 1: Forward motoring (positive speed, positive torque)</p>
                <p>Quadrant 2: Forward braking/regenerating (positive speed, negative torque)</p>
                <p>Quadrant 3: Reverse motoring (negative speed, negative torque)</p>
                <p>Quadrant 4: Reverse braking/regenerating (negative speed, positive torque)</p>

            

            <p>
              <strong>Energy savings:</strong> Modern regenerative lift drives can recover 20-40% of
              motor energy, significantly reducing building energy consumption compared to
              non-regenerative systems.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: DC Motor Starting Current
              </p>
              <p>
                <strong>Question:</strong> A 230V DC shunt motor has an armature resistance of 0.5
                ohm and draws 20A at full load when running at 1200 rpm. Calculate (a) the back-EMF
                at full load, and (b) the starting current if connected directly to supply.
              </p>

                <p>(a) Back-EMF at full load:</p>
                <p>
                  E = V - I<sub>a</sub>R<sub>a</sub>
                </p>
                <p>
                  E = 230 - (20 x 0.5) = 230 - 10 = <strong>220V</strong>
                </p>
                <p>(b) Starting current (back-EMF = 0 at standstill):</p>
                <p>
                  I<sub>start</sub> = V / R<sub>a</sub>
                </p>
                <p>
                  I<sub>start</sub> = 230 / 0.5 = <strong>460A</strong>
                </p>
                <p>
                  This is 23x full-load current - a starter is essential!
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Speed Control by Field Weakening
              </p>
              <p>
                <strong>Question:</strong> A DC shunt motor runs at 1000 rpm with full field
                current. If the field current is reduced to 80% of its original value, calculate the
                new speed (assuming constant armature current and negligible armature resistance
                drop).
              </p>

                <p>Speed is inversely proportional to field flux:</p>
                <p>
                  n<sub>2</sub> / n<sub>1</sub> = phi<sub>1</sub> / phi<sub>2</sub>
                </p>
                <p>
                  If phi<sub>2</sub> = 0.8 x phi<sub>1</sub>:
                </p>
                <p>
                  n<sub>2</sub> = n<sub>1</sub> x (phi<sub>1</sub> / phi<sub>2</sub>)
                </p>
                <p>
                  n<sub>2</sub> = 1000 x (1 / 0.8)
                </p>
                <p>
                  n<sub>2</sub> = <strong>1250 rpm</strong>
                </p>
                <p>
                  Field weakening increases speed above base value
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: Regenerative Braking Power
              </p>
              <p>
                <strong>Question:</strong> A lift DC motor rated at 15kW is descending with a heavy
                load, regenerating at 80% of rated power. If the DC bus voltage is 600V and losses
                are 5%, calculate the power returned to the supply.
              </p>

                <p>Regenerated mechanical power:</p>
                <p>
                  P<sub>regen</sub> = 0.8 x 15kW = 12kW
                </p>
                <p>Power returned (after 5% losses):</p>
                <p>
                  P<sub>return</sub> = 12kW x 0.95 = <strong>11.4kW</strong>
                </p>
                <p>Current fed back to supply:</p>
                <p>
                  I = P / V = 11400 / 600 = <strong>19A</strong>
                </p>
                <p>
                  This current flows back into the supply or to other loads
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">
                DC Motor Maintenance Checklist
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Brushes:</strong> Check wear, spring tension, freedom of movement in
                  holders
                </li>
                <li>
                  <strong>Commutator:</strong> Inspect for scoring, burning, out-of-round, high mica
                </li>
                <li>
                  <strong>Interpoles:</strong> Check air gaps are equal and within specification
                </li>
                <li>
                  <strong>Bearings:</strong> Listen for noise, check temperature, lubrication
                </li>
                <li>
                  <strong>Windings:</strong> Measure insulation resistance, check for overheating
                  signs
                </li>
                <li>
                  <strong>Connections:</strong> Tighten all terminals, check for corrosion
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Key Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Back-EMF:</strong> E = V - I<sub>a</sub>R<sub>a</sub>
                </li>
                <li>
                  <strong>Torque:</strong> T = k<sub>t</sub> x phi x I<sub>a</sub>
                </li>
                <li>
                  <strong>Speed:</strong> n = (V - I<sub>a</sub>R<sub>a</sub>) / (k x phi)
                </li>
                <li>
                  <strong>Power:</strong> P = E x I<sub>a</sub> = T x omega
                </li>
                <li>
                  <strong>Speed regulation:</strong> (N<sub>nl</sub> - N<sub>fl</sub>) / N
                  <sub>fl</sub> x 100%
                </li>
              </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">DC Motor Types</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Series: High torque, variable speed, no-load runaway</li>
                  <li>Shunt: Constant speed, moderate torque</li>
                  <li>Compound: Combines both characteristics</li>
                  <li>PM/BLDC: Efficient, maintenance-free</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Speed Control</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Armature voltage: 0 to base speed</li>
                  <li>Field weakening: Base to 2-3x base</li>
                  <li>PWM drives: Efficient, smooth control</li>
                  <li>Four-quadrant: Full motoring/braking</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="1970s lift modernisation &mdash; DC Ward-Leonard to PMSM + VSD"
            situation={
              <>
                A 12-storey commercial building has two passenger lifts dating from 1973
                with DC Ward-Leonard control (3-phase induction motor &rarr; DC generator
                &rarr; DC traction motor). Spares are increasingly hard to source and
                annual energy consumption per lift is ~38,000 kWh. The lift contractor
                quotes a like-for-like rebuild at &pound;42k or a full PMSM + VSD
                modernisation at &pound;110k.
              </>
            }
            whatToDo={
              <>
                Recommend the PMSM + VSD upgrade. Reasoning: (a) Energy &mdash; PMSM +
                regenerative VSD typically halves lift energy, ~19,000 kWh/year saved
                per lift = ~&pound;3,800 per lift per year &rarr; ~5 year payback on
                the differential; (b) brings the lift under BS EN 81-20/-50 which is
                required for any insurance and DDA / Equality Act compliance;
                (c) eliminates rotary commutator brush maintenance; (d) regen back into
                the busbar offsets other building load. Document the lifecycle case to
                the building owner.
              </>
            }
            whyItMatters={
              <>
                Most BSE engineers will encounter at least one DC lift modernisation in
                their career. The HNC understanding of DC machine principles is what
                lets you intelligently challenge the contractor&rsquo;s &ldquo;like for
                like&rdquo; default and unlock the larger but more cost-effective
                upgrade.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'DC machines: armature (rotor) carries current via brushes &amp; commutator; field (stator) provides flux.',
              'Series motor: armature and field in series &mdash; high starting torque, speed varies inversely with load (will overspeed on no load).',
              'Shunt motor: field across the supply &mdash; nearly constant speed, modest starting torque.',
              'Compound motor: blend of series and shunt &mdash; combines starting torque with speed regulation.',
              'Speed control: armature voltage (zero to base speed); field weakening (above base speed).',
              'PWM DC drives provide four-quadrant operation (motoring + braking in both directions) &mdash; standard on modern DC servos and battery-driven equipment.',
              'BS EN 81-20/-50 is the modern lift safety standard; legacy DC Ward-Leonard sets are normally modernised to PMSM + VSD on refurbishment.',
              'Every AC VSD has an internal DC link &mdash; design DC isolation to BS EN 60947-3, observe DC capacitor discharge time before maintenance.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Synchronous machines – principles and uses
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-7")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Starting and speed control methods for motors
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_6;
