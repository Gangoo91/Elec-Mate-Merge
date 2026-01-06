import useSEO from "@/hooks/useSEO";
import { ArrowLeft, ArrowRight, Split, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import SeriesParallelCalculators from "@/components/apprentice-courses/SeriesParallelCalculators";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";

const TITLE = "3.3 Parallel Circuits – Current and Voltage | Module 2";
const DESCRIPTION = "Learn how current splits and voltage is equal across branches in parallel circuits. UK electricians, BS 7671 aligned.";

const quickCheckQuestions = [
  {
    id: "1",
    question: "In parallel circuits, what is the voltage across each branch?",
    options: ["Divided between branches", "Equal to supply voltage", "Zero on all branches", "Depends on resistance"],
    correctIndex: 1,
    explanation: "Each parallel branch receives the full supply voltage - this is a fundamental parallel circuit rule."
  },
  {
    id: "2",
    question: "Which statement about total current in parallel circuits is correct?",
    options: ["Total current equals branch current", "Total current is the sum of all branch currents", "Total current is always 1A", "Total current equals supply voltage"],
    correctIndex: 1,
    explanation: "By Kirchhoff's Current Law, total current equals the sum of all branch currents: It = I1 + I2 + I3..."
  }
];

export default function Module2Section3_3() {
  useSEO(TITLE, DESCRIPTION);

  const faqs = [
    {
      question: "Why does parallel resistance decrease when branches are added?",
      answer: "Each additional branch provides another path for current flow, reducing the overall opposition to current. The total resistance is always less than the smallest branch resistance."
    },
    {
      question: "How do I check parallel circuit calculations on site?",
      answer: "Measure voltage across each branch (should equal supply), measure branch currents and verify they sum to total current, and check that protective devices are correctly rated."
    },
    {
      question: "What happens if one branch fails in a parallel circuit?",
      answer: "Other branches continue to operate normally - this is why household sockets remain powered when one appliance fails. Only the failed branch loses power."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "In parallel circuits, the voltage across each branch is...",
      options: ["Shared unequally", "Equal to the supply", "Zero", "Only on the last branch"],
      correctAnswer: 1,
      explanation: "Parallel branches each see the full supply voltage."
    },
    {
      id: 2,
      question: "Total current in a parallel circuit is...",
      options: ["The smallest branch current", "The sum of branch currents", "Always 1 A", "Equal to total resistance"],
      correctAnswer: 1,
      explanation: "Currents split into branches and add at junctions."
    },
    {
      id: 3,
      question: "Equivalent resistance of two resistors in parallel is...",
      options: ["R1 + R2", "(R1×R2)/(R1+R2)", "R1 − R2", "R1×R2"],
      correctAnswer: 1,
      explanation: "For two in parallel, Rt = (R1×R2)/(R1+R2)."
    },
    {
      id: 4,
      question: "A typical UK example of parallel loads is...",
      options: ["Series LED string in a driver", "Ring final circuit socket outlets", "A single filament lamp", "Main earthing conductor"],
      correctAnswer: 1,
      explanation: "Sockets present multiple load branches in parallel."
    },
    {
      id: 5,
      question: "BS 7671 design for parallel circuits should include...",
      options: ["Ignoring Zs", "Checking volt drop and protective device disconnection times", "Guessing currents", "Using any conductor size"],
      correctAnswer: 1,
      explanation: "Design and verification must consider voltage drop and disconnection times with correct Zs."
    },
    {
      id: 6,
      question: "If one branch in a parallel circuit has 2Ω and another has 6Ω, the equivalent resistance is...",
      options: ["8Ω", "4Ω", "1.5Ω", "3Ω"],
      correctAnswer: 2,
      explanation: "Using the formula: Rt = (2×6)/(2+6) = 12/8 = 1.5Ω"
    },
    {
      id: 7,
      question: "In parallel circuits, which branch carries the most current?",
      options: ["The first branch", "The last branch", "The branch with lowest resistance", "All branches carry equal current"],
      correctAnswer: 2,
      explanation: "Lower resistance branches draw more current according to Ohm's Law (I = V/R)."
    },
    {
      id: 8,
      question: "For BS 7671 compliance, parallel circuit design must consider...",
      options: ["Only cable colour", "Voltage drop, Zs, and protective device ratings", "Only the total load", "Wire temperature only"],
      correctAnswer: 1,
      explanation: "All factors affecting safety and performance must be verified according to BS 7671."
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
          <Split className="h-8 w-8 text-elec-yellow" />
          <div>
            <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
              Module 2.3.3
            </span>
            <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Parallel Circuits – Current and Voltage
            </h1>
            <p className="text-xl text-white max-w-3xl mt-2">
              Understanding how current divides and voltage remains constant across parallel branches
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
                  <li>• Voltage: same across each branch (Vbranch = Vs)</li>
                  <li>• Current splits: It = I1 + I2 + ...</li>
                  <li>• Req is lower than any single branch</li>
                  <li>• Two-resistor formula: (R1×R2)/(R1+R2)</li>
                  <li>• Failure mode: open branch doesn't stop other branches</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Spot it / Use it</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Ring finals, multiple luminaire circuits, control panels</li>
                  <li>• Load-balancing checks</li>
                  <li>• Verifying Zs/volt drop</li>
                  <li>• Socket outlet testing</li>
                  <li>• Multi-core cable applications</li>
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
              "Explain that each parallel branch sees full supply voltage",
              "Calculate branch currents using I = V/R and find total current",
              "Compute equivalent resistance of parallel combinations",
              "Apply checks aligned to BS 7671 (volt drop, Zs, device ratings)"
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
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">1. Parallel Circuit Fundamentals</h2>
          <div className="space-y-4 text-white">
            <p>
              In parallel circuits, each branch provides a separate path for current flow. This creates three fundamental rules:
            </p>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Voltage Rule</h4>
                <p className="text-sm">V<sub>branch</sub> = V<sub>supply</sub></p>
                <p className="text-xs mt-1">Each branch sees full supply voltage</p>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Current Rule</h4>
                <p className="text-sm">I<sub>total</sub> = I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub>...</p>
                <p className="text-xs mt-1">Currents add at junctions</p>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="font-semibold mb-2">Resistance Rule</h4>
                <p className="text-sm">1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + 1/R<sub>3</sub>...</p>
                <p className="text-xs mt-1">Total resistance decreases</p>
              </div>
            </div>
            <div className="bg-elec-yellow/20 border border-border/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Quick Example</h4>
              <p className="text-sm">
                12V supply, two branches: R1 = 6Ω, R2 = 12Ω<br/>
                I1 = 12V ÷ 6Ω = 2A, I2 = 12V ÷ 12Ω = 1A<br/>
                Total current = 2A + 1A = 3A<br/>
                Equivalent resistance = (6×12)/(6+12) = 4Ω
              </p>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 - Emerald */}
        <div className="border-l-4 border-elec-yellow rounded-r-lg p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">2. Current Division and Worked Examples</h2>
          <div className="space-y-4 text-white">
            <p>Current divides inversely proportional to resistance - lower resistance branches draw more current.</p>
            
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Current Divider Formula (Two Branches)</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>I₁ = I<sub>total</sub> × (R₂/(R₁+R₂))</p>
                  <p>I₂ = I<sub>total</sub> × (R₁/(R₁+R₂))</p>
                </div>
                <div>
                  <p>Or directly from Ohm's Law:</p>
                  <p>I₁ = V<sub>supply</sub>/R₁</p>
                  <p>I₂ = V<sub>supply</sub>/R₂</p>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Worked Example: Three Branch Circuit</h4>
              <div className="text-sm space-y-2">
                <p><strong>Given:</strong> 24V supply, R1=120Ω, R2=80Ω, R3=240Ω in parallel</p>
                <p><strong>Step 1:</strong> Calculate branch currents</p>
                <ul className="list-disc list-inside ml-4">
                  <li>I1 = 24V ÷ 120Ω = 0.2A</li>
                  <li>I2 = 24V ÷ 80Ω = 0.3A</li>
                  <li>I3 = 24V ÷ 240Ω = 0.1A</li>
                </ul>
                <p><strong>Step 2:</strong> Total current = 0.2 + 0.3 + 0.1 = 0.6A</p>
                <p><strong>Step 3:</strong> Equivalent resistance = 24V ÷ 0.6A = 40Ω</p>
                <p><strong>Check:</strong> 1/40 = 1/120 + 1/80 + 1/240 = 0.025 ✓</p>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 - Teal */}
        <div className="border-l-4 border-teal-500 bg-teal-500/10 rounded-r-lg p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">3. Calculation Methods and Tools</h2>
          <div className="space-y-4 text-white">
            <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Step-by-Step Method</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Identify parallel branches and supply voltage</li>
                <li>Calculate each branch current: I = V/R</li>
                <li>Sum branch currents for total current</li>
                <li>Calculate equivalent resistance: Req = Vsupply/Itotal</li>
                <li>Verify using parallel resistance formula</li>
                <li>Check against BS 7671 requirements</li>
              </ol>
            </div>

            <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Common Mistakes to Avoid</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Adding voltages instead of currents</li>
                <li>Using series resistance formula (R1+R2)</li>
                <li>Forgetting that parallel resistance is always less than smallest branch</li>
                <li>Not checking branch current ratings against cable capacity</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Interactive Calculators</h4>
              <OhmsCalculator />
              <SeriesParallelCalculators />
            </div>
          </div>
        </div>

        {/* Section 4 - Amber */}
        <div className="border-l-4 border-amber-500 rounded-r-lg p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">4. Practical Applications and BS 7671 Context</h2>
          <div className="space-y-4 text-white">
            <p>Parallel circuits form the backbone of electrical installations - from socket outlets to lighting circuits.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Measurement Techniques</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Voltage: should be equal across all branches</li>
                  <li>Current: clamp each branch, sum for verification</li>
                  <li>Resistance: measure with circuit isolated</li>
                  <li>Continuity: check each branch path</li>
                </ul>
              </div>
              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Installation Examples</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Ring final circuits (socket outlets)</li>
                  <li>Lighting circuits with multiple points</li>
                  <li>Motor control panel components</li>
                  <li>Emergency lighting systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">⚠️ BS 7671 Design Considerations</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Voltage Drop:</strong> Calculate for maximum demand, ensure ≤3% for lighting, ≤5% for power</li>
                <li><strong>Protective Devices:</strong> Must disconnect in required time based on Zs values</li>
                <li><strong>Cable Sizing:</strong> Each branch must carry its design current safely</li>
                <li><strong>Fault Protection:</strong> Verify earth fault loop impedance for each outlet</li>
                <li><strong>Load Balancing:</strong> Distribute loads evenly across phases where applicable</li>
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
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Reference: Parallel Circuit Rules</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
            <div className="bg-card border border-border/30 rounded-lg p-3">
              <h4 className="font-semibold mb-2">Voltage</h4>
              <p>V<sub>branch</sub> = V<sub>supply</sub></p>
              <p className="text-xs">Same across all branches</p>
            </div>
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-3">
              <h4 className="font-semibold mb-2">Current</h4>
              <p>I<sub>T</sub> = I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub>...</p>
              <p className="text-xs">Branch currents add</p>
            </div>
            <div className="bg-teal-500/10 border border-teal-400/30 rounded-lg p-3">
              <h4 className="font-semibold mb-2">Resistance</h4>
              <p>Two branch: (R₁×R₂)/(R₁+R₂)</p>
              <p className="text-xs">Always less than smallest R</p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz title="Test Your Understanding: Parallel Circuits" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Series Circuits
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Next: Series & Parallel Calculations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}