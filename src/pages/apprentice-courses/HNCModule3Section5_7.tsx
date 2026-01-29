import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Starting and Speed Control Methods for Motors - HNC Module 3 Section 5.7";
const DESCRIPTION = "Motor starting techniques including DOL, star-delta, soft starters and VSDs. Variable frequency drives, V/f control, vector control and energy-efficient pump/fan applications in building services.";

const quickCheckQuestions = [
  {
    id: "dol-starting",
    question: "What is the typical starting current for a DOL (direct-on-line) starter compared to full load current?",
    options: ["2-3 times FLC", "4-8 times FLC", "10-12 times FLC", "Equal to FLC"],
    correctIndex: 1,
    explanation: "DOL starting draws 4-8 times full load current (typically 6-7 times). This high inrush can cause voltage dips affecting other equipment, which is why DOL is limited to smaller motors (typically under 7.5kW in commercial buildings)."
  },
  {
    id: "star-delta",
    question: "By what factor does star-delta starting reduce the starting current compared to DOL?",
    options: ["1/2 (50%)", "1/√3 (58%)", "1/3 (33%)", "1/4 (25%)"],
    correctIndex: 2,
    explanation: "Star-delta starting reduces both starting current AND starting torque to 1/3 (33%) of DOL values. In star, line voltage is applied across two windings in series (V/√3 per winding), reducing current to 1/3."
  },
  {
    id: "vfd-frequency",
    question: "A 4-pole motor connected to a 50Hz VSD is operated at 25Hz. What is the synchronous speed?",
    options: ["750 rpm", "1500 rpm", "3000 rpm", "375 rpm"],
    correctIndex: 0,
    explanation: "Synchronous speed Ns = (120 × f) / p = (120 × 25) / 4 = 750 rpm. Halving the frequency halves the speed. The actual rotor speed will be slightly less due to slip."
  },
  {
    id: "pump-affinity",
    question: "According to the pump affinity laws, if pump speed is halved, power consumption becomes:",
    options: ["Half (50%)", "Quarter (25%)", "One-eighth (12.5%)", "One-sixteenth (6.25%)"],
    correctIndex: 2,
    explanation: "Power is proportional to speed cubed: P2/P1 = (N2/N1)³. Halving speed: P2 = P1 × (0.5)³ = 0.125 × P1 = 12.5%. This is why VSDs offer massive energy savings on pumps and fans."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which starting method provides reduced starting current but maintains full starting torque?",
    options: [
      "Star-delta starting",
      "Auto-transformer starting",
      "Soft starter",
      "None - reduced current always means reduced torque"
    ],
    correctAnswer: 3,
    explanation: "For standard induction motors, torque is proportional to voltage squared. Any method that reduces voltage (and hence current) will also reduce starting torque. Star-delta reduces both to 1/3, soft starters reduce both proportionally."
  },
  {
    id: 2,
    question: "What is the main advantage of a soft starter over star-delta starting?",
    options: [
      "Higher starting torque",
      "Smooth, adjustable acceleration without current transients",
      "Lower cost",
      "No heat generation"
    ],
    correctAnswer: 1,
    explanation: "Soft starters use thyristors to gradually increase voltage, providing smooth acceleration without the current spike that occurs at star-delta changeover. Starting current and time are adjustable, and there's no mechanical switching."
  },
  {
    id: 3,
    question: "A VFD operating in V/f control maintains a constant ratio of voltage to frequency. Why is this necessary?",
    options: [
      "To maintain constant motor current",
      "To maintain constant magnetic flux in the motor",
      "To reduce harmonic distortion",
      "To comply with BS 7671 requirements"
    ],
    correctAnswer: 1,
    explanation: "Motor flux is proportional to V/f. Maintaining constant V/f ratio keeps flux constant, ensuring full torque capability across the speed range. Reducing frequency without reducing voltage would cause magnetic saturation and excessive current."
  },
  {
    id: 4,
    question: "What is the typical energy saving when a fan running at 80% speed compared to throttling at full speed?",
    options: [
      "20%",
      "36%",
      "49%",
      "80%"
    ],
    correctAnswer: 2,
    explanation: "Using the fan affinity law: Power = Speed³. At 80% speed, power = (0.8)³ = 0.512 = 51.2% of full speed power. Savings = 100% - 51.2% = 48.8% ≈ 49%. Throttling wastes energy as heat in the damper/valve."
  },
  {
    id: 5,
    question: "Which motor starting method is most suitable for a large chiller compressor requiring full load starting?",
    options: [
      "DOL (if supply can handle inrush)",
      "Star-delta (low starting torque acceptable)",
      "Soft starter (smooth start preferred)",
      "VFD (variable speed operation beneficial)"
    ],
    correctAnswer: 3,
    explanation: "Large chiller compressors benefit most from VFDs: soft starting prevents mechanical shock, variable speed matches capacity to load, and energy savings are substantial. Modern chillers often have integral VFDs."
  },
  {
    id: 6,
    question: "What is the main disadvantage of star-delta starting?",
    options: [
      "High starting current",
      "Current spike at changeover and reduced starting torque",
      "High cost",
      "Cannot be used with three-phase motors"
    ],
    correctAnswer: 1,
    explanation: "Star-delta has two issues: (1) starting torque is only 33% of DOL - may not start high-inertia loads, and (2) a current transient occurs at changeover from star to delta, potentially causing mechanical stress."
  },
  {
    id: 7,
    question: "A building BMS requests a pump to run at 40% flow. Using a VSD, what percentage of full speed power is consumed?",
    options: [
      "40%",
      "16%",
      "6.4%",
      "2.6%"
    ],
    correctAnswer: 2,
    explanation: "Flow is proportional to speed, so 40% flow = 40% speed. Power = (0.4)³ = 0.064 = 6.4% of full speed power. This demonstrates the massive energy savings VSDs provide for variable flow applications."
  },
  {
    id: 8,
    question: "What type of control does a VFD use for precise torque control at low speeds?",
    options: [
      "V/f control",
      "Scalar control",
      "Vector control (FOC)",
      "PWM control"
    ],
    correctAnswer: 2,
    explanation: "Vector control (Field Oriented Control) independently controls flux and torque-producing currents, enabling precise torque control even at standstill. V/f (scalar) control is simpler but has poor low-speed torque performance."
  },
  {
    id: 9,
    question: "Why must VFDs be installed with input line reactors or filters?",
    options: [
      "To increase starting torque",
      "To reduce harmonics fed back to the supply",
      "To improve motor efficiency",
      "To enable regenerative braking"
    ],
    correctAnswer: 1,
    explanation: "VFD rectifiers draw non-sinusoidal current, generating harmonics (5th, 7th, 11th, 13th) that pollute the supply and can affect other equipment. Line reactors or active filters reduce THD to acceptable levels (typically <8% per G5/4)."
  },
  {
    id: 10,
    question: "An escalator motor runs continuously at constant speed. Which starting method is most appropriate?",
    options: [
      "DOL - simple and reliable for constant speed",
      "Star-delta - reduced starting current",
      "Soft starter - smooth passenger experience",
      "VFD - energy saving in standby mode"
    ],
    correctAnswer: 3,
    explanation: "Modern escalators use VFDs to enable standby mode (slow speed when unoccupied), regenerative braking on descent, and smooth starting/stopping. Energy savings of 30-50% are typical compared to fixed-speed operation."
  }
];

