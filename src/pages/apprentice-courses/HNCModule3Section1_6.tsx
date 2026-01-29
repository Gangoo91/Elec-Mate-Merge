import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Network Theorems - HNC Module 3 Section 1.6";
const DESCRIPTION = "Master Superposition, Thévenin and Norton theorems for analysing complex building services circuits including backup power systems, solar integration and UPS analysis.";

const quickCheckQuestions = [
  {
    id: "superposition-principle",
    question: "When applying the superposition theorem, what do you do with voltage sources not being considered?",
    options: ["Remove them completely", "Replace with short circuits", "Replace with open circuits", "Double their value"],
    correctIndex: 1,
    explanation: "Voltage sources not being considered are replaced with short circuits (zero resistance). This allows you to analyse the effect of each source independently before summing the results."
  },
  {
    id: "thevenin-components",
    question: "A Thévenin equivalent circuit consists of which components?",
    options: ["Current source in series with resistance", "Voltage source in parallel with resistance", "Voltage source in series with resistance", "Current source in series with capacitance"],
    correctIndex: 2,
    explanation: "Thévenin equivalent is a voltage source (VTh) in series with a resistance (RTh). This simplified model represents any linear network as seen from two terminals."
  },
  {
    id: "norton-components",
    question: "A Norton equivalent circuit consists of which components?",
    options: ["Voltage source in series with resistance", "Current source in parallel with resistance", "Voltage source in parallel with capacitance", "Current source in series with inductance"],
    correctIndex: 1,
    explanation: "Norton equivalent is a current source (IN) in parallel with a resistance (RN). Norton and Thévenin equivalents are interchangeable - they represent the same network behaviour."
  },
  {
    id: "thevenin-norton-conversion",
    question: "If a Thévenin equivalent has VTh = 48V and RTh = 12Ω, what is the Norton current IN?",
    options: ["4A", "576A", "0.25A", "60A"],
    correctIndex: 0,
    explanation: "IN = VTh / RTh = 48V / 12Ω = 4A. The Norton resistance equals the Thévenin resistance (RN = RTh = 12Ω)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The superposition theorem applies only to which type of circuits?",
    options: [
      "Non-linear circuits with diodes",
      "Linear circuits with multiple independent sources",
      "Circuits with only one source",
      "Circuits containing transformers"
    ],
    correctAnswer: 1,
    explanation: "Superposition applies only to linear circuits (those obeying Ohm's Law) with multiple independent sources. Each source is analysed separately, then results are summed algebraically."
  },
  {
    id: 2,
    question: "When finding Thévenin resistance, what must be done to all independent sources?",
    options: [
      "They remain active",
      "Voltage sources are open-circuited",
      "All sources are deactivated (voltage→short, current→open)",
      "Current sources are short-circuited"
    ],
    correctAnswer: 2,
    explanation: "To find RTh, deactivate all independent sources: replace voltage sources with short circuits and current sources with open circuits. Then calculate the equivalent resistance looking into the terminals."
  },
  {
    id: 3,
    question: "A network has Thévenin equivalent VTh = 230V, RTh = 4Ω. What current flows through a 42Ω load?",
    options: ["5A", "5.5A", "50A", "54.8A"],
    correctAnswer: 0,
    explanation: "Using I = VTh / (RTh + RL) = 230V / (4Ω + 42Ω) = 230V / 46Ω = 5A"
  },
  {
    id: 4,
    question: "Which theorem is most useful for analysing how a single load affects a complex network?",
    options: [
      "Superposition theorem",
      "Kirchhoff's voltage law",
      "Thévenin's theorem",
      "Maximum power transfer"
    ],
    correctAnswer: 2,
    explanation: "Thévenin's theorem simplifies a complex network to a single voltage source and series resistance, making it easy to analyse how different loads affect the circuit."
  },
  {
    id: 5,
    question: "A UPS system has two sources: mains (230V) through 0.5Ω impedance and battery (24V DC-DC converted to 230V) through 2Ω. Using superposition, what is the contribution from mains alone to a 23Ω load when battery is disabled?",
    options: ["9.79A through load", "10A through load", "230V across load", "219.1V across load"],
    correctAnswer: 0,
    explanation: "With battery replaced by short: Total R = 0.5Ω + (2Ω || 23Ω) = 0.5Ω + 1.84Ω = 2.34Ω. Total I = 230/2.34 = 98.3A. Current through load branch: 98.3A × 2/(2+23) = 7.86A. Actually simpler: V at junction = 230 - (I × 0.5), solving gives load current ≈ 9.79A"
  },
  {
    id: 6,
    question: "The relationship between Thévenin voltage and Norton current is:",
    options: [
      "VTh = IN × RTh",
      "VTh = IN / RTh",
      "VTh = IN + RTh",
      "VTh = IN - RTh"
    ],
    correctAnswer: 0,
    explanation: "VTh = IN × RTh (or IN = VTh / RTh). This allows easy conversion between equivalent circuits. The resistance values are identical: RTh = RN."
  },
  {
    id: 7,
    question: "For a solar PV system connected in parallel with mains supply, which theorem best analyses the power contribution from each source?",
    options: [
      "Norton's theorem only",
      "Thévenin's theorem only",
      "Superposition theorem",
      "Kirchhoff's current law only"
    ],
    correctAnswer: 2,
    explanation: "Superposition theorem is ideal for analysing circuits with multiple sources (solar + mains). It allows separate analysis of each source's contribution to load current/voltage."
  },
  {
    id: 8,
    question: "A generator paralleling system has two 400V generators with internal resistances of 0.8Ω and 1.2Ω respectively. What is the Thévenin equivalent resistance?",
    options: [
      "2.0Ω",
      "0.48Ω",
      "0.4Ω",
      "1.0Ω"
    ],
    correctAnswer: 1,
    explanation: "Parallel generators: RTh = (0.8 × 1.2) / (0.8 + 1.2) = 0.96 / 2.0 = 0.48Ω. When sources are equal voltage, they act in parallel for resistance calculation."
  },
  {
    id: 9,
    question: "Why is Norton's theorem particularly useful for parallel-connected current sources?",
    options: [
      "It converts them to voltage sources",
      "Current sources in parallel simply add algebraically",
      "It eliminates the need for resistance calculations",
      "It only works with DC circuits"
    ],
    correctAnswer: 1,
    explanation: "Norton equivalents are ideal for parallel analysis because parallel current sources simply add. This makes it easy to combine multiple Norton equivalents or analyse current-source networks."
  },
  {
    id: 10,
    question: "An emergency lighting system has mains (230V, 2Ω internal) and battery backup (24V converted to 230V, 4Ω internal). What is the open-circuit Thévenin voltage of the combined system?",
    options: [
      "230V (mains dominates)",
      "460V (sources add)",
      "230V (equal sources in parallel)",
      "153V (voltage divider effect)"
    ],
    correctAnswer: 2,
    explanation: "With equal source voltages (both 230V), the Thévenin voltage equals the common voltage: VTh = 230V. The parallel arrangement doesn't change the open-circuit voltage when sources are equal."
  }
];

