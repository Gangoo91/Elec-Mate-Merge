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
  { label: 'Find an Electrician', href: '/guides/electrician-hertfordshire' },
  { label: 'Hertfordshire', href: '/electrician-hertfordshire' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Hertfordshire' },
  { id: 'areas-covered', label: 'Areas Covered' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Hertfordshire' },
  { id: 'property-types', label: 'Property Types and Challenges' },
  { id: 'dno', label: 'UK Power Networks' },
  { id: 'for-electricians', label: 'For Electricians Working in Hertfordshire' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Hertfordshire is served by UK Power Networks (UKPN) for electricity distribution. All new connections, supply upgrades, EV charger notifications, and G98/G99 solar submissions go through UKPN.',
  'St Albans has a significant stock of large Victorian and Edwardian properties — many with original or mid-20th-century wiring — creating strong demand for EICRs, rewires, and consumer unit upgrades across the city.',
  'The Stevenage and Welwyn Garden City new towns (built from the late 1940s) contain large quantities of post-war housing stock now due for full electrical upgrades, including TT to TN-C-S earthing conversions.',
  'The biotech and pharmaceutical corridor around Stevenage — anchored by GSK and Roche — drives demand for specialist commercial and industrial electrical contractors familiar with laboratory, cleanroom, and research facility requirements.',
  'Commuter belt premiums across Hertfordshire mean homeowners invest heavily in smart home systems, EV charging, and high-end kitchen and extension electrical work. Electricians with smart home and renewables expertise command premium rates.',
  "Part P notifiable electrical work in Hertfordshire is administered through each district council. Competent person scheme registrants (NICEIC, NAPIT, ELECSA) can self-certify and notify on the homeowner's behalf.",
];

const faqs = [
  {
    question: 'How much does an electrician cost in Hertfordshire?',
    answer:
      'Hertfordshire electrician day rates typically range from £330 to £440 per day, with hourly rates of £48 to £65. Common job prices: full rewire of a 3-bed semi £4,200 to £6,800; consumer unit upgrade £520 to £780; EICR for a 3-bed house £180 to £290; EV charger installation £850 to £1,300; additional socket £120 to £180. Prices reflect the South East premium and are 15% to 25% above the national average. Smart home and AV integration work in the commuter belt commands a further premium — expect £600 to £900 per day for specialist smart home electricians.',
  },
  {
    question: 'Who is the DNO for Hertfordshire?',
    answer:
      'Hertfordshire is served by UK Power Networks (UKPN), which operates the distribution network across South East England, East of England, and London. For new connections, supply upgrades, or meter relocations, apply via ukpowernetworks.co.uk. For power cuts, call 105. When completing an EIC or EICR in Hertfordshire, record UKPN as the DNO. The earthing arrangement in most Hertfordshire properties is TN-C-S (PME), though some rural properties and older properties — particularly in the new towns — may be TT earthed.',
  },
  {
    question: 'What electrical work is most common in St Albans?',
    answer:
      'St Albans has one of the largest concentrations of Victorian and Edwardian housing stock in the Home Counties. Common electrical work includes: EICR inspections on properties being sold or let (the Renters Reform Bill has increased landlord demand significantly); full rewires of properties with rubber-insulated or early PVC wiring from the 1950s and 1960s; consumer unit upgrades from older rewirable fuse boards to modern RCBO-protected boards; and earthing upgrades where properties have inadequate earth continuity. Large Victorian semis and detached properties in St Albans can require 10 to 14 days for a full rewire.',
  },
  {
    question:
      'What are the electrical requirements for the new town housing stock in Stevenage and Welwyn Garden City?',
    answer:
      "The first-generation new town housing in Stevenage (built from 1947) and Welwyn Garden City features wiring from the 1950s and 1960s that is now approaching or exceeding its expected service life. Common issues identified on EICRs include: absence of RCD protection on circuits; rubber-insulated cables with degraded insulation; inadequate earthing arrangements (some properties have TT earthing via a local earth rod rather than UKPN's PME network); and fuse boards without adequate fault current protection. Full rewires are increasingly common in this stock, and electricians working in these areas should be familiar with earthing verification procedures under BS 7671 Regulation 542.",
  },
  {
    question:
      'What electrical work is needed for biotech and pharmaceutical facilities in Stevenage?',
    answer:
      'The Stevenage biotech cluster around the GSK Medicines Research Centre and Stevenage BioScience Catalyst requires electricians with commercial and specialist experience. Typical work includes: standby generator and UPS installation for laboratory continuity; cleanroom electrical fit-out with specialist containment and sealed accessories; high-integrity earthing for sensitive analytical equipment; containment systems meeting IP requirements for laboratory environments; and emergency lighting under BS 5266. Domestic-only electricians should not take on this work — look for contractors with experience in pharmaceutical or laboratory environments, and verify ECS gold card or appropriate NVQ Level 3 in electrotechnical services.',
  },
  {
    question: 'Do I need planning permission for an EV charger in Hertfordshire?',
    answer:
      'In most cases, domestic EV charger installation in Hertfordshire falls under permitted development and does not require planning permission, provided the charge point is no larger than 0.2 cubic metres and there are no restrictions on the property (such as listed building status or a condition removing permitted development rights). The charger must be notified to UKPN under G98 if it has vehicle-to-grid (V2G) capability. The electrician must also notify the local authority under Part P by self-certifying through a competent person scheme or by applying to building control. For commercial premises, planning consent may be required — check with your local district council.',
  },
  {
    question:
      'Are there any areas of Hertfordshire with conservation area restrictions on electrical work?',
    answer:
      'Yes. Several areas in Hertfordshire have conservation area status or listed buildings that affect electrical work. The historic core of St Albans (including around the Cathedral), parts of Hertford, Hatfield House and its parkland, and many village centres across the county have conservation area status. In conservation areas, external electrical equipment (such as EV charger mounting posts, cable routes on facades, and external lighting) may require planning permission in addition to the standard Part P notification. Listed buildings require Listed Building Consent for any works that affect the character of the building, including new cable routes in original plasterwork.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Landlord EICR obligations — mandatory 5-year inspection cycle and tenant requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrician-kent',
    title: 'Electricians in Kent',
    description:
      'Find qualified electricians in Maidstone, Canterbury, Tunbridge Wells, and Dover.',
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
    href: '/electrician-berkshire',
    title: 'Electricians in Berkshire',
    description: 'Find qualified electricians across Reading, Slough, Windsor, and Bracknell.',
    icon: MapPin,
    category: 'Location',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Electricians in Hertfordshire',
    content: (
      <>
        <p>
          Hertfordshire is one of the most prosperous counties in the UK, stretching from the edge
          of Greater London north to the Bedfordshire and Cambridgeshire borders. Home to over 1.2
          million residents, the county combines commuter towns with historic market towns, post-war
          new towns, and a growing life sciences and technology sector.
        </p>
        <p>
          The county presents a remarkably varied market for electrical contractors. In the south —
          St Albans, Watford, Harpenden — large Victorian and Edwardian properties create consistent
          demand for rewires, EICRs, and heritage-sympathetic upgrades. In the new towns of
          Stevenage and Welwyn Garden City, post-war housing stock built to the best standards of
          the 1950s now requires comprehensive electrical modernisation. And across the commuter
          belt as a whole, affluent homeowners drive demand for EV charging, solar PV, battery
          storage, and high-end smart home systems.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always verify competent person scheme registration</strong> before booking
                any electrician — use the NICEIC, NAPIT, or ELECSA online lookup tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>UK Power Networks (UKPN)</strong> is the distribution network operator for
                all of Hertfordshire. New connections, upgrades, and renewable energy notifications
                all go through UKPN.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elec-Mate</strong> helps electricians across Hertfordshire manage EICR
                certificates, EIC documents, and client communications from their phone.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'areas-covered',
    heading: 'Areas Covered Across Hertfordshire',
    content: (
      <>
        <p>
          Hertfordshire covers twelve district and borough council areas. The main population
          centres where electrical contractors are most active include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>St Albans</strong> — historic city with Roman heritage and large Victorian
                and Edwardian housing stock. High EICR and rewire demand. Conservation area and
                listed building constraints in the city centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Watford</strong> — large urban centre with mixed housing, commercial
                premises, and retail. Strong demand for commercial electrical work and landlord
                compliance EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stevenage</strong> — first UK new town, now a major employment centre.
                Substantial post-war housing plus the UK biotech cluster around GSK and Roche,
                driving commercial and specialist electrical demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hemel Hempstead</strong> — new town with large industrial areas and
                residential estates from the 1950s and 1960s requiring electrical upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Welwyn Garden City</strong> — second garden city, built 1920s onwards. Mix
                of inter-war and post-war housing with a large industrial and commercial estate.
                Growing demand for EV charging at commercial sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hatfield</strong> — home to the University of Hertfordshire and large
                defence and aerospace heritage. Modern business park electrical work plus student
                accommodation compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications in Hertfordshire",
    content: (
      <>
        <p>
          Under Part P of the Building Regulations, electrical work in domestic premises must either
          be carried out by a competent person registered with an approved scheme, or be notified to
          and inspected by building control. There is no legal requirement for a homeowner to check
          qualifications before booking — but doing so protects both the homeowner and the property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Verification Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Check the electrician is registered with NICEIC, NAPIT, ELECSA, or another
                UKAS-accredited competent person scheme. Verify the registration number on the
                scheme website before work starts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Ask to see their ECS (Electrotechnical Certification Scheme) card — the card
                confirms the holder's qualifications and is renewed every five years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Confirm they hold public liability insurance — minimum £2 million, and £5 million
                for larger or more complex projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                For commercial or specialist work (laboratories, cleanrooms, data centres), ask for
                specific experience and references from similar projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Hertfordshire',
    content: (
      <>
        <p>
          Hertfordshire sits in the South East premium band for labour costs, reflecting high land
          values, strong local demand, and competition for skilled tradespeople from London-based
          employers. Costs are typically 15% to 25% above the national average, with the highest
          rates in St Albans, Harpenden, and the Welwyn Garden City commuter corridor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Typical Job Costs (2025)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (3-bed house):</strong> £180 to £300
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade:</strong> £520 to £800
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed semi):</strong> £4,500 to £7,200
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation:</strong> £850 to £1,350
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart home electrical fit-out:</strong> £1,500 to £6,000+
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV electrical connection (4kWp system):</strong> £600 to £1,000
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always obtain at least three written quotes for larger jobs. Quotes should itemise labour,
          materials, certification costs, and any building control notification fees.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Hertfordshire Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Hertfordshire's housing stock spans four centuries of construction, each presenting
          distinct electrical challenges for contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian stock (St Albans, Harpenden, Hertford):</strong>{' '}
                Properties from 1860 to 1918 typically have lath-and-plaster walls, suspended timber
                floors, and original or post-war rewires using rubber-insulated conductors. EICRs on
                these properties almost invariably identify multiple C2 and C3 observations, with
                full rewires the most common recommendation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  New town stock (Stevenage, Hemel Hempstead, Welwyn Garden City, Hatfield):
                </strong>{' '}
                Built from 1947 to the mid-1960s to Parker Morris standards, this housing features
                PVC-insulated wiring from the 1960s and 1970s that is reaching the end of its
                expected service life. Common issues include absence of RCD protection, inadequate
                earthing arrangements, and fuse boards requiring replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern estates and executive homes:</strong> Properties from the 1990s and
                2000s typically have adequate wiring but are increasingly in demand for upgrades to
                accommodate EV charging, solar PV, battery storage, and smart home systems. RCBO
                consumer unit upgrades to accommodate additional circuits are common.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR frequency for Hertfordshire landlords:</strong> The Electrical Safety
                Standards in the Private Rented Sector (England) Regulations 2020 require EICRs
                every five years for all private rental properties in Hertfordshire. Landlords must
                provide tenants with a copy of the EICR within 28 days of the inspection. Use the{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords" label="landlord EICR guide" />{' '}
                for full compliance details.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'UK Power Networks — DNO for Hertfordshire',
    content: (
      <>
        <p>
          UK Power Networks (UKPN) operates the electricity distribution network across
          Hertfordshire, along with South East England and the East of England. Electricians working
          in Hertfordshire need to be familiar with UKPN's processes for connection applications,
          supply upgrades, and renewable energy notifications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections:</strong> Apply via ukpowernetworks.co.uk for new electrical
                connections or supply capacity increases. New town commercial sites and housing
                developments require connection agreements in advance of work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notifications:</strong> Solar PV and battery storage systems up to
                3.68kW per phase can be notified to UKPN under G98 after installation. Systems above
                this threshold require G99 application and prior approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangements:</strong> Most urban Hertfordshire properties are
                connected to the UKPN TN-C-S (PME) network. Rural properties and some older
                properties in the new towns may be TT earthed — always verify before carrying out
                earthing work under BS 7671 Regulation 542.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power cuts:</strong> Report power cuts and emergencies in Hertfordshire by
                calling 105 — the national power cut number for all UK DNOs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians Working in Hertfordshire',
    content: (
      <>
        <p>
          Hertfordshire offers strong earning potential for electricians willing to invest in
          qualifications and specialisms beyond standard domestic work. The biotech and technology
          sector, combined with the affluent commuter belt, creates demand for specialist skills
          that command premium rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging installation:</strong> Hertfordshire has one of the highest
                rates of EV ownership in the UK. OZEV-approved installer status (previously OLEV) is
                essential to access grant-funded installations. Demand across both domestic and
                commercial sites is strong.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certification for solar PV:</strong> The Stevenage and wider
                Hertfordshire market has strong solar PV demand. MCS accreditation allows customers
                to access the Smart Export Guarantee (SEG) — without it you cannot install
                MCS-compliant systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Use <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate EICR software" />{' '}
                to produce inspection reports on site and email them directly to landlords and
                letting agents — reducing admin time and speeding up payment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianHertfordshirePage() {
  return (
    <GuideTemplate
      title="Electrician Hertfordshire — Find Qualified Electricians in St Albans, Watford, Stevenage"
      description="Find NICEIC and NAPIT registered electricians across Hertfordshire, covering St Albans, Watford, Stevenage, Hemel Hempstead, Welwyn Garden City, and Hatfield. EICR, rewires, EV charging, and smart home installations."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Location Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Hertfordshire{' '}
          <span className="text-yellow-400">— Qualified & Registered</span>
        </>
      }
      heroSubtitle="Find NICEIC and NAPIT registered electricians across St Albans, Watford, Stevenage, Hemel Hempstead, Welwyn Garden City, and Hatfield. EICR inspections, full rewires, EV charging, solar PV, and smart home installations throughout Hertfordshire."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrician Hertfordshire — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Electricians in Hertfordshire — manage your certificates with Elec-Mate"
      ctaSubheading="Issue EICRs, EICs, and Minor Works Certificates on site. Start your free 7-day trial."
    />
  );
}
