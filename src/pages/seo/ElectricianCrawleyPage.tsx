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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-crawley' },
  { label: 'Crawley', href: '/guides/electrician-crawley' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Crawley' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Crawley' },
  { id: 'property-types', label: 'Crawley Property Types' },
  { id: 'dno-regulations', label: 'UKPN and Local Regulations' },
  { id: 'for-electricians', label: 'For Electricians Working in Crawley' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins.',
  "Crawley electrician rates are broadly in line with the South East average — expect day rates of £250 to £380 depending on the complexity of work and the electrician's experience.",
  'Crawley has a large proportion of post-war new town housing (1950s to 1970s estates) with aluminium wiring, lead-sheathed cables, and rewirable fuses that need upgrading to modern standards.',
  'UKPN (UK Power Networks) is the Distribution Network Operator for Crawley. Any work affecting the incoming supply, meter position, or requiring a new connection must be coordinated with UKPN.',
  'Under BS 7671, all socket outlets rated up to 32 A in domestic premises must be protected by a 30 mA RCD. This is a key requirement when upgrading consumer units in older Crawley properties.',
  "Gatwick Airport's proximity means Crawley has a significant commercial and hotel sector, creating steady demand for both domestic and commercial electricians.",
];

const faqs = [
  {
    question: 'How much does an electrician cost in Crawley?',
    answer:
      "Crawley electrician day rates typically range from £250 to £380 per day for a qualified electrician. Hourly rates are usually £40 to £60 per hour, with emergency call-out rates of £70 to £100 per hour. These rates reflect Crawley's position as a South East commuter town with good access to the M23 and Gatwick Airport. For fixed-price work, a consumer unit replacement typically costs £450 to £750, a full rewire of a 3-bedroom house £4,500 to £7,500, and an EICR £180 to £320. Always get at least three written quotes for any significant work.",
  },
  {
    question: 'How do I check if a Crawley electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS (Electrotechnical Certification Scheme) card, carry public liability insurance (minimum £2 million recommended), and be able to provide references from recent local work. For any notifiable work under Part P of the Building Regulations, the electrician must be registered with a competent person scheme or the work must be signed off by Crawley Borough Council building control.',
  },
  {
    question: 'Do I need building control approval for electrical work in Crawley?',
    answer:
      'Notifiable electrical work in Crawley (as in the rest of England and Wales) is governed by Part P of the Building Regulations. Notifiable work includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme, they can self-certify the work and notify Crawley Borough Council on your behalf. If they are not registered, you must apply to Crawley Borough Council building control before work starts, adding cost (typically £250 to £400) and time.',
  },
  {
    question: 'What is an EICR and do I need one for my Crawley property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation. Since April 2021, landlords in England are legally required to have a valid EICR for rented properties, carried out at least every 5 years or at each change of tenancy. For Crawley properties, an EICR typically costs £180 to £320 for a 2 to 3 bedroom flat, and £280 to £450 for a 3 to 4 bedroom house. Older Crawley new town properties frequently receive C2 or C3 codes due to ageing wiring, lack of RCD protection (required under BS 7671 for all socket outlets), or outdated consumer units.',
  },
  {
    question: 'What type of wiring is common in Crawley new town houses?',
    answer:
      'Many Crawley properties built during the 1950s to 1970s new town expansion have wiring that predates modern standards. Common findings include lead-sheathed or rubber-insulated cables (pre-1960s), aluminium wiring in some 1960s and 1970s properties, rewirable fuses instead of MCBs or RCBOs, no RCD protection on any circuits, and undersized earthing conductors. These installations are often still functional but do not meet current standards. A full rewire is frequently recommended, particularly where the existing installation has a mixture of old and newer cables from partial upgrades over the decades.',
  },
  {
    question: 'How do I get a new electricity connection or supply upgrade in Crawley?',
    answer:
      "UKPN (UK Power Networks) is the DNO for Crawley and the wider West Sussex area. To request a new supply, upgraded supply (for example, from single-phase to three-phase for an EV charger or heat pump), or meter relocation, apply through UKPN's website (ukpowernetworks.co.uk). Lead times for new connections are typically 4 to 8 weeks. Costs vary — a simple meter relocation might be £400 to £1,200, while a new three-phase supply can cost £2,000 to £6,000 depending on the distance from the existing network. Your electrician can advise on whether your existing supply is adequate and submit the UKPN application on your behalf.",
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
    description: 'Create professional quotes for Crawley customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Crawley',
    content: (
      <>
        <p>
          Crawley is one of the largest towns in West Sussex, with a population of around 115,000
          and a diverse mix of residential, commercial, and industrial properties. Originally
          designated as a new town in 1947, Crawley expanded rapidly through the 1950s, 1960s, and
          1970s with distinct residential neighbourhoods including Langley Green, Ifield, Pound
          Hill, Maidenbower, and Broadfield.
        </p>
        <p>
          The electrical work market in Crawley is driven by a combination of ageing new town
          housing stock that needs upgrading, a steady flow of new developments (particularly around
          Forge Wood and Kilnwood Vale), and the commercial and hospitality sectors supporting
          Gatwick Airport. Finding an electrician in Crawley is straightforward — the key is
          verifying they are properly qualified and registered.
        </p>
        <p>
          Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by building control. The most recognised competent person schemes are{' '}
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
        <p>
          Before hiring any electrician in Crawley, verify their credentials. This protects you
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
                least £2 million public liability cover. Ask for a copy of the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references</strong> — ask for contact details of 2 to 3 recent
                Crawley customers, or check verified reviews on Checkatrade, Trustpilot, or Google
                Business.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Crawley (2026 Prices)',
    content: (
      <>
        <p>
          Crawley electrician prices are broadly in line with the South East average, slightly below
          London but above the national average. Here are realistic prices for common domestic
          electrical work in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed house)</strong> — £4,500 to £7,500 including new consumer
                unit, all circuits, sockets, switches, lighting, testing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £450 to £750 including supply
                isolation, new 18th Edition compliant unit with RCBOs or RCDs (as required by BS
                7671 for socket outlets), testing, and Part P notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £180 to £320 for a flat, £280 to £450 for a house. Required
                every 5 years for rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket</strong> — £100 to £170 per single socket, depending on
                cable run length and ease of access to the existing circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £700 to £1,300 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £120 to £200 for the first hour including
                travel, plus £50 to £75 per additional hour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always get at least three written quotes for any significant work. Prices vary depending
          on the specific neighbourhood and the age and condition of the property.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Crawley Property Types and Electrical Challenges',
    content: (
      <>
        <p>
          Crawley's housing stock spans several distinct eras, each presenting different electrical
          challenges for homeowners and electricians alike.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1950s New Town Houses</h3>
            <p className="text-white text-sm leading-relaxed">
              The original Crawley new town estates (Langley Green, Northgate, West Green) feature
              semi-detached and terraced houses built to 1950s standards. Many still have original
              lead-sheathed or rubber-insulated wiring, rewirable fuses, and no RCD protection. A
              full rewire is usually the most cost-effective approach for these properties rather
              than piecemeal upgrades.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">1960s and 1970s Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              Broadfield, Bewbush, and Furnace Green were built during the 1960s and 1970s
              expansion. These properties may have PVC-insulated wiring that is still serviceable
              but often lack modern RCD protection required by BS 7671. Consumer unit upgrades to
              provide RCD coverage for all socket outlets up to 32 A are the most common electrical
              job in these areas.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Developments</h3>
            <p className="text-white text-sm leading-relaxed">
              Maidenbower (1990s to 2000s), Forge Wood, and Kilnwood Vale represent newer
              developments built to more recent wiring standards. These typically need less
              upgrading but may require additional circuits for EV chargers, home offices, or
              extensions. The wiring is generally in good condition with existing RCD protection.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Flats and Apartments</h3>
            <p className="text-white text-sm leading-relaxed">
              Crawley has a mix of low-rise purpose-built flats from the new town era and modern
              apartment blocks near the town centre. Electrical work in flats requires coordination
              with the freeholder or managing agent, particularly for work affecting communal areas
              or the incoming supply. Shared consumer units in older blocks can complicate isolation
              and testing procedures.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'UKPN and Crawley Electrical Regulations',
    content: (
      <>
        <p>
          UKPN (UK Power Networks) is the Distribution Network Operator for Crawley and the wider
          West Sussex area. Any work affecting the electricity supply to your property involves
          UKPN. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — if you need a new electricity
                supply or want to upgrade from single-phase to three-phase (for EV chargers, heat
                pumps, or commercial equipment), you apply to UKPN. Crawley lead times are typically
                4 to 8 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — moving the electricity meter requires UKPN to
                disconnect and reconnect the supply. Your electrician installs the new meter tails;
                UKPN moves the meter and cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification for solar and battery storage</strong> — if you are
                installing solar PV or battery storage, the electrician must notify UKPN under
                Engineering Recommendation G98 (for systems up to 16A per phase) or G99 (for larger
                systems).
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work in Crawley is overseen by Crawley Borough Council
          building control or by an approved inspector. If your electrician is registered with a
          competent person scheme, they self-certify and notify the council on your behalf.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Crawley Market',
    content: (
      <>
        <p>
          Crawley offers a strong and consistent market for electricians. The combination of ageing
          new town housing stock requiring upgrades, new residential developments, and the
          commercial sector around Gatwick Airport creates year-round demand. The town's location on
          the M23 corridor also provides easy access to Brighton, Horsham, East Grinstead, and the
          wider Sussex market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Crawley Market Opportunities</h4>
                <p className="text-white text-sm leading-relaxed">
                  Landlord EICR compliance (particularly for the large private rental sector near
                  Gatwick), consumer unit upgrades in 1950s to 1970s housing, EV charger
                  installations in newer developments, and commercial maintenance contracts for
                  airport-area businesses. The Forge Wood and Kilnwood Vale developments also create
                  new-build snagging and home improvement work.
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
                  Completing an{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> on a phone
                  app and sending an instant PDF sets you apart from competitors still posting
                  handwritten certificates. Landlords and letting agents in Crawley increasingly
                  expect digital documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Crawley electrical business from your phone"
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

export default function ElectricianCrawleyPage() {
  return (
    <GuideTemplate
      title="Electrician in Crawley | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Crawley. Realistic 2026 pricing, how to verify NICEIC/NAPIT registration, new town rewiring costs, UKPN connections, Part P compliance, and Crawley-specific electrical challenges."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Crawley:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Crawley, what to expect on pricing, and the specific challenges of electrical work in Crawley's new town housing stock. Covers UKPN connections, Part P compliance, consumer unit upgrades, and EV charger installations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Crawley"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Crawley and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
