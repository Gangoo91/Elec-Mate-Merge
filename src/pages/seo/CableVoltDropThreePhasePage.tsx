import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  Zap,
  Cable,
  BarChart3,
  Shield,
  BookOpen,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Ruler,
  FileCheck2,
  GraduationCap,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'Three Phase Voltage Drop', href: '/tools/cable-volt-drop-three-phase' },
];

const tocItems = [
  { id: 'three-phase-volt-drop', label: 'Three-Phase Voltage Drop' },
  { id: 'root-three-factor', label: 'The Root 3 Factor' },
  { id: 'formula', label: 'The Formula' },
  { id: 'balanced-vs-unbalanced', label: 'Balanced vs Unbalanced' },
  { id: 'bs7671-limits', label: 'BS 7671 Limits' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'common-cables', label: 'Common Cable Values' },
  { id: 'how-to', label: 'Step-by-Step Method' },
  { id: 'features', label: 'Calculator Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Three-phase voltage drop uses the same formula as single-phase — VD = mV/A/m x Ib x L / 1000 — but you must use the three-phase mV/A/m column from the BS 7671 Appendix 4 tables, not the single-phase column.',
  'The acceptable limit for three-phase power circuits is 5% of 400 V = 20 V. For three-phase lighting circuits, it is 3% of 400 V = 12 V. These limits are defined in BS 7671 Table 4Ab.',
  'The root 3 factor (1.732) is already built into the three-phase mV/A/m values in the BS 7671 tables, so you do not need to multiply by root 3 separately when using tabulated values.',
  'For balanced three-phase loads (equal current on all three phases), a single voltage drop calculation covers the entire circuit. For unbalanced loads, check each phase individually using the single-phase mV/A/m values.',
  "Elec-Mate's three-phase voltage drop calculator has all BS 7671 Appendix 4 tables built in, handles both balanced and unbalanced loads, and gives an instant pass/fail result against the correct limit.",
];

const faqs = [
  {
    question: 'What is the maximum voltage drop allowed on a three-phase circuit under BS 7671?',
    answer:
      'BS 7671 Table 4Ab sets the maximum voltage drop for installations supplied from a public low-voltage distribution system. For three-phase power circuits, the limit is 5% of the nominal line-to-line voltage: 5% of 400 V = 20 V. For three-phase lighting circuits, the limit is 3% of 400 V = 12 V. For installations supplied from a private supply (generator or transformer), higher limits apply: 8% for power (32 V) and 6% for lighting (24 V). The voltage drop is measured from the origin of the installation to the most distant point of the circuit, including any sub-main cables in the path.',
  },
  {
    question: 'Why is the root 3 factor used in three-phase voltage drop calculations?',
    answer:
      'The root 3 factor (1.732) arises from the 120-degree phase displacement between the three phases in a three-phase system. In a star-connected system, the line voltage (between any two phases) is root 3 times the phase voltage (between a phase and neutral). This means 230 V x 1.732 = 400 V. When calculating voltage drop using the BS 7671 tabulated mV/A/m values, the root 3 factor is already incorporated into the three-phase column values. The three-phase mV/A/m values in the tables are lower than the single-phase values because the voltage drop per phase is effectively shared across two conductors in a line-to-line measurement. You do not need to multiply by root 3 separately — just use the correct column from the table.',
  },
  {
    question: 'How do I calculate voltage drop for an unbalanced three-phase circuit?',
    answer:
      'When a three-phase load is unbalanced (different currents on each phase), you cannot use the balanced three-phase formula directly. Instead, calculate the voltage drop on each phase individually. For each phase, use the single-phase mV/A/m value and the current on that specific phase: VD per phase = single-phase mV/A/m x Iphase x L / 1000. Check each phase voltage drop against the single-phase limit (5% of 230 V = 11.5 V for power, 3% of 230 V = 6.9 V for lighting). Additionally, consider the neutral current — in an unbalanced system, the neutral carries the vector sum of the three phase currents, which can be significant. The neutral conductor must be sized to handle this current without excessive voltage drop.',
  },
  {
    question: 'What three-phase mV/A/m values should I use for SWA cable?',
    answer:
      'Steel wire armoured (SWA) cable mV/A/m values are found in the BS 7671 Appendix 4 tables for armoured cables: Table 4E2B for multicore thermoplastic (PVC) insulated SWA, and Table 4E4B for multicore thermosetting (XLPE) insulated SWA. Use the three-phase column (labelled "3-core or 4-core cable, three-phase a.c."). For example, 25 mm² 4-core copper XLPE SWA has a three-phase mV/A/m of approximately 1.50. For 16 mm² 4-core copper PVC SWA, the value is approximately 2.4. Always verify the exact value from the current edition of BS 7671 (2018+A3:2024) as values vary by cable construction, conductor material, and installation method.',
  },
  {
    question: 'Does voltage drop on a sub-main count towards the final circuit limit?',
    answer:
      'Yes. BS 7671 Regulation 525.1 requires the voltage drop from the origin of the installation to the most distant point of every final circuit to be within the permitted limits. This means the voltage drop across any sub-main cables in the path must be added to the voltage drop in the final circuit. For example, if a three-phase sub-main has a voltage drop of 8 V and the final circuit has a voltage drop of 10 V, the total is 18 V — which is within the 20 V (5%) limit for three-phase power circuits. When designing large installations with multiple distribution boards, it is good practice to allocate a voltage drop budget: for example, allow 2% for the sub-main and 3% for the final circuit, totalling 5%.',
  },
  {
    question: 'How does cable temperature affect three-phase voltage drop?',
    answer:
      'The mV/A/m values in the BS 7671 tables are calculated at the conductor operating temperature under full load conditions. When a cable carries less than its full rated current, it runs cooler and its resistance is lower, meaning the actual voltage drop will be less than the tabulated figure. BS 7671 Appendix 4 provides a correction formula to account for this. The corrected voltage drop = tabulated VD x [(230 + tp - (Ca² x Cg² x Ci² x Cc² x (tp - 30))) / (230 + tp)], where tp is the maximum permitted conductor operating temperature. For thermoplastic (PVC) cables, tp = 70°C; for thermosetting (XLPE), tp = 90°C. This correction is particularly useful on long three-phase sub-main runs where voltage drop is marginal.',
  },
  {
    question: 'Can I use the Elec-Mate calculator for three-phase motor circuits?',
    answer:
      'Yes. The Elec-Mate three-phase voltage drop calculator handles motor circuits including the consideration of starting current. Motor starting current is typically 6 to 8 times the full load current for direct-on-line (DOL) starting. While voltage drop during starting is transient and does not need to meet the steady-state limits in Table 4Ab, excessive voltage drop during starting can cause problems: the motor may fail to start, contactors may drop out, and other equipment on the same supply may be affected by the voltage dip. The calculator lets you enter both the running current and the starting current to assess both the steady-state voltage drop (which must comply with BS 7671) and the transient starting voltage drop.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Single-phase voltage drop calculator with built-in BS 7671 tables and instant pass/fail indication.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables to BS 7671 with automatic correction factors, voltage drop check, and protective device coordination.',
    icon: Cable,
    category: 'Calculator',
  },
  {
    href: '/tools/three-phase-power-calculator',
    title: 'Three Phase Power Calculator',
    description:
      'Calculate three-phase power, current, and voltage for balanced and unbalanced loads. Star and delta configurations.',
    icon: Activity,
    category: 'Calculator',
  },
  {
    href: '/guides/voltage-drop-guide-bs-7671',
    title: 'Voltage Drop Guide BS 7671',
    description:
      'Complete guide to voltage drop requirements under BS 7671 including tables, formulas, and worked examples.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-size-cables',
    title: 'How to Size Cables',
    description:
      'Step-by-step cable sizing procedure: current-carrying capacity, correction factors, and voltage drop verification.',
    icon: Ruler,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: 'All Electrical Calculators',
    description:
      '70+ BS 7671 compliant calculators for UK electricians. Voltage drop, cable sizing, fault current, and more.',
    icon: Calculator,
    category: 'Calculator',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Three-Phase mV/A/m Lookup',
    description:
      'All BS 7671 Appendix 4 three-phase voltage drop tables built in. Select your cable type and the correct three-phase mV/A/m value is applied automatically.',
  },
  {
    icon: Activity,
    title: 'Balanced & Unbalanced Modes',
    description:
      'Switch between balanced three-phase calculations and per-phase unbalanced calculations. Enter a single current or individual phase currents.',
  },
  {
    icon: Cable,
    title: 'All UK Cable Types',
    description:
      'Supports SWA, singles in trunking/conduit, XLPE, multicore, and MI cables. Copper and aluminium conductors. Three-core and four-core configurations.',
  },
  {
    icon: BarChart3,
    title: 'Pass/Fail Indication',
    description:
      'Instant colour-coded pass/fail result against the correct BS 7671 limit — 20 V (5%) for power or 12 V (3%) for lighting on 400 V three-phase circuits.',
  },
  {
    icon: Ruler,
    title: 'Maximum Cable Length',
    description:
      'Automatically calculates the maximum permissible cable run length for your chosen cable size and load before exceeding the BS 7671 voltage drop limit.',
  },
  {
    icon: Shield,
    title: 'BS 7671:2018+A3:2024 Compliant',
    description:
      'All calculations follow the current 18th Edition wiring regulations including Amendment 3. Values verified against the published Appendix 4 tables.',
  },
];

const howToSteps = [
  {
    name: 'Identify the circuit parameters',
    text: 'Determine the design current (Ib) per phase in amperes, the cable run length (L) in metres from the distribution board to the furthest point, whether the load is balanced or unbalanced, and the circuit type (lighting or power).',
  },
  {
    name: 'Select the cable type and confirm it is three-phase',
    text: 'Identify the cable construction (SWA, singles in conduit, multicore, etc.), conductor material (copper or aluminium), insulation type (PVC or XLPE), and the number of cores (3-core or 4-core for three-phase).',
  },
  {
    name: 'Look up the three-phase mV/A/m value',
    text: 'Open the correct BS 7671 Appendix 4 voltage drop table (Tables 4D1B through 4J4B). Find the row for your cable cross-sectional area and read the value from the three-phase column ("3-core or 4-core cable, three-phase a.c."), not the single-phase column.',
  },
  {
    name: 'Apply the voltage drop formula',
    text: 'Calculate: VD = mV/A/m (three-phase) x Ib x L / 1000. The result is the line-to-line voltage drop in volts. For a balanced load, Ib is the current per phase.',
  },
  {
    name: 'Check against the BS 7671 three-phase limit',
    text: 'Compare the calculated voltage drop against 20 V (5% of 400 V) for power circuits or 12 V (3% of 400 V) for lighting circuits. If the sub-main feeds a downstream distribution board, add the sub-main voltage drop to the final circuit voltage drop and check the total.',
  },
  {
    name: 'Consider correction for lightly loaded cables',
    text: 'If the voltage drop is marginal, apply the conductor temperature correction from BS 7671 Appendix 4. When the cable is not fully loaded, it runs cooler and the actual voltage drop is lower than the tabulated value. This can sometimes allow a smaller cable to be used.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'three-phase-volt-drop',
    heading: 'What Is Three-Phase Voltage Drop?',
    content: (
      <>
        <p>
          Voltage drop in a three-phase circuit is the reduction in electrical potential along the
          cable conductors as current flows from the supply to the load. Every cable has resistance
          (and at larger sizes, reactance), and when current passes through this impedance, some of
          the supply voltage is consumed by the cable itself rather than delivered to the load.
        </p>
        <p>
          In a three-phase system, three line conductors each carry current with a 120-degree phase
          displacement. This phase relationship means the voltage drop behaviour differs from
          single-phase circuits. The line-to-line voltage in the UK is 400 V (compared to 230 V
          phase-to-neutral), and the voltage drop limits are applied against this higher voltage. A
          three-phase power circuit is permitted up to 20 V of voltage drop (5% of 400 V), whereas a
          single-phase power circuit is limited to 11.5 V (5% of 230 V).
        </p>
        <p>
          Three-phase voltage drop is a critical design consideration for{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">cable sizing</SEOInternalLink> on
          commercial and industrial installations. Sub-main cables feeding distribution boards,
          motor circuits, three-phase EV chargers, and large power supplies all require accurate
          voltage drop calculations to ensure compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'root-three-factor',
    heading: 'The Root 3 Factor Explained',
    content: (
      <>
        <p>
          The square root of 3 (approximately 1.732) appears throughout three-phase electrical
          calculations. It arises from the geometric relationship between three sinusoidal waveforms
          displaced by 120 degrees. In a star-connected system, the line voltage is root 3 times the
          phase voltage: 230 V x 1.732 = 400 V.
        </p>
        <p>
          A common question is whether you need to multiply by root 3 when calculating three-phase
          voltage drop using the BS 7671 tables. The answer is no — because the three-phase mV/A/m
          values in the Appendix 4 tables already incorporate the root 3 factor. The tabulated
          three-phase values give the line-to-line voltage drop directly when you apply the standard
          formula.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Common Mistake</h4>
              <p className="text-white text-sm leading-relaxed">
                Do not multiply the three-phase voltage drop result by root 3. The three-phase
                mV/A/m values in the BS 7671 tables already account for this. If you also multiply
                by 1.732, your calculated voltage drop will be 73% too high, potentially leading you
                to oversize the cable unnecessarily.
              </p>
            </div>
          </div>
        </div>
        <p>
          The relationship between the single-phase and three-phase mV/A/m values in the tables is:
          the three-phase value is approximately equal to the single-phase value divided by root 3
          (for purely resistive cables) or calculated from the combined resistive and reactive
          components (for larger cables where reactance is significant).
        </p>
      </>
    ),
  },
  {
    id: 'formula',
    heading: 'The Three-Phase Voltage Drop Formula',
    content: (
      <>
        <p>
          The standard formula for calculating three-phase voltage drop using BS 7671 tabulated
          values is identical in structure to the single-phase formula:
        </p>
        <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
          <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
            VD = (mV/A/m<sub>3ph</sub> x I<sub>b</sub> x L) / 1000
          </p>
          <div className="mt-4 text-left max-w-md mx-auto space-y-1 text-sm text-white">
            <p>
              <strong className="text-yellow-400">VD</strong> = line-to-line voltage drop in volts
            </p>
            <p>
              <strong className="text-yellow-400">
                mV/A/m<sub>3ph</sub>
              </strong>{' '}
              = three-phase millivolts per ampere per metre (from BS 7671 tables)
            </p>
            <p>
              <strong className="text-yellow-400">
                I<sub>b</sub>
              </strong>{' '}
              = design current per phase in amperes
            </p>
            <p>
              <strong className="text-yellow-400">L</strong> = cable run length in metres
            </p>
          </div>
        </div>
        <p>
          The critical difference from single-phase calculations is that you must use the
          three-phase column from the mV/A/m tables, and the result is compared against the
          three-phase voltage limits (percentage of 400 V, not 230 V).
        </p>
        <p>
          For larger cables (typically 25 mm² and above), the BS 7671 tables split the mV/A/m value
          into separate resistive (r) and reactive (x) components. In this case, the combined
          voltage drop is calculated as: VD = (mV/A/m<sub>r</sub> x cos phi + mV/A/m<sub>x</sub> x
          sin phi) x I<sub>b</sub> x L / 1000, where cos phi is the power factor of the load. This
          is important for{' '}
          <SEOInternalLink href="/tools/three-phase-power-calculator">
            three-phase motor circuits
          </SEOInternalLink>{' '}
          where the power factor can be significantly less than unity.
        </p>
        <SEOAppBridge
          title="Calculate three-phase voltage drop instantly"
          description="Enter your cable type, size, length, and current. Elec-Mate looks up the correct three-phase mV/A/m value from BS 7671 and gives you an instant pass/fail result. No table look-ups, no manual calculations."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'balanced-vs-unbalanced',
    heading: 'Balanced vs Unbalanced Three-Phase Loads',
    content: (
      <>
        <p>
          A balanced three-phase load draws equal current on all three phases at the same power
          factor. Examples include three-phase motors, three-phase heaters with equal elements, and
          22 kW EV chargers. For balanced loads, a single voltage drop calculation using the
          three-phase mV/A/m value and the per-phase current gives the complete answer.
        </p>
        <p>
          An unbalanced three-phase load draws different currents on each phase. This is the typical
          situation in a three-phase distribution board feeding single-phase final circuits — it is
          almost impossible to achieve perfect balance across all three phases. The degree of
          imbalance depends on how the circuits are distributed across the phases.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Balanced Load</h4>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Equal current on L1, L2, L3</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Zero neutral current</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Use three-phase mV/A/m values</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Compare against 5% of 400 V</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h4 className="font-bold text-white text-lg mb-3">Unbalanced Load</h4>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Different current on each phase</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Neutral carries imbalance current</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Check each phase individually</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <span>Compare against 5% of 230 V per phase</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          For sub-main cables feeding three-phase distribution boards, design for the worst-case
          phase current. If the board is new and the circuit loading is known, check voltage drop
          using the highest individual phase current with the single-phase mV/A/m values. If the
          loading is assumed to be approximately balanced, the three-phase calculation is
          acceptable.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-limits',
    heading: 'BS 7671 Three-Phase Voltage Drop Limits',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Regulation 525.1 and Table 4Ab define the maximum permitted voltage drop for all
          installations. The limits for three-phase circuits on a public LV supply are:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h4 className="font-bold text-white text-lg">Power Circuits</h4>
            </div>
            <p className="text-3xl font-bold text-yellow-400 mb-1">5%</p>
            <p className="text-white text-sm">of 400 V = 20 V maximum</p>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-yellow-400" />
              <h4 className="font-bold text-white text-lg">Lighting Circuits</h4>
            </div>
            <p className="text-3xl font-bold text-yellow-400 mb-1">3%</p>
            <p className="text-white text-sm">of 400 V = 12 V maximum</p>
          </div>
        </div>
        <p>
          For installations supplied from a private LV supply (such as a standby generator or
          private transformer), higher limits apply: 8% (32 V) for power and 6% (24 V) for lighting.
          These higher limits recognise that the electrician typically has more control over the
          supply characteristics in a private installation.
        </p>
        <p>
          Remember that the voltage drop limit applies from the origin of the installation (the
          meter or main incoming supply terminals) to the most remote point of the final circuit. If
          there are sub-main cables in the path, the voltage drop across each section of cable must
          be added together. The total must remain within the limit.
        </p>
        <SEOAppBridge
          title="Instant pass/fail against BS 7671 limits"
          description="Elec-Mate automatically selects the correct limit — 20 V for three-phase power, 12 V for three-phase lighting — and displays a clear colour-coded pass/fail result. No mental arithmetic on site."
          icon={Shield}
        />
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples: Three-Phase Voltage Drop',
    content: (
      <>
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
            <h4 className="font-bold text-yellow-400 text-lg mb-3">
              Example 1: Three-Phase Sub-Main (SWA)
            </h4>
            <div className="space-y-2 text-white leading-relaxed text-sm">
              <p>
                A 4-core 25 mm² copper XLPE SWA cable runs 55 metres from the main switchboard to a
                sub-distribution board. The balanced design current is 75 A per phase. The
                three-phase mV/A/m from Table 4E4B is 1.50.
              </p>
              <p className="font-mono text-white">
                VD = 1.50 x 75 x 55 / 1000 = <strong className="text-yellow-400">6.19 V</strong>{' '}
                (1.55% of 400 V)
              </p>
              <p>
                Result: <strong className="text-green-400">PASS</strong> — 6.19 V is well within the
                20 V (5%) limit. This leaves 13.81 V of voltage drop budget for the final circuits
                downstream.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
            <h4 className="font-bold text-yellow-400 text-lg mb-3">
              Example 2: Long Run to a Motor
            </h4>
            <div className="space-y-2 text-white leading-relaxed text-sm">
              <p>
                A three-phase motor draws 42 A at full load. It is supplied by a 10 mm² 4-core
                copper PVC SWA cable (Table 4D4B, three-phase mV/A/m = 3.8) over a cable run of 80
                metres.
              </p>
              <p className="font-mono text-white">
                VD = 3.8 x 42 x 80 / 1000 = <strong className="text-yellow-400">12.77 V</strong>{' '}
                (3.19% of 400 V)
              </p>
              <p>
                Result: <strong className="text-green-400">PASS</strong> — 12.77 V is within the 20
                V limit. However, if this motor is downstream of a sub-main with its own voltage
                drop, the total must be checked.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
            <h4 className="font-bold text-yellow-400 text-lg mb-3">
              Example 3: Three-Phase Lighting in a Warehouse
            </h4>
            <div className="space-y-2 text-white leading-relaxed text-sm">
              <p>
                A three-phase lighting circuit serves a warehouse. The balanced design current is 14
                A per phase. The cable is 4 mm² 4-core copper PVC (Table 4D2B, three-phase mV/A/m =
                9.5). Cable run length is 65 metres.
              </p>
              <p className="font-mono text-white">
                VD = 9.5 x 14 x 65 / 1000 = <strong className="text-yellow-400">8.65 V</strong>{' '}
                (2.16% of 400 V)
              </p>
              <p>
                Result: <strong className="text-green-400">PASS</strong> — 8.65 V is within the 12 V
                (3%) lighting limit. If the cable run were 90 metres: 9.5 x 14 x 90 / 1000 = 11.97 V
                (2.99%) — still just within the limit.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
            <h4 className="font-bold text-yellow-400 text-lg mb-3">
              Example 4: Sub-Main Plus Final Circuit (Cumulative)
            </h4>
            <div className="space-y-2 text-white leading-relaxed text-sm">
              <p>
                A three-phase sub-main (35 mm² SWA, 40 m, 100 A, mV/A/m = 1.05) feeds a distribution
                board. A final circuit from that board (6 mm² singles in trunking, 25 m, 28 A,
                three-phase mV/A/m = 6.4) serves a three-phase heater.
              </p>
              <p className="font-mono text-white">Sub-main VD = 1.05 x 100 x 40 / 1000 = 4.20 V</p>
              <p className="font-mono text-white">
                Final circuit VD = 6.4 x 28 x 25 / 1000 = 4.48 V
              </p>
              <p className="font-mono text-white">
                Total VD = 4.20 + 4.48 = <strong className="text-yellow-400">8.68 V</strong> (2.17%
                of 400 V)
              </p>
              <p>
                Result: <strong className="text-green-400">PASS</strong> — the cumulative voltage
                drop of 8.68 V is well within the 20 V limit.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-cables',
    heading: 'Common Three-Phase Cable mV/A/m Values',
    content: (
      <>
        <p>
          Below are commonly referenced three-phase mV/A/m values from BS 7671 Appendix 4. These are
          approximate and for reference — always verify against the current edition of BS 7671 for
          your specific cable type and installation method.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-3 gap-px bg-white/10">
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable Size</div>
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">
              mV/A/m (3-phase)
            </div>
            <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable Type</div>
          </div>
          {[
            { size: '4 mm²', mvam: '9.5', type: '4-core PVC' },
            { size: '6 mm²', mvam: '6.4', type: '4-core PVC' },
            { size: '10 mm²', mvam: '3.8', type: '4-core PVC' },
            { size: '16 mm²', mvam: '2.4', type: '4-core PVC SWA' },
            { size: '25 mm²', mvam: '1.50', type: '4-core XLPE SWA' },
            { size: '35 mm²', mvam: '1.05', type: '4-core XLPE SWA' },
            { size: '50 mm²', mvam: '0.78', type: '4-core XLPE SWA' },
            { size: '70 mm²', mvam: '0.55', type: '4-core XLPE SWA' },
            { size: '95 mm²', mvam: '0.41', type: '4-core XLPE SWA' },
          ].map((row) => (
            <div key={row.size} className="grid grid-cols-3 gap-px bg-white/5">
              <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.size}</div>
              <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.mvam}</div>
              <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.type}</div>
            </div>
          ))}
        </div>
        <p className="text-white text-sm leading-relaxed">
          Values extracted from BS 7671:2018+A3:2024, Tables 4D2B and 4E4B. Three-phase column
          (3-core or 4-core cable, three-phase a.c.). Copper conductors. Always verify against the
          current edition for your specific installation method.
        </p>
        <SEOInternalLink href="/guides/correction-factors-guide">
          See also: Correction Factors Guide for derating and grouping factors
        </SEOInternalLink>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CableVoltDropThreePhasePage() {
  return (
    <ToolTemplate
      title="Three Phase Voltage Drop Calculator | BS 7671 Tool"
      description="Calculate three-phase voltage drop to BS 7671 limits. Root 3 factor, balanced and unbalanced loads, SWA and multicore cables. Pass/fail indication against 5% power and 3% lighting limits on 400 V three-phase circuits."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Compliant"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Three Phase Voltage Drop Calculator{' '}
          <span className="text-yellow-400">BS 7671 Compliant</span>
        </>
      }
      heroSubtitle="Calculate voltage drop for three-phase circuits using BS 7671 Appendix 4 tables. Handles balanced and unbalanced loads, SWA and multicore cables, with instant pass/fail against the 5% power and 3% lighting limits on 400 V supplies."
      heroFeaturePills={[
        { icon: Activity, label: 'Three-Phase' },
        { icon: Cable, label: 'All Cable Types' },
        { icon: Shield, label: 'BS 7671:2018+A3:2024' },
      ]}
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="Why Use Elec-Mate's Three-Phase Voltage Drop Calculator?"
      featuresSubheading="Purpose-built for UK electricians working on three-phase commercial and industrial installations. Faster and more accurate than manual table look-ups."
      howToSteps={howToSteps}
      howToHeading="How to Calculate Three-Phase Voltage Drop — Step by Step"
      howToDescription="Follow this six-step process to calculate three-phase voltage drop using BS 7671 Appendix 4 tables."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Three-Phase Voltage Drop"
      relatedPages={relatedPages}
      ctaHeading="Calculate Three-Phase Voltage Drop in Seconds"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. All BS 7671 tables built in. 7-day free trial, cancel anytime."
      toolPath="/tools/cable-volt-drop-three-phase"
    />
  );
}
