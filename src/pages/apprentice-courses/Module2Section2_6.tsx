import useSEO from "@/hooks/useSEO";
import { ArrowLeft, AlertTriangle, Shield, BadgeAlert, ListChecks, Calculator, CheckCircle, Users, BookOpen, HelpCircle, Target, Activity, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";

const TITLE = "Common mistakes and how to avoid them – Level 2 (2.6)";
const DESCRIPTION = "Avoid unit traps, rearrangement errors and rounding issues. Level 2 checklist with real fixes, aligned to UK practice.";

const Module2Section2_6: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    { q: "How many decimals should I show?", a: "Match instrument precision and the need for clarity. Two dp is a good default for notes." },
    { q: "Do I always convert first?", a: "Yes. Convert to base units before calculating; convert back for the answer if needed." },
    { q: "What if measurement disagrees with theory?", a: "Re‑check setup, temperature and connections. Allow for tolerances; then look for faults." },
    { q: "How do I sanity‑check fast?", a: "Approximate with rounded numbers. If the order of magnitude feels wrong, re‑check prefixes and steps." },
    { q: "When to ask for help?", a: "If results affect safety or you're unsure. A second opinion prevents costly mistakes." },
    { q: "What does E notation (e.g. 1.2E3) mean?", a: "It means ×10^3. 1.2E3 Ω = 1200 Ω (1.2 kΩ). Check your calculator mode and units." },
    { q: "Which BS 7671 parts are relevant here?", a: "Selection/erection of equipment, coordination of protective devices, and Appendix 4 correction factors. Always consult the latest edition." },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Common mistakes and how to avoid them – Level 2 (2.6)",
    description:
      "Avoid unit traps, rearrangement errors and rounding issues. Level 2 checklist with real fixes, aligned to UK practice.",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quickCheckQuestions = [
    {
      id: "q1",
      question: "Which is the top cause of 1000× errors?",
      options: ["Cable colour", "Prefix mistakes (kΩ vs Ω, mA vs A)", "Rounding to 2 dp", "Using V = I×R"],
      correctIndex: 1,
      explanation: "Always convert prefixes first."
    },
    {
      id: "q2",
      question: "You used 3.3 kΩ as 3.3 Ω. Your result is…",
      options: ["1000× too big", "1000× too small", "Correct", "10× off"],
      correctIndex: 0,
      explanation: "kΩ is ×1000 compared with Ω."
    },
    {
      id: "q3",
      question: "Best order of steps?",
      options: ["Calculate, then convert", "Convert units, write values, choose formula, calculate, round", "Round first, then think", "Skip units"],
      correctIndex: 1,
      explanation: "Good workflow prevents mistakes."
    },
    {
      id: "q4",
      question: "A hot plug top likely means…",
      options: ["Good connection", "Loose connection/high current causing I²R heating", "Low voltage", "Wrong colour"],
      correctIndex: 1,
      explanation: "Investigate safely and retorque to manufacturer values if required."
    },
    {
      id: "q5",
      question: "Which quick method catches a triangle misread?",
      options: ["Ignore units", "Estimate the order of magnitude with rounded numbers", "Round everything to whole numbers first", "Swap V and I"],
      correctIndex: 1,
      explanation: "A rough estimate highlights results that are far off."
    },
    {
      id: "q6",
      question: "You get 3000 A for a small load. What should you check first?",
      options: ["Pen colour", "Unit conversions and formula rearrangement", "Cable colour", "Meter serial"],
      correctIndex: 1,
      explanation: "Wild results usually come from unit or rearrangement errors."
    }
  ];

  const quizQuestions = [
    { id: 1, question: "Which is the top cause of 1000× errors?", options: ["Cable colour", "Prefix mistakes (kΩ vs Ω, mA vs A)", "Rounding to 2 dp", "Using V = I×R"], correctAnswer: 1, explanation: "Always convert prefixes first." },
    { id: 2, question: "You used 3.3 kΩ as 3.3 Ω. Your result is…", options: ["1000× too big", "1000× too small", "Correct", "10× off"], correctAnswer: 0, explanation: "kΩ is ×1000 compared with Ω." },
    { id: 3, question: "Best order of steps?", options: ["Calculate, then convert", "Convert units, write values, choose formula, calculate, round", "Round first, then think", "Skip units"], correctAnswer: 1, explanation: "Good workflow prevents mistakes." },
    { id: 4, question: "A hot plug top likely means…", options: ["Good connection", "Loose connection/high current causing I²R heating", "Low voltage", "Wrong colour"], correctAnswer: 1, explanation: "Investigate safely and retorque to manufacturer values if required." },
    { id: 5, question: "Which proof helps others check your work?", options: ["No notes", "Only the answer", "Show the working, units and a quick plausibility check", "Colourful paper"], correctAnswer: 2, explanation: "Record steps and units for clarity." },
    { id: 6, question: "You get 3000 A for a small load. What should you check first?", options: ["Pen colour", "Unit conversions and formula rearrangement", "Cable colour", "Meter serial"], correctAnswer: 1, explanation: "Wild results usually come from unit or rearrangement errors." },
    { id: 7, question: "Which quick method catches a triangle misread?", options: ["Ignore units", "Estimate the order of magnitude with rounded numbers", "Round everything to whole numbers first", "Swap V and I"], correctAnswer: 1, explanation: "A rough estimate highlights results that are far off." },
    { id: 8, question: "Which record should accompany your calculation?", options: ["Nothing if it looks right", "Only the final number", "Values, units, chosen formula and a plausibility check", "Photo of the toolbox"], correctAnswer: 2, explanation: "Clear records help others verify and maintain safety." },
    { id: 9, question: "What's wrong with this calculation: V = 2.2 kΩ × 5 mA = 11 V?", options: ["Nothing - it's correct", "Should convert units first", "Used wrong formula", "Decimal error"], correctAnswer: 1, explanation: "Must convert: 2.2 kΩ = 2200 Ω, 5 mA = 0.005 A. Correct: V = 2200 × 0.005 = 11 V." },
    { id: 10, question: "Time unit mix-up: E = P × t = 2kW × 30 = 60kWh for 30 minutes. What's wrong?", options: ["Nothing wrong", "Need to convert 30 minutes to 0.5 hours first", "Should use different formula", "Wrong power value"], correctAnswer: 1, explanation: "30 minutes = 0.5 hours, so E = 2kW × 0.5h = 1kWh." }
  ] as const;

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
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
        {/* Page Header */}
        <header className="mb-12 text-center">
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2.2.6
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Common Mistakes and How to Avoid Them
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Avoid unit traps, wrong rearrangements and early rounding. Use a simple checklist every time.
          </p>
        </header>

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
                <li><strong>Unit Traps:</strong> mA vs A, kΩ vs Ω cause 1000× errors.</li>
                <li><strong>Wrong Formulas:</strong> Rearrangement mistakes create massive errors.</li>
                <li><strong>No Sanity Check:</strong> Accepting ridiculous answers without question.</li>
                <li><strong>Time Units:</strong> Minutes used as hours in energy calculations.</li>
                <li><strong>Copy Errors:</strong> Writing 0.25A as 2.5A under pressure.</li>
                <li><strong>The Checklist:</strong> 6 steps to error-free calculations.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Wild results, unit inconsistencies, rushed calculations.</li>
                <li><strong>Use:</strong> 6-step checklist for all electrical calculations.</li>
                <li><strong>Apply:</strong> Circuit analysis, component sizing, safety-critical calculations per BS 7671.</li>
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
              <span>Identify and avoid the five most common calculation errors</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Convert units correctly before every calculation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Apply the professional 6-step error prevention checklist</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Perform quick sanity checks on calculated results</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Identify when results affect safety and require verification</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span>Document calculations clearly for professional verification</span>
            </li>
          </ul>
        </section>

        {/* Why This Matters */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Why This Matters
          </h2>
          <div className="space-y-4">
            <div className="bg-card border-l-2 border-orange-500 p-4 rounded">
              <p className="text-white font-medium mb-2">Real Scenario:</p>
              <p className="text-white text-sm">
                An apprentice calculated that a 13A socket circuit could handle 13,000W instead of 13W because they used
                milliamps as amps. The resulting overload damaged equipment and created a safety hazard.
              </p>
            </div>
            <p className="text-white">
              Calculation errors in electrical work aren't just embarrassing - they're dangerous and expensive.
              This section teaches you systematic error-prevention strategies used by experienced electricians.
            </p>
          </div>
        </section>

        {/* Section 1: Unit Prefix Confusion */}
        <section className="mb-10">
          <div className="border-l-2 border-red-500 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Unit Prefix Confusion
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold">The Problem</h3>
                  </div>
                  <p className="text-sm">Using 250 mA as 250 A or 3.3 kΩ as 3.3 Ω creates massive 1000× errors that can damage equipment.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold">The Solution</h3>
                  </div>
                  <p className="text-sm">Always convert to base units first: 250 mA = 0.25 A, 3.3 kΩ = 3300 Ω.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check after Unit Prefixes */}
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

        {/* Section 2: Formula Rearrangement Errors */}
        <section className="mb-10">
          <div className="border-l-2 border-orange-500 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Formula Rearrangement Errors
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-4">
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-orange-600 mb-2">Wrong: I = V × R</h3>
                  <p className="text-sm">Need current from V=12V, R=4Ω: I = 12 × 4 = 48A (massive overcurrent!)</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-green-600 mb-2">Right: I = V ÷ R</h3>
                  <p className="text-sm">V = I × R, so I = V ÷ R: I = 12 ÷ 4 = 3A (use the triangle!)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check after Formula Rearrangement */}
          <div className="mt-6">
            <InlineCheck
              id={quickCheckQuestions[1].id}
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              correctIndex={quickCheckQuestions[1].correctIndex}
              explanation={quickCheckQuestions[1].explanation}
            />
          </div>
        </section>

        {/* Section 3: Professional 6-Step Checklist */}
        <section className="mb-10">
          <div className="border-l-2 border-elec-yellow p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Professional 6-Step Checklist
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-3">
                {[
                  {
                    step: "1",
                    title: "Convert All Units",
                    description: "mA → A, kΩ → Ω, minutes → hours. Write converted values clearly.",
                    example: "15mA = 0.015A, 3.3kΩ = 3300Ω"
                  },
                  {
                    step: "2",
                    title: "Choose & Write Formula",
                    description: "State which formula you're using and why.",
                    example: "Using P = V × I because I have voltage and current"
                  },
                  {
                    step: "3",
                    title: "Substitute with Units",
                    description: "Replace letters with numbers, keeping units throughout.",
                    example: "P = 230V × 0.015A = 3.45W"
                  },
                  {
                    step: "4",
                    title: "Quick Estimate Check",
                    description: "Round numbers and calculate roughly to check magnitude.",
                    example: "~230 × 0.02 = ~5W (close to 3.45W)"
                  },
                  {
                    step: "5",
                    title: "Reverse Check",
                    description: "Use your answer to calculate back to a known value.",
                    example: "I = P÷V = 3.45÷230 = 0.015A"
                  },
                  {
                    step: "6",
                    title: "Reality Check",
                    description: "Does the answer make sense for the application?",
                    example: "3.45W for a small LED? Yes, reasonable."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-card/50 p-4 rounded-lg border border-white/10">
                    <div className="flex items-start gap-3">
                      <span className="bg-elec-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-white">{item.description}</p>
                        <p className="text-xs font-mono text-elec-yellow">{item.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Check for Checklist */}
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

        {/* Section 4: Common Mistake Examples */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Mistake Examples
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-4">
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-purple-600 mb-2">Hot Plug Top</h3>
                  <p className="text-sm">Warm accessory traced to loose connection causing I²R heating. Always investigate safely and retorque to manufacturer values.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-purple-600 mb-2">Time Unit Mix-up</h3>
                  <p className="text-sm">30 minutes used as 30 hours: E = 2kW × 30 = 60kWh. Correct: 30min = 0.5h, so E = 2kW × 0.5h = 1kWh.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-purple-600 mb-2">Copy Error</h3>
                  <p className="text-sm">Writing 0.25A as 2.5A under pressure. Double-check by reading aloud: "Zero point two five amps".</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check for Examples */}
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

        {/* Section 5: Sanity Checks */}
        <section className="mb-10">
          <div className="border-l-2 border-indigo-500 bg-indigo-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Quick Sanity Checks
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-3">
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-indigo-400 mb-2">Order of Magnitude Check</h3>
                  <p className="text-sm">Quick mental maths: 2kW kettle at 230V ≈ 10A. If you get 3000A, check your working!</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-indigo-400 mb-2">Reverse Check</h3>
                  <p className="text-sm">Found I = 5A? Put it back: V = I × R should give your original voltage.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-indigo-400 mb-2">Compare with Typical Values</h3>
                  <p className="text-sm">House lights: few amps. Kettles: 10-13A. Does your answer fit the application?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check for Sanity Checks */}
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

        {/* Section 6: When to Get Help */}
        <section className="mb-10">
          <div className="border-l-2 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              When to Get Help
            </h2>
            <div className="space-y-4 text-white">
              <div className="grid gap-4">
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-green-600 mb-2">Safety-Critical Results</h3>
                  <p className="text-sm">If your calculation affects safety or you're unsure, get a second opinion before proceeding.</p>
                </div>
                <div className="bg-card/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold text-green-600 mb-2">Wild Results</h3>
                  <p className="text-sm">If magnitude feels wrong after checks, ask an experienced colleague to verify your approach.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check for Getting Help */}
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
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Pocket Guide
          </h2>
          <UnitsPocketCard />
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-blue-500/50 bg-elec-yellow/5 p-4 rounded-r-lg">
                <p className="font-medium text-white mb-2">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10 p-6 bg-gradient-to-r from-green-950/20 to-elec-yellow/10 border border-green-800 rounded-lg">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Key Takeaways
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Unit prefix errors cause 1000× mistakes - convert first
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Formula rearrangement mistakes create massive errors
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Always perform quick sanity checks on results
              </li>
            </ul>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Use the 6-step checklist for error prevention
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Document working clearly for verification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Get help when results affect safety
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
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Test Your Knowledge
          </h2>
          <Quiz questions={quizQuestions as any} title="Mistake Prevention Mastery Quiz" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../2-5"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-elec-yellow text-[#1a1a1a] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-1">Next Module<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
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

export default Module2Section2_6;
