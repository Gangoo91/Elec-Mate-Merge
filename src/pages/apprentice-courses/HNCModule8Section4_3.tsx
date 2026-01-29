import { ArrowLeft, Activity, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Variable Speed Drives - HNC Module 8 Section 4.3";
const DESCRIPTION = "Master variable speed drive technology for HVAC applications: VFD/VSD principles, PWM inverter technology, V/f control, vector control, energy savings with fan laws, harmonic considerations, EMC filtering and drive selection.";

const quickCheckQuestions = [
  {
    id: "vsd-basic",
    question: "What is the primary purpose of a Variable Speed Drive (VSD) in an HVAC system?",
    options: [
      "To provide backup power during outages",
      "To control motor speed by varying frequency and voltage",
      "To convert AC to DC permanently",
      "To increase the motor's maximum speed beyond nameplate"
    ],
    correctIndex: 1,
    explanation: "A VSD controls motor speed by varying the frequency and voltage supplied to the motor. Since motor speed is proportional to supply frequency, adjusting frequency allows precise speed control for fans, pumps and compressors."
  },
  {
    id: "pwm-principle",
    question: "In PWM (Pulse Width Modulation) technology, how is the output voltage controlled?",
    options: [
      "By varying the amplitude of the DC bus voltage",
      "By changing the switching frequency of the inverter",
      "By varying the width of voltage pulses at a fixed DC bus voltage",
      "By using a variable transformer at the output"
    ],
    correctIndex: 2,
    explanation: "PWM controls output voltage by varying the width (duration) of voltage pulses. The DC bus voltage remains constant, but by changing the pulse width (duty cycle), the effective RMS voltage to the motor is controlled whilst maintaining a sinusoidal average."
  },
  {
    id: "vf-ratio",
    question: "Why must the V/f ratio be maintained constant in standard VSD operation?",
    options: [
      "To prevent the motor from overheating",
      "To maintain constant magnetic flux and thus constant torque capability",
      "To reduce harmonic distortion",
      "To comply with EMC regulations"
    ],
    correctIndex: 1,
    explanation: "Motor flux is proportional to V/f. Maintaining constant V/f ensures constant flux, which maintains the motor's torque-producing capability across the speed range. Reducing voltage without reducing frequency would cause flux collapse and loss of torque."
  },
  {
    id: "cube-law",
    question: "According to the fan affinity laws, if fan speed is reduced to 50%, what is the power consumption?",
    options: [
      "50% of full speed power",
      "25% of full speed power",
      "12.5% of full speed power",
      "75% of full speed power"
    ],
    correctIndex: 2,
    explanation: "Power varies with the cube of speed (P proportional to N cubed). At 50% speed: Power = 0.5 cubed = 0.125 = 12.5%. This cubic relationship is why VSDs offer such dramatic energy savings on variable-torque loads like fans and pumps."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the three main sections of a typical AC Variable Speed Drive?",
    options: [
      "Transformer, capacitor bank, motor",
      "Rectifier, DC bus, inverter",
      "Filter, amplifier, modulator",
      "Starter, contactor, overload"
    ],
    correctAnswer: 1,
    explanation: "A VSD comprises: (1) Rectifier - converts AC to DC, (2) DC bus - smooths DC with capacitors, (3) Inverter - converts DC back to variable frequency AC using IGBTs or similar switching devices."
  },
  {
    id: 2,
    question: "What is the typical DC bus voltage in a VSD supplied from 400V three-phase?",
    options: [
      "400V DC",
      "About 565V DC",
      "230V DC",
      "About 325V DC"
    ],
    correctAnswer: 1,
    explanation: "The DC bus voltage equals peak line voltage: Vdc = Vline x root(2) = 400 x 1.414 = approximately 565V DC. This is higher than the RMS supply voltage because the rectifier charges capacitors to the peak value."
  },
  {
    id: 3,
    question: "What is the relationship between motor synchronous speed and supply frequency?",
    options: [
      "Speed = 120 x f / p (where p = pole pairs)",
      "Speed = 60 x f / p (where p = number of poles)",
      "Speed = 120 x f / p (where p = number of poles)",
      "Speed = f x p / 120"
    ],
    correctAnswer: 2,
    explanation: "Synchronous speed Ns = 120f/p where f = frequency (Hz) and p = number of poles. A 4-pole motor at 50Hz: Ns = 120 x 50 / 4 = 1500 rpm. At 25Hz: Ns = 750 rpm."
  },
  {
    id: 4,
    question: "What happens to motor torque capability if frequency is increased above base frequency whilst maintaining rated voltage?",
    options: [
      "Torque increases proportionally",
      "Torque remains constant",
      "Torque decreases as flux weakens",
      "Torque doubles"
    ],
    correctAnswer: 2,
    explanation: "Above base frequency, voltage cannot increase (limited by supply), so V/f ratio decreases, flux weakens, and torque capability reduces. This is the 'constant power' or 'field weakening' region where the motor can maintain power but not torque."
  },
  {
    id: 5,
    question: "What is the main advantage of vector control (flux vector/field-oriented control) over V/f control?",
    options: [
      "Lower cost implementation",
      "Better speed and torque control, especially at low speeds and under varying loads",
      "Reduced harmonic distortion",
      "Higher maximum speed capability"
    ],
    correctAnswer: 1,
    explanation: "Vector control independently controls flux and torque components of motor current, providing superior dynamic response, accurate speed regulation at low speeds, and better torque control under varying loads - essential for precise positioning and high-performance applications."
  },
  {
    id: 6,
    question: "A centrifugal pump operates at variable flow using a VSD. At 70% speed, what is the approximate power consumption?",
    options: [
      "70% of full power",
      "49% of full power",
      "34% of full power",
      "24.5% of full power"
    ],
    correctAnswer: 2,
    explanation: "For centrifugal pumps (variable torque loads), power varies with speed cubed: P = 0.7 cubed = 0.343 = approximately 34%. This dramatic reduction compared to throttling valves (which waste energy) makes VSDs highly efficient for pump control."
  },
  {
    id: 7,
    question: "What are the typical harmonic orders generated by a 6-pulse VSD rectifier?",
    options: [
      "2nd, 4th, 6th harmonics",
      "3rd, 9th, 15th harmonics",
      "5th, 7th, 11th, 13th harmonics",
      "All odd harmonics equally"
    ],
    correctAnswer: 2,
    explanation: "6-pulse rectifiers generate harmonics of order h = 6k plus/minus 1 where k = 1, 2, 3... This gives 5th, 7th, 11th, 13th, etc. The 5th and 7th are typically the largest, with magnitudes inversely proportional to harmonic order."
  },
  {
    id: 8,
    question: "What is the purpose of a line reactor (choke) fitted at the VSD input?",
    options: [
      "To boost the input voltage",
      "To reduce harmonic currents and protect against supply transients",
      "To improve motor efficiency",
      "To provide regenerative braking"
    ],
    correctAnswer: 1,
    explanation: "Input line reactors (typically 3-5% impedance) reduce harmonic current distortion by smoothing current peaks, protect the rectifier from supply voltage spikes and transients, and reduce DC bus ripple - improving both power quality and drive reliability."
  },
  {
    id: 9,
    question: "What EMC precaution is essential when installing VSD cables?",
    options: [
      "Use the longest cable route possible",
      "Run motor cables parallel to data cables",
      "Use screened/shielded cables with 360-degree termination at both ends",
      "Avoid using cable trays"
    ],
    correctAnswer: 2,
    explanation: "VSD output cables carry high-frequency PWM switching waveforms that radiate EMI. Screened cables with proper 360-degree gland terminations at both drive and motor ends contain the emissions, preventing interference with sensitive equipment and ensuring EMC compliance."
  },
  {
    id: 10,
    question: "What is the typical Total Harmonic Distortion (THDi) of a standard 6-pulse VSD without filtering?",
    options: [
      "Less than 5%",
      "5-10%",
      "30-40%",
      "80-100%"
    ],
    correctAnswer: 2,
    explanation: "Standard 6-pulse VSDs typically produce 30-40% THDi at full load, potentially higher at part load. This can cause transformer heating, neutral conductor overload, and interference with other equipment - hence the need for harmonic mitigation on larger installations."
  },
  {
    id: 11,
    question: "What determines the minimum speed at which a motor can operate continuously when driven by a VSD?",
    options: [
      "The VSD's minimum frequency setting",
      "Motor cooling capability - fan-cooled motors lose cooling at low speeds",
      "The supply voltage",
      "The DC bus capacitor size"
    ],
    correctAnswer: 1,
    explanation: "Self-cooled (IC411) motors have shaft-mounted fans whose airflow reduces with speed. Below typically 20-30% speed, cooling may be inadequate for continuous full-torque operation. Solutions include force-ventilated motors (IC416), derating, or inverter-duty motors designed for extended speed range."
  },
  {
    id: 12,
    question: "For an HVAC supply fan motor rated 15kW, what VSD rating would typically be selected?",
    options: [
      "Exactly 15kW",
      "15kW or the next size up (typically 18.5kW)",
      "7.5kW due to energy savings",
      "30kW for safety margin"
    ],
    correctAnswer: 1,
    explanation: "VSDs are selected to match or slightly exceed motor kW rating. For a 15kW motor, a 15kW drive is suitable, though selecting 18.5kW provides margin for motor overloads and future-proofing. Over-sizing beyond this wastes capital cost without benefit."
  },
  {
    id: 13,
    question: "What is an Active Front End (AFE) in VSD technology?",
    options: [
      "A user interface panel",
      "An IGBT-based rectifier that can regenerate power and reduce harmonics",
      "A motor protection relay",
      "An output filter"
    ],
    correctAnswer: 1,
    explanation: "An AFE uses IGBTs in the rectifier section instead of diodes, enabling regenerative braking (power return to supply), near-unity power factor, and very low harmonic distortion (typically less than 5% THDi) - ideal for demanding applications requiring bidirectional power flow."
  },
  {
    id: 14,
    question: "What is the typical carrier frequency (switching frequency) range for IGBT inverters in VSDs?",
    options: [
      "50-60 Hz",
      "1-4 kHz",
      "2-16 kHz",
      "50-100 kHz"
    ],
    correctAnswer: 2,
    explanation: "Modern IGBT inverters typically switch at 2-16 kHz. Higher frequencies produce smoother motor current and quieter operation but increase inverter losses and motor insulation stress. 4-8 kHz is common for HVAC applications, balancing efficiency and motor heating."
  }
];

const faqs = [
  {
    question: "What is the difference between VSD, VFD, and inverter?",
    answer: "These terms are often used interchangeably. VSD (Variable Speed Drive) is the generic term for any drive that varies motor speed. VFD (Variable Frequency Drive) specifically describes AC drives that vary frequency. 'Inverter' technically refers only to the DC-to-AC converter section, but is commonly used to mean the complete drive. In HVAC applications, they all typically refer to the same equipment - an AC drive that controls induction motor speed by varying frequency and voltage."
  },
  {
    question: "Why do VSDs cause harmonic problems and how can they be mitigated?",
    answer: "VSDs draw non-sinusoidal current from the supply due to the rectifier's switching action, creating harmonic currents (5th, 7th, 11th, 13th, etc.). Mitigation options include: input line reactors (3-5% impedance) for moderate reduction, passive harmonic filters (tuned LC circuits), 12-pulse or 18-pulse rectifier configurations, active front ends (AFE) for best performance, or active filters. Engineering Standard G5/5 limits harmonic contribution to UK networks."
  },
  {
    question: "Can any motor be controlled by a VSD?",
    answer: "Most standard induction motors can be VSD-controlled, but considerations include: older motors may lack insulation rated for PWM voltage spikes (inverter-duty motors recommended for new installations), motor cooling at low speeds (consider force-ventilated or oversized motors for continuous low-speed operation), motor bearings may need insulated or ceramic types to prevent EDM (Electrical Discharge Machining) damage from shaft voltages. For critical or high-performance applications, specify inverter-duty motors designed for VSD operation."
  },
  {
    question: "What is sensorless vector control and when is it needed?",
    answer: "Sensorless vector control estimates motor speed and position from current and voltage measurements rather than using a shaft encoder. It provides better speed regulation and torque control than simple V/f control, especially at low speeds and varying loads. Use it when: speed regulation better than plus/minus 1% is needed, high starting torque is required, the load varies significantly, or dynamic response is important. V/f control remains adequate for simple fan and pump applications where exact speed is not critical."
  },
  {
    question: "What are the main energy savings achievable with VSDs on HVAC systems?",
    answer: "Energy savings depend on the application profile. For centrifugal fans and pumps operating at variable load: at 80% speed = 51% power, at 60% speed = 22% power, at 50% speed = 12.5% power (cube law). Typical HVAC systems operate at 60-80% average load, offering 30-50% energy savings compared to throttling control. Payback periods of 1-3 years are common. Savings are less dramatic for constant-torque loads (conveyors, positive displacement pumps) where power varies linearly with speed."
  },
  {
    question: "What cable length limitations exist with VSDs and how are they addressed?",
    answer: "Long motor cables can cause problems due to PWM voltage reflections doubling voltage at motor terminals (reflected wave phenomenon), increased capacitive charging currents, and EMI radiation. Typical limits without mitigation: 50-100m for standard drives. Solutions include: dV/dt filters (motor chokes) to reduce voltage rise rate, sinusoidal output filters for very long runs, reduced carrier frequency, and proper screened cables. Consult drive manufacturer's guidelines for specific cable length recommendations."
  }
];

const HNCModule8Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Activity className="h-4 w-4" />
            <span>Module 8.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Variable Speed Drives
          </h1>
          <p className="text-white/80">
            VSD principles, PWM technology, V/f control, energy savings and harmonic considerations for HVAC applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>VSD purpose:</strong> Control motor speed by varying frequency and voltage</li>
              <li className="pl-1"><strong>Main sections:</strong> Rectifier, DC bus, PWM inverter</li>
              <li className="pl-1"><strong>V/f control:</strong> Maintains constant flux for constant torque</li>
              <li className="pl-1"><strong>Energy savings:</strong> Cube law - 50% speed = 12.5% power for fans/pumps</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC applications:</strong> AHU fans, pumps, chillers, cooling towers</li>
              <li className="pl-1"><strong>Typical savings:</strong> 30-50% on variable-flow systems</li>
              <li className="pl-1"><strong>Harmonics:</strong> 30-40% THDi requires mitigation planning</li>
              <li className="pl-1"><strong>EMC:</strong> Screened cables essential for compliance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the operating principle and main components of a VSD",
              "Describe PWM inverter technology and switching operation",
              "Understand V/f control and constant flux principle",
              "Apply vector control concepts for dynamic applications",
              "Calculate energy savings using fan and pump affinity laws",
              "Identify harmonic effects and specify appropriate mitigation",
              "Select appropriate EMC measures for VSD installations",
              "Specify VSDs for HVAC motor control applications"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: VSD Principles and Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            VSD Principles and Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Variable Speed Drive (VSD), also known as a Variable Frequency Drive (VFD) or inverter,
              controls AC motor speed by varying the frequency and voltage of the power supplied to the motor.
              Since induction motor speed is directly proportional to supply frequency, changing frequency
              provides precise, efficient speed control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Three main sections of a VSD:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rectifier:</strong> Converts incoming AC to DC using diode or thyristor bridge</li>
                <li className="pl-1"><strong>DC bus (DC link):</strong> Smooths DC with capacitors, may include braking resistor</li>
                <li className="pl-1"><strong>Inverter:</strong> Converts DC to variable frequency AC using IGBT switches with PWM</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Speed Formula</p>
              <p className="font-mono text-center text-lg mb-2">N<sub>s</sub> = 120 &times; f / p</p>
              <p className="text-xs text-white/70 text-center">Where Ns = synchronous speed (rpm), f = frequency (Hz), p = number of poles</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Voltage Levels</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Supply Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DC Bus Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">230V single-phase</td>
                      <td className="border border-white/10 px-3 py-2">~325V DC</td>
                      <td className="border border-white/10 px-3 py-2">230 &times; 1.414 = 325V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">400V three-phase</td>
                      <td className="border border-white/10 px-3 py-2">~565V DC</td>
                      <td className="border border-white/10 px-3 py-2">400 &times; 1.414 = 565V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">690V three-phase</td>
                      <td className="border border-white/10 px-3 py-2">~975V DC</td>
                      <td className="border border-white/10 px-3 py-2">690 &times; 1.414 = 975V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">IGBT Inverter Section</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>IGBT (Insulated Gate Bipolar Transistor):</strong> Fast-switching power semiconductor</li>
                <li className="pl-1"><strong>Six IGBTs:</strong> Two per phase in three-phase inverter (upper and lower)</li>
                <li className="pl-1"><strong>Freewheeling diodes:</strong> Parallel to each IGBT for current return paths</li>
                <li className="pl-1"><strong>Switching frequency:</strong> Typically 2-16 kHz (carrier frequency)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Speed Calculation Example</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2">
                  <strong>4-pole motor:</strong>
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">At 50Hz: Ns = 120 &times; 50 / 4 = <strong>1500 rpm</strong></li>
                  <li className="pl-1">At 40Hz: Ns = 120 &times; 40 / 4 = <strong>1200 rpm</strong></li>
                  <li className="pl-1">At 25Hz: Ns = 120 &times; 25 / 4 = <strong>750 rpm</strong></li>
                  <li className="pl-1">At 60Hz: Ns = 120 &times; 60 / 4 = <strong>1800 rpm</strong></li>
                </ul>
                <p className="text-xs text-white/60 mt-2">Actual speed slightly less due to slip (typically 2-5%)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Terminology note:</strong> VSD, VFD, and inverter are often used interchangeably in HVAC.
              Technically, the inverter is just the DC-to-AC section, but commonly refers to the complete drive.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: PWM Technology and V/f Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            PWM Technology and V/f Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Pulse Width Modulation (PWM) is the technique used by modern VSDs to create variable
              frequency, variable voltage AC output from the fixed DC bus. The inverter IGBTs switch
              rapidly, creating voltage pulses whose average value follows a sinusoidal pattern.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">PWM Operating Principle:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DC bus:</strong> Provides constant DC voltage (e.g., 565V for 400V supply)</li>
                <li className="pl-1"><strong>Pulse width:</strong> Varied to control effective output voltage</li>
                <li className="pl-1"><strong>Switching pattern:</strong> Creates sinusoidal average current in motor</li>
                <li className="pl-1"><strong>Carrier frequency:</strong> The switching rate (2-16 kHz typical)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">V/f Ratio Control Principle</p>
              <p className="font-mono text-center text-lg mb-2">Flux (Phi) proportional to V / f</p>
              <p className="text-xs text-white/70 text-center">Constant V/f ratio maintains constant motor flux and torque capability</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Constant V/f is Important</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Motor torque depends on magnetic flux</li>
                <li className="pl-1">Flux is proportional to V/f ratio</li>
                <li className="pl-1">If frequency reduces without voltage reduction, flux increases (saturation)</li>
                <li className="pl-1">If voltage reduces without frequency reduction, flux collapses (no torque)</li>
                <li className="pl-1">Maintaining constant V/f keeps flux constant across speed range</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">V/f Characteristic Curve</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage (400V motor)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">V/f Ratio</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10Hz</td>
                      <td className="border border-white/10 px-3 py-2">80V</td>
                      <td className="border border-white/10 px-3 py-2">8 V/Hz</td>
                      <td className="border border-white/10 px-3 py-2">Constant torque</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25Hz</td>
                      <td className="border border-white/10 px-3 py-2">200V</td>
                      <td className="border border-white/10 px-3 py-2">8 V/Hz</td>
                      <td className="border border-white/10 px-3 py-2">Constant torque</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50Hz (base)</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">8 V/Hz</td>
                      <td className="border border-white/10 px-3 py-2">Rated point</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60Hz</td>
                      <td className="border border-white/10 px-3 py-2">400V (max)</td>
                      <td className="border border-white/10 px-3 py-2">6.67 V/Hz</td>
                      <td className="border border-white/10 px-3 py-2">Field weakening</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Below Base Frequency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Constant V/f maintained</li>
                  <li className="pl-1">Constant torque available</li>
                  <li className="pl-1">Power reduces with speed</li>
                  <li className="pl-1">Normal HVAC operating range</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Above Base Frequency</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Voltage limited (cannot exceed rated)</li>
                  <li className="pl-1">V/f ratio decreases, flux weakens</li>
                  <li className="pl-1">Torque capability reduces</li>
                  <li className="pl-1">Constant power region</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Carrier Frequency Effects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Higher Carrier Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lower Carrier Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Smoother motor current</td>
                      <td className="border border-white/10 px-3 py-2">More motor current ripple</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quieter motor operation</td>
                      <td className="border border-white/10 px-3 py-2">Audible motor noise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Higher inverter losses</td>
                      <td className="border border-white/10 px-3 py-2">Lower inverter losses</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">More motor insulation stress</td>
                      <td className="border border-white/10 px-3 py-2">Less motor insulation stress</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">More EMI emissions</td>
                      <td className="border border-white/10 px-3 py-2">Less EMI emissions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Typical HVAC setting: 4-8 kHz balances efficiency and motor heating</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Low frequency boost:</strong> At very low frequencies (&lt;5Hz), additional voltage boost
              compensates for stator resistance voltage drop, maintaining flux and torque for starting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Vector Control and Advanced Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vector Control and Energy Savings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While V/f control is adequate for most HVAC applications, vector control provides
              superior performance for demanding situations. Understanding both control methods
              and the dramatic energy savings achievable is essential for modern building services.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control Method Comparison:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">V/f Control</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Vector Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed accuracy</td>
                      <td className="border border-white/10 px-3 py-2">plus/minus 2-5%</td>
                      <td className="border border-white/10 px-3 py-2">plus/minus 0.1-1%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low speed torque</td>
                      <td className="border border-white/10 px-3 py-2">Limited</td>
                      <td className="border border-white/10 px-3 py-2">Excellent (100% at 0 Hz)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dynamic response</td>
                      <td className="border border-white/10 px-3 py-2">Moderate</td>
                      <td className="border border-white/10 px-3 py-2">Fast</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Setup complexity</td>
                      <td className="border border-white/10 px-3 py-2">Simple</td>
                      <td className="border border-white/10 px-3 py-2">Motor data required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical use</td>
                      <td className="border border-white/10 px-3 py-2">Fans, pumps</td>
                      <td className="border border-white/10 px-3 py-2">Hoists, precise positioning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fan and Pump Affinity Laws (Cube Law)</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Flow proportional to N</p>
                  <p className="text-white/70 text-xs">Q1/Q2 = N1/N2</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Head proportional to N squared</p>
                  <p className="text-white/70 text-xs">H1/H2 = (N1/N2) squared</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Power proportional to N cubed</p>
                  <p className="text-white/70 text-xs">P1/P2 = (N1/N2) cubed</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Savings - Power vs Speed</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Speed (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Saving</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">Baseline</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">90%</td>
                      <td className="border border-white/10 px-3 py-2">90%</td>
                      <td className="border border-white/10 px-3 py-2">73%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">27%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">51%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">49%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">70%</td>
                      <td className="border border-white/10 px-3 py-2">34%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">66%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">22%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">78%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">12.5%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">87.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Energy Savings Calculation Example</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm text-white mb-2">
                  <strong>Scenario:</strong> 15kW AHU fan operates 5000 hours/year at average 70% speed vs damper control
                </p>
                <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mt-3">
                  <p>Damper control: Power = 15kW constant (throttled)</p>
                  <p>VSD at 70%: Power = 15 &times; 0.7 cubed = 15 &times; 0.343 = 5.15kW</p>
                  <p className="mt-2">Annual saving = (15 - 5.15) &times; 5000 hours</p>
                  <p>Annual saving = <strong>49,250 kWh</strong></p>
                  <p className="mt-2">At 15p/kWh = <strong>GBP 7,387/year</strong></p>
                  <p className="text-white/60 mt-2">Typical payback: 1-2 years for 15kW drive</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vector Control Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sensorless vector:</strong> Speed estimated from current/voltage - good for most applications</li>
                <li className="pl-1"><strong>Closed-loop vector:</strong> Uses encoder feedback - best accuracy and torque control</li>
                <li className="pl-1"><strong>Direct Torque Control (DTC):</strong> Alternative method with very fast torque response</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>HVAC recommendation:</strong> V/f control is adequate for 95% of HVAC fan and pump applications.
              Vector control is beneficial for cooling tower fans, variable refrigerant flow compressors, and any
              application requiring precise speed control or high starting torque.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Harmonics, EMC and Selection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Harmonics, EMC and VSD Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VSDs create harmonic currents that can affect power quality and cause interference.
              Understanding these effects and implementing appropriate mitigation is essential for
              compliant, reliable installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Harmonic Generation by 6-Pulse VSDs:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Characteristic harmonics:</strong> h = 6k plus/minus 1 (5th, 7th, 11th, 13th...)</li>
                <li className="pl-1"><strong>Typical THDi:</strong> 30-40% at full load, higher at part load</li>
                <li className="pl-1"><strong>5th harmonic:</strong> Typically 30-40% of fundamental</li>
                <li className="pl-1"><strong>7th harmonic:</strong> Typically 15-25% of fundamental</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Effects on Electrical Systems</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cause</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer heating</td>
                      <td className="border border-white/10 px-3 py-2">Eddy currents at harmonic frequencies</td>
                      <td className="border border-white/10 px-3 py-2">Derating or overheating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Neutral overload</td>
                      <td className="border border-white/10 px-3 py-2">Triplen harmonics (3rd, 9th) add in neutral</td>
                      <td className="border border-white/10 px-3 py-2">Overheated neutral conductor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitor damage</td>
                      <td className="border border-white/10 px-3 py-2">Resonance amplification</td>
                      <td className="border border-white/10 px-3 py-2">PFC capacitor failure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage distortion</td>
                      <td className="border border-white/10 px-3 py-2">Harmonic currents in source impedance</td>
                      <td className="border border-white/10 px-3 py-2">Equipment malfunction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Mitigation Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">THDi Achievable</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">No mitigation (6-pulse)</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                      <td className="border border-white/10 px-3 py-2">Small drives on stiff supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Input line reactor (3-5%)</td>
                      <td className="border border-white/10 px-3 py-2">25-35%</td>
                      <td className="border border-white/10 px-3 py-2">Standard for medium drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DC bus choke</td>
                      <td className="border border-white/10 px-3 py-2">30-35%</td>
                      <td className="border border-white/10 px-3 py-2">Built-in on some drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Passive filter</td>
                      <td className="border border-white/10 px-3 py-2">8-15%</td>
                      <td className="border border-white/10 px-3 py-2">Large single drives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12-pulse rectifier</td>
                      <td className="border border-white/10 px-3 py-2">8-12%</td>
                      <td className="border border-white/10 px-3 py-2">Large drives &gt;100kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active Front End (AFE)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5%</td>
                      <td className="border border-white/10 px-3 py-2">Premium quality, regeneration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Active filter</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5%</td>
                      <td className="border border-white/10 px-3 py-2">Multiple drives, retrofit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMC Requirements and Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS EN 61800-3:</strong> EMC standard for power drive systems</li>
                <li className="pl-1"><strong>Category C2:</strong> First environment (residential) - requires filtering</li>
                <li className="pl-1"><strong>Category C3:</strong> Second environment (industrial) - less stringent</li>
                <li className="pl-1"><strong>Motor cables:</strong> Use screened/armoured with 360-degree gland termination</li>
                <li className="pl-1"><strong>Separation:</strong> Keep VSD cables away from signal and data cables</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EMC Installation Best Practice</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Motor Cable Requirements</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Screened cable (SY, CY or VSD-specific)</li>
                    <li className="pl-1">Screen terminated 360 degrees at both ends</li>
                    <li className="pl-1">EMC cable glands at drive and motor</li>
                    <li className="pl-1">Keep cable length to minimum practical</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Installation Separation</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">300mm from signal cables (parallel run)</li>
                    <li className="pl-1">Cross at 90 degrees where unavoidable</li>
                    <li className="pl-1">Separate tray/trunking for VSD outputs</li>
                    <li className="pl-1">Input and output cables on opposite sides</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Selection Criteria for HVAC</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power rating</td>
                      <td className="border border-white/10 px-3 py-2">Match or slightly exceed motor kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current rating</td>
                      <td className="border border-white/10 px-3 py-2">Must exceed motor FLC (consider derating factors)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply voltage</td>
                      <td className="border border-white/10 px-3 py-2">230V single-phase or 400V three-phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Enclosure rating</td>
                      <td className="border border-white/10 px-3 py-2">IP20 in panels, IP54/55 standalone</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control interface</td>
                      <td className="border border-white/10 px-3 py-2">Modbus, BACnet, analog 0-10V, digital I/O</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EMC filter</td>
                      <td className="border border-white/10 px-3 py-2">Built-in C2 filter for first environment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Harmonic mitigation</td>
                      <td className="border border-white/10 px-3 py-2">Line reactor or built-in DC choke minimum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Considerations for VSD Operation</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insulation:</strong> Inverter-duty motors have reinforced insulation for PWM spikes</li>
                <li className="pl-1"><strong>Cooling:</strong> Self-cooled motors derate at low speeds - consider force ventilation</li>
                <li className="pl-1"><strong>Bearings:</strong> Insulated or ceramic bearings prevent EDM shaft damage</li>
                <li className="pl-1"><strong>Speed range:</strong> Specify minimum continuous speed requirement</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>G5/5 compliance:</strong> Engineering Recommendation G5/5 sets UK limits for harmonic contribution.
              Large installations (&gt;75kW total drives) may require harmonic assessment to demonstrate compliance
              and avoid connection agreement issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Motor Speed at Reduced Frequency</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 4-pole induction motor with 3% slip runs on a VSD at 35Hz. Calculate the actual speed.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Synchronous speed: Ns = 120 &times; f / p</p>
                <p>Ns = 120 &times; 35 / 4 = 1050 rpm</p>
                <p className="mt-2">Actual speed with slip:</p>
                <p>N = Ns &times; (1 - slip) = 1050 &times; (1 - 0.03)</p>
                <p>N = 1050 &times; 0.97 = <strong>1018.5 rpm</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: V/f Ratio Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 400V, 50Hz motor operates at 30Hz. What voltage should the VSD provide to maintain constant flux?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>V/f ratio at rated: 400V / 50Hz = 8 V/Hz</p>
                <p className="mt-2">Required voltage at 30Hz:</p>
                <p>V = 8 V/Hz &times; 30Hz = <strong>240V</strong></p>
                <p className="mt-2 text-white/60">The VSD reduces output voltage proportionally to maintain flux</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Fan Power at Reduced Speed</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22kW supply fan operates at 65% speed via VSD. Calculate the power consumption.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using cube law: P2 = P1 &times; (N2/N1) cubed</p>
                <p className="mt-2">P2 = 22kW &times; (0.65) cubed</p>
                <p>P2 = 22 &times; 0.274625</p>
                <p>P2 = <strong>6.04kW</strong></p>
                <p className="mt-2 text-green-400">Energy saving = 22 - 6.04 = 15.96kW (72.5% reduction)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Annual Energy Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate annual savings for a 30kW chilled water pump running 6000 hours/year at average 75% speed, compared to throttled valve control.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Throttled valve:</strong></p>
                <p>Annual energy = 30kW &times; 6000h = 180,000 kWh</p>
                <p className="mt-2"><strong>VSD at 75% speed:</strong></p>
                <p>Power = 30 &times; 0.75 cubed = 30 &times; 0.422 = 12.66kW</p>
                <p>Annual energy = 12.66 &times; 6000 = 75,960 kWh</p>
                <p className="mt-2"><strong>Annual saving:</strong></p>
                <p>180,000 - 75,960 = <strong>104,040 kWh/year</strong></p>
                <p>At 15p/kWh = <strong>GBP 15,606/year</strong></p>
                <p className="mt-2 text-white/60">Payback on 30kW drive: typically 6-12 months</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 5: DC Bus Voltage Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A VSD is supplied from 400V three-phase. Calculate the DC bus voltage.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>DC bus voltage = Peak of line voltage</p>
                <p>Vdc = Vline &times; root(2)</p>
                <p>Vdc = 400 &times; 1.414</p>
                <p>Vdc = <strong>565.6V DC</strong></p>
                <p className="mt-2 text-red-400">Warning: This voltage remains after power-off until capacitors discharge</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulae</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ns = 120f/p</strong> - Synchronous speed (rpm)</li>
                <li className="pl-1"><strong>V proportional to f</strong> - Constant V/f maintains flux</li>
                <li className="pl-1"><strong>P proportional to N cubed</strong> - Fan/pump affinity law</li>
                <li className="pl-1"><strong>Vdc = Vline &times; root(2)</strong> - DC bus voltage</li>
                <li className="pl-1"><strong>THDi = root(sum of Ih squared)/I1</strong> - Harmonic distortion</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">400V supply gives <strong>~565V DC bus</strong></li>
                <li className="pl-1">6-pulse VSD THDi: <strong>30-40%</strong> without filtering</li>
                <li className="pl-1">Carrier frequency typical: <strong>4-8 kHz</strong> for HVAC</li>
                <li className="pl-1">50% speed = <strong>12.5% power</strong> (fans/pumps)</li>
                <li className="pl-1">Line reactor impedance: <strong>3-5%</strong> typical</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized cables:</strong> VSD output cables carry harmonic currents - don't undersize</li>
                <li className="pl-1"><strong>Poor EMC termination:</strong> Screen must be 360 degree terminated, not pigtails</li>
                <li className="pl-1"><strong>Running motors too slow:</strong> Self-cooled motors overheat at low speeds</li>
                <li className="pl-1"><strong>Ignoring harmonics:</strong> Large installations need harmonic assessment</li>
                <li className="pl-1"><strong>Long motor cables:</strong> Can cause voltage doubling at motor - use filters if &gt;50m</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify motor suitability for VSD operation</li>
                <li className="pl-1">Size VSD to motor rating (consider ambient temperature)</li>
                <li className="pl-1">Specify line reactor or built-in DC choke</li>
                <li className="pl-1">Use screened motor cable with proper glands</li>
                <li className="pl-1">Separate VSD cables from signal cables</li>
                <li className="pl-1">Programme minimum speed for motor cooling</li>
                <li className="pl-1">Configure BMS communications protocol</li>
                <li className="pl-1">Set appropriate acceleration/deceleration ramps</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">VSD Components</p>
                <ul className="space-y-0.5">
                  <li>Rectifier - AC to DC conversion</li>
                  <li>DC bus - smoothing capacitors</li>
                  <li>Inverter - IGBT PWM switching</li>
                  <li>Controller - V/f or vector control</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Energy Savings</p>
                <ul className="space-y-0.5">
                  <li>80% speed = 51% power</li>
                  <li>70% speed = 34% power</li>
                  <li>60% speed = 22% power</li>
                  <li>50% speed = 12.5% power</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Starting Methods
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section4-4">
              Next: Motor Protection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section4_3;
