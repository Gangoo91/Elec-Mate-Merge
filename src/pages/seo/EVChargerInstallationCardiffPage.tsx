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
  MapPin,
  Home,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
  { label: 'Cardiff', href: '/ev-charger-installation-cardiff' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Cardiff' },
  { id: 'costs', label: 'Cardiff Installation Costs' },
  { id: 'welsh-grants', label: 'Welsh Government EV Grants' },
  { id: 'ozev-grants', label: 'OZEV National Grants' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing in Cardiff' },
  { id: 'dno-notification', label: 'SP Energy Networks DNO Notification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "A 7kW home EV charger installation in Cardiff typically costs £800 to £1,200, with Wales generally offering competitive labour rates compared to England's major cities.",
  'Welsh Government EV support programmes complement the national OZEV EV chargepoint grant of up to £350, providing additional routes to funding for eligible Welsh residents.',
  'SP Energy Networks (SP Manweb) is the DNO for Cardiff and all of Wales. G98 notification is required before energising any domestic 7kW EV charger.',
  'BS 7671:2018 Section 722 applies across the whole UK including Wales. PME earthing is common in Cardiff, requiring an earth rod for most outdoor charger installations.',
  "Cardiff's Victorian bay-fronted terraces in areas such as Roath, Canton, and Pontcanna often have front parking, making EV charging installation feasible at moderate cost.",
  'NICEIC and NAPIT-registered electricians can self-certify EV charger installations to Part P of the Building Regulations. Welsh Government Building Regulations apply in Wales.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Cardiff in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Cardiff costs between £800 and £1,200 in 2026. This includes the charger unit, a dedicated 32A circuit, earthing arrangements, SP Manweb G98 DNO notification, and an Electrical Installation Certificate. Labour rates in Cardiff and South Wales are typically £38 to £52 per hour. Simple installations on modern semis or detached houses sit at the lower end. Victorian terrace installations with longer cable routes or consumer unit upgrades reach the upper end. A 22kW three-phase charger costs £1,200 to £2,000 installed.',
  },
  {
    question: 'Are there Welsh Government EV grants for home charging in Cardiff?',
    answer:
      'The Welsh Government has supported EV infrastructure through various programmes as part of its Net Zero Wales commitment and Clean Air Plan for Wales. Welsh Government schemes have included funding for on-street charging infrastructure in Welsh local authority areas including Cardiff Council. For domestic home charging, the national OZEV EV chargepoint grant (up to £350 for flat owners and tenants) is available to all Cardiff residents. Check the Welsh Government website and Cardiff Council for the latest local schemes, as funding availability changes regularly.',
  },
  {
    question: 'Which DNO covers Cardiff for EV charger notification?',
    answer:
      'SP Energy Networks (trading as SP Manweb) is the Distribution Network Operator for the whole of Wales, including Cardiff, Newport, Swansea, and all Welsh local authority areas. All EV charger installations in Cardiff must be notified to SP Manweb under Engineering Recommendation G98 before the charger is energised. For standard 7kW single-phase chargers, G98 is a notification rather than an application — no prior approval is required. Three-phase 22kW chargers require G99 prior approval, which can take several weeks.',
  },
  {
    question: 'Do Building Regulations for EV chargers differ in Wales?',
    answer:
      'Building Regulations in Wales are now separate from those in England, overseen by Welsh Government. However, Part P (Electrical Safety — Dwellings) requirements are broadly equivalent and EV charger installations remain notifiable electrical work in Wales. NICEIC and NAPIT-registered electricians can self-certify work to Welsh Building Regulations without involving building control. An Electrical Installation Certificate is required under BS 7671 Section 722 for all EV charger installations — this applies equally in Wales and England.',
  },
  {
    question: 'Can I install an EV charger in a Cardiff Victorian terrace?',
    answer:
      "Yes. Cardiff's Victorian bay-fronted terraces — common in Roath, Canton, Pontcanna, Cathays, and Splott — are generally well-suited to EV charger installation. Many have bay windows with off-street parking at the front, providing a short cable route from the consumer unit. Where the consumer unit is at the rear and the parking is at the front, cable runs of 12 to 20 metres may be needed, adding cost. An OZEV-approved installer should carry out a free survey before giving a firm quote.",
  },
  {
    question: 'Do I need an earth rod for an EV charger in Cardiff?',
    answer:
      'In most cases, yes. Most Cardiff properties are on PME (TN-C-S) supplies. Regulation 722.411.4.1 requires that where an EV charging point is installed outdoors on a PME supply, a local earth electrode (earth rod) is installed, or a charger with integrated PEN fault detection is used. An earth rod adds approximately £80 to £150 to the installation cost. Your electrician will carry out an earthing assessment to determine the appropriate solution for your specific property and supply arrangement.',
  },
  {
    question: 'Is the OZEV EV chargepoint grant available in Cardiff and Wales?',
    answer:
      'Yes. The OZEV EV chargepoint grant is a UK-wide scheme available to flat owners and tenants across Wales, including Cardiff. It provides up to £350 (75% of installation cost) per chargepoint. Homeowners in houses are not eligible. The grant is applied for by your OZEV-approved installer — you do not need to contact OZEV directly. You must own or have a confirmed order for an eligible plug-in vehicle. OZEV-approved installers operating in Cardiff can be found via the gov.uk approved installer register.',
  },
  {
    question: 'How long does EV charger installation take in Cardiff?',
    answer:
      'A standard 7kW EV charger installation in Cardiff takes 3 to 5 hours for a qualified electrician. Simple installations on modern properties with a garage take 3 to 4 hours. Installations involving longer cable runs, consumer unit upgrades, or earth rod installation take 5 to 7 hours. The electrician will complete SP Manweb G98 notification and issue an Electrical Installation Certificate before leaving site.',
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
      'Complete technical guide covering Section 722, earthing, DNO notification, and testing.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size the cable for your EV charger circuit with voltage drop calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EIC certificates for EV charger installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'Consumer unit upgrade requirements when adding a 32A EV charger circuit.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrician/cardiff',
    title: 'Electrician in Cardiff',
    description:
      'Find NICEIC and NAPIT-registered electricians in Cardiff and South Wales for EV charger installation.',
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
    heading: 'EV Charger Installation in Cardiff: What to Expect',
    content: (
      <>
        <p>
          Cardiff is Wales' capital and largest city, and EV adoption is growing steadily across the
          city and wider South Wales region. The Welsh Government's <strong>Net Zero Wales</strong>{' '}
          commitment and Clean Air Plan for Wales are driving investment in EV infrastructure, and
          home charger installation remains the most practical and cost-effective way for Cardiff
          residents to charge their electric vehicles.
        </p>
        <p>
          Cardiff's housing stock spans modern new builds in St Mellons and Pontprennau to
          distinctive Victorian bay-fronted terraces in Roath, Canton, Pontcanna, Cathays, and
          Splott. This variety means installation complexity and cost differ across the city, though
          Cardiff's terraced properties — many with front parking — are generally well-suited to EV
          charger installation.
        </p>
        <p>
          This guide covers the real costs of EV charger installation in Cardiff in 2026, Welsh
          Government EV support programmes, the national OZEV grant of up to £350, the{' '}
          <strong>SP Energy Networks (SP Manweb)</strong> DNO notification process, and Part P
          compliance under Welsh Building Regulations. Whether you are a Cardiff homeowner getting
          quotes or an electrician pricing South Wales jobs, this guide reflects current 2026 market
          conditions.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Cardiff EV Charger Installation Costs 2026',
    content: (
      <>
        <p>
          Cardiff and South Wales offer competitive pricing for home EV charger installation. Labour
          rates are lower than London and the South East, and most Cardiff residential properties
          have manageable cable routes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Cardiff Installation Costs (2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern detached/semi, garage)</strong> — £800 to
                £1,000. Short cable run of 3 to 8 metres, spare consumer unit way, no earth upgrade
                required. Common for Cardiff's newer residential areas in St Mellons, Pontprennau,
                and Lisvane.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (Victorian terrace, front parking)</strong> — £900 to
                £1,100. Cable run of 8 to 15 metres, PME earth rod required, possible MCB addition.
                Typical for Roath, Canton, and Pontcanna terraces with paved front parking areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long cable run, board upgrade)</strong> — £1,100 to
                £1,400. Consumer unit at the rear, parking at the front, cable run over 15 metres,
                full board upgrade needed. More common for older Cathays and Splott terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger</strong> — £1,200 to £2,000 installed. Requires an
                existing three-phase supply and G99 approval from SP Manweb. Suitable for properties
                with high mileage usage or multiple EVs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Labour rates for qualified electricians in Cardiff typically range from £38 to £52 per
          hour. A standard installation takes 3 to 5 hours, making it a half-day to full-day job.
        </p>
      </>
    ),
  },
  {
    id: 'welsh-grants',
    heading: 'Welsh Government EV Grants and Support for Cardiff Residents',
    content: (
      <>
        <p>
          The Welsh Government has committed to supporting EV uptake as part of its Net Zero Wales
          programme and Clean Air Plan. Welsh Government EV support takes several forms relevant to
          Cardiff residents:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welsh Government Electric Vehicle Charging Strategy</strong> — Wales has
                published a national EV charging strategy targeting a comprehensive charging network
                across Welsh local authority areas. This has supported the rollout of public
                charging infrastructure across Cardiff, including rapid chargers on the Strategic
                Road Network and in town centre car parks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cardiff Council EV infrastructure</strong> — Cardiff Council has installed
                on-street charging points across multiple residential areas through Transport for
                Wales and Cardiff's Local Transport Plan. Residents without off-street parking can
                access a growing network of kerbside and lamp-post chargers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Social housing and affordable homes</strong> — Welsh Government and
                Registered Social Landlords (RSLs) are progressively installing EV charging
                infrastructure in social housing developments as part of decarbonisation and
                retrofit programmes. Social tenants should check with their housing association.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Check the Welsh Government website (gov.wales) and Cardiff Council's transport pages for
          the most current available schemes, as funding programmes open and close regularly.
        </p>
      </>
    ),
  },
  {
    id: 'ozev-grants',
    heading: 'OZEV National EV Chargepoint Grant for Cardiff Residents',
    content: (
      <>
        <p>
          Alongside Welsh Government support, Cardiff residents can access the national OZEV EV
          chargepoint grant:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who is eligible</strong> — flat owners and tenants across the whole UK
                including Wales. You must own or have a confirmed order for an eligible plug-in
                vehicle. Homeowners in houses are not eligible for the domestic chargepoint grant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How much</strong> — up to £350 per chargepoint (75% of installation cost,
                capped at £350). For Cardiff flat tenants, where installation costs are typically
                £900 to £1,200, this grant covers a significant proportion of the total.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to claim</strong> — your OZEV-approved installer applies on your behalf.
                They deduct the grant from the invoice you pay. Search for OZEV-approved installers
                operating in Cardiff and South Wales via the gov.uk approved installer register
                before booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Cardiff businesses can claim up to £350
                per socket (maximum 40 sockets) for workplace EV charger installation. Available to
                Welsh businesses registered with HMRC, using an OZEV-approved commercial installer.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Cardiff EV Charger Installations',
    content: (
      <>
        <p>
          BS 7671:2018 applies across the whole of the UK including Wales. All EV charger
          installations in Cardiff must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The principal requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated final circuit (Regulation 722.533.101)</strong> — a dedicated 32A
                circuit from the consumer unit. Older Cardiff consumer units may need a spare way or
                a board upgrade to accommodate this requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection. Modern smart chargers typically include integrated DC fault detection,
                satisfying the Type B RCD or Type A with 6mA DC RDC-DD requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger compliance</strong> — the Electric Vehicles (Smart Charge
                Points) Regulations 2021 applies in Wales as well as England. All new home EV
                chargers must support smart scheduling, randomised delay, and demand side response.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — use{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  Elec-Mate's cable sizing calculator
                </SEOInternalLink>{' '}
                to confirm voltage drop is within 5% for longer cable runs in Cardiff Victorian
                terraces. 10mm² cable may be needed for runs exceeding 15 metres.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Cardiff',
    content: (
      <>
        <p>
          Most Cardiff properties are supplied on PME (TN-C-S) earthing arrangements. Regulation
          722.411.4.1 and the IET Code of Practice for EV Charging Equipment Installation require
          specific measures where an EV charging point is outdoors on a PME supply.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              On a PME supply, a broken PEN conductor between the distribution transformer and the
              property can cause dangerous touch voltages on earthed metalwork. An electric vehicle
              being charged outdoors is particularly at risk — the vehicle connects the charger's
              earthed metalwork to the vehicle chassis, and the tyres provide limited isolation,
              especially on a wet Cardiff driveway in winter.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cardiff Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              The most common approach is installing a local earth electrode (earth rod) at the
              charger location to create a TT arrangement with an appropriate RCD. Alternatively,
              chargers with integrated PEN fault detection can be used without a separate earth rod.
              Where the charger is inside a garage or enclosed carport, the PME earth may be
              acceptable subject to the electrician's assessment.
            </p>
          </div>
        </div>
        <p>
          An earth rod installation in Cardiff adds approximately £80 to £150 to the total cost.
          Cardiff's coastal proximity means ground conditions can vary — your electrician will test
          earth resistance values to confirm the rod achieves adequate resistance.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'SP Energy Networks (SP Manweb) DNO Notification for Cardiff',
    content: (
      <>
        <p>
          <strong>SP Energy Networks (SP Manweb)</strong> is the Distribution Network Operator for
          the whole of Wales, including Cardiff, Newport, Swansea, and all Welsh local authority
          areas. G98 notification to SP Manweb is a legal requirement before any domestic EV charger
          is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (7kW single-phase)</strong> — submit online via the SP
                Manweb portal. This is a notification, not an application — the installer proceeds
                with connection and notifies concurrently. No prior approval is required for
                standard 7kW domestic installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase)</strong> — prior approval required from
                SP Manweb before installation. Allow 4 to 10 weeks for assessment. Required for
                three-phase chargers and commercial installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician submits the DNO
                notification on behalf of the homeowner. Confirm this is included in the quoted
                price. Failure to notify SP Manweb can result in the charger being required to be
                disconnected.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Cardiff and South Wales',
    content: (
      <>
        <p>
          Cardiff and South Wales represent a growing market for EV charger installation, supported
          by Welsh Government decarbonisation commitments and rising EV uptake across the region.
          For NICEIC and NAPIT-registered electricians, offering a complete Cardiff EV charger
          installation service — including OZEV grant processing, SP Manweb notification, and
          on-site certification — sets you apart from the competition.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Cardiff EV Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in Welsh labour rates (£38 to £52/hour), site survey time for Victorian
                  terrace properties, earth rod costs, SP Manweb G98 notification, and EIC
                  certification costs. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised, professional quotes that cover all job-specific variables.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Welsh Building Regulations Compliance</h4>
                <p className="text-white text-sm leading-relaxed">
                  Building Regulations in Wales are administered separately from England. NICEIC and
                  NAPIT members can self-certify under the Welsh Part P equivalent. Issue the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  from your phone before leaving site — every Cardiff EV installation requires a
                  full EIC under BS 7671 Section 722.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Cardiff EV charger installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Complete EV charger quotes and certificates from your phone — built for electricians working across Cardiff and South Wales."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationCardiffPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Cardiff | Home EV Charging Wales 2026"
      description="EV charger installation costs in Cardiff 2026: 7kW charger £800-1,200 installed, Welsh Government EV grants, OZEV grant up to £350, SP Manweb DNO notification, PME earthing, Part P compliance under Welsh Building Regulations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cardiff & Wales Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Cardiff:{' '}
          <span className="text-yellow-400">Costs, Welsh Grants, and Compliance 2026</span>
        </>
      }
      heroSubtitle="Home EV charger installation in Cardiff costs £800 to £1,200 for a 7kW wallbox. Covers Welsh Government EV grants, OZEV grant up to £350, SP Manweb (SP Energy Networks) DNO notification, PME earthing requirements, and Welsh Building Regulations compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Cardiff"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
