import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Circuit Protection - HNC Module 7 Section 6.2";
const DESCRIPTION = "Master circuit protection device selection for electrical installations: MCB/MCCB/RCD selection, breaking capacity (Icn, Icu, Ics), let-through energy (I²t), selectivity and discrimination, RCD types and coordination per BS 7671.";

const quickCheckQuestions = [
  {
    id: "breaking-capacity",
    question: "What does the breaking capacity (Icn) of a protective device indicate?",
    options: ["The maximum continuous current the device can carry", "The maximum fault current the device can safely interrupt", "The time taken to trip at rated current", "The let-through energy during a fault"],
    correctIndex: 1,
    explanation: "Breaking capacity (Icn for MCBs, Icu/Ics for MCCBs) indicates the maximum prospective fault current that the device can safely interrupt without damage or danger. It must exceed the prospective fault current at the installation point."
  },
  {
    id: "let-through-energy",
    question: "Why is let-through energy (I²t) important when selecting protective devices?",
    options: ["It determines the device's physical size", "It must be less than the cable's withstand capability to prevent damage", "It indicates the device's voltage rating", "It shows the device's response time"],
    correctIndex: 1,
    explanation: "Let-through energy (I²t) represents the thermal energy passed through during fault clearance. It must be less than the cable's maximum withstand value (k²S²) to ensure the cable is not damaged during a fault condition."
  },
  {
    id: "discrimination",
    question: "What is the purpose of discrimination (selectivity) between protective devices?",
    options: ["To reduce installation costs", "To ensure only the device nearest the fault operates", "To increase the breaking capacity", "To improve power factor"],
    correctIndex: 1,
    explanation: "Discrimination ensures that during a fault, only the protective device nearest to the fault operates, leaving the rest of the installation energised. This is achieved through time, current, or energy-based selectivity."
  },
  {
    id: "rcd-type-a",
    question: "A Type A RCD can detect:",
    options: ["AC residual currents only", "AC and pulsating DC residual currents", "Pure DC residual currents only", "High-frequency residual currents only"],
    correctIndex: 1,
    explanation: "Type A RCDs can detect sinusoidal AC residual currents and pulsating DC residual currents. They are commonly required where electronic equipment with rectifiers may produce DC components in fault currents."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "For an MCB with a breaking capacity of 10kA, what is the maximum prospective fault current it can safely interrupt?",
    options: [
      "6kA",
      "10kA",
      "16kA",
      "25kA"
    ],
    correctAnswer: 1,
    explanation: "The breaking capacity rating indicates the maximum fault current the device can interrupt. A 10kA MCB can safely break fault currents up to 10,000 amperes. The prospective fault current at the installation point must not exceed this value."
  },
  {
    id: 2,
    question: "Which parameter must be compared with k²S² to verify cable protection during a fault?",
    options: ["Breaking capacity (Icn)", "Let-through energy (I²t)", "Rated current (In)", "Tripping current (It)"],
    correctAnswer: 1,
    explanation: "The let-through energy (I²t) must be less than k²S² where k is the cable constant and S is the conductor cross-sectional area. This ensures the cable can withstand the thermal stress during fault clearance."
  },
  {
    id: 3,
    question: "According to BS 7671, what is the maximum disconnection time for a 230V final circuit protected by a 32A device?",
    options: ["0.1 seconds", "0.2 seconds", "0.4 seconds", "5 seconds"],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 411.3.2.2 requires a maximum disconnection time of 0.4 seconds for final circuits not exceeding 63A in TN systems at 230V nominal voltage. This ensures automatic disconnection of supply for fault protection."
  },
  {
    id: 4,
    question: "What distinguishes an MCCB from an MCB?",
    options: [
      "MCCBs are only for AC circuits",
      "MCCBs have adjustable trip settings and higher current ratings",
      "MCBs have higher breaking capacities",
      "MCBs can be used in three-phase systems"
    ],
    correctAnswer: 1,
    explanation: "MCCBs (Moulded Case Circuit Breakers) feature adjustable trip settings, higher current ratings (typically 100A-1600A+), and often higher breaking capacities than MCBs. They provide greater flexibility for main distribution and industrial applications."
  },
  {
    id: 5,
    question: "For time-based discrimination between an upstream and downstream MCB, the upstream device should:",
    options: [
      "Have a lower current rating",
      "Have a faster operating characteristic",
      "Have a slower operating characteristic or time-delay function",
      "Have the same rating as the downstream device"
    ],
    correctAnswer: 2,
    explanation: "Time-based discrimination requires the upstream device to operate more slowly than the downstream device, allowing the device nearest the fault to clear it first. This can be achieved using time-delay settings or selecting devices with different time-current characteristics."
  },
  {
    id: 6,
    question: "A Type F RCD is specifically designed to detect:",
    options: [
      "AC residual currents only",
      "Pulsating DC residual currents only",
      "Composite residual currents including high-frequency components up to 1kHz",
      "Pure DC residual currents only"
    ],
    correctAnswer: 2,
    explanation: "Type F RCDs detect AC, pulsating DC, and composite residual currents including high-frequency components up to 1kHz. They are required for circuits supplying variable speed drives and frequency inverters that may produce complex waveforms."
  },
  {
    id: 7,
    question: "What is the purpose of back-up protection coordination?",
    options: [
      "To provide redundancy in case the main protection fails",
      "To allow a device with lower breaking capacity to be used where a higher-rated upstream device provides protection",
      "To increase the total installation cost",
      "To eliminate the need for discrimination"
    ],
    correctAnswer: 1,
    explanation: "Back-up protection allows a protective device with a breaking capacity lower than the prospective fault current to be used, provided an upstream device with adequate capacity assists in clearing high-level faults. The combination must be tested and verified by manufacturers."
  },
  {
    id: 8,
    question: "According to BS 7671, what residual current rating is required for socket outlets in locations accessible to the general public?",
    options: ["100mA", "300mA", "30mA", "10mA"],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 411.3.3 requires RCD protection with a rated residual operating current (IΔn) not exceeding 30mA for socket outlets rated up to 32A for use by ordinary persons. This provides additional protection against electric shock."
  },
  {
    id: 9,
    question: "What is the service short-circuit breaking capacity (Ics) of an MCCB?",
    options: [
      "The maximum current under normal operating conditions",
      "The percentage of Icu at which the device can operate and remain functional",
      "The time delay before tripping",
      "The minimum fault current for operation"
    ],
    correctAnswer: 1,
    explanation: "Ics (service short-circuit breaking capacity) is expressed as a percentage of Icu and indicates the fault current level at which the MCCB can interrupt and remain operational for continued service. Typical values are 50%, 75%, or 100% of Icu."
  },
  {
    id: 10,
    question: "When is a Type B RCD required according to BS 7671?",
    options: [
      "For all domestic installations",
      "For circuits with three-phase rectifiers producing smooth DC components",
      "For outdoor socket outlets only",
      "For lighting circuits only"
    ],
    correctAnswer: 1,
    explanation: "Type B RCDs are required where smooth DC fault currents may occur, such as with three-phase rectifiers in variable speed drives, EV chargers, or PV inverters. They can detect AC, pulsating DC, and smooth DC residual currents."
  },
  {
    id: 11,
    question: "For energy-based discrimination (let-through energy coordination), what condition must be met?",
    options: [
      "Both devices must have the same I²t value",
      "The downstream device I²t must exceed the upstream device I²t",
      "The downstream device must limit I²t to less than the upstream device's pre-arcing I²t",
      "The devices must have different rated currents"
    ],
    correctAnswer: 2,
    explanation: "For energy-based discrimination, the total let-through energy (I²t) of the downstream device at maximum fault current must be less than the pre-arcing I²t of the upstream device. This ensures the downstream device clears the fault before the upstream device begins to operate."
  },
  {
    id: 12,
    question: "An RCBO combines the functions of:",
    options: [
      "MCB and surge protection device",
      "RCD and MCB in a single device",
      "MCCB and isolator",
      "Contactor and overload relay"
    ],
    correctAnswer: 1,
    explanation: "An RCBO (Residual Current Circuit Breaker with Overcurrent protection) combines RCD earth fault protection with MCB overcurrent protection in a single device. This provides both fault protection and additional protection while saving space in distribution boards."
  }
];

