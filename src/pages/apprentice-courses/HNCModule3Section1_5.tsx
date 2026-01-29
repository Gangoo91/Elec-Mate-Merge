import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Kirchhoff's Laws - HNC Module 3 Section 1.5";
const DESCRIPTION = "Master Kirchhoff's Current Law and Voltage Law for analysing complex circuits in building electrical installations including distribution boards and fault current paths.";

const quickCheckQuestions = [
  {
    id: "kcl-definition",
    question: "What does Kirchhoff's Current Law state about currents at a node?",
    options: [
      "Currents in parallel circuits are equal",
      "The sum of currents entering a node equals the sum leaving",
      "Current is the same at all points in a circuit",
      "Current divides equally between branches"
    ],
    correctIndex: 1,
    explanation: "KCL states that the algebraic sum of currents at any node (junction) equals zero. In practical terms: currents entering = currents leaving. This is based on conservation of charge."
  },
  {
    id: "kvl-definition",
    question: "According to Kirchhoff's Voltage Law, what is the sum of voltages around any closed loop?",
    options: ["Equal to the supply voltage", "Zero", "Depends on the resistance", "Equal to the current multiplied by total resistance"],
    correctIndex: 1,
    explanation: "KVL states that the algebraic sum of all voltages around any closed loop equals zero. Voltage rises (sources) equal voltage drops (across components). This is based on conservation of energy."
  },
  {
    id: "node-current",
    question: "At a distribution board busbar, three circuits draw 15A, 20A, and 10A. What is the current in the main supply cable?",
    options: ["15A", "20A", "45A", "10A"],
    correctIndex: 2,
    explanation: "By KCL, the current entering the node (busbar) equals the sum of currents leaving. 15A + 20A + 10A = 45A must flow in the main supply cable."
  },
  {
    id: "voltage-loop",
    question: "A 230V supply feeds a series circuit. If two resistors drop 95V and 85V, what voltage appears across the third resistor?",
    options: ["50V", "180V", "230V", "0V"],
    correctIndex: 0,
    explanation: "By KVL, the sum of voltage drops must equal the supply: V3 = 230 - 95 - 85 = 50V. The drops around the loop total 230V."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Kirchhoff's Current Law is based on which conservation principle?",
    options: [
      "Conservation of energy",
      "Conservation of charge",
      "Conservation of momentum",
      "Conservation of power"
    ],
    correctAnswer: 1,
    explanation: "KCL is based on conservation of charge - charge cannot be created or destroyed. Therefore, the total charge entering a node must equal the total charge leaving."
  },
  {
    id: 2,
    question: "At a junction in a circuit, currents of 5A, 8A, and 3A flow in. If one current flows out at 10A, what is the other outgoing current?",
    options: ["4A", "6A", "8A", "16A"],
    correctAnswer: 1,
    explanation: "By KCL: Currents in = Currents out. So 5 + 8 + 3 = 10 + x. Therefore x = 16 - 10 = 6A."
  },
  {
    id: 3,
    question: "Kirchhoff's Voltage Law is based on which conservation principle?",
    options: [
      "Conservation of charge",
      "Conservation of energy",
      "Conservation of mass",
      "Conservation of current"
    ],
    correctAnswer: 1,
    explanation: "KVL is based on conservation of energy. As you travel around any closed loop, the energy gained (from sources) must equal the energy lost (in components)."
  },
  {
    id: 4,
    question: "In a series circuit with a 24V supply and three resistors, the voltage drops are 8V and 10V across the first two. What is the drop across the third?",
    options: ["4V", "6V", "8V", "18V"],
    correctAnswer: 1,
    explanation: "By KVL: 24V = 8V + 10V + V3. Therefore V3 = 24 - 8 - 10 = 6V."
  },
  {
    id: 5,
    question: "Why is node analysis particularly useful for distribution board calculations?",
    options: [
      "It simplifies voltage calculations",
      "It allows tracking of current flow through multiple outgoing circuits",
      "It eliminates the need for Ohm's Law",
      "It only works with single-phase supplies"
    ],
    correctAnswer: 1,
    explanation: "Distribution boards have a main supply node (busbar) with multiple outgoing circuits. KCL allows us to analyse how the main supply current divides between circuits."
  },
  {
    id: 6,
    question: "A fault current of 800A flows to earth. By KCL, what current flows back through the supply?",
    options: ["0A", "400A", "800A", "1600A"],
    correctAnswer: 2,
    explanation: "By KCL, 800A must flow back through the supply (via the earth fault loop) to complete the circuit. Current in = current out at every node."
  },
  {
    id: 7,
    question: "When applying KVL to an earth fault loop, which voltages must be considered?",
    options: [
      "Only the supply voltage",
      "Only the voltage drops in the fault path",
      "Supply voltage and all voltage drops in the complete loop",
      "Only the protective device voltage"
    ],
    correctAnswer: 2,
    explanation: "KVL requires accounting for ALL voltages around the complete loop: the supply EMF and voltage drops in cables, connections, and the fault itself."
  },
  {
    id: 8,
    question: "In a parallel circuit, why is the voltage the same across each branch?",
    options: [
      "Because of KCL",
      "Because each branch forms a loop with the source, and KVL applies",
      "Because the resistance is the same",
      "Because the current divides equally"
    ],
    correctAnswer: 1,
    explanation: "Each parallel branch and the source form a closed loop. By KVL, the source voltage minus the branch voltage drop = 0, so all branches have the same voltage."
  },
  {
    id: 9,
    question: "A three-phase DB has balanced loads drawing 30A per phase. What neutral current flows?",
    options: ["0A", "30A", "90A", "52A"],
    correctAnswer: 0,
    explanation: "In a balanced three-phase system, the three phase currents are equal in magnitude but 120 degrees apart. At the star point (neutral node), KCL shows these currents sum to zero."
  },
  {
    id: 10,
    question: "When using mesh analysis based on KVL, what do you solve for?",
    options: [
      "Node voltages",
      "Loop currents",
      "Power in each component",
      "Total resistance"
    ],
    correctAnswer: 1,
    explanation: "Mesh analysis applies KVL around each independent loop to create equations in terms of loop (mesh) currents. Solving these gives the current in each branch."
  }
];

