import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  Battery,
  Zap,
  PoundSterling,
  Settings,
  FileCheck2,
  Home,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [{ label: 'Off-Grid Systems', href: '/off-grid-electrical-system' }];

const tocItems = [
  { id: 'when-off-grid', label: 'When Off-Grid Makes Sense' },
  { id: 'system-design', label: 'System Design Overview' },
  { id: 'dc-voltage', label: '12V vs 24V vs 48V Systems' },
  { id: 'inverter-charger', label: 'Inverter/Charger Selection' },
  { id: 'battery-sizing', label: 'Battery Sizing Calculation' },
  { id: 'grid-forming', label: 'Grid-Forming Inverters' },
  { id: 'costs-vs-grid', label: 'Costs vs Grid Connection' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Off-grid electrical systems are most cost-effective when the cost of connecting to the grid exceeds £15,000–£25,000, which is common for remote rural properties, agricultural buildings, and narrowboats.',
  '48V DC systems are the preferred voltage for modern off-grid installations above 3 kW due to lower cable losses, more efficient inverter operation, and wider availability of compatible equipment.',
  'A properly designed off-grid system combines solar PV as the primary generation source, a backup generator for periods of low irradiance, and a battery bank sized to bridge 3–5 days of autonomy.',
  'Grid-forming inverters (also called off-grid inverters or inverter/chargers) create their own AC voltage reference — unlike grid-tied inverters which shut down in the absence of grid voltage.',
  'Battery sizing for off-grid must account for both daily consumption and days of autonomy. A conservative rule of thumb is to size the battery bank to supply 3–5 days of average daily consumption at 50% depth of discharge (for lead-acid) or 80–90% (for LFP).',
  'Narrowboat and marine off-grid systems must comply with BS 8654 (narrowboats) or BS EN ISO 13297 (recreational craft), with specific requirements for battery ventilation, alternator protection, and shore power isolation.',
];

const faqs = [
  {
    question: 'What is the minimum solar and battery size for a typical off-grid home in the UK?',
    answer:
      'A typical 3–4 bedroom UK home with average consumption of 10–15 kWh/day needs approximately 4–6 kW of solar PV and a battery bank of 30–50 kWh for 3 days of autonomy. This is substantially larger than a grid-tied solar system because there is no grid fallback. A backup generator (5–10 kW) is strongly recommended for extended periods of low irradiance in winter months when UK solar yield drops to 10–20% of summer output.',
  },
  {
    question: 'Do I need planning permission for an off-grid electrical system?',
    answer:
      'Planning permission for the electrical system itself is not required. However, the generation equipment (solar panels, wind turbines) may require planning permission depending on location, size, and whether the property is in a conservation area or listed. Solar panels on dwellings generally fall within permitted development. Wind turbines above 15 m hub height require planning permission. Always check with the local planning authority before proceeding.',
  },
  {
    question: 'How does an off-grid system work during winter in the UK?',
    answer:
      'Winter is the critical design case for UK off-grid systems. Solar irradiance in December and January in southern England is approximately 0.5–1.5 peak sun hours per day compared to 4–6 in summer. A properly designed system must either have a large enough battery bank to bridge extended low-irradiance periods, a backup generator capable of fully recharging the battery bank in 2–4 hours, or both. Most off-grid properties in the UK run their generator 1–3 times per week in winter.',
  },
  {
    question: 'Can I connect an off-grid system to the grid later?',
    answer:
      'Yes. An off-grid system can be converted to a grid-tied or hybrid system if grid connection becomes available or cost-effective later. The main consideration is that the existing off-grid inverter/charger may need to be replaced or supplemented with a grid-tied inverter. LFP batteries installed in an off-grid system are fully compatible with subsequent grid-tied hybrid operation. Plan the initial installation with potential grid connection in mind if there is any chance of the grid reaching the property in future.',
  },
  {
    question: 'What maintenance does an off-grid electrical system require?',
    answer:
      'LFP battery banks require minimal maintenance — annual inspection of terminals, connections, and battery management system (BMS) logs is sufficient. Lead-acid batteries require monthly electrolyte level checks and equalisation charges. Solar panels should be cleaned at least annually (more frequently in areas with bird activity or pollution). Generators require regular oil and filter changes per manufacturer schedules (typically every 100–250 hours). The inverter/charger should be inspected annually for cable connections, ventilation, and firmware updates.',
  },
  {
    question: 'Is an off-grid electrical system suitable for a narrowboat?',
    answer:
      'Off-grid electrical systems are standard on narrowboats. The typical narrowboat system comprises 12V or 24V DC domestic battery bank (200–600 Ah), alternator charging from the engine, shore power via an isolation transformer, and increasingly solar panels and LFP batteries for extended mooring without engine running. BS 8654 governs narrowboat electrical installations and mandates specific requirements for battery ventilation, shore power connection, and gas/electrical separation.',
  },
  {
    question: 'How much does a complete off-grid electrical system cost in the UK?',
    answer:
      'A complete off-grid system for a typical rural UK property costs £25,000–£60,000 installed, depending on the size of the property and generation requirement. This compares with grid connection costs that can reach £50,000–£100,000+ for remote properties requiring new overhead line or underground cable runs. The economic case for off-grid is strongest when the grid connection quote exceeds £20,000.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/battery-storage-installation',
    title: 'Battery Storage Installation',
    description: 'Home battery storage systems, types, costs, and grid connection requirements.',
    icon: Battery,
    category: 'Guide',
  },
  {
    href: '/hybrid-solar-battery-system',
    title: 'Hybrid Solar Battery System',
    description:
      'Grid-tied solar plus battery — self-consumption optimisation and tariff benefits.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/tools/digital-certificates-app',
    title: 'Electrical Certificates App',
    description:
      'Complete off-grid installation certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote off-grid system installations accurately with AI-assisted pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'when-off-grid',
    heading: 'When Off-Grid Makes Sense in the UK',
    content: (
      <>
        <p>
          Off-grid electrical systems are not always the first choice — they require a larger
          capital investment than a grid-tied installation and demand more careful design and
          maintenance. However, for certain property types they represent the only practical or
          economically viable solution.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remote rural properties</strong> — when the distance from the nearest grid
                connection point exceeds 200–300 metres, connection costs can easily reach
                £15,000–£60,000 or more. At these figures, an off-grid system typically delivers
                better value over a 20-year period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Narrowboats and canal boats</strong> — by nature off-grid when not on shore
                power. LFP batteries and solar panels have transformed narrowboat living by
                extending engine-off mooring capacity from hours to days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agricultural and estate buildings</strong> — barns, agricultural dwellings,
                and estate cottages at the end of long private tracks where grid extension is
                cost-prohibitive. Off-grid systems can also provide power security that the rural
                grid — with its frequent and prolonged outages — cannot guarantee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-build eco homes</strong> — homeowners committed to energy independence
                and zero carbon footprint, particularly where planning conditions require minimal
                grid impact.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always request a grid connection quotation from the relevant Distribution Network Operator
          (UK Power Networks, Western Power Distribution, Northern Powergrid, etc.) before
          committing to off-grid. The comparison between grid connection cost and off-grid system
          cost is the foundation of the economic case.
        </p>
      </>
    ),
  },
  {
    id: 'system-design',
    heading: 'Off-Grid System Design Overview',
    content: (
      <>
        <p>
          A complete off-grid system for a UK property comprises three main subsystems working
          together: generation, storage, and management.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV generation</strong> — the primary generation source for most UK
                off-grid installations. Size is determined by annual energy yield calculations using
                the property's latitude, panel orientation, and tilt. South-facing panels at 30–35°
                tilt maximise annual yield in the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery bank</strong> — stores solar generation for use when the sun is not
                shining. Must be sized for 3–5 days of autonomy at average daily consumption,
                accounting for depth of discharge limits of the chosen chemistry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Backup generator</strong> — petrol or diesel generator (5–15 kW) for
                extended periods of low irradiance. The generator charges the battery bank via the
                inverter/charger's AC input. Propane/LPG generators are preferred in remote
                locations where diesel delivery is infrequent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter/charger</strong> — the central management device that converts DC
                battery power to AC for use in the property, manages solar charging via MPPT
                controller, and charges the battery from the generator when needed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dc-voltage',
    heading: '12V vs 24V vs 48V DC Systems',
    content: (
      <>
        <p>
          The DC bus voltage of an off-grid system significantly affects cable sizing, efficiency,
          available equipment, and expandability. Higher voltages are preferred for larger systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>12V systems</strong> — suitable only for very small loads (narrowboats,
                motorhomes, small cabins up to 1 kW). At 12V, a 100A cable is needed to carry just
                1.2 kW — cable costs and losses become prohibitive for larger loads. Widely
                compatible with 12V appliances and automotive components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>24V systems</strong> — a practical compromise for medium-sized applications
                (1–3 kW). Halves the current compared to 12V for the same power, reducing cable size
                and losses. Common on larger narrowboats and small rural cabins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>48V systems</strong> — the standard for modern off-grid domestic
                installations above 3 kW. At 48V, a 63A cable carries 3 kW — practical for most
                wiring runs. 48V is the native voltage of most modern LFP battery modules and
                inverter/charger units (Victron Quattro, SMA Sunny Island, Schneider XW+). 48V
                systems are expandable and future-proof.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For any new off-grid installation in a dwelling or substantial building, 48V DC is the
          correct choice. 12V systems should be reserved for narrowboats, motorhomes, and equipment
          specifically designed for that voltage.
        </p>
      </>
    ),
  },
  {
    id: 'inverter-charger',
    heading: 'Inverter/Charger Selection',
    content: (
      <>
        <p>
          The inverter/charger is the heart of an off-grid system. It must be sized correctly for
          peak load demand, not just average consumption.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victron Energy Quattro</strong> — the market-leading inverter/charger for UK
                off-grid installations. Available in 3–15 kVA sizes. Dual AC input (generator +
                optional grid). Excellent integration with Victron MPPT controllers, BMS systems,
                and the GX monitoring platform. Widely supported by UK installers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SMA Sunny Island</strong> — German-engineered off-grid inverter, 3.7–6 kW
                per unit with master/slave parallel capability for larger loads. Pairs with SMA
                solar inverters for integrated DC coupling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Peak load sizing</strong> — size the inverter for peak simultaneous demand,
                not average. A typical UK home may have a peak demand of 6–10 kW (oven, kettle,
                washing machine running simultaneously). The inverter must handle this without
                overload. Most inverter/chargers have a 2–3× overload rating for short durations
                (motor starting, etc.).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transfer switch time</strong> — when switching between generator and
                inverter power, the transfer switch introduces a brief interruption (typically 20–40
                ms for a Victron Quattro). This is usually imperceptible but can cause issues with
                sensitive computing or medical equipment. Specify a UPS-compatible inverter/charger
                for such applications.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-sizing',
    heading: 'Battery Sizing for Off-Grid Systems',
    content: (
      <>
        <p>
          Off-grid battery sizing is more demanding than grid-tied storage because the battery must
          bridge extended periods without generation, not merely store a day's solar surplus.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — daily consumption</strong> — calculate average daily consumption in
                kWh. For a UK home, this is typically 8–20 kWh/day depending on size and occupants.
                Obtain 12 months of smart meter data for accuracy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — days of autonomy</strong> — choose the design autonomy period
                (typically 3–5 days for a UK installation with a backup generator, 7+ days if
                generator-free). Multiply daily consumption by autonomy days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — depth of discharge</strong> — divide by the allowable depth of
                discharge (80% for LFP, 50% for lead-acid). A 5-day autonomy requirement at 10
                kWh/day with LFP: (10 × 5) ÷ 0.8 = 62.5 kWh of installed capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — temperature derating</strong> — in unheated outbuildings, add
                10–20% to battery capacity to account for reduced performance at low temperatures.
                LFP is significantly less affected by cold than NMC.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grid-forming',
    heading: 'Grid-Forming Inverters Explained',
    content: (
      <>
        <p>
          A grid-forming inverter is essential for off-grid operation. Unlike a grid-following
          (grid-tied) inverter that synchronises to and depends on the grid's voltage and frequency
          reference, a grid-forming inverter creates its own AC voltage and frequency.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage and frequency synthesis</strong> — the grid-forming inverter
                maintains 230V AC at 50 Hz regardless of grid presence. Standard appliances and
                equipment designed for the UK grid operate normally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Black start capability</strong> — a grid-forming inverter can start up from
                a fully discharged battery (once minimum voltage is reached) without any external
                reference. This is the key feature that makes off-grid operation possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generator synchronisation</strong> — a good inverter/charger (Victron
                Quattro, SMA Sunny Island) automatically synchronises with a connected generator,
                allowing seamless transfer and battery charging without interrupting AC loads.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note: standard solar inverters (Fronius, SMA Sunny Boy, SolarEdge, Enphase) are
          grid-following and will not operate off-grid. They must be paired with a separate
          grid-forming inverter/charger in an AC-coupled off-grid configuration.
        </p>
      </>
    ),
  },
  {
    id: 'costs-vs-grid',
    heading: 'Off-Grid Costs vs Grid Connection Costs',
    content: (
      <>
        <p>
          The economic decision between off-grid and grid connection depends on the specific DNO
          quotation for the property. Always obtain a formal quotation before proceeding.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid connection costs (typical range)</strong> — £5,000–£15,000 for
                properties within 100 m of the nearest point of connection; £15,000–£60,000+ for
                properties requiring new overhead line or underground cable runs of 200–1,000+
                metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small off-grid system (cabin, 2–3 kW)</strong> — £15,000–£25,000 installed
                including solar, LFP battery bank, inverter/charger, and generator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full domestic off-grid system (5–10 kW)</strong> — £30,000–£60,000
                installed. This figure includes 4–8 kW solar, 30–50 kWh LFP battery, Victron Quattro
                inverter/charger, generator, and monitoring system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ongoing costs</strong> — generator fuel and servicing (£500–£1,500/year),
                battery replacement after 10–15 years (LFP), and periodic inverter maintenance.
                Offset by zero electricity import costs and no standing charge.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Off-Grid System Installations',
    content: (
      <>
        <p>
          Off-grid electrical work commands a significant premium over standard domestic
          installation. Complex system design, specialist equipment, and the need for precise
          commissioning mean that experienced off-grid installers are in high demand across rural UK
          markets.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/digital-certificates-app">
                    Elec-Mate certificates app
                  </SEOInternalLink>{' '}
                  to complete Electrical Installation Certificates for off-grid systems on your
                  phone. Generate EIC and minor works certificates, schedule of test results, and
                  commissioning records without any paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Accurately</h4>
                <p className="text-white text-sm leading-relaxed">
                  Off-grid installations are high-value jobs where accurate quoting is essential.
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build detailed proposals with equipment itemisation, labour, and commissioning
                  costs that protect your margin on complex jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage off-grid installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for certificates, quoting, and job management. Complete EIC and commissioning documents on your phone. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OffGridElectricalSystemPage() {
  return (
    <GuideTemplate
      title="Off-Grid Electrical Systems UK | Off-Grid Power Design Guide"
      description="Complete guide to off-grid electrical systems in the UK. When off-grid makes sense (remote properties, narrowboats), system design (solar, battery, generator), 12V vs 24V vs 48V DC, inverter/charger selection, battery sizing, grid-forming inverters, and costs vs grid connection."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Off-Grid Power Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Off-Grid Electrical Systems UK:{' '}
          <span className="text-yellow-400">Off-Grid Power Design Guide</span>
        </>
      }
      heroSubtitle="A complete guide to designing and installing off-grid electrical systems in the UK — from narrowboats to remote rural properties. System design, DC voltage selection, inverter/charger choice, battery sizing, and a realistic cost comparison with grid connection."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Off-Grid Electrical Systems"
      relatedPages={relatedPages}
      ctaHeading="Certificate Off-Grid Electrical Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC certificates, test schedules, and commissioning records. 7-day free trial, cancel anytime."
    />
  );
}
