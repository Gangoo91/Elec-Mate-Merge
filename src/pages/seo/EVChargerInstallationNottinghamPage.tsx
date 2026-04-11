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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'EV Charger Installation Cost', href: '/guides/ev-charger-installation-cost' },
  { label: 'Nottingham', href: '/ev-charger-installation-nottingham' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Nottingham' },
  { id: 'costs', label: 'Nottingham Installation Costs' },
  { id: 'grants', label: 'Grants and Incentives' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing Considerations' },
  { id: 'dno-notification', label: 'Western Power Distribution DNO Notification' },
  { id: 'nottingham-housing', label: 'Nottingham Housing and EV Charging' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Nottingham typically costs £800 to £1,200, with East Midlands labour rates keeping costs competitive.',
  'The OZEV EV chargepoint grant provides up to £350 for eligible flat owners and tenants. An OZEV-approved installer applies on your behalf.',
  'National Grid Electricity Distribution (formerly Western Power Distribution) is the DNO for Nottingham. G98 notification is required for all domestic 7kW EV charger installations.',
  'BS 7671:2018 Section 722 governs all EV charging installations. PME earthing is common across Nottingham, requiring earth rods for outdoor chargers in most cases.',
  "Nottingham's high proportion of student lettings and HMOs creates opportunities for landlords installing EV chargers, though tenancy and planning considerations apply.",
  'NICEIC and NAPIT-registered electricians can self-certify EV charger installations to Part P of the Building Regulations without a separate building control application.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Nottingham in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Nottingham costs between £800 and £1,200 in 2026. This covers the charger unit, dedicated 32A circuit, earthing arrangements, DNO notification, and an Electrical Installation Certificate. Labour rates in Nottingham and the East Midlands are typically £38 to £50 per hour. Simple installations on modern semis with garages come in at the lower end. More complex jobs in Victorian terraces with longer cable runs or required consumer unit upgrades reach the higher end. A 22kW three-phase charger typically costs £1,200 to £2,000 installed.',
  },
  {
    question: 'Which DNO covers Nottingham for EV charger notification?',
    answer:
      'National Grid Electricity Distribution (NGED), formerly Western Power Distribution, is the Distribution Network Operator for Nottingham and the East Midlands. All EV charger installations must be notified to NGED under Engineering Recommendation G98 before the charger is energised. For standard 7kW single-phase chargers, G98 is a notification rather than an application — no prior approval is needed. Three-phase 22kW chargers require G99 prior approval, which can take several weeks.',
  },
  {
    question: 'Is the OZEV grant available for EV charger installation in Nottingham?',
    answer:
      "Yes. The OZEV EV chargepoint grant is a national scheme available to flat owners and tenants across the UK including Nottingham. It provides up to £350 (75% of installation cost) per chargepoint. Homeowners in houses are not eligible. The grant is claimed by your OZEV-approved installer, who deducts it from your invoice. You must own or have a confirmed order for an eligible plug-in vehicle. Given Nottingham's large student and rented accommodation sector, many city-centre flat tenants are eligible for this grant.",
  },
  {
    question: 'Can I install an EV charger in a Nottingham terrace or Victorian property?',
    answer:
      'Yes, in most cases. Nottingham has a significant stock of Victorian and Edwardian terraces, particularly in areas such as the Meadows, Forest Fields, Hyson Green, and the Lace Market. Where parking is at the front and the consumer unit is at the rear, cable runs can be 12 to 20 metres, adding cost. Victorian properties may also have ageing consumer units without adequate spare capacity, requiring a board upgrade. An OZEV-approved installer should carry out a free survey to confirm feasibility and give a firm quote.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in Nottingham?',
    answer:
      'In most cases, yes, if the charger is installed outdoors. Most Nottingham properties are on PME (TN-C-S) supplies. Regulation 722.411.4.1 requires additional earthing measures for outdoor EV charging on PME supplies — typically an earth rod and TT arrangement at the charger, or a charger with integrated PEN fault detection. An earth rod adds approximately £80 to £150 to the installation cost. Your electrician will carry out an earthing assessment during the survey.',
  },
  {
    question: 'Can landlords install EV chargers in Nottingham rental properties?',
    answer:
      'Landlords can install EV chargers in Nottingham rental properties, subject to tenant consent and planning considerations. Landlords are not eligible for the domestic EV chargepoint grant, but the Workplace Charging Scheme may apply in some commercial or mixed-use contexts. For HMOs and purpose-built student accommodation, multiple charger installations with load management systems are becoming more common as tenants increasingly drive EVs. Always check that any electrical work complies with the Landlord and Tenant Act and any relevant HMO licensing conditions.',
  },
  {
    question: 'How long does EV charger installation take in Nottingham?',
    answer:
      'A standard 7kW EV charger installation in Nottingham takes 3 to 5 hours for a qualified electrician. Simple installations on modern properties take 3 to 4 hours. More complex jobs involving longer cable runs, consumer unit upgrades, or earth rod installation may take 5 to 7 hours. The electrician will complete NGED G98 notification and issue an Electrical Installation Certificate before leaving site.',
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
    href: '/electrician/nottingham',
    title: 'Electrician in Nottingham',
    description:
      'Find NICEIC and NAPIT-registered electricians in Nottingham for EV charger installation.',
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
    heading: 'EV Charger Installation in Nottingham: What to Expect',
    content: (
      <>
        <p>
          Nottingham is one of the East Midlands' largest cities, and EV adoption is accelerating as
          more residents make the switch from petrol and diesel vehicles. A home EV charger is the
          most practical and cost-effective way to keep an electric vehicle charged, providing a
          full charge overnight at a fraction of the cost of public rapid charging.
        </p>
        <p>
          Nottingham's housing stock is diverse, ranging from modern new builds in Clifton,
          Wollaton, and Arnold to Victorian terraces in the Meadows, Forest Fields, and Hyson Green.
          This variety means installation complexity and cost differ significantly across the city.
          Modern detached or semi-detached properties with garages or short driveways sit at the
          lower end of the cost range; older terraces with longer cable routes and ageing consumer
          units sit higher.
        </p>
        <p>
          This guide covers realistic costs for EV charger installation in Nottingham in 2026, the
          OZEV grant of up to £350 for eligible residents, the DNO notification process through{' '}
          <strong>National Grid Electricity Distribution (NGED)</strong>, Part P compliance, and
          what Nottingham's housing mix means for your installation.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Nottingham EV Charger Installation Costs 2026',
    content: (
      <>
        <p>
          Nottingham and the East Midlands offer competitive pricing for home EV charger
          installation. East Midlands labour rates are lower than London and the South East, and
          most residential properties have manageable cable routes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Nottingham Installation Costs (2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern detached/semi, garage)</strong> — £800 to
                £1,000. Short cable run of 3 to 8 metres, spare way available in consumer unit,
                charger mounted adjacent to the consumer unit. Common for Clifton, Wollaton, and
                Arnold new builds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terrace, medium run, earth rod)</strong> — £900 to
                £1,100. Cable run of 8 to 15 metres, PME earth rod required for outdoor charger,
                possible MCB addition. Typical for Meadows, Forest Fields, and Hyson Green terraces
                with off-street parking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (long run, board upgrade)</strong> — £1,100 to £1,400.
                Cable run over 15 metres, full consumer unit replacement, earth rod and TT
                arrangement. More common for older Victorian terraces where the consumer unit is at
                the back and parking is at the front.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger</strong> — £1,200 to £2,000 installed. Requires a
                three-phase supply and G99 approval from NGED. Suitable for properties with high
                daily mileage or multiple EVs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Labour rates for qualified electricians in Nottingham and the East Midlands typically
          range from £38 to £50 per hour. A standard EV charger installation takes 3 to 5 hours,
          making it a half-day to full-day job depending on the specific installation requirements.
        </p>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Grants and Incentives for Nottingham EV Charger Installation',
    content: (
      <>
        <p>Several grant schemes are available to Nottingham residents and businesses:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and tenants
                who own or lease an eligible plug-in vehicle. Given Nottingham's large student and
                rented-accommodation population, many city residents may be eligible. Applied for by
                your OZEV-approved installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Nottingham businesses can claim up to
                £350 per socket (maximum 40 sockets) for workplace EV charger installations.
                Requires an OZEV-approved installer and a registered business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nottingham City Council EV strategy</strong> — Nottingham City Council has
                an active zero-emission transport strategy supporting on-street charging
                infrastructure. Residents without off-street parking may benefit from expanding
                lamp-post and kerbside charging provision across the city.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Nottingham EV Charger Installations',
    content: (
      <>
        <p>
          All EV charger installations in Nottingham must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The main regulatory requirements for domestic Nottingham installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit (Regulation 722.533.101)</strong> — a dedicated 32A final
                circuit from the consumer unit. Older Nottingham consumer units may not have a spare
                way, requiring a board upgrade or separate enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection covering the EV circuit. Most quality smart chargers include integrated
                DC fault protection, satisfying the requirement for a Type B RCD or Type A RCD with
                6mA DC RDC-DD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger compliance</strong> — the Electric Vehicles (Smart Charge
                Points) Regulations 2021 require all new home EV chargers to support smart
                scheduling and demand side response functionality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — verify cable selection against{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  voltage drop calculations
                </SEOInternalLink>{' '}
                for the actual cable run length. 6mm² cable is typically adequate for runs up to 15
                metres; 10mm² may be needed for longer runs carrying 32A.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Nottingham',
    content: (
      <>
        <p>
          Most Nottingham properties are supplied on PME (TN-C-S) earthing arrangements. Regulation
          722.411.4.1 and the IET Code of Practice for EV Charging Equipment Installation set out
          the requirements for outdoor chargers on PME supplies.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              A broken PEN conductor on a PME supply can cause dangerous touch voltages on earthed
              metalwork, including an EV being charged outdoors. The risk is greatest on wet
              surfaces where the vehicle tyres provide limited isolation from the ground. The IET
              Code of Practice requires protective measures for all outdoor EV charging on PME
              supplies.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Nottingham Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              The most common approach is installing a local earth electrode (earth rod) at the
              charger location and using an appropriate RCD to create a TT arrangement.
              Alternatively, smart chargers with integrated PEN fault detection remove the need for
              a separate earth rod. Where the charger is inside a garage or enclosed carport, an
              assessment may allow the PME earth to be retained.
            </p>
          </div>
        </div>
        <p>
          An earth rod installation in Nottingham typically adds £80 to £150 to the total
          installation cost. Nottingham's clay and alluvial soils generally provide good earth
          resistance values.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'NGED DNO Notification for Nottingham EV Charger Installations',
    content: (
      <>
        <p>
          <strong>National Grid Electricity Distribution (NGED)</strong>, formerly Western Power
          Distribution, is the Distribution Network Operator for Nottingham and the East Midlands.
          G98 notification to NGED is a legal requirement before any domestic EV charger is
          energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (7kW single-phase)</strong> — submit online via the NGED
                portal. This is a notification, not an application — the installer proceeds with
                connection and notifies concurrently. Processing is automated for standard domestic
                installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase)</strong> — prior approval required from
                NGED before installation. Allow 4 to 10 weeks for assessment. Used for three-phase
                chargers and commercial premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician handles DNO
                notification. Confirm this is included in the quoted price. Failure to notify NGED
                can require the charger to be disconnected until notification is complete.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'nottingham-housing',
    heading: "Nottingham's Housing Stock and EV Charger Installation",
    content: (
      <>
        <p>
          Nottingham's diverse housing stock means EV charger installation feasibility varies
          significantly by area and property type:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern new builds (Clifton, Wollaton, Arnold, Gedling)</strong> — newer
                properties typically have modern consumer units, shorter cable routes, and adequate
                earthing. These are the most straightforward and cost-effective installations, often
                completed in under 4 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (Meadows, Forest Fields, Hyson Green)</strong> — longer
                cable runs are common, and many older consumer units need upgrading to accommodate a
                32A EV circuit. Installation is feasible but costs are higher. Always commission a
                survey before agreeing a price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student accommodation and HMOs (Lenton, Dunkirk, Radford)</strong> — large
                numbers of rented properties in the university quarter. Tenants may be eligible for
                OZEV grants; landlords should seek advice on installation responsibility and
                compliance with HMO licensing requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City-centre flats</strong> — shared parking, communal electricity supplies,
                and freeholder permissions add complexity. Load management systems may be needed
                where multiple residents install chargers. Flat owners are eligible for the OZEV
                grant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Nottingham',
    content: (
      <>
        <p>
          Nottingham and the East Midlands offer consistent demand for EV charger installation work.
          The city's diverse housing stock and growing EV uptake across all property types mean
          steady opportunity for NICEIC and NAPIT-registered electricians who can offer a complete,
          compliant service.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Nottingham EV Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in East Midlands labour rates (£38 to £50/hour), site survey time for older
                  properties, earth rod costs, NGED G98 notification, and EIC certification. Use
                  Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised quotes that clearly show all costs to the customer.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certification on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  from your phone before leaving site. Every EV charger installation requires a full
                  EIC under BS 7671 Section 722. Elec-Mate's certificate app includes all required
                  test fields and can be emailed to the customer instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Nottingham EV charger installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Complete EV charger quotes and certificates from your phone — built for electricians working across Nottingham and the East Midlands."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationNottinghamPage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Nottingham | Home EV Charging Nottingham 2026"
      description="EV charger installation costs in Nottingham 2026: 7kW charger £800-1,200 installed, OZEV grants up to £350, NGED DNO notification, PME earthing requirements, Part P compliance, and Nottingham housing considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Nottingham Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Nottingham:{' '}
          <span className="text-yellow-400">Costs, Grants, and Compliance 2026</span>
        </>
      }
      heroSubtitle="Home EV charger installation in Nottingham costs £800 to £1,200 for a 7kW wallbox. Covers OZEV grants up to £350, NGED DNO notification, PME earthing requirements, Part P compliance, and Nottingham's diverse housing stock."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
