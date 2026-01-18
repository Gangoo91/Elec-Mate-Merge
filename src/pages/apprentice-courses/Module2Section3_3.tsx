import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  },
  {
    id: 9,
    question: "What happens when you add more branches to a parallel circuit?",
    options: ["Total resistance increases", "Total current decreases", "Total resistance decreases and total current increases", "Nothing changes"],
    correctAnswer: 2,
    explanation: "Each new parallel branch provides another current path, reducing total resistance and increasing total current drawn from the supply."
  },
  {
    id: 10,
    question: "Three identical 60Ω resistors in parallel have an equivalent resistance of...",
    options: ["180Ω", "60Ω", "20Ω", "10Ω"],
    correctAnswer: 2,
    explanation: "For identical resistors in parallel: Req = R/n = 60Ω/3 = 20Ω"
  }
];

export default function Module2Section3_3() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content - Full width, minimal padding */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Parallel Circuits - Current and Voltage
          </h1>
          <p className="text-white/80">
            Understanding how current divides and voltage remains constant across parallel branches
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage:</strong> Same across each branch (Vbranch = Vs)</li>
              <li><strong>Current splits:</strong> It = I1 + I2 + ...</li>
              <li><strong>Req:</strong> Lower than any single branch</li>
              <li><strong>Two-resistor formula:</strong> (R1×R2)/(R1+R2)</li>
              <li><strong>Failure mode:</strong> Open branch doesn't stop other branches</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Ring finals, multiple luminaire circuits, control panels</li>
              <li><strong>Use:</strong> Load-balancing checks, verifying Zs/volt drop</li>
              <li><strong>Apply:</strong> Socket outlet testing, multi-core cable applications</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain that each parallel branch sees full supply voltage",
              "Calculate branch currents using I = V/R and find total current",
              "Compute equivalent resistance of parallel combinations",
              "Apply checks aligned to BS 7671 (volt drop, Zs, device ratings)"
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

        {/* Section 1: Parallel Circuit Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Parallel Circuit Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In parallel circuits, each branch provides a separate path for current flow. This creates three fundamental rules:
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Voltage Rule</p>
                <p className="text-elec-yellow text-xs">V<sub>branch</sub> = V<sub>supply</sub></p>
                <p className="text-white/70 text-xs mt-1">Each branch sees full supply voltage</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Current Rule</p>
                <p className="text-elec-yellow text-xs">I<sub>total</sub> = I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub>...</p>
                <p className="text-white/70 text-xs mt-1">Currents add at junctions</p>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-1">Resistance Rule</p>
                <p className="text-elec-yellow text-xs">1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub>...</p>
                <p className="text-white/70 text-xs mt-1">Total resistance decreases</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Quick Example:</strong> 12V supply, two branches: R1 = 6Ω, R2 = 12Ω<br />
              I1 = 12V ÷ 6Ω = 2A, I2 = 12V ÷ 12Ω = 1A<br />
              Total current = 2A + 1A = 3A<br />
              Equivalent resistance = (6×12)/(6+12) = 4Ω
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Current Division and Worked Examples */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Current Division and Worked Examples
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Current divides inversely proportional to resistance - lower resistance branches draw more current.</p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Divider Formula (Two Branches)</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
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

            <div className="p-4 rounded-lg bg-white/5">
              <p className="font-medium text-white mb-2">Worked Example: Three Branch Circuit</p>
              <p className="text-white/70 text-sm mb-2">Given: 24V supply, R1=120Ω, R2=80Ω, R3=240Ω in parallel</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Step 1:</strong> Calculate branch currents</li>
                <li className="ml-4">I1 = 24V ÷ 120Ω = 0.2A</li>
                <li className="ml-4">I2 = 24V ÷ 80Ω = 0.3A</li>
                <li className="ml-4">I3 = 24V ÷ 240Ω = 0.1A</li>
                <li><strong>Step 2:</strong> Total current = 0.2 + 0.3 + 0.1 = 0.6A</li>
                <li><strong>Step 3:</strong> Equivalent resistance = 24V ÷ 0.6A = 40Ω</li>
                <li><strong>Check:</strong> 1/40 = 1/120 + 1/80 + 1/240 = 0.025</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Calculation Methods and Tools */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calculation Methods and Tools
          </h2>
          <div className="text-white space-y-6 leading-relaxed">
            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Method</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                <li>Identify parallel branches and supply voltage</li>
                <li>Calculate each branch current: I = V/R</li>
                <li>Sum branch currents for total current</li>
                <li>Calculate equivalent resistance: Req = Vsupply/Itotal</li>
                <li>Verify using parallel resistance formula</li>
                <li>Check against BS 7671 requirements</li>
              </ol>
            </div>

            <div>
              <p className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Adding voltages instead of currents</li>
                <li>Using series resistance formula (R1+R2)</li>
                <li>Forgetting that parallel resistance is always less than smallest branch</li>
                <li>Not checking branch current ratings against cable capacity</li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Interactive Calculators</p>
              <OhmsCalculator />
              <SeriesParallelCalculators />
            </div>
          </div>
        </section>

        {/* Section 4: Practical Applications and BS 7671 Context */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Applications and BS 7671 Context
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Parallel circuits form the backbone of electrical installations - from socket outlets to lighting circuits.</p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Techniques</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage: should be equal across all branches</li>
                  <li>Current: clamp each branch, sum for verification</li>
                  <li>Resistance: measure with circuit isolated</li>
                  <li>Continuity: check each branch path</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Examples</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ring final circuits (socket outlets)</li>
                  <li>Lighting circuits with multiple points</li>
                  <li>Motor control panel components</li>
                  <li>Emergency lighting systems</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Design Considerations:</strong><br />
              Voltage Drop: Calculate for maximum demand, ensure 3% for lighting, 5% for power<br />
              Protective Devices: Must disconnect in required time based on Zs values<br />
              Cable Sizing: Each branch must carry its design current safely<br />
              Fault Protection: Verify earth fault loop impedance for each outlet<br />
              Load Balancing: Distribute loads evenly across phases where applicable
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Parallel Circuit Rules</h3>
            <div className="grid grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Voltage</p>
                <p className="text-elec-yellow">V<sub>branch</sub> = V<sub>supply</sub></p>
                <p className="text-white/70">Same across all branches</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Current</p>
                <p className="text-elec-yellow">I<sub>T</sub> = I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub>...</p>
                <p className="text-white/70">Branch currents add</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Resistance</p>
                <p className="text-elec-yellow">(R₁×R₂)/(R₁+R₂)</p>
                <p className="text-white/70">Always less than smallest R</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Understanding: Parallel Circuits" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
}
