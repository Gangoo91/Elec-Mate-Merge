import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Building2,
  Zap,
  AlertTriangle,
  FileCheck2,
  Wrench,
  ShieldCheck,
  Lightbulb,
  ShoppingCart,
  Camera,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Cost Guides', href: '/guides/electrical-cost-guides' },
  { label: 'Retail Electrical Cost', href: '/retail-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'display-lighting', label: 'Retail Display Lighting' },
  { id: 'till-epos', label: 'Till Points & EPoS Power' },
  { id: 'cctv-security', label: 'CCTV & Security Systems' },
  { id: 'emergency-fire', label: 'Emergency Lighting & Fire Alarms' },
  { id: 'building-regs', label: 'Building Regulations & Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A small retail shop electrical fit-out (up to 100m²) typically costs £3,000 to £12,000, covering display lighting, till points, EPoS power, emergency lighting, and a fire alarm system.',
  'Retail display lighting is one of the largest cost elements — high-quality LED track lighting and spot lighting for merchandise display can cost £200 to £600 per track section plus installation.',
  'Till point and EPoS electrical installations require dedicated power circuits with adequate socket provision at each counter position, plus data points for card readers, barcode scanners, and stock management systems.',
  'CCTV installation for a small retail unit typically costs £800 to £2,500 for a complete system with recording equipment, cameras, and cabling — usually included in the electrical fit-out scope.',
  'Emergency lighting to BS 5266 and a fire alarm system to BS 5839 are legal requirements in retail premises. Both require commissioning certificates and annual testing.',
];

const faqs = [
  {
    question: 'How much does a retail shop electrical fit-out cost?',
    answer:
      'A small retail shop electrical fit-out (up to 100m² floor area) typically costs £3,000 to £12,000. This covers display lighting, till point power, EPoS data points, emergency lighting, a fire alarm system, CCTV, and security system connections. The wide cost range reflects the significant difference between a basic budget fit-out and a premium retail environment with high-quality display lighting and smart systems. Medium retail units (100–300m²) typically cost £12,000 to £40,000.',
  },
  {
    question: 'What electrical work is included in a retail fit-out?',
    answer:
      'A typical retail electrical fit-out includes: distribution board installation and mains connection, display lighting circuits (track lighting, accent lighting, window display lighting), till point power and data (dedicated circuits and Cat6 data points for each till), back-of-house power (stockroom, staff room, kitchen), emergency lighting throughout the sales floor and escape routes (BS 5266), fire alarm system with call points and detectors (BS 5839), CCTV cameras and recording equipment, intruder alarm and door access control, and external signage power supply.',
  },
  {
    question: 'Is emergency lighting required in a retail shop?',
    answer:
      'Yes. The Regulatory Reform (Fire Safety) Order 2005 and BS 5266-1 (Emergency Lighting Code of Practice) require emergency lighting in retail premises. Emergency lighting must illuminate escape routes, exit signs, and the sales floor for a minimum of 1 hour in the event of mains failure. It must be installed, commissioned, and tested by a competent person, and a commissioning certificate issued. Annual testing is a legal obligation under the Fire Safety Order.',
  },
  {
    question: 'What lighting is required for a retail shop?',
    answer:
      'Retail lighting serves multiple functions: general ambient lighting (300 lux minimum at floor level for a retail sales area under CIBSE SLL Code for Lighting), merchandise accent lighting (typically 3–5 times ambient to highlight products), window display lighting (high output to be visible in daylight), fitting room lighting (flattering and accurate colour rendering, CRI ≥ 90), and counter lighting. LED track lighting systems with adjustable spot heads are the standard for most modern retail environments.',
  },
  {
    question: 'How many power points does a till point need?',
    answer:
      'Each till point typically requires at least four to six 13A socket outlets at counter level: one for the till/tablet, one for the card reader, one for the receipt printer, one for a barcode scanner, and one or two spare for USB chargers or other peripherals. A Cat6 data point for the EPoS system network connection is also required at each till. Where counters are freestanding, a floor box with power and data is often used.',
  },
  {
    question: 'Does retail electrical work need Building Regulations approval?',
    answer:
      'Commercial retail premises are not subject to Part P of the Building Regulations (which covers domestic dwellings only). However, retail electrical work is governed by the Electricity at Work Regulations 1989, Building Regulations Part B (fire safety — relevant to emergency lighting and fire alarms), and Building Regulations Part L (energy efficiency — relevant to lighting controls and efficacy). An Electrical Installation Certificate (EIC) must be issued on completion of all new electrical work.',
  },
  {
    question: 'How much does CCTV installation cost in a retail shop?',
    answer:
      'A basic CCTV system for a small retail unit costs £800 to £1,800 for supply and installation. This covers four to eight cameras (internal and external), an NVR or DVR recording unit, remote viewing via a mobile app, and all cabling. Higher specification systems with higher resolution cameras, more storage, and integration with POS systems cost £2,000 to £5,000. CCTV installation is typically included in the electrical fit-out scope as the same cable routes serve both.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/office-electrical-cost',
    title: 'Office Electrical Fit-Out Cost',
    description: 'Commercial office electrical costs, per-desk estimates, emergency lighting, and fire alarms.',
    icon: Building2,
    category: 'Cost Guide',
  },
  {
    href: '/guides/emergency-lighting-cost',
    title: 'Emergency Lighting Installation Cost',
    description: 'Emergency lighting costs, BS 5266 requirements, and testing obligations.',
    icon: Lightbulb,
    category: 'Cost Guide',
  },
  {
    href: '/guides/fire-alarm-installation-cost',
    title: 'Fire Alarm Installation Cost',
    description: 'Fire alarm system costs for commercial premises, BS 5839 compliance.',
    icon: AlertTriangle,
    category: 'Cost Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional retail electrical fit-out quotes from your phone.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Retail Shop Electrical Fit-Out — What Is Involved',
    content: (
      <>
        <p>
          A retail electrical fit-out covers everything from the main supply connection through
          to display lighting, till points, CCTV, and security systems. Retail is a demanding
          environment — lighting has a direct impact on sales, systems must be reliable, and
          regulatory compliance (emergency lighting, fire alarms) is non-negotiable. Getting
          the electrical specification right from the start saves significant cost and disruption
          compared with retrofitting inadequate systems.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small retail unit (up to 100m²)</strong> — £3,000 to £12,000. Display
                lighting, till points, emergency lighting, fire alarm, and CCTV.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium retail unit (100–300m²)</strong> — £12,000 to £40,000. More
                extensive display lighting, multiple till points, back-of-house circuits, and
                a full addressable fire alarm system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large retail unit or anchor store (over 300m²)</strong> — £40,000 to
                £120,000+. Three-phase supply, zone-controlled lighting, BMS integration, and
                full Grade A fire alarm with sprinkler system monitoring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures cover the electrical installation only and do not include the cost of
          the HVAC system, kitchen or café fit-out, or shopfront signage — which are typically
          priced as separate packages.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Retail Electrical Cost Breakdown',
    content: (
      <>
        <p>
          Breaking down the cost by work package helps with budget planning and tender preparation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mains and distribution board</strong> — £1,000 to £4,000. Three-phase
                or single-phase incoming supply, main switch, sub-circuit MCBs, and connection
                to the building's metering arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Display and feature lighting circuits</strong> — £1,500 to £5,000.
                Track lighting bus-bars or circuits, feature accent light wiring, window display
                lighting, and low-voltage driver installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Till points and EPoS power and data</strong> — £300 to £700 per till
                position. Counter outlets, floor boxes, Cat6 data to each position, and patch
                panel connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting</strong> — £150 to £350 per fitting fitted and
                commissioned. A 100m² unit typically needs 8 to 15 emergency lighting units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system</strong> — £1,500 to £5,000 for a small unit.
                Panel, detectors, manual call points, sounders, and commissioning to{' '}
                <SEOInternalLink href="/guides/bs-5839-fire-alarm-standard">
                  BS 5839-1
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CCTV and security</strong> — £800 to £2,500 for a complete system.
                Cameras, NVR, cabling, and configuration. Intruder alarm additional.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'display-lighting',
    heading: 'Retail Display Lighting',
    content: (
      <>
        <p>
          Lighting is one of the most powerful merchandising tools in retail. Well-designed
          lighting increases dwell time, improves product perception, and directly drives sales.
          It is also one of the most significant electrical cost elements in a retail fit-out.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED track lighting systems</strong> — the most common retail lighting
                solution. 1-metre or 2-metre track sections cost £60 to £180 per section plus
                installation. Adjustable spot heads cost £30 to £150 each depending on output
                and brand. Allow £200 to £500 per track section installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recessed downlights</strong> — LED downlights with a CRI of 90+ for
                accurate colour rendering of merchandise. Budget £80 to £200 per downlight
                fitted, depending on specification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Window display lighting</strong> — high-output LED spots or strips to
                attract attention from outside. Must be controllable independently of the main
                shop lighting to allow display changes. Budget £500 to £1,500 for window lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting controls</strong> — Building Regulations Part L requires energy
                controls including occupancy sensing and daylight linking in new commercial
                fit-outs. DALI lighting control systems for scene setting cost £500 to £3,000
                additional for a small retail unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'till-epos',
    heading: 'Till Points and EPoS Power',
    content: (
      <>
        <p>
          Every till point requires both power and data. Poor provision of power and data at
          till positions is a common failure in retail fit-outs, leading to unsightly trailing
          extension leads and unreliable EPoS systems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShoppingCart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Counter-mounted till point</strong> — six 13A socket outlets (two double
                and one single) at counter level, one Cat6 data point, and one spare Cat6 for
                future expansion. Cost per till position: £300 to £500 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingCart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Freestanding counter or island till</strong> — floor box installation
                with power and data. A quality floor box with four power outlets and two Cat6
                data points costs £350 to £600 fitted, including the floor core and box
                installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingCart className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wireless EPoS considerations</strong> — even wireless EPoS tablets still
                need charging points and a data connection for the Wi-Fi access point. Plan for
                Wi-Fi access points at ceiling level with PoE data connections from the comms
                cabinet.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cctv-security',
    heading: 'CCTV and Security Systems',
    content: (
      <>
        <p>
          Retail CCTV and intruder alarm systems are a standard requirement for most commercial
          insurers and are a sensible investment for any retail business. The electrical
          contractor typically installs CCTV alongside the main electrical fit-out, reducing
          labour costs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic CCTV system (4–6 cameras)</strong> — £800 to £1,800. Four to six
                IP cameras, an 8-channel NVR with 2TB storage, remote mobile viewing, and all
                cabling. Suitable for a small retail unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range CCTV system (8–12 cameras)</strong> — £1,800 to £3,500.
                Higher resolution cameras (4K), larger NVR storage, and integration with access
                control at the main entrance and stockroom door.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Intruder alarm</strong> — £600 to £1,500 for a Grade 2 system with
                PIR sensors, door contacts, siren, and a monitoring centre connection. NACOSS
                or NSI Gold certification required for most commercial insurance policies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EAS security tagging systems</strong> — electronic article surveillance
                (EAS) antenna pedestals require a dedicated power supply at the entrance. Allow
                £200 to £400 for power provision at each pedestal position.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-fire',
    heading: 'Emergency Lighting and Fire Alarm Systems',
    content: (
      <>
        <p>
          Emergency lighting and fire alarm systems are legal requirements in retail premises
          and must be installed and commissioned by a competent person. They are non-negotiable
          elements of any retail electrical fit-out.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (BS 5266-1)</strong> — required throughout sales
                floor, escape routes, back-of-house corridors, and staff welfare areas. Non-maintained
                LED emergency units with 3-hour duration for premises with over 300m² floor area.
                Commissioning certificate required on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system (BS 5839-1)</strong> — L3 or L2 system for most
                retail premises. Smoke detectors, heat detectors in kitchen and stockroom areas,
                manual call points at each exit, and sounders throughout. Small retail unit:
                £1,500 to £4,000. Larger units with addressable systems: £4,000 to £12,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual testing obligations</strong> — the Regulatory Reform (Fire Safety)
                Order 2005 requires weekly functional tests of the fire alarm, monthly testing
                of emergency lighting function, and full annual discharge tests of the emergency
                lighting system. Certificates must be kept on site.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations and Compliance',
    content: (
      <>
        <p>
          Retail premises are commercial buildings and are not subject to Part P of the Building
          Regulations (which applies only to domestic dwellings). The key regulatory frameworks
          for retail electrical work are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — requires that all
                electrical systems in retail premises are designed, installed, maintained, and
                operated safely by competent persons.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part B</strong> — fire safety requirements govern
                emergency lighting, fire alarm systems, and escape route provisions. Building
                Control approval is required for change of use fit-outs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part L</strong> — energy efficiency requirements
                for new commercial fit-outs. LED lighting with occupancy controls, automatic
                switching, and daylight linking are required in most new retail fit-outs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC on completion</strong> — an{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                must be issued for all new retail electrical work. The building landlord will
                usually require this as part of the fit-out handover documentation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Retail Electrical Fit-Out Work',
    content: (
      <>
        <p>
          Retail fit-out work is fast-paced and deadline-driven — shop openings are often tied
          to lease commencement dates. Electricians who can work efficiently within a tight
          programme, co-ordinate with shopfitters and AV contractors, and deliver all required
          certification on time win repeat business from retail clients and fit-out contractors.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Lighting in Detail</h4>
                <p className="text-white text-sm leading-relaxed">
                  Retail clients often have a clear idea of the lighting effect they want but
                  no idea what it costs. Build a detailed lighting schedule — number of tracks,
                  number of spot heads per track, driver specifications — and price it accurately
                  using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . A detailed quote wins trust and avoids scope creep disputes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  Retail clients need the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>,
                  emergency lighting commissioning certificate, and fire alarm commissioning
                  certificate on the day the shop opens — not two weeks later. Complete all
                  paperwork on site using Elec-Mate and hand over the full documentation package
                  before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify retail electrical fit-outs with Elec-Mate"
          description="Create professional itemised retail electrical fit-out quotes with display lighting, till points, CCTV, emergency lighting, and fire alarm costs. Issue EICs on site. Join 430+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RetailElectricalCostPage() {
  return (
    <GuideTemplate
      title="Retail Shop Electrical Fit Out Cost UK 2025 | Shop Wiring Costs"
      description="Retail shop electrical fit-out costs in the UK for 2025. Small retail unit £3,000–£12,000. Display lighting, till points, EPoS power, CCTV, security systems, emergency lighting, fire alarms, and compliance requirements explained."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Retail Shop Electrical Fit-Out Cost UK 2025:{' '}
          <span className="text-yellow-400">Shop Wiring Costs</span>
        </>
      }
      heroSubtitle="Detailed breakdown of retail shop electrical fit-out costs in the UK for 2025 — small retail unit from £3,000, display lighting, till points and EPoS power, CCTV and security, emergency lighting to BS 5266, fire alarm systems to BS 5839, and Building Regulations compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Retail Shop Electrical Fit-Out Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Your Retail Electrical Fit-Out in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to create professional retail electrical fit-out quotes with display lighting, till points, CCTV, and all certifications. 7-day free trial, cancel anytime."
    />
  );
}
