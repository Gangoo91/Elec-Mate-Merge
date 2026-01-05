import { ArrowLeft, Calculator, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import useSEO from "@/hooks/useSEO";

const TITLE = "Calculate V, I or R (Step by Step) - Level 2 Module 2 Section 2.3";
const DESCRIPTION = "Pick any two values and find the third using Ohm's Law with unit conversion tips, UK scenarios and checks.";

const quickCheckQuestions = [
  {
    id: "ohms-law-formula",
    question: "For V = 48 V and R = 12 Ω, I is…",
    options: [
      "4 A",
      "0.25 A", 
      "36 A",
      "1 A"
    ],
    correctIndex: 0,
    explanation: "I = V/R = 48/12 = 4 A."
  },
  {
    id: "unit-conversion",
    question: "Convert 250 mA to base units:",
    options: [
      "0.25 A",
      "2.5 A",
      "25 A",
      "0.025 A"
    ],
    correctIndex: 0,
    explanation: "milli (m) means ÷1000, so 250 ÷ 1000 = 0.25 A."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 230 V appliance has R = 920 Ω. Current is…",
    options: ["0.25 A", "0.5 A", "2 A", "25 A"],
    correctAnswer: 0,
    explanation: "I = V/R = 230/920 ≈ 0.25 A."
  },
  {
    id: 2,
    question: "R for V = 24 V, I = 0.12 A?",
    options: ["200 Ω", "2 Ω", "20 Ω", "2 kΩ"],
    correctAnswer: 0,
    explanation: "R = V/I = 24/0.12 = 200 Ω."
  },
  {
    id: 3,
    question: "V for I = 15 mA and R = 1.2 kΩ?",
    options: ["18 V", "1.8 V", "180 V", "0.018 V"],
    correctAnswer: 0,
    explanation: "15 mA = 0.015 A, 1.2 kΩ = 1200 Ω → V = 0.015×1200 = 18 V."
  },
  {
    id: 4,
    question: "Convert 2.5 kΩ to base units:",
    options: ["2500 Ω", "250 Ω", "25 Ω", "2.5 Ω"],
    correctAnswer: 0,
    explanation: "kilo (k) means ×1000, so 2.5 × 1000 = 2500 Ω."
  },
  {
    id: 5,
    question: "Convert 250 mA to base units:",
    options: ["0.25 A", "2.5 A", "25 A", "0.025 A"],
    correctAnswer: 0,
    explanation: "milli (m) means ÷1000, so 250 ÷ 1000 = 0.25 A."
  },
  {
    id: 6,
    question: "Which formula finds voltage?",
    options: ["V = I × R", "I = V ÷ R", "R = V ÷ I", "P = V × I"],
    correctAnswer: 0,
    explanation: "V = I × R is used to find voltage when current and resistance are known."
  },
  {
    id: 7,
    question: "A heating element draws 10A at 230V. Its resistance is:",
    options: ["23 Ω", "230 Ω", "2300 Ω", "2.3 Ω"],
    correctAnswer: 0,
    explanation: "R = V/I = 230/10 = 23 Ω."
  },
  {
    id: 8,
    question: "Safety check: Calculate voltage across a 5Ω resistor with 2A current:",
    options: ["10 V", "2.5 V", "7 V", "0.4 V"],
    correctAnswer: 0,
    explanation: "V = I × R = 2 × 5 = 10 V. Always check results are reasonable!"
  },
  {
    id: 9,
    question: "Which step comes first in Ohm's Law calculations?",
    options: [
      "Choose the formula",
      "Convert to base units", 
      "Calculate and round",
      "Sanity check"
    ],
    correctAnswer: 1,
    explanation: "Always convert to base units (V, A, Ω) first to avoid calculation errors."
  },
  {
    id: 10,
    question: "A circuit has V = 12V and I = 0.5A. What's the resistance?",
    options: ["24 Ω", "6 Ω", "12.5 Ω", "0.042 Ω"],
    correctAnswer: 0,
    explanation: "R = V/I = 12/0.5 = 24 Ω."
  }
];

const faqs = [
  {
    question: "Should I always convert to base units?",
    answer: "Yes, convert to A, V and Ω before calculating, then convert back if needed."
  },
  {
    question: "How many decimals?",
    answer: "Match the measurement precision and round sensibly (usually 2–3 dp for site notes)."
  },
  {
    question: "What if my reading doesn't match the calc?",
    answer: "Real parts heat up or vary. Check the setup, temperature and instrument tolerance before concluding a fault."
  },
  {
    question: "Do test meters have tolerance?",
    answer: "Yes. Allow for meter accuracy and lead resistance, especially at low ohms."
  }
];

const Module2Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.2.3
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Calculate V, I or R (Step by Step)
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Identify known values, convert units, pick the formula, calculate, round, and sanity‑check.
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Ohm's Law:</strong> V = I × R relates voltage, current, and resistance.</li>
                <li><strong>Formula selection:</strong> Cover what you're finding in the triangle method.</li>
                <li><strong>Unit conversion:</strong> Always convert to base units (V, A, Ω) before calculating.</li>
                <li><strong>Process:</strong> Convert units → Choose formula → Calculate → Round → Sanity check.</li>
                <li><strong>Applications:</strong> Circuit analysis, fault finding, component sizing, safety checks.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Nameplate data (230V, 13A), meter readings, component values.</li>
                <li><strong>Use:</strong> Load calculations, cable sizing, fuse selection, troubleshooting.</li>
                <li><strong>Apply:</strong> V=IR, I=V/R, R=V/I calculations with proper unit conversion.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Follow a systematic calculation process</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Convert between electrical units confidently</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Select the correct Ohm's Law formula</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Round results appropriately for practical use</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Perform sanity checks on calculated values</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Use the Ohm's Law calculator effectively</span>
            </li>
          </ul>
        </Card>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Understanding Ohm's Law */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Understanding Ohm's Law
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                <strong>Ohm's Law</strong> describes the relationship between voltage, current, and resistance in electrical circuits. 
                It states that current is directly proportional to voltage and inversely proportional to resistance.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">The Three Formulas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-card p-4 rounded-lg border border-border/20">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">V = I × R</div>
                    <p className="text-sm">To find Voltage</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border/20">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">I = V ÷ R</div>
                    <p className="text-sm">To find Current</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border/20">
                    <div className="text-2xl font-bold text-emerald-400 mb-2">R = V ÷ I</div>
                    <p className="text-sm">To find Resistance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Step-by-Step Calculation Process
            </h2>
            <div className="space-y-4 text-foreground">
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Write known values with units;</strong> convert prefixes to base units (V, A, Ω).</li>
                <li><strong>Choose the formula:</strong> V = I×R, I = V/R, or R = V/I.</li>
                <li><strong>Calculate and round;</strong> keep at least 2–3 significant figures.</li>
                <li><strong>Sanity‑check:</strong> does the result fit the scenario?</li>
              </ol>
              
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 mt-4">
                <h4 className="font-semibold mb-2">Example: Finding Current</h4>
                <p className="text-sm mb-2">A 230V kettle has resistance 23Ω. Find the current:</p>
                <ol className="list-decimal pl-4 space-y-1 text-sm">
                  <li>Known: V = 230V, R = 23Ω (already in base units)</li>
                  <li>Finding I, so use: I = V ÷ R</li>
                  <li>Calculate: I = 230 ÷ 23 = 10A</li>
                  <li>Sanity check: 10A for a kettle is reasonable ✓</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Ohm's Law Calculator */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Interactive Ohm's Law Calculator</h2>
          <p className="text-muted-foreground mb-6">
            Practice with this calculator. Enter any two values and it will calculate the third using Ohm's Law.
          </p>
          <OhmsCalculator />
        </Card>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Units Pocket Card */}
        <UnitsPocketCard />

        {/* Real-World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Scenario</h2>
          <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-3">Appliance Testing on Site</h3>
            <p className="text-xs sm:text-sm text-foreground mb-3">
              You're testing a 3kW immersion heater on a 230V supply. The nameplate is worn and you need to verify 
              it's drawing the correct current and check its resistance.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Given:</strong> P = 3kW, V = 230V</p>
              <p><strong>Step 1:</strong> Find current using P = V × I → I = P/V = 3000/230 = 13.04A</p>
              <p><strong>Step 2:</strong> Find resistance using R = V/I = 230/13.04 = 17.6Ω</p>
              <p><strong>Check:</strong> Does 13A sound right for a 3kW heater? Yes! ✓</p>
              <p className="text-muted-foreground italic">
                This demonstrates how Ohm's Law helps verify equipment performance and spot potential faults.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                <p className="font-semibold text-foreground mb-2">{faq.question}</p>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground mb-4">
            Ohm's Law calculations are fundamental to electrical work. By following a systematic process - 
            converting units, choosing the right formula, calculating carefully, and checking results - 
            you can confidently solve electrical problems and verify circuit behaviour.
          </p>
          <p className="text-muted-foreground text-sm">
            Remember: practice makes perfect. Use the calculator regularly and always double-check your work!
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Understanding: Ohm's Law Calculations" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Forward
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            inLanguage: "en-GB",
            isAccessibleForFree: true,
          }),
        }}
      />
    </div>
  );
};

export default Module2Section2_3;