const faqs = [
  {
    question: "When should I use DOL starting versus reduced voltage starting?",
    answer: "Use DOL for motors up to approximately 7.5kW where the supply can handle 6-8× FLC inrush without excessive voltage drop (<3% at the motor terminals). For larger motors, or where voltage dips affect other sensitive equipment, use reduced voltage starting (star-delta, soft starter, or VFD). Check with the DNO for motors above 5.5kW on single-phase or 11kW on three-phase."
  },
  {
    question: "What is the difference between a soft starter and a VFD?",
    answer: "A soft starter only controls starting and stopping - the motor runs at full speed once started. A VFD (Variable Frequency Drive) can control speed continuously. Soft starters are cheaper and simpler when variable speed is not required. VFDs provide energy savings, precise speed control, and often better motor protection, but cost more and generate harmonics."
  },
  {
    question: "Can any motor be used with a VFD?",
    answer: "Standard induction motors can be used but may need derating at low speeds due to reduced cooling. For continuous operation below 20Hz, use an inverter-duty motor with independent cooling (IC416) or fit a force-cooling fan. Motor insulation must withstand VFD voltage spikes - Class H insulation or inverter-duty rated is recommended."
  },
  {
    question: "What are the harmonic issues with VFDs and how are they addressed?",
    answer: "VFD rectifiers draw non-sinusoidal current, generating odd harmonics (5th, 7th, 11th, 13th). Solutions include: input line reactors (3-5% impedance reduces THD), passive harmonic filters (for specific harmonics), active front-end drives (lowest THD, regenerative), or 12/18-pulse rectifiers for large drives. UK standard G5/4 limits harmonic distortion."
  },
  {
    question: "How do I calculate energy savings from fitting a VFD to a pump?",
    answer: "Use the affinity laws: Power ∝ Speed³. If a pump currently throttled to 70% flow is converted to VFD control at 70% speed, power reduces to (0.7)³ = 0.343 = 34.3% of original. Annual savings = hours × kW × (1 - 0.343) × £/kWh. Typical payback for HVAC pumps and fans is 1-3 years."
  },
  {
    question: "What is sensorless vector control?",
    answer: "Sensorless vector control estimates rotor position and speed from motor current and voltage measurements, eliminating the need for an encoder. It provides better torque control than V/f at low speeds but not as precise as closed-loop vector control with encoder feedback. Suitable for most HVAC applications where precise positioning is not required."
  }
];

