import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Zap,
  Calculator,
  BookOpen,
  ClipboardCheck,
  Award,
  ShieldCheck,
  Users,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-qualifications-pathway' },
  { label: 'C&G 2365', href: '/guides/city-guilds-2365-electrical' },
  { label: 'Unit 202', href: '/guides/city-guilds-2365-unit-202' },
];

const tocItems = [
  { id: 'overview', label: 'What is Unit 202?' },
  { id: 'si-units', label: 'SI Units and Electrical Quantities' },
  { id: 'ohms-law', label: "Ohm's Law and Circuit Calculations" },
  { id: 'power', label: 'Electrical Power and Energy' },
  { id: 'ac-dc', label: 'AC vs DC: Key Differences' },
  { id: 'circuits', label: 'Series and Parallel Circuits' },
  { id: 'exam-tips', label: 'Exam Structure and Revision Tips' },
  { id: 'for-apprentices', label: 'Elec-Mate Study Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Unit 202 — Principles of Building Services Engineering — covers the underpinning electrical theory that apprentices need to understand and apply in all practical installation and testing work.',
  'SI (International System of Units) units are the standard measurement units used throughout electrical engineering. Key units for electricians include the volt (V), ampere (A), ohm (Ω), watt (W), and joule (J).',
  "Ohm's law (V = I × R) is the foundation of circuit analysis. Combined with Kirchhoff's voltage and current laws, it allows apprentices to calculate voltages, currents, and resistances in series and parallel circuits.",
  'Power (P = V × I = I² × R = V²/R) and energy (E = P × t) calculations are essential for cable sizing, circuit protection, and understanding energy consumption — all of which appear in installation work and on the Unit 202 exam.',
  'AC (alternating current) is the form of electricity supplied by the UK national grid (230V, 50Hz). DC (direct current) is produced by batteries and solar PV cells. Understanding the fundamental differences is required for Unit 202.',
];

const faqs = [
  {
    question: 'What mathematical skills do I need for Unit 202?',
    answer:
      'Unit 202 requires competence in basic algebra, the ability to rearrange formulae, and familiarity with scientific notation (powers of ten — kilo, mega, milli, micro). Specific mathematical skills required include: rearranging Ohm\'s law (V = IR, I = V/R, R = V/I); calculating power using P = VI, P = I²R, and P = V²/R; working with series and parallel resistance formulae; using the formula for electrical energy (E = Pt, where E is in joules or kilowatt-hours); and basic circuit analysis using Kirchhoff\'s laws. A scientific calculator is permitted in the Unit 202 exam. Key formulae are typically provided on a formula sheet in the exam booklet, but understanding what each formula means and when to apply it is more important than memorising the formulae themselves.',
  },
  {
    question: "What is Ohm's law and why is it fundamental?",
    answer:
      "Ohm's law states that the voltage across a conductor is directly proportional to the current flowing through it, provided the temperature remains constant: V = I × R (voltage in volts = current in amperes × resistance in ohms). Named after German physicist Georg Ohm, who published the relationship in 1827. It is the most fundamental relationship in circuit analysis. Any two of the three quantities (V, I, R) can be calculated from the third. Ohm's law applies directly to resistive loads (heaters, incandescent lamps, resistors). It applies approximately to inductive and capacitive loads in AC circuits when power factor is considered. In practical electrical installation work, Ohm's law underpins cable sizing (resistance causes voltage drop), fault current calculation (reduced resistance = higher fault current), and the interpretation of test results (continuity measurements measure resistance; loop impedance measurements measure the resistance of the fault current path).",
  },
  {
    question: 'What is the difference between AC and DC, and why does it matter for electricians?',
    answer:
      'DC (direct current) flows in one direction only — from positive to negative terminal — and the voltage does not change with time (or changes slowly, as in a discharging battery). DC is produced by batteries, solar PV cells, and rectifiers. AC (alternating current) reverses direction periodically — in the UK, the supply reverses 50 times per second (50Hz). The voltage follows a sinusoidal waveform, peaking at approximately +325V and -325V for a 230V RMS supply. The reasons AC is used for mains distribution are efficiency in transmission (AC voltage can be stepped up for long-distance transmission and stepped down for safe domestic use using transformers, which only work on AC) and simplicity of generation (AC generators are simpler than DC generators). For electricians, the distinction matters in several practical contexts: test equipment — multimeters have separate AC and DC measurement modes; circuit protection — RCDs detect AC earth fault current by default, but Type B RCDs are needed for DC leakage from inverters; and in renewable energy systems — solar PV generates DC which is converted to AC by an inverter.',
  },
  {
    question: 'What are the key SI units I need to know for Unit 202?',
    answer:
      'The International System of Units (SI) is the modern form of the metric system. For Unit 202 electrical content, the key SI base units and derived units are: volt (V) — unit of electromotive force (EMF) and potential difference (PD); ampere (A) — unit of electric current; ohm (Ω) — unit of electrical resistance; watt (W) — unit of power (1W = 1 J/s = 1 V×A); joule (J) — unit of energy (1J = 1 W×s); henry (H) — unit of inductance; farad (F) — unit of capacitance; hertz (Hz) — unit of frequency (cycles per second). Common prefixes used with electrical units: kilo (k) = ×1000 (1kΩ = 1000Ω); mega (M) = ×1,000,000 (1MΩ = 1,000,000Ω); milli (m) = ×1/1000 (30mA = 0.030A); micro (μ) = ×1/1,000,000 (100μF = 0.0001F). Converting between prefixes and standard units is a common source of errors in Unit 202 exam calculations.',
  },
  {
    question: 'How do I calculate total resistance in series and parallel circuits?',
    answer:
      'In a series circuit, components are connected end-to-end so the same current flows through all of them. Total resistance in series is simply the sum of all individual resistances: R_total = R1 + R2 + R3 + ... In a parallel circuit, components are connected across the same two nodes so the same voltage appears across all of them, but the current splits between branches. Total resistance in parallel is given by: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ... For two resistors in parallel, this simplifies to R_total = (R1 × R2) / (R1 + R2). This "product over sum" formula is useful for two-resistor parallel calculations. Note that total parallel resistance is always less than the smallest individual resistance in the parallel combination. In practical electrical installation work, parallel circuits are the normal arrangement for domestic circuits — all sockets and lights on a circuit are connected in parallel so each receives the full supply voltage.',
  },
  {
    question: 'What is power factor and do I need it for Unit 202?',
    answer:
      'Power factor is the ratio of real power (watts, W) to apparent power (volt-amperes, VA) in an AC circuit. It arises because inductive and capacitive loads (motors, fluorescent lighting, transformers) cause the current to lead or lag the voltage — the current and voltage waveforms are not in phase. When they are perfectly in phase (resistive load, pure heating element), power factor = 1 and all the apparent power is real power. When they are out of phase, power factor < 1 and some of the apparent power is reactive power (it flows back and forth between source and load without doing useful work). For Unit 202 Level 2, a basic understanding that power factor exists and that it affects power calculations in AC circuits is sufficient. At Level 3, power factor calculations using P = S × cosφ (where S is apparent power and cosφ is the power factor) are typically included. For the exam, focus on understanding the concept and being able to identify that reactive loads (motors, inductors) have power factors less than 1.',
  },
  {
    question: 'How do I convert between units of electrical energy?',
    answer:
      'Electrical energy is measured in joules (J) in SI units, but for practical purposes the kilowatt-hour (kWh) is more commonly used for electricity bills and energy consumption calculations. 1 kWh = 3,600,000 J (3.6 MJ). To calculate energy consumption: E(kWh) = P(kW) × t(hours). Example: a 3kW electric shower running for 8 minutes uses 3kW × (8/60)h = 0.4 kWh. For Unit 202 exam questions, be comfortable converting between watts and kilowatts (÷1000), between seconds and hours (÷3600), and between joules and kilowatt-hours (÷3,600,000). Also understand the formula E = Q × V (energy in joules = charge in coulombs × voltage in volts) — this relates electrical energy to the fundamental quantities of charge and potential difference.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/city-guilds-2365-unit-201',
    title: 'C&G 2365 Unit 201 — Health and Safety',
    description: 'HASAWA, COSHH, RIDDOR, and risk assessment revision guide.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2365-electrical',
    title: 'City & Guilds 2365 Complete Overview',
    description: 'Full qualification structure, units, assessment, and progression routes.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/am2-assessment-preparation',
    title: 'AM2 Assessment Preparation',
    description: 'What the AM2 practical assessment covers and how to prepare.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Apply Ohm\'s law and voltage drop calculations with real circuits.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/apprentice-training',
    title: 'Apprentice Training Hub',
    description: 'Full Level 2 and Level 3 training modules with AI study support.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/guides/supervising-electrical-apprentices',
    title: 'Supervising Electrical Apprentices',
    description: 'Employer obligations, training plans, and apprenticeship guidance.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is City & Guilds 2365 Unit 202?',
    content: (
      <>
        <p>
          Unit 202 — Principles of Building Services Engineering — is a mandatory knowledge unit
          within the City & Guilds 2365 Diploma in Electrical Installations at both Level 2 and
          Level 3. It covers the underpinning scientific and mathematical principles that make
          electrical installation work comprehensible rather than a series of memorised procedures.
        </p>
        <p>
          Understanding why circuits behave as they do — why a lower resistance means a higher
          current, why parallel circuits always have a lower combined resistance than any individual
          branch, why a longer cable has more voltage drop — turns an apprentice who follows
          instructions into an electrician who can solve problems independently on site.
        </p>
        <p>
          Unit 202 builds the theoretical foundation for all subsequent units in the 2365 diploma
          and provides the underpinning knowledge that supports the NVQ practical portfolio
          evidence. It also feeds directly into the AM2 practical assessment, where the ability to
          interpret test readings and fault conditions depends on applying the principles covered in
          this unit.
        </p>
      </>
    ),
  },
  {
    id: 'si-units',
    heading: 'SI Units and Electrical Quantities',
    content: (
      <>
        <p>
          All physical quantities in electrical engineering are measured in SI units (Système
          International d'Unités — the International System of Units). Understanding the units and
          their relationships is the starting point for all electrical calculations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { symbol: 'V', unit: 'Volt', quantity: 'Electromotive force (EMF) / Potential difference (PD)', colour: 'text-yellow-400' },
              { symbol: 'A', unit: 'Ampere', quantity: 'Electric current', colour: 'text-blue-400' },
              { symbol: 'Ω', unit: 'Ohm', quantity: 'Electrical resistance', colour: 'text-green-400' },
              { symbol: 'W', unit: 'Watt', quantity: 'Electrical power (1W = 1V × 1A)', colour: 'text-orange-400' },
              { symbol: 'J', unit: 'Joule', quantity: 'Electrical energy (1J = 1W × 1s)', colour: 'text-purple-400' },
              { symbol: 'Hz', unit: 'Hertz', quantity: 'Frequency (cycles per second)', colour: 'text-red-400' },
              { symbol: 'H', unit: 'Henry', quantity: 'Inductance', colour: 'text-cyan-400' },
              { symbol: 'F', unit: 'Farad', quantity: 'Capacitance', colour: 'text-pink-400' },
            ].map((item) => (
              <div key={item.symbol} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className={`text-2xl font-bold ${item.colour} w-8 shrink-0`}>{item.symbol}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.unit}</p>
                  <p className="text-white text-xs leading-relaxed">{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p>
          Prefixes scale the base unit up or down: kilo (k) = ×1,000; mega (M) = ×1,000,000; milli
          (m) = ×0.001; micro (μ) = ×0.000001. Common examples: 1kΩ = 1,000Ω; 1MΩ = 1,000,000Ω;
          30mA = 0.030A; 100μF = 0.0001F. Always convert to base units before performing
          calculations to avoid errors.
        </p>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: "Ohm's Law and Circuit Calculations",
    content: (
      <>
        <p>
          Ohm's law is the most important single relationship in electrical engineering. It states
          that the voltage across a conductor is proportional to the current flowing through it:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4 text-center">
          <p className="text-white text-3xl font-bold mb-2">V = I × R</p>
          <p className="text-white text-sm">Voltage (V) = Current (A) × Resistance (Ω)</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-yellow-400 font-bold text-lg">V = I × R</p>
              <p className="text-white text-xs">Find voltage</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-yellow-400 font-bold text-lg">I = V ÷ R</p>
              <p className="text-white text-xs">Find current</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-yellow-400 font-bold text-lg">R = V ÷ I</p>
              <p className="text-white text-xs">Find resistance</p>
            </div>
          </div>
        </div>
        <p>
          Practical applications of Ohm's law in electrical installation work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Voltage drop calculation:</strong> A 2.5mm² copper cable has resistance of approximately 7.41mΩ/m. A 20m ring circuit with a fault at the end (effectively a 10m one-way path) has R = 0.00741 × 10 = 0.0741Ω. At 16A fault current, voltage drop = I × R = 16 × 0.0741 = 1.19V.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Fault current:</strong> If the supply voltage is 230V and the total loop impedance (Zs) is 0.8Ω, the prospective fault current = V/Zs = 230/0.8 = 287.5A. This must be within the breaking capacity of the protective device.</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Continuity test interpretation:</strong> A continuity reading of 0.5Ω on a 20m protective conductor — does it indicate a good connection? R = ρ × L/A. For 1.5mm² copper (ρ = 17.2×10⁻⁹Ω·m): R = 17.2×10⁻⁹ × 20 / (1.5×10⁻⁶) = 0.23Ω. A reading of 0.5Ω is higher than expected and suggests a high-resistance joint worth investigating.</span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Practice circuit calculations with AI guidance"
          description="Elec-Mate's apprentice study module covers Ohm's law, voltage drop, and circuit analysis with worked examples and practice questions. Study on your phone between jobs."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'power',
    heading: 'Electrical Power and Energy Calculations',
    content: (
      <>
        <p>
          Power is the rate at which energy is transferred or converted. In electrical circuits:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4 text-center">
          <p className="text-white text-2xl font-bold mb-3">Power Formulae</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-blue-400 font-bold text-lg">P = V × I</p>
              <p className="text-white text-xs">From voltage and current</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-blue-400 font-bold text-lg">P = I² × R</p>
              <p className="text-white text-xs">From current and resistance</p>
            </div>
            <div className="rounded-xl bg-white/[0.05] p-3">
              <p className="text-blue-400 font-bold text-lg">P = V² ÷ R</p>
              <p className="text-white text-xs">From voltage and resistance</p>
            </div>
          </div>
        </div>
        <p>
          Energy is power × time: E = P × t. In SI units, energy in joules = watts × seconds. For
          practical energy consumption calculations, use kilowatts and hours to get kilowatt-hours
          (kWh) — the unit on electricity bills.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white mb-3">Worked Examples</h3>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Example 1 — Immersion heater:</strong> A 3kW immersion heater runs for 2 hours.
              Energy used = 3kW × 2h = 6kWh. At 28p/kWh, cost = 6 × 28p = 168p = £1.68.
            </li>
            <li>
              <strong>Example 2 — Cable heating:</strong> A 6mm² cable carries 40A. Resistance per metre = 3.08mΩ/m.
              Power dissipated per metre = I² × R = 40² × 0.00308 = 4.93W/m. Over a 10m run = 49.3W. This heating must be accounted for in the derating of the cable.
            </li>
            <li>
              <strong>Example 3 — Fuse sizing:</strong> A 1kW electric heater operates from 230V.
              Current = P/V = 1000/230 = 4.35A. The circuit should be protected by at least a 6A MCB (the next standard MCB rating above 4.35A, allowing for starting current).
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ac-dc',
    heading: 'AC vs DC: Key Differences for Electricians',
    content: (
      <>
        <p>
          Understanding the fundamental differences between AC and DC is essential for Unit 202 and
          for practical work with solar PV, battery storage, and EV charging circuits:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">DC (Direct Current)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Constant voltage and current direction</li>
              <li>Produced by batteries, solar cells, and rectifiers</li>
              <li>Used in control circuits, EV charging, solar PV</li>
              <li>Cannot be transformed (changed in voltage) easily</li>
              <li>No frequency — measure in volts DC (VDC)</li>
              <li>Polarity matters — + and – must be correctly connected</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">AC (Alternating Current)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Voltage and current reverse direction periodically</li>
              <li>UK supply: 230V RMS, 50Hz</li>
              <li>Used for mains distribution, motors, most domestic circuits</li>
              <li>Can be transformed to any voltage using a transformer</li>
              <li>Frequency in hertz (Hz) — 50Hz in UK, 60Hz in USA</li>
              <li>Polarity reverses — live/neutral identification still required</li>
            </ul>
          </div>
        </div>
        <p>
          For the Unit 202 exam, key AC concepts include: RMS (Root Mean Square) value — the
          equivalent DC value that produces the same heating effect (230V RMS = 325V peak for a
          sinusoidal supply); frequency and period (T = 1/f, so at 50Hz, T = 0.02 seconds per
          cycle); and the concept of phase (which becomes important at Level 3 with three-phase
          circuits and power factor).
        </p>
      </>
    ),
  },
  {
    id: 'circuits',
    heading: 'Series and Parallel Circuits',
    content: (
      <>
        <p>
          The behaviour of components connected in series versus parallel is a core Unit 202 topic
          with direct practical relevance:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 space-y-5">
          <div>
            <h3 className="font-bold text-white mb-3">Series Circuits</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /><span>Same current flows through every component</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /><span>Voltages add up: V_total = V1 + V2 + V3</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /><span>Resistances add up: R_total = R1 + R2 + R3</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /><span>One break in the circuit stops current flowing everywhere</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /><span>Practical example: traditional Christmas tree lights (older style), pilot circuits, some fault loop paths</span></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Parallel Circuits</h3>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /><span>Same voltage appears across every branch</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /><span>Currents add up: I_total = I1 + I2 + I3</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /><span>1/R_total = 1/R1 + 1/R2 + 1/R3 (total R is less than smallest branch R)</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /><span>One branch open does not affect other branches</span></li>
              <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" /><span>Practical example: all domestic circuits (sockets, lights) — each device gets full supply voltage regardless of how many devices are connected</span></li>
            </ul>
          </div>
        </div>
        <p>
          A common exam question tests the series-parallel combination: resistors arranged partly in
          series and partly in parallel. Work from the innermost parallel combination outward,
          simplifying step by step to a single equivalent resistance.
        </p>
      </>
    ),
  },
  {
    id: 'exam-tips',
    heading: 'Unit 202 Exam Structure and Revision Tips',
    content: (
      <>
        <p>
          Unit 202 is assessed by written online examination. The exam includes both calculation
          questions (where you must show working and arrive at a numerical answer) and knowledge
          questions (explaining concepts and identifying correct statements about circuit behaviour).
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Exam Format</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Multiple choice and short-answer format</li>
              <li>Calculation questions with marks for method even if final answer is wrong</li>
              <li>Scientific calculator permitted</li>
              <li>Formula sheet typically provided</li>
              <li>Duration: approximately 1–1.5 hours</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white mb-2">High-Frequency Exam Topics</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Ohm's law calculations — rearranging the formula for V, I, or R</li>
              <li>Series and parallel resistance calculations</li>
              <li>Power calculations using P = VI, P = I²R, P = V²/R</li>
              <li>Energy calculations (kWh = kW × hours)</li>
              <li>SI unit identification and prefix conversion</li>
              <li>AC vs DC — identifying characteristics, sources, and applications</li>
              <li>Voltage divider and current divider analysis</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white mb-2">Calculation Technique Tips</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Always convert prefixes to base units before calculating (30mA = 0.030A)</li>
              <li>Write the formula before substituting numbers</li>
              <li>Check units in your answer — watts, volts, ohms, amps</li>
              <li>For multi-step problems, label intermediate results clearly</li>
              <li>Round only at the final step, not intermediate steps</li>
            </ul>
          </div>
        </div>
        <SEOAppBridge
          title="Study Unit 202 with worked examples and AI practice questions"
          description="Elec-Mate's apprentice training hub covers all Unit 202 topics with worked examples, AI-generated practice questions, and instant explanation of wrong answers. Study on your phone between jobs."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CityGuilds2365Unit202Page() {
  return (
    <GuideTemplate
      title="City & Guilds 2365 Unit 202 — Electrical Principles | Revision Guide UK"
      description="Complete revision guide for City & Guilds 2365 Unit 202 — Principles of Building Services Engineering. Ohm's law, power calculations, series and parallel circuits, AC vs DC, SI units, and exam technique for electrical apprentices."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          C&G 2365 Unit 202:{' '}
          <span className="text-yellow-400">Electrical Principles Revision Guide for Apprentices</span>
        </>
      }
      heroSubtitle="Comprehensive revision guide for City & Guilds 2365 Unit 202 — Principles of Building Services Engineering. Ohm's law, power and energy calculations, series and parallel circuits, AC vs DC, SI units, and exam technique for electrical apprentices."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About C&G 2365 Unit 202"
      relatedPages={relatedPages}
      ctaHeading="Study Unit 202 with AI Practice Questions and Worked Examples"
      ctaSubheading="Join thousands of UK electrical apprentices using Elec-Mate for Unit 202 theory — Ohm's law, power calculations, and circuit analysis with instant AI explanation. 7-day free trial."
    />
  );
}
