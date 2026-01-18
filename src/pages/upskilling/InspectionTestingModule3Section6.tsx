import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interpreting Continuity Results - Module 3 Section 6";
const DESCRIPTION = "Learn to interpret continuity test results, calculate expected values, and identify faults from test data.";

const quickCheckQuestions = [
  {
    id: "conductor-resistance",
    question: "What is the resistance per metre of 1.5mm² copper conductor?",
    options: ["7.41 mΩ/m", "12.10 mΩ/m", "18.10 mΩ/m", "4.61 mΩ/m"],
    correctIndex: 1,
    explanation: "From BS 7671 Table 5B, 1.5mm² copper has a resistance of 12.10 mΩ/m at 20 degrees C."
  },
  {
    id: "temp-correction",
    question: "The temperature correction multiplier for maximum operating temperature is:",
    options: ["1.0", "1.1", "1.2", "1.5"],
    correctIndex: 2,
    explanation: "1.2 multiplier accounts for conductor resistance increase at maximum operating temperature (typically 70 degrees C) compared to 20 degrees C test conditions."
  },
  {
    id: "high-r1r2",
    question: "If R1+R2 is significantly higher than calculated, you should:",
    options: [
      "Accept the result - it's safe",
      "Investigate connections and conductor integrity",
      "Reduce the test current",
      "Apply a larger multiplier"
    ],
    correctIndex: 1,
    explanation: "Higher than expected R1+R2 may indicate safety issues like poor connections or damaged conductors. Always investigate the cause."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The resistance per metre of 2.5mm² copper at 20 degrees C is approximately:",
    options: ["4.61 mΩ/m", "7.41 mΩ/m", "12.10 mΩ/m", "18.10 mΩ/m"],
    correctAnswer: 1,
    explanation: "From BS 7671 Table 5B, 2.5mm² copper has a resistance of approximately 7.41 mΩ/m at 20 degrees C."
  },
  {
    id: 2,
    question: "To calculate expected R1+R2 for a radial circuit, you need:",
    options: [
      "Only the phase conductor resistance",
      "Only the CPC resistance",
      "Phase conductor + CPC resistance multiplied by circuit length",
      "Phase conductor multiplied by CPC resistance"
    ],
    correctAnswer: 2,
    explanation: "R1+R2 = (resistance/m of line + resistance/m of CPC) x one-way circuit length."
  },
  {
    id: 3,
    question: "A measured R1+R2 significantly higher than calculated suggests:",
    options: [
      "Good quality installation",
      "Smaller conductor than specified",
      "Shorter cable run",
      "Low-resistance connections"
    ],
    correctAnswer: 1,
    explanation: "Higher resistance than expected often indicates smaller conductor CSA, poor connections, or longer cable run than assumed."
  },
  {
    id: 4,
    question: "The temperature correction multiplier for Zs at maximum operating temperature is:",
    options: ["1.0", "1.1", "1.2", "1.5"],
    correctAnswer: 2,
    explanation: "A multiplier of 1.2 is applied to account for conductor resistance increase at maximum operating temperature (typically 70 degrees C for thermoplastic)."
  },
  {
    id: 5,
    question: "For Zs verification, the formula is:",
    options: ["Zs = Ze - R1+R2", "Zs = Ze + (R1+R2)", "Zs = Ze x R1+R2", "Zs = Ze / R1+R2"],
    correctAnswer: 1,
    explanation: "Total earth fault loop impedance (Zs) = External impedance (Ze) + Circuit impedance (R1+R2)."
  },
  {
    id: 6,
    question: "1.5mm² copper conductor has approximately what resistance per metre?",
    options: ["7.41 mΩ/m", "12.10 mΩ/m", "18.10 mΩ/m", "30.20 mΩ/m"],
    correctAnswer: 1,
    explanation: "From BS 7671 Table 5B, 1.5mm² copper has a resistance of approximately 12.10 mΩ/m at 20 degrees C."
  },
  {
    id: 7,
    question: "An acceptable variation between measured and calculated R1+R2 is typically:",
    options: ["plus/minus 1-2%", "plus/minus 5%", "plus/minus 10-15%", "plus/minus 25%"],
    correctAnswer: 2,
    explanation: "Variations of plus/minus 10-15% are generally acceptable, accounting for actual vs nominal CSA, connection resistances, and measurement tolerances."
  },
  {
    id: 8,
    question: "In a correctly wired ring circuit, measurements at each socket should show:",
    options: [
      "Increasing values around the ring",
      "Decreasing values around the ring",
      "Approximately equal values",
      "Random values"
    ],
    correctAnswer: 2,
    explanation: "A healthy ring shows approximately equal r1+r2 values at each socket position, following the r1/4 + r2/4 pattern."
  },
  {
    id: 9,
    question: "Why multiply R1+R2 by 1.2 for Zs verification?",
    options: [
      "To add a safety margin",
      "To account for conductor temperature rise",
      "To include connection resistance",
      "To compensate for meter accuracy"
    ],
    correctAnswer: 1,
    explanation: "The 1.2 multiplier accounts for conductor resistance increase when operating at maximum temperature compared to test conditions at ambient temperature."
  },
  {
    id: 10,
    question: "If R1+R2 measures lower than calculated, this could indicate:",
    options: [
      "Larger conductor installed than specified",
      "Poor connections",
      "Damaged conductor",
      "Longer cable route"
    ],
    correctAnswer: 0,
    explanation: "Lower than expected resistance suggests the actual conductor CSA is larger than assumed in calculations, which is acceptable."
  }
];