const HNCModule3Section5_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.5.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Starting and Speed Control Methods for Motors
          </h1>
          <p className="text-white/80">
            From DOL starters to variable frequency drives - controlling motor starting current and speed for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DOL:</strong> Simple but high inrush (6-8× FLC) - small motors only</li>
              <li className="pl-1"><strong>Star-delta:</strong> Reduces current to 1/3 but also torque to 1/3</li>
              <li className="pl-1"><strong>Soft starters:</strong> Smooth ramp-up, adjustable current limit</li>
              <li className="pl-1"><strong>VFDs:</strong> Variable speed, massive energy savings on pumps/fans</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>HVAC:</strong> AHU fans, chilled water pumps, cooling towers</li>
              <li className="pl-1"><strong>Pumps:</strong> Affinity laws - P ∝ Speed³ (huge savings)</li>
              <li className="pl-1"><strong>Escalators:</strong> VFDs for standby mode, regen braking</li>
              <li className="pl-1"><strong>BMS:</strong> Speed control via 0-10V or Modbus signals</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare DOL, star-delta, auto-transformer and soft starter methods",
              "Explain VFD operation, V/f control and vector control principles",
              "Calculate energy savings using pump and fan affinity laws",
              "Select appropriate starting methods for building services loads",
              "Understand harmonic issues and mitigation techniques",
              "Apply speed control to escalators, conveyors and HVAC systems"
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

        {/* Section 1: DOL Starting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Direct-On-Line (DOL) Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DOL starting is the simplest method - the motor is connected directly to the full supply voltage via a contactor.
              While straightforward, the high starting current (typically 6-8 times full load current) limits its use to smaller motors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DOL Starter Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main contactor:</strong> Switches all three phases simultaneously</li>
                <li className="pl-1"><strong>Overload relay:</strong> Thermal or electronic, trips on sustained overcurrent</li>
                <li className="pl-1"><strong>Control circuit:</strong> Start/stop pushbuttons, auxiliary contacts</li>
                <li className="pl-1"><strong>Protection:</strong> MCB or fuses sized for starting current</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DOL Starting Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting current</td>
                      <td className="border border-white/10 px-3 py-2">6-8 × FLC</td>
                      <td className="border border-white/10 px-3 py-2">Can be 4-10× depending on motor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Starting torque</td>
                      <td className="border border-white/10 px-3 py-2">100-200% FLT</td>
                      <td className="border border-white/10 px-3 py-2">Full torque available from start</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage at motor</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">Full line voltage applied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical max size</td>
                      <td className="border border-white/10 px-3 py-2">7.5-11kW</td>
                      <td className="border border-white/10 px-3 py-2">Depends on supply capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost</td>
                      <td className="border border-white/10 px-3 py-2">Lowest</td>
                      <td className="border border-white/10 px-3 py-2">Simple, few components</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use DOL</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Small motors (typically under 7.5kW in commercial buildings)</li>
                <li className="pl-1">Supply can handle inrush without excessive voltage drop (&lt;3%)</li>
                <li className="pl-1">Load can tolerate sudden mechanical shock at start</li>
                <li className="pl-1">Infrequent starting (voltage dips acceptable)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>DNO notification:</strong> Motors above 5.5kW single-phase or 11kW three-phase may require DNO approval due to starting current impact on the local network.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Star-Delta Starting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Star-Delta Starting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Star-delta starting reduces starting current by initially connecting motor windings in star configuration, then
              switching to delta once the motor approaches running speed. This requires a motor with six terminals (both ends of each winding accessible).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star vs Delta Configuration</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Star (Y) Connection</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>Voltage per winding = VL / √3 = 230V</li>
                    <li>Current per winding = Line current</li>
                    <li>Power = 1/3 of delta power</li>
                    <li>Torque = 1/3 of delta torque</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Delta (Δ) Connection</p>
                  <ul className="space-y-0.5 text-white/90">
                    <li>Voltage per winding = VL = 400V</li>
                    <li>Current per winding = IL / √3</li>
                    <li>Full rated power</li>
                    <li>Full rated torque</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star-Delta Starting Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Torque</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1. Start</td>
                      <td className="border border-white/10 px-3 py-2">Star (Y)</td>
                      <td className="border border-white/10 px-3 py-2">33% of DOL</td>
                      <td className="border border-white/10 px-3 py-2">33% of DOL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2. Accelerate</td>
                      <td className="border border-white/10 px-3 py-2">Star (Y)</td>
                      <td className="border border-white/10 px-3 py-2">Decreasing</td>
                      <td className="border border-white/10 px-3 py-2">Accelerating load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3. Changeover</td>
                      <td className="border border-white/10 px-3 py-2">Open → Delta</td>
                      <td className="border border-white/10 px-3 py-2">Current spike</td>
                      <td className="border border-white/10 px-3 py-2">Torque spike</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4. Run</td>
                      <td className="border border-white/10 px-3 py-2">Delta (Δ)</td>
                      <td className="border border-white/10 px-3 py-2">FLC</td>
                      <td className="border border-white/10 px-3 py-2">100% FLT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Advantages and Disadvantages:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-400/80 mb-1">Advantages</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Starting current reduced to 1/3 of DOL</li>
                    <li className="pl-1">Simple, robust, proven technology</li>
                    <li className="pl-1">No electronics - suitable for harsh environments</li>
                    <li className="pl-1">Lower cost than soft starters/VFDs</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-400/80 mb-1">Disadvantages</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Starting torque also reduced to 1/3</li>
                    <li className="pl-1">Current transient at changeover</li>
                    <li className="pl-1">Fixed reduction - not adjustable</li>
                    <li className="pl-1">Requires 6-terminal motor</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Application note:</strong> Star-delta is suitable for low-inertia loads that can accelerate to near running speed in star. High-inertia loads may stall or experience severe changeover transients.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Auto-transformer and Soft Starters */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Auto-transformer and Soft Starters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Auto-transformer starters and soft starters both provide reduced voltage starting with more flexibility than star-delta.
              Auto-transformers use tapped windings, while soft starters use power electronics for smooth, adjustable control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Auto-transformer Starting</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Uses tapped auto-transformer (typically 50%, 65%, 80% taps)</li>
                <li className="pl-1">Starting current = (tap%)² × DOL current (e.g., 65% tap = 42% current)</li>
                <li className="pl-1">Starting torque = (tap%)² × DOL torque</li>
                <li className="pl-1">Line current is further reduced by transformer action</li>
                <li className="pl-1">Used for large motors where star-delta torque is insufficient</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Soft Starter Operation</p>
              <p className="text-sm text-white/90 mb-3">
                Soft starters use back-to-back thyristors (SCRs) or triacs to control the voltage applied to the motor by phase-angle
                control. Voltage ramps up gradually from a preset initial value to full voltage over an adjustable time period.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Ramp Time</p>
                  <p className="text-white/70 text-xs">1-60 seconds typical</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Initial Voltage</p>
                  <p className="text-white/70 text-xs">30-70% adjustable</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Current Limit</p>
                  <p className="text-white/70 text-xs">200-500% FLC settable</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Starter Features</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adjustable ramp time</td>
                      <td className="border border-white/10 px-3 py-2">Match acceleration to load requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current limiting</td>
                      <td className="border border-white/10 px-3 py-2">Precise control of maximum starting current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft stop</td>
                      <td className="border border-white/10 px-3 py-2">Prevents water hammer in pump systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kick start</td>
                      <td className="border border-white/10 px-3 py-2">Pulse of higher voltage to break static friction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor protection</td>
                      <td className="border border-white/10 px-3 py-2">Overload, phase loss, phase imbalance, stall</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bypass contactor</td>
                      <td className="border border-white/10 px-3 py-2">Thyristors bypassed at full speed (reduces losses)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Important: Soft Starter Limitations</p>
              <ul className="text-sm text-white/90 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Runs at fixed speed once started - no speed control</li>
                <li className="pl-1">Starting torque still reduced with reduced voltage</li>
                <li className="pl-1">Generates harmonics during ramp (phase-angle control)</li>
                <li className="pl-1">Heat dissipation required - adequate ventilation essential</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Variable Frequency Drives */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Variable Frequency Drives (VFDs/VSDs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variable Frequency Drives (also called Variable Speed Drives, VSDs, or inverters) convert fixed-frequency AC to
              variable-frequency AC, enabling precise speed control of induction motors. They are now the standard for HVAC applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">VFD Power Circuit</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm text-center">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-white mb-1">Rectifier</p>
                  <p className="text-white/70 text-xs">AC → DC</p>
                  <p className="text-white/60 text-xs mt-1">Diode bridge or active front end</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-white mb-1">DC Link</p>
                  <p className="text-white/70 text-xs">Energy storage</p>
                  <p className="text-white/60 text-xs mt-1">Capacitors, smooth DC bus</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-white mb-1">Inverter</p>
                  <p className="text-white/70 text-xs">DC → Variable AC</p>
                  <p className="text-white/60 text-xs mt-1">IGBT PWM switching</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VFD Speed Control Principle:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Motor speed is proportional to supply frequency: N<sub>s</sub> = 120f/p</li>
                <li className="pl-1">VFD varies output frequency from 0-50Hz (or higher)</li>
                <li className="pl-1">Voltage must be varied with frequency to maintain flux (V/f control)</li>
                <li className="pl-1">PWM (Pulse Width Modulation) creates sinusoidal current in motor</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VFD Operating Range</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-50Hz (base speed)</td>
                      <td className="border border-white/10 px-3 py-2">0-400V (constant V/f)</td>
                      <td className="border border-white/10 px-3 py-2">Constant torque region</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50-100Hz (field weakening)</td>
                      <td className="border border-white/10 px-3 py-2">400V (constant)</td>
                      <td className="border border-white/10 px-3 py-2">Constant power, reduced torque</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VFD Advantages for Building Services</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Precise speed control (0.1% accuracy)</li>
                  <li className="pl-1">Soft starting without current spikes</li>
                  <li className="pl-1">Controlled stopping and positioning</li>
                  <li className="pl-1">Regenerative braking (active front end)</li>
                </ul>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Massive energy savings on pumps/fans</li>
                  <li className="pl-1">Power factor correction (near unity pf)</li>
                  <li className="pl-1">Comprehensive motor protection</li>
                  <li className="pl-1">BMS integration via Modbus/BACnet</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Low speed operation:</strong> Standard motors overheat below 20Hz due to reduced cooling. Use inverter-duty motors with
              independent cooling (IC416) or limit minimum speed to 20% for standard motors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: V/f and Vector Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            V/f Control and Vector Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VFDs use different control strategies depending on application requirements. V/f (scalar) control is simpler and
              suitable for most HVAC applications. Vector control provides superior dynamic performance for demanding applications.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">V/f (Volts/Hertz) Control</p>
              <div className="text-sm text-white/90 space-y-2">
                <p>
                  Also called scalar control, V/f maintains a constant ratio of voltage to frequency. This keeps motor flux
                  approximately constant, ensuring rated torque is available across the speed range.
                </p>
                <p className="font-mono text-center my-3">V/f = 400V / 50Hz = 8 V/Hz = constant</p>
                <p>
                  At 25Hz, voltage would be: 25 × 8 = 200V. At low frequencies (&lt;5Hz), voltage is boosted above the V/f line
                  to compensate for stator resistance voltage drop.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">V/f vs Vector Control Comparison</p>
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
                      <td className="border border-white/10 px-3 py-2">Control method</td>
                      <td className="border border-white/10 px-3 py-2">Voltage and frequency</td>
                      <td className="border border-white/10 px-3 py-2">Flux and torque currents</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low speed torque</td>
                      <td className="border border-white/10 px-3 py-2">Poor (voltage boost helps)</td>
                      <td className="border border-white/10 px-3 py-2">Excellent (full torque at zero speed)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dynamic response</td>
                      <td className="border border-white/10 px-3 py-2">Slow (100-200ms)</td>
                      <td className="border border-white/10 px-3 py-2">Fast (5-10ms)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed accuracy</td>
                      <td className="border border-white/10 px-3 py-2">±1-3% (open loop)</td>
                      <td className="border border-white/10 px-3 py-2">±0.01% (with encoder)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Setup complexity</td>
                      <td className="border border-white/10 px-3 py-2">Simple</td>
                      <td className="border border-white/10 px-3 py-2">Requires motor auto-tune</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical applications</td>
                      <td className="border border-white/10 px-3 py-2">Fans, pumps, conveyors</td>
                      <td className="border border-white/10 px-3 py-2">Hoists, cranes, winders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vector Control Types</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Sensorless Vector</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li className="pl-1">Estimates rotor position from motor currents</li>
                    <li className="pl-1">No encoder required</li>
                    <li className="pl-1">Good torque down to ~1Hz</li>
                    <li className="pl-1">Suitable for most HVAC applications</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-1">Closed-Loop Vector (FOC)</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li className="pl-1">Uses encoder for rotor position feedback</li>
                    <li className="pl-1">Full torque at zero speed</li>
                    <li className="pl-1">Precise positioning capability</li>
                    <li className="pl-1">Required for lifts, hoists, servo applications</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>HVAC applications:</strong> V/f or sensorless vector control is adequate for pumps and fans. Closed-loop vector
              is only needed for lifts, escalators requiring precise speed control, or positioning applications.
            </p>
          </div>
        </section>

        {/* Section 6: Energy Savings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Energy Savings with Variable Speed Drives
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most compelling reason to use VSDs in building services is energy savings. For centrifugal loads like pumps and fans,
              reducing speed reduces power consumption dramatically due to the affinity laws (also called fan/pump laws).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Pump and Fan Affinity Laws</p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-mono text-elec-yellow">Q ∝ N</p>
                  <p className="text-sm text-white mt-1">Flow</p>
                  <p className="text-xs text-white/60">proportional to speed</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-mono text-elec-yellow">H ∝ N²</p>
                  <p className="text-sm text-white mt-1">Head/Pressure</p>
                  <p className="text-xs text-white/60">proportional to speed²</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-mono text-elec-yellow">P ∝ N³</p>
                  <p className="text-sm text-white mt-1">Power</p>
                  <p className="text-xs text-white/60">proportional to speed³</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power vs Speed - The Cube Law Effect</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Speed</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Flow</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Head</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Saved</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">100%</td>
                      <td className="border border-white/10 px-3 py-2">0%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">64%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">51.2%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">48.8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">60%</td>
                      <td className="border border-white/10 px-3 py-2">36%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">21.6%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">78.4%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                      <td className="border border-white/10 px-3 py-2">25%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">12.5%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">87.5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40%</td>
                      <td className="border border-white/10 px-3 py-2">40%</td>
                      <td className="border border-white/10 px-3 py-2">16%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">6.4%</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">93.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VSD vs Traditional Flow Control:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-300 mb-1">Throttling/Dampers</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li className="pl-1">Motor runs at full speed</li>
                    <li className="pl-1">Energy wasted as heat in valve/damper</li>
                    <li className="pl-1">Valve wear, noise, maintenance</li>
                    <li className="pl-1">Poor control accuracy</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-300 mb-1">VSD Speed Control</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li className="pl-1">Motor speed matches demand</li>
                    <li className="pl-1">Energy savings follow cube law</li>
                    <li className="pl-1">Reduced mechanical wear</li>
                    <li className="pl-1">Precise BMS control</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-300 mb-2">Typical VSD Payback Periods</p>
              <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>HVAC fans (AHUs):</strong> 1-2 years (often operate at part load)</li>
                <li className="pl-1"><strong>Chilled water pumps:</strong> 1-3 years (variable cooling demand)</li>
                <li className="pl-1"><strong>Condenser water pumps:</strong> 2-3 years (seasonal variation)</li>
                <li className="pl-1"><strong>Cooling tower fans:</strong> 1-2 years (temperature dependent)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 7: Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pump Control Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW heating</td>
                      <td className="border border-white/10 px-3 py-2">ΔP control (constant pressure)</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CHW cooling</td>
                      <td className="border border-white/10 px-3 py-2">ΔT control or ΔP control</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Condenser water</td>
                      <td className="border border-white/10 px-3 py-2">Temperature control</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Booster sets</td>
                      <td className="border border-white/10 px-3 py-2">Pressure control, duty/assist</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fan Control Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU supply fans</td>
                      <td className="border border-white/10 px-3 py-2">Duct static pressure or CO₂</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU extract fans</td>
                      <td className="border border-white/10 px-3 py-2">Track supply or pressure control</td>
                      <td className="border border-white/10 px-3 py-2">40-60%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling tower fans</td>
                      <td className="border border-white/10 px-3 py-2">Condenser water temperature</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Car park ventilation</td>
                      <td className="border border-white/10 px-3 py-2">CO level control, jet fans</td>
                      <td className="border border-white/10 px-3 py-2">50-70%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Escalators and Moving Walkways</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Speed control:</strong> Slow/standby when unoccupied, full speed when in use</li>
                <li className="pl-1"><strong>Detection:</strong> PIR sensors or pressure mats trigger acceleration</li>
                <li className="pl-1"><strong>Regeneration:</strong> Descending escalators feed energy back to supply</li>
                <li className="pl-1"><strong>Savings:</strong> 30-50% compared to constant-speed operation</li>
                <li className="pl-1"><strong>Standards:</strong> EN 115 covers safety and speed requirements</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conveyor Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Soft starting:</strong> Prevents belt slip and material spillage</li>
                <li className="pl-1"><strong>Speed matching:</strong> Multiple conveyors synchronised</li>
                <li className="pl-1"><strong>Load sensing:</strong> Speed varies with product flow</li>
                <li className="pl-1"><strong>Regeneration:</strong> Downhill or braking energy recovered</li>
                <li className="pl-1"><strong>Applications:</strong> Baggage handling, distribution centres, manufacturing</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration</p>
              <p className="text-sm text-white/90 mb-2">
                Modern VSDs integrate with Building Management Systems for optimised control:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Analogue:</strong> 0-10V or 4-20mA speed reference from BMS</li>
                <li className="pl-1"><strong>Modbus RTU/TCP:</strong> Digital communication, full parameter access</li>
                <li className="pl-1"><strong>BACnet:</strong> Native building automation protocol</li>
                <li className="pl-1"><strong>Feedback:</strong> Speed, current, power, fault status to BMS</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Harmonic Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Harmonic Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              VFDs with standard diode rectifiers draw non-sinusoidal current from the supply, generating harmonics that can
              affect other equipment. Understanding and mitigating harmonics is essential for VFD installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Harmonic Content</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Harmonic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical %</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effects</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5th</td>
                      <td className="border border-white/10 px-3 py-2">250Hz</td>
                      <td className="border border-white/10 px-3 py-2">30-40%</td>
                      <td className="border border-white/10 px-3 py-2">Motor heating, vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7th</td>
                      <td className="border border-white/10 px-3 py-2">350Hz</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Motor heating, vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11th, 13th</td>
                      <td className="border border-white/10 px-3 py-2">550Hz, 650Hz</td>
                      <td className="border border-white/10 px-3 py-2">5-10%</td>
                      <td className="border border-white/10 px-3 py-2">Cable heating, interference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Harmonic Mitigation Methods:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Line reactors (3-5%):</strong> Simple, reduce THD from 80% to 35-40%</li>
                <li className="pl-1"><strong>DC link choke:</strong> Smooths DC bus, reduces harmonics</li>
                <li className="pl-1"><strong>Passive filters:</strong> Tuned LC circuits for specific harmonics</li>
                <li className="pl-1"><strong>Active filters:</strong> Electronic cancellation, best THD reduction</li>
                <li className="pl-1"><strong>12/18-pulse rectifiers:</strong> Phase shifting cancels lower harmonics</li>
                <li className="pl-1"><strong>Active front end:</strong> Regenerative, near-sinusoidal current, unity pf</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>UK Standard:</strong> Engineering Recommendation G5/4 sets limits for harmonic distortion. For larger VFD
              installations (&gt;100kVA), harmonic assessment and mitigation may be required.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Star-Delta Starting Current</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 15kW motor has a DOL starting current of 180A. What is the starting current with star-delta starting?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Star-delta reduces starting current to 1/3 of DOL</p>
                <p className="mt-2">I<sub>start(Y-Δ)</sub> = I<sub>start(DOL)</sub> × 1/3</p>
                <p>I<sub>start(Y-Δ)</sub> = 180A × 1/3 = <strong>60A</strong></p>
                <p className="mt-2 text-white/60">Note: Starting torque is also reduced to 1/3</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: VFD Speed and Power Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 4-pole AHU fan motor runs at 1440 rpm at 50Hz. The BMS requests 70% airflow. Calculate the new frequency, speed, and power as a percentage of full load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Flow is proportional to speed, so 70% flow = 70% speed</p>
                <p className="mt-2">New speed = 1440 × 0.7 = <strong>1008 rpm</strong></p>
                <p className="mt-2">Frequency proportional to speed:</p>
                <p>New frequency = 50Hz × 0.7 = <strong>35Hz</strong></p>
                <p className="mt-2">Power proportional to speed cubed:</p>
                <p>Power = (0.7)³ = <strong>0.343 = 34.3%</strong></p>
                <p className="mt-2 text-green-400">Energy saving = 100% - 34.3% = <strong>65.7%</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Annual Energy Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 22kW pump runs 4000 hours/year. Currently throttled to 60% flow. Calculate annual savings if converted to VSD control at 60% speed. Electricity costs £0.15/kWh.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Current consumption (throttled, full speed):</p>
                <p>Energy = 22kW × 4000h = 88,000 kWh/year</p>
                <p>Cost = 88,000 × £0.15 = <strong>£13,200/year</strong></p>
                <p className="mt-2">With VSD at 60% speed:</p>
                <p>Power = 22kW × (0.6)³ = 22 × 0.216 = 4.75kW</p>
                <p>Energy = 4.75kW × 4000h = 19,000 kWh/year</p>
                <p>Cost = 19,000 × £0.15 = <strong>£2,850/year</strong></p>
                <p className="mt-2 text-green-400">Annual saving = £13,200 - £2,850 = <strong>£10,350</strong></p>
                <p className="text-green-400">If VSD costs ~£3,000, payback = <strong>3-4 months</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Starting Method Selection Guide</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Recommended Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small pump &lt;7.5kW</td>
                      <td className="border border-white/10 px-3 py-2">DOL</td>
                      <td className="border border-white/10 px-3 py-2">Simple, adequate supply capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large pump, constant speed</td>
                      <td className="border border-white/10 px-3 py-2">Soft starter</td>
                      <td className="border border-white/10 px-3 py-2">Smooth start, prevents water hammer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC pump, variable flow</td>
                      <td className="border border-white/10 px-3 py-2">VFD</td>
                      <td className="border border-white/10 px-3 py-2">Energy savings, BMS control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU fan</td>
                      <td className="border border-white/10 px-3 py-2">VFD</td>
                      <td className="border border-white/10 px-3 py-2">VAV control, major savings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Escalator</td>
                      <td className="border border-white/10 px-3 py-2">VFD</td>
                      <td className="border border-white/10 px-3 py-2">Standby mode, regeneration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller compressor</td>
                      <td className="border border-white/10 px-3 py-2">VFD (integral)</td>
                      <td className="border border-white/10 px-3 py-2">Capacity control, efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire pump</td>
                      <td className="border border-white/10 px-3 py-2">DOL or Star-delta</td>
                      <td className="border border-white/10 px-3 py-2">Simplicity, reliability critical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">VFD Installation Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable length:</strong> Long motor cables need output filters (dV/dt or sine wave)</li>
                <li className="pl-1"><strong>Motor insulation:</strong> Use inverter-duty motors for best reliability</li>
                <li className="pl-1"><strong>Bearing currents:</strong> Install shaft grounding rings on larger motors</li>
                <li className="pl-1"><strong>EMC:</strong> Screened motor cable, proper earthing, input filters</li>
                <li className="pl-1"><strong>Cooling:</strong> Ensure adequate ventilation, derate for high ambient</li>
                <li className="pl-1"><strong>Harmonics:</strong> Assess impact, fit line reactors as minimum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersizing VFD:</strong> Allow for starting duty and derating factors</li>
                <li className="pl-1"><strong>No input protection:</strong> Always fit line reactor or RFI filter</li>
                <li className="pl-1"><strong>Ignoring minimum speed:</strong> Standard motors overheat below 20Hz</li>
                <li className="pl-1"><strong>Wrong control mode:</strong> Use V/f for fans/pumps, vector for lifts</li>
                <li className="pl-1"><strong>Poor earthing:</strong> Causes EMC issues and bearing damage</li>
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
                <p className="font-medium text-white mb-1">Starting Methods Comparison</p>
                <ul className="space-y-0.5">
                  <li>DOL: 100% voltage, 6-8× FLC, 100% torque</li>
                  <li>Star-delta: 33% current, 33% torque</li>
                  <li>Auto-transformer: (tap%)² current and torque</li>
                  <li>Soft starter: Adjustable ramp, current limit</li>
                  <li>VFD: Full control, soft start, variable speed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Affinity Laws (Pumps/Fans)</p>
                <ul className="space-y-0.5">
                  <li>Flow Q ∝ Speed N</li>
                  <li>Head H ∝ N²</li>
                  <li>Power P ∝ N³</li>
                  <li>80% speed = 51% power</li>
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
            <Link to="../h-n-c-module3-section5-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: DC Machines
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section5-8">
              Next: Maintenance and Fault Diagnosis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section5_7;
