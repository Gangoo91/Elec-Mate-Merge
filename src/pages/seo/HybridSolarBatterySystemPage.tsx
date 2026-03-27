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
  TrendingUp,
  ShieldCheck,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Hybrid Solar Systems', href: '/hybrid-solar-battery-system' },
];

const tocItems = [
  { id: 'what-is-hybrid', label: 'What Is a Hybrid System?' },
  { id: 'hybrid-vs-ac-coupling', label: 'Hybrid Inverter vs AC Coupling' },
  { id: 'self-consumption', label: 'Self-Consumption Optimisation' },
  { id: 'time-of-use', label: 'Time-of-Use Tariff Benefits' },
  { id: 'export-import', label: 'Export and Import Management' },
  { id: 'popular-systems', label: 'Popular Hybrid Systems' },
  { id: 'costs', label: 'Costs and Payback' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A hybrid solar battery system combines grid-tied solar PV with a battery, allowing households to store surplus solar generation and use it in the evening rather than exporting at low Smart Export Guarantee rates.',
  'A hybrid inverter (DC-coupled) achieves 90–95% round-trip battery efficiency. An AC-coupled retrofit with a separate battery inverter achieves 85–90% but can be added to any existing solar installation without replacing the solar inverter.',
  'Self-consumption optimisation software in hybrid inverters (GivEnergy, SolarEdge, Sungrow) forecasts tomorrow\'s solar yield and adjusts charging schedules accordingly — maximising the percentage of household demand met by solar.',
  'Time-of-use tariffs such as Octopus Agile, Octopus Go, and Intelligent Octopus offer off-peak import rates of 7–15p/kWh (and sometimes negative prices on Agile), enabling battery charging from cheap grid electricity when solar yield is low.',
  'Grid export and import management (also called energy management or virtual power plant participation) allows hybrid systems to respond to grid signals, earn export payments, and balance local supply and demand automatically.',
  'Popular UK hybrid systems include GivEnergy All-in-One, SolarEdge Home Battery with SolarEdge inverter, and Sungrow SH series — all available through UK electrical trade distributors.',
];

const faqs = [
  {
    question: 'What is the difference between a hybrid solar system and a standard solar system?',
    answer:
      'A standard solar system exports surplus generation to the grid at whatever rate the Smart Export Guarantee (SEG) tariff offers (typically 4–20p/kWh). A hybrid system stores surplus generation in a battery and uses it in the evening, when grid import rates are 25–35p/kWh. The economic advantage is the arbitrage between export rate and import rate. Hybrid systems also provide a degree of resilience — many can supply power during grid outages (backup mode), though this requires specific inverter capability.',
  },
  {
    question: 'Can I add a battery to my existing solar PV system?',
    answer:
      'Yes. If your existing solar system uses a standard grid-tied inverter (Fronius, SMA Sunny Boy, Enphase, SolarEdge standard), the easiest retrofit is an AC-coupled battery such as the Tesla Powerwall 2. This connects to the AC side of your system and does not require replacing the existing solar inverter. Alternatively, if you are replacing your solar inverter anyway, upgrading to a hybrid inverter and installing a DC-coupled battery delivers better efficiency.',
  },
  {
    question: 'How does Octopus Agile work with a hybrid solar battery system?',
    answer:
      'Octopus Agile is a time-of-use tariff where import prices vary every 30 minutes based on wholesale electricity prices, ranging from around 5p/kWh during off-peak periods to 35p+ during peak demand. On Agile, prices occasionally go negative (you are paid to import). A hybrid system with an Agile-compatible energy management system (GivEnergy, Givenergy Cloud, SolarEdge Energy Hub, or third-party platforms like Octopus Intelligent) automatically charges the battery during the cheapest 30-minute slots and discharges during peak import periods.',
  },
  {
    question: 'Will a hybrid solar system work during a power cut?',
    answer:
      'Not automatically with all systems. To supply power during a grid outage, the hybrid inverter must have an EPS (Emergency Power Supply) or backup mode function. The SolarEdge Home Battery, GivEnergy All-in-One, and Sungrow SH series all offer EPS capability. In backup mode, the system isolates from the grid and operates as a mini off-grid system powered by the battery. Solar may or may not be available depending on the time of day. The backup capacity is limited to the battery\'s state of charge.',
  },
  {
    question: 'What size solar and battery system do I need for a typical UK home?',
    answer:
      'A 3–4 kWp solar system with a 10 kWh battery is a commonly recommended starting specification for a typical 3–4 bedroom UK home. This combination can cover 60–80% of annual electricity demand from solar (including the battery buffer) on a south-facing roof in England. Homes with higher consumption, electric vehicles, or heat pumps should consider 4–6 kWp solar and 10–15 kWh battery storage.',
  },
  {
    question: 'Do hybrid solar systems qualify for the Smart Export Guarantee?',
    answer:
      'Yes. Hybrid systems with MCS-certified installations and SMETS2 smart meters qualify for the Smart Export Guarantee. The SEG pays for each unit of electricity exported to the grid. With a hybrid system, you will export less electricity than a system without storage (because more is stored and self-consumed), so SEG income will be lower — but self-consumption savings at the import rate will be higher.',
  },
  {
    question: 'What is virtual power plant participation and can my hybrid system join one?',
    answer:
      'A virtual power plant (VPP) aggregates multiple domestic battery systems and dispatches them collectively to provide grid balancing services (frequency response, demand flexibility). UK energy companies including Octopus Energy, OVO, and various grid service providers run VPP programmes. Compatible hybrid systems (GivEnergy, Tesla Powerwall via Octopus Intelligent) can earn additional income of £100–£400/year by participating. The system operator controls battery dispatch within agreed parameters.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/battery-storage-installation',
    title: 'Battery Storage Installation',
    description: 'Home battery storage — types, popular systems, G99, and MCS certification.',
    icon: Battery,
    category: 'Guide',
  },
  {
    href: '/off-grid-electrical-system',
    title: 'Off-Grid Electrical Systems',
    description: 'Designing off-grid power systems for remote properties and narrowboats.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-certificates',
    title: 'Electrical Certificates App',
    description: 'Complete solar and MCS installation certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote hybrid solar and battery installations accurately.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-hybrid',
    heading: 'What Is a Hybrid Solar Battery System?',
    content: (
      <>
        <p>
          A hybrid solar battery system is a grid-tied solar PV installation combined with
          a battery storage system. The term "hybrid" reflects the dual-source nature: the
          system can draw from both solar generation and the grid, and can export to the grid
          while also charging or discharging the battery.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid-tied with storage</strong> — unlike a pure off-grid system, a
                hybrid system remains connected to the grid. The grid acts as a backup when
                solar generation and battery are insufficient, and as a destination for surplus
                generation via the Smart Export Guarantee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Priority hierarchy</strong> — the system management software sets a
                priority order: (1) supply loads directly from solar; (2) charge battery with
                surplus; (3) export surplus to grid; (4) when solar insufficient, draw from
                battery; (5) import from grid when battery is depleted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-sufficiency</strong> — a well-specified hybrid system in southern
                England can achieve 60–75% annual self-sufficiency (percentage of demand met
                by solar + battery). This rises to 80%+ with larger arrays and EV smart charging.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hybrid-vs-ac-coupling',
    heading: 'Hybrid Inverter vs AC-Coupling',
    content: (
      <>
        <p>
          There are two technical approaches to creating a hybrid solar battery system. The
          right choice depends on whether an existing solar installation is already in place.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hybrid inverter (DC-coupled)</strong> — a single device replaces the
                solar inverter and integrates battery management. Solar panels connect directly
                to the hybrid inverter's MPPT inputs (DC), which then manages charging the battery
                (DC) and supplying AC loads. One DC-to-AC conversion step achieves 90–95%
                round-trip efficiency. Best for new installations. Requires replacing an existing
                solar inverter if retrofitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC-coupled retrofit</strong> — the existing solar inverter stays in place.
                A separate battery inverter/charger (Tesla Powerwall 2, Solarwatt MyReserve) is
                added on the AC side. Solar DC → solar inverter AC → battery inverter AC → DC →
                battery. Two conversion steps reduce efficiency to 85–90% round-trip. No
                disruption to existing solar system. The lowest-risk retrofit for customers with
                mid-life solar inverters.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When a customer's solar inverter is approaching end of life (typically 10–15 years),
          replacing it with a hybrid inverter and adding a DC-coupled battery is usually the
          most cost-effective long-term solution.
        </p>
      </>
    ),
  },
  {
    id: 'self-consumption',
    heading: 'Self-Consumption Optimisation',
    content: (
      <>
        <p>
          Modern hybrid systems use software to maximise the percentage of household demand
          met by solar — minimising grid import and maximising the value extracted from the
          solar array.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar forecast charging</strong> — GivEnergy, SolarEdge, and Sungrow
                inverters use weather forecasting APIs to predict tomorrow's solar yield. If a
                sunny day is forecast, the battery is not fully charged overnight from cheap
                grid electricity (to leave room for solar tomorrow). If a cloudy day is forecast,
                the battery is charged to 100% from cheap overnight tariff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumption monitoring</strong> — a current transformer (CT clamp) on
                the main incoming supply measures import/export in real time. The inverter uses
                this data to modulate battery charge/discharge to keep net import as close to
                zero as possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV smart charging integration</strong> — platforms such as Octopus
                Intelligent integrate the home battery, solar system, and EV charger. The
                platform optimises all three energy flows simultaneously to minimise import cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'time-of-use',
    heading: 'Time-of-Use Tariff Benefits',
    content: (
      <>
        <p>
          Time-of-use (ToU) electricity tariffs are where hybrid solar battery systems deliver
          their most significant financial benefit. The price spread between off-peak and peak
          import rates creates an arbitrage opportunity that the battery can exploit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Octopus Go</strong> — off-peak rate of approximately 9p/kWh between
                00:30 and 04:30; standard rate approximately 28p/kWh at other times. A 10 kWh
                battery fully charged from off-peak and fully discharged in the evening saves
                approximately £2 per cycle, or £730 per year at 365 cycles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Octopus Agile</strong> — half-hourly prices aligned to wholesale
                markets. Average off-peak rate 5–10p/kWh; prices occasionally negative.
                AI-optimised battery dispatch extracts maximum value from volatile pricing.
                Best combined with a hybrid system that has API integration with the
                Octopus platform.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intelligent Octopus</strong> — specifically designed for EV charging
                with spillover solar battery optimisation. Charges EV and home battery during
                cheap half-hourly slots automatically, coordinated with weather forecast data.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The actual savings depend on electricity prices at the time of installation.
          Customers should model savings based on current tariff rates using their actual
          smart meter half-hourly consumption data, available from the Octopus API or
          via n3rgy.
        </p>
      </>
    ),
  },
  {
    id: 'export-import',
    heading: 'Grid Export and Import Management',
    content: (
      <>
        <p>
          Hybrid systems can be configured to manage grid export and import actively, going
          beyond simple self-consumption to provide grid services and earn additional income.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee (SEG)</strong> — mandatory for licensed suppliers
                with 150,000+ customers. Rates range from 4p/kWh (some suppliers) to 20p/kWh
                (premium rates from Octopus, OVO). MCS certification of installer and product
                is required. SMETS2 smart meter with half-hourly export metering is mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export limitation</strong> — some DNOs require export limitation as
                a condition of G98/G99 approval where local network capacity is constrained.
                Hybrid inverters (SolarEdge, Sungrow, GivEnergy) can enforce a software-defined
                export limit using the CT clamp measurement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demand flexibility and virtual power plants</strong> — UK energy
                suppliers are launching demand flexibility programmes where battery owners
                earn payments for reducing or shifting consumption at peak grid stress times.
                GivEnergy, Tesla Powerwall, and Sungrow systems are compatible with various
                UK flexibility market platforms.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'popular-systems',
    heading: 'Popular UK Hybrid Solar Systems',
    content: (
      <>
        <p>
          The following hybrid systems are widely specified and installed in the UK market.
          All are available through UK trade distributors and have MCS-listed product ranges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>GivEnergy All-in-One</strong> — 9.5 kWh LFP battery with integrated
                hybrid inverter. Modular and expandable. Excellent cloud monitoring via the
                GivEnergy portal. Very popular with UK installers for both new and retrofit
                applications. GivEnergy EMS integrates with Octopus tariffs natively.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SolarEdge Home Battery + Energy Hub Inverter</strong> — DC-coupled
                LFP battery (4.6–9.7 kWh modules, stackable to 23 kWh) with SolarEdge
                Energy Hub inverter. Deep integration with SolarEdge optimisers and monitoring
                platform. EV charger and heat pump interfaces available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sungrow SH series</strong> — competitive hybrid inverters (3–10 kW)
                with SBR LFP battery range (9.6–25.6 kWh). EPS backup mode. Strong value
                proposition through the trade channel. Rapidly growing UK market share.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fox ESS H3 Hybrid</strong> — 3–6 kW hybrid inverter with ECS LFP
                battery range. Popular in the installer market for budget-conscious projects
                without sacrificing LFP chemistry or monitoring quality.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Hybrid System Costs and Payback',
    content: (
      <>
        <p>
          Hybrid solar battery systems represent a larger investment than solar-only
          installations, but the additional self-consumption savings and ToU arbitrage
          improve the overall return on investment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4 kWp solar + 10 kWh hybrid system</strong> — £8,000–£14,000 installed.
                The most commonly quoted combination for a 3–4 bedroom UK home in 2025.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retrofit AC-coupled battery only (10 kWh)</strong> — £4,500–£7,000
                installed to an existing solar system. Zero disruption to existing installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings</strong> — a typical UK household saves £600–£1,200 per
                year with a hybrid system on a time-of-use tariff, compared to £300–£600 with
                solar only. Battery payback adds 3–5 years to the solar-only payback period
                but extends the financial benefit horizon.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zero VAT</strong> — solar panels and battery storage installed together
                are zero-rated for VAT under the Finance Act 2022 Energy Saving Materials
                relief. Battery-only retrofits are also zero-rated since February 2024.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Installing Hybrid Solar Systems',
    content: (
      <>
        <p>
          Hybrid solar battery installation is a growth market for qualified electricians with
          solar PV experience. G98 notification, MCS commissioning documentation, and inverter
          configuration are all tasks that benefit from efficient digital tools.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete MCS Documents On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-certificates">
                    Elec-Mate certificates app
                  </SEOInternalLink>{' '}
                  to complete MCS commissioning sheets, EIC certificates, and G98 notification
                  forms on your phone while still on site. Customers receive their documents
                  before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Upsell Battery on Every Solar Quote</h4>
                <p className="text-white text-sm leading-relaxed">
                  Present hybrid system options alongside every solar-only quote using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Show the customer the payback difference between solar only and solar plus
                  battery to convert more single-product quotes to hybrid installations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage hybrid solar installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for MCS commissioning documents, EIC certificates, and professional quoting. 7-day free trial, cancel anytime."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HybridSolarBatterySystemPage() {
  return (
    <GuideTemplate
      title="Hybrid Solar Battery System UK | Solar + Storage Explained"
      description="Complete guide to hybrid solar battery systems in the UK. What hybrid means (grid-tied + battery), hybrid inverter vs AC-coupling, self-consumption optimisation, Octopus Agile time-of-use tariff benefits, grid export management, and popular hybrid systems including SolarEdge, GivEnergy, and Sungrow."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Hybrid Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Hybrid Solar Battery System UK:{' '}
          <span className="text-yellow-400">Solar + Storage Explained</span>
        </>
      }
      heroSubtitle="A complete guide to hybrid solar and battery systems in the UK — what hybrid means, how DC and AC coupling differ, self-consumption optimisation, time-of-use tariff arbitrage with Octopus Agile, grid export management, and the most popular hybrid systems for UK homes."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hybrid Solar Battery Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Hybrid Solar Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for MCS commissioning documents, EIC certificates, and hybrid solar quoting. 7-day free trial, cancel anytime."
    />
  );
}
