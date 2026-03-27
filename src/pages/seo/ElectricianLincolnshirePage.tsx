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
  { label: 'Electrician Lincolnshire', href: '/electrician-lincolnshire' },
];

const tocItems = [
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'dno-networks', label: 'DNO Networks' },
  { id: 'steel-industry', label: 'Steel Industry at Scunthorpe' },
  { id: 'agricultural', label: 'Agricultural & Horticultural Electrical' },
  { id: 'raf-bases', label: 'RAF Base Electrical Work' },
  { id: 'coastal-parks', label: 'Coastal Holiday Parks' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Lincolnshire is served by National Grid Electricity Distribution (East Midlands) as the DNO — covering Lincoln, Grimsby, Scunthorpe, Grantham, Boston, Skegness, and Spalding.',
  'Scunthorpe\'s steel works (British Steel) is one of the UK\'s largest industrial electrical consumers, requiring specialist HV competency, ATEX qualifications, and industrial maintenance skills.',
  'Lincolnshire has one of the largest areas of agricultural land in England. Agricultural wiring under BS 7671 Section 705 covers specialist requirements for grain drying, cold stores, and irrigation.',
  'RAF Coningsby and RAF Waddington are significant employers of Ministry of Defence (MoD) approved electrical contractors, with specific security clearance and MoD specification requirements.',
  'Lincolnshire\'s Lincolnshire coast — Skegness, Mablethorpe, Cleethorpes — has hundreds of holiday parks requiring BS 7671 Section 708 caravan park electrical compliance and regular EICR inspections.',
  'All domestic electrical work creating new circuits must comply with Part P Building Regulations. Registered competent persons (NICEIC, ELECSA, NAPIT) can self-certify without separate building control notification.',
];

