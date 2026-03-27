import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BookOpen,
  Zap,
  Calculator,
  ShieldCheck,
  Wrench,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'Apprentice Revision', href: '/apprentice-first-year-revision' },
];

const tocItems = [
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
  'AC (alternating current) in the UK runs at 230V / 50Hz — frequency and voltage values appear in every exam.',
  'Health and safety legislation you must know in Year 1: Health and Safety at Work Act 1974, Electricity at Work Regulations 1989, and Manual Handling Operations Regulations 1992.',
];

const faqs = [
  {
    question: "What topics are covered in Year 1 of an electrical apprenticeship?",
    answer:
      "Year 1 of a Level 3 Electrical Installation apprenticeship covers fundamental electrical theory including electrical units (volts, amps, ohms, watts), Ohm's Law, Kirchhoff's Laws, series and parallel circuits, DC and AC fundamentals, basic tools and their safe use, health and safety legislation (Health and Safety at Work Act 1974, Electricity at Work Regulations 1989), PAT testing introduction, and basic wiring principles. You will also begin working towards your Level 3 Award in the Requirements for Electrical Installations (BS 7671).",
  },
  {
    question: "How do I revise Ohm's Law effectively?",
    answer:
      "Use the Ohm's Law triangle (V at the top, I and R at the bottom). Cover the unknown and the remaining symbols show you the formula: cover V → V = I × R; cover I → I = V / R; cover R → R = V / I. Practice transposing the formula with worked examples until it becomes automatic. The Elec-Mate flashcard system lets you drill Ohm's Law calculations with randomly generated values so you practise the maths, not just the formula.",
  },
  {
    question: "What is the difference between series and parallel circuits?",
    answer:
      "In a series circuit, components are connected end-to-end so the same current flows through every component. The total resistance is the sum of all individual resistances (Rt = R1 + R2 + R3). Voltage is shared between components proportional to their resistance. In a parallel circuit, each component has its own separate path connected between the same two points. The voltage across each branch is identical, but current divides between branches. Total resistance in a parallel circuit is always less than the smallest individual resistance.",
  },
  {
    question: "What is the UK mains supply voltage and frequency?",
    answer:
      "The UK nominal supply voltage is 230V AC at 50Hz (hertz). The voltage tolerance is +10% / -6%, meaning acceptable voltages range from approximately 216V to 253V. The frequency tolerance is ±1%, so 49.5Hz to 50.5Hz. These values are set by the Electricity Supply (Amendment) Regulations 1994 and align with European harmonised voltages. You must know both values — they appear frequently in theory exams and practical assessments throughout your apprenticeship.",
  },
  {
    question: "What health and safety legislation must I know in Year 1?",
    answer:
      "The key legislation for Year 1 includes: Health and Safety at Work etc. Act 1974 (HSWA) — the primary legislation placing duties on employers and employees; Electricity at Work Regulations 1989 — specific to electrical systems, requires all electrical work to be carried out in a safe manner; Manual Handling Operations Regulations 1992 — risk assessment for lifting and moving loads; Personal Protective Equipment at Work Regulations 1992 — employer duty to provide PPE; and Control of Substances Hazardous to Health Regulations 2002 (COSHH). In construction, you will also encounter the Construction (Design and Management) Regulations 2015 (CDM).",
  },
  {
    question: "What tools should a first-year apprentice know?",
    answer:
      "First-year apprentices should be able to identify, name, and use correctly: screwdrivers (flathead, Pozidriv, insulated), wire strippers, cable cutters, pliers (combination, long-nose), hammer, chisel, cold chisel, spirit level, tape measure, bradawl, cordless drill, and voltage indicator. You must also understand when and how to use PPE including insulated gloves, safety glasses, hard hat, steel-toecap boots, and hi-vis vest. Never use a tool you have not been trained on — always ask your supervisor.",
  },
  {
    question: "What is PAT testing and do apprentices do it?",
    answer:
      "PAT stands for Portable Appliance Testing — the process of inspecting and testing portable electrical equipment to check it is safe to use. Apprentices are introduced to PAT testing in Year 1 as it demonstrates fundamental principles: visual inspection, earth continuity testing, insulation resistance testing, and record keeping. Formal PAT testing certification (City & Guilds 2377) is usually completed later in the apprenticeship or after qualification, but understanding the principles from Year 1 helps build inspection and testing skills that are central to the AM2 assessment and EICR work.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/apprentice-maths-electrician',
    title: 'Maths for Electrical Apprentices',
    description: 'Essential electrical calculations with worked examples — Ohm\'s Law, power triangle, voltage drop.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/apprentice-endpoint-assessment',
    title: 'End-Point Assessment (EPA) Guide',
    description: 'What the EPA involves, how to prepare, grading, and what happens if you need to re-sit.',
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
    href: '/city-guilds-level-3-guide',
    title: 'City & Guilds Level 3 Guide',
    description: 'Everything you need to know about the City & Guilds 2365 Level 3 Electrical Installation qualification.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description: 'Flashcards, AI tutor, mock exams, and course modules built for electrical apprentices.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
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
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Volt (V)</strong> — the unit of electromotive force (EMF) or potential
                difference (PD). Think of voltage as the electrical pressure that drives current
                around a circuit. Symbol: V. Named after Alessandro Volta.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ampere (A)</strong> — the unit of electric current. Current is the rate of
                flow of electric charge. One ampere equals one coulomb of charge passing a point
                per second. Symbol: A or I (for intensity). Named after André-Marie Ampère.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ohm (Ω)</strong> — the unit of electrical resistance. Resistance is the
                opposition to the flow of current. Symbol: Ω (omega) or R. Named after Georg Simon
                Ohm. One ohm is the resistance that allows one ampere to flow when one volt is
                applied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Watt (W)</strong> — the unit of electrical power. Power is the rate at
                which energy is transferred or converted. Symbol: W or P. Named after James Watt.
                P = V × I (power equals voltage multiplied by current).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coulomb (C)</strong> — the unit of electric charge. One coulomb is the
                charge transported by one ampere in one second. Q = I × t (charge equals current
                multiplied by time).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Farad (F)</strong> — the unit of electrical capacitance. Capacitance is
                the ability to store electrical charge. In practice, capacitors are measured in
                microfarads (μF) or picofarads (pF) as one farad is very large. Named after
                Michael Faraday.
              </span>
            </li>
          </ul>
        </div>
        <p>
          You also need to understand SI prefixes for when values are very large or very small.
          The key prefixes in electrical work are: kilo (k) = 1,000; mega (M) = 1,000,000; milli
          (m) = 0.001; micro (μ) = 0.000001. So 2.5kΩ means 2,500 ohms, and 100mA means 0.1
          amperes.
        </p>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: "Ohm's Law",
    content: (
      <>
        <p>
          Ohm's Law is the single most important relationship in electrical theory. Stated by Georg
          Simon Ohm in 1827, it defines the relationship between voltage, current, and resistance
          in a conductor at constant temperature.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The formula:</strong> V = I × R — Voltage (volts) equals Current (amperes)
                multiplied by Resistance (ohms).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transposed for current:</strong> I = V ÷ R — if you know the voltage and
                resistance, divide voltage by resistance to find current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transposed for resistance:</strong> R = V ÷ I — if you know the voltage
                and current, divide voltage by current to find resistance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          <strong>Worked example:</strong> A 12V battery supplies a lamp with a resistance of 6Ω.
          What current flows? I = V ÷ R = 12 ÷ 6 = 2A. The Ohm's Law triangle is a memory aid:
          draw a triangle with V at the top, I bottom-left, R bottom-right. Cover the unknown
          quantity and the visible symbols show you the calculation.
        </p>
        <p>
          Use the{' '}
          <SEOInternalLink href="/study-centre">
            Elec-Mate Study Centre
          </SEOInternalLink>{' '}
          flashcard system to drill Ohm's Law calculations with randomly generated values until
          the transposition is second nature.
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
          Every electrical circuit has the same basic components: a source of EMF (battery or
          supply), conductors (wires) to carry current, a load (device that uses the energy), and
          a return path. Kirchhoff's Laws describe how voltage and current behave in circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kirchhoff's Current Law (KCL)</strong> — the total current entering a
                junction equals the total current leaving it. No current is lost at a junction.
                This is a statement of conservation of charge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kirchhoff's Voltage Law (KVL)</strong> — the sum of all voltages around a
                closed loop equals zero. In practice: the supply voltage equals the sum of all
                voltage drops across the resistances in the loop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Series circuits</strong> — total resistance Rt = R1 + R2 + R3. Current is
                the same throughout. Voltage divides proportionally to resistance (voltage divider).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Parallel circuits</strong> — voltage is the same across every branch.
                Current divides between branches. For two resistors: 1/Rt = 1/R1 + 1/R2. Total
                resistance is always less than the smallest individual resistance.
              </span>
            </li>
          </ul>
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
          Direct current (DC) flows in one direction only. Batteries, solar panels, and USB
          chargers all produce DC. Understanding DC circuits is the foundation before moving on to
          AC, which is more complex due to the effects of inductance and capacitance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resistors in series:</strong> Rt = R1 + R2 + R3. Example: 10Ω + 15Ω +
                25Ω = 50Ω total.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Resistors in parallel (two):</strong> Rt = (R1 × R2) ÷ (R1 + R2). Example:
                6Ω and 12Ω in parallel = (6 × 12) ÷ (6 + 12) = 72 ÷ 18 = 4Ω.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power in DC circuits:</strong> P = V × I, P = I² × R, P = V² ÷ R. All
                three are equivalent — use whichever suits the values you have been given.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy:</strong> W = P × t (energy in joules equals power in watts
                multiplied by time in seconds). For kilowatt-hours: kWh = kW × hours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Practise these calculations using the{' '}
          <SEOInternalLink href="/study-centre/apprentice">
            apprentice module calculator tools
          </SEOInternalLink>{' '}
          in the Elec-Mate Study Centre. Working through multiple examples is far more effective
          than re-reading your notes.
        </p>
      </>
    ),
  },
  {
    id: 'ac-fundamentals',
    heading: 'AC Fundamentals',
    content: (
      <>
        <p>
          Alternating current (AC) repeatedly reverses direction. The UK mains supply is 230V at
          50Hz — this is what you work with in almost every domestic and commercial installation.
          AC introduces concepts of frequency, period, peak values, and RMS values.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency (f)</strong> — the number of complete cycles per second,
                measured in hertz (Hz). UK mains: 50Hz. USA mains: 60Hz.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Period (T)</strong> — the time for one complete cycle. T = 1 ÷ f. At 50Hz:
                T = 1 ÷ 50 = 0.02 seconds (20 milliseconds).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Peak value</strong> — the maximum voltage reached during a cycle. For UK
                mains (230V RMS): Vpeak = 230 × √2 ≈ 325V. This is why cable insulation must
                be rated for higher than the nominal supply voltage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RMS (Root Mean Square)</strong> — the effective value of AC that produces
                the same heating effect as an equivalent DC voltage. The 230V on the nameplate of
                your socket outlet is the RMS value. Vrms = Vpeak ÷ √2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase supply</strong> — commercial and industrial premises are
                supplied with three-phase 400V AC (line-to-line) / 230V (line-to-neutral). The
                three phases are 120° apart. You will study three-phase in depth in Years 2 and 3.
              </span>
            </li>
          </ul>
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
          Knowing how to select, use, and maintain tools safely is tested in the practical elements
          of your apprenticeship from Day 1. Your employer and college will both expect you to
          handle tools confidently and safely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Screwdrivers</strong> — flathead for slotted screws, Pozidriv (PZ2 is most
                common) for cross-head screws. Insulated screwdrivers are rated to 1000V and
                required for live working. Never use a damaged or incorrect screwdriver as it can
                slip and cause injury or damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wire strippers</strong> — used to remove cable insulation without nicking
                the conductor. Set to the correct cable diameter to avoid damaging cores. Quality
                wire strippers have adjustable stops for different cable sizes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pliers</strong> — combination pliers for gripping and cutting, long-nose
                (needle-nose) for accessing confined spaces and shaping wire. Always use
                insulated-handle pliers when working near live conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage indicator</strong> — a non-contact or two-pole voltage tester used
                to confirm a circuit is dead before working on it. Under the Electricity at Work
                Regulations 1989 and GS38, two-pole voltage testers are the industry standard for
                safe isolation. A non-contact tester alone is not sufficient confirmation that a
                circuit is dead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Drill and bits</strong> — cordless drills are standard. SDS drills for
                masonry. Always check for hidden cables and pipes before drilling using a cable
                and pipe detector. Follow safe drilling procedures and wear eye protection.
              </span>
            </li>
          </ul>
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
          Health and safety is not just a box-ticking exercise — it is a legal requirement and a
          professional responsibility. Electrical work can be fatal if safety procedures are not
          followed. The following legislation is examinable in Year 1 and applies to your work
          every day.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work etc. Act 1974</strong> — the primary UK health
                and safety legislation. Places a duty on employers to provide a safe working
                environment, safe equipment, and adequate training. Employees must take reasonable
                care for their own safety and the safety of others, and must co-operate with their
                employer on health and safety matters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — specific to electrical
                systems. Regulation 4 requires that electrical systems be constructed and maintained
                to prevent danger. Regulation 14 prohibits working on or near live conductors
                unless it is unreasonable to work dead, adequate precautions are taken, and it is
                reasonable to work live. Safe isolation is mandatory before working on any circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manual Handling Operations Regulations 1992</strong> — requires employers
                to avoid manual handling where possible and, where not, to assess and reduce the
                risk. Electricians regularly handle cable drums, consumer units, and conduit that
                can cause musculoskeletal injury if handled incorrectly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPE at Work Regulations 1992</strong> — employers must provide suitable
                PPE free of charge. Employees must use PPE correctly and report defects. Basic
                electrical PPE includes: safety footwear (steel toecap, anti-static), hi-vis vest,
                hard hat (on construction sites), safety glasses, insulated gloves, and hearing
                protection when using power tools.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Safe isolation is one of the most critical procedures you will learn. The sequence is:
          identify the circuit, switch off, lock off (lock the isolator and retain the key),
          attach a warning notice, test for dead using a proved voltage tester. Prove the tester
          works on a known live source before and after testing for dead.
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
          Portable Appliance Testing (PAT) is the process of inspecting and testing portable
          electrical equipment to ensure it is safe to use. While apprentices are not usually
          expected to carry out formal PAT testing independently in Year 1, understanding the
          principles is part of the syllabus and introduces key concepts in inspection and testing
          that become central to your work in later years.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — always the first step. Check for damaged
                cables, cracked plugs, signs of overheating, incorrect fuse rating, and evidence of
                misuse. Many faults are found by visual inspection alone, before any electrical
                testing is carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity test</strong> — checks that the earth conductor in the
                appliance is connected and has a low resistance. Typically less than 0.1Ω plus the
                resistance of the supply lead. Carried out using a PAT tester or a low-resistance
                ohmmeter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance test</strong> — applies 500V DC between live
                conductors and earth. For Class I appliances, the insulation resistance should be
                at least 1MΩ (megohm). Confirms that the insulation has not broken down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record keeping</strong> — every PAT test must be recorded with the
                appliance description, asset number, test results, pass or fail outcome, date, and
                tester's name. Records demonstrate that a system of inspection and testing is in
                place and form the audit trail for workplace safety compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The City & Guilds 2377 Award in the In-Service Inspection and Testing of Electrical
          Equipment is the recognised PAT testing qualification. Most apprentices complete this
          during their training or in the early years after qualification.
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
          Elec-Mate has been built by electricians for electricians and apprentices. The Study
          Centre contains tools specifically designed to help you pass Year 1 theory and build the
          practical knowledge you need for your end-point assessment.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Flashcard Revision System</h4>
                <p className="text-white text-sm leading-relaxed">
                  Drill Ohm's Law, electrical units, circuit theory, and health and safety
                  legislation with the{' '}
                  <SEOInternalLink href="/study-centre">
                    Elec-Mate flashcard system
                  </SEOInternalLink>
                  . Spaced repetition ensures you review cards at the optimal time before your
                  exam.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Tutor</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask the{' '}
                  <SEOInternalLink href="/study-centre">
                    Elec-Mate AI tutor
                  </SEOInternalLink>{' '}
                  any question about Year 1 theory. Get step-by-step explanations of calculations,
                  worked examples, and plain-English explanations of complex topics like AC
                  waveforms and circuit analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start revising for Year 1 with Elec-Mate"
          description="Flashcards, AI tutor, mock exams, and course modules for electrical apprentices. Built for mobile — revise on your commute, on your break, or at home. 7-day free trial."
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
      title="Electrical Apprentice Year 1 Revision | First Year Study Guide"
      description="Complete Year 1 electrical apprentice revision guide. Ohm's Law, electrical units (V, A, Ω, W), basic circuit theory, series and parallel circuits, DC and AC fundamentals, basic tools, health and safety legislation, and PAT testing introduction."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Study Guide"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Electrical Apprentice Year 1 Revision:{' '}
          <span className="text-yellow-400">First Year Study Guide</span>
        </>
      }
      heroSubtitle="Everything you need to revise for Year 1 of your electrical apprenticeship — electrical units, Ohm's Law, series and parallel circuits, DC and AC fundamentals, basic tools, health and safety legislation, and an introduction to PAT testing."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Year 1 Electrical Apprenticeship"
      relatedPages={relatedPages}
      ctaHeading="Revise Smarter with Elec-Mate"
      ctaSubheading="Flashcards, AI tutor, mock exams, and module-by-module course content built for electrical apprentices. Study on your phone, pass your exams. 7-day free trial."
    />
  );
}
