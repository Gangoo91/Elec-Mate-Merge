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
  Home,
  Ship,
  Factory,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-ipswich' },
  { label: 'Ipswich', href: '/guides/electrician-ipswich' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Ipswich' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Ipswich' },
  { id: 'property-types', label: 'Ipswich Property Challenges' },
  { id: 'dno-regulations', label: 'UKPN and Local Regulations' },
  { id: 'waterfront', label: 'Ipswich Waterfront Developments' },
  { id: 'for-electricians', label: 'For Electricians Working in Ipswich' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always verify your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins.',
  'UKPN (UK Power Networks) is the Distribution Network Operator for Ipswich and the whole of Suffolk. Any work affecting the incoming supply or requiring a new connection must go through UKPN.',
  'Ipswich has a mix of Victorian terraces, 1930s semis, and modern waterfront apartments. Each property type has distinct electrical challenges — from lath-and-plaster walls in older homes to communal distribution systems in waterfront flats.',
  'Ipswich electrician rates are among the most affordable in the South East, typically £38 to £52 per hour, making it competitive for both homeowners and electricians.',
  'The Ipswich Waterfront regeneration has created significant demand for electrical work in converted warehouses and new-build apartments, often with complex communal electrical systems.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Ipswich?',
    answer:
      'Ipswich electrician day rates in 2026 typically range from £240 to £330 for a qualified, registered electrician. Hourly rates are usually £38 to £52 per hour, with emergency call-out rates of £65 to £95 per hour. Common fixed-price jobs include: consumer unit replacement £480 to £750, additional double socket £90 to £150, full house rewire (3-bed Victorian terrace) £3,800 to £6,000, EICR £170 to £280. Ipswich rates are competitive compared to larger cities, reflecting the lower operating costs in Suffolk.',
  },
  {
    question: 'Who is the DNO for Ipswich?',
    answer:
      'UKPN (UK Power Networks) is the Distribution Network Operator for Ipswich and the whole of Suffolk. For new connections, supply upgrades, meter relocations, or generation connections (solar PV, battery storage), you apply through UKPN. G98 notification is required for small-scale generation up to 16A per phase, and G99 application for larger systems. Processing times in Suffolk are typically 4 to 8 weeks.',
  },
  {
    question: 'Do I need Part P approval for electrical work in Ipswich?',
    answer:
      'Notifiable electrical work in Ipswich (as in the rest of England and Wales) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA), they can self-certify the work and notify Ipswich Borough Council building control on your behalf. If the electrician is not registered, you must apply to building control before work starts.',
  },
  {
    question: 'What are the challenges of rewiring Victorian houses in Ipswich?',
    answer:
      'Ipswich has extensive areas of Victorian terraced housing, particularly around the town centre and in areas like California, Burlington Road, and Woodbridge Road. Challenges include lath-and-plaster walls that crumble when chased, high ceilings requiring step ladders or tower access, multiple previous partial rewires leaving mixed cabling, and original gas pipe routes concealed in walls alongside later electrical wiring. A full rewire of a 3-bed Victorian terrace typically takes 6 to 8 working days.',
  },
  {
    question: 'Can I get an EV charger installed at my Ipswich home?',
    answer:
      'Yes. A 7kW home EV charger installation in Ipswich typically costs £650 to £1,100 including the charger unit, installation, earthing, and Part P certification. Your electrician will assess whether your existing supply has sufficient capacity. Most single-phase 100A supplies can support a 7kW charger alongside normal household load. UKPN notification under G98 is required for chargers with smart functionality that can export to the grid.',
  },
  {
    question: 'What qualifications should an Ipswich electrician have?',
    answer:
      'A qualified electrician should hold City & Guilds 2365 or 2357 (or NVQ Level 3 in Electrical Installation) as their core qualification, plus current BS 7671:2018+A3:2024 (18th Edition Wiring Regulations) certification. For notifiable work under Part P, they must be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. Ask for their registration number and verify it online.',
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
    description: 'Create professional quotes for Ipswich customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Ipswich',
    content: (
      <>
        <p>
          Ipswich is the county town of Suffolk and the largest settlement in the county, with a
          population of around 140,000 and a wider urban area of over 180,000. The town has a
          diverse economy that generates steady demand for both domestic and commercial electrical
          work.
        </p>
        <p>
          The Ipswich electrical market is predominantly sole traders and small firms handling
          domestic work — rewires, consumer unit upgrades, EICRs, and increasingly EV charger
          installations. The waterfront regeneration and ongoing commercial development in the town
          centre provide additional commercial electrical work for larger firms.
        </p>
        <p>
          Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected by
          building control. The most recognised schemes are{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>, NAPIT,
          ELECSA, and STROMA.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: "How to Verify an Electrician's Qualifications",
    content: (
      <>
        <p>Before hiring any electrician in Ipswich, verify their credentials:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number. Verify it online on the scheme
                provider's website.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — the Electrotechnical Certification Scheme card confirms
                the holder's qualifications. A gold ECS card indicates a qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — ensure your electrician carries at
                least £2 million public liability cover. Ask for a copy of the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>References and reviews</strong> — check verified reviews on Checkatrade,
                Trustpilot, or Google Business. Ask for contact details of recent local customers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Ipswich (2026 Prices)',
    content: (
      <>
        <p>
          Ipswich electrical work is competitively priced compared to larger cities. The town's
          moderate cost of living and lower overheads are reflected in rates that offer good value
          for homeowners.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed terrace)</strong> — £3,800 to £6,000 including new
                consumer unit, all circuits, testing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £480 to £750 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £170 to £280 for a 2 to 3 bedroom house. Required every 5
                years for rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional double socket</strong> — £90 to £150 depending on cable run
                length and wall type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £650 to £1,100 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £110 to £180 for the first hour including
                travel, plus £45 to £65 per additional hour.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Ipswich Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Ipswich has a varied housing stock that creates different challenges for electrical work
          depending on the property age and construction type.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Areas around California, Burlington Road, and Woodbridge Road have dense Victorian
              terraced housing. These properties feature lath-and-plaster walls, high ceilings, and
              often multiple previous partial rewires. Many have been converted into HMOs, requiring
              additional fire detection circuits and emergency lighting.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1930s Semi-Detached</h3>
            <p className="text-white text-sm leading-relaxed">
              Large areas of Ipswich (Rushmere, Nacton Road, Felixstowe Road) were built in the
              1930s. These typically have cavity walls making cable routing easier, but often retain
              original rewirable fuse boards and aged rubber-insulated cabling that needs replacing.
              A consumer unit upgrade is frequently the first priority.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Waterfront Apartments</h3>
            <p className="text-white text-sm leading-relaxed">
              The regenerated Ipswich Waterfront includes converted warehouses and modern apartment
              buildings with communal electrical distribution systems. Work in these properties
              requires coordination with the building management company and an understanding of
              landlord supply arrangements and communal metering.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Rural Suffolk Properties</h3>
            <p className="text-white text-sm leading-relaxed">
              Ipswich electricians also serve surrounding villages where properties may have
              overhead supply lines, long cable runs from the road, and TT earthing systems
              (requiring RCD protection on all circuits as per Regulation 411.3.3). Understanding TT
              earthing arrangements is essential for rural Suffolk work.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'UKPN and Ipswich Electrical Regulations',
    content: (
      <>
        <p>
          UKPN (UK Power Networks) is the Distribution Network Operator for Ipswich and the whole of
          Suffolk. Any work affecting the electricity supply involves UKPN:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — apply to UKPN for new
                supplies or upgrades from single-phase to three-phase. Suffolk lead times are
                typically 4 to 8 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — UKPN handles the meter and cutout; your
                electrician installs the new meter tails and consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — required for solar PV, battery storage, and
                generator installations. Suffolk has seen significant growth in domestic solar PV
                installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Ipswich is overseen by Ipswich Borough Council
          building control or an approved inspector.
        </p>
      </>
    ),
  },
  {
    id: 'waterfront',
    heading: 'Ipswich Waterfront Electrical Considerations',
    content: (
      <>
        <p>
          The Ipswich Waterfront regeneration has transformed the former docklands into a mix of
          residential apartments, restaurants, bars, and offices. Electrical work in this area has
          specific considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted warehouses</strong> — former industrial buildings converted to
                residential use often have complex electrical histories. The original industrial
                installation may have been partially retained, and the conversion may have added
                domestic circuits on top of commercial infrastructure. A thorough EICR is essential
                before any further work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ship className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Communal systems</strong> — waterfront apartment buildings typically have
                communal landlord supplies for lighting, lifts, door entry systems, and CCTV. Work
                on communal systems requires coordination with the building management company and
                may be subject to leaseholder consultation under Section 20 of the Landlord and
                Tenant Act.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial units</strong> — the waterfront includes many restaurants, bars,
                and offices with commercial electrical installations. These require periodic
                inspection and testing, typically on a 3 to 5 year cycle depending on the type of
                premises, and must comply with the Electricity at Work Regulations 1989.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Ipswich Market',
    content: (
      <>
        <p>
          Ipswich provides a reliable market for electricians, with a good mix of domestic and
          commercial work. The town's growth (Ipswich Garden Suburb and waterfront developments) is
          creating new opportunities, while the existing housing stock provides steady maintenance
          and upgrade work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Home className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Growth Opportunities</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ipswich Garden Suburb (north of the town) is one of the largest housing
                  developments in Suffolk, creating demand for second-fix electrical work,
                  additional circuits, and EV charger installations as new homeowners move in. The
                  Freeport East development also brings commercial electrical opportunities.
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
                  Professional certification sets you apart. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF before you leave site gives customers confidence and
                  saves you time on paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Ipswich electrical business from your phone"
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

export default function ElectricianIpswichPage() {
  return (
    <GuideTemplate
      title="Electrician in Ipswich | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Ipswich. Realistic 2026 pricing, UKPN connections, Victorian rewiring, waterfront developments, Part P compliance, and Ipswich-specific electrical information."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Ipswich:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Ipswich, what to expect on pricing, and the specific challenges of electrical work in Ipswich properties. Covers UKPN connections, Part P compliance, waterfront developments, and Suffolk-specific considerations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Ipswich"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Ipswich and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
