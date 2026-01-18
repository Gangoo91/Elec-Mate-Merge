import { ArrowLeft, Repeat, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitPrefixConverter from "@/components/apprentice-courses/UnitPrefixConverter";
import useSEO from "@/hooks/useSEO";

const TITLE = "SI Prefixes and Conversions – milli-, kilo-, mega- (Level 2 Module 2 Section 1.4)";
const DESCRIPTION = "Master SI prefixes (milli, kilo, mega) and unit conversions for electrical quantities. Essential skills for BS 7671 testing and equipment selection.";

const quizQuestions = [
  {
    id: 1,
    question: "What does the prefix 'kilo' mean?",
    options: [
      "× 100",
      "× 1,000",
      "× 10,000",
      "÷ 1,000"
    ],
    correctAnswer: 1,
    explanation: "The prefix 'kilo' means × 1,000 (multiply by one thousand). For example, 1 kV = 1,000 V."
  },
  {
    id: 2,
    question: "How many milliamps equal 1 amp?",
    options: [
      "10 mA",
      "100 mA",
      "1,000 mA",
      "10,000 mA"
    ],
    correctAnswer: 2,
    explanation: "1,000 mA = 1 A. The prefix 'milli' means ÷ 1,000, so 1 mA = 0.001 A."
  },
  {
    id: 3,
    question: "Convert 2.5 kW to watts:",
    options: [
      "25 W",
      "250 W",
      "2,500 W",
      "25,000 W"
    ],
    correctAnswer: 2,
    explanation: "2.5 kW = 2.5 × 1,000 = 2,500 W. To convert from kilo to base units, multiply by 1,000."
  },
  {
    id: 4,
    question: "What is 500 µA in amperes?",
    options: [
      "0.0005 A",
      "0.05 A",
      "5 A",
      "500,000 A"
    ],
    correctAnswer: 0,
    explanation: "500 µA = 500 ÷ 1,000,000 = 0.0005 A. The prefix 'micro' means ÷ 1,000,000."
  },
  {
    id: 5,
    question: "True or False: 1 MΩ is equal to 1,000 kΩ.",
    options: [
      "True",
      "False"
    ],
    correctAnswer: 0,
    explanation: "True. 1 MΩ = 1,000,000 Ω, and 1,000 kΩ = 1,000 × 1,000 = 1,000,000 Ω. They are exactly equal."
  },
  {
    id: 6,
    question: "Convert 0.025 A to milliamps:",
    options: [
      "2.5 mA",
      "25 mA",
      "250 mA",
      "0.25 mA"
    ],
    correctAnswer: 1,
    explanation: "0.025 A = 0.025 × 1,000 = 25 mA. To convert from base units to milli, multiply by 1,000."
  },
  {
    id: 7,
    question: "What is 3.3 kV in volts?",
    options: [
      "33 V",
      "330 V",
      "3,300 V",
      "33,000 V"
    ],
    correctAnswer: 2,
    explanation: "3.3 kV = 3.3 × 1,000 = 3,300 V. Kilo means multiply by 1,000."
  },
  {
    id: 8,
    question: "An RCD has a 30mA rating. What is this in amperes?",
    options: [
      "0.003 A",
      "0.03 A",
      "0.3 A",
      "3 A"
    ],
    correctAnswer: 1,
    explanation: "30 mA = 30 ÷ 1,000 = 0.03 A. This is a common RCD rating for domestic installations."
  },
  {
    id: 9,
    question: "Which is larger: 2,200 µF or 2.2 mF?",
    options: [
      "2,200 µF",
      "2.2 mF",
      "They are equal",
      "Cannot determine"
    ],
    correctAnswer: 2,
    explanation: "2.2 mF = 2.2 × 1,000 µF = 2,200 µF, but mF means milli (÷1,000), so 2.2 mF = 0.0022 F, whilst 2,200 µF = 0.0022 F. They are equal!"
  },
  {
    id: 10,
    question: "A cable has a resistance of 0.5 Ω per 100m. What is this in milliohms per metre?",
    options: [
      "5 mΩ/m",
      "50 mΩ/m",
      "0.5 mΩ/m",
      "500 mΩ/m"
    ],
    correctAnswer: 0,
    explanation: "0.5 Ω per 100m = 0.5 ÷ 100 = 0.005 Ω/m. Converting to mΩ: 0.005 × 1,000 = 5 mΩ/m."
  }
];

const quickCheckQuestions = [
  {
    id: "prefix-conversion",
    question: "How many milliamps equal 1 amp?",
    options: [
      "10 mA",
      "100 mA",
      "1,000 mA",
      "10,000 mA"
    ],
    correctIndex: 2,
    explanation: "1,000 mA = 1 A. The prefix 'milli' means ÷ 1,000, so 1 mA = 0.001 A."
  }
];

const Module2Section1_4 = () => {
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
          <Repeat className="h-10 w-10 text-elec-yellow mx-auto mb-4" />
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2.1.4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            SI Prefixes and Conversions
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Master milli-, kilo-, mega- prefixes for accurate electrical measurements and calculations
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
                <li><strong>SI Prefixes:</strong> Standard multipliers for large/small electrical values.</li>
                <li><strong>kilo (k):</strong> × 1,000 - common for power (kW), voltage (kV).</li>
                <li><strong>milli (m):</strong> ÷ 1,000 - used for current (mA), time (ms).</li>
                <li><strong>mega (M):</strong> × 1,000,000 - typical for resistance (MΩ).</li>
                <li><strong>Conversion:</strong> Move decimal point or multiply/divide by factors.</li>
                <li><strong>Safety:</strong> Wrong units = wrong components = danger.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow/50 border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Equipment labels (2.5kW heater), test results (500mA RCD), specifications.</li>
                <li><strong>Use:</strong> Reading drawings, interpreting test readings, component selection.</li>
                <li><strong>Apply:</strong> Load calculations, cable sizing, protection device selection, fault diagnosis.</li>
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
              <span>Understand common SI prefixes (kilo, mega, milli, micro, nano) and their multipliers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Convert between different units using prefixes accurately and confidently</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Recognise prefix symbols and abbreviations on equipment and test instruments</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply conversions to real electrical scenarios including BS 7671 testing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Avoid dangerous mistakes caused by unit confusion in component selection</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Read equipment labels and test results with complete understanding</span>
            </li>
          </ul>
        </section>

        {/* Section 1: SI Prefix System */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              SI Prefix System
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The International System of Units (SI) uses prefixes to express very large or very small quantities.
                These prefixes are based on powers of 10, making conversions straightforward once you understand the pattern.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Why SI Prefixes Matter in Electrical Work</h3>
                <ul className="text-white space-y-1 text-sm">
                  <li>• <strong>Safety:</strong> Wrong units can lead to equipment damage or personal injury</li>
                  <li>• <strong>Precision:</strong> Electrical measurements often span many orders of magnitude</li>
                  <li>• <strong>Standards:</strong> BS 7671 and IET regulations use consistent SI notation</li>
                  <li>• <strong>Communication:</strong> Universal language for electrical professionals worldwide</li>
                </ul>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-white/10">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Prefix</th>
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Symbol</th>
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Multiplier</th>
                      <th className="border border-white/10 p-4 text-left text-white font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 p-4 font-medium">Mega</td>
                      <td className="border border-white/10 p-4 font-mono text-elec-yellow">M</td>
                      <td className="border border-white/10 p-4">× 1,000,000</td>
                      <td className="border border-white/10 p-4">1 MΩ = 1,000,000 Ω</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="border border-white/10 p-4 font-medium">Kilo</td>
                      <td className="border border-white/10 p-4 font-mono text-elec-yellow">k</td>
                      <td className="border border-white/10 p-4">× 1,000</td>
                      <td className="border border-white/10 p-4">1 kW = 1,000 W</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 p-4 font-medium">Base unit</td>
                      <td className="border border-white/10 p-4 font-mono text-elec-yellow">-</td>
                      <td className="border border-white/10 p-4">× 1</td>
                      <td className="border border-white/10 p-4">1 V = 1 V</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="border border-white/10 p-4 font-medium">Milli</td>
                      <td className="border border-white/10 p-4 font-mono text-elec-yellow">m</td>
                      <td className="border border-white/10 p-4">÷ 1,000</td>
                      <td className="border border-white/10 p-4">1 mA = 0.001 A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 p-4 font-medium">Micro</td>
                      <td className="border border-white/10 p-4 font-mono text-elec-yellow">µ</td>
                      <td className="border border-white/10 p-4">÷ 1,000,000</td>
                      <td className="border border-white/10 p-4">1 µF = 0.000001 F</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="border border-white/10 p-4 font-medium">Nano</td>
                      <td className="border border-white/10 p-4 font-mono text-elec-yellow">n</td>
                      <td className="border border-white/10 p-4">÷ 1,000,000,000</td>
                      <td className="border border-white/10 p-4">1 nF = 0.000000001 F</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-md border border-white/10 p-3 bg-white/5">
                <p className="text-sm">
                  <strong>Professional tip:</strong> These prefixes appear constantly on equipment labels, drawings, and test results.
                  Master them early to work more safely and efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Conversion Rules */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Conversion Rules
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Converting between units with prefixes follows simple rules. Understanding these patterns
                helps you work quickly and accurately with electrical calculations.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Converting to Larger Units</h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-elec-yellow font-medium mb-2">Rule: Divide by the multiplier</p>
                    <div className="space-y-2 text-white/80">
                      <p>• 5,000 W → 5 kW (÷ 1,000)</p>
                      <p>• 2,000,000 Ω → 2 MΩ (÷ 1,000,000)</p>
                      <p>• 500 mA → 0.5 A (÷ 1,000)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Converting to Smaller Units</h3>
                  <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                    <p className="text-green-300 font-medium mb-2">Rule: Multiply by the multiplier</p>
                    <div className="space-y-2 text-white/80">
                      <p>• 3 kV → 3,000 V (× 1,000)</p>
                      <p>• 1.5 MΩ → 1,500,000 Ω (× 1,000,000)</p>
                      <p>• 0.25 A → 250 mA (× 1,000)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-elec-yellow font-medium">
                  <strong>Memory Aid:</strong> When moving the decimal point, remember:
                  <br />• Moving up the table (to larger prefixes) = Move decimal left
                  <br />• Moving down the table (to smaller prefixes) = Move decimal right
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Step-by-Step Examples */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Step-by-Step Conversion Examples
            </h2>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Example 1: 2.5 kW to W</h3>
                  <div className="bg-white/5 p-4 rounded-lg space-y-2">
                    <p><strong>Step 1:</strong> Identify the conversion (kilo to base)</p>
                    <p><strong>Step 2:</strong> Kilo = × 1,000</p>
                    <p><strong>Step 3:</strong> 2.5 × 1,000 = 2,500</p>
                    <p className="text-elec-yellow font-medium"><strong>Answer:</strong> 2,500 W</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Example 2: 750 mA to A</h3>
                  <div className="bg-white/5 p-4 rounded-lg space-y-2">
                    <p><strong>Step 1:</strong> Identify the conversion (milli to base)</p>
                    <p><strong>Step 2:</strong> Milli = ÷ 1,000</p>
                    <p><strong>Step 3:</strong> 750 ÷ 1,000 = 0.75</p>
                    <p className="text-elec-yellow font-medium"><strong>Answer:</strong> 0.75 A</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Example 3: 0.002 A to mA</h3>
                  <div className="bg-white/5 p-4 rounded-lg space-y-2">
                    <p><strong>Step 1:</strong> Identify the conversion (base to milli)</p>
                    <p><strong>Step 2:</strong> To get milli, multiply by 1,000</p>
                    <p><strong>Step 3:</strong> 0.002 × 1,000 = 2</p>
                    <p className="text-elec-yellow font-medium"><strong>Answer:</strong> 2 mA</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Example 4: 4.7 MΩ to kΩ</h3>
                  <div className="bg-white/5 p-4 rounded-lg space-y-2">
                    <p><strong>Step 1:</strong> Identify the conversion (mega to kilo)</p>
                    <p><strong>Step 2:</strong> 1 MΩ = 1,000 kΩ</p>
                    <p><strong>Step 3:</strong> 4.7 × 1,000 = 4,700</p>
                    <p className="text-elec-yellow font-medium"><strong>Answer:</strong> 4,700 kΩ</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-elec-yellow">Common Conversion Mistakes to Avoid</h3>
                <div className="grid md:grid-cols-2 gap-4 text-white text-sm">
                  <div>
                    <p className="font-medium mb-1">Wrong Direction:</p>
                    <p className="text-white/80">• 5 kW ≠ 5,000 mW (should be 5,000,000 mW)</p>
                    <p className="text-white/80">• 100 mA ≠ 100,000 A (should be 0.1 A)</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Symbol Confusion:</p>
                    <p className="text-white/80">• m ≠ M (milli vs mega = factor of 1 billion!)</p>
                    <p className="text-white/80">• µ ≠ m (micro vs milli = factor of 1,000)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Hands-on Unit Converter */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-400/80 text-sm font-normal">06</span>
            Hands-on: Unit Prefix Converter
          </h2>
          <p className="text-white mb-4">
            Practice converting between different electrical units and prefixes using this interactive tool:
          </p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <UnitPrefixConverter />
          </div>
          <p className="text-sm text-white/70 mt-4">
            <strong>Try:</strong> Convert common values like 500mA to A, or 2.5kW to W to build confidence.
          </p>
        </section>

        {/* Section 5: Common Applications & Practical Tips */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-400/80 text-sm font-normal">07</span>
              Common Applications & Practical Tips
            </h2>
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Equipment Labels</h3>
                  <div className="bg-white/5 p-4 rounded-lg space-y-2">
                    <p>• <strong>2.5kW Heater:</strong> 2,500 watts</p>
                    <p>• <strong>32A MCB:</strong> 32 amperes</p>
                    <p>• <strong>500mA RCD:</strong> 0.5 amperes</p>
                    <p>• <strong>13A Fuse:</strong> 13 amperes</p>
                    <p>• <strong>1000V Insulation:</strong> 1 kilovolt</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Test Results</h3>
                  <div className="bg-white/5 p-4 rounded-lg space-y-2">
                    <p>• <strong>Insulation test:</strong> &gt;2MΩ = good</p>
                    <p>• <strong>Continuity test:</strong> &lt;0.05Ω = good</p>
                    <p>• <strong>RCD test:</strong> 28mA = 0.028A</p>
                    <p>• <strong>Loop impedance:</strong> 1.2Ω = acceptable</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-elec-yellow">
                  <strong>Safety Reminder:</strong> Always double-check units when selecting components.
                  Confusing mA with A, or kV with V, can be dangerous and damage equipment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="SI Prefixes and Conversions Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Units of Measurement
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../1-5">
              Next: Multimeters
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section1_4;
