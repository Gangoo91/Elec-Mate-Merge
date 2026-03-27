import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  AlertTriangle,
  Zap,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/electrician-cardiff' },
  { label: 'Electrician Derbyshire', href: '/electrician-derbyshire' },
];

const tocItems = [
  { id: 'coverage', label: 'Areas Covered in Derbyshire' },
  { id: 'dno', label: 'Local DNO — East Midlands' },
  { id: 'peak-district', label: 'Peak District Properties — Older Wiring and TT Earthing' },
  { id: 'registered-electricians', label: 'Registered Electricians and Part P' },
  { id: 'common-work', label: 'Common Electrical Work in Derbyshire' },
  { id: 'costs', label: 'Typical Costs in Derbyshire' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Derbyshire is served by National Grid Electricity Distribution (NGED) East Midlands for the majority of the county, covering Derby, Chesterfield, Matlock, Belper, Ilkeston, Long Eaton, and surrounding towns. The DNO emergency number for power cuts and fallen cables in Derbyshire is 105.',
  'Properties in the Peak District National Park — particularly older farmhouses, stone-built cottages, and agricultural properties on the Derbyshire Dales — frequently have TT (earth electrode) earthing systems rather than the PME (TN-C-S) earthing typical of urban areas. TT systems require careful assessment during EICR inspections and consumer unit replacements.',
  'Older properties across rural Derbyshire frequently retain rubber-insulated wiring (PVC covered rubber, or original vulcanised rubber), rewirable fuse boards, and unprotected socket circuits. These installations are typically rated Unsatisfactory on EICR and require significant remediation.',
  'All electricians carrying out notifiable work under Part P of the Building Regulations in England must either be registered with an approved competent person scheme (NICEIC, NAPIT, Elecsa, SELECT) or notify Derbyshire building control before work begins. Verified electricians self-certify and notify automatically.',
  'Elec-Mate supports electricians working across Derbyshire with mobile-first certificate generation for EICRs, EICs, Minor Works Certificates, and other electrical certificates — useful for jobs in the Peak District where office access is impractical.',
];

const faqs = [
  {
    question: 'How do I find a registered electrician in Derbyshire?',
    answer:
      'The most reliable way to find a registered electrician in Derbyshire is to use the online registers maintained by the approved competent person schemes. NICEIC (niceic.com), NAPIT (napit.org.uk), Elecsa (elecsa.co.uk), and SELECT all maintain searchable registers. Searching by postcode or town will return electricians who are registered in your area and who are verified as qualified and insured. Registered electricians can self-certify notifiable work under Part P and issue compliance certificates without requiring building control notification.',
  },
  {
    question: 'What is the DNO for Derbyshire and how do I report a power cut?',
    answer:
      "National Grid Electricity Distribution (NGED) East Midlands is the Distribution Network Operator for the majority of Derbyshire, including Derby, Chesterfield, Matlock, Belper, Ilkeston, and Long Eaton. To report a power cut or damaged electrical equipment, call 105 (the national power cut helpline, available from any phone). You can also check the NGED power cut map online. Note that your DNO is not the same as your energy supplier — the DNO owns and maintains the network; your supplier bills you for the electricity you use.",
  },
  {
    question: 'Why do older Derbyshire properties have TT earthing?',
    answer:
      "Many rural properties in Derbyshire — particularly in the Peak District, Derbyshire Dales, and other areas away from the main electricity network — were connected to the electricity supply before the widespread adoption of PME (TN-C-S) earthing. In a TT earthing system, the property's earth connection is provided by a local earth electrode (a metal rod driven into the ground) rather than by the electricity supplier's neutral conductor. TT systems are perfectly safe when properly installed and maintained, but they require RCD protection on all circuits (BS 7671 Regulation 411.5.3) and regular testing of the earth electrode resistance.",
  },
  {
    question: 'Do I need an EICR for my Derbyshire property?',
    answer:
      "EICR (Electrical Installation Condition Report) requirements depend on the type of property. Landlords in Derbyshire renting residential properties must have an EICR carried out at least every five years under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. For owner-occupiers, an EICR is not legally required but is strongly recommended when buying or selling an older property, or when the last EICR is more than 10 years old. Properties in the Peak District and rural Derbyshire with older wiring often reveal significant deficiencies on EICR.",
  },
  {
    question: 'How much does an electrician cost in Derbyshire?',
    answer:
      "Electrician day rates in Derbyshire are typically £180 to £280 per day for a qualified electrician, or £40 to £65 per hour for smaller jobs. Derby city rates are at the higher end; rural rates in the Peak District may be lower but may include a travel supplement. EICR prices for a typical 3-bedroom property are £150 to £280. Consumer unit replacement costs are typically £350 to £700 fitted. Always obtain two or three quotes from registered electricians and ensure the quote includes all required certification.",
  },
  {
    question: 'Can I do electrical work myself in Derbyshire?',
    answer:
      "Homeowners in England can carry out some minor electrical work themselves without notification — for example, like-for-like replacement of socket outlets and switches in rooms other than kitchens and bathrooms. However, notifiable work (new circuits, kitchen work, bathroom work, garden and garage electrical work) must either be carried out by a registered competent person or notified to Derbyshire building control before work begins. Carrying out notifiable work without the correct certification can cause difficulties when selling the property and may invalidate home insurance. Hiring a registered electrician is the safest approach for all but the most minor work.",
  },
  {
    question: 'What areas of Derbyshire do electricians cover?',
    answer:
      "Most Derbyshire-based electricians cover their local area and typically travel within 20 to 30 miles. Derby-based electricians commonly cover Derby city, Belper, Ripley, Ilkeston, Long Eaton, Swadlincote, and Uttoxeter. Chesterfield-based electricians typically cover Chesterfield, Bolsover, Staveley, Dronfield, and north Derbyshire. Matlock and Bakewell-based electricians often cover the Peak District, Derbyshire Dales, and surrounding villages. For remote Peak District properties, always confirm the electrician's coverage area and any travel charge before booking.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/consumer-unit-types-guide',
    title: 'Consumer Unit Types Guide',
    description: 'Metal clad, split-load, high-integrity, and RCBO boards explained with upgrade costs.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description: 'Things to check when moving into a new property — RCDs, smoke detectors, meter registration.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'coverage',
    heading: 'Electricians in Derbyshire — Areas Covered',
    content: (
      <>
        <p>
          Derbyshire is a large and geographically diverse county, ranging from the urban
          areas of Derby and Chesterfield to the rural and sometimes remote landscapes of
          the Peak District National Park and the Derbyshire Dales. Electricians across
          Derbyshire serve a wide range of domestic, commercial, and agricultural clients.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Derby (DE1 to DE24)</strong> — the county town and Derbyshire's
                largest urban area. Home to Rolls-Royce manufacturing, Toyota, and significant
                commercial and industrial electrical demand alongside a large domestic market.
                Well-served by electricians across all competency areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Chesterfield (S40, S41, S42, S43, S44, S45)</strong> — Derbyshire's
                second-largest town. Known for the Crooked Spire church. Significant residential
                and commercial electrical work including new build developments across the
                north Derbyshire area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Matlock (DE4) and Bakewell (DE45)</strong> — market towns in the
                Derbyshire Dales and Peak District. Older stone-built properties, some
                listed buildings, and a high proportion of properties on TT earthing systems.
                Specialist electricians familiar with older wiring and TT earthing assessment
                are in particular demand in this area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Belper (DE56), Ripley (DE5), and Heanor (DE75)</strong> — Amber Valley
                district towns midway between Derby and Matlock. Mix of older terraced housing
                (some with older wiring) and newer residential developments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ilkeston (DE7) and Long Eaton (NG10)</strong> — Erewash district
                towns bordering Nottingham. Predominantly residential with a mix of 1930s
                semi-detached housing and newer properties. Ring main and radial socket
                circuit work is common in these areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Local DNO — National Grid Electricity Distribution East Midlands',
    content: (
      <>
        <p>
          The Distribution Network Operator (DNO) for most of Derbyshire is National Grid
          Electricity Distribution (NGED), operating the East Midlands network. NGED is
          responsible for the electricity network — the cables, substations, and equipment
          — from the high-voltage transmission network down to the service head (cutout) at
          individual properties.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power cut emergencies</strong> — call 105, available from any UK
                phone including mobiles, 24 hours a day. This connects you to the national
                power cut helpline which routes you to NGED for Derbyshire. For dangerous
                situations (fallen power lines, electrical fires involving network equipment),
                call 999 as well.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and alterations</strong> — any change to the metered
                supply, new service heads, or work affecting the distribution network must
                be arranged through NGED. Electricians cannot work on the live service head
                or service cable — these remain the property and responsibility of NGED at
                all times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply voltage</strong> — the nominal supply voltage in the UK is
                230V AC, 50Hz. The declared voltage is 230V +10%/-6% (i.e. 216.2V to 253V).
                Electricians working in Derbyshire should verify supply voltage at the
                consumer unit if voltage-sensitive equipment is being installed, particularly
                in rural areas where supply impedance may be higher.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Manage your Derbyshire electrical business with Elec-Mate"
          description="EICRs, EICs, Minor Works Certificates, quotes, and invoices — all from your phone. Built for UK electricians working across large rural areas."
          ctaText="Start 7-day free trial"
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'peak-district',
    heading: 'Peak District Properties — Older Wiring and TT Earthing',
    content: (
      <>
        <p>
          The Peak District National Park and surrounding Derbyshire Dales contain some of
          the oldest domestic electrical installations in the country. Many farmhouses,
          stone-built cottages, and converted agricultural buildings retain wiring from the
          1950s, 1960s, and 1970s, and earthing systems that predate PME (Protective Multiple
          Earthing) becoming the standard approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing systems</strong> — common throughout rural Derbyshire and
                the Peak District, where properties were connected to the supply network
                before PME infrastructure was available. In a TT system, earth continuity is
                provided by a local earth electrode. Electricians should always check the
                earthing system type at the beginning of any inspection or significant
                installation work on these properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated wiring</strong> — many older Peak District properties
                have original rubber-insulated wiring (often visible as black or lead-grey
                cabling), sometimes encased in lead sheathing. Rubber insulation degrades over
                time, becoming brittle and cracking. This is a C1 (danger present) or C2
                (potentially dangerous) finding on EICR depending on the extent and severity.
                Full rewires are often required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse boards</strong> — older properties frequently retain
                consumer units or distribution boards with rewirable fuse carriers (fuse wire)
                rather than MCBs or RCBOs. These boards offer no earth leakage protection and
                are typically rated Unsatisfactory on EICR. Replacement with a modern
                metal-clad consumer unit is recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings and conservation areas</strong> — parts of Derbyshire,
                including Bakewell, Castleton, and many Peak District villages, contain
                listed buildings and conservation areas. Electrical work in listed buildings
                may require consent from the local planning authority (typically Derbyshire
                Dales District Council or the Peak District National Park Authority) in
                addition to Part P compliance. Surface-mounted wiring in conduit is often
                specified to avoid damage to historic fabric.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians conducting{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICRs
          </SEOInternalLink>{' '}
          on older Derbyshire properties should allow significantly more time than for
          equivalent modern properties. The inspection of rubber wiring, TT earthing systems,
          and rewirable fuse equipment requires thorough testing and detailed observation
          recording.
        </p>
      </>
    ),
  },
  {
    id: 'registered-electricians',
    heading: 'Registered Electricians and Part P in Derbyshire',
    content: (
      <>
        <p>
          Part P of the Building Regulations applies to electrical work in dwellings in
          England, including all of Derbyshire. Notifiable electrical work must either be
          carried out by a registered competent person or notified to building control.
          The relevant local authorities for building control in Derbyshire include Derby
          City Council, Derbyshire Dales District Council, Amber Valley Borough Council,
          Erewash Borough Council, and others depending on the property's location.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC registered electricians</strong> — the National Inspection
                Council for Electrical Installation Contracting is one of the largest and
                most widely recognised competent person schemes. NICEIC-registered
                electricians in Derbyshire are assessed annually for technical competence
                and can self-certify all notifiable electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT registered electricians</strong> — the National Association of
                Professional Inspectors and Testers is another approved competent person
                scheme. NAPIT registration covers Part P self-certification for domestic
                electrical work in Derbyshire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certificates required</strong> — notifiable electrical work requires
                an Electrical Installation Certificate (EIC) or Minor Electrical Installation
                Works Certificate (MEWC) from the electrician, plus a Building Regulations
                compliance certificate from the competent person scheme. The compliance
                certificate should be provided to the homeowner within 30 days of completing
                the work. Elec-Mate generates both the EIC and MEWC directly on site.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-work',
    heading: 'Common Electrical Work in Derbyshire',
    content: (
      <>
        <p>
          Electricians working in Derbyshire carry out a broad range of domestic and
          commercial electrical work. The specific mix varies significantly between urban
          Derby and Chesterfield on the one hand, and the rural Peak District on the other.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR inspections</strong> — in high demand across all areas of
                Derbyshire, particularly for landlord compliance (the 5-year mandatory EICR
                requirement) and for property purchases. Rural properties and older properties
                in the Peak District frequently require remediation following EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — replacing rewirable fuse boards
                and older split-load boards with modern metal-clad consumer units is one of
                the most common jobs across older Derbyshire properties. TT earthing systems
                require careful consideration during consumer unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — growing demand across Derby,
                Chesterfield, and the suburbs for home EV charger installation. PME earthing
                on most urban properties in Derbyshire requires specific earthing arrangements
                for EV chargers under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV and battery storage</strong> — a growing market in
                Derbyshire, particularly in owner-occupied properties in the suburbs of
                Derby, Chesterfield, and the surrounding towns. Many Peak District properties
                are exploring battery storage as grid backup given the risk of supply
                interruption in remote areas.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrical Costs in Derbyshire',
    content: (
      <>
        <p>
          Electrician rates in Derbyshire are generally somewhat lower than in London and
          the South East, though they have risen significantly since 2021 in line with
          national labour market pressures. The following are approximate 2024/2025 guide
          prices for common jobs in Derbyshire:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hourly rate</strong> — £40 to £65 per hour depending on the
                electrician, location within Derbyshire, and the type of work. Rural
                Peak District rates may include a travel supplement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR — 3-bedroom domestic property</strong> — £150 to £280. Peak
                District and rural properties may be higher due to travel and the additional
                time required for older installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement (domestic)</strong> — £350 to £700 fitted,
                including certification and Part P compliance. Properties with TT earthing
                requiring earth electrode testing may be at the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full house rewire (3-bedroom semi)</strong> — £3,500 to £7,000
                depending on the size of the property, the existing installation condition,
                and the level of redecoration required. Older Peak District properties with
                rubber wiring will typically be at the higher end of this range.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians in Derbyshire using{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Elec-Mate
          </SEOInternalLink>{' '}
          can generate professional quotes and invoices alongside their electrical
          certificates — all from one app, even in the remote parts of the Peak District
          where mobile data may be limited.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianDerbyshirePage() {
  return (
    <GuideTemplate
      title="Electrician Derbyshire — Derby, Chesterfield, Matlock, Peak District | Elec-Mate"
      description="Find registered electricians in Derbyshire covering Derby, Chesterfield, Matlock, Belper, Ilkeston, and Long Eaton. Local DNO (NGED East Midlands), Peak District TT earthing, older wiring, Part P, and typical costs for electrical work across Derbyshire."
      datePublished="2024-08-01"
      dateModified="2025-03-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Local Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician Derbyshire{' '}
          <span className="text-yellow-400">— Derby, Chesterfield, and the Peak District</span>
        </>
      }
      heroSubtitle="From Derby city to the Peak District's stone-built farmhouses, Derbyshire's diverse properties present a wide range of electrical challenges. This guide covers local DNO contacts, TT earthing issues common in rural Derbyshire, registered electrician requirements, and typical job costs."
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electricians in Derbyshire — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Elec-Mate — built for electricians across Derbyshire"
      ctaSubheading="EICRs, EICs, Minor Works Certificates, and business tools in one app. Works even in the Peak District."
    />
  );
}
