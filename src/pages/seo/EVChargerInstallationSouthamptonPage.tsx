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
  { label: 'Southampton', href: '/ev-charger-installation-southampton' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Southampton' },
  { id: 'costs', label: 'Southampton Installation Costs' },
  { id: 'grants', label: 'Grants and Incentives' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing in Southampton' },
  { id: 'dno-notification', label: 'Scottish and Southern Electricity Networks DNO' },
  { id: 'port-city', label: 'Southampton as a Port City: EV Considerations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Southampton typically costs £850 to £1,300, reflecting South Coast labour rates that sit between London and the Midlands.',
  'The OZEV EV chargepoint grant provides up to £350 for eligible flat owners and tenants. Southampton has a large student and rented-accommodation population who may be eligible.',
  'Scottish and Southern Electricity Networks (SSEN) is the DNO for Southampton. G98 notification is required before energising any domestic 7kW EV charger.',
  'BS 7671:2018 Section 722 governs all EV charging installations. PME earthing is common in Southampton, requiring an earth rod for outdoor charger installations in most properties.',
  "Southampton's high proportion of flats and purpose-built student accommodation means significant opportunity for OZEV grant-funded installations in the city centre.",
  'NICEIC and NAPIT-registered electricians can self-certify EV charger installations to Part P of the Building Regulations without a separate building control application.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Southampton in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Southampton costs between £850 and £1,300 in 2026. This includes the charger unit, a dedicated 32A circuit, earthing arrangements, SSEN G98 DNO notification, and an Electrical Installation Certificate. Labour rates in Southampton and Hampshire are typically £42 to £55 per hour — higher than the Midlands and North but below London. Simple installations on modern semis sit at the lower end. Victorian terrace installations with longer cable routes or consumer unit upgrades reach the higher end. A 22kW three-phase charger typically costs £1,200 to £2,000 installed.',
  },
  {
    question: 'Which DNO covers Southampton for EV charger notification?',
    answer:
      'Scottish and Southern Electricity Networks (SSEN) — specifically the SSEN South region — is the Distribution Network Operator for Southampton, Hampshire, and the wider South Coast. All EV charger installations in Southampton must be notified to SSEN under Engineering Recommendation G98 before the charger is energised. For standard 7kW single-phase chargers, G98 is a straightforward notification submitted online by the installer. Three-phase 22kW chargers require G99 prior approval from SSEN, which can take several weeks.',
  },
  {
    question: 'Is the OZEV EV chargepoint grant available in Southampton?',
    answer:
      "Yes. The OZEV EV chargepoint grant is a UK-wide scheme available to flat owners and tenants in Southampton. Given the city's high proportion of university students, purpose-built student accommodation, and private rented sector, many Southampton residents are eligible. The grant provides up to £350 (75% of installation cost) per chargepoint. The grant is applied for by your OZEV-approved installer — you do not contact OZEV directly. You must own or have a confirmed order for an eligible plug-in vehicle.",
  },
  {
    question: 'Do I need an earth rod for an EV charger in Southampton?',
    answer:
      'In most cases, yes, if the charger is outdoors. Most Southampton properties are on PME (TN-C-S) supplies. Regulation 722.411.4.1 requires that where an EV charging point is installed outdoors on a PME supply, a local earth electrode is installed or the charger has integrated PEN fault detection. The proximity to the coast and salt air means earth electrode testing is particularly important to confirm adequate resistance values — coastal soils can have varying conductivity. An earth rod adds approximately £80 to £150 to the installation cost.',
  },
  {
    question: 'Can I install an EV charger in a Southampton Victorian terrace?',
    answer:
      'Yes, in most cases. Southampton has significant Victorian and Edwardian terrace housing, particularly in areas such as Shirley, Freemantle, and Woolston. Many terraces have been converted to flats, which adds complexity — freeholder permission, cable routes through communal areas, and load management for multiple chargers may all be required. Houses with off-street parking can generally be fitted with a 7kW charger at moderate cost. A site survey by an OZEV-approved installer is essential before agreeing a fixed price.',
  },
  {
    question: 'Are there any Southampton-specific EV initiatives?',
    answer:
      'Southampton City Council supports EV adoption as part of its clean air and transport strategy. The council has installed on-street EV chargers across residential areas, particularly in neighbourhoods with limited off-street parking. Southampton has also benefited from Connected and Autonomous Mobility (CAM) and transport innovation funding. For residents without off-street parking, the growing network of kerbside chargers in residential streets reduces reliance on a home charger installation.',
  },
  {
    question: 'How long does EV charger installation take in Southampton?',
    answer:
      'A standard 7kW EV charger installation in Southampton takes 3 to 5 hours for a qualified electrician. Simple installations on modern properties take 3 to 4 hours. Installations involving longer cable runs, consumer unit upgrades, or earth rod installation take 5 to 7 hours. The electrician will complete SSEN G98 notification and issue an Electrical Installation Certificate before leaving site.',
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
    href: '/electrician/southampton',
    title: 'Electrician in Southampton',
    description:
      'Find NICEIC and NAPIT-registered electricians in Southampton and Hampshire for EV charger installation.',
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
    heading: 'EV Charger Installation in Southampton: What to Expect',
    content: (
      <>
        <p>
          Southampton is one of the South Coast's largest cities, a major port, and home to two
          universities with a large student and young professional population. EV adoption in
          Southampton and Hampshire is growing steadily, and home EV charger installation remains
          the most convenient and cost-effective way for residents with off-street parking to charge
          their electric vehicles.
        </p>
        <p>
          Southampton's housing stock is varied. The city centre and inner suburbs include
          significant Victorian terrace and converted flat stock, while the outer suburbs of
          Chandler's Ford, Hedge End, and West End have modern detached and semi-detached properties
          with garages and driveways well-suited to charger installation. Labour rates on the South
          Coast sit between London and the Midlands, making Southampton installations moderately
          priced.
        </p>
        <p>
          This guide covers realistic costs for EV charger installation in Southampton in 2026, the
          OZEV grant of up to £350 for eligible residents, the{' '}
          <strong>Scottish and Southern Electricity Networks (SSEN)</strong> DNO notification
          process, PME earthing requirements, and Part P compliance under Building Regulations.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Southampton EV Charger Installation Costs 2026',
    content: (
      <>
        <p>
          Southampton sits in a middle price band for EV charger installation. South Coast labour
          rates are higher than the Midlands and North but below London, and the city's varied
          property stock means installation complexity ranges widely.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Southampton Installation Costs (2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern detached/semi, garage or driveway)</strong> —
                £850 to £1,050. Short cable run, spare consumer unit way, straightforward earth rod
                installation. Common for Chandler's Ford, Hedge End, and West End properties on
                modern estates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terrace or older semi, medium run)</strong> — £1,000
                to £1,200. Cable run of 8 to 15 metres, PME earth rod, possible MCB addition.
                Typical for Shirley, Freemantle, and Bitterne terraces with off-street parking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long run, board upgrade)</strong> — £1,200 to £1,500.
                Consumer unit replacement required, cable run over 15 metres, or underground cable
                route needed. More common for older Victorian terraces or converted flats with
                complex cable routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger</strong> — £1,200 to £2,000 installed. Requires a
                three-phase supply and G99 approval from SSEN. Suitable for commercial premises or
                very high-mileage users with an existing three-phase supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Labour rates for qualified electricians in Southampton and Hampshire range from £42 to £55
          per hour. A standard installation takes 3 to 5 hours.
        </p>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Grants and Incentives for Southampton EV Charger Installation',
    content: (
      <>
        <p>
          Several grant and support schemes are available to Southampton residents and businesses:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and tenants.
                Given Southampton's large student population and high proportion of private rented
                accommodation, many city residents are eligible. Applied for by your OZEV-approved
                installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Southampton businesses can claim up to
                £350 per socket (maximum 40 sockets) for workplace EV charger installation.
                Administered by OZEV and requires an OZEV-approved commercial installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Southampton City Council EV infrastructure</strong> — Southampton City
                Council's Transport Strategy includes expanding on-street EV charging provision.
                Residents without off-street parking benefit from an expanding kerbside charging
                network across the city's residential areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Southampton EV Charger Installations',
    content: (
      <>
        <p>
          All EV charger installations in Southampton must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The key regulatory requirements for domestic Southampton installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated final circuit (Regulation 722.533.101)</strong> — a dedicated 32A
                circuit from the consumer unit. Older Southampton consumer units may not have a
                spare way, requiring a board upgrade or sub-distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection is required for the EV circuit. Modern smart chargers typically include
                integrated DC fault protection, satisfying the Type B RCD or Type A with 6mA DC
                RDC-DD requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger compliance</strong> — the Electric Vehicles (Smart Charge
                Points) Regulations 2021 requires all new home EV chargers to support smart
                scheduling, randomised delay, and demand side response. All OZEV-approved charger
                models are compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — verify cable selection against{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  voltage drop calculations
                </SEOInternalLink>{' '}
                for the actual cable run length. 6mm² is adequate for runs up to 15 metres; 10mm²
                may be needed for longer runs carrying 32A.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Southampton',
    content: (
      <>
        <p>
          Most Southampton properties are on PME (TN-C-S) earthing arrangements. Regulation
          722.411.4.1 and the IET Code of Practice for EV Charging Equipment Installation require
          that outdoor EV charging on PME supplies includes specific protective measures.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              A broken PEN conductor between the distribution transformer and the property can cause
              dangerous touch voltages on earthed metalwork, including an EV being charged outdoors.
              Southampton's coastal location means driveways can be wet and slightly saline — both
              factors that increase touch voltage risk if the earthing arrangement is not correctly
              specified.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Southampton Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              Installing a local earth electrode (earth rod) at the charger and creating a TT
              arrangement is the standard approach for outdoor installations. Coastal ground
              conditions in Southampton can sometimes give naturally low earth resistance values,
              simplifying the rod installation. Chargers with integrated PEN fault detection are an
              alternative that avoids the need for a separate earth rod entirely.
            </p>
          </div>
        </div>
        <p>
          Earth rod installation in Southampton adds approximately £80 to £150 to the total cost.
          Your electrician will test earth resistance to confirm adequate values before signing off
          the installation.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'SSEN DNO Notification for Southampton EV Charger Installations',
    content: (
      <>
        <p>
          <strong>Scottish and Southern Electricity Networks (SSEN) South</strong> is the
          Distribution Network Operator for Southampton, Hampshire, and the wider South region
          including Dorset, Wiltshire, and Berkshire. G98 notification to SSEN is a legal
          requirement before any domestic EV charger is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (7kW single-phase)</strong> — submit online via the SSEN
                portal. This is a notification rather than an application for standard domestic 7kW
                installations — the installer proceeds with connection and notifies concurrently. No
                prior approval is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase)</strong> — prior approval required from
                SSEN before installation. Allow 4 to 10 weeks for SSEN to assess network capacity in
                the relevant area. Required for three-phase chargers and commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician handles SSEN
                notification. Confirm this is included in the quoted price. Chargers installed
                without DNO notification are not compliant and SSEN can require disconnection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'port-city',
    heading: 'Southampton as a Port City: EV Charging Considerations',
    content: (
      <>
        <p>
          Southampton's status as the UK's busiest cruise port and a major container port creates
          some additional considerations for EV charger installation in the city:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salt air and coastal proximity</strong> — properties closer to the
                waterfront and docks may experience accelerated corrosion on exposed electrical
                components. Specify IP-rated charger units (IP54 minimum, IP65 preferred for exposed
                locations) and use stainless steel fixings for charger mounting. Check that cable
                glands and trunking are sealed against salt-laden air.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Waterfront apartments and converted dock buildings</strong> — Southampton
                has seen significant waterfront residential development. These buildings typically
                have managed communal areas, underground car parks, and shared electrical
                infrastructure. Multi-unit EV charger installations in these settings require load
                management systems and freeholder consent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Port and industrial area proximity</strong> — properties near the dock areas
                may have older or non-standard electrical supplies. Always confirm the supply type
                and earthing arrangement before pricing an installation in these areas, as TT
                supplies are more common close to industrial zones.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Southampton',
    content: (
      <>
        <p>
          Southampton and Hampshire offer steady demand for domestic and commercial EV charger
          installation. The city's student population, active rental sector, and growing EV uptake
          across all property types make it an active market for qualified electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Southampton EV Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in South Coast labour rates (£42 to £55/hour), earth rod costs, SSEN G98
                  notification, EIC certification, and coastal corrosion-resistant components where
                  relevant. Use Elec-Mate's{' '}
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
                <h4 className="font-bold text-white mb-1">EIC Certification on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every EV charger installation requires a full{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  under BS 7671 Section 722. Issue it from your phone before leaving site and email
                  a copy to the customer instantly. Elec-Mate's certificate app includes all
                  required test result fields for Section 722 installations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Southampton EV charger installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Complete EV charger quotes and certificates from your phone — built for electricians working across Southampton and Hampshire."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationSouthamptonPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Southampton | Home EV Charging Southampton 2026"
      description="EV charger installation costs in Southampton 2026: 7kW charger £850-1,300 installed, OZEV grants up to £350, SSEN DNO notification, PME earthing requirements, Part P compliance, and Southampton coastal considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Southampton Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Southampton:{' '}
          <span className="text-yellow-400">Costs, Grants, and Compliance 2026</span>
        </>
      }
      heroSubtitle="Home EV charger installation in Southampton costs £850 to £1,300 for a 7kW wallbox. Covers OZEV grants up to £350, SSEN (Scottish and Southern Electricity Networks) DNO notification, PME earthing requirements, and Southampton's coastal and port city considerations."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Southampton"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
