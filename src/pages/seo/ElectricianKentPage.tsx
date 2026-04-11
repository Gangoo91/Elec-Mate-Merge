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
  { label: 'Find an Electrician', href: '/guides/electrician-kent' },
  { label: 'Kent', href: '/electrician-kent' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Kent' },
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Kent' },
  { id: 'property-types', label: 'Property Types and Period Stock' },
  { id: 'port-infrastructure', label: 'Port and Commercial Infrastructure' },
  { id: 'dno', label: 'UK Power Networks in Kent' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Kent is served by UK Power Networks (UKPN) for electricity distribution. All new connections, supply upgrades, solar PV notifications, and EV charger registrations go through UKPN.',
  'Kent has an exceptionally large stock of period properties — from medieval buildings in Canterbury to Victorian and Edwardian terraces across Maidstone, Folkestone, and Margate. Full rewires and EICRs are consistently in high demand.',
  "Dover's port infrastructure, Eurotunnel operations at Folkestone, and the Port of Sheerness create specialist commercial and industrial electrical work including high-current supplies, marine-adjacent corrosion considerations, and critical infrastructure requirements.",
  'Ashford is a significant growth area with major distribution and logistics parks along the M20 corridor, driving strong commercial electrical demand for warehouse fit-outs and EV fleet charging infrastructure.',
  'Canterbury has one of the highest concentrations of listed buildings in the UK, making it essential that electricians working in the city centre understand Listed Building Consent requirements and sympathetic wiring approaches.',
  'The Medway towns (Rochester, Chatham, Gillingham, Strood) have a large stock of Victorian and Edwardian terraces with aging wiring, creating substantial EICR and rewire demand for contractors in the area.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Kent?',
    answer:
      'Kent electrician rates vary across the county, reflecting the mix of commuter areas close to London and more rural and coastal areas. Typical day rates range from £290 to £400 per day, with hourly rates of £42 to £58. Common job prices: EICR (3-bed house) £160 to £280; consumer unit upgrade £480 to £750; full rewire of a 3-bed Victorian terrace £3,800 to £6,500; EV charger installation £800 to £1,250; additional socket £110 to £175. North Kent commuter areas (Tonbridge, Sevenoaks, Tunbridge Wells) command rates closer to the South East premium, while coastal towns (Folkestone, Margate, Whitstable) typically sit at the lower end of the range.',
  },
  {
    question: 'Who is the DNO for Kent?',
    answer:
      'Kent is served by UK Power Networks (UKPN), which operates the distribution network across South East England, East of England, and London. Apply for new connections and supply upgrades at ukpowernetworks.co.uk. For power cuts, call 105. When completing an EIC or EICR anywhere in Kent, record UKPN as the DNO. The majority of Kent properties are connected via TN-C-S (PME) earthing arrangements, though rural properties — particularly on the Weald and Romney Marsh — may be TT earthed via a local earth rod.',
  },
  {
    question: "What are the electrical challenges of working on Canterbury's historic buildings?",
    answer:
      'Canterbury has a higher proportion of listed buildings than almost any other UK city. The historic core is a UNESCO World Heritage Site. Electricians working in listed buildings in Canterbury must be aware that any works affecting the character of the building — including new cable routes in original plasterwork, new accessory positions, and external installations — require Listed Building Consent from Canterbury City Council in addition to the standard Part P notification. Works in the World Heritage Site buffer zone may also require additional archaeological consideration. Surface-mounted wiring in steel conduit or period-appropriate trunking is usually the only acceptable approach in the most sensitive buildings.',
  },
  {
    question: 'What electrical work is required for Dover port and logistics operations?',
    answer:
      "Dover's port infrastructure and the surrounding logistics and cross-channel operations create specialist electrical requirements. Port-adjacent facilities require corrosion-resistant electrical equipment (minimum IP54 enclosures, marine-grade stainless steel fixings) due to salt air exposure. Large vehicle charging infrastructure for HGV and PSV fleets requires high-current three-phase supplies, load management systems, and G99 DNO applications for significant export or import capacity. Contractors working in port areas also need to understand critical infrastructure resilience requirements including standby generation, UPS systems, and emergency power provisions.",
  },
  {
    question: 'Do electricians in Kent need any special qualifications for coastal properties?',
    answer:
      'There is no specific qualification for coastal electrical work in Kent, but practical experience matters. Properties within 500 metres of the sea — particularly along the Thanet coast, Folkestone, Hythe, and Whitstable — are exposed to salt air that accelerates corrosion of standard electrical fittings, exposed metalwork, and external enclosures. Best practice includes: using marine-grade stainless steel fixings for external installations; specifying external accessories with a minimum IP44 rating (IP65 within 1 metre of the sea); checking earth continuity of all metalwork more frequently (corrosion can compromise CPCs in exposed locations); and avoiding uncoated mild steel back boxes on external or seafront walls.',
  },
  {
    question: 'Is there strong demand for solar PV and EV charging in Kent?',
    answer:
      "Yes. Kent has significant solar PV potential given its position as one of the UK's sunniest counties, and adoption rates for solar PV and battery storage are growing strongly. The MCS-certified market requires electricians to hold or work under an MCS accreditation. For EV charging, the M20, M2, and A2 corridors through Kent are high-priority areas for both residential and commercial charge point installations. Ashford International's logistics zone and the Medway commercial areas are active markets for fleet charging infrastructure. OZEV-approved installer status is required to access LEVI (Large Electric Vehicle Infrastructure) grant funding for commercial sites.",
  },
  {
    question:
      'Are there areas of Kent with conservation area restrictions affecting electrical work?',
    answer:
      'Yes, extensively. Kent has over 600 conservation areas covering historic town centres, villages, and landscapes. Key areas where electricians encounter planning constraints include: Canterbury historic core (World Heritage Site); Tunbridge Wells Calverley Park and historic town centre; Faversham historic market town; Sandwich (one of the best-preserved medieval towns in England); and dozens of rural villages on the Kent Downs Area of Outstanding Natural Beauty. In conservation areas, overhead cable routes, visible external electrical equipment, and some internal works affecting original fabric may require planning permission. Always advise clients to check with the relevant district council before committing to a design.',
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
    description:
      'Find qualified electricians across St Albans, Watford, Stevenage, and Hemel Hempstead.',
    icon: MapPin,
    category: 'Location',
  },
  {
    href: '/electrician-essex',
    title: 'Electricians in Essex',
    description: 'Find qualified electricians in Chelmsford, Colchester, Southend, and Harlow.',
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
    href: '/solar-pv-system-sizing',
    title: 'Solar PV System Sizing',
    description: 'How to size a solar PV system for UK homes — kWp, orientation, MCS standards.',
    icon: Zap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Electricians in Kent',
    content: (
      <>
        <p>
          Kent — the Garden County of England — is home to 1.9 million people spread across a
          diverse mix of historic market towns, coastal resorts, commuter settlements, and rural
          countryside. From the World Heritage Site of Canterbury to the port infrastructure of
          Dover, the county presents a wide range of electrical work from heritage conservation to
          large-scale commercial and industrial installations.
        </p>
        <p>
          The county's large stock of Victorian and Edwardian properties — in Maidstone, Folkestone,
          Margate, and the Medway towns — creates consistent demand for EICRs, full rewires, and
          consumer unit upgrades. At the same time, Ashford's rapid growth as a distribution and
          logistics hub, Canterbury's heritage sector, and the expanding Medway commercial and
          retail park network create strong commercial electrical opportunities.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always check NICEIC, NAPIT, or ELECSA registration</strong> before booking.
                Verify the registration number on the scheme website.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK Power Networks (UKPN)</strong> is the DNO for all of Kent. All connection
                applications, solar PV notifications (G98/G99), and supply upgrades go through UKPN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elec-Mate</strong> allows Kent electricians to issue EICR reports and EIC
                certificates on site, reducing paperwork and speeding up completion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'areas-covered',
    heading: 'Areas Covered Across Kent',
    content: (
      <>
        <p>
          Kent is one of the largest counties in England, with a wide variety of urban, suburban,
          and rural areas. The main centres for electrical work include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maidstone</strong> — county town with a mix of Victorian terraces, 1930s
                semis, and modern estates. High volume of EICR and rewire work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Canterbury</strong> — historic cathedral city, UNESCO World Heritage Site.
                Strong demand for sympathetic rewiring in listed buildings and conservation areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tunbridge Wells</strong> — affluent commuter town with high-value period
                properties and strong demand for smart home, EV, and solar installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Folkestone and Dover</strong> — port towns with specialist commercial and
                marine-adjacent electrical requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ashford</strong> — fast-growing hub on the M20 with substantial logistics,
                distribution, and commercial development. Strong contractor demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medway (Rochester, Chatham, Gillingham)</strong> — large conurbation with
                significant Victorian housing stock and a growing commercial sector.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications in Kent",
    content: (
      <>
        <p>
          Part P of the Building Regulations requires that notifiable domestic electrical work is
          either carried out by a competent person registered with an approved scheme, or inspected
          and certified by building control. Competent person scheme registration is the most common
          approach, and registration is easy to verify online.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">What to Ask For</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                NICEIC, NAPIT, ELECSA, or STROMA competent person scheme registration number —
                verify online
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>ECS card confirming current qualifications (valid for 5 years)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Public liability insurance — minimum £2 million, £5 million for listed building work
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                For listed building or conservation area work, ask for specific heritage experience
                and references
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Kent',
    content: (
      <>
        <p>
          Electrician costs in Kent vary significantly by location. North Kent commuter areas
          (Tonbridge, Sevenoaks, Tunbridge Wells, Swanley) attract rates comparable to the South
          East premium. Coastal and more rural areas (Thanet, Romney Marsh, the Weald) tend to be
          10% to 20% lower.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typical Job Costs (2025)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (3-bed house):</strong> £160 to £270
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade:</strong> £480 to £740
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed Victorian terrace):</strong> £3,800 to £6,500
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation:</strong> £800 to £1,250
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV electrical connection:</strong> £550 to £950
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Period Property Stock and Electrical Challenges',
    content: (
      <>
        <p>
          Kent's housing stock includes some of the oldest residential buildings in England. For
          electricians, this creates a consistent market for sympathetic rewiring, heritage
          compliance, and EICR inspections of aging installations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medieval and Tudor buildings (Canterbury, Sandwich, Faversham):</strong>{' '}
                Timber-frame construction with wattle-and-daub or brick infill panels. Original
                structural elements must not be notched or drilled without specialist assessment.
                All wiring in these properties requires surface-mounting in trunking or conduit.
                Listed Building Consent required for most electrical alterations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces (Maidstone, Medway, Folkestone):</strong>{' '}
                Lath-and-plaster walls, suspended timber floors, lead or early rubber-insulated
                conductors. EICRs on this stock typically identify C2 observations around the
                absence of RCD protection and degraded insulation. Full rewires are common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Oast houses and rural conversions:</strong> Kent's distinctive oast houses
                and rural barn conversions often involve complex cable routing, damp or agricultural
                environments, and non-standard building layouts. IP-rated accessories and moisture
                management are important considerations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink
            href="/guides/eicr-observation-codes-explained"
            label="EICR observation codes guide"
          />{' '}
          for guidance on how findings in Kent's period properties are typically graded.
        </p>
      </>
    ),
  },
  {
    id: 'port-infrastructure',
    heading: 'Port Infrastructure and Commercial Electrical Work in Kent',
    content: (
      <>
        <p>
          The Port of Dover is the UK's busiest passenger and freight port, handling over 10 million
          passengers and 2.5 million lorries annually. The port's electrical infrastructure —
          combined with the Channel Tunnel terminal at Folkestone and the Port of Sheerness on the
          Isle of Sheppey — creates a specialist commercial electrical sector unlike any other
          county in England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Marine-adjacent environments:</strong> Port-area electrical work requires
                IP54 minimum enclosures, marine-grade fixings, and enhanced corrosion protection.
                Salt spray and high humidity significantly accelerate the degradation of standard
                accessories.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Critical infrastructure resilience:</strong> Standby generator systems, UPS
                provision, and automatic transfer switches are standard requirements for port
                operations, cross-channel communication systems, and customs and border control
                facilities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HGV and fleet charging:</strong> The Ashford lorry park, Dover Eastern
                Docks, and M20 lorry parks are priority sites for large-scale HGV charging
                infrastructure — a fast-growing market requiring three-phase supplies and load
                management systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'UK Power Networks in Kent',
    content: (
      <>
        <p>
          All of Kent is served by UK Power Networks (UKPN). Understanding UKPN's processes is
          essential for electricians working on connection applications, solar PV notifications, and
          supply capacity upgrades across the county.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 notifications:</strong> Solar PV and battery systems up to 3.68kW
                single-phase can be notified to UKPN after installation. Use the UKPN online portal
                within 28 days of commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 applications:</strong> Systems above 3.68kW per phase require prior UKPN
                approval. Allow 45 working days for a G99 assessment on a standard residential
                application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rural earthing:</strong> TT earthing is common in rural Kent — Romney Marsh,
                the Weald, and North Downs villages. Always verify the earthing arrangement under BS
                7671 Regulation 542 before carrying out earthing work or connecting renewable energy
                systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to generate EICR and
          EIC certificates on site, recording the DNO as UK Power Networks for all Kent addresses.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianKentPage() {
  return (
    <GuideTemplate
      title="Electrician Kent — Find Qualified Electricians in Maidstone, Canterbury, Tunbridge Wells, Dover"
      description="Find NICEIC and NAPIT registered electricians across Kent, covering Maidstone, Canterbury, Tunbridge Wells, Folkestone, Dover, Ashford, and the Medway towns. EICR, rewires, EV charging, and commercial electrical work."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Kent <span className="text-yellow-400">— Qualified & Registered</span>
        </>
      }
      heroSubtitle="Find NICEIC and NAPIT registered electricians across Maidstone, Canterbury, Tunbridge Wells, Folkestone, Dover, Ashford, and the Medway towns. EICRs, rewires, EV charging, solar PV, and port infrastructure electrical work throughout Kent."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrician Kent — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Electricians in Kent — manage your certificates with Elec-Mate"
      ctaSubheading="Issue EICRs, EICs, and Minor Works Certificates on site. Start your free 7-day trial."
    />
  );
}