const faqs = [
  {
    question: 'Which DNO covers Lincolnshire?',
    answer:
      'National Grid Electricity Distribution (East Midlands) is the Distribution Network Operator for the whole of Lincolnshire, including Lincoln, Grimsby, Scunthorpe, Grantham, Boston, Skegness, Spalding, and all rural areas. For new supply connections, capacity upgrades, or to report a power cut, contact National Grid ED on 0800 678 3105. The company was formerly known as Western Power Distribution (WPD) before National Grid acquired it in 2021.',
  },
  {
    question: 'What electrical qualifications are needed to work at Scunthorpe steelworks?',
    answer:
      'Working at British Steel Scunthorpe (the UK\'s last integrated steelworks) requires a combination of qualifications: HV Authorised Person or Competent Person status for high-voltage work; ATEX/Ex Zone qualification for work in potentially explosive atmospheres (dust and gas hazards in steelmaking areas); CCNSG (National Highways Sector Scheme) Safety Passport for site induction; and BS 7671 qualification (City & Guilds 2391 or equivalent) for LV electrical work. Many contracts also require IPAF (Powered Access) and PASMA (Mobile Access Towers) qualifications for work at height. Contractor competency approval via the site\'s permit-to-work system is mandatory.',
  },
  {
    question: 'What are the Part P requirements for rural Lincolnshire properties?',
    answer:
      'Part P of the Building Regulations applies to all domestic electrical installations in England, including rural Lincolnshire. New circuits, consumer unit replacements, and electrical work in kitchens, bathrooms, and outdoors must be either notified to building control or self-certified by a registered competent person (NICEIC, ELECSA, or NAPIT registered electrician). For rural agricultural buildings, Part P does not apply (agricultural buildings are covered by other legislation), but BS 7671 Section 705 requirements still apply. All domestic work must be accompanied by the correct electrical certificate.',
  },
  {
    question: 'What electrical work is needed on agricultural buildings in Lincolnshire?',
    answer:
      'Lincolnshire has extensive arable farming, bulb growing (in the Spalding area), and food processing. Agricultural electrical requirements include: three-phase supplies for grain dryers, irrigation pumps, and cold stores; supplementary equipotential bonding in livestock buildings under BS 7671 Section 705; IP44 minimum for accessories in agricultural buildings (IP55 recommended for wet areas); SWA armoured cable or PVC in conduit for all fixed wiring; and periodic EICR inspection every 3 years for commercial agricultural premises. Horticultural glasshouses have additional requirements for high-humidity environments under Section 705.',
  },
  {
    question: 'Do RAF bases in Lincolnshire use civilian electrical contractors?',
    answer:
      'Yes, RAF Coningsby and RAF Waddington do use civilian electrical contractors for non-operational areas such as offices, accommodation blocks, welfare facilities, and non-secure perimeter infrastructure. Contractors must typically hold a security clearance (Baseline Personnel Security Standard — BPSS — as a minimum, with SC clearance for some areas), be approved under the MoD\'s contractor framework, and comply with Defence Standard 59-411 and other MoD electrical specifications. Some larger contracts are managed through the Defence Infrastructure Organisation (DIO). Domestic-scale electrical contractors are unlikely to access the active airfield or operational areas.',
  },
  {
    question: 'What are the electrical requirements for holiday parks at Skegness and along the Lincolnshire coast?',
    answer:
      'Holiday parks on the Lincolnshire coast must comply with BS 7671:2018 Section 708 for caravan and camping park installations. Each touring pitch must have: an individually RCD-protected (30mA) supply; an IP55 rated CEE form (BS EN 60309) socket rated at 16A or 32A; and a maximum 25m cable from the pitch socket to the caravan or motorhome. Static caravan connections (permanent) may use standard 13A sockets in weatherproof enclosures. The park\'s overall installation must have an EICR every 3 years. Annual testing of RCDs and inspection of sockets is also recommended given the harsh coastal environment.',
  },
  {
    question: 'What certifications are needed for a Lincolnshire rental property?',
    answer:
      'Private landlords in Lincolnshire must comply with the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. A valid EICR must be obtained every 5 years (or at each change of tenancy). The EICR must be issued by a qualified person. Any C1 or C2 defects must be remedied within 28 days. A copy of the EICR must be provided to the tenant before they move in. Lincolnshire local authorities — including City of Lincoln Council, North Lincolnshire Council, and South Kesteven District Council — enforce these requirements and can impose financial penalties of up to £30,000 for non-compliance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-norfolk',
    title: 'Electrician Norfolk',
    description: 'Find registered electricians across Norfolk.',
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
    description: 'Lincolnshire landlord EICR obligations explained.',
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
    heading: 'Areas Covered — Lincolnshire Electricians',
    content: (
      <>
        <p>
          Lincolnshire is one of England&apos;s largest counties by area. Electricians on
          Elec-Mate cover all major towns and rural areas including:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lincoln</strong> — county city, cathedral quarter, and surrounding
                villages including Sleaford, Gainsborough, and Market Rasen
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grimsby &amp; Cleethorpes</strong> — port town, fish processing
                industry, and the Humber Estuary energy corridor
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scunthorpe</strong> — steelworks town in North Lincolnshire,
                with extensive industrial electrical demand
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grantham &amp; Stamford</strong> — south Lincolnshire towns on
                the A1 corridor with significant new housing development
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Boston, Skegness, Spalding</strong> — agricultural heartland,
                coastal holiday parks, and Lincolnshire&apos;s bulb-growing area
              </span>
            </li>
          </ul>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/consumer-unit-replacement">consumer unit replacements</SEOInternalLink>{' '}
          or{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">landlord EICRs</SEOInternalLink>{' '}
          across Lincolnshire, Elec-Mate connects you with qualified local electricians.
        </p>
      </>
    ),
  },
  {
    id: 'dno-networks',
    heading: 'DNO Networks in Lincolnshire',
    content: (
      <>
        <p>
          National Grid Electricity Distribution (East Midlands) is the Distribution
          Network Operator for Lincolnshire. Supply connections and network faults are
          managed through National Grid ED.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>National Grid Electricity Distribution (East Midlands)</strong>
                — covers all of Lincolnshire. Power cuts emergency line: 0800 678 3105.
                New connections: nationalgrid.co.uk/electricity-connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coastal exposure</strong> — the Lincolnshire coast suffers from
                salt-spray corrosion which accelerates degradation of outdoor electrical
                equipment. IP56 minimum for all external electrical enclosures in coastal
                locations is recommended.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'steel-industry',
    heading: 'Steel Industry Electrical Work at Scunthorpe',
    content: (
      <>
        <p>
          British Steel&apos;s Scunthorpe works is one of Europe&apos;s largest integrated
          steelmaking facilities. The site operates blast furnaces, coke ovens, a hot strip
          mill, and plate mill — all of which require extensive high-voltage and low-voltage
          electrical infrastructure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV substation maintenance</strong> — 132kV, 33kV, and 11kV
                switchgear servicing, protection relay testing and calibration, and
                power transformer maintenance require IET or relevant HV qualified
                Authorised Person status.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor drives and control gear</strong> — rolling mill drives,
                fan motors, and pump sets require LV panel maintenance, drive fault finding,
                and motor control centre (MCC) servicing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ATEX hazardous areas</strong> — coke oven gas, blast furnace
                gas, and dust zones require ATEX/Ex certified equipment and qualified
                installation in accordance with BS EN 60079.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Industrial Project Certificates with Elec-Mate"
          description="Generate Electrical Installation Certificates and test schedules for industrial and commercial projects. Manage certificates across your whole team."
          ctaText="Try Elec-Mate free"
        />
      </>
    ),
  },
  {
    id: 'agricultural',
    heading: 'Agricultural & Horticultural Electrical Work',
    content: (
      <>
        <p>
          Lincolnshire is England&apos;s most productive arable county, with grain, vegetables,
          and flowers grown at scale across the county. The agricultural and food processing
          sector creates significant specialist electrical demand.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 705 — agricultural premises</strong> — mandates IP44
                minimum for accessories in agricultural areas, equipotential bonding
                in livestock zones, and SWA or conduit-protected cables throughout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grain drying and cold stores</strong> — three-phase 400V supplies
                for dryer motors (typically 11kW to 45kW), star-delta starters or VFDs,
                and cold store compressor sets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glasshouse and polytunnel electrical</strong> — high-humidity
                environments require IP65 rated wiring systems and accessories. Horticultural
                lighting installations must comply with BS 7671 Chapter 52 and the specific
                zone requirements of Section 705.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'raf-bases',
    heading: 'RAF Base Electrical Work — Coningsby & Waddington',
    content: (
      <>
        <p>
          RAF Coningsby (home of the Typhoon force and the Battle of Britain Memorial Flight)
          and RAF Waddington (home of ISR aircraft) are two of Lincolnshire&apos;s most
          significant employers. Civilian electrical contractors work on non-operational
          infrastructure at both bases.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Security clearance</strong> — all civilian contractors at RAF stations
                require a minimum BPSS (Baseline Personnel Security Standard) check, with SC
                (Security Check) clearance required for some areas. Allow 4 to 8 weeks for
                clearance processing before work can commence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MoD specifications</strong> — electrical installations at MoD sites
                must comply with Defence Standard 59-411 (Electromagnetic Compatibility) and
                Defence Infrastructure Organisation technical guidance, in addition to BS 7671.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'coastal-parks',
    heading: 'Coastal Holiday Park Electrical Compliance',
    content: (
      <>
        <p>
          The Lincolnshire coast hosts hundreds of holiday parks from Cleethorpes to
          Chapel St Leonards. These require specialist electrical services including
          BS 7671 Section 708 pitch supply installations, caravan electrical connections,
          and regular EICR inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Section 708</strong> — each touring pitch must have an
                individually protected 16A or 32A IP55 socket (CEE blue form). All pitch
                supplies must be 30mA RCD protected. Maximum 25m cable run to each pitch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coastal corrosion</strong> — stainless steel or hot-dip galvanised
                fittings are recommended for external electrical enclosures on the
                Lincolnshire coast, where salt-laden air significantly accelerates
                corrosion of standard galvanised steel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR frequency</strong> — holiday parks should have an EICR every
                3 years. The site licence conditions from the local authority may require
                more frequent inspection for older installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">EICR observation codes</SEOInternalLink>{' '}
          and what they mean for your holiday park, see our detailed guide.
        </p>
      </>
    ),
  },
];

export default function ElectricianLincolnshirePage() {
  return (
    <GuideTemplate
      title="Electrician Lincolnshire — Find Registered Electricians Near You"
      description="Find NICEIC, ELECSA, and NAPIT-registered electricians across Lincolnshire including Lincoln, Grimsby, Scunthorpe, Grantham, Boston, Skegness, and Spalding. Part P compliant, fully insured."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Lincolnshire{' '}
          <span className="text-yellow-400">— Find Registered Electricians</span>
        </>
      }
      heroSubtitle="Registered electricians across Lincolnshire covering Lincoln, Grimsby, Scunthorpe, Grantham, Boston, Skegness, Spalding, and rural agricultural properties. All work certified to BS 7671."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Lincolnshire Electrician — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Find a Lincolnshire Electrician Today"
      ctaSubheading="Browse NICEIC and ELECSA-registered electricians across Lincolnshire. All work covered by Part P certification and public liability insurance."
    />
  );
}
