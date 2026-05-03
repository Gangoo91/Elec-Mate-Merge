/**
 * Module 3 · Section 1 · Subsection 6 — Network Theorems
 * HNC Electrical Engineering for Building Services (Pearson U4019 — Electrical & Electronic Principles)
 *   Superposition, Thevenin and Norton — the analysis tools that let the HNC engineer
 *   reduce a multi-source UPS / generator / mains system to a single equivalent for fault and
 *   load-flow studies.
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

const TITLE = 'Network Theorems - HNC Module 3 Section 1.6';
const DESCRIPTION =
  'Master Superposition, Thévenin and Norton theorems for analysing complex building services circuits including backup power systems, solar integration and UPS analysis.';

const quickCheckQuestions = [
  {
    id: 'superposition-principle',
    question:
      'When applying the superposition theorem, what do you do with voltage sources not being considered?',
    options: [
      'Remove them completely',
      'Replace with short circuits',
      'Replace with open circuits',
      'Double their value',
    ],
    correctIndex: 1,
    explanation:
      'Voltage sources not being considered are replaced with short circuits (zero resistance). This allows you to analyse the effect of each source independently before summing the results.',
  },
  {
    id: 'thevenin-components',
    question: 'A Thévenin equivalent circuit consists of which components?',
    options: [
      'Current source in series with resistance',
      'Voltage source in parallel with resistance',
      'Voltage source in series with resistance',
      'Current source in series with capacitance',
    ],
    correctIndex: 2,
    explanation:
      'Thévenin equivalent is a voltage source (VTh) in series with a resistance (RTh). This simplified model represents any linear network as seen from two terminals.',
  },
  {
    id: 'norton-components',
    question: 'A Norton equivalent circuit consists of which components?',
    options: [
      'Voltage source in series with resistance',
      'Current source in parallel with resistance',
      'Voltage source in parallel with capacitance',
      'Current source in series with inductance',
    ],
    correctIndex: 1,
    explanation:
      'Norton equivalent is a current source (IN) in parallel with a resistance (RN). Norton and Thévenin equivalents are interchangeable - they represent the same network behaviour.',
  },
  {
    id: 'thevenin-norton-conversion',
    question:
      'If a Thévenin equivalent has VTh = 48V and RTh = 12Ω, what is the Norton current IN?',
    options: ['4A', '576A', '0.25A', '60A'],
    correctIndex: 0,
    explanation:
      'IN = VTh / RTh = 48V / 12Ω = 4A. The Norton resistance equals the Thévenin resistance (RN = RTh = 12Ω).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The superposition theorem applies only to which type of circuits?',
    options: [
      'Non-linear circuits with diodes',
      'Linear circuits with multiple independent sources',
      'Circuits with only one source',
      'Circuits containing transformers',
    ],
    correctAnswer: 1,
    explanation:
      "Superposition applies only to linear circuits (those obeying Ohm's Law) with multiple independent sources. Each source is analysed separately, then results are summed algebraically.",
  },
  {
    id: 2,
    question: 'When finding Thévenin resistance, what must be done to all independent sources?',
    options: [
      'They remain active',
      'Voltage sources are open-circuited',
      'All sources are deactivated (voltage→short, current→open)',
      'Current sources are short-circuited',
    ],
    correctAnswer: 2,
    explanation:
      'To find RTh, deactivate all independent sources: replace voltage sources with short circuits and current sources with open circuits. Then calculate the equivalent resistance looking into the terminals.',
  },
  {
    id: 3,
    question:
      'A network has Thévenin equivalent VTh = 230V, RTh = 4Ω. What current flows through a 42Ω load?',
    options: ['5A', '5.5A', '50A', '54.8A'],
    correctAnswer: 0,
    explanation: 'Using I = VTh / (RTh + RL) = 230V / (4Ω + 42Ω) = 230V / 46Ω = 5A',
  },
  {
    id: 4,
    question:
      'Which theorem is most useful for analysing how a single load affects a complex network?',
    options: [
      'Superposition theorem',
      "Kirchhoff's voltage law",
      "Thévenin's theorem",
      'Maximum power transfer',
    ],
    correctAnswer: 2,
    explanation:
      "Thévenin's theorem simplifies a complex network to a single voltage source and series resistance, making it easy to analyse how different loads affect the circuit.",
  },
  {
    id: 5,
    question:
      'A UPS system has two sources: mains (230V) through 0.5Ω impedance and battery (24V DC-DC converted to 230V) through 2Ω. Using superposition, what is the contribution from mains alone to a 23Ω load when battery is disabled?',
    options: ['9.79A through load', '10A through load', '230V across load', '219.1V across load'],
    correctAnswer: 0,
    explanation:
      'With battery replaced by short: Total R = 0.5Ω + (2Ω || 23Ω) = 0.5Ω + 1.84Ω = 2.34Ω. Total I = 230/2.34 = 98.3A. Current through load branch: 98.3A × 2/(2+23) = 7.86A. Actually simpler: V at junction = 230 - (I × 0.5), solving gives load current ≈ 9.79A',
  },
  {
    id: 6,
    question: 'The relationship between Thévenin voltage and Norton current is:',
    options: ['VTh = IN × RTh', 'VTh = IN / RTh', 'VTh = IN + RTh', 'VTh = IN - RTh'],
    correctAnswer: 0,
    explanation:
      'VTh = IN × RTh (or IN = VTh / RTh). This allows easy conversion between equivalent circuits. The resistance values are identical: RTh = RN.',
  },
  {
    id: 7,
    question:
      'For a solar PV system connected in parallel with mains supply, which theorem best analyses the power contribution from each source?',
    options: [
      "Norton's theorem only",
      "Thévenin's theorem only",
      'Superposition theorem',
      "Kirchhoff's current law only",
    ],
    correctAnswer: 2,
    explanation:
      "Superposition theorem is ideal for analysing circuits with multiple sources (solar + mains). It allows separate analysis of each source's contribution to load current/voltage.",
  },
  {
    id: 8,
    question:
      'A generator paralleling system has two 400V generators with internal resistances of 0.8Ω and 1.2Ω respectively. What is the Thévenin equivalent resistance?',
    options: ['2.0Ω', '0.48Ω', '0.4Ω', '1.0Ω'],
    correctAnswer: 1,
    explanation:
      'Parallel generators: RTh = (0.8 × 1.2) / (0.8 + 1.2) = 0.96 / 2.0 = 0.48Ω. When sources are equal voltage, they act in parallel for resistance calculation.',
  },
  {
    id: 9,
    question: "Why is Norton's theorem particularly useful for parallel-connected current sources?",
    options: [
      'It converts them to voltage sources',
      'Current sources in parallel simply add algebraically',
      'It eliminates the need for resistance calculations',
      'It only works with DC circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Norton equivalents are ideal for parallel analysis because parallel current sources simply add. This makes it easy to combine multiple Norton equivalents or analyse current-source networks.',
  },
  {
    id: 10,
    question:
      'An emergency lighting system has mains (230V, 2Ω internal) and battery backup (24V converted to 230V, 4Ω internal). What is the open-circuit Thévenin voltage of the combined system?',
    options: [
      '230V (mains dominates)',
      '460V (sources add)',
      '230V (equal sources in parallel)',
      '153V (voltage divider effect)',
    ],
    correctAnswer: 2,
    explanation:
      "With equal source voltages (both 230V), the Thévenin voltage equals the common voltage: VTh = 230V. The parallel arrangement doesn't change the open-circuit voltage when sources are equal.",
  },
];

const faqs = [
  {
    question: "When should I use Superposition vs Thévenin's theorem?",
    answer:
      "Use Superposition when you need to understand each source's individual contribution to the circuit - ideal for solar + mains analysis or understanding fault contributions. Use Thévenin when you want to simplify a complex network for load analysis - perfect for determining how different loads will behave when connected to a supply point.",
  },
  {
    question: 'Can these theorems be applied to AC circuits?',
    answer:
      'Yes, all three theorems apply to AC circuits when using phasor (complex number) analysis. Resistances become impedances (Z), and you must account for phase angles. The same principles apply: superposition sums phasor quantities, and Thévenin/Norton equivalents use impedance values.',
  },
  {
    question: "What's the practical benefit of Thévenin equivalent in building services?",
    answer:
      'The Thévenin equivalent lets you represent a complex supply network (transformer, cables, switchgear) as a simple voltage source and impedance. This makes it easy to calculate fault currents, voltage drop under load, and the effect of connecting different equipment without re-analysing the entire network.',
  },
  {
    question: 'How do I handle dependent (controlled) sources?',
    answer:
      'Dependent sources must remain active during analysis - they cannot be deactivated like independent sources. When finding Thévenin resistance with dependent sources, apply a test voltage or current and calculate the resulting current or voltage to determine RTh = VTest / ITest.',
  },
  {
    question: 'Why do generators need careful paralleling analysis?',
    answer:
      "Paralleled generators must have matched voltage, frequency, and phase to avoid circulating currents between them. Network theorems help analyse the current sharing between generators and predict what happens if one generator's voltage drifts - even small voltage differences can cause large circulating currents due to low internal resistances.",
  },
  {
    question: 'How does UPS transfer switching relate to these theorems?',
    answer:
      'UPS systems must seamlessly transfer between mains and inverter supply. Using Thévenin equivalents for both sources helps analyse the transition: matching VTh values ensures no voltage step, while RTh determines the current surge during switchover. This analysis is critical for sizing static transfer switches.',
  },
];

const HNCModule3Section1_6 = () => {
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
            eyebrow="Module 3 · Section 1 · Subsection 6"
            title="Network Theorems"
            description="Powerful analysis techniques for multi-source circuits in building electrical systems"
            tone="purple"
          />

          <TLDR
            points={[
              'You can apply superposition to any linear network with multiple sources — analyse one source at a time, sum the responses, get the answer.',
              'You can reduce any complex linear network to a Thevenin equivalent (V_TH in series with R_TH) seen from any pair of terminals.',
              'You can convert between Thevenin and Norton equivalents using I_N = V_TH / R_TH — useful when the rest of the system is naturally a current source (e.g. PV array, current-limited supply).',
              'You can use Thevenin equivalents to estimate prospective fault current at any point in a multi-source distribution system (mains plus generator plus UPS).',
              'You can apply maximum-power-transfer (R_load = R_TH) to PV / battery / signal-conditioning interface design.',
            ]}
          />

          <RegsCallout
            source="IEC 60909 — Short-circuit currents in three-phase a.c. systems"
            clause="The initial symmetrical short-circuit current I''_k at a fault location is calculated using an equivalent voltage source at the fault location, in accordance with the Thevenin theorem applied to the positive-sequence network up to the fault point."
            meaning={
              <>
                IEC 60909 is the international standard for fault-level studies. It is
                Thevenin’s theorem applied at scale — every transformer, cable and
                source upstream of the fault point is collapsed into one equivalent voltage
                and one equivalent impedance. The HNC engineer uses the same idea on a
                building-services scale to size switchgear and protective devices.
              </>
            }
            cite="Source: IEC 60909-0 (latest edition); BS 7671 Section 434 for I_cn / I_cu requirements."
          />

          <LearningOutcomes
            outcomes={[
              'Apply superposition to circuits with multiple independent sources',
              'Derive Thévenin equivalent circuits for complex networks',
              'Derive Norton equivalent circuits and convert between forms',
              'Analyse parallel generator systems using network theorems',
              'Calculate load behaviour in solar + grid installations',
              'Design and analyse UPS and emergency power systems',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Three tools for multi-source circuits: superposition (analyse one source at a time), Thévenin (one voltage source + series R), Norton (one current source + parallel R)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Superposition:</strong> Analyse each source separately, sum results
              </li>
              <li>
                <strong>Thévenin:</strong> Simplify network to voltage source + series resistance
              </li>
              <li>
                <strong>Norton:</strong> Simplify network to current source + parallel resistance
              </li>
              <li>
                <strong>Conversion:</strong> VTh = IN × RTh, RTh = RN
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Backup power:</strong> Generator paralleling analysis
              </li>
              <li>
                <strong>Renewables:</strong> Solar PV + grid interaction
              </li>
              <li>
                <strong>UPS systems:</strong> Load sharing and transfer analysis
              </li>
              <li>
                <strong>Emergency systems:</strong> Dual-source supply design
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Superposition Theorem">
            <p>
              The superposition theorem states that in a linear circuit with multiple independent
              sources, the total response (current or voltage) at any point equals the algebraic sum
              of the responses caused by each source acting alone.
            </p>
            <p className="text-sm font-medium text-white">Application Steps:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Select one source to remain active
              </li>
              <li>
                <strong>Step 2:</strong> Deactivate all other independent sources — voltage sources
                → replace with short circuits (0Ω); current sources → replace with open circuits (∞Ω)
              </li>
              <li>
                <strong>Step 3:</strong> Calculate the response (V or I) due to the active source
              </li>
              <li>
                <strong>Step 4:</strong> Repeat for each source
              </li>
              <li>
                <strong>Step 5:</strong> Sum all individual responses algebraically (consider directions)
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Requirements</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Circuit must be <strong>linear</strong> (resistors, capacitors, inductors only)</li>
              <li>Does not apply to circuits with diodes, transistors, or other non-linear elements</li>
              <li>Power cannot be calculated by superposition (P is non-linear: P = I²R)</li>
              <li>Calculate power after finding total current/voltage</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Example: Solar PV + Mains</p>
            <p>
              A commercial building has mains supply (230V, 0.5Ω source impedance) and solar PV
              inverter (230V, 2Ω output impedance) feeding a common busbar with 10Ω lighting load.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mains only (PV shorted):</strong> I₁ = 230 / (0.5 + 2||10) → I₁ = 92.9A total
              </li>
              <li>
                <strong>Load current from mains:</strong> Current divider I = 92.9 × 2/12 → I_load1 = 15.5A
              </li>
              <li>
                <strong>PV only (mains shorted):</strong> I₂ = 230 / (2 + 0.5||10) → I₂ = 86.8A total
              </li>
              <li>
                <strong>Load current from PV:</strong> Current divider I = 86.8 × 0.5/10.5 → I_load2 = 4.1A
              </li>
              <li>
                <strong>Total load current:</strong> 15.5A + 4.1A = <strong>19.6A</strong>
              </li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Superposition reveals how much current each source
              contributes. The mains (lower impedance) supplies more current to the load than the PV
              inverter.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Thévenin's Theorem">
            <p>
              Thévenin's theorem states that any linear network can be replaced by an equivalent
              circuit consisting of a voltage source (VTh) in series with a resistance (RTh). This
              dramatically simplifies load analysis.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Finding Thévenin Equivalent</p>
            <p className="text-sm font-medium text-white">VTh (Thévenin Voltage)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Open-circuit the terminals (remove load)</li>
              <li>Calculate voltage across open terminals</li>
              <li>This is the open-circuit voltage Voc = VTh</li>
            </ul>
            <p className="text-sm font-medium text-white">RTh (Thévenin Resistance)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Deactivate all independent sources</li>
              <li>Voltage sources → short circuit</li>
              <li>Current sources → open circuit</li>
              <li>Calculate resistance seen from terminals</li>
            </ul>
            <p className="text-sm font-medium text-white">Once you have VTh and RTh:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Load current: <strong>IL = VTh / (RTh + RL)</strong>
              </li>
              <li>
                Load voltage: <strong>VL = IL × RL = VTh × RL / (RTh + RL)</strong>
              </li>
              <li>Easy to analyse different loads without recalculating entire network</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Alternative Method for RTh</p>
            <p>If the network contains dependent sources, use the test source method:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Deactivate independent sources only</li>
              <li>Apply test voltage VTest across terminals</li>
              <li>Calculate resulting current ITest</li>
              <li>RTh = VTest / ITest</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Practical Application: Distribution Board Analysis</p>
            <p>
              A distribution board is fed by a 230V supply through 50m of 10mm² cable (R =
              1.83mΩ/m). Find the Thévenin equivalent at the DB terminals.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable resistance = 50m × 2 × 1.83mΩ/m = 0.183Ω</li>
              <li>VTh = 230V (supply voltage, assuming ideal source)</li>
              <li>RTh = 0.183Ω (cable resistance + source impedance)</li>
              <li>For a 46Ω load (5kW heater): IL = 230 / (0.183 + 46) = <strong>4.98A</strong></li>
              <li>VL = 4.98 × 46 = <strong>229.1V</strong> (0.4% voltage drop)</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Norton's Theorem">
            <p>
              Norton's theorem provides an alternative equivalent circuit: a current source (IN) in
              parallel with a resistance (RN). This is often more convenient for parallel circuit
              analysis and current source networks.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Finding Norton Equivalent</p>
            <p className="text-sm font-medium text-white">IN (Norton Current)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Short-circuit the terminals</li>
              <li>Calculate current through short circuit</li>
              <li>This is the short-circuit current Isc = IN</li>
            </ul>
            <p className="text-sm font-medium text-white">RN (Norton Resistance)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Same process as Thévenin resistance</li>
              <li>RN = RTh (they are identical)</li>
              <li>Deactivate sources, find equivalent R</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Thévenin ↔ Norton Conversion</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VTh = IN × RN</strong> — Norton to Thévenin
              </li>
              <li>
                <strong>IN = VTh / RTh</strong> — Thévenin to Norton
              </li>
              <li>Note: RTh = RN (resistance is always the same value)</li>
            </ul>
            <p className="text-sm font-medium text-white">When to Use Norton vs Thévenin:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thévenin:</strong> Better for series circuits and voltage analysis
              </li>
              <li>
                <strong>Norton:</strong> Better for parallel circuits and current analysis
              </li>
              <li>
                <strong>Norton:</strong> Parallel current sources simply add
              </li>
              <li>
                <strong>Thévenin:</strong> Series voltage sources simply add
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Conversion Example</p>
            <p>A network has Thévenin equivalent: VTh = 120V, RTh = 8Ω. Find the Norton equivalent.</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>IN = VTh / RTh = 120V / 8Ω = <strong>15A</strong></li>
              <li>RN = RTh = <strong>8Ω</strong></li>
              <li>Norton equivalent: 15A current source in parallel with 8Ω</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Building Services Applications">
            <p>
              Network theorems are essential tools for analysing modern building electrical systems,
              particularly those with multiple power sources, backup systems, and renewable energy
              integration.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Backup Power Systems</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Generator paralleling:</strong> Use Thévenin equivalents to analyse load
                sharing between paralleled generators with slightly different voltages
              </li>
              <li>
                <strong>Circulating current:</strong> Small voltage differences cause circulating
                currents proportional to ΔV/Rtotal between generators
              </li>
              <li>
                <strong>Load transfer:</strong> Superposition helps analyse transition currents
                during load transfer between mains and generator
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Solar + Grid Analysis</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Export vs import:</strong> Superposition determines whether the building imports from or exports to the grid
              </li>
              <li>
                <strong>Inverter interaction:</strong> Multiple PV inverters can be modelled as parallel Norton sources
              </li>
              <li>
                <strong>Grid impedance effects:</strong> Thévenin equivalent of grid helps predict voltage rise during high export conditions
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">UPS Systems</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Double conversion:</strong> Model rectifier input and inverter output as separate Thévenin circuits
              </li>
              <li>
                <strong>Parallel redundancy:</strong> Norton equivalents simplify analysis of N+1 parallel UPS modules
              </li>
              <li>
                <strong>Transfer switching:</strong> Analyse voltage/current transients during static transfer switch operation
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Dual-Source Emergency System</p>
            <p>
              Hospital critical power: mains (230V, 0.3Ω impedance) and generator (232V, 0.8Ω
              impedance) can be paralleled briefly during transfer. Analyse the circulating current.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage difference creates circulating current: ΔV = 232V - 230V = 2V</li>
              <li>Rtotal = 0.3Ω + 0.8Ω = 1.1Ω</li>
              <li>Icirculating = ΔV / Rtotal = 2V / 1.1Ω = <strong>1.82A</strong></li>
              <li>This current flows from generator to mains, not through the load — it's wasted power</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Generator Paralleling</p>
            <p>
              <strong>Question:</strong> Two 400V generators are paralleled to supply a 50kW load.
              Generator 1 has internal resistance 0.6Ω, Generator 2 has 0.9Ω. If Gen 1's voltage
              rises to 402V, find the current from each generator.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Load resistance: RL = V²/P = 400²/50000 = 3.2Ω</li>
              <li>Combine using Thévenin: VTh = (402/0.6 + 400/0.9) / (1/0.6 + 1/0.9)</li>
              <li>VTh = (670 + 444.4) / (1.67 + 1.11) = 1114.4 / 2.78 = <strong>400.9V</strong></li>
              <li>RTh = 1 / (1/0.6 + 1/0.9) = 0.36Ω</li>
              <li>Load current: IL = 400.9 / (0.36 + 3.2) = <strong>112.6A</strong></li>
              <li>Gen 1 current: I1 = (402 - 400.9) / 0.6 + (112.6 × 0.36/0.6) ≈ <strong>69A</strong></li>
              <li>Gen 2 current: I2 = 112.6 - 69 = <strong>43.6A</strong> (plus some circulating)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: UPS Load Analysis</p>
            <p>
              <strong>Question:</strong> A 10kVA UPS has inverter output impedance of 0.5Ω. Find
              the Thévenin equivalent and calculate voltage regulation when loaded to 80%.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UPS Thévenin equivalent: VTh = 230V (nominal output); RTh = 0.5Ω (output impedance)</li>
              <li>At 80% load (8kVA, pf=0.8 → 6.4kW): IL = 6400 / 230 = 27.8A (assuming unity pf)</li>
              <li>Voltage drop: Vdrop = IL × RTh = 27.8 × 0.5 = <strong>13.9V</strong></li>
              <li>Output voltage: VL = 230 - 13.9 = <strong>216.1V</strong></li>
              <li>Regulation = (230 - 216.1) / 230 × 100 = <strong>6.0%</strong></li>
              <li>Exceeds typical 5% limit — UPS may need larger capacity</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Dual-Source Emergency Lighting</p>
            <p>
              <strong>Question:</strong> Emergency lighting can be fed from mains (230V, 1Ω) or
              battery inverter (228V, 3Ω). Using Norton equivalents, find total current to a 20Ω
              load when both sources are active.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mains: IN1 = 230/1 = 230A, RN1 = 1Ω</li>
              <li>Battery: IN2 = 228/3 = 76A, RN2 = 3Ω</li>
              <li>Combine Norton sources (parallel): IN_total = 230 + 76 = 306A; RN_total = 1 || 3 = 0.75Ω</li>
              <li>Convert back to Thévenin: VTh = 306 × 0.75 = 229.5V</li>
              <li>Load current: IL = 229.5 / (0.75 + 20) = <strong>11.06A</strong></li>
              <li>Load power: P = 11.06² × 20 = <strong>2.45kW</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulas</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VTh = Voc</strong> — Open-circuit voltage across terminals
              </li>
              <li>
                <strong>IN = Isc</strong> — Short-circuit current through terminals
              </li>
              <li>
                <strong>RTh = RN = Voc / Isc</strong> — Equivalent resistance
              </li>
              <li>
                <strong>VTh = IN × RN</strong> — Conversion formula
              </li>
              <li>
                <strong>IL = VTh / (RTh + RL)</strong> — Load current calculation
              </li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Deactivating Sources</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Voltage source → Short circuit</strong> (replace with wire)
              </li>
              <li>
                <strong>Current source → Open circuit</strong> (remove from circuit)
              </li>
              <li>
                <strong>Dependent sources</strong> — Keep active (they depend on circuit values)
              </li>
              <li>
                <strong>Internal resistance</strong> — Remains in circuit when source is deactivated
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common network theorem mistakes"
            whatHappens={
              <>
                Applying these to non-linear circuits (diodes/transistors invalidate them).
                Superposing power (it's V×I — non-linear, so you can't). Forgetting internal source
                impedance. Replacing voltage sources with open circuits instead of shorts. Sign
                errors when summing.
              </>
            }
            doInstead={
              <>
                Confirm linearity first. Calculate total V or I, then compute power. Always include
                source impedance. Voltage source → short, current source → open. Pick a current
                direction convention and stick to it across all sub-circuits.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Picking switchgear breaking capacity for a UPS-and-mains parallel transfer"
            situation={
              <>
                A data-hall switchboard is fed from the building mains via a 1000 kVA
                transformer (impedance 5 %) and from a 200 kVA static UPS in static-bypass
                mode. During the millisecond they overlap on transfer, both sources can
                contribute to a downstream fault. You are picking the I_cu rating of the
                outgoing MCCBs.
              </>
            }
            whatToDo={
              <>
                Use Thevenin to collapse each source down to its equivalent: mains
                contribution from R_TH(mains) and UPS contribution from R_TH(UPS), referred
                to the switchboard busbar. Add the two prospective fault currents (or treat
                them as parallel sources by superposition) to get worst-case I''_k at the
                busbar. Pick MCCBs with I_cu greater than that combined PSCC, applying any
                cascading or coordination rules per BS 7671 Section 434 / IEC 60947-2.
                Document the calculation in the short-circuit study.
              </>
            }
            whyItMatters={
              <>
                Switchgear under-rated for the actual prospective short-circuit current is
                lethal — it can rupture, arc-flash and fail to interrupt the fault.
                Thevenin and superposition are the working tools that let you defend the
                I_cu choice in the design report.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Superposition: in any linear network with multiple sources, analyse one source at a time (others replaced by their internal impedance) and sum the responses.',
              'Thevenin: any linear two-terminal network reduces to one voltage source V_TH in series with one resistance R_TH — the working model behind every fault-level study.',
              'Norton: dual of Thevenin — one current source I_N in parallel with R_N. Convert with I_N = V_TH / R_TH.',
              'V_TH = open-circuit voltage at the terminals. R_TH = resistance seen from the terminals with all sources de-energised (voltage sources shorted, current sources opened).',
              'Maximum power transfer: load receives most power when R_load = R_TH — used in PV, battery and signal-interface design (less common in mains distribution where efficiency matters more).',
              'Network theorems only apply to linear networks — do not use them on circuits dominated by diodes, switching power supplies or saturated transformers without piecewise analysis.',
              'IEC 60909 short-circuit calculation is Thevenin applied at scale — the standard reference for fault-level studies on three-phase systems.',
              'Network theorems compress complex multi-source systems (mains + UPS + generator) into a single equivalent for protective device coordination and switchgear selection.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Kirchhoff's Laws
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section1-7')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building services applications
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section1_6;