const faqs = [
  {
    question: "How do I calculate expected R1+R2?",
    answer: "Use BS 7671 Table 5B/5C for conductor resistance (mΩ/m). Multiply by circuit length. Add R1 (line) + R2 (CPC) values together. For example: 20m circuit with 2.5/1.5mm² = (7.41x20) + (12.10x20) = 390.2mΩ = 0.39Ω."
  },
  {
    question: "What if measured values exceed calculated values?",
    answer: "Investigate: (1) Poor connections at terminals, (2) Damaged conductor reducing CSA, (3) Incorrect conductor size actually installed, (4) Longer cable route than assumed, (5) High resistance joint or accessory. Re-test after checking."
  },
  {
    question: "Why apply temperature correction?",
    answer: "Tables give resistance at 20 degrees C. Copper resistance increases ~0.4% per degree C above this. At 30 degrees C, multiply by 1.04. At 10 degrees C, multiply by 0.96. This matters for accurate fault loop impedance verification."
  },
  {
    question: "How do I use R1+R2 for Zs verification?",
    answer: "Zs = Ze + (R1+R2). Measure Ze at origin. Add measured R1+R2 for the circuit. The sum must not exceed maximum Zs values from BS 7671 Chapter 41. Apply temperature correction factor (multiply R1+R2 by 1.2 for max operating temp)."
  },
  {
    question: "What's an acceptable tolerance on calculated values?",
    answer: "Measured values should be within plus/minus 10-15% of calculated. Minor differences are normal due to: actual vs nominal CSA, connection resistances, temperature variations. Significant deviations warrant investigation."
  },
  {
    question: "How do ring circuit results differ?",
    answer: "Ring circuits should show approximately equal resistance at each socket (r1/4 + r2/4 pattern). Significant variation between sockets indicates broken ring, crossed connections, or interconnections."
  }
];

