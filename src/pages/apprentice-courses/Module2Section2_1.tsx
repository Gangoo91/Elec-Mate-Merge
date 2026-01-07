import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Calculator, Info, AlertTriangle, Ruler, Gauge, Zap, Activity, Target, CheckCircle, Users, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";

const TITLE = "Ohm's Law made simple (V = I×R) – Level 2 (2.1)";
const DESCRIPTION = "Plain‑English guide to voltage, current and resistance for Level 2 learners with easy examples and checks, aligned to UK practice.";

const Module2Section2_1: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "q1",
      question: "Convert 150 mA to amps before using V = I×R.",
      options: ["0.015 A", "0.15 A", "1.5 A", "150 A"],
      correctIndex: 1,
      explanation: "150 mA = 0.15 A (divide by 1000)."
    },
    {
      id: "q2", 
      question: "You know V and R. Which formula finds I?",
      options: ["I = V/R", "I = R/V", "I = V×R", "I = 1/(V×R)"],
      correctIndex: 0,
      explanation: "Rearranged from V = I×R gives I = V/R."
    }
  ];

  const faqs = [
    { q: "Is resistance always constant?", a: "Not always. Many components change resistance with temperature. Treat V = I×R as a snapshot unless stated otherwise." },
    { q: "Why do cables get warm?", a: "Current causes I²R heating in conductors and terminations. Loose connections make hot spots. Torque to manufacturer values." },
    { q: "Is low voltage always safer?", a: "Lower voltage reduces shock risk, but current and environment still matter. Always follow safe isolation and BS 7671." },
    { q: "Can I mix mA and A in the same calc?", a: "Yes, but convert first. 250 mA = 0.25 A. Prefix mistakes are the most common reason for 1000× errors." },
    { q: "Quick way to sanity‑check?", a: "Use approximate numbers and units: does the result feel right for the kit? If not, check prefixes and rearrangement." },
    { q: "Do I need to memorise the triangle?", a: "It helps, but you can also rearrange V = I×R algebraically. Convert units first either way." },
    { q: "Which BS 7671 areas link to this?", a: "Selection/erection of equipment and protective coordination rely on correct volts, amps and resistance values; see Appendix 4 for factors." },
    { q: "How accurate are theoretical calculations?", a: "Real components vary with temperature and age. Use calculations as a starting point, but always verify with measurements." }
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ohm's Law made simple (V = I×R) – Level 2 (2.1)",
    description:
      "Plain‑English guide to voltage, current and resistance for Level 2 learners with easy examples and checks, aligned to UK practice.",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    { id: 1, question: "You know V and R. What do you calculate to find I?", options: ["I = V × R", "I = V / R", "I = R / V", "I = 1 / (V×R)"], correctAnswer: 1, explanation: "Rearrange V = I×R to I = V/R." },
    { id: 2, question: "A sensor draws 250 mA at 24 V. In amps that is…", options: ["0.025 A", "0.25 A", "2.5 A", "25 A"], correctAnswer: 1, explanation: "250 mA = 0.25 A." },
    { id: 3, question: "At 230 V a device takes 0.5 A. Approximate resistance?", options: ["115 Ω", "460 Ω", "0.5 Ω", "230 Ω"], correctAnswer: 1, explanation: "R = V/I = 230/0.5 = 460 Ω." },
    { id: 4, question: "Which unit pairs correctly with V = I×R?", options: ["V, A, Ω", "V, A, W", "W, A, Ω", "V, kW, Ω"], correctAnswer: 0, explanation: "Volts, Amps and Ohms belong to Ohm's Law." },
    { id: 5, question: "Which is most likely if a plug top feels hot?", options: ["No issue", "Loose connection or high current causing I²R heating", "Low voltage only", "Bad colour of plastic"], correctAnswer: 1, explanation: "Heat suggests poor contact or high current – investigate safely." },
    { id: 6, question: "Which combination lets you find the missing value using Ohm's Law?", options: ["Only one value known", "Any two of V, I, R", "Any one of V, I, P", "Only V and P"], correctAnswer: 1, explanation: "Knowing any two of V, I and R lets you find the third." },
    { id: 7, question: "For V = 24 V and I = 0.2 A, R is…", options: ["12 Ω", "120 Ω", "240 Ω", "2.4 Ω"], correctAnswer: 1, explanation: "R = V/I = 24/0.2 = 120 Ω." },
    { id: 8, question: "Which conversion is correct?", options: ["4.7 kΩ = 470 Ω", "3.3 kΩ = 3300 Ω", "250 mA = 2.5 A", "1.2 A = 120 mA"], correctAnswer: 1, explanation: "kΩ→Ω multiply by 1000; 250 mA = 0.25 A; 1.2 A = 1200 mA." },
    { id: 9, question: "What happens to current if resistance doubles (voltage constant)?", options: ["Current doubles", "Current halves", "Current stays same", "Current becomes zero"], correctAnswer: 1, explanation: "If R doubles and V is constant, then I = V/R means current halves." },
    { id: 10, question: "A 12V circuit has 240Ω resistance. What's the current?", options: ["0.05 A", "0.5 A", "20 A", "2880 A"], correctAnswer: 0, explanation: "I = V/R = 12/240 = 0.05 A (50 mA)." }
  ] as const;

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.2.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Ohm's Law in Plain English
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Understanding V = I×R for practical electrical work
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Ohm's Law:</strong> V = I×R shows voltage, current, resistance relationship.</li>
                <li><strong>Triangle Method:</strong> Cover what you want to find, read the formula.</li>
                <li><strong>Unit Conversions:</strong> Always convert mA→A, kΩ→Ω before calculating.</li>
                <li><strong>Three Formulas:</strong> V=I×R, I=V/R, R=V/I.</li>
                <li><strong>Sanity Check:</strong> Does your answer make electrical sense?</li>
                <li><strong>Foundation:</strong> Basis for power calculations and circuit analysis.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Every circuit calculation, fault finding, cable sizing needs this.</li>
                <li><strong>Use:</strong> Calculating current for MCB sizing, voltage drop checks, component selection.</li>
                <li><strong>Apply:</strong> Circuit design, fault diagnosis, compliance calculations per BS 7671.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Explain the relationship between voltage, current, and resistance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Convert between different electrical units (mA, kΩ, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply Ohm's Law to practical electrical scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use the formula triangle method effectively</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Perform sanity checks on your calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify when measurements don't match theoretical calculations</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Understanding V, I, and R */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Understanding V, I, and R
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-elec-yellow" />
                    <h3 className="font-semibold">Voltage (V)</h3>
                  </div>
                  <p className="text-sm">Electrical pressure or "push". UK mains is nominally 230V. Think of it like water pressure in pipes.</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold">Current (I)</h3>
                  </div>
                  <p className="text-sm">Flow of electrical charge. Measured in amperes (A). Too much causes dangerous heating.</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold">Resistance (R)</h3>
                  </div>
                  <p className="text-sm">Opposition to current flow. Measured in ohms (Ω). Like a narrow pipe restricting water flow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Formula Triangle */}
        <div className="mb-8">
          <div className="border-l-4 border-elec-yellow bg-[#121212]/80 ring-1 ring-white/5 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="bg-elec-yellow text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              The Formula Triangle & Rearrangements
            </h2>
            <div className="space-y-6 text-white">
              <div className="flex items-center justify-center mb-8">
                <div className="relative p-8 bg-card/60 rounded-xl border border-white/10">
                  {/* Triangle grid layout */}
                  <div className="grid grid-cols-3 gap-x-12 gap-y-6 place-items-center">
                    <div></div>
                    <div className="w-20 h-20 rounded-2xl border-2 border-white bg-card/60 text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-center shadow-lg">
                      V
                    </div>
                    <div></div>
                    <div className="w-16 h-16 rounded-2xl border-2 border-white bg-card/60 text-2xl font-bold flex items-center justify-center shadow-lg">
                      I
                    </div>
                    <div></div>
                    <div className="w-16 h-16 rounded-2xl border-2 border-white bg-card/60 text-2xl font-bold flex items-center justify-center shadow-lg">
                      R
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="text-center p-4 bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg">
                  <p className="font-semibold text-elec-yellow mb-2">To find V:</p>
                  <p className="text-white text-lg font-mono">V = I × R</p>
                </div>
                <div className="text-center p-4 bg-elec-yellow/20 border border-border/30 rounded-lg">
                  <p className="font-semibold text-elec-yellow mb-2">To find I:</p>
                  <p className="text-white text-lg font-mono">I = V ÷ R</p>
                </div>
                <div className="text-center p-4 bg-orange-600/20 border border-border/30 rounded-lg">
                  <p className="font-semibold text-elec-yellow mb-2">To find R:</p>
                  <p className="text-white text-lg font-mono">R = V ÷ I</p>
                </div>
              </div>
              <div className="bg-slate-700/50 border border-slate-600 p-4 rounded-lg">
                <p className="text-sm text-white"><strong className="text-white">Memory tip:</strong> Cover what you need to find, and read the remaining formula from the triangle.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Check after Triangle */}
        <div className="mb-8">
          <InlineCheck 
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 3: Unit Conversions */}
        <div className="mb-8">
          <div className="border-l-4 border-green-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Unit Conversions & Prefixes
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold mb-3">Current Conversions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• mA → A: divide by 1000</li>
                    <li>• 250 mA = 0.25 A</li>
                    <li>• 50 mA = 0.05 A</li>
                    <li>• 1500 mA = 1.5 A</li>
                  </ul>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold mb-3">Resistance Conversions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• kΩ → Ω: multiply by 1000</li>
                    <li>• 3.3 kΩ = 3300 Ω</li>
                    <li>• 0.47 kΩ = 470 Ω</li>
                    <li>• 22 kΩ = 22,000 Ω</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm"><strong>Critical Rule:</strong> Always convert to base units (V, A, Ω) before calculating. Prefix mistakes cause 1000× errors!</p>
              </div>
            </div>
          </div>

          {/* Quick Check for Unit Conversions */}
          <div className="mt-6">
            <InlineCheck 
              id={quickCheckQuestions[0].id}
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              correctIndex={quickCheckQuestions[0].correctIndex}
              explanation={quickCheckQuestions[0].explanation}
            />
          </div>
        </div>

        {/* Section 4: Worked Examples */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Worked Examples
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-4">
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-teal-600 mb-2">Example 1: Finding Current</h3>
                  <p className="text-sm mb-2"><strong>Given:</strong> V = 230V, R = 920Ω. Find I.</p>
                  <p className="text-sm mb-2"><strong>Solution:</strong> I = V ÷ R = 230 ÷ 920 = 0.25 A (250 mA)</p>
                  <p className="text-sm text-white"><strong>Check:</strong> V = I × R = 0.25 × 920 = 230V ✓</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-teal-600 mb-2">Example 2: Finding Voltage</h3>
                  <p className="text-sm mb-2"><strong>Given:</strong> I = 0.2A, R = 3.3kΩ. Find V.</p>
                  <p className="text-sm mb-2"><strong>Convert:</strong> 3.3kΩ = 3300Ω</p>
                  <p className="text-sm mb-2"><strong>Solution:</strong> V = I × R = 0.2 × 3300 = 660V</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-teal-600 mb-2">Example 3: Finding Resistance</h3>
                  <p className="text-sm mb-2"><strong>Given:</strong> V = 24V, I = 0.12A. Find R.</p>
                  <p className="text-sm mb-2"><strong>Solution:</strong> R = V ÷ I = 24 ÷ 0.12 = 200Ω</p>
                  <p className="text-sm text-white"><strong>Check:</strong> V = I × R = 0.12 × 200 = 24V ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Common Mistakes */}
        <div className="mb-8">
          <div className="border-l-4 border-red-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Forgetting Unit Conversions</p>
                    <p className="text-sm text-white">Using mA with Ω without converting to A first. This gives answers 1000× wrong!</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Wrong Formula Rearrangement</p>
                    <p className="text-sm text-white">Using I = R ÷ V instead of I = V ÷ R. Always double-check your rearrangement.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">No Sanity Check</p>
                    <p className="text-sm text-white">Getting 2000A for a light bulb and not questioning it. Always check if the answer makes sense.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Real-World Applications */}
        <div className="mb-8">
          <div className="border-l-4 border-orange-500 dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
              Real-World Applications
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-4">
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-orange-600 mb-2">Checking Appliance Current Draw</h3>
                  <p className="text-sm">A 230V heater rated at 2.3kW should draw I = P÷V = 2300÷230 = 10A. If you measure significantly different, check connections and appliance condition.</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-orange-600 mb-2">LED Circuit Design</h3>
                  <p className="text-sm">For a 12V LED requiring 20mA, you need R = V÷I = 12÷0.02 = 600Ω limiting resistor (nearest standard value).</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-orange-600 mb-2">Cable Voltage Drop Check</h3>
                  <p className="text-sm">With 20A through 50m of 2.5mm² cable (resistance ≈ 0.36Ω), voltage drop = 20 × 0.36 = 7.2V. Check against BS 7671 limits.</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-orange-600 mb-2">Testing Component Values</h3>
                  <p className="text-sm">Apply known voltage, measure current, calculate resistance: R = V÷I. Compare with manufacturer's rating to check component condition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Sanity Checks */}
        <div className="mb-8">
          <div className="border-l-4 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="bg-indigo-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">7</span>
              Sanity Checks That Work On Site
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-3">
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-indigo-600 mb-2">Order of Magnitude Check</h3>
                  <p className="text-sm">Estimate using easy numbers: 24V ÷ 120Ω ≈ 0.2A. If your calculation gives 20A or 0.002A, check for errors.</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-indigo-600 mb-2">Reverse Calculation</h3>
                  <p className="text-sm">If you found I = 0.25A, check: V = I × R should give back your original voltage. No match? Check your working.</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-indigo-600 mb-2">Compare with Reality</h3>
                  <p className="text-sm">Check against nameplates, datasheets, and typical values. A domestic light bulb won't draw 50A!</p>
                </div>
                <div className="bg-white/50 dark:bg-card/50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-indigo-600 mb-2">Temperature Effects</h3>
                  <p className="text-sm">Remember that resistance changes with temperature. Filament bulbs have 10× higher resistance when hot than cold.</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Pocket Guide */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Pocket Guide
          </h2>
          <UnitsPocketCard />
        </div>

        {/* FAQ Section */}
        <Card className="mb-8 p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-200 dark:border-blue-800 bg-elec-yellow/5/50 dark:bg-elec-yellow/10 p-4 rounded-r-lg">
                <p className="font-medium text-white mb-2">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-green-50 to-elec-yellow/5 dark:from-green-950/20 dark:to-elec-yellow/10 border-green-200 dark:border-green-800">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Key Takeaways
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Ohm's Law (V = I×R) is fundamental to all electrical calculations
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Always convert units first: mA→A, kΩ→Ω before calculating
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Use the triangle method for easy rearrangement
              </li>
            </ul>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Always perform sanity checks on your results
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Real components vary with temperature and condition
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Practice makes perfect - use it daily on site
              </li>
            </ul>
          </div>
          <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-elec-yellow text-elec-yellow mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-white">
                <strong>Safety Reminder:</strong> Always isolate and prove dead before work. Follow BS 7671 and manufacturer instructions.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="mb-8 p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Test Your Knowledge
          </h2>
          <Quiz questions={quizQuestions as any} title="Ohm's Law Mastery Quiz" />
        </Card>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-intro">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-2">
              Next: Triangle Method
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

        {/* Structured Data */}
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(articleJsonLd) 
          }} 
        />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(faqJsonLd) 
          }} 
        />
      </div>
    </div>
  );
};

export default Module2Section2_1;
