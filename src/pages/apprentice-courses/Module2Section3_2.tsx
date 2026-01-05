import React from "react";
import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.3.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Series Circuits - Current and Voltage
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Master current flow and voltage division in series electrical circuits
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
                <li><strong>Current:</strong> Same everywhere in series (single path).</li>
                <li><strong>Voltage:</strong> Divides between components according to resistance.</li>
                <li><strong>Total resistance:</strong> Rt = R1 + R2 + R3... (adds up)</li>
                <li><strong>Voltage divider:</strong> Vx = Vs × Rx/Rtotal</li>
                <li><strong>Failure mode:</strong> One open circuit stops everything.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> LED strings, Christmas lights, sensor dividers.</li>
                <li><strong>Use:</strong> Voltage calculations, current predictions, fault finding.</li>
                <li><strong>Apply:</strong> LED installations, control circuits, voltage drop calculations.</li>
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
              <span>State how current and voltage behave in series circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Calculate total resistance using Rt = R1 + R2 + R3...</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply the voltage divider rule to find component voltages</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Use Ohm's Law with series circuit calculations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Predict series circuit behaviour and fault conditions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Relate calculations to BS 7671 checks and safe practice</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Series Circuit Fundamentals */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Series Circuit Rules - Current and Resistance
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                In a series circuit, there is only one path for current to flow. This single path means:
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Key rules for series circuits:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Current:</strong> Identical through every component (I₁ = I₂ = I₃ = Itotal)</li>
                    <li><strong>Resistance:</strong> Values add together (Rtotal = R₁ + R₂ + R₃...)</li>
                    <li><strong>Path:</strong> Components connected end-to-end in a chain</li>
                    <li><strong>Current calculation:</strong> I = Vsupply / Rtotal</li>
                  </ul>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Example:</strong> Three 10Ω resistors in series = 30Ω total. 
                    On 12V supply: I = 12V ÷ 30Ω = 0.4A through each resistor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Voltage Division */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Voltage Division and the Voltage Divider Rule
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                In series circuits, supply voltage divides between components according to their resistance values. 
                Higher resistance takes a larger share of the voltage.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Voltage divider rule:</p>
                  <div className="bg-card border border-emerald-500/30 p-4 rounded-lg">
                    <p className="text-emerald-400 font-mono">Vx = Vsupply × Rx / Rtotal</p>
                    <p className="text-emerald-200 text-sm mt-2">Where Vx is voltage across component x</p>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Worked Example:</strong> 24V supply, R1=150Ω, R2=450Ω in series<br/>
                    • Rtotal = 150 + 450 = 600Ω<br/>
                    • V1 = 24V × 150Ω/600Ω = 6V<br/>
                    • V2 = 24V × 450Ω/600Ω = 18V<br/>
                    • Check: 6V + 18V = 24V ✓
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Calculations and Tools */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Series Circuit Calculations and Problem Solving
            </h2>
            <div className="space-y-6 text-foreground">
              
              {/* Step-by-step approach */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Step-by-Step Calculation Method</h3>
                <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                  <ol className="list-decimal pl-6 space-y-2 text-sm">
                    <li><strong>Identify the circuit:</strong> Confirm components are in series (end-to-end chain)</li>
                    <li><strong>Calculate total resistance:</strong> Rt = R₁ + R₂ + R₃... (simply add all values)</li>
                    <li><strong>Find total current:</strong> I = Vsupply ÷ Rtotal (same current everywhere)</li>
                    <li><strong>Calculate individual voltages:</strong> V = I × R for each component</li>
                    <li><strong>Verify your answer:</strong> All voltages should add up to supply voltage</li>
                  </ol>
                </div>
              </div>

              {/* Worked examples */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Worked Examples</h3>
                
                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-200 mb-2">Example 1: Three Resistor Series Circuit</h4>
                  <p className="text-slate-300 text-sm mb-2">Given: 12V supply, R₁ = 100Ω, R₂ = 200Ω, R₃ = 300Ω</p>
                  <div className="space-y-1 text-sm text-slate-200">
                    <p><strong>Step 1:</strong> Rt = 100 + 200 + 300 = 600Ω</p>
                    <p><strong>Step 2:</strong> I = 12V ÷ 600Ω = 0.02A (20mA)</p>
                    <p><strong>Step 3:</strong> V₁ = 0.02A × 100Ω = 2V</p>
                    <p><strong>Step 4:</strong> V₂ = 0.02A × 200Ω = 4V</p>
                    <p><strong>Step 5:</strong> V₃ = 0.02A × 300Ω = 6V</p>
                    <p><strong>Check:</strong> 2V + 4V + 6V = 12V ✓</p>
                  </div>
                </div>

                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-200 mb-2">Example 2: LED String Calculation</h4>
                  <p className="text-slate-300 text-sm mb-2">Given: 24V supply, 8 identical LEDs each needing 2.5V, 20mA</p>
                  <div className="space-y-1 text-sm text-slate-200">
                    <p><strong>Analysis:</strong> 8 × 2.5V = 20V (4V remaining for current limiting resistor)</p>
                    <p><strong>Required resistor:</strong> R = 4V ÷ 0.02A = 200Ω</p>
                    <p><strong>Power rating:</strong> P = 4V × 0.02A = 0.08W (use 0.25W resistor)</p>
                    <p><strong>Total circuit:</strong> 8 LEDs + 200Ω resistor in series</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-teal-300">Quick Reference Formulas</h4>
                  <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li><strong>Total resistance:</strong> Rt = R₁ + R₂ + R₃...</li>
                      <li><strong>Current (same everywhere):</strong> I = V/Rt</li>
                      <li><strong>Voltage across each:</strong> V = I × R</li>
                      <li><strong>Voltage divider:</strong> Vx = Vs × Rx/Rt</li>
                      <li><strong>Power in each:</strong> P = V × I = I²R</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-teal-300">Calculation Checkpoints</h4>
                  <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Check units: V, A, Ω consistently</li>
                      <li>Verify voltages add to supply</li>
                      <li>Current must be identical everywhere</li>
                      <li>Consider component tolerances (±5%, ±10%)</li>
                      <li>Check power ratings aren't exceeded</li>
                      <li>Follow safe isolation procedures</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Problem-solving strategies */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Problem-Solving Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <h4 className="font-bold text-emerald-400 mb-2">When values are missing:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-blue-200">
                      <li>Use Ohm's Law: V = I × R</li>
                      <li>Apply voltage divider rule</li>
                      <li>Remember: voltages must sum to supply</li>
                      <li>Current is identical throughout</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-green-400/30 p-4 rounded-lg">
                    <h4 className="font-bold text-green-300 mb-2">Fault finding approach:</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-green-200">
                      <li>No current = open circuit somewhere</li>
                      <li>Measure voltage across each component</li>
                      <li>Full supply voltage across one = it's open</li>
                      <li>Zero voltage across one = it's shorted</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Practice problems */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">Practice Problems</h3>
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <h4 className="font-bold text-emerald-400 mb-2">Try these calculations:</h4>
                  <div className="space-y-2 text-sm text-orange-200">
                    <p><strong>Problem 1:</strong> 9V battery, three 1kΩ resistors in series. Find current and voltage across each.</p>
                    <p><strong>Problem 2:</strong> 230V supply, R₁ = 50Ω, R₂ = 100Ω, current = 1.5A. What's the third resistor R₃?</p>
                    <p><strong>Problem 3:</strong> LED needs 2.1V at 15mA, supply is 12V. Calculate limiting resistor value and power.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Interactive Calculators</h3>
                <div className="space-y-4">
                  <OhmsCalculator />
                  <SeriesParallelCalculators />
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded">
                  <p className="text-yellow-200 text-sm">
                    <strong>Guidance:</strong> These calculators support understanding only. 
                    Always verify against manufacturer data and apply BS 7671 design rules for real installations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Practical Applications */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Practical Applications and BS 7671
            </h2>
            <div className="space-y-4 text-foreground">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card border border-amber-400/30 p-4 rounded-lg space-y-2">
                  <h3 className="text-amber-300 font-semibold">Where you'll find series circuits</h3>
                  <ul className="text-amber-200 text-sm list-disc pl-6 space-y-1">
                    <li>LED strings and strips</li>
                    <li>Christmas lights (older types)</li>
                    <li>Sensor voltage dividers</li>
                    <li>Internal equipment circuits</li>
                  </ul>
                </div>
                <div className="bg-card border border-amber-400/30 p-4 rounded-lg space-y-2">
                  <h3 className="text-amber-300 font-semibold">BS 7671 considerations</h3>
                  <ul className="text-amber-200 text-sm list-disc pl-6 space-y-1">
                    <li>Voltage drop calculations</li>
                    <li>Component ratings and limits</li>
                    <li>Fault loop impedance</li>
                    <li>Manufacturer specifications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <h3 className="text-emerald-400 font-semibold">Real-world example: LED string installation</h3>
                <p className="text-orange-200 text-sm mt-2">
                  LED tape with series segments must respect driver voltage/current limits. 
                  If one segment fails open, the whole string stops. Calculate total current with I = V/Rt 
                  and check cable voltage drop. Always follow manufacturer wiring guidance and verify polarity before energising.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold">Measurement and testing</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Measure current by inserting meter in series (after safe isolation)</li>
                  <li>Measure voltage across each component to verify voltage division</li>
                  <li>Check continuity to identify open circuits</li>
                  <li>Consider voltage drop over long cable runs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Units Pocket Card */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pocket card</h3>
          <UnitsPocketCard />
        </div>

        {/* Quick Reference Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick Reference Card - Series Circuits</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-400">Essential Rules</h4>
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <ul className="text-blue-200 space-y-1">
                  <li>• Current: Same everywhere (I₁ = I₂ = I₃)</li>
                  <li>• Voltage: Divides (V₁ + V₂ + V₃ = Vs)</li>
                  <li>• Resistance: Adds (Rt = R₁ + R₂ + R₃)</li>
                  <li>• Failure: One open stops all</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-400">Key Formulas</h4>
              <div className="bg-card border border-emerald-500/30 p-4 rounded-lg">
                <ul className="text-emerald-200 space-y-1 font-mono text-xs">
                  <li>• I = Vs / Rt</li>
                  <li>• Vx = Vs × Rx / Rt</li>
                  <li>• Rt = R₁ + R₂ + R₃...</li>
                  <li>• P = V × I = I²R</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <Quiz
            title="Test Your Knowledge - Series Circuits"
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Previous: Series and Parallel Overview
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Next: Parallel Circuits
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section3_2;