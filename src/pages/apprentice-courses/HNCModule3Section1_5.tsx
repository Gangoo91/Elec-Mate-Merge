/**
 * Module 3 · Section 1 · Subsection 5 — Kirchhoff's Laws
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   The two conservation laws (KCL for current at a node, KVL for voltage round a loop)
 *   that underpin distribution-board balancing, fault-current sharing and voltage-drop accounting.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = "Kirchhoff's Laws - HNC Module 3 Section 1.5";
const DESCRIPTION =
  "Master Kirchhoff's Current Law and Voltage Law for analysing complex circuits in building electrical installations including distribution boards and fault current paths.";

const quickCheckQuestions = [
  {
    id: 'kcl-definition',
    question: "What does Kirchhoff's Current Law state about currents at a node?",
    options: [
      'Current is the same at all points in a circuit',
      'The sum of currents entering a node equals the sum leaving',
      'Current divides equally between branches',
      'Currents in parallel circuits are equal',
    ],
    correctIndex: 1,
    explanation:
      'KCL states that the algebraic sum of currents at any node (junction) equals zero. In practical terms: currents entering = currents leaving. This is based on conservation of charge.',
  },
  {
    id: 'kvl-definition',
    question:
      "According to Kirchhoff's Voltage Law, what is the sum of voltages around any closed loop?",
    options: [
      'Depends on the resistance',
      'Equal to the current multiplied by total resistance',
      'Zero',
      'Equal to the supply voltage',
    ],
    correctIndex: 2,
    explanation:
      'KVL states that the algebraic sum of all voltages around any closed loop equals zero. Voltage rises (sources) equal voltage drops (across components). This is based on conservation of energy.',
  },
  {
    id: 'node-current',
    question:
      'At a distribution board busbar, three circuits draw 15A, 20A, and 10A. What is the current in the main supply cable?',
    options: [
      '15A',
      '45A',
      '20A',
      '10A',
    ],
    correctIndex: 1,
    explanation:
      'By KCL, the current entering the node (busbar) equals the sum of currents leaving. 15A + 20A + 10A = 45A must flow in the main supply cable.',
  },
  {
    id: 'voltage-loop',
    question:
      'A 230V supply feeds a series circuit. If two resistors drop 95V and 85V, what voltage appears across the third resistor?',
    options: [
      '180V',
      '230V',
      '50V',
      '0V',
    ],
    correctIndex: 2,
    explanation:
      'By KVL, the sum of voltage drops must equal the supply: V3 = 230 - 95 - 85 = 50V. The drops around the loop total 230V.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Kirchhoff's Current Law is based on which conservation principle?",
    options: [
      'Conservation of energy',
      'Conservation of charge',
      'Conservation of momentum',
      'Conservation of power',
    ],
    correctAnswer: 1,
    explanation:
      'KCL is based on conservation of charge - charge cannot be created or destroyed. Therefore, the total charge entering a node must equal the total charge leaving.',
  },
  {
    id: 2,
    question:
      'At a junction in a circuit, currents of 5A, 8A, and 3A flow in. If one current flows out at 10A, what is the other outgoing current?',
    options: [
      '8A',
      '4A',
      '6A',
      '16A',
    ],
    correctAnswer: 2,
    explanation:
      'By KCL: Currents in = Currents out. So 5 + 8 + 3 = 10 + x. Therefore x = 16 - 10 = 6A.',
  },
  {
    id: 3,
    question: "Kirchhoff's Voltage Law is based on which conservation principle?",
    options: [
      'Conservation of mass',
      'Conservation of charge',
      'Conservation of current',
      'Conservation of energy',
    ],
    correctAnswer: 3,
    explanation:
      'KVL is based on conservation of energy. As you travel around any closed loop, the energy gained (from sources) must equal the energy lost (in components).',
  },
  {
    id: 4,
    question:
      'In a series circuit with a 24V supply and three resistors, the voltage drops are 8V and 10V across the first two. What is the drop across the third?',
    options: [
      '6V',
      '4V',
      '8V',
      '18V',
    ],
    correctAnswer: 0,
    explanation: 'By KVL: 24V = 8V + 10V + V3. Therefore V3 = 24 - 8 - 10 = 6V.',
  },
  {
    id: 5,
    question: 'Why is node analysis particularly useful for distribution board calculations?',
    options: [
      'It removes the need to apply diversity factors',
      'It allows tracking of current flow through multiple outgoing circuits',
      'It guarantees the neutral current is always zero',
      'It fixes the voltage drop on every final circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Distribution boards have a main supply node (busbar) with multiple outgoing circuits. KCL allows us to analyse how the main supply current divides between circuits.',
  },
  {
    id: 6,
    question:
      'A fault current of 800A flows to earth. By KCL, what current flows back through the supply?',
    options: [
      '0A',
      '400A',
      '800A',
      '1600A',
    ],
    correctAnswer: 2,
    explanation:
      'By KCL, 800A must flow back through the supply (via the earth fault loop) to complete the circuit. Current in = current out at every node.',
  },
  {
    id: 7,
    question: 'When applying KVL to an earth fault loop, which voltages must be considered?',
    options: [
      'Only the voltage drop across the protective device',
      'Only the supply voltage at the origin',
      'Only the voltage drop in the line conductor',
      'Supply voltage and all voltage drops in the complete loop',
    ],
    correctAnswer: 3,
    explanation:
      'KVL requires accounting for ALL voltages around the complete loop: the supply EMF and voltage drops in cables, connections, and the fault itself.',
  },
  {
    id: 8,
    question: 'In a parallel circuit, why is the voltage the same across each branch?',
    options: [
      'Because each branch forms a loop with the source, and KVL applies',
      'Because the current is the same through every branch',
      'Because the total resistance equals the sum of the branches',
      'Because KCL forces equal voltage across each branch',
    ],
    correctAnswer: 0,
    explanation:
      'Each parallel branch and the source form a closed loop. By KVL, the source voltage minus the branch voltage drop = 0, so all branches have the same voltage.',
  },
  {
    id: 9,
    question:
      'A three-phase DB has balanced loads drawing 30A per phase. What neutral current flows?',
    options: [
      '30A',
      '0A',
      '90A',
      '52A',
    ],
    correctAnswer: 1,
    explanation:
      'In a balanced three-phase system, the three phase currents are equal in magnitude but 120 degrees apart. At the star point (neutral node), KCL shows these currents sum to zero.',
  },
  {
    id: 10,
    question: 'When using mesh analysis based on KVL, what do you solve for?',
    options: [
      'Node voltages',
      'Total resistance',
      'Loop currents',
      'Power in each component',
    ],
    correctAnswer: 2,
    explanation:
      'Mesh analysis applies KVL around each independent loop to create equations in terms of loop (mesh) currents. Solving these gives the current in each branch.',
  },
];

const faqs = [
  {
    question: "Why are Kirchhoff's Laws so important for building services?",
    answer:
      "Kirchhoff's Laws are fundamental to analysing any electrical installation. KCL determines how load currents combine at distribution boards, essential for main cable sizing. KVL is used for voltage drop calculations and earth fault loop impedance - both critical BS 7671 requirements.",
  },
  {
    question: 'How do I know which direction to assume for current flow?',
    answer:
      'Choose a consistent convention (usually conventional current from positive to negative). If your calculation yields a negative result, the actual current flows opposite to your assumed direction. The magnitude is still correct.',
  },
  {
    question: "What's the difference between node analysis and mesh analysis?",
    answer:
      'Node analysis uses KCL at nodes to find unknown voltages - best when there are fewer nodes than loops. Mesh analysis uses KVL around loops to find unknown currents - best when there are fewer loops than nodes. Both give the same final answers.',
  },
  {
    question: "Can I use Kirchhoff's Laws for AC circuits?",
    answer:
      'Yes, but for AC circuits you must account for phase relationships. Currents and voltages become phasors (magnitude and angle). KCL and KVL still apply, but additions become vector additions. For practical building services work with resistive loads, the phase complications are often minimal.',
  },
  {
    question: 'How does KCL apply to three-phase systems?',
    answer:
      'At the star point of a three-phase system, KCL requires all three phase currents plus the neutral current to sum to zero. For balanced loads, the neutral current is zero. For unbalanced loads, the neutral carries the imbalance current.',
  },
  {
    question: 'Why is earth fault loop impedance calculated using voltage?',
    answer:
      "Earth fault loop calculations combine both laws. KVL determines the voltage available to drive fault current around the loop. The voltage divided by loop impedance (Ohm's Law) gives the fault current. This must be high enough to trip the protective device within required time.",
  },
];

const HNCModule3Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1 · Subsection 5"
            title="Kirchhoff's Laws"
            description="Fundamental circuit analysis laws for current and voltage in complex electrical networks"
            tone="purple"
          />

          <TLDR
            points={[
              'You can apply Kirchhoff’s Current Law (KCL: ΣI = 0 at a node) to balance currents at a distribution board, busbar or fault point.',
              'You can apply Kirchhoff’s Voltage Law (KVL: ΣV = 0 round a loop) to account for source voltage against every drop in a circuit.',
              'You can use both laws together to solve mesh and nodal equations for any network the simple series/parallel rules cannot handle.',
              'You can use KCL to size a neutral on a three-phase distribution board with imbalanced single-phase loads.',
              'You can use KVL to verify that supply voltage minus the sum of cable and load drops still leaves enough voltage at the most remote terminal.',
            ]}
          />

          <RegsCallout
            source="BS 7671 — Section 543 (Protective conductors) & Section 524 (Cross-sectional areas)"
            clause="The cross-sectional area of every protective conductor shall be calculated to satisfy the adiabatic equation, or selected from Table 54.7. Where conductors carry harmonic currents, the neutral conductor cross-sectional area shall be considered (Section 524)."
            meaning={
              <>
                KCL at a three-phase node says ΣI = 0. With balanced linear loads the
                neutral current is zero; with single-phase imbalance or triplen-harmonic
                content (LED drivers, VFDs) the neutral can carry as much as or more than the
                phase current. KCL is the arithmetic that proves the neutral conductor
                selection is fit for purpose.
              </>
            }
            cite="Source: BS 7671 (latest edition incl. A4:2026) Regulation 524.1; IEC 60364-5-52."
          />

          <LearningOutcomes
            outcomes={[
              "State and explain Kirchhoff's Current Law with mathematical form",
              "State and explain Kirchhoff's Voltage Law with mathematical form",
              'Apply KCL to analyse current distribution at nodes',
              'Apply KVL to calculate voltage drops around circuit loops',
              'Use systematic methods for complex circuit analysis',
              'Apply both laws to building services scenarios',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="KCL: currents in = currents out at any node. KVL: voltages around any closed loop sum to zero."
          >
            <p className="text-sm font-medium text-elec-yellow/80">Kirchhoff's Current Law (KCL)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sum of currents at any node equals zero</li>
              <li>Currents entering = Currents leaving</li>
              <li>Based on conservation of charge</li>
              <li>Used for node (junction) analysis</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Kirchhoff's Voltage Law (KVL)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Sum of voltages around any closed loop equals zero</li>
              <li>Voltage rises = Voltage drops</li>
              <li>Based on conservation of energy</li>
              <li>Used for mesh (loop) analysis</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Kirchhoff's Current Law (KCL)">
            <p>
              Kirchhoff's Current Law, also known as Kirchhoff's first law or the junction rule, is
              based on the principle of conservation of electric charge. Since charge cannot be
              created or destroyed, all charge entering a junction must leave it.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Mathematical Statement</p>
            <p>
              <strong>ΣI = 0</strong> — The algebraic sum of currents at any node equals zero.
            </p>
            <p>
              <strong>ΣI<sub>in</sub> = ΣI<sub>out</sub></strong> — Currents entering a node equal
              currents leaving.
            </p>
            <p className="text-sm font-medium text-white">Understanding nodes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Node:</strong> Any point where two or more circuit elements connect
              </li>
              <li>
                <strong>Junction:</strong> A node where three or more branches meet
              </li>
              <li>Current is assigned positive entering the node, negative leaving (or vice versa - be consistent)</li>
              <li>KCL applies to every node in a circuit, no matter how complex</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Worked node example</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>I1 = 10A enters; I2 = 5A enters; I4 = 3A leaves</li>
              <li>By KCL: I1 + I2 = I3 + I4 → 10 + 5 = I3 + 3</li>
              <li>I3 = <strong>12A</strong> leaving the node</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> KCL must be satisfied at every instant in time, for both DC
              and AC circuits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Kirchhoff's Voltage Law (KVL)">
            <p>
              Kirchhoff's Voltage Law, also known as Kirchhoff's second law or the loop rule, is
              based on the conservation of energy. The work done on a charge around any closed path
              must equal zero - energy gained equals energy lost.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Mathematical Statement</p>
            <p>
              <strong>ΣV = 0</strong> — The algebraic sum of voltages around any closed loop equals
              zero.
            </p>
            <p>
              <strong>ΣV<sub>rises</sub> = ΣV<sub>drops</sub></strong> — EMF sources equal the sum
              of IR drops around the loop.
            </p>
            <p className="text-sm font-medium text-white">Sign conventions for KVL:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage rise:</strong> Crossing a source from - to + (positive EMF)
              </li>
              <li>
                <strong>Voltage drop:</strong> Crossing a resistor in the direction of current (positive drop)
              </li>
              <li>Choose a consistent direction to traverse each loop (clockwise or anticlockwise)</li>
              <li>Apply the sign convention consistently throughout</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Worked loop example</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Series circuit: 230V supply with three resistors dropping 80V, 100V, 50V</li>
              <li>Going clockwise: +230 - 80 - 100 - 50 = 0 ✓</li>
              <li>Supply EMF = sum of voltage drops</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> KVL applies to any closed path, whether it contains a
              source or not. It's the basis for voltage drop calculations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Applying KCL and KVL">
            <p>
              Complex circuits often require the systematic application of both laws. Two main
              approaches exist: node voltage analysis (primarily using KCL) and mesh current
              analysis (primarily using KVL).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Step-by-Step Method for Circuit Analysis</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1: Identify and Label</strong> — Label all nodes (A, B, C…), assign
                current directions to all branches, mark voltage polarities across components
              </li>
              <li>
                <strong>Step 2: Apply KCL at Nodes</strong> — Write KCL equation for each node
                (except reference). Express branch currents in terms of unknowns. Gives (n-1)
                equations for n nodes
              </li>
              <li>
                <strong>Step 3: Apply KVL around Loops</strong> — Identify independent loops
                (meshes), write KVL equation for each loop, use Ohm's Law (V = IR) for resistor
                drops
              </li>
              <li>
                <strong>Step 4: Solve the System</strong> — Combine KCL and KVL equations, solve
                simultaneous equations. Negative results indicate opposite direction to assumed
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Node Voltage vs Mesh Current Analysis</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Node Voltage:</strong> Primary law KCL. Best for circuits with fewer nodes than loops.
              </li>
              <li>
                <strong>Mesh Current:</strong> Primary law KVL. Best for circuits with fewer loops than nodes.
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> For building services, most practical problems can be solved by
              direct application of Ohm's Law with either KCL or KVL, without needing full mesh
              analysis.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Distribution Board Analysis">
            <p>
              Kirchhoff's Laws are essential for practical building services calculations. From
              sizing main cables at distribution boards to calculating earth fault loop impedance,
              these laws underpin safe electrical installation design.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main busbar:</strong> Acts as a node where KCL applies
              </li>
              <li>
                <strong>Incoming supply current:</strong> Sum of all outgoing circuit currents
              </li>
              <li>
                <strong>Diversity:</strong> Not all circuits at full load simultaneously
              </li>
              <li>
                <strong>Three-phase balance:</strong> KCL at star point determines neutral current
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">DB Load Calculation Example</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Lighting circuits: 2 × 10A = 20A</li>
              <li>Socket circuits: 4 × 20A = 80A</li>
              <li>Cooker circuit: 1 × 32A = 32A</li>
              <li>Immersion heater: 1 × 16A = 16A</li>
              <li>Total (no diversity): <strong>148A</strong></li>
              <li>With diversity (BS 7671): ~85A</li>
              <li>Main switch rating: 100A</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fault Current Paths">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Earth fault loop:</strong> Closed path for fault current to flow
              </li>
              <li>
                <strong>KCL at fault:</strong> Fault current equals return current through earth
              </li>
              <li>
                <strong>KVL around loop:</strong> Supply voltage = sum of IR drops in loop
              </li>
              <li>
                <strong>Fault current:</strong> If = U₀ / Zs
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Earth Loop Calculation (applying KVL)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Supply EMF: 230V</li>
              <li>External (Ze): 0.35 Ω</li>
              <li>Line conductor: 0.40 Ω</li>
              <li>CPC: 0.65 Ω</li>
              <li>Total Zs: <strong>1.40 Ω</strong></li>
              <li>Fault current: If = 230 / 1.40 = <strong>164A</strong></li>
              <li>For 32A Type B MCB: requires &gt;160A — OK</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Parallel Branch Currents and Voltage Drop (KVL)">
            <p className="text-sm font-medium text-elec-yellow/80">Two parallel heating elements (230V supply)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Element 1: R1 = 23 Ω → I1 = 230/23 = 10A</li>
              <li>Element 2: R2 = 46 Ω → I2 = 230/46 = 5A</li>
              <li>By KCL at junction: Supply current = I1 + I2 = 10 + 5 = 15A</li>
              <li>Combined resistance: 1/R = 1/23 + 1/46 → R = 15.33 Ω</li>
              <li>Check: I = 230/15.33 = 15A ✓</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage drop calculation (KVL)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Circuit: 230V supply, 25m cable run, 3kW load. Cable: 2.5mm² (7.41 mΩ/m, L+N)</li>
              <li>Load current: I = 3000/230 = 13.04A</li>
              <li>Cable resistance: R = 25 × 2 × 7.41/1000 = 0.37 Ω</li>
              <li>By KVL around loop: 230V = V<sub>cable</sub> + V<sub>load</sub></li>
              <li>V<sub>cable</sub> = I × R = 13.04 × 0.37 = 4.8V</li>
              <li>V<sub>load</sub> = 230 - 4.8 = 225.2V</li>
              <li>Voltage drop: 4.8V (2.1%) — within 5% limit</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Every BS 7671 voltage drop and fault loop calculation is
              an application of Kirchhoff's Laws.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Distribution Board Load Analysis</p>
            <p>
              <strong>Question:</strong> A single-phase DB supplies: 3 lighting circuits (6A, 8A,
              4A), 2 socket circuits (18A, 22A), and a 3kW immersion heater. Calculate the main
              switch rating required.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Immersion current: I = P/V = 3000/230 = 13A</li>
              <li>Apply KCL at main busbar: I_main = I1 + I2 + I3 + I4 + I5 + I6</li>
              <li>I_main = 6 + 8 + 4 + 18 + 22 + 13 = <strong>71A</strong></li>
              <li>Result: 80A main switch minimum (100A typical)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Parallel Branch Current Division</p>
            <p>
              <strong>Question:</strong> Three resistors (10 Ω, 20 Ω, 40 Ω) are connected in
              parallel across a 20V supply. Calculate each branch current and the total supply
              current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>By KVL: same voltage across each parallel branch</li>
              <li>I1 = V/R1 = 20/10 = 2A</li>
              <li>I2 = V/R2 = 20/20 = 1A</li>
              <li>I3 = V/R3 = 20/40 = 0.5A</li>
              <li>By KCL at junction: I_total = I1 + I2 + I3 = 2 + 1 + 0.5 = <strong>3.5A</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Series Circuit Voltage Drops</p>
            <p>
              <strong>Question:</strong> A 230V supply feeds three series resistors (15 Ω, 25 Ω, 6
              Ω). Calculate the current and voltage drop across each resistor.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total resistance: R_T = 15 + 25 + 6 = 46 Ω</li>
              <li>Circuit current: I = V/R_T = 230/46 = <strong>5A</strong></li>
              <li>V1 = I × R1 = 5 × 15 = 75V</li>
              <li>V2 = I × R2 = 5 × 25 = 125V</li>
              <li>V3 = I × R3 = 5 × 6 = 30V</li>
              <li>Verify with KVL: 230V = 75 + 125 + 30 = 230V ✓</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: Earth Fault Loop Impedance</p>
            <p>
              <strong>Question:</strong> An installation has Ze = 0.30 Ω. The circuit uses 30m of
              2.5mm² cable (r1 = 7.41 mΩ/m, r2 = 12.1 mΩ/m for 1.5mm² CPC). Calculate Zs and fault
              current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line resistance: R1 = 30 × 7.41/1000 = 0.222 Ω</li>
              <li>CPC resistance: R2 = 30 × 12.1/1000 = 0.363 Ω</li>
              <li>By KVL around fault loop: Zs = Ze + R1 + R2 = 0.30 + 0.222 + 0.363 = <strong>0.885 Ω</strong></li>
              <li>Fault current: If = 230/0.885 = <strong>260A</strong></li>
              <li>OK — sufficient for 32A Type B MCB (requires &gt;160A)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>KCL:</strong> Sum of I_in = Sum of I_out (at any node)
              </li>
              <li>
                <strong>KVL:</strong> Sum of V = 0 (around any closed loop)
              </li>
              <li>
                <strong>Combined:</strong> V = IR applied at each component
              </li>
              <li>
                <strong>Fault current:</strong> If = U₀ / Zs
              </li>
              <li>
                <strong>Voltage drop:</strong> Vd = I × R × L (for cables)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">When to Use Each Law</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>KCL:</strong> Finding how current splits between parallel paths
              </li>
              <li>
                <strong>KCL:</strong> Calculating main cable current from circuit loads
              </li>
              <li>
                <strong>KVL:</strong> Finding voltage drops in series circuits
              </li>
              <li>
                <strong>KVL:</strong> Earth fault loop and protective device verification
              </li>
              <li>
                <strong>Both:</strong> Complex circuits with multiple sources or loops
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common KCL/KVL mistakes"
            whatHappens={
              <>
                Sign errors from inconsistent current direction conventions. Missing components in
                KVL loops (forgetting CPC in fault loops). Applying KCL along wires instead of at
                junctions. Forgetting to convert mΩ/m to Ω.
              </>
            }
            doInstead={
              <>
                Pick a direction convention and stick to it — negative answers just mean the actual
                current flows the other way. List every element in the loop. Apply KCL only at
                junctions. Convert all resistance units before substituting.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Checking neutral current on a three-phase board with imbalanced LED lighting"
            situation={
              <>
                A three-phase 400 V distribution board feeds three single-phase lighting
                circuits: L1 carries 18 A, L2 carries 12 A, L3 carries 22 A — all LED
                luminaires with switched-mode drivers known to inject third-harmonic current.
                You need to confirm the existing 16 mm² neutral is adequate.
              </>
            }
            whatToDo={
              <>
                Apply KCL at the neutral node. For balanced linear loads the neutral current
                would be |I_L1 + I_L2 + I_L3| (vectorially) at the phase angles 0°,
                120°, 240° — about 8.7 A here. But with significant third-harmonic
                content the triplen harmonics from each phase add arithmetically in the
                neutral, so the harmonic component in the neutral can exceed the fundamental
                phase current. Reference BS 7671 Section 524 and IEC 61000-3-2 limits, then
                size the neutral for the worst-case combined fundamental + harmonic current.
                If the existing neutral is undersized, derate the circuit, upgrade to the
                next conductor size or fit harmonic mitigation.
              </>
            }
            whyItMatters={
              <>
                Kirchhoff’s laws are not abstract theory — they are how you spot a
                neutral that is hot to the touch even though every phase MCB is well within
                rating. Failing to apply KCL with harmonic content has caused neutral fires in
                LED-retrofit office buildings.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'KCL: ΣI = 0 at any node — current in equals current out. The arithmetic behind every distribution board, every fault-current split and every neutral sizing.',
              'KVL: ΣV = 0 round any closed loop — supply voltage equals the sum of every cable and load drop. The basis of every voltage-drop check.',
              'The two laws together solve any linear network the simple series/parallel rules cannot — mesh analysis (KVL) and nodal analysis (KCL).',
              'Sign convention matters: pick a positive direction for currents and voltages and stay consistent round the loop or at the node.',
              'Three-phase balanced linear loads: phasor sum of phase currents = 0, so the neutral carries no fundamental current.',
              'Three-phase non-linear loads (LED drivers, VFDs): triplen harmonics add arithmetically in the neutral — the neutral can exceed the phase current, driving a Section 524 sizing check.',
              'KVL applied across a fault loop is the source of I_f = U₀ / Z_s — the protective device disconnection check.',
              'Both laws are conservation laws — charge (KCL) and energy (KVL) cannot be created or destroyed. They hold for AC, DC and any waveform.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Parallel Circuits
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Network Theorems
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_5;
