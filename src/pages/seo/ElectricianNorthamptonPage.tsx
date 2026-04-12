import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  MapPin,
  ShieldCheck,
  FileCheck2,
  PoundSterling,
  Building2,
  Zap,
  GraduationCap,
  Calculator,
  Users,
  Factory,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-northampton' },
  { label: 'Northampton', href: '/guides/electrician-northampton' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Northampton' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Northampton' },
  { id: 'property-types', label: 'Northampton Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'industrial-heritage', label: 'Industrial Heritage and Commercial Work' },
  { id: 'flood-areas', label: 'River Nene Flood Areas and Electrical Safety' },
  { id: 'for-electricians', label: 'For Electricians Working in Northampton' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  'NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the Distribution Network Operator for Northampton. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with NGED.',
  'Northampton has a mix of Victorian terraces in the town centre, post-war council estates, and large new-build developments on the fringes. Each property type presents different electrical challenges and costs.',
  'Properties in flood risk areas along the River Nene (Far Cotton, Billing, South Bridge) need careful consideration of consumer unit height, IP ratings for ground-level accessories, and flood-resilient installation practices.',
  "The town's extensive warehouse and logistics sector (Brackmills, Moulton Park, Swan Valley) provides strong demand for commercial electrical contractors.",
];

const faqs = [
  {
    question: 'How much does an electrician cost in Northampton?',
    answer:
      'Northampton electrician day rates typically range from £220 to £320 per day for a qualified electrician. Hourly rates are usually £35 to £50 per hour, with emergency call-out rates of £65 to £95 per hour. Prices in Northampton are broadly in line with the national average. A consumer unit replacement typically costs £420 to £700 and a full rewire of a 3-bedroom house costs £4,200 to £7,000. Always get at least three written quotes for any significant work.',
  },
  {
    question: 'How do I check if a Northampton electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations, the electrician must be registered with a competent person scheme or the work must be signed off by West Northamptonshire Council building control.',
  },
  {
    question: 'Who is the electricity distributor for Northampton?',
    answer:
      'NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the Distribution Network Operator for Northampton and the wider Northamptonshire area. They own and maintain the electricity cables and infrastructure. For new connections, supply upgrades, meter relocations, or to report a power cut, contact NGED directly. Lead times for new connections in Northampton are typically 4 to 8 weeks.',
  },
  {
    question: 'Do I need an EICR for my rented property in Northampton?',
    answer:
      'Yes. Since April 2021, all landlords in England (including Northampton) are legally required to have a valid Electrical Installation Condition Report (EICR) for rented properties, carried out at least every 5 years or at each change of tenancy. In Northampton, an EICR typically costs £170 to £280 for a 2 to 3 bedroom property and £260 to £420 for a 4 to 5 bedroom house. Older terraced properties in areas like Semilong, St James, and Kingsthorpe often produce more observations than newer stock.',
  },
  {
    question: 'How long does a full rewire take in Northampton?',
    answer:
      'A full rewire of a typical 3-bedroom Northampton property takes 5 to 8 working days with a team of two electricians, plus 1 to 2 days for testing and certification. Victorian terraces in the town centre take longer due to solid walls, higher ceilings, and lath-and-plaster that crumbles when chased. Post-war semi-detached houses and newer builds are generally more straightforward. The first fix takes 3 to 5 days and second fix takes 2 to 3 days.',
  },
  {
    question: 'Are there flood risks that affect electrical work in Northampton?',
    answer:
      'Yes. Properties near the River Nene and Brampton Arm — particularly in Far Cotton, Billing Aquadrome area, South Bridge, and Upton — are in flood risk zones. If your property is in a flood risk area, your electrician should consider mounting the consumer unit at a higher level (above predicted flood levels), using IP-rated accessories at ground floor level, installing flood-resilient wiring methods, and ensuring the main earthing arrangement is suitable. An electrician experienced with flood-affected properties will factor these requirements into the installation design.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports on your phone with AI-assisted testing.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-guide',
    title: 'Consumer Unit Replacement Guide',
    description: 'Full guide to consumer unit upgrades including Part P notification requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'Understand which electrical work is notifiable and what compliance means.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description: 'How to become NICEIC registered and what it means for your electrical business.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for domestic and commercial installations with automatic derating.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Create professional quotes for Northampton customers with accurate local pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Finding a Qualified Electrician in Northampton',
    content: (
      <>
        <p>
          Northampton is the county town of Northamptonshire and one of the largest towns in
          England, with a population of approximately 230,000. The town has seen significant
          expansion in recent years, with large housing developments on the western and southern
          fringes, while the town centre retains its Victorian and Edwardian character. This creates
          a diverse market for electrical work spanning new-build installations, period property
          rewires, and commercial fit-outs.
        </p>
        <p>
          The Northampton electrical market serves both domestic and commercial sectors. Domestic
          work includes rewires of the extensive Victorian terrace stock in areas like Semilong, St
          James, and Kingsthorpe, consumer unit upgrades in post-war estates, and EICRs for the
          large rental market. Commercial work is driven by the logistics and warehousing sector,
          with major industrial estates at Brackmills, Moulton Park, Round Spinney, and Swan Valley.
        </p>
        <p>
          Whatever the type of work, the qualifications and registration requirements are the same.
          Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by local authority building control. The most recognised competent person
          schemes are <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,
          NAPIT, ELECSA, and STROMA.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications",
    content: (
      <>
        <p>
          Before hiring any electrician in Northampton, verify their credentials. This protects you
          legally, financially, and physically. Here is what to check:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number. Search it online on the scheme
                provider's website to confirm it is current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the holder's qualifications and competence level. A gold ECS card indicates a
                qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure your electrician carries at
                least £2 million public liability cover. For commercial work on Northampton
                industrial estates, most clients require £5 million minimum.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references and reviews</strong> — ask for contact details of 2 to 3
                recent Northampton customers, or check verified reviews on Checkatrade, Trustpilot,
                or Google Business.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Northampton (2026 Prices)',
    content: (
      <>
        <p>
          Northampton electrical prices are broadly in line with the national average. Here are
          realistic prices for common domestic electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed house)</strong> — £4,200 to £7,000 including new consumer
                unit, all circuits, sockets, switches, lighting, testing, and Part P certification.
                Victorian terraces in Semilong and Kingsthorpe are at the upper end due to solid
                walls and lath-and-plaster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £420 to £700 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £170 to £280 for a 2 to 3 bedroom property, £260 to £420 for
                a 4 to 5 bedroom house. Required every 5 years for rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket</strong> — £90 to £160 per single socket from an existing
                circuit, depending on cable run and wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £650 to £1,200 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £110 to £190 for the first hour including
                travel, plus £40 to £65 per additional hour.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Northampton Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Northampton has a varied property stock spanning several centuries. Understanding the
          challenges of each type helps you plan and budget for electrical work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              The town centre, Semilong, St James, Far Cotton, and Kingsthorpe have extensive
              Victorian terrace housing. Common electrical issues include outdated rubber-insulated
              wiring, rewirable fuse consumer units, lead-sheathed cables, and inadequate earthing.
              Solid brick walls and lath-and-plaster ceilings add cost and time to rewiring.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Post-War Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Estates built in the 1950s to 1970s (Blackthorn, Lings, Goldings, Camp Hill) typically
              have cavity wall construction and are now due for full rewires. Many still have
              original consumer units with rewirable fuses and no RCD protection. These are
              relatively straightforward to rewire compared to Victorian stock.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">New-Build Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              Large developments at Upton, Dallington Grange, and the Northampton North SUE
              (Sustainable Urban Extension) add thousands of new homes. These should comply with the
              18th Edition but snagging issues are common — independent EICRs within the warranty
              period are recommended.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Converted Boot and Shoe Factories</h3>
            <p className="text-white text-sm leading-relaxed">
              Northampton's boot and shoe industry heritage means many former factory buildings have
              been converted to residential lofts and apartments. These conversions often have
              three-phase supplies, high ceilings, long cable runs, and complex communal areas.
              Electrical work in conversions requires understanding shared supplies and metering.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Northampton Electrical Regulations',
    content: (
      <>
        <p>
          NGED (National Grid Electricity Distribution, formerly Western Power Distribution) is the
          Distribution Network Operator for Northampton. Any work affecting the electricity supply
          to your property involves NGED:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — apply to NGED via their
                website. Northampton lead times are typically 4 to 8 weeks for standard domestic
                connections. Costs vary — a simple service upgrade might be £500 to £1,500, while a
                new three-phase supply can cost £2,000 to £6,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires NGED to
                disconnect and reconnect the supply. Common during kitchen extensions and garage
                conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — solar PV, battery storage, or generator
                installations require NGED notification under G98 (up to 16A per phase) or G99
                (larger systems).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Northampton is overseen by West Northamptonshire
          Council building control or by an approved inspector. If your electrician is registered
          with a competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'industrial-heritage',
    heading: 'Industrial Heritage and Commercial Electrical Work',
    content: (
      <>
        <p>
          Northampton's economy has diversified significantly from its boot and shoe manufacturing
          roots. The town now has major logistics, distribution, and technology sectors that drive
          commercial electrical demand:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Logistics and warehousing</strong> — Brackmills Industrial Estate, Moulton
                Park, Swan Valley, and Pineham are major employment centres requiring three-phase
                installations, large distribution boards, emergency lighting, fire alarm systems,
                and 5-yearly periodic inspections. Amazon, Carlsberg, and Travis Perkins all have
                major facilities in the area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technology and office</strong> — Northampton's growing technology sector and
                University of Northampton Waterside Campus generate demand for data cabling,
                structured wiring, LED lighting upgrades, and smart building systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heritage conversions</strong> — former factories and warehouses being
                converted to residential and mixed-use require specialist electrical knowledge,
                including working with existing three-phase supplies, asbestos awareness (common in
                industrial buildings), and compliance with HMO electrical requirements for
                multi-unit conversions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flood-areas',
    heading: 'River Nene Flood Areas and Electrical Safety',
    content: (
      <>
        <p>
          The River Nene flows through Northampton, and several residential areas are in flood risk
          zones. The 1998 Easter floods caused significant damage in Far Cotton and other riverside
          areas. Electricians working on properties in flood risk areas need to consider specific
          safety measures:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit placement</strong> — in flood risk properties, the consumer
                unit should be mounted above the predicted flood level where possible. Some
                installations use a split arrangement with the main switch at high level and
                distribution equipment above the flood line.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP-rated accessories</strong> — ground-floor socket outlets and switches in
                flood risk properties should have appropriate IP ratings. RCD protection under
                Regulation 411.3.3 is particularly important in these properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-flood inspection</strong> — any electrical installation that has been
                submerged in flood water must be fully inspected and tested before being
                re-energised. Flood water damages insulation, corrodes connections, and can
                compromise earthing arrangements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Northampton Market',
    content: (
      <>
        <p>
          Northampton offers a well-balanced market for electricians, with a healthy mix of domestic
          and commercial work. The town's central location on the M1 corridor between London and
          Birmingham provides easy access to neighbouring markets in Milton Keynes, Wellingborough,
          Kettering, and Daventry. Operating costs are moderate with good parking availability and
          manageable travel times.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Northampton Market Opportunity</h4>
                <p className="text-white text-sm leading-relaxed">
                  A large stock of Victorian and post-war housing needing rewires and consumer unit
                  upgrades, a growing rental market requiring EICR compliance, major commercial
                  estates needing periodic inspection, and continuous new-build development all
                  contribute to reliable demand. The University of Northampton's Waterside Campus
                  has also stimulated the local economy and property market.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Northampton customers and letting agents expect professional service. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave the site sets you apart from
                  competitors still posting handwritten certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Northampton electrical business from your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional EICRs, EICs, and Minor Works certificates completed on site. 7-day free trial."
          icon={MapPin}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricianNorthamptonPage() {
  return (
    <GuideTemplate
      title="Electrician in Northampton | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Northampton. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, Victorian rewiring costs, NGED connections, Part P compliance, and Northampton-specific electrical guidance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Northampton:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Northampton, what to expect on pricing, and the specific challenges of electrical work across the town. Covers NGED connections, Part P compliance, Victorian rewiring, flood risk areas, and commercial electrical work."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Northampton"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Northampton and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