const faqs = [
  {
    question: "Why are Kirchhoff's Laws so important for building services?",
    answer: "Kirchhoff's Laws are fundamental to analysing any electrical installation. KCL determines how load currents combine at distribution boards, essential for main cable sizing. KVL is used for voltage drop calculations and earth fault loop impedance - both critical BS 7671 requirements."
  },
  {
    question: "How do I know which direction to assume for current flow?",
    answer: "Choose a consistent convention (usually conventional current from positive to negative). If your calculation yields a negative result, the actual current flows opposite to your assumed direction. The magnitude is still correct."
  },
  {
    question: "What's the difference between node analysis and mesh analysis?",
    answer: "Node analysis uses KCL at nodes to find unknown voltages - best when there are fewer nodes than loops. Mesh analysis uses KVL around loops to find unknown currents - best when there are fewer loops than nodes. Both give the same final answers."
  },
  {
    question: "Can I use Kirchhoff's Laws for AC circuits?",
    answer: "Yes, but for AC circuits you must account for phase relationships. Currents and voltages become phasors (magnitude and angle). KCL and KVL still apply, but additions become vector additions. For practical building services work with resistive loads, the phase complications are often minimal."
  },
  {
    question: "How does KCL apply to three-phase systems?",
    answer: "At the star point of a three-phase system, KCL requires all three phase currents plus the neutral current to sum to zero. For balanced loads, the neutral current is zero. For unbalanced loads, the neutral carries the imbalance current."
  },
  {
    question: "Why is earth fault loop impedance calculated using voltage?",
    answer: "Earth fault loop calculations combine both laws. KVL determines the voltage available to drive fault current around the loop. The voltage divided by loop impedance (Ohm's Law) gives the fault current. This must be high enough to trip the protective device within required time."
  }
];

