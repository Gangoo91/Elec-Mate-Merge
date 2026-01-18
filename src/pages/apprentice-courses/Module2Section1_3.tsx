import { ArrowLeft, Ruler, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import UnitPrefixConverter from "@/components/apprentice-courses/UnitPrefixConverter";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import FormulaList from "@/components/apprentice-courses/FormulaList";
import useSEO from "@/hooks/useSEO";

const TITLE = "Units of Measurement – V, A, Ω, W (Level 2 Module 2 Section 1.3)";
const DESCRIPTION = "Learn electrical units (volts, amps, ohms, watts), prefixes and BS 7671 testing. Understand measurement fundamentals for apprentice electricians.";

const quickCheckQuestions = [
  {
    id: "units-voltage",
    question: "What unit is used to measure electrical pressure?",
    options: [
      "Amperes (A)",
      "Volts (V)",
      "Ohms (Ω)",
      "Watts (W)"
    ],
    correctIndex: 1,
    explanation: "Volts (V) measure electrical pressure or potential difference - the 'push' that makes current flow through a circuit."
  },
  {
    id: "units-energy",
    question: "Which unit appears on UK electricity bills?",
    options: [
      "kW (kilowatts)",
      "kWh (kilowatt-hours)",
      "A (amperes)",
      "Ω (ohms)"
    ],
    correctIndex: 1,
    explanation: "kWh (kilowatt-hours) is the unit of energy used for billing - it measures how much electrical energy is consumed over time."
  },
  {
    id: "units-prefixes",
    question: "What does 'milli' mean in electrical units?",
    options: [
      "× 1,000",
      "÷ 1,000",
      "× 1,000,000",
      "÷ 1,000,000"
    ],
    correctIndex: 1,
    explanation: "Milli (m) means divide by 1,000. So 500mA = 0.5A, and 30mA = 0.03A."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What unit is used to measure electrical power?",
    options: ["Volts (V)", "Amperes (A)", "Watts (W)", "Ohms (Ω)"],
    correctAnswer: 2,
    explanation:
      "Watts (W) is the unit used to measure electrical power, representing the rate at which electrical energy is converted to other forms of energy.",
  },
  {
    id: 2,
    question: "What is the unit for resistance?",
    options: ["Amperes (A)", "Ohms (Ω)", "Volts (V)", "Watts (W)"],
    correctAnswer: 1,
    explanation:
      "Ohms (Ω) is the unit for electrical resistance, measuring how much a material opposes the flow of electric current.",
  },
  {
    id: 3,
    question: "What does kWh stand for?",
    options: ["Kilovolt-hours", "Kilowatt-hours", "Kilo-watt-hertz", "Kiloamp-hours"],
    correctAnswer: 1,
    explanation:
      "kWh stands for kilowatt-hours, which is the unit of energy used by electricity companies for billing - it measures how much electrical energy is consumed over time.",
  },
  {
    id: 4,
    question: "Which is larger: 500mA or 1A?",
    options: ["500mA", "1A", "They are equal", "Cannot determine"],
    correctAnswer: 1,
    explanation:
      "1A is larger. 500mA = 0.5A, so 1A is twice as large as 500mA. Remember: 1000mA = 1A.",
  },
  {
    id: 5,
    question: "True or False: You can ignore units if you're just doing practical work.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Units are crucial in practical electrical work. Misunderstanding units can lead to selecting wrong components, safety hazards, or equipment damage. Always check and understand the units.",
  },
  {
    id: 6,
    question:
      "A heater is rated at 2.4 kW on a 230 V supply. Approximately what current will it draw?",
    options: ["10 A", "13 A", "32 A", "2.4 A"],
    correctAnswer: 0,
    explanation:
      "I = P ÷ V = 2400 W ÷ 230 V ≈ 10.4 A. The closest answer is 10 A, though in practice it would draw about 10.4A.",
  },
  {
    id: 7,
    question: "Convert 0.02 kΩ to Ω.",
    options: ["20 Ω", "200 Ω", "2 Ω", "0.2 Ω"],
    correctAnswer: 0,
    explanation: "0.02 kΩ × 1000 = 20 Ω. Remember kilo means × 1000.",
  },
  {
    id: 8,
    question:
      "An RCD is rated 30 mA. What is this in amperes?",
    options: ["0.03 A", "3 A", "0.3 A", "0.003 A"],
    correctAnswer: 0,
    explanation: "30 mA = 0.03 A (milli = 1/1000, so 30 ÷ 1000 = 0.03).",
  },
  {
    id: 9,
    question: "Which prefix represents the largest value?",
    options: ["kilo (k)", "mega (M)", "milli (m)", "micro (μ)"],
    correctAnswer: 1,
    explanation: "Mega (M) = × 1,000,000, kilo (k) = × 1,000, milli (m) = ÷ 1,000, micro (μ) = ÷ 1,000,000.",
  },
  {
    id: 10,
    question: "Why must electricians understand units clearly?",
    options: [
      "It's only needed for calculations",
      "For safety, component selection, and testing",
      "It's not important for apprentices",
      "Only for passing exams"
    ],
    correctAnswer: 1,
    explanation: "Understanding units is essential for selecting correct components, interpreting test results, ensuring safety, and avoiding costly mistakes on installations.",
  }
];

const faqs = [
  {
    question: "Why do we have 230V in the UK instead of 240V?",
    answer: "The UK harmonised with European standards, changing from 240V to 230V (±10%). In practice, supply voltage can still be around 240V, which falls within the acceptable tolerance range."
  },
  {
    question: "What's the difference between kW and kWh?",
    answer: "kW (kilowatts) is power - the rate of energy use at a moment in time. kWh (kilowatt-hours) is energy - the total amount consumed over time. Think of kW as speed and kWh as distance travelled."
  },
  {
    question: "Why are test results sometimes given in different units?",
    answer: "Different tests measure different ranges. Insulation resistance is in MΩ (mega-ohms) because values are very high, while continuity is in Ω or mΩ because values are very low. Using appropriate units makes readings easier to understand."
  },
  {
    question: "Do I need to memorise all the conversion factors?",
    answer: "You should know the common ones (milli = ÷1000, kilo = ×1000, mega = ×1,000,000) as these appear constantly. For others, charts and calculators are acceptable tools to use on site."
  },
  {
    question: "Why do some components show power in VA instead of W?",
    answer: "VA (volt-amperes) is used for reactive loads like transformers and motors where not all the electrical energy converts to useful work. For resistive loads (heaters, lamps), VA and W are the same."
  },
  {
    question: "What happens if I use the wrong units in calculations?",
    answer: "Using wrong units can lead to serious errors - oversized or undersized cables, incorrect protection devices, or safety hazards. Always double-check your units and convert consistently throughout calculations."
  }
];

const Module2Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <Ruler className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2.1.3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Units of Measurement
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Master electrical units (V, A, Ω, W, kWh, Hz) and prefixes for safe installation work
          </p>
        </div>

        {/* Introduction Section */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>V (Volts):</strong> Electrical pressure that pushes current through circuits.</li>
                <li><strong>A (Amps):</strong> Current flow - the amount of electricity moving.</li>
                <li><strong>Ω (Ohms):</strong> Resistance - opposition to current flow.</li>
                <li><strong>W (Watts):</strong> Power - rate of energy conversion (V × A).</li>
                <li><strong>kWh:</strong> Energy consumed over time - what you pay for on bills.</li>
                <li><strong>Prefixes:</strong> k = ×1000, m = ÷1000, M = ×1,000,000</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Equipment labels, circuit breaker ratings, test results, cable specifications.</li>
                <li><strong>Use:</strong> Component selection, test interpretation, load calculations.</li>
                <li><strong>Apply:</strong> Circuit design, fault finding, safety verification, installation scheduling.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes Section */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify and use the correct units for voltage, current, resistance, power, and energy</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply unit prefixes (kilo, mega, milli, micro) in practical electrical work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Interpret equipment labels, test results, and circuit specifications correctly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Convert between different units used in BS 7671 testing and installation work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Avoid common unit-related mistakes that can cause safety hazards or component failures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use electrical units confidently in Ohm's Law calculations and power formulas</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Select appropriate measuring instruments based on expected unit ranges</span>
            </li>
          </ul>
        </section>

        {/* Section 1: Key Electrical Units */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Key Electrical Units (V, A, Ω, W, kWh, Hz)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding electrical units is like learning a language — know what each one means and when to use it.
                These units appear on every piece of equipment, every drawing, and every test result.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-md border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Voltage</p>
                    <p className="text-xs text-white/70">Volt — electrical pressure</p>
                  </div>
                  <span className="font-mono text-elec-yellow text-lg">V</span>
                </div>
                <div className="rounded-md border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current</p>
                    <p className="text-xs text-white/70">Ampere — flow of charge</p>
                  </div>
                  <span className="font-mono text-elec-yellow text-lg">A</span>
                </div>
                <div className="rounded-md border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resistance</p>
                    <p className="text-xs text-white/70">Ohm — opposition to current</p>
                  </div>
                  <span className="font-mono text-elec-yellow text-lg">Ω</span>
                </div>
                <div className="rounded-md border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Power</p>
                    <p className="text-xs text-white/70">Watt — rate of energy</p>
                  </div>
                  <span className="font-mono text-elec-yellow text-lg">W</span>
                </div>
                <div className="rounded-md border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Energy</p>
                    <p className="text-xs text-white/70">Kilowatt-hour — consumption</p>
                  </div>
                  <span className="font-mono text-elec-yellow text-lg">kWh</span>
                </div>
                <div className="rounded-md border border-white/10 p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Frequency</p>
                    <p className="text-xs text-white/70">Hertz — AC cycles/second</p>
                  </div>
                  <span className="font-mono text-elec-yellow text-lg">Hz</span>
                </div>
              </div>

              <div className="rounded-md border border-white/10 p-3 bg-white/5">
                <p className="text-sm">
                  <strong>Professional tip:</strong> These units appear on drawings, labels, and test results.
                  Master them early and work more safely and efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Unit Prefixes */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Unit Prefixes (k, M, m, μ, n)
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Electrical quantities can be very large or very small, so we use prefixes to make them easier to work with.
                These are essential for interpreting test results and equipment specifications.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Large Values</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded">
                      <p><strong>kilo (k):</strong> × 1,000</p>
                      <p className="text-sm text-white/70">Example: 3kW = 3,000W</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded">
                      <p><strong>Mega (M):</strong> × 1,000,000</p>
                      <p className="text-sm text-white/70">Example: 2MΩ = 2,000,000Ω</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded">
                      <p><strong>Giga (G):</strong> × 1,000,000,000</p>
                      <p className="text-sm text-white/70">Example: 1GΩ = 1,000,000,000Ω</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Small Values</h3>
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded">
                      <p><strong>milli (m):</strong> ÷ 1,000</p>
                      <p className="text-sm text-white/70">Example: 500mA = 0.5A</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded">
                      <p><strong>micro (μ):</strong> ÷ 1,000,000</p>
                      <p className="text-sm text-white/70">Example: 100μA = 0.0001A</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded">
                      <p><strong>nano (n):</strong> ÷ 1,000,000,000</p>
                      <p className="text-sm text-white/70">Example: 50nF = 0.00000005F</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: How Units Are Used In Practice */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              How Units Are Used In Practice
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Understanding units isn't just theory — you'll encounter them constantly in real electrical work:
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Volts (V)</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Equipment labels (230V supply voltage)</li>
                      <li>• Socket outlet ratings (230V single-phase)</li>
                      <li>• Circuit breaker specifications (400V three-phase)</li>
                      <li>• Low voltage systems (12V LED lighting)</li>
                      <li>• Test instrument readings (multimeter displays)</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-elec-yellow/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Amps (A)</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Fuse ratings (13A plug fuse)</li>
                      <li>• MCB ratings (32A ring final circuit)</li>
                      <li>• Appliance nameplates (washing machine 10A)</li>
                      <li>• Cable current-carrying capacity</li>
                      <li>• Clamp meter readings during testing</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Ohms (Ω)</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Insulation resistance testing (&gt;1MΩ)</li>
                      <li>• Continuity testing (&lt;0.05Ω)</li>
                      <li>• Earth fault loop impedance (Zs values)</li>
                      <li>• Cable resistance per metre</li>
                      <li>• Component resistance measurements</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Watts (W) & kWh</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Equipment power ratings (2000W heater)</li>
                      <li>• Lighting load calculations (LED 10W)</li>
                      <li>• Circuit design and sizing</li>
                      <li>• Energy consumption (kWh on electricity bills)</li>
                      <li>• Heat output calculations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Ohm's Law & Relationships */}
        <section className="mb-10">
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-teal-400/80 text-sm font-normal">06</span>
              Ohm's Law & Relationships
            </h2>
            <div className="space-y-6 text-white">
              <p>
                Units come together in electrical formulas. Understanding how V, I, R, and P relate helps with
                calculations and understanding circuit behaviour.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Formulas</h3>
                <FormulaList items={[
                  { text: "V = I × R    (Voltage = Current × Resistance)" },
                  { text: "P = V × I    (Power = Voltage × Current)" },
                  { text: "P = I² × R   (Power = Current² × Resistance)" },
                  { text: "P = V² ÷ R   (Power = Voltage² ÷ Resistance)" }
                ]} />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Try it</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Ohm's Law Calculator</h4>
                    <p className="text-sm text-white/70 mb-3">Enter any two values to calculate the others</p>
                    <OhmsCalculator />
                  </div>

                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h4 className="font-semibold mb-2">Unit Converter</h4>
                    <p className="text-sm text-white/70 mb-3">Convert between different unit prefixes</p>
                    <UnitPrefixConverter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Practical Guidance for Apprentices
          </h2>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">On Site Application</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>• Always check equipment labels for correct voltage and current ratings</li>
                <li>• Use the right measuring instrument for the expected range (mA vs A)</li>
                <li>• Record test results with the correct units (MΩ for insulation, Ω for continuity)</li>
                <li>• Double-check unit conversions in load calculations and cable sizing</li>
                <li>• Verify that circuit protection matches the connected load requirements</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Common Mistakes to Avoid</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>• Confusing kW (power) with kWh (energy) - they're completely different</li>
                <li>• Mixing up mA and A when reading RCD ratings or test results</li>
                <li>• Using 240V in calculations when equipment is rated for 230V</li>
                <li>• Forgetting to convert units before calculations (kW to W, mA to A)</li>
                <li>• Assuming all 'watts' are the same (W vs VA for reactive loads)</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Building Your Understanding</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>• Practice unit conversions daily until they become automatic</li>
                <li>• Always write units in your calculations - it prevents errors</li>
                <li>• Learn the common values: 13A fuses, 30mA RCDs, 230V supply</li>
                <li>• Use the unit conversion tools until you're confident with mental calculations</li>
                <li>• Ask experienced electricians about unit-related mistakes they've seen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-1 border border-white/10 rounded-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 active:bg-white/10 transition-all touch-manipulation">
                  <span className="font-medium text-white">{faq.question}</span>
                  <span className="ml-2 transform transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Units Pocket Card */}
        <UnitsPocketCard />

        {/* Quick Reference Card */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Quick Reference Card
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 p-4 bg-white/5 border border-white/10 rounded-lg">
            <div>
              <h3 className="font-semibold text-white mb-3">Common UK Values</h3>
              <ul className="space-y-1 text-xs sm:text-sm text-white/80">
                <li>• Single-phase supply: <strong className="text-white">230V</strong></li>
                <li>• Three-phase supply: <strong className="text-white">400V</strong></li>
                <li>• Standard RCD rating: <strong className="text-white">30mA</strong></li>
                <li>• Plug fuse: <strong className="text-white">13A</strong></li>
                <li>• Ring circuit MCB: <strong className="text-white">32A</strong></li>
                <li>• Mains frequency: <strong className="text-white">50Hz</strong></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Test Limits (typical)</h3>
              <ul className="space-y-1 text-xs sm:text-sm text-white/80">
                <li>• Insulation resistance: <strong className="text-white">&gt;1MΩ</strong></li>
                <li>• Continuity: <strong className="text-white">&lt;0.05Ω</strong></li>
                <li>• Earth loop (socket): <strong className="text-white">&lt;1.44Ω</strong></li>
                <li>• RCD trip time: <strong className="text-white">&lt;300ms</strong></li>
                <li>• RCD trip current: <strong className="text-white">15-30mA</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Test Your Knowledge: Units and Measurements" questions={quizQuestions} />

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Voltage, Current & Resistance
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-4">
              Next: Ohm's Law
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section1_3;
