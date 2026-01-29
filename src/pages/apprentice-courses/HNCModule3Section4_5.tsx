import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Sizing and Voltage Drop in Three-Phase Systems - HNC Module 3 Section 4.5";
const DESCRIPTION = "Master three-phase cable sizing using BS 7671 methods, voltage drop calculations with mV/A/m values, derating factors, and practical applications for submains and motor circuits.";

const quickCheckQuestions = [
  {
    id: "voltage-drop-limit-power",
    question: "What is the maximum permitted voltage drop for power circuits under BS 7671?",
    options: ["3% of supply voltage", "4% of supply voltage", "5% of supply voltage", "6% of supply voltage"],
    correctIndex: 2,
    explanation: "BS 7671 permits a maximum voltage drop of 5% for power circuits (20V at 400V three-phase, or 11.5V at 230V single-phase). Lighting circuits are limited to 3%."
  },
  {
    id: "three-phase-vd-formula",
    question: "Which formula calculates voltage drop in a three-phase circuit using mV/A/m values?",
    options: ["Vd = mV/A/m × I × L × 2", "Vd = mV/A/m × I × L / 1000", "Vd = mV/A/m × I × L × √3", "Vd = mV/A/m × I × L × 1.732 / 1000"],
    correctIndex: 1,
    explanation: "For three-phase circuits, voltage drop = (mV/A/m × Ib × L) / 1000. The mV/A/m values in BS 7671 tables already account for the three-phase configuration - no need for √3 multiplication."
  },
  {
    id: "derating-grouping",
    question: "When 6 circuits are grouped together in trunking, what is the typical correction factor (Cg)?",
    options: ["0.52", "0.57", "0.70", "0.80"],
    correctIndex: 2,
    explanation: "For 6 circuits grouped together, Cg ≈ 0.70 (from BS 7671 Table 4C1). This reduces the cable's current-carrying capacity to 70% due to mutual heating between cables."
  },
  {
    id: "armoured-cable-use",
    question: "What is the primary purpose of steel wire armour (SWA) on a cable?",
    options: ["Improved current capacity", "Electromagnetic shielding", "Mechanical protection", "Reduced voltage drop"],
    correctIndex: 2,
    explanation: "Steel wire armour provides mechanical protection against impact, crushing, and rodent damage. It also provides an earth continuity path and some electromagnetic screening."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 22kW three-phase motor operates at 400V with 0.85 power factor. What is the design current (Ib)?",
    options: ["31.8A", "37.4A", "55A", "64.7A"],
    correctAnswer: 1,
    explanation: "Using Ib = P / (√3 × VL × cosφ) = 22000 / (1.732 × 400 × 0.85) = 22000 / 588.9 = 37.4A"
  },
  {
    id: 2,
    question: "A 35mm² copper cable has a mV/A/m value of 1.25. What is the voltage drop over 80m carrying 100A (three-phase)?",
    options: ["5V", "8.66V", "10V", "17.32V"],
    correctAnswer: 2,
    explanation: "Vd = (mV/A/m × I × L) / 1000 = (1.25 × 100 × 80) / 1000 = 10V. This is 2.5% of 400V - acceptable."
  },
  {
    id: 3,
    question: "Which BS 7671 table provides mV/A/m values for armoured cables with copper conductors?",
    options: ["Table 4D1A", "Table 4D2A", "Table 4D4A", "Table 4E4A"],
    correctAnswer: 2,
    explanation: "Table 4D4A covers armoured 90°C thermosetting cables (XLPE/SWA). Table 4D2A is for thermoplastic (PVC) armoured cables."
  },
  {
    id: 4,
    question: "A cable route passes through 50mm of thermal insulation on one side. What correction factor applies?",
    options: ["0.55", "0.70", "0.81", "1.0"],
    correctIndex: 2,
    explanation: "For 50mm contact with thermally insulating material on one side, the correction factor (Ci) is approximately 0.81 (BS 7671 Table 4A2). Greater insulation thickness requires lower factors."
  },
  {
    id: 5,
    question: "What ambient temperature correction factor (Ca) applies for 35°C when the cable is rated at 30°C?",
    options: ["0.94", "0.91", "0.87", "0.79"],
    correctAnswer: 0,
    explanation: "From BS 7671 Table 4B1, for 35°C ambient with 70°C PVC cable rated at 30°C reference, Ca = 0.94. Higher ambients require greater derating."
  },
  {
    id: 6,
    question: "A submain must supply 150A over 45m. What is the maximum acceptable mV/A/m for a 5% voltage drop limit?",
    options: ["1.48 mV/A/m", "2.96 mV/A/m", "4.44 mV/A/m", "6.67 mV/A/m"],
    correctAnswer: 1,
    explanation: "Maximum Vd = 400V × 5% = 20V. Rearranging: mV/A/m = (Vd × 1000) / (I × L) = (20 × 1000) / (150 × 45) = 2.96 mV/A/m"
  },
  {
    id: 7,
    question: "When is the √3 factor used in three-phase voltage drop calculations?",
    options: [
      "Always, for all three-phase calculations",
      "Only when using ohms/metre resistance values, not mV/A/m",
      "Only for line-to-neutral calculations",
      "Never - it's built into all three-phase tables"
    ],
    correctAnswer: 1,
    explanation: "The √3 factor is only needed when calculating from R (Ω/m) values. BS 7671 mV/A/m values already incorporate the three-phase geometry factor."
  },
  {
    id: 8,
    question: "A motor circuit has 6m from the origin to the distribution board (3% drop) and 25m from the board to the motor. What drop is permitted in the final section?",
    options: ["2%", "5%", "3%", "8%"],
    correctAnswer: 0,
    explanation: "Total permitted = 5%. Already used = 3%. Remaining = 5% - 3% = 2% for the final circuit. This is a common design constraint in large installations."
  },
  {
    id: 9,
    question: "What is the minimum CSA of aluminium conductor permitted for general use under BS 7671?",
    options: ["6mm²", "10mm²", "16mm²", "25mm²"],
    correctAnswer: 2,
    explanation: "BS 7671 Regulation 524.1 requires aluminium conductors to be 16mm² minimum (except for certain specific applications). This accounts for aluminium's lower conductivity and termination requirements."
  },
  {
    id: 10,
    question: "A 4-core SWA cable is installed on a cable tray. Which installation method reference applies?",
    options: ["Reference method B", "Reference method C", "Reference method E", "Reference method F"],
    correctAnswer: 2,
    explanation: "Reference method E applies to cables in free air on cable tray (perforated or ladder). Method C is for clipped direct to wall, Method F is for cables in enclosed trunking."
  }
];

