import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Zap,
  Calculator,
  Lightbulb,
  Activity,
  Gauge,
  Cable,
  RotateCcw,
  Target,
  FileCheck2,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Science Revision', href: '/guides/electrical-science-revision' },
];

const tocItems = [
  { id: 'overview', label: 'Why Electrical Science Matters' },
  { id: 'ohms-law', label: 'Ohm\'s Law' },
  { id: 'power-triangle', label: 'Power Triangle' },
  { id: 'kirchhoffs-laws', label: 'Kirchhoff\'s Laws' },
  { id: 'series-parallel', label: 'Series vs Parallel Circuits' },
  { id: 'ac-theory', label: 'AC Theory' },
  { id: 'three-phase', label: 'Three-Phase Theory' },
  { id: 'transformers', label: 'Transformer Principles' },
  { id: 'motors', label: 'Motor Theory Basics' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Ohm\'s law (V = I x R) is the foundation of everything. If you understand the relationship between voltage, current, and resistance, every other formula builds on it.',
  'The power triangle (P = I x V, P = I\u00B2R, P = V\u00B2/R) lets you calculate power, current, or voltage when you know two of the three values — essential for cable sizing and circuit design.',
  'Series circuits share the same current; parallel circuits share the same voltage. Knowing this helps you understand how consumer units, ring circuits, and distribution boards work.',
  'AC theory introduces impedance, reactance, and power factor — these matter for commercial and industrial installations and appear in your Level 3 exams.',
  'Three-phase theory (line vs phase values, star vs delta configurations) is essential for commercial work and is tested in the Level 3 diploma and 18th Edition exam.',
];

const faqs = [
  {
    question: 'Do I need to memorise all these formulas for the exam?',
    answer:
      'Yes, for most electrical exams (including the Level 2 and Level 3 diploma exams and the 18th Edition), you need to know the key formulas from memory. The good news is that all the formulas are variations of the same core relationships. Start with Ohm\'s law (V = IR) and the power formula (P = IV). From these two, you can derive everything else: P = I\u00B2R, P = V\u00B2/R, I = P/V, R = V/I, and so on. Practise using the formulas with real numbers until they become second nature. The formulas themselves are simple — the challenge in exams is recognising which formula to use for a given question.',
  },
  {
    question: 'Why do I need to know three-phase theory as an apprentice?',
    answer:
      'Even if you are primarily doing domestic work now, three-phase theory is a core part of the Level 3 diploma and the 18th Edition exam. Many commercial and industrial premises use three-phase supplies, and understanding line vs phase voltage, star vs delta configurations, and three-phase power calculations is essential if you want to work on anything beyond domestic installations. Three-phase knowledge also helps you understand how the electricity supply network works — why it is 400V between phases but 230V to neutral — which is useful for fault diagnosis and supply-side work.',
  },
  {
    question: 'What is the difference between impedance and resistance?',
    answer:
      'Resistance (R, measured in ohms) opposes the flow of current in both DC and AC circuits. It is caused by the physical properties of the conductor material, length, and cross-sectional area. Impedance (Z, also measured in ohms) is the total opposition to current flow in an AC circuit. It includes resistance plus the effect of reactance — the opposition caused by inductors (coils) and capacitors in the circuit. In a purely resistive AC circuit (like a kettle or heater), impedance equals resistance. In circuits with motors, transformers, or fluorescent lighting, impedance is higher than resistance because of the reactive component. The formula is Z = the square root of (R\u00B2 + X\u00B2), where X is the total reactance.',
  },
  {
    question: 'How does power factor affect electrical installations?',
    answer:
      'Power factor is the ratio of real power (watts, what does useful work) to apparent power (volt-amps, what the supply delivers). A power factor of 1.0 means all the power delivered is doing useful work — this occurs in purely resistive loads like heaters. A power factor less than 1.0 means some of the power delivered is "wasted" as reactive power (it oscillates back and forth without doing useful work). Inductive loads like motors, transformers, and fluorescent lighting have lagging power factors, typically 0.7 to 0.9. Poor power factor means the supply has to deliver more current for the same useful power output, leading to larger cables, bigger transformers, higher losses, and penalty charges from the DNO for commercial customers. Power factor correction capacitors can improve the power factor, reducing current demand and losses.',
  },
  {
    question: 'What is the easiest way to remember Kirchhoff\'s laws?',
    answer:
      'Kirchhoff\'s Current Law (KCL): "what goes in must come out." The total current entering a junction equals the total current leaving it. Think of a T-junction in a pipe — the water flowing in equals the water flowing out through both branches. Kirchhoff\'s Voltage Law (KVL): "the voltage drops must add up to the supply." The sum of all voltages around a closed loop equals zero — or, put simply, the voltage drops across all components in a series circuit add up to the supply voltage. If you have a 230V supply and three resistors in series, the voltage drops across all three must total 230V. These two laws, combined with Ohm\'s law, let you analyse any circuit.',
  },
  {
    question: 'How do I calculate total resistance in series and parallel circuits?',
    answer:
      'In series: simply add the resistances together. Three resistors of 10, 20, and 30 ohms in series give a total of 60 ohms. In parallel: use the reciprocal formula: 1/Rtotal = 1/R1 + 1/R2 + 1/R3. For the same three resistors in parallel: 1/Rtotal = 1/10 + 1/20 + 1/30 = 0.1 + 0.05 + 0.033 = 0.183. Rtotal = 1/0.183 = approximately 5.45 ohms. Notice that the total parallel resistance is always less than the smallest individual resistance. For two resistors in parallel, there is a shortcut: Rtotal = (R1 x R2) / (R1 + R2). For example, 10 and 20 in parallel: (10 x 20) / (10 + 20) = 200/30 = 6.67 ohms.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/year-3-electrical-apprentice',
    title: 'Year 3 Apprentice Guide',
    description:
      'What to expect in year 3 — where advanced electrical science becomes part of your diploma.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Apply your science knowledge practically — size cables using Ohm\'s law and voltage drop.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/mock-exams-electrical',
    title: 'Mock Exams',
    description:
      'Test your electrical science knowledge with timed practice exams and instant results.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: '18th Edition Guide',
    description:
      'The Wiring Regulations where electrical science meets practical installation requirements.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-calculations',
    title: 'Three-Phase Calculations',
    description:
      'Detailed guide to three-phase power, current, and voltage calculations for electricians.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-electrical',
    title: 'C&G 2365 Course Guide',
    description:
      'The City & Guilds course where you study electrical science as part of the qualification.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Electrical Science Matters on Site',
    content: (
      <>
        <p>
          Electrical science is not just a college subject you need to pass — it is the foundation
          of everything you do on site. When you size a cable, you are using Ohm's law. When you
          measure earth fault loop impedance, you are applying Kirchhoff's laws. When you work on
          a commercial three-phase board, you need to understand the relationship between line and
          phase voltages.
        </p>
        <p>
          This revision guide covers the core science topics from Ohm's law through to three-phase
          theory, with worked examples that show how the theory applies to real electrical work.
          Whether you are revising for your Level 2 or Level 3 exams, preparing for the{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition exam
          </SEOInternalLink>
          , or just want to understand why things work the way they do, this guide will help.
        </p>
        <p>
          Take it one section at a time. Work through the examples with a calculator. If a concept
          does not click immediately, read it again — electrical science builds on itself, and
          every topic connects to the ones before it.
        </p>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: 'Ohm\'s Law: The Foundation',
    content: (
      <>
        <p>
          Ohm's law describes the relationship between voltage (V), current (I), and resistance
          (R) in an electrical circuit:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
          <p className="text-2xl font-bold text-white mb-2">V = I x R</p>
          <p className="text-white text-sm">
            Voltage (volts) = Current (amps) x Resistance (ohms)
          </p>
        </div>
        <p>
          Rearranged: <strong>I = V / R</strong> (to find current) and{' '}
          <strong>R = V / I</strong> (to find resistance).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example 1</h3>
          <p className="text-white mb-2">
            A 3kW immersion heater is connected to a 230V supply. What current does it draw?
          </p>
          <p className="text-white mb-1">
            First, convert 3kW to watts: 3,000W
          </p>
          <p className="text-white mb-1">
            Using P = IV, rearranged to I = P / V:
          </p>
          <p className="text-white mb-1">
            <strong>I = 3,000 / 230 = 13.04A</strong>
          </p>
          <p className="text-white text-sm mt-2">
            This tells you the heater draws approximately 13A — important for selecting the correct
            cable size and protective device.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example 2</h3>
          <p className="text-white mb-2">
            A cable has a resistance of 0.5 ohms and carries 20A. What is the voltage drop?
          </p>
          <p className="text-white mb-1">
            Using V = IR:
          </p>
          <p className="text-white mb-1">
            <strong>V = 20 x 0.5 = 10V</strong>
          </p>
          <p className="text-white text-sm mt-2">
            A 10V drop on a 230V supply means the load receives 220V. BS 7671 limits voltage drop
            to 3% for lighting (6.9V) and 5% for other circuits (11.5V), so this cable may be
            borderline for some installations.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'power-triangle',
    heading: 'The Power Triangle: P = IV and Beyond',
    content: (
      <>
        <p>
          The power formulas extend Ohm's law to calculate electrical power — the rate at which
          energy is used. The three key formulas are:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 text-center">
            <p className="text-xl font-bold text-white mb-1">P = I x V</p>
            <p className="text-white text-sm">Power = Current x Voltage</p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5 text-center">
            <p className="text-xl font-bold text-white mb-1">P = I{'\u00B2'} x R</p>
            <p className="text-white text-sm">Power = Current{'\u00B2'} x Resistance</p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 text-center">
            <p className="text-xl font-bold text-white mb-1">P = V{'\u00B2'} / R</p>
            <p className="text-white text-sm">Power = Voltage{'\u00B2'} / Resistance</p>
          </div>
        </div>
        <p>
          All three formulas give the same answer — use whichever one suits the information you
          have. If you know current and voltage, use P = IV. If you know current and resistance,
          use P = I{'\u00B2'}R. If you know voltage and resistance, use P = V{'\u00B2'}/R.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example</h3>
          <p className="text-white mb-2">
            An electric shower is rated at 10.5kW on a 230V supply. What current does it draw, and
            what is the resistance of the heating element?
          </p>
          <p className="text-white mb-1">
            Current: I = P / V = 10,500 / 230 = <strong>45.65A</strong>
          </p>
          <p className="text-white mb-1">
            Resistance: R = V / I = 230 / 45.65 = <strong>5.04 ohms</strong>
          </p>
          <p className="text-white text-sm mt-2">
            This is why electric showers need a dedicated circuit with a high-rated cable (typically
            10mm{'\u00B2'} or 16mm{'\u00B2'}) and a 45A or 50A MCB.
          </p>
        </div>
        <p>
          The P = I{'\u00B2'}R formula is particularly important for understanding why cable
          resistance causes heating. As current increases, the power dissipated as heat in the cable
          increases by the square of the current — double the current, four times the heat. This is
          why overcurrent protection is critical.
        </p>
      </>
    ),
  },
  {
    id: 'kirchhoffs-laws',
    heading: 'Kirchhoff\'s Laws',
    content: (
      <>
        <p>
          Kirchhoff's two laws describe how current and voltage behave in electrical circuits.
          They are essential for understanding how circuits work and for fault diagnosis.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Current Law (KCL)</h3>
            <p className="text-white text-sm leading-relaxed">
              The total current entering a junction equals the total current leaving it. If 20A
              flows into a junction and splits into two branches, the current in the two branches
              must add up to 20A. For example, if one branch carries 12A, the other must carry 8A.
              This explains how a ring final circuit works — current flows in both directions around
              the ring and splits between the two paths based on the resistance of each path to the
              load.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Voltage Law (KVL)</h3>
            <p className="text-white text-sm leading-relaxed">
              The sum of all voltages around a closed loop equals zero. In practical terms: the
              supply voltage equals the sum of all voltage drops in the circuit. If you have a 230V
              supply feeding two loads in series, and the first load has a 150V drop, the second
              must have an 80V drop (150 + 80 = 230). This is fundamental to understanding voltage
              drop in cables — the cable is a resistance in series with the load, so some voltage is
              "lost" across the cable.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example — Kirchhoff's Voltage Law</h3>
          <p className="text-white mb-2">
            A 230V supply feeds a cable with 0.3 ohms resistance, connected to a heater drawing 20A.
            What voltage does the heater actually receive?
          </p>
          <p className="text-white mb-1">
            Voltage drop in cable: V = IR = 20 x 0.3 = <strong>6V</strong>
          </p>
          <p className="text-white mb-1">
            Voltage at heater: 230 - 6 = <strong>224V</strong>
          </p>
          <p className="text-white text-sm mt-2">
            By KVL, the supply voltage (230V) equals the cable voltage drop (6V) plus the voltage
            across the heater (224V). This is exactly how voltage drop calculations work in practice.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'series-parallel',
    heading: 'Series vs Parallel Circuits',
    content: (
      <>
        <p>
          Understanding series and parallel circuits is essential for fault diagnosis, circuit
          design, and interpreting test results.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Series Circuits</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Components are connected end-to-end in a single path. The same current flows through
              every component. The total resistance is the sum of individual resistances. The voltage
              is shared between components (proportional to their resistance).
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>Real example:</strong> Christmas tree lights wired in series — if one bulb
              fails, they all go out because the circuit is broken. In electrical installations,
              the cable and the load are in series — this is why cable resistance causes voltage
              drop.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Parallel Circuits</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              Components are connected across the same two points. Each component has the same
              voltage across it. The total current is the sum of currents through each branch. The
              total resistance is less than the smallest individual resistance.
            </p>
            <p className="text-white text-sm leading-relaxed">
              <strong>Real example:</strong> Sockets on a ring or radial circuit are in parallel —
              each socket has 230V across it, and if one appliance is unplugged, the others continue
              to work. Consumer unit circuits are in parallel across the supply.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example — Parallel Resistance</h3>
          <p className="text-white mb-2">
            Three 30-ohm resistors are connected in parallel. What is the total resistance?
          </p>
          <p className="text-white mb-1">
            1/Rtotal = 1/30 + 1/30 + 1/30 = 3/30 = 1/10
          </p>
          <p className="text-white mb-1">
            <strong>Rtotal = 10 ohms</strong>
          </p>
          <p className="text-white text-sm mt-2">
            Three identical resistors in parallel give one-third the resistance of one. This
            principle applies to ring circuits — the R1+R2 value of a ring is one-quarter the
            end-to-end resistance because you have two parallel paths.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'ac-theory',
    heading: 'AC Theory: Impedance, Reactance, and Power Factor',
    content: (
      <>
        <p>
          AC (alternating current) behaves differently from DC because the voltage and current
          constantly change direction — 50 times per second on the UK 50Hz supply. This introduces
          concepts that do not exist in DC circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactance (X)</strong> — the opposition to current flow caused by inductors
                and capacitors in AC circuits. Inductive reactance (XL = 2{'\u03C0'}fL) increases
                with frequency — coils and motors resist changes in current. Capacitive reactance
                (XC = 1/(2{'\u03C0'}fC)) decreases with frequency — capacitors pass AC more easily
                at higher frequencies. Measured in ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Impedance (Z)</strong> — the total opposition to current flow in an AC
                circuit, combining resistance and reactance. Z = {'\u221A'}(R{'\u00B2'} + X
                {'\u00B2'}). In a purely resistive circuit (kettle, heater), Z = R. In circuits with
                motors or transformers, Z is greater than R because of the reactive component.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power factor (cos {'\u03C6'})</strong> — the ratio of real power (watts) to
                apparent power (VA). Power factor = P / S = cos{'\u03C6'}, where {'\u03C6'} is the
                phase angle between voltage and current. A power factor of 1.0 means voltage and
                current are in phase (purely resistive). A power factor of 0.8 means 80% of the
                apparent power is doing useful work.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example — Power Factor</h3>
          <p className="text-white mb-2">
            A motor has a real power of 2,000W and an apparent power of 2,500VA. What is the power
            factor, and what current does it draw on a 230V supply?
          </p>
          <p className="text-white mb-1">
            Power factor: PF = P / S = 2,000 / 2,500 = <strong>0.8</strong>
          </p>
          <p className="text-white mb-1">
            Current: I = S / V = 2,500 / 230 = <strong>10.87A</strong>
          </p>
          <p className="text-white text-sm mt-2">
            Notice that the current is based on the apparent power (2,500VA), not the real power
            (2,000W). The motor draws more current than a purely resistive 2,000W load would (which
            would draw 8.7A). This extra current is the reactive component — it does no useful work
            but still heats the cables and loads the supply.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Theory: Line vs Phase, Star vs Delta',
    content: (
      <>
        <p>
          The UK electricity supply is generated and distributed as three-phase AC. Understanding
          three-phase is essential for commercial and industrial work, and it is tested in the Level
          3 diploma and 18th Edition exam.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Key Relationships</h3>
          <div className="space-y-3 text-white">
            <p>
              <strong>Line voltage (VL)</strong> = voltage between any two phases = <strong>400V</strong> (UK)
            </p>
            <p>
              <strong>Phase voltage (VP)</strong> = voltage between any phase and neutral = <strong>230V</strong> (UK)
            </p>
            <p>
              <strong>VL = VP x {'\u221A'}3</strong> (approximately VP x 1.732)
            </p>
            <p>
              230 x 1.732 = <strong>398.4V</strong> (rounded to 400V)
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Star (Y) Connection</h3>
            <p className="text-white text-sm leading-relaxed">
              Each phase is connected between a line conductor and the neutral (star point). The
              phase voltage is 230V. The line voltage is 400V. Line current equals phase current
              (IL = IP). Most UK distribution uses star connection — the neutral is connected to the
              star point, giving you 230V single-phase from any phase to neutral, and 400V
              three-phase between any two phases.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Delta ({'\u0394'}) Connection</h3>
            <p className="text-white text-sm leading-relaxed">
              Each phase is connected between two line conductors. There is no neutral — all
              voltages are line voltages (400V). The line current is {'\u221A'}3 times the phase
              current (IL = IP x {'\u221A'}3). Delta connection is used for three-phase motors and
              some commercial loads where no neutral is needed.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example — Three-Phase Power</h3>
          <p className="text-white mb-2">
            A balanced three-phase load draws 20A per phase from a 400V supply with a power factor
            of 0.85. What is the total power?
          </p>
          <p className="text-white mb-1">
            Three-phase power: P = {'\u221A'}3 x VL x IL x PF
          </p>
          <p className="text-white mb-1">
            P = 1.732 x 400 x 20 x 0.85 = <strong>11,777W (approximately 11.8kW)</strong>
          </p>
          <p className="text-white text-sm mt-2">
            This formula appears frequently in exam questions and in real commercial/industrial
            design work. Memorise it: P = {'\u221A'}3 x VL x IL x PF.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'transformers',
    heading: 'Transformer Principles',
    content: (
      <>
        <p>
          Transformers transfer electrical energy between circuits through electromagnetic
          induction. They are used throughout the electrical supply network and in many
          installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How they work</strong> — an AC current in the primary winding creates a
                changing magnetic field in the iron core. This changing magnetic field induces a
                voltage in the secondary winding. The voltage ratio equals the turns ratio: V1/V2 =
                N1/N2. No electrical connection between primary and secondary — energy is transferred
                magnetically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step-up and step-down</strong> — a step-down transformer has more primary
                turns than secondary turns, reducing the voltage. A step-up transformer has more
                secondary turns, increasing the voltage. The power is (approximately) the same on
                both sides: if voltage goes down, current goes up, and vice versa.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-site examples</strong> — 110V centre-tapped transformers for construction
                site power tools (reduces the voltage to earth to 55V for safety), bell transformers
                for doorbells (230V to 8V or 12V), and distribution transformers that step down
                11kV to 400V/230V for domestic supplies.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Worked Example</h3>
          <p className="text-white mb-2">
            A transformer has 460 primary turns and 20 secondary turns. If the primary voltage is
            230V, what is the secondary voltage?
          </p>
          <p className="text-white mb-1">
            V2 = V1 x (N2 / N1) = 230 x (20 / 460) = <strong>10V</strong>
          </p>
          <p className="text-white text-sm mt-2">
            This is a step-down transformer with a 23:1 turns ratio, commonly used for low-voltage
            lighting or bell circuits.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'motors',
    heading: 'Motor Theory Basics',
    content: (
      <>
        <p>
          Electric motors convert electrical energy into mechanical energy. They are found in
          everything from domestic appliances to industrial machinery. Understanding the basics
          helps with fault diagnosis and circuit design.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How motors work</strong> — a current-carrying conductor in a magnetic field
                experiences a force (Fleming's left-hand rule). In a motor, the stator creates a
                magnetic field, and the rotor carries current — the interaction produces rotation.
                The direction of rotation depends on the direction of current and the magnetic field.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Starting current</strong> — when a motor starts, it draws a significantly
                higher current than its running current (typically 5 to 8 times the full-load
                current). This is called the starting current or inrush current. A motor rated at
                10A full-load may draw 50 to 80A for a fraction of a second on starting. This is why
                motor circuits use Type C or Type D MCBs — they tolerate the brief inrush without
                tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase vs three-phase motors</strong> — single-phase motors are
                common in domestic appliances and small commercial equipment. Three-phase motors are
                more efficient, produce smoother torque, and are standard for industrial machinery.
                A three-phase motor runs directly from the three-phase supply; a single-phase motor
                needs a capacitor or other starting mechanism to create the rotating field.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back EMF</strong> — as a motor spins, it generates a voltage that opposes
                the supply voltage (back electromotive force). This is why running current is lower
                than starting current — the back EMF reduces the net voltage across the windings,
                limiting the current. If a motor stalls (stops turning), back EMF drops to zero and
                current rises to the starting level, which can overheat the windings if sustained.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Motor theory appears in Level 3 diploma exams and is important for commercial and
          industrial work. Understanding starting current, power factor, and the difference between
          single-phase and three-phase motors will serve you well throughout your career.
        </p>
        <SEOAppBridge
          title="Test your electrical science knowledge"
          description="Elec-Mate mock exams cover Ohm's law, power calculations, AC theory, three-phase, and all the science topics in your Level 2 and Level 3 exams. Timed practice with instant results and explanations."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalScienceRevisionPage() {
  return (
    <GuideTemplate
      title="Electrical Science Revision | Ohm's Law to 3-Phase"
      description="Complete electrical science revision guide for apprentices. Ohm's law, power triangle, Kirchhoff's laws, series and parallel circuits, AC theory, impedance, power factor, three-phase, transformers, and motor theory with worked examples."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Revision Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Electrical Science Revision:{' '}
          <span className="text-yellow-400">Ohm's Law to Three-Phase</span>
        </>
      }
      heroSubtitle="Every formula and concept you need for your Level 2, Level 3, and 18th Edition exams. Worked examples showing how electrical science applies to real installation work."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Science"
      relatedPages={relatedPages}
      ctaHeading="Revise Smarter with Elec-Mate"
      ctaSubheading="Mock exams, flashcards, and AI tutoring covering all electrical science topics. Track your weak areas, practise under timed conditions, and go into your exam with confidence. 7-day free trial."
    />
  );
}
