import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Find an Electrician', href: '/find-electrician' },
  { label: 'Electrician Suffolk', href: '/electrician-suffolk' },
];

const tocItems = [
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'dno-networks', label: 'DNO Networks' },
  { id: 'port-logistics', label: 'Port & Logistics Electrical Work' },
  { id: 'heritage-buildings', label: 'Heritage & Listed Buildings' },
  { id: 'offshore-wind', label: 'Offshore Wind Support' },
  { id: 'regulations', label: 'BS 7671 Compliance' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Suffolk is served entirely by UK Power Networks as the Distribution Network Operator (DNO). All new connections, supply upgrades, and power cut reports go through UK Power Networks.',
  'Felixstowe is the UK\'s busiest container port, creating continuous demand for heavy electrical maintenance, three-phase industrial supplies, and hazardous area (ATEX) qualified electricians.',
  'Suffolk\'s agricultural and rural landscape includes many properties on extended LV network spurs, where voltage drop calculations under BS 7671 Regulation 525 must be carefully assessed.',
  'The East Anglia offshore wind arrays (East Anglia ONE, Dudgeon extension) require onshore cable route maintenance and substation electrical work, requiring NVQ Level 3 qualified and BESC-carded electricians.',
  'Numerous listed and timber-framed buildings in Lavenham, Long Melford, and the Dedham Vale area require sensitive wiring methods and may need listed building consent for any new surface-run installations.',
  'All domestic electrical work creating new circuits must be notified under Part P. Registered competent persons (NICEIC, ELECSA, NAPIT) can self-certify without separate building control notification.',
];