const faqs = [
  {
    question: "Why do three-phase cables have lower voltage drop than single-phase for the same load?",
    answer: "Three-phase power is distributed across three conductors, so each carries less current for the same total power. At 400V three-phase, current is √3 times lower than three separate 230V single-phase circuits would require. Additionally, the magnetic fields partially cancel, reducing inductance and reactive voltage drop."
  },
  {
    question: "When should I use aluminium instead of copper cables?",
    answer: "Aluminium is typically used for large submains (≥16mm²) where cable cost is significant and space permits the larger conductor size. Copper has 1.68× the conductivity of aluminium, so a 25mm² Al cable is roughly equivalent to a 16mm² Cu cable. Consider termination compatibility - many switchgear requires copper tails."
  },
  {
    question: "How do I account for voltage drop when using variable speed drives?",
    answer: "VSDs draw non-sinusoidal current containing harmonics. These increase I²R losses and voltage drop. Apply a 1.1 to 1.2 multiplier to calculated voltage drop for standard VSDs. Also consider harmonic currents when sizing the neutral conductor in three-phase systems with VSDs."
  },
  {
    question: "What happens if voltage drop exceeds BS 7671 limits?",
    answer: "Equipment may malfunction: motors run slower and hotter, electronic equipment may reset or fail, and lighting output reduces. Excessive voltage drop also increases energy losses (I²R) and can cause nuisance tripping of protective devices. The installation would not comply with BS 7671 Regulation 525.1."
  },
  {
    question: "How do I size cables for motor starting current?",
    answer: "Motor starting current (typically 6-8× full load current) doesn't affect continuous rating but does affect voltage drop during starting. BS 7671 allows temporary voltage drop to exceed 5% during motor starting provided equipment operates satisfactorily. Some specifications limit starting drop to 15%."
  },
  {
    question: "Should I upsize cables beyond minimum requirements?",
    answer: "Yes, consider future load growth, energy efficiency (lower I²R losses), and reduced operating temperature extending cable life. Voltage drop calculations often drive cable size selection in long runs rather than current capacity. The cost premium for one size larger is often justified."
  }
];

