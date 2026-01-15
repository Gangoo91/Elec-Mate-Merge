import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import SeriesParallelCalculators from "@/components/apprentice-courses/SeriesParallelCalculators";
import OhmsCalculator from "@/components/apprentice-courses/OhmsCalculator";
import useSEO from "@/hooks/useSEO";

const TITLE = "Series Circuits - Current and Voltage - Level 2 Module 2 Section 3.2";
const DESCRIPTION = "Master series circuit behaviour: current flow, voltage division, and resistance calculations. BS 7671 aligned for UK electricians.";

const quickCheckQuestions = [
  {
    id: "series-current-rule",
    question: "In a series circuit, what is the key rule about current?",
    options: ["Current varies between components", "Current is the same through all components", "Current is zero", "Current doubles at each component"],
    correctIndex: 1,
    explanation: "In series circuits, there's only one path for current, so it must be identical through every component."
  },
  {
    id: "voltage-divider",
    question: "How does voltage behave in a series circuit?",
    options: ["Same across all components", "Divides according to resistance values", "Is always zero", "Doubles at each component"],
    correctIndex: 1,
    explanation: "In series circuits, voltage divides between components in proportion to their resistance values."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In series, current through each component is…",
    options: ["The same", "Different", "Zero", "Depends on resistance"],
    correctAnswer: 0,
    explanation: "One path means the same current throughout."
  },
  {
    id: 2,
    question: "The total resistance of three series resistors is…",
    options: ["Product of all", "Sum of all", "Average of all", "Least of all"],
    correctAnswer: 1,
    explanation: "Series resistances add directly."
  },
  {
    id: 3,
    question: "Voltage distribution in series depends on…",
    options: ["Wire colour", "Each resistor's value", "Ambient temperature only", "Conductor CSA"],
    correctAnswer: 1,
    explanation: "Higher resistance takes a larger share of the supply voltage."
  },
  {
    id: 4,
    question: "Two equal resistors in series on 10 V drop…",
    options: ["10 V each", "5 V each", "0 V each", "Random"],
    correctAnswer: 1,
    explanation: "Equal R shares voltage equally."
  },
  {
    id: 5,
    question: "Which statement matches BS 7671 practice?",
    options: ["Always design series lighting on site", "Use manufacturer data and verify voltage drop", "Ignore fault current values", "Parallel branches never used"],
    correctAnswer: 1,
    explanation: "Design/verification must use correct data to BS 7671."
  },
  {
    id: 6,
    question: "In a voltage divider with R1=100Ω, R2=200Ω on 12V, what is V1?",
    options: ["4V", "6V", "8V", "12V"],
    correctAnswer: 0,
    explanation: "V1 = 12V × 100Ω/(100Ω+200Ω) = 12V × 100/300 = 4V"
  },
  {
    id: 7,
    question: "What happens if one component in a series circuit fails open?",
    options: ["Other components work normally", "All components stop working", "Only that component stops", "Current increases"],
    correctAnswer: 1,
    explanation: "Open circuit breaks the single path, stopping all current flow."
  },
  {
    id: 8,
    question: "Series circuits are commonly found in…",
    options: ["Household socket rings", "LED strings and chains", "Main distribution boards", "Individual room lighting"],
    correctAnswer: 1,
    explanation: "LED strings often use series connections for voltage division and current limiting."
  },
  {
    id: 9,
    question: "To measure current in a series circuit, you need to…",
    options: ["Measure across each component", "Insert meter in series with the circuit", "Measure between supply terminals", "Use a clamp around all wires"],
    correctAnswer: 1,
    explanation: "Current meters must be in series with the circuit to measure current flow."
  },
  {
    id: 10,
    question: "The voltage divider rule is most useful for…",
    options: ["Calculating total power", "Finding voltage across individual components", "Measuring current", "Determining wire size"],
    correctAnswer: 1,
    explanation: "Voltage divider rule calculates how supply voltage divides across series components."
  }
];

