import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Atom,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Zap,
  Calculator,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Electrical Science Fundamentals | Theory Course';
const PAGE_DESCRIPTION =
  "Comprehensive electrical science theory course for UK electricians and apprentices. Ohm's law, Kirchhoff's laws, magnetism, transformers, AC theory, power factor, impedance, and three-phase systems. 12 modules with video content, interactive quizzes, and AI tutor.";

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Electrical Science Fundamentals', href: '/training/electrical-science-fundamentals' },
];

const tocItems = [
  { id: 'why-electrical-science', label: 'Why Electrical Science Matters' },
  { id: 'ohms-law', label: "Ohm's Law and Basic Circuits" },
  { id: 'kirchhoffs-laws', label: "Kirchhoff's Laws" },
  { id: 'magnetism-transformers', label: 'Magnetism and Transformers' },
  { id: 'ac-theory', label: 'AC Theory and Waveforms' },
  { id: 'power-factor', label: 'Power Factor and Power Triangle' },
  { id: 'three-phase', label: 'Three-Phase Systems' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Ohm's law (V = I x R) is the foundation of all electrical calculations — understanding how voltage, current, and resistance relate to each other is essential for cable sizing, fault current calculations, and circuit design.",
  "Kirchhoff's current law (KCL) states that the total current entering a junction equals the total current leaving it, while Kirchhoff's voltage law (KVL) states that the sum of all voltages around a closed loop equals zero — these laws enable analysis of complex circuits with multiple sources and loads.",
  'Electromagnetic induction is the principle behind transformers, generators, motors, and RCDs — understanding how a changing magnetic field induces a voltage in a conductor explains how much of electrical equipment actually works.',
  'AC theory introduces concepts that do not exist in DC circuits: frequency, reactance, impedance, phase angle, and power factor. These are essential for understanding why AC circuits behave differently from DC and how to calculate real, reactive, and apparent power.',
  'Power factor correction is a practical concern for commercial and industrial electricians — a low power factor means the supply must deliver more current than necessary to provide the required real power, increasing losses and potentially incurring charges from the electricity supplier.',
];

const faqs = [
  {
    question: 'Do I need to understand electrical science theory to be a good electrician?',
    answer:
      'Yes. While many day-to-day electrical tasks can be performed by following established procedures and regulations, understanding the underlying science is what separates a competent electrician from a truly skilled one. Electrical science theory enables you to understand why BS 7671 requires specific cable sizes, protection device ratings, and earthing arrangements — not just what is required but why. It is essential for fault diagnosis (understanding why a circuit behaves unexpectedly), for design work (calculating voltage drop, prospective fault current, and earth fault loop impedance), and for passing technical examinations including the City & Guilds 2365, 2357, and the AM2 practical assessment.',
  },
  {
    question: 'Is this course suitable for complete beginners with no electrical background?',
    answer:
      "Yes, this course starts from first principles and assumes no prior knowledge of electrical science. It begins with basic concepts — what is electricity, what is an atom, what is charge, what is current — and builds progressively through Ohm's law, series and parallel circuits, Kirchhoff's laws, magnetism, AC theory, and power factor. Each concept is explained with practical examples relevant to real electrical installation work. The AI tutor is available to answer any questions you have and can explain concepts in different ways until they make sense. The course is designed for Level 2 and Level 3 apprentices but is equally valuable for anyone looking to strengthen their understanding of electrical fundamentals.",
  },
  {
    question: 'How does this course relate to the City & Guilds 2365 and 2357?',
    answer:
      "The electrical science content in this course directly maps to the science units in the City & Guilds 2365 (Electrical Installation) and 2357 (Electrotechnical) qualifications. Unit 202 (Principles of Electrical Science) in the 2365 Level 2 and Unit 302 (Principles of Electrical Science) in the 2365 Level 3 cover exactly the topics taught in this course — Ohm's law, Kirchhoff's laws, magnetism, electromagnetic induction, AC theory, impedance, power factor, and three-phase systems. The course can be used as supplementary study alongside your college course or as a standalone revision resource for exam preparation.",
  },
  {
    question: 'Will this course help me with BS 7671 calculations?',
    answer:
      "Absolutely. BS 7671 calculations — cable sizing, voltage drop, prospective fault current, earth fault loop impedance, and disconnection times — all rely on the fundamental principles taught in this course. Understanding Ohm's law is essential for impedance and fault current calculations. Understanding power factor is necessary for maximum demand calculations and diversity. Understanding three-phase theory is required for three-phase circuit design and calculations. This course provides the mathematical and scientific foundation that makes BS 7671 Appendix 4 calculations understandable rather than mysterious formulas to be applied blindly.",
  },
  {
    question: 'How much mathematics do I need for this course?',
    answer:
      "The course requires basic mathematics — addition, subtraction, multiplication, division, fractions, percentages, and an understanding of how to use a scientific calculator. For AC theory and power factor, you will use some trigonometry (sine, cosine, tangent) and Pythagoras' theorem, but these are taught within the course with clear step-by-step worked examples. You do not need advanced mathematics or algebra. The emphasis is on practical application — being able to calculate voltage drop across a cable, fault current at a distribution board, or power factor for a motor installation. The Elec-Mate AI tutor can walk you through any calculation step by step if you get stuck.",
  },
  {
    question: 'Does this course cover three-phase power systems?',
    answer:
      'Yes, the final modules of the course cover three-phase systems in detail. You will learn the difference between star and delta connections, how to calculate line and phase voltages and currents, three-phase power calculations (using the square root of 3 factor), balanced and unbalanced loads, neutral current in unbalanced systems, and practical applications including three-phase motor connections and three-phase distribution board design. Three-phase theory is essential for any electrician working on commercial or industrial installations, and it is a significant component of the Level 3 electrical science examinations.',
  },
];

const modules = [
  {
    title: 'Atoms, Charge, and Electrical Current',
    description:
      'Atomic structure, electron flow, conventional current, electric charge (coulombs), current (amperes), potential difference (volts), resistance (ohms), and the water analogy for understanding circuit behaviour.',
  },
  {
    title: "Ohm's Law and Basic Circuit Calculations",
    description:
      "Ohm's law (V = IR), power formula (P = IV), energy calculations, the relationship between voltage, current, resistance, and power. Practical worked examples using real cable and load values.",
  },
  {
    title: 'Series and Parallel Circuits',
    description:
      'Resistors in series (total resistance is the sum), resistors in parallel (reciprocal formula), voltage divider circuits, current divider circuits, and practical applications in electrical installations.',
  },
  {
    title: "Kirchhoff's Current and Voltage Laws",
    description:
      "Kirchhoff's current law (junction rule), Kirchhoff's voltage law (loop rule), applying both laws to analyse circuits with multiple sources and branches, and the superposition theorem.",
  },
  {
    title: 'Capacitance and Capacitors',
    description:
      'What capacitance is, how capacitors store charge, series and parallel capacitor combinations, time constants, capacitor applications in power factor correction and motor starting, and energy stored in a capacitor.',
  },
  {
    title: 'Magnetism and Electromagnetic Induction',
    description:
      "Permanent magnets and electromagnets, magnetic flux and flux density, the motor effect (F = BIL), electromagnetic induction (Faraday's law), Lenz's law, and self-inductance.",
  },
  {
    title: 'Transformers',
    description:
      'Transformer operating principles, turns ratio, voltage and current transformation, transformer losses (copper and iron), transformer efficiency, and practical applications from distribution transformers to bell transformers.',
  },
  {
    title: 'AC Waveforms and RMS Values',
    description:
      'Sinusoidal waveforms, peak value, RMS (root mean square) value, average value, frequency, period, angular velocity, and why AC measurements use RMS values.',
  },
  {
    title: 'Reactance and Impedance',
    description:
      'Inductive reactance (XL = 2 pi fL), capacitive reactance (XC = 1 / 2 pi fC), impedance in RL, RC, and RLC circuits, phasor diagrams, and impedance triangle calculations.',
  },
  {
    title: 'Power Factor and the Power Triangle',
    description:
      'Real power (watts), reactive power (VAr), apparent power (VA), power factor (cos phi), the power triangle, power factor correction using capacitors, and electricity supply tariff implications.',
  },
  {
    title: 'Three-Phase Systems',
    description:
      'Three-phase generation, star and delta connections, line and phase voltages and currents, three-phase power calculations, balanced and unbalanced loads, and neutral current in four-wire systems.',
  },
  {
    title: 'Practical Applications and BS 7671 Calculations',
    description:
      'Applying electrical science to BS 7671: cable sizing calculations, voltage drop, earth fault loop impedance (Zs), prospective fault current (Ipf), maximum demand, and diversity calculations.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      "Ask any electrical science question in plain English. Get clear, step-by-step explanations of Ohm's law calculations, AC theory, power factor, and three-phase systems with worked examples.",
  },
  {
    icon: Zap,
    title: 'Video Content',
    description:
      'Animated video explanations of circuit behaviour, phasor diagrams, transformer operation, three-phase waveforms, and power triangle calculations — concepts that are difficult to understand from text alone.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your understanding after every module with calculation-based questions, circuit analysis problems, and scenario-based applications of electrical science principles.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Track daily progress and stay on course through all 12 modules.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      "Spaced repetition flashcards covering key formulas, unit conversions, Kirchhoff's laws, transformer equations, AC relationships, and power factor calculations.",
  },
  {
    icon: FileCheck2,
    title: 'Mock Exams',
    description:
      'Full-length mock examinations mirroring City & Guilds electrical science exam format. Instant marking with detailed worked solutions for every calculation.',
  },
];

const sections = [
  {
    id: 'why-electrical-science',
    heading: 'Why Electrical Science Matters for Electricians',
    content: (
      <>
        <p>
          Electrical science is the theoretical foundation that underpins everything an electrician
          does. Every cable size, every protective device rating, every earthing arrangement in{' '}
          <SEOInternalLink href="/guides/bs-7671-eighteenth-edition">BS 7671</SEOInternalLink>{' '}
          exists because of the principles taught in this course. Understanding the science behind
          the regulations transforms you from someone who follows rules to someone who understands
          why those rules exist.
        </p>
        <p>
          For apprentices, electrical science is a core component of the Level 2 and Level 3
          qualifications (City & Guilds 2365 Units 202 and 302, or the equivalent units in EAL and
          other awarding bodies). Many apprentices find electrical science the most challenging part
          of their qualification — this course breaks down complex concepts into manageable,
          practical explanations with real-world examples from electrical installation work.
        </p>
        <p>
          For qualified electricians, a strong understanding of electrical science enables confident{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">circuit design</SEOInternalLink>,
          accurate fault diagnosis, and the ability to explain technical concepts to clients and
          colleagues. It is also essential for passing the{' '}
          <SEOInternalLink href="/training/city-guilds-2391">
            inspection and testing
          </SEOInternalLink>{' '}
          examination (2391/2394/2395) where electrical science questions feature prominently.
        </p>
      </>
    ),
  },
  {
    id: 'ohms-law',
    heading: "Ohm's Law and Basic Circuit Calculations",
    content: (
      <>
        <p>
          Ohm's law states that the current flowing through a conductor is directly proportional to
          the potential difference across it and inversely proportional to its resistance, provided
          the temperature remains constant. Expressed as a formula: V = I x R, where V is voltage in
          volts, I is current in amperes, and R is resistance in ohms.
        </p>
        <p>
          This single relationship enables a vast range of practical calculations. Knowing the
          voltage and resistance of a circuit, you can calculate the current that will flow. Knowing
          the current flowing and the cable resistance per metre, you can calculate the voltage drop
          across a cable run. Combined with the power formula (P = I x V), you can determine the
          power consumed by a load, the current drawn from a supply, or the resistance that produces
          a specific power output.
        </p>
        <p>
          Practical applications for electricians include: calculating the current drawn by a known
          load to select the correct cable size and protective device rating, determining voltage
          drop across a cable run for{' '}
          <SEOInternalLink href="/guides/voltage-drop-bs7671">BS 7671 compliance</SEOInternalLink>,
          and calculating the resistance of an earth fault path to verify disconnection times. Every
          one of these everyday calculations starts with Ohm's law.
        </p>
        <SEOAppBridge
          title="Practice Ohm's law with interactive calculators"
          description="Work through guided calculation exercises using real cable data and load values. The Elec-Mate AI tutor checks your working and explains each step, helping you build confidence in electrical calculations."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'kirchhoffs-laws',
    heading: "Kirchhoff's Laws",
    content: (
      <>
        <p>
          While Ohm's law handles simple circuits with a single source and load, real electrical
          installations involve complex networks with multiple branches, junctions, and sometimes
          multiple sources. Kirchhoff's laws provide the tools to analyse these more complex
          circuits.
        </p>
        <p>
          <strong>Kirchhoff's Current Law (KCL)</strong>, also called the junction rule, states that
          the total current entering any junction in a circuit equals the total current leaving that
          junction. In practical terms, if a 30A feed splits into three branches, the sum of the
          branch currents must equal 30A. This law is used when calculating how current distributes
          between parallel loads connected to a distribution board.
        </p>
        <p>
          <strong>Kirchhoff's Voltage Law (KVL)</strong>, also called the loop rule, states that the
          sum of all voltages around any closed loop in a circuit equals zero. In practical terms,
          this means the supply voltage equals the sum of all the voltage drops around the circuit.
          This is the principle behind the{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculation
          </SEOInternalLink>{' '}
          in BS 7671 — the voltage available at the load equals the supply voltage minus the voltage
          dropped across the cable and connections.
        </p>
        <p>
          Together, KCL and KVL enable analysis of any circuit, no matter how complex. The course
          teaches you to apply both laws systematically to solve circuit problems that Ohm's law
          alone cannot handle, building the analytical skills needed for design calculations and
          fault diagnosis.
        </p>
      </>
    ),
  },
  {
    id: 'magnetism-transformers',
    heading: 'Magnetism and Transformers',
    content: (
      <>
        <p>
          Electromagnetism is the link between electricity and magnetism, and it explains how
          motors, generators, transformers, relays, contactors, and RCDs work. When current flows
          through a conductor, it creates a magnetic field around that conductor. When a conductor
          moves through a magnetic field, a voltage is induced in the conductor. These two
          reciprocal effects are the foundation of all rotating electrical machines and
          transformers.
        </p>
        <p>
          <strong>Faraday's law of electromagnetic induction</strong> states that a changing
          magnetic flux through a coil induces an electromotive force (EMF) in the coil proportional
          to the rate of change of flux. This is how a transformer works — AC current in the primary
          winding creates a changing magnetic flux in the iron core, which induces a voltage in the
          secondary winding. The turns ratio (number of primary turns divided by number of secondary
          turns) determines the voltage transformation ratio.
        </p>
        <p>
          Transformers are everywhere in electrical installations: distribution transformers (11kV
          to 400V), isolating transformers for{' '}
          <SEOInternalLink href="/training/bathroom-regulations">
            bathroom shaver sockets
          </SEOInternalLink>
          , bell transformers (230V to 8V), and current transformers for metering. Understanding how
          they work — including losses (copper losses from winding resistance and iron losses from
          hysteresis and eddy currents) — is essential knowledge for the Level 3 electrical science
          examination.
        </p>
      </>
    ),
  },
  {
    id: 'ac-theory',
    heading: 'AC Theory and Waveforms',
    content: (
      <>
        <p>
          The UK mains supply is 230V AC at 50 Hz — alternating current that reverses direction 50
          times per second. AC behaves fundamentally differently from DC because the constantly
          changing current interacts with the inductive and capacitive properties of cables, motors,
          and other equipment, creating effects that do not exist in DC circuits.
        </p>
        <p>
          A sinusoidal AC waveform has a peak value, an RMS (root mean square) value, and an average
          value. The 230V we quote for the UK mains is the RMS value — the equivalent DC voltage
          that would produce the same heating effect. The peak value is 230 x 1.414 = approximately
          325V. This is why insulation must be rated to withstand the peak voltage, not just the RMS
          voltage.
        </p>
        <p>
          When AC flows through a purely resistive load (such as a heater), the current and voltage
          are in phase — they rise and fall together. When AC flows through an inductive load (such
          as a motor), the current lags behind the voltage. When AC flows through a capacitive load,
          the current leads the voltage. These phase relationships are shown using phasor diagrams
          and are essential for understanding impedance, reactance, and power factor.
        </p>
        <p>
          <strong>Impedance (Z)</strong> is the AC equivalent of resistance — it is the total
          opposition to current flow in an AC circuit, combining resistance (R) and reactance (X).
          For a circuit with resistance and inductance: Z = the square root of (R squared plus XL
          squared). Understanding impedance is essential for earth fault loop impedance calculations
          in BS 7671.
        </p>
      </>
    ),
  },
  {
    id: 'power-factor',
    heading: 'Power Factor and the Power Triangle',
    content: (
      <>
        <p>
          Power factor is the ratio of real power (watts) to apparent power (volt-amperes) in an AC
          circuit. It is expressed as a number between 0 and 1, or as a percentage. A purely
          resistive load has a power factor of 1 (unity) — all the power drawn from the supply does
          useful work. An inductive load (such as a motor) has a lagging power factor — the supply
          must deliver more current than would be needed for the equivalent real power at unity
          power factor.
        </p>
        <p>
          The power triangle relates three quantities: real power (P, measured in watts) on the
          adjacent side, reactive power (Q, measured in volt-amperes reactive or VAr) on the
          opposite side, and apparent power (S, measured in volt-amperes or VA) on the hypotenuse.
          The power factor is cos phi, where phi is the angle between the real power and apparent
          power vectors.
        </p>
        <p>
          For commercial and industrial electricians, power factor has direct practical
          implications. Electricity suppliers may impose reactive power charges or power factor
          penalties on installations with a power factor below approximately 0.95. Power factor
          correction capacitors are installed across inductive loads (typically at the main
          distribution board or at individual motor starter panels) to reduce the reactive power
          demand and improve the overall power factor. Calculating the required capacitor size is a
          standard design task covered in this course.
        </p>
        <p>
          Maximum demand calculations for{' '}
          <SEOInternalLink href="/tools/max-demand-calculator">BS 7671 design</SEOInternalLink> must
          account for power factor — a 10kW load at 0.8 power factor draws 12.5kVA from the supply,
          requiring larger cables and protective devices than the same 10kW load at unity power
          factor. Understanding this relationship is essential for accurate circuit design.
        </p>
        <SEOAppBridge
          title="Master power factor with AI-guided calculations"
          description="Work through power factor correction examples with the Elec-Mate AI tutor. Calculate capacitor sizes, draw power triangles, and understand the commercial implications of low power factor installations."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Systems',
    content: (
      <>
        <p>
          Three-phase power is the standard for commercial and industrial electricity supply in the
          UK. It provides more efficient power transmission, enables higher power delivery using
          smaller conductors, and produces a rotating magnetic field that is essential for
          three-phase induction motors.
        </p>
        <p>
          A three-phase supply consists of three sinusoidal voltages, each displaced by 120 degrees
          from the others. In the UK, the phase voltage (between any phase conductor and neutral) is
          230V, and the line voltage (between any two phase conductors) is 400V. The relationship
          is: line voltage = phase voltage x the square root of 3 (approximately 1.732).
        </p>
        <p>
          <strong>Star (Y) connection</strong> is the most common configuration for distribution.
          The three phase windings are connected at a common neutral point. Each load is connected
          between a phase conductor and the neutral. In a balanced star system, the neutral carries
          zero current. In an unbalanced system (common in real installations where single-phase
          loads are distributed unevenly across the three phases), the neutral carries the resultant
          unbalance current.
        </p>
        <p>
          <strong>Delta connection</strong> has no neutral point — each load is connected between
          two phase conductors. Delta is used for{' '}
          <SEOInternalLink href="/training/three-phase-installation">
            three-phase motor connections
          </SEOInternalLink>{' '}
          and for high-power balanced loads. The line current in a balanced delta system is the
          phase current multiplied by the square root of 3. Understanding star and delta connections
          is essential for any electrician working on commercial or industrial installations.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/bs-7671-eighteenth-edition',
    title: 'BS 7671 18th Edition Guide',
    description:
      'The wiring regulations that apply electrical science principles to practical installation design.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: "Apply Ohm's law and impedance calculations to real cable sizing problems.",
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: "Kirchhoff's voltage law in practice — calculate voltage drop across cable runs.",
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/training/three-phase-installation',
    title: 'Three-Phase Installation Course',
    description: 'Apply three-phase theory to practical commercial and industrial installations.',
    icon: GraduationCap,
    category: 'Training',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Electrical science is essential for understanding and interpreting test results.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/training/data-cabling',
    title: 'Data Cabling Course',
    description:
      'Understanding impedance and frequency is essential for data cable performance and testing.',
    icon: Cable,
    category: 'Training',
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Electrical Science Fundamentals — Theory Course',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Beginner',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT20H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalScienceFundamentalsCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Theory Course"
      badgeIcon={Atom}
      heroTitle={
        <>
          Electrical Science Fundamentals: <span className="text-yellow-400">Theory Course</span>
        </>
      }
      heroSubtitle="Master the electrical science theory that underpins everything an electrician does. Ohm's law, Kirchhoff's laws, magnetism, transformers, AC theory, power factor, impedance, and three-phase systems. 12 comprehensive modules with video content, interactive quizzes, and AI-powered study tools."
      readingTime={18}
      courseDuration="20 hours"
      courseLevel="Beginner"
      coursePrerequisites="Basic maths (multiplication, division, fractions) — no prior electrical knowledge required"
      courseModules={12}
      courseCertification="CPD certificate on completion — supports Level 2 and Level 3 electrical science examination preparation"
      courseWhoIsItFor="Electrical apprentices studying for Level 2 and Level 3 qualifications, qualified electricians wanting to strengthen their theoretical understanding, and anyone preparing for the 2391 inspection and testing examination"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Ready to master electrical science?"
      ctaSubheading="Join 430+ UK electricians studying smarter with Elec-Mate. 12 structured modules covering every electrical science topic from Ohm's law to three-phase power. Video explanations, interactive quizzes, and an AI tutor for any theory question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/electrical-science-fundamentals"
    />
  );
}
