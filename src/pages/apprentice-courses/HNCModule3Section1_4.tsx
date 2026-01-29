import { ArrowLeft, GitBranch, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Parallel Circuits - HNC Module 3 Section 1.4";
const DESCRIPTION = "Master parallel circuit analysis for building services: voltage distribution, current division, equivalent resistance calculations, and practical applications in lighting, socket outlets, and distribution boards.";

const quickCheckQuestions = [
  {
    id: "parallel-voltage",
    question: "In a parallel circuit, what happens to voltage across each branch?",
    options: ["It divides equally between branches", "It is the same across all branches", "It depends on resistance values", "It increases with each branch"],
    correctIndex: 1,
    explanation: "In parallel circuits, all branches share the same two connection points, so the voltage across each branch is identical - this is a fundamental characteristic of parallel connections."
  },
  {
    id: "parallel-current",
    question: "Three identical 100 ohm resistors are connected in parallel. What is the total resistance?",
    options: ["300 ohms", "100 ohms", "33.3 ohms", "50 ohms"],
    correctIndex: 2,
    explanation: "For identical resistors in parallel: RT = R/n = 100/3 = 33.3 ohms. Alternatively: 1/RT = 1/100 + 1/100 + 1/100 = 3/100, so RT = 100/3 = 33.3 ohms"
  },
  {
    id: "current-divider",
    question: "A 10A current divides between two parallel branches: 30 ohms and 60 ohms. What current flows through the 30 ohm branch?",
    options: ["3.33A", "5A", "6.67A", "10A"],
    correctIndex: 2,
    explanation: "Using the current divider rule: I1 = IT x (R2/(R1+R2)) = 10 x (60/(30+60)) = 10 x (60/90) = 6.67A. More current flows through the lower resistance path."
  },
  {
    id: "lighting-circuit",
    question: "Why are lighting circuits wired in parallel rather than series?",
    options: ["It's cheaper to install", "Each lamp gets full voltage and operates independently", "It uses less cable", "Series wiring is not allowed"],
    correctIndex: 1,
    explanation: "Parallel wiring ensures each lamp receives full supply voltage (230V) and operates independently - if one lamp fails, others continue working. Series wiring would divide voltage and cause all lamps to fail if one breaks."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the defining characteristic of a parallel circuit?",
    options: [
      "Components share the same current",
      "Components are connected end-to-end",
      "Components share the same voltage",
      "Total resistance equals the sum of all resistors"
    ],
    correctAnswer: 2,
    explanation: "In a parallel circuit, all components are connected across the same two points, so they all share the same voltage. Current divides between branches."
  },
  {
    id: 2,
    question: "Calculate the total resistance of 20 ohm and 30 ohm resistors in parallel.",
    options: ["50 ohms", "25 ohms", "12 ohms", "10 ohms"],
    correctAnswer: 2,
    explanation: "Using product over sum: RT = (20 x 30)/(20 + 30) = 600/50 = 12 ohms. The parallel combination is always less than the smallest individual resistor."
  },
  {
    id: 3,
    question: "A ring final circuit has two parallel 2.5mm squared cable paths. What is the effective cable size?",
    options: ["2.5mm squared", "5mm squared", "1.25mm squared", "3.75mm squared"],
    correctAnswer: 1,
    explanation: "With two parallel cable paths, the effective cross-sectional area doubles: 2.5mm squared + 2.5mm squared = 5mm squared, giving the ring final its higher current capacity."
  },
  {
    id: 4,
    question: "What happens to total circuit resistance when another resistor is added in parallel?",
    options: ["It increases", "It decreases", "It stays the same", "It doubles"],
    correctAnswer: 1,
    explanation: "Adding parallel paths always decreases total resistance because current has more routes to flow through. More paths = less overall opposition to current."
  },
  {
    id: 5,
    question: "A 230V supply feeds three parallel 1kW heaters. What is the total supply current?",
    options: ["4.35A", "8.7A", "13A", "39A"],
    correctAnswer: 2,
    explanation: "Total power = 3 x 1kW = 3kW. Total current I = P/V = 3000/230 = 13A. Each heater draws 4.35A, and these add together for the supply current."
  },
  {
    id: 6,
    question: "Using the current divider rule, if IT = 12A flows into 40 ohm and 80 ohm in parallel, what current flows through the 40 ohm resistor?",
    options: ["4A", "6A", "8A", "12A"],
    correctAnswer: 2,
    explanation: "I1 = IT x (R2/(R1+R2)) = 12 x (80/(40+80)) = 12 x (80/120) = 8A. The lower resistance carries the larger current (inverse relationship)."
  },
  {
    id: 7,
    question: "What is the equivalent resistance of four 100 ohm resistors in parallel?",
    options: ["400 ohms", "100 ohms", "50 ohms", "25 ohms"],
    correctAnswer: 3,
    explanation: "For n identical resistors in parallel: RT = R/n = 100/4 = 25 ohms. This is a useful shortcut for identical resistors."
  },
  {
    id: 8,
    question: "In a distribution board, why are final circuits connected in parallel rather than series?",
    options: [
      "To share the load equally",
      "To ensure each circuit gets full voltage and can be individually protected",
      "To reduce cable costs",
      "Series connection is prohibited by regulations"
    ],
    correctAnswer: 1,
    explanation: "Parallel connection ensures each final circuit receives full supply voltage (230V) and can be individually protected by its own MCB. Fault in one circuit doesn't affect others."
  },
  {
    id: 9,
    question: "A lighting circuit has 8 luminaires, each drawing 0.5A at 230V. What is the circuit current?",
    options: ["0.5A", "2A", "4A", "8A"],
    correctAnswer: 2,
    explanation: "In parallel, currents add: IT = 8 x 0.5A = 4A. Each luminaire gets full voltage and draws its rated current, with all currents combining at the supply."
  },
  {
    id: 10,
    question: "Two cables supply a distribution board: each has 0.1 ohm resistance. What is the effective supply resistance?",
    options: ["0.2 ohms", "0.1 ohms", "0.05 ohms", "0.15 ohms"],
    correctAnswer: 2,
    explanation: "Parallel cables: RT = (R x R)/(R + R) = (0.1 x 0.1)/(0.1 + 0.1) = 0.01/0.2 = 0.05 ohms. Or for identical resistors: RT = R/n = 0.1/2 = 0.05 ohms"
  }
];

const faqs = [
  {
    question: "Why is parallel resistance always less than the smallest individual resistor?",
    answer: "Adding parallel branches provides additional paths for current flow. More paths mean less total opposition (resistance) to current. Think of it like adding lanes to a motorway - more lanes reduce congestion even though each lane has the same capacity."
  },
  {
    question: "How do I remember the current divider rule?",
    answer: "Current takes the path of least resistance - literally. The formula I1 = IT x (R2/(R1+R2)) shows the current through R1 depends on R2 (the other resistance). Remember: lower resistance = higher current. It's the opposite fraction to what you might expect."
  },
  {
    question: "Why do ring final circuits use parallel cable paths?",
    answer: "A ring final creates two parallel paths from the consumer unit to any socket. This effectively doubles the cable capacity (2.5mm squared becomes 5mm squared effective) and reduces voltage drop. BS 7671 permits 32A protection because of this parallel arrangement."
  },
  {
    question: "What happens if one branch of a parallel circuit fails open?",
    answer: "If one branch opens (fails), the other branches continue to operate normally at full voltage. Only the failed branch stops conducting. This is why parallel circuits are preferred for lighting and socket outlets - one failure doesn't affect others."
  },
  {
    question: "How do I calculate parallel resistance quickly for two resistors?",
    answer: "Use the product-over-sum formula: RT = (R1 x R2)/(R1 + R2). For example, 60 ohms and 40 ohms: RT = (60 x 40)/(60 + 40) = 2400/100 = 24 ohms. For identical resistors, it's even simpler: RT = R/n."
  },
  {
    question: "Why must we balance loads across phases in three-phase distribution?",
    answer: "Unbalanced loads cause neutral current, increasing losses and potentially overloading the neutral conductor. Good practice distributes single-phase loads evenly across all three phases, effectively creating parallel loads on each phase to share the total building load."
  }
];

const HNCModule3Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <GitBranch className="h-4 w-4" />
            <span>Module 3.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Parallel Circuits
          </h1>
          <p className="text-white/80">
            Understanding voltage distribution, current division, and equivalent resistance in parallel networks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Voltage:</strong> Same across all parallel branches</li>
              <li className="pl-1"><strong>Current:</strong> Divides between branches (IT = I1 + I2 + I3...)</li>
              <li className="pl-1"><strong>Resistance:</strong> 1/RT = 1/R1 + 1/R2 + 1/R3...</li>
              <li className="pl-1"><strong>Total R:</strong> Always less than smallest individual R</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Applications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Lighting circuits:</strong> Each luminaire at full voltage</li>
              <li className="pl-1"><strong>Socket outlets:</strong> Independent operation</li>
              <li className="pl-1"><strong>Ring finals:</strong> Parallel cable paths for capacity</li>
              <li className="pl-1"><strong>Distribution boards:</strong> Parallel final circuits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify parallel circuit configurations and their characteristics",
              "Calculate total resistance using reciprocal and product/sum methods",
              "Apply the current divider rule to determine branch currents",
              "Analyse lighting circuits as parallel networks",
              "Understand ring final circuit parallel paths",
              "Design balanced loads for distribution boards"
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
              In a parallel circuit, components are connected across the same two points, creating
              multiple paths for current flow. This is the most common configuration in building
              electrical installations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-4">Key Parallel Circuit Rules</p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30 border border-blue-500/30">
                  <p className="text-lg font-bold text-blue-400 mb-1">VT = V1 = V2 = V3</p>
                  <p className="text-white/70 text-xs">Voltage is the SAME</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-green-500/30">
                  <p className="text-lg font-bold text-green-400 mb-1">IT = I1 + I2 + I3</p>
                  <p className="text-white/70 text-xs">Currents ADD up</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-elec-yellow/30">
                  <p className="text-lg font-bold text-elec-yellow mb-1">RT &lt; Rsmallest</p>
                  <p className="text-white/70 text-xs">Total R is LESS</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why voltage is the same across all branches:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All branches connect to the same two nodes (connection points)</li>
                <li className="pl-1">Voltage is a potential difference between two points</li>
                <li className="pl-1">Each branch experiences the full supply voltage</li>
                <li className="pl-1">This is why 230V luminaires work correctly on lighting circuits</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why current divides between branches:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Current has multiple paths from source to load</li>
                <li className="pl-1">More current flows through lower resistance paths</li>
                <li className="pl-1">Total current equals the sum of all branch currents</li>
                <li className="pl-1">Using Kirchhoff's Current Law: current in = current out at any node</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Parallel circuits provide redundancy - if one branch fails open, the others continue operating normally.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Calculating Total Resistance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calculating Total Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calculating equivalent resistance is essential for determining circuit current and
              power consumption. There are two main methods depending on the number of resistors.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Method 1: Reciprocal Formula (Any Number)</p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>1/RT = 1/R1 + 1/R2 + 1/R3 + ...</strong></p>
              </div>
              <p className="text-sm text-white/80 mb-3">
                Calculate the sum of reciprocals, then take the reciprocal of the result.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Example:</strong> 20 ohms, 30 ohms, and 60 ohms in parallel</p>
                <p className="mt-2">1/RT = 1/20 + 1/30 + 1/60</p>
                <p>1/RT = 0.05 + 0.0333 + 0.0167 = 0.1</p>
                <p>RT = 1/0.1 = <strong>10 ohms</strong></p>
                <p className="text-white/60 mt-2">Note: 10 ohms &lt; 20 ohms (the smallest resistor)</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Method 2: Product Over Sum (Two Resistors Only)</p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>RT = (R1 x R2) / (R1 + R2)</strong></p>
              </div>
              <p className="text-sm text-white/80 mb-3">
                Quick method for two resistors - multiply then divide by sum.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Example:</strong> 40 ohms and 60 ohms in parallel</p>
                <p className="mt-2">RT = (40 x 60) / (40 + 60)</p>
                <p>RT = 2400 / 100 = <strong>24 ohms</strong></p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Method 3: Identical Resistors Shortcut</p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>RT = R / n</strong></p>
                <p className="text-xs text-white/60 mt-1">(Where n = number of identical resistors)</p>
              </div>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Example:</strong> Four 100 ohm resistors in parallel</p>
                <p className="mt-2">RT = 100 / 4 = <strong>25 ohms</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Resistance Quick Reference</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Total Resistance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Two 100 ohm</td>
                      <td className="border border-white/10 px-3 py-2">50 ohms</td>
                      <td className="border border-white/10 px-3 py-2">R/n = 100/2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Three 100 ohm</td>
                      <td className="border border-white/10 px-3 py-2">33.3 ohms</td>
                      <td className="border border-white/10 px-3 py-2">R/n = 100/3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 ohm + 100 ohm</td>
                      <td className="border border-white/10 px-3 py-2">50 ohms</td>
                      <td className="border border-white/10 px-3 py-2">Product/sum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100 ohm + 200 ohm</td>
                      <td className="border border-white/10 px-3 py-2">66.7 ohms</td>
                      <td className="border border-white/10 px-3 py-2">(100x200)/(100+200)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">60 ohm + 40 ohm</td>
                      <td className="border border-white/10 px-3 py-2">24 ohms</td>
                      <td className="border border-white/10 px-3 py-2">(60x40)/(60+40)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Current Divider Rule */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Current Divider Rule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The current divider rule calculates how total current splits between parallel branches.
              Understanding this is crucial for load balancing and cable sizing in distribution systems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Current Divider Formula (Two Branches)</p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>I1 = IT x (R2 / (R1 + R2))</strong></p>
                <p className="text-xs text-white/60 mt-2">Note: Current through R1 uses R2 in the numerator (opposite to voltage divider)</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-2">For R1 branch:</p>
                  <p className="font-mono text-sm">I1 = IT x R2 / (R1 + R2)</p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-2">For R2 branch:</p>
                  <p className="font-mono text-sm">I2 = IT x R1 / (R1 + R2)</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Alternative Method: Using Ohm's Law</p>
              <p className="text-sm text-white/80 mb-3">
                Since voltage is the same across all branches, you can calculate each branch current directly:
              </p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg">I1 = V / R1    and    I2 = V / R2</p>
              </div>
              <p className="text-xs text-white/60">This is often easier when you know the supply voltage.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Current Division</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> IT = 15A divides between 20 ohms and 30 ohms</p>
                <p className="mt-2"><strong>Method 1 - Current divider rule:</strong></p>
                <p>I1 (through 20 ohm) = 15 x (30/(20+30)) = 15 x 0.6 = <strong>9A</strong></p>
                <p>I2 (through 30 ohm) = 15 x (20/(20+30)) = 15 x 0.4 = <strong>6A</strong></p>
                <p className="text-green-400 mt-2">Check: 9A + 6A = 15A (currents add up)</p>

                <p className="mt-4"><strong>Method 2 - Using Ohm's Law:</strong></p>
                <p>RT = (20x30)/(20+30) = 12 ohms</p>
                <p>V = IT x RT = 15 x 12 = 180V</p>
                <p>I1 = V/R1 = 180/20 = <strong>9A</strong></p>
                <p>I2 = V/R2 = 180/30 = <strong>6A</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Lower resistance carries higher current. The 20 ohm resistor (lower R) carries 9A while the 30 ohm resistor carries only 6A.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            {/* Lighting Circuits */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-blue-400 mb-3">Application 1: Lighting Circuits</h3>
              <p className="text-sm text-white mb-3">
                All luminaires on a lighting circuit are connected in parallel, ensuring each receives
                full 230V supply and operates independently.
              </p>

              <p className="text-sm font-medium text-white mb-2">Worked Example: Office Lighting Analysis</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 12 LED luminaires, each 45W at 230V</p>
                <p className="mt-2">Luminaire resistance: R = V squared/P = 230 squared/45 = 1176 ohms</p>
                <p className="mt-2">Current per luminaire: I = P/V = 45/230 = 0.196A</p>
                <p className="mt-2">Total circuit current: IT = 12 x 0.196A = <strong>2.35A</strong></p>
                <p className="mt-2">Total power: PT = 12 x 45W = <strong>540W</strong></p>
                <p className="mt-2">Combined resistance: RT = 1176/12 = <strong>98 ohms</strong></p>
                <p className="text-green-400 mt-2">Well within 6A MCB rating for lighting circuit</p>
              </div>

              <div className="mt-3 text-xs text-white/70">
                <strong>Practical note:</strong> Even if one luminaire fails, others continue working - a key benefit of parallel connection.
              </div>
            </div>

            {/* Ring Final Circuit */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-green-400 mb-3">Application 2: Ring Final Circuit</h3>
              <p className="text-sm text-white mb-3">
                A ring final provides two parallel cable paths to each socket, effectively doubling
                the cable capacity and reducing voltage drop.
              </p>

              <p className="text-sm font-medium text-white mb-2">Worked Example: Ring Circuit Calculation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> 2.5mm squared ring, 50m total length, 32A load at far point</p>
                <p className="mt-2">Cable resistance: 7.41 milliohms/m</p>
                <p className="mt-2"><strong>With ring (two parallel paths):</strong></p>
                <p>Path 1: 25m from one direction = 25 x 7.41 = 185 milliohms</p>
                <p>Path 2: 25m from other direction = 25 x 7.41 = 185 milliohms</p>
                <p>Parallel R: (185 x 185)/(185 + 185) = <strong>92.5 milliohms</strong></p>
                <p className="mt-2">Each path carries 16A (current divides equally)</p>
                <p className="mt-2">Voltage drop: V = 16A x 0.0925 ohms x 2 = <strong>2.96V</strong></p>
                <p className="text-green-400 mt-2">Only 1.3% drop (within 5% limit)</p>
                <p className="mt-3 text-white/60"><strong>If broken to radial:</strong></p>
                <p className="text-white/60">V = 32A x (50m x 0.00741) x 2 = 23.7V (10.3% - fails!)</p>
              </div>
            </div>

            {/* Distribution Board */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-purple-400 mb-3">Application 3: Distribution Board Load Balancing</h3>
              <p className="text-sm text-white mb-3">
                All final circuits connect in parallel at the distribution board. In three-phase systems,
                loads must be balanced across phases.
              </p>

              <p className="text-sm font-medium text-white mb-2">Worked Example: Three-Phase Load Balancing</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Loads to distribute:</strong></p>
                <p>Lighting: 2kW, 1.8kW, 2.2kW (three circuits)</p>
                <p>Sockets: 3kW, 3.5kW, 3.2kW (three circuits)</p>
                <p>HVAC: 5kW (single circuit)</p>
                <p className="mt-2"><strong>Balanced allocation:</strong></p>
                <p>L1: 2kW + 3kW = 5kW</p>
                <p>L2: 1.8kW + 3.2kW + 5kW* = 5kW (*or HVAC on L2)</p>
                <p>L3: 2.2kW + 3.5kW = 5.7kW</p>
                <p className="mt-2"><strong>Phase currents at 230V:</strong></p>
                <p>IL1 = 5000/230 = 21.7A</p>
                <p>IL2 = 5000/230 = 21.7A (with HVAC as 3-phase)</p>
                <p>IL3 = 5700/230 = 24.8A</p>
                <p className="text-green-400 mt-2">Reasonably balanced (max 14% imbalance)</p>
              </div>

              <div className="mt-3">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Distribution Summary</p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Circuits</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Total Load</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Current</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">L1</td>
                        <td className="border border-white/10 px-3 py-2">Lighting 1, Sockets 1</td>
                        <td className="border border-white/10 px-3 py-2">5.0kW</td>
                        <td className="border border-white/10 px-3 py-2">21.7A</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">L2</td>
                        <td className="border border-white/10 px-3 py-2">Lighting 2, Sockets 3</td>
                        <td className="border border-white/10 px-3 py-2">5.0kW</td>
                        <td className="border border-white/10 px-3 py-2">21.7A</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">L3</td>
                        <td className="border border-white/10 px-3 py-2">Lighting 3, Sockets 2</td>
                        <td className="border border-white/10 px-3 py-2">5.7kW</td>
                        <td className="border border-white/10 px-3 py-2">24.8A</td>
                      </tr>
                      <tr className="bg-white/5">
                        <td className="border border-white/10 px-3 py-2 font-medium">Total</td>
                        <td className="border border-white/10 px-3 py-2">All circuits in parallel</td>
                        <td className="border border-white/10 px-3 py-2">15.7kW</td>
                        <td className="border border-white/10 px-3 py-2">~23A avg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Parallel Heater Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Three 2kW panel heaters are to be installed on a single circuit at 230V.
                Calculate the total current and recommend the MCB rating.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Individual heater current: I = P/V = 2000/230 = 8.7A each</p>
                <p className="mt-2">Heaters in parallel, currents add:</p>
                <p>IT = 8.7 + 8.7 + 8.7 = <strong>26.1A</strong></p>
                <p className="mt-2">Individual heater resistance: R = V/I = 230/8.7 = 26.4 ohms</p>
                <p>Total resistance: RT = 26.4/3 = <strong>8.8 ohms</strong></p>
                <p className="mt-2">Check: I = V/RT = 230/8.8 = 26.1A (confirmed)</p>
                <p className="mt-2 text-green-400">Recommend: 32A MCB with 4mm squared cable</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Parallel Supply Cables</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Two 35mm squared cables (R = 0.524 milliohms/m) run 80m in parallel to supply a sub-board.
                Calculate the combined resistance and voltage drop at 100A.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Single cable resistance (go + return):</p>
                <p>R = 80m x 2 x 0.524 milliohms = 83.8 milliohms = 0.0838 ohms</p>
                <p className="mt-2">Parallel cables:</p>
                <p>RT = 0.0838/2 = <strong>0.0419 ohms</strong></p>
                <p className="mt-2">Current per cable: 100A / 2 = 50A each</p>
                <p className="mt-2">Voltage drop: V = IT x RT = 100 x 0.0419 = <strong>4.19V</strong></p>
                <p className="mt-2">Percentage: (4.19/230) x 100 = <strong>1.82%</strong></p>
                <p className="text-green-400 mt-2">Well within 5% limit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Mixed Load Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 230V circuit supplies: 6 LED downlights (10W each),
                2 decorative pendants (40W each), and 1 feature wall light (60W).
                Calculate total current and verify 6A MCB is adequate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>LED downlights: 6 x 10W = 60W, I = 60/230 = 0.26A</p>
                <p>Pendants: 2 x 40W = 80W, I = 80/230 = 0.35A</p>
                <p>Wall light: 1 x 60W = 60W, I = 60/230 = 0.26A</p>
                <p className="mt-2">All loads in parallel, currents add:</p>
                <p>IT = 0.26 + 0.35 + 0.26 = <strong>0.87A</strong></p>
                <p className="mt-2">Total power: PT = 60 + 80 + 60 = <strong>200W</strong></p>
                <p className="text-green-400 mt-2">0.87A is well within 6A MCB capacity</p>
                <p className="text-white/60 mt-1">Could add many more luminaires within rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Circuit Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>1/RT = 1/R1 + 1/R2 + 1/R3...</strong> - General formula</li>
                <li className="pl-1"><strong>RT = (R1 x R2)/(R1 + R2)</strong> - Two resistors (product/sum)</li>
                <li className="pl-1"><strong>RT = R/n</strong> - n identical resistors</li>
                <li className="pl-1"><strong>IT = I1 + I2 + I3...</strong> - Total current</li>
                <li className="pl-1"><strong>I1 = IT x R2/(R1 + R2)</strong> - Current divider</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Principles to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage is the <strong>same</strong> across all parallel branches</li>
                <li className="pl-1">Current <strong>divides</strong> - more through lower resistance</li>
                <li className="pl-1">Total resistance is <strong>always less</strong> than the smallest branch</li>
                <li className="pl-1">Adding parallel paths <strong>decreases</strong> total resistance</li>
                <li className="pl-1">If one branch opens, others <strong>continue working</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding resistances directly</strong> - That's for series circuits!</li>
                <li className="pl-1"><strong>Forgetting to take reciprocal</strong> - 1/RT needs inverting at the end</li>
                <li className="pl-1"><strong>Current divider confusion</strong> - I1 uses R2 in numerator, not R1</li>
                <li className="pl-1"><strong>Expecting RT &gt; Rsmallest</strong> - Parallel R is always less</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Parallel Circuit Rules</p>
                <ul className="space-y-0.5">
                  <li>Voltage: Same across all branches</li>
                  <li>Current: IT = I1 + I2 + I3...</li>
                  <li>Resistance: 1/RT = 1/R1 + 1/R2...</li>
                  <li>Total R always &lt; smallest R</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Applications</p>
                <ul className="space-y-0.5">
                  <li>Lighting: Each luminaire at 230V</li>
                  <li>Sockets: Independent operation</li>
                  <li>Ring finals: Parallel cable paths</li>
                  <li>Distribution: Balance across phases</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Series Circuits
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-5">
              Next: Series-Parallel Circuits
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_4;