const faqs = [
  {
    question: 'Which DNO covers Suffolk?',
    answer:
      'UK Power Networks is the sole Distribution Network Operator for the whole of Suffolk, including Ipswich, Bury St Edmunds, Lowestoft, Felixstowe, Sudbury, and Newmarket. For new supply connections or capacity upgrades, contact UK Power Networks directly or ask your electrician to manage the connection application on your behalf. The power cut emergency number for Suffolk is 0800 783 8866.',
  },
  {
    question: 'What electrical certifications do I need for port or industrial electrical work at Felixstowe?',
    answer:
      'Electrical work at Felixstowe Port and the associated logistics parks typically requires: an Electrical Installation Certificate (EIC) for all new circuits, issued by a qualified design and installation engineer; ATEX/Ex qualification where work is carried out in potentially explosive atmospheres (fuel storage, paint spray areas); Safe isolation competency to GS38 standard; and relevant industry-specific site inductions (the Port of Felixstowe has its own contractor management system). For large industrial installations, the design must also comply with IET Guidance Note 1 (Selection and Erection) and BS 7671 Chapter 55 (Other equipment).',
  },
  {
    question: 'Do I need to rewire my listed building in Lavenham or Long Melford?',
    answer:
      "If your Suffolk listed building has an existing installation that is working safely and passing EICR inspection, a full rewire is not necessarily required. However, if the installation is so deteriorated that a satisfactory EICR cannot be achieved, or if you are carrying out a major renovation, rewiring is typically the safest option. Any new wiring in a Listed building should be discussed with a qualified electrician before work begins. You may need Listed Building Consent from Babergh District Council or West Suffolk Council for surface-mounted conduit runs, new light fittings in historic features, or alterations to original fabric. Your electrician should be familiar with conservation-area working methods.",
  },
  {
    question: 'What is the EICR requirement for rental properties in Suffolk?',
    answer:
      'Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all private landlords in Suffolk must have a valid EICR carried out by a qualified person every 5 years (or at each change of tenancy, whichever is sooner). The EICR must be carried out to BS 7671 standards. A copy must be given to existing tenants within 28 days of inspection and to new tenants before they move in. Any C1 (danger present) or C2 (potentially dangerous) defects must be remedied within 28 days of the report date. Suffolk local authorities, including Ipswich Borough Council, actively enforce these requirements.',
  },
  {
    question: 'Are there specific electrical requirements for agricultural buildings in Suffolk?',
    answer:
      'Yes. Agricultural and horticultural buildings in Suffolk must be installed in accordance with BS 7671 Section 705. Key requirements include: IP44 minimum for wiring accessories in livestock areas; supplementary equipotential bonding of all simultaneously accessible metalwork in livestock zones; earth fault loop impedance values that support 0.4-second disconnection in 230V circuits accessible to animals; and SWA cable or PVC cable in conduit for all fixed wiring in agricultural buildings. Three-phase supplies are commonly required for grain drying equipment and irrigation pumps on Suffolk farms. RCD protection is mandatory for all circuits.',
  },
  {
    question: 'What electrical qualifications are needed for offshore wind support work in Suffolk?',
    answer:
      'Electricians working on or near offshore wind installations require a GWO (Global Wind Organisation) Basic Safety Training certificate covering First Aid, Working at Heights, Manual Handling, Fire Awareness, and Sea Survival. For onshore substation and cable work associated with projects like East Anglia ONE (which comes ashore near Leiston), a Substation Authorised Person (AP) qualification and BS 7671 competency are essential. BESC (Basic Electrical Safety Competency) cards are typically required for site access. Work involving HV systems requires IET or City & Guilds HV competency qualifications.',
  },
  {
    question: 'Can I add solar panels to my Suffolk home without an EICR first?',
    answer:
      "It is strongly recommended to have a valid EICR before adding a solar PV system. The solar installation connects to your consumer unit, and any pre-existing defects (such as deteriorated insulation, lack of RCD protection, or an undersized main switch) will be exacerbated by the additional generation feed-in. A solar PV installation on a domestic property requires an Electrical Installation Certificate. The DNI (Distribution Network Operator notification) to UK Power Networks is also required for systems over 3.68kW single-phase or 11kW three-phase. See our <a href='/solar-pv-installation-guide'>solar PV installation guide</a> for full details.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-norfolk',
    title: 'Electrician Norfolk',
    description: 'Find registered electricians across Norfolk including Norwich and Great Yarmouth.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/electrician-cambridgeshire',
    title: 'Electrician Cambridgeshire',
    description: 'Find registered electricians across Cambridgeshire.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Suffolk landlord EICR obligations explained.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Generate EICR reports on your phone with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

const sections = [
  {
    id: 'areas-covered',
    heading: 'Areas Covered — Suffolk Electricians',
    content: (
      <>
        <p>
          Suffolk electricians registered on Elec-Mate cover the whole county, from the
          county town of Ipswich to the coastal towns and the rural interior.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ipswich</strong> — county town and commercial hub, including the
                Waterfront regeneration area and surrounding suburban districts
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bury St Edmunds</strong> — historic market town and surrounding
                West Suffolk villages
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lowestoft &amp; Great Yarmouth border</strong> — coastal town with
                significant maritime and offshore energy sector activity
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Felixstowe</strong> — port town and container logistics hub on the
                Orwell estuary
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sudbury, Newmarket &amp; Haverhill</strong> — market towns in south
                and west Suffolk, plus rural and heritage villages throughout
              </span>
            </li>
          </ul>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/consumer-unit-replacement">consumer unit replacements</SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord EICRs</SEOInternalLink>{' '}
          across Suffolk, Elec-Mate matches you with registered local electricians.
        </p>
      </>
    ),
  },
  {
    id: 'dno-networks',
    heading: 'DNO Networks in Suffolk',
    content: (
      <>
        <p>
          UK Power Networks is the sole Distribution Network Operator for Suffolk. All
          supply connections, meter upgrades, and network faults are handled through UK
          Power Networks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK Power Networks</strong> — covers all of Suffolk. New supply
                applications, capacity upgrades, and contestable connection works.
                Emergency line: 0800 783 8866.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase supply applications</strong> — industrial and commercial
                customers requiring 3-phase (400V) supply must apply to UK Power Networks
                for a connection quote. Lead times for new 3-phase connections can be 3 to
                6 months in rural areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'port-logistics',
    heading: 'Port & Logistics Electrical Work at Felixstowe',
    content: (
      <>
        <p>
          The Port of Felixstowe is the UK&apos;s largest container port, handling around
          4 million TEUs per year. The port and associated logistics parks on the Orwell
          estuary create extensive demand for specialist industrial electrical services.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Crane and gantry power systems</strong> — quayside cranes, rail-mounted
                gantry cranes (RMGs), and automated stacking cranes require high-current
                three-phase supplies, busbar systems, and festoon cable maintenance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reefer (refrigerated container) power</strong> — quayside reefer
                points require single and three-phase 400V supply with individual protection,
                metering, and weatherproof enclosures to IP55 minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ATEX hazardous area classification</strong> — fuel storage, bunkering
                facilities, and paint spray areas require hazardous area electrical installations
                under BS EN 60079 and BS 7671 Section 706.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage Port Electrical Projects with Elec-Mate"
          description="Generate Electrical Installation Certificates for industrial and commercial projects. Log test results, create schedules of tests, and share certificates with clients instantly."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
  {
    id: 'heritage-buildings',
    heading: 'Electrical Work in Heritage & Listed Buildings',
    content: (
      <>
        <p>
          Suffolk has an exceptionally high concentration of Listed buildings, particularly
          in Lavenham, Long Melford, Framlingham, Woodbridge, and the Dedham Vale area.
          Electricians working in these buildings must balance compliance with BS 7671 with
          the requirements of heritage conservation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building consent</strong> — required before making any
                material alterations to a listed building, including installing new surface
                conduit runs, replacement light fittings that differ from existing, or
                any work that removes or alters original fabric.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealed wiring methods</strong> — where possible, cables should be
                routed through existing voids, under floors, or in oval conduit painted to
                match wall finishes. Brass or period-style accessories are available where
                modern white plastic would be inappropriate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for older installations</strong> — many listed Suffolk properties
                have electrical installations that are 30 to 50 years old. An{' '}
                <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR inspection</SEOInternalLink>{' '}
                is the starting point for any heritage electrical project.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'offshore-wind',
    heading: 'Offshore Wind Support — East Anglia Array',
    content: (
      <>
        <p>
          The East Anglia offshore wind zone is one of the largest offshore wind development
          areas in the world, with East Anglia ONE already operational and further projects
          in development. Suffolk-based electricians with relevant qualifications are well
          placed to support the onshore and inter-array electrical infrastructure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Onshore cable routes</strong> — high-voltage underground cable
                routes from offshore substations (East Anglia ONE comes ashore near
                Leiston) require excavation works, joint bay installations, and substation
                civil and electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Operations and maintenance bases</strong> — O&amp;M bases at Lowestoft
                harbour and Ipswich require conventional electrical maintenance including
                substations, offices, workshops, and quayside facilities.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'BS 7671 Compliance in Suffolk',
    content: (
      <>
        <p>
          All electrical installations in Suffolk must comply with BS 7671:2018+A3:2024.
          Key regulations relevant to common Suffolk work types include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 411.3.3</strong> — 30mA RCD protection mandatory for
                all socket-outlet circuits in domestic premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 705</strong> — agricultural buildings require equipotential
                bonding, minimum IP44 accessories, and careful assessment of earthing
                arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 525</strong> — voltage drop must not exceed 3% for
                lighting and 5% for power circuits. Rural Suffolk properties on long
                network spurs require careful cable sizing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function ElectricianSuffolkPage() {
  return (
    <GuideTemplate
      title="Electrician Suffolk — Find Registered Electricians Near You"
      description="Find NICEIC, ELECSA, and NAPIT-registered electricians across Suffolk including Ipswich, Bury St Edmunds, Lowestoft, Felixstowe, Sudbury, and Newmarket. Part P compliant, fully insured."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Suffolk{' '}
          <span className="text-yellow-400">— Find Registered Electricians</span>
        </>
      }
      heroSubtitle="Registered electricians across Suffolk covering Ipswich, Bury St Edmunds, Lowestoft, Felixstowe, Sudbury, Newmarket, and rural agricultural properties. All work certified to BS 7671."
      readingTime={7}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Suffolk Electrician — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Find a Suffolk Electrician Today"
      ctaSubheading="Browse NICEIC and ELECSA-registered electricians across Suffolk. All work covered by Part P certification and public liability insurance."
    />
  );
}
