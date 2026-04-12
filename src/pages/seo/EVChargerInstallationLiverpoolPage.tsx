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
  { label: 'Liverpool', href: '/guides/ev-charger-installation-liverpool' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Liverpool' },
  { id: 'costs', label: 'Liverpool Installation Costs' },
  { id: '7kw-vs-22kw', label: '7kW vs 22kW Chargers' },
  { id: 'smart-chargers', label: 'Smart Chargers' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'dno-notification', label: 'Electricity North West DNO Notification' },
  { id: 'grants', label: 'OZEV Grant and Liverpool Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A domestic 7kW EV charger installation in Liverpool typically costs between £650 and £1,300, reflecting North West labour rates and the city's mix of Victorian terraces, Edwardian semis, and modern estates across Merseyside.",
  'Liverpool is served by Electricity North West as the Distribution Network Operator. All EV charger installations must be notified under G98 before the charger is energised.',
  'The OZEV EV chargepoint grant offers up to £350 for eligible flat owners and tenants in Liverpool and across Merseyside.',
  'Regulation 722.411.4.1 of BS 7671 requires earthing consideration for outdoor EV chargers on PME supplies, which predominate across Liverpool.',
  'Smart chargers are mandatory for all new home EV charger installations in Great Britain since December 2022, enabling off-peak scheduling and significant electricity cost savings.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Liverpool in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Liverpool costs between £650 and £1,300 in 2026. The lower end applies to modern semis and detached houses in areas such as Woolton, West Derby, Crosby, and Formby, where the consumer unit is close to the parking. Victorian and Edwardian terraces in Kensington, Wavertree, Toxteth, and Aigburth — with longer cable runs and older consumer units — sit towards the higher end. Electrician day rates in Liverpool are typically £280 to £380.',
  },
  {
    question: 'Which DNO covers Liverpool for EV charger notification?',
    answer:
      'Electricity North West is the Distribution Network Operator for Liverpool and the wider Merseyside and Lancashire area. All domestic EV charger installations must be notified to Electricity North West under Engineering Recommendation G98 before the charger is connected. For standard 7kW single-phase chargers (up to 16A per phase), G98 is a notification — no prior approval is needed. Three-phase 22kW chargers require G99 prior approval, which can take 4 to 10 weeks.',
  },
  {
    question: 'Is the OZEV grant available for EV charger installation in Liverpool?',
    answer:
      'Yes. The OZEV EV chargepoint grant is available to flat owners and tenants in Liverpool and across Merseyside, covering up to 75% of eligible installation cost capped at £350. Homeowners in houses do not qualify. The OZEV-approved installer applies for the grant on your behalf. Liverpool City Council does not currently operate a separate residential EV charger grant scheme, but the national grant applies throughout Merseyside.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in Liverpool?',
    answer:
      'Possibly. Most Liverpool properties are on a PME (TN-C-S) supply. Regulation 722.411.4.1 of BS 7671 and the IET Code of Practice for EV Charging require additional earthing measures where an EV charger is installed outdoors on a PME supply. The standard approach is an earth rod creating a TT arrangement at the charger, or a charger with integrated PEN fault detection. Your installer will confirm the earthing requirement during the site survey.',
  },
  {
    question: 'Can I install an EV charger at a Liverpool terrace house?',
    answer:
      'Yes, in most cases. Liverpool has extensive Victorian and Edwardian terraced housing, particularly in the inner city and inner suburbs. Where the property has off-street parking (rear yard or front bay), a charger can be installed with a cable run from the consumer unit. In older Liverpool terraces, the consumer unit may be at the front of the property (under the stairs or in the hallway), making the cable run to rear parking longer and more complex. A survey is essential to confirm the route and cost before accepting a quote.',
  },
  {
    question: 'What smart charger brands are available for Liverpool homes?',
    answer:
      'All major smart charger brands are available throughout Merseyside, including Zappi (popular for solar integration), Ohme (strong tariff integration), Easee (compact and stylish), and Wallbox (feature-rich app control). All OZEV-approved brands meet the Smart Charge Points Regulations 2021. Your installer will recommend a suitable model based on your parking situation, vehicle type, and any solar PV system. Most brands cost £650 to £900 supply and installed for a standard Liverpool home installation.',
  },
  {
    question: 'Does Liverpool have a Clean Air Zone?',
    answer:
      'Liverpool City Region has developed plans for clean air zones across parts of the city region, though the specific implementation timeline has evolved. Zero-emission vehicles are expected to be exempt from any Clean Air Zone charges if and when they are introduced. Installing a home EV charger is a practical preparation for increasing clean air requirements across Merseyside. Check Liverpool City Council and Liverpool City Region Combined Authority for the current status of clean air zone implementation.',
  },
  {
    question: 'How long does a Liverpool EV charger installation take?',
    answer:
      'A standard 7kW EV charger installation in a Liverpool home takes 4 to 6 hours for a straightforward job — modern consumer unit, short cable run, no earthing complications. More complex installations (long cable runs in Victorian terraces, consumer unit upgrade, earth rod installation) take 6 to 8 hours or potentially a full day. The electrician will complete the DNO G98 notification and issue the Electrical Installation Certificate on the same day as the installation.',
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
    href: '/electrician/liverpool',
    title: 'Electrician in Liverpool',
    description:
      'Find qualified electricians in Liverpool for EV charger installation and other electrical work.',
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
    heading: 'EV Charger Installation in Liverpool: What to Expect',
    content: (
      <>
        <p>
          Liverpool and the wider Merseyside area have seen growing EV adoption, supported by
          improving public charging infrastructure across the city region and a strong push from the
          Liverpool City Region Combined Authority towards cleaner transport. For most Liverpool
          homeowners, installing a home EV charger is the most cost-effective way to charge an
          electric vehicle.
        </p>
        <p>
          Liverpool's housing stock is dominated by Victorian and Edwardian terraced streets,
          inter-war council and private semis, and 1960s to 1980s estates across Merseyside. This
          creates a range of installation complexities. Modern properties on new estates in Crosby,
          Formby, and Woolton are typically straightforward. Older terraced properties in
          Kensington, Wavertree, Everton, and inner Toxteth require more planning around cable
          routing, consumer unit capacity, and earthing.
        </p>
        <p>
          All EV charger installations in Liverpool must comply with BS 7671 Section 722 and be
          notified to <strong>Electricity North West</strong> before energisation.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Liverpool EV Charger Installation Costs (2026)',
    content: (
      <>
        <p>
          Liverpool has some of the most competitive electrician day rates of any major UK city,
          typically running from £280 to £380. This means EV charger installation costs are below
          the national average in many cases, though complex jobs still attract higher prices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Liverpool Costs (7kW Single-Phase, 2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern semi/detached, short cable run)</strong> — £650
                to £950. Woolton, West Derby, Crosby, Formby, Halewood. Modern consumer unit, clear
                cable route, no earthing complications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (inter-war semi, 8–14m cable run)</strong> — £800 to
                £1,100. Common across south Liverpool: Allerton, Aigburth, Wavertree, Childwall.
                Possible earthing works and minor consumer unit upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (Victorian terrace, long run, board upgrade)</strong> —
                £1,000 to £1,400+. Inner Liverpool: Kensington, Wavertree terraces, Toxteth,
                Everton. Longer cable runs, earthing works, consumer unit upgrade.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include supply and installation of a smart charger, all cabling and containment,
          DNO G98 notification, and the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: '7kw-vs-22kw',
    heading: '7kW vs 22kW EV Chargers for Liverpool Homes',
    content: (
      <>
        <p>
          A 7kW smart charger is the appropriate choice for virtually all Liverpool domestic
          properties. Three-phase 22kW chargers require a three-phase supply — not available in most
          Merseyside domestic properties without a costly supply upgrade — and G99 prior approval
          from Electricity North West.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">7kW — Right for Liverpool Homes</h3>
            <p className="text-white text-sm leading-relaxed">
              Standard single-phase supply. Every Liverpool property qualifies. 25–30 miles range
              per hour. G98 notification only. Cost £650 to £1,300 installed. Smart scheduling cuts
              overnight running costs significantly on time-of-use tariffs.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">22kW — Commercial/High-Use Only</h3>
            <p className="text-white text-sm leading-relaxed">
              Three-phase supply required. Uncommon in Liverpool domestic properties. G99 prior
              approval needed (4–10 weeks). Most EVs cap AC charging at 7.4kW or 11kW regardless.
              Only suitable for very high mileage users or commercial premises.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'smart-chargers',
    heading: 'Smart Charger Requirements in Liverpool',
    content: (
      <>
        <p>
          All new home EV charger installations in Liverpool must use a compliant smart charger
          under the Electric Vehicles (Smart Charge Points) Regulations 2021. Smart charger features
          relevant to Liverpool households:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak tariff scheduling</strong> — Liverpool households on time-of-use
                tariffs such as Octopus Go or OVO Charge Anytime can cut overnight charging costs by
                up to 70% versus peak rates. Smart charger scheduling automates off-peak charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remote monitoring and control</strong> — start, stop, and schedule charging
                from a smartphone app. All OZEV-approved smart charger brands include app control as
                standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy metering</strong> — smart chargers record energy consumption per
                session, useful for HMRC business mileage claims if the vehicle is used for work.
                Mandatory under the Smart Charge Points Regulations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Liverpool Installations',
    content: (
      <>
        <p>
          All EV charger installations in Liverpool must comply with BS 7671:2018+A3:2024 Section
          722. Liverpool is in England, so Part P of the Building Regulations applies. The
          installing electrician must be registered with NICEIC, NAPIT, or ELECSA to self-certify
          and submit the Part P notification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — each EV charger
                requires its own dedicated circuit from the consumer unit. Older Liverpool consumer
                units without spare ways need upgrading or an additional enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection including Type A with 6mA DC RDC-DD or Type B RCD where required. Most
                quality charger units include integrated DC protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earthing (Regulation 722.411.4.1)</strong> — outdoor chargers on PME
                supplies require an earth rod or charger with integrated PEN fault detection. Site
                survey will confirm the requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — long cable runs in Victorian Liverpool terraces
                require careful{' '}
                <SEOInternalLink href="/cable-sizing-calculator">
                  cable sizing
                </SEOInternalLink>{' '}
                for voltage drop. 10mm² cable may be needed on runs over 15 metres.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'Electricity North West DNO Notification for Liverpool',
    content: (
      <>
        <p>
          <strong>Electricity North West</strong> is the Distribution Network Operator for Liverpool
          and Merseyside. Every EV charger installation must be notified to Electricity North West
          before the charger is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 (standard domestic 7kW)</strong> — notification via the Electricity
                North West online portal. No prior approval needed. Proceed with installation after
                submitting notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 (three-phase or commercial)</strong> — prior approval required from
                Electricity North West. Allow 4 to 10 weeks. Required for 22kW three-phase
                installations and multi-unit sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician submits the DNO
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
    heading: 'OZEV Grant and Liverpool Incentives',
    content: (
      <>
        <p>
          Liverpool residents can access the following financial support for EV charger
          installation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and tenants.
                Not available to homeowners in houses. Applied for by the OZEV-approved installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Liverpool City Region EV strategy</strong> — the Liverpool City Region
                Combined Authority has committed to expanding EV charging infrastructure across
                Merseyside as part of its transport strategy. Public charging investment supports
                the wider transition to EVs alongside home charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Liverpool businesses can claim up to
                £350 per socket (up to 40 sockets) for workplace EV charger installations via the
                OZEV scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Installations in Liverpool',
    content: (
      <>
        <p>
          Liverpool offers a growing and competitive market for domestic EV charger installation.
          Lower labour rates than national average mean pricing must be accurate — the margin for
          error on under-quoted complex jobs is limited. Understand the local housing stock before
          quoting: Victorian terraces in inner Liverpool require careful site surveys.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Liverpool Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Liverpool day rates (£280 to £380), cable run lengths in Victorian
                  terraces, PME earthing requirements, and board upgrades on pre-RCD consumer units.
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
                  , Electricity North West G98/G99 notification, and Part P Building Regulations
                  notification. Complete all documentation on your phone from the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Liverpool EV installations"
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

export default function EVChargerInstallationLiverpoolPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Liverpool 2026 | Costs, DNO, and Grants"
      description="How much does EV charger installation cost in Liverpool in 2026? Local costs, Electricity North West DNO notification, OZEV grant, smart charger requirements, Section 722 compliance, and PME earthing guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Liverpool Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Liverpool:{' '}
          <span className="text-yellow-400">Costs, DNO, and Grants 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation in Liverpool and Merseyside, Electricity North West DNO notification, OZEV grant eligibility, smart charger requirements, and Section 722 compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Liverpool"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
