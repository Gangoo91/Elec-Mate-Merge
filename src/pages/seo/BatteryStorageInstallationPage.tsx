import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Battery,
  Zap,
  PoundSterling,
  ShieldCheck,
  AlertTriangle,
  Settings,
  FileCheck2,
  Home,
  Sun,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [{ label: 'Energy Storage', href: '/battery-storage-installation' }];

const tocItems = [
  { id: 'battery-types', label: 'Battery Types' },
  { id: 'popular-systems', label: 'Popular Systems' },
  { id: 'ac-vs-dc-coupled', label: 'AC vs DC Coupled' },
  { id: 'sizing', label: 'Sizing Your System' },
  { id: 'costs', label: 'Installation Costs' },
  { id: 'grid-connection', label: 'Grid Connection & G99' },
  { id: 'mcs-grants', label: 'MCS Certification & Grants' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Home battery storage systems typically range from 5 kWh to 15 kWh capacity, with most UK households choosing a 10 kWh system to cover overnight demand and morning peaks.',
  'Lithium iron phosphate (LFP) batteries offer superior cycle life (3,000–6,000 cycles), wider operating temperature range, and enhanced thermal stability compared to standard lithium-ion NMC chemistry.',
  'AC-coupled systems can be retrofitted to any existing solar PV installation regardless of inverter brand, while DC-coupled systems achieve higher round-trip efficiency (90–95%) but require compatible or replacement inverters.',
  'Installations over 16 A per phase (3.68 kW) require G99 notification to the Distribution Network Operator (DNO) before energisation. Most home battery systems fall below this threshold and use the simpler G98 registration.',
  'MCS (Microgeneration Certification Scheme) certification of the installer is required to access the Smart Export Guarantee (SEG) and any government grant funding such as the ECO4 scheme.',
  'Installed costs in the UK range from £3,000 to £8,000 depending on battery capacity, brand, and whether the system is AC or DC coupled.',
];

const faqs = [
  {
    question: 'How long does a home battery storage system last?',
    answer:
      'Most lithium iron phosphate (LFP) batteries are warranted for 6,000 cycles or 10 years at 80% capacity retention. Lithium-ion NMC batteries are typically warranted for 3,000–4,000 cycles or 10 years. At one charge-discharge cycle per day, LFP batteries will comfortably exceed 15 years of useful life. Cycle life is the more important metric than calendar age for battery longevity.',
  },
  {
    question: 'Do I need planning permission to install a home battery system?',
    answer:
      'Stand-alone battery storage systems installed within a dwelling or outbuilding generally fall within permitted development rights and do not require planning permission. If the battery is being co-installed with solar panels that would otherwise require planning permission (listed buildings, conservation areas), those planning rules apply to the whole installation. Always confirm with your local planning authority if in doubt.',
  },
  {
    question: 'What is the difference between G98 and G99 notification?',
    answer:
      'G98 (formerly G83) applies to micro-generating systems up to 16 A per phase (3.68 kW single-phase, 11.04 kW three-phase). The installer notifies the Distribution Network Operator (DNO) within 28 days after installation. G99 (formerly G59) applies to larger systems over these thresholds and requires prior approval from the DNO before installation, which can take 6–12 weeks. Most home battery systems are G98 compliant, but always check the inverter/battery output rating.',
  },
  {
    question: 'Can I install a battery storage system without solar panels?',
    answer:
      'Yes. A battery-only system can charge from cheap off-peak electricity (for example, on an Octopus Go or Octopus Agile tariff) and discharge during peak periods. Without solar, the round-trip efficiency (typically 88–95%) means you need a significant spread between import and export or peak and off-peak tariff rates to achieve payback. Many households install battery-only first and add solar later as an AC-coupled upgrade.',
  },
  {
    question: 'Which battery storage system is best for a UK home?',
    answer:
      'The most popular systems in the UK are the Tesla Powerwall 2 (13.5 kWh), GivEnergy All-in-One (9.5 kWh), SolarEdge Home Battery (9.7 kWh), and various Growatt and Fox ESS units. Tesla Powerwall 3 (13.5 kWh, integrated inverter) launched in 2024 and suits new solar installations. GivEnergy is popular for retrofits due to wide inverter compatibility. The best system depends on your existing solar setup, available space, and budget.',
  },
  {
    question: 'How much can I save with a home battery storage system?',
    answer:
      'Annual savings depend heavily on your tariff, consumption pattern, and whether you have solar PV. A typical UK household with solar and a 10 kWh battery on a time-of-use tariff can save £400–£900 per year compared to standard import/export without storage. Battery-only systems on Octopus Agile typically save £200–£400 per year. Payback periods range from 7 to 15 years depending on system cost and electricity price movements.',
  },
  {
    question: 'Does a battery storage installer need to be MCS certified?',
    answer:
      'MCS certification is not legally required for battery installation itself, but it is required if the customer wants to apply for the Smart Export Guarantee (SEG) for any associated solar PV export, or to access certain government grant schemes. Many DNOs also prefer MCS-certified installers for G98 and G99 notifications. NICEIC, NAPIT, and ELECSA registration is required for the electrical work under Part P and for notification to the DNO.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/hybrid-solar-battery-system',
    title: 'Hybrid Solar Battery System',
    description: 'How hybrid solar and battery systems work together to maximise self-consumption.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/off-grid-electrical-system',
    title: 'Off-Grid Electrical Systems',
    description: 'Designing off-grid power systems for remote properties and narrowboats.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/digital-certificates-app',
    title: 'Electrical Certificates App',
    description:
      'Complete MCS and installation certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote battery storage installations accurately with AI-assisted pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'battery-types',
    heading: 'Battery Types: Lithium-Ion vs LFP',
    content: (
      <>
        <p>
          Two lithium chemistries dominate the UK home battery market: lithium-ion NMC (nickel
          manganese cobalt) and lithium iron phosphate (LFP). Understanding the difference helps
          homeowners and installers choose the right system.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lithium-ion NMC</strong> — higher energy density (more kWh per kilogram),
                lower upfront cost per kWh, but shorter cycle life (2,000–4,000 cycles) and less
                thermal stability. The Tesla Powerwall 2 uses NMC chemistry. Suitable for most
                domestic installations where space is not severely constrained.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lithium iron phosphate (LFP)</strong> — lower energy density but
                significantly better cycle life (4,000–6,000 cycles), wider operating temperature
                range (−20°C to +60°C), and inherently safer chemistry with no thermal runaway risk.
                Used in GivEnergy, Fox ESS, and many Growatt units. The preferred chemistry for UK
                garage and outbuilding installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-acid (legacy)</strong> — still used in some off-grid and narrowboat
                installations due to low upfront cost, but poor cycle life (300–500 cycles), high
                maintenance requirements, and very low depth of discharge (50%) make them unsuitable
                for modern grid-tied home storage.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most UK homes, LFP is now the preferred chemistry for new installations. The cycle
          life advantage means a well-specified LFP system will outlast the 10-year warranty period
          comfortably, while NMC systems may degrade more noticeably toward the end of warranty.
        </p>
      </>
    ),
  },
  {
    id: 'popular-systems',
    heading: 'Popular Home Battery Systems in the UK',
    content: (
      <>
        <p>
          The UK market has matured rapidly since 2020. The following systems are among the most
          frequently installed by UK electricians and solar installers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tesla Powerwall 2</strong> — 13.5 kWh usable, NMC, AC-coupled, 5 kW
                continuous power, built-in inverter, app-controlled. The market leader in the UK.
                Powerwall 3 (2024) adds integrated solar inverter for new installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GivEnergy All-in-One</strong> — 9.5 kWh LFP, hybrid inverter built in,
                modular (add batteries), popular for retrofits and new systems alike. The GivEnergy
                Eco range starts at 5 kWh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SolarEdge Home Battery</strong> — 9.7 kWh LFP, DC-coupled, requires
                SolarEdge inverter. Excellent integration with SolarEdge solar systems. Available in
                stacked 4.6 kWh modules.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Growatt</strong> — competitively priced LFP units (5–15 kWh), wide inverter
                compatibility, popular in the installer market for budget-conscious installations.
                SPH hybrid inverter range is well-regarded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fox ESS</strong> — LFP chemistry, modular 2.56 kWh to 20+ kWh, hybrid and
                AC-coupled options. Well-suited to installer-focused businesses and popular in the
                UK trade channel.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Brand availability and pricing change frequently. Electricians should check trade
          distributor pricing (CEF, Rexel, Yesss) for current landed costs before quoting customers.
        </p>
      </>
    ),
  },
  {
    id: 'ac-vs-dc-coupled',
    heading: 'AC Coupled vs DC Coupled Battery Systems',
    content: (
      <>
        <p>
          The coupling method determines how the battery connects to the solar PV array and the grid
          — and has significant implications for retrofit vs new installation scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC coupling</strong> — the battery system has its own inverter/charger and
                connects to the AC side of the installation. Solar energy is converted DC→AC by the
                solar inverter, then AC→DC to charge the battery, then DC→AC to discharge. Two
                conversion steps means slightly lower efficiency (85–90% round-trip) but
                compatibility with any solar inverter on the market. The Tesla Powerwall 2 is
                AC-coupled. Ideal for retrofitting to existing solar installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC coupling</strong> — the battery connects directly on the DC side between
                the solar panels and the hybrid inverter. One conversion step (DC→AC) means higher
                round-trip efficiency (90–95%). Requires a compatible hybrid inverter (SolarEdge,
                GivEnergy, Growatt, Fox ESS). Best for new installations or when replacing an
                existing inverter.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For retrofit installations where the existing solar inverter is in good condition and
          mid-life, AC coupling is usually the most cost-effective approach. For new solar + battery
          projects, DC coupling with a hybrid inverter delivers better efficiency and simpler
          installation.
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
          Correct battery sizing is critical to achieving the expected return on investment.
          Oversizing wastes capital; undersizing means missed savings opportunities during evening
          and morning peaks.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical UK household</strong> — a 3–4 bedroom home with average consumption
                of 3,500–5,000 kWh per year will typically benefit from a 10 kWh battery. This
                covers overnight demand (5–7 kWh) and morning peak before solar generation begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smaller properties</strong> — 1–2 bedroom flats and houses with annual
                consumption under 2,500 kWh are well served by 5–7 kWh systems. Going larger
                provides diminishing returns when the battery cannot be fully cycled each day.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging households</strong> — if an electric vehicle is charged
                overnight from the battery rather than from the grid, 13–15 kWh of storage is
                recommended. This is particularly relevant for Octopus Go or Intelligent Octopus
                tariff users who want to buffer cheap overnight electricity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sizing calculation</strong> — review 12 months of smart meter half-hourly
                data (available from Octopus, British Gas, or via the DCC n3rgy API). Identify
                average evening discharge requirement (typically 18:00–07:00) and size the battery
                to cover at least 80% of that figure for optimal cycle utilisation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Battery Storage Installation Costs (2025)',
    content: (
      <>
        <p>
          Installed costs have fallen significantly since 2020 but remain a substantial investment.
          The following figures represent typical UK installed prices in 2025 inclusive of
          equipment, labour, scaffolding (if needed), DNO notification, and commissioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 kWh LFP system (AC-coupled retrofit)</strong> — £3,000 to £4,500
                installed. Suitable for smaller properties already with solar PV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10 kWh system (hybrid DC-coupled, new install)</strong> — £4,500 to £6,500
                installed. The most popular specification for new UK solar + battery projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tesla Powerwall 3 (13.5 kWh, integrated inverter)</strong> — £6,500 to
                £8,500 installed by Tesla-approved installers. Includes solar inverter function.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>15 kWh modular system (LFP)</strong> — £6,000 to £8,000 installed. Growatt,
                GivEnergy, or Fox ESS modular stacks. Appropriate for EV households.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Battery storage installations are currently zero-rated for VAT in the UK when supplied and
          installed together (Finance Act 2022, Energy Saving Materials relief). This represents a
          significant saving compared to the former 20% VAT rate.
        </p>
      </>
    ),
  },
  {
    id: 'grid-connection',
    heading: 'Grid Connection Requirements',
    content: (
      <>
        <p>
          All grid-connected battery storage systems that can export electricity must meet the
          requirements of Engineering Recommendation G98 or G99, depending on the system size. These
          are the DNO standards for connecting generation and storage equipment to the low-voltage
          distribution network.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 (up to 3.68 kW single-phase)</strong> — notification to the DNO within
                28 days after commissioning. The inverter must have a G98-compliant protection relay
                with loss of mains (LoM) detection (Vector Shift or ROCOF). Most domestic battery
                systems qualify for G98.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 (over 3.68 kW per phase)</strong> — prior approval required from the DNO
                before installation. Application submitted with system design documentation,
                single-line diagram, and protection settings. DNO response typically takes 6–12
                weeks. Required for three-phase installations or high-capacity single-phase systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export limitation</strong> — where the DNO has concerns about local network
                capacity, they may require export limitation (typically to zero export or a
                specified kW limit). An export limitation device or software-controlled inverter
                setting is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee (SEG)</strong> — to receive SEG payments for exported
                electricity, the property must have a smart meter (SMETS2) capable of half-hourly
                export metering. The installer and products must be MCS certified.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs-grants',
    heading: 'MCS Certification and Grant Eligibility',
    content: (
      <>
        <p>
          MCS (Microgeneration Certification Scheme) is the industry standard for small-scale
          renewable energy and storage installations in the UK. MCS certification of both the
          installer and the products is required to access the Smart Export Guarantee and most
          government grant funding streams.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installer certification</strong> — the installing company must hold
                current MCS accreditation for battery storage (MCS 010). Installers apply through
                approved certification bodies (NICEIC, NAPIT, ELECSA, TrustMark).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS product certification</strong> — the battery system must appear on the
                MCS product register. All major brands (Tesla, GivEnergy, SolarEdge, Growatt, Fox
                ESS) maintain MCS-listed products, but always verify the specific model and firmware
                version on the MCS database before installing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO4 and LA Flex</strong> — the Energy Company Obligation (ECO4) scheme can
                fund battery storage for eligible low-income households as part of whole-house
                retrofit packages. Local Authority Flexible eligibility (LA Flex) widens access. MCS
                certification is required for all funded measures.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing Your Battery Storage Business',
    content: (
      <>
        <p>
          Battery storage is one of the fastest-growing segments in the UK electrical industry.
          Electricians with the right qualifications and equipment can build a profitable battery
          storage installation business alongside existing domestic and commercial work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/digital-certificates-app">
                    Elec-Mate certificates app
                  </SEOInternalLink>{' '}
                  to complete MCS installer certificates, commissioning sheets, and G98 notification
                  paperwork on your phone. Send completed documents to the customer before leaving
                  site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Battery Upgrades From EICR Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every solar EICR or consumer unit upgrade is an opportunity to quote battery
                  storage. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to generate a professional battery storage proposal on site while the customer is
                  engaged.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage your battery storage installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site certificates, quoting, and job management. Complete MCS commissioning documents and G98 notifications on your phone. 7-day free trial."
          icon={Battery}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BatteryStorageInstallationPage() {
  return (
    <GuideTemplate
      title="Home Battery Storage Installation UK | Energy Storage Guide 2025"
      description="Complete guide to home battery storage installation in the UK. Battery types (lithium-ion, LFP), popular systems (Tesla Powerwall, GivEnergy, SolarEdge, Growatt, Fox ESS), AC vs DC coupled, sizing 5–15 kWh, costs £3,000–£8,000, G99 grid connection, and MCS certification for grants."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Energy Storage Guide"
      badgeIcon={Battery}
      heroTitle={
        <>
          Home Battery Storage Installation UK:{' '}
          <span className="text-yellow-400">Energy Storage Guide 2025</span>
        </>
      }
      heroSubtitle="Everything you need to know about home battery storage installation in the UK — battery chemistry, popular systems, AC vs DC coupling, system sizing, installed costs from £3,000, G99 grid connection requirements, and MCS certification for grant eligibility."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Home Battery Storage"
      relatedPages={relatedPages}
      ctaHeading="Certificate Battery Storage Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site MCS commissioning documents, G98 notifications, and electrical certificates. 7-day free trial, cancel anytime."
    />
  );
}