const HNCModule3Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
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
            <span>Module 3.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Sizing and Voltage Drop in Three-Phase Systems
          </h1>
          <p className="text-white/80">
            Essential design calculations for three-phase distribution, submains and motor circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Voltage drop formula:</strong> Vd = (mV/A/m × Ib × L) / 1000</li>
              <li className="pl-1"><strong>Power circuits:</strong> Maximum 5% drop (20V at 400V)</li>
              <li className="pl-1"><strong>Lighting circuits:</strong> Maximum 3% drop (12V at 400V)</li>
              <li className="pl-1"><strong>Effective capacity:</strong> It = In / (Ca × Cg × Ci × Cf)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Submains:</strong> Main switchboard to distribution boards</li>
              <li className="pl-1"><strong>Motor circuits:</strong> HVAC, lifts, pumps</li>
              <li className="pl-1"><strong>SWA cables:</strong> Underground and external routes</li>
              <li className="pl-1"><strong>Busbar trunking:</strong> Rising mains in buildings</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate three-phase voltage drop using mV/A/m values from BS 7671",
              "Apply BS 7671 voltage drop limits (5% power, 3% lighting)",
              "Size cables for current-carrying capacity using derating factors",
              "Select appropriate derating for grouping, ambient and thermal insulation",
              "Differentiate armoured and non-armoured cable applications",
              "Design submain and motor circuits for commercial buildings"
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

        {/* Section 1: Three-Phase Voltage Drop Formula */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Three-Phase Voltage Drop Formula Using mV/A/m
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The mV/A/m (millivolts per ampere per metre) method is the standard approach for voltage drop
              calculations in BS 7671. This value combines both resistive and reactive components of the cable
              impedance into a single figure that can be read directly from the tables.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Three-Phase Voltage Drop Formula</p>
              <p className="font-mono text-center text-xl mb-2">Vd = (mV/A/m × I<sub>b</sub> × L) / 1000</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-4 text-xs text-white/80">
                <div>
                  <p><strong>Vd</strong> = Voltage drop (Volts)</p>
                  <p><strong>mV/A/m</strong> = Table value from BS 7671</p>
                </div>
                <div>
                  <p><strong>I<sub>b</sub></strong> = Design current (Amperes)</p>
                  <p><strong>L</strong> = Route length (metres)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Important: The √3 Factor</p>
              <p className="text-sm text-white/90 mb-3">
                BS 7671 tables provide mV/A/m values that <strong>already include the three-phase geometry factor</strong>.
                You do NOT multiply by √3 when using table values. The √3 factor is only needed when calculating
                from basic resistance values (Ω/m).
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                  <p className="font-medium text-green-400 mb-1">Correct (using tables)</p>
                  <p className="font-mono text-white/80">Vd = mV/A/m × I × L / 1000</p>
                </div>
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30">
                  <p className="font-medium text-red-400 mb-1">Only if using Ω/m values</p>
                  <p className="font-mono text-white/80">Vd = √3 × I × R × L</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">mV/A/m Values - Typical Examples</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CSA (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC/Cu 3-phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE/Cu 3-phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE/Al 3-phase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16mm²</td>
                      <td className="border border-white/10 px-3 py-2">2.4</td>
                      <td className="border border-white/10 px-3 py-2">2.2</td>
                      <td className="border border-white/10 px-3 py-2">3.6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25mm²</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">1.4</td>
                      <td className="border border-white/10 px-3 py-2">2.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35mm²</td>
                      <td className="border border-white/10 px-3 py-2">1.1</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">1.65</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50mm²</td>
                      <td className="border border-white/10 px-3 py-2">0.78</td>
                      <td className="border border-white/10 px-3 py-2">0.73</td>
                      <td className="border border-white/10 px-3 py-2">1.2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70mm²</td>
                      <td className="border border-white/10 px-3 py-2">0.55</td>
                      <td className="border border-white/10 px-3 py-2">0.52</td>
                      <td className="border border-white/10 px-3 py-2">0.86</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">95mm²</td>
                      <td className="border border-white/10 px-3 py-2">0.41</td>
                      <td className="border border-white/10 px-3 py-2">0.39</td>
                      <td className="border border-white/10 px-3 py-2">0.64</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values shown are representative - always use BS 7671 tables for actual design</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> XLPE cables have lower mV/A/m values than PVC cables because they operate
              at higher temperatures (90°C vs 70°C) and have lower resistance at these temperatures.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 2: BS 7671 Voltage Drop Limits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS 7671 Voltage Drop Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 525.1 specifies maximum voltage drop limits to ensure equipment operates
              correctly and efficiently. The limits are expressed as percentages of the nominal supply voltage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Voltage Drop - Standard Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Drop (%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">At 230V (1-ph)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">At 400V (3-ph)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting circuits</td>
                      <td className="border border-white/10 px-3 py-2 font-semibold text-elec-yellow">3%</td>
                      <td className="border border-white/10 px-3 py-2">6.9V</td>
                      <td className="border border-white/10 px-3 py-2">12V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power circuits (other uses)</td>
                      <td className="border border-white/10 px-3 py-2 font-semibold text-elec-yellow">5%</td>
                      <td className="border border-white/10 px-3 py-2">11.5V</td>
                      <td className="border border-white/10 px-3 py-2">20V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Important: Total Installation Drop</p>
              <p className="text-sm text-white/90">
                The voltage drop limits apply to the <strong>total</strong> drop from the origin of the installation
                to the point of use. This includes the submain, distribution board connections, and final circuit.
                In large installations, you must apportion the available drop between different sections.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Drop Allocation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Submain:</strong> 2-3% (shared by all circuits)</li>
                  <li className="pl-1"><strong>Final circuit:</strong> 2-3% (remaining allowance)</li>
                  <li className="pl-1"><strong>Total:</strong> 5% maximum for power</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Lighting is Stricter</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lumen output drops with voltage</li>
                  <li className="pl-1">Visible flicker with voltage variation</li>
                  <li className="pl-1">LED drivers may malfunction at low voltage</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Appendix 4 of BS 7671 permits relaxation to 6.5% for submains supplying
              fixed equipment if the equipment manufacturer confirms satisfactory operation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Current Carrying Capacity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Sizing for Current-Carrying Capacity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable selection must satisfy two independent criteria: the cable must safely carry the design
              current without overheating, and the voltage drop must be within limits. Both must be checked
              and the larger cable size used.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">The Cable Sizing Equation</p>
              <p className="font-mono text-center text-xl mb-2">I<sub>t</sub> ≥ I<sub>n</sub> / (C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub> × C<sub>f</sub>)</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-4 text-xs text-white/80">
                <div>
                  <p><strong>I<sub>t</sub></strong> = Tabulated cable capacity (from BS 7671)</p>
                  <p><strong>I<sub>n</sub></strong> = Protective device rating</p>
                  <p><strong>C<sub>a</sub></strong> = Ambient temperature factor</p>
                </div>
                <div>
                  <p><strong>C<sub>g</sub></strong> = Grouping factor</p>
                  <p><strong>C<sub>i</sub></strong> = Thermal insulation factor</p>
                  <p><strong>C<sub>f</sub></strong> = Semi-enclosed fuse factor (0.725)</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Design Process</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Calculate design current I<sub>b</sub> from load power</li>
                <li className="pl-1">Select protective device rating I<sub>n</sub> ≥ I<sub>b</sub></li>
                <li className="pl-1">Determine all applicable correction factors</li>
                <li className="pl-1">Calculate minimum I<sub>t</sub> required</li>
                <li className="pl-1">Select cable with tabulated capacity ≥ calculated I<sub>t</sub></li>
                <li className="pl-1">Verify voltage drop is within limits</li>
                <li className="pl-1">If Vd exceeds limit, upsize cable and recheck</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Capacity - Three-Phase Cables (Reference E)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CSA (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC 70°C (A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE 90°C (A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">SWA/XLPE (A)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16mm²</td>
                      <td className="border border-white/10 px-3 py-2">68</td>
                      <td className="border border-white/10 px-3 py-2">89</td>
                      <td className="border border-white/10 px-3 py-2">83</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25mm²</td>
                      <td className="border border-white/10 px-3 py-2">89</td>
                      <td className="border border-white/10 px-3 py-2">119</td>
                      <td className="border border-white/10 px-3 py-2">110</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35mm²</td>
                      <td className="border border-white/10 px-3 py-2">110</td>
                      <td className="border border-white/10 px-3 py-2">148</td>
                      <td className="border border-white/10 px-3 py-2">135</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50mm²</td>
                      <td className="border border-white/10 px-3 py-2">134</td>
                      <td className="border border-white/10 px-3 py-2">180</td>
                      <td className="border border-white/10 px-3 py-2">163</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">70mm²</td>
                      <td className="border border-white/10 px-3 py-2">171</td>
                      <td className="border border-white/10 px-3 py-2">232</td>
                      <td className="border border-white/10 px-3 py-2">207</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">95mm²</td>
                      <td className="border border-white/10 px-3 py-2">207</td>
                      <td className="border border-white/10 px-3 py-2">282</td>
                      <td className="border border-white/10 px-3 py-2">251</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">120mm²</td>
                      <td className="border border-white/10 px-3 py-2">239</td>
                      <td className="border border-white/10 px-3 py-2">328</td>
                      <td className="border border-white/10 px-3 py-2">289</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Reference method E: On cable tray (spaced) in free air at 30°C ambient</p>
            </div>
          </div>
        </section>

        {/* Section 4: Derating Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Derating Factors (Grouping, Ambient, Thermal Insulation)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correction factors account for installation conditions that differ from the reference conditions
              used in the current capacity tables. Each factor reduces the cable's effective capacity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ambient Temperature Factor (C<sub>a</sub>) - Table 4B1</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Ambient (°C)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">PVC 70°C</th>
                      <th className="border border-white/10 px-3 py-2 text-left">XLPE 90°C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">1.03</td>
                      <td className="border border-white/10 px-3 py-2">1.02</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30 (reference)</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35</td>
                      <td className="border border-white/10 px-3 py-2">0.94</td>
                      <td className="border border-white/10 px-3 py-2">0.96</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                      <td className="border border-white/10 px-3 py-2">0.91</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45</td>
                      <td className="border border-white/10 px-3 py-2">0.79</td>
                      <td className="border border-white/10 px-3 py-2">0.87</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">0.71</td>
                      <td className="border border-white/10 px-3 py-2">0.82</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Grouping Factor (C<sub>g</sub>) - Table 4C1</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuits</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Bunched</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Single Layer Tray</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ladder (Spaced)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">0.80</td>
                      <td className="border border-white/10 px-3 py-2">0.88</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.82</td>
                      <td className="border border-white/10 px-3 py-2">0.97</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">0.65</td>
                      <td className="border border-white/10 px-3 py-2">0.77</td>
                      <td className="border border-white/10 px-3 py-2">0.95</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">0.57</td>
                      <td className="border border-white/10 px-3 py-2">0.72</td>
                      <td className="border border-white/10 px-3 py-2">0.93</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9</td>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                      <td className="border border-white/10 px-3 py-2">0.70</td>
                      <td className="border border-white/10 px-3 py-2">0.90</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Insulation Factor (C<sub>i</sub>) - Table 4A2</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Factor (C<sub>i</sub>)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable in free air (no insulation)</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">One side touching thermal insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.75 - 0.89</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Surrounded by 50mm insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.55</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Surrounded by 100mm insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.50</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Surrounded by 200mm+ insulation</td>
                      <td className="border border-white/10 px-3 py-2">0.45</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Keep cables away from thermal insulation where possible. If unavoidable,
              use XLPE cables which tolerate higher temperatures better than PVC.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Armoured vs Non-Armoured Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Armoured vs Non-Armoured Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between armoured and non-armoured cables depends on the installation environment,
              mechanical protection requirements, and earth fault loop impedance considerations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Steel Wire Armoured (SWA)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Construction:</strong> Conductors, insulation, bedding, armour, sheath</li>
                  <li className="pl-1"><strong>Protection:</strong> Mechanical damage, impact, crushing</li>
                  <li className="pl-1"><strong>Earth path:</strong> Armour can serve as CPC</li>
                  <li className="pl-1"><strong>Applications:</strong> External, underground, industrial</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Armoured (T+E, NYY, etc.)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Construction:</strong> Conductors, insulation, sheath</li>
                  <li className="pl-1"><strong>Protection:</strong> Minimal - requires conduit/trunking</li>
                  <li className="pl-1"><strong>Earth path:</strong> Separate CPC required</li>
                  <li className="pl-1"><strong>Applications:</strong> Internal, within containment</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Comparison Table</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">SWA Cable</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Non-Armoured</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical protection</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Excellent</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Requires containment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Underground burial</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Direct burial permitted</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Requires duct</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cost (cable only)</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Higher</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Lower</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Installation labour</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">More termination time</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Faster to terminate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flexibility</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Stiffer, larger bend radius</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">More flexible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electromagnetic screening</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Some screening effect</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">None</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 requirement:</strong> Where mechanical protection is required (Regulation 522.6),
              SWA cable or equivalent protection must be provided. External cables should be armoured unless
              installed in metallic conduit or similar.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: SWA Cable Installation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            SWA Cable Installation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct installation and termination of SWA cables is essential for mechanical protection,
              electrical safety, and compliance with BS 7671. The armour must be properly terminated and
              earthed at each end.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Termination Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable gland:</strong> CW, BW, or indoor gland types</li>
                <li className="pl-1"><strong>Gland plate:</strong> Earthed connection to enclosure</li>
                <li className="pl-1"><strong>Shroud:</strong> Weather protection for outdoor use</li>
                <li className="pl-1"><strong>Earth tag:</strong> Supplementary earth connection</li>
                <li className="pl-1"><strong>Locknut:</strong> Secures gland to enclosure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gland Type Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Gland Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Weather Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CW (compound weatherproof)</td>
                      <td className="border border-white/10 px-3 py-2">External, underground</td>
                      <td className="border border-white/10 px-3 py-2">IP66/IP68</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BW (brass weatherproof)</td>
                      <td className="border border-white/10 px-3 py-2">External, above ground</td>
                      <td className="border border-white/10 px-3 py-2">IP66</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Indoor gland</td>
                      <td className="border border-white/10 px-3 py-2">Internal only</td>
                      <td className="border border-white/10 px-3 py-2">IP40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Underground Installation</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Minimum 600mm depth (750mm under roads)</li>
                    <li className="pl-1">Cable warning tape 150mm above</li>
                    <li className="pl-1">Fine sand bedding and surround</li>
                    <li className="pl-1">Route marker posts at changes</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Surface Installation</p>
                  <ul className="text-sm text-white/90 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Cleats at maximum 450mm centres</li>
                    <li className="pl-1">Support within 300mm of terminations</li>
                    <li className="pl-1">Minimum bend radius = 6 × cable diameter</li>
                    <li className="pl-1">UV-resistant outer sheath for external</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Safety Point</p>
              <p className="text-sm text-white/90">
                The armour must be earthed at <strong>both ends</strong> of the cable. This provides the low-impedance
                fault path required for protective device operation. Use the armour earth tag connection and verify
                continuity during commissioning testing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Volt Drop Calculators and Tables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Volt Drop Calculators and Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 4 provides comprehensive tables for voltage drop calculations. Understanding
              how to navigate these tables and apply the values is essential for design work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key BS 7671 Tables for Voltage Drop</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Table</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D1B</td>
                      <td className="border border-white/10 px-3 py-2">Single-core PVC non-armoured</td>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D2B</td>
                      <td className="border border-white/10 px-3 py-2">Multi-core PVC non-armoured</td>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4D4B</td>
                      <td className="border border-white/10 px-3 py-2">Multi-core XLPE armoured (SWA)</td>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4E2B</td>
                      <td className="border border-white/10 px-3 py-2">Multi-core PVC non-armoured</td>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4E4B</td>
                      <td className="border border-white/10 px-3 py-2">Multi-core XLPE armoured (SWA)</td>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Calculator Method - Step by Step</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">1</span>
                  <p>Calculate design current: I<sub>b</sub> = P / (√3 × V<sub>L</sub> × cosφ)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">2</span>
                  <p>Calculate maximum mV/A/m: mV/A/m<sub>max</sub> = (V<sub>d max</sub> × 1000) / (I<sub>b</sub> × L)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">3</span>
                  <p>Select cable from tables where mV/A/m ≤ mV/A/m<sub>max</sub></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">4</span>
                  <p>Verify current capacity: I<sub>t</sub> × correction factors ≥ I<sub>b</sub></p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-xs font-medium">5</span>
                  <p>Calculate actual Vd: V<sub>d</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reverse Calculation - Maximum Cable Length</p>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-mono text-center text-lg mb-2">L<sub>max</sub> = (V<sub>d max</sub> × 1000) / (mV/A/m × I<sub>b</sub>)</p>
                <p className="text-xs text-white/70 text-center mt-2">
                  Useful for determining if a given cable size can serve a distant load
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Software tools:</strong> Software packages like Amtech, Trimble, and Conisio calculate
              voltage drop automatically. However, understanding the manual method is essential for verifying
              results and for examination purposes.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Section 8: Building Services Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Submain Sizing and Motor Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commercial and industrial buildings require careful coordination of submain and final circuit
              voltage drops. Large motor loads present particular challenges due to starting currents and
              power factor considerations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Submain Design Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load diversity:</strong> Apply diversity factors to connected load</li>
                <li className="pl-1"><strong>Future growth:</strong> Typically 20-30% spare capacity</li>
                <li className="pl-1"><strong>Voltage drop budget:</strong> Reserve 2-3% for submain, leaving 2-3% for finals</li>
                <li className="pl-1"><strong>Fault level:</strong> Check prospective fault current at distribution boards</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Circuit Sizing</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Motor Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Full Load Current*</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Cable</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7.5kW</td>
                      <td className="border border-white/10 px-3 py-2">15A</td>
                      <td className="border border-white/10 px-3 py-2">90-120A</td>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">11kW</td>
                      <td className="border border-white/10 px-3 py-2">22A</td>
                      <td className="border border-white/10 px-3 py-2">130-175A</td>
                      <td className="border border-white/10 px-3 py-2">6mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15kW</td>
                      <td className="border border-white/10 px-3 py-2">29A</td>
                      <td className="border border-white/10 px-3 py-2">175-230A</td>
                      <td className="border border-white/10 px-3 py-2">10mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22kW</td>
                      <td className="border border-white/10 px-3 py-2">42A</td>
                      <td className="border border-white/10 px-3 py-2">250-340A</td>
                      <td className="border border-white/10 px-3 py-2">16mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">37kW</td>
                      <td className="border border-white/10 px-3 py-2">70A</td>
                      <td className="border border-white/10 px-3 py-2">420-560A</td>
                      <td className="border border-white/10 px-3 py-2">25mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">55kW</td>
                      <td className="border border-white/10 px-3 py-2">100A</td>
                      <td className="border border-white/10 px-3 py-2">600-800A</td>
                      <td className="border border-white/10 px-3 py-2">35mm²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">*At 400V, 0.85 power factor. Starting current 6-8× full load for DOL start</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Variable Speed Drives (VSDs)</p>
              <p className="text-sm text-white/90">
                VSDs eliminate high starting currents and allow soft starting, but introduce harmonic currents
                that can increase voltage drop and heating. When sizing cables for VSD-fed motors:
              </p>
              <ul className="text-sm text-white/90 mt-2 list-disc list-outside ml-5">
                <li className="pl-1">Apply 1.1-1.2 multiplier to calculated voltage drop</li>
                <li className="pl-1">Consider screened cables for EMC compliance</li>
                <li className="pl-1">Size neutral for harmonics in multi-drive installations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Three-Phase Submain</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 200A submain runs 65m from the main switchboard to a distribution board.
                Select a suitable SWA/XLPE copper cable and verify voltage drop.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Design current I<sub>b</sub> = 200A</p>
                <p>Protective device I<sub>n</sub> = 200A MCCB</p>
                <p className="mt-2">Assume: 35°C ambient (C<sub>a</sub> = 0.96), no grouping (C<sub>g</sub> = 1.0)</p>
                <p>Required I<sub>t</sub> = 200 / 0.96 = 208A minimum</p>
                <p className="mt-2">From Table 4D4A (col 7): 70mm² = 207A, 95mm² = 251A</p>
                <p>Select <strong>95mm² 4-core SWA/XLPE</strong> (I<sub>t</sub> = 251A)</p>
                <p className="mt-2">mV/A/m from Table 4D4B = 0.42 mV/A/m</p>
                <p>V<sub>d</sub> = (0.42 × 200 × 65) / 1000 = <strong>5.46V</strong></p>
                <p className="mt-2">As percentage: (5.46 / 400) × 100 = <strong>1.37%</strong></p>
                <p className="mt-2 text-green-400">Acceptable - leaves 3.63% for final circuits</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Motor Circuit with Derating</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 30kW chiller motor (pf = 0.85) is located 45m from the distribution board.
                The cable runs with 4 other circuits in trunking at 40°C ambient. Size the cable.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>I<sub>b</sub> = 30000 / (1.732 × 400 × 0.85) = 50.9A</p>
                <p>Select I<sub>n</sub> = 63A MCCB</p>
                <p className="mt-2">Correction factors:</p>
                <p>C<sub>a</sub> = 0.87 (40°C, PVC 70°C)</p>
                <p>C<sub>g</sub> = 0.65 (5 circuits grouped)</p>
                <p className="mt-2">Required I<sub>t</sub> = 63 / (0.87 × 0.65) = 111.4A</p>
                <p className="mt-2">From Table 4D2A (Method B): 25mm² = 89A, 35mm² = 110A, 50mm² = 134A</p>
                <p>Select <strong>50mm² 4-core PVC</strong></p>
                <p className="mt-2">Check voltage drop (max 2% available = 8V):</p>
                <p>mV/A/m = 0.78</p>
                <p>V<sub>d</sub> = (0.78 × 50.9 × 45) / 1000 = <strong>1.79V (0.45%)</strong></p>
                <p className="mt-2 text-green-400">Acceptable for both current and voltage drop</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Maximum Cable Run Length</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> What is the maximum run length for a 16mm² copper SWA/XLPE cable supplying
                an 80A three-phase load with 3% voltage drop limit?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Maximum V<sub>d</sub> = 400V × 3% = 12V</p>
                <p>mV/A/m for 16mm² SWA/XLPE = 2.2 (from Table 4D4B)</p>
                <p className="mt-2">L<sub>max</sub> = (V<sub>d max</sub> × 1000) / (mV/A/m × I<sub>b</sub>)</p>
                <p>L<sub>max</sub> = (12 × 1000) / (2.2 × 80)</p>
                <p>L<sub>max</sub> = 12000 / 176 = <strong>68.2m maximum</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>V<sub>d</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000</strong> — Three-phase voltage drop</li>
                <li className="pl-1"><strong>I<sub>b</sub> = P / (√3 × V<sub>L</sub> × cosφ)</strong> — Three-phase design current</li>
                <li className="pl-1"><strong>I<sub>t</sub> ≥ I<sub>n</sub> / (C<sub>a</sub> × C<sub>g</sub> × C<sub>i</sub>)</strong> — Required cable capacity</li>
                <li className="pl-1"><strong>L<sub>max</sub> = (V<sub>d max</sub> × 1000) / (mV/A/m × I<sub>b</sub>)</strong> — Maximum cable length</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Power circuit limit: <strong>5%</strong> (20V at 400V)</li>
                <li className="pl-1">Lighting circuit limit: <strong>3%</strong> (12V at 400V)</li>
                <li className="pl-1">Typical motor power factor: <strong>0.85</strong></li>
                <li className="pl-1">Motor starting current: <strong>6-8× full load</strong></li>
                <li className="pl-1">Minimum aluminium CSA: <strong>16mm²</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Multiplying by √3</strong> — mV/A/m values already include this factor</li>
                <li className="pl-1"><strong>Forgetting derating</strong> — Always check grouping and ambient factors</li>
                <li className="pl-1"><strong>Ignoring submain drop</strong> — Total drop includes all sections</li>
                <li className="pl-1"><strong>Wrong table</strong> — Match table to cable type and installation method</li>
                <li className="pl-1"><strong>Single-phase values for three-phase</strong> — Use correct column in tables</li>
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
                <p className="font-medium text-white mb-1">Voltage Drop Limits</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 3% (12V at 400V 3-ph)</li>
                  <li>Power: 5% (20V at 400V 3-ph)</li>
                  <li>Formula: Vd = mV/A/m × I × L / 1000</li>
                  <li>No √3 needed with table values</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Derating Factors</p>
                <ul className="space-y-0.5">
                  <li>Ca: Ambient temperature</li>
                  <li>Cg: Grouping (0.5-1.0)</li>
                  <li>Ci: Thermal insulation</li>
                  <li>It ≥ In / (Ca × Cg × Ci)</li>
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
            <Link to="../h-n-c-module3-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Three-Phase Power Calculations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-6">
              Next: Earthing and Protective Devices
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_5;
