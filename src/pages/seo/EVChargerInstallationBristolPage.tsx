import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  FileCheck2,
  PoundSterling,
  Car,
  Plug,
  MapPin,
  Building2,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
  { label: 'Bristol', href: '/guides/ev-charger-installation-bristol' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Bristol' },
  { id: 'costs', label: 'Bristol Installation Costs' },
  { id: '7kw-vs-22kw', label: '7kW vs 22kW Chargers' },
  { id: 'smart-chargers', label: 'Smart Chargers' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'dno-notification', label: 'Western Power DNO Notification' },
  { id: 'grants', label: 'OZEV Grant and Bristol Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A domestic 7kW EV charger installation in Bristol typically costs between £750 and £1,400, reflecting South West labour rates and the city's mix of Victorian terraces, Edwardian semis, and new-build developments.",
  'Bristol is served by Western Power Distribution (now National Grid Electricity Distribution). All EV charger installations must be notified under G98 before the charger is energised.',
  'The OZEV EV chargepoint grant offers up to £350 for eligible flat owners and tenants in Bristol, reducing net installation costs significantly.',
  'Regulation 722.411.4.1 of BS 7671 requires careful earthing consideration for outdoor EV chargers on PME supplies, which predominate across Bristol.',
  'Bristol has strong EV adoption — the city ranks among the top UK cities for EV ownership — and steep, hilly terrain in some areas creates unique cable routing considerations.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Bristol in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Bristol costs between £750 and £1,400 in 2026. The lower end applies to modern semis and detached houses in areas such as Henleaze, Westbury-on-Trym, Fishponds, and Keynsham where the consumer unit is close to the parking. Victorian and Edwardian terraces in Clifton, Redland, Montpelier, Bedminster, and Totterdown — often with steep drives, longer cable runs, and older consumer units — sit at the higher end. Electrician day rates in Bristol typically run from £300 to £420.',
  },
  {
    question: 'Which DNO covers Bristol for EV charger notification?',
    answer:
      'National Grid Electricity Distribution (formerly Western Power Distribution) is the Distribution Network Operator for Bristol and the wider South West. All domestic EV charger installations must be notified under Engineering Recommendation G98 before the charger is connected. For standard 7kW single-phase chargers (up to 16A per phase), G98 is a notification — no prior approval is needed. Three-phase 22kW chargers require G99 prior approval, which can take 4 to 10 weeks.',
  },
  {
    question: 'Is the OZEV grant available for EV charger installation in Bristol?',
    answer:
      "Yes. The OZEV EV chargepoint grant is available to flat owners and tenants in Bristol — including those in the city's many Victorian terrace conversions — covering up to 75% of eligible installation cost capped at £350. Homeowners in houses do not qualify. The OZEV-approved installer applies on your behalf. Bristol City Council does not currently operate a separate residential EV charger grant scheme, though the city has an active EV infrastructure strategy.",
  },
  {
    question: 'Do I need an earth rod for an EV charger in Bristol?',
    answer:
      'Possibly. Most Bristol properties are on a PME (TN-C-S) supply. Regulation 722.411.4.1 of BS 7671 and the IET Code of Practice for EV Charging require additional earthing measures where an EV charger is installed outdoors on a PME supply. The standard approach is an earth rod creating a TT arrangement at the charger, or a charger with integrated PEN fault detection. Your installer will assess the earthing requirements during the site survey.',
  },
  {
    question: 'Can I install an EV charger on a Bristol Victorian terrace?',
    answer:
      'Yes, though it requires more planning than a modern property. Bristol terraces — particularly in Clifton, Redland, Totterdown, and Montpelier — often have the consumer unit at the rear of the property while parking is at the front. This can mean a cable run of 12 to 20 metres. Some Bristol terraces are on steep roads, which adds complexity to the cable run and the positioning of the charger unit. Conservation area designations in areas such as Clifton and parts of Redland may also affect permitted development rights for external charger mounting.',
  },
  {
    question: 'Does Bristol have a Clean Air Zone that affects EV charger demand?',
    answer:
      'Yes. Bristol operates a Clean Air Zone in the city centre, which charges non-compliant vehicles a daily fee. Zero-emission electric vehicles are exempt. This provides a financial incentive for Bristol residents to switch to EVs and install home charging. The CAZ is one reason Bristol has particularly high EV adoption rates relative to its size.',
  },
  {
    question: 'What is the difference between a 7kW and 22kW home EV charger?',
    answer:
      'A 7kW single-phase charger uses the standard single-phase supply that every Bristol home has, adding approximately 25 to 30 miles of range per hour of charging. Overnight charging from 7kW is sufficient to fully restore range for typical daily driving. A 22kW charger requires a three-phase supply — uncommon in Bristol domestic properties — and G99 prior approval from National Grid Electricity Distribution. The additional cost and lead time of upgrading to three-phase supply is rarely justified for domestic use. For most Bristol households, a 7kW smart charger is the right choice.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost UK',
    description:
      'National price guide for EV charger installation covering all charger types and cost factors.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Complete technical guide to EV charger installation covering Section 722, earthing, and testing.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the cable for your EV charger circuit with automatic derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete the Electrical Installation Certificate for EV charger installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Consumer unit upgrade requirements — often needed when adding a 32A EV charger circuit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrician/bristol',
    title: 'Electrician in Bristol',
    description:
      'Find qualified electricians in Bristol for EV charger installation and other electrical work.',
    icon: MapPin,
    category: 'Location',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'EV Charger Installation in Bristol: What to Expect',
    content: (
      <>
        <p>
          Bristol consistently ranks among the top UK cities for EV ownership and environmental
          awareness. The city's Clean Air Zone, cycle culture, and progressive transport policies
          make it fertile ground for EV adoption — and home EV charger installation is in high
          demand across all of Bristol's neighbourhoods.
        </p>
        <p>
          Bristol's housing stock is varied. The city has extensive Victorian and Edwardian terraced
          streets in areas such as Clifton, Redland, Totterdown, and Montpelier; large inter-war
          council and private estates in Bedminster, Filton, and Knowle; and significant modern
          development on the city's east and north fringes. The hilly terrain in Clifton,
          Totterdown, and Kingsdown creates unique cable routing considerations — driveways on steep
          gradients and properties spread across split levels.
        </p>
        <p>
          All installations must comply with BS 7671 Section 722 and must be notified to{' '}
          <strong>National Grid Electricity Distribution</strong> (the successor to Western Power
          Distribution) before the charger is energised.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Bristol EV Charger Installation Costs (2026)',
    content: (
      <>
        <p>
          Bristol labour rates sit above the South West average and are broadly comparable with
          other large English cities outside London. Electrician day rates in Bristol typically run
          from £300 to £420.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Bristol Costs (7kW Single-Phase, 2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern semi/detached, short cable run)</strong> — £750
                to £1,050. Henleaze, Westbury-on-Trym, Fishponds, Keynsham. Modern consumer units
                with spare capacity and driveway parking close to the board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (inter-war semi, 8–15m cable run)</strong> — £950 to
                £1,200. Common across Bedminster, Knowle, Filton, Horfield. Possible earthing works
                and minor board upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (Victorian terrace, steep site, long run)</strong> —
                £1,200 to £1,600+. Clifton, Redland, Totterdown, Montpelier, Kingsdown. Longer cable
                runs, earthing works, board upgrade, and conservation area considerations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: '7kw-vs-22kw',
    heading: '7kW vs 22kW EV Chargers for Bristol Homes',
    content: (
      <>
        <p>
          A 7kW smart charger is the right choice for virtually all Bristol domestic properties.
          Three-phase 22kW chargers require a three-phase supply — uncommon in Bristol houses and
          flats — and G99 prior approval from National Grid Electricity Distribution. For a typical
          Bristol household driving 30 to 40 miles per day, a 7kW charger charging overnight
          provides full range restoration. The 22kW option adds significant cost and lead time with
          limited practical benefit for domestic use.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">7kW — Best for Bristol Homes</h3>
            <p className="text-white text-sm leading-relaxed">
              Standard single-phase supply. All Bristol properties. 25–30 miles range per hour. G98
              notification only. Typical installed cost £750 to £1,400. Smart tariff scheduling
              reduces overnight running cost significantly.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">22kW — Commercial Use Cases</h3>
            <p className="text-white text-sm leading-relaxed">
              Three-phase supply required. Uncommon in Bristol domestic properties. G99 prior
              approval (4–10 weeks). Supply upgrade cost significant. Most EVs cap AC charging at
              7.4kW or 11kW regardless of charger output.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'smart-chargers',
    heading: 'Smart Charger Requirements in Bristol',
    content: (
      <>
        <p>
          All new home EV charger installations in Bristol must use a smart charger compliant with
          the Electric Vehicles (Smart Charge Points) Regulations 2021. Smart chargers must support
          off-peak scheduling, internet connectivity, and energy metering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak tariff scheduling</strong> — Bristol households on Octopus Go, OVO,
                or similar time-of-use tariffs can reduce overnight charging costs by 50 to 70%.
                Smart charger scheduling automates this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar export integration</strong> — Bristol's relatively mild climate and
                growing solar PV uptake makes solar-linked smart chargers such as Zappi popular.
                Surplus solar generation is diverted to the EV before exporting to the grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>App control</strong> — schedule, monitor, and control charging remotely. All
                compliant smart charger brands (Zappi, Ohme, Easee, Wallbox) include smartphone app
                control as standard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Bristol Installations',
    content: (
      <>
        <p>
          All EV charger installations in Bristol must comply with BS 7671:2018+A3:2024 Section 722.
          Bristol is in England, so Part P of the Building Regulations applies — a full rewire or
          new circuit installation is notifiable work, and the installer must be registered with a
          competent person scheme (NICEIC, NAPIT, or ELECSA) to self-certify.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each EV charger
                requires its own dedicated circuit. Older Bristol consumer units without spare ways
                need upgrading or an additional enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection including Type B or Type A with 6mA DC RDC-DD where the charger may
                produce DC residual currents. Most quality charger units include compliant
                integrated DC protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing (Regulation 722.411.4.1)</strong> — most Bristol properties are
                on PME supplies. Outdoor chargers require an earth rod or charger with PEN fault
                detection. Assessment required during site survey.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop on long cable runs</strong> — Bristol terraces with long cable
                runs (15 to 20 metres) from rear consumer units to front parking require careful{' '}
                <SEOInternalLink href="/cable-sizing-calculator">
                  cable sizing
                </SEOInternalLink>
                . 10mm² cable may be needed to keep voltage drop within limits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'National Grid Electricity Distribution DNO Notification',
    content: (
      <>
        <p>
          <strong>National Grid Electricity Distribution</strong> (formerly Western Power
          Distribution) covers Bristol and the wider South West. Every EV charger installation must
          be notified before the charger is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 (standard domestic 7kW)</strong> — notification via the National Grid
                Electricity Distribution online portal. No prior approval needed. Submit and proceed
                with installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 (three-phase/commercial)</strong> — prior approval required. Allow 4 to
                10 weeks for network capacity assessment. Required for 22kW three-phase
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician submits DNO
                notification. Confirm it is included in your quote before accepting.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'OZEV Grant and Bristol Incentives',
    content: (
      <>
        <p>
          Bristol residents can access the following financial support for EV charger installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and tenants.
                Not available to homeowners in houses. The OZEV-approved installer applies on your
                behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bristol Clean Air Zone exemption</strong> — zero-emission vehicles are
                exempt from Clean Air Zone charges. This reduces the running costs of EV ownership
                and makes home charging a worthwhile investment for Bristol city centre commuters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Bristol businesses can claim up to £350
                per socket (up to 40 sockets) for workplace EV charger installations via the OZEV
                scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Bristol',
    content: (
      <>
        <p>
          Bristol is one of the most active UK cities for domestic EV charger installation outside
          London. High EV ownership rates, the Clean Air Zone, and a progressive demographic create
          strong and consistent demand. The city's hilly terrain and Victorian housing stock create
          job complexity that is worth factoring into quotes.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Bristol Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Bristol day rates (£300 to £420), long cable runs in Victorian terraces,
                  steep site access, PME earthing requirements, and conservation area constraints.
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification and Compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every installation requires an{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>
                  , National Grid Electricity Distribution G98/G99 notification, and Part P Building
                  Regulations notification. Complete all documentation on your phone from the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Bristol EV installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Professional quotes and certificates from your phone."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationBristolPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Bristol 2026 | Costs, DNO, and Grants"
      description="How much does EV charger installation cost in Bristol in 2026? Local costs, National Grid DNO notification, OZEV grant, Clean Air Zone, Victorian terrace guidance, PME earthing, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Bristol Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Bristol:{' '}
          <span className="text-yellow-400">Costs, DNO, and Grants 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation in Bristol, National Grid DNO notification, OZEV grant, Clean Air Zone exemption, Victorian terrace and hillside property guidance, and Section 722 compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Bristol"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
