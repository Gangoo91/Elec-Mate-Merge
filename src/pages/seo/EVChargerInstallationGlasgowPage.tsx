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
  { label: 'Glasgow', href: '/guides/ev-charger-installation-glasgow' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Glasgow' },
  { id: 'costs', label: 'Glasgow Installation Costs' },
  { id: '7kw-vs-22kw', label: '7kW vs 22kW Chargers' },
  { id: 'smart-chargers', label: 'Smart Chargers' },
  { id: 'section-722', label: 'Section 722 and Scottish Regulations' },
  { id: 'dno-notification', label: 'SSEN DNO Notification' },
  { id: 'grants', label: 'OZEV Grant and Glasgow Incentives' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic 7kW EV charger installation in Glasgow typically costs between £750 and £1,400, reflecting Scottish Central Belt labour rates and the mix of tenement flats, semis, and modern housing across the city.',
  'Glasgow is served by SP Energy Networks (SPEN) as the Distribution Network Operator. All EV charger installations must be notified under G98 before the charger is energised.',
  'Scotland uses the Building Standards system administered by local authorities — not Part P as in England. EV charger installations in Scotland must comply with the Building (Scotland) Act 2003 and relevant Technical Handbooks.',
  'The OZEV EV chargepoint grant (up to £350) is available to flat owners and tenants in Scotland, including Glasgow tenement flat residents.',
  'Regulation 722.411.4.1 of BS 7671 earthing requirements apply equally in Scotland. Most Glasgow properties are on PME (TN-C-S) supplies, requiring careful consideration of outdoor charging earthing.',
];

const faqs = [
  {
    question: 'How much does it cost to install an EV charger in Glasgow in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Glasgow costs between £750 and £1,400 in 2026. The lower end applies to modern semis and detached houses in areas such as Bearsden, Newton Mearns, and Bishopbriggs, where the consumer unit is close to the parking and no earthing complications arise. Tenement flats and older terraced properties in the West End, Southside, and inner city require longer cable runs, earthing assessments, and sometimes consumer unit upgrades, pushing costs towards the higher end. Electrician day rates in Glasgow are typically £300 to £400.',
  },
  {
    question: 'Which DNO covers Glasgow for EV charger notification?',
    answer:
      'SP Energy Networks (SPEN) is the Distribution Network Operator for Glasgow and the wider central Scotland area. All domestic EV charger installations must be notified to SPEN under Engineering Recommendation G98 before the charger is connected. For standard 7kW single-phase chargers (up to 16A per phase), G98 is a notification — no prior approval is needed. Three-phase 22kW installations require G99 prior approval, which can take 4 to 10 weeks.',
  },
  {
    question: 'Does Scotland have different building regulations for EV charger installation?',
    answer:
      'Yes. Scotland operates its own Building Standards system under the Building (Scotland) Act 2003, administered by local authority building standards officers. This is separate from Part P of the Building Regulations, which applies only in England and Wales. In Scotland, EV charger installations that involve significant electrical work are notifiable under Building Standards. Glasgow City Council Building Standards handles notifications for properties within the city. Electricians registered with NICEIC, NAPIT, or SELECT (the Scottish equivalent) can self-certify certain works. SELECT is the leading electrical trade body in Scotland and SELECT-registered electricians are particularly common in Glasgow.',
  },
  {
    question: 'Can I install an EV charger in a Glasgow tenement flat?',
    answer:
      "It is possible but involves practical and legal hurdles. Glasgow tenements typically have shared common stairs, shared electrical risers, and communal parking areas or on-street parking only. Installing a charger requires a defined private parking space, permission from the property factors (managing agents), and a viable cable route from the flat's electricity supply. Tenement flat residents who own their property are eligible for the OZEV EV chargepoint grant (up to £350). The practical solution in many Glasgow tenements is a communal charging installation with load management, rather than individual chargers.",
  },
  {
    question: 'Is the OZEV grant available for EV charger installation in Glasgow?',
    answer:
      'Yes. The OZEV EV chargepoint grant applies across the UK, including Scotland. Flat owners and tenants in Glasgow — including those in tenement flats — can claim up to £350 (75% of eligible installation cost). The grant is not available to homeowners in houses. The installing electrician must be OZEV-approved and applies for the grant on your behalf.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in Glasgow?',
    answer:
      'Possibly. Most Glasgow properties are on a PME (TN-C-S) supply. Regulation 722.411.4.1 of BS 7671 requires additional earthing measures where an EV charger is installed outdoors on a PME supply. The standard solution is an earth rod creating a local TT arrangement at the charger, or a charger with integrated PEN fault detection. Your installer will assess during the site survey.',
  },
  {
    question: 'What is SELECT and do I need a SELECT-registered electrician in Glasgow?',
    answer:
      "SELECT (the Electrical Contractors' Association of Scotland) is Scotland's leading electrical trade body. SELECT-registered electricians are qualified to self-certify electrical work under the Scottish Building Standards system. While SELECT registration is not legally mandatory, using a SELECT-registered electrician in Glasgow is strongly recommended. Alternatively, NICEIC and NAPIT registration is also recognised in Scotland. Always verify that your electrician's registration covers Building Standards notification in Scotland — some English competent person schemes do not automatically extend to Scotland.",
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
    href: '/electrician/glasgow',
    title: 'Electrician in Glasgow',
    description:
      'Find qualified electricians in Glasgow for EV charger installation and other electrical work.',
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
    heading: 'EV Charger Installation in Glasgow: What to Expect',
    content: (
      <>
        <p>
          Glasgow is Scotland's largest city and its most diverse in terms of housing stock. The
          city encompasses traditional tenement flats in the West End and Southside, stone-built
          semis in the suburbs, inter-war housing in Mosspark and King's Park, and modern new-build
          estates in areas such as Ruchill and Darnley. This variety creates a range of EV charger
          installation challenges and costs.
        </p>
        <p>
          Scotland's regulatory framework differs from England. EV charger installations in Glasgow
          are subject to the Scottish Building Standards system — not Part P as in England.
          Electricians working in Glasgow should be familiar with SELECT registration and Scottish
          local authority building standards requirements. The technical installation requirements,
          however — including BS 7671 Section 722 — apply equally across the UK.
        </p>
        <p>
          The DNO for Glasgow is <strong>SP Energy Networks (SPEN)</strong>. All installations must
          be notified to SPEN before the charger is energised.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Glasgow EV Charger Installation Costs (2026)',
    content: (
      <>
        <p>
          Glasgow installation costs are broadly comparable with other Scottish cities and
          significantly below London rates. Electrician day rates in Glasgow typically run from £300
          to £400.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Glasgow Costs (7kW Single-Phase, 2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern semi or detached, short cable run)</strong> —
                £750 to £1,050. Consumer unit close to parking, existing board adequate. Common in
                Bearsden, Newton Mearns, Bishopbriggs, Pollokshields.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (inter-war semi, medium cable run)</strong> — £950 to
                £1,200. Cable run of 8 to 15 metres, earthing assessment, possible board upgrade.
                Common across Glasgow southside and west end suburbs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (tenement, long run, board upgrade, earth rod)</strong>{' '}
                — £1,200 to £1,600+. Tenement flats with shared risers, longer cable routes, and
                earthing works. Requires freeholder or factor consent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: '7kw-vs-22kw',
    heading: '7kW vs 22kW EV Chargers for Glasgow Homes',
    content: (
      <>
        <p>
          The overwhelming majority of domestic EV charger installations in Glasgow use a 7kW
          single-phase unit. Three-phase 22kW chargers are rarely appropriate for domestic Glasgow
          properties:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">7kW — The Standard Choice</h3>
            <p className="text-white text-sm leading-relaxed">
              Runs on standard single-phase supply. All Glasgow homes have single-phase. Charges
              most EVs fully overnight. G98 notification only — no prior DNO approval needed.
              Typical installed cost £750 to £1,400 in Glasgow. Sufficient for the vast majority of
              users.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">22kW — Rarely Needed Domestically</h3>
            <p className="text-white text-sm leading-relaxed">
              Requires three-phase supply — uncommon in Glasgow domestic properties. Needs G99 prior
              approval from SPEN (4–10 weeks). Supply upgrade costs significant. Only beneficial if
              the vehicle can accept 22kW AC charging — most current EVs cap at 11kW or 7.4kW on AC.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'smart-chargers',
    heading: 'Smart Charger Requirements in Glasgow',
    content: (
      <>
        <p>
          The Electric Vehicles (Smart Charge Points) Regulations 2021 apply throughout Great
          Britain, including Scotland. All new home EV charger installations in Glasgow must use a
          smart charger. Smart chargers must support off-peak scheduling, internet connectivity for
          remote control, and energy metering.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak charging</strong> — Glasgow households on time-of-use tariffs such
                as Octopus Go or OVO Charge Anytime can charge overnight at significantly lower unit
                rates. A smart charger enables automatic scheduling to off-peak windows.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar integration</strong> — smart chargers such as Zappi can integrate with
                solar PV panels, diverting surplus generation to charge the vehicle before exporting
                to the grid. Useful for Glasgow properties with south-facing roofs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>App control</strong> — start, stop, and schedule charging remotely via
                smartphone app. All compliant smart chargers include app control as standard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 and Scottish Building Standards',
    content: (
      <>
        <p>
          EV charger installations in Glasgow must comply with BS 7671:2018+A3:2024 Section 722 —
          the same wiring regulations as the rest of the UK. Scotland applies BS 7671 as the
          technical standard for electrical installations.
        </p>
        <p>The key regulatory difference in Scotland is the notification framework:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Standards (Scotland) — not Part P</strong> — Scotland does not use
                the English Part P competent person scheme. EV charger installations that involve
                significant electrical works are notifiable under the Building (Scotland)
                Regulations 2004. Glasgow City Council Building Standards is the relevant authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELECT registration</strong> — SELECT-registered electricians are recognised
                under the Scottish Building Standards system for self-certification of electrical
                work. NICEIC and NAPIT registration is also recognised. Always confirm your
                electrician's registration covers Scottish Building Standards notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Section 722 requirements</strong> — dedicated circuit per charger
                (Regulation 722.533.101), appropriate RCD protection (Regulation 722.531.101), and
                earthing assessment for outdoor PME-supplied installations (Regulation 722.411.4.1)
                all apply in Glasgow exactly as they do in England.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'SPEN DNO Notification for Glasgow EV Charger Installations',
    content: (
      <>
        <p>
          <strong>SP Energy Networks (SPEN)</strong> is the Distribution Network Operator for
          Glasgow and central Scotland. Every EV charger installation must be notified to SPEN
          before connection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (standard domestic 7kW)</strong> — notification via the
                SPEN online portal. No prior approval needed. The installation can proceed after
                notification is submitted. SPEN processes G98 notifications automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (three-phase/commercial)</strong> — prior approval required.
                Allow 4 to 10 weeks for SPEN to assess network capacity. Required for 22kW
                three-phase installations and multi-unit sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician submits the DNO
                notification. Confirm it is included in your quote. Failure to notify SPEN can
                result in disconnection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'OZEV Grant and Glasgow Incentives',
    content: (
      <>
        <p>Glasgow residents can access the following funding for EV charger installation:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and tenants.
                Tenement flat owners in Glasgow qualify. Not available to homeowners in houses.
                Applied for by the OZEV-approved installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Transport Scotland EV infrastructure</strong> — Transport Scotland funds
                public charging infrastructure across Glasgow, including the ChargePlace Scotland
                network. While this does not directly fund home installations, it supports the wider
                charging ecosystem and complements home charging for tenement residents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Glasgow businesses can claim up to £350
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
    heading: 'For Electricians: EV Charger Installations in Glasgow',
    content: (
      <>
        <p>
          Glasgow is a growing market for domestic EV charger installation. The mix of tenement
          flats, older semis, and new-build estates creates varied job types. Electricians working
          in Glasgow should be SELECT-registered or hold equivalent recognition under the Scottish
          Building Standards system.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Glasgow Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Glasgow day rates (£300 to £400), cable routing challenges in tenement
                  and stone-built properties, earthing requirements on PME supplies, and factor
                  consent requirements for tenement flats. Use Elec-Mate's{' '}
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
                <h4 className="font-bold text-white mb-1">Scottish Compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every installation requires an{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>
                  , SPEN G98 notification, and Building Standards notification under Scottish
                  regulations. Confirm your registration covers Scotland before quoting Glasgow
                  jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Glasgow EV installations"
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

export default function EVChargerInstallationGlasgowPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Glasgow 2026 | Costs, DNO, Scottish Regulations"
      description="How much does EV charger installation cost in Glasgow in 2026? Local costs, SPEN DNO notification, OZEV grant, Scottish Building Standards vs Part P, tenement flat guidance, and Section 722 compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Glasgow Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Glasgow:{' '}
          <span className="text-yellow-400">Costs, DNO, and Scottish Regulations 2026</span>
        </>
      }
      heroSubtitle="Local costs for EV charger installation in Glasgow, SP Energy Networks DNO notification, OZEV grant for tenement flat owners, Scottish Building Standards requirements, and Section 722 compliance."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Glasgow"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