const faqs = [
  {
    question: "How do I determine the required breaking capacity for a protective device?",
    answer: "The breaking capacity must exceed the prospective fault current (PFC) at the point of installation. Calculate or measure the PFC considering the supply impedance, transformer rating, and cable impedance to the installation point. For domestic installations, DNO typically declare 16kA at the origin; for commercial/industrial, values can exceed 50kA. Always select devices with breaking capacity greater than the calculated PFC, applying appropriate safety margins."
  },
  {
    question: "What is the difference between Type AC, A, F, and B RCDs?",
    answer: "Type AC detects sinusoidal AC residual currents only. Type A detects AC and pulsating DC (required for equipment with single-phase rectifiers like IT equipment). Type F detects AC, pulsating DC, and composite currents with high-frequency components up to 1kHz (required for variable speed drives). Type B detects AC, pulsating DC, and smooth DC (required for three-phase rectifiers, EV chargers, PV systems). Selection depends on the equipment characteristics and fault current waveforms likely to occur."
  },
  {
    question: "How do I achieve discrimination between MCBs?",
    answer: "MCB discrimination can be achieved through current, time, or energy methods. Current discrimination uses devices with different current ratings (minimum 1:1.6 ratio). Time discrimination uses upstream devices with time-delay characteristics. Energy discrimination selects devices where the downstream device's total I²t is less than the upstream device's pre-arcing I²t. Most manufacturers provide discrimination tables showing compatible device combinations for various fault levels."
  },
  {
    question: "When should I use an RCBO instead of a separate RCD and MCB?",
    answer: "Use RCBOs when individual circuit protection is required - a fault on one circuit won't affect others. This is mandatory for certain circuits per BS 7671 (e.g., fire alarm, security). RCBOs also provide discrimination advantages as nuisance tripping affects only the faulty circuit. Separate RCDs with MCBs are more economical for groups of circuits with similar characteristics, but a fault trips all downstream circuits."
  },
  {
    question: "What is the significance of I²t let-through energy classes?",
    answer: "I²t energy classes (Class 1, 2, 3) indicate the let-through energy limitation of MCBs. Class 3 (most common in the UK) provides the greatest energy limitation, best protecting cables during faults. When selecting devices, ensure the let-through energy (I²t) does not exceed the cable's withstand value (k²S²). Manufacturers publish I²t values at various fault currents for device selection. Lower energy limitation classes provide better cable protection and improved discrimination opportunities."
  },
  {
    question: "How does back-up protection work with Type 2 coordination?",
    answer: "Type 2 coordination (back-up protection) allows an MCB with breaking capacity lower than the prospective fault current when used with an upstream device of adequate capacity. The upstream device must limit the fault current or energy to within the downstream device's capability. This must be verified by manufacturer testing - not assumed. BS EN 60947-2 Annex A specifies testing requirements. Always use manufacturer coordination tables to confirm valid combinations."
  }
];

