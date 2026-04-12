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
  AlertTriangle,
  Users,
  Zap,
  GraduationCap,
  Calculator,
  ClipboardCheck,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Find an Electrician', href: '/guides/electrician-stoke-on-trent' },
  { label: 'Stoke-on-Trent', href: '/guides/electrician-stoke-on-trent' },
];

const tocItems = [
  { id: 'overview', label: 'Electricians in Stoke-on-Trent' },
  { id: 'qualifications', label: 'How to Verify Qualifications' },
  { id: 'costs', label: 'Typical Costs in Stoke-on-Trent' },
  { id: 'property-types', label: 'Stoke-on-Trent Property Challenges' },
  { id: 'dno-regulations', label: 'NGED and Local Regulations' },
  { id: 'pottery-heritage', label: 'Heritage Buildings and Conversions' },
  { id: 'for-electricians', label: 'For Electricians Working in Stoke-on-Trent' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check your electrician is registered with NICEIC, NAPIT, ELECSA, or another Part P competent person scheme before any work begins. You can verify registration numbers online on the scheme provider websites.',
  'Stoke-on-Trent electrician rates are among the most competitive in the West Midlands, typically £200 to £280 per day, reflecting lower property values and operating costs compared to Birmingham or the South East.',
  'Stoke-on-Trent is a federation of six towns (Hanley, Burslem, Tunstall, Stoke, Fenton, and Longton), each with its own mix of Victorian terraces, inter-war housing, and post-war estates. The pottery heritage means many converted industrial buildings with unique electrical challenges.',
  'National Grid Electricity Distribution (NGED, formerly Western Power Distribution) is the Distribution Network Operator for Stoke-on-Trent. Any work affecting the incoming supply must be coordinated with NGED.',
  'The city has a significant private rented sector with high demand for EICR inspections and landlord compliance work, making it a steady market for local electricians.',
];

const faqs = [
  {
    question: 'How much does an electrician cost in Stoke-on-Trent?',
    answer:
      'Stoke-on-Trent electrician day rates typically range from £200 to £280 per day for a qualified electrician. Hourly rates are usually £30 to £45 per hour, with emergency call-out rates of £55 to £85 per hour. These rates reflect the lower cost of living and operating costs in North Staffordshire compared to larger cities. Always get a fixed quote for defined work rather than agreeing to day rates where possible.',
  },
  {
    question: 'How do I check if a Stoke-on-Trent electrician is properly qualified?',
    answer:
      'Ask for their competent person scheme registration number and verify it online. NICEIC (niceic.com/find-a-contractor), NAPIT (napit.org.uk/find-an-installer), and ELECSA (elecsa.co.uk/find-a-contractor) all have online search tools. A legitimate electrician will also hold a current ECS card, carry public liability insurance (minimum £2 million recommended), and provide references from recent local work. For notifiable work under Part P, the electrician must be registered with a competent person scheme or the work must be signed off by Stoke-on-Trent City Council building control.',
  },
  {
    question: 'How long does a full rewire take in a Stoke-on-Trent terraced house?',
    answer:
      'A full rewire of a typical 2 to 3 bedroom terraced house in Stoke-on-Trent takes 4 to 7 working days with a team of two electricians, plus 1 to 2 days for testing and certification. The Victorian terraces common across the six towns often have solid brick walls and compact layouts. Properties in the Hartshill and Penkhull areas tend to be larger Victorian houses requiring more time.',
  },
  {
    question: 'Do I need building control approval for electrical work in Stoke-on-Trent?',
    answer:
      'Notifiable electrical work in Stoke-on-Trent is governed by Part P of the Building Regulations. This includes new circuits, consumer unit replacements, work in bathrooms and kitchens involving new circuits, and work in special locations. If your electrician is registered with a competent person scheme, they can self-certify and notify Stoke-on-Trent City Council on your behalf.',
  },
  {
    question: 'What is an EICR and do I need one for my Stoke-on-Trent property?',
    answer:
      'An Electrical Installation Condition Report (EICR) is a formal inspection and test of the fixed electrical installation. Since April 2021, landlords in England must have a valid EICR for rented properties, carried out at least every 5 years. For Stoke-on-Trent properties, an EICR typically costs £130 to £230 for a 2 to 3 bedroom house. Older properties frequently receive C2 or C3 codes due to ageing wiring, lack of RCD protection compliant with Regulation 411.3.3, or outdated consumer units.',
  },
  {
    question: 'Who is the electricity Distribution Network Operator for Stoke-on-Trent?',
    answer:
      "National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD), is the DNO for Stoke-on-Trent. To request a new supply, upgraded supply, or meter relocation, apply through NGED's website. Lead times for new connections are typically 4 to 8 weeks.",
  },
  {
    question: 'Are there special electrical considerations for converted pottery buildings?',
    answer:
      'Yes. Stoke-on-Trent has many former pottery works, bottle ovens, and industrial buildings that have been or are being converted to residential and commercial use. These conversions require complete new electrical installations designed from scratch. Key considerations include the structural thickness of industrial walls (which affects cable routing), potentially damp environments requiring higher IP-rated accessories, large open-plan spaces requiring careful circuit design, and compliance with fire safety requirements for converted buildings. An electrician experienced in commercial-to-residential conversions is essential.',
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
      'Create professional quotes for Stoke-on-Trent customers with accurate local pricing.',
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
    heading: 'Finding a Qualified Electrician in Stoke-on-Trent',
    content: (
      <>
        <p>
          Stoke-on-Trent, the Potteries city, has a population of around 260,000 spread across its
          six historic towns — Hanley, Burslem, Tunstall, Stoke, Fenton, and Longton. The city's
          industrial heritage as the centre of the British pottery industry has left a distinctive
          property landscape, with Victorian worker terraces, converted industrial buildings, and
          substantial post-war and modern housing estates.
        </p>
        <p>
          The local electrical market is served by established Stoke-on-Trent firms and sole
          traders, many of whom also cover neighbouring Newcastle-under-Lyme, Stafford, and the
          Staffordshire Moorlands. Property prices in Stoke-on-Trent are among the most affordable
          in England, which keeps electrical work pricing competitive while still providing steady
          demand — particularly from the private rented sector and ongoing regeneration projects.
        </p>
        <p>
          Whatever the size of the firm, the qualifications and registration requirements are the
          same. Every electrician carrying out notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          must either be registered with a competent person scheme or have the work inspected and
          signed off by local authority building control. The most recognised schemes are{' '}
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
        <p>Before hiring any electrician in Stoke-on-Trent, verify their credentials:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — ask for their NICEIC, NAPIT,
                ELECSA, or other scheme registration number. Verify online that it is current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECS card</strong> — a gold ECS card indicates a qualified electrician
                (typically holding C&G 2365/2357 and C&G 2391 or equivalent). Ask to see it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £2 million cover recommended.
                Ask for a copy of the certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent references</strong> — check verified reviews on Checkatrade,
                Trustpilot, or Google Business. Look for reviews mentioning similar work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electrician Costs in Stoke-on-Trent (2026 Prices)',
    content: (
      <>
        <p>
          Stoke-on-Trent electrical work is among the most competitively priced in England,
          reflecting the city's lower property values and operating costs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire (3-bed terraced house)</strong> — £3,800 to £6,000 including new
                consumer unit, all circuits, sockets, switches, lighting, testing, and Part P
                certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £400 to £680 including supply
                isolation, new 18th Edition compliant unit with RCBOs, testing, and Part P
                notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR</strong> — £130 to £230 for a 2 to 3 bedroom house. Required every 5
                years for rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional socket</strong> — £75 to £140 per single socket from an existing
                circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger installation</strong> — £600 to £1,100 for a 7kW home charger
                including supply, installation, earthing, and Part P certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency call-out</strong> — £90 to £160 for the first hour including
                travel, plus £35 to £55 per additional hour.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are indicative for 2026. Always get at least three written quotes for any
          significant work.
        </p>
      </>
    ),
  },
  {
    id: 'property-types',
    heading: 'Stoke-on-Trent Property Challenges for Electrical Work',
    content: (
      <>
        <p>
          Stoke-on-Trent's property stock is shaped by its industrial past. Each property type
          presents different challenges for electrical work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Victorian Worker Terraces</h3>
            <p className="text-white text-sm leading-relaxed">
              Built to house pottery workers from the 1850s to 1910, these compact terraces are
              found throughout all six towns. They typically have solid brick walls, narrow rooms,
              and low ceilings compared to grander Victorian properties elsewhere. Many have had
              piecemeal electrical upgrades over the decades, and a full rewire is often the most
              practical approach. The compact size means rewiring is quicker than larger properties.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Inter-War and Post-War Housing</h3>
            <p className="text-white text-sm leading-relaxed">
              Substantial areas of 1930s semi-detached and post-war council housing exist in Meir,
              Bentilee, Blurton, and Abbey Hulton. These properties often have cavity walls (easier
              for cable routing) but may still run on original or first-generation replacement
              wiring. Consumer unit upgrades are the most common electrical job in these properties.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Converted Pottery Buildings</h3>
            <p className="text-white text-sm leading-relaxed">
              Former pottery works, bottle ovens, and industrial buildings across the city are
              increasingly being converted to residential lofts, apartments, and commercial spaces.
              These conversions require complete new electrical installations, with attention to
              thick industrial walls, damp management, and fire safety in converted buildings.
            </p>
          </div>
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Modern Estates</h3>
            <p className="text-white text-sm leading-relaxed">
              New developments at Trentham Lakes, Berryhill, and around the A500 corridor feature
              modern installations. Common electrical work includes EV charger installations, garden
              room circuits, and smart home upgrades. Properties under 10 years old may have NHBC
              warranty cover for electrical defects.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-regulations',
    heading: 'NGED and Stoke-on-Trent Electrical Regulations',
    content: (
      <>
        <p>
          National Grid Electricity Distribution (NGED), formerly Western Power Distribution (WPD),
          is the Distribution Network Operator for Stoke-on-Trent. Any work affecting the
          electricity supply involves NGED:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New connections and supply upgrades</strong> — apply to NGED for new
                supplies or upgrades. Lead times in Stoke-on-Trent are typically 4 to 8 weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter relocations</strong> — NGED handles disconnection and reconnection.
                Your electrician installs the new meter tails and consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98/G99 notification</strong> — required for solar PV, battery storage, or
                generator installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For <SEOInternalLink href="/guides/part-p-building-regulations">Part P</SEOInternalLink>{' '}
          compliance, notifiable electrical work is overseen by Stoke-on-Trent City Council building
          control or an approved inspector.
        </p>
      </>
    ),
  },
  {
    id: 'pottery-heritage',
    heading: 'Heritage Buildings and Pottery Conversions',
    content: (
      <>
        <p>
          Stoke-on-Trent's pottery heritage means the city has a unique stock of industrial
          buildings, some of which are listed or in conservation areas. Electrical work in these
          buildings requires additional planning:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed bottle ovens and pottery works</strong> — several of Stoke-on-Trent's
                historic bottle ovens and factory buildings are listed. Any electrical work
                affecting the character of a listed building requires Listed Building Consent.
                Surface-mounted conduit and cable routing must be planned sympathetically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial conversion challenges</strong> — thick industrial walls, large
                floor plates, high ceilings, and potentially damp environments all affect electrical
                installation design. IP ratings for accessories, cable support systems, and circuit
                design for large open-plan spaces all require careful consideration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety in conversions</strong> — converted industrial buildings have
                specific fire safety requirements under Building Regulations Part B and Part P. Fire
                detection, emergency lighting, and fire-resistant cable selection must all be
                considered in the electrical design.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Working in the Stoke-on-Trent Market',
    content: (
      <>
        <p>
          Stoke-on-Trent offers a steady market with lower operating costs than most urban areas.
          The combination of affordable housing stock requiring upgrades, a large private rented
          sector, and ongoing regeneration projects means consistent demand for qualified
          electricians.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Stoke-on-Trent Operating Costs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Operating costs are among the lowest of any English city. Parking is affordable
                  (£3 to £8 per day in the city centres), travel times between the six towns are
                  short, and the A500 gives good access to the M6 corridor. Electrical wholesalers
                  including CEF and Edmundson have local branches.
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
                  Landlords and letting agents expect professional certificates. An{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> completed on
                  a phone app and sent as a PDF on site sets you apart from competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your Stoke-on-Trent electrical business from your phone"
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

export default function ElectricianStokeOnTrentPage() {
  return (
    <GuideTemplate
      title="Electrician in Stoke-on-Trent | Find Qualified Electricians 2026"
      description="Find qualified, registered electricians in Stoke-on-Trent. Realistic 2026 pricing, NICEIC/NAPIT verification, NGED connections, Part P compliance, pottery building conversions, and Potteries property challenges."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Find an Electrician"
      badgeIcon={MapPin}
      heroTitle={
        <>
          Electrician in Stoke-on-Trent:{' '}
          <span className="text-yellow-400">Find Qualified Electricians in 2026</span>
        </>
      }
      heroSubtitle="How to find a registered electrician in Stoke-on-Trent, what to expect on pricing, and the specific challenges of electrical work in the Potteries. Covers NGED connections, Part P compliance, heritage conversions, and property types across the six towns."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electricians in Stoke-on-Trent"
      relatedPages={relatedPages}
      ctaHeading="Professional Electrical Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICRs, EICs, and quoting. Complete certificates on site in Stoke-on-Trent and send instant PDFs to your customers. 7-day free trial."
    />
  );
}
