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
  { label: 'Electrician Norfolk', href: '/electrician-norfolk' },
];

const tocItems = [
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'dno-networks', label: 'DNO Networks' },
  { id: 'offshore-wind', label: 'Offshore Wind Maintenance' },
  { id: 'rural-connections', label: 'Rural & Longline Connections' },
  { id: 'listed-buildings', label: 'Listed Flint & Brick Buildings' },
  { id: 'caravan-parks', label: 'Caravan Park Electrical' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Norfolk is served entirely by UK Power Networks as the Distribution Network Operator. All supply connections, upgrades, and power cut reports are handled through UK Power Networks.',
  'Norfolk hosts major offshore wind assets including Sheringham Shoal (317MW) and Dudgeon (402MW), creating ongoing O&M demand for electricians with GWO training and HV competency.',
  'Remote Norfolk villages and coastal properties frequently experience voltage regulation issues due to long LV network spurs. Cable sizing calculations under BS 7671 Regulation 525 are essential.',
  'Norfolk has a high concentration of flint and brick Listed buildings in the Broads, coastal areas, and market towns. Listed building consent is required before making alterations to these structures.',
  'Norfolk has hundreds of caravan and holiday parks requiring regular electrical maintenance, EICR inspections, and BS 7671 Section 708 compliant pitch supply installations.',
  'All domestic electrical work creating new circuits must be certified under Part P. NICEIC, ELECSA, and NAPIT registered electricians can self-certify without separate building control notification.',
];