const HNCModule7Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6">
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
            <span>Module 7.6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Circuit Protection
          </h1>
          <p className="text-white/80">
            Device selection, breaking capacity, let-through energy, selectivity and RCD coordination
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Breaking capacity:</strong> Must exceed prospective fault current</li>
              <li className="pl-1"><strong>I²t energy:</strong> Must be less than cable withstand (k²S²)</li>
              <li className="pl-1"><strong>Discrimination:</strong> Nearest device operates first</li>
              <li className="pl-1"><strong>RCD types:</strong> AC, A, F, B for different fault waveforms</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">BS 7671 Requirements</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Reg 432.1:</strong> Breaking capacity ≥ prospective fault current</li>
              <li className="pl-1"><strong>Reg 434.5.2:</strong> I²t ≤ k²S² for fault protection</li>
              <li className="pl-1"><strong>Reg 536.4:</strong> Discrimination requirements</li>
              <li className="pl-1"><strong>Reg 411.3.3:</strong> 30mA RCD for socket outlets ≤32A</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate MCBs, MCCBs, and fuses for circuit protection",
              "Calculate and verify breaking capacity requirements",
              "Apply let-through energy (I²t) criteria for cable protection",
              "Design discrimination schemes for protective device coordination",
              "Select correct RCD types for various applications",
              "Apply BS 7671 requirements for circuit protection"
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

        {/* Section 1: Protective Device Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Protective Device Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct protective device requires consideration of the circuit's normal operating
              conditions, potential fault conditions, and the characteristics of the equipment being protected.
              The device must provide both overload and fault protection whilst remaining stable during normal
              operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protective Device Types:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>MCB (Miniature Circuit Breaker):</strong> Standard protection up to 125A, fixed trip characteristics</li>
                <li className="pl-1"><strong>MCCB (Moulded Case Circuit Breaker):</strong> Higher ratings (100A-1600A+), adjustable settings</li>
                <li className="pl-1"><strong>Fuse (BS 88, BS 1361, BS 3036):</strong> High breaking capacity, no mechanical parts to fail</li>
                <li className="pl-1"><strong>RCD/RCBO:</strong> Earth fault protection, additional shock protection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Characteristics (BS EN 60898)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Magnetic Trip Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B</td>
                      <td className="border border-white/10 px-3 py-2">3 to 5 × In</td>
                      <td className="border border-white/10 px-3 py-2">Resistive loads, lighting, socket circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type C</td>
                      <td className="border border-white/10 px-3 py-2">5 to 10 × In</td>
                      <td className="border border-white/10 px-3 py-2">Small motors, fluorescent lighting, IT equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type D</td>
                      <td className="border border-white/10 px-3 py-2">10 to 20 × In</td>
                      <td className="border border-white/10 px-3 py-2">High inrush loads, transformers, X-ray equipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Device Selection Criteria</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Rated voltage (Ue):</strong> Must equal or exceed system voltage</li>
                <li className="pl-1"><strong>Rated current (In):</strong> ≥ circuit design current (Ib) but ≤ cable current capacity (Iz)</li>
                <li className="pl-1"><strong>Breaking capacity (Icn/Icu):</strong> &gt; prospective fault current at installation point</li>
                <li className="pl-1"><strong>Trip characteristics:</strong> Suitable for load type and inrush currents</li>
                <li className="pl-1"><strong>Number of poles:</strong> Matched to circuit configuration (SP, DP, TP, TPN, 4P)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> The protective device rating chain must satisfy: Ib ≤ In ≤ Iz, where Ib is design current, In is device rating, and Iz is cable capacity.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Breaking Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Breaking Capacity and Fault Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Breaking capacity is the maximum fault current a protective device can safely interrupt without
              damage, fire, or danger. BS 7671 Regulation 432.1 requires that every protective device has a
              rated short-circuit capacity not less than the prospective fault current at its point of
              installation.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Icn (MCBs)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Rated short-circuit capacity</li>
                  <li className="pl-1">Tested to BS EN 60898</li>
                  <li className="pl-1">Typical values: 6kA, 10kA, 16kA</li>
                  <li className="pl-1">Single test - device may not be reusable</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Icu (MCCBs)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ultimate breaking capacity</li>
                  <li className="pl-1">Maximum fault current device can interrupt</li>
                  <li className="pl-1">Device may need replacement after operation</li>
                  <li className="pl-1">Tested per BS EN 60947-2</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ics (MCCBs)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Service short-circuit capacity</li>
                  <li className="pl-1">Expressed as % of Icu</li>
                  <li className="pl-1">Device remains serviceable</li>
                  <li className="pl-1">Typical: 50%, 75%, 100%</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Prospective Fault Current Sources</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical PFC Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Breaking Capacity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Domestic origin (PME)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 16kA</td>
                      <td className="border border-white/10 px-3 py-2">16kA for main switch</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final circuits (domestic)</td>
                      <td className="border border-white/10 px-3 py-2">1-3kA typical</td>
                      <td className="border border-white/10 px-3 py-2">6kA MCBs usually sufficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial/Industrial LV</td>
                      <td className="border border-white/10 px-3 py-2">10-50kA</td>
                      <td className="border border-white/10 px-3 py-2">Match to calculated PFC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Close to transformer</td>
                      <td className="border border-white/10 px-3 py-2">Up to 80kA+</td>
                      <td className="border border-white/10 px-3 py-2">High-rupturing capacity devices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">PFC Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Supply transformer:</span> <span className="text-white">500kVA, 4% impedance</span></p>
                <p><span className="text-white/60">Secondary voltage:</span> <span className="text-white">400V (line-line)</span></p>
                <p><span className="text-white/60">Full load current:</span> <span className="text-white">I = 500,000 / (√3 × 400) = 722A</span></p>
                <p><span className="text-white/60">PFC at transformer:</span> <span className="text-white">722 / 0.04 = 18.05kA</span></p>
                <p><span className="text-white/60">Minimum breaking capacity:</span> <span className="text-white">&gt;18kA at main switchboard</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Back-up protection:</strong> Where PFC exceeds a device's rating, back-up protection coordination with an upstream device may be permitted per BS EN 60947-2 Annex A, but only where manufacturer's data confirms the combination.
            </p>
          </div>
        </section>

        {/* Section 3: Let-Through Energy (I²t) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Let-Through Energy (I²t)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Let-through energy represents the thermal energy (measured in A²s) that passes through a
              protective device during fault clearance. BS 7671 Regulation 434.5.2 requires that the energy
              let through by the protective device does not exceed the energy withstand capability of the
              protected conductor.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Adiabatic Equation</p>
              <div className="font-mono text-sm space-y-2 text-center">
                <p className="text-lg">I²t ≤ k²S²</p>
                <p className="text-white/60 text-xs mt-2">Where:</p>
                <p className="text-white/60 text-xs">I²t = let-through energy of protective device (A²s)</p>
                <p className="text-white/60 text-xs">k = conductor constant (115 for thermoplastic/Cu, 143 for thermosetting/Cu)</p>
                <p className="text-white/60 text-xs">S = conductor cross-sectional area (mm²)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Withstand Values (k²S²)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Size (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">70°C Thermoplastic (k=115)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">90°C Thermosetting (k=143)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">29,756 A²s</td>
                      <td className="border border-white/10 px-3 py-2">46,010 A²s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5</td>
                      <td className="border border-white/10 px-3 py-2">82,656 A²s</td>
                      <td className="border border-white/10 px-3 py-2">127,806 A²s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4.0</td>
                      <td className="border border-white/10 px-3 py-2">211,600 A²s</td>
                      <td className="border border-white/10 px-3 py-2">327,184 A²s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6.0</td>
                      <td className="border border-white/10 px-3 py-2">476,100 A²s</td>
                      <td className="border border-white/10 px-3 py-2">736,164 A²s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10</td>
                      <td className="border border-white/10 px-3 py-2">1,322,500 A²s</td>
                      <td className="border border-white/10 px-3 py-2">2,044,900 A²s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCB Energy Classes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Class 1:</strong> No energy limitation</li>
                  <li className="pl-1"><strong>Class 2:</strong> Limited energy let-through</li>
                  <li className="pl-1"><strong>Class 3:</strong> Greatest energy limitation (UK standard)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fuse I²t Characteristics</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Pre-arcing I²t:</strong> Energy before arc forms</li>
                  <li className="pl-1"><strong>Operating I²t:</strong> Total energy including arc</li>
                  <li className="pl-1"><strong>Cut-off current:</strong> Limited peak current</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Verification Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Cable:</span> <span className="text-white">2.5mm² thermoplastic copper</span></p>
                <p><span className="text-white/60">k²S² =</span> <span className="text-white">115² × 2.5² = 82,656 A²s</span></p>
                <p><span className="text-white/60">32A Type B MCB let-through at 3kA:</span> <span className="text-white">~15,000 A²s (typical)</span></p>
                <p><span className="text-white/60">Check:</span> <span className="text-green-400">15,000 &lt; 82,656 ✓ Cable protected</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical point:</strong> Always verify let-through energy against cable withstand, especially for long cable runs where fault current is reduced and clearance time increased.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Selectivity and RCD Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Selectivity and RCD Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selectivity (discrimination) ensures that during a fault condition, only the protective device
              nearest to the fault operates, maintaining supply to healthy circuits. BS 7671 Regulation 536.4
              requires that where discrimination is necessary for safety, the characteristics of the devices
              shall be coordinated accordingly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Discrimination Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Principle</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current (Ampere)</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device rated higher</td>
                      <td className="border border-white/10 px-3 py-2">Limited range; ratio 1:1.6 minimum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time</td>
                      <td className="border border-white/10 px-3 py-2">Upstream device has time delay</td>
                      <td className="border border-white/10 px-3 py-2">MCCBs with adjustable settings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy (I²t)</td>
                      <td className="border border-white/10 px-3 py-2">Downstream limits energy below upstream pre-arc</td>
                      <td className="border border-white/10 px-3 py-2">Current-limiting devices; fuse/MCB combinations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Zone selective interlocking</td>
                      <td className="border border-white/10 px-3 py-2">Communication between devices</td>
                      <td className="border border-white/10 px-3 py-2">Intelligent protection systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Types and Selection (BS EN 61008/61009)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Detects</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type AC</td>
                      <td className="border border-white/10 px-3 py-2">Sinusoidal AC only</td>
                      <td className="border border-white/10 px-3 py-2">Basic resistive loads (limited use now)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type A</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC</td>
                      <td className="border border-white/10 px-3 py-2">IT equipment, LED drivers, single-phase rectifiers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type F</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC + composite (to 1kHz)</td>
                      <td className="border border-white/10 px-3 py-2">VSDs, single-phase frequency inverters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B</td>
                      <td className="border border-white/10 px-3 py-2">AC + pulsating DC + smooth DC</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase rectifiers, EV chargers, PV inverters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Time Delay Ratings</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>General (no delay):</strong> Instantaneous operation</li>
                  <li className="pl-1"><strong>Type S (selective):</strong> 40-500ms delay at IΔn</li>
                  <li className="pl-1"><strong>Custom delay:</strong> For discrimination schemes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Discrimination Rules</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Upstream IΔn ≥ 3× downstream IΔn</li>
                  <li className="pl-1">Upstream must be time-delayed (S type)</li>
                  <li className="pl-1">Both conditions required for selectivity</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">RCD Discrimination Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Upstream:</span> <span className="text-white">100mA Type S (time-delayed)</span></p>
                <p><span className="text-white/60">Downstream:</span> <span className="text-white">30mA general (instantaneous)</span></p>
                <p><span className="text-white/60">Ratio check:</span> <span className="text-white">100/30 = 3.33:1 ≥ 3:1 ✓</span></p>
                <p><span className="text-white/60">Time check:</span> <span className="text-white">S type has 40-500ms delay ✓</span></p>
                <p><span className="text-green-400">Discrimination achieved - downstream trips first</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCBO Selection Advantages</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Individual circuit protection - fault affects only one circuit</li>
                <li className="pl-1">Integral overcurrent and earth fault protection</li>
                <li className="pl-1">Required for fire alarm, emergency lighting, security circuits per BS 7671</li>
                <li className="pl-1">Simplifies fault finding - tripped device indicates faulty circuit</li>
                <li className="pl-1">Prevents nuisance tripping affecting multiple circuits</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>BS 7671 mandate:</strong> Regulation 411.3.3 requires 30mA RCD protection for socket outlets ≤32A in domestic and similar installations, cables concealed in walls at depths &lt;50mm, and cables without earthed metallic covering.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: MCB Selection for Final Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Select an MCB for a ring final circuit with design current 26A, cable capacity 32A.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Design current (Ib) = 26A</p>
                <p className="ml-4">Cable current capacity (Iz) = 32A</p>
                <p className="ml-4">PFC at board = 3kA</p>
                <p className="mt-2">Selection criteria:</p>
                <p className="ml-4">Ib ≤ In ≤ Iz → 26A ≤ In ≤ 32A</p>
                <p className="ml-4">Select: 32A Type B MCB</p>
                <p className="mt-2">Verification:</p>
                <p className="ml-4">26A ≤ 32A ≤ 32A ✓</p>
                <p className="ml-4">6kA breaking capacity &gt; 3kA PFC ✓</p>
                <p className="ml-4 text-green-400">Selection valid per BS 7671</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: I²t Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify a 16A Type B MCB protects a 1.5mm² thermoplastic cable.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p className="ml-4">Cable: 1.5mm² 70°C thermoplastic copper (k = 115)</p>
                <p className="ml-4">MCB: 16A Type B, Class 3 energy limiting</p>
                <p className="ml-4">PFC at circuit = 2kA</p>
                <p className="mt-2">Cable withstand calculation:</p>
                <p className="ml-4">k²S² = 115² × 1.5² = 13,225 × 2.25 = 29,756 A²s</p>
                <p className="mt-2">MCB let-through at 2kA (from manufacturer data):</p>
                <p className="ml-4">I²t ≈ 8,000 A²s (typical for Class 3)</p>
                <p className="mt-2 text-green-400">8,000 A²s &lt; 29,756 A²s ✓ Cable protected</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: RCD Discrimination Scheme</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design RCD discrimination for a consumer unit with multiple final circuits.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Requirement: Discrimination between main and final circuit RCDs</p>
                <p className="mt-2">Main incomer:</p>
                <p className="ml-4">Select: 100mA Type A-S (time-delayed selective)</p>
                <p className="mt-2">Final circuits (sockets, outdoor):</p>
                <p className="ml-4">Select: 30mA Type A RCBOs (instantaneous)</p>
                <p className="mt-2">Discrimination check:</p>
                <p className="ml-4">Ratio: 100mA / 30mA = 3.33:1 ≥ 3:1 ✓</p>
                <p className="ml-4">Time: Upstream S-type (40-500ms) vs instantaneous ✓</p>
                <p className="mt-2 text-green-400">Full discrimination achieved</p>
                <p className="text-white/60 mt-2">Result: Earth fault on final circuit trips RCBO only,</p>
                <p className="text-white/60 ml-4">main RCD remains closed, other circuits unaffected</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Device Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine prospective fault current at installation point</li>
                <li className="pl-1">Select device with breaking capacity &gt; PFC</li>
                <li className="pl-1">Verify In satisfies: Ib ≤ In ≤ Iz</li>
                <li className="pl-1">Check I²t ≤ k²S² for cable protection</li>
                <li className="pl-1">Select appropriate characteristic (B, C, D) for load type</li>
                <li className="pl-1">Consider discrimination with upstream/downstream devices</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Domestic PME max PFC: <strong>16kA</strong> (declared by DNO)</li>
                <li className="pl-1">Max disconnection time (final circuits ≤63A, TN): <strong>0.4 seconds</strong></li>
                <li className="pl-1">RCD discrimination ratio: <strong>≥3:1</strong> with time delay</li>
                <li className="pl-1">k value (70°C PVC/Cu): <strong>115</strong></li>
                <li className="pl-1">k value (90°C XLPE/Cu): <strong>143</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming 6kA is always adequate</strong> - verify PFC at each location</li>
                <li className="pl-1"><strong>Ignoring I²t verification</strong> - essential for fault protection</li>
                <li className="pl-1"><strong>Using Type AC RCDs</strong> - Type A minimum now required for most applications</li>
                <li className="pl-1"><strong>Forgetting time delay for RCD discrimination</strong> - ratio alone is not sufficient</li>
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
                <p className="font-medium text-white mb-1">Breaking Capacity Requirements</p>
                <ul className="space-y-0.5">
                  <li>Icn/Icu &gt; prospective fault current</li>
                  <li>Verify at each protective device location</li>
                  <li>Consider back-up protection if needed</li>
                  <li>Use manufacturer coordination tables</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">RCD Selection Summary</p>
                <ul className="space-y-0.5">
                  <li>Type A: Standard for IT/electronic loads</li>
                  <li>Type F: VSDs and frequency inverters</li>
                  <li>Type B: EV chargers, PV, 3-phase rectifiers</li>
                  <li>30mA for additional protection per BS 7671</li>
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
            <Link to="../h-n-c-module7-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section6-3">
              Next: Cable Selection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section6_2;
