/**
 * Module 8 · Section 4 · Subsection 1 — Motor Fundamentals
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Understanding three-phase induction motors: the workhorses of HVAC systems
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Motor Fundamentals - HNC Module 8 Section 4.1';
const DESCRIPTION =
  'Master three-phase induction motor principles for HVAC applications: synchronous speed, slip, torque-speed characteristics, IE1-IE5 efficiency classes, motor nameplate data, frame sizes, duty cycles and selection criteria.';

const quickCheckQuestions = [
  {
    id: 'synchronous-speed',
    question:
      'A 4-pole three-phase motor is connected to a 50Hz supply. What is the synchronous speed?',
    options: [
      '1500 rpm',
      '3000 rpm',
      '1000 rpm',
      '750 rpm',
    ],
    correctIndex: 0,
    explanation:
      'Synchronous speed Ns = (120 x f) / p = (120 x 50) / 4 = 1500 rpm. A 4-pole motor has two pairs of poles, giving 1500 rpm at 50Hz. This is the speed of the rotating magnetic field.',
  },
  {
    id: 'slip-calculation',
    question: 'A 4-pole motor runs at 1440 rpm on a 50Hz supply. What is the slip?',
    options: [
      '2%',
      '8%',
      '6%',
      '4%',
    ],
    correctIndex: 3,
    explanation:
      'Slip s = (Ns - Nr) / Ns x 100% = (1500 - 1440) / 1500 x 100% = 4%. Typical full-load slip for induction motors is 2-6%. The rotor must slip behind the rotating field to induce current.',
  },
  {
    id: 'ie-efficiency',
    question:
      'Which IE efficiency class is now the minimum legal requirement for new motors in the EU/UK?',
    options: [
      'IE1 Standard',
      'IE2 High',
      'IE4 Super Premium',
      'IE3 Premium',
    ],
    correctIndex: 3,
    explanation:
      'Since July 2021, IE3 (Premium Efficiency) is the minimum requirement for most three-phase motors 0.75-1000kW. IE4 is required for some applications. This regulation drives significant energy savings across industry.',
  },
  {
    id: 'duty-cycle',
    question:
      'An AHU fan motor runs continuously at constant load. Which duty cycle designation applies?',
    options: [
      'S6 - Continuous operation periodic duty',
      'S2 - Short-time duty',
      'S1 - Continuous duty',
      'S3 - Intermittent periodic duty',
    ],
    correctIndex: 2,
    explanation:
      'S1 (continuous duty) applies when the motor runs at constant load for sufficient time to reach thermal equilibrium. This is typical for HVAC fans, pumps and other continuously operating equipment.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What produces the rotating magnetic field in a three-phase induction motor?',
    options: [
      'The planned/unplanned ratio (or reactive/proactive split)',
      'Three-phase currents displaced by 120 degrees in the stator windings',
      'To prevent damage to final fittings and finishes',
      'When working near watercourses or installing certain equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase currents, displaced by 120 electrical degrees, flow through spatially displaced stator windings. This produces a rotating magnetic field at synchronous speed without any moving contacts.',
  },
  {
    id: 2,
    question: 'Why must there be slip in an induction motor for it to produce torque?',
    options: [
      'To compensate for reduced cooling at low speeds',
      'Maximum winding temperature of 155 degrees C',
      'To induce voltage and current in the rotor conductors',
      'S4 - Intermittent periodic duty with starting',
    ],
    correctAnswer: 2,
    explanation:
      'If the rotor turned at synchronous speed, there would be no relative motion between rotor and stator field, so no EMF would be induced in the rotor. Slip causes relative motion, inducing rotor current which interacts with the stator field to produce torque.',
  },
  {
    id: 3,
    question:
      'A motor nameplate shows 400V, 11kW, 21.5A, cos phi 0.85, 1460 rpm. What is the number of poles?',
    options: [
      '6 poles',
      '2 poles',
      '8 poles',
      '4 poles',
    ],
    correctAnswer: 3,
    explanation:
      'At 1460 rpm with ~3% slip, synchronous speed is approximately 1500 rpm. Using Ns = 120f/p, we get p = 120 x 50/1500 = 4 poles. The actual speed is slightly below synchronous due to slip.',
  },
  {
    id: 4,
    question: 'What is the typical full-load efficiency of an IE3 motor rated at 7.5kW?',
    options: [
      '89-91%',
      '80-85%',
      '75-80%',
      '95-97%',
    ],
    correctAnswer: 0,
    explanation:
      "IE3 (Premium Efficiency) motors typically achieve 89-91% efficiency at 7.5kW. This represents significant improvement over older IE1 motors (84-86%) and reduces running costs substantially over the motor's lifetime.",
  },
  {
    id: 5,
    question: 'Which factor has the greatest impact on motor efficiency losses?',
    options: [
      'Power is proportional to speed cubed',
      'Copper losses (I squared R) in windings',
      'S4 - Intermittent periodic duty with starting',
      'Maximum winding temperature of 155 degrees C',
    ],
    correctAnswer: 1,
    explanation:
      'Copper losses (I squared R losses) in the stator and rotor windings are typically the largest component, accounting for 30-50% of total losses. This is why high-efficiency motors use more copper and better quality materials.',
  },
  {
    id: 6,
    question: "A motor has frame size 132M. What does the '132' indicate?",
    options: [
      'Motor power in watts',
      'Overall length in millimetres',
      'Shaft height in millimetres',
      'Mounting bolt spacing',
    ],
    correctAnswer: 2,
    explanation:
      "The frame size number (132) indicates the shaft centre height above the mounting surface in millimetres. This standardisation (IEC 60072) ensures interchangeability between manufacturers. 'M' indicates medium length for that frame.",
  },
  {
    id: 7,
    question:
      'For HVAC fan and pump applications, what is the relationship between motor speed and power consumption?',
    options: [
      'Power is proportional to speed',
      'Power is proportional to speed squared',
      'Power is inversely proportional to speed',
      'Power is proportional to speed cubed',
    ],
    correctAnswer: 3,
    explanation:
      'The affinity laws state that power varies with the cube of speed (P proportional to N cubed). Reducing fan speed by 20% reduces power consumption by approximately 50%. This makes variable speed drives highly effective for HVAC energy savings.',
  },
  {
    id: 8,
    question: "What does the motor insulation class 'F' indicate?",
    options: [
      'Maximum winding temperature of 155 degrees C',
      'Maximum winding temperature of 180 degrees C',
      'Maximum winding temperature of 105 degrees C',
      'Maximum winding temperature of 130 degrees C',
    ],
    correctAnswer: 0,
    explanation:
      'Class F insulation permits a maximum winding temperature of 155 degrees C. Most modern motors use Class F insulation but are designed for Class B temperature rise (80K), giving a 25K safety margin and extended insulation life.',
  },
  {
    id: 9,
    question:
      'Which duty cycle applies to a motor used for crane hoisting with defined on/off periods?',
    options: [
      'Copper losses (I squared R) in windings',
      'S4 - Intermittent periodic duty with starting',
      'Maximum winding temperature of 155 degrees C',
      'To induce voltage and current in the rotor conductors',
    ],
    correctAnswer: 1,
    explanation:
      'S4 applies when the starting process contributes significantly to thermal loading. Crane motors experience frequent starts under load, so starting losses must be considered alongside running periods.',
  },
  {
    id: 10,
    question:
      'What is the typical starting current for a standard squirrel cage motor started direct-on-line?',
    options: [
      '1-2 times full load current',
      '3-4 times full load current',
      '6-8 times full load current',
      '10-12 times full load current',
    ],
    correctAnswer: 2,
    explanation:
      'DOL starting current is typically 6-8 times full load current (FLC). This high inrush can cause voltage dips on the supply, which is why reduced voltage starting methods are used for larger motors.',
  },
  {
    id: 11,
    question:
      'When selecting a motor for a variable speed application, why might you choose a motor with higher power rating?',
    options: [
      'Maximum winding temperature of 155 degrees C',
      'Power is proportional to speed cubed',
      'Copper losses (I squared R) in windings',
      'To compensate for reduced cooling at low speeds',
    ],
    correctAnswer: 3,
    explanation:
      'Standard motors have shaft-mounted cooling fans that provide less airflow at reduced speeds. For continuous operation at low speeds, either an oversized motor or a force-ventilated motor should be selected to prevent overheating.',
  },
  {
    id: 12,
    question:
      'A 15kW IE3 motor costs 800 pounds more than an equivalent IE2 motor. If electricity costs 15p/kWh and the motor runs 4000 hours/year, what is the approximate payback period?',
    options: [
      '1-2 years',
      'More than 5 years',
      'Less than 1 year',
      '3-4 years',
    ],
    correctAnswer: 0,
    explanation:
      'IE3 is typically 2% more efficient than IE2 at this rating. Annual savings = 15kW x 0.02 x 4000h x 0.15 pounds = 180 pounds/year. Payback = 800/180 = 4.4 years. However, larger motors and higher running hours give faster payback, often under 2 years.',
  },
];

const faqs = [
  {
    question: 'Why are induction motors so widely used in HVAC systems?',
    answer:
      'Induction motors dominate HVAC applications because they are robust, reliable, require minimal maintenance (no brushes or slip rings), have good efficiency, and can operate directly from the mains supply. They handle the dusty, humid environments common in plant rooms well and have long service lives of 15-20+ years with basic maintenance.',
  },
  {
    question: 'How do I read a motor nameplate correctly?',
    answer:
      'Key nameplate data includes: rated voltage (e.g., 400V), rated power (kW), rated current (A), power factor (cos phi), rated speed (rpm), efficiency class (IE1-IE4), insulation class (typically F), duty cycle (S1-S10), frame size, and protection rating (IP). The speed indicates the number of poles, and the relationship between voltage, current, power and power factor should be consistent.',
  },
  {
    question: 'What is the difference between motor frame size letters (S, M, L)?',
    answer:
      "Frame size letters indicate relative length for a given shaft height. 'S' is short, 'M' is medium, and 'L' is long. A longer frame typically means higher power output at that shaft height. For example, frame 132S might be 4kW while 132M could be 7.5kW. The shaft height remains constant at 132mm.",
  },
  {
    question: 'Can I replace an IE2 motor with an IE3 directly?',
    answer:
      'Usually yes, as IE3 motors are designed for dimensional compatibility with IE2. However, IE3 motors may have slightly different starting characteristics (higher starting current, higher starting torque) which could affect protection settings and starter sizing. Always check that the existing installation can accommodate any differences.',
  },
  {
    question: 'What happens if I run a 50Hz motor on a 60Hz supply?',
    answer:
      'Running at 60Hz increases speed by 20% (proportional to frequency) and may increase power output. However, the motor will also run hotter due to increased iron losses and may exceed its thermal limits. Voltage should ideally be increased proportionally (480V instead of 400V). Motors designed for dual frequency operation (50/60Hz) state both ratings on the nameplate.',
  },
  {
    question: 'How do I select the correct motor for an intermittent duty application?',
    answer:
      'For intermittent duty (S2-S10), you need to define the duty cycle accurately: on-time, off-time, number of starts per hour, and load during operation. Motor manufacturers provide derating factors or specific ratings for different duty cycles. A motor rated for continuous duty (S1) may be suitable for intermittent duty at higher power, but thermal calculations should verify this.',
  },
];

const HNCModule8Section4_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 4 · Subsection 1"
            title="Motor Fundamentals"
            description="Understanding three-phase induction motors: the workhorses of HVAC systems"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the operating principle of three-phase induction motors",
              "Calculate synchronous speed and slip for different pole configurations",
              "Interpret motor nameplate data including efficiency and duty ratings",
              "Compare IE efficiency classes and their impact on running costs",
              "Select appropriate motors for different HVAC applications",
              "Understand frame sizes, insulation classes and protection ratings",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Three-Phase Induction Motor Principles">
            <p>The <strong>three-phase squirrel cage induction motor</strong> is the most common motor type in building services. It converts electrical energy to mechanical energy using electromagnetic induction, with no electrical connection to the rotor.</p>
            <p><strong>Motor Construction</strong></p>
            <p><strong>Stator (Stationary Part)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Laminated steel core to reduce eddy current losses</li>
              <li>Three-phase windings displaced by 120 electrical degrees</li>
              <li>Windings connected in star or delta configuration</li>
              <li>Creates the rotating magnetic field</li>
            </ul>
            <p><strong>Rotor (Rotating Part)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Laminated steel core mounted on shaft</li>
              <li>Aluminium or copper bars in slots (squirrel cage)</li>
              <li>Bars short-circuited by end rings</li>
              <li>No external electrical connections required</li>
            </ul>
            <p><strong>Operating Principle - The Rotating Magnetic Field</strong></p>
            <p>When three-phase AC is applied to the stator windings, the currents create a magnetic field that rotates at <strong>synchronous speed</strong>. This rotation occurs because:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Three-phase currents are displaced by 120 degrees in time</li>
              <li>The windings are displaced by 120 degrees in space</li>
              <li>The combination produces a field of constant magnitude that rotates smoothly</li>
              <li>The field rotates at a speed determined by frequency and number of poles</li>
            </ul>
            <p><strong>Synchronous Speed Formula</strong></p>
            <p>Ns = (120 x f) / p</p>
            <p>Where:</p>
            <p>Ns = synchronous speed (rpm)</p>
            <p>f = supply frequency (Hz)</p>
            <p>p = number of poles</p>
            <p><strong>Synchronous Speeds at 50Hz</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2:</strong> 3000 rpm — 2850-2950 rpm — Centrifugal pumps, small fans</li>
              <li><strong>4:</strong> 1500 rpm — 1420-1480 rpm — AHU fans, HVAC pumps</li>
              <li><strong>6:</strong> 1000 rpm — 940-980 rpm — Large fans, cooling towers</li>
              <li><strong>8:</strong> 750 rpm — 700-740 rpm — Low-speed drives, conveyors</li>
            </ul>
            <p><strong>Key principle:</strong> Fewer poles = higher speed. 2-pole motors are the fastest, but 4-pole motors are most common in HVAC due to good balance of speed, torque and efficiency.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Slip and Torque Production">
            <p><strong>Slip</strong> is the difference between synchronous speed and actual rotor speed, expressed as a percentage. It is essential for motor operation - without slip, there would be no induced rotor current and therefore no torque.</p>
            <p><strong>Slip Formula</strong></p>
            <p>s = (Ns - Nr) / Ns x 100%</p>
            <p>Where:</p>
            <p>s = slip (%)</p>
            <p>Ns = synchronous speed (rpm)</p>
            <p>Nr = rotor speed (rpm)</p>
            <p><strong>Why Slip is Essential:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>The rotating stator field cuts the rotor conductors</li>
              <li>This relative motion induces EMF in the rotor bars (Faraday's law)</li>
              <li>The EMF drives current through the short-circuited rotor bars</li>
              <li>Current-carrying conductors in a magnetic field experience force (motor action)</li>
              <li>The rotor accelerates, trying to catch the rotating field</li>
              <li>As speed increases, slip decreases and induced EMF reduces</li>
              <li>Equilibrium is reached when motor torque equals load torque</li>
            </ul>
            <p><strong>Torque-Speed Characteristic</strong></p>
            <p>{`Torque ^ | Pull-out (breakdown) torque | _____ | / \\ | / \\_____ Full-load operating point | / \\ | / Starting \\ | | torque \\ | / \\ +---+-----+-----+-----+-----+-----+---> Speed 0 Starting Full Sync (s=1) load speed (s=3-5%) (s=0)`}</p>
            <p><strong>Key Points on the Torque-Speed Curve</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Starting (locked rotor):</strong> s = 100% — High current (6-8x FLC), moderate torque (1.5-2.5x rated)</li>
              <li><strong>Pull-out (breakdown):</strong> s = 10-20% — Maximum torque (2-3x rated), unstable beyond this</li>
              <li><strong>Full load:</strong> s = 2-6% — Rated torque, rated current, stable operation</li>
              <li><strong>No load:</strong> s = 0.5-1% — Minimal torque (friction only), low current</li>
            </ul>
            <p><strong>Critical Understanding</strong></p>
            <p>If the load torque exceeds pull-out torque, the motor will <strong>stall</strong>. The rotor slows dramatically, slip increases, and current rises to starting levels. Without protection, the motor will overheat rapidly. This is why overload and stall protection are essential.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="IE Efficiency Classes and Regulations">
            <p>The <strong>International Efficiency (IE) classification</strong> system standardises motor efficiency ratings globally. Higher IE numbers indicate better efficiency and lower running costs, though typically with higher purchase price.</p>
            <p><strong>IE Efficiency Classes (IEC 60034-30-1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IE1:</strong> Standard — 87.6% — No longer permitted for most applications</li>
              <li><strong>IE2:</strong> High — 89.4% — Permitted only with VSD</li>
              <li><strong>IE3:</strong> Premium — 91.0% — Minimum standard (since July 2021)</li>
              <li><strong>IE4:</strong> Super Premium — 92.1% — Required for some applications from 2023</li>
              <li><strong>IE5:</strong> Ultra Premium — &gt;93% — Future standard, emerging technology</li>
            </ul>
            <p><strong>UK/EU Ecodesign Regulations (2021 onwards)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>July 2021:</strong> IE3 minimum for motors 0.75-1000kW (2, 4, 6, 8 pole)</li>
              <li><strong>July 2021:</strong> IE2 permitted only when used with VSD</li>
              <li><strong>July 2023:</strong> IE4 minimum for motors 75-200kW (2-6 pole)</li>
              <li><strong>Exemptions:</strong> ATEX motors, brake motors, some special applications</li>
            </ul>
            <p><strong>Motor Losses and Efficiency</strong></p>
            <p><strong>Types of Losses</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stator copper losses (I squared R)</li>
              <li>Rotor copper losses</li>
              <li>Iron losses (hysteresis and eddy current)</li>
              <li>Mechanical losses (friction, windage)</li>
              <li>Stray load losses</li>
            </ul>
            <p><strong>How IE3/IE4 Reduce Losses</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>More copper in windings (lower resistance)</li>
              <li>Better quality laminations (lower iron losses)</li>
              <li>Optimised air gap and slot geometry</li>
              <li>Better bearings and lubrication</li>
              <li>Precision manufacturing</li>
            </ul>
            <p><strong>Cost-Benefit Example: IE2 vs IE3</strong></p>
            <p>Motor: 15kW, 4-pole, running 4000 hours/year</p>
            <p>Electricity cost: 15p/kWh</p>
            <p>IE2 efficiency: 90.0%</p>
            <p>Annual energy: 15kW / 0.90 x 4000h = 66,667 kWh</p>
            <p>Annual cost: 66,667 x 0.15 = <strong>10,000 pounds</strong></p>
            <p>IE3 efficiency: 91.5%</p>
            <p>Annual energy: 15kW / 0.915 x 4000h = 65,574 kWh</p>
            <p>Annual cost: 65,574 x 0.15 = <strong>9,836 pounds</strong></p>
            <p>Annual saving: 164 pounds</p>
            <p>Typical price premium for IE3: 200-400 pounds</p>
            <p>Payback: 1-2.5 years</p>
            <p><strong>Design guidance:</strong> Always specify IE3 or better. For motors running &gt;4000 hours/year, IE4 often provides better lifetime value despite higher purchase cost.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Motor Nameplate Data and Selection">
            <p>Correct motor selection requires understanding all nameplate parameters. The nameplate provides critical information for installation, protection settings and maintenance.</p>
            <p><strong>Motor Nameplate Data Explained</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rated voltage:</strong> 400V 3~ — Three-phase 400V supply</li>
              <li><strong>Rated power:</strong> 11kW — Mechanical output power at shaft</li>
              <li><strong>Rated current:</strong> 21.5A — Full load current per line</li>
              <li><strong>Power factor:</strong> cos phi 0.85 — Ratio of real to apparent power</li>
              <li><strong>Rated speed:</strong> 1460 rpm — Full load speed (indicates 4-pole)</li>
              <li><strong>Efficiency:</strong> IE3 / 91.0% — Efficiency class and value at rated load</li>
              <li><strong>Insulation class:</strong> F — Maximum winding temperature 155 degrees C</li>
              <li><strong>Duty cycle:</strong> S1 — Continuous duty at rated load</li>
              <li><strong>Frame size:</strong> 160M — 160mm shaft height, medium length</li>
              <li><strong>Protection:</strong> IP55 — Dust protected, water jet protected</li>
            </ul>
            <p><strong>Duty Cycles (IEC 60034-1)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>S1:</strong> Continuous duty — AHU fans, pumps, chillers</li>
              <li><strong>S2:</strong> Short-time duty (10, 30, 60, 90 min) — Fire damper actuators</li>
              <li><strong>S3:</strong> Intermittent periodic duty — Cooling tower fans (on/off control)</li>
              <li><strong>S4:</strong> Intermittent periodic with starting — Lift motors, crane hoists</li>
              <li><strong>S5:</strong> Intermittent with electric braking — Positioning drives</li>
              <li><strong>S6-S10:</strong> Various cyclic duties — Specialist applications</li>
            </ul>
            <p><strong>IEC Frame Sizes (Shaft Height)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>80:</strong> 80mm — 0.55-1.1kW</li>
              <li><strong>100:</strong> 100mm — 1.5-3kW</li>
              <li><strong>132:</strong> 132mm — 5.5-11kW</li>
              <li><strong>160:</strong> 160mm — 11-18.5kW</li>
              <li><strong>180:</strong> 180mm — 22kW</li>
              <li><strong>200:</strong> 200mm — 30-37kW</li>
              <li><strong>225:</strong> 225mm — 45-55kW</li>
              <li><strong>250-315:</strong> 250-315mm — 75-200kW</li>
            </ul>
            <p><strong>Motor Selection Checklist for HVAC</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power requirement:</strong> Calculate shaft power needed (with margin)</li>
              <li><strong>Speed:</strong> Match to driven equipment (direct or via gearbox/belt)</li>
              <li><strong>Voltage:</strong> Match supply (typically 400V three-phase in UK)</li>
              <li><strong>Efficiency:</strong> IE3 minimum, IE4 for high running hours</li>
              <li><strong>Duty cycle:</strong> S1 for continuous, or appropriate S-rating</li>
              <li><strong>Environment:</strong> IP rating, temperature range, altitude</li>
              <li><strong>Mounting:</strong> B3 (foot), B5 (flange), B14 (face), B35 (foot and flange)</li>
              <li><strong>Starting method:</strong> DOL, star-delta, soft start or VSD</li>
              <li><strong>Special requirements:</strong> Hazardous area, brake, encoder</li>
            </ul>
            <p><strong>VSD Applications - Derating Considerations</strong></p>
            <p>When motors operate with variable speed drives at reduced speeds, cooling is compromised (shaft-mounted fan provides less airflow). For continuous operation below 50% speed, either <strong>oversize the motor</strong> or specify a  <strong>force-ventilated motor</strong> with separate cooling fan.</p>
            <p><strong>Building services tip:</strong> For standard HVAC applications (fans, pumps), 4-pole IE3 motors with IP55 protection are the default choice. 2-pole motors are used for high-speed applications like small centrifugal pumps.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Calculating Synchronous Speed and Slip</strong>
            </p>
            <p><strong>Question:</strong> A 6-pole motor operates on a 50Hz supply and runs at 960 rpm at full load. Calculate the synchronous speed and percentage slip.</p>
            <p>Synchronous speed Ns = (120 x f) / p</p>
            <p>Ns = (120 x 50) / 6 = <strong>1000 rpm</strong></p>
            <p>Slip s = (Ns - Nr) / Ns x 100%</p>
            <p>s = (1000 - 960) / 1000 x 100% = <strong>4%</strong></p>
            <p>This is typical slip for a fully loaded motor</p>
            <p>
              <strong>Example 2: Verifying Nameplate Data</strong>
            </p>
            <p><strong>Question:</strong> A motor nameplate shows: 400V, 15kW, 28A, cos phi 0.87, efficiency 91.5%. Verify these values are consistent.</p>
            <p>Input power = Output power / Efficiency</p>
            <p>Pin = 15,000W / 0.915 = 16,393W</p>
            <p>From three-phase power formula:</p>
            <p>Pin = root3 x V x I x cos(phi)</p>
            <p>Pin = 1.732 x 400 x 28 x 0.87 = <strong>16,874W</strong></p>
            <p>Values are consistent (small difference due to rounding)</p>
            <p>This verification confirms nameplate data is correct</p>
            <p>
              <strong>Example 3: Energy Savings from Motor Upgrade</strong>
            </p>
            <p><strong>Question:</strong> An AHU fan motor (22kW, 4-pole) runs 6000 hours/year. Compare annual running costs for IE2 (90.5%) vs IE4 (93.0%) at 18p/kWh.</p>
            <p>IE2 annual energy: 22kW / 0.905 x 6000h = 145,856 kWh</p>
            <p>IE2 annual cost: 145,856 x 0.18 = <strong>26,254 pounds</strong></p>
            <p>IE4 annual energy: 22kW / 0.930 x 6000h = 141,935 kWh</p>
            <p>IE4 annual cost: 141,935 x 0.18 = <strong>25,548 pounds</strong></p>
            <p>Annual saving: 706 pounds</p>
            <p>Over 15-year motor life: 10,590 pounds saved</p>
            <p>Plus reduced carbon emissions: ~0.7 tonnes CO2/year</p>
            <p>
              <strong>Example 4: Motor Selection for Variable Speed Pump</strong>
            </p>
            <p><strong>Question:</strong> Select a motor for a LPHW pump requiring 7.5kW at full speed, operating continuously via VSD at 30-100% speed. Ambient temperature 40 degrees C.</p>
            <p>Base requirement: 7.5kW, 4-pole, 400V, IE3</p>
            <p>VSD derating factor (continuous below 50%): 0.85</p>
            <p>Required motor rating: 7.5 / 0.85 = 8.8kW</p>
            <p>High ambient derating (40 degrees C vs 40 degrees C standard): 1.0</p>
            <p>(No derating needed if standard 40 degrees C rated)</p>
            <p>Selection: 11kW IE3 motor (next standard size up)</p>
            <p>Frame: 160M, IP55, Class F insulation</p>
            <p>Alternative: 7.5kW force-ventilated motor</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Synchronous speed:</strong> Ns = 120f / p (rpm)</li>
              <li><strong>Slip:</strong> s = (Ns - Nr) / Ns x 100%</li>
              <li><strong>Power input:</strong> Pin = root3 x V x I x cos(phi)</li>
              <li><strong>Efficiency:</strong> eta = Pout / Pin x 100%</li>
              <li><strong>Torque:</strong> T = P / omega = P x 60 / (2 x pi x N)</li>
              <li><strong>Affinity law (power):</strong> P2 / P1 = (N2 / N1) cubed</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2-pole sync speed at 50Hz: <strong>3000 rpm</strong></li>
              <li>4-pole sync speed at 50Hz: <strong>1500 rpm</strong></li>
              <li>6-pole sync speed at 50Hz: <strong>1000 rpm</strong></li>
              <li>Typical full-load slip: <strong>2-6%</strong></li>
              <li>DOL starting current: <strong>6-8x FLC</strong></li>
              <li>IE3 minimum efficiency (11kW 4-pole): <strong>~91%</strong></li>
              <li>Class F max temperature: <strong>155 degrees C</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersizing:</strong> Not allowing margin for load variations and degradation</li>
                <li><strong>Oversizing:</strong> Running motors at low load reduces efficiency and power factor</li>
                <li><strong>Wrong duty rating:</strong> Using S1 motor for intermittent duty without checking</li>
                <li><strong>VSD derating:</strong> Not accounting for reduced cooling at low speeds</li>
                <li><strong>Environment:</strong> Ignoring ambient temperature and altitude derating</li>
                <li><strong>Frame compatibility:</strong> Not checking mounting dimensions when replacing motors</li>
              </ul>
            }
            doInstead="Cross-check assumptions against published guidance, validate measured values against design intent, and engage the wider team early when interface issues emerge."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Motor control
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-2")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Starting methods
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section4_1;
