import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  Building2,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-essex' },
  { label: 'Essex', href: '/electrician-essex' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Essex' },
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Essex' },
  { id: 'property-types', label: 'Property Types and New Town Legacy' },
  { id: 'coastal-data', label: 'Coastal Properties and Data Centres' },
  { id: 'dno', label: 'UK Power Networks in Essex' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Essex is served by UK Power Networks (UKPN) for electricity distribution. All new connections, supply capacity upgrades, solar PV notifications, and EV charger registrations go through UKPN.',
  'The new towns of Harlow and Basildon (built from the late 1940s) contain large amounts of post-war housing stock now requiring full electrical upgrades, including consumer unit replacements and earthing improvements.',
  'Southend-on-Sea and the Thames Estuary coastline present corrosion considerations for external electrical installations — marine-grade fixings and higher IP-rated enclosures are recommended within 500 metres of the sea.',
  'The Stansted Airport corridor and M11 technology corridor between Bishop\'s Stortford and Braintree is one of the fastest-growing data centre and logistics clusters in the UK, creating specialist high-current and three-phase commercial electrical demand.',
  'Colchester, as one of Britain\'s oldest recorded towns, has a significant concentration of listed buildings and conservation areas that affect how electrical work can be carried out in the historic core.',
  'Part P notifiable electrical work in Essex is administered through each district, borough, and city council. Competent person scheme registrants can self-certify, avoiding the need for building control applications.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Essex?',
    answer:
      "Essex electrician costs vary by location. South Essex (Brentwood, Billericay, Chelmsford) commands South East premium rates, while coastal and north Essex towns are typically more affordable. Typical day rates: £300 to £420 per day. Common job prices: EICR (3-bed house) £165 to £285; consumer unit upgrade £490 to £760; full rewire (3-bed semi) £3,900 to £6,600; EV charger installation £800 to £1,250; additional socket £110 to £175; solar PV electrical connection £550 to £950. The M25 corridor and commuter towns closest to London — Brentwood, Epping, Loughton — sit at the higher end of the range.",
  },
  {
    question: 'Who is the DNO for Essex?',
    answer:
      "Essex is served by UK Power Networks (UKPN), which operates the distribution network across South East England, East of England, and London. Apply for new connections and supply upgrades at ukpowernetworks.co.uk. For power cuts, call 105. When recording DNO details on an EIC or EICR in Essex, record UKPN. Most urban Essex properties use TN-C-S (PME) earthing. Rural Essex — particularly the Tendring peninsula, Mersea Island, and rural areas near the Suffolk and Cambridgeshire borders — may be TT earthed. Always verify the earthing arrangement before carrying out earthing work or connecting renewable energy equipment.",
  },
  {
    question: 'What are the electrical upgrade needs in Harlow and Basildon new town housing?',
    answer:
      "Harlow and Basildon were designated new towns in 1947 and 1949 respectively. The first-generation housing built through the 1950s and 1960s is now approaching 70 years old and the original wiring has exceeded its expected service life in many properties. Common issues found on EICRs in this housing stock include: rubber-insulated conductors with degraded insulation (C1 or C2 finding requiring immediate action); absence of RCD protection on circuits; fuse boards using rewirable fuses rather than MCBs; and earthing arrangements that predate the current PME standards. Many of these properties also have aluminium wiring in older distribution boards — a specific EICR observation requiring careful assessment under BS 7671.",
  },
  {
    question: 'Are there specialist electrical requirements for data centres in the Stansted corridor?',
    answer:
      "The M11 corridor between Stansted Airport and London is one of the UK's highest concentrations of hyperscale and colocation data centres. Electricians working in this sector need familiarity with: high-current three-phase busbars and ring main units; UPS systems (static and rotary) and battery backup; generator interconnection including paralleling switchgear and ATS; precision cooling and CRAC unit electrical connections; hot aisle containment electrical modifications; and DCIM (Data Centre Infrastructure Management) system wiring. This is highly specialist work — general domestic electricians should not attempt data centre fit-out without the appropriate commercial and industrial experience.",
  },
  {
    question: 'What coastal considerations apply to electrical work in Southend-on-Sea?',
    answer:
      "Southend-on-Sea and the wider Thames Estuary coastline present salt-air corrosion challenges for external electrical installations. Recommended practices for properties within 500 metres of the estuary include: marine-grade stainless steel (316 grade) fixings for external accessories; external enclosures rated to IP54 minimum, IP65 for seafront installations; increased inspection frequency for earth continuity of metalwork — salt can penetrate behind cable containment and compromise CPCs; plastic or powder-coated steel back boxes rather than bare mild steel for external sockets and switches; and anti-corrosion treatment applied to exposed conduit threads and metal trunking joints in high-humidity locations.",
  },
  {
    question: 'Do I need to notify UKPN when installing solar PV in Essex?',
    answer:
      "Yes. All solar PV and battery storage systems in Essex must be notified to UKPN. Systems up to 3.68kW single-phase (16A per phase) can be notified under the G98 simplified notification procedure within 28 days of commissioning — no prior approval needed. Systems larger than 3.68kW single-phase or 11.04kW three-phase require a G99 application and prior written approval from UKPN before installation. The assessment period for a G99 application on a standard residential system is typically 45 working days, though complex sites may take longer. Always factor G99 lead times into project planning for larger solar installations.",
  },
  {
    question: 'Are there areas of Essex with listed building or conservation area restrictions?',
    answer:
      "Yes. Colchester (Britain's oldest recorded town, with Roman walls and a Norman castle) has extensive conservation areas and listed buildings in the town centre. Saffron Walden, Thaxted, Dedham, and many Essex villages also have conservation area status. In these areas, planning permission may be required for visible external electrical equipment, and Listed Building Consent is needed for works that affect the character of a listed building. The Tendring Hundred and south Essex also have a number of listed farm buildings and historic farmhouses where care is needed when routing cables and fitting accessories. Always advise clients to check with their local planning authority before committing to a design.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations, 5-year inspection cycle, and compliance requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrician-hertfordshire',
    title: 'Electricians in Hertfordshire',
    description: 'Find qualified electricians across St Albans, Watford, Stevenage, and Hemel Hempstead.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/electrician-kent',
    title: 'Electricians in Kent',
    description: 'Find qualified electricians in Maidstone, Canterbury, Dover, and Ashford.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/electrical-load-calculation',
    title: 'Electrical Load Calculation',
    description: 'How to calculate electrical load for domestic and commercial premises.',
    icon: Zap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Electricians in Essex',
    content: (
      <>
        <p>
          Essex is home to 1.9 million people and covers a remarkable variety of
          environments — from London commuter suburbs in the south-west to post-war new
          towns in the centre, historic market towns in the north, and coastal resorts and
          estuary settlements to the east and south. This diversity creates a broad and
          consistent market for electrical contractors across the county.
        </p>
        <p>
          The county's most distinctive electrical market drivers include the aging new town
          housing stock in Harlow and Basildon — now overdue for full electrical upgrades —
          the rapidly expanding data centre and logistics sector along the Stansted and M11
          corridor, and the coastal properties on the Thames Estuary and North Sea coast where
          corrosion considerations affect installation specifications.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify competent person scheme registration</strong> (NICEIC, NAPIT,
                ELECSA) before booking — check the registration number online.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK Power Networks (UKPN)</strong> serves all of Essex — all solar
                PV notifications (G98/G99) and new connection applications go through UKPN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elec-Mate</strong> enables Essex electricians to issue and manage
                EICR reports, EIC certificates, and customer records entirely from a mobile device.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'areas-covered',
    heading: 'Areas Covered Across Essex',
    content: (
      <>
        <p>
          Essex covers twelve district councils plus the three unitary authorities of Southend-on-Sea,
          Thurrock, and (from 2025) Basildon. Key areas for electrical contractors include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chelmsford</strong> — county city with a large, affluent residential
                market and growing commercial sector. High demand for smart home, EV, and
                solar installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Colchester</strong> — historic garrison town and university city.
                Large Victorian and Edwardian residential stock with consistent EICR and
                rewire demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Southend-on-Sea</strong> — large coastal conurbation with
                substantial rental and HMO market driving landlord EICR compliance demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basildon</strong> — post-war new town with large estates of 1950s
                and 1960s housing requiring electrical modernisation. Growing commercial sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Brentwood</strong> — affluent commuter town close to the M25 with
                premium residential market and strong demand for smart home and EV installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Harlow</strong> — post-war new town on the M11 corridor. Large legacy
                housing stock and growing data centre and logistics commercial sector.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'How to Verify an Electrician\'s Qualifications in Essex',
    content: (
      <>
        <p>
          Part P of the Building Regulations requires notifiable domestic electrical work
          in Essex to be either self-certified by a competent person scheme registrant, or
          inspected by building control. Using a registered electrician is the most efficient
          route for homeowners and landlords.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">What to Check Before Booking</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>NICEIC, NAPIT, ELECSA, or STROMA registration — verify the number on the scheme website</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Current ECS card confirming NVQ Level 3 or equivalent qualification</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Public liability insurance certificate — minimum £2 million cover</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>For commercial data centre or specialist work, ask for specific references from similar projects</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Essex',
    content: (
      <>
        <p>
          Essex electrical contractor rates broadly follow a south-to-north gradient,
          with south-west Essex (close to the M25 and M11) commanding the highest rates
          due to competition from London-based employers, and the coastal and northern
          districts sitting closer to East Anglian rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typical Job Costs (2025)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>EICR (3-bed house):</strong> £165 to £285</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Consumer unit upgrade:</strong> £490 to £760</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Full rewire (3-bed semi):</strong> £3,900 to £6,600</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>EV charger installation:</strong> £800 to £1,250</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Solar PV electrical connection:</strong> £550 to £950</span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain at least three written quotes for larger projects, and ensure each
          quote clearly itemises labour, materials, certification, and any building control
          or UKPN notification fees.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'New Town Legacy and Period Property Electrical Challenges',
    content: (
      <>
        <p>
          Essex housing presents two distinct electrical challenge profiles: the post-war
          new town stock in Harlow, Basildon, and South Woodham Ferrers, which is now
          overdue for full modernisation; and the historic town centre properties in
          Colchester, Saffron Walden, and Thaxted, which require sympathetic approaches
          to comply with planning and listed building obligations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1950s and 1960s new town housing:</strong> Rubber and early PVC
                insulated wiring now at or beyond its service life. Common EICR findings:
                C2 for degraded insulation; C2 for absence of RCD protection; C3 for
                inadequate earthing or bonding. Full rewires are routinely recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (Colchester, Southend, Chelmsford):</strong>{' '}
                Lath-and-plaster walls and suspended timber floors. Cable routing requires
                care to avoid damaging plaster. Older meter tails and service heads often
                require replacement as part of consumer unit upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern estates (Chelmsford, Brentwood, Billericay):</strong>{' '}
                Generally well-wired but increasingly in demand for RCBO consumer unit
                upgrades, EV charger circuits, solar PV connections, and smart home wiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes guide" />{' '}
          to understand how findings in Essex's housing stock are typically graded and
          what remedial action each classification requires.
        </p>
      </>
    ),
  },
  {
    id: 'coastal-data',
    heading: 'Coastal Properties and Data Centre Growth in Essex',
    content: (
      <>
        <p>
          Two of Essex's most distinctive electrical market sectors are the coastal residential
          and commercial properties along the Thames Estuary and North Sea coastline, and the
          rapidly expanding data centre cluster along the M11 and Stansted corridors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Coastal corrosion protection:</strong> Properties on Mersea Island,
                Canvey Island, the Tendring Coast, and Southend seafront require marine-grade
                fixings and higher IP ratings for external electrical installations. Regular
                inspection of earth continuity is important where metalwork is exposed to
                salt air.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Data centres (Stansted/M11 corridor):</strong> This area has become
                one of Europe's fastest-growing data centre hubs. Specialist electrical work
                includes high-current busbars, UPS and generator interconnection, precision
                cooling supplies, and DCIM wiring. Three-phase 11kV and 33kV substation work
                is common for hyperscale sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Logistics and distribution (M11, A12, A120 corridors):</strong>{' '}
                New-build distribution warehouses across north and central Essex require
                large-scale electrical fit-outs, LED lighting installations, three-phase
                power, and increasingly large EV fleet charging infrastructure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'UK Power Networks in Essex',
    content: (
      <>
        <p>
          UK Power Networks (UKPN) operates the electricity distribution network across
          all of Essex. Electricians in Essex need to be familiar with UKPN's requirements
          for both domestic and commercial connection and notification processes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 (small-scale solar/battery):</strong> Systems up to 3.68kW
                single-phase notified to UKPN within 28 days of commissioning. No prior
                approval required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 (larger systems):</strong> Prior UKPN approval required.
                Typical assessment period 45 working days. Essential to apply early,
                particularly for larger commercial sites near the data centre corridor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing in rural Essex:</strong> Verify the earthing arrangement
                under BS 7671 Regulation 542 for all rural and coastal Essex properties
                before carrying out earthing work. TT is common in areas not served by
                UKPN's PME network.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to record
          UKPN as the DNO on all EIC and EICR certificates for Essex addresses, and to
          issue certificates digitally from the job site.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianEssexPage() {
  return (
    <GuideTemplate
      title="Electrician Essex — Find Qualified Electricians in Chelmsford, Colchester, Southend, Harlow"
      description="Find NICEIC and NAPIT registered electricians across Essex, covering Chelmsford, Colchester, Southend-on-Sea, Basildon, Brentwood, and Harlow. EICR, rewires, EV charging, and commercial electrical work."
      datePublished="2025-01-01"
      dateModified="2025-03-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Essex{' '}
          <span className="text-yellow-400">— Qualified & Registered</span>
        </>
      }
      heroSubtitle="Find NICEIC and NAPIT registered electricians across Chelmsford, Colchester, Southend-on-Sea, Basildon, Brentwood, and Harlow. EICRs, rewires, EV charging, solar PV, and commercial electrical work throughout Essex."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrician Essex — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Electricians in Essex — manage your certificates with Elec-Mate"
      ctaSubheading="Issue EICRs, EICs, and Minor Works Certificates on site. Start your free 7-day trial."
    />
  );
}