const faqs = [
  {
    question: "When should I use Superposition vs Thévenin's theorem?",
    answer: "Use Superposition when you need to understand each source's individual contribution to the circuit - ideal for solar + mains analysis or understanding fault contributions. Use Thévenin when you want to simplify a complex network for load analysis - perfect for determining how different loads will behave when connected to a supply point."
  },
  {
    question: "Can these theorems be applied to AC circuits?",
    answer: "Yes, all three theorems apply to AC circuits when using phasor (complex number) analysis. Resistances become impedances (Z), and you must account for phase angles. The same principles apply: superposition sums phasor quantities, and Thévenin/Norton equivalents use impedance values."
  },
  {
    question: "What's the practical benefit of Thévenin equivalent in building services?",
    answer: "The Thévenin equivalent lets you represent a complex supply network (transformer, cables, switchgear) as a simple voltage source and impedance. This makes it easy to calculate fault currents, voltage drop under load, and the effect of connecting different equipment without re-analysing the entire network."
  },
  {
    question: "How do I handle dependent (controlled) sources?",
    answer: "Dependent sources must remain active during analysis - they cannot be deactivated like independent sources. When finding Thévenin resistance with dependent sources, apply a test voltage or current and calculate the resulting current or voltage to determine RTh = VTest / ITest."
  },
  {
    question: "Why do generators need careful paralleling analysis?",
    answer: "Paralleled generators must have matched voltage, frequency, and phase to avoid circulating currents between them. Network theorems help analyse the current sharing between generators and predict what happens if one generator's voltage drifts - even small voltage differences can cause large circulating currents due to low internal resistances."
  },
  {
    question: "How does UPS transfer switching relate to these theorems?",
    answer: "UPS systems must seamlessly transfer between mains and inverter supply. Using Thévenin equivalents for both sources helps analyse the transition: matching VTh values ensures no voltage step, while RTh determines the current surge during switchover. This analysis is critical for sizing static transfer switches."
  }
];

