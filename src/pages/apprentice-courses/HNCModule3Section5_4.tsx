/**
 * Module 3 · Section 5 · Subsection 4 — Induction Motors (Construction, Operation, Performance)
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   Squirrel-cage and wound-rotor induction motors — slip, torque-speed,
 *   starting current, IE class, NEMA design code. The workhorse motor of every
 *   BSE installation, from supply fans to chiller compressors.
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

const TITLE = 'Induction Motors (Construction, Operation, Performance) - HNC Module 3 Section 5.4';
const DESCRIPTION =
  'Master three-phase induction motor principles: squirrel cage vs wound rotor construction, rotating magnetic field theory, slip calculations, torque-speed characteristics and building services applications.';

const quickCheckQuestions = [
  {
    id: 'sync-speed',
    question: 'What is the synchronous speed of a 4-pole motor on a 50Hz supply?',
    options: [
      '1500 rev/min',
      '1000 rev/min',
      '3000 rev/min',
      '750 rev/min',
    ],
    correctIndex: 0,
    explanation:
      'Synchronous speed ns = (120 x f) / p = (120 x 50) / 4 = 1500 rev/min. The motor runs slightly slower than this due to slip.',
  },
  {
    id: 'slip-calc',
    question: 'A 4-pole, 50Hz motor runs at 1440 rev/min. What is the slip?',
    options: [
      '2%',
      '6%',
      '5%',
      '4%',
    ],
    correctIndex: 3,
    explanation:
      'Slip s = (ns - nr) / ns = (1500 - 1440) / 1500 = 60/1500 = 0.04 = 4%. This is typical for a fully loaded motor.',
  },
  {
    id: 'starting-current',
    question:
      'A motor has a full load current of 25A. What starting current would you expect with DOL starting?',
    options: [
      '75-100A',
      '150-200A',
      '25-50A',
      '250-300A',
    ],
    correctIndex: 1,
    explanation:
      'DOL starting current is typically 6-8 times FLC. For 25A FLC: 25 x 6 = 150A to 25 x 8 = 200A. This is why reduced voltage starting methods are used for larger motors.',
  },
  {
    id: 'rotor-type',
    question: 'Which rotor type is most commonly used in HVAC applications?',
    options: [
      'Cylindrical',
      'Wound rotor',
      'Squirrel cage',
      'Salient pole',
    ],
    correctIndex: 2,
    explanation:
      'Squirrel cage rotors dominate HVAC applications due to their robust construction, low maintenance, and cost-effectiveness. They have no brushes, slip rings, or external rotor connections.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What creates the rotating magnetic field in a three-phase induction motor?',
    options: [
      'To identify achievable credits and evidence requirements early in design',
      'Three-phase currents in spatially displaced stator windings',
      'The building\\\\\\\'s responsible person (employer, owner or occupier)',
      'Creates opportunities and support networks',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase currents displaced by 120 degrees, flowing through windings physically displaced by 120 degrees, create a smoothly rotating magnetic field at synchronous speed.',
  },
  {
    id: 2,
    question: 'Why must the rotor of an induction motor run slower than synchronous speed?',
    options: [
      'Using reclaimed and refurbished components where standards permit',
      'Work completed, problems encountered, materials used, and time spent',
      'To allow relative motion between rotor and field, inducing rotor current',
      'Tax relief on business equipment and vehicle purchases spread over time',
    ],
    correctAnswer: 2,
    explanation:
      'If the rotor ran at synchronous speed, there would be no relative motion between the rotor conductors and the rotating field. No relative motion means no induced EMF, no rotor current, and therefore no torque.',
  },
  {
    id: 3,
    question: 'A 2-pole motor operates on a 50Hz supply. Calculate the synchronous speed.',
    options: [
      '1000 rev/min',
      '1500 rev/min',
      '750 rev/min',
      '3000 rev/min',
    ],
    correctAnswer: 3,
    explanation:
      'ns = (120 x f) / p = (120 x 50) / 2 = 3000 rev/min. Two-pole motors have the highest synchronous speed for a given frequency.',
  },
  {
    id: 4,
    question: 'At what point on the torque-speed curve is maximum torque developed?',
    options: [
      'At the pull-out point (typically 20-30% slip)',
      'Detailed justification and assessment of equivalent safety',
      'To level the tower on slightly uneven ground',
      'Decreases UGR (better glare control)',
    ],
    correctAnswer: 0,
    explanation:
      'Maximum (breakdown) torque occurs at the pull-out point, typically at 20-30% slip. Beyond this point, increasing slip reduces torque and the motor stalls.',
  },
  {
    id: 5,
    question: 'What is the typical power factor of an induction motor at no load?',
    options: [
      '0.85 lagging',
      '0.2-0.3 lagging',
      '0.95 lagging',
      '0.5 lagging',
    ],
    correctAnswer: 1,
    explanation:
      'At no load, the motor draws mainly magnetising current with very little active power component. Power factor is very low (0.2-0.3 lagging) and improves significantly as load increases.',
  },
  {
    id: 6,
    question: 'What does the efficiency class IE3 indicate on a motor nameplate?',
    options: [
      'Standard efficiency',
      'High efficiency',
      'Premium efficiency',
      'Super premium efficiency',
    ],
    correctAnswer: 2,
    explanation:
      'IE3 indicates Premium Efficiency per IEC 60034-30-1. IE1 = Standard, IE2 = High, IE3 = Premium, IE4 = Super Premium. Building services should specify IE3 minimum for energy efficiency.',
  },
  {
    id: 7,
    question: "A motor nameplate shows 'Duty: S1'. What does this mean?",
    options: [
      'Intermittent duty with starting',
      'Periodic duty with braking',
      'Short-time duty',
      'Continuous running duty',
    ],
    correctAnswer: 3,
    explanation:
      'S1 indicates continuous running duty - the motor can run indefinitely at rated load. HVAC fans and pumps typically require S1 duty rating.',
  },
  {
    id: 8,
    question:
      'Why might a wound rotor motor be specified instead of squirrel cage for a large pump?',
    options: [
      'Reduced starting current and adjustable starting torque',
      'Stairwells are key escape routes requiring continuous illumination',
      'It is still valid and they can apply for a card',
      'Minimum distance after a reflective event where loss can be measured',
    ],
    correctAnswer: 0,
    explanation:
      'Wound rotor motors allow external resistance to be added to the rotor circuit, reducing starting current and providing high starting torque. This is valuable for large pumps where supply limitations exist.',
  },
  {
    id: 9,
    question:
      'An AHU fan motor draws 45A at full load with 0.85 power factor. What is the apparent power on 400V three-phase?',
    options: [
      '15.3 kVA',
      '31.2 kVA',
      '26.5 kVA',
      '45.0 kVA',
    ],
    correctAnswer: 1,
    explanation:
      'S = root3 x VL x IL = 1.732 x 400 x 45 = 31,177 VA = 31.2 kVA. The power factor determines the real power: P = S x pf = 31.2 x 0.85 = 26.5 kW.',
  },
  {
    id: 10,
    question: 'What is the primary advantage of using a VSD with an HVAC fan motor?',
    options: [
      'Related to phase conductor size per Table 54.7 or calculation',
      'Remove from service and arrange repair or replacement',
      'Energy savings through speed control matching actual demand',
      'Clients increasingly ask for systems that integrate with BMS',
    ],
    correctAnswer: 2,
    explanation:
      'VSDs allow fan speed to match actual airflow demand. Since fan power varies with the cube of speed, reducing speed by 20% reduces power by approximately 50%. This delivers significant energy savings in variable load HVAC systems.',
  },
];

const faqs = [
  {
    question: 'Why is slip essential for induction motor operation?',
    answer:
      'Slip is the relative speed difference between the rotating magnetic field and the rotor. Without slip, rotor conductors would not cut through magnetic flux lines, so no EMF would be induced in the rotor. No EMF means no rotor current, and without rotor current there can be no torque. The motor self-regulates: as load increases, speed drops, slip increases, more current is induced, and more torque is produced.',
  },
  {
    question: 'How do I size a motor for a centrifugal pump or fan?',
    answer:
      'Calculate the mechanical power required: for pumps P = (Q x H x rho x g) / eta, for fans P = (Q x deltaP) / eta. Add a service factor (typically 1.1-1.25) to account for uncertainties and ensure the motor is not continuously overloaded. Select the next standard motor size up from your calculated requirement. Check that starting torque exceeds the load torque at all speeds.',
  },
  {
    question: 'What causes poor power factor in induction motors?',
    answer:
      'Induction motors require magnetising current to establish the rotating magnetic field. This magnetising current is reactive (lagging) and does not contribute to mechanical power output. At light loads, magnetising current dominates, giving very poor power factor (0.2-0.4). At full load, the active current component increases, improving power factor to typically 0.85-0.9. Oversized motors operating at light load have chronically poor power factor.',
  },
  {
    question: 'When should I specify a wound rotor motor over squirrel cage?',
    answer:
      'Wound rotor motors are specified when: (1) starting current must be limited due to supply constraints, (2) high starting torque is required for high-inertia loads, (3) speed control via rotor resistance is acceptable, or (4) the application involves frequent starting and stopping. However, modern VSDs have largely replaced wound rotor motors for most applications as they offer better control with squirrel cage motors.',
  },
  {
    question: 'How do I interpret motor nameplate data for building services design?',
    answer:
      'Key parameters: rated power (kW), voltage (400V for three-phase UK), full load current (for cable sizing), efficiency class (IE3 minimum for new installations), power factor (for supply sizing), speed (determines pole number and slip), duty type (S1 for continuous HVAC), insulation class (F typical), and IP rating (IP55 minimum for plant rooms). The rated current is particularly important for circuit design - size cables, protection, and switchgear accordingly.',
  },
  {
    question: 'What efficiency class should I specify for HVAC motors?',
    answer:
      'Current EU regulations (Ecodesign Directive) require IE3 minimum for motors 0.75-375 kW in most applications. IE4 (Super Premium) is recommended for motors with long running hours such as main AHU fans and chilled water pumps. The energy savings over the motor lifetime typically justify the higher capital cost within 1-2 years for continuously running motors.',
  },
];

const HNCModule3Section5_4 = () => {
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
            eyebrow="Module 3 · Section 5 · Subsection 4"
            title="Induction motors (construction, operation, performance)"
            description="Construction, operation, performance characteristics and building services applications"
            tone="purple"
          />

          <TLDR
            points={[
              'You select squirrel-cage induction motors for ~95 % of BSE applications &mdash; supply / extract fans, pumps, lift gear, refrigeration compressors.',
              'You apply slip s = (n&#x209b; &minus; n&#x1d63;) / n&#x209b; &mdash; typical 2&ndash;5 % at full load, 100 % at standstill (which is why starting current is 6&ndash;8&times; FLC).',
              'You specify IE3 minimum (IE4 above 75 kW) per Ecodesign Regulation 2019/1781 retained as UK law &mdash; no sub-IE3 motors on new UK installations.',
              'You combine motor selection with starter / VSD selection &mdash; the right motor on the wrong starter still fails the BSE energy-efficiency objective.',
            ]}
          />

          <RegsCallout
            source="Commission Regulation (EU) 2019/1781 (retained as UK law) — Ecodesign requirements for electric motors and variable speed drives"
            clause="From 1 July 2021, three-phase induction motors with a rated output between 0.75 kW and 1000 kW shall meet the IE3 efficiency level. From 1 July 2023, motors between 75 kW and 200 kW shall meet IE4. Variable speed drives placed on the market from 1 July 2021 shall meet IES2 efficiency."
            meaning={
              <>
                The retained Ecodesign motor regulation makes IE3 the legal minimum for
                three-phase induction motors placed on the UK market since 2021, IE4 for
                75&ndash;200 kW since 2023. As the BSE designer you specify motors against
                this benchmark and document compliance in the Part L 2021 / SBEM
                submission. Sub-IE3 motors cannot be supplied for new installations &mdash;
                rejection of non-compliant submissions is normal practice.
              </>
            }
            cite="Source: Commission Regulation (EU) 2019/1781 (retained UK law); BS EN 60034-30-1 (motor IE classes); CIBSE Guide F (energy efficiency)"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Principle:</strong> Rotating magnetic field induces current in rotor</li>
              <li><strong>Slip:</strong> s = (ns - nr) / ns, typically 2-5% at full load</li>
              <li><strong>Starting current:</strong> 6-8 times full load current (DOL)</li>
              <li><strong>Power factor:</strong> Poor at light load, improves with loading</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>HVAC fans:</strong> Squirrel cage with VSD control</li>
              <li><strong>Pumps:</strong> Centrifugal load characteristics</li>
              <li><strong>Compressors:</strong> High starting torque requirements</li>
              <li><strong>Efficiency:</strong> IE3 minimum for new installations</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Motor Construction - Stator and Rotor">
            <p>
              Three-phase induction motors consist of two main components: a stationary stator
              carrying the three-phase windings, and a rotating rotor. The type of rotor
              construction determines the motor's characteristics and applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Stator Construction (Common to Both Types)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Laminated silicon steel core to reduce eddy current losses</li>
                <li>Slots around the inner circumference for windings</li>
                <li>Three-phase windings displaced by 120 electrical degrees</li>
                <li>Windings connected in star or delta configuration</li>
                <li>Terminal box with six terminals for connection flexibility</li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Rotor Types Comparison</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Construction</strong> — Aluminium/copper bars short-circuited by end rings — Three-phase windings connected to slip rings</li>
              <li><strong>External connections</strong> — None - completely enclosed — Slip rings and brushes for external resistance</li>
              <li><strong>Maintenance</strong> — Very low - bearings only — Higher - brushes and slip rings require attention</li>
              <li><strong>Starting current</strong> — High (6-8 x FLC) — Controllable via external resistance</li>
              <li><strong>Starting torque</strong> — Moderate (1.5-2.5 x rated) — High and adjustable</li>
              <li><strong>Speed control</strong> — VSD required for variable speed — Limited control via rotor resistance</li>
              <li><strong>Cost</strong> — Lower — Higher</li>
              <li><strong>Typical applications</strong> — HVAC fans, pumps, general machinery — Cranes, hoists, large compressors</li>
            </ul>

            <p>
              <strong>Building services:</strong> Squirrel cage motors dominate HVAC applications
              (over 90%) due to their reliability, low maintenance, and compatibility with VSDs for
              energy-efficient speed control.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Rotating Magnetic Field Principle">
            <p>
              The rotating magnetic field is the fundamental principle enabling induction motor
              operation. Three-phase currents, displaced by 120 degrees in time, flow through
              windings displaced by 120 degrees in space, creating a magnetic field that rotates at
              synchronous speed.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Synchronous Speed Formula
              </p>
              <p><strong>
                n<sub>s</sub> = (120 x f) / p
              </strong></p>
              <p>
                Where: ns = synchronous speed (rev/min), f = frequency (Hz), p = number of poles
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Synchronous Speeds at 50Hz
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2</strong> — 3000 rev/min — 2850-2950 rev/min — Small pumps, fans</li>
              <li><strong>4</strong> — 1500 rev/min — 1420-1480 rev/min — Most HVAC motors, general purpose</li>
              <li><strong>6</strong> — 1000 rev/min — 940-980 rev/min — Larger fans, cooling towers</li>
              <li><strong>8</strong> — 750 rev/min — 700-740 rev/min — Low-speed applications</li>
            </ul>

              <p className="text-sm font-medium text-white">
                How the rotating field develops:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  At any instant, the three-phase currents have different magnitudes and directions
                </li>
                <li>
                  The resultant magnetic field has constant magnitude but rotates in space
                </li>
                <li>
                  The field completes one revolution per cycle for a 2-pole motor
                </li>
                <li>
                  More poles means more field reversals per revolution, hence lower speed
                </li>
                <li>
                  Reversing any two supply phases reverses the direction of rotation
                </li>
              </ul>

            <p>
              <strong>Key insight:</strong> The rotating field speed depends only on supply
              frequency and number of poles. VSDs control motor speed by varying supply frequency.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Slip - The Essential Speed Difference">
            <p>
              Slip is the relative difference between synchronous speed and actual rotor speed. It
              is essential for motor operation: without slip, no EMF would be induced in the rotor
              conductors and no torque could be produced.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">Slip Formula</p>
              <p><strong>
                s = (n<sub>s</sub> - n<sub>r</sub>) / n<sub>s</sub>
              </strong></p>
              <p>
                Where: s = slip (per-unit or %), ns = synchronous speed, nr = rotor speed
              </p>

              
                <p className="font-bold text-elec-yellow mb-1">No Load</p>
                <p className="text-white">s = 1-2%</p>
                <p className="text-white text-xs">Just enough slip to overcome friction</p>

              
                <p className="font-bold text-elec-yellow mb-1">Full Load</p>
                <p className="text-white">s = 3-5%</p>
                <p className="text-white text-xs">Normal operating range</p>

              
                <p className="font-bold text-elec-yellow mb-1">Starting</p>
                <p className="text-white">s = 100%</p>
                <p className="text-white text-xs">Rotor stationary</p>

            

              <p className="text-sm font-medium text-white">Why slip is essential:</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Rotor conductors must cut through the rotating magnetic field
                </li>
                <li>Relative motion induces EMF in rotor (Faraday's law)</li>
                <li>EMF drives current through the shorted rotor bars</li>
                <li>
                  Rotor current interacts with stator field to produce torque
                </li>
                <li>
                  As load increases, speed drops, slip increases, more torque produced
                </li>
              </ul>

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example: Slip Calculation
              </h3>
              <p>
                <strong>Question:</strong> A 6-pole motor on 50Hz supply runs at 960 rev/min.
                Calculate the slip.
              </p>

                <p>Synchronous speed: ns = (120 x 50) / 6 = 1000 rev/min</p>
                <p>
                  Slip: s = (1000 - 960) / 1000 = 0.04 = <strong>4%</strong>
                </p>
                <p>
                  This indicates the motor is operating near full load
                </p>

            

            <p>
              <strong>Practical note:</strong> Motor nameplate speed indicates the full-load running
              speed, from which you can determine the slip and verify the number of poles.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="Torque-Speed Characteristics">
            <p>
              The torque-speed curve is crucial for understanding motor behaviour under different
              loading conditions and for matching motors to mechanical loads in building services
              applications.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Points on the Torque-Speed Curve
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Starting torque</strong> — s = 1 (100%) — 1.5-2.5 x rated — Motor stationary, maximum slip</li>
              <li><strong>Pull-up torque</strong> — s = 0.6-0.8 — Minimum during acceleration — Must exceed load torque at all speeds</li>
              <li><strong>Breakdown torque</strong> — s = 0.15-0.30 — 2-3 x rated (maximum) — Pull-out point - motor stalls if exceeded</li>
              <li><strong>Full load</strong> — s = 0.03-0.05 — Rated torque — Normal operating point</li>
              <li><strong>No load</strong> — s = 0.01-0.02 — Minimal (friction only) — Near synchronous speed</li>
              <li><strong>Synchronous</strong> — s = 0 — Zero — Theoretical - never reached</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Stable Operating Region
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Between no-load and breakdown torque</li>
                  <li>Torque increases as speed decreases (self-regulating)</li>
                  <li>Motor automatically adjusts to load changes</li>
                  <li>Slight speed droop with increasing load</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Unstable Region</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Below breakdown torque (high slip)</li>
                  <li>Torque decreases as speed decreases</li>
                  <li>Motor stalls if load exceeds breakdown torque</li>
                  <li>Only passed through during starting</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Load Matching in Building Services
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Fans and pumps:</strong> Torque proportional to speed squared (T ~ n
                  squared) - easy starting
                </li>
                <li>
                  <strong>Compressors:</strong> May require high starting torque, often started
                  unloaded
                </li>
                <li>
                  <strong>Conveyors:</strong> Constant torque loads - starting torque must exceed
                  load torque
                </li>
              </ul>

            <p>
              <strong>Design requirement:</strong> Always ensure the motor torque exceeds the load
              torque at all speeds from starting to full load, with adequate margin for voltage
              variations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Starting Current and Starting Methods">
            <p>
              At starting, with the rotor stationary (100% slip), the motor acts like a
              short-circuited transformer. The starting current is typically 6-8 times full load
              current, which has significant implications for supply design and motor protection.
            </p>

              <p className="text-sm font-medium text-red-400 mb-2">Starting Current Impact</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Voltage dip on supply affecting other equipment</li>
                <li>Increased cable sizing requirements</li>
                <li>Higher rated switchgear and protection</li>
                <li>
                  Supply authority limitations (often 100A maximum starting current)
                </li>
                <li>Generator capacity constraints in standby systems</li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Starting Methods Comparison
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct On Line (DOL)</strong> — 6-8 x FLC — 100% — Small motors up to 7.5kW</li>
              <li><strong>Star-Delta</strong> — 2-2.7 x FLC — 33% — Medium motors, light starting loads</li>
              <li><strong>Autotransformer</strong> — Adjustable (40-80%) — Proportional to voltage squared — Large motors, adjustable reduction needed</li>
              <li><strong>Soft Starter</strong> — 2-4 x FLC (adjustable) — Adjustable ramp — Pumps, conveyors, smooth acceleration</li>
              <li><strong>VSD (Variable Speed Drive)</strong> — 1-1.5 x FLC — Up to 150% available — All HVAC applications with speed control</li>
              <li><strong>Wound Rotor (resistance)</strong> — 1.5-2 x FLC — High and adjustable — Cranes, hoists, high-inertia loads</li>
            </ul>

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example: Starting Current
              </h3>
              <p>
                <strong>Question:</strong> A 22kW motor has FLC of 42A. Calculate starting currents
                for DOL and star-delta.
              </p>

                <p>
                  DOL starting current = 7 x 42A = <strong>294A</strong>
                </p>
                <p>
                  Star-delta starting current = 294 / 3 = <strong>98A</strong>
                </p>
                <p>
                  Star-delta reduces current to 1/3 but also reduces torque to 1/3
                </p>

            

            <p>
              <strong>Building services standard:</strong> VSDs are now the preferred starting
              method for HVAC motors as they provide soft starting (low starting current), speed
              control for energy saving, and eliminate the need for star-delta changeover.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="Power Factor Variation with Load">
            <p>
              Induction motors always operate at lagging power factor because they require reactive
              power to establish the rotating magnetic field. The power factor varies significantly
              with load, which has important implications for electrical system design.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Power Factor vs Loading
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>No load</strong> — 0.15-0.30 — Mainly magnetising current (reactive)</li>
              <li><strong>25% load</strong> — 0.50-0.60 — Increasing active power component</li>
              <li><strong>50% load</strong> — 0.70-0.80 — Active and reactive comparable</li>
              <li><strong>75% load</strong> — 0.80-0.88 — Approaching optimum</li>
              <li><strong>100% load</strong> — 0.85-0.92 — Best power factor for the motor</li>
              <li><strong>Overload</strong> — 0.88-0.93 — Slight improvement but not sustainable</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Effects of Poor Power Factor
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Higher current for same real power (I = P / (V x pf))</li>
                  <li>Increased cable and switchgear sizing</li>
                  <li>Higher I squared R losses in cables</li>
                  <li>Reactive power charges from DNO</li>
                  <li>Reduced transformer and generator capacity</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Power Factor Improvement Methods
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Capacitor banks (individual or central)</li>
                  <li>Correct motor sizing (avoid oversizing)</li>
                  <li>High-efficiency motors (better pf)</li>
                  <li>VSDs (some models offer pf correction)</li>
                  <li>Synchronous motors (can provide leading pf)</li>
                </ul>

            

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example: Power Factor Impact
              </h3>
              <p>
                <strong>Question:</strong> A 15kW load at 0.7 pf vs 0.9 pf on 400V three-phase.
                Compare currents.
              </p>

                <p>
                  At 0.7 pf: I = 15000 / (1.732 x 400 x 0.7) = <strong>30.9A</strong>
                </p>
                <p>
                  At 0.9 pf: I = 15000 / (1.732 x 400 x 0.9) = <strong>24.0A</strong>
                </p>
                <p>
                  Improving pf from 0.7 to 0.9 reduces current by 22%
                </p>

            

            <p>
              <strong>Design practice:</strong> Size motors correctly for the expected load. An
              oversized motor running at light load has poor power factor and reduced efficiency - a
              common problem in building services.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Motor Nameplate Data Interpretation">
            <p>
              The motor nameplate contains essential information for installation, protection, and
              circuit design. Understanding this data is critical for building services engineers.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Typical Nameplate Information
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rated power</strong> — 15 kW — Load matching, energy calculations</li>
              <li><strong>Voltage</strong> — 400V Delta / 690V Star — Connection configuration, VSD compatibility</li>
              <li><strong>Full load current</strong> — 28.5A — Cable sizing, protection settings</li>
              <li><strong>Frequency</strong> — 50 Hz — VSD frequency range</li>
              <li><strong>Speed</strong> — 1460 rev/min — Pole number (4-pole), slip calculation</li>
              <li><strong>Efficiency class</strong> — IE3 — Energy performance, regulatory compliance</li>
              <li><strong>Power factor</strong> — 0.86 — Supply sizing, pf correction</li>
              <li><strong>Duty type</strong> — S1 — Continuous (S1), intermittent (S3), etc.</li>
              <li><strong>Insulation class</strong> — F — Maximum winding temperature (155 degrees C)</li>
              <li><strong>IP rating</strong> — IP55 — Protection against dust and water jets</li>
              <li><strong>Frame size</strong> — 160M — Mounting dimensions, replacement</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Efficiency Classes (IEC 60034-30-1)
              </p>

                
                  <p className="font-bold text-white mb-1">IE1</p>
                  <p className="text-white text-xs">Standard</p>

                
                  <p className="font-bold text-white mb-1">IE2</p>
                  <p className="text-white text-xs">High</p>

                
                  <p className="font-bold text-elec-yellow mb-1">IE3</p>
                  <p className="text-white text-xs">Premium (minimum)</p>

                
                  <p className="font-bold text-white mb-1">IE4</p>
                  <p className="text-white text-xs">Super Premium</p>

              

              <p className="text-sm font-medium text-elec-yellow/80">
                Duty Types (IEC 60034-1)
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>S1:</strong> Continuous running duty - standard for HVAC fans and pumps
                </li>
                <li>
                  <strong>S2:</strong> Short-time duty - specified duration (e.g., S2 30 min)
                </li>
                <li>
                  <strong>S3:</strong> Intermittent periodic duty - cyclic operation
                </li>
                <li>
                  <strong>S4-S10:</strong> Various intermittent duties with starting, braking, speed
                  changes
                </li>
              </ul>

            <p>
              <strong>Circuit design:</strong> Always use the nameplate FLC for cable and protection
              sizing. Calculate starting current as 6-8 times FLC for protection coordination and
              voltage drop assessment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Building Services Applications">
            <p>
              Induction motors are the workhorses of building services, driving HVAC equipment,
              water systems, and building infrastructure. Understanding application-specific
              requirements ensures correct motor selection and efficient operation.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">HVAC Applications</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AHU supply fan</strong> — SCIM + VSD — 5-75 kW — Variable flow control, energy saving</li>
              <li><strong>Extract fan</strong> — SCIM (DOL or VSD) — 0.5-15 kW — Often constant speed, simple control</li>
              <li><strong>Chilled water pump</strong> — SCIM + VSD — 7.5-55 kW — Variable flow, pressure control</li>
              <li><strong>Condenser water pump</strong> — SCIM (DOL) — 11-45 kW — Often constant flow, high reliability</li>
              <li><strong>Cooling tower fan</strong> — SCIM + VSD — 7.5-37 kW — Temperature control, energy saving</li>
              <li><strong>Chiller compressor</strong> — SCIM or scroll — 50-500 kW — High starting torque, soft starting</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Fan and Pump Load Characteristics
              </p>

                <p>
                  Centrifugal fans and pumps follow the affinity laws:
                </p>

                  
                    <p><strong>Q ~ n</strong></p>
                    <p className="text-white text-xs">Flow proportional to speed</p>

                  
                    <p><strong>H ~ n squared</strong></p>
                    <p className="text-white text-xs">Head proportional to speed squared</p>

                  
                    <p><strong>P ~ n cubed</strong></p>
                    <p className="text-white text-xs">Power proportional to speed cubed</p>

                
                <p className="text-sm text-white mt-3 text-center">
                  Reducing speed by 20% reduces power consumption by approximately 50%
                </p>

            

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  VSD Benefits for HVAC
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Energy savings (30-50% typical for variable loads)</li>
                  <li>Soft starting (reduced starting current)</li>
                  <li>Precise speed control for comfort</li>
                  <li>Reduced mechanical stress on belts and bearings</li>
                  <li>Lower noise at reduced speeds</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Selection Criteria</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Match motor power to load with 10-15% margin</li>
                  <li>Specify IE3 minimum (IE4 for long running hours)</li>
                  <li>IP55 minimum for plant rooms</li>
                  <li>Class F insulation standard</li>
                  <li>Consider inverter-duty rating for VSD operation</li>
                </ul>

            

              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">
                Worked Example: AHU Fan Motor
              </h3>
              <p>
                <strong>Question:</strong> An AHU requires 12m cubed per second at 800Pa total
                pressure. Fan efficiency is 75%. Select motor size.
              </p>

                <p>Air power = Q x deltaP = 12 x 800 = 9600 W</p>
                <p>Shaft power = Air power / Fan efficiency</p>
                <p>Shaft power = 9600 / 0.75 = 12,800 W = 12.8 kW</p>
                <p>With 15% margin: 12.8 x 1.15 = 14.7 kW</p>
                <p className="mt-2 text-elec-yellow">
                  Select: <strong>15 kW motor</strong> (next standard size)
                </p>

            

            <p>
              <strong>Energy efficiency:</strong> Motors typically run for 3000-8000 hours annually
              in building services. Energy costs over the motor lifetime far exceed the purchase
              price - specifying high-efficiency motors pays back quickly.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>ns = (120 x f) / p</strong> - Synchronous speed (rev/min)
                </li>
                <li>
                  <strong>s = (ns - nr) / ns</strong> - Slip (per-unit or percentage)
                </li>
                <li>
                  <strong>P = root3 x VL x IL x cos phi x eta</strong> - Input power (three-phase)
                </li>
                <li>
                  <strong>Starting current = 6-8 x FLC</strong> - DOL starting
                </li>
                <li>
                  <strong>P varies with n cubed</strong> - Fan and pump affinity law
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Values to Remember
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  4-pole, 50Hz: <strong>1500 rev/min</strong> synchronous, ~1450 running
                </li>
                <li>
                  Full load slip: <strong>3-5%</strong>
                </li>
                <li>
                  DOL starting current: <strong>6-8 x FLC</strong>
                </li>
                <li>
                  Full load power factor: <strong>0.85-0.90</strong>
                </li>
                <li>
                  IE3 efficiency (15kW motor): <strong>91-92%</strong>
                </li>
              </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Oversizing motors</strong> - Leads to poor power factor and efficiency
                </li>
                <li>
                  <strong>Ignoring starting current</strong> - Can cause voltage dip problems
                </li>
                <li>
                  <strong>Forgetting VSD derating</strong> - Motors may need derating for VSD
                  operation
                </li>
                <li>
                  <strong>Wrong IP rating</strong> - IP55 minimum for plant rooms
                </li>
                <li>
                  <strong>Incorrect duty type</strong> - S1 required for continuous HVAC operation
                </li>
              </ul>
              </>
            }
            doInstead="Apply the formulas with care, verify with measured values where possible, and always cross-check against BS 7671 and equipment manufacturer data."
          />

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Motor Fundamentals</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Squirrel cage - robust, low maintenance, most common</li>
                  <li>Wound rotor - adjustable starting, higher cost</li>
                  <li>Slip essential for torque production</li>
                  <li>Power factor improves with loading</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Building Services</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>VSD standard for variable HVAC loads</li>
                  <li>IE3 minimum efficiency class</li>
                  <li>Size motor correctly - avoid oversizing</li>
                  <li>Consider starting current for supply design</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="22 kW supply fan motor &mdash; replacing failed IE2 with IE3 vs IE4"
            situation={
              <>
                The supply fan AHU motor on a school&rsquo;s main hall has failed after
                15 years. The original was 22 kW IE2 with a star-delta starter. The
                maintenance contractor proposes a like-for-like IE3 replacement. The
                BSE consultant overseeing the school&rsquo;s decarbonisation pathway
                requires evaluation against IE4 + VSD as alternative.
              </>
            }
            whatToDo={
              <>
                Run the lifecycle: IE3 motor input = 22/0.926 = 23.76 kW; IE4 motor
                input = 22/0.936 = 23.50 kW. The fan operates 4500 hours/year typical
                school occupancy. IE4 saves 1170 kWh vs IE3 (~&pound;234/year + 0.16 t
                CO&#x2082;). Adding a VSD to ramp speed with occupancy (BMS-controlled)
                typically saves a further 25&ndash;30 % on top via cube-law fan affinity
                &mdash; another ~5000 kWh/year. Specify IE4 motor + VSD; remove the
                obsolete star-delta starter; document the saving against the school&rsquo;s
                Climate Change Levy / DEC reporting.
              </>
            }
            whyItMatters={
              <>
                Decarbonising a public-sector estate is now policy-driven (Net Zero
                2050; Public Sector Decarbonisation Scheme grants). The HNC engineer
                signs off the motor + drive selection that delivers the saving and the
                evidence the funding application depends on.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Squirrel-cage induction motor is the BSE workhorse: rugged, cheap, low-maintenance, no brushes.',
              'Slip s = (n&#x209b; &minus; n&#x1d63;) / n&#x209b; — typical 2&ndash;5 % at full load; 100 % at standstill drives the high inrush.',
              'Synchronous speed n&#x209b; = 120f/p — 50 Hz / 4-pole = 1500 rpm, full-load ~1430 rpm at 5 % slip.',
              'Starting current 6&ndash;8&times; FLC for DOL — limits motor size on small busbars; star-delta 1/3 of DOL; VSD soft-start ~1.5&times;.',
              'IE3 minimum (UK Ecodesign Reg 2019/1781) for new motors 0.75&ndash;1000 kW; IE4 for 75&ndash;200 kW since 2023.',
              'Power factor poor at light load (~0.5) — improves with loading to ~0.85 at full load. PFC at panel level recovers the difference.',
              'NEMA design codes A/B/C/D — UK mostly Design B (typical fans, pumps); Design D (high slip) for high-inertia / cyclic loads.',
              'Motor + VSD + correctly-sized cable is the integrated BSE design unit — never specify motor in isolation.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Single-phase vs three-phase transformers
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section5-5")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Synchronous machines – principles and uses
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section5_4;
