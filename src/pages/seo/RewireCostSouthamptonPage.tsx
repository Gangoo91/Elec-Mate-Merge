import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  FileCheck2,
  Search,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Rewire Cost Guides', href: '/guides/house-rewire-cost' },
  { label: 'Rewire Cost Southampton', href: '/rewire-cost-southampton' },
];

const tocItems = [
  { id: 'rewire-costs-southampton', label: 'Rewire Costs in Southampton' },
  { id: 'signs-you-need-rewire', label: 'Signs You Need a Rewire' },
  { id: 'what-rewire-involves', label: 'What a Rewire Involves' },
  { id: 'timescales-disruption', label: 'Timescales and Disruption' },
  { id: 'part-p-compliance', label: 'Part P Compliance' },
  { id: 'choosing-contractor', label: 'Choosing a Contractor' },
  { id: 'guarantees-certification', label: 'Guarantees and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Southampton typically costs £2,800 to £6,500 depending on property size. Hampshire labour rates are broadly in line with the South of England average.',
  'All rewiring work must comply with BS 7671:2018+A3:2024 and be notified under Part P of the Building Regulations 2010.',
  'NICEIC and NAPIT registered contractors can self-certify rewiring work in Southampton — they notify Southampton City Council building control on your behalf.',
  'Southampton has a large stock of interwar and post-war housing in areas such as Shirley, Bitterne, and Woolston that may retain wiring from the 1940s to 1970s requiring assessment or rewiring.',
  "The port city's maritime and industrial heritage means some older commercial-to-residential conversions in the waterfront areas may have complex or non-standard wiring requiring specialist assessment.",
  'On completion, your electrician must issue an Electrical Installation Certificate (EIC) — this is a legal document required for property sales.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Southampton?',
    answer:
      'A full rewire in Southampton typically costs £2,000 to £3,000 for a one-bedroom flat, £2,800 to £4,000 for a two-bedroom terrace, £3,500 to £5,000 for a three-bedroom semi-detached, and £4,500 to £6,500 for a four-bedroom detached. Southampton and Hampshire labour rates are slightly above the national average due to proximity to London, but significantly below inner London prices. These prices include materials, labour, and the Electrical Installation Certificate.',
  },
  {
    question: 'How long does a rewire take in Southampton?',
    answer:
      "A two-bedroom terrace common in areas such as Shirley and Freemantle typically takes 2 to 3 days. A three-bedroom semi-detached takes 3 to 5 days. Larger detached properties in areas such as Chandler's Ford and Hedge End may take 5 to 7 days. Victorian terraces in St Denys and Portswood with solid walls can add 1 to 2 additional days compared with cavity wall construction.",
  },
  {
    question: 'Does rewiring in Southampton need Part P notification?',
    answer:
      "Yes. A full rewire is notifiable work under Part P of the Building Regulations 2010. NICEIC, NAPIT, and ELECSA registered electricians can self-certify the work and notify Southampton City Council building control on your behalf. If the electrician is not scheme registered, you must apply to the council's building control department before work begins.",
  },
  {
    question: 'What certificate do I get after a rewire in Southampton?',
    answer:
      'On completion you should receive an Electrical Installation Certificate (EIC) signed by the electrician, including schedules of inspections and test results for all circuits. If the work was self-certified under Part P, you also receive a Building Regulations Compliance Certificate from the competent person scheme or Southampton City Council. Keep both documents safely — solicitors will request them when you sell the property.',
  },
  {
    question: 'Can I stay in my house during a rewire in Southampton?',
    answer:
      'It is possible to remain in the property during a rewire but it is significantly disruptive. There will be periods without electricity, lifted floorboards, chased or surface-run cables, and dust. Many homeowners arrange to stay elsewhere for the duration. Your electrician should agree a daily programme of works with you before starting and confirm the expected hours without power.',
  },
  {
    question: 'Do I need a rewire or just a consumer unit upgrade in Southampton?',
    answer:
      'A consumer unit upgrade is appropriate when the existing wiring is sound (PVC-insulated, good condition) but the fuseboard is outdated. A full rewire is necessary when the cables themselves are deteriorated — rubber-insulated, lead-sheathed, or aluminium — or when an EICR identifies C1 or C2 observations relating to the wiring. A qualified electrician should carry out a periodic inspection before advising on the most appropriate solution.',
  },
  {
    question: 'How do I find a qualified rewire electrician in Southampton?',
    answer:
      'Use the NICEIC or NAPIT online registers to find registered contractors in Southampton and Hampshire. Both registers confirm qualifications, insurance, and regular technical assessment. Obtain at least three detailed written quotes, check Google and Checkatrade reviews, and confirm the contractor will provide an EIC and handle Part P notification. The ECA (Electrical Contractors Association) also maintains a contractor register for the South of England.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/house-rewire-cost',
    title: 'House Rewire Cost Guide',
    description:
      "National rewire cost guide covering all property sizes, what's included, and how to compare quotes.",
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/rewire-cost-brighton',
    title: 'Rewire Cost Brighton',
    description: 'House rewire costs in Brighton and East Sussex with local contractor guidance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What Part P means for homeowners and electricians — notifiable work, self-certification, and compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description:
      'Issue EICs on your phone. Auto-populated test schedules, instant PDF, and Part P ready.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'rewire-costs-southampton',
    heading: 'House Rewire Costs in Southampton (2025 Prices)',
    content: (
      <>
        <p>
          Southampton rewire costs reflect South of England labour rates, which sit slightly above
          the national average but well below London. The city's diverse housing stock — from
          Victorian terraces to post-war estates and modern waterfront apartments — means costs vary
          depending on construction type as well as size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £1,900 to £2,800. Common in waterfront
                developments, city centre conversions, and purpose-built blocks across Southampton.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £2,800 to £4,000. Found throughout
                Shirley, Freemantle, Bitterne, and Woolston. Typically 8 to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £3,500 to £5,000. The most common
                rewire in Southampton's interwar suburbs including Bassett, Lordshill, and
                Swaythling. Typically 12 to 16 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — £4,500 to £6,500. Larger properties in
                Chandler's Ford, Hedge End, and Eastleigh command the upper end of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian solid-wall properties</strong> — add 20 to 35 per cent for
                pre-1900 properties in St Denys, Portswood, and Bevois Valley where solid brick
                walls require surface-run conduit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include stripping out existing wiring, installing new twin-and-earth cables,
          fitting a new consumer unit with RCD protection, installing new accessories, and issuing
          the Electrical Installation Certificate. Redecoration and plastering are not included.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-rewire',
    heading: 'Signs Your Southampton Property Needs a Rewire',
    content: (
      <>
        <p>
          Southampton's housing stock spans Victorian terraces, 1930s semi-detached houses, 1950s
          and 1960s council properties, and modern waterfront developments. Older properties in
          particular may require rewiring. Look for these warning signs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated cables</strong> — pre-1960s wiring with rubber insulation
                that degrades and cracks. Recorded as a C1 (danger present) finding on an EICR
                requiring immediate remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old rewirable fuse box</strong> — ceramic fuse holders with fuse wire
                indicate a pre-1970s installation with no modern overcurrent protection or RCD
                protection against electric shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — absence of residual current device protection
                on socket-outlet circuits is a C2 (potentially dangerous) observation under BS 7671
                Regulation 411.3.3. Modern consumer units provide this protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Persistent tripping or blown fuses</strong> — frequent overcurrent events
                suggest overloading or cable deterioration. Always have this investigated by a
                qualified electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory EICR</strong> — if a periodic inspection reveals C1 or C2
                observations that cannot be resolved economically through targeted repairs, a full
                rewire is likely the most cost-effective solution.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-rewire-involves',
    heading: 'What a Full House Rewire Involves',
    content: (
      <>
        <p>
          A full rewire replaces all fixed electrical wiring from the incoming mains supply
          throughout the property. The work follows a consistent process regardless of location.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — removal of existing wiring, routing new cables through
                floors, walls, and ceiling voids, installing back boxes and containment. The most
                disruptive stage involving lifted floorboards and chased or surface-run cable
                routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — fitting the consumer unit, connecting all circuits,
                installing sockets, switches, and light fittings. Power is restored at the end of
                this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — all circuits tested to BS 7671 Chapter 64
                including insulation resistance, earth continuity, and RCD operation. Results
                recorded on test schedules forming part of the EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and Part P</strong> — EIC issued and work notified to
                Southampton City Council building control or the competent person scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'timescales-disruption',
    heading: 'Timescales and Disruption',
    content: (
      <>
        <p>
          Rewire duration in Southampton depends on property size and construction. Allow adequate
          time and plan for the disruption before work begins.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terrace</strong> — 2 to 3 days. Cavity wall construction with
                accessible timber floors allows efficient first-fix cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — 3 to 5 days. Standard duration for
                the most common Southampton rewire project.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — 5 to 7 days. More circuits and longer cable
                runs add time to the programme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian properties</strong> — add 1 to 3 days for properties in St Denys,
                Portswood, and the older city centre streets where solid walls complicate cable
                routing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The property will be without mains power during working hours each day. Plan arrangements
          for cooking, heating, refrigeration, and any medical equipment before the rewire begins.
          Many Southampton electricians can arrange a temporary supply connection if required.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-compliance',
    heading: 'Part P Compliance in Southampton',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 applies to all fixed electrical installation work
          in dwellings in England. A full rewire is notifiable work and must comply with BS
          7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification</strong> — electricians registered with NICEIC, NAPIT,
                ELECSA, or STROMA can self-certify rewiring work throughout Hampshire. They handle
                the Part P notification to Southampton City Council or the relevant district council
                on your behalf.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> — if the electrician is not scheme
                registered, notify Southampton City Council building control before work begins. A
                building control officer may inspect the installation before issuing a completion
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC mandatory</strong> — an Electrical Installation Certificate must be
                issued on completion of any rewiring work. This is a legal requirement under BS 7671
                and is needed for property sales.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-contractor',
    heading: 'Choosing a Rewire Contractor in Southampton',
    content: (
      <>
        <p>
          Southampton and Hampshire have a strong pool of qualified electrical contractors. Follow
          these steps to find a reliable, competent electrician for your rewire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — use the online registers to confirm
                current registration status and that the contractor's scope covers full domestic
                rewiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three written quotes minimum</strong> — each quote should itemise circuits,
                consumer unit type, accessories, EIC, and Part P notification. Compare like for like
                before selecting a contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check insurance</strong> — confirm public liability insurance of at least £1
                million. Scheme membership requires this as a standard condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recent local reviews</strong> — check Google, Checkatrade, and Which?
                Trusted Traders for recent rewire reviews from Southampton customers. Ask the
                contractor for references if you need additional assurance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'guarantees-certification',
    heading: 'Guarantees and Certification',
    content: (
      <>
        <p>
          After your Southampton rewire, store the following documents with your property deeds.
          They are required for property sales and any future remortgaging.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — the primary BS 7671
                compliance document including signed test schedules for all circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Compliance Certificate</strong> — confirms Part P
                notification and compliance, issued by the competent person scheme or Southampton
                City Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship guarantee</strong> — confirm this in your written contract.
                Reputable Hampshire contractors typically offer 1 to 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next periodic inspection</strong> — for owner-occupied properties, plan for
                an EICR in 10 years. For rental properties, every 5 years is required by law.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Rewire Work in Southampton and Hampshire',
    content: (
      <>
        <p>
          Southampton and the wider Hampshire market offer consistent demand for domestic rewiring.
          Electricians who combine technical quality with fast, professional certification win
          repeat business and grow through referrals.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete your Electrical Installation Certificate on your phone before you
                  leave the property. Auto-populated test schedules and instant PDF export mean no
                  paperwork in the evening.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Win More Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional rewire quotes in minutes with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Itemised materials, labour, and Part P fees in a format that builds customer
                  confidence and wins work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Southampton rewire business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and job management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RewireCostSouthamptonPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Southampton 2025 | Rewire Hampshire"
      description="House rewire costs in Southampton for 2025. Prices for all property sizes, Part P compliance, NICEIC and NAPIT contractors, signs you need a rewire, timescales, and what certificate you should receive."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Rewire Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Southampton:{' '}
          <span className="text-yellow-400">2025 Prices & Hampshire Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about house rewire costs in Southampton and Hampshire — property size price breakdowns, Part P compliance, finding NICEIC and NAPIT registered contractors, signs your property needs rewiring, and the certification you should receive."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Rewiring in Southampton"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, auto-populated test schedules, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
