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
  { label: 'Cambridge', href: '/ev-charger-installation-cambridge' },
];

const tocItems = [
  { id: 'overview', label: 'EV Charger Installation in Cambridge' },
  { id: 'costs', label: 'Cambridge Installation Costs' },
  { id: 'grants', label: 'Grants and Incentives' },
  { id: 'section-722', label: 'Section 722 Compliance' },
  { id: 'pme-earthing', label: 'PME Earthing in Cambridge' },
  { id: 'dno-notification', label: 'UK Power Networks DNO Notification' },
  { id: 'cambridge-housing', label: 'Cambridge Housing and Conservation Areas' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A 7kW home EV charger installation in Cambridge typically costs £850 to £1,300, reflecting the East of England\'s higher-than-average labour rates driven by the technology and biotech sectors.',
  'The OZEV EV chargepoint grant provides up to £350 for eligible flat owners and tenants. Cambridge\'s large university and college accommodation sector means many residents are eligible.',
  'UK Power Networks (UKPN) is the DNO for Cambridge and the East of England. G98 notification is required before energising any domestic 7kW EV charger.',
  'BS 7671:2018 Section 722 governs all EV charging installations. PME earthing is common in Cambridge, requiring an earth rod or PEN fault detection for outdoor charger locations.',
  'Cambridge\'s many conservation areas and listed buildings — including large areas of the city centre and surrounding villages — may require planning permission for visible charger installations.',
  'NICEIC and NAPIT-registered electricians can self-certify EV charger installations to Part P of the Building Regulations. Cambridge City Council must be notified for listed building works.',
];

const faqs = [
  {
    question: 'How much does EV charger installation cost in Cambridge in 2026?',
    answer:
      'A standard 7kW home EV charger installation in Cambridge costs between £850 and £1,300 in 2026. This covers the charger unit, a dedicated 32A circuit from the consumer unit, earthing arrangements, UK Power Networks G98 DNO notification, and an Electrical Installation Certificate. Labour rates in Cambridge and the wider East of England reflect the tech and biotech sector economy at £42 to £58 per hour. Simple installations on modern detached or semi-detached properties sit at the lower end. Victorian terrace and listed building installations with longer cable routes or conservation area planning requirements sit at the higher end.',
  },
  {
    question: 'Which DNO covers Cambridge for EV charger notification?',
    answer:
      'UK Power Networks (UKPN) — specifically the UKPN East region — is the Distribution Network Operator for Cambridge, the rest of Cambridgeshire, and the wider East of England including Norfolk, Suffolk, and Essex. All EV charger installations in Cambridge must be notified to UKPN under Engineering Recommendation G98 before the charger is energised. For standard 7kW single-phase chargers, G98 is a notification — no prior approval is needed. Three-phase 22kW chargers and multiple charger commercial installations require G99 prior approval, which can take several weeks.',
  },
  {
    question: 'Is the OZEV EV chargepoint grant available in Cambridge?',
    answer:
      'Yes. The OZEV EV chargepoint grant is a UK-wide scheme available to flat owners and tenants across Cambridge and Cambridgeshire. Given the large university college community, student accommodation, and private rented sector in Cambridge, many city residents are eligible. The grant provides up to £350 (75% of installation cost) per chargepoint. The grant is applied for by your OZEV-approved installer — you do not contact OZEV directly. You must own or have a confirmed order for an eligible plug-in vehicle.',
  },
  {
    question: 'Do Cambridge conservation areas affect EV charger installation?',
    answer:
      'Yes. Cambridge has extensive conservation areas covering large parts of the historic city centre, the Backs, and surrounding villages. Installing a visible EV charger on the front elevation of a property in a conservation area may require planning permission from Cambridge City Council or South Cambridgeshire District Council. Listed building consent may also be required for any works to a listed building, including cable routes through external walls. An experienced local electrician will advise on planning requirements during the survey. Some installers prefer internal cable routes or discreet rear-of-property installations to avoid planning complications.',
  },
  {
    question: 'Can I install an EV charger in a Cambridge college or university property?',
    answer:
      'College and university properties in Cambridge vary significantly in their suitability for private EV charger installation. Many college properties are listed buildings with strict conservation requirements. University-managed accommodation typically has shared parking where the institution controls EV charging infrastructure. Private tenants renting through the open market in Cambridge are eligible for the OZEV grant and can apply through an OZEV-approved installer, subject to landlord consent and planning requirements for the specific property.',
  },
  {
    question: 'Do I need an earth rod for an EV charger in Cambridge?',
    answer:
      'In most cases, yes, if the charger is outdoors. Most Cambridge properties are on PME (TN-C-S) supplies. Regulation 722.411.4.1 requires that where an EV charging point is installed outdoors on a PME supply, a local earth electrode (earth rod) is installed or a charger with integrated PEN fault detection is used. Cambridge\'s flat fenland terrain and clay soils generally provide good earth resistance values for earth rod installations. An earth rod adds approximately £80 to £150 to the installation cost.',
  },
  {
    question: 'How long does EV charger installation take in Cambridge?',
    answer:
      'A standard 7kW EV charger installation in Cambridge takes 3 to 5 hours for a qualified electrician. Simple installations on modern properties take 3 to 4 hours. Installations on Victorian terraces or properties with conservation area considerations may take longer, particularly where internal cable routes are required to avoid visible external work. The electrician will complete UKPN G98 notification and issue an Electrical Installation Certificate before leaving site.',
  },
  {
    question: 'What charger speed is best for a Cambridge home?',
    answer:
      'For most Cambridge residents, a 7kW single-phase wallbox is the optimal choice. A 7kW charger will add approximately 25 to 30 miles of range per hour, fully charging most EV batteries overnight. It requires only a single-phase supply (which all Cambridge residential properties have) and a standard 32A dedicated circuit. A 22kW three-phase charger charges faster but requires an existing three-phase supply — uncommon in Cambridge residential properties — and G99 approval from UKPN. For the vast majority of Cambridge households, 7kW is sufficient and significantly cheaper to install.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ev-charger-installation-cost',
    title: 'EV Charger Installation Cost UK',
    description: 'National price guide for EV charger installation covering all charger types and cost factors.',
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
    href: '/electrician/cambridge',
    title: 'Electrician in Cambridge',
    description:
      'Find NICEIC and NAPIT-registered electricians in Cambridge and Cambridgeshire for EV charger installation.',
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
    heading: 'EV Charger Installation in Cambridge: What to Expect',
    content: (
      <>
        <p>
          Cambridge is one of the UK's leading cities for EV adoption. A highly educated, tech-savvy
          population, high average incomes driven by the Silicon Fen technology and biotech cluster,
          and strong environmental awareness make Cambridge a city where EV uptake is consistently
          above the national average.
        </p>
        <p>
          Cambridge presents a distinctive installation landscape. The historic city centre is
          dominated by listed buildings and conservation areas, creating planning considerations
          for charger installations in visible locations. Beyond the centre, Cambridge's suburbs
          and surrounding villages have a mix of Victorian terraces, inter-war semis, and modern
          new builds — the latter, particularly in north Cambridge growth areas, being
          straightforward to fit with a home charger.
        </p>
        <p>
          This guide covers realistic costs for EV charger installation in Cambridge in 2026, the
          OZEV grant of up to £350 for eligible residents, the{' '}
          <strong>UK Power Networks (UKPN)</strong> DNO notification process, PME earthing
          requirements, and the conservation area planning considerations that are unique to
          Cambridge. Whether you are a Cambridge homeowner getting quotes or an electrician
          building your East of England EV installation business, this guide reflects 2026
          market conditions.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Cambridge EV Charger Installation Costs 2026',
    content: (
      <>
        <p>
          Cambridge installation costs reflect the East of England's above-average labour market.
          The Silicon Fen technology economy drives up wages across all skilled trades, making
          Cambridge installations moderately more expensive than the Midlands or North.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Typical Cambridge Installation Costs (2026)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Simple installation (modern detached/semi, garage or driveway)</strong>
                {' '}— £850 to £1,050. Short cable run, spare consumer unit way, standard earth
                rod. Common for north Cambridge new builds in Eddington, Northstowe, and
                Cambourne.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard installation (terrace or Victorian semi)</strong> — £1,000
                to £1,200. Cable run of 8 to 15 metres, PME earth rod required, possible MCB
                addition to the consumer unit. Typical for terraces in Romsey Town, Mill Road,
                and Coleridge areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complex installation (listed building, conservation area, long run)</strong>
                {' '}— £1,200 to £1,600+. Internal cable routing required to avoid visible external
                works, possible consumer unit upgrade, specialist fixings. Conservation areas
                and listed properties in the city centre and Newnham areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger</strong> — £1,200 to £2,000 installed. Requires
                a three-phase supply and G99 approval from UKPN. Suitable for technology sector
                employees with high-mileage requirements and an existing three-phase supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Labour rates for qualified electricians in Cambridge and the wider East of England
          range from £42 to £58 per hour. A standard installation takes 3 to 5 hours; conservation
          area jobs requiring careful internal cable routing may take a full day.
        </p>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Grants and Incentives for Cambridge EV Charger Installation',
    content: (
      <>
        <p>
          Cambridge residents can access both national grant support and local authority EV
          infrastructure initiatives:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>OZEV EV chargepoint grant</strong> — up to £350 for flat owners and
                tenants who own or lease an eligible plug-in vehicle. Cambridge's large student
                and research community means many city residents in rented accommodation are
                eligible. Applied for by your OZEV-approved installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workplace Charging Scheme</strong> — Cambridge's many tech companies,
                biotech firms, and research institutions can claim up to £350 per socket
                (maximum 40 sockets) for workplace EV charger installation. Requires an
                OZEV-approved commercial installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Greater Cambridge EV strategy</strong> — the Greater Cambridge Partnership
                and Cambridgeshire and Peterborough Combined Authority support EV charging
                infrastructure expansion, including on-street charging rollout in residential
                areas without off-street parking. Check Cambridge City Council's transport pages
                for current schemes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'section-722',
    heading: 'Section 722 Compliance for Cambridge EV Charger Installations',
    content: (
      <>
        <p>
          All EV charger installations in Cambridge must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 722. The key requirements for Cambridge domestic installations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated final circuit (Regulation 722.533.101)</strong> — a dedicated
                32A circuit from the consumer unit. Older Cambridge consumer units in Victorian
                properties may not have a spare way, requiring a board upgrade or separate
                enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 722.531.101)</strong> — appropriate RCD
                protection covering the EV circuit. Modern smart chargers typically include
                integrated DC fault protection, satisfying the Type B RCD or Type A with 6mA
                DC RDC-DD requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart charger compliance</strong> — the Electric Vehicles (Smart Charge
                Points) Regulations 2021 requires all new home EV chargers to support smart
                scheduling, randomised delay, and demand side response. All chargers on the
                OZEV approved charger list are compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — use{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  Elec-Mate's cable sizing calculator
                </SEOInternalLink>{' '}
                to verify voltage drop is within the 5% limit for the actual cable run length.
                6mm² is adequate for most Cambridge installations; 10mm² may be needed for
                runs exceeding 15 metres or where 10mm² is needed for derating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pme-earthing',
    heading: 'PME Earthing Considerations in Cambridge',
    content: (
      <>
        <p>
          The majority of Cambridge properties are supplied on PME (TN-C-S) earthing arrangements.
          Regulation 722.411.4.1 and the IET Code of Practice for EV Charging Equipment
          Installation require specific protective measures for outdoor EV charging on PME supplies.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">The PME Risk</h3>
            <p className="text-white text-sm leading-relaxed">
              A broken PEN conductor on a PME supply can cause dangerous touch voltages on earthed
              metalwork, including an EV being charged outdoors. The risk is greatest on wet
              surfaces. Cambridge's flat, low-lying terrain and proximity to the Fens means
              driveways can be persistently damp in winter, making earthing specification
              particularly important.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Cambridge Solutions</h3>
            <p className="text-white text-sm leading-relaxed">
              Installing a local earth electrode (earth rod) at the charger location and using an
              appropriate RCD to create a TT arrangement is the standard approach for outdoor
              Cambridge chargers. Cambridge's clay and alluvial soils typically give excellent
              earth resistance values. Alternatively, chargers with integrated PEN fault detection
              avoid the need for an earth rod entirely.
            </p>
          </div>
        </div>
        <p>
          An earth rod installation adds approximately £80 to £150 to the total cost. Your
          electrician will test earth resistance values to confirm they are within acceptable
          limits before completing the installation.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'UKPN DNO Notification for Cambridge EV Charger Installations',
    content: (
      <>
        <p>
          <strong>UK Power Networks (UKPN)</strong> — specifically the UKPN East region — is the
          Distribution Network Operator for Cambridge, Cambridgeshire, and the wider East of
          England. G98 notification to UKPN is a legal requirement before any domestic EV charger
          is energised.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notification (7kW single-phase)</strong> — submit online via the
                UKPN portal. This is a notification, not an application — the installer proceeds
                with connection and notifies concurrently for standard domestic 7kW installations.
                No prior approval is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 application (22kW three-phase)</strong> — prior approval required
                from UKPN before installation. Allow 4 to 10 weeks. Required for three-phase
                chargers and multiple charger commercial premises. Cambridge's tech employers
                increasingly need G99 for workplace charging hubs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installer responsibility</strong> — the electrician handles UKPN
                notification. Confirm this is included in the quoted price. Failure to notify
                UKPN can result in the charger being required to be disconnected until
                notification is properly submitted.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cambridge-housing',
    heading: 'Cambridge Conservation Areas and Listed Buildings',
    content: (
      <>
        <p>
          Cambridge's exceptional architectural heritage means a higher proportion of EV charger
          installations than in most UK cities involve conservation area or listed building
          considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas across Cambridge</strong> — Cambridge City Council
                designates extensive conservation areas covering much of the historic centre,
                the Backs, Newnham, Chesterton, and parts of Romsey Town. Installations on
                front elevations of properties in conservation areas may require planning
                permission, particularly where the charger or cable trunking is prominently
                visible from the street.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — Listed Building Consent from Cambridge City
                Council is required for any works that alter the character of a listed building,
                including drilling through external walls or mounting equipment on listed
                elevations. An experienced Cambridge electrician will advise on the consent
                process and help design an installation that minimises impact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal cable routing</strong> — for conservation area and listed
                building properties, running the cable internally (through floors, walls, and
                ceilings) and exiting at a discreet rear or side elevation avoids the need
                for planning permission in most cases. This increases installation time and
                cost but ensures compliance. Always confirm the specific planning requirements
                for your property before booking an installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Village properties in the Cambridge green belt</strong> — surrounding
                villages including Grantchester, Trumpington, Cherry Hinton, and Histon may
                have their own conservation designations. Check with South Cambridgeshire
                District Council for village-specific planning requirements before installation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EV Charger Work in Cambridge',
    content: (
      <>
        <p>
          Cambridge and the wider Cambridgeshire area represent a high-value market for EV
          charger installation. Higher average incomes, strong EV uptake, and a growing base of
          tech employer workplace charging projects make this a competitive but rewarding area
          for NICEIC and NAPIT-registered electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing Cambridge EV Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in East of England labour rates (£42 to £58/hour), additional time for
                  listed building or conservation area assessments, earth rod costs, UKPN G98
                  notification, and EIC certification. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build itemised, professional quotes that justify Cambridge pricing to
                  informed customers.
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
                  under BS 7671 Section 722. Issue it from your phone before leaving site and
                  email the customer a copy instantly. Elec-Mate's certificate app includes all
                  required test result fields and supports all charger installation types.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify Cambridge EV charger installations"
          description="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certification. Complete EV charger quotes and certificates from your phone — built for electricians working across Cambridge and the East of England."
          icon={Car}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EVChargerInstallationCambridgePage() {
  return (
    <GuideTemplate
      title="EV Charger Installation Cambridge | Home EV Charging Cambridge 2026"
      description="EV charger installation costs in Cambridge 2026: 7kW charger £850-1,300 installed, OZEV grants up to £350, UKPN DNO notification, PME earthing requirements, conservation area planning considerations, and Part P compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cambridge Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          EV Charger Installation Cambridge:{' '}
          <span className="text-yellow-400">Costs, Grants, and Conservation Areas 2026</span>
        </>
      }
      heroSubtitle="Home EV charger installation in Cambridge costs £850 to £1,300 for a 7kW wallbox. Covers OZEV grants up to £350, UK Power Networks (UKPN) DNO notification, PME earthing, conservation area and listed building planning requirements, and Part P compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EV Charger Installation in Cambridge"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify EV Charger Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for cable sizing, AI-powered quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
