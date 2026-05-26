/**
 * Module 8 · Section 5 · Subsection 5 — Control Strategies
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   Advanced BMS control techniques for optimising HVAC system performance and energy efficiency
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

const TITLE = 'Control Strategies - HNC Module 8 Section 5.5';
const DESCRIPTION =
  'Master BMS control strategies: PID control theory and tuning, cascade control loops, optimised start/stop algorithms, demand-based control (DCV), chilled water reset, supply air temperature reset and night setback strategies.';

const quickCheckQuestions = [
  {
    id: 'pid-components',
    question:
      'In a PID controller, which term responds to the current error value and provides immediate corrective action?',
    options: [
      'Derivative (D)',
      'Proportional (P)',
      'All three equally',
      'Integral (I)',
    ],
    correctIndex: 1,
    explanation:
      'The Proportional term provides output directly proportional to the current error. It gives immediate response but cannot eliminate steady-state error on its own.',
  },
  {
    id: 'cascade-benefit',
    question: 'What is the primary benefit of cascade control over single-loop control?',
    options: [
      'Ratio of 10-minute to 1-minute resistance readings',
      'Electrical isolation and safe working practices',
      'Converting sound energy to heat in porous material',
      'Faster response to secondary disturbances',
    ],
    correctIndex: 3,
    explanation:
      'Cascade control places a secondary (inner) loop around disturbances, correcting them before they affect the primary (outer) loop. This significantly improves response time.',
  },
  {
    id: 'optimum-start',
    question: 'What data does an optimum start algorithm typically use to calculate pre-heat time?',
    options: [
      'Short circuit causing flashover and burns',
      'Apply the hierarchy of control when assessing risks',
      'Voltage equals current multiplied by resistance',
      'Building thermal mass and outside temperature',
    ],
    correctIndex: 3,
    explanation:
      'Optimum start algorithms use outside air temperature, building thermal characteristics (thermal mass, insulation), and sometimes historical data to calculate the minimum pre-conditioning time required.',
  },
  {
    id: 'dcv-sensor',
    question:
      'In demand-controlled ventilation (DCV), what is the most common parameter used to indicate occupancy levels?',
    options: [
      'Temperature',
      'Humidity',
      'Light levels',
      'CO2 concentration',
    ],
    correctIndex: 3,
    explanation:
      'CO2 concentration is the most common indicator for DCV as it directly correlates with human occupancy and metabolic activity, allowing ventilation to match actual demand.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the 'I' in PID control stand for?",
    options: [
      'Immediate',
      'Integral',
      'Inverse',
      'Incremental',
    ],
    correctAnswer: 1,
    explanation:
      "The 'I' stands for Integral. The integral term sums the error over time and eliminates steady-state offset that proportional control alone cannot remove.",
  },
  {
    id: 2,
    question: 'In PID tuning, what symptom indicates excessive integral action?',
    options: [
      'Steady-state error',
      'Slow response',
      'Oscillation and overshoot',
      'No response to setpoint changes',
    ],
    correctAnswer: 2,
    explanation:
      'Excessive integral action causes overshoot, oscillation, and slow settling as the accumulated error continues to drive the output even after the setpoint is reached.',
  },
  {
    id: 3,
    question: 'What is the purpose of derivative action in a PID controller?',
    options: [
      'To provide proportional response',
      'To eliminate steady-state error',
      'To reduce energy consumption',
      'To anticipate future error based on rate of change',
    ],
    correctAnswer: 3,
    explanation:
      "Derivative action responds to the rate of change of error, effectively 'anticipating' where the process is heading. This reduces overshoot and improves stability.",
  },
  {
    id: 4,
    question:
      'In a cascade control system for AHU heating, what would typically be the inner loop?',
    options: [
      'Supply air temperature control',
      'Heating coil valve position',
      'Room temperature control',
      'Outside air temperature measurement',
    ],
    correctAnswer: 0,
    explanation:
      'The inner (secondary) loop controls supply air temperature, responding quickly to coil disturbances. The outer (primary) loop controls room temperature by adjusting the supply air setpoint.',
  },
  {
    id: 5,
    question: 'What factor does optimum stop control primarily consider?',
    options: [
      'Energy tariff rates',
      'Building thermal decay rate',
      'Staff overtime costs',
      'Equipment maintenance schedule',
    ],
    correctAnswer: 1,
    explanation:
      "Optimum stop calculates how early plant can be switched off whilst maintaining comfort until the end of occupancy, based on the building's thermal decay characteristics.",
  },
  {
    id: 6,
    question:
      'What is the typical CO2 setpoint for demand-controlled ventilation in occupied spaces?',
    options: [
      '400 ppm',
      '600 ppm',
      '800-1000 ppm',
      '1500 ppm',
    ],
    correctAnswer: 2,
    explanation:
      'DCV typically maintains CO2 between 800-1000 ppm above outdoor levels. This indicates acceptable air quality whilst avoiding over-ventilation and wasted energy.',
  },
  {
    id: 7,
    question: 'Chilled water supply temperature reset typically increases the setpoint when:',
    options: [
      'Cooling load increases',
      'Occupancy increases',
      'Humidity rises',
      'Cooling load decreases',
    ],
    correctAnswer: 3,
    explanation:
      'When cooling load decreases, the chilled water setpoint can be raised (reset upwards), reducing chiller energy consumption whilst still meeting the reduced demand.',
  },
  {
    id: 8,
    question: 'What is the primary energy-saving mechanism of supply air temperature reset?',
    options: [
      'Reducing reheat energy and improving chiller efficiency',
      'To anticipate future error based on rate of change',
      'Widens the temperature deadband to reduce plant operation',
      'Limiting integral accumulation when output is saturated',
    ],
    correctAnswer: 0,
    explanation:
      'Raising supply air temperature in cooling mode reduces simultaneous cooling and reheating, and allows chillers to operate at higher efficiency with elevated chilled water temperatures.',
  },
  {
    id: 9,
    question: 'Night setback control typically:',
    options: [
      'Limiting integral accumulation when output is saturated',
      'Widens the temperature deadband to reduce plant operation',
      'Reducing reheat energy and improving chiller efficiency',
      'To anticipate future error based on rate of change',
    ],
    correctAnswer: 1,
    explanation:
      'Night setback widens the acceptable temperature range (e.g., heating setpoint 12C, cooling setpoint 28C) to minimise plant operation whilst protecting against extreme temperatures.',
  },
  {
    id: 10,
    question: 'Which tuning method involves deliberately inducing oscillations in a control loop?',
    options: [
      'Use appropriate PPE and procedures',
      'Connect shield at both ends',
      'Ziegler-Nichols ultimate gain method',
      'Pressing the test button (if fitted)',
    ],
    correctAnswer: 2,
    explanation:
      'The Ziegler-Nichols ultimate gain method increases proportional gain until sustained oscillation occurs, then calculates PID parameters from the critical gain and oscillation period.',
  },
  {
    id: 11,
    question:
      'In a variable air volume (VAV) system, what parameter is typically reset based on zone demand?',
    options: [
      'Oscillation and overshoot',
      'Building thermal decay rate',
      'Ziegler-Nichols ultimate gain method',
      'Supply air static pressure setpoint',
    ],
    correctAnswer: 3,
    explanation:
      'Static pressure reset reduces the duct pressure setpoint when VAV boxes are not fully open, reducing fan energy whilst maintaining airflow to zones that need it.',
  },
  {
    id: 12,
    question: "What is 'anti-windup' in PID control?",
    options: [
      'Limiting integral accumulation when output is saturated',
      'Widens the temperature deadband to reduce plant operation',
      'Reducing reheat energy and improving chiller efficiency',
      'To anticipate future error based on rate of change',
    ],
    correctAnswer: 0,
    explanation:
      'Anti-windup prevents the integral term from accumulating excessively when the controller output is at its limit (saturated), avoiding large overshoot when the constraint is removed.',
  },
];

const faqs = [
  {
    question: 'Why do BMS control loops sometimes oscillate?',
    answer:
      'Oscillation typically results from excessive gain (especially proportional or integral), insufficient damping, or improper tuning for the process dynamics. Common causes include oversized valves giving excessive gain, fast-acting loops connected to slow processes, interaction between multiple loops, and mechanical issues such as sticky valves or hysteresis. Reducing gains, adding derivative action, or retuning using systematic methods usually resolves oscillation.',
  },
  {
    question: 'When should I use cascade control instead of single-loop control?',
    answer:
      'Cascade control is beneficial when: the process has a measurable intermediate variable that responds faster than the main controlled variable; there are significant disturbances affecting the inner loop; the outer loop process is slow and would respond poorly to disturbances; and the inner loop dynamics are significantly faster than the outer loop. Typical applications include room temperature controlling supply air temperature, or chilled water temperature controlling valve position.',
  },
  {
    question: 'How do I know if optimum start is working correctly?',
    answer:
      'Effective optimum start should achieve setpoint just before occupancy begins - not early (wasting energy) nor late (comfort complaints). Monitor trends of start times versus outside temperature; pre-heat time should increase in colder weather. The building should reach setpoint within a few minutes of occupancy start. If the building consistently reaches setpoint 30+ minutes early, the algorithm parameters need adjustment.',
  },
  {
    question: 'What are the limitations of CO2-based demand-controlled ventilation?',
    answer:
      'CO2 sensors detect human occupancy but not other pollutants (VOCs, particulates, odours from equipment). CO2 levels respond with a time lag to occupancy changes. Sensors require regular calibration and can drift. Some spaces (laboratories, kitchens) may need additional pollutant-specific sensing. DCV should be combined with minimum ventilation rates per building regulations and additional sensing where appropriate.',
  },
  {
    question: 'How aggressive should setpoint reset strategies be?',
    answer:
      'Reset strategies must balance energy savings against comfort and equipment protection. Typical limits include: chilled water reset from 6C to 12C maximum; supply air reset from 12C to 16C in cooling; heating hot water from 82C down to 60C minimum for legionella. Reset should be gradual (ramp limited) to avoid rapid cycling. Always maintain minimum requirements for dehumidification, equipment protection, and comfort standards.',
  },
  {
    question: 'What is the difference between dead-band and setpoint reset?',
    answer:
      'Dead-band creates a neutral zone between heating and cooling setpoints where neither operates (e.g., heat below 20C, cool above 24C, nothing between). Setpoint reset actively adjusts setpoints based on conditions (load, outside temperature, time). Both save energy: dead-band prevents simultaneous heating/cooling, whilst reset optimises plant efficiency. They are complementary strategies often used together.',
  },
];

const HNCModule8Section5_5 = () => {
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
            eyebrow="Module 8 · Section 5 · Subsection 5"
            title="Control Strategies"
            description="Advanced BMS control techniques for optimising HVAC system performance and energy efficiency"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain PID control theory and the role of each term",
              "Describe common PID tuning methods including Ziegler-Nichols",
              "Design cascade control loops for improved disturbance rejection",
              "Implement optimum start/stop algorithms for energy savings",
              "Configure demand-controlled ventilation using CO2 sensing",
              "Apply chilled water and supply air temperature reset strategies",
              "Implement night setback and unoccupied mode control",
              "Troubleshoot common control loop problems",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="PID Control Theory">
            <p>PID (Proportional-Integral-Derivative) control is the foundation of most HVAC control loops. It continuously calculates an error value as the difference between a desired setpoint and a measured process variable, then applies a correction based on proportional, integral, and derivative terms.</p>
            <p><strong>The PID Control Equation</strong></p>
            <p>Output = K<sub>p</sub>e + K<sub>i</sub>&int;e dt + K<sub>d</sub>(de/dt)</p>
            <p>Where: e = error (setpoint - measured value)</p>
            <p>K<sub>p</sub> = proportional gain, K<sub>i</sub> = integral gain, K<sub>d</sub> = derivative gain</p>
            <p><strong>The Three PID Terms</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Proportional (P):</strong> Output proportional to current error — Fast initial response — Cannot eliminate steady-state error</li>
              <li><strong>Integral (I):</strong> Output proportional to accumulated error — Eliminates steady-state offset — Can cause overshoot and windup</li>
              <li><strong>Derivative (D):</strong> Output proportional to rate of change — Anticipates and reduces overshoot — Sensitive to noise, rarely used in HVAC</li>
            </ul>
            <p><strong>Common HVAC Control Modes</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P-only:</strong> Simple, fast, but has offset</li>
              <li><strong>PI:</strong> Most common for HVAC, eliminates offset</li>
              <li><strong>PID:</strong> Best response, used for critical loops</li>
              <li><strong>On/off:</strong> Simple switching, causes cycling</li>
            </ul>
            <p><strong>Tuning Parameters</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Proportional band:</strong> Range over which output modulates</li>
              <li><strong>Integral time (Ti):</strong> Time to repeat P action</li>
              <li><strong>Derivative time (Td):</strong> Prediction horizon</li>
              <li><strong>Deadband:</strong> Neutral zone, no control action</li>
            </ul>
            <p><strong>PID Tuning Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ziegler-Nichols (ultimate gain):</strong> Increase P until oscillation, calculate from K<sub>u</sub> and P<sub>u</sub> — Fast response, some overshoot acceptable</li>
              <li><strong>Ziegler-Nichols (step response):</strong> Measure delay and time constant from step test — When oscillation testing is impractical</li>
              <li><strong>Lambda tuning:</strong> Specify desired closed-loop time constant — Conservative, no overshoot required</li>
              <li><strong>Trial and error:</strong> Systematically adjust and observe — Fine-tuning, experienced engineers</li>
              <li><strong>Auto-tuning:</strong> Controller performs automated tests — Modern BMS, initial commissioning</li>
            </ul>
            <p><strong>Practical tip:</strong> Most HVAC loops use PI control. Start with manufacturer defaults, then adjust proportional band first, followed by integral time. Only add derivative if overshoot is problematic and the signal is noise-free.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Cascade Control">
            <p>Cascade control uses two or more controllers in series, where the output of the outer (primary or master) controller becomes the setpoint for the inner (secondary or slave) controller. This configuration provides faster disturbance rejection and improved stability.</p>
            <p><strong>Cascade Control Structure</strong></p>
            <p>{` Primary (Outer) Loop Secondary (Inner) Loop ┌─────────────────┐ ┌─────────────────┐ │ │ Setpoint │ │ │ Room Temp ────┼──────────────▶│ Supply Air ────┼──▶ Valve │ Controller │ │ Controller │ │ │ │ │ └────────┬────────┘ └────────┬────────┘ │ │ │ Room Temp │ Supply Air Temp │ Sensor │ Sensor ▼ ▼ ┌─────────┐ ┌─────────┐ │ Room │ │ Coil │ └─────────┘ └─────────┘ Outer loop is SLOW (room thermal mass) Inner loop is FAST (coil response)`}</p>
            <p><strong>Requirements for Cascade Control</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Inner loop must be faster than outer loop (3-5x typical)</li>
              <li>Measurable intermediate variable required</li>
              <li>Significant disturbances affect inner loop</li>
              <li>Additional sensor and control logic needed</li>
            </ul>
            <p><strong>Benefits</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Faster rejection of secondary disturbances</li>
              <li>Improved stability and reduced overshoot</li>
              <li>Inner loop linearises valve characteristics</li>
              <li>Outer loop sees simpler process dynamics</li>
            </ul>
            <p><strong>Common HVAC Cascade Applications</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>AHU heating:</strong> Room/return air temp — Supply air temp — LTHW temp/pressure changes</li>
              <li><strong>Chilled water system:</strong> Zone temperature — CHW flow/valve position — CHW supply temp variations</li>
              <li><strong>VAV box:</strong> Zone temperature — Airflow rate — Duct pressure changes</li>
              <li><strong>Boiler plant:</strong> Flow temperature — Boiler firing rate — Return temp, load changes</li>
            </ul>
            <p><strong>Tuning Cascade Loops</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Always tune the inner loop first with outer loop in manual</li>
              <li>Inner loop should have faster response (lower Ti, higher gain)</li>
              <li>Once inner loop is stable, tune outer loop</li>
              <li>Outer loop should be slower to avoid interaction</li>
              <li>Test both loops together under various load conditions</li>
            </ul>
            <p><strong>Key principle:</strong> The inner loop must settle before the outer loop makes its next adjustment. If the outer loop is too fast, it will fight the inner loop causing instability.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Optimised Start/Stop">
            <p>Optimised start/stop (also called optimum start/stop) algorithms automatically calculate the minimum pre-conditioning time required to achieve comfort conditions by occupancy start, and the earliest time plant can be switched off whilst maintaining comfort until occupancy ends.</p>
            <p><strong>Optimum Start</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculates latest possible start time</li>
              <li>Achieves setpoint just before occupancy</li>
              <li>Considers outside temperature, building mass</li>
              <li>Learns from historical performance</li>
              <li>Reduces overnight/weekend heating costs</li>
            </ul>
            <p><strong>Optimum Stop</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Calculates earliest possible stop time</li>
              <li>Maintains comfort until end of occupancy</li>
              <li>Uses building thermal storage</li>
              <li>Considers thermal decay rate</li>
              <li>Reduces end-of-day energy consumption</li>
            </ul>
            <p><strong>Optimum Start Algorithm Factors</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outside air temperature:</strong> Lower temp = earlier start — OAT sensor</li>
              <li><strong>Inside air temperature:</strong> Lower temp = earlier start — Zone sensor</li>
              <li><strong>Building thermal mass:</strong> Higher mass = earlier start — Configured parameter</li>
              <li><strong>Plant heating/cooling capacity:</strong> Higher capacity = later start — Learned or configured</li>
              <li><strong>Historical performance:</strong> Algorithm adapts over time — Self-learning</li>
            </ul>
            <p><strong>Basic Optimum Start Calculation</strong></p>
            <p>{`Pre-heat time (hours) = (T_setpoint - T_inside) x Building Factor ──────────────────────────────────────── (T_inside - T_outside) x k Where: T_setpoint = desired occupied temperature (e.g., 21C) T_inside = current inside temperature T_outside = outside air temperature Building Factor = thermal mass coefficient (0.5-2.0 typical) k = plant capacity factor Example: Inside 15C, Outside 5C, Setpoint 21C, Factor 1.0, k = 0.6 Pre-heat = (21-15) x 1.0 / ((15-5) x 0.6) = 6/6 = 1 hour Start plant 1 hour before occupancy`}</p>
            <p><strong>Implementation Considerations</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Minimum start time:</strong> Ensure adequate time for air quality (pre-occupancy purge)</li>
              <li><strong>Maximum start time:</strong> Limit to prevent excessively early starts in extreme weather</li>
              <li><strong>Boost mode:</strong> Override for rapid warm-up if algorithm underestimates</li>
              <li><strong>Holiday schedules:</strong> Integrate with calendar for bank holidays</li>
              <li><strong>Frost protection:</strong> Override optimum stop if freeze risk</li>
            </ul>
            <p><strong>Energy savings:</strong> Properly implemented optimum start can reduce heating energy by 10-20% compared to fixed start times, with even greater savings possible for heavyweight buildings.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Demand-Based Control and Setpoint Reset">
            <p>Demand-based control adjusts system operation based on actual requirements rather than fixed schedules or worst-case assumptions. Setpoint reset strategies optimise operating conditions to match current load, improving efficiency without sacrificing comfort.</p>
            <p><strong>Demand-Controlled Ventilation (DCV)</strong></p>
            <p>DCV modulates outdoor air quantity based on actual occupancy indicators, typically CO2 concentration. This reduces the energy required to condition outdoor air during partial occupancy periods.</p>
            <p><strong>CO2-Based DCV Control:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Outdoor CO2: typically 400 ppm</li>
              <li>Target: 800-1000 ppm above outdoor</li>
              <li>Minimum ventilation always maintained</li>
              <li>Proportional control of OA damper</li>
            </ul>
            <p><strong>Alternative DCV Methods:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Occupancy sensors (PIR, counting)</li>
              <li>Schedule-based (meeting room bookings)</li>
              <li>VOC sensors (laboratories, kitchens)</li>
              <li>Combined sensing strategies</li>
            </ul>
            <p><strong>Chilled Water Temperature Reset</strong></p>
            <p>Raising the chilled water supply temperature during part-load conditions improves chiller efficiency (higher COP at elevated evaporator temperature) whilst still meeting cooling demand.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Outside air reset:</strong> CHW temp increases as OAT decreases — 6C at 30C OAT to 12C at 15C OAT</li>
              <li><strong>Valve position reset:</strong> CHW temp increases if no valves &gt;90% open — Gradual increase until demand satisfied</li>
              <li><strong>Return water reset:</strong> CHW temp based on return temperature — Maintain minimum delta-T</li>
            </ul>
            <p><strong>Supply Air Temperature Reset</strong></p>
            <p>Adjusting supply air temperature based on zone demand reduces simultaneous heating and cooling, improves dehumidification control, and optimises fan energy.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Low cooling demand:</strong> Raise SAT (e.g., 13C to 16C) — Reduced cooling and reheat energy</li>
              <li><strong>High humidity:</strong> Lower SAT for dehumidification — Improved comfort, mould prevention</li>
              <li><strong>Heating season:</strong> Raise SAT based on zone demand — Reduced reheat, improved efficiency</li>
            </ul>
            <p><strong>Static Pressure Reset (VAV Systems)</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Concept:</strong> Reduce duct pressure setpoint when VAV boxes are not fully open</li>
              <li><strong>Method:</strong> Monitor VAV damper positions; if none &gt;90% open, reduce SP setpoint</li>
              <li><strong>Benefit:</strong> Significant fan energy savings (fan power varies with cube of speed)</li>
              <li><strong>Typical range:</strong> Design pressure 400 Pa, reset down to 200 Pa minimum</li>
              <li><strong>Limitation:</strong> Requires DDC VAV boxes with position feedback</li>
            </ul>
            <p><strong>Night Setback and Unoccupied Mode</strong></p>
            <p><strong>Night Setback Settings:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heating setpoint: 10-12C (frost protection)</li>
              <li>Cooling setpoint: 28-30C (equipment protection)</li>
              <li>Ventilation: minimum or off</li>
              <li>Override facility for late working</li>
            </ul>
            <p><strong>Considerations:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Frost protection for pipes and coils</li>
              <li>Humidity limits for sensitive equipment</li>
              <li>Night purge for free cooling</li>
              <li>Security lighting requirements</li>
            </ul>
            <p><strong>Heating Hot Water Reset</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Weather compensation:</strong> Reduce flow temp as OAT rises</li>
              <li><strong>Typical curve:</strong> 82C at -5C OAT down to 60C at 15C OAT</li>
              <li><strong>Minimum temperature:</strong> 60C for legionella prevention in HWS</li>
              <li><strong>Condensing boilers:</strong> Lower return temps improve efficiency</li>
              <li><strong>Heat pumps:</strong> Lower flow temps dramatically improve COP</li>
            </ul>
            <p><strong>Integration note:</strong> Multiple reset strategies should be coordinated to avoid conflicts. For example, chilled water reset must consider dehumidification requirements that may need lower temperatures regardless of sensible cooling load.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: PID Controller Response</strong>
            </p>
            <p><strong>Scenario:</strong> A room temperature controller has setpoint 21C. Current temperature is 19C. With P-only control (K<sub>p</sub> = 10%/C), what is the controller output?</p>
            <p>Error = Setpoint - Measured = 21C - 19C = 2C</p>
            <p>Proportional output = K<sub>p</sub> x Error</p>
            <p>Output = 10%/C x 2C = <strong>20%</strong></p>
            <p>The heating valve opens 20% to respond to the 2C error.</p>
            <p>Note: With P-only control, there will be a steady-state offset because the valve cannot reach 100% output for small errors.</p>
            <p>
              <strong>Example 2: Optimum Start Calculation</strong>
            </p>
            <p><strong>Scenario:</strong> A building has inside temp 14C, outside -2C, setpoint 21C. Building factor is 1.2, plant factor k = 0.5. Calculate pre-heat time.</p>
            <p>Temperature rise required = 21C - 14C = 7C</p>
            <p>Temperature difference (inside-outside) = 14C - (-2C) = 16C</p>
            <p>Pre-heat time = (7 x 1.2) / (16 x 0.5)</p>
            <p>Pre-heat time = 8.4 / 8 = <strong>1.05 hours (63 minutes)</strong></p>
            <p>If occupancy starts at 08:00, plant should start at 06:57.</p>
            <p>In practice, round to 07:00 or add safety margin (06:45).</p>
            <p>
              <strong>Example 3: DCV CO2-Based Control</strong>
            </p>
            <p><strong>Scenario:</strong> A meeting room has 800 ppm CO2 setpoint, outdoor 400 ppm. At 100% occupancy, the outdoor air damper should be 100% open. Current CO2 is 600 ppm. What damper position?</p>
            <p>CO2 above outdoor = 600 - 400 = 200 ppm</p>
            <p>Target CO2 above outdoor = 800 - 400 = 400 ppm</p>
            <p>Occupancy proxy = 200 / 400 = 50%</p>
            <p>OA damper position = <strong>50%</strong></p>
            <p>As occupancy increases and CO2 rises toward 800 ppm, the damper will progressively open to 100%.</p>
            <p>
              <strong>Example 4: Chilled Water Reset Energy Savings</strong>
            </p>
            <p><strong>Scenario:</strong> A chiller produces 500 kW cooling. At 6C CHW, COP is 4.0. At 10C CHW, COP is 5.0. Calculate power reduction.</p>
            <p>At 6C: Compressor power = 500 / 4.0 = 125 kW</p>
            <p>At 10C: Compressor power = 500 / 5.0 = 100 kW</p>
            <p>Power saving = 125 - 100 = <strong>25 kW (20% reduction)</strong></p>
            <p>At 3000 operating hours/year and 0.15/kWh:</p>
            <p>Annual saving = 25 x 3000 x 0.15 = <strong>GBP 11,250/year</strong></p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Control Loop Troubleshooting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Continuous oscillation:</strong> Excessive gain (P or I) — Reduce proportional gain, increase Ti</li>
              <li><strong>Slow response:</strong> Insufficient gain, Ti too long — Increase gain, reduce Ti</li>
              <li><strong>Steady-state offset:</strong> No integral action, or Ti too long — Enable integral, reduce Ti</li>
              <li><strong>Overshoot then settling:</strong> Ti too short, no derivative — Increase Ti, add derivative if appropriate</li>
              <li><strong>Output stuck at limit:</strong> Integral windup, undersized plant — Enable anti-windup, check plant sizing</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>DCV CO2 setpoint: <strong>800-1000 ppm</strong> (above outdoor)</li>
              <li>CHW reset range: <strong>6C to 12C</strong> typical</li>
              <li>SAT reset range: <strong>12C to 16C</strong> (cooling mode)</li>
              <li>Night setback heating: <strong>10-12C</strong> (frost protection)</li>
              <li>LTHW minimum: <strong>60C</strong> (legionella prevention)</li>
              <li>Cascade inner loop: <strong>3-5x faster</strong> than outer loop</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Tuning outer loop first:</strong> Always tune cascade inner loop first</li>
                <li><strong>Ignoring anti-windup:</strong> Essential for any loop that can saturate</li>
                <li><strong>Over-aggressive reset:</strong> Maintain minimum for dehumidification, legionella</li>
                <li><strong>Fixed optimum start times:</strong> Algorithm should adapt to conditions</li>
                <li><strong>No sensor maintenance:</strong> CO2 sensors drift, calibrate annually</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-4")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Communication protocols
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section5-6")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                System optimisation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section5_5;
