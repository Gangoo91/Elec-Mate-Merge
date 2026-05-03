/**
 * Module 8 · Section 5 · Subsection 3 — Actuators and Output Devices
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Valve actuators, damper actuators, control signal types, spring return mechanisms, and actuator sizing
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

const TITLE = 'Actuators and Output Devices - HNC Module 8 Section 5.3';
const DESCRIPTION =
  'Master actuators and output devices for BMS integration: valve actuators, damper actuators, modulating vs on/off control, control signals (0-10V, 2-10V), spring return mechanisms, torque requirements, and actuator sizing.';

const quickCheckQuestions = [
  {
    id: 'valve-actuator-type',
    question:
      'What is the primary difference between a linear valve actuator and a rotary valve actuator?',
    options: [
      'Linear actuators are more expensive',
      'Linear actuators produce straight-line motion for globe valves, rotary actuators produce rotation for ball/butterfly valves',
      'Rotary actuators cannot be used for modulating control',
      'Linear actuators only work with on/off control',
    ],
    correctIndex: 1,
    explanation:
      'Linear actuators produce straight-line (up/down) motion suited for globe and gate valves where the stem moves linearly. Rotary actuators produce rotational motion (typically 90°) suited for ball and butterfly valves where the disc or ball rotates to control flow.',
  },
  {
    id: 'spring-return-purpose',
    question: 'What is the primary purpose of a spring return mechanism in a valve actuator?',
    options: [
      'To increase the actuator speed',
      'To reduce power consumption during normal operation',
      'To return the valve to a safe fail position on power loss or signal failure',
      'To provide modulating control capability',
    ],
    correctIndex: 2,
    explanation:
      'Spring return actuators store mechanical energy in a spring during normal operation. On power loss or control signal failure, the spring drives the valve to a predetermined safe position (typically fully open or fully closed), ensuring fail-safe operation for critical HVAC applications.',
  },
  {
    id: 'control-signal-difference',
    question:
      'What is the key advantage of using a 2-10V control signal instead of 0-10V for modulating actuators?',
    options: [
      '2-10V signals are more accurate',
      '2-10V allows detection of cable faults since 0V indicates a broken connection',
      '2-10V actuators are cheaper',
      '2-10V provides faster response times',
    ],
    correctIndex: 1,
    explanation:
      'With a 2-10V signal, the minimum valid control signal is 2V rather than 0V. If the signal drops to 0V, the BMS can detect this as a cable break or fault rather than a valid minimum position command. This provides important fault detection capability for critical applications.',
  },
  {
    id: 'damper-torque',
    question: 'When sizing a damper actuator, what is the most critical parameter to calculate?',
    options: [
      'The voltage supply available',
      'The required torque based on damper area and static pressure',
      'The colour of the actuator housing',
      "The manufacturer's warranty period",
    ],
    correctIndex: 1,
    explanation:
      'Damper actuator sizing is primarily determined by the torque required to operate the damper against the system static pressure. This is calculated from the damper area and the maximum static pressure differential, with appropriate safety factors applied.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A 2-port modulating valve actuator is specified as 0-10V with 4mm stroke. What does the stroke measurement indicate?',
    options: [
      'The diameter of the actuator output shaft',
      'The linear travel distance of the valve stem from fully closed to fully open',
      'The maximum cable length for the control signal',
      'The response time in seconds',
    ],
    correctAnswer: 1,
    explanation:
      'Stroke indicates the linear travel distance of the valve stem. A 4mm stroke means the actuator moves the valve stem 4mm from the fully closed to fully open position. This must match the valve stroke requirement for proper control.',
  },
  {
    id: 2,
    question: 'What type of valve actuator motion is required for a butterfly valve?',
    options: [
      'Linear motion',
      'Rotary motion (typically 90°)',
      'Reciprocating motion',
      'Helical motion',
    ],
    correctAnswer: 1,
    explanation:
      'Butterfly valves use a rotating disc to control flow, requiring 90° rotation from fully closed to fully open. A rotary actuator is therefore required to operate butterfly valves, unlike globe valves which require linear actuators.',
  },
  {
    id: 3,
    question: "An actuator datasheet specifies 'running time 120 seconds'. What does this mean?",
    options: [
      'The actuator warranty is 120 seconds',
      'The time for the actuator to travel from fully closed to fully open (or vice versa)',
      'The actuator can only operate for 120 seconds continuously',
      'The minimum control signal pulse width required',
    ],
    correctAnswer: 1,
    explanation:
      'Running time (or stroke time) is the time taken for the actuator to complete its full travel range. A 120-second running time is typical for HVAC modulating actuators, providing smooth control without rapid hunting.',
  },
  {
    id: 4,
    question:
      'What is the typical control signal range for a modulating damper actuator in a BMS system?',
    options: ['24V AC on/off', '0-10V DC or 2-10V DC analogue', '4-20mA only', 'PWM at 1kHz'],
    correctAnswer: 1,
    explanation:
      'Modulating damper actuators in BMS applications typically use 0-10V DC or 2-10V DC analogue control signals. The voltage corresponds proportionally to the damper position (e.g., 0V = 0% open, 10V = 100% open).',
  },
  {
    id: 5,
    question:
      "A spring return actuator is marked 'NO' (Normally Open). What position does the valve take on power failure?",
    options: [
      'The valve closes completely',
      'The valve opens completely',
      'The valve remains in its last position',
      'The valve moves to 50% position',
    ],
    correctAnswer: 1,
    explanation:
      'A Normally Open (NO) spring return actuator drives the valve to the fully open position when power is removed. The spring pushes the valve open, which is commonly used for heating valves to provide fail-safe heat during control system failures.',
  },
  {
    id: 6,
    question:
      'When selecting a damper actuator, the calculation shows 8Nm torque is required. What minimum actuator torque should be specified?',
    options: [
      '8Nm exactly',
      '6Nm (20% below calculated)',
      '10Nm (25% above calculated)',
      '16Nm (100% above calculated)',
    ],
    correctAnswer: 2,
    explanation:
      'A safety factor of at least 25% should be applied to calculated torque requirements. For 8Nm calculated, specify minimum 10Nm actuator torque. This accounts for ageing, dirt build-up, and pressure fluctuations beyond design conditions.',
  },
  {
    id: 7,
    question:
      'What is the primary advantage of a three-point floating control signal over analogue 0-10V?',
    options: [
      'More precise positioning',
      'Simpler wiring using open/close signals without position feedback',
      'Faster response time',
      'Lower power consumption',
    ],
    correctAnswer: 1,
    explanation:
      'Three-point floating control uses simple open/close/stop signals rather than analogue voltage, requiring only relay outputs from the controller. This is simpler and cheaper for basic applications where precise positioning is not critical.',
  },
  {
    id: 8,
    question:
      'A BMS specification requires fail-safe heating. Which actuator configuration should be specified for the LTHW flow valve?',
    options: [
      'Non-spring return, normally closed',
      'Spring return, normally closed',
      'Spring return, normally open',
      'Non-spring return, normally open',
    ],
    correctAnswer: 2,
    explanation:
      'For fail-safe heating, the valve must open on power failure to maintain heat. A spring return normally open (NO) actuator ensures the heating valve opens if power or control signal is lost, preventing freeze conditions.',
  },
  {
    id: 9,
    question: 'What is the purpose of the anti-rotation feature on a linear valve actuator?',
    options: [
      'To prevent theft of the actuator',
      'To ensure the actuator body does not rotate, potentially damaging wiring or pipework',
      'To increase the actuator torque output',
      'To reduce the running time',
    ],
    correctAnswer: 1,
    explanation:
      'Anti-rotation mechanisms prevent the actuator body from rotating during operation. Without this, the reaction torque could twist the actuator, potentially damaging control wiring, feedback cables, or creating stress on pipework connections.',
  },
  {
    id: 10,
    question:
      'A modulating actuator with position feedback provides a 2-10V signal back to the BMS. The BMS reads 6V. What position is the actuator indicating?',
    options: ['60% open', '50% open', '40% open', '75% open'],
    correctAnswer: 1,
    explanation:
      'For a 2-10V position feedback signal: 2V = 0% (closed), 10V = 100% (open). The range is 8V. At 6V, the position is (6-2)/(10-2) × 100% = 4/8 × 100% = 50% open.',
  },
  {
    id: 11,
    question:
      'What is the typical torque requirement per square metre of damper area for low-pressure air handling systems?',
    options: ['1-2 Nm/m²', '4-8 Nm/m²', '15-20 Nm/m²', '50-100 Nm/m²'],
    correctAnswer: 1,
    explanation:
      'For low-pressure ductwork systems (up to 500Pa), the typical torque requirement is 4-8 Nm per square metre of damper area. Higher pressure systems require greater torque, and fire/smoke dampers may require 15+ Nm/m² due to higher friction.',
  },
  {
    id: 12,
    question:
      'Why might a 24V AC actuator be preferred over a 230V AC actuator for HVAC applications?',
    options: [
      '24V actuators are more powerful',
      'Safety considerations - 24V is SELV (Safety Extra-Low Voltage), reducing electric shock risk',
      '24V actuators are always faster',
      '230V actuators cannot be used with BMS systems',
    ],
    correctAnswer: 1,
    explanation:
      '24V AC is a SELV (Safety Extra-Low Voltage) supply, significantly reducing electric shock risk during installation and maintenance. This is particularly important for actuators in accessible locations or where non-electrical personnel may work nearby.',
  },
  {
    id: 13,
    question:
      "An on/off valve actuator is described as having 'synchronous motor' operation. What characteristic does this provide?",
    options: [
      'Variable speed control',
      'Consistent running time regardless of load, but no intermediate positioning',
      'Instant open/close operation',
      'Built-in position feedback',
    ],
    correctAnswer: 1,
    explanation:
      'Synchronous motor actuators run at a fixed speed determined by the AC supply frequency, providing consistent and predictable running times. However, they cannot stop at intermediate positions - they run to fully open or fully closed each time.',
  },
  {
    id: 14,
    question: "What does 'close-off pressure rating' indicate for a valve actuator combination?",
    options: [
      'The maximum system static pressure',
      'The maximum differential pressure against which the actuator can fully close the valve',
      'The pressure at which the valve leaks',
      'The actuator housing pressure rating',
    ],
    correctAnswer: 1,
    explanation:
      'Close-off pressure rating is the maximum differential pressure across the valve against which the actuator can achieve tight shut-off. Exceeding this rating means the actuator cannot fully close the valve, leading to leakage and poor control.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a 2-port and 3-port valve actuator application?',
    answer:
      'A 2-port valve has one inlet and one outlet, controlling flow through a single path - used for simple on/off or modulating flow control. A 3-port valve has three connections configured as either mixing (two inlets, one outlet) or diverting (one inlet, two outlets). Mixing valves blend two water streams to achieve a desired temperature, while diverting valves split flow between two destinations. The actuator mechanism is similar, but 3-port valves require more precise characterisation to achieve linear heat output versus position.',
  },
  {
    question: 'How do I calculate the torque required for a damper actuator?',
    answer:
      'Damper torque is calculated as: Torque (Nm) = Damper Area (m²) × Pressure (Pa) × Torque Factor. The torque factor accounts for damper type (typically 8-10 Nm/m² for opposed blade, 6-8 Nm/m² for parallel blade at low pressure). For a 0.5m × 0.8m damper at 500Pa: Area = 0.4m², Torque = 0.4 × 500 × 0.016 = 3.2Nm base, then apply safety factor of 25-50% = 4-5Nm minimum actuator specification. Always consult manufacturer data for specific damper types.',
  },
  {
    question: 'When should I specify spring return versus non-spring return actuators?',
    answer:
      'Spring return actuators are essential where fail-safe operation is required - typically heating valves (fail open to prevent freezing), cooling valves in data centres (fail open to maintain cooling), and fire/smoke dampers (fail to safe position). Non-spring return actuators are suitable where fail-in-place is acceptable or preferable, such as general ventilation dampers, and are typically lower cost with longer service life as the spring mechanism adds wear. Consider the consequences of control system failure when making this decision.',
  },
  {
    question: 'What causes actuator hunting and how can it be prevented?',
    answer:
      'Hunting occurs when an actuator continuously oscillates around the setpoint rather than settling at a stable position. Common causes include: oversized actuators with excessive torque, running times too fast for the control loop, poor controller tuning (excessive gain), incorrect valve sizing (oversized valve causing high gain), or mechanical issues like backlash. Solutions include selecting appropriate running time (90-120 seconds for HVAC), correct actuator and valve sizing, proper PID tuning, and ensuring tight mechanical linkages.',
  },
  {
    question:
      'What is the difference between clockwise and anti-clockwise rotation specification for rotary actuators?',
    answer:
      'Rotary actuator rotation direction determines which way the output shaft turns when the control signal increases. This must match the valve or damper orientation. For example, a butterfly valve may require clockwise rotation to open when viewed from the actuator end. Specifying the wrong rotation direction means increasing control signal closes the valve instead of opening it, resulting in reversed control action. Always verify rotation direction with valve/damper manufacturer data and confirm during commissioning.',
  },
  {
    question: 'How do I interface a 4-20mA actuator with a 0-10V BMS output?',
    answer:
      'When the actuator requires 4-20mA but the BMS provides 0-10V, a signal converter is required. These converters are active devices requiring power (typically 24V DC) and perform voltage-to-current conversion. The 0-10V input produces proportional 4-20mA output. Ensure the converter has adequate accuracy (typically 0.5% or better) and response time for the application. Some modern actuators accept both signal types - check the datasheet before adding converters. Consider specifying matched signal types during design to avoid additional components.',
  },
];

const HNCModule8Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5")}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 8 · Section 5 · Subsection 3"
            title="Actuators and Output Devices"
            description="Valve actuators, damper actuators, control signal types, spring return mechanisms, and actuator sizing"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Differentiate between linear and rotary valve actuator types",
              "Select appropriate actuators for modulating vs on/off control",
              "Understand 0-10V, 2-10V, and 4-20mA control signal applications",
              "Specify spring return actuators for fail-safe operation",
              "Calculate torque requirements for damper actuators",
              "Size actuators based on valve stroke and system requirements",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Valve Actuator Types">
            <p>Valve actuators convert electrical control signals into mechanical motion to position valves within HVAC systems. The actuator type must match both the valve mechanism and the required control precision. Understanding the differences between linear and rotary actuators is essential for correct specification.</p>
            <p><strong>Linear Valve Actuators</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Produce straight-line (up/down) motion</li>
              <li>Used for: Globe valves, gate valves</li>
              <li>Stroke: Typically 2.5mm to 40mm</li>
              <li>Force output rated in Newtons (N)</li>
              <li>Direct stem connection or yoke mounting</li>
            </ul>
            <p><strong>Rotary Valve Actuators</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Produce rotational motion</li>
              <li>Used for: Ball valves, butterfly valves</li>
              <li>Rotation: Typically 90° (quarter-turn)</li>
              <li>Torque output rated in Newton-metres (Nm)</li>
              <li>Direct coupling to valve shaft</li>
            </ul>
            <p><strong>Valve and Actuator Matching</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>2-port globe valve:</strong> Linear — Stroke (mm), Force (N) — LTHW/CHW flow control</li>
              <li><strong>3-port mixing valve:</strong> Linear — Stroke (mm), Force (N) — Temperature blending</li>
              <li><strong>Ball valve:</strong> Rotary 90° — Torque (Nm) — On/off isolation, 2-way control</li>
              <li><strong>Butterfly valve:</strong> Rotary 90° — Torque (Nm) — Large bore isolation, AHU coils</li>
              <li><strong>Characterised ball valve:</strong> Rotary 90° — Torque (Nm) — Modulating control with equal percentage</li>
            </ul>
            <p><strong>Actuator Force and Stroke Requirements</strong></p>
            <p>Linear actuator selection requires matching both parameters:</p>
            <p><strong>Stroke:</strong> Must equal or exceed valve stem travel</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Small valves (DN15-25): Typically 5-10mm stroke</li>
              <li>Medium valves (DN32-50): Typically 15-20mm stroke</li>
              <li>Large valves (DN65+): Typically 20-40mm stroke</li>
            </ul>
            <p><strong>Force:</strong> Must overcome valve close-off pressure</p>
            <p>Force (N) = Pressure (kPa) × Valve seat area (cm²) × 10</p>
            <p><strong>Selection principle:</strong> Always verify actuator stroke matches valve requirement. An actuator with insufficient stroke will not fully open or close the valve, causing poor control and potential system issues.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Damper Actuators">
            <p>Damper actuators control airflow in HVAC ductwork by positioning damper blades. Unlike valve actuators which deal with liquid pressure, damper actuators must overcome the resistance of damper blades against air static pressure and the friction of blade bearings and seals.</p>
            <p><strong>Damper actuator types by mounting:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Direct-coupled:</strong> Actuator mounts directly on damper shaft, no linkage required</li>
              <li><strong>Crank arm/linkage:</strong> External actuator connected via mechanical linkage</li>
              <li><strong>Jackshaft:</strong> Multiple dampers driven from single actuator via shaft and linkages</li>
              <li><strong>Integral:</strong> Actuator built into damper assembly as complete unit</li>
            </ul>
            <p><strong>Damper Actuator Torque Calculation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Opposed blade (low pressure):</strong> &lt;500 Pa — 4-8 — Standard ventilation</li>
              <li><strong>Opposed blade (medium pressure):</strong> 500-1000 Pa — 8-12 — VAV systems</li>
              <li><strong>Parallel blade:</strong> &lt;500 Pa — 4-6 — 2-position isolation</li>
              <li><strong>Fire/smoke damper:</strong> Variable — 15-25 — High friction seals</li>
              <li><strong>High-pressure industrial:</strong> &gt;1000 Pa — 12-20 — Process applications</li>
            </ul>
            <p><strong>Torque Calculation Example</strong></p>
            <p><span>Given:</span></p>
            <p>Damper size: 600mm × 400mm opposed blade</p>
            <p>System static pressure: 400 Pa</p>
            <p>Damper condition: Standard HVAC, clean</p>
            <p><span>Calculation:</span></p>
            <p>Damper area = 0.6m × 0.4m = 0.24 m²</p>
            <p>Torque factor (low pressure opposed blade) = 6 Nm/m²</p>
            <p>Base torque = 0.24 × 6 = 1.44 Nm</p>
            <p>Safety factor (25%) = 1.44 × 1.25 = 1.8 Nm</p>
            <p>Specify: Minimum 2 Nm actuator (next standard size up)</p>
            <p><strong>Direct-Coupled Advantages</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No mechanical linkage = no backlash</li>
              <li>Simpler installation and adjustment</li>
              <li>More accurate positioning</li>
              <li>Lower maintenance requirements</li>
              <li>Standard for BMS-controlled dampers</li>
            </ul>
            <p><strong>Linkage Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Large dampers requiring high torque</li>
              <li>Multiple dampers from one actuator</li>
              <li>Retrofit installations with space constraints</li>
              <li>Fire dampers with external actuation</li>
              <li>Jackshaft systems for face/bypass</li>
            </ul>
            <p><strong>Installation note:</strong> Direct-coupled actuators must be correctly oriented on the damper shaft. Most have a rotation direction marking - verify this matches the required open/close action before final fixing.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Control Signals: Modulating vs On/Off">
            <p>Actuators receive control signals from the BMS to determine their position. The control type - on/off (two-position) or modulating (proportional) - fundamentally affects system performance, energy efficiency, and comfort. Understanding the available signal types enables correct specification for each application.</p>
            <p><strong>On/Off (Two-Position) Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Valve/damper is either fully open or fully closed</li>
              <li>Controlled by simple relay contact (24V AC)</li>
              <li>Lower cost actuator and controller</li>
              <li>Causes temperature cycling (swing)</li>
              <li>Used for: Zone isolation, on/off loads</li>
            </ul>
            <p><strong>Modulating (Proportional) Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Valve/damper positions anywhere 0-100%</li>
              <li>Analogue signal (0-10V, 2-10V, 4-20mA)</li>
              <li>Precise temperature/flow control</li>
              <li>Eliminates cycling, improves comfort</li>
              <li>Used for: AHU coils, VAV boxes, FCUs</li>
            </ul>
            <p><strong>Analogue Control Signal Comparison</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>0-10V DC:</strong> 0V = 0%, 10V = 100% — Limited (0V valid) — 2-core screened — Standard HVAC</li>
              <li><strong>2-10V DC:</strong> 2V = 0%, 10V = 100% — Good (0V = fault) — 2-core screened — Critical systems</li>
              <li><strong>4-20mA:</strong> 4mA = 0%, 20mA = 100% — Good (0mA = fault) — 2-core screened, loop — Long distances, noisy</li>
              <li><strong>Three-point floating:</strong> Open/Close/Stop — Limited — 3-core + common — Simple systems, retrofit</li>
            </ul>
            <p><strong>0-10V vs 2-10V: The Critical Difference</strong></p>
            <p><strong>0-10V signal:</strong></p>
            <p>0V = Actuator at 0% position (fully closed)</p>
            <p>Problem: If cable breaks, signal = 0V, same as valid minimum position</p>
            <p>BMS cannot distinguish between "drive to 0%" and "cable fault"</p>
            <p><strong>2-10V signal:</strong></p>
            <p>2V = Actuator at 0% position (fully closed)</p>
            <p>If cable breaks, signal = 0V, which is below valid range</p>
            <p>BMS detects 0V as fault condition and can raise alarm</p>
            <p><strong>Three-Point Floating Control</strong></p>
            <p>Three-point floating control uses three wires: Open, Close, and Common. The controller energises the Open or Close wire to drive the actuator in the required direction. When neither is energised, the actuator stops at its current position.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Open wire energised: Actuator drives towards open</li>
              <li>Close wire energised: Actuator drives towards closed</li>
              <li>Neither energised: Actuator holds position</li>
              <li>Controller estimates position by timing (no feedback)</li>
            </ul>
            <p>Advantage: Uses simple relay outputs, no analogue channels required. Disadvantage: Less precise, requires periodic recalibration to end stops.</p>
            <p><strong>Specification tip:</strong> For critical applications (hospital wards, data centres, clean rooms), always specify 2-10V control signals to enable cable fault detection and improve system reliability.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Spring Return, Fail-Safe, and Sizing Criteria">
            <p>Fail-safe operation is critical in HVAC systems. Spring return actuators ensure valves and dampers move to a predetermined safe position on power failure or control signal loss. Correct sizing ensures the actuator can reliably operate the valve or damper throughout its service life.</p>
            <p><strong>Spring return configurations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Normally Open (NO):</strong> Spring drives valve open on power loss - used for heating</li>
              <li><strong>Normally Closed (NC):</strong> Spring drives valve closed on power loss - used for cooling, steam</li>
              <li><strong>Non-spring return:</strong> Actuator holds last position on power loss - used where safe</li>
            </ul>
            <p><strong>Fail-Safe Selection Guide</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>LTHW heating valve:</strong> Open — Spring return NO — Prevent freeze damage, maintain warmth</li>
              <li><strong>CHW cooling valve:</strong> Closed — Spring return NC — Prevent overcooling, condensation</li>
              <li><strong>Data centre cooling:</strong> Open — Spring return NO — Maintain cooling for equipment protection</li>
              <li><strong>Steam valve:</strong> Closed — Spring return NC — Safety - prevent uncontrolled steam flow</li>
              <li><strong>Fresh air damper:</strong> Closed — Spring return NC — Prevent uncontrolled outside air ingress</li>
              <li><strong>Fire/smoke damper:</strong> Closed — Spring return NC — Fire compartmentation</li>
              <li><strong>General ventilation damper:</strong> Last position — Non-spring return — No safety-critical fail position</li>
            </ul>
            <p><strong>Actuator Sizing Checklist</strong></p>
            <p><strong>For Valve Actuators:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stroke ≥ valve stem travel</li>
              <li>Force ≥ close-off pressure requirement × 1.25</li>
              <li>Running time appropriate for control loop</li>
              <li>Supply voltage matches available power</li>
              <li>Control signal compatible with BMS output</li>
              <li>Fail position (spring return if required)</li>
            </ul>
            <p><strong>For Damper Actuators:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Torque ≥ calculated requirement × 1.25</li>
              <li>Rotation angle matches damper (usually 90°)</li>
              <li>Mounting type compatible (direct/linkage)</li>
              <li>Running time suits application</li>
              <li>Control signal matches BMS</li>
              <li>Position feedback if required</li>
            </ul>
            <p><strong>Running Time Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>15-30 seconds:</strong> On/off actuators, quick-acting — Fast response, may cause hunting if used for modulating</li>
              <li><strong>60-90 seconds:</strong> Fast modulating, small systems — Good response, suits tight control loops</li>
              <li><strong>90-120 seconds:</strong> Standard HVAC modulating — Smooth control, prevents hunting</li>
              <li><strong>150-240 seconds:</strong> Large dampers, high inertia systems — Stable control, slower response</li>
            </ul>
            <p><strong>Common Sizing Errors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Undersized torque:</strong> Actuator struggles or fails to move damper against pressure</li>
              <li><strong>Oversized actuator:</strong> Can damage valve/damper, wastes energy, causes hunting</li>
              <li><strong>Wrong stroke:</strong> Valve does not fully open or close, poor control</li>
              <li><strong>Too fast running time:</strong> Causes control instability and hunting</li>
              <li><strong>Wrong fail position:</strong> System fails to unsafe condition</li>
            </ul>
            <p><strong>Design principle:</strong> Always apply a 25% safety factor to calculated torque or force requirements. This accounts for bearing friction increase over time, dirt accumulation, and operating conditions beyond design parameters.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Valve Actuator Selection for AHU Heating Coil</strong>
            </p>
            <p><strong>Scenario:</strong> Select an actuator for a DN32 2-port LTHW valve on an AHU heating coil with 400kPa differential pressure.</p>
            <p>Given data:</p>
            <p>Valve: DN32, 2-port globe valve, 10mm stroke</p>
            <p>Differential pressure: 400 kPa</p>
            <p>Control: Modulating 0-10V from BMS</p>
            <p>Fail-safe: Required (heating application)</p>
            <p>Force calculation:</p>
            <p>Valve seat area (DN32) ≈ 3.2 cm² (from valve datasheet)</p>
            <p>Force = 400 kPa × 3.2 cm² × 10 = 1,280 N</p>
            <p>With 25% safety factor = 1,280 × 1.25 = 1,600 N</p>
            <p>Actuator specification:</p>
            <p>- Stroke: ≥10mm (valve requirement)</p>
            <p>- Force: ≥1,600N</p>
            <p>- Control: 0-10V DC input</p>
            <p>- Running time: 90-120 seconds (standard HVAC)</p>
            <p>- Fail position: Spring return Normally Open (NO)</p>
            <p>- Supply: 24V AC (SELV for safety)</p>
            <p>Select: Linear actuator 2,500N, 15mm stroke, spring return NO</p>
            <p>
              <strong>Example 2: Damper Actuator Sizing for Fresh Air Intake</strong>
            </p>
            <p><strong>Scenario:</strong> Size a direct-coupled actuator for an 800mm × 600mm fresh air intake damper operating against 600Pa static pressure.</p>
            <p>Given data:</p>
            <p>Damper: 800mm × 600mm opposed blade</p>
            <p>Static pressure: 600 Pa (medium pressure)</p>
            <p>Control: Modulating 2-10V</p>
            <p>Position feedback: Required</p>
            <p>Torque calculation:</p>
            <p>Damper area = 0.8m × 0.6m = 0.48 m²</p>
            <p>Torque factor (medium pressure) = 10 Nm/m²</p>
            <p>Base torque = 0.48 × 10 = 4.8 Nm</p>
            <p>With 25% safety factor = 4.8 × 1.25 = 6.0 Nm</p>
            <p>Actuator specification:</p>
            <p>- Torque: ≥6 Nm</p>
            <p>- Rotation: 90°</p>
            <p>- Control: 2-10V DC (fault detection)</p>
            <p>- Feedback: 2-10V position signal</p>
            <p>- Running time: 90 seconds</p>
            <p>- Fail position: Spring return NC (prevent uncontrolled outside air)</p>
            <p>Select: 8 Nm direct-coupled, spring return closed, 2-10V with feedback</p>
            <p>
              <strong>Example 3: Position Feedback Signal Interpretation</strong>
            </p>
            <p><strong>Scenario:</strong> A modulating actuator with 2-10V feedback shows various readings. Interpret the damper positions.</p>
            <p>Signal interpretation (2-10V range):</p>
            <p>Feedback reading: 2.0V</p>
            <p>Position = (2.0 - 2) / (10 - 2) × 100% = 0%</p>
            <p>Damper is fully closed</p>
            <p>Feedback reading: 6.0V</p>
            <p>Position = (6.0 - 2) / (10 - 2) × 100% = 50%</p>
            <p>Damper is half open</p>
            <p>Feedback reading: 10.0V</p>
            <p>Position = (10.0 - 2) / (10 - 2) × 100% = 100%</p>
            <p>Damper is fully open</p>
            <p>Feedback reading: 0.0V</p>
            <p>Invalid - below 2V minimum indicates cable fault!</p>
            <p>BMS should generate fault alarm</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Actuator Selection Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Match actuator type to valve mechanism (linear vs rotary)</li>
              <li>Verify stroke or rotation angle meets valve/damper requirement</li>
              <li>Calculate force/torque requirement with 25% safety factor</li>
              <li>Specify appropriate running time for control application</li>
              <li>Determine fail-safe position requirement (spring return NO/NC)</li>
              <li>Confirm control signal compatibility with BMS outputs</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard HVAC running time: <strong>90-120 seconds</strong></li>
              <li>Low-pressure damper torque factor: <strong>4-8 Nm/m²</strong></li>
              <li>Safety factor for sizing: <strong>25% minimum</strong></li>
              <li>2-10V fault threshold: <strong>&lt;2V indicates cable break</strong></li>
              <li>SELV supply voltage: <strong>24V AC</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Using linear actuator on rotary valve</strong> - incompatible motion types</li>
                <li><strong>Specifying wrong fail position</strong> - system fails to unsafe state</li>
                <li><strong>Ignoring close-off pressure rating</strong> - valve leaks under pressure</li>
                <li><strong>Running time too fast for modulating</strong> - causes control hunting</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Sensors and measurement
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Communication protocols
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section5_3;
