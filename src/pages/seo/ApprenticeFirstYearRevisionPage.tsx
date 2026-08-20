import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { MockExamIndexLinks } from '@/components/seo/MockExamIndexLinks';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { BookOpen, Calculator, ClipboardCheck, GraduationCap, Lightbulb } from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto rounded-none border-y border-white/[0.14] ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full min-w-[560px] border-collapse text-left text-[13.5px] text-white';
const thCn = 'px-4 py-3 font-semibold text-white align-bottom';
const tdCn = 'px-4 py-3 text-white align-top';
const trCn = 'border-t border-white/[0.1]';

const defListCn = 'divide-y divide-white/[0.1]';
const defRowCn = 'py-3 first:pt-0 last:pb-0 text-white';
const defTermCn = 'block font-semibold text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'Apprentice Revision', href: '/apprentice-first-year-revision' },
];

const tocItems = [
  { id: 'quick-reference', label: 'Year 1 Numbers to Memorise' },
  { id: 'electrical-units', label: 'Electrical Units' },
  { id: 'ohms-law', label: "Ohm's Law" },
  { id: 'basic-circuit-theory', label: 'Basic Circuit Theory' },
  { id: 'dc-circuits', label: 'DC Circuits' },
  { id: 'ac-fundamentals', label: 'AC Fundamentals' },
  { id: 'basic-tools', label: 'Basic Tools' },
  { id: 'health-and-safety', label: 'Health and Safety Fundamentals' },
  { id: 'pat-testing-intro', label: 'Introduction to PAT Testing' },
  { id: 'study-tools', label: 'Elec-Mate Study Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Ohm's Law (V = IR) is the single most important formula in Year 1 — know it forwards, backwards, and be able to transpose it for any unknown.",
  'The six core electrical units you must memorise: volt (V), ampere (A), ohm (Ω), watt (W), coulomb (C), and farad (F).',
  'Series circuits share the same current throughout; parallel circuits share the same voltage across each branch.',
  'AC (alternating current) in the UK runs at 230 V / 50 Hz — frequency and voltage values appear in every exam.',
  'Health and safety legislation you must know in Year 1: Health and Safety at Work etc. Act 1974, Electricity at Work Regulations 1989, and Manual Handling Operations Regulations 1992.',
  'Two rules from BS 7671:2018+A4:2026 you meet from day one: Reg 411.3.4 requires 30 mA RCD protection on AC final circuits supplying luminaires in domestic premises; Reg 421.1.7 requires AFDDs on socket-outlet circuits up to 32 A in high rise residential buildings, HMOs, purpose-built student accommodation and care homes, and recommends them elsewhere.',
];

const faqs = [
  {
    question: 'What topics are covered in Year 1 of an electrical apprenticeship?',
    answer:
      "Year 1 of a Level 3 Electrical Installation apprenticeship covers fundamental electrical theory including electrical units (volts, amps, ohms, watts), Ohm's Law, Kirchhoff's Laws, series and parallel circuits, DC and AC fundamentals, basic tools and their safe use, health and safety legislation (Health and Safety at Work etc. Act 1974, Electricity at Work Regulations 1989), PAT testing introduction, and basic wiring principles. You will also begin working towards your Level 3 Award in the Requirements for Electrical Installations (BS 7671:2018+A4:2026).",
  },
  {
    question: "How do I revise Ohm's Law effectively?",
    answer:
      "Use the Ohm's Law triangle (V at the top, I and R at the bottom). Cover the unknown and the remaining symbols show you the formula: cover V → V = I × R; cover I → I = V / R; cover R → R = V / I. Practise transposing the formula with worked examples until it becomes automatic. The Elec-Mate flashcard system lets you drill Ohm's Law calculations with randomly generated values so you practise the maths, not just the formula.",
  },
  {
    question: 'What is the difference between series and parallel circuits?',
    answer:
      'In a series circuit, components are connected end-to-end so the same current flows through every component. The total resistance is the sum of all individual resistances (Rt = R1 + R2 + R3). Voltage is shared between components in proportion to their resistance. In a parallel circuit, each component has its own separate path connected between the same two points. The voltage across each branch is identical, but current divides between branches. Total resistance in a parallel circuit is always less than the smallest individual resistance.',
  },
  {
    question: 'What is the UK mains supply voltage and frequency?',
    answer:
      'The UK nominal supply voltage is 230 V AC at 50 Hz (hertz). The voltage tolerance is +10% / −6%, meaning acceptable voltages range from approximately 216.2 V to 253.0 V. The frequency tolerance is ±1%, so 49.5 Hz to 50.5 Hz. These limits sit with the Electricity Safety, Quality and Continuity Regulations (ESQCR), which require the distributor to declare the voltage and frequency of the supply and the extent of the permitted variations. You must know both values — they appear frequently in theory exams and practical assessments throughout your apprenticeship.',
  },
  {
    question: 'What health and safety legislation must I know in Year 1?',
    answer:
      'The key legislation for Year 1 includes: Health and Safety at Work etc. Act 1974 (HSWA) — the primary legislation placing duties on employers and employees; Electricity at Work Regulations 1989 — specific to electrical systems, and the reason safe isolation is not optional; Manual Handling Operations Regulations 1992 — risk assessment for lifting and moving loads; Personal Protective Equipment at Work Regulations 1992 — employer duty to provide PPE; and Control of Substances Hazardous to Health Regulations 2002 (COSHH). In construction, you will also encounter the Construction (Design and Management) Regulations 2015 (CDM).',
  },
  {
    question: 'What tools should a first-year apprentice know?',
    answer:
      'First-year apprentices should be able to identify, name, and use correctly: screwdrivers (flathead, Pozidriv, insulated), wire strippers, cable cutters, pliers (combination, long-nose), hammer, chisel, cold chisel, spirit level, tape measure, bradawl, cordless drill, and voltage indicator. You must also understand when and how to use PPE including insulated gloves, safety glasses, hard hat, steel-toecap boots, and hi-vis vest. Never use a tool you have not been trained on — always ask your supervisor.',
  },
  {
    question: 'What is PAT testing and do apprentices do it?',
    answer:
      'PAT stands for Portable Appliance Testing — the process of inspecting and testing in-service electrical equipment to check it is safe to use. Apprentices are introduced to it in Year 1 because it demonstrates fundamental principles: visual inspection, earth continuity testing, insulation resistance testing, and record keeping. Formal certification (City & Guilds 2377) is usually completed later in the apprenticeship or after qualification, but understanding the principles from Year 1 builds the inspection and testing skills that are central to the AM2 assessment and EICR work.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/apprentice-maths-electrician',
    title: 'Maths for Electrical Apprentices',
    description:
      "Essential electrical calculations with worked examples — Ohm's Law, power triangle, voltage drop.",
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/apprentice-endpoint-assessment',
    title: 'End-Point Assessment (EPA) Guide',
    description:
      'What the EPA involves, how to prepare, grading, and what happens if you need to re-sit.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/apprentice-progression-guide',
    title: 'Career Progression After Your Apprenticeship',
    description: 'JIB Gold Card, AM2, self-employment, HNC/HND, and salary progression explained.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/city-guilds-level3-guide',
    title: 'City & Guilds Level 3 Guide',
    description:
      'Everything you need to know about the City & Guilds 2365 Level 3 Electrical Installation qualification.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description:
      'Flashcards, AI tutor, mock exams, and course modules built for electrical apprentices.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'quick-reference',
    heading: 'Year 1 Numbers to Memorise',
    content: (
      <>
        <p>
          These are the figures that come up again and again in Year 1 written papers and on site.
          Learn this table first — everything else on the page explains where the numbers come from.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Quantity</th>
                <th className={thCn}>Value</th>
                <th className={thCn}>Where it comes from</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>UK nominal supply voltage</td>
                <td className={tdCn}>230 V AC (line to neutral)</td>
                <td className={tdCn}>ESQCR declared voltage</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>UK supply frequency</td>
                <td className={tdCn}>50 Hz</td>
                <td className={tdCn}>ESQCR declared frequency</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Voltage tolerance</td>
                <td className={tdCn}>+10% / −6% (216.2 V to 253.0 V)</td>
                <td className={tdCn}>ESQCR permitted variation</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Frequency tolerance</td>
                <td className={tdCn}>±1% (49.5 Hz to 50.5 Hz)</td>
                <td className={tdCn}>ESQCR permitted variation</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Period of one cycle at 50 Hz</td>
                <td className={tdCn}>T = 1 ÷ 50 = 0.02 s (20 ms)</td>
                <td className={tdCn}>T = 1 ÷ f</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Peak voltage of a 230 V RMS supply</td>
                <td className={tdCn}>230 × √2 ≈ 325 V</td>
                <td className={tdCn}>Vpeak = Vrms × √2</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Three-phase supply</td>
                <td className={tdCn}>400 V line to line / 230 V line to neutral, 120° apart</td>
                <td className={tdCn}>Standard UK LV distribution</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>RCD for domestic luminaire circuits</td>
                <td className={tdCn}>Rated residual operating current not exceeding 30 mA</td>
                <td className={tdCn}>BS 7671 Reg 411.3.4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-units',
    heading: 'Electrical Units You Must Know',
    content: (
      <>
        <p>
          Before you can understand any electrical circuit, you need to know the units used to
          measure electrical quantities. These are the foundation of everything else in Year 1 and
          beyond. The International System of Units (SI) is used throughout electrical engineering.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Unit</th>
                <th className={thCn}>Symbol</th>
                <th className={thCn}>Quantity measured</th>
                <th className={thCn}>What it means</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Volt</td>
                <td className={tdCn}>V</td>
                <td className={tdCn}>Electromotive force (EMF) or potential difference (PD)</td>
                <td className={tdCn}>
                  The electrical pressure that drives current around a circuit. Named after
                  Alessandro Volta.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Ampere</td>
                <td className={tdCn}>A (I in formulas)</td>
                <td className={tdCn}>Electric current</td>
                <td className={tdCn}>
                  The rate of flow of electric charge. One ampere is one coulomb passing a point per
                  second. Named after André-Marie Ampère.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Ohm</td>
                <td className={tdCn}>Ω (R in formulas)</td>
                <td className={tdCn}>Resistance</td>
                <td className={tdCn}>
                  Opposition to the flow of current. One ohm allows one ampere to flow when one volt
                  is applied. Named after Georg Simon Ohm.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Watt</td>
                <td className={tdCn}>W (P in formulas)</td>
                <td className={tdCn}>Power</td>
                <td className={tdCn}>
                  The rate at which energy is transferred or converted. P = V × I. Named after James
                  Watt.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Coulomb</td>
                <td className={tdCn}>C (Q in formulas)</td>
                <td className={tdCn}>Electric charge</td>
                <td className={tdCn}>
                  The charge transported by one ampere in one second. Q = I × t.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Farad</td>
                <td className={tdCn}>F</td>
                <td className={tdCn}>Capacitance</td>
                <td className={tdCn}>
                  The ability to store electrical charge. One farad is very large, so capacitors are
                  rated in microfarads (μF) or picofarads (pF). Named after Michael Faraday.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          SI prefixes you will use every day
        </h3>
        <p>
          Electrical values are rarely a convenient size, so prefixes scale them up or down. Get
          these wrong in an exam and the answer is out by a factor of a thousand.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Prefix</th>
                <th className={thCn}>Symbol</th>
                <th className={thCn}>Multiplier</th>
                <th className={thCn}>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>mega</td>
                <td className={tdCn}>M</td>
                <td className={tdCn}>× 1,000,000</td>
                <td className={tdCn}>1 MΩ = 1,000,000 Ω</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>kilo</td>
                <td className={tdCn}>k</td>
                <td className={tdCn}>× 1,000</td>
                <td className={tdCn}>2.5 kΩ = 2,500 Ω</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>milli</td>
                <td className={tdCn}>m</td>
                <td className={tdCn}>× 0.001</td>
                <td className={tdCn}>100 mA = 0.1 A</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>micro</td>
                <td className={tdCn}>μ</td>
                <td className={tdCn}>× 0.000001</td>
                <td className={tdCn}>470 μF = 0.00047 F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: "Ohm's Law",
    content: (
      <>
        <p>
          Ohm&rsquo;s Law is the single most important relationship in electrical theory. Published
          by Georg Simon Ohm in 1827, it defines the relationship between voltage, current, and
          resistance in a conductor at constant temperature.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>To find</th>
                <th className={thCn}>Formula</th>
                <th className={thCn}>Worked example</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Voltage (volts)</td>
                <td className={tdCn}>V = I × R</td>
                <td className={tdCn}>2 A through 6 Ω → V = 2 × 6 = 12 V</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Current (amperes)</td>
                <td className={tdCn}>I = V ÷ R</td>
                <td className={tdCn}>12 V across 6 Ω → I = 12 ÷ 6 = 2 A</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Resistance (ohms)</td>
                <td className={tdCn}>R = V ÷ I</td>
                <td className={tdCn}>12 V drawing 2 A → R = 12 ÷ 2 = 6 Ω</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The Ohm&rsquo;s Law triangle is the memory aid: draw a triangle with V at the top, I
          bottom-left, R bottom-right. Cover the unknown quantity and the two visible symbols show
          you the calculation. Practise transposing it until you no longer need the triangle — use
          the <SEOInternalLink href="/study-centre">Elec-Mate Study Centre</SEOInternalLink>{' '}
          flashcards to drill it with randomly generated values.
        </p>
      </>
    ),
  },
  {
    id: 'basic-circuit-theory',
    heading: 'Basic Circuit Theory',
    content: (
      <>
        <p>
          Every electrical circuit has the same basic parts: a source of EMF (battery or supply),
          conductors to carry current, a load that uses the energy, and a return path.
          Kirchhoff&rsquo;s Laws describe how voltage and current behave once those parts are
          connected.
        </p>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>Kirchhoff&rsquo;s Current Law (KCL)</dt>
              <dd className="text-white">
                The total current entering a junction equals the total current leaving it. No current
                is lost at a junction — it is a statement of the conservation of charge.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Kirchhoff&rsquo;s Voltage Law (KVL)</dt>
              <dd className="text-white">
                The sum of all voltages around a closed loop equals zero. In practice: the supply
                voltage equals the sum of all the voltage drops across the resistances in the loop.
              </dd>
            </div>
          </dl>
        </div>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Series against parallel
        </h3>
        <p>
          This comparison is worth more marks than any other single topic in Year 1. Learn it as a
          set of contrasts rather than two separate lists.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Property</th>
                <th className={thCn}>Series circuit</th>
                <th className={thCn}>Parallel circuit</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Current</td>
                <td className={tdCn}>The same through every component</td>
                <td className={tdCn}>Divides between the branches</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Voltage</td>
                <td className={tdCn}>Divides in proportion to resistance</td>
                <td className={tdCn}>The same across every branch</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Total resistance</td>
                <td className={tdCn}>Rt = R1 + R2 + R3</td>
                <td className={tdCn}>1/Rt = 1/R1 + 1/R2 + 1/R3</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Compared with the individual resistors</td>
                <td className={tdCn}>Rt is greater than the largest resistor</td>
                <td className={tdCn}>Rt is always less than the smallest resistor</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>If one component goes open circuit</td>
                <td className={tdCn}>The whole circuit stops</td>
                <td className={tdCn}>The remaining branches keep working</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'dc-circuits',
    heading: 'DC Circuits',
    content: (
      <>
        <p>
          Direct current (DC) flows in one direction only. Batteries, solar panels, and USB chargers
          all produce DC. Understanding DC circuits is the foundation before moving on to AC, which
          is more complex because of the effects of inductance and capacitance.
        </p>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Combining resistors
        </h3>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>Resistors in series</dt>
              <dd className="text-white">Rt = R1 + R2 + R3. Example: 10 Ω + 15 Ω + 25 Ω = 50 Ω.</dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Two resistors in parallel</dt>
              <dd className="text-white">
                Rt = (R1 × R2) ÷ (R1 + R2). Example: 6 Ω and 12 Ω in parallel = (6 × 12) ÷ (6 + 12) =
                72 ÷ 18 = 4 Ω.
              </dd>
            </div>
          </dl>
        </div>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Power and energy formulas
        </h3>
        <p>
          All three power formulas are equivalent — pick whichever suits the two values the question
          has given you.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Formula</th>
                <th className={thCn}>Gives you</th>
                <th className={thCn}>Use when you know</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>P = V × I</td>
                <td className={tdCn}>Power in watts</td>
                <td className={tdCn}>Voltage and current</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>P = I² × R</td>
                <td className={tdCn}>Power in watts</td>
                <td className={tdCn}>Current and resistance</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>P = V² ÷ R</td>
                <td className={tdCn}>Power in watts</td>
                <td className={tdCn}>Voltage and resistance</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>W = P × t</td>
                <td className={tdCn}>Energy in joules</td>
                <td className={tdCn}>Power in watts and time in seconds</td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>kWh = kW × hours</td>
                <td className={tdCn}>Energy as billed</td>
                <td className={tdCn}>Load in kilowatts and running hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'ac-fundamentals',
    heading: 'AC Fundamentals',
    content: (
      <>
        <p>
          Alternating current (AC) repeatedly reverses direction. The UK mains supply is 230 V at 50
          Hz — this is what you work with in almost every domestic and commercial installation. AC
          introduces frequency, period, peak values, and RMS values.
        </p>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>Frequency (f)</dt>
              <dd className="text-white">
                The number of complete cycles per second, measured in hertz (Hz). UK mains: 50 Hz.
                USA mains: 60 Hz.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Period (T)</dt>
              <dd className="text-white">
                The time for one complete cycle. T = 1 ÷ f. At 50 Hz: T = 1 ÷ 50 = 0.02 seconds (20
                milliseconds).
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Peak value</dt>
              <dd className="text-white">
                The maximum voltage reached during a cycle. For a 230 V RMS supply, Vpeak = 230 × √2
                ≈ 325 V. This is why cable insulation is rated well above the nominal supply voltage.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>RMS (root mean square)</dt>
              <dd className="text-white">
                The effective value of AC — the value that produces the same heating effect as an
                equivalent DC voltage. The 230 V quoted for a socket-outlet is the RMS value. Vrms =
                Vpeak ÷ √2.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Three-phase supply</dt>
              <dd className="text-white">
                Commercial and industrial premises are supplied at 400 V line to line and 230 V line
                to neutral, with the three phases 120° apart. You will study three-phase in depth in
                Years 2 and 3.
              </dd>
            </div>
          </dl>
        </div>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Two BS 7671 rules you will meet on your first jobs
        </h3>
        <p>
          The current edition is BS 7671:2018+A4:2026. Two of its requirements shape almost every
          domestic board you will see as an apprentice.
        </p>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>Reg 411.3.4 — 30 mA RCD on domestic luminaire circuits</dt>
              <dd className="text-white">
                Within domestic (household) premises, additional protection by an RCD with a rated
                residual operating current not exceeding 30 mA <strong>shall</strong> be provided for
                AC final circuits supplying luminaires. This is a &ldquo;shall&rdquo; requirement,
                not guidance. It has been in BS 7671 since the 18th Edition was published in 2018.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Reg 421.1.7 — arc fault detection devices (AFDDs)</dt>
              <dd className="text-white">
                Redrafted at Amendment 4. AFDDs conforming to BS EN 62606 <strong>shall</strong> be
                provided for single-phase AC final circuits supplying socket-outlets rated up to 32 A
                in high rise residential buildings (HRRBs), houses in multiple occupation,
                purpose-built student accommodation, and care homes. For all other premises, AFDDs
                are <strong>recommended</strong> on the same circuits. Where used, an AFDD is placed
                at the origin of the circuit it protects. Do not describe AFDDs as simply
                &ldquo;recommended&rdquo; in an exam answer — say where each wording applies.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'basic-tools',
    heading: 'Basic Electrical Tools',
    content: (
      <>
        <p>
          Selecting, using, and maintaining tools safely is assessed in the practical elements of
          your apprenticeship from day one. Your employer and your college will both expect you to
          handle tools confidently and safely.
        </p>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>Screwdrivers</dt>
              <dd className="text-white">
                Flathead for slotted screws, Pozidriv (PZ2 is the most common) for cross-head screws.
                Insulated screwdrivers are rated to 1000 V and are used wherever there is a risk of
                contact with live parts. Never use a damaged or wrongly sized screwdriver — it slips,
                and that causes injury and damage.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Wire strippers</dt>
              <dd className="text-white">
                Used to remove insulation without nicking the conductor. Set them to the correct
                conductor size — a nicked core is a reduced cross-sectional area and a hot joint
                waiting to happen.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Pliers</dt>
              <dd className="text-white">
                Combination pliers for gripping and cutting, long-nose for confined spaces and
                shaping conductors. Use insulated-handle pliers wherever live parts could be present.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Voltage indicator</dt>
              <dd className="text-white">
                A two-pole voltage indicator is what you use to prove a circuit is dead. HSE Guidance
                Note GS38 covers the selection and safe use of test equipment, leads and probes, and
                BS 7671 and GN3 both direct you to it. A non-contact tester alone is never sufficient
                confirmation that a circuit is dead.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Drill and bits</dt>
              <dd className="text-white">
                Cordless drills are standard; SDS for masonry. Always check for concealed cables and
                pipes with a cable and pipe detector before you drill, and wear eye protection.
              </dd>
            </div>
          </dl>
        </div>
      </>
    ),
  },
  {
    id: 'health-and-safety',
    heading: 'Health and Safety Fundamentals',
    content: (
      <>
        <p>
          Health and safety is not a box-ticking exercise — it is a legal duty and a professional
          responsibility. Electrical work can be fatal if procedures are not followed. The
          legislation below is examinable in Year 1 and applies to your work every day.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr>
                <th className={thCn}>Legislation</th>
                <th className={thCn}>What it means for you</th>
              </tr>
            </thead>
            <tbody>
              <tr className={trCn}>
                <td className={tdCn}>Health and Safety at Work etc. Act 1974 (HSWA)</td>
                <td className={tdCn}>
                  The primary UK health and safety legislation. Employers must provide a safe working
                  environment, safe equipment, and adequate training. Employees must take reasonable
                  care for their own safety and that of others, and co-operate with their employer on
                  health and safety matters.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Electricity at Work Regulations 1989 (EAWR)</td>
                <td className={tdCn}>
                  Specific to electrical systems. Regulation 14 (Work on or near live conductors) is
                  the one you will be asked about: work on or near a live conductor is only permitted
                  where it is unreasonable for it to be dead, it is reasonable to work on or near it
                  live, and suitable precautions are taken. Regulation 16 requires persons to be
                  competent to prevent danger and injury. HSE publication HSR25 is the guidance on
                  these Regulations.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>Manual Handling Operations Regulations 1992</td>
                <td className={tdCn}>
                  Employers must avoid manual handling where they reasonably can and, where they
                  cannot, assess and reduce the risk. Electricians regularly move cable drums,
                  consumer units and conduit that cause musculoskeletal injury if handled badly.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>PPE at Work Regulations 1992</td>
                <td className={tdCn}>
                  Employers must provide suitable PPE free of charge; employees must use it correctly
                  and report defects. Typical electrical PPE: safety footwear, hi-vis, hard hat on
                  construction sites, safety glasses, insulated gloves, and hearing protection with
                  power tools.
                </td>
              </tr>
              <tr className={trCn}>
                <td className={tdCn}>
                  Construction (Design and Management) Regulations 2015 (CDM)
                </td>
                <td className={tdCn}>
                  Applies on construction sites. Among other duties, it is why a means of safe
                  isolation must be designed in for future maintenance — the On-Site Guide treats
                  failing to provide one as a potential CDM breach.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-6 text-[15px] font-semibold tracking-tight text-white">
          Safe isolation: the sequence
        </h3>
        <p>
          Safe isolation is the most important procedure you will learn all year. The sequence is:
          identify the circuit; switch off; lock off and retain the key; attach a warning notice;
          then test for dead with a proved voltage indicator. Prove the indicator on a known live
          source or a proving unit both <em>before</em> and <em>after</em> you test — that is the
          prove&ndash;test&ndash;prove method.
        </p>
        <p>
          Guidance Note 3 requires an installation to be made dead and safely isolated wherever a
          test does not need it live, and refers you to HSE Guidance Note GS38 for the test equipment
          itself. The IET On-Site Guide sets out the practical steps and proof-of-dead procedure in
          Appendix M, Safe working practices. A non-contact tester is never your primary
          confirmation — always use a two-pole voltage indicator.
        </p>
      </>
    ),
  },
  {
    id: 'pat-testing-intro',
    heading: 'Introduction to PAT Testing',
    content: (
      <>
        <p>
          Portable Appliance Testing (PAT) is the inspection and testing of in-service electrical
          equipment to confirm it is safe to use. Apprentices are not usually expected to carry it
          out independently in Year 1, but the principles are on the syllabus and they introduce the
          inspection and testing habits that become central to your work later on.
        </p>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>1. Visual inspection</dt>
              <dd className="text-white">
                Always the first step. Check for damaged cables, cracked plugs, signs of overheating,
                the wrong fuse rating, and evidence of misuse. Most faults are found here, before any
                instrument comes out of the bag.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>2. Earth continuity test</dt>
              <dd className="text-white">
                Confirms the protective conductor in a Class I appliance is connected and has a low
                resistance — typically taken as 0.1 Ω plus the resistance of the supply lead. Carried
                out with a PAT tester or a low-resistance ohmmeter.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>3. Insulation resistance test</dt>
              <dd className="text-white">
                Applies 500 V DC between the live conductors and earth. For Class I appliances the
                reading should be at least 1 MΩ. It confirms the insulation has not broken down.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>4. Record keeping</dt>
              <dd className="text-white">
                Every test is recorded: appliance description, asset number, results, pass or fail,
                date, and the name of the person testing. The records are the audit trail that shows
                a system of inspection and testing is actually in place.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          These acceptance values are not set by BS 7671 — Part 6 of BS 7671 covers the verification
          of installations, not in-service equipment. In-service inspection and testing is covered by
          the IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment,
          which is also the syllabus behind the City &amp; Guilds 2377 award. Most apprentices take
          2377 later in their training or shortly after qualifying.
        </p>
      </>
    ),
  },
  {
    id: 'study-tools',
    heading: 'Elec-Mate Study Tools for Year 1 Apprentices',
    content: (
      <>
        <p>
          Elec-Mate is built by electricians, for electricians and apprentices. The Study Centre
          holds the tools designed to get you through Year 1 theory and build the practical knowledge
          you need for your end-point assessment.
        </p>
        <div className={cardCn}>
          <dl className={defListCn}>
            <div className={defRowCn}>
              <dt className={defTermCn}>Flashcard revision system</dt>
              <dd className="text-white">
                Drill Ohm&rsquo;s Law, electrical units, circuit theory, and health and safety
                legislation. Spaced repetition brings each card back at the point you are about to
                forget it, which is where the revision actually sticks.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>AI tutor</dt>
              <dd className="text-white">
                Ask any Year 1 theory question and get a step-by-step explanation — worked
                calculations, and plain-English answers on the topics that take longest to click,
                like AC waveforms and circuit analysis.
              </dd>
            </div>
            <div className={defRowCn}>
              <dt className={defTermCn}>Mock exams and course modules</dt>
              <dd className="text-white">
                Module-by-module content and timed mock papers, so you find the gaps before the exam
                does.
              </dd>
            </div>
          </dl>
        </div>
        <SEOAppBridge
          title="Start revising for Year 1 with Elec-Mate"
          description="Flashcards, AI tutor, mock exams, and course modules for electrical apprentices. Built for mobile — revise on your commute, on your break, or at home."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeFirstYearRevisionPage() {
  return (
    <GuideTemplate
      title="Electrical Apprentice Year 1 Revision Guide"
      description="Complete Year 1 electrical apprentice revision guide. Ohm's Law, electrical units (V, A, Ω, W), basic circuit theory, series and parallel circuits."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Study Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Electrical Apprentice Year 1 Revision:{' '}
          <span className="text-elec-yellow">First Year Study Guide</span>
        </>
      }
      heroSubtitle="Everything you need to revise for Year 1 of your electrical apprenticeship — electrical units, Ohm's Law, series and parallel circuits, DC and AC fundamentals, basic tools, health and safety legislation, and an introduction to PAT testing."
      readingTime={12}
      answerBox={{
        question: 'What do you study in Year 1 of an electrical apprenticeship?',
        answer:
          "Year 1 covers the electrical units (volt, ampere, ohm, watt), Ohm's Law and how to transpose it, series and parallel circuits, DC and AC fundamentals at 230 V / 50 Hz, safe use of hand tools, health and safety law, and an introduction to inspection, testing and PAT.",
        detail:
          'Every regulation on this page is referenced against BS 7671:2018+A4:2026, the current edition of the Wiring Regulations.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Year 1 Electrical Apprenticeship"
      embeddedTool={<MockExamIndexLinks heading="Practise with a free mock exam" />}
      relatedPages={relatedPages}
      ctaHeading="Revise Smarter with Elec-Mate"
      ctaSubheading="Flashcards, AI tutor, mock exams, and module-by-module course content built for electrical apprentices. Study on your phone, pass your exams. 7-day free trial."
    />
  );
}