const faqs = [
  {
    question: 'Which DNO covers Norfolk?',
    answer:
      'UK Power Networks is the Distribution Network Operator for all of Norfolk, including Norwich, King\'s Lynn, Great Yarmouth, Cromer, Diss, Fakenham, and all rural areas. New supply connections, LV network extensions, and capacity upgrades are handled by UK Power Networks. For power cut emergencies in Norfolk, call 0800 783 8866.',
  },
  {
    question: 'What electrical maintenance is required at offshore wind farms near Norfolk?',
    answer:
      'Offshore wind farms such as Sheringham Shoal (off the north Norfolk coast) and Dudgeon (further offshore) require ongoing O&M including: HV switchgear maintenance and testing, transformer inspections, MV/LV distribution board servicing, emergency lighting testing to BS 5266, fire detection system testing to BS 5839, and UPS system maintenance. Electricians must hold GWO Basic Safety Training, BESC card, and (for HV work) an Authorised Person qualification to relevant utility standards. Onshore O&M bases at Bacton and Great Yarmouth also require conventional electrical maintenance services.',
  },
  {
    question: 'What are the electrical requirements for caravan parks in Norfolk under BS 7671?',
    answer:
      'Caravan and camping parks in Norfolk must comply with BS 7671 Section 708 (Electrical installations in caravan parks). Key requirements include: each caravan pitch must have its own RCD-protected socket (minimum IP44, typically IP55) rated at 16A; the supply to each pitch must be protected by a 30mA RCD; maximum 25m from the socket to the caravan connection point; and an EICR must be carried out on the park\'s electrical installation at regular intervals (typically every 3 years for a commercial caravan park). The touring caravan site licence may impose additional conditions above the BS 7671 minimum.',
  },
  {
    question: 'How do I deal with voltage problems on a remote Norfolk rural property?',
    answer:
      'Voltage problems on rural Norfolk properties typically manifest as dimming lights, slow-heating appliances, or nuisance tripping of electronic equipment. The first step is to ask UK Power Networks to measure the supply voltage at the meter — they are obliged to maintain supply voltage within statutory limits (+10%/-6% of 230V under the Electricity Safety, Quality and Continuity Regulations). If the DNO supply is within tolerance and the problem is on the customer\'s side, an electrician can carry out a volt drop survey, check main bonding conductor sizing, and recalculate cable sizes if extensions have been made without considering cumulative volt drop under BS 7671 Regulation 525.',
  },
  {
    question: 'Do I need listed building consent for rewiring a Norfolk flint cottage?',
    answer:
      "Listed building consent is required for any internal or external works that would affect the character of a listed building. In practice, rewiring a listed Norfolk flint cottage typically requires consent because the installation will inevitably affect original fabric (plaster, lime render, timber floors, or historic joinery). You should apply to the relevant local planning authority (Norfolk County Council or the relevant district council) before starting work. Where consent is granted, the installation should minimise damage to original fabric, use concealed routes where possible, and prefer oval conduit or surface-mounted mini-trunking finished to match the wall rather than chasing into historic lime plaster.",
  },
  {
    question: 'What certifications does a Norfolk landlord need for a rental property?',
    answer:
      'Norfolk landlords must provide tenants with a valid EICR (Electrical Installation Condition Report) carried out every 5 years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. The EICR must be completed by a qualified inspector. Any C1 or C2 defects must be remedied within 28 days. A copy must be given to the tenant before they move in (new tenancies) or within 28 days of the inspection (existing tenants). Failure to comply can result in a financial penalty from the local authority of up to £30,000.',
  },
  {
    question: 'Are there specific electrical requirements for holiday lets and Airbnb properties in Norfolk?',
    answer:
      "Holiday lets and short-term rental properties in Norfolk are not formally covered by the Electrical Safety Standards in the Private Rented Sector Regulations (which apply to assured shorthold tenancies). However, under general health and safety law (the Occupiers' Liability Act 1984), property owners have a duty of care to ensure electrical installations are safe for guests. It is strongly recommended to have a valid EICR on holiday let properties, ideally every 5 years. Smoke and carbon monoxide detection must also comply with the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-suffolk',
    title: 'Electrician Suffolk',
    description: 'Find registered electricians across Suffolk including Ipswich and Felixstowe.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/electrician-lincolnshire',
    title: 'Electrician Lincolnshire',
    description: 'Find registered electricians across Lincolnshire.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Norfolk landlord EICR obligations explained.',
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
    heading: 'Areas Covered — Norfolk Electricians',
    content: (
      <>
        <p>
          Norfolk electricians on Elec-Mate cover the whole county, from the city of Norwich
          to the remote north coast and the Broads wetlands.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Norwich</strong> — city and suburbs including Thorpe St Andrew,
                Hellesdon, Bowthorpe, and surrounding market towns
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>King&apos;s Lynn</strong> — port town and West Norfolk, including
                Hunstanton, Downham Market, and the Fens border
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Great Yarmouth</strong> — coastal town, North Sea oil and gas
                service base, and the Broads gateway
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>North Norfolk coast</strong> — Cromer, Sheringham, Wells-next-the-Sea,
                Hunstanton and the Area of Outstanding Natural Beauty
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>South Norfolk</strong> — Diss, Attleborough, Wymondham, and the
                border with Suffolk
              </span>
            </li>
          </ul>
        </div>
        <p>
          Whether you need a{' '}
          <SEOInternalLink href="/consumer-unit-replacement">consumer unit replacement</SEOInternalLink>{' '}
          in Norwich or an{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">EICR for a rental property</SEOInternalLink>{' '}
          in Great Yarmouth, Elec-Mate connects you with qualified local electricians.
        </p>
      </>
    ),
  },
  {
    id: 'dno-networks',
    heading: 'DNO Networks in Norfolk',
    content: (
      <>
        <p>
          UK Power Networks is the sole Distribution Network Operator for Norfolk. All
          new supply connections, capacity upgrades, and power cut emergencies are handled
          through UK Power Networks.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK Power Networks</strong> — covers all of Norfolk. Emergencies:
                0800 783 8866. New connections:
                ukpowernetworks.co.uk/new-connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural supply quality</strong> — many Norfolk villages are at the
                end of long LV network spurs. Statutory voltage limits (+10%/-6% of
                230V) sometimes require DNO network reinforcement for new large loads
                such as heat pumps and EV chargers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'offshore-wind',
    heading: 'Offshore Wind Maintenance — Sheringham Shoal & Dudgeon',
    content: (
      <>
        <p>
          Norfolk is at the heart of the UK&apos;s offshore wind industry. Sheringham Shoal
          (317MW, operational since 2012) and Dudgeon (402MW, operational since 2017) sit
          off the north Norfolk coast, with operations and maintenance based ashore.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>O&amp;M base electrical</strong> — shore-based operations facilities at
                Blyth and Bacton require standard commercial electrical maintenance including
                substations, offices, workshops, control rooms, and quayside power.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offshore electrical maintenance</strong> — qualified electricians with
                GWO training, BESC card, and Authorised Person (HV) status can access turbine
                nacelle and WTG substation maintenance contracts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable landfall infrastructure</strong> — inter-array and export cable
                systems coming ashore in Norfolk require civil and electrical installation
                and ongoing testing and maintenance.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Certificate Management for Wind Energy Projects"
          description="Generate Electrical Installation Certificates and test records for commercial and renewable energy projects with Elec-Mate."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
  {
    id: 'rural-connections',
    heading: 'Rural & Longline Electrical Connections in Norfolk',
    content: (
      <>
        <p>
          Norfolk&apos;s sparse settlement pattern means many properties are supplied via
          long LV cable runs from the nearest 11kV substation. This creates specific
          challenges for electricians designing and certifying installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop (Regulation 525)</strong> — cumulative voltage drop on
                long supply runs must not exceed 3% for lighting or 5% for power under normal
                load conditions. For new heat pump or EV charger installations on rural spurs,
                confirm supply voltage with UK Power Networks before sizing cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance</strong> — high external loop impedance
                (Ze) on rural TN-C-S and TN-S networks can affect disconnection times.
                Where Ze exceeds design assumptions, use of RCBOs ensures 30mA disconnection
                regardless of loop impedance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — some remote Norfolk properties use
                TT earthing (local earth electrode) where a PME network is unavailable. TT
                systems require a high-quality earth electrode with electrode resistance below
                200 ohms, and RCD protection on all circuits.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'listed-buildings',
    heading: 'Listed Flint & Brick Buildings in Norfolk',
    content: (
      <>
        <p>
          Norfolk has a distinctive building heritage dominated by knapped flint, brick, and
          carr oak timber framing. Many properties in the Norfolk Broads, coastal villages,
          and market towns are Listed. Electricians must work sensitively in these buildings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flint walls</strong> — chasing into flint and lime mortar walls is
                not recommended and may require listed building consent. Surface-run oval
                conduit, finished with lime-compatible plaster or paint, is the preferred
                method where cables cannot be routed through floor voids.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp and moisture</strong> — Norfolk flint buildings often have
                damp issues, particularly at ground level. All wiring in damp or wet
                locations must use appropriate IP-rated accessories and wiring systems.
                See our{' '}
                <SEOInternalLink href="/electrical-damp-proofing">electrical damp-proofing guide</SEOInternalLink>{' '}
                for detailed guidance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'caravan-parks',
    heading: 'Caravan Park Electrical Installations',
    content: (
      <>
        <p>
          Norfolk is one of the most popular caravan and camping destinations in England,
          with hundreds of parks from Hunstanton to Horning. All caravan parks must comply
          with BS 7671 Section 708.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 708 — caravan parks</strong> — each pitch supply must
                be individually RCD-protected (30mA), with an IP55 rated BS EN 60309
                socket (CEE form, typically blue 16A or 32A). Maximum 25m from socket
                to caravan. Supply cable to each pitch must be protected against mechanical
                damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Periodic inspection</strong> — commercial caravan parks should
                have an EICR carried out every 3 years (or more frequently if the site
                licence requires). The park&apos;s site licence, issued by the local
                authority, may impose specific electrical safety conditions.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="EICR Certificates for Caravan Parks"
          description="Generate Section 708-compliant EICRs and Installation Certificates for caravan and holiday park electrical systems with Elec-Mate."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
];

export default function ElectricianNorfolkPage() {
  return (
    <GuideTemplate
      title="Electrician Norfolk — Find Registered Electricians Near You"
      description="Find NICEIC, ELECSA, and NAPIT-registered electricians across Norfolk including Norwich, King's Lynn, Great Yarmouth, Cromer, Diss, and Fakenham. Part P compliant, fully insured."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Norfolk{' '}
          <span className="text-yellow-400">— Find Registered Electricians</span>
        </>
      }
      heroSubtitle="Registered electricians across Norfolk covering Norwich, King's Lynn, Great Yarmouth, the north Norfolk coast, Diss, Fakenham, and rural agricultural properties. All work certified to BS 7671."
      readingTime={7}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Norfolk Electrician — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Find a Norfolk Electrician Today"
      ctaSubheading="Browse NICEIC and ELECSA-registered electricians across Norfolk. All work covered by Part P certification and public liability insurance."
    />
  );
}
