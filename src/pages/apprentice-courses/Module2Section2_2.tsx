import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Calculator, AlertTriangle, Target, Activity, Gauge, CheckCircle, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";

const TITLE = "Triangle method for Ohm's Law – Level 2 (2.2)";
const DESCRIPTION = "Use the V‑I‑R triangle to pick the right formula quickly. Level 2 friendly with unit tips and checks.";

const Module2Section2_2: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: "q1",
      question: "Convert 150 mA to amps before using the triangle method.",
      options: ["0.015 A", "0.15 A", "1.5 A", "150 A"],
      correctIndex: 1,
      explanation: "150 mA = 0.15 A (divide by 1000)."
    },
    {
      id: "q2",
      question: "You cover V in the triangle. What formula do you see?",
      options: ["I = V/R", "V = I×R", "R = V/I", "V = R/I"],
      correctIndex: 1,
      explanation: "When you cover V, you see I and R side by side, giving V = I×R."
    },
    {
      id: "q3",
      question: "Best first step before using triangle method?",
      options: ["Skip units", "Convert prefixes and write values", "Round heavily upfront", "Guess"],
      correctIndex: 1,
      explanation: "Convert and write values clearly first."
    },
    {
      id: "q4",
      question: "You cover I in the triangle. What do you see?",
      options: ["V × R", "V ÷ R", "R ÷ V", "V + R"],
      correctIndex: 1,
      explanation: "Cover I and you see V above R, indicating division: I = V ÷ R."
    },
    {
      id: "q5",
      question: "What's wrong with this calculation: V = 2.2 kΩ × 5 mA = 11 V?",
      options: ["Nothing - it's correct", "Should convert units first", "Used wrong formula", "Decimal error"],
      correctIndex: 1,
      explanation: "Must convert: 2.2 kΩ = 2200 Ω, 5 mA = 0.005 A. Correct: V = 2200 × 0.005 = 11 V."
    },
    {
      id: "q6",
      question: "Calculator shows 12E3 Ω; this means…",
      options: ["12 Ω", "120 Ω", "12 kΩ", "12 MΩ"],
      correctIndex: 2,
      explanation: "E3 is ×1000 → kilo."
    }
  ];

  const faqs = [
    { q: "Do I need to memorise triangles?", a: "They are a handy memory aid. You can also rearrange algebraically; choose the method you prefer." },
    { q: "What about power triangles?", a: "You can draw triangles for P, V and I too. Remember: P = V×I for DC and resistive AC." },
    { q: "Can I use triangles with AC?", a: "Yes for resistive calculations at Level 2. Power factor and reactance are covered later in the course." },
    { q: "My answer is 1000× wrong—why?", a: "Usually a prefix error (kΩ vs Ω, mA vs A). Convert before using the triangle." },
    { q: "Is the triangle method always accurate?", a: "The triangle is just a memory aid. The physics (Ohm's Law) is always valid for linear resistors." },
    { q: "Can I use this for three-phase calculations?", a: "Yes, but use line-to-neutral values and consider balanced loads. Three-phase theory comes later." },
    { q: "Why does my multimeter reading differ from calculations?", a: "Real components have tolerance, temperature effects, and ageing. Use calculations as a guide." },
    { q: "Which BS 7671 areas use this?", a: "Cable sizing, protective device selection, voltage drop calculations - basically everything electrical." }
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Triangle method for Ohm's Law – Level 2 (2.2)",
    description:
      "Use the V‑I‑R triangle to pick the right formula quickly. Level 2 friendly with unit tips and checks.",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    { id: 1, question: "Find R when V=24 V and I=2 A.", options: ["12 Ω", "48 Ω", "0.083 Ω", "22 Ω"], correctAnswer: 0, explanation: "R = V/I = 24/2 = 12 Ω." },
    { id: 2, question: "Find I when V=12 V and R=4 Ω.", options: ["3 A", "48 A", "0.33 A", "16 A"], correctAnswer: 0, explanation: "I = V/R = 12/4 = 3 A." },
    { id: 3, question: "V= ? for I=0.2 A and R=3.3 kΩ.", options: ["0.66 V", "66 V", "660 V", "6.6 V"], correctAnswer: 2, explanation: "3.3 kΩ = 3300 Ω, V = 0.2×3300 = 660 V." },
    { id: 4, question: "Which is correct for finding V using the triangle?", options: ["V = I×R", "V = R/I", "V = I/R", "V = 1/(I×R)"], correctAnswer: 0, explanation: "Cover V → I×R remains." },
    { id: 5, question: "Best first step before using triangle?", options: ["Skip units", "Convert prefixes and write values", "Round heavily upfront", "Guess"], correctAnswer: 1, explanation: "Convert and write values clearly first." },
    { id: 6, question: "Calculator shows 12E3 Ω; this means…", options: ["12 Ω", "120 Ω", "12 kΩ", "12 MΩ"], correctAnswer: 2, explanation: "E3 is ×1000 → kilo." },
    { id: 7, question: "Convert 150 mA to Amps:", options: ["1.5 A", "0.15 A", "15 A", "0.015 A"], correctAnswer: 1, explanation: "150 mA = 150/1000 = 0.15 A." },
    { id: 8, question: "Find V when I=500 mA and R=220 Ω:", options: ["110 V", "11 V", "1.1 V", "0.44 V"], correctAnswer: 0, explanation: "First convert: 500 mA = 0.5 A. Then V = I×R = 0.5×220 = 110 V." },
    { id: 9, question: "What's wrong with this calculation: V = 2.2 kΩ × 5 mA = 11 V?", options: ["Nothing - it's correct", "Should convert units first", "Used wrong formula", "Decimal error"], correctAnswer: 1, explanation: "Must convert: 2.2 kΩ = 2200 Ω, 5 mA = 0.005 A. Correct: V = 2200 × 0.005 = 11 V." },
    { id: 10, question: "In the triangle, if you cover I, what operation do you see?", options: ["V × R", "V ÷ R", "R ÷ V", "V + R"], correctAnswer: 1, explanation: "Cover I and you see V above R, indicating division: I = V ÷ R." }
  ] as const;

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Centered Header */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2.2.2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Triangle Method for Ohm's Law
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Cover what you want to find, read the formula that remains
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Triangle Method:</strong> Visual aid to remember Ohm's Law rearrangements.</li>
                <li><strong>Cover & Read:</strong> Cover what you want to find, read what remains.</li>
                <li><strong>Always Convert:</strong> Change mA→A, kΩ→Ω before using the triangle.</li>
                <li><strong>Three Outcomes:</strong> V=I×R, I=V/R, R=V/I.</li>
                <li><strong>Sanity Check:</strong> Does your answer make sense for the circuit?</li>
                <li><strong>Practice:</strong> Essential skill for all electrical calculations.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Any time you need V, I, or R from the other two values.</li>
                <li><strong>Use:</strong> Circuit analysis, fault finding, component sizing calculations.</li>
                <li><strong>Apply:</strong> MCB sizing, cable calculations, voltage drop checks per BS 7671.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Use the triangle method to find any unknown value in Ohm's Law</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Convert units correctly before applying the triangle method</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply the cover-and-read technique confidently</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Perform quick sanity checks on calculated results</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify and avoid common calculation mistakes</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Choose between triangle method and algebraic rearrangement</span>
            </li>
          </ul>
        </section>

        {/* Section: Why the Triangle Method */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why Use the Triangle Method?
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold">Visual Memory Aid</h3>
                </div>
                <p className="text-sm">Easier to remember than three separate formulas. One triangle, all combinations.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Quick Reference</h3>
                </div>
                <p className="text-sm">No need to think which formula. Cover what you want, read what remains.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Mistake Prevention</h3>
                </div>
                <p className="text-sm">Reduces wrong formula errors. Same method every time builds confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: The Triangle Explained */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            The Triangle & How to Use It
          </h2>
          <div className="space-y-6 text-white">
            <div className="flex items-center justify-center mb-8">
              {/* SVG Triangle */}
              <svg width="300" height="240" viewBox="0 0 300 240" className="mx-auto" role="img" aria-label="Ohm's Law Triangle showing V at top, I and R at bottom">
                <title>Ohm's Law Triangle</title>

                {/* Triangle outline */}
                <path
                  d="M150 30 L60 190 L240 190 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Horizontal dividing line */}
                <line
                  x1="105"
                  y1="140"
                  x2="195"
                  y2="140"
                  stroke="white"
                  strokeWidth="2"
                />

                {/* V label - positioned lower */}
                <text x="150" y="120" textAnchor="middle" className="fill-white text-5xl font-bold font-sans">V</text>

                {/* I label */}
                <text x="105" y="175" textAnchor="middle" className="fill-white text-4xl font-bold font-sans">I</text>

                {/* R label */}
                <text x="195" y="175" textAnchor="middle" className="fill-white text-4xl font-bold font-sans">R</text>
              </svg>
            </div>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="text-center p-4 bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg">
                <p className="font-semibold text-elec-yellow mb-2">Cover V, see:</p>
                <p className="text-white text-lg font-mono">V = I × R</p>
              </div>
              <div className="text-center p-4 bg-elec-yellow/20 border border-white/10 rounded-lg">
                <p className="font-semibold text-elec-yellow mb-2">Cover I, see:</p>
                <p className="text-white text-lg font-mono">I = V ÷ R</p>
              </div>
              <div className="text-center p-4 bg-orange-600/20 border border-white/10 rounded-lg">
                <p className="font-semibold text-elec-yellow mb-2">Cover R, see:</p>
                <p className="text-white text-lg font-mono">R = V ÷ I</p>
              </div>
            </div>
            <div className="bg-slate-700/50 border border-slate-600 p-4 rounded-lg">
              <p className="text-sm text-white"><strong>Memory tip:</strong> V always goes at the top. I and R share the bottom. Cover what you need to find!</p>
            </div>
          </div>
        </section>

        {/* Quick Check after Triangle */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section: Unit Conversions */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Critical Step: Unit Conversions
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-3">Current Conversions</h3>
                <ul className="space-y-2 text-sm">
                  <li>• mA → A: divide by 1000</li>
                  <li>• 250 mA = 0.25 A</li>
                  <li>• 50 mA = 0.05 A</li>
                  <li>• 1500 mA = 1.5 A</li>
                </ul>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold mb-3">Resistance Conversions</h3>
                <ul className="space-y-2 text-sm">
                  <li>• kΩ → Ω: multiply by 1000</li>
                  <li>• 3.3 kΩ = 3300 Ω</li>
                  <li>• 0.47 kΩ = 470 Ω</li>
                  <li>• 22 kΩ = 22,000 Ω</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-950/30 p-4 rounded-lg border border-yellow-800">
              <p className="text-sm"><strong>Critical Rule:</strong> Triangle method only works with base units (V, A, Ω). Convert first, calculate second!</p>
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
        </section>

        {/* Section: Worked Examples */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Step-by-Step Examples
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid gap-4">
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-teal-400 mb-2">Example 1: Finding Voltage</h3>
                <p className="text-sm mb-2"><strong>Given:</strong> I = 0.5A, R = 220Ω. Find V.</p>
                <p className="text-sm mb-2"><strong>Method:</strong> Cover V in triangle → see I×R</p>
                <p className="text-sm mb-2"><strong>Solution:</strong> V = I × R = 0.5 × 220 = 110V</p>
                <p className="text-sm text-white"><strong>Check:</strong> 110V with 0.5A sounds reasonable for a heater.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-teal-400 mb-2">Example 2: Finding Current (with conversion)</h3>
                <p className="text-sm mb-2"><strong>Given:</strong> V = 24V, R = 4.7kΩ. Find I.</p>
                <p className="text-sm mb-2"><strong>Convert:</strong> 4.7kΩ = 4700Ω</p>
                <p className="text-sm mb-2"><strong>Method:</strong> Cover I in triangle → see V÷R</p>
                <p className="text-sm mb-2"><strong>Solution:</strong> I = V ÷ R = 24 ÷ 4700 = 0.0051A (5.1mA)</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-teal-400 mb-2">Example 3: Finding Resistance</h3>
                <p className="text-sm mb-2"><strong>Given:</strong> V = 230V, I = 10A. Find R.</p>
                <p className="text-sm mb-2"><strong>Method:</strong> Cover R in triangle → see V÷I</p>
                <p className="text-sm mb-2"><strong>Solution:</strong> R = V ÷ I = 230 ÷ 10 = 23Ω</p>
                <p className="text-sm text-white"><strong>Check:</strong> 10A at 230V suggests 2.3kW heater - makes sense!</p>
              </div>
            </div>
          </div>

          {/* Quick Check for Examples */}
          <div className="mt-6">
            <InlineCheck
              id={quickCheckQuestions[2].id}
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              correctIndex={quickCheckQuestions[2].correctIndex}
              explanation={quickCheckQuestions[2].explanation}
            />
          </div>
        </section>

        {/* Section: Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Common Triangle Method Mistakes
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-3 bg-red-950/30 rounded border border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Using Wrong Units in Triangle</p>
                  <p className="text-sm text-white">Putting mA and kΩ directly into triangle without converting. Always use V, A, Ω only!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-950/30 rounded border border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Misreading the Triangle Layout</p>
                  <p className="text-sm text-white">Putting I or R at the top instead of V. V always goes at the top of the triangle.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-950/30 rounded border border-red-800">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">No Reality Check</p>
                  <p className="text-sm text-white">Getting 2000A for a light bulb and not questioning it. Always sense-check your answer!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check for Mistakes */}
          <div className="mt-6">
            <InlineCheck
              id={quickCheckQuestions[3].id}
              question={quickCheckQuestions[3].question}
              options={quickCheckQuestions[3].options}
              correctIndex={quickCheckQuestions[3].correctIndex}
              explanation={quickCheckQuestions[3].explanation}
            />
          </div>
        </section>

        {/* Section: Real-World Applications */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Triangle Method on Site
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid gap-4">
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-orange-400 mb-2">Quick Current Calculations</h3>
                <p className="text-sm">Need to size an MCB? Measure voltage, calculate resistance from nameplate power, use triangle to find current.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-orange-400 mb-2">Fault Finding with Resistance</h3>
                <p className="text-sm">Measure voltage and current, use triangle to find resistance. Compare with expected values to find faults.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-orange-400 mb-2">LED Circuit Design</h3>
                <p className="text-sm">Know supply voltage and LED current rating? Triangle gives you the resistor value needed.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-orange-400 mb-2">Testing Components</h3>
                <p className="text-sm">Apply known voltage, measure current, triangle gives actual resistance. Compare with rated value.</p>
              </div>
            </div>
          </div>

          {/* Quick Check for Applications */}
          <div className="mt-6">
            <InlineCheck
              id={quickCheckQuestions[4].id}
              question={quickCheckQuestions[4].question}
              options={quickCheckQuestions[4].options}
              correctIndex={quickCheckQuestions[4].correctIndex}
              explanation={quickCheckQuestions[4].explanation}
            />
          </div>
        </section>

        {/* Section: Sanity Checks */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Reality Checks for Triangle Results
          </h2>
          <div className="space-y-4 text-white">
            <div className="grid gap-3">
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-indigo-400 mb-2">Order of Magnitude Check</h3>
                <p className="text-sm">Rough mental maths first: 240V ÷ 24Ω ≈ 10A. If triangle gives 100A or 0.1A, check your working.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-indigo-400 mb-2">Reverse Check</h3>
                <p className="text-sm">Found I = 5A? Put it back: V = I × R should give your original voltage. No match = error somewhere.</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-indigo-400 mb-2">Compare with Typical Values</h3>
                <p className="text-sm">House lights: few amps. Kettles: 10-13A. Industrial motors: tens to hundreds. Does your answer fit?</p>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-indigo-400 mb-2">Unit Sense Check</h3>
                <p className="text-sm">A 12V car circuit won't have thousands of ohms resistance. A control circuit won't draw hundreds of amps.</p>
              </div>
            </div>
          </div>

          {/* Quick Check for Sanity Checks */}
          <div className="mt-6">
            <InlineCheck
              id={quickCheckQuestions[5].id}
              question={quickCheckQuestions[5].question}
              options={quickCheckQuestions[5].options}
              correctIndex={quickCheckQuestions[5].correctIndex}
              explanation={quickCheckQuestions[5].explanation}
            />
          </div>
        </section>

        {/* Pocket Guide */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Pocket Guide
          </h2>
          <UnitsPocketCard />
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-blue-800 bg-elec-yellow/10 p-4 rounded-r-lg">
                <p className="font-medium text-white mb-2">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Key Takeaways
          </h2>
          <div className="bg-gradient-to-r from-green-950/20 to-elec-yellow/10 border border-green-800 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Triangle method is a memory aid for Ohm's Law rearrangements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Always convert to base units (V, A, Ω) before applying triangle
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Cover what you want to find, read what remains
                </li>
              </ul>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Always perform reality checks on your calculated results
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  V always goes at the top; I and R share the bottom
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Practice makes perfect - use daily for confidence building
                </li>
              </ul>
            </div>
            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white">
                  <strong>Safety Reminder:</strong> Always isolate and prove dead before work. Follow BS 7671 and manufacturer instructions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Test Your Knowledge
          </h2>
          <Quiz questions={quizQuestions as any} title="Triangle Method Mastery Quiz" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ohm's Law Basics
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-3">
              Next: Step by Step Calculations
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

export default Module2Section2_2;
