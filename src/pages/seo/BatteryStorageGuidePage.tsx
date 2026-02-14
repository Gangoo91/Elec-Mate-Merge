import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Battery,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Sun,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Battery Storage', href: '/guides/battery-storage-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Battery Storage Overview' },
  { id: 'types', label: 'AC-Coupled vs DC-Coupled' },
  { id: 'sizing', label: 'Sizing a Home Battery System' },
  { id: 'inverters', label: 'Inverters and Hybrid Systems' },
  { id: 'safety-requirements', label: 'Safety Requirements' },
  { id: 'mcs-certification', label: 'MCS Certification' },
  { id: 'electrical-installation', label: 'Electrical Installation Requirements' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Home battery storage systems are either AC-coupled (connected to the AC side of the existing installation, works with any existing solar PV) or DC-coupled (integrated with solar PV via a hybrid inverter, more efficient but requires compatible equipment).',
  'Battery sizing depends on daily energy consumption, solar PV generation, electricity tariff structure, and whether backup power during grid outages is required.',
  'Safety requirements include ventilation, fire-rated enclosures where applicable, overcurrent protection, isolation switching, and compliance with BS 7671:2018+A3:2024 and the relevant battery storage standards.',
  'MCS (Microgeneration Certification Scheme) certification is required for the installer if the homeowner wants to access the Smart Export Guarantee (SEG) payments for exported electricity.',
  'An Electrical Installation Certificate (EIC) or Minor Works Certificate must be issued for the electrical connections, and the system must be notified to the DNO (Distribution Network Operator) under G98 or G99.',
];

