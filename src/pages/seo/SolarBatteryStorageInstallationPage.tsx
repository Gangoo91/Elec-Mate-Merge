import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Battery,
  Zap,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  Sun,
  FileCheck2,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-pv-system-design' },
  { label: 'Solar Battery Storage Installation', href: '/solar-battery-storage-installation' },
];

const tocItems = [
  { id: 'ac-vs-dc', label: 'AC-Coupled vs DC-Coupled Storage' },
  { id: 'popular-batteries', label: 'Popular Battery Systems' },
  { id: 'sizing', label: 'Battery Sizing' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'mcs-requirement', label: 'MCS Requirement' },
  { id: 'round-trip-efficiency', label: 'Round-Trip Efficiency' },
  { id: 'installation-requirements', label: 'Installation Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'AC-coupled storage can be retrofitted to any existing solar PV system regardless of inverter brand. DC-coupled storage requires a compatible hybrid inverter and is best specified at the time of the original solar installation.',
  'Popular UK battery systems include the Tesla Powerwall 3 (13.5 kWh), SolarEdge Home Battery (9.7 kWh), Givenergy All-In-One (8.2 kWh), and Growatt ARK (5.84–11.68 kWh).',
  'A typical UK home with 3,500 kWh/year consumption benefits most from a 5–10 kWh battery. A 5 kWh battery stores roughly 1–2 days of evening demand in summer but less in winter.',
  'Battery-only installation costs (excluding solar panels) typically range from £2,000 to £6,000 depending on capacity and brand, plus installation labour of £300–£800.',
  'MCS certification is required for battery storage to qualify for 0% VAT (when installed alongside solar PV), the Smart Export Guarantee, and ECO4 funding. Standalone battery installations without solar attract 20% VAT.',
  'Round-trip efficiency for lithium-ion batteries ranges from 90–97%, meaning for every 100 kWh stored, 90–97 kWh is available for use. Lead-acid alternatives offer 70–80% efficiency and are rarely used in modern domestic installations.',
];

const faqs = [
  {
    question: 'What is the difference between AC-coupled and DC-coupled battery storage?',
    answer:
      "In an AC-coupled system, the battery has its own inverter/charger and connects to the property's AC circuit. Solar energy from the existing inverter is converted from DC to AC, then reconverted to DC to charge the battery, then back to AC for use — three conversion steps mean slightly higher losses (typically 5–10%). AC-coupled systems can be retrofitted to any existing solar installation. In a DC-coupled system, the solar panels, battery, and hybrid inverter share a single conversion stage. Energy flows from panels directly to the battery (or loads) via the MPPT without an intermediate AC conversion, giving slightly better efficiency. DC-coupled systems must be planned at the outset and require a compatible hybrid inverter.",
  },
  {
    question: 'How much battery storage do I need for a typical UK home?',
    answer:
      'A typical UK three-bedroom home uses 3,500 kWh/year, with evening demand of approximately 4–6 kWh (the amount used after sunset when solar generation has stopped). A 5 kWh usable battery covers most summer evenings; a 10 kWh battery provides better coverage through autumn and winter evenings and allows for time-of-use tariff shifting. If you have an electric vehicle or heat pump, a larger battery of 10–15 kWh is more appropriate. Most battery systems allow for modular expansion — for example, the Givenergy All-In-One and Growatt ARK can be stacked to increase capacity.',
  },
  {
    question: 'How much does solar battery storage cost in the UK?',
    answer:
      'As of 2025, battery-only supply costs (excluding installation) are approximately: 5 kWh system (e.g., Growatt ARK 5.84) — £1,800–£2,500; 10 kWh system (e.g., Givenergy 9.5 kWh) — £3,000–£4,500; Tesla Powerwall 3 (13.5 kWh) — £8,000–£10,000 fully installed. Installation labour adds £300–£800 for a straightforward retrofit AC-coupled installation. DC-coupled installations requiring a hybrid inverter add £1,000–£2,000 for the inverter. A complete solar plus battery system (4 kWp solar + 10 kWh battery) typically costs £8,000–£14,000 installed.',
  },
  {
    question: 'Is MCS certification required for battery storage installation?',
    answer:
      'MCS certification is required for battery storage to qualify for 0% VAT (when installed alongside or at the same time as MCS-certified solar PV), the Smart Export Guarantee, and ECO4 grant funding. Standalone battery storage installed without solar — or added to an existing non-MCS system — attracts 20% VAT. All battery products must be listed on the MCS Product Directory. The installer must hold MCS certification for battery storage (a separate scope from solar PV, though many installers hold both).',
  },
  {
    question: 'What is the lifespan of a home solar battery?',
    answer:
      'Modern lithium iron phosphate (LFP) batteries, used in most current UK home storage systems, are typically warranted for 10 years or a specified number of charge cycles (e.g., 3,000–6,000 cycles) with a minimum end-of-warranty capacity of 60–80% of the original rating. In UK climate conditions with daily cycling, this equates to a real-world lifespan of 10–15 years. Lithium nickel manganese cobalt (NMC) batteries, used in some systems, have slightly higher energy density but may degrade faster under high-temperature conditions.',
  },
  {
    question: 'Can I retrofit a battery to my existing solar panels?',
    answer:
      'Yes — AC-coupled batteries can be added to virtually any existing solar PV system, regardless of the original inverter brand or age. The battery is installed as a separate unit with its own inverter/charger, connecting to the AC circuit at the consumer unit. No changes to the existing solar inverter or panels are required. The most common AC-coupled retrofit systems in the UK are the Tesla Powerwall 3, SolarEdge Home Battery (for existing SolarEdge systems), and Givenergy AC battery. A new generation meter and import/export meter (usually a smart meter) may be required.',
  },
  {
    question: 'What electrical regulations apply to battery storage installations?',
    answer:
      "Battery storage installations must comply with BS 7671:2018+A3:2024, including Section 712 (for DC-coupled systems connected to a PV array) and relevant sections covering energy storage systems. The installation must be notified under the building regulations (Part P in England) via a competent person scheme such as NICEIC or NAPIT. Batteries must be installed in accordance with the manufacturer's requirements — including ventilation, temperature ranges, and separation distances. Large battery systems in commercial settings may require a fire risk assessment under BS EN 62619.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-pv-system-design',
    title: 'Solar PV System Design',
    description:
      'System sizing, string design, inverter types, DC cable sizing, and G99/G98 notification.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-pv-maintenance',
    title: 'Solar Panel Maintenance',
    description:
      'Annual inspection checklist, cleaning, inverter replacement, and output monitoring.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/solar-pv-grants',
    title: 'Solar Panel Grants UK 2025',
    description: 'Smart Export Guarantee, 0% VAT, ECO4, and funding options explained.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/mcs-certification-guide',
    title: 'MCS Certification Guide',
    description: 'How to become MCS certified, costs, annual audit, and MCS 001 standard.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'ac-vs-dc',
    heading: 'AC-Coupled vs DC-Coupled Battery Storage',
    content: (
      <>
        <p>
          When designing a solar battery storage system, the first decision is coupling topology.
          This determines how the battery connects to the solar array and the property's electrical
          system, affecting efficiency, cost, and compatibility with existing installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC-coupled storage:</strong> The battery has its own bidirectional
                inverter/charger and connects to the property's AC circuit. It can charge from solar
                generation (via the existing solar inverter), from the grid (during cheap off-peak
                periods), or from both. AC-coupled systems are compatible with any existing solar
                installation and are the most flexible retrofit option. Slight additional conversion
                losses (typically 5–10%) compared to DC-coupled systems. Suitable for most UK
                retrofit projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC-coupled storage:</strong> The battery connects on the DC side of the
                system, between the panels and the inverter. A hybrid inverter manages both solar
                MPPT charging and battery charging/discharging in a single unit. Slightly more
                efficient as solar energy flows to the battery without an intermediate AC
                conversion. Must be specified at design stage — retrofitting DC-coupled storage to
                an existing system requires replacing the inverter. Best choice for new
                installations where battery storage is planned from the outset.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most UK retrofit projects, AC-coupled storage is the practical choice. For new
          installations where the customer wants battery storage from day one, a hybrid inverter
          with DC-coupled storage offers slightly better efficiency and a cleaner installation.
        </p>
      </>
    ),
  },
  {
    id: 'popular-batteries',
    heading: 'Popular Battery Systems in the UK',
    content: (
      <>
        <p>
          The UK home battery storage market has grown rapidly since 2022. Several manufacturers now
          offer well-supported, MCS-listed products suited to UK residential installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tesla Powerwall 3 (13.5 kWh usable):</strong> The market-leading premium
                product. Includes an integrated solar inverter, simplifying new installations.
                10-year warranty with 70% capacity guarantee. AC-coupled for retrofit, but the
                Powerwall 3 also includes an integrated solar MPPT for new installations. Supply and
                installation typically £8,000–£10,000. Requires Tesla-certified installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SolarEdge Home Battery (9.7 kWh):</strong> DC-coupled system that integrates
                with SolarEdge inverters and power optimisers. Ideal for new SolarEdge installations
                or where a SolarEdge inverter is already installed. 10-year warranty. Supply price
                approximately £3,500–£4,500 plus installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Givenergy All-In-One (8.2 kWh, expandable to 22.1 kWh):</strong> A popular
                all-in-one hybrid inverter and battery unit from the leading UK-headquartered
                manufacturer. Expandable with additional battery modules. Strong UK customer
                support. Typical supply cost £3,000–£4,000 for the 8.2 kWh unit, plus installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Growatt ARK (5.84–11.68 kWh, modular):</strong> A cost-effective modular
                battery system used with Growatt hybrid inverters. Popular with installers for its
                competitive pricing and flexibility. Available in multiple configurations. Typical
                supply cost £2,000–£3,500 depending on capacity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All products used in MCS-certified installations must be listed on the MCS Product
          Directory. Verify listing before specifying any product, as the directory is updated
          regularly.
        </p>
      </>
    ),
  },
  {
    id: 'sizing',
    heading: 'Battery Sizing for UK Homes',
    content: (
      <>
        <p>
          Choosing the right battery capacity is critical to the return on investment. An undersized
          battery will not capture all available solar generation; an oversized battery will take
          longer to pay back and may never fully cycle.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 kWh usable:</strong> Appropriate for a 1–2 bedroom home with 2,000–2,500
                kWh/year consumption. Covers most summer evenings but will not provide a full
                night's power in winter. Good entry-level choice for cost-conscious customers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7.5–10 kWh usable:</strong> The most common size for a UK three-bedroom
                family home with 3,500 kWh/year consumption. Stores sufficient energy for most
                evenings year-round and allows effective time-of-use tariff optimisation (charging
                from cheap overnight grid power for morning demand).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>13–15 kWh usable:</strong> Suitable for larger homes, EV charging
                optimisation, or customers who want near-total energy independence in summer. Also
                appropriate where the customer is on a time-of-use tariff with significant peak vs
                off-peak price differentials (e.g., Octopus Agile).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Battery manufacturers quote both nominal (total) capacity and usable capacity. Always
          specify usable capacity when comparing products — most lithium batteries reserve 5–20% of
          nominal capacity to protect battery health.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Battery Storage Installation Costs 2025',
    content: (
      <>
        <p>
          Battery storage costs have fallen significantly since 2020 and continue to decline.
          Current 2025 UK pricing for supply and installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 kWh AC-coupled retrofit:</strong> £2,000–£3,500 fully installed including
                labour, smart meter, and commissioning. Battery only (supply): £1,500–£2,500.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>10 kWh AC-coupled retrofit:</strong> £3,500–£5,500 fully installed. Battery
                only: £2,800–£4,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tesla Powerwall 3 (13.5 kWh):</strong> £8,000–£10,000 fully installed.
                Premium pricing reflects Tesla brand, integrated inverter, and 10-year warranty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC-coupled with hybrid inverter (new installation):</strong> Add £1,000–
                £2,000 for the hybrid inverter compared to a standard string inverter. Hybrid
                inverter + 10 kWh battery typically costs £4,500–£6,500 supply only.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices attract 0% VAT when installed alongside a qualifying MCS solar PV
          installation. Standalone battery installations (without solar) attract 20% VAT as of 2025.
          Battery costs are expected to continue falling by 10–15% annually as manufacturing scale
          increases.
        </p>
      </>
    ),
  },
  {
    id: 'mcs-requirement',
    heading: 'MCS Requirement for Battery Storage',
    content: (
      <>
        <p>
          MCS certification requirements for battery storage differ slightly from those for solar
          PV. Installers and customers should understand which installations require MCS
          certification and which products must be MCS-listed.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS required for 0% VAT:</strong> Battery storage qualifies for 0% VAT only
                when installed alongside or as part of an MCS-certified solar PV installation.
                Standalone battery storage (without solar) is subject to 20% VAT regardless of MCS
                status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS Product Directory:</strong> All battery products in an MCS-certified
                installation must be listed on the MCS Product Directory under the Battery Energy
                Storage category. The installer carries liability for specifying unlisted products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer MCS scope:</strong> Battery storage is a separate MCS
                certification scope (MCS 030) from solar PV (MCS 001). Installers must hold the
                appropriate scope for each technology they install under MCS.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'round-trip-efficiency',
    heading: 'Round-Trip Efficiency: What It Means in Practice',
    content: (
      <>
        <p>
          Round-trip efficiency (RTE) is the ratio of energy retrieved from the battery to energy
          put into it. For every 100 kWh stored, a battery with 95% RTE returns 95 kWh for use — the
          remaining 5 kWh is lost as heat during charging and discharging.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lithium iron phosphate (LFP):</strong> 92–97% round-trip efficiency. The
                dominant chemistry in current UK home storage systems (Givenergy, Growatt, Tesla
                Powerwall 3). LFP is inherently safer (lower thermal runaway risk), longer life, and
                performs better in the UK's variable temperature climate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lithium NMC:</strong> 90–95% round-trip efficiency. Used in some premium
                products. Higher energy density allows smaller form factor but may degrade faster at
                sustained high temperatures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC-coupling efficiency penalty:</strong> In AC-coupled systems, add the
                losses from the two additional conversion stages (solar inverter AC output → battery
                inverter DC charging → battery inverter AC output). Typical additional loss: 5–8% on
                the solar-to-battery-to-load cycle, though solar-to-load (without battery) is
                unaffected.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In a UK context, the efficiency difference between AC and DC coupling is less significant
          than the system design and product quality. A well-designed AC-coupled system with a 95%
          RTE battery will outperform a poorly designed DC-coupled system in real-world conditions.
        </p>
      </>
    ),
  },
  {
    id: 'installation-requirements',
    heading: 'Installation Requirements',
    content: (
      <>
        <p>
          Battery storage installation must comply with BS 7671, the manufacturer's installation
          manual, and relevant building regulations. Key installation requirements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location:</strong> Most lithium batteries are rated for indoor installation
                at 0–40°C. Garages can be acceptable but avoid external south-facing walls in summer
                (risk of overheating) and unheated spaces below −10°C. Batteries must not be
                installed in roof spaces or under stairs adjacent to escape routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structural support:</strong> Batteries are heavy — a 10 kWh system typically
                weighs 80–150 kg. Wall-mounted installations must be secured to load-bearing walls
                or masonry with appropriate fixings. Floor-standing systems require a level,
                load-bearing floor surface.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical protection:</strong> DC isolators, AC isolators, and appropriate
                overcurrent protection must be installed. The installation must include clear
                labelling identifying the battery system, all isolation points, and emergency
                procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations notification:</strong> Battery storage falls under the
                building regulations (Part P in England). Installation must be notified via a
                competent person scheme (NICEIC, NAPIT, or equivalent). An Electrical Installation
                Certificate must be issued on completion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Growing a Battery Storage Business',
    content: (
      <>
        <p>
          Battery storage retrofits represent one of the fastest-growing segments of the UK domestic
          electrical market. Electricians who hold MCS certification for both solar PV and battery
          storage (scopes MCS 001 and MCS 030) can offer complete solar-plus-storage packages with
          attractive margins.
        </p>
        <SEOAppBridge
          title="Manage solar battery storage jobs with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, job management, and certification. Issue MCS installation certificates, EICs, and Electrical Installation Certificates on your phone. 7-day free trial."
          icon={Battery}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarBatteryStorageInstallationPage() {
  return (
    <GuideTemplate
      title="Solar Battery Storage Installation UK | Home Battery Guide 2025"
      description="Complete guide to solar battery storage installation in the UK. AC-coupled vs DC-coupled, popular batteries (Tesla Powerwall, Givenergy, Growatt), sizing, costs £2,000–£6,000, MCS requirement, and round-trip efficiency explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Battery Guide"
      badgeIcon={Battery}
      heroTitle={
        <>
          Solar Battery Storage Installation UK:{' '}
          <span className="text-yellow-400">Home Battery Guide 2025</span>
        </>
      }
      heroSubtitle="Everything homeowners and electricians need to know about solar battery storage in the UK — AC-coupled vs DC-coupled, popular battery systems, sizing, current costs, MCS requirements, and round-trip efficiency."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Battery Storage"
      relatedPages={relatedPages}
      ctaHeading="Quote and Manage Battery Storage Installations"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Issue MCS installation certificates on your phone. 7-day free trial, cancel anytime."
    />
  );
}
