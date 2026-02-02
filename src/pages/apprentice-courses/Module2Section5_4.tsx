import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Wrench, CheckCircle2, AlertTriangle, Thermometer, Ruler, Plug, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ResistanceCalculator from "@/components/apprentice-courses/ResistanceCalculator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import React from "react";

const quizQuestions = [
  {
    id: 1,
    question: "Which factor has the greatest effect on cable resistance?",
    options: ["Cable colour", "Cross-sectional area", "Cable manufacturer", "Installation date"],
    correctAnswer: 1,
    explanation: "Cross-sectional area (CSA) is inversely proportional to resistance. Doubling the CSA halves the resistance.",
  },
  {
    id: 2,
    question: "For copper cable at 20°C, the resistivity formula is approximately:",
    options: ["R ≈ 0.0172 × L ÷ A", "R ≈ 0.0282 × L ÷ A", "R ≈ L × A ÷ 0.0172", "R ≈ A ÷ L"],
    correctAnswer: 0,
    explanation: "For copper, R (Ω) ≈ 0.0172 × L ÷ A, where L is length in metres and A is CSA in mm².",
  },
  {
    id: 3,
    question: "What happens to cable resistance as temperature increases?",
    options: ["It decreases", "It increases", "It stays the same", "It becomes unstable"],
    correctAnswer: 1,
    explanation: "Most cable materials have positive temperature coefficients, meaning resistance increases with temperature.",
  },
  {
    id: 4,
    question: "A 20m copper cable with 4mm² CSA has approximately what resistance at 20°C?",
    options: ["0.086 Ω", "0.43 Ω", "0.172 Ω", "1.72 Ω"],
    correctAnswer: 0,
    explanation: "R ≈ 0.0172 × 20 ÷ 4 = 0.086 Ω",
  },
  {
    id: 5,
    question: "Poor joints and terminations create problems because they:",
    options: ["Reduce voltage", "Add contact resistance", "Increase cable length", "Change CSA"],
    correctAnswer: 1,
    explanation: "Poor connections have high contact resistance, causing heating and voltage drop at the joint.",
  },
  {
    id: 6,
    question: "For a radial circuit, the length used in resistance calculations should be:",
    options: ["One-way length only", "Total path length (out and back)", "Half the cable length", "Length of live conductor only"],
    correctAnswer: 1,
    explanation: "Current flows out and back, so use the total path length for resistance calculations.",
  },
  {
    id: 7,
    question: "Which has lower resistance for the same CSA and length?",
    options: ["Copper", "Aluminium", "Both the same", "Depends on temperature"],
    correctAnswer: 0,
    explanation: "Copper has lower resistivity (0.0172) compared to aluminium (0.0282) at 20°C.",
  },
  {
    id: 8,
    question: "To reduce resistance in an existing installation, you could:",
    options: ["Paint the cable", "Increase the CSA", "Add more joints", "Change the voltage"],
    correctAnswer: 1,
    explanation: "Increasing CSA (using thicker cable) reduces resistance proportionally.",
  },
  {
    id: 9,
    question: "High-resistance joints create a safety risk because they:",
    options: ["Look untidy", "Overheat", "Are hard to test", "Use more cable"],
    correctAnswer: 1,
    explanation: "High resistance causes I²R heating, which can damage insulation and create fire risk.",
  },
  {
    id: 10,
    question: "Before testing continuity, you must:",
    options: ["Call your supervisor", "Isolate, lock-off and prove dead", "Wait 24 hours", "Paint the terminals"],
    correctAnswer: 1,
    explanation: "Safety first: always isolate, lock-off and prove dead before working on any electrical installation.",
  },
];

const faqs = [
  {
    q: "What affects resistance most on site?",
    a: "Length, cross‑sectional area, material, temperature, and the quality of joints/terminations.",
  },
  {
    q: "How can I quickly estimate cable resistance?",
    a: "Use R ≈ 0.0172 × L ÷ A for copper (0.0282 for aluminium), with L in metres and A in mm².",
  },
  {
    q: "Any testing tips for continuity?",
    a: "Isolate, lock‑off and prove dead. Use a low‑ohm continuity tester, null the leads, and follow BS 7671 and the instrument manual.",
  },
];