const faqs = [
  {
    question: 'What is the difference between AC-coupled and DC-coupled battery storage?',
    answer:
      'AC-coupled systems connect the battery and its inverter to the AC side of the domestic installation — typically at the consumer unit. The battery has its own inverter that converts DC (from the battery) to AC (for the house) and vice versa. AC-coupled systems can be added to any existing solar PV installation without modifying the solar inverter. DC-coupled systems use a hybrid inverter that manages both the solar PV panels and the battery on the DC side, converting to AC once for the house. This is more efficient (fewer conversion steps) but requires the hybrid inverter to be compatible with the solar panels. DC-coupled is the better choice for new installations where solar PV and battery are being installed together. AC-coupled is the better choice for retrofitting a battery to an existing solar PV system.',
  },
  {
    question: 'How do I size a home battery system?',
    answer:
      'Start with the homeowner daily electricity consumption — the average UK household uses 8 to 10kWh per day. If the household has solar PV, determine how much excess generation is available to charge the battery (typically 3 to 6kWh per day for a 4kWp system). A battery sized at 5 to 10kWh is suitable for most UK homes. Smaller batteries (3 to 5kWh) are adequate if the primary goal is to time-shift cheap overnight electricity (for example, on an Octopus Go or Intelligent Octopus tariff). Larger batteries (10 to 15kWh) are appropriate if the homeowner wants full backup capability or has high daytime consumption. The Elec-Mate AI circuit designer can model the load profile and recommend a battery size based on the household consumption pattern.',
  },
  {
    question: 'Do I need MCS certification to install home battery storage?',
    answer:
      'If the homeowner wants to receive Smart Export Guarantee (SEG) payments for electricity exported to the grid, the installation must be carried out by an MCS-certified installer. MCS (Microgeneration Certification Scheme) certification applies to both the installer (the company) and the specific product (the battery and inverter must be on the MCS product register). If the battery system is for self-consumption only (no export payments), MCS certification is not legally required, but it is strongly recommended as it provides a quality assurance framework and is often required by warranty providers and insurance companies. The electrical installation work itself must still comply with BS 7671 and Part P regardless of MCS status.',
  },
  {
    question: 'What safety requirements apply to home battery storage?',
    answer:
      'Home battery systems must comply with the battery manufacturer installation manual, BS 7671:2018+A3:2024 for the electrical connections, and the relevant product safety standards (typically IEC 62619 for lithium-ion batteries and IEC 62040 for UPS systems). Key safety requirements include: adequate ventilation (lithium-ion batteries generate heat during charging and discharging), fire safety (batteries must be installed in a location that minimises fire risk — not in escape routes, not adjacent to combustible materials without a fire-rated barrier), overcurrent protection (DC and AC sides), isolation switching (both DC and AC isolation for safe maintenance), and labelling (warning labels on the consumer unit, meter position, and battery enclosure indicating the presence of a battery storage system). The installer must also notify the DNO under G98 or G99 before energising the system.',
  },
  {
    question: 'Do I need to notify the DNO when installing battery storage?',
    answer:
      'Yes. Any generation or storage device connected to the distribution network must be notified to the DNO (Distribution Network Operator) under Engineering Recommendation G98 (for systems up to 16A per phase, which covers most domestic installations) or G99 (for larger systems). G98 is a notification — the installer submits the form and can proceed with the installation. G99 requires prior approval from the DNO before connection, which can take several weeks. For a typical domestic battery system (up to 3.68kW single-phase), G98 applies and the process is straightforward. The notification informs the DNO that a battery system is connected so they can manage the network accordingly. Failure to notify is a breach of the connection agreement and can result in disconnection.',
  },
  {
    question: 'Can battery storage provide backup power during a grid outage?',
    answer:
      'Some battery systems offer an Emergency Power Supply (EPS) or backup function that provides power to essential circuits during a grid outage. However, this is not a standard feature on all systems — it requires an inverter with EPS capability and additional wiring to create a backed-up circuit or sub-panel. The backup arrangement must include anti-islanding protection to prevent the battery from feeding power back into the grid during an outage (which would be dangerous for DNO engineers working on the network). The backed-up circuits are typically limited to essentials — lighting, fridge, broadband router, and a few sockets. High-power loads such as electric showers, ovens, and EV chargers cannot usually be supported by domestic battery systems during an outage.',
  },
  {
    question: 'How long does a home battery last?',
    answer:
      'Most domestic lithium-ion battery systems have a warranty of 10 to 15 years and are designed for 6,000 to 10,000 charge-discharge cycles. At one cycle per day, this equates to 16 to 27 years of operational life. However, the battery capacity degrades over time — most manufacturers warrant at least 60% to 80% of the original capacity at the end of the warranty period. In practice, a well-maintained battery system installed in a location with moderate temperatures (avoiding extreme heat or cold) will typically deliver 80% or more of its rated capacity after 10 years. The inverter may need replacement before the battery — inverter warranties are typically 5 to 10 years, though many can be extended.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for battery storage connections, AC and DC circuits, and inverter feeds.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on cable runs between inverter, battery, and consumer unit.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description: 'Often paired with battery storage for smart charging and solar self-consumption.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for battery storage installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate',
    description:
      'Complete solar PV installation certificates alongside battery storage commissioning.',
    icon: Sun,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering all installation types.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Home Battery Storage: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Home battery storage is one of the fastest-growing sectors in UK domestic electrical work.
          Falling battery prices, rising electricity costs, smart tariffs that reward time-shifting,
          and the growth of solar PV have made battery storage a practical investment for homeowners
          and a significant revenue stream for electricians.
        </p>
        <p>
          A home battery stores electricity — either from solar PV panels, from the grid during
          cheap off-peak hours, or both — and releases it when the household needs it. The system
          typically consists of a battery unit, an inverter (which may be integrated into the
          battery or separate), and the electrical connections to the domestic installation.
        </p>
        <p>
          The electrical installation must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , the manufacturer installation manual, and the relevant product safety standards. The
          installer must notify the DNO (Distribution Network Operator) under G98 or G99 before the
          system is connected to the grid. If the homeowner wants Smart Export Guarantee (SEG)
          payments, the installer must be MCS-certified.
        </p>
        <p>
          This guide covers the types of battery systems, sizing, inverter options, safety
          requirements, MCS certification, and the electrical installation and testing process.
        </p>
      </>
    ),
  },
  {
    id: 'types',
    heading: 'AC-Coupled vs DC-Coupled Battery Systems',
    content: (
      <>
        <p>
          The fundamental decision in a home battery installation is whether to use an AC-coupled or
          DC-coupled system. The choice depends on whether the property already has solar PV, the
          existing inverter type, and the budget.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">AC-Coupled</h3>
            <p className="text-white text-sm leading-relaxed">
              The battery has its own inverter and connects to the AC side of the installation
              (typically at the consumer unit). The battery inverter converts DC from the battery to
              AC for the house, and AC from the grid or solar to DC for charging. This system works
              with any existing solar PV installation because it operates independently of the solar
              inverter. It is the standard choice for retrofitting a battery to an existing solar PV
              system. The downside is slightly lower round-trip efficiency (85% to 90%) because of
              the additional AC-DC-AC conversion steps.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">DC-Coupled</h3>
            <p className="text-white text-sm leading-relaxed">
              A hybrid inverter manages both the solar PV panels and the battery on the DC side.
              Solar energy charges the battery directly in DC, and the inverter converts to AC once
              for the house. This is more efficient (90% to 95% round-trip) because there are fewer
              conversion steps. However, it requires a hybrid inverter that is compatible with both
              the solar panels and the battery. DC-coupled is the best choice when installing solar
              PV and battery storage together as a new system. It also typically costs less because
              only one inverter is needed.
            </p>
          </div>
        </div>
        <p>
          For existing solar PV installations with a working string inverter, AC-coupled is almost
          always the practical choice — replacing a functioning solar inverter with a hybrid
          inverter just to go DC-coupled rarely makes economic sense. For new installations, DC-
          coupled with a hybrid inverter is the preferred approach for efficiency and cost.
        </p>
      </>
    ),
  },
  {
    id: 'sizing',
    heading: 'Sizing a Home Battery System',
    content: (
      <>
        <p>
          Correct battery sizing maximises the financial return for the homeowner and avoids
          overselling or underselling. The key inputs are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily electricity consumption</strong> — the average UK household uses 8 to
                10kWh per day. A household with an EV charger, heat pump, or home office may use 15
                to 25kWh. Analyse the smart meter data or recent electricity bills to determine
                actual consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV generation</strong> — if the property has solar PV, how much excess
                generation is available to charge the battery? A 4kWp system in southern England
                generates approximately 3,600kWh per year — but generation is concentrated in spring
                and summer. Daily excess in summer may be 5 to 8kWh; in winter, close to zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tariff structure</strong> — time-of-use tariffs (Octopus Go, Intelligent
                Octopus, Agile) reward charging during cheap off-peak hours and discharging during
                expensive peak hours. The price differential determines the financial benefit of
                battery storage. With a 20p/kWh off-peak to 40p/kWh peak differential, a 10kWh
                battery saves approximately £2 per cycle or £730 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup requirement</strong> — if the homeowner wants backup power during
                grid outages, the battery must be sized to cover essential loads for the expected
                outage duration. A 5kWh battery provides approximately 5 to 8 hours of essential
                load (fridge, lights, router, phone charging).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most UK homes, a battery in the 5 to 13kWh range provides the best balance of cost and
          benefit. Smaller systems (3 to 5kWh) are suitable for tariff arbitrage only. Larger
          systems (13 to 20kWh) make sense for high-consumption households with solar PV and EV
          charging.
        </p>
        <SEOAppBridge
          title="Design the right battery system with AI"
          description="Elec-Mate's AI circuit designer can model household load profiles, solar generation patterns, and tariff structures to recommend the optimal battery size. Help your customers make informed decisions backed by data."
          icon={Battery}
        />
      </>
    ),
  },
  {
    id: 'inverters',
    heading: 'Inverters and Hybrid Systems',
    content: (
      <>
        <p>
          The inverter is the brain of the battery storage system. It manages the flow of energy
          between the solar PV panels (if present), the battery, the house loads, and the grid. The
          choice of inverter depends on the system configuration:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hybrid inverter (DC-coupled)</strong> — a single inverter that handles both
                solar PV input and battery charging/discharging. It has DC inputs for the solar
                panels, DC input/output for the battery, and AC output to the consumer unit. This is
                the most efficient and cost-effective option for new installations. Common brands
                include GivEnergy, SolaX, Fox ESS, and Sungrow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery inverter (AC-coupled)</strong> — a standalone inverter for the
                battery only, connecting to the AC side of the installation. This is used when
                retrofitting a battery to an existing solar PV system with its own string inverter.
                The battery inverter must be sized to match the battery charge/discharge rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-in-one systems</strong> — some manufacturers (Tesla Powerwall, GivEnergy
                All-in-One) integrate the battery and inverter into a single unit. These simplify
                installation and reduce the number of connections, but offer less flexibility for
                future upgrades.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inverter must be appropriately rated for the battery capacity and the maximum
          charge/discharge rate. A 5kW inverter paired with a 10kWh battery can deliver 5kW
          continuous power — sufficient for most domestic loads. Check the inverter specification
          matches the household maximum demand during peak periods.
        </p>
      </>
    ),
  },
  {
    id: 'safety-requirements',
    heading: 'Safety Requirements for Home Battery Storage',
    content: (
      <>
        <p>
          Lithium-ion batteries store significant energy and must be installed with appropriate
          safety measures. The key safety requirements are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — the battery must be installed in a location with
                adequate ventilation, away from heat sources, and not in an escape route (hallway,
                stairwell). A garage, utility room, or external wall-mounted enclosure are common
                locations. The manufacturer installation manual specifies minimum clearances around
                the unit for ventilation and access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — while thermal runaway events in domestic battery
                systems are rare, the consequence is severe. The battery must not be installed
                adjacent to combustible materials without a fire-rated barrier. Some manufacturers
                provide or require a fire-rated backing plate. Follow the manufacturer instructions
                exactly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC isolation</strong> — the DC side of the battery system must have a
                dedicated DC isolator for safe maintenance. This isolator must be accessible and
                clearly labelled. The inverter typically has an integrated DC isolator, but a
                separate external DC isolator may also be required depending on the installation
                layout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC isolation</strong> — the AC connection to the consumer unit must have a
                dedicated MCB or RCBO, clearly labelled to indicate the battery storage system. An
                AC isolator adjacent to the inverter provides local isolation for maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labelling</strong> — warning labels must be applied at the consumer unit,
                the meter position, and the battery/inverter location. Labels must indicate "DUAL
                SUPPLY" or "BATTERY STORAGE — ISOLATE BEFORE WORKING" (or similar wording per BS
                7671 and DNO requirements). This protects other electricians and emergency services
                who may not be aware of the battery system.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The installer must follow the manufacturer installation manual in addition to BS 7671. If
          there is a conflict between the two, contact the manufacturer technical support for
          clarification. The manufacturer manual takes precedence for product-specific safety
          requirements; BS 7671 governs the general electrical installation.
        </p>
      </>
    ),
  },
  {
    id: 'mcs-certification',
    heading: 'MCS Certification for Battery Storage Installers',
    content: (
      <>
        <p>
          MCS (Microgeneration Certification Scheme) certification is a quality assurance scheme for
          renewable energy installers. For battery storage installations, MCS certification matters
          for two reasons:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee (SEG)</strong> — energy suppliers are required to
                offer SEG payments for exported electricity, but only if the installation is carried
                out by an MCS-certified installer using MCS-certified products. Without MCS
                certification, the homeowner cannot access SEG payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quality assurance</strong> — MCS certification requires the installer to
                demonstrate competence, follow documented installation procedures, and comply with
                MCS installation standards (MIS 3002 for battery storage). The scheme includes
                regular audits and customer satisfaction monitoring. Many manufacturers require MCS
                certification for their product warranty to remain valid.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Becoming MCS-certified involves joining an MCS-registered certification body (such as
          NICEIC, NAPIT, or MCS-specific bodies), demonstrating relevant qualifications (including
          C&G 2399 or equivalent for battery storage), and passing an assessment. The process
          typically takes 2 to 4 months and involves ongoing compliance costs. For electricians
          entering the battery storage market, MCS certification is a strong differentiator and
          unlocks a larger customer base.
        </p>
      </>
    ),
  },
  {
    id: 'electrical-installation',
    heading: 'Electrical Installation Requirements',
    content: (
      <>
        <p>
          The electrical connections for a home battery system must comply with BS 7671 and the
          manufacturer installation manual. The key installation requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC connection</strong> — the inverter AC output is connected to the consumer
                unit via an appropriately sized cable and dedicated MCB or RCBO. The cable must be
                sized for the maximum inverter output current, accounting for voltage drop if the
                inverter is remote from the consumer unit. A typical 5kW inverter on single phase
                requires a 25A or 32A circuit with 6.0mm cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC wiring</strong> — the DC cables between the battery and inverter must be
                correctly sized for the DC current and protected against overcurrent and short
                circuit. DC cables must be clearly labelled and segregated from AC cables.
                Manufacturer-supplied DC cables and connectors should be used where provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CT clamp (current transformer)</strong> — most battery systems use a CT
                clamp on the meter tails to monitor the household import/export in real time. The CT
                clamp must be installed on the correct conductor (usually the live meter tail) with
                the correct orientation. Incorrect CT clamp installation causes the battery to
                charge when it should discharge, and vice versa.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — the inverter and battery enclosures must be
                earthed to the main earthing terminal. If the system includes an earth rod (for
                example, for a TT installation), it must be tested and bonded correctly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          can be used for the AC cable between the inverter and consumer unit. For DC cables, follow
          the manufacturer specification — the cable type, size, and maximum length are usually
          specified in the installation manual.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The electrical installation for a battery storage system must be tested and certified in
          accordance with BS 7671. The scope of testing includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Continuity of protective conductors (inverter and battery enclosure to MET)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Insulation resistance of all new AC circuits (500V DC, minimum 1 megohm)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification at all AC termination points</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) on the inverter AC circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD operation on the inverter circuit (if RCBO or RCD protected)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Functional testing — verify the system charges, discharges, and responds to CT clamp
                readings correctly
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          must be issued for the new circuits. If the work includes a consumer unit modification or
          new circuits, an EIC is appropriate. The certificate should note the battery storage
          system and reference the G98/G99 notification. The homeowner needs this certificate for
          their records, for the DNO notification, and for MCS compliance documentation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing Your Battery Storage Business',
    content: (
      <>
        <p>
          Battery storage installation is a fast-growing market with strong margins. A typical
          domestic installation (battery, inverter, wiring, testing, and commissioning) is worth
          £3,000 to £8,000 for the electrical package alone. Combined with solar PV, the total
          project value can exceed £15,000.
        </p>
        <p>
          To compete in this market, electricians need to quote accurately, install efficiently, and
          produce professional documentation. Here is how Elec-Mate helps:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the AC cable from inverter to consumer unit with the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Automatic voltage drop check and derating for installation method. Get the
                  correct cable size on the survey, not after you have started the installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the battery storage installation with Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Battery unit, inverter, cables, accessories, labour, testing, commissioning, and
                  DNO notification — all itemised with your margins. Professional PDF quote sent to
                  the customer from the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Electrical Installation Certificate on site after commissioning. AI
                  board scanning, voice test entry, and instant PDF export. Send the certificate to
                  the homeowner and your MCS documentation folder before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify battery storage systems"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for battery storage installations. 7-day free trial."
          icon={Battery}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BatteryStorageGuidePage() {
  return (
    <GuideTemplate
      title="Battery Storage Installation | Home Battery Guide UK"
      description="Complete guide to home battery storage installation in the UK. AC-coupled vs DC-coupled, battery sizing, inverter selection, safety requirements, MCS certification, DNO notification, and electrical testing and certification."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Battery}
      heroTitle={
        <>
          Battery Storage Installation:{' '}
          <span className="text-yellow-400">Home Battery Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Home battery storage is booming. This guide covers AC-coupled vs DC-coupled systems, battery sizing, inverters, safety requirements, MCS certification, DNO notification, and the electrical installation and certification process."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Home Battery Storage"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Battery Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for battery storage installations. 7-day free trial, cancel anytime."
    />
  );
}