const faqs = [
  {
    question: "Why is current the same everywhere in a series circuit?",
    answer: "Because there's only one path for current to flow. Current cannot accumulate or disappear - what flows into one component must flow out of it and into the next. It's like water flowing through a single pipe."
  },
  {
    question: "How do I use the voltage divider rule in practice?",
    answer: "The voltage divider rule (Vx = Vsupply × Rx/Rtotal) lets you predict voltage across any component in a series chain. This is essential for LED strings, sensor circuits, and understanding how voltage drops distribute."
  },
  {
    question: "What's the most common mistake with series circuits?",
    answer: "Assuming current changes between components. Remember: current is identical throughout the entire series path - only voltage changes as it divides between components."
  },
  {
    question: "How does this relate to BS 7671 installations?",
    answer: "While most building circuits are parallel, series effects appear in: LED strings, voltage dividers in controls, fault loop impedance calculations, and voltage drop across cable runs."
  },
  {
    question: "Why do series resistances simply add together?",
    answer: "Each resistor opposes current flow, and in series they're all in the same current path. It's like having multiple obstacles in a single lane - each adds to the total resistance to flow."
  },
  {
    question: "What safety considerations apply to series circuits?",
    answer: "Always isolate before measuring. Remember that opening a series circuit stops all current flow, but closing a short circuit can cause dangerous current surges. Follow safe isolation procedures."
  }
];

