import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Zap,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  Gauge,
  CircuitBoard,
  FileCheck2,
  ClipboardCheck,
  Wrench,
  BarChart3,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/installation' },
  { label: 'Three Phase', href: '/guides/three-phase-installation' },
];

const tocItems = [
  { id: 'what-is-three-phase', label: 'What Is Three Phase?' },
  { id: 'when-needed', label: 'When Three Phase Is Needed' },
  { id: 'balancing-loads', label: 'Balancing Loads Across Phases' },
  { id: 'tpn-distribution', label: 'TPN Distribution Boards' },
  { id: 'cable-sizing', label: 'Cable Sizing for Three Phase' },
  { id: 'testing-three-phase', label: 'Testing Three Phase Installations' },
  { id: 'earthing-bonding', label: 'Earthing and Bonding' },
  { id: 'certification', label: 'Certification Requirements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Three phase supplies are required when single phase cannot deliver enough power — typically above 100A or where large motors, commercial kitchens, or EV charging banks are installed.',
  'Load balancing across all three phases is critical: an imbalance greater than 10-15% causes neutral overloading, voltage fluctuations, and potential overheating of the neutral conductor.',
  'TPN (Triple Pole and Neutral) distribution boards must be selected carefully — BS 7671 requires correct discrimination, RCD protection, and labelling of all circuits by phase.',
  'Cable sizing for three phase circuits uses the same BS 7671 correction factors as single phase but the current per phase is lower for the same total power, often allowing smaller conductor sizes.',
  "Elec-Mate's cable sizing calculator handles three phase calculations instantly, applying grouping, ambient temperature, and thermal insulation correction factors per BS 7671 Appendix 4.",
];

const faqs = [
  {
    question: 'What is the difference between single phase and three phase?',
    answer:
      'Single phase uses one live conductor and one neutral, providing 230V at 50Hz. Three phase uses three live conductors (L1, L2, L3), each 120 degrees apart, providing 400V between any two phases (line-to-line) and 230V between any phase and neutral (line-to-neutral). Three phase delivers roughly 1.73 times the power of single phase for the same current, making it essential for larger installations. The relationship is expressed as V_line = V_phase x sqrt(3), so 230V x 1.732 = approximately 400V. Three phase is standard in commercial and industrial premises and is increasingly specified for domestic properties with high electrical demand — for example, properties with multiple EV chargers, heat pumps, and electric cooking.',
  },
  {
    question: 'How do I know if a property needs a three phase supply?',
    answer:
      'A three phase supply is typically needed when the total maximum demand exceeds what a single phase supply can provide — usually above 100A per phase (23kW) on a single phase supply. Common indicators include: large commercial kitchens with multiple 3-phase ovens or induction hobs, industrial motors above 3kW (which are almost always three phase), multiple EV chargers requiring simultaneous fast charging, large heat pump installations, and premises where the total connected load significantly exceeds 23kW even after applying diversity factors. The DNO (Distribution Network Operator) will assess the application and may require a three phase supply based on the declared maximum demand. In some cases, upgrading from single phase to three phase requires new service cabling from the street, which involves civils work and DNO charges.',
  },
  {
    question: 'What happens if three phase loads are not balanced?',
    answer:
      'An unbalanced three phase system causes current to flow in the neutral conductor. In a perfectly balanced system, the neutral current is zero because the three phase currents cancel each other out. As the imbalance increases, the neutral current rises, potentially exceeding the neutral conductor rating if the imbalance is severe. This can cause overheating of the neutral conductor, voltage fluctuations between phases (some circuits receiving too much voltage and others too little), reduced motor efficiency, increased harmonic distortion, and premature failure of sensitive equipment. BS 7671 does not specify a maximum permitted imbalance percentage, but good practice is to keep the imbalance below 10-15%. When designing a three phase distribution board, allocate loads across all three phases as evenly as possible, grouping similar load types on each phase.',
  },
  {
    question: 'Do I need RCD protection on every circuit in a three phase board?',
    answer:
      'BS 7671:2018+A2:2022 requires RCD protection (rated residual current not exceeding 30mA) for socket outlets rated up to 32A and mobile equipment rated up to 32A for outdoor use (Regulation 411.3.3), and for cables concealed in walls at a depth less than 50mm (Regulation 411.3.4). This applies equally to three phase installations. In practice, most three phase distribution boards use RCBOs (combined MCB and RCD) on individual circuits or split the board into RCD-protected and non-RCD-protected sections using separate RCDs. For three phase circuits (such as a three phase motor or three phase oven), a 4-pole RCBO or a 4-pole RCD protecting a group of three phase MCBs is required. Ensure the RCD is rated for the correct number of poles and that it is suitable for the type of load — Type A for general use, Type B for circuits with variable speed drives or inverters.',
  },
  {
    question: 'How do I test a three phase installation for initial verification?',
    answer:
      'Initial verification of a three phase installation follows the same sequence as single phase, applied to each phase individually and to three phase circuits as a whole. The sequence under BS 7671 Chapter 64 and GN3 is: continuity of protective conductors (R1+R2 for each circuit on each phase), continuity of ring final circuits (if any — apply the figure-of-eight test to each ring on each phase), insulation resistance (test between each live conductor and earth, and between live conductors — L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, all to earth), polarity, earth fault loop impedance (Zs for each circuit on each phase), prospective fault current (PSCC at the origin — measure between phases as well as phase-to-neutral), and RCD operation (trip time and trip current for each RCD). Phase rotation should also be confirmed using a phase rotation meter if supplying three phase motors, as incorrect rotation will cause motors to run backwards.',
  },
  {
    question: 'Can I use Elec-Mate for three phase cable sizing?',
    answer:
      "Yes. Elec-Mate's cable sizing calculator supports single phase and three phase calculations. Enter the circuit type (three phase), the design current, the cable type and installation method (from BS 7671 Table 4A2), and any applicable correction factors — ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and semi-enclosed fuse (Cc if applicable). The calculator returns the minimum conductor size, the tabulated current-carrying capacity (It), and the voltage drop for the cable length entered. For three phase circuits, the voltage drop calculation uses the three phase formula: Vd = (mV/A/m x Ib x L) / 1000, where the mV/A/m value is taken from the three phase column of the BS 7671 voltage drop tables. This eliminates manual lookup errors and saves significant time on complex commercial and industrial designs.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate conductor sizes for single and three phase circuits with all BS 7671 correction factors applied automatically.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop for three phase circuits against BS 7671 limits — 3% for lighting, 5% for other circuits.',
    icon: Gauge,
    category: 'Calculator',
  },
  {
    href: '/guides/max-demand-calculator',
    title: 'Max Demand Calculator',
    description:
      'Calculate total maximum demand with diversity factors to determine whether three phase is required.',
    icon: BarChart3,
    category: 'Calculator',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates for three phase installations directly from your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Requirements for consumer units and distribution boards including TPN boards under BS 7671.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/guides/correction-factors-guide',
    title: 'Correction Factors Guide',
    description:
      'Complete guide to Ca, Cg, Ci, and Cc correction factors with worked examples for cable sizing.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-three-phase',
    heading: 'What Is a Three Phase Electrical Supply?',
    content: (
      <>
        <p>
          A three phase electrical supply uses three live conductors — designated L1, L2, and L3 —
          each carrying an alternating current at 50Hz but offset from each other by 120 degrees.
          This arrangement delivers significantly more power than a single phase supply for the same
          conductor size and current rating.
        </p>
        <p>
          The voltage between any two phases (line-to-line voltage) is 400V. The voltage between any
          single phase and the neutral conductor (line-to-neutral voltage) is 230V. The relationship
          between these voltages is governed by the square root of 3 (approximately 1.732): 400V /
          1.732 = 230V.
        </p>
        <p>
          In the UK, the Distribution Network Operator (DNO) provides three phase supplies as
          standard to commercial and industrial premises. Domestic properties typically receive a
          single phase supply, but three phase can be requested where the maximum demand justifies
          it — for example, properties with multiple{' '}
          <SEOInternalLink href="/guides/ev-charger-installation">EV chargers</SEOInternalLink>,
          heat pumps, or high-power electric cooking appliances.
        </p>
        <p>
          Three phase power is calculated as P = sqrt(3) x V_line x I_line x power factor. For a
          balanced load drawing 100A per phase at unity power factor, the total power is 1.732 x 400
          x 100 = 69.3kW — compared with 23kW from a single phase 100A supply.
        </p>
      </>
    ),
  },
  {
    id: 'when-needed',
    heading: 'When Is a Three Phase Supply Needed?',
    content: (
      <>
        <p>
          The decision to install a three phase supply depends on the total electrical demand of the
          premises. A single phase supply in the UK is typically rated at 60A or 100A (depending on
          the service fuse), providing a maximum of approximately 14kW to 23kW. When the{' '}
          <SEOInternalLink href="/guides/max-demand-calculator">
            calculated maximum demand
          </SEOInternalLink>{' '}
          exceeds this, three phase becomes necessary.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial kitchens</strong> — multiple three phase ovens, induction hobs,
                and high-power dishwashers can demand 50kW or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial motors</strong> — motors above 3kW are almost always three phase.
                They run more efficiently and produce smoother torque than single phase equivalents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple EV chargers</strong> — a bank of 7kW or 22kW EV chargers for a car
                park or multi-dwelling development requires three phase to distribute the load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large domestic properties</strong> — homes with underfloor heating, heat
                pumps, EV charging, electric cooking, and hot tubs can exceed single phase capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New build developments</strong> — the 2022 Building Regulations requiring EV
                charge points and the increasing adoption of heat pumps are pushing more new builds
                towards three phase supplies.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To determine whether three phase is needed, calculate the maximum demand using diversity
          factors from BS 7671 and the IET On-Site Guide. If the total demand after diversity
          exceeds the single phase supply capacity, three phase is required. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/max-demand-calculator">
            max demand calculator
          </SEOInternalLink>{' '}
          applies the correct diversity factors automatically and tells you whether single or three
          phase is appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'balancing-loads',
    heading: 'Balancing Loads Across All Three Phases',
    content: (
      <>
        <p>
          Load balancing is one of the most important aspects of three phase installation design. In
          a perfectly balanced system, each phase carries the same current and the neutral conductor
          carries zero current. In practice, perfect balance is rarely achieved, but the goal is to
          get as close as possible.
        </p>
        <p>
          An unbalanced three phase system causes current to flow in the neutral conductor. The
          greater the imbalance, the higher the neutral current. In extreme cases, the neutral
          current can exceed the phase current, which risks overheating the neutral conductor —
          particularly dangerous in older installations where the neutral may be undersized relative
          to the phase conductors.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-3">Practical Load Balancing Strategy</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                List every circuit with its design current and allocate them across L1, L2, and L3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Place large single phase loads (cookers, showers, EV chargers) on different phases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Distribute lighting circuits, socket circuits, and small power evenly across all
                three phases.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Consider the diversity of each circuit — a socket circuit on a phase with a large
                motor will balance better than two large fixed loads on the same phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Aim for no more than 10-15% difference in current between the most heavily loaded
                and least heavily loaded phase.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">AI circuit designer</SEOInternalLink>{' '}
          can assist with phase allocation by analysing the connected load on each phase and
          suggesting redistribution to minimise imbalance. This is particularly useful on complex
          commercial installations with dozens of circuits.
        </p>
        <SEOAppBridge
          title="Design balanced three phase boards with AI"
          description="Elec-Mate's AI circuit designer analyses your load schedule, allocates circuits across phases for optimal balance, and sizes cables automatically. Try it free for 7 days."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'tpn-distribution',
    heading: 'TPN Distribution Boards: Selection and Wiring',
    content: (
      <>
        <p>
          A TPN (Triple Pole and Neutral) distribution board is the heart of a three phase
          installation. Unlike a single phase consumer unit with one busbar, a TPN board has three
          phase busbars (L1, L2, L3) and a neutral bar. Each outgoing way can be connected to any
          one phase (for single phase circuits) or across all three phases (for three phase loads).
        </p>
        <p>
          When selecting a TPN distribution board, consider the following requirements under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main switch rating</strong> — the main switch (or main isolator) must be
                rated for the maximum demand of the installation. For a 100A per phase supply, a
                100A 4-pole isolator is standard. For larger installations, 125A, 200A, or 400A
                switches may be required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of ways</strong> — count every circuit (including spares) and select
                a board with sufficient ways. TPN boards typically come in 12, 18, 24, or 36 way
                configurations. Allow at least 20% spare ways for future expansion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD arrangement</strong> — decide between a split-load board (with one or
                more RCDs protecting groups of circuits) or individual RCBOs on every circuit. RCBOs
                provide the best discrimination — a fault on one circuit does not trip other
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CircuitBoard className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD (Surge Protection Device)</strong> — BS 7671 Regulation 443.4.1 requires
                an SPD where the consequence of an overvoltage would cause serious injury, danger to
                life, disruption to a public service, or damage to cultural heritage. In practice,
                most new three phase installations should include a Type 2 SPD as a minimum.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Labelling is essential on TPN boards. Every circuit must be clearly labelled with its
          function, phase allocation, and protective device rating. The circuit chart must show
          which phase each circuit is connected to. Under{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">
            BS 7671 Regulation 514.9
          </SEOInternalLink>
          , the circuit chart must be fixed inside or adjacent to the distribution board and kept up
          to date.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing for Three Phase Circuits',
    content: (
      <>
        <p>
          Cable sizing for three phase circuits follows the same principles as single phase — you
          must ensure the cable can carry the design current (Ib), withstand the prospective fault
          current, and keep the voltage drop within BS 7671 limits. The key difference is that the
          current per phase is lower for a given total power, because the power is shared across
          three conductors.
        </p>
        <p>
          For a balanced three phase load, the current per phase is calculated as: I = P / (sqrt(3)
          x V_line x pf), where P is the total power in watts, V_line is 400V, and pf is the power
          factor. For example, a 30kW balanced load at unity power factor draws 30,000 / (1.732 x
          400 x 1.0) = 43.3A per phase.
        </p>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/cable-sizing-calculator">
            cable sizing process
          </SEOInternalLink>{' '}
          then applies the standard correction factors from BS 7671 Appendix 4:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ca (ambient temperature)</strong> — derate the cable if the ambient
                temperature exceeds 30 degrees C (the reference temperature for most cable types).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cg (grouping)</strong> — derate the cable if it is grouped with other
                cables. Three phase cables running together count as one circuit for grouping
                purposes, but multiple three phase circuits in the same trunking or tray must be
                derated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ci (thermal insulation)</strong> — derate the cable if it passes through or
                is in contact with thermal insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop</strong> — BS 7671 limits voltage drop to 3% for lighting
                circuits and 5% for other circuits (from the origin to the load). For three phase,
                use the three phase mV/A/m values from the voltage drop tables.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Size three phase cables in seconds"
          description="Elec-Mate's cable sizing calculator handles single and three phase circuits. Enter the load, cable type, installation method, and length — get the correct conductor size with all correction factors applied. No manual table lookups."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'testing-three-phase',
    heading: 'Testing a Three Phase Installation',
    content: (
      <>
        <p>
          Testing a three phase installation requires the same sequence of tests as single phase,
          but with additional measurements between phases. The testing sequence under BS 7671
          Chapter 64 and{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">GN3</SEOInternalLink> is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Continuity of protective conductors</strong> — test R1+R2 for every circuit on
              every phase. For three phase circuits, test each phase conductor to the CPC.
            </li>
            <li>
              <strong>Continuity of ring final circuits</strong> — if there are ring circuits on any
              phase, perform the standard figure-of-eight test for each ring.
            </li>
            <li>
              <strong>Insulation resistance</strong> — test at 500V DC between all live conductors
              and earth (L1-E, L2-E, L3-E, N-E) and between live conductors (L1-L2, L2-L3, L1-L3,
              L1-N, L2-N, L3-N). Each reading must be at least 1 megohm. Disconnect sensitive
              electronic equipment before testing.
            </li>
            <li>
              <strong>Polarity</strong> — verify correct polarity on all single phase circuits and
              correct phase rotation on three phase circuits. Use a phase rotation meter.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs)</strong> — measure Zs at the furthest point of
              each circuit. For three phase circuits, measure Zs for each phase.
            </li>
            <li>
              <strong>Prospective fault current (PSCC)</strong> — measure at the origin between each
              phase and neutral, and between phases. The highest value determines the required
              breaking capacity of the protective devices.
            </li>
            <li>
              <strong>RCD operation</strong> — test every RCD at rated residual current (30mA for
              most domestic/commercial RCDs). Test at 1x and 5x rated current. Verify trip time is
              within BS 7671 limits (300ms at 1x, 40ms at 5x for Type AC/A).
            </li>
          </ol>
        </div>
        <p>
          Phase rotation is particularly important for three phase motor installations. Incorrect
          phase rotation causes motors to run in reverse, which can damage driven equipment. Always
          verify phase rotation at the distribution board and at the motor terminals before
          energising.
        </p>
        <p>
          Record all test results on the Schedule of Test Results form. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC certificate app</SEOInternalLink>{' '}
          includes the full schedule of test results and supports three phase circuit entries with
          per-phase readings.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-bonding',
    heading: 'Earthing and Bonding for Three Phase Installations',
    content: (
      <>
        <p>
          Earthing and bonding requirements for three phase installations follow the same BS 7671
          regulations as single phase, but the conductor sizes are often larger due to the higher
          fault currents associated with three phase supplies.
        </p>
        <p>
          The main earthing conductor size is determined by BS 7671 Table 54.7 based on the largest
          phase conductor size. For a 100A three phase supply with 25mm2 phase conductors, the main
          earthing conductor must be at least 16mm2 (copper). The main protective bonding conductors
          must be at least half the size of the main earthing conductor, with a minimum of 6mm2 for
          supplies up to 35mm2 phase conductors and 10mm2 for larger supplies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main earthing terminal</strong> — must be accessible for inspection and
                testing. Label it clearly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective bonding</strong> — bond to incoming gas, water, oil, and any
                other extraneous-conductive-parts within 600mm of the point of entry to the
                building.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode</strong> — for TT earthing arrangements, the earth electrode
                resistance must be low enough to ensure the disconnection time is met. For three
                phase TT installations, this often means multiple electrodes or a ring electrode.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For detailed guidance on{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangements
          </SEOInternalLink>{' '}
          including TN-S, TN-C-S, and TT systems, see our dedicated guide.
        </p>
      </>
    ),
  },
  {
    id: 'certification',
    heading: 'Certification for Three Phase Installations',
    content: (
      <>
        <p>
          Every new three phase installation requires an Electrical Installation Certificate (EIC)
          under BS 7671 Part 6. The EIC must include the full schedule of test results for every
          circuit on every phase, the schedule of items inspected, and the designer, installer, and
          inspector declarations.
        </p>
        <p>For three phase installations, the EIC must record:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The supply type (three phase, four wire), voltage (400/230V), and earthing
                arrangement (TN-S, TN-C-S, or TT).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                The prospective fault current at the origin — measured between phases and between
                each phase and neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The external earth fault loop impedance (Ze) for each phase.</span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Test results for every circuit, showing which phase each circuit is connected to.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the three phase installation is notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          (for example, a new installation in a dwelling or the installation of a new consumer
          unit), the work must be either carried out by a registered competent person who can
          self-certify, or notified to Building Control before work starts.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ThreePhaseInstallationPage() {
  return (
    <GuideTemplate
      title="Three Phase Installation Guide | BS 7671 UK"
      description="Complete guide to three phase electrical installations in the UK. Covers when three phase is needed, load balancing, TPN distribution boards, cable sizing, testing, and certification under BS 7671."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Three Phase Installation:{' '}
          <span className="text-yellow-400">The Complete BS 7671 Guide</span>
        </>
      }
      heroSubtitle="Three phase supplies are essential for commercial premises, industrial sites, and increasingly for domestic properties with high electrical demand. This guide covers everything from load balancing and TPN board selection to cable sizing, testing, and certification — all referenced to BS 7671:2018+A2:2022."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Three Phase Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Design Boards Faster"
      ctaSubheading="Elec-Mate's cable sizing calculator, voltage drop calculator, and AI circuit designer handle three phase calculations instantly. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
