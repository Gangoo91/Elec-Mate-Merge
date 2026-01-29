import { ArrowLeft, TrendingDown, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Voltage Drop Calculations - HNC Module 4 Section 2.2";
const DESCRIPTION = "Master voltage drop calculations using the mV/A/m method, BS 7671 limits and three-phase calculations for building services cable sizing.";

const quickCheckQuestions = [
  {
    id: "vd-limit-power",
    question: "What is the maximum permitted voltage drop for power circuits from the origin to the load?",
    options: ["3%", "4%", "5%", "6%"],
    correctIndex: 2,
    explanation: "BS 7671 permits a maximum 5% voltage drop for power circuits (11.5V at 230V). This can be split between the supply and final circuit, typically 2.5% each."
  },
  {
    id: "vd-limit-lighting",
    question: "What is the maximum permitted voltage drop for lighting circuits?",
    options: ["3%", "4%", "5%", "6%"],
    correctIndex: 0,
    explanation: "Lighting circuits have a tighter 3% limit (6.9V at 230V) to prevent visible flicker and dimming, particularly important for discharge lamps."
  },
  {
    id: "mva-m-meaning",
    question: "What does the mV/A/m value from BS 7671 tables represent?",
    options: ["Minimum voltage allowed per metre", "Millivolts dropped per amp per metre of cable", "Maximum voltage per ampere", "Motor voltage at full load"],
    correctIndex: 1,
    explanation: "The mV/A/m value is the voltage drop in millivolts for each ampere of current flowing through each metre of cable. It simplifies voltage drop calculations."
  },
  {
    id: "three-phase-vd",
    question: "For three-phase circuits, why is the voltage drop formula different from single-phase?",
    options: ["Cables are longer", "Current flows in three conductors", "No neutral current in balanced loads", "Higher voltage is used"],
    correctIndex: 2,
    explanation: "In balanced three-phase circuits, current returns via the other phases rather than a neutral, so voltage drop is calculated for line voltage using the √3 factor inherently in the tables."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the voltage drop formula for single-phase circuits using the mV/A/m method?",
    options: [
      "Vd = mV/A/m × I × L",
      "Vd = (mV/A/m × I × L) / 1000",
      "Vd = mV/A/m × I × L × 2",
      "Vd = mV/A/m × L / I"
    ],
    correctAnswer: 1,
    explanation: "Vd = (mV/A/m × I × L) / 1000. Division by 1000 converts millivolts to volts. The mV/A/m value already accounts for both conductors in single-phase circuits."
  },
  {
    id: 2,
    question: "A 30m single-phase circuit carries 25A using 4mm² cable (mV/A/m = 11). What is the voltage drop?",
    options: ["5.5V", "8.25V", "11V", "16.5V"],
    correctAnswer: 1,
    explanation: "Vd = (11 × 25 × 30) / 1000 = 8250 / 1000 = 8.25V"
  },
  {
    id: 3,
    question: "For a 230V single-phase circuit, 5% voltage drop equals:",
    options: ["9.2V", "11.5V", "13.8V", "23V"],
    correctAnswer: 1,
    explanation: "5% of 230V = 0.05 × 230 = 11.5V. This is the maximum permitted drop for power circuits."
  },
  {
    id: 4,
    question: "Why might motor starting cause excessive voltage drop?",
    options: [
      "Motors draw 6-8 times full load current during starting",
      "Motors generate back-EMF",
      "Motor cables are always undersized",
      "Power factor is always unity"
    ],
    correctAnswer: 0,
    explanation: "Direct-on-line motor starting draws 6-8 times full load current. For a motor with Ib = 20A, starting current could be 120-160A, causing proportionally higher voltage drop."
  },
  {
    id: 5,
    question: "What happens to voltage drop as cable length increases?",
    options: [
      "It decreases proportionally",
      "It increases proportionally",
      "It remains constant",
      "It increases exponentially"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop is directly proportional to cable length (Vd = mV/A/m × I × L). Doubling the length doubles the voltage drop."
  },
  {
    id: 6,
    question: "For long cable runs exceeding voltage drop limits, which solution is most cost-effective?",
    options: [
      "Use a larger cable size",
      "Reduce the load",
      "Use higher supply voltage",
      "Install multiple parallel cables"
    ],
    correctAnswer: 0,
    explanation: "Increasing cable size reduces resistance and therefore voltage drop. While more expensive per metre, it's usually more cost-effective than parallel runs or voltage conversion."
  },
  {
    id: 7,
    question: "In three-phase balanced systems, the voltage drop formula uses:",
    options: [
      "Single-phase mV/A/m values",
      "Three-phase mV/A/m values from tables",
      "Single-phase values multiplied by 3",
      "Single-phase values divided by √3"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 provides separate mV/A/m columns for three-phase circuits. These values are typically √3/2 (0.866) times the single-phase values."
  },
  {
    id: 8,
    question: "A cable has mV/A/m values of 4.4 (r) and 0.165 (x). At power factor 0.8, the effective mV/A/m is:",
    options: [
      "3.52",
      "3.62",
      "4.57",
      "4.4"
    ],
    correctAnswer: 1,
    explanation: "mV/A/m = (r × cos φ) + (x × sin φ) = (4.4 × 0.8) + (0.165 × 0.6) = 3.52 + 0.099 = 3.62 mV/A/m"
  },
  {
    id: 9,
    question: "What is the purpose of the voltage drop limit being split between mains and final circuits?",
    options: [
      "To reduce cable sizes",
      "To allow design flexibility while maintaining total compliance",
      "To increase circuit length",
      "To reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "The 5% total can be allocated flexibly (e.g., 2% mains + 3% final, or 3% mains + 2% final) depending on circuit requirements and cable lengths."
  },
  {
    id: 10,
    question: "For a 50m three-phase circuit with 40A load using 10mm² cable (mV/A/m = 3.8 3φ), the voltage drop is:",
    options: [
      "3.8V",
      "7.6V",
      "19V",
      "76V"
    ],
    correctAnswer: 1,
    explanation: "Vd = (3.8 × 40 × 50) / 1000 = 7600 / 1000 = 7.6V. At 400V line voltage, this is 1.9% - well within limits."
  }
];

const faqs = [
  {
    question: "Why do lighting circuits have stricter voltage drop limits than power circuits?",
    answer: "Lighting is sensitive to voltage variations - discharge lamps may flicker or fail to start, and LED drivers may operate inefficiently. The 3% limit ensures reliable lamp operation and consistent light output. Additionally, lighting circuits often have longer cable runs to multiple luminaires."
  },
  {
    question: "How do I handle voltage drop for circuits with varying loads?",
    answer: "Calculate voltage drop for the maximum design current (Ib). For circuits with diversity applied, use the diversified current. For motor circuits, check both running current (for continuous operation) and starting current (for momentary drop during start-up)."
  },
  {
    question: "What's the difference between tabulated mV/A/m values at column (r) and (x)?",
    answer: "Column (r) gives the resistive component and (x) gives the reactive component. For resistive loads (unity power factor), use the (r) value. For reactive loads (motors, transformers), calculate the effective value using: mV/A/m = (r × cos φ) + (x × sin φ)."
  },
  {
    question: "Can I exceed the 5% voltage drop limit in any circumstances?",
    answer: "BS 7671 Appendix 4 Note 3 permits higher limits where the equipment manufacturer confirms acceptable operation. Motor starting transients may temporarily exceed limits. However, sustained operation beyond 5% risks equipment malfunction and should be avoided."
  },
  {
    question: "How does temperature affect voltage drop calculations?",
    answer: "Cable resistance increases with temperature. BS 7671 mV/A/m values are given at conductor operating temperature (typically 70°C for PVC, 90°C for XLPE). For lightly loaded cables running cooler, actual voltage drop will be slightly less than calculated."
  },
  {
    question: "Should I include the neutral conductor in single-phase voltage drop calculations?",
    answer: "No, the mV/A/m values in BS 7671 already account for both the line and neutral conductors in single-phase circuits. The value represents the total voltage drop for the complete circuit - do not multiply by 2."
  }
];

const HNCModule4Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
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
            <TrendingDown className="h-4 w-4" />
            <span>Module 4.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Voltage Drop Calculations
          </h1>
          <p className="text-white/80">
            Ensuring adequate voltage at the load through proper cable sizing and route planning
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Power circuits:</strong> Maximum 5% drop (11.5V at 230V)</li>
              <li className="pl-1"><strong>Lighting:</strong> Maximum 3% drop (6.9V at 230V)</li>
              <li className="pl-1"><strong>Formula:</strong> Vd = (mV/A/m × I × L) / 1000</li>
              <li className="pl-1"><strong>Solution:</strong> Increase cable size or reduce length</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Long risers:</strong> Often voltage drop critical</li>
              <li className="pl-1"><strong>Motor starting:</strong> Transient drops to consider</li>
              <li className="pl-1"><strong>LED lighting:</strong> Sensitive to supply voltage</li>
              <li className="pl-1"><strong>Sub-mains:</strong> Allocate drop wisely</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 7671 voltage drop limits for different circuit types",
              "Use the mV/A/m method for voltage drop calculations",
              "Calculate voltage drop for single and three-phase circuits",
              "Account for power factor in reactive load calculations",
              "Size cables for long cable runs and motor circuits",
              "Allocate voltage drop between mains and final circuits"
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

        {/* Section 1: BS 7671 Voltage Drop Limits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 7671 Voltage Drop Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 4 specifies maximum voltage drop limits to ensure equipment operates correctly
              and efficiently. These limits apply from the origin of the installation to the most distant point.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Permitted Voltage Drop Limits</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">At 230V</th>
                      <th className="border border-white/10 px-3 py-2 text-left">At 400V</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">3%</td>
                      <td className="border border-white/10 px-3 py-2">6.9V</td>
                      <td className="border border-white/10 px-3 py-2">12V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Other circuits (power)</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">11.5V</td>
                      <td className="border border-white/10 px-3 py-2">20V</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Allocating Voltage Drop</p>
              <p className="text-sm text-white mb-2">
                The total permitted drop can be split between different parts of the installation:
              </p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Sub-main</p>
                  <p className="text-white/70">Origin to DB</p>
                  <p className="text-lg mt-1">2-3%</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">+</p>
                  <p className="text-white/70 opacity-0">spacer</p>
                  <p className="text-lg mt-1">&nbsp;</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Final Circuit</p>
                  <p className="text-white/70">DB to load</p>
                  <p className="text-lg mt-1">2-3%</p>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">Combined total must not exceed 5% (power) or 3% (lighting)</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Allow 2.5% for sub-mains and 2.5% for final circuits as a balanced starting point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The mV/A/m Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The mV/A/m Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 4 provides mV/A/m values for each cable type and size. This method simplifies
              voltage drop calculations by combining cable resistance and reactance into a single value.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Formulas</p>
              <div className="grid sm:grid-cols-2 gap-4 text-center text-sm">
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Single-Phase</p>
                  <p className="font-mono">Vd = (mV/A/m × I × L) / 1000</p>
                  <p className="text-white/70 text-xs mt-1">Result in Volts</p>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="font-bold text-elec-yellow mb-1">Three-Phase</p>
                  <p className="font-mono">Vd = (mV/A/m × I × L) / 1000</p>
                  <p className="text-white/70 text-xs mt-1">Use 3φ column values</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical mV/A/m Values (PVC/copper at 70°C)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Cable Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">2-core 1φ</th>
                      <th className="border border-white/10 px-3 py-2 text-left">3/4-core 3φ</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">29</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5mm²</td>
                      <td className="border border-white/10 px-3 py-2">18</td>
                      <td className="border border-white/10 px-3 py-2">15</td>
                      <td className="border border-white/10 px-3 py-2">Sockets, FCUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                      <td className="border border-white/10 px-3 py-2">11</td>
                      <td className="border border-white/10 px-3 py-2">9.5</td>
                      <td className="border border-white/10 px-3 py-2">Water heaters</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6mm²</td>
                      <td className="border border-white/10 px-3 py-2">7.3</td>
                      <td className="border border-white/10 px-3 py-2">6.4</td>
                      <td className="border border-white/10 px-3 py-2">Showers, cookers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10mm²</td>
                      <td className="border border-white/10 px-3 py-2">4.4</td>
                      <td className="border border-white/10 px-3 py-2">3.8</td>
                      <td className="border border-white/10 px-3 py-2">Sub-mains</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16mm²</td>
                      <td className="border border-white/10 px-3 py-2">2.8</td>
                      <td className="border border-white/10 px-3 py-2">2.4</td>
                      <td className="border border-white/10 px-3 py-2">Distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25mm²</td>
                      <td className="border border-white/10 px-3 py-2">1.75</td>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">Main distribution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> XLPE cables have slightly lower mV/A/m values than PVC due to lower resistance at operating temperature.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: Three-Phase Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Three-Phase Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase voltage drop calculations use the same formula but with different mV/A/m values.
              The result is the line-to-line voltage drop, which is compared against the 400V supply.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Voltage Drop</p>
              <div className="bg-black/30 p-3 rounded text-center font-mono">
                <p className="text-lg">Vd = (mV/A/m<sub>3φ</sub> × I<sub>L</sub> × L) / 1000</p>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">Where IL is the line current and L is the cable length in metres</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Balanced Three-Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Use 3-core or 4-core cable values</li>
                  <li className="pl-1">No neutral current in balanced loads</li>
                  <li className="pl-1">Compare drop against 400V line voltage</li>
                  <li className="pl-1">5% limit = 20V at 400V</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unbalanced Three-Phase</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Neutral carries unbalanced current</li>
                  <li className="pl-1">Calculate each phase separately</li>
                  <li className="pl-1">Worst-case phase determines cable size</li>
                  <li className="pl-1">Consider harmonic currents in neutrals</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reactive Loads - Power Factor Correction</p>
              <p className="text-sm text-white mb-2">
                For inductive loads (motors), calculate effective mV/A/m using resistance (r) and reactance (x) components:
              </p>
              <div className="bg-black/30 p-3 rounded text-center font-mono text-sm">
                <p>mV/A/m = (r × cos φ) + (x × sin φ)</p>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Where cos φ is the power factor. For pf = 0.85: sin φ = 0.527
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Three-phase mV/A/m values are approximately 0.866 (√3/2) times single-phase values due to the phase relationship.
            </p>
          </div>
        </section>

        {/* Section 4: Motor Starting and Long Cable Runs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motor Starting and Long Cable Runs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Motor starting currents and long cable runs present special challenges for voltage drop.
              These situations often determine the final cable size rather than current-carrying capacity.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Starting Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage Drop Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Direct-on-line (DOL)</td>
                      <td className="border border-white/10 px-3 py-2">6-8 × FLC</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">Highest</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Star-delta</td>
                      <td className="border border-white/10 px-3 py-2">2-3 × FLC</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Moderate</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft starter</td>
                      <td className="border border-white/10 px-3 py-2">2-4 × FLC</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-300">Controlled</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSD/inverter</td>
                      <td className="border border-white/10 px-3 py-2">1-1.5 × FLC</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Minimal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Long Cable Run Strategies</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Increase cable size:</strong> Lower resistance = lower drop (most common solution)</li>
                <li className="pl-1"><strong>Local sub-distribution:</strong> Reduce final circuit lengths by adding local DBs</li>
                <li className="pl-1"><strong>Higher voltage distribution:</strong> Use 400V 3φ to local transformers</li>
                <li className="pl-1"><strong>Parallel cables:</strong> Two smaller cables share current (complex installation)</li>
                <li className="pl-1"><strong>Copper vs aluminium:</strong> Copper has lower resistance per mm²</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">Motor Starting Drop Example</p>
              <div className="text-sm text-white">
                <p>15kW motor, FLC = 26A, 50m cable run, 10mm² cable (mV/A/m = 3.8)</p>
                <p className="mt-2"><strong>Running:</strong> Vd = (3.8 × 26 × 50) / 1000 = <span className="text-green-400">4.9V (1.2%)</span></p>
                <p><strong>DOL start (7× FLC):</strong> Vd = (3.8 × 182 × 50) / 1000 = <span className="text-orange-400">34.6V (8.7%)</span></p>
                <p className="mt-2 text-white/70">→ Running voltage drop acceptable; consider soft starter or VSD for starting</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Motor starting drops are transient (seconds) and equipment may tolerate brief dips. Check manufacturer specifications for minimum starting voltage.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Single-Phase Socket Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 32A radial circuit uses 4mm² cable for a 35m run. Calculate voltage drop and check compliance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>mV/A/m for 4mm² 2-core = 11</p>
                <p className="mt-2">Vd = (11 × 32 × 35) / 1000</p>
                <p>Vd = 12,320 / 1000 = <strong>12.3V</strong></p>
                <p className="mt-2">As percentage: (12.3 / 230) × 100 = <strong>5.35%</strong></p>
                <p className="mt-2 text-orange-400">✗ Exceeds 5% limit for final circuit</p>
                <p className="mt-2">Solution: Upgrade to 6mm² (mV/A/m = 7.3)</p>
                <p>Vd = (7.3 × 32 × 35) / 1000 = <strong>8.2V (3.6%)</strong></p>
                <p className="text-green-400">✓ Within limits</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Lighting Circuit</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A lighting circuit serves luminaires 45m from the DB. Maximum current 8A. What cable size?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Lighting limit: 3% of 230V = 6.9V maximum</p>
                <p className="mt-2">Try 1.5mm² (mV/A/m = 29):</p>
                <p>Vd = (29 × 8 × 45) / 1000 = <strong>10.4V</strong></p>
                <p className="text-orange-400">✗ Exceeds 3% limit</p>
                <p className="mt-2">Try 2.5mm² (mV/A/m = 18):</p>
                <p>Vd = (18 × 8 × 45) / 1000 = <strong>6.5V (2.8%)</strong></p>
                <p className="text-green-400">✓ Within 3% limit</p>
                <p className="mt-2 text-white/60">→ 2.5mm² required despite 1.5mm² having adequate current capacity</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Three-Phase Sub-Main</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Size a 3-phase sub-main for 80A balanced load, 60m length, allocated 2.5% drop.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Maximum Vd = 2.5% of 400V = <strong>10V</strong></p>
                <p className="mt-2">Required mV/A/m = (Vd × 1000) / (I × L)</p>
                <p>Required mV/A/m = (10 × 1000) / (80 × 60) = <strong>2.08</strong></p>
                <p className="mt-2">From tables (3φ values):</p>
                <p>16mm² = 2.4 mV/A/m (too high)</p>
                <p>25mm² = 1.5 mV/A/m (adequate)</p>
                <p className="mt-2">Check: Vd = (1.5 × 80 × 60) / 1000 = <strong>7.2V (1.8%)</strong></p>
                <p className="text-green-400">✓ Select 25mm² 4-core XLPE/SWA</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Vd = (mV/A/m × I × L) / 1000</strong> — Basic voltage drop</li>
                <li className="pl-1"><strong>Vd% = (Vd / Uo) × 100</strong> — Percentage drop</li>
                <li className="pl-1"><strong>Max mV/A/m = (Vd max × 1000) / (I × L)</strong> — For cable selection</li>
                <li className="pl-1"><strong>mV/A/m = (r × cosφ) + (x × sinφ)</strong> — Power factor adjusted</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Calculate voltage drop early in design - it often determines cable size</li>
                <li className="pl-1">Consider future load growth when allocating voltage drop budgets</li>
                <li className="pl-1">Use XLPE cables for long runs - slightly better mV/A/m values</li>
                <li className="pl-1">Position distribution boards to minimise final circuit lengths</li>
                <li className="pl-1">Document voltage drop calculations in design records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Doubling mV/A/m</strong> — Values already include both conductors</li>
                <li className="pl-1"><strong>Wrong column</strong> — Use 1φ values for single-phase, 3φ for three-phase</li>
                <li className="pl-1"><strong>Forgetting to convert</strong> — Divide by 1000 to get Volts</li>
                <li className="pl-1"><strong>Ignoring sub-main drop</strong> — Total must include all sections</li>
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
                  <li>Lighting: 3% (6.9V at 230V)</li>
                  <li>Power: 5% (11.5V at 230V)</li>
                  <li>Three-phase: 5% (20V at 400V)</li>
                  <li>Total = sub-main + final circuit</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Quick mV/A/m Values (PVC Cu)</p>
                <ul className="space-y-0.5">
                  <li>1.5mm²: 29 (1φ), 25 (3φ)</li>
                  <li>2.5mm²: 18 (1φ), 15 (3φ)</li>
                  <li>4mm²: 11 (1φ), 9.5 (3φ)</li>
                  <li>6mm²: 7.3 (1φ), 6.4 (3φ)</li>
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
            <Link to="../h-n-c-module4-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Current-Carrying Capacity
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2-3">
              Next: Thermal Constraints
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section2_2;