const InspectionTestingModule3Section6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/inspection-testing-module-3">
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
            <Zap className="h-4 w-4" />
            <span>Module 3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interpreting Continuity Results
          </h1>
          <p className="text-white/80">
            Learn to analyse test results, calculate expected values, and identify faults from continuity data
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Compare:</strong> Measured vs calculated R1+R2</li>
              <li><strong>Tolerance:</strong> plus/minus 10-15% acceptable</li>
              <li><strong>Zs Formula:</strong> Zs = Ze + (R1+R2 x 1.2)</li>
              <li><strong>High Reading:</strong> Investigate connections</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Values outside expected range</li>
              <li><strong>Use:</strong> Table 5B resistance values</li>
              <li><strong>Apply:</strong> Temperature correction x1.2</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate expected R1+R2 using conductor resistance tables",
              "Compare measured results against expected values",
              "Identify faults from abnormal readings",
              "Apply temperature correction factors",
              "Document findings and record results",
              "Use R1+R2 values for Zs calculations"
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

        {/* Section 1: Conductor Resistance Tables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Conductor Resistance Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 5B provides resistance values for copper conductors at 20 degrees C:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60">CSA (mm²)</th>
                    <th className="text-right py-2 text-elec-yellow">mΩ/m</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 font-mono">
                  <tr className="border-b border-white/5">
                    <td className="py-2">1.0</td>
                    <td className="text-right text-elec-yellow">18.10</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">1.5</td>
                    <td className="text-right text-elec-yellow">12.10</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">2.5</td>
                    <td className="text-right text-elec-yellow">7.41</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">4.0</td>
                    <td className="text-right text-elec-yellow">4.61</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2">6.0</td>
                    <td className="text-right text-elec-yellow">3.08</td>
                  </tr>
                  <tr>
                    <td className="py-2">10.0</td>
                    <td className="text-right text-elec-yellow">1.83</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Calculating Expected R1+R2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calculating Expected R1+R2
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formula</p>
              <p className="text-center font-mono text-elec-yellow text-xl">R1+R2 = (mΩ/m<sub>line</sub> + mΩ/m<sub>CPC</sub>) x Length</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Example Calculation</p>
              <p className="text-sm text-white/70 mb-2">
                20m circuit using 2.5mm² line and 1.5mm² CPC:
              </p>
              <div className="font-mono text-white/80 text-sm space-y-1">
                <p>R1 = 7.41 x 20 = 148.2 mΩ</p>
                <p>R2 = 12.10 x 20 = 242.0 mΩ</p>
                <p className="text-elec-yellow font-semibold">R1+R2 = 390.2 mΩ = 0.39Ω</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Comparing Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Comparing Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When measured R1+R2 differs from calculated values:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-green-400 font-semibold mb-1">Lower than expected</p>
                <p className="text-white/70 text-sm">Usually acceptable - may indicate larger CSA conductor installed or shorter route than estimated.</p>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-semibold mb-1">Within plus/minus 10-15%</p>
                <p className="text-white/70 text-sm">Normal variation due to actual vs nominal CSA, connections, and temperature.</p>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-semibold mb-1">Higher than expected</p>
                <p className="text-white/70 text-sm">Investigate! Could indicate poor connections, smaller CSA, longer route, or damaged conductor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Temperature Correction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Temperature Correction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Conductor resistance changes with temperature. Copper increases ~0.4% per degree C.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Correction Factors:</p>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <span className="text-white/60">At 10 degrees C:</span>
                <span className="text-white/80">x 0.96</span>
                <span className="text-white/60">At 20 degrees C:</span>
                <span className="text-white/80">x 1.00 (reference)</span>
                <span className="text-white/60">At 30 degrees C:</span>
                <span className="text-white/80">x 1.04</span>
                <span className="text-white/60">At 70 degrees C (max):</span>
                <span className="text-elec-yellow font-semibold">x 1.20</span>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10">
              <p className="text-sm font-medium text-amber-400 mb-2">Important</p>
              <p className="text-sm text-white">
                For Zs verification, multiply R1+R2 by 1.2 to account for maximum operating temperature.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Using R1+R2 for Zs Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Using R1+R2 for Zs Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 text-center">
              <p className="text-2xl font-mono text-elec-yellow mb-2">Zs = Ze + (R1+R2 x 1.2)</p>
              <p className="text-white/60 text-sm">Temperature-corrected fault loop impedance</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Example</p>
              <div className="text-sm text-white/70 font-mono space-y-1">
                <p>Ze = 0.35Ω (measured at origin)</p>
                <p>R1+R2 = 0.39Ω (measured on circuit)</p>
                <p className="text-elec-yellow font-semibold">Zs = 0.35 + (0.39 x 1.2) = 0.35 + 0.47 = 0.82Ω</p>
              </div>
              <p className="text-white/60 text-sm mt-2">
                Compare this calculated Zs against maximum values from BS 7671 Chapter 41.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Common Fault Patterns */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Fault Patterns
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Very High R1+R2</p>
                <p className="text-white/70 text-sm">Poor connection, loose terminal, corroded joint, or damaged conductor. Check all terminations.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Inconsistent Readings</p>
                <p className="text-white/70 text-sm">Intermittent connection. Likely loose terminal or broken conductor strand making variable contact.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">Ring Circuit Variation</p>
                <p className="text-white/70 text-sm">Readings vary significantly around ring. Check for broken ring, crossed connections, or interconnections.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">OL / Open Circuit</p>
                <p className="text-white/70 text-sm">No continuity. Broken conductor, disconnected terminal, or testing wrong circuit.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Top Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Document Your Calculations:</strong> Record both expected and measured values. This demonstrates competence and helps identify patterns</li>
                <li><strong>Check Cable Routes:</strong> Actual cable routes may be longer than direct distances. Add 10-15% for typical building layouts</li>
                <li><strong>Re-test After Remedial Work:</strong> If you tighten connections or make repairs, always re-test to verify the improvement</li>
                <li>Take multiple readings for consistency</li>
                <li>Consider ambient temperature when comparing to tables</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring temperature:</strong> Not applying correction for Zs verification</li>
                <li><strong>Wrong cable length:</strong> Using direct distance instead of actual route</li>
                <li><strong>Forgetting connections:</strong> Not accounting for joint resistances</li>
                <li><strong>Wrong CSA:</strong> Assuming cable size without verification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671 Table 5B:</strong> Conductor resistance at 20 degrees C</li>
                <li><strong>Chapter 41:</strong> Maximum Zs values for devices</li>
                <li><strong>Regulation 612.2:</strong> Continuity testing requirements</li>
                <li><strong>GN3:</strong> Detailed testing guidance</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Continuity Results Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Common Conductor Values</p>
                <ul className="space-y-0.5">
                  <li>1.5mm² Cu: 12.10 mΩ/m</li>
                  <li>2.5mm² Cu: 7.41 mΩ/m</li>
                  <li>4.0mm² Cu: 4.61 mΩ/m</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Verification</p>
                <ul className="space-y-0.5">
                  <li>Temp Correction: x1.2</li>
                  <li>Zs = Ze + (R1+R2 x 1.2)</li>
                  <li>Tolerance: plus/minus 10-15%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Module Complete */}
        <section className="mb-10">
          <div className="p-6 rounded-lg bg-green-500/10 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Module 3 Complete!</h3>
            <p className="text-white/70 mb-4">
              You've completed all sections on Continuity Testing. Ready for Insulation Resistance Testing?
            </p>
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
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../../module-4">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule3Section6;
