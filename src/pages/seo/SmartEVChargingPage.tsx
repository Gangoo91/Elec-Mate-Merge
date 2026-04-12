import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Settings,
  Clock,
  BarChart2,
  Sun,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EV Charging Guides', href: '/ev-charger-grants' },
  { label: 'Smart EV Charging UK', href: '/smart-ev-charging' },
];

const tocItems = [
  { id: 'smart-regulations', label: 'Smart Charge Point Regulations 2021' },
  { id: 'off-peak-charging', label: 'Off-Peak Charging & Smart Tariffs' },
  { id: 'solar-integration', label: 'Solar PV Integration' },
  { id: 'demand-response', label: 'Demand Response & Grid Services' },
  { id: 'load-management', label: 'Load Management' },
  { id: 'ozev-requirements', label: 'OZEV Grant Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electric Vehicles (Smart Charge Points) Regulations 2021 make smart functionality mandatory for all new privately-owned charge points sold or installed in Great Britain from 30 June 2022.',
  'Smart charge points must support scheduled charging, randomised delay, and demand-side response — enabling off-peak charging and protecting the electricity grid.',
  'Intelligent Octopus Go and similar time-of-use tariffs can reduce overnight EV charging costs to around 7p per kWh versus typical rates of 24–28p per kWh.',
  'Zappi and myenergi-compatible chargers can divert surplus solar PV generation directly into your EV, achieving zero-cost charging when generation exceeds household demand.',
  'OZEV-approved chargers (under the EVHS and Workplace Charging Scheme) must comply with the Smart Charge Points Regulations — non-smart chargers are ineligible for grant funding.',
];

const faqs = [
  {
    question: 'What do the Electric Vehicles (Smart Charge Points) Regulations 2021 require?',
    answer:
      'The Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) require that all new privately-owned charge points sold or installed in Great Britain from 30 June 2022 must incorporate smart functionality. This includes: the ability to set a charging schedule, a minimum one-hour randomised delay on startup to prevent grid peaks, the capability to receive and respond to demand-side response signals, data metering and monitoring, and a minimum cybersecurity standard. The regulations apply to AC charge points up to 22kW installed at homes, workplaces, and private destinations.',
  },
  {
    question: 'How much can I save with an off-peak smart EV tariff?',
    answer:
      'Using a smart time-of-use tariff such as Intelligent Octopus Go, off-peak charging can cost as little as 7p per kWh (typically between midnight and 5am). Compared to a standard variable tariff of around 24–28p per kWh, this represents a saving of up to 75 per cent. For a vehicle with a 75kWh battery, a full charge costs approximately £5.25 on an off-peak tariff versus £18–21 at standard rates — a saving of around £12–15 per charge. Over a year of typical UK driving (8,000 miles), annual savings of £800–1,200 are achievable versus standard daytime charging.',
  },
  {
    question: 'Can I charge my EV using solar panels?',
    answer:
      'Yes. Solar-integrated chargers such as the Zappi from myenergi detect surplus generation from your solar PV inverter (via a CT clamp on the grid import/export feed) and divert that surplus into your EV rather than exporting it at the low Smart Export Guarantee rate. In ECO+ mode, the Zappi will only charge when surplus generation is available, achieving zero-cost charging during daylight hours in summer. In ECO mode, it supplements solar with grid power to maintain a minimum charge rate. This is particularly valuable now that SEG export rates are typically 4–15p per kWh — far less than the 24p+ cost of importing equivalent grid electricity.',
  },
  {
    question: 'What is demand response and why does it matter for EV charging?',
    answer:
      'Demand response allows grid operators (and aggregators acting on their behalf) to send signals to smart charge points requesting that they reduce or shift their electricity demand during periods of high grid stress. The Smart Charge Points Regulations 2021 require all qualifying chargers to be capable of receiving and responding to these signals. In return, some energy suppliers offer incentives — for example, Octopus Energy\'s "Power-Up" events pay customers who reduce demand at peak times. As EV adoption grows, coordinated demand response from millions of charge points will become increasingly important for grid stability.',
  },
  {
    question: 'Does my charger need to be smart to qualify for the OZEV grant?',
    answer:
      'Yes. Both the EV Homecharge Scheme (EVHS) and the Workplace Charging Scheme (WCS) require that the installed charger is on the OZEV-approved product list. All products on that list must comply with the Smart Charge Points Regulations 2021. Non-smart chargers (such as basic "dumb" 7kW wallboxes that simply switch on and off) are not eligible for grant funding. When specifying a charger for a grant-funded installation, always verify the model appears on the current OZEV-approved product list.',
  },
  {
    question: 'What is load management and when is it needed?',
    answer:
      "Load management (also called dynamic load balancing) allows a charge point — or a group of charge points — to monitor the overall electrical load on the building's supply and reduce charging current automatically when total demand approaches the supply capacity. This prevents the main fuse from blowing and avoids the cost of upgrading the incoming supply. It is particularly important for multi-charger installations (workplace, multi-unit residential) and for homes with limited single-phase supply (e.g., older properties with 60A or 80A main fuses). Chargers such as the Ohme ePod, Wallbox Pulsar Plus, and Easee Home support load management via CT clamp measurement.",
  },
  {
    question: 'What is the randomised delay requirement in the Smart Charge Points Regulations?',
    answer:
      'Regulation 11 of the Smart Charge Points Regulations 2021 requires that when a vehicle is plugged in, the charger must not begin charging immediately. Instead, it must apply a randomised delay of up to 10 minutes before starting to charge. This prevents a simultaneous demand spike if many EV drivers plug in at the same time (for example, when arriving home from work). The delay is randomised to spread the load across a 10-minute window. Users can override this delay manually if they need to charge immediately.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/ev-charger-grants',
    title: 'EV Charger Grants UK',
    description: 'OZEV grant guide for homes and businesses — EVHS and WCS explained.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/workplace-ev-charging',
    title: 'Workplace EV Charging',
    description: 'Business EV charger installation — WCS grants, load balancing, fleet charging.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/ev-charging-legislation',
    title: 'EV Charging Legislation UK',
    description:
      'Full legal framework — Smart Charge Points Regulations, Part S, BS 7671 Section 722.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/ev-charger-brand-comparison',
    title: 'EV Charger Brand Comparison',
    description: 'Zappi vs Ohme vs Pod Point vs Easee — full comparison for 2025.',
    icon: BarChart2,
    category: 'Guide',
  },
  {
    href: '/ev-charger-certificate',
    title: 'EV Charging Certificate App',
    description: 'Complete BS 7671 EV charging certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'smart-regulations',
    heading: 'Electric Vehicles (Smart Charge Points) Regulations 2021',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 (SI 2021/1467) came into
          force on 30 June 2022 and fundamentally changed what it means to install an EV charger in
          Great Britain. Every new privately-owned AC charge point up to 22kW sold or installed
          since that date must incorporate smart functionality.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scheduled charging</strong> — the user must be able to set a charging
                schedule so the vehicle charges during off-peak hours, reducing both cost and grid
                demand at peak times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Randomised delay</strong> — a randomised startup delay of up to 10 minutes
                prevents simultaneous demand spikes when large numbers of vehicles are plugged in at
                the same time (Regulation 11).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demand-side response</strong> — chargers must be capable of receiving and
                responding to signals from grid operators or aggregators, allowing charging to be
                reduced or shifted during periods of grid stress.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metering and monitoring</strong> — smart charge points must measure and
                record energy consumption and make that data available to the user. This supports
                mileage reimbursement tracking for company car drivers charging at home.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cybersecurity</strong> — charge points must meet a minimum cybersecurity
                standard to protect against remote attacks that could manipulate grid demand at
                scale.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations were made under powers in the Automated and Electric Vehicles Act 2018 and
          are enforced by the Office for Zero Emission Vehicles (OZEV). Installers and manufacturers
          who supply non-compliant units face civil penalties. For installers, the practical
          implication is straightforward: any charge point you install must appear on the
          OZEV-approved product list, which only includes compliant smart chargers.
        </p>
      </>
    ),
  },
  {
    id: 'off-peak-charging',
    heading: 'Off-Peak Charging & Smart Tariffs',
    content: (
      <>
        <p>
          Smart charge points unlock access to time-of-use electricity tariffs that can dramatically
          reduce the cost of charging. By combining a smart charger with an appropriate energy
          tariff, many EV drivers achieve overnight charging costs of 7–10p per kWh — a fraction of
          the standard rate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intelligent Octopus Go</strong> — Octopus Energy's smart EV tariff
                integrates directly with compatible chargers (including Tesla, BMW, and Volkswagen
                vehicles). The charger is controlled via the Octopus API to charge automatically
                within the cheapest off-peak window, typically 11pm to 5am. The off-peak rate is
                approximately 7p per kWh (rates vary and are subject to change).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Octopus Go</strong> — a simpler fixed off-peak rate (around 7.5p per kWh
                between midnight and 5am) available with any smart charger that supports scheduled
                charging. No vehicle API integration required — you simply set a departure time in
                the charger app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EDF GoElectric</strong> — a seven-hour off-peak window overnight at a
                discounted rate. Available with a smart meter and compatible charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Agile Octopus</strong> — half-hourly variable pricing based on wholesale
                electricity prices. During periods of high renewable generation, prices can drop to
                zero or even go negative (Octopus pays you to charge). Best used with automation via
                the Octopus API or a compatible smart charger.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a vehicle with a 60kWh usable battery requiring a full charge, the cost difference is
          substantial: approximately £4.20 on Intelligent Octopus Go versus £14.40–16.80 at a
          standard 24–28p rate. Over 12 months of typical UK driving, smart tariff savings can
          exceed £700–1,000 per year.
        </p>
      </>
    ),
  },
  {
    id: 'solar-integration',
    heading: 'Solar PV Integration',
    content: (
      <>
        <p>
          For homes and businesses with solar PV systems, a solar-integrated EV charger offers the
          ability to use surplus generation to charge the vehicle rather than exporting it to the
          grid at a low rate. This is one of the most compelling features of premium smart chargers
          such as the Zappi from myenergi.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>How solar diversion works</strong> — a current transformer (CT clamp) is
                fitted to the grid import/export cable. The charger monitors the power flow and,
                when surplus solar generation is detected, diverts that surplus into the EV instead
                of exporting it to the grid. The charge rate varies dynamically to match available
                surplus.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO+ mode</strong> — charges only when surplus solar is available. No grid
                import for EV charging. Ideal on sunny summer days. The charge rate can be as low as
                1.4kW (6A minimum on a 230V supply), so a full charge from solar alone may take
                several days in poor weather.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO mode</strong> — supplements solar surplus with grid power to maintain a
                minimum charge rate (typically 6A). This ensures the vehicle charges even when solar
                output is limited, while still prioritising free solar energy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee vs charging</strong> — with SEG export rates
                typically at 4–15p per kWh and grid import at 24–28p, every kWh of solar diverted
                into the EV instead of exported saves 9–24p versus importing from the grid. Solar
                diversion is almost always more economical than exporting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Solar integration requires a compatible charger (primarily Zappi, though some Ohme and
          Wallbox models support similar functionality via third-party integrations), a CT clamp
          installation, and ideally a battery storage system to maximise self-consumption. As an
          electrician, CT clamp installation and configuration is a billable add-on to the core
          charger installation.
        </p>
      </>
    ),
  },
  {
    id: 'demand-response',
    heading: 'Demand Response & Grid Services',
    content: (
      <>
        <p>
          Beyond personal savings, smart charge points play an increasingly important role in
          balancing the electricity grid. As EV adoption grows towards the government's target of
          ending new petrol and diesel car sales by 2035, coordinated demand response from millions
          of charge points becomes a critical grid management tool.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flexibility services</strong> — National Grid ESO and distribution network
                operators can request demand reduction from aggregated smart chargers during periods
                of peak demand or low renewable generation. Some aggregators pay EV owners for
                participating in these flexibility events.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Vehicle-to-Grid (V2G)</strong> — while not yet mainstream, V2G technology
                allows bidirectional charging: the EV battery can export power back to the home or
                grid during peak periods. Nissan Leaf (CHAdeMO) and some other vehicles support V2G.
                The government has invested in V2G trials and expects the technology to become
                commercially available in the mid-2020s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Octopus Power-Up</strong> — a demand response scheme where Octopus Energy
                customers receive alerts and are paid in account credit for reducing their
                electricity consumption (including pausing EV charging) during specific half-hour
                periods of high grid demand.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'load-management',
    heading: 'Load Management',
    content: (
      <>
        <p>
          Load management allows a smart charge point to monitor the building's overall electrical
          consumption and automatically reduce its charging current to prevent the main supply fuse
          from tripping. It is essential for multi-charger installations and for properties with
          limited incoming supply capacity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CT clamp measurement</strong> — a current transformer is fitted to the
                incoming supply tails. The charger reads the total building load in real time and
                reduces its charging current when the total approaches the supply capacity. When
                building load drops (e.g., cooker switched off), charging current increases again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoiding supply upgrades</strong> — a supply upgrade from 60A to 100A via
                the network operator (DNO) typically costs £1,000–3,000 and takes weeks. Dynamic
                load management allows a 7kW charger to be installed on a 60A supply without
                upgrading, by ensuring total demand never exceeds the fuse rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-charger load sharing</strong> — in workplace and multi-unit
                residential installations, a load management controller distributes available
                capacity across multiple charge points. When one vehicle finishes charging, capacity
                is automatically redistributed to other chargers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-phase installations</strong> — three-phase supplies (typical in commercial
                premises) provide up to 69kW per charger (22kW per phase × 3 phases). Load
                management across three phases is more complex and requires chargers with 3-phase CT
                clamp inputs or a dedicated load management controller.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ozev-requirements',
    heading: 'OZEV Grant Requirements for Smart Chargers',
    content: (
      <>
        <p>
          Both residential and workplace EV charger grants administered by OZEV require the
          installed charger to be a smart charge point complying with the 2021 Regulations.
          Understanding these requirements is essential for electricians specifying chargers for
          grant-funded installations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved product list</strong> — the charger model must appear on the
                OZEV-approved product list at the time of installation. This list is updated
                regularly as new products are assessed. Always check the current list before
                specifying a charger for a grant-funded installation at{' '}
                <strong>www.gov.uk/guidance/ev-infrastructure-grant-for-staff-and-fleets</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV-approved installer</strong> — grants require installation by an
                OZEV-approved installer. Approval requires registration with the OZEV installer
                register and compliance with installation standards. The{' '}
                <SEOInternalLink href="/ev-charger-certificate">
                  EV charging certificate
                </SEOInternalLink>{' '}
                must be completed for every installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grant amounts</strong> — the EV Homecharge Scheme (EVHS) provides £350 per
                socket for eligible households (flats and rental properties). The Workplace Charging
                Scheme (WCS) provides £350 per socket up to a maximum of 40 sockets (£14,000) per
                business. See our{' '}
                <SEOInternalLink href="/ev-charger-grants">EV charger grants guide</SEOInternalLink>{' '}
                for full eligibility criteria.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Smart EV Charging Installations',
    content: (
      <>
        <p>
          EV charger installation is one of the fastest-growing revenue streams for UK electricians.
          The Smart Charge Points Regulations 2021 mean that every installation now involves a smart
          device requiring app configuration, CT clamp sizing, and connectivity commissioning —
          increasing both the technical complexity and the day-rate opportunity.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EV Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/ev-charger-certificate">
                    Elec-Mate EV charging certificate app
                  </SEOInternalLink>{' '}
                  to complete the BS 7671 Section 722 installation certificate on your phone while
                  on site. Fill in supply details, load management settings, protective device
                  ratings, and test results — then export to PDF and send to the customer before you
                  leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Solar Integration Add-Ons</h4>
                <p className="text-white text-sm leading-relaxed">
                  Customers with solar PV are prime candidates for solar-integrated chargers and CT
                  clamp upgrades. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to quote CT clamp supply and fit, Zappi charger supply and install, and app
                  configuration — a typical solar integration add-on is worth an additional £150–300
                  in labour.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EV charging installation business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for EV charging certificates, quoting, and job management. Complete certificates on site, win more work, and get paid faster. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SmartEVChargingPage() {
  return (
    <GuideTemplate
      title="Smart EV Charging UK | Smart Charge Points Guide 2025"
      description="Complete guide to smart EV charging in the UK. Electric Vehicles (Smart Charge Points) Regulations 2021 explained, off-peak tariffs, solar PV integration, demand response, load management, and OZEV grant requirements for smart chargers."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EV Charging Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Smart EV Charging UK:{' '}
          <span className="text-yellow-400">Smart Charge Points Guide 2025</span>
        </>
      }
      heroSubtitle="Everything you need to know about smart EV charging in the UK — the Electric Vehicles (Smart Charge Points) Regulations 2021, off-peak tariffs like Intelligent Octopus, solar PV diversion, demand response, load management, and what smart functionality means for OZEV grant eligibility."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Smart EV Charging"
      relatedPages={relatedPages}
      ctaHeading="Complete EV Charging Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EV charging certificates, quoting, and job management. 7-day free trial, cancel anytime."
    />
  );
}