const Module2Section5_4: React.FC = () => {
  useSEO(
    "Resistance in Practice – Module 2 (2.5.4)",
    "Level 2 practical resistance: quick estimates, measuring continuity, joints and heating with BS 7671 guidance."
  );

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2.5.4
          </span>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wrench className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Resistance in Practice
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Real-world tips for cable runs, joints and testing in line with BS 7671
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid gap-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Quick estimate:</strong> Copper R ≈ 0.0172 × L ÷ A</li>
                <li><strong>Longer runs:</strong> Higher resistance and voltage drop</li>
                <li><strong>Poor joints:</strong> Add resistance and create hot spots</li>
                <li><strong>Temperature:</strong> Heat increases resistance</li>
                <li><strong>Testing:</strong> Use continuity tester, follow BS 7671</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Long runs, loose terminals, overheating joints</li>
                <li><strong>Use:</strong> Proper torque settings, clean connections</li>
                <li><strong>Apply:</strong> Route efficiently, upsize for voltage drop</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What it means on site */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            What this means on site
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-white text-sm">
            <li><strong>Longer</strong> runs have more resistance; keep runs sensible and plan routes.</li>
            <li><strong>Thicker</strong> cables (bigger CSA) have less resistance; upsize to limit heating and voltage drop.</li>
            <li><strong>Material</strong> matters: copper has lower resistance than aluminium for the same size.</li>
            <li><strong>Heat</strong> raises resistance; avoid bunching, poor ventilation and overloaded enclosures.</li>
            <li><strong>Joints/terminations</strong> add contact resistance; poor joints overheat – a safety risk.</li>
          </ul>
        </section>

        {/* Quick Knowledge Check */}
        <InlineCheck
          question="A 30m copper cable run needs to carry 20A. Which cable size will have LOWER resistance?"
          options={["1.5mm²", "2.5mm²", "4mm²", "All the same"]}
          correctAnswer={2}
          explanation="4mm² has the largest cross-sectional area, therefore the lowest resistance. Larger CSA = lower resistance."
        />

        {/* Quick estimator */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            <Calculator className="w-5 h-5"/>Quick resistance estimator
          </h2>
          <p className="text-xs sm:text-sm text-white mb-4">Use these constants with <strong>L</strong> in metres and <strong>A</strong> in mm² (20°C reference):</p>
          <div className="grid gap-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium">Copper</p>
              <p>R (Ω) ≈ <strong>0.0172 × L ÷ A</strong></p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium">Aluminium</p>
              <p>R (Ω) ≈ <strong>0.0282 × L ÷ A</strong></p>
            </div>
          </div>
          <div className="text-xs text-white mt-3">For a complete loop (out and back), use the total path length. Always verify design with Appendix 4 tables.</div>
        </section>

        {/* Calculator */}
        <ResistanceCalculator />

        {/* Practical guidance */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical guidance
          </h2>
          <div className="grid gap-4 text-xs sm:text-sm text-white">
            <div className="bg-card border border-border/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-elec-yellow mb-1 flex items-center gap-2"><Ruler className="w-4 h-4"/> Cable runs</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Keep runs short; avoid unnecessary loops.</li>
                <li>Consider future load – long feeders may need a larger CSA.</li>
                <li>Route to limit heat build‑up and grouping where possible.</li>
              </ul>
            </div>
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2"><Thermometer className="w-4 h-4"/> Temperature</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Higher temperature increases resistance; check installation method.</li>
                <li>Use manufacturer data and Appendix 4 correction factors.</li>
                <li>Provide ventilation where equipment runs warm.</li>
              </ul>
            </div>
            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-elec-yellow mb-1 flex items-center gap-2"><Plug className="w-4 h-4"/> Joints and terminations</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clean, tight connections reduce contact resistance.</li>
                <li>Use correct lugs, ferrules and torque settings.</li>
                <li>For aluminium, consider bimetallic lugs and jointing paste.</li>
              </ul>
            </div>
            <div className="bg-rose-500/10 border border-rose-400/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-rose-300 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Safety</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>High‑resistance joints overheat – inspect for discolouration or smell.</li>
                <li>Isolate, lock‑off and prove dead before working on connections.</li>
                <li>Follow BS 7671 Sections 525 and 526 for thermal effects and connections.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Simple practice tasks */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Practice tasks
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 1</p>
              <p>Find R for 20 m of copper, 4 mm² at 20°C.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline min-h-[44px] touch-manipulation">Show answer</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>R ≈ 0.0172 × 20 ÷ 4 = 0.086 Ω</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 2</p>
              <p>Estimate the loop resistance for a 15 m radial (out and back) in copper, 2.5 mm².</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline min-h-[44px] touch-manipulation">Show answer</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>Total path length = 30 m. R ≈ 0.0172 × 30 ÷ 2.5 = 0.206 Ω</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 3</p>
              <p>Which will have lower resistance: 10 m of 1.5 mm² copper or 10 m of 2.5 mm² copper?</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline min-h-[44px] touch-manipulation">Show answer</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>2.5 mm² is thicker, so lower R for the same length and material.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* Another InlineCheck */}
        <InlineCheck
          question="What happens to copper cable resistance when temperature increases from 20°C to 40°C?"
          options={["Decreases by 20%", "Increases by approximately 8%", "Stays exactly the same", "Becomes zero"]}
          correctAnswer={1}
          explanation="Cable resistance increases with temperature. Copper has a positive temperature coefficient, increasing about 0.4% per degree Celsius."
        />

        {/* Comprehensive Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Knowledge Check Quiz (10 Questions)
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level2/module2/section5/5-3"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="/study-centre/apprentice/level2/module2/section5/5-5">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </div>
  );
};

export default Module2Section5_4;
