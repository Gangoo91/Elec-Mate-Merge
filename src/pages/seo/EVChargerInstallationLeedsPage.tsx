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
  { label: 'Leeds', href: '/guides/ev-charger-installation-leeds' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Leeds' },
  { id: 'costs', label: 'Leeds Installation Costs' },
  { id: '7kw-vs-22kw', label: '7kW vs 22kW Chargers' },
  { id: 'smart-chargers', label: 'Smart Chargers' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'dno-notification', label: 'NPG DNO Notification' },
  { id: 'grants', label: 'OZEV Grant and Leeds Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in Leeds typically costs between £700 and £1,400 total, reflecting Yorkshire labour rates and the mix of back-to-back terraces, semi-detached houses, and new-build estates across the city.',
  'Leeds is served by Northern Powergrid (NPG). All EV charger installations must be notified to NPG under G98 (single-phase domestic) before the charger is energised.',
  'The OZEV EV chargepoint grant offers up to £350 for eligible flat owners and tenants, reducing the net cost of installation significantly.',
  'Regulation 722.411.4.1 of BS 7671 requires careful attention to earthing where EV chargers are installed outdoors on PME (TN-C-S) supplies, which is the predominant supply type across Leeds.',
  'Smart chargers with off-peak scheduling can reduce overnight charging costs substantially — important for Leeds households on time-of-use electricity tariffs.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Leeds in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Leeds costs between £700 and £1,400 in 2026. The lower end applies to straightforward installations on modern semis or new-build estates — common in areas such as Roundhay, Horsforth, and Morley — where the consumer unit is close to the parking. The higher end applies to older back-to-back terraces in inner Leeds (Headingley, Hyde Park, Beeston) where longer cable runs, earthing works, or a consumer unit upgrade are needed. Electrician day rates in Leeds are typically £300 to £400.',
  },
  {
    question: 'Which DNO covers Leeds for EV charger notification?',
    answer:
      'Northern Powergrid (NPG) is the Distribution Network Operator for Leeds and the wider Yorkshire region. All domestic EV charger installations must be notified to NPG under Engineering Recommendation G98 before the charger is connected to the supply. For standard 7kW single-phase chargers (up to 16A per phase), G98 is a notification — no prior approval is required. Three-phase 22kW chargers require G99 prior approval, which can take 4 to 10 weeks.',
  },
  {
    question: 'Is the OZEV grant available for EV charger installation in Leeds?',
    answer:
      'Yes. The OZEV EV chargepoint grant is available to flat owners and tenants in Leeds (not homeowners in houses). It covers up to 75% of the installation cost, capped at £350. The grant is applied for by the OZEV-approved installer on behalf of the homeowner or tenant. Leeds City Council does not currently operate a separate local grant scheme, but the national grant applies throughout the city.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in Leeds?',
    answer:
      'Possibly. Most Leeds properties are supplied via a PME (TN-C-S) system. Regulation 722.411.4.1 of BS 7671 and the IET Code of Practice for EV Charging require additional earthing measures where a vehicle is connected outdoors on a PME supply. The typical solution is installing a local earth electrode (earth rod) at the charger location to create a TT arrangement, or using a charger with integrated PEN fault detection. Your installer will assess the earthing requirements during the site survey.',
  },
  {
    question: 'What is the difference between a 7kW and 22kW home EV charger?',
    answer:
      'A 7kW charger runs on a standard single-phase 32A circuit — the same supply that most Leeds homes already have — and adds approximately 25 to 30 miles of range per hour of charging. A 22kW charger requires a three-phase supply, which most domestic properties in Leeds do not have. Upgrading to three-phase supply requires a DNO application to Northern Powergrid (G99 approval) and a supply upgrade, adding significant cost and lead time. For domestic use, a 7kW smart charger is suitable for the vast majority of Leeds households.',
  },
  {
    question: 'Can I install an EV charger at a Leeds back-to-back terrace?',
    answer:
      'Back-to-back terraces are a distinctive part of Leeds housing stock, particularly in inner-city areas such as Harehills, Beeston, and Holbeck. These properties typically have very limited off-street parking — often only a rear yard accessed via a shared ginnel. Installing a charger at a back-to-back requires a cable run from the consumer unit (usually at the front of the property) to the rear yard, which can be 10 to 20 metres. On-street parking is not suitable for a home charger; the property must have a defined parking space that the occupant has control over.',
  },
  {
    question: 'Do I need planning permission for an EV charger in Leeds?',
    answer:
      'In most cases, no. Installing a wall-mounted EV charger is permitted development for residential properties in England. However, if your property is listed or in a conservation area — Leeds has a number of conservation areas including parts of Headingley, Roundhay, and the city centre fringe — you should check with Leeds City Council Planning before installing. Listed building consent may be required for any external fixings or cable routes that affect the fabric of the building.',
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
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size the cable for your EV charger circuit with automatic derating and voltage drop checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
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
    href: '/electrician/leeds',
    title: 'Electrician in Leeds',
    description:
      'Find qualified electricians in Leeds for EV charger installation and other electrical work.',
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
    heading: 'EV Charger Installation in Leeds: What to Expect',
    content: (
      <>
        <p>
          Leeds is one of the fastest-growing cities in the UK, with a diverse housing stock ranging
          from Victorian back-to-back terraces in the inner city to large new-build estates in
          Garforth, Horsforth, and Wetherby. EV adoption across West Yorkshire is growing steadily,
          driven by improving charging infrastructure and the expansion of clean air zones.
        </p>
        <p>
          For most Leeds homeowners, installing a home EV charger is straightforward and
          cost-effective. Modern semis and detached houses with a driveway or garage present few
          complications. Older terraced properties — particularly back-to-backs — require more
          planning around cable routing and parking availability. This guide covers realistic costs,
          the Northern Powergrid notification process, smart charger options, and the OZEV grant as
          it applies to Leeds residents.
        </p>
        <p>
          All EV charger installations in Leeds must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722 and must be notified to{' '}
          <strong>Northern Powergrid (NPG)</strong> before the charger is energised.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Leeds EV Charger Installation Costs (2026)',
    content: (
      <>
        <p>
          Leeds installation costs are broadly in line with the Yorkshire and Humber regional
          average, sitting below London and the South East but above some rural areas. Electrician
          day rates in Leeds typically run from £300 to £400, and a standard installation takes 4 to
          6 hours.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Leeds Costs (7kW Single-Phase, 2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (new-build or modern semi, short cable run)</strong> —
                £700 to £1,000. Consumer unit near the parking, existing board has spare capacity.
                Common in Roundhay, Horsforth, Morley, Garforth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (inter-war semi or 1960s terrace)</strong> — £900 to
                £1,200. Cable run of 8 to 12 metres, possible earthing works. Most common Leeds
                domestic installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long cable run, board upgrade, earth rod)</strong> —
                £1,200 to £1,600+. Older properties in Headingley, Hyde Park, Meanwood, or Beeston
                where the consumer unit is remote from the parking and the board needs upgrading.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include supply and installation of a smart charger unit, all cabling,
          containment, DNO G98 notification, and the{' '}
          <SEOInternalLink href="/tools/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>
          . Earth rod installation (where required) adds approximately £80 to £150.
        </p>
      </>
    ),
  },
  {
    id: '7kw-vs-22kw',
    heading: '7kW vs 22kW EV Chargers for Leeds Homes',
    content: (
      <>
        <p>
          The vast majority of domestic EV charger installations in Leeds use a 7kW single-phase
          unit. Here is how the two main options compare:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">7kW Single-Phase</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Output:</strong> 7.4kW (32A, single-phase)
              </li>
              <li>
                <strong>Range per hour:</strong> approx. 25–30 miles
              </li>
              <li>
                <strong>Supply needed:</strong> Standard single-phase — all Leeds homes
              </li>
              <li>
                <strong>DNO notification:</strong> G98 (notification only)
              </li>
              <li>
                <strong>Cost (Leeds):</strong> £700 to £1,400 installed
              </li>
              <li>
                <strong>Best for:</strong> Virtually all domestic applications
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">22kW Three-Phase</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Output:</strong> 22kW (32A per phase, three-phase)
              </li>
              <li>
                <strong>Range per hour:</strong> approx. 75–80 miles
              </li>
              <li>
                <strong>Supply needed:</strong> Three-phase — rare in Leeds domestic properties
              </li>
              <li>
                <strong>DNO notification:</strong> G99 (prior approval, 4–10 weeks)
              </li>
              <li>
                <strong>Cost (Leeds):</strong> £2,500+ including supply upgrade
              </li>
              <li>
                <strong>Best for:</strong> High-mileage users, commercial premises
              </li>
            </ul>
          </div>
        </div>
        <p>
          For domestic Leeds properties, a 7kW charger is almost always the right choice. Most
          electric vehicles can only accept 7.4kW on single-phase AC regardless of charger output,
          and overnight charging from 7kW is sufficient to fully charge most EVs within 6 to 8
          hours.
        </p>
      </>
    ),
  },
  {
    id: 'smart-chargers',
    heading: 'Smart Chargers for Leeds Homes',
    content: (
      <>
        <p>
          Since December 2022, all new home EV charger installations in Great Britain must use a
          smart charger that meets the requirements of the Electric Vehicles (Smart Charge Points)
          Regulations 2021. This applies throughout Leeds. Smart chargers must:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schedule charging during off-peak hours</strong> — smart chargers can be
                programmed to charge overnight when electricity unit rates are lowest. Leeds
                households on Octopus Go, EDF GoElectric, or similar time-of-use tariffs can reduce
                charging costs by 50 to 70% compared with daytime rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connect to the internet</strong> — via Wi-Fi or 4G for remote monitoring,
                scheduling, and firmware updates. The installer will set up the Wi-Fi connection
                during commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Randomise start time</strong> — to reduce grid demand peaks, smart chargers
                default to a randomised delay on plug-in. This can be overridden by the user via the
                app.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Measure energy consumption</strong> — smart chargers record energy delivered
                per session, which is useful for HMRC business mileage claims if the vehicle is used
                for work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Popular smart charger brands in the UK include Zappi, Ohme, Easee, and Wallbox. All
          models sold through OZEV-approved installers meet the Smart Charge Points Regulations.
        </p>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Leeds Installations',
    content: (
      <>
        <p>
          All EV charger installations in Leeds must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The key requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each EV charger must
                have its own dedicated circuit from the consumer unit. Sharing circuits with other
                loads is not permitted. If the consumer unit has no spare ways, an upgrade or
                additional enclosure is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — the EV circuit requires
                appropriate RCD protection. Where the charger can produce DC residual currents, a
                Type B RCD or Type A RCD with a 6mA DC RDC-DD is required. Most quality charger
                units include integrated DC protection compliant with this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing (Regulation 722.411.4.1)</strong> — on PME supplies (the majority
                of Leeds properties), additional earthing measures are required for outdoor charging
                points. An earth rod or charger with integrated PEN fault detection is the standard
                solution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to confirm the circuit cable size meets both current-carrying capacity and voltage
                drop requirements. Long cable runs in older Leeds properties may require 10mm²
                rather than 6mm² cable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'Northern Powergrid DNO Notification for Leeds Installations',
    content: (
      <>
        <p>
          <strong>Northern Powergrid (NPG)</strong> is the Distribution Network Operator for Leeds
          and the wider Yorkshire and North East region. Every EV charger installation must be
          notified to NPG before the charger is connected to the supply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (standard domestic 7kW)</strong> — for single-phase
                chargers up to 3.68kW per phase (16A), submit a G98 notification via the NPG online
                portal. This is a notification, not an application. The installation can proceed
                without waiting for a response.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase or multiple units)</strong> — requires
                prior approval from NPG. Allow 4 to 10 weeks. NPG will assess network capacity in
                the local area. Charges may apply for network reinforcement in some locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the installing electrician submits the
                DNO notification, not the homeowner. Confirm this is included in your quote.
                Energising a charger without notification can result in NPG requiring removal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'OZEV Grant and Leeds Incentives for EV Charger Installation',
    content: (
      <>
        <p>
          The main funding available to Leeds residents installing a home EV charger is the national
          OZEV EV chargepoint grant:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 (75% of eligible
                installation cost) for flat owners and tenants. Not available to homeowners in
                houses. Applied for by the OZEV-approved installer. The installer must be on the
                OZEV approved installer list.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Leeds businesses can claim up to £350
                per socket (up to 40 sockets) for workplace EV charger installations. Administered
                by OZEV and available to Leeds employers in all sectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leeds Clean Air Zone</strong> — Leeds operates a Clean Air Zone in the city
                centre. Zero-emission vehicles are exempt from any charges that apply to non-compliant
                vehicles, providing an ongoing financial incentive for EV ownership alongside home
                charging.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Leeds',
    content: (
      <>
        <p>
          Leeds is a strong market for domestic EV charger installation. Demand is growing in
          established residential areas such as Roundhay, Alwoodley, and Chapel Allerton, as well as
          on new-build estates on the city fringe.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Leeds Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Yorkshire day rates (£300 to £400), cable run lengths in older terraced
                  stock, potential board upgrades on pre-2000 consumer units, and parking
                  considerations in inner-city Leeds streets. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
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
                  Every EV charger installation requires an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>
                  , NPG G98/G99 notification, and Building Regulations notification (Part P). Complete
                  all documentation on your phone from the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Leeds EV installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Professional quotes and certificates from your phone."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationLeedsPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Leeds 2026 | Costs, Grants, and DNO"
      description="How much does EV charger installation cost in Leeds in 2026? Local costs, Northern Powergrid DNO notification, OZEV grant, 7kW vs 22kW chargers, smart charger requirements, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Leeds Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Leeds:{' '}
          <span className="text-yellow-400">Costs, Grants, and DNO 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation across Leeds, Northern Powergrid DNO notification, OZEV grant eligibility, 7kW vs 22kW charger options, smart charger requirements, and Section 722 compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
