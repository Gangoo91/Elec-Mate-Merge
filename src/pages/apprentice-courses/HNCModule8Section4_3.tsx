/**
 * Module 8 · Section 4 · Subsection 3 — Variable Speed Drives
 * HNC Electrical Engineering for Building Services (HVAC Systems)
 *   VSD principles, PWM technology, V/f control, energy savings and harmonic considerations for HVAC applications
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

const TITLE = 'Variable Speed Drives - HNC Module 8 Section 4.3';
const DESCRIPTION =
  'Master variable speed drive technology for HVAC applications: VFD/VSD principles, PWM inverter technology, V/f control, vector control, energy savings with fan laws, harmonic considerations, EMC filtering and drive selection.';

const quickCheckQuestions = [
  {
    id: 'vsd-basic',
    question: 'What is the primary purpose of a Variable Speed Drive (VSD) in an HVAC system?',
    options: [
      'To provide backup power during outages',
      'To control motor speed by varying frequency and voltage',
      'To convert AC to DC permanently',
      "To increase the motor's maximum speed beyond nameplate",
    ],
    correctIndex: 1,
    explanation:
      'A VSD controls motor speed by varying the frequency and voltage supplied to the motor. Since motor speed is proportional to supply frequency, adjusting frequency allows precise speed control for fans, pumps and compressors.',
  },
  {
    id: 'pwm-principle',
    question: 'In PWM (Pulse Width Modulation) technology, how is the output voltage controlled?',
    options: [
      'By varying the amplitude of the DC bus voltage',
      'By using a variable transformer at the output',
      'By varying the width of voltage pulses at a fixed DC bus voltage',
      'By changing the switching frequency of the inverter',
    ],
    correctIndex: 2,
    explanation:
      'PWM controls output voltage by varying the width (duration) of voltage pulses. The DC bus voltage remains constant, but by changing the pulse width (duty cycle), the effective RMS voltage to the motor is controlled whilst maintaining a sinusoidal average.',
  },
  {
    id: 'vf-ratio',
    question: 'Why must the V/f ratio be maintained constant in standard VSD operation?',
    options: [
      'To keep the inverter switching frequency within its rated band',
      'To limit the starting current drawn by the motor',
      'To prevent harmonic distortion on the supply side',
      'To maintain constant magnetic flux and thus constant torque capability',
    ],
    correctIndex: 3,
    explanation:
      "Motor flux is proportional to V/f. Maintaining constant V/f ensures constant flux, which maintains the motor's torque-producing capability across the speed range. Reducing voltage without reducing frequency would cause flux collapse and loss of torque.",
  },
  {
    id: 'cube-law',
    question:
      'According to the fan affinity laws, if fan speed is reduced to 50%, what is the power consumption?',
    options: [
      '75% of full speed power',
      '12.5% of full speed power',
      '50% of full speed power',
      '25% of full speed power',
    ],
    correctIndex: 1,
    explanation:
      'Power varies with the cube of speed (P proportional to N cubed). At 50% speed: Power = 0.5 cubed = 0.125 = 12.5%. This cubic relationship is why VSDs offer such dramatic energy savings on variable-torque loads like fans and pumps.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What are the three main sections of a typical AC Variable Speed Drive?',
    options: [
      'Transformer, capacitor bank, motor',
      'Rectifier, DC bus, inverter',
      'Filter, amplifier, modulator',
      'Starter, contactor, overload',
    ],
    correctAnswer: 1,
    explanation:
      'A VSD comprises: (1) Rectifier - converts AC to DC, (2) DC bus - smooths DC with capacitors, (3) Inverter - converts DC back to variable frequency AC using IGBTs or similar switching devices.',
  },
  {
    id: 2,
    question: 'What is the typical DC bus voltage in a VSD supplied from 400V three-phase?',
    options: [
      '230V DC',
      '400V DC',
      'About 565V DC',
      'About 325V DC',
    ],
    correctAnswer: 2,
    explanation:
      'The DC bus voltage equals peak line voltage: Vdc = Vline x root(2) = 400 x 1.414 = approximately 565V DC. This is higher than the RMS supply voltage because the rectifier charges capacitors to the peak value.',
  },
  {
    id: 3,
    question: 'What is the relationship between motor synchronous speed and supply frequency?',
    options: [
      'Speed = 60 x f / p (where p = number of poles)',
      'Speed = 120 x f / p (where p = pole pairs)',
      'Speed = f x p / 120',
      'Speed = 120 x f / p (where p = number of poles)',
    ],
    correctAnswer: 3,
    explanation:
      'Synchronous speed Ns = 120f/p where f = frequency (Hz) and p = number of poles. A 4-pole motor at 50Hz: Ns = 120 x 50 / 4 = 1500 rpm. At 25Hz: Ns = 750 rpm.',
  },
  {
    id: 4,
    question:
      'What happens to motor torque capability if frequency is increased above base frequency whilst maintaining rated voltage?',
    options: [
      'Torque decreases as flux weakens',
      'Torque increases in proportion to frequency',
      'Torque stays constant up to twice base frequency',
      'Torque is unaffected by changes in frequency',
    ],
    correctAnswer: 0,
    explanation:
      "Above base frequency, voltage cannot increase (limited by supply), so V/f ratio decreases, flux weakens, and torque capability reduces. This is the 'constant power' or 'field weakening' region where the motor can maintain power but not torque.",
  },
  {
    id: 5,
    question:
      'What is the main advantage of vector control (flux vector/field-oriented control) over V/f control?',
    options: [
      'Lower harmonic distortion drawn from the supply',
      'Better speed and torque control, especially at low speeds and under varying loads',
      'Higher switching frequency reducing audible motor noise',
      'Reduced standing losses when the motor is at rest',
    ],
    correctAnswer: 1,
    explanation:
      'Vector control independently controls flux and torque components of motor current, providing superior dynamic response, accurate speed regulation at low speeds, and better torque control under varying loads - essential for precise positioning and high-performance applications.',
  },
  {
    id: 6,
    question:
      'A centrifugal pump operates at variable flow using a VSD. At 70% speed, what is the approximate power consumption?',
    options: [
      '70% of full power',
      '49% of full power',
      '34% of full power',
      '24.5% of full power',
    ],
    correctAnswer: 2,
    explanation:
      'For centrifugal pumps (variable torque loads), power varies with speed cubed: P = 0.7 cubed = 0.343 = approximately 34%. This dramatic reduction compared to throttling valves (which waste energy) makes VSDs highly efficient for pump control.',
  },
  {
    id: 7,
    question: 'What are the typical harmonic orders generated by a 6-pulse VSD rectifier?',
    options: [
      '2nd, 4th, 6th harmonics',
      '3rd, 9th, 15th harmonics',
      'All odd harmonics equally',
      '5th, 7th, 11th, 13th harmonics',
    ],
    correctAnswer: 3,
    explanation:
      '6-pulse rectifiers generate harmonics of order h = 6k plus/minus 1 where k = 1, 2, 3... This gives 5th, 7th, 11th, 13th, etc. The 5th and 7th are typically the largest, with magnitudes inversely proportional to harmonic order.',
  },
  {
    id: 8,
    question: 'What is the purpose of a line reactor (choke) fitted at the VSD input?',
    options: [
      'To reduce harmonic currents and protect against supply transients',
      'To smooth the PWM output waveform to the motor',
      'To provide dynamic braking energy dissipation',
      'To filter EMI radiated from the motor cables',
    ],
    correctAnswer: 0,
    explanation:
      'Input line reactors (typically 3-5% impedance) reduce harmonic current distortion by smoothing current peaks, protect the rectifier from supply voltage spikes and transients, and reduce DC bus ripple - improving both power quality and drive reliability.',
  },
  {
    id: 9,
    question: 'What EMC precaution is essential when installing VSD cables?',
    options: [
      'Run input and output cables in the same conduit',
      'Use screened/shielded cables with 360-degree termination at both ends',
      'Increase the cable cross-section by one size',
      'Earth the cable screen at the motor end only',
    ],
    correctAnswer: 1,
    explanation:
      'VSD output cables carry high-frequency PWM switching waveforms that radiate EMI. Screened cables with proper 360-degree gland terminations at both drive and motor ends contain the emissions, preventing interference with sensitive equipment and ensuring EMC compliance.',
  },
  {
    id: 10,
    question:
      'What is the typical Total Harmonic Distortion (THDi) of a standard 6-pulse VSD without filtering?',
    options: [
      'Less than 5%',
      '5-10%',
      '30-40%',
      '80-100%',
    ],
    correctAnswer: 2,
    explanation:
      'Standard 6-pulse VSDs typically produce 30-40% THDi at full load, potentially higher at part load. This can cause transformer heating, neutral conductor overload, and interference with other equipment - hence the need for harmonic mitigation on larger installations.',
  },
  {
    id: 11,
    question:
      'What determines the minimum speed at which a motor can operate continuously when driven by a VSD?',
    options: [
      'The maximum switching frequency of the inverter',
      'The harmonic distortion limit set by the supply',
      'The rated voltage of the DC bus capacitors',
      'Motor cooling capability - fan-cooled motors lose cooling at low speeds',
    ],
    correctAnswer: 3,
    explanation:
      'Self-cooled (IC411) motors have shaft-mounted fans whose airflow reduces with speed. Below typically 20-30% speed, cooling may be inadequate for continuous full-torque operation. Solutions include force-ventilated motors (IC416), derating, or inverter-duty motors designed for extended speed range.',
  },
  {
    id: 12,
    question:
      'For an HVAC supply fan motor rated 15kW, what VSD rating would typically be selected?',
    options: [
      '15kW or the next size up (typically 18.5kW)',
      'Exactly half the motor rating (7.5kW)',
      'At least double the motor rating (30kW)',
      'The nearest standard frame size regardless of kW',
    ],
    correctAnswer: 0,
    explanation:
      'VSDs are selected to match or slightly exceed motor kW rating. For a 15kW motor, a 15kW drive is suitable, though selecting 18.5kW provides margin for motor overloads and future-proofing. Over-sizing beyond this wastes capital cost without benefit.',
  },
  {
    id: 13,
    question: 'What is an Active Front End (AFE) in VSD technology?',
    options: [
      'A passive LC filter fitted to the drive output',
      'An IGBT-based rectifier that can regenerate power and reduce harmonics',
      'A bypass contactor that connects the motor direct on-line',
      'A pre-charge circuit that limits DC bus inrush current',
    ],
    correctAnswer: 1,
    explanation:
      'An AFE uses IGBTs in the rectifier section instead of diodes, enabling regenerative braking (power return to supply), near-unity power factor, and very low harmonic distortion (typically less than 5% THDi) - ideal for demanding applications requiring bidirectional power flow.',
  },
  {
    id: 14,
    question:
      'What is the typical carrier frequency (switching frequency) range for IGBT inverters in VSDs?',
    options: [
      '50-60 Hz',
      '1-4 kHz',
      '2-16 kHz',
      '50-100 kHz',
    ],
    correctAnswer: 2,
    explanation:
      'Modern IGBT inverters typically switch at 2-16 kHz. Higher frequencies produce smoother motor current and quieter operation but increase inverter losses and motor insulation stress. 4-8 kHz is common for HVAC applications, balancing efficiency and motor heating.',
  },
];

const faqs = [
  {
    question: 'What is the difference between VSD, VFD, and inverter?',
    answer:
      "These terms are often used interchangeably. VSD (Variable Speed Drive) is the generic term for any drive that varies motor speed. VFD (Variable Frequency Drive) specifically describes AC drives that vary frequency. 'Inverter' technically refers only to the DC-to-AC converter section, but is commonly used to mean the complete drive. In HVAC applications, they all typically refer to the same equipment - an AC drive that controls induction motor speed by varying frequency and voltage.",
  },
  {
    question: 'Why do VSDs cause harmonic problems and how can they be mitigated?',
    answer:
      "VSDs draw non-sinusoidal current from the supply due to the rectifier's switching action, creating harmonic currents (5th, 7th, 11th, 13th, etc.). Mitigation options include: input line reactors (3-5% impedance) for moderate reduction, passive harmonic filters (tuned LC circuits), 12-pulse or 18-pulse rectifier configurations, active front ends (AFE) for best performance, or active filters. Engineering Standard G5/5 limits harmonic contribution to UK networks.",
  },
  {
    question: 'Can any motor be controlled by a VSD?',
    answer:
      'Most standard induction motors can be VSD-controlled, but considerations include: older motors may lack insulation rated for PWM voltage spikes (inverter-duty motors recommended for new installations), motor cooling at low speeds (consider force-ventilated or oversized motors for continuous low-speed operation), motor bearings may need insulated or ceramic types to prevent EDM (Electrical Discharge Machining) damage from shaft voltages. For critical or high-performance applications, specify inverter-duty motors designed for VSD operation.',
  },
  {
    question: 'What is sensorless vector control and when is it needed?',
    answer:
      'Sensorless vector control estimates motor speed and position from current and voltage measurements rather than using a shaft encoder. It provides better speed regulation and torque control than simple V/f control, especially at low speeds and varying loads. Use it when: speed regulation better than plus/minus 1% is needed, high starting torque is required, the load varies significantly, or dynamic response is important. V/f control remains adequate for simple fan and pump applications where exact speed is not critical.',
  },
  {
    question: 'What are the main energy savings achievable with VSDs on HVAC systems?',
    answer:
      'Energy savings depend on the application profile. For centrifugal fans and pumps operating at variable load: at 80% speed = 51% power, at 60% speed = 22% power, at 50% speed = 12.5% power (cube law). Typical HVAC systems operate at 60-80% average load, offering 30-50% energy savings compared to throttling control. Payback periods of 1-3 years are common. Savings are less dramatic for constant-torque loads (conveyors, positive displacement pumps) where power varies linearly with speed.',
  },
  {
    question: 'What cable length limitations exist with VSDs and how are they addressed?',
    answer:
      "Long motor cables can cause problems due to PWM voltage reflections doubling voltage at motor terminals (reflected wave phenomenon), increased capacitive charging currents, and EMI radiation. Typical limits without mitigation: 50-100m for standard drives. Solutions include: dV/dt filters (motor chokes) to reduce voltage rise rate, sinusoidal output filters for very long runs, reduced carrier frequency, and proper screened cables. Consult drive manufacturer's guidelines for specific cable length recommendations.",
  },
];

const HNCModule8Section4_3 = () => {
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
            eyebrow="Module 8 · Section 4 · Subsection 3"
            title="Variable Speed Drives"
            description="VSD principles, PWM technology, V/f control, energy savings and harmonic considerations for HVAC applications"
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              "Explain the operating principle and main components of a VSD",
              "Describe PWM inverter technology and switching operation",
              "Understand V/f control and constant flux principle",
              "Apply vector control concepts for dynamic applications",
              "Calculate energy savings using fan and pump affinity laws",
              "Identify harmonic effects and specify appropriate mitigation",
              "Select appropriate EMC measures for VSD installations",
              "Specify VSDs for HVAC motor control applications",
            ]}
          />

          <SectionRule />

          <ConceptBlock title="VSD Principles and Construction">
            <p>A Variable Speed Drive (VSD), also known as a Variable Frequency Drive (VFD) or inverter, controls AC motor speed by varying the frequency and voltage of the power supplied to the motor. Since induction motor speed is directly proportional to supply frequency, changing frequency provides precise, efficient speed control.</p>
            <p><strong>Three main sections of a VSD:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Rectifier:</strong> Converts incoming AC to DC using diode or thyristor bridge</li>
              <li><strong>DC bus (DC link):</strong> Smooths DC with capacitors, may include braking resistor</li>
              <li><strong>Inverter:</strong> Converts DC to variable frequency AC using IGBT switches with PWM</li>
            </ul>
            <p><strong>Motor Speed Formula</strong></p>
            <p>N<sub>s</sub> = 120 &times; f / p</p>
            <p>Where Ns = synchronous speed (rpm), f = frequency (Hz), p = number of poles</p>
            <p><strong>VSD Voltage Levels</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>230V single-phase:</strong> ~325V DC — 230 &times; 1.414 = 325V</li>
              <li><strong>400V three-phase:</strong> ~565V DC — 400 &times; 1.414 = 565V</li>
              <li><strong>690V three-phase:</strong> ~975V DC — 690 &times; 1.414 = 975V</li>
            </ul>
            <p><strong>IGBT Inverter Section</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IGBT (Insulated Gate Bipolar Transistor):</strong> Fast-switching power semiconductor</li>
              <li><strong>Six IGBTs:</strong> Two per phase in three-phase inverter (upper and lower)</li>
              <li><strong>Freewheeling diodes:</strong> Parallel to each IGBT for current return paths</li>
              <li><strong>Switching frequency:</strong> Typically 2-16 kHz (carrier frequency)</li>
            </ul>
            <p><strong>Speed Calculation Example</strong></p>
            <p><strong>4-pole motor:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At 50Hz: Ns = 120 &times; 50 / 4 = <strong>1500 rpm</strong></li>
              <li>At 40Hz: Ns = 120 &times; 40 / 4 = <strong>1200 rpm</strong></li>
              <li>At 25Hz: Ns = 120 &times; 25 / 4 = <strong>750 rpm</strong></li>
              <li>At 60Hz: Ns = 120 &times; 60 / 4 = <strong>1800 rpm</strong></li>
            </ul>
            <p>Actual speed slightly less due to slip (typically 2-5%)</p>
            <p><strong>Terminology note:</strong> VSD, VFD, and inverter are often used interchangeably in HVAC. Technically, the inverter is just the DC-to-AC section, but commonly refers to the complete drive.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="PWM Technology and V/f Control">
            <p>Pulse Width Modulation (PWM) is the technique used by modern VSDs to create variable frequency, variable voltage AC output from the fixed DC bus. The inverter IGBTs switch rapidly, creating voltage pulses whose average value follows a sinusoidal pattern.</p>
            <p><strong>PWM Operating Principle:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DC bus:</strong> Provides constant DC voltage (e.g., 565V for 400V supply)</li>
              <li><strong>Pulse width:</strong> Varied to control effective output voltage</li>
              <li><strong>Switching pattern:</strong> Creates sinusoidal average current in motor</li>
              <li><strong>Carrier frequency:</strong> The switching rate (2-16 kHz typical)</li>
            </ul>
            <p><strong>V/f Ratio Control Principle</strong></p>
            <p>Flux (Phi) proportional to V / f</p>
            <p>Constant V/f ratio maintains constant motor flux and torque capability</p>
            <p><strong>Why Constant V/f is Important</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Motor torque depends on magnetic flux</li>
              <li>Flux is proportional to V/f ratio</li>
              <li>If frequency reduces without voltage reduction, flux increases (saturation)</li>
              <li>If voltage reduces without frequency reduction, flux collapses (no torque)</li>
              <li>Maintaining constant V/f keeps flux constant across speed range</li>
            </ul>
            <p><strong>V/f Characteristic Curve</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>10Hz:</strong> 80V — 8 V/Hz — Constant torque</li>
              <li><strong>25Hz:</strong> 200V — 8 V/Hz — Constant torque</li>
              <li><strong>50Hz (base):</strong> 400V — 8 V/Hz — Rated point</li>
              <li><strong>60Hz:</strong> 400V (max) — 6.67 V/Hz — Field weakening</li>
            </ul>
            <p><strong>Below Base Frequency</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Constant V/f maintained</li>
              <li>Constant torque available</li>
              <li>Power reduces with speed</li>
              <li>Normal HVAC operating range</li>
            </ul>
            <p><strong>Above Base Frequency</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage limited (cannot exceed rated)</li>
              <li>V/f ratio decreases, flux weakens</li>
              <li>Torque capability reduces</li>
              <li>Constant power region</li>
            </ul>
            <p><strong>Carrier Frequency Effects</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Smoother motor current:</strong> More motor current ripple</li>
              <li><strong>Quieter motor operation:</strong> Audible motor noise</li>
              <li><strong>Higher inverter losses:</strong> Lower inverter losses</li>
              <li><strong>More motor insulation stress:</strong> Less motor insulation stress</li>
              <li><strong>More EMI emissions:</strong> Less EMI emissions</li>
            </ul>
            <p>Typical HVAC setting: 4-8 kHz balances efficiency and motor heating</p>
            <p><strong>Low frequency boost:</strong> At very low frequencies (&lt;5Hz), additional voltage boost compensates for stator resistance voltage drop, maintaining flux and torque for starting.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Vector Control and Energy Savings">
            <p>While V/f control is adequate for most HVAC applications, vector control provides superior performance for demanding situations. Understanding both control methods and the dramatic energy savings achievable is essential for modern building services.</p>
            <p><strong>Control Method Comparison:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Speed accuracy:</strong> plus/minus 2-5% — plus/minus 0.1-1%</li>
              <li><strong>Low speed torque:</strong> Limited — Excellent (100% at 0 Hz)</li>
              <li><strong>Dynamic response:</strong> Moderate — Fast</li>
              <li><strong>Setup complexity:</strong> Simple — Motor data required</li>
              <li><strong>Typical use:</strong> Fans, pumps — Hoists, precise positioning</li>
            </ul>
            <p><strong>Fan and Pump Affinity Laws (Cube Law)</strong></p>
            <p>Flow proportional to N</p>
            <p>Q1/Q2 = N1/N2</p>
            <p>Head proportional to N squared</p>
            <p>H1/H2 = (N1/N2) squared</p>
            <p>Power proportional to N cubed</p>
            <p>P1/P2 = (N1/N2) cubed</p>
            <p><strong>Energy Savings - Power vs Speed</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>100%:</strong> 100% — 100% — Baseline</li>
              <li><strong>90%:</strong> 90% — 73% — 27%</li>
              <li><strong>80%:</strong> 80% — 51% — 49%</li>
              <li><strong>70%:</strong> 70% — 34% — 66%</li>
              <li><strong>60%:</strong> 60% — 22% — 78%</li>
              <li><strong>50%:</strong> 50% — 12.5% — 87.5%</li>
            </ul>
            <p><strong>VSD Energy Savings Calculation Example</strong></p>
            <p><strong>Scenario:</strong> 15kW AHU fan operates 5000 hours/year at average 70% speed vs damper control</p>
            <p>Damper control: Power = 15kW constant (throttled)</p>
            <p>VSD at 70%: Power = 15 &times; 0.7 cubed = 15 &times; 0.343 = 5.15kW</p>
            <p>Annual saving = (15 - 5.15) &times; 5000 hours</p>
            <p>Annual saving = <strong>49,250 kWh</strong></p>
            <p>At 15p/kWh = <strong>GBP 7,387/year</strong></p>
            <p>Typical payback: 1-2 years for 15kW drive</p>
            <p><strong>Vector Control Types</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sensorless vector:</strong> Speed estimated from current/voltage - good for most applications</li>
              <li><strong>Closed-loop vector:</strong> Uses encoder feedback - best accuracy and torque control</li>
              <li><strong>Direct Torque Control (DTC):</strong> Alternative method with very fast torque response</li>
            </ul>
            <p><strong>HVAC recommendation:</strong> V/f control is adequate for 95% of HVAC fan and pump applications. Vector control is beneficial for cooling tower fans, variable refrigerant flow compressors, and any application requiring precise speed control or high starting torque.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Harmonics, EMC and VSD Selection">
            <p>VSDs create harmonic currents that can affect power quality and cause interference. Understanding these effects and implementing appropriate mitigation is essential for compliant, reliable installations.</p>
            <p><strong>Harmonic Generation by 6-Pulse VSDs:</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Characteristic harmonics:</strong> h = 6k plus/minus 1 (5th, 7th, 11th, 13th...)</li>
              <li><strong>Typical THDi:</strong> 30-40% at full load, higher at part load</li>
              <li><strong>5th harmonic:</strong> Typically 30-40% of fundamental</li>
              <li><strong>7th harmonic:</strong> Typically 15-25% of fundamental</li>
            </ul>
            <p><strong>Harmonic Effects on Electrical Systems</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Transformer heating:</strong> Eddy currents at harmonic frequencies — Derating or overheating</li>
              <li><strong>Neutral overload:</strong> Triplen harmonics (3rd, 9th) add in neutral — Overheated neutral conductor</li>
              <li><strong>Capacitor damage:</strong> Resonance amplification — PFC capacitor failure</li>
              <li><strong>Voltage distortion:</strong> Harmonic currents in source impedance — Equipment malfunction</li>
            </ul>
            <p><strong>Harmonic Mitigation Methods</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>No mitigation (6-pulse):</strong> 30-40% — Small drives on stiff supply</li>
              <li><strong>Input line reactor (3-5%):</strong> 25-35% — Standard for medium drives</li>
              <li><strong>DC bus choke:</strong> 30-35% — Built-in on some drives</li>
              <li><strong>Passive filter:</strong> 8-15% — Large single drives</li>
              <li><strong>12-pulse rectifier:</strong> 8-12% — Large drives &gt;100kW</li>
              <li><strong>Active Front End (AFE):</strong> &lt;5% — Premium quality, regeneration</li>
              <li><strong>Active filter:</strong> &lt;5% — Multiple drives, retrofit</li>
            </ul>
            <p><strong>EMC Requirements and Measures</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BS EN 61800-3:</strong> EMC standard for power drive systems</li>
              <li><strong>Category C2:</strong> First environment (residential) - requires filtering</li>
              <li><strong>Category C3:</strong> Second environment (industrial) - less stringent</li>
              <li><strong>Motor cables:</strong> Use screened/armoured with 360-degree gland termination</li>
              <li><strong>Separation:</strong> Keep VSD cables away from signal and data cables</li>
            </ul>
            <p><strong>EMC Installation Best Practice</strong></p>
            <p><strong>Motor Cable Requirements</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Screened cable (SY, CY or VSD-specific)</li>
              <li>Screen terminated 360 degrees at both ends</li>
              <li>EMC cable glands at drive and motor</li>
              <li>Keep cable length to minimum practical</li>
            </ul>
            <p><strong>Installation Separation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>300mm from signal cables (parallel run)</li>
              <li>Cross at 90 degrees where unavoidable</li>
              <li>Separate tray/trunking for VSD outputs</li>
              <li>Input and output cables on opposite sides</li>
            </ul>
            <p><strong>VSD Selection Criteria for HVAC</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Power rating:</strong> Match or slightly exceed motor kW</li>
              <li><strong>Current rating:</strong> Must exceed motor FLC (consider derating factors)</li>
              <li><strong>Supply voltage:</strong> 230V single-phase or 400V three-phase</li>
              <li><strong>Enclosure rating:</strong> IP20 in panels, IP54/55 standalone</li>
              <li><strong>Control interface:</strong> Modbus, BACnet, analog 0-10V, digital I/O</li>
              <li><strong>EMC filter:</strong> Built-in C2 filter for first environment</li>
              <li><strong>Harmonic mitigation:</strong> Line reactor or built-in DC choke minimum</li>
            </ul>
            <p><strong>Motor Considerations for VSD Operation</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Insulation:</strong> Inverter-duty motors have reinforced insulation for PWM spikes</li>
              <li><strong>Cooling:</strong> Self-cooled motors derate at low speeds - consider force ventilation</li>
              <li><strong>Bearings:</strong> Insulated or ceramic bearings prevent EDM shaft damage</li>
              <li><strong>Speed range:</strong> Specify minimum continuous speed requirement</li>
            </ul>
            <p><strong>G5/5 compliance:</strong> Engineering Recommendation G5/5 sets UK limits for harmonic contribution. Large installations (&gt;75kW total drives) may require harmonic assessment to demonstrate compliance and avoid connection agreement issues.</p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1: Motor Speed at Reduced Frequency</strong>
            </p>
            <p><strong>Question:</strong> A 4-pole induction motor with 3% slip runs on a VSD at 35Hz. Calculate the actual speed.</p>
            <p>Synchronous speed: Ns = 120 &times; f / p</p>
            <p>Ns = 120 &times; 35 / 4 = 1050 rpm</p>
            <p>Actual speed with slip:</p>
            <p>N = Ns &times; (1 - slip) = 1050 &times; (1 - 0.03)</p>
            <p>N = 1050 &times; 0.97 = <strong>1018.5 rpm</strong></p>
            <p>
              <strong>Example 2: V/f Ratio Calculation</strong>
            </p>
            <p><strong>Question:</strong> A 400V, 50Hz motor operates at 30Hz. What voltage should the VSD provide to maintain constant flux?</p>
            <p>V/f ratio at rated: 400V / 50Hz = 8 V/Hz</p>
            <p>Required voltage at 30Hz:</p>
            <p>V = 8 V/Hz &times; 30Hz = <strong>240V</strong></p>
            <p>The VSD reduces output voltage proportionally to maintain flux</p>
            <p>
              <strong>Example 3: Fan Power at Reduced Speed</strong>
            </p>
            <p><strong>Question:</strong> A 22kW supply fan operates at 65% speed via VSD. Calculate the power consumption.</p>
            <p>Using cube law: P2 = P1 &times; (N2/N1) cubed</p>
            <p>P2 = 22kW &times; (0.65) cubed</p>
            <p>P2 = 22 &times; 0.274625</p>
            <p>P2 = <strong>6.04kW</strong></p>
            <p>Energy saving = 22 - 6.04 = 15.96kW (72.5% reduction)</p>
            <p>
              <strong>Example 4: Annual Energy Savings</strong>
            </p>
            <p><strong>Question:</strong> Calculate annual savings for a 30kW chilled water pump running 6000 hours/year at average 75% speed, compared to throttled valve control.</p>
            <p><strong>Throttled valve:</strong></p>
            <p>Annual energy = 30kW &times; 6000h = 180,000 kWh</p>
            <p><strong>VSD at 75% speed:</strong></p>
            <p>Power = 30 &times; 0.75 cubed = 30 &times; 0.422 = 12.66kW</p>
            <p>Annual energy = 12.66 &times; 6000 = 75,960 kWh</p>
            <p><strong>Annual saving:</strong></p>
            <p>180,000 - 75,960 = <strong>104,040 kWh/year</strong></p>
            <p>At 15p/kWh = <strong>GBP 15,606/year</strong></p>
            <p>Payback on 30kW drive: typically 6-12 months</p>
            <p>
              <strong>Example 5: DC Bus Voltage Calculation</strong>
            </p>
            <p><strong>Question:</strong> A VSD is supplied from 400V three-phase. Calculate the DC bus voltage.</p>
            <p>DC bus voltage = Peak of line voltage</p>
            <p>Vdc = Vline &times; root(2)</p>
            <p>Vdc = 400 &times; 1.414</p>
            <p>Vdc = <strong>565.6V DC</strong></p>
            <p>Warning: This voltage remains after power-off until capacitors discharge</p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Essential Formulae:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ns = 120f/p</strong> - Synchronous speed (rpm)</li>
              <li><strong>V proportional to f</strong> - Constant V/f maintains flux</li>
              <li><strong>P proportional to N cubed</strong> - Fan/pump affinity law</li>
              <li><strong>Vdc = Vline &times; root(2)</strong> - DC bus voltage</li>
              <li><strong>THDi = root(sum of Ih squared)/I1</strong> - Harmonic distortion</li>
            </ul>
            <p>
              <strong>Key Values to Remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>400V supply gives <strong>~565V DC bus</strong></li>
              <li>6-pulse VSD THDi: <strong>30-40%</strong> without filtering</li>
              <li>Carrier frequency typical: <strong>4-8 kHz</strong> for HVAC</li>
              <li>50% speed = <strong>12.5% power</strong> (fans/pumps)</li>
              <li>Line reactor impedance: <strong>3-5%</strong> typical</li>
            </ul>
            <p>
              <strong>Installation Checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Verify motor suitability for VSD operation</li>
              <li>Size VSD to motor rating (consider ambient temperature)</li>
              <li>Specify line reactor or built-in DC choke</li>
              <li>Use screened motor cable with proper glands</li>
              <li>Separate VSD cables from signal cables</li>
              <li>Programme minimum speed for motor cooling</li>
              <li>Configure BMS communications protocol</li>
              <li>Set appropriate acceleration/deceleration ramps</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li><strong>Undersized cables:</strong> VSD output cables carry harmonic currents - don't undersize</li>
                <li><strong>Poor EMC termination:</strong> Screen must be 360 degree terminated, not pigtails</li>
                <li><strong>Running motors too slow:</strong> Self-cooled motors overheat at low speeds</li>
                <li><strong>Ignoring harmonics:</strong> Large installations need harmonic assessment</li>
                <li><strong>Long motor cables:</strong> Can cause voltage doubling at motor - use filters if &gt;50m</li>
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
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-2")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Starting methods
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module8-section4-4")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Motor protection
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule8Section4_3;
