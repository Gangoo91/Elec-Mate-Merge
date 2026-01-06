import useSEO from "@/hooks/useSEO";
import { ArrowLeft, ArrowRight, Calculator, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import SeriesParallelCalculators from "@/components/apprentice-courses/SeriesParallelCalculators";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";

const TITLE = "3.4 Series & Parallel Calculations | Module 2";
const DESCRIPTION = "Hands-on calculations for series and parallel circuits with built-in calculators. UK electricians, BS 7671 aligned.";

const quickCheckQuestions = [
  {
    id: "1",
    question: "When reducing a series-parallel network, which step is correct?",
    options: ["Start with parallel sections first", "Start with series sections first", "Always start from the left", "Start with the largest resistor"],
    correctIndex: 0,
    explanation: "Reduce parallel sections first as they're easier to identify and calculate, then handle the remaining series combinations."
  },
  {
    id: "2",
    question: "For two 10Ω resistors in parallel, then in series with a 5Ω resistor, what's the total resistance?",
    options: ["25Ω", "15Ω", "10Ω", "20Ω"],
    correctIndex: 2,
    explanation: "Parallel: (10×10)/(10+10) = 5Ω. Then series: 5Ω + 5Ω = 10Ω total."
  }
];

export default function Module2Section3_4() {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "How do I approach complex series-parallel networks?",
      answer: "Start by identifying clear parallel sections and reduce them first using the parallel formula. Then identify series sections and add resistances. Work systematically from the most obvious combinations toward the supply."
    },
    {
      question: "What's the difference between voltage dividers and current dividers?",
      answer: "Voltage dividers work in series circuits - voltage splits proportionally. Current dividers work in parallel circuits - current splits inversely proportional to resistance. Both use the same supply."
    },
    {
      question: "How do these calculations apply to real installations?",
      answer: "LED arrays, resistor networks in control panels, and mixed lighting/power circuits all exhibit series-parallel behaviour. Understanding these helps with troubleshooting and load calculations."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Total resistance of three series resistors is...",
      options: ["Product of all", "Sum of all", "Average of all", "Least of all"],
      correctAnswer: 1,
      explanation: "Series resistances add directly: Rt = R1 + R2 + R3"
    },
    {
      id: 2,
      question: "Two resistors in parallel, equivalent resistance is...",
      options: ["R1+R2", "(R1×R2)/(R1+R2)", "R1−R2", "R1×R2"],
      correctAnswer: 1,
      explanation: "Two-resistor parallel formula: Rt = (R1×R2)/(R1+R2)"
    },
    {
      id: 3,
      question: "In series-parallel networks, current in a branch depends on...",
      options: ["Wire colour", "Branch resistance and applied voltage", "Conductor CSA only", "Ambient temperature only"],
      correctAnswer: 1,
      explanation: "Use I = V/R for each branch based on local voltage and resistance"
    },
    {
      id: 4,
      question: "BS 7671 design checks should include...",
      options: ["Volt drop and Zs for device disconnection", "Ignoring protective device ratings", "Guessing current", "Using any cable size"],
      correctAnswer: 0,
      explanation: "Verify volt drop, fault loop impedance and protective device ratings"
    },
    {
      id: 5,
      question: "Where might series-parallel effects appear?",
      options: ["Every CPC", "LED tapes and resistor networks", "Earthing rods only", "Only DC systems"],
      correctAnswer: 1,
      explanation: "Equipment often has internal series/parallel resistor networks"
    },
    {
      id: 6,
      question: "A voltage divider with 12V supply, R1=4Ω, R2=8Ω gives what voltage across R2?",
      options: ["4V", "6V", "8V", "12V"],
      correctAnswer: 2,
      explanation: "VR2 = 12V × (8Ω/(4Ω+8Ω)) = 12V × (8/12) = 8V"
    },
    {
      id: 7,
      question: "Current divider: 3A total, branches 6Ω and 12Ω. Current through 6Ω branch?",
      options: ["1A", "1.5A", "2A", "3A"],
      correctAnswer: 2,
      explanation: "I(6Ω) = 3A × (12Ω/(6Ω+12Ω)) = 3A × (12/18) = 2A"
    },
    {
      id: 8,
      question: "When combining series and parallel sections, what's the key principle?",
      options: ["Always start with series", "Reduce step-by-step, maintaining circuit behaviour", "Ignore the order", "Use only parallel formulas"],
      correctAnswer: 1,
      explanation: "Systematic reduction preserves the electrical behaviour at each step"
    },
    {
      id: 9,
      question: "For BS 7671 compliance, mixed circuits require checking...",
      options: ["Only total resistance", "Voltage drop, Zs, device ratings, and cable capacity", "Only cable colours", "Only the supply voltage"],
      correctAnswer: 1,
      explanation: "All aspects affecting safety and performance must be verified"
    },
    {
      id: 10,
      question: "Three resistors: 20Ω and 30Ω in parallel, then in series with 10Ω. Total resistance?",
      options: ["60Ω", "22Ω", "15Ω", "50Ω"],
      correctAnswer: 1,
      explanation: "Parallel: (20×30)/(20+30) = 12Ω. Series: 12Ω + 10Ω = 22Ω"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="flex items-center gap-4 mb-6">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          <div>
            <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
              Module 2.3.4
            </span>
            <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Series & Parallel Calculations
            </h1>
            <p className="text-xl text-white max-w-3xl mt-2">
              Combining series and parallel rules for complex circuit analysis and real-world applications
            </p>
          </div>
        </div>

        {/* Introduction Card */}
        <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none mb-8">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="space-y-3">
              <div className="bg-card border border-white/10 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">In 30 seconds</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Series: I same, V divides, Rt adds</li>
                  <li>• Parallel: V same, currents add, 1/Rt sums</li>
                  <li>• Use dividers: Vx = Vs×Rx/Rt, Ibranch = Vs/Rbranch</li>
                  <li>• Combine step-by-step: reduce then solve</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Spot it / Use it</h3>
                <ul className="space-y-2 text-sm">
                  <li>• LED tape networks, resistor networks</li>
                  <li>• Mixed series-parallel lighting</li>
                  <li>• Control panel components</li>
                  <li>• Checking manufacturer limits</li>
                  <li>• Load distribution analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="space-y-3">
            {[
              "Calculate total resistance for series and parallel combinations",
              "Apply Ohm's Law to find current and voltage in mixed networks",
              "Use voltage and current divider principles effectively",
              "Link calculation results to BS 7671 design requirements"
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-white">{outcome}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Section 1 - Blue */}
        <div className="border-l-4 border-elec-yellow rounded-r-lg p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">1. Mixed Network Reduction Strategy</h2>
          <div className="space-y-4 text-white">
            <p>
              Complex circuits combine series and parallel elements. Success comes from systematic reduction:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Series Rules</h4>
                <ul className="text-sm space-y-1">
                  <li>• Current same throughout: I₁ = I₂ = I₃</li>
                  <li>• Voltages add: V<sub>T</sub> = V₁ + V₂ + V₃</li>
                  <li>• Resistances add: R<sub>T</sub> = R₁ + R₂ + R₃</li>
                </ul>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Parallel Rules</h4>
                <ul className="text-sm space-y-1">
                  <li>• Voltage same: V₁ = V₂ = V₃ = V<sub>S</sub></li>
                  <li>• Currents add: I<sub>T</sub> = I₁ + I₂ + I₃</li>
                  <li>• Reciprocals: 1/R<sub>T</sub> = 1/R₁ + 1/R₂ + 1/R₃</li>
                </ul>
              </div>
            </div>
            <div className="bg-elec-yellow/20 border border-border/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Reduction Steps</h4>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Identify clear parallel sections and reduce them first</li>
                <li>Identify remaining series sections and combine them</li>
                <li>Continue until one equivalent resistance remains</li>
                <li>Work backwards to find individual currents and voltages</li>
              </ol>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 - Emerald */}
        <div className="border-l-4 border-elec-yellow rounded-r-lg p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">2. Worked Examples with Step-by-Step Solutions</h2>
          <div className="space-y-4 text-white">
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Example 1: Series-in-Parallel Network</h4>
              <div className="text-sm space-y-2">
                <p><strong>Given:</strong> 24V supply, (R1=150Ω + R2=450Ω in series) || R3=120Ω</p>
                <p><strong>Step 1:</strong> Reduce series section: R<sub>series</sub> = 150 + 450 = 600Ω</p>
                <p><strong>Step 2:</strong> Parallel combination: R<sub>T</sub> = (600×120)/(600+120) = 100Ω</p>
                <p><strong>Step 3:</strong> Total current: I<sub>T</sub> = 24V ÷ 100Ω = 0.24A</p>
                <p><strong>Step 4:</strong> Branch currents:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Series branch: I<sub>series</sub> = 24V ÷ 600Ω = 0.04A</li>
                  <li>Parallel branch: I₃ = 24V ÷ 120Ω = 0.2A</li>
                </ul>
                <p><strong>Check:</strong> 0.04A + 0.2A = 0.24A ✓</p>
              </div>
            </div>

            <div className="bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Example 2: Parallel-in-Series Network</h4>
              <div className="text-sm space-y-2">
                <p><strong>Given:</strong> 12V supply, (R1=100Ω || R2=300Ω) + R3=50Ω in series</p>
                <p><strong>Step 1:</strong> Reduce parallel section: R<sub>parallel</sub> = (100×300)/(100+300) = 75Ω</p>
                <p><strong>Step 2:</strong> Total resistance: R<sub>T</sub> = 75 + 50 = 125Ω</p>
                <p><strong>Step 3:</strong> Total current: I<sub>T</sub> = 12V ÷ 125Ω = 0.096A</p>
                <p><strong>Step 4:</strong> Voltage across parallel section: V<sub>parallel</sub> = 0.096A × 75Ω = 7.2V</p>
                <p><strong>Step 5:</strong> Branch currents in parallel section:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>I₁ = 7.2V ÷ 100Ω = 0.072A</li>
                  <li>I₂ = 7.2V ÷ 300Ω = 0.024A</li>
                </ul>
                <p><strong>Check:</strong> 0.072A + 0.024A = 0.096A ✓</p>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 - Teal */}
        <div className="border-l-4 border-teal-500 bg-teal-500/10 rounded-r-lg p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">3. Divider Circuits and Interactive Tools</h2>
          <div className="space-y-4 text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Voltage Divider (Series)</h4>
                <p className="text-sm mb-2">V<sub>x</sub> = V<sub>s</sub> × (R<sub>x</sub>/(R₁+R₂+...))</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Voltage splits proportionally to resistance</li>
                  <li>Higher resistance gets more voltage</li>
                  <li>Used in sensor circuits and LED drivers</li>
                </ul>
              </div>
              <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Current Divider (Parallel)</h4>
                <p className="text-sm mb-2">I₁ = I<sub>T</sub> × (R₂/(R₁+R₂))</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Current splits inversely to resistance</li>
                  <li>Lower resistance gets more current</li>
                  <li>Or directly: I<sub>branch</sub> = V<sub>s</sub>/R<sub>branch</sub></li>
                </ul>
              </div>
            </div>

            <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Problem-Solving Strategy</h4>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Draw the circuit clearly, labeling all components</li>
                <li>Identify series and parallel sections systematically</li>
                <li>Reduce the circuit step by step, working from the "inside out"</li>
                <li>Calculate total current using Ohm's Law</li>
                <li>Work backwards to find individual voltages and currents</li>
                <li>Verify results using Kirchhoff's Laws</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Interactive Calculation Tools</h4>
              <OhmsCalculator />
              <SeriesParallelCalculators />
              <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-3">
                <p className="text-xs">Use these tools to verify your manual calculations and explore different scenarios quickly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 - Amber */}
        <div className="border-l-4 border-amber-500 rounded-r-lg p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">4. Real-World Applications and BS 7671 Context</h2>
          <div className="space-y-4 text-white">
            <p>Mixed series-parallel circuits appear throughout electrical installations and equipment.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Common Applications</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>LED strip arrays with current limiting resistors</li>
                  <li>Control panel indicator circuits</li>
                  <li>Multi-tap transformer secondary circuits</li>
                  <li>Emergency lighting battery backup circuits</li>
                </ul>
              </div>
              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Measurement Verification</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Voltage measurements across series elements</li>
                  <li>Current measurements in parallel branches</li>
                  <li>Power calculations for heat dissipation</li>
                  <li>Continuity and insulation testing</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">⚠️ BS 7671 Design Requirements</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Voltage Drop:</strong> Calculate actual voltage at load terminals, considering all series resistance</li>
                <li><strong>Current Capacity:</strong> Ensure each conductor can carry its actual current safely</li>
                <li><strong>Protective Devices:</strong> Select based on highest current path and coordination requirements</li>
                <li><strong>Fault Conditions:</strong> Consider how series-parallel arrangements affect fault current paths</li>
                <li><strong>Load Distribution:</strong> Balance loads appropriately across supply phases</li>
                <li><strong>Manufacturer Limits:</strong> Respect equipment ratings for series/parallel connections</li>
              </ul>
            </div>

            <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Installation Best Practices</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Document circuit configurations clearly on as-built drawings</li>
                <li>Label series and parallel sections for future maintenance</li>
                <li>Consider failure modes - how does one component failure affect others?</li>
                <li>Test each section individually during commissioning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-teal-500 pl-4">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Units Pocket Card */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Essential Reference</h2>
          <UnitsPocketCard />
        </div>

        {/* Quick Reference Card */}
        <Card className="p-6 bg-transparent border-white/20 bg-none shadow-none mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference: Mixed Circuit Rules</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
            <div className="bg-card border border-border/30 rounded-lg p-3">
              <h4 className="font-semibold mb-2">Series Elements</h4>
              <p>R<sub>T</sub> = R₁ + R₂ + R₃...</p>
              <p>I same, V divides</p>
              <p className="text-xs">V<sub>x</sub> = V<sub>s</sub> × R<sub>x</sub>/R<sub>T</sub></p>
            </div>
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-3">
              <h4 className="font-semibold mb-2">Parallel Elements</h4>
              <p>1/R<sub>T</sub> = 1/R₁ + 1/R₂...</p>
              <p>V same, I adds</p>
              <p className="text-xs">I<sub>x</sub> = V<sub>s</sub>/R<sub>x</sub></p>
            </div>
            <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-3">
              <h4 className="font-semibold mb-2">Mixed Networks</h4>
              <p>Reduce step by step</p>
              <p>Verify with KVL/KCL</p>
              <p className="text-xs">Always check power balance</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz title="Test Your Understanding: Series & Parallel Calculations" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../3-3"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="../3-5">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </main>
    </div>
  );
}