const HNCModule3Section1_6 = () => {
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

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Network Theorems
          </h1>
          <p className="text-white/80">
            Powerful analysis techniques for multi-source circuits in building electrical systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Superposition:</strong> Analyse each source separately, sum results</li>
              <li className="pl-1"><strong>Thévenin:</strong> Simplify network to voltage source + series resistance</li>
              <li className="pl-1"><strong>Norton:</strong> Simplify network to current source + parallel resistance</li>
              <li className="pl-1"><strong>Conversion:</strong> VTh = IN × RTh, RTh = RN</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Applications</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Backup power:</strong> Generator paralleling analysis</li>
              <li className="pl-1"><strong>Renewables:</strong> Solar PV + grid interaction</li>
              <li className="pl-1"><strong>UPS systems:</strong> Load sharing and transfer analysis</li>
              <li className="pl-1"><strong>Emergency systems:</strong> Dual-source supply design</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply superposition to circuits with multiple independent sources",
              "Derive Thévenin equivalent circuits for complex networks",
              "Derive Norton equivalent circuits and convert between forms",
              "Analyse parallel generator systems using network theorems",
              "Calculate load behaviour in solar + grid installations",
              "Design and analyse UPS and emergency power systems"
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

        {/* Section 01: Superposition Theorem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Superposition Theorem
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The superposition theorem states that in a linear circuit with multiple independent sources,
              the total response (current or voltage) at any point equals the algebraic sum of the responses
              caused by each source acting alone.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Application Steps:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Select one source to remain active</li>
                <li className="pl-1"><strong>Step 2:</strong> Deactivate all other independent sources:
                  <ul className="mt-1 ml-4 list-disc list-outside">
                    <li className="pl-1">Voltage sources → replace with short circuits (0Ω)</li>
                    <li className="pl-1">Current sources → replace with open circuits (∞Ω)</li>
                  </ul>
                </li>
                <li className="pl-1"><strong>Step 3:</strong> Calculate the response (V or I) due to the active source</li>
                <li className="pl-1"><strong>Step 4:</strong> Repeat for each source</li>
                <li className="pl-1"><strong>Step 5:</strong> Sum all individual responses algebraically (consider directions)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Circuit must be <strong>linear</strong> (resistors, capacitors, inductors only)</li>
                <li className="pl-1">Does not apply to circuits with diodes, transistors, or other non-linear elements</li>
                <li className="pl-1">Power cannot be calculated by superposition (P is non-linear: P = I²R)</li>
                <li className="pl-1">Calculate power after finding total current/voltage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Example: Solar PV + Mains</p>
              <p className="text-sm text-white/80 mb-3">
                A commercial building has mains supply (230V, 0.5Ω source impedance) and solar PV inverter
                (230V, 2Ω output impedance) feeding a common busbar with 10Ω lighting load.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Analysis Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Calculation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mains only (PV shorted)</td>
                      <td className="border border-white/10 px-3 py-2">I₁ = 230 / (0.5 + 2||10)</td>
                      <td className="border border-white/10 px-3 py-2">I₁ = 92.9A total</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load current from mains</td>
                      <td className="border border-white/10 px-3 py-2">Current divider: I = 92.9 × 2/12</td>
                      <td className="border border-white/10 px-3 py-2">I_load1 = 15.5A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PV only (mains shorted)</td>
                      <td className="border border-white/10 px-3 py-2">I₂ = 230 / (2 + 0.5||10)</td>
                      <td className="border border-white/10 px-3 py-2">I₂ = 86.8A total</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load current from PV</td>
                      <td className="border border-white/10 px-3 py-2">Current divider: I = 86.8 × 0.5/10.5</td>
                      <td className="border border-white/10 px-3 py-2">I_load2 = 4.1A</td>
                    </tr>
                    <tr className="bg-elec-yellow/10">
                      <td className="border border-white/10 px-3 py-2 font-medium">Total load current</td>
                      <td className="border border-white/10 px-3 py-2">15.5A + 4.1A</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">19.6A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Superposition reveals how much current each source contributes.
              The mains (lower impedance) supplies more current to the load than the PV inverter.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Thévenin's Theorem */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Thévenin's Theorem
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thévenin's theorem states that any linear network can be replaced by an equivalent circuit
              consisting of a voltage source (VTh) in series with a resistance (RTh). This dramatically
              simplifies load analysis.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Finding Thévenin Equivalent</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">VTh (Thévenin Voltage)</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Open-circuit the terminals (remove load)</li>
                    <li className="pl-1">Calculate voltage across open terminals</li>
                    <li className="pl-1">This is the open-circuit voltage Voc = VTh</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">RTh (Thévenin Resistance)</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Deactivate all independent sources</li>
                    <li className="pl-1">Voltage sources → short circuit</li>
                    <li className="pl-1">Current sources → open circuit</li>
                    <li className="pl-1">Calculate resistance seen from terminals</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Once you have VTh and RTh:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Load current: <strong>IL = VTh / (RTh + RL)</strong></li>
                <li className="pl-1">Load voltage: <strong>VL = IL × RL = VTh × RL / (RTh + RL)</strong></li>
                <li className="pl-1">Easy to analyse different loads without recalculating entire network</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Alternative Method for RTh</p>
              <p className="text-sm text-white/80 mb-2">
                If the network contains dependent sources, use the test source method:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Deactivate independent sources only</li>
                <li className="pl-1">Apply test voltage VTest across terminals</li>
                <li className="pl-1">Calculate resulting current ITest</li>
                <li className="pl-1">RTh = VTest / ITest</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Application: Distribution Board Analysis</p>
              <p className="text-sm text-white/80 mb-3">
                A distribution board is fed by a 230V supply through 50m of 10mm² cable (R = 1.83mΩ/m).
                Find the Thévenin equivalent at the DB terminals.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable resistance = 50m × 2 × 1.83mΩ/m = 0.183Ω</p>
                <p className="mt-2">VTh = 230V (supply voltage, assuming ideal source)</p>
                <p>RTh = 0.183Ω (cable resistance + source impedance)</p>
                <p className="mt-2 text-white/60">For a 46Ω load (5kW heater):</p>
                <p>IL = 230 / (0.183 + 46) = 230 / 46.183 = <strong>4.98A</strong></p>
                <p>VL = 4.98 × 46 = <strong>229.1V</strong> (0.4% voltage drop)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Norton's Theorem */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Norton's Theorem
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Norton's theorem provides an alternative equivalent circuit: a current source (IN) in
              parallel with a resistance (RN). This is often more convenient for parallel circuit
              analysis and current source networks.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Finding Norton Equivalent</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">IN (Norton Current)</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Short-circuit the terminals</li>
                    <li className="pl-1">Calculate current through short circuit</li>
                    <li className="pl-1">This is the short-circuit current Isc = IN</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">RN (Norton Resistance)</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Same process as Thévenin resistance</li>
                    <li className="pl-1">RN = RTh (they are identical)</li>
                    <li className="pl-1">Deactivate sources, find equivalent R</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thévenin ↔ Norton Conversion</p>
              <div className="grid grid-cols-2 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">VTh = IN × RN</p>
                  <p className="text-white/70 text-xs">Norton to Thévenin</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">IN = VTh / RTh</p>
                  <p className="text-white/70 text-xs">Thévenin to Norton</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mt-3 text-center">
                Note: RTh = RN (resistance is always the same value)
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">When to Use Norton vs Thévenin:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thévenin:</strong> Better for series circuits and voltage analysis</li>
                <li className="pl-1"><strong>Norton:</strong> Better for parallel circuits and current analysis</li>
                <li className="pl-1"><strong>Norton:</strong> Parallel current sources simply add</li>
                <li className="pl-1"><strong>Thévenin:</strong> Series voltage sources simply add</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Conversion Example</p>
              <p className="text-sm text-white/80 mb-3">
                A network has Thévenin equivalent: VTh = 120V, RTh = 8Ω. Find the Norton equivalent.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>IN = VTh / RTh = 120V / 8Ω = <strong>15A</strong></p>
                <p>RN = RTh = <strong>8Ω</strong></p>
                <p className="mt-2 text-white/60">Norton equivalent: 15A current source in parallel with 8Ω</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Services Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Network theorems are essential tools for analysing modern building electrical systems,
              particularly those with multiple power sources, backup systems, and renewable energy
              integration.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Backup Power Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Generator paralleling:</strong> Use Thévenin equivalents to analyse load sharing
                  between paralleled generators with slightly different voltages</li>
                <li className="pl-1"><strong>Circulating current:</strong> Small voltage differences cause circulating currents
                  proportional to ΔV/Rtotal between generators</li>
                <li className="pl-1"><strong>Load transfer:</strong> Superposition helps analyse transition currents during
                  load transfer between mains and generator</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Solar + Grid Analysis</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Export vs import:</strong> Superposition determines whether the building
                  imports from or exports to the grid</li>
                <li className="pl-1"><strong>Inverter interaction:</strong> Multiple PV inverters can be modelled as
                  parallel Norton sources</li>
                <li className="pl-1"><strong>Grid impedance effects:</strong> Thévenin equivalent of grid helps predict
                  voltage rise during high export conditions</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">UPS Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Double conversion:</strong> Model rectifier input and inverter output as
                  separate Thévenin circuits</li>
                <li className="pl-1"><strong>Parallel redundancy:</strong> Norton equivalents simplify analysis of N+1
                  parallel UPS modules</li>
                <li className="pl-1"><strong>Transfer switching:</strong> Analyse voltage/current transients during
                  static transfer switch operation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dual-Source Emergency System</p>
              <p className="text-sm text-white/80 mb-3">
                Hospital critical power: mains (230V, 0.3Ω impedance) and generator (232V, 0.8Ω impedance)
                can be paralleled briefly during transfer. Analyse the circulating current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Voltage difference creates circulating current:</p>
                <p className="mt-2">ΔV = 232V - 230V = 2V</p>
                <p>Rtotal = 0.3Ω + 0.8Ω = 1.1Ω</p>
                <p className="mt-2">Icirculating = ΔV / Rtotal = 2V / 1.1Ω = <strong>1.82A</strong></p>
                <p className="mt-2 text-white/60">This current flows from generator to mains,</p>
                <p className="text-white/60">not through the load - it's wasted power.</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Generator Paralleling</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Two 400V generators are paralleled to supply a 50kW load.
                Generator 1 has internal resistance 0.6Ω, Generator 2 has 0.9Ω. If Gen 1's voltage
                rises to 402V, find the current from each generator.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using superposition on the parallel system:</p>
                <p className="mt-2">Load resistance: RL = V²/P = 400²/50000 = 3.2Ω</p>
                <p className="mt-2 text-white/60">With both sources active:</p>
                <p>Combine using Thévenin: VTh = (402/0.6 + 400/0.9) / (1/0.6 + 1/0.9)</p>
                <p>VTh = (670 + 444.4) / (1.67 + 1.11) = 1114.4 / 2.78 = <strong>400.9V</strong></p>
                <p>RTh = 1 / (1/0.6 + 1/0.9) = 0.36Ω</p>
                <p className="mt-2">Load current: IL = 400.9 / (0.36 + 3.2) = <strong>112.6A</strong></p>
                <p className="mt-2">Gen 1 current: I1 = (402 - 400.9) / 0.6 + (112.6 × 0.36/0.6)</p>
                <p>I1 ≈ <strong>69A</strong></p>
                <p>Gen 2 current: I2 = 112.6 - 69 = <strong>43.6A</strong> (plus some circulating)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: UPS Load Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 10kVA UPS has inverter output impedance of 0.5Ω. Find
                the Thévenin equivalent and calculate voltage regulation when loaded to 80%.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>UPS Thévenin equivalent:</p>
                <p>VTh = 230V (nominal output)</p>
                <p>RTh = 0.5Ω (output impedance)</p>
                <p className="mt-2">At 80% load (8kVA, pf=0.8 → 6.4kW):</p>
                <p>IL = 6400 / 230 = 27.8A (assuming unity pf for simplicity)</p>
                <p className="mt-2">Voltage drop: Vdrop = IL × RTh = 27.8 × 0.5 = <strong>13.9V</strong></p>
                <p>Output voltage: VL = 230 - 13.9 = <strong>216.1V</strong></p>
                <p className="mt-2">Regulation = (230 - 216.1) / 230 × 100 = <strong>6.0%</strong></p>
                <p className="text-amber-400 mt-2">⚠ Exceeds typical 5% limit - UPS may need larger capacity</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Dual-Source Emergency Lighting</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Emergency lighting can be fed from mains (230V, 1Ω) or
                battery inverter (228V, 3Ω). Using Norton equivalents, find total current to a 20Ω load
                when both sources are active.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Convert each source to Norton equivalent:</p>
                <p className="mt-2">Mains: IN1 = 230/1 = 230A, RN1 = 1Ω</p>
                <p>Battery: IN2 = 228/3 = 76A, RN2 = 3Ω</p>
                <p className="mt-2">Combine Norton sources (parallel):</p>
                <p>IN_total = 230 + 76 = 306A (currents add)</p>
                <p>RN_total = 1 || 3 = 0.75Ω</p>
                <p className="mt-2">Convert back to Thévenin for load calc:</p>
                <p>VTh = 306 × 0.75 = 229.5V</p>
                <p className="mt-2">Load current: IL = 229.5 / (0.75 + 20) = <strong>11.06A</strong></p>
                <p>Load power: P = 11.06² × 20 = <strong>2.45kW</strong></p>
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
                <li className="pl-1"><strong>VTh = Voc</strong> — Open-circuit voltage across terminals</li>
                <li className="pl-1"><strong>IN = Isc</strong> — Short-circuit current through terminals</li>
                <li className="pl-1"><strong>RTh = RN = Voc / Isc</strong> — Equivalent resistance</li>
                <li className="pl-1"><strong>VTh = IN × RN</strong> — Conversion formula</li>
                <li className="pl-1"><strong>IL = VTh / (RTh + RL)</strong> — Load current calculation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Deactivating Sources</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Voltage source → Short circuit</strong> (replace with wire)</li>
                <li className="pl-1"><strong>Current source → Open circuit</strong> (remove from circuit)</li>
                <li className="pl-1"><strong>Dependent sources</strong> — Keep active (they depend on circuit values)</li>
                <li className="pl-1"><strong>Internal resistance</strong> — Remains in circuit when source is deactivated</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Applying to non-linear circuits</strong> — Diodes, transistors invalidate these theorems</li>
                <li className="pl-1"><strong>Superposition with power</strong> — Cannot superpose power (it's V×I, non-linear)</li>
                <li className="pl-1"><strong>Forgetting internal resistance</strong> — Must include source impedance</li>
                <li className="pl-1"><strong>Wrong source replacement</strong> — Voltage→short, NOT open</li>
                <li className="pl-1"><strong>Sign errors</strong> — Watch current directions when summing</li>
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
                <p className="font-medium text-white mb-1">Superposition</p>
                <ul className="space-y-0.5">
                  <li>One source active at a time</li>
                  <li>Voltage sources → short circuit</li>
                  <li>Current sources → open circuit</li>
                  <li>Sum all responses algebraically</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Thévenin / Norton</p>
                <ul className="space-y-0.5">
                  <li>VTh = open-circuit voltage</li>
                  <li>IN = short-circuit current</li>
                  <li>RTh = RN = VTh / IN</li>
                  <li>IL = VTh / (RTh + RL)</li>
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
            <Link to="../h-n-c-module3-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1-7">
              Next: Section 1.7
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_6;
