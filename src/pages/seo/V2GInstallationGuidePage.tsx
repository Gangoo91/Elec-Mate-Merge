import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Car,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  ArrowLeftRight,
  Plug,
  PoundSterling,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Vehicle to Grid', href: '/guides/vehicle-to-grid-installation' },
];

const tocItems = [
  { id: 'overview', label: 'What Is V2G?' },
  { id: 'how-it-works', label: 'How Bidirectional Charging Works' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'dno-requirements', label: 'DNO Requirements and G99' },
  { id: 'compatible-vehicles', label: 'Compatible Vehicles and Chargers' },
  { id: 'grid-services', label: 'Grid Services Revenue' },
  { id: 'installation-process', label: 'Installation Process' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Vehicle to Grid (V2G) allows electric vehicles to export stored energy back to the home or grid via a bidirectional charger, turning the EV battery into a mobile energy storage asset.',
  'Bidirectional chargers must comply with BS 7671:2018+A3:2024 including Regulation 825.1 (EEMS control of bi-directional energy flows), Regulation 826.5 (earthing and bonding for V2G operation), and Regulation 826.1.4 (protective devices for bidirectional current flows).',
  'A G99 application to the DNO is required before connecting any V2G charger, as the system is capable of exporting power to the grid. G98 is not sufficient for bidirectional installations.',
  'Grid services revenue (frequency response, demand-side response, peak shaving) can earn EV owners between £300 and £800 per year, making V2G financially attractive alongside smart tariff arbitrage.',
  'The installation requires a dedicated circuit from the consumer unit, CT clamp monitoring, anti-islanding protection, and clear dual-supply labelling at the meter position and consumer unit.',
];

const faqs = [
  {
    question: 'What is Vehicle to Grid (V2G) and how does it differ from standard EV charging?',
    answer:
      'Standard EV charging is unidirectional — electricity flows from the grid to the vehicle battery. Vehicle to Grid (V2G) uses a bidirectional charger that can also push electricity from the vehicle battery back into the home (Vehicle to Home, V2H) or into the grid (Vehicle to Grid, V2G). The EV effectively becomes a mobile battery storage system. A typical EV has a 60 to 80kWh battery — far larger than any domestic battery storage system — so even exporting a fraction of its capacity can power a home for hours or provide valuable grid services.',
  },
  {
    question: 'Which electric vehicles support V2G in the UK?',
    answer:
      'As of 2026, the Nissan Leaf (via CHAdeMO) was the first widely available V2G-compatible vehicle in the UK. The Nissan e-NV200, Mitsubishi Outlander PHEV, and several newer models from Hyundai, Kia, and BYD support bidirectional charging via CCS. The key requirement is that the vehicle must support the ISO 15118-20 communication protocol for bidirectional power flow. Not all EVs with large batteries support V2G — the vehicle firmware and onboard charger must be designed for it. Always check the manufacturer specification before quoting a V2G installation.',
  },
  {
    question: 'Do I need DNO approval for a V2G charger installation?',
    answer:
      'Yes. Because a V2G charger can export power to the grid, it must be notified to the Distribution Network Operator (DNO) under Engineering Recommendation G99. This is an application process, not just a notification — the DNO must approve the connection before the system is energised. G99 applications can take 4 to 12 weeks depending on the local network capacity. G98 (which is a simple notification for systems up to 16A per phase) is not sufficient for V2G because the system is capable of export. Submit the G99 application early in the project to avoid delays.',
  },
  {
    question: 'How much can homeowners earn from V2G grid services?',
    answer:
      'V2G revenue depends on the grid services the homeowner participates in and the aggregator platform used. Frequency response services (where the charger adjusts power output in real time to stabilise the grid) typically earn £200 to £400 per year. Demand-side response (exporting during peak demand events) can add £100 to £300 per year. Combined with smart tariff arbitrage (charging at off-peak rates and discharging during peak), total annual savings and revenue of £500 to £1,000 are realistic. The aggregator takes a platform fee, typically 10% to 20% of revenue.',
  },
  {
    question: 'What electrical work is involved in a V2G installation?',
    answer:
      'A V2G installation involves running a dedicated radial circuit from the consumer unit to the charger location (typically 32A or 40A depending on the charger), installing an appropriate RCBO or Type B RCD (to handle DC residual currents from the bidirectional inverter), fitting a CT clamp on the meter tails for import/export monitoring, installing the bidirectional charger unit (wall-mounted, typically near the parking position), connecting the charger to the home network (Wi-Fi or Ethernet for smart control and aggregator communication), and applying dual-supply warning labels at the consumer unit, meter position, and charger location. The installation must also include anti-islanding protection to prevent export during a grid outage.',
  },
  {
    question: 'Does V2G degrade the EV battery faster?',
    answer:
      'This is the most common customer concern. Current research and real-world data from V2G trials (including the Sciurus trial in the UK) suggest that intelligent V2G cycling does not significantly accelerate battery degradation beyond normal driving use. V2G systems typically limit the depth of discharge (keeping the battery between 20% and 80% state of charge) and use relatively low charge/discharge rates compared to rapid DC charging. Some studies suggest that V2G can actually reduce degradation by keeping the battery in its optimal temperature and charge range. Most EV manufacturers now warrant batteries for 8 years or 100,000 miles regardless of V2G use, though some older warranty terms may exclude V2G — check the manufacturer position before advising customers.',
  },
  {
    question: 'Can V2G provide backup power during a grid outage?',
    answer:
      'Yes, if the bidirectional charger supports Vehicle to Home (V2H) mode with islanding capability. In V2H mode, the charger disconnects from the grid (to prevent back-feeding) and powers the home circuits from the EV battery. A 60kWh EV battery could power a typical home for 2 to 3 days in an emergency. However, V2H requires additional wiring — a changeover switch or automatic transfer switch to isolate the backed-up circuits from the grid. Not all V2G chargers support V2H islanding, so specify this at the quoting stage if the customer requires backup capability.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Standard unidirectional EV charger installation guide covering circuit design, RCD selection, and DNO notification.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/battery-storage-installation',
    title: 'Battery Storage Installation',
    description:
      'Home battery storage systems share many installation principles with V2G — sizing, inverters, and DNO notification.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the dedicated circuit cable for V2G charger installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for V2G charger installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/ev-charger-certificate',
    title: 'EV Charger Certificate',
    description: 'Dedicated EV charger installation certificate with V2G-specific fields.',
    icon: ClipboardCheck,
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
    heading: 'What Is Vehicle to Grid (V2G)?',
    content: (
      <>
        <p>
          Vehicle to Grid — commonly referred to as V2G — is a technology that allows electric
          vehicles to feed stored energy back into the home electrical installation or the wider
          electricity grid. Instead of an EV being a passive load that only consumes electricity,
          V2G turns it into a distributed energy storage asset.
        </p>
        <p>
          A typical electric vehicle has a battery capacity of 60 to 80kWh — significantly larger
          than any domestic battery storage system (which are typically 5 to 13kWh). Even using a
          fraction of this capacity for grid services or home backup represents a substantial energy
          resource.
        </p>
        <p>
          V2G requires a bidirectional charger (sometimes called a bi-directional EVSE) that can
          convert AC from the grid to DC for charging the vehicle, and convert DC from the vehicle
          battery back to AC for export. The charger communicates with the vehicle via ISO 15118 to
          manage the power flow, state of charge limits, and scheduling.
        </p>
        <p>
          For electricians, V2G represents a significant upskilling opportunity. The installation is
          more complex than a standard EV charger, commands a higher price point, and positions you
          in a rapidly growing market. This guide covers the regulations, DNO requirements,
          compatible vehicles, installation process, and certification requirements.
        </p>
      </>
    ),
  },
  {
    id: 'how-it-works',
    heading: 'How Bidirectional Charging Works',
    content: (
      <>
        <p>
          A bidirectional charger contains an inverter that can operate in two directions. In
          charging mode, it converts grid AC to DC and pushes it into the vehicle battery. In
          discharging mode, it draws DC from the vehicle battery, converts it to AC, and feeds it
          into the home circuits or exports it to the grid.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Vehicle to Home (V2H)</h3>
            <p className="text-white text-sm leading-relaxed">
              The EV battery powers the home circuits directly. The charger island-disconnects from
              the grid (if the grid is down) or supplements grid supply (if the grid is live).
              Useful for peak shaving — running the home from the EV during expensive peak hours and
              recharging overnight at off-peak rates. Also provides emergency backup power during
              grid outages.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Vehicle to Grid (V2G)</h3>
            <p className="text-white text-sm leading-relaxed">
              The EV battery exports power beyond the home and into the distribution network. This
              enables participation in grid services — frequency response, demand-side response, and
              capacity market programmes. An aggregator platform manages the export scheduling and
              revenue. V2G requires G99 DNO approval because power is being exported.
            </p>
          </div>
        </div>
        <p>
          Both modes require the bidirectional charger to include anti-islanding protection — the
          system must automatically disconnect from the grid if the grid supply fails, to prevent
          back-feeding that could endanger DNO engineers working on the network.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Standards for V2G Installation',
    content: (
      <>
        <p>
          V2G installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          including several regulations specifically relevant to bidirectional energy flows and
          energy management systems:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 825.1</strong> — requires the Electrical Energy Management System
                (EEMS) to control bi-directional energy flows between storage units or electric
                vehicles and the installation, managing inverter modes, V2G operations, charging
                windows, and export prioritisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 826.1.4</strong> — requires that protective devices account for
                bidirectional current flows and reverse feeding modes, which can alter fault current
                paths and polarity. Directional or polarity-aware protection may be necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 826.5</strong> — addresses earthing and equipotential bonding for
                EVs operating as local storage units, including safe disconnection and prevention of
                touch voltages during V2G operation. Particularly important where the EV is not
                permanently connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 825.2</strong> — requires the EEMS to support bidirectional
                exchange of information with the DSO (Distribution System Operator) for operational
                commands, telemetry, and status reporting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 740.415.1</strong> — covers cable selection where reverse feeding
                may alter fault currents and thermal stresses, requiring correct conductor sizing
                for bidirectional currents.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Additionally, the{' '}
          <SEOInternalLink href="/guides/iet-code-of-practice-ev">
            IET Code of Practice for EV Charging
          </SEOInternalLink>{' '}
          provides detailed guidance on bidirectional charger installations. The charger itself must
          comply with the relevant product standards and carry a UKCA or CE mark.
        </p>
      </>
    ),
  },
  {
    id: 'dno-requirements',
    heading: 'DNO Requirements and G99 Application',
    content: (
      <>
        <p>
          Because a V2G charger can export power to the distribution network, it falls under
          Engineering Recommendation G99 — not G98. This is a critical distinction from standard EV
          charger installations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application required</strong> — submit the application to the local DNO
                before ordering the charger. Include the charger specification (make, model, rated
                power, export capability), the property address, MPAN number, and the proposed
                connection arrangement. The DNO assesses whether the local network can accommodate
                the export.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approval timeline</strong> — G99 applications typically take 4 to 12 weeks.
                For systems up to 3.68kW single-phase export, the process is usually
                straightforward. Larger export capacities or areas with network constraints may
                require a network study, which can extend the timeline. Start the application early.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Anti-islanding protection</strong> — the V2G charger must include
                type-tested anti-islanding protection that disconnects from the grid within the time
                limits specified by G99. This protects DNO engineers and prevents uncontrolled
                export.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning notification</strong> — after installation, a G99
                commissioning confirmation form must be submitted to the DNO with the test results
                and the installer details. The system must not be energised for export until the DNO
                has been notified.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the property already has solar PV with an existing G98 or G99 notification, the V2G
          charger must be included in an updated application — the total export capacity of all
          connected generation and storage must be assessed together.
        </p>
      </>
    ),
  },
  {
    id: 'compatible-vehicles',
    heading: 'Compatible Vehicles and Bidirectional Chargers',
    content: (
      <>
        <p>
          Not all electric vehicles support bidirectional charging. The vehicle must have an onboard
          charger and battery management system that supports reverse power flow, and the vehicle
          firmware must implement the ISO 15118-20 communication protocol.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CHAdeMO vehicles</strong> — the Nissan Leaf and e-NV200 were the first
                widely available V2G-compatible vehicles in the UK, using the CHAdeMO DC charging
                protocol. CHAdeMO has supported bidirectional charging since its inception. However,
                CHAdeMO is being phased out in favour of CCS in Europe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCS bidirectional</strong> — the Combined Charging System (CCS) now supports
                bidirectional power flow via ISO 15118-20. Hyundai Ioniq 5, Kia EV6, BYD Atto 3, and
                several other models support CCS V2G (or are receiving firmware updates to enable
                it). CCS is the future standard for V2G in the UK and Europe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bidirectional chargers</strong> — the charger must match the vehicle
                connector type. Wallbox Quasar (CHAdeMO and CCS versions), Indra Smart PRO, and
                myenergi Zappi V2G are among the chargers available in the UK market. Rated power is
                typically 6 to 10kW for domestic V2G chargers.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always confirm V2G compatibility with both the vehicle manufacturer and the charger
          manufacturer before quoting. Vehicle software updates can enable or disable V2G support,
          and not all trim levels or battery options within a model range may be compatible.
        </p>
      </>
    ),
  },
  {
    id: 'grid-services',
    heading: 'Grid Services Revenue for V2G Owners',
    content: (
      <>
        <p>
          One of the key selling points of V2G is the ability to earn revenue by providing services
          to the electricity grid. This is managed through aggregator platforms that pool many V2G
          chargers into a virtual power plant.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequency response</strong> — the National Grid ESO procures frequency
                response services to keep the grid at 50Hz. V2G chargers can adjust their
                charge/discharge rate in real time to help stabilise frequency. This is the highest
                value grid service, typically earning £200 to £400 per year per charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demand-side response (DSR)</strong> — during peak demand events, V2G
                chargers export stored energy to reduce strain on the network. Payments vary by
                event but typically earn £100 to £300 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tariff arbitrage</strong> — charging at off-peak rates (as low as 7p/kWh on
                some tariffs) and discharging during peak hours (35 to 50p/kWh) generates direct
                savings. With a 10kWh daily cycle, this can save £200 to £400 per year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Combined, V2G revenue and savings of £500 to £1,000 per year are realistic. At a V2G
          charger cost of £3,000 to £5,000 (including installation), the payback period is 3 to 7
          years — competitive with domestic battery storage.
        </p>
      </>
    ),
  },
  {
    id: 'installation-process',
    heading: 'V2G Installation Process',
    content: (
      <>
        <p>
          A V2G installation follows a similar process to a standard EV charger but with additional
          steps for the bidirectional capability, DNO application, and grid services setup.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Site survey</strong> — assess the existing electrical installation,
                consumer unit capacity, earthing arrangement (TN-C-S, TN-S, or TT), meter tails
                rating, and the proposed charger location. Check the vehicle is V2G-compatible.
                Photograph the consumer unit, meter position, and cable route.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. G99 application</strong> — submit to the local DNO with the charger
                specification and site details. Do this immediately after the survey — it takes 4 to
                12 weeks and is the critical path item.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Electrical installation</strong> — run a dedicated radial circuit from
                the consumer unit to the charger location. Typically 6.0mm or 10.0mm twin and earth
                (or SWA for external runs) on a 32A or 40A RCBO. Install CT clamp on the meter
                tails. Install the bidirectional charger and connect to the dedicated circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4. Commissioning</strong> — power on the charger, connect to the home
                network (Wi-Fi or Ethernet), register with the aggregator platform, pair with the
                vehicle, and test both charging and discharging modes. Verify CT clamp readings are
                correct (import vs export direction).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5. Labelling</strong> — apply dual-supply warning labels at the consumer
                unit, meter position, and charger location. Labels must indicate the presence of a
                bidirectional charger capable of export.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The electrical installation must be tested and certified in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>. The
          scope includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors (charger enclosure to MET)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance on the dedicated charger circuit (500V DC, minimum 1 megohm)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification at all termination points</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) on the charger circuit</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>RCD/RCBO operation (including Type B or Type A EV RCD as required)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Functional testing — verify charging mode, discharging mode, CT clamp direction,
                anti-islanding disconnection, and aggregator communication
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued for the new circuit. The certificate should note the V2G charger, the G99
          reference number, and the anti-islanding protection. The G99 commissioning confirmation
          form must also be submitted to the DNO after testing.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: The V2G Opportunity',
    content: (
      <>
        <p>
          V2G installation is a premium service with strong margins. A typical domestic V2G
          installation (charger, dedicated circuit, CT clamp, commissioning, DNO application, and
          certification) is worth £3,000 to £5,000 for the electrical package. Combined with the
          charger hardware (which you can supply and mark up), the total project value can exceed
          £7,000.
        </p>
        <p>
          The market is growing rapidly as more vehicles support bidirectional charging and grid
          services platforms mature. Electricians who upskill now will be well positioned as V2G
          moves from early adopter to mainstream.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the dedicated circuit for the V2G charger with the{' '}
                  <SEOInternalLink href="/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Automatic voltage drop check and derating for the installation method.
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
                  Price V2G installations accurately with Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Charger unit, dedicated circuit, CT clamp, commissioning, DNO application, and
                  certification — all itemised with your margins.
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
                  board scanning, voice test entry, and instant PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify V2G charger installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. Everything you need for V2G installations. 7-day free trial."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function V2GInstallationGuidePage() {
  return (
    <GuideTemplate
      title="Vehicle to Grid (V2G) Installation | UK Electrician Guide"
      description="Complete guide to Vehicle to Grid (V2G) installation in the UK. Bidirectional chargers, BS 7671 regulations, G99 DNO application, compatible vehicles, grid services revenue, installation process, and certification requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Emerging Technology"
      badgeIcon={ArrowLeftRight}
      heroTitle={
        <>
          Vehicle to Grid (V2G) Installation:{' '}
          <span className="text-yellow-400">UK Electrician Guide</span>
        </>
      }
      heroSubtitle="V2G turns electric vehicles into mobile energy storage assets. This guide covers bidirectional chargers, BS 7671 regulations, G99 DNO applications, compatible vehicles, grid services revenue, and the installation and certification process."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About V2G Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify V2G Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for V2G charger installations. 7-day free trial, cancel anytime."
    />
  );
}
