import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  BookOpen,
  Zap,
  GraduationCap,
  Lightbulb,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'Maths for Electrical Apprentices', href: '/apprentice-maths-electrician' },
];

const tocItems = [
  { id: 'ohms-law-calculations', label: "Ohm's Law Calculations" },
  { id: 'power-triangle', label: 'Power Triangle (P = IV)' },
  { id: 'voltage-drop', label: 'Voltage Drop Formula' },
  { id: 'percentage-voltage-drop', label: 'Percentage Voltage Drop' },
  { id: 'transposition', label: 'Transposition of Formulae' },
  { id: 'pythagoras-ac', label: 'Pythagoras for AC Circuits' },
  { id: 'scientific-notation', label: 'Scientific Notation' },
  { id: 'worked-examples', label: 'Practical Worked Examples' },
  { id: 'study-tools', label: 'Study Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Ohm's Law (V = IR) is the starting point for almost every electrical calculation — master transposition and you can find any unknown.",
  'The power triangle (P = IV, P = I²R, P = V²/R) gives you three ways to calculate power — use whichever two quantities you already know.',
  'Voltage drop is calculated using the formula: Vd = (mV/A/m × I × L) / 1000, where mV/A/m values come from BS 7671 Appendix 4 tables.',
  'Percentage voltage drop must not exceed 3% for lighting circuits or 5% for power circuits under normal BS 7671 conditions.',
  'Transposition of formulae is a core maths skill — always perform the same operation to both sides of the equation to isolate the unknown.',
];

const faqs = [
  {
    question: 'What maths do I need as an electrical apprentice?',
    answer:
      "Electrical apprentices need to be confident with basic arithmetic (add, subtract, multiply, divide), fractions and decimals, percentages, powers and roots (especially square roots for AC calculations), and basic algebra for transposing formulae. You will use these skills to apply Ohm's Law, calculate power, work out voltage drop, check circuit impedance, and calculate fault current. Trigonometry (sine, cosine, tangent) and Pythagoras' theorem become important for AC power factor calculations from Year 2 onwards. You do not need A-level maths — a solid GCSE Maths foundation is sufficient.",
  },
  {
    question: "How do I transpose Ohm's Law to find resistance?",
    answer:
      "Start with V = I × R. To find R, you need to isolate it by dividing both sides by I. This gives V/I = R, or more neatly, R = V ÷ I. Example: if the voltage across a resistor is 24V and the current through it is 3A, then R = 24 ÷ 3 = 8Ω. The golden rule of transposition is: whatever you do to one side of the equation, you must do the same to the other side.",
  },
  {
    question: 'What is voltage drop and why does it matter?',
    answer:
      "Voltage drop is the reduction in voltage that occurs along a cable due to its resistance. In a circuit, every metre of cable has a resistance that causes a small voltage drop when current flows through it. If too much voltage is lost in the cables, the load at the end of the circuit receives less voltage than it needs — lights will dim, motors will overheat, and equipment may malfunction. BS 7671 Table 4Ab sets the maximum permitted voltage drop: 3% for lighting circuits (6.9V on a 230V system) and 5% for power circuits (11.5V on 230V).",
  },
  {
    question: 'What is power factor and do I need to understand it in Year 1?',
    answer:
      "Power factor is the ratio of true (real) power (watts) to apparent power (volt-amperes) in an AC circuit. It arises because inductors and capacitors cause current to be out of phase with voltage. In Year 1, you are primarily working with resistive DC and simple AC circuits where power factor = 1, so P = V × I is straightforward. Power factor becomes important from Year 2 when you study inductive loads like motors and fluorescent lighting. However, knowing the concept exists — and that the power triangle uses true power (W), reactive power (VAr), and apparent power (VA) — is useful background.",
  },
  {
    question: 'How do I calculate percentage voltage drop?',
    answer:
      "Percentage voltage drop = (Vd ÷ Vn) × 100, where Vd is the actual voltage drop in volts and Vn is the nominal supply voltage (230V for single-phase UK). Example: if a circuit has a voltage drop of 8V, percentage Vd = (8 ÷ 230) × 100 = 3.48%. This exceeds the 3% limit for lighting circuits but is within the 5% limit for power circuits. You can also calculate voltage drop directly using the formula: Vd = (mV/A/m × I × L) ÷ 1000, using the millivolt per ampere per metre values from BS 7671 Appendix 4.",
  },
  {
    question: "What is Pythagoras' theorem used for in electrical work?",
    answer:
      "In AC circuits, voltage, current, and impedance are not always in phase. When a circuit contains both resistance (R) and reactance (X — from inductors or capacitors), they combine at right angles in a phasor diagram. Pythagoras' theorem (Z² = R² + X²) gives us the impedance Z from the resistance and reactance: Z = √(R² + X²). Similarly, apparent power (VA) = √(true power² + reactive power²). In Year 1 you mainly deal with resistive circuits, but understanding that Pythagoras applies to AC quantities prepares you for Year 2 and the C&G 2365 Unit 204.",
  },
  {
    question: 'What scientific notation values come up most in electrical work?',
    answer:
      "The most common SI prefixes you will use daily are: kilo (k) = ×1,000 — kilowatts (kW), kilohms (kΩ), kilovolt-amperes (kVA); mega (M) = ×1,000,000 — megohms (MΩ) used in insulation resistance testing; milli (m) = ÷1,000 — milliamps (mA) for RCD ratings (30mA trip), millivolts (mV) in voltage drop tables; micro (μ) = ÷1,000,000 — microfarads (μF) for capacitors. You must be comfortable converting between these. For example, 250mA = 0.25A; 2.5kΩ = 2,500Ω; 100μF = 0.0001F.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/apprentice-first-year-revision',
    title: 'Year 1 Revision Guide',
    description: "Ohm's Law, electrical units, circuit theory, health and safety — complete Year 1 revision.",
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/apprentice-endpoint-assessment',
    title: 'End-Point Assessment (EPA) Guide',
    description: 'Knowledge test, practical observation, professional discussion — everything about the EPA.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/city-guilds-level-3-guide',
    title: 'City & Guilds Level 3 Guide',
    description: 'The 2365 qualification structure, units, assessment methods, and achieving distinction.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description: 'Flashcards, AI tutor, and calculation tools built for electrical apprentices.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'ohms-law-calculations',
    heading: "Ohm's Law Calculations",
    content: (
      <>
        <p>
          Ohm's Law is V = I × R. The three variables — voltage (V), current (I), and resistance
          (R) — are related such that if you know any two, you can calculate the third. This is
          the foundation of every electrical calculation you will do throughout your career.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find V:</strong> V = I × R. Example: I = 5A, R = 10Ω → V = 5 × 10 = 50V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find I:</strong> I = V ÷ R. Example: V = 230V, R = 46Ω → I = 230 ÷ 46 =
                5A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Find R:</strong> R = V ÷ I. Example: V = 12V, I = 0.4A → R = 12 ÷ 0.4 =
                30Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Series circuit example:</strong> Three resistors of 4Ω, 6Ω, and 10Ω in
                series on a 20V supply. Rt = 4 + 6 + 10 = 20Ω. I = V ÷ Rt = 20 ÷ 20 = 1A. Vd
                across 6Ω resistor = 1 × 6 = 6V.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/study-centre">
            Elec-Mate Study Centre
          </SEOInternalLink>{' '}
          calculation tools to generate random Ohm's Law problems and check your working. Repeated
          practice is the only reliable way to build calculation speed for exams.
        </p>
      </>
    ),
  },
  {
    id: 'power-triangle',
    heading: 'Power Triangle (P = IV)',
    content: (
      <>
        <p>
          The power triangle gives you three equivalent formulae for calculating electrical power.
          By combining P = IV with Ohm's Law (V = IR), you get two additional forms that allow
          you to calculate power from any pair of known quantities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>P = I × V</strong> — use when you know current and voltage. Example: a
                kettle draws 10A on a 230V supply. P = 10 × 230 = 2,300W = 2.3kW.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>P = I² × R</strong> — use when you know current and resistance. Example:
                5A through a 20Ω resistor. P = 5² × 20 = 25 × 20 = 500W. This formula also shows
                why cable sizing matters — doubling the current quadruples the power dissipated as
                heat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>P = V² ÷ R</strong> — use when you know voltage and resistance. Example:
                230V across a 529Ω load. P = 230² ÷ 529 = 52,900 ÷ 529 = 100W.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transposing for current:</strong> If P and V are given: I = P ÷ V. Example:
                a 3kW shower on 230V draws I = 3,000 ÷ 230 ≈ 13A. This tells you the minimum
                circuit current rating required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These three forms of the power formula are all you need for DC and resistive AC power
          calculations. The formulae also appear in design work — calculating the current demand
          of a circuit before selecting the correct cable and protective device.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-drop',
    heading: 'Voltage Drop Formula',
    content: (
      <>
        <p>
          Every cable has resistance. When current flows through a cable, the resistance causes a
          voltage drop — a reduction in voltage between the supply and the load. BS 7671 requires
          you to calculate voltage drop to ensure the load receives adequate voltage. The standard
          formula uses millivolt per ampere per metre (mV/A/m) values from BS 7671 Appendix 4.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formula:</strong> Vd = (mV/A/m × I × L) ÷ 1000. Where: mV/A/m = the
                millivolt drop per ampere per metre for your cable (from BS 7671 Appendix 4 Table
                4Ab or 4D2B), I = design current in amps, L = one-way cable length in metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Worked example:</strong> A 2.5mm² twin and earth cable (mV/A/m = 18) runs
                20m to supply a 13A socket. Vd = (18 × 13 × 20) ÷ 1000 = 4,680 ÷ 1000 = 4.68V.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum permitted voltage drop:</strong> BS 7671 Table 4Ab allows 3% for
                lighting (6.9V) and 5% for other circuits (11.5V) on a 230V supply. 4.68V = 2.03%,
                which is within both limits. The circuit is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When voltage drop is too high:</strong> Select a larger cable with a lower
                mV/A/m value, reduce the circuit length (use a sub-distribution board closer to
                the load), or reduce the current demand. Recalculate until Vd is within limits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'percentage-voltage-drop',
    heading: 'Percentage Voltage Drop',
    content: (
      <>
        <p>
          Once you have calculated the actual voltage drop in volts, you need to express it as a
          percentage of the nominal supply voltage to compare against the BS 7671 limits.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Formula:</strong> % Vd = (Vd ÷ Vn) × 100. Where Vd = actual voltage drop
                (V) and Vn = nominal supply voltage (230V for single-phase UK).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example:</strong> Actual Vd = 8.5V on a 230V power circuit. % Vd =
                (8.5 ÷ 230) × 100 = 3.7%. This is within the 5% limit for power circuits but
                would exceed the 3% limit for a lighting circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase circuits:</strong> Use the line voltage (400V) as Vn for
                three-phase calculations. The mV/A/m values for three-phase cables are listed
                separately in BS 7671 Appendix 4 tables.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Voltage drop calculation is a compulsory element of the design section of your Level 3
          qualification and appears in the City & Guilds 2365 Unit 305 (Electrical Systems Design)
          exam. Practise with the{' '}
          <SEOInternalLink href="/study-centre">
            Elec-Mate calculation tools
          </SEOInternalLink>{' '}
          to build speed and accuracy.
        </p>
      </>
    ),
  },
  {
    id: 'transposition',
    heading: 'Transposition of Formulae',
    content: (
      <>
        <p>
          Transposition means rearranging a formula to make a different variable the subject. In
          electrical work you constantly need to find a different unknown from the same relationship
          — for example, finding current from a power and voltage, or finding resistance from a
          voltage drop and current. The rules are straightforward but require practice.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rule 1 — Do the same to both sides:</strong> To isolate a variable,
                perform the inverse operation on both sides. If a variable is multiplied, divide
                both sides. If it is divided, multiply both sides.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example — find R from P = V²/R:</strong> Multiply both sides by R →
                P × R = V². Divide both sides by P → R = V² ÷ P. Example: P = 100W, V = 230V →
                R = 230² ÷ 100 = 52,900 ÷ 100 = 529Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example — find L from voltage drop formula:</strong> From Vd = (mV/A/m ×
                I × L) ÷ 1000, multiply both sides by 1000 → Vd × 1000 = mV/A/m × I × L. Divide
                both sides by (mV/A/m × I) → L = (Vd × 1000) ÷ (mV/A/m × I).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rule 2 — Handle square roots and squares carefully:</strong> To isolate a
                squared variable, take the square root of both sides. To isolate a square-rooted
                variable, square both sides.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pythagoras-ac',
    heading: "Pythagoras' Theorem for AC Circuits",
    content: (
      <>
        <p>
          In AC circuits containing inductance or capacitance, resistance (R) and reactance (X)
          are out of phase with each other. They cannot simply be added — instead they are
          combined using Pythagoras' theorem because they are at 90° to each other on a phasor
          diagram.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Impedance formula:</strong> Z = √(R² + X²). Impedance (Z, measured in
                ohms) is the total opposition to current flow in an AC circuit — the AC equivalent
                of resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Worked example:</strong> A circuit has R = 3Ω and inductive reactance
                XL = 4Ω. Z = √(3² + 4²) = √(9 + 16) = √25 = 5Ω. Current I = V ÷ Z = 230 ÷ 5 =
                46A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power triangle:</strong> True power (P, watts), reactive power (Q, VAr),
                and apparent power (S, VA) follow the same Pythagorean relationship: S = √(P² + Q²).
                Power factor = P ÷ S.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When this appears in exams:</strong> Impedance calculations with Pythagoras
                appear in C&G 2365 Unit 204 (Electrical Installations Technology) and again in
                Unit 304. Recognising a 3-4-5 triangle (and its multiples: 6-8-10, 5-12-13) saves
                calculation time in exams.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'scientific-notation',
    heading: 'Scientific Notation and SI Prefixes',
    content: (
      <>
        <p>
          Electrical values span an enormous range — from picofarads (millionths of millionths of
          a farad) to megawatts (millions of watts). Scientific notation and SI prefixes let you
          express these values conveniently and without ambiguity.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mega (M) = ×10⁶:</strong> 1MΩ = 1,000,000Ω. Insulation resistance is
                measured in megohms — a healthy insulation resistance for a new installation is
                typically greater than 1MΩ, and often several hundred megohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kilo (k) = ×10³:</strong> 2.5kΩ = 2,500Ω; 3kW = 3,000W; 400kV = 400,000V
                (grid transmission voltage). Used for larger, practical values.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Milli (m) = ×10⁻³:</strong> 30mA = 0.03A — the standard RCD tripping
                current for protection against electric shock. 100mV = 0.1V. mV/A/m values in
                voltage drop tables are in millivolts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Micro (μ) = ×10⁻⁶:</strong> 100μF = 0.0001F. Motor start capacitors are
                typically 4μF to 70μF. Power factor correction capacitors in commercial installations
                may be hundreds of μF.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Converting between units: to convert from milli to base unit, divide by 1,000. To convert
          from kilo to base unit, multiply by 1,000. Get comfortable doing this without a calculator
          — some multi-choice exam questions catch apprentices who convert the wrong way.
        </p>
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Practical Worked Examples',
    content: (
      <>
        <p>
          The best way to consolidate electrical maths is to work through realistic examples that
          combine multiple calculation types, just as exam questions do. Here are three examples
          that represent the style of question you will encounter.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-6 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>Example 1 — Cable sizing and voltage drop:</strong></p>
                <p className="mt-1">
                  A 32A ring final circuit is wired in 2.5mm² twin and earth. The longest radial
                  distance from the consumer unit to the furthest socket is 22m. The mV/A/m value
                  for 2.5mm² in a ring circuit = 7.3mV/A/m (half the tabulated value because of
                  the ring). Design current (Ib) = 20A (typical). Vd = (7.3 × 20 × 22) ÷ 1000 =
                  3,212 ÷ 1000 = 3.21V. % Vd = (3.21 ÷ 230) × 100 = 1.4%. Well within the 5%
                  limit.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>Example 2 — Power and current:</strong></p>
                <p className="mt-1">
                  An immersion heater is rated 3kW at 230V. What current does it draw and what is
                  its resistance? I = P ÷ V = 3,000 ÷ 230 = 13.04A. R = V ÷ I = 230 ÷ 13.04 =
                  17.64Ω (or R = V² ÷ P = 52,900 ÷ 3,000 = 17.63Ω — same answer). The circuit
                  requires a 16A MCB and 2.5mm² cable.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <p><strong>Example 3 — Series circuit with voltage drops:</strong></p>
                <p className="mt-1">
                  Three lamps of 20Ω, 30Ω, and 50Ω are connected in series across a 200V supply.
                  Rt = 20 + 30 + 50 = 100Ω. I = V ÷ Rt = 200 ÷ 100 = 2A. Vd across 30Ω lamp =
                  2 × 30 = 60V. P dissipated by 50Ω lamp = I² × R = 4 × 50 = 200W.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Practice electrical maths with Elec-Mate"
          description="The Elec-Mate Study Centre includes calculation drills, worked examples, and AI-powered step-by-step explanations for every formula you need as an electrical apprentice. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeMathsElectricianPage() {
  return (
    <GuideTemplate
      title="Maths for Electrical Apprentices | Essential Electrical Calculations"
      description="Essential electrical maths for apprentices. Ohm's Law calculations, power triangle (P=IV), voltage drop formula, percentage voltage drop, transposition of formulae, Pythagoras for AC circuits, scientific notation, and practical worked examples."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Maths Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Maths for Electrical Apprentices:{' '}
          <span className="text-yellow-400">Essential Electrical Calculations</span>
        </>
      }
      heroSubtitle="Every electrical maths skill you need as an apprentice — Ohm's Law, the power triangle, voltage drop, percentage voltage drop, transposition of formulae, Pythagoras for AC circuits, SI prefixes, and practical worked examples."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Maths for Electrical Apprentices"
      relatedPages={relatedPages}
      ctaHeading="Master Electrical Maths with Elec-Mate"
      ctaSubheading="Calculation drills, worked examples, and AI-powered explanations for every formula. Built for electrical apprentices — study on your phone, pass your exams. 7-day free trial."
    />
  );
}
