import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Home,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/electrician-staffordshire' },
  { label: 'Electrician Staffordshire', href: '/electrician-staffordshire' },
];

const tocItems = [
  { id: 'coverage', label: 'Areas Covered in Staffordshire' },
  { id: 'choosing', label: 'Choosing a Registered Electrician' },
  { id: 'dno', label: 'Local DNO — National Grid Electricity Distribution' },
  { id: 'part-p', label: 'Part P in Staffordshire' },
  { id: 'common-work', label: 'Common Electrical Work in Staffordshire' },
  { id: 'costs', label: 'Typical Costs in the Midlands' },
  { id: 'for-electricians', label: 'For Electricians Working in Staffordshire' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Staffordshire is served by National Grid Electricity Distribution (formerly Western Power Distribution), the Distribution Network Operator (DNO) responsible for the local electricity distribution network across the Midlands. All new connections, upgrades, and diversions must be arranged through National Grid ED.',
  'NICEIC and NAPIT registered electricians in Staffordshire can self-certify Part P notifiable work and notify Staffordshire building control automatically. Always request the Building Regulations compliance certificate after any notifiable electrical work.',
  'An EICR (Electrical Installation Condition Report) is mandatory for privately rented properties in England under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Staffordshire landlords must have EICRs conducted every 5 years.',
  'Consumer unit (fuse board) replacement is one of the most common electrical jobs in Staffordshire, particularly in older properties in Stoke-on-Trent, Stafford, and Burton upon Trent where rewirable fuse boards are still found. A modern consumer unit with RCBOs costs approximately \u00a3500 to \u00a31,200 fitted.',
  'Staffordshire electricians working on commercial premises must comply with the Electricity at Work Regulations 1989 in addition to BS 7671. Periodic inspection requirements for commercial properties are typically every 5 years.',
];

const faqs = [
  {
    question: 'How do I find a registered electrician in Staffordshire?',
    answer:
      'The most reliable way is to search the register of an approved competent person scheme. NICEIC (niceic.com), NAPIT (napit.org.uk), and ELECSA all maintain searchable online registers of registered electricians by postcode. Staffordshire postcodes include ST (Stoke-on-Trent and Stafford), WS (Lichfield and Tamworth), DE (Burton upon Trent), and B (southern Staffordshire bordering the West Midlands). A registered electrician can legally self-certify Part P notifiable work — an unregistered electrician cannot.',
  },
  {
    question: 'What does Part P mean for homeowners in Staffordshire?',
    answer:
      'Part P of the Building Regulations requires that certain electrical work in dwellings in England is either carried out by a registered competent person or notified to Staffordshire building control before work begins. Notifiable work includes adding a new circuit, replacing a consumer unit, or carrying out any electrical work in a kitchen, bathroom, or outdoors. Work that is not notifiable (such as replacing a like-for-like socket or switch on an existing circuit in a non-special location) does not need to involve building control. Always ask your electrician whether the work is notifiable and request the Building Regulations certificate.',
  },
  {
    question: 'Who is the DNO for Staffordshire?',
    answer:
      'National Grid Electricity Distribution (formerly Western Power Distribution, rebranded in 2023) is the Distribution Network Operator for Staffordshire and the wider Midlands area. They are responsible for maintaining the local electricity distribution network (the cables from the substation to your property), responding to power cuts, and processing new connection requests. If you need a new electricity connection, a service alteration, or a meter move, contact National Grid Electricity Distribution. The emergency number for power cuts in the Staffordshire area is 105.',
  },
  {
    question: 'How much does an electrician charge per hour in Staffordshire?',
    answer:
      'Electrician day rates and hourly rates in Staffordshire are generally slightly below the London and South East rates. As of 2024, expect to pay \u00a345 to \u00a370 per hour for a qualified electrician in Staffordshire, or \u00a3250 to \u00a3450 per day for longer jobs. Rates vary by location within the county — Stoke-on-Trent and Stafford town rates tend to be lower than rates in the more affluent areas of Lichfield or Tamworth. Always obtain at least two written quotes for any significant electrical work.',
  },
  {
    question: 'Is an EICR required for my Staffordshire rental property?',
    answer:
      'Yes. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, all privately rented properties in England — including those in Staffordshire — must have a valid EICR conducted every 5 years (or more frequently if the EICR specifies). A copy must be provided to tenants within 28 days of the inspection. New tenants must receive a copy before or at the start of their tenancy. Staffordshire District and Borough councils enforce these requirements and can issue civil penalty notices of up to \u00a330,000 for non-compliance.',
  },
  {
    question: 'Can an electrician in Staffordshire carry out solar PV installation?',
    answer:
      'An electrician can carry out the electrical installation aspects of a solar PV system (DC wiring, inverter connection, consumer unit amendments, metering), but the complete installation must be carried out or overseen by an MCS (Microgeneration Certification Scheme) certified contractor to qualify for export payments under the Smart Export Guarantee (SEG). MCS certification covers both the installer and the product. When choosing a solar installer in Staffordshire, confirm they hold current MCS certification.',
  },
  {
    question: 'What areas of Staffordshire do electricians typically cover?',
    answer:
      'Staffordshire is a large county and most electricians operate within a specific radius rather than covering the entire county. Stoke-on-Trent electricians typically cover the Potteries area including Burslem, Hanley, Longton, Tunstall, and Fenton, plus surrounding areas including Newcastle-under-Lyme, Leek, and Cheadle. Stafford electricians cover Stafford town, Stone, Rugeley, Cannock, and surrounding villages. Burton upon Trent electricians cover the east of the county into Derbyshire. Lichfield and Tamworth electricians often serve the southern Staffordshire border with the West Midlands.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eicr-for-student-houses',
    title: 'EICR for Student Houses',
    description: 'HMO EICR requirements, common defects, and landlord obligations.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Socket positions, cooker circuits, and RCD protection in kitchens.',
    icon: Zap,
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
    heading: 'Areas Covered in Staffordshire',
    content: (
      <>
        <p>
          Staffordshire is one of the largest counties in the Midlands, covering a mix of urban
          industrial areas, market towns, and rural villages. Electricians in the county typically
          operate within specific geographic areas rather than across the full county. Key areas and
          their electrical characteristics include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stoke-on-Trent (ST1–ST6):</strong> The largest city in Staffordshire. Dense
                Victorian and Edwardian terraced housing stock. High volume of consumer unit
                replacement work, EICR inspections for landlords, and rewires in older properties.
                Strong demand from the rental sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stafford (ST16–ST20):</strong> County town. Mix of older and newer
                residential development. Growing commercial sector. Consumer unit upgrades, EV
                charge point installations, and solar PV electrical work are increasingly common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burton upon Trent (DE13–DE15):</strong> East Staffordshire. Former brewing
                town with significant industrial heritage. Mix of older housing and modern
                development. EICRs for HMOs and landlord compliance are common in the rental market
                around the town centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lichfield (WS13–WS14):</strong> Cathedral city in south Staffordshire.
                Affluent residential area with demand for high-specification electrical work, smart
                home systems, and home extension electrical installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tamworth (B77–B79):</strong> Southern Staffordshire, bordering the West
                Midlands. New build housing developments. EV charge point installation and new home
                electrical commissioning are significant work streams.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing',
    heading: 'Choosing a Registered Electrician in Staffordshire',
    content: (
      <>
        <p>
          Selecting a competent, registered electrician is the single most important step when
          commissioning electrical work in Staffordshire. Registration with an approved competent
          person scheme provides assurance of technical competence and gives homeowners automatic
          Building Regulations compliance certification.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC registered:</strong> National Inspection Council for Electrical
                Installation Contracting. The largest electrical competent person scheme in the UK.
                Search niceic.com for registered contractors in your Staffordshire postcode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT registered:</strong> National Association of Professional Inspectors
                and Testers. Another Government-approved scheme. Covers electrical, plumbing,
                heating, and building fabric. Search napit.org.uk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA registered:</strong> Division of NICEIC Group focusing on domestic
                and small commercial work. Electricians registered with ELECSA can self-certify Part
                P work in the same way as NICEIC members.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always request certificates</strong> — any registered electrician completing
                notifiable work must issue an Electrical Installation Certificate (EIC) for new work
                or a Minor Works Certificate (MWC) for additions to existing circuits. If your
                electrician cannot produce these documents, the work may not be compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check registration before work starts</strong> — verify the electrician is
                currently registered (schemes publish online registers) rather than relying on logos
                on vehicles or websites. Registration must be current, not historical.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno',
    heading: 'Local DNO — National Grid Electricity Distribution',
    content: (
      <>
        <p>
          National Grid Electricity Distribution (National Grid ED) is the Distribution Network
          Operator for Staffordshire and the rest of the Midlands region. Formerly known as Western
          Power Distribution (WPD) until its rebranding in 2023, National Grid ED maintains the
          electricity distribution network — the cables, substations, and infrastructure that
          deliver electricity from the national transmission network to homes and businesses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections:</strong> applications for new electricity service
                connections in Staffordshire are made through National Grid ED. Processing times and
                costs vary by project complexity. A single domestic connection typically takes 6 to
                12 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Service alterations:</strong> where an existing service cable needs to be
                moved or upgraded (for example, to allow building work or to increase supply
                capacity), this must be arranged through National Grid ED. A supply upgrade from
                single-phase to three-phase also requires a DNO application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power cuts:</strong> to report a power cut or downed cable in Staffordshire,
                call 105 (the national power cut number, free from any phone) or contact National
                Grid ED directly. Do not attempt to repair DNO network cables — this is the
                responsibility of the DNO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99/G98 connections for generation:</strong> solar PV systems and other
                generation equipment connecting to the distribution network require notification to
                National Grid ED under G99 (above 3.68kW per phase) or G98 (below 3.68kW per phase).
                Your MCS-certified installer handles this.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Building Regulations in Staffordshire',
    content: (
      <>
        <p>
          Part P of the Building Regulations applies across England, including all of Staffordshire.
          It requires that electrical installation work in dwellings is either carried out by a
          registered competent person or notified to the relevant local authority building control
          before work begins.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Staffordshire Local Authority Building Control Areas
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Stoke-on-Trent City Council</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Stafford Borough Council</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>East Staffordshire Borough Council (Burton upon Trent)</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Lichfield District Council</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Tamworth Borough Council</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Newcastle-under-Lyme Borough Council</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Cannock Chase District Council</span>
            </li>
          </ul>
        </div>
        <p>
          A registered electrician working in any of these areas can self-certify Part P work and
          automatically notify the relevant building control. The homeowner receives a Building
          Regulations compliance certificate directly from the competent person scheme. This
          certificate is important for future property sales.
        </p>
      </>
    ),
  },
  {
    id: 'common-work',
    heading: 'Common Electrical Work in Staffordshire',
    content: (
      <>
        <p>
          The type of electrical work most in demand varies across Staffordshire depending on the
          age and character of the local housing stock. Across the county, the following categories
          account for the majority of domestic electrical work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement:</strong> replacing rewirable fuse boards or older
                single-RCD boards with modern RCBO consumer units. Particularly common in
                Stoke-on-Trent where older terraced housing stock is prevalent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR for landlords:</strong> mandatory 5-year electrical inspection reports
                for the significant private rental sector in Stoke-on-Trent, Burton upon Trent, and
                Stafford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charge point installation:</strong> growing demand across all areas as
                electric vehicle adoption increases. Typical installations involve a 7kW
                single-phase charge point on a dedicated 32A circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen and bathroom rewires:</strong> electrical upgrades as part of
                kitchen and bathroom renovation projects. Notifiable under Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar PV electrical connection:</strong> connecting solar panel inverters to
                the consumer unit and installing generation metering and G98/G99 notification
                equipment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Costs for Electrical Work in Staffordshire',
    content: (
      <>
        <p>
          Labour rates in Staffordshire are generally competitive compared to the South East. The
          following cost ranges are indicative for 2024 and will vary by contractor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician hourly rate:</strong> \u00a345 to \u00a370 per hour
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement (10-way RCBO board):</strong> \u00a3500 to
                \u00a31,200
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (3-bedroom house):</strong> \u00a3150 to \u00a3300
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuit installation:</strong> \u00a3200 to \u00a3500 depending on
                length and complexity
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charge point (7kW, home):</strong> \u00a3800 to \u00a31,500 supply and
                fit
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bedroom house):</strong> \u00a33,500 to \u00a36,000 depending
                on property age and access
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians Working in Staffordshire',
    content: (
      <>
        <p>
          If you are an electrician working in Staffordshire, Elec-Mate provides the digital
          certification tools to manage EICRs, EICs, and minor works certificates efficiently
          on-site — whether you are in a Stoke terrace or a Lichfield detached house.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" /> — complete
                landlord EICRs with AI board scanning. Essential for the large private rental market
                in Stoke-on-Trent and Burton upon Trent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eic-certificate" label="EIC Certificate" /> — generate
                compliant Electrical Installation Certificates for consumer unit replacements and
                new circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink
                  href="/guides/eicr-observation-codes-explained"
                  label="EICR observation codes"
                />{' '}
                — reference guide for grading observations on Staffordshire landlord inspections.
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

export default function ElectricianStaffordshirePage() {
  return (
    <GuideTemplate
      title="Electrician Staffordshire — Find NICEIC Registered Electricians 2024"
      description="Find a registered electrician in Staffordshire. Covers Stoke-on-Trent, Stafford, Burton upon Trent, Lichfield, and Tamworth. NICEIC/NAPIT registered, Part P, DNO (National Grid ED), and local cost guide."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Local Guide"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Staffordshire{' '}
          <span className="text-yellow-400">— Find a Registered Electrician</span>
        </>
      }
      heroSubtitle="How to find a NICEIC or NAPIT registered electrician in Staffordshire. Covers Stoke-on-Trent, Stafford, Burton upon Trent, Lichfield, and Tamworth — with local DNO information, Part P requirements, and typical costs for 2024."
      readingTime={8}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrician Staffordshire — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Electricians in Staffordshire — manage your certificates with Elec-Mate"
      ctaSubheading="Generate EICRs, EICs, and minor works certificates on your phone. Start your free 7-day trial."
    />
  );
}
