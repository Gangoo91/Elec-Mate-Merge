import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function Module2Section3_4() {
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
            <span>Module 2.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Series and Parallel Calculations
          </h1>
          <p className="text-white/80">
            Combining series and parallel rules for complex circuit analysis and real-world applications
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Series:</strong> I same, V divides, Rt adds</li>
              <li><strong>Parallel:</strong> V same, currents add, 1/Rt sums</li>
              <li><strong>Use dividers:</strong> Vx = Vs×Rx/Rt, Ibranch = Vs/Rbranch</li>
              <li><strong>Combine step-by-step:</strong> Reduce then solve</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> LED tape networks, resistor networks</li>
              <li><strong>Use:</strong> Mixed series-parallel lighting, control panel components</li>
              <li><strong>Apply:</strong> Checking manufacturer limits, load distribution analysis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate total resistance for series and parallel combinations",
              "Apply Ohm's Law to find current and voltage in mixed networks",
              "Use voltage and current divider principles effectively",
              "Link calculation results to BS 7671 design requirements"
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

        {/* Section 1: Mixed Network Reduction Strategy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Mixed Network Reduction Strategy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Complex circuits combine series and parallel elements. Success comes from systematic reduction:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Series Rules</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current same throughout: I₁ = I₂ = I₃</li>
                  <li>Voltages add: V<sub>T</sub> = V₁ + V₂ + V₃</li>
                  <li>Resistances add: R<sub>T</sub> = R₁ + R₂ + R₃</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Rules</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage same: V₁ = V₂ = V₃ = V<sub>S</sub></li>
                  <li>Currents add: I<sub>T</sub> = I₁ + I₂ + I₃</li>
                  <li>Reciprocals: 1/R<sub>T</sub> = 1/R₁ + 1/R₂ + 1/R₃</li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reduction Steps</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                <li>Identify clear parallel sections and reduce them first</li>
                <li>Identify remaining series sections and combine them</li>
                <li>Continue until one equivalent resistance remains</li>
                <li>Work backwards to find individual currents and voltages</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Worked Examples */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Worked Examples with Step-by-Step Solutions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="font-medium text-white mb-2">Example 1: Series-in-Parallel Network</p>
              <p className="text-white/70 text-sm mb-2">Given: 24V supply, (R1=150Ω + R2=450Ω in series) || R3=120Ω</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Step 1:</strong> Reduce series section: R<sub>series</sub> = 150 + 450 = 600Ω</li>
                <li><strong>Step 2:</strong> Parallel combination: R<sub>T</sub> = (600×120)/(600+120) = 100Ω</li>
                <li><strong>Step 3:</strong> Total current: I<sub>T</sub> = 24V ÷ 100Ω = 0.24A</li>
                <li><strong>Step 4:</strong> Branch currents:</li>
                <li className="ml-4">Series branch: I<sub>series</sub> = 24V ÷ 600Ω = 0.04A</li>
                <li className="ml-4">Parallel branch: I₃ = 24V ÷ 120Ω = 0.2A</li>
                <li><strong>Check:</strong> 0.04A + 0.2A = 0.24A</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <p className="font-medium text-white mb-2">Example 2: Parallel-in-Series Network</p>
              <p className="text-white/70 text-sm mb-2">Given: 12V supply, (R1=100Ω || R2=300Ω) + R3=50Ω in series</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Step 1:</strong> Reduce parallel section: R<sub>parallel</sub> = (100×300)/(100+300) = 75Ω</li>
                <li><strong>Step 2:</strong> Total resistance: R<sub>T</sub> = 75 + 50 = 125Ω</li>
                <li><strong>Step 3:</strong> Total current: I<sub>T</sub> = 12V ÷ 125Ω = 0.096A</li>
                <li><strong>Step 4:</strong> Voltage across parallel section: V<sub>parallel</sub> = 0.096A × 75Ω = 7.2V</li>
                <li><strong>Step 5:</strong> Branch currents in parallel section:</li>
                <li className="ml-4">I₁ = 7.2V ÷ 100Ω = 0.072A</li>
                <li className="ml-4">I₂ = 7.2V ÷ 300Ω = 0.024A</li>
                <li><strong>Check:</strong> 0.072A + 0.024A = 0.096A</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Divider Circuits and Interactive Tools */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Divider Circuits and Interactive Tools
          </h2>
          <div className="text-white space-y-6 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Divider (Series)</p>
                <p className="text-elec-yellow font-mono text-sm mb-2">V<sub>x</sub> = V<sub>s</sub> × (R<sub>x</sub>/(R₁+R₂+...))</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage splits proportionally to resistance</li>
                  <li>Higher resistance gets more voltage</li>
                  <li>Used in sensor circuits and LED drivers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Divider (Parallel)</p>
                <p className="text-elec-yellow font-mono text-sm mb-2">I₁ = I<sub>T</sub> × (R₂/(R₁+R₂))</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Current splits inversely to resistance</li>
                  <li>Lower resistance gets more current</li>
                  <li>Or directly: I<sub>branch</sub> = V<sub>s</sub>/R<sub>branch</sub></li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Problem-Solving Strategy</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                <li>Draw the circuit clearly, labeling all components</li>
                <li>Identify series and parallel sections systematically</li>
                <li>Reduce the circuit step by step, working from the "inside out"</li>
                <li>Calculate total current using Ohm's Law</li>
                <li>Work backwards to find individual voltages and currents</li>
                <li>Verify results using Kirchhoff's Laws</li>
              </ol>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Interactive Calculation Tools</p>
              <OhmsCalculator />
              <SeriesParallelCalculators />
              <p className="text-sm text-elec-yellow/70">
                Use these tools to verify your manual calculations and explore different scenarios quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Real-World Applications and BS 7671 Context */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Real-World Applications and BS 7671 Context
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Mixed series-parallel circuits appear throughout electrical installations and equipment.</p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>LED strip arrays with current limiting resistors</li>
                  <li>Control panel indicator circuits</li>
                  <li>Multi-tap transformer secondary circuits</li>
                  <li>Emergency lighting battery backup circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Verification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage measurements across series elements</li>
                  <li>Current measurements in parallel branches</li>
                  <li>Power calculations for heat dissipation</li>
                  <li>Continuity and insulation testing</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 7671 Design Requirements:</strong><br />
              Voltage Drop: Calculate actual voltage at load terminals, considering all series resistance<br />
              Current Capacity: Ensure each conductor can carry its actual current safely<br />
              Protective Devices: Select based on highest current path and coordination requirements<br />
              Fault Conditions: Consider how series-parallel arrangements affect fault current paths<br />
              Load Distribution: Balance loads appropriately across supply phases<br />
              Manufacturer Limits: Respect equipment ratings for series/parallel connections
            </p>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Best Practices</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Document circuit configurations clearly on as-built drawings</li>
                <li>Label series and parallel sections for future maintenance</li>
                <li>Consider failure modes - how does one component failure affect others?</li>
                <li>Test each section individually during commissioning</li>
              </ul>
            </div>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Mixed Circuit Rules</h3>
            <div className="grid grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Series Elements</p>
                <p className="text-elec-yellow">R<sub>T</sub> = R₁ + R₂ + R₃...</p>
                <p className="text-white/70">I same, V divides</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Parallel Elements</p>
                <p className="text-elec-yellow">1/R<sub>T</sub> = 1/R₁ + 1/R₂...</p>
                <p className="text-white/70">V same, I adds</p>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Mixed Networks</p>
                <p className="text-elec-yellow">Reduce step by step</p>
                <p className="text-white/70">Verify with KVL/KCL</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Understanding: Series & Parallel Calculations" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
}