const HNCModule3Section1_5 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 3.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Kirchhoff's Laws
          </h1>
          <p className="text-white/80">
            Fundamental circuit analysis laws for current and voltage in complex electrical networks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Kirchhoff's Current Law (KCL)</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">Sum of currents at any node equals zero</li>
              <li className="pl-1">Currents entering = Currents leaving</li>
              <li className="pl-1">Based on conservation of charge</li>
              <li className="pl-1">Used for node (junction) analysis</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Kirchhoff's Voltage Law (KVL)</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1">Sum of voltages around any closed loop equals zero</li>
              <li className="pl-1">Voltage rises = Voltage drops</li>
              <li className="pl-1">Based on conservation of energy</li>
              <li className="pl-1">Used for mesh (loop) analysis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State and explain Kirchhoff's Current Law with mathematical form",
              "State and explain Kirchhoff's Voltage Law with mathematical form",
              "Apply KCL to analyse current distribution at nodes",
              "Apply KVL to calculate voltage drops around circuit loops",
              "Use systematic methods for complex circuit analysis",
              "Apply both laws to building services scenarios"
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

        {/* Section 1: Kirchhoff's Current Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Kirchhoff's Current Law (KCL)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Kirchhoff's Current Law, also known as Kirchhoff's first law or the junction rule, is
              based on the principle of conservation of electric charge. Since charge cannot be
              created or destroyed, all charge entering a junction must leave it.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mathematical Statement</p>
              <p className="font-mono text-center text-lg mb-2">ΣI = 0</p>
              <p className="text-xs text-white/70 text-center">The algebraic sum of currents at any node equals zero</p>
              <p className="font-mono text-center text-lg mt-3 mb-2">ΣI<sub>in</sub> = ΣI<sub>out</sub></p>
              <p className="text-xs text-white/70 text-center">Currents entering a node equal currents leaving</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Understanding nodes:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Node:</strong> Any point where two or more circuit elements connect</li>
                <li className="pl-1"><strong>Junction:</strong> A node where three or more branches meet</li>
                <li className="pl-1">Current is assigned positive entering the node, negative leaving (or vice versa - be consistent)</li>
                <li className="pl-1">KCL applies to every node in a circuit, no matter how complex</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Node Analysis Diagram (Text Description)</p>
              <div className="p-3 rounded bg-white/5 text-sm text-white/90 font-mono">
                <p className="mb-2">Consider a node with four branches:</p>
                <pre className="text-xs">
{`           I1 = 10A
              |
              v
    I4 = 3A -> * <- I2 = 5A
              ^
              |
           I3 = ?

At the node:  I1 + I2 = I3 + I4
              10 + 5 = I3 + 3
              I3 = 12A (leaving the node)`}
                </pre>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> KCL must be satisfied at every instant in time, for both DC and AC circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Kirchhoff's Voltage Law */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Kirchhoff's Voltage Law (KVL)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Kirchhoff's Voltage Law, also known as Kirchhoff's second law or the loop rule, is
              based on the conservation of energy. The work done on a charge around any closed
              path must equal zero - energy gained equals energy lost.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mathematical Statement</p>
              <p className="font-mono text-center text-lg mb-2">ΣV = 0</p>
              <p className="text-xs text-white/70 text-center">The algebraic sum of voltages around any closed loop equals zero</p>
              <p className="font-mono text-center text-lg mt-3 mb-2">ΣV<sub>rises</sub> = ΣV<sub>drops</sub></p>
              <p className="text-xs text-white/70 text-center">EMF sources equal the sum of IR drops around the loop</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sign conventions for KVL:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage rise:</strong> Crossing a source from - to + (positive EMF)</li>
                <li className="pl-1"><strong>Voltage drop:</strong> Crossing a resistor in the direction of current (positive drop)</li>
                <li className="pl-1">Choose a consistent direction to traverse each loop (clockwise or anticlockwise)</li>
                <li className="pl-1">Apply the sign convention consistently throughout</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mesh Analysis Diagram (Text Description)</p>
              <div className="p-3 rounded bg-white/5 text-sm text-white/90 font-mono">
                <p className="mb-2">Series circuit with 230V supply and three resistors:</p>
                <pre className="text-xs">
{`    +230V-    -V1-     -V2-     -V3-
    [===]-----|R1|-----|R2|-----|R3|----
     EMF       |        |        |
              80V      100V      50V

Going clockwise: +230 - 80 - 100 - 50 = 0
Supply EMF = Sum of voltage drops`}
                </pre>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> KVL applies to any closed path, whether it contains a source or not. It's the basis for voltage drop calculations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Applying KCL and KVL */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Applying KCL and KVL
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Complex circuits often require the systematic application of both laws. Two main
              approaches exist: node voltage analysis (primarily using KCL) and mesh current
              analysis (primarily using KVL).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Method for Circuit Analysis</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Step 1: Identify and Label</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Label all nodes (junctions) with letters (A, B, C...)</li>
                    <li className="pl-1">Assign current directions to all branches (arrows)</li>
                    <li className="pl-1">Mark voltage polarities across components</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Step 2: Apply KCL at Nodes</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Write KCL equation for each node (except reference node)</li>
                    <li className="pl-1">Express branch currents in terms of unknowns</li>
                    <li className="pl-1">Gives (n-1) equations for n nodes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Step 3: Apply KVL around Loops</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Identify independent loops (meshes)</li>
                    <li className="pl-1">Write KVL equation for each loop</li>
                    <li className="pl-1">Use Ohm's Law: V = IR for resistor drops</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Step 4: Solve the System</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Combine KCL and KVL equations</li>
                    <li className="pl-1">Solve simultaneous equations for unknowns</li>
                    <li className="pl-1">Negative results indicate opposite direction to assumed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Node Voltage vs Mesh Current Analysis</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Primary Law</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Node Voltage</td>
                      <td className="border border-white/10 px-3 py-2">KCL</td>
                      <td className="border border-white/10 px-3 py-2">Circuits with fewer nodes than loops</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mesh Current</td>
                      <td className="border border-white/10 px-3 py-2">KVL</td>
                      <td className="border border-white/10 px-3 py-2">Circuits with fewer loops than nodes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> For building services, most practical problems can be solved by direct application of Ohm's Law with either KCL or KVL, without needing full mesh analysis.
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
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Kirchhoff's Laws are essential for practical building services calculations. From
              sizing main cables at distribution boards to calculating earth fault loop impedance,
              these laws underpin safe electrical installation design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Analysis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Main busbar:</strong> Acts as a node where KCL applies</li>
                <li className="pl-1"><strong>Incoming supply current:</strong> Sum of all outgoing circuit currents</li>
                <li className="pl-1"><strong>Diversity:</strong> Not all circuits at full load simultaneously</li>
                <li className="pl-1"><strong>Three-phase balance:</strong> KCL at star point determines neutral current</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DB Load Calculation Example</p>
              <div className="p-3 rounded bg-white/5 text-sm text-white/90 font-mono">
                <pre className="text-xs">
{`Distribution Board Loads:
--------------------------
Lighting circuits:     2 x 10A = 20A
Socket circuits:       4 x 20A = 80A
Cooker circuit:        1 x 32A = 32A
Immersion heater:      1 x 16A = 16A
                       -----------
Total (no diversity):           148A

With diversity (BS 7671):       ~85A
Main switch rating:             100A`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Current Paths</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Earth fault loop:</strong> Closed path for fault current to flow</li>
                <li className="pl-1"><strong>KCL at fault:</strong> Fault current equals return current through earth</li>
                <li className="pl-1"><strong>KVL around loop:</strong> Supply voltage = sum of IR drops in loop</li>
                <li className="pl-1"><strong>Fault current:</strong> If = U0 / Zs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Loop Calculation</p>
              <div className="p-3 rounded bg-white/5 text-sm text-white/90 font-mono">
                <pre className="text-xs">
{`Earth Fault Loop (applying KVL):
--------------------------------
Supply EMF:           230V

Loop impedances:
- External (Ze):      0.35 Ohm
- Line conductor:     0.40 Ohm
- CPC:                0.65 Ohm
--------------------------------
Total Zs:             1.40 Ohm

Fault current: If = 230 / 1.40 = 164A

For 32A Type B MCB:  Requires >160A (OK)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Branch Currents</p>
              <div className="p-3 rounded bg-white/5 text-sm text-white/90 font-mono">
                <pre className="text-xs">
{`Two parallel heating elements (230V supply):
--------------------------------------------
Element 1: R1 = 23 Ohm -> I1 = 230/23 = 10A
Element 2: R2 = 46 Ohm -> I2 = 230/46 = 5A

By KCL at junction:
Supply current = I1 + I2 = 10 + 5 = 15A

Combined resistance: 1/R = 1/23 + 1/46
                    R = 15.33 Ohm
Check: I = 230/15.33 = 15A (OK)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Calculations (KVL)</p>
              <div className="p-3 rounded bg-white/5 text-sm text-white/90 font-mono">
                <pre className="text-xs">
{`Circuit: 230V supply, 25m cable run, 3kW load
----------------------------------------------
Cable: 2.5mm2 (7.41 mOhm/m, L+N)

Load current: I = 3000/230 = 13.04A
Cable resistance: R = 25 x 2 x 7.41/1000 = 0.37 Ohm

By KVL around loop:
230V = V_cable + V_load

V_cable = I x R = 13.04 x 0.37 = 4.8V
V_load = 230 - 4.8 = 225.2V

Voltage drop: 4.8V (2.1%) - Within 5% limit`}
                </pre>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Every BS 7671 voltage drop and fault loop calculation is an application of Kirchhoff's Laws.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Distribution Board Load Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A single-phase DB supplies: 3 lighting circuits (6A, 8A, 4A),
                2 socket circuits (18A, 22A), and a 3kW immersion heater. Calculate the main switch rating required.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Immersion current: I = P/V = 3000/230 = 13A</p>
                <p className="mt-2">Apply KCL at main busbar:</p>
                <p>I_main = I1 + I2 + I3 + I4 + I5 + I6</p>
                <p>I_main = 6 + 8 + 4 + 18 + 22 + 13 = <strong>71A</strong></p>
                <p className="mt-2 text-white/60">Result: 80A main switch minimum (100A typical)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Parallel Branch Current Division</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Three resistors (10 Ohm, 20 Ohm, 40 Ohm) are connected in parallel across
                a 20V supply. Calculate each branch current and the total supply current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>By KVL: Same voltage across each parallel branch</p>
                <p className="mt-2">Branch currents (Ohm's Law):</p>
                <p>I1 = V/R1 = 20/10 = 2A</p>
                <p>I2 = V/R2 = 20/20 = 1A</p>
                <p>I3 = V/R3 = 20/40 = 0.5A</p>
                <p className="mt-2">By KCL at junction:</p>
                <p>I_total = I1 + I2 + I3 = 2 + 1 + 0.5 = <strong>3.5A</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Series Circuit Voltage Drops</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 230V supply feeds three series resistors (15 Ohm, 25 Ohm, 6 Ohm).
                Calculate the current and voltage drop across each resistor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Total resistance: R_T = 15 + 25 + 6 = 46 Ohm</p>
                <p>Circuit current: I = V/R_T = 230/46 = <strong>5A</strong></p>
                <p className="mt-2">Voltage drops (Ohm's Law):</p>
                <p>V1 = I x R1 = 5 x 15 = 75V</p>
                <p>V2 = I x R2 = 5 x 25 = 125V</p>
                <p>V3 = I x R3 = 5 x 6 = 30V</p>
                <p className="mt-2">Verify with KVL:</p>
                <p>230V = 75 + 125 + 30 = 230V (OK)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Earth Fault Loop Impedance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An installation has Ze = 0.30 Ohm. The circuit uses 30m of 2.5mm2
                cable (r1 = 7.41 mOhm/m, r2 = 12.1 mOhm/m for 1.5mm2 CPC). Calculate Zs and fault current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Line resistance: R1 = 30 x 7.41/1000 = 0.222 Ohm</p>
                <p>CPC resistance: R2 = 30 x 12.1/1000 = 0.363 Ohm</p>
                <p className="mt-2">By KVL around fault loop:</p>
                <p>Zs = Ze + R1 + R2 = 0.30 + 0.222 + 0.363 = <strong>0.885 Ohm</strong></p>
                <p className="mt-2">Fault current: If = 230/0.885 = <strong>260A</strong></p>
                <p className="mt-2 text-green-400">OK - Sufficient for 32A Type B MCB (requires &gt;160A)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>KCL:</strong> Sum of I_in = Sum of I_out (at any node)</li>
                <li className="pl-1"><strong>KVL:</strong> Sum of V = 0 (around any closed loop)</li>
                <li className="pl-1"><strong>Combined:</strong> V = IR applied at each component</li>
                <li className="pl-1"><strong>Fault current:</strong> If = U0 / Zs</li>
                <li className="pl-1"><strong>Voltage drop:</strong> Vd = I x R x L (for cables)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Use Each Law</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>KCL:</strong> Finding how current splits between parallel paths</li>
                <li className="pl-1"><strong>KCL:</strong> Calculating main cable current from circuit loads</li>
                <li className="pl-1"><strong>KVL:</strong> Finding voltage drops in series circuits</li>
                <li className="pl-1"><strong>KVL:</strong> Earth fault loop and protective device verification</li>
                <li className="pl-1"><strong>Both:</strong> Complex circuits with multiple sources or loops</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Sign errors:</strong> Be consistent with current direction conventions</li>
                <li className="pl-1"><strong>Missing components:</strong> Include ALL elements in the loop for KVL</li>
                <li className="pl-1"><strong>Wrong nodes:</strong> KCL applies at junctions, not along wires</li>
                <li className="pl-1"><strong>Forgetting return path:</strong> Include both L and CPC in fault loops</li>
                <li className="pl-1"><strong>Unit confusion:</strong> mOhm/m must convert to Ohm for calculations</li>
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
                <p className="font-medium text-white mb-1">Kirchhoff's Laws</p>
                <ul className="space-y-0.5">
                  <li>KCL: Sum of I = 0 at any node</li>
                  <li>KVL: Sum of V = 0 around any loop</li>
                  <li>KCL is based on conservation of charge</li>
                  <li>KVL is based on conservation of energy</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Building Services</p>
                <ul className="space-y-0.5">
                  <li>DB loads: Sum of circuit currents</li>
                  <li>Fault loop: Zs = Ze + R1 + R2</li>
                  <li>Fault current: If = 230/Zs</li>
                  <li>Balanced 3-phase: Neutral current = 0</li>
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
            <Link to="../h-n-c-module3-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-6">
              Next: Measurement Errors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_5;