const Module2Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 2.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Series Circuits - Current and Voltage
          </h1>
          <p className="text-white/80">
            Master current flow and voltage division in series electrical circuits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Current:</strong> Same everywhere in series (single path)</li>
              <li><strong>Voltage:</strong> Divides between components according to resistance</li>
              <li><strong>Total resistance:</strong> Rt = R1 + R2 + R3... (adds up)</li>
              <li><strong>Voltage divider:</strong> Vx = Vs × Rx/Rtotal</li>
              <li><strong>Failure mode:</strong> One open circuit stops everything</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> LED strings, Christmas lights, sensor dividers</li>
              <li><strong>Use:</strong> Voltage calculations, current predictions, fault finding</li>
              <li><strong>Apply:</strong> LED installations, control circuits, voltage drop calculations</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes - Simple list */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State how current and voltage behave in series circuits",
              "Calculate total resistance using Rt = R1 + R2 + R3...",
              "Apply the voltage divider rule to find component voltages",
              "Use Ohm's Law with series circuit calculations",
              "Predict series circuit behaviour and fault conditions",
              "Relate calculations to BS 7671 checks and safe practice"
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

        {/* Section 1: Series Circuit Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Series Circuit Rules - Current and Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a series circuit, there is only one path for current to flow. This single path means:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key rules for series circuits:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Current:</strong> Identical through every component (I₁ = I₂ = I₃ = Itotal)</li>
                <li><strong>Resistance:</strong> Values add together (Rtotal = R₁ + R₂ + R₃...)</li>
                <li><strong>Path:</strong> Components connected end-to-end in a chain</li>
                <li><strong>Current calculation:</strong> I = Vsupply / Rtotal</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Example:</strong> Three 10Ω resistors in series = 30Ω total.
              On 12V supply: I = 12V ÷ 30Ω = 0.4A through each resistor.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Voltage Division */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Voltage Division and the Voltage Divider Rule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In series circuits, supply voltage divides between components according to their resistance values.
              Higher resistance takes a larger share of the voltage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage divider rule:</p>
              <p className="text-elec-yellow font-mono text-sm">Vx = Vsupply × Rx / Rtotal</p>
              <p className="text-white/70 text-sm mt-1">Where Vx is voltage across component x</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Worked Example:</strong> 24V supply, R1=150Ω, R2=450Ω in series<br />
              Rtotal = 150 + 450 = 600Ω<br />
              V1 = 24V × 150Ω/600Ω = 6V<br />
              V2 = 24V × 450Ω/600Ω = 18V<br />
              Check: 6V + 18V = 24V
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Calculations and Problem Solving */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Series Circuit Calculations and Problem Solving
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            {/* Step-by-step approach */}
            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Calculation Method</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal">
                <li>Identify the circuit: Confirm components are in series (end-to-end chain)</li>
                <li>Calculate total resistance: Rt = R₁ + R₂ + R₃... (simply add all values)</li>
                <li>Find total current: I = Vsupply ÷ Rtotal (same current everywhere)</li>
                <li>Calculate individual voltages: V = I × R for each component</li>
                <li>Verify your answer: All voltages should add up to supply voltage</li>
              </ol>
            </div>

            {/* Worked examples */}
            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Examples</p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-white mb-1">Example 1: Three Resistor Series Circuit</p>
                  <p className="text-white/70 text-sm mb-2">Given: 12V supply, R₁ = 100Ω, R₂ = 200Ω, R₃ = 300Ω</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>Step 1: Rt = 100 + 200 + 300 = 600Ω</li>
                    <li>Step 2: I = 12V ÷ 600Ω = 0.02A (20mA)</li>
                    <li>Step 3: V₁ = 0.02A × 100Ω = 2V</li>
                    <li>Step 4: V₂ = 0.02A × 200Ω = 4V</li>
                    <li>Step 5: V₃ = 0.02A × 300Ω = 6V</li>
                    <li>Check: 2V + 4V + 6V = 12V</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-white mb-1">Example 2: LED String Calculation</p>
                  <p className="text-white/70 text-sm mb-2">Given: 24V supply, 8 identical LEDs each needing 2.5V, 20mA</p>
                  <ul className="text-sm text-white space-y-0.5">
                    <li>Analysis: 8 × 2.5V = 20V (4V remaining for current limiting resistor)</li>
                    <li>Required resistor: R = 4V ÷ 0.02A = 200Ω</li>
                    <li>Power rating: P = 4V × 0.02A = 0.08W (use 0.25W resistor)</li>
                    <li>Total circuit: 8 LEDs + 200Ω resistor in series</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Reference Formulas</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Total resistance:</strong> Rt = R₁ + R₂ + R₃...</li>
                  <li><strong>Current (same everywhere):</strong> I = V/Rt</li>
                  <li><strong>Voltage across each:</strong> V = I × R</li>
                  <li><strong>Voltage divider:</strong> Vx = Vs × Rx/Rt</li>
                  <li><strong>Power in each:</strong> P = V × I = I²R</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Checkpoints</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Check units: V, A, Ω consistently</li>
                  <li>Verify voltages add to supply</li>
                  <li>Current must be identical everywhere</li>
                  <li>Consider component tolerances (±5%, ±10%)</li>
                  <li>Check power ratings aren't exceeded</li>
                  <li>Follow safe isolation procedures</li>
                </ul>
              </div>
            </div>

            {/* Problem-solving strategies */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When values are missing:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Use Ohm's Law: V = I × R</li>
                  <li>Apply voltage divider rule</li>
                  <li>Remember: voltages must sum to supply</li>
                  <li>Current is identical throughout</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Fault finding approach:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>No current = open circuit somewhere</li>
                  <li>Measure voltage across each component</li>
                  <li>Full supply voltage across one = it's open</li>
                  <li>Zero voltage across one = it's shorted</li>
                </ul>
              </div>
            </div>

            {/* Practice problems */}
            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practice Problems</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Problem 1:</strong> 9V battery, three 1kΩ resistors in series. Find current and voltage across each.</li>
                <li><strong>Problem 2:</strong> 230V supply, R₁ = 50Ω, R₂ = 100Ω, current = 1.5A. What's the third resistor R₃?</li>
                <li><strong>Problem 3:</strong> LED needs 2.1V at 15mA, supply is 12V. Calculate limiting resistor value and power.</li>
              </ul>
            </div>

            {/* Interactive Calculators */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-white">Interactive Calculators</p>
              <OhmsCalculator />
              <SeriesParallelCalculators />
              <p className="text-sm text-elec-yellow/70">
                <strong>Guidance:</strong> These calculators support understanding only.
                Always verify against manufacturer data and apply BS 7671 design rules for real installations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Practical Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Practical Applications and BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where you'll find series circuits</p>
                <ul className="text-sm text-white space-y-1">
                  <li>LED strings and strips</li>
                  <li>Christmas lights (older types)</li>
                  <li>Sensor voltage dividers</li>
                  <li>Internal equipment circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Voltage drop calculations</li>
                  <li>Component ratings and limits</li>
                  <li>Fault loop impedance</li>
                  <li>Manufacturer specifications</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Real-world example: LED string installation</strong><br />
              LED tape with series segments must respect driver voltage/current limits.
              If one segment fails open, the whole string stops. Calculate total current with I = V/Rt
              and check cable voltage drop. Always follow manufacturer wiring guidance and verify polarity before energising.
            </p>

            <div>
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement and testing</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measure current by inserting meter in series (after safe isolation)</li>
                <li>Measure voltage across each component to verify voltage division</li>
                <li>Check continuity to identify open circuits</li>
                <li>Consider voltage drop over long cable runs</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference Card - Series Circuits</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Essential Rules</p>
                <ul className="space-y-0.5">
                  <li>Current: Same everywhere (I₁ = I₂ = I₃)</li>
                  <li>Voltage: Divides (V₁ + V₂ + V₃ = Vs)</li>
                  <li>Resistance: Adds (Rt = R₁ + R₂ + R₃)</li>
                  <li>Failure: One open stops all</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5 font-mono">
                  <li>I = Vs / Rt</li>
                  <li>Vx = Vs × Rx / Rt</li>
                  <li>Rt = R₁ + R₂ + R₃...</li>
                  <li>P = V × I = I²R</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge - Series Circuits"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Module2Section3_2;
